'use strict';
const silentMoveLabels=new Set(['EXPOSED','CRACK IT','THE BROOD STIRS','SPIT','CROWN CHARGE','ROOT ERUPTION','THORN FAN','BURROW · MOVE','EARTHBREAK','SHADOW DASH','FALLING NEEDLE','SILK VOLLEY','DARK HALO','RIVET LUNGE','COIL CHARGE','SLAG ERUPTION','DOUBLE HOP','NEEDLES','SPORE MARK','SHIELD RUSH','HOOK & RUSH','LANTERN DIVE','TWO BELL RINGS','MOLT TRAIL','FLANK OR POGO']);
function drawQuietTell(e){if(e.hp<=0||e.x<camera-140||e.x>camera+W+140)return;const warning=wovenTells.has(e.mode)||['royalTell','shadowTell','broodcall','stamp','burrow','curl'].includes(e.mode),recover=e.mode==='recover';if(!warning&&!recover)return;ctx.save();const c=recover?'#c5e2bb':'#e8bd91',r=Math.max(e.w,e.h)+9;ctx.globalAlpha=recover?.55:.7;ctx.strokeStyle=c;ctx.lineWidth=1.3;
 if(recover){for(const side of [-1,1]){ctx.beginPath();ctx.arc(e.x,e.y,r,side<0?Math.PI*.8:-.2,side<0?Math.PI*1.2:.2);ctx.stroke()}}
 else{const progress=Math.min(1,(e.clock||0)/.75);ctx.beginPath();ctx.arc(e.x,e.y,r+7*(1-progress),-Math.PI*.9,-Math.PI*.1);ctx.stroke();for(const side of [-1,1]){line(e.x+side*(r+4),e.y-10,e.x+side*(r-3),e.y-4,c,1.5)}}ctx.restore()}
function installQuietCombat(){
 const notice=toast;toast=function(text,...rest){if(state==='playing'&&(String(text).startsWith('Vespara: crack the eggs')||String(text).startsWith('The Unthreaded · Your shadow remembers')||enemies.some(e=>e.hp>0&&(e.mini||e.final)&&e.name&&String(text).startsWith(e.name+' · '))))return;notice(text,...rest)};
 const label=worldLabel;worldLabel=function(x,y,text){if(silentMoveLabels.has(text))return;label(x,y,text)};
 const float=floatText;floatText=function(x,y,text,...rest){if(silentMoveLabels.has(text))return;float(x,y,text,...rest)};
 const tick=update;update=function(dt){tick(dt);if(state==='playing'&&!bossMoment&&enemies.some(e=>e.hp>0&&(e.final||e.kind==='boss'||e.mini)))$('objective').textContent=''};
 const ui=hud;hud=function(){ui();if(currentNode?.type==='boss'&&!cleared||enemies.some(e=>e.hp>0&&e.mini))$('objective').textContent='';const e=enemies.find(e=>e.hp>0&&(e.final||e.kind==='boss'||e.mini));if(e)$('bossbar').querySelector('span').textContent=e.name||lastBrood.regent.name};
 const creature=drawCreature;drawCreature=function(e){creature(e);if(!bossMoment)drawQuietTell(e)};
}
