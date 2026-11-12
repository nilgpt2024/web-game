'use strict';
const menBoons=[
 ['grounded','Rooted Needle','Needle',s=>`Grounded direct hits deal +${pct(.15*s)} damage.`],
 ['rising','Updraft Fang','Aerial',s=>`Direct hits while rising deal +${pct(.18*s)} damage.`],
 ['falling','Plummet Tooth','Aerial',s=>`Direct hits while falling deal +${pct(.16*s)} damage.`],
 ['wallfang','Bark Duelist','Traversal',s=>`Direct hits within 100 of a climbable wall deal +${pct(.25*s)} damage.`],
 ['clean','First-Light Pollen','Precision',s=>`Until you take damage in a room, direct hits deal +${pct(.14*s)} damage.`],
 ['wealthy','Seedweight Edge','Fortune',s=>`With at least 25 carried seeds, direct hits deal +${pct(.16*s)} damage.`],
 ['empty','Empty-Spool Fang','Silk',s=>`At 20 silk or less, direct hits deal +${pct(.22*s)} damage.`],
 ['close','Close-Quarters Claw','Needle',s=>`Direct hits within 90 of your target deal +${pct(.13*s)} damage.`],
 ['distant','Far-Thread Lens','Bolt',s=>`Direct projectiles hitting beyond 240 deal +${pct(.3*s)} damage.`],
 ['fresh','Shellbreaker Dust','Precision',s=>`Direct hits against enemies above 70% health deal +${pct(.16*s)} damage.`],
 ['ashbite','Ash Appetite','Burn',s=>`Direct hits against burning enemies deal +${pct(.2*s)} damage.`],
 ['toxic','Venom Sip','Poison',s=>`Direct hits against poisoned enemies deal +${pct(.18*s)} damage.`],
 ['brittle','Frost Splinter','Control',s=>`Direct hits against chilled enemies deal +${pct(.22*s)} damage.`],
 ['opening','Open-Shell Needle','Precision',s=>`Direct hits during enemy recovery deal +${pct(.3*s)} damage.`],
 ['dazed','Dazed Dandelion','Control',s=>`Direct hits against stunned enemies deal +${pct(.25*s)} damage.`],
 ['slip','Slipstitch','Dash',s=>`For 1 second after dashing, direct hits deal +${pct(.25*s)} damage.`],
 ['tender','Tender Thorn','Mend',s=>`For 5 seconds after mending, direct hits deal +${pct(.2*s)} damage.`],
 ['overture','Loom Overture','Halo',s=>`For 3 seconds after Halo, direct hits deal +${pct(.22*s)} damage.`],
 ['ribbon','Ribbon of Flight','Pogo',s=>`At a 4+ airborne chain, direct hits deal +${pct(.2*s)} damage.`],
 ['quickstart','Opening Bell','Rhythm',s=>`During a room’s first 12 seconds, direct hits deal +${pct(.2*s)} damage.`],
 ['perfectthread','Silver Landing','Pogo',s=>`Perfect enemy pogos gather ${Math.round(6*s)} extra silk.`],
 ['perfectpurse','Acrobat’s Purse','Fortune',s=>`Perfect enemy pogos have a ${pct(Math.min(.8,.25*s))} chance to grant 1 seed. Maximum 3 per room.`],
 ['perfectsap','Sky Nectar','Sustain',s=>`Perfect enemy pogos store ${(s*.09).toFixed(2)} healing. Each whole point heals a heart.`],
 ['skybattery','Sky Battery','Bolt',s=>`Enemy pogos reduce bolt cooldown by ${(.15*s).toFixed(2)} seconds.`],
 ['springbolt','Springfire Spool','Bolt',s=>`After an enemy pogo, your next bolt within 3 seconds deals +${pct(.3*s)} damage.`],
 ['skyguard','Petal Parasol','Guard',s=>`Perfect enemy pogos grant ${(.25+.06*s).toFixed(2)} seconds of invulnerability.`],
 ['dashrefund','Windcatcher','Dash',s=>`Dashing in uncleared encounters restores ${Math.round(3*s)} silk. 2 second cooldown.`],
 ['dashburst','Comet Landing','Dash',s=>`Ending a dash bursts for ${(s*.8).toFixed(2)} damage within 100. 1.5 second cooldown.`],
 ['trailfrost','Hoarfrost Ribbon','Control',s=>`Dashing chills foes within 90, slowing actions by ${pct(Math.min(.45,.12*s))} for 2 seconds.`],
 ['sprint','Fleet Afterimage','Momentum',s=>`Move ${pct(Math.min(.4,.08*s))} faster for 3 seconds after a dash.`],
 ['mendward','Suture Shield','Mend',s=>`Mending grants 1 shield (max 2). Cooldown ${Math.max(4,12-2*s).toFixed(1)} seconds. Falls bypass shields.`],
 ['menddash','Stitchstep','Mend',s=>`Mending reduces dash cooldown by ${(.4*s).toFixed(2)} seconds.`],
 ['mendtide','Warm-Tide Spool','Mend',s=>`After mending, regenerate ${(s*2).toFixed(1)} silk/sec for 5 seconds.`],
 ['mendreach','Long Suture','Mend',s=>`After mending, needle reach increases by ${Math.round(20*s)} for 5 seconds.`],
 ['halosap','Moonroot Sap','Halo',s=>`Casting Halo stores ${(s*.2).toFixed(2)} healing. Whole points heal hearts.`],
 ['halosilence','Hush Wreath','Control',s=>`Halo adds ${(.25*s).toFixed(2)} seconds to nearby enemies’ next attack cooldown.`],
 ['haloneedle','Needle Constellation','Halo',s=>`For 2 seconds after Halo, non-projectile strikes deal +${pct(.25*s)} damage.`],
 ['haloafterguard','Aftermoon Guard','Guard',s=>`Halo grants ${(.65+.15*s).toFixed(2)} seconds of invulnerability.`],
 ['roomspool','Traveling Bobbin','Silk',s=>`Entering a main combat room grants ${Math.round(4*s)} silk. Each room pays once.`],
 ['roomfervor','Threshold Fever','Rhythm',s=>`Strike recovery is ${pct(Math.min(.4,.08*s))} faster for a room’s first 8 seconds.`],
 ['killglow','Firefly Wake','Light',s=>`After a kill, reveal dark rooms ${Math.round(35*s)} farther for 4 seconds (max +160).`],
 ['killsurge','Butcher’s Rhythm','Rhythm',s=>`Kills reduce strike cooldown by ${(.08*s).toFixed(2)} seconds.`],
 ['killguard','Last-Breath Veil','Guard',s=>`Kills grant ${Math.min(.45,.1*s).toFixed(2)} seconds of invulnerability.`],
 ['killfrost','Winter Funeral','Control',s=>`Kills chill foes within 180 by ${pct(Math.min(.45,.12*s))} for 2 seconds.`],
 ['killarc','Widow’s Inheritance','Lightning',s=>`A direct kill arcs ${(s*.9).toFixed(2)} damage to a foe within 300. No recursive arcs.`],
 ['cachepurse','Cachekeeper’s Charm','Fortune',s=>`Opening a hidden cache grants ${Math.ceil(2*s)} extra seeds.`],
 ['cachesilk','Cocoon Salvage','Silk',s=>`Opening a hidden cache grants ${Math.round(12*s)} extra silk.`],
 ['trialtea','Traveler’s Thermos','Sustain',s=>`Completing a seal trial stores ${(s*.5).toFixed(2)} healing. Whole points heal hearts.`],
 ['riddlerebate','Scholar’s Pollen','Fortune',s=>`Solving a riddle room grants ${Math.ceil(3*s)} extra seeds. Once per room.`],
 ['bargainhunter','Merchant’s Wink','Fortune',s=>`Run-shop prices are ${pct(Math.min(.4,.08*s))} lower, rounded up. Minimum 1 seed.`],
 ['hunterpurse','Captain’s Bounty','Fortune',s=>`Defeating a medium enemy, warden or boss grants ${Math.ceil(2*s)} extra seeds.`],
 ['bossweave','Royal Bobbin','Silk',s=>`Direct hits against bosses gather ${Math.round(2*s)} extra silk.`],
 ['knock','Staggering Stitch','Control',s=>`Non-boss direct hits stun for ${Math.min(.4,.08*s).toFixed(2)} seconds. 0.7 second cooldown per target.`],
 ['secondwind','Bruised Blossom','Fury',s=>`For 4 seconds after taking damage, direct hits deal +${pct(.2*s)} damage.`],
 ['scarguard','Scar Tissue','Guard',s=>`Taking damage adds ${(.06*s).toFixed(2)} seconds to invulnerability.`],
 ['thundershell','Thunder Husk','Guard',s=>`Taking damage releases ${(s*1.3).toFixed(2)} damage within 165.`],
 ['deepinterest','Root Dividend','Fortune',s=>`Every third combat clear grants ${Math.ceil(4*s)} seeds.`],
 ['patientregen','Patient Spool','Silk',s=>`After 10 seconds without damage in an uncleared encounter, regenerate ${(s*1.2).toFixed(2)} silk/sec.`],
 ['needletempo','Quickthorn Gear','Rhythm',s=>`Strike recovery is ${pct(Math.min(.35,.06*s))} faster.`],
 ['halodial','Moon Dial','Halo',s=>`Halo cooldown is ${pct(Math.min(.5,.08*s))} shorter.`]
].map(([key,name,family,describe],i)=>({id:'wild-men_'+key,key:'men_'+key,name,family,describe,icon:['✧','†','⋈','❧','◎'][i%5],pact:false,cost:20+(i%5)*3,archive:i>=50}));
const menPacts=[
 ['sunder','Sundered Spurs',s=>`Direct damage +${pct(.25*s)}. COST: dash recharge grows 15% slower per pickup.`],
 ['mute','Silent Needle',s=>`Bolt damage +${pct(.4*s)}. COST: needle damage falls 15% per pickup.`],
 ['earthbound','Earthbound Oath',s=>`Grounded direct damage +${pct(.4*s)}. COST: airborne direct damage −20%.`],
 ['skybound','Skybound Oath',s=>`Airborne direct damage +${pct(.35*s)}. COST: grounded direct damage −20%.`],
 ['sting','Hunted Heart',s=>`Direct damage +${pct(.35*s)}. COST: all enemies act 20% faster.`],
 ['debt','Debt Collector',s=>`Combat clears grant ${Math.ceil(5*s)} seeds. COST: damage loses 5 carried seeds.`],
 ['glasshalo','Glass Moon',s=>`Halo costs ${Math.round(8*s)} less silk (minimum 15). COST: lose 1 maximum heart per pickup (minimum 2).`],
 ['fatigue','Heavy Honey',s=>`Gain ${Math.ceil(s)} maximum hearts and heal that much. COST: move 8% slower per pickup.`],
 ['embers','Ember Vow',s=>`At 2 hearts or fewer, direct damage +${pct(.45*s)}. COST: lose 2 current hearts on pickup (minimum 1).`],
 ['hunger','Hollow Thread',s=>`Bolts cost ${Math.round(6*s)} less silk (minimum 8). COST: direct-hit silk gathering −25% per pickup.`]
].map(([key,name,describe])=>({id:'wild-men_'+key,key:'men_'+key,name,describe,icon:'☾',family:'PACT',pact:true}));
const menHeirlooms=[
 ['phoenix','Ashwing Reliquary','#edb48e','Once per run, survive a lethal enemy hit with 2 hearts. Falls cannot trigger it. Ash wings glow until spent.'],
 ['orbit','Sawflower Halo','#d0d895','An orbiting blade deals 1.5 damage to a nearby foe every 0.8 seconds.'],
 ['dualtail','Twintail Spindle','#b7d9ed','Bolts also fire backward at 60% damage. Twin silk tails trace your cloak.'],
 ['tideheart','Tideglass Heart','#94d9da','Needle strikes deal 50% more damage at 80+ silk. A glass reservoir fills beside your mask.'],
 ['stonewing','Stonewing Crest','#c4b296','Pogos deal 60% more damage but launch 80 slower. A stone crest crowns your mask.'],
 ['hourglass','Mothglass Hourglass','#e6c990','Enemies act 35% slower during each room’s first 5 seconds. Sand falls around your feet.'],
 ['thorncoat','Briarcoat Mantle','#d2a5ae','Taking damage retaliates for 3 damage within 170. Thorn branches unfurl from your cloak.'],
 ['healingbell','Bell of Mending','#b5dca9','Mending restores one extra heart but requires and spends 15 additional silk. A green bell follows your shoulder.'],
 ['dashwing','Windwinder Brooch','#adcce5','Finishing a dash restores one spent air jump. Silver pinwheels turn beside your boots.'],
 ['prism','Fourfold Prism','#cfb4eb','Every fourth successful direct hit deals double damage. Four crystals show the count.']
].map(([id,name,color,desc])=>({id:'men_'+id,name,color,desc,icon:'◈'}));
wildGifts.push(...menBoons.filter(d=>!d.archive),...menPacts);archiveGifts.push(...menBoons.filter(d=>d.archive));heirlooms.push(...menHeirlooms);
try{for(const id of JSON.parse(localStorage.getItem('thornwake-seed-archive-v1')||'[]'))if(archiveGifts.some(d=>d.id===id))archiveUnlocked.add(id)}catch{}
const menPower=k=>giftPower('men_'+k),menWears=k=>heirloomIs('men_'+k);
function menWindow(k){return(player.menTimes?.[k]||-999)>runTime}
function menStoreHeal(amount){if(!amount)return;player.menSap=(player.menSap||0)+amount;const n=Math.floor(player.menSap);if(n){player.menSap-=n;player.hp=Math.min(player.maxHp,player.hp+n);ripple(player.x,player.y,'#cde6a8');hud()}}
function menChill(e,s){e.menFrost=Math.max(e.menFrost||0,2);e.menFrostPower=Math.max(e.menFrostPower||0,Math.min(.45,.12*s))}
function menFrostArea(x,y,r,s){if(s)for(const e of enemies)if(e.hp>0&&Math.hypot(e.x-x,e.y-y)<r)menChill(e,s)}
function menCombat(){return !cleared&&enemies.some(e=>e.hp>0)}
function menDamageBonus(e,pogo,projectile){const p=player,air=!p.ground,distance=Math.hypot(e.x-p.x,e.y-p.y);let bonus=0;const tests=[['grounded',!air,.15],['rising',air&&p.vy<0,.18],['falling',air&&p.vy>0,.16],['wallfang',walls.some(w=>Math.abs(w.x-p.x)<100&&p.y>w.y-60&&p.y<w.y+w.h+60),.25],['clean',!roomDamaged,.14],['wealthy',runSeeds>=25,.16],['empty',p.silk<=20,.22],['close',distance<90,.13],['distant',projectile&&distance>240,.3],['fresh',e.hp>e.maxHp*.7,.16],['ashbite',e.burnTime>0,.2],['toxic',e.poisonTime>0,.18],['brittle',e.chillTime>0||e.archiveFrost>0||e.menFrost>0,.22],['opening',e.mode==='recover',.3],['dazed',e.stun>0,.25],['slip',menWindow('dash'),.25],['tender',menWindow('mend'),.2],['overture',menWindow('halo'),.22],['ribbon',combo>=4,.2],['quickstart',roomClock<12,.2],['haloneedle',!projectile&&menWindow('haloneedle'),.25],['secondwind',menWindow('hurt'),.2],['sunder',true,.25],['sting',true,.35],['embers',p.hp<=2,.45],['earthbound',!air,.4],['skybound',air,.35]];for(const [key,on,m] of tests)if(on)bonus+=menPower(key)*m;let mult=1+bonus;if(menPower('earthbound')&&air)mult*=.8;if(menPower('skybound')&&!air)mult*=.8;if(menWears('tideheart')&&!projectile&&p.silk>=80)mult*=1.5;if(menWears('stonewing')&&pogo)mult*=1.6;if(menWears('prism')&&((p.menDirectHits||0)+1)%4===0)mult*=2;return mult}
function tickMenGifts(dt){const p=player;for(const e of enemies)e.menFrost=Math.max(0,(e.menFrost||0)-dt);if(menWindow('mend'))p.silk=Math.min(100,p.silk+2*menPower('mendtide')*dt);if(menCombat()&&runTime-(p.menLastDamage||0)>=10)p.silk=Math.min(100,p.silk+1.2*menPower('patientregen')*dt);
 if(p.dash>0){menFrostArea(p.x,p.y,90,menPower('trailfrost'));if(p.menDash!==p.dashId){p.menDash=p.dashId;p.menTimes.dash=runTime+1;p.menTimes.sprint=runTime+3;if(menCombat()&&(p.menDashSilk||0)<=runTime){p.menDashSilk=runTime+2;p.silk=Math.min(100,p.silk+Math.round(3*menPower('dashrefund')))}}}
 if(p.menWasDash&&p.dash<=0){if(menPower('dashburst')&&(p.menBurstCd||0)<=runTime){p.menBurstCd=runTime+1.5;giftArea(p.x,p.y,100,.8*menPower('dashburst'),'#ebcfa5')}if(menWears('dashwing')){p.jumps=Math.max(0,p.jumps-1);ripple(p.x,p.y,'#b8d6ef')}}p.menWasDash=p.dash>0;
 if(menWears('orbit')&&(p.menOrbitCd||0)<=runTime){const e=enemies.find(e=>e.hp>0&&Math.hypot(e.x-p.x,e.y-p.y)<85);if(e){p.menOrbitCd=runTime+.8;directGiftDamage(e,1.5);ripple(e.x,e.y,'#d0d895')}}
}
function drawMenHeirloom(){const h=menHeirlooms.find(h=>heirloomIs(h.id));if(!h)return;const p=player,c=h.color,id=h.id.slice(4);ctx.save();ctx.translate(p.x,p.y);if(id==='phoenix'||id==='dualtail'||id==='thorncoat'){for(const d of [-1,1]){ctx.beginPath();ctx.moveTo(d*10,12);ctx.quadraticCurveTo(d*45,-5,d*36,-34-Math.sin(time*4)*5);ctx.strokeStyle=p.menPhoenixUsed&&id==='phoenix'?c+'33':c;ctx.lineWidth=id==='thorncoat'?3:2;ctx.stroke();for(let i=0;i<3;i++)line(d*(20+i*6),-i*10,d*(34+i*6),-i*10-8,c+'99',1)}}else if(id==='prism'){for(let i=0;i<4;i++)outlinedEllipse(-18+i*12,-44,4,6,i<(p.menDirectHits||0)%4?c:'#293844',c,1)}else if(id==='tideheart'){outlinedEllipse(28,-23,9,17,'#253d44',c,2);ellipse(28,-11-p.silk*.18,6,3+p.silk*.11,c+'99')}else if(id==='stonewing'){for(let i=-1;i<=1;i++)line(i*14,-30,i*19,-56+Math.abs(i)*9,c,4)}else if(id==='healingbell'){const x=-34,y=-29+Math.sin(time*3)*4;outlinedEllipse(x,y,10,13,'#668b70',c,2);line(x-12,y+10,x+12,y+10,c,3);ellipse(x,y+14,3,3,c)}else if(id==='hourglass'){for(let i=0;i<12;i++)ellipse(Math.sin(i*2.4)*30,((time*20+i*5)%65)-35,1.5,2,c+'99')}else{const a=time*(id==='orbit'?3:6);for(const d of [-1,1]){ctx.save();ctx.translate(id==='orbit'?Math.cos(a)*55:d*21,id==='orbit'?Math.sin(a)*44:20);ctx.rotate(a);for(let i=0;i<4;i++){ctx.rotate(Math.PI/2);line(0,0,13,3,c,2)}ctx.restore();if(id==='orbit')break}}ctx.restore()}
function installMenagerieGifts(){syncArchivePool();const equip=equipRun;equipRun=function(){equip();player.menTimes={};player.menSap=0;player.menDirectHits=0;player.menPhoenixUsed=false;player.menClears=0;player.menLastDamage=0};
 const apply=applyGift;applyGift=function(d,s,t,p=player){const before=p.gifts?.[d.key]||0;apply(d,s,t,p);const g=(p.gifts?.[d.key]||0)-before;if(!g)return;switch(d.key){case'men_sunder':p.dashCooldown*=1.15;break;case'men_mute':p.boltDamage*=1+.4*g;p.damage*=.85;break;case'men_glasshalo':p.haloCost=Math.max(15,p.haloCost-Math.round(8*g));p.maxHp=Math.max(2,p.maxHp-1);p.hp=Math.min(p.hp,p.maxHp);break;case'men_fatigue':p.maxHp+=Math.ceil(g);p.hp=Math.min(p.maxHp,p.hp+Math.ceil(g));p.speed*=.92;break;case'men_embers':p.hp=Math.max(1,p.hp-2);break;case'men_hunger':p.boltCost=Math.max(8,p.boltCost-Math.round(6*g));p.silkGain=Math.max(1,p.silkGain*.75);break}};
 const hit=hitEnemy;hitEnemy=function(e,d,pogo=false,projectile=false,noSilk=false){const direct=!giftInternal,hp=e.hp,perfect=pogo&&runTime-player.downPressedAt<.16;if(direct)d*=menDamageBonus(e,pogo,projectile);const ok=hit(e,d,pogo,projectile,noSilk);if(ok&&e.hp<hp&&direct){player.menDirectHits++;if((e.final||e.kind==='boss')&&menPower('bossweave'))player.silk=Math.min(100,player.silk+Math.round(2*menPower('bossweave')));if(!e.mini&&!e.final&&e.kind!=='boss'&&menPower('knock')&&(e.menStagger||0)<=runTime){e.menStagger=runTime+.7;e.stun=Math.max(e.stun||0,Math.min(.4,.08*menPower('knock')))}if(pogo){player.boltCd=Math.max(0,player.boltCd-.15*menPower('skybattery'));player.menTimes.springbolt=runTime+3;if(perfect){player.silk=Math.min(100,player.silk+Math.round(6*menPower('perfectthread')));menStoreHeal(.09*menPower('perfectsap'));if(menPower('skyguard'))player.inv=Math.max(player.inv,.25+.06*menPower('skyguard'));if((currentNode.menPogoSeeds||0)<3&&Math.random()<Math.min(.8,.25*menPower('perfectpurse'))){currentNode.menPogoSeeds=(currentNode.menPogoSeeds||0)+1;runSeeds++;floatText(e.x,e.y-40,'+1 SEED','#e7cc8a')}}}hud()}return ok};
 const bounce=pogoBounce;pogoBounce=function(...args){bounce(...args);if(menWears('stonewing'))player.vy+=80};
 const kill=giftKill;giftKill=function(e){kill(e);const p=player;p.menTimes.glow=runTime+4;p.attackCd=Math.max(0,p.attackCd-.08*menPower('killsurge'));p.inv=Math.max(p.inv,Math.min(.45,.1*menPower('killguard')));menFrostArea(e.x,e.y,180,menPower('killfrost'));if(!giftInternal&&menPower('killarc')){const n=enemies.find(n=>n!==e&&n.hp>0&&Math.hypot(n.x-e.x,n.y-e.y)<300);if(n){directGiftDamage(n,.9*menPower('killarc'));giftEffects.push({x:e.x,y:e.y,x2:n.x,y2:n.y,color:'#c8e9e7',life:.25,max:.25,kind:'bolt'})}}if((e.medium||e.mini||e.final||e.kind==='boss')&&menPower('hunterpurse'))runSeeds+=Math.ceil(2*menPower('hunterpurse'))};
 const shot=bolt;bolt=function(){const p=player,before=shots.length,damage=p.boltDamage;try{if(menWindow('springbolt'))p.boltDamage*=1+.3*menPower('springbolt');shot()}finally{p.boltDamage=damage}if(shots.length>before){p.menTimes.springbolt=0;if(menWears('dualtail')){const b=shots[before];shots.push({...b,vx:-b.vx,damage:b.damage*.6,hit:new Set()})}}};
 const mend=heal;heal=function(){const p=player,hp=p.hp,extra=menWears('healingbell')?15:0;if(extra&&p.silk<55+(giftPower('bloodprice')?25:0)+extra){toast('Bell of Mending needs 15 additional silk.');return}if(extra)p.silk-=extra;mend();if(p.hp<=hp){if(extra)p.silk+=extra;return}if(extra)p.hp=Math.min(p.maxHp,p.hp+1);p.menTimes.mend=runTime+5;p.dashCd=Math.max(0,p.dashCd-.4*menPower('menddash'));if(menPower('mendward')&&(p.menWardCd||0)<=runTime){p.menWardCd=runTime+Math.max(4,12-2*menPower('mendward'));p.shields=Math.min(2,p.shields+1)}hud()};
 const halo=silkHalo;silkHalo=function(){const ok=halo();if(ok){const p=player;p.menTimes.halo=runTime+3;p.menTimes.haloneedle=runTime+2;p.haloCd*=1-Math.min(.5,.08*menPower('halodial'));menStoreHeal(.2*menPower('halosap'));for(const e of enemies)if(e.hp>0&&Math.hypot(e.x-p.x,e.y-p.y)<220)e.attack+=.25*menPower('halosilence');if(menPower('haloafterguard'))p.inv=Math.max(p.inv,.65+.15*menPower('haloafterguard'))}return ok};
 const damage=hurt;hurt=function(amount=1,x=player.x){const p=player,fall=p.y>785||p.y>cameraY+H+140;if(menWears('phoenix')&&!p.menPhoenixUsed&&state==='playing'&&p.inv<=0&&p.dash<=0&&!fall&&p.shields<=0&&p.hp<=amount+(p.rootOaths?.includes('fleet')?1:0)){p.menPhoenixUsed=true;p.hp=Math.min(p.maxHp,2);p.inv=2;roomDamaged=true;if(roomTrial())roomTrial().damage=true;resetCombo();burst(p.x,p.y,'#ffb485',45,280);ripple(p.x,p.y,'#fff0c9');tone(420,.6);toast('Ashwing Reliquary breaks · one more chance.');hud();return}const hp=p.hp;damage(amount,x);if(p.hp<hp){p.menLastDamage=runTime;p.menTimes.hurt=runTime+4;p.inv+=.06*menPower('scarguard');if(menPower('debt'))runSeeds=Math.max(0,runSeeds-5);if(state==='playing'){const n=1.3*menPower('thundershell')+(menWears('thorncoat')?3:0);if(n)giftArea(p.x,p.y,170,n,'#d7b0bc')}hud()}};
 const chill=enemyChill;enemyChill=function(e){return chill(e)*(e.menFrost>0?1-(e.menFrostPower||0):1)*(menWears('hourglass')&&roomClock<5?.65:1)*(menPower('sting')?1.2:1)};
 const make=makeRoom;makeRoom=function(n=currentNode){make(n);player.menLastDamage=runTime;if(!n.menEntryPaid&&['combat','elite','boss'].includes(n.type)){n.menEntryPaid=true;player.silk=Math.min(100,player.silk+Math.round(4*menPower('roomspool')))}if(n.type==='shop')for(const item of shopItems)item.cost=Math.max(1,Math.ceil(item.cost*(1-Math.min(.4,.08*menPower('bargainhunter')))))};
 const clear=payGiftClear;payGiftClear=function(){const paid=giftClearPaid;clear();if(!paid&&giftClearPaid){player.menClears++;if(player.menClears%3===0&&menPower('deepinterest'))runSeeds+=Math.ceil(4*menPower('deepinterest'));if(menPower('debt'))runSeeds+=Math.ceil(5*menPower('debt'));hud()}};
 const exit=exitRoom;exitRoom=function(){if(currentNode.type==='trap'&&!routeReady&&trialSeals.every(s=>s.collected)&&!currentNode.menTrialPaid){currentNode.menTrialPaid=true;menStoreHeal(.5*menPower('trialtea'))}exit()};
 const tick=update;update=function(dt){const p=player,speed=p.speed,reach=p.reach,tempo=p.attackCooldown;try{if(menWindow('sprint'))p.speed*=1+Math.min(.4,.08*menPower('sprint'));if(menWindow('mend'))p.reach+=20*menPower('mendreach');p.attackCooldown*=1-Math.min(.35,.06*menPower('needletempo'));if(roomClock<8)p.attackCooldown*=1-Math.min(.4,.08*menPower('roomfervor'));tick(dt);if(state==='playing')tickMenGifts(dt)}finally{p.speed=speed;p.reach=reach;p.attackCooldown=tempo}};
 const art=drawHeirloom;drawHeirloom=function(){art();drawMenHeirloom()};
 const dark=drawDarkness;drawDarkness=function(){const old=player?.gifts?.lamp;if(player&&menWindow('glow'))player.gifts.lamp=(old||0)+Math.min(4,menPower('killglow')*.875);try{dark()}finally{if(player)player.gifts.lamp=old||0}};
 const synergies=activeSynergies;activeSynergies=function(){const a=synergies();if(menPower('springbolt')&&menPower('skybattery'))a.push('SKY CANNON · pogos charge and ready your next bolt');if(menPower('mendward')&&menPower('tender'))a.push('THORN SUTURE · mending protects you and strengthens attacks');if(menPower('trailfrost')&&menPower('brittle'))a.push('FROZEN WAKE · dash through foes, then break their chilled shells');if(menPower('empty')&&menPower('glasshalo'))a.push('HOLLOW MOON · spend silk, then strike harder');return a};
}
