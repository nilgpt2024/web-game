(function () {
  'use strict';

  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const startBtn = document.getElementById('startBtn');
  const currentScoreEl = document.getElementById('currentScore');
  const highScoreEl = document.getElementById('highScore');
  const currentLevelEl = document.getElementById('currentLevel');

  const W = canvas.width;
  const H = canvas.height;
  const GROUND_Y = H - 50;
  const PERSPECTIVE_SCALE = 0.55;
  const HORIZON_Y = 80;

  let gameState = 'idle';
  let score = 0;
  let highScore = parseInt(localStorage.getItem('dodgeGame_highScore')) || 0;
  let level = 1;
  let frameCount = 0;
  let animationId = null;

  let player = null;
  let obstacles = [];
  let particles = [];
  let bgStars = [];

  const keys = { left: false, right: false };

  highScoreEl.textContent = highScore;

  function initPlayer() {
    return {
      x: W / 2,
      y: GROUND_Y - 25,
      width: 40,
      height: 45,
      speed: 6,
      targetX: W / 2,
      glowIntensity: 0,
      trailPositions: []
    };
  }

  function createObstacle() {
    const types = ['rock', 'meteor', 'crystal', 'bomb'];
    const type = types[Math.floor(Math.random() * types.length)];
    const baseSpeed = 2 + level * 0.5;
    const sizeMultiplier = 0.7 + Math.random() * 0.6;

    const configs = {
      rock: { w: 36, h: 34, color: '#78716c', speedMod: 1 },
      meteor: { w: 44, h: 40, color: '#ea580c', speedMod: 1.15 },
      crystal: { w: 28, h:42, color: '#8b5cf6', speedMod: 1.3 },
      bomb:   { w: 38, h: 38, color: '#dc2626', speedMod: 0.9 }
    };

    const cfg = configs[type];
    const perspectiveX = (Math.random() - 0.5) * W * 0.85;

    return {
      x: W / 2 + perspectiveX,
      y: -60 - Math.random() * 80,
      width: cfg.w * sizeMultiplier,
      height: cfg.h * sizeMultiplier,
      baseWidth: cfg.w * sizeMultiplier,
      speedY: baseSpeed * cfg.speedMod * (0.85 + Math.random() * 0.3),
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.08,
      color: cfg.color,
      type: type,
      alpha: 1,
      scale: 0.3
    };
  }

  function spawnParticles(x, y, color, count) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        radius: 2 + Math.random() * 5,
        color: color,
        alpha: 1,
        decay: 0.015 + Math.random() * 0.025,
        gravity: 0.12
      });
    }
  }

  function spawnScoreParticle(x, y) {
    particles.push({
      x: x,
      y: y,
      vx: 0,
      vy: -2.5,
      text: '+' + (10 * level),
      alpha: 1,
      decay: 0.02,
      isText: true,
      fontSize: 18 + level * 2
    });
  }

  function initBgStars() {
    bgStars = [];
    for (let i = 0; i < 60; i++) {
      bgStars.push({
        x: Math.random() * W,
        y: Math.random() * H * 0.65,
        radius: 0.4 + Math.random() * 1.8,
        alpha: 0.15 + Math.random() * 0.5,
        twinkleSpeed: 0.01 + Math.random() * 0.03,
        twinklePhase: Math.random() * Math.PI * 2
      });
    }
  }

  function drawBackground() {
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.35, '#1e293b');
    grad.addColorStop(0.7, '#334155');
    grad.addColorStop(1, '#1e293b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    bgStars.forEach(star => {
      star.twinklePhase += star.twinkleSpeed;
      const twinkle = 0.5 + 0.5 * Math.sin(star.twinklePhase);
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * twinkle})`;
      ctx.fill();
    });

    const horizonGrad = ctx.createLinearGradient(0, HORIZON_Y, 0, HORIZON_Y + 120);
    horizonGrad.addColorStop(0, 'rgba(13, 148, 136, 0.06)');
    horizonGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = horizonGrad;
    ctx.fillRect(0, HORIZON_Y, W, 120);

    drawPerspectiveGrid();
  }

  function drawPerspectiveGrid() {
    ctx.strokeStyle = 'rgba(13, 148, 136, 0.07)';
    ctx.lineWidth = 1;

    const vanishX = W / 2;
    const vanishY = HORIZON_Y;
    const gridLines = 12;

    for (let i = -gridLines; i <= gridLines; i++) {
      const bottomX = W / 2 + i * (W / gridLines);
      ctx.beginPath();
      ctx.moveTo(vanishX, vanishY);
      ctx.lineTo(bottomX, H);
      ctx.stroke();
    }

    for (let i = 1; i <= 8; i++) {
      const t = i / 8;
      const y = vanishY + (H - vanishY) * t;
      const spread = W * t * 0.55;
      ctx.beginPath();
      ctx.moveTo(W / 2 - spread, y);
      ctx.lineTo(W / 2 + spread, y);
      ctx.stroke();
    }
  }

  function drawGround() {
    const groundGrad = ctx.createLinearGradient(0, GROUND_Y, 0, H);
    groundGrad.addColorStop(0, 'rgba(13, 148, 136, 0.15)');
    groundGrad.addColorStop(1, 'rgba(13, 148, 136, 0.03)');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);

    ctx.strokeStyle = 'rgba(13, 148, 136, 0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(W, GROUND_Y);
    ctx.stroke();

    for (let i = 0; i < W; i += 30) {
      const flicker = 0.3 + 0.7 * Math.abs(Math.sin(frameCount * 0.03 + i * 0.05));
      ctx.fillStyle = `rgba(13, 148, 136, ${0.2 * flicker})`;
      ctx.beginPath();
      ctx.arc(i, GROUND_Y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawPlayer() {
    if (!player) return;

    player.trailPositions.unshift({ x: player.x, y: player.y, alpha: 0.4 });
    if (player.trailPositions.length > 8) player.trailPositions.pop();

    player.trailPositions.forEach((pos, i) => {
      const trailAlpha = pos.alpha * (1 - i / 8);
      const trailSize = player.width * (1 - i * 0.08);
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.globalAlpha = trailAlpha * 0.3;
      ctx.fillStyle = '#0d9488';
      ctx.beginPath();
      ctx.roundRect(-trailSize / 2, -player.height / 2, trailSize, player.height, 8);
      ctx.fill();
      ctx.restore();
    });

    player.glowIntensity = 0.6 + 0.4 * Math.sin(frameCount * 0.06);

    const glowSize = 28 + player.glowIntensity * 14;
    const glow = ctx.createRadialGradient(player.x, player.y, 0, player.x, player.y, glowSize);
    glow.addColorStop(0, `rgba(13, 148, 136, ${0.35 * player.glowIntensity})`);
    glow.addColorStop(0.5, `rgba(13, 148, 136, ${0.12 * player.glowIntensity})`);
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(player.x, player.y, glowSize, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.translate(player.x, player.y);

    const bodyGrad = ctx.createLinearGradient(-player.width / 2, -player.height / 2, player.width / 2, player.height / 2);
    bodyGrad.addColorStop(0, '#14b8a6');
    bodyGrad.addColorStop(0.5, '#0d9488');
    bodyGrad.addColorStop(1, '#0f766e');

    ctx.shadowColor = 'rgba(13, 148, 136, 0.6)';
    ctx.shadowBlur = 16 + player.glowIntensity * 10;

    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.roundRect(-player.width / 2, -player.height / 2, player.width, player.height, 10);
    ctx.fill();

    ctx.shadowBlur = 0;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.beginPath();
    ctx.roundRect(-player.width / 2 + 4, -player.height / 2 + 4, player.width - 14, 8, 4);
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(-8, -6, 5, 0, Math.PI * 2);
    ctx.arc(8, -6, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(-8 + 1, -5, 2.5, 0, Math.PI * 2);
    ctx.arc(8 + 1, -5, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawObstacle(obs) {
    ctx.save();

    const progress = Math.min(1, (obs.y - HORIZON_Y) / (GROUND_Y - HORIZON_Y));
    obs.scale = 0.25 + progress * 0.75;
    obs.alpha = 0.3 + progress * 0.7;

    const scaledW = obs.baseWidth * obs.scale;
    const scaledH = obs.height * obs.scale;

    ctx.globalAlpha = obs.alpha;
    ctx.translate(obs.x, obs.y);
    ctx.rotate(obs.rotation);

    ctx.shadowColor = obs.color;
    ctx.shadowBlur = 12 * obs.scale;

    if (obs.type === 'crystal') {
      const crystalGrad = ctx.createLinearGradient(-scaledW / 2, -scaledH / 2, scaledW / 2, scaledH / 2);
      crystalGrad.addColorStop(0, '#a78bfa');
      crystalGrad.addColorStop(0.5, '#8b5cf6');
      crystalGrad.addColorStop(1, '#6d28d9');
      ctx.fillStyle = crystalGrad;
      ctx.beginPath();
      ctx.moveTo(0, -scaledH / 2);
      ctx.lineTo(scaledW / 2, 0);
      ctx.lineTo(0, scaledH / 2);
      ctx.lineTo(-scaledW / 2, 0);
      ctx.closePath();
      ctx.fill();
    } else if (obs.type === 'bomb') {
      const bombGrad = ctx.createRadialGradient(-scaledW * 0.15, -scaledH * 0.15, 0, 0, 0, scaledW / 2);
      bombGrad.addColorStop(0, '#f87171');
      bombGrad.addColorStop(0.6, '#dc2626');
      bombGrad.addColorStop(1, '#991b1b');
      ctx.fillStyle = bombGrad;
      ctx.beginPath();
      ctx.arc(0, 0, scaledW / 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#374151';
      ctx.fillRect(-3, -scaledH / 2 - 6, 6, 8);
    } else if (obs.type === 'meteor') {
      const metGrad = ctx.createRadialGradient(-scaledW * 0.1, -scaledH * 0.1, 0, 0, 0, scaledW / 2);
      metGrad.addColorStop(0, '#fb923c');
      metGrad.addColorStop(0.5, '#ea580c');
      metGrad.addColorStop(1, '#9a3412');
      ctx.fillStyle = metGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, scaledW / 2, scaledH / 2, 0.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 200, 150, 0.4)';
      ctx.beginPath();
      ctx.ellipse(-scaledW * 0.15, -scaledH * 0.15, scaledW * 0.18, scaledH * 0.12, -0.3, 0, Math.PI * 2);
      ctx.fill();
    } else {
      const rockGrad = ctx.createLinearGradient(-scaledW / 2, -scaledH / 2, scaledW / 2, scaledH / 2);
      rockGrad.addColorStop(0, '#a8a29e');
      rockGrad.addColorStop(0.5, '#78716c');
      rockGrad.addColorStop(1, '#57534e');
      ctx.fillStyle = rockGrad;
      ctx.beginPath();
      ctx.moveTo(-scaledW / 2, -scaledH / 3);
      ctx.quadraticCurveTo(-scaledW / 3, -scaledH / 2, scaledW / 4, -scaledH / 2.5);
      ctx.quadraticCurveTo(scaledW / 2, -scaledH / 4, scaledW / 2.2, scaledH / 5);
      ctx.quadraticCurveTo(scaledW / 3, scaledH / 2, -scaledW / 4, scaledH / 2.2);
      ctx.quadraticCurveTo(-scaledW / 2, scaledH / 4, -scaledW / 2, -scaledH / 3);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }

  function drawParticles() {
    particles.forEach((p, idx) => {
      ctx.save();
      ctx.globalAlpha = p.alpha;

      if (p.isText) {
        ctx.font = `bold ${p.fontSize}px 'Plus Jakarta Sans', sans-serif`;
        ctx.fillStyle = '#fbbf24';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(251, 191, 36, 0.6)';
        ctx.shadowBlur = 8;
        ctx.fillText(p.text, p.x, p.y);
      } else {
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.alpha, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });
  }

  function updatePlayer() {
    if (!player) return;

    const moveAmount = player.speed * (1 + level * 0.08);

    if (keys.left) player.targetX -= moveAmount;
    if (keys.right) player.targetX += moveAmount;

    player.targetX = Math.max(player.width / 2 + 10, Math.min(W - player.width / 2 - 10, player.targetX));

    player.x += (player.targetX - player.x) * 0.18;
  }

  function updateObstacles() {
    obstacles.forEach(obs => {
      obs.y += obs.speedY;
      obs.rotation += obs.rotSpeed;
    });

    obstacles = obstacles.filter(obs => obs.y < H + 80);
  }

  function updateParticles() {
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (!p.isText) {
        p.vy += p.gravity;
        p.vx *= 0.98;
      }
      p.alpha -= p.decay;
    });

    particles = particles.filter(p => p.alpha > 0);
  }

  function checkCollision(obs) {
    if (!player) return false;

    const pw = player.width * 0.65;
    const ph = player.height * 0.7;
    const ow = obs.baseWidth * obs.scale * 0.7;
    const oh = obs.height * obs.scale * 0.7;

    return (
      player.x - pw / 2 < obs.x + ow / 2 &&
      player.x + pw / 2 > obs.x - ow / 2 &&
      player.y - ph / 2 < obs.y + oh / 2 &&
      player.y + ph / 2 > obs.y - oh / 2
    );
  }

  function handleCollisions() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
      if (checkCollision(obstacles[i])) {
        const obs = obstacles[i];
        spawnParticles(obs.x, obs.y, obs.color, 30);
        spawnParticles(player.x, player.y, '#0d9488', 20);
        gameOver();
        return true;
      }
    }
    return false;
  }

  function updateDifficulty() {
    const newLevel = Math.floor(score / 100) + 1;
    if (newLevel !== level && newLevel <= 15) {
      level = newLevel;
      currentLevelEl.textContent = level;
      spawnParticles(player.x, player.y - 40, '#fbbf24', 15);
      spawnScoreParticle(player.x, player.y - 55);
    }
  }

  function updateScore() {
    frameCount++;
    if (frameCount % 6 === 0) {
      score += level;
      currentScoreEl.textContent = score;
      updateDifficulty();
    }
  }

  function drawUI() {
    if (gameState === 'idle') {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
      ctx.fillRect(0, 0, W, H);

      ctx.font = "bold 32px 'Plus Jakarta Sans', sans-serif";
      ctx.textAlign = 'center';
      ctx.fillStyle = '#0d9488';
      ctx.shadowColor = 'rgba(13, 148, 136, 0.5)';
      ctx.shadowBlur = 20;
      ctx.fillText('DODGE GAME', W / 2, H / 2 - 30);

      ctx.font = "500 16px 'Plus Jakarta Sans', sans-serif";
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.shadowBlur = 0;
      ctx.fillText('点击「开始游戏」按钮开始挑战！', W / 2, H / 2 + 15);
    }

    if (gameState === 'over') {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.82)';
      ctx.fillRect(0, 0, W, H);

      ctx.font = "bold 36px 'Plus Jakarta Sans', sans-serif";
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = 'rgba(239, 68, 68, 0.5)';
      ctx.shadowBlur = 24;
      ctx.fillText('GAME OVER', W / 2, H / 2 - 40);

      ctx.font = "bold 22px 'Plus Jakarta Sans', sans-serif";
      ctx.fillStyle = '#fbbf24';
      ctx.shadowColor = 'rgba(251, 191, 36, 0.4)';
      ctx.shadowBlur = 12;
      ctx.fillText('得分: ' + score, W / 2, H / 2 + 5);

      if (score >= highScore && score > 0) {
        ctx.font = "600 17px 'Plus Jakarta Sans', sans-serif";
        ctx.fillStyle = '#10b981';
        ctx.fillText('🎉 新纪录！', W / 2, H / 2 + 38);
      }

      ctx.font = "500 14px 'Plus Jakarta Sans', sans-serif";
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.shadowBlur = 0;
      ctx.fillText('点击「重新开始」再来一局', W / 2, H / 2 + 70);
    }
  }

  function gameLoop() {
    ctx.clearRect(0, 0, W, H);

    drawBackground();
    drawGround();

    if (gameState === 'playing') {
      updatePlayer();
      updateObstacles();
      updateParticles();
      updateScore();

      if (!handleCollisions()) {
        obstacles.forEach(drawObstacle);
        drawParticles();
        drawPlayer();
      } else {
        drawParticles();
        drawPlayer();
      }
    } else {
      obstacles.forEach(drawObstacle);
      drawParticles();
      if (player) drawPlayer();
    }

    drawUI();

    animationId = requestAnimationFrame(gameLoop);
  }

  function startGame() {
    gameState = 'playing';
    score = 0;
    level = 1;
    frameCount = 0;
    obstacles = [];
    particles = [];
    player = initPlayer();

    currentScoreEl.textContent = '0';
    currentLevelEl.textContent = '1';

    startBtn.classList.add('playing');
    startBtn.innerHTML = '<i class="fas fa-redo"></i><span>重新开始</span>';
  }

  function gameOver() {
    gameState = 'over';

    startBtn.classList.remove('playing');
    startBtn.innerHTML = '<i class="fas fa-play"></i><span>重新开始</span>';

    if (score > highScore) {
      highScore = score;
      localStorage.setItem('dodgeGame_highScore', highScore);
      highScoreEl.textContent = highScore;
    }
  }

  function getSpawnInterval() {
    return Math.max(25, 70 - level * 4);
  }

  setInterval(() => {
    if (gameState === 'playing' && obstacles.length < 8 + level) {
      obstacles.push(createObstacle());
    }
  }, getSpawnInterval());

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = true;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = true;
    if ((e.key === ' ' || e.key === 'Enter') && gameState !== 'playing') {
      e.preventDefault();
      startGame();
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
  });

  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (gameState !== 'playing') {
      startGame();
      return;
    }
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    const touchX = (touch.clientX - rect.left) * scaleX;
    player.targetX = touchX;
  }, { passive: false });

  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (gameState === 'playing' && player) {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const scaleX = W / rect.width;
      player.targetX = (touch.clientX - rect.left) * scaleX;
    }
  }, { passive: false });

  startBtn.addEventListener('click', () => {
    if (gameState === 'playing') {
      gameOver();
    }
    startGame();
  });

  initBgStars();
  player = initPlayer();
  gameLoop();

})();