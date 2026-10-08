import { mountDirecting } from './interface81.js';
import { wordmark } from './interface.js';
import { clueArt } from './content/evidence11.js';
export { clueArt };

// Investigation surfaces: one "look closer" evidence panel (watch, desk clues, impacts, latch,
// Kaveri page), the desk index, Residual captions and the ending title.
export function mountStep8() {
  mountDirecting();
  document.body.insertAdjacentHTML('beforeend', `
<section id="clue-panel" class="story-panel stage-panel" role="dialog" aria-modal="true" aria-labelledby="clue-title" hidden>
  <article class="evidence">
    <div class="evidence-stage">
      <div id="clue-art" class="evidence-art"></div>
      <div id="clue-spots" class="evidence-spots"></div>
      <div id="clue-stamp" class="kept-stamp" aria-hidden="true">KEPT</div>
    </div>
    <div class="evidence-note">
      <span class="eyebrow" id="clue-place"></span>
      <h2 id="clue-title"></h2>
      <ol id="clue-see" class="see-list" aria-live="polite"></ol>
      <p id="clue-text" class="meaning"></p>
      <button id="keep-clue" class="stamp-button"><span>Keep the observation</span><kbd>ENTER</kbd></button>
      <p class="panel-hint" id="clue-hint"><kbd>TAB</kbd> Look <kbd>ENTER</kbd> Keep <kbd>ESC</kbd> Return</p>
    </div>
    <button id="close-clue" class="close" aria-label="Close inspection">×</button>
  </article>
</section>

<section id="desk-panel" class="story-panel stage-panel side" role="dialog" aria-modal="true" aria-labelledby="desk-title" hidden>
  <article class="desk-index">
    <span class="eyebrow">VICTOR'S DESK</span>
    <h2 id="desk-title">What was left behind</h2>
    <p class="topic-intro">Papers disturbed. A drawer not quite closed.</p>
    <div id="desk-clues"></div>
    <p class="panel-hint"><kbd>TAB</kbd> Choose <kbd>ENTER</kbd> Look closer <kbd>ESC</kbd> Step back</p>
    <button id="close-desk" class="close" aria-label="Close desk">×</button>
  </article>
</section>

<section id="residual-panel" class="story-panel" role="status" aria-live="polite" hidden><div class="residual-caption"><p id="residual-caption"></p></div></section>

<section id="ending-panel" class="story-panel" aria-label="The Fourth Knock ending" hidden>
  <div id="ending-title">${wordmark('ending')}<h2 class="sr-only">The Fourth Knock</h2><button id="restart-game" class="text-button" disabled>Start again</button></div>
</section>
`);
}
