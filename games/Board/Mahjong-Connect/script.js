(function () {
  'use strict';

  const ROWS = 8;
  const COLS = 12;

  const TILE_DEFS = [
    { symbol: '🀇', suit: 'wan', id: 1 }, { symbol: '🀈', suit: 'wan', id: 2 },
    { symbol: '🀉', suit: 'wan', id: 3 }, { symbol: '🀊', suit: 'wan', id: 4 },
    { symbol: '🀋', suit: 'wan', id: 5 }, { symbol: '🀌', suit: 'wan', id: 6 },
    { symbol: '🀍', suit: 'wan', id: 7 }, { symbol: '🀎', suit: 'wan', id: 8 },
    { symbol: '🀏', suit: 'wan', id: 9 },
    { symbol: '🀐', suit: 'tiao', id: 10 }, { symbol: '🀑', suit: 'tiao', id: 11 },
    { symbol: '🀒', suit: 'tiao', id: 12 }, { symbol: '🀓', suit: 'tiao', id: 13 },
    { symbol: '🀔', suit: 'tiao', id: 14 }, { symbol: '🀕', suit: 'tiao', id: 15 },
    { symbol: '🀖', suit: 'tiao', id: 16 }, { symbol: '🀗', suit: 'tiao', id: 17 },
    { symbol: '🀘', suit: 'tiao', id: 18 },
    { symbol: '🀙', suit: 'tong', id: 19 }, { symbol: '🀚', suit: 'tong', id: 20 },
    { symbol: '🀛', suit: 'tong', id: 21 }, { symbol: '🀜', suit: 'tong', id: 22 },
    { symbol: '🀝', suit: 'tong', id: 23 }, { symbol: '🀞', suit: 'tong', id: 24 },
    { symbol: '🀟', suit: 'tong', id: 25 }, { symbol: '🀠', suit: 'tong', id: 26 },
    { symbol: '🀡', suit: 'tong', id: 27 },
    { symbol: '🀀', suit: 'honor', id: 28 }, { symbol: '🀁', suit: 'honor', id: 29 },
    { symbol: '🀂', suit: 'honor', id: 30 }, { symbol: '🀃', suit: 'honor', id: 31 },
    { symbol: '🀄', suit: 'honor', id: 32 }, { symbol: '🀅', suit: 'honor', id: 33 },
    { symbol: '🀆', suit: 'honor', id: 34 },
    { symbol: '🀢', suit: 'flower', id: 35 }, { symbol: '🀣', suit: 'flower', id: 36 }
  ];

  let board = [];
  let selectedTile = null;
  let timerInterval = null;
  let seconds = 0;
  let matchCount = 0;
  let isProcessing = false;
  let hintTiles = [];
  let bestTime = localStorage.getItem('mahjong_best_time') || null;

  const gameBoardEl = document.getElementById('gameBoard');
  const timerEl = document.getElementById('timer');
  const timerDisplayEl = document.getElementById('timerDisplay');
  const remainingEl = document.getElementById('remaining');
  const tilesLeftEl = document.getElementById('tilesLeft');
  const matchesEl = document.getElementById('matches');
  const bestTimeEl = document.getElementById('bestTime');
  const lineCanvas = document.getElementById('lineCanvas');
  const ctx = lineCanvas.getContext('2d');

  function init() {
    buildBoard();
    renderBoard();
    startTimer();
    updateStats();
    if (bestTime) bestTimeEl.textContent = formatTime(parseInt(bestTime));
    setupCanvas();
    bindEvents();
  }

  function setupCanvas() {
    const rect = gameBoardEl.parentElement.getBoundingClientRect();
    lineCanvas.width = rect.width;
    lineCanvas.height = rect.height;
    lineCanvas.style.width = rect.width + 'px';
    lineCanvas.style.height = rect.height + 'px';
  }

  function buildBoard() {
    board = [];
    const totalSlots = ROWS * COLS;
    const pairsNeeded = totalSlots / 2;
    const pool = [];

    for (let i = 0; i < pairsNeeded; i++) {
      const tileDef = TILE_DEFS[i % TILE_DEFS.length];
      pool.push({ ...tileDef });
      pool.push({ ...tileDef });
    }

    shuffleArray(pool);

    for (let r = 0; r < ROWS; r++) {
      board[r] = [];
      for (let c = 0; c < COLS; c++) {
        board[r][c] = pool[r * COLS + c] || null;
      }
    }
  }

  function renderBoard() {
    gameBoardEl.innerHTML = '';
    gameBoardEl.style.gridTemplateColumns = `repeat(${COLS}, 1fr)`;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const tileData = board[r][c];
        const tileEl = document.createElement('div');
        tileEl.className = 'tile';
        tileEl.dataset.row = r;
        tileEl.dataset.col = c;

        if (tileData) {
          tileEl.classList.add(`tile-suit-${tileData.suit}`);
          tileEl.innerHTML = `<div class="tile-inner"><div class="tile-face">${tileData.symbol}</div></div>`;
          tileEl.addEventListener('click', () => onTileClick(r, c, tileEl));
        } else {
          tileEl.classList.add('tile-empty');
          tileEl.innerHTML = '<div class="tile-inner"><div class="tile-face"></div></div>';
        }

        gameBoardEl.appendChild(tileEl);
      }
    }

    setTimeout(setupCanvas, 50);
  }

  function onTileClick(row, col, tileEl) {
    if (isProcessing) return;
    if (!board[row][col]) return;
    if (tileEl.classList.contains('matched')) return;

    clearHints();

    if (!selectedTile) {
      selectedTile = { row, col, el: tileEl };
      tileEl.classList.add('selected');
      return;
    }

    if (selectedTile.row === row && selectedTile.col === col) {
      selectedTile.el.classList.remove('selected');
      selectedTile = null;
      return;
    }

    const t1 = board[selectedTile.row][selectedTile.col];
    const t2 = board[row][col];

    if (t1.id === t2.id) {
      const path = findPath(selectedTile.row, selectedTile.col, row, col);
      if (path) {
        isProcessing = true;
        drawPath(path);
        tileEl.classList.add('selected');

        setTimeout(() => {
          eliminate(selectedTile, { row, col, el: tileEl });
          clearCanvas();
          selectedTile = null;
          isProcessing = false;
          matchCount++;
          updateStats();
          checkGameEnd();
        }, 400);
        return;
      }
    }

    selectedTile.el.classList.remove('selected');
    selectedTile = { row, col, el: tileEl };
    tileEl.classList.add('selected');
  }

  function eliminate(t1, t2) {
    t1.el.classList.remove('selected');
    t1.el.classList.add('matched');
    t2.el.classList.remove('selected');
    t2.el.classList.add('matched');

    setTimeout(() => {
      board[t1.row][t1.col] = null;
      board[t2.row][t2.col] = null;
      t1.el.classList.remove('matched');
      t1.el.classList.add('tile-empty');
      t1.el.innerHTML = '<div class="tile-inner"><div class="tile-face"></div></div>';
      t1.el.replaceWith(t1.el.cloneNode(true));
      t2.el.classList.remove('matched');
      t2.el.classList.add('tile-empty');
      t2.el.innerHTML = '<div class="tile-inner"><div class="tile-face"></div></div>';
      t2.el.replaceWith(t2.el.cloneNode(true));
    }, 500);
  }

  function findPath(r1, c1, r2, c2) {
    if (canConnectDirect(r1, c1, r2, c2)) return [[r1, c1], [r2, c2]];

    let path = findOneTurn(r1, c1, r2, c2);
    if (path) return path;

    path = findTwoTurns(r1, c1, r2, c2);
    if (path) return path;

    return null;
  }

  function canConnectDirect(r1, c1, r2, c2) {
    if (r1 !== r2 && c1 !== c2) return false;
    if (r1 === r2) {
      const minC = Math.min(c1, c2), maxC = Math.max(c1, c2);
      for (let c = minC + 1; c < maxC; c++) {
        if (board[r1][c]) return false;
      }
      return true;
    }
    if (c1 === c2) {
      const minR = Math.min(r1, r2), maxR = Math.max(r1, r2);
      for (let r = minR + 1; r < maxR; r++) {
        if (board[r][c1]) return false;
      }
      return true;
    }
    return false;
  }

  function isEmpty(r, c) {
    if (r < -1 || r > ROWS || c < -1 || c > COLS) return false;
    if (r === -1 || r === ROWS || c === -1 || c === COLS) return true;
    return !board[r][c];
  }

  function isLineClear(r1, c1, r2, c2) {
    if (r1 === r2) {
      const minC = Math.min(c1, c2), maxC = Math.max(c1, c2);
      for (let c = minC; c <= maxC; c++) {
        if (!isEmpty(r1, c)) return false;
      }
      return true;
    }
    if (c1 === c2) {
      const minR = Math.min(r1, r2), maxR = Math.max(r1, r2);
      for (let r = minR; r <= maxR; r++) {
        if (!isEmpty(r, c1)) return false;
      }
      return true;
    }
    return false;
  }

  function findOneTurn(r1, c1, r2, c2) {
    if (isEmpty(r1, c2) && isLineClear(r1, c1, r1, c2) && isLineClear(r1, c2, r2, c2)) {
      return [[r1, c1], [r1, c2], [r2, c2]];
    }
    if (isEmpty(r2, c1) && isLineClear(r1, c1, r2, c1) && isLineClear(r2, c1, r2, c2)) {
      return [[r1, c1], [r2, c1], [r2, c2]];
    }
    return null;
  }

  function findTwoTurns(r1, c1, r2, c2) {
    for (let c = -1; c <= COLS; c++) {
      if (c !== c1 && c !== c2 && isEmpty(r1, c) && isEmpty(r2, c)) {
        if (isLineClear(r1, c1, r1, c) && isLineClear(r1, c, r2, c) && isLineClear(r2, c, r2, c2)) {
          return [[r1, c1], [r1, c], [r2, c], [r2, c2]];
        }
      }
    }
    for (let r = -1; r <= ROWS; r++) {
      if (r !== r1 && r !== r2 && isEmpty(r, c1) && isEmpty(r, c2)) {
        if (isLineClear(r1, c1, r, c1) && isLineClear(r, c1, r, c2) && isLineClear(r, c2, r2, c2)) {
          return [[r1, c1], [r, c1], [r, c2], [r2, c2]];
        }
      }
    }
    return null;
  }

  function drawPath(path) {
    if (!path || path.length < 2) return;
    const tiles = gameBoardEl.querySelectorAll('.tile');
    const firstTile = tiles[path[0][0] * COLS + path[0][1]];
    const lastTile = tiles[path[path.length - 1][0] * COLS + path[path.length - 1][1]];

    const boardRect = gameBoardEl.getBoundingClientRect();
    const wrapperRect = gameBoardEl.parentElement.getBoundingClientRect();

    const offsetX = wrapperRect.left - boardRect.left + gameBoardEl.offsetLeft;
    const offsetY = wrapperRect.top - boardRect.top + gameBoardEl.offsetTop;

    const cellW = gameBoardEl.offsetWidth / COLS;
    const cellH = gameBoardEl.offsetHeight / ROWS;

    const points = path.map(([r, c]) => {
      let px, py;
      if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
        px = offsetX + c * cellW + cellW / 2;
        py = offsetY + r * cellH + cellH / 2;
      } else if (r === -1) {
        px = offsetX + c * cellW + cellW / 2;
        py = offsetY - 5;
      } else if (r === ROWS) {
        px = offsetX + c * cellW + cellW / 2;
        py = offsetY + ROWS * cellH + 5;
      } else if (c === -1) {
        px = offsetX - 5;
        py = offsetY + r * cellH + cellH / 2;
      } else if (c === COLS) {
        px = offsetX + COLS * cellW + 5;
        py = offsetY + r * cellH + cellH / 2;
      }
      return { x: px, y: py };
    });

    ctx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = 'rgba(245, 158, 11, 0.6)';
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.shadowColor = 'rgba(245, 158, 11, 0.8)';
    points.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
  }

  function findHintPair() {
    const remaining = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c]) remaining.push({ row: r, col: c, tile: board[r][c] });
      }
    }

    for (let i = 0; i < remaining.length; i++) {
      for (let j = i + 1; j < remaining.length; j++) {
        const a = remaining[i], b = remaining[j];
        if (a.tile.id === b.tile.id) {
          const path = findPath(a.row, a.col, b.row, b.col);
          if (path) return [{ row: a.row, col: a.col }, { row: b.row, col: b.col }];
        }
      }
    }
    return null;
  }

  function showHint() {
    if (isProcessing) return;
    clearHints();
    const pair = findHintPair();
    if (pair) {
      hintTiles = pair;
      pair.forEach(p => {
        const idx = p.row * COLS + p.col;
        const tileEl = gameBoardEl.children[idx];
        if (tileEl) tileEl.classList.add('hint');
      });
    } else {
      alert('No valid moves! Try shuffling.');
    }
  }

  function clearHints() {
    hintTiles.forEach(p => {
      const idx = p.row * COLS + p.col;
      const tileEl = gameBoardEl.children[idx];
      if (tileEl) tileEl.classList.remove('hint');
    });
    hintTiles = [];
  }

  function shuffle() {
    if (isProcessing) return;
    if (selectedTile) {
      selectedTile.el.classList.remove('selected');
      selectedTile = null;
    }
    clearHints();
    clearCanvas();

    const remaining = [];
    const positions = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c]) {
          remaining.push(board[r][c]);
          positions.push({ r, c });
        }
      }
    }

    shuffleArray(remaining);

    for (let i = 0; i < positions.length; i++) {
      board[positions[i].r][positions[i].c] = remaining[i];
    }

    const allTiles = gameBoardEl.querySelectorAll('.tile');
    positions.forEach((pos, i) => {
      const idx = pos.r * COLS + pos.c;
      const el = allTiles[idx];
      const td = remaining[i];
      el.className = 'tile tile-suit-' + td.suit;
      el.innerHTML = `<div class="tile-inner"><div class="tile-face">${td.symbol}</div></div>`;
      const newEl = el.cloneNode(true);
      newEl.addEventListener('click', () => onTileClick(pos.r, pos.c, newEl));
      el.replaceWith(newEl);
    });
  }

  function startTimer() {
    stopTimer();
    seconds = 0;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
      seconds++;
      updateTimerDisplay();
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function updateTimerDisplay() {
    const formatted = formatTime(seconds);
    timerEl.textContent = formatted;
    timerDisplayEl.textContent = formatted;
  }

  function formatTime(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  function updateStats() {
    let count = 0;
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (board[r][c]) count++;

    remainingEl.textContent = count;
    tilesLeftEl.textContent = count;
    matchesEl.textContent = matchCount;
  }

  function checkGameEnd() {
    let count = 0;
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (board[r][c]) count++;

    if (count === 0) {
      stopTimer();
      if (!bestTime || seconds < parseInt(bestTime)) {
        bestTime = String(seconds);
        localStorage.setItem('mahjong_best_time', bestTime);
        bestTimeEl.textContent = formatTime(seconds);
      }
      showVictoryModal();
      return;
    }

    if (!findHintPair()) {
      showNoMovesModal();
    }
  }

  function showVictoryModal() {
    const modal = document.getElementById('gameOverModal');
    document.getElementById('modalIcon').textContent = '🎉';
    document.getElementById('modalTitle').textContent = 'Victory!';
    document.getElementById('modalMessage').textContent = `Congratulations! You cleared the board in ${formatTime(seconds)}!`;
    document.getElementById('finalTime').textContent = formatTime(seconds);
    document.getElementById('finalMatches').textContent = matchCount;
    modal.classList.add('active');
  }

  function showNoMovesModal() {
    const modal = document.getElementById('gameOverModal');
    document.getElementById('modalIcon').textContent = '😔';
    document.getElementById('modalTitle').textContent = 'No Moves Left!';
    document.getElementById('modalMessage').textContent = 'No more valid matches available. Try shuffling or starting a new game.';
    document.getElementById('finalTime').textContent = formatTime(seconds);
    document.getElementById('finalMatches').textContent = matchCount;
    modal.classList.add('active');
  }

  function restartGame() {
    const modal = document.getElementById('gameOverModal');
    modal.classList.remove('active');
    selectedTile = null;
    matchCount = 0;
    isProcessing = false;
    hintTiles = [];
    clearCanvas();
    stopTimer();
    buildBoard();
    renderBoard();
    startTimer();
    updateStats();
  }

  function bindEvents() {
    document.getElementById('hintBtn').addEventListener('click', showHint);
    document.getElementById('shuffleBtn').addEventListener('click', shuffle);
    document.getElementById('restartBtn').addEventListener('click', restartGame);
    document.getElementById('playAgainBtn').addEventListener('click', restartGame);

    window.addEventListener('resize', () => {
      clearTimeout(window._resizeTimer);
      window._resizeTimer = setTimeout(setupCanvas, 150);
    });
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();