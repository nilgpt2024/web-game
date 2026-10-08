import { clipAt, drawHold } from './opening2d-clips.js';
import { PLATE, W0, H0, PI, TAU, C, key, span, bell, mix, rng, fbm, vnoise, canvas, glow, vignette, flat, rain, leaf, spray, grain, sprite, EASE } from './opening2d-art.js';

// Beats 2–4 of the illustrated opening. Same rules as beat 1: one continuous little world per beat,
// cuts are camera jumps, everything is a pure function of the beat's clock T.
const flashCurve = t => t < 0 ? 0 : t < .06 ? t / .06 : t < .14 ? 1 - (t - .06) * 7 : t < .22 ? .45 + (t - .14) * 5 : Math.max(0, .85 - (t - .22) * 1.9);
const shotOf = (cuts, T) => { let i = 0; while (i < cuts.length && T >= cuts[i]) i++; return i; };
// Step 13B: an insert shown as a printed photograph laid over the running shot (the sign on the ghat road,
// the dark window over Cedar House): it slides in from one side, settles at a tilt, casts a shadow, and
// the shot underneath keeps moving. `paint(g)` draws the insert's full frame; it is scaled into the print.
function insertPanel(g, soft, T, t0, from, { x, y, w, h, rot }, paint) {
  const k = EASE.out(span(T, t0, t0 + .42)), dx = (1 - k) * from * 900, r = rot + (1 - k) * from * .05, b = 16;
  g.save(); g.translate(x + w / 2 + dx, y + h / 2); g.rotate(r);
  g.globalAlpha = .6 * k; g.drawImage(soft, -w / 2 - 40, -h / 2 - 16, w + 110, h + 96); g.globalAlpha = 1;
  g.fillStyle = '#e8dbbb'; g.fillRect(-w / 2 - b, -h / 2 - b, w + b * 2, h + b * 2);
  g.fillStyle = 'rgba(120,95,60,.22)'; g.fillRect(-w / 2 - b, h / 2 + b - 3, w + b * 2, 3);
  g.save(); g.beginPath(); g.rect(-w / 2, -h / 2, w, h); g.clip(); g.translate(-w / 2, -h / 2); g.scale(w / W0, h / H0); paint(g); g.restore();
  g.strokeStyle = 'rgba(30,24,18,.5)'; g.lineWidth = 1.5; g.strokeRect(-w / 2, -h / 2, w, h);
  g.restore();
}
const rr = (g, x, y, w, h, r) => { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); };
function lerpColor(a, b, k) { const pa = a.match(/\w\w/g).map(h => parseInt(h, 16)), pb = b.match(/\w\w/g).map(h => parseInt(h, 16)); return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * k)).join(',')})`; }

// ================================================================= 2. TRAVEL
// A second-class carriage at night. Aren by the window with his notebook: the carriage rocks him,
// a platform lamp slides light across him, he blinks. Over his shoulder: his reflection over the
// hills, a green signal, poles in the knock rhythm. Through the glass: the tunnel mouth, black.
export function buildTravel(S) {
  const SPEED = 520;
  // The seat facing him, out of focus in the foreground (painted once, blurred once).
  const seat = canvas(1400, 460, (c) => { c.filter = 'blur(7px)'; c.translate(50, 50); rr(c, 10, 34, 1300, 360, 60); c.fillStyle = '#152219'; c.fill(); c.fillStyle = '#3d2a1e'; rr(c, 0, 20, 1320, 40, 18); c.fill(); });
  // The land outside, in a glass rect: sky, three silhouette layers, poles and wires, all scrolling.
  function land(g, T, x0, y0, w, h, k, flash = 0) {
    g.save(); g.beginPath(); g.rect(x0, y0, w, h); g.clip();
    const sky = g.createLinearGradient(0, y0, 0, y0 + h); sky.addColorStop(0, '#15242e'); sky.addColorStop(.55, '#2d4a52'); sky.addColorStop(1, '#172529');
    g.fillStyle = sky; g.fillRect(x0, y0, w, h);
    glow(g, x0 + w * .74, y0 + h * .2, 260 * k, 'rgba(190,212,218,1)', .16 + flash * .5);
    const layer = (base, amp, freq, par, color, bumps = 0) => {
      const off = T * SPEED * par;
      g.fillStyle = color; g.beginPath(); g.moveTo(x0, y0 + h);
      for (let x = x0; x <= x0 + w + 16; x += 12) {
        const wx = (x - x0) / k - off;
        let y = base + amp * fbm(wx * freq, par * 10);
        if (bumps) y -= bumps * Math.abs(Math.sin(wx * .045)) * (.6 + .4 * vnoise(wx * .02, 3));
        g.lineTo(x, y0 + h * y);
      }
      g.lineTo(x0 + w, y0 + h); g.closePath(); g.fill();
    };
    layer(.42, .16, .004, .06, flash ? lerpColor('#1a2c31', '#6d8791', flash) : '#1a2c31');
    layer(.56, .14, .007, .22, '#12222a', .05);
    layer(.76, .12, .012, .8, '#0a1417', .07);
    // Telegraph poles and their sagging wires, near and fast.
    const gap = 520, off = (T * SPEED * 1.5) % gap;
    g.strokeStyle = '#070d10'; g.fillStyle = '#070d10';
    for (let px = x0 - gap + off * k; px < x0 + w + gap; px += gap * k) {
      g.fillRect(px - 9 * k, y0 + h * .12, 18 * k, h); g.fillRect(px - 60 * k, y0 + h * .16, 120 * k, 9 * k);
      g.lineWidth = 2 * k; for (const dy of [.16, .19]) { g.beginPath(); g.moveTo(px, y0 + h * dy); g.quadraticCurveTo(px + gap * k / 2, y0 + h * (dy + .06), px + gap * k, y0 + h * dy); g.stroke(); }
    }
    g.restore();
  }
  function glassRain(g, T, x0, y0, w, h, k) {
    g.save(); g.beginPath(); g.rect(x0, y0, w, h); g.clip();
    rain(g, T, { x0, y0, x1: x0 + w, y1: y0 + h, n: 90, len: 70 * k, speed: 520, angle: .95, width: 2 * k, color: '200,220,230', alpha: .22, seed: 8 });   // swept back by the speed
    const r = rng(12); g.fillStyle = 'rgba(210,228,236,.22)';
    for (let i = 0; i < 70; i++) { g.beginPath(); g.arc(x0 + r() * w, y0 + r() * h, (1.5 + r() * 3) * k, 0, TAU); g.fill(); }
    g.restore();
  }
  function sway(g, T) { g.translate(800, 1000); g.rotate(.0045 * Math.sin(T * 2.1)); g.translate(-800, -1000 + 3 * Math.sin(T * 7.7) + (Math.sin(T * 17.3) > .96 ? 2.5 : 0)); }

  // Step 13B: the painted carriage and land (plates 'carriage', 'carriageFront', 'window-frame' and the
  // three land layers). The land drifts in the same parallax as before: sky and far ridges barely, the
  // forested hills slowly, the near trees fast; the poles and wires are still drawn.
  const PL = S.P || {};
  const painted = () => !PLATE.on && PL.carriage && PL.carriageFront;
  function strip(g, img, x0, y0, w, h, band, off) {
    const hh = h * band, ww = img.width * hh / img.height, o = ((off % ww) + ww) % ww;
    for (let x = x0 - o; x < x0 + w; x += ww) g.drawImage(img, x, y0 + h - hh, ww + 1, hh);
  }
  function landPainted(g, T, x0, y0, w, h, k) {
    if (!(PL.landFar && PL.landMid && PL.landNear)) { land(g, T, x0, y0, w, h, k); return; }
    g.save(); g.beginPath(); g.rect(x0, y0, w, h); g.clip();
    const far = PL.landFar, fw = far.width * h / far.height;
    g.drawImage(far, x0 - Math.min(fw - w, T * SPEED * .06 * k), y0, fw, h);
    strip(g, PL.landMid, x0, y0, w, h, .62, T * SPEED * .22 * k);
    strip(g, PL.landNear, x0, y0, w, h, .36, T * SPEED * .8 * k);
    const gap = 520, off = (T * SPEED * 1.5) % gap;
    g.strokeStyle = '#05090b'; g.fillStyle = '#05090b';
    for (let px = x0 - gap + off * k; px < x0 + w + gap; px += gap * k) {
      g.fillRect(px - 9 * k, y0 + h * .12, 18 * k, h); g.fillRect(px - 60 * k, y0 + h * .16, 120 * k, 9 * k);
      g.lineWidth = 2 * k; for (const dy of [.16, .19]) { g.beginPath(); g.moveTo(px, y0 + h * dy); g.quadraticCurveTo(px + gap * k / 2, y0 + h * (dy + .06), px + gap * k, y0 + h * dy); g.stroke(); }
    }
    g.restore();
  }
  const cover = (g, img) => g.drawImage(img, -16, -10, W0 + 32, H0 + 20);          // a touch over the frame, for the carriage's sway
  // The travel beat has no clips: image-to-video could animate the weather outside a train window but not
  // the train's speed (the land stayed put), so the land keeps running past in code, in parallax.
  function paintedA(g, T) {
    const light = bell(T, 1.95, 3.05);
    g.save(); sway(g, T);
    landPainted(g, T, 128, 178, 724, 514, 1);
    glow(g, key([[1.95, -200], [3.05, 1100]], T), 480, 180, 'rgba(255,205,140,1)', light * .9);
    glassRain(g, T, 128, 178, 724, 514, 1);
    cover(g, PL.carriage);
    // The bare bulb's light breathes and catches, as a lamp does on a running train.
    const fl = .8 + .2 * Math.sin(T * 19) * Math.sin(T * 7.3 + 1) - (Math.sin(T * 41) > .97 ? .3 : 0);
    glow(g, 1467, 99, 190, 'rgba(255,214,150,1)', .2 * fl, 'screen');
    const blink = (T > 1.05 && T < 1.17) || (T > 3.2 && T < 3.32), looks = T > 2.2 && T < 3.05;
    const A = S.aren, lit = k => A[k + 'Car'] || A[k];
    g.save(); g.globalAlpha = .42; g.drawImage(S.soft, 1030, 1000, 340, 90); g.restore();           // where he sits
    // Breathing, from the seat up; a passenger's lag behind the carriage's roll (its sway, a beat late); and
    // his reading posture: bent a little over the notebook, straightening as the lamp makes him look up.
    const up = EASE.s(span(T, 2.05, 2.3)) * (1 - EASE.s(span(T, 3.0, 3.35)));
    const br = 1 + .007 * Math.sin(T * 1.7), lean = -.0035 * Math.sin((T - .3) * 2.1) - .009 * (1 - up);
    g.save(); g.translate(1190, 1122); g.rotate(lean); g.scale(1, br); g.translate(-1190, -1122);
    sprite(g, lit(looks ? 'surprised' : 'thinking'), 1190, 262, 860, { ay: 0, flip: true });
    if (blink) sprite(g, lit('thinkingBlink'), 1190, 262, 860, { ay: 0, flip: true });
    g.restore();
    cover(g, PL.carriageFront);
    g.restore();
    if (light > 0) { g.save(); g.globalCompositeOperation = 'screen'; const x = key([[1.95, -400], [3.05, 2000]], T); const band = g.createLinearGradient(x - 300, 0, x + 300, 0); band.addColorStop(0, 'rgba(255,190,120,0)'); band.addColorStop(.5, `rgba(255,190,120,${.3 * light})`); band.addColorStop(1, 'rgba(255,190,120,0)'); g.fillStyle = band; g.fillRect(0, 0, W0, H0); g.restore(); }
  }
  function paintedB(g, T) {
    const green = bell(T, 3.95, 4.7), amused = span(T, 5.05, 5.4);
    g.save(); sway(g, T);
    g.fillStyle = '#0d1418'; g.fillRect(-40, -40, W0 + 80, H0 + 80);
    landPainted(g, T, 20, 60, 1660, 1020, 1.9);
    glow(g, key([[3.95, -300], [4.7, 1500]], T), 420, 360, 'rgba(120,255,170,1)', green * .7);
    g.save(); g.globalCompositeOperation = 'screen';
    sprite(g, S.aren.neutralHead, 560, 400, 330, { flip: true, alpha: .26 * (1 - amused) });
    sprite(g, S.aren.amusedHead, 560, 400, 330, { flip: true, alpha: .26 * amused });
    g.restore();
    for (const tk of [4.6, 5.36, 6.12]) { const k = span(T, tk - .11, tk + .11); if (k > 0 && k < 1) { const x = -150 + k * 1900; g.fillStyle = '#05090b'; g.fillRect(x - 45, 60, 90, 1000); g.fillRect(x - 170, 150, 340, 24); } }
    glassRain(g, T, 20, 60, 1660, 1020, 1.7);
    if (PL.frame2b) cover(g, PL.frame2b);
    else { g.fillStyle = '#2d3133'; for (const y of [380, 700]) g.fillRect(50, y, 1600, 20); g.fillStyle = 'rgba(200,210,215,.22)'; for (const y of [380, 700]) g.fillRect(50, y, 1600, 5); g.fillStyle = '#2b1e17'; g.fillRect(-40, -40, 90, H0 + 80); g.fillRect(-40, -40, W0 + 80, 130); }
    g.save(); g.globalCompositeOperation = 'lighter';
    sprite(g, S.rimCool, 1206, 238, 1110, { ay: 0, alpha: .5 });
    if (green > 0) sprite(g, S.rimGreen, 1206, 238, 1110, { ay: 0, alpha: green * .8 });
    g.restore();
    // His back breathes; on "a remarkable confidence" his head turns a little toward the reflection.
    const img = S.aren.rear, hgt = 1100, k = hgt / img.height, x0 = 1212 - img.width * k / 2, y0 = 240, br = 1 + .006 * Math.sin(T * 1.6 + 1);
    const turn = -.055 * EASE.s(span(T, 4.95, 5.55));
    g.save(); g.translate(0, y0 + hgt); g.scale(1, br); g.translate(0, -(y0 + hgt));
    g.drawImage(S.rearBody, x0, y0, S.rearBody.width * k, S.rearBody.height * k);
    g.save(); g.translate(x0 + S.rearNeck[0] * k, y0 + S.rearNeck[1] * k); g.rotate(turn); g.drawImage(S.rearHead, -S.rearNeck[0] * k, -S.rearNeck[1] * k, S.rearHead.width * k, S.rearHead.height * k); g.restore();
    g.restore();
    g.restore();
  }
  function paintedC(g, T) {
    g.save(); sway(g, T);
    landPainted(g, T * 1.25, -40, -40, W0 + 80, H0 + 80, 2.4);
    glassRain(g, T, -40, -40, W0 + 80, H0 + 80, 2.2);
    for (const y of [250, 760]) { g.fillStyle = '#1d2124'; g.fillRect(-40, y, W0 + 80, 26); g.fillStyle = 'rgba(190,205,215,.22)'; g.fillRect(-40, y, W0 + 80, 4); g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(-40, y + 22, W0 + 80, 4); }
    g.restore();
    // The tunnel mouth: its painted portal sweeps in from the left, and its bore swallows the frame.
    if (T > 7.25 && PL.tunnel) {
      // The portal's arch sits at about 40% across its painting; it arrives at the frame's centre as the black falls.
      const sc = 1.6, w = W0 * sc, h = H0 * sc, x = key([[7.25, -w], [7.95, W0 / 2 - w * .4, 'in']], T);
      g.drawImage(PL.tunnel, x, (H0 - h) / 2, w, h);
    }
  }
  // ---- 2a: the compartment
  function shotA(g, T) {
    const light = bell(T, 1.95, 3.05);                                      // a platform lamp goes by
    g.save(); sway(g, T);
    const wall = g.createLinearGradient(0, 0, 0, H0); wall.addColorStop(0, '#1b2621'); wall.addColorStop(1, '#101714'); g.fillStyle = wall; g.fillRect(-40, -40, W0 + 80, H0 + 80);
    g.fillStyle = 'rgba(0,0,0,.25)'; for (let x = 60; x < W0; x += 150) g.fillRect(x, 150, 3, 850);
    g.fillStyle = '#0c110f'; g.fillRect(-40, -40, W0 + 80, 150);                                               // ceiling
    g.strokeStyle = '#3a3c36'; g.lineWidth = 5; for (const y of [96, 118]) { g.beginPath(); g.moveTo(-40, y); g.lineTo(W0 + 40, y); g.stroke(); }   // luggage rack
    g.fillStyle = '#4a2f22'; rr(g, 1180, 40, 180, 56, 8); g.fill(); g.strokeStyle = C.ink; g.lineWidth = 3; g.stroke();   // a suitcase up there
    // Ceiling fan, turning.
    g.save(); g.translate(560, 70); g.fillStyle = '#26292a'; g.fillRect(-5, -40, 10, 30); g.beginPath(); g.ellipse(0, 0, 24, 9, 0, 0, TAU); g.fill();
    for (let b = 0; b < 3; b++) { const a = T * 9 + b * TAU / 3; g.save(); g.scale(1, .32); g.rotate(a); g.fillStyle = '#353a3a'; g.beginPath(); g.ellipse(70, 0, 66, 14, 0, 0, TAU); g.fill(); g.restore(); }
    g.restore();
    glow(g, 1450, 110, 260, 'rgba(255,196,120,1)', .5); g.fillStyle = '#ffe2a8'; g.beginPath(); g.arc(1450, 110, 12, 0, TAU); g.fill();
    // The window: shutter box, frame, the land, rain, bars.
    rr(g, 118, 168, 744, 534, 26); g.fillStyle = '#2b1e17'; g.fill(); g.strokeStyle = C.ink; g.lineWidth = 4; g.stroke();
    land(g, T, 152, 202, 676, 466, 1);
    glow(g, key([[1.95, -200], [3.05, 1100]], T), 480, 180, 'rgba(255,205,140,1)', light * .9);            // the platform lamp outside
    glassRain(g, T, 152, 202, 676, 466, 1);
    g.fillStyle = '#3a2a20'; g.fillRect(152, 202, 676, 64); g.fillStyle = 'rgba(0,0,0,.35)'; for (let y = 214; y < 266; y += 13) g.fillRect(152, y, 676, 4);   // shutter
    for (const y of [330, 440, 550]) { g.fillStyle = '#2d3133'; g.fillRect(152, y, 676, 11); g.fillStyle = 'rgba(200,210,215,.25)'; g.fillRect(152, y, 676, 3); }
    g.fillStyle = '#3b2a1f'; g.fillRect(110, 700, 770, 30); g.fillStyle = 'rgba(255,200,140,.15)'; g.fillRect(110, 700, 770, 4);   // sill ledge
    // The bench behind him: green leatherette, tufted, a teak rail.
    rr(g, 930, 330, 720, 700, 30); g.fillStyle = '#1f3429'; g.fill(); g.strokeStyle = C.ink; g.lineWidth = 4; g.stroke();
    g.fillStyle = 'rgba(0,0,0,.3)'; for (let x = 990; x < 1640; x += 90) for (let y = 400; y < 1000; y += 110) { g.beginPath(); g.arc(x, y, 5, 0, TAU); g.fill(); }
    g.fillStyle = '#3d2a1e'; rr(g, 920, 318, 740, 26, 10); g.fill();
    // Aren, reading; the carriage rocks him; he blinks.
    // Reading; a blink; the lamp's light makes him look up from the notebook; back to it; a blink.
    const blink = (T > 1.05 && T < 1.17) || (T > 3.2 && T < 3.32), looks = T > 2.2 && T < 3.05;
    sprite(g, looks ? S.aren.surprised : S.aren.thinking, 1190, 262, 860, { ay: 0, flip: true });
    if (blink) sprite(g, S.aren.thinkingBlink, 1190, 262, 860, { ay: 0, flip: true });
    // The seat facing him, out of focus in the foreground: it hides where he sits.
    g.drawImage(seat, 500, 736);
    g.restore();
    // The lamp's light slides across the compartment and across him.
    if (light > 0) { g.save(); g.globalCompositeOperation = 'screen'; const x = key([[1.95, -400], [3.05, 2000]], T); const band = g.createLinearGradient(x - 300, 0, x + 300, 0); band.addColorStop(0, 'rgba(255,190,120,0)'); band.addColorStop(.5, `rgba(255,190,120,${.32 * light})`); band.addColorStop(1, 'rgba(255,190,120,0)'); g.fillStyle = band; g.fillRect(0, 0, W0, H0); g.restore(); }
  }
  // ---- 2b: over his shoulder, the glass
  function shotB(g, T) {
    const t = T - 3.6, green = bell(T, 3.95, 4.7);
    g.save(); sway(g, T);
    g.fillStyle = '#2b1e17'; g.fillRect(-40, -40, W0 + 80, H0 + 80);
    land(g, T, 50, 90, 1600, 960, 1.9);
    glow(g, key([[3.95, -300], [4.7, 1500]], T), 420, 360, 'rgba(120,255,170,1)', green * .7);          // a green signal lamp
    // His reflection in the glass: the face he isn't showing us. It warms at "a remarkable confidence".
    const amused = span(T, 5.05, 5.4);
    g.save(); g.globalCompositeOperation = 'screen';
    sprite(g, S.aren.neutralHead, 560, 400, 330, { flip: true, alpha: .26 * (1 - amused) });
    sprite(g, S.aren.amusedHead, 560, 400, 330, { flip: true, alpha: .26 * amused });
    g.restore();
    // Three close poles, a pause: the knock rhythm (the tunnel will be the fourth).
    for (const tk of [4.6, 5.36, 6.12]) { const k = span(T, tk - .11, tk + .11); if (k > 0 && k < 1) { const x = -150 + k * 1900; g.fillStyle = '#05090b'; g.fillRect(x - 45, 60, 90, 1000); g.fillRect(x - 170, 150, 340, 24); } }
    glassRain(g, T, 50, 90, 1600, 960, 1.7);
    g.fillStyle = '#2d3133'; for (const y of [380, 700]) { g.fillRect(50, y, 1600, 20); } g.fillStyle = 'rgba(200,210,215,.22)'; for (const y of [380, 700]) g.fillRect(50, y, 1600, 5);
    g.fillStyle = '#2b1e17'; g.fillRect(-40, -40, 90, H0 + 80); g.fillRect(-40, -40, W0 + 80, 130);
    // Aren from behind, rim-lit by the glass (green when the signal passes).
    g.save(); g.globalCompositeOperation = 'lighter';
    sprite(g, S.rimCool, 1206, 238, 1110, { ay: 0, alpha: .5 });
    if (green > 0) sprite(g, S.rimGreen, 1206, 238, 1110, { ay: 0, alpha: green * .8 });
    g.restore();
    sprite(g, S.aren.rear, 1212, 240, 1100, { ay: 0 });
    g.restore();
  }
  // ---- 2c: the glass itself; then the tunnel
  function shotC(g, T) {
    g.save(); sway(g, T);
    land(g, T * 1.25, -40, -40, W0 + 80, H0 + 80, 2.4);
    glassRain(g, T, -40, -40, W0 + 80, H0 + 80, 2.2);
    g.fillStyle = '#2d3133'; for (const y of [250, 760]) g.fillRect(-40, y, W0 + 80, 26);
    g.restore();
    // The tunnel mouth: dressed stone sliding in from the left, then its bore fills the frame.
    const edge = key([[7.25, -1500], [7.95, 3400, 'in']], T);
    if (edge > -1500) {
      g.save(); g.translate(edge, 0);
      g.fillStyle = '#4a4b47'; g.fillRect(-3400, -40, 3400, H0 + 80);
      g.strokeStyle = 'rgba(20,20,18,.8)'; g.lineWidth = 4; const r = rng(4);
      for (let y = -40; y < H0 + 40; y += 90) for (let x = -3400 + (y / 90 % 2) * 70; x < 0; x += 140 + r() * 30) g.strokeRect(x, y, 140, 90);
      g.fillStyle = '#020303'; g.beginPath(); g.moveTo(-600, H0 + 80); g.lineTo(-600, 380); g.arc(-1700, 380, 1100, 0, PI, true); g.lineTo(-2800, H0 + 80); g.closePath(); g.fill();
      g.restore();
    }
  }
  return {
    draw(g, T, env) {
      const s = shotOf([3.6, 6.6], T);
      if (painted()) { if (s === 0) paintedA(g, T); else if (s === 1) paintedB(g, T); else paintedC(g, T); }
      else if (s === 0) shotA(g, T); else if (s === 1) shotB(g, T); else shotC(g, T);
      vignette(g, .55);
      flat(g, '#eef2f7', key([[0, 1], [.12, .85], [.7, 0, 'out']], T));                 // out of the white of the flash
      flat(g, '#000', key([[7.8, 0], [7.98, 1, 'in']], T));                              // into the tunnel's black
      grain(g, env.grain, .15, T);
    }
  };
}

// ================================================================= 3. THE GHAT ROAD
// The switchback from the valley side. Out of the tunnel's black, headlights; the bus climbs the
// lower leg, its beams across wet asphalt and parapet stones, and finds the sign at the bend. The sign
// close: the beam slides across it. The valley: lightning shows ridge behind ridge, a waterfall, the
// bus's lights far up the road; then leaves rush across the lens.
export function buildGhat(S) {
  const upper = x => 505 - x * .025, lower = x => 742 - x * .02;
  const r0 = rng(31); const stones = Array.from({ length: 70 }, (_, i) => i * 24 + r0() * 4);
  function busAt(g, x, yRoad, len, T, lights, dir = 1) {
    if (PLATE.on) return;
    const s = len / 500, hgt = 200 * s;
    g.save(); g.translate(x, yRoad); if (dir < 0) g.scale(-1, 1);
    g.rotate(-.012 + Math.sin(T * 11) * .004); g.translate(0, Math.abs(Math.sin(T * 13)) * -2);
    g.drawImage(S.bus, 0, -hgt, len, hgt);
    for (const wx of [110, 380]) { g.save(); g.translate(wx * s, (158 - 200) * s); g.fillStyle = '#121414'; g.beginPath(); g.arc(0, 0, 28 * s, 0, TAU); g.fill(); g.rotate(T * 9); g.strokeStyle = '#c9b996'; g.lineWidth = 3 * s; for (let k = 0; k < 4; k++) { g.rotate(PI / 4); g.beginPath(); g.moveTo(-14 * s, 0); g.lineTo(14 * s, 0); g.stroke(); } g.restore(); }
    if (lights > 0) glow(g, 468 * s, (124 - 200) * s, 40 * s + 30 * lights, 'rgba(255,244,210,1)', lights);
    g.restore();
  }
  function beam(g, x0, y0, dir, len, spread, a) {
    if (a <= 0 || PLATE.on) return;
    g.save(); g.globalCompositeOperation = 'lighter';
    const gr = g.createLinearGradient(x0, y0, x0 + dir * len, y0); gr.addColorStop(0, `rgba(255,236,190,${.55 * a})`); gr.addColorStop(1, 'rgba(255,236,190,0)');
    g.fillStyle = gr; g.beginPath(); g.moveTo(x0, y0 - 8); g.lineTo(x0 + dir * len, y0 - spread); g.lineTo(x0 + dir * len, y0 + spread * .9); g.lineTo(x0, y0 + 8); g.closePath(); g.fill();
    g.restore();
  }
  function hills(g, flash) {
    const sky = g.createLinearGradient(0, 0, 0, 520); sky.addColorStop(0, flash ? lerpColor('#0a1319', '#c9d6e2', flash) : '#0a1319'); sky.addColorStop(1, flash ? lerpColor('#16252d', '#eef3f7', flash) : '#16252d');
    g.fillStyle = sky; g.fillRect(-40, -40, W0 + 80, 600);
  }
  // Step 13C: the ghat beat is the code-drawn one (13A): its road and bus, its sign, its valley.
  // Leaves rush across the lens, right to left: covering it (dir 1, end of 3c) or clearing from it (dir -1,
  // start of 4a). The dark side is behind the front edge; a band of leaves rides the edge.
  function leafWipe(g, k, T, dir = 1) {
    if (dir > 0 ? k <= 0 : k >= 1) return;
    const front = dir > 0 ? 2000 - k * 2500 : 800 - k * 2500;
    g.fillStyle = '#060c08';
    if (dir > 0) g.fillRect(front + 120, -40, 4000, H0 + 80); else g.fillRect(front - 4000, -40, 3880, H0 + 80);
    for (let i = 0; i < 6; i++) spray(g, front + (i % 2 ? 60 : -20), 160 + i * 180, PI + .3 - i * .12, 900, 60 + i, { fill: '#0a140e', fill2: '#0f1c13', scale: 1.5, sway: Math.sin(T * 4 + i) * .08 });
  }
  // ---- 3a: the switchback
  function shotA(g, T, env) {
    const lights = key([[0, 0], [.3, 0, 'lin'], [.33, 1, 'lin'], [.38, .2, 'lin'], [.46, 1, 'lin']], T);
    const reveal = span(T, .45, 1.1), bx = key([[0, -460], [3.2, 1180, 'lin']], T);
    g.save(); g.globalAlpha = .35 + .65 * reveal;
    hills(g, 0);
    glow(g, 1100, 170, 520, 'rgba(120,150,170,1)', .22, 'screen');
    g.fillStyle = '#16242b'; g.beginPath(); g.moveTo(-40, 380); for (let x = -40; x <= W0 + 40; x += 40) g.lineTo(x, 250 + fbm(x * .002, 4) * 110); g.lineTo(W0 + 40, 600); g.lineTo(-40, 600); g.fill();
    g.fillStyle = '#101c21'; g.beginPath(); g.moveTo(-40, 360); for (let x = -40; x <= W0 + 40; x += 40) g.lineTo(x, 300 + fbm(x * .003, 5) * 90); g.lineTo(W0 + 40, 700); g.lineTo(-40, 700); g.fill();
    g.fillStyle = '#0c1714'; g.beginPath(); g.moveTo(-40, 470); for (let x = -40; x <= 1560; x += 30) g.lineTo(x, upper(x) - 30 - fbm(x * .01, 6) * 50); g.quadraticCurveTo(1640, 560, 1600, 760); g.lineTo(-40, 760); g.fill();
    g.fillStyle = '#0a130f'; for (let x = -20; x < 1560; x += 46) { const y = upper(x) - 40 - fbm(x * .01, 6) * 50; g.beginPath(); g.ellipse(x, y, 34, 24, 0, 0, TAU); g.fill(); }
    // Upper leg, the bend, the lower leg: wet asphalt with a sheen, lane dashes, parapet stones.
    const road = (fn, y0, y1) => { g.fillStyle = '#1b2226'; g.beginPath(); g.moveTo(-40, fn(-40) + y0); g.lineTo(1500, fn(1500) + y0); g.lineTo(1500, fn(1500) + y1); g.lineTo(-40, fn(-40) + y1); g.fill(); g.strokeStyle = 'rgba(140,170,185,.18)'; g.lineWidth = 3; g.beginPath(); g.moveTo(-40, fn(-40) + y0 + 6); g.lineTo(1500, fn(1500) + y0 + 6); g.stroke(); };
    road(upper, -18, 20); road(lower, -26, 28);
    g.fillStyle = 'rgba(170,195,210,.28)'; for (let i = 0; i < 40; i++) { const x = ((i * 97 + T * 60) % 1540) - 40, y = lower(x) + ((i * 13) % 40) - 18, a = (T * 3 + i * .7) % 1; g.fillRect(x - a * 6, y, 2 + a * 12, 1.5); }   // rain landing on the road
    g.fillStyle = '#1b2226'; g.beginPath(); g.moveTo(1500, upper(1500) - 18); g.bezierCurveTo(1640, upper(1500) - 10, 1650, lower(1500) + 10, 1500, lower(1500) + 28); g.lineTo(1500, lower(1500) - 26); g.bezierCurveTo(1560, lower(1500) - 20, 1560, upper(1500) + 20, 1500, upper(1500) + 20); g.fill();
    const parapet = (fn, dy) => { for (let i = 0; i < stones.length; i++) { const x = stones[i] - 40; if (x > 1490) break; g.fillStyle = i % 2 ? '#cfc8b6' : '#1a1a19'; g.fillRect(x, fn(x) + dy, 16, 14); } };
    parapet(upper, 20); parapet(lower, 28);
    // The sign at the bend, dark until the beams find it.
    const signLit = span(T, 2.55, 3.0);
    g.fillStyle = '#2a1f17'; g.fillRect(1380, 610, 7, 70); g.fillRect(1460, 610, 7, 70);
    g.fillStyle = lerpColor('#141d18', '#2f5540', signLit); g.fillRect(1368, 590, 112, 42); g.strokeStyle = signLit > .3 ? '#d9b86a' : '#2a2a22'; g.lineWidth = 2; g.strokeRect(1372, 594, 104, 34);
    g.restore();
    // The bus and its beams, lit from the black.
    beam(g, bx + 350, lower(bx + 350) - 32, 1, 620, 150, lights);
    if (!PLATE.on) { g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = `rgba(255,230,180,${.18 * lights})`; g.beginPath(); g.ellipse(bx + 640, lower(bx + 640) - 2, 280, 22, -.02, 0, TAU); g.fill();
    for (let i = 0; i < stones.length; i += 2) { const x = stones[i] - 40, d = x - (bx + 350); if (d > 0 && d < 620) { g.fillStyle = `rgba(255,240,210,${.6 * lights * (1 - d / 620)})`; g.fillRect(x, lower(x) + 28, 16, 14); } }
    if (signLit > 0) glow(g, 1424, 611, 110, 'rgba(255,236,190,1)', signLit * .6);
    g.restore(); }
    busAt(g, bx, lower(bx + 180) + 20, 380, T, lights);
    rain(g, T, { n: 170, len: 55, speed: 1500, alpha: .25, seed: 21, angle: .12 });
    // Foreground ferns, swaying.
    for (const [x, a, sd] of [[140, -.9, 41], [1480, -2.3, 42]]) spray(g, x, 1080, a, 320, sd, { sway: Math.sin(T * 1.6 + x) * .05, scale: .9 });
    rain(g, T * 1.3, { n: 60, len: 110, speed: 2200, width: 2.2, alpha: .22, seed: 22, angle: .12 });
  }
  // ---- 3b: the sign, and the beam crossing it
  function signBoard(g, lit) {
    g.save(); g.translate(800, 470);
    g.fillStyle = '#231a13'; g.fillRect(-380, 110, 26, 560); g.fillRect(354, 110, 26, 560);
    rr(g, -440, -160, 880, 300, 12); g.fillStyle = lit ? '#27402f' : '#131a16'; g.fill(); g.strokeStyle = C.ink; g.lineWidth = 6; g.stroke();
    g.strokeStyle = lit ? '#cfae62' : '#2a2a22'; g.lineWidth = 7; g.strokeRect(-412, -132, 824, 244);
    g.fillStyle = lit ? '#efdcaa' : '#2c332c'; g.textAlign = 'center'; g.font = '600 92px Georgia'; g.fillText('CEDAR HOUSE', -20, -18);
    g.font = '40px Georgia'; g.fillStyle = lit ? '#cfae62' : '#262b25'; g.fillText('GUEST HOUSE  ·  1 KM', -20, 64);
    g.font = '110px Georgia'; g.fillStyle = lit ? '#efdcaa' : '#2c332c'; g.fillText('↑', 360, 10);
    g.restore();
  }
  function shotB(g, T) {
    flat(g, '#070c0e');
    g.fillStyle = '#0c1512'; g.beginPath(); g.moveTo(-40, 700); for (let x = -40; x <= W0 + 40; x += 40) g.lineTo(x, 640 + fbm(x * .006, 8) * 80); g.lineTo(W0 + 40, H0 + 40); g.lineTo(-40, H0 + 40); g.fill();
    signBoard(g, false);
    const bx = key([[3.3, 2000], [4.45, -500, 'lin']], T);                        // the beam's centre, sliding right to left
    g.save(); g.beginPath(); g.rect(bx - 260, -40, 520, H0 + 80); g.clip(); signBoard(g, true); g.restore();
    g.save(); g.globalCompositeOperation = 'lighter';
    const band = g.createLinearGradient(bx - 300, 0, bx + 300, 0); band.addColorStop(0, 'rgba(255,238,200,0)'); band.addColorStop(.5, 'rgba(255,238,200,.28)'); band.addColorStop(1, 'rgba(255,238,200,0)');
    g.fillStyle = band; g.fillRect(-40, -40, W0 + 80, H0 + 80);
    g.beginPath(); g.rect(bx - 260, -40, 520, H0 + 80); g.clip(); rain(g, T, { n: 120, len: 60, speed: 1600, alpha: .55, color: '255,240,215', seed: 23, angle: .12, width: 2 });
    g.restore();
    rain(g, T, { n: 90, len: 60, speed: 1600, alpha: .16, seed: 24, angle: .12 });
    g.fillStyle = 'rgba(220,230,235,.25)'; const r = rng(25); for (let i = 0; i < 30; i++) { g.beginPath(); g.arc(400 + r() * 800, 330 + r() * 260, 2 + r() * 3, 0, TAU); g.fill(); }
  }
  // ---- 3c: the valley under lightning; the leaves
  function shotC(g, T) {
    const f = Math.max(flashCurve(T - 5.3), flashCurve(T - 5.62) * .6);
    hills(g, f * .8);
    const ridges = [[300, 60, '#0e171c', '#a8b6c1', .0021, 51], [360, 70, '#0d1519', '#7f909b', .0028, 52], [440, 80, '#0b1215', '#4f5f68', .0036, 53], [560, 90, '#090f11', '#222c31', .005, 54]];
    ridges.forEach(([base, amp, dark, lit, fq, sd], i) => {
      g.fillStyle = f > 0 ? lerpColor(dark, lit, f) : dark; g.beginPath(); g.moveTo(-40, H0 + 40);
      for (let x = -40; x <= W0 + 40; x += 20) g.lineTo(x, base + fbm(x * fq, sd) * amp - (i === 1 && x > 980 && x < 1180 ? 40 : 0));
      g.lineTo(W0 + 40, H0 + 40); g.fill();
      if (i === 1) { g.strokeStyle = `rgba(215,228,235,${.35 + f * .6})`; g.lineWidth = 5; g.beginPath(); g.moveTo(1080, 360); g.bezierCurveTo(1086, 420, 1076, 480, 1082, 560); g.stroke(); glow(g, 1082, 565, 80, 'rgba(210,225,232,1)', .2 + f * .5); }
      if (i === 2) { g.strokeStyle = 'rgba(30,38,42,.9)'; g.lineWidth = 6; g.beginPath(); g.moveTo(-40, 540); g.quadraticCurveTo(700, 470, W0 + 40, 520); g.stroke(); }
    });
    const tx = key([[4.8, 420], [7.4, 760, 'lin']], T), ty = 540 - (tx - 420) * .1;
    if (!PLATE.on) { glow(g, tx, ty - 6, 30, 'rgba(255,230,180,1)', .9); g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = 'rgba(255,230,180,.25)'; g.beginPath(); g.moveTo(tx + 6, ty - 6); g.lineTo(tx + 150, ty - 30); g.lineTo(tx + 150, ty + 12); g.fill(); g.restore(); }
    g.save(); g.globalAlpha = .55; for (let k = 0; k < 3; k++) glow(g, 300 + k * 520 + Math.sin(T * .3 + k) * 40, 640, 380, 'rgba(120,140,150,1)', .18, 'screen'); g.restore();
    rain(g, T, { n: 200, len: 60, speed: 1500, alpha: .22 + f * .3, seed: 26, angle: .12 });
    // Leaves rush across the lens and cover it.
    const wipe = key([[6.55, 0], [7.4, 1, 'in']], T);
    if (wipe > 0) {
      const x = 2100 - wipe * 2600;
      for (let k = 0; k < 5; k++) spray(g, x + k * 260, 180 + k * 190, PI + .3 - k * .12, 900, 60 + k, { fill: '#0a140e', fill2: '#0f1c13', scale: 1.5, sway: Math.sin(T * 4 + k) * .08 });
      g.fillStyle = '#081009'; g.fillRect(x + 900, -40, 3000, H0 + 80);
    }
  }
  S.leafWipe = leafWipe;                   // the house beat opens by clearing the same drawn leaves from the lens
  return {
    draw(g, T, env) {
      const s = shotOf([3.2, 4.8], T);
      if (s === 0) shotA(g, T, env); else if (s === 1) shotB(g, T); else shotC(g, T);
      vignette(g, .6);
      flat(g, '#000', key([[0, 1], [.5, 1], [1.1, 0, 'out']], T) * (1 - span(T, .28, .5) * .15));
      if (T < 1.1) { const l = key([[0, 0], [.3, 0, 'lin'], [.33, 1, 'lin'], [.38, .2, 'lin'], [.46, 1, 'lin']], T), bx = key([[0, -460], [3.2, 1180, 'lin']], T); const x = bx + 468 * .76, y = lower(bx + 180) + 20 - 76 * .76; glow(g, x, y, 90, 'rgba(255,244,210,1)', l); glow(g, x - 30, y + 4, 60, 'rgba(255,244,210,1)', l * .8); }
      flat(g, '#07100a', key([[7.25, 0], [7.4, 1, 'in']], T));
      grain(g, env.grain, .16, T);
    }
  };
}

// ================================================================= 4. CEDAR HOUSE
// The house itself, drawn from its real plan: the architecture's corners are projected through a
// lens like the one the player first sees it from, then painted flat — lime walls, Mangalore tile,
// teak posts, the green door, lamps. Inviting first: the windows come up warm one by one, smoke
// leaves the chimney, Aren walks up the path. Suspicious second: the upper floor's dark window,
// lightning in it, nothing there. Then Aren at the foot of the steps.
export function buildHouse(S) {
  const warmCol = (k) => lerpColor('2a2420', 'f3c27a', k);
  function paintHouse(g, P, T, opts = {}) {
    const nearZ = opts.nearZ ?? 14;
    const on = i => EASE.s(span(T, .3 + i * .28, .9 + i * .28)) * (Math.sin(T * 37 + i) > .75 && T < 1.4 + i * .28 ? .7 : 1);
    const poly = (pts, fill, stroke = C.ink, lw = 2.5) => { const q = pts.map(p => P(...p)); g.beginPath(); g.moveTo(q[0][0], q[0][1]); for (const [x, y] of q.slice(1)) g.lineTo(x, y); g.closePath(); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.strokeStyle = stroke; g.lineWidth = lw; g.lineJoin = 'round'; g.stroke(); } return q; };
    const line = (a, b, col, lw) => { const p = P(...a), q = P(...b); g.strokeStyle = col; g.lineWidth = lw; g.beginPath(); g.moveTo(p[0], p[1]); g.lineTo(q[0], q[1]); g.stroke(); };
    const tiles = (e0, e1, r0, r1, n, m, col) => {           // Mangalore tile channels and courses on a slope quad
      g.strokeStyle = col; g.lineWidth = 1.6;
      for (let i = 1; i < n; i++) { const k = i / n; line(mix(e0, e1, k), mix(r0, r1, k), col, 1.6); }
      for (let j = 1; j < m; j++) { const k = j / m; line(mix(e0, r0, k), mix(e1, r1, k), 'rgba(40,14,10,.55)', 2.4); }
    };
    // --- the ground first, as a backdrop: everything on the plan stands on it
    { const hz = P(0, -.82, -40)[1]; g.fillStyle = '#1c2a24'; g.fillRect(-60, Math.min(hz, H0), W0 + 120, H0 + 60 - Math.min(hz, H0)); }
    // --- the wing behind (its west gable, facing us, over the kitchen)
    poly([[-15.3, 8.6, -13.2], [-3.6, 8.6, -13.2], [-9.47, 12.3, -13.2]], '#6f6d60');
    poly([[-9.47, 12.25, -13.75], [-3.05, 8.55, -13.75], [-3.05, 8.55, -24], [-9.47, 12.25, -24]], C.tileDark);
    poly([[-15.9, 8.55, -13.75], [-9.47, 12.3, -13.75], [-3.05, 8.55, -13.75]], null, '#2c1510', 5);
    // --- kitchen block to the left of the veranda: its gable end and a shuttered window
    poly([[-14.4, 4.1, -2.6], [-8.5, 4.1, -2.6], [-11.17, 6.6, -2.6]], '#7d7a6b');
    poly([[-14.4, 0, -2.6], [-8.5, 0, -2.6], [-8.5, 4.1, -2.6], [-14.4, 4.1, -2.6]], '#908c7b');
    poly([[-15, 4, -2.05], [-11.17, 6.62, -2.05], [-11.17, 6.62, -13], [-15, 4, -13]], C.tile);
    poly([[-11.45, 1.8, -2.55], [-10.35, 1.8, -2.55], [-10.35, 3.2, -2.55], [-11.45, 3.2, -2.55]], C.greenDoor);
    // --- the lounge hall: roof slope, ridge, chimney, the south gable end and its two windows
    const e0 = [-9.02, 4.44, -2.04], e1 = [3.81, 4.44, -2.04], r0 = [-9.02, 8.3, -9.64], r1 = [3.81, 8.3, -9.64];
    poly([e0, e1, r1, r0], C.tile); tiles(e0, e1, r0, r1, 42, 9, 'rgba(60,20,14,.6)');
    line([-9.1, 8.36, -9.64], [3.9, 8.36, -9.64], C.tileDark, 7);
    // Chimney: two faces we can see, stone, with its pots.
    poly([[-8.9, 7.0, -9.1], [-7.64, 7.0, -9.1], [-7.64, 10.05, -9.1], [-8.9, 10.05, -9.1]], '#8a8779');
    poly([[-7.64, 7.0, -9.1], [-7.64, 7.0, -10.1], [-7.64, 10.05, -10.1], [-7.64, 10.05, -9.1]], '#6d6b60');
    poly([[-9.05, 10.05, -8.95], [-7.5, 10.05, -8.95], [-7.5, 10.2, -8.95], [-9.05, 10.2, -8.95]], '#a19e8f');
    // South gable wall (X = 3.26), lime, catching the lamp; its bargeboards; the vent.
    poly([[3.26, .06, -2.6], [3.26, .06, -16.7], [3.26, 4.6, -16.7], [3.26, 4.6, -2.6]], '#9e9a88');
    poly([[3.26, 4.6, -2.6], [3.26, 4.6, -16.7], [3.26, 8.35, -9.64]], '#8f8b7a');
    line([3.81, 4.44, -2.04], [3.81, 8.4, -9.64], C.teakDark, 7); line([3.81, 8.4, -9.64], [3.81, 4.44, -17.25], C.teakDark, 7);
    for (let k = 0; k < 4; k++) line([3.28, 6.9 + k * .22, -9.0], [3.28, 6.9 + k * .22, -10.3], '#4a3322', 4);
    poly([[3.3, 0, -2.6], [3.3, 0, -16.7], [3.3, .7, -16.7], [3.3, .7, -2.6]], C.laterite);
    for (const [z, i] of [[-5.97, 3], [-12.77, 4]]) {
      poly([[3.28, 1.2, z - .95], [3.28, 1.2, z + .95], [3.28, 3.5, z + .95], [3.28, 3.5, z - .95]], warmCol(on(i)), C.teakDark, 4);
      line([3.29, 1.2, z], [3.29, 3.5, z], C.teakDark, 3); line([3.29, 2.8, z - .95], [3.29, 2.8, z + .95], C.teakDark, 3);
    }
    // --- the veranda: facade wall, windows lit from inside, the door, the sign, lamps
    poly([[-12.6, .06, -2.6], [3.26, .06, -2.6], [3.26, 4.42, -2.6], [-12.6, 4.42, -2.6]], '#b3ad98');
    { g.save(); g.globalCompositeOperation = 'screen'; for (const c of [-6.82, -4.02, -1.22, 1.55]) { const p = P(c, 2.2, -2.5); glow(g, p[0], p[1], 170, 'rgba(255,190,110,1)', .28 * on(1)); } g.restore(); }
    [-6.82, -4.02, -1.22].forEach((c, i) => {
      const k = on(i);
      poly([[c - 1.28, 1.0, -2.55], [c + 1.28, 1.0, -2.55], [c + 1.28, 3.45, -2.55], [c - 1.28, 3.45, -2.55]], warmCol(k), C.teakDark, 4);
      for (const dx of [-.43, .43]) line([c + dx, 1.0, -2.54], [c + dx, 3.45, -2.54], C.teakDark, 3);
      line([c - 1.28, 2.6, -2.54], [c + 1.28, 2.6, -2.54], C.teakDark, 3);
    });
    poly([[.95, .06, -2.55], [2.15, .06, -2.55], [2.15, 2.45, -2.55], [.95, 2.45, -2.55]], C.greenDoor, C.teakDark, 4);
    poly([[.95, 2.55, -2.55], [2.15, 2.55, -2.55], [2.15, 2.95, -2.55], [.95, 2.95, -2.55]], warmCol(on(2)), C.teakDark, 3);
    const sq = poly([[.4, 3.58, -2.5], [2.7, 3.58, -2.5], [2.7, 4.08, -2.5], [.4, 4.08, -2.5]], '#26382f', '#c9a862', 3);
    g.fillStyle = '#efdcaa'; g.font = `600 ${Math.max(8, (sq[1][0] - sq[0][0]) * .13)}px Georgia`; g.textAlign = 'center'; g.fillText('CEDAR HOUSE', (sq[0][0] + sq[1][0]) / 2, (sq[0][1] + sq[2][1]) / 2 + 4);
    for (const X of [-8.22, -5.42, -2.62, .18, 2.88]) poly([[X - .13, 0, -2.5], [X + .13, 0, -2.5], [X + .13, 4.42, -2.5], [X - .13, 4.42, -2.5]], C.wood);
    for (const X of [.16, 2.9]) { const p = P(X, 2.4, -2.45); glow(g, p[0], p[1], 90, 'rgba(255,205,135,1)', .8 * on(1)); g.fillStyle = '#ffe3a8'; g.beginPath(); g.arc(p[0], p[1], 6, 0, TAU); g.fill(); }
    // Veranda floor, wet: the windows' light lies on it.
    poly([[-12.6, .06, -2.6], [3.62, .06, -2.6], [3.62, .06, 2.95], [-12.6, .06, 2.95]], '#3a3d3a');
    g.save(); g.globalCompositeOperation = 'lighter'; for (const c of [-6.82, -4.02, -1.22]) { const p = P(c, .06, -1.2); glow(g, p[0], p[1], 90, 'rgba(255,190,110,1)', .35 * on(1)); } g.restore();
    // The lean-to roof seen from below: its dark soffit, rafters, the front fascia and gutter.
    poly([[-12.62, 3.62, 3.23], [3.95, 3.62, 3.23], [3.95, 4.42, -2.59], [-12.62, 4.42, -2.59]], '#1f1712');
    for (let X = -12; X < 3.9; X += 1.4) line([X, 3.64, 3.2], [X, 4.4, -2.55], '#34261b', 3);
    poly([[-12.7, 3.45, 3.3], [4.0, 3.45, 3.3], [4.0, 3.72, 3.3], [-12.7, 3.72, 3.3]], C.teak);
    // Front posts, railing, plinth, steps.
    for (const X of [-8.4, -4.62, 3.62]) poly([[X - .14, -.02, 2.75], [X + .14, -.02, 2.75], [X + .14, 3.72, 2.75], [X - .14, 3.72, 2.75]], '#3d2618');
    for (const [a, b] of [[-12.4, -8.55], [-8.25, -4.75], [-4.5, .45], [2.65, 3.5]]) {
      line([a, .98, 2.75], [b, .98, 2.75], '#3d2618', 6); line([a, .16, 2.75], [b, .16, 2.75], '#3d2618', 4);
      for (let X = a + .28; X < b; X += .28) line([X, .16, 2.75], [X, .98, 2.75], '#5a3a26', 2.5);
    }
    poly([[-12.6, -.82, 2.95], [.45, -.82, 2.95], [.45, .06, 2.95], [-12.6, .06, 2.95]], C.laterite);
    poly([[2.65, -.82, 2.95], [3.7, -.82, 2.95], [3.7, .06, 2.95], [2.65, .06, 2.95]], C.laterite);
    for (let i = 0; i < 3; i++) { const top = .06 - .22 * (i + 1), z = 2.95 + .46 * (i + 1); poly([[1.55 - 1.1, top, z - .46], [1.55 + 1.1, top, z - .46], [1.55 + 1.1, top, z], [1.55 - 1.1, top, z]], i ? '#6f6c62' : '#8a877b'); poly([[1.55 - 1.1, top - .22, z], [1.55 + 1.1, top - .22, z], [1.55 + 1.1, top, z], [1.55 - 1.1, top, z]], '#55524a'); }
    // Garden: bushes, the stone path with its puddles, grass.
    if (!opts.noGarden) {
      for (let k = 0; k < 8; k++) { const z = 4.4 + k * 1.1; if (z > nearZ - .5) break; const x = 1.6 + Math.sin(k * .7) * .35; poly([[x - .55, -.8, z - .38], [x + .55, -.8, z - .38], [x + .55, -.8, z + .38], [x - .55, -.8, z + .38]], '#4b4c47', '#2a2b28', 2); }
      g.save(); g.globalCompositeOperation = 'lighter'; for (let k = 0; k < 5; k++) { const p = P(1.3 + Math.sin(k * 1.9) * .3, -.79, 4.8 + k * 1.3); g.fillStyle = `rgba(255,200,130,${(.18 + .12 * Math.sin(T * 2 + k * 1.7)) * on(1)})`; g.beginPath(); g.ellipse(p[0], p[1], 22 - k * 2, 4, 0, 0, TAU); g.fill(); } g.restore();
      for (const [x, z, s] of [[-2.2, 3.9, 1.3], [-.4, 4.2, 1.0], [5.2, 3.8, 1.5], [6.8, 4.6, 1.1], [-5.6, 4.0, 1.2]]) {
        if (z > nearZ - .5) continue;
        const c = P(x, -.82 + s * .55, z), l = P(x - s * .9, -.82 + s * .55, z), r = P(x + s * .9, -.82 + s * .55, z), rad = Math.abs(r[0] - l[0]) / 2 * .8;
        g.fillStyle = '#20382b'; g.beginPath(); g.ellipse(c[0], c[1], rad * 1.25, rad * .85, 0, 0, TAU); g.fill(); g.strokeStyle = C.ink; g.lineWidth = 2.5; g.stroke();
        g.fillStyle = 'rgba(120,160,130,.18)'; g.beginPath(); g.ellipse(c[0] - rad * .25, c[1] - rad * .35, rad * .7, rad * .4, -.2, 0, TAU); g.fill();
      }
    }
  }
  // Aren's walk up the path (4a), on the real slabs.
  const PATH = [[6.1, -.82, 13.6], [4.4, -.82, 9.9], [2.4, -.82, 7.2], [1.62, -.82, 5.1]];
  function walker(t) {
    const lens = [0]; for (let i = 1; i < PATH.length; i++) lens.push(lens[i - 1] + Math.hypot(PATH[i][0] - PATH[i - 1][0], PATH[i][2] - PATH[i - 1][2]));
    const s = Math.min(1, Math.max(0, t)) * lens[lens.length - 1]; let i = 1; while (i < lens.length - 1 && lens[i] < s) i++;
    const f = (s - lens[i - 1]) / (lens[i] - lens[i - 1]), a = PATH[i - 1], b = PATH[i];
    return [a[0] + (b[0] - a[0]) * f, a[1], a[2] + (b[2] - a[2]) * f];
  }
  function aren(g, P, x, y, z, T, moving, rim = .5, look = 0) {
    const foot = P(x, y, z), head = P(x, y + 2.425, z), h = foot[1] - head[1], bob = moving ? Math.abs(Math.sin(T * 8.5)) * h * .02 : 0;
    g.save(); g.globalCompositeOperation = 'lighter'; sprite(g, S.rimWarm, foot[0] - 2, foot[1] - bob, h * 1.01, { ay: 1, alpha: rim }); g.restore();
    if (!look) sprite(g, S.aren.rear, foot[0], foot[1] - bob, h, { ay: 1 });
    else {
      // Body, then the head turned a little on its neck (the rig's own cut), toward the house.
      const k = h / S.aren.rear.height, x0 = foot[0] - S.aren.rear.width * k / 2, y0 = foot[1] - bob - h;
      g.drawImage(S.rearBody, x0, y0, S.rearBody.width * k, S.rearBody.height * k);
      g.save(); g.translate(x0 + S.rearNeck[0] * k, y0 + S.rearNeck[1] * k); g.rotate(look);
      g.drawImage(S.rearHead, -S.rearNeck[0] * k, -S.rearNeck[1] * k, S.rearHead.width * k, S.rearHead.height * k); g.restore();
    }
    g.fillStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.ellipse(foot[0], foot[1], h * .2, h * .035, 0, 0, TAU); g.fill();
  }
  function sky(g, T, f = 0) {
    const s = g.createLinearGradient(0, 0, 0, 620); s.addColorStop(0, f ? lerpColor('0b141b', '8093a6', f) : '#0b141b'); s.addColorStop(1, f ? lerpColor('1b2a31', 'a9b8c4', f) : '#1b2a31');
    g.fillStyle = s; g.fillRect(-40, -40, W0 + 80, 700);
    g.fillStyle = 'rgba(40,55,65,.35)'; for (let k = 0; k < 4; k++) { g.beginPath(); g.ellipse(200 + k * 420 + (T * 8 % 400), 120 + k * 40, 360, 40, 0, 0, TAU); g.fill(); }
  }
  function treeline(g, T) {
    g.fillStyle = '#0d1714'; g.beginPath(); g.moveTo(-40, 560); for (let x = -40; x <= W0 + 40; x += 30) g.lineTo(x, 420 + fbm(x * .006, 71) * 90 - Math.abs(Math.sin(x * .02)) * 30); g.lineTo(W0 + 40, 700); g.lineTo(-40, 700); g.fill();
    for (const [x, y, s] of [[170, 360, 1], [1440, 330, 1.2]]) { g.fillStyle = '#12211a'; for (let k = 0; k < 6; k++) { g.beginPath(); g.ellipse(x + Math.cos(k) * 70 * s + Math.sin(T * .9 + k) * 3, y + Math.sin(k * 1.7) * 30 * s, 80 * s, 50 * s, 0, 0, TAU); g.fill(); } g.fillStyle = '#1b130e'; g.fillRect(x - 8, y + 30, 16, 260); }
  }
  function smoke(g, P, T) {
    const top = P(-8.27, 10.25, -9.6);
    g.save(); for (let k = 0; k < 7; k++) { const ph = (T * .16 + k / 7) % 1; glow(g, top[0] + ph * 140 + Math.sin(T + k) * 10, top[1] - ph * 220, 20 + ph * 70, 'rgba(160,175,185,1)', .28 * Math.sin(ph * PI), 'screen'); } g.restore();
  }
  function mist(g, T) { g.save(); for (let k = 0; k < 4; k++) glow(g, ((k * 460 + T * 22) % 2000) - 200, 700 + k * 40, 420, 'rgba(140,160,170,1)', .12, 'screen'); g.restore(); }
  // Step 13B: the painted house (plates 'house' lit, 'house-dark' its twin with the lights out, 'upper',
  // 'upper-lit', 'steps', 'branch'; each shot's clip when it has one). Inviting first: over the dark twin, the lamps and their
  // spill come up, then each window lights on its own (a cut of the lit painting inside its real outline).
  const PL = S.P || {};
  const painted = () => !PLATE.on && PL.house && PL.houseDark && PL.upper && PL.upperLit && PL.steps;
  const on = (i, T) => EASE.s(span(T, .3 + i * .28, .9 + i * .28)) * (Math.sin(T * 37 + i) > .75 && T < 1.4 + i * .28 ? .7 : 1);
  const WINDOWS = [
    ...[-6.82, -4.02, -1.22].map((c, i) => ({ i, q: [[c - 1.28, 1.0, -2.55], [c + 1.28, 1.0, -2.55], [c + 1.28, 3.45, -2.55], [c - 1.28, 3.45, -2.55]] })),
    { i: 2, q: [[.95, 2.55, -2.55], [2.15, 2.55, -2.55], [2.15, 2.95, -2.55], [.95, 2.95, -2.55]] },
    ...[[-5.97, 3], [-12.77, 4]].map(([z, i]) => ({ i, q: [[3.28, 1.2, z - .95], [3.28, 1.2, z + .95], [3.28, 3.5, z + .95], [3.28, 3.5, z - .95]] }))
  ];
  let lit = null;
  const vid = (k, t) => clipAt(S.clips?.[k], t, S.env?.paused);
  function prepare() {
    if (!painted() || lit) return;
    const img = PL.house, sx = img.width / W0, sy = img.height / H0, Pj = S.proj.house;
    const polys = WINDOWS.map(w => ({ i: w.i, pts: w.q.map(p => { const [x, y] = Pj(...p); return [x * sx, y * sy]; }) }));
    const path = (c, pts) => { const cx = pts.reduce((a, p) => a + p[0], 0) / pts.length, cy = pts.reduce((a, p) => a + p[1], 0) / pts.length; c.beginPath(); pts.forEach(([x, y], k) => { const gx = x + Math.sign(x - cx) * 3, gy = y + Math.sign(y - cy) * 3; k ? c.lineTo(gx, gy) : c.moveTo(gx, gy); }); c.closePath(); };
    // The lit house without its windows: only drawn when there is no clip, so made on first use.
    const rest = () => canvas(img.width, img.height, c => { c.drawImage(img, 0, 0); c.globalCompositeOperation = 'destination-out'; for (const p of polys) { path(c, p.pts); c.fill(); } });
    const wins = polys.map(p => {
      const xs = p.pts.map(q => q[0]), ys = p.pts.map(q => q[1]), x0 = Math.floor(Math.min(...xs)) - 6, y0 = Math.floor(Math.min(...ys)) - 6, bw = Math.ceil(Math.max(...xs)) + 6 - x0, bh = Math.ceil(Math.max(...ys)) + 6 - y0;
      const c = canvas(bw, bh, c2 => { c2.translate(-x0, -y0); path(c2, p.pts); c2.clip(); c2.drawImage(img, 0, 0); });
      return { i: p.i, c, x: x0 / sx, y: y0 / sy, w: bw / sx, h: bh / sy };
    });
    // The same windows cut from the dark twin: over the living (lit) clip they hold the dark until each lights.
    const darks = wins.map(w => ({ i: w.i, x: w.x, y: w.y, w: w.w, h: w.h, c: canvas(w.c.width, w.c.height, c2 => { c2.drawImage(w.c, 0, 0); c2.globalCompositeOperation = 'source-in'; c2.drawImage(PL.houseDark, -w.x * sx, -w.y * sy); }) }));
    lit = { rest: null, makeRest: rest, wins, darks };
  }
  function paintedA(g, T) {
    prepare();
    const Pj = S.proj.house, push = key([[0, 1.0], [4.6, 1.06]], T);
    g.save(); g.translate(W0 / 2, H0 / 2); g.scale(push, push); g.translate(-W0 / 2, -H0 / 2 - 10 * (push - 1) * 10);
    const clip = vid('house', T);
    if (clip) {
      // The house alive (rain, mist, smoke, leaves); it wakes from its dark twin: first the lamps, then each window.
      g.drawImage(clip, 0, 0, W0, H0);
      drawHold(g, S.holds?.house);                                   // the name board's lettering, from the still
      const lamps = on(1, T);
      if (lamps < 1) { g.globalAlpha = 1 - lamps; g.drawImage(PL.houseDarkPatch || PL.houseDark, 0, 0, W0, H0); }   // the garden and trees live on around it
      for (const w of lit.darks) { const a = Math.max(0, Math.min(1, lamps - on(w.i, T))); if (a > 0) { g.globalAlpha = a; g.drawImage(w.c, w.x, w.y, w.w, w.h); } }
    } else {
      g.drawImage(PL.houseDark, 0, 0, W0, H0);
      g.globalAlpha = on(1, T); g.drawImage(lit.rest ||= lit.makeRest(), 0, 0, W0, H0);
      for (const w of lit.wins) { g.globalAlpha = on(w.i, T); g.drawImage(w.c, w.x, w.y, w.w, w.h); }
    }
    g.globalAlpha = 1;
    if (!clip) smoke(g, Pj, T);                                        // the clip has the painting's own smoke
    mist(g, T);
    const k = span(T, .6, 4.4), [ax, ay, az] = walker(EASE.s(k));
    aren(g, Pj, ax, ay, az, T, k > 0 && k < 1, .45);
    g.restore();
    rain(g, T, { n: 220, len: 60, speed: 1500, alpha: .22, seed: 61, angle: .1 });
    // Framing: a branch hanging in from the top left, moving in the wind.
    if (PL.branch) { const bw = PL.branch.width * 640 / PL.branch.height; g.save(); g.translate(-30, -20); g.rotate(Math.sin(T * 1.2) * .025); g.drawImage(PL.branch, 0, 0, bw, 640); g.restore(); }
    rain(g, T * 1.3, { n: 60, len: 110, speed: 2200, width: 2.2, alpha: .2, seed: 64, angle: .1 });
    S.leafWipe?.(g, key([[0, 0], [.75, 1, 'out']], T), T, -1);          // the branch from the road clears the lens
  }
  function paintedB(g, T) {
    const f = Math.max(flashCurve(T - 5.25), flashCurve(T - 5.5) * .5), push = key([[4.6, 1.0], [6.4, 1.08]], T);
    g.save(); g.translate(800, 500); g.scale(push, push); g.translate(-800, -500);
    g.drawImage(PL.upper, 0, 0, W0, H0);                            // a still: its clips grew lights in the dark wall
    if (f > 0) { g.globalAlpha = Math.min(1, f); g.drawImage(PL.upperLit, 0, 0, W0, H0); g.globalAlpha = 1; }
    for (let k = 0; k < 9; k++) { const x = 90 + k * 180, ph = (T * .9 + k * .37) % 1; g.fillStyle = 'rgba(200,215,225,.5)'; g.beginPath(); g.arc(x, 150 - x * .03 + ph * 700, 3.5, 0, TAU); g.fill(); }
    g.restore();
    rain(g, T, { n: 200, len: 60, speed: 1500, alpha: .24, seed: 65, angle: .1 });
  }
  function paintedC(g, T) {
    const Pj = S.proj.steps;
    const clip = vid('steps', T - 6.4);
    g.drawImage(clip || PL.steps, 0, 0, W0, H0);
    if (clip) drawHold(g, S.holds?.steps);
    mist(g, T);
    const k = span(T, 6.4, 7.6);
    aren(g, Pj, 1.62, -.82, mix(6.1, 5.2, EASE.out(k)), T, k < 1, .7, -.07 * EASE.s(span(T, 7.05, 7.45)));
    rain(g, T, { n: 240, len: 60, speed: 1500, alpha: .24, seed: 66, angle: .1 });
    rain(g, T * 1.3, { n: 60, len: 110, speed: 2200, width: 2.2, alpha: .18, seed: 67, angle: .1 });
  }
  // ---- 4a: inviting
  function shotA(g, T, env) {
    const P = S.proj.house;
    const push = key([[0, 1.0], [4.6, 1.06]], T);
    g.save(); g.translate(W0 / 2, H0 / 2); g.scale(push, push); g.translate(-W0 / 2, -H0 / 2 - 10 * (push - 1) * 10);
    sky(g, T); treeline(g, T); paintHouse(g, P, T); smoke(g, P, T); mist(g, T);
    const k = span(T, .6, 4.4), [ax, ay, az] = walker(EASE.s(k));
    aren(g, P, ax, ay, az, T, k > 0 && k < 1, .45);
    g.restore();
    rain(g, T, { n: 220, len: 60, speed: 1500, alpha: .24, seed: 61, angle: .1 });
    spray(g, -60, 40, .35, 560, 62, { sway: Math.sin(T * 1.2) * .05, scale: 1.1 });
    spray(g, 1660, 1060, -2.35, 420, 63, { sway: Math.sin(T * 1.5 + 1) * .05, scale: .9 });
    rain(g, T * 1.3, { n: 60, len: 110, speed: 2200, width: 2.2, alpha: .2, seed: 64, angle: .1 });
    // The branch from the road clears the lens.
    const clear = key([[0, 0], [.75, 1, 'out']], T);
    if (clear < 1) { const x = -clear * 2600; g.fillStyle = '#07100a'; g.fillRect(x - 3000, -40, 3000 + 900, H0 + 80); for (let k = 0; k < 5; k++) spray(g, x + 900 + k * 60, 180 + k * 190, PI + .3 - k * .12, 900, 60 + k, { fill: '#0a140e', fill2: '#0f1c13', scale: 1.5 }); }
  }
  // ---- 4b: the dark upper window
  function shotB(g, T) {
    const f = Math.max(flashCurve(T - 5.25), flashCurve(T - 5.5) * .5), push = key([[4.6, 1.0], [6.4, 1.08]], T);
    g.save(); g.translate(800, 500); g.scale(push, push); g.translate(-800, -500);
    g.fillStyle = lerpColor('3b3e39', 'd6d1c0', f); g.fillRect(-40, -40, W0 + 80, H0 + 80);
    g.fillStyle = 'rgba(20,22,20,.35)'; for (let x = 0; x < W0; x += 23) { const l = 200 + (x * 37 % 300); g.fillRect(x, 60, 3, l); }    // damp streaks
    glow(g, 800, 1100, 700, 'rgba(255,190,110,1)', .12, 'screen');                                             // warmth from the rooms below
    g.fillStyle = C.tileDark; g.beginPath(); g.moveTo(-40, -40); g.lineTo(W0 + 40, -40); g.lineTo(W0 + 40, 120); g.lineTo(-40, 170); g.fill();
    g.strokeStyle = 'rgba(30,10,6,.6)'; g.lineWidth = 3; for (let x = -40; x < W0 + 40; x += 34) { g.beginPath(); g.moveTo(x, -40); g.lineTo(x, 170 - x * .03); g.stroke(); }
    for (let k = 0; k < 9; k++) { const x = 90 + k * 180, ph = (T * .9 + k * .37) % 1; g.fillStyle = 'rgba(200,215,225,.6)'; g.beginPath(); g.arc(x, 150 - x * .03 + ph * 700, 4, 0, TAU); g.fill(); }
    rr(g, 420, 260, 760, 640, 6); g.fillStyle = '#3a2618'; g.fill(); g.strokeStyle = C.ink; g.lineWidth = 6; g.stroke();
    for (const [x, y, w, h] of [[450, 290, 330, 270], [820, 290, 330, 270], [450, 600, 330, 270], [820, 600, 330, 270]]) {
      g.fillStyle = lerpColor('070b0e', '9fb0bd', f * .8); g.fillRect(x, y, w, h);
      g.fillStyle = `rgba(150,170,185,${.08 + f * .1})`; g.beginPath(); g.moveTo(x, y + h); g.lineTo(x + w * .4, y); g.lineTo(x + w * .55, y); g.lineTo(x + w * .15, y + h); g.fill();
    }
    g.fillStyle = '#5a3a26'; g.fillRect(400, 900, 800, 30);
    g.restore();
    rain(g, T, { n: 200, len: 60, speed: 1500, alpha: .26, seed: 65, angle: .1 });
  }
  // ---- 4c: Aren at the foot of the steps
  function shotC(g, T) {
    const P = S.proj.steps;
    sky(g, T); treeline(g, T); paintHouse(g, P, T + 3, { nearZ: 8.6 }); mist(g, T);
    const k = span(T, 6.4, 7.6);
    aren(g, P, 1.62, -.82, mix(6.1, 5.2, EASE.out(k)), T, k < 1, .7, -.07 * EASE.s(span(T, 7.05, 7.45)));
    rain(g, T, { n: 240, len: 60, speed: 1500, alpha: .26, seed: 66, angle: .1 });
    rain(g, T * 1.3, { n: 60, len: 110, speed: 2200, width: 2.2, alpha: .2, seed: 67, angle: .1 });
  }
  return {
    prepare,
    draw(g, T, env) {
      const s = shotOf([4.6, 6.4], T);
      if (painted()) {
        if (s === 0) paintedA(g, T);
        else if (s === 1) {
          const f = Math.max(flashCurve(T - 5.25), flashCurve(T - 5.5) * .5);
          paintedA(g, T); g.fillStyle = `rgba(3,6,10,${.4 - f * .25})`; g.fillRect(-40, -40, W0 + 80, H0 + 80);
          if (f > 0) flat(g, '#dde6f0', f * .18, 'screen');
          insertPanel(g, S.soft, T, 4.6, -1, { x: 110, y: 98, w: 780, h: 488, rot: .024 }, pg => paintedB(pg, T));
        } else paintedC(g, T);
      }
      else if (s === 0) shotA(g, T, env); else if (s === 1) shotB(g, T); else shotC(g, T);
      vignette(g, .58);
      grain(g, env.grain, .15, T);
    }
  };
}
