export class Atmosphere {
  constructor() { this.context = null; this.master = null; this.enabled = false; }
  async enable(on) {
    this.enabled = on;
    if (!on && this.context) { await this.context.suspend(); return; }
    if (!on) return;
    try {
      if (!this.context) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        this.context = new AudioContext();
        this.master = this.context.createGain();
        this.master.gain.value = .11;
        this.master.connect(this.context.destination);
        for (const [frequency, level] of [[55, .2], [82.41, .08], [110.15, .045]]) {
          const osc = this.context.createOscillator(), gain = this.context.createGain();
          osc.type = 'sine'; osc.frequency.value = frequency; gain.gain.value = level;
          osc.connect(gain); gain.connect(this.master); osc.start();
        }
        const length = this.context.sampleRate * 4;
        const buffer = this.context.createBuffer(1, length, this.context.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
        const source = this.context.createBufferSource(), filter = this.context.createBiquadFilter(), gain = this.context.createGain();
        source.buffer = buffer; source.loop = true; filter.type = 'lowpass'; filter.frequency.value = 340; gain.gain.value = .18;
        source.connect(filter); filter.connect(gain); gain.connect(this.master); source.start();
      }
      await this.context.resume();
    } catch { /* Sound is optional; the visual game remains fully playable. */ }
  }
  tone(frequency = 440, duration = .16, delay = 0, volume = .35) {
    if (!this.enabled || !this.context || this.context.state !== 'running') return;
    const osc = this.context.createOscillator(), gain = this.context.createGain();
    const time = this.context.currentTime + delay;
    osc.type = 'sine'; osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0, time); gain.gain.linearRampToValueAtTime(volume, time + .018); gain.gain.exponentialRampToValueAtTime(.0001, time + duration);
    osc.connect(gain); gain.connect(this.master); osc.start(time); osc.stop(time + duration + .04);
    osc.onended = () => { osc.disconnect(); gain.disconnect(); };
  }
  shift() { [220, 277.18, 329.63].forEach((n, i) => this.tone(n, .8, i * .12, .14)); }
  success() { [329.63, 440, 554.37, 659.26].forEach((n, i) => this.tone(n, 1, i * .13, .2)); }
  signal(values) { values.forEach((n, i) => this.tone(180 + n * 55, .45, i * .5, .3)); }
}
