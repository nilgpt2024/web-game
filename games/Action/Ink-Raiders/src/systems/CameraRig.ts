import * as THREE from 'three';

export class CameraRig {
  private readonly desiredPosition = new THREE.Vector3();
  private readonly lookTarget = new THREE.Vector3();

  constructor(
    private readonly camera: THREE.PerspectiveCamera,
    private readonly offset = new THREE.Vector3(0, 9.5, 9.5),
  ) {}

  snapTo(target: THREE.Vector3): void {
    this.desiredPosition.copy(target).add(this.offset);
    this.camera.position.copy(this.desiredPosition);
    this.lookTarget.copy(target).add(new THREE.Vector3(0, 0.4, 0));
    this.camera.lookAt(this.lookTarget);
  }

  update(delta: number, target: THREE.Vector3, lag: number): void {
    this.desiredPosition.copy(target).add(this.offset);
    const factor = 1 - Math.exp(-delta / Math.max(0.001, lag));
    this.camera.position.lerp(this.desiredPosition, factor);
    this.lookTarget.copy(target).add(new THREE.Vector3(0, 0.35, -1.2));
    this.camera.lookAt(this.lookTarget);
  }

  project(x: number, y: number, z: number): { x: number; y: number; visible: boolean } {
    const vector = new THREE.Vector3(x, y, z).project(this.camera);
    const canvas = this.camera.userData.canvas as HTMLCanvasElement | undefined;
    if (!canvas) return { x: 0, y: 0, visible: false };
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((vector.x + 1) / 2) * rect.width + rect.left,
      y: ((-vector.y + 1) / 2) * rect.height + rect.top,
      visible: vector.z < 1,
    };
  }
}
