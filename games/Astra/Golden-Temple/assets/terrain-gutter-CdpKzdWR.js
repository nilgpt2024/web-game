import{r as e}from"./terrain-glsl-C7GlQnn1.js";import{t}from"./terrain-stonegeo-CjLAxKed.js";function n(e){let{CW:t,GW:n}=e.GUT,r=[];for(let i of e.gutterRings){let{cx:a,cz:o,X:s,Z:c,dir:l}=i,u=l>0?{in:[-s-t,s+t],bed:[-s-n+t,s+n-t],out:[-s-n,s+n]}:{in:[-s,s],bed:[-s+t,s-t],out:[-s+n-t,s-n+t]},d=l>0?{in:[-c,c],bed:[-c-t,c+t],out:[-c-n+t,c+n-t]}:{in:[-c+t,c-t],bed:[-c+n-t,c-n+t],out:[-c+n,c-n]},f=[{axis:`x`,c:a,face:o-c,sgn:-l,b:u},{axis:`x`,c:a,face:o+c,sgn:l,b:u},{axis:`z`,c:o,face:a-s,sgn:-l,b:d},{axis:`z`,c:o,face:a+s,sgn:l,b:d}];for(let a of f){let o=(e,t)=>a.axis===`x`?[a.c+e,a.face+a.sgn*t]:[a.face+a.sgn*t,a.c+e],s=Math.min(a.b.in[0],a.b.out[0]),c=Math.max(a.b.in[1],a.b.out[1]),l=[],u=null,d=.05;for(let t=s;t<=c+1e-6;t+=d){let r=!1;for(let i of[.04,n*.35,n*.65,n-.04]){let[n,a]=o(t,i);if(e.gutterBlocked(n,a)){r=!0;break}}if(!r&&u===null&&(u=t),(r||t+d>c+1e-6)&&u!==null){let e=r?t-d:c;e-u>.6&&l.push([u,e]),u=null}}r.push({...a,ring:i.name,at:o,free:l,CW:t,GW:n})}}return r}function r(e,r,i,a,o,s){let c=n(e),l=0,u=.1;for(let n of c){let c=n.axis===`x`?Math.PI/2:0;for(let[d,f,p]of[[`in`,0,n.CW],[`out`,n.GW-n.CW,n.GW]]){let[m,h]=n.b[d];for(let[g,_]of n.free){let v=Math.max(m,g),y=Math.min(h,_);if(y-v<.25)continue;let b=v;for(;b<y-.05;){let d=r.range(.85,1.55);y-(b+d)<.4&&(d=y-b);let m=r.range(.008,.016),h=b+m/2,g=b+d-m/2,[_,v]=n.at((h+g)/2,(f+p)/2),x=p-f-.012,S=t(x,g-h,.26,.022,i,1.3,a),C=e.heightAt(_,v)+u+r.range(-.007,.004),w=o(S,_,v,c+r.range(-.004,.004),C,4,.006,.05);s.push({x:_,z:v,w:x,d:g-h,yaw:c,kind:1,gutter:!0,m:w,side:0}),l++,b+=d}if(d===`in`){let[d,f]=n.b.bed;for(let[p,m]of[[g,1],[_,-1]]){if(p<=d+.01||p>=f-.01)continue;let h=p+m*n.CW/2,[g,_]=n.at(h,n.GW/2),v=o(t(n.GW-2*n.CW-.012,n.CW-.01,.26,.02,i,1.3,a),g,_,c+Math.PI/2,e.heightAt(g,_)+u+r.range(-.006,.003),4,.006,.05);s.push({x:g,z:_,w:n.GW-2*n.CW,d:n.CW,yaw:c,kind:1,gutter:!0,m:v,side:0}),l++}}}}}return l}function i(e,t){let{THREE:r}=e,i=n(t),o=[],s=[],c=[];for(let e of i){let[n,r]=e.b.bed;for(let[i,a]of e.free){let l=Math.max(n,i>n+.01?i+e.CW:i),u=Math.min(r,a<r-.01?a-e.CW:a);if(u-l<.1)continue;let d=Math.max(1,Math.ceil((u-l)/1.5)),f=o.length/3;for(let n=0;n<=d;n++){let r=l+(u-l)*(n/d);for(let[n,i]of[[e.CW-.01,0],[e.GW-e.CW+.01,1]]){let[a,c]=e.at(r,n);o.push(a,t.heightAt(a,c)+.032,c),s.push(i,Math.min(r-l,u-r),+(e.ring===`corOut`),0)}}for(let e=0;e<d;e++){let t=f+e*2,n=[o[t*3],o[t*3+2]],r=[o[(t+1)*3],o[(t+1)*3+2]],i=[o[(t+2)*3],o[(t+2)*3+2]];(r[0]-n[0])*(i[1]-n[1])-(r[1]-n[1])*(i[0]-n[0])<0?c.push(t,t+1,t+2,t+1,t+3,t+2):c.push(t,t+2,t+1,t+1,t+2,t+3)}}}let l=new r.BufferGeometry;l.setAttribute(`position`,new r.Float32BufferAttribute(o,3));let u=new Float32Array(o.length);for(let e=1;e<u.length;e+=3)u[e]=1;l.setAttribute(`normal`,new r.BufferAttribute(u,3)),l.setAttribute(`aBed`,new r.Float32BufferAttribute(s,4)),l.setIndex(c),l.computeBoundingSphere(),l.computeBoundingBox();let d={pine:0,maple:1,mapleRed:2,cherry:3},f=[];for(let e=0;e<20;e++){let n=t.trees[e];f.push(n?new r.Vector4(n.x,n.z,1.4+n.h*.42,d[n.type]??1):new r.Vector4(1e4,1e4,0,0))}let p=e.mat.std({color:16777215,roughness:.6,metalness:0},a(f,20));p.name=`gutterBed`;let m=new r.Mesh(l,p);return m.name=`gutterBed`,m.receiveShadow=!0,m.castShadow=!1,m}function a(t,n){return{uniforms:{uGTree:{value:t}},defines:{NGTREE:n},vertexHead:`attribute vec4 aBed; varying vec4 vBed;`,vertexWorld:`vBed = aBed;`,fragHead:`
      varying vec4 vBed;
      uniform vec4 uGTree[NGTREE];
      float gb_h; float gb_rough; float gb_ao;
      ${e}
    `,fragColor:`
    {
      vec2 p = vWPos.xz;
      vec2 fwp = fwidth(p);
      float fw = max(max(fwp.x, fwp.y), 1e-5);
      // river cobbles ~7 cm (Voronoi cells: rounded polygons), a second, sparser size class
      float sc = 14.5;
      vec2 cid; float f2;
      vec3 w = tg_worley(p * sc, cid, f2);
      float edge = (f2 - w.x);
      vec3 rnd = n_hash33(vec3(cid, 7.7));
      float fade = 1.0 - smoothstep(0.006, 0.03, fw);          // individual cobbles resolved
      float fade2 = 1.0 - smoothstep(0.002, 0.01, fw);          // micro detail resolved
      float body = smoothstep(0.02, 0.16, edge);
      // rounded cobble: height from the relative distance to the cell border
      float rr = 2.0 * w.x / max(w.x + f2, 1e-4);
      float dome = sqrt(max(1.0 - rr * rr, 0.0)) * (0.6 + 0.4 * rnd.y);
      // nachi-guro black stones mixed with dark grey and a few warm brown ones
      vec3 sc0 = vec3(0.050, 0.048, 0.046);
      vec3 sc1 = vec3(0.20, 0.195, 0.185);
      vec3 sc2 = vec3(0.21, 0.16, 0.11);
      vec3 cc = mix(sc0, sc1, smoothstep(0.25, 0.9, rnd.x));
      cc = mix(cc, sc2, step(0.9, rnd.z) * 0.8);
      cc *= 0.85 + 0.3 * rnd.y;
      // pale mineral rings / veins on some stones, fine grain
      float vein = smoothstep(0.82, 0.9, abs(sin(dot(p, normalize(rnd.yz - 0.5 + 1e-3)) * 90.0 + rnd.x * 20.0))) * step(0.75, rnd.y);
      cc = mix(cc, cc * 2.4, vein * 0.35 * fade2);
      cc *= 1.0 + 0.12 * n_snoise(p * 260.0) * fade2;
      // gaps: dark grit, decayed leaves
      vec3 gap = vec3(0.028, 0.024, 0.019);
      cc *= 0.72 + 0.4 * dome;
      vec3 near = mix(gap, cc, body);
      // far: average tone
      vec3 avg = mix(gap, mix(sc0, sc1, 0.35) * 1.05, 0.7);
      vec3 col = mix(avg, near, fade);
      // moss in the joints and silt on the shady (face) side, organic stain toward the curbs
      float across = vBed.x;
      float side = smoothstep(0.32, 0.0, across) + smoothstep(0.68, 1.0, across) * 0.6;
      float mn = n_fbm(p * 1.7 + 4.0, 3);
      float moss = smoothstep(0.1, 0.55, mn + 0.35 * side) * (1.0 - body * 0.85);
      vec3 mossC = mix(vec3(0.03, 0.06, 0.014), vec3(0.08, 0.12, 0.025), n_snoise(p * 11.0) * 0.5 + 0.5);
      col = mix(col, mossC, moss * mix(0.5, 1.0, fade) * 0.8);
      // fallen leaves and petals caught in the gutter under the hero trees
      float acc = 0.0; vec3 lcol = vec3(0.0);
      for (int i = 0; i < NGTREE; i++) {
        vec4 t = uGTree[i];
        float r = length(p - t.xy - vec2(0.85, -0.3) * t.z * 0.22);
        if (r > t.z * 1.8) continue;
        float dens = smoothstep(t.z * 1.75, t.z * 0.3, r);
        vec3 c = t.w < 0.5 ? vec3(0.16, 0.09, 0.045) : t.w < 1.5 ? vec3(0.30, 0.25, 0.07) : t.w < 2.5 ? vec3(0.42, 0.055, 0.022) : vec3(0.80, 0.58, 0.62);
        acc += dens; lcol += c * dens;
      }
      float lt = 0.0;
      if (acc > 0.003) {
        lcol /= acc;
        vec2 lid; float lf2;
        vec3 lw = tg_worley(p * 22.0 + 3.1, lid, lf2);
        vec3 lh = n_hash33(vec3(lid, 2.3));
        float sh = smoothstep(0.3, 0.2, lw.x) * step(lh.x, min(acc, 1.0) * 0.4);
        lt = mix(min(acc, 1.0) * 0.06, sh, fade);
        lcol *= mix(1.0, 0.7 + 0.6 * lh.z, fade);
        col = mix(col, lcol, lt);
      }
      // curb shade: the stones on either side shade the bed under the low sun
      float ao = mix(0.55, 1.0, smoothstep(0.0, 0.2, across)) * mix(0.62, 1.0, smoothstep(1.0, 0.8, across));
      ao *= mix(0.6, 1.0, smoothstep(0.0, 0.18, vBed.y));
      gb_ao = ao;
      diffuseColor.rgb = col;
      // relief (filtered): domes of the cobbles, gaps sunk
      gb_h = (dome * 0.03 + n_snoise(p * 90.0) * 0.0006 * fade2) * fade * (1.0 - lt * 0.7);
      // polished, damp stones: glossy tops, rough gaps and moss
      gb_rough = mix(0.82, mix(0.42, 0.28, rnd.z), body * fade);
      gb_rough = mix(gb_rough, 0.6, 1.0 - fade);
      gb_rough = mix(gb_rough, 0.95, max(moss * 0.8, lt));
    }
    `,fragRough:`roughnessFactor = gb_rough;`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, gb_h, 1.0);`,fragLight:`
      reflectedLight.directDiffuse *= mix(1.0, gb_ao, 0.35);
      reflectedLight.directSpecular *= mix(1.0, gb_ao, 0.35);
      reflectedLight.indirectDiffuse *= gb_ao;
      reflectedLight.indirectSpecular *= mix(0.5, 1.0, gb_ao);
    `}}export{r as n,n as r,i as t};