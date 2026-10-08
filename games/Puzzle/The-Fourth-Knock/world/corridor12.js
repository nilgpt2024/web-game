import * as THREE from 'three';
import { STD } from './kit12.js';

// The upper corridor (architecture map §1): a guest corridor on the first floor of the north-east
// wing. The main stair arrives at its west end beside the end window; Victor's door (202) opens
// north into the corner room; 201 and 203 open south (shown as openings in the cut wall); the
// corridor carries on east, past the frame, toward 204 and 205. Quieter, cooler, narrower and
// older than the lounge, with one curated wall of the house's own history.
export const CORRIDOR = {
  north: { z: -3.3, t: STD.wall.interior }, south: { z: 1.62, t: STD.wall.interior }, west: { x: -6.12, t: STD.wall.interior },
  top: 4.2, cut: .62, east: 9.6,
  victor: { c: 1.55, w: STD.door.width, h: STD.door.height, open: 1.4 },
  linen: { c: -1.45, w: STD.linen.width, h: STD.linen.height },
  south201: -1.3, south203: 3.45,
  well: { x0: -5.9, x1: -3.52, z0: 1.9 }, window: { c: -.95, w: 2.3, bottom: 1.05, top: 3.7 }
};

export function buildCorridor12({ corridor, M, kit, rainMat, canvasTexture }) {
  const C = CORRIDOR, root = corridor.root;
  root.clear();
  corridor.collisions.length = 0;
  const block = (x, z, w, d, label) => corridor.collisions.push({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2, label });
  kit.use(root);
  const N = C.north.z, S = C.south.z, Wx = C.west.x, T = C.north.t;
  const nf = N + T / 2, sf = S - T / 2;

  // ---------------------------------------------------------------- floor: old teak boards, a worn runner
  // Floor slab: the corridor proper ends at its south wall; only the landing runs out to the well.
  kit.box(3.1, -.22, (N - T / 2 + S + T / 2) / 2, 13.0, .44, S - N + T, M.timber, .02);
  kit.box(-4.85, -.22, (N - T / 2 + C.well.z0) / 2, 2.9, .44, C.well.z0 - N + T / 2, M.timber, .02);
  const boards = canvasTexture(1024, 512, (g, W, H) => {
    let seed = 3; const r = () => (seed = seed * 16807 % 2147483647) / 2147483647;
    g.fillStyle = '#5c3b28'; g.fillRect(0, 0, W, H);
    for (let y = 0; y < H; y += 32) {
      let x = -r() * 300;
      while (x < W) { const len = 180 + r() * 260, v = r() * .16 - .08; g.fillStyle = v > 0 ? `rgba(255,220,180,${v})` : `rgba(20,8,2,${-v})`; g.fillRect(x, y, len, 31); g.fillStyle = 'rgba(20,10,6,.6)'; g.fillRect(x + len - 2, y, 2, 31); x += len; }
      g.fillStyle = 'rgba(18,9,5,.7)'; g.fillRect(0, y + 30, W, 2);
    }
  });
  boards.wrapS = boards.wrapT = THREE.RepeatWrapping; boards.repeat.set(2.6, 1.0);
  const boardMat = new THREE.MeshStandardMaterial({ map: boards, roughness: .62 });
  kit.floor(3.1, (nf + sf) / 2, 13.0, sf - nf, boardMat, .012);
  const landingBoards = boardMat.clone(); landingBoards.map = boards.clone(); landingBoards.map.needsUpdate = true; landingBoards.map.repeat.set(.6, .9);
  kit.floor(-4.8, (nf + C.well.z0) / 2, 2.6, C.well.z0 - nf, landingBoards, .011);
  // The runner: faded burgundy, a darker border, worn pale down the middle where guests walk.
  const runnerTex = canvasTexture(1024, 128, (g, W, H) => {
    g.fillStyle = '#5a2c33'; g.fillRect(0, 0, W, H); g.fillStyle = '#3d1f25'; g.fillRect(0, 0, W, 16); g.fillRect(0, H - 16, W, 16);
    g.fillStyle = '#b08a55'; g.fillRect(0, 18, W, 4); g.fillRect(0, H - 22, W, 4);
    for (let x = 30; x < W; x += 58) { g.fillStyle = 'rgba(176,138,85,.7)'; g.beginPath(); g.moveTo(x, H / 2 - 12); g.lineTo(x + 10, H / 2); g.lineTo(x, H / 2 + 12); g.lineTo(x - 10, H / 2); g.fill(); }
    const wear = g.createLinearGradient(0, 0, 0, H); wear.addColorStop(.3, 'rgba(210,170,150,0)'); wear.addColorStop(.5, 'rgba(210,170,150,.16)'); wear.addColorStop(.7, 'rgba(210,170,150,0)'); g.fillStyle = wear; g.fillRect(0, 0, W, H);
  });
  runnerTex.wrapS = THREE.RepeatWrapping; runnerTex.repeat.set(2.4, 1);
  kit.floor(3.1, -.72, 12.6, 1.5, new THREE.MeshStandardMaterial({ map: runnerTex, roughness: 1 }), .03);
  kit.floor(-4.7, 1.1, 1.8, 1.1, new THREE.MeshStandardMaterial({ map: runnerTex, roughness: 1 }), .03);

  // ---------------------------------------------------------------- north wall: history, linen, 202
  kit.wall({ axis: 'x', at: N, from: Wx - T / 2, to: C.east, thick: T, height: C.top, face: 1, mat: M.limeCool, cap: M.poche,
    openings: [{ a: C.linen.c - C.linen.w / 2, b: C.linen.c + C.linen.w / 2, bottom: 0, top: C.linen.h, casing: .12 }, { a: C.victor.c - C.victor.w / 2, b: C.victor.c + C.victor.w / 2, bottom: 0, top: C.victor.h, casing: .14 }],
    trims: { skirting: M.timber, dado: M.teakLight, rail: M.teak, dadoPanels: true, picture: { y: 3.15, m: M.teak }, cornice: M.teak } });
  const door = kit.door({ axis: 'x', at: N, center: C.victor.c, thick: T, width: C.victor.w, height: C.victor.h, hinge: -1, swing: -1,
    leafMat: M.paintGreen, panelMat: M.paintGreenLight, frameMat: M.teak, faces: [1], number: '202', card: 'V. Soren', threshold: M.edge });
  const linen = kit.door({ axis: 'x', at: N, center: C.linen.c, thick: T, width: C.linen.w, height: C.linen.h, hinge: 1, swing: -1,
    leafMat: M.paintCream, panelMat: M.limeCool, frameMat: M.teak, faces: [1], threshold: null, style: 'plain', casing: .12 });
  linen.userData.dynamic = false;
  const linenSign = canvasTexture(192, 64, (g, W, H) => { g.fillStyle = '#e8dcbc'; g.fillRect(0, 0, W, H); g.strokeStyle = '#6d5a3a'; g.lineWidth = 3; g.strokeRect(4, 4, W - 8, H - 8); g.fillStyle = '#4a3b2a'; g.font = 'bold 30px Georgia'; g.textAlign = 'center'; g.fillText('LINEN', W / 2, 43); });
  kit.plane(C.linen.c, 2.05, nf + .07, .42, .14, new THREE.MeshStandardMaterial({ map: linenSign, roughness: 1 }));

  // The corner room, glimpsed through 202 when it stands open: boards, the west window's cool
  // light, darkness. Heights step down with depth so nothing shows above the corridor wall.
  const beyond = kit.group(); beyond.userData.dynamic = true; beyond.visible = false; beyond.name = '202 beyond';
  {
    kit.use(beyond);
    kit.floor(1.8, -5.2, 3.6, 3.6, new THREE.MeshStandardMaterial({ map: boards, roughness: .7, color: '#9aa3b4' }), .01);
    for (const [z0, z1, h] of [[-3.42, -4.4, 2.6], [-4.4, -5.35, 2.35], [-5.35, -6.3, 1.6], [-6.3, -7.2, .9]]) {
      kit.box(.18, h / 2, (z0 + z1) / 2, .2, h, z0 - z1, M.limeCool, 0);
      if (h > 1.3 && z1 < -4.5) { const g = kit.plane(.3, Math.min(h, 2.4) / 2 + .7, (z0 + z1) / 2, z0 - z1 - .1, Math.min(h, 2.4) - 1.2, rainMat); g.rotation.y = Math.PI / 2; g.position.y = 1.2 + (Math.min(h, 2.4) - 1.2) / 2; }
    }
    kit.box(.27, 1.16, -5.3, .14, .08, 2.1, M.teak, .01);
    const cool = new THREE.PointLight('#86a9d6', 2.4, 4.2, 2); cool.position.set(.9, 1.8, -5.0); beyond.add(cool);
    kit.use(root);
  }
  // The forced strike: the keep torn off the latch-side jamb, splinters on the casing.
  const brokenStrike = kit.group(); brokenStrike.userData.dynamic = true; brokenStrike.visible = false;
  {
    kit.use(brokenStrike);
    const x = C.victor.c + C.victor.w / 2;
    for (const [dy, a, l] of [[.02, .5, .3], [-.12, -.4, .22], [.16, .25, .18]]) { const s = kit.box(x + .1, 1.36 + dy, nf + .06, .04, l, .03, M.edge, 0); s.rotation.z = a; }
    const keep = kit.box(x - .25, .06, N + .02, .12, .05, .2, M.brass, .01); keep.rotation.y = .6;
    kit.box(x - .12, .05, N + .12, .06, .03, .06, M.edge, 0).rotation.y = -.4;
    kit.use(root);
  }
  // Paper seal across the frame, applied at dawn.
  const sealTex = canvasTexture(512, 96, (g, W, H) => { g.fillStyle = '#eadcb0'; g.fillRect(0, 0, W, H); g.fillStyle = '#6b2f2a'; g.font = 'bold 30px Georgia'; g.textAlign = 'center'; g.fillText('PLEASE DO NOT ENTER', W / 2, 60); g.strokeStyle = 'rgba(80,60,40,.4)'; g.strokeRect(6, 6, W - 12, H - 12); });
  const seal = kit.plane(C.victor.c, 1.95, nf + .1, 1.85, .3, new THREE.MeshBasicMaterial({ map: sealTex }));
  seal.rotation.z = -.05; seal.userData.dynamic = true; seal.visible = false;

  // ---------------------------------------------------------------- west end: window, stair arrival
  kit.wall({ axis: 'z', at: Wx, from: N - T / 2, to: 3.3, thick: T, height: C.top, face: 1, mat: M.limeCool, cap: M.poche,
    openings: [{ a: C.window.c - C.window.w / 2, b: C.window.c + C.window.w / 2, bottom: C.window.bottom, top: C.window.top }],
    trims: { skirting: M.timber, dado: M.teakLight, rail: M.teak, picture: { y: 3.15, m: M.teak }, cornice: M.teak } });
  kit.window({ axis: 'z', at: Wx, center: C.window.c, width: C.window.w, bottom: C.window.bottom, top: C.window.top, thick: T, face: 1, glass: rainMat, cols: 2, rows: 2, transom: .6, frameMat: M.teak, sillMat: M.teakLight, outsideSill: null });
  kit.curtain({ axis: 'z', at: Wx, center: C.window.c, width: C.window.w, top: C.window.top + .12, drop: 2.9, face: 1, thick: T, m: M.indigoCloth, fold: M.indigo });
  // A window seat: somebody's favourite place to watch the valley.
  kit.box(Wx + .42, .5, C.window.c, .62, .1, 2.0, M.teak, .02);
  kit.box(Wx + .42, .25, C.window.c, .56, .5, 1.94, M.teakLight, .01);
  kit.box(Wx + .45, .6, C.window.c + .2, .5, .12, 1.2, M.ochreCloth, .05);
  block(Wx + .42, C.window.c, .7, 2.1, 'window seat');
  // The stair well: the last flight comes up from the lounge along the end wall.
  const W0 = C.well.x0, W1 = C.well.x1, sz = C.well.z0;
  for (let k = 1; k < 5; k++) {
    const top = -.36 * k, z = sz + .235 + (k - 1) * .47;
    kit.box((W0 + W1) / 2, top - .3, z, W1 - W0 - .06, .6, .5, M.wood, .02);
    kit.box((W0 + W1) / 2, top + .028, z, W1 - W0, .08, .51, M.timber, .015);
    kit.box((W0 + W1) / 2, top + .073, z, 1.16, .018, .44, M.burgundy, 0);
  }
  kit.box((W0 + W1) / 2, -.2, sz + .02, W1 - W0 + .1, .4, .1, M.teak, .01);
  // The well's walls go down with the flight; warm light rises from the lounge below.
  kit.box(Wx, -.95, (sz + 3.3) / 2, T, 1.9, 3.3 - sz, M.limeShade, 0);
  kit.box(W1 + .08, -.95, (sz + 3.3) / 2, .16, 1.9, 3.3 - sz, M.teak, 0);
  kit.box((W0 + W1) / 2, -.2, sz - .06, W1 - W0 + .3, .4, .12, M.timber, .01);
  for (const x of [Wx, W1 + .08]) kit.box(x, -.95, 3.32, x === Wx ? T + .02 : .2, 1.9, .05, M.poche, 0);
  kit.box((W0 + W1) / 2, -1.92, (sz + 3.3) / 2, W1 - W0 + .3, .06, 3.3 - sz, M.poche, 0);
  const rising = kit.decal((W0 + W1) / 2, 2.9, 2.4, 1.6, 'rgba(255,190,110,1)', .35, true, -.9);
  const fromBelow = new THREE.PointLight('#ffb66e', 3.2, 3.2, 2); fromBelow.position.set(-4.7, -.8, 2.9); root.add(fromBelow);
  // Balustrade on the open side of the well, with a newel post at the top of the stair.
  const bx = W1 + .05;
  kit.box(bx, .6, sz - .02, .22, 1.2, .22, M.teak, .02); kit.box(bx, 1.27, sz - .02, .3, .1, .3, M.teakLight, .02); kit.sphere(bx, 1.4, sz - .02, .12, .12, .12, M.teak);
  kit.box(bx, 1.02, (sz + 3.3) / 2, .1, .09, 3.3 - sz, M.teak, .02);
  for (let z = sz + .3; z < 3.3; z += .3) kit.box(bx, .52, z, .06, .96, .06, M.teakLight, .01);
  block(bx, (sz + 3.3) / 2, .3, 3.3 - sz, 'balustrade');
  block((W0 + W1) / 2, (sz + 3.3) / 2 + .15, W1 - W0, 3.3 - sz, 'stair well');

  // ---------------------------------------------------------------- south cut wall: 201 and 203
  const southDoor = c => ({ a: c - STD.door.width / 2, b: c + STD.door.width / 2, bottom: 0, top: STD.door.height, casing: .14 });
  kit.wall({ axis: 'x', at: S, from: bx + .1, to: C.east, thick: T, height: C.cut, face: -1, cap: M.poche, mat: M.teakLight,
    openings: [southDoor(C.south201), southDoor(C.south203)], trims: { skirting: M.timber } });
  for (const c of [C.south201, C.south203]) kit.door({ axis: 'x', at: S, center: c, thick: T, hinge: 1, swing: 1, leafMat: M.paintGreen, panelMat: M.paintGreenLight, frameMat: M.teak, faces: [-1], threshold: M.edge, cutAt: C.cut }).userData.dynamic = false;
  block((bx + C.east) / 2, S + .1, C.east - bx, T + .2, 'south wall');
  kit.box(Wx, C.cut / 2, 3.3, T + .02, C.cut, .06, M.poche, 0);

  // ---------------------------------------------------------------- the landing wall: the house's history
  const cx = -4.45;
  kit.box(cx, .86, nf + .26, 1.7, .08, .5, M.teak, .02);
  kit.box(cx, .6, nf + .26, 1.6, .44, .46, M.teakLight, .015);
  for (const dx of [-.75, .75]) kit.box(cx + dx, .3, nf + .26, .08, .6, .44, M.teak, .01);
  block(cx, nf + .26, 1.8, .6, 'landing console');
  // Table lamp, the emergency hurricane lantern and its matches, and the house notice.
  kit.cyl(cx + .55, .95, nf + .25, .15, .06, M.brass); kit.cyl(cx + .55, 1.2, nf + .25, .03, .5, M.brass);
  const shade = kit.cyl(cx + .55, 1.5, nf + .25, .24, .3, M.cream, .15); shade.material = new THREE.MeshStandardMaterial({ color: '#e8cf98', emissive: '#ffcf86', emissiveIntensity: .45 });
  const landingLamp = new THREE.PointLight('#ffc983', 4.2, 4.6, 2); landingLamp.position.set(cx + .55, 1.55, nf + .5); root.add(landingLamp);
  kit.cyl(cx - .45, 1.02, nf + .24, .13, .12, M.iron); kit.cyl(cx - .45, 1.2, nf + .24, .1, .24, new THREE.MeshStandardMaterial({ color: '#c9d2cf', transparent: true, opacity: .55 }), .08);
  kit.cyl(cx - .45, 1.38, nf + .24, .06, .08, M.iron); kit.box(cx - .2, .92, nf + .3, .12, .04, .08, M.rust, .005);
  const noticeTex = canvasTexture(256, 192, (g, W, H) => { g.fillStyle = '#efe4c6'; g.fillRect(0, 0, W, H); g.fillStyle = '#3a3129'; g.textAlign = 'center'; g.font = 'bold 22px Georgia'; g.fillText('CEDAR HOUSE', W / 2, 40); g.font = '17px Georgia'; ['Breakfast 7.30 – 9.30', 'Quiet after ten, please.', 'Lamps in the hall for', 'when the power goes.'].forEach((t, i) => g.fillText(t, W / 2, 78 + i * 26)); });
  const notice = kit.box(cx + .05, 1.03, nf + .2, .34, .25, .03, new THREE.MeshStandardMaterial({ map: noticeTex, roughness: 1 }), 0); notice.rotation.x = -.25;
  // The photograph group: founding, family, monsoon, the new roof, and Ada's handwritten plaque.
  const sepia = (g, W, H, fn) => { g.fillStyle = '#b89e74'; g.fillRect(0, 0, W, H); fn(g, W, H); const v = g.createRadialGradient(W / 2, H / 2, W * .2, W / 2, H / 2, W * .75); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(60,40,20,.45)'); g.fillStyle = v; g.fillRect(0, 0, W, H); };
  const houseShape = (g, W, H, s = 1) => { g.fillStyle = '#5b4631'; g.fillRect(W * .18, H * .5, W * .64, H * .3); g.beginPath(); g.moveTo(W * .12, H * .52); g.lineTo(W * .5, H * .22); g.lineTo(W * .88, H * .52); g.fill(); g.fillStyle = '#7a6246'; g.fillRect(W * .12, H * .68, W * .76, H * .04); g.fillStyle = '#e6d2a4'; for (let i = 0; i < 4; i++) g.fillRect(W * (.24 + i * .15), H * .56, W * .06, H * .08 * s); };
  const photos = [
    { u: cx - .2, y: 2.55, w: 1.05, h: .78, cap: 'Cedar House, 1927', draw: (g, W, H) => sepia(g, W, H, () => { g.fillStyle = '#8c7658'; g.fillRect(0, H * .8, W, H * .2); houseShape(g, W, H); g.fillStyle = '#4c3b2a'; g.fillRect(W * .9, H * .3, W * .04, H * .5); }) },
    { u: cx - 1.1, y: 2.35, w: .52, h: .64, cap: 'The Moss family, 1958', draw: (g, W, H) => sepia(g, W, H, () => { for (const [x, s] of [[.3, 1], [.52, 1.15], [.72, .8]]) { g.fillStyle = '#4e3d2b'; g.beginPath(); g.ellipse(W * x, H * .75, W * .1 * s, H * .16 * s, 0, 0, 7); g.fill(); g.beginPath(); g.arc(W * x, H * (.5 - .05 * s), W * .06 * s, 0, 7); g.fill(); } }) },
    { u: cx + .82, y: 2.72, w: .6, h: .44, cap: 'Monsoon, 1961', draw: (g, W, H) => sepia(g, W, H, () => { for (let i = 0; i < 3; i++) { g.fillStyle = ['#8b7a60', '#6e5e47', '#4f4232'][i]; g.beginPath(); g.moveTo(0, H); for (let x = 0; x <= W; x += 12) g.lineTo(x, H * (.45 + i * .15) + Math.sin(x * .04 + i) * 9); g.lineTo(W, H); g.fill(); } g.strokeStyle = 'rgba(240,230,210,.35)'; for (let x = 0; x < W; x += 9) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x - 6, H); g.stroke(); } }) },
    { u: cx + .72, y: 1.95, w: .46, h: .34, cap: 'The new roof, 1981', draw: (g, W, H) => sepia(g, W, H, () => { houseShape(g, W, H); g.strokeStyle = '#3b2e21'; g.lineWidth = 2; for (let x = W * .1; x < W; x += W * .12) { g.beginPath(); g.moveTo(x, H * .15); g.lineTo(x, H * .8); g.stroke(); } g.beginPath(); g.moveTo(0, H * .3); g.lineTo(W, H * .3); g.stroke(); }) }
  ];
  for (const p of photos) kit.frame({ axis: 'x', at: nf, u: p.u, y: p.y, w: p.w, h: p.h, face: 1, draw: p.draw, caption: p.cap, frameMat: M.teak, mount: '#e4d8bc' });
  const plaqueTex = canvasTexture(256, 160, (g, W, H) => { g.fillStyle = '#f0e6cc'; g.fillRect(0, 0, W, H); g.fillStyle = '#2f3a4a'; g.font = 'italic 22px Georgia'; g.textAlign = 'center'; ['Please switch off the', 'lights when you go out.', 'Thank you! — A. Moss'].forEach((t, i) => g.fillText(t, W / 2, 48 + i * 36)); });
  kit.box(cx - 1.12, 1.55, nf + .03, .5, .34, .02, M.teak, .005);
  kit.plane(cx - 1.12, 1.55, nf + .045, .46, .3, new THREE.MeshStandardMaterial({ map: plaqueTex, roughness: 1 }));
  // An old switch board with piano switches, and the wayfinding board for the rooms beyond.
  kit.box(-2.62, 1.45, nf + .03, .36, .24, .05, M.teak, .01);
  for (let i = 0; i < 3; i++) kit.box(-2.72 + i * .1, 1.45, nf + .065, .04, .1, .03, i === 1 ? M.black : M.paintCream, .005);
  const wayTex = canvasTexture(384, 128, (g, W, H) => { g.fillStyle = '#26382f'; g.fillRect(0, 0, W, H); g.strokeStyle = '#c9a862'; g.lineWidth = 4; g.strokeRect(6, 6, W - 12, H - 12); g.fillStyle = '#efdcaa'; g.font = '600 34px Georgia'; g.textAlign = 'center'; g.fillText('ROOMS 201 – 205', W / 2, 58); g.font = '36px Georgia'; g.fillText('→', W / 2, 104); });
  kit.box(-2.62, 2.45, nf + .04, .78, .28, .04, M.teak, .01);
  kit.plane(-2.62, 2.45, nf + .065, .74, .25, new THREE.MeshStandardMaterial({ map: wayTex, roughness: .9 }));

  // ---------------------------------------------------------------- the corridor proper: two sconces
  const sconceX = [.05, 3.5];
  const sconces = sconceX.map(x => kit.sconce('x', nf, x, 2.35, 1, '#ffc983', 3.2));
  // A sand-filled fire bucket, painted red long ago, hangs near the far end.
  kit.box(5.35, 1.55, nf + .04, .08, .08, .06, M.iron, 0);
  kit.cyl(5.35, 1.22, nf + .2, .16, .4, M.rust, .19);
  kit.cyl(5.35, 1.42, nf + .2, .18, .02, M.rustLight, .18);
  // A second, smaller pair of prints beside 202 keeps the long wall from going blank.
  kit.frame({ axis: 'x', at: nf, u: 4.55, y: 2.4, w: .5, h: .62, face: 1, frameMat: M.teak, mount: '#d9ccb0', caption: 'Kudremukh from the road', draw: (g, W, H) => { g.fillStyle = '#8fa3a6'; g.fillRect(0, 0, W, H); for (let i = 0; i < 3; i++) { g.fillStyle = ['#6e8683', '#4f6763', '#35494a'][i]; g.beginPath(); g.moveTo(0, H); for (let x = 0; x <= W; x += 10) g.lineTo(x, H * (.4 + i * .17) + Math.sin(x * .05 + i * 2) * 8); g.lineTo(W, H); g.fill(); } } });

  // ---------------------------------------------------------------- the corridor carries on east
  const fade = canvasTexture(256, 16, (g, W, H) => { const gr = g.createLinearGradient(0, 0, W, 0); gr.addColorStop(0, 'rgba(6,8,12,0)'); gr.addColorStop(.55, 'rgba(6,8,12,.85)'); gr.addColorStop(1, 'rgba(6,8,12,1)'); g.fillStyle = gr; g.fillRect(0, 0, W, H); });
  const fadeMat = new THREE.MeshBasicMaterial({ map: fade, transparent: true, depthWrite: false });
  const f1 = kit.plane(7.9, .06, -.8, 3.6, 4.9, fadeMat); f1.rotation.x = -Math.PI / 2; f1.renderOrder = 2;
  const f2 = kit.plane(7.9, 2.1, nf + .12, 3.6, 4.2, fadeMat); f2.renderOrder = 2;
  const f3 = kit.plane(7.9, C.cut / 2 + .02, sf - .02, 3.6, C.cut + .1, fadeMat); f3.rotation.y = Math.PI; f3.renderOrder = 2;
  const farWindow = kit.plane(9.35, 2.1, -.8, 1.3, 2.2, new THREE.MeshBasicMaterial({ color: '#3d5470', transparent: true, opacity: .5 }));
  farWindow.rotation.y = -Math.PI / 2; farWindow.userData.dynamic = true;

  // ---------------------------------------------------------------- lights: cool, quiet, practical
  root.add(new THREE.HemisphereLight('#9fb4c8', '#2c3038', .62));
  const key = new THREE.DirectionalLight('#93b9e3', 1.9); key.position.set(-8, 8, 1); key.target.position.set(1, 0, -1);
  key.castShadow = true; key.shadow.mapSize.set(2048, 2048); Object.assign(key.shadow.camera, { left: -10, right: 10, top: 8, bottom: -8, near: .1, far: 35 }); key.shadow.bias = -.0005; key.shadow.normalBias = .025;
  root.add(key, key.target);
  const fill = new THREE.DirectionalLight('#dcc3a4', .26); fill.position.set(6, 8, 9); root.add(fill);
  kit.decal(-4.45, -2.35, 2.6, 2.2, 'rgba(255,200,130,1)', .22, true, .04);
  for (const x of sconceX) kit.decal(x, -2.1, 2.6, 2.6, 'rgba(255,200,130,1)', .2, true, .045);
  kit.decal(-5.2, -.9, 2.6, 3.4, 'rgba(110,160,200,1)', .16, true, .045);

  kit.merge(root);
  corridor.bounds = { minX: -5.75, maxX: 6.4, minZ: -2.95, maxZ: 2.7 };
  Object.assign(corridor, { doorPivot: door, doorOpen: C.victor.open, doorBeyond: beyond, seal, brokenStrike, doorPoint: { x: 1.55, z: -1.65 }, stairPoint: { x: -4.7, z: 1.5 }, viewH: 9.6, viewW: 16.4, center: { x: .5, z: -1.55 }, fromBelow, landingLamp, sconces, farWindow, rising });
  return corridor;
}
