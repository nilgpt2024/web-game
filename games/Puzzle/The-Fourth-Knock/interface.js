// Foundation markup: the canvas, the quiet exploration HUD and the in-world overlays that the
// runtime positions every frame. Story panels are mounted by interface7/8/81.
export const knockMark = (cls = '') => `<span class="knock-mark ${cls}" aria-hidden="true"><i></i><i></i><i></i><i></i></span>`;

export const wordmark = (cls = '') => `<div class="wordmark ${cls}">${knockMark()}<div class="wordmark-text"><span class="wm-the">THE</span><span class="wm-fourth">FOURTH</span><span class="wm-knock">KNOCK</span></div></div>`;

export function mountInterface() {
  document.body.innerHTML = `
<main id="game" aria-label="Cedar House. Move Aren with WASD or arrow keys. Approach people and objects, then press E."><canvas id="scene" tabindex="0" aria-label="Playable Cedar House"></canvas></main>
<div id="overlay-layer" aria-hidden="true">
  <div id="markers"></div>
  <div id="speaker-pin"><i></i></div>
  <div id="knock-marks"><span class="knock-bars"><i></i><i></i><i></i><i></i></span></div>
</div>
<header class="brand">${wordmark('small')}<div class="room-label">CEDAR HOUSE <b>·</b> <span id="room-label">LOUNGE</span></div></header>
<aside class="objective"><span class="pin" aria-hidden="true"></span><div class="objective-top"><span class="eyebrow" id="objective-label">ON YOUR MIND</span><span id="objective-count"></span></div><p id="objective-text"></p><div class="objective-track"></div><div class="rule"><i id="progress"></i></div></aside>
<div id="loading"><div class="loading-mark">${knockMark()}</div><span>Making room for a little suspicion…</span></div>
<button id="examine" hidden><kbd>E</kbd><span></span></button>
<div id="nameplate" class="nameplate"><span></span>AREN VALE</div>
<footer><div class="controls"></div></footer>
<div id="stage-backdrop" hidden aria-hidden="true"></div>
<div id="toast" role="status" aria-live="polite"></div>
`;
}
