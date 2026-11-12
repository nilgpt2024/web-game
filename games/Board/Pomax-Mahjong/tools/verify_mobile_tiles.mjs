// 验证移动端「每一张放大牌」都能正确二次确认并出牌（竖屏两行 / 横屏一行）
// 用法: node tools/verify_mobile_tiles.mjs [portrait|landscape] [baseURL]
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const MODE = process.argv[2] || "portrait";
const URL = process.argv[3] || "http://localhost:8774/";
const isLive = !URL.includes("localhost");
const vp = MODE === "landscape" ? { w: 844, h: 390, port: 9282 } : { w: 390, h: 844, port: 9281 };

const chromeExe = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find(existsSync);
const profile = mkdtempSync(join(tmpdir(), "mj-tiles-"));
const chrome = spawn(chromeExe, ["--headless=new", "--disable-gpu", "--mute-audio", "--no-first-run",
  `--window-size=${vp.w},${vp.h}`, `--remote-debugging-port=${vp.port}`,
  `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 2200));
let targets = null;
for (let i = 0; i < 10; i++) {
  try { targets = await (await fetch(`http://127.0.0.1:${vp.port}/json/list`)).json(); break; }
  catch (e) { await new Promise(r => setTimeout(r, 700)); }
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
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: vp.w, height: vp.h, deviceScaleFactor: 1, mobile: false });
await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
await send("Page.navigate", { url: URL });
await sleep(isLive ? 16000 : 5000);

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
console.log(`[${MODE}] PLAYING:`, playing);

// 等 14 张放大牌出现
let spots = [];
for (let i = 0; i < 20; i++) {
  await sleep(500);
  const raw = await evalJs(`(() => {
    const hand = document.getElementById("mj-mobile-hand");
    if (!hand || getComputedStyle(hand).display === "none") return "[]";
    return JSON.stringify([...hand.querySelectorAll("[data-mj-idx]")].map(e => {
      const b = e.getBoundingClientRect();
      return { i: +e.getAttribute("data-mj-idx"), x: Math.round(b.left + b.width / 2), y: Math.round(b.top + b.height / 2) };
    }));
  })()`);
  try { spots = JSON.parse(raw || "[]"); } catch (e) { spots = []; }
  if (spots.length === 14) break;
}
console.log(`[${MODE}] BIG-TILES:`, spots.length, "first/last:", JSON.stringify([spots[0], spots[spots.length - 1]]));

const fails = [];
const stateExpr = `(() => JSON.stringify({
  armed: [...document.querySelectorAll("#mj-mobile-hand .mj-armed")].map(e => +e.getAttribute("data-mj-idx")),
  discards: document.querySelectorAll(".discards game-tile").length,
  handShown: getComputedStyle(document.getElementById("mj-mobile-hand")).display !== "none"
}))()`;
for (const s of spots) {
  await tap(s.x, s.y);
  await sleep(160);
  const st = JSON.parse((await evalJs(stateExpr)) || "{}");
  const armedOk = st.armed.length === 1 && st.armed[0] === s.i;
  const noDiscard = st.discards === 0;
  if (!armedOk || !noDiscard) fails.push(`idx${s.i}: armed=${JSON.stringify(st.armed)} discards=${st.discards}`);
}
console.log(`[${MODE}] SINGLE-TAP-ALL: ${spots.length - fails.length}/${spots.length} ok`, fails.slice(0, 4));

// 第二击当前举牌（最后一张）→ 真正打出
const last = spots[spots.length - 1];
if (last) {
  const before = JSON.parse((await evalJs(stateExpr)) || "{}");
  await tap(last.x, last.y);
  await sleep(1300);
  const after = JSON.parse((await evalJs(stateExpr)) || "{}");
  console.log(`[${MODE}] DOUBLE-TAP-LAST:`, JSON.stringify({ before, after }));
  if (!(after.discards > before.discards)) fails.push("double-tap did not discard");
}

// 可见性：14 张全在视口内
const vis = await evalJs(`(() => {
  const vw = innerWidth, vh = innerHeight;
  const tiles = [...document.querySelectorAll("#mj-mobile-hand [data-mj-idx]")];
  return JSON.stringify({
    docScrollW: document.documentElement.scrollWidth, vw,
    offscreen: tiles.filter(e => { const b = e.getBoundingClientRect();
      return b.left < -1 || b.right > vw + 1 || b.top < -1 || b.bottom > vh + 1; }).length,
    sample: tiles[0] ? (() => { const b = tiles[0].getBoundingClientRect(); return Math.round(b.width) + "x" + Math.round(b.height); })() : null
  });
})()`);
console.log(`[${MODE}] VISIBILITY:`, vis);

const shot = await send("Page.captureScreenshot", { format: "png" });
if (shot.result?.data) writeFileSync(`proof_tiles_${MODE}.png`, Buffer.from(shot.result.data, "base64"));
console.log(`[${MODE}] JS-ERRORS:`, errors.length, errors.slice(0, 3));
console.log(`[${MODE}] SUMMARY:`, fails.length === 0 && errors.length === 0 ? "PASS" : "FAIL " + fails.length + " issues");
ws.close(); chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
setTimeout(() => process.exit(fails.length || errors.length ? 1 : 0), 300);
