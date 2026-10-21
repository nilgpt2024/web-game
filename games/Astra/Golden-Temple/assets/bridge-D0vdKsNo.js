async function e(e){let{THREE:t,L:n,geom:r,mat:i}=e,{Builder:a,mat4:o}=r,s=r.RoundedBoxGeometry,c=e.rng(`bridge`),l=(e,t,n)=>Math.max(t,Math.min(n,e)),u=(e,t,n)=>{let r=l((n-e)/(t-e),0,1);return r*r*(3-2*r)},d=e=>Number(e).toFixed(6),f=Object.assign({south:[10,0,27],north:[10,0,5],width:3.6,rise:2.6,posts:9},n.bridge||{}),p=n.groundY||0,m=(f.north[0]+f.south[0])/2,h=Math.min(f.north[2],f.south[2]),g=Math.max(f.north[2],f.south[2]),_=(h+g)/2,v=(g-h)/2,y=f.rise,b=(v*v+y*y)/(2*y),x=p+y-b,S=n.pond&&n.pond.waterY!=null?n.pond.waterY:-.55,C=n.pond&&n.pond.bottomY!=null?n.pond.bottomY:-1.7,w=f.width/2,ee=p+.06,T=Math.acos((b-y+(ee-p))/b),E=_-b*Math.sin(T),D=_+b*Math.sin(T),O=(e,t=0)=>x+Math.sqrt(Math.max((b+t)**2-(e-_)**2,0)),k=(e,t=0)=>Math.asin(l((e-_)/(b+t),-1,1)),A=(e,n=0,r=m)=>new t.Vector3(r,x+(b+n)*Math.cos(e),_+(b+n)*Math.sin(e)),te=w-.105,j={u0:w-.25,u1:w+.03,v0:-.13,v1:0},M=-.12,N={w:.13,v0:-.005,v1:.1},P={w:.066,v0:.535,v1:.665},F={a:.052,b:.06,v:.925},ne=.16,re=.22,ie=[-.82,0,.82],ae=-.74,I={bandA:[.0384,.0583],bandB:[.0795,.0935],bulb0:.1255,H:.205,Rm:.086,tEnd:.93};I.rings=[I.bulb0+I.H*.255,I.bulb0+I.H*.285,I.bulb0+I.H*.8];let L=e.modules&&e.modules.pond&&e.modules.pond.site;function R(e,t){if(L&&L.sdExact)try{return L.sdExact(e,t)>0}catch{}let r=n.pond&&n.pond.outline;if(!r)return Math.abs(t-_)<v-1.5;let i=!1;for(let n=0,a=r.length-1;n<r.length;a=n++){let o=r[n][0],s=r[n][1],c=r[a][0],l=r[a][1];s>t!=l>t&&e<(c-o)*(t-s)/(l-s+1e-12)+o&&(i=!i)}return i&&t>f.south[2]-.6&&Math.abs(e-f.south[0])<Math.max(w+1.6,3.2)&&(i=!1),i}function oe(e,t){for(let n=0;n<=400;n++){let r=e+t*n*.025;if(R(m,r)&&R(m-w,r)&&R(m+w,r))return r;if(t*(r-_)>0)break}return e+t*1.5}let se=oe(E,1),ce=oe(D,-1),le=Math.max(l(se+.35-E,.9,3.2),l(D-(ce-.35),.9,3.2)),z=E+le,B=D-le,ue=p-.16,de=ue-.1,fe=.62,pe=O(z)+M-de-fe,me=O(B)+M-de-fe;function he(e){let t=fe,n=e-z,r=B-e,i=u(4.2,-.2,n)**2,a=u(4.2,-.2,r)**2;return t+=Math.max(pe,0)*i+Math.max(me,0)*a,n<0&&(t+=-n*.8),r<0&&(t+=-r*.8),t}let ge=`
#define ARC_ZC ${d(_)}
#define ARC_YC ${d(x)}
#define ARC_R ${d(b)}
#define BR_X0 ${d(m)}
#define WATER_Y ${d(S)}
`,_e=`
    {
      vec2 relA = vec2(vWPos.z - ARC_ZC, vWPos.y - ARC_YC);
      float depthA = ARC_R - length(relA);
      float insideA = 1.0 - smoothstep(${d(w-.35)}, ${d(w+.06)}, abs(vWPos.x - BR_X0));
      float underA = smoothstep(0.0, 0.14, depthA) * insideA;
      vec3 wnA = normalize(vWNrm);
      float aoA = mix(1.0, 0.4, underA);
      aoA *= mix(1.0, 0.5, smoothstep(0.1, 0.9, -wnA.y) * smoothstep(-0.3, 0.05, depthA));
      reflectedLight.indirectDiffuse *= aoA;
      reflectedLight.indirectSpecular *= mix(1.0, aoA, 0.85);
      // light bounced off the pond: (a) skylight / glare reflected up onto soffits and
      // low faces, (b) the low sun's glint off the rippled surface -> drifting caustic bands
      vec3 Ls = normalize(uSunDir);
      float hB = vWPos.y - WATER_Y;
      vec3 nB = normalize((vec4(geometryNormal, 0.0) * viewMatrix).xyz);
      // toward-the-light vector of the water-reflected sun (down and toward the sun; ripples spread it upward)
      vec3 bDir = normalize(vec3(Ls.x, -Ls.y - 0.22, Ls.z));
      float ndB = max(dot(nB, bDir), 0.0);
      float downB = clamp(-nB.y, 0.0, 1.0);
      float nearW = (1.0 - smoothstep(0.8, 3.6, hB)) * smoothstep(-0.02, 0.06, hB);
      vec2 rp = vWPos.xz + (Ls.xz / max(Ls.y + 0.22, 0.05)) * max(hB, 0.0);
      float wM = smoothstep(-25.0, -21.0, rp.x) * (1.0 - smoothstep(40.0, 43.0, rp.x)) * smoothstep(7.0, 9.0, rp.y) * (1.0 - smoothstep(31.0, 33.0, rp.y));
      vec2 cq = rp * vec2(0.62, 1.0);
      float c1 = clamp(1.0 - abs(n_snoise3(vec3(cq + vec2(uTime * 0.3, 0.0), uTime * 0.4))), 0.0, 1.0);
      float c2 = clamp(1.0 - abs(n_snoise3(vec3(cq * 1.7 + 7.0 - vec2(0.0, uTime * 0.25), uTime * 0.5 + 3.0))), 0.0, 1.0);
      float sharpC = mix(1.0, 0.5, smoothstep(0.4, 2.8, hB)); // caustics soften with distance from the water
      float caus = pow(c1, 14.0 * sharpC) * 1.2 + pow(c2, 16.0 * sharpC) * 0.7;
      // the dancing light only reads in shade (direct sun swamps it); lotus pads cut the reflecting area
      float shf = clamp(dot(directLight.color, vec3(1.0)) / max(dot(uSunColor, vec3(1.0)), 1e-4), 0.0, 1.0);
      caus *= mix(1.0, 0.25, shf);
      float downW = (1.0 - smoothstep(2.6, 5.0, hB)) * smoothstep(-0.02, 0.06, hB);
      vec3 bounce = uSunColor * wM * (nearW * ndB * (0.02 + 0.1 * caus) + downW * downB * (0.05 + 0.06 * caus * nearW));
      reflectedLight.indirectDiffuse += material.diffuseColor * RECIPROCAL_PI * bounce;
    }
  `,ve=i.phys({color:16777215,roughness:.52,metalness:0,clearcoat:.09,clearcoatRoughness:.45,vertexColors:!0},{fragHead:ge+`float g_h; float g_r;`,fragColor:`
      {
        vec3 wp = vWPos; vec3 wn = normalize(vWNrm);
        // g carries grime + 2 * kind (kind 1 = railing members, 0 = fascia / substructure)
        float kindR = step(1.5, vColor.g);
        float mode = vColor.r; float dirt = vColor.g - 2.0 * kindR; float pr = vColor.b;
        vec2 rel = vec2(wp.z - ARC_ZC, wp.y - ARC_YC);
        // local grain frame: x = along the member, y/z = across (metres, small local values)
        vec3 gp;
        float xr = wp.x - BR_X0;
        float xl = xr - floor(xr / 0.845 + 0.5) * 0.845; // member-centred across coordinate
        if (mode < 0.25) gp = vec3(atan(rel.x, rel.y) * ARC_R, (length(rel) - ARC_R) + 0.43, xl);
        else if (mode < 0.75) gp = vec3(wp.y, xl, (wp.z - ARC_ZC) * 0.35);
        else gp = vec3(xr, wp.y - 1.4, wp.z - ARC_ZC);
        float big = n_fbm3(wp * 0.35 + pr * 3.0, 3);
        float pxL = length(fwidth(wp));                         // pixel footprint (m): fades sub-pixel detail
        float aaF = 1.0 - smoothstep(0.003, 0.009, pxL);
        // flat-sawn growth rings: distance to a slowly wandering virtual log axis -> cathedral figure
        float logD = abs(gp.z) + (0.06 + 0.3 * pr) + 0.42 * (1.0 - kindR) + 0.06 * sin(gp.x * (1.1 + 1.2 * pr) + pr * 17.0) + 0.04 * n_snoise(vec2(gp.x * 0.9, pr * 9.0));
        float logA = gp.y + (pr - 0.5) * 0.35 + 0.03 * n_snoise(vec2(gp.x * 1.7, pr * 4.0 + 2.0));
        float rr0 = length(vec2(logA, logD));
        float rr2 = rr0 * (55.0 + 25.0 * pr) + 1.6 * n_snoise(vec2(rr0 * 9.0, pr * 31.0)) + 0.3 * n_snoise3(gp * vec3(0.6, 14.0, 14.0));
        float rf = fract(rr2);
        float fw = fwidth(rr2);
        float lw = 0.62 + 0.25 * n_snoise(vec2(floor(rr2) * 0.37, pr * 7.0));
        float lines = smoothstep(lw, lw + 0.2, rf) * (1.0 - smoothstep(0.9, 1.0, rf)) * (0.55 + 0.45 * n_snoise(vec2(floor(rr2) * 0.71, gp.x * 0.8)));
        lines = mix(lines, 0.3, smoothstep(0.25, 0.7, fw));
        float gw = n_snoise3(gp * vec3(0.15, 2.5, 2.5) + pr * 7.0);
        float gl = n_fbm3((gp + pr * 13.0) * vec3(0.22, 15.0, 15.0) + vec3(0.0, gw * 0.7, gw * 0.7), 3);
        float fine = n_snoise3((gp + pr * 5.0) * vec3(1.4, 70.0, 70.0)) * aaF;
        // fine dark checks (drying cracks) along the grain
        float chk = smoothstep(0.84, 0.97, abs(n_snoise3((gp + pr * 3.0) * vec3(0.5, 38.0, 38.0) + 3.0))) * (1.0 - smoothstep(0.004, 0.012, pxL));
        // railings: sun-faded shu (orange vermilion); fascia + substructure: deeper oxblood bengara over visible grain
        vec3 baseR = vec3(0.400, 0.140, 0.095);
        vec3 baseS = vec3(0.150, 0.058, 0.050);
        vec3 base = mix(baseS, baseR, kindR) * (0.86 + 0.16 * (pr - 0.5) + 0.18 * big);
        vec3 col = base * (1.0 - mix(0.12, 0.30, kindR) * lines - 0.12 * smoothstep(0.0, 0.4, gl) - 0.05 * fine - 0.35 * chk);
        // structure: thin paint worn off the raised latewood -> paler salmon streaks of the figure
        float figF = (1.0 - kindR) * (1.0 - smoothstep(0.3, 0.75, fw));
        col = mix(col, base * vec3(1.6, 2.1, 2.05), figF * lines * 0.36);
        col = mix(col, base * vec3(1.4, 1.75, 1.75), figF * smoothstep(0.0, 0.5, gl) * 0.3);
        // fascia boards: horizontal seam between the two stacked arch boards + butt joints
        if (kindR < 0.5 && mode < 0.25) {
          float dR = ARC_R - length(rel);
          float faceS = smoothstep(0.8, 0.97, abs(wn.x));
          float seam = 1.0 - smoothstep(0.0, 0.006 + fwidth(dR), abs(dR - 0.47));
          float sA = atan(rel.x, rel.y) * ARC_R;
          float bj = 1.0 - smoothstep(0.0, 0.005 + fwidth(sA), abs(fract(sA / 3.65 + 0.5) - 0.5) * 3.65);
          col *= 1.0 - faceS * 0.6 * max(seam, bj * step(0.12, dR));
        }
        // sun-faded tops (slightly paler, more orange)
        float up = smoothstep(0.35, 0.95, wn.y);
        float underF = smoothstep(0.0, 0.14, ARC_R - length(rel)) * (1.0 - smoothstep(${d(w-.35)}, ${d(w+.06)}, abs(wp.x - BR_X0)));
        float fade = clamp(up * (0.5 + 0.5 * n_fbm3(wp * 2.2, 3)), 0.0, 1.0) * (1.0 - underF);
        col = mix(col, base * vec3(1.18, 1.45, 1.3), fade * 0.22);
        // rain streaks on vertical faces
        float vert = 1.0 - abs(wn.y);
        float streak = n_fbm3(vec3((wp.x + wp.z) * 4.0, wp.y * 0.4, pr * 7.0), 3);
        col *= 1.0 - vert * smoothstep(0.0, 0.5, streak) * 0.16;
        // grime (undersides / substructure)
        col = mix(col, col * vec3(0.36, 0.31, 0.30), clamp(dirt * (0.75 + 0.35 * big), 0.0, 1.0));
        // dark run-off stains below the capping band on the fascia faces + mottling
        float depthR = ARC_R - length(rel);
        float faceX = smoothstep(0.7, 0.95, abs(wn.x));
        float belowB = depthR - 0.12;
        float sN = n_fbm3(vec3(atan(rel.x, rel.y) * ARC_R * 2.6, depthR * 0.5, wp.x * 0.5 + pr), 3);
        float stain = faceX * step(0.0, belowB) * (1.0 - smoothstep(0.02, 0.5 + 0.25 * sN, belowB)) * smoothstep(-0.1, 0.45, sN);
        col *= 1.0 - mix(0.24, 0.38, kindR) * stain;
        float mott = n_fbm3(wp * vec3(1.1, 2.2, 1.1) + 17.0, 3);
        col *= mix(0.94, 0.9, kindR) + mix(0.12, 0.2, kindR) * mott;
        // damp near the water
        float damp = 1.0 - smoothstep(WATER_Y + 0.05, WATER_Y + 1.1, wp.y);
        col = mix(col, col * vec3(0.45, 0.45, 0.42), damp * 0.75);
        // worn lacquer revealing dark timber
        float wear = smoothstep(0.68, 0.84, n_fbm3(wp * 3.1 + pr * 9.0, 3) * 0.5 + 0.5);
        col = mix(col, vec3(0.075, 0.032, 0.018), wear * mix(0.28, 0.5, kindR));
        // chipped arrises: on the rounded edges (high normal curvature) the shu coat has flaked off to the
        // black undercoat and, in places, the grey timber; only resolved up close
        float curvL = length(fwidth(wn)) / max(pxL, 1e-5);
        float edgeN = n_fbm3(wp * 19.0 + pr * 4.0, 2) * 0.5 + 0.5;
        float edgeW = smoothstep(16.0, 42.0, curvL) * smoothstep(0.42, 0.66, edgeN) * (1.0 - smoothstep(0.0025, 0.007, pxL)) * kindR;
        col = mix(col, mix(vec3(0.028, 0.018, 0.014), vec3(0.16, 0.12, 0.09), smoothstep(0.62, 0.8, edgeN)), edgeW * 0.85);
        // hand-worn top rail: polished through to the black undercoat in long streaks along the rail
        float topRail = kindR * (1.0 - step(0.25, mode)) * (1.0 - step(0.02, dirt));
        float sAr = atan(rel.x, rel.y) * ARC_R;
        float handN = n_fbm3(vec3(sAr * 1.6, wp.x * 9.0, pr * 5.0), 3) * 0.5 + 0.5;
        float hand = topRail * smoothstep(0.45, 0.9, wn.y) * smoothstep(0.5, 0.72, handN + 0.18 * (1.0 - smoothstep(0.0, 4.0, abs(rel.x))));
        col = mix(col, mix(vec3(0.05, 0.022, 0.016), base * 0.55, 0.35), hand * 0.75);
        diffuseColor.rgb = diffuse * col;
        g_h = gl * 0.15 - lines * 0.18 + fine * 0.04 + wear * 0.3 - chk * 0.25 - edgeW * 0.4 - hand * 0.15;
        g_r = fade * 0.2 + dirt * 0.22 + wear * 0.3 + lines * 0.1 + chk * 0.2 - damp * 0.1 + kindR * 0.1 + edgeW * 0.25 - hand * 0.22;
      }
    `,fragRough:`roughnessFactor = clamp(roughnessFactor + g_r, 0.14, 1.0);`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.0022);
      { vec3 dn = fwidth(normal); roughnessFactor = max(roughnessFactor, clamp(length(dn) * 0.6, 0.0, 0.35)); }`,fragLight:_e+`reflectedLight.indirectDiffuse *= 1.45;`});ve.name=`bridgeLacquer`;let ye=0,be=.245,xe={uPlank:{value:new t.Vector2(0,.245)}},Se=i.std({color:16777215,roughness:.78,metalness:0,vertexColors:!0},{uniforms:xe,fragHead:ge+`uniform vec2 uPlank; float g_h; float g_r;`,fragColor:`
      {
        vec3 wp = vWPos; vec3 wn = normalize(vWNrm);
        float pr = vColor.r; float wk = vColor.g;
        vec2 rel = vec2(wp.z - ARC_ZC, wp.y - ARC_YC);
        float rr = length(rel);
        float s = atan(rel.x, rel.y) * ARC_R;
        vec3 radial = vec3(0.0, rel.y, rel.x) / rr;
        float topF = smoothstep(0.6, 0.95, dot(wn, radial));
        // plank-local coordinates: pid (index), lu (-0.5..0.5 across the plank), x along the plank
        float u0 = (s - uPlank.x) / uPlank.y;
        float pid = floor(u0); float lu = u0 - pid - 0.5;
        float pidH = pid + vColor.b * 57.0;
        float ph = n_hash11(pidH * 1.37 + 0.5), ph2 = n_hash11(pidH * 2.91 + 3.1), ph3 = n_hash11(pidH * 5.17 + 7.3);
        float lx = wp.x - BR_X0;
        // knot (some planks): grain flows around it
        vec2 kc = vec2((ph2 - 0.5) * 2.4, (ph3 - 0.5) * 0.5);
        vec2 kd = vec2((lx - kc.x) / 0.05, (lu - kc.y) * uPlank.y / 0.028);
        float kr = length(kd);
        float hasKnot = step(0.55, ph3);
        float knotWarp = hasKnot * 1.6 * exp(-kr * kr * 0.18) * sign(lu - kc.y + 1e-4);
        // straight growth rings along x with slow wander
        float wander = n_snoise(vec2(lx * 0.32, pidH * 3.1)) * 0.7 + n_snoise(vec2(lx * 1.4, pidH * 7.7)) * 0.18;
        float gc = lu * (5.0 + ph * 5.0) + wander * 1.4 + knotWarp + ph * 10.0 + 0.35 * n_snoise(vec2(lx * 0.7 + ph * 9.0, lu * 3.0));
        float ring = fract(gc);
        float late = smoothstep(0.5, 0.8, ring) * (1.0 - smoothstep(0.86, 0.99, ring));
        float pxD = length(fwidth(wp));
        float fine = n_fbm(vec2(lx * 1.2 + ph * 20.0, lu * 34.0 + ph * 50.0), 2) * (1.0 - smoothstep(0.002, 0.006, pxD));
        float fwG = fwidth(gc);
        late *= 1.0 - smoothstep(0.3, 0.8, fwG);
        float big = n_fbm3(wp * 0.7 + ph * 5.0, 3);
        vec3 warm = mix(vec3(0.185, 0.122, 0.078), vec3(0.130, 0.088, 0.058), ph2);
        vec3 silver = vec3(0.225, 0.208, 0.186);
        float grey = clamp(0.35 + 0.4 * ph + 0.25 * big + 0.2 * wk - 0.25 * hasKnot * 0.0, 0.0, 0.9);
        vec3 col = mix(warm, silver, grey);
        float ptone = n_hash11(pidH * 9.7 + 1.3);
        col *= 0.7 + 0.55 * ptone;
        // a few replaced boards (younger, warmer timber), lengthwise sun-bleaching, old water stains
        float repl = step(0.88, n_hash11(pidH * 6.1 + 2.0));
        col = mix(col, vec3(0.29, 0.18, 0.105) * (0.88 + 0.24 * ph), repl * 0.55);
        float bleach = smoothstep(0.1, 0.7, n_fbm(vec2(lx * 0.45 + ph * 7.0, lu * 2.5 + pidH * 0.37), 2));
        col = mix(col, col * vec3(1.18, 1.15, 1.12), 0.3 * bleach * (1.0 - repl));
        float wstain = smoothstep(0.58, 0.86, n_fbm3(wp * vec3(1.3, 1.0, 2.6) + 9.0, 3) * 0.5 + 0.5);
        col *= 1.0 - 0.28 * wstain;
        col = mix(col, col * vec3(1.12, 0.92, 0.8), smoothstep(0.75, 0.95, n_hash11(pidH * 4.3 + 8.0)) * 0.6);
        col *= 1.0 - 0.2 * late;
        col *= 1.0 - 0.07 * fine;
        // knots
        col = mix(col, col * vec3(0.35, 0.28, 0.24), hasKnot * (1.0 - smoothstep(0.6, 1.0, kr)));
        col *= 1.0 - hasKnot * 0.25 * (1.0 - smoothstep(1.0, 1.8, kr)) * smoothstep(0.6, 1.0, kr);
        // drying checks: thin dark cracks along the grain
        float ck = abs(n_snoise(vec2(lx * 0.9 + ph * 13.0, lu * 26.0)));
        float ckw = fwidth(ck);
        float chk = (1.0 - smoothstep(0.0, 0.035 + ckw * 1.5, ck)) * smoothstep(0.1, 0.5, n_snoise(vec2(lx * 0.6, pidH * 1.7)) + 0.3) * (1.0 - smoothstep(0.03, 0.12, ckw));
        col *= 1.0 - 0.6 * chk * topF;
        // weathering creeps in from the gaps: darker, rounded plank edges
        col *= 1.0 - 0.38 * smoothstep(0.38, 0.5, abs(lu)) * (0.6 + 0.4 * big);
        // dirt packed into the joints: a crisp dark line at each plank edge (keeps the board rhythm when blurred)
        float jl = smoothstep(0.455 - fwidth(lu) * 1.5, 0.5, abs(lu));
        col = mix(col, vec3(0.022, 0.018, 0.014), jl * 0.75 * topF);
        float rings = late;
        float g = gc;
        // worn walking line (lighter, smoother) in the middle
        float ax = abs(wp.x - BR_X0);
        float path = (1.0 - smoothstep(0.35, 1.05, ax)) * topF;
        col = mix(col, col * vec3(1.22, 1.15, 1.06), path * 0.55);
        // grime + moss toward the railings and in the gaps
        float edge = smoothstep(1.05, 1.5, ax);
        float mn = n_fbm3(wp * 5.0, 3) * 0.5 + 0.5;
        col = mix(col, col * 0.55, edge * 0.55);
        col = mix(col, vec3(0.045, 0.062, 0.02), edge * smoothstep(0.52, 0.78, mn) * 0.55 * topF);
        // plank edges / end grain darker
        col *= 1.0 - (1.0 - topF) * 0.45;
        col *= 1.0 - smoothstep(0.6, 0.9, abs(wn.x)) * 0.8;  // end grain at the butt joints: dark, dirty
        // nail heads: two rows per plank over each girder
        float dxn = mod(wp.x - BR_X0 + 0.41, 0.82) - 0.41;
        float dn = length(vec2(dxn, (abs(lu) - 0.27) * uPlank.y));
        float nailOk = (1.0 - step(1.25, ax)) * topF;
        float nail = (1.0 - smoothstep(0.0055, 0.0085, dn)) * nailOk * (1.0 - smoothstep(0.004, 0.01, pxD));
        float rust = (1.0 - smoothstep(0.008, 0.03, dn)) * nailOk;
        col = mix(col, col * vec3(0.55, 0.38, 0.28), rust * 0.6);
        col = mix(col, vec3(0.03, 0.026, 0.024), nail);
        diffuseColor.rgb = diffuse * col;
        g_h = -late * 0.12 + fine * 0.05 - nail * 0.4 - chk * 0.12 - hasKnot * (1.0 - smoothstep(0.6, 1.0, kr)) * 0.3;
        g_r = -path * 0.18 + edge * 0.1 - nail * 0.3 + late * 0.05;
      }
    `,fragRough:`roughnessFactor = clamp(roughnessFactor + g_r, 0.3, 1.0);`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.0025);`,fragLight:_e});Se.name=`bridgeDeck`;let Ce=i.std({color:16777215,roughness:.5,metalness:.15},{fragHead:`float g_h;`,fragColor:`
      {
        vec3 wp = vWPos;
        float n = n_fbm3(wp * vec3(2.0, 6.0, 2.0), 3);
        float sp = n_snoise3(wp * 60.0) * (1.0 - smoothstep(0.003, 0.009, length(fwidth(wp))));
        float sp2 = n_snoise3(wp * 23.0 + 7.0);
        vec3 col = vec3(0.034, 0.029, 0.026) * (0.75 + 0.5 * n);
        col = mix(col, vec3(0.16, 0.14, 0.11), smoothstep(0.55, 0.9, sp) * 0.5);
        col = mix(col, vec3(0.21, 0.155, 0.06), smoothstep(0.62, 0.95, sp2) * 0.4);
        col = mix(col, vec3(0.05, 0.075, 0.045), smoothstep(0.2, 0.8, n_fbm3(wp * 1.3 + 4.0, 3)) * 0.3);
        diffuseColor.rgb = col;
        g_h = n * 0.4 + sp * 0.15 + sp2 * 0.12;
      }
    `,fragRough:`roughnessFactor = clamp(0.55 + g_h * 0.3, 0.35, 0.95);`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.003);`});Ce.name=`bridgeDark`;let we=i.std({color:16777215,roughness:.18,metalness:1,vertexColors:!0},{fragHead:`float g_h; float g_r;`,fragColor:`
      {
        vec3 wp = vWPos;
        // g = matte (+2 when the sheet carries engraved karakusa)
        float engr = step(1.5, vColor.g);
        float bright = vColor.r, rAdd = vColor.g - 2.0 * engr, tsh = vColor.b;
        float n = n_fbm3(wp * 3.1, 3);
        float tarnish = smoothstep(0.15, 0.75, n_fbm3(wp * 1.1 + 7.0, 3) * 0.5 + 0.5);
        vec3 base = mix(vec3(1.0, 0.74, 0.36), vec3(1.0, 0.68, 0.30), tsh);
        vec3 col = base * (0.93 + 0.1 * n);
        col = mix(col, base * vec3(0.52, 0.40, 0.24), tarnish * (0.25 + 0.35 * max(rAdd, 0.0)));
        // punched ground: tiny dots
        float dots = n_snoise3(wp * 420.0) * (1.0 - smoothstep(0.0007, 0.002, length(fwidth(wp))));
        col *= bright * (1.0 - max(rAdd, 0.0) * 0.25 * smoothstep(0.2, 0.8, dots));
        g_h = n * 0.4 + tarnish * 0.25 + rAdd * dots * 0.15;
        g_r = tarnish * 0.12 + rAdd;
        if (engr > 0.5) {
          // engraved scrolls on the vertical faces of sleeves / bands: spirals linked by a running vine
          vec3 wnE = normalize(vWNrm);
          float sideE = 1.0 - smoothstep(0.55, 0.8, abs(wnE.y));
          vec2 tE = normalize(vec2(-wnE.z, wnE.x) + vec2(1e-5, 0.0));
          vec2 q = vec2(dot(wp.xz, tE), wp.y) / 0.03;
          vec2 cellE = floor(q); vec2 fE = fract(q) - 0.5;
          float flipE = mod(cellE.x + cellE.y, 2.0) * 2.0 - 1.0;
          float rE = length(fE); float aE = atan(fE.y, fE.x * flipE);
          float spl = abs(fract(aE / 6.2832 + rE * 2.4) - 0.5);
          float spiral = (1.0 - smoothstep(0.07, 0.13, spl)) * (1.0 - smoothstep(0.34, 0.42, rE)) * smoothstep(0.03, 0.07, rE);
          float vine = 1.0 - smoothstep(0.035, 0.075, abs(fE.y + 0.42 * flipE * cos(fE.x * 3.1416)));
          float aaE = 1.0 - smoothstep(0.18, 0.45, length(fwidth(q)));
          float groove = max(spiral, vine * 0.8) * sideE * aaE;
          col *= 1.0 - 0.5 * groove;
          g_h -= groove * 0.6;
          g_r += groove * 0.2;
        }
        diffuseColor.rgb = diffuse * col;
      }
    `,fragRough:`roughnessFactor = clamp(roughnessFactor + g_r, 0.06, 1.0);`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.0011);
      { vec3 dn = fwidth(normal); roughnessFactor = max(roughnessFactor, clamp(length(dn) * 0.9, 0.0, 0.42)); }`});we.name=`bridgeGold`;let V=e=>d(e),Te=i.std({color:16777215,roughness:.15,metalness:1,vertexColors:!0},{vertexHead:`varying vec2 vGib;`,vertexWorld:`vGib = uv;`,fragHead:`varying vec2 vGib; float g_h; float g_r;`,fragColor:`
      {
        vec3 wp = vWPos;
        float h = vGib.y;
        float petal = step(1.5, vColor.r);
        float bright = vColor.r - 2.0 * petal;
        float cav = vColor.g;
        float px = length(fwidth(wp));                         // pixel footprint (m)
        float n1 = n_fbm3(wp * 7.0 + 3.0, 3);
        float n2 = n_fbm3(wp * 1.7 + 11.0, 2);
        float aa3 = 1.0 - smoothstep(0.004, 0.012, px);
        float n3 = n_fbm3(wp * 23.0, 2) * aa3;
        vec3 gld = vec3(1.0, 0.745, 0.37);
        vec3 col = gld * (0.93 + 0.07 * n1 + 0.04 * n3);
        float cavW = smoothstep(0.55, 0.92, cav);
        float pol = 1.0 - smoothstep(0.2, 0.45, cav);           // raised, hand-polished arrises
        float tarn = clamp(smoothstep(-0.1, 0.7, n2) * 0.32 + cavW * 0.75 - pol * 0.3, 0.0, 1.0);
        col = mix(col, gld * vec3(0.44, 0.32, 0.19), tarn * 0.8);
        // verdigris blooms in the deepest recesses (copper-rich gilt bronze)
        float verd = cavW * smoothstep(0.05, 0.6, n1 + 0.3 * n3);
        col = mix(col, vec3(0.11, 0.25, 0.18), verd * 0.6);
        float gx = 0.0, grv = 0.0, matte = 0.0;
        if (petal < 0.5) {
          float ang = vGib.x;
          // band A: chased karakusa scroll (running vine with curls) on a punched ground
          float inA = smoothstep(${V(I.bandA[0])}, ${V(I.bandA[0]+.0012)}, h) * (1.0 - smoothstep(${V(I.bandA[1]-.0012)}, ${V(I.bandA[1])}, h));
          if (inA > 0.0) {
            vec2 q = vec2(ang * 40.0, (h - ${V((I.bandA[0]+I.bandA[1])/2)}) / 0.0122);
            float aaq = 1.0 - smoothstep(0.12, 0.35, length(fwidth(q)));
            float c = floor(q.x); vec2 f = vec2(fract(q.x) - 0.5, q.y);
            float fl = mod(c, 2.0) * 2.0 - 1.0;
            float vine = 1.0 - smoothstep(0.03, 0.09, abs(f.y - 0.36 * fl * cos(f.x * 3.14159)));
            vec2 sc = f - vec2(0.05 * fl, -0.2 * fl);
            float rS = length(sc); float aS = atan(sc.y, sc.x * fl);
            float spl = abs(fract(aS / 6.2832 + rS * 3.4) - 0.5);
            float spiral = (1.0 - smoothstep(0.08, 0.17, spl)) * (1.0 - smoothstep(0.25, 0.3, rS)) * smoothstep(0.02, 0.05, rS);
            grv = max(vine, spiral) * aaq * inA;
            matte = inA * (1.0 - grv);
          }
          // band B: ring-punched ground under the stud ring
          float inB = smoothstep(${V(I.bandB[0])}, ${V(I.bandB[0]+.001)}, h) * (1.0 - smoothstep(${V(I.bandB[1]-.001)}, ${V(I.bandB[1])}, h));
          matte = max(matte, inB);
          if (matte > 0.0) {
            vec2 qd = vec2(ang * 360.0, h / 0.00135);
            float aad = 1.0 - smoothstep(0.15, 0.4, length(fwidth(qd)));
            float rd = length(fract(qd) - 0.5);
            float ringd = (1.0 - smoothstep(0.06, 0.14, abs(rd - 0.3))) * aad * matte;
            gx -= ringd * 0.25;
            col *= 1.0 - 0.2 * ringd;
          }
          // bulb: incised rings at the girth and below the point; hammered raising marks
          float onB = step(${V(I.bulb0)}, h);
          float fwh = max(fwidth(h), 1e-6);
          float rings = 0.0;
          rings = max(rings, 1.0 - smoothstep(0.0004, 0.0004 + fwh * 1.5, abs(h - ${V(I.rings[0])})));
          rings = max(rings, 1.0 - smoothstep(0.0004, 0.0004 + fwh * 1.5, abs(h - ${V(I.rings[1])})));
          rings = max(rings, 1.0 - smoothstep(0.0004, 0.0004 + fwh * 1.5, abs(h - ${V(I.rings[2])})));
          grv = max(grv, rings * onB * (1.0 - smoothstep(0.0007, 0.002, fwh)));
          float aah = 1.0 - smoothstep(0.0015, 0.004, px);
          // shallow round planishing dimples (smooth-edged), barely breaking the reflection
          vec2 wo = n_worley3(wp * 110.0);
          float dim = 1.0 - smoothstep(0.0, 0.42, wo.x * wo.x);
          gx -= dim * dim * 0.035 * aah * onB;
        } else {
          // lotus petal: veins fanning along the petal, darker toward the root
          float v = vGib.x, u = vGib.y;
          float aav = 1.0 - smoothstep(0.12, 0.4, fwidth(v * 3.5));
          float veins = (1.0 - smoothstep(0.1, 0.22, abs(fract(v * 3.5 + 0.5) - 0.5))) * aav * (1.0 - u * 0.5) * (1.0 - smoothstep(0.75, 1.0, abs(v)));
          grv = max(grv, veins * 0.55);
        }
        col *= 1.0 - 0.45 * grv;
        col = mix(col, col * vec3(0.72, 0.6, 0.45), grv * 0.45);  // dirt held in the cuts
        diffuseColor.rgb = diffuse * col * bright;
        g_h = n1 * 0.12 - grv * 0.7 + gx;
        g_r = tarn * 0.15 + matte * 0.2 + grv * 0.16 + verd * 0.4 - pol * 0.04;
      }
    `,fragRough:`roughnessFactor = clamp(roughnessFactor + g_r, 0.07, 1.0);`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.0006);
      { vec3 dn = fwidth(normal); roughnessFactor = max(roughnessFactor, clamp(length(dn) * 0.9, 0.0, 0.42)); }`});Te.name=`bridgeGiboshi`;let Ee=new t.SphereGeometry(.0048,7,3,0,Math.PI*2,0,Math.PI/2);Ee.rotateX(Math.PI/2),Ee.scale(1,1,.75);let De=new s(.074,.022,.074,1,.004),Oe=new t.SphereGeometry(.0048,12,5,0,Math.PI*2,0,Math.PI/2);Oe.rotateX(Math.PI/2),Oe.scale(1,1,.75);let ke=i.PROC.granite(`0.45`,`vec3(0.62, 0.635, 0.66)`),Ae=i.std({color:16777215,roughness:.8,metalness:0,vertexColors:!0},{fragHead:ke.fragHead+ge+`float g_wet;`,fragColor:ke.fragColor+`
      {
        vec3 wpS = vWPos; vec3 wnS = normalize(vWNrm);
        // weathering patches, lichen rosettes, vertical run-off streaks
        float wpat = n_fbm3(wpS * 1.8 + 31.0, 3);
        diffuseColor.rgb *= 0.74 + 0.34 * smoothstep(-0.45, 0.5, wpat);
        vec2 wl = n_worley3(wpS * 7.0 + 5.0);
        float lichP = smoothstep(0.05, 0.45, n_fbm3(wpS * 1.3 + 2.0, 2));
        float lich = (1.0 - smoothstep(0.1, 0.24, wl.x)) * lichP;
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.40, 0.40, 0.33), lich * 0.55);
        float sideS = 1.0 - abs(wnS.y);
        float vs = n_fbm3(vec3((wpS.x + wpS.z) * 7.0, wpS.y * 0.7, 3.0), 3);
        diffuseColor.rgb *= 1.0 - sideS * smoothstep(0.0, 0.45, vs) * 0.28;
        // granular salt-and-pepper crystals + tooling pits (faded out when sub-pixel)
        float gq = n_snoise3(wpS * 170.0), gq2 = n_snoise3(wpS * 90.0 + 11.0);
        float aaG = 1.0 - smoothstep(0.12, 0.4, length(fwidth(wpS * 170.0)));
        diffuseColor.rgb *= 1.0 + aaG * (0.22 * smoothstep(0.35, 0.8, gq2) - 0.35 * smoothstep(0.45, 0.85, gq));
        float pxS = length(fwidth(wpS));
        float pits = smoothstep(0.55, 0.85, n_snoise3(wpS * 38.0 + 3.0)) * (1.0 - smoothstep(0.004, 0.012, pxS));
        g_h += aaG * (gq * 0.05 + gq2 * 0.04) - pits * 0.12 + n_fbm3(wpS * 14.0, 2) * 0.1;
        float h = vWPos.y - WATER_Y;
        float n1 = n_fbm3(vWPos * vec3(3.0, 1.2, 3.0), 3);
        float wet = 1.0 - smoothstep(0.02, 0.5 + 0.25 * n1, h);
        float band = smoothstep(-0.3, -0.04, h) * (1.0 - smoothstep(0.04, 0.2 + 0.12 * n1, h));
        float under = 1.0 - smoothstep(-0.35, -0.02, h);
        diffuseColor.rgb *= mix(vec3(1.0), vec3(0.52, 0.50, 0.45), wet * 0.85);
        vec3 algae = mix(vec3(0.030, 0.040, 0.014), vec3(0.06, 0.07, 0.025), n1 * 0.5 + 0.5);
        diffuseColor.rgb = mix(diffuseColor.rgb, algae, band * 0.88);
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.035, 0.045, 0.028), under * 0.75);
        // tide lines: thin dark rings left by past water levels on the vertical faces
        float fwh = fwidth(h);
        float tide = 0.0;
        tide += (1.0 - smoothstep(0.004, 0.012 + fwh, abs(h - 0.075 - 0.012 * n1))) * 0.55;
        tide += (1.0 - smoothstep(0.003, 0.01 + fwh, abs(h - 0.17 - 0.02 * n1))) * 0.35;
        tide += (1.0 - smoothstep(0.003, 0.009 + fwh, abs(h - 0.3 - 0.03 * n1))) * 0.2;
        tide *= sideS * (1.0 - smoothstep(0.006, 0.02, pxS));
        diffuseColor.rgb *= 1.0 - tide * 0.45;
        // moss: cushions on the upward faces (footing steps, ledges, coping, capitals) and creeping up the
        // damp lower courses; fine clumpy texture resolved only up close
        float upS = smoothstep(0.3, 0.85, wnS.y);
        float mN = n_fbm3(wpS * 2.6 + 13.0, 3) * 0.5 + 0.5;
        float aaM = 1.0 - smoothstep(0.003, 0.01, pxS);
        float mF = n_fbm3(wpS * 26.0 + 5.0, 2) * aaM;
        float nearWS = 1.0 - smoothstep(0.25, 2.2, h);
        float walk = smoothstep(-0.12, 0.02, vWPos.y) * (1.0 - smoothstep(${d(w+.2)}, ${d(w+.55)}, abs(vWPos.x - BR_X0)));
        float moss = upS * smoothstep(0.46, 0.66, mN + 0.22 * nearWS) * (1.0 - walk * 0.85)
                   + sideS * nearWS * smoothstep(0.58, 0.78, mN + 0.1 * mF) * 0.75 * (1.0 - under);
        moss = clamp(moss * (0.8 + 0.35 * mF), 0.0, 1.0);
        vec3 mossC = mix(vec3(0.045, 0.07, 0.018), vec3(0.12, 0.14, 0.035), smoothstep(0.3, 0.8, mN + 0.3 * mF));
        diffuseColor.rgb = mix(diffuseColor.rgb, mossC, moss * 0.88);
        g_h += moss * (0.25 + 0.35 * mF) - tide * 0.05;
        g_wet = max(wet, band) * (1.0 - moss * 0.6);
      }
    `,fragRough:ke.fragRough+`roughnessFactor = mix(roughnessFactor, 0.32, g_wet * 0.7);`,fragNormal:ke.fragNormal,fragLight:_e});Ae.name=`bridgeGranite`;let H=new a,je=.5;function U(e,n,r,i){let a=e.attributes.position.count,o=new Float32Array(a*3);for(let e=0;e<a;e++)o[e*3]=n,o[e*3+1]=r,o[e*3+2]=i;return e.setAttribute(`color`,new t.BufferAttribute(o,3)),e}let W=(e,t,n,r=null,i=0)=>H.add(U(e,t,n+2*i,c.next()),ve,r),G=(e,t=null,n=1,r=0)=>H.add(U(e,n*(.93+.1*c.next()),r,c.next()),we,t),K=(e,t=null)=>H.add(U(e,1,1,1),Ce,t),q=(e,t=null,n=1)=>{let r=n*(.72+.36*c.next()),i=c.next();return H.add(U(e,r*(1+.06*i),r*(.97+.03*i),r*(.9+.08*(1-i))),Ae,t)};function Me(e,t,n,r=3){let i=[],a=e/2-n,o=t/2-n,s=[[a,-o,-Math.PI/2],[a,o,0],[-a,o,Math.PI/2],[-a,-o,Math.PI]];for(let[e,t,a]of s)for(let o=0;o<=r;o++){let s=a+o/r*Math.PI/2;i.push([e+n*Math.cos(s),t+n*Math.sin(s),Math.cos(s),Math.sin(s)])}return i}function Ne(e,t,n=22){let r=[];for(let i=0;i<n;i++){let a=i/n*Math.PI*2,o=Math.cos(a)/e,s=Math.sin(a)/t,c=Math.hypot(o,s);r.push([e*Math.cos(a),t*Math.sin(a),o/c,s/c])}return r}function J(e,n,r=!0,i=!0){let a=e.length,o=n.length,s=[],c=[],l=[],u=new t.Vector3,d=t=>{let n=e[Math.max(t-1,0)],r=e[Math.min(t+1,a-1)];return u.subVectors(r,n).normalize(),[u.z,-u.y]};for(let t=0;t<a;t++){let[r,i]=d(t),a=e[t];for(let[e,t,o,l]of n)s.push(a.x+e,a.y+t*r,a.z+t*i),c.push(o,l*r,l*i)}for(let e=0;e<a-1;e++)for(let t=0;t<o;t++){let n=(t+1)%o,r=e*o+t,i=(e+1)*o+t,a=(e+1)*o+n,s=e*o+n;l.push(r,s,a,r,a,i)}let f=(t,r)=>{let[i,a]=d(t),u=e[t],f=-a,p=i,m=s.length/3,h=0,g=0;for(let e of n)h+=e[0],g+=e[1];h/=o,g/=o,s.push(u.x+h,u.y+g*i,u.z+g*a),c.push(0*r,f*r,p*r);for(let[e,t]of n)s.push(u.x+e,u.y+t*i,u.z+t*a),c.push(0*r,f*r,p*r);for(let e=0;e<o;e++){let t=(e+1)%o;r>0?l.push(m,m+1+e,m+1+t):l.push(m,m+1+t,m+1+e)}};r&&f(0,-1),i&&f(a-1,1);let p=new t.BufferGeometry;return p.setAttribute(`position`,new t.Float32BufferAttribute(s,3)),p.setAttribute(`normal`,new t.Float32BufferAttribute(c,3)),p.setIndex(l),p}function Y(e,t,n,r,i=.1){let a=k(t,e),o=k(n,e),s=Math.max(2,Math.ceil(Math.abs(o-a)*(b+e)/i)+1),c=[];for(let t=0;t<s;t++)c.push(A(a+(o-a)*t/(s-1),e,r));return c}let X=(e,t,n,r,i=2)=>new s(e,t,n,i,Math.min(r,Math.min(e,t,n)*.45)),Pe=(e,t,n)=>{let r=e*374761393+t*668265263+n*1274126177|0;return r=Math.imul(r^r>>>13,1274126177),((r^r>>>16)>>>0)/4294967296};function Fe(e,t,n){let r=Math.floor(e),i=Math.floor(t),a=Math.floor(n),o=e-r,s=t-i,c=n-a,l=o*o*(3-2*o),u=s*s*(3-2*s),d=c*c*(3-2*c),f=(e,t,n)=>e+(t-e)*n,p=(e,t,n)=>Pe(r+e,i+t,a+n);return f(f(f(p(0,0,0),p(1,0,0),l),f(p(0,1,0),p(1,1,0),l),u),f(f(p(0,0,1),p(1,0,1),l),f(p(0,1,1),p(1,1,1),l),u),d)}let Ie=(e,t,n)=>Fe(e,t,n)*.55+Fe(e*2.1+7,t*2.1,n*2.1)*.3+Fe(e*4.3,t*4.3+3,n*4.3)*.15;function Z(e,n,i,a=.035,o=.012,s=.09,c=0,d=0){let f=e/2,p=n/2,m=i/2;a=Math.min(a,f*.45,p*.45,m*.45);let h=e=>{let t=e-a,n=[-e,-e+a*.3,-t],r=e-.06,i=e-.1,o=i>.04&&r<t-.008,c=o?i:t;o&&n.push(-r,-i);let l=Math.max(1,Math.ceil(2*c/s));for(let e=1;e<l;e++)n.push(-c+2*c*e/l);return o&&n.push(i,r),n.push(t,e-a*.3,e),n},g=[h(f),h(p),h(m)],_=[f,p,m],v=[],y=[];for(let[e,t,n]of[[0,1,2],[1,2,0],[2,0,1]])for(let r of[1,-1]){let i=g[t],a=g[n],o=v.length/3;for(let o=0;o<a.length;o++)for(let s=0;s<i.length;s++){let c=[0,0,0];c[e]=r*_[e],c[t]=i[s],c[n]=a[o],v.push(c[0],c[1],c[2])}let s=i.length;for(let e=0;e<a.length-1;e++)for(let t=0;t<s-1;t++){let n=o+e*s+t,i=n+1,a=n+s,c=a+1;r>0?y.push(n,i,c,n,c,a):y.push(n,c,i,n,a,c)}}let b=[f-a,p-a,m-a];for(let e=0;e<v.length;e+=3){let t=[v[e],v[e+1],v[e+2]],n=[l(t[0],-b[0],b[0]),l(t[1],-b[1],b[1]),l(t[2],-b[2],b[2])],r=t[0]-n[0],i=t[1]-n[1],s=t[2]-n[2],f=Math.hypot(r,i,s)||1;r/=f,i/=f,s/=f;let p=[_[0]-Math.abs(t[0]),_[1]-Math.abs(t[1]),_[2]-Math.abs(t[2])].sort((e,t)=>e-t)[1],m=u(.035,.09,p),h=d*m,g=(Ie(t[0]*9+c,t[1]*9+c*.3,t[2]*9-c)-.5)*2*o,y=(Fe(t[0]*31+c,t[1]*31,t[2]*31-c)-.5)*o*.6,x=-o*2.2*(1-u(0,.05,p))*Math.max(0,Ie(t[0]*13-c,t[1]*13+c,t[2]*13)-.4)*2.5,S=(g+y)*(.35+.65*m)+h+x;v[e]=n[0]+r*(a+S),v[e+1]=n[1]+i*(a+S),v[e+2]=n[2]+s*(a+S)}let x=new t.BufferGeometry;return x.setAttribute(`position`,new t.Float32BufferAttribute(v,3)),x.setIndex(y),x=r.mergeVertices(x,1e-5),x.computeVertexNormals(),x}function Le(e,n=160){let r=new t.Shape;for(let t=0;t<n;t++){let[i,a]=e(t/n*Math.PI*2);t===0?r.moveTo(i,a):r.lineTo(i,a)}return r.closePath(),r}function Q(e,n,r,i=2){let a=new t.ExtrudeGeometry(e,{depth:Math.max(n-r*2,5e-4),bevelEnabled:!0,bevelThickness:r,bevelSize:r,bevelOffset:-r,bevelSegments:i,curveSegments:6,steps:1});return a.translate(0,0,r),a}function Re(e,n,r,i,a,o,s){let c=[],l=e,u=n,d=r,f=a/14;for(let e=0;e<14;e++)c.push(new t.Vector3(l,u,0)),d+=i*.05,l+=Math.cos(d)*f,u+=Math.sin(d)*f;let p=l+Math.cos(d+i*Math.PI/2)*s,m=u+Math.sin(d+i*Math.PI/2)*s,h=Math.atan2(u-m,l-p);for(let e=0;e<=34;e++){let n=e/34,r=h+i*n*o*Math.PI*2,a=s*Math.exp(-1.1*n*o);c.push(new t.Vector3(p+Math.cos(r)*a,m+Math.sin(r)*a,0))}return c}function ze(e){let n=[],r=.0055*e+.002,i=(e,n,r)=>{let i=new t.Shape;i.moveTo(r,0),i.bezierCurveTo(r+e*.1,n*1.15,r+e*.6,n*1.2,r+e*.76,n*.5),i.quadraticCurveTo(r+e*.84,n*.95,r+e*.94,n*.46),i.quadraticCurveTo(r+e*1.07,n*.24,r+e,0),i.quadraticCurveTo(r+e*1.07,-n*.24,r+e*.94,-n*.46),i.quadraticCurveTo(r+e*.84,-n*.95,r+e*.76,-n*.5),i.bezierCurveTo(r+e*.6,-n*1.2,r+e*.1,-n*1.15,r,0);let a=new t.Path,o=r+e*.47,s=n*.5,c=e*.2;return a.moveTo(o+c,0),a.bezierCurveTo(o+c*.4,s*.95,o-c*.5,s*1.05,o-c*.6,s*.4),a.quadraticCurveTo(o-c*.32,0,o-c*.6,-s*.4),a.bezierCurveTo(o-c*.5,-s*1.05,o+c*.4,-s*.95,o+c,0),i.holes.push(a),i};[[0,.25,.078],[Math.PI,.25,.078],[Math.PI/2,.15,.06],[-Math.PI/2,.15,.06]].forEach(([a,o,s],c)=>{let l=Q(i(o*e,s*e,.045*e),r+4e-4*(c+1),.0022,1);l.rotateZ(a),n.push([l,2.22]);let u=r+.0025,d=o/.25;for(let r of[-1,1]){let i=Re(.07*e,r*.012*e,r*.3,-r,.085*e*d,.8,.03*e*Math.sqrt(d)).map(e=>e.setZ(u)),o=new t.TubeGeometry(new t.CatmullRomCurve3(i),28,.005*e+.0012,5,!1);o.rotateZ(a),n.push([o,0])}let f=Q(Le(t=>{let n=(.02+.006*Math.cos(t*3))*e*Math.sqrt(d);return[n*Math.cos(t)*1.2,n*Math.sin(t)]},36),.006*e,.0025*e,2);f.translate((.045+o*.86)*e,0,r),f.rotateZ(a),n.push([f,0]);let p=new t.SphereGeometry(.008*e+.002,10,5,0,Math.PI*2,0,Math.PI/2);p.rotateX(Math.PI/2),p.translate((.045+o*1.01)*e+.004,0,r*.6),p.rotateZ(a),n.push([p,0])});for(let i=0;i<4;i++){let a=Math.PI/4+i*Math.PI/2,o=new t.Shape,s=.07*e,c=.15*e,l=.03*e;o.moveTo(s,0),o.bezierCurveTo(s+.02*e,l*1.4,c-.03*e,l*.9,c,0),o.bezierCurveTo(c-.03*e,-l*.9,s+.02*e,-l*1.4,s,0);let u=Q(o,r+.003,.002,2);u.rotateZ(a),n.push([u,.1])}let a=Q(Le(t=>[.088*e*Math.cos(t),.088*e*Math.sin(t)],48),r,.002,1);n.push([a,.03]);let o=Q(Le(t=>{let n=(.056+.016*Math.abs(Math.cos(t*8))**.55)*e;return[n*Math.cos(t),n*Math.sin(t)]},192),.01*e,.0045*e,3);o.translate(0,0,r-.001),n.push([o,-1]);let s=new t.TorusGeometry(.04*e,.0045*e,6,36);s.translate(0,0,r+.009*e),n.push([s,0]);let c=new t.SphereGeometry(.027*e,24,10,0,Math.PI*2,0,Math.PI/2);c.rotateX(Math.PI/2),c.scale(1,1,.85),c.translate(0,0,r+.006*e),n.push([c,0]);for(let i=0;i<20;i++){let a=i/20*Math.PI*2,o=new t.SphereGeometry(.0036*e+.001,8,4,0,Math.PI*2,0,Math.PI/2);o.rotateX(Math.PI/2),o.translate(Math.cos(a)*.08*e,Math.sin(a)*.08*e,r),n.push([o,0])}return n}function Be(e,n,r=.005){let i=Math.min(e,n)*.18,a=new t.Shape;a.moveTo(-e/2+i,-n/2),a.lineTo(e/2-i,-n/2),a.lineTo(e/2,-n/2+i),a.lineTo(e/2,n/2-i),a.lineTo(e/2-i,n/2),a.lineTo(-e/2+i,n/2),a.lineTo(-e/2,n/2-i),a.lineTo(-e/2,-n/2+i),a.closePath();let o=[[Q(a,r,.0015,1),.3]],s=new t.Shape,c=e*.62,l=n*.62,u=i*.6;s.moveTo(-c/2+u,-l/2),s.lineTo(c/2-u,-l/2),s.lineTo(c/2,-l/2+u),s.lineTo(c/2,l/2-u),s.lineTo(c/2-u,l/2),s.lineTo(-c/2+u,l/2),s.lineTo(-c/2,l/2-u),s.lineTo(-c/2,-l/2+u),s.closePath();let d=Q(s,r*.6,.0012,1);d.translate(0,0,r),o.push([d,0]);let f=new t.SphereGeometry(Math.min(e,n)*.13,16,8,0,Math.PI*2,0,Math.PI/2);return f.rotateX(Math.PI/2),f.scale(1,1,.7),f.translate(0,0,r*1.5),o.push([f,0]),o}function Ve(e,n){let r=[],i=Math.min(e,n)*.5,a=new s(e*.76,n*.76,.004,1,.0015);a.translate(0,0,.002),r.push([a,`dark`,0]);let o=Q(Le(e=>{let t=(.26+.07*Math.abs(Math.cos(e*8))**.55)*i;return[t*Math.cos(e),t*Math.sin(e)]},128),.009,.003,2);o.translate(0,0,.003),r.push([o,`gold`,.05]);let c=new t.TorusGeometry(.17*i,.022*i+.001,5,28);c.translate(0,0,.012),r.push([c,`gold`,0]);let l=new t.SphereGeometry(.11*i,16,6,0,Math.PI*2,0,Math.PI/2);l.rotateX(Math.PI/2),l.scale(1,1,.8),l.translate(0,0,.011),r.push([l,`gold`,0]);for(let a of[-1,1])for(let o of[-1,1]){let s=new t.SphereGeometry(.075*i,10,4,0,Math.PI*2,0,Math.PI/2);s.rotateX(Math.PI/2),s.scale(1,1,.7),s.translate(a*e*.44,o*n*.44,0),r.push([s,`gold`,0])}return r}function He(e,n,r=.004,i=!1){let a=new t.Shape,o=i?24:36;for(let t=0;t<o;t++){let r=t/o*Math.PI*2,i=Math.cos(r),s=Math.sin(r),c=1/(Math.abs(i)**1.6+Math.abs(s)**1.6)**(1/1.6)*(1+.08*Math.cos(r*6)),l=i*c*e/2,u=s*c*n/2;t===0?a.moveTo(l,u):a.lineTo(l,u)}a.closePath();let s=[[Q(a,r,.0015,1),.25]],c=new t.SphereGeometry(e*.16,i?10:14,i?4:7,0,Math.PI*2,0,Math.PI/2);if(c.rotateX(Math.PI/2),c.scale(1,1,.75),c.translate(0,0,r),s.push([c,0]),!i){let n=new t.TorusGeometry(e*.24,e*.025,5,20);n.translate(0,0,r+5e-4),s.push([n,0])}return s}function Ue(e,n,r=.0035){let i=new t.Shape;i.moveTo(-e/2,0),i.lineTo(e/2,0),i.bezierCurveTo(e/2,-n*.35,e*.18,-n*.55,0,-n),i.bezierCurveTo(-e*.18,-n*.55,-e/2,-n*.35,-e/2,0);let a=[[Q(i,r,.0012,1),.25]],o=new t.SphereGeometry(e*.11,12,6,0,Math.PI*2,0,Math.PI/2);return o.rotateX(Math.PI/2),o.translate(0,-n*.38,r),a.push([o,0]),a}function We(e){let t=[],n=(e,n)=>t.push([Math.max(e,1e-4),n]),r=(e,t,r,i)=>{for(let a=0;a<=i;a++){let o=a/i*Math.PI;n(e+r*Math.sin(o),t-r*Math.cos(o))}};n(1e-4,0),n(.06,0),n(.0655,.0012),n(.068,.0035),r(.068,.009,.0048,6),n(.0668,.015),n(.0638,.0185),n(.0624,.0222),n(.0634,.0258),n(.0668,.0288),n(.0738,.0305),n(.0766,.031),r(.0766,.0346,.0034,5),n(.0775,.0384),n(.0775,.0484),n(.0775,.0583),r(.0766,.0621,.0034,5),n(.0738,.066),n(.07,.0685),n(.0684,.0722),n(.0694,.0758),n(.0722,.0782),n(.0738,.0795),n(.0738,.0865),n(.0738,.0935),n(.0722,.0948),n(.069,.0962),n(.064,.0995),n(.0575,.1035),n(.0515,.1075),n(.0478,.1115),n(.0466,.1145),r(.0466,.1192,.0045,5),n(.0462,.125);let{bulb0:i,H:a,Rm:o,tEnd:s}=I;for(let t=1;t<=e;t++){let r=t/e*s,c;if(r<.3)c=.535+.465*Math.sin(r/.3*Math.PI/2)**.85;else{let e=(r-.3)/.7;c=(1-e)**1.55*(1+1.55*e)}n(o*c,i+a*r)}let c=i+a*s;return r(.0052,c+.0035,.0022,4),n(.004,c+.0095),n(.0026,c+.016),n(.0013,c+.023),n(1e-4,c+.03),t}let Ge=We(40),Ke=e=>{for(let t=1;t<Ge.length;t++)if(Ge[t][1]>=e){let[n,r]=Ge[t-1],[i,a]=Ge[t];return n+(i-n)*(e-r)/Math.max(a-r,1e-6)}return 0};function qe(e){let n=[],r=e?Ge:We(26),i=r.map(([e,t],n)=>{let i=0,a=0;for(let e=0;e<r.length;e++){let o=Math.abs(r[e][1]-t);if(e===n||o>.006)continue;let s=1-o/.006;i+=s*r[e][0],a+=s}return a?l(.5+(i/a-e)/.004,0,1):.5}),a=e?72:40,s=new t.LatheGeometry(r.map(([e,n])=>new t.Vector2(e,n)),a);{let e=r.length,n=s.attributes.uv,o=n.count,c=new Float32Array(o*3);for(let t=0;t<o;t++){let o=t%e;n.setXY(t,Math.floor(t/e)/a,r[o][1]),c[t*3]=1,c[t*3+1]=i[o],c[t*3+2]=0}s.setAttribute(`color`,new t.BufferAttribute(c,3))}n.push(s);let c=(e,n,r,i,a,o,s,c,u)=>{let d=[],f=[],p=[],m=[],h=t=>{let h=d.length/3;for(let m=0;m<=c;m++){let h=m/c,g=n+(r-n)*h,_=Math.sin(Math.PI*Math.max(h,0)**.72)**.6;for(let n=0;n<=u;n++){let r=n/u*2-1,c=e+r*Math.max(_,.04)*i,m=o*h**2.4*(1-.6*r*r),v=t?a*(1-r*r)*(1-.5*h)+.0011*(1-Math.abs(r))**8*(1-h*.7):0,y=Math.max(Ke(g),.0512)+s+m+v;d.push(y*Math.sin(c),g+m*.35,y*Math.cos(c)),f.push(r,h);let b=t?l(.5-.3*(1-Math.abs(r))**6+.45*(1-h)**3,0,1):.85;p.push(3,b,0)}}for(let e=0;e<c;e++)for(let n=0;n<u;n++){let r=h+e*(u+1)+n,i=r+1,a=r+u+1,o=a+1;t?m.push(r,i,o,r,o,a):m.push(r,o,i,r,a,o)}};h(!0),h(!1);let g=new t.BufferGeometry;g.setAttribute(`position`,new t.Float32BufferAttribute(d,3)),g.setAttribute(`uv`,new t.Float32BufferAttribute(f,2)),g.setAttribute(`color`,new t.Float32BufferAttribute(p,3)),g.setIndex(m),g.computeVertexNormals();let _=g.attributes.position,v=g.attributes.normal,y=Math.floor(c/2*(u+1)+u/2);if(_.getX(y)*v.getX(y)+_.getZ(y)*v.getZ(y)<0){let e=g.index.array;for(let t=0;t<e.length;t+=3){let n=e[t+1];e[t+1]=e[t+2],e[t+2]=n}g.computeVertexNormals()}return g},u=e?12:6,d=e?8:4;for(let e=0;e<8;e++)n.push(c((e+.5)*Math.PI/4,.1205,.1685,.25,.0016,.0035,3e-4,u,d)),n.push(c(e*Math.PI/4,.1195,.1645,.36,.0034,.0065,.0027,u,d));let f=e?28:20,p=new t.SphereGeometry(.0034,e?10:6,e?5:3,0,Math.PI*2,0,Math.PI/2);p.rotateX(Math.PI/2);{let e=p.attributes.position,n=new Float32Array(e.count*3);for(let t=0;t<e.count;t++)n[t*3]=1,n[t*3+1]=.75-.5*l(e.getZ(t)/.0034,0,1);p.setAttribute(`color`,new t.BufferAttribute(n,3))}for(let e=0;e<f;e++){let t=e/f*Math.PI*2,r=p.clone();r.applyMatrix4(o([.0738*Math.sin(t),.0865,.0738*Math.cos(t)],[0,t,0]));let i=r.attributes.uv;for(let e=0;e<i.count;e++)i.setXY(e,t/(Math.PI*2),.2);n.push(r)}return n}let Je=qe(!0),Ye=qe(!1);function Xe(e,t,n,r,i,a=!1){let s=r/ne;G(X(r+.012,.115*s,r+.012,.004),o([e,t-.0575*s,n]),.95,2.12),G(X(r+.026,.02*s,r+.026,.006,1),o([e,t-.112*s,n]),1,.04),G(X(r+.022,.014*s,r+.022,.005,1),o([e,t-.004*s,n]),1,.04),G(X(r+.034,.016*s,r+.034,.006,1),o([e,t+.008*s,n]),1,.04);let l=Ue(r*.62,.1*s);for(let i=0;i<4;i++){let a=i*Math.PI/2,c=r/2+5e-4,u=e+Math.sin(a)*c,d=n+Math.cos(a)*c;for(let[e,n]of l)G(e,o([u,t-.121*s,d],[0,a,0]),n?.88:1,n)}let u=He(r*.5,.075*s,.003,!0);for(let i=0;i<4;i++){let c=i*Math.PI/2,l=r/2+.0065;for(let[r,i]of u){let a=o([e+Math.sin(c)*l,t-.058*s,n+Math.cos(c)*l],[0,c,0]);i?K(r,a):G(r,a)}for(let i of[-.017,-.099])for(let l of[-.36,.36]){let u=o([e+Math.sin(c)*(r/2+.006)+Math.cos(c)*l*r,t+i*s,n+Math.cos(c)*(r/2+.006)-Math.sin(c)*l*r],[0,c,0]);G(a?Oe:Ee,u,1,0)}}let d=o([e,t+.016*s,n],[0,c.next()*6.28,0],i);for(let e of a?Je:Ye)H.add(e,Te,d)}{let e=2*T*b,t=Math.round(e/.245);be=e/t,ye=-e/2,xe.uPlank.value.set(ye,be);let n=j.u0*2+.01;for(let e=0;e<t;e++){let t=(ye+(e+.5)*be)/b,r=.008+c.next()*.006,i=be-r,a=.058+c.next()*.006,s=(c.next()-.5)*.005,l=A(t,-a/2+s,m+(c.next()-.5)*.01),u=n-c.next()*.02,d=t+(c.next()-.5)*.006,f=(c.next()-.5)*.004;if(c.next()<.72){let e=(c.next()-.5)*1.5,n=.0025+c.next()*.002,r=u/2+e-n/2,p=u/2-e-n/2;for(let[e,n,m]of[[r,-u/2+r/2,0],[p,u/2-p/2,1]]){let r=X(e,a,i,.009,2);U(r,c.next(),c.next(),m);let u=(c.next()-.5)*.004,p=A(t,-a/2+s+u,l.x+n);H.add(r,Se,o([p.x,p.y,p.z],[d+(c.next()-.5)*.003,0,f+(c.next()-.5)*.006]))}}else{let e=X(u,a,i,.009,2);U(e,c.next(),c.next(),.5),H.add(e,Se,o([l.x,l.y,l.z],[d,0,f]))}}}{let n=i.std({color:16777215,roughness:.62,metalness:0,vertexColors:!0,side:t.DoubleSide},{fragHead:`float g_h;`,fragColor:`
        {
          vec3 wp = vWPos;
          float n = n_fbm3(wp * 40.0, 2) * (1.0 - smoothstep(0.002, 0.006, length(fwidth(wp))));
          diffuseColor.rgb = diffuse * vColor.rgb * (0.85 + 0.25 * n);
          g_h = n;
        }
      `,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.0006);`});n.name=`bridgeLeaves`;let r=(e,n,r,i)=>{let a=i?10:28,o=[0,r*.6,0],s=[];for(let t=0;t<a;t++){let c=t/a*Math.PI*2,l;l=i?e*(.75+.25*Math.cos(c))*(1-.35*Math.max(Math.cos(c),0)**30):e*(.42+.58*Math.abs(Math.cos(c*n/2))**.45)*(c>Math.PI*.82&&c<Math.PI*1.18?.55:1),o.push(l*Math.cos(c),r*(l/e)**2*(.6+.4*Math.sin(c*2)),l*Math.sin(c)),s.push(0,1+(t+1)%a,1+t)}let c=new t.BufferGeometry;return c.setAttribute(`position`,new t.Float32BufferAttribute(o,3)),c.setIndex(s),c.computeVertexNormals(),c},a=e.rng(`bridgeLeaves`),s=[[.42,.045,.02],[.5,.12,.02],[.33,.06,.03],[.55,.26,.04],[.2,.09,.035],[.16,.11,.05]],c=2*T*b;for(let e=0;e<170;e++){let t=e%5==4,i=(a.next()-.5)*(c-.4)/b,l=a.next()<.68?1:-1,u=a.next()<.75?l*(w-.32-a.next()**2*.55):(a.next()-.5)*2.4,d=t?.011+a.next()*.004:.03+a.next()*.025,f=r(d,5+(a.next()<.5?2:0),(a.next()-.3)*d*.5,t);f.rotateY(a.next()*Math.PI*2);let p=t?[.78,.5,.52]:s[Math.floor(a.next()*s.length)],h=.8+a.next()*.35;U(f,p[0]*h,p[1]*h,p[2]*h);let g=A(i,.003+a.next()*.003,m+u);H.add(f,n,o([g.x,g.y,g.z],[i+(a.next()-.5)*.12,0,(a.next()-.5)*.12]))}}{let e=T+.035,n=[],r=[];for(let t=0;t<=260;t++){let r=A(-e+2*e*t/260,M);n.push(r)}for(let e=0;e<=260;e++){let i=n[e],a=he(i.z);r.push(new t.Vector3(i.x,i.y-a,i.z))}let i=new t.Shape;i.moveTo(n[0].z,n[0].y);for(let e=1;e<=260;e++)i.lineTo(n[e].z,n[e].y);for(let e=260;e>=0;e--)i.lineTo(r[e].z,r[e].y);i.closePath();let a=.22,s=.014,c=new t.ExtrudeGeometry(i,{depth:a-2*s,bevelEnabled:!0,bevelThickness:s,bevelSize:s,bevelOffset:-.014,bevelSegments:2,curveSegments:1,steps:1});c.translate(0,0,s);for(let e of[-1,1]){let t=m+e*w;W(c,0,.05,o(e>0?[t,0,0]:[t+a,0,0],[0,-Math.PI/2,0]))}let l=Me(j.u1-j.u0,j.v1-j.v0,.012,3);for(let e of[-1,1]){let t=e*(j.u0+j.u1)/2;K(J(Y((j.v0+j.v1)/2,E-.02,D+.02,m+t,.08),l))}}{let e=Me(.18,.74-.06,.02,2);for(let t of ie)W(J(Y(-.4,z-.6,B+.6,m+t,.15),e),0,.45);let t=Math.round((k(B)-k(z))*b/1.05),n=k(z)+.02,r=k(B)-.02;for(let e=0;e<=t;e++){let i=n+(r-n)*e/t,a=A(i,-.135);W(X(2*(w-.22)+.02,.15,.12,.012,1),1,.5,o([a.x,a.y,a.z],[i,0,0]))}}let Ze=[_-3.4,_+3.4];for(let t of Ze){let n=e=>O(e,M)-he(e),r=Math.max(n(t-.2),n(t+.2),O(t,ae)+.005,O(t-.2,ae),O(t+.2,ae)),i=.3,a=2*w+.84,s=r-i/2;W(X(a,i,.36,.025,2),1,.35,o([m,s,t]));for(let e of[-1,1]){let n=m+a/2*e;G(X(.07,.312,.372,.006),o([n-e*.03,s,t]),.9,2.06),G(X(.018,.326,.386,.006,1),o([n-e*.058,s,t]),1,.02);for(let[r,i,a]of Ve(.372,.312)){let c=o([n+e*.0045,s,t],[0,e*Math.PI/2,0]);i===`dark`?K(r,c):G(r,c,1,a)}}let c=.22,l=.78,u=r-i-c,d=S+.13;for(let n of[-1,1]){let r=m+n*1.62,i=e.rng(`pier`+t.toFixed(1)+n);q(Z(l,c,l,.03,.007,.1,t+n,.004),o([r,u+c/2,t],[0,(i.next()-.5)*.03,0]),.95);let a=u-d,s=[],f=0;for(;f<a-.2;){let e=.3+i.next()*.2;s.push(e),f+=e}let p=a/f,h=d;s.forEach((e,n)=>{let a=e*p,s=.58,c=.012,l=r+(i.next()-.5)*.025,u=t+(i.next()-.5)*.025,d=(i.next()-.5)*.025;if(!(i.next()<.55))q(Z(s+(i.next()-.5)*.03,a-c,s+(i.next()-.5)*.03,.018,.01,.08,i.next()*50,.012),o([l,h+a/2,u],[0,d,0]),.8+i.next()*.25);else{let e=.38+i.next()*.24,t=n%2==0,r=s*e,f=s*(1-e);for(let[e,n]of[[r,-.58/2+r/2],[f,s/2-f/2]]){let r=t?Z(e-c,a-c,s,.018,.01,.08,i.next()*50,.011):Z(s,a-c,e-c,.018,.01,.08,i.next()*50,.011);q(r,o([l+(t?n:0),h+a/2,u+(t?0:n)],[0,d,0]),.78+i.next()*.28)}}h+=a});{let e=d+(u-d)*.56;W(X(.05,.36,.075,.008,1),je,.6,o([r+n*.345,e+.02,t]))}let g=S-.22;q(Z(1.1,g-(C-.5),1.1,.05,.016,.14,t*2+n,.006),o([r,(g+C-.5)/2,t],[0,(i.next()-.5)*.06,0]),.85),q(Z(.84,d-g+.01,.84,.045,.012,.1,t*3+n,.006),o([r,(d+g)/2,t],[0,(i.next()-.5)*.05,0]),.88)}{let e=d+(u-d)*.56,n=4.16;W(X(n,.22,.13,.015,2),1,.45,o([m,e,t]));for(let r of[-1,1]){let i=m+r*n/2;G(X(.05,.232,.142,.005),o([i-r*.02,e,t]),.9,.06);for(let[n,a,s]of Ve(.142,.232)){let c=o([i+r*.0055,e,t],[0,r*Math.PI/2,0]);a===`dark`?K(n,c):G(n,c,1,s)}}}}function Qe(t,n,r){let i=n+r*1.9,a=t,s=Math.min(a,i),c=Math.max(a,i),l=m-2.45,u=m+2.45,d=C-.45,f=ue,h=f-.2-d,g=Math.max(3,Math.round(h/.4)),_=h/g,v=e.rng(`abut`+r),y=.55,b=(e,t,n,r,i)=>{for(let a=0;a<g;a++){let s=e+(a%2?.35:0)*0,c=!0,l=d+_*(a+.5);for(;s<t-.05;){let e=c&&a%2?.45+v.next()*.3:.75+v.next()*.55;c=!1,t-(s+e)<.35&&(e=t-s);let u=s+e/2,d=i===`x`?u:n+r*.35,f=i===`x`?n+r*.35:u,m=l+_/2,h=C;if(L&&L.floorY)try{h=L.floorY(d,f)}catch{}let g=R(d,f)||R(d+.4,f)||R(d-.4,f)||R(d,f+.4)||R(d,f-.4);if(m<h-.03||!g&&m<p-.25){s+=e;continue}let b=i===`x`?Z(e-.014,_-.014,y,.035,.014,.22,v.next()*100,.022):Z(y,_-.014,e-.014,.035,.014,.22,v.next()*100,.022),x=n-r*y/2,S=o(i===`x`?[u,l,x]:[x,l,u]);q(b,S,.95+v.next()*.1),s+=e}}};b(l,u,a,-r,`x`),b(s+(r>0?y:0),c-(r<0?y:0),u,1,`z`),b(s+(r>0?y:0),c-(r<0?y:0),l,-1,`z`);let x=Math.max(2,Math.round((c-s)/1));for(let e=0;e<x;e++){let t=s+(c-s)*e/x,n=s+(c-s)*(e+1)/x;q(Z(u-l+.08,.2,n-t-.012,.03,.006,.2,t*7),o([m,f-.1+.001,(t+n)/2]),1.06)}let S=Math.min(n,n+r*1.9),T=Math.max(n,n+r*1.9),E=ee-f;for(let e=0;e<2;e++){let t=S+(T-S)*e/2,n=S+(T-S)*(e+1)/2;q(Z(2*w+.9,E,n-t-.012,.03,.004,.2,t*13+5),o([m,f+E/2,(t+n)/2]),1.1)}}Qe(z,E,-1),Qe(B,D,1);let $e=2*T*b,et=Math.max(f.posts||9,Math.round($e/2.3)+1),tt=.24,nt=E-tt,rt=D+tt,$=[nt];for(let e=1;e<et-1;e++){let t=-T+2*T*e/(et-1);$.push(_+b*Math.sin(t))}$.push(rt);for(let e of[-1,1]){let n=m+e*te;W(J(Y((N.v0+N.v1)/2,nt,rt,n,.08),Me(N.w,N.v1-N.v0,.016,3)),0,.15,null,1),W(J(Y((P.v0+P.v1)/2,nt,rt,n,.08),Me(P.w,P.v1-P.v0,.012,3)),0,.05,null,1);{let e=Y(F.v,nt,rt,n,.06),r=(e,t)=>{let n=e.length,r=(t?e[0]:e[n-1]).clone(),i=t?e[1]:e[n-2],a=r.clone().sub(i).normalize(),o=[],s=Math.sign(a.z),c=Math.asin(l(-a.y,-1,1))+.1;for(let e=1;e<=9;e++){let t=e<=2?0:c/7,n=a.z,i=a.y,l=Math.cos(t),u=Math.sin(t);s>0?(a.z=n*l-i*u,a.y=n*u+i*l):(a.z=n*l+i*u,a.y=-n*u+i*l),r.addScaledVector(a,.034),o.push(r.clone())}return o},i=r(e,!0).reverse(),a=r(e,!1);W(J([...i,...e,...a],Ne(F.a,F.b,24)),0,0,null,1);let s=Ne(F.a+.006,F.b+.006,24),c=Ne(F.a+.011,F.b+.011,24),u=e=>{G(J(e.slice(-3),s,!0,!1),null,1,.08);let n=e[e.length-3],r=e[e.length-2];G(J([n,n.clone().lerp(r,.35)],c,!0,!0),null,1,.02);let i=e[e.length-1],a=i.clone().sub(e[e.length-2]).normalize(),o=new t.Vector3(1,0,0),l=new t.Vector3(0,-a.z,a.y),u=new t.SphereGeometry(1,24,10,0,Math.PI*2,0,Math.PI/2),d=new t.Matrix4().makeBasis(o,a,l).scale(new t.Vector3(F.a+.006,.022,F.b+.006)).setPosition(i);G(u,d,1,.02);let f=new t.SphereGeometry(.009,12,8);G(f,new t.Matrix4().makeTranslation(i.x+a.x*.02,i.y+a.y*.02,i.z+a.z*.02),1,0)};u(i.slice().reverse()),u(a);for(let e=0;e<$.length;e++){let t=$[e],r=e===0||e===$.length-1?re:ne;for(let i of[-1,1]){if(e===0&&i<0||e===$.length-1&&i>0)continue;let a=t+i*(r/2-.005),s=t+i*(r/2+.032);G(J(Y(F.v,Math.min(a,s),Math.max(a,s),n,.01),Ne(F.a+.006,F.b+.006,24)),null,1,2.08);let c=t+i*(r/2+.024),l=t+i*(r/2+.034);G(J(Y(F.v,Math.min(c,l),Math.max(c,l),n,.005),Ne(F.a+.0105,F.b+.0105,24)),null,1,.02);let u=k(t+i*(r/2+.013),F.v+F.b+.006),d=A(u,F.v+F.b+.005,n);G(Ee,o([d.x,d.y,d.z],[u-Math.PI/2,0,0]),1,0)}}}for(let t=0;t<$.length;t++){let r=$[t],i=t===0||t===$.length-1,a=i?re:ne,s=O(r,F.v)+(i?.27:.2),c=i?ee+.17:O(r,j.v0)+.01;W(X(a,s-c,a,.014,2),je,0,o([n,(s+c)/2,r]),1),Xe(n,s,r,a,i?1.32:1,e<0&&t>=3&&t<=5);let l=(O(r,P.v1)+O(r,F.v-F.b))/2,u=He(a*.62,.15,.004,!0);for(let e of[-1,1])for(let[t,i]of u)G(t,o([n+e*(a/2+5e-4),l,r],[0,e*Math.PI/2,0]),i?.88:1,i);let d=O(r,(P.v0+P.v1)/2);for(let e of[-1,1])for(let[t,i]of Be(a*.8,.17,.004))G(t,o([n+e*(a/2+5e-4),d,r],[0,e*Math.PI/2,0]),i?.85:1,i);if(i)q(Z(.42,.18,.42,.03,.004,.08,r+e),o([n,ee+.09,r]),1.1),G(X(a+.02,.09,a+.02,.006),o([n,c+.045,r]),1,2.05),G(X(a+.03,.016,a+.03,.006),o([n,c+.094,r]));else{let t=O(r,N.v1);G(X(a+.014,.04,a+.014,.005,1),o([n,t+.02,r]),.95,2.1),G(X(a+.022,.009,a+.022,.004,1),o([n,t+.043,r]),1,.02);let i=k(r,-.065),s=A(i,-.065,m+e*(j.u1+5e-4));for(let[t,n]of Be(.15,.1,.005))G(t,o([s.x,s.y,s.z],[0,e*Math.PI/2,e*i]),n?.85:1,n)}}for(let r=0;r<$.length-1;r++){let i=$[r],a=$[r+1],s=k(i),c=k(a),l=(c-s)*b,u=Math.max(1,Math.round(l/.6)-1);for(let r=1;r<=u;r++){let i=s+(c-s)*r/(u+1),a=_+b*Math.sin(i),l=O(a,N.v1)-.015,d=O(a,P.v0)+.015,f=O(a,P.v1)-.015,p=O(a,F.v-F.b*.5);W(X(.062,d-l,.062,.008,1),je,.05,o([n,(l+d)/2,a]),1),W(X(.062,p-f,.062,.008,1),je,0,o([n,(f+p)/2,a]),1);let h=O(a,(P.v0+P.v1)/2);for(let e of[-1,1]){let r=n+e*(P.w/2),i=new t.CylinderGeometry(.027,.028,.004,14);i.rotateZ(Math.PI/2),G(i,o([r+e*.002,h,a]));let s=new t.SphereGeometry(.017,10,5,0,Math.PI*2,0,Math.PI/2);s.rotateZ(-e*Math.PI/2),K(s,o([r+e*.004,h,a]))}let g=A(k(a,-.065),-.065,m+e*(j.u1+.001)),v=new t.SphereGeometry(.014,10,4,0,Math.PI*2,0,Math.PI/2);v.rotateZ(-e*Math.PI/2),v.scale(.7,1,1),G(v,o([g.x,g.y,g.z]));for(let[e,t]of[[l,d],[f,p]])G(De,o([n,e+.012,a]),.92,2.1),G(De,o([n,t-.012,a]),.92,2.1)}}for(let t=-T+.02;t<T-.02;t+=.22/b){let n=_+b*Math.sin(t);if(!$.some(e=>Math.abs(e-n)<.11))for(let n of[-.024,-.106]){let r=A(t,n,m+e*(j.u1+4e-4));K(Ee,o([r.x,r.y,r.z],[0,e*Math.PI/2,0]))}}}{let e=ze(1.22),t=ze(1.12),n=[[0,e],[.245,t],[-.245,t]];for(let e of[-1,1])for(let[t,r]of n){let n=_+b*Math.sin(t);if(n<z+.6||n>B-.6)continue;let i=O(n,M),a=he(n),s=i-Math.min(a,.95)*.5,c=m+e*(w+5e-4);for(let[i,a]of r){let r=o([c,s,n],[0,e*Math.PI/2,e*t]);a<0?K(i,r):G(i,r,a>.05?.78:1,a)}}}let it=H.build({name:`bridge`,castShadow:!0,receiveShadow:!0});it.name=`bridge`;{let e=[],t=0;for(let n of it.children){let r=n.geometry.attributes.position.count/3;t+=r,e.push(`${n.material.name}:${Math.round(r/1e3)}k`)}console.log(`[world] bridge stats: ${it.children.length} meshes, ${Math.round(t/1e3)}k tris (${e.join(` `)})`)}return{object:it,finalize:e=>at(e),showcase:[{cam:[3,.3,22.5],look:[10,1,17],focal:30},{cam:[11.15,3.4,22],look:[10.3,4.2,-16],focal:30},{cam:[-2,1.6,24],look:[10,1.2,15],focal:28},{cam:[2,2.2,30],look:[10,1.3,16],focal:30},{cam:[5.5,.1,19],look:[8.2,1.9,16],focal:40}]};function at(e){let r=null;try{r=new URLSearchParams(location.search)}catch{return}if(!r||!r.has(`bridgeDebug`)||e.modules.pond||e.modules.terrain)return;let i=e.scene.getObjectByName(`fallbackGround`);i&&(i.visible=!1);let a=n.pond&&n.pond.outline||[[0,7],[20,7],[20,33],[0,33]],o=new t.Shape([new t.Vector2(-300,300),new t.Vector2(300,300),new t.Vector2(300,-300),new t.Vector2(-300,-300)]),s=new t.Path;a.forEach(([e,t],n)=>n?s.lineTo(e,-t):s.moveTo(e,-t)),s.closePath(),o.holes.push(s);let c=new t.ShapeGeometry(o);c.rotateX(-Math.PI/2);let l=new t.Mesh(c,e.M.graniteMossy);l.receiveShadow=!0,e.scene.add(l);let u=new t.Shape;a.forEach(([e,t],n)=>n?u.lineTo(e,-t):u.moveTo(e,-t));let d=new t.ShapeGeometry(u);d.rotateX(-Math.PI/2);let f=new t.Mesh(d.clone().translate(0,S,0),new t.MeshPhysicalMaterial({color:new t.Color().setRGB(.006,.012,.011),roughness:.05,metalness:0}));f.receiveShadow=!0,e.scene.add(f);let p=new t.Mesh(d.clone().translate(0,C,0),new t.MeshStandardMaterial({color:new t.Color().setRGB(.05,.045,.03),roughness:1}));e.scene.add(p)}}export{e as build};