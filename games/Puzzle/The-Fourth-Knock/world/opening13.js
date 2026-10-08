import * as THREE from 'three';
import { GLTFLoader } from '../vendor/GLTFLoader.js';
import { loadHero } from './hero13.js';
import { openingV13 } from '../content/step13.js';

// Step 13 opening: an authored title sequence, staged in the game's own world.
//   1 THE MESSAGE   Aren's hand turns a face-down envelope, stops at his name, draws out a note
//                   folded in three and lets it open; window rain runs across the desk in the moon's
//                   light; a double flash of lightning whites the frame.
//   2 THE TRAIN     out of the flash: the coach sways, Aren at the open door with his notebook.
//                   A signal lamp crosses his face; poles tick past in the knock rhythm (three,
//                   a pause, then the tunnel mouth as the fourth).
//   3 THE GHAT ROAD out of the tunnel's black, two headlights. The bus leans into the hairpin,
//                   wipers going; the beams find the sign; lightning shows the valley; a branch
//                   wipes the lens.
//   4 CEDAR HOUSE   the branch clears: windows warming one by one, Aren walking up the path. The
//                   lens lifts to the dark upper floor, then comes back to him at the steps.
//   5 HANDOFF       one continuous move into the playable veranda (the Step 12 move, kept).
// Every animated part is a pure function of shot time, so any frame can be scrubbed for review
// (scrub(), dev only). Aren's performance uses his own rig: poses, held attitudes, gestures.
const ISO = Math.atan2(.54499, .83844);          // yaw that turns +x into screen-right
const DIR = new THREE.Vector3(-13, -15.5, -20).normalize();
const SETS = { desk: new THREE.Vector3(0, 0, 420), train: new THREE.Vector3(420, 0, 0), road: new THREE.Vector3(-420, 0, 0) };
const PALETTE = { tile: '#9a4a32', tileDark: '#743426', ridge: '#5e2a20', leafDark: '#34503c', leaf: '#3f5f45', leafLight: '#557552', trunk: '#5a4632', grass: '#2a4133', grassLight: '#3a5541', soil: '#3b2f28' };
const GLOW = { warm: '#ffcf86', amber: '#f0a85a', dim: '#7e93a8', dark: '#1d2733' };
const PI = Math.PI;

// ------------------------------------------------------------------ timing
const clamp01 = t => Math.min(1, Math.max(0, t));
const EASE = {
  lin: t => t, in: t => t * t, out: t => 1 - (1 - t) * (1 - t), s: t => t * t * (3 - 2 * t),
  ss: t => t * t * t * (t * (t * 6 - 15) + 10), in3: t => t * t * t, out3: t => 1 - Math.pow(1 - t, 3)
};
const mix = (a, b, k) => Array.isArray(a) ? a.map((v, i) => v + (b[i] - v) * k) : a + (b - a) * k;
// keys: [[time, value, ease?], ...]; the ease shapes the segment that arrives at that key.
function key(keys, t) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [t1, v1, e] = keys[i];
    if (t <= t1) { const [t0, v0] = keys[i - 1]; return mix(v0, v1, (EASE[e] || EASE.ss)((t - t0) / Math.max(1e-6, t1 - t0))); }
  }
  return keys[keys.length - 1][1];
}
const span = (t, a, b) => clamp01((t - a) / (b - a));
const inside = (t, list) => list.some(([a, b]) => t >= a && t < b);
// Paper opening under its own weight: fast, a small lift back, then still.
function paperOpen(k) {
  if (k <= 0) return 1; if (k >= 1) return 0;
  if (k < .72) return 1 - EASE.out3(k / .72);
  const q = (k - .72) / .28; return .045 * Math.sin(q * PI) * (1 - q);
}

export function createOpening13({ scene, renderer, rooms, M, kit, canvasTexture, rainMat, rainUniforms, actors, state, world, ortho, acting }) {
  const camera = new THREE.PerspectiveCamera(36, innerWidth / innerHeight, .05, 600);
  const root = new THREE.Group(); root.name = 'Opening sets (Step 13)'; root.visible = false; scene.add(root);
  root.add(camera);                                     // camera-held foliage renders with it
  const tmp = new THREE.Vector3(), tmp2 = new THREE.Vector3(), tmp3 = new THREE.Vector3(), lastLook = new THREE.Vector3();
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const E = (c, extra = {}) => new THREE.MeshBasicMaterial({ color: c, toneMapped: false, ...extra });
  const swayTime = { value: 0 };
  let prepared = null, props = null, exterior = null, lid = [], land = [], garden = [];
  let shotIndex = -1, shotT = 0, handoff = null, paused = false, track = null, strikes = [], arenTint = null;
  const veil = { color: '#000', opacity: 0 };

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
  const mists = [];
  function mist(parent, x, y, z, w, h, ry, drift) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mistMat); m.position.set(x, y, z); m.rotation.y = ry; m.renderOrder = 4; parent.add(m);
    mists.push(t => { m.position.x = x + Math.sin(t * .05 + x) * drift; }); return m;
  }

  // Lightning: sky, rain, glass and a cold key light pulse together.
  const flashLight = new THREE.DirectionalLight('#b8cdf0', 0); flashLight.position.set(-30, 40, -20); root.add(flashLight);
  const flashCurve = t => t < 0 ? 0 : t < .06 ? t / .06 : t < .14 ? 1 - (t - .06) * 7 : t < .22 ? .45 + (t - .14) * 5 : Math.max(0, .85 - (t - .22) * 1.9);
  const flashAt = t => strikes.reduce((m, s) => Math.max(m, flashCurve(t - s)), 0);

  // Timed performance beats (poses, looks, gestures), fired once as shot time passes them.
  let beats = [], fired = 0;
  function perform(list) { beats = list.sort((a, b) => a[0] - b[0]); fired = 0; }
  function fire(t) { while (fired < beats.length && beats[fired][0] <= t) beats[fired++][1](); }

  // ------------------------------------------------------------------ helpers
  function group(origin, yaw = ISO) { const g = new THREE.Group(); g.position.copy(origin); g.rotation.y = yaw; root.add(g); return g; }
  const paper = (w, h, draw, extra = {}) => new THREE.MeshStandardMaterial({ map: canvasTexture(w, h, draw), roughness: .92, ...extra });
  const grain = (c, W, H, n = 420, a = .05) => { for (let i = 0; i < n; i++) { c.fillStyle = `rgba(120,95,60,${Math.random() * a})`; c.fillRect(Math.random() * W, Math.random() * H, 2, 1); } };
  // Camera from key tracks, in a set's local frame.
  function frame(g, cam, t) {
    tmp.fromArray(key(cam.pos, t)); tmp2.fromArray(key(cam.look, t));
    if (g) { g.localToWorld(tmp); g.localToWorld(tmp2); }
    camera.position.copy(tmp); camera.fov = key(cam.fov, t); camera.near = cam.near || .1; camera.far = 600; camera.updateProjectionMatrix();
    camera.lookAt(tmp2); lastLook.copy(tmp2);
  }
  // Where the lens's centre line crosses the plane z = zp (set-local), at time t: used to make
  // passing objects cross the frame exactly on their beat.
  function centreX(cam, t, zp) {
    const p = key(cam.pos, t), l = key(cam.look, t), s = (zp - p[2]) / (l[2] - p[2]);
    return p[0] + s * (l[0] - p[0]);
  }
  // Foliage silhouettes, painted: dense leaf masses with a cool moonlit rim.
  function leafTexture(seedN, dense) {
    let s = seedN; const r = () => (s = s * 16807 % 2147483647) / 2147483647;
    return canvasTexture(512, 512, (c, W, H) => {
      const leaf = (x, y, len, ang, col) => {
        c.save(); c.translate(x, y); c.rotate(ang); c.fillStyle = col; c.beginPath();
        c.moveTo(0, 0); c.quadraticCurveTo(len * .5, -len * .28, len, 0); c.quadraticCurveTo(len * .5, len * .28, 0, 0); c.fill(); c.restore();
      };
      const n = dense ? 520 : 150;
      for (let i = 0; i < n; i++) {
        const cx = dense ? W * (.12 + r() * .76) : W * r(), cy = dense ? H * (.12 + r() * .76) : H * (.4 + r() * .6);
        const len = 40 + r() * 70, a = r() * PI * 2;
        leaf(cx, cy, len, a, `rgb(${10 + r() * 10},${20 + r() * 16},${16 + r() * 10})`);
        if (r() < .16) leaf(cx + 2, cy - 2, len * .9, a, `rgba(120,150,170,${.18 + r() * .2})`);
      }
      if (dense) { c.fillStyle = 'rgb(11,19,15)'; c.beginPath(); c.ellipse(W / 2, H / 2, W * .3, H * .3, 0, 0, PI * 2); c.fill(); }
    });
  }
  // A fern: fronds fanning up from the bottom edge, leaflets shrinking toward each tip.
  function fernTexture(seedN) {
    let s = seedN; const r = () => (s = s * 16807 % 2147483647) / 2147483647;
    return canvasTexture(512, 512, (c, W, H) => {
      for (let f = 0; f < 7; f++) {
        const a = -PI / 2 + (f - 3) * .32 + (r() - .5) * .2, len = H * (.55 + r() * .35), bend = (r() - .5) * .9;
        const P = k => { const aa = a + bend * k * k; return [W / 2 + Math.cos(aa) * len * k, H + Math.sin(aa) * len * k]; };
        c.strokeStyle = 'rgb(14,24,18)'; c.lineWidth = 4; c.beginPath(); c.moveTo(...P(0)); for (let k = .05; k <= 1; k += .05) c.lineTo(...P(k)); c.stroke();
        for (let k = .1; k < .98; k += .032) {
          const [x, y] = P(k), [x2, y2] = P(k + .01), ang = Math.atan2(y2 - y, x2 - x), l = 54 * (1 - k * .75);
          for (const side of [-1, 1]) {
            c.save(); c.translate(x, y); c.rotate(ang + side * 1.1); c.fillStyle = r() < .12 ? 'rgba(110,140,160,.55)' : `rgb(${12 + r() * 10},${24 + r() * 14},${18 + r() * 8})`;
            c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(l * .5, -l * .3, l, 0); c.quadraticCurveTo(l * .5, l * .3, 0, 0); c.fill(); c.restore();
          }
        }
      }
    });
  }
  // A branch hanging in from the top-left corner: a stem and its leaves, the rest of the card empty.
  function branchTexture(seedN) {
    let s = seedN; const r = () => (s = s * 16807 % 2147483647) / 2147483647;
    return canvasTexture(512, 512, (c, W, H) => {
      const stem = k => [W * (-.02 + .8 * k), H * (.04 + .38 * k * k)];
      c.strokeStyle = 'rgb(16,22,18)'; c.lineWidth = 7; c.beginPath(); c.moveTo(...stem(0)); for (let k = .05; k <= 1; k += .05) c.lineTo(...stem(k)); c.stroke();
      for (let i = 0; i < 70; i++) {
        const k = r(), [x, y] = stem(k), len = 36 + r() * 46, a = PI * (.25 + r() * .7);
        c.save(); c.translate(x, y); c.rotate(a); c.fillStyle = r() < .15 ? 'rgba(115,145,165,.5)' : `rgb(${11 + r() * 10},${21 + r() * 14},${16 + r() * 9})`;
        c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(len * .5, -len * .26, len, 0); c.quadraticCurveTo(len * .5, len * .26, 0, 0); c.fill(); c.restore();
      }
    });
  }
  const leafMat = (tex, extra = {}) => new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: .35, depthWrite: false, depthTest: false, fog: false, toneMapped: false, ...extra });
  // Camera-held cards (foreground foliage), placed in view space: x, y as fractions of the half-frame.
  const held = [];
  function holdCard(mat, w, h, dist) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat); m.position.z = -dist; m.renderOrder = 30; m.visible = false;
    camera.add(m); held.push(m); return m;
  }
  function placeHeld(m, fx, fy, rot = 0) {
    const d = -m.position.z, hh = d * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)), hw = hh * camera.aspect;
    m.position.x = fx * hw; m.position.y = fy * hh; m.rotation.z = rot; m.visible = true;
  }

  // ------------------------------------------------------------------ 1. the message
  function drawHand(c, pinch) {
    // Aren's right hand from above, palm down, fingertips to the left; olive sleeve, cream cuff,
    // his brown skin and the cast's cream outline. Painted flat, like the cutouts it belongs to.
    const skin = '#6f4533', shade = '#4f2f1f', light = 'rgba(160,110,80,.32)', rim = '#f1e5c6';
    // [base, knuckle bend, tip, width], pinky (top) to index; the thumb lies along the bottom.
    const fingers = pinch
      ? [[[120, 88], [100, 84], [86, 88], 19], [[114, 111], [92, 108], [76, 114], 22], [[112, 135], [88, 136], [72, 142], 23], [[116, 160], [88, 170], [70, 188], 22]]
      : [[[120, 88], [92, 80], [64, 78], 19], [[114, 111], [80, 106], [42, 104], 22], [[112, 135], [74, 134], [34, 134], 23], [[116, 160], [80, 166], [44, 170], 22]];
    const thumb = pinch ? [[204, 176], [160, 198], [86, 196], 25] : [[204, 176], [166, 202], [124, 210], 25];
    const back = () => { c.beginPath(); c.moveTo(238, 90); c.quadraticCurveTo(170, 76, 124, 78); c.quadraticCurveTo(104, 130, 124, 184); c.quadraticCurveTo(180, 186, 240, 172); c.closePath(); };
    const sleeve = () => { c.beginPath(); c.moveTo(262, 60); c.bezierCurveTo(420, 44, 600, 32, 768, 24); c.lineTo(768, 234); c.bezierCurveTo(600, 228, 420, 220, 262, 204); c.closePath(); };
    const cuff = () => { c.beginPath(); c.moveTo(230, 76); c.lineTo(272, 64); c.lineTo(274, 200); c.lineTo(232, 190); c.closePath(); };
    const digit = ([p0, p1, p2, w], extra, col) => { c.strokeStyle = col; c.lineWidth = w + extra; c.lineCap = c.lineJoin = 'round'; c.beginPath(); c.moveTo(...p0); c.quadraticCurveTo(...p1, ...p2); c.stroke(); };
    // Cream outline around the whole silhouette first.
    for (const f of [...fingers, thumb]) digit(f, 13, rim);
    c.lineWidth = 13; c.strokeStyle = rim; back(); c.stroke(); cuff(); c.stroke(); sleeve(); c.stroke();
    c.fillStyle = '#4d5731'; sleeve(); c.fill();
    c.strokeStyle = '#3c4526'; c.lineWidth = 5; c.lineCap = 'round';
    for (const [x0, y0, x1, y1] of [[330, 72, 470, 98], [360, 190, 520, 170], [540, 60, 700, 84], [560, 200, 720, 188]]) { c.beginPath(); c.moveTo(x0, y0); c.quadraticCurveTo((x0 + x1) / 2, (y0 + y1) / 2 + 12, x1, y1); c.stroke(); }
    c.fillStyle = 'rgba(120,135,80,.35)'; c.beginPath(); c.ellipse(470, 62, 150, 15, -.04, 0, PI * 2); c.fill();
    c.fillStyle = '#e9e2d0'; cuff(); c.fill(); c.fillStyle = '#cfc6b0'; c.fillRect(252, 68, 20, 132);
    c.fillStyle = '#b9ad92'; c.beginPath(); c.arc(248, 122, 5, 0, PI * 2); c.fill();
    // Fingers, each edged darker so they read apart; then the thumb; then the back of the hand.
    for (const f of fingers) { digit(f, 3, shade); digit(f, 0, skin); }
    digit(thumb, 3, shade); digit(thumb, 0, skin);
    c.fillStyle = skin; back(); c.fill();
    c.fillStyle = light; c.beginPath(); c.ellipse(178, 118, 46, 22, -.08, 0, PI * 2); c.fill();
    c.strokeStyle = 'rgba(79,47,31,.55)'; c.lineWidth = 2.5;
    for (const [[x, y]] of fingers) { c.beginPath(); c.arc(x + 4, y, 7, PI * .55, PI * 1.45); c.stroke(); }
  }

  function buildDesk() {
    const g = group(SETS.desk, 0); kit.use(g);
    // A rented room's desk at a rain-dark window. Warm lamp to the left, the moon through the glass.
    kit.box(0, .84, 0, 5.4, .14, 3.2, M.teak, .03);
    kit.box(0, .92, 0, 5.3, .02, 3.1, M.teakLight, 0);
    kit.box(0, 2.3, -1.72, 5.4, 3.0, .2, M.limeShade, 0);
    const glass = kit.plane(.4, 2.45, -1.6, 2.9, 1.9, rainMat); glass.castShadow = false;
    for (const x of [-1.07, .4, 1.87]) kit.box(x, 2.45, -1.55, .1, 2.05, .1, M.teak, .01);
    for (const y of [1.45, 2.45, 3.45]) kit.box(.4, y, -1.55, 3.05, .1, .1, M.teak, .01);
    kit.box(.4, 1.4, -1.45, 3.2, .06, .3, M.teakLight, .01);
    kit.cyl(-1.9, .96, -.6, .28, .06, M.brass); kit.cyl(-1.9, 1.35, -.6, .04, .8, M.brass);
    const shade = kit.cyl(-1.75, 1.78, -.45, .42, .34, new THREE.MeshStandardMaterial({ color: '#3f5a45', emissive: '#243b2a', emissiveIntensity: .3 }), .2); shade.rotation.z = .5;
    const bulb = new THREE.PointLight('#ffc983', 20, 7, 2); bulb.position.set(-1.55, 1.55, -.3); g.add(bulb);
    kit.cyl(1.35, 1.03, -.35, .13, .22, new THREE.MeshStandardMaterial({ color: '#c9a36e', transparent: true, opacity: .75, roughness: .15 }), .11);
    kit.cyl(1.35, 1.09, -.35, .11, .02, new THREE.MeshStandardMaterial({ color: '#8a5a36' }), .11);
    // His notebook and pencil, the ticket that brought him, two coins.
    kit.box(1.75, .95, .9, .9, .04, 1.1, M.rust, .02); kit.box(1.75, .975, .9, .8, .02, 1.0, M.paper, .005);
    const pencil = kit.box(1.6, 1.0, .75, .05, .04, .9, M.mustard, .01); pencil.rotation.y = .5;
    const ticket = kit.plane(-1.25, .935, -.2, .5, .24, paper(256, 120, (c, W, H) => { c.fillStyle = '#d7c79a'; c.fillRect(0, 0, W, H); c.fillStyle = '#34495a'; c.font = 'bold 22px Courier New'; c.fillText('II CL · GHAT SECTION', 12, 44); c.font = '18px Courier New'; c.fillText('ONE PASSENGER', 12, 80); }));
    ticket.rotation.set(-PI / 2, 0, .35);
    for (const [x, z] of [[-1.05, 1.15], [-.9, 1.25]]) kit.cyl(x, .94, z, .07, .015, M.brass, .07, g, 16);
    g.add(new THREE.HemisphereLight('#6f86a3', '#1b140f', .32));

    // The moon through the window, projected: four panes and the rain running down them.
    const rc = document.createElement('canvas'); rc.width = rc.height = 256;
    const cx = rc.getContext('2d');
    const drips = Array.from({ length: 30 }, () => ({ x: Math.random(), y: Math.random(), v: .035 + Math.random() * .11, l: .08 + Math.random() * .2, w: .8 + Math.random() * 1.1 }));
    const beads = Array.from({ length: 160 }, () => ({ x: Math.random(), y: Math.random(), r: .7 + Math.random() * 1.8 }));
    const rainTex = new THREE.CanvasTexture(rc); rainTex.colorSpace = THREE.SRGBColorSpace;
    let drawnAt = -1;
    function drawRain(t) {
      if (Math.abs(t - drawnAt) < .06) return; drawnAt = t;
      cx.fillStyle = '#000'; cx.fillRect(0, 0, 256, 256);
      const x0 = 34, x1 = 222, y0 = 40, y1 = 216;
      cx.fillStyle = '#eef3ff'; cx.fillRect(x0, y0, x1 - x0, y1 - y0);
      cx.fillStyle = '#000'; cx.fillRect(124, y0, 8, y1 - y0); cx.fillRect(x0, 124, x1 - x0, 8);
      cx.fillStyle = 'rgba(30,40,60,.28)';
      for (const b of beads) { cx.beginPath(); cx.arc(x0 + b.x * (x1 - x0), y0 + b.y * (y1 - y0), b.r, 0, 7); cx.fill(); }
      for (const d of drips) {
        const y = ((d.y + t * d.v) % 1.25) - .12, px = x0 + d.x * (x1 - x0), py = y0 + y * (y1 - y0), len = d.l * 176;
        cx.strokeStyle = 'rgba(24,34,54,.34)'; cx.lineWidth = d.w; cx.beginPath(); cx.moveTo(px, py - len);
        for (let k = 1; k <= 8; k++) cx.lineTo(px + Math.sin(k * 1.1 + d.x * 9 + d.y * 4) * 1.2, py - len * (1 - k / 8));
        cx.stroke(); cx.fillStyle = 'rgba(24,34,54,.42)'; cx.beginPath(); cx.arc(px, py, d.w * 1.05, 0, 7); cx.fill();
      }
      rainTex.needsUpdate = true;
    }
    const moon = new THREE.SpotLight('#a9c1e6', 15, 10, .66, .42, 1.1);
    moon.position.set(.4, 3.35, -1.3); moon.target.position.set(-.1, .93, .3);
    moon.map = rainTex; moon.castShadow = true; moon.shadow.mapSize.set(1024, 1024); moon.shadow.bias = -.0005; moon.shadow.normalBias = .01;
    Object.assign(moon.shadow.camera, { near: .3, far: 8 });
    g.add(moon, moon.target);

    // The envelope: face down, flap at the near edge. Turned about its long axis, it lands face up
    // with the open edge away from him.
    const envFront = paper(640, 330, (c, W, H) => {
      c.fillStyle = '#e6d6b0'; c.fillRect(0, 0, W, H); grain(c, W, H);
      c.fillStyle = '#f1e6c8'; c.fillRect(512, 22, 100, 118);
      c.fillStyle = '#9c4a3a'; c.fillRect(521, 31, 82, 100);
      c.fillStyle = '#e4cf9f'; c.beginPath(); c.arc(562, 76, 22, 0, 7); c.fill(); c.fillStyle = '#9c4a3a'; c.beginPath(); c.arc(562, 76, 11, 0, 7); c.fill();
      c.fillStyle = '#e6d6b0'; for (let k = 0; k <= 10; k++) { c.beginPath(); c.arc(512 + k * 10, 22, 3.2, 0, 7); c.arc(512 + k * 10, 140, 3.2, 0, 7); c.fill(); }
      c.strokeStyle = 'rgba(62,54,92,.6)'; c.lineWidth = 3; c.beginPath(); c.arc(462, 92, 50, 0, 7); c.stroke(); c.lineWidth = 2; c.beginPath(); c.arc(462, 92, 38, 0, 7); c.stroke();
      // Cancel marks: three waves close together, a gap, one more.
      c.lineWidth = 3.5;
      for (const y of [52, 66, 80, 112]) { c.beginPath(); c.moveTo(330, y); for (let x = 330; x <= 624; x += 4) c.lineTo(x, y + Math.sin(x * .11) * 3.5); c.stroke(); }
      c.fillStyle = '#2d3a4a'; c.font = 'italic 50px Georgia'; c.fillText('A. Vale', 140, 226);
    });
    const envBack = paper(640, 330, (c, W, H) => {
      c.fillStyle = '#dccaa2'; c.fillRect(0, 0, W, H); grain(c, W, H);
      c.strokeStyle = 'rgba(95,72,44,.4)'; c.lineWidth = 3;
      c.beginPath(); c.moveTo(10, 10); c.lineTo(210, 190); c.moveTo(W - 10, 10); c.lineTo(W - 210, 190); c.stroke();
      c.fillStyle = 'rgba(245,232,200,.5)'; c.beginPath(); c.moveTo(6, H - 6); c.lineTo(W / 2, 112); c.lineTo(W - 6, H - 6); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(95,72,44,.55)'; c.beginPath(); c.moveTo(6, H - 6); c.lineTo(W / 2, 112); c.lineTo(W - 6, H - 6); c.stroke();
      c.fillStyle = 'rgba(60,40,24,.12)'; c.beginPath(); c.moveTo(20, H - 6); c.lineTo(W / 2, 124); c.lineTo(W - 20, H - 6); c.closePath(); c.fill();
    });
    const env = new THREE.Group(); env.position.set(-.35, .94, .72); env.rotation.y = -.1; g.add(env);
    const envFlip = new THREE.Group(); env.add(envFlip);
    const back = new THREE.Mesh(new THREE.PlaneGeometry(1.2, .62), envBack); back.rotation.x = -PI / 2; back.position.y = .006; envFlip.add(back);
    const frontHolder = new THREE.Group(); frontHolder.rotation.x = PI; envFlip.add(frontHolder);
    const front = new THREE.Mesh(new THREE.PlaneGeometry(1.2, .62), envFront); front.rotation.x = -PI / 2; front.position.y = .006; frontHolder.add(front);
    for (const m of [back, front]) { m.castShadow = m.receiveShadow = true; }

    // The note, folded in three: the top third over the bottom third over the middle. No signature.
    const noteTex = canvasTexture(768, 660, (c, W, H) => {
      c.fillStyle = '#efe2c0'; c.fillRect(0, 0, W, H); grain(c, W, H, 520, .045);
      c.strokeStyle = 'rgba(120,100,70,.28)'; c.lineWidth = 2; for (const y of [220, 440]) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
      c.fillStyle = '#28303d';
      c.font = 'italic 52px Georgia'; c.fillText('Cedar House.', 72, 142);
      c.font = 'italic 40px Georgia'; c.fillText('Before the rains close the road.', 72, 300); c.fillText('There is something you should see.', 72, 380);
      c.fillStyle = 'rgba(40,48,61,.1)'; c.fillRect(470, 562, 210, 3);
    });
    const noteBack = new THREE.MeshStandardMaterial({ color: '#e6d8b4', roughness: .95 });
    const NW = 1.2, PH = .34;
    function panel(offset) {
      const p = new THREE.Group(), t = noteTex.clone(); t.repeat.set(1, 1 / 3); t.offset.set(0, offset); t.needsUpdate = true;
      const f = new THREE.Mesh(new THREE.PlaneGeometry(NW, PH), new THREE.MeshStandardMaterial({ map: t, roughness: .9 })); f.rotation.x = -PI / 2;
      const b = new THREE.Mesh(new THREE.PlaneGeometry(NW, PH), noteBack); b.rotation.x = PI / 2;
      for (const m of [f, b]) { m.castShadow = m.receiveShadow = true; p.add(m); }
      return p;
    }
    const note = new THREE.Group(); g.add(note); note.visible = false;
    note.add(panel(1 / 3));
    const tHinge = new THREE.Group(); tHinge.position.z = -PH / 2; note.add(tHinge); const topP = panel(2 / 3); topP.position.z = -PH / 2; tHinge.add(topP);
    const bHinge = new THREE.Group(); bHinge.position.z = PH / 2; note.add(bHinge); const botP = panel(0); botP.position.z = PH / 2; bHinge.add(botP);

    // Aren's hand: a painted cutout, lit by the lamp and the moon, casting its own shadow.
    const handGeo = new THREE.PlaneGeometry(2.4, .8).translate(1.2, 0, 0);
    const handMat = pinch => new THREE.MeshStandardMaterial({ map: canvasTexture(768, 256, c => drawHand(c, pinch)), alphaTest: .5, roughness: .95, side: THREE.DoubleSide });
    const flat = handMat(false), pinchM = handMat(true);
    const hand = new THREE.Group(); g.add(hand);
    const handMesh = new THREE.Mesh(handGeo, flat); handMesh.rotation.x = -PI / 2; handMesh.castShadow = true; handMesh.renderOrder = 2; hand.add(handMesh);

    // ---- the performance (desk-local units; the desk top is at y .93)
    const ENV = { lift: [[1.42, 0], [1.78, .33, 'out'], [2.2, .33], [2.5, 0, 's']], flip: [[1.7, 0], [2.22, -PI, 'ss']] };
    const HAND = {
      tip: [[0, [2.4, 1.02, 2.2]], [.55, [2.4, 1.02, 2.2]], [1.3, [.24, .975, .72], 'out3'], [1.42, [.24, .975, .72]], [1.78, [.24, 1.305, .72], 'out'], [2.2, [.24, 1.305, .72]], [2.5, [.24, .975, .72], 's'],
        [2.85, [.16, .965, .98]], [3.12, [.17, .965, .99]], [3.38, [-.24, .975, .4]], [3.9, [-.2, .985, -.6], 's'], [4.6, [1.45, 1.0, 1.58], 'out3'], [8.7, [1.55, 1.0, 1.66]], [9.3, [2.6, 1.05, 2.4], 'in']],
      rot: [[0, -.8], [1.3, -.55], [2.5, -.55], [2.85, -.42], [3.12, -.44], [3.38, -.98], [3.9, -1.28], [4.6, -.72], [9.3, -.82]],
      twist: [[1.7, 0], [1.96, .32, 's'], [2.22, 0, 's']],
      pinch: [[1.36, 2.52], [3.34, 3.92]]
    };
    const NOTE = { show: 3.34, drawn: 3.9 };
    const CAM = {
      pos: [[0, [-.95, 3.05, 3.7]], [1.2, [-.55, 2.55, 2.8]], [2.45, [-.38, 2.12, 2.38]], [3.1, [-.36, 2.14, 2.34]], [4.05, [-.36, 2.72, 1.75]], [5.1, [-.4, 2.6, 1.42]], [9.2, [-.4, 2.42, 1.22], 's'], [10.6, [-.3, 2.5, 1.02], 'in']],
      look: [[0, [-.3, .93, .55]], [1.2, [-.22, .96, .7]], [2.45, [-.28, .94, .8]], [3.1, [-.28, .94, .78]], [4.05, [-.38, .93, -.3]], [5.1, [-.4, .93, -.4]], [9.2, [-.4, .93, -.44], 's'], [10.6, [-.05, 1.75, -1.3], 'in']],
      fov: [[0, 40], [1.2, 34], [2.45, 27], [3.1, 27], [4.05, 36], [5.1, 35], [9.2, 34], [10.6, 36]]
    };
    const noteEnd = V(-.42, .936, -.44);
    function track(t) {
      frame(g, CAM, t);
      drawRain(t);
      // Envelope: lifted by its edge, turned toward him in the air, set down again.
      env.position.y = .94 + key(ENV.lift, t); envFlip.rotation.x = key(ENV.flip, t);
      // Hand
      const tip = key(HAND.tip, t); hand.position.set(tip[0], tip[1], tip[2]); hand.rotation.set(key(HAND.twist, t), key(HAND.rot, t), 0, 'YXZ');
      handMesh.material = inside(t, HAND.pinch) ? pinchM : flat;
      hand.visible = t > .5 && t < 9.4;
      // Note: drawn out of the open edge under his fingers, laid flat, then it opens itself.
      note.visible = t >= NOTE.show;
      if (t < NOTE.drawn) { note.position.set(tip[0] - .22, .9415, tip[2] + PH / 2 + .02); note.rotation.y = -.1; }
      else { const k = EASE.s(span(t, NOTE.drawn, NOTE.drawn + .25)); note.position.set(mix(-.42, noteEnd.x, k), mix(.9415, noteEnd.y, k), mix(-.43, noteEnd.z, k)); note.rotation.y = mix(-.1, -.06, k); }
      const breathe = t > 4.9 ? Math.sin(t * 2.1) * .018 + Math.sin(t * 3.7) * .008 : 0;
      tHinge.rotation.x = PI * paperOpen(span(t, 3.95, 4.42)) + Math.max(0, breathe);
      bHinge.rotation.x = -PI * paperOpen(span(t, 4.4, 4.88)) - Math.max(0, -breathe * .7);
      tHinge.position.y = .003 * (tHinge.rotation.x / PI); bHinge.position.y = .0015 * (-bHinge.rotation.x / PI);
      // Lightning: the panes flare on the paper; a second strike whites the frame.
      const f = flashAt(t);
      moon.intensity = 15 * (1 + 7 * f); moon.color.setRGB(.66 + .34 * f, .76 + .24 * f, .9 + .1 * f);
      bulb.intensity = 20 * (1 - .25 * f);
      veil.color = '#e9eef6'; veil.opacity = key([[10.08, 0], [10.3, .82, 'out'], [10.6, 1, 'in']], t);
    }
    function start() {
      strikes = [9.45, 10.15];
      world.place('aren', 0, 0, 'offstage');
      arenTint = null; perform([]);
    }
    return { g, start, track };
  }

  // ------------------------------------------------------------------ 2. the night train
  function buildTrain() {
    const g = group(SETS.train); kit.use(g);
    const coach = new THREE.Group(); g.add(coach);
    props.place('OPN_coach', coach);
    const wheels = [-8.4, -6.6, 6.6, 8.4].map(x => props.place('OPN_coach_wheels', coach, x, .76, 0));
    const lamp = new THREE.PointLight('#ffc67a', 16, 5, 2); lamp.position.set(2.4, 3.2, .6); coach.add(lamp);
    // Track: ballast, rails under the wheels, sleepers streaming past.
    const ground = kit.plane(0, .1, -2, 180, 36, new THREE.MeshStandardMaterial({ color: '#1f2c26', roughness: 1 })); ground.rotation.x = -PI / 2;
    kit.box(0, .08, 0, 180, .16, 4.4, M.stone, 0);
    for (const z of [-1.05, 1.05]) kit.box(0, .25, z, 180, .1, .1, M.iron, 0);
    const SLEEPERS = 110, sleepers = new THREE.InstancedMesh(new THREE.BoxGeometry(.26, .07, 2.9), M.timber || M.teak, SLEEPERS); g.add(sleepers);
    const sm = new THREE.Matrix4();
    // Parallax: far hills scroll as painted layers; trees, poles and a signal go by in depth.
    const layers = [];
    const hill = (z, y, h, color, speed, rough) => {
      const tex = canvasTexture(1024, 256, (c, W, H) => { c.fillStyle = color; c.beginPath(); c.moveTo(0, H); for (let x = 0; x <= W; x += 16) c.lineTo(x, H * (.25 + .35 * (Math.sin(x * .011 * rough) * .5 + .5) + .12 * Math.sin(x * .05))); c.lineTo(W, H); c.fill(); });
      tex.wrapS = THREE.RepeatWrapping; tex.repeat.set(2, 1);
      kit.plane(0, y, z, 280, h, new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false })); layers.push({ tex, speed });
    };
    hill(-120, 14, 40, '#18242b', .003, .7); hill(-70, 9, 26, '#1c2d2d', .006, 1.1); hill(-38, 5, 16, '#20352c', .012, 1.7);
    const passers = [];
    const V_TRAIN = 24;
    const pole = (z, s = 1) => { const p = new THREE.Group(); g.add(p); kit.use(p); kit.cyl(0, 3.4 * s, 0, .1 * s, 6.8 * s, M.teak, .085 * s); kit.box(0, 6.25 * s, 0, 1.3 * s, .1 * s, .1 * s, M.teak, 0); for (const x of [-.5, .5]) kit.cyl(x * s, 6.4 * s, 0, .05 * s, .14 * s, M.porcelain || M.paper, .04 * s); kit.use(g); p.position.z = z; return p; };
    for (let i = 0; i < 9; i++) { const p = pole(7.5); passers.push({ o: p, x0: -60 + i * 14, span: 126 }); }
    for (const y of [6.05, 6.3]) kit.box(0, y, 7.5, 180, .025, .025, M.black, 0);
    for (let i = 0; i < 22; i++) {
      const tr = new THREE.Group(); g.add(tr); kit.use(tr);
      kit.cyl(0, 1.5, 0, .25, 3, M.teak, .18); kit.sphere(0, 3.6, 0, 1.8, 1.4, 1.8, i % 2 ? M.leaf : (M.leafDark || M.leaf));
      kit.use(g); passers.push({ o: tr, x0: -70 + i * 6.5 + Math.random() * 3, span: 143, z: -9 - Math.random() * 8 });
    }
    // One signal lamp and its hut: a green point of light across Aren's face.
    const sig = new THREE.Group(); g.add(sig); kit.use(sig);
    kit.cyl(0, 2.1, 0, .09, 4.2, M.iron, .09); kit.sphere(0, 4.3, 0, .16, .16, .16, E('#8dffb0')); kit.box(1.6, 1.1, -.6, 2.4, 2.2, 1.8, M.lime, .02); kit.box(1.6, 1.3, .31, .5, .6, .02, E('#f0b060'), 0);
    const sigLight = new THREE.PointLight('#8dffb0', 22, 9, 2); sigLight.position.set(0, 4, .6); sig.add(sigLight);
    kit.use(g); sig.position.z = 4.2;
    // The knock rhythm, close to the lens: three poles, a pause, and the tunnel mouth as the fourth.
    const knockPoles = [0, 1, 2].map(() => pole(5.4, 1.1));
    const portal = props.place('OPN_portal', g, 0, 0, 4.4, 0, 1.3);
    g.add(new THREE.HemisphereLight('#6d86a6', '#141a18', .95));
    const moonL = new THREE.DirectionalLight('#8fb0e0', 1.9); moonL.position.set(-10, 20, 14); g.add(moonL);

    const AREN = V(2.4, 1.35, .72);
    g.updateMatrixWorld(true); const arenW = g.localToWorld(AREN.clone());
    const CAM = {
      pos: [[0, [1.25, 2.78, 10.4]], [4.2, [1.62, 2.7, 8.7], 'ss'], [6.5, [1.45, 2.7, 8.9]], [8.25, [.7, 2.7, 9.4], 'in']],
      look: [[0, [2.25, 2.45, .6]], [4.2, [2.35, 2.42, .6], 'ss'], [6.5, [1.95, 2.45, .6]], [8.25, [-.4, 2.6, .5], 'in']],
      fov: [[0, 30], [4.2, 28], [6.5, 29], [8.25, 31]]
    };
    // Crossing beats (shot seconds): the signal at Aren, then the Four Knocks' own spacing.
    const T0 = 3.95, KNOCKS = [.15, 1.10, 2.05, 4.30].map(k => T0 + k), SIGNAL = 2.1;
    const knockX = KNOCKS.map((k, i) => centreX(CAM, k, i < 3 ? 5.4 : 3.1));
    function track(t) {
      frame(g, CAM, t);
      const travel = V_TRAIN * t;
      // The coach rides the joints: a short bounce, a slow roll; Aren rides with it.
      coach.position.y = Math.sin(t * 9) * .012 + Math.sin(t * 3.1) * .02 + (Math.sin(t * 17.3) > .96 ? .012 : 0);
      coach.rotation.x = Math.sin(t * 2.3) * .006;
      actors.aren.y = AREN.y + coach.position.y;
      for (const w of wheels) w.rotation.z = -travel / .46;
      for (let i = 0; i < SLEEPERS; i++) { const x = ((i * 1.0 + travel) % SLEEPERS) - SLEEPERS / 2; sm.makeTranslation(x, .19, 0); sleepers.setMatrixAt(i, sm); }
      sleepers.instanceMatrix.needsUpdate = true;
      for (const l of layers) l.tex.offset.x = l.speed * travel * .25;
      for (const p of passers) { let x = p.x0 + travel; x = ((x + 70) % p.span + p.span) % p.span - 70; p.o.position.x = x; if (p.z !== undefined) p.o.position.z = p.z; }
      sig.position.x = AREN.x + V_TRAIN * (t - SIGNAL);
      knockPoles.forEach((p, i) => { p.position.x = knockX[i] + V_TRAIN * (t - KNOCKS[i]); });
      portal.position.x = knockX[3] + V_TRAIN * (t - KNOCKS[3]);
      // Light on Aren: the door's warm lamp, the signal's green as it passes, then the tunnel.
      const d = Math.abs(sig.position.x - AREN.x), gw = Math.pow(Math.max(0, 1 - d / 4), 2);
      const dark = 1 - .75 * EASE.in(span(t, 7.5, KNOCKS[3]));
      arenTint = [(1.06 - .3 * gw) * dark, (.97 + .2 * gw) * dark, (.86 + .02 * gw) * dark];
      lamp.intensity = 16 * dark;
      // Out of the white of the flash; into the black of the tunnel.
      if (t < 1) { veil.color = '#e9eef6'; veil.opacity = key([[0, 1], [.12, .9], [.75, 0, 'out']], t); }
      else { veil.color = '#030406'; veil.opacity = key([[KNOCKS[3] - .12, 0], [KNOCKS[3] + .05, 1, 'in']], t); }
    }
    function start() {
      strikes = [0, 5.6];
      world.place('aren', arenW.x, arenW.z, state.room, arenW.y);
      const a = actors.aren;
      const pose = (expr, hold) => () => { state.expressions.aren = expr; acting.hold('aren', hold); };
      const facing = f => () => { a.facing = state.facing = f; };
      state.rearView.aren = false;
      facing('front-right')(); pose('thinking', 'listen')();
      // Head beats stay within the rig's neck overlap (tilts and turns, no lifts), so the paper
      // puppet never shows its cut.
      perform([
        [1.55, () => acting.hold('aren', 'tilt')], [1.9, () => acting.gesture('aren', 'turn')],
        [3.3, pose('amused', null)], [4.55, () => acting.gesture('aren', 'nod')],
        [5.65, pose('thinking', 'listen')],
        [6.55, () => { facing('front-left')(); acting.hold('aren', 'tilt'); }], [7.35, () => acting.gesture('aren', 'turn')]
      ]);
    }
    return { g, start, track };
  }

  // ------------------------------------------------------------------ 3. the ghat road
  function buildRoad() {
    const g = group(SETS.road); kit.use(g);
    // A hairpin cut into the hill: road ribbon, lane line, whitewashed parapet stones, the hill.
    const curve = new THREE.CatmullRomCurve3([V(-26, 0, 8), V(-12, .6, 6), V(-2, 1.2, 2.5), V(4, 1.6, -3), V(1, 2.2, -9), V(-8, 2.9, -12), V(-20, 3.6, -13)]);
    const N = 140, road = [], left = [], right = [];
    for (let i = 0; i <= N; i++) { const p = curve.getPointAt(i / N), tg = curve.getTangentAt(i / N), side = V(-tg.z, 0, tg.x).normalize(); road.push(p); left.push(p.clone().addScaledVector(side, 2.3)); right.push(p.clone().addScaledVector(side, -2.3)); }
    const geo = new THREE.BufferGeometry(), vs = [];
    for (let i = 0; i < N; i++) { const a = left[i], b = right[i], c = right[i + 1], d = left[i + 1]; vs.push(...a.toArray(), ...b.toArray(), ...c.toArray(), ...a.toArray(), ...c.toArray(), ...d.toArray()); }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vs, 3)); geo.computeVertexNormals();
    const asphalt = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: '#30383c', roughness: .16, metalness: .2, side: THREE.DoubleSide })); asphalt.receiveShadow = true; g.add(asphalt);
    for (let i = 0; i < N; i += 3) { const a = road[i], b = road[Math.min(N, i + 1)]; const d = b.clone().sub(a); const l = kit.box((a.x + b.x) / 2, (a.y + b.y) / 2 + .03, (a.z + b.z) / 2, .09, .02, d.length() + .02, M.paper, 0); l.rotation.y = Math.atan2(d.x, d.z); }
    for (let i = 0; i < N; i += 2) { const p = i < N * .62 ? left[i] : right[i], s = kit.box(p.x, p.y + .25, p.z, .5, .5, .5, (i / 2) % 2 ? M.paper : M.black, .04); s.rotation.y = Math.atan2(curve.getTangentAt(i / N).x, curve.getTangentAt(i / N).z); }
    const hillY = (x, z) => (z < -4 ? 10.5 * (1 - Math.exp((4 + z) * .085)) : -(z + 4) * .45) + x * .03 + Math.sin(x * .3) * .6 + Math.cos(z * .25) * .5;
    const hillGeo = new THREE.PlaneGeometry(90, 90, 48, 48); hillGeo.rotateX(-PI / 2);
    const hp = hillGeo.attributes.position;
    for (let i = 0; i < hp.count; i++) {
      const x = hp.getX(i), z = hp.getZ(i); let y = hillY(x, z), best = 1e9, ry = 0;
      for (const q of road) { const d = (q.x - x) ** 2 + (q.z - z) ** 2; if (d < best) { best = d; ry = q.y; } }
      const d = Math.sqrt(best), cut = ry + .55;                     // hill mesh sits .8 below the set
      if (d < 3.2) y = Math.min(y, cut); else if (d < 6.5) y = Math.min(y, THREE.MathUtils.lerp(cut, y, (d - 3.2) / 3.3));
      hp.setY(i, y);
    }
    hillGeo.computeVertexNormals();
    const hillM = new THREE.Mesh(hillGeo, new THREE.MeshStandardMaterial({ color: '#2f4a3b', roughness: .9, flatShading: true })); hillM.position.y = -.8; hillM.receiveShadow = true; g.add(hillM);
    for (let i = 0; i < 46; i++) { const x = Math.random() * 70 - 35, z = -15 - Math.random() * 26, gy = hillY(x, z) - .8; kit.cyl(x, gy + 1.2, z, .3, 3, M.teak, .2); kit.sphere(x, gy + 3.4, z, 2 + Math.random(), 1.6, 2 + Math.random(), Math.random() > .5 ? M.leaf : (M.leafDark || M.leaf)); }
    // The valley the lightning finds: far ridges and a waterfall across the lens's view, dark until
    // the flash shows how far down the ghat goes.
    const ridges = [], vdir = V(.59, 0, -.81), apex = V(3, 1.6, -3);
    for (const [d, y, c] of [[92, 27, '#0e161b'], [66, 20, '#121c1e'], [44, 14, '#16221f']]) {
      const tex = canvasTexture(1024, 256, (cx, W, H) => { cx.fillStyle = c; cx.beginPath(); cx.moveTo(0, H); for (let x = 0; x <= W; x += 16) cx.lineTo(x, H * (.3 + .3 * Math.sin(x * .008 + d) + .1 * Math.sin(x * .05))); cx.lineTo(W, H); cx.fill(); if (d === 66) { cx.fillStyle = 'rgba(200,220,230,.55)'; cx.fillRect(W * .44, H * .38, 10, H * .6); } });
      const m = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }); ridges.push(m);
      const at = apex.clone().addScaledVector(vdir, d); const pl = kit.plane(at.x, y, at.z, 240, 54, m); pl.rotation.y = Math.atan2(-vdir.x, -vdir.z); pl.renderOrder = -5;
    }
    // The sign at the bend, painted in the house's green and brass; the beams reveal it.
    const signTex = canvasTexture(640, 200, (c, W, H) => { c.fillStyle = '#26382f'; c.fillRect(0, 0, W, H); c.strokeStyle = '#c9a862'; c.lineWidth = 6; c.strokeRect(10, 10, W - 20, H - 20); c.fillStyle = '#efdcaa'; c.textAlign = 'center'; c.font = '600 60px Georgia'; c.fillText('CEDAR HOUSE', W / 2 - 20, 102); c.font = '26px Georgia'; c.fillStyle = '#c9a862'; c.fillText('GUEST HOUSE  ·  1 KM', W / 2 - 20, 156); c.font = '70px Georgia'; c.fillStyle = '#efdcaa'; c.fillText('↑', W - 60, 120); });
    const signFace = new THREE.MeshStandardMaterial({ map: signTex, emissive: '#ffffff', emissiveMap: signTex, emissiveIntensity: 0, roughness: .6 });
    const sp = curve.getPointAt(.47), st = curve.getTangentAt(.47);
    const out = V(-st.z, 0, st.x).normalize();                       // away from the bend's centre
    const signPos = sp.clone().addScaledVector(out, 3.6), reader = curve.getPointAt(.3);
    // It faces the traffic coming up to the bend, which is where the lens waits too.
    const sign = props.place('OPN_sign', g, signPos.x, signPos.y - .1, signPos.z, Math.atan2(reader.x - signPos.x, reader.z - signPos.z));
    const signBoard = new THREE.Mesh(new THREE.PlaneGeometry(2.1, .62), signFace); signBoard.position.set(0, 1.75, .062); sign.add(signBoard);
    // The bus, and what moves on it: wheels, wipers, two headlights that do all the lighting.
    const bus = new THREE.Group(); bus.rotation.order = 'YXZ'; g.add(bus);
    props.place('OPN_bus', bus);
    const wheels = [];
    for (const s of [-1, 1]) for (const z of [2.3, -2.3]) wheels.push(props.place('OPN_bus_wheel', bus, s * 1.1, .44, z));
    const wipers = [-.52, .38].map(x => props.place('OPN_bus_wiper', bus, x, 1.76, 3.47));
    const heads = [-1, 1].map(s => { const l = new THREE.SpotLight('#fff0cc', 0, 34, .4, .5, 1.1); l.position.set(s * .78, 1.08, 3.6); l.target.position.set(s * .5, .1, 16); bus.add(l, l.target); return l; });
    const beamTex = canvasTexture(64, 128, (c, W, H) => { const gr = c.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, 'rgba(255,236,190,0)'); gr.addColorStop(1, 'rgba(255,236,190,.2)'); c.fillStyle = gr; c.fillRect(0, 0, W, H); });
    const beamMat = new THREE.MeshBasicMaterial({ map: beamTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false, opacity: 0 });
    for (const s of [-1, 1]) { const cone = new THREE.Mesh(new THREE.ConeGeometry(1.2, 9, 16, 1, true), beamMat); cone.rotation.x = -PI / 2; cone.position.set(s * .78, .95, 8.1); cone.renderOrder = 5; bus.add(cone); }
    const flareTex = canvasTexture(128, 128, (c, W) => { const gr = c.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, 'rgba(255,248,225,1)'); gr.addColorStop(.18, 'rgba(255,230,180,.55)'); gr.addColorStop(1, 'rgba(255,220,160,0)'); c.fillStyle = gr; c.fillRect(0, 0, W, W); });
    const flares = [-1, 1].map(s => { const f = new THREE.Sprite(new THREE.SpriteMaterial({ map: flareTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, toneMapped: false, opacity: 0 })); f.position.set(s * .78, 1.08, 3.62); f.scale.setScalar(1.3); bus.add(f); return f; });
    const streakTex = canvasTexture(64, 256, (c, W, H) => { const gr = c.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(.55, 'rgba(255,255,255,.9)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = gr; c.fillRect(W * .3, 0, W * .4, H); });
    // Wet road: the tail lights drawn out in the water under them.
    for (const x of [-.95, .95]) { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: streakTex, color: '#ff5a44', blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, toneMapped: false, opacity: .55 })); sp.position.set(x, .06, -3.9); sp.scale.set(.32, 1.5, 1); sp.center.set(.5, 1); bus.add(sp); }
    g.add(new THREE.HemisphereLight('#5f7894', '#111614', .22));
    const moonL = new THREE.DirectionalLight('#86a9dc', .5); moonL.position.set(-14, 25, 16); g.add(moonL);
    mist(g, -4, 1.0, -6, 40, 5, 0, 3); mist(g, 6, 2.2, -14, 50, 7, 0, 4);
    // Foreground: ferns at the lens, then the branch that carries us to the house.
    const fernTex = fernTexture(7), coverTex = leafTexture(19, true);
    const ferns = [holdCard(leafMat(fernTex), .95, .95, 1.6), holdCard(leafMat(fernTex), .8, .8, 1.7)];
    const branch = holdCard(leafMat(coverTex), 3.2, 3.2, 1.2);

    const U = [[0, .115], [7.6, .86, 'lin']];
    // The lens waits on the valley side of the approach, looking up the road the way the bus goes:
    // its light arrives first, then the bus, then the beams find the sign at the bend.
    const CAM = {
      pos: [[0, [-16.5, 6.6, 14.5]], [1.8, [-15.2, 6.9, 13.4]], [3.4, [-13.8, 7.2, 12.4]], [4.8, [-12.8, 7.6, 11.6]], [6.8, [-12.0, 8.0, 10.8]], [7.6, [-11.6, 8.1, 10.4], 'in']],
      look: [[0, [-3, 1.0, 4.2]], [1.8, [.5, 1.3, 1.2]], [3.4, [2.6, 1.7, -2.0]], [4.25, [1.8, 3.2, -5.2]], [4.9, [.4, 7.2, -9.0], 'out'], [6.8, [-5.5, 3.4, -11.5]], [7.6, [-7.5, 3.4, -12.5], 'in']],
      fov: [[0, 40], [1.8, 40], [3.4, 40], [4.8, 41], [7.6, 42]]
    };
    const bp = new THREE.Vector3(), bt = new THREE.Vector3(), bt2 = new THREE.Vector3();
    function track(t) {
      frame(g, CAM, t);
      const u = key(U, t), du = .004;
      curve.getPointAt(u, bp); curve.getTangentAt(u, bt); curve.getTangentAt(Math.min(1, u + du), bt2);
      const heading = Math.atan2(bt.x, bt.z), dh = Math.atan2(bt2.x, bt2.z) - heading, turn = Math.atan2(Math.sin(dh), Math.cos(dh));
      const side = V(-bt.z, 0, bt.x).normalize();
      bus.position.copy(bp).addScaledVector(side, 1.0);
      bus.position.y += .03 + Math.sin(t * 12.7) * .016 + Math.sin(t * 5.1) * .012;
      // Body roll into the bend (outward), a little pitch on the bumps.
      bus.rotation.set(Math.sin(t * 7.3) * .007, heading, THREE.MathUtils.clamp(-turn * 3.2, -.075, .075));
      const dist = u * curve.getLength();
      for (const w of wheels) w.rotation.x = dist / .44;
      const wipe = -PI / 2 + (PI / 2 + .18) * (.5 - .5 * Math.cos(t * 2 * PI / 1.25));
      for (const w of wipers) w.rotation.z = -wipe;
      // Headlights catch, stutter once, hold.
      const on = key([[0, 0], [.28, 0, 'lin'], [.31, 1, 'lin'], [.36, .15, 'lin'], [.44, 1, 'lin']], t);
      for (const h of heads) h.intensity = 95 * on;
      beamMat.opacity = on;
      bus.getWorldDirection(tmp); tmp2.copy(camera.position).sub(bus.getWorldPosition(tmp3)).normalize();
      const facing = Math.max(0, tmp.dot(tmp2));
      for (const f of flares) { f.material.opacity = on * (.25 + .75 * Math.pow(facing, 3)); f.scale.setScalar(1.1 + 1.6 * Math.pow(facing, 4)); }
      // The sign lights only where the beams cross it.
      sign.getWorldPosition(tmp2); tmp2.sub(tmp3); const sd = tmp2.length(); tmp2.normalize();
      const reveal = on * THREE.MathUtils.smoothstep(tmp.dot(tmp2), Math.cos(.55), Math.cos(.22)) * (1 - THREE.MathUtils.smoothstep(sd, 12, 30));
      signFace.emissiveIntensity = .7 * reveal;
      // Lightning shows the valley's depth.
      const f = flashAt(t);
      ridges.forEach((m, i) => m.color.setScalar(1 + f * (.5 + i * .25)));
      // Foreground: ferns sway at the lens; the branch crosses and covers it.
      placeHeld(ferns[0], -.78 + Math.sin(t * 1.3) * .02, -.74, .25 + Math.sin(t * 1.7) * .05);
      placeHeld(ferns[1], .86 + Math.sin(t * 1.1 + 1) * .02, -.8, -.3 + Math.sin(t * 1.5 + 2) * .05);
      const b = key([[6.75, 2.4], [7.6, 0, 'in']], t);
      if (t > 6.7) placeHeld(branch, b, .05, .15 * (b - 1)); else branch.visible = false;
      veil.color = t < 2 ? '#030406' : '#08100c';
      veil.opacity = t < 2 ? key([[0, 1], [.3, 1], [.8, 0, 'out']], t) : key([[7.42, 0], [7.6, 1, 'in']], t);
    }
    function start() {
      strikes = [4.35];
      world.place('aren', 0, 0, 'offstage'); arenTint = null; perform([]);
    }
    function stop() { for (const m of [...ferns, branch]) m.visible = false; }
    return { g, start, track, stop };
  }

  // ------------------------------------------------------------------ 4. the house (Blender exterior)
  const warmMats = [];
  const smoke = [], glints = [];
  let houseLights = null;
  async function buildHouse() {
    const gltf = await new GLTFLoader().loadAsync('./assets/world12/cedar-exterior.glb');
    exterior = gltf.scene; exterior.name = 'Cedar House exterior (Blender)';
    const cache = new Map();
    const mapMat = m => {
      const name = m.name || '';
      if (cache.has(name)) return cache.get(name);
      let out;
      if (name.startsWith('E_')) { out = E(GLOW[name.slice(2)] || '#ffcf86'); if (name === 'E_warm' || name === 'E_amber') warmMats.push({ m: out, full: out.color.clone(), lag: name === 'E_amber' ? .55 : 0 }); }
      else {
        const key = name.slice(2);
        if (key.startsWith('leaf')) {
          // Opening-only leaves: the garden moves in the wind (the game's own plants stay still).
          out = new THREE.MeshStandardMaterial({ color: PALETTE[key] || m.color, roughness: .9, flatShading: true });
          out.onBeforeCompile = sh => {
            sh.uniforms.uSway = swayTime;
            sh.vertexShader = 'uniform float uSway;\n' + sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
              float hgt = max(0., position.y + .8);
              transformed.x += sin(uSway * 1.3 + position.x * .35 + position.z * .21) * .022 * hgt;
              transformed.z += cos(uSway * 1.05 + position.z * .3 + position.x * .12) * .016 * hgt;`);
          };
        } else out = M[key] || (M[key] = new THREE.MeshStandardMaterial({ color: PALETTE[key] || m.color, roughness: .9, flatShading: key === 'grass' || key === 'grassLight' }));
      }
      cache.set(name, out); return out;
    };
    exterior.traverse(o => { if (o.isMesh) { o.material = mapMat(o.material); o.castShadow = !o.material.isMeshBasicMaterial; o.receiveShadow = true; } });
    // The exterior is authored in the house frame; place it around the veranda room (map §2).
    exterior.rotation.y = PI / 2; exterior.position.set(-2.67, 0, -9.57);
    for (const c of exterior.children) {
      if (c.name.startsWith('LID')) lid.push(c); else if (c.name.startsWith('LAND')) land.push(c); else garden.push(c);
      c.userData.baseY = c.position.y;
    }
    root.add(exterior);
    const moon = new THREE.DirectionalLight('#86a7da', .72); moon.position.set(-18, 30, 26); moon.target.position.set(-2, 0, 2);
    moon.castShadow = true; moon.shadow.mapSize.set(2048, 2048); Object.assign(moon.shadow.camera, { left: -32, right: 32, top: 32, bottom: -32, near: 1, far: 120 }); moon.shadow.bias = -.0008;
    const hemi = new THREE.HemisphereLight('#7690b3', '#151d1a', .34);
    houseLights = new THREE.Group(); houseLights.add(moon, moon.target, hemi);
    for (const [x, z, c, i] of [[6, 7, '#ffc27a', 26], [-4, -3.2, '#ffcf86', 16], [10.5, 17.5, '#ffcf86', 10]]) { const l = new THREE.PointLight(c, i, 18, 2); l.position.set(x, 2.5, z); l.userData.full = i; houseLights.add(l); }
    root.add(houseLights);
    mist(root, 0, 1.5, 12, 60, 8, 0, 4); mist(root, -10, 2.5, -14, 70, 10, 0, 6); mist(root, 20, 1.2, 4, 40, 6, -1.2, 3);
    // Chimney smoke from the hearth (house frame (.05, 10.3, -5.6)), leaning with the wind.
    const puff = canvasTexture(128, 128, (c, W) => { const gr = c.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, 'rgba(150,165,180,.5)'); gr.addColorStop(1, 'rgba(150,165,180,0)'); c.fillStyle = gr; c.fillRect(0, 0, W, W); });
    for (let i = 0; i < 9; i++) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: puff, transparent: true, depthWrite: false, fog: false, opacity: 0 })); s.userData.phase = i / 9; root.add(s); smoke.push(s); }
    // Puddle glints on the path: the windows caught in standing water.
    const glint = canvasTexture(64, 64, (c, W) => { const gr = c.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,214,150,1)'); gr.addColorStop(1, 'rgba(255,214,150,0)'); c.fillStyle = gr; c.fillRect(0, 0, W, W); });
    for (let k = 1; k < 7; k++) { const P = verandaFromHouse(-14.6 - (7 + k) * 1.05 + .4, 4.3 + (7 + k) * .62 + Math.sin((7 + k) * .7) * .35 + .3); const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glint, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, toneMapped: false, opacity: 0 })); s.userData.at = V(P.x, 0, P.z); s.scale.setScalar(.35); root.add(s); glints.push(s); }
    // Aren's walk from the gate to the veranda steps, on the Blender path slabs (house frame).
    const path = [];
    for (let k = 7; k >= 0; k--) { const hx = -14.6 - k * 1.05, hz = 4.3 + k * .62 + Math.sin(k * .7) * .35; path.push(verandaFromHouse(hx, hz)); }
    const cover = holdCard(leafMat(leafTexture(19, true)), 2.5, 2.5, 1.2);
    const edges = [holdCard(leafMat(branchTexture(31)), 1.05, 1.05, 1.5), holdCard(leafMat(fernTexture(12)), .8, .8, 1.6)];
    return { path, cover, edges };
  }
  function verandaFromHouse(x, z) { return { x: z - 2.67, z: -9.57 - x }; }
  const ray = new THREE.Raycaster();
  function groundY(x, z) {
    ray.set(V(x, 30, z), V(0, -1, 0));
    const hit = ray.intersectObjects([...garden, ...land], true)[0];
    return hit ? hit.point.y : -.82;
  }
  function houseSet() {
    const H = sets.house;
    const CAM = {
      pos: [[0, [10.9, 1.62, 19.8]], [2.9, [9.7, 1.86, 17.4]], [5.3, [3.6, 3.4, 15.0], 's'], [6.6, [3.3, 3.5, 14.8]], [8.6, [6.4, 2.2, 15.2], 's']],
      look: [[0, [-.9, 3.1, -2.1]], [2.9, [-.6, 3.25, -1.7]], [5.3, [-12.8, 7.5, -13.4], 's'], [6.6, [-13.0, 7.6, -13.5]], [8.6, [1.0, 2.3, 3.6], 's']],
      fov: [[0, 46], [2.9, 42], [5.3, 33], [6.6, 31], [8.6, 40]]
    };
    const walk = { from: .35, speed: 1.85 };
    let pts = null, lens = null, total = 0;
    function track(t, dt, envT) {
      frame(null, CAM, t);
      if (!pts) {
        root.updateMatrixWorld(true);
        pts = H.path.map(q => V(q.x, groundY(q.x, q.z), q.z)); lens = [0];
        for (let i = 1; i < pts.length; i++) lens.push(lens[i - 1] + pts[i].distanceTo(pts[i - 1]));
        total = lens[lens.length - 1];
      }
      // Aren walks up the path and stops at the foot of the steps.
      const s = Math.min(total, Math.max(0, (t - walk.from) * walk.speed));
      let i = 1; while (i < lens.length - 1 && lens[i] < s) i++;
      const k = (s - lens[i - 1]) / Math.max(1e-6, lens[i] - lens[i - 1]);
      tmp.lerpVectors(pts[i - 1], pts[i], clamp01(k));
      const a = actors.aren; a.x = tmp.x; a.z = tmp.z; a.y = tmp.y; a.moving = s < total && t > walk.from;
      tmp2.subVectors(pts[i], pts[i - 1]); tmp3.set(1, 0, 0).applyQuaternion(camera.quaternion);
      a.facing = state.facing = tmp2.dot(tmp3) < 0 ? 'back-left' : 'back-right';
      state.rearView.aren = true;
      // Inviting first: the windows come up warm, one lamp after another.
      for (const w of warmMats) { const on = EASE.s(span(t, .35 + w.lag, 2.6 + w.lag)); const flick = on > 0 && on < 1 ? (Math.sin(t * 43 + w.lag * 9) > .6 ? .82 : 1) : 1; w.m.color.setRGB(.11, .09, .08).lerp(w.full, on * flick); }
      houseLights.children.forEach(l => { if (l.isPointLight) l.intensity = l.userData.full * EASE.s(span(t, .3, 2.8)); });
      // Foreground: the branch clears the lens, a few leaves stay at the edge.
      const c = key([[0, 0], [.75, -2.5, 'out']], t);
      if (c > -2.45) placeHeld(H.cover, c, 0, .12 * c); else H.cover.visible = false;
      placeHeld(H.edges[0], -.62 + Math.sin(envT * 1.2) * .012, .62, Math.sin(envT * 1.6) * .03);
      placeHeld(H.edges[1], .84 + Math.sin(envT * .9 + 1) * .012, -.78, -.2 + Math.sin(envT * 1.3) * .03);
      // Cool in the garden, warm at the steps.
      const warmth = clamp01(1 - pts[pts.length - 1].distanceTo(tmp) / 7);
      arenTint = [mix(.84, 1.07, warmth), mix(.9, 1.0, warmth), mix(1.03, .9, warmth)];
      veil.color = '#08100c'; veil.opacity = key([[0, 1], [.25, 0, 'out']], t);
      houseLife(t, envT);
    }
    function start() {
      strikes = [5.75];
      root.updateMatrixWorld(true);
      const p0 = H.path[0]; world.place('aren', p0.x, p0.z, state.room, groundY(p0.x, p0.z));
      state.expressions.aren = 'neutral'; acting.hold('aren', null);
      perform([[5.3, () => acting.hold('aren', 'tilt')], [7.4, () => acting.hold('aren', null)]]);
    }
    function stop() { H.cover.visible = false; for (const e of H.edges) e.visible = false; }
    return { start, track, stop };
  }
  // Smoke, glints: alive through the house shot and the handoff.
  function houseLife(t, envT) {
    for (const s of smoke) {
      const k = (envT * .09 + s.userData.phase) % 1;
      s.position.set(-8.27 - k * 2.6, 10.5 + k * 4.2, -9.6 + k * .8);
      s.scale.setScalar(.8 + k * 3.2); s.material.opacity = .42 * Math.sin(k * PI) * (1 - .4 * k);
    }
    glints.forEach((s, i) => { const p = s.userData.at; if (p.y === 0) p.y = groundY(p.x, p.z) + .1; s.position.copy(p); s.material.opacity = .35 + .35 * Math.sin(envT * (1.7 + i * .37) + i * 2.1); });
  }

  // ------------------------------------------------------------------ public
  const sets = {};
  async function prepare() {
    if (!prepared) prepared = (async () => {
      props = await loadHero({ canvasTexture, url: './assets/world13/opening-props.glb', overrides: { glow: E('#e9b56d'), lamp: E('#fff1c8'), tail: E('#ff4d3a'), glass: new THREE.MeshStandardMaterial({ color: '#50646f', roughness: .08, metalness: .3, transparent: true, opacity: .75 }) } });
      sets.desk = buildDesk(); sets.train = buildTrain(); sets.road = buildRoad();
      sets.house = await buildHouse(); sets.houseShot = houseSet();
      root.updateMatrixWorld(true);
      warm();
    })();
    return prepared;
  }
  // Each shot lights a different set, so each needs its own shader variants. Ask for all four now
  // (non-blocking where the browser compiles in parallel) instead of at each cut.
  function warm() {
    if (!renderer?.compileAsync) return;
    const groups = [sets.desk.g, sets.train.g, sets.road.g], rv = Object.values(rooms).map(r => r.root.visible), was = root.visible;
    root.visible = true;
    for (let i = 0; i < 4; i++) {
      groups.forEach((g, k) => { g.visible = k === i; });
      exterior.visible = i === 3;
      Object.values(rooms).forEach(r => { r.root.visible = i === 3 && r === rooms.veranda; });
      scene.fog = i === 0 ? null : fog; sky.visible = rain.visible = i !== 0;
      renderer.compileAsync(scene, camera).catch(() => {});
    }
    scene.fog = null;
    groups.forEach(g => { g.visible = false; }); exterior.visible = false;
    Object.values(rooms).forEach((r, k) => { r.root.visible = rv[k]; });
    root.visible = was;
  }
  function veilEl() { return document.getElementById('op-veil'); }
  function applyVeil() { const el = veilEl(); if (!el) return; el.style.background = veil.color; el.style.opacity = String(veil.opacity); }

  function begin() {
    root.visible = true; state.liveOpening = true; paused = false;
    scene.fog = fog;
    for (const r of Object.values(rooms)) r.root.visible = false;
    camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  }
  const SHOTS = () => [sets.desk, sets.train, sets.road, sets.houseShot];
  function play(i) {
    for (const s of SHOTS()) s.stop?.();
    shotIndex = i; shotT = 0; handoff = null; fired = 0; beats = [];
    rooms.veranda.root.visible = i >= 3;
    sets.desk.g.visible = i === 0; sets.train.g.visible = i === 1; sets.road.g.visible = i === 2;
    if (exterior) exterior.visible = i >= 3;
    for (const s of smoke) s.visible = i >= 3; for (const s of glints) s.visible = i >= 3;
    rain.visible = i !== 0; sky.visible = i !== 0;
    rainMatV.uniforms.opacity.value = 1;
    scene.fog = i === 0 ? null : fog;
    [fog.near, fog.far] = i === 1 ? [30, 140] : i === 2 ? [26, 120] : [55, 230];
    veil.opacity = 0;
    const set = SHOTS()[i];
    set.start(); track = set.track;
  }
  // Shot 5: the continuous move from the garden lens into the game's own orthographic view.
  function handoffTo(seconds, walkDelay = 0, lead = 0) {
    track = null;
    for (const w of warmMats) w.m.color.copy(w.full);
    houseLights.children.forEach(l => { if (l.isPointLight) l.intensity = l.userData.full; });
    sets.house.cover.visible = false;
    shotIndex = 4; shotT = 0; beats = []; fired = 0; strikes = [];
    const vis = (ortho.top - ortho.bottom) / ortho.zoom;
    const target = ortho.position.clone().addScaledVector(DIR, (ortho.position.y - 1) / -DIR.y);
    handoff = { target, vis, seconds, startPos: camera.position.clone(), startLook: lastLook.clone(), startFov: camera.fov };
    const start = handoff.startPos.clone().sub(handoff.startLook);
    handoff.startDist = start.length(); handoff.startDir = start.normalize();
    handoff.startVis = 2 * handoff.startDist * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    // Aren takes the veranda steps and stops on the stone, facing the door.
    actors.aren.moving = false; arenTint = null;
    handoff.walk = () => {
      state.rearView.aren = false;
      world.walk('aren', [{ x: 1.55, z: 4.5, y: -.6 }, { x: 1.55, z: 3.0, y: .06 }, { x: 1.5, z: 2.1, y: 0 }], { speed: 1.9 })
        .then(() => { if (handoff) world.look('aren', { x: 1.55, z: -2.5 }, { back: true }); });
    };
    handoff.walkAt = walkDelay; handoff.lead = lead;       // (the hybrid holds the lens for `lead` s, then makes the same move)
    if (!walkDelay) { handoff.walk(); handoff.walk = null; }
    return new Promise(resolve => { handoff.resolve = resolve; });
  }
  function finish() {
    for (const s of SHOTS()) s?.stop?.();
    root.visible = false; state.liveOpening = false; scene.fog = null; arenTint = null; track = null; paused = false;
    rooms.veranda.root.visible = true;
    for (const c of lid) { c.position.y = c.userData.baseY; c.visible = true; }
    handoff = null; shotIndex = -1; veil.opacity = 0; applyVeil();
  }

  function update(dt, envTime) {
    if (!state.liveOpening) return;
    if (!paused) shotT += dt;
    const t = shotT;
    swayTime.value = envTime;
    fire(t);
    for (const m of mists) m(envTime);
    if (track) track(t, dt, envTime);
    const f = flashAt(t);
    sky.material.uniforms.flash.value = f; flashLight.intensity = f * 2.4; rainMatV.uniforms.flash.value = f; rainUniforms.flash.value = Math.max(rainUniforms.flash.value, f * .8);
    rainMatV.uniforms.time.value = envTime;
    if (handoff) {
      if (handoff.walk && t >= handoff.walkAt) { handoff.walk(); handoff.walk = null; }
      const p = Math.min(1, Math.max(0, t - handoff.lead) / handoff.seconds), k = EASE.s(p);
      const target = handoff.startLook.clone().lerp(handoff.target, k);
      const dir = handoff.startDir.clone().lerp(DIR.clone().negate(), EASE.s(Math.min(1, p * 1.25))).normalize();
      const vis = THREE.MathUtils.lerp(handoff.startVis, handoff.vis, k);
      const fov = THREE.MathUtils.lerp(handoff.startFov, 3.2, Math.pow(k, .7));
      const dist = vis / (2 * Math.tan(THREE.MathUtils.degToRad(fov / 2)));
      camera.fov = fov; camera.position.copy(target).addScaledVector(dir, dist); camera.lookAt(target);
      camera.near = Math.max(.1, dist - 60); camera.far = dist + 260; camera.updateProjectionMatrix();
      // The roof and upper storeys lift away like a lid; the land beyond goes into the dark.
      const lift = Math.pow(Math.max(0, (p - .15) / .7), 2);
      lid.forEach((c, i) => { c.position.y = c.userData.baseY + lift * (40 + i * 6); c.visible = lift < .99; });
      fog.near = THREE.MathUtils.lerp(55, dist - 4, k); fog.far = THREE.MathUtils.lerp(230, dist + 26, k);
      rainMatV.uniforms.opacity.value = 1 - EASE.s(Math.min(1, p * 1.4));
      houseLife(t, envTime);
      // The last leaves at the edge of frame fall away as the lens rises (none when the lens comes from a painting).
      const away = handoff.bare ? 1 : EASE.in(span(t, 0, 1.1)), E2 = sets.house.edges;
      if (away < 1) { placeHeld(E2[0], -.62 - away * .9, .62 + away * .6, 0); placeHeld(E2[1], .84 + away * .9, -.78 - away * .6, -.2); }
      else for (const e of E2) e.visible = false;
      veil.opacity = 0;
      if (p >= 1 && handoff.resolve) { const r = handoff.resolve; handoff.resolve = null; r(); }
    }
    sky.position.copy(camera.position);
    rainMatV.uniforms.center.value.copy(camera.position).addScaledVector(camera.getWorldDirection(tmp2), 14);
    applyVeil();
  }

  // Review only (dev): freeze shot i at time t. Poses and looks are replayed up to t.
  async function scrub(i, t) {
    await prepare();
    if (!state.liveOpening) begin();
    const shot = Math.min(i, 3);
    play(shot);
    if (i >= 4) { shotT = openingV13[3].seconds; fire(shotT); track(shotT, 0, state.envTime); handoffTo(5.4); }
    paused = true; shotT = t; fire(t);
    update(0, state.envTime);
    return { shot: i, t };
  }

  // ------------------------------------------------------------------ Step 13C: the hybrid opening's arrival
  // The illustrated opening (world/opening2d.js) plays its four beats and hands over here. Only the house
  // set is built. The Step 13 move then starts from the lens the last painting was framed with (the same
  // world, the same camera), with Aren at the foot of the steps where the painting leaves him.
  let handoffReady = null;
  function prepareHandoff() {
    if (!handoffReady) handoffReady = (async () => {
      if (!sets.house) { sets.house = await buildHouse(); sets.houseShot = houseSet(); }
      root.updateMatrixWorld(true);
    })();
    return handoffReady;
  }
  // Its shader variants (the house's lights and fog over the veranda), compiled while the screen is covered.
  function warmHandoff() {
    if (!renderer?.compileAsync || !exterior) return;
    const rv = Object.values(rooms).map(r => r.root.visible), was = root.visible, fogWas = scene.fog;
    root.visible = true; exterior.visible = true; sky.visible = rain.visible = true;
    for (const s of [sets.desk, sets.train, sets.road]) if (s) s.g.visible = false;
    Object.values(rooms).forEach(r => { r.root.visible = r === rooms.veranda; });
    scene.fog = fog;
    renderer.compileAsync(scene, camera).catch(() => {});
    scene.fog = fogWas; exterior.visible = false;
    Object.values(rooms).forEach((r, k) => { r.root.visible = rv[k]; });
    root.visible = was;
  }
  function handoffFrom({ seconds, pos, look, fov, aren: [ax, az], facing = 'back-left', lead = 0 }) {
    root.visible = true; paused = false; track = null;
    for (const s of [sets.desk, sets.train, sets.road]) if (s) s.g.visible = false;
    Object.values(rooms).forEach(r => { r.root.visible = r === rooms.veranda; });
    exterior.visible = true; for (const s of [...smoke, ...glints]) s.visible = true;
    rain.visible = sky.visible = true; rainMatV.uniforms.opacity.value = 1;
    scene.fog = fog; [fog.near, fog.far] = [55, 230];
    camera.aspect = innerWidth / innerHeight; camera.position.fromArray(pos); camera.fov = fov; camera.near = .1; camera.far = 600;
    camera.updateProjectionMatrix(); camera.lookAt(tmp.fromArray(look)); lastLook.fromArray(look);
    world.place('aren', ax, az, 'veranda', groundY(ax, az));
    state.rearView.aren = true; actors.aren.facing = state.facing = facing; actors.aren.moving = false;
    const done = handoffTo(seconds, lead, lead);
    handoff.bare = true;
    return done;
  }
  // Review only (dev): freeze the move at t.
  function hold(t) { paused = true; shotT = t; update(0, state.envTime); }

  addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); });
  // Review only (dev): hold the frozen frame's lens at an arbitrary position.
  function peek(p, l, fov = 40) { track = null; camera.position.fromArray(p); camera.fov = fov; camera.updateProjectionMatrix(); camera.lookAt(tmp.fromArray(l)); }

  return { camera, prepare, begin, play, handoffTo, finish, update, scrub, peek, clock: () => shotT, arenTint: () => arenTint, get active() { return !!state.liveOpening; },
    prepareHandoff, warmHandoff, handoffFrom, hold };
}
