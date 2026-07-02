import { PRINCIPLES, JOB_TITLES } from '../data/principles.js';
import { StateSystem } from '../systems/StateSystem.js';

export class Renderer {
  constructor(stateSystem) {
    this.state = stateSystem;
    this._onChoice = null;
    this._onStart = null;
    this._onManualTransition = null;
    this._onLangChange = null;

    this._cacheDom();
    this._bindLang();
  }

  onChoice(cb) { this._onChoice = cb; }
  onStart(cb) { this._onStart = cb; }
  onManualTransition(cb) { this._onManualTransition = cb; }
  onLangChange(cb) { this._onLangChange = cb; }

  _cacheDom() {
    const $ = id => document.getElementById(id);
    this.titleScreen = $('title-screen');
    this.gameScreen = $('game-screen');
    this.dayNum = $('day-num');
    this.phaseBadge = $('phase-badge');
    this.statMoney = $('stat-money');
    this.statRep = $('stat-rep');
    this.phaseContent = $('phase-content');
    this.logArea = $('log-area');
    this.sidePanel = $('side-panel');
    this.rmIcon = $('rm-icon');
    this.rmTitle = $('rm-title');
    this.rmText = $('rm-text');
    this.rmBtn = $('rm-btn');
    this.msTitle = $('ms-title');
    this.msText = $('ms-text');
    this.msBtn = $('ms-btn');
    this.resultModal = $('result-modal');
    this.milestoneModal = $('milestone-modal');
  }

  _zh() {
    return (localStorage.getItem('game-lang') || 'zh-CN') === 'zh-CN';
  }

  _bindLang() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        localStorage.setItem('game-lang', this.dataset.lang);
        this._onLangChange?.();
      }.bind(this));
    });
  }

  bindStartButton() {
    document.getElementById('start-btn').addEventListener('click', () => {
      this.titleScreen.classList.remove('active');
      this.gameScreen.classList.add('active');
      this._clearLog();
      this._onStart?.();
    });
  }

  _clearLog() {
    this.logArea.innerHTML = '<div class="log-line log-info">📚 你的人生从一间小书房开始——面前是七本说服力原理的书。</div>';
    this.log('每个回合你都会面对一个故事和选择。', 'info');
    this.log('你的每一个决定，都在塑造你的人生。', 'info');
  }

  log(msg, cls = '') {
    const d = document.createElement('div');
    d.className = 'log-line' + (cls ? ' log-' + cls : '');
    d.textContent = msg;
    this.logArea.appendChild(d);
    this.logArea.scrollTop = this.logArea.scrollHeight;
  }

  updateStats() {
    const S = this.state;
    this.dayNum.textContent = S.day;
    this.statMoney.textContent = StateSystem.fmt(S.money);
    this.statRep.textContent = S.rep;
    const n = { study: '📚 学习', work: '💼 工作', entrepreneur: '🏢 创业' };
    this.phaseBadge.textContent = n[S.phase] || '';
  }

  renderEvent(event) {
    if (!event) {
      this.phaseContent.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-dim);">正在加载...</div>';
      return;
    }
    const zh = this._zh();
    const t = zh ? event.title : event.titleEn;
    const d = zh ? event.desc : event.descEn;

    this.phaseContent.innerHTML = `<div class="event-card">
      <div class="ec-icon">${event.icon}</div>
      <div class="ec-title">${t}</div>
      <div class="ec-desc">${d}</div>
      <div class="ec-choices" id="ec-choices"></div>
    </div>`;

    const cont = document.getElementById('ec-choices');
    event.choices.forEach((ch, ci) => {
      const bt = document.createElement('button');
      bt.className = 'ec-btn';
      bt.textContent = zh ? ch.text : ch.textEn;
      bt.addEventListener('click', () => this._onChoice?.(ci));
      cont.appendChild(bt);
    });
  }

  renderSidePanel() {
    const S = this.state;
    const zh = this._zh();

    if (S.phase === 'study') {
      const done = S.prins.filter(p => p >= 1).length;
      const allDone = done === 7;
      this.sidePanel.innerHTML = `<button class="sp-btn" disabled>📚 ${zh ? '学习第' : 'Study Day'} ${S.day + 1}</button>
        <div style="font-size:.6rem;color:var(--text-dim);text-align:center;">${done}/7 ${zh ? '已入门' : 'Learned'}</div>
        ${allDone ? '<button id="sp-gw" class="sp-btn" style="border-color:var(--success);color:var(--success);">💼 ' + (zh ? '去找工作' : 'Get a Job') + '</button>' : ''}`;
      const gw = document.getElementById('sp-gw');
      if (gw) gw.addEventListener('click', () => this._onManualTransition?.('work'));
    } else if (S.phase === 'work') {
      const t = JOB_TITLES[Math.min(S.jobLevel, 4)];
      this.sidePanel.innerHTML = `<button class="sp-btn" disabled>💼 ${t}</button>
        ${S.bigOpportunityTaken && S.money >= 500 ? '<button id="sp-startup" class="sp-btn" style="border-color:var(--success);color:var(--success);">🏢 ' + (zh ? '去创业' : 'Start Business') + '</button>' : ''}
        <div style="font-size:.6rem;color:var(--text-dim);text-align:center;">${zh ? '职级' : 'Level'} ${S.jobLevel + 1} · ${zh ? '日薪' : 'Daily'} ¥${15 + S.jobLevel * 10}</div>`;
      const sb = document.getElementById('sp-startup');
      if (sb) sb.addEventListener('click', () => this._onManualTransition?.('entrepreneur'));
    } else {
      this.sidePanel.innerHTML = `<button class="sp-btn" disabled>🏢 ${zh ? '创业第' : 'Day'} ${S.day + 1}</button>
        <div style="font-size:.6rem;color:var(--text-dim);text-align:center;">${zh ? '累计' : 'Total'} ¥${StateSystem.fmt(S.totalEarned)}</div>`;
    }
  }

  update() {
    this.updateStats();
    this.renderSidePanel();
  }

  showResult(icon, title, text) {
    return new Promise(res => {
      this.rmIcon.textContent = icon;
      this.rmTitle.textContent = title;
      this.rmText.textContent = text;
      this.resultModal.classList.add('open');
      this.rmBtn.onclick = () => {
        this.resultModal.classList.remove('open');
        res();
      };
    });
  }

  showMilestone(m) {
    return new Promise(res => {
      const zh = this._zh();
      this.msTitle.textContent = zh ? m.title : m.titleEn;
      this.msText.textContent = zh ? m.msg : m.msgEn;
      this.milestoneModal.classList.add('open');
      this.log(`🏆 ${zh ? m.title : m.titleEn}`, 'high');
      this.msBtn.onclick = () => {
        this.milestoneModal.classList.remove('open');
        res();
      };
    });
  }
}
