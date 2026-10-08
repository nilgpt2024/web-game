// The opening's animated shots (assets/opening2d/clips/): painted plates brought to life with
// ComfyUI image-to-video (Wan 2.2 TI2V-5B, tools/opening2d/art/wan.py), camera locked, so everything
// the opening draws on top (Aren, paper, beams, rain, captions) stays registered. Each clip is a muted
// <video> kept in step with the opening's own clock; until it can play, its still plate stands in.
import { W0, H0, canvas } from './opening2d-art.js';
const BASE = './assets/opening2d/clips/';
export const CLIP_FILES = {
  desk: 'desk.webm', house: 'house.webm', steps: 'steps.webm', arrival: 'arrival.webm'
};

export function loadClips() {
  const out = {};
  return Promise.all(Object.entries(CLIP_FILES).map(([k, f]) => new Promise(res => {
    const v = document.createElement('video');
    Object.assign(v, { muted: true, playsInline: true, preload: 'auto', loop: false });
    v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
    const done = ok => { v.onloadeddata = v.onerror = null; if (ok) out[k] = v; res(); };
    v.onloadeddata = () => done(true); v.onerror = () => done(false);
    v.src = BASE + f; v.load();
  }))).then(() => out);
}

// The frame of clip `v` for shot time `t`: plays in step with the clock (nudged back if it drifts more
// than a few frames), or holds exactly on `t` while the opening is paused for review. Returns the
// video when it has a frame to draw, else null (draw the still plate).
export function clipAt(v, t, paused) {
  if (!v || !v.duration) return null;
  const want = Math.max(0, Math.min(v.duration - .05, t));
  if (paused) {
    if (!v.paused) v.pause();
    if (Math.abs(v.currentTime - want) > .02) v.currentTime = want;
  } else if (v.paused || v.ended) {
    if (Math.abs(v.currentTime - want) > .05) v.currentTime = want;
    if (want < v.duration - .06) v.play().catch(() => {});
  } else if (Math.abs(v.currentTime - want) > .12) v.currentTime = want;
  v._used = true;
  return v.readyState >= 2 ? v : null;
}

// A lettered board cut from its still plate (outline in design space, or in a sw x sh space), with a
// soft edge so the seam with the clip around it does not show; laid over the clip every frame with drawHold.
export function holdCut(img, poly, sw = W0, sh = H0) {
  if (!img || !poly) return null;
  const sx = img.width / sw, sy = img.height / sh, pad = 4;
  const xs = poly.map(p => p[0] * sx), ys = poly.map(p => p[1] * sy);
  const x0 = Math.floor(Math.min(...xs)) - pad, y0 = Math.floor(Math.min(...ys)) - pad;
  const w = Math.ceil(Math.max(...xs)) + pad - x0, h = Math.ceil(Math.max(...ys)) + pad - y0;
  const c = canvas(w, h, g => {
    g.filter = 'blur(1.5px)'; g.fillStyle = '#000'; g.beginPath();
    xs.forEach((x, k) => k ? g.lineTo(x - x0, ys[k] - y0) : g.moveTo(x - x0, ys[k] - y0)); g.closePath(); g.fill();
    g.filter = 'none'; g.globalCompositeOperation = 'source-in'; g.drawImage(img, -x0, -y0);
  });
  return { c, x: x0 / sx, y: y0 / sy, w: w / sx, h: h / sy };
}
export function drawHold(g, h) { if (h) g.drawImage(h.c, h.x, h.y, h.w, h.h); }

// The parts of a clip that live, over its still plate (everything else stays exactly the painting, so
// props never shimmer): each region is a rect in the clip's own pixels, cut from the clip every frame
// through a soft-edged mask (no fade on a side that touches the clip's border).
export function liveRegions(rects, cw, ch, feather = 28) {
  return rects.map(([x, y, w, h]) => ({ x, y, w, h, buf: canvas(w, h), mask: canvas(w, h, g => {
    const l = x > 0 ? feather : -feather, t = y > 0 ? feather : -feather, r = x + w < cw ? feather : -feather, b = y + h < ch ? feather : -feather;
    g.filter = `blur(${feather / 2.5}px)`; g.fillStyle = '#000'; g.fillRect(l, t, w - l - r, h - t - b);
  }) }));
}
export function drawLive(g, clip, regions, dx, dy, dw, dh) {
  const kx = dw / clip.videoWidth, ky = dh / clip.videoHeight;
  for (const r of regions) {
    const b = r.buf.getContext('2d');
    b.globalCompositeOperation = 'copy'; b.drawImage(clip, r.x, r.y, r.w, r.h, 0, 0, r.w, r.h);
    b.globalCompositeOperation = 'destination-in'; b.drawImage(r.mask, 0, 0);
    g.drawImage(r.buf, dx + r.x * kx, dy + r.y * ky, r.w * kx, r.h * ky);
  }
}

// After each frame: any clip that was not drawn stops decoding.
export function settleClips(clips) {
  for (const v of Object.values(clips || {})) {
    if (!v._used && !v.paused) v.pause();
    v._used = false;
  }
}
