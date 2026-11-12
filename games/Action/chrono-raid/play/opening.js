(() => {
  const $ = id => document.getElementById(id);
  const overlay = $('opening'), video = $('openingVideo'), main = document.querySelector('main');
  const play = $('openingPlay'), skip = $('openingSkip'), sound = $('openingSound'), status = $('openingStatus');
  video.volume = .4;
  let active = true, leaving = false, loadTimer, returnFocus;
  const replay = document.createElement('button');
  replay.id = 'openingReplay';
  replay.textContent = 'OPを再生';
  $('menu').querySelector('.selection').append(replay);

  function waiting() {
    clearTimeout(loadTimer);
    if (!active || leaving) return;
    status.textContent = '映像を読み込み中…';
    loadTimer = setTimeout(() => {
      if (!active || leaving) return;
      status.textContent = '読み込みに時間がかかっています。スキップして遊べます。';
    }, 10000);
  }
  function readyToRetry(message) {
    if (!active || leaving) return;
    clearTimeout(loadTimer);
    overlay.dataset.state = 'paused';
    play.disabled = false;
    play.textContent = '再生する';
    status.textContent = message;
  }
  function begin() {
    if (!active || leaving) return;
    window.menuMusic?.activate();
    window.uiSfx?.prepare();
    if (video.error) video.load();
    overlay.dataset.state = 'loading';
    play.disabled = true;
    waiting();
    // Call directly in the tap handler to allow sound on mobile browsers.
    const attempt = video.play();
    if (attempt) attempt.catch(() => readyToRetry('再生ボタンをタップしてください。スキップもできます。'));
  }
  function finish() {
    if (!active || leaving) return;
    window.menuMusic?.activate();
    window.uiSfx?.prepare();
    leaving = true;
    clearTimeout(loadTimer);
    video.pause();
    overlay.dataset.state = 'leaving';
    setTimeout(() => {
      overlay.hidden = true;
      main.inert = false;
      document.body.classList.remove('opening-active');
      if (!video.muted) window.uiSfx?.play('title');
      active = false;
      leaving = false;
      (returnFocus || $('menu').querySelector('[data-char].selected')).focus({preventScroll:true});
    }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 350);
  }
  replay.onclick = () => {
    returnFocus = replay;
    active = true;
    overlay.hidden = false;
    main.inert = true;
    document.body.classList.add('opening-active');
    video.currentTime = 0;
    video.muted = window.menuMusic?.enabled === false;
    sound.textContent = video.muted ? '音声 OFF' : '音声 ON';
    sound.setAttribute('aria-pressed', String(!video.muted));
    skip.focus({preventScroll:true});
    begin();
  };
  play.onclick = begin;
  skip.onclick = finish;
  sound.onclick = () => {
    video.muted = !video.muted;
    window.menuMusic?.setEnabled(!video.muted);
    sound.textContent = video.muted ? '音声 OFF' : '音声 ON';
    sound.setAttribute('aria-pressed', String(!video.muted));
    if (overlay.dataset.state === 'ready') status.textContent = video.muted ? '音声なしでオープニングを再生' : '音付きでオープニングを再生';
  };
  video.addEventListener('playing', () => {
    if (!active || leaving) { video.pause(); return; }
    clearTimeout(loadTimer);
    overlay.dataset.state = 'playing';
    play.disabled = false;
    status.textContent = '再生後、キャラ選択へ';
    // Move keyboard focus off the button before it becomes invisible.
    if (document.activeElement === play) skip.focus({preventScroll:true});
  });
  video.addEventListener('ended', finish);
  video.addEventListener('waiting', waiting);
  video.addEventListener('error', () => readyToRetry('映像を読み込めませんでした。再生を試すか、スキップして遊べます。'));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && active && !leaving && !video.paused) {
      video.pause();
      readyToRetry('続きから再生できます。');
    }
  });
  overlay.addEventListener('keydown', event => {
    if (event.code === 'Escape') { event.preventDefault(); finish(); }
    if (event.code === 'Tab') {
      const buttons = [sound, play, skip].filter(button => !button.disabled && getComputedStyle(button).visibility !== 'hidden');
      const first = buttons[0], last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
      else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
    }
  });
  play.focus({preventScroll:true});
})();
