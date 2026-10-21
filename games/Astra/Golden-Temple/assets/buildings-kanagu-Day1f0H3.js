import{Hn as e,Lt as t,Ni as n,Pt as r,Rn as i,Tn as a,Wi as o,Yt as s,ft as c,j as l,mt as u,no as d,ra as f}from"./three.core-Dp-eO7LC.js";import{t as p}from"./BufferGeometryUtils-BAd1TW9D.js";var m=Math.PI*2,h=10,g=.013,_=.007,v=.0095,y=.0075,b=.026,x=.036,S=e=>Math.max(0,(1-e)**.8*(.74+.26*Math.cos(e*Math.PI*4))),C={eye:{H:.4,nLap:12,L:.118,w:.042,part:0},base:{H:.52,nLap:12,L:.16,w:.048,part:6}};function w(e,t,n,i,a){let o=[];for(let n=0;n<=i;n++){let r=n/i;o.push(new d(e*S(r),r*t))}let s=o.slice(0,-1).reverse().map(e=>new d(-e.x,e.y)),c=new f([new d(0,0),...o.slice(0,-1),new d(0,t),...s]),l=Math.min(.0011,n*.45),u=new r(c,{depth:Math.max(1e-4,n-2*l),bevelEnabled:!0,bevelThickness:l,bevelSize:l*.9,bevelSegments:1,curveSegments:4});u.translate(0,0,l);let p=u.index?u.toNonIndexed():u;p.computeVertexNormals();let m=p.attributes.uv,g=p.attributes.position;for(let e=0;e<g.count;e++)m.setXY(e,g.getX(e),g.getY(e)+a*h);return p}function T(e,t,n,r,i){let a=e.clone(),o=a.attributes.position,s=a.attributes.normal;for(let e=0;e<o.count;e++){let a=o.getX(e),c=o.getY(e),l=o.getZ(e),u=s.getX(e),d=s.getY(e),f=s.getZ(e);i&&(a=-a,c=-c,u=-u,d=-d);let p=t+l,m=n+a/t,h=Math.sin(m),g=Math.cos(m);o.setXYZ(e,p*h,r+c,p*g),s.setXYZ(e,u*g+f*h,d,-u*h+f*g)}return a}function E(e,n,r,i,a,o,s=!1){let c=n.length,u=[],d=[],f=[],p=[],g=n.map((e,t)=>{let r=n[Math.max(t-1,0)],i=n[Math.min(t+1,c-1)],a=i[0]-r[0],o=i[1]-r[1],s=Math.hypot(a,o)||1;return[o/s,-a/s]});for(let t=0;t<=r;t++){let l=t/r*m,p=Math.sin(l),_=Math.cos(l);for(let t=0;t<c;t++){let[r,c]=n[t],m=e+r;u.push(m*p,c,m*_),d.push(g[t][0]*p,g[t][1],g[t][0]*_),f.push(l*i,(s?c-n[0][1]:c-a/2)+o*h)}}for(let e=0;e<r;e++)for(let t=0;t<c-1;t++){let n=e*c+t,r=(e+1)*c+t,i=(e+1)*c+t+1,a=e*c+t+1;p.push(n,r,i,n,i,a)}let _=new l;return _.setAttribute(`position`,new t(u,3)),_.setAttribute(`normal`,new t(d,3)),_.setAttribute(`uv`,new t(f,2)),_.setIndex(p),_.toNonIndexed()}function D(e,t,n){let r=[];for(let n=0;n<=6;n++){let i=n/6*Math.PI/2;r.push(new d(e*Math.cos(i)*(n===0?1.12:1),t*Math.sin(i)))}r.unshift(new d(e*1.12,-6e-4));let i=new a(r,n).rotateX(Math.PI/2).toNonIndexed();i.computeVertexNormals();let o=i.attributes.position,s=i.attributes.uv;for(let n=0;n<o.count;n++)s.setXY(n,Math.hypot(o.getX(n),o.getY(n))/e,50+Math.max(o.getZ(n),0)/t*.01);return i}var O=new Map;function k(e,t=`eye`,n=!0){let r=`${e},${t},${n}`;if(O.has(r))return O.get(r);let i=C[t],{H:a,nLap:o,L:s,w:c}=i,l=n?192:96,u=e+y,d=[],f=t=>{let n=e=>t?[e[0],a-e[1]]:e,r=[];for(let e=0;e<=10;e++){let t=-Math.PI/2+e/10*Math.PI;r.push([_+g*Math.cos(t),b/2+b/2*Math.sin(t)])}r[0]=[0,0];let i=[[.0083,b],[v,.0272],[v,.0348],[.0083,x],[y,.036199999999999996]],o=r.map(n),s=i.map(n);t&&(o=o.reverse(),s=s.reverse()),d.push(E(e,o,l,u,a,1)),d.push(E(e,s,l,u,a,2,!0))};f(!1),f(!0);let h=[];for(let e=0;e<=9;e++){let t=e/9;h.push([y+.0016*Math.sin(Math.PI*t),.036199999999999996+t*(a-2*x-4e-4)])}d.push(E(e,h,l,u,a,i.part));let S=n?18:8,k=w(c,s,.0026,S,3),A=w(c*.7,s*.8,.0016,S,4).translate(0,s*.06,.0024),j=p([k,A]),M=D(.0046,.0034,n?12:6).translate(0,s*.3,.0038),N=D(.0036,.0028,n?10:6);for(let t=0;t<o;t++)for(let n of[!1,!0]){let r=(t+(n?.5:0))/o*m,i=n?a-x+4e-4:.0356;d.push(T(j,u+.0012,r,i,n)),d.push(T(M,u+.0012,r,i,n));let s=r+Math.PI/o;d.push(T(N,e+v,s,n?a-.062/2:.062/2,n))}let P=p(d.map(e=>{for(let t of Object.keys(e.attributes))[`position`,`normal`,`uv`].includes(t)||e.deleteAttribute(t);return e}));return P.computeBoundingSphere(),O.set(r,P),P}var A=(e,t)=>{let n=Math.min(Math.max(e/t,0),1);return 1-n*n};function j(e,t,n,r,i){let a=Math.hypot(e,t),o=Math.atan2(t,e),s=Math.floor((a/n-o)/m),c=Math.min(Math.max(o+m*s,r),i),l=Math.min(Math.max(o+m*(s+1),r),i),u=Math.hypot(e-n*c*Math.cos(c),t-n*c*Math.sin(c)),d=Math.hypot(e-n*l*Math.cos(l),t-n*l*Math.sin(l));return u<d?[u,(c-r)/(i-r)]:[d,(l-r)/(i-r)]}function M(e,t,n,r,i,a){let o=e-n,s=t-r,c=i-n,l=a-r,u=Math.min(Math.max((o*c+s*l)/(c*c+l*l),0),1);return Math.hypot(o-c*u,s-l*u)}function N(e,t,n,r,i,a,o,s,c){let l=Math.hypot(i,a);i/=l,a/=l;let u=e-n,d=t-r,f=u*i+d*a,p=-u*a+d*i,m=f/o;if(m<=0||m>=1)return 0;p-=c*o*Math.sin(Math.PI*m);let h=s*Math.sin(Math.PI*m)**.7*(1-.3*m)+1e-4,g=Math.abs(p)/h;if(g>=1)return 0;let _=1-g*g;_*=1-.5*(1-P(0,.14,g));let v=m*4.5-g*.9,y=Math.abs(v-Math.floor(v)-.5);return _*=1-.25*(1-P(.03,.1,y))*P(.15,.3,g),_}function P(e,t,n){let r=Math.min(Math.max((n-e)/(t-e),0),1);return r*r*(3-2*r)}function F(e,t,n,r,i){let a=e-n,o=t-r,s=Math.hypot(a,o);if(s>i)return 0;let c=Math.abs(Math.cos(4*Math.atan2(o,a))),l=i*(.58+.42*c**.6),u=s<l?1-(s/l)**2*.55:0;u*=P(0,.025,l-s);let d=1-.4*(1-P(0,.12,c))*(s>i*.3),f=A(s,i*.26)*1.1,p=1-P(0,i*.05,Math.abs(s-i*.3));return Math.max(u*d*(1-.45*p),f)}function I(e,t){let n=.5+.16*Math.sin(m*e),r=.16*m*Math.cos(m*e),i=A(Math.abs(t-n)/Math.sqrt(1+r*r),.036)*.9;if(t>.55&&e>.2&&e<.62){let[n,r]=j(e-.42,t-.78,.0148,1.7*Math.PI,3*Math.PI);i=Math.max(i,A(n,.022+.012*r)*(.85+.15*r)),i=Math.max(i,F(e,t,.42,.78,.07))}if(i=Math.max(i,A(M(e,t,.281,.78,.27,.66),.032)*.95),i=Math.max(i,N(e,t,.1,.585,.5,-.866,.3,.085,.12)),i=Math.max(i,N(e,t,.31,.655,-.8,.6,.2,.055,-.15)),t>.6&&e>.68){let[n,r]=j(e-.84,t-.81,.00868,1.3*Math.PI,3.3*Math.PI);i=Math.max(i,A(n,.014+.012*r)*(.8+.2*r)),i=Math.max(i,A(Math.hypot(e-(.84+.035*Math.cos(1.3*Math.PI)),t-(.81+.035*Math.sin(1.3*Math.PI))),.022))}return i=Math.max(i,A(M(e,t,.787,.737,.752,.672),.02)*.85),i}var L=null;function R(t,r,a=768,l=1536){if(L)return L;let d=new Uint16Array(a*l*2),f=Math.round(t/.0013),p=2*Math.round(r/.00113),m=u.toHalfFloat;for(let e=0;e<l;e++){let t=(e+.5)/l*2,n=Math.floor(t),r=t-n;for(let t=0;t<a;t++){let i=(t+.5)/a;n%2&&(i=.37-i,i-=Math.floor(i));let o=i+.5;o-=Math.floor(o);let s=Math.min(1.1,Math.max(I(i,r),I(o,1-r))),c=(e+.5)/l*p,u=(t+.5)/a*f+Math.floor(c)%2*.5,h=u-Math.floor(u)-.5,g=c-Math.floor(c)-.5,_=Math.hypot(h,g*.87),v=(1-P(0,.13,Math.abs(_-.33)))*.6-(1-P(.17,.3,_)),y=1.2*s+.05*v*(1-P(0,.12,s)),b=(e*a+t)*2;d[b]=m(y),d[b+1]=m(s)}}let h=new c(d,a,l,n,s);return h.wrapS=h.wrapT=o,h.magFilter=i,h.minFilter=e,h.generateMipmaps=!0,h.anisotropy=8,h.needsUpdate=!0,L=h,h}function z(e){let t=m*(e+y),n=t/Math.round(t/.08),r=.08,i=t/Math.round(t/.0105),a=e=>e.toFixed(6),o=e=>`vec4(${a(t/e.nLap)}, ${a(e.H/2-x+4e-4)}, ${a(e.L)}, ${a(e.w)})`;return{uniforms:{uKTex:{value:R(n,r)}},fragHead:`
      varying vec2 vKUv;
      uniform sampler2D uKTex;
      float g_kh; float g_krel; float g_kcav; float g_kpol; float g_kver; float g_kwear; float g_ksh; float g_kao;
      vec2 kk_uv; float kk_part; float kk_fw; bool kk_field;
      const float KK_PI = 3.14159265;
      float kk_prof(float d, float w){ float x = clamp(d / w, 0.0, 1.0); return 1.0 - x * x; }
      // lappet outline (matches lapEnv in JS)
      float kk_env(float t){ return max(0.0, pow(max(1.0 - t, 0.0), 0.8) * (0.74 + 0.26 * cos(t * KK_PI * 4.0))); }
      // distance-ish (m) to the nearest lappet outline (< 0 inside); lp = (pitch, base |v|, L, w)
      float kk_lapD1(vec2 m, vec4 lp, float off, float y){
        float x = (fract(m.x / lp.x - off + 0.5) - 0.5) * lp.x;
        float t = y / lp.z;
        if (t < 0.0) return -0.001;
        if (t > 1.0) return length(vec2(x, y - lp.z));
        return abs(x) - lp.w * kk_env(t);
      }
      float kk_lapD(vec2 m, vec4 lp){
        return min(kk_lapD1(m, lp, 0.0, m.y + lp.y), kk_lapD1(m, lp, 0.5, lp.y - m.y));
      }
      float kk_nanako(vec2 m, float fw){
        const float P = 0.0011;
        vec2 q = m / P; q.x += 0.5 * mod(floor(q.y), 2.0);
        vec2 g = fract(q) - 0.5; float r = length(g);
        float ring = 1.0 - smoothstep(0.0, 0.12, abs(r - 0.33));
        float pit = 1.0 - smoothstep(0.18, 0.3, r);
        return (ring * 0.6 - pit) * (1.0 - smoothstep(0.25, 0.6, fw / P));
      }
      // field relief height (m) + relief mask from the baked karakusa tile
      float kk_fieldH(vec2 m, out float rel){
        vec2 t = texture(uKTex, m * vec2(${a(1/n)}, ${a(.5/r)})).rg;
        rel = t.y;
        return 0.001 * t.x;
      }
      // relief of the small parts (beads, engraved border, lappet tiers, rivets)
      float kk_partH(float part, vec2 m, float fw, out float rel){
        rel = 1.0;
        if (part < 1.5) {
          float x = (fract(m.x / ${a(i)}) - 0.5) * 2.0;
          rel = 1.0 - x * x;
          return 0.0011 * (rel - 0.66) * (1.0 - smoothstep(0.12, 0.3, fw / ${a(i)}));
        }
        if (part < 2.5) {
          float zz = 0.005 + 0.0016 * (abs(fract(m.x / 0.0042) - 0.5) * 4.0 - 1.0);
          float l1 = 1.0 - smoothstep(0.0002, 0.00045, abs(m.y - 0.0022));
          float l2 = 1.0 - smoothstep(0.0002, 0.00045, abs(m.y - 0.0078));
          float l3 = 1.0 - smoothstep(0.00018, 0.0004, abs(m.y - zz));
          rel = 1.0 - max(max(l1, l2), l3);
          return -0.00018 * (1.0 - rel) * (1.0 - smoothstep(0.0002, 0.0006, fw));
        }
        if (part < 3.5) { rel = 0.0; return 0.00005 * kk_nanako(m, fw); }
        if (part < 4.5) {
          float ax = abs(m.x);
          float mid = 1.0 - smoothstep(0.00025, 0.0006, ax);
          float side = 1.0 - smoothstep(0.0002, 0.0005, abs(fract((m.y - ax * 1.3) / 0.0085) - 0.5) * 0.0085);
          side *= smoothstep(0.0015, 0.003, ax);
          return -0.0002 * max(mid, side * 0.8) * (1.0 - smoothstep(0.00025, 0.0007, fw));
        }
        return 0.0;
      }
    `,fragColor:`
    {
      kk_part = floor((vKUv.y + 5.0) / ${h.toFixed(1)});
      kk_uv = vec2(vKUv.x, vKUv.y - kk_part * ${h.toFixed(1)});
      kk_fw = max(length(fwidth(kk_uv)), 1e-6);
      kk_field = kk_part < 0.5 || (kk_part > 5.5 && kk_part < 6.5);
      float rel;
      if (kk_field) g_kh = kk_fieldH(kk_uv, rel); else g_kh = kk_partH(kk_part, kk_uv, kk_fw, rel);
      g_krel = rel;
      vec3 wp = vWPos;
      float nB = n_fbm3(wp * 2.6, 3);
      float nS = n_fbm3(wp * 17.0 + 3.0, 2);
      float aaS = 1.0 - smoothstep(0.004, 0.012, kk_fw);
      g_kao = 1.0; g_ksh = 1.0;
      float lapEdge = 0.0;
      if (kk_field) {
        vec4 lp = kk_part < 0.5 ? ${o(C.eye)} : ${o(C.base)};
        float dl = kk_lapD(kk_uv, lp);
        lapEdge = 1.0 - smoothstep(0.0, 0.006, dl);
        g_kao = mix(0.5, 1.0, smoothstep(0.0, 0.005, dl));
        // lappet contact shadow toward the low sun (the plates are too thin for the shadow map)
        vec3 S = normalize(uSunDir);
        vec3 Nw = normalize(vWNrm);
        vec3 Tt = normalize(cross(vec3(0.0, 1.0, 0.0), Nw));
        vec3 Bb = cross(Nw, Tt);
        float sn = dot(S, Nw);
        if (sn > 0.0) {
          vec2 st = vec2(dot(S, Tt), dot(S, Bb)) / max(sn, 0.08);
          float occ = 0.0;
          for (int k = 1; k <= 4; k++) occ = max(occ, smoothstep(0.0003, -0.0003, kk_lapD(kk_uv + st * (0.0012 * float(k)), lp)));
          g_ksh = 1.0 - occ;
        }
      }
      // masks: cavities, polish, verdigris, rubbed-through gilding
      float cav = kk_field ? 1.0 - smoothstep(0.0, 0.35, rel) : (kk_part < 1.5 ? 1.0 - rel : (kk_part < 2.5 ? (1.0 - rel) * 0.8 : (kk_part < 3.5 ? 0.8 : 0.15)));
      cav = max(cav, 1.0 - g_kao);
      g_kcav = cav;
      float lowV = 1.0 - smoothstep(-0.2, 0.05, kk_uv.y);
      float vn = n_fbm3(wp * vec3(11.0, 5.0, 11.0) + 11.0, 3) * 0.5 + 0.5;
      g_kver = smoothstep(0.62, 0.9, vn + lowV * 0.12 + lapEdge * 0.22) * cav * (kk_field ? 0.75 : (kk_part > 2.5 && kk_part < 3.5 ? 0.5 : 0.2));
      g_kver *= smoothstep(-0.1, 0.35, nB);
      g_kpol = kk_field ? smoothstep(0.2, 0.85, rel) : (kk_part > 3.5 ? 1.0 : (kk_part < 1.5 ? 0.35 + 0.65 * rel : (kk_part < 2.5 ? 0.8 * rel : 0.3)));
      g_kwear = smoothstep(0.8, 0.98, rel * (0.7 + 0.45 * (nS * 0.5 + 0.5))) * smoothstep(0.35, 0.75, nB * 0.5 + 0.5);
      if (kk_part > 4.5 && kk_part < 5.5) g_kwear = smoothstep(0.75, 1.0, kk_uv.y * 100.0) * smoothstep(0.3, 0.8, nS * 0.5 + 0.5) * 0.6;
      vec3 gilt = vec3(1.0, 0.69, 0.29) * (0.92 + 0.10 * nB + 0.05 * nS * aaS);
      vec3 col = mix(gilt * vec3(0.70, 0.57, 0.40), gilt * 1.05, g_kpol);
      col = mix(col, vec3(0.50, 0.26, 0.10), g_kwear * 0.7);
      float tar = cav * (0.45 + 0.4 * smoothstep(-0.3, 0.6, nB));
      col = mix(col, vec3(0.16, 0.095, 0.04), tar * (kk_field ? 0.5 : 0.35));
      col *= mix(1.0, g_kao, 0.7);
      col = mix(col, vec3(0.035, 0.10, 0.075) * (0.8 + 0.4 * vn), g_kver);
      diffuseColor.rgb *= col;
    }
    `,fragRough:`roughnessFactor = clamp(mix(0.48, 0.15, g_kpol) + g_kcav * 0.1 + g_kwear * 0.12, 0.1, 1.0); roughnessFactor = mix(roughnessFactor, 0.9, g_kver);`,fragMetal:`metalnessFactor = 1.0 - g_kver * 0.95;`,fragNormal:`
    {
      vec3 Nw = n_worldNormalFromView(normal);
      vec3 dpx = dFdx(vWPos), dpy = dFdy(vWPos);
      vec2 dtx = dFdx(kk_uv), dty = dFdy(kk_uv);
      float det = dtx.x * dty.y - dtx.y * dty.x;
      if (abs(det) > 1e-16) {
        vec3 T = (dpx * dty.y - dpy * dtx.y) / det;
        vec3 B = (dpy * dtx.x - dpx * dty.x) / det;
        T = normalize(T - Nw * dot(Nw, T)); B = normalize(B - Nw * dot(Nw, B));
        float e = max(kk_fw * 0.5, 0.00012);
        float r0, hx, hy;
        if (kk_field) { hx = kk_fieldH(kk_uv + vec2(e, 0.0), r0); hy = kk_fieldH(kk_uv + vec2(0.0, e), r0); }
        else { hx = kk_partH(kk_part, kk_uv + vec2(e, 0.0), kk_fw, r0); hy = kk_partH(kk_part, kk_uv + vec2(0.0, e), kk_fw, r0); }
        vec2 gr = vec2(hx - g_kh, hy - g_kh) / e;
        vec3 nW = normalize(Nw - gr.x * T - gr.y * B);
        // chased relief self shadow under the raking sun
        if (kk_field && kk_fw < 0.0012) {
          vec3 S = normalize(uSunDir);
          float sn = dot(S, Nw);
          vec2 st = vec2(dot(S, T), dot(S, B));
          float lt = length(st);
          if (sn > 0.0 && lt > 1e-3) {
            vec2 dir = st / lt; float rise = sn / lt;
            float occ = 0.0;
            for (int k = 1; k <= 4; k++) {
              float s = 0.0009 * float(k);
              float hq = kk_fieldH(kk_uv + dir * s, r0);
              occ = max(occ, smoothstep(0.0, 0.00012, hq - (g_kh + s * rise)));
            }
            g_ksh *= 1.0 - occ * 0.85 * (1.0 - smoothstep(0.0005, 0.0012, kk_fw));
          }
        }
        // specular anti-aliasing: widen the lobe where the normal varies inside a pixel
        vec3 dn = fwidth(nW);
        roughnessFactor = sqrt(roughnessFactor * roughnessFactor + min(dot(dn, dn) * 2.0, 0.3));
        normal = normalize((viewMatrix * vec4(nW, 0.0)).xyz);
      }
    }
    `,fragLight:`
      reflectedLight.directDiffuse *= g_ksh;
      reflectedLight.directSpecular *= g_ksh;
      reflectedLight.indirectDiffuse *= mix(1.0, g_kao, 0.7);
      reflectedLight.indirectSpecular *= mix(1.0, g_kao, 0.8);
    `,vertexHead:`varying vec2 vKUv;`,vertexWorld:`vKUv = uv;`}}export{S as a,R as i,k as n,z as r,C as t};