// 快查：增强层 __mjEnhance / __mjPace 是否挂载，以及脚本加载/异常详情
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const URL = process.argv[2] || "http://localhost:8774/";
const PORT = 9262;
const chromeExe = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find(existsSync);
const profile = mkdtempSync(join(tmpdir(), "mj-pace-boot-"));
const chrome = spawn(chromeExe, ["--headless=new", "--disable-gpu", "--mute-audio", "--no-first-run",
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 2200));
const targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
const ws = new WebSocket(targets.find(t => t.type === "page").webSocketDebuggerUrl);
await new Promise(r => { ws.onopen = r; });
let seq = 0; const pending = new Map(); const log = [];
ws.addEventListener("message", ev => {
  const m = JSON.parse(ev.data);
  if (m.method === "Runtime.exceptionThrown") log.push("EXC " + JSON.stringify(m.params.exceptionDetails).slice(0, 400));
  if (m.method === "Runtime.consoleAPICalled") log.push("CONSOLE[" + m.params.type + "] " + m.params.args.map(a => a.value || a.description || "").join(" ").slice(0, 300));
  if (m.method === "Network.loadingFailed") log.push("NETFAIL " + JSON.stringify(m.params).slice(0, 250));
  if (m.method === "Network.responseReceived" && /immersive|showtime|autopilot/.test(m.params.response.url)) {
    log.push("RESP " + m.params.response.status + " " + m.params.response.url.split("?")[0].split("/").pop() + " " + (m.params.response.url.split("?")[1] || ""));
  }
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
});
const send = (method, params = {}) => new Promise(res => { const id = ++seq; pending.set(id, res); ws.send(JSON.stringify({ id, method, params })); });
const evalJs = async expr => (await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true })).result?.result?.value;
await send("Runtime.enable"); await send("Network.enable"); await send("Page.enable");
await send("Page.navigate", { url: URL });
await new Promise(r => setTimeout(r, 8000));
console.log("STATE:", await evalJs(`JSON.stringify({
  enhance: typeof window.__mjEnhance,
  pace: typeof window.__mjPace,
  bridge: typeof window.__mjConfigBridge,
  playInterval: (window.__mjConfigBridge||{}).PLAY_INTERVAL,
  bodyClass: document.body && document.body.className,
  scripts: document.scripts.length,
  immersiveScript: [...document.scripts].filter(s => /immersive/.test(s.src)).map(s => s.src),
  res: performance.getEntriesByType("resource").filter(e => /immersive|showtime|autopilot/.test(e.name)).map(e => ({n:e.name.split("/").pop(), st:e.responseStatus, size:e.transferSize}))
})`));
console.log("EVENTS:"); log.slice(0, 40).forEach(l => console.log("  ", l));
chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
setTimeout(() => process.exit(0), 300);
