// Fully procedural WebAudio engine: player engine, SFX, and a lookahead-scheduled chiptune sequencer.
import { bus } from './events.js';

const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// ---------------------------------------------------------------------------------------------
// Songs. Steps are 16th notes; 16 steps per bar. Melody entries: [step, midi, lengthInSteps].
// ---------------------------------------------------------------------------------------------
const RACE_SONG = {
  bpm: 150,
  bars: [
    { root: 36, chord: [60, 64, 67], mel: [[0, 76, 2], [2, 79, 2], [4, 84, 3], [7, 83, 1], [8, 79, 2], [10, 76, 2], [12, 79, 4]] },
    { root: 45, chord: [57, 60, 64], mel: [[0, 81, 2], [2, 79, 2], [4, 76, 2], [6, 72, 2], [8, 76, 3], [11, 74, 1], [12, 72, 4]] },
    { root: 41, chord: [60, 65, 69], mel: [[0, 77, 2], [2, 81, 2], [4, 84, 2], [6, 81, 2], [8, 79, 2], [10, 77, 2], [12, 81, 4]] },
    { root: 43, chord: [59, 62, 67], mel: [[0, 79, 3], [3, 81, 1], [4, 83, 2], [6, 86, 2], [8, 83, 2], [10, 79, 2], [12, 74, 2], [14, 79, 2]] },
    { root: 41, chord: [60, 65, 69], mel: [[0, 84, 2], [2, 81, 2], [4, 77, 2], [6, 81, 2], [8, 84, 2], [10, 86, 2], [12, 84, 4]] },
    { root: 43, chord: [59, 62, 67], mel: [[0, 83, 2], [2, 79, 2], [4, 74, 2], [6, 79, 2], [8, 83, 2], [10, 86, 2], [12, 83, 4]] },
    { root: 45, chord: [57, 60, 64], mel: [[0, 84, 3], [3, 83, 1], [4, 81, 2], [6, 76, 2], [8, 81, 2], [10, 84, 2], [12, 88, 4]] },
    { root: 43, chord: [59, 62, 67], mel: [[0, 86, 2], [2, 84, 2], [4, 83, 2], [6, 81, 2], [8, 79, 2], [10, 81, 1], [11, 83, 1], [12, 86, 4]], fill: true },
  ],
  bassPattern: [0, 0, 12, 0, 7, 0, 12, 7],
  style: 'race',
};

const MENU_SONG = {
  bpm: 92,
  bars: [
    { root: 41, chord: [53, 57, 60, 64], mel: [[0, 76, 6], [6, 74, 2], [8, 72, 4], [12, 69, 4]] },
    { root: 40, chord: [52, 55, 59, 62], mel: [[0, 71, 6], [6, 72, 2], [8, 74, 8]] },
    { root: 38, chord: [50, 53, 57, 60], mel: [[0, 77, 4], [4, 76, 4], [8, 74, 4], [12, 72, 4]] },
    { root: 36, chord: [48, 52, 55, 59], mel: [[0, 71, 8], [8, 67, 4], [12, 72, 4]] },
    { root: 41, chord: [53, 57, 60, 64], mel: [[0, 72, 2], [2, 76, 2], [4, 79, 8], [12, 77, 4]] },
    { root: 40, chord: [52, 55, 59, 62], mel: [[0, 76, 4], [4, 74, 4], [8, 71, 8]] },
    { root: 38, chord: [50, 53, 57, 60], mel: [[0, 74, 4], [4, 72, 4], [8, 69, 4], [12, 72, 4]] },
    { root: 43, chord: [50, 55, 59, 62], mel: [[0, 71, 8], [8, 74, 8]] },
  ],
  style: 'menu',
};

const SONGS = { race: RACE_SONG, menu: MENU_SONG };

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.volume = 0.8;
    this.gameplay = false;       // gameplay SFX/engine active (race states)
    this.paused = false;
    this.camera = null;
    this.player = null;
    this.songName = null;
    this.tempoScale = 1;
    this._pendingSong = null;
    this._rouletteTimer = 0;
    this._rouletteActive = false;
    this._offs = [];

    this._onGesture = () => this.unlock();
    window.addEventListener('pointerdown', this._onGesture);
    window.addEventListener('keydown', this._onGesture);
    window.addEventListener('touchstart', this._onGesture);
    this._subscribe();
  }

  // ------------------------------------------------------------------ setup
  unlock() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      try { this.ctx = new AC(); } catch (e) { console.warn('[audio] no AudioContext', e); return; }
      this._buildGraph();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
    if (this._pendingSong !== null && this.ctx) {
      const s = this._pendingSong; this._pendingSong = null; this.playMusic(s);
    }
  }

  _buildGraph() {
    const ctx = this.ctx;
    this.master = ctx.createGain();
    this.master.gain.value = this.muted ? 0 : this.volume;
    this.comp = ctx.createDynamicsCompressor();
    this.comp.threshold.value = -14; this.comp.knee.value = 12; this.comp.ratio.value = 4;
    this.comp.attack.value = 0.004; this.comp.release.value = 0.2;
    this.master.connect(this.comp); this.comp.connect(ctx.destination);

    this.musicGain = ctx.createGain(); this.musicGain.gain.value = 0.42; this.musicGain.connect(this.master);
    this.sfxGain = ctx.createGain(); this.sfxGain.gain.value = 0.9; this.sfxGain.connect(this.master);

    // shared noise buffer (2 s)
    const len = ctx.sampleRate * 2;
    this.noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;

    // -- engine: two detuned oscillators + sub through a lowpass
    this.engGain = ctx.createGain(); this.engGain.gain.value = 0;
    this.engFilter = ctx.createBiquadFilter(); this.engFilter.type = 'lowpass'; this.engFilter.frequency.value = 400; this.engFilter.Q.value = 3;
    this.engA = ctx.createOscillator(); this.engA.type = 'sawtooth'; this.engA.frequency.value = 60;
    this.engB = ctx.createOscillator(); this.engB.type = 'square'; this.engB.frequency.value = 60; this.engB.detune.value = 14;
    this.engSub = ctx.createOscillator(); this.engSub.type = 'sine'; this.engSub.frequency.value = 30;
    const gA = ctx.createGain(); gA.gain.value = 0.5;
    const gB = ctx.createGain(); gB.gain.value = 0.28;
    const gS = ctx.createGain(); gS.gain.value = 0.6;
    this.engA.connect(gA); this.engB.connect(gB); this.engSub.connect(gS);
    gA.connect(this.engFilter); gB.connect(this.engFilter); gS.connect(this.engFilter);
    // a little "putt-putt" amplitude wobble
    this.engLfo = ctx.createOscillator(); this.engLfo.frequency.value = 18;
    this.engLfoGain = ctx.createGain(); this.engLfoGain.gain.value = 0.25;
    this.engAm = ctx.createGain(); this.engAm.gain.value = 0.75;
    this.engLfo.connect(this.engLfoGain); this.engLfoGain.connect(this.engAm.gain);
    this.engFilter.connect(this.engAm); this.engAm.connect(this.engGain); this.engGain.connect(this.sfxGain);
    for (const o of [this.engA, this.engB, this.engSub, this.engLfo]) o.start();

    // -- drift screech: looping noise through a resonant bandpass
    this.drSrc = ctx.createBufferSource(); this.drSrc.buffer = this.noiseBuf; this.drSrc.loop = true;
    this.drFilter = ctx.createBiquadFilter(); this.drFilter.type = 'bandpass'; this.drFilter.frequency.value = 1500; this.drFilter.Q.value = 6;
    this.drGain = ctx.createGain(); this.drGain.gain.value = 0;
    this.drSrc.connect(this.drFilter); this.drFilter.connect(this.drGain); this.drGain.connect(this.sfxGain);
    this.drSrc.start();

    // -- music scheduler
    this._step = 0; this._nextTime = 0;
    this._sched = setInterval(() => this._schedule(), 25);
  }

  _subscribe() {
    const on = (n, f) => this._offs.push(bus.on(n, (d) => { if (this.ctx) { try { f(d || {}); } catch (e) { console.warn('[audio]', n, e); } } }));
    const isP = (k) => k && k.isPlayer;
    on('race:countdown', () => this.beep(440, 0.18, 'square', 0.22));
    on('race:go', () => { this.beep(880, 0.55, 'square', 0.24); this.beep(1760, 0.4, 'sine', 0.08); });
    on('race:lap', (d) => { if (isP(d.kart)) this.lapChime(); });
    on('race:finalLap', () => { this.finalLapJingle(); this.tempoScale = 1.12; });
    on('race:finish', (d) => { if (isP(d.kart)) { this.fanfare(d.place); } });
    on('kart:driftLevel', (d) => { if (isP(d.kart) && d.level > 0) this.sparkTick(d.level); });
    on('kart:miniTurbo', (d) => { if (isP(d.kart)) this.whoosh(0.3 + 0.15 * (d.level || 1), 1 + 0.2 * (d.level || 1)); });
    on('kart:boost', (d) => { if (isP(d.kart) && d.source !== 'miniTurbo') this.whoosh(0.6, 1); });
    on('kart:hit', (d) => { if (isP(d.kart)) this.hitSound(d.kind); else this.atPos(d.kart && d.kart.position, 0.5, (g) => this.hitSound(d.kind, g)); });
    on('kart:wallBump', (d) => { if (isP(d.kart)) this.thud(clamp(d.intensity ?? 0.5, 0.1, 1)); });
    on('kart:bump', (d) => { if (isP(d.a) || isP(d.b)) this.thud(clamp((d.intensity ?? 0.5) * 0.7, 0.1, 0.8), 180); });
    on('kart:jump', (d) => { if (isP(d.kart)) this.boing(); });
    on('kart:land', (d) => { if (isP(d.kart)) this.thud(0.35, 90); });
    on('item:pickup', (d) => { if (isP(d.kart)) this.chime(); });
    on('item:roulette', (d) => { if (isP(d.kart)) { this._rouletteActive = true; this._rouletteTimer = 0; this._rouletteElapsed = 0; } });
    on('item:got', (d) => { if (isP(d.kart)) { this._rouletteActive = false; this.gotItem(); } });
    on('item:use', (d) => { if (isP(d.kart)) this.throwSound(d.item); });
    on('item:hit', (d) => { if (isP(d.by) && !isP(d.kart)) this.beep(1320, 0.12, 'square', 0.08); });
    on('item:explode', (d) => { const small = d.kind === 'small' || (d.radius != null && d.radius < 3); this.atPos(d.position, small ? 0.35 : 1, (g) => (small ? this.pop(g) : this.explosion(g))); });
    on('item:lightning', () => this.zap());
    on('ui:move', () => this.uiClick(0));
    on('ui:confirm', () => this.uiClick(1));
    on('ui:back', () => this.uiClick(2));
  }

  // ------------------------------------------------------------------ public controls
  setGameplayActive(on) { this.gameplay = !!on; if (!on) { this._rouletteActive = false; this.tempoScale = 1; } }
  setPaused(p) {
    this.paused = !!p;
    if (this.musicGain && this.ctx) this.musicGain.gain.setTargetAtTime(p ? 0.14 : 0.42, this.ctx.currentTime, 0.1);
  }
  toggleMute() {
    this.muted = !this.muted;
    if (this.master && this.ctx) this.master.gain.setTargetAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime, 0.03);
    return this.muted;
  }
  setVolume(v) { this.volume = clamp(v, 0, 1); if (this.master && !this.muted) this.master.gain.value = this.volume; }

  playMusic(name) {
    if (!this.ctx) { this._pendingSong = name; return; }
    if (name === this.songName) return;
    this.songName = name;
    this.tempoScale = 1;
    this._step = 0;
    this._nextTime = this.ctx.currentTime + 0.08;
    // quick dip to hide the switch
    const g = this.musicGain.gain, t = this.ctx.currentTime;
    g.cancelScheduledValues(t); g.setValueAtTime(0.0, t); g.linearRampToValueAtTime(this.paused ? 0.14 : 0.42, t + 0.4);
  }
  stopMusic() { this.songName = null; this._pendingSong = null; }

  update(dt, { player, karts, camera } = {}) {
    this.player = player || null;
    this.camera = camera || this.camera;
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const live = this.gameplay && !this.paused && player;
    // engine
    if (live) {
      const sp = Math.abs(player.speed || 0);
      const boosting = (player.boostTimer > 0) || (player.starTimer > 0);
      const shrunk = player.shrinkTimer > 0 ? 1.5 : 1;
      let f = (48 + sp * 2.3 + (boosting ? 22 : 0)) * shrunk;
      if (player.airborne) f *= 1.12;
      this.engA.frequency.setTargetAtTime(f, t, 0.06);
      this.engB.frequency.setTargetAtTime(f * 1.005, t, 0.06);
      this.engSub.frequency.setTargetAtTime(f * 0.5, t, 0.06);
      this.engLfo.frequency.setTargetAtTime(10 + sp * 0.6, t, 0.1);
      this.engFilter.frequency.setTargetAtTime(260 + sp * 45 + (boosting ? 900 : 0), t, 0.08);
      this.engGain.gain.setTargetAtTime(0.13 + Math.min(sp, 40) * 0.0016, t, 0.1);
      // drift screech
      const drifting = player.drifting && sp > 6 && !player.airborne;
      this.drGain.gain.setTargetAtTime(drifting ? 0.06 : 0, t, drifting ? 0.04 : 0.08);
      this.drFilter.frequency.setTargetAtTime(1300 + (player.driftLevel || 0) * 280 + Math.sin(t * 13) * 120, t, 0.05);
    } else {
      this.engGain.gain.setTargetAtTime(0, t, 0.12);
      this.drGain.gain.setTargetAtTime(0, t, 0.05);
    }
    // roulette ticks (stop after 3 s as a safety net)
    if (this._rouletteActive && live) {
      this._rouletteTimer -= dt; this._rouletteElapsed += dt;
      if (this._rouletteTimer <= 0) { this._rouletteTimer = 0.075; this.beep(1100 + Math.random() * 500, 0.03, 'square', 0.05); }
      if (this._rouletteElapsed > 3) this._rouletteActive = false;
    }
  }

  // ------------------------------------------------------------------ helpers
  _env(gainNode, t, attack, peak, decay) {
    const g = gainNode.gain;
    g.setValueAtTime(0.0001, t);
    g.linearRampToValueAtTime(peak, t + attack);
    g.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  }
  _osc(type, freq, t, dur, peak, dest, attack = 0.005) {
    const ctx = this.ctx;
    const o = ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(freq, t);
    const g = ctx.createGain(); this._env(g, t, attack, peak, Math.max(0.02, dur));
    o.connect(g); g.connect(dest || this.sfxGain);
    o.start(t); o.stop(t + attack + dur + 0.05);
    return { o, g };
  }
  _noise(t, dur, peak, filterType, freq, q = 1, dest) {
    const ctx = this.ctx;
    const s = ctx.createBufferSource(); s.buffer = this.noiseBuf;
    s.playbackRate.value = 1;
    const f = ctx.createBiquadFilter(); f.type = filterType; f.frequency.setValueAtTime(freq, t); f.Q.value = q;
    const g = ctx.createGain(); this._env(g, t, 0.003, peak, dur);
    s.connect(f); f.connect(g); g.connect(dest || this.sfxGain);
    const off = Math.random() * Math.max(0, 1.9 - dur);
    s.start(t, off); s.stop(t + dur + 0.05);
    return { s, f, g };
  }
  atPos(pos, maxGain, fn) {
    if (!this.gameplay) return;
    let g = maxGain;
    if (pos && this.camera) {
      const d = this.camera.position.distanceTo(pos);
      g = maxGain * clamp(1 - d / 140, 0, 1);
    }
    if (g > 0.03) fn(g);
  }

  // ------------------------------------------------------------------ SFX
  beep(freq, dur, type = 'square', vol = 0.15) {
    if (!this.ctx) return;
    this._osc(type, freq, this.ctx.currentTime, dur, vol);
  }
  uiClick(kind) {
    const t = this.ctx.currentTime;
    if (kind === 0) this._osc('triangle', 880, t, 0.05, 0.12);
    else if (kind === 1) { this._osc('square', 660, t, 0.06, 0.09); this._osc('square', 990, t + 0.06, 0.1, 0.09); }
    else this._osc('triangle', 440, t, 0.08, 0.12);
  }
  chime() {
    const t = this.ctx.currentTime;
    [72, 76, 79, 84].forEach((m, i) => this._osc('triangle', mtof(m + 12), t + i * 0.045, 0.18, 0.12));
    this._osc('sine', mtof(96), t + 0.18, 0.3, 0.05);
  }
  gotItem() {
    const t = this.ctx.currentTime;
    this._osc('square', mtof(84), t, 0.07, 0.07);
    this._osc('square', mtof(91), t + 0.07, 0.16, 0.07);
  }
  sparkTick(level) {
    const t = this.ctx.currentTime;
    const base = [0, 76, 81, 88][level] || 88;
    this._osc('sine', mtof(base + 12), t, 0.1, 0.1);
    this._osc('triangle', mtof(base + 19), t + 0.04, 0.12, 0.06);
  }
  whoosh(dur = 0.6, pitch = 1) {
    const t = this.ctx.currentTime;
    const n = this._noise(t, dur, 0.28, 'bandpass', 400 * pitch, 1.2);
    n.f.frequency.exponentialRampToValueAtTime(3200 * pitch, t + dur * 0.5);
    n.f.frequency.exponentialRampToValueAtTime(900, t + dur);
    const o = this._osc('sawtooth', 120 * pitch, t, dur, 0.06);
    o.o.frequency.exponentialRampToValueAtTime(420 * pitch, t + dur * 0.8);
  }
  hitSound(kind, vol = 1) {
    const t = this.ctx.currentTime;
    if (kind === 'shrink') {
      const o = this._osc('square', 900, t, 0.5, 0.1 * vol);
      o.o.frequency.exponentialRampToValueAtTime(200, t + 0.5);
      return;
    }
    const o = this._osc('square', 700, t, 0.6, 0.12 * vol);
    o.o.frequency.exponentialRampToValueAtTime(120, t + 0.6);
    const lfo = this.ctx.createOscillator(); lfo.frequency.value = 22;
    const lg = this.ctx.createGain(); lg.gain.value = 60;
    lfo.connect(lg); lg.connect(o.o.frequency); lfo.start(t); lfo.stop(t + 0.7);
    this._noise(t, 0.15, 0.25 * vol, 'lowpass', 1800);
  }
  thud(intensity = 0.5, freq = 120) {
    const t = this.ctx.currentTime;
    const o = this._osc('sine', freq, t, 0.18, 0.35 * intensity);
    o.o.frequency.exponentialRampToValueAtTime(40, t + 0.18);
    this._noise(t, 0.08, 0.18 * intensity, 'lowpass', 600);
  }
  boing() {
    const t = this.ctx.currentTime;
    const o = this._osc('triangle', 220, t, 0.25, 0.1);
    o.o.frequency.exponentialRampToValueAtTime(660, t + 0.2);
  }
  throwSound(item) {
    const t = this.ctx.currentTime;
    if (item === 'mushroom' || item === 'triple_mushroom') return; // kart:boost {source:'item'} plays the whoosh
    if (item === 'star') {
      [72, 76, 79, 84, 88, 91].forEach((m, i) => this._osc('square', mtof(m), t + i * 0.05, 0.1, 0.06));
      return;
    }
    if (item === 'lightning') return; // item:lightning plays the zap
    const n = this._noise(t, 0.25, 0.22, 'bandpass', 2400, 2);
    n.f.frequency.exponentialRampToValueAtTime(600, t + 0.25);
    const o = this._osc('square', 500, t, 0.15, 0.05);
    o.o.frequency.exponentialRampToValueAtTime(1200, t + 0.15);
  }
  explosion(vol = 1) {
    const t = this.ctx.currentTime;
    const n = this._noise(t, 1.1, 0.6 * vol, 'lowpass', 2400, 0.7);
    n.f.frequency.exponentialRampToValueAtTime(120, t + 1.0);
    const o = this._osc('sine', 110, t, 0.9, 0.7 * vol);
    o.o.frequency.exponentialRampToValueAtTime(28, t + 0.9);
  }
  pop(vol = 1) {
    const t = this.ctx.currentTime;
    this._noise(t, 0.18, 0.4 * vol, 'bandpass', 1400, 0.8);
    const o = this._osc('square', 320, t, 0.12, 0.12 * vol);
    o.o.frequency.exponentialRampToValueAtTime(90, t + 0.12);
  }
  zap() {
    const t = this.ctx.currentTime;
    for (let i = 0; i < 5; i++) this._noise(t + i * 0.05 + Math.random() * 0.03, 0.08, 0.3, 'highpass', 2500 + Math.random() * 3000, 1);
    const o = this._osc('sawtooth', 1800, t, 0.8, 0.12);
    o.o.frequency.exponentialRampToValueAtTime(80, t + 0.8);
    const o2 = this._osc('sine', 60, t + 0.05, 0.9, 0.4);
    o2.o.frequency.exponentialRampToValueAtTime(30, t + 0.9);
  }
  lapChime() {
    const t = this.ctx.currentTime;
    [79, 84, 88].forEach((m, i) => this._osc('square', mtof(m), t + i * 0.09, 0.14, 0.08));
    this._osc('triangle', mtof(91), t + 0.27, 0.4, 0.1);
  }
  finalLapJingle() {
    const t = this.ctx.currentTime;
    const seq = [[72, 0], [72, 0.12], [72, 0.24], [76, 0.36], [79, 0.6], [84, 0.84]];
    for (const [m, dt] of seq) { this._osc('square', mtof(m), t + dt, 0.14, 0.09); this._osc('triangle', mtof(m - 12), t + dt, 0.14, 0.08); }
    this._osc('square', mtof(88), t + 1.08, 0.6, 0.09);
    this._osc('triangle', mtof(76), t + 1.08, 0.6, 0.08);
  }
  fanfare(place = 1) {
    const t = this.ctx.currentTime + 0.05;
    const good = place <= 3;
    const seq = good
      ? [[72, 0, 0.12], [76, 0.14, 0.12], [79, 0.28, 0.12], [84, 0.42, 0.36], [79, 0.8, 0.12], [84, 0.94, 0.9]]
      : [[72, 0, 0.2], [71, 0.24, 0.2], [69, 0.48, 0.2], [67, 0.72, 0.8]];
    for (const [m, dt, d] of seq) {
      this._osc('square', mtof(m), t + dt, d, 0.09);
      this._osc('triangle', mtof(m - 12), t + dt, d, 0.1);
      if (good) this._osc('sawtooth', mtof(m + 7), t + dt, d, 0.025);
    }
    if (good) this._noise(t + 0.94, 1.2, 0.08, 'highpass', 6000);
  }

  // ------------------------------------------------------------------ music sequencer
  _schedule() {
    if (!this.ctx || !this.songName || this.ctx.state !== 'running') return;
    const song = SONGS[this.songName];
    if (!song) return;
    const now = this.ctx.currentTime;
    if (this._nextTime < now - 0.2) this._nextTime = now + 0.02; // tab was asleep
    const stepDur = 60 / (song.bpm * this.tempoScale) / 4;
    while (this._nextTime < now + 0.13) {
      try { this._playStep(song, this._step, this._nextTime, stepDur); } catch (e) { /* never break the scheduler */ }
      this._nextTime += stepDur;
      this._step = (this._step + 1) % (song.bars.length * 16);
    }
  }

  _mOsc(type, midi, t, dur, vol, cutoff) {
    const ctx = this.ctx;
    const o = ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(mtof(midi), t);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.008);
    g.gain.setValueAtTime(vol, t + Math.max(0.01, dur * 0.6));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    let last = o;
    if (cutoff) {
      const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = cutoff;
      o.connect(f); last = f;
    }
    last.connect(g); g.connect(this.musicGain);
    o.start(t); o.stop(t + dur + 0.05);
    return o;
  }
  _kick(t, vol = 0.6) {
    const ctx = this.ctx;
    const o = ctx.createOscillator(); o.type = 'sine';
    o.frequency.setValueAtTime(160, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.12);
    const g = ctx.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
    o.connect(g); g.connect(this.musicGain); o.start(t); o.stop(t + 0.3);
  }
  _snare(t, vol = 0.3) {
    this._noise(t, 0.16, vol, 'highpass', 1500, 0.7, this.musicGain);
    const ctx = this.ctx;
    const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.setValueAtTime(200, t); o.frequency.exponentialRampToValueAtTime(140, t + 0.08);
    const g = ctx.createGain(); g.gain.setValueAtTime(vol * 0.8, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
    o.connect(g); g.connect(this.musicGain); o.start(t); o.stop(t + 0.12);
  }
  _hat(t, vol = 0.08, open = false) { this._noise(t, open ? 0.12 : 0.035, vol, 'highpass', 7500, 0.8, this.musicGain); }

  _playStep(song, step, t, sd) {
    const barIdx = Math.floor(step / 16) % song.bars.length;
    const s = step % 16;
    const bar = song.bars[barIdx];
    if (song.style === 'race') {
      // drums
      if (s % 4 === 0) this._kick(t, 0.55);
      if (bar.fill && s === 14) this._kick(t, 0.4);
      if (s === 4 || s === 12) this._snare(t, 0.26);
      if (bar.fill && s >= 13) this._snare(t, 0.14 + (s - 13) * 0.05);
      if (s % 2 === 1) this._hat(t, 0.035);
      if (s % 4 === 2) this._hat(t, 0.06, true);
      // bass (8ths)
      if (s % 2 === 0) this._mOsc('sawtooth', bar.root + song.bassPattern[s / 2], t, sd * 1.6, 0.13, 900);
      // arpeggio (16ths)
      const ch = bar.chord;
      const arpNote = [ch[0], ch[1], ch[2], ch[0] + 12][s % 4] + 12;
      this._mOsc('square', arpNote, t, sd * 0.8, 0.025, 3000);
      // lead
      for (const [st, m, len] of bar.mel) {
        if (st === s) {
          const o = this._mOsc('square', m, t, sd * len * 0.95, 0.055, 4200);
          // gentle vibrato on longer notes
          if (len >= 3) {
            const l = this.ctx.createOscillator(); l.frequency.value = 6;
            const lg = this.ctx.createGain(); lg.gain.value = 6;
            l.connect(lg); lg.connect(o.detune); l.start(t + sd); l.stop(t + sd * len);
          }
          this._mOsc('triangle', m - 12, t, sd * len * 0.9, 0.03);
        }
      }
    } else {
      // mellow menu groove
      if (s === 0 || s === 10) this._kick(t, 0.32);
      if (s === 8) this._snare(t, 0.08);
      if (s % 2 === 0) this._hat(t, s % 4 === 2 ? 0.03 : 0.015);
      if (s === 0) {
        for (const m of bar.chord) this._mOsc('triangle', m, t, sd * 15, 0.028, 1400);
        this._mOsc('sine', bar.root, t, sd * 6, 0.16);
      }
      if (s === 8) this._mOsc('sine', bar.root + 7, t, sd * 6, 0.12);
      if (s % 2 === 0) {
        const ch = bar.chord;
        const order = [0, 1, 2, 3, 2, 1, 2, 3];
        this._mOsc('sine', ch[order[s / 2]] + 12, t, sd * 1.8, 0.035);
      }
      for (const [st, m, len] of bar.mel) {
        if (st === s) {
          this._mOsc('sine', m, t, sd * len, 0.07);
          this._mOsc('triangle', m + 12, t, sd * Math.min(len, 2), 0.015);
        }
      }
    }
  }

  dispose() {
    for (const off of this._offs) off();
    this._offs = [];
    clearInterval(this._sched);
    window.removeEventListener('pointerdown', this._onGesture);
    window.removeEventListener('keydown', this._onGesture);
    window.removeEventListener('touchstart', this._onGesture);
    try { this.ctx && this.ctx.close(); } catch (e) { /* ignore */ }
  }
}
