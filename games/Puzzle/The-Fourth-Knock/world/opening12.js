import * as THREE from 'three';
import { GLTFLoader } from '../vendor/GLTFLoader.js';

// Step 12 opening (brief §15-18), staged in the game's own world instead of painted plates:
//   1 the unsigned message on a rain-lit desk
//   2 a night train through the ghats, Aren at the open door (his own in-game figure)
//   3 a mofussil bus on a hairpin, its headlights crossing the Cedar House sign; one far flash
//   4 Cedar House from the garden gate (the Blender-built exterior around the real veranda set),
//     Aren walking up the path
//   5 one continuous move into the playable veranda: the roof lifts, the lens flattens into the
//     game's orthographic view, and the player gets control on the same wet stone.
// Every set is built in the iso-facing frame, so Aren's cutout always faces the lens.
const ISO = Math.atan2(.54499, .83844);          // yaw that turns +x into screen-right
const DIR = new THREE.Vector3(-13, -15.5, -20).normalize();
const SETS = { desk: new THREE.Vector3(0, 0, 420), train: new THREE.Vector3(420, 0, 0), road: new THREE.Vector3(-420, 0, 0) };
const PALETTE = { tile: '#9a4a32', tileDark: '#743426', ridge: '#5e2a20', leafDark: '#34503c', trunk: '#5a4632', grass: '#2a4133', grassLight: '#3a5541', soil: '#3b2f28' };
const GLOW = { warm: '#ffcf86', amber: '#f0a85a', dim: '#7e93a8', dark: '#1d2733' };

export function createOpening12({ scene, rooms, M, kit, canvasTexture, rainMat, rainUniforms, actors, state, world, ortho }) {
  const camera = new THREE.PerspectiveCamera(36, innerWidth / innerHeight, .1, 600);
  const root = new THREE.Group(); root.name = 'Opening sets'; root.visible = false; scene.add(root);
  const tmp = new THREE.Vector3(), tmp2 = new THREE.Vector3();
  let prepared = null, exterior = null, lid = [], land = [], garden = [], shotIndex = -1, shotT = 0, flash = 0, flashAt = -1;
  const updaters = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const E = (c, extra = {}) => new THREE.MeshBasicMaterial({ color: c, toneMapped: false, ...extra });

  // ------------------------------------------------------------------ sky, fog, rain, mist
  const sky = new THREE.Mesh(new THREE.SphereGeometry(380, 24, 16), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { flash: { value: 0 }, time: rainUniforms.time },
    vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }',
    fragmentShader: `varying vec3 vP; uniform float flash; uniform float time;
      float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
      void main(){ float y = vP.y; vec3 low = vec3(.075, .105, .14), high = vec3(.03, .045, .07);
        vec3 c = mix(low, high, smoothstep(-.05, .6, y));
        float cl = n(vP.xz / (y + .35) * 2.2 + vec2(time * .02, 0.)) * n(vP.xz / (y + .35) * 5. - time * .03);
        c += vec3(.05, .07, .09) * smoothstep(.2, .8, cl) * smoothstep(.0, .3, y);
        c += vec3(.55, .62, .75) * flash * (.35 + .65 * smoothstep(-.1, .5, y)) * (.6 + .4 * cl);
        gl_FragColor = vec4(c, 1.); }`
  }));
  sky.renderOrder = -10; root.add(sky);
  const fog = new THREE.Fog('#101923', 40, 160);

  const RAIN = 2600;
  const rainGeo = new THREE.BufferGeometry();
  const pos = new Float32Array(RAIN * 6), end = new Float32Array(RAIN * 2), seed = new Float32Array(RAIN * 2);
  for (let i = 0; i < RAIN; i++) {
    const x = Math.random() * 70 - 35, y = Math.random() * 40, z = Math.random() * 70 - 35, s = Math.random();
    pos.set([x, y, z, x, y, z], i * 6); end.set([0, 1], i * 2); seed.set([s, s], i * 2);
  }
  rainGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  rainGeo.setAttribute('end', new THREE.BufferAttribute(end, 1));
  rainGeo.setAttribute('seed', new THREE.BufferAttribute(seed, 1));
  const rainMatV = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
    uniforms: { time: { value: 0 }, center: { value: new THREE.Vector3() }, wind: { value: new THREE.Vector3(-.12, 0, .06) }, opacity: { value: 1 }, flash: { value: 0 } },
    vertexShader: `attribute float end; attribute float seed; uniform float time; uniform vec3 center; uniform vec3 wind; varying float vA;
      void main(){ vec3 p = position; float fall = 24. + seed * 10.;
        p.y = mod(p.y - time * fall, 40.) - 14.; p += center; p.xz += wind.xz * (p.y - center.y);
        p.y += end * (.55 + seed * .5); p.xz += end * wind.xz * -2.5;
        vA = mix(.9, 0., end) * (.35 + seed * .65);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.); }`,
    fragmentShader: 'varying float vA; uniform float opacity; uniform float flash; void main(){ gl_FragColor = vec4(vec3(.62, .76, .9) * (1. + flash * 2.), vA * .5 * opacity); }'
  });
  const rain = new THREE.LineSegments(rainGeo, rainMatV); rain.frustumCulled = false; root.add(rain);

  const mistMap = canvasTexture(256, 128, (c, W, H) => { for (let i = 0; i < 60; i++) { const x = Math.random() * W, y = H * (.3 + Math.random() * .5), r = 20 + Math.random() * 50; const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, 'rgba(170,190,205,.12)'); g.addColorStop(1, 'rgba(170,190,205,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); } });
  const mistMat = new THREE.MeshBasicMaterial({ map: mistMap, transparent: true, depthWrite: false, fog: false, opacity: .42 });
  function mist(parent, x, y, z, w, h, ry, drift) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mistMat); m.position.set(x, y, z); m.rotation.y = ry; m.renderOrder = 4; parent.add(m);
    updaters.push(t => { m.position.x = x + Math.sin(t * .05 + x) * drift; }); return m;
  }

  // Lightning: sky, rain and a cold key light pulse together.
  const flashLight = new THREE.DirectionalLight('#b8cdf0', 0); flashLight.position.set(-30, 40, -20); root.add(flashLight);
  function strike(at) { flashAt = at; }
  function flashCurve(t) { return t < 0 ? 0 : t < .06 ? t / .06 : t < .14 ? 1 - (t - .06) * 7 : t < .22 ? .45 + (t - .14) * 5 : Math.max(0, .85 - (t - .22) * 1.9); }

  // ------------------------------------------------------------------ helpers
  function group(origin, yaw = ISO) { const g = new THREE.Group(); g.position.copy(origin); g.rotation.y = yaw; root.add(g); return g; }
  const text = (w, h, draw) => new THREE.MeshStandardMaterial({ map: canvasTexture(w, h, draw), roughness: .95 });
  function toWorld(g, x, y, z) { return g.localToWorld(V(x, y, z)); }

  // ------------------------------------------------------------------ 1. the message
  function buildDesk() {
    const g = group(SETS.desk, 0); kit.use(g);
    kit.box(0, .84, 0, 5.4, .14, 3.2, M.teak, .03);
    kit.box(0, .92, 0, 5.3, .02, 3.1, M.teakLight, 0);
    kit.box(0, 2.3, -1.72, 5.4, 3.0, .2, M.limeShade, 0);
    const glass = kit.plane(.4, 2.45, -1.6, 2.9, 1.9, rainMat); glass.castShadow = false;
    for (const x of [-1.07, .4, 1.87]) kit.box(x, 2.45, -1.55, .1, 2.05, .1, M.teak, .01);
    for (const y of [1.45, 2.45, 3.45]) kit.box(.4, y, -1.55, 3.05, .1, .1, M.teak, .01);
    kit.box(.4, 1.4, -1.45, 3.2, .06, .3, M.teakLight, .01);
    // The letter: folded twice, no signature; the envelope under it, torn along the top.
    const note = kit.plane(.2, .935, .2, 1.34, .94, text(768, 540, (c, W, H) => {
      c.fillStyle = '#efe1bf'; c.fillRect(0, 0, W, H);
      c.strokeStyle = 'rgba(120,100,70,.35)'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, H / 3); c.lineTo(W, H / 3); c.moveTo(0, H * 2 / 3); c.lineTo(W, H * 2 / 3); c.stroke();
      c.fillStyle = '#2a3140'; c.font = 'italic 44px Georgia';
      c.fillText('Cedar House.', 60, 110); c.font = 'italic 38px Georgia';
      c.fillText('Before the rains close the road.', 60, 212); c.fillText('There is something you should see.', 60, 300);
      c.fillStyle = 'rgba(42,49,64,.14)'; c.fillRect(470, 380, 200, 3);
    }));
    note.rotation.set(-Math.PI / 2, 0, .12);
    const env = kit.plane(-.55, .93, .62, 1.1, .6, text(512, 280, (c, W, H) => {
      c.fillStyle = '#e4d3ad'; c.fillRect(0, 0, W, H); c.fillStyle = '#34495a'; c.font = 'italic 34px Georgia'; c.fillText('A. Vale', 170, 150);
      c.strokeStyle = 'rgba(80,60,100,.45)'; c.lineWidth = 5; c.beginPath(); c.arc(420, 70, 42, 0, 7); c.stroke();
      c.fillStyle = 'rgba(160,60,50,.55)'; c.fillRect(398, 22, 70, 86);
    }));
    env.rotation.set(-Math.PI / 2, 0, -.2);
    // Lamp, chai, notebook, ticket, coins: a traveller's evening, not a detective's.
    kit.cyl(-1.9, .96, -.6, .28, .06, M.brass); kit.cyl(-1.9, 1.35, -.6, .04, .8, M.brass);
    const shade = kit.cyl(-1.75, 1.78, -.45, .42, .34, new THREE.MeshStandardMaterial({ color: '#3f5a45', emissive: '#243b2a', emissiveIntensity: .3 }), .2); shade.rotation.z = .5;
    const bulb = new THREE.PointLight('#ffc983', 22, 7, 2); bulb.position.set(-1.55, 1.55, -.3); g.add(bulb);
    kit.cyl(1.35, 1.03, -.35, .13, .22, new THREE.MeshStandardMaterial({ color: '#c9a36e', transparent: true, opacity: .75, roughness: .2 }), .11);
    kit.cyl(1.35, 1.09, -.35, .11, .02, new THREE.MeshStandardMaterial({ color: '#8a5a36' }), .11);
    kit.box(1.55, .95, .75, .9, .04, 1.1, M.rust, .02); kit.box(1.55, .975, .75, .8, .02, 1.0, M.paper, .005);
    const pencil = kit.box(1.55, 1.0, .72, .05, .04, .9, M.mustard, .01); pencil.rotation.y = .5;
    const ticket = kit.plane(-1.1, .935, -.5, .5, .24, text(256, 120, (c, W, H) => { c.fillStyle = '#d7c79a'; c.fillRect(0, 0, W, H); c.fillStyle = '#34495a'; c.font = 'bold 22px Courier New'; c.fillText('II CL · GHAT SECTION', 12, 44); c.font = '18px Courier New'; c.fillText('ONE PASSENGER', 12, 80); }));
    ticket.rotation.set(-Math.PI / 2, 0, .35);
    for (const [x, z] of [[-.9, .95], [-.75, 1.05]]) kit.cyl(x, .94, z, .07, .015, M.brass, .07, g, 16);
    const cool = new THREE.DirectionalLight('#7ea3d6', 1.1); cool.position.set(.5, 4, -4); g.add(cool, cool.target); cool.target.position.set(0, 0, 1);
    g.add(new THREE.HemisphereLight('#6f86a3', '#1b140f', .35));
    // The paper breathes in the draught from the window.
    updaters.push(t => { note.rotation.x = -Math.PI / 2 + Math.sin(t * 2.3) * .012 * (shotIndex === 0 ? 1 : 0); });
    return { g, camFrom: V(-.5, 3.7, 3.8), camTo: V(-.15, 2.85, 2.75), lookFrom: V(.25, 1.3, -.35), lookTo: V(.2, 1.15, -.1), fov: 36 };
  }

  // ------------------------------------------------------------------ 2. the night train
  function buildTrain() {
    const g = group(SETS.train); kit.use(g);
    const maroon = new THREE.MeshStandardMaterial({ color: '#6c2723', roughness: .7 }), roofM = new THREE.MeshStandardMaterial({ color: '#4c4f52', roughness: .8 });
    const coach = new THREE.Group(); g.add(coach); kit.use(coach);
    // Body: the back half solid, the side toward the lens built around a real open door.
    kit.box(0, 2.6, -.75, 22, 2.7, 1.5, maroon, .04);
    kit.box(-4.625, 2.6, .75, 12.75, 2.7, 1.5, maroon, .04);
    kit.box(7.025, 2.6, .75, 7.95, 2.7, 1.5, maroon, .04);
    kit.box(2.4, 3.78, .75, 1.3, .34, 1.5, maroon, .02);
    kit.box(2.4, 1.3, .75, 1.3, .1, 1.5, M.iron, .01);
    kit.box(2.4, 2.45, .02, 1.3, 2.3, .02, E('#e0a861'), 0);
    const roofCyl = kit.cyl(0, 0, 0, 1.62, 22, roofM, 1.62, coach, 20); roofCyl.rotation.z = Math.PI / 2; roofCyl.position.set(0, 3.7, 0); roofCyl.scale.set(1, 1, .42);
    kit.box(0, 1.15, 0, 21.4, .3, 2.6, M.black, .02);
    for (const x of [-7.5, 7.5]) { kit.box(x, .75, 0, 3.2, .5, 2.2, M.iron, .04); for (const dx of [-.9, .9]) for (const s of [-1, 1]) { const w = kit.cyl(x + dx, .55, s * 1.05, .42, .12, M.iron, .42, coach, 16); w.rotation.x = Math.PI / 2; } }
    kit.box(0, 3.35, 1.51, 22, .08, .02, new THREE.MeshStandardMaterial({ color: '#c9a24e' }), 0);
    // Barred windows lit from inside; the open door, where Aren stands.
    const warm = E('#e9b56d'), bars = M.iron;
    for (let i = -4; i <= 4; i++) {
      const x = i * 2.1 - .6; if (Math.abs(x - 2.4) < 1.2) continue;
      kit.box(x, 2.75, 1.5, 1.3, 1.0, .02, warm, 0);
      for (let b = 0; b < 2; b++) kit.box(x, 2.55 + b * .4, 1.53, 1.3, .035, .04, bars, 0);
      kit.box(x, 3.3, 1.52, 1.45, .1, .05, M.black, 0);
    }
    for (const s of [-1, 1]) kit.box(2.4 + s * .68, 2.45, 1.52, .08, 2.35, .08, M.iron, 0);
    kit.box(2.4, 1.2, 1.6, 1.2, .08, .3, M.iron, 0);
    const lamp = new THREE.PointLight('#ffc67a', 16, 5, 2); lamp.position.set(2.4, 3.2, .6); coach.add(lamp);
    // Parallax: rails, telegraph poles, trees and three hill layers, scrolling at their depth.
    kit.use(g);
    const ground = kit.plane(0, .1, -2, 160, 30, new THREE.MeshStandardMaterial({ color: '#1f2c26' })); ground.rotation.x = -Math.PI / 2;
    kit.box(0, .08, 0, 160, .16, 4.4, M.stone, 0);
    kit.box(0, .25, .4, 160, .1, .1, M.iron, 0); kit.box(0, .25, -.4, 160, .1, .1, M.iron, 0);
    for (let i = -8; i <= 8; i++) kit.decal(i * 2.1 - .6, 2.6, 1.8, 1.6, 'rgba(240,180,110,1)', .28, true, .18);
    const layers = [];
    const hill = (z, y, h, color, speed, rough) => {
      const tex = canvasTexture(1024, 256, (c, W, H) => { c.fillStyle = color; c.beginPath(); c.moveTo(0, H); for (let x = 0; x <= W; x += 16) c.lineTo(x, H * (.25 + .35 * (Math.sin(x * .011 * rough) * .5 + .5) + .12 * Math.sin(x * .05))); c.lineTo(W, H); c.fill(); });
      tex.wrapS = THREE.RepeatWrapping; tex.repeat.set(2, 1);
      const p = kit.plane(0, y, z, 260, h, new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false })); layers.push({ tex, speed });
    };
    hill(-120, 14, 40, '#18242b', .004, .7); hill(-70, 9, 26, '#1c2d2d', .008, 1.1); hill(-38, 5, 16, '#20352c', .016, 1.7);
    const passers = [];
    for (let i = 0; i < 9; i++) { const pole = new THREE.Group(); g.add(pole); kit.use(pole); kit.cyl(0, 3.25, 0, .1, 6.5, M.teak, .08); kit.box(0, 6.0, 0, 1.2, .1, .1, M.teak, 0); pole.position.set(-60 + i * 14, 0, 6.5); passers.push({ o: pole, speed: 34, span: 126 }); }
    for (let i = 0; i < 22; i++) { const tr = new THREE.Group(); g.add(tr); kit.use(tr); kit.cyl(0, 1.5, 0, .25, 3, M.trunk || M.teak, .18); kit.sphere(0, 3.6, 0, 1.8, 1.4, 1.8, i % 2 ? M.leaf : M.leafDark || M.leaf); tr.position.set(-70 + i * 6.5 + Math.random() * 3, 0, -9 - Math.random() * 8); passers.push({ o: tr, speed: 18, span: 143 }); }
    // One signal lamp and its hut go by: a green point of light across Aren's face.
    const sig = new THREE.Group(); g.add(sig); kit.use(sig);
    kit.cyl(0, 2.1, 0, .09, 4.2, M.iron, .09); const bulbS = kit.sphere(0, 4.3, 0, .16, .16, .16, E('#8dffb0')); kit.box(1.6, 1.1, -.6, 2.4, 2.2, 1.8, M.lime, .02); kit.box(1.6, 1.3, .31, .5, .6, .02, E('#f0b060'), 0);
    const sigLight = new THREE.PointLight('#8dffb0', 20, 8, 2); sigLight.position.set(0, 4, .6); sig.add(sigLight);
    sig.position.set(40, 0, 4.5); passers.push({ o: sig, speed: 34, span: 400, once: true });
    kit.use(g);
    g.add(new THREE.HemisphereLight('#6d86a6', '#141a18', .55));
    const moon = new THREE.DirectionalLight('#7fa3d8', 1.2); moon.position.set(-10, 20, 10); g.add(moon);
    updaters.push((t, dt) => {
      if (shotIndex !== 1) return;
      for (const l of layers) l.tex.offset.x += l.speed * dt * 6;
      for (const p of passers) { p.o.position.x += p.speed * dt; if (!p.once && p.o.position.x > 70) p.o.position.x -= p.span; }
      coach.position.y = Math.sin(t * 9) * .012 + Math.sin(t * 3.1) * .02; coach.rotation.z = Math.sin(t * 2.3) * .004;
    });
    return { g, coach, sig, arenAt: toWorld(g, 2.4, 1.33, .72), camFrom: V(-3.2, 3.2, 24), camTo: V(-.8, 2.9, 20.5), lookFrom: V(1.4, 3.5, 0), lookTo: V(2.2, 3.1, 0), fov: 34 };
  }

  // ------------------------------------------------------------------ 3. the ghat road
  function buildRoad() {
    const g = group(SETS.road); kit.use(g);
    // A hairpin cut into the hill: road ribbon, whitewashed parapet stones, the hill above.
    const curve = new THREE.CatmullRomCurve3([V(-26, 0, 8), V(-12, .6, 6), V(-2, 1.2, 2.5), V(4, 1.6, -3), V(1, 2.2, -9), V(-8, 2.9, -12), V(-20, 3.6, -13)]);
    const N = 120, road = [], left = [], right = [];
    for (let i = 0; i <= N; i++) { const p = curve.getPointAt(i / N), tg = curve.getTangentAt(i / N), side = V(-tg.z, 0, tg.x).normalize(); road.push(p); left.push(p.clone().addScaledVector(side, 2.2)); right.push(p.clone().addScaledVector(side, -2.2)); }
    const geo = new THREE.BufferGeometry(), vs = [];
    for (let i = 0; i < N; i++) { const a = left[i], b = right[i], c = right[i + 1], d = left[i + 1]; vs.push(...a.toArray(), ...b.toArray(), ...c.toArray(), ...a.toArray(), ...c.toArray(), ...d.toArray()); }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vs, 3)); geo.computeVertexNormals();
    const asphalt = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: '#343c40', roughness: .22, metalness: .15, side: THREE.DoubleSide })); asphalt.receiveShadow = true; g.add(asphalt);
    for (let i = 0; i < N; i++) { const a = left[i].clone().lerp(road[i], .08), b = left[i + 1 < N ? i + 1 : i].clone().lerp(road[i + 1 < N ? i + 1 : i], .08); const d = b.clone().sub(a); const l = kit.box((a.x + b.x) / 2, (a.y + b.y) / 2 + .03, (a.z + b.z) / 2, .09, .02, d.length() + .02, M.paper, 0); l.rotation.y = Math.atan2(d.x, d.z); }
    for (let i = 0; i < N; i += 2) { const p = right[i], s = kit.box(p.x, p.y + .25, p.z, .5, .5, .5, (i / 2) % 2 ? M.paper : M.black, .04); s.rotation.y = Math.atan2(curve.getTangentAt(i / N).x, curve.getTangentAt(i / N).z); }
    const hillGeo = new THREE.PlaneGeometry(90, 90, 40, 40); hillGeo.rotateX(-Math.PI / 2);
    const hp = hillGeo.attributes.position;
    for (let i = 0; i < hp.count; i++) { const x = hp.getX(i), z = hp.getZ(i); hp.setY(i, (z < -4 ? (-4 - z) * .8 : -(z + 4) * .45) + x * .06 + Math.sin(x * .3) * .6 + Math.cos(z * .25) * .5); }
    hillGeo.computeVertexNormals();
    const hillM = new THREE.Mesh(hillGeo, new THREE.MeshStandardMaterial({ color: '#2f4a3b', roughness: .9, flatShading: true })); hillM.position.y = -.8; hillM.receiveShadow = true; g.add(hillM);
    for (let i = 0; i < 40; i++) { const x = Math.random() * 70 - 35, z = -14 - Math.random() * 25; kit.cyl(x, (-4 - z) * .8 - .2, z, .3, 3, M.trunk || M.teak, .2); kit.sphere(x, (-4 - z) * .8 + 2.6, z, 2 + Math.random(), 1.6, 2 + Math.random(), Math.random() > .5 ? M.leaf : (M.leafDark || M.leaf)); }
    // Far hills and a waterfall the lightning will find.
    for (const [z, y, c] of [[-80, 16, '#1b2830'], [-60, 10, '#203335'], [-34, 9, '#253b35']]) {
      const tex = canvasTexture(1024, 256, (cx, W, H) => { cx.fillStyle = c; cx.beginPath(); cx.moveTo(0, H); for (let x = 0; x <= W; x += 16) cx.lineTo(x, H * (.3 + .3 * Math.sin(x * .008 + z) + .1 * Math.sin(x * .05))); cx.lineTo(W, H); cx.fill(); if (z === -60) { cx.fillStyle = 'rgba(200,220,230,.55)'; cx.fillRect(W * .62, H * .38, 10, H * .6); } });
      kit.plane(0, y, z, 220, 50, new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
    }
    // The sign at the turn-off: painted board on two posts, the house's own green and brass.
    const sp = curve.getPointAt(.52), st = curve.getTangentAt(.52), sside = V(-st.z, 0, st.x).normalize();
    const signPos = sp.clone().addScaledVector(sside, 3.4);
    const sign = new THREE.Group(); sign.position.copy(signPos); sign.rotation.y = .3; g.add(sign); kit.use(sign);
    for (const s of [-1, 1]) kit.box(s * .9, 1.0, 0, .12, 2.0, .12, M.teak, .01);
    kit.box(0, 1.75, 0, 2.2, .75, .08, M.teak, .02);
    kit.plane(0, 1.75, .05, 2.08, .64, text(640, 200, (c, W, H) => { c.fillStyle = '#26382f'; c.fillRect(0, 0, W, H); c.strokeStyle = '#c9a862'; c.lineWidth = 6; c.strokeRect(10, 10, W - 20, H - 20); c.fillStyle = '#efdcaa'; c.textAlign = 'center'; c.font = '600 60px Georgia'; c.fillText('CEDAR HOUSE', W / 2 - 20, 102); c.font = '26px Georgia'; c.fillStyle = '#c9a862'; c.fillText('GUEST HOUSE  ·  1 KM', W / 2 - 20, 156); c.font = '70px Georgia'; c.fillStyle = '#efdcaa'; c.fillText('↑', W - 60, 120); }));
    // The bus: red and cream, dim yellow windows, two headlights that do the lighting.
    const bus = new THREE.Group(); g.add(bus); kit.use(bus);
    kit.box(0, 1.1, 0, 2.3, 1.2, 7.2, new THREE.MeshStandardMaterial({ color: '#9b3228', roughness: .6 }), .12);
    kit.box(0, 2.2, 0, 2.3, 1.0, 7.2, new THREE.MeshStandardMaterial({ color: '#d9c7a0', roughness: .6 }), .12);
    kit.box(0, 2.78, 0, 2.2, .18, 7.0, M.stoneLight, .06);
    for (let i = 0; i < 6; i++) for (const s of [-1, 1]) kit.box(s * 1.16, 2.2, -2.8 + i * 1.05, .02, .6, .8, E('#d9b46a'), 0);
    kit.box(0, 2.15, 3.61, 2.0, .8, .02, E('#8aa0b2', { transparent: true, opacity: .6 }), 0);
    for (const s of [-1, 1]) { kit.sphere(s * .75, 1.05, 3.62, .16, .16, .06, E('#fff1c8')); kit.sphere(s * .95, 1.1, -3.62, .12, .1, .04, E('#ff4d3a')); const w = kit.cyl(s * 1.05, .45, 2.3, .45, .3, M.black, .45, bus, 14); w.rotation.z = Math.PI / 2; const w2 = kit.cyl(s * 1.05, .45, -2.3, .45, .3, M.black, .45, bus, 14); w2.rotation.z = Math.PI / 2; }
    const heads = [-1, 1].map(s => { const l = new THREE.SpotLight('#fff0cc', 90, 30, .42, .5, 1.2); l.position.set(s * .75, 1.05, 3.7); l.target.position.set(s * .5, .2, 14); bus.add(l, l.target); return l; });
    const beamTex = canvasTexture(64, 128, (c, W, H) => { const gr = c.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, 'rgba(255,236,190,.0)'); gr.addColorStop(1, 'rgba(255,236,190,.2)'); c.fillStyle = gr; c.fillRect(0, 0, W, H); });
    for (const s of [-1, 1]) { const cone = new THREE.Mesh(new THREE.ConeGeometry(1.1, 8, 16, 1, true), new THREE.MeshBasicMaterial({ map: beamTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false })); cone.rotation.x = -Math.PI / 2; cone.position.set(s * .75, .95, 7.6); cone.renderOrder = 5; bus.add(cone); }
    kit.use(g);
    g.add(new THREE.HemisphereLight('#5f7894', '#111614', .45));
    const moon = new THREE.DirectionalLight('#86a9dc', 1.7); moon.position.set(-14, 25, 16); g.add(moon);
    mist(g, -4, 1.0, -6, 40, 5, 0, 3);
    let busU = .08;
    updaters.push((t, dt) => {
      if (shotIndex !== 2) return;
      busU = Math.min(.9, busU + dt * .085);
      const p = curve.getPointAt(busU), tg = curve.getTangentAt(busU);
      bus.position.copy(p).addScaledVector(V(-tg.z, 0, tg.x).normalize(), .9); bus.position.y += .02;
      bus.rotation.y = Math.atan2(tg.x, tg.z);
    });
    return { g, bus, sign, curve, reset: () => { busU = .08; }, camFrom: V(7, 15, 21), camTo: V(4.5, 13, 17.5), lookFrom: V(-5, 1, 1), lookTo: V(.5, 1.6, -3.5), fov: 40 };
  }

  // ------------------------------------------------------------------ 4. the house (Blender exterior)
  async function buildHouse() {
    const gltf = await new GLTFLoader().loadAsync('./assets/world12/cedar-exterior.glb');
    exterior = gltf.scene; exterior.name = 'Cedar House exterior (Blender)';
    const cache = new Map();
    const mapMat = m => {
      const name = m.name || '';
      if (cache.has(name)) return cache.get(name);
      let out;
      if (name.startsWith('E_')) out = E(GLOW[name.slice(2)] || '#ffcf86');
      else {
        const key = name.slice(2);
        out = M[key] || (M[key] = new THREE.MeshStandardMaterial({ color: PALETTE[key] || m.color, roughness: .9, flatShading: key.startsWith('leaf') || key === 'grass' || key === 'grassLight' }));
      }
      cache.set(name, out); return out;
    };
    exterior.traverse(o => { if (o.isMesh) { o.material = mapMat(o.material); o.castShadow = !o.material.isMeshBasicMaterial; o.receiveShadow = true; } });
    // The exterior is authored in the house frame; place it around the veranda room (map §2).
    exterior.rotation.y = Math.PI / 2; exterior.position.set(-2.67, 0, -9.57);
    for (const c of exterior.children) {
      if (c.name.startsWith('LID')) lid.push(c); else if (c.name.startsWith('LAND')) land.push(c); else garden.push(c);
      c.userData.baseY = c.position.y;
    }
    root.add(exterior);
    // Lights for the garden shots: a moon with a long shadow, the house's own glow on the path.
    const moon = new THREE.DirectionalLight('#86a7da', .72); moon.position.set(-18, 30, 26); moon.target.position.set(-2, 0, 2);
    moon.castShadow = true; moon.shadow.mapSize.set(2048, 2048); Object.assign(moon.shadow.camera, { left: -32, right: 32, top: 32, bottom: -32, near: 1, far: 120 }); moon.shadow.bias = -.0008;
    const hemi = new THREE.HemisphereLight('#7690b3', '#151d1a', .34);
    const houseLights = new THREE.Group(); houseLights.add(moon, moon.target, hemi);
    for (const [x, z, c, i] of [[6, 7, '#ffc27a', 26], [-4, -3.2, '#ffcf86', 16], [10.5, 17.5, '#ffcf86', 10]]) { const l = new THREE.PointLight(c, i, 18, 2); l.position.set(x, 2.5, z); houseLights.add(l); }
    root.add(houseLights);
    mist(root, 0, 1.5, 12, 60, 8, 0, 4); mist(root, -10, 2.5, -14, 70, 10, 0, 6); mist(root, 20, 1.2, 4, 40, 6, -1.2, 3);
    // Aren's walk from the gate to the veranda steps, on the Blender path slabs (house frame).
    const path = [];
    for (let k = 7; k >= 0; k--) { const hx = -14.6 - k * 1.05, hz = 4.3 + k * .62 + Math.sin(k * .7) * .35; const P = verandaFromHouse(hx, hz); path.push(P); }
    return { path };
  }
  function verandaFromHouse(x, z) { return { x: z - 2.67, z: -9.57 - x }; }
  const ray = new THREE.Raycaster();
  function groundY(x, z) {
    ray.set(V(x, 30, z), V(0, -1, 0));
    const hit = ray.intersectObjects([...garden, ...land], true)[0];
    return hit ? hit.point.y : -.82;
  }

  // ------------------------------------------------------------------ public
  const sets = {};
  async function prepare() {
    if (!prepared) prepared = (async () => {
      sets.desk = buildDesk(); sets.train = buildTrain(); sets.road = buildRoad();
      sets.house = await buildHouse();
    })();
    return prepared;
  }

  let from = null, to = null, look0 = null, look1 = null, fov0 = 36, fov1 = 36, dur = 6, handoff = null;
  const ease = t => t * t * (3 - 2 * t);
  function frame(set, seconds) { from = set.camFrom.clone(); to = set.camTo.clone(); look0 = set.lookFrom.clone(); look1 = set.lookTo.clone(); fov0 = fov1 = set.fov; dur = seconds; if (set.g) { set.g.localToWorld(from); set.g.localToWorld(to); set.g.localToWorld(look0); set.g.localToWorld(look1); } }

  function begin() {
    root.visible = true; state.liveOpening = true;
    scene.fog = fog;
    for (const r of Object.values(rooms)) r.root.visible = false;
    camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  }
  function play(i, seconds) {
    shotIndex = i; shotT = 0; handoff = null; flashAt = -1;
    const aren = actors.aren;
    rooms.veranda.root.visible = i >= 3;
    for (const s of ['desk', 'train', 'road']) if (sets[s]) sets[s].g.visible = (s === 'desk' && i === 0) || (s === 'train' && i === 1) || (s === 'road' && i === 2);
    if (exterior) exterior.visible = i >= 3;
    rainMatV.uniforms.opacity.value = i === 0 ? 0 : 1;
    scene.fog = i === 0 ? null : fog;
    [fog.near, fog.far] = i === 1 ? [30, 140] : i === 2 ? [26, 120] : [55, 230];
    if (i === 0) { frame(sets.desk, seconds); world.place('aren', 0, 0, 'offstage'); strike(seconds - 1.2); }
    if (i === 1) {
      frame(sets.train, seconds);
      const a = sets.train.arenAt; world.place('aren', a.x, a.z, state.room, a.y);
      state.expressions.aren = 'thinking'; world.look('aren', 'clear');
      aren.facing = state.facing = 'front-right';
      sets.train.sig.position.x = 40;
    }
    if (i === 2) { frame(sets.road, seconds); world.place('aren', 0, 0, 'offstage'); sets.road.reset(); strike(seconds * .55); }
    if (i === 3) {
      const p = sets.house.path;
      // Gate-side lens: low, wide, the lit house up the slope beyond the cedar.
      from = V(10.2, 1.9, 18.6); to = V(8.9, 2.0, 16.2); look0 = V(-.6, 3.4, -1.8); look1 = V(-.4, 3.0, -1.2); fov0 = 44; fov1 = 40; dur = seconds;
      root.updateMatrixWorld(true);
      const start = p[0]; world.place('aren', start.x, start.z, state.room, groundY(start.x, start.z));
      state.expressions.aren = 'neutral';
      const pts = p.slice(1).map(q => ({ x: q.x, z: q.z, y: groundY(q.x, q.z) }));
      const toDoor = () => world.look('aren', { x: 1.55, z: -2.5 }, { back: true });
      world.walk('aren', pts, { speed: 2.0 }).then(toDoor);
      toDoor();
    }
  }
  // Shot 5: the continuous move from the garden lens into the game's own orthographic view.
  function handoffTo(seconds) {
    shotIndex = 4; shotT = 0;
    const vis = (ortho.top - ortho.bottom) / ortho.zoom;
    const target = ortho.position.clone().addScaledVector(DIR, (ortho.position.y - 1) / -DIR.y);
    handoff = { target, vis, seconds, startPos: camera.position.clone(), startLook: look1.clone(), startFov: camera.fov };
    const start = handoff.startPos.clone().sub(handoff.startLook);
    handoff.startDist = start.length(); handoff.startDir = start.normalize();
    handoff.startVis = 2 * handoff.startDist * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    // Aren takes the veranda steps and stops on the stone, facing the door.
    world.walk('aren', [{ x: 1.55, z: 4.5, y: -.6 }, { x: 1.55, z: 3.0, y: .06 }, { x: 1.5, z: 2.1, y: 0 }], { speed: 1.9 });
    return new Promise(resolve => { handoff.resolve = resolve; });
  }
  function finish() {
    root.visible = false; state.liveOpening = false; scene.fog = null;
    rooms.veranda.root.visible = true;
    for (const c of lid) c.position.y = c.userData.baseY;
    handoff = null; shotIndex = -1;
  }

  function update(dt, envTime) {
    if (!state.liveOpening) return;
    shotT += dt;
    for (const u of updaters) u(shotT, dt);
    // Lightning.
    const f = flashAt >= 0 ? flashCurve(shotT - flashAt) : 0;
    sky.material.uniforms.flash.value = f; flashLight.intensity = f * 2.4; rainMatV.uniforms.flash.value = f; rainUniforms.flash.value = Math.max(rainUniforms.flash.value, f * .8);
    rainMatV.uniforms.time.value = envTime;
    if (handoff) {
      const p = Math.min(1, shotT / handoff.seconds), k = ease(p);
      const target = handoff.startLook.clone().lerp(handoff.target, k);
      const dir = handoff.startDir.clone().lerp(DIR.clone().negate(), ease(Math.min(1, p * 1.25))).normalize();
      const vis = THREE.MathUtils.lerp(handoff.startVis, handoff.vis, k);
      const fov = THREE.MathUtils.lerp(handoff.startFov, 3.2, Math.pow(k, .7));
      const dist = vis / (2 * Math.tan(THREE.MathUtils.degToRad(fov / 2)));
      camera.fov = fov; camera.position.copy(target).addScaledVector(dir, dist); camera.lookAt(target);
      camera.near = Math.max(.1, dist - 60); camera.far = dist + 260; camera.updateProjectionMatrix();
      // The roof and upper storeys lift away like a lid; the land beyond goes into the dark.
      const lift = Math.pow(Math.max(0, (p - .15) / .7), 2);
      lid.forEach((c, i) => { c.position.y = c.userData.baseY + lift * (40 + i * 6); c.visible = lift < .99; });
      fog.near = THREE.MathUtils.lerp(40, dist - 4, k); fog.far = THREE.MathUtils.lerp(160, dist + 26, k);
      rainMatV.uniforms.opacity.value = 1 - ease(Math.min(1, p * 1.4));
      if (p >= 1 && handoff.resolve) { const r = handoff.resolve; handoff.resolve = null; r(); }
    } else if (from) {
      const p = Math.min(1, shotT / dur), k = ease(p);
      camera.position.lerpVectors(from, to, k); tmp.lerpVectors(look0, look1, k);
      camera.fov = THREE.MathUtils.lerp(fov0, fov1, k); camera.near = .1; camera.far = 600; camera.updateProjectionMatrix();
      camera.lookAt(tmp);
    }
    sky.position.copy(camera.position);
    rainMatV.uniforms.center.value.copy(camera.position).addScaledVector(camera.getWorldDirection(tmp2), 14);
  }

  addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); });
  return { camera, prepare, begin, play, handoffTo, finish, update, get active() { return !!state.liveOpening; } };
}
