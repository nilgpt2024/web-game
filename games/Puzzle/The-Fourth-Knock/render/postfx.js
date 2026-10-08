import * as THREE from 'three';

// One full-screen grade pass over the finished frame. The scene is rendered exactly as before
// (tone-mapped world, untouched illustrated cutouts), copied, then graded in display space so
// every atmosphere state can own its colour, negative space and attention.
const vertexShader = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

const fragmentShader = `
precision highp float;
varying vec2 vUv;
uniform sampler2D tFrame;
uniform vec2 uRes;
uniform float uTime, uExposure, uSat, uContrast, uSplit, uVignette, uGrain;
uniform float uEcho, uAside, uPulse, uFade, uFocusAmount, uBreath;
uniform vec3 uLift, uGain, uShadowTint, uHighTint, uVignetteColor, uVoidTop, uVoidBottom, uFadeColor, uFocus;

float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
float luma(vec3 c){ return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

void main(){
  vec4 frame = texture2D(tFrame, vUv);
  if (uEcho > 0.001) {
    // A memory, not a ghost: the frame briefly double-exposes against itself.
    vec4 a = texture2D(tFrame, vUv + vec2(0.0055, 0.0015) * uEcho);
    vec4 b = texture2D(tFrame, vUv - vec2(0.0035, 0.0030) * uEcho);
    frame.rgb = mix(frame.rgb, (frame.rgb * 2.0 + a.rgb + b.rgb) * 0.25, 0.7 * uEcho);
  }
  vec3 bg = mix(uVoidBottom, uVoidTop, smoothstep(0.0, 1.0, vUv.y));
  vec3 c = frame.rgb + bg * (1.0 - frame.a);

  c *= uExposure;
  float l = luma(c);
  c += uShadowTint * (1.0 - smoothstep(0.0, 0.55, l)) * uSplit;
  c += uHighTint * smoothstep(0.45, 1.0, l) * uSplit;
  c = c * uGain + uLift * (1.0 - c);
  c = (c - 0.5) * uContrast + 0.5;
  c = mix(vec3(luma(c)), c, uSat);

  if (uAside > 0.001) {
    float a = luma(c);
    vec3 paper = vec3(a * 1.04 + 0.035, a * 0.96 + 0.02, a * 0.80 + 0.005);
    c = mix(c, paper, 0.66 * uAside);
  }
  if (uEcho > 0.001) {
    float e = luma(c);
    c = mix(c, vec3(e * 0.90, e * 1.0, e * 1.10) + vec3(0.015, 0.025, 0.045), 0.55 * uEcho);
  }

  vec2 aspect = vec2(uRes.x / uRes.y, 1.0);
  if (uFocusAmount > 0.001) {
    float d = length((vUv - uFocus.xy) * aspect);
    float lit = smoothstep(uFocus.z * 1.9, uFocus.z * 0.55, d);
    c *= mix(1.0, 0.42 + 0.58 * lit, uFocusAmount);
  }
  vec2 q = (vUv - 0.5) * vec2(aspect.x * 0.78, 1.0);
  float v = smoothstep(0.32 - uBreath * 0.04, 0.98, length(q));
  c = mix(c, c * uVignetteColor, v * uVignette);
  c *= 1.0 - 0.11 * uPulse * (0.55 + 0.45 * v);

  float n = hash(floor(vUv * uRes) + fract(uTime * 7.31) * vec2(311.7, 157.3)) - 0.5;
  c += n * uGrain;
  c = mix(c, uFadeColor, uFade);
  gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
}`;

export const neutralGrade = {
  exposure: 1, sat: 1, contrast: 1, split: 0, vignette: 0.28, grain: 0.028,
  lift: [0, 0, 0], gain: [1, 1, 1], shadowTint: [0, 0, 0], highTint: [0, 0, 0],
  vignetteColor: [0.16, 0.2, 0.26], voidTop: [0.085, 0.1, 0.13], voidBottom: [0.05, 0.06, 0.08]
};

export function createPostFX(renderer) {
  const size = new THREE.Vector2();
  let frameTexture = null;
  const uniforms = {
    tFrame: { value: null }, uRes: { value: new THREE.Vector2(1, 1) }, uTime: { value: 0 },
    uExposure: { value: 1 }, uSat: { value: 1 }, uContrast: { value: 1 }, uSplit: { value: 0 },
    uVignette: { value: 0.28 }, uGrain: { value: 0.028 }, uEcho: { value: 0 }, uAside: { value: 0 },
    uPulse: { value: 0 }, uFade: { value: 0 }, uFocusAmount: { value: 0 }, uBreath: { value: 0 },
    uLift: { value: new THREE.Vector3() }, uGain: { value: new THREE.Vector3(1, 1, 1) },
    uShadowTint: { value: new THREE.Vector3() }, uHighTint: { value: new THREE.Vector3() },
    uVignetteColor: { value: new THREE.Vector3(0.16, 0.2, 0.26) },
    uVoidTop: { value: new THREE.Vector3(0.085, 0.1, 0.13) }, uVoidBottom: { value: new THREE.Vector3(0.05, 0.06, 0.08) },
    uFadeColor: { value: new THREE.Vector3(0.035, 0.045, 0.06) }, uFocus: { value: new THREE.Vector3(0.5, 0.5, 0.3) }
  };
  const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader, depthTest: false, depthWrite: false });
  const quadScene = new THREE.Scene();
  const quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  quad.frustumCulled = false;
  quadScene.add(quad);
  let enabled = true;

  function ensureTexture() {
    renderer.getDrawingBufferSize(size);
    if (frameTexture && frameTexture.image.width === size.x && frameTexture.image.height === size.y) return;
    frameTexture?.dispose();
    frameTexture = new THREE.FramebufferTexture(size.x, size.y);
    frameTexture.minFilter = frameTexture.magFilter = THREE.LinearFilter;
    uniforms.tFrame.value = frameTexture;
    uniforms.uRes.value.copy(size);
  }

  function render(scene, camera, time) {
    renderer.setRenderTarget(null);
    renderer.render(scene, camera);
    if (!enabled) return;
    ensureTexture();
    renderer.copyFramebufferToTexture(frameTexture);
    uniforms.uTime.value = time;
    const autoClear = renderer.autoClear;
    renderer.autoClear = false;
    renderer.render(quadScene, quadCamera);
    renderer.autoClear = autoClear;
  }

  // Grade values arrive already interpolated by the atmosphere adapter.
  function apply(g) {
    uniforms.uExposure.value = g.exposure; uniforms.uSat.value = g.sat; uniforms.uContrast.value = g.contrast;
    uniforms.uSplit.value = g.split; uniforms.uVignette.value = g.vignette; uniforms.uGrain.value = g.grain;
    uniforms.uLift.value.fromArray(g.lift); uniforms.uGain.value.fromArray(g.gain);
    uniforms.uShadowTint.value.fromArray(g.shadowTint); uniforms.uHighTint.value.fromArray(g.highTint);
    uniforms.uVignetteColor.value.fromArray(g.vignetteColor);
    uniforms.uVoidTop.value.fromArray(g.voidTop); uniforms.uVoidBottom.value.fromArray(g.voidBottom);
  }

  return {
    render, apply, uniforms,
    set(name, value) { if (uniforms[name]) uniforms[name].value = value; },
    setFocus(x, y, radius, amount) { uniforms.uFocus.value.set(x, y, radius); uniforms.uFocusAmount.value = amount; },
    setEnabled(value) { enabled = value; }
  };
}
