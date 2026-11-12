// 诊断：出牌(discard) → 下一个「该谁出牌」指示(.player.active 切换) 的间隔
// 用户期望：一张牌打出后，指示立即切到下一位
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chromeExe = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find(existsSync);
const profile = mkdtempSync(join(tmpdir(), "mj-discard-gap-"));
const chrome = spawn(chromeExe, ["--headless=new", "--disable-gpu", "--mute-audio", "--no-first-run",
  "--remote-debugging-port=9236", `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 2500));

const targets = await (await fetch("http://127.0.0.1:9236/json/list")).json();
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

// 事件采集：出牌入池、claim 入池(吃碰杠)、active 切换
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
await sleep(22000);

const events = await evalJs(`JSON.stringify((window.__events || []).slice(-60))`);
const evs = JSON.parse(events);
// 每张出牌到下一次 turn 事件的间隔
let gaps = [];
for (let i = 0; i < evs.length; i++) {
  if (evs[i].type !== "discard") continue;
  const next = evs.slice(i + 1).find(e => e.type === "turn");
  if (next) gaps.push({ from: evs[i].pid, to: next.pid, gap: Math.round(next.t - evs[i].t) });
}
console.log("DISCARDS:", evs.filter(e => e.type === "discard").length);
console.log("出牌→下一个指示 的间隔(ms):", JSON.stringify(gaps.slice(-15)));
console.log("CONSOLE-ERRORS:", errors.length);
chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
setTimeout(() => process.exit(0), 300);
