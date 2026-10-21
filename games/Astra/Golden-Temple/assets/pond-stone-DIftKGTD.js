import{A as e,Lt as t,Qt as n,ar as r,j as i,jr as a,qt as o,ro as s,tr as c}from"./three.core-Dp-eO7LC.js";import{n as l}from"./BufferGeometryUtils-BAd1TW9D.js";import{t as u}from"./RoundedBoxGeometry-r7D8j9C5.js";import{n as d,t as f}from"./pond-water-hBOuK5qz.js";import{d as p,l as m,n as h,o as g,s as _,t as v}from"./pond-util-BP7rZgp3.js";function y(t,r,{detail:i=10,flat:a=.62,cuts:o=7,lumpy:u=1,elong:d=1,round:f=.3}={}){let p=new n(1,i);p.deleteAttribute(`normal`),p.deleteAttribute(`uv`),p=l(p,1e-4);let m=p.attributes.position,h=[r.range(-50,50),r.range(-50,50),r.range(-50,50)],g=[r.range(-50,50),r.range(-50,50),r.range(-50,50)],_=[];_.push({n:new s(r.range(-.25,.25),1,r.range(-.25,.25)).normalize(),d:r.range(.55,.8)});for(let e=0;e<o;e++){let t=e/o*Math.PI*2+r.range(-.4,.4),n=r.range(-.35,.75);if(_.push({n:new s(Math.cos(t)*Math.cos(n),Math.sin(n),Math.sin(t)*Math.cos(n)).normalize(),d:r.range(.66,.95)}),r.chance(.6)){let e=r.range(0,6.283),t=r.range(-.2,1);_.push({n:new s(Math.cos(e)*Math.cos(t),Math.sin(t),Math.sin(e)*Math.cos(t)).normalize(),d:r.range(.75,.98)})}}_.push({n:new s(0,-1,0),d:.55});let v=new s,y=new s;for(let e=0;e<m.count;e++){v.fromBufferAttribute(m,e).normalize();let n=1.25;for(let e of _){let t=v.dot(e.n);t>.001&&(n=Math.min(n,e.d/t))}let r=t.fbm3(v.x*1.2+h[0],v.y*1.2+h[1],v.z*1.2+h[2],3),i=.95+.18*u*r,o=c.lerp(n,i,f);o+=.06*t.fbm3(v.x*2.6+g[0],v.y*2.6+g[1],v.z*2.6+g[2],3);let s=t.n3(v.x*5.5+g[1],v.y*5.5+h[2],v.z*5.5+g[0]);o-=.03*Math.max(0,s-.45)/.55;let l=1-Math.abs(t.n3(v.x*2.3+h[1],v.y*2.3+g[2],v.z*2.3+h[0]));o-=.02*(Math.max(0,l-.86)/.14)**2,o+=.016*t.fbm3(v.x*9+h[2],v.y*9+g[0],v.z*9+h[1],2),y.copy(v).multiplyScalar(o),y.x*=d,y.y*=a,m.setXYZ(e,y.x,y.y,y.z)}return p.computeVertexNormals(),p.setAttribute(`uv`,new e(new Float32Array(m.count*2),2)),p}function b(e,t,n,r,{cut:i=!1,pebble:a=!1}={}){let o={uniforms:{...t},fragHead:f+`float g_wet; float g_moss; float g_h;`,fragColor:`
      {
        vec3 wp = vWPos; vec3 wn = normalize(vWNrm);
        float fpx = length(fwidth(wp));
        float big = n_fbm3(wp * 0.55, 4);
        float med = n_fbm3(wp * 2.3 + 3.0, 3);
        float aaS = 1.0 - smoothstep(0.006, 0.02, fpx);
        float speck = n_snoise3(wp * 42.0) * aaS;
        float speck2 = n_snoise3(wp * 77.0 + 7.0) * aaS;
        vec3 col = vec3(0.20, 0.195, 0.185) * ${r} * (0.72 + 0.4 * big);
        col = mix(col, vec3(0.035, 0.035, 0.035), mix(0.12, smoothstep(0.5, 0.85, speck) * 0.75, aaS));
        col = mix(col, vec3(0.52, 0.50, 0.47), smoothstep(0.55, 0.9, speck2) * 0.5);
        // iron staining & dark weathering streaks running down
        col = mix(col, col * vec3(1.18, 0.98, 0.78), smoothstep(0.15, 0.7, med) * 0.35);
        float streak = n_fbm3(wp * vec3(3.0, 0.4, 3.0) + 2.0, 3);
        col *= 1.0 - smoothstep(0.1, 0.6, streak) * 0.28 * (1.0 - abs(wn.y));
        // fissures
        float cr = 1.0 - abs(n_snoise3(wp * vec3(1.1, 1.8, 1.1) + 11.0));
        float crack = smoothstep(0.975, 0.999, cr) * 0.6 * smoothstep(0.2, 0.6, n_fbm3(wp * 0.9 + 4.0, 2) * 0.5 + 0.5) * ${i?`0.4`:`1.0`};
        
        // crustose lichen: pale grey-green and rusty orange rosettes
        float lich = smoothstep(0.63, 0.7, n_fbm3(wp * 3.2 + 5.0, 3) * 0.5 + 0.5);
        col = mix(col, vec3(0.33, 0.34, 0.29), lich * 0.4 * (0.6 + 0.4 * n_snoise3(wp * 14.0)));
        float lichO = smoothstep(0.72, 0.77, n_fbm3(wp * 5.5 + 9.0, 2) * 0.5 + 0.5);
        col = mix(col, vec3(0.42, 0.24, 0.07), lichO * 0.35);
        // moss on up-facing, clumpy edge
        float up = wn.y;
        float mn = n_fbm3(wp * 1.5 + 2.0, 4) * 0.5 + 0.5;
        float mclump = n_fbm3(wp * 7.0 + 1.0, 2);
        g_moss = smoothstep(0.6, 0.66, mn + (up - 0.55) * 0.6 + mclump * 0.08) * smoothstep(0.35, 0.75, up) * ${n};
        vec3 mossCol = mix(vec3(0.028, 0.052, 0.010), vec3(0.095, 0.135, 0.022), n_snoise3(wp * 11.0) * 0.5 + 0.5);
        mossCol = mix(mossCol, vec3(0.13, 0.12, 0.04), smoothstep(0.3, 0.8, mclump) * 0.3);
        // cushion texture: tufts with sunlit yellow-green tips (only where resolved)
        float mAA = 1.0 - smoothstep(0.003, 0.009, fpx);
        float mfine = n_snoise3(wp * 55.0) * mAA;
        mossCol *= 0.86 + 0.28 * (mfine * 0.5 + 0.5);
        mossCol = mix(mossCol, vec3(0.16, 0.19, 0.05), smoothstep(0.55, 0.95, mfine) * 0.35);
        col = mix(col, mossCol, g_moss);
        diffuseColor.rgb *= col;
        g_h = big * 0.5 + med * 0.25 + speck * 0.03 + smoothstep(0.4, 0.75, mn + (up - 0.55) * 0.6) * smoothstep(0.35, 0.75, up) * 0.3 + g_moss * 0.06 * n_snoise3(wp * 28.0) * aaS + g_moss * mfine * 0.025;

        float above = vWPos.y - uWaterY;
        // capillary rise: an irregular, fingered top edge to the wet band
        float wl = 0.06 + 0.05 * (n_snoise(vWPos.xz * 2.7) * 0.5 + 0.5) + 0.025 * n_fbm3(vWPos * vec3(9.0, 3.0, 9.0), 2) * aaS;
        float wet = 1.0 - smoothstep(wl * 0.6, wl, above);
        float damp = 1.0 - smoothstep(wl, wl + 0.08, above);
        float sub = 1.0 - smoothstep(-0.03, 0.005, above);
        float tide = smoothstep(wl - 0.008, wl + 0.004, above) * (1.0 - smoothstep(wl + 0.004, wl + 0.03, above));
        diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(1.12, 1.1, 1.02) + 0.014, tide * 0.55);
        diffuseColor.rgb *= 1.0 - damp * 0.18;
        // slimy green-brown biofilm straddling the waterline, darker deeper down
        float film = (1.0 - smoothstep(0.0, 0.035, above)) * smoothstep(-0.12, -0.01, above);
        vec3 algae = mix(vec3(0.026, 0.038, 0.014), vec3(0.07, 0.08, 0.028), n_snoise3(vWPos * 5.0) * 0.5 + 0.5);
        vec3 slime = mix(vec3(0.045, 0.07, 0.02), vec3(0.09, 0.10, 0.03), n_snoise3(vWPos * 14.0) * 0.5 + 0.5);
        diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 0.48, wet * (1.0 - sub));
        diffuseColor.rgb = mix(diffuseColor.rgb, algae, sub * 0.8);
        diffuseColor.rgb = mix(diffuseColor.rgb, slime, film * 0.75 * (0.6 + 0.4 * n_snoise3(vWPos * 3.0)));
        g_wet = max(max(wet, sub), film);
      }
    `,fragRough:`roughnessFactor = mix(mix(${a?`0.55`:`0.74`}, 0.95, g_moss), 0.22, g_wet * (1.0 - g_moss * 0.6));`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h ${i?`+ n_fbm3(vWPos * 6.0, 3) * 0.6`:``}, 0.012);`,fragEnd:d};return e.mat.std({color:16777215,roughness:.8,metalness:0,vertexColors:!!i},o)}function x(t,n,r){let{geom:i}=t,a=new o;a.name=`pondStone`;let s=t.rng(`pond-stone`),c=g(()=>s.float()),l=n.waterY,d=b(t,r,`0.75`,`vec3(0.96, 0.97, 0.93)`),f=b(t,r,`0.3`,`vec3(1.12, 1.1, 1.06)`,{cut:!0});d.name=`pondRock`,f.name=`pondWall`;let p=[];for(let e=0;e<16;e++)p.push(y(c,s,{detail:e<6?10:7,flat:s.range(.62,.95),cuts:s.int(7,11),lumpy:s.range(.8,1.3),elong:s.range(.9,1.45),round:s.range(.06,.2)}));let x=new i.Builder,w=[],T=n.L,E=T.bridge?T.bridge.north[0]:10,D=T.bridge?T.bridge.width/2+.95:2.75,O=n.landing,k=(e,t,n=1.6)=>O&&e>O.minX-n&&e<O.maxX+n&&t>O.minZ-n&&t<O.maxZ+.5,A=(e,t)=>t<10.8&&e>-15.5&&e<36.5;n.wallZone=(e,t)=>A(e,t)||k(e,t);let j=(e,t)=>{let r=.25,i=n.sd(e+r,t)-n.sd(e-r,t),a=n.sd(e,t+r)-n.sd(e,t-r),o=Math.hypot(i,a)||1;return[i/o,a/o]};function M(e,t,r,a,o,c=-1){let u=p[c>=0?c:s.int(0,p.length-1)],f=r*s.range(.85,1.15),m=n.floorY(e,t),h=Math.max(l,m)+r*(.62*(1-a)-.3);x.add(u,d,i.mat4([e,Math.max(h,m+r*.15),t],[s.range(-.18,.18),o,s.range(-.18,.18)],[r,f,r*s.range(.85,1.1)])),w.push([e,t,r])}let{nx:N,nz:P,RES:F}=n,I=new Float32Array(N*P);for(let e=0;e<N*P;e++)I[e]=l-n.floorGrid[e];let L=h(I,N,P,n.gx0,n.gz0,F,0).filter(e=>e.length>6).map(e=>m(e,.25));for(let e of L){let t=s.range(0,.6);for(let r=0;r<e.length;r++){let[i,a]=e[r];if(t+=.25,n.wallZone(i,a)){t=Math.min(t,.2);continue}if(t<0)continue;let o=s.chance(.13)?s.range(.95,1.55):s.range(.4,.92),[c,l]=j(i,a),u=s.range(-.3,.25)*o,d=i+c*u+s.range(-.12,.12),f=a+l*u+s.range(-.12,.12);if(M(d,f,o,s.range(.25,.55),s.range(0,Math.PI*2)),s.chance(.3)){let e=o*s.range(.28,.5);M(d+c*(o*.75+e*.4)+s.range(-.3,.3),f+l*(o*.75+e*.4)+s.range(-.3,.3),e,s.range(.35,.75),s.range(0,6.28))}if(s.chance(.32)){let e=s.range(.32,.75);M(d-c*(o*.7+.25),f-l*(o*.7+.25),e,s.range(.05,.25),s.range(0,6.28))}t=-o*s.range(.5,.82)}}{let e=T.pond.island,t=e.reduce((e,t)=>e+t[0],0)/e.length,r=e.reduce((e,t)=>e+t[1],0)/e.length;for(let a=0;a<7;a++){let a=s.range(0,6.28),o=s.range(1,2.6),c=t+Math.cos(a)*o,l=r+Math.sin(a)*o;if(!_(c,l,e))continue;let u=s.range(.45,.95);x.add(p[s.int(0,p.length-1)],d,i.mat4([c,n.floorY(c,l)+u*.1,l],[0,s.range(0,6.28),0],[u,u*.8,u]))}}for(let e=0;e<9;e++)for(let e=0;e<40;e++){let e=s.range(n.rect.minX+3,n.rect.maxX-3),t=s.range(n.rect.minZ+3,n.rect.maxZ-3),r=n.sd(e,t);if(!(r<1||r>2.6||n.wallZone(e,t))&&!(Math.abs(e-E)<3&&t<29)){M(e,t,s.range(.5,1),s.range(.45,.7),s.range(0,6.28));break}}let R=new i.Builder,z=t=>{let n=t.attributes.position.count,r=s.range(.78,1.14),i=r*s.range(.97,1.04),a=r*s.range(.97,1.02),o=r*s.range(.93,1.02),c=new Float32Array(n*3);for(let e=0;e<n;e++)c[e*3]=i,c[e*3+1]=a,c[e*3+2]=o;return t.setAttribute(`color`,new e(c,3)),t};function B(e){let n=[{y0:-1.3,y1:l-.1,len:[1,1.6],depth:.55},{y0:l-.1,y1:-.205,len:[.75,1.3],depth:.5}],r=[],i=0;for(let t=0;t<e.length-1;t++){let n=e[t],a=e[t+1],o=Math.hypot(a[0]-n[0],a[1]-n[1]);o<1e-4||(r.push({a:n,c:a,l:o,s0:i}),i+=o)}if(i<.5)return;let a=e=>{e=v(e,0,i-1e-6);let t=r[0];for(let n of r)if(e>=n.s0&&e<=n.s0+n.l){t=n;break}let n=(e-t.s0)/t.l,a=t.a[0]+(t.c[0]-t.a[0])*n,o=t.a[1]+(t.c[1]-t.a[1])*n,s=(t.c[0]-t.a[0])/t.l,c=(t.c[1]-t.a[1])/t.l,[l,u]=j(a,o),d=-c,f=s;return d*l+f*u<0&&(d=-d,f=-f),{x:a,z:o,tx:s,tz:c,nx:d,nz:f}};for(let e of n){let n=s.range(-.4,0);for(;n<i;){let r=s.range(e.len[0],e.len[1]),o=Math.max(n,0),c=Math.min(n+r,i);if(c-o>.2){let n=a((o+c)/2),r=e.y1-e.y0,i=s.range(-.015,.015),l=e.depth,d=n.x-n.nx*(l/2-.02)+n.nx*i,p=n.z-n.nz*(l/2-.02)+n.nz*i,m=Math.atan2(-n.tz,n.tx)+s.range(-.015,.015),h=z(new u(c-o-.014,r-.014,l,2,s.range(.03,.055)));R.add(h,f,t.geom.mat4([d,e.y0+r/2+s.range(-.01,.01),p],[0,m,s.range(-.008,.008)]))}n+=r}}let o=s.range(-.6,0);for(;o<i;){let e=s.range(1.1,1.9),n=Math.max(o,0),r=Math.min(o+e,i);if(r-n>.25){let e=a((n+r)/2),i=s.range(.6,.7),o=s.range(.21,.27),c=e.x-e.nx*(i/2-.06),l=e.z-e.nz*(i/2-.06),d=Math.atan2(-e.tz,e.tx)+s.range(-.012,.012),p=z(new u(r-n-.016,o,i,3,s.range(.035,.06)));R.add(p,f,t.geom.mat4([c,.04-o/2+s.range(-.008,.008),l],[0,d,s.range(-.006,.006)]))}o+=e}}{let e=h(n.sdGrid,N,P,n.gx0,n.gz0,F,.1).filter(e=>e.length>4),t=[];for(let r of e){let e=m(r,.4),i=e.map((t,n)=>{let r=0,i=0,a=0;for(let t=-3;t<=3;t++){let o=e[v(n+t,0,e.length-1)];r+=o[0],i+=o[1],a++}return[r/a,i/a]}),a=[];for(let e of i){let[r,i]=e,o=Math.abs(r-E)<D&&(i<9.5||O&&i>O.minZ-2.2&&i<O.minZ+.5);n.wallZone(r,i)&&!o?a.push(e):(a.length>2&&t.push(a),a=[])}a.length>2&&t.push(a)}for(let e of t)B(e)}let V=x.build({name:`pondRocks`}),H=R.build({name:`pondWalls`});return a.add(V,H),n.terrainLoaded||(a.add(C(t,n,r)),n.F||a.add(S(t,n,r,c))),{object:a}}function S(e,t,n,i){let o=t.L.pond.island,s=1e9,c=-1e9,l=1e9,u=-1e9;for(let[e,t]of o)s=Math.min(s,e),c=Math.max(c,e),l=Math.min(l,t),u=Math.max(u,t);--s,c+=1,--l,u+=1;let m=.18,h=Math.ceil((c-s)/m),g=Math.ceil((u-l)/m),_=new a(c-s,u-l,h,g).rotateX(-Math.PI/2);_.translate((s+c)/2,0,(l+u)/2);let v=_.attributes.position;for(let e=0;e<v.count;e++){let n=v.getX(e),r=v.getZ(e),a=-t.sdExact(n,r),o=t.waterY-.25+p(-.6,.6,a)*.35+Math.max(0,a)*.22;o=Math.min(o,t.waterY+.95),o+=i.fbm2(n*.7,r*.7,3)*.08*p(0,1,a),v.setY(e,o)}_.computeVertexNormals();let y=e.mat.std({color:16777215,roughness:.95,metalness:0},{uniforms:{...n},fragHead:f+`float g_h;`,fragColor:`
      {
        vec3 wp = vWPos;
        float n = n_fbm(wp.xz * 1.3, 4);
        float m = n_fbm(wp.xz * 4.0 + 3.0, 3);
        vec3 moss = mix(vec3(0.040, 0.070, 0.012), vec3(0.11, 0.15, 0.030), smoothstep(-0.4, 0.6, m));
        vec3 soil = mix(vec3(0.050, 0.038, 0.025), vec3(0.09, 0.075, 0.05), n * 0.5 + 0.5);
        float mossAmt = smoothstep(-0.3, 0.3, n + (wp.y - uWaterY - 0.2) * 1.5);
        vec3 col = mix(soil, moss, mossAmt);
        // needles from the island pine
        float needles = smoothstep(0.5, 0.8, n_snoise(wp.xz * 9.0) * 0.5 + 0.5) * 0.4;
        col = mix(col, vec3(0.12, 0.07, 0.03), needles);
        float wet = 1.0 - smoothstep(0.0, 0.12, wp.y - uWaterY);
        col *= 1.0 - wet * 0.45;
        diffuseColor.rgb *= col;
        g_h = n * 0.3 + m * 0.4 + n_snoise(wp.xz * 22.0) * 0.08;
      }
    `,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.02);`,fragEnd:d}),b=new r(_,y);return b.name=`pondIsland`,b.castShadow=!0,b.receiveShadow=!0,b}function C(e,n,a){let{rect:o}=n,s=.35,c=Math.ceil(o.sx/s),l=Math.ceil(o.sz/s),u=[],p=[],m=new Int32Array((c+1)*(l+1)).fill(-1),h=(e,t)=>n.sd(e,t)>-1.4||n.F&&n.F.sdIsland(e,t)<.8;for(let e=0;e<=l;e++)for(let t=0;t<=c;t++){let r=o.minX+t*s,i=o.minZ+e*s;h(r,i)&&(m[e*(c+1)+t]=u.length/3,u.push(r,n.floorY(r,i),i))}for(let e=0;e<l;e++)for(let t=0;t<c;t++){let n=m[e*(c+1)+t],r=m[e*(c+1)+t+1],i=m[(e+1)*(c+1)+t],a=m[(e+1)*(c+1)+t+1];n<0||r<0||i<0||a<0||p.push(n,i,r,r,i,a)}let g=new i;g.setAttribute(`position`,new t(u,3)),g.setIndex(p),g.computeVertexNormals();let _=e.mat.std({color:16777215,roughness:.9,metalness:0},{uniforms:{...a},fragHead:f+`float g_h;`,fragColor:`
      {
        vec3 wp = vWPos;
        float n = n_fbm(wp.xz * 0.55, 4);
        float sd = pondMap(wp.xz).g * 8.0 - 2.0;
        vec3 mud = mix(vec3(0.040, 0.034, 0.022), vec3(0.085, 0.075, 0.050), n * 0.5 + 0.5);
        // silt lighter in the shallows
        mud = mix(vec3(0.12, 0.105, 0.075), mud, smoothstep(0.0, 1.6, sd));
        // pebbles in the shallows
        vec2 cell = floor(wp.xz * 9.0);
        vec2 wv = n_worley(wp.xz * 9.0);
        float peb = (1.0 - smoothstep(0.30, 0.42, wv.x)) * smoothstep(1.8, 0.2, sd) * step(0.35, n_hash12(cell));
        vec3 pc = vec3(0.20, 0.19, 0.17) * (0.6 + 0.8 * n_hash12(cell + 3.0));
        vec3 col = mix(mud, pc, peb * 0.9);
        // decayed leaves
        float lv = smoothstep(0.62, 0.78, n_fbm(wp.xz * 3.0 + 9.0, 3) * 0.5 + 0.5);
        col = mix(col, vec3(0.07, 0.035, 0.015), lv * 0.7);
        // green algae film
        col = mix(col, vec3(0.04, 0.06, 0.02), smoothstep(0.3, 0.8, n_fbm(wp.xz * 0.9 + 4.0, 3) * 0.5 + 0.5) * 0.5);
        diffuseColor.rgb *= col;
        g_h = peb * (1.0 - wv.x) * 0.6 + n * 0.1 + lv * 0.1;
      }
    `,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.03);`,fragEnd:d}),v=new r(g,_);return v.name=`pondFloor`,v.receiveShadow=!0,v.castShadow=!1,v}export{y as n,b as r,x as t};