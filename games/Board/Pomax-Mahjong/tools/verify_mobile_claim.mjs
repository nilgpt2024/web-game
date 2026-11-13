// 移动端声明大按钮 + 节奏 + 无声俚语 端到端验证
// 用法: node tools/verify_mobile_claim.mjs [baseURL] [port] [bootMs]
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const URL = process.argv[2] || "http://127.0.0.1:8774/";
const PORT = Number(process.argv[3] || 9311);
const BOOT = Number(process.argv[4] || (URL.includes("localhost") ? 9000 : 20000));

const chromeExe = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find(existsSync);
const profile = mkdtempSync(join(tmpdir(), "mj-claim-v-"));
const chrome = spawn(chromeExe, ["--headless=new", "--disable-gpu", "--mute-audio", "--no-first-run",
  "--window-size=390,844", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  "about:blank"], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 2200));
let targets = null;
for (let i = 0; i < 12; i++) {
  try { targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); break; }
  catch (e) { await new Promise(r => setTimeout(r, 700)); }
}
const page = targets.find(t => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => { ws.onopen = r; });
let seq = 0; const pending = new Map(); const errors = [];
ws.addEventListener("message", ev => {
  const m = JSON.parse(ev.data);
  if (m.method === "Runtime.exceptionThrown") errors.push((m.params.exceptionDetails.text || "").slice(0, 160));
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
});
const send = (method, params = {}) => new Promise(res => { const id = ++seq; pending.set(id, res); ws.send(JSON.stringify({ id, method, params })); });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const evalJs = async e => { const r = await send("Runtime.evaluate", { expression: e, returnByValue: true, awaitPromise: true }); return r.result?.result?.value; };
async function tap(x, y) {
  await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
  await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
}

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: false });
await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
await send("Page.navigate", { url: URL });
await sleep(BOOT);

let playing = false;
for (let i = 0; i < 50; i++) {
  const r = await evalJs(`(() => {
    const active = document.querySelector(".player.active");
    const openModal = document.querySelector(".modal:not(.hidden)");
    if (active && !openModal) return "playing";
    for (const p of document.querySelectorAll(".modal .panel")) {
      const btn = [...p.querySelectorAll("button")].find(b => /亲自打|开始|play some mahjong/i.test(b.textContent || ""));
      if (btn) { btn.click(); return "clicked"; }
    }
    const ro = document.querySelector("#mj-rules-overlay button");
    if (ro) { ro.click(); return "rules"; }
    return "waiting";
  })()`);
  if (r === "playing") { playing = true; break; }
  await sleep(500);
}
console.log("PLAYING:", playing);

// 音频探针：只记录「真正 play()」的俚语文件，预热下载不算
await evalJs(`(() => {
  window.__chatterAudio = [];
  window.__discardLog = [];
  const native = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function () {
    const s = this.currentSrc || this.src || "";
    const f = s.split("/").pop().split("?")[0];
    if (/^(fy|db|sx)-.*\\.mp3$/.test(f)) window.__chatterAudio.push(f);
    return native.apply(this, arguments);
  };
  window.__claimClicks = [];
  const d = document.querySelector(".discards");
  if (d) d.addEventListener("click", e => {
    const t = e.target;
    window.__claimClicks.push({ cls: (t.getAttribute && t.getAttribute("class")) || "",
      isLast: t === d.lastElementChild, bubbles: e.bubbles });
  }, true);
  new MutationObserver(rs => {
    for (const r of rs) for (const n of r.addedNodes) {
      if (n.nodeType === 1 && n.matches && n.matches(".discards game-tile.discard")) {
        window.__discardLog.push({ t: performance.now(), pid: n.getAttribute("from"),
          modal: !!document.querySelector(".modal:not(.hidden)"),
          claim: !!document.querySelector(".discards game-tile.selectable") });
      }
    }
  }).observe(document.body, { childList: true, subtree: true });
  return true;
})()`);

const stateExpr = `(() => {
  const bar = document.getElementById("mj-claim-bar");
  const claim = !!document.querySelector(".discards game-tile.selectable");
  const modal = document.querySelector(".modal:not(.hidden)");
  let btn = null;
  if (bar) for (const b of bar.querySelectorAll("button")) {
    const r = b.getBoundingClientRect();
    btn = btn || {};
    btn[b.className.includes("yes") ? "yes" : "no"] = {
      x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2),
      w: Math.round(r.width), h: Math.round(r.height) };
  }
  return JSON.stringify({
    claim, barOn: !!(bar && bar.classList.contains("mj-on")),
    barDisplay: bar ? getComputedStyle(bar).display : null,
    btn, modal: !!modal,
    modalButtons: modal ? [...modal.querySelectorAll("button")].map(b => (b.textContent || "").trim()) : [],
    myTiles: document.querySelectorAll('.player[id="0"] game-tile.selectable').length,
    discards: document.querySelectorAll(".discards game-tile.discard").length,
    active: document.querySelector(".player.active")?.id
  });
})()`;

const deadline = Date.now() + 105000;
const seen = {};
let barChecks = 0, bigBtnOk = 0, yesTaps = 0, claimModals = 0, duplicateModals = 0;
let pungOk = 0, noTaps = 0, noLatency = null, barSamples = [];
let handled = 0;
const yesDetails = [];
const modalDetails = [];
while (Date.now() < deadline && handled < 6) {
  await sleep(240);
  const s = JSON.parse((await evalJs(stateExpr)) || "{}");

  if (s.modal) {
    // 声明选择框：优先「碰」，其次杠/胡/吃；都没有就点「不要」，别卡住牌局
    const pung = s.modalButtons.find(b => /碰|Pung/i.test(b));
    const other = s.modalButtons.find(b => /杠|Kong|胡|Win|吃|Chow/i.test(b));
    const ok = s.modalButtons.find(b => /确定|确认|OK|继续|开始|亲自打|下一局/i.test(b));
    const pass = s.modalButtons.find(b => /不要|Ignore|过/i.test(b));
    const target = pung || other || ok || pass;
    if (target) {
      const pos = JSON.parse((await evalJs(`(() => { const m = document.querySelector(".modal:not(.hidden)"); const b = [...m.querySelectorAll("button")].find(x => (x.textContent||"").trim() === ${JSON.stringify(target)}); if (!b) return "null"; const r = b.getBoundingClientRect(); return JSON.stringify({x: Math.round(r.left+r.width/2), y: Math.round(r.top+r.height/2), h: Math.round(r.height)}); })()`)) || "null");
      if (pos) {
        const before = s.discards;
        await tap(pos.x, pos.y);
        await sleep(700);
        if (pung || other) {
          const after = JSON.parse((await evalJs(`JSON.stringify({ discards: document.querySelectorAll(".discards game-tile.discard").length, modal: !!document.querySelector(".modal:not(.hidden)") })`)) || "{}");
          if (!after.modal && (after.discards < before || pung)) pungOk++;
        }
      }
    }
    modalDetails.push({ buttons: s.modalButtons, target: target || null, before: s.discards });
    seen["modal"] = (seen["modal"] || 0) + 1;
    continue;
  }

  if (s.claim) {
    // 浮层还没挂上 / 已过期收起时，别去点一个 0×0 的按钮（真人也点不到）
    if (!s.barOn || !s.btn?.yes?.w || !s.btn?.no?.w) {
      seen["bar-pending"] = (seen["bar-pending"] || 0) + 1;
      continue;
    }
    handled++;
    if (s.barOn && s.barDisplay !== "none") {
      barChecks++;
      barSamples.push(s.btn);
      if (s.btn?.yes?.h >= 44 && s.btn?.yes?.w >= 200 && s.btn?.no?.h >= 40) bigBtnOk++;
    }
    // 前两次声明机会交替验证「不要」与「要这张牌」
    if (handled % 2 === 1 && s.btn?.no) {
      const t0 = Date.now();
      await tap(s.btn.no.x, s.btn.no.y);
      noTaps++;
      let gone = null;
      for (let k = 0; k < 20; k++) {
        await sleep(120);
        if (!(JSON.parse((await evalJs(stateExpr)) || "{}")).claim) { gone = Date.now() - t0; break; }
      }
      if (noLatency === null) noLatency = gone;
    } else if (s.btn?.yes) {
      const pre = JSON.parse((await evalJs(`(() => {
        const t = document.querySelector(".discards game-tile.selectable");
        const all = document.querySelectorAll(".discards game-tile.selectable");
        const d = document.querySelector(".discards");
        return JSON.stringify({ tileCls: t ? t.getAttribute("class") : null,
          selectableCount: all.length,
          lastIsSelectable: !!(d && d.lastElementChild && d.lastElementChild.classList.contains("selectable")),
          modals: document.querySelectorAll(".modal:not(.hidden)").length });
      })()`)) || "{}");
      await tap(s.btn.yes.x, s.btn.yes.y);
      yesTaps++;
      await sleep(400);
      const m = JSON.parse((await evalJs(`(() => {
        const all = [...document.querySelectorAll(".modal:not(.hidden)")];
        const t = document.querySelector(".discards game-tile.selectable");
        return JSON.stringify({ count: all.length,
          buttons: all[0] ? [...all[0].querySelectorAll("button")].map(b => (b.textContent||"").trim()) : [],
          tileCls: t ? t.getAttribute("class") : null,
          barOn: !!document.getElementById("mj-claim-bar")?.classList.contains("mj-on") });
      })()`)) || "{}");
      yesDetails.push({ pre, post: m });
      if (m.count > 1) duplicateModals++;
      if (m.count === 1 && m.buttons.some(b => /碰|Pung|杠|Kong|胡|Win/i.test(b))) claimModals++;
    }
    continue;
  }

  if (s.myTiles > 0 && s.active === "0") {
    await evalJs(`(() => { const t = document.querySelector('.player[id="0"] game-tile.selectable'); if (!t) return false; t.click(); t.click(); return true; })()`);
    seen["discard0"] = (seen["discard0"] || 0) + 1;
    continue;
  }
  seen["idle"] = (seen["idle"] || 0) + 1;
}

const chatterAudio = JSON.parse((await evalJs(`JSON.stringify(window.__chatterAudio || [])`)) || "[]");
const dl = JSON.parse((await evalJs(`JSON.stringify(window.__discardLog || [])`)) || "[]");
const gaps = dl.slice(1).map((d, i) => Math.round(d.t - dl[i].t));
console.log("ACTIONS:", JSON.stringify(seen));
console.log("BAR-SAMPLES:", JSON.stringify(barSamples.slice(0, 3)));
console.log("CLAIM-OPS:", JSON.stringify({ handled, barChecks, bigBtnOk, yesTaps, claimModals,
  duplicateModals, pungOk, noTaps, noLatencyMs: noLatency }));
console.log("YES-DETAILS:", JSON.stringify(yesDetails));
console.log("CLAIM-CLICKS:", JSON.stringify(JSON.parse((await evalJs(`JSON.stringify((window.__claimClicks||[]).slice(-12))`)) || "[]")));
console.log("MODAL-DETAILS:", JSON.stringify(modalDetails.slice(0, 8)));
console.log("CHATTER-AUDIO-PLAYED:", chatterAudio.length, JSON.stringify(chatterAudio.slice(0, 5)));
console.log("DISCARDS:", dl.length, "GAPS(ms):", JSON.stringify(gaps.slice(-18)));
const normalGaps = gaps.filter(g => g < 3000);
const sorted = normalGaps.slice().sort((a, b) => a - b);
const medianGap = sorted.length ? sorted[Math.floor(sorted.length / 2)] : 9999;
const longWaits = gaps.filter(g => g >= 3000);
console.log("GAP-SUMMARY:", JSON.stringify({ median: medianGap, max: Math.max(0, ...gaps),
  longWaits: longWaits.length, longWaitValues: longWaits }));
const longCtx = dl.slice(1).map((d, i) => ({ gap: Math.round(d.t - dl[i].t),
  from: dl[i], to: d })).filter(x => x.gap >= 3000)
  .map(x => ({ gap: x.gap, fromModal: x.from.modal, toModal: x.to.modal,
    fromClaim: x.from.claim, toClaim: x.to.claim }));
const handEnds = modalDetails.filter(m => m.buttons.some(b => /开始下一局|下一局|开始！/i.test(b))).length;
console.log("LONG-GAP-CONTEXT:", JSON.stringify(longCtx), "handEnds:", handEnds);
console.log("JS-ERRORS:", errors.length, errors.slice(0, 3));

const checks = {
  "开局成功": playing,
  "声明期大按钮浮层出现": barChecks >= 1,
  "按钮足够大可点": bigBtnOk === barChecks && barChecks >= 1,
  "点「要这张牌」弹出声明框": yesTaps >= 1 && claimModals >= 1,
  "没有重复弹窗": duplicateModals === 0,
  "点「不要」立即过牌(不用等5秒)": noTaps >= 1 && noLatency !== null && noLatency < 1500,
  "俚语合成语音已停播": chatterAudio.length === 0,
  // v29 起严格等报牌播完才轮下家，间隔≈一句(1.3~1.5s)+轻微抖动，
  // 中位约 1.55s；阈值随之上调，但不允许出现无声干等。
  "典型出牌间隔≤2.2秒、长等待只出现在局间": normalGaps.length >= 8 &&
    medianGap <= 2200 && longWaits.length <= Math.max(1, handEnds),
  "无 JS 异常": errors.length === 0
};
console.log("CHECKS:", JSON.stringify(checks));
const failed = Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
console.log("RESULT:", failed.length ? "FAIL " + failed.join(" / ") : "PASS");
ws.close(); chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
setTimeout(() => process.exit(failed.length ? 1 : 0), 300);
