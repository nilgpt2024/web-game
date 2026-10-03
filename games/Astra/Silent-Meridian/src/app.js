import { freshState, loadState, saveState, addNote, placeSymbol, turnTide, tidePlan, solvePuzzle, allCalibrated, canFinish, finish, mod, TIDE_INITIAL, SYMBOL_IDS, ROOM_IDS } from './game.js';
import { words, rooms, notes, symbols, puzzleNotes, hints } from './content.js';
import { Atmosphere } from './audio.js';
import { SceneDepth } from './scene-depth.js';
import { CHAPTER_PUZZLES, selectChapter, submitChapterPuzzle, changeChapterPuzzle, resetChapterPuzzle, completeChapter } from './campaign.js';
import { expeditionView } from './expedition.js';

const app = document.querySelector('#app');
let storage;
try { storage = window.localStorage; } catch { storage = null; }
const loaded = loadState(storage, navigator.language.startsWith('zh') ? 'zh' : 'en');
let state = loaded.state;
let saveAvailable = loaded.available;
let screen = 'title';
let modal = null;
let selectedSlot = 0;
let journalFilter = 'all';
let toastTimer;
let lastFocus = null;
let noSaveShown = false;
const audio = new Atmosphere();
const sceneDepth = new SceneDepth(syncDepthControls);
const t = value => Array.isArray(value) ? value[state.lang === 'zh' ? 0 : 1] : (words[value]?.[state.lang === 'zh' ? 0 : 1] || value);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const prose = text => text.split('\n\n').map(p => `<p>${esc(p).replaceAll('\n', '<br>')}</p>`).join('');
const paths = {
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  book: '<path d="M12 5c-3-2-7-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-2-1-6-1-9 1Zm0 0v15"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  sound: '<path d="m11 5-5 4H3v6h3l5 4V5Zm4 3c3 2 3 6 0 8m3-11c5 4 5 10 0 14"/>',
  mute: '<path d="m11 5-5 4H3v6h3l5 4V5Zm5 4 5 6m0-6-5 6"/>',
  phase: '<circle cx="12" cy="12" r="8"/><path d="M12 4c-5 4-5 12 0 16M12 4v16"/>',
  settings: '<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3"/><circle cx="16" cy="17" r="3"/>',
  check: '<path d="m5 12 4 4 10-10"/>',
  eye: '<path d="M2 12S6 5 12 5s10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  dome: '<path d="M3 19h18M5 17v-5a7 7 0 0 1 14 0v5M12 5v12M5 12h14"/>',
  archive: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M5 9h14M5 15h14M10 6h4m-4 6h4m-4 6h4"/>',
  radio: '<path d="M3 12h2l2-6 4 12 3-15 3 17 2-8h2"/>',
  tide: '<path d="M2 8c4-6 6 6 10 0s6 6 10 0M2 16c4-6 6 6 10 0s6 6 10 0"/>',
  star: '<path d="m12 2 2 7 8 3-8 2-2 8-2-8-8-2 8-3Z"/>',
  reset: '<path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9 8a3 3 0 0 1 6 0c0 3-3 2-3 5m0 3v1"/>',
};
const icon = (name, cls = '') => `<svg class="icon ${cls}" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.star}</svg>`;
const logo = () => '<svg class="brand-mark" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width=".9" aria-hidden="true"><circle cx="24" cy="24" r="16"/><ellipse cx="24" cy="24" rx="8" ry="22" transform="rotate(28 24 24)"/><path d="M2 24h44M24 2v44"/><circle cx="24" cy="24" r="2" fill="currentColor"/></svg>';
const button = (label, action, cls = '', extra = '') => `<button class="${cls}" data-action="${action}" data-focus="${action}" ${extra}>${label}</button>`;
const countSolved = () => Object.values(state.solved).filter(Boolean).length;
const currentPhase = () => state.campaign.active === 1 ? state.phase : state.campaign.chapters[state.campaign.active].phase;
const expedition = () => expeditionView(state, {t, esc, prose, button, icon, logo, commonTools});

function enterChapter(id) {
  if (!selectChapter(state, id)) return;
  const first = !state.started;
  state.started = true;
  journalFilter = 'all'; selectedSlot = 0; modal = null;
  if (id === 1) {
    screen = state.ending ? 'ending' : 'game';
    if (first) {addNote(state, 'welcome'); state.visits.push('observatory'); modal = {type:'briefing'};}
  } else {
    const chapter = state.campaign.chapters[id];
    screen = chapter.complete ? 'ending' : 'game';
    if (!chapter.complete && !chapter.inspected.length && !Object.values(chapter.solved).some(Boolean)) modal = {type:'chapter-briefing'};
  }
  persist(); render();
}

function persist() {
  saveAvailable = saveState(storage, state);
  if (!saveAvailable && !noSaveShown) { noSaveShown = true; toast(t('noSave'), 6500); }
}
function toast(message, duration = 3000) {
  const el = document.querySelector('#toast');
  clearTimeout(toastTimer); el.textContent = message; el.classList.add('visible');
  toastTimer = setTimeout(() => el.classList.remove('visible'), duration);
}
function openModal(type, id = null) {
  lastFocus = document.activeElement?.dataset.focus;
  modal = { type, id };
  render();
}
function closeModal() {
  modal = null; render();
  if (lastFocus) [...app.querySelectorAll('[data-focus]')].find(el => el.dataset.focus === lastFocus)?.focus();
}
function visit(room) {
  state.room = room;
  if (!state.visits.includes(room)) state.visits.push(room);
  persist(); render(); audio.tone(150, .2, 0, .1);
}
function shift() {
  const target = state.campaign.active === 1 ? state : state.campaign.chapters[state.campaign.active];
  target.phase = target.phase === 'present' ? 'echo' : 'present';
  audio.shift(); persist(); render();
}

function sceneHTML() {
  const room = screen === 'title' ? 'observatory' : state.room;
  return `<div class="stage ${screen === 'title' ? 'title-stage' : ''} ${state.phase === 'echo' && screen !== 'title' ? 'is-echo' : ''}" aria-hidden="${screen === 'title'}">
    <div class="world" id="world"><img class="scene-image" id="scene-image" src="./assets/${room}.png" alt="${esc(t(rooms[room].description))}" draggable="false">${screen === 'game' ? hotspotHTML() : ''}</div>
    <div class="scene-vignette"></div><div class="mist mist-one"></div><div class="mist mist-two"></div>
    <div class="dust">${Array.from({length: 15}, (_, i) => `<i style="--x:${(i * 137.51) % 100}%;--delay:${-i * 2.7}s;--duration:${16 + i % 6 * 3}s"></i>`).join('')}</div>
    ${state.phase === 'echo' && screen !== 'title' ? '<div class="echo-grain"></div><div class="echo-line"></div>' : ''}
  </div>`;
}

function hotspotHTML() {
  const room = rooms[state.room], phase = state.phase === 'echo' ? 1 : 0;
  const isSolved = room.puzzle === 'meridian' ? state.anchor : state.solved[room.puzzle];
  const points = [
    { action: `puzzle:${room.puzzle}`, position: room.point, label: words[`${room.puzzle}Title`], icon: isSolved ? 'check' : 'star', done: isSolved },
    { action: `note:${room.note[phase]}`, position: phase ? room.echoPoint : room.notePoint, label: notes[room.note[phase]].title, icon: 'eye', done: state.notes.includes(room.note[phase]) },
  ];
  if (state.room === 'observatory') points.push({ action: 'note:meridian-rule', position: [90, 70], label: notes['meridian-rule'].title, icon: 'eye', done: state.notes.includes('meridian-rule') });
  // The dome's echo letter and inscription share the telescope area; separate their markers.
  if (state.room === 'observatory' && phase) points[1].position = [17, 84];
  return `<div class="hotspots ${state.showHotspots ? 'show-markers' : ''}">${points.map(point => button(`<span class="point-mark">${icon(point.icon)}</span><span class="point-label">${esc(t(point.label))}${point.done ? `<small>${t('collected')}</small>` : ''}</span>`, point.action, `hotspot ${point.done ? 'done' : ''} ${point.position[0] > 75 ? 'edge-right' : point.position[0] < 25 ? 'edge-left' : ''}`, `style="left:${point.position[0]}%;top:${point.position[1]}%" aria-label="${esc(t(point.label))}"`)).join('')}</div>`;
}

function syncDepthControls(status) {
  const available = status !== 'unavailable';
  for (const control of app.querySelectorAll('[data-action="depth"]')) {
    control.disabled = !available;
    control.setAttribute('aria-pressed', String(available && state.depth));
    const description = t(!available ? 'depthUnavailable' : state.depth ? 'depthDisable' : 'depthEnable');
    control.setAttribute('aria-label', description);
    control.title = description;
    const label = control.querySelector('.depth-setting-label');
    if (label) label.textContent = description;
  }
  const description = app.querySelector('.depth-description');
  if (description) description.textContent = t(!available ? 'depthUnavailable' : status === 'still' ? 'depthStill' : 'depthDescription');
}

function depthControl(setting = false) {
  const cube = '<svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="m12 2 9 5v10l-9 5-9-5V7Z M3 7l9 5 9-5M12 12v10M7.5 4.5l9 5v5"/></svg>';
  const description = t(state.depth ? 'depthDisable' : 'depthEnable');
  return button(cube + (setting ? `<span class="depth-setting-label">${description}</span><b>3D</b>` : '<span>3D</span>'), 'depth', setting ? 'setting-row depth-setting' : 'depth-control', `aria-pressed="${state.depth}" aria-label="${description}" title="${description}"`);
}

function commonTools() {
  return `<div class="header-tools">${depthControl()}<div class="languages" role="group" aria-label="Language">${button('中', 'lang:zh', state.lang === 'zh' ? 'active' : '', `aria-pressed="${state.lang === 'zh'}" aria-label="切换至中文"`)}<span>/</span>${button('EN', 'lang:en', state.lang === 'en' ? 'active' : '', `aria-pressed="${state.lang === 'en'}" aria-label="Switch to English"`)}</div>${button(icon(state.sound ? 'sound' : 'mute'), 'sound', 'icon-button', `aria-label="${t(state.sound ? 'soundOn' : 'soundOff')}" title="${t(state.sound ? 'soundOn' : 'soundOff')}"`)}</div>`;
}

function titleHTML() {
  return `${sceneHTML()}<div class="title-shade"></div>
    <header class="topbar title-bar"><a class="brand" href="./" aria-label="Silent Meridian">${logo()}<span>SILENT MERIDIAN</span></a>${commonTools()}</header>
    <main class="title-content"><div class="eyebrow"><span class="line"></span>${esc(t('prologue'))}</div>
    <h1 class="${state.lang === 'zh' ? 'chinese-title' : ''}">${state.lang === 'zh' ? '静默<br>子午线' : 'SILENT<br>MERIDIAN'}</h1>
    <div class="title-caption">${state.lang === 'zh' ? 'S I L E N T  M E R I D I A N' : 'THE UNFINISHED NIGHT'}</div>
    <p class="tagline">${esc(t('tagline')).replace('\n', '<br>')}</p>
    ${button(`<span>${t(state.started ? 'resume' : 'enter')}</span>${icon('arrow')}`, 'start', 'primary enter-button')}
    <div class="title-meta">${esc(t('noTimer'))}</div><div class="campaign-title-meta">${t('campaignSubtitle')}</div>
    ${button(icon('archive') + t('chapters'), 'chapters', 'text-button title-chapters')}
    ${state.started ? button(t('newGame'), 'restart', 'text-button title-restart') : ''}
    </main><footer class="title-footer"><span>${esc(t('original'))}</span><span class="title-coordinate">09° 17′ N <b>／</b> TIME UNKNOWN</span><span>I <i>—</i> IV</span></footer>`;
}

function phaseHTML() {
  return `<div class="phase-wrap"><div class="phase-control" role="group" aria-label="${t('shift')}">${button(`<i></i>${t('present')}`, 'phase:present', state.phase === 'present' ? 'active' : '', `aria-pressed="${state.phase === 'present'}"`)}${button(`${icon('phase')}${t('echo')}`, 'phase:echo', state.phase === 'echo' ? 'active' : '', `aria-pressed="${state.phase === 'echo'}"`)}</div><span class="phase-shortcut">${t('shift')}</span></div>`;
}
function objective() { return t(state.ending ? 'objectiveDone' : state.anchor ? 'objectiveAnchor' : allCalibrated(state) ? 'objectiveFinal' : 'objectiveStart'); }

function gameHTML() {
  if (state.campaign.active > 1) return expedition().game(saveAvailable);
  const room = rooms[state.room];
  return `${sceneHTML()}
    <header class="topbar game-bar"><div class="brand compact">${logo()}<span>${esc(t('title'))}</span></div>${phaseHTML()}${commonTools()}</header>
    <main class="exploration"><div class="room-heading"><div class="eyebrow">${room.number} <span class="line"></span> ${esc(t(room.sub))}</div><h1>${esc(t(room.name))}</h1><p>${esc(t(room.description))}</p></div>
    <div class="station-clock"><span>${t(state.phase === 'echo' ? 'echoTime' : 'presentTime')}</span><strong>${state.ending ? '00:18' : state.phase === 'echo' ? '00:16' : '00:17'}</strong><div class="clock-rule"><i></i></div></div>
    <div class="mission"><div class="mission-signals">${['archive', 'radio', 'tide'].map(k => `<span class="signal-light ${state.solved[k] ? 'lit' : ''}" aria-label="${esc(t(`${k}Title`))}: ${state.solved[k] ? t('solved') : '—'}">${icon(k)}</span>`).join('')}<span>${countSolved()}<i>/</i>3</span></div><p>${esc(objective())}</p></div>
    </main>
    <div class="side-tools">${button(icon('book') + `<span>${t('journal')}</span><b>${state.notes.length}</b>`, 'journal', 'journal-button', `aria-label="${t('journal')}"`)}${button(icon('archive'), 'chapters', 'icon-button', `aria-label="${t('chapters')}"`)}${button(icon('help'), 'help', 'icon-button', `aria-label="${t('help')}"`)}${button(icon('settings'), 'settings', 'icon-button', `aria-label="${t('settings')}"`)}</div>
    <nav class="room-nav" aria-label="${t('map')}">${ROOM_IDS.map((id, i) => button(`<span class="nav-number">0${i + 1}</span>${icon(['dome', 'archive', 'radio', 'tide'][i])}<span>${esc(t(rooms[id].name))}</span>${state.solved[rooms[id].puzzle] || (id === 'observatory' && state.anchor) ? '<i class="nav-dot"></i>' : ''}`, `room:${id}`, state.room === id ? 'active' : '', `aria-current="${state.room === id ? 'location' : 'false'}"`)).join('')}</nav>
    <footer class="game-footer"><span>${t('credit')}</span><span>${saveAvailable ? '◦ ' + t('saved') : ''}</span></footer>`;
}

function dialSVG(value, total = 8, index = '') {
  const ticks = Array.from({length: total}, (_, n) => {
    const a = n / total * Math.PI * 2 - Math.PI / 2;
    return `<text x="${60 + Math.cos(a) * 47}" y="${63 + Math.sin(a) * 47}" text-anchor="middle" class="${value === n ? 'active-tick' : ''}">${n}</text>`;
  }).join('');
  return `<svg class="instrument-dial" viewBox="0 0 120 120" aria-hidden="true"><circle class="dial-outer" cx="60" cy="60" r="57"/><circle class="dial-inner" cx="60" cy="60" r="37"/>${ticks}<g class="needle" style="transform:rotate(${value / total * 360}deg)"><path d="M60 25 56 57 60 64 64 57Z"/><path d="M60 63v13"/></g><circle class="pin" cx="60" cy="60" r="4"/><text class="dial-roman" x="60" y="88" text-anchor="middle">${index}</text></svg>`;
}

function instrumentControls(kind, values, total, labels) {
  return `<div class="dials dials-${values.length}">${values.map((value, i) => `<div class="dial-unit"><div class="dial-label">${esc(labels[i])}</div>${dialSVG(value, total, kind === 'tide' ? ['I', 'II', 'III', 'IV'][i] : '')}<div class="dial-controls">${button('−', `dial:${kind}:${i}:-1`, 'dial-turn', `aria-label="${esc(labels[i])} ${t('turnMinus')}"`)}<output aria-label="${esc(labels[i])}">${value}</output>${button('+', `dial:${kind}:${i}:1`, 'dial-turn', `aria-label="${esc(labels[i])} ${t('turnPlus')}"`)}</div></div>`).join('')}</div>`;
}

function waveSVG() {
  const [a, b, c] = state.radio;
  const path = Array.from({length: 161}, (_, i) => `${i === 0 ? 'M' : 'L'}${i * 3},${(44 + Math.sin(i * (a + 1) * .045) * 15 + Math.sin(i * (b + 1) * .07) * 9 + Math.sin(i * (c + 1) * .04) * 8).toFixed(1)}`).join(' ');
  return `<div class="scope"><svg viewBox="0 0 480 88" aria-hidden="true"><defs><pattern id="scope-grid" width="24" height="22" patternUnits="userSpaceOnUse"><path d="M24 0H0V22" fill="none" stroke="currentColor" stroke-opacity=".1"/></pattern></defs><rect width="480" height="88" fill="url(#scope-grid)"/><path d="M0 44H480" stroke="currentColor" stroke-opacity=".12"/><path d="${path}" fill="none" stroke="currentColor" stroke-width="1.4"/></svg><span>RELAY / ${state.radio.map(v => '0' + v).join(' : ')}</span></div>`;
}

function archiveHTML() {
  return `<div class="arrival-slots">${state.archive.map((id, i) => button(`<span class="slot-number">0${i + 1}</span><strong>${id ? symbols[id].glyph : '·'}</strong><span class="slot-name">${id ? esc(t(symbols[id].name)) : t('empty')}</span>`, `slot:${i}`, `arrival-slot ${selectedSlot === i ? 'selected' : ''}`, `aria-label="${t('slot')} ${i + 1}: ${id ? esc(t(symbols[id].name)) : t('empty')}" aria-pressed="${selectedSlot === i}"`)).join('')}</div><div class="order-arrow"><span>01</span><i></i>${icon('arrow')}<span>05</span></div><div class="symbol-bank">${SYMBOL_IDS.map(id => button(`<strong>${symbols[id].glyph}</strong><span>${esc(t(symbols[id].name))}</span>`, `symbol:${id}`, state.archive.includes(id) ? 'placed' : '', `aria-label="${esc(t(symbols[id].name))}"`)).join('')}</div><p class="instrument-instruction">${t('archiveInstruction')}</p>`;
}

function meridianHTML() {
  const orbits = state.meridian.map((v, i) => {
    const r = [53, 83, 112][i], a = v / 8 * Math.PI * 2 - Math.PI / 2;
    return `<circle class="orbit" cx="140" cy="140" r="${r}"/><circle class="orbit-node node-${i}" cx="${140 + Math.cos(a) * r}" cy="${140 + Math.sin(a) * r}" r="5"/>`;
  }).join('');
  return `<div class="meridian-device"><svg class="meridian-orbits" viewBox="0 0 280 280" aria-hidden="true"><circle class="orbit-rim" cx="140" cy="140" r="133"/><path d="M140 0v280M0 140h280M41 41l198 198M239 41 41 239" class="orbit-axis"/>${Array.from({length: 8}, (_, n) => {const a = n / 8 * Math.PI * 2 - Math.PI / 2;return `<text x="${140 + Math.cos(a) * 126}" y="${143 + Math.sin(a) * 126}" text-anchor="middle">${n}</text>`;}).join('')}${orbits}<path class="meridian-star" d="m140 121 4 15 15 4-15 4-4 15-4-15-15-4 15-4Z"/></svg><div class="orbit-controls">${state.meridian.map((v, i) => `<div><label>${t(['inner', 'middle', 'outer'][i])}</label><div class="dial-controls">${button('−', `dial:meridian:${i}:-1`, 'dial-turn', `aria-label="${t(['inner', 'middle', 'outer'][i])} ${t('turnMinus')}"`)}<output>${v}</output>${button('+', `dial:meridian:${i}:1`, 'dial-turn', `aria-label="${t(['inner', 'middle', 'outer'][i])} ${t('turnPlus')}"`)}</div></div>`).join('')}</div></div><p class="instrument-instruction">${t('meridianInstruction')}</p>`;
}

function relatedNotesHTML(puzzle) {
  return `<details class="evidence-peek" id="evidence-peek"><summary>${icon('book')}${t('relatedNotes')}<span>+</span></summary><div>${puzzleNotes[puzzle].map(id => state.notes.includes(id) ? `<article><h4>${esc(t(notes[id].title))}</h4>${prose(t(notes[id].body))}</article>` : `<p class="missing-note">${t('missingNote')}${esc(t(notes[id].title))} · ${esc(t(rooms[notes[id].room].name))} / ${t(notes[id].phase)}</p>`).join('')}</div></details>`;
}

function hintHTML(puzzle) {
  const level = state.hints[puzzle];
  let text = '';
  if (level > 0) {
    text = t(hints[puzzle][level - 1]);
    if (puzzle === 'tide' && level === 3) {
      const plan = tidePlan(state.tide);
      text = plan?.cost ? `${t('tidePlan')} ${plan.presses.map((n, i) => n === 0 ? '' : `${'ABCD'[i]} ${n > 0 ? '+' : '−'} × ${Math.abs(n)}`).filter(Boolean).join(' · ')}` : t('tideHintReady');
    }
  }
  return `<div class="hint-area">${level ? `<p class="hint-copy"><span>${t('hintLevel')} ${level}/3</span>${esc(text)}</p>` : ''}${button(`${icon('help')}${t(level === 0 ? 'hint' : level === 3 ? 'lastHint' : 'nextHint')}`, `hint:${puzzle}`, 'text-button', level === 3 ? 'disabled' : '')}</div>`;
}

function puzzleHTML(puzzle) {
  const solved = puzzle === 'meridian' ? state.anchor : state.solved[puzzle];
  const main = puzzle === 'archive' ? archiveHTML() : puzzle === 'radio' ? waveSVG() + instrumentControls('radio', state.radio, 10, [1,2,3].map(n => `${t('band')} 0${n}`)) + button(icon('radio') + t('playSignal'), 'listen', 'text-button listen-button') + `<p class="tiny-copy">${t('signalVisual')}</p>` : puzzle === 'tide' ? instrumentControls('tide', state.tide, 8, ['A', 'B', 'C', 'D']) + `<div class="coupling"><span>${t('coupling')}</span><code>A → I + II<br>B → II + III<br>C → III + IV<br>D → I + 2 × IV</code></div><p class="instrument-instruction">${t('tideInstruction')}</p>` : meridianHTML();
  if (puzzle === 'meridian' && !allCalibrated(state)) {
    return `<div class="locked-orbit">${logo()}</div><p class="body-copy">${t('stillLocked')}</p><ul class="calibration-list">${['archive','radio','tide'].map(k=>`<li class="${state.solved[k]?'complete':''}">${icon(state.solved[k]?'check':k)}<span>${t(`${k}Title`)}</span><b>${state.solved[k]?'●':'○'}</b></li>`).join('')}</ul>${relatedNotesHTML(puzzle)}${button(t('returnExplore') + icon('arrow'), 'close', 'primary')}`;
  }
  if (solved) {
    if (puzzle === 'meridian') return `<div class="anchor-success">${logo()}<span>${t('solved')}</span></div><p class="body-copy">${t('anchored')}</p>${button(t(state.phase === 'echo' ? 'toPresent' : 'releaseTime') + icon('arrow'), state.phase === 'echo' ? 'shift' : 'final-choice', 'primary')}`;
    return `<div class="calibration-success">${icon('check')}<span>${t('solved')}</span></div><div class="body-copy">${prose(t(notes[`${puzzle}-result`].body))}</div>${button(t('returnExplore') + icon('arrow'), 'close', 'primary')}`;
  }
  return `<p class="puzzle-intro">${t(`${puzzle}Intro`)}</p><fieldset class="instrument">${main}</fieldset><div class="puzzle-feedback" id="puzzle-feedback" role="status" aria-live="polite"></div>
    ${puzzle === 'meridian' && state.phase !== 'echo' ? `<p class="phase-warning">${icon('phase')}${t('requireEcho')}</p>${button(t('toEcho') + icon('phase'), 'shift', 'primary')}` : `<div class="puzzle-actions">${button(icon('reset') + t('resetPuzzle'), `reset-puzzle:${puzzle}`, 'text-button')}${button(t({archive:'check',radio:'tune',tide:'calibrate',meridian:'align'}[puzzle]) + icon('arrow'), `check:${puzzle}`, 'primary')}</div>`}${hintHTML(puzzle)}${relatedNotesHTML(puzzle)}`;
}

function journalHTML() {
  if (state.campaign.active > 1) return expedition().journal();
  const visible = state.notes.filter(id => journalFilter === 'all' || notes[id].room === journalFilter);
  return `<div class="journal-tabs" role="group" aria-label="${t('evidence')}">${['all',...ROOM_IDS].map(id => button(id === 'all' ? t('allEvidence') : esc(t(rooms[id].name)), `filter:${id}`, journalFilter === id ? 'active' : '', `aria-pressed="${journalFilter === id}"`)).join('')}</div><div class="journal-layout"><div class="journal-entries">${visible.length ? visible.map((id,i)=>`<article class="journal-entry"><div class="entry-meta"><span>${String(state.notes.indexOf(id)+1).padStart(2,'0')} / ${esc(t(rooms[notes[id].room].name))}</span><span class="entry-phase">${icon('phase')}${t(notes[id].phase)}</span></div><h3>${esc(t(notes[id].title))}</h3>${prose(t(notes[id].body))}</article>`).join('') : `<p class="body-copy">${t('noNotes')}</p>`}</div><aside class="personal-notes"><label for="personal-note">${t('fieldNotes')}</label><textarea id="personal-note" maxlength="4000" placeholder="${esc(t('notesPlaceholder'))}">${esc(state.personalNote)}</textarea><small>${t('personalSaved')} <span id="personal-counter">${state.personalNote.length}/4000</span></small></aside></div>`;
}

function modalHTML() {
  if (!modal) return '';
  let title, eyebrow, content, cls = '';
  if (modal.type === 'chapters' || modal.type.startsWith('chapter-')) {
    const view = expedition().modal(modal.type, modal.id);
    if (!view) return '';
    ({title, eyebrow, content, cls} = view);
  } else if (modal.type === 'puzzle') {
    title = t(`${modal.id}Title`); eyebrow = `${t('inspect')} / ${t(rooms[state.room].name)}`; content = puzzleHTML(modal.id); cls = `puzzle-modal ${modal.id}-modal`;
  } else if (modal.type === 'note') {
    const note = notes[modal.id]; title = t(note.title); eyebrow = `${t(rooms[note.room].name)} / ${t(note.phase)}`;
    content = `<div class="note-sheet">${prose(t(note.body))}<div class="note-stamp">${t('recorded')} ${icon('check')}</div></div>${button(t('back') + icon('arrow'), 'close', 'primary')}`; cls = 'note-modal';
  } else if (modal.type === 'journal') {
    const c=state.campaign.chapters[state.campaign.active];
    const entries=c ? c.inspected.length + Object.values(c.solved).filter(Boolean).length + Number(Boolean(state.ending)) + [2,3].filter(id=>state.campaign.chapters[id].complete).length : state.notes.length;
    title = t('journal'); eyebrow = `${String(entries).padStart(2,'0')} ${t('collected')}`; content = journalHTML(); cls = 'journal-modal';
  } else if (modal.type === 'briefing' || modal.type === 'help') {
    title = t('briefingTitle'); eyebrow = 'PROLOGUE / 00:17'; content = `<div class="body-copy">${prose(t('briefingBody'))}</div><div class="control-guide">${icon('eye')}<p>${t('touchControls')}</p></div><p class="keyboard-guide">${t('controls')}</p>${button(t('beginInvestigation') + icon('arrow'), 'close', 'primary')}`;
  } else if (modal.type === 'settings') {
    title = t('settings'); eyebrow = 'SILENT MERIDIAN'; content = `<p class="body-copy">${t('settingsBody')}</p><div class="settings-list">${depthControl(true)}<p class="depth-description">${t('depthDescription')}</p>${button(icon(state.sound?'sound':'mute') + t(state.sound?'soundOn':'soundOff'), 'sound', 'setting-row')}${button(icon('eye') + t(state.showHotspots?'hideMarkers':'showMarkers'), 'markers', 'setting-row')}${button(icon('dome') + t('titleScreen'), 'title', 'setting-row')}${button(icon('reset') + t('newGame'), 'restart', 'setting-row')}</div>`;
  } else if (modal.type === 'restart') {
    title = t('resetTitle'); eyebrow = 'I — IV / 00:17'; content = `<p class="body-copy">${t('resetAllBody')}</p><div class="confirm-actions">${button(t('cancel'), 'close', 'text-button')}${button(t('confirmReset'), 'confirm-restart', 'primary')}</div>`;
  } else if (modal.type === 'final-choice') {
    title = t('finishTitle'); eyebrow = '00:17:59'; content = `<div class="body-copy">${prose(t('finishBody'))}</div><div class="ending-choices">${button(icon('radio')+t('keepEcho'),'finish:keep','primary')}${button(icon('phase')+t('releaseEcho'),'finish:release','secondary')}</div>`;
  }
  return `<dialog id="modal" class="modal ${cls}" aria-labelledby="dialog-title"><div class="modal-scroll"><header class="modal-header"><div><div class="eyebrow">${esc(eyebrow)}</div><h2 id="dialog-title" tabindex="-1">${esc(title)}</h2></div>${button(icon('close'), 'close', 'icon-button close-button', `aria-label="${t('close')}"`)}</header>${content}</div></dialog>`;
}

function endingHTML() {
  if (state.campaign.active > 1) return expedition().ending();
  return `${sceneHTML()}<div class="ending-shade"></div><header class="topbar">${logo()}${commonTools()}</header><main class="ending-content"><div class="eyebrow">I / IV · ${t('finished')}</div><div class="ending-clock">00:18</div><div class="line"></div><h1>${t(state.ending === 'keep' ? 'endKeepTitle' : 'endReleaseTitle')}</h1><div class="ending-copy">${prose(t(state.ending === 'keep' ? 'endKeep' : 'endRelease'))}</div><div class="ending-actions">${button(t('nextChapter')+icon('arrow'),'chapter-select:2','primary')}${button(t('reviewJournal')+icon('book'),'journal','text-button')}${button(t('exploreAfter')+icon('arrow'),'revisit','text-button')}</div></main>`;
}

function fitScene() {
  const img = app.querySelector('#scene-image'), world = app.querySelector('#world'), stage = app.querySelector('.stage');
  if (!img || !img.naturalWidth || !stage || !world) return;
  const {width:w,height:h} = stage.getBoundingClientRect();
  const contain = screen === 'game' && (innerWidth <= 700 || innerHeight <= 500 || w / h < 1.4);
  const scale = (contain ? Math.min : Math.max)(w / img.naturalWidth, h / img.naturalHeight);
  world.style.width = `${img.naturalWidth * scale}px`;
  world.style.height = `${img.naturalHeight * scale}px`;
  sceneDepth.resize();
}

function render() {
  const focused = document.activeElement?.dataset.focus;
  const previousModal = app.querySelector('#modal');
  const scrollTop = previousModal?.querySelector('.modal-scroll')?.scrollTop || 0;
  const openEvidence = app.querySelector('#evidence-peek')?.open;
  document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : 'en';
  document.documentElement.dataset.phase = screen === 'title' ? 'present' : currentPhase();
  document.body.dataset.screen = screen;
  document.body.dataset.chapter = String(state.campaign.active);
  document.title = `${t('title')} · ${state.lang === 'zh' ? 'Silent Meridian' : '静默子午线'}`;
  app.innerHTML = (screen === 'title' ? titleHTML() : screen === 'ending' ? endingHTML() : gameHTML()) + modalHTML();
  const img = app.querySelector('#scene-image');
  // Resolve the CSS backdrop against the page, including static-host subpaths.
  app.querySelector('.stage').style.setProperty('--room-art', `url("${img.src}")`);
  img.addEventListener('load', fitScene, { once: true }); fitScene();
  const room = img.getAttribute('src').split('/').pop().replace('.png', '');
  sceneDepth.attach(app.querySelector('#world'), {
    room, enabled: state.depth, paused: Boolean(modal),
    echo: screen !== 'title' && currentPhase() === 'echo',
    solved: screen === 'title' ? 0 : state.campaign.active === 1 ? countSolved() : Object.values(state.campaign.chapters[state.campaign.active].solved).filter(Boolean).length,
  });
  app.querySelector('.stage').dataset.depthPaused = String(Boolean(modal));
  if (modal) {
    const dialog = app.querySelector('#modal');
    dialog.showModal();
    dialog.addEventListener('cancel', event => {event.preventDefault(); closeModal();});
    dialog.addEventListener('click', event => {if(event.target === dialog) {const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeModal();}});
    dialog.querySelector('.modal-scroll').scrollTop = scrollTop;
    if (openEvidence && dialog.querySelector('#evidence-peek')) dialog.querySelector('#evidence-peek').open = true;
    const focusTarget = [...dialog.querySelectorAll('[data-focus]')].find(el => el.dataset.focus === focused);
    if (focusTarget && !focusTarget.disabled) focusTarget.focus({preventScroll:true}); else dialog.querySelector('#dialog-title')?.focus({preventScroll:true});
  }
}

app.addEventListener('click', async event => {
  const target = event.target.closest('[data-action]');
  if (!target || target.disabled) return;
  const [action, id, a, b] = target.dataset.action.split(':');
  if (!['sound','listen'].includes(action)) audio.tone(280, .07, 0, .05);
  if (action === 'lang') {state.lang = id; persist(); render();}
  else if (action === 'start') {
    audio.enable(state.sound); enterChapter(state.campaign.active);
  } else if (action === 'sound') {state.sound = !state.sound; await audio.enable(state.sound); persist(); render();}
  else if (action === 'chapters') openModal('chapters');
  else if (action === 'chapter-select') enterChapter(Number(id));
  else if (action === 'chapter-puzzle' && CHAPTER_PUZZLES[state.campaign.active]?.includes(id)) openModal('chapter-puzzle', id);
  else if (action === 'chapter-notes') {
    const chapter=state.campaign.chapters[state.campaign.active];
    if (chapter) {if(!chapter.inspected.includes(chapter.phase))chapter.inspected.push(chapter.phase);persist();openModal('chapter-notes');}
  }
  else if (action === 'chapter-change') {if(changeChapterPuzzle(state,id,Number(a),Number(b))) {state.moves++;persist();render();}}
  else if (action === 'chapter-reset') {if(resetChapterPuzzle(state,id)) {persist();render();}}
  else if (action === 'chapter-hint' && CHAPTER_PUZZLES[state.campaign.active]?.includes(id)) {const c=state.campaign.chapters[state.campaign.active];c.hints[id]=Math.min(3,c.hints[id]+1);persist();render();}
  else if (action === 'chapter-check') {
    if (submitChapterPuzzle(state,id)) {audio.success();persist();render();toast(t('mechanismRestored'));}
    else {const el=app.querySelector('#puzzle-feedback');if(el)el.textContent=t('wrong');audio.tone(95,.25,0,.18);}
  }
  else if (action === 'chapter-exit') openModal('chapter-exit');
  else if (action === 'chapter-final') {const c=state.campaign.chapters[4];if(state.campaign.active===4 && Object.values(c.solved).every(Boolean) && c.phase==='present')openModal('chapter-final');}
  else if (action === 'chapter-finish' && completeChapter(state,id)) {modal=null;screen='ending';persist();render();audio.success();}
  else if (action === 'room' && ROOM_IDS.includes(id)) visit(id);
  else if (action === 'phase') {if(currentPhase() !== id) shift();}
  else if (action === 'shift') shift();
  else if (action === 'note' && notes[id]) {const isNew = addNote(state, id); persist(); openModal('note', id); if(isNew)toast(t('recorded'));}
  else if (action === 'puzzle') {selectedSlot = 0; openModal('puzzle', id);}
  else if (action === 'journal') {journalFilter = 'all'; openModal('journal');}
  else if (action === 'filter') {journalFilter = id; render();}
  else if (action === 'help') openModal(state.campaign.active===1?'help':'chapter-briefing');
  else if (action === 'settings') openModal('settings');
  else if (action === 'depth') {state.depth = !state.depth; persist(); render();}
  else if (action === 'markers') {state.showHotspots = !state.showHotspots; persist(); render();}
  else if (action === 'close') closeModal();
  else if (action === 'title') {modal = null; screen = 'title'; render();}
  else if (action === 'restart') openModal('restart');
  else if (action === 'confirm-restart') {
    const {lang, sound, depth} = state; state = freshState(lang); state.sound = sound; state.depth = depth; state.started = true; state.visits = ['observatory']; addNote(state,'welcome');
    screen = 'game'; modal = {type:'briefing'}; selectedSlot = 0; persist(); render();
  } else if (action === 'slot') {selectedSlot = Number(id); render();}
  else if (action === 'symbol' && !state.solved.archive) {
    state.archive = placeSymbol(state.archive, selectedSlot, id); state.moves++; selectedSlot = (selectedSlot + 1) % 5; persist(); render();
  } else if (action === 'dial' && !(id === 'meridian' ? state.anchor : state.solved[id])) {
    const index=Number(a), direction=Number(b);
    if (id === 'tide') state.tide = turnTide(state.tide, index, direction);
    else state[id][index] = mod(state[id][index] + direction, id === 'radio' ? 10 : 8);
    state.moves++; audio.tone(220 + state[id][index] * 35, .12, 0, .15); persist(); render();
  } else if (action === 'reset-puzzle' && !(id === 'meridian' ? state.anchor : state.solved[id])) {
    state[id] = id === 'archive' ? [null,null,null,null,null] : id === 'tide' ? [...TIDE_INITIAL] : [0,0,0]; selectedSlot=0; persist(); render();
  } else if (action === 'check') {
    if (solvePuzzle(state, id)) {audio.success(); persist(); render(); toast(t('solved'));}
    else {const el=app.querySelector('#puzzle-feedback');if(el) {el.textContent=t('wrong');el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake');}audio.tone(95,.25,0,.18);}
  } else if (action === 'hint') {state.hints[id] = Math.min(3, state.hints[id]+1); persist(); render();}
  else if (action === 'listen') {if(!state.sound) {state.sound=true;await audio.enable(true);persist();render();}audio.signal(state.radio);}
  else if (action === 'final-choice' && canFinish(state)) openModal('final-choice');
  else if (action === 'finish' && finish(state,id)) {modal=null;screen='ending';state.room='observatory';persist();render();audio.success();}
  else if (action === 'revisit') {modal=null;screen='game';render();}
});

app.addEventListener('input', event => {
  if (event.target.id === 'personal-note') {
    state.personalNote = event.target.value.slice(0,4000); persist();
    const counter = app.querySelector('#personal-counter'); if(counter)counter.textContent=`${state.personalNote.length}/4000`;
  }
});
document.addEventListener('keydown', event => {
  if (event.target.closest('input, textarea, select, [contenteditable="true"]') || event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
  if (modal) return;
  if (screen !== 'game') return;
  if (event.code === 'Space' && !event.target.closest('button, a, summary')) {event.preventDefault();shift();}
  if (event.key.toLowerCase() === 'j') {event.preventDefault();journalFilter='all';openModal('journal');}
  if (event.key === 'Escape') openModal('settings');
});
window.addEventListener('resize', fitScene);
document.addEventListener('visibilitychange', () => {if (document.hidden) audio.enable(false);else audio.enable(state.sound);});
render();
for (const id of ROOM_IDS) {const image=new Image();image.src=`./assets/${id}.png`;}
