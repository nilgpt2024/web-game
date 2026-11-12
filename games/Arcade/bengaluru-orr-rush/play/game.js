import {Renderer,clamp,mix} from './engine.js';
import {LENGTH,createRace,point,sample,landmarks,moveTraffic} from './route.js';
import {buildScene} from './scene.js';
import {stepRace,rank,raceOrder,formatTime,recoverPlayer} from './race.js';
import {RaceSoundtrack} from './soundtrack.js';
import {DrivingAudio} from './driving-audio.js';
import {CAMPUSES,nextCampus} from './campuses.js';
import {contextualSwingSide} from './actions.js';
import {RACE_SEED,displaySpeed} from './rules.js';
import {GraphicsQuality,TouchInput,RaceClock} from './mobile.js';
import {ScoreService,mountLeaderboard,renderPoints} from './leaderboard.js';

const $=id=>document.getElementById(id),coarse=matchMedia('(any-pointer:coarse)').matches||navigator.maxTouchPoints>0||document.documentElement.hasAttribute('data-touch-controls'),reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
const keys=new Set(),touch=new TouchInput(),controls={ArrowUp:'accelerate',KeyW:'accelerate',ArrowDown:'brake',KeyS:'brake',ArrowLeft:'left',KeyA:'left',ArrowRight:'right',KeyD:'right',Space:'boost'};
let renderer,scene,race=createRace(),state='menu',previousState='racing',count=3.4,auto=coarse,muted=false,musicEnabled=false,boosting=false,checkpoint=0,toastUntil=0,impactUntil=0,last=0,hudClock=0,cam=null,frameHandle=0;
document.body.classList.toggle('touch-ui',coarse);
const quality=new GraphicsQuality(coarse),clock=new RaceClock();
let lastPaint=0,needsPaint=true,menuClock=0;
try{quality.setMode(localStorage.getItem('orr-graphics')||'auto')}catch{}
const drivingAudio=new DrivingAudio();
const soundtrack=new RaceSoundtrack();
let queuedActions={},pointsUntil=0;
const scores=new ScoreService();mountLeaderboard(scores);scores.init();

function setAuto(){ $('auto').textContent='AUTO THROTTLE '+(auto?'ON':'OFF');$('auto').setAttribute('aria-pressed',String(auto)) }
function clearInputs(){keys.clear();touch.clear();queuedActions={};clock.reset();race.actionHeld={};document.querySelectorAll('.held').forEach(b=>b.classList.remove('held'));boosting=false;document.body.classList.remove('boosting')}
function screen(name){
  needsPaint=true;
  for(const id of ['start-screen','pause-screen','finish-screen'])$(id).hidden=id!==name;
  const active=['racing','countdown','paused'].includes(state);
  $('race-hud').hidden=!active;$('pause').hidden=!active;$('countdown').hidden=state!=='countdown';$('touch-controls').hidden=!(coarse&&['racing','countdown'].includes(state));
  $('route-card').hidden=state==='finished';document.body.classList.toggle('playing',state!=='menu');
  $('race-hud').inert=state==='paused';document.querySelector('.topbar').inert=state==='paused'||state==='finished';
}
function toast(text,duration=1.8){$('race-toast').textContent=text;$('race-toast').classList.add('show');toastUntil=performance.now()+duration*1000}
function soundStart(reset=false){
  if(reset){soundtrack.reset();drivingAudio.reset()}
  if(state==='racing'||state==='countdown'){if(musicEnabled)soundtrack.start();if(!muted)drivingAudio.start()}
}
function audioUpdate(dt=.1){
  const playing=state==='racing'||state==='countdown',live=!muted&&playing,intent=input(),p=race.player;
  drivingAudio.update(race,intent,dt,live,boosting,state==='racing');
  soundtrack.update(musicEnabled&&playing,{boosting,throttle:intent.accelerate,braking:intent.brake,speed:p.v,congestion:drivingAudio.congestion},dt);
}
function horn(){if(state!=='racing')return;soundStart();queuedActions.horn=true}
function swing(side){if(state!=='racing')return;soundStart();queuedActions[(side||contextualSwingSide(race))<0?'hitLeft':'hitRight']=true}
function toggleSound(){muted=!muted;$('sound-label').textContent='SFX '+(muted?'OFF':'ON');$('sound').setAttribute('aria-label',muted?'Enable driving sounds':'Mute driving sounds');$('sound').setAttribute('aria-pressed',String(!muted));if(!muted)soundStart();audioUpdate()}
function toggleMusic(){musicEnabled=!musicEnabled;$('music-label').textContent='MUSIC '+(musicEnabled?'ON':'OFF');$('music').setAttribute('aria-pressed',String(musicEnabled));$('music').setAttribute('aria-label',musicEnabled?'Turn music off':'Turn music on');if(musicEnabled)soundStart();audioUpdate()}
function start(){
  race=createRace(RACE_SEED);scores.begin(race);checkpoint=0;count=3.4;state='countdown';quality.setMode(quality.mode);last=performance.now();lastPaint=0;soundStart(true);cam=null;clearInputs();screen(null);$('countdown').textContent='3';$('race-toast').classList.remove('show');$('impact').classList.remove('hit');$('start').blur();$('restart').blur();$('restart-pause').blur();$('points-change').textContent='';$('save-status').textContent='';hud();
}
function pause(){if(state!=='racing'&&state!=='countdown')return;previousState=state;state='paused';clearInputs();screen('pause-screen');$('resume').focus();audioUpdate()}
function resume(){if(state!=='paused')return;state=previousState;last=performance.now();lastPaint=0;screen(null);$('resume').blur();clearInputs();soundStart()}
function finish(){
  state='finished';clearInputs();screen('finish-screen');
  const completed=race,p=race.player,points=renderPoints(race);
  $('finish-eyebrow').textContent='MARATHAHALLI REACHED';$('finish-title').textContent=rank(race)===1?'First to Marathahalli!':'You made it.';
  $('finish-rank').textContent='P'+rank(race);$('finish-time').textContent=formatTime(race.time);$('finish-speed').textContent=displaySpeed(p.top)+' KMPH';
  $('finish-points').textContent=points.total.toLocaleString();$('finish-collisions').textContent=p.collisions;
  $('finish-bonus').textContent='+'+points.timeBonus.toLocaleString();$('finish-contact-cost').textContent='−'+points.collisionPenalty.toLocaleString();$('finish-pothole-cost').textContent='−'+points.potholePenalty.toLocaleString();
  $('collision-summary').textContent=`${p.collisions} contacts · ${p.heavyCollisions} heavy`;$('pothole-summary').textContent=p.roadHits+' potholes hit';
  $('finish-road').textContent=p.roadDodged+' potholes avoided · '+p.passes+' close passes';
  $('nickname').value=scores.guest?.name||'';$('save-score').disabled=true;$('save-score').textContent='SAVE SCORE';$('save-status').textContent='Checking your completed run…';
  $('guest-note').textContent='No sign-up needed. Your nickname is public; this browser remembers your guest profile.';
  if(coarse){const modal=$('finish-screen').querySelector('.modal');modal.scrollTop=0;modal.focus({preventScroll:true})}else $('nickname').focus();audioUpdate();
  scores.complete(completed).then(()=>{
    if(race!==completed||state!=='finished')return;
    $('save-status').textContent='Ready to save. Your best score stays on the board.';$('save-score').disabled=false;
    if(scores.guest?.tag)$('guest-note').textContent='Guest #'+scores.guest.tag+' · This browser remembers your profile. Your nickname is public.';
  }).catch(error=>{if(race!==completed||state!=='finished')return;$('save-status').textContent=error.message;$('save-score').disabled=false;$('save-score').textContent='RETRY & SAVE'});
}
function menu(){state='menu';race=createRace();cam=null;clearInputs();screen('start-screen');$('start').focus();audioUpdate()}
function input(){const down=name=>touch.has(name)||Object.entries(controls).some(([code,c])=>c===name&&keys.has(code));return{accelerate:auto||down('accelerate'),brake:down('brake'),left:down('left'),right:down('right'),boost:down('boost')}}

function hud(){
  for(const id of ['horn','swing-left','swing-right','swing-auto']){
    const cooldown=race.player[id==='horn'?'hornCooldown':'swingCooldown']||0,button=$(id);
    button.disabled=state!=='racing'||cooldown>0;button.querySelector('.action-label').textContent=cooldown>0?cooldown.toFixed(1)+'s':button.dataset.label;
  }
  const p=race.player;$('speed').textContent=displaySpeed(p.v);$('position').textContent=rank(race);$('time').textContent=formatTime(race.time);$('gear').textContent=p.v<.5?'N':1+[9,15,21,28,36].filter(v=>p.v>=v).length;$('boost-meter').style.width=p.boost+'%';$('points').textContent=renderPoints(race).total.toLocaleString();$('unstick').hidden=state!=='racing'||(p.stuckTime||0)<8;$('race-progress').style.width=clamp((p.s-20)/(LENGTH-20)*100,0,100)+'%';$('remaining').textContent=Math.max(0,(LENGTH-p.s)/1000).toFixed(1)+' km to Marathahalli';
  const cp=landmarks.reduce((n,l,i)=>p.s>=l.s?i:n,0);if(cp!==checkpoint){checkpoint=cp;if(state==='racing')toast(landmarks[cp].name.toUpperCase(),2.3)}$('checkpoint-number').textContent='0'+(checkpoint+1)+' / 04';$('checkpoint-name').textContent=landmarks[checkpoint].name;if(!coarse)drawMap();
  const landmark=nextCampus(p.s);$('landmark-card').hidden=!landmark;
  if(landmark){const {campus,index,distance,passing}=landmark;$('landmark-count').textContent=String(index+1).padStart(2,'0')+' / '+String(CAMPUSES.length).padStart(2,'0');$('landmark-name').textContent=campus.name;$('landmark-label').textContent=passing?'PASSING TECH PARK':'NEXT TECH PARK';$('landmark-distance').textContent=(passing?'Alongside':distance>=1000?(distance/1000).toFixed(1)+' km ahead':Math.round(distance/10)*10+' m ahead')+' · '+(campus.side>0?'right side →':'← left side');}
  const next=race.potholes.find(h=>!h.cleared&&h.s>p.s-3&&h.s<p.s+110);$('road-warning').hidden=!next;if(next)$('road-warning').textContent='⚠ UNEVEN ROAD · '+Math.max(0,Math.round((next.s-p.s)/5)*5)+' m';
}
const map=$('minimap'),mapCtx=map.getContext('2d'),mapPts=[];for(let s=0;s<=LENGTH;s+=40)mapPts.push(sample(s));
const bounds={minX:Math.min(...mapPts.map(p=>p.x)),maxX:Math.max(...mapPts.map(p=>p.x)),minZ:Math.min(...mapPts.map(p=>p.z)),maxZ:Math.max(...mapPts.map(p=>p.z))};
function mapPoint(p){const scale=Math.min(154/(bounds.maxX-bounds.minX),165/(bounds.maxZ-bounds.minZ));return[120+(p.x-(bounds.minX+bounds.maxX)/2)*scale,105+(p.z-(bounds.minZ+bounds.maxZ)/2)*scale]}
function drawMap(){
  if(!mapCtx)return;const c=mapCtx;c.clearRect(0,0,240,210);c.lineJoin='round';c.lineCap='round';
  const path=()=>{c.beginPath();mapPts.forEach((p,i)=>{const [x,y]=mapPoint(p);i?c.lineTo(x,y):c.moveTo(x,y)})};path();c.strokeStyle='#6e889250';c.lineWidth=14;c.stroke();path();c.strokeStyle='#c9d1bf';c.lineWidth=3;c.stroke();
  c.strokeStyle='#d7f55c';c.lineWidth=3;c.beginPath();for(let s=0;s<=race.player.s;s+=40){const [x,y]=mapPoint(sample(s));s?c.lineTo(x,y):c.moveTo(x,y)}c.stroke();
  for(let i=0;i<landmarks.length;i++){const [x,y]=mapPoint(sample(Math.min(LENGTH,landmarks[i].s+220)));c.fillStyle='#142b34';c.beginPath();c.arc(x,y,5.5,0,Math.PI*2);c.fill();c.strokeStyle='#a8bbb9';c.lineWidth=1.5;c.stroke()}
  for(const campus of CAMPUSES){const [x,y]=mapPoint(sample(campus.s));c.fillStyle=campus.s<race.player.s?'#d7f55c':'#7ebacb';c.fillRect(x+campus.side*8-2,y-2,4,4);}
  for(const r of race.rivals){const [x,y]=mapPoint(sample(clamp(r.s,0,LENGTH)));c.fillStyle=['#dc705f','#f0eee0','#b4c4ca'][r.paint];c.beginPath();c.arc(x,y,3,0,Math.PI*2);c.fill()}
  const p=sample(race.player.s),[x,y]=mapPoint(p);c.save();c.translate(x,y);c.rotate(Math.atan2(p.fz,p.fx)+Math.PI/2);c.fillStyle='#d7f55c';c.strokeStyle='#142b34';c.lineWidth=2;c.beginPath();c.moveTo(0,-8);c.lineTo(6,6);c.lineTo(0,3);c.lineTo(-6,6);c.closePath();c.fill();c.stroke();c.restore();
  c.font='bold 10px Arial';c.fillStyle='#a8c0c8';c.fillText('N ↑',207,20);const end=mapPoint(sample(LENGTH));c.fillStyle='#d7f55c';c.fillRect(end[0]-3,end[1]-3,6,6);
}
function render(dt){
  const p=race.player,menuView=state==='menu',cameraS=p.s-(menuView?18:14);
  const clearance=6.2-clamp(-sample(cameraS).y/5,0,1)*2;
  const strike=!reduced&&state==='racing'?(race.strikeFeedback||0)/.26:0,swingLean=!reduced&&race.swing?Math.sin(Math.PI*race.swing.age/.9)*race.swing.side*.42:0;
  const camera=point(cameraS,p.x+(menuView?9:swingLean),menuView?7:clearance),target=point(p.s+(menuView?10:18),p.x*.7,1.35);
  if(!cam)cam=[...camera];for(let i=0;i<3;i++)cam[i]=mix(cam[i],camera[i],1-Math.exp(-dt*9));
  const bounce=!reduced&&state==='racing'?(p.heave||0)*.6+Math.sin(race.time*26)*p.bump*.045:0,kick=sample(cameraS),eye=[cam[0]+kick.rx*(race.strikeSide||0)*strike*.12,cam[1]+bounce+strike*.1,cam[2]+kick.rz*(race.strikeSide||0)*strike*.12];
  const graphics=quality.settings;renderer.scale=graphics.scale;renderer.fog=Math.min(800,graphics.scenery-100);
  renderer.begin(eye,target,(coarse?68:60)+(boosting&&!reduced?5:0)-strike*1.8);scene.render(p.s,graphics);
  const visible=car=>car.s>p.s-60&&car.s<p.s+graphics.ahead,detailed=car=>Math.abs(car.s-p.s)<graphics.detail;
  for(const car of race.oncoming)if(visible(car))scene.vehicle(car,true,0,detailed(car));
  for(const car of race.traffic)if(visible(car))scene.vehicle(car,false,0,detailed(car));
  const order=['countdown','racing','paused'].includes(state)?raceOrder(race):[];
  for(const car of race.rivals)if(visible(car))scene.vehicle(car,false,order.indexOf(car)+1,detailed(car));
  scene.vehicle(p,false,order.indexOf(p)+1);scene.swing(race,reduced);scene.roadEffects(race.effects,p.s,quality.level===2?60:quality.level===1?96:160);
}
function frame(now){
  const raw=Math.max(0,(now-(last||now))/1000),dt=Math.min(.1,raw);last=now;
  if(document.hidden){frameHandle=requestAnimationFrame(frame);return}
  if(raw>.75&&state==='racing'){pause()}
  if((state==='paused'||state==='finished')&&!needsPaint){frameHandle=requestAnimationFrame(frame);return}
  if(state==='racing')quality.observe(raw*1000,dt);
  if(state==='countdown'){
    count-=dt;const value=Math.ceil(count);$('countdown').textContent=value>0?String(Math.min(value,3)):'GO';
    if(count<=0){state='racing';screen(null);$('countdown').hidden=false;$('countdown').textContent='GO';setTimeout(()=>{if(state==='racing')$('countdown').hidden=true},650);toast(coarse?'RACE TO MARATHAHALLI':'W / ↑ TO ACCELERATE',2.1)}
  }
  if(state==='racing'){
    const intent=input();let events=[],penalties=[];
    clock.advance(dt,step=>{
      const actions=queuedActions;queuedActions={};
      const result=stepRace(race,{...intent,...actions},step);boosting=result.boosting;
      events.push(...result.events);penalties.push(...result.penalties);return result.events;
    });
    scores.track(race);
    if(penalties.length){const amount=penalties.reduce((sum,p)=>sum+p.points,0),kind=penalties.every(p=>p.kind==='pothole')?'POTHOLE':penalties.some(p=>p.kind==='heavy')?'HEAVY CONTACT':'CONTACT';$('points-change').textContent=kind+' −'+amount;pointsUntil=now+1800}
    if(events.includes('horn'))drivingAudio.horn();
    if(events.includes('rod-whip'))drivingAudio.attackSound('whip',race.swing?.side||1);
    if(events.includes('rod-hit'))drivingAudio.attackSound('hit',race.strikeSide);
    if(events.includes('collision')||events.includes('barrier')){toast(events.includes('barrier')?'WATCH THE BARRIER':'CONTACT · FIND A CLEAR LINE',1.5);$('impact').classList.add('hit');impactUntil=now+210}
    if(events.includes('pothole')||events.includes('puddle')){toast((events.includes('puddle')?'SPLASH':'POTHOLE')+' · −'+race.player.lastRoadLoss+' KMPH',1.4);drivingAudio.thud()}
    else if(events.includes('pass'))toast('CLOSE PASS  +BOOST',1.25);
    document.body.classList.toggle('boosting',boosting);
    if(events.includes('finish'))finish();
  }else if(state==='menu'){menuClock+=dt;if(menuClock>=1/15){moveTraffic(race,menuClock*.35);menuClock=0}}
  if(now>pointsUntil)$('points-change').textContent='';
  if(now>toastUntil)$('race-toast').classList.remove('show');if(now>impactUntil)$('impact').classList.remove('hit');
  hudClock+=dt;if(hudClock>=.1){hudClock=0;hud()}
  audioUpdate(dt);
  const moving=state==='racing'||state==='countdown'||state==='menu',interval=1000/(state==='menu'?15:quality.settings.fps);
  if(needsPaint||(moving&&now-lastPaint>=interval-.5)){render(Math.min(.1,(now-(lastPaint||now-16.667))/1000));lastPaint=now;needsPaint=false}
  frameHandle=requestAnimationFrame(frame);
}

$('start').addEventListener('click',start);$('restart').addEventListener('click',start);$('restart-pause').addEventListener('click',start);$('back-menu').addEventListener('click',menu);$('pause').addEventListener('click',pause);$('resume').addEventListener('click',resume);$('sound').addEventListener('click',toggleSound);$('music').addEventListener('click',toggleMusic);$('horn').addEventListener('click',()=>{horn();$('horn').blur()});$('auto').addEventListener('click',()=>{auto=!auto;setAuto();$('auto').blur()});
window.addEventListener('keydown',event=>{
  if($('leaderboard-dialog').open)return;
  if(event.target.closest('input,textarea,select,[contenteditable=true]')&&event.code!=='Tab')return;
  if(event.code==='Tab'&&(state==='paused'||state==='finished')){const list=[...$(state==='paused'?'pause-screen':'finish-screen').querySelectorAll('button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled)')];const first=list[0],last=list.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}return}
  if(controls[event.code]&&(state==='racing'||state==='countdown')){event.preventDefault();keys.add(event.code)}
  if(event.repeat)return;
  if(event.code==='KeyP'||event.code==='Escape'){event.preventDefault();state==='paused'?resume():pause()}
  if(event.code==='KeyR'&&['racing','paused','finished'].includes(state)){event.preventDefault();start()}
  if(event.code==='KeyM')toggleSound();
  if(event.code==='KeyN')toggleMusic();
  if(event.code==='KeyH'&&state==='racing'){event.preventDefault();horn()}
  if((event.code==='KeyQ'||event.code==='KeyE')&&state==='racing'){event.preventDefault();swing(event.code==='KeyQ'?-1:1)}
});
for(const [id,side] of [['swing-left',-1],['swing-right',1],['swing-auto',0]])$(id).addEventListener('click',()=>{swing(side);$(id).blur()});
window.addEventListener('keyup',event=>keys.delete(event.code));
function suspendRace(){clearInputs();pause();drivingAudio.suspend();soundtrack.suspend()}
window.addEventListener('blur',suspendRace);window.addEventListener('pagehide',suspendRace);
document.addEventListener('visibilitychange',()=>{if(document.hidden)suspendRace();else{last=performance.now();needsPaint=true}});
window.addEventListener('pageshow',()=>{last=performance.now();needsPaint=true});
const refreshHeld=()=>{for(const button of document.querySelectorAll('[data-control]'))button.classList.toggle('held',touch.has(button.dataset.control))};
for(const button of document.querySelectorAll('[data-control]')){
  button.addEventListener('pointerdown',event=>{
    if(state!=='racing'&&state!=='countdown')return;event.preventDefault();
    touch.press(event.pointerId,button.dataset.control);button.setPointerCapture(event.pointerId);refreshHeld();soundStart();
  });
  const release=event=>{touch.release(event.pointerId);refreshHeld()};
  button.addEventListener('pointerup',release);button.addEventListener('pointercancel',release);button.addEventListener('lostpointercapture',release);
  button.addEventListener('contextmenu',event=>event.preventDefault());
}
// Pointer capture remains on the original button while a thumb slides between
// steering directions. Sliding off the control releases it immediately.
window.addEventListener('pointermove',event=>{
  if(!touch.pointers.has(event.pointerId))return;
  const target=document.elementFromPoint(event.clientX,event.clientY)?.closest('[data-control]');
  const original=touch.pointers.get(event.pointerId),next=target?.dataset.control;
  if(next===original||(['left','right'].includes(original)&&['left','right'].includes(next)))touch.press(event.pointerId,next);
  else touch.release(event.pointerId);refreshHeld();
});
for(const name of ['pointerup','pointercancel'])window.addEventListener(name,event=>{touch.release(event.pointerId);refreshHeld()});
function updateViewport(){
  const viewport=window.visualViewport;
  document.documentElement.style.setProperty('--view-height',(viewport?.height||innerHeight)+'px');
  document.documentElement.style.setProperty('--view-top',(viewport?.offsetTop||0)+'px');needsPaint=true;
}
updateViewport();window.addEventListener('resize',updateViewport);window.visualViewport?.addEventListener('resize',updateViewport);window.visualViewport?.addEventListener('scroll',updateViewport);
const rotate=()=>{clearInputs();pause();cam=null;updateViewport()};
window.screen.orientation?.addEventListener('change',rotate);window.addEventListener('orientationchange',rotate);
$('nickname').addEventListener('focus',()=>{setTimeout(()=>{if(document.activeElement===$('nickname'))$('score-form').scrollIntoView({block:'nearest'})},250)});
$('graphics-quality').value=quality.mode;
$('graphics-quality').addEventListener('change',event=>{quality.setMode(event.target.value);needsPaint=true;try{localStorage.setItem('orr-graphics',quality.mode)}catch{}});
$('unstick').addEventListener('click',()=>{if(state!=='racing')return;if(recoverPlayer(race)){cam=null;toast('BACK IN A CLEAR SPACE',1.5)}else toast('USE THE HORN TO OPEN A GAP',1.5);$('unstick').blur()});
$('score-form').addEventListener('submit',async event=>{
  event.preventDefault();const completed=race;if(state!=='finished')return;
  $('save-score').disabled=true;$('save-status').textContent='Saving your score…';
  try{
    const result=await scores.submit($('nickname').value);if(race!==completed||state!=='finished')return;
    const best=result.personalBest,isBest=best.score===result.score&&best.elapsedMs===Math.round(completed.time*1000);
    $('save-status').textContent=(isBest?'Personal best saved! ':'Run saved. ')+`Global rank #${best.rank} · Best ${best.score.toLocaleString()} points.`;
    $('save-score').textContent='SAVED';$('guest-note').textContent=`${result.guest.name} #${result.guest.tag} · Your next race can improve this same entry.`;
  }catch(error){if(race!==completed||state!=='finished')return;$('save-status').textContent=error.message;$('save-score').disabled=false;$('save-score').textContent='RETRY & SAVE'}
});
$('nickname').addEventListener('input',()=>{if(state==='finished'&&scores.attempt?.sealed){$('save-score').disabled=false;$('save-score').textContent='SAVE SCORE'}});
$('world').addEventListener('webglcontextlost',event=>{
  event.preventDefault();cancelAnimationFrame(frameHandle);suspendRace();
  $('error-screen').hidden=false;$('error-message').textContent='Restoring the road. Your race is paused.';
});
$('world').addEventListener('webglcontextrestored',()=>{
  try{renderer=new Renderer($('world'),{mobile:coarse});scene=buildScene(renderer);$('error-screen').hidden=true;last=performance.now();needsPaint=true;frameHandle=requestAnimationFrame(frame)}
  catch{ $('error-message').textContent='3D could not be restored. Reload to return to the starting grid.' }
});
try{
  renderer=new Renderer($('world'),{mobile:coarse});scene=buildScene(renderer);setAuto();hud();$('start').disabled=false;$('start').textContent='START YOUR ENGINE  ↗';frameHandle=requestAnimationFrame(frame);
}catch(error){console.error('ORR Rush initialization:',error);$('error-screen').hidden=false;$('start').textContent='3D UNAVAILABLE';}
