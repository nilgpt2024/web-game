// 验证 v3 语音包：四位玩家报牌是否真的各用各的音色（重点 p1=云健）
// 用法: node tools/verify_voice_v3.mjs
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

const URL_BASE = "http://127.0.0.1:8774/";
const DEBUG_PORT = 9333;
const tmp = mkdtempSync(join(tmpdir(), "mj-voice-"));

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

// 连页面级 target
let ws, target;
for (let i = 0; i < 20; i++) {
  const list = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`)).json();
  target = list.find(t => t.type === "page");
  if (target) break;
  await sleep(300);
}
if (!target) throw new Error("no page target");
ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.addEventListener("open", res); ws.addEventListener("error", rej); });

let seq = 0;
const pending = new Map();
const consoleLogs = [];
ws.addEventListener("message", ev => {
  const msg = JSON.parse(ev.data);
  if (msg.method === "Runtime.exceptionThrown") {
    consoleLogs.push("EXC: " + JSON.stringify(msg.params.exceptionDetails).slice(0, 300));
  }
  if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
    consoleLogs.push("ERR: " + (msg.params.args || []).map(a => a.value || a.description || "").join(" ").slice(0, 300));
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
    console.error("EVAL-ERR:", JSON.stringify(r.result.exceptionDetails).slice(0, 600));
  }
  return r.result && r.result.result ? r.result.result.value : undefined;
}

await send("Runtime.enable");
await send("Page.enable");
await send("Page.navigate", { url: URL_BASE });
await sleep(6000);
const preEnv = await evalJs(`({ url: location.href, ready: document.readyState, mj: !!window.__mjEnhance, pack: !!window.MJ_VOICE_PACK })`);
console.log("PRE-ENV:", JSON.stringify(preEnv));
if (!preEnv.mj) console.log("CONSOLE:", JSON.stringify(consoleLogs));

// 注入 hook + 环境检查
const env = await evalJs(`(() => {
  const E = window.__mjEnhance;
  if (!E) return { ok: false, why: "no __mjEnhance" };
  window.__playedLog = [];
  const orig = HTMLAudioElement.prototype.play;
  HTMLAudioElement.prototype.play = function () {
    window.__playedLog.push(this.src ? this.src.split("/").pop() : "?");
    return orig.apply(this, arguments);
  };
  const p = window.MJ_VOICE_PACK;
  return {
    ok: true,
    manifestVersion: p ? p.version : null,
    hasTilesByPid: !!(p && p.tilesByPid),
    hasCalls: !!(p && p.calls),
    voices: p ? p.voices : null,
    state: { voice: E.state.voice, sound: E.state.sound, volume: E.state.volume },
  };
})()`);
console.log("ENV:", JSON.stringify(env));
if (!env.ok) { proc.kill(); rmSync(tmp, { recursive: true, force: true }); process.exit(1); }

// 解锁音频时钟（无头浏览器音频时钟不推进）
await evalJs(`window.__mjEnhance && window.__mjEnhance.hush && window.__mjEnhance.hush();`);

// 第一步：直接逐家实测 sayTile("一万")，记录播的文件
const probe = await evalJs(`(async () => {
  const E = window.__mjEnhance;
  const out = {};
  for (const pid of ["0", "1", "2", "3"]) {
    window.__playedLog.length = 0;
    const r = E.sayTile(pid, "一万", { priority: true });
    await new Promise(res => setTimeout(res, 450));
    out[pid] = { ret: r, files: [...window.__playedLog], cur: E.voicePack().current };
  }
  // 喊牌也各测一次
  for (const pid of ["0", "1", "2", "3"]) {
    window.__playedLog.length = 0;
    const r = E.sayFor(pid, "peng", { priority: true });
    await new Promise(res => setTimeout(res, 350));
    out[pid + "-peng"] = { ret: r, files: [...window.__playedLog] };
  }
  return out;
})()`);
console.log("PROBE:", JSON.stringify(probe, null, 1));

// 第二步：真实代玩对局 25 秒，看自然播报里 p1 是否出现
const startInfo = await evalJs(`(() => {
  window.__playedLog.length = 0;
  const auto = document.querySelector("#mj-auto");
  if (auto) { auto.click(); return { clicked: "mj-auto" }; }
  const cfg = window.__mjConfigBridge;
  if (cfg) cfg.set({ BOT_PLAY: true, PAUSE_ON_BLUR: false });
  return { clicked: "config-bridge" };
})()`);
console.log("START:", JSON.stringify(startInfo));
await sleep(600);
// 轮询点掉欢迎窗：选「亲自打/play」（BOT_PLAY 访问器已恒 true，实际仍是代玩）
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
for (let i = 0; i < 5; i++) {
  await sleep(5000);
  await evalJs(`window.__mjEnhance.hush && window.__mjEnhance.hush();`);
}
await evalJs(`(() => {
  const cfg = window.__mjConfigBridge;
  if (cfg && cfg.BOT_PLAY === undefined) return true; // 访问器模式，别动
  return true;
})()`);

const log = await evalJs(`window.__playedLog`);
const discards = await evalJs(`(() => {
  const froms = {};
  document.querySelectorAll(".discards game-tile.discard").forEach(t => {
    const f = t.getAttribute("from"); froms[f] = (froms[f] || 0) + 1;
  });
  return { froms, count: document.querySelectorAll(".discards game-tile.discard").length };
})()`);
const summary = await evalJs(`window.__mjEnhance.voicePack()`);

const p1Files = log.filter(f => f.startsWith("p1-"));
const byPrefix = {};
log.forEach(f => { const p = f.split("-")[0]; byPrefix[p] = (byPrefix[p] || 0) + 1; });
console.log("PLAYED total:", log.length, "byPrefix:", JSON.stringify(byPrefix));
console.log("p1 files:", JSON.stringify([...new Set(p1Files)]));
console.log("DISCARDS:", JSON.stringify(discards));
console.log("PACK:", JSON.stringify(summary));

proc.kill();
await sleep(300);
rmSync(tmp, { recursive: true, force: true });
