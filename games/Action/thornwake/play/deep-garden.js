'use strict';
// Each chamber owns a stable palette, landmark arrangement and musical identity.
const deepThemes={
 root:{name:'The Root Cathedral',sky:'#030c12',mid:'#173d3d',stone:'#102a2b',edge:'#7eab8c',light:'#b8edc6',motif:'Roots Remember'},
 fungus:{name:'The Luminous Choir',sky:'#080c20',mid:'#263454',stone:'#19283f',edge:'#9c9bc2',light:'#b3b2ff',motif:'Spores in the Starlight'},
 amber:{name:'The Amber Sepulcher',sky:'#180c13',mid:'#583627',stone:'#33262a',edge:'#c59564',light:'#ffc580',motif:'Things Preserved in Gold'},
 silk:{name:'The Widow’s Firmament',sky:'#080d19',mid:'#293646',stone:'#172632',edge:'#8cabbb',light:'#cee9ff',motif:'A Thousand Sleeping Wings'},
 market:{name:'The Lantern Bazaar',sky:'#160d18',mid:'#503240',stone:'#322630',edge:'#c89d7d',light:'#ffcb89',motif:'The Moth Merchant’s Waltz'},
 bath:{name:'The Moonwater Sanctuary',sky:'#07131b',mid:'#24525a',stone:'#16383e',edge:'#90b7aa',light:'#acf0df',motif:'Water Beneath the World'},
 trial:{name:'The Ossuary of Thorns',sky:'#100b19',mid:'#3e3048',stone:'#28222f',edge:'#a49aa7',light:'#e1badb',motif:'Teeth of the Pendulum'},
 regent:{name:'The Heart Beneath',sky:'#16050d',mid:'#54212e',stone:'#321821',edge:'#b97b7e',light:'#ffb18c',motif:'Crown of the Last Brood'}
};
const wardens={mantis:{name:'Vesper, the Needle Saint',hint:'Bait the lunge. Pogo during recovery.',hp:22,color:'#bed9aa'},scarab:{name:'The Amber Juggernaut',hint:'Jump the shockwaves. Strike after the slam.',hp:29,color:'#ecc382'},widow:{name:'Mother of Unspun Silk',hint:'Watch the silk marks. Dash out before the drop.',hp:24,color:'#c6c4eb'},cantor:{name:'The Hollow Cantor',hint:'Weave through the rings. Pogo between verses.',hp:25,color:'#d5a8ce'}};
function themeFor(node){if(!node)return'root';if(node.finalBoss)return lastBrood[node.finalBoss].theme;if(node.type==='friend')return'bath';return({shop:'market',spa:'bath',trap:'trial',boss:'regent'})[node.type]||['root','fungus','amber','silk'][(Math.floor((node.depth-1)/3)+node.lane)%4]}
function chamberTheme(){return deepThemes[currentNode?.theme||'root']}
function decorateRoute(){for(const layer of routeGraph)for(const n of layer){n.theme=themeFor(n);n.seed=n.depth*71+n.lane*137+n.layout*29;if(n.type==='elite'){n.warden=n.warden||'mantis';n.title=wardens[n.warden].name}else if(n.type==='combat'&&n.depth!==1)n.title=deepThemes[n.theme].name;n.music=deepThemes[n.theme].motif}}
function syncChamberMusic(){rootScore.setRoom(currentNode?.finalBoss?lastBrood[currentNode.finalBoss].music:currentNode?.type==='friend'?'hearth':currentNode?.theme||'root',currentNode?.type==='elite');const p=chamberTheme();$('stage').style.setProperty?.('--chamber-light',p.light);$('roommusic').textContent='♫ '+(currentNode?.finalBoss?({regent:'Crown of the Last Brood',empress:'Requiem in Glass',devourer:'The Hunger Beneath'})[currentNode.finalBoss]:currentNode?.type==='friend'?'A Light to Return To':p.motif)}
function installWarden(){if(currentNode.type!=='elite')return;const kind=currentNode.warden||'mantis',spec=wardens[kind],hp=spec.hp+Math.floor(room/3)*3;
 enemies=[{...makeEnemy('bulwark',1390),kind,mini:true,name:spec.name,hp,maxHp:hp,w:kind==='scarab'?48:kind==='widow'?43:34,h:kind==='mantis'?50:kind==='scarab'?36:39,y:kind==='mantis'?600:kind==='scarab'?614:410,originY:410,mode:'idle',clock:0,attack:1.6,cycle:0,active:false}];
 hazards=[];platforms=[{x:0,y:650,w:2200,h:90},{x:500,y:505,w:205,h:24},{x:1020,y:415,w:185,h:24},{x:1600,y:505,w:205,h:24}];pods=[{id:'pod0',x:840,y:515,cd:0,lit:0},{id:'pod1',x:1460,y:485,cd:0,lit:0}];
}
function enemyOrb(x,y,vx,vy,extra={}){shots.push({x,y,vx,vy,life:4,friendly:false,...extra})}
function wardenMode(e,mode){e.mode=mode;e.clock=0}
function tickWarden(e,dt){if(!e.mini)return false;e.clock+=dt;e.stun=Math.max(0,e.stun-dt);if(!e.active){if(Math.abs(player.x-e.x)<730){e.active=true;toast(e.name+' · '+wardens[e.kind].hint);rootScore.setThreat(.5)}else return true}
 const rage=e.hp<e.maxHp*.45,speed=rage?1.22:1,dx=player.x-e.x;rootScore.setThreat(rage?.85:.5);if(e.stun>0)return true;
 if(e.kind==='mantis'){
  if(e.mode==='idle'){e.x+=Math.sign(dx)*70*dt;if(e.attack<=0){e.direction=Math.sign(dx)||1;wardenMode(e,'aim')}}
  else if(e.mode==='aim'&&e.clock>.8/speed){wardenMode(e,'lunge');e.cycle++;}
  else if(e.mode==='lunge'){e.x+=e.direction*680*dt;if(e.clock>.42){if(e.cycle%2===0){enemyOrb(e.x,e.y-8,-220,-80);enemyOrb(e.x,e.y-8,220,-80)}wardenMode(e,'recover')}}
  else if(e.mode==='recover'&&e.clock>1.05){e.attack=.8/speed;wardenMode(e,'idle')}
  e.y=600;
 }else if(e.kind==='scarab'){
  if(e.mode==='idle'){e.x+=Math.sign(dx)*42*dt;if(e.attack<=0){e.targetX=Math.max(200,Math.min(2000,player.x));e.fromX=e.x;wardenMode(e,'aim')}}
  else if(e.mode==='aim'&&e.clock>.95/speed)wardenMode(e,'leap');
  else if(e.mode==='leap'){const f=Math.min(1,e.clock/.9);e.x=e.fromX+(e.targetX-e.fromX)*f;e.y=614-Math.sin(f*Math.PI)*230;if(f===1){wardenMode(e,'recover');shake=11;ripple(e.x,644,'#f3c787',true);for(const direction of [-1,1])enemyOrb(e.x,626,direction*(rage?340:270),0,{wave:true});tone(58,.35,'sine',.07)}}
  else if(e.mode==='recover'&&e.clock>1.4){e.attack=1;wardenMode(e,'idle')}
 }else if(e.kind==='widow'){
  if(e.mode==='idle'){e.y=390+Math.sin(time*2)*24;e.x+=Math.sign(dx)*35*dt;if(e.attack<=0){e.targetX=player.x;e.fromX=e.x;wardenMode(e,'weave')}}
  else if(e.mode==='weave'&&e.clock>1.15/speed){wardenMode(e,'drop');e.x=Math.max(150,Math.min(2050,e.targetX));}
  else if(e.mode==='drop'){e.y+=680*dt;if(e.y>=608){e.y=608;wardenMode(e,'recover');for(let i=-2;i<=2;i++)enemyOrb(e.x,e.y-8,i*110,-180-Math.abs(i)*25)}}
  else if(e.mode==='recover'&&e.clock>1.05)wardenMode(e,'rise');
  else if(e.mode==='rise'){e.y-=170*dt;if(e.y<390){e.attack=1.1;wardenMode(e,'idle')}}
 }else{
  e.y=395+Math.sin(time*1.7)*38;
  if(e.mode==='idle'){e.x+=Math.sign(dx)*25*dt;if(e.attack<=0)wardenMode(e,'sing')}
  else if(e.mode==='sing'&&e.clock>.95/speed){const count=rage?12:9;for(let i=0;i<count;i++){const a=i*Math.PI*2/count+e.cycle*.31;enemyOrb(e.x,e.y,Math.cos(a)*180,Math.sin(a)*180)}e.cycle++;wardenMode(e,'recover');tone(174,.5,'triangle',.05)}
  else if(e.mode==='recover'&&e.clock>1.4){e.attack=.8;wardenMode(e,'idle')}
 }
 e.x=Math.max(95,Math.min(2105,e.x));return true;
}
function drawWarden(e){if(!e.mini)return false;const col=wardens[e.kind].color,face=player.x>e.x?1:-1,warning=['aim','weave','sing'].includes(e.mode);
 if(e.kind==='widow'){line(e.x,0,e.x,e.y-38,'#a8bbcb66',1.5);if(e.mode==='weave'){ctx.save();ctx.setLineDash([7,9]);line(e.targetX,80,e.targetX,647,'#efacb4',2);ctx.setLineDash([]);glow(e.targetX,630,65,'#f8a6b3',.2);ctx.restore()}}
 if(e.kind==='scarab'&&e.mode==='aim'){ctx.save();ctx.strokeStyle='#f4c790';ctx.lineWidth=2;ctx.setLineDash([7,6]);ctx.beginPath();ctx.ellipse(e.targetX,645,65,10,0,0,Math.PI*2);ctx.stroke();ctx.restore()}
 if(e.kind==='mantis'&&e.mode==='aim'){ctx.save();ctx.globalAlpha=.22+Math.sin(time*22)*.07;ctx.fillStyle=col;ctx.fillRect(e.x+(e.direction<0?-330:0),e.y-20,330,62);ctx.restore()}
 ctx.save();ctx.translate(e.x,e.y);if(warning)glow(0,0,110,col,.16+Math.sin(time*16)*.05);if(e.mode==='recover')glow(0,-10,70,'#b5f6d8',.2);ctx.scale(face,1);
 const fill=e.hit>0?'#fff8dc':col;
 if(e.kind==='mantis'){
  for(const s of [-1,1]){line(s*10,8,s*30,43,'#07121b',9);line(s*10,8,s*30,43,col,3);line(s*30,43,s*48,50,col,2)}
  outlinedEllipse(0,-5,17,36,e.hit>0?fill:'#405f58','#071219',4);line(-7,-28,-4,21,'#92ab81',2);
  for(const s of [-1,1]){ctx.save();ctx.translate(s*12,-20);ctx.rotate(s*(e.mode==='aim'?-.8:e.mode==='lunge'?1.1:.15));ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(s*29,-28);ctx.lineTo(s*63,-69);ctx.quadraticCurveTo(s*69,-10,s*34,15);ctx.lineTo(s*30,-12);ctx.lineTo(0,12);ctx.closePath();finishInk(fill,'#0b1b22',3);line(s*35,-8,s*56,-42,'#fff5c7',1.5);ctx.restore()}
  ctx.beginPath();ctx.moveTo(-23,-49);ctx.lineTo(22,-49);ctx.lineTo(10,-28);ctx.lineTo(-10,-28);ctx.closePath();finishInk(fill,'#0a1520',3);ellipse(-12,-43,4,3,'#092c2e');ellipse(12,-43,4,3,'#092c2e');line(-14,-49,-27,-78,col,2);line(14,-49,26,-78,col,2);
 }else if(e.kind==='scarab'){
  for(let i=0;i<6;i++){const x=-38+i*15;line(x,7,x-8,34,'#091420',9);line(x,7,x-8,34,col,3)}
  outlinedEllipse(-5,-4,48,33,e.hit>0?fill:'#856043','#08151e',4);outlinedEllipse(-9,-15,36,24,'#bc945d','#f2d49d',1.5);line(-8,-37,-8,13,'#554735',3);
  for(let i=0;i<4;i++)line(-34+i*18,-27,-30+i*18,8,'#e7c384',1);
  outlinedEllipse(35,0,18,22,fill,'#0b1b20',3);ctx.beginPath();ctx.moveTo(37,-17);ctx.quadraticCurveTo(66,-30,57,-65);ctx.quadraticCurveTo(91,-22,51,0);finishInk(fill,'#101e22',3);ellipse(43,-6,4,5,'#1d3034');
 }else if(e.kind==='widow'){
  for(const s of [-1,1])for(let i=0;i<4;i++){const y=-20+i*14,bend=55+Math.sin(time*4+i)*7;line(s*15,y,s*bend,y-26,'#091421',7);line(s*bend,y-26,s*(70-i*3),y+30,'#091421',6);line(s*15,y,s*bend,y-26,col,2);line(s*bend,y-26,s*(70-i*3),y+30,col,2)}
  outlinedEllipse(-5,8,32,37,e.hit>0?fill:'#575877','#081721',4);for(let i=0;i<4;i++)line(-27,2+i*8,17,10+i*5,'#9494ad',1);outlinedEllipse(5,-24,23,22,fill,'#091720',3);for(let i=0;i<4;i++)ellipse(-11+i*9,-29+Math.abs(1.5-i)*4,2.7,4,'#263143');
 }else{
  for(const s of [-1,1]){ctx.save();ctx.scale(s,1);ctx.rotate(Math.sin(time*9)*.12);ctx.beginPath();ctx.moveTo(8,-20);ctx.bezierCurveTo(90,-87,86,-20,44,17);ctx.quadraticCurveTo(80,68,13,47);ctx.closePath();finishInk('#927994aa','#171c30',3);outlinedEllipse(43,-17,13,20,'#c9b09899','#ded2be',1);line(9,-12,66,-44,'#dfc6c077',1);ctx.restore()}
  outlinedEllipse(0,7,24,36,e.hit>0?fill:'#695776','#091520',3);outlinedEllipse(0,-25,21,22,fill,'#0a1620',3);ellipse(-8,-28,4,6,'#293043');ellipse(8,-28,4,6,'#293043');outlinedEllipse(0,8,10,16,e.mode==='sing'?'#fff0c2':'#c9a0bb','#514459',2);line(-12,-43,-24,-65,col,2);line(12,-43,24,-65,col,2);
  if(e.mode==='sing'){ctx.strokeStyle=col;ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,60+e.clock*36,0,Math.PI*2);ctx.stroke()}
 }
 if(e.mode==='recover'){ctx.fillStyle='#c3f9d9';ctx.font='12px Georgia';ctx.textAlign='center';ctx.scale(face,1);ctx.fillText('EXPOSED',0,-94)}ctx.restore();return true;
}
function drawDeepBackground(){const p=chamberTheme(),kind=currentNode?.theme||'root',seed=currentNode?.seed||17;
 const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,p.sky);g.addColorStop(.65,p.mid);g.addColorStop(1,p.sky);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 // Distant haze and the central silhouette differ in every biome.
 glow(W*.55-camera*.05,280,420,p.light,.075);
 for(let layer=0;layer<2;layer++){ctx.save();ctx.globalAlpha=layer?.8:.42;const par=layer?.22:.09;
  for(let i=-1;i<9;i++){const x=i*285-camera*par+(seed%83),y=460+Math.sin(i*2.7+seed)*65,s=layer?1:.75;ctx.save();ctx.translate(x,y);ctx.scale(s,s);
   if(kind==='fungus'){
    ctx.beginPath();ctx.moveTo(-14,300);ctx.bezierCurveTo(12,190,-31,-30,-8,-180);ctx.lineTo(17,-180);ctx.bezierCurveTo(42,-30,8,190,32,300);finishInk('#172b40',p.edge+'45',2);
    ctx.beginPath();ctx.moveTo(-116,-141);ctx.bezierCurveTo(-99,-286,98,-270,120,-141);ctx.quadraticCurveTo(2,-98,-116,-141);finishInk('#4a4772','#aba5db70',2);glow(0,-155,155,p.light,.13);
    for(let j=0;j<9;j++){line(-89+j*23,-146,Math.sin(j)*20,-116,p.light+'44',1);ellipse(-65+j*17,-178-Math.sin(j)*26,3,4,p.light+'80')}
   }else if(kind==='amber'){
    ctx.beginPath();ctx.moveTo(-69,260);ctx.lineTo(-68,-139);ctx.lineTo(0,-214);ctx.lineTo(72,-128);ctx.lineTo(65,260);ctx.closePath();finishInk('#3b2c2c','#bd875353',3);
    ctx.beginPath();ctx.moveTo(-37,85);ctx.lineTo(-40,-115);ctx.lineTo(0,-165);ctx.lineTo(42,-109);ctx.lineTo(36,88);ctx.closePath();finishInk('#bd763c35','#d4a16455',2);glow(0,-42,85,'#ffa95b',.13);
    ellipse(0,-46,12,31,'#201c26aa');for(const s of [-1,1]){ellipse(s*18,-62,20,8,'#281d2790');line(0,-63,s*30,-88,'#332329',2)}
   }else if(kind==='silk'){
    for(let j=0;j<4;j++){ctx.strokeStyle='#acccda35';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-150,-490+j*45);ctx.quadraticCurveTo(0,20+j*30,150,-490+j*45);ctx.stroke()}
    line(0,-500,0,-90,'#b8d8e766',1);outlinedEllipse(0,-36,35,65,'#516b7d70','#b5d5da55',1.5);for(let j=0;j<8;j++)line(-28,-70+j*10,28,-49+j*10,'#bcd7dd30',1);glow(0,-36,90,p.light,.08);
   }else if(kind==='market'){
    line(-104,220,-95,-112,'#1d2430',10);line(106,220,96,-112,'#1d2430',10);ctx.beginPath();ctx.moveTo(-129,-103);ctx.lineTo(0,-179);ctx.lineTo(133,-103);ctx.lineTo(92,-80);ctx.lineTo(44,-97);ctx.lineTo(0,-80);ctx.lineTo(-51,-99);ctx.closePath();finishInk(i%2?'#704651':'#745841','#d6a97660',2);ctx.fillStyle='#272330';ctx.fillRect(-107,118,211,35);
    for(let j=0;j<3;j++){line(-65+j*66,-106,-65+j*66,-48,'#92786b',1);outlinedEllipse(-65+j*66,-33,11,19,'#d5a262','#e9c891',1);glow(-65+j*66,-32,55,'#ffc480',.16)}
   }else if(kind==='bath'){
    ctx.strokeStyle='#477b7c';ctx.lineWidth=22;ctx.beginPath();ctx.moveTo(-103,210);ctx.lineTo(-103,-115);ctx.bezierCurveTo(-104,-240,104,-240,103,-115);ctx.lineTo(103,210);ctx.stroke();
    const water=ctx.createLinearGradient(0,-195,0,220);water.addColorStop(0,'#b6ede060');water.addColorStop(1,'#8ddfdf00');ctx.fillStyle=water;ctx.fillRect(-35,-181,70,410);for(let j=0;j<8;j++)line(-30+j*9,-160+(time*50+j*36)%130,-30+j*9,140+(time*50+j*36)%75,'#b9efe02a',1);
   }else if(kind==='trial'){
    for(let j=0;j<3;j++){ctx.beginPath();ctx.moveTo(-113+j*75,270);ctx.lineTo(-67+j*75,-240+j*91);ctx.lineTo(-10+j*75,270);finishInk('#262334','#80788c40',2)}
    line(0,-500,Math.sin(time*.8+i)*70,-50,'#bba9bf50',2);outlinedEllipse(Math.sin(time*.8+i)*70,-20,19,39,'#777184','#ccc0c460',1);
   }else if(kind==='regent'){
    ctx.strokeStyle='#a8676866';ctx.lineWidth=15;ctx.beginPath();ctx.moveTo(-115,270);ctx.bezierCurveTo(-150,-45,-116,-215,0,-268);ctx.bezierCurveTo(116,-215,150,-45,115,270);ctx.stroke();for(let j=0;j<5;j++){ctx.strokeStyle='#bd787735';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-110,-100+j*63);ctx.quadraticCurveTo(0,-45+j*63,110,-100+j*63);ctx.stroke()}
   }else{
    ctx.strokeStyle='#325c5366';ctx.lineWidth=26;ctx.beginPath();ctx.moveTo(-82,280);ctx.bezierCurveTo(-3,70,-170,-161,-45,-310);ctx.moveTo(84,280);ctx.bezierCurveTo(26,55,135,-128,43,-290);ctx.stroke();for(let j=0;j<5;j++){line(-80,-210+j*90,55,-220+j*90,'#658b6540',2);ellipse(-60,-180+j*85,33,8,'#46735744')}
   }
   ctx.restore();
  }ctx.restore();
 }
 if(kind==='regent'){const x=1090-camera*.38;glow(x,220,210,'#ef785e',.22);outlinedEllipse(x,210,101,127,'#230a18','#d08d7b77',3);for(let i=0;i<12;i++){const a=i*Math.PI/6+time*.025;line(x+Math.cos(a)*130,210+Math.sin(a)*148,x+Math.cos(a)*172,210+Math.sin(a)*200,'#da9a8155',2)}outlinedEllipse(x,216,32,63,'#ef967b30','#ecb89466',2)}
 if(kind==='bath'){const water=ctx.createLinearGradient(0,570,0,720);water.addColorStop(0,'#81c3bd22');water.addColorStop(1,'#0e3446');ctx.fillStyle=water;ctx.fillRect(0,570,W,150);for(let i=0;i<20;i++)line((i*117+time*9)%W,591+i*5,(i*117+time*9)%W+60,591+i*5,'#bde6cc22',1)}
 // Near silhouettes frame the play area without hiding hazards or the player.
 ctx.save();for(const side of [0,1]){ctx.translate(side?W:0,0);ctx.scale(side?-1:1,1);ctx.fillStyle=p.sky;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(110,0);ctx.bezierCurveTo(52,70,64,150,23,300);ctx.lineTo(0,720);ctx.closePath();ctx.fill();if(side){ctx.scale(-1,1);ctx.translate(-W,0)}}ctx.restore();
}
function drawDeepAtmosphere(){const p=chamberTheme(),seed=currentNode?.seed||17;ctx.save();for(let i=0;i<42;i++){const x=((i*163.1+seed+Math.sin(time*.4+i)*15-camera*.14)%W+W)%W,y=((i*87.7-time*(4+i%5))%H+H)%H;ellipse(x,y,i%5===0?2:1,i%5===0?2:1,p.light+(i%5===0?'77':'30'))}ctx.globalAlpha=.055;for(let i=0;i<3;i++){const fog=ctx.createRadialGradient((time*12+i*490)%(W+500)-250,590,0,(time*12+i*490)%(W+500)-250,590,320);fog.addColorStop(0,p.light);fog.addColorStop(1,p.light+'00');ctx.fillStyle=fog;ctx.fillRect(0,320,W,400)}ctx.restore()}
function drawDeepPlatforms(){const p=chamberTheme();for(const f of platforms){if(f.gone>0)continue;const g=ctx.createLinearGradient(0,f.y,0,f.y+f.h);g.addColorStop(0,p.stone);g.addColorStop(1,'#080f18');ctx.fillStyle=g;ctx.fillRect(f.x,f.y,f.w,f.h);line(f.x,f.y,f.x+f.w,f.y,p.edge,3);line(f.x+5,f.y+6,f.x+f.w-5,f.y+6,p.edge+'44',1);for(let i=0;i<f.w/43;i++){const x=f.x+i*43;line(x,f.y+12,x+16,f.y+f.h-3,p.edge+'20',1)}if(f.moving){glow(f.x+f.w/2,f.y+10,70,p.light,.1);for(let i=0;i<3;i++)ellipse(f.x+f.w/2-13+i*13,f.y+12,2,2,p.light)}if(f.y<650)for(let i=0;i<f.w/47;i++){ctx.strokeStyle=p.edge+'55';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(f.x+i*47,f.y+f.h);ctx.quadraticCurveTo(f.x+i*47+14,f.y+45,f.x+i*47+Math.sin(time+i)*4,f.y+66);ctx.stroke()}}}
function drawDeepGround(){const p=chamberTheme();for(const f of platforms.filter(f=>!(f.gone>0)))for(let i=0;i<f.w/95;i++){const x=f.x+21+i*95;if(x<camera-70||x>camera+W+70)continue;const y=f.y,sway=Math.sin(time+i)*3;line(x,y,x+sway,y-20,p.edge+'77',1.2);if(currentNode.theme==='fungus'){outlinedEllipse(x+sway,y-22,10,5,p.edge,'#142139',1);ellipse(x+sway,y-22,3,2,p.light)}else if(['amber','regent','trial'].includes(currentNode.theme)){ctx.beginPath();ctx.moveTo(x-5,y);ctx.lineTo(x+2,y-20);ctx.lineTo(x+8,y);finishInk(p.edge+'99',p.stone,1)}else{ellipse(x-4+sway,y-11,7,2,p.edge+'99');ellipse(x+5+sway,y-17,7,2,p.edge+'99')}}}
function deepRouteSvg(){const position=n=>({x:75+(n.depth-1)*77,y:98+Math.sin((n.depth-1)*.66)*42+n.lane*88});let paths='',nodes='';for(const layer of routeGraph)for(const n of layer){const a=position(n);for(const to of routeGraph[n.depth]||[]){const b=position(to),used=n.visited&&to.visited;paths+=`<path class="${used?'thread-traveled':'thread-future'}" d="M${a.x} ${a.y}C${a.x+43} ${a.y+28},${b.x-43} ${b.y-28},${b.x} ${b.y}"/>`}const next=n.depth===room+1,current=n===currentNode,known=n.visited;nodes+=`<g class="cocoon-node ${current?'cocoon-current':known?'cocoon-visited':next?'cocoon-next':''}" transform="translate(${a.x} ${a.y})"><ellipse rx="${current?24:20}" ry="${current?32:27}" fill="${known?'#394637':'#0d1723'}" stroke="${roomTypes[n.type].color}"/><path d="M-16 -13Q0 0 16 -6M-18 1Q0 14 18 6M-13 15Q0 24 13 17" fill="none" stroke="${roomTypes[n.type].color}" opacity=".25"/><text text-anchor="middle" y="6" class="cocoon-symbol">${n.dark?'◐':n.type==='elite'?'†':roomTypes[n.type].icon}</text><text text-anchor="middle" y="46" class="cocoon-number">${String(n.depth).padStart(2,'0')}</text><title>${n.title} · ${roomTypes[n.type].name}${known?' · visited':''}</title></g>`}return`<div class="silk-map-header"><span>THE SILKEN DESCENT</span><small>${String(room).padStart(2,'0')} / 16 CHAMBERS</small></div><div class="route-scroll silk-map"><svg viewBox="0 0 1310 440" role="img" aria-label="Sixteen chambers connected by branching silk threads. Glowing cocoons mark your traveled route."><defs><radialGradient id="mapglow"><stop stop-color="#445e5266"/><stop offset="1" stop-color="#070d1800"/></radialGradient></defs><ellipse cx="640" cy="180" rx="620" ry="180" fill="url(#mapglow)"/>${paths}${nodes}<text x="72" y="354" class="map-end">THE SURFACE</text><text x="1124" y="291" class="map-end">THE HEART BELOW</text></svg></div>`}
