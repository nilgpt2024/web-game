import { Game, Progress, SKINS, STEP, THEME_IDS,POWERS,MISSIONS,medal,difficulty } from './engine.mjs';
import { Renderer } from './render.mjs';
import { ProgressSync } from './sync.mjs';
import { Arcade } from './arcade.mjs';
const $=id=>document.getElementById(id);
const ui={};
for(const id of ['abilityBar','magnetBtn','magnetStatus','levelBadge'])ui[id]=$(id);
for(const id of ['promoForm','promoCode','promoSubmit','promoMessage'])ui[id]=$(id);
for(const id of ['classicModeBtn','chaosModeBtn','modeHint','homeRecordLabel','resultRecordLabel','playLabel','collectionChaosBest'])ui[id]=$(id);
for(const id of ['missionsBtn','missionDot','missionDialog','missionList','missionCount','missionWallet','missionMessage','pilotCombo','pilotStars','resultMissionsBtn','comboHud','comboText','resultMedal','medalName','flightSummary'])ui[id]=$(id);
for(const id of ['game','arena','homeScreen','pauseScreen','overScreen','hud','score','bestHud','homeBest','shieldHud','shieldText','chargeDots','toast','pauseBtn','soundBtn','themeBtn','themeName','themeIcon','sceneCaption','skinsBtn','skinCount','resultEyebrow','resultTitle','resultScore','resultBest','resultStars','nextGoal','skinDialog','skinGrid','collectionBest','collectionCount','resetConfirm','announcer','wallet','collectionWallet','shopMessage','saveStatus','sceneIndex'])ui[id]=$(id);
let storage;try{storage=window.localStorage}catch{}
const progress=new Progress(storage);
const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
const renderer=new Renderer(ui.game,{reducedMotion:motion.matches});
const game=new Game({onEvent:onGameEvent,mode:progress.mode});
let hasSeenTip=false,runId=crypto.randomUUID();
let accumulator=0,last=0,raf=0,lastDraw=0,previewLast=0,previews=[],runBest=progress.bestFor(game.mode),endedAt=0,toastUntil=0,scoreAnimation=null,renderSamples=0,renderCost=0;
let pendingQuality=renderer.quality;
let arcade;
const sync=new ProgressSync(progress,onProgressChange);
class Sound {
  constructor(){this.ctx=null}
  unlock(){if(!progress.sound)return;try{this.ctx ||= new (window.AudioContext||window.webkitAudioContext)({latencyHint:'interactive'});if(this.ctx.state==='suspended')this.ctx.resume().catch(()=>{})}catch{}}
  note(freq,duration=.12,type='sine',volume=.04,delay=0){
    const a=this.ctx;if(!progress.sound||!a||a.state!=='running')return;
    const t=a.currentTime+delay,o=a.createOscillator(),g=a.createGain();o.type=type;
    o.frequency.setValueAtTime(freq,t);o.frequency.exponentialRampToValueAtTime(freq*.72,t+duration);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(volume,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+duration);
    o.connect(g);g.connect(a.destination);o.onended=()=>{o.disconnect();g.disconnect()};o.start(t);o.stop(t+duration+.01);
  }
}
const sound=new Sound();
arcade=new Arcade({sync,renderer,motion,pause:()=>game.pause(),announce,sound:type=>{sound.unlock();sound.note(type==='win'?1280:type==='start'?620:350,type==='win'?.25:.1,'triangle',.025)}});
function announce(text){ui.announcer.textContent=text}
function toast(text,seconds=2){ui.toast.textContent=text;ui.toast.hidden=false;toastUntil=performance.now()+seconds*1000}
function updateRecords(){
  ui.bestHud.textContent=progress.bestFor(game.mode);ui.homeBest.textContent=progress.bestFor(game.mode);
  ui.skinCount.textContent=(progress.owned.size-1)+'/'+(SKINS.length-1);ui.wallet.textContent=progress.stars;
  const available=MISSIONS.filter(m=>!(progress.claimed&m.bit)&&progress[m.metric]>=m.target).length;
  ui.missionDot.hidden=!available;ui.missionsBtn.setAttribute('aria-label','Abrir misiones'+(available?'. '+available+' recompensas disponibles.':'.'));
}
function onProgressChange(){
  updateRecords();renderer.setSkin(progress.skin);
  ui.saveStatus.textContent=sync?.message||((sync?.draft.events.length||sync?.draft.best||sync?.draft.chaosBest||sync?.draft.maxCombo)?'Guardando progreso…':'Tus estrellas se guardan entre partidas.');
  if(ui.skinDialog.open)renderSkins();
  if(ui.missionDialog.open)renderMissions();
  arcade?.render();
  if(game.state==='over')results();
}
function updateCharge(){
  ui.shieldHud.classList.toggle('active',game.shield);
  ui.shieldText.textContent=game.shield?'LISTO':game.charge+'/5';
  ui.shieldHud.setAttribute('aria-label',game.shield?'Escudo activo. Te protege de un choque.':game.charge+' de 5 estrellas para un escudo.');
  [...ui.chargeDots.children].forEach((dot,i)=>dot.classList.toggle('charged',i<game.charge));
  updatePowers();
}
let powerStatusKey='',displayedMagnetSeconds=0;
function updatePowers(){
  const power=game.magnet;displayedMagnetSeconds=Math.ceil(power.remaining);
  const key=[game.mode,game.state,game.stars,power.ready,power.used,displayedMagnetSeconds,game.score].join(':');if(key===powerStatusKey)return;powerStatusKey=key;
  ui.magnetBtn.disabled=game.state!=='playing'||!power.ready;
  ui.magnetBtn.classList.toggle('ready',power.ready);ui.magnetBtn.classList.toggle('active',power.remaining>0);
  ui.magnetStatus.textContent=power.remaining>0?displayedMagnetSeconds+' s':power.ready?'¡Listo!':power.used?'Usado':Math.min(game.stars,POWERS.magnetAt)+'/'+POWERS.magnetAt+' ✦';
  ui.magnetBtn.setAttribute('aria-label','Imán. '+(power.remaining>0?'Activo. '+ui.magnetStatus.textContent:power.ready?'Activar con E.':power.used?'Ya usado en esta partida.':'Reúne '+POWERS.magnetAt+' estrellas en esta partida.'));
  const d=difficulty(game.score,game.mode);ui.levelBadge.textContent=(game.mode==='chaos'?'CAOS · ':'')+(d.next===null?'MÁXIMO':'NIVEL '+d.level);ui.levelBadge.title=d.next?'Próximo cambio a los '+d.next+' puntos':'Dificultad máxima';
}
function showState(){
  ui.homeScreen.hidden=game.state!=='ready';ui.pauseScreen.hidden=game.state!=='paused';ui.overScreen.hidden=game.state!=='over';
  ui.hud.hidden=game.state==='ready'||game.state==='over';ui.pauseBtn.hidden=game.state==='ready'||game.state==='over';
  ui.pauseBtn.querySelector('use').setAttribute('href',game.state==='paused'?'#i-play':'#i-pause');
  ui.pauseBtn.setAttribute('aria-label',game.state==='paused'?'Continuar partida':'Pausar partida');
  ui.abilityBar.hidden=game.state==='ready'||game.state==='over';updatePowers();
  ui.arena.dataset.state=game.state;
}
function results(){
  const record=game.score>runBest;
  ui.resultEyebrow.textContent=record?'¡NUEVO RÉCORD!':'FIN DEL VUELO';
  ui.resultTitle.textContent=record?'Ese vuelo fue tuyo.':'Un vuelo más.';
  ui.resultScore.textContent=game.score;ui.resultBest.textContent=progress.bestFor(game.mode);ui.resultStars.textContent=game.stars;
  const earned=medal(game.score);ui.resultMedal.dataset.medal=earned.id;ui.medalName.textContent=earned.name;
  ui.flightSummary.textContent=game.perfects?game.perfects+' perfectos · mejor combo ×'+game.bestCombo+(game.bonusStars?' · +'+game.bonusStars+' ✦ de bonus':''):'Por el centro: 3 perfectos seguidos dan 1 ✦.';
  const available=MISSIONS.filter(m=>!(progress.claimed&m.bit)&&progress[m.metric]>=m.target).length;
  ui.resultMissionsBtn.textContent=available?'Recoger '+available+' recompensa'+(available===1?'':'s'):'Ver misiones';
  const next=progress.next();
  ui.nextGoal.textContent=next?(progress.stars>=next.cost?'Ya puedes comprar un skin. Abre tu colección.':'Tus estrellas se quedan contigo. Próximo skin: '+next.cost+' ✦. Te faltan '+(next.cost-progress.stars)+'.'):SKINS.some(s=>s.caseOnly&&!progress.has(s.id))?'Encuentra los 3 skins exclusivos del cofre dorado en Arcade.':SKINS.some(s=>s.promoOnly&&!progress.has(s.id))?'Todavía queda una sorpresa en tu colección.':'Colección completa. ¿Hasta dónde puedes llegar?';
}
function onGameEvent(e){
  renderer.event(e,game);
  if(e.type==='flap')sound.note(590,.08,'triangle',.025);
  if(e.type==='start'){ui.score.textContent='0';updateCharge();showState()}
  if(e.type==='start')updateCombo();
  if(e.type==='score'){
    const improved=game.score>progress.bestFor(game.mode);progress.record(game.score,false,game.mode);if(improved)sync.record(game.score,0,game.mode);
    ui.score.textContent=game.score;updateRecords();
    if(!motion.matches&&ui.score.animate){scoreAnimation?.cancel();scoreAnimation=ui.score.animate([{transform:'scale(1)'},{transform:'scale(1.13)',offset:.35},{transform:'scale(1)'}],{duration:190,easing:'ease-out'})}
    sound.note(940,.13,'sine',.04);updatePowers();
  }
  if(e.type==='precision'){
    updateCombo();
    if(e.bestCombo>progress.maxCombo){progress.maxCombo=e.bestCombo;sync.record(0,e.bestCombo,game.mode);updateRecords()}
    if(e.perfect&&e.combo%3===0){toast('Combo ×'+e.combo+' · +1 ✦',1.5);sound.note(1380,.12);sound.note(1720,.15,'sine',.035,.09)}
  }
  if(e.type==='star'){sync.credit(runId+':'+game.stars);updateCharge();if(!e.bonus)sound.note(1290,.12,'triangle',.035)}
  if(e.type==='shield'){updateCharge();toast('Escudo listo · un choque extra');sound.note(770,.24,'sine',.05)}
  if(e.type==='save'){updateCharge();sound.note(320,.24,'triangle',.055)}
  if(e.type==='zigzag'){toast('¡Zigzag! 3 tubos sin golpes = +2 ✦',2.2);announce('Se acerca un zigzag. Cruza tres tubos sin chocar para ganar dos estrellas.');sound.note(740,.12,'triangle',.035)}
  if(e.type==='zigzag-clear'){toast('¡Zigzag superado! +2 ✦',2);announce('Zigzag superado. Dos estrellas extra.');sound.note(1120,.12,'triangle',.04);sound.note(1450,.18,'sine',.035,.09)}
  if(e.type==='level'){
    const chaos=game.mode==='chaos',d=difficulty(e.score,game.mode),before=difficulty(e.score-1,game.mode);
    const change=d.speed>before.speed&&d.gap<before.gap?'más rápido · menos espacio':d.speed>before.speed?'más rápido':'menos espacio';
    const message=(chaos?'Caos':'Nivel '+e.level)+' · '+change;toast(message,chaos?1.25:2.2);announce(message);updatePowers();sound.note(1050,chaos?.1:.18);
  }
  if(e.type==='power-ready'){updatePowers();toast('Imán listo · E o su botón',2.8);sound.note(1440,.19)}
  if(e.type==='power'||e.type==='power-end'){updatePowers();if(e.type==='power'){sound.note(1100,.25,'triangle');announce('Imán activo durante ocho segundos.')}}
  if(e.type==='pause'||e.type==='resume'){accumulator=0;last=0;showState()}
  if(e.type==='over'){
    endedAt=performance.now();results();showState();ui.toast.hidden=true;sync.flush();
    sound.note(190,.3,'triangle',.055);announce('Fin del vuelo. '+game.score+' puntos. Récord de '+(game.mode==='chaos'?'Caos':'Clásico')+' '+progress.bestFor(game.mode)+'.');
  }
}
function updateCombo(){ui.comboHud.hidden=!game.combo;ui.comboText.textContent='×'+game.combo;ui.comboHud.setAttribute('aria-label',game.combo+' tubos perfectos seguidos')}
function dialogOpen(){return ui.skinDialog.open||ui.missionDialog.open||arcade?.ui.arcadeDialog.open}
function begin(){if(dialogOpen())return;sound.unlock();runId=crypto.randomUUID();runBest=progress.bestFor(game.mode);accumulator=0;last=0;ui.toast.hidden=true;game.begin();if(!hasSeenTip){toast('3 por el centro = +1 ✦ · 5 ✦ cargan el escudo',3);hasSeenTip=true}ui.game.focus({preventScroll:true})}
function goHome(){game.reset();accumulator=0;last=0;ui.toast.hidden=true;updateRecords();updateCharge();showState()}
function modeUI(){
  const chaos=game.mode==='chaos',label=chaos?'Caos':'Clásico';document.body.dataset.mode=game.mode;
  ui.classicModeBtn.setAttribute('aria-pressed',String(!chaos));ui.chaosModeBtn.setAttribute('aria-pressed',String(chaos));
  ui.modeHint.textContent=chaos?'Velocidad cada 3 · hueco cada 5. Desde 60 puntos, cambios suaves cada 3; desde 69, solo velocidad.':'Niveles a los 20, 50, 100 y 120 puntos.';
  ui.homeRecordLabel.textContent='Récord · '+label;ui.resultRecordLabel.textContent='Récord · '+label;ui.playLabel.textContent=chaos?'Jugar Caos':'Jugar';
}
function selectMode(mode){
  if(dialogOpen()||mode===game.mode)return;
  sync.record(game.score,game.bestCombo,game.mode);sync.flush();
  if(!game.setMode(mode))return;progress.mode=mode;progress.write('mode',mode);
  scoreAnimation?.cancel();scoreAnimation=null;renderer.event({type:'start'},game);renderer.angle=0;renderer.trail=0;
  goHome();modeUI();announce('Modo '+(mode==='chaos'?'Caos':'Clásico')+'. Nueva partida preparada.');
}
function resume(){sound.unlock();game.resume();ui.game.focus({preventScroll:true})}
function applyTheme(){
  document.body.dataset.theme=progress.theme;renderer.setTheme(progress.theme);
  const scenes={pink:{name:'Atardecer',caption:'ATARDECER EN MIAMI',icon:'sun',color:'#160d2e'},blue:{name:'Noche azul',caption:'BAJO LA LUNA DE MIAMI',icon:'moon',color:'#0b1830'},vampire:{name:'Vampiros',caption:'LA NOCHE DEL CASTILLO',icon:'bat',color:'#1c1029'},halloween:{name:'Halloween',caption:'TRAVESURAS BAJO LA LUNA',icon:'pumpkin',color:'#20162b'},space:{name:'Cosmos',caption:'MÁS ALLÁ DE MIAMI',icon:'planet',color:'#0d1530'},greenhill:{name:'Green Hill',caption:'BRISA EN GREEN HILL',icon:'hill',color:'#113d34'},sunflowers:{name:'Girasoles',caption:'VIENTO ENTRE GIRASOLES',icon:'flower',color:'#343f2c'},smallville:{name:'Smallville',caption:'LLUVIA DE METEOROS',icon:'meteor',color:'#152b3e'},ghoul:{name:'Tokyo Ghoul',caption:'1000 − 7',icon:'mask',color:'#131e25'},kyoto:{name:'Kioto',caption:'NOCHE ENTRE CEREZOS',icon:'torii',color:'#20193c'},atlantis:{name:'Atlántida',caption:'BAJO EL MAR',icon:'waves',color:'#104b68'},konoha:{name:'Konoha',caption:'LA VOLUNTAD DEL FUEGO',icon:'leaf',color:'#19392f'},cityz:{name:'Ciudad Z',caption:'ONE PUNCH MAN · CIUDAD Z',icon:'fist',color:'#252c40'},dragonball:{name:'Dragon Ball',caption:'DRAGON BALL · TENKAICHI',icon:'dragonball',color:'#193d4d'}};
  const index=THEME_IDS.indexOf(progress.theme),current=scenes[progress.theme],next=scenes[THEME_IDS[(index+1)%THEME_IDS.length]];
  ui.themeName.textContent=current.name;ui.sceneCaption.textContent=current.caption;ui.sceneIndex.textContent=(index+1)+'/'+THEME_IDS.length;
  ui.themeIcon.querySelector('use').setAttribute('href','#i-'+current.icon);
  ui.themeBtn.setAttribute('aria-label','Escena '+current.name+'. Cambiar a '+next.name+'.');
  document.querySelector('meta[name="theme-color"]').content=current.color;
}
function soundUI(){ui.soundBtn.querySelector('use').setAttribute('href',progress.sound?'#i-sound':'#i-mute');ui.soundBtn.setAttribute('aria-label',progress.sound?'Silenciar sonido':'Activar sonido');ui.soundBtn.setAttribute('aria-pressed',String(progress.sound))}
const skinCards=new Map();
function renderSkins(){
  ui.collectionBest.textContent=progress.best;ui.collectionChaosBest.textContent=progress.chaosBest;ui.collectionWallet.textContent=progress.stars;
  ui.collectionCount.textContent=(progress.owned.size-1)+' de '+(SKINS.length-1)+' skins';
  ui.shopMessage.textContent=sync.busy?'Un momento…':sync.message||(!sync.ready?'Cargando tu colección…':sync.draft.events.length?'Guardando tus últimas estrellas…':'Elige un skin. Las tres primeras sorpresas se revelan al comprarlas.');
  ui.promoSubmit.disabled=sync.busy||!sync.ready||!!sync.arcadePending;ui.promoCode.readOnly=sync.busy;
  previews=[];
  for(const skin of SKINS){
    let row=skinCards.get(skin.id);
    if(!row){
      const button=document.createElement('button');button.type='button';button.className='skin-card';button.dataset.skin=skin.id;
      const name=document.createElement('strong'),status=document.createElement('small');button.append(name,status);
      row={button,name,status,canvas:null,mark:null};skinCards.set(skin.id,row);ui.skinGrid.append(button);
      button.addEventListener('click',async()=>{
        const unlocked=progress.has(skin.id),ok=await sync.action(unlocked?'select':'buy',skin.id);
        if(ok){renderer.setSkin(progress.skin);sound.unlock();sound.note(unlocked?720:1200,.18);renderSkins();ui.shopMessage.textContent=unlocked?'Skin seleccionado.':'¡'+skin.name+' es tuyo!';announce(ui.shopMessage.textContent)}
        button.focus({preventScroll:true});
      });
    }
    const {button:b,name,status}=row,unlocked=progress.has(skin.id),visible=unlocked||!skin.secret;
    b.disabled=sync.busy||!sync.ready||!!sync.arcadePending||(!unlocked&&(skin.caseOnly||skin.promoOnly));b.classList.toggle('selected',unlocked&&progress.skin===skin.id);b.classList.toggle('affordable',!unlocked&&!skin.caseOnly&&!skin.promoOnly&&progress.stars>=skin.cost);if(skin.rarity)b.dataset.rarity=skin.rarity;
    if(unlocked)b.setAttribute('aria-pressed',String(progress.skin===skin.id));else b.removeAttribute('aria-pressed');
    b.setAttribute('aria-label',(visible?skin.name:'Skin secreto')+(unlocked?(progress.skin===skin.id?', seleccionado':', seleccionar'):skin.caseOnly?', exclusivo del cofre dorado':skin.promoOnly?', desbloquear con un código':', comprar por '+skin.cost+' estrellas'));
    if(visible){
      row.mark?.remove();row.mark=null;
      if(!row.canvas){row.canvas=document.createElement('canvas');row.canvas.width=204;row.canvas.height=144;row.canvas.setAttribute('aria-hidden','true');b.prepend(row.canvas);renderer.preview(row.canvas,skin.id,renderer.clock)}
      previews.push({canvas:row.canvas,id:skin.id});
    }else{
      row.canvas?.remove();row.canvas=null;
      if(!row.mark){row.mark=document.createElement('span');row.mark.className='mystery';row.mark.textContent='?';row.mark.setAttribute('aria-hidden','true');b.prepend(row.mark)}
    }
    name.textContent=visible?skin.name:'Skin secreto';status.className=unlocked?'':'skin-price';status.textContent=unlocked?(progress.skin===skin.id?'Seleccionado':'Usar skin'):skin.caseOnly?'Solo en el cofre dorado':skin.promoOnly?'Exclusivo · Código':skin.cost+' ✦ · '+(progress.stars>=skin.cost?'Comprar':'faltan '+(skin.cost-progress.stars));
  }
}
function resetPromoMessage(){ui.promoMessage.textContent='¿Tienes un código? Desbloquea una sorpresa.';delete ui.promoMessage.dataset.result}
function openSkins(){game.pause();renderSkins();resetPromoMessage();ui.resetConfirm.hidden=true;ui.skinDialog.showModal();previewLast=0}
const missionCards=new Map();
function renderMissions(){
  ui.missionCount.textContent=MISSIONS.filter(m=>progress.claimed&m.bit).length+' de '+MISSIONS.length+' completadas';
  ui.missionWallet.textContent=progress.stars;ui.pilotCombo.textContent=progress.maxCombo;ui.pilotStars.textContent=progress.totalStars;
  ui.missionMessage.textContent=sync.busy?'Guardando…':sync.message||(!sync.ready?'Cargando tus misiones…':'');

  for(const mission of MISSIONS){
    const value=Math.min(progress[mission.metric],mission.target),claimed=!!(progress.claimed&mission.bit),ready=value>=mission.target;
    let row=missionCards.get(mission.id);
    if(!row){
      const card=document.createElement('article');card.className='mission-card';card.tabIndex=-1;
      const header=document.createElement('div');header.className='mission-card-head';
      const icon=document.createElementNS('http://www.w3.org/2000/svg','svg'),use=document.createElementNS('http://www.w3.org/2000/svg','use');use.setAttribute('href','#i-'+mission.icon);icon.setAttribute('aria-hidden','true');icon.append(use);header.append(icon);
      const title=document.createElement('h3');title.textContent=mission.title;header.append(title);
      const reward=document.createElement('span');reward.className='mission-reward';reward.textContent='+'+mission.reward+' ✦';header.append(reward);card.append(header);
      const description=document.createElement('p');description.textContent=mission.description;card.append(description);
      const bar=document.createElement('progress');bar.max=mission.target;card.append(bar);
      const footer=document.createElement('div');footer.className='mission-card-foot';const count=document.createElement('span');footer.append(count);
      const button=document.createElement('button');button.type='button';button.className='mission-claim';button.dataset.mission=mission.id;
      button.addEventListener('click',async()=>{if(await sync.action('claim',mission.id)){sound.unlock();sound.note(1300,.2);announce('Misión completada. '+mission.reward+' estrellas.');ui.missionMessage.textContent='¡+'+mission.reward+' estrellas para tu colección!'}(button.disabled?card:button).focus({preventScroll:true})});
      footer.append(button);card.append(footer);ui.missionList.append(card);row={card,bar,count,button};missionCards.set(mission.id,row);
    }
    row.card.classList.toggle('complete',claimed);row.card.classList.toggle('ready',ready&&!claimed);
    row.bar.value=value;row.bar.setAttribute('aria-label',mission.title+': '+value+' de '+mission.target);row.count.textContent=value+' / '+mission.target;
    row.button.disabled=claimed||!ready||sync.busy||!sync.ready||!!sync.arcadePending;row.button.textContent=claimed?'Recogida':ready?'Recoger':'En curso';
  }
}
function openMissions(){game.pause();renderMissions();ui.missionDialog.showModal()}
function instant(button,fn){
  button.addEventListener('pointerdown',e=>{if(!e.isPrimary||e.button!==0)return;e.preventDefault();fn()});
  button.addEventListener('click',e=>{if(e.detail===0)fn()});
}
instant($('playBtn'),begin);instant($('retryBtn'),begin);instant($('resumeBtn'),resume);
instant(ui.magnetBtn,()=>game.activatePower('magnet'));
$('homeBtn').addEventListener('click',e=>{e.preventDefault();if(game.state==='playing')game.pause();else goHome()});
$('pauseHomeBtn').addEventListener('click',goHome);
ui.pauseBtn.addEventListener('click',()=>game.state==='playing'?game.pause():resume());
ui.themeBtn.addEventListener('click',()=>{progress.theme=THEME_IDS[(THEME_IDS.indexOf(progress.theme)+1)%THEME_IDS.length];progress.write('theme',progress.theme);applyTheme()});
ui.classicModeBtn.addEventListener('click',()=>selectMode('classic'));ui.chaosModeBtn.addEventListener('click',()=>selectMode('chaos'));
ui.soundBtn.addEventListener('click',()=>{progress.sound=!progress.sound;progress.write('sound',progress.sound?'on':'off');soundUI();sound.unlock();sound.note(620,.1)});
ui.skinsBtn.addEventListener('click',openSkins);$('resultSkinsBtn').addEventListener('click',openSkins);
ui.missionsBtn.addEventListener('click',openMissions);ui.resultMissionsBtn.addEventListener('click',openMissions);
$('closeMissionsBtn').addEventListener('click',()=>ui.missionDialog.close());
ui.missionDialog.addEventListener('click',e=>{if(e.target!==ui.missionDialog)return;const r=ui.missionDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)ui.missionDialog.close()});
$('closeSkinsBtn').addEventListener('click',()=>ui.skinDialog.close());
ui.promoForm.addEventListener('submit',async e=>{
  e.preventDefault();if(sync.busy||!sync.ready||sync.arcadePending)return;
  const code=ui.promoCode.value.trim();if(!code){ui.promoMessage.textContent='Escribe un código para continuar.';ui.promoCode.focus();return}
  const owned=new Set(progress.owned);ui.promoMessage.textContent='Comprobando código…';delete ui.promoMessage.dataset.result;
  const ok=await sync.action('redeem',code);
  if(ok){const unlocked=SKINS.find(s=>s.promoOnly&&!owned.has(s.id)&&progress.has(s.id));ui.promoCode.value='';ui.promoMessage.textContent=unlocked?'¡Skin '+unlocked.name+' desbloqueado y seleccionado!':'Ya tienes este skin. Puedes seleccionarlo en tu colección.';ui.promoMessage.dataset.result='success';sound.unlock();sound.note(1320,.2);announce(ui.promoMessage.textContent)}
  else{ui.promoMessage.textContent=sync.message||'No se pudo activar. Vuelve a intentarlo.';ui.promoMessage.dataset.result='error'}
  ui.promoCode.focus({preventScroll:true});
});
ui.skinDialog.addEventListener('click',e=>{if(e.target!==ui.skinDialog)return;const r=ui.skinDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)ui.skinDialog.close()});
ui.skinDialog.addEventListener('close',()=>{previews=[];ui.resetConfirm.hidden=true});
$('resetBtn').addEventListener('click',()=>{ui.resetConfirm.hidden=false;$('cancelResetBtn').focus()});
$('cancelResetBtn').addEventListener('click',()=>{ui.resetConfirm.hidden=true;$('resetBtn').focus()});
$('confirmResetBtn').addEventListener('click',async()=>{const button=$('confirmResetBtn');button.disabled=true;if(await sync.action('reset')){renderer.setSkin('original');goHome();renderSkins();resetPromoMessage();ui.promoCode.value='';ui.resetConfirm.hidden=true;$('resetBtn').focus();announce('Récord, estrellas y colección reiniciados.')}button.disabled=false});
ui.game.addEventListener('pointerdown',e=>{
  if(!e.isPrimary||e.button!==0||dialogOpen())return;
  e.preventDefault();sound.unlock();
  if(game.state==='ready')begin();else if(game.state==='playing')game.flap();
},{passive:false});
document.addEventListener('keydown',e=>{
  if(dialogOpen()||e.repeat||e.altKey||e.ctrlKey||e.metaKey)return;
  const interactive=e.target.closest?.('button,a,input,select,textarea');
  if(e.code==='KeyP'||e.code==='Escape'){e.preventDefault();if(game.state==='playing')game.pause();else if(game.state==='paused')resume();return}
  if(e.code==='KeyE'){e.preventDefault();game.activatePower('magnet');return}
  if(e.code!=='Space'&&e.code!=='ArrowUp')return;
  if(interactive)return;
  e.preventDefault();sound.unlock();
  if(game.state==='playing')game.flap();else if(game.state==='paused')resume();else if(game.state==='ready'||performance.now()-endedAt>300)begin();
});
function resize(){renderer.resize(ui.arena.clientWidth,window.devicePixelRatio||1)}
const observer=new ResizeObserver(resize);observer.observe(ui.arena);
motion.addEventListener('change',e=>renderer.reducedMotion=e.matches);
function frame(now){
  raf=0;if(document.hidden)return;
  const dt=last?Math.max(0,(now-last)/1000):0;last=now;
  if(dt>.25&&game.state==='playing')game.pause();
  if(game.state==='playing'){
    accumulator+=Math.min(dt,.1);
    while(accumulator+1e-12>=STEP){game.step(STEP);accumulator=Math.max(0,accumulator-STEP);if(game.state!=='playing'){accumulator=0;break}}
  }else accumulator=0;
  const modal=dialogOpen();
  if(!modal||ui.skinDialog.open)renderer.animate(Math.min(dt,.05),game);
  if(game.magnet.remaining>0&&Math.ceil(game.magnet.remaining)!==displayedMagnetSeconds)updatePowers();
  const playing=game.state==='playing';
  if(!modal&&(playing||now-lastDraw>=1000/30)){
    // Canvas resizing invalidates its backing store; do it before drawing and away from milestones.
    if(pendingQuality<renderer.quality&&(!playing||game.score<3)){renderer.quality=pendingQuality;resize();renderCost=0;renderSamples=0}
    const renderStart=performance.now();renderer.draw(game,playing?accumulator/STEP:1);
    renderCost=renderCost*.95+(performance.now()-renderStart)*.05;
    if(++renderSamples>90&&renderCost>8&&renderer.quality>1)pendingQuality=1;
    lastDraw=now;
  }
  if(ui.skinDialog.open&&!motion.matches&&now-previewLast>1000/24){for(const p of previews)renderer.preview(p.canvas,p.id,renderer.clock);previewLast=now}
  if(!ui.toast.hidden&&now>toastUntil)ui.toast.hidden=true;
  raf=requestAnimationFrame(frame);
}
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){game.pause();if(raf)cancelAnimationFrame(raf);raf=0;last=0}
  else {last=0;if(!raf)raf=requestAnimationFrame(frame)}
});
window.addEventListener('blur',()=>game.pause());
window.addEventListener('online',()=>sync.retry());
window.addEventListener('focus',()=>{if(sync.ready)sync.retry()});
window.addEventListener('pagehide',()=>{game.pause();sync.save();sync.flush(true);if(raf)cancelAnimationFrame(raf);raf=0});
window.addEventListener('pageshow',()=>{last=0;if(!raf)raf=requestAnimationFrame(frame)});
applyTheme();modeUI();renderer.setSkin(progress.skin);soundUI();updateRecords();updateCharge();showState();resize();renderer.draw(game);
if(!raf)raf=requestAnimationFrame(frame);
