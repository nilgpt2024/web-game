import { StateSystem } from '../systems/StateSystem.js';
import { EventSystem } from '../systems/EventSystem.js';
import { Renderer } from '../ui/Renderer.js';

const GAME_STATE = {
  MENU: 'menu',
  PLAYING: 'playing',
  DIALOG: 'dialog',
  END: 'end',
};

export class Game {
  constructor() {
    this.gameState = GAME_STATE.MENU;

    this.state = new StateSystem();
    this.events = new EventSystem(this.state);
    this.renderer = new Renderer(this.state);

    this._wireEvents();
    this._wireRenderer();
  }

  _wireEvents() {
    this.events.onLog((msg, cls) => this.renderer.log(msg, cls));
    this.events.onShowResult((icon, title, text) => this.renderer.showResult(icon, title, text));
    this.events.onShowMilestone((m) => this.renderer.showMilestone(m));
    this.events.onRender(() => {
      this.renderer.renderEvent(this.events.currentEvent);
      this.renderer.update();
    });
    this.events.onPhaseTransition(() => {
      this.renderer.update();
    });
  }

  _wireRenderer() {
    this.renderer.onChoice((ci) => {
      if (this.gameState === GAME_STATE.PLAYING) {
        this.events.handleChoice(ci);
      }
    });

    this.renderer.onStart(() => {
      this.state.reset();
      this.events.restart();
      this.gameState = GAME_STATE.PLAYING;
      this.events.startFirstEvent();
    });

    this.renderer.onManualTransition((phase) => {
      this.events._transitionTo(phase);
      this.events.selectNext();
    });

    this.renderer.onLangChange(() => {
      this.renderer.renderEvent(this.events.currentEvent);
      this.renderer.update();
    });
  }

  start() {
    this.renderer.bindStartButton();
    this.renderer.update();
    this._publishDiagnostics();
  }

  _publishDiagnostics() {
    window.__CIALDINI_GAME_DIAGNOSTICS__ = () => ({
      state: this.gameState,
      phase: this.state.phase,
      day: this.state.day,
      money: this.state.money,
      rep: this.state.rep,
      prins: [...this.state.prins],
      jobLevel: this.state.jobLevel,
      jobProgress: this.state.jobProgress,
      totalEarned: this.state.totalEarned,
      becomeLeader: this.state.becomeLeader,
    });
  }
}
