import * as THREE from 'three';

export const BATTLEFIELD = {
  size: 400,
  playerSpawnZ: 60,
  enemySpawnZ: -60,
  leaderGuardRadius: 10,
  infantryCount: { ally: 12, enemy: 11 },
  cavalryCount: { ally: 4, enemy: 4 },
  boundary: 180,
  formationEngageRange: 40,
  formationAdvanceSpeed: 5,
};

export const PLAYER = {
  maxHp: 220,
  horseSpeed: { reverseMax: 4, max: 22, accel: 12, decel: 10 },
  sprintMultiplier: 1.35,
  turnSpeedBase: 2.4,
  turnSpeedMin: 0.9,
  turnSmoothing: 9,
  sprintTurnPenalty: 0.8,
  spawnPos: new THREE.Vector3(0, 0, 60),
  camera: {
    basePitch: 0.1,
    offset: new THREE.Vector3(0, 4.6, 9),
    mobileOffset: new THREE.Vector3(0, 5.6, 11.5),
    yawLambda: 9,
    pitchLambda: 10,
    posLambda: 7,
    recenterYaw: 2.2,
    recenterPitch: 2.6,
    mouseSens: 0.0024,
    lookClampYaw: 1.4,
    lookClampPitch: 0.55,
  },
  touch: {
    joystickDeadZone: 0.18,
    lookSensitivity: 0.004,
    autoSprintThreshold: 0.9,
    aimAssist: {
      maxDistance: 55,
      coneAngle: 0.22,
      strength: 0.25,
      targetOffsetY: 2.0,
    },
  },
  mobile: {
    speedMultiplier: 0.85,
    turnSmoothing: 12,
    cameraFollowLerp: 4.5,
    cameraFollowDelay: 0.12,
    recenterTimeout: 1.2,
  },
  forwardIndicator: {
    enabled: true,
    color: 0xfacc15,
    size: 1.6,
    offsetY: 0.15,
    opacity: 0.75,
  },
};

export const WEAPONS = {
  bow: {
    minPower: 18,
    maxPower: 55,
    gravity: 9.8,
    maxArrows: 30,
    horseVelocityFactor: 0.6,
    headMultiplier: 1.5,
    bodyMultiplier: 1.0,
    horseMultiplier: 0.7,
    drawSlowSpeed: 0.4,
    minDamage: 38,
    powerDamage: 70,
  },
  sword: {
    range: 5.5,
    arcAngle: Math.PI / 2.2,
    damage: 45,
    cooldown: 0.85,
    swingDuration: 0.45,
  },
};

export const COLORS = {
  ally: 0x2563eb,
  enemy: 0xdc2626,
  leaderAccent: 0xfacc15,
  ground: 0x8b9a46,
  groundDark: 0x6b7a36,
  sky: 0xd6c6a8,
  fog: 0xd6c6a8,
  treeTrunk: 0x4e342e,
  treeLeaves: 0x3d5c2d,
  deadTree: 0x5d4037,
  rock: 0x757575,
  campfire: 0xff6d00,
  horse: 0x5d4037,
  playerArmor: 0x3b82f6,
  enemyArmor: 0xb91c1c,
};

export const FORMATION = {
  infantrySpacing: 2.8,
  cavalrySpacing: 5,
  rowSpacing: 3,
};

export const UNIT_CONFIGS = {
  infantry: {
    maxHp: 80,
    speed: 5.5,
    turnSpeed: 2.5,
    attackRange: 2.8,
    attackDamage: 12,
    attackCooldown: 1.2,
    armor: 0.15,
    isCavalry: false,
    isLeader: false,
  },
  cavalry: {
    maxHp: 120,
    speed: 14,
    turnSpeed: 1.8,
    attackRange: 3.5,
    attackDamage: 18,
    attackCooldown: 1.4,
    armor: 0.2,
    isCavalry: true,
    isLeader: false,
  },
  leader: {
    maxHp: 320,
    speed: 15,
    turnSpeed: 1.6,
    attackRange: 4.2,
    attackDamage: 32,
    attackCooldown: 1.3,
    armor: 0.3,
    isCavalry: true,
    isLeader: true,
  },
};
