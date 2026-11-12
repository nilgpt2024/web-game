/* Simulation uses seconds and world pixels. It has no dependency on the DOM. */
(function (root) {
  'use strict';
  const FLOOR = 555, WIDTH = 1280;
  const ROSTER = [
    {id:'crimson',name:'猩红伯爵',role:'力量型',tag:'鲜血是他的王权。',color:'#f25369',accent:'#ffc1b1',asset:'crimson-earl',hp:1200,speed:265,power:1.13,skills:['血刃','血潮','猩红升击'],drain:'鲜血契约',super:'赤潮终焉',desc:['向前射出血刃，可跳跃躲避','地面血浪，命中击倒','跃起血刃，将近处对手挑空']},
    {id:'night',name:'夜幕贵族',role:'控制型',tag:'在他的凝视中，长夜降临。',color:'#aa87ff',accent:'#e1cfff',asset:'night-aristocrat',hp:1080,speed:245,power:1,skills:['沉眠凝视','暗蚀球','时滞领域'],drain:'梦魇汲取',super:'永夜审判',desc:['近中距离催眠，使对手短暂失去行动','暗球命中后造成减速','在前方留下持续减速领域']},
    {id:'bat',name:'蝠影公爵',role:'速度型',tag:'你击中的，只是他的残影。',color:'#58e4dc',accent:'#c6fff4',asset:'bat-duke',hp:1000,speed:345,power:.94,skills:['影分身','蝠群疾走','虚空瞬移'],drain:'夜翼噬咬',super:'千蝠葬礼',desc:['分身向前突袭，本体留在原地','三波蝙蝠群追击前方','瞬移至附近对手身后，接背袭']},
    {id:'eclipse',name:'月蚀君王',role:'综合型',tag:'披风展开，月光俯首。',color:'#f1c779',accent:'#fff2c5',asset:'eclipse-king',hp:1140,speed:280,power:1.05,skills:['月蚀变相','王幕横扫','引力血环'],drain:'王之初拥',super:'月蚀真身',desc:['变身五秒，提升力量与移动速度','大范围披风横扫，命中击倒','在前方生成引力环，牵引并持续伤害']}
  ];
  ROSTER.forEach(Object.freeze);
  const BASIC = {
    light:{name:'轻攻击',wind:.12,active:.13,recovery:.19,damage:60,range:140,knock:170,stun:.23,cost:0,cd:0,pose:4},
    heavy:{name:'重攻击',wind:.26,active:.18,recovery:.32,damage:115,range:170,knock:300,stun:.4,cost:0,cd:0,pose:4},
    cloak:{name:'披风攻击',wind:.2,active:.24,recovery:.3,damage:90,range:225,knock:260,stun:.32,cost:0,cd:0,pose:6},
    drain:{wind:.24,active:.18,recovery:.7,damage:95,range:110,knock:0,stun:.8,cost:15,cd:3.5,pose:10,grab:true},
    s1:{wind:.25,active:.2,recovery:.34,damage:125,range:195,knock:230,stun:.32,cost:12,cd:1.8,pose:7},
    s2:{wind:.32,active:.25,recovery:.4,damage:145,range:240,knock:300,stun:.4,cost:20,cd:2.8,pose:7},
    s3:{wind:.34,active:.3,recovery:.35,damage:165,range:200,knock:310,stun:.5,cost:25,cd:4,pose:7},
    super:{wind:.48,active:.5,recovery:.65,damage:290,range:340,knock:480,stun:.7,cost:100,cd:1,pose:11,down:true}
  };
  function specFor(id,key) {
    const c=ROSTER.find(c=>c.id===id);if(!BASIC[key])return null;
    const s={...BASIC[key],key,kind:'melee',name:BASIC[key].name||c[key]||c.skills[Number(key[1])-1]};
    if(key==='s1') {
      if(id==='crimson')Object.assign(s,{kind:'projectile',fx:'blade',speed:680,w:95,h:115});
      if(id==='night')Object.assign(s,{fx:'hypnosis',range:310,damage:35,stun:1.1});
      if(id==='bat')Object.assign(s,{kind:'projectile',fx:'clone',speed:750,w:130,h:190,damage:105,pose:5});
      if(id==='eclipse')Object.assign(s,{kind:'burst',fx:'transform',range:145,damage:65,transform:5});
    }
    if(key==='s2') {
      if(id==='crimson')Object.assign(s,{kind:'projectile',fx:'tide',speed:420,w:150,h:155,down:true});
      if(id==='night')Object.assign(s,{kind:'projectile',fx:'orb',speed:380,w:105,h:110,slow:2.4});
      if(id==='bat')Object.assign(s,{kind:'swarm',fx:'bats',speed:560,w:115,h:100,damage:48});
      if(id==='eclipse')Object.assign(s,{fx:'royal',range:285,pose:6,down:true});
    }
    if(key==='s3') {
      if(id==='crimson')Object.assign(s,{fx:'rise',range:175,pose:4,down:true});
      if(id==='night')Object.assign(s,{kind:'field',fx:'slow',radius:185,ttl:3.2,damage:28,slow:2.5});
      if(id==='bat')Object.assign(s,{kind:'blink',fx:'teleport',range:155,pose:4,damage:125});
      if(id==='eclipse')Object.assign(s,{kind:'field',fx:'gravity',radius:195,ttl:3,damage:36,slow:1.5});
    }
    if(key==='super') {
      if(id==='crimson')Object.assign(s,{kind:'projectile',fx:'bloodstorm',speed:480,w:230,h:320,damage:340});
      if(id==='night')Object.assign(s,{kind:'field',fx:'judgment',radius:245,ttl:2.5,damage:108});
      if(id==='bat')Object.assign(s,{kind:'swarm',fx:'bats',speed:720,w:145,h:140,damage:55});
      if(id==='eclipse')Object.assign(s,{kind:'burst',fx:'eclipse',range:310,transform:8,damage:275});
    }
    return s;
  }
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const overlap=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
  function makeFighter(id,x,index,energy) {const data=ROSTER.find(c=>c.id===id);return {index,data,x,y:FLOOR,vx:0,vy:0,face:index===0?1:-1,hp:data.hp,energy,state:'idle',age:0,attack:null,stun:0,down:0,invuln:0,slow:0,transform:0,guard:false,ground:true,cd:{},ai:.4,combo:0,comboTime:0,buffer:null,grabbed:0,lastHit:null};}
  class Match {
    constructor(player='crimson',enemy='night',mode='training',random=Math.random) {
      // Start close enough for the first button press to demonstrate a real hit.
      // Duel mode still leaves room to move, while training mode is deliberately
      // a compact test range so every basic attack can be verified immediately.
      const startX=mode==='training'?540:430;
      const enemyX=mode==='training'?700:850;
      this.mode=mode;this.rng=random;this.fighters=[makeFighter(player,startX,0,mode==='training'?100:45),makeFighter(enemy,enemyX,1,45)];
      this.phase='intro';this.intro=1.6;this.time=99;this.clock=0;this.tickCount=0;this.hitstop=0;this.ending=0;this.winner=null;this.events=[];this.projectiles=[];this.fields=[];this.scheduled=[];this.lastDamage=0;this.totalHits=0;
    }
    emit(type,props={}){this.events.push({type,t:this.clock,...props});if(this.events.length>240)this.events.shift();}
    takeEvents(){return this.events.splice(0);}
    state(f,state){if(f.state!==state){f.state=state;f.age=0;}}
    hurtbox(f){return {x:f.x-32,y:f.y-210,w:64,h:210};}
    attackbox(f,s){const h=s.fx==='rise'?235:(s.key==='cloak'||s.fx==='royal'?195:130);return {x:f.face>0?f.x+15:f.x-s.range,y:f.y-(s.fx==='rise'?270:195),w:s.range-15,h};}
    act(f,key){
      const s=specFor(f.data.id,key);if(!s||f.hp<=0||f.stun>0||f.down>0||f.attack)return false;
      if((f.cd[key]||0)>0||f.energy+.001<s.cost){if(f.index===0)this.emit('notice',{text:(f.cd[key]||0)>0?'技能冷却中':'聚气不足，按住 Q 聚气'});return false;}
      f.energy=Math.max(0,f.energy-s.cost);f.cd[key]=s.cd;f.guard=false;f.attack={s,t:0,triggered:false,hit:false};this.state(f,key);f.vx=0;
      if(key==='super'){f.invuln=Math.max(f.invuln,.58);this.emit('super',{f:f.index,name:s.name,color:f.data.color});}
      this.emit('action',{f:f.index,key,name:s.name});return true;
    }
    aiInput(f,dt) {
      if(this.mode==='training')return {};
      const p=this.fighters[0],dx=p.x-f.x,dist=Math.abs(dx);f.ai-=dt;
      const cmd={move:dist>142?Math.sign(dx):dist<91?-Math.sign(dx):0};
      if(f.attack||f.stun>0||f.down>0)return {};
      if(p.attack&&dist<210&&this.rng()<.045)cmd.guard=true;
      if(f.ai<=0){f.ai=.4+this.rng()*.5;const r=this.rng();
        if(f.energy>=100&&dist<370)cmd.action='super';
        else if(dist<150)cmd.action=r<.34?'light':r<.61?'heavy':r<.79?'cloak':r<.9?'drain':'s1';
        else if(dist<480&&r<.65)cmd.action=r<.25?'s1':r<.5?'s2':'s3';
        if(dist>180&&this.rng()<.12)cmd.jump=true;
        if(f.energy<12&&dist>300){cmd.charge=true;cmd.move=0;}
      }
      return cmd;
    }
    step(dt,input={}) {
      dt=clamp(dt,0,1/30);this.clock+=dt;this.tickCount++;
      if(this.phase==='ended')return;
      if(this.phase==='intro'){this.intro-=dt;if(this.intro<=0){this.phase='fight';this.emit('fight');}return;}
      if(this.hitstop>0){this.hitstop=Math.max(0,this.hitstop-dt);return;}
      if(this.phase==='fight'&&this.mode!=='training')this.time=Math.max(0,this.time-dt);
      const cmds=[input,this.aiInput(this.fighters[1],dt)];
      for(const f of this.fighters)this.updateFighter(f,dt,this.phase==='fight'?cmds[f.index]:{});
      this.resolveBodies();
      for(const job of this.scheduled)job.delay-=dt;
      const ready=this.scheduled.filter(j=>j.delay<=0);this.scheduled=this.scheduled.filter(j=>j.delay>0);
      if(this.phase==='fight')for(const job of ready)job.run();
      for(const f of this.fighters)if(f.attack&&f.hp>0&&this.phase==='fight')this.updateAttack(f,dt);
      this.updateProjectiles(dt);this.updateFields(dt);
      if(this.phase==='fight'){
        if(this.mode!=='training'&&this.fighters.some(f=>f.hp<=0)){this.phase='ko';this.ending=1.1;this.winner=this.fighters[0].hp<=0?(this.fighters[1].hp<=0?-1:1):0;this.emit('ko');}
        else if(this.mode!=='training'&&this.time<=0){this.winner=this.fighters[0].hp===this.fighters[1].hp?-1:(this.fighters[0].hp>this.fighters[1].hp?0:1);this.phase='ko';this.ending=.7;this.emit('timeout');}
      }else if(this.phase==='ko'){this.ending-=dt;if(this.ending<=0){this.phase='ended';this.emit('end',{winner:this.winner});}}
    }
    updateFighter(f,dt,cmd){
      f.age+=dt;for(const k of ['stun','invuln','slow','transform','grabbed','comboTime'])f[k]=Math.max(0,f[k]-dt);
      if(!f.comboTime)f.combo=0;for(const k in f.cd)f.cd[k]=Math.max(0,f.cd[k]-dt);
      if(this.mode==='training'&&f.index===0)f.energy=Math.min(100,f.energy+30*dt);
      if(f.down>0){if(f.ground){f.down=Math.max(0,f.down-dt);if(!f.down){if(f.hp<=0&&this.mode==='training'){f.hp=f.data.hp;this.emit('revive',{x:f.x,y:f.y});}if(f.hp>0){f.invuln=.45;this.state(f,'idle');}}}}
      if(f.buffer){f.buffer.ttl-=dt;if(f.buffer.ttl<=0)f.buffer=null;}
      if(cmd.action){f.buffer={key:cmd.action,ttl:.22};}
      f.guard=false;
      if(f.hp>0&&f.down<=0&&f.stun<=0){
        if(!f.attack){
          const target=this.fighters[1-f.index];if(Math.abs(target.x-f.x)>2)f.face=Math.sign(target.x-f.x);
          f.guard=!!cmd.guard&&f.ground;
          const charging=!!cmd.charge&&f.ground&&!f.guard;
          let move=cmd.move||0;if(f.guard||charging)move=0;
          f.vx=move*f.data.speed*(cmd.run?1.65:1)*(f.slow>0?.48:1)*(f.transform>0?1.12:1);
          if(cmd.jump&&f.ground&&!f.guard&&!charging){f.vy=-790;f.ground=false;this.emit('jump',{x:f.x,y:f.y,color:f.data.color});}
          this.state(f,!f.ground?'jump':f.guard?'guard':charging?'charge':move?(cmd.run?'run':'walk'):'idle');
          if(charging)f.energy=Math.min(100,f.energy+36*dt);
          if(f.buffer&&!f.guard){const key=f.buffer.key;f.buffer=null;this.act(f,key);}
        }
      }else{f.vx*=Math.exp(-7*dt);if(f.down>0||f.hp<=0)this.state(f,'down');else this.state(f,'hit');}
      f.vy+=1800*dt;f.x=clamp(f.x+f.vx*dt,75,1205);f.y=Math.min(FLOOR,f.y+f.vy*dt);
      if(f.y>=FLOOR){if(!f.ground&&f.vy>240)this.emit('land',{x:f.x,y:FLOOR,color:f.data.color});f.ground=true;f.vy=0;}else f.ground=false;
    }
    updateAttack(f,dt){
      const a=f.attack;if(!a)return;const s=a.s;a.t+=dt;
      if(!a.triggered&&a.t>=s.wind){a.triggered=true;this.trigger(f,s);}
      if(f.attack!==a)return;
      if(a.t>=s.wind&&a.t<=s.wind+s.active&&!a.hit&&(s.kind==='melee'||s.kind==='blink')){
        const target=this.fighters[1-f.index];if(overlap(this.attackbox(f,s),this.hurtbox(target))&&this.hit(f,target,s)){a.hit=true;}
      }
      if(a.t>=s.wind+s.active+s.recovery){f.attack=null;this.state(f,f.ground?'idle':'jump');}
    }
    trigger(f,s){
      const target=this.fighters[1-f.index];this.emit('cast',{x:f.x,y:f.y-100,face:f.face,f:f.index,key:s.key,fx:s.fx||s.key,color:f.data.color});
      if(s.transform)f.transform=s.transform;
      if(s.fx==='rise'){f.vy=-650;f.ground=false;}
      if(s.kind==='projectile')this.projectile(f,s);
      if(s.kind==='swarm'){
        const count=s.key==='super'?6:3;for(let i=0;i<count;i++)this.scheduled.push({delay:i*.14,run:()=>this.projectile(f,s,i)});
      }
      if(s.kind==='field')this.fields.push({owner:f.index,s,x:s.fx==='judgment'?target.x:clamp(f.x+f.face*200,90,1190),y:FLOOR,life:s.ttl,age:0,last:-1,r:s.radius});
      if(s.kind==='burst'){
        if(Math.abs(target.x-f.x)<s.range+32&&Math.abs(target.y-f.y)<230)this.hit(f,target,s);
      }
      if(s.kind==='blink'){
        if(Math.abs(target.x-f.x)<530){const old=f.x;f.x=clamp(target.x+f.face*115,80,1200);f.face=Math.sign(target.x-f.x)||-f.face;f.invuln=.26;this.emit('teleport',{x:old,to:f.x,y:f.y,f:f.index,color:f.data.color});}
      }
    }
    projectile(f,s,i=0){this.projectiles.push({owner:f.index,s,x:f.x+f.face*60,y:s.fx==='tide'?FLOOR-80:s.fx==='bloodstorm'?FLOOR-170:f.y-140+(i%3-1)*18,vx:f.face*s.speed,w:s.w,h:s.h,face:f.face,life:2.8,age:0});}
    updateProjectiles(dt){
      for(const p of this.projectiles){const old=p.x;p.x+=p.vx*dt;p.life-=dt;p.age+=dt;
        const target=this.fighters[1-p.owner];const box={x:Math.min(old,p.x)-p.w/2,y:p.y-p.h/2,w:p.w+Math.abs(p.x-old),h:p.h};
        if(this.phase==='fight'&&overlap(box,this.hurtbox(target))&&this.hit(this.fighters[p.owner],target,p.s,p.x,p.y))p.life=0;
      }
      this.projectiles=this.projectiles.filter(p=>p.life>0&&p.x>-300&&p.x<WIDTH+300);
    }
    updateFields(dt){
      for(const a of this.fields){a.life-=dt;a.age+=dt;const t=this.fighters[1-a.owner];
        if(this.phase!=='fight'||Math.abs(t.x-a.x)>a.r+32||t.y<FLOOR-210||t.hp<=0)continue;
        if(a.s.slow)t.slow=Math.max(t.slow,.15);
        if(a.s.fx==='gravity'&&!t.attack&&t.down<=0)t.x+=Math.sign(a.x-t.x)*Math.min(Math.abs(a.x-t.x),155*dt);
        const tick=Math.floor(a.age/.7);if(tick!==a.last&&t.invuln<=0){if(this.hit(this.fighters[a.owner],t,a.s,a.x,FLOOR-100))a.last=tick;}
      }this.fields=this.fields.filter(a=>a.life>0);
    }
    hit(f,t,s,x=t.x,y=t.y-135){
      if(t.hp<=0||t.invuln>0||t.down>0)return false;
      const blocked=t.guard&&(Math.sign(f.x-t.x)||t.face)===t.face;
      if(blocked&&s.grab){this.emit('impact',{x,y,color:'#88cfff',blocked:true,damage:0,f:f.index});return true;}
      const damage=Math.round(s.damage*f.data.power*(f.transform>0?1.24:1)*(blocked?.18:1));const actual=Math.min(damage,t.hp);
      t.hp=Math.max(0,t.hp-damage);t.attack=null;t.buffer=null;t.stun=blocked?.16:s.stun;t.vx=(Math.sign(t.x-f.x)||f.face)*(s.knock||170)*(blocked?.35:1);t.invuln=blocked?.09:.13;
      if(!blocked&&s.down){t.down=t.hp<=0?1.2:.82;t.vy=-380;this.state(t,'down');}else this.state(t,'hit');
      if(t.hp<=0){t.down=1.2;t.vy=-320;this.state(t,'down');}
      if(s.slow&&!blocked)t.slow=s.slow;
      if(s.grab&&!blocked){const heal=Math.min(f.data.hp-f.hp,Math.round(actual*.8));f.hp+=heal;t.grabbed=.72;t.vx=0;this.emit('drain',{from:t.index,to:f.index,heal});}
      f.energy=clamp(f.energy+(s.cost?3:10),0,100);t.energy=clamp(t.energy+6,0,100);
      f.combo=f.comboTime>0?f.combo+1:1;f.comboTime=1.1;this.lastDamage=damage;this.totalHits++;t.lastHit=s.name;
      this.hitstop=s.key==='super'?.08:.045;this.emit('impact',{x,y,color:f.data.accent,damage,blocked,f:f.index,combo:f.combo});return true;
    }
    resolveBodies(){const[a,b]=this.fighters;if(Math.abs(a.y-b.y)>170||a.down>0||b.down>0)return;const dx=b.x-a.x;if(Math.abs(dx)<66){const push=(66-Math.abs(dx))/2,dir=Math.sign(dx)||1;a.x=clamp(a.x-dir*push,75,1205);b.x=clamp(b.x+dir*push,75,1205);}}
    reset(){const next=new Match(this.fighters[0].data.id,this.fighters[1].data.id,this.mode,this.rng);Object.assign(this,next);}
  }
  const api={ROSTER,BASIC,Match,specFor,FLOOR,WIDTH,overlap};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Nightborn=api;
})(typeof window!=='undefined'?window:globalThis);
