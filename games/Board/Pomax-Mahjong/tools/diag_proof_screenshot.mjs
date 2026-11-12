// 抓证据:一张牌落地的瞬间截屏 + 1.5s 后截屏,验证指示牌已切到下一位
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chromeExe = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find(existsSync);
const profile = mkdtempSync(join(tmpdir(), "mj-proof-"));
const chrome = spawn(chromeExe, ["--headless=new", "--disable-gpu", "--mute-audio", "--no-first-run",
  "--window-size=1280,800",
  "--remote-debugging-port=9237", `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 2500));

const targets = await (await fetch("http://127.0.0.1:9237/json/list")).json();
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
  return r.result?.result?.value;
}
async function shot(name) {
  const r = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(name, Buffer.from(r.result.data, "base64"));
}

await send("Page.enable");
await send("Runtime.enable");
await send("Page.navigate", { url: "http://localhost:8774/" });
await sleep(5000);

await evalJs(`document.getElementById("mj-auto").click(); 1`);
let clicked = false;
for (let i = 0; i < 20; i++) {
  await sleep(1000);
  const r = await evalJs(`(() => {
    for (const p of document.querySelectorAll(".modal .panel")) {
      const btn = [...p.querySelectorAll("button")].find(b => /亲自打|play some mahjong/i.test(b.textContent || ""));
      if (btn) { btn.click(); return true; }
    }
    return false;
  })()`);
  if (r === true) { clicked = true; break; }
}
console.log("STARTED:", clicked);

// 记录最近一次出牌时间戳
await evalJs(`(() => {
  window.__lastDiscard = 0; window.__discardCount = 0;
  const dObs = new MutationObserver(records => {
    for (const r of records) for (const n of r.addedNodes) {
      if (n.nodeType === 1 && n.matches && n.matches("game-tile.discard")) {
        window.__lastDiscard = performance.now();
        window.__discardCount++;
        window.__lastFrom = n.getAttribute("from");
      }
    }
  });
  dObs.observe(document.body, { childList: true, subtree: true });
  return true;
})()`);

// 轮询:捕获 2 次「出牌瞬间 vs 1.5s 后」的截图对
let captured = 0;
const deadline = Date.now() + 45000;
let lastCount = 0;
while (captured < 2 && Date.now() < deadline) {
  await sleep(40);
  const st = await evalJs(`JSON.stringify({c: window.__discardCount, t: window.__lastDiscard, now: performance.now(), from: window.__lastFrom})`);
  const s = JSON.parse(st);
  const since = s.now - s.t;
  if (s.c > lastCount && since < 90 && since >= 0) {
    lastCount = s.c;
    await shot(`proof_moment${captured + 1}_after${Math.round(since)}ms.png`);
    await sleep(1500);
    await shot(`proof_moment${captured + 1}_plus1.5s.png`);
    captured++;
    console.log(`captured pair ${captured} (from=玩家${s.from}, shot at ${Math.round(since)}ms after tile landed)`);
  }
}
console.log("PAIRS:", captured);
chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
setTimeout(() => process.exit(0), 300);
