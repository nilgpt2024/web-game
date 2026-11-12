// LAST PARCEL — outbreak night
// A first-person survival run built on three.js + Polyfork low-poly assets:
// a small spherical planet, an infected street, and a sidearm with 8 rounds.
// Single-level demo: three serum drops, one horde, one way out.

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

const STOPS = [
  { id: 'clinic',  name: 'Corner Clinic',        x: -5.1, z: 56,  line: 'First serum into the corner clinic.' },
  { id: 'ward',    name: 'Ward 3 quarantine door', x:  5.1, z: 124, line: 'Blood samples to the quarantine door at Ward 3.' },
  { id: 'er',      name: 'East evacuation gate',  x:  4.9, z: 196, line: 'Last cooler to the east gate before the vehicles leave.' },
];

// The run is cut into three acts the way a one-night outbreak film is: it
// starts quiet, the cordon arrives, then the block stops being survivable.
const ACTS = [
  {
    no: 'ACT I',
    time: '03:40',
    place: 'ALDER STREET',
    title: 'THE FIRST ONE',
    lines: [
      'The sirens start three blocks east, and then they stop.',
      'There is a man standing in the road who does not step aside for you.',
      'Clinic first. The first serum goes in before the street fills up.',
    ],
    broadcast: '…emergency broadcast: Alder Street is closed at the second block. Do not approach anyone showing symptoms. Repeat: do not approach…',
    horde: 2,
    label: 'ACT I · 03:40',
  },
  {
    no: 'ACT II',
    time: '04:05',
    place: 'THE CORDON',
    title: 'THE LINE MOVES EAST',
    lines: [
      'Sandbags go down at the corner and nobody warns the people inside the line.',
      'The clinic radio repeats one sentence: hold the street, hold the street.',
      'The Ward 3 quarantine door opens once. Blood samples have to be on the step when it does.',
    ],
    broadcast: '…the cordon is now at Third and Alder. If you are inside the line, stay where you are. There is no crossing point…',
    horde: 3,
    label: 'ACT II · 04:05',
  },
  {
    no: 'ACT III',
    time: '04:40',
    place: 'THE BREAK',
    title: 'NOTHING LEFT TO HOLD',
    lines: [
      'The cordon has stopped moving because there is nobody left to move it.',
      'Whatever walks this block now used to live on this block.',
      'The east gate takes one more cooler, and then the last vehicles are gone.',
    ],
    broadcast: '…last convoy is leaving the east gate. There will not be a second pass. If you can hear this, you are on your own…',
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
  drain: 0.3,
  sprintDrain: 0.5,
  lampRegen: 12.0,
  crouchMul: 0.9,
  freezeAt: 100,   // infection reaching 100 turns you; light pushes it back down
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
  ['snow and props', () => buildProps()],
  ['opening the stops', () => buildStops()],
  ['the infected', () => buildHorde()],
  ['loading the sidearm', () => buildWeapon()],
  ['weather', () => buildWeather()],
];

const state = {
  phase: 'loading',      // loading | title | interlude | playing | paused | end
  act: 0,                // 0-based index into ACTS
  warmth: 22,            // infection, 0 = clean, 100 = you turn
  stamina: STAM.max,
  carrying: 0,           // parcels in hand (0/1)
  delivered: 0,
  legIndex: 0,           // which stop is next
  bites: 0,
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
    new THREE.MeshStandardMaterial({ color: 0xa5bacd, roughness: 1, metalness: 0 })
  );
  snowBall.userData.noWrap = true;
  world.add(snowBall);

  const roadS0 = STREET.zStart - 16;
  const roadS1 = STREET.zEnd + 16;

  const asphaltMat = new THREE.MeshStandardMaterial({
    color: 0x242a33, roughness: 0.92, metalness: 0, side: THREE.DoubleSide,
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
    color: 0x8d9dab, roughness: 0.9, metalness: 0, side: THREE.DoubleSide,
  });
  const snowMat = new THREE.MeshStandardMaterial({
    color: 0xdfeaf4, roughness: 1, metalness: 0, side: THREE.DoubleSide,
  });
  for (const side of [-1, 1]) {
    const latA = side < 0 ? -7.6 : 4.3;
    const latB = side < 0 ? -4.3 : 7.6;
    world.add(bandMesh(roadS0, roadS1, latA, latB, 0.08, kerbMat, 300, 10));
    const snowA = side < 0 ? -7.45 : 4.45;
    const snowB = side < 0 ? -4.45 : 7.45;
    world.add(bandMesh(roadS0, roadS1, snowA, snowB, 0.13, snowMat, 300, 10));
  }
}

// --- buildings
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
      b.position.set(side * (big ? 9.6 : 11.4), 0, z);
      world.add(b);
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

  // depot marker: a courier waiting with the first box
  const depotCourier = cloneSkinned(courierProto);
  poseRelaxed(depotCourier);
  depotCourier.position.set(DEPOT.x - 1.5, 0, DEPOT.z - 1.4);
  depotCourier.rotation.y = 0.9;
  world.add(depotCourier);
  const depotLight = new THREE.PointLight(0xffcf9a, 2.2, 14, 2);
  depotLight.position.set(DEPOT.x, 2.6, DEPOT.z);
  world.add(depotLight);
  addGlow(world, DEPOT.x - 1.5, 1.9, DEPOT.z - 1.4, 3.0, GLOW, 0xffdcaa, 0.4);
  warmSpots.push({ x: DEPOT.x, z: DEPOT.z, r: 4.4, strength: COLD.lampRegen });

  // 1. clinic — curb side, away from the driving lane
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

  // 2. ward 3
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

  // 3. ER — ambulance backed into the bay
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
      infected.push(makeInfected(band[0], band[1], INFECTED_LOOKS[(ai * 3 + i) % INFECTED_LOOKS.length], ai + 1));
    }
  });
}

// ---------------------------------------------------------------- sidearm
function buildWeapon() {
  const g = new THREE.Group();
  const steel = new THREE.MeshStandardMaterial({ color: 0x222b31, roughness: 0.55, metalness: 0.6 });
  const slideMat = new THREE.MeshStandardMaterial({ color: 0x3d474e, roughness: 0.42, metalness: 0.7 });
  const gripMat = new THREE.MeshStandardMaterial({ color: 0x12171a, roughness: 0.9, metalness: 0.1 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.062, 0.2), steel);
  body.position.set(0, 0.012, -0.02);
  const slide = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.038, 0.22), slideMat);
  slide.position.set(0, 0.056, -0.03);
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.11, 10), steel);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(0, 0.02, -0.16);
  const grip = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.115, 0.058), gripMat);
  grip.position.set(0, -0.062, 0.062);
  grip.rotation.x = -0.2;
  const guard = new THREE.Mesh(new THREE.TorusGeometry(0.026, 0.005, 6, 12), steel);
  guard.position.set(0, -0.03, 0.02);
  guard.rotation.y = Math.PI / 2;

  g.add(body, slide, barrel, grip, guard);

  muzzle = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture('255,214,150'),
    color: 0xffe6b8,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  muzzle.scale.set(0.5, 0.5, 1);
  muzzle.position.set(0, 0.02, -0.24);
  g.add(muzzle);

  g.scale.setScalar(0.62);
  g.position.set(0.13, -0.185, -0.5);
  g.rotation.set(0.05, 0.32, 0.02);
  g.renderOrder = 2;
  camera.add(g);
  weapon = g;
}

function updateWeapon(dt) {
  if (!weapon) return;
  const t = performance.now() * 0.001;
  const sway = Math.cos(player.bob * 0.5) * 0.006;
  const bob = Math.sin(player.bob) * 0.006;
  const kick = state.gunCd > 0 ? (GUN.cooldown - state.gunCd) / GUN.cooldown : 0;
  weapon.position.set(0.13 + sway, -0.185 + bob - kick * 0.01, -0.5 + kick * 0.04);
  weapon.rotation.set(0.05 + kick * 0.16, 0.32, 0.02 + sway * 0.5);
  if (state.reloading) {
    const p = 1 - state.reloadT / GUN.reloadTime;
    weapon.rotation.x += Math.sin(p * Math.PI) * 0.5;
    weapon.position.y -= Math.sin(p * Math.PI) * 0.09;
  }
  if (muzzleT > 0) {
    muzzleT = Math.max(0, muzzleT - dt);
    muzzle.material.opacity = muzzleT > 0 ? 0.9 : 0;
    muzzle.scale.setScalar(0.34 + Math.random() * 0.24);
  } else if (muzzle) {
    muzzle.material.opacity = 0;
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
  scene.add(new THREE.HemisphereLight(0x50789e, 0x1d2a35, 1.5));
  const moon = new THREE.DirectionalLight(0xa9c6ee, 0.85);
  moon.position.set(-40, 60, -30);
  scene.add(moon);
  moonLight = moon;
  // soft fill so facades facing the player still read as surfaces
  const fill = new THREE.DirectionalLight(0x6f8fb8, 0.34);
  fill.position.set(24, 30, 70);
  scene.add(fill);

  const flashlight = new THREE.SpotLight(0xffeccd, 2.4, 26, Math.PI / 7.5, 0.42, 1.4);
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
  if (location.search.includes('debug')) window.__dbg = { THREE, scene, camera, renderer, world, player, state, STREET, STOPS, DEPOT, infected, fire, startReload };
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

function startGame() {
  sound.init();
  dom.title.classList.add('hidden');
  dom.hud.classList.remove('hidden');
  dom.ammo.classList.remove('hidden');
  state.phase = 'playing';
  state.startedAt = performance.now();
  renderer.domElement.requestPointerLock();
  updateAmmoDom();
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

function pause() {
  state.phase = 'paused';
  dom.pause.classList.remove('hidden');
  if (document.pointerLockElement) document.exitPointerLock();
}

function resume() {
  dom.pause.classList.add('hidden');
  state.phase = 'playing';
  renderer.domElement.requestPointerLock();
  clock.getDelta();
}

// ---------------------------------------------------------------- game flow
function updateObjective() {
  const label = document.querySelector('.obj-label');
  if (label && ACTS[state.act]) label.textContent = ACTS[state.act].label;
  if (state.delivered >= STOPS.length) {
    dom.objText.textContent = 'Through the line. Run complete.';
  } else if (state.carrying === 0) {
    dom.objText.textContent = state.delivered === 0
      ? 'Pick up the first serum vial at the depot behind you.'
      : 'Grab the next sample cooler at the drop point.';
  } else {
    const stop = STOPS[state.legIndex];
    dom.objText.textContent = `${stop.line} ${Math.max(0, Math.round(player.pos.z - stop.z < 0 ? stop.z - player.pos.z : 0))} m ahead.`;
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
    if (state.delivered === 0) targets.push({ x: DEPOT.x, z: DEPOT.z + 0.4, kind: 'pickup', label: 'Take the serum vial' });
    else {
      const stop = STOPS[state.legIndex - 1];
      if (stop) targets.push({ x: stop.x, z: stop.z, kind: 'pickup', label: 'Take the next sample' });
    }
    return closest(targets, 3.2);
  }
  const stop = STOPS[state.legIndex];
  if (!stop) return null;
  return closest([{ x: stop.x, z: stop.z, kind: 'deliver', label: `Deliver to ${stop.name}` }], 3.6);
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
  state.carrying = 0;
  state.delivered += 1;
  state.legIndex = state.delivered;
  state.checkpoint = { x: STOPS[state.delivered - 1].x, z: STOPS[state.delivered - 1].z };
  sound.pickup();
  // parcel marker disappears from the world until the next pickup
  clearParcelMarker();
  setCarried(false);

  if (state.delivered >= STOPS.length) {
    win();
    return;
  }
  // next parcel waits at this stop
  spawnParcelAt(STOPS[state.delivered - 1].x, STOPS[state.delivered - 1].z + 0.3);
  // the drop point is stocked: top the magazine up there
  state.reserve = Math.min(24, state.reserve + 8);
  state.ammo = GUN.mag;
  state.reloading = false;
  state.reloadT = 0;
  updateMeters(0);
  updateObjective();
  flashObjective();
  // the next act of the night starts here, with its own slice of the street
  startAct(state.delivered);
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
  dom.alert.textContent = 'BITTEN — PUSHED BACK';
  dom.alert.classList.remove('hidden');
  setTimeout(() => dom.alert.classList.add('hidden'), 1400);
  respawn();
}

function turned() {
  state.turnings += 1;
  state.warmth = 46;
  state.stamina = STAM.max;
  dom.flash.style.opacity = 0.6;
  setTimeout(() => { dom.flash.style.opacity = 0; }, 300);
  dom.alert.textContent = 'YOU TURNED — YOU CAME ROUND';
  dom.alert.classList.remove('hidden');
  setTimeout(() => dom.alert.classList.add('hidden'), 1500);
  respawn();
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
  // keep the parcel in hand state; re-place a marker if empty-handed
  if (state.carrying === 0 && state.delivered < STOPS.length) {
    const target = state.delivered === 0 ? { x: DEPOT.x, z: DEPOT.z + 0.4 } : STOPS[state.delivered - 1];
    spawnParcelAt(target.x, target.z + 0.4);
  }
  updateObjective();
}

function win() {
  state.phase = 'end';
  if (document.pointerLockElement) document.exitPointerLock();
  const mins = Math.floor((performance.now() - state.startedAt) / 60000);
  const secs = Math.floor(((performance.now() - state.startedAt) % 60000) / 1000);
  dom.endKicker.textContent = '05:12 — EAST GATE';
  dom.endTitle.textContent = 'THROUGH';
  dom.endBody.textContent = 'The gate closes behind you and the driver does not ask what is in the cooler. Behind you Alder Street goes dark block by block, like someone is pulling a switch. Three samples made it out of the outbreak night. The city did not.';
  dom.endStats.innerHTML = `
    <li><span>Time on the street</span><b>${mins}m ${String(secs).padStart(2, '0')}s</b></li>
    <li><span>Acts survived</span><b>${Math.min(state.act + 1, ACTS.length)} / ${ACTS.length}</b></li>
    <li><span>Samples delivered</span><b>${state.delivered} / ${STOPS.length}</b></li>
    <li><span>Infected put down</span><b>${state.kills}</b></li>
    <li><span>Rounds fired</span><b>${state.shots}</b></li>
    <li><span>Bites taken</span><b>${state.bites}</b></li>
    <li><span>Times you turned</span><b>${state.turnings}</b></li>`;
  dom.hud.classList.add('hidden');
  dom.end.classList.remove('hidden');
}

// ---------------------------------------------------------------- update
function tick() {
  const dt = Math.min(clock.getDelta(), 0.05);

  if (state.phase === 'playing') {
    updatePlayer(dt);
    updateHorde(dt);
    updateGun(dt);
    updateMeters(dt);
    updatePrompt();
    updateCamera(dt);
    updateWeapon(dt);
    animateParcel(dt);
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
  }

  updateSnow(dt);
  updateGlows();
  renderer.render(scene, camera);
}

let lastHeart = 0;

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

  // infection
  let gain = COLD.drain + (sprinting && wantsMove ? COLD.sprintDrain : 0);
  if (player.crouch) gain *= COLD.crouchMul;
  if (lit) gain -= COLD.lampRegen;
  state.warmth += (lit ? -COLD.lampRegen * 0.9 : gain) * dt;
  state.warmth = Math.max(0, Math.min(COLD.max, state.warmth));

  if (state.warmth >= COLD.freezeAt) turned();

  // heartbeat when the fever climbs
  if (state.warmth > 62 && performance.now() - lastHeart > 900) {
    lastHeart = performance.now();
    sound.heartbeat((state.warmth - 62) / 38);
  }
}

function updateCamera(dt) {
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
  camera.rotateZ(Math.sin(player.bob * 0.5) * 0.008);

  // the sky light follows the local horizon so the far side of the planet is lit too
  if (moonLight) {
    moonLight.position.copy(surfPos(player.pos.z, player.pos.x))
      .addScaledVector(b.up, 90)
      .addScaledVector(b.fwd, -34);
  }
}

function updateMeters(dt) {
  dom.warmBar.style.width = `${Math.max(0, Math.min(100, state.warmth))}%`;
  dom.warmBar.style.background = state.warmth > 60
    ? 'linear-gradient(90deg,#8fbf6a,#e8553f)'
    : 'linear-gradient(90deg,#4e7a4a,#9fc47a)';
  dom.stamBar.style.width = `${Math.max(0, state.stamina)}%`;
  dom.vignette.style.opacity = state.warmth > 55 ? String(Math.min(0.75, (state.warmth - 55) / 50)) : '0';
  sound.setWind(0.4 + Math.min(0.6, (player.pos.z - STREET.zStart) / 260));

  if (state.reloading) {
    dom.ammoNow.textContent = '—';
  } else {
    dom.ammoNow.textContent = String(state.ammo);
  }
  dom.ammoRes.textContent = String(state.reserve);

  // live distance readout for the current leg
  if (state.carrying && state.legIndex < STOPS.length) {
    const stop = STOPS[state.legIndex];
    const d = Math.max(0, Math.round(Math.hypot(player.pos.x - stop.x, player.pos.z - stop.z)));
    dom.objText.textContent = `${stop.line} ${d} m out.`;
  }
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

    if (dist < ZOMBIE.chaseRange) z.mode = 'chase';
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
  dom.alert.textContent = 'BITTEN';
  dom.alert.classList.remove('hidden');
  setTimeout(() => dom.alert.classList.add('hidden'), 900);
  if (state.warmth >= COLD.max - 0.001) turned();
  // shove the player back a step so the bite reads
  player.vel.x += (player.pos.x - z.lat) * 6;
  player.vel.z += (player.pos.z - z.s) * 6;
}

// ---------------------------------------------------------------- gunplay
const shotDir = new THREE.Vector3();
const chestPos = new THREE.Vector3();

function fire() {
  if (state.phase !== 'playing' || state.reloading) return;
  if (state.gunCd > 0) return;
  if (state.ammo <= 0) { sound.dryFire(); startReload(); return; }

  state.ammo -= 1;
  state.shots += 1;
  state.gunCd = GUN.cooldown;
  muzzleT = 0.055;
  sound.shot();
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
