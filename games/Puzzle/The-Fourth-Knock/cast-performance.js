import * as THREE from 'three';

// Step 11 actor rig. Every cutout is a small paper puppet that can breathe, nod, bow, look up and
// react without new drawings or skeletal animation. Step 15: the head is no longer a separate layer
// cut out of the body (a rectangle that left a gap at the neck when the head lifted, and carried a
// slice of shell, collar or scarf with it). Each pose is one finely subdivided plane; vertices above
// the neck follow the head transform through a soft neck band, so the neck flexes and the picture
// stays one continuous illustration in every attitude. Room light tints them (master 3.14 "mild colour
// tint"); alpha-to-coverage gives the cream outlines clean edges. Portrait crops for the DOM stay
// driven by the same atlas metadata, so gameplay art and dialogue art can never drift apart.
const NATIVE_FACING = { aren: 'right', mira: 'left', ada: 'left', elias: 'left', victor: 'left' };
// Step 15: Ada's and Mira's expressions come from two sheets drawn at different head-to-body proportions (Step 6.1
// slim, Step 7 fuller), so an expression change across sheets made the head jump ~35% in size. Each sheet's heads
// are eased toward the middle, about the neck, so the face stays one size whichever sheet a line uses.
const HEAD_SCALE = { ada: { 'ada-acting-v61.png': 1.12, 'support-acting-v7.png': .9 }, mira: { 'mira-acting-v61.png': 1.12, 'support-acting-v7.png': .9 } };
const ALIASES = {
  aren: { serious: 'neutral', grave: 'neutral', concerned: 'neutral', alert: 'surprised', realization: 'surprised', accuse: 'skeptical' },
  mira: { defensive: 'guarded', serious: 'concerned', worried: 'concerned', listening: 'curious' },
  ada: { warm: 'hopeful', worried: 'uneasy', irritated: 'guarded', solemn: 'guarded' },
  elias: { composed: 'calm', careful: 'concerned', pressured: 'concerned', shaken: 'shock', resigned: 'concerned', grief: 'concerned' },
  victor: {}
};

const vertexShader = `
attribute float headW;
uniform vec4 uHeadXf;    // pivot x, pivot y, rotation, lift (plane space)
uniform float uHeadSy, uHeadScale;
varying vec2 vUv;
void main(){
  vUv = uv;
  vec3 p = position;
  vec2 q = p.xy - uHeadXf.xy;
  q *= mix(1.0, uHeadScale, headW);
  q.y *= mix(1.0, uHeadSy, headW);
  float a = uHeadXf.z * headW, c = cos(a), s = sin(a);
  p.xy = uHeadXf.xy + vec2(c * q.x - s * q.y, s * q.x + c * q.y) + vec2(0.0, uHeadXf.w * headW);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`;
const fragmentShader = `
uniform sampler2D map;
uniform vec4 uCrop;      // offset.xy, repeat.xy
uniform vec3 uTint;
uniform float uLift, uFade;
varying vec2 vUv;
void main(){
  vec4 t = texture2D(map, uCrop.xy + vUv * uCrop.zw);
  if (t.a < 0.06) discard;
  gl_FragColor = vec4(t.rgb * uTint * (1.0 + uLift), t.a * (1.0 - uFade));
  #include <colorspace_fragment>
}`;

export async function createCastActing({ actors, state, rearMap, reducedMotion = false }) {
  const json = async url => (await fetch(url)).json();
  const sheets = await json('./assets/acting-v61.json');
  const extra = await json('./assets/acting-v7.json');
  for (const [name, sheet] of Object.entries(extra)) {
    if (name === 'victor') continue;
    if (sheets[name]) Object.assign(sheets[name].states, sheet.states); else sheets[name] = sheet;
  }
  // Tighter DOM portrait crops for Ada's Step 6.1 sheet (the puppet cut has its own data).
  sheets.ada.states.reserved.head = [145, 15, 385, 280];
  sheets.ada.states.uneasy.head = [640, 20, 885, 285];
  sheets.ada.states.hopeful.head = [1140, 15, 1385, 280];
  sheets.victor = (await json('./assets/acting-v8.json')).victor;
  sheets.elias.states.adjusting = { file: './assets/elias-adjusting-v81.png', width: 1024, height: 1536, rect: [104, 34, 921, 1506], head: [317, 34, 710, 430], footX: 523 };
  const watchPose = await json('./assets/victor-watch-v81.json');
  state.assetStatus ??= {};
  state.assetStatus.victorWatch = watchPose.status;
  if (watchPose.status === 'PRODUCTION_INTEGRATED') sheets.victor.states.watch = watchPose;
  // Aren's rear view lives in the original cast atlas (region 1).
  // Step 15: the rear view's rect is cropped to the drawing (it had 11 px above the head and 26 px under the feet), so
  // Aren no longer shrinks 6% and lifts off the floor when he turns his back; every front pose is already tight.
  sheets.aren.states.rear = { file: './assets/cast-atlas.png', width: 2172, height: 724, rect: [643, 49, 1101, 672], head: [700, 49, 1000, 250], footX: 872, rear: true };
  const puppet = await json('./assets/puppet-v11.json');

  const textures = new Map();
  const loader = new THREE.TextureLoader();
  function textureFor(file) {
    if (!textures.has(file)) textures.set(file, loader.loadAsync(file).then(t => {
      t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.generateMipmaps = true; return t;
    }));
    return textures.get(file);
  }

  const poses = {};
  for (const [name, sheet] of Object.entries(sheets)) {
    poses[name] = {};
    for (const [expression, frame] of Object.entries(sheet.states)) {
      const file = frame.file || sheet.file;
      const W = frame.width || sheet.width, H = frame.height || sheet.height;
      const [l, t, r, b] = frame.rect, mirror = !!frame.mirrorX, a = actors[name];
      const sx = a.h / (b - t), sy = a.h / 0.837 / (b - t);
      const width = (r - l) * sx, height = (b - t) * sy;
      const cut = puppet[name]?.[expression];
      const neckPx = cut ? cut.neck : null;
      const headU0 = cut ? (mirror ? (r - cut.x1) : (cut.x0 - l)) / (r - l) : 0;
      const headU1 = cut ? (mirror ? (r - cut.x0) : (cut.x1 - l)) / (r - l) : 0;
      const neckV = cut ? 1 - (neckPx - t) / (b - t) : 2;
      const footOffset = (mirror ? -1 : 1) * ((l + r) / 2 - frame.footX) * sx;
      const puppetPose = !!cut && !frame.rear;
      const body = new THREE.PlaneGeometry(width, height, puppetPose ? 20 : 1, puppetPose ? 72 : 1);
      body.translate(footOffset, height / 2, 0);
      const pivot = cut
        ? new THREE.Vector2(footOffset - width / 2 + ((headU0 + headU1) / 2) * width, (1 - (neckPx - t) / (b - t)) * height)
        : new THREE.Vector2(0, height * 0.8);
      // Head weight per vertex: 0 on the body, 1 on the head, eased through a band that straddles the
      // neck line, and eased off either side of the head column so nothing beside the head is sliced.
      const uv = body.attributes.uv, weights = new Float32Array(uv.count);
      if (puppetPose) {
        const band0 = neckV - .045, band1 = neckV + .03, margin = .1 * (headU1 - headU0);
        const ease = (a, b, x) => { const k = Math.min(1, Math.max(0, (x - a) / (b - a))); return k * k * (3 - 2 * k); };
        for (let i = 0; i < uv.count; i++) {
          const u = uv.getX(i), v = uv.getY(i);
          const wv = ease(band0, band1, v);
          const wu = Math.min(ease(headU0 - margin, headU0 + margin, u), 1 - ease(headU1 - margin, headU1 + margin, u));
          weights[i] = wv * wu;
        }
      }
      body.setAttribute('headW', new THREE.BufferAttribute(weights, 1));
      poses[name][expression] = {
        file, texture: await textureFor(file),
        crop: new THREE.Vector4(mirror ? r / W : l / W, 1 - b / H, (mirror ? -1 : 1) * (r - l) / W, (b - t) / H),
        puppet: puppetPose, body, pivot, frame, sheet, rear: !!frame.rear,
        headScale: puppetPose ? (HEAD_SCALE[name]?.[file.split('/').pop()] ?? 1) : 1
      };
    }
  }
  for (const [name, aliases] of Object.entries(ALIASES)) {
    for (const [alias, target] of Object.entries(aliases)) if (poses[name][target] && !poses[name][alias]) poses[name][alias] = poses[name][target];
  }

  // Replace the placeholder planes created in main.js with two-layer puppets.
  for (const [name, a] of Object.entries(actors)) {
    const parent = a.mesh.parent, old = a.mesh;
    const group = new THREE.Group();
    group.quaternion.copy(a.baseQ);
    group.position.copy(old.position);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        map: { value: null }, uCrop: { value: new THREE.Vector4() }, uHeadXf: { value: new THREE.Vector4() }, uHeadSy: { value: 1 }, uHeadScale: { value: 1 },
        uTint: { value: new THREE.Color(1, 1, 1) }, uLift: { value: 0 }, uFade: { value: 0 }
      },
      vertexShader, fragmentShader, side: THREE.DoubleSide, transparent: false, alphaToCoverage: true
    });
    const bodyMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    bodyMesh.renderOrder = 1;
    bodyMesh.frustumCulled = false;          // the vertex shader moves the head beyond the static bounds
    group.add(bodyMesh);
    parent.add(group);
    old.removeFromParent();
    a.mesh = group;
    a.rig = {
      group, bodyMesh, pose: null,
      head: { rot: 0, dy: 0, sy: 1, targetRot: 0, targetDy: 0, targetSy: 1, hold: null, gestures: [] },
      pop: 0, lift: 0, fade: 0, tint: new THREE.Color(1, 1, 1), idleSeed: Math.random() * 10, idleNext: 0, idleRot: 0
    };
  }

  function expression(name) {
    if (name === 'victor' && state.gesture?.kind === 'watch' && state.time - state.gesture.at < 1.8 && poses.victor.watch) return 'watch';
    if (name === 'elias' && state.gesture?.kind === 'glasses' && state.time - state.gesture.at < 1.8) return 'adjusting';
    const wanted = state.expressions?.[name];
    return poses[name][wanted] ? wanted : Object.keys(poses[name])[0];
  }

  // Facing: front-left/right use mirrored front art; back-* uses a real rear view where one exists.
  function resolve(name, a) {
    const facing = name === 'aren' ? (state.facing || a.facing || 'front-right') : (a.facing || 'front-left');
    const wantsBack = facing.startsWith('back');
    const aren = name === 'aren', elias = name === 'elias';
    const directedRear = state.rearView?.[name];
    if (aren && wantsBack && (state.phase === 'explore' || directedRear)) return { key: 'rear', facing };
    if (elias && ((a.moving && wantsBack) || directedRear) && poses.elias.back) return { key: 'back', facing };
    return { key: expression(name), facing };
  }

  function applyPose(a, pose) {
    const rig = a.rig;
    if (rig.pose === pose) return false;
    const previous = rig.pose;
    rig.pose = pose;
    rig.bodyMesh.geometry = pose.body;
    const u = rig.bodyMesh.material.uniforms;
    u.map.value = pose.texture;
    u.uCrop.value.copy(pose.crop);
    u.uHeadScale.value = pose.headScale;
    if (previous && !previous.rear && !pose.rear) rig.pop = 1;
    return true;
  }

  // Head performance: short gestures layer on top of an optional held attitude.
  const HEAD = {
    none: { rot: 0, dy: 0, sy: 1 },
    bow: { rot: 0.055, dy: -0.05, sy: 0.965 },
    grave: { rot: 0.035, dy: -0.035, sy: 0.975 },
    up: { rot: -0.095, dy: 0.028, sy: 1.012 },
    tilt: { rot: 0.075, dy: 0, sy: 1 },
    back: { rot: -0.04, dy: 0.012, sy: 1 },
    listen: { rot: 0.03, dy: -0.01, sy: 1 }
  };
  function hold(name, attitude) { const a = actors[name]; if (a?.rig) a.rig.head.hold = attitude && attitude !== 'none' ? attitude : null; }
  function gesture(name, kind, at = state.time) { const a = actors[name]; if (a?.rig) a.rig.head.gestures.push({ kind, at }); }
  function pop(name) { const a = actors[name]; if (a?.rig) a.rig.pop = 1; }

  let speaker = null;
  function setSpeaker(name) { speaker = name; }

  const tmpTint = new THREE.Color();
  // context: { dt, time, still, motion, reaction, actorTint:[r,g,b], localTint(name, a) -> [r,g,b] }
  function update(context = {}) {
    const dt = context.dt ?? 0.016, time = context.time ?? state.time;
    const calm = reducedMotion || context.still;
    for (const [name, a] of Object.entries(actors)) {
      const rig = a.rig;
      const { key, facing } = resolve(name, a);
      const pose = poses[name][key] || poses[name][expression(name)];
      applyPose(a, pose);
      const native = pose.rear ? (name === 'aren' ? 'left' : 'right') : NATIVE_FACING[name];
      const faceLeft = facing.endsWith('left');
      const mirrored = (native === 'left') !== faceLeft;
      rig.group.scale.x = mirrored ? -1 : 1;
      rig.forwardSign = native === 'right' ? -1 : 1;

      // Head: held attitude + transient gestures + a slow idle drift.
      const head = rig.head;
      const base = HEAD[head.hold] || HEAD.none;
      let rot = base.rot, dy = base.dy, sy = base.sy;
      if (!calm && pose.puppet && !head.hold && time > rig.idleNext) {
        rig.idleNext = time + 2.5 + ((rig.idleSeed * 7.13 + time) % 3.5);
        rig.idleRot = (Math.sin(time * 1.7 + rig.idleSeed) * 0.5) * 0.028;
      }
      if (!head.hold && !calm) rot += rig.idleRot;
      head.gestures = head.gestures.filter(g => time - g.at < 0.9);
      for (const g of head.gestures) {
        const t = (time - g.at) / (g.kind === 'nod' ? 0.42 : 0.6);
        if (t < 0 || t > 1) continue;
        const bell = Math.sin(Math.PI * t);
        if (g.kind === 'nod') { dy -= 0.03 * bell; rot += 0.02 * bell; }
        if (g.kind === 'take') { dy += 0.02 * bell; rot -= 0.05 * bell; }
        if (g.kind === 'turn') { rot += 0.05 * Math.sin(Math.PI * 2 * t) * (1 - t); }
      }
      const k = reducedMotion ? 1 : 1 - Math.exp(-dt * 9);
      head.rot += (rot - head.rot) * k;
      head.dy += (dy - head.dy) * k;
      head.sy += (sy - head.sy) * k;
      const hu = rig.bodyMesh.material.uniforms;
      hu.uHeadXf.value.set(pose.pivot.x, pose.pivot.y, pose.puppet ? head.rot * rig.forwardSign : 0, pose.puppet ? head.dy * a.h : 0);
      hu.uHeadSy.value = pose.puppet ? head.sy : 1;

      // Tint: room/story light multiplied by local warmth; the active speaker lifts a touch.
      const tint = context.actorTint || [1, 1, 1];
      const local = context.localTint ? context.localTint(name, a) : [1, 1, 1];
      tmpTint.setRGB(tint[0] * local[0], tint[1] * local[1], tint[2] * local[2]);
      rig.tint.lerp(tmpTint, reducedMotion ? 1 : 1 - Math.exp(-dt * 4));
      const wantLift = speaker ? (speaker === name ? 0.06 : -0.035) : 0;
      rig.lift += (wantLift - rig.lift) * (1 - Math.exp(-dt * 6));
      rig.bodyMesh.material.uniforms.uTint.value.copy(rig.tint);
      rig.bodyMesh.material.uniforms.uLift.value = rig.lift;
      rig.pop = Math.max(0, rig.pop - dt * 3.4);
    }
    const signature = Object.keys(actors).map(n => n + ':' + expression(n)).join('|');
    if (signature !== prior) { prior = signature; bindings.forEach(draw); }
    state.acting = Object.fromEntries(Object.keys(actors).map(name => [name, expression(name)]));
  }

  // Squash-and-settle for pose changes, plus breathing; applied by the runtime transform pass.
  function bodyScale(name, time) {
    const rig = actors[name].rig;
    const p = rig.pop;
    const popY = p > 0 ? 1 - 0.035 * Math.sin(p * Math.PI) * (p > 0.5 ? 1 : -0.6) : 1;
    const breath = reducedMotion ? 1 : 1 + Math.sin(time * 1.65 + rig.idleSeed) * 0.0055;
    return popY * breath;
  }

  // DOM portraits (strip busts, cut-ins, notebook, observe) share the same frames.
  const bindings = new Map();
  let prior = '';
  function crop(frame, kind) {
    const [l, t, r, b] = frame.rect, [hl, ht, hr, hb] = frame.head;
    if (kind === 'full') return frame.rect;
    if (kind === 'bust') {
      const w = hr - hl, h = hb - ht;
      return [Math.max(l, hl - w * 0.42), Math.max(t, ht - h * 0.06), Math.min(r, hr + w * 0.42), Math.min(b, hb + h * 1.35)];
    }
    return frame.head;
  }
  function draw(binding) {
    const { el, name, kind } = binding;
    const exp = binding.fixed || expression(name);
    const pose = poses[name][exp] || Object.values(poses[name])[0];
    const frame = pose.frame, sheet = pose.sheet;
    const [l, t, r, d] = crop(frame, kind);
    const w = el.clientWidth, h = el.clientHeight;
    if (!w || !h) return;
    const scale = kind === 'bust' ? Math.max(w / (r - l), h / (d - t)) : Math.min(w / (r - l), h / (d - t));
    const W = frame.width || sheet.width, H = frame.height || sheet.height;
    Object.assign(binding.crop.style, {
      width: `${(r - l) * scale}px`, height: `${(d - t) * scale}px`,
      left: `${(w - (r - l) * scale) / 2}px`, top: kind === 'bust' ? '0px' : `${(h - (d - t) * scale) / 2}px`,
      backgroundImage: `url("${frame.file || sheet.file}")`, backgroundSize: `${W * scale}px ${H * scale}px`,
      backgroundPosition: `${-l * scale}px ${-t * scale}px`, transform: frame.mirrorX ? 'scaleX(-1)' : 'none'
    });
    el.dataset.expression = exp;
    el.setAttribute('aria-label', `${actors[name].name}, ${exp}`);
  }
  const observer = new ResizeObserver(entries => entries.forEach(e => { const b = bindings.get(e.target); if (b) draw(b); }));
  function portrait(el, name, { full = false, bust = false, expression: fixed = null } = {}) {
    if (typeof el === 'string') el = document.getElementById(el);
    if (!el) return;
    let binding = bindings.get(el);
    if (!binding) {
      const cropEl = document.createElement('span');
      cropEl.className = 'portrait-region';
      cropEl.setAttribute('aria-hidden', 'true');
      el.append(cropEl);
      el.classList.add('acting-portrait');
      binding = { el, crop: cropEl };
      bindings.set(el, binding);
      observer.observe(el);
    }
    Object.assign(binding, { name, kind: full ? 'full' : bust ? 'bust' : 'head', fixed });
    draw(binding);
  }

  portrait('notes-portrait', 'aren');
  update({ dt: 1 });
  return { update, portrait, refresh: () => bindings.forEach(draw), hold, gesture, pop, setSpeaker, bodyScale, expression, poses };
}
