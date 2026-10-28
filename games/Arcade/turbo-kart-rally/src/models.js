// Agent 4 — Art: procedural kart / driver / item models and character portraits.
// Everything is built from Three.js primitives + CanvasTextures. Static parts are merged per material
// into cached templates (one template per character), so each kart is only ~25 draw calls.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { CHARACTERS } from './config.js';

const PI = Math.PI;
const TAU = PI * 2;
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const damp = (a, b, rate, dt) => a + (b - a) * (1 - Math.exp(-rate * dt));
const fin = (v, d = 0) => (Number.isFinite(v) ? v : d);

// ---------------------------------------------------------------------------------------------
// Colour helpers
// ---------------------------------------------------------------------------------------------
const _c1 = new THREE.Color();
function hexShift(hex, lightMul = 1, satMul = 1, lightAdd = 0) {
  const hsl = {};
  _c1.setHex(hex).getHSL(hsl);
  _c1.setHSL(hsl.h, clamp(hsl.s * satMul, 0, 1), clamp(hsl.l * lightMul + lightAdd, 0, 1));
  return _c1.getHex();
}
function css(hex) { return '#' + (hex >>> 0).toString(16).padStart(6, '0').slice(-6); }
function cssShift(hex, lightMul, satMul = 1, lightAdd = 0) { return css(hexShift(hex, lightMul, satMul, lightAdd)); }

// ---------------------------------------------------------------------------------------------
// Procedural environment map (so paint clearcoat + chrome read well regardless of scene env)
// ---------------------------------------------------------------------------------------------
let _envTex = null;
function envMap() {
  if (_envTex) return _envTex;
  const c = document.createElement('canvas');
  c.width = 512; c.height = 256;
  const g = c.getContext('2d');
  const grd = g.createLinearGradient(0, 0, 0, 256);
  grd.addColorStop(0.0, '#3f78c9');
  grd.addColorStop(0.35, '#9cc8f2');
  grd.addColorStop(0.49, '#f4fbff');
  grd.addColorStop(0.52, '#b9b49a');
  grd.addColorStop(0.7, '#6f7d4e');
  grd.addColorStop(1.0, '#3a4428');
  g.fillStyle = grd;
  g.fillRect(0, 0, 512, 256);
  // soft "studio" highlights / sun for crisp speculars
  const blob = (x, y, rx, ry, a) => {
    const rg = g.createRadialGradient(x, y, 0, x, y, rx);
    rg.addColorStop(0, `rgba(255,255,255,${a})`);
    rg.addColorStop(1, 'rgba(255,255,255,0)');
    g.save(); g.translate(x, y); g.scale(1, ry / rx); g.translate(-x, -y);
    g.fillStyle = rg; g.beginPath(); g.arc(x, y, rx, 0, TAU); g.fill(); g.restore();
  };
  blob(120, 50, 60, 26, 1);
  blob(330, 70, 90, 20, 0.75);
  blob(450, 40, 40, 30, 0.8);
  blob(256, 124, 260, 10, 0.5);
  _envTex = new THREE.CanvasTexture(c);
  _envTex.mapping = THREE.EquirectangularReflectionMapping;
  _envTex.colorSpace = THREE.SRGBColorSpace;
  return _envTex;
}

// ---------------------------------------------------------------------------------------------
// Shared materials (cached by key / colour)
// ---------------------------------------------------------------------------------------------
const _mats = new Map();
function cached(key, make) {
  let m = _mats.get(key);
  if (!m) { m = make(); m.userData.shared = true; _mats.set(key, m); }
  return m;
}
function stdMat(color, rough = 0.55, metal = 0, extra = null, tag = '') {
  return cached(`std:${color}:${rough}:${metal}:${tag}`, () => new THREE.MeshStandardMaterial({
    color, roughness: rough, metalness: metal, envMap: envMap(), envMapIntensity: 0.8, ...(extra || {}),
  }));
}
function glossMat(color, tag = '') {
  return cached(`gloss:${color}:${tag}`, () => new THREE.MeshPhysicalMaterial({
    color, roughness: 0.3, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.08, envMap: envMap(), envMapIntensity: 0.6,
  }));
}
function basicMat(color) { return cached(`basic:${color}`, () => new THREE.MeshBasicMaterial({ color })); }

const MAT = {
  get chassis() { return stdMat(0x2b2f38, 0.5, 0.2); },
  get rubber() { return stdMat(0x1c1d21, 0.8, 0); },
  get seat() { return stdMat(0x23202a, 0.45, 0.0, { envMapIntensity: 0.5 }, 'seat'); },
  get chrome() { return stdMat(0xf2f4f8, 0.12, 1.0, { envMapIntensity: 1.25 }, 'chrome'); },
  get gunmetal() { return stdMat(0x5b626e, 0.32, 0.85, { envMapIntensity: 1.0 }, 'gun'); },
  get gold() { return stdMat(0xffc630, 0.22, 1.0, { envMapIntensity: 1.3 }, 'gold'); },
  get white() { return stdMat(0xffffff, 0.45, 0); },
  get eyeWhite() { return stdMat(0xffffff, 0.2, 0, null, 'eye'); },
  get pupil() { return stdMat(0x0d0d12, 0.15, 0, null, 'pupil'); },
  get shine() { return basicMat(0xffffff); },
  get mouth() { return stdMat(0x7a1f2b, 0.5, 0); },
  get blush() { return stdMat(0xff8a9a, 0.7, 0, { transparent: true, opacity: 0.55, depthWrite: false }, 'blush'); },
  get lens() { return stdMat(0xfffbe6, 0.1, 0, { emissive: 0xfff2b0, emissiveIntensity: 0.9 }, 'lens'); },
  get ivory() { return stdMat(0xfff3d6, 0.45, 0); },
  get cream() { return stdMat(0xfff1dc, 0.6, 0); },
};

// ---------------------------------------------------------------------------------------------
// Canvas textures (cached)
// ---------------------------------------------------------------------------------------------
const _tex = new Map();
function cachedTex(key, draw, w = 256, h = 256, opts = {}) {
  let t = _tex.get(key);
  if (t) return t;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  t = new THREE.CanvasTexture(c);
  t.colorSpace = opts.linear ? THREE.NoColorSpace : THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (opts.repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(opts.repeat[0], opts.repeat[1]); }
  t.userData.shared = true;
  _tex.set(key, t);
  return t;
}

function roundRectPath(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

function tireTexture() {
  return cachedTex('tire', (g, w, h) => {
    g.fillStyle = '#8a8a8a';
    g.fillRect(0, 0, w, h);
    // sidewall bands (darker, smoother)
    g.fillStyle = '#6e6e6e';
    g.fillRect(0, 0, w, h * 0.2);
    g.fillRect(0, h * 0.8, w, h * 0.2);
    // chunky chevron tread
    g.strokeStyle = '#1a1a1a';
    g.lineWidth = 9;
    g.lineCap = 'round';
    const n = 22;
    for (let i = 0; i < n + 1; i++) {
      const x = (i / n) * w;
      g.beginPath();
      g.moveTo(x - 10, h * 0.24);
      g.lineTo(x + 8, h * 0.5);
      g.lineTo(x - 10, h * 0.76);
      g.stroke();
    }
    g.fillStyle = '#2a2a2a';
    g.fillRect(0, h * 0.47, w, h * 0.06);
  }, 512, 128, { linear: false });
}

function hexTexture() {
  return cachedTex('hex', (g, w, h) => {
    g.fillStyle = '#ffffff';
    g.fillRect(0, 0, w, h);
    const r = w / 6;
    const hh = Math.sqrt(3) * r;
    g.strokeStyle = '#9a9a9a';
    g.lineWidth = 7;
    for (let col = -1; col < 8; col++) {
      for (let row = -1; row < 5; row++) {
        const cx = col * 1.5 * r;
        const cy = row * hh + (col % 2 ? hh / 2 : 0);
        g.beginPath();
        for (let k = 0; k < 6; k++) {
          const a = (k / 6) * TAU;
          const px = cx + Math.cos(a) * r * 0.92, py = cy + Math.sin(a) * r * 0.92;
          if (k === 0) g.moveTo(px, py); else g.lineTo(px, py);
        }
        g.closePath();
        g.stroke();
      }
    }
  }, 256, Math.round(3 * Math.sqrt(3) * 256 / 6), { repeat: [4, 2] });
}

function numberDecalTex(num, color, accent) {
  return cachedTex(`num:${num}:${color}:${accent}`, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.beginPath(); g.arc(w / 2, h / 2, w / 2 - 4, 0, TAU);
    g.fillStyle = '#ffffff'; g.fill();
    g.lineWidth = 12; g.strokeStyle = css(accent === 0xffffff ? 0x222831 : accent); g.stroke();
    g.beginPath(); g.arc(w / 2, h / 2, w / 2 - 16, 0, TAU);
    g.lineWidth = 4; g.strokeStyle = css(color); g.stroke();
    g.fillStyle = css(hexShift(color, 0.8));
    g.font = `900 ${Math.round(w * 0.62)}px "Arial Black", "Lilita One", Arial, sans-serif`;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(String(num), w / 2, h / 2 + w * 0.04);
  }, 128, 128);
}

function nameDecalTex(name, color, accent) {
  return cachedTex(`name:${name}:${color}:${accent}`, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    const txt = String(name || '').toUpperCase();
    g.font = `italic 900 ${Math.round(h * 0.7)}px "Arial Black", "Lilita One", Arial, sans-serif`;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.lineJoin = 'round';
    g.lineWidth = 10; g.strokeStyle = 'rgba(15,15,25,0.9)';
    g.strokeText(txt, w / 2, h / 2 + 3);
    const lum = new THREE.Color(accent).getHSL({}).l;
    g.fillStyle = css(accent);
    if (Math.abs(lum - new THREE.Color(color).getHSL({}).l) < 0.12) g.fillStyle = '#ffffff';
    g.fillText(txt, w / 2, h / 2 + 3);
    // speed streaks
    g.fillStyle = 'rgba(255,255,255,0.65)';
    for (let i = 0; i < 3; i++) g.fillRect(6, h * 0.3 + i * h * 0.16, 22 - i * 6, 4);
  }, 256, 64);
}

function emblemTex(letter, color) {
  return cachedTex(`emb:${letter}:${color}`, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.beginPath(); g.arc(w / 2, h / 2, w / 2 - 3, 0, TAU);
    g.fillStyle = '#ffffff'; g.fill();
    g.fillStyle = css(color);
    g.font = `900 ${Math.round(w * 0.66)}px "Arial Black", "Lilita One", Arial, sans-serif`;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(letter, w / 2, h / 2 + w * 0.05);
  }, 128, 128);
}

function decalMat(tex) {
  return cached(`decal:${tex.uuid}`, () => new THREE.MeshStandardMaterial({
    map: tex, alphaTest: 0.5, roughness: 0.3, metalness: 0, envMap: envMap(), envMapIntensity: 0.6,
    polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
  }));
}

// ---------------------------------------------------------------------------------------------
// Geometry helpers
// ---------------------------------------------------------------------------------------------
const V3 = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
const Y_UP = V3(0, 1, 0);
const Z_FWD = V3(0, 0, 1);
function M(p = [0, 0, 0], r = [0, 0, 0], s = 1) {
  const sv = typeof s === 'number' ? V3(s, s, s) : V3(s[0], s[1], s[2]);
  return new THREE.Matrix4().compose(V3(p[0], p[1], p[2]), new THREE.Quaternion().setFromEuler(new THREE.Euler(r[0], r[1], r[2], r[3] || 'XYZ')), sv);
}
function MQ(p, q, s = 1) {
  const sv = typeof s === 'number' ? V3(s, s, s) : V3(s[0], s[1], s[2]);
  return new THREE.Matrix4().compose(p.isVector3 ? p : V3(p[0], p[1], p[2]), q, sv);
}
function qFromTo(a, b) { return new THREE.Quaternion().setFromUnitVectors(a.clone().normalize(), b.clone().normalize()); }
// Oriented so +Z points along dir (for things sitting on a surface facing outward).
function faceDir(dir, extraRollZ = 0) {
  const q = qFromTo(Z_FWD, dir);
  if (extraRollZ) q.multiply(new THREE.Quaternion().setFromAxisAngle(Z_FWD, extraRollZ));
  return q;
}
function dirYP(yaw, pitch) { return V3(Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch)); }

function roundedShape(points, radius) {
  const s = new THREE.Shape();
  const n = points.length;
  const P = points.map((p) => new THREE.Vector2(p[0], p[1]));
  for (let i = 0; i < n; i++) {
    const prev = P[(i - 1 + n) % n], cur = P[i], next = P[(i + 1) % n];
    const r = Array.isArray(radius) ? radius[i] : radius;
    const d1 = prev.clone().sub(cur), d2 = next.clone().sub(cur);
    const rr = Math.min(r, d1.length() * 0.45, d2.length() * 0.45);
    const a = cur.clone().add(d1.normalize().multiplyScalar(rr));
    const b = cur.clone().add(d2.normalize().multiplyScalar(rr));
    if (i === 0) s.moveTo(a.x, a.y); else s.lineTo(a.x, a.y);
    s.quadraticCurveTo(cur.x, cur.y, b.x, b.y);
  }
  s.closePath();
  return s;
}

class Builder {
  constructor() { this.parts = new Map(); this.stack = [new THREE.Matrix4()]; }
  top() { return this.stack[this.stack.length - 1]; }
  push(m) { this.stack.push(this.top().clone().multiply(m)); return this; }
  pop() { if (this.stack.length > 1) this.stack.pop(); return this; }
  add(geo, material, m = null) {
    let g = geo.index ? geo.toNonIndexed() : geo.clone();
    geo.dispose();
    for (const k of Object.keys(g.attributes)) if (k !== 'position' && k !== 'normal' && k !== 'uv') g.deleteAttribute(k);
    if (!g.attributes.normal) g.computeVertexNormals();
    if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    g.morphAttributes = {};
    g.clearGroups();
    g.applyMatrix4(m ? this.top().clone().multiply(m) : this.top());
    const key = typeof material === 'string' ? 'slot:' + material : material.uuid;
    let e = this.parts.get(key);
    if (!e) { e = { material, geos: [] }; this.parts.set(key, e); }
    e.geos.push(g);
    return this;
  }
  build() {
    const out = [];
    for (const e of this.parts.values()) {
      const merged = mergeGeometries(e.geos, false);
      e.geos.forEach((g) => g.dispose());
      if (merged) { merged.computeBoundingSphere(); merged.userData.shared = true; out.push({ material: e.material, geometry: merged }); }
    }
    this.parts.clear();
    return out;
  }
}

function instantiate(parts, slots, cast = true) {
  const g = new THREE.Group();
  for (const p of parts) {
    const mat = typeof p.material === 'string' ? slots[p.material] : p.material;
    const mesh = new THREE.Mesh(p.geometry, mat);
    mesh.castShadow = cast;
    mesh.receiveShadow = false;
    g.add(mesh);
  }
  return g;
}

const sphere = (r = 1, w = 24, h = 16, ...rest) => new THREE.SphereGeometry(r, w, h, ...rest);

// ---------------------------------------------------------------------------------------------
// Character styles
// ---------------------------------------------------------------------------------------------
const STYLE = {
  blaze:  { hair: 0x6b3b1c, eye: 0x2f6fe0, mustache: 'small', gloves: true },
  zippy:  { hair: 0x5a3316, eye: 0x2e9d4a, freckles: true, gloves: true, tuft: true },
  bella:  { hair: 0xffd54f, eye: 0x2e86de, longHair: true, lashes: true, gloves: true, lips: true },
  toadly: { eye: 0x1b1b24, gloves: true, vest: true },
  rex:    { eye: 0xff8f00, snout: 'dino', gloves: false, tail: true, brows: 'dino' },
  grumbo: { hair: 0x2c1d12, eye: 0x6a1b9a, mustache: 'big', brows: 'grumpy', wide: 1.18, bigNose: true, gloves: true },
  koopz:  { eye: 0x1565c0, snout: 'beak', gloves: false },
  dotty:  { hair: 0x6d4028, eye: 0x8e24aa, pigtails: true, lashes: true, gloves: true, bowColor: 0xff4f9a },
};
function styleFor(ch) {
  const s = STYLE[ch.id];
  if (s) return s;
  const hat = ch.hat || 'cap';
  return { hair: 0x5a3a20, eye: 0x335577, gloves: hat !== 'horns' && hat !== 'shell', snout: hat === 'horns' ? 'dino' : hat === 'shell' ? 'beak' : null };
}

function normChar(character) {
  const c = character || {};
  return {
    id: c.id || 'racer',
    name: c.name || 'Racer',
    color: Number.isFinite(c.color) ? c.color : 0xe53935,
    accent: Number.isFinite(c.accent) ? c.accent : 0xffffff,
    skin: Number.isFinite(c.skin) ? c.skin : 0xffcc99,
    hat: c.hat || 'cap',
  };
}

// ---------------------------------------------------------------------------------------------
// Kart dimensions
// ---------------------------------------------------------------------------------------------
const K = {
  rearR: 0.33, rearW: 0.3, rearX: 0.66, rearZ: -0.7,
  frontR: 0.28, frontW: 0.25, frontX: 0.64, frontZ: 0.74,
  wheelC: V3(0, 0.92, 0.28), wheelTilt: 0.75, wheelRad: 0.17,
  hip: V3(0, 0.5, -0.36),
  neck: V3(0, 0.55, 0.02),
  headR: 0.3,
  exhaustTilt: 0.35,
};

// ---------------------------------------------------------------------------------------------
// Wheels
// ---------------------------------------------------------------------------------------------
function tireGeometry(R, W) {
  const ri = R * 0.6, c = Math.min(0.085, W * 0.32);
  const pts = [];
  pts.push(new THREE.Vector2(ri, -W * 0.44));
  pts.push(new THREE.Vector2(R - c, -W / 2));
  for (let i = 1; i < 5; i++) { const a = -PI / 2 + (i / 5) * (PI / 2); pts.push(new THREE.Vector2(R - c + c * Math.cos(a), -W / 2 + c + c * Math.sin(a))); }
  for (let i = 0; i <= 4; i++) { const y = -W / 2 + c + (i / 4) * (W - 2 * c); pts.push(new THREE.Vector2(R + Math.sin((i / 4) * PI) * 0.008, y)); }
  for (let i = 1; i < 5; i++) { const a = (i / 5) * (PI / 2); pts.push(new THREE.Vector2(R - c + c * Math.cos(a), W / 2 - c + c * Math.sin(a))); }
  pts.push(new THREE.Vector2(R - c, W / 2));
  pts.push(new THREE.Vector2(ri, W * 0.44));
  const g = new THREE.LatheGeometry(pts, 36);
  g.rotateZ(PI / 2); // axis Y -> X
  return g;
}

function tireMat() {
  return cached('tire', () => {
    const t = tireTexture();
    return new THREE.MeshStandardMaterial({ color: 0x3a3a3e, map: t, bumpMap: t, bumpScale: 3, roughness: 0.88, metalness: 0, envMap: envMap(), envMapIntensity: 0.4 });
  });
}

const _wheelTpl = new Map();
function wheelTemplate(R, W, rimColor, spokeColor) {
  const key = `${R}:${W}:${rimColor}:${spokeColor}`;
  let t = _wheelTpl.get(key);
  if (t) return t;
  const b = new Builder();
  b.add(tireGeometry(R, W), tireMat());
  const ri = R * 0.6;
  // rim barrel
  b.add(new THREE.CylinderGeometry(ri * 1.01, ri * 1.01, W * 0.86, 28, 1, false), glossMat(rimColor, 'rim'), M([0, 0, 0], [0, 0, PI / 2]));
  // dark recess ring on outer face
  b.add(new THREE.TorusGeometry(ri * 0.82, ri * 0.1, 8, 28), MAT.chassis, M([W * 0.43, 0, 0], [0, PI / 2, 0]));
  // 5-spoke star
  const pts = [];
  for (let i = 0; i < 10; i++) { const a = (i / 10) * TAU + PI / 2; const r = i % 2 ? ri * 0.36 : ri * 0.86; pts.push([Math.cos(a) * r, Math.sin(a) * r]); }
  const spoke = new THREE.ExtrudeGeometry(roundedShape(pts, 0.02), { depth: 0.03, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 2, curveSegments: 4 });
  b.add(spoke, glossMat(spokeColor, 'spoke'), M([W * 0.4, 0, 0], [0, PI / 2, 0]));
  // chrome hub + lug nuts
  b.add(sphere(ri * 0.32, 16, 10), MAT.chrome, M([W * 0.46, 0, 0], [0, 0, 0], [0.55, 1, 1]));
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * TAU;
    b.add(new THREE.CylinderGeometry(0.018, 0.018, 0.03, 6), MAT.chrome, M([W * 0.45, Math.cos(a) * ri * 0.52, Math.sin(a) * ri * 0.52], [0, 0, PI / 2]));
  }
  // inner hub face
  b.add(new THREE.CircleGeometry(ri, 20), MAT.chassis, M([-W * 0.43, 0, 0], [0, -PI / 2, 0]));
  t = b.build();
  _wheelTpl.set(key, t);
  return t;
}

// ---------------------------------------------------------------------------------------------
// Kart chassis template (per character)
// ---------------------------------------------------------------------------------------------
function buildChassis(ch) {
  const b = new Builder();
  const ext = (shape, depth, bev) => new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: bev, bevelSize: bev, bevelSegments: 4, curveSegments: 10 });

  // Floor pan (top-view outline extruded downward)
  {
    const s = roundedShape([[-0.42, -1.02], [0.42, -1.02], [0.45, -0.2], [0.45, 0.5], [0.34, 1.08], [-0.34, 1.08], [-0.45, 0.5], [-0.45, -0.2]], 0.14);
    const g = ext(s, 0.1, 0.045);
    g.rotateX(PI / 2);
    b.add(g, 'paint', M([0, 0.38, 0]));
    // skid plate
    const s2 = roundedShape([[-0.36, -0.95], [0.36, -0.95], [0.38, 0.5], [0.28, 1.0], [-0.28, 1.0], [-0.38, 0.5]], 0.1);
    const g2 = ext(s2, 0.05, 0.02);
    g2.rotateX(PI / 2);
    b.add(g2, MAT.chassis, M([0, 0.25, 0]));
  }
  // Nose cowl (side-profile extruded across width)
  {
    const s = roundedShape([[0.18, 0.36], [1.16, 0.36], [1.2, 0.47], [1.02, 0.6], [0.56, 0.74], [0.18, 0.77]], [0.05, 0.08, 0.1, 0.18, 0.2, 0.06]);
    const depth = 0.72;
    const g = ext(s, depth, 0.07);
    g.rotateY(-PI / 2);
    g.translate(depth / 2, 0, 0);
    b.add(g, 'paint');
    // dashboard cowl lip
    b.add(new RoundedBoxGeometry(0.62, 0.1, 0.22, 2, 0.045), MAT.chassis, M([0, 0.83, 0.3], [0.2, 0, 0]));
    // accent racing stripe along the nose top
    const st = roundedShape([[0.2, 0.0], [1.02, 0.0], [1.02, 0.001], [0.2, 0.001]], 0);
    void st;
  }
  // Accent stripes over the hood (thin raised strips following the profile)
  for (const x of [-0.14, 0.14]) {
    const path = new THREE.CatmullRomCurve3([V3(x, 0.842, 0.2), V3(x, 0.84, 0.45), V3(x, 0.8, 0.66), V3(x, 0.74, 0.86), V3(x, 0.675, 1.02), V3(x, 0.57, 1.18)]);
    b.add(new THREE.TubeGeometry(path, 24, 0.035, 6, false), 'accent', M([0, 0, 0], [0, 0, 0], [1.6, 0.35, 1]));
  }
  // Front bumper (accent), with rubber end caps
  b.add(new THREE.CapsuleGeometry(0.075, 0.9, 6, 14), 'accent', M([0, 0.3, 1.26], [0, 0, PI / 2]));
  for (const x of [-0.46, 0.46]) b.add(new THREE.CylinderGeometry(0.035, 0.035, 0.2, 8), MAT.chassis, M([x * 0.7, 0.3, 1.17], [PI / 2, 0, 0]));
  // Headlights
  for (const x of [-0.24, 0.24]) {
    b.add(new THREE.TorusGeometry(0.075, 0.022, 8, 20), MAT.chrome, M([x, 0.5, 1.235], [0.35, 0, 0]));
    b.add(sphere(0.07, 16, 10), MAT.lens, M([x, 0.5, 1.225], [0.35, 0, 0], [1, 1, 0.55]));
  }
  // Side pods (paint) with accent stripe + air intakes
  for (const sx of [-1, 1]) {
    b.add(new THREE.CapsuleGeometry(0.16, 0.43, 8, 18), 'paint', M([sx * 0.55, 0.43, 0.05], [PI / 2, 0, 0], [1.1, 1, 1]));
    b.add(new THREE.CapsuleGeometry(0.045, 0.5, 4, 10), 'accent', M([sx * 0.6, 0.555, 0.05], [PI / 2, 0, 0]));
    b.add(new RoundedBoxGeometry(0.06, 0.12, 0.08, 2, 0.02), MAT.chassis, M([sx * 0.7, 0.42, 0.44]));
  }
  // Seat (bucket)
  b.add(new RoundedBoxGeometry(0.66, 0.62, 0.15, 3, 0.07), MAT.seat, M([0, 0.76, -0.62], [-0.28, 0, 0]));
  b.add(new RoundedBoxGeometry(0.62, 0.13, 0.52, 3, 0.05), MAT.seat, M([0, 0.47, -0.32]));
  for (const sx of [-1, 1]) b.add(new RoundedBoxGeometry(0.1, 0.4, 0.5, 2, 0.045), MAT.seat, M([sx * 0.33, 0.62, -0.42], [-0.15, 0, 0]));
  // headrest accent piping
  b.add(new THREE.CapsuleGeometry(0.04, 0.5, 4, 10), 'accent', M([0, 1.06, -0.71], [-0.28, 0, PI / 2]));
  // Rear engine block
  b.add(new RoundedBoxGeometry(0.74, 0.34, 0.44, 3, 0.06), MAT.gunmetal, M([0, 0.55, -0.88]));
  for (let i = 0; i < 4; i++) b.add(new RoundedBoxGeometry(0.66, 0.025, 0.4, 1, 0.01), MAT.chassis, M([0, 0.43 + i * 0.07, -0.89]));
  for (const x of [-0.18, 0.18]) {
    b.add(new THREE.CylinderGeometry(0.1, 0.11, 0.12, 16), MAT.chrome, M([x, 0.77, -0.86]));
    b.add(new THREE.CylinderGeometry(0.075, 0.075, 0.02, 16), MAT.chassis, M([x, 0.835, -0.86]));
  }
  b.add(new THREE.TorusGeometry(0.1, 0.03, 8, 20), MAT.chrome, M([0, 0.8, -0.72], [PI / 2 - 0.2, 0, 0]));
  // Twin exhausts
  const a = K.exhaustTilt;
  const dir = V3(0, Math.sin(a), -Math.cos(a));
  for (const x of [-0.22, 0.22]) {
    const start = V3(x, 0.52, -0.98);
    const L = 0.36;
    const mid = start.clone().addScaledVector(dir, L / 2);
    const q = qFromTo(Y_UP, dir);
    b.add(new THREE.CylinderGeometry(0.065, 0.065, L, 16, 1, true), MAT.chrome, MQ(mid, q));
    const tip = start.clone().addScaledVector(dir, L);
    b.add(new THREE.CylinderGeometry(0.09, 0.07, 0.08, 16, 1, true), MAT.chrome, MQ(tip.clone().addScaledVector(dir, -0.03), q));
    b.add(new THREE.TorusGeometry(0.08, 0.014, 6, 16), MAT.chrome, MQ(tip.clone().addScaledVector(dir, 0.01), qFromTo(Z_FWD, dir)));
    b.add(new THREE.CircleGeometry(0.068, 16), MAT.rubber, MQ(tip.clone().addScaledVector(dir, -0.02), qFromTo(Z_FWD, dir)));
  }
  // Spoiler
  {
    const wing = roundedShape([[-0.18, -0.02], [0.18, -0.03], [0.2, 0.02], [-0.16, 0.05]], 0.02);
    const wg = new THREE.ExtrudeGeometry(wing, { depth: 1.26, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 3, curveSegments: 6 });
    wg.translate(0, 0, -0.63);
    wg.rotateY(-PI / 2); // shape x (chord) -> z, depth -> x
    b.add(wg, 'paint', M([0, 1.02, -1.08], [0.1, 0, 0]));
    for (const sx of [-1, 1]) {
      b.add(new RoundedBoxGeometry(0.05, 0.3, 0.44, 2, 0.02), 'accent', M([sx * 0.66, 1.0, -1.08]));
      b.add(new THREE.CylinderGeometry(0.03, 0.03, 0.34, 8), MAT.chassis, M([sx * 0.26, 0.86, -1.02], [-0.25, 0, 0]));
    }
  }
  // Rear fenders over the rear wheels (paint) + accent trim
  for (const sx of [-1, 1]) {
    const fr = K.rearR + 0.07;
    b.add(new THREE.CylinderGeometry(fr, fr, K.rearW + 0.08, 24, 1, true, 0.25, 2.35), 'paint', M([sx * K.rearX, K.rearR, K.rearZ], [0, 0, PI / 2]));
    b.add(new THREE.TorusGeometry(fr, 0.022, 6, 24, 2.35), 'accent', M([sx * (K.rearX + sx * (K.rearW / 2 + 0.04)), K.rearR, K.rearZ], [0, -PI / 2, 0.25, 'YXZ']));
  }
  // Rear bumper
  b.add(new THREE.CapsuleGeometry(0.065, 0.62, 4, 12), MAT.chassis, M([0, 0.3, -1.13], [0, 0, PI / 2]));
  // Steering column + wheel base
  {
    const top = K.wheelC, base = V3(0, 0.6, 0.62);
    const d = top.clone().sub(base);
    b.add(new THREE.CylinderGeometry(0.03, 0.035, d.length(), 10), MAT.chassis, MQ(base.clone().add(top).multiplyScalar(0.5), qFromTo(Y_UP, d)));
  }
  return b.build();
}

// Steering wheel (rotating part)
function buildSteeringWheel(ch, st) {
  const b = new Builder();
  b.add(new THREE.TorusGeometry(K.wheelRad, 0.028, 10, 28), MAT.rubber);
  for (let i = 0; i < 3; i++) {
    const a = PI / 2 + (i / 3) * TAU + PI;
    b.add(new THREE.BoxGeometry(K.wheelRad, 0.035, 0.02), MAT.chassis, M([Math.cos(a) * K.wheelRad * 0.5, Math.sin(a) * K.wheelRad * 0.5, 0], [0, 0, a]));
  }
  b.add(new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16), 'accent', M([0, 0, -0.005], [PI / 2, 0, 0]));
  // gloves / hands
  const handMat = st.gloves ? MAT.white : stdMat(ch.skin, 0.6);
  for (const ph of [0.35, PI - 0.35]) {
    const p = V3(Math.cos(ph) * K.wheelRad, Math.sin(ph) * K.wheelRad, -0.03);
    b.add(sphere(0.064, 16, 12), handMat, M([p.x, p.y, p.z], [0, 0, 0], [1, 1, 0.85]));
    b.add(sphere(0.03, 10, 8), handMat, M([p.x * 0.8, p.y + 0.045, p.z - 0.035]));
  }
  return b.build();
}

// Driver torso (lean group, pivot at hips)
function buildTorso(ch, st) {
  const b = new Builder();
  const wide = st.wide || 1;
  const pants = stdMat(hexShift(ch.color, 0.55, 0.9), 0.65);
  // torso
  b.add(sphere(0.27, 28, 20), 'paint', M([0, 0.3, 0], [0, 0, 0], [1.05 * wide, 1.12, 0.92]));
  // collar
  b.add(new THREE.TorusGeometry(0.12, 0.045, 8, 20), 'accent', M([0, 0.56, 0.0], [PI / 2 - 0.15, 0, 0]));
  // belly patch / buttons
  if (ch.hat === 'horns') b.add(sphere(0.2, 20, 14), stdMat(0xf3e2a0, 0.6), M([0, 0.25, 0.1], [0, 0, 0], [0.9 * wide, 1.05, 0.7]));
  else {
    b.add(sphere(0.035, 10, 8), MAT.gold, M([0.1, 0.36, 0.235]));
    b.add(sphere(0.035, 10, 8), MAT.gold, M([-0.1, 0.36, 0.235]));
    // overall/vest panel in accent-ish darker tone
    b.add(sphere(0.25, 24, 16, 0, TAU, PI * 0.45, PI * 0.55), pants, M([0, 0.3, 0], [0, 0, 0], [1.08 * wide, 1.14, 0.95]));
  }
  if (st.vest) b.add(sphere(0.275, 24, 16, PI * 0.15, PI * 0.7, 0.3, PI * 0.45), MAT.white, M([0, 0.3, 0], [0, 0, 0], [1.08, 1.13, 0.95]));
  // shoulders
  for (const sx of [-1, 1]) b.add(sphere(0.1, 14, 10), 'paint', M([sx * 0.25 * wide, 0.44, 0.02]));
  // legs toward pedals
  for (const sx of [-1, 1]) {
    const hipP = V3(sx * 0.13, 0.08, 0.05), knee = V3(sx * 0.16, 0.2, 0.45), foot = V3(sx * 0.14, 0.02, 0.8);
    const seg = (a0, a1, r) => { const d = a1.clone().sub(a0); b.add(new THREE.CapsuleGeometry(r, d.length(), 4, 10), pants, MQ(a0.clone().add(a1).multiplyScalar(0.5), qFromTo(Y_UP, d))); };
    seg(hipP, knee, 0.095);
    seg(knee, foot, 0.08);
    b.add(sphere(0.09, 12, 8), stdMat(0x5a3a22, 0.6), M([foot.x, foot.y + 0.02, foot.z + 0.04], [0, 0, 0], [1, 0.8, 1.3]));
  }
  // turtle shell on back
  if (ch.hat === 'shell') {
    const shellMat = cached(`shellback:${ch.color}`, () => new THREE.MeshPhysicalMaterial({ color: ch.color, map: hexTexture(), roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.1, envMap: envMap(), envMapIntensity: 0.9 }));
    b.add(sphere(0.33, 28, 14, 0, TAU, 0, PI / 2), shellMat, M([0, 0.32, -0.16], [-PI / 2, 0, 0], [1.02, 0.62, 1.12]));
    b.add(new THREE.TorusGeometry(0.335, 0.05, 10, 32), stdMat(ch.accent, 0.5), M([0, 0.32, -0.16], [0, 0, 0], [1.02, 1.12, 1]));
  }
  // dino back spikes + tail
  if (ch.hat === 'horns') {
    const spikeMat = glossMat(ch.accent, 'spike');
    for (let i = 0; i < 3; i++) {
      const y = 0.5 - i * 0.14, z = -0.22 - i * 0.02;
      b.add(new THREE.ConeGeometry(0.06, 0.14, 10), spikeMat, M([0, y, z], [-1.2, 0, 0]));
    }
  }
  if (st.tail) {
    const pts = [V3(0.15, 0.05, -0.2), V3(0.36, 0.08, -0.4), V3(0.52, 0.22, -0.5), V3(0.62, 0.38, -0.5)];
    const curve = new THREE.CatmullRomCurve3(pts);
    const tg = new THREE.TubeGeometry(curve, 16, 0.07, 10, false);
    // taper the tube
    const pos = tg.attributes.position;
    const segs = 16, rad = 10;
    for (let i = 0; i <= segs; i++) {
      const t = i / segs, P = curve.getPointAt(t), s = 1.3 - t * 0.9;
      for (let j = 0; j <= rad; j++) {
        const idx = i * (rad + 1) + j;
        pos.setXYZ(idx, P.x + (pos.getX(idx) - P.x) * s, P.y + (pos.getY(idx) - P.y) * s, P.z + (pos.getZ(idx) - P.z) * s);
      }
    }
    tg.computeVertexNormals();
    b.add(tg, 'paint');
    b.add(new THREE.ConeGeometry(0.05, 0.12, 8), glossMat(ch.accent, 'spike'), M([0.6, 0.45, -0.5], [0, 0, -0.4]));
  }
  // pigtails / long hair hang from the head group (see head) — nothing here
  return b.build();
}

function addEye(b, dir, R, st, opts = {}) {
  const pos = dir.clone().multiplyScalar(R * 0.93);
  const s = opts.scale || 1;
  b.push(MQ(pos, faceDir(dir, opts.roll || 0), s));
  b.add(sphere(1, 20, 14), MAT.eyeWhite, M([0, 0, 0], [0, 0, 0], [0.078, 0.1, 0.045]));
  b.add(sphere(1, 16, 12), stdMat(st.eye, 0.25, 0, null, 'iris'), M([0, -0.008, 0.024], [0, 0, 0], [0.056, 0.07, 0.03]));
  b.add(sphere(1, 12, 10), MAT.pupil, M([0, -0.01, 0.037], [0, 0, 0], [0.03, 0.042, 0.02]));
  b.add(sphere(0.016, 8, 6), MAT.shine, M([0.018, 0.022, 0.05]));
  b.add(sphere(0.008, 6, 4), MAT.shine, M([-0.016, -0.03, 0.05]));
  if (st.lashes) {
    const side = opts.side || 1;
    for (let i = 0; i < 2; i++) {
      const a = PI / 2 - side * (0.55 + i * 0.4);
      b.add(new THREE.CapsuleGeometry(0.008, 0.028, 2, 6), MAT.pupil, M([Math.cos(a) * 0.088, Math.sin(a) * 0.108, 0.012], [0, 0, a - PI / 2]));
    }
  }
  b.pop();
}

// Head (pivot at neck); head centre at (0, 0.28, 0)
function buildHead(ch, st) {
  const b = new Builder();
  const R = K.headR;
  const skin = stdMat(ch.skin, 0.6, 0, { envMapIntensity: 0.35, emissive: hexShift(ch.skin, 0.5, 1.1), emissiveIntensity: 0.18 }, 'skin');
  b.push(M([0, 0.28, 0]));
  b.add(sphere(R, 36, 26), skin);
  // neck
  b.add(new THREE.CylinderGeometry(0.1, 0.12, 0.14, 12), skin, M([0, -0.27, 0]));

  const eyeYaw = 0.34, eyePitch = st.snout === 'dino' ? 0.34 : st.snout ? 0.2 : 0.06;
  addEye(b, dirYP(eyeYaw, eyePitch), R, st, { side: 1, roll: 0.06 });
  addEye(b, dirYP(-eyeYaw, eyePitch), R, st, { side: -1, roll: -0.06 });

  // brows
  if (st.brows === 'grumpy' || st.brows === 'dino') {
    const bm = st.brows === 'dino' ? stdMat(hexShift(ch.skin, 0.6), 0.6) : stdMat(st.hair || 0x222222, 0.7);
    for (const sx of [-1, 1]) {
      const d = dirYP(sx * 0.33, eyePitch + 0.24);
      b.add(new THREE.CapsuleGeometry(0.034, 0.11, 4, 8), bm, MQ(d.clone().multiplyScalar(R * 1.0), faceDir(d, sx * (PI / 2 - 0.35))));
    }
  }

  if (st.snout === 'dino') {
    b.add(sphere(1, 28, 18), skin, M([0, -0.07, 0.2], [0.1, 0, 0], [0.24, 0.17, 0.2]));
    for (const sx of [-1, 1]) b.add(sphere(0.022, 8, 6), MAT.pupil, M([sx * 0.07, -0.02, 0.385]));
    // grin
    b.add(new THREE.TorusGeometry(0.11, 0.016, 6, 20, PI * 0.8), MAT.mouth, M([0, -0.06, 0.345], [0.35, 0, PI + PI * 0.1], [1, 0.55, 1]));
    b.add(new THREE.ConeGeometry(0.018, 0.04, 6), MAT.white, M([0.055, -0.115, 0.37], [PI - 0.3, 0, 0]));
    b.add(new THREE.ConeGeometry(0.018, 0.04, 6), MAT.white, M([-0.055, -0.115, 0.37], [PI - 0.3, 0, 0]));
  } else if (st.snout === 'beak') {
    b.add(sphere(1, 24, 16), skin, M([0, -0.08, 0.2], [0.15, 0, 0], [0.19, 0.13, 0.17]));
    b.add(new THREE.TorusGeometry(0.1, 0.014, 6, 18, PI * 0.8), MAT.mouth, M([0, -0.07, 0.3], [0.45, 0, PI + PI * 0.1], [1, 0.6, 1]));
    for (const sx of [-1, 1]) b.add(sphere(0.016, 8, 6), MAT.pupil, M([sx * 0.05, -0.02, 0.365]));
  } else {
    // nose
    const nr = st.bigNose ? 0.085 : 0.05;
    const nd = dirYP(0, -0.12);
    b.add(sphere(nr, 16, 12), stdMat(hexShift(ch.skin, 0.94, 1.2), 0.55), MQ(nd.clone().multiplyScalar(R * 0.98), faceDir(nd), [1, 0.9, 1]));
    // smile
    const md = dirYP(0, -0.4);
    b.add(new THREE.TorusGeometry(0.065, 0.014, 6, 16, PI), st.lips ? stdMat(0xd81b60, 0.4) : MAT.mouth, MQ(md.clone().multiplyScalar(R * 0.96), faceDir(md, PI), [1, 0.8, 1]));
    // ears
    for (const sx of [-1, 1]) b.add(sphere(0.07, 12, 10), skin, M([sx * R * 0.95, -0.02, 0.0], [0, 0, 0], [0.55, 1, 0.8]));
  }
  // blush
  for (const sx of [-1, 1]) {
    const d = dirYP(sx * 0.62, -0.18);
    b.add(new THREE.CircleGeometry(0.05, 16), MAT.blush, MQ(d.clone().multiplyScalar(R * 1.004), faceDir(d)));
  }
  if (st.freckles) {
    const fm = stdMat(hexShift(ch.skin, 0.72, 1.3), 0.7);
    for (const [yw, pt] of [[0.5, -0.1], [0.58, -0.05], [0.63, -0.14], [-0.5, -0.1], [-0.58, -0.05], [-0.63, -0.14]]) {
      const d = dirYP(yw, pt);
      b.add(new THREE.CircleGeometry(0.012, 8), fm, MQ(d.clone().multiplyScalar(R * 1.004), faceDir(d)));
    }
  }
  // mustache
  if (st.mustache) {
    const big = st.mustache === 'big';
    const mm = stdMat(st.hair || 0x3b2a1a, 0.8);
    for (const sx of [-1, 1]) {
      const d = dirYP(sx * (big ? 0.2 : 0.15), -0.25);
      const p = d.clone().multiplyScalar(R * (big ? 1.0 : 0.99));
      b.add(sphere(1, 14, 10), mm, MQ(p, faceDir(d, sx * (big ? -0.5 : -0.3)), big ? [0.12, 0.05, 0.05] : [0.075, 0.035, 0.035]));
      if (big) b.add(sphere(1, 10, 8), mm, MQ(p.clone().add(V3(sx * 0.1, 0.03, -0.02)), faceDir(d, sx * 0.6), [0.06, 0.035, 0.035]));
    }
  }

  // hair
  if (st.hair !== undefined && ch.hat !== 'mushroom') {
    const hm = stdMat(st.hair, 0.55, 0, { envMapIntensity: 0.6 }, 'hair');
    // back of head
    b.add(sphere(R * 1.045, 28, 18, PI * 0.95, PI * 1.1, 0, PI * 0.68), hm);
    if (ch.hat === 'crown' || ch.hat === 'bow') {
      // top & fringe
      b.add(sphere(R * 1.05, 28, 14, 0, TAU, 0, PI * 0.28), hm);
      for (let i = -2; i <= 2; i++) {
        const d = dirYP(i * 0.28, 0.62);
        b.add(sphere(1, 10, 8), hm, MQ(d.clone().multiplyScalar(R * 0.96), faceDir(d, i * 0.2), [0.09, 0.07, 0.06]));
      }
    }
    if (st.longHair) {
      b.add(sphere(1, 24, 18), hm, M([0, -0.2, -0.16], [0.25, 0, 0], [0.31, 0.36, 0.17]));
      for (const sx of [-1, 1]) b.add(sphere(1, 16, 12), hm, M([sx * 0.25, -0.18, -0.02], [0, 0, sx * 0.15], [0.09, 0.24, 0.12]));
      // curled tips
      b.add(new THREE.TorusGeometry(0.2, 0.06, 10, 24), hm, M([0, -0.48, -0.13], [PI / 2 - 0.3, 0, 0], [1.2, 1, 1]));
    }
    if (st.pigtails) {
      for (const sx of [-1, 1]) {
        b.add(sphere(0.12, 16, 12), hm, M([sx * 0.33, 0.02, -0.08], [0, 0, 0], [0.9, 1.25, 0.9]));
        b.add(sphere(0.05, 10, 8), stdMat(st.bowColor || ch.accent, 0.4), M([sx * 0.28, 0.13, -0.06]));
      }
    }
    if (st.tuft) {
      for (let i = 0; i < 3; i++) b.add(new THREE.ConeGeometry(0.05, 0.14, 8), hm, M([(i - 1) * 0.08, 0.02 - Math.abs(i - 1) * 0.02, -0.3], [-1.9, 0, (i - 1) * 0.4]));
    }
    if (ch.hat === 'cap') {
      // sideburns
      for (const sx of [-1, 1]) b.add(sphere(1, 10, 8), hm, M([sx * 0.27, 0.02, 0.06], [0, 0, 0], [0.05, 0.1, 0.07]));
    }
  }

  // ------------------------------------------------ hats
  const hat = ch.hat;
  if (hat === 'cap') {
    b.add(sphere(R * 1.07, 32, 16, 0, TAU, 0, PI * 0.5), 'paint', M([0, 0.035, -0.01], [-0.12, 0, 0], [1, 0.9, 1.02]));
    b.add(new THREE.TorusGeometry(R * 1.05, 0.02, 6, 32), 'paint', M([0, 0.035, -0.01], [PI / 2 - 0.12, 0, 0]));
    // brim
    const brim = new THREE.CylinderGeometry(0.22, 0.22, 0.03, 28, 1, false, -PI / 2, PI);
    b.add(brim, 'paint', M([0, 0.07, 0.22], [0.14, 0, 0], [1.08, 1, 1.3]));
    b.add(sphere(0.035, 10, 8), 'paint', M([0, R * 0.99, -0.03]));
  } else if (hat === 'crown') {
    const gold = MAT.gold;
    b.add(new THREE.CylinderGeometry(0.17, 0.15, 0.1, 24, 1, true), gold, M([0, 0.32, -0.02], [-0.12, 0, 0]));
    b.add(new THREE.CylinderGeometry(0.15, 0.15, 0.02, 24), gold, M([0, 0.28, -0.02], [-0.12, 0, 0]));
    b.push(M([0, 0.32, -0.02], [-0.12, 0, 0]));
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * TAU;
      b.add(new THREE.ConeGeometry(0.035, 0.1, 8), gold, M([Math.sin(a) * 0.16, 0.1, Math.cos(a) * 0.16]));
      b.add(sphere(0.022, 8, 6), gold, M([Math.sin(a) * 0.16, 0.16, Math.cos(a) * 0.16]));
    }
    b.add(sphere(0.035, 12, 8), stdMat(0xe91e63, 0.1, 0.2, { emissive: 0x880033, emissiveIntensity: 0.5 }, 'gem'), M([0, 0.0, 0.168], [0, 0, 0], [1, 1, 0.6]));
    b.add(sphere(0.025, 12, 8), stdMat(0x29b6f6, 0.1, 0.2, { emissive: 0x004466, emissiveIntensity: 0.5 }, 'gem'), M([0.11, 0.0, 0.125], [0, 0.7, 0], [1, 1, 0.6]));
    b.add(sphere(0.025, 12, 8), stdMat(0x29b6f6, 0.1, 0.2, { emissive: 0x004466, emissiveIntensity: 0.5 }, 'gem'), M([-0.11, 0.0, 0.125], [0, -0.7, 0], [1, 1, 0.6]));
    b.pop();
  } else if (hat === 'mushroom') {
    const capM = glossMat(0xffffff, 'mushcap');
    const cy = 0.15, cr = 0.5, sy = 0.74;
    b.add(sphere(cr, 40, 20, 0, TAU, 0, PI * 0.56), capM, M([0, cy, 0], [0, 0, 0], [1, sy, 1]));
    b.add(new THREE.CircleGeometry(cr * Math.sin(PI * 0.56) * 0.99, 32), MAT.cream, M([0, cy + cr * sy * Math.cos(PI * 0.56) + 0.004, 0], [PI / 2, 0, 0]));
    const spot = glossMat(ch.color, 'spot');
    const spots = [[0, 0], [0.9, 0.3], [0.9, 0.3 + TAU / 5], [0.9, 0.3 + 2 * TAU / 5], [0.9, 0.3 + 3 * TAU / 5], [0.9, 0.3 + 4 * TAU / 5], [1.45, 0.3 + TAU / 10], [1.45, 0.3 + TAU / 10 + PI]];
    for (const [th, ph] of spots) {
      const x = cr * Math.sin(th) * Math.cos(ph), y = cr * sy * Math.cos(th), z = cr * Math.sin(th) * Math.sin(ph);
      const n = V3(x / (cr * cr), y / (cr * sy * cr * sy), z / (cr * cr)).normalize();
      const size = th === 0 ? 0.15 : th > 1.2 ? 0.1 : 0.13;
      b.add(sphere(1, 16, 10), spot, MQ(V3(x, y + cy, z), faceDir(n), [size, size, 0.03]));
    }
  } else if (hat === 'horns') {
    for (const sx of [-1, 1]) {
      const hd = V3(sx * 0.6, 0.75, -0.1).normalize();
      b.add(new THREE.ConeGeometry(0.07, 0.24, 14), MAT.ivory, MQ(hd.clone().multiplyScalar(R * 0.95 + 0.1), qFromTo(Y_UP, V3(sx * 0.55, 1, -0.2))));
    }
    const spikeMat = glossMat(ch.accent, 'spike');
    for (let i = 0; i < 4; i++) {
      const th = 0.25 + i * 0.42;
      const d = V3(0, Math.cos(th), -Math.sin(th));
      b.add(new THREE.ConeGeometry(0.075 - i * 0.006, 0.2, 10), spikeMat, MQ(d.clone().multiplyScalar(R * 0.95), qFromTo(Y_UP, d)));
    }
  } else if (hat === 'shell') {
    const helm = cached(`helm:${ch.color}`, () => new THREE.MeshPhysicalMaterial({ color: ch.color, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.08, envMap: envMap(), envMapIntensity: 0.9 }));
    b.add(sphere(R * 1.09, 32, 16, 0, TAU, 0, PI * 0.46), helm, M([0, 0.03, -0.02], [-0.18, 0, 0]));
    b.add(new THREE.TorusGeometry(R * 1.07, 0.03, 8, 32), stdMat(ch.accent, 0.5), M([0, 0.07, -0.01], [PI / 2 - 0.18, 0, 0]));
    // goggles on helmet
    for (const sx of [-1, 1]) {
      const d = dirYP(sx * 0.3, 0.7);
      b.add(new THREE.TorusGeometry(0.055, 0.018, 8, 16), MAT.chrome, MQ(d.clone().multiplyScalar(R * 1.1), faceDir(d)));
      b.add(new THREE.CircleGeometry(0.05, 16), stdMat(0x80deea, 0.05, 0.3, { emissive: 0x114455, emissiveIntensity: 0.4 }, 'goggle'), MQ(d.clone().multiplyScalar(R * 1.11), faceDir(d)));
    }
    b.add(new THREE.CylinderGeometry(0.02, 0.02, 0.1, 6), MAT.chassis, M([0, R * 1.02, -0.05], [0, 0, PI / 2]));
  } else if (hat === 'bow') {
    const bowM = glossMat(st.bowColor || ch.accent, 'bow');
    b.push(M([0, 0.26, -0.1], [-0.5, 0, 0]));
    for (const sx of [-1, 1]) {
      b.add(sphere(1, 20, 14), bowM, M([sx * 0.13, 0.02, 0], [0, 0, sx * 0.4], [0.14, 0.1, 0.06]));
      b.add(sphere(0.022, 8, 6), MAT.white, M([sx * 0.15, 0.04, 0.055]));
      b.add(sphere(0.018, 8, 6), MAT.white, M([sx * 0.09, -0.01, 0.055]));
    }
    b.add(sphere(0.055, 14, 10), bowM, M([0, 0, 0.01]));
    b.pop();
  }
  b.pop();
  return b.build();
}

const _kartTpl = new Map();
function kartTemplate(ch) {
  const key = `${ch.id}:${ch.color}:${ch.accent}:${ch.skin}:${ch.hat}`;
  let t = _kartTpl.get(key);
  if (t) return t;
  const st = styleFor(ch);
  t = {
    chassis: buildChassis(ch),
    steer: buildSteeringWheel(ch, st),
    torso: buildTorso(ch, st),
    head: buildHead(ch, st),
    st,
  };
  _kartTpl.set(key, t);
  return t;
}

let _armGeo = null;
function armGeo() {
  if (!_armGeo) { _armGeo = new THREE.CapsuleGeometry(0.068, 0.46, 4, 12); _armGeo.userData.shared = true; }
  return _armGeo;
}
const ARM_LEN = 0.46 + 0.068 * 2;

function charIndex(ch) {
  const i = CHARACTERS.findIndex((c) => c.id === ch.id);
  return i >= 0 ? i + 1 : 1 + (Math.abs([...String(ch.id)].reduce((a, c) => a * 31 + c.charCodeAt(0), 7)) % 9);
}

// ---------------------------------------------------------------------------------------------
// createKartModel
// ---------------------------------------------------------------------------------------------
export function createKartModel(character) {
  const ch = normChar(character);
  const tpl = kartTemplate(ch);
  const st = tpl.st;

  // per-kart materials (so star mode emissive does not leak to other karts)
  const paint = new THREE.MeshPhysicalMaterial({
    color: ch.color, roughness: 0.32, metalness: 0.12, clearcoat: 1, clearcoatRoughness: 0.06,
    envMap: envMap(), envMapIntensity: 0.55, emissive: 0x000000, side: THREE.DoubleSide,
  });
  const accent = new THREE.MeshPhysicalMaterial({
    color: ch.accent, roughness: 0.35, metalness: 0.1, clearcoat: 0.8, clearcoatRoughness: 0.1,
    envMap: envMap(), envMapIntensity: 0.55, emissive: 0x000000,
  });
  const slots = { paint, accent };
  const ownMats = [paint, accent];

  const root = new THREE.Group();
  root.name = `kartModel-${ch.id}`;
  const visual = new THREE.Group();   // shrink scale lives here? (root is scaled by setShrunk)
  root.add(visual);
  const body = new THREE.Group();     // suspended body (bob / roll / pitch)
  visual.add(body);

  body.add(instantiate(tpl.chassis, slots));

  // decals
  const num = charIndex(ch);
  const numMat = decalMat(numberDecalTex(num, ch.color, ch.accent));
  const decalGeo = cachedGeo('decalCircle', () => new THREE.CircleGeometry(0.15, 28));
  const hoodDecal = new THREE.Mesh(decalGeo, numMat);
  hoodDecal.position.set(0, 0.748, 0.8);
  hoodDecal.rotation.set(-PI / 2 + 0.29, 0, PI);
  body.add(hoodDecal);
  for (const sx of [-1, 1]) {
    const d = new THREE.Mesh(decalGeo, numMat);
    d.scale.setScalar(0.9);
    d.position.set(sx * 0.432, 0.56, 0.62);
    d.rotation.set(0, sx * PI / 2, 0);
    body.add(d);
  }
  const nameMat = decalMat(nameDecalTex(ch.name, ch.color, ch.accent));
  const nameDecal = new THREE.Mesh(cachedGeo('decalName', () => new THREE.PlaneGeometry(1.1, 0.275)), nameMat);
  // wing top: wing centre y=1.02, rotated x=0.1, top surface ~ +0.05
  nameDecal.position.set(0, 1.02 + 0.058, -1.08 + 0.005);
  nameDecal.rotation.set(-PI / 2 + 0.1, 0, PI, 'XYZ');
  body.add(nameDecal);

  // Steering wheel
  const steerBase = new THREE.Group();
  steerBase.position.copy(K.wheelC);
  steerBase.rotation.x = K.wheelTilt;
  const steerSpin = new THREE.Group();
  steerBase.add(steerSpin);
  steerSpin.add(instantiate(tpl.steer, slots));
  body.add(steerBase);

  // Driver
  const driver = new THREE.Group();
  driver.position.copy(K.hip);
  body.add(driver);
  driver.add(instantiate(tpl.torso, slots));
  const head = new THREE.Group();
  head.position.copy(K.neck);
  driver.add(head);
  head.add(instantiate(tpl.head, slots));
  if (ch.hat === 'cap') {
    const emb = new THREE.Mesh(cachedGeo('emblem', () => new THREE.CircleGeometry(0.085, 24)), decalMat(emblemTex(ch.name.charAt(0).toUpperCase(), ch.color)));
    const d = dirYP(0, 0.62);
    const R = K.headR * 1.07;
    // cap dome: centre (0, 0.28+0.035, -0.01), scale y 0.9, tilted -0.12
    const local = V3(d.x * R, d.y * R * 0.9, d.z * R * 1.02).applyAxisAngle(V3(1, 0, 0), -0.12);
    emb.position.set(0, 0.28 + 0.035, -0.01).add(local).addScaledVector(d, 0.006);
    emb.quaternion.copy(faceDir(V3(0, d.y * 0.8, d.z).normalize().applyAxisAngle(V3(1, 0, 0), -0.12)));
    head.add(emb);
  }

  // Arms (dynamic: shoulder -> hand on the steering wheel)
  const arms = [];
  for (const sx of [1, -1]) {
    const mesh = new THREE.Mesh(armGeo(), paint);
    mesh.castShadow = true;
    body.add(mesh);
    arms.push({ mesh, sx, shoulder: V3(sx * 0.25 * (st.wide || 1), 0.44, 0.02), hand: V3(Math.cos(sx > 0 ? 0.35 : PI - 0.35) * K.wheelRad * 0.95, Math.sin(0.35) * K.wheelRad - 0.02, -0.06) });
  }

  // Wheels
  const wheels = [];
  const makeWheel = (name, x, z, R, W, front) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, R, z);
    const flip = new THREE.Group();
    if (x < 0) flip.rotation.y = PI; // outer face toward -X on the right side
    const spin = new THREE.Group();
    pivot.add(flip); flip.add(spin);
    spin.add(instantiate(wheelTemplate(R, W, ch.accent, ch.color), slots));
    visual.add(pivot);
    wheels.push({ pivot, spin, R, front, dirSign: x < 0 ? -1 : 1, baseY: R });
    const a = new THREE.Object3D();
    a.name = name;
    a.position.set(x, 0, z);
    root.add(a);
    return a;
  };
  const anchors = {
    wheelRL: makeWheel('wheelRL', K.rearX, K.rearZ, K.rearR, K.rearW, false),
    wheelRR: makeWheel('wheelRR', -K.rearX, K.rearZ, K.rearR, K.rearW, false),
    wheelFL: makeWheel('wheelFL', K.frontX, K.frontZ, K.frontR, K.frontW, true),
    wheelFR: makeWheel('wheelFR', -K.frontX, K.frontZ, K.frontR, K.frontW, true),
  };
  {
    const a = K.exhaustTilt;
    const dir = V3(0, Math.sin(a), -Math.cos(a));
    for (const [name, x] of [['exhaustL', 0.22], ['exhaustR', -0.22]]) {
      const o = new THREE.Object3D();
      o.name = name;
      o.position.copy(V3(x, 0.52, -0.98).addScaledVector(dir, 0.4));
      root.add(o);
      anchors[name] = o;
    }
    const ih = new THREE.Object3D();
    ih.name = 'itemHold';
    ih.position.set(0, 0.6, -1.6);
    root.add(ih);
    anchors.itemHold = ih;
  }

  // ---- animation state
  const S = {
    wheelRot: 0, steer: 0, prevSpeed: 0, accel: 0,
    pitch: 0, pitchV: 0, roll: 0, rollV: 0, bob: 0, bobV: 0,
    lean: 0, headYaw: 0, headRoll: 0, wasAir: false, starOn: false,
    lookTimer: 4 + Math.random() * 8, lookPhase: 0, lookSide: 1, dizzy: 0, time: 0,
  };
  const _v = V3(), _h = V3(), _d = V3(), _m = new THREE.Matrix4();
  const starCol = new THREE.Color();

  function updateArms() {
    driver.updateMatrix();
    steerBase.updateMatrix();
    steerSpin.updateMatrix();
    _m.multiplyMatrices(steerBase.matrix, steerSpin.matrix);
    for (const arm of arms) {
      _v.copy(arm.shoulder).applyMatrix4(driver.matrix);
      _h.copy(arm.hand).applyMatrix4(_m);
      _d.subVectors(_h, _v);
      const len = _d.length();
      if (len < 1e-4) continue;
      arm.mesh.position.addVectors(_v, _h).multiplyScalar(0.5);
      arm.mesh.quaternion.setFromUnitVectors(Y_UP, _d.multiplyScalar(1 / len));
      const s = len / ARM_LEN;
      arm.mesh.scale.set(1, s, 1);
    }
  }
  updateArms();

  function animate(o = {}) {
    try {
      const dt = clamp(fin(o.dt, 1 / 60), 0, 0.1);
      const speed = fin(o.speed, 0);
      const steer = clamp(fin(o.steer, 0), -1, 1);
      const drifting = !!o.drifting;
      const driftDir = fin(o.driftDir, 0) >= 0 ? 1 : -1;
      const airborne = !!o.airborne;
      const spin = clamp(fin(o.spin, 0), 0, 1);
      const time = fin(o.time, S.time + dt);
      S.time = time;
      const sf = clamp(Math.abs(speed) / 38, 0, 1.6);

      S.steer = damp(S.steer, steer, 14, dt);

      // wheels
      S.wheelRot = (S.wheelRot + (speed * dt) / K.rearR) % (TAU * 1000);
      const steerAng = -S.steer * 0.42 * (drifting ? 0.6 : 1);
      for (const w of wheels) {
        const ang = S.wheelRot * (K.rearR / w.R);
        w.spin.rotation.x = ang * w.dirSign;
        if (w.front) w.pivot.rotation.y = steerAng;
      }

      // longitudinal accel for pitch
      const acc = dt > 0 ? (speed - S.prevSpeed) / dt : 0;
      S.prevSpeed = speed;
      S.accel = damp(S.accel, clamp(acc, -80, 80), 6, dt);

      let tPitch = -clamp(S.accel * 0.0018, -0.05, 0.05);
      if (o.boosting) tPitch -= 0.06;
      if (airborne) tPitch -= 0.04;
      let tRoll = -S.steer * sf * 0.05;
      if (drifting) tRoll = -driftDir * 0.06 * Math.min(1, sf + 0.3);

      // springs (slightly underdamped for a bouncy, toy-like feel)
      const k = 140, c = 13;
      S.pitchV += ((tPitch - S.pitch) * k - S.pitchV * c) * dt; S.pitch += S.pitchV * dt;
      S.rollV += ((tRoll - S.roll) * k - S.rollV * c) * dt; S.roll += S.rollV * dt;

      // suspension bob: road buzz + landing compression
      if (S.wasAir && !airborne) S.bobV -= 1.4 + Math.min(1.5, sf);
      S.wasAir = airborne;
      const buzz = airborne ? 0.03 : (Math.sin(time * 23.0) * 0.5 + Math.sin(time * 37.0) * 0.5) * 0.006 * Math.min(1, sf * 1.5);
      S.bobV += ((buzz - S.bob) * 220 - S.bobV * 14) * dt; S.bob += S.bobV * dt;
      S.bob = clamp(S.bob, -0.12, 0.08);

      body.position.y = S.bob;
      body.rotation.set(S.pitch, 0, S.roll);

      // driver lean + head
      const tLean = drifting ? driftDir * 0.22 : S.steer * 0.14 * Math.min(1, sf + 0.35);
      S.lean = damp(S.lean, tLean, 8, dt);

      // dizzy wobble while spun out (the Kart rotates the body group itself)
      S.dizzy = damp(S.dizzy, spin > 0 && spin < 1 ? 1 : 0, spin > 0 ? 12 : 3, dt);
      const dz = S.dizzy;
      driver.rotation.set(Math.sin(time * 9) * 0.06 * dz, Math.sin(time * 7) * 0.15 * dz, S.lean + Math.sin(time * 12) * 0.12 * dz);

      // occasional glance back over the shoulder (charm)
      S.lookTimer -= dt;
      let lookYaw = 0;
      if (S.lookTimer <= 0 && S.lookPhase <= 0) {
        if (Math.abs(steer) < 0.25 && !drifting && sf > 0.3 && !airborne) { S.lookPhase = 1.1; S.lookSide = Math.random() < 0.5 ? -1 : 1; }
        S.lookTimer = 7 + Math.random() * 10;
      }
      if (S.lookPhase > 0) {
        S.lookPhase -= dt;
        const p = 1 - S.lookPhase / 1.1;
        lookYaw = Math.sin(clamp(p, 0, 1) * PI) * 1.5 * S.lookSide;
        if (drifting || Math.abs(steer) > 0.6) S.lookPhase = 0;
      }
      S.headYaw = damp(S.headYaw, -S.steer * 0.38 + lookYaw + Math.sin(time * 10) * 0.5 * dz, 10, dt);
      S.headRoll = damp(S.headRoll, S.steer * 0.1 + (drifting ? driftDir * 0.1 : 0), 8, dt);
      head.rotation.set(-0.04 + (airborne ? -0.1 : 0) + (o.boosting ? -0.06 : 0), S.headYaw, S.headRoll, 'YXZ');

      // steering wheel
      steerSpin.rotation.z = S.steer * 1.0;
      updateArms();

      // star: rainbow emissive cycling
      const star = !!o.star;
      if (star) {
        const hue = (time * 1.6) % 1;
        starCol.setHSL(hue, 1, 0.5);
        paint.color.copy(starCol);
        paint.emissive.copy(starCol);
        paint.emissiveIntensity = 0.35 + Math.sin(time * 20) * 0.1;
        starCol.setHSL((hue + 0.5) % 1, 1, 0.5);
        accent.color.copy(starCol);
        accent.emissive.copy(starCol);
        accent.emissiveIntensity = 0.35;
        S.starOn = true;
      } else if (S.starOn) {
        paint.emissive.setHex(0); accent.emissive.setHex(0);
        paint.color.setHex(ch.color); accent.color.setHex(ch.accent);
        paint.emissiveIntensity = 1; accent.emissiveIntensity = 1;
        S.starOn = false;
      }
    } catch (err) {
      if (!S.warned) { console.warn('[models] animate failed', err); S.warned = true; }
    }
  }

  function setShrunk(scale) {
    const s = fin(scale, 1);
    root.scale.setScalar(s > 0 ? s : 1);
  }

  function dispose() {
    try { root.parent?.remove(root); } catch { /* ignore */ }
    for (const m of ownMats) m.dispose();
    ownMats.length = 0;
  }

  root.traverse((o) => { if (o.isMesh) { o.castShadow = true; } });
  // decals are thin; no need to cast
  hoodDecal.castShadow = false; nameDecal.castShadow = false;

  return { root, anchors, animate, setShrunk, dispose, character: ch, parts: { body, driver, head, wheels: wheels.map((w) => w.pivot) } };
}

const _geos = new Map();
function cachedGeo(key, make) {
  let g = _geos.get(key);
  if (!g) { g = make(); g.userData.shared = true; _geos.set(key, g); }
  return g;
}

// ---------------------------------------------------------------------------------------------
// Items
// ---------------------------------------------------------------------------------------------
const _itemTpl = new Map();
function itemTemplate(type, make) {
  let t = _itemTpl.get(type);
  if (!t) { t = make(); _itemTpl.set(type, t); }
  return t;
}

function itemBoxFaceTex() {
  return cachedTex('itemboxface', (g, w, h) => {
    g.clearRect(0, 0, w, h);
    // faint inner fill
    g.fillStyle = 'rgba(255,255,255,0.10)';
    g.fillRect(0, 0, w, h);
    // rainbow frame
    const grd = g.createLinearGradient(0, 0, w, h);
    ['#ff1744', '#ff9100', '#ffea00', '#00e676', '#00b0ff', '#d500f9', '#ff1744'].forEach((c, i, a) => grd.addColorStop(i / (a.length - 1), c));
    g.strokeStyle = grd;
    g.lineWidth = 26;
    roundRectPath(g, 13, 13, w - 26, h - 26, 22);
    g.stroke();
    g.strokeStyle = 'rgba(255,255,255,0.85)';
    g.lineWidth = 4;
    roundRectPath(g, 28, 28, w - 56, h - 56, 14);
    g.stroke();
    // "?" with glow
    g.font = `900 ${Math.round(h * 0.62)}px "Arial Black", "Lilita One", Arial, sans-serif`;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.shadowColor = 'rgba(255,255,255,1)';
    g.shadowBlur = 24;
    g.lineWidth = 14; g.lineJoin = 'round';
    const qg = g.createLinearGradient(0, h * 0.2, 0, h * 0.8);
    qg.addColorStop(0, '#ff9100'); qg.addColorStop(1, '#ff1744');
    g.strokeStyle = qg;
    g.strokeText('?', w / 2, h / 2 + h * 0.04);
    g.shadowBlur = 0;
    g.fillStyle = '#ffffff';
    g.fillText('?', w / 2, h / 2 + h * 0.04);
  }, 256, 256);
}

function buildItemBox() {
  const size = 1.5;
  const tex = itemBoxFaceTex();
  const shell = cached('itembox:shell', () => new THREE.MeshPhysicalMaterial({
    color: 0xffffff, map: tex, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.22,
    transparent: true, opacity: 1, roughness: 0.08, metalness: 0.0, clearcoat: 1, clearcoatRoughness: 0.05,
    iridescence: 1, iridescenceIOR: 1.8, iridescenceThicknessRange: [200, 900],
    envMap: envMap(), envMapIntensity: 1.3, side: THREE.DoubleSide, depthWrite: false,
  }));
  const coreMat = cached('itembox:core', () => new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }));
  const glassGeo = cachedGeo('itembox:geo', () => new RoundedBoxGeometry(size, size, size, 4, 0.16));
  const coreGeo = cachedGeo('itembox:core', () => new THREE.IcosahedronGeometry(0.42, 1));
  const haloGeo = cachedGeo('itembox:halo', () => new THREE.SphereGeometry(0.62, 20, 14));
  const haloMat = cached('itembox:halo', () => new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false }));

  const root = new THREE.Group();
  root.name = 'item_box';
  const box = new THREE.Mesh(glassGeo, shell);
  box.renderOrder = 2;
  box.castShadow = false;
  const core = new THREE.Mesh(coreGeo, coreMat);
  const halo = new THREE.Mesh(haloGeo, haloMat);
  root.add(halo, core, box);
  // Animated rainbow hue on shared materials (cheap & idempotent per frame)
  const col = new THREE.Color();
  core.onBeforeRender = () => {
    const t = performance.now() / 1000;
    col.setHSL((t * 0.35) % 1, 1, 0.6);
    coreMat.color.copy(col);
    haloMat.color.setHSL((t * 0.35 + 0.3) % 1, 1, 0.6);
    shell.emissive.setHSL((t * 0.2) % 1, 0.8, 0.6);
    core.rotation.set(t * 1.3, t * 1.7, 0);
    core.updateMatrix();
    core.matrixWorld.multiplyMatrices(root.matrixWorld, core.matrix);
  };
  return root;
}

function buildShellParts(color, spiky) {
  const b = new Builder();
  const R = 0.46;
  const dome = cached(`shell:${color}`, () => new THREE.MeshPhysicalMaterial({
    color, map: hexTexture(), roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.05, envMap: envMap(), envMapIntensity: 1.0,
  }));
  const base = 0.17;
  b.add(sphere(R, 36, 18, 0, TAU, 0, PI / 2), dome, M([0, base, 0], [0, 0, 0], [1, 0.78, 1]));
  b.add(new THREE.TorusGeometry(R, 0.075, 12, 40), glossMat(0xffffff, 'shellrim'), M([0, base, 0], [PI / 2, 0, 0]));
  b.add(sphere(R * 0.98, 32, 10, 0, TAU, PI / 2, PI / 2), MAT.cream, M([0, base, 0], [0, 0, 0], [1, 0.32, 1]));
  if (spiky) {
    const spikeMat = glossMat(0xffffff, 'spike');
    const dirs = [[0, 0]];
    for (let i = 0; i < 6; i++) dirs.push([0.85, (i / 6) * TAU]);
    for (const [th, ph] of dirs) {
      const n = V3(Math.sin(th) * Math.cos(ph), Math.cos(th) * 0.78, Math.sin(th) * Math.sin(ph));
      const p = V3(n.x * R, n.y * R + base, n.z * R);
      const nn = V3(n.x / R, n.y / (0.78 * 0.78 * R), n.z / R).normalize();
      b.add(new THREE.ConeGeometry(0.07, 0.2, 12), spikeMat, MQ(p.clone().addScaledVector(nn, 0.06), qFromTo(Y_UP, nn)));
    }
  }
  return b.build();
}

function wingGeometry() {
  return cachedGeo('wing', () => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.quadraticCurveTo(0.2, 0.35, 0.55, 0.42);
    s.quadraticCurveTo(0.5, 0.32, 0.56, 0.28);
    s.quadraticCurveTo(0.45, 0.2, 0.52, 0.14);
    s.quadraticCurveTo(0.38, 0.06, 0.42, 0.0);
    s.quadraticCurveTo(0.2, -0.06, 0, 0);
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.03, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.015, bevelSegments: 2, curveSegments: 8 });
    g.translate(0, 0, -0.015);
    return g;
  });
}

function buildShell(type) {
  const color = type === 'red_shell' ? 0xe0262d : type === 'blue_shell' ? 0x1e6bff : 0x22b33a;
  const parts = itemTemplate(type, () => buildShellParts(color, type === 'blue_shell'));
  const root = instantiate(parts, {});
  root.name = type;
  if (type === 'blue_shell') {
    const wm = glossMat(0xffffff, 'wing');
    const wings = [];
    for (const sx of [-1, 1]) {
      const pivot = new THREE.Group();
      pivot.position.set(sx * 0.42, 0.32, -0.05);
      const w = new THREE.Mesh(wingGeometry(), wm);
      w.castShadow = true;
      // shape x -> outward, shape y -> up; plane faces z; orient flat-ish
      w.rotation.set(0, sx > 0 ? 0 : PI, 0);
      pivot.add(w);
      root.add(pivot);
      wings.push({ pivot, sx });
    }
    const flap = () => {
      const t = performance.now() / 1000;
      for (const wg of wings) {
        wg.pivot.rotation.set(0.25, 0, wg.sx * (0.35 + Math.sin(t * 16) * 0.45));
        wg.pivot.updateMatrix();
        wg.pivot.matrixWorld.multiplyMatrices(root.matrixWorld, wg.pivot.matrix);
        wg.pivot.children[0].matrixWorld.multiplyMatrices(wg.pivot.matrixWorld, wg.pivot.children[0].matrix);
      }
    };
    wings[0].pivot.children[0].onBeforeRender = flap;
  }
  return root;
}

function buildBananaParts() {
  const b = new Builder();
  const peel = cached('banana:peel', () => new THREE.MeshPhysicalMaterial({ color: 0xffc400, roughness: 0.45, clearcoat: 0.6, clearcoatRoughness: 0.2, envMap: envMap(), envMapIntensity: 0.7, side: THREE.DoubleSide }));
  const brown = stdMat(0x6b4a1e, 0.7);
  const inner = stdMat(0xfff6c8, 0.6);
  const top = V3(0, 0.62, 0);
  // fruit stub (bent capsule)
  const stub = new THREE.CapsuleGeometry(0.12, 0.42, 8, 16);
  const p = stub.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const y = p.getY(i);
    p.setX(i, p.getX(i) + 0.25 * Math.pow((y + 0.33) / 0.66, 2) * 0.35);
  }
  stub.computeVertexNormals();
  b.add(stub, inner, M([0, 0.42, 0]));
  // stem
  b.add(new THREE.CylinderGeometry(0.035, 0.05, 0.14, 10), brown, M([0.11, 0.76, 0], [0, 0, -0.3]));
  // peel flaps
  const n = 3;
  for (let i = 0; i < n; i++) {
    const phiC = (i / n) * TAU + 0.3;
    const d = V3(-Math.cos(phiC), 0, Math.sin(phiC));
    const axis = V3(-d.z, 0, d.x).normalize();
    const g = new THREE.SphereGeometry(0.3, 12, 14, phiC - 0.62, 1.24, 0, PI * 0.58);
    // taper the flap tips (narrow toward the pole & ends)
    const pa = g.attributes.position;
    for (let k = 0; k < pa.count; k++) {
      const x = pa.getX(k), y = pa.getY(k), z = pa.getZ(k);
      const t = 1 - y / 0.3; // 0 at pole
      const flare = 1 + Math.max(0, t - 0.7) * 1.2;
      pa.setXYZ(k, x * flare, y, z * flare);
    }
    g.computeVertexNormals();
    const mm = new THREE.Matrix4().makeTranslation(top.x, top.y, top.z)
      .multiply(new THREE.Matrix4().makeRotationAxis(axis, 0.38))
      .multiply(M([0, -0.3 * 1.8, 0], [0, 0, 0], [1.05, 1.8, 1.05]));
    b.add(g, peel, mm);
    // brown tip
    const tipDir = d.clone();
    const tipLocal = V3(tipDir.x * 0.3 * Math.sin(PI * 0.58) * 1.05 * 1.25, -0.3 * 1.8 + 0.3 * 1.8 * Math.cos(PI * 0.58), tipDir.z * 0.3 * Math.sin(PI * 0.58) * 1.05 * 1.25);
    const tipP = tipLocal.applyAxisAngle(axis, 0.38).add(top);
    b.add(sphere(0.05, 10, 8), brown, M([tipP.x, Math.max(0.03, tipP.y), tipP.z], [0, 0, 0], [1, 0.6, 1]));
  }
  return b.build();
}

function buildMushroomParts() {
  const b = new Builder();
  const stem = MAT.cream;
  const pts = [];
  for (let i = 0; i <= 10; i++) { const t = i / 10; pts.push(new THREE.Vector2(0.2 + Math.sin(t * PI) * 0.04 - t * 0.03, t * 0.42)); }
  pts.unshift(new THREE.Vector2(0, 0));
  pts.push(new THREE.Vector2(0, 0.42));
  b.add(new THREE.LatheGeometry(pts, 28), stem);
  // eyes on the stem
  for (const sx of [-1, 1]) {
    const d = dirYP(sx * 0.32, 0);
    b.add(sphere(1, 12, 10), MAT.pupil, MQ(V3(d.x * 0.225, 0.2, d.z * 0.225), faceDir(d), [0.035, 0.065, 0.03]));
    b.add(sphere(0.012, 6, 4), MAT.shine, M([d.x * 0.25, 0.225, d.z * 0.25]));
  }
  const capR = 0.42, sy = 0.82, cy = 0.38;
  b.add(sphere(capR, 36, 18, 0, TAU, 0, PI * 0.58), glossMat(0xe8262d, 'mushroomcap'), M([0, cy, 0], [0, 0, 0], [1, sy, 1]));
  b.add(new THREE.CircleGeometry(capR * Math.sin(PI * 0.58), 28), MAT.cream, M([0, cy + capR * sy * Math.cos(PI * 0.58) + 0.003, 0], [PI / 2, 0, 0]));
  const spots = [[0, 0, 0.14], [0.95, 0.5, 0.12], [0.95, 0.5 + TAU / 4, 0.12], [0.95, 0.5 + PI, 0.12], [0.95, 0.5 + 3 * TAU / 4, 0.12]];
  for (const [th, ph, sz] of spots) {
    const x = capR * Math.sin(th) * Math.cos(ph), y = capR * sy * Math.cos(th), z = capR * Math.sin(th) * Math.sin(ph);
    const n = V3(x, y / (sy * sy), z).normalize();
    b.add(sphere(1, 16, 10), glossMat(0xffffff, 'spotw'), MQ(V3(x, y + cy, z), faceDir(n), [sz, sz, 0.03]));
  }
  return b.build();
}

function starShape(outer, inner, rnd) {
  const pts = [];
  for (let i = 0; i < 10; i++) { const a = PI / 2 + (i / 10) * TAU; const r = i % 2 ? inner : outer; pts.push([Math.cos(a) * r, Math.sin(a) * r]); }
  return roundedShape(pts, rnd);
}

function buildStarParts() {
  const b = new Builder();
  const mat = cached('star', () => new THREE.MeshPhysicalMaterial({ color: 0xffc107, emissive: 0xff8f00, emissiveIntensity: 0.22, roughness: 0.2, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.05, envMap: envMap(), envMapIntensity: 1.1 }));
  const depth = 0.16, bev = 0.1;
  const g = new THREE.ExtrudeGeometry(starShape(0.55, 0.26, 0.06), { depth, bevelEnabled: true, bevelThickness: bev, bevelSize: 0.06, bevelSegments: 5, curveSegments: 6 });
  g.translate(0, 0, -depth / 2);
  b.add(g, mat);
  for (const face of [1, -1]) {
    for (const sx of [-1, 1]) {
      b.add(sphere(1, 14, 10), MAT.pupil, M([sx * 0.09, 0.06, face * (depth / 2 + bev - 0.01)], [0, face > 0 ? 0 : PI, 0], [0.04, 0.09, 0.025]));
      b.add(sphere(0.014, 6, 4), MAT.shine, M([sx * 0.09 + 0.012, 0.1, face * (depth / 2 + bev + 0.012)]));
    }
  }
  return b.build();
}

function buildLightningParts() {
  const b = new Builder();
  const mat = cached('bolt', () => new THREE.MeshPhysicalMaterial({ color: 0xffd000, emissive: 0xffa000, emissiveIntensity: 0.4, roughness: 0.25, clearcoat: 1, envMap: envMap(), envMapIntensity: 0.9 }));
  const s = roundedShape([[-0.05, 0.62], [0.32, 0.62], [0.1, 0.16], [0.32, 0.16], [-0.22, -0.62], [-0.02, -0.06], [-0.24, -0.06]], 0.025);
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.1, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.04, bevelSegments: 4, curveSegments: 4 });
  g.translate(0, 0, -0.05);
  b.add(g, mat);
  const edge = cached('boltEdge', () => new THREE.MeshBasicMaterial({ color: 0xffe082, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.BackSide }));
  const g2 = new THREE.ExtrudeGeometry(s, { depth: 0.1, bevelEnabled: true, bevelThickness: 0.09, bevelSize: 0.08, bevelSegments: 2, curveSegments: 4 });
  g2.translate(0, 0, -0.05);
  b.add(g2, edge);
  return b.build();
}

/** Returns a fresh Object3D for the given item type (geometry/materials shared internally). */
export function createItemModel(type) {
  try {
    switch (type) {
      case 'item_box': return buildItemBox();
      case 'banana': { const r = instantiate(itemTemplate('banana', buildBananaParts), {}); r.name = 'banana'; return r; }
      case 'green_shell':
      case 'red_shell':
      case 'blue_shell': return buildShell(type);
      case 'mushroom':
      case 'triple_mushroom': {
        const parts = itemTemplate('mushroom', buildMushroomParts);
        if (type === 'mushroom') { const r = instantiate(parts, {}); r.name = 'mushroom'; return r; }
        const g = new THREE.Group(); g.name = 'triple_mushroom';
        [[-0.42, 0, 0], [0.42, 0, 0], [0, 0, -0.38]].forEach((p, i) => { const m = instantiate(parts, {}); m.position.set(p[0], 0, p[2]); m.scale.setScalar(i === 2 ? 0.85 : 0.8); g.add(m); });
        return g;
      }
      case 'star': {
        const r = new THREE.Group(); r.name = 'star';
        const inner = instantiate(itemTemplate('star', buildStarParts), {});
        r.add(inner);
        const t0 = Math.random() * 10;
        inner.children[0].onBeforeRender = () => {
          const t = performance.now() / 1000 + t0;
          inner.rotation.set(Math.sin(t * 2) * 0.15, t * 2.2, 0);
          inner.updateMatrix();
          inner.matrixWorld.multiplyMatrices(r.matrixWorld, inner.matrix);
          for (const c of inner.children) c.matrixWorld.multiplyMatrices(inner.matrixWorld, c.matrix);
        };
        return r;
      }
      case 'lightning': { const r = instantiate(itemTemplate('lightning', buildLightningParts), {}); r.name = 'lightning'; r.children.forEach((c, i) => { if (i > 0) c.castShadow = false; }); return r; }
      default: {
        const g = new THREE.Group();
        g.add(new THREE.Mesh(cachedGeo('fallbackItem', () => new THREE.IcosahedronGeometry(0.4, 1)), glossMat(0xff00ff, 'fallback')));
        return g;
      }
    }
  } catch (err) {
    console.warn('[models] createItemModel failed', type, err);
    return new THREE.Group();
  }
}

// ---------------------------------------------------------------------------------------------
// Character portraits (2D canvas)
// ---------------------------------------------------------------------------------------------
const _portraits = new Map();
export function createCharacterPortrait(character) {
  const ch = normChar(character);
  const key = `${ch.id}:${ch.color}:${ch.hat}`;
  if (_portraits.has(key)) return _portraits.get(key);
  let url = '';
  try {
    const c = document.createElement('canvas');
    c.width = 128; c.height = 128;
    drawPortrait(c.getContext('2d'), ch, styleFor(ch));
    url = c.toDataURL('image/png');
  } catch (err) {
    console.warn('[models] portrait failed', err);
  }
  _portraits.set(key, url);
  return url;
}

function drawPortrait(g, ch, st) {
  const col = css(ch.color), acc = css(ch.accent), skin = css(ch.skin);
  const dark = cssShift(ch.color, 0.55), light = cssShift(ch.color, 1.0, 1.0, 0.28);
  const outline = 'rgba(20,16,30,0.85)';
  const OL = 2.6;
  // background
  g.save();
  roundRectPath(g, 2, 2, 124, 124, 26);
  g.clip();
  const bg = g.createRadialGradient(64, 44, 6, 64, 64, 96);
  bg.addColorStop(0, light); bg.addColorStop(0.55, col); bg.addColorStop(1, dark);
  g.fillStyle = bg; g.fillRect(0, 0, 128, 128);
  // sunburst
  g.globalAlpha = 0.12; g.fillStyle = '#ffffff';
  for (let i = 0; i < 12; i++) {
    const a0 = (i / 12) * TAU, a1 = a0 + TAU / 24;
    g.beginPath(); g.moveTo(64, 60); g.lineTo(64 + Math.cos(a0) * 140, 60 + Math.sin(a0) * 140); g.lineTo(64 + Math.cos(a1) * 140, 60 + Math.sin(a1) * 140); g.closePath(); g.fill();
  }
  g.globalAlpha = 1;

  const shape = (fill, draw, lw = OL) => { g.beginPath(); draw(); g.fillStyle = fill; g.fill(); g.lineWidth = lw; g.strokeStyle = outline; g.stroke(); };
  const ell = (x, y, rx, ry, rot = 0) => g.ellipse(x, y, rx, ry, rot, 0, TAU);
  const hair = st.hair !== undefined ? css(st.hair) : null;
  const cx = 64, cy = 70, R = 31;

  // shoulders / body
  shape(col, () => ell(64, 134, 44, 34));
  shape(acc, () => ell(64, 104, 13, 6));
  // shell on back
  if (ch.hat === 'shell') { shape(col, () => ell(64, 118, 52, 24)); shape(acc, () => ell(64, 106, 46, 7)); }
  // hair behind
  if (hair && st.longHair) shape(hair, () => { g.moveTo(30, 66); g.quadraticCurveTo(26, 118, 44, 116); g.lineTo(84, 116); g.quadraticCurveTo(102, 118, 98, 66); g.closePath(); });
  if (hair && st.pigtails) { shape(hair, () => ell(30, 80, 11, 16, 0.3)); shape(hair, () => ell(98, 80, 11, 16, -0.3)); }
  // horns
  if (ch.hat === 'horns') {
    for (const sx of [-1, 1]) shape('#fff3d6', () => { g.moveTo(cx + sx * 16, cy - 24); g.quadraticCurveTo(cx + sx * 30, cy - 40, cx + sx * 26, cy - 50); g.quadraticCurveTo(cx + sx * 20, cy - 36, cx + sx * 6, cy - 28); g.closePath(); });
    for (let i = 0; i < 3; i++) shape(acc, () => { const x = cx - 10 + i * 10; g.moveTo(x - 6, cy - 28); g.lineTo(x, cy - 42 + Math.abs(i - 1) * 4); g.lineTo(x + 6, cy - 28); g.closePath(); });
  }
  // ears
  if (!st.snout) { shape(skin, () => ell(cx - R + 1, cy + 2, 6, 9)); shape(skin, () => ell(cx + R - 1, cy + 2, 6, 9)); }
  // head
  shape(skin, () => ell(cx, cy, R, R * 0.97));
  // snouts
  if (st.snout === 'dino') shape(skin, () => ell(cx, cy + 14, 24, 14));
  if (st.snout === 'beak') shape(skin, () => ell(cx, cy + 14, 18, 11));
  // eyes
  const ey = st.snout ? cy - 6 : cy - 2;
  for (const sx of [-1, 1]) {
    const ex = cx + sx * 11;
    shape('#ffffff', () => ell(ex, ey, 7.5, 10), 2);
    g.beginPath(); ell(ex + sx * 0.5, ey + 1.5, 5.2, 7); g.fillStyle = css(st.eye); g.fill();
    g.beginPath(); ell(ex + sx * 0.5, ey + 2, 2.8, 4.2); g.fillStyle = '#0d0d12'; g.fill();
    g.beginPath(); ell(ex + 2, ey - 3, 2, 2.4); g.fillStyle = '#ffffff'; g.fill();
    if (st.lashes) { g.strokeStyle = outline; g.lineWidth = 2; for (let i = 0; i < 3; i++) { const a = -PI / 2 + sx * (0.5 + i * 0.35); g.beginPath(); g.moveTo(ex + Math.cos(a) * 8, ey + Math.sin(a) * 10); g.lineTo(ex + Math.cos(a) * 12, ey + Math.sin(a) * 14); g.stroke(); } }
  }
  if (st.brows) { g.strokeStyle = st.brows === 'dino' ? cssShift(ch.skin, 0.55) : (hair || '#222'); g.lineWidth = 4.5; g.lineCap = 'round'; for (const sx of [-1, 1]) { g.beginPath(); g.moveTo(cx + sx * 5, ey - 10); g.lineTo(cx + sx * 18, ey - 15); g.stroke(); } }
  // blush
  g.fillStyle = 'rgba(255,120,140,0.45)';
  for (const sx of [-1, 1]) { g.beginPath(); ell(cx + sx * 20, cy + 10, 5.5, 3.5); g.fill(); }
  if (st.freckles) { g.fillStyle = cssShift(ch.skin, 0.7, 1.3); for (const [x, y] of [[-20, 6], [-16, 9], [-23, 10], [20, 6], [16, 9], [23, 10]]) { g.beginPath(); g.arc(cx + x, cy + y, 1.2, 0, TAU); g.fill(); } }
  // nose + mouth
  if (st.snout === 'dino') {
    g.fillStyle = '#1a1a1a'; for (const sx of [-1, 1]) { g.beginPath(); ell(cx + sx * 7, cy + 9, 2, 1.5); g.fill(); }
    g.strokeStyle = '#6d1b2b'; g.lineWidth = 3; g.beginPath(); g.arc(cx, cy + 12, 14, 0.25 * PI, 0.75 * PI); g.stroke();
    g.fillStyle = '#fff'; for (const sx of [-1, 1]) { g.beginPath(); g.moveTo(cx + sx * 7, cy + 24); g.lineTo(cx + sx * 9, cy + 28); g.lineTo(cx + sx * 5, cy + 25); g.fill(); }
  } else if (st.snout === 'beak') {
    g.strokeStyle = '#6d1b2b'; g.lineWidth = 3; g.beginPath(); g.arc(cx, cy + 12, 10, 0.25 * PI, 0.75 * PI); g.stroke();
  } else {
    shape(cssShift(ch.skin, 0.93, 1.2), () => ell(cx, cy + 7, st.bigNose ? 8 : 5, st.bigNose ? 7 : 4.5), 2);
    g.strokeStyle = st.lips ? '#d81b60' : '#6d1b2b'; g.lineWidth = 3; g.lineCap = 'round';
    g.beginPath(); g.arc(cx, cy + 12, 8, 0.2 * PI, 0.8 * PI); g.stroke();
  }
  if (st.mustache) {
    const big = st.mustache === 'big';
    for (const sx of [-1, 1]) shape(hair || '#3b2a1a', () => ell(cx + sx * (big ? 9 : 6), cy + 12, big ? 11 : 7, big ? 5 : 3.5, sx * -0.3), 2);
  }
  // hats
  const hat = ch.hat;
  if (hat === 'cap') {
    if (hair) shape(hair, () => { ell(cx - 24, cy - 6, 6, 9); }, 2);
    if (hair) shape(hair, () => { ell(cx + 24, cy - 6, 6, 9); }, 2);
    if (st.tuft && hair) shape(hair, () => { g.moveTo(cx + 22, cy - 18); g.lineTo(cx + 36, cy - 26); g.lineTo(cx + 28, cy - 12); g.closePath(); });
    shape(col, () => { g.moveTo(cx - R - 1, cy - 16); g.bezierCurveTo(cx - R, cy - 56, cx + R, cy - 56, cx + R + 1, cy - 16); g.closePath(); });
    shape(dark, () => ell(cx + 4, cy - 16, 36, 6));
    shape('#ffffff', () => g.arc(cx, cy - 33, 9, 0, TAU), 2);
    g.fillStyle = col; g.font = '900 13px "Arial Black", Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(ch.name.charAt(0).toUpperCase(), cx, cy - 32);
  } else if (hat === 'crown') {
    shape(hair || '#ffd54f', () => { g.moveTo(cx - R, cy - 2); g.bezierCurveTo(cx - R - 2, cy - 44, cx + R + 2, cy - 44, cx + R, cy - 2); g.quadraticCurveTo(cx + 14, cy - 22, cx, cy - 18); g.quadraticCurveTo(cx - 14, cy - 22, cx - R, cy - 2); g.closePath(); });
    shape('#ffc630', () => { g.moveTo(cx - 20, cy - 30); g.lineTo(cx - 22, cy - 50); g.lineTo(cx - 11, cy - 40); g.lineTo(cx, cy - 54); g.lineTo(cx + 11, cy - 40); g.lineTo(cx + 22, cy - 50); g.lineTo(cx + 20, cy - 30); g.closePath(); });
    shape('#e91e63', () => g.arc(cx, cy - 36, 3.5, 0, TAU), 1.5);
    shape('#29b6f6', () => g.arc(cx - 13, cy - 35, 2.5, 0, TAU), 1.5);
    shape('#29b6f6', () => g.arc(cx + 13, cy - 35, 2.5, 0, TAU), 1.5);
  } else if (hat === 'mushroom') {
    shape('#ffffff', () => { g.moveTo(cx - 52, cy - 16); g.bezierCurveTo(cx - 54, cy - 74, cx + 54, cy - 74, cx + 52, cy - 16); g.quadraticCurveTo(cx, cy - 8, cx - 52, cy - 16); g.closePath(); });
    for (const [x, y, r] of [[0, -44, 11], [-32, -31, 9], [32, -31, 9], [-16, -54, 5], [17, -54, 5]]) { g.beginPath(); g.arc(cx + x, cy + y, r, 0, TAU); g.fillStyle = col; g.fill(); }
  } else if (hat === 'shell') {
    shape(col, () => { g.moveTo(cx - R - 3, cy - 8); g.bezierCurveTo(cx - R - 2, cy - 52, cx + R + 2, cy - 52, cx + R + 3, cy - 8); g.closePath(); });
    shape(acc, () => { g.rect(cx - R - 4, cy - 12, 2 * R + 8, 6); }, 2);
    for (const sx of [-1, 1]) { shape('#cfd8dc', () => g.arc(cx + sx * 10, cy - 26, 7, 0, TAU), 2); g.beginPath(); g.arc(cx + sx * 10, cy - 26, 4.5, 0, TAU); g.fillStyle = '#80deea'; g.fill(); }
  } else if (hat === 'bow') {
    shape(hair || '#6d4028', () => { g.moveTo(cx - R, cy); g.bezierCurveTo(cx - R - 2, cy - 44, cx + R + 2, cy - 44, cx + R, cy); g.quadraticCurveTo(cx + 10, cy - 24, cx - 4, cy - 20); g.quadraticCurveTo(cx - 20, cy - 20, cx - R, cy); g.closePath(); });
    const bc = css(st.bowColor || ch.accent);
    shape(bc, () => ell(cx + 6, cy - 40, 13, 9, -0.4));
    shape(bc, () => ell(cx + 30, cy - 36, 13, 9, 0.4));
    shape(bc, () => g.arc(cx + 18, cy - 38, 5, 0, TAU));
  }
  g.restore();
  // frame
  roundRectPath(g, 3, 3, 122, 122, 25);
  g.lineWidth = 4; g.strokeStyle = 'rgba(255,255,255,0.85)'; g.stroke();
}
