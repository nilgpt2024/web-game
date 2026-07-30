export class Hud {
  private readonly coverageValue = this.getElement('#coverage-value');
  private readonly killsValue = this.getElement('#kills-value');
  private readonly timerValue = this.getElement('#timer-value');
  private readonly comboValue = this.getElement('#combo-value');
  private readonly statusLine = this.getElement('#status-line');

  update(coverage: number, kills: number, timeLeft: number, combo = 0, multiplier = 1): void {
    this.coverageValue.textContent = String(coverage);
    this.killsValue.textContent = String(kills);
    this.timerValue.textContent = String(Math.max(0, Math.ceil(timeLeft)));
    if (this.comboValue) {
      this.comboValue.textContent = `${combo} 连击 · ${multiplier}×`;
      this.comboValue.classList.toggle('combo-active', multiplier > 1);
    }
  }

  setStatus(text: string): void {
    this.statusLine.textContent = text;
  }

  flashKill(): void {
    this.statusLine.animate(
      [
        { transform: 'translateY(0)', borderLeftColor: '#f472b6' },
        { transform: 'translateY(-3px)', borderLeftColor: '#818cf8' },
        { transform: 'translateY(0)', borderLeftColor: '#f472b6' },
      ],
      { duration: 220, easing: 'ease-out' },
    );
  }

  private getElement(selector: string): HTMLElement {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) throw new Error(`Missing HUD element: ${selector}`);
    return element;
  }
}
