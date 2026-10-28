// Global event bus shared by every system. See ARCHITECTURE.md for the event catalogue.
class EventBus {
  constructor() { this.handlers = new Map(); }
  on(name, fn) {
    if (!this.handlers.has(name)) this.handlers.set(name, new Set());
    this.handlers.get(name).add(fn);
    return () => this.off(name, fn);
  }
  off(name, fn) { this.handlers.get(name)?.delete(fn); }
  emit(name, data) {
    const set = this.handlers.get(name);
    if (!set) return;
    for (const fn of [...set]) {
      try { fn(data); } catch (err) { console.error(`[bus] handler for ${name} failed`, err); }
    }
  }
  clear() { this.handlers.clear(); }
}

export const bus = new EventBus();
