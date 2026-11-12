// 移动端适配验证：竖屏大牌区可点可出牌 / 横屏指示牌不压牌 / 弹窗字号 / 桌面回归
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chromeExe = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find(existsSync);

async function run(w, h, label, opts = {}) {
  const profile = mkdtempSync(join(tmpdir(), "mj-mobv-"));
  const port = 9260 + (label.length % 7);
  const chrome = spawn(chromeExe, ["--headless=new", "--disable-gpu", "--mute-audio", "--no-first-run",
    `--window-size=${w},${h}`, "--remote-debugging-port=" + port,
    `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
  await new Promise(r => setTimeout(r, 2500));
  let targets = null;
  for (let i = 0; i < 8; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); break; }
    catch (e) { await new Promise(r => setTimeout(r, 800)); }
  }
  const page = targets.find(t => t.type === "page");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => { ws.onopen = r; });
  let seq = 0; const pending = new Map(); const errors = [];
  ws.addEventListener("message", ev => {
    const m = JSON.parse(ev.data);
    if (m.method === "Runtime.exceptionThrown") errors.push((m.params.exceptionDetails.text || "").slice(0, 140));
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  });
  const send = (method, params = {}) => new Promise(res => { const id = ++seq; pending.set(id, res); ws.send(JSON.stringify({ id, method, params })); });
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const evalJs = async e => { const r = await send("Runtime.evaluate", { expression: e, returnByValue: true, awaitPromise: true }); return r.result?.result?.value; };
  async function tap(x, y) {
    await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  }

  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 2, mobile: false });
  await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
  await send("Page.navigate", { url: "http://localhost:8774/" });
  await sleep(4500);

  // 开局前：弹窗按钮字号（不能被 root font 缩没）
  const modalFont = await evalJs(`(() => {
    const b = document.querySelector(".modal:not(.hidden) .panel button");
    return b ? getComputedStyle(b).fontSize : "no-button";
  })()`);

  // 开局：亲自打 → 开始，直到真正进入对局
  let playing = false;
  for (let i = 0; i < 35; i++) {
    await sleep(600);
    const r = await evalJs(`(() => {
      const active = document.querySelector(".player.active");
      const openModal = document.querySelector(".modal:not(.hidden)");
      if (active && !openModal) return "playing";
      for (const p of document.querySelectorAll(".modal .panel")) {
        const btn = [...p.querySelectorAll("button")].find(b => /亲自打|开始|play some mahjong/i.test(b.textContent || ""));
        if (btn) { btn.click(); return "clicked"; }
      }
      return "waiting";
    })()`);
    if (r === "playing") { playing = true; break; }
  }
  await sleep(1500);

  const stRaw = await evalJs(`(() => {
    const hand = document.getElementById("mj-mobile-hand");
    const bigs = hand ? [...hand.querySelectorAll("[data-mj-idx]")] : [];
    const b0 = bigs[0] ? bigs[0].getBoundingClientRect() : null;
    const orig = document.querySelector(".player[id='0'] game-tile");
    const o = orig ? orig.getBoundingClientRect() : null;
    const board = document.querySelector(".board");
    const br = board ? board.getBoundingClientRect() : null;
    const mk = document.getElementById("mj-turn-marker");
    const mr = mk ? mk.getBoundingClientRect() : null;
    const overlap = br && mr ? !(mr.right < br.left || mr.left > br.right || mr.bottom < br.top || mr.top > br.bottom) : null;
    const tb = document.getElementById("mj-toolbar");
    return JSON.stringify({
      playing: !!document.querySelector(".player.active"),
      bigHandShown: hand ? getComputedStyle(hand).display !== "none" : false,
      bigCount: bigs.length,
      bigTile: b0 ? Math.round(b0.width) + "x" + Math.round(b0.height) : null,
      origTile: o ? Math.round(o.width) + "x" + Math.round(o.height) : null,
      bigTapSpot: b0 ? { x: Math.round(b0.left + b0.width/2), y: Math.round(b0.top + b0.height/2) } : null,
      markerBoardOverlap: overlap,
      marker: mk ? mk.textContent : null,
      toolbarH: tb ? Math.round(tb.getBoundingClientRect().height) : null,
      rootFont: parseFloat(getComputedStyle(document.documentElement).fontSize).toFixed(1)
    });
  })()`);
  const st = JSON.parse(stRaw || "{}");
  console.log(`[${label}] MODAL-BTN-FONT:`, modalFont, "PLAYING:", playing);
  console.log(`[${label}] LAYOUT:`, JSON.stringify(st));
  await send("Page.captureScreenshot", { format: "png" }).then(r => {
    if (r.result?.data) writeFileSync(`proof_mobile_v16_${label}.png`, Buffer.from(r.result.data, "base64"));
  }).catch(() => {});

  // 竖屏：点「放大牌」两下，验证二次确认 + 出牌转发
  if (opts.tapBig && st.bigTapSpot) {
    await tap(st.bigTapSpot.x, st.bigTapSpot.y);
    await sleep(600);
    const a1 = await evalJs(`(() => JSON.stringify({
      armedBig: !!document.querySelector("#mj-mobile-hand .mj-armed"),
      hint: !!document.querySelector("#mj-elder-hint.mj-on"),
      discards: document.querySelectorAll(".discards game-tile").length
    }))()`);
    console.log(`[${label}] BIG-TAP1:`, a1);
    await tap(st.bigTapSpot.x, st.bigTapSpot.y);
    await sleep(1100);
    const a2 = await evalJs(`(() => JSON.stringify({
      armedLeft: document.querySelectorAll(".mj-armed").length,
      discards: document.querySelectorAll(".discards game-tile").length,
      bigHandShown: getComputedStyle(document.getElementById("mj-mobile-hand")).display !== "none"
    }))()`);
    console.log(`[${label}] BIG-TAP2:`, a2);
  }
  console.log(`[${label}] JS-ERRORS:`, errors.length ? errors.join("|") : "(none)");
  chrome.kill();
  try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
}

await run(390, 844, "portrait", { tapBig: true });
await run(844, 390, "landscape", { tapBig: true });
await run(1280, 800, "desktop");
setTimeout(() => process.exit(0), 300);
