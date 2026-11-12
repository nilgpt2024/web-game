// 诊断窄屏下开局弹窗的定位与裁切来源
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const URL = process.argv[2] || "http://localhost:8774/";
const PORT = 9251;
const chromeExe = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
].find(existsSync);
const profile = mkdtempSync(join(tmpdir(), "mj-modal-"));
const chrome = spawn(chromeExe, [
  "--headless=new", "--disable-gpu", "--no-first-run",
  "--window-size=390,844", `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`, "about:blank"
], { stdio: "ignore" });
const sleep = ms => new Promise(r => setTimeout(r, ms));

let targets = null;
for (let i = 0; i < 15; i++) {
  await sleep(700);
  try { targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); if (targets.length) break; } catch (e) {}
}
const page = targets.find(t => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener("open", r, { once: true }));
let seq = 0; const pending = new Map();
ws.addEventListener("message", ev => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
});
const send = (method, params = {}) => new Promise(res => {
  const id = ++seq; pending.set(id, res); ws.send(JSON.stringify({ id, method, params }));
});
const evalJs = async expr => {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return "ERR: " + JSON.stringify(r.result.exceptionDetails).slice(0, 300);
  return r.result?.result?.value ?? null;
};

const noMobile = process.argv.includes("nomobile");
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", noMobile
  ? { width: 390, height: 844, deviceScaleFactor: 1, mobile: false }
  : { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await send("Page.navigate", { url: URL });
await sleep(6500);
// 确保开局弹窗处于显示态（有些流程会自动点掉）
await evalJs(`(() => { const m = document.querySelector(".modal"); if (m) m.classList.remove("hidden"); return !!m; })()`);
await sleep(400);

const out = await evalJs(`(() => {
  const m = document.querySelector(".modal");
  const p = m && m.querySelector(".panel");
  const box = e => { if (!e) return null; const r = e.getBoundingClientRect(); return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height),right:Math.round(r.right)}; };
  const cs = e => { if (!e) return null; const s = getComputedStyle(e); return {position:s.position,top:s.top,left:s.left,right:s.right,bottom:s.bottom,width:s.width,height:s.height,zIndex:s.zIndex,display:s.display,fontSize:s.fontSize,transform:s.transform,maxHeight:s.maxHeight}; };
  const ancestors = [];
  let a = m ? m.parentElement : null;
  while (a && ancestors.length < 8) {
    const s = getComputedStyle(a);
    ancestors.push({tag:a.tagName, cls:(a.className||"").toString().slice(0,50), pos:s.position, transform:s.transform, filter:s.filter, contain:s.contain, perspective:s.perspective, box:box(a)});
    a = a.parentElement;
  }
  return JSON.stringify({
    innerW: window.innerWidth, innerH: window.innerHeight, dpr: devicePixelRatio,
    vv: window.visualViewport ? {w:Math.round(visualViewport.width),h:Math.round(visualViewport.height)} : null,
    narrow900: matchMedia("(max-width: 900px)").matches,
    narrow760: matchMedia("(max-width: 760px)").matches,
    bodyClass: document.body.className,
    rootFont: getComputedStyle(document.documentElement).fontSize,
    modalHidden: m ? m.classList.contains("hidden") : null,
    modalBox: box(m), modalCss: cs(m), panelBox: box(p), panelCss: cs(p),
    ancestors
  }, null, 1);
})()`);
console.log(out);
const shot = await send("Page.captureScreenshot", { format: "png" });
if (shot.result?.data) writeFileSync("proof_modal_before.png", Buffer.from(shot.result.data, "base64"));
ws.close(); chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch (e) {}
setTimeout(() => process.exit(0), 300);
