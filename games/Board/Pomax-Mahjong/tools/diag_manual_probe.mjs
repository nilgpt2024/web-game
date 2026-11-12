// 探查手动模式开局后的页面状态与交互要求
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chromeExe = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find(existsSync);
const profile = mkdtempSync(join(tmpdir(), "mj-probe-"));
const chrome = spawn(chromeExe, ["--headless=new", "--disable-gpu", "--mute-audio", "--no-first-run",
  "--window-size=1280,800",
  "--remote-debugging-port=9241", `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 2500));

const targets = await (await fetch("http://127.0.0.1:9241/json/list")).json();
const page = targets.find(t => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => { ws.onopen = r; });
let seq = 0;
const pending = new Map();
ws.addEventListener("message", ev => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
});
function send(method, params = {}) {
  return new Promise(res => { const id = ++seq; pending.set(id, res); ws.send(JSON.stringify({ id, method, params })); });
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function evalJs(expr) {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) {
    console.log("EVAL-ERR:", JSON.stringify(r.result.exceptionDetails).slice(0, 300));
    return undefined;
  }
  return r.result?.result?.value;
}

await send("Page.enable");
await send("Runtime.enable");
await send("Page.navigate", { url: "http://localhost:8774/" });
await sleep(5000);

// 点「亲自打」
for (let i = 0; i < 20; i++) {
  await sleep(1000);
  const r = await evalJs(`(() => {
    for (const p of document.querySelectorAll(".modal .panel")) {
      const btn = [...p.querySelectorAll("button")].find(b => /亲自打|play some mahjong/i.test(b.textContent || ""));
      if (btn) { btn.click(); return btn.textContent.trim(); }
    }
    return null;
  })()`);
  if (r) { console.log("clicked:", r); break; }
}

// 之后 8 秒内每秒探查一次页面状态
for (let t = 1; t <= 8; t++) {
  await sleep(1000);
  const st = await evalJs(`(() => {
    const g = window.currentGame && window.currentGame.game;
    const act = document.querySelector(".player.active");
    const modals = [...document.querySelectorAll(".modal .panel")].map(p => p.textContent.slice(0, 80));
    const handTiles = document.querySelectorAll(".player[id='0'] game-tile").length;
    const selectable = !!document.querySelector("game-tile.selectable");
    return JSON.stringify({ t: ${t}, hasGame: !!g, active: act ? act.id : null, handTiles: handTiles, selectable: selectable, modals: modals });
  })()`);
  console.log(st);
}
chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
setTimeout(() => process.exit(0), 300);
