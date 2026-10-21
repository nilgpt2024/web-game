var e=`
#ifndef TG_LIB
#define TG_LIB
// Worley with cell id: returns (F1, vector to nearest feature); out F2 and cell id
vec3 tg_worley(vec2 p, out vec2 cid, out float f2){
  vec2 i = floor(p), f = fract(p);
  float d1 = 8.0, d2 = 8.0; vec2 id = vec2(0.0); vec2 best = vec2(0.0);
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++){
    vec2 g = vec2(float(x), float(y));
    vec2 o = n_hash22(i + g);
    vec2 r = g + o - f;
    float d = dot(r, r);
    if (d < d1){ d2 = d1; d1 = d; id = i + g; best = r; } else if (d < d2){ d2 = d; }
  }
  cid = id; f2 = sqrt(d2);
  return vec3(sqrt(d1), best);
}
// value noise with smooth falloff of high frequencies by pixel footprint
float tg_fnoise(vec2 p, float fwCells){ return n_snoise(p) * (1.0 - smoothstep(0.35, 0.9, fwCells)); }
#endif
`,t=`
#ifndef TG_MOSS
#define TG_MOSS
// Moss carpet (hypnum / polytrichum / leucobryum mix). p = world xz, fw = pixel footprint (m)
// h = micro height (m) for bump, col = albedo.
void tg_moss(vec2 p, float y, float fw, out vec3 col, out float h, out float rough){
  vec2 w = vec2(n_snoise(p * 0.7 + 3.0), n_snoise(p * 0.7 - 5.0)) * 0.6;
  float big = n_fbm(p * 0.22 + w * 0.3, 3);
  float mid = n_fbm(p * 1.3 + w, 3);
  // species patches with fairly crisp borders
  float sp1 = n_fbm(p * 0.55 + w * 0.8 + 17.0, 3);
  float sp2 = n_fbm(p * 0.9 - w + 31.0, 3);
  float e1 = smoothstep(-0.14, 0.14, sp1);
  float e2 = smoothstep(0.1, 0.38, sp2);
  vec3 emerald = vec3(0.012, 0.036, 0.014);
  vec3 feather = vec3(0.030, 0.074, 0.018);
  vec3 star = vec3(0.046, 0.088, 0.016);
  vec3 cushion = vec3(0.058, 0.084, 0.044);
  vec3 olive = vec3(0.050, 0.052, 0.020);
  col = mix(emerald, feather, smoothstep(-0.6, 0.6, big + 0.5 * mid));
  col = mix(col, star, e1 * 0.75);
  col = mix(col, cushion, e2 * 0.65);
  col = mix(col, olive, smoothstep(0.45, 0.7, n_fbm(p * 0.35 - 9.0, 2)) * 0.5);
  // darker seams where patches meet
  float seam = (1.0 - abs(e1 * 2.0 - 1.0)) * 0.12 + (1.0 - abs(e2 * 2.0 - 1.0)) * 0.08;
  col *= 1.0 - seam;
  // soft rounded cushions (no cell edges)
  float cf = 1.0 - smoothstep(0.010, 0.05, fw);
  float c1 = n_snoise(p * 4.5 + w * 1.5);
  float c2 = n_snoise(p * 12.0 - w * 2.5 + 7.0);
  float cush = smoothstep(-0.7, 0.9, c1) * 0.6 + smoothstep(-0.6, 0.9, c2) * 0.4;
  col *= mix(1.0, 0.74 + 0.45 * cush, cf);
  // fine texture (colour only): tips catching light, dark interstices
  float ff = 1.0 - smoothstep(0.0015, 0.008, fw);
  float fuzz = n_snoise(p * 160.0) * 0.55 + n_snoise(p * 380.0 + 2.0) * 0.45;
  col *= 1.0 + 0.36 * fuzz * ff;
  float f3 = n_snoise(p * 48.0 + w * 4.0);
  col *= 1.0 + 0.2 * f3 * (1.0 - smoothstep(0.003, 0.016, fw));
  // sporophyte specks (red-brown) and pale tips in the star moss
  float cf2 = 1.0 - smoothstep(0.004, 0.02, fw);
  float spk = smoothstep(0.82, 0.95, n_snoise(p * 95.0 + 5.0)) * e1 * cf2;
  col = mix(col, vec3(0.16, 0.07, 0.03), spk * 0.6);
  // dead / brown patches, needles and twigs
  float dead = smoothstep(0.55, 0.85, n_fbm(p * 0.9 + 11.0, 3));
  col = mix(col, vec3(0.062, 0.050, 0.028), dead * 0.42);
  float tw = smoothstep(0.92, 0.985, n_snoise(vec2(p.x * 3.0 + p.y * 1.7, p.y * 0.4 - p.x * 0.3) * 6.0)) * cf2;
  col = mix(col, vec3(0.09, 0.06, 0.035), tw * 0.6);
  h = cush * 0.0035 * cf + mid * 0.003 + f3 * 0.0003 * cf2;
  rough = 0.96;
}
#endif
`,n=`
#ifndef TG_NEAR
#define TG_NEAR
// drifts of fallen leaves: individual leaves (Worley cells, random size / tint) where resolved,
// their mean coverage beyond. dens 0..1
void tg_leafDrift(vec2 p, float fw, float dens, inout vec3 c){
  if (dens < 0.003) return;
  vec2 cid; float f2;
  vec3 w = tg_worley(p * 16.0 + 5.3, cid, f2);
  vec3 h = n_hash33(vec3(cid, 4.4));
  float fade = 1.0 - smoothstep(0.012, 0.04, fw);
  float ang = atan(w.z, w.y) + h.z * 6.2831;
  float rad = (0.26 + 0.2 * h.y) * (0.8 + 0.2 * cos(5.0 * ang)) * (1.0 - 0.35 * abs(sin(ang)));
  float shape = smoothstep(rad + 0.05, rad - 0.04, w.x) * step(h.x, dens);
  vec3 lc = h.z < 0.35 ? vec3(0.20, 0.10, 0.04) : h.z < 0.6 ? vec3(0.30, 0.16, 0.05) : h.z < 0.8 ? vec3(0.36, 0.08, 0.03) : vec3(0.14, 0.10, 0.06);
  lc *= 0.8 + 0.4 * h.y;
  vec3 lavg = vec3(0.24, 0.12, 0.045);
  float cov = mix(dens * 0.42, shape, fade);
  c = mix(c, mix(lavg, lc, fade), cov);
}
// raked gravel shoulders along the sando south of the gate
void tg_sando(vec2 p, float fw, inout vec3 c, inout float hOut){
  float sx = abs(p.x - 10.0);
  float sh = smoothstep(3.05, 2.85, sx + 0.05 * n_snoise(p * 1.3)) * step(46.0, p.y) * smoothstep(92.8, 92.0, p.y);
  if (sh > 0.001) {
    float gF = 1.0 - smoothstep(0.02, 0.08, fw);
    float gr = n_snoise(p * 40.0) * gF;
    float ln = (0.5 + 0.5 * cos(6.2831853 * sx / 0.12)) * (1.0 - smoothstep(0.25, 0.5, fw / 0.12));
    vec3 gc = vec3(0.56, 0.54, 0.50) * (0.92 + 0.08 * gr) * (0.9 + 0.12 * ln) * (0.9 + 0.1 * n_fbm(p * 0.5, 2));
    c = mix(c, gc, sh);
    hOut = mix(hOut, ln * 0.008, sh);
  }
}
vec3 tg_meadow(vec2 p, float y, float fw, out float hOut){
  // rough grass, bracken and low scrub, mossy hollows and bare needle-strewn patches
  float gn = n_fbm(p * 0.05 + 7.0, 3);
  float g2 = n_fbm(p * 0.6 + 2.0, 3);
  float g3 = n_snoise(p * 3.0);
  vec3 c = mix(vec3(0.050, 0.075, 0.020), vec3(0.11, 0.105, 0.035), smoothstep(-0.5, 0.6, gn + 0.3 * g2));
  c = mix(c, vec3(0.13, 0.085, 0.035), smoothstep(0.35, 0.75, n_fbm(p * 0.12 - 4.0, 3)) * 0.45); // dry bracken
  c *= 0.78 + 0.34 * g2 + 0.14 * g3 * (1.0 - smoothstep(0.1, 0.4, fw));
  vec3 mm; float mmh; float mmr;
  tg_moss(p, y, fw, mm, mmh, mmr);
  c = mix(c, mm * 1.25, smoothstep(0.0, 0.45, n_fbm(p * 0.22 + 31.0, 3)) * 0.6);
  float bare = smoothstep(0.2, 0.55, n_fbm(p * 0.3 - 17.0, 3));
  c = mix(c, vec3(0.12, 0.08, 0.045) * (0.8 + 0.3 * g3), bare * 0.45);
  float scrub = smoothstep(0.1, 0.45, n_fbm(p * 0.35 + 2.0, 3));
  c = mix(c, vec3(0.025, 0.045, 0.014) * (0.8 + 0.4 * g3), scrub * 0.7);
  // tussocks (filtered) and drifts of fallen leaves
  vec2 tid; float tf2;
  vec3 tw = tg_worley(p * 3.2 + 1.7, tid, tf2);
  float tF = 1.0 - smoothstep(0.025, 0.1, fw);
  float tus = smoothstep(0.6, 0.05, tw.x) * (0.6 + 0.4 * n_hash12(tid)) * (1.0 - scrub);
  c *= mix(0.92, 0.62 + 0.62 * tus, tF);
  float lv = smoothstep(0.15, 0.55, n_fbm(p * 0.16 + 17.0, 3));
  tg_leafDrift(p, fw, lv * 0.7, c);
  hOut = scrub * 0.06 + g2 * 0.015 + tus * 0.02 * tF;
  c *= 1.3;
  tg_sando(p, fw, c, hOut);
  return c;
}
vec3 tg_forestFloor(vec2 p, float y, float fw, out float hOut){
  float fine = n_fbm(p * 1.1, 3);
  float fineF = 1.0 - smoothstep(0.05, 0.25, fw);
  // cedar / pine needle beds: rust-brown, paler where dry, darker in the damp hollows
  vec3 needles = mix(vec3(0.10, 0.060, 0.034), vec3(0.16, 0.10, 0.055), smoothstep(-0.3, 0.5, n_fbm(p * 0.07 + 11.0, 3)));
  needles *= 0.8 + 0.3 * fine * fineF + 0.1 * fine;
  vec3 fm; float fmh; float fmr;
  tg_moss(p, y, fw, fm, fmh, fmr);
  float mossP = smoothstep(-0.1, 0.4, n_fbm(p * 0.21 + 5.0, 3));
  vec3 c = mix(needles, fm * 1.05, mossP);
  // undergrowth (sasa / ferns) as darker green patches with bright sunfleck-catching tops
  float sasa = smoothstep(0.0, 0.5, n_fbm(p * 0.09 + 1.0, 3));
  vec3 sasaC = mix(vec3(0.035, 0.06, 0.018), vec3(0.07, 0.10, 0.03), smoothstep(-0.4, 0.6, n_snoise(p * 0.8)));
  c = mix(c, sasaC, sasa * 0.6);
  // last autumn's broadleaf litter in drifts (resolved leaves close up, mean tone beyond)
  tg_leafDrift(p, fw, smoothstep(0.2, 0.6, n_fbm(p * 0.11 - 23.0, 3)) * 0.55 * (1.0 - sasa), c);
  // root flares / old stumps: low dark-ringed mounds at the tree spacing
  vec2 rid; float rf2;
  vec3 rw = tg_worley(p * 0.19 + 3.7, rid, rf2);
  float root = smoothstep(0.35, 0.0, rw.x) * step(0.55, n_hash12(rid));
  c = mix(c, c * vec3(0.8, 0.85, 0.7), root * 0.4);
  hOut = fmh * 0.5 + root * 0.04 + sasa * 0.03;
  return c * 1.3;
}
#endif
`;export{n,e as r,t};