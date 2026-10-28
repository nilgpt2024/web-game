// RaceManager: grid, countdown, laps (with checkpoint guard), standings, finish, wrong-way detection.
import * as THREE from 'three';
import { bus } from './events.js';
import { RACE } from './config.js';

const _fwd = new THREE.Vector3();

export class RaceManager {
  /**
   * @param {object} o
   * @param {object} o.track
   * @param {Array} o.karts   - karts in grid order is NOT required; use placeOnGrid(slotOrder)
   * @param {object} o.player - player kart (may be null for attract mode)
   * @param {number} o.laps
   * @param {boolean} o.silent - no bus events (attract mode)
   */
  constructor({ track, karts, player = null, laps = RACE.laps, silent = false }) {
    this.track = track;
    this.karts = karts;
    this.player = player;
    this.laps = Math.max(1, laps | 0);
    this.silent = silent;
    this.phase = 'grid';           // 'grid' | 'countdown' | 'racing' | 'done'
    this.countdownTime = 0;
    this.countdownValue = null;    // 3,2,1,'GO' for HUD
    this.raceTime = 0;
    this.standings = karts.slice();
    this.playerFinished = false;
    this.ended = false;
    this.endTimer = -1;
    this.results = null;
    this.wrongWay = false;
    this._wrongTimer = 0;
    this._rightTimer = 0;
    this._cdIndex = 0;
    this._finishCount = 0;
    for (const k of karts) this._initKart(k);
  }

  _emit(name, data) { if (!this.silent) bus.emit(name, data); }

  _initKart(k) {
    k.lap = 1;
    k.finished = false;
    k.finishTime = null;
    k.place = 1;
    k._lapCount = 0;          // number of times crossed the line going forward (0 = still behind the line)
    k._checkpoint = false;
    k._prevT = null;
    k._lapStart = 0;
    k.lapTimes = [];
    k.raceProgress = 0;
    k._startProgress = null;
  }

  /** Put karts on grid slots. order[i] = kart that goes into startPositions[i]. */
  placeOnGrid(order = this.karts) {
    const sp = this.track && this.track.startPositions;
    order.forEach((k, i) => {
      const slot = sp && sp[i % sp.length];
      if (!slot) return;
      try {
        if (typeof k.reset === 'function') k.reset(slot.position.clone(), slot.heading);
        else { k.position.copy(slot.position); k.heading = slot.heading; }
      } catch (e) { console.warn('[race] reset failed', e); }
      try { k.trackT = this.track.getSurfaceInfo(k.position).t; } catch (e) { k.trackT = this._tOf(k); }
      k._prevT = k.trackT;
      // a grid slot already past the line counts as being on lap 1
      k._lapCount = k.trackT < 0.5 ? 1 : 0;
      k.controlsLocked = true;
    });
    this._updateProgress();
    this._sortPlaces();
  }

  _tOf(k) {
    if (typeof k.trackT === 'number' && isFinite(k.trackT)) return k.trackT;
    try { return this.track.getSurfaceInfo(k.position).t; } catch (e) { return 0; }
  }

  startCountdown() {
    this.phase = 'countdown';
    this.countdownTime = 0;
    this._cdIndex = 0;
    for (const k of this.karts) k.controlsLocked = true;
  }

  /** Attract mode: skip countdown entirely. */
  startImmediately() {
    this.phase = 'racing';
    for (const k of this.karts) k.controlsLocked = false;
  }

  update(dt) {
    if (this.phase === 'countdown') {
      this.countdownTime += dt;
      // lead-in 0.5 s, then 3, 2, 1 at 1 s intervals, then GO
      const marks = [0.5, 1.5, 2.5, 3.5];
      while (this._cdIndex < marks.length && this.countdownTime >= marks[this._cdIndex]) {
        const i = this._cdIndex++;
        if (i < 3) { this.countdownValue = 3 - i; this._emit('race:countdown', { n: 3 - i }); }
        else {
          this.countdownValue = 'GO';
          this.phase = 'racing';
          this.raceTime = 0;
          for (const k of this.karts) { k.controlsLocked = false; k._lapStart = 0; }
          this._emit('race:go', {});
        }
      }
      this._updateProgress();
      this._sortPlaces();
      return;
    }
    if (this.phase !== 'racing' && this.phase !== 'done') { this._updateProgress(); this._sortPlaces(); return; }

    this.raceTime += dt;
    for (const k of this.karts) this._updateLaps(k);
    this._updateProgress();
    this._sortPlaces();
    if (this.player && !this.player.finished && this.phase === 'racing') this._updateWrongWay(dt);
    else if (this.wrongWay) this._setWrongWay(false);

    if (this.endTimer >= 0) {
      this.endTimer -= dt;
      if (this.endTimer < 0 && !this.ended) this._end();
    }
  }

  _updateLaps(k) {
    const t = this._tOf(k);
    const prev = k._prevT == null ? t : k._prevT;
    k._prevT = t;
    if (t > 0.4 && t < 0.62) k._checkpoint = true;
    const d = t - prev;
    if (d < -0.5) {
      // crossed the line going forward
      if (k._lapCount === 0 || k._checkpoint) {
        k._lapCount++;
        k._checkpoint = false;
        if (k._lapCount >= 2) {
          const lapTime = this.raceTime - k._lapStart;
          k.lapTimes.push(lapTime);
          k._lapStart = this.raceTime;
          if (k._lapCount > this.laps) { this._finish(k); return; }
          k.lap = k._lapCount;
          this._emit('race:lap', { kart: k, lap: k.lap, lapTime });
          if (k === this.player && k.lap === this.laps && this.laps > 1) this._emit('race:finalLap', {});
        }
      }
    } else if (d > 0.5) {
      // crossed the line going backwards: undo
      if (!k.finished) {
        k._lapCount--;
        k._checkpoint = true;
      }
    }
    if (!k.finished) k.lap = Math.max(1, Math.min(this.laps, k._lapCount));
  }

  _finish(k) {
    if (k.finished) return;
    k.finished = true;
    k.finishTime = this.raceTime;
    k.lap = this.laps;
    this._finishCount++;
    k._finishOrder = this._finishCount;
    this._sortPlaces();
    const place = k.place;
    this._emit('race:finish', { kart: k, place, time: k.finishTime });
    if (k === this.player) {
      this.playerFinished = true;
      this.endTimer = 3.8;
      this._setWrongWay(false);
    }
    if (this._finishCount >= this.karts.length && this.endTimer < 0 && !this.ended && this.player) this.endTimer = 1;
  }

  _updateProgress() {
    for (const k of this.karts) {
      if (k.finished) { k.raceProgress = this.laps + 1 + (100 - (k._finishOrder ?? 0)) * 1e-4; continue; }
      const t = this._tOf(k);
      // behind the line on the grid -> t close to 1, lapCount 0 -> progress just below 1
      k.raceProgress = k._lapCount + t;
      if (k._startProgress == null && this.phase === 'racing') k._startProgress = k.raceProgress;
    }
  }

  _sortPlaces() {
    const s = this.standings;
    s.sort((a, b) => {
      if (a.finished && b.finished) return a.finishTime - b.finishTime;
      if (a.finished) return -1;
      if (b.finished) return 1;
      return b.raceProgress - a.raceProgress;
    });
    for (let i = 0; i < s.length; i++) s[i].place = i + 1;
  }

  _updateWrongWay(dt) {
    const k = this.player;
    if (!this.track || typeof this.track.getTangentAt !== 'function') return;
    let tan;
    try { tan = this.track.getTangentAt(this._tOf(k)); } catch (e) { return; }
    if (!tan) return;
    _fwd.set(Math.sin(k.heading || 0), 0, Math.cos(k.heading || 0));
    const tl = Math.hypot(tan.x, tan.z) || 1;
    const dot = (_fwd.x * tan.x + _fwd.z * tan.z) / tl;
    // moving backwards along the track also counts (e.g. reversing wrong way)
    const vx = k.velocity ? k.velocity.x : 0, vz = k.velocity ? k.velocity.z : 0;
    const vdot = (vx * tan.x + vz * tan.z) / tl;
    const moving = Math.abs(k.speed || 0) > 3;
    const wrong = moving && dot < -0.25 && vdot < -2;
    if (wrong) { this._wrongTimer += dt; this._rightTimer = 0; }
    else { this._rightTimer += dt; this._wrongTimer = 0; }
    if (!this.wrongWay && this._wrongTimer > 1) this._setWrongWay(true);
    else if (this.wrongWay && this._rightTimer > 0.4) this._setWrongWay(false);
  }

  _setWrongWay(v) {
    if (this.wrongWay === v) return;
    this.wrongWay = v;
    this._emit('race:wrongWay', { active: v });
  }

  _end() {
    this.ended = true;
    this.phase = 'done';
    this.results = this.computeResults();
    this._emit('race:end', { results: this.results });
  }

  /** Final standings; unfinished karts get an estimated finish time from remaining distance & average speed. */
  computeResults() {
    const len = (this.track && this.track.length) || 2000;
    const rows = [];
    const unfinished = [];
    for (const k of this.karts) {
      if (k.finished) rows.push({ kart: k, time: k.finishTime, estimated: false });
      else unfinished.push(k);
    }
    rows.sort((a, b) => a.time - b.time);
    unfinished.sort((a, b) => b.raceProgress - a.raceProgress);
    let lastTime = rows.length ? rows[rows.length - 1].time : this.raceTime;
    for (const k of unfinished) {
      const covered = Math.max(0.05, k.raceProgress - (k._startProgress ?? 0.95)) * len;
      const avg = Math.max(12, covered / Math.max(1, this.raceTime));
      const remaining = Math.max(0, (this.laps + 1 - k.raceProgress)) * len;
      let est = this.raceTime + remaining / avg;
      if (est <= lastTime) est = lastTime + 0.3 + Math.random() * 0.8;
      lastTime = est;
      rows.push({ kart: k, time: est, estimated: true });
    }
    return rows.map((r, i) => ({
      place: i + 1,
      kart: r.kart,
      character: r.kart.character,
      name: r.kart.character ? r.kart.character.name : `Racer ${i + 1}`,
      isPlayer: !!r.kart.isPlayer,
      time: r.time,
      estimated: r.estimated,
      bestLap: r.kart.lapTimes && r.kart.lapTimes.length ? Math.min(...r.kart.lapTimes) : null,
    }));
  }

  /** Debug: jump a kart to just before the finish of its current / final lap. */
  debugSetLap(k, lapCount) {
    k._lapCount = lapCount;
    k._checkpoint = true;
    k.lap = Math.max(1, Math.min(this.laps, lapCount));
  }

  dispose() {
    this.karts = [];
    this.standings = [];
    this.player = null;
  }
}

export function formatTime(t) {
  if (t == null || !isFinite(t)) return '--:--.--';
  const m = Math.floor(t / 60);
  const s = t - m * 60;
  const ss = Math.floor(s);
  const cs = Math.floor((s - ss) * 100);
  return `${m}:${String(ss).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
}
