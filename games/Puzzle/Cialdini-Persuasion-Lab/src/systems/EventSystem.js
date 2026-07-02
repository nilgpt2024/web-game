import { EVENTS } from '../data/events.js';
import { PRINCIPLES } from '../data/principles.js';
import { StateSystem } from './StateSystem.js';

export class EventSystem {
  constructor(stateSystem) {
    this.state = stateSystem;
    this._currentEvent = null;
    this._onPhaseTransition = null;
    this._onLog = null;
    this._onShowResult = null;
    this._onShowMilestone = null;
    this._onRender = null;
  }

  get currentEvent() { return this._currentEvent; }

  onPhaseTransition(cb) { this._onPhaseTransition = cb; }
  onLog(cb) { this._onLog = cb; }
  onShowResult(cb) { this._onShowResult = cb; }
  onShowMilestone(cb) { this._onShowMilestone = cb; }
  onRender(cb) { this._onRender = cb; }

  startFirstEvent() {
    this._currentEvent = EVENTS.study.find(e => e.id === 'first_lesson');
    this._onRender?.();
  }

  selectNext() {
    const S = this.state;
    const pool = [...EVENTS[S.phase]];

    if (S.becomeLeader) {
      this._onShowResult?.('👑', '行业领袖！', '你成为了行业领袖！从零开始，你走完了这条路。')
        .then(() => this._onShowMilestone?.({
          title:'完结撒花', titleEn:'The End',
          msg:'恭喜——你从零做到了领袖。\n人生没有白走的路，每一步都算数。',
          msgEn:'From zero to industry leader. Every step counted.',
        }));
      return;
    }

    if (S.phase === 'study') {
      const grad = pool.find(e => e.id === 'graduation');
      if (S.prins.every(p => p >= 1) && grad && !S.seenEvents.has('graduation')) {
        this._currentEvent = grad;
        this._onRender?.();
        return;
      }
    }

    if (S.phase === 'work' && !S.bigOpportunityTaken && S.money >= 100 && Math.random() < 0.2) {
      const opp = pool.find(e => e.id === 'big_opportunity');
      if (opp) { this._currentEvent = opp; this._onRender?.(); return; }
    }

    if (S.phase === 'entrepreneur' && !S.becomeLeader && !S.leaderDeclined) {
      if (S.totalEarned >= 12000) {
        const leader = pool.find(e => e.id === 'industry_leader');
        if (leader) { this._currentEvent = leader; this._onRender?.(); return; }
      }
    }

    const unseen = pool.filter(e => !S.seenEvents.has(e.id));
    const available = unseen.length > 0 ? unseen : pool;
    this._currentEvent = StateSystem.pick(available);
    this._onRender?.();
  }

  handleChoice(choiceIndex) {
    const S = this.state;
    const e = this._currentEvent;
    const ch = e.choices[choiceIndex];
    S.seenEvents.add(e.id);
    S.incDay();

    const zh = (localStorage.getItem('game-lang') || 'zh-CN') === 'zh-CN';
    const risky = !!ch.usePrin;

    if (risky) {
      const result = S.resolveRiskyChoice(ch);
      const levelUp = S.applyEffect(result.effect);
      const hasMilestone = S.checkMilestones();

      const msg = zh ? result.story : result.storyEn;
      this._onLog?.(`${result.ok ? '✅' : '❌'} ${PRINCIPLES[result.prinIdx].icon} ${zh ? PRINCIPLES[result.prinIdx].name : PRINCIPLES[result.prinIdx].nameEn} (${Math.round(result.rate)}%)`, result.ok ? 'good' : 'bad');
      this._onLog?.(msg, 'info');

      this._onShowResult?.(result.ok ? '✅' : '❌', result.ok ? (zh ? '成功' : 'Success') : (zh ? '失败' : 'Failed'), msg)
        .then(() => {
          if (hasMilestone) this._handleMilestoneThen(() => this.selectNext());
          else this.selectNext();
        });
    } else {
      const levelUp = S.applyEffect(ch.effect || {});
      const hasMilestone = S.checkMilestones();
      const msg = zh ? ch.story : ch.storyEn;
      this._onLog?.(msg, 'info');

      if (ch.nextPhase) {
        this._onShowResult?.('🔄', zh ? '进入下一阶段' : 'Next Phase', msg)
          .then(() => {
            this._transitionTo(ch.nextPhase);
            if (hasMilestone) this._handleMilestoneThen(() => this.selectNext());
            else this.selectNext();
          });
      } else {
        this._onShowResult?.('📌', zh ? '选择' : 'Choice', msg)
          .then(() => {
            if (hasMilestone) this._handleMilestoneThen(() => this.selectNext());
            else this.selectNext();
          });
      }
    }
  }

  _transitionTo(phase) {
    const S = this.state;
    S.phase = phase;
    const zh = (localStorage.getItem('game-lang') || 'zh-CN') === 'zh-CN';
    const names = { work: zh ? '工作' : 'Work', entrepreneur: zh ? '创业' : 'Entrepreneur' };
    this._onLog?.(`🔄 ${zh ? '进入新阶段：' : 'New Phase: '}${names[phase] || phase}`, 'high');

    if (phase === 'work') {
      S.jobLevel = 0;
      S.jobProgress = 0;
      this._onLog?.(zh ? '你找到了一份工作，职场生活开始了。' : 'You found a job. Office life begins.', 'info');
      this._onLog?.(zh ? '每个选择都可能影响你的晋升、收入和口碑。' : 'Every choice affects promotion, income, and reputation.', 'info');
    } else if (phase === 'entrepreneur') {
      this._onLog?.(zh ? '你的咨询公司正式开张了。' : 'Your consulting firm is open for business.', 'info');
      this._onLog?.(zh ? '创业的路上没有容易二字，每个决定都关乎生死。' : 'Entrepreneurship is hard. Every decision matters.', 'info');
      S.becomeLeader = false;
    }
    this._onPhaseTransition?.(phase);
  }

  _handleMilestoneThen(cb) {
    const m = this.state.consumePendingMilestone();
    if (!m) { cb?.(); return; }
    const zh = (localStorage.getItem('game-lang') || 'zh-CN') === 'zh-CN';
    this._onLog?.(`🏆 ${zh ? m.title : m.titleEn}`, 'high');
    this._onShowMilestone?.(m).then(() => cb?.());
  }

  restart() {
    this._currentEvent = null;
  }
}
