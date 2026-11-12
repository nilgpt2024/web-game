'use strict';
// Rootbound: solid bark walls, vertical trials, encounter direction and the hidden choir.
let walls=[],cameraY=0,roomExit={x:2095,y:650},impactMarks=[],areaBursts=[];
let paradiseDepth=0,paradiseUsed=false,paradiseReturn=null,paradiseGate=false;
Object.assign(wildBrood,{mortar:{name:'Moss Mortar',hp:5,color:'#b6cd87'},cicada:{name:'Thunder Cicada',hp:5,color:'#e6bc84'}});
chamberScores.paradise={bpm:66,root:43,scale:[0,2,4,5,7,9,11],phrase:[7,null,9,11,null,10,9,null,8,7,null,4],bass:[0,3,5,0],drums:[],type:'sine',beats:6};
function rootRandom(seed){let n=seed>>>0;return()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296}}
function setupRootbound(){
 walls=[];cameraY=0;roomExit={x:2095,y:650};impactMarks=[];areaBursts=[];player.wall=0;player.wallLock=0;player.recoil=0;
 paradiseGate=!paradiseUsed&&room===paradiseDepth&&currentNode.type!=='boss';
 if(currentNode.type==='trap'){verticalTrial();toast('Climb the bark walls: hold A/D to cling, W to wall jump. Collect three seals above.');}
 if(currentNode.type==='combat'){
  const rng=rootRandom(currentNode.encounterSeed||(currentNode.encounterSeed=Math.floor(Math.random()*2147483647)));
  const variant=Math.floor(rng()*5);currentNode.habitat=variant;
  if(room>1){
   const f=(x,y,w,extra={})=>({x,y,w,h:y===650?100:28,...extra});
   const layouts=[
    [[0,650,700],[920,650,1280],[300,535,150],[555,420,150],[785,500,135],[1090,350,210],[1430,475,160],[1740,360,180]],
    [[0,650,2200],[320,530,210],[610,415,170],[910,300,160],[1220,415,180],[1530,530,160],[1810,410,180]],
    [[0,650,480],[680,650,550],[1450,650,750],[360,520,175],[640,385,160],[940,500,180],[1225,460,175],[1530,340,180],[1820,505,180]],
    [[0,650,2200],[290,525,220],[640,395,200],[940,530,190],[1210,410,210],[1550,280,195],[1830,460,170]],
    [[0,650,610],[820,650,780],[1800,650,400],[280,510,220],[570,365,180],[825,480,170],[1140,330,230],[1490,470,160],[1730,540,170]]
   ];
   platforms=layouts[variant].map((v,i)=>f(...v,i>3&&i%4===0?{moving:true,baseX:v[0],baseY:v[1],range:25}:{}));
   // Low root buttresses introduce climbable cover without sealing corridors.
   if(variant===1||variant===3){walls=[{x:840,y:520,w:54,h:130},{x:1420,y:515,w:65,h:135}];for(const w of walls)platforms.push(f(w.x,w.y,w.w))}
   hazards=[];pods=platforms.filter(f=>f.y<540).filter((_,i)=>i%2===0).map((f,i)=>({x:f.x+f.w+58,y:f.y+40,id:'rootpod'+i,cd:0,lit:0}));
   const all=['crawler','flyer','spitter','bulwark','wasp','bellspore',...Object.keys(wildBrood)],used={},count=Math.min(8,3+Math.floor(room/3));enemies=[];
   for(let i=0;i<count;i++){
    let choices=all.filter(k=>(used[k]||0)<2);if(i===0)choices=['bulwark','cricket','pillbug'];
    const kind=choices[Math.floor(rng()*choices.length)];used[kind]=(used[kind]||0)+1;
    const available=platforms.filter(f=>!f.moving&&f.w>125&&f.x+f.w>550&&(kind==='bellspore'||kind==='mortar'||kind==='spinner'?true:f.y===650));
    const target=530+i*155+rng()*90,ledge=available.reduce((a,b)=>Math.abs(b.x+b.w/2-target)<Math.abs(a.x+a.w/2-target)?b:a);
    let x=Math.max(ledge.x+40,Math.min(ledge.x+ledge.w-40,target));
    for(const old of enemies)if(Math.abs(old.x-x)<90&&old.floorY===ledge.y)x=Math.min(ledge.x+ledge.w-40,x+100);
    for(const w of walls)if(x>w.x-45&&x<w.x+w.w+45)x=w.x+w.w+50;
    x=Math.max(ledge.x+32,Math.min(ledge.x+ledge.w-32,x));const base=makeEnemy(wildBrood[kind]?'crawler':kind,x,ledge.y),def=wildBrood[kind];
    const hp=((def?.hp||base.hp)+Math.floor(room/5))*(1+(room-1)*.025+runDifficulty*.18);
    const air=def?.air||['flyer','wasp'].includes(kind);
    enemies.push({...base,kind,hp,maxHp:hp,air:!!air,y:air?ledge.y-170:ledge.y-base.h,originY:ledge.y-170,minX:ledge.x+32,maxX:ledge.x+ledge.w-32,attack:1+rng()*2.5});
   }
  }
 }
 platforms.sort((a,b)=>a.y-b.y);
}
function verticalTrial(){
 const variant=currentNode.layout%3,offset=[0,65,-45][variant],f=(x,y,w,extra={})=>({x,y,w,h:30,...extra});
 platforms=[f(0,650,350),f(1950,-880,250)];walls=[];pods=[];hazards=[];
 // Each rise is 110 units: use double jumps, bark grips and pods to maintain the ascent.
 const points=[[280,540],[465,430],[300,320],[505,210],[720,100],[530,-10],[745,-120],[970,-230],[1150,-340],[960,-450],[1185,-560],[1390,-670],[1610,-780],[1830,-880]];
 points.forEach(([x,y],i)=>{x+=i>0&&i<13?offset:0;const checkpoint=i===4||i===9,w=checkpoint?175:i===13?150:110;
  platforms.push(f(x,y,w,checkpoint?{checkpoint:true}:i===6||i===11?{moving:true,baseX:x,baseY:y,range:42,rangeY:0}:i===2||i===8||i===12?{crumble:true,crack:0,gone:0}:{}));
  if([1,5,8,11].includes(i)){const side=i%2?-1:1,wx=side<0?x-38:x+w+5;walls.push({x:wx,y:y-155,w:33,h:245});platforms.push(f(wx,y-155,33))}
  if([3,7,10].includes(i))pods.push({x:x+155,y:y+65,id:'climbpod'+i,cd:0,lit:0});
  if([3,7,12].includes(i))hazards.push({kind:'saw',x:x+140,baseX:x+140,y:y+38,r:19,range:45,phase:i});
 });
 trialSeals=[3,8,12].map((n,i)=>({x:points[n][0]+offset+55,y:points[n][1]-48,id:i,collected:false}));
 roomExit={x:2095,y:-880};currentNode.climbTop=-1120;
}
function wallJump(){const p=player;if(!p.wall||p.ground||p.wallLock>0)return false;p.vx=-p.wall*340;p.face=-p.wall;p.vy=-540;p.wall=0;p.wallLock=.19;p.jumps=1;p.ground=false;p.coyote=0;p.jumpBuffer=0;p.pogoBoost=.2;burst(p.x,p.y+10,'#cfbf94',9,130);tone(360,.12,'triangle',.025);return true}
function resolveWalls(oldX,oldY,dt,dir){const p=player;p.wall=0;
 for(const w of walls){if(p.y+25<=w.y||p.y-24>=w.y+w.h)continue;
  if(oldX+13<=w.x+.1&&p.x+13>=w.x){p.x=w.x-13;p.vx=0;p.wall=1;p.dash=0}
  else if(oldX-13>=w.x+w.w-.1&&p.x-13<=w.x+w.w){p.x=w.x+w.w+13;p.vx=0;p.wall=-1;p.dash=0}
  else if(p.x+12>w.x&&p.x-12<w.x+w.w&&oldY-24>=w.y+w.h){p.y=w.y+w.h+24;p.vy=Math.max(0,p.vy)}
  if(Math.abs(p.x+13-w.x)<2)p.wall=1;else if(Math.abs(p.x-13-w.x-w.w)<2)p.wall=-1;
 }
 if(p.wall&&!p.ground&&dir===p.wall&&p.wallLock<=0&&p.vy>=0&&!keys.has('KeyS')){p.vy=Math.min(p.vy,62);p.jumps=Math.min(p.jumps,1);if(Math.random()<dt*18)burst(p.x+p.wall*12,p.y+15,'#baa98177',1,30)}
}
function addArea(x,y,r=100,delay=.85,kind='spore'){areaBursts.push({x,y,r,wait:delay,initial:delay,life:kind==='spore'?1.2:.4,kind,active:false})}
function tickRootbound(dt){
 const p=player;p.recoil=Math.max(0,(p.recoil||0)-dt);p.wallLock=Math.max(0,(p.wallLock||0)-dt);
 cameraY+=(Math.min(0,Math.max(currentNode.climbTop||0,p.y-H*.52))-cameraY)*Math.min(1,dt*7);
 if(currentNode.type==='trap'&&p.y>cameraY+H+150){hurt(1);p.x=p.checkpoint.x;p.y=p.checkpoint.y;p.vx=p.vy=0;cameraY=Math.min(0,p.y-H*.52)}
 for(const f of impactMarks)f.life-=dt;impactMarks=impactMarks.filter(f=>f.life>0);
 for(const z of areaBursts){z.wait-=dt;if(z.wait<=0){if(!z.active){z.active=true;burst(z.x,z.y,z.kind==='spore'?'#cede91':'#edbd83',20,190);impactSound('blast')}z.life-=dt;if(Math.hypot((p.x-z.x),(p.y-z.y)*1.2)<z.r+12)hurt(ironBossDamage(),z.x)}}areaBursts=areaBursts.filter(z=>!z.active||z.life>0);
 if(currentNode.type==='paradise')$('objective').textContent='BUG PARADISE · Rest beneath the choir · leave through the right-hand gate';
 else if(paradiseGate&&cleared)$('objective').textContent='A golden root has opened · F at the little shrine, or take the usual gate →';
}
function impactSound(kind){if(typeof giftInternal!=='undefined'&&giftInternal)return;const s=rootScore;if(!s.enabled||!s.ctx)return;const t=s.ctx.currentTime;
 if(kind==='player'){s.rustle(t,.18,.12,720);s.effect(72,.24,'triangle',.09);s.effect(146,.12,'sawtooth',.035)}
 else if(kind==='death'){s.rustle(t,.25,.09,1450);s.effect(125,.22,'triangle',.065);s.effect(640,.16,'sine',.025)}
 else if(kind==='blast'){s.rustle(t,.3,.12,550);s.effect(62,.3,'sine',.09)}
 else{s.rustle(t,.07,.07,2400);s.effect(210+Math.random()*100,.075,'triangle',.055);s.effect(1100,.035,'sine',.018)}
}
function drawRootStone(){const theme=chamberTheme();
 for(const w of walls){ctx.fillStyle='#17252a';ctx.fillRect(w.x+8,w.y+5,w.w,w.h);ctx.fillStyle='#615f4e';ctx.fillRect(w.x,w.y,w.w,w.h);line(w.x+2,w.y,w.x+2,w.y+w.h,'#c3b38a',3);for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(w.x+7+i*7,w.y);ctx.bezierCurveTo(w.x+i*8-6,w.y+w.h*.4,w.x+i*8+15,w.y+w.h*.7,w.x+i*8+4,w.y+w.h);ctx.strokeStyle='#302f29';ctx.lineWidth=2;ctx.stroke()}for(let y=w.y+20;y<w.y+w.h;y+=35)line(w.x+5,y,w.x+w.w-3,y+7,'#aa9a73',2)}
 for(const f of platforms){if(f.skin||f.gone>0||f.x>camera+W+80||f.x+f.w<camera||f.y<cameraY-100||f.y>cameraY+800)continue;
  ctx.fillStyle='#050f1755';ctx.fillRect(f.x+9,f.y+f.h,f.w,10);line(f.x,f.y+3,f.x+f.w,f.y+3,'#cfbf9977',2);line(f.x+f.w,f.y+3,f.x+f.w,f.y+f.h,'#101c22',4);
  for(let x=f.x+14;x<f.x+f.w-9;x+=37){line(x,f.y+9,x+13,f.y+12,'#c6b58b44',1);line(x+4,f.y+13,x+1,f.y+22,'#07171966',1);ellipse(x+17,f.y+8,1.5,1.5,'#e2d0a35a')}
  if(f.y!==650&&!f.crumble){line(f.x+12,f.y+f.h,f.x+27,f.y+f.h+15,'#615642',4);line(f.x+f.w-12,f.y+f.h,f.x+f.w-27,f.y+f.h+15,'#615642',4)}
 }
 // Taller chambers retain architecture at every altitude, with parallax behind it.
 if(currentNode.type==='trap'){for(let i=0;i<9;i++){const x=130+i*257;ctx.save();ctx.globalAlpha=.22;line(x,-1200,x+45,650,theme.edge,11);for(let y=-1050;y<600;y+=180){line(x+20,y,x+95,y-75,theme.edge,3);ellipse(x+83,y-65,23,9,theme.edge)}ctx.restore()}}
}
function drawHitMarks(){for(const m of impactMarks){const t=1-m.life/m.max;ctx.save();ctx.translate(m.x,m.y);ctx.globalAlpha=1-t;ctx.rotate(m.angle);if(m.death){for(let i=0;i<6;i++){ctx.save();ctx.rotate(i*Math.PI/3+t);outlinedEllipse(20+t*60,-t*25,7*(1-t)+2,12*(1-t)+2,m.color,'#192c30',2);ctx.restore()}}else{ctx.scale(1+t*.6,1-t*.4);line(-34,0,34,0,m.color,4*(1-t)+1);line(0,-24,0,24,m.color,2);line(-16,-16,16,16,'#fff7dc',2)}ctx.restore()}}
function drawSilkBloom(){if(loomBurst<=0)return;const t=loomTimer/.8,spread=Math.min(1,t*5),r=154*spread,fade=Math.min(1,loomBurst*6);ctx.save();ctx.translate(player.x,player.y);ctx.globalAlpha=fade;glow(0,0,200,'#adcce3',.2*fade);
 for(let k=0;k<3;k++){ctx.save();ctx.rotate(loomTimer*(k%2?-4:4)+k*.4);ctx.beginPath();for(let i=0;i<=180;i++){const a=i*Math.PI/90,petal=r*(.78+.2*Math.cos(a*6+loomTimer*5+k)),x=Math.cos(a)*petal,y=Math.sin(a)*petal;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.strokeStyle=['#fff2d5','#a4dfe1','#c4b5e7'][k];ctx.lineWidth=k===0?2.4:1.2;ctx.stroke();ctx.restore()}
 for(let i=0;i<12;i++){const a=i*Math.PI/6+loomTimer*6,x=Math.cos(a)*r,y=Math.sin(a)*r;ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(-y*.75,x*.75,x,y);ctx.strokeStyle='#e5ebcf88';ctx.lineWidth=1;ctx.stroke();ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.beginPath();ctx.moveTo(-18,-3);ctx.lineTo(11,0);ctx.lineTo(-18,3);finishInk('#fff4d6','#b2d5de',1);ctx.restore()}ctx.restore()}
function drawParadise(){if(paradiseGate&&cleared){const x=sideGateX(210),y=roomExit.y;glow(x,y-55,100,'#f9d18e',.22);cottage(x,y,.46,3);worldLabel(x,y-115,'F · A DISTANT CHOIR');}
 if(currentNode.type!=='paradise')return;
 for(let i=0;i<7;i++){const x=420+i*195,y=585-Math.sin(i*Math.PI/6)*90,id=['smith','keeper','tailor','pip','nima','orr','keeper'][i];cottage(x+26,y+38,.62,i%4);drawFriendlyBug(x-18,y+14+Math.sin(time*2.2+i)*2,id,.95);ellipse(x-16,y-1,2.5,3+Math.sin(time*6+i)*1.5,'#233133');worldLabel(x+Math.sin(time+i)*17,y-65-(time*12+i*13)%35,'♪');glow(x,y-10,90,'#e2dca0',.07);for(let j=0;j<5;j++){const fx=x-65+j*27;line(fx,y+38,fx+4,y+20,'#a2bb87',1.5);outlinedEllipse(fx+4,y+19,4,3,'#ebd898','#9eaa79',1)}}
 for(let i=0;i<45;i++){const x=(i*137+time*8)%2200,y=150+i*11%410;ellipse(x,y+Math.sin(time+i)*10,2,2,'#f0d5a599')}
 ctx.save();ctx.textAlign='center';ctx.font='20px Georgia';ctx.fillStyle='#e4d8af';ctx.fillText('THE CHOIR BENEATH THE WORLD',1100,265);ctx.font='italic 17px Georgia';ctx.fillStyle='#b8c4a9';ctx.fillText('For once, the roots ask nothing of you.',1100,295);ctx.restore();
}
function enterParadise(){if(!paradiseGate||!cleared||paradiseUsed||currentNode.type==='trap'&&trialSeals.some(s=>!s.collected)||Math.hypot(player.x-sideGateX(210),player.y-(roomExit.y-27))>105)return false;
 paradiseUsed=true;paradiseGate=false;paradiseReturn=currentNode;runSeeds+=drops.length;drops=[];const previous=paradiseReturn;makeRoom({...previous,id:previous.id+'-choir',type:'paradise',theme:'bath',title:'Bug Paradise',climbTop:0});routeHistory.pop();player.hp=player.maxHp;player.silk=100;rootScore.setRoom('paradise',false);$('roommusic').textContent='THE ROOTS SING HOME · ORIGINAL CHOIR';hud();toast('The whole village sings for you. Hearts and silk restored.');return true}
function installRootbound(){
 roomTypes.paradise={name:'Hidden sanctuary',icon:'♫',color:'#f0d7a0',desc:'The roots sing home.'};
 const init=initCampaign;initCampaign=function(){init();paradiseDepth=Math.random()<.06?5+Math.floor(Math.random()*8):0;paradiseUsed=false;paradiseReturn=null};
 const make=makeRoom;makeRoom=function(node=currentNode){make(node);setupRootbound();if(node.type==='paradise'){enemies=[];hazards=[];pods=[];walls=[];platforms=[{x:0,y:650,w:2200,h:100},...Array.from({length:7},(_,i)=>({x:345+i*195,y:623-Math.sin(i*Math.PI/6)*90,w:150,h:27+Math.sin(i*Math.PI/6)*90}))].sort((a,b)=>a.y-b.y);cleared=true;paradiseGate=false}hud()};
 const service=roomService;roomService=function(){if(enterParadise())return;service()};
 const leave=exitRoom;exitRoom=function(){if(currentNode.type==='paradise'&&paradiseReturn){currentNode=paradiseReturn;paradiseReturn=null;routeReady=false}leave()};
 const hit=hitEnemy;hitEnemy=function(e,...args){const hp=e.hp,ok=hit(e,...args);if(ok&&hp>e.hp){e.recoil=.17;e.recoilDir=Math.sign(e.x-player.x)||1;impactMarks.push({x:e.x,y:e.y,angle:Math.atan2(e.y-player.y,e.x-player.x),life:e.hp<=0?.65:.22,max:e.hp<=0?.65:.22,death:e.hp<=0,color:wildBrood[e.kind]?.color||'#e5d2a4'});impactSound(e.hp<=0?'death':'hit')}return ok};
 const damage=hurt;hurt=function(...args){const hp=player.hp;damage(...args);if(player.hp<hp){player.recoil=.23;impactMarks.push({x:player.x,y:player.y,angle:.7,life:.3,max:.3,color:'#f8a78e'});impactSound('player')}};
 const creature=drawCreature;drawCreature=function(e){ctx.save();if(e.recoil>0){const f=e.recoil/.17;ctx.translate(e.x,e.y);ctx.rotate(e.recoilDir*f*.16);ctx.scale(1+f*.2,1-f*.13);ctx.translate(-e.x,-e.y)}creature(e);ctx.restore()};
 const tick=tickBrood;tickBrood=function(e,dt){e.recoil=Math.max(0,(e.recoil||0)-dt);if(!['mortar','cicada'].includes(e.kind))return tick(e,dt);e.stun=Math.max(0,(e.stun||0)-dt);if(e.stun>0)return true;e.clock+=dt;const dx=player.x-e.x;
  if(e.mode==='idle'){if(e.kind==='cicada')e.x=Math.max(e.minX,Math.min(e.maxX,e.x+Math.sign(dx)*48*dt));if(e.attack<=0&&Math.abs(dx)<700){e.mode='chant';e.clock=0;if(e.kind==='mortar'){e.targetX=Math.max(e.minX,Math.min(e.maxX,player.x));addArea(e.targetX,e.floorY-20,95,.95,'spore')}else addArea(e.x,e.y,125,.9,'blast')}}else if(e.clock>1.1){e.mode='idle';e.attack=2.8}return true};
 const art=drawBrood;drawBrood=function(e){if(!['mortar','cicada'].includes(e.kind))return art(e);const c=e.hit>0?'#fff5de':wildBrood[e.kind].color;ctx.save();ctx.translate(e.x,e.y);const pulse=e.mode==='chant'?1+Math.sin(time*24)*.08:1;ctx.scale(pulse,pulse);for(let i=-1;i<=1;i++)for(const d of [-1,1])line(i*13,d*8,i*17-8,d*24,'#b9b79a',2);outlinedEllipse(0,0,28,23,c,'#101f27',3);if(e.kind==='mortar'){for(let i=0;i<3;i++){line(-15+i*15,-12,-20+i*20,-35,c,5);outlinedEllipse(-20+i*20,-36,11,8,'#7b8d54','#d6d7a1',2)}}else{for(const d of [-1,1])outlinedEllipse(d*23,-13,16,30,'#d8b67877','#e6ce9d',2);for(let i=0;i<4;i++)line(-16,-10+i*7,16,-10+i*7,'#807057',2)}ellipse(15,-7,3,5,'#162a2c');ctx.restore();return true};
 drawHalo=drawSilkBloom;
 const orchestration=RootScore.prototype.orchestrate;RootScore.prototype.orchestrate=function(step,at){orchestration.call(this,step,at);if(this.room==='paradise'&&step%3===0){const bar=Math.floor(step/6),root=chamberScores.paradise.root+[0,5,7,0][bar%4],length=60/66*3.6;for(const [i,n] of [0,4,7,12].entries())this.choir(root+12+n,at+i*.045,length,.024,i/3*1.2-.6)}};
}
RootScore.prototype.choir=function(midi,at,duration,volume,pan){if(!this.ctx)return;const c=this.ctx,hz=440*2**((midi-69)/12);for(const [i,formant] of [650,1100,2600].entries()){const o=this.track(c.createOscillator()),filter=c.createBiquadFilter(),g=c.createGain(),stereo=c.createStereoPanner?.();o.type='sawtooth';o.frequency.setValueAtTime(hz,at);o.frequency.linearRampToValueAtTime(hz*1.003,at+duration);filter.type='bandpass';filter.frequency.setValueAtTime(formant,at);filter.frequency.linearRampToValueAtTime(formant*.8,at+duration);filter.Q.value=5;g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(volume/(i+1),at+.35);g.gain.exponentialRampToValueAtTime(.0001,at+duration);o.connect(filter);filter.connect(g);if(stereo){stereo.pan.value=pan;g.connect(stereo);this.connect(stereo)}else this.connect(g);o.onended=()=>{this.nodes.delete(o);o.disconnect();filter.disconnect();g.disconnect();stereo?.disconnect()};o.start(at);o.stop(at+duration+.05)}};
function drawAreas(){for(const z of areaBursts){ctx.save();ctx.translate(z.x,z.y);ctx.scale(1,.83);ctx.beginPath();ctx.arc(0,0,z.r,0,Math.PI*2);ctx.fillStyle=z.active?(z.kind==='spore'?'#bbce7144':'#f9b57555'):'#d8b78313';ctx.fill();ctx.strokeStyle=z.kind==='spore'?'#d4dca2':'#f2b98b';ctx.lineWidth=z.active?3:1.5;ctx.setLineDash(z.active?[]:[7,5]);ctx.stroke();ctx.setLineDash([]);ctx.beginPath();ctx.arc(0,0,z.r*Math.min(1,1-z.wait/z.initial),0,Math.PI*2);ctx.stroke();if(!z.active){ctx.font='bold 20px Georgia';ctx.textAlign='center';ctx.fillStyle='#ffe0af';ctx.fillText('!',0,6)}ctx.restore()}}
