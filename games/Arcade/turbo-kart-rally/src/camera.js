// Agent 4 — Camera: spring-damped chase camera with drift swing, speed FOV, shake and cinematic modes.
import * as THREE from 'three';
import { bus } from './events.js';
import { PHYSICS } from './config.js';

const PI = Math.PI;
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const fin = (v, d = 0) => (Number.isFinite(v) ? v : d);
const k = (rate, dt) => 1 - Math.exp(-rate * dt);
const wrapAngle = (a) => { a = (a + PI) % (2 * PI); if (a < 0) a += 2 * PI; return a - PI; };
const smoothstep = (t) => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;

const INTRO_TIME = 4.0;

export class ChaseCamera {
  constructor(camera) {
    this.camera = camera;
    this.target = null;

    // tuning
    this.baseFov = 70;
    this.maxFov = 84;
    this.distance = 6.5;
    this.height = 2.6;
    this.lookAhead = 3.0;
    this.lookHeight = 0.55;

    // state
    this.yaw = 0;
    this.slope = 0;
    this.offset = new THREE.Vector3(0, this.height, -this.distance); // camera - kart (horizontal + vertical)
    this.lookOffset = new THREE.Vector3(0, this.lookHeight, this.lookAhead);
    this.camY = 0;
    this.fov = this.baseFov;
    this.roll = 0;
    this.shake = 0;
    this.shakeTime = 0;
    this.mode = null;
    this.modeTime = 0;
    this.modeYaw = 0;
    this.lookBack = false;
    this.initialized = false;

    this._pos = new THREE.Vector3();
    this._look = new THREE.Vector3();
    this._desired = new THREE.Vector3();
    this._desiredLook = new THREE.Vector3();
    this._tmp = new THREE.Vector3();

    const isTarget = (d) => d && this.target && d.kart === this.target;
    this._unsubs = [
      bus.on('kart:hit', (d) => { if (isTarget(d)) this.addShake(d.kind === 'tumble' ? 0.75 : 0.5); }),
      bus.on('kart:wallBump', (d) => { if (isTarget(d)) this.addShake(0.12 + 0.45 * clamp(fin(d.intensity, 0.3), 0, 1)); }),
      bus.on('kart:land', (d) => { if (isTarget(d)) this.addShake(clamp(0.05 + fin(d.airTime, 0) * 0.15, 0, 0.25)); }),
      bus.on('kart:boost', (d) => { if (isTarget(d) && d.source !== 'star') this.addShake(0.08); }),
      bus.on('kart:bump', (d) => { if (d && this.target && (d.a === this.target || d.b === this.target)) this.addShake(0.1 + 0.25 * clamp(fin(d.intensity, 0.3), 0, 1)); }),
      bus.on('item:explode', (d) => {
        const p = d?.position;
        const t = this.target?.position;
        if (!p || !t) return;
        const dist = p.distanceTo(t);
        const big = d.kind === 'blue_shell' || fin(d.radius, 0) > 3;
        const range = big ? 40 : 18;
        if (dist < range) this.addShake((big ? 1.0 : 0.45) * (1 - dist / range) ** 1.5);
      }),
    ];
  }

  addShake(amount) {
    this.shake = clamp(Math.max(this.shake, fin(amount, 0)) + fin(amount, 0) * 0.25, 0, 1.2);
  }

  _kartInfo(kart) {
    const pos = kart.position || kart.object3D?.position || this._tmp.set(0, 0, 0);
    const heading = fin(kart.heading, fin(kart.object3D?.rotation?.y, 0));
    const vel = kart.velocity;
    const speed = fin(kart.speed, vel ? Math.hypot(fin(vel.x), fin(vel.z)) : 0);
    // slope along the forward direction (rise per unit), from the ground normal
    let slope = 0;
    const n = kart.groundNormal;
    if (n && fin(n.y, 0) > 0.3) slope = clamp(-(fin(n.x) * Math.sin(heading) + fin(n.z) * Math.cos(heading)) / n.y, -0.6, 0.6);
    return { pos, heading, vel, speed, slope };
  }

  _raceDesired(kart, info, lookBack, speedFrac, boostAmt) {
    const fx = Math.sin(this.yaw), fz = Math.cos(this.yaw);
    if (lookBack) {
      const d = 6.0;
      this._desired.set(fx * d, 2.1, fz * d);
      this._desiredLook.set(-fx * 4, 0.9, -fz * 4);
      return;
    }
    const dist = this.distance + speedFrac * 0.7 + boostAmt * 0.8;
    const slopeLift = clamp(-this.slope * dist * 0.85, -1.6, 2.4);
    this._desired.set(-fx * dist, this.height + slopeLift - boostAmt * 0.15, -fz * dist);
    const la = this.lookAhead + speedFrac * 0.8;
    this._desiredLook.set(fx * la, this.lookHeight + this.slope * la * 0.6, fz * la);
  }

  update(dt, kart, opts = {}) {
    try {
      if (!kart || !this.camera) return;
      dt = clamp(fin(dt, 1 / 60), 0, 0.1);
      const mode = opts.mode || 'race';
      const lookBack = !!opts.lookBack && (mode === 'race' || mode === 'countdown');
      const info = this._kartInfo(kart);
      const targetChanged = this.target !== kart;
      this.target = kart;

      if (!this.initialized || targetChanged) this.snap(kart);
      if (mode !== this.mode) {
        this.mode = mode;
        this.modeTime = 0;
        this.modeYaw = info.heading;
      }
      this.modeTime += dt;

      const speedFrac = clamp(Math.abs(info.speed) / fin(PHYSICS.maxSpeed, 38), 0, 1.4);
      const boosting = fin(kart.boostTimer, 0) > 0 || fin(kart.starTimer, 0) > 0;
      this._boost = lerp(this._boost || 0, boosting ? 1 : 0, k(boosting ? 6 : 2.5, dt));
      const boostAmt = this._boost;

      // --- yaw follow: lag behind the heading, swing more while drifting so the kart's angle shows
      let targetYaw = info.heading;
      const hs = info.vel ? Math.hypot(fin(info.vel.x), fin(info.vel.z)) : 0;
      if (hs > 4 && info.vel) {
        const velYaw = Math.atan2(info.vel.x, info.vel.z);
        const diff = wrapAngle(velYaw - info.heading);
        if (Math.abs(diff) < 1.2 && info.speed > 0) targetYaw = info.heading + diff * (kart.drifting ? 0.55 : 0.3);
      }
      const spinning = fin(kart.spinTimer, 0) > 0;
      const yawRate = spinning ? 1.5 : kart.drifting ? 3.2 : 5.5;
      this.yaw += wrapAngle(targetYaw - this.yaw) * k(yawRate, dt);

      if (!kart.airborne) this.slope = lerp(this.slope, info.slope, k(3, dt));

      const kp = info.pos;
      let fovTarget = this.baseFov;
      let posRate = 10, yRate = kart.airborne ? 3.5 : 9, lookRate = 12;

      if (mode === 'intro') {
        const t = smoothstep(clamp(this.modeTime / INTRO_TIME, 0, 1));
        const baseYaw = this.modeYaw;
        const a = baseYaw + lerp(0.7, PI, t) + Math.sin(t * PI) * 0.6;
        const r = lerp(28, this.distance, t);
        const h = lerp(13, this.height, t);
        const cx = Math.sin(baseYaw) * lerp(10, 0, t), cz = Math.cos(baseYaw) * lerp(10, 0, t);
        this._desired.set(cx + Math.sin(a) * r, h, cz + Math.cos(a) * r);
        const fx = Math.sin(baseYaw), fz = Math.cos(baseYaw);
        this._desiredLook.set(fx * lerp(8, this.lookAhead, t), lerp(0.5, this.lookHeight, t), fz * lerp(8, this.lookAhead, t));
        this.yaw = baseYaw;
        posRate = 1000; yRate = 1000; lookRate = 1000; // direct (deterministic path)
        fovTarget = lerp(58, this.baseFov, t);
      } else if (mode === 'finish') {
        const a = this.modeYaw + PI + this.modeTime * 0.32;
        const r = 7.5 + Math.min(this.modeTime, 4) * 0.4;
        this._desired.set(Math.sin(a) * r, 2.3 + Math.sin(this.modeTime * 0.4) * 0.4, Math.cos(a) * r);
        this._desiredLook.set(0, 0.9, 0);
        posRate = 2.2; yRate = 2.2; lookRate = 3;
        fovTarget = 62;
      } else {
        this._raceDesired(kart, info, lookBack, speedFrac, boostAmt);
        if (mode === 'countdown') { posRate = 3; yRate = 3; lookRate = 4; }
        else fovTarget = this.baseFov + speedFrac * 9 + boostAmt * 6;
        if (lookBack !== this.lookBack) {
          // instant cut when toggling look-back, like the classics
          this.lookBack = lookBack;
          this.offset.copy(this._desired);
          this.lookOffset.copy(this._desiredLook);
          this.camY = kp.y + this._desired.y;
        }
      }

      // --- smooth (relative to the kart so there is no speed-dependent lag)
      const kp2 = k(posRate, dt);
      this.offset.x = lerp(this.offset.x, this._desired.x, kp2);
      this.offset.z = lerp(this.offset.z, this._desired.z, kp2);
      // keep the horizontal distance near the desired value (spring can cut corners on fast swings)
      if (mode === 'race' && !lookBack) {
        const dh = Math.hypot(this.offset.x, this.offset.z), want = Math.hypot(this._desired.x, this._desired.z);
        if (dh > 1e-3) { const s = lerp(1, want / dh, 0.5); this.offset.x *= s; this.offset.z *= s; }
      }
      // vertical: absolute smoothing so airtime doesn't yank the camera
      const wantY = kp.y + this._desired.y;
      this.camY = lerp(this.camY, wantY, k(yRate, dt));
      const minY = kp.y + (mode === 'intro' ? 1.2 : 0.8);
      if (this.camY < minY) this.camY = minY;
      if (this.camY > kp.y + 18) this.camY = kp.y + 18;
      this.lookOffset.lerp(this._desiredLook, k(lookRate, dt));

      this.fov = lerp(this.fov, clamp(fovTarget, 40, this.maxFov), k(3.5, dt));

      // roll into drifts
      const rollTarget = mode === 'race' && !lookBack
        ? (kart.drifting ? -fin(kart.driftDir, 0) * 0.035 : -fin(kart.steerSmoothed, fin(kart.input?.steer, 0)) * 0.012 * speedFrac)
        : 0;
      this.roll = lerp(this.roll, rollTarget, k(4, dt));

      // shake
      this.shake = Math.max(0, this.shake * Math.exp(-4.5 * dt) - 0.02 * dt);
      this.shakeTime += dt;
      const s = this.shake * this.shake * 0.45;
      const t = this.shakeTime;
      const sx = (Math.sin(t * 41.3) + Math.sin(t * 27.1 + 1.3) * 0.6) * s;
      const sy = (Math.sin(t * 37.7 + 2.1) + Math.sin(t * 19.4) * 0.6) * s;
      const sz = Math.sin(t * 33.9 + 0.7) * s * 0.5;

      // apply
      const cam = this.camera;
      this._pos.set(kp.x + this.offset.x + sx, this.camY + sy, kp.z + this.offset.z + sz);
      this._look.set(kp.x + this.lookOffset.x, kp.y + this.lookOffset.y, kp.z + this.lookOffset.z);
      cam.position.copy(this._pos);
      cam.up.set(0, 1, 0);
      cam.lookAt(this._look);
      const r = this.roll + Math.sin(t * 29.3) * s * 0.08;
      if (r) cam.rotateZ(r);
      if (Math.abs(cam.fov - this.fov) > 0.01) {
        cam.fov = this.fov;
        cam.updateProjectionMatrix();
      }
    } catch (err) {
      if (!this._warned) { console.warn('[camera] update failed', err); this._warned = true; }
    }
  }

  // Hard reset to the ideal race pose behind the kart.
  snap(kart) {
    if (!kart || !this.camera) return;
    this.target = kart;
    const info = this._kartInfo(kart);
    this.yaw = info.heading;
    this.slope = info.slope;
    this._boost = 0;
    this.lookBack = false;
    this._raceDesired(kart, info, false, 0, 0);
    this.offset.copy(this._desired);
    this.lookOffset.copy(this._desiredLook);
    this.camY = info.pos.y + this._desired.y;
    this.roll = 0;
    this.shake = 0;
    this.initialized = true;
    this.fov = this.baseFov;
    const cam = this.camera;
    cam.position.set(info.pos.x + this.offset.x, this.camY, info.pos.z + this.offset.z);
    cam.up.set(0, 1, 0);
    cam.lookAt(info.pos.x + this.lookOffset.x, info.pos.y + this.lookOffset.y, info.pos.z + this.lookOffset.z);
    cam.fov = this.fov;
    cam.updateProjectionMatrix();
  }

  dispose() {
    for (const u of this._unsubs) { try { u(); } catch { /* ignore */ } }
    this._unsubs = [];
    this.target = null;
  }
}
