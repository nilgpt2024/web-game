// Procedural CanvasTextures for the track (Agent 1 — World). No external assets.
import * as THREE from 'three';

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return [c, c.getContext('2d')];
}

function finish(c, { repeat = true, anisotropy = 8, srgb = true } = {}) {
  const tex = new THREE.CanvasTexture(c);
  if (repeat) { tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping; }
  tex.anisotropy = anisotropy;
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  return tex;
}

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function speckle(ctx, w, h, count, colors, rand, minS = 1, maxS = 2.5) {
  for (let i = 0; i < count; i++) {
    ctx.fillStyle = colors[(rand() * colors.length) | 0];
    const s = minS + rand() * (maxS - minS);
    ctx.fillRect(rand() * w, rand() * h, s, s);
  }
}

// Asphalt: u across road (0 = left edge, 1 = right edge), v along the road.
export function makeAsphaltTexture() {
  const W = 512, H = 512;
  const [c, ctx] = canvas(W, H);
  const rand = rng(11);
  ctx.fillStyle = '#5b5f68';
  ctx.fillRect(0, 0, W, H);
  // large soft blotches
  for (let i = 0; i < 60; i++) {
    const x = rand() * W, y = rand() * H, r = 20 + rand() * 60;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    const dark = rand() < 0.5;
    g.addColorStop(0, dark ? 'rgba(40,42,48,0.18)' : 'rgba(120,124,132,0.14)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  speckle(ctx, W, H, 9000, ['#4a4e56', '#6d717b', '#7d818a', '#3f424a', '#62666f'], rand, 1, 2.2);
  // subtle tire-wear darker lanes along the racing grooves
  for (const cx of [0.3, 0.7]) {
    const g = ctx.createLinearGradient(W * (cx - 0.12), 0, W * (cx + 0.12), 0);
    g.addColorStop(0, 'rgba(30,30,36,0)');
    g.addColorStop(0.5, 'rgba(30,30,36,0.16)');
    g.addColorStop(1, 'rgba(30,30,36,0)');
    ctx.fillStyle = g;
    ctx.fillRect(W * (cx - 0.12), 0, W * 0.24, H);
  }
  // edge lines (solid white)
  ctx.fillStyle = '#f4f4f0';
  ctx.fillRect(W * 0.035, 0, W * 0.022, H);
  ctx.fillRect(W * (1 - 0.057), 0, W * 0.022, H);
  // dashed centre line (yellow)
  ctx.fillStyle = '#ffd54a';
  for (let y = 0; y < H; y += 256) ctx.fillRect(W * 0.5 - 5, y + 40, 10, 150);
  // faint lane dashes (white)
  ctx.fillStyle = 'rgba(245,245,240,0.55)';
  for (const lx of [0.27, 0.73]) for (let y = 0; y < H; y += 256) ctx.fillRect(W * lx - 3, y + 170, 6, 70);
  return finish(c, { anisotropy: 16 });
}

// Red/white rumble strip: u across (0..1), v along (one red + one white block per repeat)
export function makeCurbTexture() {
  const [c, ctx] = canvas(64, 128);
  ctx.fillStyle = '#e8322f'; ctx.fillRect(0, 0, 64, 64);
  ctx.fillStyle = '#fbfbf7'; ctx.fillRect(0, 64, 64, 64);
  // bevel shading
  const g = ctx.createLinearGradient(0, 0, 64, 0);
  g.addColorStop(0, 'rgba(0,0,0,0.25)');
  g.addColorStop(0.2, 'rgba(0,0,0,0)');
  g.addColorStop(0.8, 'rgba(255,255,255,0.1)');
  g.addColorStop(1, 'rgba(0,0,0,0.2)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 64, 128);
  return finish(c);
}

// Offroad band grass: tileable noisy grass with mowing stripes along v.
export function makeGrassTexture() {
  const W = 256, H = 256;
  const [c, ctx] = canvas(W, H);
  const rand = rng(23);
  ctx.fillStyle = '#6fbf3f'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.fillRect(0, 0, W, H / 2);
  speckle(ctx, W, H, 5000, ['#5eae34', '#7fcf4b', '#68b83a', '#8ad656', '#57a22f'], rand, 1, 3);
  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = ['#ffe66b', '#ffffff', '#ff8fb1'][(rand() * 3) | 0];
    ctx.fillRect(rand() * W, rand() * H, 2, 2);
  }
  return finish(c);
}

export function makeSandTexture() {
  const W = 256, H = 256;
  const [c, ctx] = canvas(W, H);
  const rand = rng(31);
  ctx.fillStyle = '#e9cf92'; ctx.fillRect(0, 0, W, H);
  speckle(ctx, W, H, 6000, ['#dcc080', '#f3dca6', '#d2b574', '#efd79c'], rand, 1, 2.5);
  return finish(c);
}

export function makeConcreteTexture() {
  const W = 256, H = 256;
  const [c, ctx] = canvas(W, H);
  const rand = rng(41);
  ctx.fillStyle = '#b9bcc2'; ctx.fillRect(0, 0, W, H);
  speckle(ctx, W, H, 4000, ['#a8abb2', '#c7cad0', '#9fa3aa'], rand, 1, 2);
  ctx.strokeStyle = 'rgba(80,80,90,0.35)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 1); ctx.lineTo(W, 1); ctx.stroke();
  return finish(c);
}

// Colourful sponsor-style barrier panels. u along wall, v up the wall.
export function makeBarrierTexture() {
  const W = 1024, H = 128;
  const [c, ctx] = canvas(W, H);
  const panels = [
    { bg: '#1e6fe8', fg: '#ffffff', text: 'TURBO' },
    { bg: '#ffd21f', fg: '#e8322f', text: 'KART' },
    { bg: '#e8322f', fg: '#ffffff', text: 'RALLY' },
    { bg: '#ffffff', fg: '#1e6fe8', text: '★ GO! ★' },
  ];
  const pw = W / panels.length;
  panels.forEach((p, i) => {
    ctx.fillStyle = p.bg; ctx.fillRect(i * pw, 0, pw, H);
    ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.fillRect(i * pw, 0, pw, 18);
    ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.fillRect(i * pw, H - 18, pw, 18);
    ctx.fillStyle = p.fg;
    ctx.font = 'bold 72px "Lilita One", "Arial Black", Impact, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(p.text, i * pw + pw / 2, H / 2 + 4);
    ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(i * pw, 0, 4, H);
  });
  return finish(c);
}

// Bridge parapet: blue & white chevron bands. u along, v up
export function makeRailTexture() {
  const W = 256, H = 64;
  const [c, ctx] = canvas(W, H);
  ctx.fillStyle = '#f5f7fa'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#2563d9';
  for (let x = -H; x < W + H; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, H); ctx.lineTo(x + 32, H); ctx.lineTo(x + 32 + H, 0); ctx.lineTo(x + H, 0);
    ctx.closePath(); ctx.fill();
  }
  ctx.fillStyle = '#c9ced6'; ctx.fillRect(0, 0, W, 6); ctx.fillRect(0, H - 6, W, 6);
  return finish(c);
}

// Boost pad: chevrons pointing toward +v (race direction). Scrolled in update().
export function makeBoostTexture() {
  const W = 128, H = 256;
  const [c, ctx] = canvas(W, H);
  const g = ctx.createLinearGradient(0, 0, W, 0);
  g.addColorStop(0, '#ff7a00'); g.addColorStop(0.5, '#ffb300'); g.addColorStop(1, '#ff7a00');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  for (let k = 0; k < 2; k++) {
    const y0 = k * 128;
    ctx.fillStyle = '#fff6c2';
    ctx.beginPath();
    ctx.moveTo(14, y0 + 96); ctx.lineTo(64, y0 + 30); ctx.lineTo(114, y0 + 96);
    ctx.lineTo(114, y0 + 124); ctx.lineTo(64, y0 + 58); ctx.lineTo(14, y0 + 124);
    ctx.closePath(); ctx.fill();
  }
  ctx.strokeStyle = '#7a2a00'; ctx.lineWidth = 8; ctx.strokeRect(4, -10, W - 8, H + 20);
  return finish(c);
}

// Jump ramp top: blue/white stripes with yellow arrow; v along ramp.
export function makeRampTexture() {
  const W = 256, H = 256;
  const [c, ctx] = canvas(W, H);
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = i % 2 ? '#1e88e5' : '#e3f2fd';
    ctx.fillRect(i * 32, 0, 32, H);
  }
  ctx.fillStyle = '#ffd21f';
  ctx.strokeStyle = '#1a1a2e'; ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(128, 20); ctx.lineTo(210, 120); ctx.lineTo(160, 120); ctx.lineTo(160, 236);
  ctx.lineTo(96, 236); ctx.lineTo(96, 120); ctx.lineTo(46, 120); ctx.closePath();
  ctx.fill(); ctx.stroke();
  return finish(c, { repeat: false });
}

export function makeCheckerTexture(cols = 8, rows = 2) {
  const S = 32;
  const [c, ctx] = canvas(cols * S, rows * S);
  for (let x = 0; x < cols; x++) for (let y = 0; y < rows; y++) {
    ctx.fillStyle = (x + y) % 2 ? '#111318' : '#fafafa';
    ctx.fillRect(x * S, y * S, S, S);
  }
  const t = finish(c);
  t.magFilter = THREE.NearestFilter;
  return t;
}

export function makeBannerTexture(title) {
  const W = 1024, H = 128;
  const [c, ctx] = canvas(W, H);
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#ff4d3d'); g.addColorStop(1, '#c81e1e');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // checkered ends
  const S = 16;
  for (const x0 of [0, W - 96]) for (let x = 0; x < 6; x++) for (let y = 0; y < 8; y++) {
    ctx.fillStyle = (x + y) % 2 ? '#111' : '#fff';
    ctx.fillRect(x0 + x * S, y * S, S, S);
  }
  ctx.fillStyle = '#ffd21f';
  ctx.fillRect(96, 0, W - 192, 8); ctx.fillRect(96, H - 8, W - 192, 8);
  ctx.font = 'bold 78px "Lilita One", "Arial Black", Impact, sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.lineWidth = 10; ctx.strokeStyle = '#7a0d0d';
  ctx.strokeText(title, W / 2, H / 2 + 5);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(title, W / 2, H / 2 + 5);
  return finish(c, { repeat: false });
}

// Stand canopy stripes
export function makeStripeTexture(a = '#ffffff', b = '#e8322f', n = 8) {
  const [c, ctx] = canvas(256, 16);
  for (let i = 0; i < n; i++) { ctx.fillStyle = i % 2 ? b : a; ctx.fillRect(i * 256 / n, 0, 256 / n, 16); }
  return finish(c);
}
