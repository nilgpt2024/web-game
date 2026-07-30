import * as THREE from 'three';

export type Team = 'player' | 'ally' | 'enemy';

export enum UnitState {
  Idle = 'idle',
  MoveToTarget = 'move',
  Attack = 'attack',
  Charge = 'charge',
  Circle = 'circle',
  Flee = 'flee',
  Form = 'form',
  Dead = 'dead',
}

export enum WeaponType {
  Bow = 'bow',
  Sword = 'sword',
}

export interface UnitStats {
  maxHp: number;
  speed: number;
  turnSpeed: number;
  attackRange: number;
  attackDamage: number;
  attackCooldown: number;
  armor: number;
  isCavalry: boolean;
  isLeader: boolean;
}

export interface ArrowData {
  mesh: THREE.Group;
  velocity: THREE.Vector3;
  active: boolean;
  stuck: boolean;
  flightTime: number;
  team: Team;
  power: number;
}

export interface GameState {
  score: number;
  kills: number;
  shots: number;
  hits: number;
  playerHp: number;
  gameActive: boolean;
  roundActive: boolean;
  ended: boolean;
  result: 'win' | 'lose' | null;
  currentWeapon: WeaponType;
  isDrawing: boolean;
  drawStart: { x: number; y: number } | null;
  power: number;
  yaw: number;
  pitch: number;
}

export interface Unit {
  id: number;
  team: Team;
  stats: UnitStats;
  hp: number;
  maxHp: number;
  state: UnitState;
  position: THREE.Vector3;
  forward: THREE.Vector3;
  velocity: number;
  target: Unit | null;
  weaponCooldown: number;
  attackTimer: number;
  stateTimer: number;
  animTime: number;
  mesh: THREE.Group;
  rider?: THREE.Group;
  horse?: THREE.Group;
  deadTimer: number;
  isPlayer: boolean;
  legWounds: number;
  formationOffset?: THREE.Vector3;
  formationLeader?: Unit;
  update(dt: number, allUnits: Unit[], player: Unit | null): void;
  takeDamage(amount: number, attacker: Unit | null): boolean;
  destroy(): void;
}
