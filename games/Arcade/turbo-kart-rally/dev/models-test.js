import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createKartModel, createItemModel, createCharacterPortrait } from '../src/models.js';
import { ChaseCamera } from '../src/camera.js';
import { CHARACTERS } from '../src/config.js';
import { bus } from '../src/events.js';

const params = new URLSearchParams(location.search);
const view = params.get('view') || 'showroom';

const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(2, devicePixelRatio));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8ec5ff);
scene.fog = new THREE.Fog(0x8ec5ff, 60, 180);
const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 500);
camera.position.set(0, 5, 14);

scene.add(new THREE.HemisphereLight(0xcfe8ff, 0x5a6b3a, 1.3));
const sun = new THREE.DirectionalLight(0xfff1d6, 2.6);
sun.position.set(12, 20, 10);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -30, right: 30, top: 30, bottom: -30, near: 1, far: 80 });
sun.shadow.bias = -0.0005; sun.shadow.normalBias = 0.02;
scene.add(sun);

const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.MeshStandardMaterial({ color: 0x6f9a4a, roughness: 0.95 }));
ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
const road = new THREE.Mesh(new THREE.RingGeometry(26, 40, 96), new THREE.MeshStandardMaterial({ color: 0x55585f, roughness: 0.85 }));
road.rotation.x = -Math.PI / 2; road.position.y = 0.01; road.receiveShadow = true; scene.add(road);
for (let i = 0; i < 48; i++) {
  const a = i / 48 * Math.PI * 2;
  const m = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1, 1.2), new THREE.MeshStandardMaterial({ color: i % 2 ? 0xffffff : 0xe53935 }));
  m.position.set(Math.cos(a) * 41, 0.5, Math.sin(a) * 41); m.castShadow = true; scene.add(m);
}

const pdiv = document.getElementById('portraits');
CHARACTERS.forEach((c) => { const img = new Image(); img.src = createCharacterPortrait(c); img.title = c.name; pdiv.appendChild(img); });

const models = CHARACTERS.map((c) => createKartModel(c));
const karts = [];
const items = [];
let controls = null;
let chase = null;
let fakeKart = null;
const state = { steerMode: params.get('steer') || 'sweep', speed: +(params.get('speed') || 25), drift: params.get('drift') === '1', star: params.get('star') === '1', spin: 0, boost: false, air: false, paused: false };
window.__state = state;

if (view === 'showroom' || view === 'close') {
  models.forEach((m, i) => {
    const g = new THREE.Group();
    g.add(m.root);
    const col = i % 4, row = Math.floor(i / 4);
    g.position.set((col - 1.5) * 3.2, 0, row * -4.2);
    g.rotation.y = 0.5;
    scene.add(g);
    karts.push({ g, m });
  });
  const types = ['item_box', 'banana', 'green_shell', 'red_shell', 'blue_shell', 'mushroom', 'star', 'lightning', 'triple_mushroom'];
  types.forEach((t, i) => {
    const o = createItemModel(t);
    o.position.set((i - 4) * 2.2, t === 'item_box' ? 1.2 : t === 'star' || t === 'lightning' ? 0.8 : 0, 5);
    scene.add(o);
    items.push(o);
  });
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.8, 0);
  camera.position.set(0, 6, 16);
  controls.update();
} else if (view === 'cam') {
  const m = models[+(params.get('char') || 0)];
  const g = new THREE.Group();
  g.add(m.root);
  scene.add(g);
  fakeKart = { object3D: g, position: g.position, velocity: new THREE.Vector3(), heading: 0, speed: 0, drifting: false, driftDir: 1, boostTimer: 0, starTimer: 0, airborne: false, groundNormal: new THREE.Vector3(0, 1, 0), m };
  // other karts around
  models.forEach((mm, i) => { if (mm === m) return; const gg = new THREE.Group(); gg.add(mm.root); gg.userData.a0 = i * 0.5; scene.add(gg); karts.push({ g: gg, m: mm, circ: true }); });
  camera.fov = 70; camera.near = 0.1; camera.updateProjectionMatrix();
  chase = new ChaseCamera(camera);
  window.__chase = chase;
  window.__bus = bus;
  window.__kart = fakeKart;
}

window.__setCam = (x, y, z, tx, ty, tz) => { camera.position.set(x, y, z); if (controls) { controls.target.set(tx, ty, tz); controls.update(); } else camera.lookAt(tx, ty, tz); };
window.__models = models; window.__items = items;

const clock = new THREE.Clock();
let t = 0;
const R = 33;
let angle = 0;
function tick() {
  const dt = Math.min(clock.getDelta(), 1 / 30);
  if (!state.paused) t += dt;
  const steer = state.steerMode === 'sweep' ? Math.sin(t * 1.2) : +state.steerMode;
  karts.forEach(({ g, m, circ }, i) => {
    if (circ) {
      const a = t * 0.9 + g.userData.a0;
      g.position.set(Math.cos(a) * (R + (i % 3) * 3 - 3), 0, Math.sin(a) * (R + (i % 3) * 3 - 3));
      g.rotation.y = -a + Math.PI;
      m.animate({ dt, speed: 30, steer: 0.3, drifting: false, driftDir: 1, time: t });
    } else {
      m.animate({ dt, speed: state.speed, steer, drifting: state.drift, driftDir: steer >= 0 ? 1 : -1, boosting: state.boost, airborne: state.air, spin: state.spin, star: state.star, time: t + i });
    }
  });
  items.forEach((o, i) => { o.rotation.y = t * 1.2 + i; });
  if (fakeKart) {
    // drive around a circle; drift periodically
    const speed = 34;
    const w = speed / R;
    const phase = (t % 10);
    const drifting = phase > 4 && phase < 7.5;
    angle += w * dt;
    const k = fakeKart;
    k.position.set(Math.cos(angle) * R, Math.max(0, Math.sin(t * 0.7) > 0.97 ? 1.5 : 0), Math.sin(angle) * R);
    const velYaw = Math.atan2(-Math.sin(angle), Math.cos(angle)); // CCW travel direction
    k.velocity.set(Math.sin(velYaw) * speed, 0, Math.cos(velYaw) * speed);
    k.heading = velYaw + (drifting ? 0.35 : 0.08);
    k.object3D.rotation.y = k.heading;
    k.speed = speed; k.drifting = drifting; k.driftDir = 1;
    k.m.animate({ dt, speed, steer: drifting ? 1 : 0.5, drifting, driftDir: 1, boosting: false, airborne: false, time: t });
    chase.update(dt, k, { mode: params.get('mode') || 'race', lookBack: params.get('lookback') === '1' });
  }
  controls?.update();
  renderer.render(scene, camera);
  document.getElementById('info').textContent = `calls ${renderer.info.render.calls} tris ${renderer.info.render.triangles}`;
  requestAnimationFrame(tick);
}
tick();
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });
