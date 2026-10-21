import{Lt as e,U as t,Wr as n,in as r,ir as i,j as a,jt as o,qt as s,ro as c,sn as l}from"./three.core-Dp-eO7LC.js";import{n as u,t as d}from"./pond-water-hBOuK5qz.js";import{l as f,n as p,o as m}from"./pond-util-BP7rZgp3.js";import{n as h,r as g}from"./pond-stone-DIftKGTD.js";var _=Math.PI*2,v=`
vec3 objectNormal = vec3(0.0, 1.0, 0.0);
`;function y(t,{seg:n=9,arch:r=.35,twist:i=.6,w0:o=.016}={}){let s=[],c=[],l=[];for(let e=0;e<=n;e++){let t=e/n,a=t,l=r*t*t,u=o*(1-t**2.2*.92)*(.75+.25*Math.sin(Math.PI*Math.min(t*3,1))),d=i*t*t;for(let e=0;e<=2;e++){let n=e/2*2-1,r=n*u,i=(1-Math.abs(n))*u*.35;s.push(r*Math.cos(d)-i*Math.sin(d),a,l+r*Math.sin(d)+i*Math.cos(d)),c.push(e/2,t)}}for(let e=0;e<n;e++)for(let t=0;t<2;t++){let n=e*3+t,r=n+1,i=n+3,a=i+1;l.push(n,i,r,r,i,a)}let u=new a;return u.setAttribute(`position`,new e(s,3)),u.setAttribute(`uv`,new e(c,2)),u.setIndex(l),u.computeVertexNormals(),u}function b(e,a,b,x){let S=e.rng(`pond-shore`),C=m(()=>S.float()),w=new s;w.name=`pondShore`;let T=a.waterY,E=a.camPaths||[],D=a.L,O=D.bridge?D.bridge.north[0]:10,k=(e,t,n)=>{for(let r of E)for(let i of r.pts)if(Math.hypot(i.pos[0]-e,i.pos[2]-t)<n+.6)return!0;return!1},{nx:A,nz:j,RES:M}=a,N=new Float32Array(A*j);for(let e=0;e<A*j;e++)N[e]=T-a.floorGrid[e];let P=p(N,A,j,a.gx0,a.gz0,M,0).filter(e=>e.length>6).map(e=>f(e,.2)),F=(e,t)=>{let n=.25,r=a.sd(e+n,t)-a.sd(e-n,t),i=a.sd(e,t+n)-a.sd(e,t-n),o=Math.hypot(r,i)||1;return[r/o,i/o]},I=(e,t)=>a.wallZone&&a.wallZone(e,t);{let t=[];for(let e=0;e<4;e++)t.push(h(C,S,{detail:3,flat:S.range(.45,.7),cuts:S.int(4,6),lumpy:.7,elong:S.range(1,1.5),round:S.range(.55,.8)}));let r=t.map(()=>[]);for(let e of P)for(let n=0;n<e.length;n++){let[i,o]=e[n];if(I(i,o))continue;let s=C.fbm2(i*.35,o*.35,2)*.5+.5,c=Math.round(s*s*5),[l,u]=F(i,o);for(let e=0;e<c;e++){let e=S.range(-.25,.75),n=i+l*e+S.range(-.12,.12),s=o+u*e+S.range(-.12,.12);if(I(n,s))continue;let c=S.range(.025,.09)*(S.chance(.12)?1.7:1);if(k(n,s,c))continue;let d=a.floorY(n,s);r[S.int(0,t.length-1)].push({x:n,y:d+c*.18,z:s,s:c,yaw:S.range(0,_)})}}let s=g(e,b,`0.25`,`vec3(1.05, 1.03, 0.98)`,{pebble:!0});s.name=`pondPebble`;let u=new i,d=new n,f=new o;r.forEach((e,n)=>{if(!e.length)return;let r=new l(t[n],s,e.length);e.forEach((e,t)=>{d.setFromEuler(f.set(S.range(-.2,.2),e.yaw,S.range(-.2,.2),`YXZ`)),u.compose(new c(e.x,e.y,e.z),d,new c(e.s,e.s*S.range(.6,.9),e.s*S.range(.8,1.1))),r.setMatrixAt(t,u)}),r.instanceMatrix.needsUpdate=!0,r.castShadow=!1,r.receiveShadow=!0,r.name=`pondPebbles${n}`,r.computeBoundingSphere(),w.add(r)})}{let s=[y(S,{arch:.22,twist:.4}),y(S,{arch:.42,twist:.8,w0:.019}),y(S,{arch:.12,twist:.25,w0:.012})],f=s.map(()=>[]),p=[];for(let e of P)for(let t=0;t<e.length;t+=6){let[n,r]=e[t];if(I(n,r)||C.fbm2(n*.12+40,r*.12,2)<.18||!S.chance(.55))continue;let[i,a]=F(n,r),o=n+i*S.range(.25,.7),s=r+a*S.range(.25,.7);Math.abs(o-O)<4&&s>3&&s<30||k(o,s,1.2)||p.some(e=>Math.hypot(e[0]-o,e[1]-s)<2.2)||p.push([o,s])}for(let[e,t]of p){let n=S.int(14,34),r=S.range(.45,1);for(let i=0;i<n;i++){let n=S.range(0,_),i=Math.sqrt(S.float())*S.range(.08,.28),o=e+Math.cos(n)*i,c=t+Math.sin(n)*i,l=Math.min(a.floorY(o,c),T-.05),u=r*S.range(.55,1.15)+(T-l);f[S.int(0,s.length-1)].push({x:o,y:l,z:c,len:u,yaw:Math.atan2(Math.sin(n),Math.cos(n))+S.range(-.6,.6),lean:S.range(0,.3)+i*.6,seed:S.float(),cx:e,cz:t})}}let m={uniforms:{...b},vertexHead:`
        attribute vec4 aBlade; // clump x, z, seed, length
        varying vec2 vBUv;
        varying vec4 vBlade;
      `,vertexWorld:`
        vBUv = uv; vBlade = aBlade;
        {
          float t = uv.y;
          float flex = t * t;
          float ph = aBlade.z * 6.2831;
          vec2 wd = normalize(uWindDir);
          float gust = 0.55 + 0.45 * sin(uTime * 0.33 + dot(aBlade.xy, wd) * 0.21 + 1.3);
          vec2 o = wd * (0.5 + 0.5 * sin(uTime * (0.9 + aBlade.z * 0.4) + ph)) * gust * 0.05 + vec2(-wd.y, wd.x) * sin(uTime * 1.6 + ph * 1.7) * 0.015;
          wPos4.xz += o * flex * aBlade.w * uWindStrength;
        }
      `,fragHead:`
        varying vec2 vBUv;
        varying vec4 vBlade;
        float g_tr;
        ${d}
      `,fragColor:`
        {
          float t = vBUv.y;
          float sd = vBlade.z;
          vec3 c = mix(vec3(0.05, 0.10, 0.025), vec3(0.11, 0.17, 0.04), smoothstep(0.0, 0.5, t));
          c = mix(c, vec3(0.20, 0.20, 0.07), smoothstep(0.75, 1.0, t) * (0.4 + 0.6 * fract(sd * 7.1)));
          // brown, dry tips on some blades; faint parallel venation
          c = mix(c, vec3(0.20, 0.13, 0.06), smoothstep(0.88, 0.98, t) * step(0.6, fract(sd * 3.3)));
          float midrib = 1.0 - smoothstep(0.0, 0.25 + fwidth(vBUv.x) * 2.0, abs(vBUv.x - 0.5));
          c *= 0.92 + 0.12 * midrib;
          c *= 0.85 + 0.3 * fract(sd * 13.7);
          // waterline: wet, dark, a little algae
          float above = vWPos.y - uWaterY;
          c = mix(c * 0.45, c, smoothstep(-0.02, 0.06, above));
          diffuseColor.rgb = c;
          g_tr = smoothstep(0.0, 0.3, t);
        }
      `,fragRough:`roughnessFactor = 0.48;`,fragLight:`
        #if NUM_DIR_LIGHTS > 0
        {
          vec3 Ld = directLight.direction;
          float back = max(dot(-normal, Ld), 0.0);
          float fwdS = pow(max(dot(-geometryViewDir, Ld), 0.0), 4.0);
          reflectedLight.directDiffuse += directLight.color * vec3(0.16, 0.28, 0.05) * back * (0.3 + 1.2 * fwdS) * 0.3 * g_tr;
          reflectedLight.indirectDiffuse += iblIrradiance * vec3(0.16, 0.28, 0.05) * 0.05 * g_tr;
        }
        #endif
      `,fragEnd:u},h=e.mat.phys({color:16777215,roughness:.5,metalness:0,side:2,sheen:.2,sheenColor:new t(.2,.25,.2),sheenRoughness:.5},m);h.name=`pondRush`;let g=e.mat.depthMaterialFor({vertexHead:m.vertexHead+v,vertexWorld:m.vertexWorld});g.side=2;let x=new i,E=new n,D=new o;f.forEach((e,t)=>{if(!e.length)return;let n=s[t].clone(),i=new l(n,h,e.length),a=new Float32Array(e.length*4);e.forEach((e,t)=>{E.setFromEuler(D.set(e.lean,e.yaw,0,`YXZ`)),x.compose(new c(e.x,e.y,e.z),E,new c(1,e.len,e.len)),i.setMatrixAt(t,x),a.set([e.cx,e.cz,e.seed,Math.min(e.len,1.2)],t*4)}),n.setAttribute(`aBlade`,new r(a,4)),i.instanceMatrix.needsUpdate=!0,i.customDepthMaterial=g,i.castShadow=!0,i.receiveShadow=!0,i.name=`pondRush${t}`,i.computeBoundingSphere(),w.add(i)})}return{object:w}}export{b as t};