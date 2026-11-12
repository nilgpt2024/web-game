'use strict';
const gardenPalettes=[['#143632','#8ead8b','#9ee5c4'],['#30392b','#baaf74','#edca83'],['#23343b','#96a8a4','#b6deea'],['#302c3b','#b5a3b6','#d6c3ec'],['#352d29','#b69a73','#e9ae79'],['#332525','#ad7966','#f3be86']];
function outlinedEllipse(x,y,rx,ry,fill,edge='#122523',width=2.4){ellipse(x,y,rx,ry,fill);ctx.strokeStyle=edge;ctx.lineWidth=width;ctx.stroke()}
function finishInk(fill,edge='#0a181c',width=2.7){ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=edge;ctx.lineWidth=width;ctx.lineJoin='round';ctx.stroke()}
function glow(x,y,r,color,alpha=.3){ctx.save();ctx.globalAlpha=alpha;const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,color+'00');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);ctx.restore()}
function drawMoth(x,y,face=1,t=0,scale=1,anim={}){
  const skin=anim.cosmetic||{cloth:'#8b4d4e',trim:'#b47b68',aura:'#b4ead1'};
  const running=Math.min(1,Math.abs(anim.vx||0)/220),air=anim.ground===false,swing=Math.sin(t)*running,squash=anim.land||0;
  ctx.save();ctx.translate(x,y);ellipse(0,28,20,4,'#03101580');glow(0,-8,49,skin.aura,.13);
  ctx.scale(face*scale*(1+squash*.25),scale*(1-squash*.22));ctx.rotate((anim.dash>0?.25:running*.07)*face);
  if(air){for(const side of [-1,1]){ctx.save();ctx.scale(side,1);ctx.rotate(-.3+Math.sin(t*2)*.15);ctx.beginPath();ctx.moveTo(1,-10);ctx.bezierCurveTo(30,-44,51,-25,18,8);ctx.quadraticCurveTo(31,27,1,5);finishInk('#b8d9cd80','#d2e6c381',1);line(5,-5,29,-22,'#ecf2d75c',1);ctx.restore()}}
  for(const side of [-1,1]){const dx=side*6+swing*side*5,dy=air?19:26-Math.max(0,swing*side)*6;line(side*4,12,dx,dy,'#07181a',6);line(side*4,12,dx,dy,'#d8d7b2',2.3);line(dx,dy,dx+5,dy,'#bdbd9b',2)}
  ctx.beginPath();ctx.moveTo(-9,-11);ctx.bezierCurveTo(-17,0,-18-running*15,12+Math.sin(t)*3,-25-running*9,19);ctx.quadraticCurveTo(-16,17,-8,23);ctx.lineTo(0,18);ctx.lineTo(9,22);ctx.quadraticCurveTo(10,7,9,-11);ctx.closePath();finishInk(skin.cloth);
  ctx.beginPath();ctx.moveTo(-6,-6);ctx.quadraticCurveTo(-13,7,-14,16);ctx.lineTo(-5,13);ctx.lineTo(4,20);ctx.lineTo(5,-7);finishInk(skin.trim,'#d5b187',.9);
  ctx.beginPath();ctx.moveTo(-10,-9);ctx.bezierCurveTo(-24,-6,-25-running*8,4+Math.sin(t)*5,-38-running*9,0);ctx.bezierCurveTo(-25,12,-13,4,-7,-3);finishInk(skin.cloth,'#1c2a25',1.5);
  outlinedEllipse(0,-18+Math.sin(t*.5)*(1-running)*1.1,14,16,'#ebe5c9','#0a1c20',3.3);
  ctx.beginPath();ctx.moveTo(-11,-24);ctx.bezierCurveTo(-18,-32,-22,-40,-18,-44);ctx.quadraticCurveTo(-12,-33,-4,-29);ctx.moveTo(7,-30);ctx.quadraticCurveTo(17,-36,23,-39);ctx.quadraticCurveTo(20,-24,12,-21);finishInk('#ebe5c9','#0a1c20',2.7);
  ctx.beginPath();ctx.arc(0,-19,10,3.2,5.3);ctx.strokeStyle='#fffbe1';ctx.lineWidth=1.6;ctx.stroke();
  ellipse(-4,-17,3,5,'#0d2529');ellipse(7,-18,2.8,4.8,'#0d2529');ellipse(-4.7,-18.5,.8,1,'#94ae9c');line(-1,-6,3,-6,'#b6ae8e',1);
  ctx.save();ctx.translate(8,2);ctx.rotate(anim.attack>0?-.6+((.18-anim.attack)/.18)*1.4:.18+Math.sin(t*.5)*.04);drawHeldArm(anim.weapon||'needle');ctx.restore();
  outlinedEllipse(7,1,3.7,4.2,'#d5d2ad','#172622',1.5);ctx.restore();
}
function drawCreature(e){if(drawBrood(e)||drawWarden(e)||drawNewCreature(e))return;
  const face=player.x>e.x?1:-1,t=time,hit=e.hit>0;
  ctx.save();ctx.translate(e.x,e.y);ellipse(0,e.h+1,e.w*.95,5,'#03161b70');ctx.scale(face,1);
  if(e.kind==='boss'){
    if(e.mode==='windup'){glow(0,0,110,'#ffb67b',.23+Math.sin(t*15)*.09);ctx.fillStyle='#e5ae7636';ctx.fillRect(e.direction===face?0:-650,40,650,13)}
    const breath=Math.sin(t*2)*2;ctx.translate(0,breath);
    for(let i=0;i<6;i++){const x=-49+i*19,step=Math.sin(t*(e.mode==='charge'?22:5)+i)*9;line(x,12,x+step,53,'#121e1b',8);line(x,12,x+step,53,'#b6ae8c',3);line(x+step,53,x+step+9,57,'#ccc6a2',2)}
    outlinedEllipse(-3,-1,61,46,hit?'#fff1bf':'#75524a','#0b1c1c',4);outlinedEllipse(-12,-9,43,31,hit?'#ffedd0':'#a47e5e','#d1b589',1.5);
    for(let i=0;i<6;i++){line(-45+i*14,-28,-41+i*16,30,'#4e5141',2);ctx.beginPath();ctx.moveTo(-51+i*18,-24);ctx.lineTo(-46+i*18,-63-Math.sin(i*2)*17);ctx.lineTo(-29+i*18,-22);finishInk('#cdc59f','#15241e',3)}
    outlinedEllipse(39,-15,27,30,hit?'#fff3d2':'#e0d2a7','#101f20',3.5);ellipse(48,-20,5,8,'#152b2d');glow(48,-20,17,'#fdbd73',.3);ellipse(48,-21,2,4,'#ffc781');line(54,2,75,19,'#142421',7);line(54,2,75,19,'#c6c39e',3);
    if(e.hp<e.maxHp*.5){glow(-4,-4,44,'#f7a567',.5);outlinedEllipse(-4,-4,13,18,'#ffd196','#754436',2)}
  }else if(e.kind==='flyer'){
    for(const side of [-1,1]){ctx.save();ctx.scale(side,1);ctx.rotate(Math.sin(t*35)*.55);outlinedEllipse(18,-15,26,11,'#bcc7a890','#edf0bf88',1.5);line(0,-10,35,-18,'#54654f',1);ctx.restore()}
    outlinedEllipse(0,0,15,20,hit?'#fff1c2':'#aa8d65');for(let i=0;i<3;i++)line(-10,4+i*5,9,4+i*5,'#5c6450',1.5);outlinedEllipse(4,-8,12,12,'#ded5ac');ellipse(9,-10,3,4,'#112b2b');line(1,-18,Math.sin(t*4)*3,-28,'#b8c5a2',2);line(0,15,-8,24+Math.sin(t*9)*3,'#c9cfa6',2);line(6,14,12,24-Math.sin(t*9)*3,'#c9cfa6',2);
  }else{
    for(let i=0;i<4;i++){const x=-20+i*13,step=Math.sin(t*11+i*1.7)*5;line(x,4,x-7+step,22,'#0d201d',5);line(x,4,x-7+step,22,'#d0cba0',2)}
    ctx.translate(0,Math.sin(t*10+e.x)*1.2);outlinedEllipse(-5,0,27,20,hit?'#fff0bd':e.kind==='spitter'?'#99826b':'#83977a','#0b211f',3);outlinedEllipse(-7,-5,22,13,e.kind==='spitter'?'#bfa67c':'#a4b78c','#d0d0a7',1.2);line(-6,-17,-6,17,'#3d5749',2);for(let i=0;i<3;i++)ellipse(-21+i*12,-7,2,2,'#566751');outlinedEllipse(22,0,12,14,hit?'#fff7d1':'#e0d8af');ellipse(28,-4,3,4,'#102b2c');line(23,-11,27+Math.sin(t*4)*2,-25,'#d0cba2',2);
    if(e.kind==='spitter'){glow(-10,-9,24,'#e8b67b',.18);outlinedEllipse(-10,-12,10,9,'#c99e6b','#52604a',1);ellipse(-12,-15,3,2,'#efcc92')}
  }ctx.restore();
}
function drawAtmosphere(){
  const pal=gardenPalettes[Math.min(5,Math.max(0,Math.floor((room-1)/3)))]||gardenPalettes[0];ctx.save();
  ctx.globalCompositeOperation='screen';const wash=ctx.createLinearGradient(0,0,W,H);wash.addColorStop(0,pal[0]+'00');wash.addColorStop(1,pal[0]+'66');ctx.fillStyle=wash;ctx.fillRect(0,0,W,H);ctx.globalCompositeOperation='source-over';
  // Organic silhouettes, pendant seed lanterns, and drifting fog at three depths.
  for(let i=0;i<7;i++){const x=i*280-100-camera*.31,base=80+Math.sin(i*3)*55,sway=Math.sin(time*.45+i)*7;
    ctx.strokeStyle='#476b5755';ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(x,-10);ctx.bezierCurveTo(x+34,30,x-17,base-10,x+sway,base+28);ctx.stroke();
    glow(x+sway,base+42,75,pal[2],.11+Math.sin(time*1.1+i)*.025);outlinedEllipse(x+sway,base+39,7,13,pal[1]+'b0','#6c8b6a',1);ellipse(x+sway-2,base+36,2,7,'#fff4c78a');
    for(let j=0;j<3;j++){let y=base/3*j;ctx.save();ctx.translate(x+Math.sin(y)*7,y);ctx.rotate(i+j);ellipse(7,0,12,3,'#3e665380');ctx.restore()}}
  for(let layer=0;layer<3;layer++){ctx.globalAlpha=.09;const x=(time*(8+layer*3)+layer*450)%(W+600)-300;const fog=ctx.createRadialGradient(x,530+layer*54,5,x,530+layer*54,380);fog.addColorStop(0,'#a9c2a1');fog.addColorStop(1,'#a9c2a100');ctx.fillStyle=fog;ctx.fillRect(0,320,W,400)}ctx.globalAlpha=1;
  // Fine filaments catch the light behind the playable space.
  for(let i=0;i<5;i++){const x=100+i*340-camera*.18;ctx.strokeStyle='#c2d8b817';ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(x,-10);ctx.quadraticCurveTo(x+Math.sin(time*.3+i)*18,300,x+40,600);ctx.stroke()}
  ctx.restore();
}
function drawGroundDecoration(){
  const pal=gardenPalettes[Math.min(5,Math.max(0,Math.floor((room-1)/3)))]||gardenPalettes[0];ctx.save();
  for(const f of platforms){for(let i=0;i<f.w/85;i++){const x=f.x+25+i*85;if(x<camera-100||x>camera+W+100)continue;const sway=Math.sin(time*1.4+i+f.x)*3;
    ctx.strokeStyle='#588166';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(x,f.y+1);ctx.quadraticCurveTo(x+sway-7,f.y-18,x+sway,f.y-28);ctx.stroke();
    for(let j=0;j<4;j++){let y=f.y-7-j*5;ctx.save();ctx.translate(x+sway*j/4,y);ctx.rotate((j%2?1:-1)*.45);ellipse((j%2?1:-1)*4,-1,6,2.4,j%2?'#7b986a':'#426d57');ctx.restore()}
    if(i%3===0){glow(x+sway,f.y-28,28,pal[2],.13);outlinedEllipse(x+sway,f.y-28,4,5,pal[1],'#29473b',1);ellipse(x+sway-1,f.y-30,1.1,1.1,'#f5e8b9')}
  }}ctx.restore();
}
function drawMotionEffects(){
  for(const ghost of afterimages){ctx.save();ctx.globalAlpha=ghost.life/.22*.22;moth(ghost.x,ghost.y,ghost.face,time*7,1,{ground:false,vx:300,dash:1});ctx.restore()}
  for(const ring of rings){ctx.save();ctx.globalAlpha=Math.max(0,ring.life/ring.max);ctx.strokeStyle=ring.color;ctx.lineWidth=2*ring.life/ring.max;ctx.beginPath();ctx.ellipse(ring.x,ring.y,ring.radius+(1-ring.life/ring.max)*45,(ring.radius+(1-ring.life/ring.max)*45)*(ring.flat?.22:1),0,0,Math.PI*2);ctx.stroke();ctx.restore()}
}
function drawSlash(){const p=player,angle=p.attackDown?Math.PI/2:p.attackUp?-Math.PI/2:p.attackFace===1?0:Math.PI,progress=1-p.attack/.18;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(angle);ctx.scale(1,.8);const r=p.reach;ctx.beginPath();ctx.arc(0,0,r,-1.2+progress*.8,1.05+progress*.25);ctx.arc(0,0,r*.55,1.05+progress*.25,-1.2+progress*.8,true);ctx.closePath();const g=ctx.createLinearGradient(20,0,r+10,0);g.addColorStop(0,'#b7dfcc00');g.addColorStop(.7,'#ccedc58a');g.addColorStop(1,'#fff6d5');ctx.fillStyle=g;ctx.fill();ctx.beginPath();ctx.arc(0,0,r,-1.2+progress*.8,1.05+progress*.25);ctx.strokeStyle='#fff7d6';ctx.lineWidth=3;ctx.shadowColor='#cce5af';ctx.shadowBlur=12;ctx.stroke();ctx.restore()}
function drawRoomTransition(){if(roomFade<=0)return;ctx.save();ctx.fillStyle='#071719';ctx.globalAlpha=Math.min(1,roomFade);ctx.fillRect(0,0,W,H);ctx.restore()}
