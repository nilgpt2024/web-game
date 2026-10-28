// Shared tuning + roster. Every module reads from here; do not duplicate these values.

export const GAME_TITLE = 'Turbo Kart Rally';

export const RACE = {
  laps: 3,
  racers: 8,
  countdownSeconds: 3,
};

// World scale: 1 unit = 1 meter. Y is up. Track lies roughly in the XZ plane.
export const PHYSICS = {
  gravity: 38,
  kartRadius: 1.3,          // collision radius (kart vs kart / wall / items)
  maxSpeed: 38,             // base top speed on road (units/s) before stat modifiers
  reverseMaxSpeed: 12,
  accel: 22,
  brakeDecel: 45,
  coastDecel: 8,
  offroadMaxSpeedFactor: 0.45,
  boostSpeedBonus: 16,      // added to max speed while boosting
  miniTurboTimes: [0.55, 0.45, 0.5], // blue, orange, purple boost durations (s)
  driftChargeThresholds: [0.9, 1.9, 3.0], // seconds of drifting needed to reach each level
  mushroomBoostTime: 1.3,
  starTime: 7.5,
  spinOutTime: 1.1,
  tumbleTime: 1.6,
  lightningShrinkTime: 5,
};

// stats are 1..5. speed -> top speed, accel -> acceleration, handling -> turn rate/drift,
// weight -> bump resolution (heavier pushes lighter).
export const CHARACTERS = [
  { id: 'blaze',  name: 'Blaze',  color: 0xe53935, accent: 0xffffff, skin: 0xffcc99, hat: 'cap',     stats: { speed: 3, accel: 3, handling: 3, weight: 3 } },
  { id: 'zippy',  name: 'Zippy',  color: 0x43a047, accent: 0xffffff, skin: 0xffcc99, hat: 'cap',     stats: { speed: 3, accel: 4, handling: 3, weight: 2 } },
  { id: 'bella',  name: 'Bella',  color: 0xf06292, accent: 0xfff176, skin: 0xffe0bd, hat: 'crown',   stats: { speed: 2, accel: 4, handling: 5, weight: 2 } },
  { id: 'toadly', name: 'Toadly', color: 0x1e88e5, accent: 0xffffff, skin: 0xffe0bd, hat: 'mushroom',stats: { speed: 2, accel: 5, handling: 4, weight: 1 } },
  { id: 'rex',    name: 'Rex',    color: 0x2e7d32, accent: 0xff8f00, skin: 0x9ccc65, hat: 'horns',   stats: { speed: 5, accel: 1, handling: 2, weight: 5 } },
  { id: 'grumbo', name: 'Grumbo', color: 0xfdd835, accent: 0x6a1b9a, skin: 0xffcc99, hat: 'cap',     stats: { speed: 4, accel: 2, handling: 2, weight: 4 } },
  { id: 'koopz',  name: 'Koopz',  color: 0x00acc1, accent: 0xfff9c4, skin: 0xaed581, hat: 'shell',   stats: { speed: 3, accel: 3, handling: 4, weight: 2 } },
  { id: 'dotty',  name: 'Dotty',  color: 0x8e24aa, accent: 0xffeb3b, skin: 0xffe0bd, hat: 'bow',     stats: { speed: 2, accel: 4, handling: 4, weight: 1 } },
];

export const ITEMS = ['mushroom', 'triple_mushroom', 'banana', 'green_shell', 'red_shell', 'star', 'lightning', 'blue_shell'];

export const DIFFICULTY = {
  easy:   { aiSpeedFactor: 0.86, aiSkill: 0.55, rubberBand: 0.08 },
  normal: { aiSpeedFactor: 0.94, aiSkill: 0.75, rubberBand: 0.12 },
  hard:   { aiSpeedFactor: 1.00, aiSkill: 0.95, rubberBand: 0.16 },
};

export const KEYS = {
  accelerate: ['ArrowUp', 'KeyW'],
  brake: ['ArrowDown', 'KeyS'],
  left: ['ArrowLeft', 'KeyA'],
  right: ['ArrowRight', 'KeyD'],
  drift: ['Space', 'ShiftRight'],
  item: ['KeyE', 'ShiftLeft', 'KeyX'],
  lookBack: ['KeyC'],
  pause: ['Escape', 'KeyP'],
};
