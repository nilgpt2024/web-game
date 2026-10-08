import * as THREE from 'three';
import {RoundedBoxGeometry} from './vendor/RoundedBoxGeometry.js';
import {mergeGeometries} from './vendor/BufferGeometryUtils.js';

// Two authored rooms, using the lounge's existing material and shape vocabulary.
import {buildVictorShell} from './world/victor12.js';

export async function buildUpperRooms({materials:M,rainMat,canvasTexture,kit,hero}){
 let root,blocks,tone;
 // Room light identities (master 2.10): a cooler, quieter corridor; a colder, formal Victor room.
 const TONES={corridor:{sky:['#9fb4c8','#2c3038',.74],key:['#93b9e3',2.3],fill:['#dcc3a4',.3]},victor:{sky:['#9eadc6','#2a2d38',.7],key:['#98bde6',2.6],fill:['#d8bda2',.24]}};
 const V=(x,y,z)=>new THREE.Vector3(x,y,z);
 function mesh(g,m,x=0,y=0,z=0,parent=root){const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
 function box(x,y,z,w,h,d,m,b=.025,parent=root){return mesh(b?new RoundedBoxGeometry(w,h,d,1,Math.min(b,w/3,h/3,d/3)):new THREE.BoxGeometry(w,h,d),m,x,y,z,parent)}
 function cyl(x,y,z,r,h,m,r2=r,parent=root){return mesh(new THREE.CylinderGeometry(r2,r,h,12),m,x,y,z,parent)}
 function block(x,z,w,d,label){blocks.push({minX:x-w/2,maxX:x+w/2,minZ:z-d/2,maxZ:z+d/2,label})}
 function lamp(x,y,z,s=.8,kind='LNG_lamp'){hero.place(kind,root,x,y,z,0,s);const l=new THREE.PointLight('#f0c88b',9,5,2);l.position.set(x,y+.6,z);root.add(l)}
 function picture(x,y,z,w,h){box(x,y,z,w,h,.10,M.timber);const t=canvasTexture(256,192,(c,W,H)=>{c.fillStyle='#7b8b90';c.fillRect(0,0,W,H);c.fillStyle='#c5ad80';c.beginPath();c.arc(195,45,22,0,7);c.fill();for(let i=0;i<2;i++){c.fillStyle=i?'#354b51':'#597073';c.beginPath();c.moveTo(0,H);for(let x=0;x<=W;x+=25)c.lineTo(x,87+i*45+Math.sin(x*.025+i)*30);c.lineTo(W,H);c.fill()}});box(x,y,z+.06,w-.1,h-.1,.015,new THREE.MeshStandardMaterial({map:t,roughness:1}),0)}
 function lighting(){root.add(new THREE.HemisphereLight(tone.sky[0],tone.sky[1],tone.sky[2]));const light=new THREE.DirectionalLight(tone.key[0],tone.key[1]);light.position.set(-7,9,-1);light.target.position.set(1,0,1);light.castShadow=true;light.shadow.mapSize.set(2048,2048);Object.assign(light.shadow.camera,{left:-9,right:9,top:8,bottom:-8,near:.1,far:35});light.shadow.bias=-.0005;light.shadow.normalBias=.025;root.add(light,light.target);const fill=new THREE.DirectionalLight(tone.fill[0],tone.fill[1]);fill.position.set(6,8,9);root.add(fill)}
 function shell(w,d){box(0,-.20,0,w+.4,.4,d+.4,M.timber,.09);box(0,.008,0,w,.06,d,M.wood,0);for(let x=-w/2+.35;x<w/2;x+=.72)box(x,.044,0,.69,.016,d-.04,M.wood,.003);box(0,2.1,-d/2,w+.2,4.2,.28,M.plaster);box(0,.65,-d/2+.18,w,1.3,.15,M.wood);for(const y of [.12,1.35,4.12])box(0,y,-d/2+.24,w+.2,.13,.22,M.timber);for(let x=-w/2+.15;x<w/2;x+=1.2)box(x,.7,-d/2+.27,.065,1.15,.11,M.timber);box(-w/2,.6,0,.24,1.2,d,M.wood);box(-w/2,1.23,0,.38,.12,d,M.edge);box(-w/2,4.05,0,.30,.2,d,M.timber);for(let z=-d/2+.12;z<d/2;z+=2.25){box(-w/2,2.63,z,.25,2.8,.14,M.timber);const pane=mesh(new THREE.PlaneGeometry(2.10,2.70),rainMat,-w/2-.03,2.65,z+1.1);pane.rotation.y=Math.PI/2;pane.castShadow=false;box(-w/2+.05,2.48,z+1.1,.14,.08,2.1,M.timber)}lighting()}
 // Step 13: a Persian-style carpet, busy only at its borders so the body and the impact marks
 // keep a calm field to read against; knotted fringe on the short ends.
 function rug(x,z,w,d){const t=canvasTexture(1024,760,(c,W,H)=>{c.fillStyle='#5e2a33';c.fillRect(0,0,W,H);for(let i=0;i<260;i++){c.fillStyle=`rgba(${Math.random()>.5?'120,60,70':'70,30,38'},.18)`;c.fillRect(Math.random()*W,Math.random()*H,3+Math.random()*6,2)}const b=70;c.fillStyle='#2e3f4c';c.fillRect(0,0,W,b);c.fillRect(0,H-b,W,b);c.fillRect(0,0,b,H);c.fillRect(W-b,0,b,H);c.strokeStyle='#c9a45e';c.lineWidth=5;c.strokeRect(12,12,W-24,H-24);c.strokeRect(b+6,b+6,W-2*b-12,H-2*b-12);c.fillStyle='#b8894a';for(let k=0;k<W;k+=34){c.beginPath();c.moveTo(k,b/2);c.lineTo(k+10,b/2-10);c.lineTo(k+20,b/2);c.lineTo(k+10,b/2+10);c.fill();c.beginPath();c.moveTo(k,H-b/2);c.lineTo(k+10,H-b/2-10);c.lineTo(k+20,H-b/2);c.lineTo(k+10,H-b/2+10);c.fill()}for(let k=0;k<H;k+=34){c.beginPath();c.moveTo(b/2,k);c.lineTo(b/2-10,k+10);c.lineTo(b/2,k+20);c.lineTo(b/2+10,k+10);c.fill();c.beginPath();c.moveTo(W-b/2,k);c.lineTo(W-b/2-10,k+10);c.lineTo(W-b/2,k+20);c.lineTo(W-b/2+10,k+10);c.fill()}c.fillStyle='rgba(46,63,76,.55)';for(const [cx,cy] of [[b+60,b+60],[W-b-60,b+60],[b+60,H-b-60],[W-b-60,H-b-60]]){c.beginPath();c.moveTo(cx,cy-46);c.lineTo(cx+46,cy);c.lineTo(cx,cy+46);c.lineTo(cx-46,cy);c.fill()}});const m=new THREE.MeshStandardMaterial({map:t,roughness:1});const o=mesh(new THREE.PlaneGeometry(w,d),m,x,.07,z);o.rotation.x=-Math.PI/2;o.castShadow=false;for(const s of [-1,1])for(let k=0;k<30;k++)box(x+s*(w/2+.06),.075,z-d/2+.1+k*(d-.2)/29,.14,.012,.035,M.paper,0)}
 function merge(){root.updateMatrixWorld(true);const buckets=new Map(),remove=[];root.traverse(o=>{if(o.isMesh&&!o.material.transparent&&o.material!==rainMat&&!o.userData.dynamic&&!o.parent.userData.dynamic){const key=o.material.uuid+'|'+o.castShadow;let b=buckets.get(key);if(!b)buckets.set(key,b={m:o.material,cast:o.castShadow,geos:[]});let g=o.geometry.clone();if(g.index)g=g.toNonIndexed();g.applyMatrix4(o.matrixWorld);b.geos.push(g);remove.push(o)}});remove.forEach(o=>o.removeFromParent());for(const b of buckets.values()){const g=mergeGeometries(b.geos,false),o=new THREE.Mesh(g,b.m);o.castShadow=b.cast;o.receiveShadow=true;root.add(o);b.geos.forEach(g=>g.dispose())}}

 // The corridor is built during dressing by world/corridor12.js (Step 12 architecture).
 const corridor={root:new THREE.Group(),collisions:[],bounds:{minX:-5.65,maxX:5.65,minZ:-2.65,maxZ:2.7},viewH:10.5,viewW:17.8};corridor.root.name='Upper corridor';

 root=new THREE.Group();blocks=[];root.name="Victor's room";tone=TONES.victor;const victorShell=buildVictorShell({root,M,kit,rainMat,canvasTexture,hero});lighting();rug(.4,.7,6.5,4.6);
 // Formal bed and quiet bedside lamp; large broad shapes rather than busy dressing.
 // Step 13: the bed, bedside, desk, chair, wingback, phone, lamps, bookend and recorder are Blender pieces
 // (world/hero13.js). Colliders, clue props and every anchor below keep their Step 12 positions.
 hero.place('VIC_bed',root,2.9,0,-2.4);
 block(2.9,-2.4,3.5,3.8,'bed');
 hero.place('VIC_bedside',root,5.05,0,-3.15);lamp(5.05,.91,-3.15,.78);block(5.05,-3.15,.85,.94,'bedside cabinet');
 picture(2.9,2.96,-4.36,2.05,1.10);
 // Desk, analogue phone, unlabelled papers and an un-emphasised brass bookend.
 hero.place('VIC_desk',root,-3.2,0,-2.63);
 box(-3.65,1.51,-2.66,.82,.025,.62,M.paper,.002).rotation.y=.12;box(-3.1,1.51,-2.6,.50,.02,.39,M.paper,.002);
 hero.place('VIC_phone',root,-2.18,1.495,-2.74,.12);
 hero.place('VIC_desklamp',root,-4.55,1.495,-2.72,.18);const deskLight=new THREE.PointLight('#f0c88b',9,5,2);deskLight.position.set(-4.55,2.1,-2.72);root.add(deskLight);
 hero.place('VIC_bookend',root,-1.85,1.495,-3.02);
 for(let i=0;i<3;i++)box(-2.42+i*.16,1.71,-3.11,.13,.4,.32,[M.indigo,M.moss,M.rust][i],.012);
 block(-3.2,-2.63,3.67,1.6,'desk');
 hero.place('VIC_chair',root,-3.1,0,-.92,Math.PI);
 block(-3.1,-.92,1.2,1.2,'desk chair');
 // Small authored clues use the existing materials and prop vocabulary.
 hero.place('VIC_recorder',root,-2.12,.045,-1.57,.2);
 // Step 15: the open recorder stands about 30 cm tall, so it gets its own collider (Aren could walk through it).
 block(-2.13,-1.555,.46,.55,'recorder');
 const torn=box(-1.66,.062,-1.43,.35,.01,.46,M.paper,.001);torn.rotation.y=.28;
 box(-3.40,1.51,-1.94,.20,.012,.025,M.rust,0);
 // Luggage at the rear, not another clue or inventory interaction.
 // Step 12: Victor's suitcase now stands open on the house's luggage stand (world/victor12.js).
 // A low chair partly occludes the lower body from the fixed gameplay angle.
 hero.place('VIC_armchair',root,2.8,0,1.5,Math.PI);block(2.8,1.5,1.4,1.4,'armchair');
 // The doorway retains a broken strike fragment from the forced spring night latch.
 box(-4.25,.12,4.13,.17,.045,.32,M.brass,0);block(.55,.40,3.6,1.65,'Victor');
 const art=await new THREE.TextureLoader().loadAsync('./assets/victor-floor-v71.png');art.colorSpace=THREE.SRGBColorSpace;art.offset.set(60/1536,1-930/1024);art.repeat.set((1505-60)/1536,(930-180)/1024);
 const contact=canvasTexture(256,256,(c,W,H)=>{const g=c.createRadialGradient(W/2,H/2,12,W/2,H/2,W*.48);g.addColorStop(0,'rgba(5,9,17,.70)');g.addColorStop(.60,'rgba(5,9,17,.32)');g.addColorStop(1,'rgba(5,9,17,0)');c.fillStyle=g;c.fillRect(0,0,W,H)});
 const contactShadow=mesh(new THREE.PlaneGeometry(3.85,1.8),new THREE.MeshBasicMaterial({map:contact,transparent:true,depthWrite:false,opacity:.78}),.55,.098,.40);contactShadow.rotation.x=-Math.PI/2;contactShadow.castShadow=false;contactShadow.userData.dynamic=true;
 const body=mesh(new THREE.PlaneGeometry(3.75,1.95),new THREE.MeshBasicMaterial({map:art,alphaTest:.75,side:THREE.DoubleSide,color:'#c8cdd9',toneMapped:false}),.55,.118,.42);body.rotation.x=-Math.PI/2;body.rotation.z=-.03;body.castShadow=false;body.userData.dynamic=true;
 body.userData.presentation={asset:'victor-floor-v71.png',floorY:.118,depthTest:true,contactShadow:true,occluder:'armchair'};
 // Canonical watch insert is code-drawn: 9:08, independent of generated markings.
 const watchTexture=canvasTexture(256,256,(c,W,H)=>{c.clearRect(0,0,W,H);c.fillStyle='#c4a45c';c.beginPath();c.arc(128,128,115,0,7);c.fill();c.fillStyle='#eadfc5';c.beginPath();c.arc(128,128,97,0,7);c.fill();c.strokeStyle='#252b33';c.lineWidth=7;c.beginPath();c.moveTo(128,128);c.lineTo(67,123);c.moveTo(128,128);c.lineTo(192,70);c.stroke();c.lineWidth=3;c.beginPath();c.moveTo(94,32);c.lineTo(138,95);c.lineTo(116,131);c.lineTo(154,223);c.stroke()});
 const watch=mesh(new THREE.PlaneGeometry(.22,.22),new THREE.MeshBasicMaterial({map:watchTexture,transparent:true}),.28,.121,.74);watch.rotation.x=-Math.PI/2;watch.castShadow=false;watch.userData.dynamic=true;
 merge();const victor={root,collisions:blocks,bounds:{minX:-5.52,maxX:5.52,minZ:-4.15,maxZ:4.10},viewH:11.75,viewW:19.7,watchPoint:{x:.25,z:1.75},exitPoint:{x:-4.65,z:3.6},body,leafPivot:victorShell.leafPivot};
 root=null;return {corridor,victor};
}
