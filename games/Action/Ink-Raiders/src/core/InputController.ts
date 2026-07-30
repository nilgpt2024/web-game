import * as THREE from 'three';

type PointerState = {
  active: boolean;
  id: number | null;
  centerX: number;
  centerY: number;
  radius: number;
};

export class InputController {
  private readonly keys = new Set<string>();
  private readonly pointer = new THREE.Vector2();
  private readonly keyVector = new THREE.Vector2();
  private readonly pointerState: PointerState = {
    active: false,
    id: null,
    centerX: 0,
    centerY: 0,
    radius: 1,
  };

  private dashDown = false;
  private fireHeld = false;
  private firePressed = false;

  private readonly aim = new THREE.Vector2(0, -1);
  private readonly screenPointer = { x: 0, y: 0, valid: false };

  private readonly onKeyDown = (event: KeyboardEvent) => {
    this.keys.add(event.code);
    if (event.code === 'Space' || event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      if (!this.dashDown) this.firePressed = true;
      this.dashDown = true;
      this.fireHeld = true;
    }
  };

  private readonly onKeyUp = (event: KeyboardEvent) => {
    this.keys.delete(event.code);
    if (event.code === 'Space' || event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      this.dashDown = false;
      this.fireHeld = false;
    }
  };

  private readonly onStickDown = (event: PointerEvent) => {
    event.preventDefault();
    const rect = this.stick.getBoundingClientRect();
    this.pointerState.active = true;
    this.pointerState.id = event.pointerId;
    this.pointerState.centerX = rect.left + rect.width / 2;
    this.pointerState.centerY = rect.top + rect.height / 2;
    this.pointerState.radius = rect.width * 0.42;
    try {
      this.stick.setPointerCapture(event.pointerId);
    } catch {
      // Synthetic test events do not always have a capturable pointer id.
    }
    this.updatePointer(event.clientX, event.clientY);
  };

  private readonly onStickMove = (event: PointerEvent) => {
    if (!this.pointerState.active || event.pointerId !== this.pointerState.id) return;
    event.preventDefault();
    this.updatePointer(event.clientX, event.clientY);
  };

  private readonly onStickUp = (event: PointerEvent) => {
    if (event.pointerId !== this.pointerState.id) return;
    event.preventDefault();
    this.pointerState.active = false;
    this.pointerState.id = null;
    this.pointer.set(0, 0);
    this.updateKnob();
  };

  private readonly onDashDown = (event: PointerEvent) => {
    event.preventDefault();
    this.dashDown = true;
    this.fireHeld = true;
    this.firePressed = true;
  };

  private readonly onDashUp = (event: PointerEvent) => {
    event.preventDefault();
    this.dashDown = false;
    this.fireHeld = false;
  };

  private readonly onPointerMove = (event: PointerEvent) => {
    this.screenPointer.x = event.clientX;
    this.screenPointer.y = event.clientY;
    this.screenPointer.valid = true;
  };

  private readonly onCanvasDown = (event: PointerEvent) => {
    if (event.target === this.dashButton) return;
    this.fireHeld = true;
    this.firePressed = true;
    this.onPointerMove(event);
  };

  private readonly onCanvasUp = () => {
    this.fireHeld = false;
  };

  constructor(
    private readonly stick: HTMLElement,
    private readonly knob: HTMLElement,
    private readonly dashButton: HTMLElement,
    private readonly canvas: HTMLCanvasElement,
  ) {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    this.stick.addEventListener('pointerdown', this.onStickDown);
    this.stick.addEventListener('pointermove', this.onStickMove);
    this.stick.addEventListener('pointerup', this.onStickUp);
    this.stick.addEventListener('pointercancel', this.onStickUp);
    this.dashButton.addEventListener('pointerdown', this.onDashDown);
    this.dashButton.addEventListener('pointerup', this.onDashUp);
    this.dashButton.addEventListener('pointercancel', this.onDashUp);
    this.dashButton.addEventListener('pointerleave', this.onDashUp);
    window.addEventListener('pointermove', this.onPointerMove);
    canvas.addEventListener('pointerdown', this.onCanvasDown);
    window.addEventListener('pointerup', this.onCanvasUp);
  }

  readMovement(target: THREE.Vector2): THREE.Vector2 {
    this.keyVector.set(0, 0);
    if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) this.keyVector.x -= 1;
    if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) this.keyVector.x += 1;
    if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) this.keyVector.y -= 1;
    if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) this.keyVector.y += 1;

    target.copy(this.keyVector).add(this.pointer);
    if (target.lengthSq() > 1) target.normalize();
    return target;
  }

  isDashHeld(): boolean {
    return this.dashDown;
  }

  isFireHeld(): boolean {
    return this.fireHeld;
  }

  consumeFirePressed(): boolean {
    const value = this.firePressed;
    this.firePressed = false;
    return value;
  }

  getScreenPointer(): { x: number; y: number; valid: boolean } {
    return this.screenPointer;
  }

  setAim(x: number, y: number): void {
    this.aim.set(x, y);
  }

  getAim(out: THREE.Vector2): THREE.Vector2 {
    return out.copy(this.aim);
  }

  dispose(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    this.stick.removeEventListener('pointerdown', this.onStickDown);
    this.stick.removeEventListener('pointermove', this.onStickMove);
    this.stick.removeEventListener('pointerup', this.onStickUp);
    this.stick.removeEventListener('pointercancel', this.onStickUp);
    this.dashButton.removeEventListener('pointerdown', this.onDashDown);
    this.dashButton.removeEventListener('pointerup', this.onDashUp);
    this.dashButton.removeEventListener('pointercancel', this.onDashUp);
    this.dashButton.removeEventListener('pointerleave', this.onDashUp);
    window.removeEventListener('pointermove', this.onPointerMove);
    this.canvas.removeEventListener('pointerdown', this.onCanvasDown);
    window.removeEventListener('pointerup', this.onCanvasUp);
  }

  private updatePointer(clientX: number, clientY: number): void {
    const dx = clientX - this.pointerState.centerX;
    const dy = clientY - this.pointerState.centerY;
    this.pointer.set(dx / this.pointerState.radius, dy / this.pointerState.radius);
    if (this.pointer.lengthSq() > 1) this.pointer.normalize();
    this.updateKnob();
  }

  private updateKnob(): void {
    const distance = 38;
    this.knob.style.transform = `translate(calc(-50% + ${this.pointer.x * distance}px), calc(-50% + ${this.pointer.y * distance}px))`;
  }
}
