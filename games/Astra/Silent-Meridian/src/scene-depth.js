// A single reusable WebGL layer: illustrated depth, solid brass geometry and
// perspective particles. Puzzle rules and pointer targets remain in the DOM.
export const SCENE_PROFILES = {
  observatory: { light: [.45, .08], focus: [.64, .39], size: .28, kind: 'armillary', water: .75, tint: [.54, .78, .77] },
  archive: { light: [.78, .15], focus: [.55, .46], size: .16, kind: 'archive', water: 1.1, tint: [.83, .68, .44] },
  radio: { light: [.54, .12], focus: [.57, .47], size: .13, kind: 'signal', water: 1.1, tint: [.46, .79, .71] },
  cistern: { light: [.23, .25], focus: [.57, .71], size: .27, kind: 'tide', water: .65, tint: [.40, .73, .79] },
  ferry: { light: [.65, .22], focus: [.24, .53], size: .15, kind: 'compass', water: .70, tint: [.61, .75, .83] },
  garden: { light: [.51, .12], focus: [.50, .43], size: .19, kind: 'seed', water: .77, tint: [.65, .83, .49] },
  lighthouse: { light: [.54, .18], focus: [.52, .34], size: .31, kind: 'beacon', water: .79, tint: [.83, .64, .56] },
};

export function renderSize(width, height, dpr = 1, coarse = false) {
  if (![width, height].every(n => Number.isFinite(n) && n > 0)) return [1, 1];
  const density = Number.isFinite(dpr) && dpr > 0 ? dpr : 1;
  const scale = Math.min(density, 1.5, 2048 / width, 2048 / height, Math.sqrt((coarse ? 700000 : 1600000) / (width * height)));
  return [Math.max(1, Math.floor(width * scale)), Math.max(1, Math.floor(height * scale))];
}

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const smooth = (a, b, n) => { const t = clamp((n - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const depthAt = (x, y) => .12 + .60 * smooth(.32, 1, y) + .20 * Math.pow(Math.abs(x - .5) * 2, 3);

// Invert the same sampling transform used by the background shader. This keeps
// the clue markers on their illustrated objects while the camera moves.
export function projectScenePoint(x, y, pointer, aspect) {
  let u = x, v = y;
  for (let i = 0; i < 5; i++) {
    const depth = depthAt(u, v);
    u = (x - .5 - pointer[0] * .024 * depth / aspect) / .974 + .5;
    v = (y - .5 - pointer[1] * .024 * depth) / .974 + .5;
  }
  return [u, v];
}

function torus(segments = 72, sides = 8) {
  const data = [];
  const vertex = (a, b) => {
    const c = Math.cos(a), s = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
    data.push((1 + .025 * cb) * c, (1 + .025 * cb) * s, .025 * sb, cb * c, cb * s, sb);
  };
  for (let i = 0; i < segments; i++) for (let j = 0; j < sides; j++) {
    const a = i * Math.PI * 2 / segments, b = j * Math.PI * 2 / sides;
    const da = Math.PI * 2 / segments, db = Math.PI * 2 / sides;
    vertex(a,b); vertex(a+da,b); vertex(a+da,b+db);
    vertex(a,b); vertex(a+da,b+db); vertex(a,b+db);
  }
  return new Float32Array(data);
}

function crystal() {
  const data = [], top = [0,1.1,0], bottom = [0,-1.1,0];
  const ring = [[.6,0,0],[0,0,.6],[-.6,0,0],[0,0,-.6]];
  for (let i = 0; i < 4; i++) for (const vertices of [[top,ring[i],ring[(i+1)%4]],[bottom,ring[(i+1)%4],ring[i]]]) {
    const [a,b,c] = vertices, u = b.map((n,j)=>n-a[j]), v = c.map((n,j)=>n-a[j]);
    const n = [u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
    const length = Math.hypot(...n);
    for (const p of vertices) data.push(...p,...n.map(value=>value/length));
  }
  return new Float32Array(data);
}

const QUAD_VERTEX = `
attribute vec2 aPosition;
varying vec2 vUv;
void main(){ vUv=vec2(aPosition.x*.5+.5,.5-aPosition.y*.5); gl_Position=vec4(aPosition,0.,1.); }
`;
const BACKGROUND_FRAGMENT = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uImage;
uniform vec2 uPointer;
uniform vec2 uLight;
uniform vec3 uTint;
uniform float uAspect;
uniform float uTime;
uniform float uWater;
void main(){
  float depth=.12+.60*smoothstep(.32,1.,vUv.y)+.20*pow(abs(vUv.x-.5)*2.,3.);
  vec2 uv=(vUv-.5)*.974+.5+uPointer*vec2(.024/uAspect,.024)*depth;
  vec3 color=texture2D(uImage,uv).rgb;
  float below=max(0.,uv.y-uLight.y);
  float beam=exp(-pow((uv.x-uLight.x-below*.15)/(below*.32+.028),2.));
  float shafts=.55+.45*sin(uv.x*115.-uv.y*17.+sin(uTime*.13)*.7);
  float luminosity=beam*shafts*smoothstep(0.,.15,below)*(1.-smoothstep(.25,.9,below));
  color+=uTint*luminosity*.115;
  float water=smoothstep(uWater,uWater+.15,uv.y);
  float ripples=pow(.5+.5*sin(uv.y*230.+sin(uv.x*31.+uTime*.27)*2.-uTime*.7),12.);
  color+=uTint*water*ripples*.032;
  float mist=smoothstep(.53,.91,uv.y)*(.5+.5*sin(uv.x*8.+uTime*.08))* .024;
  gl_FragColor=vec4(color+uTint*mist,1.);
}
`;
const SOLID_VERTEX = `
attribute vec3 aPosition;
attribute vec3 aNormal;
uniform vec3 uRotation;
uniform vec2 uAnchor;
uniform float uSize;
uniform float uAspect;
varying vec3 vNormal;
varying vec3 vPosition;
vec3 rotate(vec3 p){
  float c=cos(uRotation.x),s=sin(uRotation.x); p=vec3(p.x,p.y*c-p.z*s,p.y*s+p.z*c);
  c=cos(uRotation.y);s=sin(uRotation.y);p=vec3(p.x*c+p.z*s,p.y,-p.x*s+p.z*c);
  c=cos(uRotation.z);s=sin(uRotation.z);return vec3(p.x*c-p.y*s,p.x*s+p.y*c,p.z);
}
void main(){
  vec3 p=rotate(aPosition); vNormal=rotate(aNormal); vPosition=p;
  float perspective=3.8/(3.8-p.z*.45);
  gl_Position=vec4(uAnchor+p.xy*uSize*vec2(1./uAspect,1.)*perspective,-p.z*.10,1.);
}
`;
const SOLID_FRAGMENT = `
precision mediump float;
uniform vec3 uColor;
uniform float uGlow;
varying vec3 vNormal;
varying vec3 vPosition;
void main(){
  vec3 n=normalize(vNormal);
  float diffuse=max(0.,dot(n,normalize(vec3(-.6,1.,1.5))));
  float specular=pow(max(0.,dot(n,normalize(vec3(-.3,.5,1.8)))),28.);
  float edge=pow(1.-abs(n.z),2.);
  float patina=.94+.06*sin(vPosition.x*42.)*sin(vPosition.y*31.);
  vec3 color=uColor*(.25+diffuse*.75)*patina+vec3(.87,.83,.65)*specular*.55+uColor*edge*uGlow;
  gl_FragColor=vec4(color,1.);
}
`;
const PARTICLE_VERTEX = `
attribute vec3 aPosition;
uniform vec2 uPointer;
uniform float uTime;
uniform float uDensity;
uniform float uAspect;
varying float vAlpha;
void main(){
  float z=aPosition.z;
  vec2 p=aPosition.xy;
  p.y=mod(p.y+1.+uTime*(.007+z*.007),2.)-1.;
  p.x+=sin(uTime*.11+aPosition.y*13.)*.013;
  p-=uPointer*vec2(.035/uAspect,-.035)*(z+.12);
  gl_Position=vec4(p,z*.3,1.);
  gl_PointSize=(1.1+pow(z,3.)*5.)*uDensity;
  vAlpha=(.13+z*.35)*smoothstep(-1.,-.8,p.y)*(1.-smoothstep(.8,1.,p.y));
}
`;
const PARTICLE_FRAGMENT = `
precision mediump float;
uniform vec3 uTint;
varying float vAlpha;
void main(){float d=length(gl_PointCoord-.5)*2.;float alpha=exp(-d*d*4.)*(1.-smoothstep(.5,1.,d));gl_FragColor=vec4(uTint,alpha*vAlpha);}
`;

export class SceneDepth {
  constructor(onStatus = () => {}) {
    this.onStatus = onStatus;
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'scene-depth';
    this.canvas.setAttribute('aria-hidden','true');
    this.pointer = [0,0]; this.target = [0,0]; this.time = 0;
    this.frame = 0; this.previousTime = 0; this.supported = null; this.lost = false;
    this.motion = matchMedia('(prefers-reduced-motion: reduce)');
    this.coarse = matchMedia('(pointer: coarse)');
    this.motion.addEventListener('change',()=>{this.pointer=[0,0];this.target=[0,0];this.refresh();});
    this.coarse.addEventListener('change',()=>this.resize());
    document.addEventListener('visibilitychange',()=>this.refresh());
    document.addEventListener('pointermove',event=>{
      if (!this.world || !this.enabled || this.paused || this.motion.matches || event.pointerType !== 'mouse') return;
      // Freeze on an interactive target instead of moving the button away.
      if (event.target.closest('button,a,input,textarea,dialog,nav,.topbar')) {this.target=[...this.pointer];return;}
      const r=this.world.getBoundingClientRect();
      this.target=[clamp((event.clientX-r.left)/r.width*2-1,-1,1),clamp((event.clientY-r.top)/r.height*2-1,-1,1)];
    },{passive:true});
    document.documentElement.addEventListener('pointerleave',()=>{this.target=[0,0];});
    this.canvas.addEventListener('webglcontextlost',event=>{
      event.preventDefault(); this.lost=true; this.stop(); this.fallback('unavailable');
    });
    this.canvas.addEventListener('webglcontextrestored',()=>{
      this.lost=false; this.supported=null; this.uploaded=null;
      if(this.initialize())this.refresh();
    });
    this.observer = new ResizeObserver(()=>this.resize());
  }

  initialize() {
    if(this.supported !== null)return this.supported;
    const gl=this.canvas.getContext('webgl',{alpha:false,antialias:true,depth:true,stencil:false,powerPreference:'low-power'});
    if(!gl){this.supported=false;return false;}
    this.gl=gl; this.resources=[];
    try {
      const program=(vs,fs,names)=>{
        const p=gl.createProgram(); this.resources.push(['Program',p]);
        for(const [type,source] of [[gl.VERTEX_SHADER,vs],[gl.FRAGMENT_SHADER,fs]]) {
          const shader=gl.createShader(type); gl.shaderSource(shader,source); gl.compileShader(shader);gl.attachShader(p,shader);gl.deleteShader(shader);
        }
        gl.bindAttribLocation(p,0,'aPosition');gl.bindAttribLocation(p,1,'aNormal');gl.linkProgram(p);
        if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error('Scene shader unavailable');
        return {p,u:Object.fromEntries(names.map(n=>[n,gl.getUniformLocation(p,n)]))};
      };
      const buffer=data=>{const b=gl.createBuffer();this.resources.push(['Buffer',b]);gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);return {b,count:data.length};};
      this.background=program(QUAD_VERTEX,BACKGROUND_FRAGMENT,['uImage','uPointer','uLight','uTint','uAspect','uTime','uWater']);
      this.solid=program(SOLID_VERTEX,SOLID_FRAGMENT,['uRotation','uAnchor','uSize','uAspect','uColor','uGlow']);
      this.particle=program(PARTICLE_VERTEX,PARTICLE_FRAGMENT,['uPointer','uTime','uDensity','uAspect','uTint']);
      this.quad=buffer(new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]));
      this.ring=buffer(torus()); this.gem=buffer(crystal());
      let seed=917; const random=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
      this.dust=buffer(new Float32Array(Array.from({length:96},()=>[random()*2-1,random()*2-1,random()]).flat()));
      this.texture=gl.createTexture();this.resources.push(['Texture',this.texture]);
      gl.bindTexture(gl.TEXTURE_2D,this.texture);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
      this.supported=true; return true;
    } catch {
      for(const [type,resource] of this.resources)gl[`delete${type}`](resource);
      this.resources=[];this.supported=false;return false;
    }
  }

  attach(world,{room,enabled,paused,echo,solved=0}) {
    this.stop();this.observer.disconnect();this.loadController?.abort();
    this.world?.classList.remove('depth-ready');
    this.world=world; this.image=world.querySelector('.scene-image');
    if(this.room!==room){this.pointer=[0,0];this.target=[0,0];}
    this.room=room;this.profile=SCENE_PROFILES[room]||SCENE_PROFILES.observatory;
    this.enabled=enabled;this.paused=paused;this.echo=echo;this.solved=solved;
    this.points=[...world.querySelectorAll('.hotspot')].map(el=>({el,x:parseFloat(el.style.left)/100,y:parseFloat(el.style.top)/100}));
    world.append(this.canvas);this.observer.observe(world);
    this.loadController=new AbortController();
    this.image.addEventListener('load',()=>this.refresh(),{once:true,signal:this.loadController.signal});
    this.refresh();
  }

  fallback(status) {
    this.world?.classList.remove('depth-ready');this.canvas.hidden=true;
    for(const {el} of this.points||[])el.style.removeProperty('translate');
    document.body.dataset.depth='off';this.onStatus(status);
  }

  refresh() {
    this.stop();
    if(!this.world)return;
    if(!this.enabled){this.fallback('off');return;}
    if(this.lost || !this.initialize()){this.fallback('unavailable');return;}
    if(!this.image.complete || !this.image.naturalWidth){this.fallback('loading');return;}
    try {
      if(this.uploaded!==this.image.src) {
        const gl=this.gl;gl.bindTexture(gl.TEXTURE_2D,this.texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,this.image);
        this.uploaded=this.image.src;
      }
      this.canvas.hidden=false;this.world.classList.add('depth-ready');document.body.dataset.depth='on';
      this.resize();this.onStatus(this.motion.matches?'still':'on');
    } catch {this.supported=false;this.fallback('unavailable');}
  }

  resize() {
    if(!this.world || this.canvas.hidden || !this.enabled || !this.supported || this.lost || !this.uploaded)return;
    const width=this.world.clientWidth,height=this.world.clientHeight;
    if(!width || !height)return;
    this.width=width;this.height=height;this.aspect=width/height;
    const [w,h]=renderSize(width,height,devicePixelRatio,this.coarse.matches);
    if(this.canvas.width!==w || this.canvas.height!==h){this.canvas.width=w;this.canvas.height=h;}
    this.stop();this.draw();this.schedule();
  }

  stop(){cancelAnimationFrame(this.frame);this.frame=0;this.previousTime=0;}
  schedule(){if(!this.frame && !this.paused && !this.motion.matches && !document.hidden && this.enabled && !this.lost)this.frame=requestAnimationFrame(t=>this.tick(t));}
  tick(now) {
    this.frame=0;
    const delta=this.previousTime?Math.min((now-this.previousTime)/1000,.05):0;
    if(this.coarse.matches && this.previousTime && delta<1/32){this.schedule();return;}
    this.previousTime=now;this.time+=delta;
    const target=this.coarse.matches?[Math.sin(this.time*.13)*.15,Math.cos(this.time*.11)*.08]:this.target;
    const ease=1-Math.exp(-delta*5);
    this.pointer=this.pointer.map((n,i)=>n+(target[i]-n)*ease);
    this.draw();this.schedule();
  }

  draw() {
    if(!this.aspect || this.lost || !this.supported || !this.uploaded)return;
    const gl=this.gl,p=this.profile,point=this.motion.matches?[0,0]:this.pointer;
    const time=this.motion.matches?0:this.time;
    gl.viewport(0,0,this.canvas.width,this.canvas.height);
    gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.disable(gl.BLEND);gl.disable(gl.DEPTH_TEST);gl.disableVertexAttribArray(1);
    gl.useProgram(this.background.p);gl.bindBuffer(gl.ARRAY_BUFFER,this.quad.b);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
    const b=this.background.u;
    gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,this.texture);gl.uniform1i(b.uImage,0);
    gl.uniform2fv(b.uPointer,point);gl.uniform2fv(b.uLight,p.light);gl.uniform3fv(b.uTint,p.tint);
    gl.uniform1f(b.uAspect,this.aspect);gl.uniform1f(b.uTime,time);gl.uniform1f(b.uWater,p.water);gl.drawArrays(gl.TRIANGLES,0,6);
    this.drawObjects(time,point);
    gl.disable(gl.DEPTH_TEST);gl.disableVertexAttribArray(1);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE);
    gl.useProgram(this.particle.p);gl.bindBuffer(gl.ARRAY_BUFFER,this.dust.b);gl.vertexAttribPointer(0,3,gl.FLOAT,false,0,0);
    const d=this.particle.u;
    gl.uniform2fv(d.uPointer,point);gl.uniform1f(d.uTime,time);gl.uniform1f(d.uAspect,this.aspect);gl.uniform1f(d.uDensity,this.canvas.width/this.width);
    gl.uniform3fv(d.uTint,this.echo?[.9,.77,.52]:[.78,.83,.74]);gl.drawArrays(gl.POINTS,0,this.coarse.matches?48:96);
    gl.disable(gl.BLEND);
    for(const {el,x,y} of this.points){const [u,v]=projectScenePoint(x,y,point,this.aspect);el.style.translate=`${((u-x)*this.width).toFixed(2)}px ${((v-y)*this.height).toFixed(2)}px`;}
  }

  drawObjects(time,point) {
    const gl=this.gl,p=this.profile,u=this.solid.u;
    gl.useProgram(this.solid.p);gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.enableVertexAttribArray(1);
    const [x,y]=projectScenePoint(...p.focus,point,this.aspect);
    gl.uniform1f(u.uAspect,this.aspect);gl.uniform2f(u.uAnchor,x*2-1,1-y*2);
    gl.uniform1f(u.uGlow,this.echo?.5:.16+this.solved*.07);
    const brass=this.echo?[.72,.60,.36]:[.59,.50,.32];
    const turn=time*(this.echo?-.09:.055);
    const draw=(geometry,size,rotation,color=brass,offset=[0,0])=>{
      gl.bindBuffer(gl.ARRAY_BUFFER,geometry.b);gl.vertexAttribPointer(0,3,gl.FLOAT,false,24,0);gl.vertexAttribPointer(1,3,gl.FLOAT,false,24,12);
      gl.uniform2f(u.uAnchor,x*2-1+offset[0]/this.aspect,1-y*2+offset[1]);
      gl.uniform1f(u.uSize,p.size*size);gl.uniform3fv(u.uRotation,[rotation[0]+point[1]*.10,rotation[1]+point[0]*.18,rotation[2]]);
      gl.uniform3fv(u.uColor,color);gl.drawArrays(gl.TRIANGLES,0,geometry.count/6);
    };
    if(p.kind==='armillary' || p.kind==='beacon') {
      draw(this.ring,1,[.42,turn+.48,.13]);draw(this.ring,.87,[1.25,turn-.65,.7]);draw(this.ring,.72,[.30,1.15-turn,-.3]);
      draw(this.gem,.15,[.3,turn,0],p.tint);
    } else if(p.kind==='tide') {
      for(let i=0;i<3;i++)draw(this.ring,1-i*.23,[1.18,.15,turn*(i%2?-1:1)],i===1?p.tint:brass,[0,i*.012]);
    } else if(p.kind==='signal') {
      for(let i=0;i<3;i++)for(let j=0;j<3;j++)draw(this.ring,.32,[.28,turn+i*.5,j*.35],j===1?p.tint:brass,[(i-1)*.11,j*.016]);
    } else if(p.kind==='seed') {
      draw(this.gem,.52,[.15,turn*.8,.12],p.tint);draw(this.ring,1,[1.14,turn,.4]);draw(this.ring,.79,[.2,turn+1.1,-.5]);
    } else if(p.kind==='archive') {
      for(let i=0;i<3;i++){draw(this.ring,.75,[1.05,turn*.3,.2],brass,[0,(i-1)*.09]);draw(this.gem,.14,[.1,turn+i,.2],p.tint,[(i-1)*.06,(i-1)*.09]);}
    } else {
      draw(this.ring,1,[.9,.12,turn]);draw(this.ring,.7,[.45,turn,.3]);draw(this.gem,.20,[.2,turn,.7],p.tint);
    }
  }
}
