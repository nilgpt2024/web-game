import{A as e,Lt as t,O as n,Tn as r,U as i,Wr as a,ar as o,in as s,ir as c,j as l,no as u,qt as d,ro as f,rr as p,sn as m,z as h}from"./three.core-Dp-eO7LC.js";import{t as g}from"./BufferGeometryUtils-BAd1TW9D.js";import{n as _,t as v}from"./pond-water-hBOuK5qz.js";import{n as y,r as b,t as x}from"./pond-beads-MUQ0FQGi.js";import{d as S}from"./pond-util-BP7rZgp3.js";import{a as C,n as ee,o as w}from"./pond-lotusgeo-BcUQYN2p.js";import{n as T,r as E,t as D}from"./pond-lotusplan-DPNkyRZj.js";var O=Math.PI*2,k=`
vec3 objectNormal = vec3(0.0, 1.0, 0.0);
`,A=`
uniform float uWaterYV;
vec3 lotusSway(vec2 a, float h, float seed){
  float t = uTime;
  vec2 wd = normalize(uWindDir);
  float ph = seed * 6.2831;
  float gust = 0.55 + 0.45 * sin(t * 0.33 + dot(a, wd) * 0.21 + 1.3) * sin(t * 0.21 + a.x * 0.07 + 0.4);
  float s1 = sin(t * (0.85 + seed * 0.3) + ph + dot(a, vec2(0.6, 0.4)));
  float s2 = sin(t * (1.7 + seed * 0.5) + ph * 1.7 + dot(a, vec2(-0.5, 0.8)));
  vec2 o = wd * (0.5 + 0.5 * s1) * gust * 0.045 + vec2(-wd.y, wd.x) * s2 * 0.014;
  float k = clamp(h, 0.0, 1.4);
  o *= k * uWindStrength;
  return vec3(o.x, -0.3 * dot(o, o) / max(k, 0.05), o.y);
}
`,j=`
uniform vec4 uLeak;
uniform float uLeakCov;
uniform float uLeakShot;
// only in the macro shot (and free cameras): elsewhere the bed reads at a
// distance next to its real shadow, where lit leaves would look wrong
float lotusLeakOn(){ return (uLeak.z > 0.0 && (uShot < -0.5 || abs(uShot - uLeakShot) < 0.5)) ? 1.0 : 0.0; }
float lotusDapple(vec3 wp){
  if (lotusLeakOn() < 0.5) return 0.0;
  vec3 sd = normalize(uSunDir);
  vec3 e1 = normalize(cross(sd, vec3(0.0, 1.0, 0.0)));
  vec3 e2 = cross(e1, sd);
  vec2 q = vec2(dot(wp, e1), dot(wp, e2));
  float n = n_fbm(q * 0.85 + vec2(3.7, 1.3), 3) + 0.3 * n_snoise(q * 2.9 + 5.1);
  float d = smoothstep(-0.2 - uLeakCov, 0.1 - uLeakCov, n);
  float zone = 1.0 - smoothstep(uLeak.z * 0.55, uLeak.z, length(wp.xz - uLeak.xy));
  return d * zone;
}
`;function M(e,{seg:n=48,rings:r=10,cup:i=.2,wave:a=.05,droop:o=0,floating:s=!1,corr:c=.012,ruffle:u=0,nR:d=11,fold:f=0,lip:p=0}){let m=[e.range(0,O),e.range(0,O),e.range(0,O),e.range(0,O),e.range(0,O),e.range(0,O)],h=e.range(0,O),g=e.range(0,O),_=[],v=[],y=[],b=e=>(e/r)**.92;_.push(0,0,0),v.push(0,0);for(let e=1;e<=r;e++){let t=b(e);for(let e=0;e<=n;e++){let r=e/n*O,l=t*(1+.028*Math.sin(3*r+m[0])+.014*Math.sin(7*r+m[1])+.006*Math.sin(13*r+m[5])),y;s?(y=.012*t+.035*S(.82,1,t)**1.5+a*.25*t**4*Math.sin(5*r+m[2]),n>=100&&(y+=.004*t*(.5-.5*Math.cos(21*r))*S(.1,.6,t)*(1-S(.85,1,t)))):(y=i*(.3*t+.7*t*t),y+=a*t**3*(Math.sin(5*r+m[2])*.6+Math.sin(9*r+m[3])*.28+Math.sin(15*r+m[4])*.12),y-=o*Math.max(0,Math.cos(r-h))**3*t**2.5,y+=c*t*(.5-.5*Math.cos(21*r))*S(.08,.5,t),y+=u*S(.6,1,t)**1.6*(Math.sin(d*r+m[4])*.7+Math.sin((2*d+1)*r+m[1])*.3),y+=f*t*t*Math.abs(Math.sin(r-g))**1.4,y-=p*S(.86,1,t)**2),_.push(l*Math.cos(r),y,l*Math.sin(r)),v.push(t,e/n)}}let x=n+1;for(let e=0;e<n;e++)y.push(0,1+e+1,1+e);for(let e=1;e<r;e++){let t=1+(e-1)*x,r=1+e*x;for(let e=0;e<n;e++){let n=t+e,i=t+e+1,a=r+e,o=r+e+1;y.push(n,i,a,i,o,a)}}let C=new l;return C.setAttribute(`position`,new t(_,3)),C.setAttribute(`uv`,new t(v,2)),C.setIndex(y),C.computeVertexNormals(),C}function N(e,{seg:n=44,rings:r=7}={}){let i=e.range(.16,.3),a=e.range(0,O),o=e.range(0,O),s=e.range(0,.05),c=[],u=[],d=[];c.push(0,.004,0),u.push(0,.5);for(let e=1;e<=r;e++){let t=e/r;for(let e=0;e<=n;e++){let r=i/2+e/n*(O-i),l=1+.02*Math.sin(4*r+a)+.008*Math.sin(11*r+o),d=.004+(.03+s)*S(.8,1,t)**2*(.6+.4*Math.sin(3*r+a))+.006*t**3*Math.sin(7*r+o);c.push(t*l*Math.cos(r),d,t*l*Math.sin(r)),u.push(t,e/n)}}let f=n+1;for(let e=0;e<n;e++)d.push(0,1+e+1,1+e);for(let e=1;e<r;e++){let t=1+(e-1)*f,r=1+e*f;for(let e=0;e<n;e++){let n=t+e,i=t+e+1,a=r+e,o=r+e+1;d.push(n,i,a,i,o,a)}}let p=new l;return p.setAttribute(`position`,new t(c,3)),p.setAttribute(`uv`,new t(u,2)),p.setIndex(d),p.computeVertexNormals(),p}function P(e,t,{L:n,W:r,cup:i=.5,bend:a=.4,curl:o=0,nu:s=9,nv:c=6,part:l=0,shape:u=.85,tipW:d=0}){let m=e.pos.length/3,h=[],g=[],_=[],v=0,y=0;for(let e=0;e<=s;e++){let t=e/s,r=a*t**1.4+o*S(.6,1,t)**2;h.push([v,y]),g.push([Math.cos(r),Math.sin(r)]),_.push([-Math.sin(r),Math.cos(r)]),v+=Math.cos(r)*n/s,y+=Math.sin(r)*n/s}let b=new f;new f,new p().getNormalMatrix(t);for(let n=0;n<=s;n++){let a=n/s,o=r*Math.sin(Math.PI*Math.min(a,.999)**+u)**(u>1.1?.5:.72)*(1-.12*a);a>.999&&(o=d),o=Math.max(o,5e-4);for(let r=0;r<=c;r++){let s=r/c*2-1,u=s*o*.5,d=i*s*s*o*.5,f=h[n][0]+_[n][0]*d,p=h[n][1]+_[n][1]*d;b.set(u,f,p).applyMatrix4(t),e.pos.push(b.x,b.y,b.z),e.uv.push(a,s),e.part.push(l)}}let x=c+1;for(let t=0;t<s;t++)for(let n=0;n<c;n++){let r=m+t*x+n,i=r+1,a=r+x,o=a+1;e.idx.push(r,a,i,i,a,o)}}function F(e,t,r,i,a,o,s=0){let c=new n(r,i,a).toNonIndexed();c.applyMatrix4(t);let l=c.attributes.position,u=e.pos.length/3;for(let t=0;t<l.count;t++)e.pos.push(l.getX(t),l.getY(t),l.getZ(t)),e.uv.push(s,0),e.part.push(o),e.idx.push(u+t)}function te(e,t,n,i,a){let o=new r(n.map(([e,t])=>new u(Math.max(e,1e-4),t)),i);o.applyMatrix4(t);let s=o.attributes.position,c=o.attributes.uv,l=e.pos.length/3;for(let t=0;t<s.count;t++)e.pos.push(s.getX(t),s.getY(t),s.getZ(t)),e.uv.push(c.getX(t),c.getY(t)),e.part.push(a);let d=o.index.array;for(let t=0;t<d.length;t++)e.idx.push(l+d[t])}function ne(e){let n=new l;return n.setAttribute(`position`,new t(e.pos,3)),n.setAttribute(`uv`,new t(e.uv,2)),n.setAttribute(`aPart`,new t(e.part,1)),n.setIndex(e.idx),n.computeVertexNormals(),n}function re(e,{size:t=1,pink:n=!1}){let r={pos:[],uv:[],part:[],idx:[]},i=new c,o=t,s=n?7:6,l=[{n:8,L:.045,W:.017,tilt:.5,off:0},{n:8,L:.055,W:.019,tilt:.95,off:.5},{n:8,L:.06,W:.021,tilt:1.3,off:.25}];te(r,i.identity(),[[.012*o,0],[.014*o,.012*o],[.008*o,.016*o],[1e-4,.017*o]],12,1);for(let e=0;e<24;e++){let t=e/24*O,n=new f(Math.cos(t)*.011*o,.012*o,Math.sin(t)*.011*o),s=new a().setFromAxisAngle(new f(0,1,0),-t).multiply(new a().setFromAxisAngle(new f(0,0,1),-.4));i.compose(n.add(new f(0,.006*o,0)),s,new f(1,1,1)),F(r,i,.0012*o,.012*o,.0012*o,4,.5)}return l.forEach(t=>{for(let n=0;n<t.n;n++){let c=(n+t.off)/t.n*O+e.range(-.08,.08),l=new f(Math.cos(c)*.008*o,.002*o,Math.sin(c)*.008*o),u=new a().setFromAxisAngle(new f(0,1,0),-c-Math.PI/2),d=new a().setFromAxisAngle(new f(1,0,0),-t.tilt-e.range(-.08,.08));i.compose(l,u.multiply(d),new f(1,1,1)),P(r,i,{L:t.L*o,W:t.W*o,cup:.6,bend:-.25,nu:6,nv:3,part:s,shape:.9})}}),ne(r)}function ie(e,t,n,r,i){let a=t.length,o=e.pos.length/3,s=new f(0,1,0),c=null;for(let o=0;o<a;o++){let l=t[o],u=new f().subVectors(t[Math.min(o+1,a-1)],t[Math.max(o-1,0)]).normalize(),d=c?c.clone().sub(u.clone().multiplyScalar(c.dot(u))).normalize():new f().crossVectors(u,Math.abs(u.y)>.9?new f(1,0,0):s).normalize();c=d;let p=new f().crossVectors(u,d).normalize();for(let t=0;t<=r;t++){let s=t/r*O,c=d.x*Math.cos(s)+p.x*Math.sin(s),u=d.y*Math.cos(s)+p.y*Math.sin(s),f=d.z*Math.cos(s)+p.z*Math.sin(s);e.pos.push(l.x+c*n[o],l.y+u*n[o],l.z+f*n[o]),e.nrm.push(c,u,f),e.uv.push(o/(a-1),t/r),e.aStem.push(i[0],i[1],i[2],i[3])}}let l=r+1;for(let t=0;t<a-1;t++)for(let n=0;n<r;n++){let r=o+t*l+n,i=r+1,a=r+l,s=a+1;e.idx.push(r,a,i,i,a,s)}}function ae(e,t,{floating:n=!1,lily:r=!1}={}){let a={...t,uWaterYV:t.uWaterY,uLeak:E,uLeakCov:D,uLeakShot:T},o={uniforms:a,vertexHead:`
      attribute vec4 aInst;
      varying vec2 vLeafUv;
      varying vec4 vInst;
      ${A}
    `,vertexWorld:`
      vLeafUv = uv; vInst = aInst;
      {
        #ifdef USE_INSTANCING
          vec3 org = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
        #else
          vec3 org = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
        #endif
        float hh = max(org.y - uWaterYV, 0.0);
        ${n?`
          wPos4.xz += vec2(sin(uTime * 0.11 + aInst.x * 30.0), cos(uTime * 0.09 + aInst.x * 17.0)) * 0.012;
          wPos4.y += sin(uTime * 0.7 + aInst.x * 50.0 + dot(org.xz, vec2(1.3, 0.7))) * 0.0015 * uv.x;
        `:`
          wPos4.xyz += lotusSway(org.xz, hh, aInst.x);
          float rr = uv.x;
          wPos4.y += sin(uTime * 2.3 + aInst.x * 40.0 + uv.y * 12.566) * 0.0045 * rr * rr * uWindStrength;
        `}
      }
    `,fragHead:`
      varying vec2 vLeafUv;
      varying vec4 vInst;
      float g_vein; float g_navel; float g_h; float g_top; float g_drop = 0.0;
      ${v}
      ${j}
    `,fragColor:r?`
      {
        float rr = vLeafUv.x; float a = vLeafUv.y * 6.28318;
        float seed = vInst.x;
        vec2 lp = vec2(cos(a), sin(a)) * rr;
        bool top = gl_FrontFacing;
        g_top = top ? 1.0 : 0.0;
        // veins: radiating from the centre, palmate
        float va = a * 14.0 / 6.28318 + seed * 5.0;
        float dv = abs(fract(va) - 0.5) * 6.28318 / 14.0 * rr;
        // anti-aliased: widen by the pixel footprint, fade contrast (and the bump
        // below) once the vein is sub-pixel -> no dotted glints along the veins
        float fpxL = max(length(fwidth(lp)), 1e-5);
        float vAA = clamp(0.008 / fpxL, 0.0, 1.0);
        float vein = (1.0 - smoothstep(0.006 - fpxL * 0.5, 0.014 + fpxL, dv)) * smoothstep(0.05, 0.2, rr) * mix(0.3, 1.0, vAA);
        vec3 c0 = mix(vec3(0.050, 0.125, 0.032), vec3(0.100, 0.175, 0.042), vInst.y);
        // young reddish pads
        c0 = mix(c0, vec3(0.13, 0.05, 0.03), step(0.92, vInst.z) * 0.7);
        c0 *= 0.85 + 0.3 * (n_snoise(lp * 4.0 + seed * 9.0) * 0.5 + 0.5);
        vec3 cb = vec3(0.16, 0.05, 0.05);
        vec3 col = top ? c0 : cb;
        col = mix(col, col * 1.35 + vec3(0.01, 0.015, 0.0), vein * 0.4);
        // rim browning / reddish margin
        col = mix(col, vec3(0.13, 0.05, 0.02), smoothstep(0.9, 1.0, rr) * 0.5);
        // damage spots
        col = mix(col, vec3(0.10, 0.07, 0.02), smoothstep(0.75, 0.82, n_fbm(lp * 7.0 + seed * 3.0, 3) * 0.5 + 0.5) * vInst.y * 0.8);
        diffuseColor.rgb = col;
        g_vein = vein; g_navel = 0.0;
        g_h = -vein * 0.00028 * vAA * vAA;
      }
    `:`
      {
        float rr = vLeafUv.x; float a = vLeafUv.y * 6.28318;
        float seed = vInst.x; float age = vInst.y;
        vec2 lp = vec2(cos(a), sin(a)) * rr;
        bool top = gl_FrontFacing;
        g_top = top ? 1.0 : 0.0;
        const float NV = 21.0;
        // leaf-unit -> pixel footprint for anti-aliasing the fine veins
        float fpx = max(length(fwidth(lp)), 1e-5);
        float va = a * NV / 6.28318;
        float dv = abs(fract(va) - 0.5) * 6.28318 / NV * rr;
        float vw = 0.003 + 0.0035 * (1.0 - rr);
        float aa = clamp(vw / fpx, 0.0, 1.0);
        float vein = (1.0 - smoothstep(vw - fpx * 0.5, vw * 1.7 + fpx, dv)) * smoothstep(0.04, 0.09, rr) * mix(0.35, 1.0, aa);
        // dichotomous forks toward the margin
        float va2 = a * NV * 2.0 / 6.28318 + 0.5;
        float dv2 = abs(fract(va2) - 0.5) * 6.28318 / (NV * 2.0) * rr;
        float fork = smoothstep(0.45, 0.62, rr + n_snoise(lp * 3.0 + seed) * 0.05);
        float vein2 = (1.0 - smoothstep(vw * 0.55 - fpx * 0.5, vw * 1.3 + fpx, dv2)) * fork * mix(0.2, 1.0, clamp(vw * 0.6 / fpx, 0.0, 1.0));
        // areole network (faded when sub-pixel)
        vec2 wv = n_worley(lp * 46.0 + seed * 11.0);
        float netAA = 1.0 - smoothstep(0.004, 0.012, fpx);
        float net = (1.0 - smoothstep(0.0, 0.1, wv.y - wv.x)) * netAA;
        float navel = 1.0 - smoothstep(0.035, 0.06, rr);
        float halo = 1.0 - smoothstep(0.05, 0.22, rr);
        float ring = smoothstep(0.05, 0.065, rr) * (1.0 - smoothstep(0.07, 0.1, rr));
        float mott = n_fbm(lp * 2.5 + seed * 13.0, 3);
        // torn leaves: a ragged radial split widening toward the margin
        float tearM = 0.0;
        if (fract(seed * 7.31) > 0.8) {
          float a0 = fract(seed * 3.7) * 6.28318;
          float da = abs(mod(a - a0 + 3.14159, 6.28318) - 3.14159) * rr;
          float r0 = 0.3 + 0.45 * fract(seed * 11.3);
          float wdt = (rr - r0) * 0.2 + 0.012 * n_snoise(vec2(rr * 37.0, seed * 9.0));
          if (rr > r0 && da < wdt) discard;
          tearM = (1.0 - smoothstep(0.0, 0.035, da - wdt)) * step(r0 - 0.02, rr);
        }
        // insect bites / small holes on older leaves (ragged, browned rims)
        float holeM = 0.0;
        if (age > 0.25 && fract(seed * 5.13) > 0.55) {
          vec2 hw = n_worley(lp * 7.0 + seed * 19.0);
          float hr = 0.045 * age * (0.6 + 0.4 * n_snoise(lp * 31.0 + seed));
          if (hw.x < hr && rr > 0.15) discard;
          holeM = 1.0 - smoothstep(hr, hr + 0.06, hw.x);
        }
        // fine veinlets inside the areoles: only where they resolve (macro lens)
        vec2 wv2 = n_worley(lp * 140.0 + seed * 7.0);
        float net2 = (1.0 - smoothstep(0.0, 0.14, wv2.y - wv2.x)) * (1.0 - smoothstep(0.0015, 0.004, fpx));
        // waxy glaucous blue-green; the pale bloom keeps saturation low
        vec3 topCol = mix(vec3(0.044, 0.120, 0.056), vec3(0.068, 0.162, 0.068), mott * 0.5 + 0.5);
        topCol = mix(topCol, vec3(0.150, 0.150, 0.050), age * 0.6);
        vec3 botCol = mix(vec3(0.105, 0.160, 0.072), vec3(0.135, 0.190, 0.085), mott * 0.5 + 0.5);
        botCol = mix(botCol, vec3(0.17, 0.16, 0.06), age * 0.5);
        vec3 col = top ? topCol : botCol;
        col *= vInst.zzz * 0.25 + 0.85;
        if (top) {
          col = mix(col, col * 1.3 + vec3(0.03, 0.04, 0.025), vein * 0.55 + vein2 * 0.35);
          col *= 1.0 - net * 0.04 - net2 * 0.02;
          col = mix(col, col * 1.15 + vec3(0.02, 0.025, 0.01), halo * 0.6);
        } else {
          col = mix(col, vec3(0.22, 0.27, 0.13), vein * 0.75 + vein2 * 0.45);
          col *= 1.0 - net * 0.08;
        }
        col = mix(col, vec3(0.30, 0.31, 0.13), navel * 0.85);
        col *= 1.0 - ring * 0.25;
        // glaucous wax bloom on the upper side: a thin, neutral-white scattering
        // layer (papillae + wax crystals) that lifts and desaturates the green
        if (top) col += vec3(0.026, 0.033, 0.037) * (1.0 - age * 0.55) * (0.8 + 0.4 * (mott * 0.5 + 0.5)) * (1.0 - vein * 0.4);
        col = mix(col, vec3(0.16, 0.11, 0.04), max(tearM, holeM) * 0.7);
        // margin: yellow-brown on older leaves, slightly torn tone
        float rim = smoothstep(0.95 - age * 0.12, 1.0, rr + n_snoise(lp * 9.0 + seed) * 0.025);
        col = mix(col, vec3(0.20, 0.15, 0.045), rim * (0.25 + age * 0.75));
        // necrotic spots on older leaves
        float sp = smoothstep(0.74, 0.8, n_fbm(lp * 5.5 + seed * 5.0, 3) * 0.5 + 0.5) * age;
        col = mix(col, vec3(0.11, 0.075, 0.03), sp * 0.85);
        // water beads (lotus effect) + a puddle in the cup of some leaves
        g_drop = 0.0; float dh = 0.0;
        // (leaves with geometric beads, aInst.w = 0.5, skip the painted ones)
        if (top && abs(vInst.w - 0.5) > 0.2) {
          vec2 q = lp * 16.0 + seed * 7.3;
          vec2 cell = floor(q), f = fract(q);
          vec2 cc = n_hash22(cell) * 0.6 + 0.2;
          float dd = length(f - cc);
          float has = step(0.9, n_hash12(cell + 3.1)) * smoothstep(0.12, 0.2, rr) * (1.0 - smoothstep(0.85, 0.95, rr));
          float rad = 0.07 + 0.13 * n_hash12(cell + 7.7);
          float bead = has * (1.0 - smoothstep(rad * 0.8, rad, dd));
          dh = has * sqrt(max(rad * rad - dd * dd, 0.0)) / 16.0;
          float pud = step(0.62, fract(seed * 13.7)) * (1.0 - smoothstep(0.07, 0.1, rr + n_snoise(lp * 20.0 + seed) * 0.02));
          g_drop = max(bead, pud) * netAA;
          dh = max(dh, pud * 0.006);
          col *= 1.0 - g_drop * 0.25;
        }
        diffuseColor.rgb = col;
        g_vein = vein + vein2 * 0.6;
        g_navel = navel;
        g_h = dh * 0.3 * netAA + ((top ? -0.4 : 1.3) * (vein * 0.0009 + vein2 * 0.00045) + (net * 0.000015) * (top ? 1.0 : -1.0)) * clamp(0.004 / max(fpx, 1e-5), 0.0, 1.0);
      }
    `,fragRough:r?`roughnessFactor = mix(0.22, 0.5, vInst.y) + (1.0 - g_top) * 0.3;`:`roughnessFactor = mix(mix(0.52, 0.42, g_vein) + (1.0 - g_top) * 0.12, 0.08, g_drop);`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 1.0);`,fragLight:`
      #if NUM_DIR_LIGHTS > 0
      {
        vec3 Ld = directLight.direction;
        float shf = clamp(dot(directLight.color, vec3(1.0)) / max(dot(uSunColor, vec3(1.0)), 1e-4), 0.0, 1.0);
        float lk = ${r?`0.0`:`0.95`} * uLeak.w * lotusDapple(vWPos) * (1.0 - shf);
        if (lk > 0.002) {
          IncidentLight lkL = directLight;
          lkL.color = uSunColor * lk;
          PhysicalMaterial mLk = material;
          mLk.roughness = max(mLk.roughness, 0.34);
          RE_Direct(lkL, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, mLk, reflectedLight);
        }
        vec3 sunC = directLight.color + uSunColor * lk;
        float back = max(dot(-normal, Ld), 0.0);
        float fwdS = pow(max(dot(-geometryViewDir, Ld), 0.0), 4.0);
        // smooth thickness variation (thinner toward the margin), veins and navel block light
        float tm = (0.8 + 0.25 * smoothstep(0.3, 1.0, vLeafUv.x)) * (0.92 + 0.08 * n_snoise(vec2(vLeafUv.x * 3.0, vLeafUv.y * 6.0) + vInst.x * 17.0));
        vec3 tcol = ${r?`vec3(0.10, 0.16, 0.02)`:`vec3(0.16, 0.30, 0.05)`} * (1.0 - g_vein * 0.7) * (1.0 - g_navel * 0.5) * tm;
        reflectedLight.directDiffuse += sunC * tcol * back * (0.25 + 1.3 * fwdS) * 0.28;
        // sky light diffusing through
        reflectedLight.indirectDiffuse += iblIrradiance * tcol * 0.06;
        // droplets: sun sparkle + sky sheen
        if (g_drop > 0.01) {
          float fr = 0.03 + 0.97 * pow(1.0 - max(dot(normal, geometryViewDir), 0.0), 5.0);
          reflectedLight.indirectSpecular += iblIrradiance * 0.12 * g_drop * (0.05 + fr);
        }
      }
      #endif
    `,fragEnd:_},s=e.mat.phys({color:16777215,roughness:.5,metalness:0,side:2,sheen:r?.15:n?.35:.55,sheenColor:new i().setRGB(.2,.27,.32),sheenRoughness:.42,specularIntensity:r?.8:.45},o),c=e.mat.depthMaterialFor({vertexHead:o.vertexHead+k,vertexWorld:o.vertexWorld});c.side=2;let l=c.onBeforeCompile;return c.onBeforeCompile=(e,t)=>{l(e,t),e.uniforms.uWaterYV=a.uWaterYV},{mat:s,depth:c}}function oe(e,t,{merged:n=!1,macro:r=!1}={}){let a={...t,uWaterYV:t.uWaterY,uLeak:E,uLeakCov:D,uLeakShot:T},o=`${n?`#define LOTUS_MERGED
`:``}${r?`#define LOTUS_MACRO
`:``}`,s={uniforms:a,vertexHead:`
      ${o}
      #ifdef LOTUS_MERGED
      attribute vec3 aOrg;
      #endif
      attribute vec4 aInst;
      attribute float aPart;
      attribute float aSeed;
      varying vec2 vPUv;
      varying vec4 vInst;
      varying float vPart;
      varying float vSeed;
      varying vec3 vLocal;
      ${A}
    `,vertexWorld:`
      vPUv = uv; vInst = aInst; vPart = aPart; vSeed = aSeed; vLocal = position;
      {
        #if defined(LOTUS_MERGED)
          vec3 org = aOrg;
        #elif defined(USE_INSTANCING)
          vec3 org = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
        #else
          vec3 org = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
        #endif
        float hh = max(org.y - uWaterYV, 0.0);
        if (aInst.w > 0.5) {
          wPos4.xz += vec2(sin(uTime * 0.11 + aInst.x * 30.0), cos(uTime * 0.09 + aInst.x * 17.0)) * 0.012;
        } else {
          vec3 sw = lotusSway(org.xz, hh, aInst.x);
          #ifdef LOTUS_MACRO
            sw *= 0.35; // the macro flower sits in a sheltered pocket: barely breathing
          #endif
          wPos4.xyz += sw;
          // petals tremble very slightly (slow, sub-millimetre)
          float tip = (aPart < 0.5) ? uv.x * uv.x : 0.0;
          wPos4.xyz += vec3(sin(uTime * 1.3 + aInst.x * 20.0 + aSeed * 9.0), sin(uTime * 1.1 + aSeed * 13.0), cos(uTime * 1.2 + aInst.x * 9.0 + aSeed * 5.0)) * 0.0007 * tip * uWindStrength;
        }
      }
    `,fragHead:`
      ${o}
      varying vec2 vPUv;
      varying vec4 vInst;
      varying float vPart;
      varying float vSeed;
      varying vec3 vLocal;
      float g_trans; vec3 g_tcol; float g_h; float g_wet; float g_rough;
      ${v}
      ${j}
      ${x}
      // anti-aliased periodic line: 1 on lines at integer x, width w (in periods)
      float f_lines(float x, float w){
        float fw = max(fwidth(x), 1e-4);
        float d = abs(fract(x + 0.5) - 0.5);
        float l = 1.0 - smoothstep(w - fw, w + fw, d);
        return mix(l, w * 2.0, smoothstep(0.18, 0.45, fw)); // sub-pixel: fade to the mean
      }
    `,fragColor:`
      {
        float part = floor(vPart + 0.5);
        float u = vPUv.x, v = vPUv.y;
        vec3 col; g_trans = 0.0; g_tcol = vec3(0.0); g_h = 0.0; g_wet = 0.0; g_rough = 0.5;
        float seed = vInst.x;
        if (part < 0.5) {
          // ---- lotus petal --------------------------------------------------
          float hue = vInst.z;           // 0 pale .. 1 deep
          float ps = fract(vSeed);       // per-petal random
          float whorl = floor(vSeed);
          float edge = abs(v);
          float tpos = clamp(u * 0.9 + edge * edge * 0.28 * u, 0.0, 1.0);
          float hp = clamp(hue + (ps - 0.5) * 0.18 - whorl * 0.04, 0.0, 1.0);
          vec3 baseC = vec3(0.78, 0.78, 0.46);
          vec3 bodyC = mix(vec3(0.93, 0.90, 0.89), vec3(0.91, 0.70, 0.79), hp);
          vec3 tipC = mix(vec3(0.89, 0.42, 0.62), vec3(0.72, 0.11, 0.38), hp);
          // ~34 fine longitudinal veins converging at base and tip (v is width-normalised),
          // a finer anastomosing set between them
          float wob = n_snoise(vec2(u * 3.0, ps * 17.0 + seed * 5.0)) * 0.35;
          float vx = v * 17.0 + wob + ps * 3.0;
          // each vein has its own strength that drifts along its length (some fade out,
          // some run strong to the tip): breaks the regular corduroy look up close
          float vStr = smoothstep(-0.7, 0.75, n_snoise(vec2(floor(vx + 0.5) * 0.73 + ps * 13.0, u * 1.8 + seed * 3.0)));
          float veins = f_lines(vx, 0.1) * smoothstep(0.04, 0.22, u) * (0.3 + 0.7 * vStr);
          float vx2 = v * 34.0 + wob * 2.3 + n_snoise(vec2(u * 9.0, v * 3.0 + ps * 9.0)) * 0.45;
          float vStr2 = smoothstep(-0.5, 0.9, n_snoise(vec2(floor(vx2 + 0.5) * 0.61 + ps * 7.0, u * 2.6 - seed)));
          float veins2 = f_lines(vx2, 0.07) * smoothstep(0.1, 0.4, u) * 0.6 * vStr2;
          float pink = smoothstep(0.48 - 0.26 * hp, 1.06, tpos) * (0.72 + 0.28 * hp);
          // pigment concentrates along the veins and the margin as the flush fades out
          float flush = smoothstep(0.12, 0.62, tpos) * (1.0 - pink);
          float pinkV = clamp(pink + flush * (veins * 0.55 + veins2 * 0.3) * (0.4 + 0.6 * hp) + smoothstep(0.7, 1.0, edge) * smoothstep(0.25, 0.8, u) * 0.22, 0.0, 1.0);
          col = mix(baseC, bodyC, smoothstep(0.02, 0.28, tpos));
          col = mix(col, tipC, pinkV);
          // soft blotchy pigment variation (cell clusters), mid-frequency
          float bl = n_fbm(vec2(u * 6.0, v * 2.4) + ps * 11.0 + seed * 3.0, 3);
          col *= 0.94 + 0.1 * bl;
          col = mix(col, col * vec3(0.96, 0.86, 0.9), smoothstep(0.2, 0.6, bl) * pink * 0.4);
          // faint greenish blush on the outer whorl near the base, browning at the very tip
          col = mix(col, vec3(0.62, 0.72, 0.42), (1.0 - smoothstep(0.0, 0.35, u)) * step(whorl, 0.5) * 0.35);
          col = mix(col, col * vec3(0.7, 0.55, 0.5), smoothstep(0.955, 1.0, u) * (0.3 + 0.3 * ps));
          g_trans = 1.0;
          g_tcol = mix(vec3(1.0, 0.87, 0.64), vec3(1.0, 0.45, 0.64), smoothstep(0.15, 0.9, tpos)) * (1.0 - veins * 0.18);
          g_h = (veins * 0.00005 + veins2 * 0.00002);
          g_rough = 0.46 - 0.06 * pink;
        } else if (part < 1.5) {
          // receptacle top: yellow-green disc
          col = mix(vec3(0.60, 0.62, 0.13), vec3(0.42, 0.54, 0.09), vInst.y);
          #ifdef LOTUS_MACRO
            col = mix(vec3(0.74, 0.72, 0.18), vec3(0.56, 0.64, 0.13), vInst.y); // fresh, pollen-dusted disc
            float rr = length(vLocal.xz);
            col *= 0.9 + 0.12 * n_snoise(vLocal.xz * 900.0 + seed * 3.0);
            col = mix(col, col * 0.78, smoothstep(0.012, 0.018, rr));
            g_h = n_snoise(vLocal.xz * 700.0) * 0.00004;
          #else
            vec2 wv = n_worley(vLocal.xz * 240.0 + seed * 3.0);
            float carpel = 1.0 - smoothstep(0.16, 0.27, wv.x);
            float pit = 1.0 - smoothstep(0.04, 0.09, wv.x);
            col = mix(col, vec3(0.80, 0.66, 0.14), carpel * 0.55);
            col = mix(col, vec3(0.25, 0.22, 0.04), pit * 0.7);
            g_h = carpel * 0.0005 - pit * 0.0004;
          #endif
          g_trans = 0.25; g_tcol = vec3(0.7, 0.75, 0.2);
          g_rough = 0.5;
        } else if (part < 2.5) {
          // receptacle side: green with fine ribbing, yellow rim
          float rib = f_lines(atan(vLocal.z, vLocal.x) * 7.0, 0.15);
          col = mix(vec3(0.60, 0.58, 0.14), vec3(0.25, 0.33, 0.06), smoothstep(0.015, -0.012, vLocal.y));
          col = mix(col, vec3(0.32, 0.40, 0.07), vInst.y * 0.6);
          col *= 1.0 - rib * 0.12;
          g_trans = 0.3; g_tcol = vec3(0.6, 0.7, 0.2);
          g_rough = 0.52;
        } else if (part < 3.5) {
          // filament: cream-yellow, translucent
          col = mix(vec3(0.88, 0.80, 0.46), vec3(0.92, 0.86, 0.6), vSeed);
          g_trans = 0.55; g_tcol = vec3(1.0, 0.88, 0.4);
          g_rough = 0.45;
        } else if (part < 4.5) {
          // anther: golden-orange, two pollen sacs (longitudinal slits), dusty
          float ang = vPUv.y * 6.28318;
          float slit = f_lines(vPUv.y * 2.0, 0.08);
          col = mix(vec3(0.96, 0.63, 0.10), vec3(0.98, 0.74, 0.18), vSeed) * (0.92 + 0.16 * sin(ang * 2.0));
          col = mix(col, vec3(0.62, 0.36, 0.05), slit * 0.5);
          g_trans = 0.45; g_tcol = vec3(1.0, 0.75, 0.2);
          g_rough = 0.62;
        } else if (part < 5.5) {
          col = mix(vec3(0.16, 0.22, 0.06), vec3(0.45, 0.20, 0.22), smoothstep(0.3, 1.0, u));
          g_trans = 0.6; g_tcol = vec3(0.5, 0.6, 0.15);
        } else if (part < 7.5) {
          // water lily petals (white or pink), yellow at the base, fine veins
          vec3 pc = part < 6.5 ? vec3(0.90, 0.90, 0.85) : vec3(0.88, 0.46, 0.63);
          col = mix(vec3(0.86, 0.76, 0.36), pc, smoothstep(0.0, 0.28, u));
          float vv = f_lines(v * 6.0, 0.08) * smoothstep(0.1, 0.4, u);
          col *= 1.0 - vv * 0.08;
          col = mix(col, col * vec3(0.92, 0.95, 0.85), (1.0 - smoothstep(0.0, 0.5, u)) * 0.3);
          g_trans = 1.0; g_tcol = part < 6.5 ? vec3(1.0, 0.95, 0.8) : vec3(1.0, 0.5, 0.65);
          g_h = vv * 0.00003;
          g_rough = 0.4;
        } else if (part < 8.5) {
          // seed pod top: seeds sunk in round pits
          vec2 wv = n_worley(vLocal.xz * 105.0 + seed * 5.0);
          float hole = 1.0 - smoothstep(0.22, 0.32, wv.x);
          float seedC = 1.0 - smoothstep(0.1, 0.17, wv.x);
          col = mix(vec3(0.30, 0.40, 0.09), vec3(0.36, 0.30, 0.10), vInst.y * 0.7);
          col = mix(col, vec3(0.10, 0.12, 0.03), hole * 0.85);
          col = mix(col, vec3(0.20, 0.30, 0.07), seedC * 0.9);
          g_h = -hole * 0.0012 + seedC * 0.0008;
          g_trans = 0.15; g_tcol = vec3(0.6, 0.7, 0.2);
        } else if (part < 9.5) {
          float rib = abs(fract(atan(vLocal.z, vLocal.x) * 3.5) - 0.5);
          col = mix(vec3(0.16, 0.26, 0.06), vec3(0.30, 0.38, 0.09), smoothstep(-0.02, 0.03, vLocal.y));
          col *= 0.9 + 0.2 * smoothstep(0.1, 0.4, rib);
          col = mix(col, vec3(0.28, 0.22, 0.08), vInst.y * 0.4);
          g_trans = 0.2; g_tcol = vec3(0.5, 0.6, 0.15);
        } else if (part < 10.5) {
          col = vec3(0.22, 0.13, 0.05);
          g_trans = 0.2; g_tcol = vec3(0.6, 0.4, 0.15);
        } else if (part < 11.5) {
          // anther appendage: pale cream club
          col = vec3(0.93, 0.91, 0.78);
          g_trans = 0.5; g_tcol = vec3(1.0, 0.95, 0.8);
          g_rough = 0.5;
        } else if (part < 12.5) {
          // stigma nub: yellow, glossy (receptive, slightly wet) tip on a greener base
          col = mix(vec3(0.42, 0.50, 0.10), vec3(0.90, 0.74, 0.18), smoothstep(0.2, 0.85, v));
          g_trans = 0.3; g_tcol = vec3(0.9, 0.8, 0.2);
          g_rough = mix(0.5, 0.22, smoothstep(0.5, 0.95, v));
        } else {
          // dew drop (what lies behind shows through, faintly)
          col = vec3(0.10, 0.09, 0.09);
          g_wet = 1.0; g_rough = 0.04;
        }
        diffuseColor.rgb = col;
      }
    `,fragRough:`roughnessFactor = g_rough;`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 1.0);`,fragLight:`
      #if NUM_DIR_LIGHTS > 0
      {
        vec3 Ld = directLight.direction;
        // dappled sun breaking through where the hero bed lies in shadow
        float shf = clamp(dot(directLight.color, vec3(1.0)) / max(dot(uSunColor, vec3(1.0)), 1e-4), 0.0, 1.0);
        #ifdef LOTUS_MERGED
          float lk = uLeak.w * max(lotusDapple(vWPos), 0.9 * lotusLeakOn()) * (1.0 - shf);
        #else
          float lk = uLeak.w * lotusDapple(vWPos) * (1.0 - shf);
        #endif
        if (lk > 0.002) {
          IncidentLight lkL = directLight;
          lkL.color = uSunColor * lk;
          RE_Direct(lkL, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight);
        }
        vec3 sunC = directLight.color + uSunColor * lk;
        float back = max(dot(-normal, Ld), 0.0);
        float wrap = max(dot(normal, Ld) * 0.5 + 0.5, 0.0);
        float fwdS = pow(max(dot(-geometryViewDir, Ld), 0.0), 3.0);
        vec3 c = diffuseColor.rgb;
        reflectedLight.directDiffuse += sunC * c * g_tcol * g_trans * (back * (0.45 + 1.4 * fwdS) + wrap * 0.12) * 0.42;
        reflectedLight.indirectDiffuse += iblIrradiance * c * g_tcol * g_trans * 0.16;
        if (g_wet > 0.5) {
          // drop: sunlight focused onto the side away from the sun (caustic glow)
          float caus = pow(max(dot(normal, -Ld) * 0.5 + 0.5, 0.0), 6.0);
          reflectedLight.directDiffuse += sunC * vec3(1.0, 0.9, 0.85) * caus * 0.5;
          // clear drop: the world behind it, refracted (inverted) through the lens of
          // water, and the sun focused toward the eye when it lies behind the drop
          vec3 Nd = normalize(normal);
          float NoVd = clamp(dot(Nd, geometryViewDir), 0.0, 1.0);
          float Fd = 0.02 + 0.98 * pow(1.0 - NoVd, 5.0);
          float prD = 1.0 / max(length(fwidth(Nd)), 2e-3);
          vec3 T2 = dropExit(Nd, geometryViewDir);
          float bodyD = smoothstep(0.1, 0.45, NoVd);
          #ifdef USE_ENVMAP
            if (dot(T2, T2) > 1e-4) {
              vec3 Tn = normalize(T2);
              reflectedLight.indirectSpecular += getIBLRadiance(Tn, Tn, clamp(1.2 / prD, 0.1, 0.6)) * (1.0 - Fd) * bodyD * 0.75;
            }
          #endif
          reflectedLight.indirectDiffuse += iblIrradiance * 0.08;
          vec3 Lvd = normalize((viewMatrix * vec4(normalize(uSunDir), 0.0)).xyz);
          reflectedLight.directSpecular += sunC * vec3(1.0, 0.95, 0.85) * dropSunThrough(T2, Lvd, prD) * 0.85 * bodyD;
        }
      }
      #endif
    `,fragEnd:_},c=e.mat.phys({color:16777215,roughness:.45,metalness:0,side:2,sheen:.18,sheenColor:new i().setRGB(.55,.48,.52),sheenRoughness:.55,specularIntensity:.45},s),l=e.mat.depthMaterialFor({vertexHead:s.vertexHead+k,vertexWorld:s.vertexWorld});l.side=2;let u=l.onBeforeCompile;return l.onBeforeCompile=(e,t)=>{u(e,t),e.uniforms.uWaterYV=a.uWaterYV},{mat:c,depth:l}}function se(e,t){let n={...t,uWaterYV:t.uWaterY,uLeak:E,uLeakCov:D,uLeakShot:T},r={uniforms:n,vertexHead:`
      attribute vec4 aStem;
      varying vec2 vSUv;
      ${A}
    `,vertexWorld:`
      vSUv = uv;
      {
        float t = uv.x;
        float flex = t * t * (3.0 - 2.0 * t);
        wPos4.xyz += lotusSway(aStem.xy, aStem.z, aStem.w) * flex;
      }
    `,fragHead:`
      varying vec2 vSUv;
      float g_h;
      ${v}
      ${j}
    `,fragColor:`
      {
        vec3 wp = vWPos;
        float n = n_snoise3(wp * vec3(40.0, 4.0, 40.0));
        vec3 col = mix(vec3(0.075, 0.125, 0.035), vec3(0.13, 0.165, 0.045), n * 0.5 + 0.5);
        // brownish towards the waterline
        col = mix(vec3(0.07, 0.06, 0.025), col, smoothstep(0.0, 0.2, wp.y - uWaterY));
        // tiny prickles
        float pr = smoothstep(0.75, 0.95, n_snoise3(wp * 260.0));
        col = mix(col, vec3(0.12, 0.08, 0.04), pr * 0.6);
        diffuseColor.rgb = col;
        g_h = pr * 0.0003 + n * 0.00005;
      }
    `,fragRough:`roughnessFactor = 0.5;`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 1.0);`,fragLight:`
      #if NUM_DIR_LIGHTS > 0
      {
        float shf = clamp(dot(directLight.color, vec3(1.0)) / max(dot(uSunColor, vec3(1.0)), 1e-4), 0.0, 1.0);
        float lk = 0.9 * uLeak.w * lotusDapple(vWPos) * (1.0 - shf);
        if (lk > 0.002) {
          IncidentLight lkL = directLight;
          lkL.color = uSunColor * lk;
          RE_Direct(lkL, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight);
        }
        float back = max(dot(-normal, directLight.direction), 0.0);
        reflectedLight.directDiffuse += (directLight.color + uSunColor * lk) * vec3(0.08, 0.11, 0.02) * back * 0.4;
      }
      #endif
    `,fragEnd:_},a=e.mat.phys({color:16777215,roughness:.55,metalness:0,sheen:.15,sheenColor:new i().setRGB(.2,.22,.2),sheenRoughness:.5,specularIntensity:.6},r),o=e.mat.depthMaterialFor({vertexHead:r.vertexHead+k,vertexWorld:r.vertexWorld}),s=o.onBeforeCompile;return o.onBeforeCompile=(e,t)=>{s(e,t),e.uniforms.uWaterYV=n.uWaterYV},{mat:a,depth:o}}function I(n,r,i,u){let p=n.rng(`pond-lotus-geo`),_=r.waterY,v=new d;v.name=`pondLotus`;let x=ae(n,i,{floating:!1}),S=ae(n,i,{floating:!0}),T=ae(n,i,{floating:!0,lily:!0}),E=oe(n,i),D=oe(n,i,{merged:!0}),k=oe(n,i,{merged:!0,macro:!0}),j=[],P=se(n,i),F=[{cup:.33,wave:.085,droop:.05,ruffle:.032,nR:11,lip:.02},{cup:.42,wave:.065,droop:.14,ruffle:.026,nR:9,lip:.035},{cup:.25,wave:.11,droop:.06,ruffle:.04,nR:13,lip:0},{cup:.3,wave:.06,droop:.28,ruffle:.03,nR:10,fold:.2,lip:.02}],te=F.map(e=>M(p,{...e,seg:56,rings:11})),ne=F.map(e=>M(p,{...e,seg:30,rings:6})),I=F.map(e=>M(p,{...e,seg:104,rings:22})),ce=[M(p,{seg:30,rings:4,floating:!0,wave:.04}),M(p,{seg:30,rings:4,floating:!0,wave:.06})],le=M(p,{seg:112,rings:22,floating:!0,wave:.05}),ue=[N(p),N(p),N(p)],de=[],L=new c,R=new a,z=new f,B=new f,V=new a,H=new a;function U(e,t,n,r,i){if(!n.length)return null;let a=e.clone(),o=new Float32Array(n.length*4),c=new m(a,t.mat,n.length);return n.forEach((e,t)=>{let n=i(e,t,o);c.setMatrixAt(t,n)}),a.setAttribute(`aInst`,new s(o,4)),c.instanceMatrix.needsUpdate=!0,c.customDepthMaterial=t.depth,c.castShadow=!0,c.receiveShadow=!0,c.name=r,c.computeBoundingSphere(),c.computeBoundingBox&&c.computeBoundingBox(),v.add(c),de.push(c),c}let W={pos:[],nrm:[],uv:[],aStem:[],idx:[]},fe=e=>new f(e.x,_+e.h,e.z);function pe(e,t,n,r,i,a=null,o=5){let s=p.range(.08,.3),c=p.range(0,O),l=new f(e.x+Math.cos(c)*s,_-.45,e.z+Math.sin(c)*s),u=new f().lerpVectors(l,t,.55);u.x+=p.range(-.07,.07),u.z+=p.range(-.07,.07);let d=a?a.clone().normalize():new f(p.range(-.17,.17),1,p.range(-.17,.17)).normalize(),m=t.clone().addScaledVector(d,-.12),g=new h([l,u,m,t]).getPoints(i),v=g.map((e,t)=>n*(1.12-t/i*.25));ie(W,g,v,o,[e.x,e.z,e.macro?e.h*.35:e.h,r])}let G={mac:[[],[],[],[]],hi:[[],[],[],[]],lo:[[],[],[],[]]};for(let e of u.leavesE)(e.heroLeaf?G.mac:e.hero?G.hi:G.lo)[e.variant%4].push(e);let K=(e,t,n)=>{let r=p.float();e.seed=r,n[t*4]=r,n[t*4+1]=e.age??0,n[t*4+2]=p.range(.6,1.4)*.5+.25,n[t*4+3]=e.beads&&e.heroLeaf?.5:0,V.setFromAxisAngle(new f(0,1,0),e.yaw);let i=e.tiltDir??0;H.setFromAxisAngle(new f(-Math.sin(i),0,Math.cos(i)),-(e.tilt??0)),R.copy(H).multiply(V),e._q=R.clone(),z.set(e.x,_+e.h,e.z);let a=e.rad;return B.set(a,a*p.range(.9,1.15),a),e._m=L.compose(z,R,B).clone(),e._m};for(let e=0;e<4;e++)U(I[e],x,G.mac[e],`lotusLeafMacro${e}`,K),U(te[e],x,G.hi[e],`lotusLeafHi${e}`,K),U(ne[e],x,G.lo[e],`lotusLeafLo${e}`,K);{let e=n.rng(`pond-lotus-beads`);for(let t=0;t<4;t++)for(let n of G.mac[t]){if(!n.beads||!n._m)continue;let r=b(e,I[t],n._m,{count:e.int(3,11),big:+!!e.chance(.75),rad:n.rad});for(let e of r)j.push({...e,org:[n.x,n.z,n.h,n.seed],floating:!1})}}for(let e of u.leavesE){let t=fe(e),n=new f(0,1,0).applyQuaternion(e._q).lerp(new f(0,1,0),.35);pe(e,t,.0058*(.8+e.rad),e.seed,e.heroLeaf?12:e.hero?9:6,n,e.heroLeaf?7:5)}let me=[[],[]],q=[];for(let e of u.leavesF)(e.heroPad?q:me[e.variant%2]).push(e);let he=(e,t,n)=>(n[t*4]=p.float(),n[t*4+1]=e.age??0,n[t*4+2]=p.range(.5,1),n[t*4+3]=e.heroPad?.5:1,R.setFromAxisAngle(new f(0,1,0),e.yaw),z.set(e.x,_+.008,e.z),B.set(e.rad,e.rad,e.rad),e.seed=n[t*4],e._m=L.compose(z,R,B).clone(),e._m);me.forEach((e,t)=>U(ce[t],S,e,`lotusLeafFloat${t}`,he)),U(le,S,q,`lotusLeafFloatHero`,he);{let e=n.rng(`pond-pad-beads`);for(let t of q){let n=b(e,le,t._m,{count:30,big:2,rad:t.rad*1.5,floating:!0});for(let e of n)j.push({...e,org:[t.x,t.z,0,t.seed],floating:!0})}}let J=[[],[],[]];for(let e of u.lilies)J[e.variant%3].push(e);for(let e of u.lilyFlowers)J[p.int(0,2)].push({...e,rad:e.rad*1.05});let ge=(e,t,n)=>(n[t*4]=p.float(),n[t*4+1]=e.age??0,n[t*4+2]=p.float(),n[t*4+3]=1,R.setFromAxisAngle(new f(0,1,0),e.yaw),z.set(e.x,_+.004+p.range(0,.002),e.z),B.set(e.rad,e.rad,e.rad),L.compose(z,R,B).clone());J.forEach((e,t)=>U(ue[t],T,e,`lilyPad${t}`,ge));let Y=1.3,X={openHi:[C(p,{open:1,hi:!0,S:Y}),C(p,{open:.78,hi:!0,S:Y}),C(p,{open:.9,hi:!0,S:Y,petalScale:1.05}),C(p,{open:.64,hi:!0,S:Y,petalScale:.96})],openLo:[C(p,{open:.97,hi:!1,S:Y}),C(p,{open:.72,hi:!1,S:Y}),C(p,{open:.86,hi:!1,S:Y,petalScale:1.08}),C(p,{open:.6,hi:!1,S:Y,petalScale:.94})],halfHi:C(p,{open:.42,hi:!0,S:Y}),halfHi2:C(p,{open:.3,hi:!0,S:Y,petalScale:1.04}),halfLo:[C(p,{open:.42,hi:!1,S:Y}),C(p,{open:.3,hi:!1,S:Y,petalScale:1.05})],budHi:C(p,{open:.04,hi:!0,S:Y*.95}),budLo:[C(p,{open:.04,hi:!1,S:Y*.95}),C(p,{open:.13,hi:!1,S:Y*.9})],spentHi:w(p,{hi:!0,S:Y,petalsLeft:2,age:.3}),spentLo:w(p,{hi:!1,S:Y,petalsLeft:2,age:.3}),podLo:w(p,{hi:!1,S:Y,petalsLeft:0,age:.9}),lilyW:re(p,{pink:!1}),lilyP:re(p,{pink:!0})},Z={openHi0:[],openHi1:[],openHi2:[],openHi3:[],openLo0:[],openLo1:[],openLo2:[],openLo3:[],halfHi:[],halfHi2:[],halfLo0:[],halfLo1:[],budHi:[],budLo0:[],budLo1:[],spentHi:[],spentLo:[],podLo:[],lilyW:[],lilyP:[]},Q=[];for(let e of[...u.flowers,...u.buds,...u.pods])e.isHeroFlower?Q.push(e):e.kind===`buds`?(e.hero?Z.budHi:e.open>.07?Z.budLo1:Z.budLo0).push(e):e.kind===`pods`?e.petalsLeft>0?(e.hero?Z.spentHi:Z.spentLo).push(e):Z.podLo.push(e):e.open<.55?(e.hero?e.open<.43?Z.halfHi2:Z.halfHi:e.open<.45?Z.halfLo1:Z.halfLo0).push(e):e.hero?Z[`openHi${e.open>.92?0:e.open>.82?2:e.open>.7?1:3}`].push(e):Z[`openLo${e.open>.9?0:e.open>.78?2:e.open>.66?1:3}`].push(e);for(let e of u.lilyFlowers)(e.pink?Z.lilyP:Z.lilyW).push(e);let _e=new f(0,1,0);function ve(e){V.setFromAxisAngle(_e,e.yaw??0);let t;if(e.faceTo!==void 0)t=new f(Math.sin(e.faceTo),0,-Math.cos(e.faceTo));else{let e=p.range(0,O);t=new f(Math.cos(e),0,Math.sin(e))}H.setFromAxisAngle(t,e.tilt??0);let n=new a().copy(H).multiply(V),r=new f(e.x,_+(e.floating?.006:e.h),e.z),i=e.size??1;e._q=n,e._s=i;let o=p.range(-.07,.07),s=p.range(-.09,.09),l=p.range(-.07,.07);return new c().compose(r,n,new f(i*(1+o),i*(1+s),i*(1+l)))}let ye=e=>{let t=p.float();return e.seed=t,[t,p.float(),e.hue??p.range(.15,.9),+!!e.floating]},$=(e,t,n)=>{let r=ye(e);return n.set(r,t*4),ve(e)};for(let e=0;e<4;e++)U(X.openHi[e],E,Z[`openHi${e}`],`lotusFlowerHi${e}`,$);U(X.halfHi2,E,Z.halfHi2,`lotusHalfHi2`,$);for(let e=0;e<4;e++)U(X.openLo[e],E,Z[`openLo${e}`],`lotusFlowerLo${e}`,$);if(U(X.halfHi,E,Z.halfHi,`lotusHalfHi`,$),U(X.halfLo[0],E,Z.halfLo0,`lotusHalfLo0`,$),U(X.halfLo[1],E,Z.halfLo1,`lotusHalfLo1`,$),U(X.budHi,E,Z.budHi,`lotusBudHi`,$),U(X.budLo[0],E,Z.budLo0,`lotusBudLo0`,$),U(X.budLo[1],E,Z.budLo1,`lotusBudLo1`,$),U(X.spentHi,E,Z.spentHi,`lotusSpentHi`,$),U(X.spentLo,E,Z.spentLo,`lotusSpentLo`,$),U(X.podLo,E,Z.podLo,`lotusPod`,$),U(X.lilyW,E,Z.lilyW,`lilyFlowerW`,$),U(X.lilyP,E,Z.lilyP,`lilyFlowerP`,$),Q.length){let t=[];for(let r of Q){let i=r.kind===`pods`?w(p,{hi:!0,S:Y,petalsLeft:r.petalsLeft??3,age:.45}):C(n.rng(r.macro?`pond-macro-flower`:`pond-hero-`+Q.indexOf(r)),{open:r.kind===`buds`?r.open??.04:r.open,hi:!0,macro:!!r.macro,dew:r.macro?9:0,S:r.kind===`buds`?Y*.95:Y});i.applyMatrix4(ve(r));let a=i.attributes.position.count,s=ye(r),c=new Float32Array(a*4),l=new Float32Array(a*3);for(let e=0;e<a;e++)c.set(s,e*4),l[e*3]=r.x,l[e*3+1]=_+r.h,l[e*3+2]=r.z;if(i.setAttribute(`aInst`,new e(c,4)),i.setAttribute(`aOrg`,new e(l,3)),r.macro){i.computeBoundingSphere();let e=new o(i,k.mat);e.customDepthMaterial=k.depth,e.castShadow=!0,e.receiveShadow=!0,e.name=`lotusMacroFlower`,v.add(e)}else t.push(i)}let r=t.length?g(t,!1):null;if(r){r.computeBoundingSphere();let e=new o(r,D.mat);e.customDepthMaterial=D.depth,e.castShadow=!0,e.receiveShadow=!0,e.name=`lotusHeroFlowers`,v.add(e)}for(let e of t)e.dispose()}{let e=y(n,i,j,A);e&&v.add(e)}{let e=u.fallen.filter(e=>r.sd(e.x,e.z)>.15),t=[ee(p,{S:Y}),ee(p,{S:Y})],n=[[],[]];e.forEach((e,t)=>n[t%2].push(e));let i=(e,t,n)=>{n.set([p.float(),p.float(),e.hue??.5,1],t*4);let r=new a().setFromAxisAngle(_e,e.yaw),i=e.size??1;return new c().compose(new f(e.x,_+.002,e.z),r,new f(i,i,i))};n.forEach((e,n)=>U(t[n],E,e,`lotusFallen${n}`,i))}for(let e of[...u.flowers,...u.buds,...u.pods]){let t=e._s??1,n=e._q??new a,r=new f(0,-.017*Y*t,0).applyQuaternion(n),i=fe(e).add(r),o=new f(0,1,0).applyQuaternion(n);pe(e,i,e.macro?.0062:.0056,e.seed,e.macro?28:e.isHeroFlower?14:e.hero?10:6,o,e.macro?14:e.isHeroFlower?7:5)}if(W.pos.length){let e=new l;e.setAttribute(`position`,new t(W.pos,3)),e.setAttribute(`normal`,new t(W.nrm,3)),e.setAttribute(`uv`,new t(W.uv,2)),e.setAttribute(`aStem`,new t(W.aStem,4)),e.setIndex(W.idx),e.computeBoundingSphere();let n=new o(e,P.mat);n.customDepthMaterial=P.depth,n.castShadow=!0,n.receiveShadow=!0,n.name=`lotusStems`,v.add(n)}let be=0;return v.traverse(e=>{if(e.isMesh){let t=e.geometry.index?e.geometry.index.count/3:e.geometry.attributes.position.count/3;be+=t*(e.isInstancedMesh?e.count:1)}}),console.log(`[world] pond: lotus meshes=${v.children.length} tris=${Math.round(be)}`),{object:v}}export{I as t};