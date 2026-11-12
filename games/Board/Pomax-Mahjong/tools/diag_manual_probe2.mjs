// 手动开局细查:点击前后的弹窗、事件序列、JS 异常
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chromeExe = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find(existsSync);
const profile = mkdtempSync(join(tmpdir(), "mj-probe2-"));
const chrome = spawn(chromeExe, ["--headless=new", "--disable-gpu", "--mute-audio", "--no-first-run",
  "--window-size=1280,800",
  "--remote-debugging-port=9242", `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 2500));

let targets = null;
for (let i = 0; i < 15; i++) {
  await new Promise(r => setTimeout(r, 1000));
  try {
    targets = await (await fetch("http://127.0.0.1:9242/json/list")).json();
    if (targets && targets.length) break;
  } catch (e) {}
}
if (!targets) { console.error("CDP not reachable"); chrome.kill(); process.exit(1); }
const page = targets.find(t => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => { ws.onopen = r; });
let seq = 0;
const pending = new Map();
const errors = [];
ws.addEventListener("message", ev => {
  const msg = JSON.parse(ev.data);
  if (msg.method === "Runtime.exceptionThrown") {
    const d = msg.params.exceptionDetails;
    errors.push(`EXC: ${d.text} ${d.exception?.description || ""} @${(d.url || "").split("/").pop()}:${d.lineNumber}`.slice(0, 250));
  }
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
});
function send(method, params = {}) {
  return new Promise(res => { const id = ++seq; pending.set(id, res); ws.send(JSON.stringify({ id, method, params })); });
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function evalJs(expr) {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) {
    console.log("EVAL-ERR:", JSON.stringify(r.result.exceptionDetails).slice(0, 200));
    return undefined;
  }
  return r.result?.result?.value;
}

await send("Page.enable");
await send("Runtime.enable");
await send("Page.navigate", { url: "http://localhost:8774/" });
await sleep(5000);

// 等欢迎弹窗出现
let found = false;
for (let i = 0; i < 20; i++) {
  await sleep(500);
  const st = await evalJs(`(() => {
    const panels = [...document.querySelectorAll(".modal .panel")];
    return JSON.stringify({ n: panels.length, texts: panels.map(p => p.textContent.slice(0, 60)) });
  })()`);
  const s = JSON.parse(st || "{}");
  if (s.n > 0) { console.log("modal before click:", st); found = true; break; }
}
if (!found) console.log("NO WELCOME MODAL APPEARED");

// 点击「亲自打」:完整事件序列
const clicked = await evalJs(`(() => {
  for (const p of document.querySelectorAll(".modal .panel")) {
    const btn = [...p.querySelectorAll("button")].find(b => /亲自打/i.test(b.textContent || ""));
    if (btn) {
      const r = btn.getBoundingClientRect();
      const opts = { bubbles: true, cancelable: true, clientX: r.x + r.width/2, clientY: r.y + r.height/2 };
      btn.dispatchEvent(new PointerEvent("pointerdown", opts));
      btn.dispatchEvent(new MouseEvent("mousedown", opts));
      btn.dispatchEvent(new PointerEvent("pointerup", opts));
      btn.dispatchEvent(new MouseEvent("mouseup", opts));
      btn.click();
      return "clicked:" + btn.textContent.slice(0, 20);
    }
  }
  return "no-button";
})()`);
console.log("CLICK:", clicked);

for (let t = 1; t <= 6; t++) {
  await sleep(1000);
  const st = await evalJs(`JSON.stringify({hasGame: !!window.currentGame, hand0: document.querySelectorAll(".player[id='0'] game-tile").length, activeId: (document.querySelector(".player.active")||{id:null}).id, nmodals: document.querySelectorAll(".modal .panel").length, modalText: (document.querySelector(".modal .panel")||{textContent:""}).textContent.slice(0,40)})`);
  console.log(st);
}
console.log("JS-ERRORS:", errors.length ? "" : "(none)");
errors.slice(0, 5).forEach(e => console.log("  ", e));
chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
setTimeout(() => process.exit(0), 300);
