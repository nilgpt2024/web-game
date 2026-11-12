/* 检查对局分数 + hook getRuleset 追踪规则解析 */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL_BASE = "http://localhost:8774/?rules=Fuyang+Mahjong";
const profile = mkdtempSync(join(tmpdir(), "mj-score2-"));
const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--mute-audio",
  `--user-data-dir=${profile}`, "--no-first-run",
  "--remote-debugging-port=9228", "about:blank"
], { stdio: "ignore" });

let targets = null;
for (let i = 0; i < 15; i++) {
  await new Promise(r => setTimeout(r, 1000));
  try {
    targets = await (await fetch("http://127.0.0.1:9228/json/list")).json();
    if (targets && targets.length) break;
  } catch (e) {}
}
if (!targets) { console.error("CDP not reachable"); chrome.kill(); process.exit(1); }
const page = targets.find(t => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.addEventListener("open", res); ws.addEventListener("error", rej); });
let seq = 0;
const pending = new Map();
ws.addEventListener("message", ev => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
});
const send = (m, p = {}) => new Promise(res => { const id = ++seq; pending.set(id, res); ws.send(JSON.stringify({ id, method: m, params: p })); });
const sleep = ms => new Promise(r => setTimeout(r, ms));
await send("Runtime.enable");
await send("Page.enable");
await send("Page.navigate", { url: URL_BASE });
await sleep(5000);

// hook getRuleset（在点击开局前装好）
const hook = await send("Runtime.evaluate", {
  expression: `(async () => {
    const m = await import('/src/js/core/scoring/ruleset.js');
    const log = window.__hookLog = [];
    if (!m.Ruleset.__hooked) {
      m.Ruleset.__hooked = true;
      const orig = m.Ruleset.getRuleset.bind(m.Ruleset);
      m.Ruleset.getRuleset = (name) => { log.push('getRuleset(' + name + ')'); return orig(name); };
    }
    return 'hooked';
  })()`,
  returnByValue: true,
  awaitPromise: true
});
console.log("HOOK:", JSON.stringify(hook.result?.result?.value));

// 点代玩 + 亲自打
await send("Runtime.evaluate", { expression: `(() => {
  const auto = document.getElementById("mj-auto");
  if (auto) auto.click();
  return "auto-clicked";
})()` });
;
// 轮询等待欢迎窗出现并点击「亲自打」（最多 20 秒）
let clickResult = 'never';
for (let i = 0; i < 20; i++) {
  await sleep(1000);
  const c = await send('Runtime.evaluate', { expression: `(() => {
    const panels = document.querySelectorAll('.modal .panel');
    for (const p of panels) {
      const btn = [...p.querySelectorAll('button')].find(b => /亲自打|play some mahjong/i.test(b.textContent || ''));
      if (btn) { btn.click(); return 'play-clicked'; }
    }
    return 'waiting';
  })()`, returnByValue: true });
  clickResult = c.result?.result?.value;
  if (clickResult === 'play-clicked') break;
}
console.log('CLICK:', clickResult);
await sleep(15000);

const r = await send("Runtime.evaluate", {
  expression: `(() => {
    const g = window.currentGame && window.currentGame.game;
    if (!g || !g.players) return JSON.stringify({ ok: false });
    return JSON.stringify({
      cls: g.rules.constructor.name,
      start: g.rules.player_start_score,
      handNo: g.hand,
      realScores: g.players.map(p => p.getScore()),
      datasetScores: [...document.querySelectorAll(".player")].slice(0, 4).map(e => e.dataset.score),
      uiRules: g.players.map(p => p.ui && p.ui.rules ? p.ui.rules.constructor.name : null)
    });
  })()`,
  returnByValue: true
});
console.log("SCORES:", r.result?.result?.value);
const hl = await send("Runtime.evaluate", { expression: "JSON.stringify(window.__hookLog || [])", returnByValue: true });
console.log("HOOK-LOG:", hl.result?.result?.value);

chrome.kill();
setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }); } catch (e) {} process.exit(0); }, 300);
