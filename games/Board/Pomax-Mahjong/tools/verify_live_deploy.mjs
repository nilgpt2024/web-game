// 验证公网部署后的麻将页面能真实加载（v17 长辈模式 + 移动端大牌区）
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const URL = "https://suipce.com/games/Board/Pomax-Mahjong/";
const PORT = 9249;
const chromeExe = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
].find(existsSync);
if (!chromeExe) throw new Error("Chrome not found");

const profile = mkdtempSync(join(tmpdir(), "mj-live-"));
const chrome = spawn(chromeExe, [
  "--headless=new", "--disable-gpu", "--no-first-run",
  "--window-size=390,844", `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`, "about:blank"
], { stdio: "ignore" });

const sleep = ms => new Promise(r => setTimeout(r, ms));
let targets = null;
for (let i = 0; i < 15; i++) {
  await sleep(700);
  try { targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); if (targets.length) break; }
  catch (e) { /* chrome still booting */ }
}
const page = targets?.find(t => t.type === "page");
if (!page) { chrome.kill(); throw new Error("CDP unavailable"); }

const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => { ws.addEventListener("open", r, { once: true }); });
let seq = 0;
const pending = new Map();
const errors = [];
ws.addEventListener("message", ev => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  if (m.method === "Runtime.exceptionThrown") errors.push(m.params?.exceptionDetails?.text || "exception");
  if (m.method === "Log.entryAdded" && m.params?.entry?.level === "error") errors.push(m.params.entry.text);
});
const send = (method, params = {}) => new Promise(res => {
  const id = ++seq; pending.set(id, res); ws.send(JSON.stringify({ id, method, params }));
});
const evalJs = async expr => {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  return r.result?.result?.value ?? null;
};

await send("Runtime.enable");
await send("Log.enable");
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await send("Page.navigate", { url: URL });
await sleep(7000);

const report = await evalJs(`(() => {
  const el = id => document.getElementById(id);
  return JSON.stringify({
    url: location.href,
    title: document.title,
    toolbar: !!el("mj-toolbar"),
    elderBtn: !!el("mj-elder"),
    mobileHand: !!el("mj-mobile-hand"),
    voicePack: !!document.querySelector("script[src*='zh-CN']") || !!el("mj-voice"),
    tileStyles: document.querySelectorAll("link[rel=stylesheet]").length,
    bodyClass: document.body.className
  });
})()`);
const shot = await send("Page.captureScreenshot", { format: "png" });
if (shot.result?.data) writeFileSync("proof_live_deploy.png", Buffer.from(shot.result.data, "base64"));

console.log("LIVE:", report);
console.log("JS-ERRORS:", errors.length, errors.slice(0, 3));
ws.close();
chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
setTimeout(() => process.exit(0), 300);
