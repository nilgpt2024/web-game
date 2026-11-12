/* 诊断页面加载失败：抓 console 错误 + 资源加载失败 */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import * as fs from "node:fs";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL_BASE = "http://localhost:8774/?rules=Fuyang+Mahjong";
const profile = mkdtempSync(join(tmpdir(), "mj-diag-"));
const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--mute-audio",
  `--user-data-dir=${profile}`, "--no-first-run",
  "--remote-debugging-port=9223", "about:blank"
], { stdio: "ignore" });

await new Promise(r => setTimeout(r, 2500));

const targets = await (await fetch("http://127.0.0.1:9223/json/list")).json();
const page = targets.find(t => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.addEventListener("open", res); ws.addEventListener("error", rej); });
let seq = 0;
const pending = new Map();
ws.addEventListener("message", ev => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
});
function send(method, params = {}) {
  return new Promise(res => {
    const id = ++seq;
    pending.set(id, res);
    ws.send(JSON.stringify({ id, method, params }));
  });
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

await send("Runtime.enable");
await send("Page.enable");
await send("Network.enable");

const consoleErrors = [];
const failedReqs = [];
ws.addEventListener("message", ev => {
  const msg = JSON.parse(ev.data);
  if (msg.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(msg.params.type)) {
    consoleErrors.push(msg.params.args.map(a => a.value || a.description || "").join(" ").slice(0, 400));
  }
  if (msg.method === "Runtime.exceptionThrown") {
    const d = msg.params.exceptionDetails;
    consoleErrors.push(`EXC: ${d.text} ${d.exception?.description || ""}`.slice(0, 500));
  }
  if (msg.method === "Network.loadingFailed") {
    failedReqs.push(msg.params.errorText);
  }
});

await send("Page.navigate", { url: URL_BASE });
await sleep(6000);

const state = await send("Runtime.evaluate", { expression: `JSON.stringify({
  ready: document.readyState,
  bodyChildren: document.body ? document.body.children.length : -1,
  hasGame: !!document.querySelector("game Mahjong") || !!document.querySelector("mahjong-game"),
  mjEnhance: !!window.__mjEnhance,
  mjConfig: !!window.__mjConfigBridge,
  pack: !!window.MJ_VOICE_PACK
})`, returnByValue: true });

const shot = await send('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync('C:/Users/nil/AppData/Local/Temp/mj-user-url.png', Buffer.from(shot.result.data, 'base64'));
const ui = await send('Runtime.evaluate', { expression: `(() => {
  const dlg = document.querySelector('.modal, dialog, .modal-window');
  const modalText = dlg ? dlg.textContent.replace(/\\s+/g, ' ').slice(0, 200) : null;
  let errorBanner = null;
  for (const d of document.querySelectorAll('div, section, aside')) {
    const t = (d.textContent || '');
    if (/error|错误|Error/i.test(t) && t.length < 300) { errorBanner = t.replace(/\\s+/g,' ').slice(0,150); break; }
  }
  return JSON.stringify({ modalText, errorBanner, bodyHead: document.body.textContent.replace(/\\s+/g,' ').slice(0,120) });
})()`, returnByValue: true });
console.log('UI:', ui.result?.result?.value);
console.log('SHOT: C:/Users/nil/AppData/Local/Temp/mj-user-url.png');
const ui2 = await send('Runtime.evaluate', { expression: `(() => {
  const btn = document.getElementById('mj-rules');
  const curBtns = [...document.querySelectorAll('.mj-rules-choose button, #mj-rules-overlay button')].map(b => b.textContent.trim());
  return JSON.stringify({ rulesBtnText: btn ? btn.textContent.trim() : null, chooseButtons: curBtns });
})()`, returnByValue: true });
console.log('RULES-UI:', ui2.result?.result?.value);
console.log('PAGE-STATE:', state.result?.result?.value);
console.log("CONSOLE-ERRORS:", consoleErrors.length ? "" : "(none)");
consoleErrors.forEach(e => console.log("  ", e));
console.log("FAILED-REQS:", failedReqs.length ? failedReqs.join(" | ") : "(none)");

chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
process.exit(0);
