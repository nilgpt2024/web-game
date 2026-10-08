import * as THREE from 'three';
import { STD } from './kit12.js';
import { verandaFloor, doormat, FACADE, POSTS } from './veranda12.js';

// The lounge's architecture (handoff/step12 architecture map): four real walls, cut on the two
// camera sides, a west window wall shared with the veranda, the front door in its own bay, a
// kitchen doorway west of the hearth, and the main stair passing through the north wall to the
// floor above. Furniture and lights stay in main.js; the dressing pass is world/lounge-dress12.js.
export const LOUNGE = {
  west: { x: -6.83, t: STD.wall.exterior }, north: { z: -5.65, t: STD.wall.exterior },
  south: { z: 5.78, t: STD.wall.exterior }, east: { x: 6.98, t: STD.wall.exterior }, top: 4.6, cut: .72,
  posts: [-5.55, -2.75, .05, 2.85, 5.55], windows: [-4.15, -1.35, 1.45], windowW: 2.54,
  door: { c: 4.22, w: STD.front.width, h: STD.front.height, fan: STD.front.fanlight },
  kitchen: { c: -4.8, w: STD.door.width, h: STD.door.height }, stair: { a: 3.93, b: 6.2, sill: 2.98 }
};

export function buildLounge12({ root, M, kit, rainMat, canvasTexture }) {
  const L = LOUNGE, arch = kit.group(0, 0, 0, root); arch.name = 'Lounge architecture';
  kit.use(arch);
  const W = L.west.x, N = L.north.z, T = L.west.t;

  // ---------------------------------------------------------------- floor: polished red oxide
  const fx0 = W + T / 2, fx1 = L.east.x - T / 2, fz0 = N + T / 2, fz1 = L.south.z - T / 2;
  const fw = fx1 - fx0, fd = fz1 - fz0, ppu = 150;
  const floorTex = canvasTexture(Math.round(fw * ppu), Math.round(fd * ppu), (g, Wp, Hp) => {
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    g.fillStyle = '#8a3a2d'; g.fillRect(0, 0, Wp, Hp);
    const b = .3 * ppu, sq = 1.12 * ppu;
    for (let y = b; y < Hp - b; y += sq) for (let x = b; x < Wp - b; x += sq) {
      const v = rnd() * .09 - .045; g.fillStyle = v > 0 ? `rgba(255,214,190,${v})` : `rgba(40,8,4,${-v})`;
      g.fillRect(x, y, Math.min(sq, Wp - b - x), Math.min(sq, Hp - b - y));
    }
    g.strokeStyle = 'rgba(70,22,16,.55)'; g.lineWidth = 3;
    for (let x = b; x <= Wp - b + 1; x += sq) { g.beginPath(); g.moveTo(x, b); g.lineTo(x, Hp - b); g.stroke(); }
    for (let y = b; y <= Hp - b + 1; y += sq) { g.beginPath(); g.moveTo(b, y); g.lineTo(Wp - b, y); g.stroke(); }
    // Dark border band with a thin ochre inlay, as laid in the house's first years.
    g.fillStyle = '#3a2420'; g.fillRect(0, 0, Wp, b); g.fillRect(0, Hp - b, Wp, b); g.fillRect(0, 0, b, Hp); g.fillRect(Wp - b, 0, b, Hp);
    g.strokeStyle = '#c29a55'; g.lineWidth = 5; g.strokeRect(b - 9, b - 9, Wp - 2 * b + 18, Hp - 2 * b + 18);
    // Polish and wear: soft sheen streaks, and a paler worn path from the door to the hearth.
    for (let i = 0; i < 26; i++) { const x = rnd() * Wp, y = rnd() * Hp, r = 60 + rnd() * 140; const s = g.createRadialGradient(x, y, 0, x, y, r); s.addColorStop(0, 'rgba(255,220,200,.07)'); s.addColorStop(1, 'rgba(255,220,200,0)'); g.fillStyle = s; g.fillRect(x - r, y - r, 2 * r, 2 * r); }
    const path = [[.3, 8.9], [3, 7.5], [6, 5], [7, 1.5]].map(([x, y]) => [x * ppu, y * ppu]);
    g.strokeStyle = 'rgba(255,205,180,.05)'; g.lineWidth = 1.3 * ppu; g.lineCap = 'round'; g.beginPath(); g.moveTo(...path[0]); for (const p of path.slice(1)) g.lineTo(...p); g.stroke();
  });
  const floor = kit.floor((fx0 + fx1) / 2, (fz0 + fz1) / 2, fw, fd, new THREE.MeshStandardMaterial({ map: floorTex, roughness: .5, metalness: .02 }), .02);
  floor.name = 'red oxide floor';
  // Patterned cement tiles inside the front door: the house's welcome mat, laid in stone.
  const tile = M.cementTile.clone(); tile.map = M.cementTileMap.clone(); tile.map.needsUpdate = true; tile.map.repeat.set(3, 4);
  kit.floor(fx0 + .86, L.door.c + .1, 1.62, 2.24, tile, .026);
  kit.box(fx0 + .86, .024, L.door.c + .1, 1.78, .01, 2.4, M.oxideDark, 0);

  // ---------------------------------------------------------------- west wall (shared with the veranda)
  const wall = (z0, z1, y0, y1, m = M.plaster) => { if (z1 - z0 > .02 && y1 - y0 > .02) kit.box(W, (y0 + y1) / 2, (z0 + z1) / 2, T, y1 - y0, z1 - z0, m, 0); };
  for (const z of L.posts) kit.box(W + .06, L.top / 2, z, T + .12, L.top, .26, M.teak, .02);
  kit.box(W + .08, 4.2, 0, T + .16, .3, 11.75, M.teak, .02);
  kit.box(W + .04, 4.47, 0, T + .1, .26, 11.75, M.wood, .02);
  for (const c of L.windows) {
    const hw = L.windowW / 2;
    wall(c - hw, c + hw, 0, 1.22, M.lime);
    kit.box(W + T / 2 + .03, .62, c, .05, 1.2, L.windowW, M.wood, 0);
    kit.box(W + T / 2 + .05, 1.26, c, .12, .07, L.windowW + .1, M.timber, .01);
    kit.window({ axis: 'z', at: W, center: c, width: L.windowW, bottom: 1.22, top: 4.05, thick: T, face: 1, glass: rainMat, cols: 2, rows: 2, transom: .72, frameMat: M.teak, sillMat: M.edge, outsideSill: null });
  }
  const d0 = L.door.c - L.door.w / 2, d1 = L.door.c + L.door.w / 2, pb = L.posts[3] + .13, pe = L.posts[4] - .13;
  wall(pb, d0, 0, 4.05); wall(d1, pe, 0, 4.05); wall(d0, d1, L.door.h + L.door.fan, 4.05);
  wall(L.posts[4] + .13, L.south.z + T / 2, 0, 4.05);
  for (const [a, b] of [[pb, d0 - .14], [d1 + .14, pe]]) {
    kit.box(W + T / 2 + .02, .67, (a + b) / 2, .04, 1.34, b - a, M.wood, 0);
    kit.box(W + T / 2 + .05, 1.37, (a + b) / 2, .09, .07, b - a, M.timber, .01);
    kit.box(W + T / 2 + .03, .08, (a + b) / 2, .05, .16, b - a, M.timber, .008);
  }
  const nightGlass = new THREE.MeshBasicMaterial({ color: '#27313b' });
  const entryDoor = kit.door({ axis: 'z', at: W, center: L.door.c, thick: T, width: L.door.w, height: L.door.h, hinge: -1, swing: 1,
    leafMat: M.paintGreen, panelMat: M.paintGreenLight, frameMat: M.teak, faces: [1], threshold: M.stoneLight, fanlight: L.door.fan, fanGlass: [nightGlass, null] });

  // ---------------------------------------------------------------- north wall
  kit.wall({ axis: 'x', at: N, from: W - T / 2, to: L.east.x + T / 2, thick: T, height: L.top, face: 1,
    openings: [{ a: L.kitchen.c - L.kitchen.w / 2, b: L.kitchen.c + L.kitchen.w / 2, bottom: 0, top: L.kitchen.h, casing: .14 }, { a: L.stair.a, b: L.stair.b, bottom: L.stair.sill, top: L.top + 1 }],
    trims: { skirting: M.timber, dado: M.wood, rail: M.timber, dadoPanels: true, cornice: M.timber } });
  // Top beam, open over the stair: the flight rises past the ceiling line to the floor above.
  kit.box((W - T / 2 + L.stair.a) / 2, 4.47, N + .12, L.stair.a - W + T / 2, .26, .5, M.timber, .02);
  kit.box((L.stair.b + L.east.x + T / 2) / 2, 4.47, N + .12, L.east.x + T / 2 - L.stair.b, .26, .5, M.timber, .02);
  for (const x of [-2.75, 2.8]) kit.box(x, L.top / 2, N + .2, .26, L.top, .14, M.teak, .02);
  // Half-timbering above the dado: the house's one decorative habit, spaced to the bays.
  for (const x of [-6.1, -3.6, 3.55]) if (x < L.kitchen.c - .9 || x > L.kitchen.c + .9) kit.box(x, 2.95, N + T / 2 + .03, .1, 3.0, .06, M.wood, .01);
  // The chimney breast rises to the ceiling behind the painting.
  kit.box(.05, 3.56, N + .33, 2.62, 2.08, .36, M.plaster, .02);
  kit.box(.05, 4.45, N + .52, 2.8, .12, .06, M.timber, .01);
  // Kitchen doorway: a varnished service door standing ajar on a lit passage.
  const kitchenDoor = kit.door({ axis: 'x', at: N, center: L.kitchen.c, thick: T, width: L.kitchen.w, height: L.kitchen.h, hinge: -1, swing: -1,
    leafMat: M.teak, panelMat: M.teakLight, frameMat: M.timber, faces: [1], threshold: M.edge });
  kitchenDoor.rotation.y = kitchenDoor.userData.open(.62);
  {
    const k = L.kitchen.c, z0 = N - T / 2;
    kit.floor(k - .2, z0 - 1.05, 3.2, 2.1, M.stone, .015);
    kit.box(k - 1.62, 1.2, z0 - 1.05, .12, 2.4, 2.1, M.limeCool, 0);
    kit.box(k + 1.35, 1.2, z0 - 1.05, .12, 2.4, 2.1, M.limeCool, 0);
    kit.box(k - .2, 1.05, z0 - 2.12, 3.2, 2.1, .12, M.limeShade, 0);
    kit.box(k - 1.45, 1.55, z0 - 1.1, .3, .05, 1.7, M.teak, .01);
    for (let i = 0; i < 6; i++) kit.cyl(k - 1.45, 1.66, z0 - 1.8 + i * .28, .08, .18, [M.brass, M.rust, M.cream, M.moss][i % 4], .08);
    kit.box(k - .2, .45, z0 - 1.85, 1.4, .9, .45, M.wood, .02);
    kit.sphere(k - .1, 2.05, z0 - 1.2, .07, .07, .07, new THREE.MeshBasicMaterial({ color: '#ffe1a8' }));
    const bulb = new THREE.PointLight('#ffc27d', 5, 4.2, 2); bulb.position.set(k - .1, 1.9, z0 - 1.1); arch.add(bulb);
  }

  // ---------------------------------------------------------------- the stair continues to the floor above
  for (let i = 9; i < 13; i++) {
    const z = -1.3 - i * .47, h = .18 + i * .36;
    kit.box(5.06, h - .3, z, 2.12, .6, .5, M.wood, .02);
    kit.box(5.06, h + .028, z, 2.15, .08, .51, M.timber, .015);
    kit.box(5.06, h + .073, z, 1.16, .018, .44, M.burgundy, 0);
  }
  kit.box(5.06, L.top - .1, -7.3, 2.4, .2, .6, M.timber, .02);
  // Stair-hall walls, cut at the same line as the lounge; a dark well beyond the last step.
  // The west side is the stair's backdrop and stands to the cut line; the east side faces the
  // camera and is cut low, like the lounge's own east wall.
  kit.box(3.8, 3.3, -6.7, .16, 2.6, 1.8, M.limeShade, 0); kit.box(3.8, L.top + .03, -6.7, .2, .06, 1.8, M.poche, 0);
  kit.box(6.33, 1.46, -6.7, .16, 2.93, 1.8, M.limeShade, 0); kit.box(6.33, 2.96, -6.7, .2, .06, 1.8, M.poche, 0);
  kit.box(5.06, 3.3, -7.66, 2.7, 2.6, .12, M.limeShade, 0);
  kit.box(5.06, L.top + .03, -7.66, 2.74, .06, .16, M.poche, 0);
  const hall = new THREE.PointLight('#7f9fc4', 1.2, 3.2, 2); hall.position.set(5.0, 5.2, -7.0); arch.add(hall);

  // ---------------------------------------------------------------- cut walls on the camera sides
  // Cut below the dado line, so the section shows the panelling, not the plaster above it.
  kit.wall({ axis: 'x', at: L.south.z, from: W - T / 2, to: L.east.x + T / 2, thick: T, height: L.cut, face: -1, cap: M.poche, trims: { skirting: M.timber }, mat: M.wood });
  kit.wall({ axis: 'z', at: L.east.x, from: N - T / 2, to: L.south.z + T / 2, thick: T, height: L.cut, face: -1, cap: M.poche, trims: { skirting: M.timber }, mat: M.wood });
  kit.box(L.east.x + .02, L.cut / 2, L.south.z, T + .04, L.cut, T + .04, M.teak, .01);

  // ---------------------------------------------------------------- the veranda outside the front door
  // Built by the veranda's own pieces in veranda coordinates, placed by the house mapping, so the
  // doorway opens onto exactly what the veranda room shows.
  const outside = new THREE.Group(); outside.name = 'Veranda (from the lounge)';
  outside.rotation.y = -Math.PI / 2; outside.position.set(-9.57, 0, 2.67); root.add(outside);
  kit.use(outside);
  // Only what the open door frames: slabs the lounge's own walls would otherwise leave floating
  // beside the room (the view line past the south-west corner) are left out.
  verandaFloor(kit, M, { x0: -3.4, x1: 3.9, keep: (X, Z) => X + .55 < 3.26 - 1.54 * (Z + .46 + 2.59) - .4 });
  doormat(kit, M);
  const outdoorLights = kit.group(); outdoorLights.userData.dynamic = true; outdoorLights.visible = false;
  for (const X of [POSTS[3] - .02, POSTS[4] + .02]) { const l = new THREE.PointLight('#f2bd75', 8, 3.4, 2); l.position.set(X, 2.35, FACADE.outer + .6); outdoorLights.add(l); }
  kit.merge(outside);
  kit.use(arch);
  kit.merge(arch);
  return { entryDoor, entryStorm: outdoorLights, kitchenDoor, arch, outside };
}
