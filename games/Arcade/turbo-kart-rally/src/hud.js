// In-race HUD: DOM/CSS overlay in #ui-root plus a couple of small canvases (minimap, speedometer, item icons).
import { bus } from './events.js';
import { ITEMS, CHARACTERS } from './config.js';
import { formatTime } from './race.js';

const hex = (c) => '#' + (c >>> 0).toString(16).padStart(6, '0').slice(-6);
export const ordinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
};
export const PLACE_COLORS = ['#ffd23f', '#e3ecf5', '#f0a162', '#8fdcff', '#8fdcff', '#8fdcff', '#ff8a8a', '#ff6b6b'];

function el(tag, cls, parent, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  if (parent) parent.appendChild(e);
  return e;
}

function restartAnim(e, cls) {
  e.classList.remove(cls);
  void e.offsetWidth; // reflow to restart CSS animation
  e.classList.add(cls);
}

// ---------------------------------------------------------------------------------------------
// Item icon art (canvas, no emoji)
// ---------------------------------------------------------------------------------------------
const iconCache = new Map();
export function itemIcon(type) {
  if (iconCache.has(type)) return iconCache.get(type);
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  g.lineJoin = 'round'; g.lineCap = 'round';
  try { drawItem(g, type); } catch (e) { /* leave blank */ }
  const url = c.toDataURL();
  iconCache.set(type, url);
  return url;
}

function mushroom(g, x, y, s) {
  g.save(); g.translate(x, y); g.scale(s, s);
  // stem
  g.fillStyle = '#fbe7c6'; g.strokeStyle = '#3a2410'; g.lineWidth = 5;
  g.beginPath(); g.roundRect(-22, 0, 44, 36, 12); g.fill(); g.stroke();
  g.fillStyle = '#231a12';
  g.beginPath(); g.ellipse(-8, 14, 4, 8, 0, 0, Math.PI * 2); g.fill();
  g.beginPath(); g.ellipse(8, 14, 4, 8, 0, 0, Math.PI * 2); g.fill();
  // cap
  const grd = g.createRadialGradient(-12, -26, 4, 0, -10, 50);
  grd.addColorStop(0, '#ff6b6b'); grd.addColorStop(1, '#c71f1f');
  g.fillStyle = grd;
  g.beginPath(); g.moveTo(-44, 4); g.bezierCurveTo(-46, -46, 46, -46, 44, 4); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#fff';
  g.beginPath(); g.arc(0, -24, 11, 0, Math.PI * 2); g.fill();
  g.beginPath(); g.arc(-30, -8, 8, 0, Math.PI * 2); g.fill();
  g.beginPath(); g.arc(30, -8, 8, 0, Math.PI * 2); g.fill();
  g.restore();
}

function shell(g, color, dark) {
  g.save(); g.translate(64, 70);
  g.strokeStyle = '#1b1b1b'; g.lineWidth = 5;
  // rim
  g.fillStyle = '#fffbea';
  g.beginPath(); g.ellipse(0, 14, 46, 16, 0, 0, Math.PI * 2); g.fill(); g.stroke();
  // dome
  const grd = g.createRadialGradient(-14, -24, 4, 0, -6, 56);
  grd.addColorStop(0, color); grd.addColorStop(1, dark);
  g.fillStyle = grd;
  g.beginPath(); g.moveTo(-42, 10); g.bezierCurveTo(-44, -50, 44, -50, 42, 10); g.closePath(); g.fill(); g.stroke();
  // hex plates
  g.strokeStyle = 'rgba(255,255,255,0.85)'; g.lineWidth = 4;
  g.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = i / 6 * Math.PI * 2;
    const px = Math.cos(a) * 13, py = -14 + Math.sin(a) * 11;
    if (i === 0) g.moveTo(px, py); else g.lineTo(px, py);
  }
  g.closePath(); g.stroke();
  g.beginPath(); g.moveTo(-13, -14); g.lineTo(-34, -6); g.moveTo(13, -14); g.lineTo(34, -6);
  g.moveTo(-6, -24); g.lineTo(-12, -38); g.moveTo(6, -24); g.lineTo(12, -38); g.stroke();
  // shine
  g.fillStyle = 'rgba(255,255,255,0.55)';
  g.beginPath(); g.ellipse(-18, -26, 9, 5, -0.6, 0, Math.PI * 2); g.fill();
  g.restore();
}

function starPath(g, cx, cy, r1, r2) {
  g.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5;
    const r = i % 2 === 0 ? r1 : r2;
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
  }
  g.closePath();
}

function drawItem(g, type) {
  switch (type) {
    case 'mushroom': mushroom(g, 64, 62, 1.05); break;
    case 'triple_mushroom':
      mushroom(g, 64, 42, 0.6); mushroom(g, 34, 86, 0.6); mushroom(g, 94, 86, 0.6); break;
    case 'banana': {
      g.save(); g.translate(64, 64);
      g.strokeStyle = '#3a2a05'; g.lineWidth = 5;
      const grd = g.createLinearGradient(-40, -40, 40, 40);
      grd.addColorStop(0, '#fff176'); grd.addColorStop(1, '#f9a825');
      g.fillStyle = grd;
      g.beginPath();
      g.moveTo(-38, -34);
      g.bezierCurveTo(-52, 20, 0, 52, 44, 30);
      g.bezierCurveTo(10, 30, -22, 10, -24, -36);
      g.closePath(); g.fill(); g.stroke();
      g.fillStyle = '#5d4037';
      g.beginPath(); g.roundRect(-40, -48, 14, 16, 4); g.fill(); g.stroke();
      g.strokeStyle = 'rgba(255,255,255,0.6)'; g.lineWidth = 4;
      g.beginPath(); g.moveTo(-36, -14); g.quadraticCurveTo(-30, 18, 0, 32); g.stroke();
      g.restore(); break;
    }
    case 'green_shell': shell(g, '#66e06a', '#1b8a2a'); break;
    case 'red_shell': shell(g, '#ff6b6b', '#b71c1c'); break;
    case 'blue_shell': {
      // wings
      g.save(); g.fillStyle = '#ffffff'; g.strokeStyle = '#1b1b1b'; g.lineWidth = 4;
      for (const s of [-1, 1]) {
        g.beginPath(); g.moveTo(64 + s * 30, 58);
        g.bezierCurveTo(64 + s * 70, 30, 64 + s * 66, 70, 64 + s * 40, 78);
        g.closePath(); g.fill(); g.stroke();
      }
      g.restore();
      shell(g, '#64b5ff', '#0d47a1');
      // spikes
      g.fillStyle = '#fff'; g.strokeStyle = '#1b1b1b'; g.lineWidth = 3;
      for (const [x, y] of [[44, 44], [64, 34], [84, 44]]) {
        g.beginPath(); g.moveTo(x - 7, y + 8); g.lineTo(x, y - 10); g.lineTo(x + 7, y + 8); g.closePath(); g.fill(); g.stroke();
      }
      break;
    }
    case 'star': {
      const grd = g.createRadialGradient(56, 50, 6, 64, 66, 60);
      grd.addColorStop(0, '#fffde7'); grd.addColorStop(0.5, '#ffeb3b'); grd.addColorStop(1, '#ffa000');
      g.fillStyle = grd; g.strokeStyle = '#8a4b00'; g.lineWidth = 5;
      starPath(g, 64, 68, 56, 24); g.fill(); g.stroke();
      g.fillStyle = '#1b1b1b';
      g.beginPath(); g.ellipse(55, 64, 5, 10, 0, 0, Math.PI * 2); g.fill();
      g.beginPath(); g.ellipse(73, 64, 5, 10, 0, 0, Math.PI * 2); g.fill();
      break;
    }
    case 'lightning': {
      const grd = g.createLinearGradient(40, 10, 90, 120);
      grd.addColorStop(0, '#fffde7'); grd.addColorStop(0.5, '#ffe54a'); grd.addColorStop(1, '#ffb300');
      g.fillStyle = grd; g.strokeStyle = '#7a4a00'; g.lineWidth = 5;
      g.beginPath();
      g.moveTo(74, 8); g.lineTo(30, 70); g.lineTo(60, 70); g.lineTo(46, 120); g.lineTo(98, 50); g.lineTo(68, 50); g.lineTo(84, 8);
      g.closePath(); g.fill(); g.stroke();
      break;
    }
    default: {
      g.fillStyle = '#fff'; g.font = 'bold 80px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText('?', 64, 68);
    }
  }
}

// ---------------------------------------------------------------------------------------------
export class HUD {
  constructor(uiRoot) {
    this.uiRoot = uiRoot;
    this.root = el('div', 'hud hidden', uiRoot);
    this.portraitFn = null;
    this.player = null;
    this.track = null;
    this._offs = [];
    this._last = {};
    this._rouletteTimer = 0;
    this._rouletteIdx = 0;
    this._lastItemKey = '';
    this._standKey = '';
    this.active = false;

    const r = this.root;
    // top-left: lap + timer + splits
    this.tl = el('div', 'hud-tl', r);
    this.lapEl = el('div', 'hud-lap', this.tl, '<span class="lbl">LAP</span><span class="val">1</span><span class="of">/3</span>');
    this.lapVal = this.lapEl.querySelector('.val');
    this.lapOf = this.lapEl.querySelector('.of');
    this.timerEl = el('div', 'hud-timer', this.tl, '0:00.00');
    this.splitsEl = el('div', 'hud-splits', this.tl);

    // top-centre item slot
    this.itemWrap = el('div', 'hud-item', r);
    this.itemSlot = el('div', 'item-slot', this.itemWrap);
    this.itemImg = el('img', 'item-img', this.itemSlot);
    this.itemImg.alt = '';
    this.itemCount = el('div', 'item-count', this.itemSlot);
    this.itemHint = el('div', 'item-hint', this.itemWrap, 'E / SHIFT');

    // right side standings
    this.standEl = el('div', 'hud-standings', r);
    this.standRows = [];
    for (let i = 0; i < 8; i++) {
      const row = el('div', 'st-row', this.standEl, '<span class="st-pos"></span><span class="st-chip"></span><span class="st-name"></span>');
      this.standRows.push({ row, pos: row.querySelector('.st-pos'), chip: row.querySelector('.st-chip'), name: row.querySelector('.st-name') });
    }

    // bottom-left minimap
    this.mapWrap = el('div', 'hud-minimap', r);
    this.mapCanvas = el('canvas', '', this.mapWrap);
    this.mapCanvas.width = this.mapCanvas.height = 440;
    this.mapCtx = this.mapCanvas.getContext('2d');
    this.mapBg = null;

    // bottom-right: speedo + place
    this.br = el('div', 'hud-br', r);
    this.speedo = el('div', 'hud-speedo', this.br);
    this.speedCanvas = el('canvas', '', this.speedo);
    this.speedCanvas.width = this.speedCanvas.height = 320;
    this.speedCtx = this.speedCanvas.getContext('2d');
    this.speedText = el('div', 'speed-val', this.speedo, '0');
    el('div', 'speed-unit', this.speedo, 'km/h');
    this.driftPill = el('div', 'drift-pill', this.speedo, 'DRIFT');
    this.placeEl = el('div', 'hud-place', this.br, '<span class="num">1</span><span class="suf">st</span>');
    this.placeNum = this.placeEl.querySelector('.num');
    this.placeSuf = this.placeEl.querySelector('.suf');

    // overlays
    this.countEl = el('div', 'hud-countdown', r);
    this.bannerEl = el('div', 'hud-banner', r);
    this.wrongEl = el('div', 'hud-wrongway', r, '<div class="ww-arrow"></div><div class="ww-text">WRONG WAY</div>');
    this.flashEl = el('div', 'hud-flash', uiRoot);
    this.finishEl = el('div', 'hud-finish', r);
    this.lapPop = el('div', 'hud-lappop', r);

    // results (outside .hud so it stays visible independently)
    this.resultsEl = el('div', 'results hidden', uiRoot);
    this._resultsKey = null;

    this.toastEl = el('div', 'toast', uiRoot);

    this._subscribe();
  }

  setPortraitProvider(fn) { this.portraitFn = fn; }
  portrait(character) {
    if (!character) return '';
    const key = character.id;
    this._portraits = this._portraits || new Map();
    if (this._portraits.has(key)) return this._portraits.get(key);
    let url = '';
    try { if (this.portraitFn) url = this.portraitFn(character) || ''; } catch (e) { url = ''; }
    this._portraits.set(key, url);
    return url;
  }

  _subscribe() {
    const on = (n, f) => this._offs.push(bus.on(n, (d) => { if (this.active) f(d || {}); }));
    on('race:countdown', (d) => this.showCount(String(d.n), 'n' + d.n));
    on('race:go', () => { this.showCount('GO!', 'go'); clearTimeout(this._cdT); this._cdT = setTimeout(() => this.countEl.classList.remove('show'), 1100); });
    on('race:finalLap', () => this.banner('FINAL LAP!', 'final'));
    on('race:lap', (d) => {
      if (d.kart && d.kart.isPlayer) {
        restartAnim(this.lapEl, 'pulse');
        if (d.lapTime != null) { this.lapPop.textContent = formatTime(d.lapTime); restartAnim(this.lapPop, 'show'); }
      }
    });
    on('race:wrongWay', (d) => this.wrongEl.classList.toggle('show', !!d.active));
    on('item:lightning', (d) => { if (!(d.by && d.by.isPlayer)) restartAnim(this.flashEl, 'flash'); else restartAnim(this.flashEl, 'flash-soft'); });
    on('race:finish', (d) => {
      if (d.kart && d.kart.isPlayer) {
        const p = d.place || 1;
        this.finishEl.innerHTML = `<div class="fin-title">FINISH!</div><div class="fin-place" style="color:${PLACE_COLORS[p - 1] || '#fff'}">${p}<small>${ordinal(p)}</small></div>`;
        restartAnim(this.finishEl, 'show');
        this.wrongEl.classList.remove('show');
      }
    });
    on('item:got', (d) => { if (d.kart && d.kart.isPlayer) restartAnim(this.itemSlot, 'got'); });
    on('kart:hit', (d) => { if (d.kart && d.kart.isPlayer) restartAnim(this.root, 'shake'); });
  }

  // ------------------------------------------------------------------ lifecycle
  show() { this.active = true; this.root.classList.remove('hidden'); }
  hide() { this.active = false; this.root.classList.add('hidden'); }

  reset({ player, track, laps }) {
    this.player = player;
    this.track = track;
    this.laps = laps;
    this._last = {};
    this._standKey = '';
    this._lastItemKey = '';
    this.splitsEl.innerHTML = '';
    this.countEl.className = 'hud-countdown';
    this.bannerEl.className = 'hud-banner';
    this.wrongEl.classList.remove('show');
    this.finishEl.className = 'hud-finish';
    this.lapPop.className = 'hud-lappop';
    this.hideResults();
    this._buildMinimap(track);
  }

  toast(msg) {
    this.toastEl.textContent = msg;
    restartAnim(this.toastEl, 'show');
  }

  showCount(text, cls) {
    this.countEl.textContent = text;
    this.countEl.className = 'hud-countdown';
    void this.countEl.offsetWidth;
    this.countEl.className = `hud-countdown show ${cls}`;
  }

  banner(text, cls = '') {
    this.bannerEl.textContent = text;
    this.bannerEl.className = 'hud-banner';
    void this.bannerEl.offsetWidth;
    this.bannerEl.className = `hud-banner show ${cls}`;
  }

  // ------------------------------------------------------------------ minimap
  _buildMinimap(track) {
    this.mapBg = null;
    const mm = track && track.minimap;
    if (!mm || !mm.points || mm.points.length < 2) { this.mapWrap.style.display = 'none'; return; }
    this.mapWrap.style.display = '';
    const W = this.mapCanvas.width, pad = 34;
    const b = mm.bounds || this._bounds(mm.points);
    const spanX = Math.max(1, b.maxX - b.minX), spanZ = Math.max(1, b.maxZ - b.minZ);
    const scale = (W - pad * 2) / Math.max(spanX, spanZ);
    const ox = (W - spanX * scale) / 2, oz = (W - spanZ * scale) / 2;
    this._map = { minX: b.minX, minZ: b.minZ, scale, ox, oz };
    const c = document.createElement('canvas'); c.width = c.height = W;
    const g = c.getContext('2d');
    const path = () => {
      g.beginPath();
      mm.points.forEach((p, i) => { const [x, y] = this._mp(p.x, p.z); if (i === 0) g.moveTo(x, y); else g.lineTo(x, y); });
      g.closePath();
    };
    g.lineJoin = 'round'; g.lineCap = 'round';
    const rw = Math.max(10, (track.roadWidth || 24) * scale);
    path(); g.strokeStyle = 'rgba(0,0,0,0.55)'; g.lineWidth = rw + 16; g.stroke();
    path(); g.strokeStyle = '#ffffff'; g.lineWidth = rw + 6; g.stroke();
    path(); g.strokeStyle = '#5b6b86'; g.lineWidth = rw; g.stroke();
    // start line
    const p0 = mm.points[0], p1 = mm.points[1];
    const [x0, y0] = this._mp(p0.x, p0.z), [x1, y1] = this._mp(p1.x, p1.z);
    const ang = Math.atan2(y1 - y0, x1 - x0);
    g.save(); g.translate(x0, y0); g.rotate(ang);
    for (let i = -3; i < 3; i++) for (let j = 0; j < 2; j++) {
      g.fillStyle = (i + j) % 2 === 0 ? '#fff' : '#111';
      g.fillRect(j * 5 - 5, i * (rw / 6), 5, rw / 6);
    }
    g.restore();
    this.mapBg = c;
  }
  _bounds(pts) {
    const b = { minX: Infinity, maxX: -Infinity, minZ: Infinity, maxZ: -Infinity };
    for (const p of pts) { b.minX = Math.min(b.minX, p.x); b.maxX = Math.max(b.maxX, p.x); b.minZ = Math.min(b.minZ, p.z); b.maxZ = Math.max(b.maxZ, p.z); }
    return b;
  }
  _mp(x, z) {
    const m = this._map;
    return [m.ox + (x - m.minX) * m.scale, m.oz + (z - m.minZ) * m.scale];
  }

  _drawMinimap(karts, player, time, itemSystem) {
    if (!this.mapBg) return;
    const g = this.mapCtx, W = this.mapCanvas.width;
    g.clearRect(0, 0, W, W);
    g.drawImage(this.mapBg, 0, 0);
    if (this.track && this.track.itemBoxPositions) {
      g.fillStyle = 'rgba(255,215,64,0.85)';
      for (const p of this.track.itemBoxPositions) { const [x, y] = this._mp(p.x, p.z); g.fillRect(x - 3, y - 3, 6, 6); }
    }
    if (itemSystem && typeof itemSystem.getHazards === 'function') {
      let hz = null;
      try { hz = itemSystem.getHazards(); } catch (e) { hz = null; }
      if (hz) {
        for (const h of hz) {
          if (!h || !h.position) continue;
          const [x, y] = this._mp(h.position.x, h.position.z);
          g.fillStyle = h.type === 'banana' ? '#ffe44d' : h.type && h.type.includes('red') ? '#ff5252' : h.type && h.type.includes('blue') ? '#448aff' : '#69f06e';
          g.beginPath(); g.arc(x, y, 5, 0, Math.PI * 2); g.fill();
        }
      }
    }
    // opponents first (back to front by place), then player on top
    for (let i = karts.length - 1; i >= 0; i--) {
      const k = karts[i];
      if (k === player || !k.position) continue;
      const [x, y] = this._mp(k.position.x, k.position.z);
      g.fillStyle = k.character ? hex(k.character.color) : '#ccc';
      g.strokeStyle = '#111'; g.lineWidth = 4;
      g.beginPath(); g.arc(x, y, 11, 0, Math.PI * 2); g.fill(); g.stroke();
    }
    if (player && player.position) {
      const [x, y] = this._mp(player.position.x, player.position.z);
      const pulse = 1 + Math.sin(time * 6) * 0.15;
      g.fillStyle = 'rgba(255,255,255,0.35)';
      g.beginPath(); g.arc(x, y, 24 * pulse, 0, Math.PI * 2); g.fill();
      // heading arrow
      const h = player.heading || 0;
      const dx = Math.sin(h), dz = Math.cos(h);
      g.save(); g.translate(x, y); g.rotate(Math.atan2(dz, dx));
      g.fillStyle = player.character ? hex(player.character.color) : '#f33';
      g.strokeStyle = '#fff'; g.lineWidth = 5;
      g.beginPath(); g.moveTo(20, 0); g.lineTo(-12, 13); g.lineTo(-6, 0); g.lineTo(-12, -13); g.closePath(); g.fill(); g.stroke();
      g.restore();
    }
  }

  // ------------------------------------------------------------------ speedometer
  _drawSpeedo(speed, boosting, maxShown = 60) {
    const g = this.speedCtx, W = this.speedCanvas.width, cx = W / 2, cy = W / 2, r = W * 0.4;
    g.clearRect(0, 0, W, W);
    const a0 = Math.PI * 0.75, a1 = Math.PI * 2.25;
    g.lineCap = 'round';
    g.lineWidth = 26; g.strokeStyle = 'rgba(0,0,0,0.45)';
    g.beginPath(); g.arc(cx, cy, r, a0, a1); g.stroke();
    const f = Math.min(1, Math.abs(speed) / maxShown);
    const grd = g.createLinearGradient(0, W, W, 0);
    if (boosting) { grd.addColorStop(0, '#ff9100'); grd.addColorStop(1, '#ffea00'); }
    else { grd.addColorStop(0, '#40c4ff'); grd.addColorStop(0.7, '#69f0ae'); grd.addColorStop(1, '#eeff41'); }
    g.strokeStyle = grd; g.lineWidth = 18;
    if (f > 0.005) { g.beginPath(); g.arc(cx, cy, r, a0, a0 + (a1 - a0) * f); g.stroke(); }
    // ticks
    g.strokeStyle = 'rgba(255,255,255,0.75)'; g.lineWidth = 4;
    for (let i = 0; i <= 10; i++) {
      const a = a0 + (a1 - a0) * i / 10;
      const r1 = r - 26, r2 = r - (i % 5 === 0 ? 44 : 36);
      g.beginPath(); g.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); g.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2); g.stroke();
    }
  }

  // ------------------------------------------------------------------ per-frame
  update(dt, { player, karts, race, itemSystem, time = 0 } = {}) {
    if (!this.active || !player) return;
    const L = this._last;

    // lap
    const laps = race ? race.laps : this.laps || 3;
    const lap = Math.max(1, Math.min(laps, player.lap || 1));
    if (L.lap !== lap || L.laps !== laps) {
      if (L.lap != null && lap > L.lap) restartAnim(this.lapEl, 'pulse');
      L.lap = lap; L.laps = laps;
      this.lapVal.textContent = lap; this.lapOf.textContent = '/' + laps;
      this.lapEl.classList.toggle('final', lap === laps && laps > 1);
    }

    // timer
    const rt = race ? (race.phase === 'racing' || race.phase === 'done' ? (player.finished ? player.finishTime : race.raceTime) : 0) : 0;
    const ts = formatTime(rt);
    if (L.ts !== ts) { L.ts = ts; this.timerEl.textContent = ts; }

    // splits
    const lt = player.lapTimes || [];
    if (L.splits !== lt.length) {
      L.splits = lt.length;
      const best = lt.length ? Math.min(...lt) : 0;
      this.splitsEl.innerHTML = lt.map((t, i) => `<div class="split${t === best && lt.length > 1 ? ' best' : ''}"><span>L${i + 1}</span>${formatTime(t)}</div>`).join('');
    }

    // place
    const place = player.place || 1;
    if (L.place !== place) {
      L.place = place;
      this.placeNum.textContent = place;
      this.placeSuf.textContent = ordinal(place);
      this.placeEl.style.setProperty('--pc', PLACE_COLORS[place - 1] || '#fff');
      restartAnim(this.placeEl, 'bump');
    }

    // item slot
    let spinning = false, display = null;
    if (itemSystem && typeof itemSystem.rouletteState === 'function') {
      try { const rs = itemSystem.rouletteState(player); if (rs) { spinning = !!rs.spinning; display = rs.displayItem || null; } } catch (e) { /* ignore */ }
    }
    let key;
    if (spinning) {
      this._rouletteTimer -= dt;
      if (this._rouletteTimer <= 0) { this._rouletteTimer = 0.07; this._rouletteIdx = (this._rouletteIdx + 1) % ITEMS.length; }
      const shown = display && ITEMS.includes(display) ? display : ITEMS[this._rouletteIdx];
      key = 'spin:' + shown;
      if (key !== this._lastItemKey) this.itemImg.src = itemIcon(shown);
    } else if (player.item) {
      const count = player.itemCount || 1;
      key = 'item:' + player.item + ':' + count;
      if (key !== this._lastItemKey) {
        this.itemImg.src = itemIcon(player.item);
        this.itemCount.textContent = count > 1 ? '×' + count : '';
      }
    } else {
      key = 'none';
    }
    if (key !== this._lastItemKey) {
      this._lastItemKey = key;
      const has = key !== 'none';
      this.itemImg.style.visibility = has ? 'visible' : 'hidden';
      this.itemSlot.classList.toggle('spinning', spinning);
      this.itemSlot.classList.toggle('filled', has && !spinning);
      if (!player.item || spinning) this.itemCount.textContent = '';
      this.itemHint.style.opacity = has && !spinning ? 1 : 0;
    }

    // speedometer (km/h-ish: units/s * 3.6)
    const sp = Math.abs(player.speed || 0);
    const boosting = player.boostTimer > 0 || player.starTimer > 0;
    this._drawSpeedo(sp, boosting);
    const kmh = Math.round(sp * 3.6);
    if (L.kmh !== kmh) { L.kmh = kmh; this.speedText.textContent = kmh; }
    if (L.boost !== boosting) { L.boost = boosting; this.speedo.classList.toggle('boost', boosting); }
    const dl = player.drifting ? (player.driftLevel || 0) : -1;
    if (L.dl !== dl) {
      L.dl = dl;
      this.driftPill.className = 'drift-pill' + (dl >= 0 ? ' show lvl' + dl : '');
      this.driftPill.textContent = dl >= 3 ? 'ULTRA' : dl === 2 ? 'SUPER' : dl === 1 ? 'MINI' : 'DRIFT';
    }

    // standings
    const standings = (race && race.standings) || karts || [];
    const sk = standings.map((k) => k.index).join(',');
    if (sk !== this._standKey) {
      this._standKey = sk;
      for (let i = 0; i < this.standRows.length; i++) {
        const row = this.standRows[i], k = standings[i];
        if (!k) { row.row.style.display = 'none'; continue; }
        row.row.style.display = '';
        row.pos.textContent = i + 1;
        row.chip.style.background = k.character ? hex(k.character.color) : '#888';
        row.name.textContent = k.character ? k.character.name : '?';
        row.row.classList.toggle('me', k === player);
      }
    }

    this._drawMinimap(standings, player, time, itemSystem);
  }

  // ------------------------------------------------------------------ results
  showResults(results, { onRestart, onMenu, laps } = {}) {
    const R = this.resultsEl;
    const rows = results.map((r, i) => {
      const img = this.portrait(r.character);
      const col = r.character ? hex(r.character.color) : '#888';
      const pc = PLACE_COLORS[r.place - 1] || '#fff';
      return `<div class="res-row${r.isPlayer ? ' me' : ''}" style="--d:${0.25 + i * 0.07}s">
        <div class="res-place" style="color:${pc}">${r.place}<small>${ordinal(r.place)}</small></div>
        <div class="res-portrait" style="--kc:${col}">${img ? `<img src="${img}" alt="">` : `<span>${(r.name || '?')[0]}</span>`}</div>
        <div class="res-name">${r.name}${r.isPlayer ? ' <em>YOU</em>' : ''}</div>
        <div class="res-best">${r.bestLap ? 'BEST ' + formatTime(r.bestLap) : ''}</div>
        <div class="res-time">${r.estimated ? '~' : ''}${formatTime(r.time)}</div>
      </div>`;
    }).join('');
    const me = results.find((r) => r.isPlayer);
    const title = me ? (me.place === 1 ? 'VICTORY!' : me.place <= 3 ? 'PODIUM FINISH!' : 'RACE COMPLETE') : 'RESULTS';
    R.innerHTML = `
      <div class="res-panel">
        <div class="res-title">${title}</div>
        <div class="res-sub">${laps || ''} LAP RACE · FINAL STANDINGS</div>
        <div class="res-table">${rows}</div>
        <div class="res-buttons">
          <button class="btn primary" data-act="restart">RACE AGAIN</button>
          <button class="btn" data-act="menu">MAIN MENU</button>
        </div>
      </div>`;
    R.classList.remove('hidden');
    requestAnimationFrame(() => R.classList.add('show'));
    const btns = [...R.querySelectorAll('.btn')];
    let sel = 0;
    const focus = () => btns.forEach((b, i) => b.classList.toggle('focus', i === sel));
    focus();
    const act = (a) => {
      this.hideResults();
      bus.emit('ui:confirm');
      if (a === 'restart') onRestart && onRestart(); else onMenu && onMenu();
    };
    btns.forEach((b, i) => {
      b.addEventListener('click', () => act(b.dataset.act));
      b.addEventListener('mouseenter', () => { if (sel !== i) { sel = i; focus(); bus.emit('ui:move'); } });
    });
    this._resKey = (e) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'KeyA', 'KeyD'].includes(e.code)) {
        sel = (sel + 1) % btns.length; focus(); bus.emit('ui:move'); e.preventDefault();
      } else if ((e.code === 'Enter' || e.code === 'Space' || e.code === 'NumpadEnter') && !e.repeat) {
        e.preventDefault(); act(btns[sel].dataset.act);
      }
    };
    // defer so the keypress that ended the race doesn't trigger a button
    setTimeout(() => { if (this._resKey) window.addEventListener('keydown', this._resKey); }, 400);
  }

  hideResults() {
    if (this._resKey) { window.removeEventListener('keydown', this._resKey); this._resKey = null; }
    this.resultsEl.classList.remove('show');
    this.resultsEl.classList.add('hidden');
    this.resultsEl.innerHTML = '';
  }

  get resultsVisible() { return !!this._resKey || this.resultsEl.classList.contains('show'); }

  dispose() {
    for (const off of this._offs) off();
    this._offs = [];
    this.hideResults();
    this.root.remove(); this.flashEl.remove(); this.resultsEl.remove(); this.toastEl.remove();
  }
}

export { CHARACTERS };
