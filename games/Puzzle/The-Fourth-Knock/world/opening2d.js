import * as THREE from 'three';
import { PLATE, W0, H0, canvas, handSprite, envelopeSprite, noteSprite, ticketSprite, busSprite, blurred, tinted, cut, blinkLayer, AREN_RECTS, AREN_EYES, grainTexture, EASE, span, key, flat, grain, rain, vignette, rng } from './opening2d-art.js';
import { buildMessage } from './opening2d-scenes.js';
import { buildTravel, buildGhat, buildHouse } from './opening2d-beats.js';
import { opening2D, opening2DHandoff } from '../content/opening2d.js';
import { openingHandoff13 } from '../content/step13.js';
import { loadPlates, ARRIVAL, HOLDS } from './opening2d-plates.js';
import { loadClips, settleClips, holdCut, clipAt } from './opening2d-clips.js';

// The opening as a 2D illustrated animated intro (post-Step-13 correction pass). It draws into its
// own canvas over the game; the 3D world is not rendered while an illustrated shot fills the frame.
// Step 13C: it enters the game through the Step 13 3D handoff (`handoff3d`, world/opening13.js): the last
// painting, Aren at the foot of the steps, dissolves into the same view in 3D (the same world, the same
// lens), and the Step 13 move carries him up the steps into the playable framing. Without it (or if its
// house fails to load) the 13B arrival plays: the painted veranda at the game's own framing, resolving
// outward from Aren into the living scene.
// Same interface as the Step 13 3D opening (world/opening13.js, kept as the fallback): the director
// paces everything by clock(); scrub() freezes any frame for review.
export function createOpening2D({ scene, renderer, rooms, actors, state, world, ortho, handoff3d = null }) {
  const cv = document.createElement('canvas'); cv.id = 'op2d'; cv.setAttribute('aria-hidden', 'true');
  Object.assign(cv.style, { position: 'absolute', left: '0', top: '0', width: '100%', height: '100%', zIndex: '1', display: 'none', pointerEvents: 'none' });
  const g = cv.getContext('2d');
  let view = { s: 1, ox: 0, oy: 0 };
  let prepared = null, S = null, beats = [];
  const env = {};
  let beat = -1, T = 0, paused = false, handoff = null, opaque = false;
  let snapWanted = false, snapTaken = false, styled = null, lastFrame = null, warmed = false;
  // Step 13C: the 3D handoff, once its house is loaded; the steps shot's lens (it frames the last painting,
  // and the 3D move starts from it); how long the painting takes to dissolve into it, the lens held still.
  // The arrival is the Step 13 handoff (the same 5.4 s move) with the dissolve before it.
  let h3 = null, into3d = false, fade = null;
  const STEPS_CAM = { pos: [3.6, .7, 10.4], look: [1.2, 1.6, 1.6], fov: 40 }, DISSOLVE = .6;
  const HANDOFF_3D = { ...openingHandoff13, seconds: +(openingHandoff13.seconds + DISSOLVE).toFixed(2) };

  function mount() { const st = document.getElementById('opening-stage'); if (st && cv.parentNode !== st) st.insertBefore(cv, st.firstChild); }
  function fit() {
    const dpr = Math.min(devicePixelRatio || 1, 1.5), w = Math.round(innerWidth * dpr), h = Math.round(innerHeight * dpr);
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    const s = Math.max(w / W0, h / H0); view = { s, ox: (w - W0 * s) / 2, oy: (h - H0 * s) / 2 };
  }
  const loadImg = src => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });

  // The illustrations are built once, in pieces with a frame between them, normally while the title
  // screen waits (see the idle start below), so Begin cuts straight into the first shot.
  const breathe = () => new Promise(r => setTimeout(r, 0));
  function build() {
    if (!prepared) prepared = (async () => {
      // Step 13B: the painted plates load alongside (not in layout renders, which are drawn from code).
      const [sheet, atlas, P, clips] = await Promise.all([loadImg('./assets/aren-acting-v61.png'), loadImg('./assets/cast-atlas.png'), PLATE.on ? {} : loadPlates(), PLATE.on ? {} : loadClips()]);
      try { await document.fonts?.ready; } catch {}
      const hand = handSprite(false), handPinch = handSprite(true);
      const shadowOf = img => { const b = blurred(tinted(img, '#000'), 10); b.pad = 30; return b; };
      const handShadow = shadowOf(hand), handPinchShadow = shadowOf(handPinch);
      await breathe();
      const noteBack = canvas(1536, 1320, (c, W, H) => { c.fillStyle = '#e4d5b0'; c.fillRect(0, 0, W, H); if (P.paper) { c.globalCompositeOperation = 'multiply'; c.drawImage(P.paper, 0, 0, W, H); c.globalCompositeOperation = 'source-over'; } else { const r = rng(9); for (let i = 0; i < 1400; i++) { c.fillStyle = `rgba(120,95,60,${r() * .05})`; c.fillRect(r() * W, r() * H, 3, 2); } } });
      const paper = { envFront: envelopeSprite(true, P.paper), envBack: envelopeSprite(false, P.paper), note: noteSprite(P.paper), noteBack, ticket: ticketSprite(), bus: busSprite() };
      await breathe();
      // The collar line on Aren's back view (cast atlas rear, its own pixels), right to left; `dy` lowers it.
      const COLLAR = [[458, 150], [282, 150], [276, 152], [269, 157], [236, 154], [186, 159], [176, 161], [153, 167], [135, 174], [112, 186], [100, 186], [0, 186]];
      const aboveCollar = (c, dy) => { c.beginPath(); c.moveTo(0, 0); c.lineTo(458, 0); for (const [x, y] of COLLAR) c.lineTo(x, y + dy); c.closePath(); };
      const aren = {};
      for (const [k, rect] of Object.entries(AREN_RECTS)) aren[k] = cut(k === 'front' || k === 'rear' ? atlas : sheet, rect);
      aren.thinkingBlink = blinkLayer(sheet, AREN_RECTS.thinking, AREN_EYES.thinking);
      // Step 13B: Aren lit by the painted carriage: warm bulb on one side, cool window light on the other
      // (his drawings are mirrored there, so the window side is the drawing's right). Build time only.
      if (P.carriage) {
        const litBy = img => canvas(img.width, img.height, c => { c.drawImage(img, 0, 0); c.globalCompositeOperation = 'source-atop'; const gr = c.createLinearGradient(0, 0, img.width, img.height * .3); gr.addColorStop(0, 'rgba(255,188,120,.14)'); gr.addColorStop(.55, 'rgba(40,40,50,.06)'); gr.addColorStop(1, 'rgba(120,160,200,.2)'); c.fillStyle = gr; c.fillRect(0, 0, img.width, img.height); });
        for (const k of ['thinking', 'surprised', 'thinkingBlink']) aren[k + 'Car'] = litBy(aren[k]);
      }
      // Invisible perspective guides for the house: the real plan's corners, projected (veranda frame).
      const projector = (pos, look, fov) => { const cam = new THREE.PerspectiveCamera(fov, W0 / H0, .1, 600); cam.position.set(...pos); cam.lookAt(...look); cam.updateMatrixWorld(); cam.updateProjectionMatrix(); const v = new THREE.Vector3(); return (x, y, z) => { v.set(x, y, z).project(cam); return [(v.x + 1) / 2 * W0, (1 - v.y) / 2 * H0, v.z]; }; };
      S = { P, clips, env, hand, handPinch, handShadow, handPinchShadow, ...paper, aren,
        rimCool: tinted(aren.rear, '#8fb4c8'), rimGreen: tinted(aren.rear, '#7dffb0'), rimWarm: tinted(aren.rear, '#ffc27a'),
        soft: canvas(256, 256, c => { c.filter = 'blur(18px)'; c.fillStyle = '#000'; c.fillRect(48, 48, 160, 160); }),
        // The back view split along the collar, so the head can turn on the rig's neck pivot: everything above
        // the collar (head, beak, eye, rim) turns as one; the head keeps 6 px of collar under it, so no gap opens.
        rearNeck: [207, 212],
        rearBody: canvas(aren.rear.width, aren.rear.height, c => { c.drawImage(aren.rear, 0, 0); c.globalCompositeOperation = 'destination-out'; aboveCollar(c, 0); c.fill(); }),
        rearHead: canvas(aren.rear.width, 200, c => { aboveCollar(c, 6); c.clip(); c.drawImage(aren.rear, 0, 0); }),
        proj: { house: projector([9.7, 1.86, 17.4], [-.6, 3.25, -1.7], 42), steps: projector(STEPS_CAM.pos, STEPS_CAM.look, STEPS_CAM.fov) } };
      // The lettered boards, from the stills, to lay over the clips that would smear them.
      S.holds = Object.fromEntries(Object.entries(HOLDS).map(([k, poly]) => [k, holdCut(P[k], poly)]));
      S.holds.arrival = holdCut(P.arrival, ARRIVAL.board, ...ARRIVAL.size);
      // The plate's columns the arrival clip leaves out, on their own (so the whole plate need not stay on the GPU).
      S.arrivalStrip = P.arrival && canvas(ARRIVAL.crop, ARRIVAL.size[1], c => c.drawImage(P.arrival, 0, 0, ARRIVAL.crop, ARRIVAL.size[1], 0, 0, ARRIVAL.crop, ARRIVAL.size[1]));
      env.grain = g.createPattern(grainTexture(), 'repeat');
      if (PLATE.on) {                                  // dev: layout renders leave out the people, the hand, the paper and the bus
        const blank = c => Object.assign(canvas(c.width, c.height), { pad: c.pad });
        for (const k of Object.keys(S.aren)) S.aren[k] = blank(S.aren[k]);
        for (const k of ['hand', 'handPinch', 'handShadow', 'handPinchShadow', 'envFront', 'envBack', 'note', 'noteBack', 'ticket', 'bus', 'rimCool', 'rimGreen', 'rimWarm', 'rearBody', 'rearHead']) S[k] = blank(S[k]);
      }
      const built = [];
      for (const make of [buildMessage, buildTravel, buildGhat, buildHouse]) { await breathe(); built.push(make(S)); }
      for (const b of built) if (b.prepare) { await breathe(); b.prepare(); }       // e.g. the house's window cuts
      beats = built;
      // Each plate reaches the GPU now, one per frame while the title screen waits, drawn faintly into the
      // opening's own (still hidden) canvas; otherwise the first frame to show it would stall.
      if (!PLATE.on) {
        fit();
        // The clips' first frames too: the first draw of each video sets up its own path to the GPU. A still
        // that its clip replaces is only a fallback, and is left off the GPU (the canvas's texture cache is
        // finite: filling it with unused plates made it evict and re-upload mid-opening).
        const ready = k => clips[k]?.readyState >= 2, spare = new Set([
          ...(ready('house') ? ['house', 'houseDark'] : []), ...(ready('steps') ? ['steps'] : []), ...(ready('arrival') ? ['arrival'] : [])]);
        const warm = [...Object.entries(P).filter(([k]) => !spare.has(k)).map(([, v]) => v), S.arrivalStrip, ...Object.values(S.holds).filter(Boolean).map(h => h.c),
          ...Object.values(clips).filter(v => v.readyState >= 2)].filter(Boolean);
        for (const img of warm) { await breathe(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = .004; g.drawImage(img, 0, 0, cv.width, cv.height); }
        g.globalAlpha = 1; g.clearRect(0, 0, cv.width, cv.height);
      }
    })();
    return prepared;
  }
  // Called by the director at Begin, after it has already moved the game to the veranda: if the
  // build is still running, the screen goes black at once rather than showing the veranda early.
  function prepare() {
    if (state.phase === 'opening' && !state.liveOpening) {
      mount(); fit(); cv.style.display = 'block';
      g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#000'; g.fillRect(0, 0, cv.width, cv.height);
    }
    return Promise.all([build(), prepareHandoff()]);
  }
  // Step 13C: the Step 13 house, loaded alongside the illustrations (the arrival falls back to 13B's if it fails).
  let handoffPrep = null;
  function prepareHandoff() {
    if (!handoff3d || PLATE.on) return Promise.resolve();
    return handoffPrep ??= handoff3d.prepareHandoff().then(() => { h3 = handoff3d; }, e => console.warn('Opening: the 3D handoff is unavailable; the painted arrival plays', e));
  }
  function begin() {
    mount(); fit(); cv.style.display = 'block'; paused = false; snapTaken = false; styled = null; job = null; into3d = false;
    state.liveOpening = true; opaque = true;
  }
  // Step 13C: the opening plays once, so as the film moves on each beat's paintings and clips are let go
  // (at the white-out, the tunnel's black, under the leaves): the integrated GPU is not carrying the whole
  // film when the 3D house arrives. Only in live playback (the director passes the beat's length); review
  // scrubbing keeps everything.
  const ONLY = [
    { plates: ['desk', 'deskSoft', 'paper'], clips: ['desk'] },
    { plates: ['carriage', 'carriageFront', 'landFar', 'landMid', 'landNear', 'frame2b', 'tunnel'], clips: [] },
    {},                                                             // (the ghat beat is drawn in code)
    { plates: ['house', 'houseDark', 'upper', 'upperLit', 'steps'], clips: ['house', 'steps'] }
  ];
  function release({ plates = [], clips = [] }) {
    if (!S) return;
    for (const k of plates) { const b = S.P[k]; if (b) { delete S.P[k]; b.close?.(); } }
    for (const k of clips) { const v = S.clips[k]; if (v) { delete S.clips[k]; v.pause(); v.removeAttribute('src'); v.load(); } }
  }
  function play(i, seconds) {
    beat = i; T = 0; handoff = null; opaque = true;
    if (seconds !== undefined && i > 0) release(ONLY[i - 1]);
  }

  // ---------------------------------------------------------------- the arrival: meeting the game
  const tmp = new THREE.Vector3();
  const ARRIVAL_ANCHORS = [[-4, 0, -2], [3, 0, 2.5]];           // world points pinning the painted arrival to the live camera
  function project(x, y, z) { tmp.set(x, y, z).project(ortho); return [(tmp.x + 1) / 2 * cv.width, (1 - tmp.y) / 2 * cv.height]; }
  // Step 13B: the painted arrival (plate 'arrival'), pinned to the live camera by two world anchors. It is
  // used when it covers the whole view; otherwise the game frame is captured and stylised as before.
  function arrivalPlate() {
    const img = S?.P?.arrival; if (!img || PLATE.on) return null;
    const [a, b] = ARRIVAL.world.map(p => project(...p)), [pa, pb] = ARRIVAL.px;
    const s = (b[0] - a[0]) / (pb[0] - pa[0]), ox = a[0] - pa[0] * s, oy = a[1] - pa[1] * s, w = ARRIVAL.size[0] * s, h = ARRIVAL.size[1] * s;
    return ox <= 1 && oy <= 1 && ox + w >= cv.width - 1 && oy + h >= cv.height - 1 ? { img, ox, oy, w, h } : null;
  }
  // Turn a captured game frame into the opening's own language: flat colour steps, an ink line on
  // every strong edge, slightly less saturation. The frame is captured (without Aren) at the house
  // beat's cut to the dark window, then processed in slices over a few dozen frames, never one stall.
  let job = null;
  function startStylize(src) {
    const w = Math.min(1200, src.width), h = Math.round(src.height * w / src.width);
    const c = canvas(w, h, gg => { gg.imageSmoothingQuality = 'high'; gg.drawImage(src, 0, 0, w, h); }), gg = c.getContext('2d');
    const img = gg.getImageData(0, 0, w, h), d = img.data, L = new Float32Array(w * h);
    for (let i = 0, j = 0; i < d.length; i += 4, j++) L[j] = .299 * d[i] + .587 * d[i + 1] + .114 * d[i + 2];
    job = { c, gg, w, h, d, L, Lh: new Float32Array(w * h), B: new Float32Array(w * h), out: gg.createImageData(w, h), y: 0, stage: 0 };
  }
  // Three passes, a few rows per frame: the luminance softened across (1) and down (2), so the game's
  // film grain can't flicker a pixel between colour bands; then (3) bands and ink. `rows` is a budget
  // in full stylise rows (a blur row costs about a third of one).
  function stepStylize(rows) {
    let budget = rows;
    while (job && budget > 0) {
      const { w, h, d, L, Lh, B, out } = job, o = out.data, cost = job.stage < 2 ? 1 / 3 : 1;
      const y0 = job.y, y1 = Math.min(h, y0 + Math.max(1, Math.floor(budget / cost)));
      if (job.stage === 0) {
        for (let y = y0; y < y1; y++) for (let x = 0, r = y * w; x < w; x++) {
          let t = 0; for (let k = -2; k <= 2; k++) t += L[r + Math.min(w - 1, Math.max(0, x + k))]; Lh[r + x] = t / 5;
        }
      } else if (job.stage === 1) {
        for (let y = y0; y < y1; y++) for (let x = 0; x < w; x++) {
          let t = 0; for (let k = -2; k <= 2; k++) t += Lh[Math.min(h - 1, Math.max(0, y + k)) * w + x]; B[y * w + x] = t / 5;
        }
      } else {
        const STEP = 30;
        for (let y = y0; y < y1; y++) {
          const ym = y > 0 ? y - 1 : y, yp = y < h - 1 ? y + 1 : y;
          for (let x = 0; x < w; x++) {
            const xm = x > 0 ? x - 1 : x, xp = x < w - 1 ? x + 1 : x, i = (y * w + x) * 4;
            const a0 = B[ym * w + xm], a1 = B[ym * w + x], a2 = B[ym * w + xp], b0 = B[y * w + xm], b2 = B[y * w + xp], c0 = B[yp * w + xm], c1 = B[yp * w + x], c2 = B[yp * w + xp];
            const gx = a2 + 2 * b2 + c2 - a0 - 2 * b0 - c0, gy = c0 + 2 * c1 + c2 - a0 - 2 * a1 - a2;
            const m = Math.min(1, Math.max(0, (Math.sqrt(gx * gx + gy * gy) - 26) / 44));        // ink on every clear edge
            // Flat shading: brightness in bands (chosen from the softened luminance), each pixel
            // keeping its own hue and lifted or lowered onto its band; a little less saturation.
            const q = B[y * w + x] / STEP, fl = Math.floor(q), fr = (q - fl - .35) / .3, sm = fr <= 0 ? 0 : fr >= 1 ? 1 : fr * fr * (3 - 2 * fr);   // a narrow soft step between bands
            const l1 = (fl + sm) * STEP + STEP * .35, f = Math.min(2.2, l1 / (L[y * w + x] + .5));
            let r = d[i] * f, g2 = d[i + 1] * f, bb = d[i + 2] * f; const lum = (r + g2 + bb) / 3;
            r = lum + (r - lum) * .82; g2 = lum + (g2 - lum) * .82; bb = lum + (bb - lum) * .82;
            o[i] = r * (1 - m) + 21 * m; o[i + 1] = g2 * (1 - m) + 16 * m; o[i + 2] = bb * (1 - m) + 13 * m; o[i + 3] = 255;
          }
        }
      }
      budget -= (y1 - y0) * cost; job.y = y1;
      if (y1 >= h) {
        if (job.stage < 2) { job.stage++; job.y = 0; }
        else { job.gg.putImageData(out, 0, 0); styled = job.c; job = null; }
      }
    }
  }
  function handoffTo(seconds) {
    if (h3) {
      // Step 13C: from the steps painting's own lens, corrected for the cover fit (the part of the design
      // height the window shows), so the 3D frame lies exactly under the painting as it dissolves.
      beat = -1; T = 0; paused = false; opaque = false; handoff = null; into3d = true;
      fade = canvas(cv.width, cv.height);
      // What the steps shot no longer needs (it keeps its own painting, clip and board while it dissolves).
      release({ plates: ['houseDarkPatch', 'branch', 'arrival'], clips: ['arrival'] });
      const crop = Math.min(1, (W0 / H0) / (cv.width / cv.height)), fov = 2 * Math.atan(Math.tan(STEPS_CAM.fov * Math.PI / 360) * crop) * 180 / Math.PI;
      return h3.handoffFrom({ seconds: seconds - DISSOLVE, lead: DISSOLVE, pos: STEPS_CAM.pos, look: STEPS_CAM.look, fov, aren: [1.62, 5.2] });
    }
    beat = -1; T = 0; paused = false; opaque = false;
    // The playable Aren waits on his mark, turned to the door; the illustration hides him until it
    // resolves. The first rendered frame is captured (without him) for the illustrated version.
    world.place('aren', 1.5, 2.1, 'veranda');
    world.look('aren', { x: 1.55, z: -2.5 }, { back: true });
    if (!snapTaken && !arrivalPlate()) snapWanted = true;          // (only when the house beat was skipped)
    // The last illustrated frame, kept as an image: held over the cut, then risen away from.
    lastFrame = canvas(cv.width, cv.height, c => { c.fillStyle = '#000'; c.fillRect(0, 0, cv.width, cv.height); c.setTransform(view.s, 0, 0, view.s, view.ox, view.oy); beats[3]?.draw(c, 7.8, env); });
    handoff = { seconds, flip: String(actors.aren.facing || '').endsWith('right'), done: null };
    return new Promise(resolve => { handoff.done = resolve; });
  }
  function afterRender(el) {
    if (!snapWanted || !state.liveOpening) return;
    snapWanted = false; snapTaken = true;
    if (PLATE.on) {                                   // dev: the raw frame (no Aren, no rain) and two world anchors, for the painted arrival
      const raw = canvas(el.width, el.height, gg => gg.drawImage(el, 0, 0));
      window.__arrivalRaw = { url: raw.toDataURL('image/png'), size: [el.width, el.height], anchors: ARRIVAL_ANCHORS.map(p => { tmp.set(...p).project(ortho); return [(tmp.x + 1) / 2 * el.width, (1 - tmp.y) / 2 * el.height]; }) };
    }
    startStylize(el);
  }
  // Aren's rear drawing, laid exactly where the playable cutout will stand (its own plane, projected).
  function arenQuad(x, y, z, alpha, flip) {
    const img = S.aren.rear, h = 2.03 / .837, w = 2.03 * img.width / img.height, th = Math.atan2(13, 20);   // the rig's own plane size
    const rx = Math.cos(th) * w / 2, rz = -Math.sin(th) * w / 2, y0 = y + .072;
    const [ax, ay] = project(x - rx, y0 + h, z - rz), [bx, by] = project(x + rx, y0 + h, z + rz), [cx, cy] = project(x - rx, y0, z - rz);
    g.save(); g.globalAlpha = alpha;
    g.setTransform((bx - ax) / img.width, (by - ay) / img.width, (cx - ax) / img.height, (cy - ay) / img.height, ax, ay);
    if (flip) { g.translate(img.width, 0); g.scale(-1, 1); }
    g.drawImage(img, 0, 0); g.restore();
  }
  const PATH = [[1.62, -.82, 6.2], [1.56, -.62, 4.6], [1.55, .06, 3.0], [1.5, 0, 2.1]];
  function walkAt(t) {
    const k = EASE.s(span(t, .25, 2.5)), lens = [0]; for (let i = 1; i < PATH.length; i++) lens.push(lens[i - 1] + Math.hypot(PATH[i][0] - PATH[i - 1][0], PATH[i][2] - PATH[i - 1][2]));
    const s = k * lens[lens.length - 1]; let i = 1; while (i < lens.length - 1 && lens[i] < s) i++;
    const f = (s - lens[i - 1]) / (lens[i] - lens[i - 1]); const a = PATH[i - 1], b = PATH[i];
    return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f, k > 0 && k < 1];
  }
  let mask = null;
  const blots = Array.from({ length: 22 }, (_, i) => { const r = rng(i + 41); return { a: r() * Math.PI * 2, d: r(), s: .4 + r() * .8, delay: r() * .5 }; });
  function drawHandoff() {
    const t = T, W = cv.width, H = cv.height;
    g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
    g.clearRect(0, 0, W, H);
    const art = arrivalPlate();
    if (!art && !styled) { if (lastFrame) g.drawImage(lastFrame, 0, 0); return; }   // hold the last illustrated frame until the capture is ready
    const clip = art && clipAt(S.clips?.arrival, t, env.paused);
    if (clip) {
      // The painted veranda alive (rain in the garden, the lanterns, the shrubs), in the plate's own place.
      const s = art.w / ARRIVAL.size[0], cx = ARRIVAL.crop * s, h = S.holds?.arrival;
      g.drawImage(S.arrivalStrip || art.img, 0, 0, ARRIVAL.crop, ARRIVAL.size[1], art.ox, art.oy, cx, art.h);
      g.drawImage(clip, art.ox + cx, art.oy, art.w - cx, art.h);
      if (h) g.drawImage(h.c, art.ox + h.x * s, art.oy + h.y * s, h.w * s, h.h * s);
    } else if (art) g.drawImage(art.img, art.ox, art.oy, art.w, art.h);
    else g.drawImage(styled, 0, 0, W, H);
    const [ax, ay, az, moving] = walkAt(t);
    const bob = moving ? Math.abs(Math.sin(t * 9)) * .05 : 0;
    arenQuad(ax, ay + bob, az, 1, handoff.flip);
    // Coming in: the last illustrated frame rises away from Aren into the game's own framing,
    // uncovering him (drawn beneath it) at the foot of the steps.
    const rise = EASE.in(span(t, 0, .9));
    if (rise < 1 && lastFrame) {
      const [fx, fy] = project(1.62, .4, 5.4), sc = 1 - rise * .88;
      g.save(); g.globalAlpha = 1 - rise; g.setTransform(sc, 0, 0, sc, (1 - sc) * fx, (1 - sc) * fy); g.drawImage(lastFrame, 0, 0); g.restore();
    }
    if (rise >= 1) lastFrame = null;
    g.setTransform(view.s, 0, 0, view.s, view.ox, view.oy);
    rain(g, t, { n: 220, len: 60, speed: 1500, alpha: .22, seed: 17 });
    grain(g, env.grain, .14, t);
    // Resolve: the illustration clears outward from Aren, in ink-like blots, into the living scene.
    const r = span(t, 2.9, 4.9);
    if (r > 0) {
      // The mask is painted small (a quarter of the frame) and laid over at full size.
      const Q = 4, mw = Math.ceil(W / Q), mh = Math.ceil(H / Q);
      if (!mask || mask.width !== mw || mask.height !== mh) mask = canvas(mw, mh);
      const mg = mask.getContext('2d'); mg.setTransform(1, 0, 0, 1, 0, 0); mg.clearRect(0, 0, mw, mh);
      const [px, py] = project(1.5, 1.2, 2.1), R = Math.hypot(mw, mh) * 1.05;
      for (const b of blots) {
        const k = EASE.in(span(r, b.delay * .6, 1)); if (k <= 0) continue;
        const cx = px / Q + Math.cos(b.a) * b.d * R * .45 * k, cy = py / Q + Math.sin(b.a) * b.d * R * .35 * k, rad = R * b.s * k;
        const gr = mg.createRadialGradient(cx, cy, rad * .55, cx, cy, rad); gr.addColorStop(0, 'rgba(0,0,0,1)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
        mg.fillStyle = gr; mg.fillRect(cx - rad, cy - rad, rad * 2, rad * 2);
      }
      const all = EASE.in(span(r, .7, 1)); if (all > 0) { mg.fillStyle = `rgba(0,0,0,${all})`; mg.fillRect(0, 0, mw, mh); }
      g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'destination-out'; g.drawImage(mask, 0, 0, W, H);
      g.globalCompositeOperation = 'source-over';
    }
    if (t >= handoff.seconds && handoff.done) { const d = handoff.done; handoff.done = null; d(); }
  }

  // Step 13C: the steps shot keeps living (rain, mist, its clip) while it dissolves into the 3D view beneath;
  // the 3D rain is already falling there. Then the canvas is clear and the Step 13 move carries on alone.
  function drawInto3d() {
    g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, cv.width, cv.height);
    const a = 1 - EASE.s(span(T, 0, DISSOLVE));
    if (a <= 0 || !fade) { fade = null; return; }
    const f = fade.getContext('2d');
    f.setTransform(1, 0, 0, 1, 0, 0); f.globalAlpha = 1; f.globalCompositeOperation = 'source-over';
    f.fillStyle = '#000'; f.fillRect(0, 0, fade.width, fade.height);
    f.setTransform(view.s, 0, 0, view.s, view.ox, view.oy);
    beats[3]?.draw(f, 7.8 + T, env);
    g.globalAlpha = a; g.drawImage(fade, 0, 0); g.globalAlpha = 1;
  }
  function draw() {
    g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'; g.filter = 'none';
    env.paused = paused;
    if (into3d) { drawInto3d(); settleClips(S?.clips); return; }
    if (handoff) { drawHandoff(); settleClips(S?.clips); return; }
    g.fillStyle = '#000'; g.fillRect(0, 0, cv.width, cv.height);
    const b = beats[beat]; if (!b) return;
    g.setTransform(view.s, 0, 0, view.s, view.ox, view.oy);
    b.draw(g, T, env);
    settleClips(S?.clips);
  }
  function update(dt, envTime) {
    if (!state.liveOpening) return;
    if (!paused) T += dt;
    // The playable veranda (and the 3D handoff's house over it) first appear at the arrival. Their shaders
    // compile in the background while the message's white-out holds the screen (or at the next cut if skipped).
    if (!warmed && !paused && (beat > 0 || (beat === 0 && T >= 10))) { warmed = true; renderer.compileAsync?.(scene, ortho).catch(() => {}); h3?.warmHandoff(); }
    // One hidden 3D frame at the cut into the dark-window insert: the capture for the 13B arrival (the 3D handoff needs none).
    if (!h3 && beat === 3 && T >= 4.62 && !snapTaken && !snapWanted && !arrivalPlate()) snapWanted = true;
    if (into3d) h3.update(dt, envTime);
    if (snapWanted) {
      actors.aren.mesh.visible = false; actors.aren.shadow.visible = false;
      if (PLATE.on) rooms.veranda.root.traverse(o => { if (o.isMesh && o.material?.uniforms?.intensity && o.material.uniforms.flash) o.visible = false; });
    }
    if (job) stepStylize(handoff ? 100000 : 70);
    draw();
  }
  function finish() {
    if (into3d) { into3d = false; fade = null; h3.finish(); }
    for (const v of Object.values(S?.clips || {})) v.pause();
    cv.style.display = 'none'; state.liveOpening = false; handoff = null; beat = -1; opaque = false; paused = false;
    styled = null; lastFrame = null; mask = null; job = null; snapWanted = false; cv.width = cv.height = 1;
  }
  async function scrub(i, t) {
    await build();
    if (!state.liveOpening) begin();
    await prepareHandoff();
    if (i >= 4 && h3) { handoffTo(HANDOFF_3D.seconds); paused = true; T = t; h3.hold(t); draw(); return { shot: i, t }; }
    if (i >= 4) { handoffTo(opening2DHandoff.seconds); await new Promise(r => setTimeout(r, 150)); stepStylize(1e6); }
    else play(i);
    paused = true; T = t; draw();
    return { shot: i, t };
  }
  addEventListener('resize', () => { if (state.liveOpening) fit(); });
  (window.requestIdleCallback || (cb => setTimeout(cb, 600)))(() => { build(); prepareHandoff(); }, { timeout: 3000 });
  return {
    get camera() { return into3d ? h3.camera : ortho; }, shots: opening2D,
    get handoffShot() { return h3 ? HANDOFF_3D : opening2DHandoff; },
    prepare, begin, play, handoffTo, finish, update, scrub, afterRender,
    peek() {}, clock: () => T, arenTint: () => into3d ? h3.arenTint() : null,
    get opaque() { return state.liveOpening && opaque && !snapWanted; }, get active() { return !!state.liveOpening; }
  };
}
