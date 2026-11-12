// 手动模式验证 v2:自动替真人「过声明 + 出牌」,测 bot 出牌后指示切换间隔
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chromeExe = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find(existsSync);
const profile = mkdtempSync(join(tmpdir(), "mj-manual2-"));
const chrome = spawn(chromeExe, ["--headless=new", "--disable-gpu", "--mute-audio", "--no-first-run",
  "--window-size=1280,800",
  "--remote-debugging-port=9240", `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 2500));

const targets = await (await fetch("http://127.0.0.1:9240/json/list")).json();
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
    errors.push(`EXC: ${d.text} ${d.exception?.description || ""} @${(d.url || "").split("/").pop()}:${d.lineNumber}`.slice(0, 200));
  }
  if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
    errors.push("CONSOLE: " + msg.params.args.map(a => a.value || a.description || "").join(" ").slice(0, 200));
  }
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
});
function send(method, params = {}) {
  return new Promise(res => { const id = ++seq; pending.set(id, res); ws.send(JSON.stringify({ id, method, params })); });
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function evalJs(expr) {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) errors.push("EVAL-EXC: " + JSON.stringify(r.result.exceptionDetails).slice(0, 200));
  return r.result?.result?.value;
}

await send("Page.enable");
await send("Runtime.enable");
await send("Page.navigate", { url: "http://localhost:8774/" });
await sleep(5000);

// 手动模式:依次点「亲自打」和「准备好开局了吗?开始!」
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

await evalJs(`(() => {
  window.__events = [];
  const banks = document.querySelectorAll(".player");
  const obs = new MutationObserver(() => {
    const a = document.querySelector(".player.active");
    if (a) window.__events.push({ t: performance.now(), type: "turn", pid: parseInt(a.id, 10) });
  });
  banks.forEach(b => obs.observe(b, { attributes: true, attributeFilter: ["class"] }));
  const dObs = new MutationObserver(records => {
    for (const r of records) for (const n of r.addedNodes) {
      if (n.nodeType === 1 && n.matches && n.matches("game-tile.discard")) {
        window.__events.push({ t: performance.now(), type: "discard", pid: parseInt(n.getAttribute("from"), 10) });
      }
    }
  });
  dObs.observe(document.body, { childList: true, subtree: true });
  return true;
})()`);

// 自动玩家(CDP 真实鼠标事件):声明窗点弃牌区远处(过);轮到真人点手牌最后一张
const deadline = Date.now() + 40000;
const seen = {};
async function realClick(x, y) {
  await send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });
}
while (Date.now() < deadline) {
  await sleep(350);
  const st = await evalJs(`(() => {
    const act = document.querySelector(".player.active");
    // selectable 牌可能在弃牌区(声明窗)或玩家 0 手牌(轮到你出牌)
    const selDiscard = document.querySelector(".discards game-tile.selectable");
    let selBox = null;
    if (selDiscard) { const b = selDiscard.getBoundingClientRect(); selBox = { x: b.x + b.width/2, y: b.y + b.height/2 }; }
    let passSpot = null;
    const d = document.querySelector(".discards");
    if (d) { const b = d.getBoundingClientRect(); passSpot = { x: b.x + 10, y: b.y + 10 }; }
    const pid = act ? parseInt(act.id, 10) : -1;
    let tileSpot = null;
    if (pid === 0) {
      const bank = document.querySelector(".player[id='0']");
      const tiles = bank ? [...bank.querySelectorAll("game-tile")].filter(t => !t.hasAttribute("locked") && !t.hasAttribute("hidden")) : [];
      if (tiles.length) { const b = tiles[tiles.length-1].getBoundingClientRect(); tileSpot = { x: b.x + b.width/2, y: b.y + b.height/2 }; }
    }
    let modalBtn = null;
    for (const p of document.querySelectorAll(".modal .panel")) {
      const btn = [...p.querySelectorAll("button")].find(b => /确定|确认|OK|继续|开始/i.test(b.textContent || ""));
      if (btn) { const b = btn.getBoundingClientRect(); modalBtn = { x: b.x + b.width/2, y: b.y + b.height/2 }; }
    }
    return JSON.stringify({ pid, isClaim: !!selDiscard, selBox, passSpot, tileSpot, modalBtn });
  })()`);
  const s = JSON.parse(st || "{}");
  if (s.modalBtn) { await realClick(s.modalBtn.x, s.modalBtn.y); seen["modal-ok"] = (seen["modal-ok"] || 0) + 1; continue; }
  if (s.isClaim && s.passSpot) {
    // 声明窗:点弃牌区离声明牌最远的角落,保证 >40px 判定为"过"
    const spot = { x: s.passSpot.x, y: s.passSpot.y };
    if (s.selBox && Math.hypot(spot.x - s.selBox.x, spot.y - s.selBox.y) < 60) continue;
    await realClick(spot.x, spot.y); seen["pass-claim"] = (seen["pass-claim"] || 0) + 1; continue;
  }
  if (s.tileSpot) { await realClick(s.tileSpot.x, s.tileSpot.y); seen["discard0"] = (seen["discard0"] || 0) + 1; continue; }
  seen["idle:" + s.pid] = (seen["idle:" + s.pid] || 0) + 1;
}
console.log("AUTOPLAY-ACTIONS:", JSON.stringify(seen));
const evs = JSON.parse(await evalJs(`JSON.stringify(window.__events || [])`));
let gaps = [];
for (let i = 0; i < evs.length; i++) {
  if (evs[i].type !== "discard") continue;
  const next = evs.slice(i + 1).find(e => e.type === "turn");
  if (next) gaps.push({ from: evs[i].pid, to: next.pid, gap: Math.round(next.t - evs[i].t) });
}
console.log("DISCARDS:", evs.filter(e => e.type === "discard").length, "TURNS:", evs.filter(e => e.type === "turn").length);
console.log("手动模式 出牌→下一个指示 间隔(ms):", JSON.stringify(gaps.slice(-15)));
console.log("JS-ERRORS:", errors.length ? "" : "(none)");
errors.slice(0, 5).forEach(e => console.log("  ", e));
chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
setTimeout(() => process.exit(0), 300);
