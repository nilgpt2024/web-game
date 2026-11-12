'use strict';
// Techniques use the same rarity, cultivation and run-only inventory as other gifts.
// Secondary hits never trigger other secondary hits or generate ordinary hit silk.
const wovenTechniques = [
 {key:'weave_sky',id:'wild-weave_sky',name:'Skyspindle',icon:'⋈',family:'Pogo / Bolt',color:'#b5dff4',tags:['Pogo','Aerial','Bolt'],describe:s=>`Enemy pogos store up to 3 feathers. Q spends them on seeking needles, each dealing ${(1.1+.45*s).toFixed(1)} damage. With Springtail Anklet, a full volley also lifts you and restores an air jump.`},
 {key:'weave_dash',id:'wild-weave_dash',name:'Stormstitch',icon:'ϟ',family:'Dash / Control',color:'#a9e2da',tags:['Dash','Lightning','Control'],describe:s=>`Dashes leave a silk tripwire for 2 seconds. Each crossing foe takes ${(1+.6*s).toFixed(1)} damage once. Copper Wings arcs that hit to another foe; Winter Antenna chills it.`},
 {key:'weave_rot',id:'wild-weave_rot',name:'Plague Loom',icon:'✣',family:'Poison / Halo',color:'#c0da8d',tags:['Poison','Burn','Alchemy','Halo'],describe:s=>`Direct attacks build poison. Shift consumes nearby poison stacks for ${( .5+.2*s).toFixed(1)} damage each and leaves a 3-second spore garden. Burning targets make larger, 40% stronger detonations.`},
 {key:'weave_orbit',id:'wild-weave_orbit',name:'Satellite Cocoon',icon:'◎',family:'Halo / Silk',color:'#d1b9ee',tags:['Halo','Silk','Bolt'],describe:s=>`Shift becomes a moving 2.4-second orbit: three pulses of ${(1.4+.5*s).toFixed(1)} damage within 130. It reflects up to 3 shots per cast. Echoing Loom adds a wide final pulse. Keep close and weave between attacks.`},
 {key:'weave_guard',id:'wild-weave_guard',name:'Reprisal Husk',icon:'◈',family:'Guard / Needle',color:'#e2cb98',tags:['Guard','Needle','Mend','Sustain'],describe:s=>`Gain 1 shield on entering combat (shared maximum 2). Blocking stores a counterstrike for 5 seconds. Your next needle swing releases a piercing crescent for ${(2+.8*s).toFixed(1)} damage. Briar Reprisal adds a thorn splash.`},
 {key:'weave_blood',id:'wild-weave_blood',name:'Bloodloom',icon:'♡',family:'Fury / Bolt',color:'#efa7ac',tags:['Fury','Bolt','Sustain','Precision'],describe:s=>`When short of silk, Q can spend 1 heart instead (never your last). Those bolts deal +${pct(.35+.1*s)} damage. With Last Heart Hymn, bloodcasting opens a 4-second window where needle hits restore 4 extra silk.`}
].map(d=>({...d,pact:false,technique:true}));
wildGifts.push(...wovenTechniques);
let wovenFields=[],wovenOrbit=null,wovenHitContext=null;
const weavePower=k=>giftPower('weave_'+k);
const wovenTells=new Set(['windup','aim','crouch','glow','weave','brew','prism','choir','rear','rumble','signal','menTell','ironTell','shadowTell','chant','tell','spitTell']);
const wovenIdle=new Set(['idle','patrol']);
function wovenSoftDamage(raw,base=1){const r=Math.max(0,raw)/Math.max(.1,base);return base*(r<=3?r:1+2*Math.sqrt(r-2))}
function wovenNeedleBase(){return needleArms[player?.weapon]?.damage||1}
function wovenProcScale(){return Math.min(2.5,1+.35*Math.max(0,wovenSoftDamage(player.damage,wovenNeedleBase())/wovenNeedleBase()-1))}
function wovenDamage(raw,projectile){if(giftInternal)return raw*wovenProcScale();return wovenSoftDamage(raw,wovenHitContext?.base||(projectile?3:wovenNeedleBase()))}
function wovenEnemyTempo(e){
 const slow=enemyChill(e),progress=1+Math.max(0,room-1)*.012+runDifficulty*.08;
 if(wovenIdle.has(e.mode)&&e.attack<=0&&!e.mini&&!e.final&&e.kind!=='boss'&&enemies.filter(o=>o!==e&&o.hp>0&&wovenTells.has(o.mode)&&Math.abs(o.x-player.x)<800).length>=2)e.attack=.22;
 // Windups and recovery retain a readable real-time window even in the Iron Web.
 return Math.min(wovenTells.has(e.mode)?1.35:e.mode==='recover'?1.2:2,progress*slow);
}
function wovenHealth(e){
 if(e.summoned||e.wovenScaled)return;e.wovenScaled=true;
 const spec=menBrood[e.kind]||mediumBrood[e.kind]||wildBrood[e.kind];
 const base=spec?.hp||({crawler:3,flyer:2,spitter:3,bulwark:5,wasp:3,bellspore:4})[e.kind];
 if(!base||e.mini||e.final||e.kind==='boss')return;
 const hp=base*(1+(e.medium?.04:.055)*Math.max(0,room-1))*(ironDepth?(e.medium?1.8:2):1)*(1+runDifficulty*.15)*(currentNode.riddleAmbush?1.25:1);
 e.hp=e.maxHp=Math.round(hp*10)/10;
}
function wovenSpitter(e,dt){
 if(e.kind!=='spitter')return false;
 if(veilActive()){e.attack+=dt;return true}
 e.stun=Math.max(0,(e.stun||0)-dt);if(e.stun>0)return true;
 e.clock+=dt;
 if(e.mode==='idle'){e.x+=Math.sign(player.x-e.x)*25*dt;if(e.attack<=0&&Math.abs(player.x-e.x)<780){e.targetX=player.x;e.targetY=player.y;wardenMode(e,'spitTell');tone(330,.12,'triangle',.015)}}
 else if(e.mode==='spitTell'&&e.clock>=.65){const a=Math.atan2(e.targetY-e.y,e.targetX-e.x);enemyOrb(e.x,e.y-8,Math.cos(a)*225,Math.sin(a)*225);wardenMode(e,'recover');tone(210,.15,'triangle',.02)}
 else if(e.mode==='recover'&&e.clock>=.6){e.attack=1.7;wardenMode(e,'idle')}
 e.x=Math.max(e.minX,Math.min(e.maxX,e.x));e.y=e.floorY-e.h;return true;
}
function wovenTechOwned(){return wovenTechniques.filter(t=>giftPower(t.key)>0)}
function wovenMatches(d){const tags=String(d.family||'').split(' / ');return wovenTechOwned().filter(t=>t.tags.some(x=>tags.includes(x)))}
function wovenSupport(t){return wildGifts.filter(d=>!d.technique&&!d.pact&&giftPower(d.key)<6&&t.tags.includes(d.family))}
function wovenWeighted(pool){if(!pool.length)return null;const weights=pool.map(d=>1+(giftPower(d.key)>0?1:0)+(wovenMatches(d).length?3:0));let n=Math.random()*weights.reduce((a,b)=>a+b,0);for(let i=0;i<pool.length;i++){n-=weights[i];if(n<=0)return pool[i]}return pool[pool.length-1]}
function wovenFeatherShot(x,y,angle,damage){const s={x,y,vx:Math.cos(angle)*490,vy:Math.sin(angle)*490,life:1.65,friendly:true,damage,hit:new Set(),woven:true,seeking:true};shots.push(s);return s}
function wovenSecondaryHit(e,d){const old=giftInternal;giftInternal=true;try{return hitEnemy(e,d,false,true,true)}finally{giftInternal=old}}
function wovenPoison(e){e.poisonTime=6;e.poisonStacks=Math.min(5,(e.poisonStacks||0)+1)}
function wovenDetonate(){const s=weavePower('rot');if(!s)return;for(const e of [...enemies]){if(e.hp<=0||!(e.poisonTime>0)||Math.hypot(e.x-player.x,e.y-player.y)>225)continue;const stacks=e.poisonStacks||1,burning=e.burnTime>0;e.poisonTime=0;e.poisonStacks=0;giftArea(e.x,e.y,burning?145:105,stacks*(.5+.2*s)*(burning?1.4:1),burning?'#ecc080':'#c0da8d');wovenFields.push({kind:'spore',x:e.x,y:e.y,r:burning?125:95,life:3,clock:0,damage:.2*s,hit:new Set()});floatText(e.x,e.y-44,burning?'FEVER BLOOM':'SPORE BLOOM',burning?'#ecc080':'#c0da8d');tone(burning?170:270,.22,'triangle',.035)}}
function tickWoven(dt){
 const p=player;if(!p)return;
 if(p.dash>0&&weavePower('dash')){if(p.wovenDashId!==p.dashId){p.wovenDashId=p.dashId;p.wovenWire={kind:'wire',x:p.wovenBeforeX??p.x,y:p.wovenBeforeY??p.y,x2:p.x,y2:p.y,life:2,age:0,hit:new Set(),damage:1+.6*weavePower('dash')};wovenFields.push(p.wovenWire)}p.wovenWire.x2=p.x;p.wovenWire.y2=p.y}
 for(const f of wovenFields){f.life-=dt;if(f.kind==='wire'){f.age+=dt;if(f.age<.15)continue;const dx=f.x2-f.x,dy=f.y2-f.y,len=dx*dx+dy*dy;for(const e of enemies){if(e.hp<=0||f.hit.has(e))continue;const t=len?Math.max(0,Math.min(1,((e.x-f.x)*dx+(e.y-f.y)*dy)/len)):0;if(Math.hypot(e.x-f.x-t*dx,e.y-f.y-t*dy)>e.h+14)continue;f.hit.add(e);directGiftDamage(e,f.damage);if(giftPower('rime'))e.chillTime=2;if(giftPower('chain')){const other=enemies.find(o=>o!==e&&o.hp>0&&Math.hypot(o.x-e.x,o.y-e.y)<210);if(other){directGiftDamage(other,.55*giftPower('chain'));giftEffects.push({x:e.x,y:e.y,x2:other.x,y2:other.y,color:'#b5e3df',life:.25,max:.25,kind:'bolt'})}}ripple(e.x,e.y,'#a9e2da');tone(720,.08,'triangle',.02)}}
  else{f.clock-=dt;if(f.clock<=0){f.clock=.5;for(const e of enemies)if(e.hp>0&&Math.hypot(e.x-f.x,e.y-f.y)<f.r)directGiftDamage(e,f.damage)}}}
 wovenFields=wovenFields.filter(f=>f.life>0).slice(-18);
 if(wovenOrbit){const o=wovenOrbit;o.life-=dt;o.clock-=dt;if(o.clock<=0&&o.pulses<3){o.clock=.8;o.pulses++;giftArea(p.x,p.y,130,1.4+.5*weavePower('orbit'),'#d1b9ee');tone(440+o.pulses*110,.15,'sine',.025)}for(const s of shots)if(o.reflects<3&&!s.friendly&&s.life>0&&Math.hypot(s.x-p.x,s.y-p.y)<130){s.friendly=true;s.woven=true;s.wave=s.bomb=s.web=false;s.gravity=0;s.vx=-s.vx||p.face*300;s.vy=-s.vy;s.damage=2;s.hit=new Set();o.reflects++;ripple(s.x,s.y,'#e5d8fb')}if(o.life<=0){if(giftPower('echo'))giftArea(p.x,p.y,205,1.1*giftPower('echo'),'#e4d2fa');wovenOrbit=null}}
 for(const s of shots)if(s.seeking&&s.life>0){const e=enemies.filter(e=>e.hp>0&&e.mode!=='burrow').sort((a,b)=>Math.hypot(a.x-s.x,a.y-s.y)-Math.hypot(b.x-s.x,b.y-s.y))[0];if(e){const a=Math.atan2(e.y-s.y,e.x-s.x),k=Math.min(1,dt*4);s.vx+=(Math.cos(a)*490-s.vx)*k;s.vy+=(Math.sin(a)*490-s.vy)*k}}
 p.wovenDot=(p.wovenDot||0)+dt;if(p.wovenDot>=.5){p.wovenDot=0;if(weavePower('rot'))for(const e of enemies)if(e.hp>0&&e.poisonTime>0)directGiftDamage(e,.055*weavePower('rot')*(e.poisonStacks||1))}
 if((p.wovenCounterUntil||0)<runTime)p.wovenCounter=false;
 $('ability').textContent=p.haloCd>0?'SHIFT · '+p.haloCd.toFixed(1)+'s':'SHIFT · '+(weavePower('orbit')?'SATELLITE ':'SILK HALO ')+Math.max(20,p.haloCost-(heirloomIs('spindle')?15:0));
}
function drawWoven(){
 for(const e of enemies)if(e.hp>0&&e.mode==='spitTell'){ctx.save();ctx.setLineDash([5,8]);line(e.x,e.y-8,e.targetX,e.targetY,'#efc18880',1.5);ctx.restore();worldLabel(e.x,e.y-e.h-20,'SPIT');}
 for(const f of wovenFields){ctx.save();ctx.globalAlpha=Math.min(1,f.life);if(f.kind==='wire'){line(f.x,f.y,f.x2,f.y2,'#142d36',7);line(f.x,f.y,f.x2,f.y2,'#a9e2da',2);for(let i=0;i<=5;i++){const t=i/5,x=f.x+(f.x2-f.x)*t,y=f.y+(f.y2-f.y)*t;outlinedEllipse(x,y,3,5,'#edf8de','#92cbbf',1)}}else{ellipse(f.x,f.y+15,f.r,12,'#b8ce7950');for(let i=0;i<9;i++){const a=i*2.4+time*.4,r=f.r*(.3+i/14);ellipse(f.x+Math.cos(a)*r,f.y-((time*22+i*9)%70),2,4,'#cfe39b99')}}ctx.restore()}
 if(wovenOrbit){ctx.save();ctx.translate(player.x,player.y);const t=time*3;for(let i=0;i<3;i++){const a=t+i*Math.PI*2/3,x=Math.cos(a)*125,y=Math.sin(a)*125;ctx.beginPath();ctx.ellipse(0,0,125,125,0,0,Math.PI*2);ctx.strokeStyle='#d1b9ee30';ctx.lineWidth=1;ctx.stroke();line(0,0,x,y,'#dac5f266',1);outlinedEllipse(x,y,7,13,'#ede1ff','#9482b8',2);glow(x,y,26,'#e8cbff',.16)}ctx.restore()}
 for(let i=0;i<(player.wovenFeathers||0);i++){const a=-Math.PI/2+(i-1)*.38;outlinedEllipse(player.x+Math.cos(a)*45,player.y+Math.sin(a)*45,3,8,'#d9f2fc','#97bed6',1)}
 if(player.wovenCounter){for(const d of [-1,1])line(player.x+d*27,player.y-29,player.x+d*37,player.y+18,'#f1d598',3)}
 for(const s of shots)if(s.woven){line(s.x,s.y,s.x-s.vx*.035,s.y-s.vy*.035,s.seeking?'#bee8fc':'#ecd3a3',3);ellipse(s.x,s.y,4,4,'#fff1c8')}
}
function wovenComboRows(){return[
 ['SKY CANNON','Skyspindle + Springtail Anklet',!!weavePower('sky')&&!!giftPower('spring'),'Three enemy pogos → Q for seeking needles, a lift and another air jump.'],
 ['THUNDER LOOM','Stormstitch + Copper Wings',!!weavePower('dash')&&!!giftPower('chain'),'Dash across a pack. Crossing your wire arcs damage into another foe.'],
 ['FEVER GARDEN','Plague Loom + Cinder Needle',!!weavePower('rot')&&!!giftPower('cinder'),'Build poison, ignite it, then Shift to consume it in a larger explosion.'],
 ['LAST ORBIT','Satellite Cocoon + Echoing Loom',!!weavePower('orbit')&&!!giftPower('echo'),'Stay near enemies for three pulses, then finish with a wide echo.'],
 ['BRIAR RIPOSTE','Reprisal Husk + Briar Reprisal',!!weavePower('guard')&&!!giftPower('thorns'),'A blocked hit loads a crescent. Swing to release it with a thorn splash.'],
 ['SCARLET REFRAIN','Bloodloom + Last Heart Hymn',!!weavePower('blood')&&!!giftPower('fury'),'Spend a heart on a bolt, then strike within 4 seconds to refill silk.']
 ];}
function wovenBuildMarkup(){const owned=wovenTechOwned();return `<section class="woven-build"><div class="eyebrow">THREADS OF THIS DESCENT</div><h3>${owned.length?owned.map(t=>t.name).join(' · '):'Your style is still taking shape'}</h3><p>Needle hits gather silk. Bolts spend it. Techniques change what you do with both.</p><div class="woven-paths">${wovenComboRows().filter((r,i)=>owned.length?giftPower(wovenTechniques[i].key)>0:true).map(([name,pair,active,loop])=>`<article class="${active?'woven-awake':''}"><b>${active?'✦ ACTIVE':'◇ NEXT THREAD'} · ${name}</b><span>${pair}</span><p>${loop}</p></article>`).join('')}</div><details><summary>Combat balance & current limits</summary><p>Raw needle ${player.damage.toFixed(2)} → ${wovenSoftDamage(player.damage,wovenNeedleBase()).toFixed(2)} before conditional bonuses. Raw bolt ${player.boltDamage.toFixed(2)} → ${wovenSoftDamage(player.boltDamage,3).toFixed(2)}. Damage bonuses above 3× base taper smoothly; timing and pogo bonuses apply afterward. Secondary effects scale up to 2.5× with needle strength, but cannot trigger one another or gather hit silk.</p><p>Minimum attack recovery 0.12s · dash recovery 0.38s · bolt cost 10 silk · Halo cost 20 silk (at least 10 after refunds). Slows stop at 50% of normal pace, or 70% for bosses. Iron enemies keep their extra speed.</p></details></section>`}
function installWovenBuilds(){
 const equip=equipRun;equipRun=function(){equip();player.wovenFeathers=0;player.wovenCounter=false;player.wovenFirstReward=false;wovenFields=[];wovenOrbit=null};
 const make=makeRoom;makeRoom=function(n=currentNode){make(n);wovenFields=[];wovenOrbit=null;player.wovenFeathers=0;player.wovenCounter=false;player.wovenDashId=-1;for(const [i,e]of enemies.entries()){wovenHealth(e);e.attack=Math.max(e.attack,1+i*.23)}if(weavePower('guard')&&['combat','elite','boss'].includes(n.type))player.shields=Math.min(2,(player.shields||0)+1);hud()};
 const ambush=beginRiddleAmbush;beginRiddleAmbush=function(){const ok=ambush();if(ok)for(const e of enemies)wovenHealth(e);return ok};
 const enemy=tickBrood;tickBrood=function(e,dt){return wovenSpitter(e,dt)||enemy(e,dt)};
 const roll=rollGiftOffers;rollGiftOffers=function(min=0){if(!player.wovenFirstReward&&room===1&&!ironDepth){const pool=[...wovenTechniques],a=[];while(a.length<3){const i=Math.floor(Math.random()*pool.length);a.push(makeGift(pool.splice(i,1)[0],Math.max(1,min)))}return a}const result=roll(min),owned=wovenTechOwned();if(owned.length){const support=wovenWeighted(wovenSupport(pick(owned)).filter(d=>!result.slice(1).some(r=>r.id===d.id)));if(support)result[0]=makeGift(support,chooseGiftTier(min))}else if(Math.random()<.45)result[0]=makeGift(pick(wovenTechniques),chooseGiftTier(min));return result};
 const select=selectRelic;selectRelic=function(i){const result=select(i);player.wovenFirstReward=true;return result};
 const card=giftCard;giftCard=function(r,i){const html=card(r,i);if(r.heirloom)return html;const def=wildGifts.find(d=>d.key===r.key),matches=def?wovenMatches(def):[];let note=def?.technique?'PLAYSTYLE TECHNIQUE':matches.length?'WEAVES WITH '+matches.map(t=>t.name.toUpperCase()).join(' · '):'';if(r.key&&giftPower(r.key)>0)note+=(note?' · ':'')+'POTENCY '+giftPower(r.key).toFixed(2)+' → '+Math.min(6,giftPower(r.key)+giftTiers[r.tier??0].power).toFixed(2);return note?html.replace('</button>',`<span class="woven-fit">${note}</span></button>`):html};
 const bounce=pogoBounce;pogoBounce=function(target,perfect=false,combat=true){bounce(target,perfect,combat);if(combat&&weavePower('sky')){player.wovenFeathers=Math.min(3,(player.wovenFeathers||0)+1);if(player.wovenFeathers===3)tone(990,.14,'sine',.025)}};
 const hit=hitEnemy;hitEnemy=function(e,d,pogo=false,projectile=false,noSilk=false){const old=wovenHitContext,hp=e.hp,direct=!giftInternal;wovenHitContext={base:projectile?3:wovenNeedleBase()*(player.weapon==='twins'&&player.strikeCount%3===0?2:1)};try{const ok=hit(e,d,pogo,projectile,noSilk);if(ok&&e.hp<hp&&direct){if(weavePower('rot')&&e.hp>0&&!giftPower('venom'))wovenPoison(e);if(!projectile&&(player.wovenScarUntil||0)>runTime&&giftPower('fury'))player.silk=Math.min(100,player.silk+4)}return ok}finally{wovenHitContext=old}};
 const shot=bolt;bolt=function(){const p=player;if(state!=='playing'||p.boltCd>0)return;const start=shots.length,silk=p.silk,hp=p.hp,cost=Math.max(10,p.boltCost),blood=weavePower('blood')&&silk<cost&&hp>1;if(blood)p.silk=cost;shot();if(shots.length===start){if(blood)p.silk=silk;return}if(blood){p.silk=silk;p.hp=hp-1;p.wovenScarUntil=runTime+4;for(const s of shots.slice(start))s.damage*=1.35+.1*weavePower('blood');ripple(p.x,p.y,'#efa7ac');tone(130,.24,'triangle',.04);floatText(p.x,p.y-58,'BLOODCAST · −1 ♥','#efa7ac');roomDamaged=true;if(roomTrial())roomTrial().damage=true}const feathers=p.wovenFeathers||0;if(feathers&&weavePower('sky')){p.wovenFeathers=0;for(let i=0;i<feathers;i++)wovenFeatherShot(p.x,p.y-20,-Math.PI/2+(i-(feathers-1)/2)*.42,1.1+.45*weavePower('sky'));if(feathers===3&&giftPower('spring')){p.vy=-360;p.ground=false;p.pogoBoost=.18;p.jumps=Math.max(0,p.jumps-1)}tone(780,.22,'sine',.035)}hud()};
 const halo=silkHalo;silkHalo=function(){if(state!=='playing')return false;const silk=player.silk,ok=halo();if(!ok)return ok;player.silk=Math.min(player.silk,Math.max(0,silk-10));player.haloCd=Math.max(1.2,player.haloCd);wovenDetonate();if(weavePower('orbit')){loomBurst=0;player.haloEchoPending=false;wovenOrbit={life:2.4,clock:0,pulses:0,reflects:0}}hud();return true};
 const damage=hurt;hurt=function(...args){const p=player,shield=p.shields,guard=p.heirloomGuard;damage(...args);if(weavePower('guard')&&((shield||0)>(p.shields||0)||guard&&!p.heirloomGuard)){p.wovenCounter=true;p.wovenCounterUntil=runTime+5;floatText(p.x,p.y-52,'RIPOSTE READY','#ecd49c');tone(580,.16,'triangle',.03)}};
 const attack=strike;strike=function(){const id=player.attackId;attack();if(player.attackId!==id&&player.wovenCounter){player.wovenCounter=false;shots.push({x:player.x,y:player.y-7,vx:player.attackFace*550,vy:0,damage:2+.8*weavePower('guard'),hit:new Set(),life:.65,friendly:true,woven:true,crescent:true});if(giftPower('thorns'))giftArea(player.x,player.y,140,.6*giftPower('thorns'),'#e2cb98');tone(370,.2,'triangle',.03)}};
 const chill=enemyChill;enemyChill=function(e){const normal=ironChamber()?(e.final||e.kind==='boss'?1.28:1.2):1;return Math.max(normal*(e.final||e.kind==='boss'?.7:.5),chill(e))};
 const step=update;update=function(dt){const p=player,prior=runTime;p.wovenBeforeX=p.x;p.wovenBeforeY=p.y;step(dt);if(state==='playing'&&runTime>prior)tickWoven(runTime-prior)};
 const art=drawTravelerRoom;drawTravelerRoom=function(){art();drawWoven()};
 const build=showBuild;showBuild=function(){build();if(state==='dialogue')$('panelcontent').insertAdjacentHTML?.('afterbegin',wovenBuildMarkup())};$('buildbutton').onclick=showBuild;
 const ui=hud;hud=function(){ui();if(!player)return;const notes=[];if(weavePower('sky'))notes.push('SKY '+(player.wovenFeathers||0)+'/3');if(player.wovenCounter)notes.push('RIPOSTE READY');if(weavePower('blood')&&player.silk<Math.max(10,player.boltCost)&&player.hp>1)notes.push('Q · COSTS 1 ♥');if(notes.length)$('buildbutton').textContent='B · '+notes.join(' · ')};
 const summary=activeSynergies;activeSynergies=function(){return [...summary(),...wovenComboRows().filter(r=>r[2]).map(r=>r[0]+' · '+r[3])]};
}
