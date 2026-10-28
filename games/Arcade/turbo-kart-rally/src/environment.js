// Environment (Agent 1 — World): sky, lights, fog, terrain, water, mountains, clouds,
// vegetation, grandstands + crowd, waving flags, lighthouse, boats.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const smoothstep = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;

function hash(ix, iz) {
  let h = Math.imul(ix | 0, 374761393) ^ Math.imul(iz | 0, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
function vnoise(x, z) {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x - ix, fz = z - iz;
  const u = fx * fx * (3 - 2 * fx), v = fz * fz * (3 - 2 * fz);
  const a = hash(ix, iz), b = hash(ix + 1, iz), c = hash(ix, iz + 1), d = hash(ix + 1, iz + 1);
  return lerp(lerp(a, b, u), lerp(c, d, u), v);
}
function fbm(x, z, oct = 4) {
  let s = 0, a = 0.5, f = 1, norm = 0;
  for (let o = 0; o < oct; o++) { s += a * vnoise(x * f + o * 17.3, z * f - o * 9.1); norm += a; f *= 2.03; a *= 0.5; }
  return s / norm;
}
function mulberry(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Paint a whole geometry with one vertex colour (so several parts can be merged).
function paint(geo, color) {
  const g = geo.index ? geo.toNonIndexed() : geo;
  const n = g.attributes.position.count;
  const c = new Float32Array(n * 3);
  const col = new THREE.Color(color);
  for (let i = 0; i < n; i++) { c[i * 3] = col.r; c[i * 3 + 1] = col.g; c[i * 3 + 2] = col.b; }
  g.setAttribute('color', new THREE.BufferAttribute(c, 3));
  if (g !== geo) geo.dispose();
  return g;
}
const stripUV = (g) => { g.deleteAttribute('uv'); return g; };

export function createEnvironment(scene, renderer, root, L) {
  const disposables = [];
  const keep = (x) => { disposables.push(x); return x; };
  const uniforms = { uTime: { value: 0 } };
  const WATER = L.waterLevel;

  const SUN_DIR = new THREE.Vector3(0.32, 0.78, -0.54).normalize();
  const COL = {
    top: new THREE.Color(0x2f7fe0),
    horizon: new THREE.Color(0xcfe8fb),
    bottom: new THREE.Color(0x9cc9ea),
    sun: new THREE.Color(0xfff2cf),
  };

  // island centre
  const cx = (L.bounds.minX + L.bounds.maxX) / 2, cz = (L.bounds.minZ + L.bounds.maxZ) / 2;
  const ISLAND_R = 760;

  // ------------------------------------------------------------------ sky dome
  const skyMat = keep(new THREE.ShaderMaterial({
    uniforms: {
      uTop: { value: COL.top }, uHorizon: { value: COL.horizon }, uBottom: { value: COL.bottom },
      uSunDir: { value: SUN_DIR }, uSunColor: { value: COL.sun },
    },
    vertexShader: /* glsl */`
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position = vec4(p.xy, p.w * 0.99999, p.w);
      }`,
    fragmentShader: /* glsl */`
      uniform vec3 uTop; uniform vec3 uHorizon; uniform vec3 uBottom; uniform vec3 uSunDir; uniform vec3 uSunColor;
      varying vec3 vDir;
      void main() {
        vec3 d = normalize(vDir);
        float y = d.y;
        vec3 col = y > 0.0 ? mix(uHorizon, uTop, pow(smoothstep(0.0, 0.55, y), 0.75)) : mix(uHorizon, uBottom, smoothstep(0.0, -0.15, y));
        float sd = max(dot(d, uSunDir), 0.0);
        col += uSunColor * (smoothstep(0.9993, 0.9996, sd) * 4.0 + pow(sd, 60.0) * 0.45 + pow(sd, 6.0) * 0.12);
        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }`,
    side: THREE.BackSide, depthWrite: false, depthTest: false, toneMapped: false, fog: false,
  }));
  const skyGeo = keep(new THREE.SphereGeometry(900, 48, 24));
  const makeSky = () => {
    const m = new THREE.Mesh(skyGeo, skyMat);
    m.frustumCulled = false; m.renderOrder = -1000; m.name = 'sky';
    m.onBeforeRender = (r, s, cam) => { m.position.copy(cam.position); m.updateMatrixWorld(); };
    return m;
  };
  root.add(makeSky());

  // env map from the sky for PBR materials (karts)
  let envRT = null;
  const prevEnv = scene.environment, prevBg = scene.background, prevFog = scene.fog;
  try {
    if (renderer && renderer.isWebGLRenderer) {
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envScene = new THREE.Scene();
      envScene.add(makeSky());
      const ground = new THREE.Mesh(new THREE.CircleGeometry(400, 24).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x5d9a44 }));
      ground.position.y = -20; envScene.add(ground);
      envRT = pmrem.fromScene(envScene, 0.02, 0.1, 2000);
      ground.geometry.dispose(); ground.material.dispose();
      pmrem.dispose();
      scene.environment = envRT.texture;
      if ('environmentIntensity' in scene) scene.environmentIntensity = 0.55;
    }
  } catch (e) { envRT = null; }
  scene.background = COL.horizon.clone();
  scene.fog = new THREE.Fog(COL.horizon.clone(), 380, 1550);

  // ------------------------------------------------------------------ lights
  const hemi = new THREE.HemisphereLight(0xcfe8ff, 0x7aa05a, 1.25);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xfff0d8, 2.8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const SH = 75;
  Object.assign(sun.shadow.camera, { left: -SH, right: SH, top: SH, bottom: -SH, near: 1, far: 600 });
  sun.shadow.camera.updateProjectionMatrix();
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.04;
  scene.add(sun);
  scene.add(sun.target);
  const texel = (SH * 2) / 2048;
  function setShadowFocus(v) {
    if (!v || !isFinite(v.x)) return;
    const fx = Math.round(v.x / texel) * texel, fz = Math.round(v.z / texel) * texel;
    sun.target.position.set(fx, v.y || 0, fz);
    sun.position.set(fx, v.y || 0, fz).addScaledVector(SUN_DIR, 250);
    sun.target.updateMatrixWorld();
  }
  setShadowFocus(L.startPositions[0]?.position || new THREE.Vector3());

  // ------------------------------------------------------------------ terrain
  function natural(x, z) {
    const dx = x - cx, dz = z - cz;
    const r = Math.hypot(dx, dz) / ISLAND_R;
    let h = 1.2 + 4.5 * fbm(x * 0.0075, z * 0.0075) + 9 * Math.pow(fbm(x * 0.004 - 20, z * 0.004 + 13, 3), 2.2);
    const ang = Math.atan2(dz, dx);
    const hillMask = smoothstep(0.58, 0.8, r) * (1 - smoothstep(0.86, 0.95, r)) * (0.45 + 0.55 * Math.max(0, Math.sin(ang * 3 + 1.3)));
    h += hillMask * (14 + 34 * fbm(x * 0.012 + 3, z * 0.012 - 7));
    h = lerp(h, -16, smoothstep(0.9, 1.06, r));
    const dl = Math.hypot(x - L.lake.x, z - L.lake.z);
    h = lerp(h, -9 - 3 * fbm(x * 0.03, z * 0.03), 1 - smoothstep(L.lake.r * 0.72, L.lake.r + 14, dl));
    return h;
  }
  const corridor = { w: 0, y: 0, d: 0, wall: 0, i: -1 };
  function corridorAt(x, z) {
    const q = L.nearest(x, z, true);
    corridor.i = q.i;
    if (q.i < 0) { corridor.w = 0; corridor.d = 1e9; return corridor; }
    const i = q.i, d = Math.sqrt(q.d2);
    const lat = (x - L.px[i]) * L.rx[i] + (z - L.pz[i]) * L.rz[i];
    const wall = lat >= 0 ? L.wallR[i] : L.wallL[i];
    corridor.d = d; corridor.wall = wall; corridor.y = L.py[i];
    corridor.w = (1 - smoothstep(wall + 4, wall + 58, d)) * (1 - L.bridge[i]);
    return corridor;
  }
  function heightAt(x, z) {
    const n = natural(x, z);
    const c = corridorAt(x, z);
    return c.w > 0 ? lerp(n, c.y - 0.6, c.w) : n;
  }

  const T_SIZE = 1900, T_SEG = 280;
  const tGeo = keep(new THREE.PlaneGeometry(T_SIZE, T_SIZE, T_SEG, T_SEG).rotateX(-Math.PI / 2));
  tGeo.translate(cx, 0, cz);
  const tPos = tGeo.attributes.position;
  const tCol = new Float32Array(tPos.count * 3);
  const near = new Float32Array(tPos.count);
  const res = T_SEG + 1;
  const depthData = new Uint8Array(res * res * 4);
  for (let k = 0; k < tPos.count; k++) {
    const x = tPos.getX(k), z = tPos.getZ(k);
    const h = heightAt(x, z);
    tPos.setY(k, h);
    near[k] = corridor.w;
  }
  tGeo.computeVertexNormals();
  {
    const c = new THREE.Color();
    const sandWet = new THREE.Color(0xcdb277), sand = new THREE.Color(0xf1dca0);
    const g1 = new THREE.Color(0x58ad37), g2 = new THREE.Color(0x8fd352), g3 = new THREE.Color(0x3f8a2e);
    const rock = new THREE.Color(0x9c9588), under = new THREE.Color(0x8fae8f);
    const nrm = tGeo.attributes.normal;
    for (let k = 0; k < tPos.count; k++) {
      const x = tPos.getX(k), y = tPos.getY(k), z = tPos.getZ(k);
      const n1 = fbm(x * 0.02, z * 0.02, 3);
      c.copy(g1).lerp(g2, smoothstep(0.35, 0.7, n1));
      c.lerp(g3, smoothstep(14, 30, y) * 0.8);
      c.lerp(g2, near[k] * 0.35);
      const slope = 1 - nrm.getY(k);
      c.lerp(rock, smoothstep(0.22, 0.4, slope));
      const beach = (1 - smoothstep(WATER + 1.6, WATER + 3.2, y)) * (1 - smoothstep(0.02, 0.2, near[k]));
      c.lerp(sand, beach);
      c.lerp(sandWet, (1 - smoothstep(WATER - 0.5, WATER + 0.6, y)) * (1 - near[k]));
      c.lerp(under, smoothstep(WATER - 1, WATER - 8, y) * 0.5);
      tCol[k * 3] = c.r; tCol[k * 3 + 1] = c.g; tCol[k * 3 + 2] = c.b;
    }
    // depth texture for water shading (PlaneGeometry rows run -z..+z after rotateX)
    for (let k = 0; k < tPos.count; k++) {
      const col = k % res, row = Math.floor(k / res);
      const x = tPos.getX(k), z = tPos.getZ(k);
      const ix = col, iz = Math.round((z - (cz - T_SIZE / 2)) / T_SIZE * T_SEG);
      const depth = Math.min(1, Math.max(0, (WATER - tPos.getY(k)) / 9));
      const o = (iz * res + ix) * 4;
      depthData[o] = depth * 255; depthData[o + 1] = 0; depthData[o + 2] = 0; depthData[o + 3] = 255;
      void row; void x;
    }
  }
  tGeo.setAttribute('color', new THREE.BufferAttribute(tCol, 3));
  const detail = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#e8e8e8'; ctx.fillRect(0, 0, 256, 256);
    const rnd = mulberry(7);
    for (let i = 0; i < 7000; i++) {
      ctx.fillStyle = ['#d2d2d2', '#f6f6f6', '#dcdcdc', '#c4c4c4'][(rnd() * 4) | 0];
      ctx.fillRect(rnd() * 256, rnd() * 256, 1 + rnd() * 2, 1 + rnd() * 2.5);
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8; t.colorSpace = THREE.SRGBColorSpace;
    t.repeat.set(T_SIZE / 9, T_SIZE / 9);
    return keep(t);
  })();
  const terrainMat = keep(new THREE.MeshLambertMaterial({ vertexColors: true, map: detail }));
  const terrain = new THREE.Mesh(tGeo, terrainMat);
  terrain.receiveShadow = true; terrain.name = 'terrain';
  root.add(terrain);

  // ------------------------------------------------------------------ water
  const depthTex = keep(new THREE.DataTexture(depthData, res, res, THREE.RGBAFormat));
  depthTex.magFilter = THREE.LinearFilter; depthTex.minFilter = THREE.LinearFilter;
  depthTex.needsUpdate = true;
  const waterMat = keep(new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, {
      uTime: { value: 0 },
      uSunDir: { value: SUN_DIR.clone() },
      uDeep: { value: new THREE.Color(0x0f6fb3) },
      uShallow: { value: new THREE.Color(0x3fd6d0) },
      uSky: { value: new THREE.Color(0xc4e6ff) },
      uFoam: { value: new THREE.Color(0xffffff) },
      uDepth: { value: null },
      uBounds: { value: new THREE.Vector3(cx - T_SIZE / 2, cz - T_SIZE / 2, T_SIZE) },
    }]),
    vertexShader: /* glsl */`
      varying vec3 vWorld;
      #include <fog_pars_vertex>
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorld = wp.xyz;
        vec4 mvPosition = viewMatrix * wp;
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }`,
    fragmentShader: /* glsl */`
      uniform float uTime; uniform vec3 uSunDir; uniform vec3 uDeep; uniform vec3 uShallow; uniform vec3 uSky; uniform vec3 uFoam;
      uniform sampler2D uDepth; uniform vec3 uBounds;
      varying vec3 vWorld;
      #include <fog_pars_fragment>
      float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float vn(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
        return mix(mix(h21(i), h21(i + vec2(1, 0)), f.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), f.x), f.y); }
      vec2 waveGrad(vec2 p, float t) {
        vec2 g = vec2(0.0);
        vec2 d1 = normalize(vec2(0.7, 0.4)), d2 = normalize(vec2(-0.3, 0.9)), d3 = normalize(vec2(0.9, -0.5)), d4 = normalize(vec2(-0.8, -0.3));
        g += d1 * cos(dot(p, d1) * 0.11 + t * 1.3) * 0.22;
        g += d2 * cos(dot(p, d2) * 0.19 + t * 1.7) * 0.16;
        g += d3 * cos(dot(p, d3) * 0.37 + t * 2.3) * 0.10;
        g += d4 * cos(dot(p, d4) * 0.61 + t * 2.9) * 0.07;
        float e = 0.35;
        vec2 q = p * 0.35 + vec2(t * 0.4, t * 0.25);
        float n0 = vn(q), nx = vn(q + vec2(e, 0.0)), nz = vn(q + vec2(0.0, e));
        g += vec2(nx - n0, nz - n0) / e * 0.18;
        return g;
      }
      void main() {
        vec2 p = vWorld.xz;
        vec2 g = waveGrad(p, uTime);
        vec3 n = normalize(vec3(-g.x, 1.0, -g.y));
        vec3 V = normalize(cameraPosition - vWorld);
        float fres = pow(1.0 - max(dot(n, V), 0.0), 4.0);
        vec2 duv = (p - uBounds.xy) / uBounds.z;
        float depth = 1.0;
        if (duv.x > 0.0 && duv.x < 1.0 && duv.y > 0.0 && duv.y < 1.0) depth = texture2D(uDepth, duv).r;
        vec3 col = mix(uShallow, uDeep, smoothstep(0.02, 0.55, depth));
        col = mix(col, uSky, clamp(fres * 0.75, 0.0, 0.75));
        vec3 H = normalize(uSunDir + V);
        float spec = pow(max(dot(n, H), 0.0), 260.0) * 3.0;
        float sparkle = step(0.985, vn(p * 1.7 + uTime * 0.8)) * pow(max(dot(n, H), 0.0), 20.0) * 1.5;
        float foamBand = smoothstep(0.1, 0.0, depth);
        float foamWave = 0.55 + 0.45 * sin(depth * 70.0 - uTime * 2.2 + vn(p * 0.25) * 6.0);
        float foam = clamp(foamBand * foamWave + smoothstep(0.03, 0.0, depth), 0.0, 1.0) * step(0.001, depth + 0.001);
        col = mix(col, uFoam, foam * 0.9);
        col += (spec + sparkle) * vec3(1.0, 0.96, 0.85);
        float alpha = mix(0.62, 0.96, smoothstep(0.0, 0.35, depth));
        alpha = max(alpha, foam);
        gl_FragColor = vec4(col, alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        #include <fog_fragment>
      }`,
    transparent: true, fog: true, depthWrite: true,
  }));
  waterMat.uniforms.uDepth.value = depthTex;
  const waterGeo = keep(new THREE.PlaneGeometry(9000, 9000, 1, 1).rotateX(-Math.PI / 2));
  const water = new THREE.Mesh(waterGeo, waterMat);
  water.position.set(cx, WATER, cz);
  water.name = 'water';
  water.renderOrder = 1;
  root.add(water);

  // ------------------------------------------------------------------ mountains (distant, own haze)
  {
    const rnd = mulberry(99);
    const geos = [];
    const haze = COL.horizon.clone();
    const grass = new THREE.Color(0x4f8f45), rockC = new THREE.Color(0x8b8f9c), snow = new THREE.Color(0xf6f9ff);
    const count = 22;
    for (let m = 0; m < count; m++) {
      const ang = (m / count) * Math.PI * 2 + rnd() * 0.2;
      const dist = 1080 + rnd() * 380;
      const rad = 140 + rnd() * 170, hgt = 170 + rnd() * 260;
      const g = new THREE.ConeGeometry(rad, hgt, 11, 6).toNonIndexed();
      const pos = g.attributes.position;
      const seed = rnd() * 100;
      const colors = new Float32Array(pos.count * 3);
      const c = new THREE.Color();
      for (let k = 0; k < pos.count; k++) {
        let x = pos.getX(k), y = pos.getY(k), z = pos.getZ(k);
        const hr = (y + hgt / 2) / hgt;
        const a = Math.atan2(z, x);
        const nn = fbm(Math.cos(a) * 2 + seed, Math.sin(a) * 2 + hr * 3, 3);
        const s = 1 + (nn - 0.5) * 0.7 * (1 - hr);
        x *= s; z *= s; y += (nn - 0.5) * hgt * 0.12 * (1 - hr) * hr * 4;
        pos.setXYZ(k, x, y, z);
      }
      // colours by height of each triangle (flat)
      for (let k = 0; k < pos.count; k += 3) {
        const yy = (pos.getY(k) + pos.getY(k + 1) + pos.getY(k + 2)) / 3;
        const hr = (yy + hgt / 2) / hgt + (rnd() - 0.5) * 0.08;
        c.copy(hr < 0.45 ? grass : hr < 0.74 ? rockC : snow);
        if (hr >= 0.45 && hr < 0.74) c.lerp(grass, (0.74 - hr) * 1.2);
        c.lerp(haze, 0.3 + 0.15 * (dist - 1080) / 380);
        for (let j = 0; j < 3; j++) { colors[(k + j) * 3] = c.r; colors[(k + j) * 3 + 1] = c.g; colors[(k + j) * 3 + 2] = c.b; }
      }
      g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      g.deleteAttribute('uv');
      g.computeVertexNormals();
      g.translate(cx + Math.cos(ang) * dist, hgt / 2 - 25, cz + Math.sin(ang) * dist);
      geos.push(g);
    }
    const mg = keep(mergeGeometries(geos));
    geos.forEach((g) => g.dispose());
    const mm = new THREE.Mesh(mg, keep(new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, fog: false })));
    mm.name = 'mountains';
    root.add(mm);
  }

  // ------------------------------------------------------------------ clouds
  const cloudGroup = new THREE.Group();
  cloudGroup.position.set(cx, 0, cz);
  root.add(cloudGroup);
  {
    const rnd = mulberry(5);
    const parts = [];
    for (let k = 0; k < 7; k++) {
      const s = 7 + rnd() * 7;
      const g = new THREE.IcosahedronGeometry(s, 1);
      g.scale(1, 0.72, 1);
      g.translate((k - 3) * 7 + rnd() * 4, (3 - Math.abs(k - 3)) * 2.5 + rnd() * 3, rnd() * 10 - 5);
      parts.push(stripUV(g));
    }
    const cg = keep(mergeGeometries(parts));
    parts.forEach((g) => g.dispose());
    const cm = keep(new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0x9aa8bb, flatShading: true, fog: false }));
    const COUNT = 34;
    const im = new THREE.InstancedMesh(cg, cm, COUNT);
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
    for (let k = 0; k < COUNT; k++) {
      const a = rnd() * Math.PI * 2, r = 250 + rnd() * 800;
      p.set(Math.cos(a) * r, 190 + rnd() * 160, Math.sin(a) * r);
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rnd() * Math.PI);
      const sc = 1.2 + rnd() * 2.2;
      s.set(sc, sc * (0.8 + rnd() * 0.4), sc);
      im.setMatrixAt(k, m4.compose(p, q, s));
    }
    im.frustumCulled = false;
    cloudGroup.add(im);
  }

  // ------------------------------------------------------------------ placement helpers
  const standZones = [];   // {i0, i1, side, depth} along-sample ranges with grandstands
  const inStand = (i, lat, d, wall) => {
    for (const z of standZones) {
      const inRange = z.i0 <= z.i1 ? (i >= z.i0 && i <= z.i1) : (i >= z.i0 || i <= z.i1);
      if (inRange && Math.sign(lat) === z.side && d < wall + z.depth) return true;
    }
    return false;
  };
  function spot(x, z, minClear) {
    const q = L.nearest(x, z, true);
    if (q.i < 0) return { ok: true, d: 1e9, i: -1 };
    const i = q.i, d = Math.sqrt(q.d2);
    const lat = (x - L.px[i]) * L.rx[i] + (z - L.pz[i]) * L.rz[i];
    const wall = lat >= 0 ? L.wallR[i] : L.wallL[i];
    if (d < wall + minClear) return { ok: false };
    if (inStand(i, lat, d, wall)) return { ok: false };
    return { ok: true, d: d - wall, i };
  }

  // ------------------------------------------------------------------ grandstands + crowd
  const shaderHooks = [];
  const withTime = (material, vertexPatch) => {
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uniforms.uTime;
      shader.vertexShader = 'uniform float uTime;\n' + shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n' + vertexPatch);
    };
    shaderHooks.push(material);
    return material;
  };
  {
    const rnd = mulberry(123);
    const nSteps = (m) => Math.round(m / L.ds);
    const defs = [
      { from: -150, to: 70, side: 1, tiers: 8 },
      { from: -70, to: 45, side: -1, tiers: 6 },
    ];
    const standGeos = [];
    const crowd = [];
    const seatCols = [0x1e6fe8, 0xf7f7f7, 0xe8322f, 0xffd21f];
    const SEG_LEN = 10;
    for (const def of defs) {
      const i0 = ((nSteps(def.from) % L.N) + L.N) % L.N, i1 = ((nSteps(def.to) % L.N) + L.N) % L.N;
      const depth = 4 + def.tiers * 1.6 + 4;
      standZones.push({ i0, i1, side: def.side, depth });
      const segSamples = nSteps(SEG_LEN);
      const total = nSteps(def.to - def.from);
      for (let k = 0; k <= total - segSamples; k += segSamples) {
        const i = (i0 + k + Math.floor(segSamples / 2)) % L.N;
        const wall = def.side > 0 ? L.wallR[i] : L.wallL[i];
        const base = new THREE.Vector3(L.px[i], L.py[i], L.pz[i]);
        const right = new THREE.Vector3(L.rx[i], 0, L.rz[i]).multiplyScalar(def.side); // outward
        const rotY = Math.atan2(right.x, right.z);   // local +Z = outward, local X along track
        const place = (g, lx, ly, lz) => {
          g.rotateY(rotY);
          const off = right.clone().multiplyScalar(wall + 3 + lz);
          const along = new THREE.Vector3(-right.z, 0, right.x).multiplyScalar(lx);
          g.translate(base.x + off.x + along.x, base.y + ly, base.z + off.z + along.z);
          return g;
        };
        // front wall
        standGeos.push(place(paint(stripUV(new THREE.BoxGeometry(SEG_LEN + 0.05, 4, 0.5)), 0xdad7cf), 0, -1, 0));
        for (let t = 0; t < def.tiers; t++) {
          const top = 1 + t * 0.85;
          standGeos.push(place(paint(stripUV(new THREE.BoxGeometry(SEG_LEN + 0.05, top + 3, 1.6)), seatCols[(t + (k / segSamples | 0)) % 4]), 0, (top - 3) / 2, 0.5 + t * 1.6 + 0.8));
          // crowd on this tier
          for (let c = 0; c < 6; c++) {
            if (rnd() < 0.12) continue;
            crowd.push({
              p: base.clone().addScaledVector(right, wall + 3 + 0.5 + t * 1.6 + 0.8 + (rnd() - 0.5) * 0.3)
                .addScaledVector(new THREE.Vector3(-right.z, 0, right.x), (c - 2.5) * (SEG_LEN / 6) + (rnd() - 0.5) * 0.6)
                .setY(base.y + top),
              rot: rotY + Math.PI,
            });
          }
        }
        const backZ = 0.5 + def.tiers * 1.6 + 0.3;
        const roofY = 1 + def.tiers * 0.85 + 4.2;
        standGeos.push(place(paint(stripUV(new THREE.BoxGeometry(SEG_LEN + 0.05, roofY + 3, 0.6)), 0xcfcac0), 0, (roofY - 3) / 2, backZ));
        // roof (sloped canopy) + pillars
        const roof = paint(stripUV(new THREE.BoxGeometry(SEG_LEN + 0.1, 0.4, def.tiers * 1.6 + 3)), (k / segSamples | 0) % 2 ? 0xe8322f : 0xffffff);
        roof.rotateX(-0.08);
        standGeos.push(place(roof, 0, roofY, backZ - (def.tiers * 1.6 + 3) / 2 + 0.3));
        standGeos.push(place(paint(stripUV(new THREE.CylinderGeometry(0.18, 0.18, roofY - 1, 6)), 0x9aa0a8), -SEG_LEN / 2 + 0.3, (roofY - 1) / 2 + 1, 0.5));
      }
    }
    const sg = keep(mergeGeometries(standGeos));
    standGeos.forEach((g) => g.dispose());
    const stands = new THREE.Mesh(sg, keep(new THREE.MeshLambertMaterial({ vertexColors: true })));
    stands.castShadow = true; stands.receiveShadow = true; stands.name = 'grandstands';
    root.add(stands);

    // crowd: body + head instanced, bouncing via shader
    const bodyGeo = keep(new THREE.CylinderGeometry(0.28, 0.36, 0.95, 6, 1, true).translate(0, 0.55, 0));
    const headGeo = keep(new THREE.SphereGeometry(0.27, 6, 4).translate(0, 1.28, 0));
    const bounce = `
      #ifdef USE_INSTANCING
        float ph = instanceMatrix[3].x * 1.37 + instanceMatrix[3].z * 0.71;
        float jumper = step(0.45, fract(ph * 0.173));
        transformed.y += jumper * max(0.0, sin(uTime * (7.0 + fract(ph) * 3.0) + ph)) * 0.38;
      #endif`;
    const bodyMat = keep(withTime(new THREE.MeshLambertMaterial(), bounce));
    const headMat = keep(withTime(new THREE.MeshLambertMaterial(), bounce));
    const bodies = new THREE.InstancedMesh(bodyGeo, bodyMat, crowd.length);
    const heads = new THREE.InstancedMesh(headGeo, headMat, crowd.length);
    const shirt = [0xe53935, 0x43a047, 0x1e88e5, 0xfdd835, 0x8e24aa, 0xff7043, 0x00acc1, 0xf06292, 0xffffff];
    const skin = [0xffd2a6, 0xf1c08b, 0xc68a5a, 0x8d5a3b, 0xffe0bd];
    const m4 = new THREE.Matrix4(), c = new THREE.Color();
    crowd.forEach((cr, k) => {
      m4.makeRotationY(cr.rot).setPosition(cr.p);
      bodies.setMatrixAt(k, m4); heads.setMatrixAt(k, m4);
      bodies.setColorAt(k, c.setHex(shirt[(rnd() * shirt.length) | 0]));
      heads.setColorAt(k, c.setHex(skin[(rnd() * skin.length) | 0]));
    });
    root.add(bodies, heads);
  }

  // ------------------------------------------------------------------ waving flags
  const flagSpots = [];
  {
    // along stands + around the course on the outside of corners
    const step = Math.round(55 / L.ds);
    for (let i = 0; i < L.N; i += step) {
      if (L.bridge[i] > 0.2) continue;
      const side = L.kS[i] > 0 ? 1 : -1;  // outside of turn
      const wall = side > 0 ? L.wallR[i] : L.wallL[i];
      const lat = side * (wall + 2.2);
      const x = L.px[i] + L.rx[i] * lat, z = L.pz[i] + L.rz[i] * lat;
      if (!spot(x, z, 1.5).ok) continue;
      flagSpots.push({ x, y: L.py[i] - 0.5, z, rot: L.head[i] + Math.PI / 2 });
    }
    for (const zdef of standZones) {
      const len = ((zdef.i1 - zdef.i0) + L.N) % L.N;
      for (let k = 0; k <= len; k += Math.round(12 / L.ds)) {
        const i = (zdef.i0 + k) % L.N;
        const wall = zdef.side > 0 ? L.wallR[i] : L.wallL[i];
        const lat = zdef.side * (wall + zdef.depth - 4.8);
        flagSpots.push({ x: L.px[i] + L.rx[i] * lat, y: L.py[i] + 1 + 8 * 0.85 + 3.2, z: L.pz[i] + L.rz[i] * lat, rot: L.head[i] + Math.PI / 2, short: true });
      }
    }
    const poleGeo = keep(new THREE.CylinderGeometry(0.1, 0.13, 8, 6).translate(0, 4, 0));
    const poleMat = keep(new THREE.MeshLambertMaterial({ color: 0xe9ecef }));
    const flagGeo = keep(new THREE.PlaneGeometry(3.2, 1.9, 12, 4).translate(1.6, 7, 0));
    const flagMat = keep(withTime(new THREE.MeshLambertMaterial({ side: THREE.DoubleSide }), `
      #ifdef USE_INSTANCING
        float fph = instanceMatrix[3].x * 0.31 + instanceMatrix[3].z * 0.23;
        float fw = clamp(position.x / 3.2, 0.0, 1.0);
        transformed.z += sin(uTime * 6.0 - position.x * 1.7 + fph) * 0.42 * fw;
        transformed.y += sin(uTime * 3.7 - position.x * 1.2 + fph) * 0.12 * fw;
      #endif`));
    const poles = new THREE.InstancedMesh(poleGeo, poleMat, flagSpots.length);
    const flags = new THREE.InstancedMesh(flagGeo, flagMat, flagSpots.length);
    const fcols = [0xe8322f, 0xffd21f, 0x1e6fe8, 0x43a047, 0xff7043, 0xf06292, 0xffffff];
    const m4 = new THREE.Matrix4(), c = new THREE.Color();
    flagSpots.forEach((f, k) => {
      const sc = f.short ? 0.6 : 1;
      m4.makeRotationY(f.rot).scale(new THREE.Vector3(1, sc, 1)).setPosition(f.x, f.y, f.z);
      poles.setMatrixAt(k, m4);
      const m5 = new THREE.Matrix4().makeRotationY(f.rot).setPosition(f.x, f.y - (1 - sc) * 7, f.z);
      flags.setMatrixAt(k, m5);
      flags.setColorAt(k, c.setHex(fcols[k % fcols.length]));
    });
    poles.castShadow = true;
    root.add(poles, flags);
  }

  // ------------------------------------------------------------------ vegetation & rocks
  const tmpM = new THREE.Matrix4(), tmpQ = new THREE.Quaternion(), tmpS = new THREE.Vector3(), tmpP = new THREE.Vector3();
  const upAxis = new THREE.Vector3(0, 1, 0);
  function instanced(geo, material, list, { cast = true, colors = null } = {}) {
    const im = new THREE.InstancedMesh(geo, material, Math.max(1, list.length));
    list.forEach((it, k) => {
      tmpQ.setFromAxisAngle(upAxis, it.r);
      if (it.tilt) tmpQ.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(it.tilt, 0, it.tilt2 || 0)));
      tmpS.set(it.s * (it.sx || 1), it.s * (it.sy || 1), it.s * (it.sz || 1));
      im.setMatrixAt(k, tmpM.compose(tmpP.set(it.x, it.y, it.z), tmpQ, tmpS));
      if (colors) im.setColorAt(k, colors(it, k));
    });
    im.count = list.length;
    im.castShadow = cast; im.receiveShadow = true;
    root.add(im);
    return im;
  }
  {
    const rnd = mulberry(2024);
    const round = [], pines = [], palms = [], rocks = [], flowers = [], tufts = [], bushes = [];
    const R = ISLAND_R * 0.93;
    let guard = 0;
    while ((round.length < 700 || pines.length < 420 || palms.length < 110) && guard++ < 90000) {
      const a = rnd() * Math.PI * 2, rr = Math.sqrt(rnd()) * R;
      const x = cx + Math.cos(a) * rr, z = cz + Math.sin(a) * rr;
      const h = natural(x, z);
      if (h < WATER + 0.3) continue;
      const s = spot(x, z, 6);
      if (!s.ok) continue;
      const y = heightAt(x, z);
      if (y < WATER + 0.3) continue;
      const beach = h < WATER + 3.2;
      const forest = fbm(x * 0.008 + 11, z * 0.008 - 4, 3);
      if (beach) {
        if (palms.length < 110 && rnd() < 0.8) palms.push({ x, y: y - 0.3, z, r: rnd() * 6.28, s: 1.0 + rnd() * 0.45, tilt: (rnd() - 0.5) * 0.3, tilt2: (rnd() - 0.5) * 0.3 });
        continue;
      }
      if (forest < 0.42 && rnd() < 0.85) continue;
      if (y > 12 || (forest > 0.62 && rnd() < 0.6)) {
        if (pines.length < 420) pines.push({ x, y: y - 0.3, z, r: rnd() * 6.28, s: 1.1 + rnd() * 0.9 });
      } else if (round.length < 700) round.push({ x, y: y - 0.3, z, r: rnd() * 6.28, s: 1.0 + rnd() * 0.7, hue: rnd() });
    }
    // palms lining the main straight & lagoon
    for (let i = 0; i < L.N; i += Math.round(22 / L.ds)) {
      const nearLake = Math.hypot(L.px[i] - L.lake.x, L.pz[i] - L.lake.z) < L.lake.r + 90;
      if (!nearLake) continue;
      for (const side of [1, -1]) {
        const lat = side * ((side > 0 ? L.wallR[i] : L.wallL[i]) + 7 + rnd() * 5);
        const x = L.px[i] + L.rx[i] * lat, z = L.pz[i] + L.rz[i] * lat;
        if (!spot(x, z, 5).ok) continue;
        const y = heightAt(x, z);
        if (y < WATER + 0.3) continue;
        palms.push({ x, y: y - 0.3, z, r: rnd() * 6.28, s: 0.9 + rnd() * 0.3, tilt: (rnd() - 0.5) * 0.3, tilt2: (rnd() - 0.5) * 0.3 });
      }
    }
    guard = 0;
    while ((rocks.length < 160 || flowers.length < 2600 || tufts.length < 3200 || bushes.length < 260) && guard++ < 90000) {
      const a = rnd() * Math.PI * 2, rr = Math.sqrt(rnd()) * R;
      const x = cx + Math.cos(a) * rr, z = cz + Math.sin(a) * rr;
      const s = spot(x, z, 1.2);
      if (!s.ok) continue;
      const y = heightAt(x, z);
      if (y < WATER - 0.2) continue;
      const closeToTrack = s.d < 70;
      if (rocks.length < 160 && rnd() < 0.05) {
        const sc = 0.8 + rnd() * rnd() * 4;
        rocks.push({ x, y: y - sc * 0.25, z, r: rnd() * 6.28, s: sc, sx: 0.8 + rnd() * 0.6, sy: 0.55 + rnd() * 0.5, sz: 0.8 + rnd() * 0.6, tilt: rnd() * 0.4 });
        continue;
      }
      if (y < WATER + 2.5) continue;
      const meadow = fbm(x * 0.03 - 3, z * 0.03 + 8, 2);
      if (flowers.length < 2600 && meadow > 0.52 && (closeToTrack || rnd() < 0.3)) {
        // small cluster
        for (let k = 0; k < 5; k++) flowers.push({ x: x + (rnd() - 0.5) * 3, y: y + 0.12, z: z + (rnd() - 0.5) * 3, r: rnd() * 6.28, s: 0.7 + rnd() * 0.6, c: (meadow * 37 + k * 0.1) % 1 });
      } else if (tufts.length < 3200 && (closeToTrack || rnd() < 0.25)) {
        tufts.push({ x, y: y - 0.05, z, r: rnd() * 6.28, s: 0.7 + rnd() * 0.8 });
      } else if (bushes.length < 260 && rnd() < 0.3) {
        bushes.push({ x, y: y - 0.2, z, r: rnd() * 6.28, s: 0.8 + rnd() * 0.9, sy: 0.7 });
      }
    }

    const flat = (opts) => keep(new THREE.MeshLambertMaterial({ flatShading: true, ...opts }));
    // round tree
    const trunkGeo = keep(stripUV(new THREE.CylinderGeometry(0.32, 0.5, 3.4, 6).translate(0, 1.7, 0)));
    const canopyParts = [
      stripUV(new THREE.IcosahedronGeometry(2.6, 0).translate(0, 4.6, 0)),
      stripUV(new THREE.IcosahedronGeometry(1.9, 0).translate(1.3, 4.0, 0.6)),
      stripUV(new THREE.IcosahedronGeometry(1.7, 0).translate(-1.1, 4.2, -0.8)),
      stripUV(new THREE.IcosahedronGeometry(1.5, 0).translate(0.2, 6.1, 0.2)),
    ];
    const canopyGeo = keep(mergeGeometries(canopyParts)); canopyParts.forEach((g) => g.dispose());
    const trunkMat = flat({ color: 0x8a5a36 });
    const leafMat = flat({ color: 0xffffff });
    const greens = [0x5cb338, 0x76c442, 0x4a9e31, 0x8fd14f, 0x6bbf3d, 0xa5d65a];
    const c = new THREE.Color();
    const allTrees = [...round];
    instanced(trunkGeo, trunkMat, allTrees);
    instanced(canopyGeo, leafMat, round, { colors: (it) => c.setHex(greens[(it.hue * greens.length) | 0]) });
    // pines
    const pineTrunk = keep(stripUV(new THREE.CylinderGeometry(0.25, 0.4, 2.2, 5).translate(0, 1.1, 0)));
    const pineParts = [
      stripUV(new THREE.ConeGeometry(2.8, 3.6, 7).translate(0, 3.4, 0)),
      stripUV(new THREE.ConeGeometry(2.2, 3.2, 7).translate(0, 5.2, 0)),
      stripUV(new THREE.ConeGeometry(1.5, 2.8, 7).translate(0, 6.9, 0)),
    ];
    const pineGeo = keep(mergeGeometries(pineParts)); pineParts.forEach((g) => g.dispose());
    const pineGreens = [0x2f7d3a, 0x3a8f44, 0x286e34, 0x44a04c];
    instanced(pineTrunk, trunkMat, pines);
    instanced(pineGeo, leafMat, pines, { colors: (it, k) => c.setHex(pineGreens[k % pineGreens.length]) });
    // palms: curved trunk + drooping fronds
    const palmTrunkParts = [];
    for (let k = 0; k < 6; k++) {
      const g = stripUV(new THREE.CylinderGeometry(0.3 - k * 0.02, 0.36 - k * 0.02, 1.35, 6));
      g.translate(k * k * 0.035, 0.65 + k * 1.25, 0);
      palmTrunkParts.push(g);
    }
    const palmTrunkGeo = keep(mergeGeometries(palmTrunkParts)); palmTrunkParts.forEach((g) => g.dispose());
    const topX = 25 * 0.035, topY = 0.65 + 5 * 1.25 + 0.6;
    const frondParts = [];
    for (let k = 0; k < 8; k++) {
      const f = stripUV(new THREE.BoxGeometry(3.8, 0.08, 0.9, 4, 1, 1));
      const p = f.attributes.position;
      for (let v = 0; v < p.count; v++) { const xx = p.getX(v) + 1.9; p.setX(v, xx); p.setY(v, p.getY(v) - 0.09 * xx * xx); p.setZ(v, p.getZ(v) * (1 - xx / 4.5)); }
      f.rotateY((k / 8) * Math.PI * 2 + (k % 2) * 0.2);
      f.translate(topX, topY, 0);
      frondParts.push(f.toNonIndexed()); f.dispose();
    }
    frondParts.push(stripUV(new THREE.IcosahedronGeometry(0.45, 0).translate(topX, topY - 0.3, 0)));
    const frondGeo = keep(mergeGeometries(frondParts)); frondParts.forEach((g) => g.dispose());
    frondGeo.computeVertexNormals();
    instanced(palmTrunkGeo, flat({ color: 0xa8804f }), palms);
    instanced(frondGeo, keep(new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide })), palms, { colors: (it, k) => c.setHex([0x3fa34d, 0x52b35a, 0x359447][k % 3]) });
    // bushes
    const bushGeo = keep(stripUV(new THREE.IcosahedronGeometry(1.3, 0)));
    instanced(bushGeo, leafMat, bushes, { colors: (it, k) => c.setHex(greens[(k * 7) % greens.length]).multiplyScalar(0.85) });
    // rocks
    const rockGeo = keep(stripUV(new THREE.DodecahedronGeometry(1, 0)));
    instanced(rockGeo, flat({ color: 0xffffff }), rocks, { colors: (it, k) => c.setHex([0x9a968d, 0xb3aea3, 0x85817a, 0xa7a197][k % 4]) });
    // flowers (petal cluster = small octahedron) + tufts
    const flowerGeo = keep(stripUV(new THREE.OctahedronGeometry(0.26, 0).scale(1, 0.6, 1)));
    const petal = [0xff4f6d, 0xffd84a, 0xffffff, 0xff8ad8, 0xb07cff, 0xff9a3c];
    instanced(flowerGeo, flat({ color: 0xffffff }), flowers, { cast: false, colors: (it) => c.setHex(petal[(it.c * petal.length) | 0]) });
    const tuftGeo = keep(stripUV(new THREE.ConeGeometry(0.28, 1.0, 4).translate(0, 0.45, 0)));
    instanced(tuftGeo, flat({ color: 0xffffff }), tufts, { cast: false, colors: (it, k) => c.setHex([0x4f9e33, 0x66b83e, 0x3f8a2b][k % 3]) });
  }

  // ------------------------------------------------------------------ lighthouse + boats
  const boats = [];
  {
    const dir = new THREE.Vector2(L.lake.x - cx, L.lake.z - cz).normalize();
    // walk outward from the island centre until we find the coast
    let lx = cx, lz = cz;
    for (let r = ISLAND_R * 0.6; r < ISLAND_R * 1.1; r += 4) {
      const x = cx + dir.x * r, z = cz + dir.y * r;
      if (natural(x, z) < WATER + 1.5) break;
      lx = x; lz = z;
    }
    const gy = natural(lx, lz);
    const parts = [];
    parts.push(paint(stripUV(new THREE.CylinderGeometry(6, 8, 10, 9).translate(0, gy - 4, 0)), 0x8f8a80));
    for (let k = 0; k < 6; k++) {
      parts.push(paint(stripUV(new THREE.CylinderGeometry(2.6 - k * 0.18, 2.8 - k * 0.18, 3.2, 14).translate(0, gy + 2.6 + k * 3.2, 0)), k % 2 ? 0xffffff : 0xe8322f));
    }
    const topY = gy + 1 + 6 * 3.2;
    parts.push(paint(stripUV(new THREE.CylinderGeometry(2.4, 2.4, 0.5, 14).translate(0, topY + 0.2, 0)), 0x333844));
    parts.push(paint(stripUV(new THREE.CylinderGeometry(1.4, 1.4, 2.4, 10).translate(0, topY + 1.6, 0)), 0xfff3b0));
    parts.push(paint(stripUV(new THREE.ConeGeometry(2, 1.8, 10).translate(0, topY + 3.7, 0)), 0xc81e1e));
    const g = keep(mergeGeometries(parts)); parts.forEach((p) => p.dispose());
    g.translate(lx, 0, lz);
    const lh = new THREE.Mesh(g, keep(new THREE.MeshLambertMaterial({ vertexColors: true })));
    lh.castShadow = true; lh.name = 'lighthouse';
    root.add(lh);

    // sailboats on the sea
    const hull = paint(stripUV(new THREE.BoxGeometry(2.4, 1.2, 7, 1, 1, 2)), 0xffffff);
    const hp = hull.attributes.position;
    for (let v = 0; v < hp.count; v++) if (hp.getZ(v) > 3 && hp.getY(v) > -0.1) hp.setX(v, hp.getX(v) * 0.2);
    const mast = paint(stripUV(new THREE.CylinderGeometry(0.1, 0.1, 8, 5).translate(0, 4.5, 0)), 0x6d4c33);
    const sail = paint(stripUV(new THREE.ConeGeometry(2.4, 7, 3).scale(0.08, 1, 1).translate(0, 4.8, -1.2)), 0xffffff);
    const stripe = paint(stripUV(new THREE.BoxGeometry(2.45, 0.3, 6.6).translate(0, 0.3, 0)), 0x1e6fe8);
    const bg = keep(mergeGeometries([hull, mast, sail, stripe]));
    [hull, mast, sail, stripe].forEach((p) => p.dispose());
    bg.computeVertexNormals();
    const bm = keep(new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true }));
    const rnd = mulberry(77);
    for (let k = 0; k < 6; k++) {
      const a = rnd() * Math.PI * 2, r = ISLAND_R * (1.12 + rnd() * 0.3);
      const b = new THREE.Mesh(bg, bm);
      b.position.set(cx + Math.cos(a) * r, WATER, cz + Math.sin(a) * r);
      b.rotation.y = a + Math.PI / 2;
      b.userData = { a, r, speed: (0.004 + rnd() * 0.004) * (rnd() < 0.5 ? 1 : -1), ph: rnd() * 6 };
      b.scale.setScalar(1.6);
      root.add(b); boats.push(b);
    }
  }

  // ------------------------------------------------------------------ API
  return {
    sunLight: sun,
    hemiLight: hemi,
    heightAt,
    setShadowFocus,
    update(dt, time) {
      uniforms.uTime.value = time;
      waterMat.uniforms.uTime.value = time;
      cloudGroup.rotation.y = time * 0.004;
      for (const b of boats) {
        const u = b.userData;
        const a = u.a + time * u.speed;
        b.position.x = cx + Math.cos(a) * u.r;
        b.position.z = cz + Math.sin(a) * u.r;
        b.position.y = WATER - 0.2 + Math.sin(time * 1.3 + u.ph) * 0.25;
        b.rotation.y = -a + (u.speed > 0 ? 0 : Math.PI);
        b.rotation.z = Math.sin(time * 1.1 + u.ph) * 0.06;
      }
    },
    dispose() {
      scene.remove(hemi, sun, sun.target);
      if (sun.shadow && sun.shadow.map) sun.shadow.map.dispose();
      root.traverse((o) => { if (o.isInstancedMesh) o.dispose(); });
      disposables.forEach((d) => d && d.dispose && d.dispose());
      if (envRT) envRT.dispose();
      if (scene.environment === (envRT && envRT.texture)) scene.environment = prevEnv || null;
      scene.fog = prevFog || null;
      scene.background = prevBg || null;
    },
  };
}
