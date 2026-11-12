// 麻将「实际对局」移动端体检：开局 → 手牌/弃牌区/指示牌可辨性 → 触摸出牌
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chromeExe = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find(existsSync);

async function probeViewport(w, h, label) {
  const profile = mkdtempSync(join(tmpdir(), "mj-mobgame-"));
  const chrome = spawn(chromeExe, ["--headless=new", "--disable-gpu", "--mute-audio", "--no-first-run",
    `--window-size=${w},${h}`,
    "--remote-debugging-port=9254", `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
  await new Promise(r => setTimeout(r, 2500));
  const targets = await (await fetch("http://127.0.0.1:9254/json/list")).json();
  const page = targets.find(t => t.type === "page");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => { ws.onopen = r; });
  let seq = 0; const pending = new Map(); const errors = [];
  ws.addEventListener("message", ev => {
    const m = JSON.parse(ev.data);
    if (m.method === "Runtime.exceptionThrown") errors.push((m.params.exceptionDetails.text || "").slice(0, 120));
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

  // 开局：亲自打 → 开始（真实点击）。注意 currentGame 在第二次确认弹窗前就已存在，
  // 必须点掉所有开局弹窗、等到 .player.active 出现才算真正进入对局。
  let started = false;
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
    if (r === "playing") { started = true; break; }
  }
  console.log(`[${label}] GAME-STARTED:`, started);
  await sleep(1800);

  const st = await evalJs(`(() => {
    const root = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const board = document.querySelector(".board");
    const br = board ? board.getBoundingClientRect() : null;
    const hand = document.querySelector(".player[id='0'] game-tile");
    const hr = hand ? hand.getBoundingClientRect() : null;
    const disc = document.querySelector(".discards");
    const dr = disc ? disc.getBoundingClientRect() : null;
    const mk = document.getElementById("mj-turn-marker");
    const mr = mk ? mk.getBoundingClientRect() : null;
    const score = document.querySelector(".player .score, .player .points, .playerbank .score");
    const tb = document.getElementById("mj-toolbar");
    const tbr = tb ? tb.getBoundingClientRect() : null;
    const active = document.querySelector(".player.active");
    const sel = document.querySelector(".player[id='0'] game-tile.selectable");
    const selr = sel ? sel.getBoundingClientRect() : null;
    return JSON.stringify({
      inner: innerWidth + "x" + innerHeight,
      rootFont: root.toFixed(1),
      board: br ? Math.round(br.width) + "x" + Math.round(br.height) : null,
      handTile: hr ? Math.round(hr.width) + "x" + Math.round(hr.height) : null,
      discards: dr ? Math.round(dr.width) + "x" + Math.round(dr.height) : null,
      marker: mk ? mk.textContent : null,
      markerBox: mr ? Math.round(mr.left) + "," + Math.round(mr.top) + " " + Math.round(mr.width) + "x" + Math.round(mr.height) : null,
      markerFont: mk ? getComputedStyle(mk).fontSize : null,
      toolbarH: tbr ? Math.round(tbr.height) : null,
      activePid: active ? active.id : null,
      myTurnSelectable: !!sel,
      tapSpot: selr ? { x: Math.round(selr.left + selr.width/2), y: Math.round(selr.top + selr.height/2) } : null,
      scoreFont: score ? getComputedStyle(score).fontSize : null,
      discardsTiles: document.querySelectorAll(".discards game-tile").length
    });
  })()`);
  console.log(`[${label}] LAYOUT:`, st);
  await send("Page.captureScreenshot", { format: "png" }).then(r => {
    if (r.result?.data) writeFileSync(`proof_mobile_game_${label}.png`, Buffer.from(r.result.data, "base64"));
  }).catch(() => {});

  // 触摸出牌：第一击举牌、第二击打出（长辈模式）
  const s = JSON.parse(st || "{}");
  if (s.tapSpot) {
    await tap(s.tapSpot.x, s.tapSpot.y);
    await sleep(600);
    const a1 = await evalJs(`(() => JSON.stringify({ armed: !!document.querySelector(".player[id='0'] game-tile.mj-armed"), hint: !!(document.getElementById("mj-elder-hint")||{}).classList?.contains?.("mj-on"), discards: document.querySelectorAll(".discards game-tile").length }))()`);
    console.log(`[${label}] TAP1:`, a1);
    await tap(s.tapSpot.x, s.tapSpot.y);
    await sleep(900);
    const a2 = await evalJs(`(() => JSON.stringify({ armedLeft: document.querySelectorAll(".player[id='0'] game-tile.mj-armed").length, discards: document.querySelectorAll(".discards game-tile").length, activePid: (document.querySelector(".player.active")||{}).id }))()`);
    console.log(`[${label}] TAP2:`, a2);
  }
  console.log(`[${label}] JS-ERRORS:`, errors.length ? errors.join("|") : "(none)");
  chrome.kill();
  try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
}

await probeViewport(390, 844, "portrait");
await probeViewport(844, 390, "landscape");
setTimeout(() => process.exit(0), 300);
