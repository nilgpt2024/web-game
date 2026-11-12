'use strict';
const giftTiers=[{name:'Common',color:'#c4c8ad',power:1},{name:'Uncommon',color:'#9edbb8',power:1.35},{name:'Rare',color:'#9fc9f5',power:1.8},{name:'Mythic',color:'#ebbd78',power:2.4}];
const pct=n=>Math.round(n*100)+'%';
const wildGifts=[
 ['cinder','Cinder Needle','♨','Burn',s=>`Hits burn for ${(s*.3).toFixed(2)} damage/sec for 3 sec. Up to 3 stacks.`],
 ['venom','Widow Venom','✣','Poison',s=>`Hits poison for ${(s*.18).toFixed(2)} damage/sec for 6 sec. Up to 5 stacks.`],
 ['rime','Winter Antenna','❄','Control',s=>`Hits chill enemy actions by ${pct(Math.min(.45,.15*s))} for 2 sec.`],
 ['chain','Copper Wings','ϟ','Lightning',s=>`Hits arc ${(s*.55).toFixed(2)} damage to a second enemy within 210. 0.65 sec cooldown.`],
 ['burst','Spore Funeral','✺','Bloom',s=>`Kills burst for ${(s*.8).toFixed(2)} damage within 135. Bursts cannot trigger more bursts.`],
 ['leech','Redroot Sap','❧','Sustain',s=>`Kills store ${(s*.15).toFixed(2)} healing. Every whole point restores a heart.`],
 ['gather','Velvet Spool','∞','Silk',s=>`Gather ${Math.round(3*s)} extra silk on needle hits.`],
 ['reservoir','Dew Collector','♧','Silk',s=>`Regenerate ${(s*.8).toFixed(2)} silk/sec during uncleared combat.`],
 ['pogo','Thorn Acrobat','↓','Pogo',s=>`Pogo damage +${pct(.2*s)}. Stacks with perfect hits.`],
 ['spring','Springtail Anklet','⋈','Pogo',s=>`Pogo launches ${Math.round(s*25)} faster, capped at +120 upward speed.`],
 ['comet','Comet Carapace','↠','Dash',s=>`Dashing scorches nearby foes for ${(s*.8).toFixed(2)} damage, once per dash.`],
 ['ward','Lantern Aegis','◈','Guard',s=>`Start each main room with ${s>=1.8?2:1} hit-blocking shield charges, each granting ${(0.5+s*.2).toFixed(2)} sec of guard. No protection from falls.`],
 ['thorns','Briar Reprisal','†','Guard',s=>`Blocking or taking a hit retaliates for ${(s*1.2).toFixed(2)} damage within 140.`],
 ['duel','Solitary Fang','⟡','Precision',s=>`Deal +${pct(.2*s)} damage when no second foe is within 220 of your target.`],
 ['execute','Reaper’s Thread','ψ','Precision',s=>`Deal +${pct(.3*s)} damage to foes below 30% health.`],
 ['fury','Last Heart Hymn','♡','Fury',s=>`At 2 hearts or fewer, deal +${pct(.35*s)} damage.`],
 ['fever','Fever Bloom','✹','Alchemy',s=>`Burning AND poisoned foes take +${pct(.35*s)} direct damage. Burn + poison unlocks Fever Garden.`],
 ['gild','Gilded Mandibles','✧','Fortune',s=>`Kills have a ${pct(Math.min(.85,.25*s))} chance to drop one bonus seed.`],
 ['tea','Hearth Tea','♨','Sustain',s=>`Clearing a main combat room stores ${(s*.35).toFixed(2)} healing. Whole points restore hearts.`],
 ['dew','Morning Dew','◇','Silk',s=>`Clearing a main combat room restores ${Math.round(12*s)} silk.`],
 ['third','Third Bell','⋮','Rhythm',s=>`Every third needle strike deals +${pct(.3*s)} damage.`],
 ['fan','Starfall Spool','✴','Bolt',s=>`Silk bolts launch two side bolts, each dealing ${pct(.35*s)} of bolt damage.`],
 ['echo','Echoing Loom','◎','Halo',s=>`Silk Halo ends with a second burst: ${(s*1.1).toFixed(2)} damage within 190.`],
 ['lamp','Firefly Heart','☼','Light',s=>`Light radius +${Math.round(40*s)} in dark rooms; +${pct(.1*s)} damage there.`],
 ['glass','Glasswing Bargain','♢','PACT',s=>`Add ${pct(.35*s)} of weapon base damage. COST: lose 1 maximum heart (minimum 2).`,true],
 ['lead','Stone Anklets','▣','PACT',s=>`Gain ${giftTiers.findIndex(t=>t.power===s)+1} maximum hearts and heal that much. COST: movement speed −10%.`,true],
 ['dry','Dry Spool Oath','∅','PACT',s=>`Bolt damage +${Math.round(s*2)}. COST: direct-hit silk gathering −35%.`,true],
 ['bloodprice','Blood Moon Oath','☾','PACT',s=>`Add ${pct(.28*s)} of weapon base damage. COST: mending requires 80 silk.`,true],
 ['greed','Debt of Gold','✧','PACT',s=>`Every kill grants ${Math.ceil(s)} extra seeds. COST: taking damage loses 2 carried seeds.`,true],
 ['restless','Restless Wings','↯','PACT',s=>`Needle recovery ${pct(Math.min(.45,.15*s))} faster. COST: damage invulnerability reduced to 0.5 sec.`,true]
].map(([id,name,icon,family,describe,pact=false])=>({id:'wild-'+id,key:id,name,icon,family,describe,pact}));
let giftEffects=[],giftInternal=false,giftClearPaid=false,homieGate=false,homieVisits=0,homieReturn=null,homieBall=null,homieTalk=0,bossHomeWaiting=false;
function giftPower(key){return player?.gifts?.[key]||0}
function chooseGiftTier(min=0){const n=Math.random(),tier=n<.5?0:n<.8?1:n<.96?2:3;return Math.max(min,tier)}
function makeGift(def,tier=chooseGiftTier()){const t=giftTiers[tier],s=t.power;return{id:def.id,name:def.name,icon:def.icon,desc:def.describe(s),family:def.family,pact:def.pact,tier,key:def.key,apply:p=>applyGift(def,s,tier,p)}}
function applyGift(def,s,tier,p=player){p.gifts??={};const prev=p.gifts[def.key]||0;p.gifts[def.key]=Math.min(6,prev+s);const gain=p.gifts[def.key]-prev;if(!gain)return;const k=def.key;
 if(k==='gather')p.silkGain+=Math.round(3*gain);
 if(k==='glass'){p.damage+=wovenNeedleBase()*.35*gain;p.maxHp=Math.max(2,p.maxHp-1);p.hp=Math.min(p.hp,p.maxHp)}
 if(k==='lead'){const n=Math.max(1,Math.ceil((tier+1)*gain/s));p.maxHp+=n;p.hp=Math.min(p.maxHp,p.hp+n);p.speed=Math.max(170,p.speed*.9)}
 if(k==='dry'){p.boltDamage+=Math.round(gain*2);p.silkGain=Math.max(1,p.silkGain*.65)}
 if(k==='bloodprice')p.damage+=wovenNeedleBase()*.28*gain;
 if(k==='restless')p.attackCooldown=Math.max(.075,p.attackCooldown*(1-Math.min(.45,.15*gain)));
 if(k==='ward')p.shields=Math.min(3,(p.shields||0)+(tier>=2?2:1));
 giftEffects.push({x:p.x,y:p.y,color:giftTiers[tier].color,life:1.1,max:1.1,kind:'bloom'});tone(440*2**(tier/6),.4,'triangle',.04);
}
function giftCard(r,i){const t=giftTiers[r.tier??0],capped=r.key&&giftPower(r.key)>=6;return`<button class="card gift-card ${r.pact?'pact-card':''}" data-relic="${i}" style="--gift-color:${t.color}" ${capped?'disabled':''}><span class="gift-rarity">${t.name.toUpperCase()}${r.pact?' · BARGAIN':''}</span><span class="icon">${r.icon}</span><strong>${r.name}</strong><small>${r.desc}${r.key&&giftPower(r.key)+giftTiers[r.tier].power>6?' Stack limit will reduce this gift’s added potency.':''}</small><span class="gift-family">${capped?'AT STACK LIMIT':r.family||'ROOT RELIC'}${r.key&&giftPower(r.key)>0?' · STACKS WITH YOUR BUILD':''}</span></button>`}
function rollGiftOffers(minTier=0){const available=wildGifts.filter(d=>giftPower(d.key)<6),boons=available.filter(d=>!d.pact),pacts=available.filter(d=>d.pact);const result=[],used=new Set();for(let i=0;i<3;i++){if(minTier===0&&Math.random()<.2){const core=pick(relicPool.filter(r=>!used.has(r.id)));if(core){result.push({...core,tier:0});used.add(core.id);continue}}let pool=i===2&&Math.random()<.3&&pacts.length?pacts:boons;if(!pool.some(d=>!used.has(d.id)))pool=available;const candidates=pool.filter(d=>!used.has(d.id));if(candidates.length){const d=pick(candidates);used.add(d.id);result.push(makeGift(d,chooseGiftTier(minTier)))}else result.push({...pick(relicPool),tier:0})}return result}
function showWildGifts(){offered=rollGiftOffers(currentNode.dark?2:0);setState('relic');$('panelcontent').innerHTML=`<div class="eyebrow">${currentNode.dark?'A REWARD FROM THE LIGHTLESS ROOTS':'THE GARDEN CHANGES YOU'}</div><h2>Let something wild take root.</h2><p>Choose one gift for this descent. Higher rarity means stronger effects.<br>Bargains have permanent costs for the rest of this run. Rare heirlooms replace your single equipped item.</p><div class="cards gift-cards">${offered.map(giftCard).join('')}</div><button id="giftpass" class="secondary">KEEP MY BUILD · PASS →</button><p class="gift-note">Common · Uncommon · Rare · Mythic. Effects stack up to 6 potency per gift.</p>`;$('panelcontent').querySelectorAll('[data-relic]').forEach(b=>b.onclick=()=>selectRelic(Number(b.dataset.relic)));$('giftpass').onclick=()=>showRoute();$('panelcontent').querySelector('button')?.focus()}
function activeSynergies(){const a=[];if(giftPower('cinder')&&giftPower('venom')&&giftPower('fever'))a.push('FEVER GARDEN · burning + poisoned targets take bonus damage');if(giftPower('ward')&&giftPower('thorns'))a.push('BRIAR BULWARK · blocked hits retaliate');if(giftPower('fan')&&player.pierce)a.push('STARSTORM · three piercing silk bolts');if(giftPower('pogo')&&giftPower('spring'))a.push('SKY DANCER · stronger, higher pogos');if(giftPower('fury')&&giftPower('glass'))a.push('GLASS HEART · lethal low-health strikes');if(giftPower('gather')&&giftPower('echo'))a.push('ENDLESS LOOM · gather silk to fuel double halos');return a}
function showBuild(){if(state!=='playing')return;setState('dialogue');$('panelcontent').innerHTML=`<div class="eyebrow">THIS DESCENT ONLY · B / ESC TO RETURN</div><h2>Your wild garden.</h2><div class="build-stats">${player.hp}/${player.maxHp} hearts · ${player.damage.toFixed(2)} needle · ${player.boltDamage.toFixed(1)} bolt · ${player.speed.toFixed(0)} speed</div><div class="synergy-list">${activeSynergies().map(s=>`<p>✧ ${s}</p>`).join('')||'<p>Combine gifts from related families to discover synergies.</p>'}</div><div class="build-list">${player.relics.map(r=>`<article style="--gift-color:${giftTiers[r.tier??0].color}"><b>${r.icon} ${r.name}</b><span>${giftTiers[r.tier??0].name}${r.pact?' · BARGAIN':''}</span><p>${r.desc}</p></article>`).join('')||'<p>No gifts yet. Clear a hunt to choose your first.</p>'}</div><button id="buildclose" class="primary">BACK TO THE DESCENT →</button>`;$('buildclose').onclick=()=>setState('playing')}
function directGiftDamage(e,amount){if(e.hp<=0||amount<=0)return;const previous=giftInternal,stop=hitstop,oldShake=shake;giftInternal=true;try{hitEnemy(e,amount,false,true,true)}finally{giftInternal=previous;hitstop=stop;shake=oldShake}}
function giftArea(x,y,r,damage,color){giftEffects.push({x,y,r,color,life:.42,max:.42,kind:'ring'});for(const e of enemies)if(e.hp>0&&Math.hypot(e.x-x,e.y-y)<r+e.w)directGiftDamage(e,damage)}
function giftKill(e){if(giftPower('leech')){player.sap=(player.sap||0)+.15*giftPower('leech');const heal=Math.floor(player.sap);if(heal){player.hp=Math.min(player.maxHp,player.hp+heal);player.sap-=heal}}
 if(giftPower('gild')&&Math.random()<Math.min(.85,.25*giftPower('gild')))runSeeds++;
 if(giftPower('greed'))runSeeds+=Math.ceil(giftPower('greed'));
 if(giftPower('burst')&&!giftInternal)giftArea(e.x,e.y,135,.8*giftPower('burst'),'#d3d69b');
}
function tickWildGifts(dt){const p=player;if(!p)return;p.chainCd=Math.max(0,(p.chainCd||0)-dt);p.giftDotClock=(p.giftDotClock||0)+dt;
 if(!cleared&&['combat','elite','boss'].includes(currentNode.type)&&giftPower('reservoir'))p.silk=Math.min(100,p.silk+dt*.8*giftPower('reservoir'));
 for(const e of enemies){if(e.hp<=0)continue;for(const k of ['burnTime','poisonTime','chillTime'])e[k]=Math.max(0,(e[k]||0)-dt);if(!e.burnTime)e.burnStacks=0;if(!e.poisonTime)e.poisonStacks=0;
  if(p.giftDotClock>=.5){let damage=0;if(e.burnTime>0)damage+=.15*giftPower('cinder')*(e.burnStacks||0);if(e.poisonTime>0)damage+=.09*giftPower('venom')*(e.poisonStacks||0);if(damage)directGiftDamage(e,damage)}
  if(p.dash>0&&giftPower('comet')&&e.cometDash!==p.dashId&&Math.hypot(e.x-p.x,e.y-p.y)<85+e.w){e.cometDash=p.dashId;directGiftDamage(e,.8*giftPower('comet'));if(giftPower('cinder')){e.burnTime=3;e.burnStacks=Math.min(3,(e.burnStacks||0)+1)}giftEffects.push({x:e.x,y:e.y,color:'#f1b07e',life:.28,max:.28,kind:'ring',r:48})}
 }
 if(p.giftDotClock>=.5){p.giftDotClock=0;if(giftPower('reservoir')&&!cleared)hud();}
 if(p.haloEchoPending&&loomBurst<=0){p.haloEchoPending=false;giftArea(p.x,p.y,190,1.1*giftPower('echo'),'#d9c1f3');tone(880,.25,'sine',.03)}
 payGiftClear();
 for(const e of giftEffects)e.life-=dt;giftEffects=giftEffects.filter(e=>e.life>0);
 tickHomie(dt);
}
function payGiftClear(){const p=player; if(cleared&&!giftClearPaid&&['combat','elite','boss'].includes(currentNode.type)){giftClearPaid=true;if(giftPower('tea')){p.teaStored=(p.teaStored||0)+.35*giftPower('tea');const n=Math.floor(p.teaStored);p.hp=Math.min(p.maxHp,p.hp+n);p.teaStored-=n}p.silk=Math.min(100,p.silk+Math.round(12*giftPower('dew')));if(currentNode.dark){runSeeds+=8;addScore(600);toast('Lightless chamber cleared. +8 seeds · +600 score · Rare or better gift.')}hud()}}
function enemyChill(e){return e.chillTime>0?1-Math.min(.45,.15*giftPower('rime')):1}
function drawGiftFX(){for(const e of enemies){if(e.hp<=0)continue;if(e.burnTime>0)for(let i=0;i<3;i++)ellipse(e.x-12+i*12,e.y+10-Math.sin(time*7+i)*10,3,8,'#f5a367aa');if(e.poisonTime>0){ellipse(e.x,e.y+e.h+3,22,4,'#b5df7477');for(let i=0;i<2;i++)ellipse(e.x+Math.sin(time*2+i*3)*19,e.y-((time*20+i*17)%42),2,3,'#c7e997aa')}if(e.chillTime>0){line(e.x-e.w,e.y+e.h,e.x+e.w,e.y+e.h,'#b9e5f3',2)}}
 for(const f of giftEffects){ctx.save();ctx.globalAlpha=f.life/f.max;ctx.strokeStyle=f.color;ctx.lineWidth=2;const t=1-f.life/f.max;ctx.beginPath();ctx.ellipse(f.x,f.y,(f.r||80)*(t+.2),(f.r||80)*(t+.2)*(f.kind==='ring'?.6:1),t,0,Math.PI*2);ctx.stroke();if(f.x2!==undefined)line(f.x,f.y,f.x2,f.y2,f.color,3);ctx.restore()}
 if(player.shields>0)for(let i=0;i<player.shields;i++){const a=time*1.3+i*Math.PI*2/player.shields,x=player.x+Math.cos(a)*38,y=player.y+Math.sin(a)*35;outlinedEllipse(x,y,4,7,'#dbe8bd','#7fae9e',1)}
}
function drawDarkness(){if(!currentNode?.dark)return;const x=player.x-camera,y=player.y-cameraY,r=205+(companions.pip&&campRecord('pip').completed>=3?25:0)+(heirloomIs('lantern')?120:0)+Math.min(200,40*giftPower('lamp'))+Math.sin(time*1.7)*9;ctx.save();const g=ctx.createRadialGradient(x,y,45,x,y,r);g.addColorStop(0,'#03071000');g.addColorStop(.55,'#03071038');g.addColorStop(1,'#030710ed');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.translate(-camera,-cameraY);for(const f of platforms)if(Math.abs(f.x+f.w/2-player.x)<550){line(f.x,f.y,f.x+f.w,f.y,'#90b7a322',1)}for(const e of enemies)if(e.hp>0&&Math.abs(e.x-player.x)<650){ellipse(e.x+5,e.y-7,2,2,'#efd8a17a');if(['chant','windup','aim','glow','brew'].includes(e.mode))worldLabel(e.x,e.y-e.h-14,'!')}ctx.restore()}
roomTypes.homie={name:'Secret hangout',icon:'◉',color:'#e3be8f',desc:'Meet Liam. Stay a while. Hit a ball around.'};
chamberScores.homie={bpm:84,root:43,scale:[0,2,4,7,9,12,14],phrase:[7,null,9,8,7,null,4,6,7,null,11,9],bass:[0,3,5,0],drums:[0,4],beats:6,type:'sine'};
function homiePosition(){return{x:sideGateX(365),y:roomExit.y-27}}
function enterHomie(){const gate=homiePosition();if(state!=='playing'||!homieGate||!cleared||Math.hypot(player.x-gate.x,player.y-gate.y)>100||currentNode.type==='trap'&&trialSeals.some(s=>!s.collected))return false;
 homieReturn={node:currentNode,damaged:roomDamaged,started:roomStartedAt,clearPaid:giftClearPaid};homieVisits++;currentNode.homieUsed=true;homieGate=false;runSeeds+=drops.length;drops=[];
 makeRoom({...currentNode,id:currentNode.id+'-homie',type:'homie',title:'Homie Bro Bug Hangout',theme:'market',dark:false,climbTop:0});routeHistory.pop();rootScore.setRoom('homie');$('roommusic').textContent='♫ Hearthside Rally';toast('Liam: “Yo, welcome in! Arrow keys to hit the ball. F to chat.”');return true;
}
function leaveHomie(){if(!homieReturn)return false;const back=homieReturn;homieReturn=null;currentNode=back.node;roomDamaged=back.damaged;roomStartedAt=back.started;giftClearPaid=back.clearPaid;routeReady=false;homieBall=null;if(currentNode.type==='boss'){bossHomeWaiting=false;homieGate=false;finish(true)}else exitRoom();return true}
function chatWithLiam(){if(state!=='playing'||currentNode.type!=='homie'||Math.abs(player.x-(homieBall?.liamX||1430))>185)return false;setState('dialogue');const lines=['Yo! You made it. Put the needle down for a second. Or don’t—makes a pretty good bat.','Some runs go wild. Some runs go sideways. You’re welcome here either way, homie.','Five good hits on the ball and I’ll spot you five seeds. One little gift, no grinding.','The roots can wait. This is a no-warden zone.'];$('panelcontent').innerHTML=`<div class="eyebrow">HOMIE BRO BUG HANGOUT</div><div class="speaker-emblem">◉</div><h2>Liam the Bug</h2><p class="traveler-line">${lines[homieTalk++%lines.length]}</p><button id="liamclose" class="primary">LET’S CHILL →</button>`;$('liamclose').onclick=()=>setState('playing');return true}
function tickHomie(dt){if(currentNode.type!=='homie'||!homieBall)return;const b=homieBall,p=player;b.clock+=dt;b.cool=Math.max(0,b.cool-dt);b.vy+=610*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;b.vx*=Math.max(0,1-dt*.13);b.spin+=b.vx*dt*.025;
 if(b.y>630){if(b.hits>0){b.best=Math.max(b.best||0,b.hits);floatText(b.x,610,"RALLY DROPPED · "+b.hits,"#ddb9a1");b.hits=0;ripple(b.x,632,"#c8bca0",true);burst(b.x,628,"#dac7a0",8,80);tone(145,.16,"triangle",.025)}b.y=630;b.vy=-Math.abs(b.vy)*.79;if(Math.abs(b.vy)<70)b.vy=0;b.vx*=.97}if(b.x<310||b.x>1870){b.x=Math.max(310,Math.min(1870,b.x));b.vx*=-.88}
 b.liamX+=(Math.max(1270,Math.min(1640,b.x+80))-b.liamX)*Math.min(1,dt*1.7);
 if(b.cool<=0&&b.x>b.liamX-95&&b.y>470&&b.vx>0){b.vx=-260;b.vy=-340;b.cool=.55;b.wave=.25;ripple(b.x,b.y,'#dcd59f');tone(330,.11,'triangle',.025)}b.wave=Math.max(0,(b.wave||0)-dt);
 const attack=p.attack>0&&b.lastStrike!==p.attackId&&Math.abs(p.x-b.x)<p.reach+30&&Math.abs(p.y-b.y)<90;
 const dash=p.dash>0&&b.lastDash!==p.dashId&&Math.hypot(p.x-b.x,p.y-b.y)<64;
 if(attack||dash){b.lastStrike=p.attackId;b.lastDash=p.dashId;b.vx=(p.attackUp?Math.sign(b.x-p.x)||p.face:p.attackFace||p.face)*(dash?490:350);b.vy=p.attackDown?180:p.attackUp?-520:-360;if(p.attackDown&&!p.ground){p.vy=-480;p.jumps=0;p.dashCd=0}b.hits++;ripple(b.x,b.y,'#ecdba6');burst(b.x,b.y,'#ead9b5',8,130);tone(440+b.hits%5*55,.12,'triangle',.035);if(b.hits>=5&&!b.gift){b.gift=true;runSeeds+=5;toast('Liam: “Nice rally, homie!” +5 seeds.');hud()}}
 if(b.y>720||!Number.isFinite(b.x+b.y)){b.x=1000;b.y=470;b.vx=100;b.vy=-200}
 $('objective').textContent='ARROWS · BAT   F · CHAT   RALLY '+b.hits+' · BEST '+Math.max(b.best||0,b.hits);
}
function drawHomie(){if(homieGate&&cleared){const g=homiePosition();glow(g.x,g.y-40,90,'#e5bd8a',.2);outlinedEllipse(g.x,g.y-27,32,48,'#263d3c','#d9ba88',3);worldLabel(g.x,g.y-100,'F · THE HOMIES');ellipse(g.x-9,g.y-34,3,4,'#e5c795');ellipse(g.x+9,g.y-34,3,4,'#e5c795');ctx.beginPath();ctx.arc(g.x,g.y-27,12,0,Math.PI);ctx.strokeStyle='#e5c795';ctx.stroke()}
 if(currentNode.type!=='homie'||!homieBall)return;const b=homieBall;
 for(let i=0;i<9;i++){const x=350+i*185,y=285+Math.sin(i*.4)*45;line(x-92,y-10,x+92,y+10,'#a6aa8755',1);outlinedEllipse(x,y,6,10,['#e9c488','#b5d5bd','#c8b4d7'][i%3],'#7f896f',1);glow(x,y,55,'#e4bc7f',.1)}
 ctx.fillStyle='#42534c';ctx.fillRect(505,581,185,55);ctx.fillStyle='#7f6a62';ctx.fillRect(515,575,165,36);for(let i=0;i<3;i++)outlinedEllipse(539+i*54,575,25,14,'#8e796e','#bcae8c',2);line(525,635,519,650,'#9d9272',5);line(669,635,675,650,'#9d9272',5);
 cottage(1740,650,.75,3);ctx.fillStyle='#29413d';ctx.fillRect(915,350,370,111);ctx.strokeStyle='#b7a787';ctx.lineWidth=3;ctx.strokeRect(915,350,370,111);ctx.textAlign='center';ctx.fillStyle='#e6d9b8';ctx.font='22px Georgia';ctx.fillText('HOMIE BRO BUG HANGOUT',1100,386);ctx.font='16px Georgia';ctx.fillText('No crowns. No pressure. Just good bugs.',1100,418);ctx.fillText('RALLY · '+b.hits,1100,444);
 drawFriendlyBug(b.liamX,623-Math.sin(time*3)*2,'smith',1.08);ctx.fillStyle='#89a599';ctx.fillRect(b.liamX-18,598,36,18);line(b.liamX-21,580,b.liamX+20,580,'#b9c8ad',5);line(b.liamX+8,579,b.liamX+30,582,'#b9c8ad',4);if(b.wave>0)line(b.liamX-16,610,b.liamX-45,583,'#e2c899',4);worldLabel(b.liamX,548,'LIAM · F TO CHAT');
 ctx.save();ctx.translate(b.x,b.y);ctx.rotate(b.spin);outlinedEllipse(0,0,18,18,'#ddbb7c','#182d2a',3);line(-16,-5,16,5,'#866953',2);line(-5,-16,5,16,'#866953',2);ellipse(-5,-6,4,3,'#f5e2b1');ctx.restore();ellipse(b.x,649,19,3,'#0e211d55');
}
function installWildGifts(){
 const equip=equipRun;equipRun=function(){equip();player.gifts={};player.shields=0;player.sap=0;player.teaStored=0;player.chainCd=0;giftEffects=[];homieVisits=0;homieReturn=null;homieBall=null;bossHomeWaiting=false};
 const init=initCampaign;initCampaign=function(){init();for(const n of routeGraph.flat())if(n.type==='combat'&&n.depth>=4){n.dark=Math.random()<.28;if(n.dark)n.title='Lightless · '+n.title}const guaranteed=routeGraph[4].find(n=>n.type==='combat');if(guaranteed&&!guaranteed.dark){guaranteed.dark=true;guaranteed.title='Lightless · '+guaranteed.title}};
 const make=makeRoom;makeRoom=function(node=currentNode){make(node);giftClearPaid=false;giftEffects=[];player.haloEchoPending=false;bossHomeWaiting=false;player.shields=giftPower('ward')?Math.min(3,giftPower('ward')>=1.8?2:1):0;
  if(node.homieRoll===undefined)node.homieRoll=Math.random();homieGate=!['homie','paradise'].includes(node.type)&&!node.homieUsed&&homieVisits<2&&node.homieRoll<.10;
  if(node.type==='shop'){const stocks=wildGifts.filter(d=>!d.pact&&giftPower(d.key)<6);shopItems[0].name=stocks.length?makeGift(pick(stocks)):{...pick(relicPool),tier:0};shopItems[0].cost=7+(shopItems[0].name.tier+1)*3}
  if(node.type==='homie'){enemies=[];shots=[];hazards=[];pods=[];trialSeals=[];walls=[];areaBursts=[];platforms=[{x:0,y:650,w:2200,h:100}];cleared=true;homieGate=false;paradiseGate=false;homieBall={x:1030,y:460,vx:130,vy:-50,spin:0,clock:0,cool:0,hits:0,gift:false,lastStrike:-1,lastDash:-1,liamX:1450};player.x=760;player.y=623;camera=350}
  hud();
 };
 chooseRelic=showWildGifts;
 const selected=selectRelic;selectRelic=function(index){const r=offered[index];if(r?.key&&giftPower(r.key)>=6)throw Error('This gift is already at its stack limit.');return selected(index)};
 const hit=hitEnemy;hitEnemy=function(e,damage,pogo=false,projectile=false,noSilk=false){const hp=e.hp,p=player;const direct=!giftInternal;
  if(direct){if(pogo)damage*=1+.2*giftPower('pogo');if(giftPower('duel')&&!enemies.some(o=>o!==e&&o.hp>0&&Math.hypot(o.x-e.x,o.y-e.y)<220))damage*=1+.2*giftPower('duel');if(e.hp<e.maxHp*.3)damage*=1+.3*giftPower('execute');if(p.hp<=2)damage*=1+.35*giftPower('fury');if(e.burnTime>0&&e.poisonTime>0)damage*=1+.35*giftPower('fever');if(currentNode.dark)damage*=1+.1*giftPower('lamp')}
  const ok=hit(e,damage,pogo,projectile,noSilk||giftInternal);if(!ok||hp<=e.hp)return ok;
  if(direct&&e.hp>0){if(giftPower('cinder')){e.burnTime=3;e.burnStacks=Math.min(3,(e.burnStacks||0)+1)}if(giftPower('venom')){e.poisonTime=6;e.poisonStacks=Math.min(5,(e.poisonStacks||0)+1)}if(giftPower('rime'))e.chillTime=2;
   if(giftPower('chain')&&p.chainCd<=0){const other=enemies.find(o=>o!==e&&o.hp>0&&Math.hypot(o.x-e.x,o.y-e.y)<210);if(other){p.chainCd=.65;directGiftDamage(other,.55*giftPower('chain'));giftEffects.push({x:e.x,y:e.y,x2:other.x,y2:other.y,color:'#c8deed',life:.22,max:.22,kind:'bolt',r:16})}}
  }
  if(e.hp<=0&&hp>0&&!e.summoned)giftKill(e);return ok;
 };
 const damage=hurt;hurt=function(amount=1,x=player.x){if(currentNode?.type==='homie')return;const p=player;if(p.inv>0||p.dash>0||state!=='playing')return;const fall=p.y>785||p.y>cameraY+H+140;
  if(p.shields>0&&!fall){p.shields--;p.inv=.5+Math.min(6,giftPower('ward'))*.2;ripple(p.x,p.y,'#d2ebbf');tone(880,.18,'sine',.04);if(giftPower('thorns'))giftArea(p.x,p.y,140,1.2*giftPower('thorns'),'#c6d89f');hud();return}
  const hp=p.hp;if(giftPower('greed'))runSeeds=Math.max(0,runSeeds-2);damage(amount,x);if(p.hp<hp){if(giftPower('restless'))p.inv=Math.min(p.inv,.5);if(giftPower('thorns')&&state==='playing')giftArea(p.x,p.y,140,1.2*giftPower('thorns'),'#d4b694');hud()}
 };
 const bounce=pogoBounce;pogoBounce=function(...args){bounce(...args);player.vy-=Math.min(120,25*giftPower('spring'))};
 const attack=strike;strike=function(){const before=player.attackId;attack();if(player.attackId!==before&&player.strikeCount%3===0){player.strikePower*=1+.3*giftPower('third');if(giftPower('third'))giftEffects.push({x:player.x,y:player.y,color:'#f2dba3',r:player.reach,life:.2,max:.2,kind:'ring'})}};
 const shot=bolt;bolt=function(){const before=shots.length;shot();if(shots.length>before&&giftPower('fan')){const main=shots[shots.length-1];for(const s of [-1,1])shots.push({...main,vx:main.vx*.94,vy:s*170,damage:main.damage*.35*giftPower('fan'),hit:new Set()})}};
 const mend=heal;heal=function(){if(!giftPower('bloodprice'))return mend();if(player.hp>=player.maxHp)return toast('Your carapace is already whole.');if(player.silk<80)return toast('Blood Moon Oath: mending needs 80 silk.');player.silk-=25;mend()};
 const halo=silkHalo;silkHalo=function(){const ok=halo();if(ok&&giftPower('echo'))player.haloEchoPending=true;return ok};
 const updateGame=update;update=function(dt){if(pressed.has('KeyB')){showBuild();return}updateGame(dt);if(state==='playing'){tickWildGifts(dt);if(bossHomeWaiting&&Math.abs(player.x-roomExit.x)<65&&Math.abs(player.y-roomExit.y+27)<90){homieGate=false;bossHomeWaiting=false;finish(true)}}};
 const end=finish;finish=function(won){if(won)payGiftClear();if(won&&homieGate&&!homieReturn){if(!bossHomeWaiting)toast('Victory! A homie gate opened. F to visit, or take the main gate to return home.');bossHomeWaiting=true;return}end(won)};
 const leave=exitRoom;exitRoom=function(){if(currentNode.type==='homie')return leaveHomie();payGiftClear();leave()};
 const service=roomService;roomService=function(){if(enterHomie()||chatWithLiam())return;service()};
 
 
 
 const objects=drawTravelerRoom;drawTravelerRoom=function(){objects();drawHomie();drawGiftFX()};
 const world=drawWorld;drawWorld=function(){world();drawDarkness()};
 const ui=hud;hud=function(){ui();if(!player)return;$('relics').innerHTML=player.relics.slice(-5).map(r=>`<span style="border-color:${giftTiers[r.tier??0].color};color:${giftTiers[r.tier??0].color}" title="${r.name}: ${r.desc}">${r.icon} ${r.name}</span>`).join('')+(player.relics.length>5?`<span>+${player.relics.length-5} · B to inspect</span>`:'');$('buildbutton').textContent='B · BUILD '+player.relics.length};
 const shop=openShop;openShop=function(){shop();const r=shopItems[0]?.name;if(r?.tier!==undefined){const card=$('panelcontent').querySelector('[data-buy="0"]');if(card){card.style.borderColor=giftTiers[r.tier].color;card.insertAdjacentHTML?.('afterbegin',`<span class="gift-rarity">${giftTiers[r.tier].name.toUpperCase()}</span>`)}}};
 $('buildbutton').onclick=showBuild;controlKeys.add('KeyB');window.addEventListener('keydown',e=>{if(e.code==='KeyB'&&state==='dialogue'&&$('buildclose')){e.preventDefault();setState('playing')}});
}
