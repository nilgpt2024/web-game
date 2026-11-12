/* 复现：localStorage 残留坏规则名 "Fuyang"（第一版类名 bug）时的页面行为 */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import * as fs from "node:fs";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const profile = mkdtempSync(join(tmpdir(), "mj-ls-"));
const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--mute-audio",
  `--user-data-dir=${profile}`, "--no-first-run",
  "--remote-debugging-port=9225", "about:blank"
], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 2500));

const targets = await (await fetch("http://127.0.0.1:9225/json/list")).json();
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

// 第一步：先打开页面（种下 origin），注入坏 localStorage
await send("Page.navigate", { url: "http://localhost:8774/index.html" });
await sleep(3000);
await send("Runtime.evaluate", {
  expression: `localStorage.setItem("mahjongConfig", JSON.stringify({ RULES: "Fuyang" })); "seeded"`
});
console.log("SEEDED: RULES=Fuyang (坏名字)");

// 第二步：不带 URL 参数重新加载 —— 模拟用户日常打开
await send("Page.navigate", { url: "http://localhost:8774/index.html" });
await sleep(5000);
const s1 = await send("Runtime.evaluate", {
  expression: `JSON.stringify({
    modals: [...document.querySelectorAll(".modal, dialog")].map(d => d.textContent.replace(/\\s+/g, " ").slice(0, 100)),
    bodyHead: document.body.textContent.replace(/\\s+/g, " ").slice(0, 100),
    hasTiles: document.querySelectorAll("game-tile").length
  })`,
  returnByValue: true
});
console.log("NO-PARAM:", s1.result?.result?.value);

// 第三步：带 ?rules=Fuyang+Mahjong 加载 —— URL 覆盖 localStorage
await send("Page.navigate", { url: "http://localhost:8774/?rules=Fuyang+Mahjong" });
await sleep(5000);
const s2 = await send("Runtime.evaluate", {
  expression: `JSON.stringify({
    modals: [...document.querySelectorAll(".modal, dialog")].map(d => d.textContent.replace(/\\s+/g, " ").slice(0, 80)),
    hasTiles: document.querySelectorAll("game-tile").length
  })`,
  returnByValue: true
});
console.log("WITH-PARAM:", s2.result?.result?.value);
console.log("ERRORS:", errors.length ? "" : "(none)");
errors.forEach(e => console.log("  ", e));
const shot = await send("Page.captureScreenshot", { format: "png" });
fs.writeFileSync("C:/Users/nil/AppData/Local/Temp/mj-ls-polluted.png", Buffer.from(shot.result.data, "base64"));
console.log("SHOT: C:/Users/nil/AppData/Local/Temp/mj-ls-polluted.png");

chrome.kill();
setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }); } catch (e) {} process.exit(0); }, 300);
