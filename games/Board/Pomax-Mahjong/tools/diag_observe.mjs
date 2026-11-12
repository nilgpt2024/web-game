/* 纯观察：页面加载后谁自动开局、种子分数多少、有没有 CC 游戏偷跑 */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL_BASE = "http://localhost:8774/?rules=Fuyang+Mahjong";
const profile = mkdtempSync(join(tmpdir(), "mj-obs-"));
const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--mute-audio",
  `--user-data-dir=${profile}`, "--no-first-run",
  "--remote-debugging-port=9229", "about:blank"
], { stdio: "ignore" });

let targets = null;
for (let i = 0; i < 15; i++) {
  await new Promise(r => setTimeout(r, 1000));
  try {
    targets = await (await fetch("http://127.0.0.1:9229/json/list")).json();
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
const errors = [];
ws.addEventListener("message", ev => {
  const msg = JSON.parse(ev.data);
  if (msg.method === "Runtime.exceptionThrown") {
    const d = msg.params.exceptionDetails;
    errors.push(`EXC: ${d.text} ${d.exception?.description || ""} @${(d.url || "").split("/").pop()}:${d.lineNumber}`.slice(0, 300));
  }
  if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
    errors.push("CONSOLE: " + msg.params.args.map(a => a.value || a.description || "").join(" ").slice(0, 250));
  }
});
await send("Runtime.enable");
await send("Page.enable");
await send("Page.navigate", { url: URL_BASE });

// 每 2 秒观察一次，共 14 秒，不点任何东西
for (let t = 1; t <= 7; t++) {
  await sleep(2000);
  const r = await send("Runtime.evaluate", {
    expression: `(() => {
      const g = window.currentGame && window.currentGame.game;
      const ds = [...document.querySelectorAll(".player")].slice(0, 4).map(e => e.dataset.score);
      const modal = document.querySelector(".modal h1, .modal .panel h1, .modal .panel h3");
      return JSON.stringify({
        t: ${t * 2},
        hasGame: !!g,
        cls: g && g.rules ? g.rules.constructor.name : null,
        handNo: g ? g.hand : null,
        realScores: g && g.players ? g.players.map(p => p.getScore()) : null,
        dataset: ds,
        modalText: modal ? modal.textContent.slice(0, 30) : null,
        configRULES: (window.__mjConfigBridge && window.__mjConfigBridge.RULES) || null
      });
    })()`,
    returnByValue: true
  });
  console.log(r.result?.result?.value);
}
console.log("ERRORS:", errors.length ? "" : "(none)");
errors.slice(0, 5).forEach(e => console.log("  ", e));

chrome.kill();
setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }); } catch (e) {} process.exit(0); }, 300);
