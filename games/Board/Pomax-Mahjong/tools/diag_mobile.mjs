// 移动端适配体检：手机竖屏/横屏视口下测布局、字号、牌大小、工具栏可用性
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chromeExe = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find(existsSync);

async function probeViewport(w, h, label) {
  const profile = mkdtempSync(join(tmpdir(), "mj-mob-"));
  const chrome = spawn(chromeExe, ["--headless=new", "--disable-gpu", "--mute-audio", "--no-first-run",
    `--window-size=${w},${h}`,
    "--remote-debugging-port=9252", `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
  await new Promise(r => setTimeout(r, 2500));
  const targets = await (await fetch("http://127.0.0.1:9252/json/list")).json();
  const page = targets.find(t => t.type === "page");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => { ws.onopen = r; });
  let seq = 0; const pending = new Map();
  ws.addEventListener("message", ev => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
  const send = (method, params = {}) => new Promise(res => { const id = ++seq; pending.set(id, res); ws.send(JSON.stringify({ id, method, params })); });
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const evalJs = async e => { const r = await send("Runtime.evaluate", { expression: e, returnByValue: true, awaitPromise: true }); return r.result?.result?.value; };

  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 2, mobile: true });
  await send("Page.navigate", { url: "http://localhost:8774/" });
  await sleep(4500);

  const st = await evalJs(`(() => {
    const root = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const tb = document.getElementById("mj-toolbar");
    const tbr = tb ? tb.getBoundingClientRect() : null;
    // 工具栏底部是否超出屏幕（点不到的按钮）
    const tbBtns = tb ? [...tb.querySelectorAll("button,a")].map(b => {
      const r = b.getBoundingClientRect();
      return { t: (b.textContent || "").trim().slice(0, 6), vis: r.width > 0 && r.bottom <= innerHeight && r.right <= innerWidth };
    }) : [];
    const board = document.querySelector(".board");
    const br = board ? board.getBoundingClientRect() : null;
    // 玩家0 手牌一张牌的屏上尺寸
    const t0 = document.querySelector(".player[id='0'] game-tile");
    const tr = t0 ? t0.getBoundingClientRect() : null;
    const mk = document.getElementById("mj-turn-marker");
    return JSON.stringify({
      rootFont: root.toFixed(1),
      board: br ? Math.round(br.width) + "x" + Math.round(br.height) : null,
      tile: tr ? Math.round(tr.width) + "x" + Math.round(tr.height) : null,
      toolbarH: tbr ? Math.round(tbr.height) : null,
      tbHiddenBtns: tbBtns.filter(b => !b.vis).map(b => b.t),
      marker: mk ? mk.textContent : null,
      innerW: innerWidth, innerH: innerHeight
    });
  })()`);
  console.log(`[${label}]`, st);
  await send("Page.captureScreenshot", { format: "png" }).then(r => {
    if (r.result?.data) writeFileSync(`proof_mobile_${label}.png`, Buffer.from(r.result.data, "base64"));
  }).catch(() => {});
  chrome.kill();
  try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
}

await probeViewport(390, 844, "portrait");
await probeViewport(844, 390, "landscape");
setTimeout(() => process.exit(0), 300);
