/* 实测：打开用户 URL → 点欢迎窗里的「阜阳麻将」→ 抓报错 + 截屏 */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import * as fs from "node:fs";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL_BASE = "http://localhost:8774/?rules=Fuyang+Mahjong";
const profile = mkdtempSync(join(tmpdir(), "mj-click-"));
const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--mute-audio",
  `--user-data-dir=${profile}`, "--no-first-run",
  "--remote-debugging-port=9224", "about:blank"
], { stdio: "ignore" });

await new Promise(r => setTimeout(r, 2500));
const targets = await (await fetch("http://127.0.0.1:9224/json/list")).json();
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
const errors = [];
ws.addEventListener("message", ev => {
  const msg = JSON.parse(ev.data);
  if (msg.method === "Runtime.exceptionThrown") {
    const d = msg.params.exceptionDetails;
    errors.push(`EXC: ${d.text} ${d.exception?.description || ""} @${d.url || ""}:${d.lineNumber}`.slice(0, 400));
  }
  if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
    errors.push("CONSOLE: " + msg.params.args.map(a => a.value || a.description || "").join(" ").slice(0, 400));
  }
});

await send("Runtime.enable");
await send("Page.enable");
await send("Page.navigate", { url: URL_BASE });
await sleep(5000);

// 点欢迎窗里的「阜阳麻将」
const clicked = await send("Runtime.evaluate", {
  expression: `(() => {
    const btn = [...document.querySelectorAll("button, .button, input[type=button]")].find(b => /阜阳/.test(b.textContent || b.value || ""));
    if (!btn) return "NO-BUTTON";
    btn.click();
    return "CLICKED: " + btn.textContent.trim();
  })()`,
  returnByValue: true
});
console.log("CLICK:", clicked.result?.result?.value);
await sleep(6000);

// 抓页面状态：报错弹窗 / 当前规则 / 弃牌
const state = await send("Runtime.evaluate", {
  expression: `(() => {
    const errDlg = [...document.querySelectorAll(".modal, dialog, .modal-window")].map(d => d.textContent.replace(/\\s+/g, " ").trim()).find(t => t && t !== document.querySelector(".modal")?.textContent);
    const allModals = [...document.querySelectorAll(".modal, dialog")].map(d => d.textContent.replace(/\\s+/g, " ").slice(0, 120));
    return JSON.stringify({
      ready: document.readyState,
      locked: document.querySelectorAll("game-tile.locked, .player game-tile").length,
      modals: allModals,
      url: location.href
    });
  })()`,
  returnByValue: true
});
console.log("STATE:", state.result?.result?.value);
const shot = await send("Page.captureScreenshot", { format: "png" });
fs.writeFileSync("C:/Users/nil/AppData/Local/Temp/mj-click-fuyang.png", Buffer.from(shot.result.data, "base64"));
console.log("SHOT: C:/Users/nil/AppData/Local/Temp/mj-click-fuyang.png");
console.log("ERRORS:", errors.length ? "" : "(none)");
errors.forEach(e => console.log("  ", e));

chrome.kill();
setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }); } catch (e) {} process.exit(0); }, 300);
