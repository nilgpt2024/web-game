import {Raid} from './raid-engine.mjs?v=5';
import {BOSS_ATTACKS} from './boss-motion.mjs';
import {prepareBossSprite,drawBoss,drawBossTelegraph,drawBossHazards,drawBossEffects} from './boss-render.js';
import {BattleMusic} from './battle-music.mjs?v=1';
import {CutinPlayer} from './cutin-player.mjs?v=4';
import {VictoryFinale,drawVictoryBoss,drawVictoryLight} from './victory-finale.mjs?v=1';
import {VictoryMovie} from './victory-movie.mjs?v=2';
import {SelectionPreview} from './selection-preview.mjs?v=2';
const $=id=>document.getElementById(id),canvas=$('game'),c=canvas.getContext('2d'),music=new BattleMusic(),input={},images={},frames={};
let raid,selected='suzune',audio,se=true,paused=false,shake=0,last=0,particles=[],impact=null,bossEffects=[],cueKey='';
const cutinPlayer=new CutinPlayer($('battleCutin'));
cutinPlayer.onPlayback=()=>music.holdDuck('cutin',.16);
const eyePlayer=new CutinPlayer($('victoryEyes'));
const winMovie=new VictoryMovie($('winMovie'),()=>window.menuMusic?.context||window.uiSfx?.context||audio);
$('winMovieSkip').onclick=()=>winMovie.finish();
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const victory=new VictoryFinale({
 onEyes:()=>{eyePlayer.start(selected,'victory',false,()=>victory.release());},
 onBlast:()=>{eyePlayer.cancel();window.uiSfx?.play('victory');},
 onComplete:()=>beginWinMovie()
});
const selectionPreview=new SelectionPreview($('selectionPreview'),()=>se);
music.enabled=window.menuMusic?.enabled??true;
$('bgm').textContent=music.enabled?'BGM ON':'BGM OFF';
document.addEventListener('bgmchange',e=>{music.enabled=e.detail.enabled;music.refresh();$('bgm').textContent=music.enabled?'BGM ON':'BGM OFF';});
document.addEventListener('uiimpact',e=>{if(e.detail.kind==='deploy')music.duck(e.detail.duration,.26);});
const color=()=>selected==='suzune'?'#f6ce78':'#94e9ff';
function sound(f=160,len=.12){if(!audio||!se)return;const o=audio.createOscillator(),g=audio.createGain();o.type='triangle';o.frequency.setValueAtTime(f,audio.currentTime);o.frequency.exponentialRampToValueAtTime(45,audio.currentTime+len);g.gain.setValueAtTime(.15,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+len);o.connect(g);g.connect(audio.destination);o.start();o.stop(audio.currentTime+len);}
async function unlock(){const owner=raid;try{audio??=window.menuMusic?.context||window.uiSfx?.context||new AudioContext();await audio.resume();if(raid===owner&&raid?.state==='playing'&&!paused)music.start(audio);}catch{}}
document.addEventListener('click',()=>{const context=window.menuMusic?.context||window.uiSfx?.context;if(context)music.prepare(context);},{once:true});
function img(src){return new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=()=>reject(new Error(src));i.src=src;});}
// Remove only neutral background connected to the cell edges, retaining enclosed costume detail.
function prepare(i,punch=false){const result=[];for(let n=0;n<6;n++){const xs=punch?[0,.309,.644,1]:[0,1/3,2/3,1],ys=punch?[0,.475,1]:[0,.5,1],col=n%3,row=Math.floor(n/3),sx=Math.round(xs[col]*i.width),sy=Math.round(ys[row]*i.height),w=Math.round(xs[col+1]*i.width)-sx,h=Math.round(ys[row+1]*i.height)-sy,s=document.createElement('canvas');s.width=w;s.height=h;const g=s.getContext('2d',{willReadFrequently:true});g.drawImage(i,sx,sy,w,h,0,0,w,h);const d=g.getImageData(0,0,w,h),p=d.data,seen=new Uint8Array(w*h),queue=new Int32Array(w*h);let head=0,tail=0;
 const add=k=>{if(k<0||k>=w*h||seen[k])return;seen[k]=1;const z=k*4,a=p[z],b=p[z+1],e=p[z+2];if(Math.max(a,b,e)-Math.min(a,b,e)<24&&Math.min(a,b,e)>(punch?65:118))queue[tail++]=k;};
 for(let x=0;x<w;x++){add(x);add((h-1)*w+x);}for(let y=0;y<h;y++){add(y*w);add(y*w+w-1);}while(head<tail){const k=queue[head++];p[k*4+3]=0;if(k%w)add(k-1);if(k%w<w-1)add(k+1);add(k-w);add(k+w);}g.putImageData(d,0,0);result.push(s);}return result;}
async function load(){try{for(const name of ['suzune','aoi']){images[name]=await img('assets/'+name+'-raid.png');frames[name]=prepare(images[name]);}images.punch=await img('assets/suzune-punch.png');frames.punch=prepare(images.punch,true);images.bg=await img('assets/sky-deck.png');images.boss=await img('assets/colossus-actions.png');frames.boss=prepareBossSprite(images.boss);$('training').disabled=false;$('start').disabled=false;$('start').textContent='出撃';}catch{$('status').textContent='素材を読み込めませんでした。再読み込みしてください。';$('start').textContent='再読み込み';$('start').disabled=false;$('start').onclick=()=>location.reload();}}
function clearInput(){for(const k in input)delete input[k];}
function start(training=false){music.reset();cancelVictory();winMovie.prepareAudio();cutinPlayer.cancel();music.clearDuck();window.uiSfx?.play('deploy');window.menuMusic?.leave();selectionPreview.stop();raid=new Raid(selected,Number($('difficulty').value));raid.training=training===true;if(raid.training){raid.player.x=600;raid.boss.x=810;}particles=[];bossEffects=[];cueKey='';impact=null;paused=false;clearInput();$('menu').hidden=true;$('dialog').hidden=true;$('hud').hidden=false;$('pause').disabled=false;$('name').textContent=selected.toUpperCase()+(raid.training?' / PUNCH PRACTICE':'');unlock();}
function menu(){cancelVictory();cutinPlayer.cancel();music.clearDuck();window.menuMusic?.activate();$('bossCue').hidden=true;raid=null;paused=false;clearInput();music.stop();$('menu').hidden=false;$('dialog').hidden=true;$('hud').hidden=true;$('pause').disabled=true;}
function pause(){if(!raid||(raid.state!=='playing'&&!victory.active&&!winMovie.active))return;paused=!paused;winMovie.setPaused(paused);eyePlayer.setPaused(paused);if(paused&&victory.active)window.uiSfx?.stop();cutinPlayer.setPaused(paused);if(!paused&&cutinPlayer.active)music.holdDuck('cutin',.16);clearInput();$('dialog').hidden=!paused;$('title').textContent='PAUSED';$('message').textContent='';$('resume').hidden=false;if(paused)music.stop();else if(!victory.active&&!winMovie.active)unlock();}
function cancelVictory(){winMovie.cancel();victory.cancel();eyePlayer.cancel();window.uiSfx?.stop();document.querySelector('main').classList.remove('finishing');}
function beginVictory(){
 if(victory.active)return;
 cutinPlayer.cancel();clearInput();music.stop();music.clearDuck();window.uiSfx?.stop();
 particles=[];bossEffects=[];impact=null;shake=0;$('bossCue').hidden=true;$('hud').hidden=true;$('dialog').hidden=true;
 document.querySelector('main').classList.add('finishing');
 victory.start({kind:selected,bossX:raid.boss.x,playerX:raid.player.x,face:raid.player.x<raid.boss.x?1:-1});
}
function beginWinMovie(){
 const owner=raid;clearInput();music.stop();window.uiSfx?.stop();
 document.querySelector('main').classList.add('finishing');
 winMovie.start(selected,'win',se,()=>{if(raid===owner)result();});
}
function result(){winMovie.cancel();eyePlayer.cancel();document.querySelector('main').classList.remove('finishing');cutinPlayer.cancel();music.clearDuck();$('bossCue').hidden=true;music.stop();$('pause').disabled=true;$('dialog').hidden=false;$('resume').hidden=true;$('title').textContent=raid.state==='won'?'MISSION CLEAR':'TRY AGAIN';$('message').textContent=raid.state==='won'?selected.toUpperCase()+' / '+Math.floor(raid.time)+'秒':'攻撃の予告を見て、ジャンプや回避で切り抜けよう。';}
$('start').onclick=()=>start();$('retry').onclick=()=>start(raid?.training);$('training').onclick=()=>{selected='suzune';selectionPreview.select(selected,false);document.querySelectorAll('[data-char]').forEach(x=>{const yes=x.dataset.char===selected;x.classList.toggle('selected',yes);x.setAttribute('aria-pressed',yes);});start(true);};$('select').onclick=menu;$('pause').onclick=pause;$('resume').onclick=pause;
document.querySelectorAll('[data-char]').forEach(b=>b.onclick=()=>{window.menuMusic?.activate();selected=b.dataset.char;window.uiSfx?.play('select',selected);selectionPreview.select(selected,true);document.querySelectorAll('[data-char]').forEach(x=>{const yes=x===b;x.classList.toggle('selected',yes);x.setAttribute('aria-pressed',yes);});});
$('bgm').onclick=()=>{const enabled=music.toggle();$('bgm').textContent=enabled?'BGM ON':'BGM OFF';window.menuMusic?.setEnabled(enabled);};$('se').onclick=()=>{se=!se;window.uiSfx?.setEnabled(se);$('se').textContent=se?'SE ON':'SE OFF';selectionPreview.setSound(se);cutinPlayer.setSound(se);winMovie.setSound(se);};
$('full').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.querySelector('main').requestFullscreen();}catch{$('status').textContent='この端末では全画面に対応していません。';}};
const keys={KeyA:'left',ArrowLeft:'left',KeyD:'right',ArrowRight:'right',KeyW:'jump',ArrowUp:'jump',KeyS:'guard',ArrowDown:'guard',KeyJ:'attack',KeyK:'heavy',KeyL:'special',KeyU:'ultimate'};
function beginCutin(move){
 const owner=raid;clearInput();music.holdDuck('cutin',.16);
 const movie=cutinPlayer.start(selected,move,se,()=>{if(raid!==owner)return;raid.freeze=0;clearInput();music.duck(.55,.4);music.releaseDuck('cutin');sound(250,.16);});
 if(!movie){music.releaseDuck('cutin');music.duck(.65,.25);sound(650,.25);}
}
function press(k){if(!raid||paused||cutinPlayer.active||victory.active||winMovie.active)return;input[k]=true;if(['attack','heavy','special','ultimate'].includes(k)){
 raid.attack(k);const event=raid.events.find(e=>e.type==='cutin'&&!e.handled);
 if(event){event.handled=true;beginCutin(event.move);}
}}
document.addEventListener('keydown',e=>{if(/INPUT|SELECT|BUTTON/.test(e.target.tagName)&&(!raid||paused))return;if(e.code==='KeyP'&&!e.repeat)pause();const k=keys[e.code];if(k&&raid){e.preventDefault();if(!e.repeat)press(k);}});
document.addEventListener('keyup',e=>{delete input[keys[e.code]];});window.addEventListener('blur',()=>{clearInput();if(raid&&!paused&&(raid.state==='playing'||victory.active||winMovie.active))pause();});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&raid&&!paused&&(raid.state==='playing'||victory.active||winMovie.active))pause();});
document.querySelectorAll('[data-key]').forEach(b=>{b.onpointerdown=e=>{e.preventDefault();b.setPointerCapture(e.pointerId);press(b.dataset.key);};b.onpointerup=b.onpointercancel=b.onlostpointercapture=()=>{delete input[b.dataset.key];};});
function rect(x,y,w,h,fill){c.fillStyle=fill;c.fillRect(x,y,w,h);}
function glow(x,y,r,fill){c.save();c.shadowBlur=24;c.shadowColor=fill;c.fillStyle=fill;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.restore();}
function text(t,x,y,size=20,fill='#fff'){c.font='bold '+size+'px Arial';c.fillStyle=fill;c.fillText(t,x,y);}
function updateBossCue(b){
 const cue=$('bossCue'),a=b.action;
 if(victory.active||cutinPlayer.active||!a||raid.training||raid.state!=='playing'){cue.hidden=true;cueKey='';return;}
 cue.hidden=false;const key=a.id+':'+a.stage;
 if(key!==cueKey){
  cueKey=key;const def=BOSS_ATTACKS[a.id];cue.dataset.stage=a.stage;
  $('bossCueName').textContent=a.stage==='recovery'?'反撃チャンス':def.label;
  $('bossCueHint').textContent=a.stage==='recovery'?'ボスが体勢を戻す間に攻撃':a.stage==='active'?'攻撃中':def.hint;
 }
 const total=a.stage==='windup'?a.windup:a.stage==='active'?a.active:a.recovery;
 $('bossCueFill').style.transform='scaleX('+Math.min(1,a.t/total)+')';
}
function bossSound(move,impact=false){
 if(!audio||!se)return;
 const duration=impact?.25:.16,buffer=audio.createBuffer(1,Math.ceil(audio.sampleRate*duration),audio.sampleRate),data=buffer.getChannelData(0);
 for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*Math.pow(1-i/data.length,impact?2.5:1.5);
 const source=audio.createBufferSource(),filter=audio.createBiquadFilter(),gain=audio.createGain();source.buffer=buffer;
 filter.type=impact?'lowpass':'bandpass';filter.frequency.value=impact?600:move===0?1400:2200;gain.gain.value=impact?.3:.19;
 source.connect(filter);filter.connect(gain);gain.connect(audio.destination);source.start();sound(impact?65:move===2?450:180,impact?.28:.17);
}
function render(dt,t){c.clearRect(0,0,1280,720);let cam=raid?Math.max(0,Math.min(1120,raid.player.x-440)):280;if(victory.active){const target=Math.max(0,Math.min(1120,victory.bossX-720));cam+=(target-cam)*victory.focus;}
 c.save();if(victory.active&&!reducedMotion.matches){const focusX=victory.bossX-cam,zoom=1+.13*victory.focus;c.translate(focusX,370);c.scale(zoom,zoom);c.translate(-focusX,-370);if(victory.phase==='blast'){const kick=15*Math.exp(-victory.t*7);c.translate(Math.sin(victory.t*90)*kick,Math.cos(victory.t*75)*kick*.45);}}
 if(shake>0){c.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);shake=Math.max(0,shake-dt*50);}
 if(images.bg){const i=images.bg;c.drawImage(i,0,0,i.width,i.height,-cam*.14,-35,1500,760);}else rect(0,0,1280,720,'#60696c');rect(0,590,1280,130,'#343a3d');rect(0,590,1280,5,'#d2d9d7');for(let x=-cam%180;x<1280;x+=180){rect(x,600,2,120,'#6b7478');rect(x+20,610,100,3,'#a5b9bb');}text('TOKYO SKY DECK',35,686,15,'#c6d4d9');
 if(raid){const p=raid.player,b=raid.boss;drawBossTelegraph(c,b,cam,t,raid.hazards);drawVictoryBoss(c,b,cam,frames.boss,drawBoss,victory,t);updateBossCue(b);const punch=raid.punch,pt=(punch?.t||0)+(victory.active?victory.motionTime:0),pi=pt<.07?0:pt<.14?1:pt<.19?2:pt<.33?3:5;const f=punch?frames.punch?.[pi]:selected==='suzune'&&p.pose===0?frames.punch?.[0]:frames[selected]?.[p.pose];if(f){c.save();c.translate(p.x-cam,596-p.y);c.scale(p.face,1);if(p.inv>0)c.globalAlpha=.55+.4*Math.sin(t*40);const bounce=p.pose===1?Math.sin(t*22)*6:Math.sin(t*2)*2;if(punch||(selected==='suzune'&&p.pose===0)){const fw=345*f.width/f.height;c.drawImage(f,-fw/2,-345,fw,345);}else c.drawImage(f,-180,-345+bounce,360,345);c.restore();}
 for(const s of (victory.active?[]:raid.shots)){glow(s.x-cam,590-s.y,s.r,color());rect(s.x-cam-Math.sign(s.v)*80,584-s.y,80,7,color());}
 drawBossHazards(c,raid.hazards,cam);
 $('hp').value=p.hp;$('boss').value=b.hp;$('ex').value=p.ex;$('charge').textContent=Math.floor(p.ex)+'%';$('phase').textContent='PHASE 0'+b.phase;
 }
 drawBossEffects(c,bossEffects,cam,dt);
 if(impact){impact.life-=dt;const x=impact.x-cam,y=impact.y;c.save();c.globalAlpha=Math.max(0,impact.life/.28);c.strokeStyle='#fff5c0';c.lineWidth=5;c.beginPath();for(let n=0;n<12;n++){const a=n*Math.PI/6;c.moveTo(x+Math.cos(a)*12,y+Math.sin(a)*12);c.lineTo(x+Math.cos(a)*(55+(n%2)*25),y+Math.sin(a)*(55+(n%2)*25));}c.stroke();text('65',x+20,y-50-(.28-impact.life)*80,36,'#fff4c7');c.restore();if(impact.life<=0)impact=null;}
 particles=particles.filter(p=>p.life>0);for(const p of particles){p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=400*dt;c.globalAlpha=Math.max(0,p.life);rect(p.x-cam,p.y,5,5,p.color);}c.globalAlpha=1;drawVictoryLight(c,victory,cam,reducedMotion.matches);c.restore();

}
function tick(ms){const dt=Math.min((ms-last)/1000,.04);last=ms;winMovie.update(paused?0:dt);eyePlayer.update(paused?0:dt);if(!paused)victory.update(dt);cutinPlayer.update(paused?0:dt);if(raid&&!paused){if(!cutinPlayer.active&&!victory.active)raid.step(dt,input);for(const e of raid.events){
if(raid.state==='won'){if(e.type==='won')beginVictory();continue;}
if(e.type==='boss-attack'){bossSound(e.move);if(e.move===0)bossEffects.push({kind:'swipe',x:e.x,face:e.face,t:.26,duration:.26});if(e.move===2)bossEffects.push({kind:'muzzle',x:e.x+e.face*153,t:.2,duration:.2});}
if(e.type==='boss-impact'){if(se)music.duck(.3,.65);bossSound(e.move,true);shake=e.move===2?15:12;bossEffects.push({kind:'impact',move:e.move,x:e.x,t:.48,duration:.48});for(let i=0;i<24;i++)particles.push({x:e.x,y:582,vx:(Math.random()-.5)*500,vy:-Math.random()*300,life:.65,color:'#e9cda2'});}
if(e.type==='warning')sound(400,.09);
if(e.type==='boss-phase'){shake=8;sound(250,.25);}
if(e.type==='swing')sound(380,.1);if(e.type==='punch-hit'){impact={...e,life:.28};shake=10;sound(85,.25);}if(e.type==='cutin'&&!e.handled)beginCutin(e.move);if(e.type==='hit'||e.type==='impact'){if(se)music.duck(.24,.65);shake=16;sound(100,.2);for(let i=0;i<35;i++)particles.push({x:e.x,y:400,vx:(Math.random()-.5)*700,vy:-Math.random()*500,life:.8,color:color()});}if(e.type==='hurt'){shake=22;sound(65,.3);}if(e.type==='attack'&&!cutinPlayer.active)sound(250);if(e.type==='lost')result();}raid.events=[];}render(paused||cutinPlayer.active||raid?.hitstop>0?0:dt*victory.visualScale,raid?raid.time:ms/1000);requestAnimationFrame(tick);}
load();requestAnimationFrame(tick);
