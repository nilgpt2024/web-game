type Popup = {
  element: HTMLDivElement;
  life: number;
  x: number;
  y: number;
  vy: number;
};

export class ScorePopups {
  private readonly popups: Popup[] = [];
  private readonly layer: HTMLDivElement;

  constructor() {
    const existing = document.querySelector<HTMLDivElement>('#popup-layer');
    if (existing) {
      this.layer = existing;
      return;
    }
    this.layer = document.createElement('div');
    this.layer.id = 'popup-layer';
    this.layer.className = 'popup-layer';
    const app = document.querySelector<HTMLElement>('#app');
    if (app) app.appendChild(this.layer);
  }

  spawn(text: string, color: string, worldX: number, worldZ: number, camera: CameraLike): void {
    const projected = camera.project(worldX, 0.8, worldZ);
    if (!projected.visible) return;
    const element = document.createElement('div');
    element.className = 'score-popup';
    element.textContent = text;
    element.style.color = color;
    element.style.left = `${projected.x}px`;
    element.style.top = `${projected.y}px`;
    this.layer.appendChild(element);
    this.popups.push({
      element,
      life: 1,
      x: projected.x,
      y: projected.y,
      vy: -42,
    });
  }

  update(delta: number): void {
    for (let i = this.popups.length - 1; i >= 0; i--) {
      const popup = this.popups[i];
      popup.life -= delta * 1.5;
      popup.y += popup.vy * delta;
      if (popup.life <= 0) {
        popup.element.remove();
        this.popups.splice(i, 1);
        continue;
      }
      const opacity = Math.max(0, Math.min(1, popup.life));
      popup.element.style.opacity = String(opacity);
      popup.element.style.transform = `translate(-50%, -50%) translateY(${popup.y - (this.popups[i]?.y ?? popup.y)}px)`;
      popup.element.style.top = `${popup.y}px`;
    }
  }

  reset(): void {
    for (const popup of this.popups) popup.element.remove();
    this.popups.length = 0;
  }

  dispose(): void {
    this.reset();
    this.layer.remove();
  }
}

export type CameraLike = {
  project(x: number, y: number, z: number): { x: number; y: number; visible: boolean };
};
