// 长辈模式验证：出牌二次确认（举牌→再点才打出）+ 工具栏开关 + 轮到你指示
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chromeExe = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find(existsSync);
const profile = mkdtempSync(join(tmpdir(), "mj-elder-"));
const chrome = spawn(chromeExe, ["--headless=new", "--disable-gpu", "--mute-audio", "--no-first-run",
  "--window-size=1280,800",
  "--remote-debugging-port=9246", `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 2500));

let targets = null;
for (let i = 0; i < 8; i++) {
  try { targets = await (await fetch("http://127.0.0.1:9246/json/list")).json(); break; }
  catch (e) { await new Promise(r => setTimeout(r, 800)); }
}
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
    errors.push(`EXC: ${d.text} ${(d.exception?.description || "")}`.slice(0, 200));
  }
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
});
function send(method, params = {}) {
  return new Promise(res => { const id = ++seq; pending.set(id, res); ws.send(JSON.stringify({ id, method, params })); });
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function evalJs(expr) {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) errors.push("EVAL-EXC: " + (r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text || "").slice(0, 180));
  return r.result?.result?.value;
}
async function realClick(x, y) {
  await send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });
}

await send("Page.enable");
await send("Runtime.enable");
await send("Page.navigate", { url: "http://localhost:8774/" });
await sleep(5000);

// 手动模式开局
let started = false;
for (let i = 0; i < 30; i++) {
  await sleep(1000);
  const r = await evalJs(`(() => {
    if (window.currentGame) return "game-on";
    for (const p of document.querySelectorAll(".modal .panel")) {
      const btn = [...p.querySelectorAll("button")].find(b => /亲自打|开始|play some mahjong/i.test(b.textContent || ""));
      if (btn) { btn.click(); return "clicked"; }
    }
    return false;
  })()`);
  if (r === "game-on") { started = true; break; }
}
console.log("STARTED(manual):", started);

// 工具栏防误触按钮
console.log("TOOLBAR-ELDER:", await evalJs(`(() => {
  const b = document.getElementById("mj-elder");
  return b ? b.textContent + "|" + b.classList.contains("mj-on") : "MISSING";
})()`));

// 等轮到真人出牌（手牌出现 selectable）
let tileSpot = null;
for (let i = 0; i < 40; i++) {
  await sleep(500);
  // 顺手点掉「开始/确定」类弹窗
  await evalJs(`(() => {
    if (document.querySelector(".modal:not(.hidden)")) {
      for (const p of document.querySelectorAll(".modal .panel")) {
        const btn = [...p.querySelectorAll("button")].find(b => /确定|确认|开始|OK|继续/i.test(b.textContent || ""));
        if (btn) { btn.click(); return "ok"; }
      }
    }
    return false;
  })()`);
  const st = await evalJs(`(() => {
    const sel = document.querySelector(".player[id='0'] game-tile.selectable");
    if (!sel) return "null";
    const b = sel.getBoundingClientRect();
    return JSON.stringify({ x: b.x + b.width / 2, y: b.y + b.height / 2 });
  })()`);
  if (st && st !== "null") { tileSpot = JSON.parse(st); break; }
}
if (!tileSpot) { console.log("FAIL: 40s 内没等到玩家0出牌回合"); chrome.kill(); process.exit(1); }
console.log("TURN0-REACHED");

// 第一次点击：应只举牌，不打出
await realClick(tileSpot.x, tileSpot.y);
await sleep(600);
const after1 = await evalJs(`(() => {
  const armed = document.querySelector(".player[id='0'] game-tile.mj-armed");
  const hint = document.getElementById("mj-elder-hint");
  const discards = document.querySelectorAll(".discards game-tile").length;
  return JSON.stringify({
    armed: !!armed,
    armedSelectable: armed ? armed.classList.contains("selectable") : false,
    hintOn: hint ? hint.classList.contains("mj-on") : false,
    hintText: hint ? hint.textContent : "",
    discards
  });
})()`);
console.log("FIRST-CLICK:", after1);
await send("Page.captureScreenshot", { format: "png" }).then(r => {
  if (r.result?.data) writeFileSync("proof_elder_armed.png", Buffer.from(r.result.data, "base64"));
}).catch(() => {});

// 第二次点击同一张：应打出
await realClick(tileSpot.x, tileSpot.y);
await sleep(900);
const after2 = await evalJs(`(() => {
  const armedLeft = document.querySelectorAll(".player[id='0'] game-tile.mj-armed").length;
  const hint = document.getElementById("mj-elder-hint");
  return JSON.stringify({ armedLeft, hintOn: hint ? hint.classList.contains("mj-on") : false,
    lastDiscardFrom: (() => { const d = document.querySelector(".discards game-tile:last-child"); return d ? d.getAttribute("from") : null; })() });
})()`);
console.log("SECOND-CLICK:", after2);

// 轮到你指示牌状态
console.log("MARKER-YOU:", await evalJs(`(() => {
  const m = document.getElementById("mj-turn-marker");
  const a = document.querySelector(".player.active");
  return JSON.stringify({ text: m ? m.textContent : "", you: m ? m.classList.contains("mj-you") : false, activePid: a ? a.id : null });
})()`));

console.log("JS-ERRORS:", errors.length ? "" : "(none)");
errors.slice(0, 5).forEach(e => console.log("  ", e));
chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
setTimeout(() => process.exit(0), 300);
