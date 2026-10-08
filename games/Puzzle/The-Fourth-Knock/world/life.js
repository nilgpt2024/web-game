import * as THREE from 'three';
import { clockMinutes } from '../core/timing.js';

// The house participates. Every moving thing here carries mood, chronology or attention:
// the mantel clock keeps the evening's real time, the fire and lamps breathe with the story
// state, steam marks the early evening, storm flashes punctuate the road news, and a landing
// lamp watches the stairs. All motion runs on the environment clock, so Residuals and
// silences can hold it still.
function glowTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d'), grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255,236,196,1)'); grad.addColorStop(.25, 'rgba(255,208,140,.55)'); grad.addColorStop(.6, 'rgba(255,180,100,.14)'); grad.addColorStop(1, 'rgba(255,170,90,0)');
  g.fillStyle = grad; g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function puffTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d'), grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,.5)'); grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad; g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

export function createLife({ rooms, anchors, fireLight, rainUniforms, flameLevel, state, reducedMotion = false }) {
  const lounge = rooms.lounge.root;
  const glowMap = glowTexture(), puffMap = puffTexture();
  const glows = [];
  function glow(room, x, y, z, size, color = '#ffd394', strength = .55, kind = 'lamp') {
    const material = new THREE.SpriteMaterial({ map: glowMap, color, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: strength });
    const sprite = new THREE.Sprite(material);
    sprite.position.set(x, y, z); sprite.scale.setScalar(size); sprite.renderOrder = 2;
    rooms[room].root.add(sprite);
    glows.push({ sprite, base: strength, kind, seed: x * 3.1 + z, room });
    return sprite;
  }

  // Lamp halos from the real lamp lights, wherever the room builders put them.
  for (const { light, s } of anchors.lamps) glow('lounge', light.position.x, light.position.y + .05, light.position.z, 1.5 * s);
  for (const [room, list] of Object.entries(anchors.roomGlows || {})) for (const g of list) glow(room, g.x, g.y, g.z, g.size, g.color, g.strength, g.kind);
  const fireGlow = glow('lounge', anchors.fire.x, anchors.fire.y + .15, anchors.fire.z + .25, 3.4, '#ff9a4a', .5, 'fire');

  // Mantel clock hands (the painted face no longer carries fixed hands).
  const handMaterial = new THREE.MeshBasicMaterial({ color: '#27302d' });
  const hour = new THREE.Mesh(new THREE.PlaneGeometry(.03, .12), handMaterial); hour.geometry.translate(0, .052, 0);
  const minute = new THREE.Mesh(new THREE.PlaneGeometry(.018, .18), handMaterial); minute.geometry.translate(0, .082, 0);
  const clock = new THREE.Group(); clock.position.set(anchors.clock.x, anchors.clock.y, anchors.clock.z + .01); clock.add(hour, minute); lounge.add(clock);
  let shownMinutes = clockMinutes(state.clock) ?? 392;

  // Steam from the tea on the lounge table, only while the evening is still ordinary.
  const steam = [];
  for (let i = 0; i < 4; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: puffMap, transparent: true, depthWrite: false, opacity: 0 }));
    s.scale.setScalar(.16); lounge.add(s); steam.push({ s, seed: i / 4 });
  }

  // A few embers lifting off the fire.
  const embers = [];
  const emberMaterial = new THREE.SpriteMaterial({ map: glowMap, color: '#ffb257', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  for (let i = 0; i < 9; i++) { const e = new THREE.Sprite(emberMaterial); e.scale.setScalar(.06); lounge.add(e); embers.push({ e, seed: i * .137 }); }

  // Storm flash: the rain panes brighten and a cool light crosses the room.
  const flashLight = new THREE.DirectionalLight('#b9d3ff', 0);
  flashLight.position.set(-9, 8, 2); flashLight.userData.lightKind = 'flash';
  lounge.add(flashLight);
  let flash = null;

  // Telephone on the reception cabinet; the receiver lifts when someone is on the line.
  const black = new THREE.MeshStandardMaterial({ color: '#1f2426', roughness: .6 });
  const phone = new THREE.Group(); phone.position.set(5.5, 1.56, 2.2); phone.rotation.y = -.5;
  const phoneBody = new THREE.Mesh(new THREE.BoxGeometry(.36, .12, .26), black); phoneBody.position.y = .06; phoneBody.castShadow = true;
  const dial = new THREE.Mesh(new THREE.CylinderGeometry(.075, .075, .02, 16), new THREE.MeshStandardMaterial({ color: '#c9a55e', roughness: .5 })); dial.position.set(0, .125, .02);
  const receiver = new THREE.Group(); receiver.position.set(0, .16, -.02);
  const handle = new THREE.Mesh(new THREE.CapsuleGeometry(.03, .28, 4, 8), black); handle.rotation.z = Math.PI / 2; handle.castShadow = true;
  receiver.add(handle); phone.add(phoneBody, dial, receiver); lounge.add(phone);
  let phoneLift = 0, phoneTarget = 0;

  // Landing sconce at the top of the stairs: the eye's anchor for "upstairs".
  const sconceLight = new THREE.PointLight('#ffc983', 3.2, 4.2, 2);
  sconceLight.position.set(3.5, 3.72, -5.12); sconceLight.userData.managed = true; lounge.add(sconceLight);
  const sconce = new THREE.Mesh(new THREE.CylinderGeometry(.14, .2, .26, 10), new THREE.MeshStandardMaterial({ color: '#e5c98c', emissive: '#ffd08a', emissiveIntensity: .6 }));
  sconce.position.set(3.5, 3.72, -5.36); lounge.add(sconce);
  const sconceGlow = glow('lounge', 3.5, 3.75, -5.2, 1.1, '#ffd394', .5, 'sconce');
  let sconceFlicker = 0;

  // Door leaves built by the room dressing swing on authored tweens.
  const tweens = [];
  function swing(pivot, angle, seconds = .6) {
    if (!pivot) return Promise.resolve();
    return new Promise(resolve => tweens.push({ pivot, from: pivot.rotation.y, to: angle, t: 0, seconds, resolve }));
  }

  function update(dt, envTime, mood) {
    const calm = reducedMotion || mood.still;
    // Fire: story level times a soft two-frequency flicker.
    const flicker = reducedMotion ? 1 : 1 + Math.sin(envTime * 7) * .06 + Math.sin(envTime * 13.3) * .035;
    fireLight.intensity = 14 * mood.fire * flicker;
    flameLevel.value = mood.fire;
    fireGlow.material.opacity = .42 * mood.fire * flicker;
    for (const g of glows) {
      if (g.kind === 'fire') continue;
      const wobble = reducedMotion ? 1 : 1 + Math.sin(envTime * 2.1 + g.seed) * .03;
      g.sprite.material.opacity = g.base * wobble * (g.kind === 'lantern' ? 1 : .55 + .45 * mood.practical);
    }
    for (const [i, em] of embers.entries()) {
      const t = (envTime * .45 + em.seed * 7) % 1;
      em.e.position.set(anchors.fire.x + Math.sin(em.seed * 40 + t * 3) * .45, anchors.fire.y + .1 + t * 1.3, anchors.fire.z + .15 + Math.cos(em.seed * 17) * .1);
      em.e.material.opacity = calm ? 0 : Math.sin(t * Math.PI) * .9 * mood.fire;
    }
    // Clock: sweeps toward the authored time; big jumps (after a cut) settle quickly.
    const target = clockMinutes(state.clock);
    if (target != null) {
      let diff = ((target - shownMinutes) % 720 + 720) % 720;
      if (diff > 360) diff -= 720;
      const speed = Math.abs(diff) > 90 ? 600 : 36;
      shownMinutes += Math.sign(diff) * Math.min(Math.abs(diff), speed * dt);
      hour.rotation.z = -(shownMinutes / 720) * Math.PI * 2;
      minute.rotation.z = -((shownMinutes % 60) / 60) * Math.PI * 2;
    }
    // Steam: until the plates are cleared after dinner.
    const steamOn = !state.dinnerDone && state.room === 'lounge' ? 1 : 0;
    for (const p of steam) {
      const t = (envTime * .35 + p.seed) % 1;
      p.s.position.set(anchors.cup.x + Math.sin(t * 5 + p.seed * 9) * .04, anchors.cup.y + t * .55, anchors.cup.z);
      p.s.scale.setScalar(.1 + t * .22);
      p.s.material.opacity = steamOn * (calm ? .12 : Math.sin(t * Math.PI) * .32);
    }
    // Storm flash envelope.
    let f = 0;
    if (flash) {
      flash.t += dt;
      const t = flash.t;
      f = t < .08 ? t / .08 : t < .18 ? 1 - (t - .08) * 6 : t < .26 ? .4 + (t - .18) * 5 : Math.max(0, .8 - (t - .26) * 2.2);
      f *= flash.strength;
      if (t > .7) flash = null;
    }
    rainUniforms.flash.value = f;
    flashLight.intensity = f * 3.2;
    // Phone receiver and landing sconce.
    phoneLift += (phoneTarget - phoneLift) * (1 - Math.exp(-dt * 8));
    receiver.position.set(-.05 * phoneLift, .16 + phoneLift * .22, -.02 + phoneLift * .06);
    receiver.rotation.x = phoneLift * .6;
    sconceFlicker = Math.max(0, sconceFlicker - dt);
    const s = sconceFlicker > 0 ? (Math.sin(sconceFlicker * 38) > .2 ? .3 : 1) : 1;
    sconceLight.intensity = 3.2 * s * (.6 + .4 * mood.practical);
    sconceGlow.material.opacity = .5 * s;
    for (const tw of [...tweens]) {
      tw.t = Math.min(tw.seconds, tw.t + dt);
      const p = tw.t / tw.seconds, e = 1 - Math.pow(1 - p, 3);
      tw.pivot.rotation.y = tw.from + (tw.to - tw.from) * e;
      if (p >= 1) { tweens.splice(tweens.indexOf(tw), 1); tw.resolve(); }
    }
  }

  return {
    update, swing,
    flash(strength = 1) { flash = { t: 0, strength }; },
    phone(lifted) { phoneTarget = lifted ? 1 : 0; },
    flickerLanding(seconds = .9) { sconceFlicker = seconds; },
    glows,
    points: { stairs: { x: 5.05, y: 3.9, z: -4.9 }, landing: { x: 3.5, y: 3.72, z: -5.2 }, phone: { x: 5.5, y: 1.7, z: 2.2 } }
  };
}
