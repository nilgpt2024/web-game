// LAST PARCEL — outbreak night
// A first-person survival run built on three.js + Polyfork low-poly assets:
// a small spherical planet, an infected street, and a sidearm with 8 rounds.
// One night shift, ONE sealed medical case, and a cure that arrives too late.
// An unofficial, non-commercial homage to the Raccoon City outbreak film.

import * as THREE from 'three';
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js';
import { createAsset as mkLamp } from './assets/arc-street-lamp.mjs';
import { createAsset as mkPoliceBarricade } from './assets/police-barricade.mjs';
import { createAsset as mkFieldBarricade } from './assets/field-barricade.mjs';
import { createAsset as mkApartment } from './assets/apartment-block.mjs';
import { createAsset as mkPrewar } from './assets/prewar-apartment-house.mjs';
import { createAsset as mkSpruce } from './assets/snow-laden-spruce.mjs';
import { createAsset as mkParcel } from './assets/cardboard-delivery-box.mjs';
import { createAsset as mkBed } from './assets/hospital-bed.mjs';
import { createAsset as mkStretcher } from './assets/casualty-stretcher.mjs';
import { createAsset as mkGas } from './assets/medical-gas-cylinder.mjs';
import { createAsset as mkBin } from './assets/clinical-waste-bin.mjs';
import { createAsset as mkAmbulance } from './assets/ambulance-van.mjs';
import { createAsset as mkMailbox } from './assets/curbside-mailbox.mjs';
import { createAsset as mkNeon } from './assets/motel-neon-sign.mjs';
import { createAsset as mkOfficer } from './assets/highway-patrol-officer.mjs';
import { createAsset as mkCruiser } from './assets/security-patrol-cruiser.mjs';
import { createAsset as mkCourier } from './assets/delivery-courier.mjs';

// ---------------------------------------------------------------- constants
// The map is a small planet: every world coordinate is read as (lat, s) — a
// lateral offset and an arc length along the equator — and bent onto the sphere.
const GLOBE = { R: 66 };

const STREET = {
  half: 4.0,       // walkable half-width
  zStart: -20,
  zEnd: 214,
  walkLimit: 7.0,
};

// Three waypoints on the long walk to Raccoon General. They are NOT three
// parcels: the film has one sealed case and it never leaves the courier's hands
// until the lab door. Reaching a waypoint just cuts to the next act.
const STOPS = [
  { id: 'barricade', name: 'the quarantine barricade', x: -5.1, z: 56,  line: 'Past the barricade. Keep to the lamps.', action: 'get past the barricade' },
  { id: 'parking',   name: 'the hospital parking deck', x:  5.1, z: 124, line: 'Hospital is up ahead. Keep the case dry.', action: 'cross the parking deck' },
  { id: 'lab',       name: 'the Umbrella lab, floor 28', x:  4.9, z: 196, line: 'Floor 28. Just get it there.', action: 'set the case down' },
];

// The run follows the shape of the film: an ordinary night shift, the truth
// about what is in the case, and the lab where the cure is one minute late.
// No chosen survivor, no extraction. This is the origin story of a monster.
const ACTS = [
  {
    no: 'ACT I',
    time: '03:40',
    place: 'RACCOON CITY OUTSKIRTS',
    title: 'THE NIGHT SHIFT',
    lines: [
      `03:40. Double pay. Michelle is asleep, or pretending to be.`,
      `The van is in the ditch and I can still hear her through the broken glass.`,
      `Green case, back seat, floor 28. I don't open it. That's the job.`,
    ],
    broadcast: '…emergency broadcast. Remain calm. Remain in your homes. Emergency services are responding. Remain calm. Remain calm…',
    horde: 2,
    label: 'ACT I · 03:40',
  },
  {
    no: 'ACT II',
    time: '04:05',
    place: 'THE TUNNEL',
    title: 'WHAT IS IN THE CASE',
    lines: [
      `A man in an Umbrella coat asks what I'm carrying. I tell him I don't know.`,
      `He says "stabilizer" like I'm supposed to understand, and then he stops looking at my face.`,
      `In the tunnel a little girl says help me. I put my arm out.`,
    ],
    broadcast: '…Umbrella internal: sample integrity is the priority. Do not disclose the payload to the courier. The city is already written off…',
    horde: 3,
    label: 'ACT II · 04:05',
  },
  {
    no: 'ACT III',
    time: '04:40',
    place: 'RACCOON GENERAL',
    title: 'FLOOR 28',
    lines: [
      `The stairwell smells like bleach and something under it.`,
      `My left hand won't close properly. I keep swapping the case to the right.`,
      `Carl's voice is still in my ear: 24, skybridge, 28. Don't use the elevator.`,
    ],
    broadcast: '…containment is in effect. Helicopters over the hospital at first light. There is no ground extraction…',
    horde: 4,
    label: 'ACT III · 04:40',
  },
];

const DEPOT = { x: -4.6, z: -10 };

const PLAYER = {
  eyeStand: 1.62,
  eyeCrouch: 1.02,
  radius: 0.42,
  walk: 3.3,
  run: 6.3,
  crouchMul: 0.55,
  accel: 12,
};

const COLD = {
  max: 100,
  drain: 0.16,
  sprintDrain: 0.26,
  biteDrain: 0.14,   // after the tunnel, the virus has a head start
  lampRegen: 0,      // legacy: light no longer cures anything
  lampSlow: 0.45,    // a lit safe spot (typewriter, doorway) only buys seconds
  crouchMul: 0.9,
  freezeAt: 100,     // 100 is not a respawn — it is the end of the story
};

const STAM = { max: 100, sprint: 17, regen: 13, minToStart: 12 };

const GUN = {
  mag: 8,
  reserve: 16,
  reloadTime: 1.35,
  cooldown: 0.38,
  spread: 0.055,
  range: 44,
  damage: 1,
};

const ZOMBIE = {
  count: 9,
  walkSpeed: 1.5,
  chaseSpeed: 3.5,
  chaseRange: 21,
  biteRange: 1.75,
  biteDamage: 15,
  biteCooldown: 1.15,
  hp: 3,
};

const WARDEN = {
  count: 3,
  patrolSpeed: 1.55,
  chaseSpeed: 4.85,
  catchAt: 1.9,
  loseAt: 34,
  detectLit: 26,
  detectDark: 12,
  sprintBonus: 7,
  crouchMul: 0.62,
};

// ---------------------------------------------------------------- dom
const $ = (id) => document.getElementById(id);
const dom = {
  app: $('app'),
  hud: $('hud'),
  objText: $('objText'),
  feverLabel: $('feverLabel'),
  warmBar: $('warmBar'),
  stamBar: $('stamBar'),
  stopDots: $('stopDots'),
  prompt: $('prompt'),
  promptText: $('promptText'),
  alert: $('alert'),
  vignette: $('coldVignette'),
  flash: $('flash'),
  ammo: $('ammo'),
  ammoNow: $('ammoNow'),
  ammoRes: $('ammoRes'),
  hitMark: $('hitMark'),
  title: $('title'),
  pause: $('pause'),
  end: $('end'),
  endKicker: $('endKicker'),
  endTitle: $('endTitle'),
  endBody: $('endBody'),
  endStats: $('endStats'),
  loading: $('loading'),
  loadFill: $('loadFill'),
  loadNote: $('loadNote'),
  startBtn: $('startBtn'),
  resumeBtn: $('resumeBtn'),
  againBtn: $('againBtn'),
};

// ---------------------------------------------------------------- audio
class Sound {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.wind = null;
    this.enabled = false;
  }

  init() {
    if (this.ctx) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.9;
    this.master.connect(this.ctx.destination);
    this.startWind();
    this.startDrone();
    this.enabled = true;
  }

  noiseBuffer(seconds = 2, brown = false) {
    const len = Math.floor(this.ctx.sampleRate * seconds);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      if (brown) {
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.2;
      } else {
        data[i] = white;
      }
    }
    return buf;
  }

  startWind() {
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer(3, true);
    src.loop = true;
    const band = this.ctx.createBiquadFilter();
    band.type = 'bandpass';
    band.frequency.value = 480;
    band.Q.value = 0.9;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1400;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.35;
    src.connect(band).connect(lp).connect(gain).connect(this.master);
    src.start();
    this.wind = { gain, band };
  }

  setWind(level) {
    if (!this.wind) return;
    this.wind.gain.gain.value = 0.22 + level * 0.35;
  }

  // a room tone under everything: low, slow, always there
  startDrone() {
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 190;
    o.type = 'sawtooth';
    o.frequency.value = 37;
    g.gain.value = 0.032;
    o.connect(lp).connect(g).connect(this.master);
    o.start();
    this.drone = g;
  }

  // the thing the whole street is listening for, and never hears twice
  siren(distance = 1) {
    if (!this.enabled) return;
    const t = this.ctx.currentTime;
    const amp = 0.09 / Math.max(1, distance * 0.8);
    for (let k = 0; k < 2; k++) {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 520;
      bp.Q.value = 3;
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(430 + k * 18, t);
      o.frequency.linearRampToValueAtTime(660, t + 1.4);
      o.frequency.linearRampToValueAtTime(430, t + 2.8);
      o.frequency.linearRampToValueAtTime(660, t + 4.2);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(amp, t + 0.6);
      g.gain.linearRampToValueAtTime(amp * 0.9, t + 3.6);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 4.6);
      o.connect(bp).connect(g).connect(this.master);
      o.start(t);
      o.stop(t + 4.7);
    }
  }

  splat() {
    if (!this.enabled) return;
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer(0.18, false);
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 880;
    bp.Q.value = 0.8;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.3, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
    src.connect(bp).connect(g).connect(this.master);
    src.start();
  }

  shell() {
    if (!this.enabled) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(3400, t + 0.12);
    o.frequency.exponentialRampToValueAtTime(2100, t + 0.3);
    g.gain.setValueAtTime(0.0001, t + 0.12);
    g.gain.exponentialRampToValueAtTime(0.05, t + 0.14);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);
    o.connect(g).connect(this.master);
    o.start(t + 0.12);
    o.stop(t + 0.36);
  }

  step() {
    if (!this.enabled) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer(0.14, false);
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'lowpass';
    bp.frequency.value = 620;
    const g = this.ctx.createGain();
    g.gain.value = 0.16;
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.16);
    src.connect(bp).connect(g).connect(this.master);
    src.start();
  }

  sting() {
    if (!this.enabled) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(420, this.ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(980, this.ctx.currentTime + 0.35);
    g.gain.setValueAtTime(0.22, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
    o.connect(g).connect(this.master);
    o.start();
    o.stop(this.ctx.currentTime + 0.55);
  }

  shot() {
    if (!this.enabled) return;
    const t = this.ctx.currentTime;
    // crack
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer(0.22, false);
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 780;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.55, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    src.connect(hp).connect(g).connect(this.master);
    src.start();
    // body thump
    const o = this.ctx.createOscillator();
    const og = this.ctx.createGain();
    o.type = 'square';
    o.frequency.setValueAtTime(180, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.14);
    og.gain.setValueAtTime(0.3, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    o.connect(og).connect(this.master);
    o.start();
    o.stop(t + 0.22);
  }

  dryFire() {
    if (!this.enabled) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'square';
    o.frequency.value = 1400;
    g.gain.setValueAtTime(0.06, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
    o.connect(g).connect(this.master);
    o.start();
    o.stop(this.ctx.currentTime + 0.06);
  }

  reload() {
    if (!this.enabled) return;
    [0, 0.28, 0.85].forEach((d, i) => {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'square';
      o.frequency.value = i === 2 ? 620 : 380;
      g.gain.setValueAtTime(0.0001, this.ctx.currentTime + d);
      g.gain.exponentialRampToValueAtTime(0.07, this.ctx.currentTime + d + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + d + 0.09);
      o.connect(g).connect(this.master);
      o.start(this.ctx.currentTime + d);
      o.stop(this.ctx.currentTime + d + 0.1);
    });
  }

  growl(distance = 1) {
    if (!this.enabled) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 900;
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(84 + Math.random() * 22, t);
    o.frequency.linearRampToValueAtTime(58, t + 0.9);
    const amp = 0.11 / Math.max(1, distance * distance * 0.6);
    g.gain.setValueAtTime(amp, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.0);
    o.connect(lp).connect(g).connect(this.master);
    o.start();
    o.stop(t + 1.05);
  }

  bite() {
    if (!this.enabled) return;
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer(0.3, false);
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 260;
    bp.Q.value = 1.2;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.42, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    src.connect(bp).connect(g).connect(this.master);
    src.start();
  }

  pickup() {
    if (!this.enabled) return;
    [520, 780].forEach((f, i) => {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'sine';
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, this.ctx.currentTime + i * 0.09);
      g.gain.exponentialRampToValueAtTime(0.16, this.ctx.currentTime + i * 0.09 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + i * 0.09 + 0.3);
      o.connect(g).connect(this.master);
      o.start(this.ctx.currentTime + i * 0.09);
      o.stop(this.ctx.currentTime + i * 0.09 + 0.34);
    });
  }

  thud() {
    if (!this.enabled) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(120, this.ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(48, this.ctx.currentTime + 0.3);
    g.gain.setValueAtTime(0.3, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
    o.connect(g).connect(this.master);
    o.start();
    o.stop(this.ctx.currentTime + 0.42);
  }

  heartbeat(intensity) {
    if (!this.enabled) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'sine';
    o.frequency.value = 62;
    g.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.02 + intensity * 0.06, this.ctx.currentTime + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.28);
    o.connect(g).connect(this.master);
    o.start();
    o.stop(this.ctx.currentTime + 0.3);
  }
}

const sound = new Sound();

// ---------------------------------------------------------------- renderer / scene
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.outputColorSpace = THREE.SRGBColorSpace;
dom.app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x070c13);
scene.fog = new THREE.FogExp2(0x0d1a26, 0.0135);

const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.06, 420);
camera.position.set(0, PLAYER.eyeStand, DEPOT.z + 2);

const clock = new THREE.Clock();

// ---------------------------------------------------------------- helpers
function cloneAsset(builder, opts) {
  return builder(opts);
}

function glowTexture(inner = '255,238,205') {
  const size = 128;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, `rgba(${inner},1)`);
  g.addColorStop(0.35, `rgba(${inner},0.55)`);
  g.addColorStop(1, `rgba(${inner},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const GLOW = glowTexture('255,232,196');
const GLOW_COOL = glowTexture('196,224,255');

// vertical falloff for lamp shafts: bright at the cone's top, gone at the ground
let _coneTex = null;
function coneGradient() {
  if (_coneTex) return _coneTex;
  const w = 4, h = 128;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, 'rgba(255,255,255,0.95)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.35)');
  g.addColorStop(0.7, 'rgba(255,255,255,0.09)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  _coneTex = new THREE.CanvasTexture(c);
  _coneTex.colorSpace = THREE.SRGBColorSpace;
  return _coneTex;
}
const glows = [];

function addGlow(parent, x, y, z, scale, tex = GLOW, color = 0xffe4bd, opacity = 0.9) {
  const mat = new THREE.SpriteMaterial({
    map: tex,
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    fog: false,
  });
  const s = new THREE.Sprite(mat);
  s.position.set(x, y, z);
  s.scale.set(scale, scale, 1);
  s.userData.baseOpacity = opacity;
  parent.add(s);
  glows.push(s);
  return s;
}

const colliders = []; // {x,z,r}
function addCollider(x, z, r) { colliders.push({ x, z, r }); }

// ---------------------------------------------------------------- globe math
// s = arc length along the equator (the old z), lat = arc length across it (the old x)
const Y_UP = new THREE.Vector3(0, 1, 0);
const _v = new THREE.Vector3();

function surfPos(s, lat, out = new THREE.Vector3()) {
  const th = s / GLOBE.R;
  const ph = lat / GLOBE.R;
  const cp = Math.cos(ph);
  return out.set(GLOBE.R * cp * Math.sin(th), GLOBE.R * Math.sin(ph), GLOBE.R * cp * Math.cos(th));
}

function surfUp(s, lat, out = new THREE.Vector3()) {
  return surfPos(s, lat, out).normalize();
}

function surfBasis(s, lat) {
  const th = s / GLOBE.R;
  const ph = lat / GLOBE.R;
  const up = new THREE.Vector3(Math.cos(ph) * Math.sin(th), Math.sin(ph), Math.cos(ph) * Math.cos(th));
  const fwd = new THREE.Vector3(Math.cos(th), 0, -Math.sin(th));
  const right = new THREE.Vector3(-Math.sin(ph) * Math.sin(th), Math.cos(ph), -Math.sin(ph) * Math.cos(th));
  return { up, fwd, right };
}

// put an object on the surface: y becomes height above ground, rotation.y becomes heading
function placeOnGlobe(obj, s, lat, height = 0, heading = 0) {
  const b = surfBasis(s, lat);
  const p = surfPos(s, lat).addScaledVector(b.up, height);
  obj.position.copy(p);
  const basis = new THREE.Matrix4().makeBasis(b.right, b.up, b.fwd);
  const q = new THREE.Quaternion().setFromRotationMatrix(basis);
  if (heading) q.premultiply(new THREE.Quaternion().setFromAxisAngle(b.up, heading));
  obj.quaternion.copy(q);
  return obj;
}

// bends every flat-world object in the group onto the sphere
function wrapOntoGlobe(group) {
  for (const o of group.children.slice()) {
    if (o.userData.noWrap) continue;
    let lat = o.position.x;
    // pull the outer blocks in toward the street, otherwise the planet's curve
    // drops their footing below the horizon and they read as floating slabs
    if (Math.abs(lat) > 8) lat = Math.sign(lat) * (8 + (Math.abs(lat) - 8) * 0.5);
    placeOnGlobe(o, o.position.z, lat, o.position.y, o.rotation.y);
  }
}

// a strip of sphere surface between two arc lengths / two lateral offsets
function bandMesh(s0, s1, lat0, lat1, height, material, segS = 140, segL = 4) {
  const pos = [];
  const nrm = [];
  const idx = [];
  for (let i = 0; i <= segS; i++) {
    const s = s0 + ((s1 - s0) * i) / segS;
    for (let j = 0; j <= segL; j++) {
      const lat = lat0 + ((lat1 - lat0) * j) / segL;
      const up = surfUp(s, lat, _v).clone();
      const p = surfPos(s, lat).addScaledVector(up, height);
      pos.push(p.x, p.y, p.z);
      nrm.push(up.x, up.y, up.z);
    }
  }
  for (let i = 0; i < segS; i++) {
    for (let j = 0; j < segL; j++) {
      const a = i * (segL + 1) + j;
      const b = a + 1;
      const c = a + segL + 1;
      const d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(nrm, 3));
  geo.setIndex(idx);
  const mesh = new THREE.Mesh(geo, material);
  mesh.userData.noWrap = true;
  return mesh;
}

// ---------------------------------------------------------------- world build
const world = new THREE.Group();
scene.add(world);

const lamps = [];       // {x,z,light}
const warmSpots = [];   // {x,z,r,strength}

const loadingSteps = [
  ['paving the street', () => buildStreet()],
  ['raising the block', () => buildBlocks()],
  ['hanging the lamps', () => buildLamps()],
  ['dressing the night', () => buildNightDetail()],
  ['snow and props', () => buildProps()],
  ['opening the stops', () => buildStops()],
  ['the infected', () => buildHorde()],
  ['loading the sidearm', () => buildWeapon()],
  ['weather', () => buildWeather()],
];

const state = {
  phase: 'loading',      // loading | title | cine | interlude | playing | shot | paused | ending | end
  act: 0,                // 0-based index into ACTS
  warmth: 10,            // T-virus load, 0 = clean, 100 = the origin of something else
  stamina: STAM.max,
  carrying: 0,           // the one sealed case (0/1)
  delivered: 0,          // waypoints cleared, not parcels handed over
  legIndex: 0,           // which waypoint is next
  bites: 0,
  bittenByGirl: false,   // the tunnel bite: irreversible, and it starts the clock
  turnings: 0,
  kills: 0,
  shots: 0,
  ammo: GUN.mag,
  reserve: GUN.reserve,
  reloading: false,
  reloadT: 0,
  gunCd: 0,
  startedAt: 0,
  checkpoint: { x: DEPOT.x, z: DEPOT.z + 3 },
  alerted: 0,
  detections: 0,
};

// scripted story beats that must survive an act card; separate from the ending
// sequence so skipping the ending never cancels the tunnel bite mid-act.
const storyTimers = [];

const keys = {};
const player = {
  pos: new THREE.Vector3(state.checkpoint.x, 0, state.checkpoint.z),
  vel: new THREE.Vector3(),
  yaw: 0,
  pitch: 0,
  crouch: false,
  eye: PLAYER.eyeStand,
  bob: 0,
  moving: false,
  lit: false,
  stepAcc: 0,
};

let parcelMesh = null;

// --- street: a road band wrapped around the little planet
function buildStreet() {
  const snowBall = new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE.R, 180, 90),
    new THREE.MeshStandardMaterial({ color: 0x2f3d4b, roughness: 1, metalness: 0 })
  );
  snowBall.userData.noWrap = true;
  world.add(snowBall);

  const roadS0 = STREET.zStart - 16;
  const roadS1 = STREET.zEnd + 16;

  const asphaltMat = new THREE.MeshStandardMaterial({
    color: 0x1a1f26, roughness: 0.62, metalness: 0.22, side: THREE.DoubleSide,
  });
  world.add(bandMesh(roadS0, roadS1, -STREET.half, STREET.half, 0.03, asphaltMat, 300, 10));

  // lane dashes down the middle
  const dashMat = new THREE.MeshStandardMaterial({ color: 0xcfd8e0, roughness: 0.8, metalness: 0 });
  const dashGeo = new THREE.BoxGeometry(0.14, 0.03, 2.3);
  for (let s = roadS0; s <= roadS1; s += 5.6) {
    const d = new THREE.Mesh(dashGeo, dashMat);
    d.userData.noWrap = true;
    placeOnGlobe(d, s, 0, 0.06, 0);
    world.add(d);
  }

  // kerb + plowed snow along both sides
  const kerbMat = new THREE.MeshStandardMaterial({
    color: 0x46525e, roughness: 0.9, metalness: 0, side: THREE.DoubleSide,
  });
  const snowMat = new THREE.MeshStandardMaterial({
    color: 0x5b6874, roughness: 1, metalness: 0, side: THREE.DoubleSide,
  });
  for (const side of [-1, 1]) {
    const latA = side < 0 ? -7.6 : 4.3;
    const latB = side < 0 ? -4.3 : 7.6;
    world.add(bandMesh(roadS0, roadS1, latA, latB, 0.13, kerbMat, 300, 10));
    const snowA = side < 0 ? -7.45 : 4.45;
    const snowB = side < 0 ? -4.45 : 7.45;
    world.add(bandMesh(roadS0, roadS1, snowA, snowB, 0.135, snowMat, 300, 10));
  }
}

// --- buildings
const BLOCKS = [];
function buildBlocks() {
  const variants = [
    mkPrewar({ colorway: 'red-brick' }),
    mkPrewar({ colorway: 'soot-grey' }),
    mkPrewar({ colorway: 'brownstone' }),
    mkApartment({ colorway: 'slate-block' }),
  ];

  const zs = [];
  for (let z = -32; z <= 208; z += 26) zs.push(z);

  zs.forEach((z, i) => {
    for (const side of [-1, 1]) {
      if (i % 2 === 0 && side === 1) continue; // stagger the gaps
      const proto = variants[(i + (side === 1 ? 1 : 0)) % variants.length];
      const b = proto.clone(true);
      const big = proto === variants[3];
      b.scale.setScalar(big ? 0.62 : 0.46);
      b.rotation.y = side === 1 ? -Math.PI / 2 : Math.PI / 2;
      b.position.set(side * (big ? 8.4 : 9.4), 0, z);
      world.add(b);
      BLOCKS.push({ obj: b, side });
    }
  });

  // hospital massing at the far end
  const hosp = mkApartment({ colorway: 'pale-concrete' });
  hosp.scale.set(1.3, 1.5, 1.3);
  hosp.rotation.y = Math.PI / 2;
  hosp.position.set(-14, 0, 206);
  world.add(hosp);
  const hosp2 = hosp.clone(true);
  hosp2.position.set(15, 0, 202);
  world.add(hosp2);
}

// --- night dressing: lit windows, plow marks, drifts
function buildNightDetail() {
  const litMat = new THREE.MeshBasicMaterial({ color: 0xffb877 });
  const dimMat = new THREE.MeshBasicMaterial({ color: 0x1d2732 });
  const coolMat = new THREE.MeshBasicMaterial({ color: 0xa8c6e0 });
  const winGeo = new THREE.PlaneGeometry(0.72, 0.95);
  let seed = 9381;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const box = new THREE.Box3();

  // windows are anchored to the actual facades, so none of them float in the gaps
  BLOCKS.forEach(({ obj, side }) => {
    box.setFromObject(obj);
    const faceX = side === 1 ? box.min.x - 0.05 : box.max.x + 0.05;
    const zA = box.min.z + 0.9;
    const zB = box.max.z - 0.9;
    for (let y = box.min.y + 1.9; y < box.max.y - 1.1; y += 1.75) {
      for (let z = zA; z < zB; z += 1.6) {
        const w = new THREE.Mesh(winGeo, dimMat);
        w.position.set(faceX, y, z);
        w.rotation.y = side === 1 ? -Math.PI / 2 : Math.PI / 2;
        const r = rnd();
        if (r > 0.9) w.material = litMat;
        else if (r > 0.82) w.material = coolMat;
        world.add(w);
      }
    }
  });

  // plow ridges on both shoulders, and tyre lines in the slush
  const ridgeMat = new THREE.MeshStandardMaterial({ color: 0x38434e, roughness: 1 });
  const tyreMat = new THREE.MeshStandardMaterial({ color: 0x141a20, roughness: 0.85 });
  for (const side of [-1, 1]) {
    for (let z = -24; z <= 210; z += 4) {
      const ridge = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.07, 3.1 + rnd() * 1.2), ridgeMat);
      ridge.position.set(side * (5.0 + rnd() * 1.5), 0.15, z);
      ridge.rotation.y = (rnd() - 0.5) * 0.12;
      world.add(ridge);
    }
    for (const lat of [1.35, 2.55]) {
      const tyre = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.02, 6.2), tyreMat);
      tyre.position.set(side * lat, 0.06, 0);
      for (let z = -20; z <= 208; z += 6.4) {
        const t = tyre.clone();
        t.position.z = z;
        world.add(t);
      }
    }
  }

  // the cordon's strobes, far up the street where the line went down
  for (let i = 0; i < 4; i++) {
    const s = 104 + i * 22;
    addGlow(world, (i % 2 ? -1 : 1) * 5.6, 1.5, s, 0.9, GLOW, i % 2 ? 0xff5a4a : 0x5aa8ff, 0.55);
  }
}

// --- lamps
function buildLamps() {
  const proto = mkLamp({ colorway: 'arc-cyan' });
  for (let z = 2; z <= 202; z += 33) {
    const side = (z / 11) % 2 === 0 ? -1 : 1;
    const l = proto.clone(true);
    l.position.set(side * 5.4, 0, z);
    l.rotation.y = side === 1 ? Math.PI : 0;
    world.add(l);

    const headX = side * 3.4;
    addGlow(world, headX, 5.5, z, 3.6, GLOW, 0xffdcaa, 0.72);

    let light = null;
    if (true) {
      light = new THREE.PointLight(0xffd2a1, 3.4, 24, 2);
      light.position.set(headX, 5.1, z);
      world.add(light);
    }
    lamps.push({ x: headX, z, light });
    warmSpots.push({ x: headX, z, r: 5.2, strength: COLD.lampRegen });
    addCollider(side * 5.5, z, 0.5);
  }
}

// --- props: barricades, trees, mailboxes, cars
function buildProps() {
  const barricadeProto = mkPoliceBarricade({ colorway: 'nypd-wood' });
  const treeProto = mkSpruce({ colorway: 'silvered' });
  const mailboxProto = mkMailbox({ colorway: 'black-and-cedar' });
  const cruiserProto = mkCruiser({ colorway: 'midnight-unit' });

  // barricade lines that narrow the street
  const lines = [
    { z: 40, xs: [-2.6, 2.1] },
    { z: 96, xs: [-3.0, 0.6, 3.0] },
    { z: 158, xs: [-2.2, 2.6] },
  ];
  for (const line of lines) {
    for (const x of line.xs) {
      const b = barricadeProto.clone(true);
      b.position.set(x, 0, line.z);
      b.rotation.y = Math.PI / 2;
      world.add(b);
      addCollider(x, line.z, 1.15);
    }
  }

  // roadworks barrier as a visual cap at the far end
  const fieldProto = mkFieldBarricade({ colorway: 'old-timber' });
  for (const x of [-3.4, 3.4]) {
    const b = fieldProto.clone(true);
    b.position.set(x, 0, 30);
    world.add(b);
    addCollider(x, 30, 0.8);
  }

  // trees down the sides
  for (let z = 12; z < 200; z += 22) {
    const side = z % 44 === 0 ? 1 : -1;
    const t = treeProto.clone(true);
    t.position.set(side * 6.9, 0, z + 6);
    t.rotation.y = Math.random() * Math.PI * 2;
    t.scale.setScalar(1.05 + Math.random() * 0.35);
    world.add(t);
  }

  // the first thing you see when you get up: a tree line and a knocked barricade
  const closeTree = treeProto.clone(true);
  closeTree.position.set(-7.4, 0, 1.0);
  closeTree.rotation.y = 0.7;
  closeTree.scale.setScalar(1.15);
  world.add(closeTree);

  const knocked = barricadeProto.clone(true);
  knocked.position.set(-1.9, 0, 9);
  knocked.rotation.set(0.12, Math.PI / 2 + 0.5, 0.18);
  world.add(knocked);
  addCollider(-1.9, 9, 1.0);

  // mailboxes + parked cruiser
  for (const z of [22, 84, 150]) {
    const m = mailboxProto.clone(true);
    m.position.set(-3.9, 0, z);
    m.rotation.y = 0.2;
    world.add(m);
    addCollider(-3.9, z, 0.35);
  }
  const cruiser = cruiserProto.clone(true);
  cruiser.position.set(6.4, 0, 178);
  cruiser.rotation.y = -0.35;
  world.add(cruiser);

  // motel sign — the only colour for three blocks
  const neon = mkNeon({ colorway: 'sunset' });
  neon.position.set(-7.2, 0, 88);
  neon.rotation.y = Math.PI / 2;
  neon.scale.setScalar(0.85);
  world.add(neon);
  addGlow(world, -6.4, 6.2, 88, 5.5, GLOW_COOL, 0xff9a72, 0.45);
  const neonLight = new THREE.PointLight(0xff8f6a, 1.5, 18, 2);
  neonLight.position.set(-5.4, 6.4, 88);
  world.add(neonLight);
}

// --- stops
const stopObjects = [];

function buildStops() {
  const bedProto = mkBed({ colorway: 'ward-blue' });
  const stretcherProto = mkStretcher({ colorway: 'aid-post' });
  const gasProto = mkGas({ colorway: 'oxygen-white' });
  const binProto = mkBin({ colorway: 'clinical-orange' });
  const ambulanceProto = mkAmbulance({ colorway: 'clinical-white' });
  const courierProto = mkCourier();

  // depot marker: the courier beside the van that went into the ditch
  const depotCourier = cloneSkinned(courierProto);
  poseRelaxed(depotCourier);
  depotCourier.position.set(DEPOT.x - 1.5, 0, DEPOT.z - 1.4);
  depotCourier.rotation.y = 0.9;
  world.add(depotCourier);

  // an ambulance left with its doors open, right where the night started
  const ambStart = ambulanceProto.clone(true);
  ambStart.position.set(3.1, 0, 20);
  ambStart.rotation.y = 0.35;
  world.add(ambStart);
  addCollider(3.1, 20, 1.9);
  const depotLight = new THREE.PointLight(0xffcf9a, 2.2, 14, 2);
  depotLight.position.set(DEPOT.x, 2.6, DEPOT.z);
  world.add(depotLight);
  addGlow(world, DEPOT.x - 1.5, 1.9, DEPOT.z - 1.4, 3.0, GLOW, 0xffdcaa, 0.4);
  warmSpots.push({ x: DEPOT.x, z: DEPOT.z, r: 4.4, strength: COLD.lampRegen });

  // 1. quarantine barricade — curb side, away from the driving lane
  const bed1 = bedProto.clone(true);
  bed1.position.set(-6.1, 0, 56);
  bed1.rotation.y = Math.PI / 2 + 0.15;
  world.add(bed1);
  const st1 = stretcherProto.clone(true);
  st1.position.set(-5.9, 0, 60);
  st1.rotation.y = 0.4;
  world.add(st1);
  const bin1 = binProto.clone(true);
  bin1.position.set(-6.4, 0, 52.4);
  world.add(bin1);

  // 2. hospital parking deck
  const gas1 = gasProto.clone(true);
  gas1.position.set(6.2, 0, 121);
  world.add(gas1);
  const gas2 = gas1.clone(true);
  gas2.position.set(6.5, 0, 122);
  world.add(gas2);
  const st2 = stretcherProto.clone(true);
  st2.position.set(5.9, 0, 126);
  st2.rotation.y = -0.6;
  world.add(st2);

  // 3. lab approach — ambulance backed into the hospital bay
  const amb = ambulanceProto.clone(true);
  amb.position.set(6.4, 0, 192);
  amb.rotation.y = -0.25;
  world.add(amb);
  addCollider(6.4, 192, 2.2);
  const bed3 = bedProto.clone(true);
  bed3.position.set(6.2, 0, 198);
  bed3.rotation.y = Math.PI / 2 - 0.1;
  world.add(bed3);
  const st3 = stretcherProto.clone(true);
  st3.position.set(5.4, 0, 201);
  st3.rotation.y = 0.9;
  world.add(st3);

  for (const s of STOPS) {
    const light = new THREE.PointLight(0xffd7a8, 2.0, 16, 2);
    light.position.set(s.x, 2.4, s.z);
    world.add(light);
    addGlow(world, s.x, 1.6, s.z, 3.4, GLOW, 0xffdcaa, 0.55);
    warmSpots.push({ x: s.x, z: s.z, r: 4.0, strength: COLD.lampRegen + 1.5 });
    stopObjects.push(light);
  }
}

// --- parcel mesh
let parcelGlow = null;
let parcelS = 0;
let parcelLat = 0;
let carriedMesh = null;

function setCarried(on) {
  if (!on) {
    if (carriedMesh) { camera.remove(carriedMesh); carriedMesh = null; }
    return;
  }
  if (carriedMesh) return;
  carriedMesh = mkParcel({ colorway: 'kraft-brown' });
  carriedMesh.scale.setScalar(0.26);
  carriedMesh.position.set(0.34, -0.36, -0.9);
  carriedMesh.rotation.set(0.16, -0.4, 0.1);
  camera.add(carriedMesh);
}

function spawnParcelAt(x, z) {
  if (parcelMesh) {
    world.remove(parcelMesh);
    parcelMesh = null;
  }
  if (parcelGlow) {
    world.remove(parcelGlow);
    const i = glows.indexOf(parcelGlow);
    if (i >= 0) glows.splice(i, 1);
    parcelGlow = null;
  }
  parcelMesh = mkParcel({ colorway: 'kraft-brown' });
  parcelMesh.scale.setScalar(0.62);
  parcelMesh.userData.noWrap = true;
  parcelS = z;
  parcelLat = x;
  placeOnGlobe(parcelMesh, parcelS, parcelLat, 0.42, 0);
  world.add(parcelMesh);
  parcelGlow = addGlow(world, x, 0.8, z, 1.5, GLOW, 0xffd9a0, 0.5);
  parcelGlow.userData.noWrap = true;
  placeOnGlobe(parcelGlow, parcelS, parcelLat, 0.5, 0);
}

function clearParcelMarker() {
  if (parcelMesh) { world.remove(parcelMesh); parcelMesh = null; }
  if (parcelGlow) {
    world.remove(parcelGlow);
    const i = glows.indexOf(parcelGlow);
    if (i >= 0) glows.splice(i, 1);
    parcelGlow = null;
  }
}

// ---------------------------------------------------------------- the infected
// The street's night shift changed hands three hours ago. What walks Alder
// Street now used to be the people who lived on it.
const infected = [];
let weapon = null;
let weaponParts = null;
let muzzle = null;
let muzzleT = 0;

const INFECTED_LOOKS = [
  { coat: '#3f3b33', denim: '#3b3f36', skin: '#9aab7d', hair: '#221f1c', boot: '#5b5346', sole: '#403a30', pack: '#5c1f1a', build: 1.02 },
  { coat: '#4a3f37', denim: '#33384a', skin: '#8c9a86', hair: '#1d1b19', boot: '#4e473c', sole: '#37312a', pack: '#6a241d', build: 0.95 },
  { coat: '#3a4442', denim: '#3f3a33', skin: '#a7b389', hair: '#2a2522', boot: '#544c40', sole: '#3c352c', pack: '#4a1d18', build: 1.08 },
  { coat: '#4b4038', denim: '#2f3a35', skin: '#8f9c7a', hair: '#1f1d1b', boot: '#585043', sole: '#3d372e', pack: '#551f19', build: 0.9 },
];

// the Polyfork characters are authored in a T-pose; the rig swings the arms on Z
const ARM_DOWN_L = -1.22;
const ARM_DOWN_R = 1.22;

function poseRelaxed(root) {
  const bones = {};
  root.traverse((o) => { if (o.isBone) bones[o.name] = o; });
  if (bones.LeftArm) { bones.LeftArm.rotation.z = ARM_DOWN_L; bones.LeftArm.rotation.x = 0.12; }
  if (bones.RightArm) { bones.RightArm.rotation.z = ARM_DOWN_R; bones.RightArm.rotation.x = 0.12; }
  if (bones.LeftForeArm) bones.LeftForeArm.rotation.y = -0.32;
  if (bones.RightForeArm) bones.RightForeArm.rotation.y = 0.32;
  if (bones.LeftUpLeg) bones.LeftUpLeg.rotation.x = 0.06;
  if (bones.RightUpLeg) bones.RightUpLeg.rotation.x = -0.06;
  return bones;
}

function poseInfected(bones) {
  if (bones.Spine1) bones.Spine1.rotation.x = 0.22;
  if (bones.Spine2) bones.Spine2.rotation.x = 0.1;
  if (bones.Neck) bones.Neck.rotation.x = 0.16;
  if (bones.Head) { bones.Head.rotation.x = 0.2; bones.Head.rotation.z = 0.14; }
  if (bones.LeftArm) { bones.LeftArm.rotation.z = -0.78; bones.LeftArm.rotation.y = -1.15; }
  if (bones.RightArm) { bones.RightArm.rotation.z = 0.78; bones.RightArm.rotation.y = 1.15; }
  if (bones.LeftForeArm) bones.LeftForeArm.rotation.y = -0.35;
  if (bones.RightForeArm) bones.RightForeArm.rotation.y = 0.35;
  if (bones.LeftHand) bones.LeftHand.rotation.z = -0.25;
  if (bones.RightHand) bones.RightHand.rotation.z = 0.25;
  if (bones.LeftUpLeg) bones.LeftUpLeg.rotation.x = 0.1;
  if (bones.RightUpLeg) bones.RightUpLeg.rotation.x = -0.06;
}

function makeInfected(s0, s1, look, act) {
  const body = mkCourier({
    box: false, bag: false, hat: false,
    age: 'adult', figure: 'masculine', build: look.build,
    coat: look.coat, denim: look.denim, skin: look.skin, hair: look.hair,
    boot: look.boot, sole: look.sole,
    pack: look.pack, packHarness: '#2a241f', packLabel: look.pack, packLabelFrame: '#231f1b',
  });
  const bones = {};
  body.traverse((o) => { if (o.isBone) bones[o.name] = o; });
  poseInfected(bones);
  const g = new THREE.Group();
  g.add(body);
  g.userData.noWrap = true;
  g.visible = false;           // each act wakes its own slice of the street
  world.add(g);

  const z = {
    root: g,
    body,
    bones,
    act,
    s: s0 + Math.random() * Math.max(1, s1 - s0),
    s0,
    s1,
    lat: (Math.random() - 0.5) * 5.2,
    heading: Math.random() * Math.PI * 2,
    dir: Math.random() < 0.5 ? -1 : 1,
    mode: 'wander',
    hp: ZOMBIE.hp,
    dead: false,
    deadT: 0,
    biteCd: 0,
    hurt: 0,
    phase: Math.random() * Math.PI * 2,
    groanCd: 2 + Math.random() * 7,
  };
  placeOnGlobe(g, z.s, z.lat, 0, z.heading);
  return z;
}

// where each act's infected are standing: act I keeps them a block away from
// the depot so the street reads empty at the start of the film
const ACT_BANDS = [
  [[30, 60], [48, 92]],
  [[96, 122], [112, 144], [132, 158]],
  [[158, 182], [172, 200], [190, 214], [200, 222]],
];

function buildHorde() {
  ACTS.forEach((act, ai) => {
    for (let i = 0; i < act.horde; i++) {
      const band = ACT_BANDS[ai][i % ACT_BANDS[ai].length];
      const z = makeInfected(band[0], band[1], INFECTED_LOOKS[(ai * 3 + i) % INFECTED_LOOKS.length], ai + 1);
      // The film's creatures are not nine identical shamblers: a few are
      // fused, swollen or half-collapsed. Scale is the cheap read at distance.
      const shape = (ai * 3 + i) % 9;
      if (shape === 2 || shape === 6) z.root.scale.set(1.3, 1.12, 1.3);   // fused mass
      else if (shape === 4) z.root.scale.set(0.76, 0.9, 0.76);            // crawler
      else if (shape === 7) z.root.scale.set(1.06, 1.3, 1.06);            // swollen
      infected.push(z);
    }
  });
}

// ---------------------------------------------------------------- sidearm
function buildWeapon() {
  const g = new THREE.Group();
  const steel = new THREE.MeshStandardMaterial({ color: 0x2b343a, roughness: 0.38, metalness: 0.85 });
  const slideMat = new THREE.MeshStandardMaterial({ color: 0x3b454d, roughness: 0.28, metalness: 0.92 });
  const polymer = new THREE.MeshStandardMaterial({ color: 0x14181c, roughness: 0.88, metalness: 0.12 });
  const glove = new THREE.MeshStandardMaterial({ color: 0x1c2127, roughness: 0.94, metalness: 0.04 });
  const cuff = new THREE.MeshStandardMaterial({ color: 0x2d353d, roughness: 0.95, metalness: 0.02 });

  // ---- pistol, built around a reciprocating slide
  const pistol = new THREE.Group();

  const slide = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.03, 0.186), slideMat);
  slide.position.set(0, 0.021, -0.046);
  for (let i = 0; i < 5; i++) {
    const serr = new THREE.Mesh(new THREE.BoxGeometry(0.037, 0.026, 0.0035), steel);
    serr.position.set(0, 0, 0.052 + i * 0.008);
    slide.add(serr);
  }
  const sightF = new THREE.Mesh(new THREE.BoxGeometry(0.005, 0.007, 0.007), steel);
  sightF.position.set(0, 0.018, -0.088);
  slide.add(sightF);
  const sightR = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.005, 0.007), steel);
  sightR.position.set(0, 0.018, 0.062);
  slide.add(sightR);

  const frame = new THREE.Mesh(new THREE.BoxGeometry(0.029, 0.023, 0.132), steel);
  frame.position.set(0, -0.009, -0.021);

  const dustCover = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.014, 0.055), steel);
  dustCover.position.set(0, -0.018, -0.088);

  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.0072, 0.0072, 0.028, 10), steel);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(0, 0.017, -0.156);

  const grip = new THREE.Mesh(new THREE.BoxGeometry(0.031, 0.098, 0.045), polymer);
  grip.position.set(0, -0.058, 0.03);
  grip.rotation.x = -0.22;
  const magBase = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.011, 0.048), polymer);
  magBase.position.set(0, -0.104, 0.043);
  magBase.rotation.x = -0.22;

  const guard = new THREE.Mesh(new THREE.TorusGeometry(0.019, 0.0032, 5, 14, Math.PI * 1.3), steel);
  guard.position.set(0, -0.026, -0.008);
  guard.rotation.set(0, Math.PI / 2, 0.45);
  const trigger = new THREE.Mesh(new THREE.BoxGeometry(0.005, 0.021, 0.006), steel);
  trigger.position.set(0, -0.029, 0.002);

  pistol.add(slide, frame, dustCover, barrel, grip, magBase, guard, trigger);

  // ---- two gloved hands around the grip (right hand high, left cupping)
  const hands = new THREE.Group();
  function handShape(side) {
    const h = new THREE.Group();
    const palm = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.058, 0.048), glove);
    palm.position.set(side * 0.014, -0.05, 0.05);
    palm.rotation.set(-0.16, side * 0.14, side * 0.1);
    h.add(palm);
    for (let i = 0; i < 4; i++) {
      const f = new THREE.Mesh(new THREE.BoxGeometry(0.0102, 0.042 - i * 0.0035, 0.011), glove);
      f.position.set(-0.019 + i * 0.0115 + side * 0.002, -0.05, -0.007 - i * 0.0015);
      f.rotation.set(-0.62, 0, 0.06);
      h.add(f);
    }
    const thumb = new THREE.Mesh(new THREE.BoxGeometry(0.011, 0.03, 0.013), glove);
    thumb.position.set(side * 0.007, -0.028, 0.016);
    thumb.rotation.set(0.2, 0, side * 0.62);
    h.add(thumb);
    return h;
  }
  hands.add(handShape(1), handShape(-1));
  hands.position.set(0, -0.002, 0);
  pistol.add(hands);

  g.add(pistol);

  // ---- muzzle: billboard flash + a real light that lights the street for 2 frames
  muzzle = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture('255,214,150'),
    color: 0xffe6b8,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  muzzle.scale.set(0.26, 0.26, 1);
  muzzle.position.set(0, 0.018, -0.168);
  g.add(muzzle);

  const muzzleLight = new THREE.PointLight(0xffc38a, 0, 9, 2);
  muzzleLight.position.copy(muzzle.position);
  g.add(muzzleLight);

  g.scale.setScalar(0.46);
  g.position.set(0.158, -0.178, -0.40);
  g.rotation.set(0.03, 0.15, 0.015);
  g.renderOrder = 2;
  camera.add(g);
  weapon = g;
  weaponParts = { slide, slideZ: slide.position.z, muzzleLight, pistol };
}

const shells = [];
let shellProto = null;
function ejectShell() {
  if (!weapon) return;
  if (!shellProto) {
    shellProto = new THREE.Mesh(
      new THREE.CylinderGeometry(0.0032, 0.0032, 0.011, 6),
      new THREE.MeshStandardMaterial({ color: 0xc0913f, roughness: 0.3, metalness: 0.95 })
    );
  }
  const s = shellProto.clone();
  s.position.set(0.02, 0.045, 0.02);
  s.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  s.userData.v = new THREE.Vector3(0.24, 0.34, 0.12 + Math.random() * 0.1);
  s.userData.t = 0;
  weapon.add(s);
  shells.push(s);
  sound.shell();
}

function updateShells(dt) {
  for (let i = shells.length - 1; i >= 0; i--) {
    const s = shells[i];
    s.userData.t += dt;
    s.userData.v.y -= dt * 0.85;
    s.position.addScaledVector(s.userData.v, dt);
    s.rotation.x += dt * 9;
    s.rotation.z += dt * 6;
    if (s.userData.t > 1.4) {
      weapon.remove(s);
      shells.splice(i, 1);
    }
  }
}

function updateWeapon(dt) {
  if (!weapon) return;
  const t = performance.now() * 0.001;
  const sway = Math.cos(player.bob * 0.5) * 0.006;
  const bob = Math.sin(player.bob) * 0.006;
  const rec = state.gunCd > 0 ? state.gunCd / GUN.cooldown : 0; // 1 = just fired
  const breathe = Math.sin(t * 1.4) * 0.0022;

  weapon.position.set(0.158 + sway + breathe * 1.6, -0.178 + bob - rec * 0.006, -0.40 + rec * 0.028);
  weapon.rotation.set(0.03 + rec * 0.17, 0.15 + sway * 0.5, 0.015 + sway * 0.8 + breathe);

  if (weaponParts) {
    weaponParts.slide.position.z = weaponParts.slideZ + rec * 0.022;
    weaponParts.muzzleLight.intensity = muzzleT > 0 ? 3.2 * (muzzleT / 0.055) : 0;
  }

  if (state.reloading) {
    const p = 1 - state.reloadT / GUN.reloadTime;
    const dip = Math.sin(Math.min(1, p * 1.15) * Math.PI);
    weapon.rotation.x += dip * 0.42;
    weapon.rotation.z += dip * 0.34;
    weapon.position.y -= dip * 0.085;
    weapon.position.x += dip * 0.02;
  }

  updateShells(dt);

  if (muzzleT > 0) {
    muzzleT = Math.max(0, muzzleT - dt);
    muzzle.material.opacity = muzzleT > 0 ? 0.95 : 0;
    muzzle.scale.setScalar(0.2 + Math.random() * 0.12);
  } else if (muzzle) {
    muzzle.material.opacity = 0;
  }

  // the case is heavy: it lags half a step behind you and rides your breathing
  // (a shot may be holding the case out toward a door — leave it alone then)
  if (carriedMesh && !SHOT.active) {
    const step = Math.sin(player.bob) * 0.012;
    carriedMesh.position.set(
      0.34 + Math.cos(player.bob * 0.5) * 0.01,
      -0.36 + step + Math.sin(t * 1.4) * 0.004,
      -0.9
    );
    carriedMesh.rotation.set(0.16 + step * 0.6, -0.4 + Math.cos(player.bob * 0.5) * 0.02, 0.1 + step);
  }
}

// ---------------------------------------------------------------- weather
let snow = null;
const snowState = { count: 4200, box: new THREE.Vector3(78, 32, 78) };

function buildWeather() {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(snowState.count * 3);
  const rnd = new Float32Array(snowState.count * 3);
  for (let i = 0; i < snowState.count; i++) {
    pos[i * 3 + 0] = (Math.random() - 0.5) * snowState.box.x;
    pos[i * 3 + 1] = Math.random() * snowState.box.y;
    pos[i * 3 + 2] = (Math.random() - 0.5) * snowState.box.z;
    rnd[i * 3 + 0] = 0.55 + Math.random() * 0.85;
    rnd[i * 3 + 1] = Math.random() * Math.PI * 2;
    rnd[i * 3 + 2] = Math.random();
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aRand', new THREE.BufferAttribute(rnd, 3));

  const spriteTex = glowTexture('240,246,255');
  const mat = new THREE.PointsMaterial({
    map: spriteTex,
    size: 0.13,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    sizeAttenuation: true,
    blending: THREE.NormalBlending,
    color: 0xdfeaf7,
    fog: false,
  });
  snow = new THREE.Points(geo, mat);
  snow.frustumCulled = false;
  scene.add(snow);
}

// ---------------------------------------------------------------- lighting
let moonLight = null;
function buildLights() {
  scene.add(new THREE.HemisphereLight(0x5c86ab, 0x1a2430, 1.9));
  const moon = new THREE.DirectionalLight(0xa9c6ee, 0.9);
  moon.position.set(-40, 60, -30);
  scene.add(moon);
  moonLight = moon;
  // soft fill so facades facing the player still read as surfaces
  const fill = new THREE.DirectionalLight(0x7d9cc4, 0.55);
  fill.position.set(24, 30, 70);
  scene.add(fill);

  const flashlight = new THREE.SpotLight(0xffeccd, 1.5, 22, Math.PI / 8, 0.94, 1.7);
  flashlight.position.set(0.18, -0.12, 0.0);
  flashlight.target.position.set(0.05, -0.05, -1);
  camera.add(flashlight);
  camera.add(flashlight.target);
  flashlight.castShadow = false;
  scene.add(camera);
}

// ---------------------------------------------------------------- boot
async function boot() {
  for (let i = 0; i < loadingSteps.length; i++) {
    const [note, fn] = loadingSteps[i];
    dom.loadNote.textContent = note + '…';
    dom.loadFill.style.width = `${Math.round((i / loadingSteps.length) * 100)}%`;
    await new Promise((r) => setTimeout(r, 28));
    fn();
  }
  buildLights();
  wrapOntoGlobe(world);
  spawnParcelAt(DEPOT.x + 0.5, DEPOT.z + 1.7);
  dom.loadFill.style.width = '100%';
  dom.loadNote.textContent = 'ready';
  state.phase = 'title';
  if (location.search.includes('debug')) window.__dbg = {
    THREE, scene, camera, renderer, world, player, state, STREET, STOPS, DEPOT, ACTS,
    infected, fire, startReload, deliver, runEnding, skipEnding, tunnelBite, updateFeverVoice,
    SHOT, SHOTS, playShot, endShot, updateShot, ensureShotProps, updateColdOpen,
    stopStoryTimers: () => { for (const id of storyTimers) clearTimeout(id); storyTimers.length = 0; },
  };
  dom.loading.classList.add('hidden');
  dom.title.classList.remove('hidden');
  renderer.setAnimationLoop(tick);
}

// ---------------------------------------------------------------- input
addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (e.code === 'KeyC') player.crouch = !player.crouch;
  if (e.code === 'KeyE') interact();
  if (e.code === 'KeyR') startReload();
  if (e.code === 'Escape' && state.phase === 'playing') pause();
});
addEventListener('keyup', (e) => { keys[e.code] = false; });

addEventListener('mousedown', (e) => {
  if (e.button !== 0) return;
  if (document.pointerLockElement !== renderer.domElement) return;
  fire();
});

addEventListener('mousemove', (e) => {
  if (document.pointerLockElement !== renderer.domElement) return;
  if (state.phase !== 'playing') return;
  player.yaw -= e.movementX * 0.0022;
  player.pitch -= e.movementY * 0.0019;
  player.pitch = Math.max(-1.15, Math.min(1.0, player.pitch));
});

document.addEventListener('pointerlockchange', () => {
  if (document.pointerLockElement !== renderer.domElement && state.phase === 'playing') {
    pause();
  }
});

dom.startBtn.addEventListener('click', () => startGame());
dom.resumeBtn.addEventListener('click', () => resume());
dom.againBtn.addEventListener('click', () => location.reload());

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// requestPointerLock() returns a promise in modern browsers and rejects when
// the click was not a real user gesture (or the tab is backgrounded). Swallow
// it: the game still plays with mouse-look on the next click.
function lockPointer() {
  const p = renderer.domElement.requestPointerLock();
  if (p && typeof p.catch === 'function') p.catch(() => {});
}

function startGame() {
  sound.init();
  dom.title.classList.add('hidden');
  dom.hud.classList.add('hidden');
  dom.ammo.classList.add('hidden');
  state.phase = 'cine';
  state.startedAt = performance.now();
  lockPointer();
  updateAmmoDom();
  updateCamera(0.016);
  startColdOpen();
}

// ---------------------------------------------------------------- cold open
// The first thirty seconds are not a tutorial. They are the scene the film
// opens on: you on the pavement, the street still standing, one thing walking.
let cineRoot = null;
let cineFade = null;
let cineSub = null;
let bloodScreen = null;
const CINE = { t: 0, step: 0, z: null, shake: 0, crashed: false };
const _cineV = new THREE.Vector3();
let biteBloodTimer = null;

function buildCineDom() {
  if (cineRoot) return;
  cineRoot = document.createElement('div');
  cineRoot.id = 'cine';
  cineRoot.className = 'hidden';
  cineRoot.innerHTML = '<div class="cine-bar top"></div><div class="cine-bar bot"></div><div id="cineFade" class="dark"></div>';
  document.body.appendChild(cineRoot);
  cineFade = cineRoot.querySelector('#cineFade');

  cineSub = document.createElement('div');
  cineSub.id = 'subtitle';
  cineSub.innerHTML = '<span class="who"></span><span class="line"></span>';
  document.body.appendChild(cineSub);

  const grain = document.createElement('div');
  grain.className = 'grain';
  document.body.appendChild(grain);

  const grade = document.createElement('div');
  grade.className = 'grade';
  document.body.appendChild(grade);

  bloodScreen = document.createElement('div');
  bloodScreen.id = 'bloodScreen';
  document.body.appendChild(bloodScreen);
}

let subTyping = null;
let subHide = null;
function say(text, opts = {}) {
  if (!cineSub) buildCineDom();
  const ms = opts.ms || 4200;
  clearInterval(subTyping);
  clearTimeout(subHide);
  const whoEl = cineSub.querySelector('.who');
  const lineEl = cineSub.querySelector('.line');
  whoEl.textContent = opts.who || '';
  whoEl.style.display = opts.who ? 'block' : 'none';
  lineEl.textContent = '';
  cineSub.classList.add('on');
  const step = Math.max(16, (ms * 0.45) / Math.max(1, text.length));
  let i = 0;
  subTyping = setInterval(() => {
    i += 1;
    lineEl.textContent = text.slice(0, i);
    if (i >= text.length) clearInterval(subTyping);
  }, step);
  subHide = setTimeout(() => cineSub.classList.remove('on'), ms);
}

function startColdOpen() {
  buildCineDom();
  CINE.t = 0;
  CINE.step = 0;
  CINE.shake = 0;
  CINE.crashed = false;
  cineRoot.classList.remove('hidden');
  void cineRoot.offsetHeight;
  cineRoot.classList.add('on');
  cineFade.className = 'dark';
  setTimeout(() => cineRoot.classList.add('bars'), 500);

  // the first one stands up the road, facing back down it
  const z = infected[0];
  if (z) {
    z.root.visible = true;
    z.s = player.pos.z + 26;
    z.lat = 1.0;
    z.mode = 'wander';
    z.heading = Math.PI;
    placeOnGlobe(z.root, z.s, z.lat, 0, Math.PI);
    CINE.z = z;
  }
  if (weapon) weapon.visible = false;
  if (bloodScreen) bloodScreen.style.opacity = 0;
}

const COLD_LINES = [
  { t: 1.0, text: `—Bryan? Bryan, you there? … Eleven minutes of nothing.`, who: 'DISPATCH RADIO', ms: 5400 },
  { t: 5.4, text: `Hey. It's me. I know it's late. Just call me when you get in, okay? I don't care what time.`, who: 'MICHELLE · VOICEMAIL', ms: 5200 },
  { t: 9.2, text: `Headlights caught her for half a second. Then the wheel, then the ditch. Snow's coming in through the windscreen.`, who: 'BRYAN', ms: 4600 },
  { t: 12.2, text: `She's standing back up. That is not how people stand up.`, who: 'BRYAN', ms: 5400 },
  { t: 15.6, text: `Eight rounds in his belt. He isn't getting up either. Okay. Okay.`, who: 'BRYAN', ms: 4600 },
  { t: 18.6, text: `Green case, back seat, floor twenty-eight. Just get it there. Just get it there.`, who: 'BRYAN', ms: 4600 },
];

function updateColdOpen(dt) {
  CINE.t += dt;
  const t = CINE.t;

  // 03:40, 8.9s in: cut to the crash itself for a second and a half. CINE.t
  // is frozen while the shot owns the frame, so the voice-over lands after it.
  if (!CINE.crashed && t > 8.85) {
    CINE.crashed = true;
    playShot('crash');
    return;
  }

  if (CINE.step < COLD_LINES.length && t >= COLD_LINES[CINE.step].t) {
    const l = COLD_LINES[CINE.step];
    say(l.text, { ms: l.ms, who: l.who });
    if (CINE.step === 2) sound.growl(0.85);   // ringing ears after the impact
    CINE.step += 1;
  }

  // fade the black off the lens, lift the camera off the pavement, then cut to black again
  if (t > 1.0 && t < 3.4) cineFade.className = 'mid';
  if (t > 3.4 && t < 12.0) cineFade.className = '';
  if (t > 12.4 && t < 15.0) cineFade.className = 'mid';
  if (t >= 15.0) cineFade.className = 'dark';

  if (t > 8.6 && CINE.z && CINE.z.mode !== 'chase') {
    CINE.z.mode = 'chase';
    sound.growl(0.9);
  }

  const eye = 0.34 + Math.min(1, Math.max(0, (t - 5.8) / 3.6)) ** 2 * (3 - 2 * Math.min(1, Math.max(0, (t - 5.8) / 3.6))) * 1.28;
  const camLat = player.pos.x + 2.4;   // lying in the road, not up on the kerb
  const b = surfBasis(player.pos.z, camLat);
  const near = CINE.z ? Math.max(0, 1 - Math.hypot(CINE.z.s - player.pos.z, CINE.z.lat - player.pos.x) / 14) : 0;
  const amp = 0.006 + near * 0.022 + (t < 4 ? 0.014 * (1 - t / 4) : 0);
  _cineV.set(
    Math.sin(t * 2.3) * amp,
    Math.sin(t * 1.9) * amp * 0.6,
    Math.cos(t * 1.7) * amp
  );
  const base = surfPos(player.pos.z, camLat).addScaledVector(b.up, eye).add(_cineV);
  camera.up.copy(b.up);
  camera.position.copy(base);
  const look = b.fwd.clone().addScaledVector(b.up, 0.03 + near * 0.05).normalize();
  camera.lookAt(base.clone().add(look));

  if (t > 19.4) finishColdOpen();
}

function finishColdOpen() {
  if (state.phase !== 'cine') return;
  cineRoot.classList.remove('on', 'bars');
  cineRoot.classList.add('hidden');
  cineFade.className = 'dark';
  if (cineSub) cineSub.classList.remove('on');

  // cut: the thing that was on top of us is now six metres away, and we are armed
  const z = CINE.z;
  if (z) {
    z.s = player.pos.z + 6.5;
    z.lat = 0.8;
    z.mode = 'wander';
    z.biteCd = 2.5;
    z.anim = 0;
    placeOnGlobe(z.root, z.s, z.lat, 0, Math.PI);
  }
  if (weapon) weapon.visible = true;

  state.phase = 'playing';
  dom.hud.classList.remove('hidden');
  dom.ammo.classList.remove('hidden');
  player.eye = PLAYER.eyeStand;
  clock.getDelta();
  updateCamera(0.016);
  startAct(0);
}

// ---------------------------------------------------------------- act cards
let actCard = null;
let actTimer = 0;
let actCardAt = 0;

function buildActCard() {
  actCard = document.createElement('div');
  actCard.id = 'actCard';
  actCard.className = 'act-card hidden';
  actCard.innerHTML = `
    <div class="bar top"></div>
    <div class="bar bot"></div>
    <div class="act-copy">
      <p class="act-no"></p>
      <h2 class="act-title"></h2>
      <div class="act-lines"></div>
      <p class="act-bc"></p>
    </div>`;
  document.body.appendChild(actCard);
}

function startAct(i) {
  state.act = i;
  const act = ACTS[i];
  if (!act) return;
  for (const z of infected) if (z.act <= i + 1) z.root.visible = true;
  updateObjective();
  showActCard(act);
  if (i >= 1) sound.siren(1.2);
}

function showActCard(act) {
  if (!actCard) buildActCard();
  actCard.querySelector('.act-no').textContent = `${act.no} · ${act.time} — ${act.place}`;
  actCard.querySelector('.act-title').textContent = act.title;
  actCard.querySelector('.act-lines').innerHTML = act.lines.map((l) => `<p>${l}</p>`).join('');
  actCard.querySelector('.act-bc').textContent = act.broadcast;
  state.phase = 'interlude';
  dom.alert.classList.add('hidden');
  dom.hud.classList.add('hidden');
  actCard.classList.remove('hidden');
  void actCard.offsetHeight;          // force the base style so the fade actually runs
  actCard.classList.add('show');
  sound.sting();
  clearTimeout(actTimer);
  actCardAt = performance.now();
  actTimer = setTimeout(() => dismissActCard(), 4600);
}

function dismissActCard() {
  if (!actCard || state.phase !== 'interlude') return;
  // the key press that closed a delivery must not also skip the card it opened
  if (performance.now() - actCardAt < 500) return;
  clearTimeout(actTimer);
  actCard.classList.remove('show');
  actTimer = setTimeout(() => {
    actCard.classList.add('hidden');
    if (state.phase === 'interlude') {
      state.phase = 'playing';
      dom.hud.classList.remove('hidden');
      clock.getDelta();
      updateObjective();
    }
  }, 780);
}

addEventListener('keydown', (e) => {
  if (state.phase === 'interlude' && (e.code === 'Space' || e.code === 'KeyE' || e.code === 'Enter')) {
    e.preventDefault();
    dismissActCard();
  }
});

addEventListener('keydown', (e) => {
  if (state.phase === 'cine' && (e.code === 'Space' || e.code === 'Enter' || e.code === 'Escape')) {
    e.preventDefault();
    finishColdOpen();
  }
});

function pause() {
  state.phase = 'paused';
  dom.pause.classList.remove('hidden');
  if (document.pointerLockElement) document.exitPointerLock();
}

function resume() {
  dom.pause.classList.add('hidden');
  state.phase = 'playing';
  lockPointer();
  clock.getDelta();
}

// ---------------------------------------------------------------- game flow
function updateObjective() {
  const label = document.querySelector('.obj-label');
  if (label && ACTS[state.act]) label.textContent = ACTS[state.act].label;
  if (state.delivered >= STOPS.length) {
    dom.objText.textContent = "It's on the bench. I did what I was paid to do.";
  } else if (state.carrying === 0) {
    dom.objText.textContent = state.delivered === 0
      ? "Green case, back seat. Don't leave it."
      : 'Pick it back up. Both hands.';
  } else {
    dom.objText.textContent = STOPS[state.legIndex].line;
  }
  renderDots();
}

function renderDots() {
  dom.stopDots.innerHTML = '';
  for (let i = 0; i < STOPS.length; i++) {
    const d = document.createElement('span');
    d.className = 'dot' + (i < state.delivered ? ' done' : (i === state.legIndex && state.carrying ? ' next' : ''));
    dom.stopDots.appendChild(d);
  }
}

function nearestInteract() {
  if (state.carrying === 0) {
    const targets = [];
    if (state.delivered === 0) targets.push({ x: DEPOT.x, z: DEPOT.z + 0.4, kind: 'pickup', label: 'Take the case off the van' });
    else {
      const stop = STOPS[state.legIndex - 1];
      if (stop) targets.push({ x: stop.x, z: stop.z, kind: 'pickup', label: 'Pick the case back up' });
    }
    return closest(targets, 3.2);
  }
  const stop = STOPS[state.legIndex];
  if (!stop) return null;
  return closest([{ x: stop.x, z: stop.z, kind: 'deliver', label: stop.action }], 3.6);
}

function closest(list, radius) {
  let best = null;
  let bestD = radius;
  for (const t of list) {
    const d = Math.hypot(player.pos.x - t.x, player.pos.z - t.z);
    if (d < bestD) { bestD = d; best = t; }
  }
  return best;
}

function interact() {
  if (state.phase !== 'playing') return;
  const target = nearestInteract();
  if (!target) return;
  if (target.kind === 'pickup') {
    state.carrying = 1;
    sound.pickup();
    setCarried(true);
    if (state.delivered > 0) state.legIndex = state.delivered;
    updateObjective();
  } else if (target.kind === 'deliver') {
    deliver();
  }
}

function deliver() {
  // Waypoints, not hand-overs: the one sealed case stays in your hands until
  // the lab door. There is no relay of fresh coolers in the film.
  const stop = STOPS[state.legIndex];
  state.delivered += 1;
  state.legIndex = state.delivered;
  state.checkpoint = { x: stop.x, z: stop.z };
  state.carrying = 1;
  setCarried(true);
  sound.pickup();

  if (state.delivered >= STOPS.length) {
    if (SHOT.active) endShot();
    playShot('lab');   // the handover is played, not reported
    return;
  }
  // Only scavenged rounds at a waypoint — no free magazine refill.
  state.reserve = Math.min(20, state.reserve + 4);
  state.reloading = false;
  state.reloadT = 0;
  updateMeters(0);
  updateObjective();
  flashObjective();
  // ACT II is where the night stops being survivable: the tunnel bite.
  if (state.delivered === 1) tunnelBite();
  startAct(state.delivered);
}

// The little girl under the overpass. The bite is not a scratch you can walk
// off: from here the T-virus only goes one way, and the lab is still a long
// walk. The ACT II card plays first, then the street is replaced by a shot.
function tunnelBite() {
  state.bites += 1;
  state.bittenByGirl = true;
  state.warmth = Math.max(state.warmth, 48);
  const cut = () => {
    if (state.phase === 'paused' || state.phase === 'interlude') {
      storyTimers.push(setTimeout(cut, 600));
      return;
    }
    if (state.phase !== 'playing') return;
    playShot('girl');
  };
  storyTimers.push(setTimeout(cut, 5700));
}

function flashObjective() {
  dom.objText.animate(
    [{ opacity: 0.2 }, { opacity: 1 }],
    { duration: 420, easing: 'ease-out' }
  );
}

function updateGun(dt) {
  if (state.gunCd > 0) state.gunCd = Math.max(0, state.gunCd - dt);
  if (state.reloading) {
    state.reloadT -= dt;
    if (state.reloadT <= 0) finishReload();
  }
}

function busted() {
  state.bites += 1;
  state.warmth = Math.min(COLD.max - 4, state.warmth + 12);
  state.stamina = STAM.max;
  sound.sting();
  dom.flash.style.opacity = 0.55;
  setTimeout(() => { dom.flash.style.opacity = 0; }, 240);
  dom.alert.textContent = 'that one got close';
  dom.alert.classList.remove('hidden');
  setTimeout(() => dom.alert.classList.add('hidden'), 1400);
  respawn();
}

function turnEnding() {
  if (state.phase !== 'playing') return;
  state.turnings += 1;
  dom.alert.textContent = "i can't stand up";
  dom.alert.classList.remove('hidden');
  setTimeout(() => dom.alert.classList.add('hidden'), 1600);
  runEnding('turn');
}

function respawn() {
  player.pos.set(state.checkpoint.x, 0, state.checkpoint.z);
  player.vel.set(0, 0, 0);
  state.alerted = 0;
  // the horde steps back so a respawn is not an instant second bite
  for (const z of infected) {
    if (z.dead) continue;
    z.mode = 'wander';
    const away = Math.atan2(z.lat - player.pos.x, z.s - player.pos.z);
    z.s += Math.cos(away) * 6;
    z.lat += Math.sin(away) * 2;
    z.s = Math.max(8, Math.min(226, z.s));
    z.lat = Math.max(-STREET.half + 0.7, Math.min(STREET.half - 0.7, z.lat));
    placeOnGlobe(z.root, z.s, z.lat, 0, z.heading);
  }
  // blacked out and came round at the last waypoint — the case never left you
  if (state.carrying === 0 && state.delivered === 0) {
    spawnParcelAt(DEPOT.x, DEPOT.z + 0.4);
  } else if (state.carrying === 0) {
    state.carrying = 1;
    setCarried(true);
  }
  updateObjective();
}

// ---------------------------------------------------------------- ending
// The delivery succeeds. The cure does not. The last act is told from behind
// the courier's eyes, and the sentences fall apart as he does: no narrator,
// no summary, just shorter and shorter things he can still say.
const END_LINES = {
  lab: [
    { text: "The lab is warm. That's the first thing I notice. My coat's still wet.", who: 'BRYAN', ms: 4400 },
    { text: "—set it down. On the bench. Don't — don't come any closer.", who: 'CARL · INTERCOM', ms: 4600 },
    { text: "He isn't looking at my face. He's looking at my arm.", who: 'BRYAN', ms: 4000 },
    { text: "I can hear the case being opened. I can't feel my left hand.", who: 'BRYAN', ms: 4400 },
    { text: "There's a syringe on the bench. I'm trying to say please.", who: 'BRYAN', ms: 4200 },
    { text: "It's on the floor now. I'm trying to say Michelle.", who: 'BRYAN', ms: 4000 },
    { text: 'M—', who: 'BRYAN', ms: 3000 },
  ],
  turn: [
    { text: "I can't swallow. The case is getting heavy.", who: 'BRYAN', ms: 4200 },
    { text: "I'm going to set it down for a second. Just a second.", who: 'BRYAN', ms: 4400 },
    { text: 'M—', who: 'BRYAN', ms: 3200 },
  ],
};

let endSeq = null;
let endKind = null;
const endTimers = [];

function runEnding(kind) {
  if (state.phase === 'ending' || state.phase === 'end') return;
  state.phase = 'ending';
  endKind = kind;
  if (document.pointerLockElement) document.exitPointerLock();
  dom.hud.classList.add('hidden');
  dom.ammo.classList.add('hidden');
  setCarried(false);
  clearParcelMarker();
  buildCineDom();

  if (!endSeq) {
    endSeq = document.createElement('div');
    endSeq.id = 'endSeq';
    endSeq.innerHTML = '<div class="beam"></div><div class="endseq-tag"></div>';
    document.body.appendChild(endSeq);
  }
  endSeq.querySelector('.endseq-tag').textContent = kind === 'lab'
    ? 'UMBRELLA / LAB 28 · 05:07'
    : 'RACCOON CITY · 04:52';
  void endSeq.offsetHeight;
  endSeq.classList.add('on');

  let t = 500;
  for (const l of END_LINES[kind]) {
    const at = t;
    endTimers.push(setTimeout(() => say(l.text, { ms: l.ms - 350, who: l.who }), at));
    t += l.ms;
  }
  // The black screen thins out and the live street shows through, but from
  // the floor and going wide: the last shot plays under the final subtitles.
  endTimers.push(setTimeout(() => {
    if (state.phase === 'ending' && !SHOT.active) playShot('turn');
  }, Math.max(0, t - 1400)));
  endTimers.push(setTimeout(() => endSeq.classList.add('searchlight'), t - 3000));
  endTimers.push(setTimeout(() => say('A light moves across the ceiling. I can still see it.', { ms: 2900, who: 'BRYAN' }), t + 100));
  endTimers.push(setTimeout(() => endSeq.classList.add('blackout'), t + 3100));
  endTimers.push(setTimeout(() => showEndCard(kind), t + 4100));
}

function skipEnding() {
  if (state.phase !== 'ending' || !endKind) return;
  for (const id of endTimers) clearTimeout(id);
  endTimers.length = 0;
  if (SHOT.active && !SHOT.block) endShot();
  showEndCard(endKind);
}

addEventListener('keydown', (e) => {
  if (state.phase === 'ending' && (e.code === 'Space' || e.code === 'Enter' || e.code === 'Escape')) {
    e.preventDefault();
    skipEnding();
  }
});

function showEndCard(kind) {
  if (SHOT.active && !SHOT.block) endShot();
  state.phase = 'end';
  if (cineSub) cineSub.classList.remove('on');
  const mins = Math.floor((performance.now() - state.startedAt) / 60000);
  const secs = Math.floor(((performance.now() - state.startedAt) % 60000) / 1000);
  // By this point the courier cannot narrate anything. What is left is a log
  // written by the people who were never going to give him the syringe.
  if (kind === 'lab') {
    dom.endKicker.textContent = 'UMBRELLA / LAB 28 · INCIDENT LOG · 05:12';
    dom.endTitle.textContent = 'SUBJECT ZERO';
    dom.endBody.textContent = '05:07 — Sample 0447 received, seal intact. 05:11 — Antiviral synthesized. 05:12 — No administration recorded. The courier who carried it in has been designated Subject Zero. There is one unplayed message on his answering machine.';
  } else {
    dom.endKicker.textContent = 'RACCOON CITY · RECOVERY LOG · 05:40';
    dom.endTitle.textContent = 'TOO LATE';
    dom.endBody.textContent = '04:52 — Courier down between the barricade and the hospital. 05:40 — Order 0447 recovered from the snow, still sealed, still cold; carried the rest of the way by another hand. The message on his answering machine was never returned.';
  }
  dom.endStats.innerHTML = `
    <li><span>Time on the street</span><b>${mins}m ${String(secs).padStart(2, '0')}s</b></li>
    <li><span>Route logged</span><b>${state.delivered} / ${STOPS.length}</b></li>
    <li><span>Order 0447</span><b>${kind === 'lab' ? 'Delivered, sealed' : 'Recovered, sealed'}</b></li>
    <li><span>Fever at handover</span><b>${Math.round(state.warmth)}%</b></li>
    <li><span>Bodies on the street</span><b>${state.kills}</b></li>
    <li><span>Rounds fired</span><b>${state.shots}</b></li>
    <li><span>Bites</span><b>${state.bites}</b></li>`;
  dom.hud.classList.add('hidden');
  dom.end.classList.remove('hidden');
}

// ---------------------------------------------------------- realtime story shots
// No pre-rendered CG. Every cutscene is a camera move through the same live
// street, using the same assets the player walks past: the woman in the
// headlights, the kid under the overpass, a door at the end of the road, and
// your own lens when it stops being yours. Props are built lazily and marked
// noWrap because the rest of the world has already been bent onto the globe.
const FOV_BASE = 70;
const SHOT = { active: false, name: null, t: 0, dur: 0, block: true, returnPhase: null, cues: [], ctx: {} };
let shotLayer = null;
let shotProps = null;

const easeInOut = (u) => (u < 0.5 ? 2 * u * u : 1 - ((-2 * u + 2) ** 2) / 2);

function buildShotLayer() {
  if (shotLayer) return;
  shotLayer = document.createElement('div');
  shotLayer.id = 'shotLayer';
  shotLayer.className = 'hidden';
  shotLayer.innerHTML = `<div class="sb top"></div><div class="sb bot"></div>
    <div class="shot-grade"></div>
    <svg class="crack" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice"></svg>
    <div class="shot-vig"></div>`;
  document.body.appendChild(shotLayer);

  // windscreen glass, drawn as SVG paths at runtime — no image files
  const NS = 'http://www.w3.org/2000/svg';
  const svg = shotLayer.querySelector('.crack');
  const cx = 500, cy = 290;
  for (let i = 0; i < 15; i++) {
    const a = (i / 15) * Math.PI * 2 + 0.11;
    const len = 150 + (i % 5) * 96;
    const mx = cx + Math.cos(a + 0.08) * len * 0.52;
    const my = cy + Math.sin(a + 0.08) * len * 0.36;
    const x = cx + Math.cos(a) * len;
    const y = cy + Math.sin(a) * len * 0.72;
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', `M${cx} ${cy} L${mx.toFixed(1)} ${my.toFixed(1)} L${x.toFixed(1)} ${y.toFixed(1)}`);
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', 'rgba(228,241,255,0.55)');
    p.setAttribute('stroke-width', i % 3 === 0 ? '2.1' : '1');
    svg.appendChild(p);
  }
  for (let r = 46; r <= 190; r += 52) {
    const pts = [];
    for (let i = 0; i <= 15; i++) {
      const a = (i / 15) * Math.PI * 2;
      const rr = r * (0.86 + 0.18 * Math.sin(i * 2.7 + r));
      pts.push(`${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr * 0.72).toFixed(1)}`);
    }
    const poly = document.createElementNS(NS, 'polyline');
    poly.setAttribute('points', pts.join(' '));
    poly.setAttribute('fill', 'none');
    poly.setAttribute('stroke', 'rgba(210,230,250,0.32)');
    poly.setAttribute('stroke-width', '1.2');
    svg.appendChild(poly);
  }
}

function makeShotFigure(opts) {
  const body = mkCourier(opts);
  const bones = poseRelaxed(body);
  const g = new THREE.Group();
  g.add(body);
  g.userData.noWrap = true;
  g.visible = false;
  world.add(g);
  return { g, body, bones };
}

function ensureShotProps() {
  buildShotLayer();
  if (shotProps) return shotProps;

  const crashWoman = makeShotFigure({
    box: false, bag: false, hat: false, age: 'adult', figure: 'feminine', build: 0.94,
    coat: '#4b3d44', denim: '#2b3138', skin: '#a89589', hair: '#241d1c',
    boot: '#3a332f', sole: '#1a1715', pack: '#3a3330',
  });
  // Headlights still on. This lamp lives in the world, not on the figure:
  // the figure's heading would swing it round to her far side.
  const headlamp = new THREE.PointLight(0xffe6c4, 6.5, 12, 2);
  headlamp.visible = false;
  world.add(headlamp);

  const tunnelGirl = makeShotFigure({
    box: false, bag: false, hat: false, age: 'kid', figure: 'feminine', build: 0.88,
    coat: '#6a4a4f', denim: '#333b42', skin: '#b39a8c', hair: '#2a211e',
    boot: '#413632', sole: '#1c1815', pack: '#4a3a3c',
  });
  // one arm out, asking for help
  if (tunnelGirl.bones.RightArm) {
    tunnelGirl.bones.RightArm.rotation.z = 0.42;
    tunnelGirl.bones.RightArm.rotation.y = -0.95;
  }
  if (tunnelGirl.bones.RightForeArm) tunnelGirl.bones.RightForeArm.rotation.y = 0.25;

  // a lab door at the end of the street: two steel leaves and a lit seam
  const door = new THREE.Group();
  const steel = new THREE.MeshStandardMaterial({ color: 0x3b464e, roughness: 0.52, metalness: 0.62 });
  const edge = new THREE.MeshStandardMaterial({ color: 0x1b232a, roughness: 0.8, metalness: 0.3 });
  const frame = new THREE.Mesh(new THREE.BoxGeometry(2.36, 2.66, 0.13), edge);
  frame.position.z = 0.07;
  door.add(frame);
  const leaves = [];
  for (const sx of [-1, 1]) {
    const leaf = new THREE.Mesh(new THREE.BoxGeometry(0.92, 2.5, 0.09), steel);
    leaf.position.set(sx * 0.63, 0, -0.02);
    door.add(leaf);
    leaves.push(leaf);
  }
  const seam = new THREE.Mesh(
    new THREE.PlaneGeometry(0.18, 2.42),
    new THREE.MeshBasicMaterial({ color: 0xb9753e, side: THREE.DoubleSide })
  );
  seam.position.set(0, 0, -0.09);
  door.add(seam);
  const light = new THREE.PointLight(0xffc98d, 1.6, 10, 2);
  light.position.set(0, 0.1, -0.7);
  door.add(light);
  door.userData.noWrap = true;
  door.visible = false;
  world.add(door);

  shotProps = { crashWoman, tunnelGirl, headlamp, door: { g: door, left: leaves[0], seam, light } };
  return shotProps;
}

function shotCam(s, lat, h, ts, tlat, th, opt = {}) {
  const b = surfBasis(s, lat);
  const p = surfPos(s, lat).addScaledVector(b.up, h);
  if (opt.shake) {
    p.addScaledVector(b.right, Math.sin((opt.t || 0) * 37) * opt.shake)
      .addScaledVector(b.up, Math.cos((opt.t || 0) * 29) * opt.shake * 0.6);
  }
  camera.up.copy(b.up);
  camera.position.copy(p);
  camera.lookAt(surfPos(ts, tlat).addScaledVector(surfUp(ts, tlat), th));
  if (opt.roll) camera.rotateZ(opt.roll);
  const fov = opt.fov ?? FOV_BASE;
  if (Math.abs(camera.fov - fov) > 0.02) {
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }
}

const SHOTS = {
  // 1 — the crash: headlight height, glass, a face, then the lens hits the road
  crash: {
    dur: 1.5, block: true, cls: 'crash',
    start(ctx) {
      ctx.s = player.pos.z;
      ctx.lat = player.pos.x;
      placeOnGlobe(shotProps.crashWoman.g, ctx.s + 3.6, ctx.lat + 0.15, 0, Math.PI);
      shotProps.crashWoman.g.visible = true;
      const b = surfBasis(ctx.s + 2.3, ctx.lat + 0.15);
      shotProps.headlamp.position.copy(surfPos(ctx.s + 2.3, ctx.lat + 0.15).addScaledVector(b.up, 1.5));
      shotProps.headlamp.visible = true;
      shotLayer.classList.add('crack-on');
      sound.sting();
    },
    frame(u, ctx) {
      const t = SHOT.t;
      const push = Math.min(1, u / 0.3);
      const fall = Math.max(0, (u - 0.36) / 0.64);
      shotCam(ctx.s + 0.35 + push * 1.2 - fall * 0.7, ctx.lat + 0.12,
        1.42 - fall * 1.0, ctx.s + 3.6, ctx.lat + 0.15, 1.5 - fall * 0.3,
        { fov: 70 + Math.sin(Math.min(1, u) * Math.PI) * 22 - fall * 5,
          roll: (u - 0.3) * 0.22 + Math.sin(t * 22) * 0.012,
          shake: 0.04 * (1 - u) + 0.01, t });
      dom.flash.style.opacity = String(Math.max(0, 0.9 * (1 - u * 3.4)));
      shotLayer.querySelector('.crack').style.opacity =
        String(u > 0.8 ? Math.max(0, (1 - u) / 0.2) : 1);
    },
    end() {
      shotProps.crashWoman.g.visible = false;
      shotProps.headlamp.visible = false;
      shotLayer.classList.remove('crack-on');
      shotLayer.querySelector('.crack').style.opacity = '';
      dom.flash.style.opacity = 0;
    },
  },

  // 2 — the tunnel: a low push-in on the kid, then the bite and a recoil
  girl: {
    dur: 4.8, block: true, cls: 'girl',
    start(ctx) {
      const p = player.pos;
      ctx.s = p.z + 5.2;
      ctx.lat = Math.max(-STREET.half + 1, Math.min(STREET.half - 1, p.x + 1.1));
      ctx.eye = player.eye;
      placeOnGlobe(shotProps.tunnelGirl.g, ctx.s, ctx.lat, 0, Math.PI);
      shotProps.tunnelGirl.g.visible = true;
      state.bittenByGirl = true;
      state.warmth = Math.max(state.warmth, 48);
      updateMeters(0);
      sound.growl(0.8);
    },
    cues: [
      { u: 0.05, run: () => say(`—help me? I can't find my mum.`, { who: 'THE GIRL', ms: 2600 }) },
      { u: 0.53, run: () => {
        sound.sting();
        dom.flash.style.opacity = 0.72;
        setTimeout(() => { dom.flash.style.opacity = 0; }, 320);
        if (bloodScreen) {
          bloodScreen.style.opacity = 0.55;
          setTimeout(() => { bloodScreen.style.opacity = 0; }, 2400);
        }
        const b = shotProps.tunnelGirl.bones;
        if (b.Head) b.Head.rotation.x = -0.34;
        if (b.Neck) b.Neck.rotation.x = -0.26;
      } },
      { u: 0.68, run: () => say(`She said help me. I put my arm out. There's a ring of teeth on it and it won't stop burning.`, { who: 'BRYAN', ms: 4200 }) },
    ],
    frame(u, ctx) {
      const t = SHOT.t;
      const push = easeInOut(Math.min(1, u / 0.62));
      const recoil = Math.max(0, (u - 0.54) / 0.46);
      const p = player.pos;
      shotCam(p.z + push * 4.3 - recoil * 2.5,
        p.x + (ctx.lat - p.x) * push * 0.72,
        ctx.eye * (1 - push) + 1.0 * push - recoil * 0.22,
        ctx.s, ctx.lat, 0.96 + recoil * 0.18,
        { fov: 70 - push * 8 + recoil * 22,
          roll: Math.sin(t * 1.7) * 0.008 + recoil * 0.18,
          shake: 0.008 + recoil * 0.03, t });
    },
    end() {
      shotProps.tunnelGirl.g.visible = false;
      const b = shotProps.tunnelGirl.bones;
      if (b.Head) b.Head.rotation.x = 0;
      if (b.Neck) b.Neck.rotation.x = 0;
      dom.flash.style.opacity = 0;
    },
  },

  // 3 — handover: low angle through the six-inch gap in the lab door
  lab: {
    dur: 4.7, block: true, cls: 'lab',
    start(ctx) {
      const stop = STOPS[STOPS.length - 1];
      ctx.ds = stop.z + 3.4;
      ctx.dlat = stop.x;
      setCarried(true);   // the case must be in frame for the handover
      placeOnGlobe(shotProps.door.g, ctx.ds, ctx.dlat, 1.28, 0);
      shotProps.door.g.visible = true;
      shotProps.door.left.position.x = -0.63;
      shotProps.door.seam.scale.x = 1;
      shotProps.door.light.intensity = 1.6;
    },
    cues: [
      { u: 0.06, run: () => say(`Bryan? Through here. Set it on the bench. Don't come in.`, { who: 'CARL · INTERCOM', ms: 3200 }) },
      { u: 0.46, run: () => say(`The door opens six inches. A hand takes the case. It's warm behind it.`, { who: 'BRYAN', ms: 3400 }) },
      { u: 0.82, run: () => say(`I can still hear them talking in there.`, { who: 'BRYAN', ms: 2600 }) },
    ],
    frame(u, ctx) {
      const t = SHOT.t;
      const push = easeInOut(Math.min(1, u / 0.88));
      shotCam(ctx.ds - 3.8 + push * 2.3, ctx.dlat - 0.55 + push * 0.45,
        0.72 + push * 0.24, ctx.ds, ctx.dlat, 1.28,
        { fov: 70 - push * 5, roll: Math.sin(t * 1.3) * 0.004, shake: 0.006, t });
      const open = Math.sin(Math.min(1, u) * Math.PI);
      shotProps.door.left.position.x = -0.63 - open * 0.5;
      shotProps.door.seam.scale.x = 1 + open * 1.0;
      shotProps.door.light.intensity = 1.6 + open * 2.2;
      if (carriedMesh) carriedMesh.position.set(0.34, -0.36 - open * 0.16, -0.9 - open * 0.45);
    },
    end() {
      shotProps.door.g.visible = false;
      if (carriedMesh) carriedMesh.position.set(0.34, -0.36, -0.9);
      runEnding('lab');
    },
  },

  // 4 — the lens stops being yours: it drops to the floor and goes wide
  turn: {
    dur: 4.4, block: false, cls: 'turn',
    start(ctx) {
      ctx.s = player.pos.z;
      ctx.lat = player.pos.x;
      if (endSeq) endSeq.classList.add('see');
    },
    frame(u, ctx) {
      const t = SHOT.t;
      const drop = easeInOut(Math.min(1, u / 0.9));
      shotCam(ctx.s, ctx.lat, 1.62 - drop * 1.28,
        ctx.s + 7, ctx.lat + Math.sin(u * 2.4) * 0.8, -0.12,
        { fov: 70 + drop * 34,
          roll: drop * (0.26 + Math.sin(t * 1.8) * 0.03),
          shake: 0.01 + drop * 0.035, t });
    },
    end() {
      if (endSeq) endSeq.classList.remove('see');
    },
  },
};

function playShot(name) {
  const def = SHOTS[name];
  if (!def || SHOT.active || state.phase === 'end' || state.phase === 'shot') return;
  buildCineDom();
  ensureShotProps();
  SHOT.active = true;
  SHOT.name = name;
  SHOT.t = 0;
  SHOT.dur = def.dur;
  SHOT.block = def.block !== false;
  SHOT.returnPhase = state.phase;
  SHOT.ctx = {};
  SHOT.cues = (def.cues || []).map((c) => ({ u: c.u, run: c.run, fired: false }));
  shotLayer.className = `${def.cls} on`;
  document.body.classList.add('in-shot');
  if (SHOT.block) {
    state.phase = 'shot';
    dom.hud.classList.add('hidden');
    dom.alert.classList.add('hidden');
  }
  def.start(SHOT.ctx);
  clock.getDelta();
}

function endShot() {
  if (!SHOT.active) return;
  const def = SHOTS[SHOT.name];
  const ctx = SHOT.ctx;
  const wasBlock = SHOT.block;
  const back = SHOT.returnPhase;
  SHOT.active = false;
  SHOT.name = null;
  SHOT.cues = [];
  shotLayer.className = 'hidden';
  document.body.classList.remove('in-shot');
  camera.fov = FOV_BASE;
  camera.updateProjectionMatrix();
  dom.flash.style.opacity = 0;
  if (wasBlock && back && back !== 'shot') {
    state.phase = back;
    if (back === 'playing') dom.hud.classList.remove('hidden');
  }
  if (def && def.end) def.end(ctx);
  clock.getDelta();
}

function updateShot(dt) {
  if (!SHOT.active) return;
  SHOT.t += dt;
  const def = SHOTS[SHOT.name];
  const u = Math.min(1, SHOT.t / SHOT.dur);
  if (def.frame) def.frame(u, SHOT.ctx);
  for (const c of SHOT.cues) {
    if (!c.fired && u >= c.u) { c.fired = true; c.run(); }
  }
  if (u >= 1) endShot();
}

// a shot is a cut, not a wall: any of the usual skip keys gets you out of it
addEventListener('keydown', (e) => {
  if (SHOT.active && SHOT.block && (e.code === 'Space' || e.code === 'Enter' || e.code === 'Escape')) {
    e.preventDefault();
    endShot();
  }
});

// ---------------------------------------------------------------- update
function tick() {
  const dt = Math.min(clock.getDelta(), 0.05);

  // A blocking shot owns the camera and freezes the player. An overlay shot
  // (the mutation) still owns the camera but lets the ending's timers run.
  if (SHOT.active && SHOT.block) {
    updateShot(dt);
  } else if (state.phase === 'playing') {
    updatePlayer(dt);
    updateHorde(dt);
    updateGun(dt);
    updateMeters(dt);
    updatePrompt();
    updateCamera(dt);
    updateWeapon(dt);
    animateParcel(dt);
    updateBeats();
  } else if (state.phase === 'cine') {
    updateColdOpen(dt);
    updateHorde(dt);
    updateWeapon(dt);
  } else if (state.phase === 'title') {
    // slow drift down the street while the planet curves away
    const t = performance.now() * 0.0002;
    const camS = 26 + Math.sin(t) * 7;
    const camLat = Math.cos(t * 0.7) * 1.4;
    const b = surfBasis(camS, camLat);
    const p = surfPos(camS, camLat).addScaledVector(b.up, 3.2);
    camera.up.copy(b.up);
    camera.position.copy(p);
    const targetS = camS + 42;
    camera.lookAt(surfPos(targetS, 0).addScaledVector(surfUp(targetS, 0), 1.8));
  } else if (SHOT.active) {
    updateShot(dt);
  }

  updateSnow(dt);
  updateGlows();
  updateBloodFx(dt);
  renderer.render(scene, camera);
}

let lastHeart = 0;

// Nothing here is a narrator. Every line has a source in the street: your own
// voice, a message you never sent, a channel you were not meant to hear, a lab
// intercom, and a police dispatcher on the other side of the same night.
const BEATS = [
  { s: 6,   text: `I should call her. Not yet. When I'm out of this.`, who: 'BRYAN', ms: 3800 },
  { s: 20,  text: `Snow in my boots. The case is heavier than it looked on the manifest.`, who: 'BRYAN', ms: 4200 },
  { s: 34,  text: `Green herb in the doorway. First aid spray in the cruiser. Somebody left a typewriter under the lamp.`, who: 'BRYAN', ms: 4400 },
  { s: 68,  text: `—payload is intact. Do not disclose to the courier. The city is already written off.`, who: 'UMBRELLA FIELD CHANNEL', ms: 4600 },
  { s: 100, text: `My arm's gone numb up to the elbow. I'm not going to look at it again.`, who: 'BRYAN', ms: 4200 },
  { s: 146, text: `Bryan? Stairs to 24, skybridge, then 28. Don't use the elevator. Keep the case cold.`, who: 'CARL · INTERCOM', ms: 4600 },
  { s: 165, text: `I can't feel the case in my left hand. Keep it in the right. Keep it in the right.`, who: 'BRYAN', ms: 4200 },
  { s: 178, text: `—rookie just checked in at the station. Kennedy. Somebody tell him what night this is.`, who: 'RPD DISPATCH', ms: 4200 },
];
const beatFlags = [];
function updateBeats() {
  for (let i = 0; i < BEATS.length; i++) {
    if (beatFlags[i] || player.pos.z < BEATS[i].s) continue;
    beatFlags[i] = true;
    say(BEATS[i].text, { ms: BEATS[i].ms || 4200, who: BEATS[i].who });
  }
}

// The bite is felt, not measured. Each of these fires once, in order, as the
// infection climbs — and the HUD label deteriorates along with him.
const FEVER_LINES = [
  { at: 52, text: "It's burning now. All the way up to the elbow.", who: 'BRYAN' },
  { at: 64, text: "There's something moving under the skin. That's not the cold.", who: 'BRYAN' },
  { at: 78, text: "I can't feel the case in my left hand anymore.", who: 'BRYAN' },
  { at: 92, text: "I keep trying to say Michelle's name. It comes out wrong.", who: 'BRYAN' },
];
const feverFlags = [];
const FEVER_LABELS = [
  { at: 0,  label: 'COLD' },
  { at: 48, label: 'BITE · LEFT ARM' },
  { at: 64, label: 'UNDER THE SKIN' },
  { at: 78, label: 'LEFT HAND GONE' },
  { at: 92, label: "CAN'T SAY HER NAME" },
];
function updateFeverVoice() {
  for (let i = 0; i < FEVER_LINES.length; i++) {
    if (!feverFlags[i] && state.warmth >= FEVER_LINES[i].at) {
      feverFlags[i] = true;
      say(FEVER_LINES[i].text, { ms: 4200, who: FEVER_LINES[i].who });
    }
  }
  let label = FEVER_LABELS[0].label;
  for (const l of FEVER_LABELS) if (state.warmth >= l.at) label = l.label;
  if (dom.feverLabel.textContent !== label) dom.feverLabel.textContent = label;
}

function updatePlayer(dt) {
  const forward = (keys.KeyW ? 1 : 0) - (keys.KeyS ? 1 : 0);
  const strafe = (keys.KeyA ? 1 : 0) - (keys.KeyD ? 1 : 0);
  const sprinting = !!keys.ShiftLeft || !!keys.ShiftRight;
  const wantsMove = forward !== 0 || strafe !== 0;

  let speed = sprinting && state.stamina > STAM.minToStart && forward > 0 ? PLAYER.run : PLAYER.walk;
  if (player.crouch) speed *= PLAYER.crouchMul;
  if (sprinting && forward > 0 && state.stamina > STAM.minToStart) state.stamina -= STAM.sprint * dt;
  else state.stamina = Math.min(STAM.max, state.stamina + STAM.regen * dt);

  const dir = new THREE.Vector3(strafe, 0, -forward);
  if (dir.lengthSq() > 0) dir.normalize().applyAxisAngle(new THREE.Vector3(0, 1, 0), player.yaw);

  const target = dir.multiplyScalar(wantsMove ? speed : 0);
  player.vel.x += (target.x - player.vel.x) * Math.min(1, PLAYER.accel * dt);
  player.vel.z += (target.z - player.vel.z) * Math.min(1, PLAYER.accel * dt);

  player.pos.x += player.vel.x * dt;
  player.pos.z += player.vel.z * dt;

  // corridor limits
  player.pos.x = Math.max(-STREET.walkLimit, Math.min(STREET.walkLimit, player.pos.x));
  player.pos.z = Math.max(STREET.zStart, Math.min(STREET.zEnd, player.pos.z));

  // prop colliders
  for (const c of colliders) {
    const dx = player.pos.x - c.x;
    const dz = player.pos.z - c.z;
    const d = Math.hypot(dx, dz);
    const min = c.r + PLAYER.radius;
    if (d < min && d > 0.0001) {
      player.pos.x = c.x + (dx / d) * min;
      player.pos.z = c.z + (dz / d) * min;
    }
  }

  const plan = Math.hypot(player.vel.x, player.vel.z);
  player.moving = plan > 0.4;
  player.bob += plan * dt * (sprinting ? 7.2 : 5.4);

  if (player.moving) {
    player.stepAcc += plan * dt;
    if (player.stepAcc > 2.4) { player.stepAcc = 0; sound.step(); }
  }

  // eye height
  const eyeTarget = player.crouch ? PLAYER.eyeCrouch : PLAYER.eyeStand;
  player.eye += (eyeTarget - player.eye) * Math.min(1, dt * 8);

  // lit check
  let lit = false;
  for (const w of warmSpots) {
    if (Math.hypot(player.pos.x - w.x, player.pos.z - w.z) < w.r) { lit = true; break; }
  }
  player.lit = lit;

  // T-virus load: strictly one-way. A lit safe spot only slows the climb,
  // and the tunnel bite adds its own drip for the rest of the night.
  let gain = COLD.drain + (sprinting && wantsMove ? COLD.sprintDrain : 0);
  if (player.crouch) gain *= COLD.crouchMul;
  if (lit) gain *= COLD.lampSlow;
  if (state.bittenByGirl) gain += COLD.biteDrain;
  state.warmth = Math.min(COLD.max, state.warmth + gain * dt);
  updateFeverVoice();

  if (state.warmth >= COLD.freezeAt) turnEnding();

  // heartbeat when the fever climbs
  if (state.warmth > 55 && performance.now() - lastHeart > 900) {
    lastHeart = performance.now();
    sound.heartbeat((state.warmth - 55) / 45);
  }
}

function updateCamera(dt) {
  if (SHOT.active) return;   // a shot owns the lens; do not fight it
  const bob = Math.sin(player.bob) * 0.035 * (player.crouch ? 0.5 : 1);
  const sway = Math.cos(player.bob * 0.5) * 0.02;
  const b = surfBasis(player.pos.z, player.pos.x);
  const base = surfPos(player.pos.z, player.pos.x).addScaledVector(b.up, player.eye + bob);
  base.addScaledVector(b.right, sway);

  camera.up.copy(b.up);
  camera.position.copy(base);

  const dir = b.fwd.clone().applyAxisAngle(b.up, player.yaw);
  dir.multiplyScalar(Math.cos(player.pitch)).addScaledVector(b.up, Math.sin(player.pitch));
  camera.lookAt(base.clone().add(dir));
  // the fever puts a small unsteady tilt in the lens; nothing you can correct
  const fever = Math.max(0, (state.warmth - 55) / 45);
  camera.rotateZ(Math.sin(player.bob * 0.5) * (0.008 + fever * 0.01)
    + Math.sin(performance.now() * 0.0007) * fever * 0.004);

  // the sky light follows the local horizon so the far side of the planet is lit too
  if (moonLight) {
    moonLight.position.copy(surfPos(player.pos.z, player.pos.x))
      .addScaledVector(b.up, 90)
      .addScaledVector(b.fwd, -34);
  }
}

function updateMeters(dt) {
  dom.warmBar.style.width = `${Math.max(0, Math.min(100, state.warmth))}%`;
  dom.warmBar.style.background = state.warmth > 64
    ? 'linear-gradient(90deg,#5a1c1c,#e8553f)'
    : 'linear-gradient(90deg,#3a2026,#8c3a34)';
  dom.stamBar.style.width = `${Math.max(0, state.stamina)}%`;
  dom.vignette.style.opacity = state.warmth > 55 ? String(Math.min(0.75, (state.warmth - 55) / 50)) : '0';
  sound.setWind(0.4 + Math.min(0.6, (player.pos.z - STREET.zStart) / 260));

  if (state.reloading) {
    dom.ammoNow.textContent = '—';
  } else {
    dom.ammoNow.textContent = String(state.ammo);
  }
  dom.ammoRes.textContent = String(state.reserve);

  // no live distance counter — you walk toward the lamps, not toward a number
}

function updatePrompt() {
  const target = nearestInteract();
  if (target) {
    dom.prompt.classList.remove('hidden');
    dom.promptText.textContent = target.label;
  } else {
    dom.prompt.classList.add('hidden');
  }
}

function animateParcel(dt) {
  if (!parcelMesh) return;
  const t = performance.now() * 0.001;
  placeOnGlobe(parcelMesh, parcelS, parcelLat, 0.42 + Math.sin(t * 1.6) * 0.04, t * 0.6);
}

function updateGlows() {
  const t = performance.now() * 0.001;
  for (const s of glows) {
    const base = s.userData.baseOpacity ?? 0.6;
    s.material.opacity = Math.max(0.15, Math.min(1, base + Math.sin(t * 2.1 + s.position.z * 0.7) * 0.1));
  }
}

function updateHorde(dt) {
  const now = performance.now() * 0.001;
  for (const z of infected) {
    if (!z.root.visible) continue;   // this act's street has not been reached yet
    if (z.dead) {
      z.deadT += dt;
      const fall = Math.min(1, z.deadT / 0.6);
      z.body.rotation.x = -1.45 * (fall * fall * (3 - 2 * fall));
      placeOnGlobe(z.root, z.s, z.lat, -0.02, z.heading);
      continue;
    }

    const dx = player.pos.x - z.lat;
    const ds = player.pos.z - z.s;
    const dist = Math.hypot(dx, ds);

    z.biteCd -= dt;
    z.hurt = Math.max(0, z.hurt - dt);
    z.groanCd -= dt;
    if (z.groanCd <= 0) {
      z.groanCd = 4 + Math.random() * 7;
      if (dist < 34) sound.growl(dist / 10 + 1);
    }

    if (dist < ZOMBIE.chaseRange) {
      // not a "SPOTTED" system message — just the thought you have when it turns
      if (z.mode !== 'chase' && !state.alerted) {
        state.alerted = 1;
        dom.alert.textContent = 'it saw me';
        dom.alert.classList.remove('hidden');
        setTimeout(() => { dom.alert.classList.add('hidden'); state.alerted = 0; }, 1600);
      }
      z.mode = 'chase';
    }
    else if (z.mode === 'chase' && dist > ZOMBIE.chaseRange + 8) z.mode = 'wander';

    let step = 0;
    if (z.mode === 'chase') {
      const moveDir = Math.atan2(dx, ds);
      z.heading = turnToward(z.heading, moveDir, dt * 4.5);
      step = ZOMBIE.chaseSpeed * dt;
      if (dist > ZOMBIE.biteRange * 0.8) {
        z.lat += Math.sin(moveDir) * step;
        z.s += Math.cos(moveDir) * step;
      }
    } else {
      z.s += z.dir * ZOMBIE.walkSpeed * dt;
      if (z.s > z.s1) z.dir = -1;
      if (z.s < z.s0) z.dir = 1;
      z.lat += ((Math.sin(z.s * 0.09 + z.phase) * 1.5) - z.lat) * Math.min(1, dt * 1.2);
      const face = z.dir > 0 ? 0 : Math.PI;
      z.heading = turnToward(z.heading, face, dt * 1.6);
      step = ZOMBIE.walkSpeed;
    }

    z.lat = Math.max(-STREET.half + 0.7, Math.min(STREET.half - 0.7, z.lat));
    z.s = Math.max(8, Math.min(226, z.s));
    placeOnGlobe(z.root, z.s, z.lat, 0, z.heading);

    // ragged walk: knees drag, torso rolls, arms hang forward
    const rate = z.mode === 'chase' ? 4.2 : 2.2;
    const swing = Math.sin(now * rate + z.phase);
    const amp = z.mode === 'chase' ? 0.55 : 0.3;
    if (z.bones.LeftUpLeg) z.bones.LeftUpLeg.rotation.x = 0.1 + swing * amp;
    if (z.bones.RightUpLeg) z.bones.RightUpLeg.rotation.x = -0.06 - swing * amp;
    if (z.bones.LeftArm) {
      z.bones.LeftArm.rotation.z = 0.78 + swing * 0.1;
      z.bones.LeftArm.rotation.y = -1.15 - swing * 0.22;
    }
    if (z.bones.RightArm) {
      z.bones.RightArm.rotation.z = -0.78 + swing * 0.1;
      z.bones.RightArm.rotation.y = 1.15 + swing * 0.22;
    }
    z.body.rotation.z = swing * 0.05;
    z.body.rotation.x = z.mode === 'chase' ? 0.12 : 0.04;

    if (dist < ZOMBIE.biteRange && z.biteCd <= 0 && state.phase === 'playing') {
      bite(z);
    }
  }
}

function bite(z) {
  z.biteCd = ZOMBIE.biteCooldown;
  state.bites += 1;
  state.warmth = Math.min(COLD.max, state.warmth + ZOMBIE.biteDamage);
  sound.bite();
  dom.flash.style.opacity = 0.5;
  setTimeout(() => { dom.flash.style.opacity = 0; }, 220);
  if (bloodScreen) {
    bloodScreen.style.opacity = '0.62';
    clearTimeout(biteBloodTimer);
    biteBloodTimer = setTimeout(() => { bloodScreen.style.opacity = '0'; }, 1400);
  }
  dom.alert.textContent = "it's not going to close up";
  dom.alert.classList.remove('hidden');
  setTimeout(() => dom.alert.classList.add('hidden'), 900);
  if (state.warmth >= COLD.max - 0.001) turnEnding();
  // shove the player back a step so the bite reads
  player.vel.x += (player.pos.x - z.lat) * 6;
  player.vel.z += (player.pos.z - z.s) * 6;
}

// ---------------------------------------------------------------- gunplay
const shotDir = new THREE.Vector3();
const chestPos = new THREE.Vector3();

// ---------------------------------------------------------------- blood
const bloodBitMat = new THREE.MeshBasicMaterial({ color: 0x4d0a07, transparent: true, opacity: 0.9 });
const bloodBits = [];
const bloodPools = [];

function sprayBlood(at, count = 9) {
  for (let i = 0; i < count; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.018 + Math.random() * 0.035, 5, 4), bloodBitMat);
    m.position.copy(at);
    m.userData.v = new THREE.Vector3(
      (Math.random() - 0.5) * 1.5,
      0.25 + Math.random() * 0.9,
      (Math.random() - 0.5) * 1.5
    );
    m.userData.t = 0;
    world.add(m);
    bloodBits.push(m);
  }
}

function spawnBloodPool(s, lat) {
  const m = new THREE.Mesh(
    new THREE.CircleGeometry(1, 18),
    new THREE.MeshBasicMaterial({ color: 0x2c0605, transparent: true, opacity: 0, depthWrite: false })
  );
  m.rotation.x = -Math.PI / 2;
  placeOnGlobe(m, s, lat, 0.012, 0);
  m.scale.setScalar(0.35);
  m.userData.t = 0;
  world.add(m);
  bloodPools.push(m);
}

function updateBloodFx(dt) {
  for (let i = bloodBits.length - 1; i >= 0; i--) {
    const b = bloodBits[i];
    b.userData.t += dt;
    b.userData.v.y -= dt * 1.6;
    b.position.addScaledVector(b.userData.v, dt);
    if (b.userData.t > 1.1) {
      world.remove(b);
      bloodBits.splice(i, 1);
    }
  }
  for (const p of bloodPools) {
    p.userData.t += dt;
    const k = Math.min(1, p.userData.t / 1.6);
    p.scale.setScalar(0.35 + k * 0.85);
    p.material.opacity = 0.62 * Math.min(1, p.userData.t / 0.5);
  }
}

function fire() {
  if (state.phase !== 'playing' || state.reloading) return;
  if (state.gunCd > 0) return;
  if (state.ammo <= 0) { sound.dryFire(); startReload(); return; }

  state.ammo -= 1;
  state.shots += 1;
  state.gunCd = GUN.cooldown;
  muzzleT = 0.055;
  sound.shot();
  ejectShell();
  player.pitch = Math.min(1.0, player.pitch + 0.012);

  camera.getWorldDirection(shotDir);
  const origin = camera.position;
  let best = null;
  let bestT = Infinity;

  for (const z of infected) {
    if (z.dead || !z.root.visible) continue;
    const b = surfBasis(z.s, z.lat);
    chestPos.copy(z.root.position).addScaledVector(b.up, 1.1);
    const v = chestPos.clone().sub(origin);
    const t = v.dot(shotDir);
    if (t < 0.6 || t > GUN.range) continue;
    const lateral = Math.sqrt(Math.max(0, v.lengthSq() - t * t));
    if (lateral > 0.42 + t * 0.055) continue;
    if (t < bestT) { bestT = t; best = z; }
  }

  if (best) {
    best.hp -= GUN.damage;
    best.hurt = 0.2;
    sprayBlood(chestPos.clone(), 7);
    sound.splat();
    showHitMark();
    if (best.hp <= 0) killInfected(best);
    else {
      best.mode = 'chase';
      sound.growl(1.4);
    }
  }

  // the whole block hears it
  for (const z of infected) {
    if (z.dead || !z.root.visible) continue;
    if (Math.hypot(player.pos.x - z.lat, player.pos.z - z.s) < 34) z.mode = 'chase';
  }

  updateAmmoDom();
  if (state.ammo === 0) startReload();
}

function killInfected(z) {
  z.dead = true;
  z.deadT = 0;
  state.kills += 1;
  spawnBloodPool(z.s, z.lat);
  sound.thud();
  sound.growl(2.2);
}

function showHitMark() {
  dom.hitMark.classList.add('on');
  setTimeout(() => dom.hitMark.classList.remove('on'), 130);
}

function startReload() {
  if (state.reloading || state.ammo >= GUN.mag || state.reserve <= 0) return;
  state.reloading = true;
  state.reloadT = GUN.reloadTime;
  sound.reload();
}

function finishReload() {
  const need = GUN.mag - state.ammo;
  const take = Math.min(need, state.reserve);
  state.ammo += take;
  state.reserve -= take;
  state.reloading = false;
  state.reloadT = 0;
  updateAmmoDom();
}

function updateAmmoDom() {
  dom.ammoNow.textContent = String(state.ammo);
  dom.ammoRes.textContent = String(state.reserve);
  dom.ammo.style.opacity = state.ammo === 0 ? '0.5' : '1';
}

function turnToward(a, b, step) {
  let diff = b - a;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  return a + Math.max(-step, Math.min(step, diff));
}

function updateSnow(dt) {
  if (!snow) return;
  const pos = snow.geometry.attributes.position;
  const arr = pos.array;
  const t = performance.now() * 0.001;
  for (let i = 0; i < snowState.count; i++) {
    const i3 = i * 3;
    arr[i3 + 1] -= (0.9 + i % 7 * 0.15) * dt * 4.2;
    arr[i3 + 0] += Math.sin(t * 0.6 + i) * dt * 0.9;
    arr[i3 + 2] += dt * 1.3;
    if (arr[i3 + 1] < -1) arr[i3 + 1] += snowState.box.y;
    if (arr[i3 + 0] > snowState.box.x / 2) arr[i3 + 0] -= snowState.box.x;
    if (arr[i3 + 0] < -snowState.box.x / 2) arr[i3 + 0] += snowState.box.x;
    if (arr[i3 + 2] > snowState.box.z / 2) arr[i3 + 2] -= snowState.box.z;
    if (arr[i3 + 2] < -snowState.box.z / 2) arr[i3 + 2] += snowState.box.z;
  }
  pos.needsUpdate = true;

  // keep the snow box standing on the little planet, falling toward its surface
  const b = surfBasis(player.pos.z, player.pos.x);
  snow.position.copy(surfPos(player.pos.z, player.pos.x));
  snow.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(b.right, b.up, b.fwd));
}

boot();
