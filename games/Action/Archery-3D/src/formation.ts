import * as THREE from 'three';
import { BATTLEFIELD, FORMATION, UNIT_CONFIGS } from './config';
import { Unit, Team, UnitState } from './types';
import { createUnit } from './units';

let unitIdCounter = 1;

export function resetUnitIdCounter(): void {
  unitIdCounter = 1;
}

export function spawnArmy(team: Team, config: {
  infantry: number;
  cavalry: number;
  hasLeader: boolean;
}, zCenter: number): { units: Unit[]; leader: Unit | null } {
  const units: Unit[] = [];
  let leader: Unit | null = null;

  const side = team === 'ally' ? 1 : -1;
  const baseZ = zCenter;
  const leaderZ = baseZ + side * 12;
  const leaderPos = new THREE.Vector3(0, 0, leaderZ);

  // Infantry center block
  const infantryCols = Math.ceil(Math.sqrt(config.infantry));
  const infantryRows = Math.ceil(config.infantry / infantryCols);
  const blockWidth = (infantryCols - 1) * FORMATION.infantrySpacing;
  const startX = -blockWidth / 2;

  for (let i = 0; i < config.infantry; i++) {
    const col = i % infantryCols;
    const row = Math.floor(i / infantryCols);
    const x = startX + col * FORMATION.infantrySpacing + (Math.random() - 0.5) * 0.3;
    const z = baseZ + side * (row * FORMATION.rowSpacing) + (Math.random() - 0.5) * 0.3;
    const unit = createUnit(unitIdCounter++, team, 'infantry', x, z);
    units.push(unit);
  }

  // Cavalry flanks
  const flankX = blockWidth / 2 + 8;
  for (let i = 0; i < config.cavalry; i++) {
    const isLeft = i % 2 === 0;
    const x = (isLeft ? -1 : 1) * flankX + (Math.random() - 0.5) * 4;
    const z = baseZ + side * (Math.floor(i / 2) * FORMATION.cavalrySpacing + 5);
    const unit = createUnit(unitIdCounter++, team, 'cavalry', x, z);
    units.push(unit);
  }

  // Leader with honor guard
  if (config.hasLeader) {
    leader = createUnit(unitIdCounter++, team, 'leader', 0, leaderZ);
    leader.state = UnitState.Form;
    units.push(leader);

    // Assign formation slots relative to the leader
    for (const unit of units) {
      if (unit === leader) continue;
      unit.formationLeader = leader;
      unit.formationOffset = new THREE.Vector3(
        unit.position.x - leaderPos.x,
        0,
        unit.position.z - leaderPos.z
      );
      unit.state = UnitState.Form;
    }

    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const gx = Math.sin(angle) * BATTLEFIELD.leaderGuardRadius;
      const gz = Math.cos(angle) * BATTLEFIELD.leaderGuardRadius;
      const guard = createUnit(unitIdCounter++, team, 'cavalry', gx, leader.position.z + gz);
      (guard as any).guardTarget = leader;
      units.push(guard);
    }
  }

  return { units, leader };
}
