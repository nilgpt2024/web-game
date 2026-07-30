import * as THREE from 'three';
import type { ArenaBounds } from './Player';

export class Target {
  readonly group = new THREE.Group();
  active = true;
  readonly radius = 0.6;

  private readonly bodyGeometry = new THREE.IcosahedronGeometry(0.5, 1);
  private readonly eyeGeometry = new THREE.SphereGeometry(0.12, 10, 8);
  private readonly bodyMaterial: THREE.MeshStandardMaterial;
  private readonly eyeMaterial = new THREE.MeshStandardMaterial({
    color: '#0b0d18',
    roughness: 0.4,
  });
  private readonly wanderDir = new THREE.Vector2(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
  ).normalize();
  private readonly speed = 2.2 + Math.random() * 1.4;
  private turnTimer = 0;
  private readonly spin = new THREE.Vector3(
    (Math.random() - 0.5) * 2,
    (Math.random() - 0.5) * 2,
    (Math.random() - 0.5) * 2,
  );

  constructor(position: THREE.Vector3, hue: number) {
    this.bodyMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(hue, 0.85, 0.58),
      emissive: new THREE.Color().setHSL(hue, 0.9, 0.25),
      emissiveIntensity: 0.7,
      roughness: 0.3,
      metalness: 0.1,
    });
    const body = new THREE.Mesh(this.bodyGeometry, this.bodyMaterial);
    body.castShadow = true;
    this.group.add(body);

    for (const sign of [-1, 1]) {
      const eye = new THREE.Mesh(this.eyeGeometry, this.eyeMaterial);
      eye.position.set(sign * 0.2, 0.12, 0.42);
      this.group.add(eye);
    }
    this.group.position.copy(position);
    this.group.position.y = 0.6;
  }

  update(delta: number, elapsed: number, bounds: ArenaBounds): void {
    if (!this.active) return;
    this.turnTimer -= delta;
    if (this.turnTimer <= 0) {
      this.turnTimer = 1.4 + Math.random() * 2.2;
      this.wanderDir.set(Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
    }
    this.group.position.x += this.wanderDir.x * this.speed * delta;
    this.group.position.z += this.wanderDir.y * this.speed * delta;

    if (this.group.position.x < -bounds.halfWidth + 1) this.wanderDir.x = Math.abs(this.wanderDir.x);
    if (this.group.position.x > bounds.halfWidth - 1) this.wanderDir.x = -Math.abs(this.wanderDir.x);
    if (this.group.position.z < -bounds.halfDepth + 1) this.wanderDir.y = Math.abs(this.wanderDir.y);
    if (this.group.position.z > bounds.halfDepth - 1) this.wanderDir.y = -Math.abs(this.wanderDir.y);

    this.group.position.x = THREE.MathUtils.clamp(this.group.position.x, -bounds.halfWidth + 1, bounds.halfWidth - 1);
    this.group.position.z = THREE.MathUtils.clamp(this.group.position.z, -bounds.halfDepth + 1, bounds.halfDepth - 1);
    this.group.position.y = 0.6 + Math.sin(elapsed * 3 + this.group.position.x) * 0.12;

    this.group.rotation.x += this.spin.x * delta;
    this.group.rotation.y += this.spin.y * delta;
    this.group.rotation.z += this.spin.z * delta;
  }

  splat(): void {
    this.active = false;
    this.group.visible = false;
  }

  get color(): THREE.Color {
    return this.bodyMaterial.color;
  }

  dispose(): void {
    this.bodyGeometry.dispose();
    this.eyeGeometry.dispose();
    this.bodyMaterial.dispose();
    this.eyeMaterial.dispose();
  }
}
