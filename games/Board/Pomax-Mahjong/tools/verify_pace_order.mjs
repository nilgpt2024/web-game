// 验证代玩节奏：指示牌（.player.active 切换）应先于该玩家出牌 ~2.3s
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chromeExe = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find(existsSync);
const profile = mkdtempSync(join(tmpdir(), "mj-pace-order-"));
const chrome = spawn(chromeExe, ["--headless=new", "--disable-gpu", "--mute-audio", "--no-first-run",
  "--remote-debugging-port=9233", `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 2500));

const targets = await (await fetch("http://127.0.0.1:9233/json/list")).json();
const page = targets.find(t => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => { ws.onopen = r; });
let seq = 0;
const pending = new Map();
const errors = [];
ws.addEventListener("message", ev => {
  const msg = JSON.parse(ev.data);
  if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
    errors.push(String(msg.params.args?.[0]?.value || ""));
  }
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
});
function send(method, params = {}) {
  return new Promise(res => { const id = ++seq; pending.set(id, res); ws.send(JSON.stringify({ id, method, params })); });
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function evalJs(expr) {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return "EXC: " + JSON.stringify(r.result.exceptionDetails).slice(0, 200);
  return r.result?.result?.value;
}

await send("Page.enable");
await send("Runtime.enable");
await send("Page.navigate", { url: "http://localhost:8774/" });
await sleep(5000);

// 点「🤖 代玩」，轮询等欢迎窗点「亲自打」
await evalJs(`document.getElementById("mj-auto").click(); 1`);
let clicked = false;
for (let i = 0; i < 20; i++) {
  await sleep(1000);
  const r = await evalJs(`(() => {
    for (const p of document.querySelectorAll(".modal .panel")) {
      const btn = [...p.querySelectorAll("button")].find(b => /亲自打|play some mahjong/i.test(b.textContent || ""));
      if (btn) { btn.click(); return true; }
    }
    return false;
  })()`);
  if (r === true) { clicked = true; break; }
}
console.log("STARTED:", clicked);

// 注入事件时间戳收集器（激活 vs 出牌）
await evalJs(`(() => {
  window.__events = [];
  const banks = document.querySelectorAll(".player");
  const obs = new MutationObserver(() => {
    const a = document.querySelector(".player.active");
    if (a) window.__events.push({ t: performance.now(), type: "turn", pid: parseInt(a.id, 10) });
  });
  banks.forEach(b => obs.observe(b, { attributes: true, attributeFilter: ["class"] }));
  const dObs = new MutationObserver(records => {
    for (const r of records) for (const n of r.addedNodes) {
      if (n.nodeType === 1 && n.matches && n.matches("game-tile.discard")) {
        window.__events.push({ t: performance.now(), type: "discard", pid: parseInt(n.getAttribute("from"), 10) });
      }
    }
  });
  dObs.observe(document.body, { childList: true, subtree: true });
  return true;
})()`);
await sleep(20000);

const events = await evalJs(`JSON.stringify((window.__events || []).slice(-40))`);
const evs = JSON.parse(events);
// 对每个出牌事件，找它之前最近的一次同 pid 的 turn 事件
let leadTimes = [];
for (const d of evs.filter(e => e.type === "discard")) {
  const prev = evs.filter(e => e.type === "turn" && e.pid === d.pid && e.t <= d.t).pop();
  if (prev) leadTimes.push({ pid: d.pid, lead: Math.round(d.t - prev.t) });
}
console.log("TURNS:", evs.filter(e => e.type === "turn").length, "DISCARDS:", evs.filter(e => e.type === "discard").length);
console.log("LEAD-TIMES(指示先于出牌 ms):", JSON.stringify(leadTimes));
console.log("CONSOLE-ERRORS:", errors.length);
chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
setTimeout(() => process.exit(0), 300);
