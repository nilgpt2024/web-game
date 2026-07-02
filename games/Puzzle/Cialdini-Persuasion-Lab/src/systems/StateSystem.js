import { PRINCIPLES, JOB_TITLES } from '../data/principles.js';
import { MILESTONES } from '../data/milestones.js';

export class StateSystem {
  constructor() {
    this.reset();
  }

  reset() {
    this.data = {
      phase:'study', day:0, money:0, rep:0,
      prins:[0,0,0,0,0,0,0], prinXP:[0,0,0,0,0,0,0],
      totalEarned:0, jobLevel:0, jobProgress:0,
      bigOpportunityTaken:false, leaderDeclined:false, becomeLeader:false,
      milestones:new Set(), seenEvents:new Set(), pendingGradEvent:false,
    };
    this._pendingMilestone = null;
  }

  get phase() { return this.data.phase; }
  set phase(v) { this.data.phase = v; }
  get day() { return this.data.day; }
  get money() { return this.data.money; }
  get rep() { return this.data.rep; }
  get prins() { return this.data.prins; }
  get prinXP() { return this.data.prinXP; }
  get totalEarned() { return this.data.totalEarned; }
  get jobLevel() { return this.data.jobLevel; }
  get jobProgress() { return this.data.jobProgress; }
  get bigOpportunityTaken() { return this.data.bigOpportunityTaken; }
  get becomeLeader() { return this.data.becomeLeader; }
  get leaderDeclined() { return this.data.leaderDeclined; }
  get pendingGradEvent() { return this.data.pendingGradEvent; }
  set pendingGradEvent(v) { this.data.pendingGradEvent = v; }
  get seenEvents() { return this.data.seenEvents; }
  get pendingMilestone() { return this._pendingMilestone; }
  get milestones() { return this.data.milestones; }

  static xpNeed(lv) { return (lv + 1) * 10; }

  static rnd(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }

  static pick(arr) { return arr[StateSystem.rnd(0, arr.length - 1)]; }

  static clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  static fmt(n) { return n.toLocaleString(); }

  get jobTitle() {
    return JOB_TITLES[Math.min(this.data.jobLevel, 4)];
  }

  get dailySalary() {
    return 15 + this.data.jobLevel * 10;
  }

  applyEffect(ef) {
    if (!ef) return;
    const S = this.data;
    if (ef.money) {
      const [mn, mx] = ef.money;
      const v = StateSystem.rnd(mn, mx);
      S.money += v;
      if (v > 0) S.totalEarned += v;
      if (S.money < 0) S.money = 0;
    }
    if (ef.rep) {
      const [mn, mx] = ef.rep;
      S.rep = StateSystem.clamp(S.rep + StateSystem.rnd(mn, mx), 0, 100);
    }
    if (ef.jobProgress) {
      const [mn, mx] = ef.jobProgress;
      S.jobProgress += StateSystem.rnd(mn, mx);
      if (S.jobProgress < 0) S.jobProgress = 0;
      const need = 3 + S.jobLevel * 2;
      while (S.jobProgress >= need && S.jobLevel < 4) {
        S.jobProgress -= need;
        S.jobLevel++;
      }
    }
    if (ef.prin !== undefined && ef.xp) {
      const i = ef.prin;
      const [mn, mx] = ef.xp;
      const gain = StateSystem.rnd(mn, mx);
      const lv = S.prins[i];
      S.prinXP[i] += gain;
      if (S.prinXP[i] >= StateSystem.xpNeed(lv)) {
        S.prinXP[i] -= StateSystem.xpNeed(lv);
        S.prins[i]++;
        return { prinLevelUp: i, newLevel: S.prins[i] };
      }
    }
    if (ef.bigOpportunityTaken) S.bigOpportunityTaken = true;
    if (ef.becomeLeader) S.becomeLeader = true;
    if (ef.leaderDeclined) S.leaderDeclined = true;
    return null;
  }

  resolveRiskyChoice(choice) {
    if (!choice.usePrin) return null;
    const lv = this.data.prins[choice.usePrin];
    const rate = choice.baseRate + lv * 5;
    const ok = Math.random() * 100 < rate;
    const out = ok
      ? { story: choice.success, storyEn: choice.successEn, effect: choice.successEffect||{} }
      : { story: choice.fail, storyEn: choice.failEn, effect: choice.failEffect||{} };
    return { ok, rate, prinIdx: choice.usePrin, ...out };
  }

  checkMilestones() {
    const S = this.data;
    for (const m of MILESTONES) {
      if (!S.milestones.has(m.id) && m.cond(S)) {
        S.milestones.add(m.id);
        this._pendingMilestone = m;
        return true;
      }
    }
    return false;
  }

  consumePendingMilestone() {
    const m = this._pendingMilestone;
    this._pendingMilestone = null;
    return m;
  }

  incDay() {
    this.data.day++;
  }
}
