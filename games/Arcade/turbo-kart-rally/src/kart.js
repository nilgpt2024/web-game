// Arcade kart physics: heading + forward speed with lateral grip, hop-drift with 3-level mini-turbos,
// boosts, jump ramps, walls, slopes, hits, star/shrink, start-line rocket boost and Lakitu-style respawn.
import * as THREE from 'three';
import { PHYSICS } from './config.js';
import { bus } from './events.js';
import { InputController } from './input.js';

const TAU = Math.PI * 2;
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const damp = (a, b, lambda, dt) => a + (b - a) * (1 - Math.exp(-lambda * dt));
const statLerp = (v, lo, hi) => lo + (hi - lo) * clamp(((Number.isFinite(v) ? v : 3) - 1) / 4, 0, 1);
const fin = (v) => Number.isFinite(v);

// ---- Tuning (driving feel) -------------------------------------------------------------
const BASE_TURN_RATE = 2.15;          // rad/s at full lock (handling 3)
const TURN_FULL_SPEED = 9;            // speed at which steering reaches full authority
const HIGH_SPEED_TURN_LOSS = 0.16;    // fraction of turn rate lost at top speed
const NORMAL_GRIP = 13;               // lateral velocity decay rate (1/s)
const DRIFT_GRIP = 2.6;               // low grip while drifting => outward slide
const AIR_GRIP = 0.4;
const SPEED_KEEP_IN_TURN = 0.85;      // fraction of speed magnitude preserved when grip kills lateral slip
const DRIFT_MIN_SPEED = 12;
const DRIFT_CANCEL_SPEED = 8;
const DRIFT_TURN_BASE = 0.62;         // drift yaw = dir * (base + span * steer*dir) * turnRate
const DRIFT_TURN_SPAN = 0.5;
const DRIFT_TURN_MUL = 1.08;
const DRIFT_BODY_YAW = 0.42;          // visual inward yaw while drifting
const MINI_TURBO_STRENGTH = [0.72, 0.86, 1.0];
const HOP_VELOCITY = 4.8;
const HOP_GRAVITY = 40;
const DRIFT_PENDING_WINDOW = 0.28;    // after hop landing, time to pick a direction while drift held
const BOOST_ACCEL = 60;
const BOOST_KICK = 5;
const STAR_SPEED_BONUS = 7;
const OVERSPEED_DECEL = 16;
const OFFROAD_OVERSPEED_DECEL = 48;
const SLOPE_GRAVITY_FACTOR = 0.35;
const WALL_RESTITUTION = 0.35;
const WALL_FRICTION = 0.12;
const SHRINK_SCALE = 0.6;
const SHRINK_SPEED_FACTOR = 0.74;
const HIT_INVULN = 1.4;
const RESPAWN_INVULN = 2.2;
const RESPAWN_HANG = 0.7;
const PAD_BOOST_TIME = 1.0;
const TRICK_BOOST_TIME = 0.7;
const JUMP_BASE_VY = 9.5;
const JUMP_SPEED_VY = 0.17;

const _n = new THREE.Vector3();

function neutralInput() {
  return { throttle: 0, brake: 0, steer: 0, drift: false, item: false, lookBack: false };
}

export class Kart {
  constructor({ scene = null, track = null, character = null, isPlayer = false, index = 0, model = null } = {}) {
    this.scene = scene;
    this.track = track;
    this.character = character || { id: 'racer', name: 'Racer', stats: {} };
    this.isPlayer = !!isPlayer;
    this.index = index | 0;
    this.model = model || null;

    const st = this.character.stats || {};
    this.stats = {
      maxSpeed: PHYSICS.maxSpeed * statLerp(st.speed, 0.93, 1.07),
      accel: PHYSICS.accel * statLerp(st.accel, 0.8, 1.28),
      turnRate: BASE_TURN_RATE * statLerp(st.handling, 0.88, 1.14),
      driftCharge: statLerp(st.handling, 0.92, 1.1),
      mass: statLerp(st.weight, 0.75, 1.4),
    };

    // Scene graph: object3D (position + heading) > tiltGroup (surface pitch/roll) > bodyGroup (hop/spin/drift/squash) > model.root
    this.object3D = new THREE.Group();
    this.object3D.name = `kart-${this.index}`;
    this.object3D.userData.kart = this;
    this.tiltGroup = new THREE.Group();
    this.bodyGroup = new THREE.Group();
    this.object3D.add(this.tiltGroup);
    this.tiltGroup.add(this.bodyGroup);
    if (this.model?.root) this.bodyGroup.add(this.model.root);
    scene?.add?.(this.object3D);

    this.position = this.object3D.position;
    this.velocity = new THREE.Vector3();
    this._forward = new THREE.Vector3(0, 0, 1);
    this._right = new THREE.Vector3(-1, 0, 0);
    this.groundNormal = new THREE.Vector3(0, 1, 0);

    this.input = neutralInput();
    this.maxSpeedScale = 1;       // multiplier used by AI rubber-banding / difficulty
    this.time = 0;

    // race fields (maintained by RaceManager)
    this.lap = 0;
    this.place = this.index + 1;
    this.finished = false;
    this.finishTime = null;
    this.raceProgress = 0;
    this.item = null;
    this.itemCount = 0;
    this.controlsLocked = false;

    this._resetState();

    this._countdown = { oneAt: -1, holdStart: -1 };
    this._unsubs = [
      bus.on('race:countdown', (d) => this._onCountdown(d)),
      bus.on('race:go', () => this._onGo()),
    ];
  }

  // ---- public getters ---------------------------------------------------------------------
  get heading() { return this.object3D.rotation.y; }
  set heading(v) { if (fin(v)) this.object3D.rotation.y = v; }

  /** Unit forward vector (shared instance; treat as read-only). */
  get forward() {
    const h = this.heading;
    return this._forward.set(Math.sin(h), 0, Math.cos(h));
  }
  /** Unit right vector (driver's right). */
  get right() {
    const h = this.heading;
    return this._right.set(-Math.cos(h), 0, Math.sin(h));
  }
  get boosting() { return this.boostTimer > 0; }
  get shrunk() { return this.shrinkTimer > 0; }
  get spinning() { return this.spinTimer > 0; }
  get mass() {
    let m = this.stats.mass;
    if (this.shrinkTimer > 0) m *= 0.35;
    if (this.starTimer > 0) m *= 25;
    return m;
  }
  /** Current top speed on the current surface (for HUD/camera). */
  get topSpeed() { return this._topSpeed(); }

  _resetState() {
    this.velocity.set(0, 0, 0);
    this.speed = 0;
    this.radius = PHYSICS.kartRadius;
    this.trackT = 0;
    this.surface = 'road';
    this.onRoad = true;
    this.lateral = 0;
    this.groundHeight = 0;
    this.groundNormal.set(0, 1, 0);
    this.airborne = false;
    this.airTime = 0;
    this.drifting = false;
    this.driftDir = 1;
    this.driftLevel = 0;
    this.driftCharge = 0;
    this.driftTime = 0;
    this.boostTimer = 0;
    this.boostStrength = 1;
    this.boostSource = null;
    this.starTimer = 0;
    this.shrinkTimer = 0;
    this.spinTimer = 0;
    this.spinDuration = 1;
    this.hitKind = null;
    this.invulnTimer = 0;
    this.respawnTimer = 0;
    this.respawnInvuln = 0;
    this.stallTimer = 0;
    this.squashTimer = 0;
    this.steerSmoothed = 0;
    this.hopY = 0;
    this.hopVel = 0;
    this.hopping = false;
    this._driftPending = 0;
    this._prevDrift = false;
    this._padCooldown = 0;
    this._jumpCooldown = 0;
    this._wallCooldown = 0;
    this.bumpCooldown = 0;
    this._fromRamp = false;
    this._trick = false;
    this._trickTime = 0;
    this._boostKick = 0;
    this._pitch = 0;
    this._roll = 0;
    this._bodyYaw = 0;
    this._lean = 0;
    this._landSquash = 0;
    this._landSquashVel = 0;
    this._boostPitch = 0;
    this._boostDurationMax = 0;
  }

  // ---- countdown / rocket start --------------------------------------------------------
  _onCountdown(d) {
    if (d?.n === 1) this._countdown.oneAt = nowSec();
    if (d?.n >= 3) this._countdown.holdStart = -1;
  }

  _onGo() {
    if (!this.isPlayer) return;
    const c = this._countdown;
    const thr = this._rawThrottle();
    if (thr < 0.5 || c.holdStart < 0) { c.holdStart = -1; return; }
    const held = nowSec() - c.holdStart;
    c.holdStart = -1;
    if (held >= 0.2 && held <= 0.95) {
      this.applyBoost(1.2, 1, 'start');
    } else if (held > 0.95 && held <= 1.3) {
      this.applyBoost(0.5, 0.7, 'start');
    } else if (held > 1.3) {
      // Revved too early: engine stalls with a little wobble.
      this.stallTimer = 0.9;
      this.spinTimer = 0.9;
      this.spinDuration = 0.9;
      this.hitKind = 'stall';
      bus.emit('kart:stall', { kart: this });
    }
  }

  _rawThrottle() {
    let t = this.input?.throttle || 0;
    if (this.isPlayer) {
      try { t = Math.max(t, InputController.active?.peekThrottle?.() || 0); } catch { /* ignore */ }
    }
    return t;
  }

  // ---- public actions ------------------------------------------------------------------
  applyBoost(seconds, strength = 1, source = 'item') {
    if (!fin(seconds) || seconds <= 0) return;
    strength = fin(strength) ? strength : 1;
    if (this.boostTimer > 0) this.boostStrength = Math.max(this.boostStrength, strength);
    else this.boostStrength = strength;
    this.boostTimer = Math.max(this.boostTimer, seconds);
    this._boostDurationMax = Math.max(this.boostTimer, 0.01);
    this.boostSource = source;
    this._boostKick = Math.max(this._boostKick, BOOST_KICK * strength);
    this._boostPitch = 0.09 * strength;
    bus.emit('kart:boost', { kart: this, source, seconds, strength });
  }

  startStar(seconds = PHYSICS.starTime) {
    this.starTimer = Math.max(this.starTimer, fin(seconds) ? seconds : PHYSICS.starTime);
    if (this.shrinkTimer > 0) this._endShrink();
    if (this.spinTimer > 0 && this.hitKind !== 'stall') { this.spinTimer = 0; this.hitKind = null; }
    this._boostKick = Math.max(this._boostKick, BOOST_KICK);
    bus.emit('kart:boost', { kart: this, source: 'star', seconds: this.starTimer, strength: 1 });
  }

  /** kind: 'spin' | 'tumble' | 'shrink' | 'squash'. Returns true if the hit took effect. */
  applyHit(kind = 'spin') {
    if (this.starTimer > 0) return false;
    if (kind === 'shrink') {
      const wasShrunk = this.shrinkTimer > 0;
      this.shrinkTimer = PHYSICS.lightningShrinkTime;
      this.radius = PHYSICS.kartRadius * SHRINK_SCALE;
      try { this.model?.setShrunk?.(SHRINK_SCALE); } catch { /* ignore */ }
      if (this.invulnTimer <= 0) {
        this._cancelDrift(false);
        this.boostTimer = 0;
        this._startSpin('shrink', 0.8, 0.55);
      }
      if (!wasShrunk || this.invulnTimer <= 0) bus.emit('kart:hit', { kart: this, kind: 'shrink' });
      return true;
    }
    if (this.invulnTimer > 0) return false;
    this._cancelDrift(false);
    this.boostTimer = 0;
    this._trick = false;
    if (kind === 'tumble') {
      this._startSpin('tumble', PHYSICS.tumbleTime, 0.12);
    } else if (kind === 'squash') {
      this._startSpin('spin', PHYSICS.spinOutTime, 0.3);
      this.squashTimer = 1.4;
      bus.emit('kart:hit', { kart: this, kind: 'spin', squash: true });
      return true;
    } else {
      this._startSpin('spin', PHYSICS.spinOutTime, 0.45);
    }
    bus.emit('kart:hit', { kart: this, kind: kind === 'tumble' ? 'tumble' : 'spin' });
    return true;
  }

  _startSpin(kind, duration, speedKeep) {
    this.hitKind = kind;
    this.spinDuration = duration;
    this.spinTimer = duration;
    this.invulnTimer = Math.max(this.invulnTimer, duration + HIT_INVULN);
    this.velocity.x *= speedKeep;
    this.velocity.z *= speedKeep;
    this.speed *= speedKeep;
    if (kind === 'tumble' && !this.airborne) {
      this.hopVel = 0; this.hopY = 0;
    }
  }

  _endShrink() {
    this.shrinkTimer = 0;
    this.radius = PHYSICS.kartRadius;
    try { this.model?.setShrunk?.(1); } catch { /* ignore */ }
  }

  /** Lakitu-style recovery onto the centerline at the current trackT. */
  respawn(t = this.trackT) {
    const track = this.track;
    if (!track) return;
    let tt = fin(t) ? t : 0;
    tt = ((tt - 0.003) % 1 + 1) % 1;
    let p, tan;
    try { p = track.getPointAt?.(tt); tan = track.getTangentAt?.(tt); } catch { p = null; }
    if (!p || !fin(p.x)) p = track.startPositions?.[0]?.position || new THREE.Vector3();
    const h = tan && fin(tan.x) ? Math.atan2(tan.x, tan.z) : this.heading;
    this._cancelDrift(false);
    this.velocity.set(0, 0, 0);
    this.speed = 0;
    this.heading = fin(h) ? h : 0;
    this.position.set(p.x, (p.y || 0) + 2.6, p.z);
    this.airborne = true;
    this.airTime = 0;
    this._fromRamp = false;
    this._trick = false;
    this.spinTimer = 0;
    this.hitKind = null;
    this.stallTimer = 0;
    this.boostTimer = 0;
    this.respawnTimer = RESPAWN_HANG;
    this.respawnInvuln = RESPAWN_INVULN;
    this.invulnTimer = Math.max(this.invulnTimer, RESPAWN_INVULN);
    this.trackT = tt;
    bus.emit('kart:respawn', { kart: this });
  }

  reset(position, heading) {
    this._resetState();
    if (this.shrinkTimer <= 0) { try { this.model?.setShrunk?.(1); } catch { /* ignore */ } }
    if (position && fin(position.x)) this.position.copy(position);
    this.heading = fin(heading) ? heading : 0;
    this.input = neutralInput();
    this._countdown.holdStart = -1;
    const info = this._surfaceInfo(this.position, undefined);
    if (info) {
      this._applySurfaceInfo(info);
      this.position.y = this.groundHeight;
    }
    this.bodyGroup.position.set(0, 0, 0);
    this.bodyGroup.rotation.set(0, 0, 0);
    this.bodyGroup.scale.set(1, 1, 1);
    this.bodyGroup.visible = true;
    this.tiltGroup.rotation.set(0, 0, 0);
  }

  // ---- surface helpers -------------------------------------------------------------------
  _surfaceInfo(pos, hintT) {
    try {
      const info = this.track?.getSurfaceInfo?.(pos, hintT);
      if (!info || !fin(info.height)) return null;
      return info;
    } catch {
      return null;
    }
  }

  _applySurfaceInfo(info) {
    this.groundHeight = info.height;
    if (info.normal && fin(info.normal.x) && fin(info.normal.y)) this.groundNormal.copy(info.normal);
    else this.groundNormal.set(0, 1, 0);
    if (this.groundNormal.y < 0.2) this.groundNormal.set(0, 1, 0);
    this.groundNormal.normalize();
    this.surface = info.surface || (info.onRoad === false ? 'offroad' : 'road');
    this.onRoad = info.onRoad !== undefined ? !!info.onRoad : this.surface !== 'offroad';
    if (fin(info.t)) this.trackT = ((info.t % 1) + 1) % 1;
    if (fin(info.lateral)) this.lateral = info.lateral;
  }

  _topSpeed() {
    let base = this.stats.maxSpeed * (fin(this.maxSpeedScale) ? this.maxSpeedScale : 1);
    if (this.shrinkTimer > 0) base *= SHRINK_SPEED_FACTOR;
    const offroad = this.surface === 'offroad' && this.boostTimer <= 0 && this.starTimer <= 0 && !this.airborne;
    if (offroad) base *= PHYSICS.offroadMaxSpeedFactor;
    if (this.starTimer > 0) base += STAR_SPEED_BONUS;
    if (this.boostTimer > 0) base += PHYSICS.boostSpeedBonus * this.boostStrength;
    return base;
  }

  _cancelDrift(fireTurbo) {
    if (!this.drifting) { this.driftLevel = 0; this.driftCharge = 0; return; }
    const level = this.driftLevel;
    this.drifting = false;
    this.driftLevel = 0;
    this.driftCharge = 0;
    this.driftTime = 0;
    bus.emit('kart:driftEnd', { kart: this, level, fired: !!(fireTurbo && level > 0) });
    if (fireTurbo && level > 0) {
      const time = PHYSICS.miniTurboTimes?.[level - 1] ?? 0.5;
      bus.emit('kart:miniTurbo', { kart: this, level });
      this.applyBoost(time, MINI_TURBO_STRENGTH[level - 1] ?? 1, 'miniTurbo');
    }
  }

  _startDrift(dir) {
    this.drifting = true;
    this.driftDir = dir >= 0 ? 1 : -1;
    this.driftLevel = 0;
    this.driftCharge = 0;
    this.driftTime = 0;
    this._driftPending = 0;
    bus.emit('kart:driftStart', { kart: this, dir: this.driftDir });
  }

  // ---- main update -----------------------------------------------------------------------
  update(dt) {
    if (!(dt > 0)) return;
    dt = Math.min(dt, 1 / 20);
    try {
      this._update(dt);
    } catch (err) {
      if (!this._warned) { console.error('[kart] update failed', err); this._warned = true; }
      this.respawn();
    }
  }

  _update(dt) {
    this.time += dt;
    const P = PHYSICS;

    // --- timers
    if (this.boostTimer > 0) this.boostTimer = Math.max(0, this.boostTimer - dt);
    if (this.starTimer > 0) this.starTimer = Math.max(0, this.starTimer - dt);
    if (this.invulnTimer > 0) this.invulnTimer = Math.max(0, this.invulnTimer - dt);
    if (this.respawnInvuln > 0) this.respawnInvuln = Math.max(0, this.respawnInvuln - dt);
    if (this.stallTimer > 0) this.stallTimer = Math.max(0, this.stallTimer - dt);
    if (this.squashTimer > 0) this.squashTimer = Math.max(0, this.squashTimer - dt);
    if (this._padCooldown > 0) this._padCooldown -= dt;
    if (this._jumpCooldown > 0) this._jumpCooldown -= dt;
    if (this._wallCooldown > 0) this._wallCooldown -= dt;
    if (this.bumpCooldown > 0) this.bumpCooldown -= dt;
    if (this._driftPending > 0) this._driftPending -= dt;
    if (this.spinTimer > 0) {
      this.spinTimer = Math.max(0, this.spinTimer - dt);
      if (this.spinTimer === 0) this.hitKind = null;
    }
    if (this.shrinkTimer > 0) {
      this.shrinkTimer = Math.max(0, this.shrinkTimer - dt);
      if (this.shrinkTimer === 0) this._endShrink();
    }

    // --- input
    const raw = this.input || neutralInput();
    const locked = this.controlsLocked && !this.finished;
    if (locked && this.isPlayer) {
      // Track throttle hold for the rocket start (main may feed neutral input while locked).
      const thr = this._rawThrottle();
      if (thr > 0.5) { if (this._countdown.holdStart < 0) this._countdown.holdStart = nowSec(); }
      else this._countdown.holdStart = -1;
    }
    const disabled = locked || this.spinTimer > 0 || this.stallTimer > 0;
    let throttle = disabled ? 0 : clamp(+raw.throttle || 0, 0, 1);
    let brake = disabled ? 0 : clamp(+raw.brake || 0, 0, 1);
    let steer = disabled ? 0 : clamp(+raw.steer || 0, -1, 1);
    const driftHeld = !disabled && !!raw.drift;
    const driftPressed = driftHeld && !this._prevDrift;
    this._prevDrift = !disabled && !!raw.drift;
    if (this.respawnTimer > 0) { throttle = 0; brake = 0; }

    this.steerSmoothed = damp(this.steerSmoothed, steer, 14, dt);

    // --- respawn hang (Lakitu holds the kart, then drops it)
    if (this.respawnTimer > 0) {
      this.respawnTimer = Math.max(0, this.respawnTimer - dt);
      this.velocity.set(0, 0, 0);
      this.speed = 0;
      this._animate(dt, steer, throttle);
      return;
    }

    const fwd = this.forward;
    const right = this.right;
    let vF = this.velocity.x * fwd.x + this.velocity.z * fwd.z;
    let vR = this.velocity.x * right.x + this.velocity.z * right.z;
    const top = this._topSpeed();
    const boosting = this.boostTimer > 0;

    // --- longitudinal
    if (this._boostKick > 0) {
      if (vF < top) vF = Math.min(top, vF + this._boostKick);
      this._boostKick = 0;
    }
    if (!this.airborne) {
      if (boosting || this.starTimer > 0 && throttle > 0) {
        if (vF < top) vF = Math.min(top, vF + (boosting ? BOOST_ACCEL : this.stats.accel * 1.8) * dt);
      } else if (brake > 0 && brake >= throttle) {
        if (vF > 0.5) vF = Math.max(0, vF - P.brakeDecel * brake * dt);
        else vF = Math.max(-P.reverseMaxSpeed, vF - this.stats.accel * 0.7 * brake * dt);
      } else if (throttle > 0) {
        if (vF < 0) vF = Math.min(0, vF + P.brakeDecel * throttle * dt) + (vF > -1 ? this.stats.accel * throttle * dt : 0);
        else if (vF < top) {
          const r = vF / Math.max(1, top);
          const a = this.stats.accel * Math.max(0.3, 1.6 - 1.2 * r) * throttle;
          vF = Math.min(top, vF + a * dt);
        }
      } else {
        const c = P.coastDecel * dt;
        vF = Math.abs(vF) <= c ? 0 : vF - Math.sign(vF) * c;
      }
      if (this.spinTimer > 0) {
        const f = (this.hitKind === 'tumble' ? 30 : 22) * dt;
        vF = Math.abs(vF) <= f ? 0 : vF - Math.sign(vF) * f;
      }
      // over top speed (after boost / entering offroad): bleed off smoothly
      if (vF > top) {
        const decel = (this.surface === 'offroad' && !boosting && this.starTimer <= 0) ? OFFROAD_OVERSPEED_DECEL : OVERSPEED_DECEL;
        vF = Math.max(top, vF - decel * dt);
      }
      if (vF < -P.reverseMaxSpeed) vF = damp(vF, -P.reverseMaxSpeed, 8, dt);
      // slope: gravity along the forward direction
      const n = this.groundNormal;
      if (n.y > 0.3) {
        const dhds = -(n.x * fwd.x + n.z * fwd.z) / n.y;
        vF -= P.gravity * SLOPE_GRAVITY_FACTOR * dhds * dt;
      }
    }

    // --- hop & drift state machine
    if (this.hopping) {
      this.hopVel -= HOP_GRAVITY * dt;
      this.hopY += this.hopVel * dt;
      if (this.hopY <= 0) {
        this.hopY = 0; this.hopVel = 0; this.hopping = false;
        if (driftHeld && !this.drifting && vF > DRIFT_MIN_SPEED * 0.8) {
          if (Math.abs(steer) > 0.25) this._startDrift(Math.sign(steer));
          else this._driftPending = DRIFT_PENDING_WINDOW;
        }
      }
    }
    if (driftPressed && !this.airborne && !this.hopping && !this.drifting) {
      this.hopping = true;
      this.hopVel = HOP_VELOCITY;
      this.hopY = 0.001;
      bus.emit('kart:hop', { kart: this });
    }
    if (driftPressed && this.airborne && this._fromRamp && !this._trick) {
      this._trick = true;
      this._trickTime = 0;
      bus.emit('kart:trick', { kart: this });
    }
    if (this._driftPending > 0 && !this.drifting) {
      if (!driftHeld) this._driftPending = 0;
      else if (Math.abs(steer) > 0.3 && vF > DRIFT_MIN_SPEED * 0.8) this._startDrift(Math.sign(steer));
    }
    if (this.drifting) {
      if (!driftHeld) this._cancelDrift(true);
      else if (vF < DRIFT_CANCEL_SPEED) this._cancelDrift(false);
    }
    if (this.drifting) {
      this.driftTime += dt;
      if (!this.airborne && this.surface !== 'offroad') {
        const into = steer * this.driftDir; // -1..1
        const rate = (into >= 0 ? 1 + 0.4 * into : 1 + 0.3 * into) * this.stats.driftCharge;
        this.driftCharge += rate * dt;
      }
      const th = P.driftChargeThresholds;
      let lvl = 0;
      for (let i = 0; i < th.length; i++) if (this.driftCharge >= th[i]) lvl = i + 1;
      if (lvl > this.driftLevel) {
        this.driftLevel = lvl;
        bus.emit('kart:driftLevel', { kart: this, level: lvl });
      }
    }

    // --- steering / yaw
    const speedAbs = Math.abs(vF);
    const authority = clamp(speedAbs / TURN_FULL_SPEED, 0, 1);
    const baseTop = Math.max(1, this.stats.maxSpeed);
    const turnRate = this.stats.turnRate * authority * (1 - HIGH_SPEED_TURN_LOSS * clamp(speedAbs / baseTop, 0, 1));
    let yawRate; // + = turning right
    if (this.drifting) {
      const into = steer * this.driftDir;
      yawRate = this.driftDir * (DRIFT_TURN_BASE + DRIFT_TURN_SPAN * into) * turnRate * DRIFT_TURN_MUL;
    } else {
      yawRate = steer * turnRate * (vF < -0.5 ? -1 : 1);
      if (this.hopping) yawRate *= 1.15;
    }
    if (this.airborne) yawRate *= 0.4;
    if (this.spinTimer > 0) yawRate = 0;
    const h0 = this.heading;
    this.heading = h0 - yawRate * dt;

    // --- recompose velocity in the old frame, then decompose in the new frame and apply grip
    let vx = fwd.x * vF + right.x * vR;
    let vz = fwd.z * vF + right.z * vR;
    const nf = this.forward, nr = this.right;
    let nvF = vx * nf.x + vz * nf.z;
    let nvR = vx * nr.x + vz * nr.z;
    const mag0 = Math.hypot(nvF, nvR);
    const grip = this.airborne ? AIR_GRIP : (this.drifting ? DRIFT_GRIP : (this.spinTimer > 0 ? 3 : NORMAL_GRIP));
    nvR *= Math.exp(-grip * dt);
    // Drift pushes the kart slightly outward (arcade feel)
    if (this.drifting && !this.airborne) nvR -= this.driftDir * speedAbs * 0.12 * dt;
    const mag1 = Math.hypot(nvF, nvR);
    if (mag1 > 1e-4 && !this.airborne && nvF > 1) {
      // give most of the speed scrubbed by grip back to the forward axis (arcade: turning barely slows you)
      const target = mag1 + (mag0 - mag1) * SPEED_KEEP_IN_TURN;
      const f2 = target * target - nvR * nvR;
      if (f2 > 0) nvF = Math.max(nvF, Math.min(Math.sqrt(f2), Math.max(top, nvF)));
    }
    vx = nf.x * nvF + nr.x * nvR;
    vz = nf.z * nvF + nr.z * nvR;
    this.velocity.x = vx;
    this.velocity.z = vz;

    // --- integrate
    const pos = this.position;
    pos.x += vx * dt;
    pos.z += vz * dt;
    if (this.airborne) {
      this.velocity.y -= P.gravity * dt;
      pos.y += this.velocity.y * dt;
      this.airTime += dt;
      if (this._trick) this._trickTime += dt;
    }

    // --- walls
    this._resolveWalls();

    // --- ground
    const info = this._surfaceInfo(pos, this.trackT);
    if (info) {
      const prevGround = this.groundHeight;
      this._applySurfaceInfo(info);
      const gh = info.height;
      if (this.airborne) {
        if (pos.y <= gh && this.velocity.y <= 0) this._land(gh);
        else if (pos.y < gh - 0.5) this._land(gh); // pushed into terrain
      } else {
        const drop = pos.y - gh;
        const groundVy = (gh - prevGround) / dt;
        if (drop > 1.0 && groundVy < -8) {
          // drove off a crest/ledge
          this.airborne = true; this.airTime = 0; this._fromRamp = false;
          this.velocity.y = Math.max(0, this._lastGroundVy || 0);
        } else {
          pos.y = gh;
          this.velocity.y = 0;
          this._lastGroundVy = clamp(groundVy, -30, 30);
        }
      }
      // surface triggers
      if (!this.airborne) {
        if (this.surface === 'boost' && this._padCooldown <= 0) {
          this._padCooldown = 0.35;
          this.applyBoost(PAD_BOOST_TIME, 1, 'pad');
        } else if (this.surface === 'jump' && this._jumpCooldown <= 0 && nvF > 6) {
          this._jumpCooldown = 0.6;
          this.airborne = true;
          this.airTime = 0;
          this._fromRamp = true;
          this._trick = false;
          this.velocity.y = JUMP_BASE_VY + JUMP_SPEED_VY * nvF;
          pos.y += 0.05;
          bus.emit('kart:jump', { kart: this });
        }
      }
    }

    // --- safety net
    this._checkValidity(info);

    this.speed = this.velocity.x * this.forward.x + this.velocity.z * this.forward.z;
    this._animate(dt, steer, throttle);
  }

  _land(gh) {
    const impact = -this.velocity.y;
    this.position.y = gh;
    this.velocity.y = 0;
    const wasRamp = this._fromRamp;
    const airTime = this.airTime;
    this.airborne = false;
    this.airTime = 0;
    this._fromRamp = false;
    this._landSquashVel = -Math.min(3.5, impact * 0.12);
    if (airTime > 0.12 || wasRamp) bus.emit('kart:land', { kart: this, impact, airTime });
    if (this._trick) {
      this._trick = false;
      if (this.spinTimer <= 0) this.applyBoost(TRICK_BOOST_TIME, 0.8, 'trick');
    }
  }

  _resolveWalls() {
    const track = this.track;
    if (!track?.resolveWall) return;
    for (let iter = 0; iter < 2; iter++) {
      let hit = null;
      try { hit = track.resolveWall(this.position, this.radius); } catch { hit = null; }
      if (!hit || !hit.normal || !fin(hit.depth) || hit.depth <= 0) return;
      _n.set(hit.normal.x || 0, 0, hit.normal.z || 0);
      if (_n.lengthSq() < 1e-6) return;
      _n.normalize();
      this.position.x += _n.x * hit.depth;
      this.position.z += _n.z * hit.depth;
      const vn = this.velocity.x * _n.x + this.velocity.z * _n.z;
      if (vn < 0) {
        const impact = -vn;
        // reflect normal component with restitution, damp tangential a little
        const tx = this.velocity.x - _n.x * vn;
        const tz = this.velocity.z - _n.z * vn;
        const tangKeep = 1 - WALL_FRICTION * clamp(impact / 12, 0, 1);
        this.velocity.x = tx * tangKeep - _n.x * vn * WALL_RESTITUTION;
        this.velocity.z = tz * tangKeep - _n.z * vn * WALL_RESTITUTION;
        // glancing hit: steer the nose along the wall so we don't grind
        const f = this.forward;
        const fdotn = f.x * _n.x + f.z * _n.z;
        if (fdotn < 0 && fdotn > -0.75 && Math.hypot(tx, tz) > 4) {
          const desired = Math.atan2(tx, tz);
          let d = desired - this.heading;
          d = Math.atan2(Math.sin(d), Math.cos(d));
          this.heading = this.heading + d * 0.35;
        }
        if (impact > 3 && this._wallCooldown <= 0) {
          this._wallCooldown = 0.25;
          if (this.drifting && impact > 12) this._cancelDrift(false);
          bus.emit('kart:wallBump', { kart: this, intensity: clamp(impact / 25, 0, 1), impactSpeed: impact });
        }
      }
    }
  }

  _checkValidity(info) {
    const p = this.position, v = this.velocity;
    let bad = !fin(p.x) || !fin(p.y) || !fin(p.z) || !fin(v.x) || !fin(v.y) || !fin(v.z) || !fin(this.heading);
    if (!bad && info) {
      if (p.y < info.height - 25) bad = true;
      const halfW = (this.track?.roadWidth || 24) / 2;
      if (fin(info.lateral) && Math.abs(info.lateral) > halfW + 40) bad = true;
    }
    if (!bad && p.y < -500) bad = true;
    if (bad) {
      if (!fin(this.heading)) this.object3D.rotation.y = 0;
      this.respawn();
    }
  }

  // ---- visuals ---------------------------------------------------------------------------
  _animate(dt, steer, throttle) {
    const body = this.bodyGroup;
    const tilt = this.tiltGroup;

    // surface alignment (pitch/roll) in kart-local frame
    const h = this.heading;
    const fx = Math.sin(h), fz = Math.cos(h);
    const lx = Math.cos(h), lz = -Math.sin(h); // local +X (driver's left)
    let targetPitch = 0, targetRoll = 0;
    if (!this.airborne) {
      const n = this.groundNormal;
      targetPitch = Math.atan2(n.x * fx + n.z * fz, n.y);
      targetRoll = Math.atan2(-(n.x * lx + n.z * lz), n.y);
    } else {
      const hs = Math.max(4, Math.abs(this.speed));
      targetPitch = clamp(-Math.atan2(this.velocity.y, hs) * 0.6, -0.4, 0.4);
    }
    this._boostPitch = damp(this._boostPitch, 0, 3, dt);
    this._pitch = damp(this._pitch, targetPitch - this._boostPitch, this.airborne ? 4 : 12, dt);
    this._roll = damp(this._roll, targetRoll, 12, dt);
    tilt.rotation.x = this._pitch;
    tilt.rotation.z = this._roll;

    // drift yaw & lean
    const driftYaw = this.drifting ? -this.driftDir * DRIFT_BODY_YAW * (0.85 + 0.15 * steer * this.driftDir) : 0;
    this._bodyYaw = damp(this._bodyYaw, driftYaw, 10, dt);
    const leanTarget = 0; // body roll/lean is handled by model.animate
    this._lean = damp(this._lean, leanTarget, 8, dt);

    // spin / tumble / stall
    let spinYaw = 0, flip = 0, popY = 0, spinPhase = 0;
    if (this.spinTimer > 0) {
      spinPhase = 1 - this.spinTimer / Math.max(0.01, this.spinDuration);
      const e = 1 - Math.pow(1 - spinPhase, 2.2);
      if (this.hitKind === 'tumble') {
        flip = -e * TAU;
        popY = Math.sin(Math.min(1, spinPhase * 1.4) * Math.PI) * 2.2;
        spinYaw = e * Math.PI * 0.5;
      } else if (this.hitKind === 'stall') {
        spinYaw = Math.sin(spinPhase * Math.PI * 6) * 0.18 * (1 - spinPhase);
      } else if (this.hitKind === 'shrink') {
        spinYaw = e * TAU;
      } else {
        spinYaw = e * TAU * 2;
      }
    }
    // trick flourish (ramp)
    let trickRoll = 0;
    if (this._trick) trickRoll = Math.min(1, this._trickTime / 0.45) * TAU * (this.index % 2 ? 1 : -1);

    // landing squash spring
    const k = 180, c = 14;
    this._landSquashVel += (-k * this._landSquash - c * this._landSquashVel) * dt;
    this._landSquash += this._landSquashVel * dt;
    if (Math.abs(this._landSquash) < 1e-4 && Math.abs(this._landSquashVel) < 1e-3) { this._landSquash = 0; this._landSquashVel = 0; }
    const sq = clamp(this._landSquash, -0.35, 0.35);
    let sy = 1 + sq, sxz = 1 - sq * 0.5;
    if (this.squashTimer > 0) {
      const f = Math.min(1, this.squashTimer / 0.3);
      sy *= 1 - 0.65 * f;
      sxz *= 1 + 0.35 * f;
    }

    body.position.y = this.hopY + popY + (this.respawnTimer > 0 ? Math.sin(this.time * 6) * 0.1 : 0);
    body.rotation.set(flip, this._bodyYaw + spinYaw, this._lean + trickRoll, 'YXZ');
    body.scale.set(sxz, sy, sxz);
    // Lakitu flicker while respawn-protected
    body.visible = this.respawnInvuln > 0 ? (Math.floor(this.time * 16) % 2 === 0) : true;

    const m = this.model;
    if (m?.animate) {
      try {
        m.animate({
          dt,
          speed: this.speed,
          steer: this.steerSmoothed,
          drifting: this.drifting,
          driftDir: this.driftDir,
          driftLevel: this.driftLevel,
          boosting: this.boostTimer > 0,
          airborne: this.airborne || this.hopping,
          spin: spinPhase,
          star: this.starTimer > 0,
          shrunk: this.shrinkTimer > 0,
          throttle,
          time: this.time,
        });
      } catch (err) {
        if (!this._animWarned) { console.warn('[kart] model.animate failed', err); this._animWarned = true; }
      }
    }
  }

  dispose() {
    for (const u of this._unsubs) { try { u(); } catch { /* ignore */ } }
    this._unsubs.length = 0;
    this.object3D.parent?.remove(this.object3D);
    try { this.model?.dispose?.(); } catch { /* ignore */ }
    this.model = null;
  }
}

function nowSec() {
  return (typeof performance !== 'undefined' ? performance.now() : Date.now()) / 1000;
}

// ---- Kart vs kart -------------------------------------------------------------------------
export function resolveKartCollisions(karts) {
  if (!Array.isArray(karts)) return;
  const n = karts.length;
  for (let i = 0; i < n; i++) {
    const a = karts[i];
    if (!a || a.respawnTimer > 0) continue;
    for (let j = i + 1; j < n; j++) {
      const b = karts[j];
      if (!b || b.respawnTimer > 0) continue;
      const dx = b.position.x - a.position.x;
      const dz = b.position.z - a.position.z;
      const dy = b.position.y - a.position.y;
      if (Math.abs(dy) > 2.2) continue;
      const rs = a.radius + b.radius;
      const d2 = dx * dx + dz * dz;
      if (d2 >= rs * rs) continue;
      let d = Math.sqrt(d2);
      let nx, nz;
      if (d < 1e-4) { const ang = (i * 7 + j * 13) % 6.28; nx = Math.cos(ang); nz = Math.sin(ang); d = 0; }
      else { nx = dx / d; nz = dz / d; }
      const overlap = rs - d;

      const aStar = a.starTimer > 0, bStar = b.starTimer > 0;
      const relVn = (a.velocity.x - b.velocity.x) * nx + (a.velocity.z - b.velocity.z) * nz; // >0: approaching
      // Star karts flatten everyone else
      if (aStar && !bStar) b.applyHit('spin');
      else if (bStar && !aStar) a.applyHit('spin');
      else if (!aStar && !bStar) {
        // Full-size kart runs over a shrunk one
        const aSh = a.shrinkTimer > 0, bSh = b.shrinkTimer > 0;
        if (aSh && !bSh) a.applyHit('squash');
        else if (bSh && !aSh) b.applyHit('squash');
      }

      const ma = a.mass || 1, mb = b.mass || 1;
      const inv = 1 / (ma + mb);
      // positional separation weighted by mass
      a.position.x -= nx * overlap * mb * inv;
      a.position.z -= nz * overlap * mb * inv;
      b.position.x += nx * overlap * ma * inv;
      b.position.z += nz * overlap * ma * inv;

      if (relVn > 0) {
        const e = 0.55;
        const jImp = (1 + e) * relVn / (1 / ma + 1 / mb);
        a.velocity.x -= (jImp / ma) * nx;
        a.velocity.z -= (jImp / ma) * nz;
        b.velocity.x += (jImp / mb) * nx;
        b.velocity.z += (jImp / mb) * nz;
      }
      // a little extra side-shove so bumping feels punchy even at low closing speed
      const shove = Math.min(6, overlap * 6);
      a.velocity.x -= nx * shove * mb * inv;
      a.velocity.z -= nz * shove * mb * inv;
      b.velocity.x += nx * shove * ma * inv;
      b.velocity.z += nz * shove * ma * inv;

      const impact = Math.max(0, relVn);
      if (impact > 2 && (a.bumpCooldown || 0) <= 0 && (b.bumpCooldown || 0) <= 0) {
        a.bumpCooldown = 0.3; b.bumpCooldown = 0.3;
        bus.emit('kart:bump', { a, b, intensity: clamp(impact / 20, 0, 1), impactSpeed: impact });
      }
    }
  }
}
