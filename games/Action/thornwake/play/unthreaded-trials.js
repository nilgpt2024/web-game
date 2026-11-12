'use strict';
const wovenTrials=[
 {id:'bloomsea',name:'The Petal Sea',theme:'fungus',hint:'No stepping stones. Hold ↓ to pogo from flower to flower; steer and dash between blooms.'},
 {id:'bloomspire',name:'The Hanging Orchard',theme:'root',hint:'Climb on flowers alone. Gold-ringed blooms remember your checkpoint. The gate waits near the center.'},
 {id:'shale',name:'The Shattering Pilgrimage',theme:'amber',hint:'Follow the amber ledges around the loop. They crumble in half a second. Return to the left-hand gate.'},
 {id:'descent',name:'The Sinking Gallery',theme:'silk',hint:'Begin high above the roots. Drop with S, collect all three seals, then descend to the central gate.'},
 {id:'reverse',name:'The Homeward Stair',theme:'trial',hint:'Climb from right to left. Wall-jump, pogo and cross fading silk to reach the far-left crown.'},
 {id:'shaft',name:'The Counterweight Belfry',theme:'trial',hint:'Alternate between walls, lifts and small ledges. Follow the lanterns to the gate above the shaft.'}
];
lastBrood.unthreaded={name:'The Unthreaded',kind:'unthreaded',theme:'silk',music:'unthreaded',desc:'Your shadow learned the needle. Read its tell, evade, then punish its recovery.'};
chamberScores.unthreaded={bpm:132,root:38,scale:[0,1,3,5,7,8,11,12,15],phrase:[0,7,3,null,8,7,1,11,5,null,3,0],bass:[0,5,3,0],drums:[0,2,3,5],beats:6,type:'triangle'};
function sideGateX(offset){return roomExit.x<450?roomExit.x+offset:roomExit.x-offset}
function trialFlower(x,y,i,checkpoint=false){return{x,y,id:'wovenflower'+i,cd:0,lit:0,flower:true,checkpoint}}
function buildWovenTrial(){if(currentNode.type!=='trap')return;const spec=wovenTrials.find(t=>t.id===currentNode.trialKind)||wovenTrials[0];currentNode.trialKind=spec.id;currentNode.title=spec.name;currentNode.theme=spec.theme;currentNode.trialHint=spec.hint;walls=[];pods=[];hazards=[];platforms=[];trialSeals=[];let path=[];let spawn={x:130,y:623};
 const ledge=(x,y,w=105,kind='stone',extra={})=>{const f=Object.assign(chamberLedge(x,y,w,kind,extra),extra);platforms.push(f);return f};
 const seals=points=>{trialSeals=points.map(([x,y],i)=>({x,y,id:i,collected:false}))};
 if(spec.id==='bloomsea'){
  ledge(0,650,260);ledge(1640,650,560);roomExit={x:2095,y:650};
  path=[[365,555],[555,505],[750,550],[945,465],[1140,510],[1335,445],[1520,505],[1690,545]];
  pods=path.map(([x,y],i)=>trialFlower(x,y,i,i===3));seals([path[1],path[3],path[6]].map(([x,y])=>[x,y-52]));currentNode.climbTop=0;
 }else if(spec.id==='bloomspire'){
  ledge(0,650,270);path=[[365,540],[550,450],[360,360],[550,270],[745,180],[550,90],[745,0],[940,-90],[745,-180],[940,-270],[1130,-360],[940,-450],[1110,-540]];
  pods=path.map(([x,y],i)=>trialFlower(x,y,i,i===4||i===8));ledge(780,-650,650);roomExit={x:1190,y:-650};seals([path[3],path[7],path[11]].map(([x,y])=>[x,y-52]));currentNode.climbTop=-1030;
 }else if(spec.id==='shale'){
  ledge(0,650,270);path=[[350,540],[560,440],[770,340],[980,240],[1190,140],[1400,40],[1610,-60],[1820,-160],[1610,-260],[1400,-360],[1190,-460],[980,-560],[770,-560],[560,-560]];
  path.forEach(([x,y],i)=>ledge(x,y,i===4||i===9?155:90,i===4||i===9?'stone':'crumble',{checkpoint:i===4||i===9,crumbleAfter:.52,returnAfter:2.7}));ledge(0,-560,560);roomExit={x:135,y:-560};seals([path[3],path[7],path[11]].map(([x,y])=>[x+45,y-50]));currentNode.climbTop=-940;
 }else if(spec.id==='descent'){
  ledge(0,-650,270);spawn={x:130,y:-677};path=[[340,-535],[550,-420],[765,-300],[980,-180],[1195,-60],[1410,60],[1625,180],[1840,300],[1625,420],[1410,525]];
  path.forEach(([x,y],i)=>ledge(x,y,i===3||i===7?175:110,i===3||i===7?'stone':i%2?'crumble':'phase',{checkpoint:i===3||i===7,crumbleAfter:.6,phaseOffset:0}));ledge(740,650,720);roomExit={x:1180,y:650};seals([path[2],path[5],path[8]].map(([x,y])=>[x+55,y-44]));currentNode.climbTop=-1030;
 }else if(spec.id==='reverse'){
  // The established mixed climb, mirrored in both geometry and starting position.
  ledge(1930,650,270);spawn={x:2070,y:623};path=[[1760,535],[1550,425],[1740,315],[1530,205],[1320,95],[1510,-15],[1300,-125],[1090,-235],[880,-345],[1070,-455],[860,-565],[650,-675],[440,-785]];
  path.forEach(([x,y],i)=>{ledge(x,y,i===4||i===9?165:105,i===4||i===9?'stone':i%4===1?'crumble':i%4===2?'phase':'stone',{checkpoint:i===4||i===9});if([2,6,10].includes(i))walls.push({x:x+120,y:y-140,w:28,h:220})});for(const w of walls)ledge(w.x,w.y,w.w);pods=[trialFlower(1470,365,0),trialFlower(1040,-120,1)];ledge(0,-880,560);roomExit={x:135,y:-880};seals([path[3],path[8],path[11]].map(([x,y])=>[x+52,y-48]));currentNode.climbTop=-1260;
 }else{
  ledge(0,650,340);path=[[360,535],[580,425],[800,315],[600,205],[810,95],[1015,-15],[805,-125],[1015,-235],[1225,-345],[1020,-455],[1225,-565],[1030,-675]];
  path.forEach(([x,y],i)=>{const checkpoint=i===4||i===8;ledge(x,y,checkpoint?165:100,checkpoint?'stone':i%3===1?'lift':i%3===2?'crumble':'stone',{checkpoint,rangeY:22});if([2,5,9].includes(i))walls.push({x:x+125,y:y-150,w:30,h:245})});for(const w of walls)ledge(w.x,w.y,w.w);ledge(740,-790,690);roomExit={x:1190,y:-790};seals([path[2],path[6],path[10]].map(([x,y])=>[x+50,y-50]));currentNode.climbTop=-1170;
 }
 // Saw placements belong to each route; pure flower rooms keep their landing blooms clear.
 if(!spec.id.startsWith('bloom'))for(const i of [2,6]){const [x,y]=path[i];hazards.push({kind:'saw',x:x+155,baseX:x+155,y:y+65,r:17,range:28,phase:i})}
 currentNode.trialPath=path.map(([x,y])=>({x,y}));platforms.sort((a,b)=>a.y-b.y);player.x=spawn.x;player.y=spawn.y;player.vx=player.vy=0;player.ground=true;player.checkpoint={...spawn};camera=Math.max(0,Math.min(ROOM_WIDTH-W,spawn.x-W*.4));cameraY=Math.min(0,spawn.y-H*.52);syncChamberMusic();$('roomname').textContent=spec.name;
}
function royalTell(e,move){e.move=move;e.targetX=Math.max(150,Math.min(2050,player.x));e.targetY=player.y;e.direction=Math.sign(player.x-e.x)||1;wardenMode(e,move==='ambush'?'burrow':'royalTell');if(move==='eruption'){for(const d of [-180,0,180])addArea(Math.max(100,Math.min(2100,e.targetX+d)),625,68,1.05,'blast')}if(move==='quake')addArea(e.x,620,160,1.05,'blast');if(move==='ambush')addArea(e.targetX,625,92,1.15,'blast')}
function tickRenewedRoyal(e,dt){if(!['boss','devourer'].includes(e.kind))return false;if(veilActive()){e.attack+=dt;return true}if(!e.active){if(Math.abs(player.x-e.x)>850)return true;e.active=true}e.clock+=dt;const fast=e.hp<e.maxHp*.5;rootScore.setThreat(fast?1:.45);
 if(e.mode==='idle'){e.y=e.kind==='boss'?590:594;e.x+=(Math.sign(player.x-e.x)||1)*30*dt;if(e.attack<=0){const moves=e.kind==='boss'?['rush','eruption','volley']:['rush','ambush','quake'];royalTell(e,moves[(e.cycle||0)%moves.length]);e.cycle=(e.cycle||0)+1}}
 else if((e.mode==='royalTell'||e.mode==='burrow')&&e.clock>1.05){if(e.move==='rush')wardenMode(e,'royalRush');else{if(e.move==='volley'){for(let i=0;i<(fast?11:8);i++){const a=Math.PI+i*Math.PI/(fast?10:7);enemyOrb(e.x,e.y,Math.cos(a)*250,Math.sin(a)*250,{gravity:100})}}if(e.move==='ambush'){e.x=e.targetX;burst(e.x,e.y,'#e1b58d',24,200)}if(e.move==='quake'||e.move==='ambush')for(const d of [-1,1])enemyOrb(e.x,625,d*(fast?370:300),0,{wave:true});wardenMode(e,'recover')}}
 else if(e.mode==='royalRush'){e.x+=e.direction*(fast?660:520)*dt;if(e.clock>.72||e.x<130||e.x>2070){for(const d of [-1,1])enemyOrb(e.x,625,d*280,0,{wave:true});wardenMode(e,'recover')}}
 else if(e.mode==='recover'&&e.clock>(fast?1.05:1.4)){e.attack=.55;wardenMode(e,'idle')}
 e.x=Math.max(110,Math.min(2090,e.x));return true;
}
function tickUnthreaded(e,dt){if(e.kind!=='unthreaded')return false;if(veilActive()){e.attack+=dt;return true}if(!e.active){if(Math.abs(player.x-e.x)>850)return true;e.active=true;toast('The Unthreaded · Your shadow remembers every weapon. Watch its gold tell.')}e.clock+=dt;e.trails??=[];for(const t of e.trails)t.life-=dt;e.trails=e.trails.filter(t=>t.life>0);const fast=e.hp<e.maxHp*.5;rootScore.setThreat(fast?1:.45);
 if(e.mode==='idle'){e.y+=(623-e.y)*Math.min(1,dt*8);if(e.attack<=0){e.move=['needle','pogo','spool','halo'][e.cycle%4];e.cycle++;e.direction=Math.sign(player.x-e.x)||1;e.targetX=Math.max(160,Math.min(2040,player.x));e.targetY=Math.max(180,Math.min(620,player.y));wardenMode(e,'shadowTell')}}
 else if(e.mode==='shadowTell'){if(e.move==='pogo')e.y+=(Math.max(150,e.targetY-225)-e.y)*Math.min(1,dt*4);if(e.clock>.9){if(e.move==='needle')wardenMode(e,'shadowDash');else if(e.move==='pogo'){e.x=e.targetX;wardenMode(e,'shadowPogo')}else if(e.move==='spool'){for(const angle of (fast?[-.3,-.15,0,.15,.3]:[-.2,0,.2]))aimedBrood(e,fast?360:300,angle,{glass:true});wardenMode(e,'recover')}else{addArea(e.x,e.y,155,.32,'blast');wardenMode(e,'recover')}}}
 else if(e.mode==='shadowDash'){e.trails.push({x:e.x,y:e.y,life:.18});e.x+=e.direction*(fast?830:700)*dt;if(e.clock>.45||e.x<130||e.x>2070)wardenMode(e,'recover')}
 else if(e.mode==='shadowPogo'){e.y+=850*dt;if(e.y>=623){e.y=623;for(const d of [-1,1])enemyOrb(e.x,625,d*300,0,{wave:true});burst(e.x,e.y,'#d3a0c9',24,170);wardenMode(e,'recover')}}
 else if(e.mode==='recover'){e.y+=(623-e.y)*Math.min(1,dt*5);if(e.clock>(fast?1.05:1.35)){e.attack=.5;wardenMode(e,'idle')}}e.x=Math.max(120,Math.min(2080,e.x));return true;
}
function drawRoyalTells(e){if(!['boss','devourer','unthreaded'].includes(e.kind)||!['royalTell','burrow','shadowTell'].includes(e.mode))return;ctx.save();const col=e.kind==='unthreaded'?'#e4a8d3':'#efc28d';ctx.strokeStyle=col;ctx.setLineDash([8,7]);if(['rush','needle'].includes(e.move)){line(e.x,e.y,e.x+e.direction*480,e.y,col,2);for(let i=1;i<=4;i++){const x=e.x+e.direction*i*105;line(x-e.direction*12,e.y-8,x,e.y,col,2);line(x,e.y,x-e.direction*12,e.y+8,col,2)}}if(e.move==='pogo')line(e.targetX,120,e.targetX,650,col,3);if(e.move==='halo'){ctx.beginPath();ctx.arc(e.x,e.y,155,0,Math.PI*2);ctx.stroke()}glow(e.x,e.y,80,col,.12);worldLabel(e.x,e.y-e.h-35,({rush:'CROWN CHARGE',eruption:'ROOT ERUPTION',volley:'THORN FAN',ambush:'BURROW · MOVE',quake:'EARTHBREAK',needle:'SHADOW DASH',pogo:'FALLING NEEDLE',spool:'SILK VOLLEY',halo:'DARK HALO'})[e.move]);ctx.restore()}
function drawUnthreaded(e){if(e.kind!=='unthreaded')return false;const face=e.direction||Math.sign(player.x-e.x)||1;ctx.save();for(const t of e.trails||[]){ctx.globalAlpha=t.life/.18*.24;drawMoth(t.x,t.y,face,time*5,1.3,{cosmetic:{cloth:'#342139',trim:'#75466f',aura:'#cfa0e0'},ground:true})}ctx.globalAlpha=1;drawMoth(e.x,e.y,face,time*6,1.3,{cosmetic:{cloth:e.hit>0?'#eee0d9':'#251c31',trim:'#74445f',aura:'#d488c7'},ground:e.mode!=='shadowPogo',dash:e.mode==='shadowDash'?1:0,attack:e.mode==='shadowDash'?.12:0,weapon:'lance'});outlinedEllipse(e.x,e.y-24,13,16,'#35303f','#dcc7de',2);ellipse(e.x-5,e.y-25,2.5,5,'#ffb1d9');ellipse(e.x+5,e.y-25,2.5,5,'#ffb1d9');line(e.x-7,e.y-39,e.x+3,e.y-14,'#e8a6c8',1);if(e.mode==='recover')worldLabel(e.x,e.y-75,'EXPOSED');ctx.restore();return true}
function installUnthreadedTrials(){
 const init=initCampaign;initCampaign=function(){init();let bag=[];for(const n of routeGraph.flat())if(n.type==='trap'){if(!bag.length)bag=[...wovenTrials].sort(()=>Math.random()-.5);const t=bag.pop();n.trialKind=t.id;n.title=t.name;n.theme=t.theme;n.music=deepThemes[t.theme].motif}};
 const geometry=designChamberGeometry;designChamberGeometry=function(){if(currentNode.type==='trap')buildWovenTrial();else geometry()};
 const make=makeRoom;makeRoom=function(n=currentNode){make(n);if(n.type==='trap'){toast(n.trialHint);$('roomname').textContent=n.title}if(n.type==='boss'&&n.finalBoss==='unthreaded'){const hp=155*(1+runDifficulty*.18);enemies=[{...makeEnemy('boss',1540),kind:'unthreaded',name:lastBrood.unthreaded.name,hp,maxHp:hp,final:true,air:true,w:25,h:31,y:623,attack:1.4,clock:0,cycle:0,trails:[]}];rootScore.setRoom('unthreaded');$('roommusic').textContent='♫ A Needle Without a Home';hud()}};
 const tick=tickBrood;tickBrood=function(e,dt){return tickUnthreaded(e,dt)||tickRenewedRoyal(e,dt)||tick(e,dt)};
 const art=drawBrood;drawBrood=function(e){drawRoyalTells(e);return drawUnthreaded(e)||art(e)};
 const bounce=pogoBounce;pogoBounce=function(target,...args){bounce(target,...args);if(target.flower&&target.checkpoint){player.checkpoint={x:target.x,y:target.y-155};target.lit=.8;floatText(target.x,target.y-80,'BLOOM REMEMBERS','#dce5a7')}};
 const traversal=drawTraversal;drawTraversal=function(){traversal();for(const p of pods)if(p.flower){ctx.save();ctx.translate(p.x,p.y);for(let i=0;i<6;i++){ctx.save();ctx.rotate(i*Math.PI/3+Math.sin(time)*.04);outlinedEllipse(0,-13,8,17,p.checkpoint?'#c6b576':'#8db5a4','#263e39',1.5);ctx.restore()}outlinedEllipse(0,0,11,9,p.lit?'#fff1bc':'#dcebd0','#5c8c76',2);if(p.checkpoint){ctx.strokeStyle='#e9d39a';ctx.beginPath();ctx.ellipse(0,0,30,23,0,0,Math.PI*2);ctx.stroke()}ctx.restore()}};
 const campaignTick=tickTraversal;tickTraversal=function(dt){campaignTick(dt);if(currentNode.type==='trap'){const dx=roomExit.x-player.x,dy=roomExit.y-27-player.y;const direction=Math.abs(dy)>150?(dy<0?'↑':'↓'):dx<0?'←':'→';$('objective').textContent='SEALS '+trialSeals.filter(s=>s.collected).length+'/3 · '+(trialSeals.every(s=>s.collected)?'GATE '+direction:currentNode.trialHint)}};
 const dark=drawDarkness;drawDarkness=function(){dark();if(currentNode.type!=='trap')return;const sx=roomExit.x-camera,sy=roomExit.y-110-cameraY;if(sx>50&&sx<W-50&&sy>60&&sy<H-60)return;const x=Math.max(46,Math.min(W-46,sx)),y=Math.max(100,Math.min(H-90,sy));ctx.save();ctx.translate(x,y);ctx.rotate(Math.atan2(sy-H/2,sx-W/2));ctx.beginPath();ctx.moveTo(11,0);ctx.lineTo(-5,-7);ctx.lineTo(-5,7);ctx.closePath();finishInk('#e5d3a2','#162622',2);ctx.restore();worldLabel(x,y+24,'GATE')};
}


