import{n as e,r as t,t as n}from"./terrain-glsl-C7GlQnn1.js";import{f as r,i,t as a}from"./terrain-field-DTokDS2H.js";var o={start:400,full:560,height:17};function s(e,t){let{THREE:n}=e,{DOM:s,C:l}=t,u=Math.PI/180,d=(s.maxX-s.minX)/2,f=(s.maxZ-s.minZ)/2,p=[(s.maxX+s.minX)/2,(s.maxZ+s.minZ)/2],m=e.quality===`preview`?1024:2048,h=e=>{let t=(e%360+360)%360,n=+(t<=240||t>=330),i=t>240&&t<330?Math.min(r(240,262,t),r(330,308,t)):0;return n?1:1-.62*i},g=7200,_=new Float64Array(7201);for(let e=0;e<g;e++)_[e+1]=_[e]+h((e+.5)/g*360);let v=[],y=0;for(let e=0;e<m;e++){let t=e/m*_[g];for(;y<g&&_[y+1]<t;)y++;let n=(t-_[y])/Math.max(_[y+1]-_[y],1e-9);v.push((y+n)/g*360)}let b=[[s.maxX,s.minZ],[s.minX,s.minZ],[s.minX,s.maxZ],[s.maxX,s.maxZ]].map(([e,t])=>(Math.atan2(-(t-p[1]),e-p[0])/u+360)%360);for(let e of b){let t=0,n=1e9;v.forEach((r,i)=>{let a=Math.abs(r-e);a<n&&(n=a,t=i)}),v[t]=e}let x=(e,t)=>{let n=e*374761393+t*668265263|0;return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296};function S(e,t){let n=8.5,r=e/n,i=t/n,a=Math.floor(r),o=Math.floor(i),s=9;for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++){let n=a+e+x(a+e,o+t),c=o+t+x(o+t+7,a+e-3),l=(r-n)*(r-n)+(i-c)*(i-c);l<s&&(s=l)}return Math.max(0,1-s)-.5}let C=1.6,w=1.027,T=[0];for(;T[T.length-1]<5900;)T.push(C*(w**T.length-1)/.026999999999999913);let E=T.length+1,D=m*E,O=new Float32Array(D*3),k=new Float32Array(D*4),A=new Float32Array(D),j=new Float32Array(D),M=new Float32Array(D),N=new Float32Array(D);for(let e=0;e<m;e++){let n=v[e]*u,c=Math.cos(n),h=Math.sin(n),g=c,_=-h,y=Math.min(d/Math.max(Math.abs(g),1e-9),f/Math.max(Math.abs(_),1e-9));for(let n=0;n<E;n++){let c=n<T.length?y+T[n]:y+T[T.length-1],u=p[0]+g*c,d=p[1]+_*c;n===0&&(u=a(u,s.minX,s.maxX),d=a(d,s.minZ,s.maxZ));let f=n===0?t.heightAt(u,d):t.landHeight(u,d),h=Math.hypot(u-l[0],d-l[1]),v=t.forestDensity(u,d),b=h>720?1/0:t.treeTopCap(u,d)+r(460,720,h)*400,x=r(4,12,b-f),C=r(-.55,-.2,t.noise.f2(u/900,d/900,3))*.85+.15,w=r(o.start,o.full,h),D=i(v,C,w)*x,P=o.height*w*D*(.85+.3*t.noise.f4(u/60,d/60,2)),F=P>.5?P+w*D*4.5*S(u,d)*r(950,1700,h):P;b!==1/0&&(P=Math.max(0,Math.min(P,b-f-1)),F=Math.max(0,Math.min(F,b-f-1))),j[n*m+e]=n===E-1?0:F-P,M[n*m+e]=P,N[n*m+e]=b===1/0?1e9:b-f-1;let I=f+P;n===E-1&&(I=f-400);let L=(n*m+e)*3;O[L]=u,O[L+1]=I,O[L+2]=d,A[n*m+e]=f;let R=(n*m+e)*4;k[R]=D,k[R+1]=w,k[R+2]=0,k[R+3]=h}}{let e=new Float32Array(D);for(let t=0;t<D;t++)e[t]=k[t*4];let t=new Float32Array(D),n=new Float32Array(D),r=new Float64Array(m+1),o=e=>{for(let i=0;i<2;i++){for(let n=0;n<E-1;n++){let i=k[n*m*4+3];if(i<330){for(let r=0;r<m;r++)t[n*m+r]=e[n*m+r];continue}let o=Math.max(2*Math.PI/m*i,.2),s=a(Math.round(14/o),1,40);r[0]=0;for(let t=0;t<m;t++)r[t+1]=r[t]+e[n*m+t];let c=r[m];for(let e=0;e<m;e++){let i=e-s,a=e+s+1,o=0;o=i<0?r[a]+(c-r[m+i]):a>m?c-r[i]+r[a-m]:r[a]-r[i],t[n*m+e]=o/(2*s+1)}}for(let n=0;n<m;n++)t[(E-1)*m+n]=e[(E-1)*m+n];for(let e=0;e<E;e++)for(let r=0;r<m;r++){let i=e*m+r;e===0||e>=E-2||k[i*4+3]<330?n[i]=t[i]:n[i]=.25*t[i-m]+.5*t[i]+.25*t[i+m]}e.set(n)}};o(M),o(e);for(let t=0;t<E-1;t++)for(let n=0;n<m;n++){let r=t*m+n;if(k[r*4+3]<330)continue;let a=k[r*4+1],o=Math.max(0,Math.min(M[r],N[r]));O[r*3+1]=A[r]+o,k[r*4]=i(k[r*4],e[r],a)}}let P=new Uint32Array(m*(E-1)*6),F=0;for(let e=0;e<E-1;e++)for(let t=0;t<m;t++){let n=(t+1)%m,r=e*m+t,i=e*m+n,a=(e+1)*m+t,o=(e+1)*m+n;P[F++]=r,P[F++]=i,P[F++]=a,P[F++]=i,P[F++]=o,P[F++]=a}let I=new n.BufferGeometry;I.setAttribute(`position`,new n.BufferAttribute(O,3)),I.setAttribute(`aLand`,new n.BufferAttribute(k,4)),I.setIndex(new n.BufferAttribute(P,1)),I.computeVertexNormals();let L=I.attributes.normal.array,R=0;for(let e=1;e<L.length;e+=291)R+=L[e];if(R<0){for(let e=0;e<P.length;e+=3){let t=P[e+1];P[e+1]=P[e+2],P[e+2]=t}I.index.needsUpdate=!0,I.computeVertexNormals()}let z=I.attributes.normal.array;for(let e=0;e<D;e++){let t=r(500,1100,k[e*4+3]);k[e*4+2]=r(.86-.24*t,.66-.2*t,z[e*3+1])}let B=performance.now();I.setAttribute(`aFar`,new n.BufferAttribute(V(),4)),console.log(`[terrain] land verts `+D+` bake ms `+Math.round(performance.now()-B));for(let e=0;e<D;e++)O[e*3+1]+=j[e];I.attributes.position.needsUpdate=!0,I.computeBoundingSphere(),I.computeBoundingBox();function V(){let e=new Float32Array(D*4),n=e=>(e%m+m)%m,i=(e,t)=>O[(t*m+n(e))*3+1],o=(e,t)=>A[t*m+n(e)],s=14400,c=new Float32Array(14401),l=0;for(let e=0;e<=s;e++){let t=e/s*360;if(t<v[0]){c[e]=m-1+(t+360-v[m-1])/(v[0]+360-v[m-1]);continue}for(;l<m-1&&v[l+1]<=t;)l++;let n=l+1<m?v[l+1]:v[0]+360;c[e]=l+a((t-v[l])/Math.max(n-v[l],1e-6),0,1)}let h=Math.log(w),g=T.length-1.001;function _(e,n){let r=e-p[0],a=n-p[1],o=Math.hypot(r,a),l=r/o,m=a/o,_=o-Math.min(d/Math.max(Math.abs(l),1e-9),f/Math.max(Math.abs(m),1e-9));if(_<0)return t.heightAt(e,n);let v=Math.atan2(-a,r)/u;v<0&&(v+=360);let y=c[Math.round(v/360*s)],b=Math.min(Math.log(1+_*.026999999999999913/C)/h,g),x=Math.floor(y),S=Math.floor(b),w=y-x,T=b-S;return(i(x,S)*(1-w)+i(x+1,S)*w)*(1-T)+(i(x,S+1)*(1-w)+i(x+1,S+1)*w)*T}let y=6.8*u,b=-.9404,x=.3401,S=b*Math.cos(y),j=Math.sin(y),M=x*Math.cos(y),N=Math.tan(y),P=0;for(let e=0;e<D-m;e++)O[e*3+1]>P&&(P=O[e*3+1]);for(let t=0;t<E-1;t++){let n=T[Math.min(t+1,T.length-1)]-T[t]||1;for(let i=0;i<m;i++){let s=t*m+i,c=O[s*3],l=O[s*3+2],d=O[s*3+1]+1.2,f=k[s*4+3],h=1,g=z[s*3]*S+z[s*3+1]*j+z[s*3+2]*M;if(f>200){if(g<-.12)h=0;else{let e=1e9;for(let t=16;t<7e3;t*=1.16){let n=d+t*N;if(n>P+4)break;let r=(n-_(c+b*t,l+x*t))/(1.5+.026*t);if(r<e&&(e=r,e<-1))break}h=r(-1,1,e)}}let y=Math.hypot(c-p[0],l-p[1]),C=((i+1<m?v[i+1]:v[0]+360)-v[i])*u,w=Math.max(y*C,.3),T=0;for(let[e,r]of[[45,.55],[180,.45]]){let c=a(Math.round(e/w),1,60),l=a(Math.round(e/n),1,40),u=Math.max(t-l,0),d=Math.min(t+l,E-2),f=.25*(o(i-c,t)+o(i+c,t)+o(i,u)+o(i,d));T+=r*a((A[s]-f)/(e*.12),-1,1)}e[s*4]=h,e[s*4+1]=T,e[s*4+2]=g}}return e}let H=e.mat.std({color:16777215,roughness:.92,metalness:0},c());H.name=`terrainLand`;let U=new n.Mesh(I,H);return U.name=`landscape`,U.receiveShadow=!0,U.castShadow=!0,U.frustumCulled=!1,U}function c(){return{vertexHead:`attribute vec4 aLand; attribute vec4 aFar; varying vec4 vLand; varying vec4 vFar;`,vertexWorld:`vLand = aLand; vFar = aFar;`,fragHead:`
      varying vec4 vLand; varying vec4 vFar;
      float l_dirMul; vec3 l_nW; float l_h; float l_rough; float l_transl; float l_amb; float l_vis;
      ${t}
      ${n}
      ${e}
    `,fragColor:`
    {
      vec2 p = vWPos.xz;
      vec3 nGeo = normalize(vWNrm);
      vec2 fwp = fwidth(p);
      float fw = max(max(fwp.x, fwp.y), 1e-4);
      float fd = vLand.x, cb = vLand.y, rock = vLand.z;
      float dist = length(vWPos - cameraPosition);
      vec3 L = normalize(uSunDir);
      vec3 col;
      vec2 grad = vec2(0.0);
      l_h = 0.0; l_dirMul = 1.0; l_rough = 0.92; l_transl = 0.0;
      float big = n_fbm(p * 0.004, 4);
      float mid = n_fbm(p * 0.03 + 3.0, 3);

      // ---------- forest floor (under instanced trees) / meadow (open ground) ----------
      float hF, hM;
      vec3 floorC = tg_forestFloor(p, vWPos.y, fw, hF);
      l_h += (1.0 - cb) * hF;
      vec3 meadowC = tg_meadow(p, vWPos.y, fw, hM);
      {
        float farM = smoothstep(150.0, 420.0, vLand.w);
        if (farM > 0.001) {
          vec2 sid; float sf2;
          vec3 sw = tg_worley(p * 0.075 + 9.0, sid, sf2);
          vec3 sh3 = n_hash33(vec3(sid, 2.2));
          float dens = 0.25 + 0.6 * smoothstep(-0.35, 0.45, n_fbm(p * 0.0045 + 5.0, 2) + 0.5 * n_fbm(p * 0.02 - 3.0, 2));
          float rad = 0.2 + 0.16 * sh3.y;
          float clump = smoothstep(rad + 0.06, rad - 0.04, sw.x) * step(sh3.x, dens);
          float sfade = 1.0 - smoothstep(0.9, 3.0, fw * 0.075 * 4.0);
          float cov = mix(dens * 0.17, clump, sfade);
          vec3 tc = mix(vec3(0.022, 0.040, 0.020), vec3(0.06, 0.085, 0.026), sh3.z);
          tc *= mix(1.0, 0.7 + 0.5 * smoothstep(0.0, rad, sw.x), sfade);
          meadowC = mix(meadowC, tc, cov * farM);
        }
      }
      l_h += (1.0 - cb) * (1.0 - fd) * hM;
      // ---------- canopy surface (crowns) ----------
      vec3 canC;
      float crownLight = 1.0;
      float farW = smoothstep(380.0, 900.0, vLand.w);
      float cavR = smoothstep(-0.75, 0.75, vFar.y); // 0 gully .. 1 ridge / spur
      {
        // stands: cryptomeria plantations (dark, crisp-edged patches on the slopes), mixed
        // broadleaf (warmer, lighter), pale young growth along ridges, a few early-turning trees
        float st1 = n_fbm(p * 0.0042 + 11.0, 3);
        float st2 = n_fbm(p * 0.016 - 4.0, 2);
        float plant = smoothstep(0.02, 0.12, st1 + 0.45 * st2 - 0.18 * cavR + 0.08);
        float young = smoothstep(0.25, 0.6, n_fbm(p * 0.009 + 21.0, 2) + 0.35 * cavR - 0.1) * (1.0 - plant);
        vec2 cid; float f2;
        float cs = 1.0 / mix(7.5, 5.2, plant);
        vec3 w = tg_worley(p * cs, cid, f2);
        vec3 r = n_hash33(vec3(cid, 5.1));
        float conifer = max(plant * step(0.08, r.x), step(0.62 + 0.25 * big, r.x));
        vec3 coniferC = mix(vec3(0.016, 0.034, 0.024), vec3(0.030, 0.052, 0.030), r.y);
        vec3 broadC = mix(vec3(0.048, 0.080, 0.022), vec3(0.090, 0.118, 0.030), r.y);
        broadC = mix(broadC, vec3(0.105, 0.125, 0.040), young * 0.7);
        canC = mix(broadC, coniferC, conifer);
        canC = mix(canC, vec3(0.13, 0.085, 0.03), step(0.955, r.z) * (1.0 - conifer) * 0.7); // early-turning
        canC *= 0.85 + 0.3 * mid;
        float fwg = max(sqrt(fwp.x * fwp.y), 1e-4);
        float cfade = 1.0 - smoothstep(0.4, 1.2, fw * cs);
        // crown dome (pointier for conifers)
        float fr = clamp(w.x, 0.0, 1.0);
        float dome = conifer > 0.5 ? (1.0 - fr) : (1.0 - fr * fr);
        float gap = smoothstep(0.0, 0.28, f2 - w.x);
        // dome gradient (toward the crown centre = uphill)
        vec2 gdir = w.yz / max(w.x, 1e-3);
        float slope = (conifer > 0.5 ? 1.3 : 2.0 * fr) * 3.5 * cs;
        grad += cb * gdir * (-slope) * cfade * fd;
        // mean-preserving fade: distant canopy keeps the average darkness of crowns + gaps
        canC *= mix(0.6, mix(0.35, 1.0, gap) * (0.7 + 0.3 * dome), cfade);
        // leaf clusters inside crowns
        float lc = n_snoise(p * 0.9 + r.xy * 50.0);
        canC *= mix(1.0, 0.8 + 0.3 * lc, cfade * smoothstep(0.0, 1.0, 3.0 / max(fw * 10.0, 0.01)));
        crownLight = mix(0.62, 0.55 + 0.45 * smoothstep(0.1, 0.9, dome) * gap, cfade);
        // filtered clump texture (groups of crowns, gaps) that survives far beyond single crowns
        float cl1 = n_snoise(p * 0.075 + r.x * 0.0) * (1.0 - smoothstep(3.0, 11.0, fw));
        float cl2 = n_snoise(p * 0.026 + 3.0) * (1.0 - smoothstep(9.0, 32.0, fw));
        canC *= 1.0 + farW * (0.2 * cl1 + 0.16 * cl2);
        crownLight *= 1.0 + farW * (0.3 * cl1 + 0.18 * cl2);
        l_transl = cb * fd;
        // terrain-scale shading on the far slopes: gullies dark and cool, spurs and crests brighter
        canC *= mix(1.0, mix(0.74, 1.1, cavR) * 1.25, farW);
        canC = mix(canC, canC * vec3(0.85, 0.95, 1.12), farW * (1.0 - cavR) * 0.5);
        // terrain-scale modelling of the far ranges by the low sun (baked smooth-normal N.L): faces
        // turned to the sun warm and bright, averted faces cool -> ranges read as lit 3D forms even
        // when front-lit through the haze
        {
          float tl = smoothstep(-0.04, 0.32, vFar.z);
          float fr2 = smoothstep(700.0, 1600.0, vLand.w);
          canC *= mix(1.0, mix(0.72, 1.28, tl), fr2);
          canC = mix(canC, canC * vec3(1.16, 1.0, 0.78), fr2 * tl * 0.55);
          canC = mix(canC, canC * vec3(0.86, 0.95, 1.14), fr2 * (1.0 - tl) * 0.55);
        }
        // fine relief (sub-gully ribs) for the grazing light
        float relief = n_fbm(p * 0.045 + 7.0, 2);
        l_h += farW * cb * relief * 0.5 * (1.0 - smoothstep(2.0, 8.0, fw));
      }
      // ---------- rock ----------
      vec3 rockC = vec3(0.16, 0.15, 0.135) * (0.75 + 0.4 * n_fbm(p * 0.08, 3));

      vec3 under = mix(meadowC, floorC, fd);
      // forest floor sits in the shade of the canopy
      float floorShade = mix(1.0, 0.22, fd * (1.0 - cb));
      vec3 canopyAll = mix(meadowC, canC, fd);
      col = mix(under, canopyAll, cb);
      col = mix(col, rockC, rock * 0.75);
      // hotspot: with the sun behind the viewer the crown shadows hide behind the crowns
      float hot = smoothstep(0.55, 0.98, dot(normalize(cameraPosition - vWPos), L)) * farW;
      l_dirMul = mix(floorShade, mix(1.0, mix(crownLight, 1.0, hot * 0.7), fd), cb);
      // canopy self-shadowing under the grazing sun: slopes turned to the sun light up whole crowns,
      // level or averted ground only catches crown tops
      float nlG = dot(nGeo, L);
      l_dirMul *= mix(1.0, mix(0.3, 1.0, smoothstep(-0.02, 0.38, nlG)), cb * fd * (1.0 - hot * 0.6));
      // baked terrain shadow (ridges toward the sun), beyond the shadow-map range
      l_vis = mix(1.0, vFar.x, smoothstep(200.0, 380.0, vLand.w));
      l_dirMul *= l_vis;
      l_amb = mix(1.0, mix(0.68, 1.05, cavR), farW);
      l_rough = mix(0.92, 0.85, cb);
      diffuseColor.rgb = col;
      l_nW = normalize(nGeo + vec3(-grad.x, 0.0, -grad.y));
    }
    `,fragRough:`roughnessFactor = l_rough;`,fragNormal:`
      normal = normalize((viewMatrix * vec4(l_nW, 0.0)).xyz);
      normal = n_bumpView(-vViewPosition, normal, l_h, 1.0);
    `,fragLight:`
      reflectedLight.directDiffuse *= l_dirMul;
      reflectedLight.directSpecular *= l_dirMul;
      reflectedLight.indirectDiffuse *= mix(1.0, 0.75, vLand.x * (1.0 - vLand.y)) * l_amb;
      {
        // leaf translucency when looking toward the sun; rim glow on sunlit crests seen against the light
        float vs = clamp(dot(-geometryViewDir, directLight.direction), 0.0, 1.0);
        float rimN = pow(1.0 - clamp(dot(geometryNormal, geometryViewDir), 0.0, 1.0), 2.0);
        reflectedLight.directDiffuse += l_transl * l_vis * directLight.color * pow(vs, 6.0) * vec3(0.10, 0.12, 0.02) * (0.6 + 1.6 * rimN);
      }
    `,fragEnd:`
      #ifdef USE_FOG
      {
        // extra aerial perspective with distance so successive ridge layers separate (paler, bluer)
        // (haze tint without the bright forward-scatter glow, so ridges near the sun keep their silhouette)
        vec3 Vd = vWPos - cameraPosition;
        float dd = length(Vd);
        float mu = dot(Vd / max(dd, 1e-3), normalize(uSunDir));
        float toward = pow(max(mu, 0.0) * 0.5 + 0.5, 3.0);
        vec3 hz = mix(fogColor * vec3(0.92, 0.97, 1.08), fogColor * vec3(1.25, 1.04, 0.82), toward);
        hz += vec3(1.0, 0.62, 0.30) * 0.05 * pow(max(mu, 0.0), 8.0);
        // (backlit ridges keep more of their dark silhouette: the engine's aerial pass already
        // adds the forward-scatter glow toward the sun)
        float od = 0.00019 * max(dd - 380.0, 0.0) * (1.0 - 0.25 * smoothstep(0.0, 400.0, vWPos.y)) * (1.0 - 0.45 * toward);
        float Te = exp(-od);
        outgoingLight = outgoingLight * Te + hz * (1.0 - Te);
      }
      #endif
    `}}export{s as n,o as t};