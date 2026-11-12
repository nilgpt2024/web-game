'use strict';
function drawNewCreature(e){
 if(!['bulwark','wasp','bellspore'].includes(e.kind))return false;
 ctx.save();ctx.translate(e.x,e.y);const facing=player.x>e.x?1:-1;
 if(e.kind==='wasp'&&e.mode==='aim'){ctx.save();ctx.strokeStyle='#ffc191';ctx.lineWidth=1.5;ctx.setLineDash([6,7]);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(e.targetX-e.x,e.targetY-e.y);ctx.stroke();ctx.setLineDash([]);ctx.strokeStyle='#f4bd8066';ctx.beginPath();ctx.arc(e.targetX-e.x,e.targetY-e.y,20,0,Math.PI*2);ctx.stroke();ctx.restore()}
 ctx.scale(facing,1);const hit=e.hit>0;
 if(e.kind==='bulwark'){
  ellipse(0,25,34,5,'#0213168a');if(e.mode==='windup')glow(20,0,65,'#fbc284',.3+Math.sin(time*28)*.1);
  for(let i=0;i<4;i++){let x=-24+i*15,s=Math.sin(time*(e.mode==='rush'?23:9)+i*2)*5;line(x,8,x+s,24,'#081d20',6);line(x,8,x+s,24,'#c7ba87',2)}
  outlinedEllipse(0,-2,33,24,hit?'#e8eed6':'#617e71','#071b20',3.4);
  ctx.beginPath();ctx.moveTo(-29,-9);ctx.lineTo(-19,-29);ctx.lineTo(6,-34);ctx.lineTo(28,-18);ctx.lineTo(33,4);ctx.lineTo(15,18);ctx.lineTo(-24,15);ctx.closePath();finishInk(e.guard>0?'#867857':'#9dab89','#132824',3);
  for(let i=0;i<4;i++)line(-17+i*12,-23,-22+i*14,12,'#4a655b',2);
  outlinedEllipse(-1,-31,12,4,'#f3d69c','#233c2e',1.2);glow(-1,-30,24,'#efce86',.15);
  if(e.guard<=0){ctx.beginPath();ctx.moveTo(22,-23);ctx.lineTo(39,-15);ctx.lineTo(40,10);ctx.lineTo(28,21);ctx.lineTo(24,-6);ctx.closePath();finishInk('#506d67','#102627',3);line(31,-12,32,10,'#b6c9ab',2)}
  else{line(21,-10,29,-2,'#eac180',2);line(29,-2,23,6,'#eac180',2)}
  outlinedEllipse(18,-6,8,11,'#d8d1a8','#172a27',2);ellipse(21,-8,2,3,'#152e2f');
 }else if(e.kind==='wasp'){
  if(e.mode==='dive'){line(-45,-9,-7,-4,'#d9dca25c',3);line(-36,8,-4,4,'#d9dca24a',2)}
  for(const side of [-1,1]){ctx.save();ctx.scale(side,1);ctx.rotate(Math.sin(time*38)*.4);outlinedEllipse(21,-15,23,8,'#b9e0d280','#e1ead08c',1);line(5,-14,36,-17,'#7c9c8588',.7);ctx.restore()}
  ctx.rotate(e.mode==='dive'?.3:Math.sin(time*3)*.09);outlinedEllipse(-6,3,22,12,hit?'#fff4ce':'#c09e5d','#091e23',3);for(let i=0;i<3;i++)line(-19+i*10,-5,-18+i*10,12,'#3d4a3d',3);outlinedEllipse(14,-7,12,13,'#e7ddb9','#0b1e20',2.7);ellipse(20,-10,3.1,4.1,e.mode==='aim'?'#f5ab7b':'#143432');line(24,-1,42,7,'#0c1b20',4);line(24,-1,42,7,'#e4dab4',1.5);line(10,-18,4,-29,'#b2c6a2',2);
 }else{
  ellipse(0,25,28,4,'#00141988');const pulse=e.mode==='bloom'?1+Math.sin(time*19)*.08:1+Math.sin(time*3)*.04;ctx.scale(pulse,1/pulse);
  for(let i=0;i<4;i++){const x=-17+i*11;line(x,9,x+Math.sin(time*4+i)*4,23,'#a2b39e',2)}
  outlinedEllipse(0,6,20,19,hit?'#f6ead2':'#756c83','#102125',3);outlinedEllipse(0,-11,30,23,e.mode==='bloom'?'#d0a7bd':'#a290ad','#142127',3.2);ctx.beginPath();ctx.arc(0,-10,26,3.4,5.6);ctx.strokeStyle='#e4d6ba';ctx.lineWidth=1.5;ctx.stroke();
  for(let i=0;i<5;i++){let x=-20+i*10,y=-8-Math.sin(i)*5;outlinedEllipse(x,y,3.8,5,e.mode==='bloom'?'#ffe2ac':'#d4d2b0','#746986',.8)}
  line(-5,10,-5,15,'#101f26',2);line(6,10,6,15,'#101f26',2);if(e.mode==='bloom'){glow(0,-12,58,'#e9b8db',.18);ctx.strokeStyle='#eec4ce77';ctx.lineWidth=1;ctx.beginPath();ctx.arc(0,-10,38+Math.sin(time*12)*3,Math.PI,Math.PI*2);ctx.stroke()}
 }
 if(e.stun>0){ctx.strokeStyle='#f4e3ac';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(0,-49,17,4,0,0,Math.PI*2);ctx.stroke();ellipse(Math.cos(time*16)*17,-49+Math.sin(time*16)*4,2,2,'#fff0bb')}
 ctx.restore();return true;
}
function drawCampaignObjects(){
 for(const h of hazards){if(h.kind==='saw'){line(h.baseX-h.range,h.y,h.baseX+h.range,h.y,'#6d92854a',1);ctx.save();ctx.translate(h.x,h.y);ctx.rotate(time*4);ctx.beginPath();for(let i=0;i<24;i++){const angle=i*Math.PI/12,r=i%2?h.r*.74:h.r;const x=Math.cos(angle)*r,y=Math.sin(angle)*r;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.closePath();finishInk('#b7bab1','#172d2f',2);outlinedEllipse(0,0,h.r*.48,h.r*.48,'#566b66','#d4cba7',1);ellipse(0,0,4,4,'#e1b179');ctx.restore()}else{ctx.fillStyle='#102426';ctx.fillRect(h.x,h.y-3,h.w,6);for(let i=0;i<h.w/15;i++){const x=h.x+i*15;ctx.beginPath();ctx.moveTo(x,h.y);ctx.lineTo(x+7,h.y-(h.active?26:5));ctx.lineTo(x+14,h.y);finishInk(h.active?'#dfc9ad':'#625e4c','#302f28',1)}if(!h.active&&h.phaseNow>2.25){ctx.strokeStyle='#e7ae7599';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(h.x,h.y-4);ctx.lineTo(h.x+h.w,h.y-4);ctx.stroke()}}}
 for(const pod of pods){ctx.save();ctx.translate(pod.x,pod.y);const pulse=1+Math.sin(time*4+pod.x)*.05;ctx.scale(pulse,pulse);glow(0,0,52,pod.lit>0?'#fff0a0':'#93efd6',pod.lit>0?.45:.12);for(let i=0;i<5;i++){ctx.save();ctx.rotate(i*Math.PI*2/5+time*.22);ctx.beginPath();ctx.moveTo(0,-4);ctx.quadraticCurveTo(22,-31,24,-5);ctx.quadraticCurveTo(19,7,0,9);finishInk('#468776','#b4e0b8',1);ctx.restore()}outlinedEllipse(0,0,12,12,pod.lit>0?'#fff4b4':'#d7d9a7','#233f35',2);ctx.strokeStyle='#fcf3c4';ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(-5,-1);ctx.lineTo(0,4);ctx.lineTo(5,-1);ctx.stroke();ctx.restore()}
 if(currentNode.type==='shop'){
  ctx.save();ctx.translate(780,624);line(-85,23,-82,-103,'#5b6b51',7);line(86,23,86,-103,'#5b6b51',7);ctx.beginPath();ctx.moveTo(-98,-86);ctx.lineTo(-68,-119);ctx.lineTo(69,-119);ctx.lineTo(102,-86);ctx.closePath();finishInk('#9b6c51','#1a3029',3);for(let i=0;i<6;i++)line(-76+i*29,-114,-90+i*34,-86,'#dab28a',4);moth(0,-19,-1,time*2,1.2);ctx.fillStyle='#273b2d';ctx.fillRect(-93,2,188,26);line(-93,2,95,2,'#b2aa74',3);for(let i=0;i<3;i++){outlinedEllipse(-58+i*57,-2,10,14,['#cbbe7b','#c29678','#b1d7ad'][i],'#233e32',2);glow(-58+i*57,-7,20,'#e1c884',.08)}ctx.restore();worldLabel(780,473,'THE TRAVELING MOTH');worldLabel(780,687,'F · TRADE');
 }else if(currentNode.type==='spa'){
  ctx.save();ctx.translate(780,628);outlinedEllipse(0,9,106,23,'#496955','#21372f',4);outlinedEllipse(0,1,94,17,'#89bda3','#b6d3af',2);for(let i=0;i<5;i++){const x=-65+i*34;ctx.strokeStyle='#c6e6cd55';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,-10);ctx.bezierCurveTo(x-20,-32,x+20,-53,x+Math.sin(time+i)*8,-75);ctx.stroke()}for(let i=0;i<3;i++){ctx.strokeStyle='#d8e8bb6a';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(Math.sin(time+i)*18,2,25+i*17,3+i*3,0,0,Math.PI*2);ctx.stroke()}ctx.restore();worldLabel(780,511,'THE ROOTWATER BATHS');worldLabel(780,687,serviceUsed?'THE SPRING RESTS':'F · BATHE');
 }
}
function worldLabel(x,y,text){ctx.save();ctx.font='12px Georgia';ctx.textAlign='center';ctx.fillStyle='#d4dbb8';ctx.shadowColor='#051315';ctx.shadowBlur=5;ctx.fillText(text,x,y);ctx.restore()}
function drawCampaignEffects(){
 if(impactFlash>0){glow(player.x,player.y+50,110,'#c1f5d9',impactFlash*.8);ctx.save();ctx.globalAlpha=impactFlash*1.8;ctx.strokeStyle='#edf3c7';ctx.lineWidth=3;for(const direction of [-1,1]){ctx.beginPath();ctx.moveTo(player.x+direction*15,player.y+30);ctx.bezierCurveTo(player.x+direction*50,player.y+45,player.x+direction*65,player.y+100,player.x+direction*90,player.y+120);ctx.stroke()}ctx.restore()}
 for(const t of floatTexts){ctx.save();ctx.globalAlpha=Math.max(0,t.life);ctx.font=(t.big?'bold 21px':'11px')+' Georgia';ctx.textAlign='center';ctx.lineWidth=4;ctx.strokeStyle='#102122';ctx.strokeText(t.text,t.x,t.y);ctx.fillStyle=t.color;ctx.fillText(t.text,t.x,t.y);ctx.restore()}
}
