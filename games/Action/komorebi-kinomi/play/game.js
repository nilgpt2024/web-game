(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const canvas = $('game'), ctx = canvas.getContext('2d'), sprite = $('hero-creature');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DURATION = 60, GOAL = 300;
  const state = { mode:'start', score:0, remaining:DURATION, caught:0, gold:0, combo:0, maxCombo:0, elapsed:0, spawnIn:0.8, x:0, target:0, bump:0, items:[], particles:[], labels:[] };
  let width=0,height=0,size=160,last=0,ambient=0,soundOn=false,audio=null,previousMode='start',returnFocus=null,primaryAction=null,secondaryAction=null;
  const keys = new Set();
  const motes = Array.from({length:24},(_,i)=>({x:Math.random(),y:Math.random(),r:1+Math.random()*2,phase:i*1.8}));
  const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
  const snapshot=()=>({mode:state.mode,score:state.score,secondsRemaining:Math.ceil(state.remaining),chestnuts:state.caught,forestLights:state.gold,combo:state.combo,goal:GOAL});

  function resize(){
    const r=canvas.getBoundingClientRect(),old=width;
    width=r.width;height=r.height;const dpr=Math.min(window.devicePixelRatio||1,2);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    size=clamp(width*.19,135,205);
    if(old){const ratio=width/old;state.x*=ratio;state.target*=ratio;state.items.forEach(i=>i.x*=ratio);}else{state.x=state.target=width/2;}
    state.x=clamp(state.x,size*.3,width-size*.3);state.target=clamp(state.target,size*.3,width-size*.3);
  }
  new ResizeObserver(resize).observe(canvas);

  function ensureAudio(){
    if(!soundOn)return;
    try{if(!audio)audio=new(window.AudioContext||window.webkitAudioContext)();if(audio.state==='suspended')audio.resume().catch(()=>{});}catch{soundOn=false;updateSound();}
  }
  function note(freq,duration=.2,volume=.045,offset=0){
    if(!soundOn||!audio||audio.state!=='running')return;
    const start=audio.currentTime+offset,osc=audio.createOscillator(),gain=audio.createGain();
    osc.type='sine';osc.frequency.setValueAtTime(freq,start);gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(volume,start+.018);gain.gain.exponentialRampToValueAtTime(.001,start+duration);
    osc.connect(gain);gain.connect(audio.destination);osc.start(start);osc.stop(start+duration+.02);
  }
  function updateSound(){
    $('sound').setAttribute('aria-pressed',String(soundOn));$('sound').setAttribute('aria-label',soundOn?'音をオフにする':'音をオンにする');
    document.querySelector('.sound-waves').setAttribute('d',soundOn?'M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14':'m16 9 6 6m0-6-6 6');
  }
  $('sound').addEventListener('click',()=>{soundOn=!soundOn;ensureAudio();updateSound();if(soundOn)note(660,.3,.04);});

  function updateHud(){
    $('score').innerHTML=state.score+'<small> pts</small>';$('time').textContent=Math.ceil(state.remaining);
    $('time-bar').style.width=(state.remaining/DURATION*100)+'%';$('time-bar').style.background=state.remaining<=10?'#e59a72':'#f0d08b';
    const multiplier=state.combo>=10?3:state.combo>=5?2:1;
    $('combo').textContent=state.combo>=3?`${state.combo} 連続！${multiplier>1?' ×'+multiplier:''}`:'';
  }
  function startGame(){
    closeDialog(false);Object.assign(state,{mode:'playing',score:0,remaining:DURATION,caught:0,gold:0,combo:0,maxCombo:0,elapsed:0,spawnIn:.55,x:width/2,target:width/2,bump:0,items:[],particles:[],labels:[]});
    $('start-screen').hidden=true;$('hud').hidden=false;$('play-hint').hidden=false;$('play-hint').style.opacity='1';document.body.classList.add('playing');keys.clear();updateHud();canvas.focus({preventScroll:true});ensureAudio();note(523,.25,.05);note(659,.35,.04,.13);$('announcer').textContent='木の実あつめを開始しました。制限時間60秒。';last=performance.now();
  }
  function goHome(){
    closeDialog(false);state.mode='start';state.items=[];state.particles=[];state.labels=[];keys.clear();$('start-screen').hidden=false;$('hud').hidden=true;$('play-hint').hidden=true;$('combo').textContent='';document.body.classList.remove('playing');$('start').focus({preventScroll:true});
  }
  function openDialog({eyebrow,title,symbol='❧',body,primary,action,secondary,secondaryFn}){
    returnFocus=document.activeElement;keys.clear();$('dialog-eyebrow').textContent=eyebrow;$('dialog-title').textContent=title;$('dialog-symbol').textContent=symbol;$('dialog-body').innerHTML=body;$('dialog-primary').textContent=primary;primaryAction=action;
    $('dialog-secondary').hidden=!secondary;$('dialog-secondary').textContent=secondary||'';secondaryAction=secondaryFn;$('overlay').hidden=false;
    for(const el of [$('start-screen'),$('hud'),document.querySelector('.topbar')])el.inert=true;
    canvas.setAttribute('tabindex','-1');$('dialog-primary').focus({preventScroll:true});
  }
  function closeDialog(restore=true){
    $('overlay').hidden=true;for(const el of [$('start-screen'),$('hud'),document.querySelector('.topbar')])el.inert=false;canvas.setAttribute('tabindex','0');
    if(restore&&returnFocus?.isConnected)returnFocus.focus({preventScroll:true});
  }
  function resume(){closeDialog();state.mode='playing';last=performance.now();canvas.focus({preventScroll:true});ensureAudio();}
  function pauseGame(){
    if(state.mode!=='playing')return;state.mode='paused';openDialog({eyebrow:'ひとやすみ',title:'森で、ちょっと休憩。',body:'<p>木の実も、風も、待っているよ。</p>',primary:'木の実あつめをつづける',action:resume,secondary:'はじめの画面へ',secondaryFn:goHome});
  }
  function help(){
    if(state.mode==='help')return;previousMode=state.mode;state.mode='help';
    openDialog({eyebrow:'HOW TO PLAY',title:'森の収穫のおてつだい',body:'<div class="rule-list"><div class="rule"><span>↔</span><div><b>左右にうごいてキャッチ</b><small>矢印キー、マウス、または指で左右に動かそう。</small></div></div><div class="rule"><span>🌰</span><div><b>木の実は 10 pts</b><small>5連続で2倍、10連続で3倍のボーナス。</small></div></div><div class="rule"><span>✨</span><div><b>森のひかりは 30 pts</b><small>見つけたら、忘れずにキャッチ。</small></div></div><div class="rule"><span>🍂</span><div><b>落ち葉は、ひらりとよけよう</b><small>当たると残り時間が3秒減り、連続記録がリセット。</small></div></div></div><p>60秒で <b>300 pts</b> を目指そう。<br>木の実を取りこぼしても、得点は減らないよ。</p>',primary:'わかった',action:()=>{const m=previousMode;closeDialog();state.mode=m;last=performance.now();}});
  }
  function finish(){
    state.mode='ended';keys.clear();$('play-hint').hidden=true;const stars=state.score>=600?3:state.score>=GOAL?2:1;
    note(523,.5,.06);note(659,.5,.05,.17);note(784,.7,.04,.34);
    const title=state.score>=600?'森の収穫名人！':state.score>=GOAL?'冬じたく、できたね。':'小さな収穫、ありがとう。';
    openDialog({eyebrow:'きょうの収穫',title,symbol:'❧',body:`<div class="result-stars" aria-label="3つ星中${stars}つ">${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</div><div class="result-score">${state.score}<small>pts</small></div><div class="result-stats"><span>木の実 ${state.caught} 個</span><span>森のひかり ${state.gold} 個</span><span>最大 ${state.maxCombo} 連続</span></div><p>${state.score>=GOAL?'森の精霊も、にっこり。<br>いっしょに集めてくれて、ありがとう。':'目標の300 ptsまで、あと'+(GOAL-state.score)+' pts。<br>もう一度、森をおさんぽしよう。'}</p>`,primary:'もういちどあそぶ',action:startGame,secondary:'はじめの画面へ',secondaryFn:goHome});
    $('announcer').textContent=`終了。${state.score}ポイント。${title}`;
  }
  $('start').addEventListener('click',startGame);$('pause').addEventListener('click',pauseGame);$('help').addEventListener('click',help);$('dialog-primary').addEventListener('click',()=>primaryAction?.());$('dialog-secondary').addEventListener('click',()=>secondaryAction?.());
  document.addEventListener('keydown',e=>{
    if(e.key==='Tab'&&!$('overlay').hidden){const buttons=Array.from($('overlay').querySelectorAll('button:not([hidden])'));const first=buttons[0],end=buttons[buttons.length-1];if(e.shiftKey&&document.activeElement===first){end.focus();e.preventDefault();}else if(!e.shiftKey&&document.activeElement===end){first.focus();e.preventDefault();}return;}
    if(e.key==='Escape'){if(state.mode==='playing')pauseGame();else if(state.mode==='paused')resume();else if(state.mode==='help')primaryAction?.();return;}
    if(state.mode==='playing'&&['ArrowLeft','ArrowRight','a','d','A','D'].includes(e.key)){keys.add(e.key.toLowerCase());e.preventDefault();}
    if(e.code==='Space'&&state.mode==='playing'&&document.activeElement===canvas){pauseGame();e.preventDefault();}
  });
  document.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
  window.addEventListener('blur',()=>{keys.clear();pauseGame();});document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseGame();});
  function point(e){if(state.mode!=='playing')return;const r=canvas.getBoundingClientRect();state.target=clamp(e.clientX-r.left,size*.3,width-size*.3);}
  canvas.addEventListener('pointerdown',e=>{if(state.mode!=='playing')return;canvas.setPointerCapture(e.pointerId);point(e);canvas.focus({preventScroll:true});ensureAudio();});
  canvas.addEventListener('pointermove',point);

  function spawn(){
    const r=Math.random(),kind=r<.16?'leaf':r<.27?'gold':'nut';const pad=Math.max(36,size*.3);
    state.items.push({kind,x:pad+Math.random()*(width-pad*2),y:-35,speed:height*(.2+Math.random()*.06+state.elapsed*.0013),phase:Math.random()*6.28,spin:(Math.random()-.5)*.8,rotation:0});
  }
  function burst(x,y,color){for(let i=0;i<(reducedMotion?4:13);i++){const a=Math.random()*Math.PI*2,s=30+Math.random()*110;state.particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:.65,max:.65,color,r:2+Math.random()*3});}}
  function label(text,x,y,color){state.labels.push({text,x,y,life:1,color});}
  function catchItem(item){
    if(item.kind==='leaf'){state.remaining=Math.max(0,state.remaining-3);state.combo=0;state.bump=.4;label('−3 秒',item.x,item.y-20,'#9e482c');burst(item.x,item.y,'#c07f4f');note(160,.18,.055);}
    else{state.combo++;state.maxCombo=Math.max(state.combo,state.maxCombo);const multiplier=state.combo>=10?3:state.combo>=5?2:1;const points=(item.kind==='gold'?30:10)*multiplier;state.score+=points;item.kind==='gold'?state.gold++:state.caught++;label('+'+points,item.x,item.y-20,item.kind==='gold'?'#835613':'#2b532c');burst(item.x,item.y,item.kind==='gold'?'#ffe497':'#f3efad');note(item.kind==='gold'?1047:523+Math.min(state.combo,12)*28,.3,.06);if(item.kind==='gold')note(1319,.4,.025,.1);}
  }
  function update(dt){
    state.elapsed+=dt;state.remaining=Math.max(0,state.remaining-dt);state.bump=Math.max(0,state.bump-dt);
    const dir=(keys.has('arrowright')||keys.has('d')?1:0)-(keys.has('arrowleft')||keys.has('a')?1:0);
    if(dir)state.target=clamp(state.target+dir*width*.9*dt,size*.3,width-size*.3);
    state.x+=(state.target-state.x)*(1-Math.exp(-18*dt));
    state.spawnIn-=dt;if(state.spawnIn<=0){spawn();state.spawnIn=Math.max(.38,.84-state.elapsed*.005)+(Math.random()*.2);}
    const catchY=height-42-size*.43;
    for(let i=state.items.length-1;i>=0;i--){const item=state.items[i],oldY=item.y;item.y+=item.speed*dt;item.rotation+=item.spin*dt;
      if(item.kind==='leaf')item.x=clamp(item.x+Math.sin(state.elapsed*2+item.phase)*32*dt,24,width-24);
      if(oldY<=catchY&&item.y>=catchY&&Math.abs(item.x-state.x)<size*.27+13){catchItem(item);state.items.splice(i,1);}
      else if(item.y>height+40){if(item.kind==='nut')state.combo=0;state.items.splice(i,1);}
    }
    if(state.elapsed>5)$('play-hint').style.opacity='0';
    updateHud();if(state.remaining<=0)finish();
  }
  function draw(dt,t){
    ctx.clearRect(0,0,width,height);
    for(const m of motes){const x=m.x*width+(reducedMotion?0:Math.sin(t*.2+m.phase)*15),y=m.y*height+(reducedMotion?0:Math.cos(t*.17+m.phase)*19);ctx.globalAlpha=.25+(Math.sin(t+m.phase)+1)*.17;ctx.fillStyle='#fff4b3';ctx.beginPath();ctx.arc(x,y,m.r,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;
    if(state.mode==='start'||(state.mode==='help'&&previousMode==='start'))return;
    ctx.save();const bob=reducedMotion?0:Math.sin(t*5)*2;const moving=clamp((state.target-state.x)*.0015,-.07,.07);ctx.translate(state.x,height-42-size/2+bob);ctx.rotate(moving+(state.bump>0?Math.sin(t*55)*.08:0));
    const shadow=ctx.createRadialGradient(0,size/2-7,0,0,size/2-7,size*.31);shadow.addColorStop(0,'#233c2c55');shadow.addColorStop(1,'#233c2c00');ctx.fillStyle=shadow;ctx.fillRect(-size*.4,size/2-20,size*.8,40);
    if(sprite.complete&&sprite.naturalWidth)ctx.drawImage(sprite,-size/2,-size/2,size,size);ctx.restore();
    for(const item of state.items){ctx.save();ctx.translate(item.x,item.y);ctx.rotate(item.rotation);ctx.font=`${width<500?32:39}px "Apple Color Emoji","Segoe UI Emoji",sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';if(item.kind==='gold'){ctx.shadowColor='#fff39a';ctx.shadowBlur=20;}else{ctx.shadowColor='#33412055';ctx.shadowBlur=5;ctx.shadowOffsetY=3;}ctx.fillText(item.kind==='nut'?'🌰':item.kind==='gold'?'✨':'🍂',0,0);ctx.restore();}
    const effectDt=state.mode==='playing'?dt:0;
    for(let i=state.particles.length-1;i>=0;i--){const p=state.particles[i];p.life-=effectDt;p.x+=p.vx*effectDt;p.y+=p.vy*effectDt;p.vy+=120*effectDt;if(p.life<=0){state.particles.splice(i,1);continue;}ctx.globalAlpha=p.life/p.max;ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;
    for(let i=state.labels.length-1;i>=0;i--){const l=state.labels[i];l.life-=effectDt;l.y-=36*effectDt;if(l.life<=0){state.labels.splice(i,1);continue;}ctx.globalAlpha=Math.min(l.life*2,1);ctx.font='bold 23px "Noto Sans JP",sans-serif';ctx.textAlign='center';ctx.fillStyle=l.color;ctx.lineWidth=4;ctx.strokeStyle='#fff4d5bb';ctx.strokeText(l.text,l.x,l.y);ctx.fillText(l.text,l.x,l.y);}ctx.globalAlpha=1;
  }
  function frame(now){const dt=clamp((now-last)/1000,0,.1)||0;last=now;if(state.mode==='playing'){update(dt);ambient+=dt;if(ambient>3){ambient=0;note([392,440,523,587,659][Math.floor(Math.random()*5)],1.7,.009);}}draw(dt,now/1000);requestAnimationFrame(frame);}
  requestAnimationFrame(frame);

  const modelContext=document.modelContext;
  if(modelContext?.registerTool){
    const lifecycle=new AbortController();window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
    const register=tool=>{try{Promise.resolve(modelContext.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}};
    register({name:'read_game_state',title:'木の実あつめの状態',description:'Read the current score, remaining time, collected items, and game phase.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute:input=>{if(input&&Object.keys(input).length)throw Error('No input fields are accepted.');return snapshot();}});
    register({name:'control_game',title:'木の実あつめを操作',description:'Start a new game from the title or results, pause active play, or resume a paused game. Starting resets the score and timer.',inputSchema:{type:'object',properties:{action:{type:'string',enum:['start','pause','resume']}},required:['action'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute:input=>{if(!input||Object.keys(input).some(k=>k!=='action')||!['start','pause','resume'].includes(input.action))throw Error('Expected action: start, pause, or resume.');if(input.action==='start'){if(!['start','ended'].includes(state.mode))throw Error('A game is already in progress.');startGame();}else if(input.action==='pause'){if(state.mode!=='playing')throw Error('The game is not playing.');pauseGame();}else{if(state.mode!=='paused')throw Error('The game is not paused.');resume();}return snapshot();}});
  }
})();
