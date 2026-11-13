// 验证「出牌节奏跟着中文报牌走」：手动模式下一圈 4 张牌必须够念完
// 4 句牌名（每句 1.1~1.4s），且任何一句都不能被下一句掐断。
// 用法: node tools/verify_voice_pace.mjs [url] [port]
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const URL = process.argv[2] || "http://localhost:8774/";
const PORT = Number(process.argv[3] || 9261);
// 公网验证时本机默认代理可能已失效，显式指定可用代理，
// 否则 mp3 全部拉不到，会把「网络问题」误判成「语音被打断」。
const PROXY = process.argv[5] || "";
const chromeExe = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find(existsSync);
const profile = mkdtempSync(join(tmpdir(), "mj-voice-pace-"));
const chromeArgs = ["--headless=new", "--disable-gpu", "--mute-audio", "--no-first-run",
  "--window-size=1280,800", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`];
if (PROXY) chromeArgs.push(`--proxy-server=${PROXY}`);
chromeArgs.push("about:blank");
const chrome = spawn(chromeExe, chromeArgs, { stdio: "ignore" });
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
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function evalJs(expr) {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) errors.push("EVAL " + JSON.stringify(r.result.exceptionDetails).slice(0, 180));
  return r.result?.result?.value;
}

await send("Page.enable");
await send("Runtime.enable");
await send("Page.navigate", { url: URL });
// 本地 ES module 依赖链较长；公网 CDN 还要更久（第 4 个参数可加大）
await sleep(Number(process.argv[4] || 8000));

// 手动开局：依次点「亲自打一局」和「准备好开局了吗 / 开始」
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
console.log("STARTED(manual):", started);

const env = await evalJs(`JSON.stringify({
  pace: !!window.__mjPace,
  settle: typeof (window.__mjPace || {}).settle,
  playInterval: (window.__mjConfigBridge || {}).PLAY_INTERVAL,
  autopilot: (window.__mjEnhance || {}).state?.autopilot,
  sound: (window.__mjEnhance || {}).state?.sound
})`);
console.log("ENV:", env);

// 开局后、首次弃牌前注入探针：记录每段 voice/*.mp3 的开始 / ended /
// 被 pause 掐断，以及弃牌 / 换人事件（此时 .player 已由上游建好）
await evalJs(`(() => {
  window.__paceLog = { clips: [], discards: [], turns: [] };
  const L = window.__paceLog;
  const native = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function () {
    const src = this.currentSrc || this.src || "";
    if (/\\/voice\\/[^/]+\\.mp3/.test(src)) {
      const rec = { f: src.split("/").pop().split("?")[0], t0: performance.now(), ended: null, pause: null };
      L.clips.push(rec);
      this.addEventListener("ended", () => { rec.ended = performance.now(); }, { once: true });
      this.addEventListener("pause", () => { rec.pause = performance.now(); }, { once: true });
    }
    return native.apply(this, arguments);
  };
  new MutationObserver(rs => {
    for (const r of rs) for (const n of r.addedNodes) {
      if (n.nodeType === 1 && n.matches && n.matches("game-tile.discard") && n.closest(".discards")) {
        L.discards.push({ t: performance.now(), pid: parseInt(n.getAttribute("from"), 10) });
      }
    }
  }).observe(document.body, { childList: true, subtree: true });
  const o = new MutationObserver(() => {
    const a = document.querySelector(".player.active");
    if (a) L.turns.push({ t: performance.now(), pid: parseInt(a.id, 10) });
  });
  document.querySelectorAll(".player").forEach(b => o.observe(b, { attributes: true, attributeFilter: ["class"] }));
  return true;
})()`);

async function realClick(x, y) {
  await send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });
}
const actions = {};
const deadline = Date.now() + 38000;
while (Date.now() < deadline) {
  await sleep(320);
  const st = await evalJs(`(() => {
    const act = document.querySelector(".player.active");
    const selDiscard = document.querySelector(".discards game-tile.selectable");
    let selBox = null;
    if (selDiscard) { const b = selDiscard.getBoundingClientRect(); selBox = { x: b.x + b.width/2, y: b.y + b.height/2 }; }
    let passSpot = null;
    const d = document.querySelector(".discards");
    if (d) { const b = d.getBoundingClientRect(); passSpot = { x: b.x + 12, y: b.y + 12 }; }
    const pid = act ? parseInt(act.id, 10) : -1;
    let tileSpot = null;
    if (pid === 0) {
      const bank = document.querySelector(".player[id='0']");
      const tiles = bank ? [...bank.querySelectorAll("game-tile")].filter(t => !t.hasAttribute("locked") && !t.hasAttribute("hidden")) : [];
      if (tiles.length) { const b = tiles[tiles.length-1].getBoundingClientRect(); tileSpot = { x: b.x + b.width/2, y: b.y + b.height/2 }; }
    }
    let modalBtn = null;
    for (const p of document.querySelectorAll(".modal .panel")) {
      const btn = [...p.querySelectorAll("button")].find(b => /确定|确认|OK|继续|开始/i.test(b.textContent || ""));
      if (btn) { const b = btn.getBoundingClientRect(); modalBtn = { x: b.x + b.width/2, y: b.y + b.height/2 }; }
    }
    return JSON.stringify({ pid, isClaim: !!selDiscard, selBox, passSpot, tileSpot, modalBtn });
  })()`);
  const s = JSON.parse(st || "{}");
  if (s.modalBtn) { await realClick(s.modalBtn.x, s.modalBtn.y); actions["modal-ok"] = (actions["modal-ok"] || 0) + 1; continue; }
  if (s.isClaim && s.passSpot) {
    const spot = s.passSpot;
    if (s.selBox && Math.hypot(spot.x - s.selBox.x, spot.y - s.selBox.y) < 60) continue;
    await realClick(spot.x, spot.y); actions["pass-claim"] = (actions["pass-claim"] || 0) + 1; continue;
  }
  if (s.tileSpot) {
    // 长辈模式二次确认：连点同一张两次
    await realClick(s.tileSpot.x, s.tileSpot.y);
    await realClick(s.tileSpot.x, s.tileSpot.y);
    actions["discard0"] = (actions["discard0"] || 0) + 1; continue;
  }
  actions["idle:" + s.pid] = (actions["idle:" + s.pid] || 0) + 1;
}

const raw = await evalJs(`JSON.stringify({
  clips: window.__paceLog.clips,
  discards: window.__paceLog.discards,
  turns: window.__paceLog.turns,
  voicePack: window.__mjEnhance ? window.__mjEnhance.voicePack() : null,
  pending: window.__mjPace ? window.__mjPace.pending() : -1,
  reports: window.__mjPace && window.__mjPace.reports ? window.__mjPace.reports() : -1,
  thinks: window.__mjPace && window.__mjPace.thinks ? window.__mjPace.thinks() : []
})`);
const L = JSON.parse(raw);
console.log("AUTOPLAY-ACTIONS:", JSON.stringify(actions));

const gaps = [];
for (let i = 1; i < L.discards.length; i++) gaps.push(Math.round(L.discards[i].t - L.discards[i-1].t));
const laps = [];
for (let i = 4; i < L.discards.length; i++) laps.push(Math.round(L.discards[i].t - L.discards[i-4].t));
const played = L.clips.filter(c => c.ended !== null);
const paused = L.clips.filter(c => c.pause !== null);
// 抢播掐断：下一句把上一句提前 pause（通常几百毫秒内），这是报牌碎片的根因。
// 加载超时：等不到 playing、兜底主动放弃（>=1000ms），属于另一类问题，单列统计。
const cut = paused.filter(c => (c.ended === null || c.pause < c.ended - 80) && c.pause - c.t0 < 1000);
const stalled = paused.filter(c => c.ended === null && c.pause - c.t0 >= 1000);
const full = played.filter(c => c.ended - c.t0 >= 800);
const median = a => { if (!a.length) return 0; const s = [...a].sort((x,y)=>x-y); return s[Math.floor(s.length/2)]; };

console.log("DISCARDS:", L.discards.length, "TURNS:", L.turns.length, "VOICE-CLIPS:", L.clips.length);
console.log("弃牌间隔(ms):", JSON.stringify(gaps.slice(0, 16)), "median=", median(gaps));
console.log("一圈4张耗时(ms):", JSON.stringify(laps.slice(0, 8)), "median=", median(laps));
console.log("语音播完:", played.length, "完整>=800ms:", full.length, "抢播打断:", cut.length, "加载超时放弃:", stalled.length);
console.log("被打断明细:", JSON.stringify(cut.map(c => ({ f: c.f, t0: Math.round(c.t0), pause: c.pause ? Math.round(c.pause - c.t0) : null, ended: c.ended ? Math.round(c.ended - c.t0) : null }))));
console.log("超时明细:", JSON.stringify(stalled.map(c => ({ f: c.f, wait: c.pause ? Math.round(c.pause - c.t0) : null }))));
const thinks = L.thinks || [];
const thinkDistinct = new Set(thinks.map(v => Math.round(v / 50))).size;
const thinkSpread = thinks.length ? Math.max(...thinks) - Math.min(...thinks) : 0;
const gapDistinct = new Set(gaps.map(g => Math.round(g / 100))).size;
console.log("拟人思考停顿(ms):", JSON.stringify(thinks), "去重档位=", thinkDistinct, "极差=", thinkSpread);
console.log("弃牌间隔去重档位(100ms):", gapDistinct);
// 严格同步判据：任意一张牌落桌的那一刻，不允许还有上一轮报牌在播。
// 直接对应「都出过牌了报牌还在念、越落越远」，且不依赖猜哪段音频
// 属于哪张牌（pX-chi/peng/hu 等喊牌音频会混进牌名序列，按索引配对会错位）。
const overlaps = [];
for (let i = 1; i < L.discards.length; i++) {
  const t = L.discards[i].t;
  const busy = L.clips.filter(c => c.t0 < t - 30 && (c.ended === null || c.ended > t + 120));
  if (busy.length) overlaps.push({ discard: i,
    busy: busy.map(c => ({ f: c.f, startedAgo: Math.round(t - c.t0),
      endsIn: c.ended === null ? null : Math.round(c.ended - t) })) });
}
const syncOk = L.discards.length >= 5 && overlaps.length === 0;
console.log("落牌时仍在播的音频(应为空):", JSON.stringify(overlaps.slice(0, 8)));
console.log("检查落牌时刻:", L.discards.length - 1, "重叠次数:", overlaps.length);
console.log("VOICE-PACK:", JSON.stringify(L.voicePack), "pending:", L.pending, "reports:", L.reports);
console.log("JS-ERRORS:", errors.length);
errors.slice(0, 5).forEach(e => console.log("  ", e));

const checks = {
  "节奏闸已挂载": /"pace":true/.test(env),
  "每家间隔 >=900ms": median(gaps) >= 900,
  "一圈 >=3600ms": median(laps) >= 3600,
  "报牌无被打断": cut.length === 0,
  "多数报牌播完整": L.clips.length === 0 || full.length / Math.max(1, L.clips.length) >= 0.7,
  "报牌数跟得上弃牌": L.clips.length >= Math.min(4, L.discards.length),
  "报牌播完才轮下家": syncOk,
  // 采样瞬间可能正好有一张牌在报（票未销），允许 1 张；持续 >1 才是积压
  "报牌票无积压": L.reports >= 0 && L.reports <= 1,
  "拟人停顿已启用": thinks.length >= 6,
  // v28 起已按用户要求取消长考，抖动上限 300ms，极差门槛相应下调
  "停顿有随机性": thinkDistinct >= 4 && thinkSpread >= 150,
  "间隔不匀速": gapDistinct >= 4,
  "节奏未失控": median(gaps) >= 900 && median(gaps) <= 3400,
  "无 JS 异常": errors.length === 0
};
console.log("CHECKS:", JSON.stringify(checks));
console.log("RESULT:", Object.values(checks).every(Boolean) ? "PASS" : "FAIL");

chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
setTimeout(() => process.exit(0), 300);
