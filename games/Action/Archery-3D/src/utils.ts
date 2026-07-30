import * as THREE from 'three';

export const Y_AXIS = new THREE.Vector3(0, 1, 0);

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function randRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function randSign(): number {
  return Math.random() < 0.5 ? -1 : 1;
}

export function getTerrainHeight(x: number, z: number): number {
  let y = Math.sin(x * 0.03) * Math.cos(z * 0.03) * 0.8;
  y += Math.sin(x * 0.08 + z * 0.05) * 0.2;
  y += Math.cos(z * 0.1) * 0.15;
  return Math.max(-0.2, Math.min(1.0, y));
}

export function distance2D(a: THREE.Vector3, b: THREE.Vector3): number {
  const dx = a.x - b.x;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dz * dz);
}

export function angle2D(from: THREE.Vector3, to: THREE.Vector3): number {
  return Math.atan2(to.x - from.x, to.z - from.z);
}

export function rotateToward(current: number, target: number, maxStep: number): number {
  let diff = target - current;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  return current + clamp(diff, -maxStep, maxStep);
}

export function vectorFromAngle(angle: number): THREE.Vector3 {
  return new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
}

export function formatNumber(n: number, digits = 0): string {
  return n.toFixed(digits);
}
