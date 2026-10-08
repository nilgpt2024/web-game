import * as THREE from 'three';

// The camera never leaves its fixed elevated near-isometric angle. Direction happens through
// where it centres, how close it sits, how quickly it settles and when it holds still.
// A shot is a world point to centre (at chest height) plus extra zoom. Springs are critically
// damped, so moves arrive without overshoot; `drift` adds slow authored pushes for silences.
export function createCameraDirector({ camera, reducedMotion = false }) {
  const base = camera.position.clone();
  const forward = new THREE.Vector3();
  camera.getWorldDirection(forward);
  const up = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion);
  const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
  const flatForward = new THREE.Vector3(forward.x, 0, forward.z).normalize();
  const flatRight = new THREE.Vector3(right.x, 0, right.z);
  const upDot = flatForward.dot(up);

  const current = { x: 0, z: 0, zoom: 0 }, velocity = { x: 0, z: 0, zoom: 0 };
  let target = { x: 0, z: 0, zoom: 0 }, stiffness = 5.5, drift = null, shake = 0, framing = { x: 0, z: 0, zoom: 0 };
  const framingCurrent = { x: 0, z: 0, zoom: 0 };

  // Converts a desired on-screen shift (world units of the view, +y moves the scene up) into a
  // horizontal camera offset, so UI modes can frame the room around their panels.
  function screenShift(sx, sy) {
    const a = -sx / flatRight.lengthSq(), b = sy / upDot;
    return { x: flatRight.x * a + flatForward.x * -b, z: flatRight.z * a + flatForward.z * -b };
  }

  // Wide framing centres on the room's own composition centre (Step 12); explicit shots keep
  // their world points.
  let roomCenter = { x: 0, z: 0 };
  function setRoomCenter(c = { x: 0, z: 0 }) { roomCenter = { x: c.x || 0, z: c.z || 0 }; }
  function shot({ x = roomCenter.x, z = roomCenter.z, zoom = 0, speed = 5.5, instant = false } = {}) {
    target = { x, z, zoom };
    stiffness = speed;
    drift = null;
    if (instant || reducedMotion) { Object.assign(current, target); velocity.x = velocity.z = velocity.zoom = 0; }
  }
  const wide = (speed = 4.5) => shot({ speed });
  // Slow push: zoom gains `amount` over `seconds`, easing out.
  function push(amount, seconds) { drift = { from: target.zoom, amount, seconds, t: 0 }; }
  function jolt(amount = 1) { shake = Math.max(shake, amount); }
  function frame(x = 0, y = 0, zoom = 0) { const o = screenShift(x, y); framing = { x: o.x, z: o.z, zoom }; }

  function spring(key, goal, dt, omega) {
    const x = current[key] - goal;
    const v = velocity[key];
    const expo = Math.exp(-omega * dt);
    const next = (x + (v + omega * x) * dt) * expo;
    velocity[key] = (v - omega * (v + omega * x) * dt) * expo;
    current[key] = goal + next;
  }

  function update(dt, extraZoom = 0, time = 0) {
    if (drift) {
      drift.t = Math.min(drift.seconds, drift.t + dt);
      const p = drift.t / drift.seconds;
      target.zoom = drift.from + drift.amount * (1 - Math.pow(1 - p, 3));
    }
    if (reducedMotion) Object.assign(current, target);
    else for (const key of ['x', 'z', 'zoom']) spring(key, target[key], dt, stiffness);
    const k = reducedMotion ? 1 : 1 - Math.exp(-dt * 4.2);
    for (const key of ['x', 'z', 'zoom']) framingCurrent[key] += (framing[key] - framingCurrent[key]) * k;
    let sx = 0, sz = 0;
    if (shake > 0.001 && !reducedMotion) {
      sx = (Math.sin(time * 91) + Math.sin(time * 57)) * 0.012 * shake;
      sz = (Math.cos(time * 73) + Math.sin(time * 43)) * 0.012 * shake;
      shake = Math.max(0, shake - dt * 4.5);
    }
    camera.position.set(base.x + current.x + framingCurrent.x + sx, base.y, base.z + current.z + framingCurrent.z + sz);
    camera.zoom = 1 + extraZoom + current.zoom + framingCurrent.zoom;
    camera.updateProjectionMatrix();
  }

  return { shot, wide, push, jolt, frame, update, screenShift, setRoomCenter, get target() { return { ...target }; } };
}
