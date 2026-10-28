import * as THREE from 'three';
import { CHARACTERS } from '../src/config.js';
import { bus } from '../src/events.js';
import { Kart, resolveKartCollisions } from '../src/kart.js';
import { AIDriver } from '../src/ai.js';
import { InputController } from '../src/input.js';
import { createStubTrack, createStubModel } from './stub-track.js';

const params = new URLSearchParams(location.search);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x88bbff);
scene.add(new THREE.HemisphereLight(0xffffff, 0x446644, 1.2));
const sun = new THREE.DirectionalLight(0xffffff, 1.5); sun.position.set(50, 100, 30); scene.add(sun);
const camera = new THREE.PerspectiveCamera(65, innerWidth / innerHeight, 0.1, 3000);

let track;
if (params.get('real')) {
  const mod = await import('../src/track.js');
  track = mod.createTrack(scene, renderer);
} else track = createStubTrack(scene);

const modelsMod = params.get('models') ? await import('../src/models.js') : null;
const counts = {};
for (const ev of ['kart:driftStart','kart:driftLevel','kart:driftEnd','kart:miniTurbo','kart:boost','kart:hit','kart:wallBump','kart:jump','kart:land','kart:bump','kart:respawn','kart:trick','kart:stall']) {
  bus.on(ev, (d) => { const k = d?.kart ?? d?.a; const key = ev + (k ? '#' + k.index : ''); counts[key] = (counts[key] || 0) + 1; counts[ev] = (counts[ev] || 0) + 1; window.lastEvents.push([ev, k?.index, d?.level ?? d?.source ?? d?.kind ?? '']); if (window.lastEvents.length > 300) window.lastEvents.shift(); });
}
window.lastEvents = [];
window.counts = counts;

const input = new InputController();
const karts = [];
const ais = [];
const diff = params.get('diff') || 'normal';
const playerAI = params.get('playerAI') !== '0';
for (let i = 0; i < 8; i++) {
  const ch = CHARACTERS[i];
  const model = modelsMod ? modelsMod.createKartModel(ch) : createStubModel(ch);
  const k = new Kart({ scene, track, character: ch, isPlayer: i === 0, index: i, model });
  const sp = track.startPositions[(i + 3) % 8];
  k.reset(sp.position, sp.heading);
  karts.push(k);
  if (i > 0 || playerAI) ais.push(new AIDriver(k, track, { difficulty: diff }));
}
const player = karts[0];
const ctx = { karts, player, itemSystem: { getHazards: () => window.hazards || [] }, time: 0 };
window.karts = karts; window.ais = ais; window.track = track; window.player = player; window.bus = bus; window.input = input;
window.manual = false; // when true, player driven by window.playerInput
window.playerInput = null;
window.useKeyboard = params.get('kb') === '1';

// mini race manager
const lapState = karts.map(() => ({ lap: 0, lastT: null, half: false, lapTimes: [], lapStart: 0 }));
let simTime = 0;
function race(dt) {
  for (let i = 0; i < karts.length; i++) {
    const k = karts[i], s = lapState[i];
    const t = k.trackT;
    if (s.lastT !== null) {
      if (t > 0.4 && t < 0.6) s.half = true;
      if (s.lastT > 0.85 && t < 0.15 && s.half) { s.lap++; s.half = false; s.lapTimes.push(+(simTime - s.lapStart).toFixed(2)); s.lapStart = simTime; }
      if (s.lastT < 0.15 && t > 0.85 && s.lap === 0 && !s.half) {/* grid */}
    }
    s.lastT = t;
    k.lap = s.lap;
    k.raceProgress = s.lap + (s.lap === 0 && t > 0.5 && !s.half ? t - 1 : t);
  }
  const order = [...karts].sort((a, b) => b.raceProgress - a.raceProgress);
  order.forEach((k, i) => k.place = i + 1);
}
window.lapState = lapState;

function step(dt) {
  simTime += dt; ctx.time = simTime;
  if (window.manual) player.input = { ...(window.playerInput || {}) };
  else if (window.useKeyboard) player.input = player.controlsLocked ? player.input : input.getInput();
  for (const ai of ais) { if (ai.kart === player && (window.manual || window.useKeyboard)) continue; ai.update(dt, ctx); }
  window.afterAI?.();
  for (const k of karts) k.update(dt);
  resolveKartCollisions(karts);
  race(dt);
  if (window.manual && window.playerInput) window.playerInput.item = false;
}
window.step = step;
window.sim = (seconds, dt = 1 / 60) => { const n = Math.round(seconds / dt); for (let i = 0; i < n; i++) step(dt); return summary(); };
function summary() {
  return karts.map((k, i) => ({ i, name: k.character.name, lap: lapState[i].lap, t: +k.trackT.toFixed(3), place: k.place, speed: +k.speed.toFixed(1), laps: lapState[i].lapTimes, resp: counts['kart:respawn#' + i] || 0, wall: counts['kart:wallBump#' + i] || 0, mt: counts['kart:miniTurbo#' + i] || 0 }));
}
window.summary = summary;
window.simTime = () => simTime;

let live = params.get('live') !== '0';
window.setLive = (v) => { live = v; };
const clock = new THREE.Clock();
const camPos = new THREE.Vector3(); const hud = document.getElementById('hud');
function frame() {
  requestAnimationFrame(frame);
  const dt = Math.min(clock.getDelta(), 1 / 30);
  if (live) step(dt);
  const f = player.forward;
  const want = player.position.clone().addScaledVector(f, -9).add(new THREE.Vector3(0, 4, 0));
  camPos.lerp(want, 0.15); camera.position.copy(camPos);
  camera.lookAt(player.position.clone().addScaledVector(f, 4).add(new THREE.Vector3(0, 1, 0)));
  renderer.render(scene, camera);
  hud.textContent = `t=${simTime.toFixed(1)} spd=${player.speed.toFixed(1)} top=${player.topSpeed.toFixed(1)} surf=${player.surface} drift=${player.drifting}${player.driftDir} lvl=${player.driftLevel} boost=${player.boostTimer.toFixed(2)} air=${player.airborne} lap=${lapState[0].lap} place=${player.place}`;
}
frame();
window.ready = true;
window.driftStats = (secs = 60) => {
  const reasons = {}; const durs = []; const starts = new Map(); const levels = [0, 0, 0, 0];
  const u1 = bus.on('kart:driftStart', d => starts.set(d.kart, simTime));
  const u2 = bus.on('kart:driftEnd', d => { durs.push(+(simTime - starts.get(d.kart)).toFixed(2)); levels[d.level]++; const ai = ais.find(a => a.kart === d.kart); const r = (ai?.lastDriftRelease || 'kart') + (d.kart.speed < 8 ? '-slow' : ''); reasons[r] = (reasons[r] || 0) + 1; if (ai) ai.lastDriftRelease = null; });
  const s = sim(secs); u1(); u2();
  const avg = durs.reduce((a, b) => a + b, 0) / Math.max(1, durs.length);
  return { reasons, n: durs.length, avgDur: +avg.toFixed(2), levels, laps: s.map(k => k.laps.join('/')), resp: s.map(k => k.resp).join(','), wall: s.map(k => k.wall).join(',') };
};
window.trace = (ki, secs = 20) => { const ai = ais.find(a => a.kart === karts[ki]); const out = []; const n = Math.round(secs * 60); for (let i = 0; i < n; i++) { step(1 / 60); if (karts[ki].drifting && ai.dbg && i % 3 === 0) out.push([i, +ai.dbg.into.toFixed(2), +ai.dbg.errV.toFixed(2), +ai.dbg.cornerNear.toFixed(2), ai.dbg.lvl, +karts[ki].speed.toFixed(1)]); } return out; };
window.flatTrack = { roadWidth: 24, length: 1000, getSurfaceInfo: (p) => ({ height: 0, normal: new THREE.Vector3(0, 1, 0), surface: window.flatSurface || 'road', t: 0.5, lateral: 0, onRoad: true }), resolveWall: () => null, getPointAt: () => new THREE.Vector3(), getTangentAt: () => new THREE.Vector3(0, 0, 1) };
window.soloTest = (fn) => {
  const k = player; window.manual = true; k.track = flatTrack; k.reset(new THREE.Vector3(0, 0, 0), 0);
  const ev = []; let t = 0;
  const names = ['kart:driftStart', 'kart:driftLevel', 'kart:driftEnd', 'kart:miniTurbo', 'kart:boost', 'kart:hop', 'kart:hit', 'kart:jump', 'kart:land', 'kart:respawn', 'kart:trick', 'kart:stall'];
  const u = names.map(n => bus.on(n, d => { if (d.kart === k) ev.push([n.slice(5), +t.toFixed(2), d.level ?? d.source ?? d.kind ?? d.dir ?? '']); }));
  const run = (secs, inp, each) => { window.playerInput = { throttle: 0, brake: 0, steer: 0, drift: false, ...inp }; const n = Math.round(secs * 60); for (let i = 0; i < n; i++) { player.input = { ...window.playerInput }; player.update(1 / 60); t += 1 / 60; each?.(k); } };
  const res = fn(k, run);
  u.forEach(f => f());
  return { res, ev };
};
window.THREE = THREE;
window.resolveKartCollisions_ = resolveKartCollisions;
