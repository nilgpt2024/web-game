import { Game, HEIGHT, clamp } from './engine.js';

const $ = id => document.getElementById(id);
const canvas = $('game'), ctx = canvas.getContext('2d', { alpha: false });
const game = new Game();
const input = { left: false, right: false, jump: false, dash: false };
const keys = new Set(), pointerInputs = new Map();
const art = {};
const frames = { idle: [63,12,312,496], run1: [550,15,394,493], run2: [1061,18,396,483], jump: [80,528,375,451], enemy: [621,684,293,265], victory: [1096,530,327,473] };
let viewWidth = 1280, pixelRatio = 1, camera = 0, visualTime = 0, lastTime = 0, accumulator = 0;
let ready = false, particles = [], rings = [], labels = [], toastTimer = 0, screenShake = 0, lastUI = '';
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

class Sound {
  constructor() { this.enabled = false; this.context = null; this.nextBeat = 0; this.beat = 0; }
  unlock() { if (!this.enabled) return; try { this.context ||= new (window.AudioContext || window.webkitAudioContext)(); if (this.context.state === 'suspended') this.context.resume().catch(() => {}); } catch { this.enabled = false; } }
  note(frequency, duration = .12, type = 'sine', volume = .055, offset = 0) {
    if (!this.enabled || !this.context || this.context.state !== 'running') return;
    const t = this.context.currentTime + offset, oscillator = this.context.createOscillator(), gain = this.context.createGain();
    oscillator.type = type; oscillator.frequency.setValueAtTime(frequency, t);
    gain.gain.setValueAtTime(0, t); gain.gain.linearRampToValueAtTime(volume, t + .009); gain.gain.exponentialRampToValueAtTime(.0001, t + duration);
    oscillator.connect(gain); gain.connect(this.context.destination); oscillator.start(t); oscillator.stop(t + duration + .02);
  }
  play(type) {
    if (type === 'coin') { this.note(1046,.09,'sine',.065); this.note(1568,.16,'sine',.05,.065); }
    if (type === 'jump') { this.note(440,.09,'triangle'); this.note(660,.1,'triangle',.03,.035); }
    if (type === 'doublejump') { this.note(660,.1,'triangle'); this.note(1046,.18,'sine',.04,.05); }
    if (type === 'stomp') this.note(150,.15,'triangle',.08);
    if (type === 'hurt') { this.note(175,.2,'sawtooth',.018); this.note(115,.25,'triangle',.07,.05); }
    if (['gem','checkpoint','heart'].includes(type)) [660,880,1320].forEach((n,i) => this.note(n,.2,'sine',.05,i*.09));
    if (['clear','won'].includes(type)) [523,659,784,1046,1318].forEach((n,i) => this.note(n,.4,'triangle',.045,i*.12));
  }
  tick() {
    if (!this.enabled || !this.context || game.state !== 'playing') return;
    const t = this.context.currentTime;
    if (t < this.nextBeat) return;
    const melody = [523,0,784,659,0,587,0,784,523,0,1046,880,784,0,659,0];
    const n = melody[this.beat % melody.length];
    if (n) this.note(n,.27,'sine',.012);
    if (this.beat % 4 === 0) this.note([130.8,164.8,146.8,174.6][Math.floor(this.beat / 4) % 4],.65,'triangle',.013);
    this.beat++; this.nextBeat = t + .28;
  }
}
const sound = new Sound();

function syncInput() {
  const touch = new Set(pointerInputs.values());
  input.left = keys.has('ArrowLeft') || keys.has('KeyA') || touch.has('left');
  input.right = keys.has('ArrowRight') || keys.has('KeyD') || touch.has('right');
  input.jump = keys.has('Space') || keys.has('ArrowUp') || keys.has('KeyW') || touch.has('jump');
  input.dash = keys.has('ShiftLeft') || keys.has('ShiftRight') || touch.has('dash');
}
function resetInput() { keys.clear(); pointerInputs.clear(); syncInput(); document.querySelectorAll('.touch-button').forEach(b => b.classList.remove('pressed')); }
function toast(message, duration = 3.2) { $('toast').textContent = message; $('toast').classList.add('visible'); toastTimer = duration; }
function burst(x,y,color,count=12,power=120) {
  for(let i=0;i<(reducedMotion?4:count);i++) { const a=Math.random()*Math.PI*2,s=power*(.3+Math.random()); particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-40,life:.45+Math.random()*.4,max:1,color,size:2+Math.random()*3}); }
}
function floatLabel(text,x,y,color='#fff2bd') { labels.push({text,x,y,life:1,color}); }
function handleEvents() {
  for (const e of game.drainEvents()) {
    sound.play(e.type);
    if (e.type === 'coin') { burst(e.x,e.y,'#ffdc84',8,90); floatLabel('+1',e.x,e.y); }
    if (e.type === 'gem') { burst(e.x,e.y,'#8efff6',24,200); floatLabel('STAR!',e.x,e.y,'#96fff5'); toast(`星のかけら ${game.levelGems} / 3 を見つけた！`); }
    if (e.type === 'jump') burst(e.x,e.y,'#c0a8ff',6,90);
    if (e.type === 'doublejump') { burst(e.x,e.y,'#83eeff',17,170); rings.push({x:e.x,y:e.y,life:.45}); }
    if (e.type === 'stomp') { burst(e.x,e.y,'#bc83ff',18,160); floatLabel('NICE!',e.x,e.y,'#d2b0ff'); }
    if (e.type === 'hurt') { burst(e.x,e.y,'#ffa5c5',12,150); screenShake = reducedMotion ? 0 : .2; }
    if (e.type === 'heart') { burst(e.x,e.y,'#ffaadd',18,160); floatLabel('♥ +1',e.x,e.y,'#ffbaf3'); toast('ライフ回復！'); }
    if (e.type === 'checkpoint') { burst(e.x,e.y,'#8cffe4',26,180); toast('チェックポイント！ ここから再開できるよ'); }
    if (e.type === 'respawn') { camera = clamp(game.player.x-viewWidth*.32,0,game.level.length-viewWidth); toast('もう一度、いこう！',2); }
    if (['start','retry','level'].includes(e.type)) { camera=0; particles=[]; rings=[]; labels=[]; toast(e.type==='start'?'← → で移動・ジャンプを2回押すと2段ジャンプ':`WORLD 0${game.levelIndex+1} — ${game.level.name}`,4.2); }
    if (['clear','won','gameover'].includes(e.type)) { resetInput(); showModal(); }
    if (e.type === 'won') { for(let i=0;i<70;i++) burst(camera+Math.random()*viewWidth,100+Math.random()*350,['#8af5ed','#bf9bff','#ffdb82'][i%3],2,90); }
  }
}

function updateHUD() {
  const ui = [game.coins,game.levelGems,game.lives,game.levelIndex,game.state].join('|');
  if (lastUI !== ui) {
    $('coinCount').textContent=String(game.coins).padStart(2,'0'); $('gemCount').textContent=game.levelGems;
    $('hearts').setAttribute('aria-label',`ライフ ${game.lives}`);
    [...$('hearts').children].forEach((heart,i)=>heart.classList.toggle('empty',i>=game.lives));
    $('worldNumber').textContent=`WORLD 0${game.levelIndex+1} / 03`; $('worldName').textContent=game.level.name;
    $('pauseButton').disabled=!['playing','paused'].includes(game.state);
    lastUI=ui;
  }
  $('progressFill').style.width=`${game.state==='start'?0:clamp(game.player.x/game.level.goal.x*100,0,100)}%`;
}
function showModal() {
  const state=game.state, config={
    paused:['TAKE A BREATHER','Ⅱ','ひとやすみ','冒険の続きは、いつでも。','冒険に戻る','このステージをやり直す'],
    gameover:['ONE MORE ADVENTURE','↻','もう一度、いこう！','FANGの冒険は、まだ終わらない。','このステージに再挑戦','タイトルに戻る'],
    clear:['WORLD COMPLETE','✦','ステージクリア！',game.levelGems===3?'星のかけらを全部集めたね！':'光のゲートにたどり着いた！','次のステージへ','このステージをもう一度'],
    won:['ADVENTURE COMPLETE','✧','冒険、コンプリート！',game.totalGems===9?'9つの星をすべて集めた、最高の冒険！':'FANGと一緒に、3つの世界を駆け抜けた。','もう一度冒険する','タイトルに戻る'],
  }[state];
  if(!config) return;
  ['modalEyebrow','modalIcon','modalTitle','modalText','modalPrimary','modalSecondary'].forEach((id,i)=>$(id).textContent=config[i]);
  const results=['clear','won'].includes(state); $('resultStats').classList.toggle('hidden',!results);
  if(results) $('resultStats').innerHTML=`<span>✦ ${game.coins}<small>コイン</small></span><span>◆ ${state==='won'?game.totalGems:game.levelGems} / ${state==='won'?9:3}<small>星のかけら</small></span>`;
  $('modal').classList.remove('hidden'); $('pauseButton').setAttribute('aria-label','ゲームは一時停止中');
  $('modalPrimary').focus({preventScroll:true});
}
function hideModal() { $('modal').classList.add('hidden'); $('pauseButton').setAttribute('aria-label','一時停止'); canvas.focus({preventScroll:true}); }
function startGame() { if(!ready)return; resetInput(); sound.unlock(); game.start(); $('startScreen').classList.add('hidden'); hideModal(); handleEvents(); }
function goToTitle() { resetInput(); game.coins=0;game.totalGems=0;game.lives=3;game.loadLevel(0);game.state='start';camera=0;particles=[];labels=[];rings=[];$('modal').classList.add('hidden');$('startScreen').classList.remove('hidden');$('toast').classList.remove('visible');$('startButton').focus({preventScroll:true}); }
function togglePause() { if(!['playing','paused'].includes(game.state))return; game.pause();resetInput();if(game.state==='paused')showModal();else hideModal(); }

$('startButton').addEventListener('click',startGame);
$('pauseButton').addEventListener('click',togglePause);
$('modalPrimary').addEventListener('click',()=>{ sound.unlock();const state=game.state;hideModal();resetInput();if(state==='paused')game.pause();else if(state==='gameover')game.retry();else if(state==='clear')game.nextLevel();else startGame();handleEvents(); });
$('modalSecondary').addEventListener('click',()=>{ const state=game.state;if(['won','gameover'].includes(state))goToTitle();else{hideModal();resetInput();game.retry();handleEvents();} });
$('soundButton').addEventListener('click',()=>{sound.enabled=!sound.enabled;if(sound.enabled)sound.unlock();$('soundButton').setAttribute('aria-pressed',String(sound.enabled));$('soundButton').setAttribute('aria-label',sound.enabled?'音をオフにする':'音をオンにする');$('soundLabel').textContent=sound.enabled?'音 ON':'音 OFF';if(sound.enabled)sound.note(880,.18);});

document.addEventListener('keydown',e=>{
  if(e.code==='Tab'&&!$('modal').classList.contains('hidden')) { e.preventDefault();const a=$('modalPrimary'),b=$('modalSecondary');(document.activeElement===a?b:a).focus();return; }
  if(e.code==='Escape'||e.code==='KeyP'){if(e.repeat)return;if($('gameFrame').classList.contains('immersive')&&e.code==='Escape'){exitImmersive();return;}togglePause();return;}
  const actionKeys=['ArrowLeft','ArrowRight','ArrowUp','Space','KeyA','KeyD','KeyW','ShiftLeft','ShiftRight'];
  if(!actionKeys.includes(e.code))return;
  if(game.state!=='playing')return;
  // Buttons retain their normal Enter/Space activation while focused.
  if(e.target instanceof HTMLButtonElement&&e.code==='Space')return;
  e.preventDefault();if(!e.repeat&&['Space','ArrowUp','KeyW'].includes(e.code))game.jump();keys.add(e.code);syncInput();
});
document.addEventListener('keyup',e=>{keys.delete(e.code);syncInput();});
for(const button of document.querySelectorAll('[data-input]')){
  button.addEventListener('pointerdown',e=>{e.preventDefault();if(game.state!=='playing')return;button.setPointerCapture(e.pointerId);pointerInputs.set(e.pointerId,button.dataset.input);button.classList.add('pressed');syncInput();if(button.dataset.input==='jump')game.jump();sound.unlock();});
  const release=e=>{pointerInputs.delete(e.pointerId);button.classList.remove('pressed');syncInput();};
  button.addEventListener('pointerup',release);button.addEventListener('pointercancel',release);button.addEventListener('lostpointercapture',release);
  button.addEventListener('contextmenu',e=>e.preventDefault());
}
canvas.addEventListener('pointerdown',()=>canvas.focus({preventScroll:true}));
document.addEventListener('visibilitychange',()=>{if(document.hidden&&game.state==='playing')togglePause();resetInput();});
window.addEventListener('blur',()=>{if(game.state==='playing')togglePause();resetInput();});

let exitButton=null,fullscreenFallback=false;
function activateFullscreenUI(){document.body.classList.add('in-fullscreen');$('gameFrame').append($('touchControls'));if(!exitButton){exitButton=document.createElement('button');exitButton.className='exit-immersive';exitButton.textContent='全画面を終了';exitButton.addEventListener('click',exitImmersive);$('gameFrame').append(exitButton);} resize();}
function clearFullscreenUI(){document.body.classList.remove('in-fullscreen');$('gameFrame').after($('touchControls'));exitButton?.remove();exitButton=null;resize();}
function exitImmersive(){if(document.fullscreenElement){document.exitFullscreen().catch(()=>{});}else{$('gameFrame').classList.remove('immersive');fullscreenFallback=false;clearFullscreenUI();} }
$('fullscreenButton').addEventListener('click',async()=>{const frame=$('gameFrame');if(document.fullscreenElement||fullscreenFallback){exitImmersive();return;}try{if(!frame.requestFullscreen)throw new Error('fullscreen fallback');await frame.requestFullscreen();}catch{frame.classList.add('immersive');fullscreenFallback=true;activateFullscreenUI();}});
document.addEventListener('fullscreenchange',()=>{if(document.fullscreenElement)activateFullscreenUI();else clearFullscreenUI();});

function roundedRect(x,y,w,h,r,fill,stroke){ctx.beginPath();ctx.roundRect(x,y,w,h,r);if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.stroke();}}
function sprite(name,x,feet,height,flip=false,alpha=1,rotation=0){const f=frames[name],width=height*f[2]/f[3];ctx.save();ctx.globalAlpha=alpha;ctx.translate(x,feet);ctx.scale(flip?-1:1,1);ctx.rotate(rotation);ctx.drawImage(art.sprites,...f,-width/2,-height,width,height);ctx.restore();}
function star(x,y,r,fill){ctx.fillStyle=fill;ctx.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4-Math.PI/2,d=i%2?r*.28:r;const px=x+Math.cos(a)*d,py=y+Math.sin(a)*d;i?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.closePath();ctx.fill();}
function drawBackground(){
  ctx.fillStyle='#171d49';ctx.fillRect(0,0,viewWidth,HEIGHT);
  if(art.world){const scale=Math.max((viewWidth+280)/art.world.width,HEIGHT/art.world.height);ctx.drawImage(art.world,-camera*.052,-20,art.world.width*scale,art.world.height*scale);}
  if(game.level.tint!=='transparent'){ctx.fillStyle=game.level.tint;ctx.fillRect(0,0,viewWidth,HEIGHT);}
  const fade=ctx.createLinearGradient(0,0,0,HEIGHT);fade.addColorStop(0,'#080d2a20');fade.addColorStop(.5,'#0a103900');fade.addColorStop(1,'#070a202b');ctx.fillStyle=fade;ctx.fillRect(0,0,viewWidth,HEIGHT);
  for(let i=0;i<28;i++){const x=((i*177.73-camera*.2+Math.sin(visualTime*.12+i)*20)%(viewWidth+100)+viewWidth+100)%(viewWidth+100)-50,y=130+(i*53.33)%450+Math.sin(visualTime*.4+i)*12;ctx.globalAlpha=.12+Math.sin(visualTime+i)*.09;ctx.fillStyle=i%3?'#d6d7ff':'#86ffef';ctx.beginPath();ctx.arc(x,y,1.5+i%2,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;
}
function drawPlatform(s){
  if(s.x+s.w<camera-60||s.x>camera+viewWidth+60)return;
  const x=s.x,y=s.y-(s.bump||0),c=game.level.color;
  if(s.kind==='block'){
    const g=ctx.createLinearGradient(x,y,x+43,y+43);g.addColorStop(0,s.used?'#3b3454':'#7660bc');g.addColorStop(1,s.used?'#26223b':'#433569');
    ctx.lineWidth=1.5;roundedRect(x,y,43,43,7,g,s.used?'#60516f':'#b59adf');roundedRect(x+5,y+5,33,33,4,null,s.used?'#4a405d':'#ac8ee36b');
    ctx.font='700 30px sans-serif';ctx.textAlign='center';ctx.fillStyle=s.used?'#756782':'#eee1ff';ctx.fillText(s.used?'·':'+',x+21.5,y+31);return;
  }
  const h=s.kind==='ground'?105+(s.w%45):24,g=ctx.createLinearGradient(x,y,x,y+h);g.addColorStop(0,'#3b3154');g.addColorStop(.4,'#27243f');g.addColorStop(1,'#191b36');
  ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x,y+5);ctx.lineTo(x+s.w,y+5);ctx.lineTo(x+s.w-9,y+h*.54);ctx.lineTo(x+s.w-26,y+h);ctx.lineTo(x+31,y+h-5);ctx.lineTo(x+7,y+h*.6);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#74618b55';ctx.lineWidth=1;ctx.stroke();
  if(s.kind==='ground') {for(let a=25;a<s.w-10;a+=65){ctx.strokeStyle='#87729725';ctx.beginPath();ctx.moveTo(x+a,y+18);ctx.lineTo(x+a-7,y+52);ctx.lineTo(x+a+9,y+78);ctx.stroke();}ctx.fillStyle='#a892e112';ctx.fillRect(x+8,y+16,s.w-16,2);}
  ctx.shadowBlur=12;ctx.shadowColor=c;roundedRect(x-2,y,s.w+4,6,3,c);ctx.shadowBlur=0;
  roundedRect(x+2,y+6,s.w-4,7,2,'#4d8083');ctx.fillStyle='#c6ffe960';ctx.fillRect(x+7,y+1,s.w-14,2);
  if(s.motion){ctx.fillStyle='#70dbe557';for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(x+s.w/2+(i-1)*8,y+17,1.5,0,Math.PI*2);ctx.fill();}}
}
function drawItems(){
  for(const item of game.level.items){if(item.taken||item.x<camera-40||item.x>camera+viewWidth+40)continue;const y=item.y+Math.sin(visualTime*3+item.x*.02)*4;
    ctx.save();ctx.translate(item.x,y);
    if(item.type==='coin'){ctx.scale(.65+Math.abs(Math.sin(visualTime*2+item.x*.01))*.35,1);ctx.shadowBlur=13;ctx.shadowColor='#efbd5366';const g=ctx.createLinearGradient(-12,-12,12,12);g.addColorStop(0,'#ffedaa');g.addColorStop(1,'#dc9b40');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,12,14,0,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle='#fff1b8';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(0,0,8,10,0,0,Math.PI*2);ctx.stroke();star(0,0,6,'#a96b35');}
    else{ctx.shadowColor='#80fff0';ctx.shadowBlur=18;ctx.fillStyle='#8affef';ctx.beginPath();ctx.moveTo(0,-21);ctx.lineTo(14,-2);ctx.lineTo(0,21);ctx.lineTo(-14,-2);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#d6fffa';ctx.beginPath();ctx.moveTo(0,-21);ctx.lineTo(0,21);ctx.lineTo(-14,-2);ctx.closePath();ctx.fill();star(-21,-13,4,'#befff5');star(24,8,3,'#befff5');}ctx.restore();
  }
}
function drawGate(){const {x,y}=game.level.goal,t=visualTime;ctx.save();ctx.translate(x+35,y);ctx.shadowColor='#b899ff';ctx.shadowBlur=27;ctx.strokeStyle='#c3a0ff';ctx.lineWidth=6;ctx.beginPath();ctx.ellipse(0,-67,36,62,0,0,Math.PI*2);ctx.stroke();ctx.lineWidth=1.5;ctx.strokeStyle='#e6d4ff';ctx.beginPath();ctx.ellipse(0,-67,29,54,0,0,Math.PI*2);ctx.stroke();ctx.shadowBlur=0;const g=ctx.createRadialGradient(0,-67,0,0,-67,60);g.addColorStop(0,'#b095ff77');g.addColorStop(1,'#6748ad00');ctx.fillStyle=g;ctx.fillRect(-45,-135,90,133);star(0,-68,19+Math.sin(t*2)*2,'#f1e7ff');ctx.font='600 13px "Noto Sans JP",sans-serif';ctx.textAlign='center';ctx.fillStyle='#e1d4ff';ctx.fillText('GOAL',0,-155);for(let i=0;i<5;i++)star(Math.sin(t+i*1.5)*42,-65+Math.cos(t+i*1.5)*60,2,'#dfd1ff');ctx.restore();}
function drawCheckpoint(){const c=game.level.checkpoint;ctx.save();ctx.translate(c.x,c.y);ctx.strokeStyle=c.active?'#a9ffe7':'#8476b6';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,-3);ctx.lineTo(0,-77);ctx.stroke();ctx.fillStyle=c.active?'#8be8d4':'#4f4868';ctx.shadowColor='#85edda';ctx.shadowBlur=c.active?18:0;ctx.beginPath();ctx.moveTo(0,-101);ctx.lineTo(15,-84);ctx.lineTo(0,-66);ctx.lineTo(-15,-84);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.fillStyle=c.active?'#164c48':'#cabcf2';ctx.font='700 21px sans-serif';ctx.textAlign='center';ctx.fillText('+',0,-76);ctx.font='600 11px sans-serif';ctx.fillStyle='#cabee4';ctx.fillText(c.active?'SAVED':'CHECKPOINT',0,-116);ctx.restore();}
function drawPlayer(){const p=game.player;let frame=p.grounded?(Math.abs(p.vx)>25?(Math.floor(p.run)%2?'run1':'run2'):'idle'):'jump';if(['clear','won'].includes(game.state))frame='victory';const bounce=p.grounded&&Math.abs(p.vx)>30?Math.sin(p.run*Math.PI)*2:0;
  if(p.grounded){ctx.fillStyle='#0b0b2c80';ctx.beginPath();ctx.ellipse(p.x+p.w/2,p.y+p.h+2,24,5,0,0,Math.PI*2);ctx.fill();}
  let alpha=p.invulnerable>0&&game.state==='playing'&&Math.sin(visualTime*30)>0?.45:1;
  if(input.dash&&Math.abs(p.vx)>350&&game.state==='playing'&&!reducedMotion){sprite(frame,p.x+p.w/2-p.facing*28,p.y+p.h+bounce,94,p.facing<0,.12);sprite(frame,p.x+p.w/2-p.facing*15,p.y+p.h+bounce,94,p.facing<0,.2);}
  sprite(frame,p.x+p.w/2,p.y+p.h+bounce,94,p.facing<0,alpha,p.grounded?0:p.vx*.00009);
}
function drawWorld(){ctx.save();ctx.translate(-camera,0);
  if(ready){game.level.platforms.forEach(drawPlatform);drawItems();drawCheckpoint();drawGate();
    for(const e of game.level.enemies){if(!e.alive||e.x<camera-80||e.x>camera+viewWidth+80)continue;const bob=Math.sin(visualTime*5+e.x*.02)*2;ctx.fillStyle='#090b2580';ctx.beginPath();ctx.ellipse(e.x+e.w/2,e.y+e.h+2,23,5,0,0,Math.PI*2);ctx.fill();sprite('enemy',e.x+e.w/2,e.y+e.h+bob,44,e.vx<0);}
    if(game.state!=='start')drawPlayer();
    if(game.levelIndex===0&&game.state==='playing'){ctx.font='500 15px "Noto Sans JP",sans-serif';ctx.textAlign='left';ctx.fillStyle='#a5a0c8';ctx.fillText('ジャンプ ×2 で、もっと遠くへ',160,656);}
  }
  for(const r of rings){ctx.strokeStyle=`rgba(146,239,255,${r.life*1.8})`;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(r.x,r.y,10+(1-r.life/.45)*38,5+(1-r.life/.45)*10,0,0,Math.PI*2);ctx.stroke();}
  for(const p of particles){ctx.globalAlpha=Math.min(1,p.life*2);ctx.fillStyle=p.color;ctx.fillRect(p.x-p.size/2,p.y-p.size/2,p.size,p.size);}ctx.globalAlpha=1;
  for(const l of labels){ctx.globalAlpha=Math.min(1,l.life*2);ctx.font='700 17px sans-serif';ctx.textAlign='center';ctx.fillStyle=l.color;ctx.fillText(l.text,l.x,l.y);}ctx.globalAlpha=1;ctx.restore();
}
function resize(){const r=canvas.getBoundingClientRect();if(!r.width||!r.height)return;viewWidth=HEIGHT*r.width/r.height;pixelRatio=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(viewWidth*pixelRatio);canvas.height=HEIGHT*pixelRatio;ctx.setTransform(pixelRatio,0,0,pixelRatio,0,0);camera=clamp(camera,0,Math.max(0,game.level.length-viewWidth));}
new ResizeObserver(resize).observe($('gameFrame'));

function render(timestamp){
  const dt=lastTime?Math.min((timestamp-lastTime)/1000,.05):0;lastTime=timestamp;visualTime+=dt;
  if(game.state==='playing'){
    accumulator+=dt;while(accumulator>=1/120){game.update(1/120,input);accumulator-=1/120;}handleEvents();sound.tick();
    const target=clamp(game.player.x-viewWidth*.32+game.player.vx*.17,0,Math.max(0,game.level.length-viewWidth));camera+=(target-camera)*(1-Math.exp(-dt*5.5));
  }else accumulator=0;
  if(game.state!=='paused'){
    particles=particles.filter(p=>p.life>0);for(const p of particles){p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=240*dt;}
    rings=rings.filter(r=>r.life>0);for(const r of rings)r.life-=dt;
    labels=labels.filter(l=>l.life>0);for(const l of labels){l.life-=dt;l.y-=33*dt;}
  }
  if(toastTimer>0){toastTimer-=dt;if(toastTimer<=0)$('toast').classList.remove('visible');}
  screenShake=Math.max(0,screenShake-dt);
  ctx.setTransform(pixelRatio,0,0,pixelRatio,0,0);ctx.save();if(screenShake>0)ctx.translate((Math.random()-.5)*6,(Math.random()-.5)*6);drawBackground();drawWorld();ctx.restore();updateHUD();requestAnimationFrame(render);
}
function loadImage(src){return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=src;});}
Promise.all([loadImage('assets/world.png'),loadImage('assets/sprites.png'),loadImage('assets/hero.png')]).then(([world,sprites])=>{art.world=world;art.sprites=sprites;ready=true;$('startButton').disabled=false;$('startLabel').textContent='冒険をはじめる';}).catch(()=>{$('loadError').classList.remove('hidden');$('startLabel').textContent='読み込みできませんでした';});
resize();requestAnimationFrame(render);
