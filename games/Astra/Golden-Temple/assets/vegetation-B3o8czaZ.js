import{n as e}from"./shots-DnNdaSh5.js";import{n as t,t as n}from"./vegetation-core-Jd2R76I6.js";import{T as r,_ as i,a,b as o,c as s,d as c,g as l,h as u,l as d,o as f,t as p,u as m,v as h,w as g,y as _}from"./vegetation-tree-Tto52i9J.js";import{n as v,r as y,t as b}from"./vegetation-hero-BEYS4AG_.js";import{a as x,c as S,i as C,n as w,o as T,r as E,s as D}from"./vegetation-tex-DPszFVSO.js";var O=Math.PI*2,k=`
vec3 vegWind(vec3 wp, float flex){
  float t = uTime;
  vec2 wd = uWindDir;
  float gust = 0.55 + 0.45 * sin(t * 0.37 + dot(wp.xz, wd) * 0.05) * sin(t * 0.23 + wp.x * 0.02);
  float sway = sin(t * 1.1 + dot(wp.xz, vec2(0.13, 0.11))) * 0.6 + sin(t * 1.7 + wp.y * 0.4 + wp.x * 0.3) * 0.3;
  float flutter = sin(t * 3.1 + dot(wp, vec3(2.1, 1.7, 2.9))) * 0.25 + sin(t * 4.7 + dot(wp, vec3(3.7, 2.3, 1.9))) * 0.12;
  vec3 o;
  o.xz = wd * (sway * 0.05 + gust * 0.045) * flex;
  o.y = flutter * 0.01 * flex;
  o.xz += vec2(flutter * 0.008, -flutter * 0.006) * flex;
  return o * uWindStrength;
}
`,ee=`
attribute vec4 aSeed; attribute vec4 aSeed2;
uniform vec4 uDC[10]; uniform vec4 uDS[10]; uniform vec4 uDW[10]; uniform vec3 uDA[10]; uniform vec3 uDB[10];
mat3 d_rot(vec3 a, float g){
  float c = cos(g), s = sin(g), t = 1.0 - c;
  return mat3(t*a.x*a.x + c, t*a.x*a.y + s*a.z, t*a.x*a.z - s*a.y,
              t*a.x*a.y - s*a.z, t*a.y*a.y + c, t*a.y*a.z + s*a.x,
              t*a.x*a.z + s*a.y, t*a.y*a.z - s*a.x, t*a.z*a.z + c);
}
`,te=`
{
  int sh = int(floor(uShot + 0.5));
  vec4 C = vec4(0.0), Sz = vec4(1.0), W = vec4(0.0);
  vec3 cA = vec3(0.3, 0.02, 0.01), cB = cA;
  for (int k = 0; k < 10; k++) if (k == sh) { C = uDC[k]; Sz = uDS[k]; W = uDW[k]; cA = uDA[k]; cB = uDB[k]; }
  if (C.w < 0.5 || float(gl_InstanceID) >= W.w) {
    wPos4 = vec4(0.0, -500.0, 0.0, 1.0);
  } else {
    float t = uTime;
    vec4 sd = aSeed, s2 = aSeed2;
    float vy = W.y * (0.75 + 0.5 * s2.w);
    vec3 p;
    p.y = C.y + Sz.y * (0.5 - fract(sd.y + t * vy / Sz.y));
    p.x = C.x + Sz.x * (fract(sd.x + t * W.x / Sz.x) - 0.5);
    p.z = C.z + Sz.z * (fract(sd.z + t * W.z / Sz.z) - 0.5);
    float w1 = 0.7 + 0.7 * s2.x;
    float amp = 0.1 + 0.14 * s2.y;
    p.x += amp * sin(t * w1 + s2.y * 6.2831);
    p.z += amp * cos(t * w1 * 0.87 + s2.y * 6.2831);
    vec3 q = abs(p - C.xyz) / (Sz.xyz * 0.5);
    float fade = (1.0 - smoothstep(0.72, 1.0, q.x)) * (1.0 - smoothstep(0.72, 1.0, q.y)) * (1.0 - smoothstep(0.72, 1.0, q.z));
    vec3 ax = normalize(vec3(s2.z - 0.5, 0.6, s2.x - 0.5) + vec3(sin(t * 0.5 + sd.w * 6.0), 0.0, cos(t * 0.4 + sd.w * 5.0)) * 0.4);
    float ang = t * (0.8 + 1.1 * sd.w) * (s2.z > 0.5 ? 1.0 : -1.0) + s2.w * 6.2831;
    float sc = Sz.w * (0.8 + 0.4 * sd.w) * fade;
    wPos4.xyz = p + d_rot(ax, ang) * ((transformed - vec3(0.0, 0.5, 0.0)) * sc);
    #if defined( USE_INSTANCING_COLOR ) || defined( USE_COLOR )
      vColor.rgb = mix(cA, cB, s2.x);
    #endif
  }
}
`,A=`
varying vec4 vBarkA;   // x: around (cells, periodic k), y: along (m), z: radius, w: flex
varying vec3 vBarkB;   // x: k cells around, y: seed, z: cell width (m)
float g_h; float g_r;
// pixel footprint (m) and cell-resolve factor: sub-pixel bark cells / cracks / grain fade to their
// mean (no shimmer at distance, full relief up close)
float g_fp; float g_aa;
float b_aaf(float f){ return 1.0 - smoothstep(0.18, 0.55, g_fp * f); }
vec3 b_worleyP(vec2 p, float per, float seed){
  vec2 i = floor(p), f = fract(p); float d1 = 8.0, d2 = 8.0; float id = 0.0;
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++){
    vec2 g = vec2(float(x), float(y));
    vec2 c = i + g; c.x = mod(c.x, per);
    vec2 o = n_hash22(c + seed * 0.137);
    vec2 r = g + o - f; float d = dot(r, r);
    if (d < d1){ d2 = d1; d1 = d; id = n_hash12(c * 1.7 + seed); } else if (d < d2){ d2 = d; }
  }
  return vec3(sqrt(d1), sqrt(d2), id);
}
float b_moss(vec3 wp, vec3 wn){
  float up = smoothstep(0.2, 0.85, wn.y);
  float base = 1.0 - smoothstep(0.1, 1.1, wp.y);
  float n = n_fbm3(wp * 2.3 + 4.0, 3) * 0.5 + 0.5;
  return clamp(smoothstep(0.5, 0.75, n) * (up * 0.75 + base * 0.9), 0.0, 1.0);
}
`,j={pine:`
  {
    float k = vBarkB.x, cw = vBarkB.z, r = vBarkA.z;
    vec3 wp = vWPos;
    g_fp = length(fwidth(wp)); g_aa = 1.0 - smoothstep(0.12, 0.45, g_fp / max(cw, 1e-4));
    // tall irregular plates: stretched along the stem + domain warp breaks the cell regularity
    vec2 p = vec2(vBarkA.x, vBarkA.y / (cw * 2.4));
    p += vec2(n_snoise3(wp * 2.3) * 0.32, n_snoise3(wp * 2.3 + 7.1) * 0.45);
    vec3 w = b_worleyP(p, k, vBarkB.y);
    float edge = w.y - w.x;
    float cvar = n_snoise3(wp * 5.0 + 3.0) * 0.5 + 0.5;
    float crack = (1.0 - smoothstep(0.02 + 0.05 * cvar, 0.16 + 0.14 * cvar, edge)) * g_aa;
    // flaky sub-layers inside each plate (smaller, offset cells)
    vec3 w2 = b_worleyP(p * vec2(1.0, 2.2) * 2.0 + w.z * 3.0, k * 2.0, vBarkB.y + 11.0);
    float sub = mix(0.7, smoothstep(0.0, 0.25, w2.y - w2.x), g_aa * g_aa);
    float fine = mix(0.5, n_snoise3(wp * 41.0) * 0.5 + 0.5, b_aaf(41.0));
    float flake = n_fbm3(wp * 7.0, 3) * 0.5 + 0.5;
    float thick = smoothstep(0.035, 0.13, r);
    vec3 plateCol = mix(vec3(0.062, 0.057, 0.053), vec3(0.15, 0.135, 0.12), w.z * 0.7 + cvar * 0.3);
    // freshly shed patches: warm red-brown under the grey outer layer
    float shed = smoothstep(0.55, 0.8, flake + w2.z * 0.25 - sub * 0.15);
    plateCol = mix(plateCol, vec3(0.26, 0.12, 0.065), shed * 0.6);
    plateCol *= 0.8 + 0.25 * sub;
    vec3 youngCol = vec3(0.12, 0.075, 0.05) * (0.75 + 0.5 * flake);
    vec3 col = mix(youngCol, plateCol, thick);
    col *= 0.85 + 0.3 * fine;
    col = mix(col, vec3(0.012, 0.01, 0.009), crack * thick);
    // weathered lichen flecks on the plates
    float lich = smoothstep(0.66, 0.82, n_fbm3(wp * 3.7 + 9.0, 3) * 0.5 + 0.5) * (1.0 - crack);
    col = mix(col, vec3(0.2, 0.21, 0.17), lich * 0.4 * thick);
    float moss = b_moss(wp, normalize(vWNrm)) * 0.8;
    col = mix(col, vec3(0.055, 0.085, 0.02) * (0.7 + 0.6 * fine), moss);
    diffuseColor.rgb *= col;
    float dome = 1.0 - smoothstep(0.0, 0.55, w.x);   // plates are convex
    g_h = ((1.0 - crack) * (0.45 + 0.35 * w.z + 0.25 * dome) - (1.0 - sub) * 0.12) * thick + fine * 0.08 + flake * 0.2 * (1.0 - thick) + moss * 0.2;
    g_r = 0.8 + crack * 0.15;
  }`,maple:`
  {
    float k = vBarkB.x, cw = vBarkB.z, r = vBarkA.z;
    vec2 p = vec2(vBarkA.x, vBarkA.y / (cw * 5.0));
    vec3 w = b_worleyP(p, k, abs(vBarkB.y));
    vec3 wp = vWPos;
    g_fp = length(fwidth(wp)); g_aa = 1.0 - smoothstep(0.12, 0.45, g_fp / max(cw, 1e-4));
    float stri = mix(0.6, smoothstep(0.0, 0.3, w.y - w.x), g_aa);
    float mott = n_fbm3(wp * 3.1, 4) * 0.5 + 0.5;
    float lich = smoothstep(0.6, 0.8, n_fbm3(wp * 4.3 + 3.0, 3) * 0.5 + 0.5);
    vec3 col = mix(vec3(0.034, 0.034, 0.031), vec3(0.085, 0.083, 0.074), mott);
    col = mix(col, vec3(0.19, 0.2, 0.15), lich * 0.5);
    col *= 0.86 + 0.14 * stri;
    vec3 twig = vBarkB.y < 0.0 ? vec3(0.13, 0.022, 0.022) : vec3(0.11, 0.085, 0.04);
    col = mix(twig, col, smoothstep(0.006, 0.035, r));
    float moss = b_moss(wp, normalize(vWNrm)) * 0.6;
    col = mix(col, vec3(0.06, 0.09, 0.022), moss);
    diffuseColor.rgb *= col;
    g_h = stri * 0.35 + mott * 0.35 + lich * 0.3 + moss * 0.3;
    g_r = 0.72 - lich * 0.05 + moss * 0.2;
  }`,cherry:`
  {
    float k = vBarkB.x, cw = vBarkB.z, r = vBarkA.z;
    vec2 p = vec2(vBarkA.x, vBarkA.y / (cw * 0.26));
    vec3 w = b_worleyP(p, k, vBarkB.y);
    vec3 wp = vWPos;
    g_fp = length(fwidth(wp)); g_aa = 1.0 - smoothstep(0.12, 0.45, g_fp / max(cw, 1e-4));
    float lent = (1.0 - smoothstep(0.16, 0.3, w.x)) * (1.0 - smoothstep(0.12, 0.45, g_fp / max(cw * 0.26, 1e-4)));
    float fine = mix(0.5, n_snoise3(wp * 33.0) * 0.5 + 0.5, b_aaf(33.0));
    float big = n_fbm3(wp * 2.2, 3) * 0.5 + 0.5;
    float thick = smoothstep(0.06, 0.22, r);
    vec3 col = mix(vec3(0.058, 0.032, 0.03), vec3(0.11, 0.06, 0.052), w.z * 0.6 + big * 0.4);
    // old rough trunk: vertical fissures, greyer
    vec2 q = vec2(vBarkA.x, vBarkA.y / (cw * 2.5));
    vec3 w2 = b_worleyP(q, k, vBarkB.y + 7.0);
    float fiss = (1.0 - smoothstep(0.02, 0.14, w2.y - w2.x)) * g_aa;
    vec3 oldCol = mix(vec3(0.075, 0.058, 0.05), vec3(0.14, 0.12, 0.1), big);
    col = mix(col, oldCol, thick * 0.55);
    col = mix(col, vec3(0.022, 0.016, 0.014), fiss * thick * 0.85);
    col = mix(col, vec3(0.2, 0.16, 0.13), lent * (1.0 - thick * 0.6) * 0.8);
    col *= 0.85 + 0.3 * fine;
    float moss = b_moss(wp, normalize(vWNrm)) * 0.75;
    col = mix(col, vec3(0.06, 0.09, 0.022), moss);
    diffuseColor.rgb *= col;
    g_h = lent * 0.5 + (1.0 - fiss * thick) * 0.6 + fine * 0.1 + moss * 0.25;
    g_r = mix(0.42, 0.85, max(thick * 0.8, moss)) + lent * 0.1;
  }`},M={maple:`
  {
    vec4 tx = sampledDiffuseColor;
    float shade = tx.r, grad = tx.g, blotch = tx.b;
    vec3 base = vColor.rgb;
    float acc = clamp(abs(vFol.z) * (smoothstep(0.2, 1.0, grad + (blotch - 0.5) * 0.7) * 1.2), 0.0, 1.0);
    vec3 accC = vFol.z < 0.0 ? uAccent2 : uAccent;
    vec3 col = mix(base, accC * (0.7 + 0.6 * blotch), acc);
    col = mix(uPetiole, col, smoothstep(0.0, 0.07, grad));
    col *= (0.42 + 0.9 * shade) * (0.88 + 0.24 * blotch);
    diffuseColor.rgb = col;
  }`,pine:`
  {
    vec4 tx = sampledDiffuseColor;
    float shade = tx.r, along = tx.g, tint = tx.b;
    vec3 base = vColor.rgb * mix(vec3(0.92, 1.0, 0.86), vec3(1.06, 1.0, 1.2), tint);
    vec3 tipC = base * vec3(1.62, 1.62, 1.05);
    vec3 col = mix(base * 0.3, tipC, smoothstep(0.05, 1.0, along) * (0.45 + 0.55 * vFol.z));
    // sun-bleached tan needle tips (they glow straw-gold when backlit)
    col = mix(col, vec3(0.13, 0.1, 0.042) * (0.8 + 0.4 * tint), smoothstep(0.7, 0.97, along) * (0.1 + 0.28 * vFol.z));
    col *= 0.5 + 0.7 * shade;
    col = mix(vec3(0.045, 0.035, 0.022), col, smoothstep(0.22, 0.36, shade));
    diffuseColor.rgb = col;
  }`,rgb:``,mapleHero:`
  {
    // hero atlas: r 0.5 blade / ->1 veins / ->0 margin band, g base->tip, b 0.5 / ->1 veinlet net / ->0 spots
    vec4 tx = sampledDiffuseColor;
    float rv = tx.r, grad = tx.g, bn = tx.b;
    float vein = smoothstep(0.56, 0.92, rv);
    float edge = smoothstep(0.46, 0.08, rv);
    float net = smoothstep(0.54, 0.9, bn);
    float spot = smoothstep(0.45, 0.05, bn);
    // per-leaf, surface-anchored low-frequency blotch (static, far below pixel frequency)
    vec2 bu = vMapUv * 9.0 + vec2(vInstId * 1.37, vInstId * 0.71);
    float blotch = n_vnoise(bu) * 0.65 + n_vnoise(bu * 2.7 + 3.1) * 0.35;
    vec3 base = vColor.rgb;
    // flush: amber-orange around the petiole spreading out along the primaries (negative: green-gold heart)
    float fl = (1.0 - smoothstep(0.03, 0.26 + 0.34 * blotch, grad - vein * 0.1)) * abs(vFol.z);
    vec3 fc = vFol.z < 0.0 ? uFlushB : uAccent;
    vec3 col = mix(base, fc * (0.8 + 0.4 * blotch), clamp(fl, 0.0, 1.0));
    col *= 0.8 + 0.4 * blotch;
    // crimson-brown drying lobe tips and margin band
    col = mix(col, uAccent2, clamp(smoothstep(0.8, 1.0, grad) * 0.55 * (0.35 + 0.65 * (1.0 - blotch)) + edge * 0.3, 0.0, 1.0));
    col = mix(col, vec3(0.035, 0.01, 0.004), spot * 0.85);
    // transmittance: primaries / secondaries carry less anthocyanin -> golden lines; the veinlet
    // net shades the areoles (stained glass); margin and spots are thicker / drier -> darker
    vec3 tr = col * uTransTint;
    tr = mix(tr, tr * vec3(1.1, 2.7, 1.5) + vec3(0.035, 0.016, 0.0), vein * 0.62);
    tr *= (1.0 - 0.42 * net) * (1.0 - 0.4 * edge) * (1.0 - 0.92 * spot);
    fol_TcH = clamp(tr, 0.0, 1.0);
    diffuseColor.rgb = col * (0.86 + 0.22 * vein - 0.1 * net);
  }`};function N(e,t,n={}){let{THREE:r}=e,i=new r.MeshDepthMaterial({depthPacking:r.RGBADepthPacking,...n});e.mat.patch(i,{vertexHead:t.vertexHead,vertexWorld:t.vertexWorld,uniforms:t.uniforms});let a=i.onBeforeCompile;return i.onBeforeCompile=(e,t)=>{a(e,t),/vec3\s+objectNormal\s*=\s*vec3\(\s*0\.0,\s*1\.0/.test(e.vertexShader)||(e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#ifndef USE_DISPLACEMENTMAP
  vec3 objectNormal = vec3(0.0, 1.0, 0.0);
#endif
#include <begin_vertex>`))},i}function ne(e,t){let{THREE:n}=e,r={value:t===`pine`?.03:t===`cherry`?.008:.005},i={vertexHead:k+`attribute vec4 aBarkA; attribute vec3 aBarkB; varying vec4 vBarkA; varying vec3 vBarkB;`,vertexWorld:`vBarkA = aBarkA; vBarkB = aBarkB; wPos4.xyz += vegWind(wPos4.xyz, aBarkA.w);`},a={...i,fragHead:A+`
uniform float uBump;`,fragColor:j[t],fragRough:`roughnessFactor = clamp(g_r, 0.2, 1.0);`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, uBump * g_aa * (0.2 + 0.8 * smoothstep(0.015, 0.25, vBarkA.z)));`,uniforms:{uBump:r}},o=e.mat.std({color:16777215,roughness:.8,metalness:0},a);return o.name=`bark_`+t,{m:o,dm:N(e,i)}}function P(e,t,n,r={}){let{THREE:i}=e,a={uTransTint:{value:new i.Vector3(...r.transTint||[1.6,1.7,.7])},uTransBack:{value:r.transBack??.9},uTransFwd:{value:r.transFwd??1.6},uTransPow:{value:r.transPow??6},uBend:{value:r.bend??.45},uAOAmt:{value:r.ao??1},uAccent:{value:new i.Vector3(...r.accent||[.55,.22,.03])},uAccent2:{value:new i.Vector3(...r.accent2||[.16,.008,.03])},uPetiole:{value:new i.Vector3(...r.petiole||[.22,.05,.03])},uFlutter:{value:r.flutter??.02},uTransDepth:{value:r.transDepth??2.5},uShadowRange:F,uLeak:{value:r.leak??.55},uLeakDiffuse:{value:r.leakDiffuse??.25},uFatten:{value:r.fatten??.22},uSpec:{value:r.spec??1},uSkyTrans:{value:r.skyTrans??.5},uFwd2:{value:r.fwd2??0}};r.uniforms&&Object.assign(a,r.uniforms),r.hero&&(a.uOccA={value:r.hero.A},a.uOccX={value:r.hero.X},a.uOccY={value:r.hero.Y},a.uOccTrans={value:new i.Vector3(...r.hero.trans||[.3,.035,.02])},a.uOccMap={value:n});let o=!!r.hero,s={vertexHead:k+`
      attribute vec4 aFol;   // x flex, y ao, z accent, w atlas cell
      attribute vec3 aBend;  // bent (canopy) normal, world
      varying vec4 vFol; varying vec3 vBendW;
      uniform float uFlutter;
      ${o?`varying vec3 vRest; varying float vInstId;`:``}
      ${r.vertexHead||``}
    `,vertexWorld:`
      vFol = aFol; vBendW = aBend;
      ${o?`vRest = wPos4.xyz; vInstId = float(gl_InstanceID);`:``}
      #ifdef USE_MAP
        vMapUv += vec2(mod(aFol.w, 2.0), floor(aFol.w * 0.5 + 0.01)) * 0.5;
      #endif
      ${r.vertexWorld||``}
      if (${r.vertexWorld?`false`:`true`}) {
        vec3 ip = vec3(0.0);
        #ifdef USE_INSTANCING
          ip = instanceMatrix[3].xyz;
        #endif
        // per-leaf flutter: slow (0.35-0.7 Hz), random phase; no high-frequency term (temporal shimmer)
        float ph = n_hash13(ip * 3.17) * 6.2831;
        float fl = sin(uTime * (2.2 + 2.2 * fract(ph * 1.7)) + ph) * 0.7 + sin(uTime * 3.3 + ph * 2.0) * 0.3;
        wPos4.xyz += vegWind(wPos4.xyz, aFol.x);
        wPos4.xyz += vec3(0.3, 1.0, -0.2) * fl * uFlutter * clamp(length(transformed), 0.0, 1.0) * uWindStrength * aFol.x;
      }
    `},c=o?`
    #define HERO_N ${r.hero.n}
    uniform vec4 uOccA[HERO_N]; uniform vec4 uOccX[HERO_N]; uniform vec4 uOccY[HERO_N];
    uniform vec3 uOccTrans; uniform sampler2D uOccMap;
    varying vec3 vRest; varying float vInstId;
    vec3 heroOcc(vec3 p, vec3 L) {
      vec3 T = vec3(1.0);
      for (int i = 0; i < HERO_N; i++) {
        if (abs(float(i) - vInstId) < 0.5) continue;
        vec3 o = uOccA[i].xyz, X = uOccX[i].xyz, Y = uOccY[i].xyz;
        vec3 N = cross(X, Y);
        float dn = dot(L, N);
        if (abs(dn) < 1e-12) continue;
        float t = dot(o - p, N) / dn;
        if (t < 0.004 || t > 0.8) continue;
        vec3 h = p + L * t - o;
        float a = dot(h, X) * uOccX[i].w, b = dot(h, Y) * uOccY[i].w;
        if (abs(a) > 0.5 || b < 0.0 || b > 1.0) continue;
        float cell = uOccA[i].w;
        vec2 uv = vec2(a + 0.5, 1.0 - b) * 0.5 + vec2(mod(cell, 2.0), floor(cell * 0.5 + 0.01)) * 0.5;
        vec4 tx = textureLod(uOccMap, uv, 1.5);
        float al = smoothstep(0.3, 0.7, tx.a);
        if (b < 0.4 && tx.g < 0.03) al = 0.0;
        T *= mix(vec3(1.0), uOccTrans, al);
      }
      return T;
    }
  `:``,l={...s,fragHead:`
      varying vec4 vFol; varying vec3 vBendW;
      uniform vec3 uTransTint; uniform float uTransBack, uTransFwd, uTransPow, uBend, uAOAmt;
      uniform float uTransDepth, uShadowRange, uLeak, uLeakDiffuse, uFatten, uSpec, uSkyTrans, uFwd2;
      uniform vec3 uAccent; uniform vec3 uAccent2; uniform vec3 uPetiole;
      ${t===`mapleHero`?`uniform vec3 uFlushB;`:``}
      vec3 fol_faceN; vec3 fol_TcH = vec3(-1.0);
    `+c,fragColor:M[t]||``,fragNormal:`
      ${r.flatNormal?`{ vec3 fn = normalize(cross(dFdx(vViewPosition), dFdy(vViewPosition))); if (dot(fn, vViewPosition) < 0.0) fn = -fn; normal = fn; }`:``}
      fol_faceN = normal;
      {
        vec3 bv = normalize((viewMatrix * vec4(vBendW, 0.0)).xyz);
        normal = normalize(mix(normal, bv, uBend));
      }
    `,fragLight:`
      vec3 fol_sunF = vec3(1.0);
      ${o?`fol_sunF = heroOcc(vRest, normalize(uSunDir)); reflectedLight.directDiffuse *= fol_sunF; reflectedLight.directSpecular *= fol_sunF;`:``}
      #if NUM_DIR_LIGHTS > 0
      {
        vec3 Ld = directLight.direction;
        float bk = dot(-fol_faceN, Ld);
        float back = max(bk, 0.0);
        float cvl = max(dot(-geometryViewDir, Ld), 0.0);
        float fgate = smoothstep(-0.25, 0.25, bk);
        float fwd = pow(cvl, uTransPow) * fgate;
        // narrow forward lobe around the sun disc: blades in front of the sun burn amber-gold
        // (light crossing the thinnest paths) instead of clipping to pink in the tonemapper
        float fwd2 = uFwd2 * pow(cvl, 56.0) * fgate;
        vec3 Tc = fol_TcH.x >= 0.0 ? fol_TcH : clamp(diffuseColor.rgb * uTransTint, 0.0, 1.0);
        // light leaking through the canopy itself: the shadow map is re-tested with the receiver
        // pulled uTransDepth metres toward the sun, so occluders closer than that (own leaves)
        // are ignored while distant occluders (buildings) still block.
        vec3 sunRaw = directionalLights[0].color;
        float sh = dot(directLight.color, vec3(0.333)) / max(dot(sunRaw, vec3(0.333)), 1e-5);
        float leak = 0.0;
        #if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0 && defined( SHADOWMAP_TYPE_PCF )
        {
          vec4 sc = vDirectionalShadowCoord[0];
          vec3 c3 = sc.xyz / sc.w;
          if (c3.x > 0.0 && c3.x < 1.0 && c3.y > 0.0 && c3.y < 1.0 && c3.z < 1.0) {
            float dz = uTransDepth / max(uShadowRange, 1.0);
            leak = texture(directionalShadowMap[0], vec3(c3.xy, c3.z - dz));
          } else leak = 1.0;
        }
        #else
          leak = 1.0;
        #endif
        float leakVis = max(sh, leak * uLeak * (0.45 + 0.55 * vFol.y));
        vec3 Tc2 = mix(Tc, vec3(Tc.r, Tc.r * 0.45, Tc.r * 0.07), 0.65);
        reflectedLight.directDiffuse += sunRaw * fol_sunF * leakVis * (Tc * (back * uTransBack + fwd * uTransFwd) + Tc2 * fwd2 * uTransFwd) * RECIPROCAL_PI;
        // multiple scattering inside the crown: a little sun reaches shaded inner leaves
        reflectedLight.directDiffuse += sunRaw * fol_sunF * max(leak * uLeak - sh, 0.0) * uLeakDiffuse * max(dot(normal, Ld), 0.0) * diffuseColor.rgb * RECIPROCAL_PI;
      }
      #endif
      {
        float aoF = mix(1.0, vFol.y, uAOAmt);
        reflectedLight.indirectDiffuse *= aoF;
        reflectedLight.indirectSpecular *= aoF * uSpec;
        reflectedLight.directSpecular *= uSpec;
      }
      #if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
      {
        // diffuse transmission of sky light arriving on the far side of the blade: canopies seen
        // from below glow green-gold against the sky instead of going black
        vec3 eT = getIBLIrradiance(-fol_faceN);
        float aoT = mix(1.0, vFol.y, uAOAmt * 0.75);
        reflectedLight.indirectDiffuse += eT * (fol_TcH.x >= 0.0 ? fol_TcH : clamp(diffuseColor.rgb * uTransTint, 0.0, 1.0)) * uSkyTrans * aoT * RECIPROCAL_PI;
      }
      #endif
    `,uniforms:a},u=e.mat.std({color:16777215,map:n,roughness:r.roughness??.55,metalness:0,alphaTest:.5,alphaToCoverage:!(typeof location<`u`&&/vega2c=0/.test(location.search)),side:e.THREE.DoubleSide},l);u.name=`fol_`+t+(r.name||``);{let e=u.onBeforeCompile;u.onBeforeCompile=(t,n)=>{e(t,n),t.fragmentShader=t.fragmentShader.replace(`#include <alphatest_fragment>`,`
        #ifdef USE_ALPHATEST
          #ifdef ALPHA_TO_COVERAGE
            // leaf fattening: when a card shrinks to a few pixels, individual leaves are no longer
            // resolved; grow their alpha so the crown keeps its density instead of turning to lace
            {
              vec2 tsz = vMapUv * 1024.0;
              float lod = 0.5 * log2(max(dot(dFdx(tsz), dFdx(tsz)), dot(dFdy(tsz), dFdy(tsz))) + 1e-8);
              diffuseColor.a *= 1.0 + uFatten * clamp(lod - 3.0, 0.0, 3.5);
            }
            diffuseColor.a = clamp((diffuseColor.a - alphaTest) / max(fwidth(diffuseColor.a), 1e-4) + 0.5, 0.0, 1.0);
            if (diffuseColor.a <= 0.0) discard;
          #else
            if (diffuseColor.a < alphaTest) discard;
          #endif
        #endif
      `)}}return{m:u,dm:N(e,{...s,uniforms:{uFlutter:a.uFlutter}},{map:n,alphaTest:.5})}}var F={value:200},I=null;function re(e){if((!I||!I.parent)&&(I=null,e.traverse(e=>{!I&&e.isDirectionalLight&&e.castShadow&&(I=e)})),I){let e=I.shadow.camera;F.value=Math.max(1,e.far-e.near)}}function ie(e,t=.12){let n=[-.5,0,0,.5,0,0,.5,1,-.05,-.5,1,-.05],r=[];for(let i=0;i<4;i++){let a=n[i*3],o=new e.Vector3(-Math.sign(a)*t*2.5,.1*n[i*3+1],1).normalize();r.push(o.x,o.y,o.z)}let i=[0,.5,.5,.5,.5,0,0,0],a=new e.BufferGeometry;return a.setAttribute(`position`,new e.Float32BufferAttribute(n,3)),a.setAttribute(`normal`,new e.Float32BufferAttribute(r,3)),a.setAttribute(`uv`,new e.Float32BufferAttribute(i,2)),a.setIndex([0,1,2,0,2,3]),a}function ae(e){let t=[],n=[],r=[],i=[],a=new e.Vector3(0,.3,0),o=(o,s)=>{let c=t.length/3;for(let i=0;i<4;i++){let c=o[i];t.push(c.x,c.y,c.z);let l=c.clone().sub(a).normalize().lerp(new e.Vector3(0,1,0),.25).normalize();n.push(l.x,l.y,l.z),r.push(s[i][0],s[i][1])}i.push(c,c+1,c+2,c,c+2,c+3)};for(let t=0;t<2;t++){let n=t/2*Math.PI+.3,r=Math.cos(n)*.5,i=Math.sin(n)*.5;o([new e.Vector3(-r,0,-i),new e.Vector3(r,0,i),new e.Vector3(r,1,i),new e.Vector3(-r,1,-i)],[[0,.5],[.5,.5],[.5,0],[0,0]])}let s=.55;o([new e.Vector3(-.55,.37,-.55),new e.Vector3(s,.47,-.55),new e.Vector3(s,.47,s),new e.Vector3(-.55,.37,s)],[[.5,0],[1,0],[1,.5],[.5,.5]]);let c=new e.BufferGeometry;return c.setAttribute(`position`,new e.Float32BufferAttribute(t,3)),c.setAttribute(`normal`,new e.Float32BufferAttribute(n,3)),c.setAttribute(`uv`,new e.Float32BufferAttribute(r,2)),c.setIndex(i),c}function oe(e,t=3){let n=[],r=[],i=[],a=[],o=e=>{let t=n.length/3,o=[[0,.5],[.5,.5],[.5,0],[0,0]];for(let t=0;t<4;t++){let a=e[t];n.push(a.x,a.y,a.z);let s=a.clone().normalize();r.push(s.x,s.y,s.z),i.push(o[t][0],o[t][1])}a.push(t,t+1,t+2,t,t+2,t+3)},s=(t,n,r)=>new e.Vector3(t,n,r);o([s(-.5,-.5,0),s(.5,-.5,0),s(.5,.5,0),s(-.5,.5,0)]),o([s(0,-.5,-.5),s(0,-.5,.5),s(0,.5,.5),s(0,.5,-.5)]),t>2&&o([s(-.5,.02,.5),s(.5,-.02,.5),s(.5,.02,-.5),s(-.5,-.02,-.5)]);let c=new e.BufferGeometry;return c.setAttribute(`position`,new e.Float32BufferAttribute(n,3)),c.setAttribute(`normal`,new e.Float32BufferAttribute(r,3)),c.setAttribute(`uv`,new e.Float32BufferAttribute(i,2)),c.setIndex(a),c}function se(e){let t=new e.BufferGeometry,n=[-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0],r=[];for(let e=0;e<4;e++){let t=n[e*3],i=n[e*3+1],a=[t*.6,i*.6,1],o=Math.hypot(...a);r.push(a[0]/o,a[1]/o,a[2]/o)}return t.setAttribute(`position`,new e.Float32BufferAttribute(n,3)),t.setAttribute(`normal`,new e.Float32BufferAttribute(r,3)),t.setAttribute(`uv`,new e.Float32BufferAttribute([0,.5,.5,.5,.5,0,0,0],2)),t.setIndex([0,1,2,0,2,3]),t}function ce(e,t=6){let n=[],r=[],i=[],a=[],o=0,s=0,c=0;for(let a=0;a<=t;a++){let l=a/t,u=new e.Vector3(0,-Math.sin(c),Math.cos(c));n.push(-.5,o,s,.5,o,s),r.push(u.x,u.y+.3,u.z,u.x,u.y+.3,u.z),i.push(0,1-l,1,1-l);let d=1/t;c+=.42*d*2.4,o+=Math.cos(c)*d,s+=Math.sin(c)*d}for(let e=0;e<t;e++){let t=e*2;a.push(t,t+1,t+3,t,t+3,t+2)}let l=new e.BufferGeometry;return l.setAttribute(`position`,new e.Float32BufferAttribute(n,3)),l.setAttribute(`normal`,new e.Float32BufferAttribute(r,3)),l.setAttribute(`uv`,new e.Float32BufferAttribute(i,2)),l.setIndex(a),l.computeVertexNormals(),l}var L=class{constructor(){this.m=[],this.fol=[],this.bend=[],this.col=[],this.n=0}push(e,t,n,r,i,a,o){this.m.push(e.x,e.y,e.z,0,t.x,t.y,t.z,0,n.x,n.y,n.z,0,r.x,r.y,r.z,1),this.fol.push(i[0],i[1],i[2],i[3]),this.bend.push(a.x,a.y,a.z),this.col.push(o[0],o[1],o[2]),this.n++}build(e,t,n,r,i,{castShadow:a=!0,receiveShadow:o=!0}={}){if(!this.n)return null;let s=t.clone();s.setAttribute(`aFol`,new e.InstancedBufferAttribute(new Float32Array(this.fol),4)),s.setAttribute(`aBend`,new e.InstancedBufferAttribute(new Float32Array(this.bend),3));let c=new e.InstancedMesh(s,n,this.n);return c.instanceMatrix=new e.InstancedBufferAttribute(new Float32Array(this.m),16),c.instanceColor=new e.InstancedBufferAttribute(new Float32Array(this.col),3),c.castShadow=a,c.receiveShadow=o,r&&(c.customDepthMaterial=r),c.computeBoundingSphere(),c.computeBoundingBox&&c.computeBoundingBox(),c.name=i,c}};function R(e,t,n){let r=!1;for(let i=0,a=n.length-1;i<n.length;a=i++){let o=n[i][0],s=n[i][1],c=n[a][0],l=n[a][1];s>t!=l>t&&e<(c-o)*(t-s)/(l-s)+o&&(r=!r)}return r}function le(e,t,n,r){let i=r[0]-n[0],a=r[1]-n[1],o=Math.max(0,Math.min(1,((e-n[0])*i+(t-n[1])*a)/(i*i+a*a)));return Math.hypot(e-n[0]-i*o,t-n[1]-a*o)}function z(e,t,n){let r=1/0;for(let i=0;i<n.length;i++)r=Math.min(r,le(e,t,n[i],n[(i+1)%n.length]));return r}function ue(e){let t=[],n=e.hall;t.push({x0:n.center[0]-n.platform.w/2,x1:n.center[0]+n.platform.w/2,z0:n.center[2]-n.platform.d/2,z1:n.center[2]+n.platform.d/2,m:1.2,name:`hall`}),t.push({x0:n.center[0]-n.stairs.width/2-1,x1:n.center[0]+n.stairs.width/2+1,z0:n.stairs.frontZ-1,z1:n.stairs.frontZ+4.5,m:.5,name:`stairs`});let r=e.pagoda;t.push({x0:r.center[0]-r.platform.w/2,x1:r.center[0]+r.platform.w/2,z0:r.center[2]-r.platform.d/2,z1:r.center[2]+r.platform.d/2,m:1,name:`pagoda`});for(let n of e.sideHalls)t.push({x0:n.center[0]-n.w/2,x1:n.center[0]+n.w/2,z0:n.center[2]-n.d/2,z1:n.center[2]+n.d/2,m:2,name:`side`});let i=e.bellTower;t.push({x0:i.center[0]-i.w/2,x1:i.center[0]+i.w/2,z0:i.center[2]-i.d/2,z1:i.center[2]+i.d/2,m:2,name:`bell`});let a=e.pavilion;t.push({x0:a.center[0]-a.w/2-3,x1:a.center[0]+a.w/2,z0:a.center[2]-a.d/2,z1:a.center[2]+a.d/2,m:1.2,name:`pavilion`});let o=e.gate;t.push({x0:o.center[0]-o.w/2,x1:o.center[0]+o.w/2,z0:o.center[2]-o.d/2,z1:o.center[2]+o.d/2,m:1.5,name:`gate`});let s=e.corridor,c={x0:s.rect.minX+s.width+.6,x1:s.rect.maxX-s.width-.6,z0:s.rect.minZ+s.width+.6,z1:s.rect.maxZ-s.width-.6},l=e.bridge;return{rects:t,inner:c,clearance(n,r,{pondMargin:i=0,pathMargin:a=0,lanternR:o=1}={}){let s=1/0;for(let e of t){let t=Math.max(e.x0-e.m-n,0,n-e.x1-e.m),i=Math.max(e.z0-e.m-r,0,r-e.z1-e.m),a=n>e.x0-e.m&&n<e.x1+e.m&&r>e.z0-e.m&&r<e.z1+e.m;s=Math.min(s,a?-1:Math.hypot(t,i))}for(let t of e.paths)s=Math.min(s,le(n,r,t.from,t.to)-t.width/2-a);s=Math.min(s,le(n,r,[l.south[0],l.south[2]],[l.north[0],l.north[2]])-l.width/2-.8);let u=R(n,r,e.pond.outline)&&!R(n,r,e.pond.island),d=z(n,r,e.pond.outline)-i;s=Math.min(s,u?-1:d);for(let t of e.stoneLanterns)s=Math.min(s,Math.hypot(n-t[0],r-t[1])-o);return(n<c.x0||n>c.x1||r<c.z0||r>c.z1)&&(s=Math.min(s,-1)),s},inPond(t,n){return R(t,n,e.pond.outline)&&!R(t,n,e.pond.island)},onIsland(t,n){return R(t,n,e.pond.island)}}}async function B(A){let{THREE:j,L:M}=A,F=performance.now(),I=(e=0,t=0,n=0)=>new j.Vector3(e,t,n),R=I(0,1,0),le=(A.sunDir?A.sunDir.clone():I(-.93,.12,.34)).normalize();A.rng(`vegetation`);let z=ue(M),B=[{x0:40.9,x1:53.1,z0:11.9,z1:24.1,y1:6},{x0:-.2,x1:4,z0:16,z1:23,y1:2.7},{x0:35.9,x1:39.8,z0:20.5,z1:25,y1:7.5}],de=(e,t=.1)=>{for(let n of B)if(e.x>n.x0-t&&e.x<n.x1+t&&e.z>n.z0-t&&e.z<n.z1+t&&e.y<n.y1+t)return!0;return!1},V=A.modules&&A.modules.terrain,fe=V&&(V.heightAt||V.groundHeight||V.getHeight||V.object&&V.object.userData&&V.object.userData.heightAt),H=(e,t)=>{if(typeof fe==`function`)try{let n=fe(e,t);if(Number.isFinite(n))return n}catch{}return z.onIsland(e,t)?.25:0},U=C(A.rng(`veg-maple-tex`),2048),pe=D(A.rng(`veg-samara-tex`),512),me=T(A.rng(`veg-pine-tex`),1024),he=w(A.rng(`veg-blossom-tex`),1024),ge=S(A.rng(`veg-shrub-tex`),1024),_e=E(A.rng(`veg-fern-tex`)),ve=Math.min(8,A.renderer.capabilities.getMaxAnisotropy?A.renderer.capabilities.getMaxAnisotropy():4);for(let e of[U,pe,me,he,ge,_e])e.anisotropy=ve;if(typeof location<`u`&&/vegnomip=1/.test(location.search))for(let e of[U,me,he,ge,_e])e.minFilter=j.LinearFilter,e.needsUpdate=!0;let ye=performance.now(),be={pine:ne(A,`pine`),maple:ne(A,`maple`),cherry:ne(A,`cherry`)},xe=P(A,`maple`,U,{transTint:[1.9,1.9,.75],transBack:1,transFwd:2.2,bend:.4,roughness:.55,accent:[.55,.2,.025],petiole:[.2,.05,.025],flutter:.03,fatten:.38,spec:.6}),Se=P(A,`maple`,U,{transTint:[1.95,1.4,.55],transBack:1.15,transFwd:2.8,transDepth:.9,leak:.35,leakDiffuse:.15,bend:.3,roughness:.6,accent:[.55,.26,.02],petiole:[.2,.05,.025],flutter:.03,fatten:.38,spec:.35,ao:1,name:`hero`}),Ce=P(A,`maple`,U,{transTint:[1.5,1.5,.6],transBack:.55,transFwd:1.6,transDepth:1.1,leak:.25,leakDiffuse:.08,bend:.62,roughness:.6,accent:[.55,.2,.025],petiole:[.2,.05,.025],flutter:.03,fatten:.38,spec:.45,skyTrans:.35,name:`far`}),we=P(A,`pine`,me,{transTint:[1.5,1.7,.8],transBack:.4,transFwd:.8,transDepth:1,leak:.2,leakDiffuse:.06,bend:.72,roughness:.58,spec:.55,flutter:.008,fatten:.18,skyTrans:.32}),Te=P(A,`rgb`,he,{transTint:[1,.85,.9],transBack:.75,transFwd:1.3,bend:.5,roughness:.6,flutter:.015,fatten:.25,name:`blossom`,skyTrans:.35}),Ee=P(A,`rgb`,ge,{transTint:[1.4,1.5,.8],transBack:.5,transFwd:.7,transDepth:.6,leak:.2,leakDiffuse:.05,bend:.85,roughness:.6,spec:.5,flutter:.004,fatten:.12,name:`shrub`,skyTrans:.3}),De=P(A,`rgb`,_e,{transTint:[1.6,1.7,.8],transBack:.9,transFwd:1.6,bend:.3,roughness:.55,flutter:.02,name:`fern`}),Oe=A.mat.std({color:16777215,roughness:.75,metalness:0},{vertexHead:`attribute vec3 aTint; varying vec3 vTint;`,vertexWorld:`vTint = aTint;`,fragHead:`varying vec3 vTint; float g_h;`,fragColor:`
    {
      vec3 wp = vWPos;
      vec2 w = n_worley3(wp * 38.0);
      float aa = 1.0 - smoothstep(0.15, 0.5, length(fwidth(wp)) * 38.0);
      float leaf = mix(0.55, smoothstep(0.0, 0.35, w.y - w.x), aa);
      float n = n_fbm3(wp * 4.0, 3) * 0.5 + 0.5;
      vec3 col = vTint * (0.45 + 0.75 * leaf) * (0.75 + 0.5 * n);
      diffuseColor.rgb *= col;
      g_h = leaf * 0.7 * aa + n * 0.3;
    }`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.012);`});Oe.name=`mound`;let ke={vertexHead:k+`attribute vec3 aTint; attribute float aFlex; varying vec3 vTint;`,vertexWorld:`vTint = aTint; wPos4.xyz += vegWind(wPos4.xyz, aFlex);`},Ae=A.mat.std({color:16777215,roughness:.82,metalness:0},{...ke,fragHead:`varying vec3 vTint; float g_h;`,fragColor:`
    {
      vec3 wp = vWPos;
      vec2 w = n_worley3(wp * vec3(24.0, 30.0, 24.0));
      float aa = 1.0 - smoothstep(0.15, 0.5, length(fwidth(wp)) * 30.0);
      float clump = mix(0.6, smoothstep(0.0, 0.4, w.y - w.x), aa);
      float n = n_fbm3(wp * 2.6, 3) * 0.5 + 0.5;
      diffuseColor.rgb *= vTint * (0.45 + 0.75 * clump) * (0.8 + 0.4 * n);
      g_h = clump * 0.8 * aa + n * 0.2;
    }`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.025);`});Ae.name=`pine_core`;let je=N(A,ke),Me=typeof location<`u`&&/vegcore=0/.test(location.search),W={pine:new p,maple:new p,cherry:new p},Ne=new n,G={maple:new L,mapleHero:new L,mapleFar:new L,pine:new L,blossom:new L,shrub:new L,fern:new L},Pe={trees:0};I(),I(),I();let Fe=(e,t)=>{let n=e.clone().normalize(),r=t.clone().addScaledVector(n,-t.dot(n));return r.lengthSq()<1e-6&&r.copy(h(n)),r.normalize(),[I().crossVectors(n,r).normalize(),n,r]},Ie=(e,t)=>n=>t*Math.min(1,n/Math.max(e,.1))**1.6,Le=e=>{let t=0;for(let n of e)t=Math.max(t,n.pd[n.pd.length-1]);return t};function Re(e,t,n,r,i={}){let a=Le(t),o=Ie(a,i.flexK??1),s=i.red?-1:1,c=e===`pine`?.075:e===`cherry`?.05:.06;for(let n=0;n<t.length;n++){let a=t[n];if(a.rads[0]<.0018||!i.hero&&a.level>=4&&a.rads[0]<.0046)continue;let l=a.level===0?g({seed:r%97,bump:e===`pine`?.07:.05,flare:e===`pine`?.5:e===`cherry`?.45:.35,roots:5,flareH:.45,flute:e===`maple`?.05:.025,fluteN:e===`maple`?4:7}):a.rads[0]>.05?g({seed:(r+n)%97,bump:.05,flare:0,flute:e===`maple`?.035:.01,fluteN:3}):null;W[e].addBranch(a,{flexOf:o,seed:s*(1+(r*13+n*7)%89),cellW:c,disp:l,radial:e=>e<.006||!i.hero&&e<.014?3:e<.012?4:Math.round(4+e*(i.hero?62:48))})}return o}let ze=[{w:3,c:[.42,.022,.012],ex:1},{w:3,c:[.3,.01,.018],ex:1},{w:1.6,c:[.19,.006,.012],ex:.6},{w:2,c:[.46,.065,.012],ex:.5},{w:1,c:[.44,.14,.016],ex:.15},{w:.7,c:[.24,.17,.025],ex:0},{w:.35,c:[.1,.15,.025],ex:0}],Be=[{w:2,c:[.05,.125,.022],ex:.3},{w:2.5,c:[.075,.165,.027],ex:.6},{w:1.6,c:[.105,.195,.03],ex:1},{w:1.3,c:[.035,.095,.02],ex:0},{w:.6,c:[.14,.2,.034],ex:1}],Ve=[{w:2,c:[.07,.15,.02],ex:.3},{w:2.5,c:[.1,.19,.027],ex:.6},{w:1.6,c:[.13,.21,.03],ex:1},{w:1,c:[.055,.12,.02],ex:0},{w:.7,c:[.17,.22,.036],ex:1}],He=[{w:2,c:[.3,.19,.02],ex:1},{w:1.6,c:[.38,.12,.012],ex:.85},{w:1.4,c:[.24,.21,.03],ex:.6},{w:1,c:[.14,.17,.025],ex:.25},{w:.8,c:[.09,.13,.02],ex:0}],Ue=(e,t,n)=>{let r=0,i=t.map(e=>{let t=e.w*(.25+1.5*(1-Math.abs(e.ex-n)));return r+=t,t}),a=e.next()*r;for(let e=0;e<t.length;e++)if(a-=i[e],a<=0)return t[e].c;return t[0].c};function We(e){let t=A.rng(`maple`+e.id),n=I(e.x,H(e.x,e.z),e.z),r=e.type===`mapleRed`,s=e.lean?I(e.lean[0],0,e.lean[1]):I(t.range(-.5,.5),0,t.range(-.5,.5)),p=e.style!==`shell`,m=p?c(t,{species:`maple`,h:e.h,base:n,lean:s,spread:e.spread??(r?.8:.68),detail:e.detail??1,sx:e.sx,sz:e.sz,leaders:e.leaders,crownBase:e.crownBase??(r?.2:.3),padR:e.padR,gaps:e.gaps,twigDens:e.twigDens,keepOut:B,trunkFrac:e.trunkFrac,widest:e.widest,droop:e.droop,squash:e.squash,lobes:e.lobes}):d(t,{h:e.h,base:n,lean:s,spread:e.spread??(r?.7:.62),detail:e.detail??1,sx:e.sx,sz:e.sz,leaders:e.leaders,shellDensity:e.shellDensity??(r?5:3.8),tiers:r?1.1:1.6,maxTwig:e.maxTwig,leafLen:e.leafLen,twigWobble:e.twigWobble,keepOut:B}),g=Re(`maple`,m.branches,m.rT,e.id*31+5,{red:r,hero:e.hero,flexK:e.flexK});m.flexOf=g;let v=m.env,y=e.leafSize??(r?.16:.175),b=e.nodeSpacing??.06,x=r?[[.3,.012,.012],[.4,.02,.014],[.22,.008,.012],[.45,.035,.014],[.34,.014,.026]]:e.palette||[[.075,.16,.022],[.1,.19,.028],[.06,.13,.02],[.13,.2,.03],[.085,.17,.035]],S=r?.45:e.autumn??.12,C=t.range(-.08,.08),w=r||e.gpal||e.frame?[1,1,1]:[[.6,.78,.8],[1,1,1],[1.12,1.04,.82],[.75,.92,1]][t.int(0,3)];if(p)for(let n of m.pads){let i=Math.min(1,Math.max(0,(n.c.y-(v.c.y-v.r.y))/(2*v.r.y)));n.expo=Math.min(1,Math.max(0,n.shade*.75+i*.35-.1)),n.col=Ue(t,r?ze:e.gpal||(e.frame?Ve:Be),n.expo),n.col2=Ue(t,r?ze:e.gpal||(e.frame?Ve:Be),n.expo),n.v=t.range(.85,1.15)}let T=null,E=n=>T?l(T,n).multiplyScalar(.7).addScaledVector(R,.75).add(_(t).multiplyScalar(.8)):a(n,v).multiplyScalar(e.faceOut??1).addScaledVector(R,.5).add(_(t).multiplyScalar(.85)),D=(n,o,s,c,d)=>{if(de(n,.15))return;if(T){let e=u(T,n);if(e.x*e.x+e.z*e.z>1.7)return}let p=s.clone().normalize(),m=o.clone();m.y-=.25,m.addScaledVector(p,-m.dot(p)),m.lengthSq()<1e-5&&m.copy(h(p)),m.normalize();let g=I().crossVectors(m,p).normalize();p.dot(le)<0&&(p.negate(),g.negate());let _=(n.y-(v.c.y-v.r.y))/(2*v.r.y),y,b,E;if(T){let e=T,o=u(e,n),s=i(e,n),c=Math.min(1,Math.hypot(o.x,o.z));y=Math.min(1,Math.max(.1,(.22+.78*s)*(.8+.2*c)*e.shade)),b=l(e,n).lerp(R,.35).lerp(a(n,v),.25).normalize();let d=t.chance(.22)?e.col2:e.col,f=e.v*(.82+t.next()*.36)*(.85+.25*s);E=[d[0]*f*(1+C)*w[0],d[1]*f*(r?.8+.4*t.next():1)*w[1],d[2]*f*(1-C)*w[2]]}else{let e=f(n,v);y=Math.min(1,Math.max(.18,(.3+.75*Math.min(1,Math.max(0,(e-.35)/.65)))*(.7+.35*Math.min(1,Math.max(0,_))))),b=a(n,v).lerp(R,.25).normalize();let r=x[Math.floor(t.next()*x.length)],i=.82+t.next()*.36,o=Math.max(0,Math.min(1,(_-.5)*2))*.25;E=[r[0]*i*(1+C+o*.6),r[1]*i*(1+o*.3),r[2]*i*(1-C)]}let D=t.chance(S)?t.range(.3,1):t.range(0,.15);r&&t.chance(.65)&&(D=-D),(e.forceNear||Qe(n)?e.heroMat?G.mapleHero:G.maple:G.mapleFar).push(g.multiplyScalar(c),m.multiplyScalar(c),p.multiplyScalar(c),n,[d+.08,y,D,t.int(0,3)],b,E)};for(let e of m.twigs){let n=e.br;T=e.pad||null;let r=(n.pd[n.pd.length-1]-n.pd[0])*(1-e.t0),i=Math.max(1,Math.round(r/b));for(let r=0;r<i;r++){let a=e.t0+(r+.5)/i*(1-e.t0),s=o(n,a),c=g(s.pd),l=I().crossVectors(s.T,R);if(l.lengthSq()<1e-4&&l.copy(h(s.T)),l.normalize(),I(s.p.x-v.c.x,0,s.p.z-v.c.z).normalize(),r%2==0||t.chance(.3))for(let e of[-1,1]){if(t.chance(.08))continue;let n=l.clone().multiplyScalar(e).addScaledVector(s.T,t.range(.15,.6)).add(_(t).multiplyScalar(.3));n.y=n.y*.3+t.range(-.15,.1),n.normalize();let r=E(s.p);D(s.p,n,r,y*t.range(.8,1.15)*(1-.15*a),c)}else{let e=t.chance(.5)?1:-1,n=l.clone().multiplyScalar(e*.8).addScaledVector(R,.5).addScaledVector(s.T,.3).normalize(),r=s.p.clone().addScaledVector(n,t.range(.02,.06)),i=t.int(3,5),a=t.range(0,O);for(let e=0;e<i;e++){let n=a+e/i*O+t.range(-.3,.3),o=l.clone().multiplyScalar(Math.cos(n)).addScaledVector(s.T,Math.sin(n));o.y=t.range(-.2,.15),D(r,o,E(r),y*t.range(.75,1.1),c+.03)}}}let a=o(n,1),s=e.shell?t.int(4,7):t.int(2,4),c=I().crossVectors(a.T,R);c.lengthSq()<1e-4&&c.copy(h(a.T)),c.normalize();for(let e=0;e<s;e++){let n=(e/Math.max(1,s-1)-.5)*1.8+t.range(-.2,.2),r=a.T.clone().multiplyScalar(Math.cos(n)).addScaledVector(c,Math.sin(n));r.y=r.y*.3+t.range(-.1,.12),D(a.p,r,E(a.p),y*t.range(.7,1),g(a.pd))}}return Pe.trees++,m}function Ge(e){let t=A.rng(`cherry`+e.id),n=I(e.x,H(e.x,e.z),e.z),r=e.lean?I(e.lean[0],0,e.lean[1]):I(t.range(-.4,.4),0,t.range(-.4,.4)),d=e.style!==`shell`,p=d?c(t,{species:`cherry`,h:e.h,base:n,lean:r,spread:e.spread??.8,detail:e.detail??1,leaders:e.leaders,padR:e.padR,gaps:e.gaps??.36,twigDens:e.twigDens??3.2,keepOut:B}):s(t,{h:e.h,base:n,lean:r,spread:e.spread??.88,detail:e.detail??1,keepOut:B}),m=Re(`cherry`,p.branches,p.rT,e.id*17+3,{hero:e.hero}),h=p.env,g=e.clusterSize??.36,v=e.clusterSpacing??.075,y=[[1,.98,.99],[1,.93,.95],[1,.86,.9],[.98,.8,.86]];if(d)for(let e of p.pads)e.tint=y[Math.min(3,Math.floor(t.next()*t.next()*4.6))],e.v=t.range(.9,1.06);let b=(e,n,r,o=1)=>{if(de(e,.2))return;let s,c,d;if(r){u(r,e);let n=i(r,e);s=Math.min(1,Math.max(.15,(.3+.7*n)*r.shade)),c=l(r,e).lerp(R,.3).lerp(a(e,h),.3).normalize();let o=r.v*t.range(.92,1.05)*(.9+.12*n);d=[r.tint[0]*o,r.tint[1]*o*t.range(.97,1.02),r.tint[2]*o*t.range(.97,1.02)]}else{let n=f(e,h),r=(e.y-(h.c.y-h.r.y))/(2*h.r.y);s=Math.min(1,Math.max(.25,(.35+.7*Math.min(1,Math.max(0,(n-.3)/.7)))*(.75+.3*r))),c=a(e,h).lerp(R,.2).normalize();let i=t.range(.9,1.06);d=[i,i*t.range(.95,1),i*t.range(.96,1.02)]}let p=_(t),v=_(t),[y,b,x]=Fe(p,v),S=g*t.range(.75,1.2)*o;G.blossom.push(y.multiplyScalar(S),b.multiplyScalar(S),x.multiplyScalar(S),e,[m(n.pd)+.05,s,0,t.int(0,3)],c,d)};for(let e of p.twigs){let n=e.br,r=n.pd[n.pd.length-1]-n.pd[0],i=Math.max(1,Math.round(r*(1-e.t0)/v));for(let r=0;r<i;r++){let a=e.t0+(r+t.range(.2,.8))/i*(1-e.t0),s=o(n,a),c=_(t);c.y=Math.abs(c.y)*.6-.1;let l=s.p.clone().addScaledVector(c,g*.25);if(e.pad){let t=u(e.pad,l);if(t.x*t.x+t.z*t.z>1.7)continue}b(l,s,e.pad||null)}}if(d)for(let e of p.branches){if(e.level!==2||!e.pad)continue;let n=e.pd[e.pd.length-1]-e.pd[0],r=Math.round(n*2.2);for(let n=0;n<r;n++){let n=t.range(.4,.95),r=o(e,n);if(r.r>.05)continue;let i=_(t);i.y=Math.abs(i.y),b(r.p.clone().addScaledVector(i,r.r+.03),r,null,.6)}}return Pe.trees++,p}function Ke(e){let n=A.rng(`pine`+e.id),i=I(e.x,H(e.x,e.z),e.z),a=m(n,{h:e.h,base:i,leanAz:e.leanAz,lean:e.lean,nBranches:e.nBranches,hStart:e.hStart,padScale:e.padScale,reach:e.reach,topBack:e.topBack,avoid:(e.avoid||[]).concat(et),keepOut:B}),o=Re(`pine`,a.branches,a.rT,e.id*23+1,{flexK:.45,hero:e.hero}),s=(e.tuftDensity??115)*Math.min(1,(7.5/e.h)**1.3),c=(e.tuftSize??.29)*Math.max(1,Math.sqrt(e.h/7.5)),l=[[.034,.062,.032],[.044,.072,.03],[.03,.055,.034],[.052,.078,.026]],u=n.range(.9,1.12),d=n.int(0,9999),f=(e,t,r,i,a,o,s,c)=>{if(de(e,.15))return;let[l,u,d]=Fe(t,_(n));G.pine.push(l.multiplyScalar(r),u.multiplyScalar(r),d.multiplyScalar(r),e,[i,a,o,n.chance(.5)?0:2],c,s)};for(let e of a.pads){let i=Math.cos(e.yaw),a=Math.sin(e.yaw),p=e.lobes||[.1,.06,.04,0,1,2],m=e=>1+p[0]*Math.sin(3*e+p[3])+p[1]*Math.sin(5*e+p[4])+p[2]*Math.sin(8*e+p[5]),g=e=>(1-.1*e*e)*Math.sqrt(Math.max(0,1-Math.min(e,1)**10)),v=(t,n,r)=>I(e.c.x+t*i-r*a,e.c.y+n,e.c.z+t*a+r*i),y=Math.PI*e.rx*e.rz,b=o(e.pd)+.05,x=y*s,S=Math.round(x/6*1.25),C=Math.max(.1,c*.62),w=1.5/Math.max(.6,Math.sqrt(e.rx)),T=n.range(.8,1.18),E=n.range(-1,1),D=[T*(1+.2*E),T,T*(1-.18*E)];if(!Me){let r=Math.max(e.ry*.35,e.ry*.97-c*.3),i=e.ry*.55,a=l[Math.floor(n.next()*l.length)],o=.5*u*n.range(.9,1.1),s=[a[0]*o*D[0],a[1]*o*D[1],a[2]*o*D[2]];Ne.add(e.c,e.yaw,(n,a)=>{let o=Math.sin(a),s=Math.cos(a),c=t(o,.5)*m(n)*.8,l=s>=0?t(s,.42)*r:t(s,.8)*i;return[Math.cos(n)*c*e.rx,l,Math.sin(n)*c*e.rz]},(e,t)=>{let n=1-.6*Math.min(1,Math.max(0,(t/Math.PI-.38)/.4));return[s[0]*n,s[1]*n,s[2]*n]},b,e.rx>.8?14:10,e.rx>.8?8:6)}for(let t=0;t<S;t++){let t=n.range(0,O),o=m(t),s=Math.min(1.03,Math.sqrt(n.next())*1.04),p=s>.8,y=Math.cos(t),x=Math.sin(t),S=y*s*o*e.rx,T=x*s*o*e.rz,E=I(y*i-x*a,0,y*a+x*i),k=e.ry*g(s),ee=v(S,0,T),te=r(ee.x*w,e.c.y*.9+(e.sub?3.1:0),ee.z*w,d)*.75+r(ee.x*w*2.3,e.c.y,ee.z*w*2.3,d+1)*.25<(p?.3:.4),A=l[Math.floor(n.next()*l.length)],j=n.range(.82,1.18)*u*(te?.7:1);if(te){if(!n.chance(Me?.55:.15))continue;f(v(S,k-e.ry*n.range(.55,.9),T),R.clone().addScaledVector(E,.4*s).add(_(n).multiplyScalar(.3)).normalize(),c*n.range(.8,1.05),b,n.range(.1,.2),.05,[A[0]*j,A[1]*j,A[2]*j],R.clone().lerp(E,.3).normalize());continue}let M,N;if(!p)M=k-c*.18,N=R.clone().addScaledVector(E,.45*s).normalize();else{let t=n.range(-.25,1);M=Math.max(-e.ry*.4,k*t-e.ry*.15),N=E.clone().multiplyScalar(.9).addScaledVector(R,.35+.4*Math.max(0,t)).normalize()}let ne=n.int(4,8),P=h(N),F=I().crossVectors(N,P),re=v(S,M,T),ie=n.range(.85,1.15),ae=Math.min(1,Math.max(0,(M/e.ry+.4)/1.4));for(let e=0;e<ne;e++){let e=n.range(0,O),t=C*Math.sqrt(n.next()),r=n.next(),i=re.clone().addScaledVector(P,Math.cos(e)*t).addScaledVector(F,Math.sin(e)*t).addScaledVector(N,-r*c*.45),a=P.clone().multiplyScalar(Math.cos(e)).addScaledVector(F,Math.sin(e)).multiplyScalar(.55*t/C),o=N.clone().add(a).addScaledVector(R,p?.15:.25).add(_(n).multiplyScalar(.22)).normalize(),l=c*n.range(.85,1.25)*(p?1.08:1),u=Math.min(1,(p?.42+.45*ae:.62+.38*(1-.35*s))*(1-.45*r)),d=j*ie*(1-.25*r),m=[A[0]*d*D[0],A[1]*d*D[1],A[2]*d*D[2]*n.range(.9,1.15)],h=N.clone().lerp(R,.4).normalize();f(i,o,l,b,u,Math.max(0,n.range(.45,1)-r*.5),m,h)}}let k=Math.round(x*.09);for(let t=0;t<k;t++){let t=n.range(0,O),r=Math.sqrt(n.next())*.85*m(t),o=Math.cos(t),s=Math.sin(t),d=I(o*i-s*a,0,o*a+s*i),p=v(o*r*e.rx,-e.ry*n.range(.25,.5),s*r*e.rz),h=l[Math.floor(n.next()*l.length)],g=n.range(.7,1)*u;f(p,d.clone().multiplyScalar(.7).addScaledVector(R,-.5).add(_(n).multiplyScalar(.3)).normalize(),c*n.range(.7,.95),b,n.range(.14,.24),.1,[h[0]*g,h[1]*g,h[2]*g],d.clone().lerp(R,.2).normalize())}}return Pe.trees++,a}let qe=[],Je=null,Ye=e=>{try{let t=G.maple.n+G.mapleHero.n+G.mapleFar.n+G.pine.n+G.blossom.n,n=W.pine.triCount+W.maple.triCount+W.cherry.triCount,r=e.type===`pine`?Ke(e):e.type===`cherry`?Ge(e):We(e);return e.heroTree&&(Je=r),qe.push(e.type+`@`+e.x.toFixed(0)+`,`+e.z.toFixed(0)+` h`+e.h.toFixed(1)+` fol=`+(G.maple.n+G.mapleHero.n+G.mapleFar.n+G.pine.n+G.blossom.n-t)+` bark=`+(W.pine.triCount+W.maple.triCount+W.cherry.triCount-n)),r}catch(t){return console.error(`[vegetation] tree failed`,e,t.stack||t),null}},Xe=(e,t,n,r,i=0)=>{let a=I(...e),o=I(...t).sub(a).normalize(),s=I().crossVectors(o,R).normalize();return{pos:a,f:o,r:s,u:I().crossVectors(s,o).normalize(),tx:18/n,ty:10.125/n,rects:r,minD:i}},Ze=[];for(let t of[1,2,3,4,5,7,8]){let n=e[t];if(n)for(let e of n.keys){let t=Xe(e.pos,e.look,n.focal,null);t.maxD=30*Math.max(1,n.focal/24),Ze.push(t)}}let Qe=e=>{for(let t of Ze){let n=e.x-t.pos.x,r=e.y-t.pos.y,i=e.z-t.pos.z,a=n*t.f.x+r*t.f.y+i*t.f.z;if(!(a<.2||a>t.maxD)&&Math.abs(n*t.r.x+r*t.r.y+i*t.r.z)<a*t.tx*1.25&&Math.abs(n*t.u.x+r*t.u.y+i*t.u.z)<a*t.ty*1.3)return!0}return!1},$e=[[-.62,1.3,-1.3,1.3]],et=[Xe([-42.5,1.8,4.5],[-33.5,13,-7],24,$e,1.5),Xe([-41,1.8,5.5],[-33,13.5,-7.25],24,$e,1.5),Xe([-39.5,1.8,6.5],[-32.5,14,-7.5],24,$e,1.5)],K=[],q=0;for(let e of M.trees){let t={id:q++,type:e.type,x:e.at[0],z:e.at[1],h:e.h,hero:!0};(e.type===`maple`&&e.h>=9||e.type===`cherry`&&e.at[0]!==-46)&&Object.assign(t,{hero:!1,detail:.7,leafSize:.21,nodeSpacing:.07,twigDens:3}),e.type===`maple`&&e.at[0]===52&&e.at[1]===26&&(t.lean=[-.8,.8],t.spread=.58),e.type===`pine`&&e.h>=11&&(t.reach=1.1,t.nBranches=10),e.type===`pine`&&e.at[0]===40&&e.at[1]===32&&Object.assign(t,{x:30.5,z:39.8,leanAz:.6,lean:.3}),e.type===`mapleRed`&&e.at[0]===36&&e.at[1]===34&&Object.assign(t,{x:39,z:30.6,h:5.6,lean:[-3.4,-2.1],spread:.6,crownBase:.34,flexK:.35,forceNear:!0,heroMat:!0,heroTree:!0,gaps:.26,padR:1.15,droop:1.3}),K.push(t)}K.push({id:q++,type:`maple`,x:41.5,z:5,h:12,lean:[-4,5.5],crownBase:.6,spread:.44,sx:1.1,sz:1,hero:!0,frame:`shot2`,heroMat:!0,gaps:.27,padR:1.25,droop:1.4,leafSize:.19}),K.push({id:q++,type:`maple`,x:-31.5,z:6.6,h:7.6,lean:[1,-2.4],spread:.6,hero:!0,frame:`shot5`,gaps:.24}),K.push({id:q++,type:`maple`,x:-46.2,z:-3.6,h:10.5,lean:[1.4,1.6],crownBase:.6,spread:.5,sx:.85,hero:!0,frame:`shot5L`,gaps:.34,leafSize:.23,droop:1.5,padR:1.2,autumn:.45,gpal:[{w:2,c:[.16,.22,.03],ex:1},{w:1.5,c:[.24,.24,.035],ex:1},{w:1.5,c:[.1,.18,.026],ex:.4},{w:1,c:[.3,.16,.02],ex:.8},{w:.8,c:[.07,.14,.02],ex:0}]}),K.push({id:q++,type:`pine`,x:1.8,z:40.6,h:7.2,leanAz:Math.atan2(-.35,1),lean:.38,hStart:.52,nBranches:5,hero:!0,frame:`shot8`}),K.push({id:q++,type:`mapleRed`,x:17.8,z:37.8,h:4.6,lean:[-.8,-.5],hero:!0}),K.push({id:q++,type:`pine`,x:1.6,z:-7,h:3.4,lean:.35,leanAz:Math.PI*.15,padScale:.8,hStart:.22,nBranches:5,hero:!0}),K.push({id:q++,type:`pine`,x:18.4,z:-7,h:3.2,lean:.35,leanAz:Math.PI*.85,padScale:.8,hStart:.22,nBranches:5,hero:!0}),K.push({id:q++,type:`pine`,x:27.5,z:37.5,h:4.2,padScale:.85,hStart:.25}),K.push({id:q++,type:`pine`,x:-30.5,z:18.5,h:5,padScale:.9}),K.push({id:q++,type:`pine`,x:47.5,z:29.5,h:4.5,padScale:.85}),K.push({id:q++,type:`mapleRed`,x:36.5,z:-4.2,h:4.2}),K.push({id:q++,type:`mapleRed`,x:-21.5,z:-3.2,h:4});{let e=typeof location<`u`&&/vegov=([^&]+)/.exec(location.search);if(e)for(let t of decodeURIComponent(e[1]).split(`;`)){let[e,n]=t.split(`:`),r=n.split(`,`).map(Number),i=K.find(t=>t.frame===e);i&&(i.x=r[0],i.z=r[1],r[2]&&(i.h=r[2]),r.length>4&&(i.lean=[r[3],r[4]]),r.length>5&&(i.crownBase=r[5]))}}let tt=K.map(e=>({x:e.x,z:e.z,r:e.h*.45})),J=z.inner,nt=[],rt=(e,t,n,r,i)=>{for(let a=0;a<i;a++){let o=(a+.5)/i;nt.push([e+(n-e)*o,t+(r-t)*o])}};rt(J.x0+3.2,J.z0+4,J.x0+3.2,J.z1-4,11),rt(J.x1-3.2,J.z0+4,J.x1-3.2,J.z1-4,11),rt(J.x0+6,J.z0+3.2,J.x1-6,J.z0+3.2,13),rt(J.x0+6,J.z1-3,J.x1-6,J.z1-3,13);let it=[`maple`,`maple`,`pine`,`pine`,`pine`,`mapleRed`,`cherry`,`cherry`,`maple`,`pine`],Y=A.rng(`veg-fill`);for(let[e,t]of nt){let n=e+Y.range(-1.6,1.6),r=t+Y.range(-1.6,1.6),i=Y.pick(it),a=i===`pine`?Y.range(6,9.5):i===`mapleRed`?Y.range(4.5,6):i===`cherry`?Y.range(6,7.5):Y.range(7,10),o=a*.42;if(z.clearance(n,r,{pondMargin:2.5,pathMargin:1.5,lanternR:2})<1||tt.some(e=>Math.hypot(e.x-n,e.z-r)<(e.r+o)*.75))continue;tt.push({x:n,z:r,r:o});let s=i===`maple`&&((Math.floor(n*7.3)+Math.floor(r*3.1))%3+3)%3==0;K.push({id:q++,type:i,x:n,z:r,h:a,detail:.6,...s?{autumn:.5,gpal:He}:{},leafSize:i===`maple`?.26:i===`mapleRed`?.22:void 0,shellDensity:i===`maple`?2.4:3,nodeSpacing:.075,tuftSize:.42,tuftDensity:50,clusterSize:.42,nBranches:i===`pine`?Math.round(2.5+a*.3):void 0,hStart:i===`pine`?.36:void 0,reach:i===`pine`?1.12:void 0,padScale:i===`pine`?.86:void 0})}let at=typeof location<`u`&&/vegsolo=([^&]+)/.exec(location.search);at&&(K.length=0,decodeURIComponent(at[1]).split(`,`).forEach((e,t)=>{let[n,r,i]=e.split(`:`);K.push({id:500+t,type:n,x:t*14,z:0,h:+r||8,hero:!0,detail:i?+i:1})}));for(let e of K)Ye(e);let ot=[];{let t=e[9],n=t&&t.keys&&t.keys[0],r=typeof location<`u`&&/veghero=0/.test(location.search);if(n&&Je&&!at&&!r){let e=0,t=t=>{let n=null,r=1/0;for(let i of Je.branches)if(!(i.level<1))for(let a=0;a<i.pts.length;a++){if(i.rads[a]<.007)continue;let o=i.pts[a].distanceTo(t);o<r&&(r=o,n=i.pts[a],e=i.pd[a])}return n&&r<1.5?n.clone():t},r=Math.min(.2,Je.flexOf?Je.flexOf(e):.12),i=b(A.rng(`veg-hero`),{cam:n.pos,look:n.look,focus:n.focus??.62,sun:le,anchor:t,flexBase:r});i.branches.forEach((e,t)=>W.maple.addBranch(e,{flexOf:i.flexAt,seed:-(3+t*7%80),cellW:.03,radial:e=>e<.0016?5:e<.004?7:9}));let a=Math.max(1,Math.min(96,i.leaves.length)),o=[],s=[],c=[],l=new L,u=new L;for(i.leaves.forEach((e,t)=>{l.push(e.X.clone(),e.Y.clone(),e.Z.clone(),e.p,[e.flex,1,e.acc,e.cell],e.Z.clone().normalize(),e.col),t<a&&(o.push(new j.Vector4(e.p.x,e.p.y,e.p.z,e.cell)),s.push(new j.Vector4(e.X.x,e.X.y,e.X.z,1/e.X.lengthSq())),c.push(new j.Vector4(e.Y.x,e.Y.y,e.Y.z,1/e.Y.lengthSq())))});o.length<a;)o.push(new j.Vector4),s.push(new j.Vector4),c.push(new j.Vector4);for(let e of i.samaras)u.push(e.X.clone(),e.Y.clone(),e.Z.clone(),e.p,[e.flex,1,e.acc,0],e.Z.clone().normalize(),e.col);let d=performance.now(),f=x(A.rng(`veg-maple-hero-tex`),1536),p=performance.now()-d;f.anisotropy=U.anisotropy;let m=P(A,`mapleHero`,f,{hero:{n:a,A:o,X:s,Y:c,trans:[.3,.032,.016]},uniforms:{uFlushB:{value:new j.Vector3(.25,.2,.008)}},transTint:[1.75,1.2,.75],transBack:1.1,transFwd:2,transPow:5,transDepth:.4,leak:.25,leakDiffuse:.1,bend:.12,roughness:.5,accent:[.62,.17,.018],accent2:[.085,.01,.006],petiole:[.2,.04,.02],flutter:0,fatten:0,spec:.45,ao:0,skyTrans:.55,fwd2:.6,name:`macro`}),h=P(A,`maple`,pe,{transTint:[1.35,.8,.5],transBack:.65,transFwd:1.1,transDepth:.4,leak:.25,bend:.1,roughness:.55,accent:[.42,.1,.02],accent2:[.2,.03,.01],petiole:[.25,.06,.03],flutter:0,fatten:0,spec:.4,ao:0,name:`samara`}),g=l.build(j,v(),m.m,m.dm,`leaves_maple_macro`,{castShadow:!1}),_=u.build(j,y(),h.m,h.dm,`samaras_macro`,{castShadow:!1});g&&ot.push(g),_&&ot.push(_),Pe.hero=`heroTex=${p.toFixed(0)}ms heroLeaves=${i.leaves.length} samaras=${i.samaras.length} twigs=${i.branches.length}`}}if(!at&&!(typeof location<`u`&&/vegdrift=0/.test(location.search))){let t=A.rng(`veg-drift`),n={uDC:[],uDS:[],uDW:[],uDA:[],uDB:[]};for(let e=0;e<10;e++)n.uDC.push(new j.Vector4),n.uDS.push(new j.Vector4(1,1,1,.09)),n.uDW.push(new j.Vector4),n.uDA.push(new j.Vector3(.3,.02,.01)),n.uDB.push(new j.Vector3(.45,.08,.01));let r=(e,t,r,i,a,o,s,c)=>{n.uDC[e].set(t[0],t[1],t[2],1),n.uDS[e].set(r[0],r[1],r[2],o),n.uDW[e].set(i[0],i[1],i[2],Math.min(a,48)),n.uDA[e].set(s[0],s[1],s[2]),n.uDB[e].set(c[0],c[1],c[2])},i=e[9]&&e[9].keys&&e[9].keys[0];if(i){let e=I(...i.pos),t=I(...i.look).sub(e).normalize(),n=e.clone().addScaledVector(t,2.1);r(9,[n.x,n.y+1.7,n.z],[3.6,6.6,4],[.08,.36,.05],34,.085,[.34,.015,.01],[.5,.1,.012])}r(3,[-42.5,4.4,2],[9,7,9],[.16,.4,.1],40,.09,[.2,.17,.025],[.42,.13,.015]),r(5,[-8,4.6,-5.5],[8,7,8],[.14,.38,.1],36,.085,[.34,.015,.01],[.48,.09,.012]),r(0,[36.4,4.2,18.5],[8,7,9],[.12,.34,.08],26,.1,[.12,.17,.025],[.36,.2,.03]);let a=ie(j).clone(),o=new Float32Array(192),s=new Float32Array(192),c=new Float32Array(192),l=new Float32Array(144),u=new Float32Array(144);for(let e=0;e<48;e++){for(let n=0;n<4;n++)o[e*4+n]=t.next(),s[e*4+n]=t.next();c.set([0,1,t.range(.15,.85),t.int(0,3)],e*4),l.set([0,1,0],e*3),u.set([1,1,1],e*3)}a.setAttribute(`aSeed`,new j.InstancedBufferAttribute(o,4)),a.setAttribute(`aSeed2`,new j.InstancedBufferAttribute(s,4)),a.setAttribute(`aFol`,new j.InstancedBufferAttribute(c,4)),a.setAttribute(`aBend`,new j.InstancedBufferAttribute(l,3));let d={};for(let e in n)d[e]={value:n[e]};let f=P(A,`maple`,U,{vertexHead:ee,vertexWorld:te,flatNormal:!0,uniforms:d,transTint:[2.1,1.8,1],transBack:1.2,transFwd:2.4,transDepth:.5,leak:.4,bend:0,roughness:.55,accent:[.55,.2,.025],accent2:[.16,.008,.03],petiole:[.2,.05,.025],flutter:0,fatten:.15,spec:.4,ao:0,name:`drift`}),p=new j.InstancedMesh(a,f.m,48);p.instanceColor=new j.InstancedBufferAttribute(u,3),p.frustumCulled=!1,p.castShadow=!1,p.receiveShadow=!0,p.name=`leaves_drift`,ot.push(p)}let st=performance.now(),ct=new j.IcosahedronGeometry(1,2),lt=[],X=A.rng(`veg-shrubs`),Z=(e,t,n,r=`azalea`,i=.62)=>at||z.clearance(e,t,{pondMargin:.4,pathMargin:.25,lanternR:.5})<n*.6||de({x:e,y:H(e,t)+.3,z:t},n)||lt.some(r=>Math.hypot(r.x-e,r.z-t)<(r.r+n)*.72)?!1:(lt.push({x:e,z:t,r:n,kind:r,hRatio:i*X.range(.72,1.08),y:H(e,t)}),!0),ut=M.hall.stairs.frontZ+1.4;for(let[e,t]of[[-6.5,2.2],[17.8,26.5]])for(let n=e;n<=t;n+=X.range(1.3,1.9))Z(n,ut+X.range(-.4,.5),X.range(.55,.9),X.chance(.4)?`azaleaPink`:`azalea`);{let e=M.pagoda,t=e.platform.w/2+1.6;for(let[n,r]of[[-1,-1],[1,-1],[-1,1],[1,1]])for(let i=0;i<3;i++)Z(e.center[0]+n*t+X.range(-1.2,1.2),e.center[2]+r*t+X.range(-1.2,1.2),X.range(.5,.9),X.pick([`azalea`,`azalea`,`boxwood`,`azaleaPink`]))}{let e=M.pond.outline,t=0,n=[];for(let r=0;r<e.length;r++){let i=e[r],a=e[(r+1)%e.length],o=Math.hypot(a[0]-i[0],a[1]-i[1]);n.push({a:i,b:a,l:o}),t+=o}for(let e=0;e<46;e++){let r=(e+X.range(0,.8))/46*t,i=0;for(;r>n[i].l;)r-=n[i].l,i++;let{a,b:o,l:s}=n[i],c=r/s,l=a[0]+(o[0]-a[0])*c,u=a[1]+(o[1]-a[1])*c,d=l-9,f=u-20,p=Math.hypot(d,f);d/=p,f/=p;let m=X.range(1.6,3.4),h=X.range(.45,1),g=X.pick([`azalea`,`azalea`,`azaleaPink`,`boxwood`,`azaleaRed`,`azalea`]);Z(l+d*m,u+f*m,h,g),X.chance(.5)&&Z(l+d*(m+h*1.3)+X.range(-.8,.8),u+f*(m+h*1.3)+X.range(-.8,.8),h*.7,g)}}for(let e of M.stoneLanterns){let t=X.range(0,O);Z(e[0]+Math.cos(t)*1.5,e[1]+Math.sin(t)*1.5,X.range(.45,.75),X.pick([`azalea`,`boxwood`,`azaleaPink`]))}for(let e=0;e<4;e++){let t=M.pond.island,n=t[e%t.length],r=n[0]*.6+-.8+X.range(-.5,.5),i=n[1]*.6+8+X.range(-.5,.5);z.onIsland(r,i)&&!de({x:r,y:.5,z:i},.7)&&lt.push({x:r,z:i,r:X.range(.4,.65),kind:X.pick([`azalea`,`azaleaPink`]),hRatio:.6,y:H(r,i)})}for(let e=0;e<40;e++)Z(X.range(J.x0+1.5,J.x1-1.5),X.chance(.5)?X.range(J.z1-7,J.z1-1):X.range(J.z0+1,J.z0+6),X.range(.5,1.1),X.pick([`azalea`,`azalea`,`boxwood`,`azaleaPink`,`azaleaRed`]));for(let e=0;e<24;e++)Z(X.chance(.5)?X.range(J.x0+1,J.x0+5):X.range(J.x1-5,J.x1-1),X.range(J.z0+2,J.z1-2),X.range(.5,1),X.pick([`azalea`,`boxwood`,`azaleaPink`]));let dt=[],ft=[],pt=[],mt=[],ht=ct.attributes.position,gt=ct.index?ct.index.array:null,_t={azalea:[.04,.066,.018],azaleaPink:[.04,.066,.018],azaleaRed:[.04,.063,.018],boxwood:[.058,.08,.02]},vt=0;for(let e of lt){let t=Math.floor(X.range(0,999)),n=_t[e.kind],i=[{x:e.x,z:e.z,r:e.r,ry:e.r*e.hRatio}],a=e.r>.6?X.int(2,4):X.int(1,3);for(let t=0;t<a;t++){let t=X.range(0,O),n=e.r*X.range(.5,.95),r=e.r*X.range(.5,.75);i.push({x:e.x+Math.cos(t)*n,z:e.z+Math.sin(t)*n,r,ry:r*e.hRatio*X.range(.85,1.15)})}let o=e.kind===`azaleaPink`||e.kind===`azaleaRed`,s=e.kind===`boxwood`?.15:.2,c=e.kind===`boxwood`?230:190,l=(e,n,i)=>1+.2*(r(e*1.6+t,n*1.6,i*1.6,t)-.5)*2+.06*(r(e*4+t,n*4,i*4,t+3)-.5)*2;for(let t of i){let r=t.ry,a=vt;for(let i=0;i<ht.count;i++){let a=ht.getX(i),o=ht.getY(i),s=ht.getZ(i),c=l(a,o,s),u=a*t.r*c,d=o*r*c,f=s*t.r*c;d<-r*.25&&(d=-r*.25+(d+r*.25)*.15),dt.push(t.x+u,e.y+d+r*.22,t.z+f),pt.push(n[0],n[1],n[2]),ft.push(0,1,0)}if(gt)for(let e=0;e<gt.length;e++)mt.push(a+gt[e]);vt+=ht.count;let u=2*Math.PI*t.r*t.r*.8,d=Math.round(u*c);for(let n=0;n<d;n++){let n=Math.acos(1-X.next()*(1-Math.cos(1.95))),a=X.range(0,O),c=X.range(.95,1.06),u=Math.sin(n)*Math.cos(a),d=Math.cos(n),f=Math.sin(n)*Math.sin(a),p=l(u,d,f),m=d*r*p*c;m<-r*.25&&(m=-r*.25+(m+r*.25)*.15);let g=I(t.x+u*t.r*p*c,e.y+m+r*.22,t.z+f*t.r*p*c),v=!1;for(let n of i)if(n!==t&&((g.x-n.x)/n.r)**2+((g.y-e.y-n.ry*.22)/n.ry)**2+((g.z-n.z)/n.r)**2<.7){v=!0;break}if(v)continue;let y=I(u/t.r,d/r,f/t.r).normalize(),b=y.clone().add(_(X).multiplyScalar(.38)).normalize(),[x,S,C]=Fe(h(b).applyAxisAngle(b,X.range(0,O)),b),w=s*X.range(.8,1.2),T=0;e.kind===`boxwood`?T=2:o&&X.chance(n<1.3?.72:.4)&&(T=e.kind===`azaleaPink`?1:3);let E=Math.min(1,(.3+.7*Math.max(0,d*.6+.4))*(.7+.3*(c-.95)/.11)),D=X.range(.82,1.15);G.shrub.push(x.multiplyScalar(w),S.multiplyScalar(w),C.multiplyScalar(w),g,[.12,E,0,T],y,[D,D,D*X.range(.92,1.05)])}}}let Q=A.rng(`veg-ferns`),yt=[];{let e=M.pond.outline;for(let t=0;t<34;t++){let t=Q.int(0,e.length-1),n=e[t],r=e[(t+1)%e.length],i=Q.next(),a=n[0]+(r[0]-n[0])*i,o=n[1]+(r[1]-n[1])*i,s=a-9,c=o-20,l=Math.hypot(s,c);s/=l,c/=l;let u=Q.range(1,2.6),d=a+s*u,f=o+c*u;z.clearance(d,f,{pondMargin:.3,pathMargin:.2,lanternR:.6})<.3||lt.some(e=>Math.hypot(e.x-d,e.z-f)<e.r+.3)||de({x:d,y:.3,z:f},.8)||yt.push([d,f,Q.range(.45,.85)])}}for(let[e,t,n]of yt){let r=H(e,t),i=Q.int(9,15),a=Q.range(0,O);for(let o=0;o<i;o++){let s=a+o/i*O+Q.range(-.25,.25),c=I(Math.cos(s),0,Math.sin(s)),l=Q.range(.6,1.15),u=c.clone().multiplyScalar(Math.cos(l)).addScaledVector(R,Math.sin(l)).normalize(),[d,f,p]=Fe(u,c.clone().multiplyScalar(Math.sin(l)).addScaledVector(R,-Math.cos(l))),m=n*Q.range(.75,1.1),h=m*.32,g=I(e+c.x*.04,r,t+c.z*.04),_=Q.range(.85,1.1);G.fern.push(d.multiplyScalar(h),f.multiplyScalar(m),p.multiplyScalar(m),g,[.25,.75,0,0],u.clone().lerp(R,.5).normalize(),[_,_,_])}}let bt=performance.now(),$=new j.Group;$.name=`vegetation`;for(let e of[`pine`,`maple`,`cherry`]){if(!W[e].vc)continue;let t=W[e].toGeometry(),n=new j.Mesh(t,be[e].m);n.customDepthMaterial=be[e].dm,n.castShadow=!0,n.receiveShadow=!0,n.name=`bark_`+e,$.add(n)}let xt=ie(j),St=ae(j),Ct=oe(j,3),wt=se(j),Tt=ce(j),Et=[G.maple.build(j,xt,xe.m,xe.dm,`leaves_maple`),G.mapleHero.build(j,xt,Se.m,Se.dm,`leaves_maple_hero`),G.mapleFar.build(j,xt,Ce.m,Ce.dm,`leaves_maple_far`),G.pine.build(j,St,we.m,we.dm,`needles_pine`),G.blossom.build(j,Ct,Te.m,Te.dm,`blossom_cherry`),G.shrub.build(j,wt,Ee.m,Ee.dm,`leaves_shrub`),G.fern.build(j,Tt,De.m,De.dm,`fronds_fern`)];for(let e of Et.concat(ot))e&&(e.onBeforeRender=(e,t)=>re(t),$.add(e));{let e=Ne.toGeometry(j);if(e){let t=new j.Mesh(e,Ae);t.customDepthMaterial=je,t.castShadow=!0,t.receiveShadow=!0,t.name=`pine_pad_cores`,$.add(t)}}if(vt){let e=new j.BufferGeometry;e.setAttribute(`position`,new j.Float32BufferAttribute(dt,3)),e.setAttribute(`normal`,new j.Float32BufferAttribute(ft,3)),e.setAttribute(`aTint`,new j.Float32BufferAttribute(pt,3)),e.setIndex(vt>65535?new j.Uint32BufferAttribute(mt,1):new j.Uint16BufferAttribute(mt,1)),e.computeVertexNormals(),e.computeBoundingSphere();let t=new j.Mesh(e,Oe);t.castShadow=!0,t.receiveShadow=!0,t.name=`shrub_mounds`,$.add(t)}typeof location<`u`&&/vegatlas=1/.test(location.search)&&[U,me,he,ge].forEach((e,t)=>{let n=new j.MeshBasicMaterial({map:e,alphaTest:.5,side:j.DoubleSide}),r=new j.Mesh(new j.PlaneGeometry(2,2),n);r.geometry.attributes.uv.array.forEach((e,t,n)=>{t%2==1&&(n[t]=1-e)}),r.position.set(-3.3+t*2.2,2,0),$.add(r)});let Dt=W.pine.triCount+W.maple.triCount+W.cherry.triCount;return typeof location<`u`&&/vegstats=1/.test(location.search)&&console.warn(`[vegetation] per tree: `+qe.join(` | `)),console.warn(`[vegetation] trees=${Pe.trees} barkTris=${Dt} leaves=${G.maple.n}+${G.mapleHero.n}+${G.mapleFar.n} tufts=${G.pine.n} blossoms=${G.blossom.n} shrubCards=${G.shrub.n} mounds=${lt.length} coreTris=${Ne.tris} fronds=${G.fern.n} ${Pe.hero||``} | tex ${(ye-F).toFixed(0)}ms trees ${(st-ye).toFixed(0)}ms shrubs ${(bt-st).toFixed(0)}ms total ${(performance.now()-F).toFixed(0)}ms`),{object:$,showcase:[{cam:[49.5,2.75,18.5],look:[-30,12,-3],focal:24},{cam:[-25.5,2,-.5],look:[-31.5,14.5,-8],focal:22},{cam:[10,1.8,50],look:[-12,10,-12],focal:70}]}}export{B as build};