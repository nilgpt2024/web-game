// The illustrated opening's art library: palette, timing helpers, painters and sprites, all drawn
// in Canvas 2D. Style ("monsoon ink"): flat cel shapes with dark ink edges and the cast's cream
// contour, lamp amber against night indigo, paper grain, rain drawn as graphic streaks. Aren's own
// drawings come from the game's sheets (never redrawn); new pieces (hands, paper, vehicles, rooms)
// are painted here in his palette.
export const W0 = 1600, H0 = 1000, PI = Math.PI, TAU = PI * 2;
// Dev only (`&plates`): layout renders for the painted plates leave out every moving layer.
export const PLATE = { on: typeof location !== 'undefined' && new URLSearchParams(location.search).has('plates') };
// `&platecam=fx,fy,zoom` frames the message beat's desk world for its plate (a wider rect than any shot).
if (PLATE.on) { const c = new URLSearchParams(location.search).get('platecam'); if (c) { const [x, y, z] = c.split(',').map(Number); PLATE.cam = { f: [x, y], z }; } }

export const C = {
  ink: '#15100c', inkSoft: '#2a201a', cream: '#f1e5c6', paper: '#ecdcb6', paperDark: '#d3bf93',
  teak: '#3b2418', teakDark: '#24150d', teakLight: '#5a3925', teakEdge: '#7a5236',
  lamp: '#ffc774', lampDeep: '#f09a45',
  night: '#0b141b', night2: '#132029', night3: '#1d313b', night4: '#29434d', mist: '#8ea3a8',
  olive: '#4d5731', oliveDark: '#394124', skin: '#6f4533', skinDark: '#53301f', bill: '#d59b62',
  tile: '#8f3e2c', tileDark: '#682c1f', tileLight: '#a95139', lime: '#d8d1b9', limeShade: '#a8a38c', limeDark: '#7d7a69',
  laterite: '#8d4a35', wood: '#4a2c1c', green: '#26382e', greenDoor: '#3f5a3b', brass: '#caa35c',
  leaf: '#15271d', leaf2: '#1d3527', leaf3: '#2a4833', leafRim: 'rgba(150,190,200,.55)',
  busRed: '#a3352a', busCream: '#ddcaa0', busRoof: '#565b5f', glass: '#1d2c36', warm: '#f3c27a'
};

// ---------------------------------------------------------------- timing
export const clamp01 = t => Math.min(1, Math.max(0, t));
export const EASE = {
  lin: t => t, in: t => t * t, out: t => 1 - (1 - t) * (1 - t), s: t => t * t * (3 - 2 * t),
  ss: t => t * t * t * (t * (t * 6 - 15) + 10), in3: t => t * t * t, out3: t => 1 - Math.pow(1 - t, 3),
  back: t => { const c = 1.6; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }
};
export const mix = (a, b, k) => Array.isArray(a) ? a.map((v, i) => v + (b[i] - v) * k) : a + (b - a) * k;
// keys: [[time, value, ease?], ...]; the ease shapes the segment that arrives at that key.
export function key(keys, t) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [t1, v1, e] = keys[i];
    if (t <= t1) { const [t0, v0] = keys[i - 1]; return mix(v0, v1, (EASE[e] || EASE.ss)((t - t0) / Math.max(1e-6, t1 - t0))); }
  }
  return keys[keys.length - 1][1];
}
export const span = (t, a, b) => clamp01((t - a) / (b - a));
export const bell = (t, a, b) => { const k = span(t, a, b); return Math.sin(PI * k); };
export function rng(seed) { let s = Math.floor(seed * 7919) % 2147483646 + 1; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
export function vnoise(x, seed = 0) {
  const h = n => { const s = Math.sin(n * 127.1 + seed * 311.7) * 43758.5453; return s - Math.floor(s); };
  const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f);
  return h(i) * (1 - u) + h(i + 1) * u;
}
export const fbm = (x, seed = 0) => vnoise(x, seed) * .55 + vnoise(x * 2.1, seed + 3) * .3 + vnoise(x * 4.7, seed + 7) * .15;
export function canvas(w, h, draw) {
  const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h));
  if (draw) draw(c.getContext('2d'), c.width, c.height);
  return c;
}

// ---------------------------------------------------------------- painters (design space)
export function glow(g, x, y, r, color, alpha = 1, op = 'lighter') {
  if (alpha <= 0 || r <= 0) return;
  g.save(); g.globalCompositeOperation = op; g.globalAlpha = Math.min(1, alpha);
  const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, color); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.fillRect(x - r, y - r, 2 * r, 2 * r); g.restore();
}
// Darkens toward the edges with plain alpha (a multiply here would make the GPU copy the frame).
export function vignette(g, strength = .6, inner = .45) {
  if (PLATE.on) return;
  g.save();
  const gr = g.createRadialGradient(W0 / 2, H0 * .48, W0 * inner * .5, W0 / 2, H0 * .5, W0 * .78);
  gr.addColorStop(0, 'rgba(2,3,8,0)'); gr.addColorStop(1, `rgba(2,3,8,${strength})`);
  g.fillStyle = gr; g.fillRect(-50, -50, W0 + 100, H0 + 100); g.restore();
}
export function flat(g, color, alpha = 1, op = 'source-over') {
  if (alpha <= 0) return;
  g.save(); g.globalCompositeOperation = op; g.globalAlpha = Math.min(1, alpha); g.fillStyle = color; g.fillRect(-60, -60, W0 + 120, H0 + 120); g.restore();
}
// Rain as long graphic streaks, in one path per layer. Deterministic per seed, continuous in t.
export function rain(g, t, o = {}) {
  if (PLATE.on) return;
  const { x0 = -120, y0 = -120, x1 = W0 + 120, y1 = H0 + 120, n = 260, len = 70, speed = 1500, angle = .16, width = 1.3, color = '196,218,232', alpha = .32, seed = 1 } = o;
  const r = rng(seed), dx = Math.sin(angle), dy = Math.cos(angle), span_ = y1 - y0 + len * 2, wd = x1 - x0;
  g.save(); g.strokeStyle = `rgba(${color},${alpha})`; g.lineWidth = width; g.lineCap = 'round'; g.beginPath();
  for (let i = 0; i < n; i++) {
    const bx = r() * wd, off = r() * span_, sp = speed * (.75 + r() * .5), l = len * (.55 + r() * .9);
    const d = (off + t * sp) % span_, y = y0 - len + d, x = x0 + (((bx + d * dx / dy) % wd) + wd) % wd;
    g.moveTo(x, y); g.lineTo(x + dx * l, y + dy * l);
  }
  g.stroke(); g.restore();
}
export function leafPath(g, len, wid) {
  g.beginPath(); g.moveTo(0, 0);
  g.bezierCurveTo(len * .28, -wid, len * .72, -wid * .85, len, 0);
  g.bezierCurveTo(len * .72, wid * .85, len * .28, wid, 0, 0); g.closePath();
}
export function leaf(g, x, y, len, wid, ang, fill, rim = null, vein = null) {
  g.save(); g.translate(x, y); g.rotate(ang); leafPath(g, len, wid); g.fillStyle = fill; g.fill();
  if (rim) { g.strokeStyle = rim; g.lineWidth = Math.max(1.5, wid * .06); g.stroke(); }
  if (vein) { g.strokeStyle = vein; g.lineWidth = Math.max(1, wid * .05); g.beginPath(); g.moveTo(len * .04, 0); g.quadraticCurveTo(len * .5, -wid * .06, len * .94, 0); g.stroke(); }
  g.restore();
}
// A leafy spray from a stem: used for foreground framing and wipes. `sway` in radians.
export function spray(g, x, y, ang, len, seed, { fill = C.leaf, fill2 = C.leaf2, rim = C.leafRim, sway = 0, scale = 1 } = {}) {
  if (PLATE.on) return;
  const r = rng(seed);
  g.save(); g.translate(x, y); g.rotate(ang + sway); g.scale(scale, scale);
  g.strokeStyle = fill; g.lineWidth = 10; g.lineCap = 'round';
  g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(len * .5, -len * .08, len, 0); g.stroke();
  const n = 9;
  for (let i = 0; i < n; i++) {
    const k = .15 + .85 * i / n, px = len * k, py = -len * .08 * 4 * k * (1 - k);
    for (const side of [-1, 1]) {
      const l = (150 + r() * 120) * (1 - k * .35), w = l * (.2 + r() * .06);
      leaf(g, px, py, l, w, side * (.85 + r() * .35) + (r() - .5) * .2 + sway * .6 * side, r() < .5 ? fill : fill2, rim, 'rgba(0,0,0,.25)');
    }
  }
  leaf(g, len, 0, 220, 50, (r() - .5) * .3, fill2, rim, 'rgba(0,0,0,.25)');
  g.restore();
}
// Paper grain, laid over every frame so paint reads as printed, not rendered. Light and dark specks
// carried in alpha, for plain blending; the light ones are held back so the night shadows stay clean.
export function grainTexture() {
  return canvas(256, 256, (g, w, h) => {
    const img = g.createImageData(w, h), r = rng(3);
    for (let i = 0; i < w * h; i++) {
      const e = ((r() - .5) * 70 + (r() < .015 ? -60 : 0)) / 255, v = e > 0 ? 255 : 0;
      img.data.set([v, v, v, Math.round(Math.min(1, Math.abs(e) * 2 * (e > 0 ? .55 : .85)) * 255)], i * 4);
    }
    g.putImageData(img, 0, 0);
    g.strokeStyle = 'rgba(0,0,0,.09)'; g.lineWidth = .8;
    for (let i = 0; i < 40; i++) { g.beginPath(); const x = r() * w, y = r() * h; g.moveTo(x, y); g.quadraticCurveTo(x + (r() - .5) * 30, y + (r() - .5) * 30, x + (r() - .5) * 50, y + (r() - .5) * 50); g.stroke(); }
  });
}
export function grain(g, pattern, alpha = .14, t = 0) {
  if (PLATE.on) return;
  g.save(); g.globalAlpha = alpha; g.fillStyle = pattern;
  const ox = Math.floor(t * 24) % 7 * 37, oy = Math.floor(t * 24) % 5 * 53;       // grain boils at 24 fps, like film
  g.translate(-ox, -oy); g.fillRect(-60, -60, W0 + 200, H0 + 200); g.restore();
}
// Draw a sprite canvas centred on (x, y) at `h` design-pixels tall, optionally mirrored.
export function sprite(g, img, x, y, h, { ax = .5, ay = .5, rot = 0, flip = false, alpha = 1 } = {}) {
  if (!img || alpha <= 0) return;
  const s = h / img.height, w = img.width * s;
  g.save(); g.globalAlpha *= alpha; g.translate(x, y); g.rotate(rot); if (flip) g.scale(-1, 1);
  g.drawImage(img, -w * ax, -h * ay, w, h); g.restore();
}
// A silhouette version of a sprite (for rim-lit figures and shadows).
export function tinted(img, color, alpha = 1) {
  return canvas(img.width, img.height, g => { g.drawImage(img, 0, 0); g.globalCompositeOperation = 'source-in'; g.globalAlpha = alpha; g.fillStyle = color; g.fillRect(0, 0, img.width, img.height); });
}
export function blurred(img, px) {
  const pad = px * 3;
  return canvas(img.width + pad * 2, img.height + pad * 2, g => { g.filter = `blur(${px}px)`; g.drawImage(img, pad, pad); });
}

// ---------------------------------------------------------------- sprites
// Aren's right hand from above, palm down, fingertips to the left: olive sleeve, cream cuff, his
// brown skin, the cast's ink line and cream contour.
export function handSprite(pinch) {
  return canvas(1536, 512, (c) => {
    c.scale(2, 2);
    const skin = C.skin, shade = '#4b2a1b', light = 'rgba(160,110,80,.3)', rim = C.cream, ink = '#2a1810';
    const fingers = pinch
      ? [[[120, 88], [100, 84], [86, 88], 19], [[114, 111], [92, 108], [76, 114], 22], [[112, 135], [88, 136], [72, 142], 23], [[116, 160], [88, 170], [70, 188], 22]]
      : [[[120, 88], [92, 80], [64, 78], 19], [[114, 111], [80, 106], [42, 104], 22], [[112, 135], [74, 134], [34, 134], 23], [[116, 160], [80, 166], [44, 170], 22]];
    const thumb = pinch ? [[204, 176], [160, 198], [86, 196], 25] : [[204, 176], [166, 202], [124, 210], 25];
    const back = () => { c.beginPath(); c.moveTo(238, 90); c.quadraticCurveTo(170, 76, 124, 78); c.quadraticCurveTo(104, 130, 124, 184); c.quadraticCurveTo(180, 186, 240, 172); c.closePath(); };
    const sleeve = () => { c.beginPath(); c.moveTo(262, 60); c.bezierCurveTo(420, 44, 600, 32, 768, 24); c.lineTo(768, 234); c.bezierCurveTo(600, 228, 420, 220, 262, 204); c.closePath(); };
    const cuff = () => { c.beginPath(); c.moveTo(230, 76); c.lineTo(272, 64); c.lineTo(274, 200); c.lineTo(232, 190); c.closePath(); };
    const digit = ([p0, p1, p2, w], extra, col) => { c.strokeStyle = col; c.lineWidth = w + extra; c.lineCap = c.lineJoin = 'round'; c.beginPath(); c.moveTo(...p0); c.quadraticCurveTo(...p1, ...p2); c.stroke(); };
    for (const [e, col] of [[15, rim], [6, ink]]) { for (const f of [...fingers, thumb]) digit(f, e, col); c.lineWidth = e; c.strokeStyle = col; c.lineJoin = 'round'; back(); c.stroke(); cuff(); c.stroke(); sleeve(); c.stroke(); }
    c.fillStyle = C.olive; sleeve(); c.fill();
    c.strokeStyle = C.oliveDark; c.lineWidth = 5; c.lineCap = 'round';
    for (const [x0, y0, x1, y1] of [[330, 72, 470, 98], [360, 190, 520, 170], [540, 60, 700, 84], [560, 200, 720, 188]]) { c.beginPath(); c.moveTo(x0, y0); c.quadraticCurveTo((x0 + x1) / 2, (y0 + y1) / 2 + 12, x1, y1); c.stroke(); }
    c.fillStyle = 'rgba(120,135,80,.35)'; c.beginPath(); c.ellipse(470, 62, 150, 15, -.04, 0, TAU); c.fill();
    c.fillStyle = '#e9e2d0'; cuff(); c.fill(); c.fillStyle = '#cfc6b0'; c.fillRect(252, 68, 20, 132);
    c.strokeStyle = ink; c.lineWidth = 2.5; cuff(); c.stroke();
    c.fillStyle = '#b9ad92'; c.beginPath(); c.arc(248, 122, 5, 0, TAU); c.fill();
    for (const f of fingers) { digit(f, 4, shade); digit(f, 0, skin); }
    digit(thumb, 4, shade); digit(thumb, 0, skin);
    c.fillStyle = skin; back(); c.fill();
    c.fillStyle = light; c.beginPath(); c.ellipse(178, 118, 46, 22, -.08, 0, TAU); c.fill();
    c.strokeStyle = 'rgba(60,34,22,.6)'; c.lineWidth = 2.5;
    for (const [[x, y]] of fingers) { c.beginPath(); c.arc(x + 4, y, 7, PI * .55, PI * 1.45); c.stroke(); }
  });
}
function paperGrain(c, W, H, n = 600, a = .05) { const r = rng(W + H); for (let i = 0; i < n; i++) { c.fillStyle = `rgba(120,95,60,${r() * a})`; c.fillRect(r() * W, r() * H, 2 + r() * 3, 1); } }
// Step 13B: a painted paper (plate 'paper') laid into a sheet, with the light falling off at its edges.
// Build-time only, so the multiply here costs nothing per frame.
function paperFace(c, tex, w, h, at = 0) {
  if (!tex) { paperGrain(c, w, h); return; }
  const sw = Math.min(tex.width, tex.width * .5 + w), sh = sw * h / w, sx = (tex.width - sw) * (.2 + .6 * at), sy = (tex.height - sh) * (.3 + .4 * at);
  c.save(); c.globalCompositeOperation = 'multiply'; c.drawImage(tex, sx, sy, sw, sh, 0, 0, w, h);
  const e = c.createRadialGradient(w * .45, h * .4, Math.min(w, h) * .25, w * .5, h * .5, Math.hypot(w, h) * .62);
  e.addColorStop(0, 'rgba(255,255,255,1)'); e.addColorStop(1, 'rgba(206,184,150,1)'); c.fillStyle = e; c.fillRect(0, 0, w, h);
  c.restore();
}
export function envelopeSprite(front, tex) {
  return canvas(1280, 660, (c, W, H) => {
    c.scale(2, 2); const w = 640, h = 330;
    c.fillStyle = front ? '#efe2c2' : '#e4d4ae'; c.fillRect(0, 0, w, h); paperFace(c, tex, w, h, front ? .2 : .7);
    c.strokeStyle = 'rgba(80,60,40,.5)'; c.lineWidth = 2; c.strokeRect(1, 1, w - 2, h - 2);
    if (front) {
      c.fillStyle = '#f2e7c9'; c.fillRect(512, 22, 100, 118);
      c.fillStyle = '#a14b3a'; c.fillRect(521, 31, 82, 100);
      c.fillStyle = '#e4cf9f'; c.beginPath(); c.arc(562, 76, 22, 0, TAU); c.fill(); c.fillStyle = '#a14b3a'; c.beginPath(); c.arc(562, 76, 11, 0, TAU); c.fill();
      c.fillStyle = '#e8d8b2'; for (let k = 0; k <= 10; k++) { c.beginPath(); c.arc(512 + k * 10, 22, 3.2, 0, TAU); c.arc(512 + k * 10, 140, 3.2, 0, TAU); c.fill(); }
      c.strokeStyle = 'rgba(62,54,92,.62)'; c.lineWidth = 3; c.beginPath(); c.arc(462, 92, 50, 0, TAU); c.stroke(); c.lineWidth = 2; c.beginPath(); c.arc(462, 92, 38, 0, TAU); c.stroke();
      c.lineWidth = 3.5;
      for (const y of [52, 66, 80, 112]) { c.beginPath(); c.moveTo(330, y); for (let x = 330; x <= 624; x += 4) c.lineTo(x, y + Math.sin(x * .11) * 3.5); c.stroke(); }   // three waves, a gap, one more
      c.fillStyle = '#26303f'; c.font = 'italic 54px Georgia'; c.fillText('A. Vale', 130, 230);
      c.strokeStyle = 'rgba(38,48,63,.35)'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(122, 246); c.lineTo(360, 244); c.stroke();
    } else {
      c.strokeStyle = 'rgba(95,72,44,.42)'; c.lineWidth = 3;
      c.beginPath(); c.moveTo(10, 10); c.lineTo(210, 190); c.moveTo(w - 10, 10); c.lineTo(w - 210, 190); c.stroke();
      c.fillStyle = 'rgba(245,232,200,.55)'; c.beginPath(); c.moveTo(6, h - 6); c.lineTo(w / 2, 112); c.lineTo(w - 6, h - 6); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(95,72,44,.55)'; c.beginPath(); c.moveTo(6, h - 6); c.lineTo(w / 2, 112); c.lineTo(w - 6, h - 6); c.stroke();
    }
  });
}
// The note, folded in three: the top third "Cedar House.", the middle the rest, the bottom empty.
export function noteSprite(tex) {
  return canvas(1536, 1320, (c, W, H) => {
    c.scale(2, 2); const w = 768, h = 660;
    c.fillStyle = '#f3e7c8'; c.fillRect(0, 0, w, h);
    if (tex) paperFace(c, tex, w, h, .45); else paperGrain(c, w, h, 900, .045);
    const gr = c.createLinearGradient(0, 0, w, h); gr.addColorStop(0, 'rgba(255,250,235,.25)'); gr.addColorStop(1, 'rgba(160,130,90,.12)'); c.fillStyle = gr; c.fillRect(0, 0, w, h);
    // The two creases the note was folded along: a soft valley, a lit ridge.
    for (const y of [220, 440]) {
      const cr = c.createLinearGradient(0, y - 16, 0, y + 16); cr.addColorStop(0, 'rgba(120,95,60,0)'); cr.addColorStop(.46, 'rgba(120,95,60,.16)'); cr.addColorStop(.52, 'rgba(255,250,235,.3)'); cr.addColorStop(1, 'rgba(255,250,235,0)');
      c.fillStyle = cr; c.fillRect(0, y - 16, w, 32);
    }
    c.strokeStyle = 'rgba(120,100,70,.22)'; c.lineWidth = 1.5; for (const y of [220, 440]) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke(); }
    c.fillStyle = '#252d3a';
    c.font = 'italic 56px Georgia'; c.fillText('Cedar House.', 72, 146);
    c.font = 'italic 41px Georgia'; c.fillText('Before the rains close the road.', 72, 300); c.fillText('There is something you should see.', 72, 382);
    c.fillStyle = 'rgba(37,45,58,.1)'; c.fillRect(470, 562, 210, 3);          // where a name would be: nothing
  });
}
export function ticketSprite() {
  return canvas(520, 250, (c, W, H) => {
    c.scale(2, 2); c.fillStyle = '#d9c99c'; c.fillRect(0, 0, 260, 125); paperGrain(c, 260, 125, 140, .06);
    c.fillStyle = '#34495a'; c.font = 'bold 21px Courier New'; c.fillText('II CL · GHAT SECTION', 12, 42);
    c.font = '17px Courier New'; c.fillText('ONE PASSENGER', 12, 76); c.fillText('MANGALORE → HILLS', 12, 100);
    c.strokeStyle = 'rgba(52,73,90,.5)'; c.setLineDash([4, 4]); c.beginPath(); c.moveTo(214, 0); c.lineTo(214, 125); c.stroke();
  });
}
// The hill bus, side-on, facing right: red below, cream above, lit windows, luggage under tarpaulin.
export function busSprite() {
  return canvas(1000, 400, (c) => {
    c.scale(2, 2);
    const ink = C.ink;
    const body = () => { c.beginPath(); c.moveTo(20, 150); c.lineTo(20, 70); c.quadraticCurveTo(22, 46, 50, 44); c.lineTo(420, 42); c.quadraticCurveTo(452, 44, 462, 78); c.lineTo(476, 128); c.quadraticCurveTo(480, 152, 462, 156); c.lineTo(34, 158); c.quadraticCurveTo(20, 158, 20, 150); c.closePath(); };
    c.lineJoin = 'round';
    c.strokeStyle = C.cream; c.lineWidth = 7; body(); c.stroke();
    c.fillStyle = C.busCream; body(); c.fill();
    c.save(); body(); c.clip(); c.fillStyle = C.busRed; c.fillRect(0, 108, 500, 60); c.fillStyle = '#7d261e'; c.fillRect(0, 150, 500, 20);
    c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(0, 100, 500, 8); c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(0, 46, 500, 6); c.restore();
    c.strokeStyle = ink; c.lineWidth = 3; body(); c.stroke();
    // Windows: warm, with passengers' shapes in two of them.
    for (let i = 0; i < 7; i++) {
      const x = 44 + i * 50; c.fillStyle = C.warm; c.fillRect(x, 58, 40, 36);
      c.fillStyle = 'rgba(120,60,30,.35)'; c.fillRect(x, 84, 40, 10);
      if (i === 2 || i === 5) { c.fillStyle = 'rgba(60,35,25,.55)'; c.beginPath(); c.ellipse(x + 20, 80, 10, 13, 0, 0, TAU); c.fill(); }
      c.strokeStyle = ink; c.lineWidth = 2.5; c.strokeRect(x, 58, 40, 36);
    }
    c.fillStyle = '#9fb8c3'; c.beginPath(); c.moveTo(412, 56); c.lineTo(446, 56); c.lineTo(462, 104); c.lineTo(412, 104); c.closePath(); c.fill(); c.strokeStyle = ink; c.stroke();
    c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.moveTo(420, 60); c.lineTo(430, 60); c.lineTo(424, 100); c.lineTo(416, 100); c.closePath(); c.fill();
    c.strokeStyle = ink; c.lineWidth = 2; c.strokeRect(372, 60, 30, 88);                          // door
    // Roof rack, tarpaulin-covered luggage, ropes.
    c.strokeStyle = '#2a2d2e'; c.lineWidth = 3; c.beginPath(); c.moveTo(70, 38); c.lineTo(380, 38); c.stroke();
    for (let x = 80; x <= 370; x += 58) { c.beginPath(); c.moveTo(x, 38); c.lineTo(x, 44); c.stroke(); }
    c.fillStyle = '#3f5a52'; c.beginPath(); c.moveTo(100, 38); c.quadraticCurveTo(120, 8, 190, 10); c.quadraticCurveTo(260, 6, 300, 22); c.quadraticCurveTo(330, 30, 334, 38); c.closePath(); c.fill(); c.strokeStyle = ink; c.lineWidth = 2.5; c.stroke();
    c.fillStyle = '#6b4430'; c.fillRect(300, 20, 52, 18); c.strokeRect(300, 20, 52, 18);
    c.strokeStyle = '#c9b27a'; c.lineWidth = 2; for (const x of [150, 240]) { c.beginPath(); c.moveTo(x - 20, 38); c.quadraticCurveTo(x, 6, x + 20, 38); c.stroke(); }
    // Lamps, bumper, wheel arches (wheels are drawn live so they can turn).
    c.fillStyle = '#2a2d2e'; c.fillRect(456, 140, 26, 12); c.fillRect(14, 140, 20, 12);
    c.fillStyle = '#fff1c8'; c.beginPath(); c.arc(468, 124, 9, 0, TAU); c.fill(); c.strokeStyle = ink; c.stroke();
    c.fillStyle = '#ff5d45'; c.fillRect(20, 118, 7, 14);
    c.fillStyle = C.ink; for (const x of [110, 380]) { c.beginPath(); c.arc(x, 158, 30, PI, 0); c.fill(); }
  });
}
// Aren's drawings, cut from the game's own sheets (acting sheet v61 and the cast atlas).
export const AREN_RECTS = {
  thinking: [96, 519, 433, 1009], neutral: [96, 8, 433, 500], amused: [1064, 8, 1439, 500], surprised: [582, 514, 915, 1009],
  neutralHead: [186, 2, 442, 196], amusedHead: [1142, 2, 1430, 196],
  front: [20, 38, 565, 698], rear: [643, 38, 1101, 698]
};
// The near eye's white (sheet coordinates) for the blink lid, per drawing.
export const AREN_EYES = { thinking: [[276, 592, 301, 609], [340, 587, 351, 595]], front: [[359, 133, 391, 151]] };
export function cut(img, [x0, y0, x1, y1]) { return canvas(x1 - x0, y1 - y0, g => g.drawImage(img, x0, y0, x1 - x0, y1 - y0, 0, 0, x1 - x0, y1 - y0)); }
// A closed-lid overlay for a drawing: covers each eye white with the skin just above it and a lash line.
export function blinkLayer(img, rect, eyes) {
  const [ox, oy] = rect, probe = canvas(img.width, img.height, g => g.drawImage(img, 0, 0));
  const pg = probe.getContext('2d');
  return canvas(rect[2] - ox, rect[3] - oy, g => {
    for (const [x0, y0, x1, y1] of eyes) {
      const d = pg.getImageData(Math.round((x0 + x1) / 2), Math.max(0, y0 - 6), 1, 1).data;       // skin just above the eye (sheet coordinates)
      const cx = (x0 + x1) / 2 - ox, cy = (y0 + y1) / 2 - oy, rx = (x1 - x0) / 2 + 3, ry = (y1 - y0) / 2 + 3;
      g.fillStyle = `rgb(${d[0]},${d[1]},${d[2]})`; g.beginPath(); g.ellipse(cx, cy, rx, ry, 0, 0, TAU); g.fill();
      g.strokeStyle = '#1b120d'; g.lineWidth = Math.max(2, ry * .35); g.lineCap = 'round';
      g.beginPath(); g.moveTo(cx - rx * .9, cy + ry * .15); g.quadraticCurveTo(cx, cy + ry * .75, cx + rx * .9, cy + ry * .1); g.stroke();
    }
  });
}
