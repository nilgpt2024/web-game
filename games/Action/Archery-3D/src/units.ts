import * as THREE from 'three';
import { COLORS, UNIT_CONFIGS, BATTLEFIELD } from './config';
import { Unit, UnitState, Team } from './types';
import { getTerrainHeight, distance2D, angle2D, rotateToward, vectorFromAngle, clamp, randRange } from './utils';
import { updateUnitAI } from './ai';

export function createUnit(id: number, team: Team, type: 'infantry' | 'cavalry' | 'leader', x: number, z: number): Unit {
  const config = UNIT_CONFIGS[type];
  const isCavalry = config.isCavalry;

  const group = new THREE.Group();
  group.position.set(x, getTerrainHeight(x, z), z);

  const armorColor = team === 'ally' ? COLORS.ally : team === 'enemy' ? COLORS.enemy : COLORS.playerArmor;
  const accentColor = config.isLeader ? COLORS.leaderAccent : armorColor;

  let horse: THREE.Group | undefined;
  if (isCavalry) {
    horse = createHorseMesh(team);
    group.add(horse);
  }

  const rider = createRiderMesh(team, config.isLeader);
  rider.position.y = isCavalry ? 1.8 : 0;
  group.add(rider);

  // Weapon model
  const weaponGroup = new THREE.Group();
  if (config.isLeader) {
    // Great axe
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.6, 6), new THREE.MeshStandardMaterial({ color: 0x5d4037 }));
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.6, 0.08), new THREE.MeshStandardMaterial({ color: 0x90a4ae, metalness: 0.7, roughness: 0.4 }));
    blade.position.y = 0.6;
    weaponGroup.add(handle, blade);
  } else if (isCavalry) {
    // Lance
    const lance = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 2.2, 6), new THREE.MeshStandardMaterial({ color: 0x5d4037 }));
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.25, 6), new THREE.MeshStandardMaterial({ color: 0x90a4ae, metalness: 0.7 }));
    tip.position.y = 1.1;
    weaponGroup.add(lance, tip);
  } else {
    // Sword and shield
    const sword = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.9, 0.03), new THREE.MeshStandardMaterial({ color: 0x90a4ae, metalness: 0.7 }));
    sword.position.x = 0.35;
    sword.position.y = 0.2;
    const shield = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.06, 8), new THREE.MeshStandardMaterial({ color: armorColor }));
    shield.rotation.x = Math.PI / 2;
    shield.position.set(-0.35, 0.2, 0.25);
    weaponGroup.add(sword, shield);
  }
  weaponGroup.position.set(0.35, isCavalry ? 1.6 : 1.1, 0.3);
  weaponGroup.rotation.x = -0.2;
  group.add(weaponGroup);

  // Health bar
  const hpBg = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.15), new THREE.MeshBasicMaterial({ color: 0x000000 }));
  const hpFill = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.15), new THREE.MeshBasicMaterial({ color: team === 'ally' ? 0x2563eb : 0xdc2626 }));
  hpBg.position.y = (isCavalry ? 2.8 : 2.0);
  hpFill.position.y = hpBg.position.y;
  hpFill.position.z = 0.01;
  hpBg.lookAt(0, hpBg.position.y, 10);
  hpFill.lookAt(0, hpFill.position.y, 10);
  group.add(hpBg, hpFill);

  const unit: Unit = {
    id,
    team,
    stats: config,
    hp: config.maxHp,
    maxHp: config.maxHp,
    state: UnitState.Idle,
    position: group.position,
    forward: new THREE.Vector3(0, 0, team === 'ally' ? -1 : 1),
    velocity: 0,
    target: null,
    weaponCooldown: 0,
    attackTimer: 0,
    stateTimer: randRange(0.5, 2),
    animTime: 0,
    mesh: group,
    rider,
    horse,
    deadTimer: 0,
    isPlayer: false,
    legWounds: 0,
    update(dt: number, allUnits: Unit[], player: Unit | null) {
      updateUnitAI(unit, dt, allUnits, player);
      animateUnit(unit, dt);
    },
    takeDamage(amount: number, attacker: Unit | null) {
      return unitTakeDamage(unit, amount, attacker);
    },
    destroy() {
      if (unit.mesh.parent) unit.mesh.parent.remove(unit.mesh);
    },
  };

  return unit;
}

export function alertUnit(unit: Unit, point: THREE.Vector3, allUnits: Unit[]): void {
  if (unit.state === UnitState.Dead || unit.state === UnitState.Flee) return;
  unit.state = UnitState.Idle;
  unit.target = attackerFromPoint(unit, allUnits, point);
  unit.stateTimer = 0.3;
}

function createHorseMesh(team: Team): THREE.Group {
  const group = new THREE.Group();
  const bodyColor = COLORS.horse;
  const armorColor = team === 'ally' ? COLORS.ally : COLORS.enemy;
  const muzzleColor = 0xcfc0a6;
  const maneColor = 0x3e2723;

  const bodyMat = new THREE.MeshStandardMaterial({ color: bodyColor });
  const armorMat = new THREE.MeshStandardMaterial({ color: armorColor });
  const muzzleMat = new THREE.MeshStandardMaterial({ color: muzzleColor });
  const maneMat = new THREE.MeshStandardMaterial({ color: maneColor });

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 1.8), bodyMat);
  body.position.y = 1.1;
  body.castShadow = true;
  group.add(body);

  const neck = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.7, 0.5), bodyMat);
  neck.position.set(0, 1.7, 0.85);
  neck.rotation.x = -0.3;
  neck.castShadow = true;
  group.add(neck);

  // Head: two-tone so the facing direction is obvious
  const headBack = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.4, 0.35), bodyMat);
  headBack.position.set(0, 2.05, 1.02);
  headBack.castShadow = true;
  group.add(headBack);

  const headFront = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.32, 0.35), muzzleMat);
  headFront.position.set(0, 2.0, 1.37);
  headFront.castShadow = true;
  group.add(headFront);

  // Nose band for clearer front silhouette
  const noseBand = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.06, 0.06), new THREE.MeshStandardMaterial({ color: 0x2d1b15 }));
  noseBand.position.set(0, 2.05, 1.56);
  group.add(noseBand);
  const reinLeft = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.55), new THREE.MeshStandardMaterial({ color: 0x2d1b15 }));
  reinLeft.position.set(-0.14, 2.02, 1.32);
  reinLeft.rotation.x = 0.35;
  group.add(reinLeft);
  const reinRight = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.55), new THREE.MeshStandardMaterial({ color: 0x2d1b15 }));
  reinRight.position.set(0.14, 2.02, 1.32);
  reinRight.rotation.x = 0.35;
  group.add(reinRight);

  // Ears point forward (larger for clearer direction)
  const earGeom = new THREE.ConeGeometry(0.08, 0.28, 6);
  const leftEar = new THREE.Mesh(earGeom, bodyMat);
  leftEar.position.set(-0.1, 2.42, 1.05);
  leftEar.rotation.x = -0.4;
  leftEar.castShadow = true;
  group.add(leftEar);

  const rightEar = new THREE.Mesh(earGeom, bodyMat);
  rightEar.position.set(0.1, 2.42, 1.05);
  rightEar.rotation.x = -0.4;
  rightEar.castShadow = true;
  group.add(rightEar);

  // Forehead band for stronger front silhouette
  const foreheadBand = new THREE.Mesh(
    new THREE.BoxGeometry(0.36, 0.06, 0.06),
    new THREE.MeshStandardMaterial({ color: 0xf5f5f5, emissive: 0x333333 })
  );
  foreheadBand.position.set(0, 2.18, 1.28);
  group.add(foreheadBand);

  // Mane running from head to back
  const manePositions = [
    [0, 2.3, 1.15, 0.12],
    [0, 2.28, 0.95, 0.14],
    [0, 2.18, 0.75, 0.16],
    [0, 2.05, 0.55, 0.18],
    [0, 1.88, 0.35, 0.18],
    [0, 1.68, 0.15, 0.16],
    [0, 1.55, -0.15, 0.14],
    [0, 1.5, -0.45, 0.12],
  ];
  manePositions.forEach(([x, y, z, s]) => {
    const mane = new THREE.Mesh(new THREE.BoxGeometry(0.08, s as number, s as number), maneMat);
    mane.position.set(x as number, y as number, z as number);
    group.add(mane);
  });

  const legGeom = new THREE.CylinderGeometry(0.12, 0.1, 1.0, 6);
  const legPositions = [[-0.25, 0.5, 0.65], [0.25, 0.5, 0.65], [-0.25, 0.5, -0.65], [0.25, 0.5, -0.65]];
  legPositions.forEach(([x, y, z]) => {
    const leg = new THREE.Mesh(legGeom, bodyMat);
    leg.position.set(x, y, z);
    leg.castShadow = true;
    group.add(leg);
  });

  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.6, 5), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
  tail.position.set(0, 1.4, -1.0);
  tail.rotation.x = 0.6;
  group.add(tail);

  // Caparison: team-colored cloth covering the back
  const caparisonTop = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.05, 1.1), armorMat);
  caparisonTop.position.set(0, 1.52, 0.05);
  group.add(caparisonTop);

  const caparisonFront = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.45, 0.05), armorMat);
  caparisonFront.position.set(0, 1.3, 0.62);
  group.add(caparisonFront);

  const caparisonLeft = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.55, 1.0), armorMat);
  caparisonLeft.position.set(-0.38, 1.15, 0.05);
  caparisonLeft.rotation.z = 0.05;
  group.add(caparisonLeft);

  const caparisonRight = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.55, 1.0), armorMat);
  caparisonRight.position.set(0.38, 1.15, 0.05);
  caparisonRight.rotation.z = -0.05;
  group.add(caparisonRight);

  // Asymmetric front trim so the facing direction is readable even from behind
  const frontTrimMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5 });
  const caparisonTrim = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.06, 0.07), frontTrimMat);
  caparisonTrim.position.set(0, 1.48, 0.65);
  group.add(caparisonTrim);

  // Direction pennon on the back: a tall staff with a flowing flag pointing backward
  const pennonPole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 1.6, 6),
    new THREE.MeshStandardMaterial({ color: 0x5d4037 })
  );
  pennonPole.position.set(0, 2.05, -0.55);
  pennonPole.rotation.x = -0.55;
  group.add(pennonPole);

  const pennonFlag = new THREE.Mesh(
    new THREE.PlaneGeometry(0.35, 0.9, 4, 4),
    new THREE.MeshStandardMaterial({ color: armorColor, side: THREE.DoubleSide, transparent: true, opacity: 0.85 })
  );
  pennonFlag.position.set(0, 2.5, -1.05);
  pennonFlag.rotation.set(-0.55, 0, 0);
  pennonFlag.userData = { isPennon: true, phase: Math.random() * Math.PI * 2 };
  group.add(pennonFlag);

  // The model was authored with the head at +Z; unit.forward uses the object's -Z.
  // Flip the horse along Z so the head aligns with unit.forward, and render both
  // sides so the inverted normals still light correctly.
  group.scale.z = -1;
  bodyMat.side = THREE.DoubleSide;
  armorMat.side = THREE.DoubleSide;
  muzzleMat.side = THREE.DoubleSide;
  maneMat.side = THREE.DoubleSide;

  // Player-only yellow trim (added later in createPlayer) placeholder ignored here
  return group;
}

function createRiderMesh(team: Team, isLeader: boolean): THREE.Group {
  const group = new THREE.Group();
  const armorColor = team === 'ally' ? COLORS.ally : team === 'enemy' ? COLORS.enemy : COLORS.playerArmor;
  const accentColor = isLeader ? COLORS.leaderAccent : armorColor;

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.65, 0.35), new THREE.MeshStandardMaterial({ color: armorColor }));
  body.position.y = 0.55;
  body.castShadow = true;
  group.add(body);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.32, 0.3), new THREE.MeshStandardMaterial({ color: accentColor }));
  head.position.y = 1.05;
  group.add(head);

  if (isLeader) {
    const cape = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.9, 0.08), new THREE.MeshStandardMaterial({ color: COLORS.leaderAccent }));
    cape.position.set(0, 0.55, -0.25);
    group.add(cape);
  }

  return group;
}

function animateUnit(unit: Unit, dt: number): void {
  if (unit.state === UnitState.Dead) return;
  unit.animTime += dt;

  // Update mesh position
  unit.mesh.position.copy(unit.position);
  unit.mesh.position.y = getTerrainHeight(unit.position.x, unit.position.z);
  const targetRot = Math.atan2(unit.forward.x, unit.forward.z);
  unit.mesh.rotation.y = rotateToward(unit.mesh.rotation.y, targetRot, unit.stats.turnSpeed * dt);

  // Horse leg animation
  if (unit.horse && unit.velocity > 0.5) {
    const legs = unit.horse.children.filter((c) => {
      const mesh = c as THREE.Mesh;
      return mesh.geometry && mesh.geometry.type === 'CylinderGeometry';
    }) as THREE.Mesh[];
    const freq = unit.velocity * 0.5;
    legs.forEach((leg, i) => {
      leg.rotation.x = Math.sin(unit.animTime * freq + (i % 2 === 0 ? 0 : Math.PI)) * 0.5;
    });
  }

  // Pennon waving
  if (unit.horse) {
    unit.horse.children.forEach((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.userData.isPennon && mesh.geometry instanceof THREE.PlaneGeometry) {
        const positions = mesh.geometry.attributes.position.array as Float32Array;
        const speed = 4 + unit.velocity * 0.3;
        for (let i = 0; i < positions.length; i += 3) {
          const y = positions[i + 1];
          const z = positions[i + 2];
          // Wave increases toward the tip (negative y in local flag space)
          const tipFactor = Math.max(0, -y / 0.9);
          positions[i] = Math.sin(unit.animTime * speed + z * 4 + mesh.userData.phase) * 0.08 * tipFactor;
        }
        mesh.geometry.attributes.position.needsUpdate = true;
      }
    });
  }

  // Weapon swing animation
  if (unit.weaponCooldown > 0) {
    const weapon = unit.mesh.children[unit.horse ? 2 : 1];
    if (weapon) {
      const t = 1 - unit.weaponCooldown / UNIT_CONFIGS[unit.stats.isLeader ? 'leader' : unit.stats.isCavalry ? 'cavalry' : 'infantry'].attackCooldown;
      weapon.rotation.x = -0.2 + Math.sin(t * Math.PI) * 1.2;
    }
  }

  // Update health bar
  const hpBg = unit.mesh.children[unit.mesh.children.length - 2] as THREE.Mesh;
  const hpFill = unit.mesh.children[unit.mesh.children.length - 1] as THREE.Mesh;
  const hpRatio = unit.hp / unit.maxHp;
  hpFill.scale.x = Math.max(0.01, hpRatio);
  hpFill.position.x = -(1.2 - 1.2 * hpRatio) / 2;
  hpBg.lookAt(0, hpBg.position.y, 10);
  hpFill.lookAt(0, hpFill.position.y, 10);

  // Face camera for hp bars
  hpBg.rotation.set(0, 0, 0);
  hpFill.rotation.set(0, 0, 0);
}

function unitTakeDamage(unit: Unit, amount: number, attacker: Unit | null): boolean {
  if (unit.state === UnitState.Dead) return false;
  const actual = amount * (1 - unit.stats.armor);
  unit.hp -= actual;

  // Flash red
  unit.mesh.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
      child.userData.originalEmissive = child.material.emissive.clone();
      child.material.emissive.setHex(0xff0000);
      child.userData.flashTime = 0.15;
    }
  });

  if (unit.hp <= 0) {
    unit.hp = 0;
    unit.state = UnitState.Dead;
    unit.deadTimer = 5;
    unit.velocity = 0;
    // Fall over
    unit.mesh.rotation.x = -Math.PI / 2;
    unit.mesh.position.y = getTerrainHeight(unit.position.x, unit.position.z) + (unit.stats.isCavalry ? 0.8 : 0.2);
    return true;
  }
  return false;
}

function attackerFromPoint(unit: Unit, allUnits: Unit[], point: THREE.Vector3): Unit | null {
  let best: Unit | null = null;
  let bestDist = Infinity;
  for (const other of allUnits) {
    if (other.team === unit.team || other.state === UnitState.Dead) continue;
    const d = distance2D(point, other.position);
    if (d < bestDist) {
      bestDist = d;
      best = other;
    }
  }
  return best;
}

export function updateUnitFlashes(unit: Unit, dt: number): void {
  unit.mesh.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial && child.userData.flashTime > 0) {
      child.userData.flashTime -= dt;
      if (child.userData.flashTime <= 0 && child.userData.originalEmissive) {
        child.material.emissive.copy(child.userData.originalEmissive);
      }
    }
  });
}

export function removeDeadUnits(units: Unit[], dt: number): Unit[] {
  return units.filter((u) => {
    if (u.state === UnitState.Dead) {
      u.deadTimer -= dt;
      u.mesh.position.y = getTerrainHeight(u.position.x, u.position.z) + (u.stats.isCavalry ? 0.8 : 0.2);
      // Fade out
      const opacity = Math.max(0, u.deadTimer / 1.5);
      u.mesh.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.transparent = true;
          child.material.opacity = opacity;
        }
      });
      if (u.deadTimer <= 0) {
        u.destroy();
        return false;
      }
    }
    return true;
  });
}
