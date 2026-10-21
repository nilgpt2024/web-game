import{Qt as e,Wr as t,in as n,ir as r,qt as i,ro as a,rr as o,sn as s,tr as c}from"./three.core-Dp-eO7LC.js";import{n as l,t as u}from"./pond-water-hBOuK5qz.js";var d=`
vec3 dropExit(vec3 N, vec3 V){
  vec3 T1 = refract(-V, N, 0.7519);
  float tt = -2.0 * dot(N, T1);
  vec3 E = normalize(N + tt * T1);
  return refract(T1, -E, 1.33);
}
float dropSunThrough(vec3 T2, vec3 L, float pr){
  if (dot(T2, T2) < 1e-4) return 0.0;
  float k = clamp(pr * pr * 0.5, 6.0, 220.0);
  return pow(max(dot(normalize(T2), L), 0.0), k) * (k + 2.0) / 80.0;
}
`;function f(e,t,n,{count:r=8,big:i=1,rad:s=.3,floating:c=!1}={}){let l=t.attributes.position,u=t.attributes.normal,d=t.attributes.uv,f=new o().getNormalMatrix(n),p=[],m=new a,h=new a,g=(t,r,i,a)=>{for(let o=0;o<40;o++){let o=Math.floor(e.float()*l.count),s=d.getX(o);if(s<t||s>r||(m.fromBufferAttribute(l,o).applyMatrix4(n),h.fromBufferAttribute(u,o).applyMatrix3(f).normalize(),h.y<0&&h.negate(),h.y<.55))continue;let c=e.range(i,a);if(!p.some(e=>e.p.distanceTo(m)<(e.r+c)*1.6)){p.push({p:m.clone(),n:h.clone(),r:c,rr:s,ang:d.getY(o)});return}}};for(let e=0;e<i;e++)g(c?.1:.06,c?.55:.2,.0045*s/.3,.008*s/.3);for(let t=0;t<r;t++){let t=e.chance(.6);g(.12,.88,t?9e-4:.0022,t?.002:.0042)}return p}function p(o,f,p,m){if(!p.length)return null;let h=new i;h.name=`lotusBeads`;let g={uniforms:{...f,uWaterYV:f.uWaterY},vertexHead:`
      attribute vec4 aB0;   // leaf origin x, z, height above water, leaf seed
      attribute vec4 aB1;   // radial pos on the leaf, angle fraction, floating, bead radius
      attribute vec3 aBC;   // bead centre (world, rest)
      varying vec3 vBN;
      varying float vBR;
      varying float vBPx;
      ${m}
    `,vertexWorld:`
      {
        vec3 off;
        if (aB1.z > 0.5) {
          off = vec3(vec2(sin(uTime * 0.11 + aB0.w * 30.0), cos(uTime * 0.09 + aB0.w * 17.0)) * 0.012, 0.0).xzy;
          off.y = sin(uTime * 0.7 + aB0.w * 50.0 + dot(aB0.xy, vec2(1.3, 0.7))) * 0.0015 * aB1.x;
        } else {
          off = lotusSway(aB0.xy, aB0.z, aB0.w);
          off.y += sin(uTime * 2.3 + aB0.w * 40.0 + aB1.y * 12.566) * 0.0045 * aB1.x * aB1.x * uWindStrength;
        }
        // shrink beads that would be sub-pixel (no specular sparkle at distance)
        float dist = length(cameraPosition - aBC);
        float pxr = aB1.w * projectionMatrix[1][1] * 540.0 / max(dist, 0.01);
        float k = smoothstep(0.7, 1.6, pxr);
        wPos4.xyz = aBC + (wPos4.xyz - aBC) * k + off;
        vBN = normalize(wPos4.xyz - aBC);
        vBR = aB1.w;
        vBPx = pxr;
      }
    `,fragHead:`
      varying vec3 vBN;
      varying float vBR;
      varying float vBPx;
      ${u}
      ${d}
    `,fragColor:`
      // seen through the drop: the glaucous leaf below, magnified and darkened
      diffuseColor.rgb = vec3(0.035, 0.06, 0.04);
    `,fragRough:`roughnessFactor = clamp(1.6 / max(vBPx, 0.5), 0.045, 0.6);`,fragLight:`
      {
        vec3 nW = normalize(vBN);
        vec3 Nv = normalize(normal);
        vec3 Vv = geometryViewDir;
        vec3 upV = normalize((viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
        float NoV = clamp(dot(Nv, Vv), 0.0, 1.0);
        float Fr = 0.02 + 0.98 * pow(1.0 - NoV, 5.0);
        // lotus effect: the drop rests on an air cushion. The view ray refracts in,
        // is totally reflected by the cushion and leaves upward, so the drop shows
        // a small inverted mirror image of the bright sky (quicksilver look)
        vec3 Tv = refract(-Vv, Nv, 0.75);
        vec3 Mv = normalize(reflect(Tv, upV) + upV * 0.35);
        float roughM = clamp(0.9 / max(vBPx, 0.5), 0.08, 0.6);
        #ifdef USE_ENVMAP
          vec3 envM = getIBLRadiance(Mv, Mv, roughM);
        #else
          vec3 envM = iblIrradiance * 0.35;
        #endif
        // silver body; a dark refraction ring just inside the silhouette
        float body = smoothstep(0.1, 0.45, NoV);
        reflectedLight.indirectSpecular += envM * (1.0 - Fr) * body * 0.9 * vec3(0.93, 0.97, 1.0);
        reflectedLight.indirectDiffuse *= 0.6;
        #if NUM_DIR_LIGHTS > 0
          vec3 Ls = normalize(uSunDir);
          // sunlight refracted through the drop gathers on its far side (caustic crescent)
          float caus = pow(clamp(dot(nW, -Ls) * 0.6 + 0.4, 0.0, 1.0), 7.0) * body;
          reflectedLight.directDiffuse += directLight.color * vec3(1.0, 0.9, 0.7) * caus * 0.7;
          // backlit: the sun focused through the bead toward the lens
          vec3 Lv = normalize((viewMatrix * vec4(Ls, 0.0)).xyz);
          float thr = dropSunThrough(dropExit(Nv, Vv), Lv, vBPx);
          reflectedLight.directSpecular += directLight.color * vec3(1.0, 0.95, 0.85) * thr * 0.85 * body;
        #endif
      }
    `,fragEnd:l},_=o.mat.phys({color:16777215,roughness:.04,metalness:0,ior:1.33,specularIntensity:1,clearcoat:0},g);_.name=`lotusBead`;let v=(i,o,l)=>{if(!i.length)return;let u=new e(1,o),d=i.length,f=new Float32Array(d*4),p=new Float32Array(d*4),m=new Float32Array(d*3),g=new s(u,_,d),v=new r,y=new t,b=new a(0,1,0);i.forEach((e,t)=>{let n=1-.32*c.smoothstep(e.r,.0025,.008);y.setFromUnitVectors(b,e.n);let r=e.p.clone().addScaledVector(e.n,e.r*n*.92);v.compose(r,y,new a(e.r,e.r*n,e.r)),g.setMatrixAt(t,v),f.set([e.org[0],e.org[1],e.org[2],e.org[3]],t*4),p.set([e.rr,e.ang,+!!e.floating,e.r],t*4),m.set([r.x,r.y,r.z],t*3)}),u.setAttribute(`aB0`,new n(f,4)),u.setAttribute(`aB1`,new n(p,4)),u.setAttribute(`aBC`,new n(m,3)),g.instanceMatrix.needsUpdate=!0,g.castShadow=!1,g.receiveShadow=!0,g.name=l,g.frustumCulled=!1,h.add(g)};return v(p.filter(e=>e.r>=.003),4,`lotusBeadsBig`),v(p.filter(e=>e.r<.003),2,`lotusBeadsSmall`),h}export{p as n,f as r,d as t};