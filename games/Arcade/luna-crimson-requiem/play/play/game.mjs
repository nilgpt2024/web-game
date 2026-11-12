import {World,WIDTH,HEIGHT,FLOOR,LENGTH,BOSS_X,CAT_X,clamp} from './world.mjs';
const $=id=>document.getElementById(id), canvas=$('game'),ctx=canvas.getContext('2d',{alpha:false});
const world=new World(), keys=new Set();let loaded=false,muted=false,pausedFrom='playing',last=0,accum=0,shake=0,flash=0,bannerTimer=0,particles=[],floaters=[],hudStamp='',lastState='title';
const textures={},images={};
const frameSpecs={
  idle0:['luna',842,651,150,251,'navy'],idle1:['luna',985,654,143,246,'navy'],idle2:['luna',1121,650,145,251,'navy'],
  attack0:['luna',339,198,191,268,'navy'],attack1:['luna',534,107,196,359,'navy'],attack2:['luna',748,21,164,445,'navy'],attack3:['luna',887,127,345,339,'navy'],attack4:['luna',1224,200,205,266,'navy'],attack5:['luna',1407,199,260,267,'navy'],
  victory:['luna',322,608,139,307,'navy'],hurt:['luna',1288,656,169,237,'navy'],crouch:['luna',1446,701,216,200,'navy'],
  boss0:['boss',40,762,136,151,'black'],boss1:['boss',180,754,169,158,'black'],boss2:['boss',359,752,166,160,'black'],boss3:['boss',538,758,137,154,'black'],
  summon0:['summon',354,568,294,274,'navy'],summon1:['summon',694,577,419,277,'navy'],summon2:['summon',1118,566,405,273,'navy'],
  walk0:['walker',102,569,303,412,'gradient'],walk1:['walker',467,570,303,412,'gradient'],walk2:['walker',811,569,308,412,'gradient'],walk3:['walker',1183,569,320,412,'gradient'],
  gun0:['gunner',53,665,325,306,'gradient'],gun1:['gunner',425,664,314,307,'gradient'],gun2:['gunner',867,664,297,308,'gradient'],
  fly0:['flyer',12,664,356,307,'gradient'],fly1:['flyer',450,658,292,313,'gradient'],fly2:['flyer',794,662,350,310,'gradient'],fly3:['flyer',1188,666,337,306,'gradient'],
  cat:['cat',52,56,1028,1291,'black']
};
function decodeFrame(spec){
  const [sheet,x,y,w,h,mode]=spec,c=document.createElement('canvas');c.width=w;c.height=h;const cctx=c.getContext('2d',{willReadFrequently:true});cctx.drawImage(images[sheet],x,y,w,h,0,0,w,h);const data=cctx.getImageData(0,0,w,h),d=data.data,seen=new Uint8Array(w*h),queue=new Int32Array(w*h);let tail=0,head=0;
  const qualifies=(i,from)=>{const k=i*4;if(d[k+3]<10)return true;const r=d[k],g=d[k+1],b=d[k+2];if(mode==='black')return Math.max(r,g,b)<24;if(mode==='navy')return r<19&&g<24&&b<52;
    if(from<0)return true;const f=from*4;return Math.max(Math.abs(r-d[f]),Math.abs(g-d[f+1]),Math.abs(b-d[f+2]))<13||Math.max(r,g,b)<18;};
  const add=(i,from)=>{if(i<0||i>=w*h||seen[i]||!qualifies(i,from))return;seen[i]=1;queue[tail++]=i;};
  for(let i=0;i<w;i++){add(i,-1);add((h-1)*w+i,-1);}for(let j=1;j<h-1;j++){add(j*w,-1);add(j*w+w-1,-1);}
  while(head<tail){const i=queue[head++];if(i%w>0)add(i-1,i);if(i%w<w-1)add(i+1,i);if(i>=w)add(i-w,i);if(i<w*(h-1))add(i+w,i);}
  for(let i=0;i<w*h;i++)if(seen[i])d[i*4+3]=0;cctx.putImageData(data,0,0);return c;
}
async function loadAssets(){
  try{const names=['luna','boss','summon','walker','gunner','flyer','cat','cathedral'];await Promise.all(names.map(name=>new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>{images[name]=image;resolve();};image.onerror=()=>reject(new Error(name));image.src='../assets/'+name+'.png';})));
    for(const [name,spec]of Object.entries(frameSpecs))textures[name]=decodeFrame(spec);
    loaded=true;$('start').disabled=false;$('start').textContent='物語をはじめる　→';$('load-status').textContent='ENTER またはボタンでスタート';
  }catch(e){$('load-status').textContent='素材を読み込めませんでした。再読み込みしてください。';$('start').textContent='再読み込み';$('start').disabled=false;$('start').onclick=()=>location.reload();console.error(e);}
}
class Sound {
  constructor(){this.context=null;this.master=null;this.music=new Audio('../assets/bgm.mp3');this.music.loop=true;this.music.volume=.43;this.music.preload='auto';this.hurt=new Audio('../assets/hurt.wav');this.hurt.volume=.85;this.hurt.preload='auto';this.unlocked=false;}
  async unlock(){if(!this.context){this.context=new(window.AudioContext||window.webkitAudioContext)();this.master=this.context.createGain();this.master.gain.value=muted?0:.65;this.master.connect(this.context.destination);}await this.context.resume();this.unlocked=true;if(!muted)this.music.play().catch(()=>{});}
  tone(freq,end,duration,type='sine',volume=.2,delay=0){if(!this.context)return;const c=this.context,t=c.currentTime+delay,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(freq,t);o.frequency.exponentialRampToValueAtTime(Math.max(20,end),t+duration);g.gain.setValueAtTime(.001,t);g.gain.linearRampToValueAtTime(volume,t+.01);g.gain.exponentialRampToValueAtTime(.001,t+duration);o.connect(g);g.connect(this.master);o.start(t);o.stop(t+duration+.01);}
  noise(duration,filterFreq,volume=.25,delay=0){if(!this.context)return;const c=this.context,t=c.currentTime+delay,buffer=c.createBuffer(1,Math.ceil(c.sampleRate*duration),c.sampleRate),a=buffer.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1;const n=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();n.buffer=buffer;f.type='bandpass';f.frequency.setValueAtTime(filterFreq,t);f.frequency.exponentialRampToValueAtTime(250,t+duration);g.gain.setValueAtTime(volume,t);g.gain.exponentialRampToValueAtTime(.001,t+duration);n.connect(f);f.connect(g);g.connect(this.master);n.start(t);}
  effect(name){if(muted||!this.context)return;
    if(name==='swing'){this.noise(.16,5200,.65);this.tone(950,220,.12,'triangle',.09);}
    if(name==='slash'||name==='bossHit'||name==='deflect'){this.noise(.19,2100,.85);this.tone(180,52,.17,'sawtooth',.17);this.tone(1650,450,.09,'triangle',.1);}
    if(name==='stomp'){this.tone(700,145,.15,'sine',.45);this.tone(220,520,.13,'triangle',.1);}
    if(name==='jump')this.tone(210,600,.14,'sine',.07);
    if(name==='hurt'){this.hurt.currentTime=0;this.hurt.play().catch(()=>{});this.tone(160,65,.15,'triangle',.16);}
    if(name==='shot'){this.noise(.13,1800,.25);this.tone(650,160,.12,'square',.06);}
    if(name==='magic')this.tone(250,900,.32,'sawtooth',.12);
    if(name==='thunder'){this.noise(.65,900,.7);this.tone(100,28,.6,'sawtooth',.3);}
    if(name==='summon'){this.noise(1.2,2300,.8);[65,98,131,196].forEach((f,i)=>this.tone(f,f*3,1.4,'sawtooth',.12,i*.09));[660,880,1320].forEach((f,i)=>this.tone(f,f/2,.5,'triangle',.14,.4+i*.13));}
    if(name==='summonSlash'){this.noise(.3,3500,.65);this.tone(450,80,.2,'sawtooth',.13);}
    if(name==='bossDeath'){this.noise(2.3,1500,.85);[.05,.3,.6,.95].forEach(t=>{this.tone(120,30,.6,'sawtooth',.3,t);this.noise(.7,2600,.5,t);});}
    if(name==='celebrate'){this.noise(.3,2000,.35);[523,659,784,1047,784,1047,1319].forEach((f,i)=>this.tone(f,f,.32,'triangle',.3,i*.13));}
    if(name==='meow'){this.tone(720,980,.16,'triangle',.12);this.tone(980,430,.32,'triangle',.1,.13);}
  }
  mute(){muted=!muted;if(this.master)this.master.gain.value=muted?0:.65;this.music.muted=muted;this.hurt.muted=muted;$('sound').innerHTML=muted?'♪ <span>音声 OFF</span>':'♪ <span>音声 ON</span>';if(!muted&&world.state==='playing')this.unlock();}
}
const sound=new Sound();
function sprite(name,x,foot,scale=1,face=1,original=1,alpha=1){const image=textures[name];if(!image)return;ctx.save();ctx.translate(Math.round(x),Math.round(foot));if(face!==original)ctx.scale(-1,1);ctx.globalAlpha=alpha;ctx.drawImage(image,Math.round(-image.width*scale/2),Math.round(-image.height*scale),Math.round(image.width*scale),Math.round(image.height*scale));ctx.restore();}
function burst(x,y,color,count=20,power=150){for(let i=0;i<count;i++){const angle=Math.random()*Math.PI*2,speed=Math.random()*power;particles.push({x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed-40,life:.4+Math.random()*.6,max:1,color,size:2+Math.floor(Math.random()*4),gravity:300});}}
function consumeEvents(){for(const e of world.events){sound.effect(e.type);
    if(e.type==='banner'){$('announcement').textContent=e.text;$('announcement').style.opacity='1';bannerTimer=2.5;}
    if(['slash','bossHit','deflect','stomp'].includes(e.type)){burst(e.x,e.y,e.type==='stomp'?'#f7d987':'#e8c2ff',e.type==='bossHit'?35:18);shake=e.type==='bossHit'?5:2;if(e.score)floaters.push({x:e.x,y:e.y,text:'+'+e.score,life:.7});}
    if(e.type==='hurt'){shake=9;flash=.17;burst(e.x,e.y,'#f56479',16);}
    if(e.type==='summon'){shake=11;flash=.15;burst(e.x,e.y,'#b187ed',65,450);}
    if(e.type==='summonSlash'){shake=5;burst(e.x,e.y,'#c7a7ff',20,250);}
    if(e.type==='thunder'){shake=8;flash=.1;burst(e.x,FLOOR,'#ddb8ff',25,270);}
    if(e.type==='bossDeath'){shake=20;flash=.3;burst(e.x,e.y,'#bf74e9',120,420);}
    if(e.type==='celebrate'){shake=5;flash=.15;for(let i=0;i<220;i++)particles.push({x:CAT_X+(Math.random()-.5)*140,y:95,vx:(Math.random()-.5)*260,vy:-60+Math.random()*130,life:7,max:7,color:['#e0b254','#e87492','#8ba8de','#bc8de2','#f8e5b2'][i%5],size:3+Math.random()*4,gravity:25,confetti:true});}
  }world.events=[];}
function drawGround(){
  const cam=world.camera;ctx.fillStyle='#171720';ctx.fillRect(0,FLOOR,WIDTH,HEIGHT-FLOOR);ctx.fillStyle='#4d414b';ctx.fillRect(0,FLOOR,WIDTH,5);ctx.fillStyle='#8b6b64';ctx.fillRect(0,FLOOR,WIDTH,2);
  for(let row=0;row<4;row++){const y=FLOOR+7+row*22;for(let x=-(cam%78)-78+(row%2)*39;x<WIDTH;x+=78){ctx.fillStyle=(Math.floor((x+cam)/78)+row)%3===0?'#302936':'#272432';ctx.fillRect(Math.floor(x),y,74,18);ctx.fillStyle='#40343d';ctx.fillRect(Math.floor(x)+2,y,70,2);ctx.fillStyle='#10121d';ctx.fillRect(Math.floor(x)+1,y+17,73,2);}}
  for(const p of world.platforms){const x=p.x-cam;if(x>WIDTH||x+p.w<0)continue;ctx.fillStyle='#151621';ctx.fillRect(x,p.y,p.w,25);ctx.fillStyle='#97766c';ctx.fillRect(x,p.y,p.w,3);ctx.fillStyle='#4b3e4b';ctx.fillRect(x,p.y+3,p.w,8);for(let i=0;i<p.w;i+=30){ctx.fillStyle='#6a5260';ctx.fillRect(x+i+2,p.y+12,25,8);}ctx.fillStyle='#342634';ctx.fillRect(x+9,p.y+25,12,13);ctx.fillRect(x+p.w-21,p.y+25,12,13);}
}
function drawRoom(){const x=7350-world.camera;if(x>WIDTH)return;ctx.fillStyle='#13111dcf';ctx.fillRect(x,0,1100,FLOOR);ctx.fillStyle='#4b343c';ctx.fillRect(x,0,24,FLOOR);ctx.fillStyle='#c29656';ctx.fillRect(x+7,0,3,FLOOR);const cx=CAT_X-world.camera;
  ctx.fillStyle='#9e6f4933';ctx.beginPath();ctx.moveTo(cx-110,FLOOR);ctx.lineTo(cx-36,70);ctx.lineTo(cx+36,70);ctx.lineTo(cx+110,FLOOR);ctx.fill();
  for(const a of [cx-210,cx+185]){ctx.fillStyle='#352b34';ctx.fillRect(a,60,22,FLOOR-60);ctx.fillStyle='#806151';ctx.fillRect(a,60,3,FLOOR-60);ctx.fillStyle='#645043';ctx.fillRect(a-8,54,38,12);}
  ctx.fillStyle='#563040';ctx.fillRect(cx-120,FLOOR-4,240,6);ctx.fillStyle='#bf9255';ctx.fillRect(cx-120,FLOOR-4,240,2);
  ctx.strokeStyle='#b39161';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(cx,0);ctx.lineTo(cx,82);ctx.stroke();
  const split=world.raisedSword?Math.min(50,(world.ending-3.15)*30):0;ctx.save();ctx.translate(cx,102);for(const sign of [-1,1]){ctx.save();ctx.translate(sign*split,split*.9);ctx.rotate(sign*split*.025);ctx.fillStyle=sign<0?'#b24f68':'#d4aa60';ctx.beginPath();ctx.arc(0,0,22,sign<0?Math.PI/2:-Math.PI/2,sign<0?Math.PI*1.5:Math.PI/2);ctx.fill();ctx.strokeStyle='#edcc85';ctx.stroke();ctx.restore();}ctx.restore();
  if(!world.pickedCat)sprite('cat',cx,FLOOR,0.041,1,1);
}
function render(){
  ctx.imageSmoothingEnabled=false;ctx.fillStyle='#0b0d1b';ctx.fillRect(0,0,WIDTH,HEIGHT);ctx.save();if(shake>0)ctx.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake*.65);
  const cam=world.camera,t=world.time;
  if(images.cathedral){const bw=1120,bh=747,offset=(cam*.14)%bw;for(let i=-1;i<2;i++)ctx.drawImage(images.cathedral,Math.round(i*bw-offset),-125,bw,bh);}
  ctx.fillStyle='#11102433';ctx.fillRect(0,0,WIDTH,HEIGHT);const haze=ctx.createLinearGradient(0,300,0,FLOOR);haze.addColorStop(0,'#311b3300');haze.addColorStop(1,'#361e4055');ctx.fillStyle=haze;ctx.fillRect(0,300,WIDTH,FLOOR-300);
  for(let i=0;i<32;i++){const x=((i*173.7-cam*.24+t*(i%2?6:-4))%WIDTH+WIDTH)%WIDTH,y=80+(i*53.4)%340+Math.sin(t*.7+i)*15;ctx.fillStyle=i%4===0?'#d0846844':'#cbbfca30';ctx.fillRect(x,y,i%3===0?2:1,1);}
  drawRoom();drawGround();
  for(const e of world.enemies){if(e.gone||e.x-cam<-150||e.x-cam>WIDTH+150)continue;if(e.dead&&Math.floor(e.dead*40)%2===0)continue;const x=e.x-cam,bob=e.type==='walker'?Math.sin(t*12+e.id)*2:0;
    ctx.fillStyle='#0005';ctx.beginPath();ctx.ellipse(x,FLOOR+1,25,5,0,0,Math.PI*2);ctx.fill();
    if(e.type==='walker')sprite('walk'+(Math.floor(t*7)%4),x,e.y+bob,.18,-1,1);
    if(e.type==='gunner'){sprite('gun'+(e.windup>0?2:Math.floor(t*2)%2),x,e.y,.22,e.face,-1);if(e.windup>0){ctx.fillStyle='#ffdb7b';ctx.fillRect(x+e.face*28-3,e.y-48,6+e.windup*14,6);}}
    if(e.type==='flyer'){sprite('fly'+(e.attack>0?2:Math.floor(t*8)%2===0?0:3),x,e.y,.205,e.face,-1);if(e.attack>0){ctx.strokeStyle='#ffe8aab0';ctx.lineWidth=3;ctx.beginPath();ctx.arc(x+e.face*28,e.y-30,32,-1.6,1.6);ctx.stroke();}}
  }
  const b=world.boss;
  if(b.active&&(!b.dead||b.deathTime>0)){
    const x=b.x-cam;ctx.save();if(b.dead)ctx.globalAlpha=b.deathTime/2.4;const glow=ctx.createRadialGradient(x,b.y-75,5,x,b.y-75,135);glow.addColorStop(0,'#aa58dd55');glow.addColorStop(1,'#793fe900');ctx.fillStyle=glow;ctx.fillRect(x-140,b.y-220,280,280);
    ctx.strokeStyle='#a365c84d';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(x,FLOOR-1,95,16,0,0,Math.PI*2);ctx.stroke();
    for(let i=0;i<12;i++){const a=t*1.5+i*.6,px=x+Math.sin(a)*80,py=FLOOR-10-((t*80+i*19)%190);ctx.fillStyle=i%2?'#bf6ff095':'#7932ad70';ctx.fillRect(px,py,4+i%3,10);}
    if(!(b.inv>0&&Math.floor(t*16)%2))sprite('boss'+(b.inv>0?3:b.cast>0?2:b.phase%3===2?1:0),x,b.y,1.15,-1,-1);ctx.restore();
  }
  for(const shot of world.bullets){const x=shot.x-cam;ctx.save();ctx.shadowColor=shot.magic?'#a45bf0':'#ffd362';ctx.shadowBlur=16;ctx.fillStyle=shot.magic?'#b878ed':'#ffdd84';ctx.beginPath();ctx.arc(x,shot.y,shot.w/2,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle=shot.magic?'#f3d4ff':'#fff5bb';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,shot.y,shot.w/2-3,t*4,t*4+Math.PI*1.7);ctx.stroke();ctx.fillStyle='#fff4db';ctx.font='bold 13px serif';ctx.textAlign='center';ctx.fillText('♪',x,shot.y+5);ctx.restore();}
  for(const bolt of world.lightning){const x=bolt.x-cam;if(bolt.delay>0){ctx.fillStyle='#c15ceb44';ctx.fillRect(x-23,FLOOR-8,46,8);ctx.strokeStyle=Math.floor(t*10)%2?'#eb99ec':'#9e50c1';ctx.lineWidth=2;ctx.setLineDash([5,8]);ctx.beginPath();ctx.moveTo(x,40);ctx.lineTo(x,FLOOR-8);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='#ffd6f7';ctx.font='bold 17px sans-serif';ctx.textAlign='center';ctx.fillText('!',x,FLOOR-17);}else {ctx.strokeStyle='#dfb0ff';ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(x-8,0);for(let y=0;y<FLOOR;y+=35)ctx.lineTo(x+(Math.random()-.5)*34,y);ctx.lineTo(x,FLOOR);ctx.stroke();ctx.strokeStyle='#fff0ff';ctx.lineWidth=4;ctx.stroke();}}
  const p=world.player,x=p.x-cam;const ending=world.state==='ending'||world.state==='clear';
  ctx.fillStyle='#0006';ctx.beginPath();ctx.ellipse(x,p.ground?p.y+2:FLOOR,23,5,0,0,Math.PI*2);ctx.fill();
  if(!(p.inv>0&&Math.floor(t*16)%2)){
    let frame='idle'+(Math.abs(p.vx)>15?Math.floor(t*9)%3:Math.floor(t*1.7)%3),sc=.37,foot=p.y+(p.ground&&Math.abs(p.vx)>10?Math.sin(t*19)*1.5:0);
    if(p.crouch){frame='crouch';sc=.29;}else if(p.attack>0)frame='attack'+Math.min(5,Math.floor((.27-p.attack)/.27*6));else if(p.inv>1.27&&p.inv<2)frame='hurt';
    if(ending&&world.raisedSword){frame='victory';sc=.37;}
    // The reference's idle and damage row faces left; its attack row faces right.
    const nativeFace=frame.startsWith('idle')||frame==='hurt'||frame==='crouch'?-1:1;
    sprite(frame,x,foot,sc,p.face,nativeFace);
    if(ending&&world.pickedCat)sprite('cat',x+13,p.y-34,.025,1,1);
    if(p.attack>.03){ctx.save();ctx.translate(x,p.y-(p.crouch?25:46));ctx.scale(p.face,1);ctx.strokeStyle='#e8e6ffce';ctx.lineWidth=4;ctx.beginPath();ctx.arc(8,0,70,-1.25+(.27-p.attack)*7,.6+(.27-p.attack)*7);ctx.stroke();ctx.strokeStyle='#968cd66b';ctx.lineWidth=12;ctx.stroke();ctx.restore();}
  }
  if(world.summon){const s=world.summon,st=s.time;let sx,sy,face;
    if(st<.7){sx=-220+st/.7*380;sy=360;face=1;}
    else if(st<5.3){const part=(st-.7)/.92,index=Math.floor(part),u=part-index;face=index%2===0?1:-1;sx=face===1?-230+u*1420:1190-u*1420;sy=220+Math.sin(u*Math.PI*2+index)*95+(index%2)*70;}
    else {face=1;sx=150+(st-5.3)*1450;sy=330-(st-5.3)*80;}
    ctx.save();ctx.globalAlpha=.12;ctx.fillStyle='#9c5cdd';ctx.fillRect(0,0,WIDTH,HEIGHT);ctx.restore();
    for(let i=5;i>0;i--)sprite('summon'+(Math.floor(st*11)%3),sx-face*i*27,sy+i*3,.7,face,-1,.035*(6-i));sprite('summon'+(Math.floor(st*11)%3),sx,sy,.7,face,-1,.95);
    ctx.strokeStyle='#e2c7ffbd';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(sx-face*150,sy-70);ctx.lineTo(sx+face*130,sy-130);ctx.stroke();
  }
  for(const f of particles){ctx.globalAlpha=Math.min(1,f.life/(f.confetti?1:.4));ctx.fillStyle=f.color;const fx=f.x-cam;ctx.save();ctx.translate(fx,f.y);if(f.confetti)ctx.rotate(t*3+f.x);ctx.fillRect(-f.size/2,0,f.size,f.confetti?f.size/2:f.size);ctx.restore();}ctx.globalAlpha=1;
  for(const f of floaters){ctx.fillStyle='#f8ddb6';ctx.font='bold 14px monospace';ctx.textAlign='center';ctx.globalAlpha=f.life/.7;ctx.fillText(f.text,f.x-cam,f.y);}ctx.globalAlpha=1;
  if(world.state==='title'&&loaded){sprite('idle0',740+Math.sin(t*.8)*2,FLOOR,.59,1,-1);sprite('cat',832,FLOOR,.044,1,1);}
  if(flash>0){ctx.fillStyle='rgba(240,207,239,'+Math.min(.45,flash*2)+')';ctx.fillRect(0,0,WIDTH,HEIGHT);}ctx.restore();
}
function updateHUD(){const p=world.player,b=world.boss;const stamp=[p.hp,world.charges,world.restarts,world.score,world.lastSection,b.hp,b.active,b.dead,world.state].join(':');if(stamp===hudStamp)return;hudStamp=stamp;
  $('hud').hidden=world.state==='title';$('health-count').textContent=p.hp+' / 10';$('hearts').innerHTML=Array.from({length:10},(_,i)=>'<i class="'+(i>=p.hp?'empty':'')+'"></i>').join('');$('hearts').setAttribute('aria-label','体力 '+p.hp+' / 10');$('lives').textContent=world.restarts;$('charges').textContent=Array.from({length:3},(_,i)=>i<world.charges?'◆':'◇').join(' ');$('score').textContent=String(world.score).padStart(6,'0');$('location').textContent=['旧市街','崩れた回廊','大聖堂への道','深淵の祭壇','小さな礼拝室'][Math.max(0,world.lastSection)];$('objective').textContent=b.dead?'右奥の部屋で猫を救おう':b.active?'雷の予告を避け、魔法弾を斬ろう':'音符の魔物を倒し、街の奥へ';$('boss-hud').hidden=!b.active||b.dead;$('boss-fill').style.width=(b.hp*10)+'%';$('boss-count').textContent=b.hp+' / 10';
}
function syncOverlay(){if(lastState===world.state)return;lastState=world.state;const state=world.state;$('overlay').hidden=['playing','ending'].includes(state);$('title-card').hidden=state!=='title';$('state-card').hidden=state==='title';$('touch-controls').style.visibility=state==='playing'?'visible':'hidden';if(['paused','dead','clear','title'].includes(state))sound.music.pause();else if(!muted)sound.music.play().catch(()=>{});
  if(state==='paused'){$('state-eyebrow').textContent='TAKE A BREATH';$('state-title').textContent='ひと休み';$('state-text').textContent='Space / W / ↑：ジャンプ　J / Z：剣　K / X：召喚\nA・D / ←→：移動　S / ↓：しゃがむ\nEsc または P で再開';$('resume').textContent='冒険に戻る';}
  if(state==='dead'){$('state-eyebrow').textContent=world.restarts>0?'THE STORY CONTINUES':'GAME OVER';$('state-title').textContent=world.restarts>0?'まだ、終われない。':'また、月の街で。';$('state-text').textContent=world.restarts>0?'その場で体力を回復して復活できます。\n残り '+world.restarts+' 回 ／ 召喚の残り回数は引き継ぎます。':'復活回数を使い切りました。\nもう一度、あの子を迎えにいこう。';$('resume').textContent=world.restarts>0?'その場で復活　↵':'はじめから挑戦　↵';}
  if(state==='clear'){$('state-eyebrow').textContent='STAGE CLEAR';$('state-title').textContent='おかえり、小さな相棒。';const min=Math.floor(world.time/60),sec=String(Math.floor(world.time%60)).padStart(2,'0');$('state-text').textContent='猫を無事に救い出しました。\nSCORE '+String(world.score).padStart(6,'0')+'   /   TIME '+min+':'+sec+'\n討伐 '+world.kills+' 体　・　復活残り '+world.restarts+' 回';$('resume').textContent='もう一度、冒険する';}
}
function start(){if(!loaded)return;keys.clear();particles=[];floaters=[];world.start();sound.music.currentTime=0;sound.unlock();$('overlay').hidden=true;canvas.focus();syncOverlay();}
function resume(){if(world.state==='paused'){world.state=pausedFrom;sound.unlock();}else if(world.state==='dead'&&world.restarts>0){world.revive();sound.unlock();}else start();keys.clear();canvas.focus();syncOverlay();}
function togglePause(){if(world.state==='playing'){pausedFrom=world.state;world.state='paused';keys.clear();syncOverlay();}else if(world.state==='paused')resume();}
let jumpPending=false,jumpReleased=false,summonPending=false;
function keyDown(code,repeat=false){if(['ArrowLeft','ArrowRight','ArrowDown','Space','KeyA','KeyD','KeyS','KeyJ','KeyZ','KeyK','KeyX','KeyW','ArrowUp'].includes(code))keys.add(code);if(repeat)return;if(code==='Enter'){if(world.state==='title')start();else if(['paused','dead','clear'].includes(world.state))resume();}if(['Escape','KeyP'].includes(code))togglePause();if(code==='KeyM')sound.mute();if(code==='KeyF')fullscreen();if(['Space','KeyW','ArrowUp'].includes(code))jumpPending=true;if(['KeyK','KeyX'].includes(code))summonPending=true;}
function keyUp(code){keys.delete(code);if(['Space','KeyW','ArrowUp'].includes(code))jumpReleased=true;}
const gameCodes=['ArrowLeft','ArrowRight','ArrowDown','ArrowUp','Space','KeyA','KeyD','KeyS','KeyW','KeyJ','KeyZ','KeyK','KeyX','Enter','Escape','KeyP','KeyF','KeyM'];
window.addEventListener('keydown',e=>{if(gameCodes.includes(e.code)){if(!(e.target instanceof HTMLButtonElement&&['Space','Enter'].includes(e.code)))e.preventDefault();keyDown(e.code,e.repeat);}});window.addEventListener('keyup',e=>{if(gameCodes.includes(e.code))e.preventDefault();keyUp(e.code);});
window.addEventListener('blur',()=>{keys.clear();jumpPending=false;summonPending=false;if(world.state==='playing')togglePause();});document.addEventListener('visibilitychange',()=>{if(document.hidden&&world.state==='playing')togglePause();});
async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await $('stage').requestFullscreen();}catch{$('announcement').textContent='ブラウザの全画面表示をご利用ください';bannerTimer=2;}}
$('start').onclick=start;$('resume').onclick=resume;$('pause').onclick=togglePause;$('sound').onclick=()=>{sound.unlock();sound.mute();};$('fullscreen').onclick=fullscreen;$('back-title').onclick=()=>{world.reset();particles=[];floaters=[];keys.clear();sound.music.pause();syncOverlay();};
for(const button of document.querySelectorAll('[data-key]')){const code=button.dataset.key;button.addEventListener('pointerdown',e=>{e.preventDefault();button.setPointerCapture(e.pointerId);keyDown(code);});for(const type of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(type,e=>{e.preventDefault();keyUp(code);});}
function tick(now){const dt=Math.min(.05,(now-(last||now))/1000);last=now;accum+=dt;if(loaded){while(accum>=1/60){const input={left:keys.has('ArrowLeft')||keys.has('KeyA'),right:keys.has('ArrowRight')||keys.has('KeyD'),down:keys.has('ArrowDown')||keys.has('KeyS'),attack:keys.has('KeyJ')||keys.has('KeyZ'),jump:jumpPending,jumpReleased,summon:summonPending};world.update(1/60,input);jumpPending=false;jumpReleased=false;summonPending=false;accum-=1/60;}consumeEvents();}else accum=0;
  if(world.state!=='paused'){for(const p of particles){p.life-=dt;p.vy+=p.gravity*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.confetti)p.vx*=.997;}particles=particles.filter(p=>p.life>0);for(const f of floaters){f.life-=dt;f.y-=45*dt;}floaters=floaters.filter(f=>f.life>0);shake=Math.max(0,shake-dt*30);flash=Math.max(0,flash-dt);bannerTimer-=dt;if(bannerTimer<=0)$('announcement').style.opacity='0';}
  syncOverlay();updateHUD();render();requestAnimationFrame(tick);
}
loadAssets();requestAnimationFrame(tick);
