import{A as e,Lt as t,U as n,Wr as r,ia as i,in as a,ir as o,j as s,no as c,pa as l,qt as u,ra as d,ro as f,sn as p}from"./three.core-Dp-eO7LC.js";import{n as m,t as h}from"./pond-water-hBOuK5qz.js";import{d as g}from"./pond-util-BP7rZgp3.js";var _=Math.PI*2;function v(){let e=[],n=[],r=[],i=[],a=e=>{let t=e<.1?.45+.55*Math.sqrt(Math.sin(e/.1*Math.PI*.5)):1;return .012+.2*(Math.sin(Math.PI*Math.min(e/.74,1)*.5+1e-4)**.62*(1-g(.36,.93,e)*.74))*t},o=e=>{let t=e<.08?.5+.5*Math.sqrt(Math.sin(e/.08*Math.PI*.5)):1;return .01+.155*Math.sin(Math.PI*Math.min(e/.6,1)*.5+1e-4)**.6*(1-g(.3,.94,e)*.82)*t},c=e=>.022*Math.sin(Math.PI*Math.min(e*1.15,1));for(let t=0;t<=72;t++){let i=(t/72)**1.08,s=-i,l=a(i)*.5,u=o(i)*.5;for(let t=0;t<=30;t++){let a=t/30*_,o=Math.cos(a),d=Math.sin(a),f=e=>Math.sign(e)*Math.abs(e)**.86,p=d>0?f(d)*l*1.05+c(i)*d:f(d)*l*.86,m=f(o)*u;if(i<.025){let e=1-i/.025;p-=.004*e,m*=1-.25*e*Math.exp(-d*d*8)}e.push(s,p,m),n.push(i,t/30),r.push(0)}}for(let e=0;e<72;e++)for(let t=0;t<30;t++){let n=e*31+t,r=n+1,a=n+31,o=a+1;i.push(n,r,a,r,o,a)}let u=(t,a,o,s)=>{let c=e.length/3;t.forEach((t,i)=>{e.push(t[0],t[1],t[2]),n.push(o[i][0],o[i][1]),r.push(s)}),a.forEach(e=>i.push(c+e[0],c+e[1],c+e[2]))},d=(e,t,n,r=6)=>{let i=[],a=[],o=[],s=e.length-1;for(let n=0;n<=s;n++){let[o,c]=[e[n],t[n]];for(let e=0;e<=r;e++){let t=e/r;i.push([o[0]+(c[0]-o[0])*t,o[1]+(c[1]-o[1])*t,o[2]+(c[2]-o[2])*t]),a.push([t,n/s])}}for(let e=0;e<s;e++)for(let t=0;t<r;t++){let n=e*(r+1)+t,i=n+1,a=n+r+1,s=a+1;o.push([n,a,i],[i,a,s])}return{verts:i,faces:o,uvs:a}},p=(e,t,n,r,i=6)=>{let a=d(e,t,0,i),o=e.length-1;for(let e=0;e<=o;e++)for(let t=0;t<=i;t++){let o=t/i,s=a.verts[e*(i+1)+t],c=(e%2?1:-1)*r*Math.sin(Math.PI*Math.min(o*1.15,1))*o**.7;s[0]+=n[0]*c,s[1]+=n[1]*c,s[2]+=n[2]*c}return a};{let e=[],t=[];for(let n=0;n<=22;n++){let r=n/22*2-1,i=.17+.17*Math.abs(r)**1.15-.07*(1-Math.abs(r))*(1-Math.abs(r));e.push([-.965,r*.032,0]),t.push([-.965-i,r*.15+r*Math.abs(r)*.02,0])}let n=p(e,t,[0,0,1],.004,7);u(n.verts,n.faces,n.uvs,1)}{let e=[],t=[];for(let n=0;n<=18;n++){let r=n/18,i=-.34-r*.36,o=-i,s=.5*a(o)*1.05+c(o)-.004,l=.08*Math.sin(Math.PI*r**.55)*(1-.35*r)+.006;e.push([i,s,0]),t.push([i-.045-.02*r,s+l,0])}let n=p(e,t,[0,0,1],.0025,5);u(n.verts,n.faces,n.uvs,1)}let m=(e,t,n,r,i,a,o,s,c)=>{let l=[],d=[];for(let u=0;u<=c;u++){let f=u/c,p=(f-.5)*i,m=r*(.55+.45*Math.cos(p*1.9)),h=-Math.cos(a+p),g=Math.sin(a+p)*s;l.push([e-f*.03,t,n]),d.push([e+h*m*.75,t-o*m,n+g*m])}let f=p(l,d,[0,1,0],.003,6);u(f.verts,f.faces,f.uvs,1)};for(let e of[1,-1])m(-.19,-.052,e*.056,.16,1.1,.95,.22,e,14),m(-.47,-.07,e*.03,.085,.9,.55,.35,e,10);{let e=[],t=[];for(let n=0;n<=10;n++){let r=n/10,i=-.72-r*.08,o=-.5*a(-i)*.86+.003;e.push([i,o,0]),t.push([i-.04,o-.05*Math.sin(Math.PI*r**.6)-.004,0])}let n=p(e,t,[0,0,1],.0015,4);u(n.verts,n.faces,n.uvs,1)}for(let t of[1,-1]){let a=new l(.0125,14,10);a.scale(1,1,.55),a.translate(-.072,.012,t*(o(.072)*.5-.0015));let s=a.attributes.position,c=a.attributes.uv,u=e.length/3;for(let t=0;t<s.count;t++)e.push(s.getX(t),s.getY(t),s.getZ(t)),n.push(c.getX(t),c.getY(t)),r.push(2);let d=a.index.array;for(let e=0;e<d.length;e+=3)i.push(u+d[e],u+d[e+1],u+d[e+2])}let h=(t,a,o,s=5)=>{let c=e.length/3,l=t.length;for(let i=0;i<l;i++){let c=t[i],u=t[Math.min(i+1,l-1)],d=t[Math.max(i-1,0)],p=new f(u[0]-d[0],u[1]-d[1],u[2]-d[2]).normalize(),m=new f().crossVectors(p,new f(0,1,0)).normalize(),h=new f().crossVectors(p,m).normalize(),g=a+(o-a)*(i/(l-1));for(let t=0;t<=s;t++){let a=t/s*_;e.push(c[0]+(m.x*Math.cos(a)+h.x*Math.sin(a))*g,c[1]+(m.y*Math.cos(a)+h.y*Math.sin(a))*g,c[2]+(m.z*Math.cos(a)+h.z*Math.sin(a))*g),n.push(i/(l-1),t/s),r.push(3)}}for(let e=0;e<l-1;e++)for(let t=0;t<s;t++){let n=c+e*(s+1)+t,r=n+1,a=n+s+1,o=a+1;i.push(n,a,r,r,a,o)}};for(let e of[1,-1])h([[-.012,-.012,e*.012],[-.006,-.026,e*.022],[-.004,-.038,e*.03]],.0022,8e-4),h([[-.03,-.018,e*.02],[-.026,-.032,e*.034],[-.026,-.044,e*.041]],.0026,.001);let v=new s;return v.setAttribute(`position`,new t(e,3)),v.setAttribute(`uv`,new t(n,2)),v.setAttribute(`aPart`,new t(r,1)),v.setIndex(i),v.computeVertexNormals(),v}function y(e,t,n,i){let s=e.rng(`pond-koi`),c=t.waterY,l=v(),u=[],d=[{x:7,z:17.5,n:4},{x:24,z:24.5,n:4},{x:-8,z:15,n:4},{x:30,z:17,n:4},{x:-16,z:25,n:3},{x:2,z:26,n:3}],g=[0,1,0,2,3,0,5,1,4,6,0,8,7,2,5,0,1,3,6,0,2,8],y=0;for(let e of d)for(let n=0;n<e.n;n++,y++){let n=e.x+s.range(-1.5,1.5),r=e.z+s.range(-1.5,1.5),i=s.range(2,4.5),a=s.range(1.4,3);for(let e=0;e<12;e++){let e=!0;for(let o=0;o<_;o+=.3)if(t.sd(n+Math.cos(o)*i,r+Math.sin(o)*a)<1){e=!1;break}if(e)break;i*=.82,a*=.82}let o=s.range(.42,.72),c=s.range(.12,.24),l=Math.PI*(3*(i+a)-Math.sqrt((3*i+a)*(i+3*a)));u.push({cx:n,cz:r,ax:i,az:a,rot:s.range(0,_),dir:s.chance(.5)?1:-1,w:c/l*_,th0:s.range(0,_),depth:s.range(.08,.3),dph:s.range(0,_),len:o,speed:c,wob:s.range(.2,.5),wph:s.range(0,_),type:g[y%g.length],seed:s.float()})}let b=(t.camPaths||[]).find(e=>e.kind===`pad`);if(b&&b.hero){let e=b.hero,t=e.dir[0],n=e.dir[2],r=Math.hypot(t,n)||1,i=t/r,a=n/r,o=(b.shot??8)*7,s=e.at[0]+i*2,c=e.at[2]+a*2;u.push({hero:!0,cx:s,cz:c,vx:a,vz:-i,T0:o+1.2,speed:.26,depth:.08,len:.62,type:0,seed:.37,dph:0,wob:.3,wph:0})}let x=u.length,S=new Float32Array(x*4);u.forEach((e,t)=>{S[t*4]=e.seed,S[t*4+1]=e.type,S[t*4+2]=e.speed/e.len,S[t*4+3]=0}),l.setAttribute(`aInst`,new a(S,4));let C={uniforms:{...n},vertexHead:`
      attribute vec4 aInst;
      attribute float aPart;
      varying vec4 vInst;
      varying vec3 vLocal;
      varying vec2 vKUv;
      varying float vPart;
    `,vertexWorld:`
      vInst = aInst; vLocal = position; vKUv = uv; vPart = aPart;
      {
        float s = clamp(-position.x, 0.0, 1.4);
        float beat = 1.6 + aInst.z * 3.0;
        float ph = aInst.x * 6.2831;
        float amp = (0.008 + 0.06 * s * s);
        float lat = amp * sin(s * 4.6 - uTime * beat + ph);
        // pectoral fins paddle slowly; the caudal fin trails the body wave
        float pect = (aPart > 0.5 && aPart < 1.5 && position.x > -0.42 && position.x < -0.1) ? sin(uTime * 1.4 + ph) * 0.025 * (abs(position.z) - 0.05) * 10.0 : 0.0;
        vec3 off = vec3(0.0, pect, lat);
        #ifdef USE_INSTANCING
          wPos4.xyz += mat3(modelMatrix * instanceMatrix) * off;
        #else
          wPos4.xyz += mat3(modelMatrix) * off;
        #endif
      }
    `,fragHead:`
      varying vec4 vInst;
      varying vec3 vLocal;
      varying vec2 vKUv;
      varying float vPart;
      float g_h; float g_metal; float g_fin; float g_rough;
      ${h}
    `,fragColor:`
      {
        float type = floor(vInst.y + 0.5);
        float seed = vInst.x * 37.0;
        vec3 lp = vLocal;
        float s = -lp.x;
        float part = floor(vPart + 0.5);
        vec2 pp = vec2(lp.x * 7.0, lp.z * 9.0 + lp.y * 3.0);
        float n1 = n_fbm(pp + seed, 3);
        float n2 = n_fbm(pp * 1.7 + seed * 2.1 + 5.0, 3);
        float n3 = n_snoise(pp * 3.2 + seed * 3.3);
        vec3 white = vec3(0.82, 0.81, 0.77);
        vec3 red = vec3(0.80, 0.10, 0.022);
        vec3 orange = vec3(0.95, 0.33, 0.04);
        vec3 black = vec3(0.012, 0.012, 0.014);
        float topF = smoothstep(-0.02, 0.03, lp.y);
        // pattern patches have soft, slightly ragged edges (scale-sized steps)
        float hi = smoothstep(0.02, 0.1, n1 + 0.1 * topF + 0.04 * n3);
        float sumi = smoothstep(0.35, 0.48, n3) * topF;
        vec3 col;
        g_metal = 0.0; g_rough = 0.32;
        if (type < 0.5) { col = mix(white, red, hi * topF); }
        else if (type < 1.5) { col = mix(white, red, hi * topF); col = mix(col, black, sumi * 0.95); }
        else if (type < 2.5) { col = mix(black, red, smoothstep(0.05, 0.2, n1) * topF); col = mix(col, white, smoothstep(0.15, 0.3, n2) * (1.0 - topF * 0.5)); }
        else if (type < 3.5) { col = vec3(0.95, 0.66, 0.18); g_metal = 0.8; g_rough = 0.26; }
        else if (type < 4.5) { col = vec3(0.30, 0.17, 0.07) * (0.9 + 0.2 * n2); }
        else if (type < 5.5) { col = orange * (0.92 + 0.12 * n2); g_metal = 0.5; }
        else if (type < 6.5) { col = mix(vec3(0.20, 0.27, 0.33), orange, 1.0 - smoothstep(-0.05, 0.02, lp.y)); }
        else if (type < 7.5) { col = vec3(0.86, 0.87, 0.86); g_metal = 0.85; g_rough = 0.24; }
        else { col = white; float hd = length(vec2(s - 0.06, lp.y - 0.03) * vec2(1.0, 1.3)); col = mix(col, red, (1.0 - smoothstep(0.03, 0.04, hd)) * topF); }
        // head is usually clean (white/orange) for kohaku-likes
        if (type < 1.5) col = mix(col, mix(white, red, smoothstep(0.0, 0.1, n2)), smoothstep(0.16, 0.05, s) * topF);
        // gill cover (operculum) line and the darker lateral line
        float fwS = max(fwidth(s), 1e-4);
        float gill = 1.0 - smoothstep(0.0, 0.004 + fwS, abs(s - 0.17 - 0.02 * abs(lp.y) * 10.0));
        float latLine = (1.0 - smoothstep(0.0, 0.0035 + fwidth(lp.y), abs(lp.y - 0.005))) * smoothstep(0.2, 0.3, s) * (1.0 - smoothstep(0.85, 0.95, s));
        // scales: staggered rows, darker reticulated margins, lighter centres; fade when sub-pixel
        float ang = vKUv.y * 6.2831;
        vec2 sc = vec2(s * 44.0, ang * 4.6);
        sc.y += floor(sc.x) * 0.5;
        vec2 f = fract(sc) - 0.5;
        float fwSc = max(length(fwidth(sc)), 1e-4);
        float scAA = 1.0 - smoothstep(0.25, 0.6, fwSc);
        float rr = length((f + vec2(0.18, 0.0)) * vec2(1.0, 1.15));
        float edge = smoothstep(0.34, 0.5, rr) * scAA;
        float body = step(part, 0.5) * smoothstep(0.17, 0.22, s) * (1.0 - smoothstep(0.88, 0.96, s));
        float ret = (type > 3.5 && type < 4.5) || (type > 5.5 && type < 6.5) ? 0.4 : 0.14;
        col *= 1.0 - edge * body * ret;
        col *= 1.0 + (1.0 - rr) * body * scAA * 0.08;
        col *= 1.0 - gill * step(part, 0.5) * 0.18;
        col *= 1.0 - latLine * step(part, 0.5) * 0.08;
        g_h = (edge * body * 0.0004 + gill * 0.0005) * scAA;
        // fins: translucent, paler, with rays (geometry pleats + fine ray lines)
        g_fin = step(0.5, part) * step(part, 1.5);
        if (part > 0.5 && part < 1.5) {
          float rays = f_rays(vKUv.y * 22.0);
          col = mix(col, white * 0.92, 0.4) * (0.86 + 0.14 * rays);
          if (type > 4.5 && type < 5.5) col = orange * 0.9;
          if (type > 1.5 && type < 2.5) col = mix(black, white, 0.45);
          if (type > 2.5 && type < 3.5) col = vec3(0.9, 0.62, 0.2);
          if (type > 6.5 && type < 7.5) col = vec3(0.85);
          col = mix(col, col * 0.75, smoothstep(0.7, 1.0, vKUv.x) * 0.3);
          g_rough = 0.45;
        } else if (part > 1.5 && part < 2.5) {
          // eye: dark pupil, gold iris ring, glossy
          vec2 ep = vKUv - vec2(0.25, 0.5);
          col = mix(vec3(0.005), vec3(0.6, 0.45, 0.12), smoothstep(0.07, 0.12, length(ep * vec2(1.0, 2.0))));
          g_rough = 0.08;
        } else if (part > 2.5) {
          col = mix(white, vec3(0.85, 0.55, 0.4), 0.3);
          g_rough = 0.5;
        }
        diffuseColor.rgb = col;
      }
    `,fragRough:`roughnessFactor = g_rough;`,fragMetal:`metalnessFactor = g_metal * (1.0 - g_fin);`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 1.0);`,fragLight:`
      #if NUM_DIR_LIGHTS > 0
        reflectedLight.directDiffuse += directLight.color * diffuseColor.rgb * g_fin * max(dot(-normal, directLight.direction), 0.0) * 0.45;
      #endif
      reflectedLight.indirectDiffuse += iblIrradiance * diffuseColor.rgb * g_fin * 0.12;
    `,fragEnd:m};C.fragHead+=`
    float f_rays(float x){
      float fw = max(fwidth(x), 1e-4);
      float d = abs(fract(x + 0.5) - 0.5);
      return mix(1.0 - smoothstep(0.12 - fw, 0.12 + fw, d), 0.24, smoothstep(0.2, 0.45, fw));
    }
  `;let w=e.mat.phys({color:16777215,roughness:.35,metalness:0,side:2,clearcoat:.55,clearcoatRoughness:.22},C),T=new p(l,w,u.length);T.name=`koi`,T.castShadow=!1,T.receiveShadow=!0,T.frustumCulled=!1;let E=new o,D=new r,O=new f,k=new f,A=new f(0,1,0);function j(e,t){if(e.hero){let n=t-e.T0,r=e.speed*n,i=Math.sin(n*.5)*.12;return[e.cx+e.vx*r-e.vz*i,e.cz+e.vz*r+e.vx*i]}let n=e.th0+e.dir*e.w*t,r=Math.cos(e.rot),i=Math.sin(e.rot),a=Math.cos(n)*e.ax,o=Math.sin(n)*e.az,s=Math.sin(t*e.wob+e.wph)*.35;return[e.cx+a*r-o*i+Math.sin(n*3+e.wph)*s*.3,e.cz+a*i+o*r+Math.cos(n*2+e.wph)*s*.3]}function M(e){u.forEach((t,n)=>{let[r,i]=j(t,e),[a,o]=j(t,e+.25),s=Math.atan2(-(o-i),a-r),l=c-t.depth-Math.sin(e*.13+t.dph)*(t.hero?.01:.06);D.setFromAxisAngle(A,s),O.set(r,l,i),k.set(t.len,t.len,t.len);let u=new f(1,0,0).applyQuaternion(D).multiplyScalar(t.len*.45);O.add(u),E.compose(O,D,k),T.setMatrixAt(n,E)}),T.instanceMatrix.needsUpdate=!0}return M(0),{mesh:T,update:e=>M(e)}}function b(){let t=[];for(let e=0;e<168;e++){let n=e/168,r=-Math.PI/2+(n-.5)*1.82*Math.PI,i=n*7%1,a=[.5,.78,.95,1,.95,.78,.5][Math.floor(n*7)],o=(1-Math.abs(i-.5)*2)**1.25,s=(e%3==0?.045:0)*(.3+o),l=.22+(a-.22)*o-s;t.push(new c(Math.cos(r)*l,Math.sin(r)*l))}let n=new d(t),r=new i(n,2);r.rotateX(-Math.PI/2);let a=r.attributes.position,o=new Float32Array(a.count*2);for(let e=0;e<a.count;e++){let t=a.getX(e),n=a.getZ(e),r=Math.hypot(t,n);a.setY(e,r*r*.1+Math.max(0,r-.55)**2*.35),o[e*2]=r,o[e*2+1]=Math.atan2(n,t)/_+.5}return r.setAttribute(`uv`,new e(o,2)),r.computeVertexNormals(),r}function x(){let e=[];for(let t=0;t<16;t++){let n=t/16*_,r=1,i=Math.max(0,Math.cos(n))**30*.35;r-=i,e.push(new c(Math.cos(n)*r*.6,Math.sin(n)*r*.45))}let t=new i(new d(e),1);t.rotateX(-Math.PI/2);let n=t.attributes.position;for(let e=0;e<n.count;e++){let t=n.getX(e),r=n.getZ(e);n.setY(e,(t*t+r*r)*.25)}return t.computeVertexNormals(),t}function S(e,t,i){let s=e.rng(`pond-debris`),c=t.waterY,l=new u;l.name=`pondDebris`;let d=t.L,g=[];for(let e of d.trees||[])(e.type===`mapleRed`||e.type===`maple`||e.type===`cherry`)&&(-t.sd(e.at[0],e.at[1])>12||g.push({x:e.at[0],z:e.at[1],kind:e.type===`cherry`?`petal`:`leaf`,n:e.type===`cherry`?90:55}));g.push({x:41,z:29,kind:`leaf`,n:30},{x:-24,z:24,kind:`leaf`,n:25},{x:18,z:31.5,kind:`leaf`,n:20},{x:6,z:9,kind:`petal`,n:60},{x:20,z:10,kind:`leaf`,n:20});let v=[],y=[];for(let e of g)for(let n=0;n<e.n;n++){let n,r,i=!1;for(let a=0;a<12;a++){let a=s.range(0,_),o=Math.abs(s.gauss(0,e.kind===`petal`?2.5:3.5));n=e.x+Math.cos(a)*o,r=e.z+Math.sin(a)*o;let c=t.sd(n,r);if(c>.25&&c<6){i=!0;break}}if(i){if(e.kind===`petal`){let e=s.int(1,4);for(let t=0;t<e;t++)y.push({x:n+s.range(-.08,.08),z:r+s.range(-.08,.08),s:s.range(.012,.016),yaw:s.range(0,_)})}else v.push({x:n,z:r,s:s.range(.045,.075),yaw:s.range(0,_)})}}let S=(t,u,d,g)=>{if(!u.length)return;let _=new Float32Array(u.length*4),v=new p(t,null,u.length),y=new o,b=new r,x=new f,S=new f;u.forEach((e,t)=>{b.setFromAxisAngle(new f(0,1,0),e.yaw),x.set(e.x,c+.0035+s.range(0,.002),e.z),S.set(e.s,e.s,e.s),v.setMatrixAt(t,y.compose(x,b,S)),_[t*4]=s.float(),_[t*4+1]=s.float(),_[t*4+2]=s.float(),_[t*4+3]=0}),t.setAttribute(`aInst`,new a(_,4)),v.material=e.mat.phys({color:16777215,roughness:.45,metalness:0,side:2,sheen:.3,sheenColor:new n(.3,.25,.2)},{uniforms:{...i},vertexHead:`attribute vec4 aInst; varying vec4 vInst; varying vec2 vUv2;`,vertexWorld:`
        vInst = aInst; vUv2 = uv;
        wPos4.xz += vec2(sin(uTime * 0.05 + aInst.x * 30.0), cos(uTime * 0.043 + aInst.y * 20.0)) * 0.06 + uWindDir * uTime * 0.0006;
      `,fragHead:`varying vec4 vInst; varying vec2 vUv2; float g_t;
`+h,fragColor:d,fragLight:`
        #if NUM_DIR_LIGHTS > 0
          reflectedLight.directDiffuse += directLight.color * diffuseColor.rgb * max(dot(-normal, directLight.direction), 0.0) * 0.5;
        #endif
      `,fragEnd:m}),v.castShadow=!1,v.receiveShadow=!0,v.name=g,v.computeBoundingSphere(),l.add(v)};return S(b(),v,`
    {
      float k = vInst.x;
      vec3 c = k < 0.45 ? vec3(0.62, 0.06, 0.02) : (k < 0.75 ? vec3(0.80, 0.22, 0.03) : (k < 0.9 ? vec3(0.75, 0.48, 0.06) : vec3(0.28, 0.08, 0.03)));
      // palmate veins: from the petiole to each lobe tip (7 lobes over the fan)
      vec2 lu = vec2(vUv2.x, vUv2.y);
      float fan = (lu.y - 0.5) / 0.91 + 0.5;
      float lv = abs(fract(fan * 7.0) - 0.5);
      float fwv = max(fwidth(fan * 7.0), 1e-4);
      float vein = (1.0 - smoothstep(0.03, 0.03 + fwv * 1.5, lv)) * smoothstep(0.05, 0.15, lu.x) * (1.0 - smoothstep(0.25, 0.5, fwv));
      c = mix(c, c * vec3(1.25, 1.1, 0.7) + 0.02, vein * 0.5);
      // colour drifts from the centre to the lobe tips, brown spots, darker wet rim
      c = mix(c, c * vec3(1.15, 1.25, 0.6), smoothstep(0.2, 0.9, lu.x) * vInst.y * 0.5);
      float spot = smoothstep(0.62, 0.72, n_snoise(vWPos.xz * 140.0 + k * 31.0) * 0.5 + 0.5) * (1.0 - smoothstep(0.002, 0.006, length(fwidth(vWPos.xz))));
      c = mix(c, vec3(0.16, 0.06, 0.02), spot * 0.6);
      c *= 0.85 + 0.3 * n_snoise(vWPos.xz * 60.0 + k * 10.0) * 0.5;
      diffuseColor.rgb = c;
    }
  `,`mapleLeaves`),S(x(),y,`
    diffuseColor.rgb = mix(vec3(0.92, 0.70, 0.74), vec3(0.95, 0.88, 0.86), vInst.x);
  `,`cherryPetals`),{object:l}}export{y as n,S as t};