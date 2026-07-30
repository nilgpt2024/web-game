import * as THREE from 'three';
import { WEAPONS } from './config';
import { Unit, Team, ArrowData } from './types';
import { alertUnit } from './units';
import { getTerrainHeight, distance2D, angle2D, rotateToward, vectorFromAngle, Y_AXIS } from './utils';

export const arrows: ArrowData[] = [];

export function createArrowMesh(): THREE.Group {
  const group = new THREE.Group();

  const shaftGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.9, 8);
  const shaftMat = new THREE.MeshStandardMaterial({ color: 0x8d6e63 });
  const shaft = new THREE.Mesh(shaftGeom, shaftMat);
  shaft.rotation.x = Math.PI / 2;
  shaft.castShadow = true;
  group.add(shaft);

  const tipGeom = new THREE.ConeGeometry(0.045, 0.14, 8);
  const tipMat = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.6, roughness: 0.4 });
  const tip = new THREE.Mesh(tipGeom, tipMat);
  tip.rotation.x = -Math.PI / 2;
  tip.position.z = -0.52;
  tip.castShadow = true;
  group.add(tip);

  const fletchingGeom = new THREE.BoxGeometry(0.08, 0.01, 0.14);
  const fletchingMat = new THREE.MeshStandardMaterial({ color: 0xe53935 });
  const fletching = new THREE.Mesh(fletchingGeom, fletchingMat);
  fletching.position.z = 0.42;
  group.add(fletching);

  return group;
}

export function spawnArrow(
  origin: THREE.Vector3,
  direction: THREE.Vector3,
  power: number,
  horseVelocity: THREE.Vector3,
  team: Team
): void {
  const mesh = createArrowMesh();
  mesh.position.copy(origin);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), direction.clone().normalize());

  const speed = WEAPONS.bow.minPower + power * (WEAPONS.bow.maxPower - WEAPONS.bow.minPower);
  const velocity = direction.clone().normalize().multiplyScalar(speed);
  velocity.add(horseVelocity.clone().multiplyScalar(WEAPONS.bow.horseVelocityFactor));

  arrows.push({
    mesh,
    velocity,
    active: true,
    stuck: false,
    flightTime: 0,
    team,
    power,
  });

  if (arrows.length > WEAPONS.bow.maxArrows) {
    const old = arrows.shift();
    if (old) {
      if (old.mesh.parent) old.mesh.parent.remove(old.mesh);
    }
  }
}

export function clearArrows(scene: THREE.Scene): void {
  arrows.forEach((a) => {
    if (a.mesh.parent) a.mesh.parent.remove(a.mesh);
  });
  arrows.length = 0;
}

export function updateArrows(scene: THREE.Scene, dt: number, allUnits: Unit[]): void {
  for (const arrow of arrows) {
    if (!arrow.active || arrow.stuck) continue;
    arrow.flightTime += dt;

    arrow.velocity.y -= WEAPONS.bow.gravity * dt;

    const dir = arrow.velocity.clone().normalize();
    arrow.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), dir);
    arrow.mesh.position.add(arrow.velocity.clone().multiplyScalar(dt));

    // Ground collision
    if (arrow.mesh.position.y <= getTerrainHeight(arrow.mesh.position.x, arrow.mesh.position.z)) {
      arrow.active = false;
      arrow.velocity.set(0, 0, 0);
      arrow.mesh.position.y = getTerrainHeight(arrow.mesh.position.x, arrow.mesh.position.z) + 0.05;
      continue;
    }

    // Out of bounds
    if (Math.abs(arrow.mesh.position.x) > 220 || Math.abs(arrow.mesh.position.z) > 220) {
      arrow.active = false;
      arrow.velocity.set(0, 0, 0);
      continue;
    }

    // Unit collision
    const hit = checkArrowUnitCollision(arrow, allUnits);
    if (hit) {
      arrow.active = false;
      arrow.stuck = true;
      arrow.velocity.set(0, 0, 0);
      hit.unit.mesh.attach(arrow.mesh);
      onArrowHitUnit(arrow, hit.unit, hit.zone, hit.point, allUnits);
    }
  }
}

interface HitResult { unit: Unit; zone: 'head' | 'body' | 'horse'; point: THREE.Vector3; }

function checkArrowUnitCollision(arrow: ArrowData, allUnits: Unit[]): HitResult | null {
  let closest: HitResult | null = null;
  let closestDist = Infinity;

  for (const unit of allUnits) {
      if (unit.state === 'dead' || unit.team === arrow.team) continue;
      // Player arrows should not harm allied troops
      if (arrow.team === 'player' && unit.team === 'ally') continue;
      const dist = distance2D(arrow.mesh.position, unit.position);
    if (dist > 3.0) continue;

    // Ray from previous position to current
    const prev = arrow.mesh.position.clone().sub(arrow.velocity.clone().multiplyScalar(0.02));
    const ray = new THREE.Ray(prev, arrow.velocity.clone().normalize());

    // Check against hit spheres
    const zones: { name: 'head' | 'body' | 'horse'; center: THREE.Vector3; radius: number }[] = [];
    const worldPos = new THREE.Vector3();

    if (unit.stats.isCavalry) {
      unit.horse?.getWorldPosition(worldPos);
      zones.push({ name: 'horse', center: worldPos.clone().add(new THREE.Vector3(0, 1.0, 0)), radius: 1.1 });
    }
    unit.mesh.getWorldPosition(worldPos);
    zones.push({ name: 'body', center: worldPos.clone().add(new THREE.Vector3(0, 1.4, 0)), radius: unit.stats.isLeader ? 0.8 : 0.55 });
    zones.push({ name: 'head', center: worldPos.clone().add(new THREE.Vector3(0, 2.1, 0)), radius: 0.35 });

    for (const zone of zones) {
      const sphere = new THREE.Sphere(zone.center, zone.radius);
      const hitPoint = new THREE.Vector3();
      if (ray.intersectSphere(sphere, hitPoint)) {
        const d = hitPoint.distanceTo(prev);
        if (d < closestDist) {
          closestDist = d;
          closest = { unit, zone: zone.name, point: hitPoint };
        }
      }
    }
  }

  return closest;
}

function onArrowHitUnit(arrow: ArrowData, unit: Unit, zone: 'head' | 'body' | 'horse', point: THREE.Vector3, allUnits: Unit[]): void {
  let multiplier = WEAPONS.bow.bodyMultiplier;
  if (zone === 'head') multiplier = WEAPONS.bow.headMultiplier;
  if (zone === 'horse') multiplier = WEAPONS.bow.horseMultiplier;

  // Damage scales with how hard the bow was drawn
  const damage = (WEAPONS.bow.minDamage + arrow.power * WEAPONS.bow.powerDamage) * multiplier;
  const killed = unit.takeDamage(damage, arrow.team === 'player' ? window.__playerUnit || null : null);

  // Alert nearby enemies on miss or wound
  if (!killed) {
    for (const other of allUnits) {
      if (other.team !== unit.team || other.state === 'dead') continue;
      if (distance2D(other.position, point) < 15) {
        alertUnit(other, point, allUnits);
      }
    }
  }
}

export function swordAttack(attacker: Unit, allUnits: Unit[], scene: THREE.Scene): void {
  if (attacker.weaponCooldown > 0) return;
  attacker.weaponCooldown = WEAPONS.sword.cooldown;

  playSwordSwing(attacker, scene);

  const range = WEAPONS.sword.range;
  const halfArc = WEAPONS.sword.arcAngle / 2;
  const attackerForward = vectorFromAngle(attacker.mesh.rotation.y);

  for (const target of allUnits) {
    if (target.team === attacker.team || target.state === 'dead') continue;
    // Player should not harm allied troops
    if (attacker.isPlayer && target.team === 'ally') continue;
    const toTarget = new THREE.Vector3().subVectors(target.position, attacker.position);
    toTarget.y = 0;
    const dist = toTarget.length();
    if (dist > range) continue;
    const angle = attackerForward.angleTo(toTarget);
    if (angle > halfArc) continue;

    const damage = WEAPONS.sword.damage * (attacker.stats.isCavalry && attacker.velocity > 8 ? 1.4 : 1);
    target.takeDamage(damage, attacker);
  }
}

const swingEffects = new Map<number, THREE.Mesh>();

function playSwordSwing(attacker: Unit, scene: THREE.Scene): void {
  const id = attacker.id;
  let effect = swingEffects.get(id);
  if (!effect) {
    const geom = new THREE.RingGeometry(0.5, 0.55, 32, 1, -Math.PI / 4, Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6, side: THREE.DoubleSide });
    effect = new THREE.Mesh(geom, mat);
    effect.rotation.x = -Math.PI / 2;
    swingEffects.set(id, effect);
  }
  effect.position.copy(attacker.position).add(new THREE.Vector3(0, 1.8, 0));
  effect.rotation.z = -attacker.mesh.rotation.y;
  effect.scale.setScalar(1);
  (effect.material as THREE.MeshBasicMaterial).opacity = 0.6;
  scene.add(effect);

  // Animate fade in main loop via userData
  (effect as any).life = WEAPONS.sword.swingDuration;
  (effect as any).isSwingEffect = true;
}

export function updateSwingEffects(scene: THREE.Scene, dt: number): void {
  scene.traverse((obj) => {
    if ((obj as any).isSwingEffect) {
      const mesh = obj as THREE.Mesh;
      (mesh as any).life -= dt;
      (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, (mesh as any).life / WEAPONS.sword.swingDuration) * 0.6;
      mesh.scale.addScalar(3 * dt);
      if ((mesh as any).life <= 0) {
        scene.remove(mesh);
      }
    }
  });
}

export function createTrajectoryLine(): THREE.Line {
  const trajectoryMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5 });
  const trajectoryGeom = new THREE.BufferGeometry();
  return new THREE.Line(trajectoryGeom, trajectoryMat);
}

export function computeTrajectory(
  origin: THREE.Vector3,
  direction: THREE.Vector3,
  power: number,
  horseVelocity: THREE.Vector3
): THREE.Vector3[] {
  const speed = WEAPONS.bow.minPower + power * (WEAPONS.bow.maxPower - WEAPONS.bow.minPower);
  const vel = direction.clone().normalize().multiplyScalar(speed);
  vel.add(horseVelocity.clone().multiplyScalar(WEAPONS.bow.horseVelocityFactor));
  const pos = origin.clone();
  const points: THREE.Vector3[] = [];
  const dt = 0.03;

  for (let i = 0; i < 80; i++) {
    vel.y -= WEAPONS.bow.gravity * dt;
    pos.add(vel.clone().multiplyScalar(dt));
    points.push(pos.clone());
    if (pos.y < getTerrainHeight(pos.x, pos.z)) break;
  }
  return points;
}
