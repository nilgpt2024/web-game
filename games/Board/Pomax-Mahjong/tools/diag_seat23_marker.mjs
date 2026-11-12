// 抓「指示牌在玩家2(顶) / 玩家3(右)」时刻的截图,检查落点是否可见
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chromeExe = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find(existsSync);
const profile = mkdtempSync(join(tmpdir(), "mj-seat2-3-"));
const chrome = spawn(chromeExe, ["--headless=new", "--disable-gpu", "--mute-audio", "--no-first-run",
  "--window-size=1280,800",
  "--remote-debugging-port=9238", `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 2500));

const targets = await (await fetch("http://127.0.0.1:9238/json/list")).json();
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

const done = await evalJs(`(() => {
  window.__activePid = 0; window.__snapPid = null;
  const banks = document.querySelectorAll(".player");
  const obs = new MutationObserver(() => {
    const a = document.querySelector(".player.active");
    if (a) { window.__activePid = parseInt(a.id, 10); window.__activeAt = performance.now(); }
  });
  banks.forEach(b => obs.observe(b, { attributes: true, attributeFilter: ["class"] }));
  const m = document.getElementById("mj-turn-marker");
  return m ? "marker-ok" : "marker-missing";
})()`);
console.log("MARKER:", done);

// 等待指示牌分别落到 玩家2、玩家3,抓屏并记录坐标
const need = [2, 3];
const got = {};
const deadline = Date.now() + 60000;
while (Object.keys(got).length < need.length && Date.now() < deadline) {
  await sleep(60);
  const st = await evalJs(`JSON.stringify({
    pid: window.__activePid,
    at: window.__activeAt || 0,
    now: performance.now(),
    m: (() => { const e = document.getElementById("mj-turn-marker");
      if (!e) return null; const r = e.getBoundingClientRect();
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
               text: e.textContent, vis: getComputedStyle(e).display }; })()
  })`);
  const s = JSON.parse(st);
  if (need.includes(s.pid) && !got[s.pid] && s.m && s.m.vis !== "none" && (s.now - s.at) > 200) {
    got[s.pid] = s;
    await shot(`proof_seat${s.pid}_marker.png`);
    console.log(`seat ${s.pid}: marker at (${s.m.x},${s.m.y}) size ${s.m.w}x${s.m.h} text="${s.m.text}" vis=${s.m.vis}`);
  }
}
console.log("GOT SEATS:", Object.keys(got));
chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
setTimeout(() => process.exit(0), 300);
