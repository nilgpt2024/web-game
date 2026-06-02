const CONFIG = {
  canvasWidth: 800,
  canvasHeight: 600,
  player: {
    width: 44,
    height: 50,
    speed: 5.5,
    maxHp: 100,
    color: '#0d9488',
    glowColor: 'rgba(13,148,136,0.6)'
  },
  bullet: {
    width: 4,
    height: 16,
    speed: 10,
    color: '#14b8a6',
    glowColor: 'rgba(20,184,166,0.7)',
    cooldown: 12
  },
  enemies: {
    scout: { width: 30, height: 28, hp: 1, speed: 2.5, score: 100, color: '#22c55e', shootRate: 180 },
    fighter: { width: 36, height: 34, hp: 3, speed: 2, score: 200, color: '#f97316', shootRate: 120 },
    heavy: { width: 48, height: 44, hp: 6, speed: 1.2, score: 350, color: '#a855f7', shootRate: 90 },
    elite: { width: 40, height: 38, hp: 10, speed: 1.8, score: 500, color: '#ef4444', shootRate: 60 }
  },
  boss: {
    width: 140,
    height: 100,
    baseHp: 80,
    speed: 1.2,
    score: 2000,
    color: '#dc2626',
    shootRate: 25,
    patternSwitchTime: 120
  },
  powerups: {
    fire: { color: '#f97316', label: 'FIRE', duration: 600 },
    shield: { color: '#3b82f6', label: 'SHIELD', duration: 420 },
    heal: { color: '#22c55e', label: 'HEAL', duration: 0 },
    bomb: { color: '#ef4444', label: 'BOMB', duration: 0 }
  },
  particles: {
    explosionCount: 20,
    trailCount: 3
  }
};

let canvas, ctx;
let gameActive = false;
let gamePaused = false;
let score = 0;
let kills = 0;
let wave = 1;
let highScore = 0;
let soundEnabled = true;
let player = null;
let enemies = [];
let bullets = [];
let enemyBullets = [];
let particles = [];
let powerups = [];
let stars = [];
let boss = null;
let keys = {};
let shootCooldown = 0;
let waveTimer = 0;
let enemiesThisWave = 0;
let enemiesSpawned = 0;
let spawnTimer = 0;
let displayDirty = false;
let audioContext = null;
let audioInitialized = false;

function getAudioContext() {
  if (!audioContext) {
    try { audioContext = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; }
  }
  if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
  return audioContext;
}

function initAudio() {
  if (!audioInitialized && soundEnabled) {
    audioInitialized = true;
    setTimeout(() => getAudioContext(), 0);
  }
}

(function initStars() {
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: Math.random() * CONFIG.canvasWidth,
      y: Math.random() * CONFIG.canvasHeight,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 2 + 0.5,
      brightness: Math.random() * 0.6 + 0.3
    });
  }
})();

const $ = id => document.getElementById(id);
const scoreEl = $('score');
const livesEl = $('lives');
const waveEl = $('wave');
const powerLevelEl = $('powerLevel');
const highScoreEl = $('highScore');
const hpBarEl = $('hpBar');
const startOverlay = $('startOverlay');
const pauseOverlay = $('pauseOverlay');
const startBtn = $('startBtn');
const pauseBtn = $('pauseBtn');
const restartBtn = $('restartBtn');
const soundBtn = $('soundBtn');
const resumeBtn = $('resumeBtn');
const quitBtn = $('quitBtn');
const gameOverModal = $('gameOverModal');
const playAgainBtn = $('playAgainBtn');
const backToMenuBtn = $('backToMenuBtn');
const waveAnnounce = $('waveAnnounce');
const waveTextEl = $('waveText');

document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  loadHighScore();
  attachEvents();
  updateDisplay();
});

function initCanvas() {
  canvas = $('gameCanvas');
  ctx = canvas.getContext('2d');
  canvas.width = CONFIG.canvasWidth;
  canvas.height = CONFIG.canvasHeight;
  drawBackground();
}

function attachEvents() {
  startBtn.addEventListener('click', startGame);
  pauseBtn.addEventListener('click', togglePause);
  restartBtn.addEventListener('click', restartGame);
  soundBtn.addEventListener('click', toggleSound);
  resumeBtn?.addEventListener('click', togglePause);
  quitBtn?.addEventListener('click', quitToMenu);
  playAgainBtn.addEventListener('click', () => { closeModal(gameOverModal); restartGame(); });
  backToMenuBtn?.addEventListener('click', () => { closeModal(gameOverModal); quitToMenu(); });
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
}

function startGame() {
  startOverlay.classList.add('hidden');
  gameActive = true;
  gamePaused = false;
  initAudio();
  resetGame();
  gameLoop();
}

function togglePause() {
  if (!gameActive || boss && boss.defeated) return;
  gamePaused = !gamePaused;
  if (gamePaused) {
    pauseOverlay.classList.remove('hidden');
    pauseBtn.querySelector('.btn-text').textContent = '继续';
    pauseBtn.querySelector('.btn-icon').textContent = '▶️';
  } else {
    pauseOverlay.classList.add('hidden');
    pauseBtn.querySelector('.btn-text').textContent = '暂停';
    pauseBtn.querySelector('.btn-icon').textContent = '⏸️';
  }
}

function restartGame() {
  gameActive = false;
  gamePaused = false;
  score = 0;
  kills = 0;
  wave = 1;
  updateDisplay();
  startOverlay.classList.remove('hidden');
  pauseOverlay.classList.add('hidden');
  pauseBtn.querySelector('.btn-text').textContent = '暂停';
  pauseBtn.querySelector('.btn-icon').textContent = '⏸️';
  drawBackground();
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  soundBtn.classList.toggle('muted');
  soundBtn.querySelector('.btn-icon').textContent = soundEnabled ? '🔊' : '🔇';
}

function endGame() {
  gameActive = false;
  const isNewHigh = score > highScore;
  if (isNewHigh) { highScore = score; saveHighScore(); }
  $('finalScore').textContent = score;
  $('finalWave').textContent = wave;
  $('finalKills').textContent = kills;
  const hsCard = $('newHighScoreCard');
  if (isNewHigh && hsCard) {
    hsCard.style.display = 'flex';
    $('finalHighScore').textContent = highScore;
  } else if (hsCard) hsCard.style.display = 'none';
  setTimeout(() => gameOverModal.classList.add('active'), 500);
}

function closeModal(m) { m.classList.remove('active'); }

function resetGame() {
  player = {
    x: CONFIG.canvasWidth / 2 - CONFIG.player.width / 2,
    y: CONFIG.canvasHeight - CONFIG.player.height - 30,
    w: CONFIG.player.width,
    h: CONFIG.player.height,
    speed: CONFIG.player.speed,
    hp: CONFIG.player.maxHp,
    maxHp: CONFIG.player.maxHp,
    powerLevel: 1,
    shield: false,
    shieldTimer: 0,
    invincible: false,
    invincibleTimer: 0
  };
  enemies = [];
  bullets = [];
  enemyBullets = [];
  particles = [];
  powerups = [];
  boss = null;
  shootCooldown = 0;
  waveTimer = 0;
  enemiesSpawned = 0;
  spawnTimer = 0;
  setupWave();
  displayDirty = true;
  updateDisplay();
}

function setupWave() {
  const isBossWave = wave % 5 === 0;
  if (isBossWave) {
    enemiesThisWave = 1;
    announceWave(true);
  } else {
    enemiesThisWave = 5 + wave * 3 + Math.floor(wave / 2) * 2;
    announceWave(false);
  }
  enemiesSpawned = 0;
  spawnTimer = 0;
}

function announceWave(isBoss) {
  waveAnnounce.classList.remove('hidden');
  waveTextEl.textContent = isBoss ? `⚠️ BOSS WAVE ${wave} ⚠️` : `— WAVE ${wave} —`;
  waveTextEl.className = 'wave-text' + (isBoss ? ' boss-wave' : '');
  setTimeout(() => waveAnnounce.classList.add('hidden'), 2000);
}

function handleKeyDown(e) {
  keys[e.key.toLowerCase()] = true;
  if (e.key === ' ') { e.preventDefault(); if (gameActive && !gamePaused) tryShoot(); }
  if (e.key === 'p' || e.key === 'P') togglePause();
  if (['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright',' '].includes(e.key.toLowerCase())) e.preventDefault();
}

function handleKeyUp(e) { keys[e.key.toLowerCase()] = false; }

function gameLoop() {
  if (!gameActive) return;
  if (!gamePaused) { update(); draw(); }
  requestAnimationFrame(gameLoop);
}

function update() {
  updateStars();
  updatePlayer();
  updateBullets();
  updateEnemyBullets();
  updateEnemies();
  updateParticles();
  updatePowerups();
  if (boss) updateBoss();

  if (shootCooldown > 0) shootCooldown--;
  if (keys[' '] && shootCooldown <= 0 && gameActive) tryShoot();

  spawnEnemies();
  checkCollisions();
  checkWaveComplete();
  if (displayDirty) { updateDisplay(); displayDirty = false; }
}

function updateStars() {
  for (let s of stars) {
    s.y += s.speed;
    if (s.y > CONFIG.canvasHeight) { s.y = 0; s.x = Math.random() * CONFIG.canvasWidth; }
  }
}

function updatePlayer() {
  let dx = 0, dy = 0;
  if (keys['w'] || keys['arrowup']) dy -= player.speed;
  if (keys['s'] || keys['arrowdown']) dy += player.speed;
  if (keys['a'] || keys['arrowleft']) dx -= player.speed;
  if (keys['d'] || keys['arrowright']) dx += player.speed;
  if (dx !== 0 && dy !== 0) { dx *= 0.707; dy *= 0.707; }

  player.x = Math.max(0, Math.min(CONFIG.canvasWidth - player.w, player.x + dx));
  player.y = Math.max(0, Math.min(CONFIG.canvasHeight - player.h, player.y + dy));

  if (player.shield) {
    player.shieldTimer--;
    if (player.shieldTimer <= 0) player.shield = false;
  }
  if (player.invincible) {
    player.invincibleTimer--;
    if (player.invincibleTimer <= 0) player.invincible = false;
  }

  if (Math.abs(dx) > 0 || Math.abs(dy) > 0) spawnEngineTrail();
}

function spawnEngineTrail() {
  for (let i = 0; i < CONFIG.particles.trailCount; i++) {
    particles.push({
      x: player.x + player.w / 2 + (Math.random() - 0.5) * 12,
      y: player.y + player.h,
      vx: (Math.random() - 0.5) * 1.5,
      vy: Math.random() * 3 + 2,
      life: 1,
      decay: 0.04 + Math.random() * 0.03,
      size: Math.random() * 4 + 2,
      color: `hsl(${170 + Math.random() * 20}, 85%, ${50 + Math.random() * 20}%)`
    });
  }
}

function tryShoot() {
  shootCooldown = CONFIG.bullet.cooldown;
  const pl = player.powerLevel;
  const bw = CONFIG.bullet.width;
  const bh = CONFIG.bullet.height;
  const cx = player.x + player.w / 2;
  const topY = player.y;

  if (pl >= 1) createBullet(cx - bw / 2, topY, 0, -CONFIG.bullet.speed);
  if (pl >= 2) { createBullet(cx - 14, topY + 6, -0.8, -CONFIG.bullet.speed * 0.95); createBullet(cx + 10, topY + 6, 0.8, -CONFIG.bullet.speed * 0.95); }
  if (pl >= 3) { createBullet(cx - 22, topY + 12, -1.5, -CONFIG.bullet.speed * 0.88); createBullet(cx + 18, topY + 12, 1.5, -CONFIG.bullet.speed * 0.88); }
  if (pl >= 4) { createBullet(cx - bw / 2, topY, 0, -CONFIG.bullet.speed * 1.15); }
  playSound('shoot');
}

function createBullet(x, y, vx, vy) {
  bullets.push({ x, y, w: CONFIG.bullet.width, h: CONFIG.bullet.height, vx, vy });
}

function updateBullets() {
  bullets = bullets.filter(b => { b.x += b.vx; b.y += b.vy; return b.y > -20 && b.x > -20 && b.x < CONFIG.canvasWidth + 20; });
}

function updateEnemyBullets() {
  enemyBullets = enemyBullets.filter(b => { b.x += b.vx || 0; b.y += b.vy || 0; return b.y < CONFIG.canvasHeight + 20 && b.y > -20 && b.x > -20 && b.x < CONFIG.canvasWidth + 20; });
}

function spawnEnemies() {
  if (enemiesSpawned >= enemiesThisWave) return;
  const isBossWave = wave % 5 === 0;
  if (isBossWave && !boss && enemiesSpawned === 0) { spawnBoss(); enemiesSpawned++; return; }

  spawnTimer++;
  const spawnInterval = Math.max(35, 80 - wave * 3);
  if (spawnTimer < spawnInterval) return;
  spawnTimer = 0;

  const r = Math.random();
  let type;
  if (wave < 3) type = r < 0.7 ? 'scout' : 'fighter';
  else if (wave < 6) type = r < 0.4 ? 'scout' : r < 0.75 ? 'fighter' : 'heavy';
  else type = r < 0.25 ? 'scout' : r < 0.55 ? 'fighter' : r < 0.85 ? 'heavy' : 'elite';

  const cfg = CONFIG.enemies[type];
  const scale = 1 + (wave - 1) * 0.06;
  enemies.push({
    x: Math.random() * (CONFIG.canvasWidth - cfg.width - 40) + 20,
    y: -cfg.height - Math.random() * 60,
    w: cfg.width,
    h: cfg.height,
    type,
    hp: Math.ceil(cfg.hp * (1 + (wave - 1) * 0.12)),
    maxHp: Math.ceil(cfg.hp * (1 + (wave - 1) * 0.12)),
    speed: cfg.speed * Math.min(scale, 1.8),
    score: cfg.score,
    color: cfg.color,
    shootTimer: Math.random() * cfg.shootRate,
    shootRate: Math.max(30, cfg.shootRate - wave * 3),
    angle: 0,
    movePattern: Math.floor(Math.random() * 3)
  });
  enemiesSpawned++;
}

function spawnBoss() {
  const bCfg = CONFIG.boss;
  boss = {
    x: CONFIG.canvasWidth / 2 - bCfg.width / 2,
    y: -bCfg.height - 20,
    targetY: 60,
    w: bCfg.width,
    h: bCfg.height,
    hp: bCfg.baseHp + wave * 25,
    maxHp: bCfg.baseHp + wave * 25,
    speed: bCfg.speed,
    score: bCfg.score + wave * 200,
    color: bCfg.color,
    shootTimer: 0,
    shootRate: bCfg.shootRate,
    phase: 0,
    patternTimer: 0,
    angle: 0,
    entering: true,
    defeated: false,
    moveDir: 1
  };
}

function updateBoss() {
  if (boss.defeated) return;
  if (boss.entering) {
    boss.y += 2;
    if (boss.y >= boss.targetY) boss.entering = false;
    return;
  }

  boss.angle += 0.02;
  boss.x += boss.moveDir * boss.speed;
  if (boss.x <= 10) boss.moveDir = 1;
  if (boss.x + boss.w >= CONFIG.canvasWidth - 10) boss.moveDir = -1;
  boss.y = boss.targetY + Math.sin(boss.angle) * 20;

  boss.patternTimer++;
  if (boss.patternTimer >= CONFIG.boss.patternSwitchTime) {
    boss.patternTimer = 0;
    boss.phase = (boss.phase + 1) % 4;
  }

  boss.shootTimer++;
  if (boss.shootTimer >= boss.shootRate) {
    boss.shootTimer = 0;
    bossAttackPattern();
  }
}

function bossAttackPattern() {
  const cx = boss.x + boss.w / 2;
  const by = boss.y + boss.h;
  switch (boss.phase) {
    case 0:
      for (let i = -2; i <= 2; i++) {
        enemyBullets.push({ x: cx + i * 24, y: by, w: 6, h: 14, vx: i * 0.8, vy: 4.5, color: '#dc2626' });
      }
      break;
    case 1:
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
        enemyBullets.push({ x: cx, y: boss.y + boss.h / 2, w: 5, h: 5, vx: Math.cos(a) * 3.5, vy: Math.sin(a) * 3.5, color: '#f97316', circular: true });
      }
      break;
    case 2:
      enemyBullets.push({ x: cx - 30, y: by, w: 8, h: 20, vx: 0, vy: 6, color: '#ef4444' });
      enemyBullets.push({ x: cx + 22, y: by, w: 8, h: 20, vx: 0, vy: 6, color: '#ef4444' });
      break;
    case 3:
      const aimX = player.x + player.w / 2;
      const aimY = player.y + player.h / 2;
      const angle = Math.atan2(aimY - by, aimX - cx);
      for (let i = -1; i <= 1; i++) {
        const spreadAngle = angle + i * 0.15;
        enemyBullets.push({ x: cx, y: by, w: 7, h: 16, vx: Math.cos(spreadAngle) * 5.5, vy: Math.sin(spreadAngle) * 5.5, color: '#a855f7' });
      }
      break;
  }
  playSound('bossShoot');
}

function updateEnemies() {
  for (let e of enemies) {
    e.angle += 0.03;
    switch (e.movePattern) {
      case 0: e.y += e.speed; break;
      case 1: e.y += e.speed * 0.8; e.x += Math.sin(e.angle) * 1.5; break;
      case 2: e.y += e.speed * 0.9; e.x += Math.cos(e.angle * 0.7) * 2; break;
    }

    e.shootTimer++;
    if (e.shootTimer >= e.shootRate) {
      e.shootTimer = 0;
      const bx = e.x + e.w / 2 - 2;
      const by = e.y + e.h;
      if (player && e.type === 'elite') {
        const ax = player.x + player.w / 2;
        const ay = player.y + player.h / 2;
        const a = Math.atan2(ay - by, ax - bx);
        enemyBullets.push({ x: bx, y: by, w: 5, h: 12, vx: Math.cos(a) * 4.5, vy: Math.sin(a) * 4.5, color: e.color });
      } else {
        enemyBullets.push({ x: bx, y: by, w: 4, h: 12, vx: 0, vy: 4 + wave * 0.2, color: e.color });
      }
    }

    if (e.y > CONFIG.canvasHeight + 20) e.hp = 0;
  }
  enemies = enemies.filter(e => e.hp > 0);
}

function updateParticles() {
  particles = particles.filter(p => {
    p.x += p.vx || 0;
    p.y += p.vy || 0;
    p.life -= p.decay;
    p.size *= 0.97;
    return p.life > 0;
  });
}

function updatePowerups() {
  powerups = powerups.filter(p => {
    p.y += 1.5;
    p.angle = (p.angle || 0) + 0.05;
    return p.y < CONFIG.canvasHeight + 20;
  });
}

function checkCollisions() {
  for (let bi = bullets.length - 1; bi >= 0; bi--) {
    const b = bullets[bi];
    if (boss && !boss.defeated && rectCollide(b, boss)) {
      bullets.splice(bi, 1);
      boss.hp -= 1 + Math.floor(player.powerLevel / 2);
      spawnHitParticles(b.x + b.w / 2, b.y, boss.color, 4);
      playSound('hit');
      if (boss.hp <= 0) defeatBoss();
      continue;
    }
    for (let ei = enemies.length - 1; ei >= 0; ei--) {
      const e = enemies[ei];
      if (rectCollide(b, e)) {
        bullets.splice(bi, 1);
        e.hp -= 1 + Math.floor(player.powerLevel / 2);
        spawnHitParticles(b.x + b.w / 2, b.y, e.color, 4);
        playSound('hit');
        if (e.hp <= 0) destroyEnemy(ei);
        break;
      }
    }
  }

  if (!player.invincible) {
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
      const eb = enemyBullets[i];
      if (rectCollide(eb, player)) {
        enemyBullets.splice(i, 1);
        if (player.shield) { player.shield = false; playSound('shield'); continue; }
        player.hp -= 12 + wave;
        player.invincible = true;
        player.invincibleTimer = 60;
        spawnExplosion(player.x + player.w / 2, player.y + player.h / 2, '#0d9488', 12);
        playSound('playerHit');
        displayDirty = true;
        if (player.hp <= 0) { endGame(); return; }
      }
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
      if (rectCollide(enemies[i], player)) {
        if (player.shield) { player.shield = false; enemies.splice(i, 1); playSound('shield'); continue; }
        player.hp -= 20;
        player.invincible = true;
        player.invincibleTimer = 90;
        spawnExplosion(enemies[i].x + enemies[i].w / 2, enemies[i].y + enemies[i].h / 2, enemies[i].color, 15);
        enemies.splice(i, 1);
        playSound('playerHit');
        displayDirty = true;
        if (player.hp <= 0) { endGame(); return; }
      }
    }
  }

  for (let pi = powerups.length - 1; pi >= 0; pi--) {
    const p = powerups[pi];
    if (rectCollide(p, player)) {
      collectPowerup(p);
      powerups.splice(pi, 1);
    }
  }
}

function rectCollide(a, b) {
  return a.x < b.x + (b.w || b.width) && a.x + (a.w || a.width) > b.x &&
         a.y < b.y + (b.h || b.height) && a.y + (a.h || a.height) > b.y;
}

function destroyEnemy(idx) {
  const e = enemies[idx];
  score += e.score;
  kills++;
  spawnExplosion(e.x + e.w / 2, e.y + e.h / 2, e.color, CONFIG.particles.explosionCount);
  playSound('explosion');

  if (Math.random() < 0.12 + (e.type === 'elite' ? 0.2 : 0)) spawnPowerup(e.x + e.w / 2, e.y + e.h / 2);

  enemies.splice(idx, 1);
  displayDirty = true;
}

function defeatBoss() {
  score += boss.score;
  kills += 5;
  spawnExplosion(boss.x + boss.w / 2, boss.y + boss.h / 2, boss.color, 45);
  spawnExplosion(boss.x + boss.w * 0.25, boss.y + boss.h * 0.3, '#f97316', 20);
  spawnExplosion(boss.x + boss.w * 0.75, boss.y + boss.h * 0.6, '#fbbf24', 20);
  playSound('bossDefeat');

  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      if (gameActive) spawnPowerup(boss.x + Math.random() * boss.w, boss.y + Math.random() * boss.h);
    }, i * 200);
  }

  boss.defeated = true;
  displayDirty = true;
}

function spawnExplosion(x, y, color, count) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5 + 2;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: 0.02 + Math.random() * 0.03,
      size: Math.random() * 8 + 3,
      color,
      type: 'explosion'
    });
  }
}

function spawnHitParticles(x, y, color, count) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: 0.06 + Math.random() * 0.04,
      size: Math.random() * 4 + 1,
      color,
      type: 'spark'
    });
  }
}

function spawnPowerup(x, y) {
  const types = ['fire', 'fire', 'shield', 'heal', 'bomb'];
  const type = types[Math.floor(Math.random() * types.length)];
  const pcfg = CONFIG.powerups[type];
  powerups.push({
    x: x - 15,
    y,
    w: 30,
    h: 30,
    type,
    color: pcfg.color,
    label: pcfg.label,
    duration: pcfg.duration,
    angle: 0
  });
}

function collectPowerup(p) {
  playSound('powerup');
  switch (p.type) {
    case 'fire':
      player.powerLevel = Math.min(player.powerLevel + 1, 4);
      break;
    case 'shield':
      player.shield = true;
      player.shieldTimer = p.duration;
      break;
    case 'heal':
      player.hp = Math.min(player.hp + 35, player.maxHp);
      break;
    case 'bomb':
      for (let e of enemies) {
        score += Math.floor(e.score * 0.5);
        kills++;
        spawnExplosion(e.x + e.w / 2, e.y + e.h / 2, e.color, 12);
      }
      enemies = [];
      enemyBullets = [];
      spawnExplosion(CONFIG.canvasWidth / 2, CONFIG.canvasHeight / 2, '#ef4444', 40);
      playSound('bomb');
      break;
  }
  displayDirty = true;
}

function checkWaveComplete() {
  const isBossWave = wave % 5 === 0;
  if (isBossWave) {
    if (boss && boss.defeated) {
      setTimeout(() => { if (gameActive) { wave++; setupWave(); } }, 1500);
    }
  } else {
    if (enemiesSpawned >= enemiesThisWave && enemies.length === 0) {
      setTimeout(() => { if (gameActive) { wave++; setupWave(); } }, 1200);
    }
  }
}

function draw() {
  drawBackground();
  drawStars();
  drawPowerups();
  drawBullets();
  drawEnemyBullets();
  drawEnemies();
  if (boss && !boss.defeated) drawBoss();
  drawPlayer();
  drawParticles();
  drawUIOverlay();
}

function drawBackground() {
  const grad = ctx.createLinearGradient(0, 0, 0, CONFIG.canvasHeight);
  grad.addColorStop(0, '#050a15');
  grad.addColorStop(0.5, '#0a1020');
  grad.addColorStop(1, '#070c18');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight);
}

function drawStars() {
  for (let s of stars) {
    ctx.globalAlpha = s.brightness;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(s.x, s.y, s.size, s.size);
  }
  ctx.globalAlpha = 1;
}

function drawPlayer() {
  if (!player) return;
  ctx.save();
  ctx.translate(player.x + player.w / 2, player.y + player.h / 2);

  if (player.invincible && Math.floor(player.invincibleTimer / 5) % 2 === 0) {
    ctx.globalAlpha = 0.4;
  }

  if (player.shield) {
    ctx.beginPath();
    ctx.arc(0, 0, Math.max(player.w, player.h) * 0.7, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(59,130,246,0.6)';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.strokeStyle = 'rgba(59,130,246,0.2)';
    ctx.lineWidth = 8;
    ctx.stroke();
  }

  ctx.shadowColor = CONFIG.player.glowColor;
  ctx.shadowBlur = 18;

  ctx.fillStyle = CONFIG.player.color;
  ctx.beginPath();
  ctx.moveTo(0, -player.h / 2);
  ctx.lineTo(-player.w / 2, player.h / 2);
  ctx.lineTo(-player.w / 4, player.h / 3);
  ctx.lineTo(0, player.h / 2.2);
  ctx.lineTo(player.w / 4, player.h / 3);
  ctx.lineTo(player.w / 2, player.h / 2);
  ctx.closePath();
  ctx.fill();

  ctx.shadowBlur = 8;
  ctx.fillStyle = '#5eead4';
  ctx.beginPath();
  ctx.moveTo(0, -player.h / 3);
  ctx.lineTo(-player.w / 4.5, player.h / 5);
  ctx.lineTo(player.w / 4.5, player.h / 5);
  ctx.closePath();
  ctx.fill();

  ctx.shadowBlur = 12;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, -player.h / 6, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#99f6e4';
  ctx.fillRect(-player.w / 3, player.h / 4, player.w / 1.5, 3);

  ctx.restore();
}

function drawBullets() {
  ctx.shadowColor = CONFIG.bullet.glowColor;
  ctx.shadowBlur = 10;
  ctx.fillStyle = CONFIG.bullet.color;
  for (let b of bullets) {
    ctx.fillRect(b.x, b.y, b.w, b.h);
    const grad = ctx.createLinearGradient(b.x, b.y + b.h, b.x, b.y);
    grad.addColorStop(0, 'rgba(20,184,166,0)');
    grad.addColorStop(1, 'rgba(20,184,166,0.6)');
    ctx.fillStyle = grad;
    ctx.fillRect(b.x - 1, b.y, b.w + 2, b.h + 8);
    ctx.fillStyle = CONFIG.bullet.color;
  }
  ctx.shadowBlur = 0;
}

function drawEnemyBullets() {
  for (let eb of enemyBullets) {
    ctx.save();
    ctx.shadowColor = eb.color || '#ef4444';
    ctx.shadowBlur = 8;
    ctx.fillStyle = eb.color || '#ef4444';
    if (eb.circular) {
      ctx.beginPath();
      ctx.arc(eb.x + (eb.w || 5) / 2, eb.y + (eb.h || 5) / 2, (eb.w || 5) / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(eb.x, eb.y, eb.w || 4, eb.h || 12);
    }
    ctx.restore();
  }
  ctx.shadowBlur = 0;
}

function drawEnemies() {
  for (let e of enemies) {
    ctx.save();
    ctx.translate(e.x + e.w / 2, e.y + e.h / 2);
    ctx.shadowColor = e.color;
    ctx.shadowBlur = 12;

    const ratio = e.hp / e.maxHp;
    ctx.fillStyle = e.color;

    switch (e.type) {
      case 'scout':
        ctx.beginPath();
        ctx.ellipse(0, 0, e.w / 2, e.h / 2.2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.beginPath();
        ctx.ellipse(-4, -3, 5, 4, -0.2, 0, Math.PI * 2);
        ctx.ellipse(4, -3, 5, 4, 0.2, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'fighter':
        ctx.beginPath();
        ctx.moveTo(0, -e.h / 2);
        ctx.lineTo(-e.w / 2, e.h / 3);
        ctx.lineTo(-e.w / 3, e.h / 2);
        ctx.lineTo(e.w / 3, e.h / 2);
        ctx.lineTo(e.w / 2, e.h / 3);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.beginPath();
        ctx.moveTo(0, -e.h / 3);
        ctx.lineTo(-e.w / 4, e.h / 6);
        ctx.lineTo(e.w / 4, e.h / 6);
        ctx.closePath();
        ctx.fill();
        break;
      case 'heavy':
        ctx.fillRect(-e.w / 2, -e.h / 2, e.w, e.h);
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(-e.w / 2 + 4, -e.h / 2 + 4, e.w - 8, e.h - 8);
        ctx.fillStyle = 'rgba(168,85,247,0.5)';
        ctx.fillRect(-e.w / 2 + 6, -e.h / 2 + 6, e.w - 12, e.h - 12);
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(-e.w / 4, -e.h / 2 + 2, e.w / 2, 4);
        break;
      case 'elite':
        const eg = e.angle * 2;
        ctx.rotate(Math.sin(eg) * 0.1);
        ctx.beginPath();
        ctx.moveTo(0, -e.h / 2);
        ctx.lineTo(-e.w / 2, 0);
        ctx.lineTo(-e.w / 3, e.h / 2);
        ctx.lineTo(e.w / 3, e.h / 2);
        ctx.lineTo(e.w / 2, 0);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.beginPath();
        ctx.arc(-6, -4, 5, 0, Math.PI * 2);
        ctx.arc(6, -4, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ff0000';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
        break;
    }

    if (e.maxHp > 1) {
      ctx.shadowBlur = 0;
      const bw = e.w * 0.8;
      const bh = 4;
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(-bw / 2, e.h / 2 + 4, bw, bh);
      ctx.fillStyle = ratio > 0.5 ? '#22c55e' : ratio > 0.25 ? '#eab308' : '#ef4444';
      ctx.fillRect(-bw / 2, e.h / 2 + 4, bw * ratio, bh);
    }

    ctx.restore();
  }
}

function drawBoss() {
  if (!boss || boss.defeated) return;
  ctx.save();
  ctx.translate(boss.x + boss.w / 2, boss.y + boss.h / 2);

  ctx.shadowColor = boss.color;
  ctx.shadowBlur = 25;

  ctx.fillStyle = '#450a0a';
  ctx.beginPath();
  ctx.moveTo(0, -boss.h / 2);
  ctx.lineTo(-boss.w / 2, -boss.h / 4);
  ctx.lineTo(-boss.w / 2, boss.h / 3);
  ctx.lineTo(-boss.w / 4, boss.h / 2);
  ctx.lineTo(boss.w / 4, boss.h / 2);
  ctx.lineTo(boss.w / 2, boss.h / 3);
  ctx.lineTo(boss.w / 2, -boss.h / 4);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = boss.color;
  ctx.beginPath();
  ctx.moveTo(0, -boss.h / 2 + 8);
  ctx.lineTo(-boss.w / 2 + 10, -boss.h / 4 + 5);
  ctx.lineTo(-boss.w / 2 + 10, boss.h / 3 - 5);
  ctx.lineTo(-boss.w / 4 + 5, boss.h / 2 - 8);
  ctx.lineTo(boss.w / 4 - 5, boss.h / 2 - 8);
  ctx.lineTo(boss.w / 2 - 10, boss.h / 3 - 5);
  ctx.lineTo(boss.w / 2 - 10, -boss.h / 4 + 5);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fca5a5';
  ctx.beginPath();
  ctx.arc(-25, -10, 10, 0, Math.PI * 2);
  ctx.arc(25, -10, 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ff0000';
  ctx.beginPath();
  ctx.arc(-25, -10, 5, 0, Math.PI * 2);
  ctx.arc(25, -10, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#7f1d1d';
  ctx.fillRect(-boss.w / 3, boss.h / 6, boss.w / 1.5, 12);
  ctx.fillStyle = '#f87171';
  ctx.fillRect(-boss.w / 3 + 3, boss.h / 6 + 2, boss.w / 1.5 - 6, 8);

  ctx.shadowBlur = 0;
  const barW = boss.w * 0.85;
  const barH = 8;
  const ratio = boss.hp / boss.maxHp;
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(-barW / 2, boss.h / 2 + 12, barW, barH);
  const hpGrad = ctx.createLinearGradient(-barW / 2, 0, -barW / 2 + barW * ratio, 0);
  hpGrad.addColorStop(0, '#dc2626');
  hpGrad.addColorStop(0.5, '#ef4444');
  hpGrad.addColorStop(1, '#f87171');
  ctx.fillStyle = hpGrad;
  ctx.fillRect(-barW / 2, boss.h / 2 + 12, barW * ratio, barH);
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 1;
  ctx.strokeRect(-barW / 2, boss.h / 2 + 12, barW, barH);

  ctx.restore();
}

function drawPowerups() {
  for (let p of powerups) {
    ctx.save();
    ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
    const pulse = 1 + Math.sin((p.angle || 0) * 3) * 0.1;
    ctx.scale(pulse, pulse);
    ctx.rotate((p.angle || 0));

    ctx.shadowColor = p.color;
    ctx.shadowBlur = 15;

    ctx.fillStyle = p.color;
    ctx.beginPath();
    const r = p.w / 2;
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI * 2 / 6) * i - Math.PI / 2;
      const px = Math.cos(a) * r;
      const py = Math.sin(a) * r;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      const midA = a + Math.PI / 6;
      ctx.lineTo(Math.cos(midA) * r * 0.5, Math.sin(midA) * r * 0.5);
    }
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 9px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(p.label, 0, 1);

    ctx.restore();
  }
}

function drawParticles() {
  for (let p of particles) {
    ctx.save();
    ctx.globalAlpha = p.life;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = p.type === 'explosion' ? 8 : 4;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
}

function drawUIOverlay() {
  if (boss && !boss.defeated) {
    ctx.save();
    ctx.fillStyle = 'rgba(220,38,38,0.15)';
    ctx.fillRect(0, 0, CONFIG.canvasWidth, 28);
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 8;
    ctx.fillStyle = '#fca5a5';
    ctx.font = 'bold 14px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`⚠️ BOSS HP: ${boss.hp} / ${boss.maxHp}`, CONFIG.canvasWidth / 2, 14);
    ctx.restore();
  }
}

function updateDisplay() {
  if (scoreEl) scoreEl.textContent = score.toLocaleString();
  if (livesEl) livesEl.textContent = player ? Math.max(0, Math.ceil(player.hp)) : 0;
  if (waveEl) waveEl.textContent = wave;
  if (powerLevelEl) powerLevelEl.textContent = `LV.${player ? player.powerLevel : 1}`;
  if (highScoreEl) highScoreEl.textContent = highScore.toLocaleString();
  if (hpBarEl && player) hpBarEl.style.width = `${Math.max(0, (player.hp / player.maxHp) * 100)}%`;
}

function playSound(type) {
  if (!soundEnabled) return;
  try {
    const actx = getAudioContext();
    if (!actx || actx.state !== 'running') return;
    const osc = actx.createOscillator();
    const gain = actx.createGain();
    osc.connect(gain);
    gain.connect(actx.destination);
    switch (type) {
      case 'shoot':
        osc.frequency.value = 880;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.15, actx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.08);
        osc.start(actx.currentTime);
        osc.stop(actx.currentTime + 0.08);
        break;
      case 'explosion':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, actx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, actx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.25, actx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.25);
        osc.start(actx.currentTime);
        osc.stop(actx.currentTime + 0.25);
        break;
      case 'hit':
        osc.type = 'square';
        osc.frequency.value = 300;
        gain.gain.setValueAtTime(0.12, actx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.1);
        osc.start(actx.currentTime);
        osc.stop(actx.currentTime + 0.1);
        break;
      case 'playerHit':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, actx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, actx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.3, actx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.35);
        osc.start(actx.currentTime);
        osc.stop(actx.currentTime + 0.35);
        break;
      case 'powerup':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523, actx.currentTime);
        osc.frequency.setValueAtTime(659, actx.currentTime + 0.08);
        osc.frequency.setValueAtTime(784, actx.currentTime + 0.16);
        gain.gain.setValueAtTime(0.2, actx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.25);
        osc.start(actx.currentTime);
        osc.stop(actx.currentTime + 0.25);
        break;
      case 'shield':
        osc.type = 'triangle';
        osc.frequency.value = 440;
        gain.gain.setValueAtTime(0.15, actx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.2);
        osc.start(actx.currentTime);
        osc.stop(actx.currentTime + 0.2);
        break;
      case 'bomb':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, actx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, actx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.35, actx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.5);
        osc.start(actx.currentTime);
        osc.stop(actx.currentTime + 0.5);
        break;
      case 'bossShoot':
        osc.type = 'square';
        osc.frequency.value = 120;
        gain.gain.setValueAtTime(0.15, actx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.15);
        osc.start(actx.currentTime);
        osc.stop(actx.currentTime + 0.15);
        break;
      case 'bossDefeat':
        [523, 659, 784, 1047].forEach((freq, i) => {
          const o = actx.createOscillator();
          const g = actx.createGain();
          o.connect(g);
          g.connect(actx.destination);
          o.frequency.value = freq;
          o.type = 'sine';
          g.gain.setValueAtTime(0.2, actx.currentTime + i * 0.12);
          g.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + i * 0.12 + 0.2);
          o.start(actx.currentTime + i * 0.12);
          o.stop(actx.currentTime + i * 0.12 + 0.2);
        });
        return;
    }
  } catch (e) {}
}

function saveHighScore() {
  try { localStorage.setItem('spaceShooterHighScore', String(highScore)); } catch (e) {}
}

function loadHighScore() {
  try { const s = localStorage.getItem('spaceShooterHighScore'); if (s) highScore = parseInt(s) || 0; } catch (e) {}
}

function quitToMenu() {
  gameActive = false;
  gamePaused = false;
  score = 0;
  kills = 0;
  wave = 1;
  updateDisplay();
  startOverlay.classList.remove('hidden');
  pauseOverlay.classList.add('hidden');
  pauseBtn.querySelector('.btn-text').textContent = '暂停';
  pauseBtn.querySelector('.btn-icon').textContent = '⏸️';
  drawBackground();
}
