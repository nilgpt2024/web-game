import { knockMark } from './interface.js';
import { watchArt } from './content/evidence11.js';

// Directed presentation surfaces: letterbox bars, the layered opening, the evening montage,
// the case board (Case Note payoffs and the final reconstruction), the first-contradiction aha
// and the controls card.
export function mountDirecting() {
  document.body.insertAdjacentHTML('beforeend', `
<div class="cinema-bar top" aria-hidden="true"></div><div class="cinema-bar bottom" aria-hidden="true"></div>

<section id="opening-stage" class="story-panel" aria-label="Arrival at Cedar House" hidden>
  <div class="op-shot" id="op-shot-a"></div><div class="op-shot" id="op-shot-b"></div>
  <div class="op-rain" aria-hidden="true"></div><div class="op-vignette" aria-hidden="true"></div>
  <div id="op-veil" aria-hidden="true"></div>
  <p id="opening-caption"></p><p id="opening-subtitle"></p>
</section>

<section id="montage-stage" class="story-panel" aria-label="The evening passes" hidden>
  <div class="montage-copy"><span id="montage-time"></span><p id="montage-caption"></p></div>
</section>

<section id="case-payoff" class="story-panel" role="status" hidden>
  <div class="board">
    <span id="payoff-kicker" class="eyebrow"></span>
    <div id="board-track" class="board-track"></div>
    <h2 id="payoff-conclusion"></h2>
    <p id="board-voice" aria-live="polite"></p>
  </div>
</section>

<section id="aha-stage" class="story-panel" role="dialog" aria-modal="true" aria-labelledby="aha-title" hidden>
  <div class="aha">
    <span class="eyebrow aha-kicker">CASE NOTE 01 · THE FIRST CONTRADICTION</span>
    <div class="aha-row">
      <figure id="aha-watch" class="aha-fact"><div class="aha-object">${watchArt}</div><figcaption><b>9:08</b><span>The watch stopped</span><small>A physical fact</small></figcaption></figure>
      <div class="aha-link" aria-hidden="true"><svg viewBox="0 0 300 40" preserveAspectRatio="none"><path class="aha-line a" d="M4 20 L150 20"/><path class="aha-line b" d="M150 20 L296 20"/></svg><span class="aha-snap">⟋</span></div>
      <figure id="aha-knocks" class="aha-fact"><div class="aha-object">${knockMark('big')}</div><figcaption><b>9:14</b><span>Four knocks heard</span><small>A sound, not a witness</small></figcaption></figure>
    </div>
    <h2 id="aha-title">The connection breaks.</h2>
    <p id="aha-caution">The knocks do not establish that Victor was alive.</p>
    <strong class="contradiction-stamp">CONTRADICTION FILED</strong>
  </div>
</section>

<button id="show-controls" aria-label="Show controls">?</button>
<div id="controls-help" hidden><b>Controls</b><span><kbd>WASD</kbd><kbd>↑←↓→</kbd> Walk</span><span><kbd>E</kbd> Interact</span><span><kbd>N</kbd> Case file</span><span><kbd>O</kbd> Look closer at someone</span><span><kbd>M</kbd> Sound</span><span><kbd>TAB</kbd> <kbd>ENTER</kbd> Choose</span><span><kbd>ESC</kbd> Step back</span></div>
`);
  const help = document.getElementById('controls-help');
  document.getElementById('show-controls').onclick = () => { help.hidden = !help.hidden; };
  addEventListener('keydown', e => { if (e.key === '?') help.hidden = !help.hidden; });
}
