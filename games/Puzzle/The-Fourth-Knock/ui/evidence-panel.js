import { wait } from '../core/timing.js';

// "Look closer": evidence is an object on a dark surface with two or three places to look.
// Looking is free and records nothing. The key detail reveals what the object means; only the
// stamp (ENTER on "Keep the observation") commits it to the case file.
export function createEvidencePanel({ audio }) {
  const $ = id => document.getElementById(id);
  let session = null;

  function spotButton(spot, i) {
    const b = document.createElement('button');
    b.className = 'spot';
    b.type = 'button';
    b.style.left = spot.x + '%';
    b.style.top = spot.y + '%';
    b.textContent = String(i + 1);
    b.dataset.spot = String(i);
    b.setAttribute('aria-label', 'Look at ' + spot.label);
    b.onclick = () => see(i);
    b.onfocus = () => document.querySelectorAll('#clue-spots .spot').forEach(s => s.classList.toggle('selected', s === b));
    return b;
  }

  function renderSee() {
    const list = $('clue-see');
    list.replaceChildren();
    session.spots.forEach((spot, i) => {
      const li = document.createElement('li');
      li.dataset.n = String(i + 1);
      const seen = session.seen.has(i) || session.kept;
      li.className = seen ? (spot.key ? 'key' : '') : 'pending';
      if (seen) {
        const b = document.createElement('b'); b.textContent = spot.label;
        li.append(b, document.createTextNode(spot.see));
      } else li.textContent = spot.label + ' …';
      list.append(li);
    });
  }

  function updateKeep() {
    const keep = $('keep-clue');
    const ready = session.kept || !session.requireKey || session.keySeen;
    keep.disabled = !ready;
    keep.firstElementChild.textContent = session.kept ? 'Return' : ready ? session.keepLabel : 'Look closer first';
    $('clue-text').classList.toggle('on', ready);
  }

  function open({ kind, art, place, title, text, spots = [], kept = false, keepLabel = 'Keep the observation', requireKey = true, layout = '', onKeep, onReturn }) {
    session = { kind, spots, seen: new Set(), kept, keepLabel, requireKey: requireKey && spots.some(s => s.key), keySeen: false, onKeep, onReturn, busy: false };
    const card = document.querySelector('#clue-panel .evidence');
    card.className = 'evidence' + (layout ? ' ' + layout : '');
    $('clue-place').textContent = place;
    $('clue-title').textContent = title;
    $('clue-art').innerHTML = art;
    $('clue-text').textContent = text;
    $('clue-stamp').classList.toggle('on', kept);
    $('clue-stamp').classList.remove('fresh');
    const spotsEl = $('clue-spots');
    spotsEl.replaceChildren(...spots.map(spotButton));
    if (kept) spotsEl.querySelectorAll('.spot').forEach(s => s.classList.add('seen'));
    $('clue-see').hidden = !spots.length;
    requestAnimationFrame(placeSpots);
    $('clue-hint').innerHTML = spots.length ? '<kbd>TAB</kbd> Look <kbd>ENTER</kbd> Keep <kbd>ESC</kbd> Return' : '<kbd>ENTER</kbd> Continue <kbd>ESC</kbd> Return';
    renderSee();
    updateKeep();
  }

  // Spots are authored as % of the illustration, so they follow the drawn art, not its box.
  function placeSpots() {
    const svg = $('clue-art').querySelector('svg'), box = $('clue-spots').getBoundingClientRect();
    if (!svg || !session) return;
    const r = svg.getBoundingClientRect(), vb = svg.viewBox.baseVal;
    const scale = Math.min(r.width / vb.width, r.height / vb.height);
    const w = vb.width * scale, h = vb.height * scale, left = r.left + (r.width - w) / 2, top = r.top + (r.height - h) / 2;
    document.querySelectorAll('#clue-spots .spot').forEach((el, i) => {
      el.style.left = (left - box.left + session.spots[i].x / 100 * w) + 'px';
      el.style.top = (top - box.top + session.spots[i].y / 100 * h) + 'px';
    });
  }
  addEventListener('resize', () => requestAnimationFrame(placeSpots));

  function see(i) {
    if (!session || session.seen.has(i)) { focusNext(i); return; }
    const spot = session.spots[i];
    session.seen.add(i);
    if (spot.key) session.keySeen = true;
    const button = document.querySelector(`#clue-spots .spot[data-spot="${i}"]`);
    button?.classList.add('seen');
    audio.effect(spot.key ? 'sfx_case_fill' : 'sfx_ui_soft_select', { gain: spot.key ? .35 : .25 });
    renderSee();
    updateKeep();
    focusNext(i);
  }

  // After looking, focus moves to the next unseen place, or to the stamp once the key is found.
  function focusNext(i) {
    const unseen = session.spots.findIndex((_, j) => j > i && !session.seen.has(j));
    const any = unseen >= 0 ? unseen : session.spots.findIndex((_, j) => !session.seen.has(j));
    if (session.keySeen || any < 0) $('keep-clue').focus();
    else document.querySelector(`#clue-spots .spot[data-spot="${any}"]`)?.focus();
  }

  async function keep() {
    if (!session || session.busy || $('keep-clue').disabled) return false;
    if (session.kept) { session.onReturn?.(); return true; }
    session.busy = true;
    const stamp = $('clue-stamp');
    stamp.classList.remove('on'); void stamp.offsetWidth; stamp.classList.add('on');
    audio.effect('sfx_clue_record', { gain: .5 });
    session.spots.forEach((_, i) => session.seen.add(i));
    renderSee();
    await wait(560);
    session.kept = true;
    session.busy = false;
    await session.onKeep?.();
    return true;
  }

  // Focus the first place to look when the panel opens.
  function focusFirst() {
    const first = document.querySelector('#clue-spots .spot:not(.seen)');
    (first || $('keep-clue')).focus();
  }

  return { open, see, keep, focusFirst, get session() { return session; } };
}
