import{A as e,Fr as t,Lt as n,U as r,ar as i,fa as a,io as o,ir as s,j as c,no as l,ro as u,ta as d,tr as f}from"./three.core-Dp-eO7LC.js";import{t as p}from"./glsl-g9hpiSYu.js";var m=`
uniform sampler2DShadow uShadowMap;
uniform mat4 uShadowMatrix;
uniform float uHasShadow;
uniform vec3 uShellMin, uShellMax, uSunToward, uHall;
// analytic openings of the hall shell (hall.js layout): west renji windows (bays 1-4,
// diagonal bars every 0.19 m) and the three open front bays. Used only for sun rays whose
// shadow-map occluder lies outside the shell.
float shellOpen(vec3 wp, vec3 d){
  float m = 0.0;
  float tw = (uHall.x - 13.0 - wp.x) / d.x;
  vec3 p = wp + d * tw;
  float zl = p.z - uHall.y;
  if (tw > 0.0 && zl > -5.1 && zl < 8.5 && p.y > 3.14 && p.y < 5.78) {
    float bz = mod(zl + 5.1, 3.4);
    float frame = smoothstep(0.13, 0.16, bz) * smoothstep(3.27, 3.24, bz);
    float bar = abs(fract((bz - 0.24) / 0.19 + 0.5) - 0.5) * 0.19;
    m = frame * smoothstep(0.02, 0.03, bar);
  }
  float tf = (uHall.y + 8.5 - wp.z) / d.z;
  vec3 q = wp + d * tf;
  float xl = q.x - uHall.x;
  if (tf > 0.0 && abs(xl) < 5.5 && q.y > uHall.z && q.y < 5.78) {
    float colm = smoothstep(0.3, 0.36, abs(abs(xl) - 1.857));
    m = max(m, colm * (q.y < 3.41 ? 1.0 : 0.45));
  }
  return m;
}
float sunVis(vec3 wp){
  if (uHasShadow < 0.5) return 0.0;
  vec4 sc = uShadowMatrix * vec4(wp, 1.0);
  vec3 c = sc.xyz / sc.w;
  if (c.x < 0.0 || c.x > 1.0 || c.y < 0.0 || c.y > 1.0 || c.z > 1.0) return 0.0;
  float A = texture(uShadowMap, vec3(c.xy, c.z - 0.0008));
  vec3 d = uSunToward; d = sign(d) * max(abs(d), vec3(1e-4));
  vec3 tb = (mix(uShellMin, uShellMax, step(0.0, d)) - wp) / d;
  float te = max(min(min(tb.x, tb.y), tb.z), 0.0);
  vec4 se = uShadowMatrix * vec4(wp + d * te, 1.0);
  float B = texture(uShadowMap, vec3(c.xy, se.z / se.w - 0.0008));
  // B == 1: nothing outside the shell -> exact shadow test A. B == 0: an outside occluder hides
  // what the shell does -> analytic openings instead.
  return mix(shellOpen(wp, d), A, B);
}
`,h=(e,t)=>({uShellMin:{value:new u(...e.shell.min)},uShellMax:{value:new u(...e.shell.max)},uSunToward:t.uSunDir,uHall:{value:new u(e.cx,e.cz,e.Y0)}});function g(e){let t=null;return e.traverse(e=>{!t&&e.isDirectionalLight&&e.castShadow&&(t=e)}),t}function _(e,t,{slices:_=56,near:v=.4,far:y=34,density:b=.055}={}){let{scene:x,G:S}=e,C=[],w=[];for(let e=0;e<_;e++){let t=C.length/3;C.push(-1,-1,e,1,-1,e,1,1,e,-1,1,e),w.push(t,t+1,t+2,t,t+2,t+3)}let T=new c;T.setAttribute(`position`,new n(C,3)),T.setIndex(w);let E=t.volume,D=new d({uniforms:{uShadowMap:{value:null},uShadowMatrix:{value:new s},uHasShadow:{value:0},...h(t,S),uSunDir:S.uSunDir,uSunColor:S.uSunColor,uTime:S.uTime,uNear:{value:v},uFar:{value:y},uN:{value:_},uJit:{value:0},uTan:{value:new l(1,1)},uBoxMin:{value:new u(...E.min)},uBoxMax:{value:new u(...E.max)},uDensity:{value:b},uPL:{value:Array.from({length:6},()=>new o(0,-100,0,0))},uPLColor:{value:new r().setRGB(1,.62,.3)},uAmb:{value:new r().setRGB(.5,.33,.17).multiplyScalar(t.hazeAmb??.0035)},uHaloK:{value:t.haloK??.035},uKOut:{value:1}},vertexShader:`
      uniform float uNear, uFar, uN, uJit; uniform vec2 uTan;
      varying vec3 vW; varying float vThick; varying vec3 vView;
      void main(){
        float t = clamp((position.z + uJit) / uN, 0.0, 1.0);
        float k = log(uFar / uNear);
        float d = uNear * exp(k * t);
        vec3 vp = vec3(position.x * uTan.x * d * 1.02, position.y * uTan.y * d * 1.02, -d);
        mat4 camW = inverse(viewMatrix);
        vW = (camW * vec4(vp, 1.0)).xyz;
        vView = normalize(vW - cameraPosition);
        vThick = d * k / uN;
        gl_Position = projectionMatrix * vec4(vp, 1.0);
      }
    `,fragmentShader:`
      precision highp sampler2DShadow;
      ${p}
      ${m}
      uniform vec3 uSunDir; uniform vec3 uSunColor; uniform float uTime; uniform float uDensity;
      uniform vec3 uBoxMin, uBoxMax;
      uniform vec4 uPL[6]; uniform vec3 uPLColor; uniform vec3 uAmb; uniform float uHaloK; uniform float uKOut;
      varying vec3 vW; varying float vThick; varying vec3 vView;
      void main(){
        vec3 w = vW;
        if (any(lessThan(w, uBoxMin)) || any(greaterThan(w, uBoxMax))) discard;
        // soft fade near the volume boundary
        vec3 e = min(w - uBoxMin, uBoxMax - w);
        float edge = smoothstep(0.0, 0.6, min(min(e.x, e.y), e.z));
        // dusty, slowly drifting density
        vec3 q = w * vec3(0.55, 0.9, 0.55) + vec3(0.0, -uTime * 0.03, uTime * 0.012);
        float n = n_vnoise3(q) * 0.65 + n_vnoise3(q * 2.7 + 3.1) * 0.35;
        float dn = (0.22 + 1.45 * n * n) * edge;
        // sun: forward-scattering HG blended with isotropic, shadowed
        float vis = sunVis(w);
        float mu = dot(vView, uSunDir);
        float g = 0.62;
        float hg = (1.0 - g * g) / pow(1.0 + g * g - 2.0 * g * mu, 1.5);
        float phase = 0.6 + 0.4 * hg * 0.25;
        vec3 col = uSunColor * vis * uDensity * dn * phase * 0.08;
        // lantern / candle halos (unshadowed point-light in-scattering)
        vec3 pl = vec3(0.0);
        for (int i = 0; i < 6; i++) {
          vec3 d = uPL[i].xyz - w;
          float d2 = dot(d, d);
          float mu2 = dot(vView, normalize(d));
          float ph = 0.3 + 0.7 * pow(max(mu2, 0.0), 6.0);
          pl += uPL[i].w * ph / (d2 + 0.04);
        }
        col += uPLColor * pl * uHaloK * dn * 0.1;
        // warm ambient incense haze
        col += uAmb * dn;
        col *= vThick * uKOut;
        if (dot(col, vec3(1.0)) < 1e-6) discard;
        gl_FragColor = vec4(col, 1.0);
      }
    `,transparent:!0,depthWrite:!1,depthTest:!0,blending:2,fog:!1,toneMapped:!1}),O=new i(T,D);O.name=`interior-shafts`;{let e=new u().addVectors(new u(...E.min),new u(...E.max)).multiplyScalar(.5);T.boundingSphere=new a(e,e.distanceTo(new u(...E.max)))}O.frustumCulled=!0,O.renderOrder=10,O.castShadow=!1,O.receiveShadow=!1;let k=null,A=0;return O.onBeforeRender=(e,n,r)=>{k||=g(x);let i=D.uniforms;if(k&&k.shadow&&k.shadow.map&&k.shadow.map.depthTexture?(i.uShadowMap.value=k.shadow.map.depthTexture,i.uShadowMatrix.value.copy(k.shadow.matrix),i.uHasShadow.value=1):i.uHasShadow.value=0,r.isPerspectiveCamera){let e=Math.tan(f.degToRad(r.fov*.5));i.uTan.value.set(e*r.aspect,e)}{let e=r.position,t=E.min,n=E.max,a=e.x>t[0]&&e.x<n[0]&&e.y>t[1]-1&&e.y<n[1]&&e.z>t[2]&&e.z<n[2];i.uKOut.value=a?1:.38}let a=t.pointLights||[];for(let e=0;e<6;e++){let t=a[e];t&&t.visible&&!t.userData.noHalo?i.uPL.value[e].set(t.position.x,t.position.y,t.position.z,t.intensity):i.uPL.value[e].set(0,-100,0,0)}A++;{let t=e.getRenderTarget(),n=t?t.width:e.domElement.width,a=r.projectionMatrix.elements[8]*n*.5;i.uJit.value=Math.max(-.5,Math.min(.5,a*.5))}},O}function v(n,r,{count:i=700}={}){let{G:a,scene:o}=n,u=n.rng(`interior-dust`),f=r.dustBox,p=new Float32Array(i*3),_=new Float32Array(i*4);for(let e=0;e<i;e++)p[e*3]=u.range(f.min[0],f.max[0]),p[e*3+1]=u.range(f.min[1],f.max[1]),p[e*3+2]=u.range(f.min[2],f.max[2]),_[e*4]=u.float(),_[e*4+1]=u.float(),_[e*4+2]=u.float(),_[e*4+3]=u.float();let v=new c;v.setAttribute(`position`,new e(p,3)),v.setAttribute(`seed`,new e(_,4));let y=new d({uniforms:{uShadowMap:{value:null},uShadowMatrix:{value:new s},uHasShadow:{value:0},...h(r,a),uTime:a.uTime,uSunColor:a.uSunColor,uSize:{value:1}},vertexShader:`
      precision highp sampler2DShadow;
      ${m}
      attribute vec4 seed; uniform float uTime; uniform float uSize;
      varying float vB; varying float vTw;
      void main(){
        vec3 p = position;
        float t = uTime;
        p += vec3(sin(t * (0.07 + seed.x * 0.05) + seed.y * 6.28) * 0.35, sin(t * (0.05 + seed.z * 0.04) + seed.w * 6.28) * 0.25, cos(t * (0.06 + seed.w * 0.05) + seed.x * 6.28) * 0.35);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        float vis = sunVis(p);
        vB = vis * (0.4 + 0.6 * seed.z);
        vTw = 0.78 + 0.22 * sin(t * (0.9 + seed.y * 1.4) + seed.x * 30.0);
        gl_PointSize = clamp(uSize * (0.012 + 0.02 * seed.w) * 900.0 / -mv.z, 1.6, 6.0);
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform vec3 uSunColor; varying float vB; varying float vTw;
      void main(){
        vec2 c = gl_PointCoord - 0.5; float r = dot(c, c) * 4.0;
        float a = exp(-r * 3.0);
        vec3 col = uSunColor * (0.015 + vB * 1.2) * vTw * a * 0.5;
        if (a < 0.01) discard;
        gl_FragColor = vec4(col, 1.0);
      }
    `,transparent:!0,depthWrite:!1,blending:2,fog:!1}),b=new t(v,y);b.name=`interior-dust`,v.computeBoundingSphere(),v.boundingSphere.radius+=1,b.frustumCulled=!0;let x=null;return b.onBeforeRender=(e,t,n)=>{x||=g(o);let r=y.uniforms;x&&x.shadow&&x.shadow.map&&x.shadow.map.depthTexture?(r.uShadowMap.value=x.shadow.map.depthTexture,r.uShadowMatrix.value.copy(x.shadow.matrix),r.uHasShadow.value=1):r.uHasShadow.value=0,r.uSize.value=e.getDrawingBufferSize(new l).y/1080},b}function y(e,t,{height:r=1.4,perSource:a=3,width:o=.16}={}){let{G:s}=e,l=[],u=[],f=[],m=[],h=[],g=[],_=0;t.forEach((e,t)=>{for(let n=0;n<a;n++){let r=n/a*Math.PI+t*.7,i=Math.cos(r),s=Math.sin(r),c=t*3.1+n*1.7;for(let t=0;t<=48;t++){let r=t/48;for(let t=0;t<2;t++)l.push(e[0],e[1],e[2]),u.push(t,r),f.push(e[0]+(n-1)*.012,e[1],e[2]),m.push(i*o,0,s*o),h.push(c);if(t<48){let e=_+t*2;g.push(e,e+1,e+3,e,e+3,e+2)}}_+=98}});let v=new c;v.setAttribute(`position`,new n(l,3)),v.setAttribute(`uv`,new n(u,2)),v.setAttribute(`aBase`,new n(f,3)),v.setAttribute(`aSide`,new n(m,3)),v.setAttribute(`aSeed`,new n(h,1)),v.setIndex(g);let y=new d({uniforms:{uTime:s.uTime,uSunColor:s.uSunColor,uH:{value:r}},vertexShader:`
      ${p}
      attribute vec3 aBase; attribute vec3 aSide; attribute float aSeed;
      uniform float uTime; uniform float uH;
      varying vec2 vUv; varying float vH; varying float vSeed;
      void main(){
        vUv = uv; vSeed = aSeed;
        float h = uv.y * uH;
        vH = h;
        float t = uTime * 0.6 + aSeed * 17.0;
        float k = h * 0.6 + h * h * 0.5;
        vec3 p = aBase + vec3(0.0, h, 0.0);
        p += aSide * (uv.x - 0.5) * (0.035 + 1.3 * smoothstep(0.0, 1.3, h));
        p.x += (n_snoise(vec2(h * 2.2 - t * 1.1, aSeed)) * 0.09 + sin(h * 7.0 - t * 2.6 + aSeed) * 0.025) * k;
        p.z += (n_snoise(vec2(h * 1.9 - t * 0.9, aSeed + 7.0)) * 0.08 + cos(h * 6.0 - t * 2.2 + aSeed) * 0.02) * k;
        gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
      }
    `,fragmentShader:`
      ${p}
      uniform float uTime; uniform vec3 uSunColor; uniform float uH;
      varying vec2 vUv; varying float vH; varying float vSeed;
      void main(){
        float x = abs(vUv.x - 0.5) * 2.0;
        float t = uTime * 0.6 + vSeed * 17.0;
        float n = n_snoise(vec2(vUv.x * 3.0 + vSeed, vH * 3.0 - t * 1.2)) * 0.5 + 0.5;
        float strands = smoothstep(0.35, 0.95, n_snoise(vec2(vUv.x * 7.0, vH * 1.5 - t * 0.8 + vSeed)) * 0.5 + 0.5);
        float a = (1.0 - x * x) * smoothstep(0.0, 0.05, vH) * (1.0 - smoothstep(uH * 0.35, uH * 0.97, vH));
        a *= (0.15 + 0.85 * strands * n) * (0.45 + 0.55 * smoothstep(0.05, 0.5, vH));
        vec3 col = vec3(1.0, 0.88, 0.74) * 0.16 + uSunColor * 0.003;
        gl_FragColor = vec4(col * a * 0.5, 1.0);
      }
    `,transparent:!0,depthWrite:!1,side:2,blending:2,fog:!1}),b=new i(v,y);return b.name=`interior-smoke`,v.computeBoundingSphere(),v.boundingSphere.radius+=1.5,b.frustumCulled=!0,b.renderOrder=11,b}export{_ as n,y as r,v as t};