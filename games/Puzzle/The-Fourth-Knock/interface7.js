import { mountInterface as mountFoundation, wordmark, knockMark } from './interface.js';
import { watchArt } from './content/evidence11.js';
export { watchArt };

// Story panels: title, dialogue grammar, knocks, transitions, questioning, observation and the
// case file. Element IDs here are the contract used by the story controller.
export function mountInterface() {
  mountFoundation();
  document.title = 'The Fourth Knock';
  document.body.insertAdjacentHTML('beforeend', `
<div id="story-clock"><span id="clock-time">6:32 PM</span><i></i><span id="clock-beat">ARRIVAL</span></div>

<section id="chapter-intro" class="story-panel title-screen" role="dialog" aria-modal="true" aria-labelledby="intro-title">
  <div class="title-block">
    ${wordmark('title')}
    <h2 id="intro-title" class="sr-only">The Fourth Knock</h2>
    <p class="intro-subtitle">A short mystery at Cedar House</p>
    <p class="title-line">A traveller. A house full of strangers.<br>One evening that refuses to stay ordinary.</p>
    <button id="begin-chapter" class="title-begin"><span>6:32 PM</span><b>Enter Cedar House</b></button>
    <label class="audio-preview"><input id="preview-audio" type="checkbox" checked><span>Sound on</span><small class="audio-preview-note">Temporary audio · every line is subtitled</small></label>
    <p class="intro-controls">WASD / arrows walk · E interact · N case file · about fifteen minutes</p>
  </div>
</section>

<section id="dialogue" class="story-panel dialogue-panel" data-mode="talk" role="dialog" aria-modal="true" aria-labelledby="speaker-name" hidden>
  <div class="dlg-figures" aria-hidden="true"><div class="dlg-figure left" id="conversation-aren"></div><div class="dlg-figure right" id="conversation-other"></div></div>
  <div id="evidence-insert" aria-hidden="true"></div>
  <div class="dialogue-shell">
    <div class="dialogue-portrait" id="speaker-portrait" role="img"></div>
    <div class="dialogue-copy">
      <div class="dialogue-top"><span id="speaker-name"></span><span id="dialogue-context"></span><span id="line-position"></span></div>
      <p id="subtitle" aria-live="polite"></p>
      <div class="dialogue-actions"><button id="advance-line" class="advance"><span>ENTER</span><b aria-hidden="true">▸</b></button><button id="auto-lines" aria-pressed="false">AUTO</button><button id="skip-exchange">SKIP</button></div>
      <div class="line-progress"><i id="line-progress-fill"></i></div>
    </div>
  </div>
</section>

<section id="knock-stage" class="story-panel" role="dialog" aria-modal="true" aria-label="Four knocks" hidden><span id="knock-time" aria-hidden="true"></span><p id="sound-caption" role="status" aria-live="polite"></p></section>

<div id="transition-card" hidden><div class="tc-inner"><span id="transition-time"></span>${knockMark('divider')}<h2 id="transition-place"></h2></div></div>

<section id="topics" class="story-panel stage-panel" role="dialog" aria-modal="true" aria-labelledby="topic-name" hidden>
  <article class="interview">
    <div class="interview-photo"><div id="topic-portrait" class="acting-portrait"></div><span class="clip" aria-hidden="true"></span></div>
    <div class="interview-page">
      <span class="eyebrow" id="topic-role"></span>
      <h2 id="topic-name"></h2>
      <p class="topic-intro">Ask about</p>
      <div id="topic-list"></div>
      <button id="observe-person" class="line-button look"><span>Look closer</span><kbd>O</kbd></button>
      <div class="panel-hint"><kbd>ENTER</kbd> Ask <kbd>ESC</kbd> Step back</div>
    </div>
    <button id="close-topics" class="close" aria-label="End conversation">×</button>
  </article>
</section>

<section id="observe-panel" class="story-panel stage-panel" role="dialog" aria-modal="true" aria-labelledby="observe-title" hidden>
  <article class="observe">
    <div class="observe-figure"><div id="observe-portrait" class="acting-portrait"></div><div id="observe-spots"></div><span class="portrait-name" id="observe-name"></span></div>
    <div class="observe-page">
      <span class="eyebrow">NOTICE, BEFORE YOU ASSUME</span>
      <h2 id="observe-title">A closer look</h2>
      <p class="topic-intro" id="observe-intro">Choose a visible detail.</p>
      <div id="observe-details"></div>
      <p id="observe-description" aria-live="polite"></p>
      <button id="remember-observe" class="stamp-button" disabled><span>Keep the detail</span><kbd>ENTER</kbd></button>
      <div class="panel-hint"><kbd>TAB</kbd> Choose <kbd>ESC</kbd> Step back</div>
    </div>
    <button id="close-observe" class="close" aria-label="Close observation">×</button>
  </article>
</section>

<section id="notes" class="story-panel stage-panel" role="dialog" aria-modal="true" aria-labelledby="notes-title" hidden>
  <article class="casefile">
    <header class="casefile-head">
      <div class="cf-title"><span class="eyebrow">AREN VALE · CASE FILE</span><h2 id="notes-title">Cedar House</h2></div>
      <nav class="notebook-tabs" aria-label="Case file sections"><button data-tab="case" class="selected">Case notes</button><button data-tab="evidence">Evidence</button><button data-tab="people">People</button></nav>
      <div class="cf-count"><div id="notes-portrait" class="acting-portrait" role="img" aria-label="Aren"></div><span id="notes-counter">0 / 4</span></div>
      <button id="close-notes" class="close" aria-label="Close case file">×</button>
    </header>
    <div class="casefile-body">
      <section class="cf-page cf-left">
        <nav id="deduction-selector" aria-label="Case notes"></nav>
        <div id="case-page"></div>
        <div id="notebook-page" hidden></div>
      </section>
      <section class="cf-page cf-right" aria-label="Timeline of the evening"><div class="cf-timeline-head"><span class="eyebrow">THE EVENING, AS RECORDED</span></div><div id="case-timeline"></div></section>
    </div>
    <footer class="casefile-foot"><span class="panel-hint"><kbd>TAB</kbd> Choose <kbd>ENTER</kbd> Place <kbd>ESC</kbd> Close</span><button id="return-lounge" class="text-button">Back to the room</button></footer>
  </article>
</section>
`);
}
