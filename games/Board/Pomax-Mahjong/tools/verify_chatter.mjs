// 验证阜阳牌桌俚语：等人出牌会自动催一句、字幕气泡不挡手牌、
// 五组俚语都能播出对应 mp3，且不破坏节奏 / 不产生 JS 异常。
// 用法: node tools/verify_chatter.mjs [url] [port] [bootMs] [proxy]
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const URL = process.argv[2] || "http://localhost:8774/";
const PORT = Number(process.argv[3] || 9281);
const BOOT = Number(process.argv[4] || 9000);
const PROXY = process.argv[5] || "";
const chromeExe = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find(existsSync);
const profile = mkdtempSync(join(tmpdir(), "mj-chatter-"));
const args = ["--headless=new", "--disable-gpu", "--mute-audio", "--no-first-run",
  "--window-size=1280,800", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`];
if (PROXY) args.push(`--proxy-server=${PROXY}`);
args.push("about:blank");
const chrome = spawn(chromeExe, args, { stdio: "ignore" });
const sleep = ms => new Promise(r => setTimeout(r, ms));
await sleep(2500);

let targets = null;
for (let i = 0; i < 10; i++) {
  try { targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); break; }
  catch (e) { await sleep(800); }
}
const page = targets.find(t => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => { ws.onopen = r; });
let seq = 0;
const pending = new Map();
const errors = [];
ws.addEventListener("message", ev => {
  const m = JSON.parse(ev.data);
  if (m.method === "Runtime.exceptionThrown") {
    const d = m.params.exceptionDetails;
    errors.push(`EXC ${d.text} ${d.exception?.description || ""}`.slice(0, 180));
  }
  if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") {
    errors.push("CONSOLE " + m.params.args.map(a => a.value || a.description || "").join(" ").slice(0, 180));
  }
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
});
function send(method, params = {}) {
  return new Promise(res => { const id = ++seq; pending.set(id, res); ws.send(JSON.stringify({ id, method, params })); });
}
async function evalJs(expr) {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) errors.push("EVAL " + JSON.stringify(r.result.exceptionDetails).slice(0, 180));
  return r.result?.result?.value;
}

await send("Page.enable");
await send("Runtime.enable");
await send("Page.navigate", { url: URL });
await sleep(BOOT);

// 手动开局，之后故意不点牌，让「等你出牌」的催促自己触发
let started = false;
for (let i = 0; i < 25; i++) {
  const r = await evalJs(`(() => {
    if (window.currentGame) return "game-on";
    for (const p of document.querySelectorAll(".modal .panel")) {
      const btn = [...p.querySelectorAll("button")].find(b => /亲自打|开始|play some mahjong/i.test(b.textContent || ""));
      if (btn) { btn.click(); return "clicked"; }
    }
    return false;
  })()`);
  if (r === "game-on") { started = true; break; }
  await sleep(800);
}
console.log("STARTED:", started);

await evalJs(`(() => {
  window.__fyLog = [];
  const native = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function () {
    const s = this.currentSrc || this.src || "";
    if (/fy-[a-z]+-\\d+\\.mp3/.test(s)) window.__fyLog.push(s.split("/").pop());
    return native.apply(this, arguments);
  };
  return true;
})()`);

async function realClick(x, y) {
  await send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });
}

// 点掉「准备好开局了吗」等后续弹窗；AI 回合若弹出碰/胡声明则替玩家过，
// 但绝不点自己的牌——这样才会停在「等你出牌」，让催促自然触发。
let myTurn = false;
const deadline = Date.now() + 60000;
while (Date.now() < deadline) {
  const st = JSON.parse(await evalJs(`(() => {
    const act = document.querySelector(".player.active");
    const sel = document.querySelector(".discards game-tile.selectable");
    const d = document.querySelector(".discards");
    let passSpot = null;
    if (d) { const b = d.getBoundingClientRect(); passSpot = { x: b.x + 12, y: b.y + 12 }; }
    let modalBtn = null;
    for (const p of document.querySelectorAll(".modal .panel")) {
      const btn = [...p.querySelectorAll("button")].find(b => /确定|确认|OK|继续|开始/i.test(b.textContent || ""));
      if (btn) { const b = btn.getBoundingClientRect(); modalBtn = { x: b.x + b.width/2, y: b.y + b.height/2 }; }
    }
    return JSON.stringify({ pid: act ? parseInt(act.id, 10) : -1,
      isClaim: !!sel, passSpot: passSpot, modalBtn: modalBtn });
  })()`) || "{}");
  if (st.pid === 0) { myTurn = true; break; }
  if (st.modalBtn) { await realClick(st.modalBtn.x, st.modalBtn.y); }
  else if (st.isClaim && st.passSpot) { await realClick(st.passSpot.x, st.passSpot.y); }
  await sleep(400);
}
console.log("MY-TURN:", myTurn);
await sleep(7000); // 5.2s 后应自动催一句

const auto = JSON.parse(await evalJs(`JSON.stringify({
  groups: window.MJ_CHATTER ? Object.keys(window.MJ_CHATTER.groups) : [],
  lines: window.MJ_CHATTER ? Object.values(window.MJ_CHATTER.groups).reduce((n, a) => n + a.length, 0) : 0,
  stats: window.__mjEnhance && window.__mjEnhance.chatterStats ? window.__mjEnhance.chatterStats() : null,
  bubble: document.querySelector("#mj-chatter-bubble") ? {
    on: document.querySelector("#mj-chatter-bubble").classList.contains("mj-on"),
    text: document.querySelector("#mj-chatter-bubble").textContent
  } : null,
  audio: window.__fyLog.slice(),
  pace: !!window.__mjPace
})`));
console.log("AUTO:", JSON.stringify(auto));

// 五组逐个手动触发，检查字幕都换成本组方言台词
const manual = JSON.parse(await evalJs(`(() => {
  const E = window.__mjEnhance, out = [];
  ["wait", "meld", "win", "lose", "start"].forEach(function (k) {
    const ok = E.chatter(k, { cooldown: 0 });
    const el = document.querySelector("#mj-chatter-bubble");
    out.push({ k: k, ok: ok, text: el ? el.textContent : "" });
  });
  return JSON.stringify(out);
})()`));
// 语音是串行队列，六段各约 2~3s，等它们依次播完再统计，别把「还在排队」
// 误判成「没播出来」。
await sleep(17000);
const audioAfter = JSON.parse(await evalJs(`JSON.stringify(window.__fyLog.slice())`));
console.log("MANUAL:", JSON.stringify(manual));
console.log("FY-AUDIO:", JSON.stringify(audioAfter));

// 移动端：气泡不能压住放大后的手牌
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await sleep(1800);
const overlap = JSON.parse(await evalJs(`(() => {
  const b = document.querySelector("#mj-chatter-bubble");
  const h = document.querySelector("#mj-mobile-hand");
  if (!b || !h) return JSON.stringify({ found: false });
  const r1 = b.getBoundingClientRect(), r2 = h.getBoundingClientRect();
  return JSON.stringify({ found: true, bubbleBottom: Math.round(r1.bottom), handTop: Math.round(r2.top),
    overlap: r1.bottom > r2.top && r1.top < r2.bottom && r1.right > r2.left && r1.left < r2.right });
})()`));
console.log("MOBILE-OVERLAP:", JSON.stringify(overlap));
console.log("JS-ERRORS:", errors.length);
errors.slice(0, 5).forEach(e => console.log("  ", e));

const checks = {
  "俚语包已加载": auto.groups.length === 5 && auto.lines === 14,
  "节奏闸仍在": auto.pace === true,
  "等人出牌自动催话": (auto.stats?.counts?.wait || 0) >= 1,
  "字幕气泡已弹出": /阜阳话/.test(auto.bubble?.text || ""),
  "催的是阜阳俚语": /羊熊样|恁肉|肉叽/.test(auto.bubble?.text || ""),
  "俚语音频已播放": audioAfter.length >= 6,
  "五组字幕各不相同": new Set(manual.map(m => m.text)).size === 5 && manual.every(m => m.ok),
  "移动端不挡手牌": !overlap.found || overlap.overlap === false,
  "无 JS 异常": errors.length === 0
};
console.log("CHECKS:", JSON.stringify(checks));
console.log("RESULT:", Object.values(checks).every(Boolean) ? "PASS" : "FAIL");
chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
setTimeout(() => process.exit(0), 300);
