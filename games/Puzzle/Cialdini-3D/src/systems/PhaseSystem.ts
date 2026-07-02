import type { Phase } from '../data/principles';

export interface PhaseState {
  phase: Phase;
  principles: Map<number, PrincipleProg>;
  money: number;
  reputation: number;
  day: number;
  phaseStarted: boolean;
}

export interface PrincipleProg {
  xp: number;
  level: number;
  learned: boolean;
}

const XP_PER_LEVEL = 60;
const MAX_LEVEL = 3;

export class PhaseSystem {
  readonly state: PhaseState = {
    phase: 'study',
    principles: new Map(),
    money: 0,
    reputation: 0,
    day: 0,
    phaseStarted: false,
  };

  private listeners: Array<() => void> = [];

  constructor() {
    for (let i = 0; i < 7; i++) {
      this.state.principles.set(i, { xp: 0, level: 0, learned: false });
    }
  }

  startPhase(): void {
    this.state.phaseStarted = true;
    this.state.day = 1;
    this.notify();
  }

  addXP(principleId: number, amount: number): string[] {
    const prog = this.state.principles.get(principleId);
    if (!prog) return [];
    const msgs: string[] = [];
    prog.xp += amount;
    while (prog.xp >= XP_PER_LEVEL * (prog.level + 1) && prog.level < MAX_LEVEL) {
      prog.level++;
      if (prog.level >= 1) prog.learned = true;
      msgs.push(`🔮 ${this.getPrincipleName(principleId)} 升到 Lv.${prog.level}！`);
      this.state.reputation += 10;
      this.state.money += 15;
    }
    this.notify();
    return msgs;
  }

  checkStudyComplete(): boolean {
    if (this.state.phase !== 'study') return false;
    for (const prog of this.state.principles.values()) {
      if (!prog.learned) return false;
    }
    return true;
  }

  advancePhase(): void {
    const idx = ['study', 'work', 'entrepreneur'].indexOf(this.state.phase);
    if (idx < 2) {
      this.state.phase = ['study', 'work', 'entrepreneur'][idx + 1] as Phase;
      this.state.day = 1;
    }
    this.notify();
  }

  nextDay(): void {
    this.state.day++;
    this.notify();
  }

  addMoney(amount: number): void { this.state.money += amount; this.notify(); }
  addRep(amount: number): void { this.state.reputation += amount; this.notify(); }

  onChange(fn: () => void): void { this.listeners.push(fn); }

  private notify(): void {
    for (const fn of this.listeners) fn();
  }

  private getPrincipleName(id: number): string {
    const names = ['互惠', '稀缺', '权威', '承诺一致', '好感', '社会认同', '联盟'];
    return names[id] ?? `P${id}`;
  }
}
