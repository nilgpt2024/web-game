import { minutesOf } from '../content/step11.js';

// Aren's case file: numbered Case Notes on the left page, the evening as recorded on the right.
// Choices persist when the file is closed; a wrong theory is marked and can be rethought.
const KIND_LABEL = { physical: 'Physical', heard: 'Heard', account: 'Account', claim: 'Assumption', confession: 'Admitted' };

export function createCaseFile({ state, audio, acting, cast, notes, visible, filed, requirements, onConfirm }) {
  const $ = id => document.getElementById(id);
  let tab = 'case', noteId = 'first', slot = null, hint = '', warn = false;

  const note = () => notes.find(n => n.id === noteId);
  const blanks = n => n.sentence.filter(p => typeof p === 'object');
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

  function defaultNote() {
    const order = notes.map(n => n.id).filter(visible);
    return order.find(id => !filed(id)) || order.at(-1) || 'first';
  }

  function open(which) {
    audio.effect('sfx_notes_open', { gain: .3 });
    tab = 'case';
    noteId = which || defaultNote();
    slot = null; hint = ''; warn = false;
    render();
  }

  function selector() {
    const nav = $('deduction-selector');
    nav.replaceChildren();
    nav.hidden = tab !== 'case' || !state.evidence.knocks;
    notes.forEach((n, i) => {
      if (!visible(n.id)) return;
      const b = el('button', null, String(i + 1).padStart(2, '0'));
      b.dataset.note = n.id;
      b.classList.toggle('selected', n.id === noteId);
      b.classList.toggle('filed', filed(n.id));
      b.setAttribute('aria-label', `Case Note ${i + 1}${filed(n.id) ? ', filed' : ''}`);
      b.onclick = () => { noteId = n.id; slot = null; hint = ''; warn = false; render(); $('case-page').querySelector('.deduction-slot:not(:disabled)')?.focus(); };
      nav.append(b);
    });
  }

  function casePage() {
    const page = $('case-page');
    page.replaceChildren();
    if (!state.evidence.knocks) {
      const m = el('div', 'missing'); m.append(el('b', null, 'Nothing to question yet'), document.createTextNode('A dry room, a hot meal and a quiet evening. So far.'));
      page.append(m); return;
    }
    const n = note(), index = notes.indexOf(n), answers = state.caseAnswers[n.id] ??= {}, done = filed(n.id), missing = done ? [] : requirements(n.id);
    const list = blanks(n);
    if (!done && !missing.length && (!slot || !list.some(b => b.key === slot))) slot = (list.find(b => !answers[b.key]) || list[0]).key;
    page.append(el('div', 'note-subject', `Case Note ${String(index + 1).padStart(2, '0')}`), el('h3', 'note-title', n.title));

    const sentence = el('p', 'deduction');
    for (const part of n.sentence) {
      if (typeof part === 'string') { sentence.append(part); continue; }
      const b = el('button', 'deduction-slot', answers[part.key] || '?');
      b.dataset.slot = part.key;
      b.classList.toggle('empty', !answers[part.key]);
      b.classList.toggle('selected', !done && !missing.length && part.key === slot);
      b.classList.toggle('wrong', warn && !done);
      b.disabled = done || missing.length > 0;
      b.setAttribute('aria-label', `Blank: ${answers[part.key] || 'empty'}`);
      b.onclick = () => { slot = part.key; warn = false; render(); $('case-page').querySelector('.clue-term')?.focus(); };
      sentence.append(b);
    }
    page.append(sentence);

    if (done) {
      page.append(el('div', 'filed-stamp', 'Filed'), el('p', 'case-filed', n.conclusion));
      return;
    }
    if (missing.length) {
      const m = el('div', 'missing');
      m.append(el('b', null, 'Still needed'));
      const ul = el('ul'); for (const item of missing) ul.append(el('li', null, item));
      m.append(ul);
      page.append(m);
      return;
    }
    const active = list.find(b => b.key === slot);
    const bank = el('div', 'term-bank');
    bank.append(el('span', 'label', 'Choose for the marked blank'));
    for (const term of active.choices) {
      const t = el('button', 'clue-term', term);
      t.dataset.answer = term;
      t.onclick = () => place(term);
      bank.append(t);
    }
    const margin = el('p', 'margin-note' + (warn ? ' warn' : ''), hint || 'Choose a blank, then a detail. The conclusion is yours to test.');
    margin.id = 'extended-hint';
    margin.setAttribute('aria-live', 'polite');
    const actions = el('div', 'case-actions');
    const confirm = el('button', 'stamp-button');
    confirm.id = 'confirm-extended';
    confirm.append(el('span', null, n.id === 'final' ? 'Put the whole account together' : n.id === 'first' ? 'File the contradiction' : 'Put the facts together'), el('kbd', null, 'ENTER'));
    confirm.disabled = list.some(b => !answers[b.key]);
    confirm.onclick = () => submit();
    actions.append(confirm);
    page.append(bank, margin, actions);
  }

  function place(term) {
    const n = note(), list = blanks(n), answers = state.caseAnswers[n.id];
    audio.effect('sfx_case_fill', { gain: .4 });
    answers[slot] = term;
    warn = false; hint = '';
    const next = list.find(b => !answers[b.key]);
    if (next) slot = next.key;
    render();
    if (next) $('case-page').querySelector('.clue-term')?.focus();
    else $('confirm-extended')?.focus();
  }

  async function submit() {
    const n = note();
    if (filed(n.id) || state.phase !== 'notes') return;
    if (requirements(n.id).length) { hint = 'Keep the missing observations and accounts before drawing this conclusion.'; warn = true; render(); return; }
    const correct = blanks(n).every(b => state.caseAnswers[n.id][b.key] === b.answer);
    if (!correct) {
      hint = n.wrongHint || 'That account does not fit all the observations. Check the timing and the physical evidence.';
      warn = true;
      audio.effect('sfx_case_wrong', { gain: .35 });
      render();
      $('confirm-extended')?.focus();
      state.events.push({ type: 'case-blocked', id: n.id, reason: 'answer', time: state.time });
      return;
    }
    await onConfirm(n);
  }

  function notebook() {
    const page = $('notebook-page');
    page.replaceChildren();
    if (tab === 'evidence') {
      const items = Object.values(state.evidence);
      if (!items.length) page.append(el('p', 'tl-empty', 'Nothing kept yet.'));
      for (const e of items) { const a = el('article'); a.append(el('h3', null, e.label), el('p', null, e.detail)); page.append(a); }
      return;
    }
    const byPerson = new Map();
    for (const p of Object.values(state.people)) { if (!byPerson.has(p.name)) byPerson.set(p.name, []); byPerson.get(p.name).push(p.text); }
    if (!byPerson.size) page.append(el('p', 'tl-empty', 'No one has told you anything yet.'));
    for (const [name, texts] of byPerson) {
      const key = Object.keys(cast).find(k => cast[k].name === name);
      const a = el('article', 'person');
      const portrait = el('div', 'acting-portrait');
      const copy = el('div');
      copy.append(el('h3', null, name));
      for (const t of texts) copy.append(el('p', null, t));
      a.append(portrait, copy);
      page.append(a);
      if (key) requestAnimationFrame(() => acting.portrait(portrait, key));
    }
  }

  function timeline() {
    const root = $('case-timeline');
    root.replaceChildren();
    const entries = [...state.timeline].sort((a, b) => minutesOf(a.time) - minutesOf(b.time));
    if (!entries.length) { root.append(el('p', 'tl-empty', 'Nothing recorded yet.')); return; }
    let gapShown = false;
    for (const t of entries) {
      if (state.noted && !gapShown && minutesOf(t.time) >= 9 * 60 + 14 && entries.some(e => e.id === 'watch')) {
        root.append(el('div', 'tl-gap', 'Six minutes · unaccounted for'));
        gapShown = true;
      }
      const row = el('div', 'tl-entry ' + (t.kind || 'account'));
      row.append(el('time', null, t.time.replace(/\s*PM/g, '').replace(/^After /, '> ')), document.createTextNode(t.text), el('small', null, KIND_LABEL[t.kind] || 'Account'));
      root.append(row);
    }
  }

  function render() {
    document.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('selected', b.dataset.tab === tab));
    $('case-page').hidden = tab !== 'case';
    $('notebook-page').hidden = tab === 'case';
    selector();
    if (tab === 'case') casePage(); else notebook();
    timeline();
    const count = ['first', 'mira', 'brann', 'final'].filter(filed).length;
    $('notes-counter').textContent = `${count} / 4`;
  }

  document.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { tab = b.dataset.tab; render(); });
  return { open, render, submit, get note() { return noteId; }, get tab() { return tab; } };
}
