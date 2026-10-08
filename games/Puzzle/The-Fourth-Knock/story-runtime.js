import * as THREE from 'three';
import { dressRooms } from './environment81.js';
import { buildUpperRooms } from './upper-rooms.js';
import { createCastActing } from './cast-performance.js';
import { createNarrativeAudio } from './narrative-audio.js';
import { createStoryController } from './story-controller.js';
import { createDramaticPresentation } from './dramatic-presentation.js';
import { createPostFX } from './render/postfx.js';
import { createCameraDirector } from './render/camera-director.js';
import { createLife } from './world/life.js';
import { createEchoes } from './world/echoes.js';
import { createPassages } from './world/passage12.js';
import { createOpening13 } from './world/opening13.js';
import { createOpening2D } from './world/opening2d.js';
import { timeScale, devMode, clamp } from './core/timing.js';

// Each character moves like themselves (master 3.x): Aren waddles, Mira is quick and light,
// Ada's shell gives a bounce, Elias barely sways, Victor expects the room to move around him.
const WALK = {
  aren: { speed: 2.1, bob: .043, sway: .03, freq: 10 },
  mira: { speed: 2.35, bob: .03, sway: .018, freq: 12 },
  ada: { speed: 1.95, bob: .046, sway: .02, freq: 11 },
  elias: { speed: 1.95, bob: .02, sway: .008, freq: 9 },
  victor: { speed: 1.75, bob: .018, sway: .01, freq: 8 }
};
// Named eyeline targets per room.
const LOOK_POINTS = {
  lounge: { stairs: { x: 5.05, z: -4.6 }, door: { x: -6.4, z: 4.22 }, fire: { x: .05, z: -4.5 }, phone: { x: 5.5, z: 2.2 } },
  corridor: { stairs: { x: -4.7, z: 2.6 }, door: { x: 1.55, z: -2.9 } },
  victor: { body: { x: .45, z: .35 }, door: { x: -4.6, z: 4.4 }, desk: { x: -3.2, z: -2.6 } },
  veranda: { door: { x: 1.55, z: -2.4 } }
};
const screenX = (dx, dz) => dx * .83844 - dz * .54499;
const screenUp = (dx, dz) => -(dx * .54499 + dz * .83844);

export async function runStep7(options) { return runGame(options); }

export async function runGame({ scene, camera, renderer, loungeRoot, materials, canvasTexture, rainMat, rainUniforms, fireLight, actors, rearMap, collisions, anchors, flameLevel, kit, loungeArch, hero }) {
  const $ = id => document.getElementById(id), V = (x, y, z) => new THREE.Vector3(x, y, z), aren = actors.aren;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const upper = await buildUpperRooms({ materials, rainMat, canvasTexture, kit, hero });
  const rooms = { lounge: { root: loungeRoot, collisions, bounds: { minX: -6.25, maxX: 6.34, minZ: -4.97, maxZ: 5.35 }, viewH: 12.85, viewW: 21.3 }, ...upper };
  const dressing = dressRooms({ rooms, materials, rainMat, canvasTexture, kit, loungeArch, hero });
  for (const [name, r] of Object.entries(rooms)) if (name !== 'lounge') { scene.add(r.root); r.root.visible = false; }
  for (const a of Object.values(actors)) Object.assign(a, { room: 'lounge', y: 0, moving: false, facing: 'front-left' });
  const state = { phase: 'intro', room: 'lounge', time: 0, envTime: 0, beatAt: 0, facing: 'front-right', steps: 0, movedDistance: 0, rearView: {}, rainDip: 1 };
  const keys = new Set(), routes = new Map();
  let lastTime = performance.now(), walkClock = 0;
  const cameraDirector = createCameraDirector({ camera, reducedMotion });

  function resize() {
    const r = rooms[state.room], aspect = innerWidth / innerHeight, viewH = Math.max(r.viewH, r.viewW / aspect);
    Object.assign(camera, { left: -viewH * aspect / 2, right: viewH * aspect / 2, top: viewH / 2, bottom: -viewH / 2, near: .1, far: 80 });
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  }
  addEventListener('resize', resize); resize();

  function place(name, x, z, room = state.room, y = 0) {
    const a = actors[name];
    Object.assign(a, { x, z, room, y, moving: false });
    a.mesh.position.set(x, y + .072, z); a.shadow.position.set(x, y + .079, z);
  }
  function setFacing(name, dx, dz, allowBack, forceBack = false) {
    const a = actors[name], sx = screenX(dx, dz), up = screenUp(dx, dz);
    const back = (forceBack || (allowBack && up > Math.abs(sx) * .55)) && (name === 'aren' || name === 'elias');
    a.facing = (back ? 'back-' : 'front-') + (sx < 0 ? 'left' : 'right');
    if (name === 'aren') state.facing = a.facing;
    state.rearView[name] = back;
  }
  // Step 15: staged walks keep every authored waypoint, but a floor-level leg that would pass through furniture
  // (a straight line from wherever someone happens to stand, e.g. Aren following Mira out past the armchair and
  // lamp table) is routed around it: A* over a 10 cm grid of the room's floor and colliders, then pulled straight.
  // The first and last 35 cm of a leg are exempt, so deliberate close approaches (a hand on the table, kneeling
  // by Victor) stay exactly as authored. Stairs (y > 0) and thresholds beyond the room's bounds are untouched.
  function detour(roomName, from, to) {
    const room = rooms[roomName], b = room?.bounds;
    if (!b) return [];
    const r = .26, cell = .1, solid = room.collisions.filter(c => !/stair/i.test(c.label || ''));
    const hit = (x, z) => x < b.minX + .02 || x > b.maxX - .02 || z < b.minZ + .02 || z > b.maxZ - .02 ||
      solid.some(c => x > c.minX - r && x < c.maxX + r && z > c.minZ - r && z < c.maxZ + r);
    const clear = (p, q, ends = .35) => {
      const len = Math.hypot(q.x - p.x, q.z - p.z), n = Math.ceil(len / .05);
      for (let i = 1; i < n; i++) {
        const t = i / n, along = t * len;
        if (along < ends || len - along < ends) continue;
        if (hit(p.x + (q.x - p.x) * t, p.z + (q.z - p.z) * t)) return false;
      }
      return true;
    };
    if (clear(from, to)) return [];
    const W = Math.floor((b.maxX - b.minX) / cell) + 1, H = Math.floor((b.maxZ - b.minZ) / cell) + 1;
    const cellOf = p => [Math.round((p.x - b.minX) / cell), Math.round((p.z - b.minZ) / cell)];
    const [si, sj] = cellOf(from), [ti, tj] = cellOf(to);
    if (si < 0 || sj < 0 || si >= W || sj >= H || ti < 0 || tj < 0 || ti >= W || tj >= H) return [];
    const free = new Uint8Array(W * H);
    for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
      const x = b.minX + i * cell, z = b.minZ + j * cell;
      free[j * W + i] = !hit(x, z) || Math.hypot(x - from.x, z - from.z) < .4 || Math.hypot(x - to.x, z - to.z) < .4 ? 1 : 0;
    }
    const g = new Float32Array(W * H).fill(Infinity), came = new Int32Array(W * H).fill(-1), heap = [];
    const push = (k, f) => { heap.push([f, k]); let i = heap.length - 1; while (i > 0) { const pa = (i - 1) >> 1; if (heap[pa][0] <= heap[i][0]) break; [heap[pa], heap[i]] = [heap[i], heap[pa]]; i = pa; } };
    const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { heap[0] = last; let i = 0; for (;;) { const l = 2 * i + 1, rr = l + 1; let m = i; if (l < heap.length && heap[l][0] < heap[m][0]) m = l; if (rr < heap.length && heap[rr][0] < heap[m][0]) m = rr; if (m === i) break; [heap[m], heap[i]] = [heap[i], heap[m]]; i = m; } } return top; };
    const start = sj * W + si, goal = tj * W + ti;
    g[start] = 0; push(start, Math.hypot(ti - si, tj - sj));
    while (heap.length) {
      const [, k] = pop(); if (k === goal) break;
      const i = k % W, j = (k / W) | 0;
      for (const [di, dj, c] of [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1, 1, 1.414], [1, -1, 1.414], [-1, 1, 1.414], [-1, -1, 1.414]]) {
        const ni = i + di, nj = j + dj; if (ni < 0 || nj < 0 || ni >= W || nj >= H) continue;
        const nk = nj * W + ni; if (!free[nk]) continue;
        const ng = g[k] + c; if (ng >= g[nk]) continue;
        g[nk] = ng; came[nk] = k; push(nk, ng + Math.hypot(ti - ni, tj - nj));
      }
    }
    if (came[goal] < 0) return [];
    const cells = []; for (let k = goal; k !== start; k = came[k]) cells.unshift(k);
    const pts = cells.map(k => ({ x: b.minX + (k % W) * cell, z: b.minZ + ((k / W) | 0) * cell }));
    pts[pts.length - 1] = { x: to.x, z: to.z };
    const out = []; let anchor = from, k = 0;
    while (k < pts.length - 1) {                                   // pull the grid path straight
      let far = k;
      for (let m = pts.length - 1; m > k; m--) if (clear(anchor, pts[m], 0)) { far = m; break; }
      if (far === k) far = k + 1;                                  // always advance along the grid path
      if (far >= pts.length - 1) break;
      out.push(pts[far]); anchor = pts[far]; k = far;
    }
    return out.map(p => ({ x: +p.x.toFixed(3), z: +p.z.toFixed(3), y: 0 }));
  }
  const projected = new THREE.Vector3();
  function screenPoint(p) { projected.copy(p).project(camera); return { x: (projected.x * .5 + .5) * innerWidth, y: (-.5 * projected.y + .5) * innerHeight }; }

  const world = {
    place,
    face(name, toward) { const a = actors[name], b = actors[toward]; if (!a || !b || a === b || a.room !== b.room) return; setFacing(name, b.x - a.x, b.z - a.z, false); },
    // `back` turns Aren (or Elias) fully away from the camera toward the target.
    look(name, target, { back = false } = {}) {
      const a = actors[name]; if (!a) return;
      if (target === 'clear') { state.rearView[name] = false; return; }
      const p = actors[target] ? (actors[target].room === a.room ? actors[target] : null) : typeof target === 'object' ? target : LOOK_POINTS[a.room]?.[target];
      if (p) setFacing(name, p.x - a.x, p.z - a.z, true, back);
    },
    switchRoom(name, positions = {}) {
      keys.clear(); state.room = name; state.roomEnteredAt = state.time;
      for (const [n, r] of Object.entries(rooms)) r.root.visible = n === name;
      cameraDirector.setRoomCenter(rooms[name].center);
      for (const [n, p] of Object.entries(positions)) place(n, p[0], p[1], name, p[2] || 0);
      resize();
    },
    walk(name, points, { roomAfter, speed } = {}) {
      if (routes.has(name)) { routes.get(name).resolve(); routes.delete(name); }
      const a = actors[name], planned = [];
      let prev = { x: a.x, z: a.z, y: a.y || 0 };
      for (const p0 of points) {
        const p = { ...p0, y: p0.y || 0 };
        if (!prev.y && !p.y) planned.push(...detour(a.room, prev, p));
        planned.push(p); prev = p;
      }
      const r = { points: planned, roomAfter, speed };
      r.promise = new Promise(resolve => r.resolve = resolve);
      routes.set(name, r); actors[name].moving = true;
      return r.promise;
    },
    waitFor(name) { return routes.get(name)?.promise || Promise.resolve(); },
    // Victor's door opens into his room, on its west hinge (Step 12 architecture map §4).
    door(open, { animate = false } = {}) {
      const c = upper.corridor;
      if (open) { c.brokenStrike.visible = true; c.doorBeyond.visible = true; }
      const target = open ? c.doorPivot.userData.open(c.doorOpen) : 0;
      const done = () => { if (!open) c.doorBeyond.visible = false; };
      if (animate) return life.swing(c.doorPivot, target, .55).then(done);
      c.doorPivot.rotation.y = target; done(); return Promise.resolve();
    },
    sealDoor() { upper.corridor.seal.visible = true; },
    // Walkable test for authored marks (room bounds, furniture, other people).
    free(x, z, ignore = []) {
      const r = .32, b = rooms[state.room].bounds;
      if (x < b.minX + r || x > b.maxX - r || z < b.minZ + r || z > b.maxZ - r) return false;
      if (rooms[state.room].collisions.some(c => x > c.minX - r && x < c.maxX + r && z > c.minZ - r && z < c.maxZ + r)) return false;
      return !Object.entries(actors).some(([n, a]) => n !== 'aren' && !ignore.includes(n) && a.room === state.room && Math.hypot(x - a.x, z - a.z) < .8);
    },
    screenPoint(x, y, z) { return screenPoint(V(x, y, z)); },
    head(name) { const a = actors[name]; return { x: a.x, y: a.y + a.h / .837 * 1.02, z: a.z }; },
    clearRear() { state.rearView = {}; },
    points: LOOK_POINTS
  };

  function blocked(x, z) {
    const r = .28, b = rooms[state.room].bounds;
    if (x < b.minX || x > b.maxX || z < b.minZ || z > b.maxZ) return true;
    return rooms[state.room].collisions.some(c => x > c.minX - r && x < c.maxX + r && z > c.minZ - r && z < c.maxZ + r) ||
      Object.entries(actors).some(([n, a]) => n !== 'aren' && a.room === state.room && Math.hypot(x - a.x, z - a.z) < .6);
  }

  const audio = await createNarrativeAudio();
  state.expressions = { aren: 'neutral', mira: 'curious', ada: 'practical', elias: 'calm' };
  const acting = await createCastActing({ actors, state, rearMap, reducedMotion });
  const postfx = createPostFX(renderer);
  anchors.roomGlows = {
    corridor: [...[.05, 3.5].map(x => ({ x, y: 2.45, z: -2.95, size: 1.1 })), { x: -3.9, y: 1.52, z: -2.9, size: 1.2 }],
    victor: [{ x: 5.05, y: 1.56, z: -3.12, size: 1.2 }, { x: -4.55, y: 2.12, z: -2.68, size: 1.3 }],
    veranda: [.16, 2.9].map(x => ({ x, y: 2.42, z: -2.34, size: 1.7, color: '#ffcf85', strength: .6, kind: 'lantern' }))
  };
  const life = createLife({ rooms, anchors, fireLight, rainUniforms, flameLevel, state, reducedMotion });
  const echoes = createEchoes({ upper, rooms });
  const presentation = createDramaticPresentation({ state, rooms, renderer, acting, audio, postfx, cameraDirector, actors, world });
  world.passage = createPassages({ world, rooms, life, presentation, camera: cameraDirector, audio, state, actors });
  // The opening: the 2D illustrated intro, which enters the game through the Step 13 3D handoff (Step 13C),
  // or the whole Step 13 3D opening (?opening=3d, kept as the fallback).
  const use2D = new URLSearchParams(location.search).get('opening') !== '3d';
  const opening13 = createOpening13({ scene, renderer, rooms, M: materials, kit, canvasTexture, rainMat, rainUniforms, actors, state, world, ortho: camera, acting });
  world.opening = use2D ? createOpening2D({ scene, renderer, rooms, actors, state, world, ortho: camera, handoff3d: opening13 }) : opening13;
  const story = createStoryController({ state, keys, actors, world, acting, audio, presentation, camera: cameraDirector, life, echoes, rooms, dressing, upper });

  addEventListener('keydown', e => {
    if (story.handleKey(e)) return;
    if (state.phase !== 'explore') return;
    const k = e.key.toLowerCase();
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) e.preventDefault();
    keys.add(k);
  });
  addEventListener('keyup', e => keys.delete(e.key.toLowerCase()));
  addEventListener('blur', () => keys.clear());
  document.addEventListener('visibilitychange', () => { keys.clear(); document.hidden ? audio.pause() : audio.resume(); });
  $('scene').addEventListener('pointerdown', () => { if (state.phase === 'explore') $('scene').focus(); });

  const right = V(1, 0, 0).applyQuaternion(camera.quaternion); right.y = 0; right.normalize();
  const up = V(0, 1, 0).applyQuaternion(camera.quaternion); up.y = 0; up.normalize();
  const metrics = { frames: 0, frameTimes: [], drawCalls: 0, triangles: 0 };
  const Z_AXIS = V(0, 0, 1), tmpQ = new THREE.Quaternion();

  function beyondThreshold(a) {
    if (a.room === 'lounge') return Math.max(clamp((-6.9 - a.x) / .9), clamp((-5.7 - a.z) / 1.1));
    if (a.room === 'corridor') return Math.max(clamp((-3.4 - a.z) / .8), clamp(-a.y / 1.3));
    if (a.room === 'victor') return clamp((a.z - 4.62) / .7);
    if (a.room === 'veranda') return clamp((-2.62 - a.z) / 1.1) * .5;
    return 0;
  }
  // Local light on the cutouts: the hearth warms, the rain windows cool, lanterns and lamps glow.
  function localTint(name, a) {
    let r = 1, g = 1, b = 1;
    if (a.room === 'lounge') {
      const w = clamp(1 - Math.hypot(a.x - .05, a.z + 4.3) / 4.6) * (state.fireLevel ?? 1);
      r += .08 * w; g += .025 * w; b -= .06 * w;
      const c = clamp((-a.x - 4.1) / 2.2);
      r -= .05 * c; b += .05 * c;
    } else if (a.room === 'veranda') {
      const w = Math.max(clamp(1 - Math.hypot(a.x - .16, a.z + 2.0) / 2.8), clamp(1 - Math.hypot(a.x - 2.9, a.z + 2.0) / 2.8));
      r += .12 * w; g += .06 * w; b -= .08 * w;
    } else if (a.room === 'victor') {
      const w = clamp(1 - Math.hypot(a.x + 4.4, a.z + 2.6) / 3.5);
      r += .07 * w; g += .03 * w; b -= .04 * w;
    }
    // In the opening Aren carries the shot's own light (the coach door, a passing signal, the garden).
    if (state.liveOpening && name === 'aren') { const lit = world.opening.arenTint(); if (lit) return lit; }
    // Beyond a doorway the house is darker (Step 12): whoever steps through fades into it.
    const d = beyondThreshold(a);
    if (d > 0) { r *= 1 - .72 * d; g *= 1 - .72 * d; b *= 1 - .66 * d; }
    return [r, g, b];
  }

  // In-world overlays placed each frame.
  const nameplate = $('nameplate'), examine = $('examine'), pin = $('speaker-pin'), markersEl = $('markers'), knockMarks = $('knock-marks');
  let examineSignature = '';
  const markerEls = [];
  function overlays() {
    const exploring = state.phase === 'explore';
    if (exploring) { const p = screenPoint(V(aren.x, .04, aren.z)); nameplate.style.left = p.x + 'px'; nameplate.style.top = p.y + 9 + 'px'; }
    nameplate.hidden = !exploring || state.hideNameplate;
    const target = story.target();
    examine.hidden = !target;
    if (target) {
      const p = screenPoint(V(target.x, target.y ?? 2.25, target.z));
      examine.style.left = clamp(p.x, 150, innerWidth - 150) + 'px';
      examine.style.top = clamp(p.y, 150, innerHeight - 110) + 'px';
      const signature = target.label + target.detail;
      if (examineSignature !== signature) {
        examineSignature = signature;
        examine.innerHTML = '<kbd>E</kbd><span></span>';
        examine.children[1].textContent = target.label;
        const small = document.createElement('small'); small.textContent = target.detail; examine.children[1].append(small);
      }
    } else examineSignature = '';
    const markers = exploring ? story.markers() : [];
    while (markerEls.length < markers.length) { const m = document.createElement('i'); m.className = 'marker'; markersEl.append(m); markerEls.push(m); }
    markerEls.forEach((el, i) => {
      const m = markers[i];
      el.hidden = !m;
      if (!m) return;
      const p = screenPoint(V(m.x, m.y ?? .9, m.z));
      el.style.left = p.x + 'px'; el.style.top = p.y + 'px';
      el.classList.toggle('done', !!m.done);
    });
    const speaker = state.phase === 'dialogue' && state.pinSpeaker ? actors[state.pinSpeaker] : null;
    pin.classList.toggle('on', !!speaker && speaker.room === state.room && state.presentationMode === 'talk');
    if (speaker) {
      const h = world.head(state.pinSpeaker), p = screenPoint(V(h.x, h.y + .12, h.z));
      pin.style.left = p.x + 'px'; pin.style.top = p.y + 'px';
      pin.style.setProperty('--pin', `var(--c-${state.pinSpeaker})`);
      if (state.presentationMode === 'incidental') {
        const shell = document.querySelector('#dialogue .dialogue-shell');
        shell.style.left = clamp(p.x, 220, innerWidth - 220) + 'px';
        shell.style.top = clamp(p.y - 18, 190, innerHeight - 40) + 'px';
      }
    }
    if (state.presentationMode !== 'incidental') { const shell = document.querySelector('#dialogue .dialogue-shell'); if (shell.style.top) { shell.style.left = ''; shell.style.top = ''; } }
    if (state.knockAnchor) {
      const k = state.knockAnchor, p = screenPoint(V(k.x, k.y, k.z));
      knockMarks.style.left = p.x + 'px'; knockMarks.style.top = p.y + 'px';
    }
  }

  function animate(now) {
    const raw = (now - lastTime) / 1000; lastTime = now;
    const dt = Math.min(raw, .045) * timeScale;
    if (!document.hidden) state.time += dt;
    const mood = presentation.update(dt);
    state.fireLevel = mood.fire;
    state.envTime += dt * (1 - mood.freeze);
    rainUniforms.time.value = state.envTime;
    rainUniforms.dawn.value = THREE.MathUtils.damp(rainUniforms.dawn.value, state.story === 'dawn' || state.completed ? 1 : 0, 1, dt);
    rainUniforms.intensity.value = mood.rain * state.rainDip;
    state.rainDip += (1 - state.rainDip) * (1 - Math.exp(-dt * 2.2));

    const sx = (keys.has('d') || keys.has('arrowright') ? 1 : 0) - (keys.has('a') || keys.has('arrowleft') ? 1 : 0);
    const sy = (keys.has('w') || keys.has('arrowup') ? 1 : 0) - (keys.has('s') || keys.has('arrowdown') ? 1 : 0);
    let walking = !!(sx || sy) && state.phase === 'explore';
    if (walking) {
      const dir = right.clone().multiplyScalar(sx).addScaledVector(up, sy).normalize();
      const dx = dir.x * 2.45 * dt, dz = dir.z * 2.45 * dt, oldX = aren.x, oldZ = aren.z;
      if (!blocked(aren.x + dx, aren.z)) aren.x += dx;
      if (!blocked(aren.x, aren.z + dz)) aren.z += dz;
      state.movedDistance += Math.hypot(aren.x - oldX, aren.z - oldZ);
      walking = oldX !== aren.x || oldZ !== aren.z;
      const away = sy > 0 || (sy === 0 && state.facing.startsWith('back')), left = sx < 0 || (sx === 0 && state.facing.endsWith('left'));
      state.facing = (away ? 'back-' : 'front-') + (left ? 'left' : 'right');
      if (walking) {
        walkClock += dt * 10;
        if (Math.floor(walkClock / Math.PI) > state.steps) {
          state.steps = Math.floor(walkClock / Math.PI);
          audio.effect(state.room === 'veranda' ? 'sfx_walk_stone' : 'sfx_stairs_footsteps', { gain: state.room === 'lounge' ? .09 : .13, pan: (state.steps % 2 ? 1 : -1) * .15 });
        }
      }
    }
    for (const [name, r] of routes) {
      const a = actors[name], p = r.points[0], dx = p.x - a.x, dz = p.z - a.z, dy = p.y - a.y, d = Math.hypot(dx, dz, dy);
      const step = dt * (r.speed || (state.phase === 'montage' ? 2.7 : WALK[name].speed));
      if (a.room === state.room && Math.floor(state.time * 3) !== a.lastStep) { a.lastStep = Math.floor(state.time * 3); audio.effect(state.room === 'veranda' ? 'sfx_walk_stone' : 'sfx_stairs_footsteps', { gain: .09, pan: Math.max(-.5, Math.min(.5, a.x / 12)) }); }
      if (Math.hypot(dx, dz) > .01) {
        const back = screenUp(dx, dz) > Math.abs(screenX(dx, dz)) * .55;
        a.facing = (back ? 'back-' : 'front-') + (screenX(dx, dz) < 0 ? 'left' : 'right');
        if (name === 'aren') { state.facing = a.facing; state.rearView.aren = back; }
      }
      if (d <= step) {
        a.x = p.x; a.z = p.z; a.y = p.y; r.points.shift();
        if (!r.points.length) { a.moving = false; if (r.roomAfter) a.room = r.roomAfter; if (name === 'aren') state.rearView.aren = false; routes.delete(name); r.resolve(); }
      } else { a.x += dx / d * step; a.z += dz / d * step; a.y += dy / d * step; }
    }

    story.update();
    acting.update({ dt, time: state.time, still: mood.still, actorTint: mood.actorTint, localTint });
    for (const [name, a] of Object.entries(actors)) {
      const visible = a.room === state.room;
      a.mesh.visible = a.shadow.visible = visible;
      if (!visible) continue;
      const style = WALK[name];
      const moving = name === 'aren' ? (walking || a.moving) : a.moving;
      const t = name === 'aren' && walking ? walkClock : state.time * style.freq + a.phase;
      const bob = moving && !reducedMotion ? Math.abs(Math.sin(t)) * style.bob : 0;
      const sway = reducedMotion ? 0 : moving ? Math.sin(t) * style.sway : mood.still ? 0 : Math.sin(state.time * 1.15 + a.phase) * .004;
      const g = state.gesture?.name === name && ['camera', 'papers'].includes(state.gesture.kind) ? Math.max(0, 1 - (state.time - state.gesture.at) / 1.1) : 0;
      const tilt = reducedMotion ? 0 : Math.sin(g * Math.PI) * .035;
      a.mesh.position.set(a.x, a.y + .072 + bob + (reducedMotion ? 0 : mood.reaction * .02), a.z);
      a.mesh.quaternion.copy(a.baseQ).multiply(tmpQ.setFromAxisAngle(Z_AXIS, sway + tilt));
      a.mesh.scale.y = acting.bodyScale(name, state.time);
      a.shadow.position.set(a.x, a.y + .079, a.z);
      a.shadow.scale.setScalar(1 - bob * .8);
    }
    life.update(dt, state.envTime, mood);
    echoes.update(dt);
    dressing.update(state.envTime, reducedMotion, mood.still, mood.motion, aren);
    cameraDirector.update(dt, mood.zoom, state.time);
    world.opening.update(dt, state.envTime);
    overlays();
    $('room-label').textContent = { veranda: 'COVERED VERANDA', victor: 'VICTOR’S ROOM', corridor: 'UPPER CORRIDOR' }[state.room] || 'LOUNGE';
    // An illustrated opening shot covers the frame: the 3D world need not be drawn under it.
    if (!world.opening.opaque) postfx.render(scene, state.liveOpening ? world.opening.camera : camera, state.time);
    world.opening.afterRender?.(renderer.domElement);
    metrics.frames++;
    if (raw < .2 && metrics.frames > 60) { metrics.frameTimes.push(raw * 1000); if (metrics.frameTimes.length > 600) metrics.frameTimes.shift(); }
    metrics.drawCalls = renderer.info.render.calls; metrics.triangles = renderer.info.render.triangles;
    requestAnimationFrame(animate);
  }
  $('loading').hidden = true;
  requestAnimationFrame(animate);
  renderer.domElement.addEventListener('webglcontextlost', e => { e.preventDefault(); $('loading').textContent = 'The graphics context was interrupted. Reload to reopen Cedar House.'; $('loading').hidden = false; });

  // Inspection is read-only. Capture hooks record output; they cannot advance the story.
  window.proof = {
    getState: () => structuredClone({ ...state, x: aren.x, z: aren.z, target: story.target(), cameraZoom: camera.zoom, actors: Object.fromEntries(Object.entries(actors).map(([n, a]) => [n, { x: a.x, z: a.z, y: a.y, room: a.room, moving: a.moving, facing: a.facing }])) }),
    getMetrics: () => { const s = [...metrics.frameTimes].sort((a, b) => a - b); return { frames: metrics.frames, averageFps: Math.round(1000 / (s.reduce((a, b) => a + b, 0) / s.length)), medianMs: s[Math.floor(s.length * .5)], p95Ms: s[Math.floor(s.length * .95)], drawCalls: metrics.drawCalls, triangles: metrics.triangles, pixelRatio: renderer.getPixelRatio() }; },
    getAudio: audio.diagnostics,
    getPresentation: () => ({ atmosphere: presentation.diagnostics(), body: { ...upper.victor.body.userData.presentation } }),
    beginAudioCapture: audio.beginCapture, endAudioCapture: audio.endCapture, drainAudioCapture: audio.drainCapture,
    worldToScreen: (x, y, z) => screenPoint(V(x, y, z)),
    getColliders: () => structuredClone(rooms[state.room].collisions),
    scope: { rooms: ['Cedar House lounge', 'Upper corridor', 'Victor’s room', 'Covered veranda'], environmentalMotion: dressing.counts, actors: ['Aren Vale', 'Mira Senn', 'Ada Moss', 'Elias Brann', 'Victor Soren'], caseNotes: 4, ending: 'Four knocks from the sealed room; silence, black, title.' }
  };
  if (devMode) window.__opening = { scrub: (i, t) => world.opening.scrub(i, t), peek: (p, l, f) => world.opening.peek(p, l, f), clock: () => world.opening.clock() };   // review stills (dev only)
  if (devMode) window.__devRooms = rooms;   // collision/staging review (dev only)
  if (devMode) window.__devView = { camera, acting, actors, state, world };   // Step 15 visual QA probes (dev only)
  const devStage = devMode && new URLSearchParams(location.search).get('stage');
  if (devStage) import('./dev/stage12.js').then(m => m.startStage({ state, world, actors, presentation, camera: cameraDirector, stage: devStage, rooms })).catch(error => console.warn('Dev stage unavailable', error));
  else if (devMode) import('./dev/harness.js').then(m => m.startHarness({ state, story, world, actors })).catch(error => console.warn('Dev harness unavailable', error));
}
