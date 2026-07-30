import * as THREE from 'three';

export class FloorPaint {
  readonly texture: THREE.CanvasTexture;
  private readonly context: CanvasRenderingContext2D;
  private readonly size: number;
  private readonly canvas: HTMLCanvasElement;
  private readonly halfWidth: number;
  private readonly halfDepth: number;

  private readonly sampleCanvas: HTMLCanvasElement;
  private readonly sampleContext: CanvasRenderingContext2D;
  private readonly sampleSize = 48;
  private coverageCache = 0;
  private sampleTimer = 0;

  constructor(halfWidth: number, halfDepth: number, size = 1024) {
    this.halfWidth = halfWidth;
    this.halfDepth = halfDepth;
    this.size = size;
    this.canvas = document.createElement('canvas');
    this.canvas.width = size;
    this.canvas.height = size;
    const context = this.canvas.getContext('2d');
    if (!context) throw new Error('Could not create floor paint context.');
    this.context = context;

    this.context.fillStyle = '#15182b';
    this.context.fillRect(0, 0, size, size);
    this.drawGrid();

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.anisotropy = 4;

    this.sampleCanvas = document.createElement('canvas');
    this.sampleCanvas.width = this.sampleSize;
    this.sampleCanvas.height = this.sampleSize;
    const sctx = this.sampleCanvas.getContext('2d', { willReadFrequently: true });
    if (!sctx) throw new Error('Could not create sample context.');
    this.sampleContext = sctx;
  }

  private drawGrid(): void {
    const { size } = this;
    this.context.strokeStyle = 'rgba(238, 241, 255, 0.06)';
    this.context.lineWidth = 2;
    const step = size / 16;
    for (let i = 0; i <= size; i += step) {
      this.context.beginPath();
      this.context.moveTo(i, 0);
      this.context.lineTo(i, size);
      this.context.moveTo(0, i);
      this.context.lineTo(size, i);
      this.context.stroke();
    }
    this.context.strokeStyle = 'rgba(129, 108, 241, 0.3)';
    this.context.lineWidth = 6;
    this.context.strokeRect(3, 3, size - 6, size - 6);
  }

  private worldToPixel(x: number, z: number): { px: number; py: number } {
    const px = ((x + this.halfWidth) / (this.halfWidth * 2)) * this.size;
    const py = ((z + this.halfDepth) / (this.halfDepth * 2)) * this.size;
    return { px, py };
  }

  splat(x: number, z: number, color: THREE.Color, radiusPx = 26): void {
    const { px, py } = this.worldToPixel(x, z);
    const grad = this.context.createRadialGradient(px, py, 1, px, py, radiusPx);
    const hex = `#${color.getHexString()}`;
    grad.addColorStop(0, hex);
    grad.addColorStop(0.7, hex);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    this.context.globalCompositeOperation = 'source-over';
    this.context.fillStyle = grad;
    this.context.beginPath();
    this.context.arc(px, py, radiusPx, 0, Math.PI * 2);
    this.context.fill();
  }

  update(delta: number): void {
    this.sampleTimer -= delta;
    if (this.sampleTimer > 0) return;
    this.sampleTimer = 0.25;
    this.texture.needsUpdate = true;
    this.coverageCache = this.computeCoverage();
  }

  private computeCoverage(): number {
    const { sampleSize } = this;
    this.sampleContext.drawImage(this.canvas, 0, 0, sampleSize, sampleSize);
    const data = this.sampleContext.getImageData(0, 0, sampleSize, sampleSize).data;
    let painted = 0;
    const total = sampleSize * sampleSize;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (r > 60 || g > 60 || b > 80) painted++;
    }
    return Math.round((painted / total) * 100);
  }

  get coverage(): number {
    return this.coverageCache;
  }

  reset(): void {
    this.context.fillStyle = '#15182b';
    this.context.fillRect(0, 0, this.size, this.size);
    this.drawGrid();
    this.texture.needsUpdate = true;
    this.coverageCache = 0;
  }

  dispose(): void {
    this.texture.dispose();
  }
}
