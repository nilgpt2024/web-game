import * as THREE from 'three';
import { STD } from './kit12.js';

// The covered veranda runs along the lounge's west wall (handoff/step12 architecture map §2).
// Veranda frame: X along the facade (X = house z - 2.67), Z away from the house toward the
// garden (Z = -9.57 - house x). The facade here IS the lounge's west wall: the same posts,
// the same three windows (lit from inside), the same front door (hinged on the left seen from
// outside, opening inward). The roof is built for the opening's exterior shots and hidden in
// play, where the veranda reads as a cut-away like every other room.
export const FACADE = { z: -2.74, t: STD.wall.exterior, outer: -2.59, top: 4.6 };
export const POSTS = [-8.22, -5.42, -2.62, .18, 2.88];
export const WINDOWS = [{ c: -6.82, w: 2.56 }, { c: -4.02, w: 2.56 }, { c: -1.22, w: 2.56 }];
export const DOOR = { c: 1.55, w: STD.front.width, h: STD.front.height, fan: STD.front.fanlight };
export const CORNER_X = 3.26;          // outer face of the lounge's south wall
export const FRONT_Z = 2.95;           // veranda floor edge
export const toHouse = (X, Z) => ({ x: -9.57 - Z, z: X + 2.67 });

// Rain streaks for open air (the lounge's rain panes use the shared painted-storm shader).
export function makeOpenRain(rainMat) {
  return new THREE.ShaderMaterial({
    uniforms: { time: rainMat.uniforms.time, intensity: rainMat.uniforms.intensity, flash: rainMat.uniforms.flash },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }',
    fragmentShader: `varying vec2 vUv; uniform float time; uniform float intensity; uniform float flash;
      float hash(float x){ return fract(sin(x * 127.1) * 43758.5453); }
      void main(){
        vec2 r = vUv * vec2(72., 4.4); r.x += vUv.y * 2.4;
        float id = floor(r.x), len = .1 + hash(id) * .2;
        float streak = step(.93, fract(r.x)) * smoothstep(len, 0., fract(r.y + time * (1.7 + hash(id)) + hash(id) * 12.));
        float edge = smoothstep(0., .12, vUv.y) * smoothstep(1., .75, vUv.y);
        float a = (streak * .46 * intensity + flash * .05) * edge;
        gl_FragColor = vec4(vec3(.64, .8, .94) * a, a);
      }`
  });
}

// Pieces shared by the veranda room and the slice of veranda seen from the lounge's front door.
export function verandaFloor(kit, M, { x0 = -12.5, x1 = 3.9, keep = null } = {}) {
  const w = x1 - x0, c = (x0 + x1) / 2, d = FRONT_Z - FACADE.outer;
  if (!keep) kit.box(c, -.4, (FACADE.outer + FRONT_Z) / 2, w, .88, d, M.laterite, 0);
  // Large wet slate slabs in three tones; the joints stay broad and graphic. The slab grid is
  // fixed to the facade, so a clipped copy (seen through the front door) matches exactly.
  for (let x = -12.5 + .55; x < x1; x += 1.1) for (let z = FACADE.outer + .47; z < FRONT_Z - .1; z += .92) {
    if (x < x0 || (keep && !keep(x, z))) continue;
    const alt = (Math.round(x * 1.7 + z * 3.1) % 3 + 3) % 3;
    kit.box(x, .03, z, 1.06, .06, .88, alt === 0 ? M.stoneLight : alt === 1 ? M.stone : M.wetStone, .01);
  }
  if (!keep) kit.box(c, .05, FRONT_Z - .07, w, .1, .18, M.stoneLight, .02);   // bull-nosed edge stone
}
export function doormat(kit, M) {
  kit.box(DOOR.c, .075, FACADE.outer + .6, 1.5, .03, .9, M.caneDark, .01);
  kit.box(DOOR.c, .082, FACADE.outer + .6, 1.3, .03, .72, M.cane, .01);
}
export function shoeRack(kit, M) {
  const x = -.55, z = FACADE.outer + .32;
  kit.box(x, .26, z, 1.15, .06, .42, M.teak, .01); kit.box(x, .56, z, 1.15, .05, .42, M.teak, .01);
  for (const dx of [-.55, .55]) kit.box(x + dx, .3, z, .05, .6, .42, M.teak, .01);
  for (const [dx, y, m] of [[-.35, .6, M.rust], [-.12, .6, M.rust], [.2, .31, M.black], [.38, .31, M.black]]) kit.box(x + dx, y + .03, z, .16, .06, .34, m, .02);
  // Gumboots, wet, beside the rack.
  for (const dz of [0, .2]) { kit.box(x + .82, .3, z + dz, .14, .56, .18, M.black, .04); kit.box(x + .82, .05, z + dz + .06, .16, .08, .3, M.black, .03); }
}
export function bench(kit, M) {
  const x = -4.0, z = FACADE.outer + .52;
  kit.box(x, .58, z, 2.5, .12, .7, M.teak, .02);
  kit.box(x, 1.02, z - .3, 2.55, .56, .08, M.teak, .02);
  for (const dx of [-1.1, 1.1]) { kit.box(x + dx, .28, z, .1, .56, .62, M.teakLight, .015); kit.box(x + dx, .86, z - .02, .08, .4, .66, M.teakLight, .01); }
  kit.box(x - .45, .7, z + .02, 1.0, .14, .52, M.indigoCloth, .06);
}
export function lantern(kit, M, X, parent) {
  const z = FACADE.outer + .06;
  kit.box(X, 2.52, z + .05, .1, .1, .12, M.brassDark, .01, parent);
  kit.box(X, 2.62, z + .22, .3, .06, .3, M.brassDark, .01, parent);
  const glass = kit.box(X, 2.4, z + .22, .24, .36, .24, new THREE.MeshStandardMaterial({ color: '#ffe0a4', emissive: '#ffcf86', emissiveIntensity: .9 }), .02, parent);
  glass.castShadow = false;
  kit.box(X, 2.2, z + .22, .28, .05, .28, M.brassDark, .01, parent);
  const light = new THREE.PointLight('#f2bd75', 11, 6, 2); light.position.set(X, 2.35, z + .6); light.castShadow = false;
  (parent || kit.group()).add(light);
  return light;
}

export function buildVeranda12({ rooms, M, kit, rainMat, canvasTexture, motions, plant, pool }) {
  const veranda = { root: new THREE.Group(), collisions: [], bounds: { minX: -4.7, maxX: 2.9, minZ: -2.2, maxZ: 2.55 }, viewH: 9.8, viewW: 15.8, center: { x: -.35, z: .45 } };
  const root = veranda.root; root.name = 'Covered veranda';
  kit.use(root);
  const block = (x, z, w, d, label) => veranda.collisions.push({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2, label });
  const openRain = makeOpenRain(rainMat);
  veranda.openRain = openRain;

  // ---------------------------------------------------------------- the facade (the lounge's west wall)
  const fz = FACADE.z, T = FACADE.t;
  const wall = (a, b, y0, y1, m = M.plaster) => { if (b - a > .02) kit.box((a + b) / 2, (y0 + y1) / 2, fz, b - a, y1 - y0, T, m, 0); };
  // Posts and head beam, exactly on the lounge's bay lines.
  for (const X of POSTS) kit.box(X, FACADE.top / 2, fz + .06, .26, FACADE.top, T + .12, M.teak, .02);
  kit.box((-12.6 + CORNER_X) / 2, 4.2, fz + .08, CORNER_X + 12.6, .3, T + .16, M.teak, .02);
  kit.box((-12.6 + CORNER_X) / 2, 4.47, fz + .04, CORNER_X + 12.6, .26, T + .1, M.wood, .02);
  kit.box(CORNER_X - .13, FACADE.top / 2, fz, .26, FACADE.top, T + .02, M.teak, .02);   // the building's corner
  // Past the corner the lounge's south wall runs back from the veranda (it hides the entrance
  // slice behind the door from this side, as the real wall would).
  kit.box(CORNER_X - .15, FACADE.top / 2, -4.6, .3, FACADE.top, 4.0, M.lime, 0);
  // North of the lounge the facade continues as the kitchen block: plainer, one shuttered window.
  kit.box(-10.55, FACADE.top / 2, fz, 4.1, FACADE.top, T, M.limeCool, 0);
  kit.box(-10.55, .67, fz + T / 2 + .02, 4.1, 1.34, .04, M.teakLight, 0);
  kit.box(-10.9, 2.5, fz + T / 2 + .03, 1.3, 1.5, .05, M.teak, .01);
  for (const s of [-1, 1]) kit.box(-10.9 + s * .36, 2.5, fz + T / 2 + .06, .6, 1.4, .04, M.paintGreen, .01);
  // Window bays: lime-washed sill wall, sashes, glass lit from inside, a warm card of the room.
  const cards = [
    { c: WINDOWS[1].c, draw: 'cabinet' }, { c: WINDOWS[2].c, draw: 'lamp' }, { c: WINDOWS[0].c, draw: 'plant' }
  ];
  for (const { c, w } of WINDOWS) {
    wall(c - w / 2, c + w / 2, 0, 1.22, M.lime);
    kit.box(c, .62, fz + T / 2 + .02, w, 1.2, .04, M.limeShade, 0);
    kit.window({ axis: 'x', at: fz, center: c, width: w, bottom: 1.22, top: 4.05, thick: T, face: 1, glass: new THREE.MeshBasicMaterial({ color: '#f6c47d', transparent: true, opacity: .16, depthWrite: false }), cols: 2, rows: 2, transom: .72, frameMat: M.teak, sillMat: M.stoneLight, outsideSill: null });
  }
  for (const k of cards) {
    const tex = canvasTexture(256, 256, (g, W, H) => {
      const bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#6b3a26'); bg.addColorStop(.5, '#c9824a'); bg.addColorStop(1, '#8a4a2c');
      g.fillStyle = bg; g.fillRect(0, 0, W, H);
      const lamp = k.draw === 'lamp' ? [.42, .62] : k.draw === 'cabinet' ? [.72, .7] : [.3, .66];
      const glow = g.createRadialGradient(W * lamp[0], H * lamp[1], 4, W * lamp[0], H * lamp[1], W * .55);
      glow.addColorStop(0, 'rgba(255,236,190,1)'); glow.addColorStop(.3, 'rgba(255,200,130,.6)'); glow.addColorStop(1, 'rgba(255,190,120,0)');
      g.fillStyle = glow; g.fillRect(0, 0, W, H);
      g.fillStyle = '#3a2219';
      if (k.draw === 'cabinet') { g.fillRect(0, H * .76, W, H * .24); g.fillStyle = '#e9c98a'; g.beginPath(); g.moveTo(W * .64, H * .6); g.lineTo(W * .8, H * .6); g.lineTo(W * .76, H * .5); g.lineTo(W * .68, H * .5); g.fill(); g.fillStyle = '#5a2c24'; g.fillRect(W * .18, H * .52, W * .22, H * .3); }
      if (k.draw === 'lamp') { g.fillRect(W * .3, H * .74, W * .24, H * .26); g.fillStyle = '#e9c98a'; g.beginPath(); g.moveTo(W * .34, H * .58); g.lineTo(W * .5, H * .58); g.lineTo(W * .46, H * .47); g.lineTo(W * .38, H * .47); g.fill(); g.fillStyle = '#2f3a24'; g.fillRect(W * .72, H * .62, W * .28, H * .38); }
      if (k.draw === 'plant') { g.fillRect(0, H * .8, W, H * .2); g.fillStyle = '#2d3a22'; for (let i = 0; i < 7; i++) { g.beginPath(); g.ellipse(W * (.24 + i * .02), H * (.6 - (i % 3) * .06), 9, 26, (i - 3) * .35, 0, 7); g.fill(); } }
      // Curtain edges, gathered to each side.
      g.fillStyle = 'rgba(96,44,34,.9)'; g.fillRect(0, 0, W * .1, H); g.fillRect(W * .9, 0, W * .1, H);
    });
    kit.plane(k.c, 2.62, fz - .45, 2.5, 2.9, new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }));
  }
  // Door bay: plaster panels either side, fanlight, the door itself.
  const d0 = DOOR.c - DOOR.w / 2, d1 = DOOR.c + DOOR.w / 2;
  wall(POSTS[3] + .13, d0, 0, 4.05); wall(d1, POSTS[4] - .13, 0, 4.05); wall(d0, d1, DOOR.h + DOOR.fan, 4.05);
  for (const [a, b] of [[POSTS[3] + .13, d0 - .14], [d1 + .14, POSTS[4] - .13]]) {
    kit.box((a + b) / 2, .67, fz + T / 2 + .02, b - a, 1.34, .04, M.teakLight, 0);
    kit.box((a + b) / 2, 1.37, fz + T / 2 + .05, b - a, .07, .09, M.teak, .01);
  }
  const fanWarm = new THREE.MeshBasicMaterial({ color: '#ffd89a', toneMapped: false });
  const door = kit.door({ axis: 'x', at: fz, center: DOOR.c, thick: T, width: DOOR.w, height: DOOR.h, hinge: -1, swing: -1,
    leafMat: M.paintGreen, panelMat: M.paintGreenLight, frameMat: M.teak, faces: [1], threshold: M.stoneLight, fanlight: DOOR.fan, fanGlass: [fanWarm, null] });
  // House sign on the head beam, painted board.
  const signTex = canvasTexture(768, 160, (g, W, H) => { g.fillStyle = '#26382f'; g.fillRect(0, 0, W, H); g.strokeStyle = '#c9a862'; g.lineWidth = 6; g.strokeRect(10, 10, W - 20, H - 20); g.fillStyle = '#efdcaa'; g.textAlign = 'center'; g.font = '600 64px Georgia'; g.fillText('CEDAR HOUSE', W / 2, 88); g.font = '24px Georgia'; g.fillStyle = '#c9a862'; g.fillText('GUEST HOUSE  ·  EST. 1927', W / 2, 128); });
  kit.box(DOOR.c, 3.83, fz + T / 2 + .06, 2.3, .5, .06, M.teak, .01);
  kit.plane(DOOR.c, 3.83, fz + T / 2 + .095, 2.2, .44, new THREE.MeshStandardMaterial({ map: signTex, roughness: .9 }));

  // ---------------------------------------------------------------- the lounge, seen through the door
  // A simplified slice of the lounge's entrance (architecture map §5): patterned tiles, red oxide,
  // the umbrella stand, warm light. It sits below the facade's sight line, so only the doorway shows it.
  const inside = kit.group(); inside.visible = false; inside.userData.dynamic = true;
  {
    const sub = kit.use(inside);
    const tile = M.cementTile.clone(); tile.map = M.cementTileMap.clone(); tile.map.needsUpdate = true; tile.map.repeat.set(4, 3);
    sub.floor(DOOR.c + .1, -4.1, 2.6, 2.4, tile, .02);
    sub.floor(DOOR.c - .05, -5.6, 3.0, 1.2, M.oxide, .018);
    sub.box(DOOR.c - 1.15, 1.2, -4.3, .1, 2.4, 2.6, M.lime, 0);
    sub.box(DOOR.c + 1.35, .7, -4.3, .1, 1.4, 2.6, M.teakLight, 0);
    sub.cyl(2.23, .34, -4.05, .24, .68, M.indigo, .27);
    for (let i = 0; i < 2; i++) { const h = sub.box(2.2 + i * .12, .95 + i * .1, -4.05, .05, .8, .05, M.brassDark, .01); h.rotation.z = .12 - i * .2; }
    const back = canvasTexture(256, 128, (g, W, H) => { const b = g.createLinearGradient(0, 0, W, 0); b.addColorStop(0, '#5b3322'); b.addColorStop(.6, '#c77c45'); b.addColorStop(1, '#f0b76b'); g.fillStyle = b; g.fillRect(0, 0, W, H); g.fillStyle = '#34402a'; g.fillRect(W * .1, H * .55, W * .6, H * .45); g.fillStyle = '#8e3f33'; g.fillRect(W * .7, H * .5, W * .2, H * .5); });
    sub.plane(DOOR.c + .1, 1.1, -5.25, 3.2, 2.2, new THREE.MeshBasicMaterial({ map: back, toneMapped: false }));
    const warm = new THREE.PointLight('#ffc27a', 9, 5, 2); warm.position.set(DOOR.c + .4, 2.1, -3.9); inside.add(warm);
    kit.use(root);
  }

  // ---------------------------------------------------------------- floor, posts, railing, steps
  verandaFloor(kit, M);
  for (const X of [-4.62, 3.62]) {
    kit.box(X, 1.9, 2.75, .28, 3.8, .28, M.teak, .03);
    kit.box(X, .16, 2.75, .44, .24, .44, M.stoneLight, .03);
    kit.box(X, 3.72, 2.75, .36, .14, .36, M.teak, .02);
    block(X, 2.75, .46, .46, 'veranda post');
  }
  kit.box(3.62, 1.9, -2.3, .28, 3.8, .28, M.teak, .03); kit.box(3.62, .16, -2.3, .44, .24, .44, M.stoneLight, .03);
  // Side beams tie the front posts to the wall; the roof itself is cut away in play.
  for (const X of [-4.62, 3.62]) kit.box(X, 3.86, .2, .22, .22, 5.3, M.teak, .02);
  for (const X of [-6.0, -4.6, -3.2, -1.8, -.4]) { const r = kit.box(X, 4.18, -2.1, .09, .12, 1.1, M.teak, .01); r.rotation.x = -.12; }   // none over the house sign
  // Balustrade: front edge either side of the steps, and the open south end.
  const rail = (x0, z0, x1, z1) => {
    const len = Math.hypot(x1 - x0, z1 - z0), n = Math.max(2, Math.round(len / .28));
    const ang = Math.atan2(x1 - x0, z1 - z0);
    const top = kit.box((x0 + x1) / 2, .98, (z0 + z1) / 2, .1, .09, len, M.teak, .02); top.rotation.y = ang;
    const bot = kit.box((x0 + x1) / 2, .16, (z0 + z1) / 2, .08, .07, len, M.teak, .01); bot.rotation.y = ang;
    for (let i = 1; i < n; i++) { const t = i / n; kit.box(x0 + (x1 - x0) * t, .56, z0 + (z1 - z0) * t, .07, .76, .07, M.teakLight, .015); }
  };
  rail(-12.4, 2.75, -8.55, 2.75); rail(-8.25, 2.75, -4.75, 2.75); rail(-4.5, 2.75, .45, 2.75); rail(2.65, 2.75, 3.5, 2.75); rail(3.62, -2.2, 3.62, 2.62);
  kit.box(-8.4, 1.9, 2.75, .28, 3.8, .28, M.teak, .03); kit.box(-8.4, .16, 2.75, .44, .24, .44, M.stoneLight, .03);
  block(-2.02, 2.75, 4.9, .2, 'front railing'); block(3.07, 2.75, 1.1, .2, 'front railing'); block(3.62, .2, .2, 5.0, 'side railing');
  // Three risers of 0.22 down to the garden, aligned on the front door.
  for (let i = 0; i < 3; i++) { const top = .06 - .22 * (i + 1); kit.box(DOOR.c, (top - .82) / 2, FRONT_Z + .23 + i * .44, 2.2 - i * .06, top + .82, .46, i ? M.stone : M.stoneLight, .03); }
  for (const s of [-1, 1]) kit.box(DOOR.c + s * 1.16, -.3, FRONT_Z + .6, .22, .7, 1.3, M.laterite, .02);

  // ---------------------------------------------------------------- the sitting end and the door end
  bench(kit, M); block(-4.0, FACADE.outer + .45, 2.6, .85, 'bench');
  kit.box(-3.8, .42, -.9, 1.1, .06, .7, M.teak, .02);
  for (const [dx, dz] of [[-.45, -.28], [.45, -.28], [-.45, .28], [.45, .28]]) kit.box(-3.8 + dx, .2, -.9 + dz, .06, .4, .06, M.teak, .01);
  kit.box(-3.95, .47, -.95, .5, .03, .36, M.paper, .003).rotation.y = .12;
  kit.cyl(-3.45, .52, -.78, .06, .14, M.brass, .07);
  block(-3.8, -.9, 1.2, .8, 'veranda table');
  // One cane chair, turned toward the garden: somebody sat out here before the rain got heavy.
  {
    const g = kit.group(-4.3, 0, .35); g.rotation.y = .5;
    kit.box(0, .46, 0, .82, .08, .78, M.caneWeave, .02, g); kit.box(0, .86, -.36, .8, .74, .08, M.caneWeave, .02, g);
    for (const dx of [-.42, .42]) { kit.box(dx, .62, 0, .07, .22, .78, M.caneDark, .02, g); for (const dz of [-.34, .34]) kit.box(dx, .22, dz, .06, .44, .06, M.caneDark, .01, g); }
    block(-4.3, .35, .95, .95, 'cane chair');
  }
  shoeRack(kit, M); block(-.45, FACADE.outer + .32, 1.55, .5, 'shoe rack');
  doormat(kit, M);
  plant(2.65, FACADE.outer + .38, 1.1, root); block(2.65, FACADE.outer + .38, .72, .7, 'fern');
  const lamps = [lantern(kit, M, POSTS[3] - .02), lantern(kit, M, POSTS[4] + .02)];
  // Warm window light spilling onto the wet stone, and the lantern pools.
  const paneMap = canvasTexture(128, 128, (g, W, H) => { g.fillStyle = '#000'; g.fillRect(0, 0, W, H); const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, 'rgba(255,196,120,.9)'); gr.addColorStop(1, 'rgba(255,196,120,0)'); g.fillStyle = gr; for (const x of [8, 68]) g.fillRect(x, 0, 52, H); });
  for (const { c } of WINDOWS.slice(1)) {
    const p = kit.plane(c + .35, .072, FACADE.outer + 1.1, 2.4, 2.0, new THREE.MeshBasicMaterial({ map: paneMap, transparent: true, opacity: .34, depthWrite: false, blending: THREE.AdditiveBlending }));
    p.rotation.x = -Math.PI / 2; p.rotation.z = .2; p.renderOrder = 1;
  }
  for (const X of [POSTS[3], POSTS[4]]) kit.decal(X, FACADE.outer + 1.0, 2.8, 2.6, 'rgba(214,166,100,1)', .24, true, .075);
  kit.decal(-2.4, 1.2, 3.8, 3.4, 'rgba(93,143,184,1)', .14, true, .075);

  // ---------------------------------------------------------------- downpipe, drainage, garden
  kit.cyl(3.46, 1.9, 2.98, .06, 3.9, M.iron, .06);
  kit.box(3.46, -.62, 3.18, .5, .1, .7, M.stoneLight, .02);
  const spout = kit.box(3.46, -.42, 3.12, .05, .5, .05, new THREE.MeshBasicMaterial({ color: '#a9c7dc', transparent: true, opacity: .55 }), 0);
  spout.castShadow = false; spout.userData.dynamic = true; motions.push({ kind: 'spout', o: spout, seed: 0 });
  const gardenMap = canvasTexture(256, 256, (g, W, H) => {
    g.fillStyle = '#1d2e2a'; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 260; i++) { g.fillStyle = i % 3 ? 'rgba(52,78,58,.55)' : 'rgba(22,36,34,.6)'; g.beginPath(); g.ellipse(Math.random() * W, Math.random() * H, 4 + Math.random() * 10, 2 + Math.random() * 4, Math.random() * 3, 0, 7); g.fill(); }
  });
  gardenMap.wrapS = gardenMap.wrapT = THREE.RepeatWrapping; gardenMap.repeat.set(4, 2);
  const ground = kit.plane(-1, -.82, 7.2, 22, 8.6, new THREE.MeshStandardMaterial({ map: gardenMap, roughness: .45, metalness: .05 })); ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true;
  ground.userData.dynamic = true; veranda.ground = ground;   // swapped for the exterior's terrain in the opening
  // The garden path: stepping slabs from the veranda steps toward the gate (the exterior's path
  // carries on from the last of these; both follow the same line down the slope).
  for (let k = 0; k < 7; k++) {
    const hx = -14.6 - k * 1.05, hz = 4.3 + k * .62 + Math.sin(k * .7) * .35;
    const s = kit.box(hz - 2.67, -.77, -9.57 - hx, 1.1, .08, .75, M.wetStone, .03); s.rotation.y = .4 + Math.sin(k) * .15 - Math.PI / 2;
  }
  kit.box(-1, -.62, 3.25, 22, .4, .5, M.laterite, .02);
  // Planting: mounded shrubs and fern clumps in broad shapes; one old tree frames the corner.
  for (const [x, z, s, m] of [[-3.6, 4.1, 1.15, M.leaf], [-5.4, 3.7, .9, M.leafLight], [-2.4, 3.8, .7, M.leaf], [4.5, 3.7, 1.0, M.leaf], [5.4, 1.2, 1.3, M.leafLight], [5.2, -1.5, 1.0, M.leaf]]) {
    const b = kit.sphere(x, -.55 + s * .3, z, s, s * .7, s * .85, m); b.castShadow = true;
  }
  // Fern clumps along the plinth: fans of long leaves, no pots.
  for (const [x, z, s] of [[-1.2, 3.62, .8], [.2, 3.58, .7], [3.0, 3.62, .75], [-4.9, 3.6, .9]]) for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2, leaf = kit.sphere(x + Math.cos(a) * .22 * s, -.62 + .28 * s, z + Math.sin(a) * .16 * s, .1 * s, .42 * s, .05 * s, i % 2 ? M.leaf : M.leafLight);
    leaf.rotation.set(Math.sin(a) * .9, 0, -Math.cos(a) * .9);
  }


  // ---------------------------------------------------------------- rain, drips, mist
  for (const [x, z, ry, w, h, y] of [[-3, 3.3, 0, 20, 5.4, 1.7], [3.92, .3, -Math.PI / 2, 6.2, 5.4, 1.7]]) {
    const r = kit.plane(x, y, z, w, h, openRain); r.rotation.y = ry; r.receiveShadow = false; r.renderOrder = 3;
  }
  const dripM = new THREE.MeshBasicMaterial({ color: '#aec9dd', transparent: true, opacity: .36 });
  for (let i = 0; i < 14; i++) { const d = kit.box(-4.3 + i * .56, 3.6, 3.05, .016, .11, .012, dripM, 0); d.castShadow = false; d.userData.dynamic = true; motions.push({ kind: 'drip', o: d, seed: i * .29 }); }

  // ---------------------------------------------------------------- lights
  root.add(new THREE.HemisphereLight('#9fc0e2', '#233238', .78));
  const moon = new THREE.DirectionalLight('#7aa2d6', 2.1); moon.position.set(-6, 9, 7); moon.target.position.set(0, 0, -1);
  moon.castShadow = true; moon.shadow.mapSize.set(2048, 2048); Object.assign(moon.shadow.camera, { left: -10, right: 10, top: 9, bottom: -9, near: .1, far: 40 }); moon.shadow.bias = -.0006; moon.shadow.normalBias = .03;
  root.add(moon, moon.target);
  const windowSpill = new THREE.PointLight('#f0b870', 6, 5.5, 2); windowSpill.position.set(-2.6, 2.4, -1.6); root.add(windowSpill);

  kit.merge(root);
  Object.assign(veranda, { door, doorWarm: inside, lanterns: lamps, fanWarm });
  rooms.veranda = veranda;
  return veranda;
}
