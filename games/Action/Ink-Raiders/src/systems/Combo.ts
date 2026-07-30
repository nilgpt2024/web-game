export class ComboTracker {
  count = 0;
  private timer = 0;
  private readonly window: number;

  constructor(windowSeconds = 2.4) {
    this.window = windowSeconds;
  }

  register(): number {
    this.count += 1;
    this.timer = this.window;
    return this.multiplier;
  }

  get multiplier(): number {
    if (this.count >= 12) return 4;
    if (this.count >= 8) return 3;
    if (this.count >= 4) return 2;
    return 1;
  }

  update(delta: number): void {
    if (this.timer > 0) {
      this.timer -= delta;
      if (this.timer <= 0) this.reset();
    }
  }

  reset(): void {
    this.count = 0;
    this.timer = 0;
  }
}
