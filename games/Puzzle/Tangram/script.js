(function () {
  const UNIT = 40;
  const SNAP_DISTANCE = 28;
  const ROTATION_STEP = 45;

  const PIECE_DEFS = [
    { name: 'large-tri-1', type: 'triangle', size: 'large', w: UNIT * 2, h: UNIT * 4 },
    { name: 'large-tri-2', type: 'triangle', size: 'large', w: UNIT * 2, h: UNIT * 4 },
    { name: 'medium-tri', type: 'triangle', size: 'medium', w: UNIT * 1.5, h: UNIT * 3 },
    { name: 'small-tri-1', type: 'triangle', size: 'small', w: UNIT, h: UNIT * 2 },
    { name: 'small-tri-2', type: 'triangle', size: 'small', w: UNIT, h: UNIT * 2 },
    { name: 'square', type: 'square', w: UNIT * 1.4, h: UNIT * 1.4 },
    { name: 'parallelogram', type: 'parallelogram', w: UNIT * 2, h: UNIT }
  ];

  const LEVELS = [
    {
      id: 0,
      icon: '🏠',
      name: { zh: '房子', en: 'House' },
      shapes: [
        { piece: 0, x: 200, y: 120, r: 135 },
        { piece: 1, x: 200, y: 240, r: 180 },
        { piece: 2, x: 140, y: 300, r: 90 },
        { piece: 3, x: 260, y: 300, r: -90 },
        { piece: 4, x: 200, y: 340, r: 0 },
        { piece: 5, x: 200, y: 270, r: 0 },
        { piece: 6, x: 140, y: 240, r: 0 }
      ]
    },
    {
      id: 1,
      icon: '🐱',
      name: { zh: '猫', en: 'Cat' },
      shapes: [
        { piece: 0, x: 200, y: 160, r: 180 },
        { piece: 1, x: 200, y: 280, r: 0 },
        { piece: 2, x: 130, y: 220, r: 135 },
        { piece: 3, x: 270, y: 220, r: -135 },
        { piece: 4, x: 200, y: 100, r: 0 },
        { piece: 5, x: 200, y: 340, r: 0 },
        { piece: 6, x: 200, y: 230, r: 90 }
      ]
    },
    {
      id: 2,
      icon: '⛵',
      name: { zh: '帆船', en: 'Sailboat' },
      shapes: [
        { piece: 0, x: 200, y: 120, r: 45 },
        { piece: 1, x: 240, y: 200, r: -45 },
        { piece: 2, x: 160, y: 260, r: 90 },
        { piece: 3, x: 200, y: 310, r: 0 },
        { piece: 4, x: 160, y: 170, r: 135 },
        { piece: 5, x: 240, y: 280, r: 45 },
        { piece: 6, x: 200, y: 210, r: 0 }
      ]
    },
    {
      id: 3,
      icon: '🚶',
      name: { zh: '跑步的人', en: 'Runner' },
      shapes: [
        { piece: 0, x: 190, y: 100, r: 45 },
        { piece: 1, x: 210, y: 200, r: -90 },
        { piece: 2, x: 170, y: 280, r: 135 },
        { piece: 3, x: 240, y: 290, r: -45 },
        { piece: 4, x: 150, y: 190, r: 90 },
        { piece: 5, x: 210, y: 330, r: 0 },
        { piece: 6, x: 190, y: 250, r: 30 }
      ]
    },
    {
      id: 4,
      icon: '🦢',
      name: { zh: '天鹅', en: 'Swan' },
      shapes: [
        { piece: 0, x: 220, y: 140, r: 225 },
        { piece: 1, x: 160, y: 260, r: 0 },
        { piece: 2, x: 260, y: 280, r: 45 },
        { piece: 3, x: 130, y: 200, r: 135 },
        { piece: 4, x: 270, y: 200, r: -45 },
        { piece: 5, x: 195, y: 320, r: 0 },
        { piece: 6, x: 220, y: 230, r: -30 }
      ]
    },
    {
      id: 5,
      icon: '🐻',
      name: { zh: '熊', en: 'Bear' },
      shapes: [
        { piece: 0, x: 200, y: 140, r: 180 },
        { piece: 1, x: 200, y: 270, r: 0 },
        { piece: 2, x: 130, y: 190, r: 135 },
        { piece: 3, x: 270, y: 190, r: -135 },
        { piece: 4, x: 200, y: 80, r: 0 },
        { piece: 5, x: 200, y: 340, r: 0 },
        { piece: 6, x: 200, y: 210, r: 0 }
      ]
    },
    {
      id: 6,
      icon: '💺',
      name: { zh: '椅子', en: 'Chair' },
      shapes: [
        { piece: 0, x: 200, y: 140, r: 180 },
        { piece: 1, x: 200, y: 280, r: 0 },
        { piece: 2, x: 130, y: 340, r: 90 },
        { piece: 3, x: 270, y: 340, r: -90 },
        { piece: 4, x: 200, y: 100, r: 0 },
        { piece: 5, x: 200, y: 220, r: 0 },
        { piece: 6, x: 140, y: 280, r: 0 }
      ]
    },
    {
      id: 7,
      icon: '🔺',
      name: { zh: '箭头', en: 'Arrow' },
      shapes: [
        { piece: 0, x: 200, y: 110, r: 180 },
        { piece: 1, x: 200, y: 240, r: 0 },
        { piece: 2, x: 140, y: 310, r: 135 },
        { piece: 3, x: 260, y: 310, r: -135 },
        { piece: 4, x: 200, y: 350, r: 0 },
        { piece: 5, x: 200, y: 180, r: 0 },
        { piece: 6, x: 200, y: 270, r: 90 }
      ]
    },
    {
      id: 8,
      icon: '🐟',
      name: { zh: '鱼', en: 'Fish' },
      shapes: [
        { piece: 0, x: 170, y: 200, r: 90 },
        { piece: 1, x: 260, y: 200, r: -90 },
        { piece: 2, x: 210, y: 130, r: 45 },
        { piece: 3, x: 210, y: 280, r: -45 },
        { piece: 4, x: 120, y: 200, r: 0 },
        { piece: 5, x: 210, y: 200, r: 45 },
        { piece: 6, x: 300, y: 200, r: 90 }
      ]
    },
    {
      id: 9,
      icon: '🏃',
      name: { zh: '跳舞的人', en: 'Dancer' },
      shapes: [
        { piece: 0, x: 180, y: 90, r: 60 },
        { piece: 1, x: 220, y: 200, r: -60 },
        { piece: 2, x: 140, y: 280, r: 120 },
        { piece: 3, x: 270, y: 290, r: -120 },
        { piece: 4, x: 200, y: 160, r: 0 },
        { piece: 5, x: 200, y: 340, r: 15 },
        { piece: 6, x: 200, y: 240, r: 45 }
      ]
    },
    {
      id: 10,
      icon: '🪁',
      name: { zh: '风筝', en: 'Kite' },
      shapes: [
        { piece: 0, x: 200, y: 120, r: 180 },
        { piece: 1, x: 200, y: 240, r: 0 },
        { piece: 2, x: 145, y: 300, r: 135 },
        { piece: 3, x: 255, y: 300, r: -135 },
        { piece: 4, x: 200, y: 70, r: 0 },
        { piece: 5, x: 200, y: 180, r: 45 },
        { piece: 6, x: 200, y: 340, r: 0 }
      ]
    },
    {
      id: 11,
      icon: '⭐',
      name: { zh: '钻石', en: 'Diamond' },
      shapes: [
        { piece: 0, x: 200, y: 130, r: 180 },
        { piece: 1, x: 200, y: 270, r: 0 },
        { piece: 2, x: 135, y: 200, r: 90 },
        { piece: 3, x: 265, y: 200, r: -90 },
        { piece: 4, x: 200, y: 200, r: 45 },
        { piece: 5, x: 200, y: 200, r: 0 },
        { piece: 6, x: 200, y: 340, r: 0 }
      ]
    }
  ];

  let pieces = [];
  let currentLevel = 0;
  let moves = 0;
  let timerInterval = null;
  let elapsedSeconds = 0;
  let isFreePlay = false;
  let selectedPiece = null;
  let dragState = null;
  let completedLevels = new Set();
  let hintVisible = false;

  const playArea = document.getElementById('playArea');
  const targetSvg = document.getElementById('targetSvg');
  const timerEl = document.getElementById('timer');
  const movesEl = document.getElementById('moves');
  const levelDisplayEl = document.getElementById('levelDisplay');
  const levelThumbnailsEl = document.getElementById('levelThumbnails');
  const victoryModal = document.getElementById('victoryModal');

  function init() {
    createPieces();
    renderLevelThumbnails();
    loadLevel(currentLevel);
    bindEvents();
    startTimer();
  }

  function createPieces() {
    pieces = PIECE_DEFS.map((def, i) => ({
      id: i,
      ...def,
      el: document.getElementById(`piece-${i}`),
      x: 40 + (i % 4) * 85,
      y: 30 + Math.floor(i / 4) * 100,
      rotation: 0,
      flipped: false,
      snapped: false
    }));
    updatePiecePositions();
  }

  function updatePiecePositions() {
    pieces.forEach(p => {
      p.el.style.left = p.x + 'px';
      p.el.style.top = p.y + 'px';
      p.el.style.transform = `rotate(${p.rotation}deg)${p.flipped ? ' scaleX(-1)' : ''}`;
    });
  }

  function renderLevelThumbnails() {
    levelThumbnailsEl.innerHTML = '';
    LEVELS.forEach((level, i) => {
      const thumb = document.createElement('div');
      thumb.className = 'level-thumb' + (i === currentLevel ? ' active' : '') + (completedLevels.has(i) ? ' completed' : '');
      thumb.textContent = level.icon;
      thumb.title = level.name.zh + ' / ' + level.name.en;
      thumb.addEventListener('click', () => loadLevel(i));
      levelThumbnailsEl.appendChild(thumb);
    });
  }

  function loadLevel(idx) {
    currentLevel = idx;
    isFreePlay = false;
    hintVisible = false;
    moves = 0;
    elapsedSeconds = 0;
    movesEl.textContent = '0';
    levelDisplayEl.textContent = `${idx + 1} / ${LEVELS.length}`;
    renderTarget();
    resetPiecesPosition();
    renderLevelThumbnails();
    restartTimer();
    hideVictory();
    playArea.classList.remove('free-play-mode');
  }

  function renderTarget() {
    const level = LEVELS[currentLevel];
    const scale = 0.55;
    let svgContent = '';
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#8b5cf6', '#ec4899'];

    level.shapes.forEach(s => {
      const def = PIECE_DEFS[s.piece];
      const cx = s.x * scale;
      const cy = s.y * scale;
      const angle = (s.r || 0) * Math.PI / 180;
      const color = colors[s.piece];

      if (def.type === 'triangle') {
        const hw = def.w * scale / 2;
        const hh = def.h * scale / 2;
        const pts = trianglePoints(cx, cy, hw, hh, angle);
        svgContent += `<polygon points="${pts}" fill="${color}" opacity="0.75" stroke="${color}" stroke-width="1.5"/>`;
      } else if (def.type === 'square') {
        const hs = def.w * scale / 2;
        const pts = rectPoints(cx, cy, hs, hs, angle);
        svgContent += `<polygon points="${pts}" fill="${color}" opacity="0.75" stroke="${color}" stroke-width="1.5"/>`;
      } else if (def.type === 'parallelogram') {
        const pw = def.w * scale / 2;
        const ph = def.h * scale / 2;
        const pts = parallelogramPoints(cx, cy, pw, ph, angle);
        svgContent += `<polygon points="${pts}" fill="${color}" opacity="0.75" stroke="${color}" stroke-width="1.5"/>`;
      }
    });

    targetSvg.innerHTML = svgContent;
  }

  function trianglePoints(cx, cy, hw, hh, angle) {
    const pts = [[0, -hh], [-hw, hh], [hw, hh]];
    return pts.map(p => rotPoint(cx, cy, p[0], p[1], angle)).map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  }

  function rectPoints(cx, cy, hw, hh, angle) {
    const pts = [[-hw, -hh], [hw, -hh], [hw, hh], [-hw, hh]];
    return pts.map(p => rotPoint(cx, cy, p[0], p[1], angle)).map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  }

  function parallelogramPoints(cx, cy, hw, hh, angle) {
    const offset = hw * 0.4;
    const pts = [[-hw + offset, -hh], [hw + offset, -hh], [hw - offset, hh], [-hw - offset, hh]];
    return pts.map(p => rotPoint(cx, cy, p[0], p[1], angle)).map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  }

  function rotPoint(cx, cy, px, py, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [cx + px * cos - py * sin, cy + px * sin + py * cos];
  }

  function resetPiecesPosition() {
    pieces.forEach((p, i) => {
      p.x = 30 + (i % 4) * 82;
      p.y = 25 + Math.floor(i / 4) * 95;
      p.rotation = 0;
      p.flipped = false;
      p.snapped = false;
      p.el.classList.remove('snapped', 'flipped-h', 'selected', 'dragging');
    });
    updatePiecePositions();
  }

  function bindEvents() {
    pieces.forEach(p => {
      p.el.addEventListener('mousedown', e => onDragStart(e, p));
      p.el.addEventListener('touchstart', e => onDragStart(e, p), { passive: false });
      p.el.addEventListener('click', e => {
        if (!dragState || !dragState.moved) {
          rotatePiece(p);
        }
      });
      p.el.addEventListener('wheel', e => {
        e.preventDefault();
        rotatePiece(p, e.deltaY > 0 ? ROTATION_STEP : -ROTATION_STEP);
      });
    });

    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
    document.addEventListener('touchmove', onDragMove, { passive: false });
    document.addEventListener('touchend', onDragEnd);

    document.getElementById('resetBtn').addEventListener('click', () => {
      if (isFreePlay) resetPiecesPosition();
      else loadLevel(currentLevel);
    });

    document.getElementById('hintBtn').addEventListener('click', toggleHint);

    document.getElementById('flipBtn').addEventListener('click', () => {
      if (selectedPiece && selectedPiece.name === 'parallelogram') {
        flipPiece(selectedPiece);
      } else {
        const para = pieces.find(p => p.name === 'parallelogram');
        if (para) selectPiece(para);
      }
    });

    document.getElementById('freePlayBtn').addEventListener('click', enterFreePlay);

    document.getElementById('prevLevelBtn').addEventListener('click', () => {
      if (currentLevel > 0) loadLevel(currentLevel - 1);
    });

    document.getElementById('nextLevelBtn').addEventListener('click', () => {
      if (currentLevel < LEVELS.length - 1) loadLevel(currentLevel + 1);
    });

    document.getElementById('replayBtn').addEventListener('click', () => {
      hideVictory();
      loadLevel(currentLevel);
    });

    document.getElementById('nextLevelModalBtn').addEventListener('click', () => {
      hideVictory();
      if (currentLevel < LEVELS.length - 1) loadLevel(currentLevel + 1);
      else loadLevel(0);
    });
  }

  function getEventPos(e) {
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  }

  function onDragStart(e, piece) {
    e.preventDefault();
    selectPiece(piece);
    const pos = getEventPos(e);
    const rect = playArea.getBoundingClientRect();
    dragState = {
      piece: piece,
      startX: pos.x,
      startY: pos.y,
      offsetX: piece.x - (pos.x - rect.left),
      offsetY: piece.y - (pos.y - rect.top),
      moved: false
    };
    piece.el.classList.add('dragging');
    piece.el.style.zIndex = 1000;
  }

  function onDragMove(e) {
    if (!dragState) return;
    e.preventDefault();
    const pos = getEventPos(e);
    const rect = playArea.getBoundingClientRect();
    let newX = pos.x - rect.left + dragState.offsetX;
    let newY = pos.y - rect.top + dragState.offsetY;

    const dx = pos.x - dragState.startX;
    const dy = pos.y - dragState.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragState.moved = true;

    const areaRect = playArea.getBoundingClientRect();
    newX = Math.max(-20, Math.min(areaRect.width - 20, newX));
    newY = Math.max(-20, Math.min(areaRect.height - 20, newY));

    dragState.piece.x = newX;
    dragState.piece.y = newY;
    dragState.piece.snapped = false;
    dragState.piece.el.classList.remove('snapped');
    updatePiecePositions();
  }

  function onDragEnd(e) {
    if (!dragState) return;
    const piece = dragState.piece;
    piece.el.classList.remove('dragging');
    piece.el.style.zIndex = '';

    if (dragState.moved) {
      incrementMoves();
      if (!isFreePlay) trySnap(piece);
    }

    dragState = null;
    if (!isFreePlay) checkWin();
  }

  function selectPiece(piece) {
    pieces.forEach(p => p.el.classList.remove('selected'));
    piece.el.classList.add('selected');
    selectedPiece = piece;
  }

  function rotatePiece(piece, delta) {
    if (delta == null) delta = ROTATION_STEP;
    piece.rotation = ((piece.rotation + delta) % 360 + 360) % 360;
    piece.el.classList.add('piece-rotate-anim');
    updatePiecePositions();
    setTimeout(() => piece.el.classList.remove('piece-rotate-anim'), 200);
    if (!isFreePlay) trySnap(piece);
  }

  function flipPiece(piece) {
    piece.flipped = !piece.flipped;
    piece.el.classList.toggle('flipped-h', piece.flipped);
    updatePiecePositions();
  }

  function incrementMoves() {
    moves++;
    movesEl.textContent = moves;
  }

  function trySnap(piece) {
    const level = LEVELS[currentLevel];
    const target = level.shapes.find(s => s.piece === piece.id);
    if (!target) return;

    const scale = 400 / 400;
    const tx = target.x * 0.72 - getPieceCenterOffsetX(piece);
    const ty = target.y * 0.72 - getPieceCenterOffsetY(piece);

    const dist = Math.hypot(piece.x - tx, piece.y - ty);
    const rotDiff = normalizeAngleDiff(piece.rotation, target.r || 0);

    if (dist < SNAP_DISTANCE && rotDiff < 20) {
      piece.x = tx;
      piece.y = ty;
      piece.rotation = target.r || 0;
      piece.snapped = true;
      piece.el.classList.add('snapped', 'snap-pulse');
      updatePiecePositions();
      setTimeout(() => piece.el.classList.remove('snap-pulse'), 500);
    }
  }

  function getPieceCenterOffsetX(piece) {
    const def = PIECE_DEFS[piece.id];
    if (def.type === 'triangle') return def.w / 2;
    if (def.type === 'square') return def.w / 2;
    if (def.type === 'parallelogram') return def.w / 2;
    return 0;
  }

  function getPieceCenterOffsetY(piece) {
    const def = PIECE_DEFS[piece.id];
    if (def.type === 'triangle') return def.h / 2;
    if (def.type === 'square') return def.h / 2;
    if (def.type === 'parallelogram') return def.h / 2;
    return 0;
  }

  function normalizeAngleDiff(a, b) {
    let diff = ((a - b) % 360 + 360) % 360;
    if (diff > 180) diff = 360 - diff;
    return diff;
  }

  function checkWin() {
    const level = LEVELS[currentLevel];
    let allSnapped = true;
    for (const s of level.shapes) {
      const piece = pieces[s.piece];
      const scale = 0.72;
      const tx = s.x * scale - getPieceCenterOffsetX(piece);
      const ty = s.y * scale - getPieceCenterOffsetY(piece);
      const dist = Math.hypot(piece.x - tx, piece.y - ty);
      const rotDiff = normalizeAngleDiff(piece.rotation, s.r || 0);
      if (dist > SNAP_DISTANCE * 1.5 || rotDiff > 25) {
        allSnapped = false;
        break;
      }
    }
    if (allSnapped) {
      stopTimer();
      completedLevels.add(currentLevel);
      renderLevelThumbnails();
      showVictory();
    }
  }

  function showVictory() {
    document.getElementById('finalTime').textContent = formatTime(elapsedSeconds);
    document.getElementById('finalMoves').textContent = moves;
    victoryModal.classList.add('show');
  }

  function hideVictory() {
    victoryModal.classList.remove('show');
  }

  function toggleHint() {
    hintVisible = !hintVisible;
    targetSvg.style.opacity = hintVisible ? '1' : '0.35';
    targetSvg.parentElement.style.borderColor = hintVisible ? 'rgba(13,148,136,0.5)' : 'rgba(13,148,136,0.25)';
  }

  function enterFreePlay() {
    isFreePlay = true;
    hintVisible = false;
    stopTimer();
    resetPiecesPosition();
    targetSvg.innerHTML = '';
    timerEl.textContent = '--:--';
    movesEl.textContent = '0';
    moves = 0;
    playArea.classList.add('free-play-mode');
    document.querySelector('.target-area .target-label').textContent = isFreePlay ? '✨ Free Play' : '目标图案';
  }

  function startTimer() {
    stopTimer();
    elapsedSeconds = 0;
    timerEl.textContent = '00:00';
    timerInterval = setInterval(() => {
      elapsedSeconds++;
      timerEl.textContent = formatTime(elapsedSeconds);
    }, 1000);
  }

  function restartTimer() {
    startTimer();
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
