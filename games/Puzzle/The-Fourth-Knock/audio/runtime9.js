import { atmosphereStates, atmosphereAliases } from '../atmosphere9.js';
import { cueAliases as catalogAliases } from './catalog9.js';

// Step 14 final audio runtime. Same contract as Step 9 (stable IDs, one music owner, room-owned ambience,
// independent voice/SFX buses, nothing ever blocks the story), now with:
//  - shipped browser files (MP3; the Four Knocks as WAV) with wrap-padded loops that cannot open a seam,
//  - the opening soundscape per beat, and a seamless rain handover into the veranda,
//  - a per-room acoustic send for voice and effects (the source VO stays dry),
//  - transparent ducking, a 'grave' music treatment for Kaveri/Brann/confession lines, music withdrawal,
//  - effect variants, occasional quiet room details, and a safety limiter that should rarely work.
// Missing files stay silent (subtitles and timing continue); temporary Step 7 files are never used.
const ROOM_BED = { exterior: 'amb_exterior', veranda: 'amb_veranda', lounge: 'amb_lounge_rain_loop', corridor: 'amb_upper_corridor_rain_muffled', victor: 'amb_victor_room_still' };
const OPENING = { message: ['amb_op_message', 'sfx_op_message_events'], travel: ['amb_op_train', 'sfx_op_travel_events'], ghat: ['amb_op_ghat', 'sfx_op_ghat_events'], house: ['amb_exterior', 'sfx_op_house_events'] };
// Room acoustics for the send: [rt60 s, brightness Hz, send level for voice, send level for effects].
const ROOMS = { lounge: [.72, 3600, .11, .14], corridor: [.62, 3000, .12, .15], victor: [.5, 3400, .1, .12], veranda: [.38, 5000, .06, .08], exterior: [.3, 4000, 0, 0] };
// Quiet details, only in calm states; never during speech.
const DETAIL_STATES = ['arrival', 'victor_arrives', 'social_unease', 'pre_knock', 'investigation', 'dawn', 'watch'];
const DETAILS = { lounge: ['sfx_detail_creak', 'sfx_detail_gust'], corridor: ['sfx_detail_creak', 'sfx_detail_gust'], victor: ['sfx_detail_creak'], veranda: ['sfx_detail_drip'] };

export async function createNarrativeAudio() {
  const manifest = await (await fetch('./audio/manifest.json')).json();
  const entries = new Map([...manifest.voices, ...manifest.assets].map(a => [a.id, a]));
  const aliases = { ...catalogAliases, ...(manifest.cueAliases || {}) };
  const MIX = { duckMusic: .4, duckAmbience: .75, graveMusic: .35, graveCutoff: 480, openingMusic: .4, ...(manifest.mix || {}) };
  const cache = new Map(), used = new Map(), events = [], loops = new Map(), lastVariant = new Map(), evictTimers = new Map();
  let ctx, master, limiter, capture, buses, ambFilter, musicFilter, verbs, verbRoom = null, verbActive = 1, duckTimer = 0;
  let voice = null, voiceTicket = 0, mixTicket = 0, ducked = false, grave = false, graveTimer = 0, muted = false;
  let mode = 'arrival', room = 'lounge', musicHeldIn = null, detailAt = 0, detailTimer = 0;
  let captureRecorder, captureChunks = [], resumeArmed = false;
  const opening = { active: false, beat: null, bed: null, events: null, music: null, musicEnded: false };
  const log = (type, detail) => { events.push({ type, detail, at: ctx?.currentTime || 0 }); if (events.length > 3000) events.shift(); };
  const now = () => ctx.currentTime;
  const ramp = (param, value, tc) => { param.cancelScheduledValues(now()); param.setTargetAtTime(value, now(), tc); };

  // ------------------------------------------------------------------ graph
  function roomIR(rt60, bright) {
    const n = Math.floor(ctx.sampleRate * rt60 * 1.4), buf = ctx.createBuffer(2, n, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c); let lp = 0; const a = Math.exp(-2 * Math.PI * bright / ctx.sampleRate);
      for (let i = 0; i < n; i++) {
        const t = i / ctx.sampleRate, env = Math.exp(-6.91 * t / rt60) * Math.min(1, t / .006);
        lp = (1 - a) * (Math.random() * 2 - 1) + a * lp;
        d[i] = lp * env;
      }
      for (const [dt, g] of [[.009, .5], [.014, .35], [.021, .28], [.029, .2]]) d[Math.floor((dt + c * .0011) * ctx.sampleRate)] += g * (c ? .8 : 1);
    }
    return buf;
  }
  async function start() {
    if (!ctx) {
      ctx = new AudioContext({ latencyHint: 'interactive' });
      master = ctx.createGain();
      limiter = ctx.createDynamicsCompressor();
      limiter.threshold.value = -2; limiter.knee.value = 1; limiter.ratio.value = 20; limiter.attack.value = .001; limiter.release.value = .12;
      master.connect(limiter).connect(ctx.destination);
      capture = ctx.createMediaStreamDestination(); limiter.connect(capture);
      buses = {};
      for (const name of ['music', 'ambience', 'sfx', 'voice']) { buses[name] = ctx.createGain(); buses[name].gain.value = name === 'music' || name === 'ambience' ? 0 : 1; }
      ambFilter = ctx.createBiquadFilter(); ambFilter.type = 'lowpass'; ambFilter.frequency.value = 19000; ambFilter.Q.value = .5;
      musicFilter = ctx.createBiquadFilter(); musicFilter.type = 'lowpass'; musicFilter.frequency.value = 20000; musicFilter.Q.value = .5;
      buses.ambience.connect(ambFilter).connect(master);
      buses.music.connect(musicFilter).connect(master);
      buses.sfx.connect(master); buses.voice.connect(master);
      // Two convolvers crossfade when the room changes, so the acoustic never switches with a click.
      verbs = [0, 1].map(() => { const c = ctx.createConvolver(), g = ctx.createGain(); g.gain.value = 0; c.connect(g).connect(master); return { c, g, room: null }; });
      for (const v of verbs) { v.voiceSend = ctx.createGain(); v.sfxSend = ctx.createGain(); buses.voice.connect(v.voiceSend).connect(v.c); v.sfxSend.connect(v.c); v.voiceSend.gain.value = v.sfxSend.gain.value = 0; }
      setRoomAcoustic(room);
      mix();
      detailTimer = setInterval(details, 1000);
    }
    // Step 15: Begin never waits on the browser's autoplay policy. If the context has not resumed within 1.5 s the game
    // carries on silently and the next click or key press resumes it (an unbounded await here could hang Begin).
    if (ctx.state !== 'running') {
      await Promise.race([ctx.resume().catch(() => {}), new Promise(r => setTimeout(r, 1500))]);
      if (ctx.state !== 'running' && !resumeArmed) {
        resumeArmed = true;
        const retry = () => { ctx.resume().catch(() => {}); };
        const armed = () => { if (ctx.state !== 'running') return; resumeArmed = false; removeEventListener('pointerdown', retry, true); removeEventListener('keydown', retry, true); ctx.removeEventListener('statechange', armed); };
        addEventListener('pointerdown', retry, true); addEventListener('keydown', retry, true); ctx.addEventListener('statechange', armed);
      }
    }
    return ctx;
  }
  function setRoomAcoustic(r) {
    if (!ctx || verbRoom === r) return;
    verbRoom = r; verbActive = 1 - verbActive;
    const spec = ROOMS[r] || ROOMS.lounge, a = verbs[verbActive], b = verbs[1 - verbActive];
    try { a.c.buffer = roomIR(spec[0], spec[1]); } catch { /* keep the previous acoustic */ }
    a.room = r;
    ramp(a.voiceSend.gain, spec[2], .1); ramp(a.sfxSend.gain, spec[3], .1); ramp(a.g.gain, 1, .25);
    ramp(b.voiceSend.gain, 0, .25); ramp(b.sfxSend.gain, 0, .25); ramp(b.g.gain, 0, .25);
  }
  function mix() {
    if (!ctx) return;
    const p = atmosphereStates[mode] || atmosphereStates.arrival;
    ramp(master.gain, muted ? 0 : 1, .06);
    const music = (opening.music && !opening.musicEnded ? MIX.openingMusic : p.musicGain) * (ducked ? MIX.duckMusic : 1) * (grave ? MIX.graveMusic : 1);
    ramp(buses.music.gain, music, ducked ? .09 : .45);
    ramp(buses.ambience.gain, p.ambienceGain * (ducked ? MIX.duckAmbience : 1), ducked ? .12 : .5);
    ramp(ambFilter.frequency, mode === 'residual' ? 760 : ['four_knocks', 'confession_silence'].includes(mode) ? 4200 : 19000, .35);
    ramp(musicFilter.frequency, grave ? MIX.graveCutoff : 20000, grave ? .5 : 1.2);
  }

  // ------------------------------------------------------------------ files
  function fileFor(entry, variant = 0) {
    const list = entry.variants?.length ? entry.variants : entry.file ? [entry.file] : [];
    return list[variant] || list[0] || null;
  }
  async function load(id, variant = 0) {
    const key = id + '#' + variant;
    if (cache.has(key)) return cache.get(key);
    const entry = entries.get(id);
    if (!entry) { log('unregistered-asset', id); return null; }
    const promise = (async () => {
      const file = fileFor(entry, variant), candidates = [];
      if (file) candidates.push('./audio/' + file);
      if (entry.base) candidates.push(`./audio/${entry.base}.mp3`, `./audio/${entry.base}.wav`);
      for (const url of [...new Set(candidates)]) {
        try {
          const response = await fetch(url);
          if (!response.ok) continue;
          const buffer = await ctx.decodeAudioData(await response.arrayBuffer());
          used.set(id, { kind: 'final', url, duration: buffer.duration });
          log('asset-loaded', { id, url, duration: buffer.duration });
          return buffer;
        } catch { /* a bad or missing file stays silent; captions and timing continue */ }
      }
      used.set(id, { kind: 'missing' }); log('missing', id);
      return null;
    })();
    cache.set(key, promise);
    return promise;
  }
  function evictLater(id) {
    const entry = entries.get(id);
    if (!entry || (entry.kind !== 'music' && entry.kind !== 'ambience')) return;
    clearTimeout(evictTimers.get(id));
    evictTimers.set(id, setTimeout(() => { if (!loops.has(id)) { cache.delete(id + '#0'); log('evicted', id); } }, 90000));
  }
  function source(buffer, bus, gain = 1, pan = 0, { room: roomSend = false } = {}) {
    if (!buffer) return null;
    const node = ctx.createBufferSource(), g = ctx.createGain(), p = ctx.createStereoPanner();
    // A StereoPanner folds one channel of a stereo buffer into the other (up to +3.7 dB at pan 0.35); compensate
    // so a panned stereo effect is moved, not boosted.
    const fold = buffer.numberOfChannels > 1 ? 1 + Math.abs(Math.sin(pan * Math.PI / 2)) * .7 : 1;
    node.buffer = buffer; g.gain.value = gain / fold; p.pan.value = pan;
    node.connect(g).connect(p).connect(buses[bus]);
    if (roomSend) for (const v of verbs) p.connect(v.sfxSend);
    return { node, gain: g, pan: p };
  }
  function fadeOut(item, seconds = 1.2) {
    if (!item) return;
    ramp(item.gain.gain, 0, seconds / 4);
    setTimeout(() => { try { item.node.stop(); } catch { } }, seconds * 1000 + 50);
  }
  function startLoop(id, buffer, bus, gain, fade = .3) {
    const entry = entries.get(id), item = source(buffer, bus, 0);
    item.node.loop = true;
    if (entry.loopEnd && entry.loopEnd <= buffer.duration + .01) { item.node.loopStart = entry.loopStart || 0; item.node.loopEnd = Math.min(entry.loopEnd, buffer.duration); }
    item.node.start(0, entry.loopStart || 0);
    ramp(item.gain.gain, gain * (entry.gain ?? 1), fade);
    return item;
  }

  // ------------------------------------------------------------------ loops: music owner + room beds
  function wantedLoops() {
    const p = atmosphereStates[mode] || atmosphereStates.arrival, wanted = new Map();
    // The opening owns 'exterior': its beat beds (the first one while the opening prepares), never state music.
    if (room === 'exterior') { wanted.set(OPENING[opening.beat || 'message'][0], ['ambience', 1]); return wanted; }
    {
      const bed = mode === 'dawn' || mode === 'final_knocks' ? 'amb_dawn' : ROOM_BED[room];
      if (bed) wanted.set(bed, ['ambience', 1]);
      if (room === 'lounge' && mode !== 'dawn' && mode !== 'final_knocks') wanted.set('amb_fireplace_subtle', ['ambience', 1]);
    }
    // One music owner. The opening cue owns the music bus until it ends; a withdrawn state stays silent.
    const openingOwns = opening.music && !opening.musicEnded;
    if (p.music && !openingOwns && musicHeldIn !== mode) wanted.set(p.music, ['music', 1]);
    return wanted;
  }
  async function syncLoops() {
    if (!ctx) return;
    const ticket = ++mixTicket, wanted = wantedLoops();
    for (const [id, item] of loops) if (!wanted.has(id)) {
      const k = entries.get(id)?.kind;
      fadeOut(item, k === 'music' ? (atmosphereStates[mode]?.music ? 2.4 : .9) : id.startsWith('amb_op_') || id === 'amb_exterior' ? 3.2 : 1.6);
      loops.delete(id); evictLater(id);
    }
    await Promise.all([...wanted].map(async ([id, [bus, gain]]) => {
      if (loops.has(id)) return;
      log('loop-request', { id, mode, room });
      const buffer = await load(id);
      if (ticket !== mixTicket || loops.has(id) || !buffer) return;
      const fade = bus === 'music' ? 1.1 : room === 'veranda' && opening.handing ? 1.2 : .35;
      if (bus === 'ambience' && opening.handing) opening.handing = false;
      loops.set(id, startLoop(id, buffer, bus, gain, fade));
      log('loop-start', { id, mode, room });
    }));
  }
  async function setAtmosphere(value, nextRoom = room) {
    value = atmosphereAliases[value] || value;
    if (!atmosphereStates[value]) throw Error('Unknown audio atmosphere ' + value);
    const changed = mode !== value || room !== nextRoom;
    if (mode !== value) musicHeldIn = null;
    mode = value; room = opening.active ? 'exterior' : nextRoom; mix();
    if (changed) log('atmosphere', { mode, room });
    await syncLoops();
  }
  const modeAliases = { lounge: 'arrival', tension: 'social_unease', silence: 'confession_silence', knocks: 'four_knocks', knockDucking: 'four_knocks', recognition: 'deduction' };
  function setMode(value) { return setAtmosphere(modeAliases[value] || value); }
  async function environment(nextRoom, nextMode) {
    await start();
    if (nextRoom !== 'exterior' && opening.active) closeOpening(false);
    room = nextRoom; setRoomAcoustic(room);
    log('environment', { room, requestedMode: nextMode });
    return syncLoops();
  }

  // ------------------------------------------------------------------ the opening
  async function openingBeat(beat) {
    await start();
    opening.active = true; opening.beat = beat; room = 'exterior'; setRoomAcoustic('exterior');
    log('opening-beat', beat);
    if (!opening.music && !opening.musicEnded) {
      const buffer = await load('mus_opening');
      if (buffer && opening.active && !opening.music) {
        const item = source(buffer, 'music', 1);
        item.node.onended = () => { if (opening.music !== item) return; opening.musicEnded = true; opening.music = null; log('opening-music-end', null); mix(); syncLoops(); };
        item.node.start(); opening.music = item; log('opening-music-start', null);
      }
    }
    mix();
    if (opening.events) fadeOut(opening.events, 2.4);
    const buffer = await load(OPENING[beat][1]);
    if (buffer && opening.beat === beat) {
      const entry = entries.get(OPENING[beat][1]);
      opening.events = source(buffer, 'sfx', entry.gain ?? 1); opening.events.node.start();
    }
    syncLoops();
  }
  function closeOpening(skipped) {
    opening.active = false; opening.handing = !skipped; opening.beat = null;
    if (opening.events) fadeOut(opening.events, skipped ? .5 : 6);
    if (skipped && opening.music) { const m = opening.music; opening.music = null; opening.musicEnded = true; fadeOut(m, 1.6); }
    log(skipped ? 'opening-skipped' : 'opening-handoff', null);
    mix();
  }

  // ------------------------------------------------------------------ voice
  function stopVoice() {
    voiceTicket++;
    if (voice) { voice.node.onended = null; try { voice.node.stop(); } catch { } voice = null; }
    releaseDuck();
    log('voice-stop', null);
  }
  // The duck holds across the short pauses between lines, so music never pumps between sentences.
  function releaseDuck() {
    clearTimeout(duckTimer); clearTimeout(graveTimer);
    duckTimer = setTimeout(() => { if (!voice) { ducked = false; mix(); } }, 900);
    if (grave) graveTimer = setTimeout(() => { if (!voice) { grave = false; mix(); } }, 2600);
  }
  async function speak(line) {
    await start(); stopVoice();
    const ticket = voiceTicket, entry = entries.get(line.line_id) || {};
    log('voice-request', { id: line.line_id, text: line.text, speaker: line.speaker });
    const buffer = await load(line.line_id);
    if (ticket !== voiceTicket) return { duration: 0, cancelled: true };
    if (!buffer) return { duration: 0, kind: 'missing' };
    if (entry.music === 'out' && mode !== musicHeldIn) { musicHeldIn = mode; syncLoops(); log('music-withdrawn', { line: line.line_id, mode }); }
    if (entry.tone === 'grave') { clearTimeout(graveTimer); grave = true; }
    voice = source(buffer, 'voice', entry.gain ?? 1);
    if (entry.dry) for (const v of verbs) try { buses.voice.disconnect(v.voiceSend); } catch { }
    else for (const v of verbs) try { buses.voice.connect(v.voiceSend); } catch { }
    voice.node.onended = () => { if (ticket !== voiceTicket) return; voice = null; releaseDuck(); log('voice-end', line.line_id); };
    clearTimeout(duckTimer); ducked = true; mix();
    voice.node.start(); log('voice-start', line.line_id);
    return { duration: buffer.duration, kind: used.get(line.line_id)?.kind };
  }

  // ------------------------------------------------------------------ effects
  async function effect(id, { pan = 0, gain = 1 } = {}) {
    id = aliases[id] || id;
    const quiet = /footsteps|walk_stone/.test(id);             // steps are too many to log
    if (!quiet) log('effect-request', { id, pan, gain });
    await start();
    const entry = entries.get(id);
    let variant = 0;
    if (entry?.variants?.length > 1) {
      do variant = Math.floor(Math.random() * entry.variants.length); while (variant === lastVariant.get(id) && entry.variants.length > 1);
      lastVariant.set(id, variant);
    }
    const buffer = await load(id, variant);
    const item = source(buffer, 'sfx', gain * (entry?.gain ?? 1), entry?.bakedSpace ? 0 : pan, { room: !!entry && !entry.bakedSpace && !entry.ui });
    if (item) { item.node.start(); if (!quiet) log('sfx', id); }
    return item;
  }
  function cue(id, detail = {}) {
    log('production-cue', { id, ...detail });
    const beat = /^opening_(message|travel|ghat|house)$/.exec(id);
    if (beat) { openingBeat(beat[1]); return; }
    if (id === 'opening_handoff') return closeOpening(false);
    if (id === 'opening_skipped') return closeOpening(true);
    const resolved = aliases[id] || id;
    if (entries.get(resolved)?.kind === 'sfx') return effect(resolved, detail);
    /* State and timing markers never request silent files or start duplicate loops. */
  }

  // ------------------------------------------------------------------ occasional room details
  function details() {
    if (!ctx || muted || voice || ctx.state !== 'running') return;
    const list = DETAILS[room];
    if (!list || !DETAIL_STATES.includes(mode) || opening.active) return;
    const t = now();
    if (!detailAt) { detailAt = t + 14 + Math.random() * 16; return; }
    if (t < detailAt) return;
    detailAt = t + 22 + Math.random() * 26;
    const id = list[Math.floor(Math.random() * list.length)], entry = entries.get(id);
    if (!entry) return;
    const variant = entry.variants?.length ? Math.floor(Math.random() * entry.variants.length) : 0;
    load(id, variant).then(buffer => {
      if (!buffer || voice) return;
      const item = source(buffer, 'ambience', entry.gain ?? .3, (Math.random() * 2 - 1) * .55);
      item.node.start(); log('detail', { id, room, mode });
    });
  }

  // ------------------------------------------------------------------ capture and inspection
  async function beginCapture() {
    await start(); captureChunks = [];
    captureRecorder = new MediaRecorder(capture.stream, { mimeType: 'audio/webm;codecs=opus', audioBitsPerSecond: 160000 });
    captureRecorder.ondataavailable = e => { if (e.data.size) captureChunks.push(e.data); };
    await new Promise(resolve => { captureRecorder.onstart = resolve; captureRecorder.start(250); });
    return { audioTime: ctx.currentTime, wall: Date.now() };
  }
  // Long recordings pull the encoded audio in pieces (base64 of the chunks since the last call).
  async function drainCapture() {
    const parts = captureChunks.splice(0);
    if (!parts.length) return '';
    const data = await new Blob(parts, { type: 'audio/webm' }).arrayBuffer();
    return await new Promise(resolve => { const r = new FileReader(); r.onload = () => resolve(r.result.split(',')[1]); r.readAsDataURL(new Blob([data])); });
  }
  async function endCapture() {
    if (!captureRecorder) return null;
    await new Promise(resolve => { captureRecorder.onstop = resolve; captureRecorder.stop(); });
    const data = await new Blob(captureChunks, { type: 'audio/webm' }).arrayBuffer();
    return await new Promise(resolve => { const r = new FileReader(); r.onload = () => resolve(r.result.split(',')[1]); r.readAsDataURL(new Blob([data])); });
  }
  async function preload(ids) { await start(); await Promise.all(ids.map(id => { const e = entries.get(aliases[id] || id); return Promise.all((e?.variants?.length ? e.variants : [0]).map((_, k) => load(aliases[id] || id, k))); })); }
  return {
    cue, start, preload, speak, stopVoice, effect, environment, setMode, setAtmosphere,
    setMuted: value => { muted = value; mix(); log('muted', value); }, get muted() { return muted; }, get speaking() { return !!voice; },
    manifest, beginCapture, endCapture, drainCapture,
    pause: () => ctx?.suspend(), resume: () => ctx?.resume(),
    diagnostics: () => ({
      mode, room, ducked, grave, muted, musicHeldIn, activeVoices: voice ? 1 : 0, activeLoops: [...loops.keys()],
      opening: { active: opening.active, beat: opening.beat, music: !!opening.music, musicEnded: opening.musicEnded },
      used: Object.fromEntries(used), events: [...events], musicGain: buses?.music.gain.value, ambienceGain: buses?.ambience.gain.value,
      context: ctx ? { state: ctx.state, sampleRate: ctx.sampleRate, time: ctx.currentTime } : null
    })
  };
}
