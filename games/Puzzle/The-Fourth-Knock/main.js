import * as THREE from 'three';
import {mountInterface} from './interface7.js';
import {runStep7} from './story-runtime.js';
mountInterface();
import { RoundedBoxGeometry } from './vendor/RoundedBoxGeometry.js';
import { mergeGeometries } from './vendor/BufferGeometryUtils.js';
import { createKit, extendMaterials } from './world/kit12.js';
import { buildLounge12 } from './world/lounge12.js';
import { loadHero } from './world/hero13.js';

// Step 7: the approved lounge foundation plus one authored narrative slice.
const $ = id => document.getElementById(id);
const renderer = new THREE.WebGLRenderer({canvas:$('scene'),antialias:true,alpha:true,powerPreference:'high-performance',preserveDrawingBuffer:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.22;
const scene=new THREE.Scene();scene.background=null;renderer.setClearColor(0x000000,0);
const camera=new THREE.OrthographicCamera();
camera.position.set(13,16.5,20);camera.lookAt(0,1.0,0);
const explorationCamera=camera.position.clone();let framing=0;const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const room=new THREE.Group();scene.add(room);
const mat=(c,extra={})=>new THREE.MeshStandardMaterial({color:c,roughness:.92,metalness:0,...extra});
const M={plaster:mat('#cfb88d'),timber:mat('#3c302c'),wood:mat('#75523b'),edge:mat('#ad8152'),dark:mat('#223335'),stone:mat('#786f61'),grout:mat('#3d4847'),moss:mat('#616940'),mossLight:mat('#7c8251'),rust:mat('#934d3b'),rustLight:mat('#b15e42'),mustard:mat('#c5a15a'),brass:mat('#b9994c',{metalness:.25,roughness:.72}),paper:mat('#ead8af'),cream:mat('#ebca89'),burgundy:mat('#663b42'),indigo:mat('#3c505b'),leaf:mat('#516b49'),leafLight:mat('#80925a'),pot:mat('#ac714c'),black:mat('#182527')};
let randomSeed=94721;const rand=()=>{randomSeed=(1664525*randomSeed+1013904223)>>>0;return randomSeed/4294967296};
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
function mesh(g,m,x=0,y=0,z=0,parent=room){const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
function box(x,y,z,w,h,d,m,bevel=0,parent=room){return mesh(bevel?new RoundedBoxGeometry(w,h,d,1,Math.min(bevel,w/3,h/3,d/3)):new THREE.BoxGeometry(w,h,d),m,x,y,z,parent)}
function cyl(x,y,z,r,h,m,r2=r,n=12,parent=room){return mesh(new THREE.CylinderGeometry(r2,r,h,n),m,x,y,z,parent)}
function sphere(x,y,z,rx,ry,rz,m,parent=room){const o=mesh(new THREE.SphereGeometry(1,12,8),m,x,y,z,parent);o.scale.set(rx,ry,rz);return o}
function rod(a,b,r,m,parent=room){const o=cyl(...a.clone().add(b).multiplyScalar(.5).toArray(),r,a.distanceTo(b),m,r,8,parent);o.quaternion.setFromUnitVectors(V(0,1,0),b.clone().sub(a).normalize());return o}
const collisions=[];
const anchors={lamps:[],clock:null,cup:null,fire:null};
function block(x,z,w,d,label){collisions.push({minX:x-w/2,maxX:x+w/2,minZ:z-d/2,maxZ:z+d/2,label})}
function canvasTexture(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t}
const hero=await loadHero({canvasTexture});
function floorPlane(x,z,w,d,material,y=.012){const o=mesh(new THREE.PlaneGeometry(w,d),material,x,y,z);o.rotation.x=-Math.PI/2;o.castShadow=false;return o}
function sign(text,subtitle,w,h){return new THREE.MeshStandardMaterial({map:canvasTexture(768,320,(c,W,H)=>{c.fillStyle='#263932';c.fillRect(0,0,W,H);c.strokeStyle='#b4995e';c.lineWidth=5;c.strokeRect(15,15,W-30,H-30);c.fillStyle='#eddbaf';c.textAlign='center';c.font='54px Georgia';c.fillText(text,W/2,135);c.fillStyle='#c1a46a';c.font='22px Courier New';c.fillText(subtitle,W/2,211)}),roughness:1})}

// A broad, readable cutaway. The stair flight is scenery; its footprint blocks movement.
box(0,-.24,0,14.3,.48,11.9,M.timber,.13);
// Step 12: walls, floor and windows are built by world/lounge12.js (the house architecture).
// The old floor consumed 168 random draws; keep the sequence so every prop stays where it was.
for(let i=0;i<168;i++)rand();
const rainUniforms={time:{value:0},dawn:{value:0},intensity:{value:1},flash:{value:0}};
const rainMat=new THREE.ShaderMaterial({uniforms:rainUniforms,side:THREE.DoubleSide,vertexShader:`varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`
  varying vec2 vUv;uniform float time;uniform float dawn;uniform float intensity;uniform float flash;
  float hash(float x){return fract(sin(x*127.1)*43758.5453);}
  void main(){vec2 uv=vUv;vec3 col=mix(vec3(.035,.13,.26),vec3(.18,.41,.66),uv.y);
    float ridge=.24+.07*sin(uv.x*9.)+.1*sin(uv.x*4.+1.);
    if(uv.y<ridge)col=mix(col,vec3(.065,.15,.17),.65);
    for(int i=0;i<9;i++){float f=float(i);float tx=(f+.3)/9.;float hh=.16+hash(f)*.23;float yy=uv.y-.07;float dx=abs(uv.x-tx);float tree=step(dx,(hh-yy)*.16)*step(0.,yy)*step(yy,hh);col=mix(col,vec3(.045,.14,.16),tree*.7);}
    vec2 r=uv*vec2(56.,3.8);r.x+=uv.y*3.;float id=floor(r.x);float len=.15+hash(id)*.24;float streak=step(.90,fract(r.x))*smoothstep(len,0.,fract(r.y+time*(1.35+hash(id)) +hash(id)*12.));
    col=mix(col,vec3(.32,.40,.44)*(.75+uv.y*.4),dawn*.72);col+=streak*vec3(.29,.48,.66)*(1.-dawn*.68)*intensity;float veil=sin(uv.x*6.+time*.22)*.5+.5;col+=veil*vec3(.006,.018,.025);col+=pow(max(0.,1.-abs(uv.x-.45)*2.),12.)*.025;col+=flash*vec3(.55,.62,.74)*(.45+uv.y*.55);
    gl_FragColor=vec4(col,1.);
  }`});
// Tall mullion shadows and cool window spill, kept away from the whole floor.
const moon=new THREE.DirectionalLight('#599be3',2.65);moon.position.set(-8,7,-2);moon.target.position.set(2,0,3);moon.castShadow=true;moon.shadow.mapSize.set(2048,2048);Object.assign(moon.shadow.camera,{left:-10,right:10,top:10,bottom:-10,near:.1,far:35});moon.shadow.bias=-.0006;moon.shadow.normalBias=.03;moon.shadow.radius=2;scene.add(moon,moon.target);
const blueSpill=new THREE.PointLight('#488ad4',16,7,2);blueSpill.position.set(-5.7,2.6,.8);scene.add(blueSpill);
scene.add(new THREE.HemisphereLight('#a6b7cf','#242730',.61));
const roomFill=new THREE.DirectionalLight('#f4c899',.25);roomFill.position.set(5,8,7);scene.add(roomFill);
function pool(x,z,r,c,opacity=.17){const t=canvasTexture(128,128,(q,W,H)=>{const g=q.createRadialGradient(W/2,H/2,0,W/2,H/2,W/2);g.addColorStop(0,c);g.addColorStop(.55,c+'88');g.addColorStop(1,c+'00');q.fillStyle=g;q.fillRect(0,0,W,H)});const m=new THREE.MeshBasicMaterial({map:t,transparent:true,opacity,depthWrite:false,blending:THREE.AdditiveBlending});floorPlane(x,z,r*2,r*2,m,.048)}
pool(-4.8,2,2.1,'#62b4d7',.15);pool(-4.7,-2.8,2,'#71b9d5',.16);pool(.2,-2.2,2.5,'#edb34d',.22);pool(4,2.6,1.9,'#efb955',.13);

// The rug has large printed diamonds, not textile micro-detail.
// Step 12: a cotton dhurrie in cream, indigo and rust, so the seating island reads against the
// red oxide floor. The big central diamond stays; it is the room's graphic anchor.
const rugTex=canvasTexture(1024,768,(c,W,H)=>{c.fillStyle='#d9c49b';c.fillRect(0,0,W,H);c.fillStyle='#34495a';c.fillRect(0,0,W,58);c.fillRect(0,H-58,W,58);c.fillRect(0,0,58,H);c.fillRect(W-58,0,58,H);c.strokeStyle='#934d3b';c.lineWidth=10;c.strokeRect(70,70,W-140,H-140);c.strokeStyle='#c5a15a';c.lineWidth=4;c.strokeRect(29,29,W-58,H-58);c.strokeRect(86,86,W-172,H-172);for(let x=120;x<W-100;x+=64)for(let y=130;y<H-110;y+=78){c.fillStyle=(Math.round(x/64+y/78)%3)?'#9e8a67':'#934d3b';c.beginPath();c.moveTo(x,y-9);c.lineTo(x+9,y);c.lineTo(x,y+9);c.lineTo(x-9,y);c.fill()}c.fillStyle='#d9c49b';c.beginPath();c.moveTo(W*.5,H*.2);c.lineTo(W*.77,H*.5);c.lineTo(W*.5,H*.8);c.lineTo(W*.23,H*.5);c.closePath();c.fill();c.strokeStyle='#34495a';c.lineWidth=14;c.stroke();c.strokeStyle='#934d3b';c.lineWidth=5;c.beginPath();c.moveTo(W*.5,H*.29);c.lineTo(W*.68,H*.5);c.lineTo(W*.5,H*.71);c.lineTo(W*.32,H*.5);c.closePath();c.stroke();c.fillStyle='#c5a15a';c.beginPath();c.arc(W*.5,H*.5,16,0,7);c.fill();for(let i=0;i<24;i++){c.fillStyle='rgba(120,90,60,.06)';c.fillRect(0,i*32,W,2)}});
const rugMat=mat('#ffffff',{map:rugTex});floorPlane(-.4,.55,7.3,5.2,rugMat,.066);
// Step 13: the dhurrie's cotton weave and its knotted fringe on the two short ends.
floorPlane(-.4,.55,7.3,5.2,mat('#ffffff',{map:(()=>{const t=canvasTexture(256,64,(c,W,H)=>{c.clearRect(0,0,W,H);for(let y=0;y<H;y+=4){c.fillStyle=y%8?'rgba(255,248,230,.10)':'rgba(40,30,20,.10)';c.fillRect(0,y,W,2)}});t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(3,26);return t})(),transparent:true,depthWrite:false}),.067);
for(const sx of [-1,1])for(let k=0;k<34;k++){const t=box(-.4+sx*3.72,.07,.55-2.5+k*5/33,.16,.014,.035,M.paper);t.rotation.y=sx*.08*Math.sin(k)}
// Step 12: the small runner that sat hidden under the stair flight is gone.

function legs(x,z,w,d,h,m=M.timber){for(const dx of [-1,1])for(const dz of [-1,1])box(x+dx*w/2,h/2,z+dz*d/2,.13,h,.13,m,.025)}
function books(x,y,z,count=5,vertical=true){let offset=0;for(let i=0;i<count;i++){const w=.09+rand()*.1,h=.3+rand()*.15;const m=[M.burgundy,M.moss,M.indigo,M.mustard][i%4];if(vertical){box(x+offset,y+h/2,z,w,h,.26,m,.008);box(x+offset,y+h*.2,z+.137,w*.75,.022,.005,M.edge);offset+=w+.02}else{const b=box(x,y+i*.072,z,.5-i*.012,.065,.36,m,.015);b.rotation.y=i%2?.1:-.08}}}
function plant(x,y,z,s=1){cyl(x,y+.21*s,z,.24*s,.42*s,M.pot,.3*s);cyl(x,y+.426*s,z,.27*s,.016*s,M.timber);for(let i=0;i<8;i++){const a=i*2.4;const p=V(x+Math.cos(a)*.25*s,y+(.8+rand()*.3)*s,z+Math.sin(a)*.25*s);rod(V(x,y+.41*s,z),p,.018*s,M.leaf);const leaf=sphere(p.x,p.y,p.z,.13*s,.30*s,.065*s,i%2?M.leafLight:M.leaf);leaf.rotation.set(Math.sin(a)*.6,0,-Math.cos(a)*.6)}}
function lamp(x,y,z,s=1){hero.place('LNG_lamp',room,x,y,z,0,s);const glow=new THREE.PointLight('#ffca77',7*s,6*s,2);glow.position.set(x,y+.73*s,z);scene.add(glow);anchors.lamps.push({light:glow,s});pool(x,z,1.4*s,'#f3c177',.12)}
function sideTable(x,z){hero.place('LNG_sidetable',room,x,0,z);return .71}
// Window book cabinet.
// Step 13: the window cabinet, fireplace, sofa, chairs, tables, reception and stair turnings are Blender pieces
// (world/hero13.js); collisions, anchors and lights stay here.
hero.place('LNG_cabinet',room,-5.92,0,-2.9,Math.PI/2);
plant(-5.91,1.06,-4.05,.77);lamp(-5.87,1.055,-1.75,.74);books(-5.85,1.06,-2.55,4,false);block(-5.92,-2.9,.8,3.15,'window cabinet');
// Fireplace: bold hearth, selected irregular stone courses, a graphic flame.
hero.place('LNG_fireplace',room,.05,0,-4.7);
for(let i=0;i<3;i++){const log=cyl(-.5+i*.5,.38,-4.52,.12,.66,M.wood,.13);log.rotation.z=Math.PI/2;log.rotation.y=i*.34}
const flameLevel={value:1};
const flameMat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,uniforms:{time:rainUniforms.time,level:flameLevel},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:`varying vec2 vUv;uniform float time;uniform float level;void main(){vec2 p=vUv;float w=.31*(1.-p.y)+.035*sin(p.y*17.-time*5.);float f=smoothstep(w+.04,w,abs(p.x-.5-.04*sin(p.y*8.+time*3.)));float h=(.5+.31*level)+.06*sin(time*4.);f*=smoothstep(h,h-.18,p.y);vec3 c=mix(vec3(1.,.25,.035),vec3(1.,.91,.3),1.-p.y);gl_FragColor=vec4(c,f*min(1.,.4+level*.6));}`});
for(let i=0;i<3;i++){const f=mesh(new THREE.PlaneGeometry(.66,1.12),flameMat,-.48+i*.49,.91,-4.5+i*.013);f.castShadow=false}
const fireLight=new THREE.PointLight('#ff9b44',14,8,2);fireLight.position.set(.05,1,-4.0);fireLight.userData.lightKind='fire';scene.add(fireLight);anchors.fire={x:.05,y:.95,z:-4.45};block(.05,-4.8,3.3,1.4,'hearth');
// A single framed graphic landscape, with broad hill shapes.
const painting=canvasTexture(512,320,(c,W,H)=>{c.fillStyle='#809198';c.fillRect(0,0,W,H);c.fillStyle='#cfb585';c.beginPath();c.arc(380,70,36,0,Math.PI*2);c.fill();for(let i=0;i<3;i++){c.fillStyle=['#657982','#3f5a59','#263e3f'][i];c.beginPath();c.moveTo(0,H);for(let x=0;x<=W;x+=60)c.lineTo(x,125+i*49+Math.sin(x*.011+i)*50);c.lineTo(W,H);c.fill()}});
box(.05,3.23,-5.08,2.49,1.29,.14,M.timber,.03);box(.05,3.23,-4.995,2.3,1.11,.013,mat('#fff',{map:painting}));
books(-.95,2.4,-4.8,3,false);plant(1.1,2.38,-4.96,.45);
hero.place('LNG_clock',room,.17,2.38,-4.947);
const clockFace=canvasTexture(256,256,(c,W,H)=>{c.fillStyle='#ecd9b3';c.beginPath();c.arc(128,128,120,0,7);c.fill();c.strokeStyle='#33413b';c.lineWidth=5;for(let i=0;i<12;i++){const a=i*Math.PI/6;c.beginPath();c.moveTo(128+96*Math.sin(a),128+96*Math.cos(a));c.lineTo(128+106*Math.sin(a),128+106*Math.cos(a));c.stroke()}c.fillStyle='#33413b';c.beginPath();c.arc(128,128,9,0,7);c.fill()});
const clockPlane=mesh(new THREE.CircleGeometry(.224,32),mat('#fff',{map:clockFace}),.17,2.72,-4.827);clockPlane.castShadow=false;anchors.clock={x:.17,y:2.72,z:-4.82};

// Sofa: generous fabric cushions with a readable high back for occlusion.
const sofaStart=room.children.length;
const sofaX=-1.4,sofaZ=2.88;
hero.place('LNG_sofa',room,sofaX,0,sofaZ,Math.PI);block(sofaX,sofaZ,3.99,1.5,'sofa');
// Move the existing sofa as a unit: 0.42 more clear space at the clue table.
for(const o of room.children.slice(sofaStart))o.position.z+=.42;
collisions.at(-1).minZ+=.42;collisions.at(-1).maxZ+=.42;
function chair(x,z,angle,kind='LNG_armchair'){hero.place(kind,room,x,0,z,angle+Math.PI);block(x,z,1.55,1.55,'armchair')}
chair(-4.4,-.65,-1.15);chair(3.30,1.55,1.7,'LNG_canechair');
sideTable(-4.8,1.55);lamp(-4.8,.71,1.55,.91);block(-4.8,1.55,.85,.85,'lamp table');
// The second side table is removed to open the reception-side circulation lane.
// Clue table and a deliberately small set of props.
hero.place('LNG_coffee',room,0,0,.05);
books(-.75,.345,.22,3,false); // Books live below the table; the letter owns the tabletop.
cyl(-.79,1.09,-.48,.13,.23,M.moss,.14);anchors.cup={x:-.79,y:1.22,z:-.48};const handle=mesh(new THREE.TorusGeometry(.083,.023,6,12),M.moss,-.63,1.10,-.48);handle.rotation.y=Math.PI/2;cyl(-.79,1.212,-.48,.112,.003,M.timber);cyl(-.79,.986,-.48,.2,.024,M.paper);
const clueTex=canvasTexture(512,384,(c,W,H)=>{c.fillStyle='#f0dfb5';c.fillRect(0,0,W,H);c.strokeStyle='#938267';c.lineWidth=2;c.strokeRect(15,15,W-30,H-30);c.fillStyle='#425146';c.font='bold 27px Georgia';c.fillText('CEDAR HOUSE',36,65);c.font='16px Courier New';c.fillText('GUEST INFORMATION',36,103);c.fillStyle='#98866b';for(let i=0;i<5;i++)c.fillRect(36,148+i*27,260-i%2*85,3);c.fillStyle='#d0b25b';c.fillRect(34,297,150,36);c.fillStyle='#374635';c.font='bold 23px Courier New';c.fillText('WELCOME',46,323)});
const letterMat=mat('#fff',{map:clueTex});const clue=box(.24,.987,.32,.87,.025,.62,letterMat,.005);clue.rotation.y=-.2;
const fold=box(.15,1.011,.52,.7,.015,.07,M.paper);fold.rotation.y=-.2;block(0,.05,2.83,1.8,'clue table');
const tableLight=new THREE.SpotLight('#ffda93',43,10,.54,.64,1.5);tableLight.position.set(-.8,5.8,.8);tableLight.target.position.set(0,0,.1);tableLight.castShadow=true;tableLight.shadow.mapSize.set(1024,1024);tableLight.shadow.bias=-.001;tableLight.shadow.normalBias=.03;scene.add(tableLight,tableLight.target);

// Non-playable stairs form a dark diagonal frame on the room's far right.
for(let i=0;i<9;i++){const z=-1.3-i*.47;const h=.18+i*.36;box(5.06,h/2,z,2.12,h,.5,M.wood,.025);box(5.06,h+.028,z,2.15,.08,.51,M.timber,.015);box(5.06,h+.073,z,1.16,.018,.44,M.burgundy);for(const x of [4.47,5.65])box(x,h+.088,z,.035,.018,.46,M.mustard)}
for(const x of [3.91,6.22]){for(let i=0;i<10;i++){const z=-.96-i*.48,h=.22+i*.34;hero.place('LNG_baluster',room,x,h+.025,z)}rod(V(x,.98,-.89),V(x,4.12,-5.35),.075,M.timber);for(const [z,y] of [[-.97,.70],[-5.3,3.83]])hero.place('LNG_newel',room,x,y-.62,z)}
block(5.08,-3.14,2.55,4.98,'non-playable stairs');
// Small reception/cabinet zone, closed off by furniture rather than another room.
const receptionStart=room.children.length, receptionLights=scene.children.length;
hero.place('LNG_reception',room,5.53,0,2.53,-Math.PI/2);
lamp(5.56,1.55,3.21,.78);books(5.46,1.55,1.86,3,false);
box(5.04,1.57,2.44,.55,.033,.76,M.paper,.01).rotation.y=.2;
cyl(4.9,1.61,3.1,.14,.08,M.brass);sphere(4.9,1.7,3.1,.12,.095,.12,M.brass);cyl(4.9,1.81,3.1,.032,.07,M.timber);
block(5.53,2.53,1.86,2.62,'reception cabinet');
for(const o of room.children.slice(receptionStart)){o.position.x+=.3;o.position.z+=.15}
for(const o of scene.children.slice(receptionLights)){if(o.isLight){o.position.x+=.3;o.position.z+=.15}}
collisions.at(-1).minX+=.3;collisions.at(-1).maxX+=.3;collisions.at(-1).minZ+=.15;collisions.at(-1).maxZ+=.15;
// Umbrella stand beside the front door, on its hinge side (Step 12).
hero.place('LNG_umbrella',room,-6.3,0,3.2);
block(-6.3,3.2,.6,.6,'umbrella stand');

// A single cup accompanies the letter; the extra teapot has been cleared away.
// A lamp-lit key hook strip belongs to the owner; it is not another interaction.
// Step 12: Ada's key rings hang on the reception desk's front now (world/lounge-dress12.js).
// Merge static opaque pieces by material. Transparent light pools retain their own draw order.
function mergeRoom(){room.updateMatrixWorld(true);const buckets=new Map(),remove=[];room.traverse(o=>{if(o.isMesh&&!o.material.transparent&&o.material!==rainMat&&o.material!==flameMat){const key=o.material.uuid+'|'+o.castShadow+'|'+o.receiveShadow;let b=buckets.get(key);if(!b)buckets.set(key,b={material:o.material,cast:o.castShadow,receive:o.receiveShadow,gs:[]});let g=o.geometry.clone();if(g.index)g=g.toNonIndexed();g.applyMatrix4(o.matrixWorld);b.gs.push(g);remove.push(o)}});for(const o of remove)o.removeFromParent();for(const b of buckets.values()){const g=mergeGeometries(b.gs,false);const o=new THREE.Mesh(g,b.material);o.castShadow=b.cast;o.receiveShadow=b.receive;scene.add(o);b.gs.forEach(x=>x.dispose())}}
mergeRoom();
const loungeRoot=new THREE.Group();for(const child of [...scene.children])loungeRoot.add(child);scene.add(loungeRoot);
const kit=createKit({M:extendMaterials(M,canvasTexture),canvasTexture});
const loungeArch=buildLounge12({root:loungeRoot,M,kit,rainMat,canvasTexture});

const atlas=await new THREE.TextureLoader().loadAsync('./assets/cast-atlas.png');atlas.colorSpace=THREE.SRGBColorSpace;atlas.anisotropy=8;atlas.generateMipmaps=true;
const atlasRegions=[[20,38,565,698],[643,38,1101,698],[1142,8,1588,698],[1658,30,2132,698]];
function regionMap(i){const [x,y,r,b]=atlasRegions[i];const t=atlas.clone();t.offset.set(x/2172,1-b/724);t.repeat.set((r-x)/2172,(b-y)/724);t.needsUpdate=true;return t}
const maps=atlasRegions.map((_,i)=>regionMap(i));
const shadowTex=canvasTexture(128,128,(c,W,H)=>{const g=c.createRadialGradient(W/2,H/2,3,W/2,H/2,W/2);g.addColorStop(0,'#00000090');g.addColorStop(.48,'#00000048');g.addColorStop(1,'#00000000');c.fillStyle=g;c.fillRect(0,0,W,H)});
function actor(name,index,x,z,h){const [l,t,r,b]=atlasRegions[index];const g=new THREE.PlaneGeometry(h*(r-l)/(b-t),h/.837);g.translate(0,h/.837/2,0);const m=new THREE.MeshBasicMaterial({map:maps[index],alphaTest:.5,side:THREE.DoubleSide,color:'#fff6df',toneMapped:false});const o=new THREE.Mesh(g,m);o.quaternion.setFromAxisAngle(V(0,1,0),Math.atan2(13,20));o.position.set(x,.07,z);o.renderOrder=0;scene.add(o);const sh=mesh(new THREE.PlaneGeometry(1.25,.8),new THREE.MeshBasicMaterial({map:shadowTex,transparent:true,depthWrite:false,opacity:.7}),x,.079,z,scene);sh.rotation.x=-Math.PI/2;sh.castShadow=false;return {name,mesh:o,shadow:sh,x,z,h,index,phase:rand()*6,baseQ:o.quaternion.clone()}}
const aren=actor('Aren Vale',0,-3.90,3.75,2.03);
const mira=actor('Mira Senn',2,-3.0,-1.85,2.14);
// Step 15: Ada at the master canon's 0.90 of Aren (2.03), as Elias (1.08) and Victor (1.15) already were; she was 0.926.
const ada=actor('Ada Moss',3,3.30,-.34,1.827);
const elias=actor('Elias Brann',0,.5,-2.7,2.1924);
const victor=actor('Victor Soren',0,0,0,2.3345);
await runStep7({scene,camera,renderer,loungeRoot,materials:M,canvasTexture,rainMat,rainUniforms,fireLight,tableLight,actors:{aren,mira,ada,elias,victor},rearMap:maps[1],collisions,anchors,flameLevel,kit,loungeArch,hero});
