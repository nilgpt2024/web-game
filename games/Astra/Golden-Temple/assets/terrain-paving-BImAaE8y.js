import{r as e}from"./terrain-glsl-C7GlQnn1.js";import{c as t,l as n,t as r}from"./terrain-field-DTokDS2H.js";import{n as i,t as a}from"./terrain-stonegeo-CjLAxKed.js";import{n as o,t as s}from"./terrain-gutter-CdpKzdWR.js";function c(e,c){let{THREE:u}=e,d=e.rng(`terrain-paving`),f=()=>d.next(),p=c.noise.n3,m=[],h=0,g=[];function _(e,t,n,r=0){let i=new u.BufferGeometry;i.setAttribute(`position`,new u.Float32BufferAttribute(e.P,3));let a=e.S.length,o=new Float32Array(a*4),s=d.next();for(let t=0;t<a;t++)o[t*4]=s,o[t*4+1]=e.S[t],o[t*4+2]=n,o[t*4+3]=r;i.setAttribute(`aStone`,new u.BufferAttribute(o,4)),i.setIndex(e.I),i.computeVertexNormals(),i.applyMatrix4(t),m.push(i),h++}let v=new u.Matrix4,y=new u.Quaternion,b=new u.Euler,x=new u.Vector3,S=new u.Vector3(1,1,1);function C(e,t,n,r,i,a,o=.006,s=0){return b.set(d.range(-o,o),r,d.range(-o,o),`YXZ`),y.setFromEuler(b),v.compose(x.set(t,i,n),y,S),_(e,v,a,s),v.clone()}let w=c.paths[1],T=c.L.gate.center[0],E=n([T,c.R.maxZ+3.8],[T,c.R.maxZ+46],3.4);E.sando=!0;let D=[...c.paths,E];D.forEach((e,n)=>{let i=!!e.walk,o=e.width,s=i?.24:.3,l=!!e.sando,u=(e,t,n,r)=>{if(!l)return .055;let i=-1e9;for(let[a,o]of[[0,0],[n,r],[-n,r],[n,-r],[-n,-r]])i=Math.max(i,c.heightAt(e+a,t+o));return i+.06},m=Math.atan2(e.tx,e.tz),h=o-2*s,_=n>=2,v=(t,n)=>[e.ax+e.tx*t+e.nx*n,e.az+e.tz*t+e.nz*n],y=(e,r,a,o,s=!1)=>{for(let[l,u]of[[e,a],[r,a],[e,o],[r,o],[(e+r)/2,(a+o)/2]]){let[e,r]=v(l,u);if(c.sdPondEff(e,r)<.45||_&&!i&&t(e,r,w)<.03||n===0&&r<b+0)return!0;if(i){for(let i=0;i<n;i++)if(t(e,r,D[i])<.03)return!0}if(s){for(let i=0;i<D.length;i++)if(i!==n&&D[i].walk&&t(e,r,D[i])<-.01)return!0}}return!1},b=c.L.bridge.south[2]-.05,x=n===1?.66:n===0?.55:l?.08:i?.05:.22,S=()=>r(x+d.range(-.16,.12),0,1),T=_?.034:.044,E=_?.014:.02;for(let t of[-1,1]){let r=0;for(;r<e.len-.2;){let c=i?d.range(.6,1.15):d.range(.75,1.35);e.len-r-c<.45&&(c=e.len-r);let l=d.range(E,T-.008),h=r+l/2,_=r+c-l/2,b=t*(o/2-s+l/2),x=t*o/2;if(!y(h,_,Math.min(b,x),Math.max(b,x),!0)){let[e,r]=v((h+_)/2,(b+x)/2),o=C(a(s-l,_-h,.22,.03,f,1.2,p),e,r,m,u(e,r,.2,(_-h)/2)+d.range(-.008,.004),i?1.25:1,.008,S()*.85);g.push({x:e,z:r,w:s-l,d:_-h,yaw:m,kind:1,path:n,m:o,side:t})}r+=c}}let O=0,k=n===1?[.7,1.05]:i?[.48,.88]:[.5,.85],A=n===1?[.75,1.45]:i?[.42,1.05]:[.55,1.15];for(;O<e.len-.15;){let t=d.range(k[0],k[1]);e.len-O-t<.3&&(t=e.len-O);let r=-h/2;for(;r<h/2-.05;){let e=d.range(A[0],A[1]);h/2-(r+e)<.32&&(e=h/2-r);let o=d.range(E,T),s=O+o/2,c=O+t-o/2,l=r+o/2,_=r+e-o/2;if(!y(s,c,l,_)){let[e,t]=v((s+c)/2,(l+_)/2),r=C(a(_-l,c-s,.2,.017,f,1.4,p),e,t,m+d.range(-.009,.009),u(e,t,(_-l)/2,(c-s)/2)+d.range(-.008,.008),i?.25:0,.005,S());g.push({x:e,z:t,w:_-l,d:c-s,yaw:m,kind:0,path:n,m:r})}r+=e}O+=t}});for(let e of[[[7.6,40.5],[3.5,38.8],[-1,37.3],[-4.5,37.6],[-9,39.5],[-13.5,39.8]],[[12.4,38.5],[17,39.6],[21.5,38.3],[26,38.6],[31,40.2],[35.5,39.5]],[[45.5,23.6],[46.5,27.5],[49.5,31],[53.5,34],[57,35.2]],[[-35,5.5],[-38.5,8.5],[-41,13],[-41.5,18.5],[-44,23.5],[-46.5,27]],[[-20,-44.2],[-12,-43.6],[-4,-44.5],[4,-43.8],[12,-44.3],[20,-43.6],[28,-44.4]],[[-22.5,1.5],[-23.5,4.2]]]){let t=0;for(let n=0;n<e.length-1;n++){let[r,a]=e[n],[o,s]=e[n+1],l=Math.hypot(o-r,s-a),u=(o-r)/l,m=(s-a)/l;for(let e=t;e<l;e+=d.range(.68,.82)){let n=(h%2?1:-1)*d.range(.06,.16),o=r+u*e-m*n,s=a+m*e+u*n;if(c.sdPondEff(o,s)<.6||c.sdPaths(o,s)<.45)continue;let l=c.mossAt(o,s)>.05&&c.soilAt(o,s)>.05,C=l?d.range(.3,.4):d.range(.24,.36),w=i(C,.16,f,p),T=(c.heightAt(o+C*.7,s)-c.heightAt(o-C*.7,s))/(1.4*C),E=(c.heightAt(o,s+C*.7)-c.heightAt(o,s-C*.7))/(1.4*C),D=c.heightAt(o,s);for(let e=0;e<6;e++)D+=c.heightAt(o+Math.cos(e)*C*.7,s+Math.sin(e)*C*.7);D/=7,b.set(Math.atan(E)*.8,d.range(0,6.28),-Math.atan(T)*.8,`XYZ`),y.setFromEuler(b),v.compose(x.set(o,D+(l?d.range(.02,.035):d.range(.012,.03)),s),y,S),_(w,v,l?5:2,d.range(0,.3));let O=v.clone();g.push({x:o,z:s,w:C*1.4,d:C*1.4,yaw:0,kind:2,m:O,r:C}),t=0}}}{let e=c.PEN,t=e.cx-e.hx,n=e.cx+e.hx,r=e.cz-e.hz,i=e=>{let t=40;for(let n=r;n<40;n+=.1)if(c.sdPond(e,n)>0){t=n;break}return t},o=[{a:[t,i(t)+.4],b:[t,r],out:[-1,0]},{a:[t,r],b:[n,r],out:[0,-1]},{a:[n,r],b:[n,i(n)+.4],out:[1,0]}];for(let e of o){let t=Math.hypot(e.b[0]-e.a[0],e.b[1]-e.a[1]),n=(e.b[0]-e.a[0])/t,r=(e.b[1]-e.a[1])/t,i=Math.atan2(n,r);for(let o of[{top:.07,h:.34,depth:.5,inset:0,len:[.8,1.25],coping:!0},{top:-.29,h:.4,depth:.45,inset:.05,len:[.55,.95]},{top:-.71,h:.42,depth:.45,inset:.1,len:[.5,.9]}]){let s=o.coping?-.25:d.range(-.3,0);for(;s<t+.2;){let c=d.range(o.len[0],o.len[1]),l=Math.max(s,-.25),u=Math.min(s+c,t+.25);if(u-l>.2){let t=(l+u)/2,s=-o.depth/2+.06+o.inset,c=e.a[0]+n*t-e.out[0]*s,m=e.a[1]+r*t-e.out[1]*s;C(a(o.depth,u-l-.012,o.h,o.coping?.035:.045,f,1.6,p),c,m,i,o.top+d.range(-.008,.008),3,.01,o.coping?.2:0)}s+=c}}}}let O=o(c,d,f,p,C,g),k=e.geom.mergeGeometries(m,!1);k.computeBoundingSphere(),k.computeBoundingBox();let A=l(e),j=new u.Mesh(k,A);j.name=`paving`,j.castShadow=!0,j.receiveShadow=!0,j.userData.stones=g,j.userData.count=h,j.userData.gutterStones=O;let M=s(e,c);return j.add(M),j}function l(t){let n={vertexHead:`attribute vec4 aStone; varying vec4 vStone;`,vertexWorld:`vStone = aStone;`,fragHead:`
      varying vec4 vStone;
      float p_h; float p_rough; float p_ao;
      ${e}
    `,fragColor:`
    {
      vec3 wp = vWPos;
      vec2 fwp = fwidth(wp.xz);
      float fw = max(max(fwp.x, fwp.y), 1e-5);
      float id = vStone.x, dEdge = vStone.y, kind = vStone.z;
      float wetA = vStone.w;
      // bevel band (rounded, grimy arris) from the distance to the stone outline
      float bevW = kind < 0.5 ? 0.02 : kind < 1.5 ? 0.03 : kind < 2.5 ? 0.05 : kind < 3.5 ? 0.045 : kind < 4.5 ? 0.022 : 0.04;
      bool gutterK = kind > 3.5 && kind < 4.5;
      bool stepG = kind > 4.5;
      bool walkK = kind < 1.5 && fract(kind) > 0.2;
      float edge = 1.0 - smoothstep(0.0, bevW, dEdge);
      vec3 wn = normalize(vWNrm);
      float up = smoothstep(0.5, 0.95, wn.y);
      vec3 h3 = n_hash33(vec3(id * 113.0, id * 71.0, 3.0));
      // granite family: cool grey -> warm beige, light/dark members
      vec3 base = mix(vec3(0.345, 0.352, 0.352), vec3(0.44, 0.425, 0.39), h3.x * h3.x);
      base *= 0.74 + 0.42 * h3.y;
      if (h3.z > 0.92) base *= vec3(1.05, 0.98, 0.9);           // iron-stained
      else if (h3.z > 0.7) base *= vec3(1.07, 0.985, 0.94);     // pink feldspar granite
      else if (h3.z < 0.12) base *= vec3(0.9, 0.94, 0.98);      // blue-grey, finer grained
      if (kind > 1.5 && kind < 2.5) base = mix(vec3(0.30, 0.295, 0.28), vec3(0.42, 0.39, 0.35), h3.x); // river stone
      if (kind > 2.5 && kind < 3.5) base *= 0.88;
      if (gutterK) base = mix(base, vec3(0.40, 0.395, 0.38), 0.4) * 1.05;
      if (stepG) base = mix(vec3(0.43, 0.42, 0.40), vec3(0.55, 0.52, 0.475), h3.x) * (0.9 + 0.2 * h3.y);
      if (walkK) base = mix(base, vec3(0.47, 0.455, 0.425), 0.35) * 1.08;
      float fineF = 1.0 - smoothstep(0.0025, 0.012, fw);
      float fineF2 = 1.0 - smoothstep(0.0012, 0.006, fw);
      float mot = n_fbm3(wp * 2.2 + id * 7.0, 4);
      float mot2 = n_fbm3(wp * 6.5 - id * 3.0, 3);
      vec3 col = base * (0.86 + 0.2 * mot + 0.08 * mot2);
      // crystals: biotite specks, feldspar flecks
      float s1 = n_snoise3(wp * 95.0 + id * 9.0);
      float s2 = n_snoise3(wp * 230.0 - id * 5.0);
      col = mix(col, vec3(0.045), smoothstep(0.62, 0.86, s1) * 0.55 * fineF);
      col = mix(col, col * 1.38, smoothstep(0.66, 0.9, s2) * 0.4 * fineF2);
      // soft water / organic stains
      float stain = smoothstep(0.05, 0.6, n_fbm3(wp * 0.85 + id * 17.0, 3));
      col *= 1.0 - stain * 0.22;
      // hairline cracks across some slabs (Voronoi cell borders at the slab scale), dirt-filled
      float crack = 0.0;
      if (kind < 1.5 && fract(id * 7.31) < 0.22) {
        vec2 kid; float kf2;
        vec3 kw = tg_worley(wp.xz * 1.6 + vec2(id * 37.0, id * 11.0) + 0.04 * vec2(n_snoise(wp.xz * 9.0), n_snoise(wp.xz * 9.0 + 5.0)), kid, kf2);
        float kd = (kf2 - kw.x) / 1.6;
        float kwid = 0.0018 + 0.0012 * n_snoise(wp.xz * 4.0);
        crack = (1.0 - smoothstep(kwid, kwid + fw * 1.2, kd)) * min(1.0, kwid / max(fw * 0.6, 1e-4)) * up;
        col = mix(col, vec3(0.03, 0.028, 0.022), crack * 0.85);
      }
      // bush-hammered / chisel-dressed face: fine pitting (filtered)
      float pit = n_snoise3(wp * 140.0 + id) * fineF2;
      col *= 1.0 - 0.07 * smoothstep(0.3, 0.9, pit);
      // crustose lichen rosettes (pale) and black dots
      vec2 cid; float f2;
      vec3 wl = tg_worley(wp.xz * 5.5 + id * 31.0, cid, f2);
      float lh = n_hash12(cid + id * 7.0);
      float lich = step(0.80, lh) * smoothstep(0.42, 0.22, wl.x + 0.1 * n_snoise(wp.xz * 40.0));
      col = mix(col, vec3(0.50, 0.50, 0.41), lich * 0.5 * up);
      float bl = step(0.90, n_hash12(cid * 1.7 + 3.0)) * smoothstep(0.18, 0.08, wl.x);
      col = mix(col, vec3(0.035, 0.04, 0.03), bl * 0.55 * up);
      // grime in the arrises + moss creeping in from the joints
      float rim = smoothstep(0.25, 1.0, edge);
      if (gutterK) rim *= mix(0.3, 1.0, up);
      if (stepG) rim *= 0.6;
      if (walkK) rim *= 0.7;
      col *= 1.0 - rim * 0.42;
      float mossN = n_fbm3(wp * 5.0 + id * 3.0, 3) * 0.5 + 0.5;
      float mossAmt = gutterK ? 0.22 : stepG ? 0.1 : (kind > 1.5 && kind < 2.5) ? 0.4 : kind > 1.5 ? 0.75 : 0.5;
      float moss = smoothstep(0.5, 0.85, rim * 0.8 + mossN * 0.55 - 0.12) * mossAmt;
      moss = max(moss, smoothstep(0.78, 0.95, mossN) * 0.25 * up * mossAmt);
      // moss creeping a few cm in from the joints (irregular, cushion-edged), more at the corners
      float mossJ = n_fbm3(wp * 14.0 + id * 5.0, 2);
      float creepD = dEdge - 0.035 * (mossN - 0.35) - 0.012 * mossJ;
      float creep = (1.0 - smoothstep(0.0, walkK ? 0.035 : 0.055, creepD)) * up * (gutterK ? 0.12 : stepG ? 0.2 : walkK ? 0.6 : kind < 2.5 ? 0.95 : 0.6);
      moss = max(moss, creep * smoothstep(0.25, 0.55, mossN + 0.15 * mossJ));
      vec3 mossC = mix(vec3(0.035, 0.075, 0.016), vec3(0.10, 0.165, 0.03), n_snoise3(wp * 9.0) * 0.5 + 0.5);
      mossC *= 0.85 + 0.3 * smoothstep(-0.4, 0.6, n_snoise3(wp * 60.0)) * fineF;
      // revetment: algae + water stain below the waterline
      float wet = (kind > 2.5 && kind < 3.5) ? smoothstep(-0.25, -0.6, wp.y) : 0.0;
      col = mix(col, col * vec3(0.45, 0.5, 0.42), wet);
      col = mix(col, mossC, moss);
      // shallow damp dishes -> darker, glossy
      float damp = smoothstep(0.3, 0.72, n_fbm3(wp * 0.6 + 3.0 + id, 3) * 0.5 + 0.5) * up * (1.0 - moss) * (1.0 - rim * 0.5);
      col *= 1.0 - damp * 0.3;
      // sprinkled water (uchimizu): wet patches darken the granite and turn it glossy, thin films
      // stand in the worn dishes and along the joints; moss soaks up and stays matte-ish
      float wn1 = n_fbm3(vec3(wp.xz * 0.75, id * 3.0), 3);
      float wn2 = n_fbm3(vec3(wp.xz * 2.6 + 7.0, id * 5.0), 2);
      float wetM = smoothstep(0.38, 0.7, wetA + 0.6 * wn1 + 0.15 * wn2) * up;
      wetM = max(wetM, (1.0 - smoothstep(0.0, 0.05, dEdge)) * wetA * up * 0.8);
      float film = smoothstep(0.7, 0.9, wetA * 0.75 + 0.5 * wn1 + 0.35 * wn2 + 0.12 * smoothstep(0.08, 0.3, dEdge)) * up * (1.0 - moss);
      col *= mix(1.0, mix(0.68, 0.85, moss), wetM);
      col = mix(col, col * vec3(0.82, 0.84, 0.86), film);
      diffuseColor.rgb = col;
      float worn = (1.0 - rim) * up * (kind < 0.5 ? 1.0 : 0.5);
      p_rough = mix(0.66, 0.42, worn * (0.5 + 0.5 * h3.y));
      p_rough = mix(p_rough, 0.14, damp * 0.85);
      p_rough = mix(p_rough, 0.95, moss);
      p_rough = mix(p_rough, 0.3, wet);
      p_rough = mix(p_rough, mix(0.24, 0.55, moss), wetM);
      p_rough = mix(p_rough, 0.035, film);
      p_h = (mot2 * 0.0018 + mot * 0.0015 + n_snoise3(wp * 34.0) * 0.0005 * fineF + s1 * 0.00025 * fineF) + moss * 0.0025 + lich * 0.0004 - crack * 0.0012 - pit * 0.00012;
      p_h *= 1.0 - 0.3 * wetM - 0.65 * film;
      p_ao = 1.0 - rim * 0.3;
    }
    `,fragRough:`roughnessFactor = p_rough;`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, p_h, 1.0);`,fragLight:`reflectedLight.indirectDiffuse *= p_ao;`},r=t.mat.std({color:16777215,roughness:.6,metalness:0},n);return r.name=`paving`,r}export{c as t};