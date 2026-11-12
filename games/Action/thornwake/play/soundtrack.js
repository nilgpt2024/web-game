'use strict';
/* Eight original chamber compositions. Synthesized reeds, bells, low strings,
   clay percussion and earth noise; room changes crossfade through separate buses. */
const chamberScores={
 root:{bpm:72,root:38,scale:[0,1,3,5,7,8,10],phrase:[7,null,9,8,7,null,4,null,7,11,null,9,8,null,6,7],bass:[0,0,1,-2],drums:[0,5],type:'triangle'},
 fungus:{bpm:64,root:42,scale:[0,2,3,6,7,9,10],phrase:[7,11,null,9,null,13,11,null,8,null,10,12,null,9,8,null],bass:[0,3,-2,1],drums:[0],type:'sine'},
 amber:{bpm:82,root:36,scale:[0,1,4,5,7,8,11],phrase:[7,null,8,7,11,10,null,8,7,6,null,4,5,null,8,7],bass:[0,-1,4,1],drums:[0,3,6],type:'triangle'},
 silk:{bpm:58,root:40,scale:[0,1,3,6,7,8,10],phrase:[14,null,null,11,12,null,9,null,13,null,10,null,8,null,7,null],bass:[0,1,-2,-1],drums:[0],type:'sine'},
 market:{bpm:92,root:43,scale:[0,2,3,5,7,8,10],phrase:[7,9,11,9,8,7,6,8,10,8,7,5],bass:[0,3,5,-2],drums:[0,6],type:'triangle',beats:6},
 bath:{bpm:60,root:41,scale:[0,2,4,7,9,12,14],phrase:[7,null,8,null,10,9,null,8,7,null,6,null,4,null,6,null],bass:[0,-2,5,0],drums:[],type:'sine'},
 trial:{bpm:106,root:37,scale:[0,1,3,6,7,8,10],phrase:[7,7,null,8,7,10,null,6,7,null,8,11,10,8,6,null],bass:[0,1,0,-1],drums:[0,3,5,7],type:'triangle'},
 regent:{bpm:126,root:34,scale:[0,1,3,5,6,8,10],phrase:[7,7,11,8,7,6,8,11,12,11,10,8,7,6,4,6],bass:[0,1,-2,3],drums:[0,2,3,4,6,7],type:'sawtooth'}
};
class RootScore {
  constructor(){this.ctx=null;this.enabled=false;this.volume=.65;this.step=0;this.next=0;this.timer=null;this.scene='menu';this.depth=1;this.nodes=new Set();this.room='root';this.warden=false;this.threat=0;this.retired=[];}
  init(){
    if(this.ctx)return;
    const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;
    const c=this.ctx=new Audio();this.master=c.createGain();this.master.gain.value=0;
    const limiter=c.createDynamicsCompressor();limiter.threshold.value=-18;limiter.knee.value=12;limiter.ratio.value=5;limiter.attack.value=.01;limiter.release.value=.3;
    this.master.connect(limiter);limiter.connect(c.destination);
    this.dry=c.createGain();this.dry.gain.value=.7;this.dry.connect(this.master);
    const reverb=c.createConvolver(),impulse=c.createBuffer(2,c.sampleRate*3.8,c.sampleRate);
    let seed=8317;const noise=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296*2-1};
    for(let ch=0;ch<2;ch++){const data=impulse.getChannelData(ch);let smooth=0;for(let i=0;i<data.length;i++){smooth=.65*smooth+.35*noise();data[i]=smooth*Math.pow(1-i/data.length,3)*.65}}
    reverb.buffer=impulse;this.wet=c.createGain();this.wet.gain.value=.35;this.wet.connect(reverb);reverb.connect(this.master);this.roomBus=c.createGain();this.roomBus.connect(this.dry);this.roomBus.connect(this.wet);
    this.noise=c.createBuffer(1,c.sampleRate*2,c.sampleRate);const n=this.noise.getChannelData(0);let brown=0;for(let i=0;i<n.length;i++){brown=(brown+noise()*.035)/1.015;n[i]=brown*3.5}
  }
  connect(node){node.connect(this.roomBus)}
  track(node){this.nodes.add(node);node.onended=()=>{this.nodes.delete(node);try{node.disconnect()}catch{}};return node}
  async enable(){try{this.init();if(!this.ctx)return false;await this.ctx.resume();this.enabled=true;this.master.gain.setTargetAtTime(this.volume*.44,this.ctx.currentTime,.4);if(!this.timer){this.next=this.ctx.currentTime+.07;this.schedule();this.timer=setInterval(()=>this.schedule(),100)}return true}catch{return false}}
  mute(){this.enabled=false;if(!this.ctx)return;this.master.gain.setTargetAtTime(0,this.ctx.currentTime,.08);clearInterval(this.timer);this.timer=null;for(const node of this.nodes){try{node.stop(this.ctx.currentTime+.3)}catch{}}this.nodes.clear()}
  setVolume(value){this.volume=Math.max(0,Math.min(1,value));if(this.ctx&&this.enabled)this.master.gain.setTargetAtTime(this.volume*.44,this.ctx.currentTime,.1)}
  setScene(scene,depth){this.scene=scene;this.depth=depth||1}
  setRoom(room,warden=false){const changed=this.room!==room||this.warden!==warden;this.room=chamberScores[room]?room:'root';this.warden=warden;this.threat=0;if(!changed)return;this.step=0;if(this.ctx){const at=this.ctx.currentTime;this.roomBus.gain.setTargetAtTime(.0001,at,.22);this.retired.push({bus:this.roomBus,until:at+1.6});this.roomBus=this.ctx.createGain();this.roomBus.gain.setValueAtTime(.0001,at);this.roomBus.gain.setTargetAtTime(1,at,.3);this.roomBus.connect(this.dry);this.roomBus.connect(this.wet);this.next=at+.08}}
  setThreat(amount){this.threat=Math.max(0,Math.min(1,amount))}
  tempo(){const p=chamberScores[this.room];return p.bpm+(p.boss?this.threat*22:this.warden?18:0)}
  voice(freq,at,length,volume=.16,type='sine',earth=false){
    const c=this.ctx,o=this.track(c.createOscillator()),g=c.createGain(),filter=c.createBiquadFilter();o.type=type;o.frequency.setValueAtTime(freq,at);filter.type='lowpass';filter.frequency.value=earth?650:2100;
    g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(volume,at+(earth?.45:.015));g.gain.exponentialRampToValueAtTime(.0001,at+length);
    o.connect(filter);filter.connect(g);this.connect(g);o.onended=()=>{this.nodes.delete(o);o.disconnect();filter.disconnect();g.disconnect()};o.start(at);o.stop(at+length+.04);
    if(!earth){const harmonic=this.track(c.createOscillator()),hg=c.createGain();harmonic.frequency.value=freq*2.006;hg.gain.setValueAtTime(volume*.15,at);hg.gain.exponentialRampToValueAtTime(.0001,at+length*.55);harmonic.connect(hg);this.connect(hg);harmonic.onended=()=>{this.nodes.delete(harmonic);harmonic.disconnect();hg.disconnect()};harmonic.start(at);harmonic.stop(at+length*.6)}
  }
  clay(at,accent=false){const c=this.ctx,o=this.track(c.createOscillator()),g=c.createGain();o.frequency.setValueAtTime(accent?115:160,at);o.frequency.exponentialRampToValueAtTime(accent?42:73,at+.2);g.gain.setValueAtTime(accent?.32:.12,at);g.gain.exponentialRampToValueAtTime(.0001,at+.48);o.connect(g);this.connect(g);o.onended=()=>{this.nodes.delete(o);o.disconnect();g.disconnect()};o.start(at);o.stop(at+.5);this.rustle(at,.12,.1,1400)}
  rustle(at,length,volume,cutoff){const c=this.ctx,source=this.track(c.createBufferSource()),filter=c.createBiquadFilter(),gain=c.createGain();source.buffer=this.noise;source.loop=true;filter.type='bandpass';filter.frequency.value=cutoff;filter.Q.value=.7;gain.gain.setValueAtTime(.0001,at);gain.gain.linearRampToValueAtTime(volume,at+Math.min(.2,length*.2));gain.gain.exponentialRampToValueAtTime(.0001,at+length);source.connect(filter);filter.connect(gain);this.connect(gain);source.onended=()=>{this.nodes.delete(source);source.disconnect();filter.disconnect();gain.disconnect()};source.start(at);source.stop(at+length)}
  schedule(){if(!this.enabled||!this.ctx)return;const c=this.ctx;this.retired=this.retired.filter(r=>{if(c.currentTime>r.until){r.bus.disconnect();return false}return true});if(this.next<c.currentTime-.5)this.next=c.currentTime+.05;while(this.next<c.currentTime+.35){this.compose(this.step++,this.next);this.next+=60/this.tempo()/2}}
  compose(step,at){
    const p=chamberScores[this.room],beats=p.beats||8,bar=Math.floor(step/beats)%16,beat=step%beats,quiet=!['playing','shop','spa','menu'].includes(this.scene),boss=!!p.boss&&this.scene==='playing',battle=boss||this.warden&&this.scene==='playing',hz=m=>440*Math.pow(2,(m-69)/12),root=p.root+p.bass[Math.floor(bar/4)],length=60/this.tempo()*beats/2;
    if(beat===0){this.voice(hz(root-12),at,length*1.25,quiet?.07:.14,'sine',true);this.voice(hz(root)*1.003,at,length,.035,'triangle',true);this.rustle(at,Math.min(3,length),this.room==='bath'?.13:.075,this.room==='bath'?1300:260);if(bar%2===0)this.voice(hz(root+7),at,length*1.4,.026,'sine',true)}
    const movement=Math.floor(step/(beats*16))%4;const note=p.phrase[(step+(movement===2?4:movement===3?8:0))%p.phrase.length];if(note!==null){const midi=p.root+12+p.scale[note%7]+12*Math.floor(note/7)+(bar%8===7?-12:0);this.voice(hz(midi),at,boss?.48:this.room==='market'?.8:2.8,(quiet?.047:boss?.075:.09),p.type)}
    if(!quiet&&p.drums.includes(beat))this.clay(at,beat===0||boss&&beat===4);
    if(this.room==='market'&&beat%2===0)this.voice(hz(root+12+(beat===2?7:0)),at,.4,.065,'triangle');
    if(this.room==='fungus'&&beat===5)this.voice(hz(root+31+(bar%3)*2),at,3.8,.045,'sine');
    if(this.room==='silk'&&beat===6)this.voice(hz(root+36+bar%2),at,4,.033,'sine');
    if(this.room==='bath'&&beat===4)this.voice(hz(root+19),at,3.7,.06,'sine');
    if(!quiet&&(this.room==='trial'||battle)&&beat%2===1)this.rustle(at,.11,boss?.12:.075,1700+beat*140);
    if(battle){if(beat%2===0||boss&&this.threat>.6)this.voice(hz(root+12+(beat%4===2?6:0)),at,.21,.085,boss?'sawtooth':'triangle');if(this.warden&&(beat===2||beat===6))this.clay(at,false);if(boss&&beat===0){this.voice(hz(root+19),at,length,.052,'sawtooth',true);this.voice(hz(root+24),at,length,.036,'triangle',true)}if(boss&&this.threat>.6&&beat%2)this.rustle(at,.1,.075,3400)}
    this.orchestrate?.(step,at);
  }
  effect(freq,length,type,volume){if(!this.enabled||!this.ctx)return;this.voice(freq,this.ctx.currentTime+.005,Math.max(.04,length),volume*3,type)}
}
const rootScore=new RootScore();
window.addEventListener('pagehide',()=>rootScore.mute());
