// 验证「失焦暂停」已彻底移除：
//  1) 配置恒为 false（含 ?pause_on_blur=true 也不能复活）
//  2) 设置面板不再有该开关
//  3) 牌桌 blur / 点击页面别处后，玩家不被 pause、无 GAME PAUSED 遮罩
//  4) 失焦后 AI 仍继续出牌（弃牌数增长），0 JS 异常
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const URL = process.argv[2] || "http://localhost:8774/";
const PORT = 9251;
const chromeExe = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find(existsSync);
const profile = mkdtempSync(join(tmpdir(), "mj-nopause-"));
const chrome = spawn(chromeExe, ["--headless=new", "--disable-gpu", "--mute-audio", "--no-first-run",
  "--window-size=1280,800", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 2500));

let targets = null;
for (let i = 0; i < 10; i++) {
  try { targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); break; }
  catch (e) { await new Promise(r => setTimeout(r, 800)); }
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
    errors.push("EXC: " + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text || "").slice(0, 160));
  }
  if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") {
    errors.push("CONSOLE: " + String(m.params.args?.[0]?.value || "").slice(0, 160));
  }
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
});
function send(method, params = {}) {
  return new Promise(res => { const id = ++seq; pending.set(id, res); ws.send(JSON.stringify({ id, method, params })); });
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function evalJs(expr) {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) errors.push("EVAL-EXC: " + String(r.result.exceptionDetails.exception?.description || "").slice(0, 160));
  return r.result?.result?.value;
}
async function realClick(x, y) {
  await send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });
}

await send("Page.enable");
await send("Runtime.enable");
await send("Page.navigate", { url: URL });
// 公网 module 依赖链会推迟 DOMContentLoaded，给足时间
await sleep(URL.includes("localhost") ? 6000 : 16000);

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}: ${detail}`);
}

// ---- 1) 配置层 ----
const cfg = await evalJs(`(() => {
  const c = window.__mjConfigBridge;
  const b = document.querySelector(".board");
  return JSON.stringify({
    bridge: !!c,
    pauseOnBlur: c ? c.PAUSE_ON_BLUR : "NO-BRIDGE",
    default: c && c.DEFAULT_CONFIG ? c.DEFAULT_CONFIG.PAUSE_ON_BLUR : "N/A",
    boardGuard: !!(b && b.__mjNoPauseBlur),
    toolbar: !!document.getElementById("mj-toolbar")
  });
})()`);
const c = JSON.parse(cfg || "{}");
check("增强层已加载", c.toolbar === true, `toolbar=${c.toolbar} bridge=${c.bridge} boardGuard=${c.boardGuard}`);
check("PAUSE_ON_BLUR 恒为 false", c.pauseOnBlur === false && c.default === false,
  `runtime=${c.pauseOnBlur} default=${c.default}`);
check("board blur 拦截已挂载", c.boardGuard === true, `boardGuard=${c.boardGuard}`);

// ---- 2) 设置面板不再有该开关 ----
const settingsText = await evalJs(`(() => {
  const s = document.querySelector(".corner.settings");
  if (s) s.click();
  return [...document.querySelectorAll(".modal .panel")].map(p => p.textContent).join(" | ").slice(0, 600);
})()`);
const hasPauseOption = /Pause game unless focused|窗口失焦时暂停|pause_on_blur/i.test(settingsText || "");
check("设置面板已移除暂停开关", !hasPauseOption, hasPauseOption ? "仍存在" : "无该选项");
// 关闭设置面板
await evalJs(`(() => {
  for (const p of document.querySelectorAll(".modal .panel")) {
    const btn = [...p.querySelectorAll("button, input")].find(b => /不保存并关闭|Closing without saving/i.test(b.textContent || b.value || ""));
    if (btn) { btn.click(); return "closed"; }
  }
  return "no-close-btn";
})()`);

// ---- 3) 代玩模式开局（AI 持续出牌，便于验证失焦后是否卡住）----
await evalJs(`(() => { const a = document.getElementById("mj-auto"); if (a) a.click(); return 1; })()`);
let started = false;
for (let i = 0; i < 30; i++) {
  await sleep(1000);
  const r = await evalJs(`(() => {
    if (window.currentGame && document.querySelector(".player.active") && !document.querySelector(".modal:not(.hidden)")) return "game-on";
    for (const p of document.querySelectorAll(".modal .panel")) {
      const btn = [...p.querySelectorAll("button")].find(b => /亲自打|开始|play some mahjong/i.test(b.textContent || ""));
      if (btn) { btn.click(); return "clicked"; }
    }
    return "waiting";
  })()`);
  if (r === "game-on") { started = true; break; }
}
check("代玩对局已开始", started, started ? "有 active 玩家且无弹窗" : "开局失败");
await sleep(3000);

const stateExpr = `(() => {
  const g = window.currentGame;
  const d = document.querySelector(".discards");
  const aft = d ? getComputedStyle(d, "::after") : null;
  return JSON.stringify({
    discards: d ? d.querySelectorAll("game-tile.discard").length : -1,
    pausedClass: d ? d.classList.contains("paused") : null,
    playersPaused: g ? g.players.map(p => !!p.paused) : [],
    overlay: aft ? aft.display + "/" + aft.content : "N/A",
    active: !!document.querySelector(".player.active")
  });
})()`;
const before = JSON.parse((await evalJs(stateExpr)) || "{}");
console.log("BEFORE-BLUR:", JSON.stringify(before));

// ---- 4) 模拟误触：牌桌失焦 + 真实点击页面空白处 ----
await evalJs(`(() => { const b = document.querySelector(".board"); if (b) b.blur(); return 1; })()`);
await sleep(400);
const afterBlur = JSON.parse((await evalJs(stateExpr)) || "{}");
check("board.blur() 后玩家未被暂停", (afterBlur.playersPaused || []).every(v => v === false),
  JSON.stringify(afterBlur.playersPaused));
check("无 GAME PAUSED 遮罩", afterBlur.pausedClass === false && !/GAME PAUSED/i.test(afterBlur.overlay || ""),
  `paused=${afterBlur.pausedClass} overlay=${afterBlur.overlay}`);

// 真实鼠标点击页面左上角空白（工具栏之外），让牌桌失去焦点
await realClick(3, 300);
await sleep(400);
const afterClick = JSON.parse((await evalJs(stateExpr)) || "{}");
check("点击页面别处后仍未被暂停", (afterClick.playersPaused || []).every(v => v === false),
  JSON.stringify(afterClick.playersPaused));

// ---- 5) 失焦之后 AI 仍在出牌 ----
await sleep(7000);
const after = JSON.parse((await evalJs(stateExpr)) || "{}");
console.log("AFTER-7s:", JSON.stringify(after));
check("失焦后对局继续推进", after.discards > before.discards,
  `弃牌 ${before.discards} → ${after.discards}`);

// ---- 6) URL 参数也不能把它复活 ----
await send("Page.navigate", { url: URL + (URL.includes("?") ? "&" : "?") + "pause_on_blur=true" });
await sleep(URL.includes("localhost") ? 6000 : 16000);
const forced = await evalJs(`(() => JSON.stringify({
  pauseOnBlur: window.__mjConfigBridge ? window.__mjConfigBridge.PAUSE_ON_BLUR : "NO-BRIDGE",
  boardGuard: !!(document.querySelector(".board") || {}).__mjNoPauseBlur
}))()`);
const f = JSON.parse(forced || "{}");
check("?pause_on_blur=true 无法复活", f.pauseOnBlur === false, `runtime=${f.pauseOnBlur} boardGuard=${f.boardGuard}`);

console.log("JS-ERRORS:", errors.length, errors.slice(0, 4));
const failed = results.filter(r => !r.ok);
console.log(`SUMMARY: ${results.length - failed.length}/${results.length} passed, ${errors.length} JS errors`);
chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
setTimeout(() => process.exit(failed.length || errors.length ? 1 : 0), 300);
