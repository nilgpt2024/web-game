import { lines as lines7, cast, topics as topics7 } from './content/step7.js';
import { lines8, clues8, caseNotes8, storyGraph } from './content/step8.js';
import { lines81 } from './content/directing81.js';
import { lines9 } from './content/step9.js';
import { examines, examineStories, observe11, caseNote01, deskEarlyLine } from './content/step11.js';
import { lineDirection, legacyModes } from './content/direction11.js';
import { watchArt, lookCloser } from './content/evidence11.js';
import { mountStep8 } from './interface8.js';
import { createAssembly } from './story-eight.js';
import { createDirector } from './director81.js';
import { createCaseFile } from './ui/case-file.js';
import { createEvidencePanel } from './ui/evidence-panel.js';
import { createBoard } from './ui/board.js';
import { wait } from './core/timing.js';

const textLines = [...examines.map(e => e.line), deskEarlyLine, ...Object.values(observe11).flatMap(o => o.after.filter(l => typeof l === 'object'))];
export const lineById = Object.fromEntries([...lines7, ...lines8, ...lines81, ...lines9, ...textLines].map(l => [l.line_id, l]));

// Known case vocabulary is inked in brass when it is spoken (never in gravity or plain lines).
const TERMS = [
  [/\b(nine-oh-eight|9:08)\b/gi, s => s.evidence.watch],
  [/\b(nine-fourteen|9:14)\b/gi, s => s.evidence.knocks],
  [/\b(night latch|hold-back)\b/gi, s => s.lockDemonstrated],
  [/\b(bookend)\b/gi, s => s.evidence.bookend],
  [/\b(recorder)\b/gi, s => s.evidence.recorder],
  [/\b(Kaveri Heights)\b/g, s => s.evidence.kaveri],
  [/\b(Dev Brann)\b/g, s => s.evidence.document]
];
const escapeHtml = t => t.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const NOTE_ORDER = ['first', 'mira', 'brann', 'final'];
const BACKDROP = ['topics', 'observe', 'notes', 'clue', 'desk'];

// The story hub. Progress is committed only at explicit interaction boundaries: keeping an
// observation, finishing an exchange, confirming a Case Note. Everything else is presentation.
export function createStoryController({ state, keys, actors, world, acting, audio, presentation, camera, life, echoes, rooms, dressing, upper }) {
  mountStep8();
  const $ = id => document.getElementById(id);
  const panels = [...document.querySelectorAll('.story-panel')];
  let current = null, auto = false, currentPerson = null, observing = null, selectedDetail = null, lastHints = '', hintTick = 0;
  const knock = { active: false, at: Infinity, count: 0, done: false, gapPushed: false, miraGlance: false, eliasLooked: false, captionFor: 0 };

  Object.assign(state, {
    story: 'title', chapter: 'ARRIVAL', clock: '6:32 PM', started: false,
    talked: false, observed: false, noted: false, completed: false,
    evidence: {}, people: {}, timeline: [], events: [], heardLines: [],
    expressions: { aren: 'neutral', mira: 'curious', ada: 'practical', elias: 'calm', victor: 'polished' },
    caseNotes: { mira: false, brann: false, final: false }, caseAnswers: { first: {}, mira: {}, brann: {}, final: {} },
    residuals: [], cueHistory: [], examined: {}, observations: {}, exploreSince: 0, lastPanelAt: -10
  });
  world.place('victor', 0, 0, 'offstage');
  world.place('ada', 4.27, 2.95, 'lounge');
  world.place('mira', -3.0, -1.85, 'lounge');
  world.place('elias', .5, -2.7, 'lounge');

  // ------------------------------------------------------------------ primitives
  const event = (type, detail = {}) => state.events.push({ type, ...detail, time: Math.round(state.time * 100) / 100, room: state.room });
  function clock(time, beat = '') { state.clock = time; $('clock-time').textContent = time; $('clock-beat').textContent = beat; event('clock', { clock: time }); }
  function chapter(name) { if (!storyGraph[name]) console.warn('Unauthored chapter', name); state.chapter = name; event('chapter', { name }); }
  function cue(id) { audio.cue('cue_' + id, { room: state.room }); state.cueHistory.push({ id, time: state.time, room: state.room }); event('cue', { id }); }

  function phase(next, panel = null, focus = null) {
    keys.clear();
    state.phase = next;
    presentation.phase(next);
    state.beatAt = state.time;
    for (const p of panels) p.hidden = p.id !== panel;
    const backdrop = $('stage-backdrop');
    backdrop.hidden = !BACKDROP.includes(next);
    backdrop.classList.toggle('side', next === 'desk' || (next === 'clue' && state.clueLayout === 'reconstruct'));
    document.body.classList.toggle('staging', next !== 'explore');
    if (BACKDROP.includes(next)) state.lastPanelAt = state.time;
    if (focus) requestAnimationFrame(() => (typeof focus === 'string' ? $(focus) : focus)?.focus());
    acting.refresh();
  }

  function objective(text) {
    const el = $('objective-text');
    if (el.textContent === text) return;
    el.textContent = text;
    const box = document.querySelector('.objective');
    box.classList.remove('fresh'); void box.offsetWidth; box.classList.add('fresh');
    event('objective', { text });
  }
  const filed = id => id === 'first' ? state.noted : !!state.caseNotes[id];
  function progress() {
    const count = NOTE_ORDER.filter(filed).length;
    $('objective-count').textContent = state.evidence.knocks ? `NOTES ${count}/4` : '';
    $('progress').style.width = count / 4 * 100 + '%';
    $('objective-label').textContent = state.completed ? 'CASE CLOSED' : 'ON YOUR MIND';
  }
  let toastTimer = 0;
  function toast(label, text) {
    const t = $('toast'); t.replaceChildren();
    const b = document.createElement('b'); b.textContent = label;
    t.append(b, text); t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }
  function timeline(id, time, text, kind = 'account') { if (!state.timeline.some(t => t.id === id)) state.timeline.push({ id, time, text, kind }); }
  function record(id, data) {
    if (state.evidence[id]) return false;
    state.evidence[id] = data || { label: clues8[id].label, detail: clues8[id].detail };
    event('evidence-kept', { id });
    return true;
  }
  function person(id, name, text) { state.people[id] = { name: cast[name].name, text }; event('account-kept', { id }); }

  function explore() {
    director.clear();
    state.shot = null;
    presentation.restore();
    phase('explore');
    state.exploreSince = state.time;
    camera.shot({ speed: 2.2 });
    requestAnimationFrame(() => $('scene').focus());
    refreshObjective();
    progress();
  }

  // ------------------------------------------------------------------ dialogue
  function markup(text, mode) {
    let html = escapeHtml(text);
    if (mode === 'gravity' || mode === 'plain') return html;
    for (const [re, when] of TERMS) if (when(state)) html = html.replace(re, '<span class="term">$1</span>');
    return html;
  }
  const inRoom = n => actors[n] && actors[n].room === state.room;

  function stageFacing(line, c, d) {
    const mode = d.mode || legacyModes[c.mode] || c.mode;
    const speaker = line.speaker;
    const addressee = c.prev && c.prev !== speaker && inRoom(c.prev) ? c.prev : speaker === 'aren' ? c.person : (speaker === 'victor' && c.person === 'victor' && inRoom('ada') ? 'ada' : 'aren');
    for (const n of ['aren', 'mira', 'ada', 'elias', 'victor']) {
      if (!inRoom(n) || actors[n].moving) continue;
      if (n === 'aren' && mode === 'accuse') { world.look('aren', c.person); continue; }
      if (n === speaker) { if (inRoom(addressee)) world.face(n, addressee); }
      else if (inRoom(speaker)) world.face(n, speaker);
    }
    c.prev = speaker;
  }

  function present() {
    audio.stopVoice();
    const c = current, line = lineById[c.ids[c.index]], d = lineDirection[line.line_id] || {};
    c.lineAt = state.time; c.voiceStarted = false;
    c.vo = d.vo !== false && line.vo !== false;
    const text = line.text.replace('{time}', state.clock.replace(/\s*[AP]M$/, ''));
    c.readTime = Math.max(c.vo ? 3 : 2.4, text.split(/\s+/).length / 2.85 + .75);
    stageFacing(line, c, d);
    const timing = presentation.line(line, c);
    c.pre = timing.pre; c.post = timing.post; c.duration = c.pre + c.readTime + c.post;
    state.lineId = line.line_id;
    if (line.line_id === 's8_r04') state.gesture = { name: 'elias', kind: 'glasses', at: state.time };
    if (line.line_id === 's8_a05') state.gesture = { name: 'mira', kind: 'camera', at: state.time };
    if (line.line_id === 's8_a04') state.gesture = { name: 'ada', kind: 'papers', at: state.time };
    c.beats[line.line_id]?.();
    const name = $('speaker-name');
    name.textContent = cast[line.speaker].name;
    $('subtitle').innerHTML = markup(text, state.presentationMode);
    $('dialogue-context').textContent = c.context;
    $('line-position').textContent = c.ids.length > 1 ? `${c.index + 1} / ${c.ids.length}` : '';
    $('advance-line').disabled = true;
    $('skip-exchange').disabled = true;
    acting.portrait('speaker-portrait', line.speaker, { bust: true });
    if (!state.heardLines.includes(line.line_id)) state.heardLines.push(line.line_id);
    event('line', { id: line.line_id, speaker: line.speaker, expression: line.expression });
  }

  function dialogue(ids, context = '', options = {}) {
    return new Promise(resolve => {
      const person = options.person || ids.map(id => lineById[id].speaker).find(n => n !== 'aren') || 'mira';
      current = { ids, index: 0, context, resolve, mode: options.mode || 'group', person, beats: options.beats || {}, noShot: options.noShot, prev: null };
      phase('dialogue', 'dialogue', 'advance-line');
      presentation.beginExchange(current);
      present();
    });
  }
  function finishDialogue(skip = false) {
    const c = current; if (!c) return;
    audio.stopVoice();
    current = null; state.lineId = null;
    presentation.endExchange();
    event('exchange-end', { context: c.context, skipped: skip });
    phase('cinematic');
    c.resolve();
  }
  function advance(skip = false) {
    if (!current) return;
    const age = state.time - current.lineAt;
    if (age < (skip ? 1.0 : .55 + current.pre * .5)) return;
    if (skip || current.index === current.ids.length - 1) finishDialogue(skip);
    else { current.index++; present(); }
  }

  // ------------------------------------------------------------------ transitions
  async function transition(room, time, label, positions = {}, { quick = false } = {}) {
    phase('cinematic');
    audio.effect('sfx_room_transition', { gain: .22 });
    const card = $('transition-card');
    $('transition-time').textContent = time || '';
    $('transition-place').textContent = label;
    card.dataset.quick = String(quick || !time);
    card.hidden = false; void card.offsetWidth; card.classList.add('on');
    await wait(310);
    world.switchRoom(room, positions);
    camera.shot({ zoom: -.02, instant: true });
    if (time) clock(time, label.toUpperCase());
    audio.environment(room);
    await wait(quick || !time ? 240 : 980);
    card.classList.remove('on');
    camera.shot({ zoom: 0, speed: 2.4 });
    await wait(300);
    card.hidden = true;
  }

  // ------------------------------------------------------------------ the evidence panel
  const evidencePanel = createEvidencePanel({ audio });
  function openEvidence(kind, options) {
    state.clueLayout = options.layout || '';
    state.inspection = kind;
    evidencePanel.open({ kind, ...options });
    phase('clue', 'clue-panel');
    requestAnimationFrame(() => evidencePanel.focusFirst());
    event('inspection', { id: kind });
  }

  // ------------------------------------------------------------------ case file
  const board = createBoard();
  const notes = [
    { ...caseNote01, wrongHint: 'Which time did the watch record, and which did we only hear?' },
    ...caseNotes8.map(n => ({ ...n, wrongHint: n.id === 'brann' ? 'A recorder prepares an admission. It does not, by itself, prove an intention to kill.' : 'That account does not fit all the observations. Check the timing and the physical evidence.' }))
  ];
  const PEOPLE_LABEL = { mira_admission: 'Mira’s account of the evening', ada_witness: 'Ada’s timing', ada_deal: 'Ada’s negotiations', elias_family: 'Dev Brann’s history', elias_account: 'Elias’s account of the recorder' };
  function visible(id) {
    if (id === 'first') return !!state.evidence.knocks;
    if (id === 'mira') return state.noted;
    if (id === 'brann') return state.noted && !!state.evidence.document;
    return state.caseNotes.mira && state.caseNotes.brann;
  }
  function requirements(id) {
    if (id === 'first') return [
      !state.evidence.watch && 'A closer look at Victor’s watch',
      !state.talked && 'Someone’s account of what they heard',
      !state.observed && 'A closer look at someone (O)'
    ].filter(Boolean);
    const c = caseNotes8.find(n => n.id === id);
    const missing = c.requires.filter(e => !state.evidence[e]).map(e => clues8[e]?.label || e);
    for (const p of c.people) if (!state.people[p]) missing.push(PEOPLE_LABEL[p]);
    if (id === 'final') {
      if (!state.lockDemonstrated) missing.push('The closed-room reconstruction');
      if (!state.caseNotes.mira) missing.push('Case Note 02');
      if (!state.caseNotes.brann) missing.push('Case Note 03');
    }
    return missing;
  }
  const caseFile = createCaseFile({
    state, audio, acting, cast, notes, visible, filed, requirements,
    onConfirm: async note => {
      if (note.id === 'first') return fileFirstNote();
      return assembly.fileNote(note);
    }
  });
  function openNotes(which) {
    if (!['explore'].includes(state.phase)) return;
    state.expressions.aren = 'thinking';
    phase('notes', 'notes');
    caseFile.open(which);
    requestAnimationFrame(() => (document.querySelector('#case-page .deduction-slot.selected, #case-page .clue-term, #deduction-selector button.selected') || $('close-notes'))?.focus());
    event('notes-open');
  }

  // ------------------------------------------------------------------ topics and observation
  function topicButton(id, label, perform, { asked = !!state.people[id] } = {}) {
    const b = document.createElement('button');
    b.className = 'topic-choice' + (asked ? ' asked' : '');
    b.dataset.topic = id;
    const span = document.createElement('span'); span.textContent = label;
    const tick = document.createElement('span'); tick.className = 'tick'; tick.textContent = asked ? 'ASKED' : '';
    b.append(span, tick);
    b.onclick = async () => {
      await perform();
      state.talked = true;
      event('topic-kept', { id });
      refreshObjective();
      if (state.phase === 'cinematic' && state.story === 'investigate') reopenTopics();
    };
    $('topic-list').append(b);
    return b;
  }
  function reopenTopics() {
    if (currentPerson && inRoom(currentPerson)) openTopics(currentPerson); else explore();
  }
  function openTopics(name) {
    currentPerson = name;
    $('topic-name').textContent = cast[name].name;
    $('topic-role').textContent = name === 'mira' && state.people.mira_admission ? 'Investigative journalist' : cast[name].role;
    acting.portrait('topic-portrait', name, { bust: true });
    $('topic-list').replaceChildren();
    $('observe-person').hidden = !observe11[name];
    $('observe-person').classList.toggle('done', !!state.observations[name]);
    if (state.noted) assembly.topics(name, topicButton);
    else for (const t of topics7[name] || []) topicButton(t.id, t.label, async () => {
      await dialogue(t.lines, `${cast[name].name.toUpperCase()} · ${t.label.toUpperCase()}`, { mode: 'conversation', person: name });
      person(t.id, name, t.remember);
    });
    phase('topics', 'topics', document.querySelector('#topic-list .topic-choice:not(.asked)') || document.querySelector('#topic-list .topic-choice') || $('close-topics'));
    face(name);
  }
  function face(name) { world.face('aren', name); world.face(name, 'aren'); }

  // Walk Aren onto a conversation mark if the pair overlap on screen or stand too close.
  async function approach(name) {
    const a = actors.aren, b = actors[name];
    if (!inRoom(name) || b.moving) return;
    const dx = a.x - b.x, dz = a.z - b.z, sx = dx * .83844 - dz * .54499;
    if (Math.hypot(dx, dz) > .95 && Math.abs(sx) > .75) return;
    for (const side of [Math.sign(sx) || 1, -(Math.sign(sx) || 1)]) {
      const tx = b.x + side * 1.2 * .83844, tz = b.z - side * 1.2 * .54499;
      if (world.free(tx, tz, [name])) { phase('cinematic'); await world.walk('aren', [{ x: tx, z: tz }], { speed: 3 }); world.face('aren', name); return; }
    }
  }

  function openObserve(name) {
    const o = observe11[name];
    if (!o) return;
    observing = name; selectedDetail = null;
    $('observe-name').textContent = cast[name].name;
    $('observe-title').textContent = 'A closer look';
    $('observe-intro').textContent = o.intro;
    $('observe-description').textContent = 'Choose something you can see.';
    $('remember-observe').disabled = true;
    $('remember-observe').firstElementChild.textContent = state.observations[name] ? 'Already noted · keep again' : 'Keep the detail';
    const spots = $('observe-spots'), list = $('observe-details');
    spots.replaceChildren(); list.replaceChildren();
    o.details.forEach((d, i) => {
      const spot = document.createElement('button');
      spot.className = 'spot'; spot.type = 'button'; spot.textContent = String(i + 1);
      spot.style.left = d.x + '%'; spot.style.top = d.y + '%';
      spot.setAttribute('aria-label', d.label);
      spot.onclick = () => pick(d, i);
      spots.append(spot);
      const b = document.createElement('button');
      b.className = 'observe-detail'; b.textContent = d.label; b.dataset.detail = d.id; b.dataset.n = String(i + 1);
      b.onclick = () => pick(d, i);
      list.append(b);
    });
    phase('observe', 'observe-panel');
    // A fixed, neutral pose, so the places to look sit on the figure itself.
    acting.portrait('observe-portrait', name, { full: true, expression: o.pose });
    requestAnimationFrame(() => {
      const region = $('observe-portrait').querySelector('.portrait-region');
      const box = spots.getBoundingClientRect(), r = region.getBoundingClientRect();
      [...spots.children].forEach((el, i) => {
        el.style.left = (r.left - box.left + o.details[i].x / 100 * r.width) + 'px';
        el.style.top = (r.top - box.top + o.details[i].y / 100 * r.height) + 'px';
      });
      spots.firstElementChild?.focus();
    });
    event('observe-open', { person: name });
  }
  function pick(d, i) {
    selectedDetail = d.id;
    document.querySelectorAll('#observe-details button').forEach((b, j) => b.classList.toggle('selected', j === i));
    document.querySelectorAll('#observe-spots .spot').forEach((s, j) => { s.classList.toggle('selected', j === i); if (j === i) s.classList.add('seen'); });
    $('observe-description').textContent = d.text;
    $('remember-observe').disabled = false;
    audio.effect('sfx_ui_soft_select', { gain: .25 });
    event('observe-detail', { id: d.id, person: observing });
  }
  async function remember() {
    if (!selectedDetail || state.phase !== 'observe') return;
    const name = observing, o = observe11[name], first = !state.observations[name];
    state.observed = true; state.observations[name] = true;
    person(name + '_observation', name, o.remember);
    event('observation-kept', { id: selectedDetail, person: name });
    audio.effect('sfx_clue_record', { gain: .45 });
    toast('NOTED', o.details.find(d => d.id === selectedDetail).label);
    if (first) await dialogue(o.after.map(l => typeof l === 'string' ? l : l.line_id), `${cast[name].name.toUpperCase()} · A SMALL DETAIL`, { mode: 'internal', person: name });
    refreshObjective();
    if (inRoom(name)) openTopics(name); else explore();
  }

  // ------------------------------------------------------------------ Four Knocks (9:14)
  async function knocks() {
    if (knock.active) return;
    knock.active = true;
    state.preMurderSeconds = state.time - (state.startedAt || 0);
    state.story = 'knocks';
    chapter('FOUR_KNOCKS');
    cue('four_knocks_silence');
    clock('9:14 PM', 'FOUR KNOCKS');
    phase('knocks', 'knock-stage');
    presentation.atmosphere('four_knocks', { speed: 1.6 });
    $('sound-caption').textContent = '';
    $('knock-time').textContent = '9:14 PM';
    director.listeningFrame();
    await wait(1400);
    state.knockAnchor = { x: 5.05, y: 4.35, z: -4.95 };
    const marks = $('knock-marks');
    marks.classList.remove('cold'); marks.dataset.count = '0'; marks.classList.add('on');
    await audio.effect('sfx_four_knocks_master', { pan: .4, gain: 1 });
    knock.at = state.time;
    event('knocks-start', { downstairs: Object.keys(actors).filter(n => actors[n].room === 'lounge') });
  }
  function onKnock(n) {
    const marks = $('knock-marks');
    marks.dataset.count = String(n);
    presentation.pulse(n === 4 ? 1 : .55);
    state.rainDip = n === 4 ? .22 : .5;
    camera.jolt(n === 4 ? .2 : .08);
    if (n === 1) {
      world.look('aren', 'stairs', { back: true });
      world.look('ada', 'stairs'); acting.hold('ada', 'up');
      world.look('mira', 'stairs'); acting.hold('mira', 'up'); state.expressions.mira = 'alert';
    }
    if (n === 4) {
      world.look('mira', 'stairs'); acting.hold('mira', 'up'); acting.gesture('mira', 'take');
      acting.gesture('ada', 'take'); state.expressions.ada = 'uneasy';
      // Ada is the first to move: half a step toward the stairs, before anyone speaks.
      const a = actors.ada, dx = 5.05 - a.x, dz = -.55 - a.z, d = Math.hypot(dx, dz) || 1;
      world.walk('ada', [{ x: a.x + dx / d * .45, z: a.z + dz / d * .45 }], { speed: .7 }).then(() => world.look('ada', 'stairs'));
      state.expressions.elias = 'concerned';
    }
    event('knock', { number: n, downstairs: Object.keys(actors).filter(k => actors[k].room === 'lounge') });
  }
  function updateKnocks() {
    if (state.phase !== 'knocks' || knock.at === Infinity || knock.done) return;
    const age = state.time - knock.at, offsets = audio.manifest.knockOffsets;
    while (knock.count < 4 && age >= offsets[knock.count]) { knock.count++; onKnock(knock.count); knock.captionFor = knock.count; knock.captionAt = age + .16; }
    if (knock.captionFor && age >= knock.captionAt) {
      $('sound-caption').textContent = knock.captionFor === 4 ? '[The fourth knock · upstairs]' : '[A knock · upstairs]';
      $('sound-caption').dataset.knock = String(knock.captionFor);
      knock.captionFor = 0;
    }
    // "I looked up after the first."
    if (!knock.eliasLooked && age >= offsets[0] + .38) { knock.eliasLooked = true; world.look('elias', 'stairs'); acting.hold('elias', 'up'); }
    if (age > 2.85 && age < offsets[3]) $('sound-caption').textContent = '';
    // In the pause Mira glances back down; the last knock makes her look up again.
    if (!knock.miraGlance && age >= offsets[2] + .75) { knock.miraGlance = true; world.face('mira', 'aren'); acting.hold('mira', null); }
    if (!knock.gapPushed && age >= offsets[2] + .3) { knock.gapPushed = true; camera.push(.035, 2.0); }
    if (age >= offsets[3] + 1.6) { knock.done = true; afterKnocks(); }
  }
  async function afterKnocks() {
    phase('cinematic');
    director.cue('post_knocks');
    cue('post_knocks');
    record('knocks', { label: 'Four Knocks', detail: 'Heard upstairs at 9:14 PM. Three even knocks, a pause, then a fourth. The person making them is unknown.' });
    timeline('knocks', '9:14 PM', 'Four knocks from upstairs. Mira, Ada, Elias and Aren were all in the lounge.', 'heard');
    $('knock-marks').classList.remove('on');
    state.knockAnchor = null;
    presentation.atmosphere('body_discovery', { speed: 1.2 });
    await dialogue(['s7_02', 's7_03', 's7_04', 's7_05'], '9:14 PM · EVERYONE HEARD IT', { person: 'mira', noShot: true });
    for (const n of ['mira', 'ada', 'elias']) acting.hold(n, null);
    state.story = 'followAda';
    chapter('DISCOVERY');
    world.walk('ada', adaToStairs(), { roomAfter: 'corridor' });
    objective('Follow Ada upstairs.');
    progress();
    explore();
  }
  // Ada's way to the stairs from wherever the evening left her.
  function adaToStairs() {
    const a = actors.ada, path = [];
    if (a.z > 2.4) path.push({ x: 2.1, z: 2.9 }, { x: 2.1, z: .5 });
    path.push({ x: 3.4, z: -.3 }, { x: 5.05, z: -.55 }, { x: 5.05, z: -4.6, y: 3 }, { x: 5.05, z: -6.6, y: 4.3 });
    return path;
  }

  // ------------------------------------------------------------------ the door and the body
  async function upstairs() {
    state.story = 'checkingDoor';
    phase('cinematic');
    await world.waitFor('ada');
    // Aren climbs after Ada: the stair passes through the lounge wall and out of the corridor's well.
    await world.passage.stairsUp({ time: '9:16 PM', label: 'Outside Victor’s room', enter: [{ x: -4.95, z: .45 }], onArrive: () => world.place('ada', .2, -1.95, 'corridor') });
    clock('9:16 PM', 'OUTSIDE VICTOR’S ROOM');
    presentation.atmosphere('body_discovery');
    director.direct();
    await director.corridorArrival();
    audio.effect('sfx_old_house_creak_01', { gain: .35, pan: -.25 });
    await dialogue(['s7_06'], '9:16 PM · NO ANSWER', { mode: 'incidental', person: 'ada', noShot: true });
    phase('cinematic');
    world.look('ada', 'door');
    audio.effect('sfx_door_handle_locked', { pan: .2 });
    await wait(900);
    await dialogue(['s7_07'], '9:16 PM · A SEPARATE LATCH', { person: 'ada' });
    timeline('door', '9:16 PM', 'Ada called through the shut door and tried its handle. No answer.', 'account');
    phase('cinematic');
    clock('9:18 PM', 'OUTSIDE VICTOR’S ROOM');
    await director.othersArrive();
    await dialogue(['s7_08', 's7_09'], '9:18 PM · AT THE DOOR', { person: 'mira' });
    state.story = 'atDoor';
    objective('Check Victor’s door.');
    explore();
  }
  async function openDoor() {
    state.story = 'discovery';
    await dialogue(['s7_10'], '9:20 PM · THE CLOSED DOOR', { mode: 'incidental', person: 'ada', noShot: true });
    phase('cinematic');
    state.expressions.elias = 'helpful';
    await director.forceDoor();
    await director.revealRoom();
    state.expressions = { ...state.expressions, aren: 'grave', mira: 'concerned', ada: 'shock', elias: 'shock' };
    event('discovery');
    await director.bodyCheck();
    await dialogue(['s7_11', 's7_12'], '9:20 PM · VICTOR SOREN', { person: 'elias', noShot: true });
    timeline('discovery', '9:20 PM', 'The door was forced. Victor was on the floor and not breathing.', 'physical');
    clock('9:22 PM', 'AN ASSUMPTION');
    await dialogue(['s7_14'], '9:22 PM · AN ASSUMPTION, NOT A FACT', { person: 'mira', noShot: true });
    timeline('assumption', '9:22 PM', 'Mira: if the knocks were Victor, he was alive at 9:14. Not established.', 'claim');
    clock('9:25 PM', 'HELP IS DELAYED');
    await dialogue(['s7_16'], '9:25 PM · THE STORM', { person: 'ada', noShot: true });
    timeline('help', '9:25 PM', 'The road is blocked. Help cannot reach the house tonight.', 'account');
    await director.leaveCrimeScene();
    state.story = 'investigate';
    chapter('WATCH');
    Object.assign(state.expressions, { aren: 'neutral', mira: 'concerned', ada: 'guarded', elias: 'concerned' });
    objective('Find what does not fit.');
    explore();
  }

  // ------------------------------------------------------------------ the watch
  function openWatch() {
    if (!state.evidence.watch) clock('9:27 PM', 'A CLOSER LOOK');
    state.expressions.aren = 'thinking';
    presentation.atmosphere('watch');
    presentation.focus({ x: .28, y: .2, z: .74 }, .2, .5);
    audio.effect('sfx_watch_inspect');
    const lc = lookCloser.watch;
    openEvidence('watch', {
      art: watchArt, place: 'VICTOR’S WRIST', title: 'A stopped watch.',
      text: 'Victor’s mechanical watch stopped at about 9:08. On its own, that cannot say when he died.',
      spots: lc.spots, kept: !!state.evidence.watch,
      onKeep: keepWatch, onReturn: explore
    });
  }
  async function keepWatch() {
    record('watch', { label: '9:08', detail: 'Victor’s cracked mechanical wristwatch stopped at approximately 9:08 PM. This alone does not establish a time of death.' });
    timeline('watch', '9:08 PM', 'Victor’s mechanical watch stopped. Its glass is cracked.', 'physical');
    clock('9:27 PM', 'A STOPPED WATCH');
    event('watch-kept');
    toast('KEPT', '9:08 · the stopped watch');
    progress();
    phase('cinematic');
    presentation.focus(null);
    await wait(450);
    await dialogue(['s7_18', 's81_watch'], '9:27 PM · SIX MINUTES APART', { mode: 'internal', person: 'aren' });
    refreshObjective();
    explore();
  }

  // ------------------------------------------------------------------ Case Note 01 and the aha
  async function fileFirstNote() {
    if (state.noted) return;
    state.noted = true;
    cue('deduction');
    event('conclusion-confirmed');
    progress();
    caseFile.render();
    presentation.atmosphere('deduction');
    phase('aha', 'aha-stage');
    const stageEl = $('aha-stage');
    stageEl.dataset.beat = 'watch'; event('aha-beat', { beat: 'watch' });
    audio.effect('sfx_case_note_confirm', { gain: .45 });
    director.cue('case1_connection');
    await wait(1200);
    stageEl.dataset.beat = 'knocks'; event('aha-beat', { beat: 'knocks' });
    await wait(1000);
    stageEl.dataset.beat = 'relationship'; event('aha-beat', { beat: 'relationship' });
    await wait(1000);
    director.cue('case1_break');
    state.expressions.aren = 'surprised';
    stageEl.dataset.beat = 'realization'; event('aha-beat', { beat: 'realization' });
    audio.effect('mus_deduction_sting', { gain: .5 });
    $('aha-caution').textContent = lineById.s81_aha.text;
    const voice = await audio.speak(lineById.s81_aha);
    state.heardLines.push('s81_aha');
    await wait(Math.max(3500, (voice.duration || 0) * 1000 + 300));
    state.expressions.aren = 'serious';
    clock('9:30 PM', 'SIX MISSING MINUTES');
    assembly.investigationOpen();
  }

  // ------------------------------------------------------------------ objectives
  function refreshObjective() {
    if (state.story !== 'investigate') return;
    if (!state.noted) {
      if (!state.evidence.watch) return objective('Find what does not fit.');
      if (!state.talked && !state.observed) return objective('Ask the others downstairs what they heard.');
      if (!state.talked) return objective('Ask someone what they heard.');
      if (!state.observed) return objective('Look closer at someone. (O)');
      return objective('Compare the two times in your case file. (N)');
    }
    objective(assembly.objective());
  }

  // ------------------------------------------------------------------ targets
  function target() {
    if (state.phase !== 'explore') return null;
    const list = [];
    const add = (kind, id, x, z, label, detail, range = 1.35, y) => list.push({ kind, id, x, z, y, label, detail, range, distance: Math.hypot(actors.aren.x - x, actors.aren.z - z) });
    const s = state.story, room = state.room;
    if (room === 'lounge' && s === 'followAda') add('stairs', 'stairs', 3.1, -.4, 'Follow Ada upstairs', 'VICTOR’S ROOM', 1.5, 2.6);
    if (room === 'corridor' && s === 'atDoor') add('door', 'door', 1.55, -1.65, 'Check the door', 'NO ANSWER', 1.4, 2.6);
    if (s === 'investigate') {
      if (room === 'victor') {
        add('watch', 'watch', .25, 1.75, 'Examine the watch', state.evidence.watch ? 'OBSERVATION KEPT' : 'A CLOSER LOOK', 1.3, 1.1);
        add('exit', 'door', -4.5, 3.55, 'Upper corridor', 'LEAVE THE ROOM', 1.0, 2.2);
      }
      if (room === 'corridor') {
        add('enter', 'door', 1.55, -1.65, 'Victor’s room', 'ENTER', 1.3, 2.6);
        add('lounge', 'stairs', -4.7, 1.5, 'Downstairs', 'LOUNGE', 1.25, 2.2);
      }
      if (room === 'lounge') add('upper', 'stairs', 3.1, -.4, 'Upstairs', 'UPPER CORRIDOR', 1.45, 2.6);
      for (const n of ['mira', 'ada', 'elias']) {
        const a = actors[n];
        if (a.room === room && !a.moving) add('talk', n, a.x, a.z, 'Talk to ' + cast[n].name.split(' ')[0], 'E · TALK   O · LOOK CLOSER', 1.45, a.h / .837 + .25);
      }
    }
    if (examineStories.includes(s) && room === 'lounge') for (const e of examines) add('examine', e.id, e.x, e.z, e.label, e.detail, e.range, e.mark[1] + .35);
    assembly.targets(add);
    const best = list.filter(t => t.distance <= t.range).sort((a, b) => a.distance - b.distance)[0] || null;
    if (best?.kind === 'examine') { const e = examines.find(x => x.id === best.id); best.x = e.mark[0]; best.z = e.mark[2]; best.y = e.mark[1] + .35; }
    return best;
  }
  function markers() {
    const list = [];
    if (state.story === 'investigate' && state.room === 'victor' && !state.evidence.watch) list.push({ x: .28, y: .3, z: .74 });
    list.push(...assembly.markers());
    if (examineStories.includes(state.story) && state.room === 'lounge') for (const e of examines) if (!state.examined[e.id]) list.push({ x: e.mark[0], y: e.mark[1], z: e.mark[2], done: true });
    return list;
  }

  async function interact() {
    const t = target();
    if (!t) return;
    state.hints.interacted = true;
    event('interact', { kind: t.kind, id: t.id });
    if (await assembly.interact(t)) return;
    audio.effect('sfx_ui_soft_select', { gain: .35 });
    switch (t.kind) {
      case 'examine': {
        const e = examines.find(x => x.id === t.id);
        state.examined[e.id] = true;
        world.look('aren', { x: e.mark[0], z: e.mark[2] });
        await dialogue([e.line.line_id], e.label.toUpperCase(), { mode: 'internal', person: 'aren' });
        explore(); break;
      }
      case 'stairs': await upstairs(); break;
      case 'door': await openDoor(); break;
      case 'watch': openWatch(); break;
      case 'talk': await approach(t.id); openTopics(t.id); break;
      // Step 12: rooms are left and entered on foot, through their real doors and stairs.
      case 'exit': phase('cinematic'); await world.passage.outOf202(); explore(); break;
      case 'enter': phase('cinematic'); await world.passage.into202(); explore(); break;
      case 'lounge': phase('cinematic'); await world.passage.stairsDown(); explore(); break;
      case 'upper': phase('cinematic'); await world.passage.stairsUp(); explore(); break;
    }
  }

  // ------------------------------------------------------------------ closing panels
  function back() {
    const p = state.phase;
    if (p === 'observe') { if (observing && inRoom(observing) && state.observeFromTopics) openTopics(observing); else explore(); return; }
    if (p === 'clue') { presentation.focus(null); if (!assembly.closeClue()) explore(); return; }
    if (['topics', 'notes', 'desk'].includes(p)) { assembly.closeDesk?.(); explore(); }
  }

  // ------------------------------------------------------------------ sound and hints
  function updateAudioButton() { const b = $('audio-toggle'); if (!b) return; b.querySelector('span').textContent = audio.muted ? 'Sound off' : 'Sound on'; b.setAttribute('aria-pressed', String(!audio.muted)); }
  function mute() { audio.setMuted(!audio.muted); updateAudioButton(); }
  document.querySelector('body > footer .controls').innerHTML = `
    <span class="hint" data-hint="move" hidden><b>WASD</b> Walk</span>
    <span class="hint" data-hint="interact" hidden><b>E</b> Interact</span>
    <span class="hint" data-hint="observe" hidden><b>O</b> Look closer</span>
    <button id="notes-toggle" data-hint="notes" hidden><b>N</b> Case file</button>
    <button id="audio-toggle" aria-pressed="true"><b>M</b> <span>Sound on</span></button>`;
  state.hints = {};
  function hints() {
    if (state.phase !== 'explore') return;
    const t = target();
    const show = {
      move: state.movedDistance < 2.5 && state.time - state.exploreSince < 30,
      interact: !!t && !state.hints.interacted,
      observe: t?.kind === 'talk',
      notes: !!state.evidence.knocks
    };
    const signature = JSON.stringify(show);
    if (signature === lastHints) return;
    lastHints = signature;
    for (const [k, v] of Object.entries(show)) { const el = document.querySelector(`[data-hint="${k}"]`); if (el) el.hidden = !v; }
  }

  // ------------------------------------------------------------------ input
  function focusables() {
    const panel = panels.find(p => !p.hidden);
    return panel ? [...panel.querySelectorAll('button:not(:disabled),input')].filter(x => !x.hidden && x.offsetParent !== null) : [];
  }
  function handleKey(e) {
    const k = e.key.toLowerCase();
    if (k === 'm' && !e.repeat && state.phase !== 'intro') { mute(); e.preventDefault(); return true; }
    if (e.repeat && ['e', 'n', 'o', 'enter', 'escape', ' '].includes(k)) { e.preventDefault(); return true; }
    if (state.phase === 'intro') return false;
    if (state.phase === 'opening') {
      if (k === 'escape') director.skipOpening(true);
      else if (['enter', ' ', 'e'].includes(k)) director.skipOpening(false);
      e.preventDefault(); return true;
    }
    if (k === 'tab' && state.phase !== 'explore') {
      const items = focusables();
      if (items.length) { const at = items.indexOf(document.activeElement), next = e.shiftKey ? (at <= 0 ? items.length - 1 : at - 1) : (at + 1) % items.length; items[next].focus(); }
      e.preventDefault(); return true;
    }
    const onButton = document.activeElement?.tagName === 'BUTTON' && !document.activeElement.disabled;
    if (state.phase === 'dialogue') {
      if (['enter', ' '].includes(k) && ['auto-lines', 'skip-exchange'].includes(document.activeElement?.id)) return false;
      if (['enter', ' ', 'e'].includes(k)) { advance(); e.preventDefault(); return true; }
      if (k === 'escape') { advance(true); e.preventDefault(); return true; }
      return true;
    }
    if (k === 'escape' && BACKDROP.includes(state.phase)) { back(); e.preventDefault(); return true; }
    if (state.phase === 'notes' && k === 'n') { back(); e.preventDefault(); return true; }
    if (state.phase === 'clue' && k === 'enter') { if (!onButton) assembly.keepClue(); else if (document.activeElement.id === 'keep-clue') { assembly.keepClue(); e.preventDefault(); } return true; }
    if (state.phase === 'observe' && k === 'enter') { if (!onButton || document.activeElement.id === 'remember-observe') { remember(); e.preventDefault(); } return true; }
    if (state.phase === 'topics' && k === 'o' && observe11[currentPerson]) { state.observeFromTopics = true; openObserve(currentPerson); e.preventDefault(); return true; }
    if (state.phase === 'explore') {
      if (k === 'e') { interact(); e.preventDefault(); return true; }
      if (k === 'n') { openNotes(); e.preventDefault(); return true; }
      if (k === 'o') { const t = target(); if (t?.kind === 'talk') { state.observeFromTopics = false; approach(t.id).then(() => openObserve(t.id)); } e.preventDefault(); return true; }
    }
    if (assembly.handleKey(e)) return true;
    return state.phase !== 'explore';
  }

  // ------------------------------------------------------------------ frame update
  function update() {
    assembly.update();
    if (current) {
      const age = state.time - current.lineAt;
      if (!current.voiceStarted && age >= current.pre) {
        const c = current, line = lineById[c.ids[c.index]], id = state.lineId;
        c.voiceStarted = true;
        if (c.vo) audio.speak(line).then(info => { if (current === c && state.lineId === id) c.duration = c.pre + Math.max(c.readTime, info.duration || 0) + c.post; });
      }
      $('advance-line').disabled = age < .55 + current.pre * .5;
      $('skip-exchange').disabled = age < 1.0;
      $('line-progress-fill').style.width = Math.min(100, age / current.duration * 100) + '%';
      if (auto && age >= current.duration) advance();
    }
    updateKnocks();
    if (++hintTick % 12 === 0) hints();
  }

  // ------------------------------------------------------------------ the shared stage
  const stage = { state, keys, actors, world, acting, audio, presentation, camera, life, echoes, rooms, dressing, upper,
    phase, objective, clock, chapter, cue, event, timeline, record, person, toast, dialogue, transition, explore, progress,
    openEvidence, evidencePanel, board, lineById, knocks, refreshObjective, openNotes, reopenTopics, openTopics, approach, caseFile,
    visible, requirements, updateAudioButton };
  const director = createDirector({ state, actors, world, acting, audio, presentation, camera, life, rooms, stage });
  stage.director = director;
  const assembly = createAssembly(stage);

  $('begin-chapter').onclick = () => assembly.begin();
  $('advance-line').onclick = () => advance();
  $('skip-exchange').onclick = () => advance(true);
  $('auto-lines').onclick = () => { auto = !auto; $('auto-lines').setAttribute('aria-pressed', String(auto)); };
  $('examine').onclick = interact;
  $('notes-toggle').onclick = () => openNotes();
  $('audio-toggle').onclick = mute;
  $('observe-person').onclick = () => { state.observeFromTopics = true; openObserve(currentPerson); };
  $('remember-observe').onclick = remember;
  $('keep-clue').onclick = () => assembly.keepClue();
  for (const id of ['close-topics', 'close-observe', 'close-notes', 'return-lounge', 'close-clue', 'close-desk']) $(id).onclick = back;
  $('restart-game').onclick = () => location.reload();

  clock('6:32 PM', 'ARRIVAL');
  objective('Get your bearings.');
  phase('intro', 'chapter-intro', 'begin-chapter');
  progress();
  updateAudioButton();
  return { update, handleKey, target, markers, interact };
}
