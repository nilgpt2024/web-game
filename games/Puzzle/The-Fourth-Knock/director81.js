import { lines81 } from './content/directing81.js';
import { openingV13, openingHandoff13 } from './content/step13.js';
import { wait, timeScale } from './core/timing.js';

// Authored blocking, camera and staging. Evidence, deductions and truth stay in the controllers;
// this module only decides where people stand, where they look and what the camera holds.
const CAST = ['aren', 'mira', 'ada', 'elias', 'victor'];
// The main stair rises north along the lounge's east wall and passes through the north wall to the
// floor above (Step 12 architecture map §4): people climb out of sight behind the wall.
const STAIR_FOOT = { x: 5.05, z: -.55 }, STAIR_TOP = { x: 5.05, z: -4.6, y: 3 }, STAIR_HEAD = { x: 5.05, z: -6.6, y: 4.3 };

export function createDirector({ state, actors, world, acting, audio, presentation, camera, life, rooms, stage }) {
  const $ = id => document.getElementById(id);
  const { phase, dialogue, event, clock, transition } = stage;

  function cue(id) { audio.cue(id, { room: state.room, story: state.story }); event('directing-cue', { id }); }
  function direct() { state.directed = true; document.body.dataset.directed = 'true'; document.body.dataset.letterbox = 'true'; }
  function clear() {
    state.directed = false; document.body.dataset.directed = 'false';
    presentation.focus(null); world.clearRear();
    for (const n of CAST) acting.hold(n, null);
    state.hideNameplate = false;
  }
  const face = (name, toward) => world.face(name, toward);
  const look = (name, target) => world.look(name, target);
  const shot = (x, z, zoom = 0, speed = 3) => camera.shot({ x, z, zoom, speed });

  // Eyes follow someone crossing the room until the walk ends.
  function follow(names, target, until) {
    const timer = setInterval(() => names.forEach(n => actors[n].room === actors[target].room && face(n, target)), 160);
    return until.finally(() => clearInterval(timer));
  }
  const upstairs = (name, via, room = 'offstage') => world.walk(name, [...via, STAIR_FOOT, STAIR_TOP, STAIR_HEAD], { roomAfter: room });
  function downstairs(name, points) { world.place(name, STAIR_HEAD.x, STAIR_HEAD.z, 'lounge', STAIR_HEAD.y); return world.walk(name, [STAIR_TOP, STAIR_FOOT, ...points]); }

  function home() {
    world.place('ada', 4.27, 2.95, 'lounge');
    world.place('elias', .45, -2.65, 'lounge');
    world.place('mira', -3.9, -1.55, 'lounge');
  }

  // ---------------------------------------------------------------- Opening
  let skipShot = null, skipAll = false, shotSkipped = false;
  function skipOpening(all = false) { if (all) skipAll = true; shotSkipped = true; skipShot?.(); }

  // Step 13: the opening is an authored title sequence in the game's own world (world/opening13.js).
  // Each shot keeps its Step 11 narration line, caption and audio cue; lines start when their image
  // can carry them (openingV13.voiceAt). Everything here is paced by the opening's own shot clock,
  // not wall time, so a slow frame can never cut a shot before its picture has finished. Captions
  // are typed cards over an ink rule that draws in the knock rhythm: three strokes, a pause, one.
  const RULE = '<svg class="op-rule" viewBox="0 0 132 8" aria-hidden="true"><path d="M1 4h16"/><path d="M23 4h16"/><path d="M45 4h16"/><path class="last" d="M82 4h49"/></svg>';
  let typing = null, pumping = false, due = [], waiting = null;
  function atClock(t, fn) { due.push({ t, fn }); }
  function pump() {
    if (!pumping) return;
    const now = world.opening.clock();
    due = due.filter(d => (d.t <= now ? (d.fn(), false) : true));
    if (waiting && (shotSkipped || skipAll || now >= waiting.t)) { const w = waiting; waiting = null; skipShot = null; w.resolve(); }
    requestAnimationFrame(pump);
  }
  function untilClock(t) {
    if (shotSkipped || skipAll) return Promise.resolve();
    return new Promise(resolve => {
      waiting = { t, resolve };
      skipShot = () => { if (waiting) { waiting = null; skipShot = null; resolve(); } };
    });
  }
  function showCaption(text) {
    const cap = $('opening-caption');
    clearInterval(typing);
    cap.className = ''; cap.setAttribute('aria-label', text);
    cap.innerHTML = `<span class="op-type" aria-hidden="true"></span>${RULE}`;
    void cap.offsetWidth; cap.classList.add('in');
    const out = cap.querySelector('.op-type'); let n = 0;
    typing = setInterval(() => { out.textContent = text.slice(0, ++n); if (n >= text.length) { clearInterval(typing); cap.classList.add('typed'); } }, 42 / timeScale);
  }
  function dropCaption() { clearInterval(typing); $('opening-caption').classList.add('out'); }
  async function opening() {
    skipAll = false;
    direct(); phase('opening', 'opening-stage');
    const stageEl = $('opening-stage'), live = world.opening;
    stageEl.classList.add('live');
    audio.environment('exterior');
    event('opening-start');
    world.switchRoom('veranda', { aren: [1.5, 2.1] });
    camera.shot({ instant: true });
    await live.prepare();
    live.begin();
    pumping = true; requestAnimationFrame(pump);
    const SHOTS = live.shots || openingV13, HANDOFF = live.handoffShot || openingHandoff13;
    for (let i = 0; i < SHOTS.length && !skipAll; i++) {
      const s = SHOTS[i], line = lines81.find(l => l.line_id === s.line);
      shotSkipped = false; due = [];
      state.openingShot = i + 1;
      live.play(i, s.seconds);
      $('opening-caption').textContent = ''; $('opening-subtitle').textContent = '';
      atClock(s.captionAt, () => showCaption(s.caption));
      cue('opening_' + (['message', 'travel', 'ghat', 'house'][i] || 'house'));   // Step 14: one soundscape per beat
      event('opening-shot', { number: i + 1, image: s.id });
      let seconds = s.seconds;
      await untilClock(s.voiceAt);
      if (line && !shotSkipped && !skipAll) {
        state.heardLines.push(line.line_id);
        // The letter is legible on screen; its words are not repeated underneath.
        $('opening-subtitle').textContent = s.subtitle === false ? '' : line.text;
        const info = await audio.speak(line), now = live.clock();
        seconds = Math.max(seconds, now + (info.duration || 0) + .5);
        const spoken = info.duration || audio.manifest?.voices?.find(v => v.id === line.line_id)?.targetDuration || 4;
        atClock(Math.min(now + spoken + .6, seconds - .9), () => { $('opening-subtitle').textContent = ''; });
      }
      atClock(seconds - .9, dropCaption);
      await untilClock(seconds);
    }
    due = [];
    audio.stopVoice();
    $('opening-subtitle').textContent = '';
    cue(skipAll ? 'opening_skipped' : 'opening_handoff');   // the rain carries on into the veranda
    audio.environment('veranda');
    state.openingShot = SHOTS.length + 1;
    if (!skipAll) {
      // One move: the roof lifts, the lens flattens into the game's view, Aren takes the steps.
      $('opening-caption').textContent = '';
      atClock(HANDOFF.captionAt, () => showCaption(HANDOFF.caption));
      event('opening-shot', { number: SHOTS.length + 1, image: 'handoff' });
      await live.handoffTo(HANDOFF.seconds);
    }
    pumping = false; due = []; clearInterval(typing);
    live.finish();
    world.place('aren', 1.5, 2.1, 'veranda');
    world.look('aren', 'door');
    camera.shot({ instant: true });
    dropCaption();
    stageEl.classList.add('leaving');
    // The HUD comes in after the player has the lens: clock, then objective, then the rest.
    document.body.dataset.hudArrive = 'late';
    setTimeout(() => { delete document.body.dataset.hudArrive; }, 4200);
    await wait(500);
    stageEl.classList.remove('leaving', 'live');
    $('opening-caption').textContent = '';
    event('opening-shot', { number: 6, image: 'live-veranda' });
    clear();
    world.look('aren', 'clear');
    state.openingComplete = true;
    event('opening-end');
  }

  // ---------------------------------------------------------------- Arrival
  async function arrivalInside() {
    phase('cinematic'); direct(); state.hideNameplate = true;
    // The player walks the last steps, the door opens inward on its left hinge, warm light first.
    await world.walk('aren', [{ x: 1.55, z: -1.1 }], { speed: 1.9 });
    look('aren', 'door');
    presentation.focus({ x: 1.55, y: 1.6, z: -2.5 }, .24, .45);
    shot(1.1, -1.3, .14, 2.2);
    await wait(500);
    presentation.focus(null);
    await world.passage.frontIn({ time: '6:32 PM', label: 'Cedar House', onArrive: () => look('ada', 'door') });
    actors.aren.facing = state.facing = 'front-right';
    await wait(300);
    face('ada', 'aren');
    event('opening-shot', { number: 7, image: 'live-lounge' });
    clear();
  }

  // Victor's entrance: the door, the storm behind him, every head turning, the room re-arranging.
  async function entrance() {
    phase('cinematic'); direct();
    presentation.atmosphere('victor_arrives');
    const L = rooms.lounge;
    audio.effect('sfx_front_door', { gain: .75, pan: -.6 });
    L.entryStorm.visible = true;
    life.swing(L.entryDoor, 1.2, .8);
    shot(-1.9, 1.6, .045, 2.4);
    await wait(260);
    for (const n of ['ada', 'mira', 'elias', 'aren']) { look(n, 'door'); acting.gesture(n, 'turn'); }
    await wait(480);
    // He comes in out of the storm: first a silhouette on the veranda, then through the door.
    world.place('victor', -7.45, 4.22, 'lounge');
    state.expressions.victor = 'polished';
    look('victor', 'aren');
    await wait(600);
    await world.walk('victor', [{ x: -6.25, z: 4.26 }, { x: -4.85, z: 4.4 }], { speed: 1.4 });
    audio.effect('sfx_front_door_close', { gain: .38, pan: -.55 });
    life.swing(L.entryDoor, 0, .9).then(() => { L.entryStorm.visible = false; });
    shot(0, .2, .02, 1.8);
    const walk = world.walk('victor', [{ x: -3.6, z: 4.4 }, { x: 1.2, z: 4.4 }, { x: 1.85, z: 1.7 }, { x: 1.75, z: -1.45 }, { x: .15, z: -3.3 }]);
    // Elias makes room at the hearth before Victor reaches it.
    setTimeout(() => world.walk('elias', [{ x: 2.05, z: -2.7 }], { speed: 1.4 }), 3600 / timeScale);
    await follow(['ada', 'mira', 'elias', 'aren'], 'victor', walk);
    for (const n of ['ada', 'mira', 'elias', 'aren']) face(n, 'victor');
    face('victor', 'aren');
    event('victor-entered');
    state.victorArrived = true;
    clear();
  }

  // On "Your creditors…" Victor takes one step toward Ada; she holds her ground.
  const pressureBeats = {
    s8_p02: () => face('victor', 'ada'),
    s8_p03: () => { face('ada', 'victor'); acting.hold('ada', 'back'); },
    s8_p04: () => world.walk('victor', [{ x: .7, z: -2.45 }], { speed: 1.1 }),
    s8_p07: () => { for (const n of ['mira', 'elias', 'victor', 'aren']) face(n, 'ada'); }
  };

  async function dinner() {
    await transition('lounge', '7:42 PM', 'Dinner', { victor: [-.2, -1.4], elias: [.95, -1.55], mira: [-1.95, .05], ada: [1.95, .25], aren: [-.4, 1.55] });
    face('victor', 'aren'); face('elias', 'victor'); face('mira', 'victor'); face('ada', 'victor'); face('aren', 'victor');
    shot(0, 0, .06, 2.5);
  }
  const dinnerBeats = {
    s8_p05: () => { world.walk('mira', [{ x: -1.55, z: -.55 }], { speed: 1.2 }); face('victor', 'mira'); acting.gesture('mira', 'take'); },
    s8_p06: () => { face('mira', 'victor'); }
  };

  // ---------------------------------------------------------------- Evening montage
  async function evening() {
    phase('montage', 'montage-stage'); direct();
    presentation.atmosphere('social_unease', { speed: 1.2 });
    event('evening-start');
    const beat = async (time, text) => {
      clock(time, 'THE EVENING');
      const t = $('montage-time');
      t.textContent = time; t.classList.remove('tick'); void t.offsetWidth; t.classList.add('tick');
      $('montage-caption').textContent = text;
      event('evening-shot', { clock: time, text });
    };
    world.place('aren', -2.35, 1.8, 'lounge'); face('aren', 'victor');

    await beat('8:16 PM', 'After dinner, Victor goes up to his room.');
    cue('evening_stairs');
    shot(1.8, -1.2, .03, 1.6);
    const victorUp = upstairs('victor', [{ x: 1.9, z: -1.6 }, { x: 3.3, z: -.4 }]);
    world.walk('ada', [{ x: 2.2, z: 2.6 }, { x: 4.27, z: 2.95 }]);
    world.walk('mira', [{ x: -2.3, z: -1.2 }, { x: -3.0, z: -1.85 }]);
    world.walk('elias', [{ x: .45, z: -2.65 }]);
    await follow(['aren'], 'victor', victorUp);
    await wait(300);

    await beat('8:21 PM', 'Elias gathers his papers and a cassette recorder into his case.');
    shot(.6, -1.7, .07, 2.2);
    await world.walk('elias', [{ x: .75, z: -1.3 }]);
    state.gesture = { name: 'elias', kind: 'papers', at: state.time };
    audio.effect('sfx_case_papers', { pan: .2 });
    await wait(1100);
    state.gesture = { name: 'elias', kind: 'papers', at: state.time };
    await wait(1100);
    world.walk('elias', [{ x: .45, z: -2.65 }]);
    await wait(500);

    await beat('8:27 PM', 'The telephone rings. Victor comes down to take the call.');
    cue('evening_phone');
    shot(3.6, .6, .04, 2);
    await wait(500);
    face('ada', 'aren'); life.phone(true); state.gesture = { name: 'ada', kind: 'papers', at: state.time };
    await downstairs('victor', [{ x: 4.45, z: .45 }]);
    face('victor', 'ada'); face('ada', 'victor');
    await wait(500);

    await beat('8:29 PM', 'Victor is on the telephone. Mira leaves the fireside.');
    shot(1.4, -.9, .02, 1.6);
    const miraUp = upstairs('mira', [{ x: -2.2, z: -1.75 }, { x: 1.8, z: -1.75 }, { x: 3.3, z: -.4 }], 'corridor');
    await follow(['aren'], 'mira', miraUp);
    await wait(700);

    await beat('8:34 PM', 'Mira comes back down and joins Ada at the desk.');
    shot(3.2, 1.2, .03, 1.8);
    await downstairs('mira', [{ x: 3.4, z: -.35 }, { x: 2.1, z: .6 }, { x: 2.1, z: 3.0 }, { x: 3.25, z: 3.45 }]);
    face('mira', 'ada'); face('ada', 'mira');
    await wait(400);

    await beat('8:37 PM', 'Victor checks his watch, then goes back upstairs.');
    life.phone(false);
    cue('watch_check');
    state.gesture = { name: 'victor', kind: 'watch', at: state.time };
    shot(4.2, 0, .06, 2.2);
    await wait(1000);
    await upstairs('victor', [{ x: 4.6, z: -.1 }]);
    await wait(300);

    await beat('8:45 PM', 'The storm closes the lower road.');
    life.flash(1); life.flickerLanding(1.1);
    audio.effect('sfx_distant_thunder', { gain: .35 });
    shot(3.4, 1.8, .05, 2);
    life.phone(true); face('ada', 'aren');
    await wait(700);
    await dialogue(['s9_road'], 'THE LOWER ROAD', { mode: 'incidental', person: 'ada' });
    phase('montage', 'montage-stage'); direct();
    life.phone(false);

    await beat('8:51 PM', 'Elias takes his case upstairs. Ada tries the road again.');
    cue('evening_stairs');
    shot(2, -1.2, .03, 1.6);
    const eliasUp = upstairs('elias', [{ x: 2.0, z: -1.9 }, { x: 3.3, z: -.4 }], 'corridor');
    setTimeout(() => { life.phone(true); state.gesture = { name: 'ada', kind: 'papers', at: state.time }; }, 1200 / timeScale);
    await follow(['aren'], 'elias', eliasUp);
    await wait(500);

    await beat('8:58 PM', 'Another call goes unanswered. Mira stays beside Ada.');
    shot(3.6, 2.6, .07, 1.8);
    await wait(1400); life.phone(false);
    await wait(1600);

    await beat('9:06 PM', 'Rain fills the pauses. The stairs stay empty.');
    presentation.atmosphere('pre_knock', { speed: 1 });
    camera.shot({ x: 4.2, z: -2.3, zoom: .1, speed: 1.1 });
    camera.push(.03, 3.4);
    await wait(3400);

    await beat('9:13 PM', 'The fire settles. Elias comes back down.');
    audio.effect('sfx_fire_settle', { pan: -.15 });
    shot(2.2, -1.3, .02, 1.5);
    await downstairs('elias', [{ x: 3.3, z: -.45 }, { x: 2.2, z: -1.95 }, { x: 1.25, z: -2.45 }]);
    face('elias', 'aren');
    await wait(500);
    camera.wide(2);
    clear();
    event('evening-end');
  }

  // ---------------------------------------------------------------- The knocks
  // A composed listening frame: the stair head in view, all four downstairs, no one moving.
  function listeningFrame() {
    direct();
    for (const n of ['mira', 'ada', 'elias']) face(n, 'aren');
    face('aren', 'elias');
    acting.hold('ada', 'listen');
    camera.shot({ x: 1.6, z: -.9, zoom: .035, speed: 1.4 });
  }

  // ---------------------------------------------------------------- Door and discovery
  async function corridorArrival() {
    look('ada', 'door');
    presentation.focus({ x: 1.55, y: 1.6, z: -2.8 }, .3, .35);
    shot(.4, -.9, .06, 2);
  }
  async function othersArrive() {
    // Mira and Elias climb out of the stair well a beat apart.
    world.place('mira', -4.69, 3.4, 'corridor', -1.35);
    const mira = world.walk('mira', [{ x: -4.69, z: 1.9, y: 0 }, { x: -2.4, z: .2 }, { x: -.85, z: -.75 }]);
    await wait(650);
    world.place('elias', -4.69, 3.4, 'corridor', -1.35);
    await Promise.all([mira, world.walk('elias', [{ x: -4.69, z: 1.9, y: 0 }, { x: -2.0, z: .95 }, { x: 2.3, z: -.9 }])]);
    face('mira', 'ada'); face('elias', 'ada');
  }
  async function forceDoor() {
    direct();
    await world.walk('elias', [{ x: 1.95, z: -1.55 }], { speed: 1.5 });
    look('elias', 'door');
    world.walk('mira', [{ x: -1.3, z: -.45 }], { speed: 1.2 });
    presentation.focus({ x: 1.55, y: 1.6, z: -2.8 }, .26, .45);
    shot(1.2, -1.4, .09, 2.2);
    await wait(500);
    audio.effect('sfx_door_force', { pan: .35 });
    camera.jolt(.45); presentation.pulse(.35);
    await wait(260);
    await world.door(true, { animate: true });
    camera.push(.05, 1.4);
    await wait(750);
    event('door-open');
  }
  // The first frame inside is composed: the body in the light, the four of them at the threshold.
  async function revealRoom() {
    await presentation.fade(1, .2);
    world.switchRoom('victor', { aren: [-3.55, 3.3], ada: [-2.95, 2.7], mira: [-4.45, 3.65], elias: [-2.35, 3.6] });
    for (const n of ['aren', 'ada', 'mira', 'elias']) look(n, 'body');
    // Faces change at the cut: nobody is still helpful, or curious, at this door.
    Object.assign(state.expressions, { aren: 'grave', mira: 'concerned', ada: 'shock', elias: 'shock' });
    audio.environment('victor');
    presentation.atmosphere('body_discovery', { speed: 6 });
    camera.shot({ x: -1.2, z: 1.5, zoom: .1, instant: true });
    presentation.focus({ x: .45, y: .3, z: .35 }, .3, .55);
    clock('9:20 PM', 'VICTOR SOREN');
    cue('body_reveal');
    await presentation.fade(0, .6);
    camera.push(.03, 2.4);
    await wait(1500);
  }
  async function bodyCheck() {
    await world.walk('ada', [{ x: -1.75, z: 1.65 }, { x: -1.15, z: 1.35 }], { speed: 1.4 });
    look('ada', 'body'); acting.hold('ada', 'bow');
    cue('body_check');
    await wait(1400);
    acting.hold('ada', null);
    face('ada', 'aren');
    event('ada-checks-victor');
  }
  async function leaveCrimeScene() {
    await dialogue(['s81_clear'], 'GIVE HIM SPACE', { mode: 'group', person: 'ada' });
    phase('cinematic'); direct();
    cue('crime_scene_empty');
    event('crime-scene-exit-start');
    // Out through 202's doorway into the dark corridor strip beyond it.
    const door = { x: -4.6, z: 4.25 }, out = { x: -4.6, z: 5.45 };
    const mira = world.walk('mira', [door, out], { roomAfter: 'corridor' });
    await wait(500);
    const elias = world.walk('elias', [{ x: -3.2, z: 3.95 }, door, out], { roomAfter: 'corridor' });
    look('ada', 'body'); acting.hold('ada', 'grave');
    await wait(1100);
    acting.hold('ada', null);
    await Promise.all([mira, elias, world.walk('ada', [{ x: -2.3, z: 2.85 }, { x: -3.7, z: 3.95 }, door, out], { roomAfter: 'corridor' })]);
    home();
    // Aren steps further in, away from the doorway, and looks back at what is left.
    await world.walk('aren', [{ x: -2.55, z: 2.35 }], { speed: 1.2 });
    look('aren', 'body');
    clear();
    state.soloCrimeScene = true;
    event('crime-scene-empty', { remaining: Object.keys(actors).filter(n => actors[n].room === 'victor') });
    camera.shot({ x: -.6, z: .9, zoom: .03, speed: 1.5 });
  }

  // ---------------------------------------------------------------- Investigation staging
  async function privateMira() {
    phase('cinematic'); direct();
    // Mira goes first, out of the front door; Aren follows her onto the veranda.
    const door = rooms.lounge.entryDoor;
    const walk = world.walk('mira', [{ x: -3.2, z: -1.3 }, { x: -3.25, z: 1.0 }, { x: -4.1, z: 2.35 }, { x: -5.6, z: 4.2 }, { x: -7.6, z: 4.22 }], { roomAfter: 'veranda' });
    await wait(700);
    world.walk('aren', [{ x: actors.aren.x - .45, z: actors.aren.z + .2 }], { speed: 1.6 });
    await wait(1500);
    rooms.lounge.entryStorm.visible = true;
    audio.effect('sfx_front_door', { gain: .45, pan: -.55 });
    life.swing(door, door.userData.open(1.3), .8);
    await Promise.race([walk, wait(3200)]);
    await world.passage.frontOut({ label: 'Under the veranda roof', enter: [{ x: 1.55, z: -2.2 }, { x: .55, z: .85 }], onArrive: () => world.place('mira', -1.4, -.55, 'veranda') });
    cue('veranda_private');
    shot(-.45, -.3, .06, 2.5);
    face('aren', 'mira'); face('mira', 'aren');
  }

  async function gather() {
    await dialogue(['s81_gather'], 'THE WHOLE EVENING', { mode: 'group', person: 'ada' });
    phase('cinematic'); direct();
    cue('accusation_gather');
    await transition('lounge', null, 'The same room. A different evening.', { aren: [3.1, -.4], elias: [.45, -2.65], mira: [-3.9, -1.55], ada: [4.27, 2.95] });
    await Promise.all([
      world.walk('elias', [{ x: .4, z: -1.3 }]),
      world.walk('mira', [{ x: -2.65, z: -1.35 }]),
      world.walk('ada', [{ x: 3.5, z: -.6 }]),
      world.walk('aren', [{ x: 1.9, z: -.4 }, { x: 1.9, z: 2.8 }])
    ]);
    for (const n of ['mira', 'ada']) face(n, 'elias');
    face('elias', 'aren'); look('aren', 'elias');
    shot(.7, .5, .07, 1.8);
    event('accusation-staged', { room: state.room });
  }
  // After "I know.": the others take one step back from Elias. Nobody says anything.
  async function isolate() {
    await Promise.all([world.walk('mira', [{ x: -3.25, z: -1.65 }], { speed: .9 }), world.walk('ada', [{ x: 4.05, z: -.35 }], { speed: .9 })]);
    face('mira', 'elias'); face('ada', 'elias');
  }

  async function dawnCorridor() {
    world.door(false); world.sealDoor(); state.roomSealed = true;
    await transition('corridor', 'NEAR DAWN', 'The house falls quiet', { aren: [-4.95, .45], ada: [-2.9, -.35] });
    world.place('mira', 0, 0, 'lounge'); world.place('elias', 1, 0, 'lounge'); world.place('victor', 0, 0, 'offstage');
    face('ada', 'aren'); face('aren', 'ada');
    shot(-2.2, .4, .05, 1.6);
  }
  async function adaLeaves() {
    await world.walk('ada', [{ x: -4.1, z: .9 }, { x: -4.69, z: 1.9, y: 0 }, { x: -4.69, z: 3.45, y: -1.35 }], { roomAfter: 'lounge' });
    camera.wide(1.4);
  }

  return {
    opening, skipOpening, arrivalInside, entrance, pressureBeats, dinner, dinnerBeats, evening,
    listeningFrame, corridorArrival, othersArrive, forceDoor, revealRoom, bodyCheck, leaveCrimeScene,
    privateMira, gather, isolate, dawnCorridor, adaLeaves, home, clear, direct, cue, face, look, follow
  };
}
