import * as THREE from 'three';
import type { InputController } from '../core/InputController';

export type PlayerTuning = {
  speed: number;
  dashMultiplier: number;
  acceleration: number;
  fireCooldown: number;
};

export type ArenaBounds = {
  halfWidth: number;
  halfDepth: number;
};

export class Player {
  readonly group = new THREE.Group();
  readonly velocity = new THREE.Vector3();
  readonly aim = new THREE.Vector2(0, -1);

  private readonly move = new THREE.Vector2();
  private readonly targetVelocity = new THREE.Vector3();
  private readonly bodyMaterial = new THREE.MeshStandardMaterial({
    color: '#818cf8',
    roughness: 0.42,
    metalness: 0.16,
    emissive: '#312e81',
    emissiveIntensity: 0.32,
  });
  private readonly accentMaterial = new THREE.MeshStandardMaterial({
    color: '#f472b6',
    roughness: 0.3,
    metalness: 0.2,
    emissive: '#831843',
    emissiveIntensity: 0.4,
  });
  private readonly bodyGeometry = new THREE.CapsuleGeometry(0.4, 0.6, 6, 14);
  private readonly noseGeometry = new THREE.ConeGeometry(0.26, 0.6, 6);
  private readonly muzzle = new THREE.Object3D();

  constructor() {
    const body = new THREE.Mesh(this.bodyGeometry, this.bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    body.position.y = 0.7;
    this.group.add(body);

    const nose = new THREE.Mesh(this.noseGeometry, this.accentMaterial);
    nose.castShadow = true;
    nose.position.set(0, 0.7, -0.62);
    nose.rotation.x = Math.PI / 2;
    this.group.add(nose);

    this.muzzle.position.set(0, 0.7, -0.95);
    this.group.add(this.muzzle);
  }

  update(
    delta: number,
    elapsed: number,
    input: InputController,
    tuning: PlayerTuning,
    bounds: ArenaBounds,
    camera: THREE.PerspectiveCamera,
    canvas: HTMLCanvasElement,
  ): void {
    input.readMovement(this.move);
    const dash = input.isDashHeld() ? tuning.dashMultiplier : 1;
    this.targetVelocity.set(this.move.x, 0, this.move.y).multiplyScalar(tuning.speed * dash);

    const smoothing = 1 - Math.exp(-tuning.acceleration * delta);
    this.velocity.lerp(this.targetVelocity, smoothing);
    this.group.position.addScaledVector(this.velocity, delta);

    this.group.position.x = THREE.MathUtils.clamp(this.group.position.x, -bounds.halfWidth + 0.8, bounds.halfWidth - 0.8);
    this.group.position.z = THREE.MathUtils.clamp(this.group.position.z, -bounds.halfDepth + 0.8, bounds.halfDepth - 0.8);

    if (this.velocity.lengthSq() > 0.001) {
      this.group.rotation.y = Math.atan2(this.velocity.x, -this.velocity.z);
    }

    this.group.position.y = 0.06 + Math.sin(elapsed * 9) * Math.min(this.velocity.length() / 40, 0.08);

    this.updateAimFromPointer(input, camera, canvas);
    this.group.rotation.y = Math.atan2(this.aim.x, -this.aim.y);
  }

  private updateAimFromPointer(
    input: InputController,
    camera: THREE.PerspectiveCamera,
    canvas: HTMLCanvasElement,
  ): void {
    const pointer = input.getScreenPointer();
    if (!pointer.valid) return;

    const rect = canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((pointer.x - rect.left) / rect.width) * 2 - 1,
      -((pointer.y - rect.top) / rect.height) * 2 + 1,
    );
    const ray = new THREE.Raycaster();
    ray.setFromCamera(ndc, camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.7);
    const hit = new THREE.Vector3();
    if (ray.ray.intersectPlane(plane, hit)) {
      const dx = hit.x - this.group.position.x;
      const dz = hit.z - this.group.position.z;
      if (dx * dx + dz * dz > 0.04) {
        this.aim.set(dx, dz).normalize();
      }
    }
  }

  getMuzzlePosition(out: THREE.Vector3): THREE.Vector3 {
    return this.muzzle.getWorldPosition(out);
  }

  dispose(): void {
    this.bodyGeometry.dispose();
    this.noseGeometry.dispose();
    this.bodyMaterial.dispose();
    this.accentMaterial.dispose();
  }
}
