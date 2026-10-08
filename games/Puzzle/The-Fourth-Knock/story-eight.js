import { sequences8, clues8, residuals8, LOCK_METHOD } from './content/step8.js';
import { lines9 } from './content/step9.js';
import { boards } from './content/step11.js';
import { clueArt, lookCloser } from './content/evidence11.js';
import { createLockReconstruction } from './locked-room9.js';
import { wait } from './core/timing.js';

// The evening before the knocks, the investigation after the first contradiction, and the
// finale. The hub owns the knocks, the discovery, the watch and Case Note 01.
const DESK = [
  { id: 'trace', label: 'A snag at the drawer', point: { x: -3.4, y: 1.55, z: -1.94 } },
  { id: 'document', label: 'A torn letter on the floor', point: { x: -1.66, y: .12, z: -1.43 } },
  { id: 'recorder', label: 'A cassette recorder', point: { x: -2.12, y: .22, z: -1.57 } },
  { id: 'bookend', label: 'The brass bookend', point: { x: -1.85, y: 1.72, z: -3.05 } }
];
const FOCUS = { impacts: { x: .9, y: .12, z: 1.0 }, ...Object.fromEntries(DESK.map(d => [d.id, d.point])) };

export function createAssembly(stage) {
  const { state, actors, world, acting, audio, presentation, camera, echoes, director, evidencePanel, board,
    phase, objective, clock, chapter, cue, event, timeline, record, person, toast, dialogue, transition, explore, progress,
    openEvidence, lineById, knocks, refreshObjective } = stage;
  const $ = id => document.getElementById(id);
  const say = (name, context, options = {}) => dialogue(sequences8[name] || [name], context, options);
  const lock = createLockReconstruction({ state, audio, echoes, event, panel: evidencePanel });
  let residualBusy = false, endingBusy = false, returnToDesk = false;
  state.lockMethod = LOCK_METHOD;
  state.assetStatus = { ...state.assetStatus, victorStanding: 'PRODUCTION_INTEGRATED' };

  // ---------------------------------------------------------------- begin, arrival, the evening
  async function begin() {
    if (state.started) return;
    state.started = true;
    state.startedAt = state.time;
    audio.setMuted(!$('preview-audio').checked);
    stage.updateAudioButton();
    await audio.start();
    audio.preload(['sfx_four_knocks_master', 'sfx_four_knocks_ending', 'sfx_front_door', 'sfx_room_transition', 'sfx_ui_soft_select', 'sfx_clue_record', 'sfx_case_fill', 'sfx_case_note_confirm']).catch(() => {});
    cue('cedar_house_main');
    event('begin');
    clock('6:32 PM', 'ARRIVAL');
    await director.opening();
    state.story = 'arrivalApproach';
    objective('Get out of the rain. The door is right there.');
    explore();
  }

  async function introductions() {
    await stage.approach('mira');
    clock('6:41 PM', 'THE OTHER GUESTS');
    await say('introductions', 'MIRA SENN · ELIAS BRANN', { person: 'mira', beats: { s8_a05: () => world.walk('elias', [{ x: -1.55, z: -2.3 }], { speed: 1.5 }) } });
    chapter('VICTOR_ARRIVES');
    await transition('lounge', '6:56 PM', 'An expected guest', { elias: [.5, -2.7], mira: [-3.0, -1.85], ada: [4.27, 2.95] });
    await director.entrance();
    await say('victor', 'VICTOR SOREN', { person: 'victor' });
    state.story = 'pressure';
    chapter('PRESSURE_SCENE');
    objective('Victor seems to expect an audience. Speak to him.');
    explore();
  }

  async function pressure() {
    await stage.approach('victor');
    clock('7:22 PM', 'CEDAR HOUSE');
    cue('social_tension');
    presentation.atmosphere('social_unease');
    await say('pressure', 'A RESCUE · A PRICE', { person: 'victor', beats: director.pressureBeats });
    await say('folklore', 'A FAMILY SAYING', { person: 'ada', beats: director.pressureBeats });
    acting.hold('ada', null);
    await director.dinner();
    await dialogue(['s8_p05', 's8_p06'], 'DINNER · BUSINESS FOLLOWS', { person: 'victor', beats: director.dinnerBeats });
    state.dinnerDone = true;
    chapter('TIME_COMPRESSION');
    await director.evening();
    state.story = 'eveningBreath';
    objective('The storm has settled in. Wait by the fire.');
    explore();
  }

  // ---------------------------------------------------------------- investigation targets
  const deskDone = () => DESK.every(d => state.evidence[d.id]);
  function targets(add) {
    const s = state.story, room = state.room;
    if (room === 'veranda' && s === 'arrivalApproach') add('arrivalEnter', 'door', 1.55, -1.3, 'Enter Cedar House', 'WARM LIGHT BEHIND THE DOOR', 1.8, 3.4);
    if (room === 'lounge' && s === 'arrivalWelcome') add('welcome', 'ada', actors.ada.x, actors.ada.z, 'Talk to Ada', 'THE OWNER, BY THE LOOK OF IT', 1.6, 2.6);
    if (room === 'lounge' && s === 'arrival') add('introductions', 'mira', actors.mira.x, actors.mira.z, 'Meet Mira', 'THE OTHER GUESTS', 1.6, 2.9);
    if (room === 'lounge' && s === 'pressure') add('pressure', 'victor', actors.victor.x, actors.victor.z, 'Speak to Victor', 'THE NEW ARRIVAL', 1.75, 3.1);
    if (room === 'lounge' && s === 'eveningBreath') add('eveningEnd', 'fire', .6, -1.55, 'Wait by the fire', 'A LONG EVENING', 1.7, 2.3);
    if (s !== 'investigate') return;
    if (room === 'lounge') add('veranda', 'veranda', -5.7, 4.15, 'Covered veranda', 'A LITTLE AIR', 1.2, 2.9);
    if (room === 'veranda') add('inside', 'door', 1.55, -1.3, 'Back inside', 'THE LOUNGE', 1.6, 3.4);
    if (!state.noted) { if (room === 'victor') add('deskEarly', 'desk', -1.9, -.95, 'The desk', 'PAPERS EVERYWHERE', 1.35, 2.2); return; }
    if (room === 'victor') {
      add('desk', 'desk', -1.9, -.95, 'Inspect the desk', deskDone() ? 'ALL FOUR KEPT' : 'PAPERS · A DRAWER · A RECORDER', 1.35, 2.2);
      add('clue', 'impacts', 1.35, 2.0, 'Look beside Victor', state.evidence.impacts ? 'OBSERVATION KEPT' : 'THE FLOOR', 1.1, 1.1);
    }
    if (room === 'corridor') add('clue', 'staging', 2.45, -1.6, 'Examine the doorway', state.evidence.staging ? 'RECONSTRUCTED' : 'HOW WAS THE ROOM CLOSED?', .95, 2.5);
  }
  function markers() {
    const list = [];
    if (state.story === 'dawn' && state.room === 'corridor') list.push({ x: 6.2, y: 1.1, z: -.75, done: true });
    if (state.story !== 'investigate' || !state.noted) return list;
    if (state.room === 'victor') {
      if (!deskDone()) list.push({ x: -2.4, y: 1.85, z: -2.3 });
      if (!state.evidence.impacts) list.push({ x: .9, y: .3, z: 1.05 });
    }
    if (state.room === 'corridor' && !state.evidence.staging) list.push({ x: 2.38, y: 1.5, z: -3.0 });
    return list;
  }

  async function interact(t) {
    switch (t.kind) {
      case 'arrivalEnter':
        await director.arrivalInside();
        state.story = 'arrivalWelcome';
        objective('Find whoever runs this place.');
        explore(); return true;
      case 'welcome':
        await stage.approach('ada');
        await say('arrival', 'CEDAR HOUSE · ARRIVAL', { person: 'ada' });
        state.story = 'arrival';
        objective('Meet the other guests.');
        explore(); return true;
      case 'introductions': await introductions(); return true;
      case 'pressure': await pressure(); return true;
      case 'eveningEnd': await knocks(); return true;
      case 'veranda': phase('cinematic'); await world.passage.frontOut(); explore(); return true;
      case 'inside': phase('cinematic'); await world.passage.frontIn(); explore(); return true;
      case 'deskEarly':
        world.look('aren', 'desk');
        await dialogue(['s11_x05'], 'VICTOR’S DESK', { mode: 'internal', person: 'aren' });
        explore(); return true;
      case 'desk': openDesk(); return true;
      case 'clue': openClue(t.id); return true;
    }
    return false;
  }

  // ---------------------------------------------------------------- the desk and the evidence
  function openDesk() {
    returnToDesk = false;
    world.look('aren', 'desk');
    phase('desk', 'desk-panel');
    camera.shot({ x: -2.6 + 2.3 * .838, z: -2.1 - 2.3 * .545, zoom: .17, speed: 2.2 });
    const list = $('desk-clues');
    list.replaceChildren();
    for (const d of DESK) {
      const b = document.createElement('button');
      b.dataset.clue = d.id;
      const span = document.createElement('span'); span.textContent = d.label;
      const tick = document.createElement('span'); tick.className = 'tick'; tick.textContent = state.evidence[d.id] ? 'KEPT' : '';
      b.append(span, tick);
      const highlight = () => presentation.focus(d.point, .1, .62);
      b.onfocus = highlight; b.onmouseenter = highlight;
      b.onclick = () => openClue(d.id, { fromDesk: true });
      list.append(b);
    }
    const next = [...list.children].find(b => !state.evidence[b.dataset.clue]) || list.firstElementChild;
    requestAnimationFrame(() => next.focus());
    event('desk-open');
  }

  function openClue(id, { fromDesk = false } = {}) {
    returnToDesk = fromDesk;
    if (id === 'staging') { openStaging(); return; }
    const c = clues8[id];
    audio.cue(id === 'recorder' ? 'sfx_recorder_inspect' : id === 'bookend' ? 'sfx_bookend_inspect' : 'sfx_paper_handle', { clue: id });
    if (id === 'bookend' || id === 'impacts') chapter('WEAPON_THREAD');
    if (id === 'document' || id === 'recorder') chapter('BRANN_THREAD');
    if (FOCUS[id]) presentation.focus(FOCUS[id], .12, .55);
    if (id === 'impacts') { world.look('aren', 'body'); camera.shot({ x: .9, z: 1.0, zoom: .1, speed: 2.2 }); }
    openEvidence(id, {
      art: clueArt(c.art), place: c.place, title: c.title, text: c.text,
      spots: lookCloser[id]?.spots || [], kept: !!state.evidence[id],
      onKeep: () => keepEvidence(id), onReturn: closeToParent
    });
  }
  async function keepEvidence(id) {
    record(id);
    toast('KEPT', clues8[id].label);
    chapter('INVESTIGATION_OPEN');
    refreshObjective();
    progress();
    closeToParent();
  }
  function closeToParent() {
    presentation.focus(null);
    if (state.inspection === 'kaveri' && !state.evidence.kaveri) record('kaveri');
    if (returnToDesk) openDesk(); else explore();
  }
  // Escape from an evidence card: back to the desk if it came from there.
  function closeClue() {
    if (state.inspection === 'staging') lock.close();
    if (state.inspection === 'kaveri' && !state.evidence.kaveri) record('kaveri');
    presentation.focus(null);
    if (returnToDesk) { openDesk(); return true; }
    return false;
  }
  function closeDesk() { presentation.focus(null); }

  // The closed-room reconstruction at the real doorway.
  function openStaging() {
    state.clueLayout = 'reconstruct';
    state.inspection = 'staging';
    world.look('aren', 'door');
    camera.shot({ x: 1.55 + 2.6 * .838, z: -2.4 - 2.6 * .545, zoom: .16, speed: 2 });
    presentation.focus({ x: 1.55, y: 1.6, z: -2.8 }, .3, .3);
    lock.open(keepStaging, () => { lock.close(); presentation.focus(null); explore(); });
    phase('clue', 'clue-panel');
    requestAnimationFrame(() => $('keep-clue').focus());
    event('inspection', { id: 'staging' });
  }
  async function keepStaging() {
    const fresh = record('staging');
    state.lockObservation = LOCK_METHOD;
    lock.close();
    presentation.focus(null);
    toast('KEPT', 'The closed room');
    if (fresh) {
      presentation.atmosphere('deduction');
      await dialogue(['s9_latch'], 'A DOOR CAN CATCH ITSELF', { mode: 'internal', person: 'aren' });
    }
    chapter('INVESTIGATION_OPEN');
    refreshObjective();
    explore();
  }
  async function keepClue() {
    if (state.phase !== 'clue') return;
    if (state.inspection === 'staging' && !lock.complete) {
      await lock.advance(keepStaging, () => { lock.close(); explore(); });
      requestAnimationFrame(() => $('keep-clue').focus());
      return;
    }
    await evidencePanel.keep();
  }

  // ---------------------------------------------------------------- questioning after Note 01
  function topics(name, button) {
    if (name === 'mira') {
      button('mira_denial', 'Before we went upstairs', async () => {
        if (state.people.mira_admission) { await say('s8_m08', 'MIRA · HER ACCOUNT', { mode: 'conversation', person: 'mira' }); return; }
        await say('denial', 'MIRA · UPSTAIRS', { mode: 'conversation', person: 'mira' });
        person('mira_denial', 'mira', 'Says she never went upstairs before the discovery.');
      });
      if (state.evidence.trace && !state.people.mira_admission) button('mira_admission', 'The thread on the desk', miraThread, { asked: false });
      if (state.evidence.kaveri) button('kaveri_page', 'The Kaveri Heights page', async () => { returnToDesk = false; openClue('kaveri'); }, { asked: false });
    }
    if (name === 'ada') {
      button('ada_deal', 'How far had the sale gone?', async () => {
        await say('ada', 'ADA · CEDAR HOUSE', { mode: 'serious', person: 'ada' });
        person('ada_deal', 'ada', 'Admits agreeing draft rescue terms before refusing the demolition proposal. Hid how far it had gone out of shame. Stayed downstairs after dinner; Mira corroborates the later window.');
      });
      if (state.people.mira_admission) button('ada_witness', 'Mira’s timing', async () => {
        await say('witness', 'ADA · WHAT SHE SAW', { mode: 'conversation', person: 'ada' });
        person('ada_witness', 'ada', 'Saw Mira come back down at 8:34; Mira stayed beside her. Victor went upstairs at 8:37. Elias went up at 8:51 and came back at 9:13.');
        timeline('mira_return', '8:34 PM', 'Ada saw Mira come back downstairs. Mira stayed beside her from then on.', 'account');
        timeline('victor_return', '8:37 PM', 'Ada saw Victor go back upstairs.', 'account');
        timeline('elias_up', '8:51 PM', 'Ada saw Elias go upstairs with his case.', 'account');
        timeline('elias_down', '9:13 PM', 'Ada saw Elias come back down.', 'account');
      });
    }
    if (name === 'elias') {
      if (state.evidence.document) button('elias_family', 'Dev Brann', async () => {
        chapter('BRANN_THREAD');
        cue('kaveri_serious');
        presentation.atmosphere('confession_silence', { speed: 1.2 });
        await say('brann', 'ELIAS · KAVERI HEIGHTS', { mode: 'serious', person: 'elias' });
        person('elias_family', 'elias', 'Dev Brann was his father. Dev signed under pressure, later tried to expose the wider wrongdoing, lost his livelihood and died by suicide while his appeal was unresolved. Six residents died at Kaveri Heights.');
        presentation.restore();
      });
      if (state.evidence.document && state.evidence.recorder && state.evidence.bookend && state.people.elias_family) button('elias_account', 'The recorder and the torn page', async () => {
        await say('recorder', 'ELIAS OPENS HIS CASE', { mode: 'conversation', person: 'elias' });
        person('elias_account', 'elias', 'Owns the recorder; brought it to record an admission. Went up at 8:51; Victor let him in at 8:53; he says he came down at 9:13 and left Victor standing. Took the tape. The torn letter fits the sheet in his case, and the same dark wiping streak crosses its edge.');
        record('case_match', { label: 'Matching torn edge', detail: 'The fragment fits the sheet Elias shows from his case. A dark wiping streak crosses that edge, like the residue on the bookend’s paper scrap. A comparison, not a laboratory identification.' });
        timeline('elias_in', '8:53 PM', 'Elias says Victor let him in. By his account he left Victor standing.', 'account');
      });
      button('elias_heard', 'The four knocks', async () => {
        await dialogue(['s7_29', 's7_30'], 'ELIAS · DOWNSTAIRS', { mode: 'conversation', person: 'elias' });
        person('elias_heard', 'elias', 'He heard the four knocks downstairs, with everyone else.');
      });
    }
  }

  // Mira is confronted in the lounge; only then does she ask for somewhere quieter.
  async function miraThread() {
    chapter('MIRA_THREAD');
    if (!state.people.mira_denial) {
      await say('denial', 'MIRA · UPSTAIRS', { mode: 'conversation', person: 'mira' });
      person('mira_denial', 'mira', 'At first denied going upstairs.');
    }
    await say('miraConfront', 'MIRA · THE THREAD', { mode: 'conversation', person: 'mira' });
    if (state.room !== 'veranda') {
      await dialogue(['s81_private'], 'MIRA · A QUIETER PLACE', { person: 'mira' });
      await director.privateMira();
    }
    await say('mira', 'MIRA · THE EARLIER SEARCH', { mode: 'serious', person: 'mira' });
    director.clear();
    person('mira_admission', 'mira', 'Admits searching Victor’s room from 8:29 to 8:34, while he was on the downstairs telephone. Took a Kaveri Heights photocopy; she is investigating Victor’s network. Says she went back to Ada, and knew Elias only from this evening.');
    timeline('mira_search', '8:29–8:34 PM', 'Mira searched Victor’s room while he was on the downstairs telephone. Her account.', 'account');
    refreshObjective();
    // The page she took, seen once, properly.
    returnToDesk = false;
    openClue('kaveri');
  }

  // ---------------------------------------------------------------- Case Notes 02–04
  async function fileNote(c) {
    if (state.caseNotes[c.id]) return;
    state.caseNotes[c.id] = true;
    event('case-confirmed', { id: c.id });
    audio.effect('sfx_case_note_confirm', { gain: .45 });
    cue('deduction');
    progress();
    stage.caseFile.render();
    if (c.id === 'mira') {
      state.miraCleared = true;
      person('mira_cleared', 'mira', 'Cleared of the killing: her search came earlier, and Ada places her downstairs through the later window. Her lie concealed her reporting.');
      timeline('mira_cleared', '8:34 PM onward', 'Mira and Ada account for each other downstairs through the later window.', 'account');
    }
    if (c.id === 'brann') person('brann_connection', 'elias', 'Dev Brann’s son. Meant to confront Victor and record an admission. Planning a meeting is not proof of planning a killing.');
    if (c.id === 'final') { await finale(); return; }
    await payoff(c.id);
    refreshObjective();
    explore();
  }
  async function payoff(id) {
    phase('case-payoff', 'case-payoff');
    director.direct();
    presentation.atmosphere('deduction');
    director.cue(id === 'mira' ? 'case2_timing' : 'case3_intent');
    audio.effect('mus_deduction_sting', { gain: .4 });
    const def = boards[id];
    await board.show(def);
    const line = lineById[def.line];
    board.caption(line.text);
    const voice = await audio.speak(line);
    state.heardLines.push(line.line_id);
    await wait(Math.max(2800, (voice.duration || 0) * 1000 + 600));
    board.caption('');
  }

  // ---------------------------------------------------------------- Residuals
  function framing(id) {
    if (id === 'door') { world.look('aren', 'door'); camera.shot({ x: 1.1, z: -1.5, zoom: .08, speed: 1.3 }); }
    else { world.look('aren', 'desk'); camera.shot({ x: -2.6, z: -1.7, zoom: .08, speed: 1.3 }); }
  }
  async function residual(id) {
    residualBusy = true;
    state.residuals.push(id);
    chapter('RESIDUALS');
    const r = residuals8.find(x => x.id === id);
    event('residual-start', { id });
    cue('residual');
    phase('residual', 'residual-panel');
    director.direct();
    state.hideNameplate = true;
    presentation.atmosphere('residual', { speed: 1.3 });
    framing(id);
    await wait(750);
    for (const [i, beat] of r.beats.entries()) {
      $('residual-caption').textContent = beat.caption;
      director.cue('residual_' + id + '_' + i);
      if (id === 'door' && i === 0) echoes.doorCloses();
      if (id === 'voice' && i === 0) echoes.dimLamp(4.8);
      if (id === 'voice' && i === 1) presentation.pulse(.35);
      if (id === 'search' && i === 0) echoes.drawerSearch('open');
      if (id === 'search' && i === 2) echoes.drawerSearch('close');
      if (beat.sfx) audio.effect(beat.sfx, { gain: .45, pan: id === 'door' ? .3 : -.2 });
      let duration = beat.duration;
      if (beat.voice) {
        const line = lines9.find(l => l.line_id === beat.voice);
        state.heardLines.push(line.line_id);
        const result = await audio.speak(line);
        duration = Math.max(duration, (result.duration || 0) * 1000 + 300);
      }
      await wait(duration);
    }
    audio.stopVoice();
    $('residual-caption').textContent = '';
    presentation.restore();
    await wait(900);
    event('residual-end', { id });
    residualBusy = false;
    chapter('INVESTIGATION_OPEN');
    explore();
  }
  function update() {
    if (state.story === 'dawn') { endingCheck(); return; }
    if (residualBusy || state.phase !== 'explore' || state.story !== 'investigate' || !state.noted) return;
    // Involuntary, but never stacked on a card or a doorway: Aren has had the room to himself for a moment.
    if (state.time - state.exploreSince < 1.5 || state.time - (state.roomEnteredAt || 0) < 1.6) return;
    if (state.room === 'corridor' && !state.residuals.includes('door')) residual('door');
    else if (state.room === 'victor' && state.evidence.document && !state.residuals.includes('voice')) residual('voice');
    else if (state.room === 'victor' && state.people.mira_admission && !state.residuals.includes('search')) residual('search');
  }

  // ---------------------------------------------------------------- the finale
  async function finale() {
    chapter('FINAL_THEORY');
    state.story = 'accusation';
    await director.gather();
    phase('case-payoff', 'case-payoff');
    director.direct();
    presentation.atmosphere('accusation');
    cue('accusation');
    await board.show(boards.whole);
    await wait(1500);
    phase('cinematic');
    await say('accusation', 'THE WHOLE ACCOUNT', { mode: 'serious', person: 'elias' });
    chapter('CONFESSION');
    await say('confessionFirst', 'ELIAS BRANN', { mode: 'serious', person: 'elias' });
    // "And the second?" — then nothing. The silence is 3.8 seconds, unchanged.
    phase('cinematic');
    director.direct();
    director.cue('confession_second_silence');
    presentation.atmosphere('confession_silence', { speed: 2.4 });
    for (const n of ['mira', 'ada']) world.face(n, 'elias');
    world.look('aren', 'elias', { back: true });
    camera.shot({ x: .35, z: -.9, zoom: .11, speed: .8 });
    event('second-blow-silence-start');
    await wait(3800);
    event('second-blow-silence-end');
    await say('confessionLast', 'ELIAS BRANN', { mode: 'serious', person: 'elias' });
    // Between "I didn't knock." and "I know.": Mira turns to him, unconvinced.
    phase('cinematic');
    world.face('mira', 'elias');
    state.expressions.mira = 'skeptical';
    acting.gesture('mira', 'turn');
    await wait(900);
    await say('confessionKnow', 'ELIAS BRANN', { mode: 'serious', person: 'elias' });
    phase('cinematic');
    await director.isolate();
    await wait(1300);
    state.confessed = true;
    state.adaCleared = true;
    timeline('confession', 'After 9:30 PM', 'Elias admits a first blow, then a deliberate second blow while Victor still moved. He cleaned the bookend, took the tape and pulled the latch shut behind him. He says he did not knock.', 'confession');
    person('elias_confession', 'elias', 'Admitted killing Victor with a deliberate second blow, cleaning the bookend, taking the tape and pulling the night latch shut as he left. Denies the knocks.');
    await dawn();
  }

  async function dawn() {
    director.clear();
    chapter('DAWN_ENDING');
    cue('dawn_ending');
    phase('cinematic');
    state.story = 'dawnScene';
    await director.dawnCorridor();
    presentation.atmosphere('dawn', { speed: 1.2 });
    await say('dawn', 'NEAR DAWN', { mode: 'serious', person: 'ada' });
    phase('cinematic');
    await director.adaLeaves();
    state.story = 'dawn';
    audio.cue('amb_dawn', { scene: 'dawn' });
    audio.cue('mus_dawn', { scene: 'dawn' });
    explore();
  }

  function endingCheck() {
    if (endingBusy || state.phase !== 'explore' || state.room !== 'corridor') return;
    // Passing Victor's door on the way to his own room, wherever Aren walks along the runner.
    if (Math.hypot(actors.aren.x - 1.55, actors.aren.z + 1.3) < 1.45 || actors.aren.x > .9) ending();
  }
  const waitUntil = t => new Promise(resolve => { const check = () => state.time >= t ? resolve() : requestAnimationFrame(check); check(); });
  async function ending() {
    endingBusy = true;
    phase('ending-knocks', 'knock-stage');
    director.direct();
    state.hideNameplate = true;
    $('sound-caption').textContent = '';
    $('knock-time').textContent = '';
    presentation.atmosphere('final_knocks', { speed: 1.3 });
    event('ending-knocks-start');
    await world.walk('aren', [{ x: 1.5, z: -1.2 }], { speed: 1.1 });
    world.look('aren', 'door');
    camera.shot({ x: 1.25, z: -1.35, zoom: .14, speed: 1.1 });
    camera.push(.05, 7);
    presentation.focus({ x: 1.55, y: 1.7, z: -2.8 }, .34, .3);
    await wait(1500);
    state.knockAnchor = { x: 2.75, y: 3.0, z: -2.85 };
    const marks = $('knock-marks');
    marks.dataset.count = '0';
    marks.classList.add('cold', 'on');
    await audio.effect('sfx_four_knocks_ending', { pan: .35, gain: .83 });
    const start = state.time, offsets = audio.manifest.knockOffsets;
    for (let i = 0; i < 4; i++) {
      await waitUntil(start + offsets[i]);
      marks.dataset.count = String(i + 1);
      presentation.pulse(i === 3 ? .55 : .28);
      state.rainDip = .6;
      $('sound-caption').textContent = i === 3 ? '[A fourth knock · inside the sealed room]' : '[A knock · inside the sealed room]';
      event('ending-knock', { number: i + 1 });
    }
    await wait(1200);
    $('sound-caption').textContent = '';
    director.cue('ending_fourth_silence');
    event('ending-silence');
    await wait(2800);
    marks.classList.remove('on');
    await presentation.fade(1, 1.4);
    phase('ending', 'ending-panel');
    const panel = $('ending-panel');
    panel.dataset.mark = '0';
    requestAnimationFrame(() => panel.classList.add('visible'));
    await wait(1600);
    // The mark inks itself in the same rhythm. No sound. No fifth.
    const t0 = state.time;
    for (let i = 0; i < 4; i++) { await waitUntil(t0 + offsets[i]); panel.dataset.mark = String(i + 1); }
    await wait(1500);
    panel.classList.add('title-visible');
    $('restart-game').disabled = false;
    $('restart-game').focus();
    state.completed = true;
    state.story = 'complete';
    state.elapsedSeconds = state.time - state.startedAt;
    event('game-complete');
    progress();
  }

  // ---------------------------------------------------------------- objectives
  function objectiveText() {
    const e = state.evidence, p = state.people, n = state.caseNotes;
    const ready = id => stage.visible(id) && !n[id] && !stage.requirements(id).length;
    if (ready('mira')) return 'Mira’s story can be tested now. Open your case file. (N)';
    if (ready('brann')) return 'Elias’s account belongs in the case file. (N)';
    if (ready('final')) return 'Put the whole account together in your case file. (N)';
    if (!deskDone()) return 'Search Victor’s desk. Rebuild the six missing minutes.';
    if (!p.mira_admission) return 'Ask Mira about the thread on Victor’s desk.';
    if (!p.ada_witness || !p.ada_deal) return 'Check Mira’s timing, and the sale, with Ada.';
    if (!p.elias_family || !p.elias_account) return 'Ask Elias about Dev Brann and the recorder.';
    if (!e.impacts) return 'Look closer at the floor beside Victor.';
    if (!e.staging) return 'Examine Victor’s doorway. How was the room closed?';
    return 'Put the accounts together in your case file. (N)';
  }

  function handleKey() { return ['residual', 'ending-knocks', 'case-payoff', 'montage', 'knocks', 'aha', 'cinematic', 'ending'].includes(state.phase); }

  function investigationOpen() {
    state.story = 'investigate';
    state.completed = false;
    chapter('INVESTIGATION_OPEN');
    event('slice-complete');
    cue('investigation');
    explore();
    toast('NEW QUESTIONS', 'Case Note 02 is open');
  }

  return { begin, targets, markers, interact, topics, fileNote, keepClue, closeClue, closeDesk, update, handleKey, investigationOpen, objective: objectiveText };
}
