import * as THREE from 'three';

const canvas = document.getElementById('game-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a1622);
scene.fog = new THREE.Fog(0x0a1622, 60, 220);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 600);
camera.position.set(0, 18, 26);
camera.lookAt(0, 0, 0);

// Lights
const hemi = new THREE.HemisphereLight(0x9fd3ff, 0x123, 0.9);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffe6b0, 1.4);
sun.position.set(20, 40, 20);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
sun.shadow.camera.left = -60; sun.shadow.camera.right = 60;
sun.shadow.camera.top = 60; sun.shadow.camera.bottom = -60;
scene.add(sun);

// Ocean
const oceanGeo = new THREE.PlaneGeometry(800, 800, 60, 60);
oceanGeo.rotateX(-Math.PI / 2);
const oceanMat = new THREE.MeshStandardMaterial({ color: 0x1b6ca8, metalness: 0.3, roughness: 0.55 });
const ocean = new THREE.Mesh(oceanGeo, oceanMat);
ocean.receiveShadow = true;
scene.add(ocean);
const oceanBase = oceanGeo.attributes.position.array.slice();

// Ship
const ship = new THREE.Group();
const hullMat = new THREE.MeshStandardMaterial({ color: 0x6b3f1d, roughness: 0.8 });
const hull = new THREE.Mesh(new THREE.BoxGeometry(3, 1.4, 6), hullMat);
hull.position.y = 0.6; hull.castShadow = true;
ship.add(hull);
const deck = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.3, 5), new THREE.MeshStandardMaterial({ color: 0x8a5a2b }));
deck.position.y = 1.35; ship.add(deck);
const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 7), new THREE.MeshStandardMaterial({ color: 0x4a2f14 }));
mast.position.y = 4; ship.add(mast);
const sailMat = new THREE.MeshStandardMaterial({ color: 0xf4f1e0, side: THREE.DoubleSide });
const sail = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 4), sailMat);
sail.position.set(0, 4, 0); ship.add(sail);
const flag = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.7), new THREE.MeshStandardMaterial({ color: 0xe63946, side: THREE.DoubleSide }));
flag.position.set(0.7, 7, 0); ship.add(flag);
scene.add(ship);

// Collections
let coins = [];
let rocks = [];

function spawnCoin(z) {
  const g = new THREE.Group();
  const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.9),
    new THREE.MeshStandardMaterial({ color: 0xf2c14e, emissive: 0x5a4200, metalness: 0.6, roughness: 0.3 }));
  star.position.y = 2.4; g.add(star);
  const x = (Math.random() - 0.5) * 30;
  g.position.set(x, 0, z);
  g.userData.spin = star;
  scene.add(g);
  coins.push(g);
}

function spawnRock(z) {
  const r = 1.2 + Math.random() * 1.6;
  const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(r, 0),
    new THREE.MeshStandardMaterial({ color: 0x6b5d52, roughness: 1, flatShading: true }));
  rock.position.set((Math.random() - 0.5) * 32, r * 0.4, z);
  rock.castShadow = true;
  scene.add(rock);
  rocks.push(rock);
}

// Game state
const state = { running: false, hp: 100, score: 0, distance: 0, time: 0, speed: 14, steer: 0, throttle: 0 };

const keys = {};
window.addEventListener('keydown', e => {
  keys[e.code] = true;
  if (e.code === 'Space') {
    e.preventDefault();
    if (!state.running && !document.getElementById('gameover-screen').classList.contains('hidden') === false) {
      if (titleEl.style.display !== 'none' || !gameOverShown) startGame();
      else if (gameOverShown) restart();
    } else if (!state.running) {
      startGame();
    }
  }
});
window.addEventListener('keyup', e => { keys[e.code] = false; });

// UI refs
const titleEl = document.getElementById('title-screen');
const hudEl = document.getElementById('hud');
const overEl = document.getElementById('gameover-screen');
let gameOverShown = false;

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', restart);

function resetWorld() {
  coins.forEach(c => scene.remove(c)); rocks.forEach(r => scene.remove(r));
  coins = []; rocks = [];
  for (let i = 0; i < 8; i++) spawnCoin(-40 - i * 22);
  for (let i = 0; i < 6; i++) spawnRock(-55 - i * 26);
  ship.position.set(0, 0, 0);
  ship.rotation.y = 0;
}

function startGame() {
  Object.assign(state, { running: true, hp: 100, score: 0, distance: 0, time: 0, speed: 14, steer: 0, throttle: 0 });
  titleEl.style.display = 'none';
  overEl.classList.add('hidden');
  hudEl.classList.remove('hud-hidden');
  gameOverShown = false;
  resetWorld();
  updateHUD();
}

function restart() { startGame(); }

function endGame() {
  state.running = false;
  gameOverShown = true;
  hudEl.classList.add('hud-hidden');
  overEl.classList.remove('hidden');
  document.getElementById('end-score').textContent = state.score;
  document.getElementById('end-distance').textContent = Math.floor(state.distance);
  document.getElementById('end-time').textContent = Math.floor(state.time);
  document.getElementById('end-title').textContent = state.hp <= 0 ? '船毁人亡' : '远征凯旋';
  document.getElementById('end-icon').textContent = state.hp <= 0 ? '💥' : '🏆';
}

function updateHUD() {
  document.getElementById('score').textContent = state.score;
  document.getElementById('hp-text').textContent = Math.max(0, Math.floor(state.hp));
  document.querySelector('#hp-bar').style.width = Math.max(0, state.hp) + '%';
  document.getElementById('distance').textContent = Math.floor(state.distance);
  document.getElementById('time').textContent = Math.floor(state.time);
}

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;

  // Ocean waves
  const pos = oceanGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = oceanBase[i * 3], z = oceanBase[i * 3 + 2];
    pos.array[i * 3 + 1] = Math.sin(x * 0.05 + t * 1.2) * 0.6 + Math.cos(z * 0.05 + t) * 0.6;
  }
  pos.needsUpdate = true;
  oceanGeo.computeVertexNormals();

  if (state.running) {
    state.time += dt;
    const left = keys['ArrowLeft'] || keys['KeyA'];
    const right = keys['ArrowRight'] || keys['KeyD'];
    const up = keys['ArrowUp'] || keys['KeyW'];
    const down = keys['ArrowDown'] || keys['KeyS'];

    state.speed = THREE.MathUtils.clamp(state.speed + (up ? 10 : down ? -10 : 0) * dt, 6, 26);
    const steerTarget = (left ? 1 : 0) - (right ? 1 : 0);
    state.steer = THREE.MathUtils.lerp(state.steer, steerTarget, dt * 4);
    ship.rotation.y = THREE.MathUtils.lerp(ship.rotation.y, state.steer * 0.5, dt * 4);

    const move = state.speed * dt;
    ship.position.x += Math.sin(ship.rotation.y) * move;
    ship.position.z -= Math.cos(ship.rotation.y) * 0; // forward along world -z
    state.distance += move;
    ship.position.x = THREE.MathUtils.clamp(ship.position.x, -34, 34);
    ship.position.y = Math.sin(t * 2) * 0.2;
    sail.rotation.y = Math.sin(t * 1.5) * 0.15;

    // Coins
    for (let i = coins.length - 1; i >= 0; i--) {
      const c = coins[i];
      c.userData.spin.rotation.y += dt * 3;
      c.position.z += move;
      if (c.position.z > 12) { scene.remove(c); coins.splice(i, 1); spawnCoin(-200 - Math.random() * 40); continue; }
      if (c.position.distanceTo(ship.position) < 3.2) {
        state.score++; scene.remove(c); coins.splice(i, 1);
        spawnCoin(-200 - Math.random() * 40); updateHUD();
      }
    }
    // Rocks
    for (let i = rocks.length - 1; i >= 0; i--) {
      const r = rocks[i];
      r.position.z += move;
      if (r.position.z > 12) { scene.remove(r); rocks.splice(i, 1); spawnRock(-200 - Math.random() * 50); continue; }
      const dx = r.position.x - ship.position.x, dz = r.position.z - ship.position.z;
      if (dx * dx + dz * dz < (r.geometry.parameters.radius + 2) ** 2) {
        state.hp -= 34; updateHUD();
        scene.remove(r); rocks.splice(i, 1); spawnRock(-200 - Math.random() * 50);
        if (state.hp <= 0) { endGame(); }
      }
    }
    updateHUD();
  }

  camera.position.x = ship.position.x * 0.4;
  camera.position.y = 18;
  camera.position.z = ship.position.z + 26;
  camera.lookAt(ship.position.x * 0.5, 0, ship.position.z - 8);

  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
