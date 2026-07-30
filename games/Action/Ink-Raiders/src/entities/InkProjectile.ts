import * as THREE from 'three';

export class InkProjectile {
  readonly group = new THREE.Group();
  readonly velocity = new THREE.Vector3();
  active = true;
  age = 0;
  readonly maxAge = 1.6;

  private readonly geometry = new THREE.SphereGeometry(0.22, 12, 10);
  private readonly material: THREE.MeshStandardMaterial;

  constructor(position: THREE.Vector3, direction: THREE.Vector3, color: THREE.Color, speed: number) {
    this.material = new THREE.MeshStandardMaterial({
      color,
      emissive: color.clone().multiplyScalar(0.4),
      emissiveIntensity: 0.6,
      roughness: 0.32,
      metalness: 0.05,
    });
    const mesh = new THREE.Mesh(this.geometry, this.material);
    mesh.castShadow = true;
    this.group.add(mesh);
    this.group.position.copy(position);
    this.group.position.y = 0.7;
    this.velocity.copy(direction).setY(0.0).normalize().multiplyScalar(speed);
    this.velocity.y = 5.4;
  }

  update(delta: number): void {
    if (!this.active) return;
    this.age += delta;
    this.velocity.y -= 14 * delta;
    this.group.position.addScaledVector(this.velocity, delta);
    this.group.children[0].rotation.x += delta * 6;
    this.group.children[0].rotation.y += delta * 4;
    if (this.group.position.y <= 0.18) {
      this.group.position.y = 0.18;
      this.active = false;
    }
    if (this.age >= this.maxAge) {
      this.active = false;
    }
  }

  get color(): THREE.Color {
    return this.material.color;
  }

  dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
  }
}
