'use strict';
// Heirlooms occupy one run-only slot. Their effects never become permanent stat mutations.
const heirlooms=[
 {id:'glass',name:'Mothglass Lens',icon:'◉',color:'#a9dbf3',desc:'Silk bolts deal 40% more damage. A crystal third eye shines above your mask.'},
 {id:'briar',name:'Briar Diadem',icon:'♜',color:'#e49c98',desc:'Successful pogos release a 130-radius shockwave for 1.6 damage. 0.8 second cooldown. A thorn crown blooms around your head.'},
 {id:'anchor',name:'Anchor Carapace',icon:'⬡',color:'#bccbbb',desc:'Block the first enemy hit in each combat room. Move 12% slower. Falls still hurt. A heavy hexagonal shell surrounds you.'},
 {id:'comet',name:'Comet Spurs',icon:'↠',color:'#f1c183',desc:'Dash recovery is 35% faster. Amber ribbons stream from your feet during a dash.'},
 {id:'lantern',name:'Ghost Lantern',icon:'☼',color:'#9fe6d8',desc:'Nearby enemies act 20% slower within 180. Lightless vision reaches 120 farther. A ghostly lantern follows your shoulder.'},
 {id:'seed',name:'Rootheart Seed',icon:'❧',color:'#b6d898',desc:'Every second combat room cleared while carrying this heals 1 heart. Swapping resets progress. Living vines curl around your cloak.'},
 {id:'wings',name:'Chime Wings',icon:'⋈',color:'#d3c0f1',desc:'Gain one additional jump before landing (normally a third). Two translucent silk wings unfurl behind you.'},
 {id:'fang',name:'Hunger Fang',icon:'†',color:'#ecab86',desc:'At 2 hearts or fewer, direct attacks deal 50% more damage; above that, 10% less. A red fang glows brightest when wounded.'},
 {id:'spindle',name:'Dusk Spindle',icon:'◎',color:'#c2b7ef',desc:'Silk Halo costs 15 less silk, down to a minimum of 20. A small spinning loom orbits your needle hand.'},
 {id:'mirror',name:'Mirror Scarab',icon:'◇',color:'#dce9e9',desc:'Reflect one nearby hostile projectile every 3 seconds, dealing 2 damage. A silver scarab circles you; it dims while recharging.'} ,
 {id:'echochime',name:'Echochime Rosary',icon:'♬',color:'#e8d092',desc:'When an airborne chain ends, remember its enemy pogos. Direct attacks gain 6% damage per remembered pogo, up to +120%. Your next completed enemy chain replaces it. Pod bounces do not charge it. A rosary of golden bells carries the echo.'}
];
function pogoMemoryBonus(){return Math.min(20,player?.lastPogoChain||0)*.06}
function heirloomIs(id){return player?.heirloom===id}
function wornHeirloom(){return heirlooms.find(h=>h.id===player?.heirloom)}
function equipHeirloom(id){if(!heirlooms.some(h=>h.id===id))return false;player.heirloom=id;player.heirloomPulse=1;player.heirloomCd=0;player.heirloomGuard=false;player.heirloomHarvest=0;player.heirloomClears=new Set([currentNode.id]);hud();ripple(player.x,player.y,wornHeirloom().color);tone(660,.6,'sine',.04);return true}
function heirloomOffer(h){return{id:'heirloom-'+h.id,heirloom:h.id,name:h.name,icon:h.icon,desc:h.desc}}
function heirloomCard(r,i){const h=heirlooms.find(h=>h.id===r.heirloom),old=wornHeirloom();return`<button class="card heirloom-card" data-relic="${i}" style="--heirloom-color:${h.color}"><span class="gift-rarity">HEIRLOOM · ONE SLOT</span><span class="icon">${h.icon}</span><strong>${h.name}</strong><small>${h.desc}</small><span class="heirloom-swap">${old?'REPLACES '+old.name.toUpperCase():'EQUIP FOR THIS RUN'}</span><small class="heirloom-note">Separate from your stacking gifts.</small></button>`}
function tickHeirloom(dt){const p=player;if(!p?.heirloom)return;p.heirloomCd=Math.max(0,(p.heirloomCd||0)-dt);p.heirloomPulse=Math.max(0,(p.heirloomPulse||0)-dt);
 if(heirloomIs('mirror')&&p.heirloomCd===0){const s=shots.find(s=>!s.friendly&&s.life>0&&Math.hypot(s.x-p.x,s.y-p.y)<76);if(s){s.friendly=true;s.wave=false;s.bomb=false;s.web=false;s.gravity=0;s.vx=-s.vx||p.face*300;s.vy=-s.vy;s.hit=new Set();s.damage=2;s.life=Math.max(1,s.life);p.heirloomCd=3;p.heirloomPulse=.5;ripple(s.x,s.y,'#e6f8fa');tone(940,.12,'triangle',.035)}}
 if(cleared&&['combat','elite','boss'].includes(currentNode.type)&&!p.heirloomClears.has(currentNode.id)){p.heirloomClears.add(currentNode.id);if(heirloomIs('seed')){p.heirloomHarvest++;if(p.heirloomHarvest%2===0){p.hp=Math.min(p.maxHp,p.hp+1);p.heirloomPulse=1;burst(p.x,p.y,'#bddea5',22,110);hud()}}}
}
function drawHeirloom(){const h=wornHeirloom();if(!h)return;const p=player,c=h.color;ctx.save();ctx.translate(p.x,p.y);const pulse=p.heirloomPulse||0;glow(0,-3,54+pulse*35,c,.045+pulse*.12);
 if(h.id==='echochime'){const count=Math.min(10,Math.ceil((p.lastPogoChain||0)/2));ctx.strokeStyle=c+'66';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(0,2,35,39,0,0,Math.PI*2);ctx.stroke();for(let i=0;i<10;i++){const a=i*Math.PI/5+time*.25,x=Math.cos(a)*35,y=2+Math.sin(a)*39;outlinedEllipse(x,y,3.5,5,i<count?c:'#34413d',i<count?'#fff0ba':c+'55',1);if(i<count)line(x,y+5,x,y+8,c,1)}if(count)worldLabel(0,-55,'+'+Math.round(pogoMemoryBonus()*100)+'% ECHO')}
 if(h.id==='glass'){
outlinedEllipse(0,-43,8,11,'#233c49',c,2);ellipse(0,-43,3,5,'#f0fcff');for(let i=0;i<3;i++)line(-10+i*10,-58,-8+i*8,-63,c+'77',1)}
 if(h.id==='briar'){for(let i=0;i<7;i++){const a=Math.PI+i*Math.PI/6,x=Math.cos(a)*25,y=-24+Math.sin(a)*24;line(x*.72,y+6,x,y,c,2);line(x,y,x+Math.cos(a)*7,y-8,c,2)}}
 if(h.id==='anchor'){ctx.beginPath();for(let i=0;i<6;i++){const a=i*Math.PI/3+Math.PI/6,x=Math.cos(a)*35,y=Math.sin(a)*39;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.closePath();ctx.strokeStyle=p.heirloomGuard?c:'#6c7e7677';ctx.lineWidth=p.heirloomGuard?3:1;ctx.stroke();outlinedEllipse(0,22,7,8,'#56675d',c,1)}
 if(h.id==='comet'){for(const y of [17,25]){ctx.beginPath();ctx.moveTo(-p.face*10,y);ctx.quadraticCurveTo(-p.face*(p.dash>0?85:30),y-20,-p.face*(p.dash>0?150:38),y+Math.sin(time*11+y)*7);ctx.strokeStyle=c+(p.dash>0?'cc':'88');ctx.lineWidth=3;ctx.stroke()}ellipse(-p.face*13,22,4,6,c)}
 if(h.id==='lantern'){const x=Math.sin(time*1.4)*12-35,y=-32+Math.sin(time*2)*5;line(x,y-12,x,y-24,c,1);outlinedEllipse(x,y,9,13,'#42796d',c,2);glow(x,y,70,c,.18);ellipse(x,y,3,7,'#ecffe5')}
 if(h.id==='seed'){for(const side of [-1,1]){ctx.beginPath();ctx.moveTo(side*9,24);ctx.quadraticCurveTo(side*34,1,side*14,-10);ctx.strokeStyle=c;ctx.lineWidth=2;ctx.stroke();for(let i=0;i<3;i++)ellipse(side*(21+Math.sin(i)*4),19-i*9,7,3,c+'bb')}ellipse(0,24,5,5,p.heirloomHarvest%2?'#f7e9a7':c)}
 if(h.id==='wings'){for(const side of [-1,1]){ctx.save();ctx.scale(side,1);ctx.rotate(Math.sin(time*(p.ground?4:15))*.13);outlinedEllipse(27,-6,24,11,c+'33',c,1.5);line(9,0,48,-8,c+'99',1);ctx.restore()}for(let i=0;i<Math.max(0,p.maxJumps+1-p.jumps);i++)ellipse(-8+i*8,-43,2,2,c)}
 if(h.id==='fang'){line(-13,-7,-18,10,c,3);line(13,-7,18,10,c,3);if(p.hp<=2){glow(0,0,85,'#e96569',.16);for(let i=0;i<5;i++)ellipse(Math.sin(time*3+i)*25,-((time*22+i*13)%60),2,3,'#ec998b99')}}
 if(h.id==='spindle'){ctx.save();ctx.translate(p.face*35,-5);ctx.rotate(time*2);for(let i=0;i<4;i++){ctx.rotate(Math.PI/2);line(-13,0,13,0,c,1);outlinedEllipse(12,0,3,5,c+'55',c,1)}outlinedEllipse(0,0,5,5,'#454462',c,1);ctx.restore()}
 if(h.id==='mirror'){const a=time*1.8,x=Math.cos(a)*40,y=Math.sin(a)*32;ctx.globalAlpha=p.heirloomCd>0?.35:1;outlinedEllipse(x,y,8,11,'#aac3c5',c,2);line(x,y-9,x,y+9,'#456176',1);for(const s of [-1,1])line(x+s*6,y,x+s*13,y+5,c,1);if(p.heirloomCd===0)glow(x,y,28,c,.13)}
 ctx.restore();
}
function installHeirlooms(){
 const equip=equipRun;equipRun=function(){equip();player.heirloom=null;player.lastPogoChain=0;player.enemyPogoChain=0;player.heirloomClears=new Set()};
 const roll=rollGiftOffers;rollGiftOffers=function(min=0){const result=roll(min);if(Math.random()<.13){const pool=heirlooms.filter(h=>!heirloomIs(h.id));result[2]=heirloomOffer(pick(pool))}return result};
 const card=giftCard;giftCard=function(r,i){return r.heirloom?heirloomCard(r,i):card(r,i)};
 const choose=selectRelic;selectRelic=function(index){if(state!=='relic'||!Number.isInteger(index)||!offered[index])throw Error('Choose an available reward.');const r=offered[index];if(!r.heirloom)return choose(index);equipHeirloom(r.heirloom);showRoute();return r.name};
 const make=makeRoom;makeRoom=function(n=currentNode){make(n);player.heirloomGuard=heirloomIs('anchor')&&['combat','elite','boss'].includes(n.type)};
 const tick=tickWildGifts;tickWildGifts=function(dt){tick(dt);tickHeirloom(dt)};
 const step=update;update=function(dt){const p=player,speed=p.speed,jumps=p.maxJumps,dash=p.dashCooldown,halo=p.haloCost,bolt=p.boltDamage;try{if(heirloomIs('anchor'))p.speed*=.88;if(heirloomIs('wings'))p.maxJumps++;if(heirloomIs('comet'))p.dashCooldown*=.65;if(heirloomIs('spindle'))p.haloCost=Math.max(15,p.haloCost-15);if(heirloomIs('glass'))p.boltDamage*=1.4;step(dt)}finally{p.speed=speed;p.maxJumps=jumps;p.dashCooldown=dash;p.haloCost=halo;p.boltDamage=bolt}};
 const chill=enemyChill;enemyChill=function(e){return chill(e)*(heirloomIs('lantern')&&Math.hypot(e.x-player.x,e.y-player.y)<180?.8:1)};
 const hit=hitEnemy;hitEnemy=function(e,d,pogo=false,projectile=false,noSilk=false){if(heirloomIs('echochime')&&!giftInternal)d*=1+pogoMemoryBonus();if(heirloomIs('fang')&&!giftInternal)d*=player.hp<=2?1.5:.9;const hp=e.hp,result=hit(e,d,pogo,projectile,noSilk);if(result&&e.hp<hp&&pogo&&!giftInternal&&heirloomIs('briar')&&player.heirloomCd<=0){player.heirloomCd=.8;giftArea(player.x,player.y+32,130,1.6,'#e5a4a4')}return result};
 const hurtOld=hurt;hurt=function(amount=1,x=player.x){const p=player,fall=p.y>785||p.y>cameraY+H+140;if(heirloomIs('anchor')&&p.heirloomGuard&&p.inv<=0&&p.dash<=0&&state==='playing'&&!fall){p.heirloomGuard=false;p.inv=.65;p.heirloomPulse=.6;ripple(p.x,p.y,'#d5e4ce');tone(190,.2,'triangle',.04);return}return hurtOld(amount,x)};
 const hudOld=hud;hud=function(){hudOld();const h=wornHeirloom();if(h)$('relics').innerHTML+=`<span class="worn-heirloom" style="border-color:${h.color};color:${h.color}" title="${h.desc}">${h.icon} ${h.name}${h.id==='echochime'?' · +'+Math.round(pogoMemoryBonus()*100)+'%':''} · ONE SLOT</span>`};
 const build=showBuild;showBuild=function(){build();if(state!=='dialogue')return;const h=wornHeirloom();$('panelcontent').insertAdjacentHTML?.('afterbegin',`<section class="heirloom-build"><span>HEIRLOOM · ONE SLOT</span><h3>${h?h.icon+' '+h.name:'Empty heirloom slot'}</h3><p>${h?h.desc+(h.id==='echochime'?' Last completed chain: '+(player.lastPogoChain||0)+' enemy pogos · +'+Math.round(pogoMemoryBonus()*100)+'% damage.':''):'Rare reward choices may offer an heirloom. Taking another replaces the one you carry.'}</p></section>`)};$('buildbutton').onclick=showBuild;
}
