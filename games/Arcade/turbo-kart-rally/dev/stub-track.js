// Throwaway stub track for driving tests (implements the §1 Track contract).
import * as THREE from 'three';

export function createStubTrack(scene) {
  const ctrl = [
    [0, 0, 0], [0, 0, 120], [10, 2, 220], [60, 6, 280], [140, 6, 290], [200, 3, 240],
    [210, 0, 160], [170, 0, 110], [150, 0, 60], [200, 0, 0], [220, 4, -80], [170, 8, -150],
    [80, 4, -160], [20, 0, -110],
  ].map(([x, y, z]) => new THREE.Vector3(x, y, z));
  const curve = new THREE.CatmullRomCurve3(ctrl, true, 'centripetal');
  const length = curve.getLength();
  const roadWidth = 24;
  const halfW = roadWidth / 2;
  const offroad = 8;
  const N = 2400;
  const pts = [], tans = [], rights = [];
  for (let i = 0; i < N; i++) {
    const t = i / N;
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const flat = new THREE.Vector3(tg.x, 0, tg.z).normalize();
    pts.push(p); tans.push(tg.clone().normalize());
    rights.push(new THREE.Vector3(-flat.z, 0, flat.x));
  }
  // racing line: offset toward inside of curves
  const curv = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const a = tans[(i - 20 + N) % N], b = tans[(i + 20) % N];
    const ha = Math.atan2(a.x, a.z), hb = Math.atan2(b.x, b.z);
    curv[i] = Math.atan2(Math.sin(hb - ha), Math.cos(hb - ha)); // + = left turn
  }
  const off = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    let s = 0;
    for (let k = -60; k <= 60; k++) s += curv[(i + k + N) % N];
    off[i] = THREE.MathUtils.clamp((s / 121) * 30, -7, 7); // left turn => move left (negative lateral)
  }
  const racing = pts.map((p, i) => p.clone().addScaledVector(rights[i], -off[i]));

  const idx = (t) => ((Math.round(t * N) % N) + N) % N;
  const boosts = [0.06, 0.52];
  const jumps = [0.33];
  const startT = 0.985;

  function nearest(pos, hintT) {
    let best = -1, bestD = Infinity;
    const scan = (from, to) => {
      for (let j = from; j <= to; j++) {
        const i = ((j % N) + N) % N;
        const p = pts[i];
        const d = (p.x - pos.x) ** 2 + (p.z - pos.z) ** 2;
        if (d < bestD) { bestD = d; best = i; }
      }
    };
    if (Number.isFinite(hintT)) {
      const c = idx(hintT);
      scan(c - 80, c + 80);
      const e = ((best - c + N + N / 2) % N) - N / 2; if (bestD > 60 * 60 || Math.abs(e) >= 79) { bestD = Infinity; scan(0, N - 1); }
    } else scan(0, N - 1);
    return best;
  }

  const upV = new THREE.Vector3();
  const track = {
    name: 'Stub Oval',
    curve, length, roadWidth,
    getPointAt: (t) => curve.getPointAt(((t % 1) + 1) % 1),
    getTangentAt: (t) => curve.getTangentAt(((t % 1) + 1) % 1),
    getRacingLine: (t) => racing[idx(((t % 1) + 1) % 1)].clone(),
    getSurfaceInfo(pos, hintT) {
      const i = nearest(pos, hintT);
      const p = pts[i], r = rights[i];
      const lateral = (pos.x - p.x) * r.x + (pos.z - p.z) * r.z;
      const t = i / N;
      const normal = new THREE.Vector3().crossVectors(r, tans[i]).normalize();
      if (normal.y < 0) normal.negate();
      let surface = Math.abs(lateral) <= halfW ? 'road' : 'offroad';
      if (surface === 'road') {
        for (const b of boosts) if (Math.abs(t - b) * length < 3 && Math.abs(lateral) < 3) surface = 'boost';
        for (const j of jumps) if (Math.abs(t - j) * length < 2 && Math.abs(lateral) < halfW - 2) surface = 'jump';
      }
      return { height: p.y, normal, surface, t, lateral, onRoad: Math.abs(lateral) <= halfW };
    },
    resolveWall(pos, radius) {
      const i = nearest(pos, undefined);
      const p = pts[i], r = rights[i];
      track._lastT = i / N;
      const lateral = (pos.x - p.x) * r.x + (pos.z - p.z) * r.z;
      const wall = halfW + offroad;
      const depth = Math.abs(lateral) + radius - wall;
      if (depth <= 0) return null;
      const normal = r.clone().multiplyScalar(-Math.sign(lateral));
      return { normal, depth };
    },
    startPositions: [],
    itemBoxPositions: [],
    minimap: { points: [], bounds: { minX: 0, maxX: 0, minZ: 0, maxZ: 0 } },
    update() {},
    dispose() {},
  };
  track._lastT = 0;
  // grid
  const t0 = curve.getPointAt(startT), tg0 = curve.getTangentAt(startT);
  const h0 = Math.atan2(tg0.x, tg0.z);
  const r0 = rights[idx(startT)];
  for (let k = 0; k < 8; k++) {
    const row = Math.floor(k / 2), col = k % 2;
    const pos = t0.clone().addScaledVector(new THREE.Vector3(tg0.x, 0, tg0.z).normalize(), -row * 6)
      .addScaledVector(r0, col ? 3.5 : -3.5);
    track.startPositions.push({ position: pos, heading: h0 });
  }

  // visuals
  const verts = [], cols = [];
  for (let i = 0; i <= N; i++) {
    const k = i % N, p = pts[k], r = rights[k];
    const a = p.clone().addScaledVector(r, -halfW), b = p.clone().addScaledVector(r, halfW);
    verts.push(a.x, a.y + 0.02, a.z, b.x, b.y + 0.02, b.z);
    const t = k / N;
    let c = [0.3, 0.3, 0.33];
    for (const bb of boosts) if (Math.abs(t - bb) * length < 3) c = [1, 0.6, 0];
    for (const j of jumps) if (Math.abs(t - j) * length < 2) c = [0.2, 0.5, 1];
    if (k === idx(0)) c = [1, 1, 1];
    cols.push(...c, ...c);
  }
  const index = [];
  for (let i = 0; i < N; i++) { const a = i * 2; index.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  g.setIndex(index);
  g.computeVertexNormals();
  const road = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide }));
  scene.add(road);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshLambertMaterial({ color: 0x3a7a30 }));
  ground.rotation.x = -Math.PI / 2; ground.position.y = -0.5;
  scene.add(ground);
  for (const side of [-1, 1]) {
    const wp = [];
    for (let i = 0; i <= N; i += 4) {
      const k = i % N;
      const p = pts[k].clone().addScaledVector(rights[k], side * (halfW + offroad));
      wp.push(p.x, p.y + 1, p.z);
    }
    const lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.Float32BufferAttribute(wp, 3));
    scene.add(new THREE.Line(lg, new THREE.LineBasicMaterial({ color: 0xffffff })));
  }
  const rl = new THREE.BufferGeometry().setFromPoints(racing.filter((_, i) => i % 6 === 0));
  scene.add(new THREE.LineLoop(rl, new THREE.LineBasicMaterial({ color: 0xffff00 })));
  return track;
}

export function createStubModel(character) {
  const root = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 2.4), new THREE.MeshLambertMaterial({ color: character.color }));
  body.position.y = 0.5;
  root.add(body);
  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.4, 0.5), new THREE.MeshLambertMaterial({ color: 0xffffff }));
  nose.position.set(0, 0.6, 1.3);
  root.add(nose);
  const anchors = {};
  for (const [k, x, y, z] of [['exhaustL', 0.4, 0.5, -1.2], ['exhaustR', -0.4, 0.5, -1.2], ['wheelRL', 0.8, 0.3, -0.8],
    ['wheelRR', -0.8, 0.3, -0.8], ['wheelFL', 0.8, 0.3, 0.8], ['wheelFR', -0.8, 0.3, 0.8], ['itemHold', 0, 0.6, -2]]) {
    const o = new THREE.Object3D(); o.position.set(x, y, z); root.add(o); anchors[k] = o;
  }
  const model = {
    root, anchors,
    last: null,
    animate(s) { model.last = s; body.material.emissive?.setHex(s.star ? 0x886600 : s.boosting ? 0x552200 : 0); },
    setShrunk(sc) { root.scale.setScalar(sc); },
    dispose() {},
  };
  return model;
}
