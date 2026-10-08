import { clipAt, liveRegions, drawLive } from './opening2d-clips.js';
import { PLATE, W0, H0, PI, TAU, C, key, span, bell, mix, rng, fbm, vnoise, canvas, glow, vignette, flat, rain, leaf, spray, grain, sprite, EASE } from './opening2d-art.js';

// The illustrated opening's shots. Each beat is one continuous little world with its own clock T;
// cuts inside a beat are camera jumps, so props, light and paper keep their state across them.
// Everything is a pure function of T (scrubbable).
const flashCurve = t => t < 0 ? 0 : t < .06 ? t / .06 : t < .14 ? 1 - (t - .06) * 7 : t < .22 ? .45 + (t - .14) * 5 : Math.max(0, .85 - (t - .22) * 1.9);
function camera(g, focus, zoom, rot = 0) { g.translate(W0 / 2, H0 / 2); g.rotate(rot); g.scale(zoom, zoom); g.translate(-focus[0], -focus[1]); }
function shotAt(shots, T) { for (let i = 0; i < shots.length; i++) if (T < shots[i].until) return i; return shots.length - 1; }

// ================================================================= 1. THE MESSAGE
// A rented room's desk at night, seen from above. Lamp to the upper left; the rain stays outside the
// window glass at the top of the frame. Aren's hand brings the envelope into the light, turns it,
// rests beside his name, draws out the note; the note opens itself; a phrase is underlined in the
// knock rhythm; lightning whites the frame.
export function buildMessage(S) {
  const EW = 500, ES = EW / 640;                        // envelope: 640 canvas units wide
  const NW = 560, NS = NW / 768, NH3 = 220 * NS;         // note: 768 × 660 canvas units, in thirds
  const HS = 1.3;                                        // hand: desk px per canvas unit
  // The desk, painted once: long planks of dark teak, grain, a few knots and scratches.
  const wood = canvas(2300, 1300, (c, W, H) => {
    const r = rng(11);
    const base = c.createLinearGradient(0, 0, W, H); base.addColorStop(0, '#4d2d1c'); base.addColorStop(1, '#2e1a10');
    c.fillStyle = base; c.fillRect(0, 0, W, H);
    for (let p = 0; p < 7; p++) {
      const y0 = p * 200 - 30, tint = r();
      c.fillStyle = `rgba(${tint > .5 ? '90,56,36' : '20,12,8'},${.12 + r() * .12})`; c.fillRect(0, y0, W, 200);
      for (let i = 0; i < 38; i++) {
        const y = y0 + r() * 200, a = .05 + r() * .12, w = .8 + r() * 2.4;
        c.strokeStyle = `rgba(${r() < .6 ? '18,10,6' : '120,80,52'},${a})`; c.lineWidth = w; c.beginPath(); c.moveTo(0, y);
        for (let x = 0; x <= W; x += 40) c.lineTo(x, y + Math.sin(x * .004 + i + p) * 6 + (fbm(x * .003 + i, p) - .5) * 18);
        c.stroke();
      }
      c.fillStyle = 'rgba(8,4,2,.6)'; c.fillRect(0, y0 + 197, W, 4);                      // plank seam
      for (let k = 0; k < 2; k++) { const kx = r() * W, ky = y0 + 40 + r() * 120; c.strokeStyle = 'rgba(15,8,5,.35)'; c.lineWidth = 2; for (let j = 0; j < 4; j++) { c.beginPath(); c.ellipse(kx, ky, 18 + j * 9, 6 + j * 3, 0, 0, TAU); c.stroke(); } }
    }
    for (let i = 0; i < 80; i++) { c.strokeStyle = `rgba(200,160,120,${.03 + r() * .05})`; c.lineWidth = 1; c.beginPath(); const x = r() * W, y = r() * H; c.moveTo(x, y); c.lineTo(x + (r() - .5) * 90, y + (r() - .5) * 20); c.stroke(); }
  });
  const WOOD = [-250, 180];                              // wood canvas origin in desk space
  // Step 13B: the painted desk (plate 'desk') covers this world rect; 1c, a close shot, uses its soft copy.
  const P = S.P || {}, DESK = { x: 20, y: -45, w: 1680, h: 1050 };
  const PANES = [[-400, 176], [204, 786], [814, 1396], [1424, 2000]].flatMap(([a, b]) => [[a, -200, b - a, 230], [a, 52, b - a, 128]]);
  // The painted window's glass (design space, measured on the desk plate): above the sill, between its two mullions.
  const PANES_PAINTED = [[110, 602], [652, 1390], [1425, 1760]].map(([a, b]) => [a, -200, b - a, 316]);
  // Where the desk's clip lives (its own pixels, 1280x800): the window and the rain beyond it, and the
  // steam over the chai. The rest of the desk (coins, notebook, lamp, grain) stays the painting.
  const DESK_LIVE = liveRegions([[60, 0, 1220, 132], [856, 60, 222, 262]], 1280, 800);
  const drips = Array.from({ length: 16 }, (_, i) => ({ x: 200 + i * 83 + (i * 37 % 29), v: 30 + (i * 13 % 17) * 3, l: 60 + (i * 23 % 40), ph: (i * .37) % 1 }));
  const beads = Array.from({ length: 70 }, (_, i) => { const r = rng(i + 3); return [r() * 1700 - 50, -120 + r() * 290, 1.5 + r() * 3.5]; });
  const sliders = Array.from({ length: 9 }, (_, i) => ({ x: 120 + i * 175 + (i * 41 % 60), v: 22 + (i * 7 % 5) * 9, ph: (i * .29) % 1 }));
  const CAM = [
    { until: 3.05, focus: [[0, [860, 475]], [3.05, [885, 548]]], zoom: [[0, 1.0], [3.05, 1.1]] },
    { until: 7.2, focus: [[3.05, [805, 468]], [7.2, [800, 478]]], zoom: [[3.05, 1.42], [7.2, 1.52]] },
    { until: 99, focus: [[7.2, [792, 508]], [10.4, [806, 522]]], zoom: [[7.2, 2.25], [10.4, 2.5]] }
  ];
  const ENV = { x: [[0, 1950], [.45, 1950], [1.25, 830, 'out3']], y: [[0, 730], [1.25, 700]], r: [[0, -.3], [1.25, -.07, 'out3']], flip: [[1.45, 0], [2.1, PI]], lift: [[1.45, 0], [1.74, 1, 'out'], [2.1, 0, 'in']] };
  const HAND = {
    tip: [[0, [2150, 1260]], [.4, [2150, 1260]], [1.25, [1070, 732], 'out3'], [1.42, [1066, 758]], [1.74, [1058, 694], 'out'], [2.1, [1050, 708], 'in'], [2.45, [905, 790], 's'],
      [3.0, [902, 792]], [3.22, [842, 580], 's'], [3.6, [834, 392], 'out'], [4.35, [1700, 1240], 'in']],
    rot: [[0, .7], [1.25, .62], [2.45, .48], [3.0, .5], [3.22, .95], [3.6, 1.02], [4.35, .7]],
    pinch: [[1.4, 2.12], [3.18, 3.62]]
  };
  const NOTE = { x: [[3.18, 826], [3.6, 800, 'out']], y: [[3.18, 640], [3.6, 470, 'out']], r: [[3.18, -.07], [3.6, -.035]] };
  const FOLD_T = [[3.6, PI], [4.1, 0, 'out3']], FOLD_B = [[4.05, PI], [4.6, 0, 'out3']];
  const RULE = [[7.48, -227, -170, .16], [7.82, -160, -103, .16], [8.16, -93, -36, .16], [8.98, 20, 230, .34]];   // three strokes, a pause, one

  function drawWindow(g, T, f) {
    g.save(); g.beginPath(); g.rect(-400, -200, 2400, 380); g.clip();
    const sky = g.createLinearGradient(0, -200, 0, 180); sky.addColorStop(0, '#0b141b'); sky.addColorStop(1, '#1a2a33');
    g.fillStyle = sky; g.fillRect(-400, -200, 2400, 380);
    g.fillStyle = '#0a1116'; g.beginPath(); g.moveTo(-400, 180); for (let x = -400; x <= 2000; x += 60) g.lineTo(x, 90 + fbm(x * .004, 4) * 70); g.lineTo(2000, 180); g.fill();
    for (const [x, y] of [[420, 128], [470, 136], [1320, 118]]) glow(g, x, y, 26, 'rgba(255,190,110,.9)', .7);
    rain(g, T, { x0: -400, y0: -200, x1: 2000, y1: 180, n: 150, len: 38, speed: 900, angle: .1, width: 1.1, alpha: .28 + f * .4, seed: 5 });   // outside the glass
    if (f > 0) flat(g, '#dfe9f6', f * .55, 'screen');
    glow(g, 260, 20, 190, 'rgba(255,200,130,.5)', .35);                                                             // the lamp in the glass
    g.fillStyle = 'rgba(210,225,235,.22)'; for (const [x, y, s] of beads) { g.beginPath(); g.arc(x, y, s, 0, TAU); g.fill(); }
    g.strokeStyle = 'rgba(210,225,235,.26)'; g.lineWidth = 2.2; g.lineCap = 'round';
    for (const d of sliders) { const y = -200 + ((d.ph * 380 + T * d.v) % 380); g.beginPath(); g.moveTo(d.x, y - 70); g.quadraticCurveTo(d.x + 3, y - 30, d.x, y); g.stroke(); g.beginPath(); g.arc(d.x, y, 4, 0, TAU); g.fillStyle = 'rgba(225,235,242,.35)'; g.fill(); }
    g.restore();
    // Frame: mullions, transom, sill.
    g.fillStyle = C.teakDark; for (const x of [190, 800, 1410]) g.fillRect(x - 14, -200, 28, 385); g.fillRect(-400, 30, 2400, 22);
    g.fillStyle = '#4a2e1d'; g.fillRect(-400, 180, 2400, 45); g.fillStyle = 'rgba(255,210,150,.18)'; g.fillRect(-400, 180, 2400, 5);
    g.fillStyle = 'rgba(0,0,0,.5)'; g.fillRect(-400, 225, 2400, 10);
  }
  function drawGlass(g, T, f) {
    // Rain stays outside: it runs down the panes of the painted window, and the lightning shows in them.
    g.save(); g.beginPath(); for (const [x, y, w, h] of (P.desk && !PLATE.on ? PANES_PAINTED : PANES)) g.rect(x, y, w, h); g.clip();
    rain(g, T, { x0: -400, y0: -200, x1: 2000, y1: 180, n: 150, len: 38, speed: 900, angle: .1, width: 1.1, alpha: .22 + f * .4, seed: 5 });
    if (f > 0) flat(g, '#dfe9f6', f * .5, 'screen');
    g.fillStyle = 'rgba(210,225,235,.16)'; for (const [x, y, s] of beads) { g.beginPath(); g.arc(x, y, s, 0, TAU); g.fill(); }
    g.strokeStyle = 'rgba(210,225,235,.22)'; g.lineWidth = 2.2; g.lineCap = 'round';
    for (const d of sliders) { const y = -200 + ((d.ph * 380 + T * d.v) % 380); g.beginPath(); g.moveTo(d.x, y - 70); g.quadraticCurveTo(d.x + 3, y - 30, d.x, y); g.stroke(); }
    g.restore();
  }
  function drawLight(g, T, f) {
    // The lightning flares the window's light across the painted desk.
    if (f > 0) { g.save(); g.globalCompositeOperation = 'screen'; g.fillStyle = `rgba(140,175,215,${f * .45})`; g.beginPath(); g.moveTo(180, 230); g.lineTo(1500, 230); g.lineTo(1720, 780); g.lineTo(330, 780); g.closePath(); g.fill(); g.restore(); }
  }
  function drawSteam(g, T) {
    const cx = 1240, cy = 352;
    g.save(); g.strokeStyle = 'rgba(235,225,205,.2)'; g.lineWidth = 7; g.lineCap = 'round';
    for (let k = 0; k < 3; k++) { const ph = (T * .35 + k / 3) % 1, a = Math.sin(ph * PI); g.globalAlpha = a; g.beginPath(); const y0 = cy - 20 - ph * 120; g.moveTo(cx + (k - 1) * 14, cy - 10); g.bezierCurveTo(cx + (k - 1) * 14 + Math.sin(T * 1.3 + k) * 26, y0 + 40, cx + (k - 1) * 14 - Math.sin(T * 1.1 + k) * 30, y0 + 10, cx + (k - 1) * 10 + Math.sin(T + k) * 20, y0 - 40); g.stroke(); }
    g.restore();
  }
  function drawMoonlight(g, T, f) {
    // The window laid across the desk in cool light, the rain's runnels crawling down it.
    g.save(); g.globalCompositeOperation = 'screen';
    g.fillStyle = `rgba(140,175,215,${.1 + f * .5})`;
    g.beginPath(); g.moveTo(180, 230); g.lineTo(1500, 230); g.lineTo(1720, 780); g.lineTo(330, 780); g.closePath(); g.fill();
    g.restore();
    g.save(); g.fillStyle = `rgba(0,0,8,${(.35 + f * .2) * .76})`;
    for (const x of [800, 1410]) { g.beginPath(); g.moveTo(x - 14, 230); g.lineTo(x + 14, 230); g.lineTo(x + 14 + (x - 180) * .1 + 60, 780); g.lineTo(x - 14 + (x - 180) * .1 + 60, 780); g.closePath(); g.fill(); }
    g.strokeStyle = `rgba(4,8,20,${(.3 + f * .25) * .71})`; g.lineCap = 'round';
    for (const d of drips) { const y = 230 + ((d.ph * 560 + T * d.v) % 560); if (y > 780) continue; const x = d.x + (y - 230) * .28; g.lineWidth = 3; g.beginPath(); g.moveTo(x, y - d.l); g.lineTo(x + 2, y); g.stroke(); g.beginPath(); g.arc(x + 2, y, 4.5, 0, TAU); g.fillStyle = g.strokeStyle; g.fill(); }
    g.restore();
  }
  function drawProps(g, T) {
    // Ticket, coins, Aren's notebook and pencil, a glass of chai with its steam.
    sprite(g, S.ticket, 420, 815, 150, { rot: -.25 });
    for (const [x, y] of [[585, 918], [628, 944]]) { g.fillStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.ellipse(x + 5, y + 6, 26, 26, 0, 0, TAU); g.fill(); g.fillStyle = C.brass; g.beginPath(); g.arc(x, y, 26, 0, TAU); g.fill(); g.strokeStyle = '#8a6a33'; g.lineWidth = 3; g.beginPath(); g.arc(x, y, 19, 0, TAU); g.stroke(); }
    g.save(); g.translate(1370, 850); g.rotate(.16);
    g.fillStyle = 'rgba(0,0,0,.4)'; g.fillRect(-150 + 12, -200 + 16, 300, 400);
    g.fillStyle = '#e9dfc6'; g.fillRect(-150, -200, 300, 400); g.fillStyle = '#7a5236'; g.fillRect(-150, -200, 34, 400);
    g.strokeStyle = C.ink; g.lineWidth = 3; g.strokeRect(-150, -200, 300, 400);
    g.fillStyle = 'rgba(80,60,40,.25)'; for (let i = 0; i < 6; i++) g.fillRect(-90, -130 + i * 38, 190 - (i % 3) * 30, 3);
    g.save(); g.rotate(.55); g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(-150 + 8, -12 + 10, 300, 22); g.fillStyle = '#d9a940'; g.fillRect(-150, -12, 280, 22); g.fillStyle = '#e8c9a4'; g.beginPath(); g.moveTo(130, -12); g.lineTo(160, -1); g.lineTo(130, 10); g.fill(); g.fillStyle = C.ink; g.beginPath(); g.moveTo(152, -4); g.lineTo(160, -1); g.lineTo(152, 3); g.fill(); g.fillStyle = '#c96a5a'; g.fillRect(-160, -12, 14, 22); g.restore();
    g.restore();
    const cx = 1240, cy = 352;
    g.fillStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.ellipse(cx + 12, cy + 16, 78, 50, 0, 0, TAU); g.fill();
    g.fillStyle = '#c9b89a'; g.beginPath(); g.ellipse(cx, cy, 78, 50, 0, 0, TAU); g.fill(); g.strokeStyle = C.ink; g.lineWidth = 3; g.stroke();
    g.fillStyle = 'rgba(210,225,230,.45)'; g.beginPath(); g.ellipse(cx, cy - 4, 46, 30, 0, 0, TAU); g.fill(); g.stroke();
    g.fillStyle = '#9c5b2a'; g.beginPath(); g.ellipse(cx, cy - 4, 38, 24, 0, 0, TAU); g.fill();
    g.fillStyle = 'rgba(255,230,190,.5)'; g.beginPath(); g.ellipse(cx - 12, cy - 12, 12, 5, -.3, 0, TAU); g.fill();
    g.save(); g.strokeStyle = 'rgba(235,225,205,.22)'; g.lineWidth = 7; g.lineCap = 'round';
    for (let k = 0; k < 3; k++) { const ph = (T * .35 + k / 3) % 1, a = Math.sin(ph * PI); g.globalAlpha = a; g.beginPath(); const y0 = cy - 20 - ph * 120; g.moveTo(cx + (k - 1) * 14, cy - 10); g.bezierCurveTo(cx + (k - 1) * 14 + Math.sin(T * 1.3 + k) * 26, y0 + 40, cx + (k - 1) * 14 - Math.sin(T * 1.1 + k) * 30, y0 + 10, cx + (k - 1) * 10 + Math.sin(T + k) * 20, y0 - 40); g.stroke(); }
    g.restore();
  }
  function drawEnvelope(g, T) {
    const x = key(ENV.x, T), y = key(ENV.y, T), r = key(ENV.r, T), phi = key(ENV.flip, T), lift = key(ENV.lift, T), c = Math.cos(phi);
    g.save(); g.translate(x + 14 + lift * 24, y + 16 + lift * 30); g.rotate(r); g.globalAlpha = .55 - lift * .2;
    const sw = EW + 60 + lift * 40, shh = 250 * Math.abs(c) + 60 + lift * 40; g.drawImage(S.soft, -sw / 2, -shh / 2, sw, shh); g.restore();
    g.save(); g.translate(x, y - lift * 20); g.rotate(r); const s = 1 + lift * .07; g.scale(s, s * c);
    if (c >= 0) g.drawImage(S.envBack, -EW / 2, -125, EW, 250);
    else { g.scale(1, -1); g.drawImage(S.envFront, -EW / 2, -125, EW, 250); }
    const edge = 1 - Math.abs(c); if (edge > 0) { g.fillStyle = `rgba(30,20,12,${edge * .55})`; g.fillRect(-EW / 2, -125, EW, 250); }
    g.restore();
  }
  function drawNote(g, T) {
    if (T < 3.18) return;
    const x = key(NOTE.x, T), y = key(NOTE.y, T), r = key(NOTE.r, T);
    const breathe = T > 4.6 ? Math.sin(T * 2.1) * .05 + Math.sin(T * 3.3) * .02 : 0;
    const th = key(FOLD_T, T) + Math.max(0, breathe), tb = key(FOLD_B, T) + Math.max(0, -breathe);
    g.save(); g.translate(x, y); g.rotate(r);
    // Shadow under the paper; stronger under a panel while it is lifted.
    { const openT = Math.cos(th), openB = Math.cos(tb), top = -NH3 / 2 - Math.max(0, openT) * NH3, bot = NH3 / 2 + Math.max(0, openB) * NH3;
      g.save(); g.globalAlpha = .55; g.drawImage(S.soft, -NW / 2 - 20, top - 16, NW + 60, bot - top + 60); g.restore(); }
    const slice = (i, face, y0) => g.drawImage(face ? S.note : S.noteBack, 0, i * 440, 1536, 440, -NW / 2, y0, NW, NH3);
    const shade = (sn, y0) => { if (sn > .01) { g.fillStyle = `rgba(40,28,16,${sn * .32})`; g.fillRect(-NW / 2, y0, NW, NH3); } };
    slice(1, true, -NH3 / 2);                                                              // middle third
    { const c = Math.cos(tb), sn = Math.sin(tb);                                           // bottom third, lower crease
      g.save(); g.translate(0, NH3 / 2); g.scale(1 + sn * .05, c); slice(2, c > 0, 0); shade(sn, 0); g.restore(); }
    { const c = Math.cos(th), sn = Math.sin(th);                                           // top third, upper crease
      g.save(); g.translate(0, -NH3 / 2); g.scale(1 + sn * .05, -c); g.scale(1, -1); slice(0, c > 0, -NH3); shade(sn, -NH3); g.restore(); }
    // The phrase underlined in the knock rhythm (1c).
    g.strokeStyle = 'rgba(30,40,60,.85)'; g.lineWidth = 3.2; g.lineCap = 'round';
    for (const [t0, a, b, d] of RULE) { const k = EASE.out(span(T, t0, t0 + d)); if (k <= 0) continue; g.beginPath(); g.moveTo(a, 50); g.lineTo(a + (b - a) * k, 50 + Math.sin(k * 3) * 1.2); g.stroke(); }
    g.restore();
  }
  function drawHand(g, T) {
    if (T > 4.35 || T < .35) return;
    const [tx, ty] = key(HAND.tip, T), rot = key(HAND.rot, T), pinch = HAND.pinch.some(([a, b]) => T >= a && T < b);
    const img = pinch ? S.handPinch : S.hand, sh = pinch ? S.handPinchShadow : S.handShadow;
    const lift = key(ENV.lift, T);
    const w = 768 * HS, h = 256 * HS, ax = 16 * HS, ay = 134 * HS;
    g.save(); g.translate(tx + 20 + lift * 26, ty + 26 + lift * 30); g.rotate(rot); g.globalAlpha = .45;
    const pad = sh.pad * HS / 2; g.drawImage(sh, -ax - pad, -ay - pad, w + pad * 2, h + pad * 2); g.restore();
    g.save(); g.translate(tx, ty - lift * 22); g.rotate(rot); g.drawImage(img, -ax, -ay, w, h); g.restore();
  }
  return {
    shots: CAM.length,
    draw(g, T, env) {
      const flash = Math.max(flashCurve(T - 9.05), flashCurve(T - 9.75) * 1.1);
      const shot = shotAt(CAM, T), cam = CAM[shot];
      g.save(); camera(g, PLATE.cam?.f || key(cam.focus, T), PLATE.cam?.z || key(cam.zoom, T));
      if (P.desk && !PLATE.on) {
        // 1a lives (the rain beyond the glass, the steam) from its clip; 1b and 1c hold on the painting, 1c softly.
        const clip = shot === 0 && clipAt(S.clips?.desk, T, S.env?.paused);
        g.drawImage(shot === 2 && P.deskSoft ? P.deskSoft : P.desk, DESK.x, DESK.y, DESK.w, DESK.h);
        if (clip) drawLive(g, clip, DESK_LIVE, DESK.x, DESK.y, DESK.w, DESK.h);
        drawLight(g, T, flash);
        if (!clip) drawSteam(g, T);
      } else {
        g.drawImage(wood, WOOD[0], WOOD[1]);
        drawMoonlight(g, T, flash);
        drawProps(g, T);
      }
      const noteUnder = T < 3.6;
      if (noteUnder) drawNote(g, T);
      drawEnvelope(g, T);
      if (!noteUnder) drawNote(g, T);
      drawHand(g, T);
      if (P.desk && !PLATE.on) drawGlass(g, T, flash);
      else {
        drawWindow(g, T, flash);
        glow(g, 180, 330, 1300, 'rgba(255,196,110,1)', .5, 'screen');
        glow(g, 260, 420, 620, 'rgba(255,214,150,1)', .3, 'screen');
      }
      g.restore();
      // Warm lamp from the left, cool night to the right, the white of the lightning.
      if (!PLATE.on) { g.save(); const side = g.createLinearGradient(0, 0, W0, 0); side.addColorStop(0, 'rgba(216,120,20,.06)'); side.addColorStop(.35, 'rgba(16,4,0,.14)'); side.addColorStop(1, 'rgba(8,14,34,.37)'); g.fillStyle = side; g.fillRect(0, 0, W0, H0); g.restore(); }
      vignette(g, .62);
      flat(g, '#e8eef7', flash * .35, 'screen');
      flat(g, '#eef2f7', key([[9.9, 0], [10.15, .8, 'out'], [10.4, 1, 'in']], T));
      grain(g, env.grain, .16, T);
    }
  };
}
