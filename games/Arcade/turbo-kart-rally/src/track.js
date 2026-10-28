// Track (Agent 1 — World). See ARCHITECTURE.md §1 for the contract.
// createTrack(scene, renderer) -> Track
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { bus } from './events.js';
import * as TX from './track-textures.js';
import { createEnvironment } from './environment.js';

const TRACK_NAME = 'Palm Cove Circuit';
const SCALE = 1.15;
const N = 2000;                 // centerline samples
const HALF_W = 12;              // road half width (roadWidth = 24)
const GRID_CELL = 40;

// Control points [x, y, z] (x/z scaled by SCALE). Race direction = list order. CP0 = start/finish line.
const CP = [
  [0, 0, -60],      // 0  start / finish (main straight, heading +Z)
  [0, 0, 60],       // 1
  [2, 0, 175],      // 2
  [22, 1, 258],     // 3  big sweeping left
  [80, 3, 302],     // 4
  [160, 5, 296],    // 5
  [230, 6, 252],    // 6  sweeping right
  [262, 6, 182],    // 7
  [238, 5, 118],    // 8  S-bend
  [292, 4, 64],     // 9
  [258, 4, 4],      // 10
  [296, 6, -62],    // 11 climb to the bridge
  [304, 10, -140],  // 12 bridge over the lagoon
  [284, 10, -212],  // 13
  [226, 6, -262],   // 14 downhill jump
  [150, 3, -284],   // 15
  [66, 1, -300],    // 16
  [-20, 0, -318],   // 17 into the hairpin
  [-96, 0, -322],   // 18
  [-128, 0, -292],  // 19 hairpin apex
  [-106, 0, -256],  // 20
  [-50, 0, -236],   // 21
  [-8, 0, -196],    // 22
  [0, 0, -140],     // 23
];

// Lagoon crossed by the bridge (world coords). Shared with environment.
const LAKE = { x: 405, z: -205, r: 125 };
const WATER_LEVEL = -1;

const smoothstep = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const wrapAngle = (a) => { while (a > Math.PI) a -= Math.PI * 2; while (a < -Math.PI) a += Math.PI * 2; return a; };
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));

function smoothCircular(arr, radius, passes = 1) {
  let src = Float32Array.from(arr);
  const n = src.length;
  for (let p = 0; p < passes; p++) {
    const dst = new Float32Array(n);
    let sum = 0;
    for (let k = -radius; k <= radius; k++) sum += src[(k + n) % n];
    const w = 2 * radius + 1;
    for (let i = 0; i < n; i++) {
      dst[i] = sum / w;
      sum += src[(i + radius + 1) % n] - src[(i - radius + n) % n];
    }
    src = dst;
  }
  return src;
}

export function createTrack(scene, renderer) {
  const root = new THREE.Group();
  root.name = 'track';
  scene.add(root);
  const disposables = [];
  const track = {};

  // ------------------------------------------------------------------ centerline
  const pts = CP.map(([x, y, z]) => new THREE.Vector3(x * SCALE, y, z * SCALE));
  const curve = new THREE.CatmullRomCurve3(pts, true, 'centripetal', 0.5);
  curve.arcLengthDivisions = 6000;
  curve.updateArcLengths();
  const length = curve.getLength();
  const ds = length / N;

  const px = new Float32Array(N), py = new Float32Array(N), pz = new Float32Array(N);
  const tx = new Float32Array(N), ty = new Float32Array(N), tz = new Float32Array(N);
  const rx = new Float32Array(N), rz = new Float32Array(N);
  const head = new Float32Array(N);
  const _p = new THREE.Vector3(), _t = new THREE.Vector3();
  for (let i = 0; i < N; i++) {
    const u = i / N;
    curve.getPointAt(u, _p);
    curve.getTangentAt(u, _t).normalize();
    px[i] = _p.x; py[i] = _p.y; pz[i] = _p.z;
    tx[i] = _t.x; ty[i] = _t.y; tz[i] = _t.z;
    const hl = Math.hypot(_t.x, _t.z) || 1;
    rx[i] = -_t.z / hl; rz[i] = _t.x / hl;   // right = tangent × up
    head[i] = Math.atan2(_t.x, _t.z);
  }

  // signed curvature (dh/ds; + = turning left)
  const kRaw = new Float32Array(N);
  for (let i = 0; i < N; i++) kRaw[i] = wrapAngle(head[(i + 1) % N] - head[(i - 1 + N) % N]) / (2 * ds);
  const kS = smoothCircular(kRaw, 6, 2);
  const kWide = smoothCircular(kRaw, 22, 3);

  // bridge factor (over the lagoon)
  let bridge = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const d = Math.hypot(px[i] - LAKE.x, pz[i] - LAKE.z);
    bridge[i] = 1 - smoothstep(LAKE.r - 5, LAKE.r + 28, d);
  }
  bridge = smoothCircular(bridge, 8, 1);

  // wall offsets (distance from centerline to barrier inner face)
  const wallBase = (side) => {
    const w = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const outer = side > 0 ? Math.max(0, kS[i]) : Math.max(0, -kS[i]);
      w[i] = HALF_W + 7 + Math.min(6, outer * 700);
    }
    return w;
  };
  const innerClamp = (w, side) => {
    for (let i = 0; i < N; i++) {
      const inner = side > 0 ? Math.max(0, -kS[i]) : Math.max(0, kS[i]);
      if (inner > 1e-4) w[i] = Math.min(w[i], 1 / inner - 5);
      w[i] = Math.max(HALF_W + 1.5, w[i]);
      w[i] = w[i] * (1 - bridge[i]) + (HALF_W + 1.2) * bridge[i];
    }
    return w;
  };
  let wallR = innerClamp(smoothCircular(innerClamp(wallBase(1), 1), 18, 2), 1);
  let wallL = innerClamp(smoothCircular(innerClamp(wallBase(-1), -1), 18, 2), -1);
  const maxWall = Math.max(...wallR, ...wallL);

  // racing line lateral offsets
  const maxOff = HALF_W - 3;
  const apex = new Float32Array(N);
  for (let i = 0; i < N; i++) apex[i] = -clamp(kWide[i] * 160, -1, 1) * maxOff;
  const lookA = Math.round(32 / ds);
  let race = new Float32Array(N);
  for (let i = 0; i < N; i++) race[i] = clamp(apex[i] - 0.55 * apex[(i + lookA) % N], -maxOff, maxOff);
  race = smoothCircular(race, 14, 2);

  // ------------------------------------------------------------------ spatial grid
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (let i = 0; i < N; i++) {
    minX = Math.min(minX, px[i]); maxX = Math.max(maxX, px[i]);
    minZ = Math.min(minZ, pz[i]); maxZ = Math.max(maxZ, pz[i]);
  }
  const gx0 = minX - 200, gz0 = minZ - 200;
  const gw = Math.ceil((maxX - minX + 400) / GRID_CELL), gh = Math.ceil((maxZ - minZ + 400) / GRID_CELL);
  const grid = Array.from({ length: gw * gh }, () => []);
  for (let i = 0; i < N; i++) {
    const cx = Math.floor((px[i] - gx0) / GRID_CELL), cz = Math.floor((pz[i] - gz0) / GRID_CELL);
    grid[cz * gw + cx].push(i);
  }

  // nearest centerline sample (horizontal). Returns index, stores squared dist in _nd2.
  let _nd2 = 0;
  function nearestGrid(x, z, noFallback = false) {
    const cx = Math.floor((x - gx0) / GRID_CELL), cz = Math.floor((z - gz0) / GRID_CELL);
    let best = -1, bd = Infinity;
    for (let r = 1; r <= 2; r++) {
      for (let j = cz - r; j <= cz + r; j++) {
        if (j < 0 || j >= gh) continue;
        for (let k = cx - r; k <= cx + r; k++) {
          if (k < 0 || k >= gw) continue;
          if (r === 2 && j > cz - 2 && j < cz + 2 && k > cx - 2 && k < cx + 2) continue;
          const cell = grid[j * gw + k];
          for (let m = 0; m < cell.length; m++) {
            const i = cell[m];
            const dx = px[i] - x, dz = pz[i] - z, d = dx * dx + dz * dz;
            if (d < bd) { bd = d; best = i; }
          }
        }
      }
      if (best >= 0 && bd <= (GRID_CELL * r) * (GRID_CELL * r)) { _nd2 = bd; return best; }
    }
    if (noFallback) { _nd2 = Infinity; return -1; }
    for (let i = 0; i < N; i++) {
      const dx = px[i] - x, dz = pz[i] - z, d = dx * dx + dz * dz;
      if (d < bd) { bd = d; best = i; }
    }
    _nd2 = bd;
    return best;
  }

  const WIN = 45;
  function nearest(x, z, hintT) {
    if (typeof hintT === 'number' && isFinite(hintT)) {
      const c = Math.round((((hintT % 1) + 1) % 1) * N);
      let best = -1, bd = Infinity, bk = 0;
      for (let k = -WIN; k <= WIN; k++) {
        const i = (c + k + N) % N;
        const dx = px[i] - x, dz = pz[i] - z, d = dx * dx + dz * dz;
        if (d < bd) { bd = d; best = i; bk = k; }
      }
      const lim = maxWall + 8;
      if (bd < lim * lim && Math.abs(bk) < WIN) { _nd2 = bd; return best; }
    }
    return nearestGrid(x, z);
  }

  // Projects (x,z) onto the centerline. Fills `proj`.
  const proj = { a: 0, b: 1, f: 0, s: 0, lat: 0, y: 0, cx: 0, cz: 0, rx: 0, rz: 0 };
  function project(x, z, hintT) {
    const i = nearest(x, z, hintT);
    const n = (i + 1) % N, p = (i - 1 + N) % N;
    const along = (x - px[i]) * tx[i] + (z - pz[i]) * tz[i];
    const a = along >= 0 ? i : p, b = along >= 0 ? n : i;
    const sx = px[b] - px[a], sz = pz[b] - pz[a];
    const L2 = sx * sx + sz * sz || 1;
    const f = clamp(((x - px[a]) * sx + (z - pz[a]) * sz) / L2, 0, 1);
    const cx = px[a] + sx * f, cz = pz[a] + sz * f;
    let rxi = rx[a] + (rx[b] - rx[a]) * f, rzi = rz[a] + (rz[b] - rz[a]) * f;
    const rl = Math.hypot(rxi, rzi) || 1; rxi /= rl; rzi /= rl;
    proj.a = a; proj.b = b; proj.f = f;
    proj.s = a + f;                              // in samples
    proj.cx = cx; proj.cz = cz;
    proj.y = py[a] + (py[b] - py[a]) * f;
    proj.rx = rxi; proj.rz = rzi;
    proj.lat = (x - cx) * rxi + (z - cz) * rzi;
    return proj;
  }

  const lerpArr = (arr, a, b, f) => arr[a] + (arr[b] - arr[a]) * f;
  const idxAtDist = (d) => ((((d / ds) % N) + N) % N);

  // ------------------------------------------------------------------ features
  const nearestToCP = (cpf) => {
    const i0 = Math.floor(cpf) % CP.length, i1 = (i0 + 1) % CP.length, f = cpf - Math.floor(cpf);
    const x = (CP[i0][0] + (CP[i1][0] - CP[i0][0]) * f) * SCALE;
    const z = (CP[i0][2] + (CP[i1][2] - CP[i0][2]) * f) * SCALE;
    return nearestGrid(x, z);
  };

  // Boost pads: s0/len in samples, lateral centre, half width
  const PAD_LEN = Math.max(3, Math.round(7 / ds));
  const boostPads = [];
  const addPad = (sIdx, lat) => boostPads.push({ s0: ((sIdx % N) + N) % N, len: PAD_LEN, lat, hw: 2.6 });
  const padStep = Math.round(16 / ds);
  { // cluster A — exit of the S-bend (staggered trio)
    const i = nearestToCP(10.45);
    addPad(i, -6); addPad(i + padStep, 0); addPad(i + padStep * 2, 6);
  }
  { // cluster B — hairpin exit (pair, then centre)
    const i = nearestToCP(20.55);
    addPad(i, -4.5); addPad(i, 4.5); addPad(i + padStep * 2, 0);
  }
  { // cluster C — lined up before the sweeper jump
    const i = nearestToCP(4.15);
    addPad(i, race[i]); addPad(i + padStep, race[(i + padStep) % N]);
  }

  // Jump ramps
  const RAMP_LEN = Math.max(4, Math.round(9 / ds));
  const ramps = [];
  const addRamp = (sIdx, hw = 10, h = 1.7) => ramps.push({ s0: ((sIdx % N) + N) % N, len: RAMP_LEN, hw, h });
  addRamp(nearestToCP(14.35));                // downhill after the bridge
  addRamp(nearestToCP(4.65), 9, 1.5);         // top of the big sweeper

  // Item box rows
  const itemBoxPositions = [];
  const itemRowIdx = [1.25, 6.5, 9.2, 12.5, 16.4, 21.6].map(nearestToCP);
  for (const i of itemRowIdx) {
    for (const lat of [-8, -4, 0, 4, 8]) {
      itemBoxPositions.push(new THREE.Vector3(px[i] + rx[i] * lat, py[i] + 1.4, pz[i] + rz[i] * lat));
    }
  }

  // ------------------------------------------------------------------ public API
  const wrapDelta = (s, s0) => { let d = s - s0; if (d < 0) d += N; return d; };

  function getSurfaceInfo(pos, hintT) {
    if (!pos || !isFinite(pos.x) || !isFinite(pos.z)) {
      return { height: 0, normal: new THREE.Vector3(0, 1, 0), surface: 'road', t: 0, lateral: 0, onRoad: true };
    }
    const pr = project(pos.x, pos.z, hintT);
    const { a, b, f } = pr;
    const lat = pr.lat;
    const t = (pr.s / N) % 1;
    let height = pr.y;
    // slope normal = right × tangent
    const Tx = lerpArr(tx, a, b, f), Ty = lerpArr(ty, a, b, f), Tz = lerpArr(tz, a, b, f);
    const normal = new THREE.Vector3(-pr.rz * Ty, pr.rz * Tx - pr.rx * Tz, pr.rx * Ty).normalize();
    const onRoad = Math.abs(lat) <= HALF_W;
    let surface = onRoad ? 'road' : 'offroad';
    if (onRoad) {
      for (let k = 0; k < ramps.length; k++) {
        const r = ramps[k];
        const d = wrapDelta(pr.s, r.s0);
        if (d <= r.len && Math.abs(lat) <= r.hw) {
          const slope = r.h / (r.len * ds);
          height += slope * d * ds;
          surface = 'jump';
          normal.set(normal.x - Tx * slope, normal.y - Ty * slope, normal.z - Tz * slope).normalize();
          break;
        }
      }
      if (surface === 'road') {
        for (let k = 0; k < boostPads.length; k++) {
          const p = boostPads[k];
          if (wrapDelta(pr.s, p.s0) <= p.len && Math.abs(lat - p.lat) <= p.hw) { surface = 'boost'; break; }
        }
      }
    }
    return { height, normal, surface, t, lateral: lat, onRoad };
  }

  function resolveWall(pos, radius = 1.3) {
    if (!pos || !isFinite(pos.x) || !isFinite(pos.z)) return null;
    const pr = project(pos.x, pos.z);
    const wr = lerpArr(wallR, pr.a, pr.b, pr.f), wl = lerpArr(wallL, pr.a, pr.b, pr.f);
    if (pr.lat + radius > wr) {
      return { normal: new THREE.Vector3(-pr.rx, 0, -pr.rz), depth: pr.lat + radius - wr };
    }
    if (-pr.lat + radius > wl) {
      return { normal: new THREE.Vector3(pr.rx, 0, pr.rz), depth: -pr.lat + radius - wl };
    }
    return null;
  }

  const getPointAt = (t) => curve.getPointAt((((t % 1) + 1) % 1));
  const getTangentAt = (t) => curve.getTangentAt((((t % 1) + 1) % 1)).normalize();
  function getRacingLine(t) {
    const s = (((t % 1) + 1) % 1) * N;
    const a = Math.floor(s) % N, b = (a + 1) % N, f = s - Math.floor(s);
    const off = race[a] + (race[b] - race[a]) * f;
    const x = lerpArr(px, a, b, f), y = lerpArr(py, a, b, f), z = lerpArr(pz, a, b, f);
    let rxi = lerpArr(rx, a, b, f), rzi = lerpArr(rz, a, b, f);
    const rl = Math.hypot(rxi, rzi) || 1; rxi /= rl; rzi /= rl;
    return new THREE.Vector3(x + rxi * off, y, z + rzi * off);
  }

  // Start grid: staggered 2-wide, pole (index 0) nearest the line.
  const startPositions = [];
  for (let k = 0; k < 8; k++) {
    const back = 8 + k * 5.2;
    const s = idxAtDist(length - back);
    const a = Math.floor(s) % N, b = (a + 1) % N, f = s - Math.floor(s);
    const lat = k % 2 === 0 ? -4.5 : 4.5;
    const x = lerpArr(px, a, b, f) + lerpArr(rx, a, b, f) * lat;
    const z = lerpArr(pz, a, b, f) + lerpArr(rz, a, b, f) * lat;
    startPositions.push({
      position: new THREE.Vector3(x, lerpArr(py, a, b, f), z),
      heading: Math.atan2(lerpArr(tx, a, b, f), lerpArr(tz, a, b, f)),
    });
  }

  const minimap = { points: [], bounds: { minX, maxX, minZ, maxZ } };
  for (let i = 0; i < 256; i++) {
    const j = Math.floor(i * N / 256);
    minimap.points.push({ x: px[j], z: pz[j] });
  }

  // ------------------------------------------------------------------ geometry helpers
  // Extrude a cross-section polyline along samples [i0, i1] (i1 may exceed N; wraps).
  // profile(i) -> [[lat, dy], ...]; uv: across from `across` array or lateral/acrossScale;
  // along = (i - i0) * ds / alongScale * alongSign.
  function extrude(i0, i1, profile, { across = null, acrossScale = 1, alongScale = 1, alongSign = 1, swap = false, step = 1 } = {}) {
    const rings = [];
    for (let i = i0; i < i1; i += step) rings.push(i);
    rings.push(i1);
    const m = profile(i0 % N).length;
    const pos = new Float32Array(rings.length * m * 3);
    const uv = new Float32Array(rings.length * m * 2);
    let p = 0, q = 0;
    for (const ii of rings) {
      const i = ((Math.round(ii) % N) + N) % N;
      const prof = profile(i, ii);
      const along = (ii - i0) * ds / alongScale * alongSign;
      for (let j = 0; j < m; j++) {
        const [lat, dy] = prof[j];
        pos[p++] = px[i] + rx[i] * lat;
        pos[p++] = py[i] + dy;
        pos[p++] = pz[i] + rz[i] * lat;
        const ac = across ? across[j] : lat / acrossScale;
        if (swap) { uv[q++] = along; uv[q++] = ac; } else { uv[q++] = ac; uv[q++] = along; }
      }
    }
    const idx = [];
    for (let r = 0; r < rings.length - 1; r++) {
      for (let j = 0; j < m - 1; j++) {
        const A = r * m + j, B = r * m + j + 1, C = (r + 1) * m + j, D = (r + 1) * m + j + 1;
        idx.push(A, B, C, B, D, C);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  // Runs of samples where predicate(i) is true, as [start, end] (end may exceed N for wrap).
  function runs(pred, minLen = 1) {
    const out = [];
    const flags = new Uint8Array(N);
    for (let i = 0; i < N; i++) flags[i] = pred(i) ? 1 : 0;
    if (flags.every((v) => v)) return [[0, N]];
    let start = 0;
    while (flags[start]) start++;   // start at a false sample so runs don't split at the seam
    let runStart = -1;
    for (let k = 1; k <= N; k++) {
      const i = start + k;
      const v = flags[i % N];
      if (v && runStart < 0) runStart = i;
      if (!v && runStart >= 0) { if (i - runStart >= minLen) out.push([runStart - 1, i]); runStart = -1; }
    }
    return out;
  }

  const addMesh = (geo, mat, { cast = false, receive = true, name = '' } = {}) => {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = cast; mesh.receiveShadow = receive; mesh.name = name;
    root.add(mesh);
    disposables.push(geo);
    return mesh;
  };
  const mat = (m) => { disposables.push(m); if (m.map) disposables.push(m.map); return m; };

  // ------------------------------------------------------------------ road surface
  const asphaltTex = TX.makeAsphaltTexture();
  const roadMat = mat(new THREE.MeshStandardMaterial({ map: asphaltTex, roughness: 0.88, metalness: 0.0 }));
  addMesh(extrude(0, N, () => [[-HALF_W, 0], [0, 0], [HALF_W, 0]], { across: [0, 0.5, 1], alongScale: 22, step: 1 }), roadMat, { name: 'road' });

  // Curbs through corners (raised red/white rumble strips)
  const curbMat = mat(new THREE.MeshStandardMaterial({ map: TX.makeCurbTexture(), roughness: 0.6 }));
  const curbMask = new Uint8Array(N);
  for (let i = 0; i < N; i++) if (Math.abs(kS[i]) > 1 / 240 && bridge[i] < 0.2) {
    for (let k = -30; k <= 30; k++) curbMask[(i + k + N) % N] = 1;
  }
  for (let i = 0; i < N; i++) if (bridge[i] > 0.05) curbMask[i] = 0;
  const curbGeos = [];
  for (const [a, b] of runs((i) => curbMask[i], 10)) {
    curbGeos.push(extrude(a, b, () => [[HALF_W - 1.4, 0.0], [HALF_W - 1.1, 0.08], [HALF_W + 0.7, 0.08], [HALF_W + 0.9, -0.05]], { across: [0, 0.15, 0.9, 1], alongScale: 4 }));
    curbGeos.push(extrude(a, b, () => [[-HALF_W - 0.9, -0.05], [-HALF_W - 0.7, 0.08], [-HALF_W + 1.1, 0.08], [-HALF_W + 1.4, 0.0]], { across: [0, 0.1, 0.85, 1], alongScale: 4 }));
  }
  if (curbGeos.length) addMesh(mergeGeometries(curbGeos), curbMat, { name: 'curbs' });
  curbGeos.forEach((g) => g.dispose());

  // Offroad bands (grass) + bridge deck edge (concrete)
  const grassMat = mat(new THREE.MeshStandardMaterial({ map: TX.makeGrassTexture(), roughness: 1 }));
  grassMat.map.repeat.set(1, 1);
  const concreteMat = mat(new THREE.MeshStandardMaterial({ map: TX.makeConcreteTexture(), roughness: 0.9 }));
  const bandGeos = [], deckGeos = [];
  for (const [a, b] of runs((i) => bridge[i] < 0.5, 5)) {
    bandGeos.push(extrude(a, b, (i) => [[HALF_W - 0.2, -0.03], [wallR[i] + 0.35, -0.03]], { acrossScale: 6, alongScale: 6 }));
    bandGeos.push(extrude(a, b, (i) => [[-wallL[i] - 0.35, -0.03], [-HALF_W + 0.2, -0.03]], { acrossScale: 6, alongScale: 6 }));
  }
  const bridgeRuns = runs((i) => bridge[i] >= 0.5, 5);
  for (const [a, b] of bridgeRuns) {
    deckGeos.push(extrude(a, b, (i) => [[HALF_W - 0.2, -0.02], [wallR[i] + 0.8, -0.02]], { acrossScale: 4, alongScale: 4 }));
    deckGeos.push(extrude(a, b, (i) => [[-wallL[i] - 0.8, -0.02], [-HALF_W + 0.2, -0.02]], { acrossScale: 4, alongScale: 4 }));
    // deck sides + underside
    deckGeos.push(extrude(a, b, (i) => [[wallR[i] + 0.8, -0.02], [wallR[i] + 0.8, -2.4]], { acrossScale: 4, alongScale: 4 }));
    deckGeos.push(extrude(a, b, (i) => [[-wallL[i] - 0.8, -2.4], [-wallL[i] - 0.8, -0.02]], { acrossScale: 4, alongScale: 4 }));
    deckGeos.push(extrude(a, b, (i) => [[wallR[i] + 0.8, -2.4], [-wallL[i] - 0.8, -2.4]], { acrossScale: 4, alongScale: 4 }));
  }
  if (bandGeos.length) addMesh(mergeGeometries(bandGeos), grassMat, { name: 'offroad' });
  if (deckGeos.length) addMesh(mergeGeometries(deckGeos), concreteMat, { name: 'deck', cast: true });
  bandGeos.forEach((g) => g.dispose()); deckGeos.forEach((g) => g.dispose());

  // ------------------------------------------------------------------ barriers
  // type per side: 'rail' (bridge), 'tires' (outside of tight corners), 'wall'
  const barrierType = (side) => {
    const typ = new Array(N);
    const tight = new Uint8Array(N);
    for (let i = 0; i < N; i++) {
      const outer = side > 0 ? kS[i] > 1 / 55 : kS[i] < -1 / 55;
      if (outer) for (let k = -18; k <= 18; k++) tight[(i + k + N) % N] = 1;
    }
    for (let i = 0; i < N; i++) typ[i] = bridge[i] >= 0.5 ? 'rail' : tight[i] ? 'tires' : 'wall';
    return typ;
  };
  const typeR = barrierType(1), typeL = barrierType(-1);

  const wallTex = TX.makeBarrierTexture();
  const wallMat = mat(new THREE.MeshStandardMaterial({ map: wallTex, roughness: 0.55 }));
  const wallTopMat = mat(new THREE.MeshStandardMaterial({ color: 0xf2f2f2, roughness: 0.5 }));
  const railMat = mat(new THREE.MeshStandardMaterial({ map: TX.makeRailTexture(), roughness: 0.45 }));
  const WALL_H = 1.25, WALL_T = 0.7, TEX_LEN = 9.6;
  const vMap = (y) => (y + 0.05) / (WALL_H + 0.05);
  const wallFaces = [], wallTops = [], railFaces = [];
  for (const side of [1, -1]) {
    const typ = side > 0 ? typeR : typeL;
    const W = side > 0 ? wallR : wallL;
    for (const kind of ['wall', 'rail']) {
      const faces = kind === 'wall' ? wallFaces : railFaces;
      const bottom = kind === 'rail' ? -2.4 : -1.5;
      const h = kind === 'rail' ? 1.1 : WALL_H;
      for (const [a, b] of runs((i) => typ[i] === kind, 4)) {
        if (side > 0) {
          faces.push(extrude(a, b, (i) => [[W[i], bottom], [W[i], h]], { across: [vMap(bottom), vMap(h)], alongScale: TEX_LEN, alongSign: -1, swap: true }));
          wallTops.push(extrude(a, b, (i) => [[W[i], h], [W[i] + WALL_T, h]], { across: [0, 1], alongScale: TEX_LEN }));
          faces.push(extrude(a, b, (i) => [[W[i] + WALL_T, h], [W[i] + WALL_T, bottom]], { across: [vMap(h), vMap(bottom)], alongScale: TEX_LEN, swap: true }));
        } else {
          faces.push(extrude(a, b, (i) => [[-W[i] - WALL_T, bottom], [-W[i] - WALL_T, h]], { across: [vMap(bottom), vMap(h)], alongScale: TEX_LEN, alongSign: -1, swap: true }));
          wallTops.push(extrude(a, b, (i) => [[-W[i] - WALL_T, h], [-W[i], h]], { across: [0, 1], alongScale: TEX_LEN }));
          faces.push(extrude(a, b, (i) => [[-W[i], h], [-W[i], bottom]], { across: [vMap(h), vMap(bottom)], alongScale: TEX_LEN, swap: true }));
        }
      }
    }
  }
  if (wallFaces.length) addMesh(mergeGeometries(wallFaces), wallMat, { cast: true, name: 'walls' });
  if (railFaces.length) {
    railMat.map.repeat.set(1 / 2.5, 1);
    addMesh(mergeGeometries(railFaces), railMat, { cast: true, name: 'rails' });
  }
  if (wallTops.length) addMesh(mergeGeometries(wallTops), wallTopMat, { cast: false, name: 'wallTops' });
  [...wallFaces, ...railFaces, ...wallTops].forEach((g) => g.dispose());

  // Tire stacks (instanced) — inner face sits exactly on the collision line.
  {
    const TR = 0.9;
    const tireGeo = new THREE.CylinderGeometry(TR, TR, 0.42, 14, 1);
    const tireMat = mat(new THREE.MeshStandardMaterial({ roughness: 0.8 }));
    const places = [];
    for (const side of [1, -1]) {
      const typ = side > 0 ? typeR : typeL;
      const W = side > 0 ? wallR : wallL;
      for (const [a, b] of runs((i) => typ[i] === 'tires', 4)) {
        let acc = 1e9, lx = 0, lz = 0, stack = 0;
        for (let ii = a; ii <= b; ii++) {
          const i = ii % N;
          const lat = side * (W[i] + TR);
          const x = px[i] + rx[i] * lat, z = pz[i] + rz[i] * lat;
          acc += Math.hypot(x - lx, z - lz); lx = x; lz = z;
          if (acc >= TR * 1.95) { acc = 0; places.push({ x, y: py[i], z, stack: stack++ }); }
        }
      }
    }
    const colors = [new THREE.Color(0xe8322f), new THREE.Color(0xf7f7f7), new THREE.Color(0x1e6fe8), new THREE.Color(0xf7f7f7)];
    const dark = new THREE.Color(0x2a2c31);
    const im = new THREE.InstancedMesh(tireGeo, tireMat, places.length * 3);
    const m4 = new THREE.Matrix4();
    let n = 0;
    for (const p of places) {
      for (let l = 0; l < 3; l++) {
        m4.makeRotationY(p.stack * 0.7 + l);
        m4.setPosition(p.x, p.y + 0.21 + l * 0.44, p.z);
        im.setMatrixAt(n, m4);
        im.setColorAt(n, l === 1 ? colors[(p.stack % 2) * 2] : (l === 0 ? dark : colors[1]));
        n++;
      }
    }
    im.count = n;
    im.castShadow = true; im.receiveShadow = true;
    im.name = 'tires';
    root.add(im);
    disposables.push(tireGeo);
  }

  // Bridge piers
  {
    const pierGeo = new THREE.BoxGeometry(1, 1, 1);
    const pierMat = mat(new THREE.MeshStandardMaterial({ color: 0xd9d4c7, roughness: 0.85 }));
    const mats = [];
    for (const [a, b] of bridgeRuns) {
      const span = Math.round(26 / ds);
      for (let ii = a + Math.round(span / 2); ii < b - span / 3; ii += span) {
        const i = ii % N;
        const top = py[i] - 2.4, bottom = WATER_LEVEL - 12;
        const hgt = top - bottom;
        const m4 = new THREE.Matrix4().makeRotationY(head[i]);
        m4.scale(new THREE.Vector3(wallR[i] + wallL[i] - 2, hgt, 2.6));
        const off = (wallR[i] - wallL[i]) / 2;
        m4.setPosition(px[i] + rx[i] * off, bottom + hgt / 2, pz[i] + rz[i] * off);
        mats.push(m4);
      }
    }
    const im = new THREE.InstancedMesh(pierGeo, pierMat, Math.max(1, mats.length));
    mats.forEach((m4, k) => im.setMatrixAt(k, m4));
    im.count = mats.length;
    im.castShadow = true; im.receiveShadow = true;
    root.add(im);
    disposables.push(pierGeo);
  }

  // ------------------------------------------------------------------ boost pads & ramps
  const boostTex = TX.makeBoostTexture();
  const boostMat = mat(new THREE.MeshBasicMaterial({
    map: boostTex, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
  }));
  boostMat.color.setScalar(1.25);
  {
    const geos = boostPads.map((p) => extrude(p.s0, p.s0 + p.len, () => [[p.lat - p.hw, 0.04], [p.lat + p.hw, 0.04]], { across: [0, 1], alongScale: p.len * ds / 2 }));
    addMesh(mergeGeometries(geos), boostMat, { name: 'boostPads' });
    geos.forEach((g) => g.dispose());
  }
  {
    const rampMat = mat(new THREE.MeshStandardMaterial({ map: TX.makeRampTexture(), roughness: 0.5, side: THREE.DoubleSide }));
    const sideMat = mat(new THREE.MeshStandardMaterial({ color: 0xffc21a, roughness: 0.6, side: THREE.DoubleSide }));
    const tops = [], sides = [];
    for (const r of ramps) {
      const hAt = (ii) => r.h * clamp((ii - r.s0) / r.len, 0, 1);
      tops.push(extrude(r.s0, r.s0 + r.len, (i, ii) => [[-r.hw, hAt(ii) + 0.03], [r.hw, hAt(ii) + 0.03]], { across: [0, 1], alongScale: r.len * ds }));
      sides.push(extrude(r.s0, r.s0 + r.len, (i, ii) => [[r.hw, hAt(ii) + 0.03], [r.hw, -0.1]], { across: [0, 1] }));
      sides.push(extrude(r.s0, r.s0 + r.len, (i, ii) => [[-r.hw, -0.1], [-r.hw, hAt(ii) + 0.03]], { across: [0, 1] }));
      const e = (r.s0 + r.len) % N;
      sides.push(extrude(e, e + 0.001, (i, ii) => ii === e ? [[-r.hw, r.h + 0.03], [r.hw, r.h + 0.03]] : [[-r.hw, -0.1], [r.hw, -0.1]], { across: [0, 1] }));
    }
    addMesh(mergeGeometries(tops), rampMat, { cast: true, name: 'ramps' });
    addMesh(mergeGeometries(sides), sideMat, { cast: true, name: 'rampSides' });
    [...tops, ...sides].forEach((g) => g.dispose());
  }

  // ------------------------------------------------------------------ start line, grid, gantry
  const decalMat = (opts) => mat(new THREE.MeshStandardMaterial({ roughness: 0.7, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2, ...opts }));
  {
    const chk = TX.makeCheckerTexture(12, 2);
    const w = Math.max(2, Math.round(1.5 / ds));
    addMesh(extrude(N - w, N + w, () => [[-HALF_W, 0.02], [HALF_W, 0.02]], { across: [0, 1], alongScale: 2 * w * ds }), decalMat({ map: chk }), { name: 'startLine' });
    // grid slot brackets
    const slotGeos = [];
    for (const sp of startPositions) {
      const h = sp.heading;
      const fwd = new THREE.Vector3(Math.sin(h), 0, Math.cos(h));
      const right = new THREE.Vector3(-Math.cos(h), 0, Math.sin(h));
      const addBar = (w2, l2, offF, offR) => {
        const g = new THREE.PlaneGeometry(w2, l2).rotateX(-Math.PI / 2).rotateY(h);
        const c = sp.position.clone().addScaledVector(fwd, offF).addScaledVector(right, offR);
        g.translate(c.x, c.y + 0.025, c.z);
        slotGeos.push(g);
      };
      addBar(3.6, 0.35, 2.0, 0);
      addBar(0.3, 1.6, 1.3, 1.65);
      addBar(0.3, 1.6, 1.3, -1.65);
    }
    addMesh(mergeGeometries(slotGeos), decalMat({ color: 0xffffff }), { name: 'gridMarks' });
    slotGeos.forEach((g) => g.dispose());
  }

  // Gantry arch with banner + start lights
  const lamps = [];
  {
    const g = new THREE.Group();
    g.position.set(px[0], py[0], pz[0]);
    g.rotation.y = head[0];
    // local frame: +Z forward, +X = left (right is -X)
    const xL = wallL[0] + 2.2, xR = -(wallR[0] + 2.2);
    const pillarMat = mat(new THREE.MeshStandardMaterial({ map: TX.makeStripeTexture('#ffffff', '#e8322f', 10), roughness: 0.5 }));
    pillarMat.map.rotation = Math.PI / 2;
    const pGeo = new THREE.CylinderGeometry(0.9, 1.1, 12, 16);
    disposables.push(pGeo);
    for (const x of [xL, xR]) {
      const p = new THREE.Mesh(pGeo, pillarMat);
      p.position.set(x, 6, 0); p.castShadow = true; g.add(p);
    }
    const span = xL - xR + 2.5;
    const bannerTex = TX.makeBannerTexture('TURBO KART RALLY');
    disposables.push(bannerTex);
    const beamSide = mat(new THREE.MeshStandardMaterial({ color: 0xc81e1e, roughness: 0.5 }));
    const bannerMat = mat(new THREE.MeshStandardMaterial({ map: bannerTex, roughness: 0.5, emissive: 0x220000 }));
    const beamGeo = new THREE.BoxGeometry(span, 3, 1.4);
    disposables.push(beamGeo);
    const beam = new THREE.Mesh(beamGeo, [beamSide, beamSide, beamSide, beamSide, bannerMat, bannerMat]);
    beam.position.set((xL + xR) / 2, 11, 0); beam.castShadow = true;
    g.add(beam);
    // light housing facing the grid (-Z side)
    const houseGeo = new THREE.BoxGeometry(6.5, 2, 0.8);
    disposables.push(houseGeo);
    const house = new THREE.Mesh(houseGeo, mat(new THREE.MeshStandardMaterial({ color: 0x1b1d24, roughness: 0.4 })));
    house.position.set(0, 8.4, -0.4); g.add(house);
    const lampGeo = new THREE.SphereGeometry(0.62, 16, 12);
    disposables.push(lampGeo);
    for (let k = 0; k < 3; k++) {
      const lm = mat(new THREE.MeshStandardMaterial({ color: 0x331111, emissive: 0x000000, roughness: 0.3 }));
      const lamp = new THREE.Mesh(lampGeo, lm);
      lamp.position.set((k - 1) * 2, 8.4, -0.85);
      g.add(lamp); lamps.push(lm);
    }
    // checkered flags on top of pillars
    const flagGeo = new THREE.PlaneGeometry(3, 2, 1, 1).translate(1.5, 0, 0);
    disposables.push(flagGeo);
    const chkMat = mat(new THREE.MeshStandardMaterial({ map: TX.makeCheckerTexture(6, 4), side: THREE.DoubleSide, roughness: 0.8 }));
    for (const x of [xL, xR]) {
      const f = new THREE.Mesh(flagGeo, chkMat);
      f.position.set(x, 13.2, 0); f.rotation.y = Math.PI / 2;
      g.add(f);
    }
    root.add(g);
  }
  const setLamps = (n, color) => {
    lamps.forEach((m, k) => {
      const on = k < n;
      m.emissive.setHex(on ? color : 0x000000);
      m.emissiveIntensity = on ? 3 : 0;
      m.color.setHex(on ? color : 0x331111);
    });
  };
  let lampTimer = 0;
  const unsub = [
    bus.on('race:countdown', (d) => { const n = d && d.n; setLamps(n === 3 ? 1 : n === 2 ? 2 : 3, 0xff2a1a); lampTimer = 0; }),
    bus.on('race:go', () => { setLamps(3, 0x22ff55); lampTimer = 3; }),
  ];

  // ------------------------------------------------------------------ environment
  const layout = {
    N, ds, length, px, py, pz, rx, rz, tx, tz, head, kS, wallL, wallR, bridge, halfWidth: HALF_W,
    nearest: (x, z, noFallback = false) => { const i = nearestGrid(x, z, noFallback); return { i, d2: _nd2 }; },
    lake: LAKE, waterLevel: WATER_LEVEL,
    bounds: { minX, maxX, minZ, maxZ },
    boostPads, ramps, startPositions,
  };
  const env = createEnvironment(scene, renderer, root, layout);

  // ------------------------------------------------------------------ Track object
  Object.assign(track, {
    name: TRACK_NAME,
    curve,
    length,
    roadWidth: HALF_W * 2,
    startPositions,
    itemBoxPositions,
    minimap,
    getSurfaceInfo,
    resolveWall,
    getPointAt,
    getTangentAt,
    getRacingLine,
    // extras
    boostPads: boostPads.map((p) => ({ t: p.s0 / N, lateral: p.lat, length: p.len * ds, halfWidth: p.hw })),
    jumpRamps: ramps.map((r) => ({ t: r.s0 / N, length: r.len * ds, halfWidth: r.hw, height: r.h })),
    waterLevel: WATER_LEVEL,
    sunLight: env.sunLight,
    getWallOffsets(t) {
      const s = (((t % 1) + 1) % 1) * N, a = Math.floor(s) % N, b = (a + 1) % N, f = s - Math.floor(s);
      return { left: lerpArr(wallL, a, b, f), right: lerpArr(wallR, a, b, f) };
    },
    setShadowFocus(v) { env.setShadowFocus(v); },
    update(dt, time) {
      try {
        const tt = typeof time === 'number' ? time : 0;
        boostTex.offset.y = -((tt * 1.6) % 1);
        if (lampTimer > 0) { lampTimer -= dt || 0; if (lampTimer <= 0) setLamps(0, 0); }
        env.update(dt || 0, tt);
      } catch (e) { /* never throw in the frame loop */ }
    },
    dispose() {
      unsub.forEach((u) => u && u());
      env.dispose();
      root.traverse((o) => {
        if (o.isInstancedMesh) o.dispose();
      });
      disposables.forEach((d) => d && d.dispose && d.dispose());
      scene.remove(root);
    },
  });
  return track;
}
