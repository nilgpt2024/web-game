const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GAME_WIDTH = 900;
const GAME_HEIGHT = 550;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

let gameState = 'menu';
let currentLevel = 1;
const TOTAL_LEVELS = 3;
let score = 0;
let highScore = parseInt(localStorage.getItem('platformer-highscore')) || 0;
let lives = 3;
let maxLives = 3;
let coinsCollected = 0;
let totalCoinsInLevel = 0;
let levelStartTime = 0;
let soundEnabled = true;

const keys = {};
let cameraX = 0;

const GRAVITY = 0.55;
const FRICTION = 0.82;
const PLAYER_SPEED = 5;
const JUMP_FORCE = -13;
const DOUBLE_JUMP_FORCE = -11;

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 36;
    this.height = 50;
    this.vx = 0;
    this.vy = 0;
    this.onGround = false;
    this.jumpCount = 0;
    this.maxJumps = 2;
    this.facingRight = true;
    this.isRunning = false;
    this.animFrame = 0;
    this.animTimer = 0;
    this.invincible = false;
    this.invincibleTimer = 0;
    this.trailParticles = [];
  }

  update(platforms) {
    if (keys['KeyA'] || keys['ArrowLeft']) {
      this.vx -= PLAYER_SPEED * 0.25;
      this.facingRight = false;
      this.isRunning = true;
    } else if (keys['KeyD'] || keys['ArrowRight']) {
      this.vx += PLAYER_SPEED * 0.25;
      this.facingRight = true;
      this.isRunning = true;
    } else {
      this.isRunning = false;
    }

    this.vx *= FRICTION;
    this.vx = Math.max(-PLAYER_SPEED, Math.min(PLAYER_SPEED, this.vx));

    this.vy += GRAVITY;
    this.y += this.vy;
    this.x += this.vx;

    this.onGround = false;
    for (const plat of platforms) {
      if (this.collidesWithPlatform(plat)) {
        if (this.vy > 0 && this.y + this.height - this.vy <= plat.y + 5) {
          this.y = plat.y - this.height;
          this.vy = 0;
          this.onGround = true;
          this.jumpCount = 0;
          if (plat.type === 'vanishing' && !plat.triggered) {
            plat.triggered = true;
          }
        }
      }
    }

    if (this.y > GAME_HEIGHT + 100) {
      this.takeDamage(1);
      this.respawn();
    }

    if (this.x < cameraX) this.x = cameraX;
    if (this.x + this.width > cameraX + GAME_WIDTH) this.x = cameraX + GAME_WIDTH - this.width;

    this.animTimer++;
    if (this.animTimer > 6) {
      this.animTimer = 0;
      this.animFrame = (this.animFrame + 1) % 4;
    }

    if (this.invincible) {
      this.invincibleTimer--;
      if (this.invincibleTimer <= 0) {
        this.invincible = false;
      }
    }

    if (Math.abs(this.vx) > 1 && this.onGround) {
      this.trailParticles.push({
        x: this.x + this.width / 2,
        y: this.y + this.height - 5,
        alpha: 0.4,
        size: 8
      });
    }

    this.trailParticles = this.trailParticles.filter(p => {
      p.alpha -= 0.05;
      p.size *= 0.95;
      return p.alpha > 0;
    });
  }

  jump() {
    if (this.jumpCount < this.maxJumps) {
      this.vy = this.jumpCount === 0 ? JUMP_FORCE : DOUBLE_JUMP_FORCE;
      this.jumpCount++;
      this.onGround = false;
      createJumpParticles(this.x + this.width / 2, this.y + this.height);
    }
  }

  collidesWithPlatform(plat) {
    const platWidth = plat.width || 100;
    const platHeight = plat.height || 20;
    return (
      this.x < plat.x + platWidth &&
      this.x + this.width > plat.x &&
      this.y < plat.y + platHeight &&
      this.y + this.height > plat.y
    );
  }

  takeDamage(amount) {
    if (!this.invincible) {
      lives -= amount;
      updateUI();
      this.invincible = true;
      this.invincibleTimer = 90;
      createHitParticles(this.x + this.width / 2, this.y + this.height / 2);
      if (lives <= 0) {
        gameOver();
      }
    }
  }

  respawn() {
    this.x = Math.max(cameraX + 50, 80);
    this.y = 200;
    this.vx = 0;
    this.vy = 0;
  }

  draw() {
    ctx.save();

    for (const p of this.trailParticles) {
      ctx.fillStyle = `rgba(13, 148, 136, ${p.alpha})`;
      ctx.beginPath();
      ctx.ellipse(p.x - cameraX, p.y, p.size, p.size * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    const drawX = this.x - cameraX;
    let alpha = 1;
    if (this.invincible && Math.floor(this.invincibleTimer / 5) % 2 === 0) {
      alpha = 0.35;
    }
    ctx.globalAlpha = alpha;

    ctx.shadowColor = 'rgba(13, 148, 136, 0.5)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetY = 5;

    ctx.fillStyle = '#0d9488';
    ctx.beginPath();
    ctx.roundRect(drawX + 4, this.y + 12, this.width - 8, this.height - 12, 10);
    ctx.fill();

    ctx.fillStyle = '#14b8a6';
    ctx.beginPath();
    ctx.roundRect(drawX + 6, this.y + 14, this.width - 12, this.height - 20, 8);
    ctx.fill();

    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(drawX + this.width / 2, this.y + 16, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    const eyeOffset = this.facingRight ? 3 : -3;
    ctx.arc(drawX + this.width / 2 + eyeOffset, this.y + 15, 3.5, 0, Math.PI * 2);
    ctx.fill();

    const legOffset = this.isRunning ? Math.sin(this.animFrame * Math.PI / 2) * 5 : 0;
    ctx.fillStyle = '#0f766e';
    ctx.fillRect(drawX + 8, this.y + this.height - 10 + legOffset, 8, 10);
    ctx.fillRect(drawX + this.width - 16, this.y + this.height - 10 - legOffset, 8, 10);

    const armAngle = this.isRunning ? Math.sin(this.animFrame * Math.PI / 2) * 0.4 : 0;
    ctx.save();
    ctx.translate(drawX + (this.facingRight ? this.width - 6 : 6), this.y + 24);
    ctx.rotate(this.facingRight ? armAngle : -armAngle);
    ctx.fillStyle = '#fcd34d';
    ctx.fillRect(-3, 0, 6, 16);
    ctx.restore();

    ctx.restore();
  }
}

class Platform {
  constructor(x, y, width, height, type = 'normal', moveRange = 0, moveSpeed = 2) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
    this.originalX = x;
    this.originalY = y;
    this.moveRange = moveRange;
    this.moveSpeed = moveSpeed;
    this.moveDir = 1;
    this.moveOffset = 0;
    this.triggered = false;
    this.vanishTimer = 60;
    this.visible = true;
    this.alpha = 1;
  }

  update() {
    if (this.type === 'moving') {
      this.moveOffset += this.moveSpeed * this.moveDir;
      if (Math.abs(this.moveOffset) >= this.moveRange) {
        this.moveDir *= -1;
      }
      this.x = this.originalX + this.moveOffset;
    } else if (this.type === 'vanishing') {
      if (this.triggered) {
        this.vanishTimer--;
        this.alpha = this.vanishTimer / 60;
        if (this.vanishTimer <= 0) {
          this.visible = false;
        }
      }
    }
  }

  draw() {
    if (!this.visible) return;
    const drawX = this.x - cameraX;

    ctx.save();
    ctx.globalAlpha = this.alpha;

    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 6;

    let gradient;
    let borderColor;

    switch (this.type) {
      case 'normal':
        gradient = ctx.createLinearGradient(drawX, this.y, drawX, this.y + this.height);
        gradient.addColorStop(0, '#3b82f6');
        gradient.addColorStop(0.5, '#2563eb');
        gradient.addColorStop(1, '#1d4ed8');
        borderColor = '#60a5fa';
        break;
      case 'moving':
        gradient = ctx.createLinearGradient(drawX, this.y, drawX, this.y + this.height);
        gradient.addColorStop(0, '#a855f7');
        gradient.addColorStop(0.5, '#9333ea');
        gradient.addColorStop(1, '#7e22ce');
        borderColor = '#c084fc';
        break;
      case 'vanishing':
        gradient = ctx.createLinearGradient(drawX, this.y, drawX, this.y + this.height);
        gradient.addColorStop(0, '#f97316');
        gradient.addColorStop(0.5, '#ea580c');
        gradient.addColorStop(1, '#c2410c');
        borderColor = '#fb923c';
        break;
    }

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(drawX, this.y, this.width, this.height, 6);
    ctx.fill();

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.beginPath();
    ctx.roundRect(drawX + 3, this.y + 3, this.width - 6, this.height * 0.35, 4);
    ctx.fill();

    if (this.type === 'moving') {
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      for (let i = 0; i < 3; i++) {
        const arrowX = drawX + this.width * (0.25 + i * 0.25);
        ctx.beginPath();
        ctx.moveTo(arrowX, this.y + this.height / 2 - 5);
        ctx.lineTo(arrowX + (this.moveDir > 0 ? 6 : -6), this.y + this.height / 2);
        ctx.lineTo(arrowX, this.y + this.height / 2 + 5);
        ctx.closePath();
        ctx.fill();
      }
    }

    if (this.type === 'vanishing' && !this.triggered) {
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = 'bold 14px Plus Jakarta Sans';
      ctx.textAlign = 'center';
      ctx.fillText('⚠', drawX + this.width / 2, this.y + this.height / 2 + 5);
    }

    ctx.restore();
  }
}

class Collectible {
  constructor(x, y, type = 'coin') {
    this.x = x;
    this.y = y;
    this.type = type;
    this.collected = false;
    this.bobOffset = Math.random() * Math.PI * 2;
    this.bobSpeed = 0.06 + Math.random() * 0.03;
    this.rotationAngle = 0;
    this.scale = 1;
    this.collectAnim = 0;

    switch (type) {
      case 'coin':
        this.width = 24;
        this.height = 24;
        this.points = 10;
        break;
      case 'star':
        this.width = 30;
        this.height = 30;
        this.points = 50;
        break;
      case 'gem':
        this.width = 26;
        this.height = 28;
        this.points = 100;
        break;
    }
  }

  update() {
    this.bobOffset += this.bobSpeed;
    this.rotationAngle += 0.04;

    if (this.collected) {
      this.collectAnim++;
      this.scale += 0.08;
    }
  }

  draw() {
    if (this.collectAnim > 15) return;

    const drawX = this.x - cameraX;
    const bobY = this.y + Math.sin(this.bobOffset) * 6;
    const currentScale = this.scale;

    ctx.save();
    ctx.translate(drawX + this.width / 2, bobY + this.height / 2);
    ctx.scale(currentScale, currentScale);

    if (this.collected) {
      ctx.globalAlpha = 1 - this.collectAnim / 15;
    }

    ctx.shadowColor = this.getGlowColor();
    ctx.shadowBlur = 18;

    switch (this.type) {
      case 'coin':
        this.drawCoin();
        break;
      case 'star':
        this.drawStar();
        break;
      case 'gem':
        this.drawGem();
        break;
    }

    ctx.restore();
  }

  getGlowColor() {
    switch (this.type) {
      case 'coin': return 'rgba(251, 191, 36, 0.6)';
      case 'star': return 'rgba(250, 204, 21, 0.7)';
      case 'gem': return 'rgba(168, 85, 247, 0.7)';
    }
  }

  drawCoin() {
    const scaleX = Math.cos(this.rotationAngle);
    ctx.scale(scaleX, 1);

    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.ellipse(0, 0, 12, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.ellipse(0, 0, 9, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 13px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('$', 0, 1);
  }

  drawStar() {
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const radius = i === 0 ? 15 : 15;
      if (i === 0) {
        ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      } else {
        ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      }
      const innerAngle = angle + (2 * Math.PI) / 10;
      ctx.lineTo(Math.cos(innerAngle) * 7, Math.sin(innerAngle) * 7);
    }
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const radius = 9;
      if (i === 0) {
        ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      } else {
        ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      }
      const innerAngle = angle + (2 * Math.PI) / 10;
      ctx.lineTo(Math.cos(innerAngle) * 4, Math.sin(innerAngle) * 4);
    }
    ctx.closePath();
    ctx.fill();
  }

  drawGem() {
    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.moveTo(0, -14);
    ctx.lineTo(13, -4);
    ctx.lineTo(8, 14);
    ctx.lineTo(-8, 14);
    ctx.lineTo(-13, -4);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#c084fc';
    ctx.beginPath();
    ctx.moveTo(0, -14);
    ctx.lineTo(-13, -4);
    ctx.lineTo(0, 2);
    ctx.lineTo(13, -4);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.beginPath();
    ctx.moveTo(0, -14);
    ctx.lineTo(6, -5);
    ctx.lineTo(0, 0);
    ctx.lineTo(-5, -5);
    ctx.closePath();
    ctx.fill();
  }

  checkCollision(player) {
    if (this.collected) return false;
    return (
      player.x < this.x + this.width &&
      player.x + player.width > this.x &&
      player.y < this.y + this.height &&
      player.y + player.height > this.y
    );
  }
}

class Enemy {
  constructor(x, y, patrolRange, speed, type = 'walker') {
    this.x = x;
    this.y = y;
    this.width = 38;
    this.height = 40;
    this.startX = x;
    this.patrolRange = patrolRange;
    this.speed = speed;
    this.direction = 1;
    this.type = type;
    this.animFrame = 0;
    this.animTimer = 0;
    this.alive = true;
  }

  update() {
    if (!this.alive) return;

    this.x += this.speed * this.direction;

    if (this.x > this.startX + this.patrolRange || this.x < this.startX - this.patrolRange) {
      this.direction *= -1;
    }

    this.animTimer++;
    if (this.animTimer > 8) {
      this.animTimer = 0;
      this.animFrame = (this.animFrame + 1) % 2;
    }
  }

  draw() {
    if (!this.alive) return;

    const drawX = this.x - cameraX;

    ctx.save();
    ctx.shadowColor = 'rgba(239, 68, 68, 0.5)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;

    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.roundRect(drawX, this.y + 8, this.width, this.height - 8, 8);
    ctx.fill();

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.roundRect(drawX + 3, this.y + 11, this.width - 6, this.height - 16, 6);
    ctx.fill();

    const eyeX = this.direction > 0 ? 6 : -6;
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(drawX + this.width / 2 - 7 + eyeX, this.y + 18, 6, 0, Math.PI * 2);
    ctx.arc(drawX + this.width / 2 + 7 + eyeX, this.y + 18, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(drawX + this.width / 2 - 7 + eyeX + this.direction * 2, this.y + 18, 3, 0, Math.PI * 2);
    ctx.arc(drawX + this.width / 2 + 7 + eyeX + this.direction * 2, this.y + 18, 3, 0, Math.PI * 2);
    ctx.fill();

    const legOffset = this.animFrame === 0 ? 3 : -3;
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(drawX + 6, this.y + this.height - 8 + legOffset, 8, 8);
    ctx.fillRect(drawX + this.width - 14, this.y + this.height - 8 - legOffset, 8, 8);

    ctx.fillStyle = '#fca5a5';
    ctx.fillRect(drawX + this.width / 2 - 8, this.y + this.height - 14, 16, 6);

    ctx.restore();
  }

  checkCollision(player) {
    if (!this.alive || player.invincible) return false;
    return (
      player.x < this.x + this.width &&
      player.x + player.width > this.x &&
      player.y < this.y + this.height &&
      player.y + player.height > this.y
    );
  }
}

class Flag {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 70;
    this.waveOffset = 0;
  }

  update() {
    this.waveOffset += 0.08;
  }

  draw() {
    const drawX = this.x - cameraX;

    ctx.save();

    ctx.fillStyle = '#78716c';
    ctx.fillRect(drawX + 6, this.y, 4, this.height);

    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.moveTo(drawX + 10, this.y + 5);
    ctx.quadraticCurveTo(
      drawX + 45 + Math.sin(this.waveOffset) * 4,
      this.y + 18,
      drawX + 42 + Math.sin(this.waveOffset + 1) * 3,
      this.y + 32
    );
    ctx.quadraticCurveTo(
      drawX + 38 + Math.sin(this.waveOffset + 2) * 4,
      this.y + 46,
      drawX + 10,
      this.y + 58
    );
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath();
    ctx.moveTo(drawX + 10, this.y + 5);
    ctx.quadraticCurveTo(
      drawX + 27 + Math.sin(this.waveOffset) * 2,
      this.y + 12,
      drawX + 26 + Math.sin(this.waveOffset + 1) * 1.5,
      this.y + 19
    );
    ctx.quadraticCurveTo(
      drawX + 24 + Math.sin(this.waveOffset + 2) * 2,
      this.y + 26,
      drawX + 10,
      this.y + 33
    );
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  checkCollision(player) {
    return (
      player.x < this.x + this.width + 20 &&
      player.x + player.width > this.x &&
      player.y < this.y + this.height &&
      player.y + player.height > this.y
    );
  }
}

let particles = [];

function createJumpParticles(x, y) {
  for (let i = 0; i < 10; i++) {
    particles.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * -3 - 1,
      size: Math.random() * 5 + 3,
      color: `hsla(${170 + Math.random() * 20}, 80%, ${50 + Math.random() * 20}%, `,
      life: 1,
      decay: 0.03 + Math.random() * 0.02
    });
  }
}

function createCollectParticles(x, y, color) {
  for (let i = 0; i < 15; i++) {
    const angle = (Math.PI * 2 * i) / 15;
    particles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * (3 + Math.random() * 3),
      vy: Math.sin(angle) * (3 + Math.random() * 3),
      size: Math.random() * 6 + 3,
      color: color,
      life: 1,
      decay: 0.025 + Math.random() * 0.02
    });
  }
}

function createHitParticles(x, y) {
  for (let i = 0; i < 12; i++) {
    particles.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      size: Math.random() * 6 + 4,
      color: 'rgba(239, 68, 68, ',
      life: 1,
      decay: 0.03 + Math.random() * 0.02
    });
  }
}

function createVictoryParticles() {
  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * GAME_WIDTH,
      y: GAME_HEIGHT + 20,
      vx: (Math.random() - 0.5) * 3,
      vy: -(Math.random() * 8 + 5),
      size: Math.random() * 8 + 4,
      color: `hsla(${Math.random() * 60 + 40}, 90%, 60%, `,
      life: 1,
      decay: 0.008 + Math.random() * 0.01
    });
  }
}

function updateParticles() {
  particles = particles.filter(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.1;
    p.life -= p.decay;
    p.size *= 0.97;
    return p.life > 0 && p.size > 0.5;
  });
}

function drawParticles() {
  for (const p of particles) {
    ctx.fillStyle = p.color + p.life + ')';
    ctx.beginPath();
    ctx.arc(p.x - cameraX, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const backgrounds = [
  { color1: '#0c1929', color2: '#1a365d', stars: 60 },
  { color1: '#1a0a1a', color2: '#2d1b4e', stars: 80 },
  { color1: '#0a1a0a', color2: '#1b3d1b', stars: 70 }
];

let bgStars = [];
let bgLayers = [];
let groundTiles = [];

function initBackground(levelIndex) {
  const bg = backgrounds[levelIndex] || backgrounds[0];
  bgStars = [];
  for (let i = 0; i < bg.stars; i++) {
    bgStars.push({
      x: Math.random() * GAME_WIDTH * 3,
      y: Math.random() * (GAME_HEIGHT * 0.65),
      size: Math.random() * 2 + 0.5,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.02 + Math.random() * 0.04
    });
  }

  bgLayers = [];
  const layerColors = levelIndex === 0 ?
    ['rgba(30, 58, 138, 0.3)', 'rgba(51, 65, 85, 0.25)', 'rgba(71, 85, 105, 0.2)'] :
    levelIndex === 1 ?
    ['rgba(88, 28, 135, 0.3)', 'rgba(107, 33, 168, 0.25)', 'rgba(126, 34, 206, 0.2)'] :
    ['rgba(22, 101, 52, 0.3)', 'rgba(21, 128, 61, 0.25)', 'rgba(34, 197, 94, 0.2)'];

  for (let l = 0; l < 3; l++) {
    const layer = [];
    const count = 6 + l * 3;
    for (let i = 0; i < count; i++) {
      layer.push({
        x: i * (GAME_WIDTH / count) + Math.random() * 100,
        y: GAME_HEIGHT * (0.4 + l * 0.15) + Math.random() * 60,
        width: 80 + Math.random() * 150,
        height: 120 + Math.random() * 180,
        parallax: 0.1 + l * 0.15
      });
    }
    bgLayers.push({ elements: layer, color: layerColors[l], parallax: 0.1 + l * 0.15 });
  }

  groundTiles = [];
  const tileColors = ['#1e3a5f', '#1e4030', '#3d1e5f'];
  for (let i = 0; i < 50; i++) {
    groundTiles.push({
      x: i * 60,
      width: 60 + Math.random() * 20,
      height: 25 + Math.random() * 15,
      color: tileColors[levelIndex] || tileColors[0]
    });
  }
}

function drawBackground(levelIndex) {
  const bg = backgrounds[levelIndex] || backgrounds[0];
  const gradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
  gradient.addColorStop(0, bg.color1);
  gradient.addColorStop(0.6, bg.color2);
  gradient.addColorStop(1, bg.color1);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  for (const star of bgStars) {
    star.twinkle += star.twinkleSpeed;
    const alpha = 0.4 + Math.sin(star.twinkle) * 0.4;
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.beginPath();
    ctx.arc((star.x - cameraX * 0.15) % (GAME_WIDTH + 100) - 50, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let l = 0; l < bgLayers.length; l++) {
    const layer = bgLayers[l];
    ctx.fillStyle = layer.color;
    for (const el of layer.elements) {
      const drawX = ((el.x - cameraX * layer.parallax) % (GAME_WIDTH + el.width + 100)) - el.width / 2;
      ctx.beginPath();
      ctx.moveTo(drawX, el.y + el.height);
      ctx.lineTo(drawX + el.width / 2, el.y);
      ctx.lineTo(drawX + el.width, el.y + el.height);
      ctx.closePath();
      ctx.fill();
    }
  }

  const groundY = GAME_HEIGHT - 35;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, groundY, GAME_WIDTH, 35);

  for (const tile of groundTiles) {
    const drawX = ((tile.x - cameraX * 0.6) % (GAME_WIDTH + tile.width)) - tile.width;
    ctx.fillStyle = tile.color;
    ctx.fillRect(drawX, groundY, tile.width, tile.height);
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fillRect(drawX, groundY, tile.width, 3);
  }
}

let player;
let platforms = [];
let collectibles = [];
let enemies = [];
let flag;
let levelData = {};

const levels = {
  1: {
    name: 'Forest Adventure',
    theme: 'forest',
    platforms: [
      { x: 0, y: 480, w: 300, h: 25, type: 'normal' },
      { x: 350, y: 430, w: 130, h: 20, type: 'normal' },
      { x: 520, y: 380, w: 110, h: 20, type: 'normal' },
      { x: 670, y: 330, w: 140, h: 20, type: 'normal' },
      { x: 450, y: 280, w: 100, h: 20, type: 'moving', range: 80, speed: 2 },
      { x: 260, y: 240, w: 120, h: 20, type: 'normal' },
      { x: 80, y: 190, w: 130, h: 20, type: 'normal' },
      { x: 240, y: 140, w: 100, h: 20, type: 'vanishing' },
      { x: 400, y: 100, w: 130, h: 20, type: 'normal' },
      { x: 600, y: 150, w: 160, h: 25, type: 'normal' },
      { x: 820, y: 220, w: 120, h: 20, type: 'normal' },
      { x: 980, y: 280, w: 100, h: 20, type: 'moving', range: 60, speed: 2.5 },
      { x: 1140, y: 340, w: 140, h: 20, type: 'normal' },
      { x: 1320, y: 400, w: 120, h: 20, type: 'vanishing' },
      { x: 1490, y: 460, w: 200, h: 25, type: 'normal' }
    ],
    collectibles: [
      { x: 390, y: 395, type: 'coin' }, { x: 550, y: 345, type: 'coin' }, { x: 720, y: 295, type: 'star' },
      { x: 490, y: 245, type: 'coin' }, { x: 300, y: 205, type: 'coin' }, { x: 120, y: 155, type: 'gem' },
      { x: 270, y: 105, type: 'coin' }, { x: 440, y: 65, type: 'coin' }, { x: 660, y: 115, type: 'star' },
      { x: 860, y: 185, type: 'coin' }, { x: 1010, y: 245, type: 'coin' }, { x: 1180, y: 305, type: 'gem' },
      { x: 1360, y: 365, type: 'coin' }, { x: 1560, y: 425, type: 'coin' }
    ],
    enemies: [
      { x: 700, y: 290, range: 100, speed: 1.5 },
      { x: 1050, y: 245, range: 70, speed: 2 }
    ],
    flag: { x: 1640, y: 400 }
  },
  2: {
    name: 'Crystal Caves',
    theme: 'cave',
    platforms: [
      { x: 0, y: 480, w: 250, h: 25, type: 'normal' },
      { x: 300, y: 440, w: 100, h: 20, type: 'vanishing' },
      { x: 440, y: 390, w: 120, h: 20, type: 'normal' },
      { x: 600, y: 340, w: 90, h: 20, type: 'moving', range: 100, speed: 2.5 },
      { x: 760, y: 290, w: 130, h: 20, type: 'normal' },
      { x: 540, y: 230, w: 100, h: 20, type: 'vanishing' },
      { x: 380, y: 180, w: 110, h: 20, type: 'normal' },
      { x: 200, y: 130, w: 130, h: 20, type: 'moving', range: 70, speed: 2 },
      { x: 50, y: 190, w: 100, h: 20, type: 'normal' },
      { x: 420, y: 90, w: 120, h: 20, type: 'normal' },
      { x: 600, y: 130, w: 100, h: 20, type: 'vanishing' },
      { x: 760, y: 180, w: 140, h: 20, type: 'normal' },
      { x: 950, y: 230, w: 110, h: 20, type: 'moving', range: 80, speed: 2.2 },
      { x: 1120, y: 280, w: 130, h: 20, type: 'normal' },
      { x: 1310, y: 330, w: 100, h: 20, type: 'vanishing' },
      { x: 1470, y: 390, w: 150, h: 25, type: 'normal' },
      { x: 1670, y: 450, w: 130, h: 20, type: 'normal' }
    ],
    collectibles: [
      { x: 330, y: 405, type: 'coin' }, { x: 480, y: 355, type: 'star' }, { x: 635, y: 305, type: 'coin' },
      { x: 800, y: 255, type: 'gem' }, { x: 575, y: 195, type: 'coin' }, { x: 420, y: 145, type: 'coin' },
      { x: 245, y: 95, type: 'star' }, { x: 85, y: 155, type: 'coin' }, { x: 470, y: 55, type: 'gem' },
      { x: 635, y: 95, type: 'coin' }, { x: 800, y: 145, type: 'coin' }, { x: 985, y: 195, type: 'star' },
      { x: 1160, y: 245, type: 'coin' }, { x: 1345, y: 295, type: 'coin' }, { x: 1520, y: 355, type: 'gem' },
      { x: 1710, y: 415, type: 'coin' }
    ],
    enemies: [
      { x: 650, y: 295, range: 80, speed: 2 },
      { x: 1000, y: 195, range: 90, speed: 1.8 },
      { x: 1400, y: 295, range: 70, speed: 2.2 }
    ],
    flag: { x: 1750, y: 410 }
  },
  3: {
    name: 'Sky Summit',
    theme: 'sky',
    platforms: [
      { x: 0, y: 480, w: 200, h: 25, type: 'normal' },
      { x: 250, y: 440, w: 90, h: 20, type: 'moving', range: 60, speed: 2 },
      { x: 380, y: 390, w: 110, h: 20, type: 'vanishing' },
      { x: 530, y: 340, w: 100, h: 20, type: 'normal' },
      { x: 680, y: 290, w: 120, h: 20, type: 'moving', range: 90, speed: 2.8 },
      { x: 500, y: 230, w: 90, h: 20, type: 'vanishing' },
      { x: 350, y: 180, w: 110, h: 20, type: 'normal' },
      { x: 180, y: 130, w: 100, h: 20, type: 'moving', range: 70, speed: 2.3 },
      { x: 40, y: 180, w: 100, h: 20, type: 'normal' },
      { x: 320, y: 80, w: 100, h: 20, type: 'vanishing' },
      { x: 480, y: 120, w: 110, h: 20, type: 'normal' },
      { x: 640, y: 170, w: 100, h: 20, type: 'moving', range: 80, speed: 2.5 },
      { x: 800, y: 220, w: 120, h: 20, type: 'normal' },
      { x: 970, y: 270, w: 90, h: 20, type: 'vanishing' },
      { x: 1120, y: 320, w: 110, h: 20, type: 'normal' },
      { x: 1290, y: 370, w: 100, h: 20, type: 'moving', range: 70, speed: 2.6 },
      { x: 1460, y: 420, w: 130, h: 20, type: 'vanishing' },
      { x: 1640, y: 470, w: 160, h: 25, type: 'normal' }
    ],
    collectibles: [
      { x: 280, y: 405, type: 'coin' }, { x: 410, y: 355, type: 'star' }, { x: 565, y: 305, type: 'gem' },
      { x: 730, y: 255, type: 'coin' }, { x: 535, y: 195, type: 'coin' }, { x: 385, y: 145, type: 'coin' },
      { x: 215, y: 95, type: 'star' }, { x: 75, y: 145, type: 'coin' }, { x: 355, y: 45, type: 'gem' },
      { x: 520, y: 85, type: 'coin' }, { x: 680, y: 135, type: 'coin' }, { x: 845, y: 185, type: 'star' },
      { x: 1000, y: 235, type: 'coin' }, { x: 1155, y: 285, type: 'gem' }, { x: 1325, y: 335, type: 'coin' },
      { x: 1500, y: 385, type: 'coin' }, { x: 1700, y: 435, type: 'star' }
    ],
    enemies: [
      { x: 560, y: 295, range: 70, speed: 2.2 },
      { x: 850, y: 185, range: 90, speed: 2 },
      { x: 1160, y: 275, range: 80, speed: 2.4 },
      { x: 1500, y: 385, range: 70, speed: 2.5 }
    ],
    flag: { x: 1740, y: 430 }
  }
};

function loadLevel(levelNum) {
  const data = levels[levelNum];
  if (!data) return;

  platforms = data.platforms.map(p =>
    new Platform(p.x, p.y, p.w, p.h, p.type, p.range || 0, p.speed || 2)
  );

  collectibles = data.collectibles.map(c =>
    new Collectible(c.x, c.y, c.type)
  );

  enemies = data.enemies.map(e =>
    new Enemy(e.x, e.y, e.range, e.speed)
  );

  flag = new Flag(data.flag.x, data.flag.y);

  player = new Player(80, 380);
  cameraX = 0;
  coinsCollected = 0;
  totalCoinsInLevel = collectibles.length;
  particles = [];
  levelStartTime = Date.now();

  initBackground(levelNum - 1);
  updateUI();
}

function updateCamera() {
  const targetX = player.x - GAME_WIDTH / 3;
  cameraX += (targetX - cameraX) * 0.08;
  cameraX = Math.max(0, cameraX);
}

function updateUI() {
  document.getElementById('score').textContent = score;
  document.getElementById('lives').textContent = lives;
  document.getElementById('level').textContent = currentLevel;
  document.getElementById('coins').textContent = `${coinsCollected}/${totalCoinsInLevel}`;
  document.getElementById('highScore').textContent = highScore;

  const hpPercent = (lives / maxLives) * 100;
  document.getElementById('hpBar').style.width = `${hpPercent}%`;
}

function gameLoop() {
  if (gameState !== 'playing') {
    requestAnimationFrame(gameLoop);
    return;
  }

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  drawBackground(currentLevel - 1);
  updateCamera();

  for (const platform of platforms) {
    platform.update();
    platform.draw();
  }

  for (const collectible of collectibles) {
    collectible.update();
    if (collectible.checkCollision(player) && !collectible.collected) {
      collectible.collected = true;
      score += collectible.points;
      coinsCollected++;
      createCollectParticles(collectible.x + collectible.width / 2, collectible.y + collectible.height / 2, collectible.color);
      updateUI();
    }
    collectible.draw();
  }

  for (const enemy of enemies) {
    enemy.update();
    if (enemy.checkCollision(player)) {
      player.takeDamage(1);
    }
    enemy.draw();
  }

  flag.update();
  flag.draw();
  if (flag.checkCollision(player)) {
    levelComplete();
  }

  player.update(platforms);
  player.draw();

  updateParticles();
  drawParticles();

  requestAnimationFrame(gameLoop);
}

function startGame() {
  gameState = 'playing';
  score = 0;
  lives = maxLives;
  currentLevel = 1;
  loadLevel(currentLevel);
  document.getElementById('startOverlay').classList.add('hidden');
  document.getElementById('gameOverOverlay').classList.add('hidden');
  document.getElementById('victoryOverlay').classList.add('hidden');
}

function levelComplete() {
  gameState = 'levelcomplete';

  const timeUsed = Math.floor((Date.now() - levelStartTime) / 1000);
  const minutes = Math.floor(timeUsed / 60).toString().padStart(2, '0');
  const seconds = (timeUsed % 60).toString().padStart(2, '0');

  const levelBonus = 500 * currentLevel;
  const coinBonus = coinsCollected * 5;
  score += levelBonus + coinBonus;

  const starsEarned = coinsCollected >= totalCoinsInLevel ? 3 : coinsCollected >= totalCoinsInLevel * 0.6 ? 2 : 1;

  document.getElementById('starsEarned').textContent = '⭐'.repeat(starsEarned);
  document.getElementById('coinsCollected').textContent = `${coinsCollected}/${totalCoinsInLevel}`;
  document.getElementById('timeUsed').textContent = `${minutes}:${seconds}`;
  document.getElementById('levelCompleteOverlay').classList.remove('hidden');

  createVictoryParticles();
  updateUI();

  if (score > highScore) {
    highScore = score;
    localStorage.setItem('platformer-highscore', highScore);
  }
}

function nextLevel() {
  document.getElementById('levelCompleteOverlay').classList.add('hidden');

  if (currentLevel >= TOTAL_LEVELS) {
    victory();
    return;
  }

  currentLevel++;
  gameState = 'playing';
  loadLevel(currentLevel);
}

function victory() {
  gameState = 'victory';

  document.getElementById('victoryTotalScore').textContent = score;
  document.getElementById('victoryTotalCoins').textContent = coinsCollected;
  document.getElementById('victoryOverlay').classList.remove('hidden');

  if (score > highScore) {
    highScore = score;
    localStorage.setItem('platformer-highscore', highScore);
  }
}

function gameOver() {
  gameState = 'gameover';

  document.getElementById('finalScore').textContent = score;
  document.getElementById('finalLevel').textContent = currentLevel;
  document.getElementById('finalCoins').textContent = coinsCollected;
  document.getElementById('gameOverOverlay').classList.remove('hidden');

  if (score > highScore) {
    highScore = score;
    localStorage.setItem('platformer-highscore', highScore);
    updateUI();
  }
}

function restartGame() {
  document.getElementById('gameOverOverlay').classList.add('hidden');
  document.getElementById('victoryOverlay').classList.add('hidden');
  startGame();
}

function togglePause() {
  if (gameState === 'playing') {
    gameState = 'paused';
    document.getElementById('pauseOverlay').classList.remove('hidden');
  } else if (gameState === 'paused') {
    gameState = 'playing';
    document.getElementById('pauseOverlay').classList.add('hidden');
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById('soundBtn');
  btn.querySelector('.btn-icon').textContent = soundEnabled ? '🔊' : '🔇';
  btn.querySelector('.btn-text').textContent = soundEnabled ?
    document.querySelector('[data-i18n="common.soundOn"]')?.textContent || '音效' :
    document.querySelector('[data-i18n="common.soundOff"]')?.textContent || '静音';
}

document.addEventListener('keydown', (e) => {
  keys[e.code] = true;

  if ((e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp') && gameState === 'playing') {
    e.preventDefault();
    player.jump();
  }

  if (e.code === 'KeyP') {
    if (gameState === 'playing' || gameState === 'paused') {
      togglePause();
    }
  }

  if (e.code === 'Escape' && gameState === 'paused') {
    togglePause();
  }
});

document.addEventListener('keyup', (e) => {
  keys[e.code] = false;
});

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('resumeBtn').addEventListener('click', togglePause);
document.getElementById('quitBtn').addEventListener('click', () => {
  togglePause();
  gameState = 'menu';
  document.getElementById('pauseOverlay').classList.add('hidden');
  document.getElementById('startOverlay').classList.remove('hidden');
});
document.getElementById('nextLevelBtn').addEventListener('click', nextLevel);
document.getElementById('retryBtn').addEventListener('click', restartGame);
document.getElementById('playAgainBtn').addEventListener('click', restartGame);
document.getElementById('backToMenuBtn2').addEventListener('click', () => {
  document.getElementById('gameOverOverlay').classList.add('hidden');
  document.getElementById('startOverlay').classList.remove('hidden');
  gameState = 'menu';
});
document.getElementById('pauseBtn').addEventListener('click', togglePause);
document.getElementById('restartBtn').addEventListener('click', restartGame);
document.getElementById('soundBtn').addEventListener('click', toggleSound);

const mobileLeft = document.getElementById('mobileLeft');
const mobileRight = document.getElementById('mobileRight');
const mobileJump = document.getElementById('mobileJump');

mobileLeft.addEventListener('touchstart', (e) => { e.preventDefault(); keys['ArrowLeft'] = true; });
mobileLeft.addEventListener('touchend', (e) => { e.preventDefault(); keys['ArrowLeft'] = false; });
mobileRight.addEventListener('touchstart', (e) => { e.preventDefault(); keys['ArrowRight'] = true; });
mobileRight.addEventListener('touchend', (e) => { e.preventDefault(); keys['ArrowRight'] = false; });
mobileJump.addEventListener('touchstart', (e) => {
  e.preventDefault();
  if (gameState === 'playing' && player) player.jump();
});

initBackground(0);
updateUI();
gameLoop();