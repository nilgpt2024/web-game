// Player input: keyboard (KEYS from config, by event.code) + Gamepad API.
// getInput() returns the kart.input shape; `item` is edge-triggered (true for one frame per press).
// consumePressed(action) returns true exactly once per press (keyboard or gamepad).
import { KEYS } from './config.js';

// Extra UI actions (menus may use these); gameplay actions come from KEYS.
const EXTRA_KEYS = {
  confirm: ['Enter', 'NumpadEnter', 'Space'],
  back: ['Escape', 'Backspace'],
  up: ['ArrowUp', 'KeyW'],
  down: ['ArrowDown', 'KeyS'],
  mute: ['KeyM'],
};
const ACTION_KEYS = { ...EXTRA_KEYS, ...KEYS };

// Standard gamepad mapping.
const GP = { A: 0, B: 1, X: 2, Y: 3, LB: 4, RB: 5, LT: 6, RT: 7, BACK: 8, START: 9, L3: 10, R3: 11, UP: 12, DOWN: 13, LEFT: 14, RIGHT: 15 };
const GP_ACTIONS = {
  accelerate: [GP.A, GP.RT],
  brake: [GP.B, GP.LT],
  drift: [GP.RB, GP.X],
  item: [GP.LB, GP.Y],
  lookBack: [GP.R3, GP.L3],
  pause: [GP.START],
  left: [GP.LEFT],
  right: [GP.RIGHT],
  up: [GP.UP],
  down: [GP.DOWN],
  confirm: [GP.A, GP.START],
  back: [GP.B, GP.BACK],
  mute: [],
};

const PREVENT = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space']);
const STICK_DEADZONE = 0.18;
const STEER_RAMP_TIME = 0.08;   // seconds from 0 -> full lock on keyboard
const STEER_RELEASE_TIME = 0.06;

function isTypingTarget(el) {
  if (!el) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
}

export class InputController {
  /** Most recently constructed live controller (Kart peeks it for the start-line rocket boost). */
  static active = null;

  constructor({ target = (typeof window !== 'undefined' ? window : null) } = {}) {
    this.target = target;
    this.keys = new Set();
    this.latch = Object.create(null);      // action -> pending press for consumePressed
    this.itemEdge = false;                  // pending press for getInput().item
    this.gpHeld = Object.create(null);      // action -> bool
    this.gpPrev = Object.create(null);
    this.gpSteer = 0;
    this.gpThrottle = 0;
    this.gpBrake = 0;
    this.gamepadConnected = false;
    this.lastDevice = 'keyboard';
    this.steer = 0;
    this._lastTime = now();
    this._lastPoll = -1;
    this._state = { throttle: 0, brake: 0, steer: 0, drift: false, item: false, lookBack: false };

    this._codeToActions = new Map();
    for (const [action, codes] of Object.entries(ACTION_KEYS)) {
      for (const code of codes || []) {
        if (!this._codeToActions.has(code)) this._codeToActions.set(code, []);
        this._codeToActions.get(code).push(action);
      }
    }

    this._onKeyDown = (e) => {
      if (isTypingTarget(e.target)) return;
      if (PREVENT.has(e.code)) e.preventDefault();
      this.lastDevice = 'keyboard';
      if (e.repeat || this.keys.has(e.code)) { this.keys.add(e.code); return; }
      const actions = this._codeToActions.get(e.code);
      if (actions) {
        for (const a of actions) {
          if (!this._keyHeld(a)) {
            this.latch[a] = true;
            if (a === 'item') this.itemEdge = true;
          }
        }
      }
      this.keys.add(e.code);
    };
    this._onKeyUp = (e) => {
      if (PREVENT.has(e.code)) e.preventDefault();
      this.keys.delete(e.code);
    };
    this._onBlur = () => { this.keys.clear(); };

    if (target?.addEventListener) {
      target.addEventListener('keydown', this._onKeyDown, { passive: false });
      target.addEventListener('keyup', this._onKeyUp, { passive: false });
      target.addEventListener('blur', this._onBlur);
    }
    InputController.active = this;
  }

  _keyHeld(action) {
    const codes = ACTION_KEYS[action];
    if (!codes) return false;
    for (const c of codes) if (this.keys.has(c)) return true;
    return false;
  }

  _pollGamepad() {
    const t = now();
    if (t === this._lastPoll) return;
    this._lastPoll = t;
    let pads = null;
    try { pads = typeof navigator !== 'undefined' && navigator.getGamepads ? navigator.getGamepads() : null; } catch { pads = null; }
    let pad = null;
    if (pads) for (const p of pads) { if (p && p.connected !== false) { pad = p; break; } }
    this.gamepadConnected = !!pad;
    const held = this.gpHeld;
    for (const a in GP_ACTIONS) held[a] = false;
    this.gpSteer = 0; this.gpThrottle = 0; this.gpBrake = 0;
    if (pad) {
      const btn = (i) => {
        const b = pad.buttons?.[i];
        if (!b) return 0;
        return typeof b === 'object' ? (b.pressed ? Math.max(b.value || 0, 1) : (b.value || 0)) : (b ? 1 : 0);
      };
      for (const [action, idxs] of Object.entries(GP_ACTIONS)) {
        for (const i of idxs) if (btn(i) > 0.35) { held[action] = true; break; }
      }
      this.gpThrottle = Math.max(btn(GP.A) > 0.5 ? 1 : 0, btn(GP.RT));
      this.gpBrake = Math.max(btn(GP.B) > 0.5 ? 1 : 0, btn(GP.LT));
      const ax = pad.axes?.[0] ?? 0;
      const ay = pad.axes?.[1] ?? 0;
      if (Math.abs(ax) > STICK_DEADZONE) {
        this.gpSteer = Math.sign(ax) * Math.min(1, (Math.abs(ax) - STICK_DEADZONE) / (1 - STICK_DEADZONE));
      }
      if (held.left) this.gpSteer = -1;
      if (held.right) this.gpSteer = 1;
      // Stick as menu nav
      if (ax < -0.6) held.left = true;
      if (ax > 0.6) held.right = true;
      if (ay < -0.6) held.up = true;
      if (ay > 0.6) held.down = true;
      let any = false;
      for (const a in GP_ACTIONS) {
        if (held[a] && !this.gpPrev[a]) {
          this.latch[a] = true;
          if (a === 'item') this.itemEdge = true;
          any = true;
        }
      }
      if (any || this.gpSteer !== 0 || this.gpThrottle > 0) this.lastDevice = 'gamepad';
    }
    for (const a in GP_ACTIONS) this.gpPrev[a] = held[a];
  }

  isPressed(action) {
    this._pollGamepad();
    return this._keyHeld(action) || !!this.gpHeld[action];
  }

  consumePressed(action) {
    this._pollGamepad();
    if (this.latch[action]) { this.latch[action] = false; return true; }
    return false;
  }

  /** Raw throttle value (0..1) without consuming anything. */
  peekThrottle() {
    this._pollGamepad();
    return Math.max(this._keyHeld('accelerate') ? 1 : 0, this.gpThrottle);
  }

  getInput() {
    this._pollGamepad();
    const t = now();
    const dt = Math.min(0.05, Math.max(0, (t - this._lastTime) / 1000));
    this._lastTime = t;

    const kbTarget = (this._keyHeld('right') ? 1 : 0) - (this._keyHeld('left') ? 1 : 0);
    if (this.gpSteer !== 0) {
      this.steer = this.gpSteer;
    } else {
      let s = this.steer;
      if (kbTarget === 0) {
        const step = dt / STEER_RELEASE_TIME;
        s = Math.abs(s) <= step ? 0 : s - Math.sign(s) * step;
      } else {
        if (Math.sign(s) === -kbTarget) s = 0; // snap through centre on reversal
        const step = dt / STEER_RAMP_TIME;
        s = Math.abs(kbTarget - s) <= step ? kbTarget : s + Math.sign(kbTarget - s) * step;
      }
      this.steer = s;
    }

    const st = this._state;
    st.throttle = Math.max(this._keyHeld('accelerate') ? 1 : 0, this.gpThrottle);
    st.brake = Math.max(this._keyHeld('brake') ? 1 : 0, this.gpBrake);
    st.steer = Math.max(-1, Math.min(1, this.steer));
    st.drift = this._keyHeld('drift') || !!this.gpHeld.drift;
    st.item = this.itemEdge;
    this.itemEdge = false;
    st.lookBack = this._keyHeld('lookBack') || !!this.gpHeld.lookBack;
    // Return a fresh copy so callers can store/mutate it safely.
    return { ...st };
  }

  /** Clear all held/latched state (e.g. when pausing or switching screens). */
  reset() {
    this.keys.clear();
    for (const k in this.latch) this.latch[k] = false;
    this.itemEdge = false;
    this.steer = 0;
  }

  dispose() {
    const target = this.target;
    if (target?.removeEventListener) {
      target.removeEventListener('keydown', this._onKeyDown);
      target.removeEventListener('keyup', this._onKeyUp);
      target.removeEventListener('blur', this._onBlur);
    }
    if (InputController.active === this) InputController.active = null;
    this.keys.clear();
  }
}

function now() {
  return (typeof performance !== 'undefined' ? performance.now() : Date.now());
}
