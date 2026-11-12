// One music timeline across opening, selection, and opening replays.
(() => {
  class MenuMusic {
    constructor() {
      this.enabled = true;
      this.active = false;
      this.offset = 0;
      this.duckUntil = 0;
      document.addEventListener('uiimpact', e => {
        this.duckUntil = Math.max(this.duckUntil, performance.now()+e.detail.duration*1000);
        clearTimeout(this.duckTimer);
        this.refresh();
        this.duckTimer = setTimeout(() => this.refresh(), Math.max(0,this.duckUntil-performance.now())+20);
      });
      this.bytes = fetch('assets/yogaakerumaeni-menu.mp3').then(r => {
        if (!r.ok) throw new Error('Music unavailable');
        return r.arrayBuffer();
      }).catch(() => null);
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) this.stop();
        else this.refresh();
      });
      for (const event of ['playing','pause','ended','volumechange']) {
        document.addEventListener(event, e => {if(e.target.tagName === 'VIDEO') this.refresh();}, true);
      }
    }
    activate() {
      this.active = true;
      try {
        if (!this.context) {
          this.context = new (window.AudioContext || window.webkitAudioContext)();
          this.gain = this.context.createGain();
          this.gain.gain.value = 0;
          this.gain.connect(this.context.destination);
          this.bytes.then(bytes => bytes ? this.context.decodeAudioData(bytes) : null).then(buffer => {
            // Soften the boundary when the supplied song repeats in the menu.
            if (buffer) for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
              const samples = buffer.getChannelData(channel);
              const fadeIn = Math.min(samples.length, Math.floor(buffer.sampleRate * .12));
              const fadeOut = Math.min(samples.length, Math.floor(buffer.sampleRate * .6));
              for (let i = 0; i < fadeIn; i++) samples[i] *= i / fadeIn;
              for (let i = 0; i < fadeOut; i++) samples[samples.length - 1 - i] *= i / fadeOut;
            }
            this.buffer = buffer;
            this.refresh();
          }).catch(() => {});
        }
        // Resume within a user gesture; video playback never waits for music loading.
        this.context.resume().then(() => this.refresh()).catch(() => {});
        this.refresh();
      } catch {}
    }
    leave() {this.active = false;this.refresh();}
    setEnabled(enabled) {
      this.enabled = enabled;
      this.refresh();
      document.dispatchEvent(new CustomEvent('bgmchange', {detail:{enabled}}));
      if (enabled && this.active) this.activate();
    }
    targetVolume() {
      const videos = [...document.querySelectorAll('#openingVideo, #selectionPreview video')];
      const base = videos.some(v => !v.paused && !v.ended && !v.muted) ? .26 : .48;
      return base * (performance.now()<this.duckUntil ? .22 : 1);
    }
    refresh() {
      if (!this.context || !this.gain) return;
      clearTimeout(this.stopTimer);
      const audible = this.active && this.enabled && !document.hidden;
      if (audible && this.buffer && !this.source && this.context.state === 'running') {
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.loop = true;
        this.source.connect(this.gain);
        this.startedAt = this.context.currentTime;
        this.source.start(0, this.offset % this.buffer.duration);
      }
      const now = this.context.currentTime;
      this.gain.gain.cancelScheduledValues(now);
      this.gain.gain.setTargetAtTime(audible ? this.targetVolume() : 0, now, performance.now()<this.duckUntil ? .012 : audible ? .18 : .075);
      if (!audible) this.stopTimer = setTimeout(() => {
        if (!this.active || !this.enabled || document.hidden) this.stop();
      }, 350);
    }
    stop() {
      clearTimeout(this.stopTimer);
      if (this.source) {
        this.offset = (this.offset + this.context.currentTime - this.startedAt) % this.buffer.duration;
        this.source.stop();
        this.source.disconnect();
        this.source = null;
      }
      if (this.gain) {
        this.gain.gain.cancelScheduledValues(this.context.currentTime);
        this.gain.gain.value = 0;
      }
    }
  }
  window.menuMusic = new MenuMusic();
})();
