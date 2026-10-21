import{r as e}from"./three.module-BV3CphtV.js";import{qa as t,ta as n}from"./three.core-Dp-eO7LC.js";var r=`vec3 objectNormal = vec3(0.0, 1.0, 0.0);`,i=`
${r}
attribute vec4 aRel;
attribute vec4 aTag;
attribute vec3 aSmooth;
varying vec4 vRel;
varying vec4 vTag;
varying vec3 vFire;
uniform float uMossDisp;
uniform float uMoss;
`,a=`
  vRel = aRel; vTag = aTag;
  {
    vec4 fc = vec4(0.0, aTag.w, 0.0, 1.0);
    #ifdef USE_INSTANCING
      fc = instanceMatrix * fc;
    #endif
    vFire = (modelMatrix * fc).xyz;
    vec3 nn = aSmooth;   // welded normal: identical for coincident vertices -> crack free
    #ifdef USE_INSTANCING
      nn = mat3(instanceMatrix) * nn;
    #endif
    vec3 wn = normalize(mat3(modelMatrix) * nn + vec3(0.0, 1e-5, 0.0));
    float up = smoothstep(0.2, 0.85, wn.y);
    float mb = aTag.z * uMoss;
    float mn = n_fbm3(wPos4.xyz * 2.3 + 3.7, 4) * 0.5 + 0.5;
    float mn2 = n_fbm3(wPos4.xyz * 7.0 + 1.1, 3) * 0.5 + 0.5;
    float mm = smoothstep(0.58 - 0.26 * mb, 0.74 - 0.14 * mb, mn * 0.75 + mn2 * 0.35 + up * 0.18 * mb) * up * clamp(mb, 0.0, 1.0);
    float clump = n_fbm3(wPos4.xyz * 13.0, 2) * 0.5 + 0.5;
    wPos4.xyz += wn * uMossDisp * smoothstep(0.1, 0.6, mm) * (0.3 + 0.7 * clump);
  }
`,o=`
varying vec4 vRel;
varying vec4 vTag;
varying vec3 vFire;
uniform float uMoss;
uniform float uLichen;
uniform float uDirt;
uniform vec3 uFireCol;
uniform float uFireI;
uniform vec3 uTint;
float g_h; float g_moss; float g_relH; float g_relSh; float g_cav; float g_wet;

float pr_sdBox(vec2 p, vec2 b){ vec2 d = abs(p) - b; return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0); }
// koza-ma (cusped arch panel) signed distance, p centred, hs = half size
float pr_kozama(vec2 p, vec2 hs){
  float W = hs.x, H = hs.y;
  float ax = abs(p.x) / W;
  // top contour: ogee rising from low shoulders to a pointed central tip
  float top = H * (0.5 + 0.38 * (1.0 - smoothstep(0.0, 1.0, ax)));
  top += H * 0.12 * pow(max(0.0, 1.0 - ax / 0.1), 1.3);
  // shoulders roll over into the sides
  top -= H * 0.18 * smoothstep(0.82, 1.0, ax);
  // bottom contour: flat with a pointed upward tongue flanked by concave arcs
  float bot = -H + H * 0.3 * pow(max(0.0, 1.0 - ax / 0.22), 1.6);
  float d = max(abs(p.x) - W, max(p.y - top, bot - p.y));
  d = max(d, -(length(vec2(abs(p.x), p.y) - vec2(W + 0.13 * H * 0.3, 0.12 * H)) - 0.13 * H)); // side cusps
  return d;
}
// carved relief height in metres (negative = recessed). uv 0..1 on a face of size sz (m)
float pr_relief(vec2 uv, vec2 sz, float pat){
  if (pat < 0.5) return 0.0;
  vec2 p = (uv - 0.5) * sz;
  if (pat < 1.5) {
    // koza-ma recess
    vec2 hs = sz * 0.5 - vec2(max(0.022, sz.x * 0.11), max(0.018, sz.y * 0.16));
    if (hs.x <= 0.01 || hs.y <= 0.01) return 0.0;
    float d = pr_kozama(p, hs);
    return -0.011 * smoothstep(0.0, -0.005, d);
  }
  if (pat < 2.5) {
    // framed panel with a raised flower and leaves (karahana)
    vec2 hs = sz * 0.5 - vec2(max(0.018, sz.x * 0.09), max(0.018, sz.y * 0.07));
    if (hs.x <= 0.01 || hs.y <= 0.01) return 0.0;
    float fld = smoothstep(0.0, -0.004, pr_sdBox(p, hs));
    float R = min(hs.x, hs.y) * 0.78;
    vec2 c = p;
    float r = length(c), a = atan(c.y, c.x);
    float pr = R * (0.42 + 0.58 * pow(abs(cos(a * 3.0)), 0.55));
    float fl = smoothstep(0.003, -0.002, r - pr);
    float vein = 1.0 - 0.5 * smoothstep(0.004, 0.0, abs(sin(a * 3.0)) * r) * step(R * 0.3, r);
    float boss = smoothstep(0.003, -0.002, r - R * 0.24);
    float ring = smoothstep(0.004, 0.0, abs(r - R * 0.24) - 0.002);
    // leaves toward the long axis
    vec2 lp = vec2(abs(p.x), abs(p.y));
    float along = hs.x > hs.y ? lp.x : lp.y;
    float across = hs.x > hs.y ? lp.y : lp.x;
    float lmax = max(hs.x, hs.y);
    float lt = clamp((along - R * 0.9) / max(lmax - R * 0.9, 1e-3), 0.0, 1.0);
    float lw = 0.75 * min(hs.x, hs.y) * sin(3.14159 * lt) * 0.6;
    float leaf = smoothstep(0.003, -0.002, across - lw) * step(R * 0.9, along) * step(along, lmax - 0.004);
    float h = -0.009 * fld + fld * (0.0075 * fl * vein + 0.003 * boss - 0.0015 * ring + 0.0055 * leaf);
    return h;
  }
  if (pat < 3.5) {
    // horizontal band of beads (renju) for friezes
    float per = 0.045;
    float x = mod(p.x, per) - per * 0.5;
    float bead = smoothstep(0.0, -0.003, length(vec2(x, p.y)) - min(sz.y * 0.28, 0.012));
    float lines = smoothstep(0.003, 0.0, abs(abs(p.y) - sz.y * 0.4));
    return 0.004 * bead - 0.003 * lines;
  }
  if (pat < 4.5) {
    // karakusa frieze: a sunk field with a raised undulating vine, curling
    // tendrils in every half wave, small leaves and berry bosses
    vec2 hs = sz * 0.5 - vec2(max(0.016, sz.x * 0.05), max(0.013, sz.y * 0.13));
    if (hs.x <= 0.01 || hs.y <= 0.01) return 0.0;
    float fld = smoothstep(0.0, -0.003, pr_sdBox(p, hs));
    float nW = max(2.0, floor(hs.x * 2.0 / (hs.y * 2.4) + 0.5));
    float per = hs.x * 2.0 / nW;
    float ph = (p.x + hs.x) / per * 6.2831853;
    float A = hs.y * 0.42;
    float yv = A * sin(ph);
    float slope = A * 6.2831853 / per * cos(ph);
    float dv = abs(p.y - yv) * inversesqrt(1.0 + slope * slope);
    float vine = smoothstep(0.0034, 0.0016, dv);
    float hc = floor((p.x + hs.x) / (per * 0.5));
    float sg = mod(hc, 2.0) < 0.5 ? -1.0 : 1.0;          // curl opposite to the crest
    vec2 c = vec2(-hs.x + (hc + 0.5) * per * 0.5, sg * A * 0.55);
    vec2 d = p - c;
    float r = length(d), a = atan(d.y, d.x) * sg;
    float R0 = min(hs.y * 0.5, per * 0.2);
    float kk = R0 / (6.2831853 * 1.35);
    float sp = abs(fract((r / kk - a) / 6.2831853) - 0.5) * 6.2831853 * kk;
    float spiral = smoothstep(0.0028, 0.0011, sp) * smoothstep(R0, R0 * 0.85, r) * smoothstep(R0 * 0.08, R0 * 0.2, r);
    float eye = smoothstep(R0 * 0.2, R0 * 0.1, r);
    // leaf: a lens shape springing from the vine toward the field edge between curls
    vec2 lc = vec2(-hs.x + (hc + 1.0) * per * 0.5, -sg * A * 0.15);
    vec2 lq = p - lc;
    float la = 0.7 * sg;
    lq = mat2(cos(la), -sin(la), sin(la), cos(la)) * lq;
    float lw = R0 * 0.75, lh = R0 * 0.28;
    float leafD = length(vec2(lq.x / lw, lq.y / (lh * (1.0 - 0.7 * abs(lq.x) / lw + 0.3))));
    float leaf = smoothstep(1.0, 0.82, leafD) * (1.0 - 0.45 * smoothstep(0.0012, 0.0, abs(lq.y)));
    float berry = smoothstep(0.0045, 0.0025, length(p - vec2(c.x + per * 0.22, -sg * A * 0.75)));
    float raised = max(max(vine, spiral), max(max(eye, leaf * 0.85), berry));
    return -0.008 * fld + fld * 0.0068 * raised;
  }
  return 0.0;
}

`,s=`
{
  vec3 wp = vWPos; vec3 wn = normalize(vWNrm);
  float fpS = 1.0 - smoothstep(0.0015, 0.008, length(fwidth(wp)));   // footprint fade for sub-cm detail
  float fpC = 1.0 - smoothstep(0.0012, 0.005, length(fwidth(wp)));   // moss cushion pattern fade (grazing / distant)
  float pat = floor(vTag.x + 0.5);
  g_relH = pr_relief(vRel.xy, vRel.zw, pat);
  g_cav = clamp(-g_relH / 0.011, 0.0, 1.0);
  // --- granite body: warm mid grey, mottled ---
  float big = n_fbm3(wp * 0.9, 3);
  float mid = n_fbm3(wp * 4.0 + 1.3, 3);
  float spA = n_snoise3(wp * 95.0), spB = n_snoise3(wp * 140.0 + 7.0), spC = n_snoise3(wp * 24.0 + 2.0);
  vec3 col = vec3(0.30, 0.29, 0.268) * uTint * (0.80 + 0.26 * big + 0.12 * mid);
  col = mix(col, vec3(0.05, 0.048, 0.045), smoothstep(0.58, 0.9, spA) * 0.6 * (0.3 + 0.7 * fpS));
  col = mix(col, vec3(0.58, 0.565, 0.53), smoothstep(0.55, 0.9, spB) * 0.5 * (0.3 + 0.7 * fpS));
  col = mix(col, vec3(0.33, 0.27, 0.23), smoothstep(0.3, 0.8, spC) * 0.25);
  // run-off streaks + grime (darker, browner), stronger on vertical faces
  float vert = 1.0 - abs(wn.y);
  float streak = n_fbm3(wp * vec3(11.0, 0.7, 11.0), 3);
  col *= 1.0 - smoothstep(-0.1, 0.55, streak) * 0.45 * uDirt * (0.35 + 0.65 * vert);
  col = mix(col, col * vec3(0.72, 0.66, 0.56), smoothstep(-0.25, 0.45, mid) * 0.45 * uDirt);
  // sheltered undersides collect soot-dark grime
  col *= 1.0 - smoothstep(0.1, 0.9, -wn.y) * 0.45 * uDirt;
  // crustose lichen: pale grey-green rosettes, ochre/orange spots, dark spots
  vec2 wl = n_worley3(wp * 6.5);
  float lA = smoothstep(0.44, 0.14, wl.x) * smoothstep(0.0, 0.5, n_fbm3(wp * 1.6 + 5.0, 3) * 0.5 + 0.5);
  lA *= 0.75 + 0.25 * smoothstep(0.0, 0.4, n_snoise3(wp * 40.0));
  col = mix(col, vec3(0.56, 0.57, 0.51) * (0.85 + 0.25 * spB * fpS), lA * 0.8 * uLichen);
  // large pale crustose lichen blooms (chalky white-grey patches on the vertical faces)
  float lW = smoothstep(0.56, 0.74, n_fbm3(wp * 3.1 + 9.0, 4) * 0.5 + 0.5 + 0.1 * (n_fbm3(wp * 14.0 + 2.0, 2)));
  lW *= 0.55 + 0.45 * vert;
  col = mix(col, vec3(0.66, 0.66, 0.61) * (0.9 + 0.15 * spC), lW * 0.6 * uLichen);
  vec2 wl2 = n_worley3(wp * 15.0 + 3.0);
  float lB = smoothstep(0.32, 0.1, wl2.x) * smoothstep(0.5, 0.78, n_fbm3(wp * 2.3 + 1.0, 3) * 0.5 + 0.5);
  col = mix(col, vec3(0.52, 0.33, 0.08), lB * 0.7 * uLichen);
  float lC = smoothstep(0.26, 0.1, n_worley3(wp * 48.0 + 9.0).x) * smoothstep(0.55, 0.8, n_fbm3(wp * 3.1 + 4.0, 2) * 0.5 + 0.5);
  col = mix(col, vec3(0.06, 0.058, 0.05), lC * 0.45 * uLichen);
  // --- moss: clumpy cushions on up-facing surfaces, dark green with yellow-green sunlit tips ---
  float up = smoothstep(0.15, 0.85, wn.y);
  float mb = vTag.z * uMoss;
  float mn = n_fbm3(wp * 2.3 + 3.7, 4) * 0.5 + 0.5;
  float mn2 = n_fbm3(wp * 7.0 + 1.1, 3) * 0.5 + 0.5;
  float mfine = n_snoise3(wp * 26.0) * 0.5 + 0.5;
  float mm = smoothstep(0.58 - 0.26 * mb, 0.74 - 0.14 * mb, mn * 0.75 + mn2 * 0.35 + up * 0.18 * mb + g_cav * 0.08 * mb);
  mm *= clamp(up * 1.1 + g_cav * 0.25 + 0.06, 0.0, 1.0) * clamp(mb, 0.0, 1.0);
  // cushion micro-structure: domed clumps (~2 cm) with tiny leaf tips
  float cush = 0.0, tips = 0.5;
  if (mm > 0.02) {
    vec3 wq = wp + vec3(n_snoise3(wp * 9.0), n_snoise3(wp * 9.0 + 4.0), n_snoise3(wp * 9.0 + 8.0)) * 0.012 + vec3(n_snoise3(wp * 4.1 + 2.0), 0.0, n_snoise3(wp * 4.1 + 6.0)) * 0.02;
    vec2 cw = n_worley3(wq * 38.0 + vec3(0.0, 3.0, 0.0));
    vec2 cw2 = n_worley3(wq * 95.0 + 1.7);
    cush = (1.0 - smoothstep(0.05, 0.95, cw.x)) * mix(0.55, 0.7, fpC) + (1.0 - smoothstep(0.1, 0.9, cw2.x)) * 0.3 * fpC + 0.15 * (1.0 - fpC);
    tips = mix(0.5, n_snoise3(wp * 210.0) * 0.5 + 0.5, fpS);
  }
  g_moss = smoothstep(0.14, 0.5, mm * (0.7 + 0.45 * cush + 0.2 * mfine));
  vec3 mossA = vec3(0.024, 0.042, 0.010), mossB = vec3(0.115, 0.165, 0.028), mossC = vec3(0.14, 0.125, 0.05);
  float mt = smoothstep(0.2, 0.9, n_snoise3(wp * 5.0) * 0.5 + 0.5 + up * 0.1);
  vec3 mossCol = mix(mossA, mossB, mt * (0.35 + 0.65 * cush));
  mossCol = mix(mossCol, mossC, smoothstep(0.62, 0.92, n_snoise3(wp * 9.0 + 2.0) * 0.5 + 0.5) * 0.7);
  mossCol *= 0.72 + 0.4 * tips;
  // thin moss film around the cushions
  float film = smoothstep(0.0, 0.25, mm) * (1.0 - g_moss);
  col = mix(col, col * vec3(0.55, 0.62, 0.38), film * 0.55);
  col = mix(col, mossCol, g_moss);
  g_cav = max(g_cav, g_moss * (1.0 - cush) * 0.5);
  // relief cavity & grime in recesses
  col *= 1.0 - g_cav * 0.32;
  // aTag.w < -50 encodes "no fire box" + darkness (pebbles / wet river stones)
  if (vTag.w < -50.0) col *= 1.0 - 0.8 * clamp((-vTag.w - 100.0) / 10.0, 0.0, 1.0);
  // damp darker foot
  g_wet = (1.0 - smoothstep(0.0, 0.3, wp.y)) * 0.6;
  col *= 1.0 - g_wet * 0.35;
  // pattern 5: weathered dark-wood kumiko lattice inside the windows
  if (pat > 4.5 && pat < 5.5) col = vec3(0.085, 0.058, 0.04) * (0.8 + 0.3 * mid + 0.15 * big);
  diffuseColor.rgb *= col;
  g_h = big * 0.25 + mid * 0.2 + lA * 0.12 + lB * 0.08;
  // granular micro relief + moss cushions (metres), used by fragNormal

  g_relH += (0.0004 * spA * fpS + 0.0003 * spB * fpS + 0.0009 * n_snoise3(wp * 23.0) + 0.0016 * mid) * (1.0 - g_moss);
  g_relH += g_moss * (cush * 0.0038 + tips * 0.0008 + mfine * 0.0025);
}
`,c=`
{
  normal = n_bumpView(-vViewPosition, normal, g_relH + g_h * 0.0025, 1.0);
  g_relSh = 1.0;
  float pat = floor(vTag.x + 0.5);
  g_relH = pr_relief(vRel.xy, vRel.zw, pat);
  if (pat > 0.5) {
    vec2 uvm = vRel.xy * vRel.zw;
    vec3 dpx = dFdx(vWPos), dpy = dFdy(vWPos);
    vec2 dtx = dFdx(uvm), dty = dFdy(uvm);
    float det = dtx.x * dty.y - dtx.y * dty.x;
    vec3 Nw = normalize(vWNrm);
    vec3 S = normalize(uSunDir);
    float sn = dot(S, Nw);
    if (abs(det) > 1e-14 && sn > 0.0) {
      vec3 T = normalize((dpx * dty.y - dpy * dtx.y) / det);
      vec3 B = normalize((dpy * dtx.x - dpx * dty.x) / det);
      vec2 st = vec2(dot(S, T), dot(S, B)) / max(sn, 0.12);
      float h0 = g_relH;
      float occ = 0.0;
      for (int k = 1; k <= 6; k++) {
        float dz = 0.0026 * float(k);
        vec2 q = uvm + st * dz;
        float hq = pr_relief(q / vRel.zw, vRel.zw, pat);
        occ = max(occ, smoothstep(0.0, 0.0015, hq - (h0 + dz)));
      }
      g_relSh = 1.0 - occ * 0.92;
    }
  }
}
`,l=`
if (vTag.y > 0.5) {
  vec3 L = vFire - vWPos; float d2 = max(dot(L, L), 1e-4);
  float ndl = dot(normalize(vWNrm), L * inversesqrt(d2));
  float flick = 0.975 + 0.025 * sin(uTime * 2.1 + vFire.x * 3.1) * sin(uTime * 1.3 + vFire.z * 1.7);
  float wrap = clamp(ndl * 0.85 + 0.15, 0.0, 1.0) * step(-0.2, ndl);
  totalEmissiveRadiance += diffuseColor.rgb * uFireCol * uFireI * flick * wrap / (d2 * 30.0 + 0.35);
}
`,u=`
reflectedLight.directDiffuse *= g_relSh;
reflectedLight.directSpecular *= g_relSh;
// moss is fuzzy & translucent: soft sheen at grazing view + subsurface warmth under direct sun
{
  vec3 V = normalize(cameraPosition - vWPos);
  vec3 Nw = normalize(vWNrm);
  float fres = pow(1.0 - clamp(dot(V, Nw), 0.0, 1.0), 3.0);
  reflectedLight.directDiffuse += reflectedLight.directDiffuse * g_moss * (0.35 + fres * 0.8) * vec3(0.9, 1.0, 0.45);
}
`;function d(){return{vertexHead:i,vertexWorld:a,fragHead:o,fragColor:s,fragRough:`roughnessFactor = clamp(mix(0.74, 0.96, g_moss) + g_cav * 0.05 - g_wet * 0.15, 0.3, 1.0);`,fragNormal:c,fragEmissive:l,fragLight:u}}var f=`
${r}
attribute vec4 aRel;
attribute vec4 aTag;
varying vec4 vRel;
varying vec4 vTag;
`,p=`
varying vec4 vRel;
varying vec4 vTag;
uniform float uPaperI;
uniform vec3 uPaperHot;
uniform vec3 uPaperEdge;
`,m=`
{
 float style0 = floor(vTag.x + 0.5);
 float fpP = 1.0 - smoothstep(0.0015, 0.006, length(fwidth((vRel.xy - 0.5) * vRel.zw)));   // paper fibres fade before they alias
 if (style0 > 2.5) {
  // the candle inside the fire box: 3 = flame (vRel.y 0 base .. 1 tip), 4 = wax
  float v = vRel.y;
  float fl = 0.97 + 0.03 * sin(uTime * 2.2 + vWPos.x * 7.0) * sin(uTime * 1.4 + vWPos.z * 5.0);
  if (style0 < 3.5) {
    vec3 c = mix(vec3(1.0, 0.86, 0.56), vec3(1.0, 0.42, 0.08), smoothstep(0.4, 1.0, v));
    c = mix(vec3(0.12, 0.14, 0.35), c, smoothstep(0.02, 0.2, v));
    diffuseColor.rgb = c * uPaperI * 3.2 * fl;
  } else {
    diffuseColor.rgb = vec3(1.0, 0.6, 0.3) * uPaperI * (0.05 + 0.45 * pow(clamp(v, 0.0, 1.0), 8.0)) * fl;
  }
 } else {
  vec2 uv = vRel.xy;
  vec2 q0 = (uv - 0.5) * vRel.zw;                 // local metres on the paper
  float ed = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
  float edge = smoothstep(0.0, 0.14, ed);
  float fiber = mix(0.5, n_fbm(uv * vRel.zw * vec2(160.0, 110.0), 3) * 0.5 + 0.5, fpP);
  float fib2 = mix(0.5, n_snoise(uv * vRel.zw * vec2(30.0, 420.0)) * 0.5 + 0.5, fpP);
  float style = floor(vTag.x + 0.5);
  float t = uTime;
  float flick = 0.982 + 0.018 * sin(t * 2.3 + vWPos.x * 5.0) * sin(t * 1.4 + vWPos.z * 3.0);
  // view parallax in the paper plane (basic material: normal from screen derivatives)
  vec3 nP = normalize(cross(dFdx(vWPos), dFdy(vWPos)));
  vec3 V = normalize(cameraPosition - vWPos);
  if (dot(nP, V) < 0.0) nP = -nP;
  vec3 Tp = normalize(cross(vec3(0.0, 1.0, 0.0), nP));
  float vn = max(dot(V, nP), 0.12);
  vec2 off = vec2(dot(V, Tp), dot(V, cross(nP, Tp))) / vn;
  // candle on the fire-box floor: flame below the window centre, D behind the paper
  float D = max(vTag.z, 0.04);
  vec2 fp = vec2(0.0, -vTag.y);
  vec2 q = q0 - fp;
  float De = D * 0.5;      // inner reflections of the fire box keep the hot spot tight
  float E = De * De / (dot(q * vec2(1.0, 0.75), q * vec2(1.0, 0.75)) + De * De); E *= sqrt(E);
  vec2 s = q0 - off * (D * 0.2) - fp;   // diffused image of the flame: reduced parallax
  float fh = 0.034, fw = 0.011, blur = 0.007;
  s.x -= 0.003 * sin(t * 2.7 + vWPos.z * 3.0) * smoothstep(-fh, fh, s.y);
  float tip = clamp(s.y / fh * 0.5 + 0.5, 0.0, 1.0);
  float wdt = fw * mix(1.0, 0.22, tip * tip) + blur;
  float fd = length(vec2(s.x / wdt, (s.y + fh * 0.15) / (fh + blur)));
  float core = exp(-fd * fd * 2.4);
  float halo = exp(-dot(s, s) / (0.06 * 0.06));
  // candle body: a soft darker column under the flame, faintly lit at the top
  float cw = 0.017;
  float candle = (1.0 - smoothstep(cw - 0.006, cw + 0.004, abs(s.x))) * (1.0 - smoothstep(-fh * 1.15, -fh * 0.85, s.y));
  float wax = candle * exp(-max(-(s.y + fh), 0.0) * 40.0);
  // shadows of the inner lattice (kumiko) on the paper
  float bars = 1.0;
  if (style < 1.5) {
    vec2 w = vRel.zw;
    float nx = style > 0.5 ? 4.0 : 3.0;
    float bx = abs(fract(uv.x * nx) - 0.5) * w.x / nx;          // metres from the nearest bar
    float by = abs(fract(uv.y * 4.0) - 0.5) * w.y / 4.0;
    float hx = w.x / nx * 0.5, hy = w.y / 8.0;
    bars = 1.0 - 0.5 * smoothstep(hx - 0.007, hx - 0.002, bx) - 0.32 * smoothstep(hy - 0.006, hy - 0.0015, by);
  }
  vec3 colr = mix(uPaperEdge, uPaperHot, smoothstep(0.25, 0.95, E));
  float I = uPaperI * (0.26 + 0.62 * E) * (0.68 + 0.32 * edge) * (0.88 + 0.12 * fiber) * (0.96 + 0.04 * fib2) * flick;
  I *= 1.0 - 0.35 * candle * (1.0 - wax);
  vec3 L = colr * I * bars;
  L += vec3(1.0, 0.7, 0.36) * uPaperI * (3.0 * core + 0.3 * halo + 0.5 * wax) * flick * mix(1.0, bars, 0.35);
  if (style > 1.5) L *= 0.6;
  diffuseColor.rgb = L;
 }
}
`;function h(){return{vertexHead:f,vertexWorld:`vRel = aRel; vTag = aTag;`,fragHead:p,fragColor:m}}var g=`
${r}
attribute vec4 aRel;
attribute vec4 aTag;
varying vec4 vRel;
varying vec4 vTag;
uniform float uSway;
uniform float uSway2;
uniform float uSwayFreq;
vec3 pr_rot(vec3 v, vec3 ax, float a){
  float c = cos(a), s = sin(a);
  return v * c + cross(ax, v) * s + ax * dot(ax, v) * (1.0 - c);
}
`,_=`
  vRel = aRel; vTag = aTag;
  #ifdef USE_INSTANCING
  if (aTag.z > 0.5) {
    vec3 hook = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
    float ph = n_hash12(hook.xz * 1.37 + hook.y) * 6.2831;
    float t = uTime;
    float gust = 0.55 + 0.45 * sin(t * 0.29 + ph) * sin(t * 0.13 + hook.x * 0.05 + 1.0);
    vec2 wd = normalize(uWindDir);
    vec3 axA = vec3(-wd.y, 0.0, wd.x);
    vec3 axB = vec3(wd.x, 0.0, wd.y);
    float a1 = uSway * gust * (sin(t * uSwayFreq + ph) * 0.75 + sin(t * uSwayFreq * 1.71 + ph * 2.3) * 0.25) + uSway * 0.35 * gust;
    float b1 = uSway * 0.35 * gust * sin(t * uSwayFreq * 0.83 + ph * 1.7);
    vec3 p = wPos4.xyz;
    vec3 nW = vWNrm;
    if (aTag.z > 1.5) {
      vec3 piv = (modelMatrix * instanceMatrix * vec4(0.0, aTag.w, 0.0, 1.0)).xyz;
      float a2 = uSway2 * gust * (sin(t * uSwayFreq * 1.93 + ph * 3.1) * 0.7 + sin(t * uSwayFreq * 3.1 + ph) * 0.3) + uSway2 * 0.4 * gust;
      float b2 = uSway2 * 0.5 * gust * sin(t * uSwayFreq * 1.37 + ph * 0.7);
      float tw = uSway2 * 1.6 * gust * sin(t * uSwayFreq * 0.71 + ph * 1.3);
      p = piv + pr_rot(p - piv, vec3(0.0, 1.0, 0.0), tw);
      p = piv + pr_rot(p - piv, axA, a2);
      p = piv + pr_rot(p - piv, axB, b2);
      nW = pr_rot(pr_rot(pr_rot(nW, vec3(0.0, 1.0, 0.0), tw), axA, a2), axB, b2);
    }
    p = hook + pr_rot(p - hook, axA, a1);
    p = hook + pr_rot(p - hook, axB, b1);
    nW = pr_rot(pr_rot(nW, axA, a1), axB, b1);
    wPos4.xyz = p;
    vWNrm = nW;
    #ifdef PROPS_LIT
      vNormal = normalize((viewMatrix * vec4(nW, 0.0)).xyz);
    #endif
  }
  #endif
`,v=`
varying vec4 vRel;
varying vec4 vTag;
uniform float uWear;
float g_h; float g_r; float g_m;
`,y=`
{
  vec3 wp = vWPos;
  float fpv = length(fwidth(wp));            // pixel footprint (uniform control flow)
  float mt = floor(vTag.y + 0.5);
  float n = n_fbm3(wp * 7.0, 3);
  float n2 = n_fbm3(wp * 1.6 + 4.0, 3);
  float fine = n_snoise3(wp * 60.0);
  vec3 c; float r, m;
  if (mt < 0.5) {            // blackened bronze (patina), warm metal shows through where worn
    c = vec3(0.034, 0.025, 0.018) * (0.8 + 0.35 * n);
    float pat = smoothstep(0.0, 0.6, n2);
    c = mix(c, vec3(0.022, 0.028, 0.024), pat * 0.5);
    float wear = smoothstep(0.66, 0.9, n * 0.5 + 0.5) * uWear;
    c = mix(c, vec3(0.38, 0.25, 0.11), wear * 0.5);
    r = 0.46 + 0.1 * n + 0.1 * pat - wear * 0.15; m = mix(0.4, 0.25, pat) + wear * 0.45;
    // verdigris: chalky blue-green bloom where rain water lingers (up-facing, unworn),
    // band-limited by the pixel footprint so it never sparkles at distance

    float vn = n_fbm3(wp * 23.0 + 7.0, 3) * (1.0 - smoothstep(0.004, 0.03, fpv));
    float vg = smoothstep(0.42, 0.8, vn * 0.5 + 0.5 + 0.22 * max(normalize(vWNrm).y, 0.0) + 0.12 * n2 - 0.3 * wear);
    c = mix(c, vec3(0.085, 0.165, 0.135) * (0.8 + 0.3 * n), vg * 0.6);
    r = mix(r, 0.82, vg * 0.85); m = mix(m, 0.0, vg * 0.9);
  } else if (mt < 1.5) {     // gilt bronze
    c = vec3(1.0, 0.71, 0.31) * (0.9 + 0.14 * n);
    float tar = smoothstep(0.25, 0.85, n2 * 0.5 + 0.5);
    c = mix(c, vec3(0.50, 0.33, 0.13), tar * 0.32);
    r = 0.17 + 0.09 * n + 0.08 * tar; m = 1.0;
  } else if (mt < 2.5) {     // bell bronze: warm golden bronze with dark patina streaks
    c = vec3(0.72, 0.48, 0.2) * (0.85 + 0.22 * n);
    float pat = smoothstep(-0.05, 0.65, n_fbm3(wp * vec3(11.0, 2.2, 11.0) + 2.0, 3));
    c = mix(c, vec3(0.09, 0.085, 0.058), pat * 0.6);
    float verd = smoothstep(0.55, 0.85, n2 * 0.5 + 0.5) * pat;
    c = mix(c, vec3(0.07, 0.13, 0.10), verd * 0.45);
    r = 0.24 + 0.3 * pat + 0.05 * n; m = mix(1.0, 0.3, pat * 0.7);
  } else if (mt < 3.5) {     // black lacquer
    c = vec3(0.018, 0.016, 0.014) * (0.9 + 0.2 * n);
    r = 0.22 + 0.08 * n; m = 0.0;
  } else {                   // incense sticks (pressed wood powder)
    c = vec3(0.16, 0.06, 0.03) * (0.85 + 0.3 * n);
    r = 0.85; m = 0.0;
  }
  diffuseColor.rgb *= c;
  // micro relief fades out once a pixel covers more than ~1 cm (no specular sparkle)
  float fpm = 1.0 - smoothstep(0.002, 0.012, length(fwidth(wp)));
  g_r = r + (1.0 - fpm) * 0.04; g_m = m; g_h = n * 0.6 + fine * 0.15 * fpm;
}
`;function b({sway:e=!0}={}){return{vertexHead:g,vertexWorld:e?_:`vRel = aRel; vTag = aTag;`,fragHead:v,fragColor:y,fragRough:`roughnessFactor = g_r;`,fragMetal:`metalnessFactor = g_m;`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.0004);`,defines:{PROPS_LIT:``}}}function x(){return{vertexHead:g,vertexWorld:_}}var S=g+`
attribute float iStyle;
varying float vStyle;
`,C=_+`
  vStyle = iStyle;
`,w=`
varying vec4 vRel;
varying vec4 vTag;
varying float vStyle;
uniform float uGlowI;
uniform vec3 uGlowHot;
uniform vec3 uGlowEdge;
float g_open; float g_gold; float g_mh; vec3 g_emit;

vec2 pn_hexLocal(vec2 p){
  const vec2 r = vec2(1.0, 1.7320508);
  vec2 h = r * 0.5;
  vec2 a = mod(p, r) - h;
  vec2 b = mod(p - h, r) - h;
  return dot(a, a) < dot(b, b) ? a : b;
}
float pn_hexD(vec2 g){ g = abs(g); return max(dot(g, vec2(0.5, 0.8660254)), g.x); }
float pn_sdBox(vec2 p, vec2 b){ vec2 d = abs(p) - b; return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0); }

// metal mask (1 = metal, 0 = open). p in metres centred; hs half size. gold: gilt mask
float pn_mask(vec2 p, vec2 hs, float style, float kind, float aa, out float gold){
  gold = 0.0;
  if (kind > 1.5) {
    // frieze: row of cusped arches
    float per = 0.032;
    float x = mod(p.x + per * 0.5, per) - per * 0.5;
    float y = p.y + hs.y;
    float hh = hs.y * 2.0;
    float arch = length(vec2(x, max(y - hh * 0.45, 0.0)) * vec2(1.0, 0.9)) - per * 0.28;
    float body = max(abs(x) - per * 0.28, max(-y + hh * 0.18, y - hh * 0.45));
    float d = min(arch, body);
    d = max(d, -(hh * 0.8 - y));
    float open = smoothstep(aa, -aa, d) * step(hh * 0.18, y) * step(y, hh * 0.8);
    float edge = smoothstep(aa * 2.0, 0.0, abs(abs(p.y) - hs.y * 0.86));
    gold = edge;
    return 1.0 - open;
  }
  float fb = 0.016;                       // frame border
  float dFrame = pn_sdBox(p, hs - fb);
  float frame = smoothstep(-aa, aa, dFrame);
  float goldLine = smoothstep(aa * 1.5, 0.0, abs(dFrame + 0.0035) - 0.0015);
  float inner;
  if (style < 0.5) {
    // kikko (tortoise shell) lattice with nested hexagons and centre bosses
    float s = 0.034;
    vec2 g = pn_hexLocal(p / s);
    float hd = pn_hexD(g);
    float bar = smoothstep(0.5 - 0.115 - aa / s, 0.5 - 0.115 + aa / s, hd);
    float ring = smoothstep(aa / s, -aa / s, abs(hd - 0.25) - 0.055);
    float boss = smoothstep(aa / s, -aa / s, length(g) - 0.085);
    // four-petal flower in each cell
    float ang = atan(g.y, g.x);
    float fr = 0.2 * (0.55 + 0.45 * abs(cos(2.0 * ang)));
    float flow = smoothstep(aa / s, -aa / s, length(g) - fr) * (1.0 - smoothstep(aa / s, -aa / s, length(g) - 0.06));
    inner = max(max(bar, ring), max(boss, flow * 0.0));
    gold = boss * 0.9 + ring * 0.0;
  } else {
    // chrysanthemum medallion over a diagonal (hishi) lattice
    // pierced gilt chrysanthemum: 16 petal openings + a ring of 16 holes,
    // so the medallion glows instead of blocking the light
    float R = min(hs.x, hs.y) * 0.66;
    float r = length(p), a = atan(p.y, p.x);
    float u = a * 2.5464791;                       // 16 sectors
    float sec = 0.3926991;
    float r0 = R * 0.28, r1 = R * 0.78;
    float rm = 0.5 * (r0 + r1), hl = 0.5 * (r1 - r0);
    float hw = 0.31 * sec * rm;
    float arc = (fract(u) - 0.5) * sec * r;
    float de = (length(vec2(arc / hw, (r - rm) / hl)) - 1.0) * hw;
    float openP = smoothstep(aa, -aa, de);
    float arc2 = (fract(u + 0.5) - 0.5) * sec * r;
    float dh = length(vec2(arc2, r - R * 0.9)) - R * 0.05;
    openP = max(openP, smoothstep(aa, -aa, dh));
    float hubO = smoothstep(aa, -aa, abs(r - R * 0.17) - 0.0018);   // thin glowing ring in the hub
    openP = max(openP, hubO);
    float outside = step(R + 0.0045, r);
    float inside = 1.0 - outside;
    // background lattice
    float c = 0.022;
    vec2 q = vec2(p.x + p.y, p.x - p.y) / c;
    vec2 fq = abs(fract(q) - 0.5);
    float latt = smoothstep(0.5 - 0.11 - aa / c, 0.5 - 0.11 + aa / c, max(fq.x, fq.y));
    // corner quarter-rings
    vec2 cq = abs(p) - hs + fb;
    float corner = smoothstep(aa, -aa, abs(length(cq) - 0.028) - 0.003);
    inner = mix(max(latt, corner), 1.0 - openP, inside);
    gold = mix(corner, 1.0, inside);
  }
  float m = max(frame, inner);
  gold = max(gold * (1.0 - frame), goldLine * frame);
  return m;
}
`,T=`
{
  vec2 hs = vRel.zw * 0.5;
  vec2 p = (vRel.xy - 0.5) * vRel.zw;
  float kind = floor(vTag.x + 0.5);
  float style = floor(vStyle + 0.5);
  float aa = max(length(fwidth(p)) * 0.7, 1e-5);
  float gold;
  float m = pn_mask(p, hs, style, kind, aa, gold);
  // parallax into the interior
  vec3 Nw = normalize(vWNrm);
  vec3 Tw = normalize(cross(vec3(0.0, 1.0, 0.0), Nw));
  vec3 Bw = cross(Nw, Tw);
  vec3 V = normalize(cameraPosition - vWPos);
  vec3 vt = vec3(dot(V, Tw), dot(V, Bw), max(dot(V, Nw), 0.08));
  vec2 off = vt.xy / vt.z;
  float g1;
  float m1 = pn_mask(p - off * 0.0035, hs, style, kind, aa, g1);
  // ---- interior: a candle flame on the lantern axis behind thin washi paper.
  // vTag.y = panel centre above the flame, vTag.w = panel -> axis depth (local m)
  float D = max(vTag.w, 0.05);
  float t = uTime;
  float flick = 0.982 + 0.018 * sin(t * 2.2 + vWPos.y * 9.0) * sin(t * 1.3 + vWPos.x * 3.0);
  vec2 fp = vec2(0.0, -vTag.y - 0.012);
  // paper irradiance: cosine / inverse-square falloff from the flame
  vec2 q = p - off * 0.006 - fp;
  float E = D * D / (dot(q * vec2(1.0, 0.8), q * vec2(1.0, 0.8)) + D * D); E *= sqrt(E);
  // the flame itself, softened by the paper, parallaxed to the axis (moves with the view)
  vec2 s = p - off * (D * 0.6) - fp;
  float fh = 0.03, fw = 0.0095, blur = 0.0055;
  s.x -= 0.0025 * sin(t * 3.1 + vWPos.x * 2.0) * smoothstep(-fh, fh, s.y);
  float tip = clamp(s.y / fh * 0.5 + 0.5, 0.0, 1.0);
  float wdt = fw * mix(1.0, 0.22, tip * tip) + blur;
  float fd = length(vec2(s.x / wdt, (s.y + fh * 0.15) / (fh + blur)));
  float core = exp(-fd * fd * 2.4) * (0.9 + 0.1 * flick);
  float halo = exp(-dot(s, s) / (0.05 * 0.05));
  // candle stub under the flame: a faint shadow column cast on the far paper
  float candle = (1.0 - smoothstep(0.011, 0.019, abs(s.x))) * (1.0 - smoothstep(-fh * 1.25, -fh * 0.95, s.y));
  float fiber = mix(0.5, n_fbm(q * vec2(220.0, 160.0), 3) * 0.5 + 0.5, 1.0 - smoothstep(0.001, 0.005, length(fwidth(p))));
  vec3 gcol = mix(uGlowEdge, uGlowHot, smoothstep(0.3, 0.95, E));
  vec3 Lp = gcol * uGlowI * (0.16 + 0.84 * E) * (1.0 - 0.22 * candle) * (0.86 + 0.14 * fiber) * flick;
  Lp += vec3(1.0, 0.66, 0.30) * uGlowI * (1.9 * core + 0.3 * halo) * flick;
  if (kind > 1.5) Lp *= 0.8;
  float open = 1.0 - m;
  // looking into the opening: either the reveal (metal wall lit by the glow) or the paper
  vec3 emit = mix(Lp, Lp * 0.12 * vec3(0.9, 0.6, 0.35), m1);
  g_emit = emit * open;
  g_open = open;
  g_gold = gold;
  g_mh = m;
  vec3 bronze = vec3(0.032, 0.024, 0.017) * (0.85 + 0.3 * n_fbm3(vWPos * 9.0, 2));
  vec3 gilt = vec3(1.0, 0.71, 0.31) * (0.9 + 0.12 * n_fbm3(vWPos * 6.0, 2));
  vec3 metal = mix(bronze, gilt, gold);
  diffuseColor.rgb *= metal * m;
}
`;function E(){return{vertexHead:S,vertexWorld:C,fragHead:w,fragColor:T,fragRough:`roughnessFactor = mix(1.0, mix(0.45, 0.2, g_gold), g_mh);`,fragMetal:`metalnessFactor = mix(0.0, mix(0.4, 1.0, g_gold), g_mh);`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_mh * 0.0018 + g_gold * 0.0004, 1.0);`,fragEmissive:`totalEmissiveRadiance += g_emit;`,defines:{PROPS_LIT:``}}}var D={vertexHead:`${r}\nattribute vec4 aRel;\nattribute vec4 aTag;\nvarying vec4 vRel;\nvarying vec4 vTag;`,vertexWorld:`vRel = aRel; vTag = aTag;`,fragHead:`varying vec4 vRel; varying vec4 vTag; float g_h;`,fragColor:`
  {
    vec3 wp = vWPos;
    float kind = floor(vTag.y + 0.5);
    vec3 c;
    if (kind < 0.5) {
      // aged bamboo: straw/olive with darker blotches, fine vertical fibres along aRel.y
      float along = vRel.y;
      float fib = n_snoise(vec2(vRel.x * 90.0, along * 3.0));
      float blot = n_fbm3(wp * 3.0, 3);
      c = mix(vec3(0.19, 0.165, 0.085), vec3(0.12, 0.13, 0.065), smoothstep(-0.2, 0.6, blot));
      c *= 0.85 + 0.15 * fib;
      c = mix(c, vec3(0.07, 0.055, 0.035), smoothstep(0.5, 0.8, n_fbm3(wp * 7.0 + 3.0, 3) * 0.5 + 0.5) * 0.7);
      c = mix(c, vec3(0.32, 0.28, 0.2), smoothstep(0.62, 0.85, n_fbm3(wp * 2.0 + 9.0, 3) * 0.5 + 0.5) * 0.4);
      g_h = fib * 0.3 + blot * 0.2;
    } else {
      // dark weathered wood (ladle)
      float g = n_fbm3(wp * vec3(40.0, 3.0, 40.0), 3);
      c = vec3(0.17, 0.11, 0.06) * (0.8 + 0.3 * g);
      g_h = g * 0.4;
    }
    diffuseColor.rgb *= c;
  }`,fragRough:`roughnessFactor = 0.5 + g_h * 0.2;`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.001);`},O={vertexHead:`${r}`,fragHead:`
  uniform vec3 uDrip;
  float g_n;
  `,fragColor:`
  {
    diffuseColor.rgb = vec3(0.012, 0.016, 0.014);
  }`,fragNormal:`
  {
    vec2 d = vWPos.xz - uDrip.xz;
    float r = length(d);
    float t = uTime;
    float rip = sin(r * 120.0 - t * 9.0) * exp(-r * 9.0) * 0.6 + sin(r * 70.0 - t * 6.0 + 1.0) * exp(-r * 5.0) * 0.4;
    float n = n_snoise(vWPos.xz * 18.0 + t * 0.2) * 0.15;
    float h = (rip + n) * 0.0012;
    normal = n_bumpView(-vViewPosition, normal, h, 1.0);
  }`},k={vertexHead:`${r}`,fragHead:`float g_h;`,fragColor:`
  {
    vec3 wp = vWPos;
    float n = n_fbm3(wp * 14.0, 4);
    float sp = n_snoise3(wp * 80.0);
    vec3 c = mix(vec3(0.30, 0.29, 0.27), vec3(0.16, 0.15, 0.14), smoothstep(-0.3, 0.5, n));
    c = mix(c, vec3(0.04), smoothstep(0.6, 0.9, sp) * 0.6);
    diffuseColor.rgb *= c;
    g_h = n * 0.5 + sp * 0.1;
  }`,fragRough:`roughnessFactor = 0.95;`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.004);`};function A(r){return new n({uniforms:{...t.clone(e.fog),uTime:r.uTime,uSunDir:r.uSunDir,uSunColor:r.uSunColor,uDens:{value:.5}},vertexShader:`
      #include <common>
      #include <fog_pars_vertex>
      uniform float uTime;
      attribute vec4 aRel;
      varying vec2 vUv;
      varying vec3 vW;
      varying float vSeed;
      varying float vFace;
      void main(){
        vec3 transformed = position;
        float h = aRel.y;                 // 0 at the source, 1 at the top
        float sd = aRel.z;
        float t = uTime;
        // drift & curl, growing with height
        transformed.x += (sin(h * 5.0 + t * 0.6 + sd * 6.0) * 0.06 + sin(h * 11.0 - t * 1.1 + sd) * 0.025) * h * 1.6;
        transformed.z += (cos(h * 4.3 + t * 0.5 + sd * 3.0) * 0.06) * h * 1.6;
        transformed.x += h * h * 0.6;    // leans with the breeze
        vUv = aRel.xy; vSeed = sd;
        vec4 wp = modelMatrix * vec4(transformed, 1.0);
        vW = wp.xyz;
        vec3 nrm = normalize(mat3(modelMatrix) * vec3(-sin(aRel.w), 0.0, cos(aRel.w)));
        vFace = abs(dot(nrm, normalize(cameraPosition - wp.xyz)));
        vec4 mvPosition = viewMatrix * wp;
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }
    `,fragmentShader:`
      #include <common>
      #include <fog_pars_fragment>
      uniform float uTime;
      uniform vec3 uSunDir;
      uniform vec3 uSunColor;
      uniform float uDens;
      varying vec2 vUv;
      varying vec3 vW;
      varying float vSeed;
      varying float vFace;
      float hsh(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float vn(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hsh(i), hsh(i + vec2(1, 0)), u.x), mix(hsh(i + vec2(0, 1)), hsh(i + vec2(1, 1)), u.x), u.y); }
      float fb(vec2 p){ float s = 0.0, a = 0.5; for (int i = 0; i < 4; i++){ s += a * vn(p); p = p * 2.03 + 7.1; a *= 0.5; } return s; }
      void main(){
        float h = vUv.y;
        float x = vUv.x - 0.5;
        float w = mix(0.05, 0.42, smoothstep(0.0, 1.0, h));
        float t = uTime;
        float wob = sin(h * 9.0 - t * 1.3 + vSeed * 4.0) * 0.08 * h;
        float n = fb(vec2((x + wob) * 7.0 + vSeed * 3.0, h * 6.0 - t * 0.9));
        float n2 = fb(vec2((x + wob) * 16.0 - vSeed, h * 13.0 - t * 1.7));
        float filament = smoothstep(0.5, 0.82, n * 0.75 + n2 * 0.45);
        float strand = exp(-pow((x + wob) / max(w * 0.18, 0.004), 2.0)) * (1.0 - smoothstep(0.0, 0.35, h)); // thin rising thread near the source
        float core = exp(-pow(x / w, 2.0) * 3.0);
        float a = (core * filament * smoothstep(0.05, 0.3, h) + strand * 0.8) * smoothstep(0.0, 0.04, h) * (1.0 - smoothstep(0.45, 1.0, h)) * uDens;
        a *= smoothstep(0.08, 0.45, vFace);
        a = min(a, 0.32);
        vec3 V = normalize(cameraPosition - vW);
        float fwd = pow(max(dot(-V, normalize(uSunDir)), 0.0), 6.0);
        vec3 col = vec3(0.55, 0.56, 0.6) * 0.5 + uSunColor * (0.04 + 0.5 * fwd);
        gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
        #include <fog_fragment>
      }
    `,transparent:!0,depthWrite:!1,side:2,fog:!0})}export{E as a,d as c,b as i,x as l,D as n,h as o,O as r,A as s,k as t};