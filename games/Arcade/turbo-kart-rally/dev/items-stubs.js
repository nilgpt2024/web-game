// Throwaway stubs for testing items/effects in isolation (dev only).
import * as THREE from 'three';
import { PHYSICS } from '../src/config.js';
import { bus } from '../src/events.js';

export function createStubTrack(scene) {
  const pts = [];
  const N = 16;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.sin(a) * 130, 0, Math.cos(a) * 75));
  }
  const curve = new THREE.CatmullRomCurve3(pts, true, 'centripetal');
  const length = curve.getLength();
  const SAMPLES = 800;
  const samples = [];
  for (let i = 0; i < SAMPLES; i++) samples.push(curve.getPointAt(i / SAMPLES));
  const roadWidth = 24;
  const wallDist = 19;

  // road ribbon
  const pos = [];
  const idx = [];
  const tmp = new THREE.Vector3();
  for (let i = 0; i <= SAMPLES; i++) {
    const t = (i % SAMPLES) / SAMPLES;
    const p = curve.getPointAt(t), tg = curve.getTangentAt(t);
    const r = tmp.set(-tg.z, 0, tg.x).normalize();
    pos.push(p.x + r.x * 12, 0.02, p.z + r.z * 12, p.x - r.x * 12, 0.02, p.z - r.z * 12);
    if (i < SAMPLES) { const v = i * 2; idx.push(v, v + 1, v + 2, v + 1, v + 3, v + 2); }
  }
  const rg = new THREE.BufferGeometry();
  rg.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  rg.setIndex(idx); rg.computeVertexNormals();
  const road = new THREE.Mesh(rg, new THREE.MeshStandardMaterial({ color: 0x555a66, side: THREE.DoubleSide }));
  road.receiveShadow = true;
  scene.add(road);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(600, 600), new THREE.MeshStandardMaterial({ color: 0x5c9e44 }));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true;
  scene.add(ground);
  // walls (visual)
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xdd4444 });
  for (let i = 0; i < SAMPLES; i += 8) {
    const t = i / SAMPLES;
    const p = curve.getPointAt(t), tg = curve.getTangentAt(t);
    for (const side of [1, -1]) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.2, 6), (i / 8) % 2 ? wallMat : new THREE.MeshStandardMaterial({ color: 0xffffff }));
      m.position.set(p.x + -tg.z * wallDist * side, 0.6, p.z + tg.x * wallDist * side);
      m.rotation.y = Math.atan2(tg.x, tg.z);
      scene.add(m);
    }
  }

  const itemBoxPositions = [];
  for (const t of [0.1, 0.35, 0.6, 0.85]) {
    const p = curve.getPointAt(t), tg = curve.getTangentAt(t);
    for (let j = -2; j <= 2; j++) itemBoxPositions.push(new THREE.Vector3(p.x - tg.z * j * 4, 1.3, p.z + tg.x * j * 4));
  }

  function nearest(pos, hintT) {
    let best = 0, bestD = Infinity;
    let from = 0, to = SAMPLES;
    if (Number.isFinite(hintT)) { from = Math.round(hintT * SAMPLES) - 40; to = from + 80; }
    for (let k = from; k < to; k++) {
      const i = ((k % SAMPLES) + SAMPLES) % SAMPLES;
      const s = samples[i];
      const d = (s.x - pos.x) ** 2 + (s.z - pos.z) ** 2;
      if (d < bestD) { bestD = d; best = i; }
    }
    return best / SAMPLES;
  }
  const up = new THREE.Vector3(0, 1, 0);
  const track = {
    name: 'Stub Oval', curve, length, roadWidth,
    startPositions: [], itemBoxPositions,
    minimap: { points: samples.map((s) => ({ x: s.x, z: s.z })), bounds: { minX: -140, maxX: 140, minZ: -85, maxZ: 85 } },
    getPointAt: (t) => curve.getPointAt(((t % 1) + 1) % 1),
    getTangentAt: (t) => curve.getTangentAt(((t % 1) + 1) % 1),
    getRacingLine: (t) => curve.getPointAt(((t % 1) + 1) % 1),
    getSurfaceInfo(p, hintT) {
      const t = nearest(p, hintT);
      const c = curve.getPointAt(t), tg = curve.getTangentAt(t);
      const lateral = (p.x - c.x) * -tg.z + (p.z - c.z) * tg.x;
      const onRoad = Math.abs(lateral) < roadWidth / 2;
      return { height: 0, normal: up, surface: onRoad ? 'road' : 'offroad', t, lateral, onRoad };
    },
    resolveWall(p, radius) {
      const t = nearest(p);
      const c = curve.getPointAt(t), tg = curve.getTangentAt(t);
      const rx = -tg.z, rz = tg.x;
      const lateral = (p.x - c.x) * rx + (p.z - c.z) * rz;
      const over = Math.abs(lateral) + radius - wallDist;
      if (over <= 0) return null;
      const s = lateral > 0 ? -1 : 1;
      return { normal: new THREE.Vector3(rx * s, 0, rz * s), depth: over };
    },
    update() {}, dispose() {},
  };
  return track;
}

export class StubKart {
  constructor({ scene, track, index, color, isPlayer, t, lane, speed }) {
    this.track = track;
    this.index = index; this.isPlayer = !!isPlayer;
    this.character = { name: 'K' + index, color };
    this.object3D = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.7, 2.4), new THREE.MeshStandardMaterial({ color }));
    body.position.y = 0.55; body.castShadow = true;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.4, 12, 8), new THREE.MeshStandardMaterial({ color: 0xffcc99 }));
    head.position.set(0, 1.3, -0.2);
    this.object3D.add(body, head);
    const anchors = {};
    const mk = (n, x, y, z) => { const o = new THREE.Object3D(); o.position.set(x, y, z); this.object3D.add(o); anchors[n] = o; };
    mk('wheelRL', 0.8, 0.2, -0.85); mk('wheelRR', -0.8, 0.2, -0.85); mk('wheelFL', 0.8, 0.2, 0.85); mk('wheelFR', -0.8, 0.2, 0.85);
    mk('exhaustL', 0.35, 0.55, -1.25); mk('exhaustR', -0.35, 0.55, -1.25); mk('itemHold', 0, 0.5, -1.8);
    this.model = { root: this.object3D, anchors };
    scene.add(this.object3D);
    this.position = this.object3D.position;
    this.velocity = new THREE.Vector3();
    this.heading = 0; this.speed = speed ?? 30; this.baseSpeed = this.speed;
    this.radius = PHYSICS.kartRadius;
    this.input = { throttle: 1, brake: 0, steer: 0, drift: false, item: false, lookBack: false };
    this.t = t; this.lane = lane; this.trackT = t;
    this.surface = 'road'; this.airborne = false;
    this.drifting = false; this.driftDir = 1; this.driftLevel = 0;
    this.boostTimer = 0; this.starTimer = 0; this.shrinkTimer = 0; this.spinTimer = 0; this.invulnTimer = 0;
    this.item = null; this.itemCount = 0; this.controlsLocked = false;
    this.lap = 0; this.place = index + 1; this.raceProgress = t; this.finished = false;
    this.hits = [];
    this.frozen = false;
    this.update(0);
  }
  get forward() { return new THREE.Vector3(Math.sin(this.heading), 0, Math.cos(this.heading)); }
  applyHit(kind) {
    if (this.starTimer > 0 || this.invulnTimer > 0) return;
    this.hits.push(kind);
    if (kind === 'shrink') this.shrinkTimer = PHYSICS.lightningShrinkTime;
    else { this.spinTimer = kind === 'tumble' ? PHYSICS.tumbleTime : PHYSICS.spinOutTime; this.invulnTimer = this.spinTimer + 0.5; }
    bus.emit('kart:hit', { kart: this, kind });
  }
  applyBoost(s) { this.boostTimer = Math.max(this.boostTimer, s); bus.emit('kart:boost', { kart: this, source: 'item' }); }
  startStar(s) { this.starTimer = s; }
  update(dt) {
    const tr = this.track;
    this.boostTimer = Math.max(0, this.boostTimer - dt);
    this.starTimer = Math.max(0, this.starTimer - dt);
    this.shrinkTimer = Math.max(0, this.shrinkTimer - dt);
    this.spinTimer = Math.max(0, this.spinTimer - dt);
    this.invulnTimer = Math.max(0, this.invulnTimer - dt);
    let sp = this.frozen ? 0 : this.baseSpeed;
    if (this.boostTimer > 0 || this.starTimer > 0) sp += 16;
    if (this.spinTimer > 0) sp *= 0.25;
    if (this.surface === 'offroad' && this.boostTimer <= 0 && this.starTimer <= 0) sp *= 0.6;
    this.speed = sp;
    this.t = (this.t + sp * dt / tr.length) % 1;
    this.raceProgress += sp * dt / tr.length;
    const p = tr.getPointAt(this.t), tg = tr.getTangentAt(this.t);
    const prev = this.position.clone();
    this.position.set(p.x - tg.z * this.lane, 0, p.z + tg.x * this.lane);
    if (dt > 0) this.velocity.subVectors(this.position, prev).divideScalar(dt);
    this.heading = Math.atan2(tg.x, tg.z);
    this.object3D.rotation.y = this.heading + (this.spinTimer > 0 ? this.spinTimer * 12 : 0) + (this.drifting ? this.driftDir * -0.35 : 0);
    const s = this.shrinkTimer > 0 ? 0.6 : 1;
    this.object3D.scale.setScalar(s);
    this.radius = PHYSICS.kartRadius * s;
    this.trackT = this.t;
    this.surface = Math.abs(this.lane) > 12 ? 'offroad' : 'road';
  }
}
