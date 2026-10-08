// Development-only route driver (Step 11, approved decision 9). Loaded only on localhost with
// ?dev (see core/timing.js). It plays the game through real inputs — key presses dispatched on
// window and clicks on the same buttons a player uses — and reads state through window.proof.
// It never writes story state, never skips a gate and is not part of the shipped experience.
// Optional ?speed=1..8 accelerates authored waits and the frame clock for iteration.
import { setTimeScale } from '../core/timing.js';

export function startHarness() {
  const proof = window.proof;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const get = () => proof.getState();
  const log = [];
  // ?human (Step 14 review recording): real-person beats at panels, choices and notes. Dev tooling only.
  let human = new URLSearchParams(location.search).has('human');
  const beat = ms => human ? sleep(ms) : Promise.resolve();
  const say = msg => { log.push(`${new Date().toISOString().slice(11, 19)} ${msg}`); if (log.length > 400) log.shift(); overlay.querySelector('pre').textContent = log.slice(-9).join('\n'); };

  // ------------------------------------------------------------------ overlay
  const overlay = document.createElement('div');
  overlay.id = 'dev-harness';
  overlay.innerHTML = '<b>DEV ROUTE</b> <span></span><pre></pre>';
  Object.assign(overlay.style, { position: 'fixed', left: '8px', bottom: '64px', zIndex: 99, maxWidth: '360px', padding: '6px 8px', font: '11px/1.35 monospace', color: '#cfe', background: 'rgba(0,0,0,.6)', pointerEvents: 'none', whiteSpace: 'pre-wrap' });
  document.body.append(overlay);
  setInterval(() => { const s = get(); overlay.querySelector('span').textContent = `${s.phase} · ${s.story} · ${s.room} · ${s.clock}`; }, 400);

  // ------------------------------------------------------------------ inputs
  const dispatch = (type, key) => window.dispatchEvent(new KeyboardEvent(type, { key, bubbles: true, cancelable: true }));
  async function press(key, gap = 60) { dispatch('keydown', key); await sleep(gap); dispatch('keyup', key); await sleep(gap); }
  async function click(selector) {
    const el = await until(() => { const e = document.querySelector(selector); return e && !e.disabled && e.offsetParent !== null ? e : null; }, 20000, 'clickable ' + selector);
    await beat(450);
    el.click(); await sleep(120);
  }
  async function until(fn, timeout = 60000, label = 'condition') {
    const start = performance.now();
    while (performance.now() - start < timeout) { const v = fn(); if (v) return v; await sleep(80); }
    throw Error('Timed out waiting for ' + label + ' ' + JSON.stringify(pick(get())));
  }
  const pick = s => ({ phase: s.phase, story: s.story, room: s.room, x: +s.x.toFixed(2), z: +s.z.toFixed(2) });

  // Dialogue: advance as soon as the game allows (fast) or let AUTO pace it (paced).
  let paced = new URLSearchParams(location.search).has('paced');
  let pump = true;
  (async function dialoguePump() {
    while (pump) {
      const s = get(), adv = document.getElementById('advance-line');
      if (s.phase === 'dialogue' && adv && !adv.disabled) {
        if (paced) { const auto = document.getElementById('auto-lines'); if (auto.getAttribute('aria-pressed') !== 'true') auto.click(); }
        else dispatch('keydown', 'Enter'), dispatch('keyup', 'Enter');
      }
      await sleep(paced ? 300 : 140);
    }
  })();
  async function settle(pred = s => s.phase === 'explore', timeout = 240000) { return until(() => { const s = get(); return pred(s) ? s : null; }, timeout, 'settle'); }

  // ------------------------------------------------------------------ walking (real WASD)
  const held = new Set();
  function holdOnly(keys) {
    for (const k of [...held]) if (!keys.includes(k)) { dispatch('keyup', k); held.delete(k); }
    for (const k of keys) if (!held.has(k)) { dispatch('keydown', k); held.add(k); }
  }
  async function go(x, z, tolerance = .16) {
    const start = performance.now();
    let last = null, stuck = 0;
    while (performance.now() - start < 12000) {
      const s = get();
      if (s.phase !== 'explore') break;
      const dx = x - s.x, dz = z - s.z;
      if (Math.hypot(dx, dz) < tolerance) break;
      const sx = dx * .83844 - dz * .54499, sy = -(dx * .54499 + dz * .83844);
      const keys = [];
      if (sx > .06) keys.push('d'); if (sx < -.06) keys.push('a');
      if (sy > .06) keys.push('w'); if (sy < -.06) keys.push('s');
      holdOnly(keys);
      if (last && Math.hypot(s.x - last.x, s.z - last.z) < .002) { if (++stuck > 25) break; } else stuck = 0;
      last = { x: s.x, z: s.z };
      await sleep(30);
    }
    holdOnly([]);
    await sleep(60);
  }
  const BOUNDS = { lounge: [-6.2, 6.3, -4.9, 5.3], corridor: [-5.6, 5.6, -2.6, 2.65], victor: [-5.45, 5.45, -4.1, 4.05], veranda: [-4.55, 4.55, -1.95, 2.55] };
  async function nav(x, z) {
    await settle();
    const s = get(), boxes = proof.getColliders(), b = BOUNDS[s.room];
    const blocked = (a, c) => a < b[0] || a > b[1] || c < b[2] || c > b[3] || boxes.some(o => a > o.minX - .34 && a < o.maxX + .34 && c > o.minZ - .34 && c < o.maxZ + .34) ||
      Object.entries(s.actors).some(([n, p]) => n !== 'aren' && p.room === s.room && Math.hypot(a - p.x, c - p.z) < .72);
    const step = .25, key = (a, c) => a + ',' + c, cell = (a, c) => [Math.round(a / step), Math.round(c / step)];
    const startCell = cell(s.x, s.z), queue = [startCell], prev = new Map([[key(...startCell), null]]);
    let end = null;
    while (queue.length) {
      const p = queue.shift();
      if (Math.hypot(p[0] * step - x, p[1] * step - z) < .3 && !blocked(p[0] * step, p[1] * step)) { end = p; break; }
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const a = p[0] + dx, c = p[1] + dz, k = key(a, c);
        if (prev.has(k) || blocked(a * step, c * step)) continue;
        prev.set(k, p); queue.push([a, c]);
      }
    }
    if (!end) throw Error('No walkable route to ' + x + ',' + z + ' in ' + s.room);
    const path = [];
    for (let p = end; p; p = prev.get(key(...p))) path.unshift([p[0] * step, p[1] * step]);
    for (const [px, pz] of path.filter((_, i) => i % 3 === 0 || i === path.length - 1)) await go(px, pz, .2);
    await go(x, z);
  }
  async function near(name) {
    const s = get(), a = s.actors[name];
    for (const [dx, dz] of [[0, 1.05], [1, .1], [-1, .1], [0, -1]]) {
      try { await nav(a.x + dx, a.z + dz); if (get().target?.id === name) return; } catch (e) { /* try the next side */ }
    }
    throw Error('Cannot reach ' + name);
  }
  async function interactAt(x, z, expect) {
    await nav(x, z);
    await until(() => !expect || get().target?.kind === expect || get().target?.id === expect, 4000, 'target ' + expect);
    await beat(500);
    await press('e');
  }
  async function talk(name, topic) {
    if (get().phase !== 'topics') { await near(name); await beat(400); await press('e'); await settle(s => s.phase === 'topics'); }
    await beat(1100);
    await click(`[data-topic="${topic}"]`);
    await settle(s => s.phase === 'topics' || s.phase === 'explore' || s.phase === 'clue');
  }
  async function closePanel() { await press('Escape'); await settle(s => s.phase === 'explore' || s.phase === 'topics'); if (get().phase === 'topics') { await press('Escape'); await settle(); } }
  async function lookAll() { await beat(1500); for (const b of document.querySelectorAll('#clue-spots .spot')) { b.click(); await sleep(human ? 1700 : 150); } }
  async function keep() { await lookAll(); await beat(1200); await click('#keep-clue'); }
  async function solve(id, answers) {
    await press('n'); await settle(s => s.phase === 'notes');
    await beat(1500);
    await click(`[data-note="${id}"]`);
    for (const [slot, answer] of Object.entries(answers)) { await click(`[data-slot="${slot}"]`); await beat(700); await click(`[data-answer="${answer}"]`); }
    await beat(1200);
    await click('#confirm-extended');
  }

  // ------------------------------------------------------------------ the canonical route
  const route = [
    ['begin', async () => { document.getElementById('preview-audio').checked = !new URLSearchParams(location.search).has('mute'); await click('#begin-chapter'); await settle(s => s.phase === 'explore' && s.story === 'arrivalApproach'); }],
    ['veranda', async () => { await interactAt(1.55, -1.1, 'arrivalEnter'); await settle(s => s.phase === 'explore' && s.story === 'arrivalWelcome'); }],
    ['welcome', async () => { await near('ada'); await press('e'); await settle(s => s.phase === 'explore' && s.story === 'arrival'); }],
    ['guests', async () => { await near('mira'); await press('e'); await settle(s => s.phase === 'explore' && s.story === 'pressure'); }],
    ['victor', async () => { await near('victor'); await press('e'); await settle(s => s.phase === 'explore' && s.story === 'eveningBreath'); }],
    ['knocks', async () => { await interactAt(.6, -1.3, 'eveningEnd'); await settle(s => s.phase === 'explore' && s.story === 'followAda'); }],
    ['upstairs', async () => { await interactAt(3.1, -.4, 'stairs'); await settle(s => s.phase === 'explore' && s.story === 'atDoor'); }],
    ['door', async () => { await interactAt(1.2, -1.2, 'door'); await settle(s => s.phase === 'explore' && s.story === 'investigate'); }],
    ['watch', async () => { await interactAt(.25, 1.75, 'watch'); await settle(s => s.phase === 'clue'); await keep(); await settle(); }],
    ['down', async () => { await interactAt(-4.45, 3.5, 'exit'); await settle(s => s.room === 'corridor' && s.phase === 'explore'); await interactAt(-4.6, 1.5, 'lounge'); await settle(s => s.room === 'lounge' && s.phase === 'explore'); }],
    ['ask', async () => { await talk('mira', 'mira_knocks'); if (get().phase === 'topics') { await press('o'); await settle(s => s.phase === 'observe'); await click('#observe-spots .spot'); await click('#remember-observe'); await settle(s => s.phase === 'topics' || s.phase === 'explore'); } await closePanel(); }],
    ['note1', async () => { await solve('first', { time: '9:08', sound: 'Four Knocks' }); await settle(s => s.phase === 'explore' && s.story === 'investigate' && s.noted, 60000); }],
    ['doorEcho', async () => { await interactAt(3.1, -.4, 'upper'); await settle(s => s.room === 'corridor'); await sleep(2500); await settle(s => s.phase === 'explore' && s.residuals.includes('door'), 60000); }],
    ['desk', async () => {
      await interactAt(1.3, -1.4, 'enter'); await settle(s => s.room === 'victor' && s.phase === 'explore');
      for (const id of ['trace', 'document', 'recorder', 'bookend']) {
        if (get().phase !== 'desk') { await interactAt(-1.9, -.95, 'desk'); await settle(s => s.phase === 'desk'); }
        await click(`#desk-clues [data-clue="${id}"]`); await settle(s => s.phase === 'clue'); await keep(); await settle(s => s.phase === 'desk' || s.phase === 'explore');
      }
      if (get().phase === 'desk') await closePanel();
      await sleep(2200); await settle(s => s.phase === 'explore', 60000);
    }],
    ['impacts', async () => { await settle(); await interactAt(1.35, 2.0, 'clue'); await settle(s => s.phase === 'clue'); await keep(); await settle(); }],
    ['latch', async () => {
      await interactAt(-4.45, 3.5, 'exit'); await settle(s => s.room === 'corridor' && s.phase === 'explore');
      await interactAt(2.45, -1.6, 'clue'); await settle(s => s.phase === 'clue');
      await beat(1800);
      for (let i = 0; i < 3; i++) { await click('#keep-clue'); await sleep(human ? 2600 : 900); }
      await click('#keep-clue'); await settle(s => s.phase === 'explore' && s.evidence.staging);
    }],
    ['mira', async () => {
      await interactAt(-4.6, 1.5, 'lounge'); await settle(s => s.room === 'lounge' && s.phase === 'explore');
      await talk('mira', 'mira_admission'); await settle(s => s.phase === 'clue', 120000); await keep(); await settle();
    }],
    ['ada', async () => {
      await interactAt(1.55, -1.1, 'inside'); await settle(s => s.room === 'lounge' && s.phase === 'explore');
      await talk('ada', 'ada_deal'); await talk('ada', 'ada_witness'); await closePanel();
    }],
    ['elias', async () => { await talk('elias', 'elias_family'); await talk('elias', 'elias_account'); await closePanel(); }],
    ['notes23', async () => {
      await solve('mira', { trace: 'Scarf thread', when: 'before the confrontation' }); await settle(s => s.phase === 'explore' && s.caseNotes.mira, 60000);
      await solve('brann', { paper: 'Torn Document', tape: 'Missing Tape', intent: 'planned confrontation' }); await settle(s => s.phase === 'explore' && s.caseNotes.brann, 60000);
    }],
    ['search', async () => { await interactAt(3.1, -.4, 'upper'); await settle(s => s.room === 'corridor' && s.phase === 'explore'); await interactAt(1.3, -1.4, 'enter'); await settle(s => s.room === 'victor'); await sleep(2500); await settle(s => s.phase === 'explore' && s.residuals.includes('search'), 60000); }],
    ['final', async () => { await solve('final', { who: 'Elias Brann', why: 'Dev Brann / Kaveri Heights', weapon: 'brass bookend', second: 'deliberate', exit: 'by pulling the live night latch shut', time: 'before the Four Knocks' }); await settle(s => s.phase === 'explore' && s.story === 'dawn', 240000); }],
    ['ending', async () => { await nav(-1.2, -.4); await nav(1.2, -1.1); await settle(s => s.completed, 60000); }]
  ];
  async function run(untilName = 'ending', fromName) {
    let started = !fromName;
    for (const [name, step] of route) {
      if (!started) { if (name === fromName) started = true; else continue; }
      say('→ ' + name);
      await beat(1300);
      const t = performance.now();
      try { await step(); } catch (e) { say('✗ ' + name + ': ' + e.message); throw e; }
      say(`✓ ${name} (${((performance.now() - t) / 1000).toFixed(1)} s)`);
      if (name === untilName) break;
    }
    holdOnly([]);
    return get();
  }
  window.__harness = { speed: setTimeScale, overlay: on => { overlay.hidden = !on; }, interactAt, closePanel, lookAll, run, route: route.map(r => r[0]), press, click, nav, go, near, talk, keep, solve, settle, until, log, setPaced: v => { paced = v; }, setHuman: v => { human = v; }, stop: () => { pump = false; } };
  say('ready — __harness.run("knocks")');
}
