import { minutesOf } from '../content/step11.js';
import { clueArt } from '../content/evidence11.js';
import { wait } from '../core/timing.js';

// The case board: a filed Case Note becomes a picture of the evening. Time boards pin facts to
// an ink rule; the intent board sets two objects against the conclusion they cannot carry.
export function createBoard() {
  const $ = id => document.getElementById(id);
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

  function timeTrack(def) {
    const track = $('board-track');
    track.className = 'board-track';
    track.replaceChildren(el('div', 'board-axis'));
    const m = label => minutesOf(label + ' PM'), x = label => ((m(label) - m(def.from)) / (m(def.to) - m(def.from))) * 100;
    for (const t of def.ticks) {
      const tick = el('div', 'board-tick'); tick.style.left = x(t) + '%';
      tick.append(el('span', null, t)); track.append(tick);
    }
    def.items.forEach((item, i) => {
      const delay = .45 + i * .55;
      if (item.kind === 'band') {
        const band = el('div', 'board-band ' + (item.cls || '') + (item.low ? ' low' : ''));
        band.style.left = x(item.from) + '%';
        band.style.width = Math.max(.8, x(item.to) - x(item.from)) + '%';
        band.style.animationDelay = delay + 's';
        const label = el('label', null, item.label); label.style.animationDelay = delay + .3 + 's';
        band.append(label); track.append(band);
      } else {
        const pin = el('div', 'board-pin ' + (item.cls || '') + (item.low ? ' low' : '') + (item.t2 ? ' t2' : ''));
        pin.style.left = x(item.at) + '%';
        pin.style.animationDelay = delay + 's';
        const label = el('label'); label.append(el('b', null, item.at), document.createTextNode(item.label));
        pin.append(label); track.append(pin);
      }
    });
    return .45 + def.items.length * .55 + .4;
  }

  function cardTrack(def) {
    const track = $('board-track');
    track.className = 'board-track cards';
    track.replaceChildren();
    def.cards.forEach((c, i) => {
      const card = el('figure', 'board-card');
      card.style.animationDelay = (.3 + i * .5) + 's';
      const art = el('div', 'board-card-art'); art.innerHTML = clueArt(c.art);
      const cap = el('figcaption'); cap.append(el('b', null, c.title), el('span', null, c.text));
      card.append(art, cap); track.append(card);
    });
    const struck = el('div', 'board-struck', def.struck);
    struck.style.animationDelay = (.4 + def.cards.length * .5) + 's';
    track.append(struck);
    return .4 + def.cards.length * .5 + .9;
  }

  // Shows the board; resolves once every element has arrived and the conclusion is inked.
  async function show(def) {
    $('payoff-kicker').textContent = def.kicker;
    const conclusion = $('payoff-conclusion');
    conclusion.textContent = def.conclusion;
    conclusion.classList.remove('on');
    const voice = $('board-voice');
    if (voice) voice.textContent = '';
    const settle = def.cards ? cardTrack(def) : timeTrack(def);
    await wait(settle * 1000);
    conclusion.classList.add('on');
    await wait(900);
  }

  function caption(text) { const v = $('board-voice'); if (v) v.textContent = text || ''; }
  return { show, caption };
}
