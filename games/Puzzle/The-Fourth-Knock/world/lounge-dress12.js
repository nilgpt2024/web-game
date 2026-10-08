import * as THREE from 'three';

// The lounge art pass (brief §9): each zone gets only the objects that explain what it is for.
// Entrance: coat hooks over the umbrella stand, a barometer. Window side: curtains, a tea tray, the day's newspapers.
// Hearth: logs and fire irons. North wall: the house sign over the kitchen door, the family,
// a walking map. Reception: Ada's register, her ledger and the bill she has not paid, her keys.
// One bucket catches the roof's leak. Nothing here is evidence; every lane and mark stays clear.
export function dressLounge12({ room, M, kit, canvasTexture, motions, hero }) {
  const root = kit.group(0, 0, 0, room.root); root.name = 'Lounge dressing'; kit.use(root);
  const block = (x, z, w, d, label) => room.collisions.push({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2, label });
  const WX = -6.68, NZ = -5.5;   // inner faces of the west and north walls
  const tex = (w, h, draw) => new THREE.MeshStandardMaterial({ map: canvasTexture(w, h, draw), roughness: 1 });

  // ---------------------------------------------------------------- north wall
  // The house sign, over the kitchen door: the first thing guests read after the fire.
  kit.box(-4.8, 3.66, NZ + .05, 1.86, .78, .08, M.timber, .02);
  kit.plane(-4.8, 3.66, NZ + .095, 1.72, .66, tex(768, 320, (c, W, H) => { c.fillStyle = '#263932'; c.fillRect(0, 0, W, H); c.strokeStyle = '#b4995e'; c.lineWidth = 5; c.strokeRect(15, 15, W - 30, H - 30); c.fillStyle = '#eddbaf'; c.textAlign = 'center'; c.font = '58px Georgia'; c.fillText('Cedar House', W / 2, 138); c.fillStyle = '#c1a46a'; c.font = '24px Courier New'; c.fillText('MAKE YOURSELF AT HOME', W / 2, 218); }));
  // The family, left of the chimney: three small photographs hung as one group.
  const sepia = (c, W, H, fn) => { c.fillStyle = '#b89e74'; c.fillRect(0, 0, W, H); fn(c, W, H); const v = c.createRadialGradient(W / 2, H / 2, W * .2, W / 2, H / 2, W * .8); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(60,40,20,.5)'); c.fillStyle = v; c.fillRect(0, 0, W, H); };
  const figure = (c, x, y, s) => { c.fillStyle = '#4e3d2b'; c.beginPath(); c.ellipse(x, y, 16 * s, 24 * s, 0, 0, 7); c.fill(); c.beginPath(); c.arc(x, y - 30 * s, 10 * s, 0, 7); c.fill(); };
  for (const [u, y, w, h, fn] of [
    [-2.28, 2.95, .42, .52, (c, W, H) => sepia(c, W, H, () => { figure(c, W * .38, H * .72, 1.1); figure(c, W * .64, H * .74, 1); })],
    [-1.82, 3.1, .34, .42, (c, W, H) => sepia(c, W, H, () => figure(c, W * .5, H * .72, 1.2))],
    [-2.02, 2.36, .52, .36, (c, W, H) => sepia(c, W, H, () => { c.fillStyle = '#5b4631'; c.fillRect(W * .2, H * .45, W * .6, H * .35); c.beginPath(); c.moveTo(W * .15, H * .47); c.lineTo(W * .5, H * .2); c.lineTo(W * .85, H * .47); c.fill(); figure(c, W * .3, H * .9, .6); })]
  ]) kit.frame({ axis: 'x', at: NZ - .15, u, y, w, h, face: 1, draw: fn, frameMat: M.teak, mount: '#e2d4b4' });
  // Right of the chimney: the walking map Ada gives to anyone who asks about the view.
  kit.frame({ axis: 'x', at: NZ - .15, u: 2.05, y: 2.85, w: .78, h: .58, face: 1, frameMat: M.teak, mount: '#e9dcb6', caption: 'Walks from Cedar House',
    draw: (c, W, H) => { c.fillStyle = '#e9dcb6'; c.fillRect(0, 0, W, H); c.strokeStyle = '#7b8b6a'; c.lineWidth = 2; for (let i = 0; i < 5; i++) { c.beginPath(); c.ellipse(W * .62, H * .45, W * (.1 + i * .07), H * (.08 + i * .06), .3, 0, 7); c.stroke(); } c.strokeStyle = '#8e3f33'; c.setLineDash([5, 4]); c.lineWidth = 3; c.beginPath(); c.moveTo(W * .12, H * .85); c.bezierCurveTo(W * .3, H * .5, W * .45, H * .8, W * .62, H * .45); c.stroke(); c.setLineDash([]); c.fillStyle = '#26382f'; c.fillRect(W * .09, H * .8, 12, 10); c.fillStyle = '#3a3129'; c.font = 'italic 13px Georgia'; c.fillText('the falls', W * .66, H * .38); } });
  // Hearth: a cane basket of logs and the fire irons on their stand.
  kit.cyl(-2.15, .28, -4.72, .36, .56, M.caneWeave, .4);
  for (let i = 0; i < 5; i++) { const l = kit.cyl(-2.15 + (i % 3 - 1) * .18, .6 + Math.floor(i / 3) * .12, -4.72 + (i % 2 - .5) * .14, .07, .6, M.wood, .08); l.rotation.z = Math.PI / 2; l.rotation.y = i * .7; }
  block(-2.15, -4.72, .8, .8, 'log basket');
  kit.cyl(1.98, .04, -4.75, .2, .06, M.iron); kit.cyl(1.98, .55, -4.75, .025, 1.0, M.iron);
  for (const [dx, a] of [[-.08, .18], [.07, -.14], [0, .02]]) { const t = kit.cyl(1.98 + dx, .6, -4.72, .018, 1.05, M.iron); t.rotation.z = a; }
  block(1.98, -4.75, .5, .5, 'fire irons');
  // The leak: a bucket beside the kitchen door and a plink every few seconds.
  kit.cyl(-3.5, .2, -5.1, .2, .4, M.stoneLight, .24);
  kit.cyl(-3.5, .36, -5.1, .21, .02, new THREE.MeshStandardMaterial({ color: '#4e6a7a', roughness: .15, metalness: .2 }), .21);
  kit.plane(-3.45, 3.95, NZ + .02, .9, 1.2, new THREE.MeshBasicMaterial({ map: canvasTexture(64, 96, (c, W, H) => { const g = c.createRadialGradient(W / 2, H * .2, 2, W / 2, H * .35, W * .7); g.addColorStop(0, 'rgba(60,40,24,.35)'); g.addColorStop(1, 'rgba(60,40,24,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); }), transparent: true, depthWrite: false }));
  const drop = kit.box(-3.5, 3.5, -5.1, .03, .08, .03, new THREE.MeshBasicMaterial({ color: '#b8d2e2', transparent: true, opacity: .8 }), 0);
  drop.castShadow = false; drop.userData.dynamic = true;
  motions.push({ kind: 'leak', o: drop, seed: 0 });
  block(-3.5, -5.1, .5, .5, 'leak bucket');

  // ---------------------------------------------------------------- the window side
  for (const c of [-4.15, -1.35, 1.45]) hero.place('CUR_lounge', root, WX, 1.1, c, Math.PI / 2, [.9, 1.0, 1]);
  // Tea for whoever comes in from the rain, on the window cabinet.
  kit.box(-5.9, 1.08, -3.3, .6, .03, .46, M.brass, .01);
  kit.cyl(-5.98, 1.2, -3.36, .12, .2, M.cream, .09); kit.cyl(-5.98, 1.32, -3.36, .03, .05, M.cream);
  const spout = kit.cyl(-5.84, 1.22, -3.36, .02, .14, M.cream, .012); spout.rotation.z = -.9;
  for (const dz of [-.12, .12]) kit.cyl(-5.72, 1.13, -3.2 + dz, .05, .07, M.paintCream, .055);
  // Today's paper and last week's, in a cane basket between the armchair and the lamp table.
  kit.cyl(-5.62, .22, .32, .26, .44, M.caneWeave, .3);
  for (let i = 0; i < 3; i++) { const p = kit.box(-5.6 + i * .04, .5 + i * .02, .32, .5, .02, .36, i === 1 ? M.cream : M.paper, .004); p.rotation.x = .3 + i * .1; p.rotation.y = i * .2; }
  block(-5.62, .32, .6, .6, 'newspaper basket');

  // ---------------------------------------------------------------- the entrance
  // Brass hooks on the panel beside the door, over the umbrella stand: a mustard raincoat and a
  // black umbrella, hung where they never block the doorway.
  kit.box(WX + .03, 2.45, 3.24, .05, .1, .56, M.teak, .01);
  for (const z of [3.04, 3.24, 3.44]) kit.cyl(WX + .1, 2.43, z, .022, .14, M.brass, .02).rotation.z = Math.PI / 2;
  kit.box(WX + .12, 1.86, 3.14, .14, 1.1, .4, M.ochreCloth, .06);
  kit.box(WX + .12, 2.36, 3.14, .12, .14, .28, M.ochreCloth, .03);
  const brolly = kit.cyl(WX + .14, 1.9, 3.42, .045, .95, M.black, .015); brolly.rotation.x = .06;
  // A brass barometer beside the door. It says what everybody already knows.
  kit.cyl(WX + .05, 2.35, 5.18, .2, .06, M.brass, .2, root, 24).rotation.z = Math.PI / 2;
  const dial = kit.plane(WX + .085, 2.35, 5.18, .32, .32, tex(128, 128, (c, W, H) => { c.fillStyle = '#efe4c6'; c.beginPath(); c.arc(64, 64, 62, 0, 7); c.fill(); c.fillStyle = '#3a3129'; c.textAlign = 'center'; c.font = 'bold 12px Georgia'; c.fillText('STORMY', 30, 96); c.fillText('RAIN', 38, 42); c.fillText('CHANGE', 64, 24); c.fillText('FAIR', 94, 46); c.fillText('DRY', 100, 96); c.strokeStyle = '#8e3f33'; c.lineWidth = 3; c.beginPath(); c.moveTo(64, 64); c.lineTo(28, 86); c.stroke(); c.fillStyle = '#3a3129'; c.beginPath(); c.arc(64, 64, 5, 0, 7); c.fill(); }));
  dial.rotation.y = Math.PI / 2;

  // ---------------------------------------------------------------- reception: Ada's desk
  // The register lies open toward the guests; her ledger has a bill tucked in it, stamped.
  kit.box(5.32, 1.565, 1.78, .62, .04, .44, M.paper, .005).rotation.y = -.25;
  kit.plane(5.32, 1.59, 1.78, .58, .4, tex(256, 180, (c, W, H) => { c.fillStyle = '#efe4c6'; c.fillRect(0, 0, W, H); c.fillStyle = '#c9b88f'; c.fillRect(W / 2 - 2, 0, 4, H); c.strokeStyle = '#7d8a9a'; c.lineWidth = 1; for (let y = 24; y < H; y += 16) { c.beginPath(); c.moveTo(10, y); c.lineTo(W - 10, y); c.stroke(); } c.fillStyle = '#34495a'; c.font = 'italic 12px Georgia'; ['M. Senn', 'E. Brann'].forEach((t, i) => c.fillText(t, 16, 70 + i * 16)); c.fillStyle = 'rgba(52,73,90,.35)'; for (let i = 0; i < 3; i++) c.fillRect(16, 26 + i * 14, 60 + i * 12, 3); })).rotation.set(-Math.PI / 2, 0, .25);
  kit.box(6.15, 1.57, 3.02, .5, .05, .36, M.burgundy, .01).rotation.y = .15;
  const bill = kit.plane(6.08, 1.602, 2.92, .26, .34, tex(128, 168, (c, W, H) => { c.fillStyle = '#f2ecd8'; c.fillRect(0, 0, W, H); c.fillStyle = '#66615a'; for (let y = 30; y < H - 20; y += 12) c.fillRect(12, y, W - 24 - (y % 3) * 8, 3); c.save(); c.translate(W / 2, H * .6); c.rotate(-.35); c.strokeStyle = '#a3322a'; c.lineWidth = 3; c.strokeRect(-50, -15, 100, 30); c.fillStyle = '#a3322a'; c.font = 'bold 15px Courier New'; c.textAlign = 'center'; c.fillText('FINAL NOTICE', 0, 5); c.restore(); }));
  bill.rotation.set(-Math.PI / 2, 0, .4);
  // Ada's keys on the desk front, where she can reach them without looking.
  for (let i = 0; i < 3; i++) { kit.box(4.86, 1.26, 2.1 + i * .22, .03, .04, .03, M.brass, .004); const r = kit.add(new THREE.TorusGeometry(.045, .01, 5, 12), M.brass, 4.84, 1.16, 2.1 + i * .22); r.rotation.y = Math.PI / 2; kit.box(4.83, 1.06, 2.1 + i * .22, .015, .1, .05, M.brassDark, .003); }
  // A coir mat at the foot of the stair.
  kit.box(5.05, .035, .12, 1.5, .03, .8, M.caneDark, .01);
  kit.merge(root);
}
