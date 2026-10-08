import * as THREE from 'three';
import { GLTFLoader } from '../vendor/GLTFLoader.js';

// Step 13 hero furniture (assets/world13/hero-props.glb, built by tools/step13/blender/
// build_hero_props.py). The simple collision boxes and every staging, clue and light anchor stay
// in code; this module only swaps the visible layer. Each Blender material M_<key> becomes a
// palette material with the baked occlusion as vertex colour and, where it helps, a quiet generated
// texture (fabric weave, wood grain, quilting, lace, cane, stone) that reads at play distance.
const PALETTE = {
  teak: '#4b3124', teakLight: '#6a452f', timber: '#3c302c', wood: '#75523b', edge: '#ad8152',
  moss: '#78824f', mossLight: '#939c63', mossVelvet: '#6b7648', rust: '#934d3b', rustLight: '#b15e42', burgundy: '#663b42',
  indigo: '#3c505b', indigoCloth: '#34495a', mustard: '#c5a15a', cream: '#ebca89', paper: '#ead8af', lace: '#efe6cf',
  brass: '#b9994c', brassDark: '#8a6f38', iron: '#2b2d2c', black: '#1c2224', stone: '#786f61', stoneLight: '#8b8272', stoneDark: '#5e574c',
  cane: '#b88e57', caneWeave: '#b88e57', caneDark: '#8a6438', leather: '#6b4430', leatherDark: '#3e2a20', porcelain: '#e6e1d4',
  glass: '#b8cbd0', quilt: '#6e3a40', linen: '#e9e3d2', green: '#3f5a45', shade: '#ecd6a0', white: '#f2efe6', red: '#a3322a', throw: '#879070', curtain: '#8a4f3c',
  // Opening props (assets/world13/opening-props.glb): the hill bus, the railway coach, the tunnel.
  busRed: '#9b3228', busCream: '#d9c7a0', coach: '#6c2723', roof: '#4c4f52', tyre: '#1c1f20', tarp: '#3f5a52', rope: '#c9b27a'
};
const FABRIC = new Set(['curtain', 'moss', 'mossLight', 'mossVelvet', 'rust', 'rustLight', 'burgundy', 'indigo', 'indigoCloth', 'mustard', 'linen', 'white', 'throw']);
const WOOD = new Set(['teak', 'teakLight', 'timber', 'wood', 'edge']);
const PAINT = new Set(['busRed', 'busCream', 'coach', 'roof']);
const DEV = new URLSearchParams(location.search).has('dev');
// Step 15: three Blender pieces built two faces into the same plane, which z-fought (flickered) as the camera
// settled: the coffee table's inlay panel sat flush with its top board, the firebox panel flush with the chimney
// breast, the suitcase lining flush with the case. Each is lifted clear by a few millimetres (asset space).
const NUDGE = { LNG_coffee: { edge: [0, .002, 0] }, LNG_fireplace: { black: [0, 0, .004] }, VIC_luggage: { burgundy: [0, .002, 0] } };

export async function loadHero({ canvasTexture, url = './assets/world13/hero-props.glb', overrides = {} }) {
  const gltf = await new GLTFLoader().loadAsync(url);
  const tex = (w, h, draw, repeat = 1) => { const t = canvasTexture(w, h, draw); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat, repeat); return t; };
  let seed = 11; const rnd = () => (seed = seed * 16807 % 2147483647) / 2147483647;
  const maps = {
    // Low-contrast weave: warp and weft a few shades apart, so upholstery reads as cloth, not plastic.
    fabric: tex(128, 128, (c, W, H) => { c.fillStyle = '#f3f3f3'; c.fillRect(0, 0, W, H); for (let y = 0; y < H; y += 4) { c.fillStyle = y % 8 ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.09)'; c.fillRect(0, y, W, 2); } for (let x = 0; x < W; x += 4) { c.fillStyle = x % 8 ? 'rgba(0,0,0,.07)' : 'rgba(255,255,255,.22)'; c.fillRect(x, 0, 2, H); } for (let i = 0; i < 90; i++) { c.fillStyle = `rgba(${rnd() > .5 ? '255,255,255' : '0,0,0'},.05)`; c.fillRect(rnd() * W, rnd() * H, 6 + rnd() * 10, 3); } }, 5),
    grain: tex(256, 256, (c, W, H) => { c.fillStyle = '#e8e8e8'; c.fillRect(0, 0, W, H); for (let i = 0; i < 70; i++) { const x = rnd() * W, w = 1 + rnd() * 3, a = .05 + rnd() * .1; c.strokeStyle = `rgba(0,0,0,${a})`; c.lineWidth = w; c.beginPath(); c.moveTo(x, 0); for (let y = 0; y <= H; y += 16) c.lineTo(x + Math.sin(y * .03 + i) * 3, y); c.stroke(); } for (let i = 0; i < 5; i++) { c.strokeStyle = 'rgba(0,0,0,.07)'; c.lineWidth = 2; c.beginPath(); c.ellipse(rnd() * W, rnd() * H, 6 + rnd() * 5, 24 + rnd() * 20, 0, 0, 7); c.stroke(); } }, 1.3),
    quilt: tex(128, 128, (c, W, H) => { c.fillStyle = '#ececec'; c.fillRect(0, 0, W, H); c.strokeStyle = 'rgba(0,0,0,.2)'; c.lineWidth = 3; for (let k = -W; k < W * 2; k += 32) { c.beginPath(); c.moveTo(k, 0); c.lineTo(k + H, H); c.stroke(); c.beginPath(); c.moveTo(k + H, 0); c.lineTo(k, H); c.stroke(); } c.fillStyle = 'rgba(255,255,255,.28)'; for (let x = 16; x < W; x += 32) for (let y = 0; y < H; y += 32) { c.beginPath(); c.arc(x, y + 16, 7, 0, 7); c.fill(); } }, 2),
    lace: tex(128, 128, (c, W, H) => { c.fillStyle = '#f4f4f4'; c.fillRect(0, 0, W, H); c.strokeStyle = 'rgba(0,0,0,.18)'; c.lineWidth = 2; for (let x = 16; x < W; x += 32) for (let y = 16; y < H; y += 32) { c.beginPath(); c.arc(x, y, 10, 0, 7); c.stroke(); c.beginPath(); c.arc(x, y, 3, 0, 7); c.stroke(); } }, 4),
    cane: tex(64, 64, (c, W, H) => { c.fillStyle = '#e0e0e0'; c.fillRect(0, 0, W, H); c.strokeStyle = 'rgba(0,0,0,.28)'; c.lineWidth = 3; for (let i = -W; i < W * 2; i += 10) { c.beginPath(); c.moveTo(i, 0); c.lineTo(i + H, H); c.stroke(); c.beginPath(); c.moveTo(i + H, 0); c.lineTo(i, H); c.stroke(); } c.fillStyle = 'rgba(0,0,0,.25)'; for (let x = 5; x < W; x += 10) for (let y = 5; y < H; y += 10) { c.beginPath(); c.arc(x, y, 1.6, 0, 7); c.fill(); } }, 6),
    stone: tex(128, 128, (c, W, H) => { c.fillStyle = '#e4e4e4'; c.fillRect(0, 0, W, H); for (let i = 0; i < 160; i++) { c.fillStyle = `rgba(${rnd() > .5 ? '255,255,255' : '0,0,0'},${.03 + rnd() * .06})`; c.beginPath(); c.arc(rnd() * W, rnd() * H, 2 + rnd() * 9, 0, 7); c.fill(); } }, 1.4),
    leather: tex(128, 128, (c, W, H) => { c.fillStyle = '#e6e6e6'; c.fillRect(0, 0, W, H); for (let i = 0; i < 220; i++) { c.fillStyle = `rgba(0,0,0,${.02 + rnd() * .05})`; c.fillRect(rnd() * W, rnd() * H, 2 + rnd() * 4, 1 + rnd() * 2); } }, 2)
  };
  const cache = new Map();
  function material(key) {
    if (overrides[key]) return overrides[key];
    if (cache.has(key)) return cache.get(key);
    const color = PALETTE[key] || '#ff00ff';
    const opts = { color, roughness: .9, metalness: 0, vertexColors: true };
    if (FABRIC.has(key)) Object.assign(opts, { map: maps.fabric, roughness: 1 });
    if (WOOD.has(key)) Object.assign(opts, { map: maps.grain, roughness: .72 });
    if (key === 'quilt') Object.assign(opts, { map: maps.quilt, roughness: 1 });
    if (key === 'lace') Object.assign(opts, { map: maps.lace, roughness: 1 });
    if (key === 'caneWeave' || key === 'cane') Object.assign(opts, { map: maps.cane });
    if (key.startsWith('stone')) Object.assign(opts, { map: maps.stone });
    if (key.startsWith('leather')) Object.assign(opts, { map: maps.leather, roughness: .6 });
    if (key.startsWith('brass')) Object.assign(opts, { metalness: .35, roughness: .45 });
    if (key === 'black' || key === 'iron') opts.roughness = .55;
    if (key === 'glass') Object.assign(opts, { roughness: .15, transparent: true, opacity: .7 });
    if (key === 'shade') Object.assign(opts, { emissive: '#ffcf86', emissiveIntensity: .42, roughness: 1 });
    if (key === 'green') opts.roughness = .45;
    if (PAINT.has(key)) Object.assign(opts, { roughness: .42, metalness: .1 });   // wet coachwork catches passing light
    const m = new THREE.MeshStandardMaterial(opts); m.name = 'hero-' + key;
    cache.set(key, m); return m;
  }
  // Normalise every piece to position/normal/uv/color so rooms can merge them by material.
  const sources = new Map();
  gltf.scene.traverse(o => {
    if (!o.isMesh) return;
    const g = o.geometry;
    // The baked occlusion arrives as normalised integers; read it through the attribute's accessors.
    const n = g.attributes.position.count, rgb = new Float32Array(n * 3).fill(1), src = g.attributes.color;
    if (src) for (let i = 0; i < n; i++) { rgb[i * 3] = src.getX(i); rgb[i * 3 + 1] = src.getY(i); rgb[i * 3 + 2] = src.getZ(i); }
    g.setAttribute('color', new THREE.BufferAttribute(rgb, 3));
    for (const name of Object.keys(g.attributes)) if (!['position', 'normal', 'uv', 'color'].includes(name)) g.deleteAttribute(name);
    o.material = material((o.material.name || 'M_wood').replace(/^M_/, ''));
    let top = o; while (top.parent && top.parent !== gltf.scene) top = top.parent;
    if (!sources.has(top.name)) sources.set(top.name, []);
    sources.get(top.name).push(o);
  });
  // Place a named asset: a group holding meshes that share the GLB geometry.
  function place(name, parent, x = 0, y = 0, z = 0, ry = 0, s = 1) {
    const list = sources.get(name);
    if (!list) throw Error('No hero asset ' + name);
    const g = new THREE.Group(); g.name = name; g.position.set(x, y, z); g.rotation.y = ry; if (Array.isArray(s)) g.scale.set(...s); else g.scale.setScalar(s);
    for (const o of list) {
      const m = new THREE.Mesh(o.geometry, o.material);
      m.castShadow = true; m.receiveShadow = true;
      o.updateWorldMatrix(true, false); m.applyMatrix4(o.matrixWorld);
      const nudge = NUDGE[name]?.[(o.material.name || '').replace(/^hero-/, '')];
      if (nudge) m.position.add(new THREE.Vector3(...nudge));
      g.add(m);
    }
    parent.add(g);
    // Dev only: remember each piece and its footprint (rooms merge meshes later; layout code may
    // still move the group), so tools/step13/collide.mjs can check it against the colliders.
    if (DEV) {
      const local = new THREE.Box3(); for (const m of g.children) { m.geometry.computeBoundingBox(); local.union(m.geometry.boundingBox.clone().applyMatrix4(m.matrix)); }
      (globalThis.__heroPlaced ||= []).push({ name, g, lowY: y + local.min.y * (Array.isArray(s) ? s[1] : s), local: [local.min.x, local.min.z, local.max.x, local.max.z] });
    }
    return g;
  }
  return { place, material, names: [...sources.keys()] };
}
