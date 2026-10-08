import * as THREE from 'three';
import { RoundedBoxGeometry } from './vendor/RoundedBoxGeometry.js';
import { mergeGeometries } from './vendor/BufferGeometryUtils.js';
import { buildVeranda12 } from './world/veranda12.js';
import { buildCorridor12 } from './world/corridor12.js';
import { dressVictor12 } from './world/victor12.js';
import { dressLounge12 } from './world/lounge-dress12.js';

// Room dressing in the existing material language. Static pieces merge by material; anything
// that moves (door leaves, plants, papers, drips, glints) stays dynamic. No physics.
export function dressRooms({ rooms, materials: M, rainMat, canvasTexture, kit, loungeArch, hero }) {
  let root;
  const motions = [];
  const add = (g, m, x, y, z, parent = root) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; parent.add(o); return o; };
  const box = (x, y, z, w, h, d, m = M.wood, parent = root) => add(new RoundedBoxGeometry(w, h, d, 1, Math.min(.025, w / 3, h / 3, d / 3)), m, x, y, z, parent);
  const cyl = (x, y, z, r, h, m = M.brass, top = r, parent = root) => add(new THREE.CylinderGeometry(top, r, h, 12), m, x, y, z, parent);
  const block = (room, x, z, w, d, label) => room.collisions.push({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2, label });
  const textMap = (text, bg = '#263732', fg = '#d8bd7b') => canvasTexture(512, 192, (c, W, H) => { c.fillStyle = bg; c.fillRect(0, 0, W, H); c.strokeStyle = fg; c.strokeRect(12, 12, W - 24, H - 24); c.fillStyle = fg; c.textAlign = 'center'; c.font = '28px Georgia'; text.split('\n').forEach((s, i) => c.fillText(s, W / 2, 72 + i * 43)); });
  function sign(x, y, z, w, h, text) { const map = textMap(text); box(x, y, z, w + .08, h + .08, .10, M.timber); return add(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map, roughness: 1 }), x, y, z + .07); }
  function plant(x, z, s = 1, parent = root) {
    cyl(x, .22 * s, z, .24 * s, .44 * s, M.pot, .31 * s, parent);
    const crown = new THREE.Group(); crown.userData.dynamic = true; crown.position.set(x, .42 * s, z); parent.add(crown);
    for (let i = 0; i < 9; i++) { const a = i * 2.4, r = .2 + .025 * i; const leaf = add(new THREE.SphereGeometry(1, 8, 6), i % 2 ? M.leaf : M.leafLight, Math.cos(a) * r * s, (.26 + i * .033) * s, Math.sin(a) * r * s, crown); leaf.scale.set(.12 * s, .39 * s, .045 * s); leaf.rotation.set(Math.sin(a) * .7, 0, -Math.cos(a) * .8); }
    motions.push({ kind: 'plant', o: crown, base: 0, seed: x });
    return crown;
  }
  function paper(x, y, z) { const p = box(x, y, z, .45, .009, .30, M.paper); p.userData.dynamic = true; motions.push({ kind: 'paper', o: p, base: y, seed: x }); return p; }
  function pool(x, z, w, d, color, opacity = .2) {
    const map = canvasTexture(128, 128, (c, W, H) => { const g = c.createRadialGradient(64, 64, 0, 64, 64, 63); g.addColorStop(0, color); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); });
    const m = new THREE.MeshBasicMaterial({ map, transparent: true, depthWrite: false, opacity, blending: THREE.AdditiveBlending });
    const p = add(new THREE.PlaneGeometry(w, d), m, x, .055, z); p.rotation.x = -Math.PI / 2; p.castShadow = false;
    motions.push({ kind: 'reflection', o: p, seed: x, base: opacity });
    return p;
  }
  function frame(x, y, z, w, h, number) {
    box(x, y, z, w + .12, h + .12, .095, M.timber);
    const tex = canvasTexture(256, 256, (c, W, H) => { c.fillStyle = '#b9b096'; c.fillRect(0, 0, W, H); c.fillStyle = '#687574'; c.fillRect(19, 20, W - 38, H - 55); c.fillStyle = '#34494b'; c.beginPath(); c.moveTo(20, 180); c.lineTo(71, 86); c.lineTo(130, 152); c.lineTo(183, 73); c.lineTo(238, 180); c.fill(); c.fillStyle = '#d7c39b'; for (let i = 0; i < 4; i++) c.fillRect(40 + i * 45, 166, 20, 22); c.fillStyle = '#4e4b3f'; c.textAlign = 'center'; c.font = '16px Georgia'; c.fillText('CEDAR HOUSE · ' + number, 128, 232); });
    add(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: tex, roughness: 1 }), x, y, z + .06);
  }
  function merge(group) {
    const buckets = new Map(), remove = [];
    group.updateMatrixWorld(true);
    group.traverse(o => {
      if (!o.isMesh || o.material.transparent || o.material === rainMat || o.userData.dynamic || o.parent.userData.dynamic || o.parent.parent?.userData.dynamic) return;
      const k = o.material.uuid; let b = buckets.get(k);
      if (!b) buckets.set(k, b = { m: o.material, gs: [] });
      let g = o.geometry.clone(); if (g.index) g = g.toNonIndexed(); g.applyMatrix4(o.matrixWorld); b.gs.push(g); remove.push(o);
    });
    remove.forEach(o => o.removeFromParent());
    for (const b of buckets.values()) { const o = new THREE.Mesh(mergeGeometries(b.gs, false), b.m); o.castShadow = o.receiveShadow = true; group.add(o); b.gs.forEach(g => g.dispose()); }
  }
  // A door leaf on its own hinge: `pivot` rotates about Y; the leaf hangs toward `dir`.
  function doorLeaf(pivotX, pivotZ, along, width, height, thickness, panelMat, insetMat, handleOffset) {
    const pivot = new THREE.Group(); pivot.position.set(pivotX, 0, pivotZ); pivot.userData.dynamic = true; root.add(pivot);
    const alongX = along === 'x';
    const leaf = new THREE.Group(); leaf.position.set(alongX ? -width / 2 : 0, height / 2 + .05, alongX ? 0 : width / 2); pivot.add(leaf);
    box(0, 0, 0, alongX ? width : thickness, height, alongX ? thickness : width, panelMat, leaf);
    for (const y of [-height * .22, height * .2]) box(alongX ? 0 : thickness * .55, y, alongX ? thickness * .55 : 0, alongX ? width * .8 : .04, height * .34, alongX ? .04 : width * .78, insetMat, leaf);
    cyl(alongX ? -width / 2 + handleOffset : thickness * .7, -height * .03, alongX ? thickness * .7 : width / 2 - handleOffset, .06, .15, M.brass, .06, leaf);
    return pivot;
  }

  // ---------------- Covered veranda (Step 12: world/veranda12.js) ----------------
  buildVeranda12({ rooms, M, kit, rainMat, canvasTexture, motions, plant, pool });
  root = rooms.veranda.root;

  // ---------------- Corridor (Step 12: world/corridor12.js) ----------------
  buildCorridor12({ corridor: rooms.corridor, M, kit, rainMat, canvasTexture });

  // ---------------- Victor's room ----------------
  root = new THREE.Group(); rooms.victor.root.add(root);
  hero.place('VIC_bookend_dusty', root, -4.12, 1.495, -3.0, Math.PI / 2);   // its pair, still dusty (Step 13 Blender piece)
  box(-1.93, 1.54, -2.86, .30, .012, .18, M.paper).rotation.y = .25; box(-1.94, 1.55, -2.83, .16, .009, .026, M.rust);
  box(-3.6, 1.16, -1.72, 1.03, .19, .54, M.wood); box(-3.6, 1.27, -1.64, .71, .018, .34, M.paper);
  const edge = paper(-3.62, 1.535, -2.53); edge.rotation.y = .25;
  box(-2.10, .26, -1.79, .43, .22, .04, M.black).rotation.x = -.3;
  const scrap = paper(-1.57, .077, -1.63); scrap.rotation.y = -.37;
  box(-.15, .13, -2.07, .50, .04, .33, M.indigo).rotation.y = -.21;
  box(-.8, 1.13, -3.87, .58, .055, .19, M.brass);
  box(4.1, .16, -.05, .48, .07, .70, M.indigo).rotation.y = .1;
  const smear = new THREE.MeshBasicMaterial({ color: '#695046', transparent: true, opacity: .55 });
  for (const [x, z, w, d] of [[-.05, .92, .26, .035], [.50, .96, .31, .03], [.85, .91, .09, .04]]) box(x, .093, z, w, .008, d, smear);
  pool(-4.75, .2, 3.0, 4.5, '#6b95b2');
  pool(4.8, -2.2, 2.4, 2.8, '#dbb886');
  pool(.55, .45, 4.4, 3.0, '#86aac4', .24); // cool window light across the rug lifts the body's silhouette
  merge(root);
  // Step 12: the doorway and forced leaf are architecture now (world/victor12.js); the house's
  // furnishing and Victor's own things dress the room around the evidence.
  dressVictor12({ room: rooms.victor, M, kit, canvasTexture, hero, block: (x, z, w, d, label) => block(rooms.victor, x, z, w, d, label) });
  const body = rooms.victor.body;
  body.geometry.dispose(); body.geometry = new THREE.PlaneGeometry(3.3, 1.58);
  body.rotation.set(-Math.PI / 3.15, .26, -.04); body.position.set(.40, .51, .28);
  body.material = new THREE.MeshStandardMaterial({ map: body.material.map, alphaTest: .5, side: THREE.DoubleSide, color: '#e2ded2', emissiveMap: body.material.map, emissive: '#ece2c8', emissiveIntensity: .7, roughness: 1, metalness: 0 });
  // The same illustration with the cast's cream outline, so the body reads against the dark rug.
  new THREE.TextureLoader().load('./assets/victor-floor-v11.png', t => {
    const old = body.material.map;
    t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.offset.copy(old.offset); t.repeat.copy(old.repeat);
    body.material.map = body.material.emissiveMap = t; body.material.needsUpdate = true;
  });
  body.castShadow = false; body.receiveShadow = true;
  Object.assign(body.userData.presentation, { floorY: .07, reliefHeight: .51, material: 'MeshStandardMaterial', alphaEdge: 'alphaTest .55', orientation: 'inclined floor-anchored illustrated cutout' });
  // The stopped watch catches the light now and then: readable, never flashy.
  const glintMap = canvasTexture(64, 64, (c, W, H) => { const g = c.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(255,244,210,1)'); g.addColorStop(.3, 'rgba(255,220,150,.5)'); g.addColorStop(1, 'rgba(255,220,150,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); });
  const glint = new THREE.Sprite(new THREE.SpriteMaterial({ map: glintMap, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 }));
  glint.position.set(.28, .2, .74); glint.scale.setScalar(.34); rooms.victor.root.add(glint);
  motions.push({ kind: 'glint', o: glint, seed: 1 });

  // ---------------- Lounge (Step 12: architecture in world/lounge12.js) ----------------
  root = new THREE.Group(); rooms.lounge.root.add(root);
  paper(5.34, 1.66, 2.78);
  merge(root);
  dressLounge12({ room: rooms.lounge, M, kit, canvasTexture, motions, hero });
  rooms.lounge.entryDoor = loungeArch.entryDoor; rooms.lounge.entryStorm = loungeArch.entryStorm; rooms.lounge.kitchenDoor = loungeArch.kitchenDoor;

  let flutterUntil = -1;
  return {
    counts: motions.reduce((a, m) => (a[m.kind] = (a[m.kind] || 0) + 1, a), {}),
    flutter(until) { flutterUntil = until; },
    update(time, reduced, still, motion = 1, aren = null) {
      for (const m of motions) {
        if (m.kind === 'drip') { m.o.position.y = 3.9 - ((time * .85 + m.seed) % 1) * 3.8; continue; }
        if (m.kind === 'leak') { const t = (time * .42 + m.seed) % 1; m.o.visible = !reduced && t < .42; m.o.position.y = 3.6 - Math.pow(Math.min(1, t / .42), 2) * 3.22; continue; }
        if (m.kind === 'spout') { m.o.scale.x = 1 + (reduced ? 0 : Math.sin(time * 23) * .25); m.o.material.opacity = .45 + (reduced ? 0 : Math.sin(time * 17) * .1); continue; }
        if (m.kind === 'reflection') { m.o.material.opacity = m.base * .85 + (reduced ? 0 : Math.sin(time * .8 + m.seed) * .025); continue; }
        if (m.kind === 'glint') { const g = Math.max(0, Math.sin(time * .9 + 1.2)); m.o.material.opacity = reduced ? .35 : .15 + Math.pow(g, 12) * .75; continue; }
        if (m.kind === 'curtain') m.o.rotation.y = m.base + (reduced || still ? 0 : Math.sin(time * .8) * .018);
        if (m.kind === 'plant') m.o.rotation.z = reduced || still ? 0 : Math.sin(time * 1.15 + m.seed) * .018 * motion;
        if (m.kind === 'paper') {
          const near = aren && Math.hypot(aren.x - m.o.position.x, aren.z - m.o.position.z) < 1.4 ? 2 : 1;
          const gust = time < flutterUntil ? 5 : 1;
          m.o.rotation.x = reduced || (still && gust === 1) ? 0 : Math.sin(time * (gust > 1 ? 9 : 1.5) + m.seed) * .022 * motion * near * gust;
        }
      }
    }
  };
}
