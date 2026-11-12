(() => {
'use strict';
const {ROSTER,Match,specFor,FLOOR}=Nightborn;
const $=id=>document.getElementById(id),canvas=$('game'),ctx=canvas.getContext('2d');
const images={},bounds={},held=new Set(),down=new Set();
const ASSET=name=>((window.NIGHTBORN_ASSETS&&window.NIGHTBORN_ASSETS[name])||('assets/'+name));
const keymap={j:'light',k:'heavy',l:'cloak',u:'s1',i:'s2',o:'s3',p:'drain',g:'super'};
let selected='crimson',mode='training',match=null,ready=false,paused=false,debug=false,audioOn=true;
let pendingAction=null,clock=0,last=performance.now(),accumulator=0,fpsTime=0,fpsFrames=0,visuals=[],shake=0,flash=0,bannerUntil=0;
let audioCtx=null;
function sound(kind){
 if(!audioOn)return;
 try{audioCtx=audioCtx||new(window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume();const t=audioCtx.currentTime,o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=kind==='impact'?'sawtooth':'sine';const freq=kind==='impact'?150:kind==='super'?65:340;o.frequency.setValueAtTime(freq,t);o.frequency.exponentialRampToValueAtTime(kind==='impact'?45:freq*1.9,t+.12);g.gain.setValueAtTime(.055,t);g.gain.exponentialRampToValueAtTime(.001,t+.19);o.connect(g);g.connect(audioCtx.destination);o.start(t);o.stop(t+.2);}catch(_){audioOn=false;}
}
ROSTER.forEach((c,i)=>{
 const b=document.createElement('button');b.type='button';b.className='fighter-card'+(!i?' selected':'');b.style.setProperty('--fighter',c.color);b.setAttribute('aria-pressed',String(!i));
 b.innerHTML=`<span class="number">0${i+1}</span><div class="card-art"><img src="${ASSET(c.asset+'-portrait.webp')}" alt="${c.name}全身角色美术"></div><div class="card-copy"><h2>${c.name}</h2><span class="role">${c.role}</span><p>${c.tag}</p><div class="moves">${c.skills.join(' · ')}<br>${c.drain} · ${c.super}</div></div>`;
 b.onclick=()=>{selected=c.id;document.querySelectorAll('.fighter-card').forEach(x=>{x.classList.remove('selected');x.setAttribute('aria-pressed','false')});b.classList.add('selected');b.setAttribute('aria-pressed','true');if($('opponent').value===selected)$('opponent').value=ROSTER[(i+1)%4].id;};$('roster').appendChild(b);
 const opt=document.createElement('option');opt.value=c.id;opt.textContent=c.name;$('opponent').appendChild(opt);
});$('opponent').value='night';
function chooseMode(m){mode=m;for(const name of ['training','duel']){$(name+'-btn').classList.toggle('selected',name===m);$(name+'-btn').setAttribute('aria-pressed',String(name===m));}}
$('training-btn').onclick=()=>chooseMode('training');$('duel-btn').onclick=()=>chooseMode('duel');
function loadImage(src){return new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(new Error(src));im.src=src;});}
function measure(im){
 const w=Math.floor(im.width/4),h=Math.floor(im.height/3),scratch=document.createElement('canvas');scratch.width=w;scratch.height=h;const cx=scratch.getContext('2d',{willReadFrequently:true});const cells=[];
 for(let i=0;i<12;i++){cx.clearRect(0,0,w,h);cx.drawImage(im,i%4*w,Math.floor(i/4)*h,w,h,0,0,w,h);const data=cx.getImageData(0,0,w,h).data;let minY=h,maxY=0;for(let y=0;y<h;y++)for(let x=0;x<w;x++){if(data[(y*w+x)*4+3]>45){minY=Math.min(minY,y);maxY=Math.max(maxY,y);}}cells.push({top:minY,bottom:maxY,height:maxY-minY});}return cells;
}
async function preload(){
 const jobs=ROSTER.map(async c=>{images[c.id]=await loadImage(ASSET(c.asset+'-sheet.webp'));bounds[c.id]=measure(images[c.id]);});jobs.push(loadImage(ASSET('arena-bg.webp')).then(im=>images.bg=im));
 try{await Promise.all(jobs);ready=true;$('start-btn').disabled=false;$('start-btn').textContent='进入血月竞技场';$('load-status').textContent='美术已载入 · 可离线游玩';}catch(e){$('load-status').textContent='部分美术素材未能载入，请刷新页面重试。';$('load-status').classList.add('loading-error');$('start-btn').textContent='素材加载失败';console.error(e);}
}
preload();
function start(){if(!ready)return;match=new Match(selected,$('opponent').value,mode);paused=false;held.clear();down.clear();pendingAction=null;accumulator=0;visuals=[];shake=flash=0;$('select-screen').classList.add('hidden');$('game-screen').classList.remove('hidden');$('modal').classList.add('hidden');$('player-name').textContent=match.fighters[0].data.name;$('enemy-name').textContent=match.fighters[1].data.name;$('mode-label').textContent=mode==='training'?'血月练习场 · 木桩自动恢复':'血月决斗 · 人机对战';$('round-label').textContent=mode==='training'?'TRAINING':'ROUND 01';$('skill-readout').textContent='准备战斗';$('banner').style.opacity=0;bannerUntil=0;buildSkillbar();sound('start');updateHUD();}
$('start-btn').onclick=start;$('reset-btn').onclick=start;
function toSelection(){match=null;paused=false;held.clear();down.clear();visuals=[];$('game-screen').classList.add('hidden');$('select-screen').classList.remove('hidden');}
$('quit-btn').onclick=toSelection;$('modal-select').onclick=toSelection;
function pause(){if(!match||match.phase==='ended')return;paused=!paused;held.clear();down.clear();accumulator=0;$('pause-btn').textContent=paused?'继续 Esc':'暂停 Esc';if(paused){showModal('PAUSED','已暂停','按 Esc 或点击继续返回战斗。','继续战斗',pause);}else $('modal').classList.add('hidden');}
$('pause-btn').onclick=pause;$('sound-btn').onclick=()=>{audioOn=!audioOn;$('sound-btn').textContent='音效 '+(audioOn?'开':'关');$('sound-btn').setAttribute('aria-pressed',String(audioOn));};
function toggleDebug(){debug=!debug;$('debug-btn').setAttribute('aria-pressed',String(debug));$('debug-btn').textContent=debug?'判定框 开':'判定框 H';}
$('debug-btn').onclick=toggleDebug;
function showModal(kicker,title,note,button,fn){$('modal-kicker').textContent=kicker;$('modal-title').textContent=title;$('modal-note').textContent=note;$('modal-primary').textContent=button;$('modal-primary').onclick=fn;$('modal').classList.remove('hidden');}
function buildSkillbar(){
 $('skillbar').innerHTML='';const c=match.fighters[0].data;
 for(const[k,action]of Object.entries(keymap)){const s=specFor(c.id,action),b=document.createElement('button');b.className='skill-button';b.dataset.action=action;b.style.setProperty('--skill',action==='super'?'#e8cd81':c.color);b.innerHTML=`<span class="key">${k.toUpperCase()}</span><small>${s.cost?'聚气 '+s.cost:'普通攻击'}</small><strong>${s.name}</strong><span class="cooldown"></span><span class="cooldown-cover"></span>`;
 b.onclick=()=>{if(match&&!paused)pendingAction=action;};b.onmouseenter=b.onfocus=()=>{$('skill-tip').textContent=action.startsWith('s')&&action!=='super'?c.desc[Number(action[1])-1]:action==='drain'?'近身抓取，命中后回血；可被防御。':action==='super'?'需要 100 聚气。按住 Q 或命中对手来蓄积。':'有效帧命中才会造成伤害，可被防御或躲开。';};$('skillbar').appendChild(b);
 }
}
function input(){let action=pendingAction;pendingAction=null;for(const[k,a]of Object.entries(keymap))if(down.has(k)){action=a;break;}const cmd={move:(held.has('d')?1:0)-(held.has('a')?1:0),run:held.has('shift'),jump:down.has('w'),guard:held.has('s'),charge:held.has('q'),action};down.clear();return cmd;}
function getKey(e){return /^Key[A-Z]$/.test(e.code)?e.code.slice(3).toLowerCase():e.key.toLowerCase();}
addEventListener('keydown',e=>{if(!match||e.target.tagName==='SELECT')return;const k=getKey(e);if(['a','d','w','s','q','j','k','l','u','i','o','p','g','h','r','escape','shift',' '].includes(k))e.preventDefault();if(e.repeat)return;if(k==='escape'){pause();return;}if(k==='r'){start();return;}if(k==='h'){toggleDebug();return;}if(!held.has(k))down.add(k);held.add(k);});
addEventListener('keyup',e=>held.delete(getKey(e)));
addEventListener('blur',()=>{held.clear();down.clear();if(match&&!paused&&match.phase!=='ended')pause();});
document.querySelectorAll('[data-key]').forEach(b=>{const k=b.dataset.key;b.onpointerdown=e=>{e.preventDefault();b.setPointerCapture(e.pointerId);held.add(k);down.add(k);};b.onpointerup=b.onpointercancel=e=>{held.delete(k);};});
function announce(text,seconds=.8){$('banner').textContent=text;$('banner').style.opacity=1;bannerUntil=clock+seconds;}
function effect(kind,options){visuals.push({kind,age:0,life:.55,...options});if(visuals.length>380)visuals.splice(0,visuals.length-380);}
function sparks(x,y,color,count=20){for(let i=0;i<count;i++){const a=Math.random()*Math.PI*2,s=100+Math.random()*420;effect('spark',{x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:.2+Math.random()*.4,color,width:1+Math.random()*4});}}
function events(){for(const e of match.takeEvents()){
 if(e.type==='fight')announce('FIGHT',.65);
 if(e.type==='action'){$('skill-readout').textContent=(e.f===0?'你 · ':'对手 · ')+e.name;}
 if(e.type==='notice')$('skill-readout').textContent=e.text;
 if(e.type==='super'){announce(e.name,1);flash=.5;shake=.45;sound('super');}
 if(e.type==='cast'){effect('cast',{...e,life:e.key==='super'?.85:.5});sound('cast');}
 if(e.type==='impact'){sparks(e.x,e.y,e.blocked?'#a5dcff':e.color,e.blocked?12:28);effect('impact',{...e,life:.25});effect('number',{x:e.x,y:e.y-25,text:e.blocked?'防御 '+e.damage:String(e.damage),color:e.blocked?'#b0dbff':'#fff0be',life:.65});shake=Math.max(shake,e.blocked?.08:.2);flash=Math.max(flash,.05);sound('impact');}
 if(e.type==='jump'||e.type==='land'||e.type==='revive')effect('ground',{...e,life:.45,color:e.color||'#bea4ee'});
 if(e.type==='drain'){effect('drain',{...e,life:.8});effect('number',{x:match.fighters[e.to].x,y:match.fighters[e.to].y-230,text:'+'+e.heal,color:'#ff9fa4',life:.8});}
 if(e.type==='teleport'){effect('ghost',{...e,frame:7,life:.45});sparks(e.to,e.y-150,e.color,28);}
 if(e.type==='ko')announce('K.O.',1);
 if(e.type==='timeout')announce('TIME UP',.8);
 if(e.type==='end'){showModal(e.winner===0?'VICTORY':e.winner===1?'DEFEAT':'DRAW',e.winner<0?'平局':match.fighters[e.winner].data.name+' 获胜','按 R 可立刻重开；也可以返回选择其他角色。','再战一局',start);}
}}
function updateHUD(){
 if(!match)return;for(const f of match.fighters){const prefix=f.index?'enemy':'player',hp=f.hp/f.data.hp*100;$(prefix+'-hp').style.width=hp+'%';$(prefix+'-lag').style.width=hp+'%';$(prefix+'-hp-value').textContent=Math.ceil(f.hp)+' / '+f.data.hp;$(prefix+'-meter').style.width=f.energy+'%';$(prefix+'-energy').classList.toggle('ready',f.energy>=99.9);$(prefix+'-meter-value').textContent=(f.energy>=99.9?'超必杀就绪 · ':'聚气 ')+Math.floor(f.energy)+'/100';$(prefix+'-life').setAttribute('aria-valuenow',String(Math.ceil(f.hp)));$(prefix+'-life').setAttribute('aria-valuemax',String(f.data.hp));$(prefix+'-energy').setAttribute('aria-valuenow',String(Math.floor(f.energy)));$(prefix+'-energy').setAttribute('aria-valuemax','100');
 const stateNames={idle:'待机',walk:'行走',run:'奔跑',jump:'跳跃',guard:'防御',charge:'聚气',hit:'受击',down:'倒地'};let name=stateNames[f.state]||specFor(f.data.id,f.state)?.name||f.state;if(f.attack){const a=f.attack,s=a.s;name+=' · '+(a.t<s.wind?'前摇':a.t<s.wind+s.active?'有效帧':'收招');}if(f.slow>0)name+=' · 减速';if(f.transform>0)name+=' · 变身 '+f.transform.toFixed(1)+'s';$(prefix+'-state').textContent=name;
 }
 $('timer').textContent=match.mode==='training'?'∞':Math.ceil(match.time);$('training-readout').textContent=(debug?'蓝：受击框 / 红：有效攻击框　':'')+'伤害 '+match.lastDamage+' · 命中 '+match.totalHits;
 const p=match.fighters[0];$('combo').textContent=p.combo>1?p.combo+' HITS':'';
 for(const b of $('skillbar').children){const key=b.dataset.action,s=specFor(p.data.id,key),cd=p.cd[key]||0;b.classList.toggle('unready',p.energy<s.cost||cd>0);b.classList.toggle('ready',key==='super'&&p.energy>=100);b.querySelector('.cooldown').textContent=cd>0?cd.toFixed(1)+'s':'';b.querySelector('.cooldown-cover').style.height=cd>0?Math.min(100,cd/s.cd*100)+'%':'0';}
}
function pose(f){
 if(f.state==='down')return 9;if(f.state==='hit')return 8;if(f.state==='jump'&&!f.attack)return 3;
 if(f.attack){const a=f.attack,s=a.s;if(a.t<s.wind*.6)return s.key==='super'?7:5;if(a.t<s.wind)return s.key==='super'?11:5;if(a.t<s.wind+s.active)return s.pose;return a.t<s.wind+s.active+s.recovery*.55?s.pose:(s.key==='drain'?10:0);}
 if(f.transform>0)return 11;if(f.state==='walk'||f.state==='run')return [1,0,2,0][Math.floor(f.age*(f.state==='run'?14:9))%4];if(f.state==='guard')return 5;if(f.state==='charge')return 7;return 0;
}
function sprite(f,x=f.x,y=f.y,frame=pose(f),alpha=1){
 const im=images[f.data.id],b=bounds[f.data.id],cw=im.width/4,ch=im.height/3,baseScale=258/Math.max(190,b[0].height);let scale=baseScale*(f.transform>0?1.09:1),lean=0,bob=0,offset=0;
 if(f.state==='idle'||f.state==='charge'){bob=Math.sin(clock*2.8+f.index)*2;}
 if(f.state==='walk'||f.state==='run'){bob=-Math.abs(Math.sin(f.age*14))*5;lean=f.state==='run'?.055:.015;}
 if(f.attack){const a=f.attack,s=a.s,p=Math.max(0,Math.min(1,(a.t-s.wind)/(s.active+s.recovery)));offset=Math.sin(p*Math.PI)*(s.pose===4?25:6);lean=(s.pose===4?.055:0)*Math.sin(p*Math.PI);}
 if(f.state==='hit'){lean=-.09*Math.max(0,1-f.age/.4);}
 const bottom=b[frame].bottom,dy=-bottom*scale,dw=cw*scale,dh=ch*scale;
 ctx.save();ctx.globalAlpha=alpha;ctx.translate(x,y+bob);ctx.scale(f.face,1);ctx.translate(offset,0);ctx.rotate(lean);
 if(f.transform>0){ctx.shadowColor=f.data.color;ctx.shadowBlur=16;}
 if(f.invuln>0&&Math.floor(clock*24)%2)ctx.globalAlpha*=.75;
 // Small continuous deformation keeps cloak movement visible between key poses.
 const strips=(f.state==='idle'||f.state==='charge'||f.transform>0)?12:1;
 for(let n=0;n<strips;n++){const sh=ch/strips,frac=n/strips,sway=strips>1?Math.sin(clock*3.4+frac*4)*Math.pow(frac,1.5)*3.3:0;ctx.drawImage(im,(frame%4)*cw,Math.floor(frame/4)*ch+n*sh,cw,sh,-dw/2+sway,dy+n*sh*scale,dw,sh*scale+.35);}
 ctx.restore();
}
function glow(x,y,r,color,alpha=.5){if(r<=0)return;ctx.save();ctx.globalAlpha=alpha;const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);ctx.restore();}
function ring(x,y,r,color,alpha=1,rotation=0){ctx.save();ctx.globalAlpha=alpha;ctx.strokeStyle=color;ctx.lineWidth=2;ctx.translate(x,y);ctx.rotate(rotation);ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(0,0,r*.84,0,Math.PI*2);ctx.stroke();for(let i=0;i<8;i++){const a=i*Math.PI/4;ctx.beginPath();ctx.moveTo(Math.cos(a)*r*.84,Math.sin(a)*r*.84);ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);ctx.stroke();}ctx.restore();}
function bat(x,y,size,phase,color){ctx.save();ctx.translate(x,y);ctx.fillStyle=color;const w=Math.sin(phase)*size*.6;ctx.beginPath();ctx.moveTo(0,-size*.2);ctx.quadraticCurveTo(-size*.5,-size-w,-size*1.5,-size*.4-w);ctx.lineTo(-size,size*.25);ctx.lineTo(-size*.55,0);ctx.lineTo(0,size*.4);ctx.lineTo(size*.55,0);ctx.lineTo(size,size*.25);ctx.lineTo(size*1.5,-size*.4-w);ctx.quadraticCurveTo(size*.5,-size-w,0,-size*.2);ctx.fill();ctx.restore();}
function slash(x,y,size,face,color,progress){ctx.save();ctx.translate(x,y);ctx.scale(face,1);ctx.rotate(-.4+progress*.7);ctx.globalCompositeOperation='lighter';ctx.strokeStyle=color;ctx.shadowColor=color;ctx.shadowBlur=14;ctx.lineWidth=9*(1-progress)+2;ctx.beginPath();ctx.ellipse(10,0,size,size*.8,0,-1.5,1.2);ctx.stroke();ctx.strokeStyle='#fff4d6';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(10,0,size+4,size*.82,0,-1.4,1);ctx.stroke();ctx.restore();}
function drawFields(){for(const a of match.fields){const c=match.fighters[a.owner].data.color,alpha=Math.min(1,a.life*2);ctx.save();ctx.translate(a.x,FLOOR);ctx.scale(1,.27);ring(0,0,a.r,c,alpha*.9,a.age*.6);ring(0,0,a.r*.7,c,alpha*.5,-a.age);ctx.restore();glow(a.x,FLOOR-50,a.r,c,.2*alpha);if(a.s.fx==='judgment'){const pulse=(Math.sin(a.age*9)+1)/2;ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=(.1+pulse*.22)*alpha;const g=ctx.createLinearGradient(0,120,0,FLOOR);g.addColorStop(0,'transparent');g.addColorStop(.7,c);g.addColorStop(1,'#fff');ctx.fillStyle=g;ctx.fillRect(a.x-a.r*.6,120,a.r*1.2,FLOOR-120);ctx.restore();}for(let i=0;i<14;i++){const theta=i*2.4+a.age*2,r=a.r*(.3+((i*.31)% .65));ctx.fillStyle=c;ctx.globalAlpha=.6*alpha;ctx.fillRect(a.x+Math.cos(theta)*r,FLOOR-20-((a.age*60+i*18)%170),2,8);}ctx.globalAlpha=1;}}
function drawProjectiles(){for(const p of match.projectiles){const f=match.fighters[p.owner],c=f.data.color;glow(p.x,p.y,p.w,c,.25);if(p.s.fx==='clone'){sprite({...f,state:'light',attack:null,transform:0},p.x,p.y+140,4,.5);sprite({...f,state:'light',attack:null,transform:0},p.x-p.face*55,p.y+140,4,.18);}
 else if(p.s.fx==='bats'){for(let i=0;i<13;i++){const a=i*2.1;bat(p.x+Math.cos(a+p.age)*p.w*.5,p.y+Math.sin(a*1.4+p.age*2)*p.h*.5,7+(i%3)*3,clock*19+i,c);}}
 else if(p.s.fx==='orb'){glow(p.x,p.y,80,c,.8);ring(p.x,p.y,42,c,1,clock*5);ctx.fillStyle='#e7d9ff';ctx.beginPath();ctx.arc(p.x,p.y,16,0,Math.PI*2);ctx.fill();}
 else if(p.s.fx==='tide'||p.s.fx==='bloodstorm'){for(let i=0;i<6;i++){const x=p.x+(i-3)*22,hh=p.h*(.5+.5*Math.sin(i*.7+clock*7));ctx.save();ctx.globalAlpha=.9;const g=ctx.createLinearGradient(0,FLOOR-hh,0,FLOOR);g.addColorStop(0,'#ffc1aa');g.addColorStop(.18,c);g.addColorStop(1,'#6b12277a');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x-28,FLOOR);ctx.quadraticCurveTo(x-45,FLOOR-hh*.5,x+p.face*30,FLOOR-hh);ctx.quadraticCurveTo(x+4,FLOOR-hh*.3,x+32,FLOOR);ctx.fill();ctx.restore();}}
 else slash(p.x,p.y,p.h*.6,p.face,c,(p.age*4)%1);
 if(debug){ctx.strokeStyle='#ff7979';ctx.lineWidth=2;ctx.strokeRect(p.x-p.w/2,p.y-p.h/2,p.w,p.h);}
}}
function drawVisuals(dt){for(const e of visuals){e.age+=dt;const p=e.age/e.life;if(p>=1)continue;ctx.save();ctx.globalAlpha=1-p;
 if(e.kind==='spark'){e.x+=e.vx*dt;e.y+=e.vy*dt;e.vy+=320*dt;ctx.strokeStyle=e.color;ctx.lineWidth=e.width;ctx.beginPath();ctx.moveTo(e.x,e.y);ctx.lineTo(e.x-e.vx*.027,e.y-e.vy*.027);ctx.stroke();}
 if(e.kind==='impact'){glow(e.x,e.y,80,e.color,1-p);ctx.strokeStyle=e.blocked?'#a3dfff':'#fff8d6';ctx.lineWidth=4;for(let i=0;i<8;i++){const a=i*Math.PI/4;ctx.beginPath();ctx.moveTo(e.x+Math.cos(a)*12,e.y+Math.sin(a)*12);ctx.lineTo(e.x+Math.cos(a)*(30+70*p),e.y+Math.sin(a)*(30+70*p));ctx.stroke();}}
 if(e.kind==='number'){ctx.fillStyle=e.color;ctx.font='bold 23px Georgia';ctx.textAlign='center';ctx.shadowColor='#000';ctx.shadowBlur=5;ctx.fillText(e.text,e.x,e.y-p*45);}
 if(e.kind==='ground'){ctx.translate(e.x,e.y);ctx.scale(1,.25);ring(0,0,35+110*p,e.color||'#baa4af',1-p);}
 if(e.kind==='ghost'){sprite(match.fighters[e.f],e.x,e.y,e.frame,(1-p)*.5);}
 if(e.kind==='drain'){const a=match.fighters[e.from],b=match.fighters[e.to];for(let i=0;i<18;i++){const z=(p*2+i/18)%1,x=a.x+(b.x-a.x)*z,y=a.y-155+Math.sin(z*Math.PI)*(-40)+Math.sin(i*3)*10;glow(x,y,7,'#ff506d',.8);}}
 if(e.kind==='cast'){
  const f=match.fighters[e.f],x=f.x,y=f.y-135,c=e.color;
  if(['light','heavy','cloak','royal','rise','teleport'].includes(e.fx)){slash(x+f.face*42,y,e.fx==='royal'?160:e.fx==='cloak'?125:85,f.face,c,p);}
  else if(e.fx==='hypnosis'){for(let i=0;i<4;i++){ctx.save();ctx.translate(x+f.face*(60+p*220+i*12),y);ctx.scale(.5,1);ring(0,0,30+i*13,c,1-p,p*4);ctx.restore();}}
  else if(e.fx==='transform'||e.fx==='eclipse'){ring(x,f.y-135,50+p*(e.fx==='eclipse'?280:150),c,1-p,p*2);glow(x,f.y-135,160,c,(1-p)*.4);}
  else if(e.fx!=='drain'){ring(x+f.face*40,y,30+p*75,c,1-p,p*4);}
 }
 ctx.restore();}visuals=visuals.filter(e=>e.age<e.life);}
function render(dt){
 ctx.clearRect(0,0,1280,640);ctx.save();if(shake>0){const size=Math.min(12,shake*32);ctx.translate((Math.random()-.5)*size,(Math.random()-.5)*size);shake=Math.max(0,shake-dt);}
 ctx.drawImage(images.bg,0,0,1280,640);const shade=ctx.createLinearGradient(0,0,0,640);shade.addColorStop(0,'#0607161a');shade.addColorStop(.7,'transparent');shade.addColorStop(1,'#060610aa');ctx.fillStyle=shade;ctx.fillRect(0,0,1280,640);
 drawFields();for(const f of match.fighters){ctx.save();ctx.fillStyle='#05041199';ctx.beginPath();ctx.ellipse(f.x,FLOOR+2,70,10,0,0,Math.PI*2);ctx.fill();ctx.restore();if(f.state==='charge'||f.transform>0){glow(f.x,f.y-130,170,f.data.color,.16);ring(f.x,f.y-130,115+Math.sin(clock*4)*5,f.data.color,.3,clock);for(let i=0;i<12;i++){ctx.fillStyle=f.data.accent;const a=i*2.4;ctx.globalAlpha=.65;ctx.fillRect(f.x+Math.sin(a+clock)*65,f.y-((clock*95+i*20)%230),2,9);}ctx.globalAlpha=1;}if(f.state==='run'){sprite(f,f.x-f.face*35,f.y,pose(f),.16);}sprite(f);if(f.guard){ctx.save();ctx.strokeStyle='#c3edff';ctx.shadowColor='#83c2ff';ctx.shadowBlur=12;ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(f.x+f.face*42,f.y-130,45,105,0,f.face>0?-1.3:1.8,f.face>0?1.3:4.5);ctx.stroke();ctx.restore();}if(debug){const h=match.hurtbox(f);ctx.strokeStyle='#73c7ff';ctx.lineWidth=2;ctx.strokeRect(h.x,h.y,h.w,h.h);if(f.attack){const a=f.attack,s=a.s;if(a.t>=s.wind&&a.t<=s.wind+s.active&&['melee','blink'].includes(s.kind)){const b=match.attackbox(f,s);ctx.fillStyle='#ff3d4930';ctx.fillRect(b.x,b.y,b.w,b.h);ctx.strokeStyle='#ff7075';ctx.strokeRect(b.x,b.y,b.w,b.h);}}}}
 drawProjectiles();drawVisuals(paused?0:dt);ctx.restore();if(flash>0){ctx.fillStyle=`rgba(239,210,245,${Math.min(.22,flash)})`;ctx.fillRect(0,0,1280,640);flash=Math.max(0,flash-dt*2);}
 if(match.phase==='intro'){$('banner').textContent=match.intro>.85?'READY':'FIGHT';$('banner').style.opacity=1;}else if(clock>bannerUntil)$('banner').style.opacity=0;
}
function frame(now){const dt=Math.min(.08,(now-last)/1000);last=now;clock+=dt;fpsTime+=dt;fpsFrames++;
 if(match&&ready){if(!paused){accumulator+=dt;let first=true,n=0;while(accumulator>=1/60&&n<5){match.step(1/60,first?input():{move:(held.has('d')?1:0)-(held.has('a')?1:0),run:held.has('shift'),guard:held.has('s'),charge:held.has('q')});events();first=false;n++;accumulator-=1/60;}if(n===5)accumulator=0;}render(dt);updateHUD();}
 if(fpsTime>=.6){$('fps').textContent=Math.round(fpsFrames/fpsTime)+' FPS';fpsTime=0;fpsFrames=0;}
 requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
})();
