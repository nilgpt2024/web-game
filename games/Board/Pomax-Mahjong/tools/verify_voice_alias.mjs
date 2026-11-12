// 快速验证：east→东风 翻译 + 一条/青发新音频可访问 + sayTile 播放命中
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME_PATHS = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
];
const fs2 = await import("node:fs");
const chromeExe = CHROME_PATHS.find(p => fs2.existsSync(p));
const profile = mkdtempSync(join(tmpdir(), "mj-voice-check-"));
const chrome = spawn(chromeExe, [
  "--headless=new", "--disable-gpu", "--mute-audio", "--no-first-run",
  `--remote-debugging-port=9227`, `--user-data-dir=${profile}`,
  "about:blank",
], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 2500));

const targets = await (await fetch("http://127.0.0.1:9227/json/list")).json();
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

await send("Page.enable");
await send("Runtime.enable");
await send("Page.navigate", { url: "http://localhost:8774/" });
await sleep(5000);

// 1) east 翻译：注入一个 title="east" 的元素，等观察器回调后再读
const t1a = await send("Runtime.evaluate", { expression: `(() => {
  const el = document.createElement("game-tile");
  el.setAttribute("title", "east");
  document.body.appendChild(el);
  return true;
})()` });
await sleep(800);
const t1 = await send("Runtime.evaluate", { expression: `(() => {
  const els = [...document.querySelectorAll("game-tile[title]")].filter(e => e.getAttribute("title").includes("风") || e.getAttribute("title").includes("庄") || e.getAttribute("title") === "east");
  return JSON.stringify(els.map(e => e.getAttribute("title")));
})()`, returnByValue: true });
console.log("EAST-TITLES:", t1.result?.result?.value);

// 2) 一条/青发 的 sayTile 实际命中（直接调用，读 pack map）
const t2 = await send("Runtime.evaluate", { expression: `(() => {
  const pack = window.MJ_VOICE_PACK;
  return JSON.stringify({
    version: pack.version,
    mapS1: pack.map["一条"], mapDG: pack.map["青发"],
    p1S1: pack.tilesByPid["1"]["一条"], p1DG: pack.tilesByPid["1"]["青发"],
    enhance: !!window.__mjEnhance && typeof window.__mjEnhance.sayTile === "function"
  });
})()`, returnByValue: true });
console.log("PACK:", t2.result?.result?.value);

// 3) 播放实测：逐条调用并间隔（绕过 gate 冷却），读播放源
await send("Runtime.evaluate", { expression: `(() => {
  window.__played = [];
  const origPlay = HTMLAudioElement.prototype.play;
  HTMLAudioElement.prototype.play = function () {
    if (this.src) window.__played.push(this.src.split("/").pop());
    return origPlay.apply(this, arguments);
  };
  return true;
})()` });
const calls = [["1", "一条"], ["0", "青发"], ["1", "东风"]];
for (const [pid, name] of calls) {
  await send("Runtime.evaluate", { expression: `window.__mjEnhance.sayTile("${pid}", "${name}"); 1`, returnByValue: true });
  await sleep(1300);
}
const t3 = await send("Runtime.evaluate", { expression: `JSON.stringify(window.__played || [])`, returnByValue: true });
console.log("PLAYED:", t3.result?.result?.value);
console.log("CONSOLE-ERRORS:", errors.length, errors.slice(0, 2));

chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
setTimeout(() => process.exit(0), 300);
