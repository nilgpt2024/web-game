import * as THREE from 'three';
import { Unit, UnitState, Team } from './types';
import { BATTLEFIELD } from './config';
import { distance2D, angle2D, rotateToward, vectorFromAngle, clamp, randRange } from './utils';
import { swordAttack } from './weapons';

export let enemyLeaderDead = false;
let enemyMoraleBroken = false;
let initialEnemyCount = 30;

export function resetEnemyLeaderDead(): void {
  enemyLeaderDead = false;
}

export function setEnemyLeaderDead(value: boolean): void {
  enemyLeaderDead = value;
}

export function setEnemyArmySize(n: number): void {
  initialEnemyCount = Math.max(1, n);
  enemyMoraleBroken = false;
}

export function checkEnemyMorale(allUnits: Unit[]): void {
  let alive = 0;
  for (const u of allUnits) {
    if (u.team === 'enemy' && u.state !== UnitState.Dead) alive++;
  }
  if (alive <= Math.max(2, initialEnemyCount * 0.3)) {
    enemyMoraleBroken = true;
  }
}

export function updateUnitAI(unit: Unit, dt: number, allUnits: Unit[], player: Unit | null): void {
  if (unit.state === UnitState.Dead) return;

  unit.stateTimer -= dt;
  unit.weaponCooldown = Math.max(0, unit.weaponCooldown - dt);

  // Morale collapse
  if (unit.team === 'enemy' && enemyLeaderDead) {
    setState(unit, UnitState.Flee);
  }

  // Routing when the army is badly depleted
  if (unit.team === 'enemy' && enemyMoraleBroken && !unit.stats.isLeader) {
    setState(unit, UnitState.Flee);
  }

  // Honor guards stay near leader
  const guardTarget = (unit as any).guardTarget as Unit | undefined;
  if (guardTarget && !guardTarget.isPlayer && guardTarget.state !== UnitState.Dead) {
    const distToLeader = distance2D(unit.position, guardTarget.position);
    if (distToLeader > BATTLEFIELD.leaderGuardRadius + 3) {
      moveToward(unit, guardTarget.position, dt, 0.7);
    } else {
      findNearestEnemyAndAttack(unit, allUnits, dt);
    }
    return;
  }

  switch (unit.state) {
    case UnitState.Idle:
      unit.target = findNearestEnemy(unit, allUnits);
      if (unit.target) {
        setState(unit, unit.stats.isCavalry ? UnitState.Charge : UnitState.MoveToTarget);
      }
      break;
    case UnitState.MoveToTarget:
      if (!unit.target || unit.target.state === UnitState.Dead) {
        unit.target = findNearestEnemy(unit, allUnits);
      }
      if (unit.target) {
        moveToward(unit, unit.target.position, dt, 1.0);
        if (distance2D(unit.position, unit.target.position) <= unit.stats.attackRange) {
          setState(unit, UnitState.Attack);
        }
      }
      break;
    case UnitState.Charge:
      if (!unit.target || unit.target.state === UnitState.Dead) {
        unit.target = findNearestEnemy(unit, allUnits);
      }
      if (unit.target) {
        moveToward(unit, unit.target.position, dt, 1.4);
        if (distance2D(unit.position, unit.target.position) <= unit.stats.attackRange + 1) {
          swordAttack(unit, allUnits, unit.mesh.parent as THREE.Scene);
          setState(unit, UnitState.Circle);
          unit.stateTimer = randRange(2, 4);
        }
      }
      break;
    case UnitState.Circle:
      if (!unit.target || unit.target.state === UnitState.Dead) {
        unit.target = findNearestEnemy(unit, allUnits);
        setState(unit, UnitState.Charge);
        break;
      }
      circleTarget(unit, unit.target, dt);
      if (distance2D(unit.position, unit.target.position) <= unit.stats.attackRange) {
        swordAttack(unit, allUnits, unit.mesh.parent as THREE.Scene);
      }
      if (unit.stateTimer <= 0) {
        setState(unit, UnitState.Charge);
      }
      break;
    case UnitState.Attack:
      if (!unit.target || unit.target.state === UnitState.Dead) {
        unit.target = findNearestEnemy(unit, allUnits);
        setState(unit, UnitState.MoveToTarget);
        break;
      }
      faceTarget(unit, unit.target.position, dt);
      if (distance2D(unit.position, unit.target.position) <= unit.stats.attackRange) {
        swordAttack(unit, allUnits, unit.mesh.parent as THREE.Scene);
      } else {
        setState(unit, UnitState.MoveToTarget);
      }
      break;
    case UnitState.Flee:
      fleeFromEnemies(unit, allUnits, dt);
      if (unit.stateTimer <= 0 && !enemyLeaderDead && !enemyMoraleBroken) {
        setState(unit, UnitState.Idle);
      }
      break;
    case UnitState.Form:
      if (unit.stats.isLeader) {
        const targetZ = unit.team === 'ally' ? BATTLEFIELD.enemySpawnZ : BATTLEFIELD.playerSpawnZ;
        const targetPos = new THREE.Vector3(0, 0, targetZ);
        const speedMult = BATTLEFIELD.formationAdvanceSpeed / unit.stats.speed;
        moveToward(unit, targetPos, dt, speedMult);
      } else if (unit.formationLeader && unit.formationLeader.state !== UnitState.Dead) {
        const leader = unit.formationLeader;
        const offset = unit.formationOffset!;
        const cos = Math.cos(leader.mesh.rotation.y);
        const sin = Math.sin(leader.mesh.rotation.y);
        const rotatedOffset = new THREE.Vector3(
          offset.x * cos - offset.z * sin,
          0,
          offset.x * sin + offset.z * cos
        );
        const targetPos = leader.position.clone().add(rotatedOffset);
        const dist = distance2D(unit.position, targetPos);
        moveToward(unit, targetPos, dt, clamp(dist / 5, 0.3, 1.1));
      } else {
        setState(unit, UnitState.Idle);
        break;
      }

      {
        const nearest = findNearestEnemy(unit, allUnits);
        if (nearest && distance2D(unit.position, nearest.position) <= BATTLEFIELD.formationEngageRange) {
          setState(unit, unit.stats.isCavalry ? UnitState.Charge : UnitState.MoveToTarget);
        }
      }
      break;
  }

  separateUnits(unit, allUnits, dt);
  keepInBounds(unit, dt);
}

function setState(unit: Unit, state: UnitState): void {
  unit.state = state;
  unit.stateTimer = randRange(1.5, 3.5);
  if (state === UnitState.Flee) unit.stateTimer = randRange(4, 7);
}

export function findNearestEnemy(unit: Unit, allUnits: Unit[]): Unit | null {
  let best: Unit | null = null;
  let bestDist = Infinity;
  for (const other of allUnits) {
    if (other.team === unit.team || other.state === UnitState.Dead) continue;
    // Allies should never target the player
    if (other.isPlayer && unit.team === 'ally') continue;
    const d = distance2D(unit.position, other.position);
    if (d < bestDist) {
      bestDist = d;
      best = other;
    }
  }
  return best;
}

function findNearestEnemyAndAttack(unit: Unit, allUnits: Unit[], dt: number): void {
  const enemy = findNearestEnemy(unit, allUnits);
  if (!enemy) return;
  const dist = distance2D(unit.position, enemy.position);
  if (dist <= unit.stats.attackRange) {
    faceTarget(unit, enemy.position, dt);
    swordAttack(unit, allUnits, unit.mesh.parent as THREE.Scene);
  } else {
    moveToward(unit, enemy.position, dt, 1.0);
  }
}

function moveToward(unit: Unit, targetPos: THREE.Vector3, dt: number, speedMultiplier: number): void {
  const targetAngle = angle2D(unit.position, targetPos);
  unit.mesh.rotation.y = rotateToward(unit.mesh.rotation.y, targetAngle, unit.stats.turnSpeed * dt);
  const forward = vectorFromAngle(unit.mesh.rotation.y);
  unit.forward.copy(forward);

  const targetSpeed = unit.stats.speed * speedMultiplier * (1 - unit.legWounds * 0.15);
  unit.velocity = THREE.MathUtils.lerp(unit.velocity, targetSpeed, 4 * dt);

  unit.position.add(forward.multiplyScalar(unit.velocity * dt));
}

function circleTarget(unit: Unit, target: Unit, dt: number): void {
  const radius = Math.max(unit.stats.attackRange + 1, 8);
  const angleToTarget = angle2D(unit.position, target.position);
  const circleAngle = angleToTarget + dt * unit.stats.speed * 0.12;

  const targetPos = new THREE.Vector3(
    target.position.x + Math.sin(circleAngle) * radius,
    target.position.y,
    target.position.z + Math.cos(circleAngle) * radius
  );

  const desiredAngle = angle2D(unit.position, targetPos);
  unit.mesh.rotation.y = rotateToward(unit.mesh.rotation.y, desiredAngle, unit.stats.turnSpeed * dt);
  unit.forward.copy(vectorFromAngle(unit.mesh.rotation.y));

  unit.velocity = THREE.MathUtils.lerp(unit.velocity, unit.stats.speed * 0.7, 4 * dt);
  unit.position.add(unit.forward.clone().multiplyScalar(unit.velocity * dt));
}

function faceTarget(unit: Unit, targetPos: THREE.Vector3, dt: number): void {
  const targetAngle = angle2D(unit.position, targetPos);
  unit.mesh.rotation.y = rotateToward(unit.mesh.rotation.y, targetAngle, unit.stats.turnSpeed * dt);
  unit.forward.copy(vectorFromAngle(unit.mesh.rotation.y));
  unit.velocity = THREE.MathUtils.lerp(unit.velocity, 0, 6 * dt);
}

function fleeFromEnemies(unit: Unit, allUnits: Unit[], dt: number): void {
  let avgEnemyPos = new THREE.Vector3();
  let count = 0;
  for (const other of allUnits) {
    if (other.team === unit.team || other.state === UnitState.Dead) continue;
    const d = distance2D(unit.position, other.position);
    if (d < 40) {
      avgEnemyPos.add(other.position);
      count++;
    }
  }

  if (count > 0) {
    avgEnemyPos.divideScalar(count);
    const fleeDir = new THREE.Vector3().subVectors(unit.position, avgEnemyPos);
    fleeDir.y = 0;
    fleeDir.normalize();
    const fleeAngle = Math.atan2(fleeDir.x, fleeDir.z);
    unit.mesh.rotation.y = rotateToward(unit.mesh.rotation.y, fleeAngle, unit.stats.turnSpeed * dt);
    unit.forward.copy(vectorFromAngle(unit.mesh.rotation.y));
  } else {
    // Flee toward own spawn edge
    const fleeAngle = unit.team === 'ally' ? Math.PI / 2 : -Math.PI / 2;
    unit.mesh.rotation.y = rotateToward(unit.mesh.rotation.y, fleeAngle, unit.stats.turnSpeed * dt);
    unit.forward.copy(vectorFromAngle(unit.mesh.rotation.y));
  }

  const targetSpeed = unit.stats.speed * 1.3 * (1 - unit.legWounds * 0.15);
  unit.velocity = THREE.MathUtils.lerp(unit.velocity, targetSpeed, 3 * dt);
  unit.position.add(unit.forward.clone().multiplyScalar(unit.velocity * dt));
}

function separateUnits(unit: Unit, allUnits: Unit[], dt: number): void {
  const push = new THREE.Vector3();
  for (const other of allUnits) {
    if (other === unit || other.state === UnitState.Dead) continue;
    const d = distance2D(unit.position, other.position);
    if (d < 1.8) {
      const away = new THREE.Vector3().subVectors(unit.position, other.position);
      away.y = 0;
      if (away.lengthSq() > 0.001) {
        away.normalize().multiplyScalar((1.8 - d) * 3);
        push.add(away);
      }
    }
  }
  unit.position.add(push.multiplyScalar(dt));
}

function keepInBounds(unit: Unit, dt: number): void {
  const limit = BATTLEFIELD.boundary;
  if (unit.position.x < -limit) unit.position.x = -limit;
  if (unit.position.x > limit) unit.position.x = limit;
  if (unit.position.z < -limit) unit.position.z = -limit;
  if (unit.position.z > limit) unit.position.z = limit;
}
