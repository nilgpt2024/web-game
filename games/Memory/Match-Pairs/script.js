// ==================== DOM元素 ====================
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const comboEl = document.getElementById('combo');
const hintsEl = document.getElementById('hints');

const gameBoard = document.getElementById('game-board');
const lineCanvas = document.getElementById('line-canvas');

const startBtn = document.getElementById('start-btn');
const hintBtn = document.getElementById('hint-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const resetBtn = document.getElementById('reset-btn');

const difficultyBtns = document.querySelectorAll('.difficulty-btn');

const gameOverModal = document.getElementById('game-over-modal');
const modalIcon = document.getElementById('modal-icon');
const modalTitle = document.getElementById('modal-title');
const finalScoreEl = document.getElementById('final-score');
const finalComboEl = document.getElementById('final-combo');
const modalMessageEl = document.getElementById('modal-message');
const playAgainBtn = document.getElementById('play-again-btn');

const comboToast = document.getElementById('combo-toast');
const comboTextEl = document.getElementById('combo-text');

// ==================== 游戏状态 ====================
let gameActive = false;
let timeLeft = 180; // 3分钟
let timerInterval = null;
let score = 0;
let combo = 0;
let maxCombo = 0;
let hintsRemaining = 3;

// 难度设置
const difficulties = {
  easy: { rows: 6, cols: 8, time: 240, name: "简单" },
  normal: { rows: 8, cols: 10, time: 180, name: "普通" },
  hard: { rows: 10, cols: 12, time: 120, name: "困难" }
};
let currentDifficulty = "normal";

// 图标库（扩展到60个，满足困难模式需求）
const icons = ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍑', '🍒', '🍍',
               '🥝', '🥑', '🍆', '🥕', '🌽', '🥒', '🥦', '🍄', '🥜', '🌰',
               '🍞', '🥐', '🥖', '🥨', '🧀', '🥚', '🍖', '🍗', '🥓', '🍔',
               '🍟', '🍕', '🌭', '🥪', '🌮', '🌯', '🥗', '🥘', '🍝', '🍜',
               '🍲', '🍱', '🍙', '🍚', '🍛', '🍤', '🍥', '🥮', '🍢', '🍡',
               '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬'];

// 游戏数据
let tiles = [];
let selectedTile = null;
let boardRows = 0;
let boardCols = 0;

// ==================== 初始化 ====================
/**
 * 初始化游戏
 */
function init() {
  setupEventListeners();
}

/**
 * 设置事件监听
 */
function setupEventListeners() {
  // 控制按钮
  startBtn.addEventListener('click', startGame);
  hintBtn.addEventListener('click', showHint);
  shuffleBtn.addEventListener('click', shuffleTiles);
  resetBtn.addEventListener('click', resetGame);
  playAgainBtn.addEventListener('click', playAgain);

  // 难度选择
  difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (!gameActive) {
        setDifficulty(btn.dataset.difficulty);
      }
    });
  });
}

// ==================== 难度系统 ====================
/**
 * 设置难度
 */
function setDifficulty(difficulty) {
  currentDifficulty = difficulty;
  
  // 更新按钮状态
  difficultyBtns.forEach(btn => {
    if (btn.dataset.difficulty === difficulty) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // 更新时间显示
  const config = difficulties[currentDifficulty];
  timeLeft = config.time;
  updateDisplay();
}

// ==================== 游戏控制 ====================
/**
 * 开始游戏
 */
function startGame() {
  if (gameActive) return;
  
  gameActive = true;
  score = 0;
  combo = 0;
  maxCombo = 0;
  hintsRemaining = 3;
  selectedTile = null;
  
  const config = difficulties[currentDifficulty];
  timeLeft = config.time;
  boardRows = config.rows;
  boardCols = config.cols;
  
  updateDisplay();
  
  // 切换按钮显示
  startBtn.classList.add('hide');
  hintBtn.classList.remove('hide');
  shuffleBtn.classList.remove('hide');
  resetBtn.classList.remove('hide');
  
  // 创建游戏板
  createBoard();
  
  // 启动倒计时
  timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      timeLeft = 0;
      endGame(false);
    }
    updateDisplay();
  }, 1000);
}

/**
 * 重置游戏
 */
function resetGame() {
  gameActive = false;
  score = 0;
  combo = 0;
  maxCombo = 0;
  hintsRemaining = 3;
  selectedTile = null;
  
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  
/* Author: SinceraXY */
  const config = difficulties[currentDifficulty];
  timeLeft = config.time;
  
  updateDisplay();
  
  // 清空游戏板
  gameBoard.innerHTML = '';
  tiles = [];
  clearCanvas();
  
  // 重置按钮
  startBtn.classList.remove('hide');
  hintBtn.classList.add('hide');
  shuffleBtn.classList.add('hide');
  resetBtn.classList.add('hide');
}

/**
 * 游戏结束
 */
function endGame(won) {
  gameActive = false;
  
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  
  showGameOverModal(won);
}

/**
 * 再玩一次
 */
function playAgain() {
  hideGameOverModal();
  resetGame();
  startGame();
}

// ==================== 游戏板逻辑 ====================
/**
 * 创建游戏板
 */
function createBoard() {
  gameBoard.innerHTML = '';
  tiles = [];
  
  // 设置网格布局
  gameBoard.style.gridTemplateColumns = `repeat(${boardCols}, 60px)`;
  gameBoard.style.gridTemplateRows = `repeat(${boardRows}, 60px)`;
  
  // 计算需要的图标对数
  const totalTiles = boardRows * boardCols;
  const pairCount = totalTiles / 2;
  
  // 选择图标并创建配对
  const selectedIcons = icons.slice(0, Math.min(pairCount, icons.length));
  const tileIcons = [];
  
  selectedIcons.forEach(icon => {
    tileIcons.push(icon, icon); // 添加一对
  });
  
  // 打乱顺序
  shuffleArray(tileIcons);
  
  // 创建tile对象
  for (let row = 0; row < boardRows; row++) {
    for (let col = 0; col < boardCols; col++) {
      const index = row * boardCols + col;
      const tile = {
        row: row,
        col: col,
        icon: tileIcons[index],
        element: null,
        matched: false
      };
      tiles.push(tile);
    }
  }
  
  renderBoard();
  setupCanvas();
}

/**
 * 渲染游戏板
 */
function renderBoard() {
  gameBoard.innerHTML = '';
  
  // 按照row和col的顺序渲染
  for (let row = 0; row < boardRows; row++) {
    for (let col = 0; col < boardCols; col++) {
      const tile = tiles.find(t => t.row === row && t.col === col);
      
      if (!tile || tile.matched) continue;
      
      const tileEl = document.createElement('div');
      tileEl.className = 'tile';
      tileEl.textContent = tile.icon;
      tileEl.dataset.row = row;
      tileEl.dataset.col = col;
      
      tileEl.addEventListener('click', () => handleTileClick(tile, tiles.indexOf(tile)));
      
      tile.element = tileEl;
      gameBoard.appendChild(tileEl);
    }
  }
}

/**
 * 处理tile点击
 */
function handleTileClick(tile, index) {
  if (!gameActive || tile.matched) return;
  
  if (!selectedTile) {
    // 选中第一个tile
    selectedTile = { tile, index };
    tile.element.classList.add('selected');
  } else if (selectedTile.index === index) {
    // 取消选中
    selectedTile.tile.element.classList.remove('selected');
    selectedTile = null;
  } else {
    // 检查是否可以连接
    if (selectedTile.tile.icon === tile.icon) {
      const path = findPath(selectedTile.tile, tile);
      
      if (path) {
        // 可以连接
        matchTiles(selectedTile.tile, tile, path);
        selectedTile.tile.element.classList.remove('selected');
        selectedTile = null;
      } else {
        // 不能连接，切换选中
        selectedTile.tile.element.classList.remove('selected');
        selectedTile = { tile, index };
        tile.element.classList.add('selected');
      }
    } else {
      // 图标不同，切换选中
      selectedTile.tile.element.classList.remove('selected');
      selectedTile = { tile, index };
      tile.element.classList.add('selected');
    }
  }
}

/**
 * 匹配两个tile
 */
function matchTiles(tile1, tile2, path) {
  // 绘制连线
  drawPath(path);
  
  // 标记为已匹配
  tile1.matched = true;
  tile2.matched = true;
  
  // 添加动画
  tile1.element.classList.add('matched');
  tile2.element.classList.add('matched');
  
  // 延迟移除
  setTimeout(() => {
    if (tile1.element) tile1.element.classList.add('empty');
    if (tile2.element) tile2.element.classList.add('empty');
    clearCanvas();
    
    // 检查是否完成
    checkCompletion();
  }, 500);
  
  // 更新分数和连击
  combo++;
  maxCombo = Math.max(maxCombo, combo);
  
  let points = 10;
  if (combo >= 10) {
    points = 50;
  } else if (combo >= 5) {
    points = 30;
  } else if (combo >= 3) {
    points = 20;
  }
  
  score += points;
  
  // 显示连击提示
  if (combo >= 3 && combo % 5 === 0) {
    showComboToast();
  }
  
  updateDisplay();
}

/**
 * 检查是否完成
 */
function checkCompletion() {
  const remainingTiles = tiles.filter(t => !t.matched).length;
  
  if (remainingTiles === 0) {
    // 游戏胜利
    setTimeout(() => endGame(true), 500);
  } else {
    // 检查是否还有可消除的配对
    if (!hasValidMoves()) {
      // 自动重排
      console.log('检测到无解，1秒后自动重排...');
      setTimeout(() => {
        if (gameActive && !hasValidMoves()) {
          console.log('执行自动重排');
          shuffleTiles();
        }
      }, 1000);
    }
  }
}

/**
 * 检查是否还有有效移动
 */
function hasValidMoves() {
  const activeTiles = tiles.filter(t => !t.matched);
  
  for (let i = 0; i < activeTiles.length; i++) {
    for (let j = i + 1; j < activeTiles.length; j++) {
      if (activeTiles[i].icon === activeTiles[j].icon) {
        const path = findPath(activeTiles[i], activeTiles[j]);
        if (path) return true;
      }
    }
  }
  
  return false;
}

// ==================== 路径查找 ====================
/**
 * 检查位置是否为空（不包括起点和终点）
 */
function isEmpty(row, col, excludeTiles = []) {
  // 边界外视为空
  if (row < 0 || row >= boardRows || col < 0 || col >= boardCols) {
    return true;
  }
  
  // 检查是否是要排除的tile
  for (let excludeTile of excludeTiles) {
    if (excludeTile.row === row && excludeTile.col === col) {
      return true; // 排除的tile视为空
    }
  }
  
  const tile = tiles.find(t => t.row === row && t.col === col);
  return !tile || tile.matched;
}

/**
 * 检查水平连接（不包括起点和终点）
 */
function canConnectHorizontal(col1, col2, row, excludeTiles = []) {
  const minCol = Math.min(col1, col2);
  const maxCol = Math.max(col1, col2);
  
  // 检查中间的每一格
  for (let col = minCol + 1; col < maxCol; col++) {
    if (!isEmpty(row, col, excludeTiles)) {
      return false;
    }
  }
  
  return true;
}

/**
 * 检查垂直连接（不包括起点和终点）
 */
function canConnectVertical(row1, row2, col, excludeTiles = []) {
  const minRow = Math.min(row1, row2);
  const maxRow = Math.max(row1, row2);
  
  // 检查中间的每一格
  for (let row = minRow + 1; row < maxRow; row++) {
    if (!isEmpty(row, col, excludeTiles)) {
      return false;
    }
  }
  
  return true;
}

/**
 * 查找连接路径（最多2个转折）
 */
function findPath(tile1, tile2) {
  const excludeTiles = [tile1, tile2]; // 起点和终点不算障碍
  
  // 直线连接（0个转折）
  if (tile1.row === tile2.row) {
    if (canConnectHorizontal(tile1.col, tile2.col, tile1.row, excludeTiles)) {
      return [
        { row: tile1.row, col: tile1.col },
        { row: tile2.row, col: tile2.col }
      ];
    }
  }
  
  if (tile1.col === tile2.col) {
    if (canConnectVertical(tile1.row, tile2.row, tile1.col, excludeTiles)) {
      return [
        { row: tile1.row, col: tile1.col },
        { row: tile2.row, col: tile2.col }
      ];
    }
  }
  
  // 1个转折 - 路径1: tile1 -> (tile1.row, tile2.col) -> tile2
  const corner1 = { row: tile1.row, col: tile2.col };
  // corner1必须为空（且不是tile2的位置）
  if (!(corner1.row === tile2.row && corner1.col === tile2.col) && 
      isEmpty(corner1.row, corner1.col, excludeTiles)) {
    if (canConnectHorizontal(tile1.col, corner1.col, tile1.row, excludeTiles) &&
        canConnectVertical(corner1.row, tile2.row, corner1.col, excludeTiles)) {
      return [
        { row: tile1.row, col: tile1.col },
        corner1,
        { row: tile2.row, col: tile2.col }
      ];
    }
  }
  
  // 1个转折 - 路径2: tile1 -> (tile2.row, tile1.col) -> tile2
  const corner2 = { row: tile2.row, col: tile1.col };
  // corner2必须为空（且不是tile2的位置）
  if (!(corner2.row === tile2.row && corner2.col === tile2.col) &&
      isEmpty(corner2.row, corner2.col, excludeTiles)) {
    if (canConnectVertical(tile1.row, corner2.row, tile1.col, excludeTiles) &&
        canConnectHorizontal(corner2.col, tile2.col, corner2.row, excludeTiles)) {
      return [
        { row: tile1.row, col: tile1.col },
        corner2,
        { row: tile2.row, col: tile2.col }
      ];
    }
  }
  
  // 2个转折
  const path2Turns = findPath2Turns(tile1, tile2, excludeTiles);
  if (path2Turns) return path2Turns;
  
  return null;
}

/**
 * 查找2个转折的路径
 */
function findPath2Turns(tile1, tile2, excludeTiles) {
  // 尝试扩展行 (通过水平线连接两个垂直段)
  for (let row = -1; row <= boardRows; row++) {
    // 检查三段路径：
    // 1. tile1垂直到(row, tile1.col)
    // 2. (row, tile1.col)水平到(row, tile2.col)
    // 3. (row, tile2.col)垂直到tile2
    
    const mid1 = { row: row, col: tile1.col };
    const mid2 = { row: row, col: tile2.col };
    
    // 中间点必须为空
    const mid1Empty = isEmpty(mid1.row, mid1.col, excludeTiles);
    const mid2Empty = isEmpty(mid2.row, mid2.col, excludeTiles);
    
    if (mid1Empty && mid2Empty &&
        canConnectVertical(tile1.row, row, tile1.col, excludeTiles) &&
        canConnectHorizontal(tile1.col, tile2.col, row, excludeTiles) &&
        canConnectVertical(row, tile2.row, tile2.col, excludeTiles)) {
      return [
        { row: tile1.row, col: tile1.col },
        { row: row, col: tile1.col },
        { row: row, col: tile2.col },
        { row: tile2.row, col: tile2.col }
      ];
    }
  }
  
  // 尝试扩展列 (通过垂直线连接两个水平段)
  for (let col = -1; col <= boardCols; col++) {
    // 检查三段路径：
    // 1. tile1水平到(tile1.row, col)
    // 2. (tile1.row, col)垂直到(tile2.row, col)
    // 3. (tile2.row, col)水平到tile2
    
    const mid1 = { row: tile1.row, col: col };
    const mid2 = { row: tile2.row, col: col };
    
    // 中间点必须为空
    const mid1Empty = isEmpty(mid1.row, mid1.col, excludeTiles);
    const mid2Empty = isEmpty(mid2.row, mid2.col, excludeTiles);
    
    if (mid1Empty && mid2Empty &&
        canConnectHorizontal(tile1.col, col, tile1.row, excludeTiles) &&
        canConnectVertical(tile1.row, tile2.row, col, excludeTiles) &&
        canConnectHorizontal(col, tile2.col, tile2.row, excludeTiles)) {
      return [
        { row: tile1.row, col: tile1.col },
        { row: tile1.row, col: col },
        { row: tile2.row, col: col },
        { row: tile2.row, col: tile2.col }
      ];
    }
  }
  
  return null;
}

// ==================== Canvas绘制 ====================
/**
 * 设置canvas
 */
function setupCanvas() {
  const boardRect = gameBoard.getBoundingClientRect();
  const parentRect = gameBoard.parentElement.getBoundingClientRect();
  
  // canvas需要覆盖整个游戏区域，包括可能的边界外空间
  const padding = 100; // 额外空间用于边界外连线
  lineCanvas.width = boardRect.width + padding * 2;
  lineCanvas.height = boardRect.height + padding * 2;
  
  // 定位canvas，使其中心对齐gameBoard
  lineCanvas.style.width = (boardRect.width + padding * 2) + 'px';
  lineCanvas.style.height = (boardRect.height + padding * 2) + 'px';
  lineCanvas.style.left = (boardRect.left - parentRect.left - padding) + 'px';
  lineCanvas.style.top = (boardRect.top - parentRect.top - padding) + 'px';
}

/**
 * 获取tile的canvas坐标
 */
function getTileCanvasPosition(row, col) {
  const canvasRect = lineCanvas.getBoundingClientRect();
  
  // 查找对应的tile
  const tile = tiles.find(t => t.row === row && t.col === col);
  
  if (tile && tile.element && !tile.matched) {
    // tile存在，使用实际位置
    const tileRect = tile.element.getBoundingClientRect();
    return {
      x: tileRect.left - canvasRect.left + tileRect.width / 2,
      y: tileRect.top - canvasRect.top + tileRect.height / 2
    };
  } else {
    // tile不存在或在边界外，计算位置
    const tileElements = gameBoard.querySelectorAll('.tile');
    if (tileElements.length === 0) return null;
    
    // 获取第一个tile的位置作为参考
    const firstTile = tiles.find(t => t.element && !t.matched);
    if (!firstTile || !firstTile.element) return null;
    
    const firstRect = firstTile.element.getBoundingClientRect();
    const tileWidth = firstRect.width;
    const tileHeight = firstRect.height;
    
    // 计算间距
    const secondTile = tiles.find(t => t.element && !t.matched && t.row === firstTile.row && t.col === firstTile.col + 1);
    const gap = secondTile ? 
      secondTile.element.getBoundingClientRect().left - firstRect.right : 8;
    
    // 计算目标位置（相对于第一个tile）
    const offsetX = (col - firstTile.col) * (tileWidth + gap);
    const offsetY = (row - firstTile.row) * (tileHeight + gap);
    
    return {
      x: firstRect.left - canvasRect.left + firstRect.width / 2 + offsetX,
      y: firstRect.top - canvasRect.top + firstRect.height / 2 + offsetY
    };
  }
}

/**
 * 绘制路径（横平竖直）
 */
function drawPath(path) {
  if (!path || path.length < 2) return;
  
  const ctx = lineCanvas.getContext('2d');
  ctx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
  
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  ctx.beginPath();
  
  // 绘制横平竖直的连线
  for (let i = 0; i < path.length; i++) {
    const point = path[i];
    const pos = getTileCanvasPosition(point.row, point.col);
    
    if (!pos) {
      console.error('无法获取tile位置', point);
      return;
    }
    
    if (i === 0) {
      ctx.moveTo(pos.x, pos.y);
    } else {
      // 确保横平竖直
      const prevPoint = path[i - 1];
      const prevPos = getTileCanvasPosition(prevPoint.row, prevPoint.col);
      
      if (!prevPos) return;
      
      // 如果是水平或垂直移动，直接连线
      if (point.row === prevPoint.row || point.col === prevPoint.col) {
        ctx.lineTo(pos.x, pos.y);
      } else {
        // 转角：先水平再垂直，或先垂直再水平
        // 这里应该不会发生，因为路径算法保证了横平竖直
        ctx.lineTo(pos.x, pos.y);
      }
    }
  }
  
  ctx.stroke();
}

/**
 * 清除canvas
 */
function clearCanvas() {
  const ctx = lineCanvas.getContext('2d');
  ctx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
}

// ==================== 辅助功能 ====================
/**
 * 显示提示
 */
function showHint() {
  if (!gameActive || hintsRemaining <= 0) return;
  
  // 移除之前的提示
  tiles.forEach(tile => {
    if (tile.element) {
      tile.element.classList.remove('hint');
    }
  });
  
  // 查找一对可以消除的tile
  const activeTiles = tiles.filter(t => !t.matched);
  
  for (let i = 0; i < activeTiles.length; i++) {
    for (let j = i + 1; j < activeTiles.length; j++) {
      if (activeTiles[i].icon === activeTiles[j].icon) {
        const path = findPath(activeTiles[i], activeTiles[j]);
        if (path) {

// GitHub: https://github.com/nilgpt2024/web-game

          // 找到可消除的配对
          if (activeTiles[i].element && activeTiles[j].element) {
            activeTiles[i].element.classList.add('hint');
            activeTiles[j].element.classList.add('hint');
            
            hintsRemaining--;
            combo = 0; // 使用提示重置连击
            updateDisplay();
            
            // 3秒后移除提示
            setTimeout(() => {
              if (activeTiles[i].element) activeTiles[i].element.classList.remove('hint');
              if (activeTiles[j].element) activeTiles[j].element.classList.remove('hint');
/* Made with love by SinceraXY */
            }, 3000);
          }
          
          return;
        }
      }
    }
  }
  
  // 没有找到可消除的配对，触发自动重排
  console.log('提示：没有可消除的配对，自动重排...');
  if (!hasValidMoves()) {
    shuffleTiles();
  }
}

/**
 * 重排tiles
 */
function shuffleTiles() {
  if (!gameActive) return;
  
  console.log('开始重排...');
  
  // 获取所有未匹配的图标
  const activeIcons = tiles.filter(t => !t.matched).map(t => t.icon);
  
  if (activeIcons.length === 0) {
    console.log('没有图标需要重排');
    return;
  }
  
  // 显示重排提示
  showShuffleMessage();
  
  // 最多尝试10次，确保重排后有解
  let maxAttempts = 10;
  let attempt = 0;
  let hasValidPath = false;
  
  while (attempt < maxAttempts && !hasValidPath) {
    attempt++;
    console.log(`重排尝试 ${attempt}/${maxAttempts}`);
    
    // 打乱图标数组
    const shuffledIcons = [...activeIcons];
    shuffleArray(shuffledIcons);
    
    // 先将所有tile标记为matched（临时）
    tiles.forEach(tile => {
      if (!tile.matched) {
        tile.matched = true; // 临时标记
        tile.element = null;
      }
    });
    
    // 重新分配：将未消除的tile重新排列到前面的位置
    let iconIndex = 0;
    for (let row = 0; row < boardRows; row++) {
      for (let col = 0; col < boardCols; col++) {
        if (iconIndex < shuffledIcons.length) {
          let tile = tiles.find(t => t.row === row && t.col === col);
          
          if (tile) {
            tile.icon = shuffledIcons[iconIndex];
            tile.matched = false;
            tile.element = null;
          } else {
            tile = {
              row: row,
              col: col,
              icon: shuffledIcons[iconIndex],
              element: null,
              matched: false
            };
            tiles.push(tile);
          }
          
          iconIndex++;
        }
      }
    }
    
    // 检查是否有可行的移动
    hasValidPath = hasValidMoves();
    
    if (hasValidPath) {
      console.log(`重排成功！第${attempt}次尝试找到有效布局`);
      break;
    } else {
      console.log(`第${attempt}次尝试无解，继续尝试...`);
    }
  }
  
  if (!hasValidPath) {
    console.warn('警告：重排10次后仍无解，可能需要手动干预');
  }
  
  // 清除选中状态
  if (selectedTile) {
    if (selectedTile.tile.element) {
      selectedTile.tile.element.classList.remove('selected');
    }
    selectedTile = null;
  }
  
  // 重新渲染
  renderBoard();
  
  combo = 0; // 重排重置连击
  updateDisplay();
}

/**
 * 显示重排提示消息
 */
function showShuffleMessage() {
  const message = document.createElement('div');
  message.className = 'shuffle-message';
  message.textContent = '🔀 正在重新排列...';
  document.body.appendChild(message);
  
  setTimeout(() => {
    message.remove();
  }, 1500);
}

/**
 * 打乱数组
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// ==================== UI更新 ====================
/**
 * 更新显示
 */
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  scoreEl.textContent = score;
  comboEl.textContent = combo;
  hintsEl.textContent = hintsRemaining;
}

/**
 * 显示连击提示
 */
function showComboToast() {
  comboTextEl.textContent = `${combo} COMBO!`;
  comboToast.classList.remove('hide');
  
  setTimeout(() => {
    comboToast.classList.add('hide');
  }, 1000);
}

// ==================== 弹窗控制 ====================
/**
 * 显示游戏结束弹窗
 */
function showGameOverModal(won) {
  if (won) {
    modalIcon.textContent = '🎉';
    modalTitle.textContent = '恭喜通关！';
    
    if (score >= 500) {
      modalMessageEl.textContent = '🏆 完美！连连看大师！';
    } else if (score >= 300) {
      modalMessageEl.textContent = '🌟 太棒了！眼力超群！';
    } else {
      modalMessageEl.textContent = '👍 不错！继续加油！';
    }
  } else {
    modalIcon.textContent = '⏰';
    modalTitle.textContent = '时间到！';
    modalMessageEl.textContent = '😊 再试一次吧！';
  }
  
  finalScoreEl.textContent = score;
  finalComboEl.textContent = maxCombo;
  
  gameOverModal.classList.remove('hide');
}

/**
 * 隐藏游戏结束弹窗
 */
function hideGameOverModal() {
  gameOverModal.classList.add('hide');
}

// ==================== 启动 ====================
init();
