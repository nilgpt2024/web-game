/* 验证：阜阳规则牌墙剔除花牌（136 张），其他规则仍含花牌（144 张） */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import * as fs from "node:fs";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const profile = mkdtempSync(join(tmpdir(), "mj-wall-"));
const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--mute-audio",
  `--user-data-dir=${profile}`, "--no-first-run",
  "--remote-debugging-port=9226", "about:blank"
], { stdio: "ignore" });

// 轮询等待 CDP 端口就绪（Chrome 启动可能需要几秒）
let targets = null;
for (let i = 0; i < 15; i++) {
  await new Promise(r => setTimeout(r, 1000));
  try {
    targets = await (await fetch("http://127.0.0.1:9226/json/list")).json();
    if (targets && targets.length) break;
  } catch (e) { /* retry */ }
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
const errors = [];
ws.addEventListener("message", ev => {
  const msg = JSON.parse(ev.data);
  if (msg.method === "Runtime.exceptionThrown") {
    const d = msg.params.exceptionDetails;
    errors.push(`EXC: ${d.text} ${d.exception?.description || ""}`.slice(0, 300));
  }
});
await send("Runtime.enable");
await send("Page.enable");

async function checkWall(url, label) {
  await send("Page.navigate", { url });
  await sleep(4500);
  const r = await send("Runtime.evaluate", {
    expression: `(async () => {
      const { Wall } = await import("/src/js/core/game/wall/wall.js?v=" + Date.now());
      const w = new Wall([]);
      const tiles = w.tiles;
      return JSON.stringify({
        total: tiles.length,
        flowers: tiles.filter(t => t >= 34).length
      });
    })()`,
    returnByValue: true,
    awaitPromise: true
  });
  console.log(label, JSON.stringify(r.result).slice(0, 200));
}

await checkWall("http://localhost:8774/?rules=Fuyang+Mahjong", "FUYANG:");
await checkWall("http://localhost:8774/index.html", "CLASSICAL:");
console.log("ERRORS:", errors.length ? "" : "(none)");
errors.forEach(e => console.log("  ", e));

chrome.kill();
setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }); } catch (e) {} process.exit(0); }, 300);
