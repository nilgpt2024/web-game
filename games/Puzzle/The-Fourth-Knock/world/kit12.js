import * as THREE from 'three';
import { RoundedBoxGeometry } from '../vendor/RoundedBoxGeometry.js';
import { mergeGeometries } from '../vendor/BufferGeometryUtils.js';

// Step 12 architecture kit. Every room builds its walls, doors, windows and trims from these
// pieces so Cedar House reads as one building: one wall thickness per wall type, one door
// standard, one trim language, doors that swing on real hinges through real openings.
// Dimensions follow handoff/step12/STEP12_ARCHITECTURE_AND_ROOM_MAP.md §3 (1 unit ≈ 0.8 m).
export const STD = {
  door: { width: 1.46, height: 2.92, leafT: .09, casing: .14 },
  front: { width: 1.40, height: 3.0, fanlight: .55 },
  linen: { width: 1.0, height: 2.45 },
  wall: { exterior: .30, interior: .24 },
  skirting: .16, dado: 1.34, cutCap: .06
};

// Extra palette entries for Step 12 (brief §21): teak, worn paint, lime plaster, cane, fabric,
// patterned cement, wet stone. Broad colour blocks, subtle roughness, no photoreal texture.
export function extendMaterials(M, canvasTexture) {
  const mat = (c, extra = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: .92, metalness: 0, ...extra });
  if (M.teak) return M;
  Object.assign(M, {
    teak: mat('#4b3124'), teakLight: mat('#6a452f'),
    lime: mat('#d8c7a1'), limeCool: mat('#bdb7a4'), limeShade: mat('#a99d80'),
    paintGreen: mat('#586447'), paintGreenLight: mat('#6f7a55'), paintCream: mat('#dccfae'),
    cane: mat('#b88e57'), caneDark: mat('#8a6438'),
    curtain: mat('#7d4a3b'), curtainDark: mat('#5b3530'), indigoCloth: mat('#34495a'), ochreCloth: mat('#b8883e'),
    wetStone: mat('#48504f', { roughness: .38, metalness: .05 }), stoneLight: mat('#8b8272'), laterite: mat('#8c5a44'),
    oxide: mat('#8e3f33', { roughness: .55 }), oxideDark: mat('#5e2a24', { roughness: .6 }),
    poche: mat('#1a1614'), glassDark: new THREE.MeshBasicMaterial({ color: '#1a2633' }),
    brassDark: mat('#8a6f38', { metalness: .25, roughness: .7 }), iron: mat('#2b2d2c', { roughness: .7 })
  });
  // Step 15: trims are laid flush with walls, plates and each other (skirting ends on panel ends, beam tops on
  // wall tops, sills on rails), so exactly coplanar faces z-fought as the camera settled. A fixed, tiny depth
  // priority settles every such tie the same way every frame: sills over rails over posts over panels over walls.
  for (const [key, p] of Object.entries({ edge: 4, timber: 3, teak: 2, teakLight: 2, wood: 1, laterite: 1, paintGreenLight: 1 })) {
    if (M[key]) Object.assign(M[key], { polygonOffset: true, polygonOffsetFactor: -.5 * p, polygonOffsetUnits: -4 * p });
  }
  // Patterned cement tile (Athangudi style): one flat four-colour motif, repeated by UV.
  const tile = canvasTexture(128, 128, (c, W, H) => {
    c.fillStyle = '#c9b184'; c.fillRect(0, 0, W, H);
    c.fillStyle = '#8e3f33'; c.beginPath(); c.moveTo(W / 2, 6); c.lineTo(W - 6, H / 2); c.lineTo(W / 2, H - 6); c.lineTo(6, H / 2); c.fill();
    c.fillStyle = '#c9b184'; c.beginPath(); c.moveTo(W / 2, 26); c.lineTo(W - 26, H / 2); c.lineTo(W / 2, H - 26); c.lineTo(26, H / 2); c.fill();
    c.fillStyle = '#34495a'; c.beginPath(); c.arc(W / 2, H / 2, 17, 0, 7); c.fill();
    c.fillStyle = '#5b6b45'; for (const [x, y] of [[0, 0], [W, 0], [0, H], [W, H]]) { c.beginPath(); c.arc(x, y, 20, 0, 7); c.fill(); }
    c.strokeStyle = 'rgba(40,30,24,.35)'; c.lineWidth = 2; c.strokeRect(1, 1, W - 2, H - 2);
  });
  tile.wrapS = tile.wrapT = THREE.RepeatWrapping;
  M.cementTile = mat('#ffffff', { map: tile, roughness: .7 });
  M.cementTileMap = tile;
  // Woven cane for chair seats and the veranda blind.
  const weave = canvasTexture(64, 64, (c, W, H) => {
    c.fillStyle = '#b88e57'; c.fillRect(0, 0, W, H); c.strokeStyle = '#8a6438'; c.lineWidth = 3;
    for (let i = -W; i < W * 2; i += 10) { c.beginPath(); c.moveTo(i, 0); c.lineTo(i + H, H); c.stroke(); c.beginPath(); c.moveTo(i + H, 0); c.lineTo(i, H); c.stroke(); }
  });
  weave.wrapS = weave.wrapT = THREE.RepeatWrapping; weave.repeat.set(3, 3);
  M.caneWeave = mat('#ffffff', { map: weave });
  return M;
}

export function createKit({ M, canvasTexture }) {
  let root = null;
  const kit = {};
  kit.use = r => { root = r; return kit; };
  const add = (g, m, x, y, z, parent = root) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; parent.add(o); return o; };
  kit.add = add;
  kit.box = (x, y, z, w, h, d, m = M.wood, bevel = .02, parent = root) =>
    add(bevel ? new RoundedBoxGeometry(w, h, d, 1, Math.min(bevel, w / 3, h / 3, d / 3)) : new THREE.BoxGeometry(w, h, d), m, x, y, z, parent);
  kit.cyl = (x, y, z, r, h, m = M.brass, top = r, parent = root, seg = 12) => add(new THREE.CylinderGeometry(top, r, h, seg), m, x, y, z, parent);
  kit.sphere = (x, y, z, rx, ry, rz, m, parent = root) => { const o = add(new THREE.SphereGeometry(1, 12, 8), m, x, y, z, parent); o.scale.set(rx, ry, rz); return o; };
  kit.plane = (x, y, z, w, h, m, parent = root) => { const o = add(new THREE.PlaneGeometry(w, h), m, x, y, z, parent); o.castShadow = false; return o; };
  kit.floor = (x, z, w, d, m, y = .012, parent = root) => { const o = kit.plane(x, y, z, w, d, m, parent); o.rotation.x = -Math.PI / 2; o.receiveShadow = true; return o; };
  kit.group = (x = 0, y = 0, z = 0, parent = root) => { const g = new THREE.Group(); g.position.set(x, y, z); parent.add(g); return g; };
  // A box in wall-local coordinates: `u` runs along the wall, `n` across it (toward the room when
  // the face sign is +1), so every wall-mounted piece is written once for both wall axes.
  function wbox(axis, at, u, y, n, lu, h, ln, m, bevel = .015, parent = root) {
    return axis === 'x' ? kit.box(u, y, at + n, lu, h, ln, m, bevel, parent) : kit.box(at + n, y, u, ln, h, lu, m, bevel, parent);
  }
  kit.wbox = wbox;

  // ---------------------------------------------------------------- walls
  // A straight wall along `axis` ('x': runs along x at z = at; 'z': runs along z at x = at).
  // Openings are gaps [a, b] along the wall between `bottom` and `top`. `face` (+1 / -1) is the
  // room side for trims; `trims` names the runs to apply on that face.
  kit.wall = ({ axis = 'x', at, from, to, thick = STD.wall.interior, height = 4.2, openings = [], mat = M.plaster, face = 1, trims = {}, cap = null, lower = null }) => {
    const ops = [...openings].sort((p, q) => p.a - q.a);
    let u = from;
    const seg = (a, b, y0, y1) => { if (b - a > .005 && y1 - y0 > .005) wbox(axis, at, (a + b) / 2, (y0 + y1) / 2, 0, b - a, y1 - y0, thick, mat, 0); };
    for (const o of ops) { seg(u, o.a, 0, height); if (o.bottom > 0) seg(o.a, o.b, 0, o.bottom); if (o.top < height) seg(o.a, o.b, o.top, height); u = o.b; }
    seg(u, to, 0, height);
    if (cap) wbox(axis, at, (from + to) / 2, height + STD.cutCap / 2, 0, to - from + .02, STD.cutCap, thick + .04, cap, 0);
    // Continuous trims on the room face, broken only where a doorway reaches the floor.
    const doors = ops.filter(o => o.bottom <= .01);
    const spans = []; let s = from;
    for (const o of doors) { spans.push([s, o.a - (o.casing ?? 0)]); s = o.b + (o.casing ?? 0); }
    spans.push([s, to]);
    const n = face * (thick / 2);
    for (const [a, b] of spans) {
      if (b - a < .02) continue;
      const c = (a + b) / 2, l = b - a;
      if (trims.skirting) wbox(axis, at, c, STD.skirting / 2, n + face * .025, l, STD.skirting, .05, trims.skirting, .008);
      if (trims.dado) {
        wbox(axis, at, c, STD.dado / 2, n + face * .02, l, STD.dado, .04, trims.dado, 0);
        wbox(axis, at, c, STD.dado + .03, n + face * .05, l, .07, .1, trims.rail || M.timber, .012);
        if (trims.dadoPanels) for (let p = a + .45; p < b - .2; p += .9) wbox(axis, at, p, STD.dado / 2 + .04, n + face * .045, .05, STD.dado - .3, .03, trims.rail || M.timber, .006);
      }
    }
    // Rails high on the wall break wherever an opening runs up through the top of the wall.
    const high = []; let h0 = from;
    for (const o of ops.filter(o => o.top >= height)) { high.push([h0, o.a]); h0 = o.b; }
    high.push([h0, to]);
    for (const [a, b] of high) {
      if (b - a < .02) continue;
      const c = (a + b) / 2, l = b - a;
      if (trims.picture) wbox(axis, at, c, trims.picture.y, n + face * .03, l, .06, .06, trims.picture.m || M.timber, .01);
      if (trims.cornice) wbox(axis, at, c, height - .09, n + face * .06, l, .18, .12, trims.cornice, .015);
    }
    if (lower) for (const [a, b] of spans) if (b - a > .02) wbox(axis, at, (a + b) / 2, lower.h / 2, n + face * .03, b - a, lower.h, .06, lower.m, 0);
  };

  // ---------------------------------------------------------------- doors
  // A complete doorway: jamb linings through the real wall thickness, architraves on the chosen
  // faces, a threshold and one panelled leaf on a hinge. `hinge` is the end of the opening that
  // carries the hinges (-1 = lower coordinate along the wall); `swing` is the side the leaf opens
  // into (sign across the wall). Returns the pivot; open(angle) turns it the right way.
  kit.door = ({ axis = 'x', at, center, thick = STD.wall.interior, width = STD.door.width, height = STD.door.height, hinge = -1, swing = -1,
    leafMat = M.moss, panelMat = M.mossLight, frameMat = M.timber, faces = [1, -1], threshold = M.edge, number = null, card = null,
    fanlight = 0, fanGlass = [null, null], handle = M.brass, cutAt = null, leaf: makeLeaf = true, frame = true, casing = STD.door.casing, style = 'four' }) => {
    const hw = width / 2, T = thick;
    const cut = h => cutAt == null ? h : Math.min(h, cutAt);
    const yTop = height + fanlight;
    // Jamb linings and head lining (through the wall thickness).
    if (frame) for (const s of [-1, 1]) wbox(axis, at, center + s * (hw - .025), cut(yTop) / 2, 0, .05, cut(yTop), T + .02, frameMat, .006);
    if (frame && (cutAt == null || cutAt > yTop)) wbox(axis, at, center, yTop + .025, 0, width, .05, T + .02, frameMat, .006);
    if (frame && fanlight) {
      wbox(axis, at, center, height + .02, 0, width, .06, T + .02, frameMat, .006);
      for (const f of [-1, 1]) {
        const glass = fanGlass[f === 1 ? 0 : 1];
        if (!glass) continue;
        const g = axis === 'x' ? kit.plane(center, height + fanlight / 2 + .02, at + f * .02, width - .06, fanlight - .06, glass) : kit.plane(at + f * .02, height + fanlight / 2 + .02, center, width - .06, fanlight - .06, glass);
        if (axis === 'z') g.rotation.y = f * Math.PI / 2; else if (f < 0) g.rotation.y = Math.PI;
        g.userData.fan = f;
      }
      for (const k of [-1, 0, 1]) wbox(axis, at, center + k * width / 4 * 1.2, height + fanlight / 2 + .02, 0, .035, fanlight - .05, .05, frameMat, 0);
    }
    // Architraves: two side casings on plinth blocks and a capped head casing, per face.
    for (const f of frame ? faces : []) {
      const n = f * (T / 2 + .018);
      for (const s of [-1, 1]) {
        wbox(axis, at, center + s * (hw + casing / 2 - .01), cut(yTop + .06) / 2, n, casing, cut(yTop + .06), .036, frameMat, .008);
        wbox(axis, at, center + s * (hw + casing / 2 - .01), .14, n + f * .01, casing + .03, .28, .05, frameMat, .008);
      }
      if (cutAt == null || cutAt > yTop + .1) {
        wbox(axis, at, center, yTop + .13, n, width + casing * 2 + .02, .16, .04, frameMat, .008);
        wbox(axis, at, center, yTop + .235, n + f * .02, width + casing * 2 + .12, .05, .08, frameMat, .01);
      }
    }
    if (frame && threshold) wbox(axis, at, center, .02, 0, width - .02, .04, T + .08, threshold, .008);
    if (!makeLeaf) return null;
    // The leaf hangs from a pivot on the hinge jamb, close to the face it swings toward.
    const leafT = STD.door.leafT, lw = width - .08, lh = height - .04;
    const pu = center + hinge * (hw - .05), pn = swing * (T / 2 - leafT / 2 - .01);
    const pivot = new THREE.Group();
    if (axis === 'x') pivot.position.set(pu, 0, at + pn); else pivot.position.set(at + pn, 0, pu);
    pivot.userData.dynamic = true; root.add(pivot);
    const leaf = new THREE.Group(); pivot.add(leaf);
    // Leaf-local frame: u runs from the hinge toward the latch edge (-hinge along the wall).
    const L = (u, y, n, lu, h, ln, m, b = .01) => { const du = -hinge * u; return axis === 'x' ? kit.box(du, y, n, lu, h, ln, m, b, leaf) : kit.box(n, y, du, ln, h, lu, m, b, leaf); };
    const lh2 = cut(lh);
    L(lw / 2, lh2 / 2 + .02, 0, lw, lh2, leafT, leafMat, .012);
    const rows = style === 'plain' ? [] : style === 'six' ? [[.18, .27], [.5, .27], [.8, .24]] : [[.22, .34], [.68, .46]];
    for (const [yc, hh] of rows) for (const col of style === 'plain' ? [] : [.27, .73]) {
      const y = lh * yc, ph = lh * hh;
      if (cutAt != null && y + ph / 2 > cutAt) continue;
      for (const f of [-1, 1]) L(lw * col, y, f * (leafT / 2 + .006), lw * .36, ph, .02, panelMat, .01);
    }
    if (cutAt == null || cutAt > 1.4) for (const f of [-1, 1]) {
      L(lw - .14, 1.34, f * (leafT / 2 + .018), .07, .26, .018, handle, .008);
      L(lw - .2, 1.36, f * (leafT / 2 + .05), .16, .035, .035, handle, .01);
      L(lw - .14, 1.18, f * (leafT / 2 + .02), .025, .05, .01, M.black, 0);
    }
    for (const y of [.35, lh / 2, lh - .35]) if (cutAt == null || y < cutAt) L(-.005, y, 0, .035, .16, leafT + .03, handle, .01);
    // Guest-room number and card, on the corridor face only.
    const face = faces[0];
    if (number && cutAt == null) {
      const tex = canvasTexture(128, 96, (c, W, H) => { c.fillStyle = '#b9994c'; c.beginPath(); c.ellipse(W / 2, H / 2, W / 2 - 2, H / 2 - 2, 0, 0, 7); c.fill(); c.strokeStyle = '#6d5627'; c.lineWidth = 4; c.stroke(); c.fillStyle = '#2a2622'; c.font = 'bold 44px Georgia'; c.textAlign = 'center'; c.fillText(number, W / 2, H / 2 + 15); });
      const plate = L(lw / 2, 2.2, face * (leafT / 2 + .014), .34, .25, .012, new THREE.MeshStandardMaterial({ map: tex, roughness: .6, metalness: .2, transparent: true, alphaTest: .5 }), 0);
      plate.castShadow = false; plate.userData.dynamic = true;
    }
    if (card && cutAt == null) {
      const tex = canvasTexture(256, 96, (c, W, H) => { c.fillStyle = '#8a6f38'; c.fillRect(0, 0, W, H); c.fillStyle = '#efe2c0'; c.fillRect(10, 10, W - 20, H - 20); c.fillStyle = '#2b2a2c'; c.font = 'italic 34px Georgia'; c.textAlign = 'center'; c.fillText(card, W / 2, H / 2 + 12); });
      const holder = L(lw / 2, 1.9, face * (leafT / 2 + .014), .5, .19, .012, new THREE.MeshStandardMaterial({ map: tex, roughness: .8 }), 0);
      holder.castShadow = false; holder.userData.dynamic = true;
    }
    pivot.userData.open = angle => (axis === 'x' ? swing * hinge : -swing * hinge) * angle;
    pivot.userData.leaf = leaf;
    return pivot;
  };

  // ---------------------------------------------------------------- windows
  // Opening with inner lining, sill, a sash grid and glass (`glass` is usually the rain shader,
  // set just outside the wall). `face` is the room side. Returns the glass mesh.
  kit.window = ({ axis = 'x', at, center, width, bottom, top, thick = STD.wall.exterior, face = 1, glass = M.glassDark, cols = 2, rows = 2, frameMat = M.timber, sillMat = M.edge, outsideSill = M.stone, transom = 0 }) => {
    const hw = width / 2, h = top - bottom, yc = (bottom + top) / 2;
    for (const s of [-1, 1]) wbox(axis, at, center + s * (hw - .03), yc, 0, .06, h, thick + .02, frameMat, .006);
    wbox(axis, at, center, top - .03, 0, width, .06, thick + .02, frameMat, .006);
    wbox(axis, at, center, bottom + .03, face * .05, width + .16, .07, thick + .12, sillMat, .012);
    if (outsideSill) wbox(axis, at, center, bottom - .02, -face * (thick / 2 + .05), width + .1, .08, .14, outsideSill, .012);
    for (let i = 1; i < cols; i++) wbox(axis, at, center - hw + width * i / cols, yc, face * .02, .05, h, .07, frameMat, .006);
    const rowsY = transom ? [top - transom] : [];
    for (let i = 1; i < rows; i++) rowsY.push(bottom + (h - transom) * i / rows);
    for (const y of rowsY) wbox(axis, at, center, y, face * .02, width, .05, .07, frameMat, .006);
    const n = -face * (thick / 2 + .01);
    const g = axis === 'x' ? kit.plane(center, yc, at + n, width - .06, h - .06, glass) : kit.plane(at + n, yc, center, width - .06, h - .06, glass);
    if (axis === 'z') g.rotation.y = Math.PI / 2;
    g.castShadow = false; g.receiveShadow = false; g.userData.window = true;
    return g;
  };

  // Gathered curtain on a rod: a few vertical folds as flat rounded slabs, tied back.
  kit.curtain = ({ axis = 'x', at, center, width, top, drop, face = 1, thick = STD.wall.exterior, m = M.curtain, fold = M.curtainDark, side = 0, rod = M.brassDark }) => {
    const n0 = thick / 2 + .08;
    wbox(axis, at, center, top + .06, face * (n0 + .04), width + .5, .04, .04, rod, .01);
    const panels = side ? [side] : [-1, 1];
    for (const s of panels) {
      const u0 = center + s * (width / 2 + .05);
      for (let i = 0; i < 4; i++) wbox(axis, at, u0 - s * i * .11, top - drop / 2, face * (n0 + (i % 2) * .03), .13, drop, .06, i % 2 ? fold : m, .03);
      wbox(axis, at, u0 - s * .17, top - drop * .62, face * (n0 + .06), .5, .07, .09, M.mustard, .02);
    }
  };

  // ---------------------------------------------------------------- small fittings
  kit.switchPlate = (axis, at, u, face = 1, y = 1.42) => { wbox(axis, at, u, y, face * .02, .14, .2, .02, M.paintCream, .006); wbox(axis, at, u, y + .03, face * .035, .03, .06, .02, M.black, .004); wbox(axis, at, u, y - .04, face * .035, .03, .06, .02, M.black, .004); };
  kit.sconce = (axis, at, u, y, face = 1, color = '#ffc983', intensity = 3, parent = root) => {
    wbox(axis, at, u, y - .05, face * .03, .12, .22, .04, M.brass, .01, parent);
    const shade = axis === 'x' ? kit.cyl(u, y + .1, at + face * .16, .1, .2, M.cream, .14, parent) : kit.cyl(at + face * .16, y + .1, u, .1, .2, M.cream, .14, parent);
    shade.material = new THREE.MeshStandardMaterial({ color: '#ecd6a0', emissive: '#ffcf86', emissiveIntensity: .55 });
    const l = new THREE.PointLight(color, intensity, 4.5, 2);
    if (axis === 'x') l.position.set(u, y + .1, at + face * .35); else l.position.set(at + face * .35, y + .1, u);
    parent.add(l); return l;
  };
  // A framed photograph or print with an optional small caption card beneath it.
  kit.frame = ({ axis = 'x', at, u, y, w, h, face = 1, draw, caption = null, frameMat = M.timber, mount = '#e6dcc2' }) => {
    wbox(axis, at, u, y, face * .04, w + .1, h + .1, .05, frameMat, .01);
    const tex = canvasTexture(Math.round(w * 180), Math.round(h * 180), (c, W, H) => { c.fillStyle = mount; c.fillRect(0, 0, W, H); c.save(); c.translate(W * .09, H * .09); draw(c, W * .82, H * .82); c.restore(); });
    const face2 = axis === 'x' ? kit.plane(u, y, at + face * .07, w, h, new THREE.MeshStandardMaterial({ map: tex, roughness: .95 })) : kit.plane(at + face * .07, y, u, w, h, new THREE.MeshStandardMaterial({ map: tex, roughness: .95 }));
    if (axis === 'z') face2.rotation.y = face * Math.PI / 2; else if (face < 0) face2.rotation.y = Math.PI;
    if (caption) {
      const ct = canvasTexture(256, 64, (c, W, H) => { c.fillStyle = '#e9dcbb'; c.fillRect(0, 0, W, H); c.fillStyle = '#3b3530'; c.font = 'italic 22px Georgia'; c.textAlign = 'center'; c.fillText(caption, W / 2, 40); });
      const cw = Math.min(w + .1, .72);
      const card = axis === 'x' ? kit.plane(u, y - h / 2 - .16, at + face * .035, cw, cw / 4, new THREE.MeshStandardMaterial({ map: ct, roughness: 1 })) : kit.plane(at + face * .035, y - h / 2 - .16, u, cw, cw / 4, new THREE.MeshStandardMaterial({ map: ct, roughness: 1 }));
      if (axis === 'z') card.rotation.y = face * Math.PI / 2; else if (face < 0) card.rotation.y = Math.PI;
    }
    return face2;
  };
  // A low soft decal: contact shadows under furniture, warm or cool light pools on floors.
  const decalCache = new Map();
  kit.decal = (x, z, w, d, color = 'rgba(8,8,12,.55)', opacity = 1, additive = false, y = .03, parent = root) => {
    const key = color + additive;
    let map = decalCache.get(key);
    if (!map) { map = canvasTexture(128, 128, (c, W, H) => { const g = c.createRadialGradient(W / 2, H / 2, 2, W / 2, H / 2, W / 2); g.addColorStop(0, color); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); }); decalCache.set(key, map); }
    const m = new THREE.MeshBasicMaterial({ map, transparent: true, depthWrite: false, opacity, blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending });
    const p = kit.plane(x, y, z, w, d, m, parent); p.rotation.x = -Math.PI / 2; p.receiveShadow = false; p.renderOrder = 1;
    return p;
  };

  // ---------------------------------------------------------------- merging
  // Static opaque meshes merge by material; dynamic groups (door leaves, props that move) stay.
  kit.merge = (group, keep = () => false) => {
    const buckets = new Map(), remove = [];
    group.updateMatrixWorld(true);
    const inv = new THREE.Matrix4().copy(group.matrixWorld).invert();
    group.traverse(o => {
      if (!o.isMesh || o.material.transparent || o.material.isShaderMaterial || keep(o)) return;
      for (let p = o; p && p !== group; p = p.parent) if (p.userData.dynamic) return;
      const k = o.material.uuid + '|' + o.castShadow; let b = buckets.get(k);
      if (!b) buckets.set(k, b = { m: o.material, cast: o.castShadow, gs: [] });
      let g = o.geometry.clone(); if (g.index) g = g.toNonIndexed();
      for (const name of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(name)) g.deleteAttribute(name);
      if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
      g.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld)); b.gs.push(g); remove.push(o);
    });
    remove.forEach(o => o.removeFromParent());
    for (const b of buckets.values()) { const o = new THREE.Mesh(mergeGeometries(b.gs, false), b.m); o.castShadow = b.cast; o.receiveShadow = true; group.add(o); b.gs.forEach(g => g.dispose()); }
  };
  return kit;
}
