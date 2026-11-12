'use strict';
let trialSeals=[];
function deepenChamber(){trialSeals=[];const f=(x,y,w,extra={})=>({x,y,w,h:y===650?90:22,...extra});
 if(currentNode.type==='trap'){
  const variant=currentNode.layout%3;
  const shapes=[[[270,535,110],[470,420,95],[680,310,115],[930,420,145],[1160,520,95],[1350,400,110],[1550,290,105],[1780,425,120],[1970,550,100]],[[280,535,110],[510,445,100],[730,350,100],[950,480,145],[1170,365,105],[1390,265,100],[1590,405,110],[1810,510,110],[1980,540,100]],[[260,530,110],[490,405,110],[720,300,100],[960,415,145],[1175,305,110],[1400,435,100],[1620,330,105],[1800,455,110],[1980,555,100]]];
  platforms=[f(0,650,330),f(2080,650,120),...shapes[variant].map((v,i)=>f(...v,i===3?{checkpoint:true}:i===1||i===6?{moving:true,baseX:v[0],baseY:v[1],range:i===1?35:0,rangeY:i===6?40:0}:i===2||i===5||i===7?{crumble:true,crack:0,gone:0}:{}))];
  pods=[{x:435,y:480},{x:865,y:390},{x:1125,y:475},{x:1500,y:380},{x:1740,y:375},{x:2040,y:500}].map((p,i)=>({...p,id:'trialpod'+i,cd:0,lit:0}));
  hazards=[{kind:'saw',baseX:595,x:595,y:500,r:24,range:85,phase:0},{kind:'saw',baseX:1220,x:1220,y:550,r:25,range:85,phase:1},{kind:'saw',baseX:1685,x:1685,y:490,r:25,range:105,phase:2},{kind:'spikes',x:150,y:650,w:125,phase:1.4}];
  trialSeals=[2,4,6].map((n,i)=>({x:shapes[variant][n][0]+shapes[variant][n][2]/2,y:shapes[variant][n][1]-58,id:i,collected:false}));
 }else if(currentNode.type==='combat'&&room>=3){
  const variant=(currentNode.layout+room)%3;
  if(variant===0){platforms=[f(0,650,530),f(730,650,580),f(1520,650,680),f(350,525,155),f(590,425,140,{moving:true,baseX:590,range:35}),f(870,330,150),f(1110,460,130,{crumble:true,crack:0,gone:0}),f(1370,420,150),f(1640,520,170),f(1890,395,150)]}
  else if(variant===1){platforms=[f(0,650,620),f(840,650,540),f(1600,650,600),f(300,540,130),f(570,420,140),f(780,300,160),f(1060,420,130,{moving:true,baseX:1060,baseY:420,range:0,rangeY:28}),f(1320,515,140),f(1510,390,130),f(1770,290,160),f(1970,515,140)]}
  else{platforms=[f(0,650,780),f(1030,650,450),f(1710,650,490),f(285,530,145),f(530,405,120,{crumble:true,crack:0,gone:0}),f(785,460,140),f(1100,340,160),f(1350,450,150),f(1570,480,135,{moving:true,baseX:1570,range:45}),f(1850,370,165)]}
  pods=[{x:640,y:485},{x:935,y:490},{x:1450,y:440},{x:1620,y:490}].map((p,i)=>({...p,id:'huntpod'+i,cd:0,lit:0}));
  hazards=hazards.filter(h=>platforms.some(p=>p.y===650&&h.x>p.x+30&&h.x+(h.w||0)<p.x+p.w-30));
  for(const [i,e] of enemies.entries()){if(['flyer','wasp'].includes(e.kind))continue;const choices=e.kind==='bellspore'?platforms.filter(p=>p.y<650&&!p.moving&&!p.crumble):platforms.filter(p=>p.y===650&&p.x>0);const ledge=choices[i%choices.length];e.x=ledge.x+ledge.w/2;e.floorY=ledge.y;e.y=ledge.y-e.h;e.minX=ledge.x+e.w+4;e.maxX=ledge.x+ledge.w-e.w-4}
 }
 const health=1+(room-1)*.025+runDifficulty*.18;
 for(const e of enemies){e.hp=Math.round(e.hp*health*10)/10;e.maxHp=e.hp;e.attack/=1+(room-1)*.015+runDifficulty*.08}
 platforms.sort((a,b)=>a.y-b.y);
}
function tickTraversal(dt){
 for(const f of platforms){if(f.crumble){if(f.gone>0){f.gone-=dt;if(f.gone<=0)f.crack=0}else if(player.ground&&Math.abs(player.y+27-f.y)<4&&player.x>f.x-10&&player.x<f.x+f.w+10){f.crack+=dt;if(f.crack>(f.crumbleAfter??.52)){f.gone=f.returnAfter??2.5;player.ground=false;player.coyote=.08;burst(f.x+f.w/2,f.y,'#bcb6a2',10,90)}}else f.crack=Math.max(0,f.crack-dt*.4)}if(f.checkpoint&&player.ground&&Math.abs(player.y+27-f.y)<4&&player.x>f.x&&player.x<f.x+f.w)player.checkpoint={x:f.x+f.w/2,y:f.y-29}}
 for(const seal of trialSeals)if(!seal.collected&&Math.hypot(player.x-seal.x,player.y-seal.y)<43){seal.collected=true;companionEvent('seal');addScore(120);burst(seal.x,seal.y,'#dfc9f0',20,140);tone(550+seal.id*120,.35);}
 if(currentNode.type==='trap')$('objective').textContent='SILK SEALS '+trialSeals.filter(s=>s.collected).length+'/'+trialSeals.length+' · '+(trialSeals.every(s=>s.collected)?'The gate is open →':'Gather every seal to open the gate');
 $('ability').textContent=player.haloCd>0?'SHIFT · '+player.haloCd.toFixed(1)+'s':'SHIFT · SILK HALO '+player.haloCost;
}
function drawTraversal(){for(const f of platforms){if(f.crumble&&!f.skin&&f.gone<=0){ctx.save();ctx.strokeStyle=f.crack>.1?'#ffd3ac':'#c2a99b88';ctx.lineWidth=1.5;for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(f.x+22+i*27,f.y+2);ctx.lineTo(f.x+33+i*27,f.y+12);ctx.lineTo(f.x+20+i*27,f.y+21);ctx.stroke()}ctx.restore()}if(f.checkpoint){line(f.x+16,f.y,f.x+16,f.y-48,'#90bbae',2);outlinedEllipse(f.x+16,f.y-53,6,11,'#b9ebc4','#6c9d8c',1);glow(f.x+16,f.y-53,35,'#b4e9ca',.13)}}for(const s of trialSeals)if(!s.collected){ctx.save();ctx.translate(s.x,s.y+Math.sin(time*3+s.id)*4);ctx.rotate(Math.PI/4);ctx.strokeStyle='#e9d0f2';ctx.lineWidth=2;ctx.strokeRect(-9,-9,18,18);ctx.strokeStyle='#bda9dc66';ctx.strokeRect(-15,-15,30,30);ctx.restore();glow(s.x,s.y,36,'#d6bdf2',.18)}}
