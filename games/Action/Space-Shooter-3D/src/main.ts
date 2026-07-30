import * as THREE from 'three';
import './style.css';

const BOUNDS = { x: 14, z: 18 };
const ENEMY_TYPES = {
  scout: { hp: 1, speed: 5, score: 100, color: 0x22c55e, size: 0.6 },
  fighter: { hp: 3, speed: 4, score: 200, color: 0xf97316, size: 0.8 },
  heavy: { hp: 6, speed: 2.5, score: 350, color: 0xa855f7, size: 1.0 },
  elite: { hp: 10, speed: 3.5, score: 500, color: 0xef4444, size: 0.9 },
};

interface Bullet { mesh: THREE.Mesh; active: boolean; vx: number; vy: number; vz: number; }
interface EnemyObj { group: THREE.Group; type: string; hp: number; maxHp: number; speed: number; score: number; active: boolean; moveTimer: number; movePattern: number; mat: THREE.MeshStandardMaterial; }
interface Explosion { points: THREE.Points; velocities: THREE.Vector3[]; lifetimes: number[]; maxLifetimes: number[]; active: boolean; }
interface Powerup { mesh: THREE.Mesh; type: string; active: boolean; }

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050810);
scene.fog = new THREE.FogExp2(0x050810, 0.012);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 24, 18);
camera.lookAt(0, 0, -2);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
document.getElementById('app')!.insertBefore(renderer.domElement, document.getElementById('app')!.firstChild);

const ambient = new THREE.AmbientLight(0x222244, 0.6);
scene.add(ambient);
const dirLight = new THREE.DirectionalLight(0xffeedd, 2);
dirLight.position.set(10, 20, 5);
scene.add(dirLight);
const dirLight2 = new THREE.DirectionalLight(0x4488ff, 0.5);
dirLight2.position.set(-10, 10, -10);
scene.add(dirLight2);

const clock = new THREE.Clock();
let score = 0, kills = 0, wave = 1, highScore = 0, gameActive = false;
let enemiesThisWave = 5, enemiesSpawned = 0, spawnTimer = 0, waveTimer = 0;

try { const s = localStorage.getItem('sf3d_highscore'); if (s) highScore = parseInt(s) || 0; } catch (_) {}

// ---- Starfield ----
const starCount = 3000;
const starGeom = new THREE.BufferGeometry();
const starPos = new Float32Array(starCount * 3);
const starSizes = new Float32Array(starCount);
for (let i = 0; i < starCount; i++) {
  starPos[i * 3] = (Math.random() - 0.5) * 100;
  starPos[i * 3 + 1] = (Math.random() - 0.5) * 60;
  starPos[i * 3 + 2] = (Math.random() - 0.5) * 100 - 20;
  starSizes[i] = Math.random() * 2 + 0.5;
}
starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
starGeom.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
const starMat = new THREE.PointsMaterial({
  color: 0xffffff, size: 0.15, transparent: true, opacity: 0.8,
  sizeAttenuation: true,
});
const stars = new THREE.Points(starGeom, starMat);
scene.add(stars);

// ---- Player ----
const playerGroup = new THREE.Group();
const bodyGeom = new THREE.ConeGeometry(0.8, 1.6, 8);
const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0d9488, metalness: 0.7, roughness: 0.3, emissive: 0x0d9488, emissiveIntensity: 0.15 });
const bodyMesh = new THREE.Mesh(bodyGeom, bodyMat);
bodyMesh.rotation.x = Math.PI / 2;
bodyMesh.position.z = -0.3;
playerGroup.add(bodyMesh);

const wingGeom = new THREE.BoxGeometry(1.8, 0.08, 0.6);
const wingMat = new THREE.MeshStandardMaterial({ color: 0x14b8a6, metalness: 0.6, roughness: 0.4, emissive: 0x14b8a6, emissiveIntensity: 0.1 });
const wingL = new THREE.Mesh(wingGeom, wingMat);
wingL.position.set(-0.9, 0, 0.1);
playerGroup.add(wingL);
const wingR = new THREE.Mesh(wingGeom, wingMat);
wingR.position.set(0.9, 0, 0.1);
playerGroup.add(wingR);

const cockpitGeom = new THREE.SphereGeometry(0.25, 8, 8);
const cockpitMat = new THREE.MeshStandardMaterial({ color: 0x5eead4, emissive: 0x5eead4, emissiveIntensity: 0.3, transparent: true, opacity: 0.7 });
const cockpit = new THREE.Mesh(cockpitGeom, cockpitMat);
cockpit.position.set(0, 0.2, -0.1);
playerGroup.add(cockpit);

const engineGeom = new THREE.CylinderGeometry(0.2, 0.35, 0.4, 8);
const engineMat = new THREE.MeshStandardMaterial({ color: 0x22d3ee, emissive: 0x22d3ee, emissiveIntensity: 1 });
const engineL = new THREE.Mesh(engineGeom, engineMat);
engineL.position.set(-0.4, 0, 0.8);
playerGroup.add(engineL);
const engineR = new THREE.Mesh(engineGeom, engineMat);
engineR.position.set(0.4, 0, 0.8);
playerGroup.add(engineR);

let playerHp = 100, playerMaxHp = 100;
let fireTimer = 0, fireRate = 0.15;
let invincibleTimer = 0;
playerGroup.position.set(0, 0, 12);
scene.add(playerGroup);

// Engine glow (sprites)
const glowTex = (() => {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(34,211,238,1)');
  g.addColorStop(0.3, 'rgba(34,211,238,0.6)');
  g.addColorStop(1, 'rgba(34,211,238,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
})();
const glowMat = new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.6 });
const glowL = new THREE.Sprite(glowMat.clone());
glowL.position.set(-0.4, 0, 1.1);
glowL.scale.set(1.5, 1.5, 1);
playerGroup.add(glowL);
const glowR = new THREE.Sprite(glowMat.clone());
glowR.position.set(0.4, 0, 1.1);
glowR.scale.set(1.5, 1.5, 1);
playerGroup.add(glowR);

// ---- Bullets ----
const bullets: Bullet[] = [];
const bulletGeom = new THREE.SphereGeometry(0.12, 6, 6);
const bulletMat = new THREE.MeshStandardMaterial({
  color: 0x22d3ee, emissive: 0x22d3ee, emissiveIntensity: 2,
});

// ---- Enemies ----
const enemies: EnemyObj[] = [];

// ---- Explosions ----
const explosions: Explosion[] = [];
const particleGeom = new THREE.BufferGeometry();

// ---- Powerups ----
const powerups: Powerup[] = [];

// ---- Input ----
const keys: Record<string, boolean> = {};
const mouse = new THREE.Vector2();
let mouseDown = false;
const targetPos = new THREE.Vector3();

document.addEventListener('keydown', e => { keys[e.key.toLowerCase()] = true; if (e.key === ' ') e.preventDefault(); });
document.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });
document.addEventListener('mousemove', e => {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
});
document.addEventListener('mousedown', () => { mouseDown = true; });
document.addEventListener('mouseup', () => { mouseDown = false; });
document.addEventListener('touchstart', e => {
  const t = e.touches[0];
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((t.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((t.clientY - rect.top) / rect.height) * 2 + 1;
  mouseDown = true;
}, { passive: true });
document.addEventListener('touchmove', e => {
  const t = e.touches[0];
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((t.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((t.clientY - rect.top) / rect.height) * 2 + 1;
}, { passive: true });
document.addEventListener('touchend', () => { mouseDown = false; }, { passive: true });

// ---- Ship Creation ----
function createEnemyShip(type: string): THREE.Group {
  const cfg = ENEMY_TYPES[type as keyof typeof ENEMY_TYPES];
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color: cfg.color, metalness: 0.5, roughness: 0.4,
    emissive: cfg.color, emissiveIntensity: 0.2,
  });
  if (type === 'scout') {
    const g = new THREE.OctahedronGeometry(cfg.size);
    const m = new THREE.Mesh(g, mat);
    m.rotation.x = Math.PI / 2;
    group.add(m);
  } else if (type === 'fighter') {
    const body = new THREE.Mesh(new THREE.ConeGeometry(cfg.size * 0.7, cfg.size * 1.4, 6), mat);
    body.rotation.x = Math.PI / 2;
    body.position.z = -0.1;
    group.add(body);
    const wing = new THREE.Mesh(new THREE.BoxGeometry(cfg.size * 1.6, 0.06, 0.4), mat);
    group.add(wing);
  } else if (type === 'heavy') {
    const g = new THREE.DodecahedronGeometry(cfg.size);
    const m = new THREE.Mesh(g, mat);
    group.add(m);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(cfg.size * 0.8, 0.06, 8, 12), mat);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);
  } else {
    const g = new THREE.IcosahedronGeometry(cfg.size);
    const m = new THREE.Mesh(g, mat);
    m.rotation.x = Math.PI / 2;
    group.add(m);
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.4, 4), mat);
    spike.rotation.x = Math.PI / 2;
    spike.position.z = -cfg.size - 0.1;
    group.add(spike);
  }
  group.userData.material = mat;
  return group;
}

function spawnEnemy() {
  const types = wave < 3 ? ['scout', 'fighter'] : wave < 6 ? ['scout', 'fighter', 'heavy'] : ['scout', 'fighter', 'heavy', 'elite'];
  const type = types[Math.floor(Math.random() * types.length)];
  const cfg = ENEMY_TYPES[type as keyof typeof ENEMY_TYPES];
  const group = createEnemyShip(type);
  const x = (Math.random() - 0.5) * BOUNDS.x * 1.6;
  const z = -BOUNDS.z - 3;
  group.position.set(x, 0, z);
  const scale = 0.8 + Math.random() * 0.4;
  group.scale.set(scale, scale, scale);
  group.userData.spinSpeed = (Math.random() - 0.5) * 0.02;
  scene.add(group);

  const mat = group.userData.material as THREE.MeshStandardMaterial;
  const hpMult = 1 + (wave - 1) * 0.15;
  const speedMult = 1 + (wave - 1) * 0.04;
  const obj: EnemyObj = {
    group, type, active: true,
    hp: Math.ceil(cfg.hp * hpMult), maxHp: Math.ceil(cfg.hp * hpMult),
    speed: cfg.speed * Math.min(speedMult, 1.8),
    score: cfg.score, mat,
    moveTimer: Math.random() * 100, movePattern: Math.floor(Math.random() * 3),
  };
  enemies.push(obj);
  enemiesSpawned++;
}

// ---- Explosion System ----
function spawnExplosion(pos: THREE.Vector3, count: number, color: number) {
  const count2 = Math.min(count, 60);
  const positions = new Float32Array(count2 * 3);
  const colors = new Float32Array(count2 * 3);
  const sizes = new Float32Array(count2);
  const velocities: THREE.Vector3[] = [];
  const lifetimes: number[] = [];
  const maxLifetimes: number[] = [];

  const c = new THREE.Color(color);
  for (let i = 0; i < count2; i++) {
    positions[i * 3] = pos.x;
    positions[i * 3 + 1] = pos.y;
    positions[i * 3 + 2] = pos.z;
    const angle = Math.random() * Math.PI * 2;
    const elev = (Math.random() - 0.5) * Math.PI;
    const speed = 2 + Math.random() * 6;
    velocities.push(new THREE.Vector3(
      Math.cos(angle) * Math.cos(elev) * speed,
      Math.sin(elev) * speed,
      Math.sin(angle) * Math.cos(elev) * speed,
    ));
    const life = 0.4 + Math.random() * 0.6;
    lifetimes.push(life);
    maxLifetimes.push(life);
    const tc = c.clone().lerp(new THREE.Color(0xffffff), Math.random() * 0.3 + 0.1);
    colors[i * 3] = tc.r;
    colors[i * 3 + 1] = tc.g;
    colors[i * 3 + 2] = tc.b;
    sizes[i] = 0.1 + Math.random() * 0.25;
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geom.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  const mat = new THREE.PointsMaterial({
    size: 0.3, vertexColors: true, transparent: true, opacity: 1,
    blending: THREE.AdditiveBlending, depthWrite: false,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(geom, mat);
  scene.add(points);

  explosions.push({ points, velocities, lifetimes, maxLifetimes, active: true });
}

// ---- Powerup System ----
function spawnPowerup(pos: THREE.Vector3) {
  const types = ['fire', 'fire', 'shield', 'heal', 'bomb'];
  const type = types[Math.floor(Math.random() * types.length)];
  const colors: Record<string, number> = { fire: 0xf97316, shield: 0x3b82f6, heal: 0x22c55e, bomb: 0xef4444 };
  const geom = new THREE.TorusGeometry(0.3, 0.08, 8, 12);
  const mat = new THREE.MeshStandardMaterial({
    color: colors[type], emissive: colors[type], emissiveIntensity: 0.8,
    transparent: true, opacity: 0.9,
  });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.position.copy(pos);
  mesh.position.y = 0.3;
  scene.add(mesh);
  powerups.push({ mesh, type, active: true });
}

// ---- HUD ----
const scoreEl = document.getElementById('score')!;
const hpBarEl = document.getElementById('hp-bar')!;
const hpTextEl = document.getElementById('hp-text')!;
const waveEl = document.getElementById('wave')!;
const highScoreEl = document.getElementById('high-score')!;
const killsEl = document.getElementById('kills')!;
const waveAnnounceEl = document.getElementById('wave-announce')!;

function updateHUD() {
  scoreEl.textContent = score.toLocaleString();
  hpTextEl.textContent = Math.ceil(playerHp).toString();
  const pct = Math.max(0, playerHp / playerMaxHp) * 100;
  hpBarEl.style.width = pct + '%';
  hpBarEl.style.background = pct > 50 ? 'linear-gradient(90deg, #22c55e, #10b981)' :
    pct > 25 ? 'linear-gradient(90deg, #eab308, #d97706)' :
    'linear-gradient(90deg, #ef4444, #dc2626)';
  waveEl.textContent = wave.toString();
  highScoreEl.textContent = highScore.toLocaleString();
  killsEl.textContent = kills.toString();
}

function announceWave() {
  const isBoss = wave % 5 === 0;
  waveAnnounceEl.textContent = isBoss ? `⚠️ BOSS WAVE ${wave} ⚠️` : `— WAVE ${wave} —`;
  waveAnnounceEl.style.color = isBoss ? '#ef4444' : '#fbbf24';
  waveAnnounceEl.style.animation = 'none';
  void waveAnnounceEl.offsetWidth;
  waveAnnounceEl.style.animation = 'wavePulse 2s ease-out forwards';
}

// ---- Game Logic ----
function startGame() {
  score = 0; kills = 0; wave = 1;
  playerHp = playerMaxHp = 100;
  fireRate = 0.15; invincibleTimer = 0;
  playerGroup.position.set(0, 0, 12);
  enemiesThisWave = 5; enemiesSpawned = 0; spawnTimer = 0; waveTimer = 0;

  for (const b of bullets) { scene.remove(b.mesh); b.active = false; }
  for (const e of enemies) { scene.remove(e.group); }
  for (const p of powerups) { scene.remove(p.mesh); }
  for (const ex of explosions) { scene.remove(ex.points); }
  bullets.length = 0; enemies.length = 0; powerups.length = 0; explosions.length = 0;

  gameActive = true;
  document.getElementById('title-screen')!.classList.add('hidden');
  document.getElementById('gameover-screen')!.classList.add('hidden');
  const hud = document.getElementById('hud')!;
  hud.classList.remove('hud-hidden');
  announceWave();
  updateHUD();
}

function endGame() {
  gameActive = false;
  if (score > highScore) {
    highScore = score;
    try { localStorage.setItem('sf3d_highscore', String(highScore)); } catch (_) {}
  }
  document.getElementById('go-score')!.textContent = score.toLocaleString();
  document.getElementById('go-wave')!.textContent = wave.toString();
  document.getElementById('go-kills')!.textContent = kills.toString();
  document.getElementById('gameover-screen')!.classList.remove('hidden');
}

document.getElementById('start-btn')!.addEventListener('click', startGame);
document.getElementById('restart-btn')!.addEventListener('click', startGame);

// ---- Update ----
function update(dt: number) {
  if (!gameActive) return;
  dt = Math.min(dt, 0.05);

  // Starfield parallax
  const sp = stars.geometry.attributes.position.array as Float32Array;
  for (let i = 0; i < starCount; i++) {
    sp[i * 3 + 2] += dt * (1 + starSizes[i] * 0.3);
    if (sp[i * 3 + 2] > 50) {
      sp[i * 3 + 2] = -50 - Math.random() * 30;
      sp[i * 3] = (Math.random() - 0.5) * 100;
      sp[i * 3 + 1] = (Math.random() - 0.5) * 60;
    }
  }
  stars.geometry.attributes.position.needsUpdate = true;

  // Player movement
  let mx = 0, mz = 0;
  if (keys['a'] || keys['arrowleft']) mx -= 1;
  if (keys['d'] || keys['arrowright']) mx += 1;
  if (keys['w'] || keys['arrowup']) mz -= 1;
  if (keys['s'] || keys['arrowdown']) mz += 1;

  targetPos.x += (mouse.x * BOUNDS.x - targetPos.x) * dt * 8;
  targetPos.z += (-mouse.y * BOUNDS.z + 12 - targetPos.z) * dt * 8;

  if (mx !== 0 || mz !== 0) {
    const len = Math.sqrt(mx * mx + mz * mz);
    if (len > 1) { mx /= len; mz /= len; }
    playerGroup.position.x += mx * 18 * dt;
    playerGroup.position.z += mz * 18 * dt;
  } else {
    playerGroup.position.x += (targetPos.x - playerGroup.position.x) * dt * 10;
    playerGroup.position.z += (targetPos.z - playerGroup.position.z) * dt * 10;
  }
  playerGroup.position.x = Math.max(-BOUNDS.x, Math.min(BOUNDS.x, playerGroup.position.x));
  playerGroup.position.z = Math.max(-BOUNDS.z + 4, Math.min(BOUNDS.z, playerGroup.position.z));

  // Ship tilt
  const tiltX = (mouse.x * 0.3 - playerGroup.rotation.z) * dt * 8;
  const tiltZ = (-(targetPos.z - 8) * 0.02 - playerGroup.rotation.x) * dt * 4;
  playerGroup.rotation.z += tiltX;
  playerGroup.rotation.x += tiltZ;

  // Engine glow pulse
  const gp = 0.5 + Math.sin(clock.elapsedTime * 10) * 0.3;
  glowL.material.opacity = gp;
  glowR.material.opacity = gp;

  // Invincibility
  if (invincibleTimer > 0) {
    invincibleTimer -= dt;
    playerGroup.visible = Math.floor(invincibleTimer * 20) % 2 === 0;
    if (invincibleTimer <= 0) { invincibleTimer = 0; playerGroup.visible = true; }
  }

  // Shooting
  fireTimer -= dt;
  if (fireTimer <= 0 && mouseDown) {
    fireTimer = fireRate;
    const pos = playerGroup.position.clone();
    pos.z -= 1.0;
    for (let i = -1; i <= 1; i++) {
      const bPos = pos.clone();
      bPos.x += i * 0.25;
      const b = new THREE.Mesh(bulletGeom, bulletMat.clone());
      b.position.copy(bPos);
      scene.add(b);
      bullets.push({ mesh: b, active: true, vx: i * 0.5, vy: 0, vz: -18 });
    }
  }

  // Bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    b.mesh.position.x += b.vx * dt;
    b.mesh.position.z += b.vz * dt;
    b.mesh.position.y += b.vy * dt;
    if (b.mesh.position.z < -BOUNDS.z - 5 || Math.abs(b.mesh.position.x) > BOUNDS.x + 5) {
      scene.remove(b.mesh);
      bullets.splice(i, 1);
    }
  }

  // Enemy spawning
  if (enemiesSpawned < enemiesThisWave) {
    spawnTimer -= dt;
    if (spawnTimer <= 0) {
      spawnTimer = Math.max(0.3, 1.2 - wave * 0.06);
      if (wave % 5 === 0 && enemies.length === 0 && enemiesSpawned < enemiesThisWave) {
        spawnEnemy();
        spawnEnemy();
        spawnEnemy();
        spawnTimer = 0.8;
      }
      spawnEnemy();
    }
  }

  // Enemies
  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    e.moveTimer += dt;
    if (e.type === 'scout') {
      e.group.position.z += e.speed * dt;
      e.group.position.x += Math.sin(e.moveTimer * 4) * 2 * dt;
    } else if (e.type === 'fighter') {
      e.group.position.z += e.speed * dt;
      e.group.position.x += Math.cos(e.moveTimer * 3) * 1.5 * dt;
    } else if (e.type === 'heavy') {
      e.group.position.z += e.speed * dt;
      e.group.rotation.y += dt * 0.5;
    } else {
      e.group.position.z += e.speed * dt;
      const dir = Math.sin(e.moveTimer * 2) > 0 ? 1 : -1;
      e.group.position.x += dir * 3 * dt;
    }
    const spin = e.group.userData.spinSpeed as number || 0;
    e.group.rotation.z += spin;

    // Enemy shoots
    if (Math.random() < dt * 0.3) {
      const ePos = e.group.position.clone();
      ePos.z += 0.5;
      const dir = new THREE.Vector3(0, 0, 1);
      const eb = new THREE.Mesh(new THREE.SphereGeometry(0.1, 4, 4),
        new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 1 }));
      eb.position.copy(ePos);
      scene.add(eb);
      bullets.push({ mesh: eb, active: true, vx: dir.x, vy: dir.y, vz: 8 });
    }

    if (e.group.position.z > BOUNDS.z + 3) {
      scene.remove(e.group);
      enemies.splice(i, 1);
    }
  }

  // Collisions: bullets vs enemies
  for (let bi = bullets.length - 1; bi >= 0; bi--) {
    const b = bullets[bi];
    for (let ei = enemies.length - 1; ei >= 0; ei--) {
      const e = enemies[ei];
      const dist = b.mesh.position.distanceTo(e.group.position);
      if (dist < 1.0) {
        const hitPos = b.mesh.position.clone();
        spawnExplosion(hitPos, 8, e.mat.color.getHex());
        scene.remove(b.mesh);
        bullets.splice(bi, 1);
        e.hp--;
        if (e.hp <= 0) {
          score += e.score;
          kills++;
          spawnExplosion(e.group.position.clone(), 25, e.mat.color.getHex());
          scene.remove(e.group);
          enemies.splice(ei, 1);
          updateHUD();
          if (Math.random() < 0.15) spawnPowerup(e.group.position.clone());
        }
        break;
      }
    }
  }

  // Collisions: player vs enemies
  if (invincibleTimer <= 0) {
    for (let i = enemies.length - 1; i >= 0; i--) {
      const dist = playerGroup.position.distanceTo(enemies[i].group.position);
      if (dist < 1.5) {
        playerHp -= 15 + wave * 2;
        invincibleTimer = 1.0;
        spawnExplosion(playerGroup.position.clone(), 15, 0x0d9488);
        scene.remove(enemies[i].group);
        enemies.splice(i, 1);
        updateHUD();
        if (playerHp <= 0) { endGame(); return; }
        break;
      }
    }
  }

  // Collisions: bullets vs player
  if (invincibleTimer <= 0) {
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      const dist = b.mesh.position.distanceTo(playerGroup.position);
      if (dist < 0.8 && b.vz > 0) {
        scene.remove(b.mesh);
        bullets.splice(i, 1);
        playerHp -= 10 + wave;
        invincibleTimer = 0.8;
        spawnExplosion(playerGroup.position.clone(), 10, 0xf97316);
        updateHUD();
        if (playerHp <= 0) { endGame(); return; }
        break;
      }
    }
  }

  // Powerups
  for (let i = powerups.length - 1; i >= 0; i--) {
    const p = powerups[i];
    p.mesh.rotation.y += dt * 3;
    p.mesh.position.y = 0.3 + Math.sin(clock.elapsedTime * 4 + i) * 0.15;
    const dist = p.mesh.position.distanceTo(playerGroup.position);
    if (dist < 1.2) {
      scene.remove(p.mesh);
      if (p.type === 'fire') { fireRate = Math.max(0.06, fireRate - 0.02); }
      else if (p.type === 'shield') { playerHp = Math.min(playerMaxHp, playerHp + 20); }
      else if (p.type === 'heal') { playerHp = Math.min(playerMaxHp, playerHp + 35); }
      else if (p.type === 'bomb') {
        for (const e of enemies) {
          spawnExplosion(e.group.position.clone(), 20, e.mat.color.getHex());
          score += Math.floor(e.score * 0.5);
          kills++;
          scene.remove(e.group);
        }
        enemies.length = 0;
      }
      spawnExplosion(p.mesh.position.clone(), 10, 0xfbbf24);
      powerups.splice(i, 1);
      updateHUD();
    }
  }

  // Explosions
  for (let i = explosions.length - 1; i >= 0; i--) {
    const ex = explosions[i];
    const pos = ex.points.geometry.attributes.position.array as Float32Array;
    let alive = false;
    for (let j = 0; j < ex.lifetimes.length; j++) {
      ex.lifetimes[j] -= dt;
      if (ex.lifetimes[j] > 0) {
        alive = true;
        const t = 1 - ex.lifetimes[j] / ex.maxLifetimes[j];
        pos[j * 3] += ex.velocities[j].x * dt * (1 - t * 0.5);
        pos[j * 3 + 1] += ex.velocities[j].y * dt * (1 - t * 0.5);
        pos[j * 3 + 2] += ex.velocities[j].z * dt * (1 - t * 0.5);
      }
    }
    ex.points.geometry.attributes.position.needsUpdate = true;
    const pmat = ex.points.material as THREE.PointsMaterial;
    pmat.opacity = alive ? Math.min(1, ex.lifetimes.reduce((a, b) => Math.max(a, b), 0) * 1.5) : 0;
    if (!alive) {
      scene.remove(ex.points);
      ex.points.geometry.dispose();
      pmat.dispose();
      explosions.splice(i, 1);
    }
  }

  // Wave management
  if (enemies.length === 0 && (enemiesSpawned >= enemiesThisWave || wave % 5 === 0)) {
    waveTimer -= dt;
    if (waveTimer <= 0) {
      wave++;
      enemiesThisWave = 5 + wave * 3 + Math.floor(wave / 2) * 2;
      enemiesSpawned = 0;
      spawnTimer = 1.5;
      waveTimer = 2;
      announceWave();
    }
  }

  // Camera follow
  const targetCam = new THREE.Vector3(
    playerGroup.position.x * 0.3,
    24,
    Math.max(16, playerGroup.position.z * 0.3 + 14),
  );
  camera.position.lerp(targetCam, dt * 3);
  camera.lookAt(playerGroup.position.x * 0.3, 0, playerGroup.position.z * 0.3 - 2);

  updateHUD();
}

function animate() {
  requestAnimationFrame(animate);
  const dt = clock.getDelta();
  update(dt);
  renderer.render(scene, camera);
}

// ---- Resize ----
window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});

animate();
