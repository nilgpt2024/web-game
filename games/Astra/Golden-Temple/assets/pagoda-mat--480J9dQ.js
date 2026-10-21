var e=`
float pg_aa(float fw, float period){ return 1.0 - smoothstep(0.16, 0.45, fw / period); }
float pg_specAA(float r){
  vec3 dn = fwidth(normalize(vWNrm));
  float k = min(dot(dn, dn) * 1.6, 0.35);
  return sqrt(clamp(r * r + k, 0.0, 1.0));
}`;function t(t,n,{wear:r=1,grime:i=1,planks:a=!1}={}){let o=n[0].toFixed(3),s=n[2].toFixed(3);return{fragHead:`float g_h; float g_cav;${e}`,fragColor:`
    {
      vec3 wp = vWPos; vec3 wn = normalize(vWNrm); vec3 an = abs(wn);
      float fw = max(length(fwidth(wp)), 1e-5);
      vec2 rel = wp.xz - vec2(${o}, ${s});
      // grain frame: along-grain axis gets a low frequency
      vec3 gp;
      if (an.y > max(an.x, an.z)) gp = abs(rel.x) > abs(rel.y) ? vec3(wp.x * 0.7, wp.z, wp.y) : vec3(wp.z * 0.7, wp.x, wp.y);
      else if (an.x > an.z) gp = vec3(wp.z * 0.7, wp.y, wp.x);
      else gp = vec3(wp.x * 0.7, wp.y, wp.z);
      float big = n_fbm3(wp * 0.31, 2);
      float mid = n_fbm3(wp * vec3(1.7, 0.6, 1.7) + 3.1, 2);
      float a1 = pg_aa(fw, 0.05), a2 = pg_aa(fw, 0.018), a3 = pg_aa(fw, 0.007);
      // annual-ring streaks (stretched noise) at three scales
      float g1 = n_snoise3(vec3(gp.x * 1.3, gp.y * 22.0, gp.z * 22.0)) * a1;
      float g2 = n_snoise3(vec3(gp.x * 3.0, gp.y * 60.0, gp.z * 60.0) + 7.0) * a2;
      float g3 = n_snoise3(vec3(gp.x * 8.0, gp.y * 150.0, gp.z * 150.0) + 13.0) * a3;
      float grain = g1 * 0.55 + g2 * 0.3 + g3 * 0.15;
      vec3 b = ${t};
      vec3 col = b * (0.86 + 0.18 * big + 0.07 * mid + 0.06 * grain);
      // sun-bleached patches (lighter, slightly desaturated)
      float bleach = smoothstep(0.2, 0.75, mid * 0.6 + 0.5 + big * 0.25);
      col = mix(col, b * vec3(1.2, 1.38, 1.45), bleach * 0.14);
      // soot / dust on the down-facing faces, rain streaks on the vertical faces
      float dn = smoothstep(0.25, 0.95, -wn.y);
      float streak = n_fbm3(wp * vec3(9.0, 0.45, 9.0), 2) * pg_aa(fw, 0.06);
      float vert = 1.0 - an.y;
      g_cav = dn * (0.55 + 0.45 * (big * 0.5 + 0.5));
      col *= 1.0 - ${(.2*i).toFixed(3)} * g_cav;
      col *= 1.0 - ${(.16*i).toFixed(3)} * vert * smoothstep(0.05, 0.55, streak);
      // edge wear on the chamfers (axis-aligned and diagonal members): worn lacquer -> lighter raw wood
      float m0 = max(an.x, max(an.y, an.z));
      float m1 = max(abs(wn.x + wn.z) * 0.7071, max(an.y, abs(wn.z - wn.x) * 0.7071));
      float edge = (1.0 - smoothstep(0.76, 0.84, m0)) * (1.0 - smoothstep(0.76, 0.84, m1));
      float wn2 = smoothstep(-0.25, 0.45, n_fbm3(wp * 7.0 + 5.0, 2));
      edge *= wn2 * pg_aa(fw, 0.03) * ${r.toFixed(3)};
      col = mix(col, b * vec3(1.75, 1.6, 1.45) + vec3(0.025, 0.014, 0.006), edge * 0.6);
      ${a?`
      {
        float pd = max(abs(rel.x), abs(rel.y)) / 0.205;
        col *= 0.9 + 0.2 * n_hash11(floor(pd) * 7.13 + 1.7);
        float jl = abs(fract(pd) - 0.5) * 0.205; // distance from the board centre line
        float fwp = fw * 1.2;
        float joint = smoothstep(0.1005 - fwp, 0.1015, jl) * pg_aa(fw, 0.03);
        col *= 1.0 - 0.55 * joint;
        grain -= joint;
      }`:``}
      diffuseColor.rgb *= col;
      g_h = grain * 0.6 + mid * 0.15 - edge * 0.3;
    }`,fragRough:`roughnessFactor = clamp(roughnessFactor * (0.9 + 0.25 * g_h) + g_cav * 0.12, 0.2, 1.0);`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.0018);`}}function n(t=`vec3(1.0, 0.70, 0.30)`){return{vertexHead:`varying vec3 vCapO;`,vertexWorld:`vCapO = transformed;`,fragHead:`varying vec3 vCapO; float g_h; float g_grv;${e}
float pg_line(float d, float w, float fq){ return 1.0 - smoothstep(w, w + fq * 1.2, d); }`,fragColor:`
    {
      vec3 wp = vWPos;
      vec2 q = vCapO.xy;
      float fq = max(length(fwidth(q)), 1e-5);
      float fwW = max(length(fwidth(wp)), 1e-5);
      float aL = pg_aa(fq, 0.06);
      float rr = length(q);
      float ang = atan(q.y, q.x);
      float frame = pg_line(abs(max(abs(q.x), abs(q.y)) - 0.41), 0.013, fq);
      float ring = pg_line(abs(rr - 0.3), 0.012, fq);
      float rp = 0.235 + 0.045 * cos(8.0 * ang);
      float petal = pg_line(abs(rr - rp), 0.011, fq) * step(rr, 0.29);
      vec2 cq = abs(q) - vec2(0.41);
      float corner = pg_line(abs(length(cq + vec2(0.07)) - 0.05), 0.01, fq) * step(max(abs(q.x), abs(q.y)), 0.41);
      // scroll tendrils (karakusa) between ring and frame on the diagonals
      float sc = pg_line(abs(length(abs(q) - vec2(0.3, 0.13)) - 0.065), 0.009, fq) * step(0.3, rr);
      float sc2 = pg_line(abs(length(abs(q) - vec2(0.13, 0.3)) - 0.065), 0.009, fq) * step(0.3, rr);
      float grv = max(max(frame, ring), max(petal, max(corner, max(sc, sc2)))) * aL;
      // ishime: fine punched ground texture between the motifs
      vec2 gq = q * 70.0;
      vec2 gi = floor(gq); vec2 gf = fract(gq) - 0.5 + (n_hash22(gi) - 0.5) * 0.5;
      float dot_ = (1.0 - smoothstep(0.12, 0.3, length(gf))) * pg_aa(fq, 0.05);
      g_grv = grv;
      float n = n_fbm3(wp * 3.1, 2) * pg_aa(fwW, 0.12);
      float tarnish = smoothstep(0.2, 0.75, n_fbm3(wp * 0.9 + 7.0, 2) * 0.5 + 0.5);
      vec3 b = ${t};
      vec3 col = b * (0.92 + 0.12 * n);
      col = mix(col, b * vec3(0.55, 0.42, 0.25), tarnish * 0.3);
      col *= 1.0 - 0.6 * grv;            // dark patina in the grooves
      col *= 1.0 - 0.05 * dot_;
      diffuseColor.rgb *= col;
      g_h = -grv * 0.9 - dot_ * 0.06 + n * 0.25;
    }`,fragRough:`roughnessFactor = pg_specAA(clamp(roughnessFactor + g_h * 0.05 + g_grv * 0.35, 0.08, 1.0));`,fragMetal:`metalnessFactor = mix(metalnessFactor, 0.55, g_grv * 0.6);`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.0016);`}}function r(t=`vec3(1.0, 0.70, 0.30)`){return{fragHead:`float g_h;${e}`,fragColor:`
    {
      vec3 wp = vWPos;
      float fw = max(length(fwidth(wp)), 1e-5);
      float n = n_fbm3(wp * 3.1, 3) * pg_aa(fw, 0.15);
      float tarnish = smoothstep(0.2, 0.75, n_fbm3(wp * 0.9 + 7.0, 3) * 0.5 + 0.5);
      float dn = smoothstep(0.2, 0.9, -normalize(vWNrm).y);
      vec3 b = ${t};
      vec3 col = b * (0.92 + 0.12 * n);
      col = mix(col, b * vec3(0.55, 0.42, 0.25), tarnish * 0.35 + dn * 0.12);
      diffuseColor.rgb *= col;
      g_h = n * 0.5 + tarnish * 0.3;
    }`,fragRough:`roughnessFactor = pg_specAA(clamp(roughnessFactor + g_h * 0.12, 0.05, 1.0));`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.0012);`}}function i(t=`round`){return{vertexHead:`varying vec3 vCapO;`,vertexWorld:`vCapO = transformed;`,fragHead:`varying vec3 vCapO; float g_h; float g_ao;${e}`,fragColor:`
    {
      vec3 wp = vWPos;
      float fw = max(length(fwidth(wp)), 1e-5);
      ${t===`round`?`float ao = smoothstep(0.004, 0.07, vCapO.y); float valley = 0.0; float front = smoothstep(0.1, 0.17, vCapO.z);`:`float ao = 1.0 - smoothstep(0.075, 0.15, abs(vCapO.x)) * 0.8; float valley = 1.0 - smoothstep(0.0, 0.07, abs(vCapO.x)); float front = smoothstep(0.1, 0.17, vCapO.z);`}
      g_ao = ao;
      float n = n_fbm3(wp * 0.6, 3);
      float f = n_snoise3(wp * 9.0) * pg_aa(fw, 0.11);
      float f2 = n_snoise3(wp * 31.0 + 4.0) * pg_aa(fw, 0.032);
      vec3 col = vec3(0.060, 0.066, 0.078) * (0.85 + 0.25 * n + 0.06 * f + 0.04 * f2);
      float lichen = smoothstep(0.5, 0.85, n_fbm3(wp * 2.3 + 11.0, 3) * 0.5 + 0.5 + valley * 0.15);
      col = mix(col, vec3(0.16, 0.15, 0.11), lichen * 0.3);
      float dust = smoothstep(0.2, 0.9, normalize(vWNrm).y) * (0.5 + 0.5 * n);
      col = mix(col, vec3(0.12, 0.11, 0.10), dust * 0.12);
      col = mix(col, vec3(0.085, 0.075, 0.06), valley * 0.35 * (0.5 + 0.5 * n));
      col *= 0.62 + 0.38 * ao;
      col *= 1.0 + 0.12 * front;
      diffuseColor.rgb *= col;
      g_h = f * 0.3 + f2 * 0.15 + lichen * 0.4;
    }`,fragRough:`roughnessFactor = clamp(roughnessFactor + g_h * 0.25 + (1.0 - g_ao) * 0.15, 0.2, 1.0);`,fragNormal:`normal = n_bumpView(-vViewPosition, normal, g_h, 0.003);`}}export{t as i,r as n,i as r,n as t};