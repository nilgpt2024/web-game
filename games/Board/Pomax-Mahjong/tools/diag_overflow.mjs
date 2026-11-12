// 定位横向溢出的具体元素 + 小屏开局弹窗可见性
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chromeExe = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find(existsSync);

async function probe(w, h, label, { start = false } = {}) {
  const port = 9290 + label.length;
  const profile = mkdtempSync(join(tmpdir(), "mj-ovf-"));
  const chrome = spawn(chromeExe, ["--headless=new", "--disable-gpu", "--mute-audio", "--no-first-run",
    `--window-size=${w},${h}`, `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
  await new Promise(r => setTimeout(r, 2200));
  let targets = null;
  for (let i = 0; i < 10; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); break; }
    catch (e) { await new Promise(r => setTimeout(r, 700)); }
  }
  const page = targets.find(t => t.type === "page");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => { ws.onopen = r; });
  let seq = 0; const pending = new Map();
  ws.addEventListener("message", ev => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
  const send = (method, params = {}) => new Promise(res => { const id = ++seq; pending.set(id, res); ws.send(JSON.stringify({ id, method, params })); });
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const evalJs = async e => { const r = await send("Runtime.evaluate", { expression: e, returnByValue: true, awaitPromise: true }); return r.result?.result?.value; };
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: "http://localhost:8774/" });
  await sleep(5000);

  if (!start) {
    // 开局弹窗几何（未点击时）
    const modals = await evalJs(`(() => {
      const vw = innerWidth, vh = innerHeight;
      const panels = [...document.querySelectorAll(".modal .panel")].map(p => {
        const b = p.getBoundingClientRect();
        const btns = [...p.querySelectorAll("button")].map(x => {
          const r = x.getBoundingClientRect();
          return { t: (x.textContent || "").trim().slice(0, 14), x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height), r: Math.round(r.right), inView: r.left >= 0 && r.right <= vw && r.top >= 0 && r.bottom <= vh };
        });
        return { x: Math.round(b.left), y: Math.round(b.top), w: Math.round(b.width), h: Math.round(b.height), r: Math.round(b.right), b: Math.round(b.bottom), btns };
      });
      return JSON.stringify({ vw, vh, docScrollW: document.documentElement.scrollWidth, panels });
    })()`);
    console.log(`\n[${label}] MODALS:`, modals);
  } else {
    for (let i = 0; i < 35; i++) {
      await sleep(600);
      const r = await evalJs(`(() => {
        const active = document.querySelector(".player.active");
        const openModal = document.querySelector(".modal:not(.hidden)");
        if (active && !openModal) return "playing";
        for (const p of document.querySelectorAll(".modal .panel")) {
          const btn = [...p.querySelectorAll("button")].find(b => /亲自打|开始|play some mahjong/i.test(b.textContent || ""));
          if (btn) { btn.click(); return "clicked"; }
        }
        return "waiting";
      })()`);
      if (r === "playing") break;
    }
    await sleep(1000);
  }

  const overflow = await evalJs(`(() => {
    const vw = innerWidth, vh = innerHeight;
    const out = [];
    for (const e of document.querySelectorAll("body *")) {
      const s = getComputedStyle(e);
      if (s.display === "none" || s.visibility === "hidden" || s.opacity === "0") continue;
      const b = e.getBoundingClientRect();
      if (b.width === 0 && b.height === 0) continue;
      if (b.right > vw + 1 || b.left < -1 || b.bottom > vh + 1) {
        out.push({ tag: e.tagName.toLowerCase(), id: e.id || "", cls: (e.className && typeof e.className === "string" ? e.className : "").slice(0, 40),
          pos: s.position, l: Math.round(b.left), r: Math.round(b.right), t: Math.round(b.top), b: Math.round(b.bottom),
          w: Math.round(b.width), h: Math.round(b.height) });
      }
    }
    out.sort((a, b) => b.r - a.r);
    const hand = document.getElementById("mj-mobile-hand");
    const tb = document.getElementById("mj-toolbar");
    return JSON.stringify({
      vw, vh, docScrollW: document.documentElement.scrollWidth, docClientW: document.documentElement.clientWidth,
      bodyScrollW: document.body.scrollWidth,
      hand: hand ? { w: hand.offsetWidth, scrollW: hand.scrollWidth, box: getComputedStyle(hand).boxSizing, pad: getComputedStyle(hand).padding } : null,
      toolbar: tb ? { w: tb.offsetWidth, scrollW: tb.scrollWidth, box: getComputedStyle(tb).boxSizing, pad: getComputedStyle(tb).padding } : null,
      top: out.slice(0, 14), count: out.length
    });
  })()`);
  console.log(`[${label}] OVERFLOW:`, overflow);
  const shot = await send("Page.captureScreenshot", { format: "png" });
  if (shot.result?.data) writeFileSync(`proof_ovf_${label}.png`, Buffer.from(shot.result.data, "base64"));
  ws.close(); chrome.kill();
  try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
  await sleep(250);
}

await probe(320, 568, "small-start", { start: false });
await probe(390, 844, "iphone-playing", { start: true });
await probe(844, 390, "landscape-playing", { start: true });
