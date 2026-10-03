import { freshCampaign, hydrateCampaign } from './campaign.js';
export const VERSION = 2;
// Keep the original storage key so existing first-chapter saves migrate in place.
export const SAVE_KEY = 'silent-meridian.v1';
export const ROOM_IDS = ['observatory', 'archive', 'radio', 'cistern'];
export const SYMBOL_IDS = ['diamond', 'wave', 'peak', 'sun', 'star'];
export const ARRIVAL_ORDER = ['wave', 'star', 'sun', 'peak', 'diamond'];
export const RADIO_SOLUTION = [2, 4, 6];
export const MERIDIAN_SOLUTION = [0, 3, 6];
export const TIDE_INITIAL = [1, 1, 1, 6];
export const COUPLINGS = [[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 1], [1, 0, 0, 2]];
export const NOTE_IDS = ['welcome', 'meridian-rule', 'last-letter', 'arrival-a', 'arrival-b', 'archive-result', 'radio-a', 'radio-b', 'radio-result', 'tide-a', 'tide-b', 'tide-result'];
export const equal = (a, b) => Array.isArray(a) && a.length === b.length && a.every((x, i) => x === b[i]);
export const mod = (n, m) => ((n % m) + m) % m;

export function freshState(lang = 'zh') {
  return { version: VERSION, lang: lang === 'en' ? 'en' : 'zh', started: false, room: 'observatory', phase: 'present', notes: [], solved: { archive: false, radio: false, tide: false }, archive: [null, null, null, null, null], radio: [0, 0, 0], tide: [...TIDE_INITIAL], meridian: [0, 0, 0], anchor: false, ending: null, hints: { archive: 0, radio: 0, tide: 0, meridian: 0 }, sound: false, depth: true, showHotspots: true, visits: [], personalNote: '', moves: 0, campaign: freshCampaign() };
}

export function addNote(state, id) {
  if (!NOTE_IDS.includes(id) || state.notes.includes(id)) return false;
  state.notes.push(id);
  return true;
}

export function placeSymbol(order, slot, symbol) {
  if (!Number.isInteger(slot) || slot < 0 || slot > 4 || !SYMBOL_IDS.includes(symbol)) return [...order];
  const next = [...order];
  const previous = next.indexOf(symbol);
  if (previous !== -1 && previous !== slot) next[previous] = next[slot];
  next[slot] = symbol;
  return next;
}

export function turnTide(dials, control, direction = 1) {
  if (!Number.isInteger(control) || control < 0 || control > 3 || ![-1, 1].includes(direction)) return [...dials];
  return dials.map((value, i) => mod(value + COUPLINGS[control][i] * direction, 8));
}

export function tidePlan(dials) {
  // All 8^4 states are small enough to solve exactly; hints also work after experimentation.
  let best = null;
  for (let a = 0; a < 8; a++) for (let b = 0; b < 8; b++) for (let c = 0; c < 8; c++) for (let d = 0; d < 8; d++) {
    const presses = [a, b, c, d];
    if (dials.every((value, i) => mod(value + presses.reduce((sum, n, j) => sum + n * COUPLINGS[j][i], 0), 8) === 0)) {
      const signed = presses.map(n => n > 4 ? n - 8 : n);
      const cost = signed.reduce((sum, n) => sum + Math.abs(n), 0);
      if (!best || cost < best.cost) best = { presses: signed, cost };
    }
  }
  return best;
}

export function validatePuzzle(state, puzzle) {
  if (puzzle === 'archive') return equal(state.archive, ARRIVAL_ORDER);
  if (puzzle === 'radio') return equal(state.radio, RADIO_SOLUTION);
  if (puzzle === 'tide') return equal(state.tide, [0, 0, 0, 0]);
  if (puzzle === 'meridian') return allCalibrated(state) && state.phase === 'echo' && equal(state.meridian, MERIDIAN_SOLUTION);
  return false;
}

export function solvePuzzle(state, puzzle) {
  if (!validatePuzzle(state, puzzle)) return false;
  if (puzzle === 'meridian') state.anchor = true;
  else {
    state.solved[puzzle] = true;
    addNote(state, `${puzzle}-result`);
  }
  return true;
}

export const allCalibrated = state => ['archive', 'radio', 'tide'].every(k => state.solved[k]);
export const canFinish = state => allCalibrated(state) && state.anchor && state.phase === 'present';

export function finish(state, choice) {
  if (!canFinish(state) || !['keep', 'release'].includes(choice)) return false;
  state.ending = choice;
  return true;
}

export function hydrate(raw, lang = 'zh') {
  const state = freshState(lang);
  if (!raw || ![1, VERSION].includes(raw.version)) return state;
  if (['zh', 'en'].includes(raw.lang)) state.lang = raw.lang;
  for (const key of ['started', 'sound', 'depth', 'showHotspots']) if (typeof raw[key] === 'boolean') state[key] = raw[key];
  if (ROOM_IDS.includes(raw.room)) state.room = raw.room;
  if (['present', 'echo'].includes(raw.phase)) state.phase = raw.phase;
  state.notes = Array.isArray(raw.notes) ? [...new Set(raw.notes.filter(id => NOTE_IDS.includes(id)))] : [];
  state.visits = Array.isArray(raw.visits) ? [...new Set(raw.visits.filter(id => ROOM_IDS.includes(id)))] : [];
  state.personalNote = typeof raw.personalNote === 'string' ? raw.personalNote.slice(0, 4000) : '';
  state.moves = Number.isSafeInteger(raw.moves) && raw.moves >= 0 ? raw.moves : 0;
  for (const [key, length, maximum] of [['radio', 3, 9], ['tide', 4, 7], ['meridian', 3, 7]]) {
    if (Array.isArray(raw[key]) && raw[key].length === length && raw[key].every(n => Number.isInteger(n) && n >= 0 && n <= maximum)) state[key] = [...raw[key]];
  }
  if (Array.isArray(raw.archive) && raw.archive.length === 5 && raw.archive.every(s => s === null || SYMBOL_IDS.includes(s)) && new Set(raw.archive.filter(Boolean)).size === raw.archive.filter(Boolean).length) state.archive = [...raw.archive];
  for (const puzzle of ['archive', 'radio', 'tide']) {
    state.solved[puzzle] = raw.solved?.[puzzle] === true && validatePuzzle(state, puzzle);
    if (state.solved[puzzle]) addNote(state, `${puzzle}-result`);
  }
  state.anchor = raw.anchor === true && allCalibrated(state) && equal(state.meridian, MERIDIAN_SOLUTION);
  if (state.anchor && ['keep', 'release'].includes(raw.ending)) { state.ending = raw.ending; state.phase = 'present'; }
  for (const puzzle of Object.keys(state.hints)) if (Number.isInteger(raw.hints?.[puzzle])) state.hints[puzzle] = Math.max(0, Math.min(raw.hints[puzzle], 3));
  state.campaign = hydrateCampaign(raw.campaign, Boolean(state.ending));
  return state;
}

export function loadState(storage, lang) {
  try { return { state: hydrate(JSON.parse(storage.getItem(SAVE_KEY)), lang), available: true }; }
  catch { return { state: freshState(lang), available: false }; }
}

export function saveState(storage, state) {
  try { storage.setItem(SAVE_KEY, JSON.stringify(state)); return true; } catch { return false; }
}
