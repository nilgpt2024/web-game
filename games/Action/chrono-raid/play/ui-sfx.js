(() => {
  class UISounds {
    constructor() {
      this.enabled = true;
      this.serial = 0;
      this.buffers = {};
      this.files = {title:'ui-title-impact',select:'ui-character-lock',deploy:'ui-deploy-explosion',victory:'ui-victory-explosion'};
      this.bytes = Object.fromEntries(Object.entries(this.files).map(([key, file]) => [key,
        fetch('assets/'+file+'.wav').then(r => r.ok ? r.arrayBuffer() : null).catch(() => null)
      ]));
      document.addEventListener('visibilitychange', () => {if(document.hidden) this.stop();});
    }
    prepare() {
      if (this.preparing) return this.preparing;
      try {
        this.context = window.menuMusic?.context || new (window.AudioContext || window.webkitAudioContext)();
        this.preparing = Promise.all(Object.keys(this.files).map(async key => {
          const bytes = await this.bytes[key];
          if (bytes) this.buffers[key] = await this.context.decodeAudioData(bytes);
        })).catch(() => {});
      } catch {this.preparing = Promise.resolve();}
      return this.preparing;
    }
    setEnabled(enabled) {this.enabled=enabled;if(!enabled)this.stop();}
    stop() {
      this.serial++;
      if (!this.voice) return;
      const {source,gain}=this.voice, now=this.context.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setTargetAtTime(0,now,.009);
      try {source.stop(now+.04);} catch {}
      this.voice=null;
    }
    play(kind, character) {
      if (!this.enabled || document.hidden) return;
      this.stop();
      const ticket=this.serial, requested=performance.now();
      this.prepare();
      if (!this.context) return;
      // Start resume in the input handler. Do not delay character selection or combat.
      Promise.all([this.preparing,this.context.resume()]).then(() => {
        if (ticket!==this.serial || !this.enabled || document.hidden || performance.now()-requested>300) return;
        const buffer=this.buffers[kind];if(!buffer)return;
        const source=this.context.createBufferSource(),gain=this.context.createGain();
        source.buffer=buffer;
        source.playbackRate.value=kind==='select'?(character==='aoi'?1.09:.96):1;
        gain.gain.value=kind==='select'?.72:.85;
        source.connect(gain);gain.connect(this.context.destination);
        const voice={source,gain};this.voice=voice;
        source.onended=()=>{source.disconnect();gain.disconnect();if(this.voice===voice)this.voice=null;};
        source.start();
        document.dispatchEvent(new CustomEvent('uiimpact',{detail:{kind,duration:kind==='select'?.32:.85}}));
      }).catch(() => {});
    }
  }
  window.uiSfx = new UISounds();
})();
