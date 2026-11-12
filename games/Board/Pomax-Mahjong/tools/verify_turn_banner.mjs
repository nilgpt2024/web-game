// 验证回合指示横幅：观察 .player.active 变化 → 横幅文本/显隐 + 进度条隐藏
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME_PATHS = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
];
const chromeExe = CHROME_PATHS.find(existsSync);
const profile = mkdtempSync(join(tmpdir(), "mj-turn-check-"));
const chrome = spawn(chromeExe, [
  "--headless=new", "--disable-gpu", "--mute-audio", "--no-first-run",
  "--remote-debugging-port=9228", `--user-data-dir=${profile}`,
  "about:blank",
], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 2500));

const targets = await (await fetch("http://127.0.0.1:9228/json/list")).json();
const page = targets.find(t => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => { ws.onopen = r; });
let seq = 0;
const pending = new Map();
const errors = [];
ws.addEventListener("message", ev => {
  const msg = JSON.parse(ev.data);
  if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
    errors.push(String(msg.params.args?.[0]?.value || msg.params.args?.[0]?.description || ""));
  }
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
});
function send(method, params = {}) {
  return new Promise(res => { const id = ++seq; pending.set(id, res); ws.send(JSON.stringify({ id, method, params })); });
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function evalJs(expr) {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
  if (r.result?.exceptionDetails) return "EXC: " + JSON.stringify(r.result.exceptionDetails).slice(0, 150);
  return r.result?.result?.value;
}

await send("Page.enable");
await send("Runtime.enable");
await send("Page.navigate", { url: "http://localhost:8774/" });
await sleep(5000);

console.log("BANNER-EXISTS:", await evalJs(`!!document.getElementById("mj-turn-banner")`));

// 模拟回合切换：给不同玩家加 active 类
await evalJs(`document.querySelectorAll(".player").forEach(p => p.classList.remove("active"));
document.querySelector('.player[id="2"]').classList.add("active"); 1`);
await sleep(400);
console.log("TURN-2:", await evalJs(`(() => { const b = document.getElementById("mj-turn-banner"); return JSON.stringify({ text: b.textContent, on: b.classList.contains("mj-on"), you: b.classList.contains("mj-you") }); })()`));

await evalJs(`document.querySelectorAll(".player").forEach(p => p.classList.remove("active"));
document.querySelector('.player[id="0"]').classList.add("active"); 1`);
await sleep(400);
console.log("TURN-0:", await evalJs(`(() => { const b = document.getElementById("mj-turn-banner"); return JSON.stringify({ text: b.textContent, on: b.classList.contains("mj-on"), you: b.classList.contains("mj-you") }); })()`));

await evalJs(`document.querySelectorAll(".player").forEach(p => p.classList.remove("active")); 1`);
await sleep(400);
console.log("TURN-NONE:", await evalJs(`(() => { const b = document.getElementById("mj-turn-banner"); return JSON.stringify({ on: b.classList.contains("mj-on") }); })()`));

// 进度条应被 CSS 隐藏
console.log("BAR-DISPLAY:", await evalJs(`(() => { const bar = document.querySelector(".discards .countdown-bar"); return bar ? getComputedStyle(bar).display : "no-bar-el"; })()`));

console.log("CONSOLE-ERRORS:", errors.length, errors.slice(0, 2));
chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
setTimeout(() => process.exit(0), 300);
