import * as THREE from 'three';
import { STD } from './kit12.js';

// Room 202, Victor Soren's: the corner room at the north-west of the guest wing (architecture
// map §1). Its door is in the south wall, hinged on the west jamb and opening in; the forced leaf
// stands where the corridor shows it. The west wall carries three windows over the valley.
// Two layers dress it (brief §11): the house's permanent furnishing, and Victor's temporary one.
// Clue props stay in upper-rooms.js / environment81.js exactly where the case needs them.
export const VICTOR = {
  west: { x: -5.9, t: STD.wall.exterior }, north: { z: -4.6, t: STD.wall.exterior }, south: { z: 4.6, t: STD.wall.interior }, east: { x: 5.9, t: STD.wall.interior },
  top: 4.2, cut: .62, door: { c: -4.6, w: STD.door.width, h: STD.door.height, open: 1.4 }, windows: [-2.9, -.3, 2.3], windowW: 2.1
};

export function buildVictorShell({ root, M, kit, rainMat, canvasTexture, hero }) {
  const V = VICTOR; kit.use(root);
  const W = V.west.x, N = V.north.z, S = V.south.z, E = V.east.x;
  // Floor: the same old teak boards as the corridor, a shade cooler in this room.
  kit.box(0, -.22, 0, 12.3, .44, 9.8, M.timber, .06);
  const boards = canvasTexture(1024, 512, (g, Wp, Hp) => {
    let seed = 11; const r = () => (seed = seed * 16807 % 2147483647) / 2147483647;
    g.fillStyle = '#56392a'; g.fillRect(0, 0, Wp, Hp);
    for (let y = 0; y < Hp; y += 32) {
      let x = -r() * 300;
      while (x < Wp) { const len = 180 + r() * 260, v = r() * .14 - .07; g.fillStyle = v > 0 ? `rgba(255,220,180,${v})` : `rgba(20,8,2,${-v})`; g.fillRect(x, y, len, 31); g.fillStyle = 'rgba(20,10,6,.6)'; g.fillRect(x + len - 2, y, 2, 31); x += len; }
      g.fillStyle = 'rgba(18,9,5,.7)'; g.fillRect(0, y + 30, Wp, 2);
    }
  });
  boards.wrapS = boards.wrapT = THREE.RepeatWrapping; boards.repeat.set(2.4, 2.2);
  kit.floor(0, 0, 11.8, 9.2, new THREE.MeshStandardMaterial({ map: boards, roughness: .64 }), .012);
  // North wall: cool lime plaster over a teak dado; formal and plain.
  kit.wall({ axis: 'x', at: N, from: W - V.west.t / 2, to: E + V.east.t / 2, thick: V.north.t, height: V.top, face: 1, mat: M.limeCool, cap: M.poche,
    trims: { skirting: M.timber, dado: M.teakLight, rail: M.teak, dadoPanels: true, picture: { y: 3.25, m: M.teak }, cornice: M.teak } });
  // West wall: three tall windows over the valley, curtains half drawn.
  const hw = V.windowW / 2;
  kit.wall({ axis: 'z', at: W, from: N - V.north.t / 2, to: S + V.south.t / 2, thick: V.west.t, height: V.top, face: 1, mat: M.limeCool, cap: M.poche,
    openings: V.windows.map(c => ({ a: c - hw, b: c + hw, bottom: 1.2, top: 3.75 })),
    trims: { skirting: M.timber, dado: M.teakLight, rail: M.teak, picture: { y: 3.25, m: M.teak }, cornice: M.teak } });
  for (const c of V.windows) {
    kit.window({ axis: 'z', at: W, center: c, width: V.windowW, bottom: 1.2, top: 3.75, thick: V.west.t, face: 1, glass: rainMat, cols: 2, rows: 2, transom: .6, frameMat: M.teak, sillMat: M.teakLight, outsideSill: null });
    hero.place('CUR_victor', root, W + V.west.t / 2, .82, c, Math.PI / 2, [.74, 1.0, 1]);
  }
  // South wall (to the corridor), cut low, with 202's doorway; east wall cut low.
  const d = V.door;
  kit.wall({ axis: 'x', at: S, from: W - V.west.t / 2, to: E + V.east.t / 2, thick: V.south.t, height: V.cut, face: -1, cap: M.poche, mat: M.teakLight,
    openings: [{ a: d.c - d.w / 2, b: d.c + d.w / 2, bottom: 0, top: d.h, casing: .14 }], trims: { skirting: M.timber } });
  kit.wall({ axis: 'z', at: E, from: N - V.north.t / 2, to: S + V.south.t / 2, thick: V.east.t, height: V.cut, face: -1, cap: M.poche, mat: M.teakLight, trims: { skirting: M.timber } });
  kit.door({ axis: 'x', at: S, center: d.c, thick: V.south.t, width: d.w, height: d.h, faces: [-1], threshold: M.edge, cutAt: V.cut, leaf: false });
  // The forced leaf, full height, standing open against the west side: the same leaf, the same
  // hinge and the same angle the corridor shows. Its night latch is on this, the room face.
  const leafPivot = kit.door({ axis: 'x', at: S, center: d.c, thick: V.south.t, width: d.w, height: d.h, hinge: -1, swing: -1,
    leafMat: M.paintGreen, panelMat: M.paintGreenLight, frameMat: M.teak, faces: [], threshold: null, number: null, frame: false });
  leafPivot.rotation.y = leafPivot.userData.open(d.open);
  {
    const leaf = leafPivot.userData.leaf, lw = d.w - .08, t = STD.door.leafT;
    const latch = kit.box(lw - .2, 1.36, -(t / 2 + .04), .22, .15, .07, M.brass, .01, leaf); latch.castShadow = true;
    kit.box(lw - .08, 1.36, -(t / 2 + .02), .06, .1, .04, M.brassDark, .005, leaf);
    kit.box(lw - .04, 1.36, -(t / 2 + .02), .03, .22, .02, M.edge, 0, leaf);
  }
  // Beyond the doorway: a strip of the corridor's boards, then darkness.
  const strip = new THREE.MeshStandardMaterial({ map: boards, roughness: .7, color: '#8d8a8a' });
  kit.floor(d.c + .2, S + .95, 3.2, 1.5, strip, .012);
  kit.box(d.c + .2, -.2, S + .95, 3.2, .4, 1.5, M.timber, .02);
  const fade = canvasTexture(16, 128, (g, Wp, Hp) => { const gr = g.createLinearGradient(0, 0, 0, Hp); gr.addColorStop(0, 'rgba(6,8,12,1)'); gr.addColorStop(.7, 'rgba(6,8,12,.5)'); gr.addColorStop(1, 'rgba(6,8,12,0)'); g.fillStyle = gr; g.fillRect(0, 0, Wp, Hp); });
  const f = kit.plane(d.c + .2, .03, S + 1.0, 3.4, 1.7, new THREE.MeshBasicMaterial({ map: fade, transparent: true, depthWrite: false })); f.rotation.x = -Math.PI / 2; f.renderOrder = 2;
  kit.decal(d.c - .4, S + .6, 1.6, 1.0, 'rgba(255,200,130,1)', .12, true, .03);
  return { leafPivot };
}

// Permanent Cedar House furnishing, then Victor's own things. Nothing here is evidence, and the
// desk (the case's working surface) keeps its clear wall and clean silhouette.
export function dressVictor12({ room, M, kit, canvasTexture, hero, block }) {
  const root = kit.group(0, 0, 0, room.root); root.name = 'Victor room dressing'; kit.use(root);
  const N = VICTOR.north.z + VICTOR.north.t / 2;
  // ---- the house's layer: coat hooks in the corner, a luggage stand, water and a card of house
  // information on the bedside cabinet (the bed, lamp, desk, chair, rug and print already stand).
  kit.box(-5.25, 2.42, N + .04, .9, .1, .06, M.teak, .01);
  hero.place('VIC_coat', root, -5.25, 0, N + .02);
  kit.decal(-5.25, N + .35, .9, .5, 'rgba(40,60,80,1)', .25, false, .02);
  // The house's luggage stand, and Victor's suitcase open on it: shirts folded, lid up.
  const lx = -.15, lz = -3.72;
  hero.place('VIC_luggage', root, lx, 0, lz);
  block(lx, lz, 1.25, .75, 'luggage stand');
  // Bedside: a water jug and glass, the house card, reading glasses; shoes by the bed.
  kit.cyl(5.25, 1.08, -3.3, .08, .22, new THREE.MeshStandardMaterial({ color: '#b8cbd0', roughness: .2, transparent: true, opacity: .75 }), .06);
  kit.cyl(5.35, 1.02, -3.05, .04, .1, new THREE.MeshStandardMaterial({ color: '#c8d8dc', roughness: .2, transparent: true, opacity: .6 }), .045);
  const cardTex = canvasTexture(192, 128, (g, W, H) => { g.fillStyle = '#efe4c6'; g.fillRect(0, 0, W, H); g.fillStyle = '#3a3129'; g.textAlign = 'center'; g.font = 'bold 20px Georgia'; g.fillText('CEDAR HOUSE', W / 2, 36); g.font = '15px Georgia'; ['Room 202', 'Hot water 6 – 9 am', 'Dial 0 for the desk'].forEach((t, i) => g.fillText(t, W / 2, 62 + i * 21)); });
  const card = kit.box(4.85, 1.03, -3.42, .22, .15, .02, new THREE.MeshStandardMaterial({ map: cardTex, roughness: 1 }), 0); card.rotation.x = -.3;
  kit.box(4.95, .94, -2.92, .2, .03, .08, M.black, .01);
  for (const dx of [0, .2]) kit.box(4.35 + dx, .07, -.35, .14, .12, .34, M.black, .04);
  kit.merge(root);
}
