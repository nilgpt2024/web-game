// 移动端可见性体检：逐视口量「页面是否溢出 / 14 张放大牌是否全在屏内 / 牌面实际尺寸」
// 用法: node tools/diag_mobile_visibility.mjs [baseURL]
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const URL = process.argv[2] || "http://localhost:8774/";
const isLive = !URL.includes("localhost");
const chromeExe = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find(existsSync);

const VIEWPORTS = [
  { w: 320, h: 568, label: "small-320x568" },   // 小屏老人机 / iPhone SE
  { w: 360, h: 640, label: "android-360x640" },
  { w: 390, h: 844, label: "iphone-390x844" },
  { w: 412, h: 915, label: "large-412x915" },
  { w: 844, h: 390, label: "landscape-844x390" },
  { w: 390, h: 844, label: "webview-390x844", mobile: true },
];

let port = 9270;
for (const vp of VIEWPORTS) {
  const p = port++;
  const profile = mkdtempSync(join(tmpdir(), "mj-vis-"));
  const chrome = spawn(chromeExe, ["--headless=new", "--disable-gpu", "--mute-audio", "--no-first-run",
    `--window-size=${vp.w},${vp.h}`, `--remote-debugging-port=${p}`,
    `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
  await new Promise(r => setTimeout(r, 2200));
  let targets = null;
  for (let i = 0; i < 10; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${p}/json/list`)).json(); break; }
    catch (e) { await new Promise(r => setTimeout(r, 700)); }
  }
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

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride",
    { width: vp.w, height: vp.h, deviceScaleFactor: vp.mobile ? 2 : 1, mobile: !!vp.mobile });
  await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
  await send("Page.navigate", { url: URL });
  await sleep(isLive ? 16000 : 5000);

  // 手动模式开局（轮到真人出牌时大牌区才会出现）
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
  await sleep(1200);

  const raw = await evalJs(`(() => {
    const vw = window.innerWidth, vh = window.innerHeight;
    const R = el => { if (!el) return null; const b = el.getBoundingClientRect();
      return { x: Math.round(b.left), y: Math.round(b.top), w: Math.round(b.width), h: Math.round(b.height),
               r: Math.round(b.right), b: Math.round(b.bottom) }; };
    const board = document.querySelector(".board");
    const hand = document.getElementById("mj-mobile-hand");
    const bigs = hand ? [...hand.querySelectorAll("[data-mj-idx]")] : [];
    const origs = [...document.querySelectorAll(".player[id='0'] game-tile")];
    const tb = document.getElementById("mj-toolbar");
    const mk = document.getElementById("mj-turn-marker");
    const disc = document.querySelector(".discards");
    const clipped = el => { if (!el) return false; const b = el.getBoundingClientRect();
      return b.left < -1 || b.top < -1 || b.right > vw + 1 || b.bottom > vh + 1; };
    return JSON.stringify({
      vw, vh,
      layoutW: document.documentElement.clientWidth,
      docScrollW: document.documentElement.scrollWidth,
      docScrollH: document.documentElement.scrollHeight,
      visualW: window.visualViewport ? Math.round(window.visualViewport.width) : null,
      visualH: window.visualViewport ? Math.round(window.visualViewport.height) : null,
      playing: !!document.querySelector(".player.active"),
      rootFont: parseFloat(getComputedStyle(document.documentElement).fontSize).toFixed(1),
      board: R(board), boardClipped: clipped(board),
      toolbar: R(tb), toolbarClipped: clipped(tb),
      marker: R(mk), markerClipped: clipped(mk),
      discards: R(disc), discardsClipped: clipped(disc),
      hand: R(hand), handShown: hand ? getComputedStyle(hand).display !== "none" : false,
      handScrollW: hand ? hand.scrollWidth : null,
      bigCount: bigs.length,
      big0: R(bigs[0]), bigLast: R(bigs[bigs.length - 1]),
      bigOffscreen: bigs.filter(e => { const b = e.getBoundingClientRect();
        return b.left < -1 || b.top < -1 || b.right > vw + 1 || b.bottom > vh + 1; }).length,
      origCount: origs.length, orig0: R(origs[0]),
      origOffscreen: origs.filter(e => { const b = e.getBoundingClientRect();
        return b.left < -1 || b.top < -1 || b.right > vw + 1 || b.bottom > vh + 1; }).length
    });
  })()`);
  console.log(`\n===== ${vp.label} (playing=${playing}) =====`);
  console.log(raw);
  console.log("JS-ERRORS:", errors.length, errors.slice(0, 2));

  const shot = await send("Page.captureScreenshot", { format: "png" });
  if (shot.result?.data) writeFileSync(`proof_vis_${vp.label}.png`, Buffer.from(shot.result.data, "base64"));

  ws.close();
  chrome.kill();
  try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
  await sleep(300);
}
