import * as THREE from 'three';
import './style.css';
import { BATTLEFIELD, COLORS, PLAYER, WEAPONS } from './config';
import { createBattlefield, createDecorations, createFlag, animateDecorations } from './environment';
import { createPlayer, updatePlayer, updatePlayerCamera, addLook, endLook, updateForwardIndicator, getAimDirection, getHorseVelocity, PlayerController, isMobileDevice } from './player';
import { spawnArmy, resetUnitIdCounter } from './formation';
import { Unit, UnitState, WeaponType, GameState } from './types';
import { updateUnitFlashes, removeDeadUnits } from './units';
import { arrows, clearArrows, spawnArrow, updateArrows, updateSwingEffects, createTrajectoryLine, computeTrajectory, swordAttack } from './weapons';
import { resetEnemyLeaderDead, setEnemyLeaderDead, setEnemyArmySize, checkEnemyMorale } from './ai';
import { clamp } from './utils';

declare global {
  interface Window {
    __playerUnit: Unit;
    __THREE_GAME_DIAGNOSTICS__: any;
  }
}

// ==================== DOM Elements ====================
const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const hpFill = document.getElementById('hp-fill') as HTMLElement;
const hpText = document.getElementById('hp-text') as HTMLElement;
const killsEl = document.getElementById('kills') as HTMLElement;
const weaponEl = document.getElementById('weapon') as HTMLElement;
const alliesEl = document.getElementById('allies') as HTMLElement;
const enemiesEl = document.getElementById('enemies') as HTMLElement;
const leaderHpEl = document.getElementById('leader-hp') as HTMLElement;
const leaderHpFill = document.getElementById('leader-hp-fill') as HTMLElement;
const messageEl = document.getElementById('message') as HTMLElement;
const instructionsEl = document.getElementById('instructions') as HTMLElement;
const gameOverEl = document.getElementById('game-over') as HTMLElement;
const resultTitle = document.getElementById('result-title') as HTMLElement;
const resultDesc = document.getElementById('result-desc') as HTMLElement;
const startBtn = document.getElementById('start-btn') as HTMLButtonElement;
const restartBtn = document.getElementById('restart-btn') as HTMLButtonElement;
const menuRestartBtn = document.getElementById('menu-restart-btn') as HTMLButtonElement;
const touchControls = document.getElementById('touch-controls') as HTMLElement;
const joystick = document.getElementById('joystick') as HTMLElement;
const joystickKnob = document.getElementById('joystick-knob') as HTMLElement;
const lookArea = document.getElementById('look-area') as HTMLElement;
const btnSprint = document.getElementById('btn-sprint') as HTMLButtonElement;
const btnWeapon = document.getElementById('btn-weapon') as HTMLButtonElement;
const btnAttack = document.getElementById('btn-attack') as HTMLButtonElement;
const btnCamera = document.getElementById('btn-camera') as HTMLButtonElement;
const mobileWeaponName = document.getElementById('mobile-weapon-name') as HTMLElement;
const forwardHudArrow = document.getElementById('forward-hud-arrow') as HTMLElement;

// ==================== Game State ====================
const state: GameState = {
  score: 0,
  kills: 0,
  shots: 0,
  hits: 0,
  playerHp: PLAYER.maxHp,
  gameActive: false,
  roundActive: false,
  ended: false,
  result: null,
  currentWeapon: WeaponType.Bow,
  isDrawing: false,
  drawStart: null,
  power: 0,
  yaw: 0,
  pitch: 0,
};

// ==================== Three.js Setup ====================
const scene = new THREE.Scene();
scene.background = new THREE.Color(COLORS.sky);
scene.fog = new THREE.Fog(COLORS.fog, 40, 220);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

// ==================== Battlefield ====================
createBattlefield(scene);
createDecorations(scene);
createFlag(scene, -30, BATTLEFIELD.playerSpawnZ + 15, 'ally');
createFlag(scene, 30, BATTLEFIELD.enemySpawnZ - 15, 'enemy');

let player: PlayerController | null = null;
let allUnits: Unit[] = [];
let allyLeader: Unit | null = null;
let enemyLeader: Unit | null = null;
let isDrawing = false;
let drawPower = 0;

const touchState = {
  joystick: { active: false, id: -1, centerX: 0, centerY: 0 },
  look: { active: false, id: -1, lastX: 0, lastY: 0 },
};

const keys = { w: false, a: false, s: false, d: false };

const trajectoryLine = createTrajectoryLine();
scene.add(trajectoryLine);

// ==================== Game Flow ====================
function spawnGame(): void {
  // Clean up previous units
  allUnits.forEach((u) => u.destroy());
  allUnits = [];
  clearArrows(scene);
  resetUnitIdCounter();
  resetEnemyLeaderDead();

  player = createPlayer(scene);
  window.__playerUnit = player.unit;
  allUnits.push(player.unit);

  const allyArmy = spawnArmy(
    'ally',
    {
      infantry: BATTLEFIELD.infantryCount.ally,
      cavalry: BATTLEFIELD.cavalryCount.ally,
      hasLeader: true,
    },
    BATTLEFIELD.playerSpawnZ - 15
  );
  allyArmy.units.forEach((u) => scene.add(u.mesh));
  allUnits = allUnits.concat(allyArmy.units);
  allyLeader = allyArmy.leader;

  const enemyArmy = spawnArmy(
    'enemy',
    {
      infantry: BATTLEFIELD.infantryCount.enemy,
      cavalry: BATTLEFIELD.cavalryCount.enemy,
      hasLeader: true,
    },
    BATTLEFIELD.enemySpawnZ + 15
  );
  enemyArmy.units.forEach((u) => scene.add(u.mesh));
  allUnits = allUnits.concat(enemyArmy.units);
  enemyLeader = enemyArmy.leader;

  const enemySize = BATTLEFIELD.infantryCount.enemy + BATTLEFIELD.cavalryCount.enemy + 1 + 4;
  setEnemyArmySize(enemySize);

  state.score = 0;
  state.kills = 0;
  state.shots = 0;
  state.hits = 0;
  state.playerHp = PLAYER.maxHp;
  state.currentWeapon = WeaponType.Bow;
  state.ended = false;
  state.result = null;
  state.gameActive = true;
  state.roundActive = true;
  isDrawing = false;
  drawPower = 0;

  updateHUD();
}

function startGame(): void {
  spawnGame();
  instructionsEl.classList.add('hidden');
  gameOverEl.classList.add('hidden');
  if (isMobileDevice()) {
    touchControls.classList.add('active');
    updateTouchButtonLabels();
  } else {
    canvas.requestPointerLock();
  }
}

function endGame(result: 'win' | 'lose'): void {
  state.ended = true;
  state.result = result;
  state.roundActive = false;
  if (!isMobileDevice()) {
    document.exitPointerLock();
  } else {
    touchControls.classList.remove('active');
  }
  resultTitle.textContent = result === 'win' ? getI18n('victory') : getI18n('defeat');
  resultDesc.textContent = result === 'win' ? getI18n('winDesc') : getI18n('loseDesc');
  gameOverEl.classList.remove('hidden');
}

function fireArrow(power: number): void {
  if (!player) return;
  const origin = player.unit.position.clone().add(new THREE.Vector3(0, 2.6, 0));
  const dir = getAimDirection(player);
  spawnArrow(origin, dir, power, getHorseVelocity(player), 'player');
  state.shots++;
  updateHUD();
}

function switchWeapon(type: WeaponType): void {
  state.currentWeapon = type;
  updateHUD();
  if (isMobileDevice()) {
    updateTouchButtonLabels();
  }
}

function updateTouchButtonLabels(): void {
  const weaponName = state.currentWeapon === WeaponType.Bow ? getI18n('bow') : getI18n('sword');
  const actionName = state.currentWeapon === WeaponType.Bow ? getI18n('shoot') : getI18n('slash');
  btnWeapon.textContent = weaponName;
  btnAttack.textContent = actionName;
  if (mobileWeaponName) {
    mobileWeaponName.textContent = weaponName;
  }
}

function toggleWeapon(): void {
  if (!state.gameActive || state.ended) return;
  switchWeapon(state.currentWeapon === WeaponType.Bow ? WeaponType.Sword : WeaponType.Bow);
}

// ==================== Input Handling ====================

function updateKeyboardInput(): void {
  if (!player) return;
  let move = 0;
  if (keys.w) move += 1;
  if (keys.s) move -= 1;
  player.input.move = clamp(move, -1, 1);

  let turn = 0;
  if (keys.a) turn += 1;
  if (keys.d) turn -= 1;
  player.input.turn = clamp(turn, -1, 1);
}

function startAttack(): void {
  if (!state.gameActive || state.ended || !player) return;
  if (state.currentWeapon === WeaponType.Bow) {
    isDrawing = true;
    state.isDrawing = true;
    drawPower = 0;
  } else if (state.currentWeapon === WeaponType.Sword) {
    swordAttack(player.unit, allUnits, scene);
  }
}

function endAttack(): void {
  if (!isDrawing) return;
  if (drawPower > 0.08 && player) {
    fireArrow(drawPower);
  }
  isDrawing = false;
  state.isDrawing = false;
  drawPower = 0;
  trajectoryLine.geometry.setFromPoints([]);
}

window.addEventListener('keydown', (e) => {
  if (!player) return;
  const key = e.key.toLowerCase();
  switch (key) {
    case 'w':
    case 'arrowup':
      keys.w = true;
      break;
    case 'a':
    case 'arrowleft':
      keys.a = true;
      break;
    case 's':
    case 'arrowdown':
      keys.s = true;
      break;
    case 'd':
    case 'arrowright':
      keys.d = true;
      break;
    case 'shift':
      player.input.sprint = true;
      break;
    case ' ':
      player.input.attack = true;
      startAttack();
      break;
    case '1':
      if (state.gameActive && !state.ended) switchWeapon(WeaponType.Bow);
      break;
    case '2':
      if (state.gameActive && !state.ended) switchWeapon(WeaponType.Sword);
      break;
  }
  updateKeyboardInput();
});

window.addEventListener('keyup', (e) => {
  if (!player) return;
  const key = e.key.toLowerCase();
  switch (key) {
    case 'w':
    case 'arrowup':
      keys.w = false;
      break;
    case 'a':
    case 'arrowleft':
      keys.a = false;
      break;
    case 's':
    case 'arrowdown':
      keys.s = false;
      break;
    case 'd':
    case 'arrowright':
      keys.d = false;
      break;
    case 'shift':
      player.input.sprint = false;
      break;
    case ' ':
      player.input.attack = false;
      endAttack();
      break;
  }
  updateKeyboardInput();
});

window.addEventListener('mousemove', (e) => {
  if (!player || !document.pointerLockElement) return;
  addLook(player, e.movementX, e.movementY);
});

window.addEventListener('mousedown', (e) => {
  if (e.button !== 0) return;
  startAttack();
});

window.addEventListener('mouseup', (e) => {
  if (e.button !== 0) return;
  endAttack();
});

function applyAimAssist(dt: number): void {
  if (!player || !isMobileDevice() || state.currentWeapon !== WeaponType.Bow || !isDrawing) return;

  const eye = player.unit.position.clone().add(new THREE.Vector3(0, 2.6, 0));
  const aimDir = getAimDirection(player);
  const aimFlat = new THREE.Vector3(aimDir.x, 0, aimDir.z).normalize();

  let bestWeight = 0;
  let bestDir: THREE.Vector3 | null = null;

  for (const unit of allUnits) {
    if (unit.state === UnitState.Dead) continue;
    if (unit.team === 'player' || unit.team === 'ally') continue;

    const targetPos = unit.position.clone().add(new THREE.Vector3(0, PLAYER.touch.aimAssist.targetOffsetY, 0));
    const toTarget = targetPos.clone().sub(eye);
    const dist = toTarget.length();
    if (dist > PLAYER.touch.aimAssist.maxDistance) continue;

    const toTargetFlat = new THREE.Vector3(toTarget.x, 0, toTarget.z).normalize();
    const angle = aimFlat.angleTo(toTargetFlat);
    if (angle > PLAYER.touch.aimAssist.coneAngle) continue;

    const weight = 1 - angle / PLAYER.touch.aimAssist.coneAngle;
    if (weight > bestWeight) {
      bestWeight = weight;
      bestDir = toTarget.clone().normalize();
    }
  }

  if (bestDir) {
    const currentDir = aimDir.clone();
    const assisted = currentDir.lerp(bestDir, PLAYER.touch.aimAssist.strength * bestWeight).normalize();
    const targetYaw = Math.atan2(assisted.x, assisted.z);
    let yawDiff = targetYaw - player.horseYaw - player.lookYaw;
    while (yawDiff > Math.PI) yawDiff -= Math.PI * 2;
    while (yawDiff < -Math.PI) yawDiff += Math.PI * 2;
    player.lookYaw = clamp(player.lookYaw + yawDiff * dt * 6, -PLAYER.camera.lookClampYaw, PLAYER.camera.lookClampYaw);

    const horizontalLen = Math.sqrt(assisted.x * assisted.x + assisted.z * assisted.z);
    const targetCamPitch = Math.atan2(assisted.y, Math.max(horizontalLen, 0.001));
    let pitchDiff = targetCamPitch - (PLAYER.camera.basePitch + player.lookPitch);
    player.lookPitch = clamp(
      player.lookPitch + pitchDiff * dt * 6,
      -PLAYER.camera.lookClampPitch + PLAYER.camera.basePitch,
      PLAYER.camera.lookClampPitch
    );
    player.lookActive = true;
  }
}

// Touch controls
function isTouchOnActionButton(x: number, y: number): boolean {
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;
  return x > screenW - 160 && y > screenH - 280;
}

function updateJoystick(touch: Touch): void {
  const dx = touch.clientX - touchState.joystick.centerX;
  const dy = touch.clientY - touchState.joystick.centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const maxDist = 60;
  const normalized = Math.min(distance, maxDist) / maxDist;
  const angle = Math.atan2(dy, dx);

  const knobX = Math.cos(angle) * normalized * maxDist;
  const knobY = Math.sin(angle) * normalized * maxDist;
  joystickKnob.style.transform = `translate(${knobX}px, ${knobY}px)`;

  if (!player) return;

  if (player.controlMode === 'absolute') {
    // Mobile: joystick vector = camera-relative world direction
    const joyX = dx / maxDist;
    const joyY = dy / maxDist;
    const mag = Math.min(Math.sqrt(joyX * joyX + joyY * joyY), 1);
    if (mag < PLAYER.touch.joystickDeadZone) {
      player.input.move = 0;
      player.targetYaw = null;
      return;
    }

    const sin = Math.sin(player.horseYaw);
    const cos = Math.cos(player.horseYaw);
    const camForward = new THREE.Vector3(sin, 0, cos);
    const camRight = new THREE.Vector3(cos, 0, -sin);
    const worldDir = new THREE.Vector3()
      .copy(camForward)
      .multiplyScalar(-joyY / mag)
      .add(camRight.clone().multiplyScalar(joyX / mag))
      .normalize();

    player.targetYaw = Math.atan2(worldDir.x, worldDir.z);
    player.input.move = mag;

    // Auto-sprint when joystick is pushed near the edge
    if (mag > PLAYER.touch.autoSprintThreshold) {
      player.input.sprint = true;
    } else if (mag <= PLAYER.touch.autoSprintThreshold - 0.15) {
      player.input.sprint = false;
    }
  } else {
    // Desktop fallback / relative tank controls
    let move = -Math.sin(angle) * normalized;
    let turn = Math.cos(angle) * normalized;

    const dz = PLAYER.touch.joystickDeadZone;
    if (Math.abs(move) < dz) move = 0;
    if (Math.abs(turn) < dz) turn = 0;

    player.input.move = clamp(move, -1, 1);
    player.input.turn = clamp(turn, -1, 1);
  }
}

window.addEventListener(
  'touchstart',
  (e) => {
    if (!state.gameActive || state.ended) return;
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      const x = touch.clientX;
      const y = touch.clientY;
      const screenW = window.innerWidth;

      if (x < screenW * 0.4 && !touchState.joystick.active) {
        touchState.joystick.active = true;
        touchState.joystick.id = touch.identifier;
        // Dynamic joystick: center under the finger
        const joySize = 150;
        const centerX = x;
        const centerY = y;
        joystick.style.left = `${centerX - joySize / 2}px`;
        joystick.style.top = `${centerY - joySize / 2}px`;
        joystick.style.bottom = 'auto';
        joystick.style.right = 'auto';
        joystick.classList.add('active');
        touchState.joystick.centerX = centerX;
        touchState.joystick.centerY = centerY;
        updateJoystick(touch);
      } else if (x >= screenW * 0.4 && !touchState.look.active && !isTouchOnActionButton(x, y)) {
        touchState.look.active = true;
        touchState.look.id = touch.identifier;
        touchState.look.lastX = x;
        touchState.look.lastY = y;
      }
    }
  },
  { passive: false }
);

window.addEventListener(
  'touchmove',
  (e) => {
    if (!player) return;
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === touchState.joystick.id) {
        updateJoystick(touch);
      } else if (touch.identifier === touchState.look.id) {
        const x = touch.clientX;
        const y = touch.clientY;
        const dx = x - touchState.look.lastX;
        const dy = y - touchState.look.lastY;
        if (player) addLook(player, dx, dy);
        touchState.look.lastX = x;
        touchState.look.lastY = y;
      }
    }
  },
  { passive: false }
);

window.addEventListener(
  'touchend',
  (e) => {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === touchState.joystick.id) {
        touchState.joystick.active = false;
        touchState.joystick.id = -1;
        joystickKnob.style.transform = 'translate(0, 0)';
        joystick.style.left = '';
        joystick.style.top = '';
        joystick.style.bottom = '';
        joystick.style.right = '';
        joystick.classList.remove('active');
        if (player) {
          player.input.move = 0;
          player.input.turn = 0;
          player.targetYaw = null;
          if (player.controlMode === 'absolute') {
            player.input.sprint = false;
          }
        }
      } else if (touch.identifier === touchState.look.id) {
        touchState.look.active = false;
        touchState.look.id = -1;
        if (player) endLook(player);
      }
    }
  },
  { passive: false }
);

window.addEventListener(
  'touchcancel',
  (e) => {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === touchState.joystick.id) {
        touchState.joystick.active = false;
        touchState.joystick.id = -1;
        joystickKnob.style.transform = 'translate(0, 0)';
        joystick.style.left = '';
        joystick.style.top = '';
        joystick.style.bottom = '';
        joystick.style.right = '';
        joystick.classList.remove('active');
        if (player) {
          player.input.move = 0;
          player.input.turn = 0;
          player.targetYaw = null;
          if (player.controlMode === 'absolute') {
            player.input.sprint = false;
          }
        }
      } else if (touch.identifier === touchState.look.id) {
        touchState.look.active = false;
        touchState.look.id = -1;
        if (player) endLook(player);
      }
    }
  },
  { passive: false }
);

// Action buttons
btnAttack.addEventListener(
  'touchstart',
  (e) => {
    e.preventDefault();
    startAttack();
  },
  { passive: false }
);

btnAttack.addEventListener(
  'touchend',
  (e) => {
    e.preventDefault();
    endAttack();
  },
  { passive: false }
);

btnSprint.addEventListener(
  'touchstart',
  (e) => {
    e.preventDefault();
    if (player) player.input.sprint = true;
  },
  { passive: false }
);

btnSprint.addEventListener(
  'touchend',
  (e) => {
    e.preventDefault();
    if (player) player.input.sprint = false;
  },
  { passive: false }
);

btnWeapon.addEventListener(
  'touchstart',
  (e) => {
    e.preventDefault();
    toggleWeapon();
  },
  { passive: false }
);

btnCamera.addEventListener(
  'touchstart',
  (e) => {
    e.preventDefault();
    if (player) {
      player.lookYaw = 0;
      player.lookPitch = 0;
      player.lookActive = false;
    }
  },
  { passive: false }
);

// Reset input on blur / visibility change
window.addEventListener('blur', () => {
  keys.w = keys.a = keys.s = keys.d = false;
  if (player) {
    player.input.move = 0;
    player.input.turn = 0;
    player.input.sprint = false;
    player.input.attack = false;
  }
  endAttack();
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    keys.w = keys.a = keys.s = keys.d = false;
    if (player) {
      player.input.move = 0;
      player.input.turn = 0;
      player.input.sprint = false;
      player.input.attack = false;
    }
    endAttack();
  }
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
menuRestartBtn.addEventListener('click', startGame);

// ==================== i18n Helper ====================
function getI18n(key: string): string {
  const lang = (document.documentElement.lang as 'zh-CN' | 'en') || 'zh-CN';
  const map: Record<string, Record<string, string>> = {
    'zh-CN': {
      victory: '🏆 胜利！',
      defeat: '💀 战败',
      winDesc: '敌方将领已被击败，战场归你所有！',
      loseDesc: '你倒在了战场上，再接再厉！',
      bow: '弓',
      sword: '剑',
      leader: '敌方将领',
      shoot: '射击',
      slash: '挥砍',
      sprint: '冲刺',
    },
    en: {
      victory: '🏆 Victory!',
      defeat: '💀 Defeated',
      winDesc: 'The enemy leader has fallen. The battlefield is yours!',
      loseDesc: 'You fell in battle. Try again!',
      bow: 'Bow',
      sword: 'Sword',
      leader: 'Enemy Leader',
      shoot: 'Shoot',
      slash: 'Slash',
      sprint: 'Sprint',
    },
  };
  return map[lang]?.[key] || map['zh-CN'][key];
}

// ==================== HUD ====================
function updateHUD(): void {
  if (!player) return;
  const hpRatio = player.unit.hp / player.unit.maxHp;
  hpFill.style.width = `${Math.max(0, hpRatio * 100)}%`;
  hpText.textContent = `${Math.ceil(player.unit.hp)}/${player.unit.maxHp}`;

  killsEl.textContent = String(state.kills);
  weaponEl.textContent = state.currentWeapon === WeaponType.Bow ? getI18n('bow') : getI18n('sword');

  const allies = allUnits.filter((u) => u.team === 'ally' && u.state !== UnitState.Dead).length;
  const enemies = allUnits.filter((u) => u.team === 'enemy' && u.state !== UnitState.Dead).length;
  alliesEl.textContent = String(allies);
  enemiesEl.textContent = String(enemies);

  if (enemyLeader && enemyLeader.state !== UnitState.Dead) {
    const leaderRatio = enemyLeader.hp / enemyLeader.maxHp;
    leaderHpFill.style.width = `${Math.max(0, leaderRatio * 100)}%`;
    leaderHpEl.textContent = `${getI18n('leader')} ${Math.ceil(enemyLeader.hp)}/${enemyLeader.maxHp}`;
  } else {
    leaderHpFill.style.width = '0%';
    leaderHpEl.textContent = getI18n('leader');
  }
}

function showMessage(text: string, duration = 2000): void {
  messageEl.textContent = text;
  messageEl.classList.remove('hidden');
  if ((messageEl as any)._timeout) window.clearTimeout((messageEl as any)._timeout);
  (messageEl as any)._timeout = window.setTimeout(() => {
    messageEl.classList.add('hidden');
  }, duration);
}

function updateForwardHudArrow(): void {
  if (!player || !forwardHudArrow) return;

  const unit = player.unit;
  const show = isMobileDevice() && Math.abs(player.velocity) > 0.5;
  if (!show) {
    forwardHudArrow.classList.add('hidden');
    return;
  }

  const target = unit.position.clone().add(unit.forward.clone().multiplyScalar(3));
  target.y += 2.2;
  const projected = target.clone().project(camera);

  if (projected.z > 1) {
    forwardHudArrow.classList.add('hidden');
    return;
  }

  const x = (projected.x * 0.5 + 0.5) * window.innerWidth;
  const y = (-projected.y * 0.5 + 0.5) * window.innerHeight;
  forwardHudArrow.classList.remove('hidden');
  forwardHudArrow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
}

// ==================== Main Loop ====================
const clock = new THREE.Clock();

function animate(): void {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);

  if (player && state.gameActive && !state.ended) {
    updatePlayer(player, dt, isDrawing);
    updatePlayerCamera(player, camera, dt);
    updateForwardIndicator(player);
    updateForwardHudArrow();

    // Update AI units
    for (const unit of allUnits) {
      if (unit === player.unit) continue;
      unit.update(dt, allUnits, player.unit);
      updateUnitFlashes(unit, dt);
    }
    updateUnitFlashes(player.unit, dt);

    updateArrows(scene, dt, allUnits);
    updateSwingEffects(scene, dt);

    // Bow draw / trajectory preview
    if (isDrawing) {
      applyAimAssist(dt);
      drawPower = clamp(drawPower + dt / 1.1, 0, 1);
      const origin = player.unit.position.clone().add(new THREE.Vector3(0, 2.6, 0));
      const dir = getAimDirection(player);
      const points = computeTrajectory(origin, dir, drawPower, getHorseVelocity(player));
      trajectoryLine.geometry.setFromPoints(points);
    } else {
      trajectoryLine.geometry.setFromPoints([]);
    }

    // Remove dead bodies after timer
    allUnits = removeDeadUnits(allUnits, dt);

    // Cumulative kill count so it doesn't drop when bodies despawn
    const currentEnemyDeaths = allUnits.filter((u) => u.team === 'enemy' && u.state === UnitState.Dead).length;
    state.kills = Math.max(state.kills, currentEnemyDeaths);

    // Morale collapse flag
    if (enemyLeader && enemyLeader.state === UnitState.Dead) {
      setEnemyLeaderDead(true);
    }
    checkEnemyMorale(allUnits);

    updateHUD();

    // Win / lose checks
    if (player.unit.hp <= 0) {
      endGame('lose');
    } else if (enemyLeader && enemyLeader.state === UnitState.Dead) {
      endGame('win');
    }
  }

  const time = clock.getElapsedTime();
  animateDecorations(scene, time);
  renderer.render(scene, camera);
}

// ==================== Diagnostics ====================
window.__THREE_GAME_DIAGNOSTICS__ = {
  state,
  arrows: () => arrows.length,
  units: () => allUnits.length,
  allies: () => allUnits.filter((u) => u.team === 'ally' && u.state !== UnitState.Dead).length,
  enemies: () => allUnits.filter((u) => u.team === 'enemy' && u.state !== UnitState.Dead).length,
};

animate();
