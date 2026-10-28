import * as THREE from 'three';
import { bus } from '../src/events.js';
import { ItemSystem } from '../src/items.js';
import { Effects } from '../src/effects.js';
import { createStubTrack, StubKart } from './items-stubs.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(2, devicePixelRatio));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87c8ff);
scene.fog = new THREE.Fog(0x87c8ff, 150, 450);
const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 1000);
scene.add(new THREE.HemisphereLight(0xffffff, 0x446633, 1.2));
const sun = new THREE.DirectionalLight(0xffffff, 2); sun.position.set(50, 100, 30); scene.add(sun);
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); });

const track = createStubTrack(scene);
const colors = [0xe53935, 0x43a047, 0xf06292, 0x1e88e5, 0x2e7d32, 0xfdd835, 0x00acc1, 0x8e24aa];
const karts = [];
for (let i = 0; i < 8; i++) {
  karts.push(new StubKart({ scene, track, index: i, color: colors[i], isPlayer: i === 3, t: 0.02 + (7 - i) * 0.012, lane: ((i % 4) - 1.5) * 4, speed: 26 + i * 0.3 }));
}
const items = new ItemSystem({ scene, track, karts });
const fx = new Effects(scene, camera);
const events = [];
for (const n of ['item:pickup','item:roulette','item:got','item:use','item:hit','item:explode','item:lightning','kart:hit'])
  bus.on(n, (d) => events.push(n + (d?.item ? ':' + d.item : '') + (d?.kart ? '#' + d.kart.index : '')));

let camMode = 'chase';
let camTarget = karts[3];
let camFixed = null;
const clock = new THREE.Clock();
let time = 0;
let paused = false;
function updatePlaces() {
  const sorted = [...karts].sort((a, b) => b.raceProgress - a.raceProgress);
  sorted.forEach((k, i) => (k.place = i + 1));
}
const info = document.getElementById('info');
function frame() {
  const dt = Math.min(clock.getDelta(), 1 / 30);
  if (!paused) step(dt);
  requestAnimationFrame(frame);
}
function step(dt) {
  time += dt;
  for (const k of karts) k.update(dt);
  updatePlaces();
  items.update(dt, time);
  for (const k of karts) k.input.item = false;
  fx.update(dt, karts);
  const k = camTarget;
  if (camFixed) { camera.position.copy(camFixed.pos); camera.lookAt(camFixed.look); }
  else if (camMode === 'chase') {
    const f = k.forward;
    camera.position.set(k.position.x - f.x * 7, 3.2, k.position.z - f.z * 7);
    camera.lookAt(k.position.x + f.x * 4, 1.2, k.position.z + f.z * 4);
  } else {
    camera.position.set(0, 230, 1); camera.lookAt(0, 0, 0);
  }
  renderer.render(scene, camera);
  const rs = items.rouletteState(karts[3]);
  info.textContent = `player place ${karts[3].place} item ${karts[3].item} x${karts[3].itemCount} roulette ${rs.spinning} ${rs.displayItem}\nentities ${items.entities.length} hazards ${items.getHazards().length}\n` + events.slice(-8).join('\n');
}
requestAnimationFrame(frame);

window.T = {
  THREE, karts, items, fx, track, events, camera, scene, renderer, bus,
  give(i, item, count = 1) { karts[i].item = item; karts[i].itemCount = count; },
  use(i, opts = {}) { Object.assign(karts[i].input, opts); karts[i].input.item = true; },
  cam(mode, target) { camMode = mode; camFixed = null; if (target != null) camTarget = karts[target]; },
  fixCam(pos, look) { camFixed = { pos: new THREE.Vector3(...pos), look: new THREE.Vector3(...look) }; },
  pause(p) { paused = p; },
  step(n = 1, dt = 1 / 60) { for (let i = 0; i < n; i++) step(dt); },
  spawnBoxAll() {},
};
addEventListener('keydown', (e) => {
  const map = { Digit1: 'mushroom', Digit2: 'triple_mushroom', Digit3: 'banana', Digit4: 'green_shell', Digit5: 'red_shell', Digit6: 'star', Digit7: 'lightning', Digit8: 'blue_shell' };
  if (map[e.code]) T.give(3, map[e.code], map[e.code] === 'triple_mushroom' ? 3 : 1);
  if (e.code === 'KeyE') T.use(3);
  if (e.code === 'KeyC') karts[3].input.lookBack = !karts[3].input.lookBack;
  if (e.code === 'KeyV') T.cam(camMode === 'chase' ? 'top' : 'chase');
  if (e.code === 'KeyD') { karts[3].drifting = !karts[3].drifting; }
  if (e.code === 'KeyL') karts[3].driftLevel = (karts[3].driftLevel + 1) % 4;
});
