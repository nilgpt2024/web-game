import * as THREE from 'three';
import type { Principle } from '../data/principles';

export class PrincipleOrb {
  readonly group = new THREE.Group();
  readonly core: THREE.Mesh;
  private readonly glow: THREE.Mesh;
  private readonly ring: THREE.Mesh;
  private readonly labelSprite: THREE.Sprite;
  private baseY: number;
  private time = 0;
  private _hovered = false;

  constructor(
    readonly principle: Principle,
    position: THREE.Vector3,
  ) {
    this.baseY = position.y;

    this.core = new THREE.Mesh(
      new THREE.SphereGeometry(0.45, 24, 24),
      new THREE.MeshStandardMaterial({
        color: principle.color,
        emissive: principle.emissive,
        emissiveIntensity: 0.3,
        roughness: 0.2,
        metalness: 0.1,
      }),
    );
    this.core.castShadow = true;
    this.group.add(this.core);

    this.glow = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 16, 16),
      new THREE.MeshBasicMaterial({
        color: principle.color,
        transparent: true,
        opacity: 0.12,
      }),
    );
    this.group.add(this.glow);

    this.ring = new THREE.Mesh(
      new THREE.RingGeometry(0.6, 0.7, 48),
      new THREE.MeshBasicMaterial({
        color: principle.color,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
      }),
    );
    this.ring.rotation.x = -Math.PI / 2;
    this.ring.position.y = -0.5;
    this.group.add(this.ring);

    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 48;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, 128, 48);
    ctx.font = 'bold 26px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = principle.color;
    ctx.fillText(principle.icon + ' ' + principle.name, 64, 24);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    this.labelSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false }),
    );
    this.labelSprite.position.y = 1.1;
    this.labelSprite.scale.set(1.6, 0.6, 1);
    this.group.add(this.labelSprite);

    this.group.position.copy(position);
  }

  get hovered(): boolean { return this._hovered; }
  set hovered(v: boolean) {
    this._hovered = v;
    this.core.material = new THREE.MeshStandardMaterial({
      color: this.principle.color,
      emissive: this.principle.emissive,
      emissiveIntensity: v ? 0.9 : 0.3,
      roughness: 0.2,
      metalness: 0.1,
    });
  }

  update(dt: number, elapsed: number): void {
    this.time += dt;
    this.group.position.y = this.baseY + Math.sin(elapsed * 1.2 + this.principle.id) * 0.15;
    this.core.rotation.x += dt * 0.6;
    this.core.rotation.z += dt * 0.3;
    (this.glow.material as THREE.MeshBasicMaterial).opacity = 0.08 + Math.sin(elapsed * 0.8 + this.principle.id) * 0.04;
  }

  getPosition(): THREE.Vector3 {
    return this.group.position;
  }

  dispose(): void {
    this.core.geometry.dispose();
    (this.core.material as THREE.Material).dispose();
    this.glow.geometry.dispose();
    (this.glow.material as THREE.Material).dispose();
    this.ring.geometry.dispose();
    (this.ring.material as THREE.Material).dispose();
    this.labelSprite.material.map?.dispose();
    this.labelSprite.material.dispose();
  }
}
