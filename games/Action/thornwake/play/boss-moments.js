'use strict';
const crownStories={
 regent:{title:'The Thorn Regent',epithet:'THE CROWN THAT WOULD NOT FALL',line:'A kingdom kneels. One small light remains standing.',iron:'The iron remembers a crown you have already broken.',color:'#edc185',note:73,shape:'crown'},
 empress:{title:'The Glass Empress',epithet:'A THOUSAND PERFECT FRACTURES',line:'She kept the world beneath glass. Even its last breath.',iron:'Every broken wing returns with an edge of iron.',color:'#b9def2',note:110,shape:'glass'},
 devourer:{title:'The Root Devourer',epithet:'HUNGER BENEATH THE GARDEN',line:'The roots do not tremble with fear. They tremble with hunger.',iron:'Below the roots, even hunger learned to wear armor.',color:'#d6b18b',note:55,shape:'root'},
 broodmother:{title:'Vespara, Mother of Many',epithet:'THE NURSERY THAT NEVER SLEEPS',line:'She still counts the children. She has forgotten their names.',iron:'The sealed nursery opens. Something inside has been waiting.',color:'#d4d5a1',note:82,shape:'brood'},
 unthreaded:{title:'The Unthreaded',epithet:'EVERY FALL LEFT A SHADOW',line:'It knows your needle. It remembers every way you died.',iron:'You carried your shadow this far. Now it carries a crown.',color:'#e2afbf',note:98,shape:'mirror'}
};
let bossMoment=null,bossMomentPending=null;
const bossHeldKeys=new Set();
function beginBossMoment(){
 const n=currentNode,e=enemies.find(e=>e.hp>0&&(e.final||e.kind==='boss'));
 if(state!=='playing'||n?.type!=='boss'||n.crownWitnessed||!e||bossMoment)return false;
 const story=crownStories[n.finalBoss]||crownStories.regent;
 n.crownWitnessed=true;bossMomentPending=null;
 const reduced=!!window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
 bossMoment={node:n,boss:e,story,elapsed:0,duration:reduced?2.8:4.2,reduced,fromCamera:camera,fromY:cameraY,revealed:false};
 for(const key of keys)bossHeldKeys.add(key);keys.clear();pressed.clear();$('hud').hidden=true;$('toast').classList.remove('show');$('touch').classList.remove('active');
 $('crownscene').hidden=false;$('crownscene').dataset.phase='opening';$('crownscene').style.setProperty('--crown-color',ironDepth?'#d0b397':story.color);
 $('crownepithet').textContent=(ironDepth?'IRON WEB · ':'')+story.epithet;
 $('crowntitle').textContent=story.title;$('crownline').textContent=ironDepth?story.iron:story.line;
 $('crownskip').focus();rootScore.setThreat(.35);tone(story.note,1.4,'sine',.07);tone(story.note*1.5,.9,'triangle',.025);
 return true;
}
function finishBossMoment(){
 if(!bossMoment)return false;const moment=bossMoment;bossMoment=null;bossMomentPending=null;
 $('crownscene').hidden=true;keys.clear();pressed.clear();
 if(state==='playing'&&currentNode===moment.node){player.inv=Math.max(player.inv,.9);moment.boss.attack=Math.max(moment.boss.attack,1.1);$('hud').hidden=false;$('touch').classList.add('active');hud();$('game').focus();rootScore.setThreat(.45)}
 return true;
}
function tickBossMoment(dt){
 const m=bossMoment;if(!m)return;
 m.elapsed+=Math.min(.05,dt);const u=Math.min(1,m.elapsed/1.6),ease=u*u*(3-2*u);
 if(!m.reduced){camera=m.fromCamera+(Math.max(0,Math.min(ROOM_WIDTH-W,m.boss.x-W*.57))-m.fromCamera)*ease;cameraY=m.fromY*(1-ease)}
 if(!m.revealed&&m.elapsed>.85){m.revealed=true;$('crownscene').dataset.phase='reveal';tone(m.story.note*2,.65,'triangle',.04);tone(m.story.note*3,1,'sine',.035)}
 if(m.elapsed>=m.duration)finishBossMoment();
}
function drawBossMoment(){
 const m=bossMoment;if(!m)return;const t=m.elapsed,c=m.story.color,reveal=m.reduced?1:Math.min(1,t/1.15),cx=W*.5,cy=H*.44;
 ctx.save();ctx.fillStyle='#030a13dc';ctx.fillRect(0,0,W,H);
 const g=ctx.createRadialGradient(cx,cy,20,cx,cy,H*.65);g.addColorStop(0,c+'29');g.addColorStop(1,c+'00');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 ctx.translate(cx,cy);ctx.globalAlpha=reveal;
 // Each crown gets a distinct stage: thorns, stained glass, roots, nursery silk or a broken reflection.
 if(m.story.shape==='crown'){for(let i=-4;i<=4;i++){const x=i*49;line(x,100,x*1.35,-140+Math.abs(i)*18,c+'55',2);line(x*1.35,-140+Math.abs(i)*18,x*1.35-18,-117+Math.abs(i)*18,c+'99',2)}ctx.beginPath();ctx.ellipse(0,-50,195,110,0,Math.PI,Math.PI*2);ctx.strokeStyle=c+'88';ctx.lineWidth=1;ctx.stroke()}
 else if(m.story.shape==='glass'){for(let i=0;i<12;i++){const a=i*Math.PI/6+(m.reduced?0:t*.04),r=160+i%2*32;ctx.save();ctx.translate(Math.cos(a)*r,Math.sin(a)*r*.75);ctx.rotate(a);ctx.beginPath();ctx.moveTo(0,-36);ctx.lineTo(15,0);ctx.lineTo(0,36);ctx.lineTo(-15,0);ctx.closePath();finishInk(c+'22',c+'99',1);ctx.restore()}}
 else if(m.story.shape==='root'){for(let i=0;i<7;i++){const x=-230+i*77;ctx.beginPath();ctx.moveTo(x,150);ctx.bezierCurveTo(x-80,40,x+90,-80,x*.8,-180);ctx.strokeStyle=c+(i%2?'66':'33');ctx.lineWidth=5-i%3;ctx.stroke();for(let j=0;j<3;j++)line(x+j*8,95-j*45,x+55+j*6,77-j*45,c+'44',1)}}
 else if(m.story.shape==='brood'){for(let i=0;i<8;i++){const x=-245+i*70,y=-115+Math.sin(i*2)*45+(m.reduced?0:Math.sin(t*1.4+i)*5);line(x,-250,x,y,c+'55',1);outlinedEllipse(x,y,17,27,c+'19',c+'88',1);for(let j=-1;j<=1;j++)line(x-12,y+j*9,x+12,y+j*7,c+'55',.8)}}
 else{for(const side of [-1,1]){ctx.save();ctx.translate(side*140,20);ctx.globalAlpha=.15;drawMoth(0,0,-side,t,1.65);ctx.restore()}ctx.beginPath();ctx.moveTo(-45,-190);ctx.lineTo(15,-105);ctx.lineTo(-9,-20);ctx.lineTo(40,67);ctx.lineTo(8,150);ctx.strokeStyle=c+'66';ctx.lineWidth=2;ctx.stroke()}
 if(ironDepth){for(const d of [-1,1]){line(d*265,-220,d*230,160,'#c8b4a755',5);for(let i=0;i<7;i++){ctx.beginPath();ctx.ellipse(d*(262-i*5),-195+i*48,9,16,0,0,Math.PI*2);ctx.strokeStyle='#c8b4a780';ctx.lineWidth=2;ctx.stroke()}}}
 const scale=(m.story.shape==='mirror'?2.35:1.75)*(m.reduced?1:.92+reveal*.08);ctx.save();ctx.translate(0,m.reduced?0:(1-reveal)*35);ctx.scale(scale,scale);
 drawCreature({...m.boss,x:0,y:0,hit:0,clock:t,mode:'idle',direction:-1,phase:0,active:true});ctx.restore();
 ctx.globalAlpha=.65;for(let i=0;i<20;i++){const x=Math.sin(i*2.41)*270,y=((i*37-(m.reduced?0:t*18)+400)%330)-170;ellipse(x,y,1,2,c)}ctx.restore();
 ctx.save();const bars=m.reduced?34:34*Math.min(1,t*3);ctx.fillStyle='#02080ded';ctx.fillRect(0,0,W,bars);ctx.fillRect(0,H-bars,W,bars);line(30,bars,W-30,bars,c+'66',1);line(30,H-bars,W-30,H-bars,c+'66',1);ctx.restore();
}
function installBossMoments(){
 const make=makeRoom;makeRoom=function(n=currentNode){finishBossMoment();bossMomentPending=null;make(n);if(n.type==='boss'&&!n.crownWitnessed)bossMomentPending=n};
 const equip=equipRun;equipRun=function(){finishBossMoment();bossMomentPending=null;equip()};
 const step=update;update=function(dt){if(bossMoment){tickBossMoment(dt);return}if(bossMomentPending===currentNode&&state==='playing'&&player.x>=540&&!cleared&&beginBossMoment())return;step(dt)};
 const render=draw;draw=function(){render();drawBossMoment()};
 const stateChange=setState;setState=function(next){if(next!=='playing'&&bossMoment)finishBossMoment();stateChange(next)};
 $('crownskip').onclick=finishBossMoment;$('game').setAttribute('tabindex','0');
 window.addEventListener('keydown',e=>{if(!bossMoment&&!bossHeldKeys.has(e.code))return;e.preventDefault();e.stopImmediatePropagation();bossHeldKeys.add(e.code);if(bossMoment&&['Space','Enter','Escape'].includes(e.code))finishBossMoment()},true);
 window.addEventListener('keyup',e=>{const held=bossHeldKeys.delete(e.code);if(bossMoment||held){e.preventDefault();e.stopImmediatePropagation();keys.delete(e.code);pressed.delete(e.code)}},true);
 window.addEventListener('blur',()=>bossHeldKeys.clear());
}
