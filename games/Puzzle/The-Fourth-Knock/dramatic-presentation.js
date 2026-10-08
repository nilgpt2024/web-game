import * as THREE from 'three';
import { atmosphereStates, atmosphereAliases, restingAtmosphere, roomKeys } from './atmosphere9.js';
import { lineDirection, legacyModes } from './content/direction11.js';
import { clueArt, watchArt, matchArt } from './content/evidence11.js';
import { lockDiagram } from './locked-room9.js';

// Presentation only: the controllers own story progress. This module turns story state into
// light, grade, negative space, character tint, dialogue grammar, acting and framing.
const COLOURS = { aren: 'var(--c-aren)', mira: 'var(--c-mira)', ada: 'var(--c-ada)', elias: 'var(--c-elias)', victor: 'var(--c-victor)' };
const LETTERBOX_PHASES = ['opening', 'montage', 'knocks', 'ending-knocks', 'aha', 'case-payoff', 'residual'];
const LETTERBOX_MODES = ['gravity', 'plain', 'accuse', 'confront'];
const FRAMING = { talk: [0, 1.15, 0.03], aside: [-0.9, 0, 0.02], incidental: [0, 0.4, 0.02], interview: [0, 0.6, 0.02], confront: [0, 0.6, 0.03], gravity: [1.6, 0, 0.04], plain: [0, 0.9, 0.05], accuse: [-0.4, 0.9, 0.05] };
const NUM_KEYS = ['sky', 'fill', 'practical', 'range', 'exposure', 'zoom', 'motion', 'rain', 'fire', 'freeze'];
const LOOK_NUMS = ['exposure', 'sat', 'contrast', 'split', 'vignette', 'grain'];
const LOOK_VECS = ['lift', 'gain', 'shadowTint', 'highTint', 'vignetteColor', 'voidTop', 'voidBottom'];

export function createDramaticPresentation({ state, rooms, renderer, acting, audio, postfx, cameraDirector, actors, world }) {
  const $ = id => document.getElementById(id);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const baseExposure = renderer.toneMappingExposure, lights = [];
  for (const room of Object.values(rooms)) room.root.traverse(o => {
    if (!o.isLight || o.userData.lightKind === 'fire' || o.userData.lightKind === 'flash' || o.userData.managed) return;
    const kind = o.userData.lightKind || (o.isPointLight ? 'practical' : o.isHemisphereLight ? 'sky' : o.color.r > o.color.b ? 'fill' : 'sky');
    lights.push({ light: o, intensity: o.intensity, distance: o.distance, kind });
  });

  const clone = p => ({ ...p, look: { ...p.look, lift: [...p.look.lift], gain: [...p.look.gain], shadowTint: [...p.look.shadowTint], highTint: [...p.look.highTint], vignetteColor: [...p.look.vignetteColor], voidTop: [...p.look.voidTop], voidBottom: [...p.look.voidBottom] }, actor: [...p.actor] });
  let mood = 'arrival', rate = 2.6, live = clone(atmosphereStates.arrival);
  const overlay = { aside: 0, echo: 0, pulse: 0, fade: 0, fadeTarget: 0, fadeRate: 3, focus: 0, focusTarget: 0 };
  let focusPoint = null, focusRadius = 0.3;
  const focusVec = new THREE.Vector3();

  function atmosphere(name, { sound = true, speed } = {}) {
    name = atmosphereAliases[name] || name;
    if (!atmosphereStates[name]) throw Error('Unknown atmosphere ' + name);
    rate = speed || 2.6;
    if (mood === name && state.atmosphere === name) { if (sound) audio.setAtmosphere(name, state.room); return; }
    mood = name; state.atmosphere = name;
    (state.atmosphereHistory ??= []).push({ name, time: state.time, room: state.room });
    document.body.dataset.atmosphere = name;
    document.body.dataset.grade = atmosphereStates[name].grade;
    if (sound) audio.setAtmosphere(name, state.room);
  }
  function restore() { atmosphere(restingAtmosphere(state)); }

  function phase(value) {
    const body = document.body;
    body.dataset.phase = value;
    body.dataset.story = state.story;
    const dialogueMode = value === 'dialogue' ? state.presentationMode : null;
    body.dataset.letterbox = String(LETTERBOX_PHASES.includes(value) || !!state.directed || LETTERBOX_MODES.includes(dialogueMode));
    $('story-clock').hidden = value !== 'explore';
    document.querySelector('body > footer').inert = value !== 'explore';
    body.dataset.quietHud = String(value !== 'explore');
    if (value === 'explore') { cameraDirector.frame(0, 0, 0); acting.setSpeaker(null); state.presentationMode = null; state.pinSpeaker = null; }
    if (value !== 'dialogue') state.pinSpeaker = null;
    if (['topics', 'notes', 'clue', 'desk', 'observe', 'watch'].includes(value)) { cameraDirector.frame(0, 0, 0.02); acting.setSpeaker(null); }
  }

  // Exchange-level staging: the camera frames the pair once, so lines don't make it restless.
  function beginExchange(c) {
    const partner = actors[c.person];
    if (partner && partner.room === state.room && actors.aren.room === state.room && !c.noShot) {
      const midX = (partner.x + actors.aren.x) / 2, midZ = (partner.z + actors.aren.z) / 2;
      const spread = Math.hypot(partner.x - actors.aren.x, partner.z - actors.aren.z);
      cameraDirector.shot({ x: midX * 0.55, z: midZ * 0.55, zoom: spread < 3 ? 0.06 : 0.03, speed: 3 });
    }
    c.gravityFigure = null;
  }

  function figure(el, name, active) {
    if (!name) { el.hidden = true; return; }
    el.hidden = false;
    if (el.dataset.name !== name) { el.dataset.name = name; el.classList.remove('enter'); void el.offsetWidth; el.classList.add('enter'); }
    acting.portrait(el, name, { full: true });
    el.classList.toggle('active', active);
  }

  function evidenceInsert(kind) {
    const el = $('evidence-insert');
    if (!kind) { el.classList.remove('on'); return; }
    if (el.dataset.kind !== kind) {
      el.dataset.kind = kind;
      const art = kind === 'watch' ? watchArt : kind === 'match' ? matchArt : kind === 'latch' ? lockDiagram(3) : clueArt(kind === 'trace' ? 'thread' : kind);
      const caption = { watch: 'Stopped at 9:08', match: 'Torn edge · the same wiping streak', latch: 'Released · pulled shut · caught', trace: 'Scarf thread', document: "Dev Brann's letter", recorder: 'Empty recorder', bookend: 'Cleaned bookend' }[kind] || '';
      el.innerHTML = art + `<div class="ev-caption">${caption}</div>`;
      el.classList.remove('on'); void el.offsetWidth;
    }
    el.classList.add('on');
  }

  function applyDirection(line, c, d) {
    for (const [name, exp] of Object.entries(d.pose || {})) state.expressions[name] = exp;
    for (const [name, exp] of Object.entries(d.react || {})) state.expressions[name] = exp;
    for (const [name, attitude] of Object.entries(d.head || {})) acting.hold(name, attitude);
    for (const [name, kind] of Object.entries(d.gesture || {})) acting.gesture(name, kind);
    for (const [name, target] of Object.entries(d.look || {})) world.look(name, target);
  }

  function line(line, c) {
    const d = lineDirection[line.line_id] || {};
    let mode = d.mode || legacyModes[c.mode] || c.mode || 'talk';
    if (mode === 'incidental' && actors[line.speaker]?.room !== state.room) mode = 'talk';
    state.presentationMode = mode;
    state.lineVo = d.vo !== false;
    const panel = $('dialogue');
    panel.dataset.mode = mode;
    panel.style.setProperty('--pin', COLOURS[line.speaker] || 'var(--brass)');
    document.body.dataset.dialogueMode = mode;
    document.body.dataset.letterbox = String(LETTERBOX_MODES.includes(mode) || !!state.directed);
    state.expressions[line.speaker] = line.expression;
    applyDirection(line, c, d);
    const f = FRAMING[mode] || [0, 0, 0];
    cameraDirector.frame(f[0], f[1], f[2]);

    const left = $('conversation-aren'), right = $('conversation-other');
    if (mode === 'interview' || mode === 'confront') {
      const other = line.speaker !== 'aren' ? line.speaker : c.person;
      figure(left, 'aren', line.speaker === 'aren');
      figure(right, other, line.speaker !== 'aren');
    } else if (mode === 'gravity') {
      const holder = d.figure || (line.speaker !== 'aren' ? line.speaker : c.gravityFigure || c.person);
      c.gravityFigure = holder;
      left.hidden = true;
      figure(right, holder, line.speaker === holder);
    } else { left.hidden = true; right.hidden = true; }
    evidenceInsert(['confront', 'accuse'].includes(mode) ? d.evidence : null);
    const inRoom = actors[line.speaker]?.room === state.room;
    acting.setSpeaker(['talk', 'incidental', 'accuse'].includes(mode) && inRoom ? line.speaker : null);
    state.pinSpeaker = ['talk', 'incidental'].includes(mode) && inRoom ? line.speaker : null;
    state.activeSpeaker = line.speaker;
    panel.dataset.speaker = line.speaker;
    panel.classList.remove('line-arrives'); void panel.offsetWidth; panel.classList.add('line-arrives');

    const base = { gravity: [.42, .7], plain: [.5, .8], accuse: [.36, .6], aside: [.3, .32], incidental: [.22, .48], confront: [.28, .45], interview: [.18, .34], talk: [.16, .32] }[mode] || [.16, .32];
    return { pre: base[0] + (d.pre || 0), post: base[1] + (d.hold || 0) };
  }

  function endExchange() { evidenceInsert(null); $('conversation-aren').hidden = $('conversation-other').hidden = true; }

  // Kept for compatibility with earlier callers; the Four Knocks choreography lives in the controller.
  function reaction(number) { state.reactionAt = state.time; state.reactionNumber = number; }
  function pulse(amount = 1) { overlay.pulse = Math.max(overlay.pulse, amount); }
  function fade(target, seconds = 0.5) {
    overlay.fadeTarget = target; overlay.fadeRate = seconds > 0 ? 1 / seconds : 999;
    return new Promise(resolve => {
      const check = () => Math.abs(overlay.fade - target) < 0.02 ? resolve() : requestAnimationFrame(check);
      check();
    });
  }
  function focus(point, radius = 0.3, amount = 0.6) { focusPoint = point; focusRadius = radius; overlay.focusTarget = point ? amount : 0; }

  function update(dt) {
    const target = atmosphereStates[mood], key = roomKeys[state.room] || roomKeys.lounge;
    const k = reduced ? 1 : 1 - Math.exp(-dt * rate);
    for (const n of NUM_KEYS) live[n] += (target[n] - live[n]) * k;
    for (let i = 0; i < 3; i++) live.actor[i] += (target.actor[i] * key.actor[i] - live.actor[i]) * k;
    for (const n of LOOK_NUMS) live.look[n] += ((n === 'split' ? Math.max(target.look.split, key.look.split || 0) : target.look[n]) - live.look[n]) * k;
    for (const n of LOOK_VECS) for (let i = 0; i < 3; i++) {
      const add = (n === 'shadowTint' || n === 'highTint') && key.look[n] ? key.look[n][i] * 0.6 : 0;
      live.look[n][i] += (target.look[n][i] + add - live.look[n][i]) * k;
    }
    for (const b of lights) {
      b.light.intensity = b.intensity * (live[b.kind] ?? 1) * (b.light.userData.dim ?? 1);
      if (b.light.isPointLight && b.distance) b.light.distance = b.distance * live.range;
    }
    renderer.toneMappingExposure = baseExposure * live.exposure;

    const asideTarget = state.phase === 'dialogue' && state.presentationMode === 'aside' ? 1 : 0;
    const echoTarget = mood === 'residual' ? 1 : 0;
    const e = reduced ? 1 : 1 - Math.exp(-dt * 3.2);
    overlay.aside += (asideTarget - overlay.aside) * e;
    overlay.echo += (echoTarget - overlay.echo) * (reduced ? 1 : 1 - Math.exp(-dt * 1.6));
    overlay.pulse = Math.max(0, overlay.pulse - dt * 1.9);
    overlay.fade += Math.sign(overlay.fadeTarget - overlay.fade) * Math.min(Math.abs(overlay.fadeTarget - overlay.fade), dt * overlay.fadeRate);
    overlay.focus += (overlay.focusTarget - overlay.focus) * (reduced ? 1 : 1 - Math.exp(-dt * 2.4));
    postfx.apply(live.look);
    postfx.set('uAside', overlay.aside);
    postfx.set('uEcho', overlay.echo);
    postfx.set('uPulse', overlay.pulse);
    postfx.set('uFade', overlay.fade);
    postfx.set('uBreath', mood === 'four_knocks' || mood === 'confession_silence' ? 1 : 0);
    if (focusPoint && overlay.focus > 0.001) {
      const p = world.screenPoint(focusPoint.x, focusPoint.y ?? 1.2, focusPoint.z);
      postfx.setFocus(p.x / innerWidth, 1 - p.y / innerHeight, focusRadius, overlay.focus);
    } else postfx.setFocus(0.5, 0.5, focusRadius, 0);
    const still = live.motion < 0.25;
    return { zoom: live.zoom, motion: live.motion, rain: live.rain, practical: live.practical, still, freeze: Math.min(1, Math.max(0, live.freeze)), fire: live.fire, actorTint: live.actor, echo: overlay.echo, reaction: state.reactionAt ? Math.max(0, 1 - (state.time - state.reactionAt) / 0.65) : 0 };
  }

  atmosphere('lounge', { sound: false });
  return {
    atmosphere, restore, phase, line, beginExchange, endExchange, reaction, pulse, fade, focus, update,
    get mood() { return mood; },
    diagnostics: () => ({ mood, live: { ...live, look: { ...live.look } }, overlay: { ...overlay }, lights: lights.filter(b => b.light.parent?.visible !== false).map(b => ({ kind: b.kind, intensity: b.light.intensity, baseIntensity: b.intensity })) })
  };
}
