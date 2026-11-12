'use strict';
// Quiet, optional encounters. Answers and payouts live on the route node so reopening cannot reroll them.
const rootRiddles=[
 {verse:'The more earth you take from me, the larger I become. What am I?',answers:['A hole','A seed','A hill'],hint:'Think of a beetle digging down.',why:'Every scoop of earth makes a hole larger.'},
 {verse:'I answer your call, though I have no tongue. I live in hollow halls and borrow every song. What am I?',answers:['An echo','A cricket','The wind'],hint:'Call into an empty cavern and listen.',why:'An echo repeats a sound that reaches it.'},
 {verse:'I have an eye but cannot see. A thread follows wherever I lead. What am I?',answers:['A needle','A spider','A lantern'],hint:'Nima keeps one beside her spool.',why:'Thread passes through the eye of a needle.'},
 {verse:'I show roads I cannot walk and rivers that cannot wet your wings. What am I?',answers:['A map','A mirror','A window'],hint:'Pip folds me carefully before traveling.',why:'A map marks paths and rivers without containing them.'},
 {verse:'I grow shorter while giving light. My tears harden when they cool. What am I?',answers:['A candle','A glowworm','An ember seed'],hint:'My tears are melted wax.',why:'A candle burns down and drips wax that hardens again.'},
 {verse:'Speak my name aloud, and you break me. What am I?',answers:['Silence','A promise','A shell'],hint:'You find me between the cricket’s songs.',why:'Speaking makes a sound, ending the silence.'},
 {verse:'Feed me dry wood and I grow. Give me water and I die. What am I?',answers:['A fire','A root','A mushroom'],hint:'I warm the village hearth.',why:'Fire consumes wood, while enough water puts it out.'},
 {verse:'I follow your feet when a lantern is near. Take all the light away, and I disappear. What am I?',answers:['A shadow','A footprint','A silk trail'],hint:'I am the dark shape your body casts.',why:'A shadow needs light for your body to block.'}
];
roomTypes.riddle={name:'Riddle hollow',icon:'?',color:'#dec595',desc:'Meet the Riddlekeeper. Solve a question for seeds and silk. A wrong answer seals the room and summons a hunting party.'};
function shuffledRiddles(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function riddleData(){if(currentNode?.type!=='riddle')return null;if(!currentNode.puzzle)currentNode.puzzle={id:currentNode.riddleId??0,order:shuffledRiddles([0,1,2]),wrong:[],status:'waiting',paid:false};return currentNode.puzzle}
function openRiddle(){if(state!=='playing'||currentNode?.type!=='riddle'||Math.hypot(player.x-850,player.y-623)>185)return false;riddleData();setState('dialogue');renderRiddle();return true}
function renderRiddle(){const p=riddleData();if(!p)return;const r=rootRiddles[p.id],done=p.status!=='waiting';
 $('panelcontent').innerHTML=`<div class="eyebrow">THE RIDDLEKEEPER · A QUIET HOLLOW</div><div class="speaker-emblem" style="color:#dec595">?</div><h2>${done?p.status==='solved'?'A bright little mind.':'Even roots need time.' :'What sleeps between the words?'}</h2><p class="traveler-line">${r.verse}</p>${done?`<div class="quest-brief"><b>${r.answers[0]}</b><p>${r.why}</p><strong>${p.status==='solved'?p.reward+' seeds · '+p.silk+' silk':(currentNode.riddleAmbush==='cleared'?'You survived the hunting party. The gate is open.':'No reward. The hunting party must fall before you can leave.')}</strong></div>`:`<p>${p.wrong.length?'One guess remains. <em>'+r.hint+'</em>':'Answer correctly for 6 seeds + 20 silk.<br>A wrong answer summons a difficult hunting party. Defeat it to reopen the gate.'}</p><div class="cards">${p.order.map(i=>`<button class="card" data-answer="${i}" ${p.wrong.includes(i)?'disabled':''}><span class="icon">${p.wrong.includes(i)?'×':'✧'}</span><strong>${r.answers[i]}</strong><small>${p.wrong.includes(i)?'Already tried':'Offer this answer'}</small></button>`).join('')}</div>`}<button id="riddleleave" class="${done?'primary':'secondary'}">${done?'BACK TO THE HOLLOW →':'THINK ON IT · LEAVE FOR NOW'}</button>`;
 $('panelcontent').querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>answerRiddle(Number(b.dataset.answer)));$('riddleleave').onclick=()=>setState('playing');$('panelcontent').querySelector('button:not([disabled])')?.focus();
}
function answerRiddle(index){const p=riddleData();if(state!=='dialogue'||!p||p.status!=='waiting'||!Number.isInteger(index)||!p.order.includes(index)||p.wrong.includes(index))return false;
 if(index===0){p.status='solved';p.reward=p.wrong.length?3:6;p.silk=p.wrong.length?10:20;if(!p.paid){p.paid=true;runSeeds+=p.reward;player.silk=Math.min(100,player.silk+p.silk);addScore(p.wrong.length?100:200);burst(850,580,'#e5d59c',30,160);tone(523,.3,'triangle',.045);tone(784,.45,'sine',.03);hud()}}
 else{p.wrong.push(index);tone(180,.16,'triangle',.02);if(p.wrong.length===2)p.status='missed'}renderRiddle();return true;
}
function drawRiddleHollow(){if(currentNode?.type!=='riddle')return;const p=riddleData(),solved=p.status==='solved';
 ctx.save();ctx.translate(850,650);glow(0,-95,240,'#d1b986',.13);ctx.beginPath();ctx.moveTo(-165,0);ctx.lineTo(-165,-130);ctx.bezierCurveTo(-160,-315,160,-315,165,-130);ctx.lineTo(165,0);ctx.strokeStyle='#6d7560';ctx.lineWidth=17;ctx.stroke();ctx.strokeStyle='#b1a886';ctx.lineWidth=2;ctx.stroke();
 for(let i=0;i<9;i++){const a=Math.PI+i*Math.PI/8,x=Math.cos(a)*157,y=-130+Math.sin(a)*134;outlinedEllipse(x,y,9,13,'#293b38','#b6ad80',1);worldLabel(x,y+4,['⋈','✧','†','?','❧','?','†','✧','⋈'][i])}
 for(const s of [-1,1]){ctx.fillStyle='#43584a';ctx.fillRect(s*112-20,-63,40,63);outlinedEllipse(s*112,-64,24,7,'#b3b28a','#23332e',2);glow(s*112,-81,55,solved?'#b8efd2':'#f2d396',.2);ellipse(s*112,-81,7,13+Math.sin(time*3)*2,solved?'#c6f3d7':'#e6cc8d')}
 ctx.restore();drawFriendlyBug(850,623,'keeper',1.15);ctx.save();ctx.translate(850,570);ctx.beginPath();ctx.moveTo(-26,3);ctx.lineTo(-9,-34);ctx.lineTo(28,3);finishInk('#827d64','#d3c59a',2);ellipse(-1,-9,3,3,'#e7d6a6');ctx.restore();
 worldLabel(850,352,'THE RIDDLEKEEPER');worldLabel(850,389,p.status==='waiting'?'F · A QUESTION FOR A WANDERER':solved?'A BRIGHT MIND LEAVES A LIGHT':'THE ROOTS KEEP THEIR SECRETS');
 for(let i=0;i<16;i++){const a=i*2.4+time*.14;ellipse(850+Math.cos(a)*(90+i*6),465+Math.sin(a)*80,1.5,1.5,'#e7d4a577')}
}
function installRiddles(){
 const init=initCampaign;initCampaign=function(){init();const choices=shuffledRiddles(rootRiddles.map((_,i)=>i));for(const [i,depth] of [6,10,14].entries()){const n=routeGraph[depth-1][0];Object.assign(n,{type:'riddle',title:['The Listening Hollow','The Question in the Roots','The Lantern’s Last Riddle'][i],theme:'silk',music:'silk',riddleId:choices[i]});delete n.warden}};
 const make=makeRoom;makeRoom=function(node=currentNode){make(node);if(node.type!=='riddle')return;enemies=[];shots=[];hazards=[];pods=[];trialSeals=[];walls=[];areaBursts=[];cleared=true;platforms=[{x:0,y:650,w:2200,h:100},{x:310,y:530,w:195,h:28},{x:1250,y:525,w:220,h:28},{x:1570,y:430,w:185,h:28}];riddleData();hud();toast('A quiet hollow. Press F near the Riddlekeeper, or leave through the gate.');};
 const service=roomService;roomService=function(){if(openRiddle())return;service()};
 const draw=drawTravelerRoom;drawTravelerRoom=function(){draw();drawRiddleHollow()};
 const tick=tickRootbound;tickRootbound=function(dt){tick(dt);if(currentNode?.type==='riddle')$('objective').textContent=riddleData().status==='waiting'?'F · Speak to the Riddlekeeper · answering is optional':'The question is settled · continue through the gate →'};
}
