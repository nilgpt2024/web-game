import * as THREE from 'three';
import { PLAYER, COLORS, WEAPONS } from './config';
import { Unit, UnitState } from './types';
import { createUnit } from './units';
import { getTerrainHeight, clamp, rotateToward, Y_AXIS } from './utils';

function damp(a: number, b: number, lambda: number, dt: number): number {
  return THREE.MathUtils.lerp(a, b, 1 - Math.exp(-lambda * dt));
}

export interface PlayerController {
  unit: Unit;
  horseYaw: number; // horse heading (movement direction)
  camYaw: number; // smoothed actual camera yaw
  camPitch: number; // smoothed actual camera pitch
  lookYaw: number; // free-look offset yaw (decays to 0)
  lookPitch: number; // free-look offset pitch (decays to 0)
  lookIdle: number; // time since last look input (desktop recenter)
  lookActive: boolean; // touch look currently active (mobile)
  input: {
    move: number; // desktop: -1..1 (back/forward); mobile absolute: 0..1 (throttle)
    turn: number; // desktop: -1..1 (left/right); mobile absolute: ignored
    sprint: boolean;
    attack: boolean;
  };
  controlMode: 'relative' | 'absolute';
  targetYaw: number | null; // only used in absolute mode
  currentTurn: number;
  velocity: number;
  maxSpeedMod: number;
  forwardIndicator?: THREE.Mesh;
}

export function createPlayer(scene: THREE.Scene): PlayerController {
  const unit = createUnit(0, 'player', 'cavalry', PLAYER.spawnPos.x, PLAYER.spawnPos.z);
  unit.isPlayer = true;
  unit.hp = PLAYER.maxHp;
  unit.maxHp = PLAYER.maxHp;
  unit.stats.maxHp = PLAYER.maxHp;
  unit.stats.speed = PLAYER.horseSpeed.max;
  // Face the enemy at -Z
  unit.mesh.rotation.y = Math.PI;
  unit.forward.set(0, 0, -1);
  scene.add(unit.mesh);

  // Mark player rider visually
  const riderBody = unit.rider!.children[0] as THREE.Mesh;
  riderBody.material = new THREE.MeshStandardMaterial({ color: COLORS.playerArmor });
  const helmet = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.12, 0.32), new THREE.MeshStandardMaterial({ color: COLORS.leaderAccent }));
  helmet.position.y = 1.22;
  unit.rider!.add(helmet);

  // Mark player horse visually with a taller yellow crest plume and tail band
  if (unit.horse) {
    const plume = new THREE.Mesh(
      new THREE.ConeGeometry(0.11, 0.65, 6),
      new THREE.MeshStandardMaterial({ color: COLORS.leaderAccent })
    );
    plume.position.set(0, 2.55, -1.04);
    plume.rotation.x = -0.3;
    unit.horse.add(plume);

    const plumeGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 8, 8),
      new THREE.MeshBasicMaterial({ color: COLORS.leaderAccent })
    );
    plumeGlow.position.set(0, 0.38, 0);
    plume.add(plumeGlow);

    const tailBand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.07, 0.12, 6),
      new THREE.MeshStandardMaterial({ color: COLORS.leaderAccent })
    );
    tailBand.position.set(0, 1.35, 1.28);
    tailBand.rotation.x = 0.6;
    unit.horse.add(tailBand);
  }

  const isMobile = isMobileDevice();
  const player: PlayerController = {
    unit,
    horseYaw: Math.PI,
    camYaw: Math.PI,
    camPitch: PLAYER.camera.basePitch,
    lookYaw: 0,
    lookPitch: 0,
    lookIdle: 0,
    lookActive: false,
    input: { move: 0, turn: 0, sprint: false, attack: false },
    controlMode: isMobile ? 'absolute' : 'relative',
    targetYaw: null,
    currentTurn: 0,
    velocity: 0,
    maxSpeedMod: 1,
  };

  if (PLAYER.forwardIndicator.enabled) {
    player.forwardIndicator = createForwardIndicator();
    scene.add(player.forwardIndicator);
  }

  return player;
}

export function updatePlayer(player: PlayerController, dt: number, isDrawing: boolean): void {
  const unit = player.unit;
  if (unit.state === UnitState.Dead) return;

  // Slow down while drawing bow
  if (isDrawing) {
    player.maxSpeedMod = damp(player.maxSpeedMod, WEAPONS.bow.drawSlowSpeed, 6 * dt, dt);
  } else {
    player.maxSpeedMod = damp(player.maxSpeedMod, 1, 6 * dt, dt);
  }

  // ---- Steering ----
  if (player.controlMode === 'absolute' && player.targetYaw !== null) {
    // Mobile: joystick vector defines a world target heading; horse turns toward it
    const speedRatio = Math.abs(player.velocity) / PLAYER.horseSpeed.max;
    const turnAtSpeed = THREE.MathUtils.lerp(
      PLAYER.turnSpeedBase,
      PLAYER.turnSpeedMin,
      Math.pow(speedRatio, 0.8)
    );
    const sprintFactor = player.input.sprint ? PLAYER.sprintTurnPenalty : 1;
    const maxStep = (turnAtSpeed * sprintFactor);

    let diff = player.targetYaw - player.horseYaw;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    const step = clamp(diff, -maxStep, maxStep);
    player.currentTurn = damp(player.currentTurn, step, PLAYER.mobile.turnSmoothing, dt);
    player.horseYaw += player.currentTurn * dt;

    const throttle = Math.max(0, player.input.move);
    let targetSpeed = throttle * PLAYER.horseSpeed.max * PLAYER.mobile.speedMultiplier * player.maxSpeedMod;
    if (player.input.sprint && targetSpeed > 0) targetSpeed *= PLAYER.sprintMultiplier;
    const accel = targetSpeed > player.velocity ? PLAYER.horseSpeed.accel : PLAYER.horseSpeed.decel;
    player.velocity = damp(player.velocity, targetSpeed, accel, dt);
  } else {
    // Desktop: WASD throttle + steering relative to horse
    let targetSpeed = 0;
    if (player.input.move > 0) {
      targetSpeed = player.input.move * PLAYER.horseSpeed.max;
    } else if (player.input.move < 0) {
      targetSpeed = player.input.move * PLAYER.horseSpeed.reverseMax;
    }
    if (player.input.sprint && targetSpeed > 0) targetSpeed *= PLAYER.sprintMultiplier;
    targetSpeed *= player.maxSpeedMod;

    const accel = targetSpeed > player.velocity ? PLAYER.horseSpeed.accel : PLAYER.horseSpeed.decel;
    player.velocity = damp(player.velocity, targetSpeed, accel, dt);

    const speedRatio = Math.abs(player.velocity) / PLAYER.horseSpeed.max;
    const turnAtSpeed = THREE.MathUtils.lerp(
      PLAYER.turnSpeedBase,
      PLAYER.turnSpeedMin,
      Math.pow(speedRatio, 0.8)
    );
    const sprintFactor = player.input.sprint ? PLAYER.sprintTurnPenalty : 1;
    const targetTurn = player.input.turn * turnAtSpeed * sprintFactor;

    player.currentTurn = damp(player.currentTurn, targetTurn, PLAYER.turnSmoothing, dt);
    player.horseYaw += player.currentTurn * dt;
  }

  // Keep yaw in a sane range
  if (player.horseYaw > Math.PI) player.horseYaw -= Math.PI * 2;
  if (player.horseYaw < -Math.PI) player.horseYaw += Math.PI * 2;

  unit.mesh.rotation.y = player.horseYaw;
  unit.forward.set(Math.sin(player.horseYaw), 0, Math.cos(player.horseYaw));

  // Move
  const move = unit.forward.clone().multiplyScalar(player.velocity * dt);
  unit.position.add(move);

  // Boundary
  const limit = 185;
  unit.position.x = clamp(unit.position.x, -limit, limit);
  unit.position.z = clamp(unit.position.z, -limit, limit);

  unit.velocity = player.velocity;
  unit.position.y = getTerrainHeight(unit.position.x, unit.position.z);

  // Animate horse legs
  if (unit.horse && Math.abs(player.velocity) > 0.5) {
    unit.animTime += dt;
    const legs = unit.horse.children.filter((c) => {
      const mesh = c as THREE.Mesh;
      return mesh.geometry && mesh.geometry.type === 'CylinderGeometry';
    }) as THREE.Mesh[];
    const freq = Math.abs(player.velocity) * 0.5;
    legs.forEach((leg, i) => {
      leg.rotation.x = Math.sin(unit.animTime * freq + (i % 2 === 0 ? 0 : Math.PI)) * 0.5;
    });
  }
}

export function updatePlayerCamera(player: PlayerController, camera: THREE.PerspectiveCamera, dt: number): void {
  const cam = PLAYER.camera;
  const unit = player.unit;

  // Desired aim direction = horse heading + free-look offset
  const aimYaw = player.horseYaw + player.lookYaw;
  const aimPitch = cam.basePitch + player.lookPitch;

  // Recenter the free-look offset when the player is not actively looking
  const looking = player.lookActive || player.lookIdle > 0;
  if (!looking) {
    player.lookYaw = damp(player.lookYaw, 0, cam.recenterYaw, dt);
    player.lookPitch = damp(player.lookPitch, 0, cam.recenterPitch, dt);
  }
  if (player.lookIdle > 0) player.lookIdle -= dt;

  // Smooth the actual camera angles toward the desired aim
  player.camYaw = damp(player.camYaw, aimYaw, cam.yawLambda, dt);
  player.camPitch = clamp(damp(player.camPitch, aimPitch, cam.pitchLambda, dt), -0.1, cam.lookClampPitch);

  // Camera position sits behind the look direction (no roll -> stable)
  const forward = getAimDirection(player);
  const back = new THREE.Vector3(-Math.sin(player.camYaw), 0, -Math.cos(player.camYaw));
  const offset = player.controlMode === 'absolute' ? cam.mobileOffset : cam.offset;
  const idealPos = unit.position.clone().add(back.multiplyScalar(offset.z)).add(new THREE.Vector3(0, offset.y, 0));
  idealPos.y = Math.max(getTerrainHeight(idealPos.x, idealPos.z) + 0.5, idealPos.y);

  camera.position.x = damp(camera.position.x, idealPos.x, cam.posLambda, dt);
  camera.position.y = damp(camera.position.y, idealPos.y, cam.posLambda, dt);
  camera.position.z = damp(camera.position.z, idealPos.z, cam.posLambda, dt);

  // Look along the aim direction so the center crosshair matches the bow trajectory
  const lookTarget = camera.position.clone().add(forward.multiplyScalar(50));
  camera.up.set(0, 1, 0);
  camera.lookAt(lookTarget);
}

export function addLook(player: PlayerController, dx: number, dy: number): void {
  const sens = player.controlMode === 'absolute' ? PLAYER.touch.lookSensitivity : PLAYER.camera.mouseSens;
  player.lookYaw += dx * sens;
  player.lookPitch -= dy * sens;
  player.lookYaw = clamp(player.lookYaw, -PLAYER.camera.lookClampYaw, PLAYER.camera.lookClampYaw);
  player.lookPitch = clamp(player.lookPitch, -PLAYER.camera.lookClampPitch + PLAYER.camera.basePitch, PLAYER.camera.lookClampPitch);
  if (!isMobileDevice()) {
    player.lookIdle = 0.12;
  } else {
    player.lookActive = true;
  }
}

export function endLook(player: PlayerController): void {
  player.lookActive = false;
}

export function createForwardIndicator(): THREE.Mesh {
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.8);
  shape.lineTo(0.25, 0.2);
  shape.lineTo(0.08, 0.1);
  shape.lineTo(0.08, 0.6);
  shape.lineTo(-0.08, 0.6);
  shape.lineTo(-0.08, 0.1);
  shape.lineTo(-0.25, 0.2);
  shape.lineTo(0, -0.8);

  const geometry = new THREE.ShapeGeometry(shape);
  geometry.rotateX(-Math.PI / 2);

  const material = new THREE.MeshBasicMaterial({
    color: PLAYER.forwardIndicator.color,
    transparent: true,
    opacity: PLAYER.forwardIndicator.opacity,
    side: THREE.DoubleSide,
    depthTest: false,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.renderOrder = 999;
  return mesh;
}

export function updateForwardIndicator(player: PlayerController): void {
  const indicator = player.forwardIndicator;
  if (!indicator || !PLAYER.forwardIndicator.enabled) return;

  const unit = player.unit;
  const basePos = unit.position.clone().add(unit.forward.clone().multiplyScalar(2.2));
  basePos.y = getTerrainHeight(basePos.x, basePos.z) + PLAYER.forwardIndicator.offsetY;
  indicator.position.copy(basePos);
  indicator.rotation.set(0, unit.mesh.rotation.y, 0);

  // Pulse opacity slightly when moving fast for better feedback
  const speedRatio = Math.abs(player.velocity) / PLAYER.horseSpeed.max;
  const pulse = 1 + speedRatio * 0.25;
  const opacity = PLAYER.forwardIndicator.opacity * pulse;
  (indicator.material as THREE.MeshBasicMaterial).opacity = Math.min(opacity, 1);
}

export function getAimDirection(player: PlayerController): THREE.Vector3 {
  const dir = new THREE.Vector3(Math.sin(player.camYaw), 0, Math.cos(player.camYaw));
  dir.applyAxisAngle(new THREE.Vector3(1, 0, 0), player.camPitch);
  return dir.normalize();
}

export function getHorseVelocity(player: PlayerController): THREE.Vector3 {
  return player.unit.forward.clone().multiplyScalar(player.velocity);
}

export function isMobileDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
