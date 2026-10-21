var e={min:null,max:null,probe:null};function t(e,t,n){let r={uBpMin:{value:new e.Vector3(...n.min)},uBpMax:{value:new e.Vector3(...n.max)},uBpProbe:{value:new e.Vector3(...n.probe)}},i=t.onBeforeCompile;t.onBeforeCompile=(e,t)=>{i(e,t),Object.assign(e.uniforms,r),e.fragmentShader=e.fragmentShader.replace(`#include <envmap_physical_pars_fragment>`,`
      uniform vec3 uBpMin; uniform vec3 uBpMax; uniform vec3 uBpProbe;
      #ifdef USE_ENVMAP
      vec3 getIBLIrradiance( const in vec3 normal ) {
        #ifdef ENVMAP_TYPE_CUBE_UV
          vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
          vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
          return PI * envMapColor.rgb * envMapIntensity;
        #else
          return vec3( 0.0 );
        #endif
      }
      vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
        #ifdef ENVMAP_TYPE_CUBE_UV
          vec3 reflectVec = reflect( - viewDir, normal );
          reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
          reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
          vec3 rd = reflectVec;
          vec3 t1 = (uBpMax - vWPos) / rd;
          vec3 t2 = (uBpMin - vWPos) / rd;
          vec3 tf = max(t1, t2);
          float t = min(min(tf.x, tf.y), tf.z);
          vec3 hit = vWPos + rd * max(t, 0.0);
          vec3 bp = normalize(hit - uBpProbe);
          reflectVec = normalize(mix(bp, reflectVec, smoothstep(0.35, 0.9, roughness)));
          vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
          return envMapColor.rgb * envMapIntensity;
        #else
          return vec3( 0.0 );
        #endif
      }
      #endif
    `)};let a=t.customProgramCacheKey;return t.customProgramCacheKey=()=>a()+`_bp`,t.needsUpdate=!0,t}var n=`
uniform float uStudio;
vec3 studioLight(vec3 nView, vec3 viewDir, float rough){
  vec3 rv = reflect(-viewDir, nView);
  vec3 Rw = normalize((vec4(rv, 0.0) * viewMatrix).xyz);
  vec3 K1 = normalize(vec3(-0.35, 0.5, 1.0)), K2 = normalize(vec3(0.45, 0.15, 1.0)), K3 = normalize(vec3(0.0, -0.45, 1.0));
  float w = mix(0.35, 0.85, clamp(rough, 0.1, 1.0));
  float l = smoothstep(1.0 - w, 1.0, dot(Rw, K1)) + smoothstep(1.0 - w * 0.8, 1.0, dot(Rw, K2)) * 0.45 + smoothstep(1.0 - w, 1.0, dot(Rw, K3)) * 0.35;
  return vec3(1.0, 0.8, 0.55) * l;
}
`,r=`reflectedLight.indirectSpecular += material.specularColor * studioLight(normal, geometryViewDir, roughnessFactor) * uStudio;`,i=`
{
  vec3 gnA = normalize(vWNrm);
  vec3 dxA = dFdx(gnA), dyA = dFdy(gnA);
  float varA = 0.25 * (dot(dxA, dxA) + dot(dyA, dyA));
  roughnessFactor = sqrt(clamp(roughnessFactor * roughnessFactor + min(2.0 * varA, 0.2), 0.0, 1.0));
}`;function a(e,t){return{...e,fragHead:(e.fragHead||``)+n,fragLight:(e.fragLight||``)+r,uniforms:{...e.uniforms||{},uStudio:{value:t}}}}function o(e){let{THREE:t,mat:r}=e,{std:o,phys:s,PROC:c}=r,l=(e,n,r)=>new t.Color().setRGB(e,n,r),u=e.L.hall.center[0],d={},f=[];d.statueGold=o({color:16777215,roughness:.3,metalness:1,vertexColors:!0},{fragHead:`uniform float uGrad; float g_sheen; float g_h; float g_skin; float g_hair; float g_ao; float g_line; float g_wear; float g_dust;
      // shippo-tsunagi (interlocking rings) + dot rosettes: kirikane cut-gold pattern, pattern units
      float sgShippo(vec2 p){
        vec2 c = floor(p); vec2 f = p - c;
        float d = 1e3;
        for (int j = 0; j < 2; j++) for (int i = 0; i < 2; i++) d = min(d, abs(length(f - vec2(float(i), float(j))) - 0.7071));
        d = min(d, max(0.0, length(f - 0.5) - 0.07));
        return d;
      }
      // anti-aliased line coverage of a distance field in pattern units, faded out when the
      // pattern gets close to pixel size (no shimmer at distance: it resolves to its mean)
      float sgLine(vec2 p, float w){
        float d = sgShippo(p);
        float fw = max(fwidth(p.x), fwidth(p.y));
        float aa = fw * 0.75 + 1e-4;
        float l = 1.0 - smoothstep(w - aa, w + aa, d);
        float fade = 1.0 - smoothstep(0.06, 0.2, fw);
        return mix(0.16, l, fade);
      }
      ${n}`,fragColor:`
      {
        vec3 vc = vColor.rgb;
        g_ao = vc.r; g_skin = vc.g; g_hair = vc.b;
        vec3 wp = vWPos; vec3 wn = normalize(vWNrm);
        float px = length(fwidth(wp));                       // world size of a pixel
        // gold leaf squares (triplanar, ~9 cm) with slight per-leaf tint; overlap seams AA'd
        vec3 tw = n_triw(wn);
        vec2 c1 = floor(wp.yz * 11.0), c2 = floor(wp.xz * 11.0), c3 = floor(wp.xy * 11.0);
        float lt = n_hash12(c1) * tw.x + n_hash12(c2 + 7.0) * tw.y + n_hash12(c3 + 13.0) * tw.z;
        vec2 f1 = abs(fract(wp.yz * 11.0) - 0.5), f2 = abs(fract(wp.xz * 11.0) - 0.5), f3 = abs(fract(wp.xy * 11.0) - 0.5);
        float sw = 0.006 + px * 11.0 * 0.8;
        float seam = smoothstep(0.5 - sw, 0.5, max(f1.x, f1.y)) * tw.x + smoothstep(0.5 - sw, 0.5, max(f2.x, f2.y)) * tw.y + smoothstep(0.5 - sw, 0.5, max(f3.x, f3.y)) * tw.z;
        seam = 0.0;  // leaf overlaps are burnished flat: only the per-leaf tint remains
        float nBig = n_fbm3(wp * 1.3 + 3.0, 3);
        // burnished vs. dulled patches of leaf: the sheen varies across the form
        g_sheen = smoothstep(-0.45, 0.55, n_fbm3(wp * 2.3 + 5.0, 3));
        float n = n_fbm3(wp * 5.0, 3);
        float nf = n_fbm3(wp * 23.0, 2) * (1.0 - smoothstep(0.002, 0.006, px));
        vec3 gold = vec3(1.0, 0.70, 0.32) * (1.0 + vec3(0.03, -0.01, -0.06) * nBig);
        vec3 col = gold * (0.94 + mix(0.05, 0.0, g_skin) * lt + 0.06 * n + 0.03 * nf);
        col *= 1.0 - 0.06 * seam;
        // robe leaf slightly deeper/redder than the polished skin
        col *= mix(vec3(0.9, 0.8, 0.66), vec3(1.04, 1.02, 1.0), g_skin);
        // kirikane on the robe: bright cut-gold rings on the deeper robe gold (triplanar)
        float robe = (1.0 - g_skin) * (1.0 - g_hair);
        vec3 twk = pow(tw, vec3(4.0)); twk /= (twk.x + twk.y + twk.z);
        float kp = 16.0; // rings per metre
        g_line = robe * (sgLine(wp.yz * kp, 0.035) * twk.x + sgLine(wp.xz * kp, 0.035) * twk.y + sgLine(wp.xy * kp, 0.035) * twk.z);
        g_line *= smoothstep(0.35, 0.7, g_ao);
        col = mix(col, vec3(1.0, 0.8, 0.42) * 1.06, g_line * 0.5);
        // cavities: old lacquer/brown grime showing through the leaf (strong, so folds read at distance)
        float cav = 1.0 - smoothstep(0.15, 0.85, g_ao);
        col = mix(col, vec3(0.2, 0.095, 0.032), cav * 0.7 * (1.0 - 0.78 * g_skin));
        // rubbed-through high points: the red bole under the leaf shows on exposed edges
        float wn2 = n_fbm3(wp * 17.0 + 11.0, 3) * 0.5 + 0.5;
        g_wear = smoothstep(0.9, 1.0, g_ao) * smoothstep(0.66, 0.8, wn2) * 0.32 * (1.0 - g_skin) * (1.0 - g_hair);
        col = mix(col, vec3(0.32, 0.085, 0.035), g_wear);
        // fine dust settled on up-facing surfaces and in the folds
        g_dust = smoothstep(0.35, 0.9, wn.y) * (0.45 + 0.55 * smoothstep(-0.2, 0.5, nBig)) * (1.0 - 0.6 * g_skin) * 0.22;
        col = mix(col, vec3(0.3, 0.24, 0.17), g_dust);
        col *= 1.0 + 0.08 * smoothstep(0.9, 1.0, g_ao) * (1.0 - g_wear);
        // hair: dark lapis-black lacquer with a little gold left in the grooves
        vec3 hairC = mix(vec3(0.045, 0.048, 0.07), vec3(0.2, 0.13, 0.05), cav * 0.6);
        col = mix(col, hairC, g_hair);
        diffuseColor.rgb = col;
        g_h = n * 0.6 + lt * 0.15 * (1.0 - g_skin) + nf * 0.25 + seam * 0.4 + g_line * 0.5 - g_wear * 0.6;
      }
    `,fragRough:`{
      roughnessFactor = clamp(mix(0.44, 0.25, g_skin) + (g_sheen - 0.5) * mix(0.14, 0.08, g_skin) + (1.0 - g_ao) * 0.3 + g_h * 0.05 + g_hair * -0.1 - g_line * 0.16 + g_wear * 0.35 + g_dust * 1.2, 0.08, 1.0);
      // specular anti-aliasing: widen the lobe where the geometric normal varies within a pixel
      vec3 gn = normalize(vWNrm);
      vec3 ddx = dFdx(gn), ddy = dFdy(gn);
      float var = 0.25 * (dot(ddx, ddx) + dot(ddy, ddy));
      float a2 = roughnessFactor * roughnessFactor;
      roughnessFactor = sqrt(clamp(a2 + min(2.0 * var, 0.2), 0.0, 1.0));
    }`,fragMetal:`metalnessFactor = mix(1.0, 0.35, g_hair) * (1.0 - 0.75 * g_wear) * (1.0 - g_dust);`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.0006);`,fragLight:`
      {
        float occ = mix(smoothstep(0.1, 0.8, g_ao), smoothstep(0.0, 0.5, g_ao), g_skin) * (1.0 - 0.7 * g_hair);
        reflectedLight.indirectSpecular += material.specularColor * studioLight(normal, geometryViewDir, roughnessFactor) * occ * uStudio;
        // a broad overhead glow (the gilt canopy and the lamp-lit ceiling): surfaces turned up
        // catch it, the under-sides of brows, nose and lips fall dark -> the forms read clearly
        vec3 rvG = reflect(-geometryViewDir, normal);
        vec3 RwG = normalize((vec4(rvG, 0.0) * viewMatrix).xyz);
        float gr = smoothstep(-0.35, 0.95, RwG.y);
        float side = 0.6 + 0.4 * smoothstep(-0.6, 0.6, RwG.x * -0.7 + RwG.z * 0.7);
        reflectedLight.indirectSpecular += material.specularColor * vec3(1.0, 0.8, 0.55) * (gr * gr * 0.55 * side) * occ * uGrad;
        // warm rim on the polished skin: a soft source behind the figure's left shoulder (viewer's
        // right) outlines the cheek, jaw and temple turned away from the side key
        float rimK = dot(RwG, normalize(vec3(0.62, 0.22, -0.75)));
        reflectedLight.indirectSpecular += material.specularColor * vec3(1.0, 0.72, 0.42) * smoothstep(0.5, 0.97, rimK) * 0.55 * g_skin * occ * uGrad;
        // soft low fill from the front right (the lamp-lit altar), so the cheek and the lowered
        // lid turned away from the key keep a warm glow instead of sinking into shadow
        float fillK = dot(RwG, normalize(vec3(0.55, 0.22, 0.8)));
        reflectedLight.indirectSpecular += material.specularColor * vec3(1.0, 0.76, 0.48) * smoothstep(0.5, 0.98, fillK) * 0.32 * g_skin * occ * uGrad;
      }
    `,uniforms:{uStudio:{value:.8},uGrad:{value:.75}}}),f.push(d.statueGold);let p=(e,t=0)=>{let n=c.gold(e);return{...n,fragRough:n.fragRough+i}};d.gold=o({color:16777215,roughness:.26,metalness:1},a(p(`vec3(1.0, 0.71, 0.33)`),.3)),d.goldBright=o({color:16777215,roughness:.17,metalness:1},a(p(`vec3(1.0, 0.77, 0.38)`),.3)),d.goldAntique=o({color:16777215,roughness:.36,metalness:1},a(p(`vec3(0.88, 0.58, 0.24)`),.25)),f.push(d.gold,d.goldBright,d.goldAntique),d.fanAntique=o({color:16777215,roughness:.4,metalness:1},a(p(`vec3(0.84, 0.54, 0.22)`),.06)),d.fanGold=o({color:16777215,roughness:.3,metalness:1},a(p(`vec3(0.97, 0.67, 0.3)`),.09)),f.push(d.fanAntique,d.fanGold),d.black=s({color:l(.016,.014,.012),roughness:.32,metalness:0,clearcoat:1,clearcoatRoughness:.1},{fragHead:`float g_h;`,fragColor:`{ float n = n_fbm3(vWPos * 2.0, 3); diffuseColor.rgb *= 0.85 + 0.3 * n; g_h = n; }`,fragRough:`roughnessFactor = clamp(roughnessFactor + g_h * 0.1, 0.05, 1.0);`}),d.redColumn=s({color:16777215,roughness:.4,metalness:0,clearcoat:.5,clearcoatRoughness:.22},c.lacquer(`vec3(0.19, 0.026, 0.013)`)),d.red=s({color:16777215,roughness:.45,metalness:0,clearcoat:.35,clearcoatRoughness:.3},c.lacquer(`vec3(0.25, 0.035, 0.016)`)),f.push(d.black,d.redColumn,d.red),d.woodFloor=s({color:16777215,roughness:.22,metalness:0,clearcoat:.9,clearcoatRoughness:.07},{fragHead:`float g_h;`,fragColor:`
      {
        vec3 wp = vWPos;
        // planks along X, 0.30 m wide, staggered butt joints
        float row = floor(wp.z / 0.30);
        float off = n_hash12(vec2(row, 3.0)) * 4.0;
        float pl = floor((wp.x + off) / 1.8);
        vec2 id = vec2(row, pl);
        float fz = fract(wp.z / 0.30), fx = fract((wp.x + off) / 1.8);
        float seam = max(1.0 - smoothstep(0.0, 0.012, fz) * smoothstep(1.0, 0.988, fz), 1.0 - smoothstep(0.0, 0.002, fx) * smoothstep(1.0, 0.998, fx));
        float g = n_fbm3(vec3(wp.x * 0.5, wp.z * 22.0, n_hash12(id) * 40.0), 4);
        float rings = sin(g * 14.0 + wp.z * 30.0) * 0.5 + 0.5;
        vec3 base = mix(vec3(0.085, 0.035, 0.016), vec3(0.15, 0.07, 0.032), n_hash12(id + 1.7));
        vec3 col = base * (0.75 + 0.4 * rings);
        col *= 1.0 - seam * 0.7;
        diffuseColor.rgb = col;
        g_h = rings * 0.4 - seam;
      }
    `,fragRough:`roughnessFactor = clamp(roughnessFactor + g_h * 0.05, 0.04, 1.0);`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.0015);`}),f.push(d.woodFloor),d.tatami=o({color:16777215,roughness:.78,metalness:0},{fragHead:`float g_h; float g_tg; float g_wear; varying vec2 vUvT;`,vertexHead:`varying vec2 vUvT;`,vertexWorld:`vUvT = uv;`,fragColor:`
      {
        vec2 uv = vUvT;               // metres: u along 1.82, v across 0.91 (centred); u carries +2.0*k (mat index)
        float hl = 0.91, hw = 0.455;
        float mk = floor((uv.x + 1.0) / 2.0);
        float mh = n_hash12(vec2(mk, 7.7)), mh2 = n_hash12(vec2(mk, 3.1));
        float border = smoothstep(hw - 0.032, hw - 0.029, abs(uv.y));
        // weave: rush strands run ACROSS the mat (along v), packed along u
        float aa = clamp(fwidth(uv.x) / 0.004, 0.0, 1.0);
        float strand = sin(uv.x * 6.2831 / 0.004) * (1.0 - aa);
        // per-strand colour variation (each ~4 mm strand slightly different)
        float sid = floor(uv.x / 0.004);
        float sv = n_hash12(vec2(sid, 1.3)) - 0.5;
        float bundle = n_vnoise(vec2(uv.x * 60.0, 0.5)) - 0.5;
        float warp = smoothstep(0.8, 1.0, sin(uv.y * 6.2831 / 0.028)) * (1.0 - clamp(fwidth(uv.y) / 0.014, 0.0, 1.0));
        float n = n_fbm(uv * vec2(1.5, 4.0) + vUvT.yx * 0.1, 3);
        // per-mat age: newer mats greener, old ones golden-brown; low-frequency sun fading
        vec3 aged = mix(vec3(0.36, 0.285, 0.13), vec3(0.44, 0.34, 0.15), mh);
        vec3 fresh = vec3(0.36, 0.33, 0.17);
        vec3 straw = mix(aged, fresh, smoothstep(0.7, 0.95, mh2) * 0.7);
        float mott = n_fbm(vWPos.xz * 0.9 + 3.0, 3);
        straw *= 0.82 + 0.3 * n + 0.18 * (mott - 0.5);
        straw *= 0.95 + 0.07 * strand + 0.12 * sv * (1.0 - aa * 0.7) + 0.16 * bundle;
        straw *= 1.0 - 0.14 * warp;
        // wear: darker, flattened and glossier along the walking line and the kneeling spot
        float walk = exp(-pow((vWPos.x - ${u.toFixed(3)}) / 0.7, 2.0)) * (0.6 + 0.4 * n_fbm(vWPos.xz * 3.0, 2));
        float wear = clamp(walk * 0.8 + 0.15 * smoothstep(0.55, 0.85, mott), 0.0, 1.0);
        straw = mix(straw, straw * vec3(0.78, 0.72, 0.62), wear);
        // heri: dark brocade with small gilt flower lozenges
        float hp = sin(uv.x * 6.2831 / 0.02) * sin(abs(uv.y) * 6.2831 / 0.01);
        vec2 hq = vec2(fract(uv.x / 0.055) - 0.5, (abs(uv.y) - (hw - 0.0155)) / 0.055);
        float lz = smoothstep(0.2, 0.14, abs(hq.x) + abs(hq.y) * 1.6);
        vec3 heri = mix(vec3(0.016, 0.012, 0.01) * (1.0 + 0.4 * hp), vec3(0.6, 0.4, 0.14), lz * 0.85);
        g_tg = border * lz;
        diffuseColor.rgb = mix(straw, heri, border);
        g_h = (strand * 0.5 + 0.5) * (1.0 - border) - warp * 0.6 + border * (0.6 + 0.3 * lz);
        g_wear = wear * (1.0 - border);
      }
    `,fragRough:`roughnessFactor = mix(0.5, 0.82, smoothstep(0.0, 1.0, g_h)) - g_wear * 0.18 - g_tg * 0.3;`,fragMetal:`metalnessFactor = g_tg * 0.9;`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.0008);`}),f.push(d.tatami),d.panel=s({color:16777215,roughness:.3,metalness:0,clearcoat:.7,clearcoatRoughness:.15,vertexColors:!0},a({vertexHead:`varying vec2 vPUv; varying vec3 vPInfo;`,vertexWorld:`vPUv = uv; vPInfo = color.rgb;`,fragHead:`
      varying vec2 vPUv; varying vec3 vPInfo; float g_m; float g_h; float g_gg = 0.0;
      float pSpiral(vec2 q, float k, float w){
        float r = length(q); float a = atan(q.y, q.x) / 6.2831853;
        float s = fract(r * k - a);
        return smoothstep(w, 0.0, abs(s - 0.5) - (0.5 - w * 2.0)) * smoothstep(0.5, 0.42, r) ;
      }
      float pLine(float d, float w){ return smoothstep(w, w * 0.4, abs(d)); }
      // Archimedean spiral arm (tendril curl) of pitch b, radius rmax
      float spiralArm(vec2 q, float b, float rmax, float w){
        float r = length(q); float th = atan(q.y, q.x);
        float n = floor((r / b - th) / 6.2831853 + 0.5);
        float d = abs(r - b * (th + 6.2831853 * n));
        return smoothstep(w, w * 0.45, d) * smoothstep(rmax, rmax * 0.85, r) * smoothstep(0.0, b * 0.6, r);
      }
      float leafM(vec2 q, float len, float wid, float ang){
        float c = cos(ang), s = sin(ang);
        q = vec2(c * q.x + s * q.y, -s * q.x + c * q.y);
        float t = clamp(q.x / len, 0.0, 1.0);
        float hw = wid * sin(3.14159 * pow(t, 0.7));
        return smoothstep(hw, hw * 0.6, abs(q.y)) * step(0.0, q.x) * step(q.x, len);
      }
      // floral medallions (cc: -1..1 roughly). kind 1: double peony, 2: hosoge (heart lobes)
      float medallion(vec2 cc, float kind){
        float rr = length(cc); float pa = atan(cc.y, cc.x);
        float m = 0.0;
        if (kind < 1.5) {
          float co = abs(cos(pa * 4.0)), si = abs(sin(pa * 4.0));
          float o = 0.6 + 0.18 * pow(co, 0.55);
          float i = 0.38 + 0.13 * pow(si, 0.55);
          m = smoothstep(o + 0.025, o - 0.025, rr);
          m *= 1.0 - smoothstep(0.035, 0.012, abs(rr - i));
          m *= 1.0 - 0.9 * smoothstep(0.09, 0.0, co) * step(i, rr);
          m *= 1.0 - 0.9 * smoothstep(0.12, 0.0, si) * step(0.2, rr) * step(rr, i);
          // veins on the outer lobes
          float vv = abs(fract(pa * 8.0 / 6.2831853) - 0.5);
          m *= 1.0 - 0.7 * smoothstep(0.025, 0.0, vv * rr) * step(i + 0.04, rr) * step(rr, o - 0.08);
          m *= 1.0 - smoothstep(0.03, 0.012, abs(rr - 0.2));
          vec2 dq = vec2(fract(pa * 10.0 / 6.2831853) - 0.5, (rr - 0.12) * 4.0);
          m = max(m, smoothstep(0.32, 0.2, length(dq)) * step(rr, 0.17));
          m = max(m, smoothstep(0.055, 0.035, rr));
        } else {
          float c3 = abs(cos(pa * 3.0));
          float o = 0.56 + 0.24 * pow(c3, 1.6) - 0.08 * pow(1.0 - abs(sin(pa * 6.0)), 6.0) * step(0.9, c3);
          m = smoothstep(o + 0.025, o - 0.025, rr);
          // curled lobe tips: inner spiral line in each lobe
          float la = (fract(pa * 3.0 / 6.2831853 + 0.5) - 0.5) * 2.0;
          m *= 1.0 - 0.85 * smoothstep(0.03, 0.0, abs(rr - (0.42 + 0.12 * la * la)) ) * step(0.3, rr);
          m *= 1.0 - 0.9 * smoothstep(0.1, 0.0, c3) * step(0.25, rr);
          // inner 12-petal rosette
          float ro = 0.27 + 0.05 * abs(cos(pa * 6.0));
          m = max(m * step(ro + 0.03, rr), smoothstep(ro + 0.02, ro - 0.02, rr) * (1.0 - smoothstep(0.03, 0.01, abs(rr - 0.14))));
          m = max(m, smoothstep(0.07, 0.05, rr));
        }
        // beaded outer ring
        float br = abs(rr - 0.9);
        float beads = smoothstep(0.5, 0.3, length(vec2(fract(pa * 28.0 / 6.2831853) - 0.5, br / 0.035)));
        return clamp(max(m, beads), 0.0, 1.0);
      }
      // karakusa: wavy vine with alternating curling tendrils + leaves, central medallion
      float karakusa(vec2 uv, vec2 hs, float med){
        float P = clamp(hs.y * 1.5, 0.12, 0.36);
        float rowH = P * 1.05;
        float rows = max(1.0, floor(hs.y * 2.0 / rowH + 0.25));
        float yy = uv.y + hs.y;
        float rowI = clamp(floor(yy / (hs.y * 2.0 / rows)), 0.0, rows - 1.0);
        vec2 p = vec2(uv.x + rowI * P * 0.25, yy - (rowI + 0.5) * (hs.y * 2.0 / rows));
        float A = P * 0.16;
        float w = P * 0.03;
        float yv = A * sin(6.2831853 * p.x / P);
        float slope = A * 6.2831853 / P * cos(6.2831853 * p.x / P);
        float m = smoothstep(w * 1.2, w * 0.5, abs(p.y - yv) / sqrt(1.0 + slope * slope));
        float k = floor(p.x / (P * 0.5));
        for (int j = -1; j <= 1; j++){
          float kk = k + float(j);
          float side = mod(kk, 2.0) * 2.0 - 1.0;
          vec2 c = vec2((kk + 0.5) * P * 0.5, side * A * 1.6);
          vec2 q = p - c; q.x *= side; q.y *= side;
          m = max(m, spiralArm(q, P * 0.038, P * 0.27, w * 0.85));
          vec2 lp = p - vec2((kk + 0.12) * P * 0.5, side * A * 0.7);
          m = max(m, leafM(vec2(lp.x, lp.y * side), P * 0.2, P * 0.055, 0.9));
          vec2 lp2 = p - vec2((kk + 0.82) * P * 0.5, -side * A * 0.2);
          m = max(m, leafM(vec2(lp2.x, -lp2.y * side), P * 0.16, P * 0.045, 0.6));
        }
        // central medallion (floral roundel) on larger panels
        if (med > 0.5 && hs.x > 0.2 && hs.y > 0.12) {
          vec2 cc = uv / (min(hs.y, hs.x) * 0.88);
          float rr = length(cc);
          m = m * smoothstep(0.93, 0.99, rr) + medallion(cc, med) * step(rr, 0.97);
        }
        return clamp(m, 0.0, 1.0);
      }
      float frameMask(vec2 uv, vec2 hs, float w){
        vec2 e = hs - abs(uv);
        float d = min(e.x, e.y);
        float f = smoothstep(w * 1.4, w * 1.2, d) * smoothstep(w * 0.2, w * 0.4, d);
        // corner brackets
        vec2 ce = hs - abs(uv);
        float corner = step(ce.x, w * 4.0) * step(ce.y, w * 4.0);
        return max(f, corner * 0.9);
      }
    `,fragColor:`
      {
        vec2 uv = vPUv; vec2 hs = max(vPInfo.rg, vec2(0.02));
        float id = floor(vPInfo.b * 10.0 + 0.5);
        float m = 0.0;
        float fw = clamp(min(hs.x, hs.y) * 0.06, 0.006, 0.03);
        if (id < 0.5) { m = karakusa(uv, hs, 1.0); }
        else if (id < 1.5) { // lotus / mon roundel only
          vec2 c = uv / max(min(hs.x, hs.y) * 0.85, 0.02); float rr = length(c); float pa = atan(c.y, c.x);
          float pet = 0.75 + 0.18 * cos(pa * 8.0);
          m = smoothstep(pet + 0.03, pet - 0.03, rr) * (1.0 - smoothstep(0.03, 0.0, abs(rr - 0.38) - 0.02)) + smoothstep(0.98, 0.95, rr) * smoothstep(0.86, 0.9, rr);
          m = clamp(m, 0.0, 1.0);
        } else if (id < 2.5) { // allover diaper (hanabishi lattice)
          vec2 g = uv / 0.09; vec2 q = fract(g) - 0.5;
          float dia = abs(q.x) + abs(q.y);
          m = smoothstep(0.08, 0.04, abs(dia - 0.38)) + smoothstep(0.14, 0.1, length(q));
          m = clamp(m, 0.0, 1.0);
        } else if (id < 3.5) { // sparse staggered mon (crests) on black
          vec2 g = uv / 0.34; g.x += 0.5 * mod(floor(g.y), 2.0);
          vec2 q = (fract(g) - 0.5) * 0.34; float rr = length(q); float pa = atan(q.y, q.x);
          float pet = 0.055 + 0.012 * cos(pa * 6.0);
          m = smoothstep(pet + 0.004, pet - 0.004, rr) * (1.0 - smoothstep(0.012, 0.006, abs(rr - 0.03))) + smoothstep(0.004, 0.0, abs(rr - 0.075));
          m = clamp(m, 0.0, 1.0);
        } else if (id < 4.5) { // gilt relief: karakusa + roundel raised from a punched (nanako) gold ground
          m = karakusa(uv, hs, 1.0); g_gg = 1.0;
        } else if (id < 5.5) { // gilt relief with a hosoge roundel
          m = karakusa(uv, hs, 2.0); g_gg = 1.0;
        } else if (id < 6.5) { // gilt relief, vine scroll only
          m = karakusa(uv, hs, 0.0); g_gg = 1.0;
        } else if (id < 7.5) { // openwork karakusa + hosoge on black
          m = karakusa(uv, hs, 2.0);
        } else { m = 1.0; }
        // distance filtering: fine carving averages out instead of sparkling as dotted lines
        float p_aa = clamp((fwidth(uv.x) + fwidth(uv.y)) / 0.03 - 0.25, 0.0, 1.0) * 0.75;
        m = max(m, frameMask(uv, hs, fw));
        float fine = n_fbm(uv * 60.0, 2);
        g_m = mix(smoothstep(0.35, 0.65, m), 0.3, p_aa);
        vec3 gold = vec3(1.0, 0.70, 0.31) * (0.9 + 0.12 * fine);
        // nanako punch dots on the gilt ground
        vec2 nq = fract(uv / 0.012) - 0.5;
        float nan = smoothstep(0.32, 0.2, length(nq)) * (1.0 - clamp((fwidth(uv.x) + fwidth(uv.y)) / 0.008, 0.0, 1.0));
        vec3 blk = mix(vec3(0.014, 0.012, 0.011), vec3(0.95, 0.62, 0.24) * (0.85 + 0.25 * fine) * (1.0 - 0.12 * nan), g_gg);
        diffuseColor.rgb = mix(blk, gold, g_m);
        // gilt relief: dark cut outlines around the raised ornament
        float outl = smoothstep(0.08, 0.3, m) * smoothstep(0.75, 0.45, m) * (1.0 - p_aa);
        diffuseColor.rgb *= 1.0 - g_gg * outl * 0.55;
        g_h = m * (1.0 - p_aa) + g_gg * nan * 0.06;
      }
    `,fragRough:`roughnessFactor = mix(mix(0.3, 0.4, g_gg), mix(0.22, 0.3, g_gg), g_m);`,fragMetal:`metalnessFactor = mix(g_m, mix(0.55, 0.78, g_m), g_gg);`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.0035);`},.6)),f.push(d.panel),d.ceilingPaint=o({color:16777215,roughness:.8,metalness:0,side:0},{uniforms:{uCell:{value:new t.Vector3(.9,.9,0)},uOrigin:{value:new t.Vector2(0,0)}},fragHead:`uniform vec3 uCell; uniform vec2 uOrigin; float g_h; float g_g;`,fragColor:`
      {
        vec2 p = (vWPos.xz - uOrigin) / uCell.xy;
        vec2 id = floor(p); vec2 q = (fract(p) - 0.5) * 2.0;   // -1..1 in the coffer
        float r = length(q); float a = atan(q.y, q.x);
        float h = n_hash12(id);
        vec3 bg = vec3(0.64, 0.58, 0.47);
        vec3 col = bg;
        // outer ring
        float ring = smoothstep(0.86, 0.84, r) * smoothstep(0.76, 0.78, r);
        float ring2 = smoothstep(0.92, 0.9, r) * smoothstep(0.88, 0.9, r);
        // 8 petals (red/orange gradient) + 8 small green leaves between
        float pet = 0.72 + 0.1 * cos(a * 8.0);
        float petal = smoothstep(pet + 0.02, pet - 0.02, r) * smoothstep(0.34, 0.36, r);
        float pr = r / pet;
        vec3 petCol = mix(vec3(0.4, 0.04, 0.025), vec3(0.66, 0.2, 0.08), smoothstep(0.4, 0.95, pr));
        if (h > 0.5) petCol = mix(vec3(0.035, 0.06, 0.09), vec3(0.12, 0.22, 0.26), smoothstep(0.4, 0.95, pr));
        float vein = smoothstep(0.03, 0.0, abs(fract(a * 8.0 / 6.2831853 + 0.5) - 0.5) * r);
        float inner = smoothstep(0.36, 0.34, r);
        vec3 innerCol = mix(vec3(0.05, 0.15, 0.09), vec3(0.95, 0.68, 0.28), smoothstep(0.16, 0.12, r));
        float dots = smoothstep(0.03, 0.02, length(fract(vec2(a * 16.0 / 6.2831853, 0.0)) - vec2(0.5, 0.0)) ) * smoothstep(0.27, 0.25, r) * smoothstep(0.21, 0.23, r);
        // corner leaves
        vec2 cq = abs(q) - vec2(0.82);
        float corner = smoothstep(0.2, 0.17, length(cq * mat2(0.7, -0.7, 0.7, 0.7) * vec2(1.0, 2.5)));
        col = mix(col, vec3(0.07, 0.22, 0.12), corner);
        col = mix(col, petCol, petal);
        col = mix(col, col * 0.4, vein * petal);
        col = mix(col, innerCol, inner);
        col = mix(col, vec3(0.9, 0.6, 0.22), dots);
        col = mix(col, vec3(0.02, 0.02, 0.02), ring);
        col = mix(col, vec3(0.75, 0.48, 0.15), ring2);
        // age: soot + dust
        float soot = n_fbm(vWPos.xz * 0.35, 3);
        col *= 0.6 + 0.18 * soot;
        diffuseColor.rgb = col;
        g_g = max(ring2, dots + smoothstep(0.16, 0.12, r) * inner);
        g_h = petal * 0.5 + inner * 0.3 + ring;
      }
    `,fragRough:`roughnessFactor = mix(0.8, 0.35, g_g);`,fragMetal:`metalnessFactor = g_g * 0.8;`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.0015);`}),f.push(d.ceilingPaint),d.silkRed=s({color:l(.42,.03,.02),roughness:.55,sheen:1,sheenColor:l(.9,.3,.2),sheenRoughness:.4},{fragHead:`float g_h;`,fragColor:`{ float s = sin(atan(vWNrm.z, vWNrm.x) * 60.0) * 0.5 + 0.5; g_h = s; diffuseColor.rgb *= 0.8 + 0.3 * s; }`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.0008);`}),d.silkGold=s({color:l(.65,.4,.12),roughness:.42,metalness:.3,sheen:1,sheenColor:l(1,.75,.35),sheenRoughness:.35},{fragHead:`float g_h;`,fragColor:`{ float s = sin(atan(vWNrm.z, vWNrm.x) * 60.0) * 0.5 + 0.5; g_h = s; diffuseColor.rgb *= 0.8 + 0.3 * s; }`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.0008);`}),d.brocade=s({color:16777215,roughness:.6,sheen:.35,sheenColor:l(.25,.18,.12),sheenRoughness:.5},{fragHead:`float g_m; float g_h;`,fragColor:`
      {
        vec3 an = abs(normalize(vWNrm));
        vec2 pp = an.y > 0.6 ? vWPos.xz : (an.x > an.z ? vWPos.zy : vWPos.xy);
        vec2 p = pp / 0.16;
        vec2 q = fract(p) - 0.5; vec2 id = floor(p);
        float rr = length(q); float a = atan(q.y, q.x);
        float mon = smoothstep(0.3 + 0.08 * cos(a * 6.0), 0.27 + 0.08 * cos(a * 6.0), rr) * smoothstep(0.08, 0.11, rr);
        mon = max(mon, smoothstep(0.06, 0.04, rr));
        float alt = mod(id.x + id.y, 2.0);
        mon *= alt;
        float tw = sin(pp.x * 900.0) * sin(pp.y * 900.0) * (1.0 - clamp(fwidth(pp.x) * 300.0, 0.0, 1.0));
        g_m = mon;
        diffuseColor.rgb = mix(vec3(0.02, 0.018, 0.022) * (1.0 + 0.3 * tw), vec3(0.75, 0.5, 0.16), mon);
        g_h = mon + tw * 0.1;
      }
    `,fragMetal:`metalnessFactor = g_m * 0.7;`,fragRough:`roughnessFactor = mix(0.7, 0.38, g_m);`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.001);`}),d.leaf=o({color:l(.05,.12,.03),roughness:.55,side:t.DoubleSide}),d.petalWhite=s({color:l(.86,.84,.78),roughness:.5,sheen:.6,sheenColor:l(1,1,1),side:t.DoubleSide}),d.petalPink=s({color:l(.85,.42,.52),roughness:.5,sheen:.6,sheenColor:l(1,.8,.85),side:t.DoubleSide}),d.fruit=s({color:l(.75,.22,.02),roughness:.45,clearcoat:.3,clearcoatRoughness:.4},{fragHead:`float g_h;`,fragColor:`{ g_h = n_snoise3(vWPos * 160.0); }`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.0006);`}),d.incense=o({color:l(.18,.1,.05),roughness:.9}),d.ember=e.mat.glow([1,.25,.05],12),f.push(d.silkRed,d.silkGold,d.brocade,d.leaf,d.petalWhite,d.petalPink,d.fruit),d.whiteWax=s({color:l(.82,.78,.68),roughness:.5,metalness:0,transmission:0,sheen:.3}),d.flame=o({color:0,emissive:l(1,.55,.18),emissiveIntensity:30,roughness:1,metalness:0}),d.flameCore=o({color:0,emissive:l(1,.85,.55),emissiveIntensity:60,roughness:1,metalness:0});let m={vertexWorld:`
      {
        float ph = dot(wPos4.xyz, vec3(13.1, 7.3, 11.7));
        float h = clamp((transformed.y + 0.022) / 0.068, 0.0, 1.0);
        wPos4.x += sin(uTime * 9.0 + ph) * 0.0025 * h * h;
        wPos4.z += cos(uTime * 7.3 + ph * 1.3) * 0.0025 * h * h;
        wPos4.y += sin(uTime * 13.0 + ph) * 0.002 * h;
      }
    `};e.mat.patch(d.flame,m),e.mat.patch(d.flameCore,m),d.paper=e.mat.glow([1,.6,.27],5.5),d.shoji=e.mat.glow([1,.74,.48],1.35,{side:t.DoubleSide}),f.push(d.whiteWax);for(let e of Object.keys(d))d[e]&&d[e].isMaterial&&(d[e].name=`i_`+e);return d.black.userData.envK=.45,d.panel.userData.envK=.7,d.woodFloor.userData.envK=.75,d.tatami.userData.envK=.55,d.redColumn.userData.envK=.8,d.red.userData.envK=.8,d.brocade.userData.envK=.7,d.envList=f,d}export{t as n,o as r,e as t};