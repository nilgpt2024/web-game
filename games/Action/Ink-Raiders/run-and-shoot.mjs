import { spawn } from 'node:child_process';
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { PNG } from 'pngjs';

const PORT = 5188;
const URL = `http://127.0.0.1:${PORT}`;

const server = spawn('node', ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', String(PORT)], {
  cwd: process.cwd(),
  stdio: 'ignore',
});

async function waitForServer(timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(URL);
      if (res.ok) return true;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

async function sampleCanvas(page) {
  const locator = page.locator('canvas').first();
  const rect = await locator.boundingBox();
  if (!rect || rect.width < 32 || rect.height < 32) {
    return { ok: false, reason: 'canvas-too-small', rect };
  }
  const buffer = await locator.screenshot();
  const png = PNG.sync.read(buffer);
  let min = 255, max = 0, alphaPixels = 0;
  const colors = new Set();
  const stride = Math.max(1, Math.floor((png.width * png.height) / 4096));
  for (let pixel = 0; pixel < png.width * png.height; pixel += stride) {
    const offset = pixel * 4;
    const r = png.data[offset], g = png.data[offset + 1], b = png.data[offset + 2], a = png.data[offset + 3];
    min = Math.min(min, r, g, b);
    max = Math.max(max, r, g, b);
    if (a > 0) alphaPixels += 1;
    colors.add(`${r >> 4},${g >> 4},${b >> 4},${a >> 6}`);
  }
  const variance = max - min;
  const diagnostics = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    return { drawingBuffer: canvas ? { width: canvas.width, height: canvas.height } : null, game: window.__THREE_GAME_DIAGNOSTICS__ ?? null };
  });
  const ok = alphaPixels > 256 && (variance > 8 || colors.size > 3);
  return { ok, reason: ok ? 'nonblank' : 'low-variance', rect, drawingBuffer: diagnostics.drawingBuffer, alphaPixels, variance, colorBuckets: colors.size, diagnostics: diagnostics.game };
}

const out = 'artifacts/canvas-inspection';
await mkdir(out, { recursive: true });

try {
  const up = await waitForServer(30000);
  if (!up) throw new Error('server did not start');

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const consoleErrors = [], pageErrors = [];
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', (e) => pageErrors.push(e.message));

  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForSelector('canvas', { state: 'visible', timeout: 10000 });
  await page.waitForTimeout(1500);

  const result = await sampleCanvas(page);
  const screenshotPath = path.join(out, 'desktop.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  const report = { url: URL, mode: 'desktop', screenshotPath, result, consoleErrors, pageErrors };
  await writeFile(path.join(out, 'desktop.json'), `${JSON.stringify(report, null, 2)}\n`);
  await browser.close();
  console.log(JSON.stringify(report, null, 2));
} finally {
  server.kill('SIGTERM');
}
