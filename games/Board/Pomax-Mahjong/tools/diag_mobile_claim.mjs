// 移动端真实对局诊断：碰牌/声明窗到底点不点得到 + 出牌间隔到底等多久
// 用法: node tools/diag_mobile_claim.mjs [baseURL] [port] [bootMs]
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const URL = process.argv[2] || "http://127.0.0.1:8774/";
const PORT = Number(process.argv[3] || 9301);
const BOOT = Number(process.argv[4] || (URL.includes("localhost") ? 9000 : 18000));

const chromeExe = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find(existsSync);
const profile = mkdtempSync(join(tmpdir(), "mj-claim-"));
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

// 开局：点掉欢迎/规则弹窗，直到 .player.active 出现
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
    const ro = document.querySelector("#mj-rules-overlay:not(.hidden) button.mj-cur, #mj-rules-overlay button");
    if (ro) { ro.click(); return "rules"; }
    return "waiting";
  })()`);
  if (r === "playing") { playing = true; break; }
  await sleep(500);
}
console.log("PLAYING:", playing);

// DOM 结构 + 事件探针
await evalJs(`(() => {
  window.__claimLog = [];
  window.__discardLog = [];
  const d = document.querySelector(".discards");
  window.__domInfo = d ? {
    parent: d.parentElement ? d.parentElement.className : null,
    inPlayer0: !!d.closest('.player[id="0"]'),
    closestPlayer: d.closest(".player") ? d.closest(".player").id : null
  } : null;
  // 捕获阶段记录每次 click 的目标与是否被拦下
  document.addEventListener("click", e => {
    const t = e.target;
    const tag = t && t.tagName ? t.tagName.toLowerCase() : "?";
    if (t && t.closest && (t.closest("game-tile.selectable") || t.closest("#mj-mobile-hand"))) {
      window.__claimLog.push({ tag, cls: (t.getAttribute && t.getAttribute("class")) || "",
        inDiscards: !!(t.closest && t.closest(".discards")), prevented: e.defaultPrevented });
    }
  }, true);
  const obs = new MutationObserver(rs => {
    for (const r of rs) for (const n of r.addedNodes) {
      if (n.nodeType === 1 && n.matches && n.matches(".discards game-tile.discard")) {
        window.__discardLog.push({ t: performance.now(), pid: n.getAttribute("from") });
      }
    }
  });
  obs.observe(document.body, { childList: true, subtree: true });
  return true;
})()`);
console.log("DOM:", JSON.stringify(await evalJs(`JSON.stringify(window.__domInfo)`)));

const snapExpr = `(() => {
  const t = document.querySelector(".discards game-tile.selectable");
  if (!t) return null;
  const b = t.getBoundingClientRect();
  const cx = Math.round(b.left + b.width / 2), cy = Math.round(b.top + b.height / 2);
  const hit = document.elementFromPoint(cx, cy);
  const overlays = ["#mj-mobile-hand", "#mj-turn-marker", "#mj-hint-toast", "#mj-chatter-bubble", "#mj-elder-hint"]
    .map(sel => { const e = document.querySelector(sel); if (!e) return null;
      const r = e.getBoundingClientRect(); const st = getComputedStyle(e);
      return { sel, display: st.display, z: st.zIndex, pe: st.pointerEvents,
        rect: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)],
        covers: r.left <= cx && r.right >= cx && r.top <= cy && r.bottom >= cy };
    }).filter(Boolean);
  return JSON.stringify({
    rect: [Math.round(b.left), Math.round(b.top), Math.round(b.width), Math.round(b.height)],
    cx, cy, hit: hit ? hit.tagName.toLowerCase() + "." + (hit.getAttribute("class") || "") : null,
    hitIsTile: !!(hit && (hit === t || t.contains(hit))),
    tileCls: t.getAttribute("class"), tileInPlayer0: !!t.closest('.player[id="0"]'),
    modal: !!document.querySelector(".modal:not(.hidden)"),
    bigHand: getComputedStyle(document.getElementById("mj-mobile-hand")).display,
    active: document.querySelector(".player.active")?.id,
    overlays
  });
})()`;

const deadline = Date.now() + 75000;
const seen = {}; let claimSnap = null; let claimAfter = null; let claimTries = 0;
while (Date.now() < deadline) {
  await sleep(280);
  const st = JSON.parse((await evalJs(`(() => {
    const act = document.querySelector(".player.active");
    const selDiscard = document.querySelector(".discards game-tile.selectable");
    let modalBtn = null;
    for (const p of document.querySelectorAll(".modal .panel")) {
      const btn = [...p.querySelectorAll("button")].find(b => /确定|确认|OK|继续|开始|亲自打/i.test(b.textContent || ""));
      if (btn) { const b = btn.getBoundingClientRect(); modalBtn = { x: b.x + b.width/2, y: b.y + b.height/2, text: btn.textContent }; }
    }
    return JSON.stringify({ pid: act ? parseInt(act.id, 10) : -1,
      isClaim: !!selDiscard, modalBtn,
      myTiles: document.querySelectorAll('.player[id="0"] game-tile.selectable').length,
      discards: document.querySelectorAll(".discards game-tile.discard").length });
  })()`)) || "{}");

  if (st.modalBtn) { await tap(st.modalBtn.x, st.modalBtn.y); seen["modal"] = (seen["modal"] || 0) + 1; continue; }

  if (st.isClaim) {
    if (!claimSnap) {
      claimSnap = JSON.parse((await evalJs(snapExpr)) || "null");
      console.log("CLAIM-SNAPSHOT:", JSON.stringify(claimSnap));
      // 真实手指点击声明牌中心，最多试 3 次，看第几击才弹出声明框
      for (let k = 1; k <= 3; k++) {
        const cur = JSON.parse((await evalJs(snapExpr)) || "null");
        if (!cur) break;
        await tap(cur.cx, cur.cy);
        await sleep(350);
        claimTries = k;
        const md = JSON.parse((await evalJs(`(() => {
          const m = document.querySelector(".modal:not(.hidden)");
          if (!m) return "null";
          return JSON.stringify([...m.querySelectorAll("button")].map(b => (b.textContent || "").trim()));
        })()`)) || "null");
        if (md) { claimAfter = { tries: k, buttons: md }; break; }
      }
      console.log("CLAIM-AFTER-TAP:", JSON.stringify(claimAfter));
      if (claimAfter && claimAfter.buttons.some(b => /碰|Pung|杠|Kong/i.test(b))) {
        const pung = JSON.parse((await evalJs(`(() => {
          const m = document.querySelector(".modal:not(.hidden)");
          if (!m) return "null";
          const b = [...m.querySelectorAll("button")].find(x => /碰|Pung/i.test(x.textContent || ""));
          if (!b) return "null";
          const r = b.getBoundingClientRect();
          return JSON.stringify({ x: Math.round(r.left + r.width/2), y: Math.round(r.top + r.height/2), text: b.textContent });
        })()`)) || "null");
        if (pung) {
          const before = st.discards;
          await tap(pung.x, pung.y);
          await sleep(900);
          const after = JSON.parse((await evalJs(`JSON.stringify({ discards: document.querySelectorAll(".discards game-tile.discard").length, modal: !!document.querySelector(".modal:not(.hidden)") })`)) || "{}");
          console.log("PUNG-RESULT:", JSON.stringify({ button: pung, before, after }));
        }
      }
      // 已经抓到一次，继续把牌局跑下去以量间隔
      if (claimAfter) break;
    }
    // 没抓到弹窗就点远角过掉，别卡住牌局
    const far = JSON.parse((await evalJs(`(() => { const d = document.querySelector(".discards"); const b = d.getBoundingClientRect(); return JSON.stringify({x: Math.round(b.left+12), y: Math.round(b.top+12)}); })()`)) || "null");
    if (far) { await tap(far.x, far.y); seen["pass"] = (seen["pass"] || 0) + 1; }
    continue;
  }

  if (st.myTiles > 0 && st.pid === 0) {
    // 自己出牌：两击二次确认，用 JS click 保证稳定
    await evalJs(`(() => { const t = document.querySelector('.player[id="0"] game-tile.selectable'); if (!t) return false; t.click(); t.click(); return true; })()`);
    seen["discard0"] = (seen["discard0"] || 0) + 1;
    continue;
  }
  seen["idle:" + st.pid] = (seen["idle:" + st.pid] || 0) + 1;
}
console.log("ACTIONS:", JSON.stringify(seen));

const dl = JSON.parse((await evalJs(`JSON.stringify(window.__discardLog || [])`)) || "[]");
const gaps = dl.slice(1).map((d, i) => Math.round(d.t - dl[i].t));
console.log("DISCARDS:", dl.length, "GAPS(ms):", JSON.stringify(gaps.slice(-20)));
console.log("CLICK-LOG:", JSON.stringify(JSON.parse((await evalJs(`JSON.stringify((window.__claimLog||[]).slice(-12))`)) || "[]")));
console.log("JS-ERRORS:", errors.length, errors.slice(0, 3));
ws.close(); chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
setTimeout(() => process.exit(0), 300);
