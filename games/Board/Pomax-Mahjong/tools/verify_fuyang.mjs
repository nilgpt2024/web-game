// 验证阜阳麻将玩法：?rules=Fuyang Mahjong 加载、无 JS 异常、代玩一局结算正常
// 用法: node tools/verify_fuyang.mjs
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME_CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  process.env.LOCALAPPDATA + "/Google/Chrome/Application/chrome.exe",
];
const fs = await import("node:fs");
const chrome = CHROME_CANDIDATES.find(p => fs.existsSync(p));
if (!chrome) { console.error("chrome not found"); process.exit(1); }

const URL_BASE = "http://127.0.0.1:8774/?rules=Fuyang%20Mahjong";
const DEBUG_PORT = 9334;
const tmp = mkdtempSync(join(tmpdir(), "mj-fuyang-"));

const proc = spawn(chrome, [
  "--headless=new",
  `--remote-debugging-port=${DEBUG_PORT}`,
  "--mute-audio",
  "--autoplay-policy=no-user-gesture-required",
  "--disable-gpu",
  `--user-data-dir=${tmp}`,
  "about:blank",
], { stdio: "ignore" });

const sleep = ms => new Promise(r => setTimeout(r, ms));
async function waitPort() {
  for (let i = 0; i < 40; i++) {
    try { const r = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/version`); if (r.ok) return; } catch {}
    await sleep(250);
  }
  throw new Error("CDP port not ready");
}
await waitPort();

let target;
for (let i = 0; i < 20; i++) {
  const list = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`)).json();
  target = list.find(t => t.type === "page");
  if (target) break;
  await sleep(300);
}
if (!target) throw new Error("no page target");
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.addEventListener("open", res); ws.addEventListener("error", rej); });

let seq = 0;
const pending = new Map();
const errors = [];
ws.addEventListener("message", ev => {
  const msg = JSON.parse(ev.data);
  if (msg.method === "Runtime.exceptionThrown") {
    errors.push(JSON.stringify(msg.params.exceptionDetails).slice(0, 400));
  }
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
});
function send(method, params = {}) {
  const id = ++seq;
  return new Promise(res => { pending.set(id, res); ws.send(JSON.stringify({ id, method, params })); });
}
async function evalJs(expr) {
  const r = await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true });
  if (r.result && r.result.exceptionDetails) {
    console.error("EVAL-ERR:", JSON.stringify(r.result.exceptionDetails).slice(0, 500));
  }
  return r.result && r.result.result ? r.result.result.value : undefined;
}

await send("Runtime.enable");
await send("Page.enable");
await send("Page.navigate", { url: URL_BASE });
await sleep(6000);

// 1. 规则加载检查
const env = await evalJs(`(() => {
  const cfg = window.__mjConfigBridge;
  return {
    rules: cfg && cfg.RULES,
    bridged: !!cfg,
  };
})()`);
console.log("ENV:", JSON.stringify(env));

// 2. 玩法选择条是否出现三个按钮
const ui = await evalJs(`(() => {
  const btns = [...document.querySelectorAll(".mj-rules-choose button, #mj-rules-overlay button")];
  return btns.map(b => b.textContent.trim());
})()`);
console.log("RULES-UI:", JSON.stringify(ui));

// 3. 代玩打一局（30 秒）：必须走 #mj-auto 按钮（访问器保护 BOT_PLAY
//    不被欢迎窗回调重置为 false），只 config.set 会被上游覆盖
await evalJs(`(() => {
  const auto = document.querySelector("#mj-auto");
  if (auto) auto.click();
  return !!auto;
})()`);
let startBtn = null;
for (let i = 0; i < 10; i++) {
  startBtn = await evalJs(`(() => {
    const btns = [...document.querySelectorAll("button")];
    const play = btns.find(b => /play some mahjong|亲自/i.test(b.textContent || ""));
    if (play) { play.click(); return play.textContent.trim(); }
    return null;
  })()`);
  if (startBtn) break;
  await sleep(500);
}
console.log("WELCOME-CLICK:", JSON.stringify(startBtn));

// 点掉「准备好开局了吗？开始！」等待窗（可能延迟出现，轮询点）
for (let i = 0; i < 10; i++) {
  const started = await evalJs(`(() => {
    const btns = [...document.querySelectorAll("button")];
    const go = btns.find(b => /^(开始|start)/i.test(b.textContent || ""));
    if (go) { go.click(); return go.textContent.trim(); }
    return null;
  })()`);
  if (started) { console.log("START-CLICK:", JSON.stringify(started)); break; }
  await sleep(800);
}

let chowSeen = 0, claims = [];
await evalJs(`(() => {
  // 监听公告，看有没有"吃"
  window.__claimLog = [];
  new MutationObserver(recs => {
    for (const r of recs) for (const n of r.addedNodes) {
      if (n.nodeType === 1 && n.matches && n.matches(".announcement")) {
        window.__claimLog.push((n.textContent || "").trim());
      }
    }
  }).observe(document.body, { childList: true, subtree: true });
  return true;
})()`);
for (let i = 0; i < 6; i++) {
  await sleep(5000);
  await evalJs(`window.__mjEnhance && window.__mjEnhance.hush && window.__mjEnhance.hush();`);
}
const claimLog = await evalJs(`window.__claimLog || []`);
const chows = claimLog.filter(s => /吃|chow/i.test(s));
console.log("CLAIMS:", JSON.stringify(claimLog));
console.log("CHOW-COUNT:", chows.length, "(应为 0)");

// 对局状态：弃牌数 / 胡牌 / 分数变动 / 碰杠数
const state = await evalJs(`(() => {
  const discards = document.querySelectorAll(".discards game-tile.discard").length;
  const scores = [...document.querySelectorAll(".player-wind, .playerbank, .players .player")].slice(0,4).map(e => e.dataset ? e.dataset.score : undefined);
  const locked = [0,1,2,3].map(i => {
    const p = document.getElementById(String(i));
    return p ? p.querySelectorAll("game-tile[locked]").length : -1;
  });
  const winner = [...document.querySelectorAll(".player.winner")].map(w => w.id);
  const body = document.body.className;
  return { discards, scores, locked, winner, body };
})()`);
console.log("STATE:", JSON.stringify(state));
const gameInfo = await evalJs(`(() => {
  const g = window.currentGame && window.currentGame.game;
  if (!g || !g.rules) return { game: !!g, rules: !!g && !!g.rules };
  return {
    cls: g.rules.constructor.name,
    start: g.rules.player_start_score,
    noChow: g.rules.noChow,
    selfDrawOnly: g.rules.selfDrawOnly,
    limit: g.rules.limit,
    handNo: g.hand
  };
})()`);
console.log("GAME:", JSON.stringify(gameInfo));
// 弹窗状态诊断：当前有没有 modal / 等待窗
const modalState = await evalJs(`(() => {
  const dialogs = [...document.querySelectorAll(".modal, dialog, .announcement, .mj-hint")].map(d => (d.textContent || "").trim().slice(0, 60)).filter(Boolean);
  const buttons = [...document.querySelectorAll("button")].map(b => b.textContent.trim()).slice(0, 12);
  return { dialogs, buttons };
})()`);
console.log("MODAL:", JSON.stringify(modalState));
const shot = await send("Page.captureScreenshot", { format: "png" });
if (shot.result && shot.result.data) {
  fs.writeFileSync(join(tmpdir(), "fuyang-state.png"), Buffer.from(shot.result.data, "base64"));
  console.log("SCREENSHOT: " + join(tmpdir(), "fuyang-state.png"));
}

// 4. 错误
console.log("JS-ERRORS:", errors.length, errors.slice(0, 3));

proc.kill();
await sleep(300);
rmSync(tmp, { recursive: true, force: true });
