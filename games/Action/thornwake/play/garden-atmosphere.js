'use strict';
const gardenDust={root:['#bdce91','leaf'],fungus:['#b9ded5','spore'],amber:['#ebbd78','ash'],silk:['#c3d9ec','silk'],market:['#f1c48c','ember'],bath:['#a5e4d8','water'],trial:['#c8b5d2','ash'],regent:['#e7a18b','ember']};
function gardenNoise(i,seed=0){const n=Math.sin(i*127.1+seed*31.7)*43758.5453;return n-Math.floor(n)}
function drawGardenDepth(){const p=chamberTheme(),seed=currentNode?.seed||1,theme=currentNode?.theme||'root';ctx.save();
 // Ruined windows live behind the walkable room, with slower parallax than the floor.
 for(let i=0;i<8;i++){const x=i*365-((camera*.24+seed*11)%365)-80,y=190+gardenNoise(i,seed)*190-cameraY*.08,h=110+gardenNoise(i+20,seed)*150;ctx.globalAlpha=.24;ctx.fillStyle=p.mid;ctx.beginPath();ctx.moveTo(x-37,y+h);ctx.lineTo(x-37,y+38);ctx.quadraticCurveTo(x,y-38,x+37,y+38);ctx.lineTo(x+37,y+h);ctx.closePath();ctx.fill();ctx.strokeStyle=p.edge;ctx.lineWidth=2;ctx.stroke();ctx.globalAlpha=.12;line(x,y+30,x,y+h,p.light,1);for(let j=0;j<3;j++)line(x-29,y+60+j*39,x+29,y+60+j*39,p.edge,1);
  if(theme==='fungus'){ctx.globalAlpha=.3;line(x,y+h,x+18,y-15,p.edge,4);ellipse(x+18,y-18,36,10,p.light)}else if(theme==='silk'){ctx.globalAlpha=.18;for(let j=0;j<4;j++)line(x-70+j*42,0,x,y+50,p.light,1)}else if(theme==='bath'){ctx.globalAlpha=.12;for(let j=0;j<3;j++)ellipse(x,y+h+j*8,55+j*14,2,p.light)}
 }ctx.restore();}
function drawGardenDust(hub=false){const theme=hub?'market':currentNode?.theme||'root',[color,kind]=gardenDust[theme]||gardenDust.root,seed=hub?39:currentNode?.seed||7,cam=hub?hearthCam:camera;ctx.save();
 // Fixed populations are calculated from time; menus and long runs cannot accumulate particles.
 for(let i=0;i<54;i++){const z=i%3,s=1+z*.55,speed=kind==='water'?22:kind==='ash'?13:kind==='silk'?5:8,drift=time*(5+z*4),x=((gardenNoise(i,seed)*W+drift+Math.sin(time*.4+i)*16-cam*(.08+z*.1))%(W+30)+W+30)%(W+30)-15,y=((gardenNoise(i+100,seed)*H+(kind==='water'||kind==='ash'?1:-1)*time*speed)%(H+40)+H+40)%(H+40)-20;ctx.globalAlpha=(.11+z*.09)*(hub?.75:1);if(kind==='silk'){ctx.strokeStyle=color;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+Math.sin(time+i)*14,y+13,x+5,y+26);ctx.stroke()}else if(kind==='water'){line(x,y,x-2,y+7,color,.8)}else if(kind==='leaf'){ctx.save();ctx.translate(x,y);ctx.rotate(time*.5+i);ellipse(0,0,1.3*s,3*s,color);ctx.restore()}else{ellipse(x,y,s,s*(kind==='ash'?.55:1),color);if(i%12===0){ctx.globalAlpha=.04;ellipse(x,y,6,6,color)}}
 }ctx.restore();}
function drawGardenForeground(hub=false){const p=hub?deepThemes.root:chamberTheme(),cam=hub?hearthCam:camera,seed=hub?5:currentNode?.seed||1;ctx.save();
 // Edge framing stays out of the central action and never covers a platform surface.
 for(let side=0;side<2;side++){ctx.save();ctx.translate(side?W:0,H);ctx.scale(side?-1:1,1);for(let i=0;i<7;i++){const x=i*19-24-(cam*.12%19),h=30+gardenNoise(i+side*9,seed)*45;ctx.globalAlpha=.7;ctx.strokeStyle='#08181c';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x,12);ctx.quadraticCurveTo(x+22,-h*.45,x+13+Math.sin(time*.7+i)*3,-h);ctx.stroke();ctx.globalAlpha=.48;ellipse(x+17,-h*.6,9,3,p.edge);ellipse(x+9,-h*.82,7,3,p.mid)}ctx.restore()}
 ctx.globalAlpha=.45;for(let i=0;i<6;i++){const x=i*(W/5)-cam*.035%45,len=16+gardenNoise(i,seed)*31;ctx.strokeStyle=p.edge;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,0);ctx.quadraticCurveTo(x+12,len*.5,x+Math.sin(time*.6+i)*5,len);ctx.stroke()}ctx.restore();}
function installGardenAtmosphere(){const back=drawAmbientDetails;drawAmbientDetails=function(){drawGardenDepth();back()};
 // Replace the older generic dust, retaining its restrained floor mist.
 drawDeepAtmosphere=function(){drawGardenDust();const p=chamberTheme();ctx.save();ctx.globalAlpha=.035;for(let i=0;i<2;i++){const x=(time*9+i*650)%(W+500)-250,g=ctx.createRadialGradient(x,650,0,x,650,300);g.addColorStop(0,p.light);g.addColorStop(1,p.light+'00');ctx.fillStyle=g;ctx.fillRect(0,390,W,330)}ctx.restore()};
 const dark=drawDarkness;drawDarkness=function(){drawGardenForeground();dark()};
 const villageDraw=drawVillage;drawVillage=function(){villageDraw();drawGardenDust(true);drawGardenForeground(true)};
 worldLabel=function(x,y,text){ctx.save();ctx.font='bold 12px Georgia, serif';ctx.textAlign='center';ctx.lineJoin='round';ctx.lineWidth=3.5;ctx.strokeStyle='#071418';ctx.strokeText(text,x,y);ctx.fillStyle='#e6dfbf';ctx.fillText(text,x,y);ctx.restore()};
}
