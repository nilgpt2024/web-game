import { wait } from '../core/timing.js';

// Walked passages between rooms (architecture map §5). A door opens the way it is hung, Aren
// crosses the threshold (the real wall and jamb take him), a short dip hides the change of scene
// root, and the next room begins at the matching doorway with the same door standing open.
// The black time card stays for genuine time jumps; a passage only shows a small place tag.
export function createPassages({ world, rooms, life, presentation, camera, audio, state, actors }) {
  let tagEl = document.getElementById('passage-tag');
  if (!tagEl) { tagEl = document.createElement('div'); tagEl.id = 'passage-tag'; tagEl.setAttribute('aria-hidden', 'true'); document.body.append(tagEl); }
  let tagTimer = 0;
  function tag(place, time = '') {
    tagEl.innerHTML = (time ? `<span>${time}</span>` : '') + `<b>${place}</b>`;
    tagEl.classList.remove('on'); void tagEl.offsetWidth; tagEl.classList.add('on');
    clearTimeout(tagTimer); tagTimer = setTimeout(() => tagEl.classList.remove('on'), 2400);
  }
  // Walk `points`; start the dip when the walker reaches the threshold (index `dipAt`).
  async function exitThrough(points, dipAt, speed = 1.7) {
    const first = world.walk('aren', points.slice(0, dipAt + 1), { speed });
    await first;
    const rest = points.slice(dipAt + 1);
    await Promise.all([rest.length ? world.walk('aren', rest, { speed }) : null, presentation.fade(1, .22)]);
  }
  async function arrive(room, place, { time = null, label, facing, enter = [], speed = 1.6, before } = {}) {
    world.switchRoom(room, { aren: place });
    before?.();
    if (facing) world.look('aren', facing);
    camera.shot({ zoom: -.018, instant: true });
    audio.environment(room);
    await wait(120);
    presentation.fade(0, .38);
    camera.shot({ zoom: 0, speed: 2.2 });
    tag(label, time);
    if (enter.length) await world.walk('aren', enter, { speed });
    world.look('aren', 'clear');
  }

  const V = () => rooms.veranda, L = () => rooms.lounge, C = () => rooms.corridor;
  const passages = {
    tag,
    // Veranda to lounge through the front door (opens inward, hinged on the left from outside).
    async frontIn({ time = null, label = 'Lounge', onArrive } = {}) {
      const v = V(), l = L();
      v.doorWarm.visible = true;
      audio.effect('sfx_front_door', { gain: .62, pan: .1 });
      life.swing(v.door, v.door.userData.open(1.35), .9);
      world.look('aren', 'door', { back: true });
      await wait(420);
      await exitThrough([{ x: 1.55, z: -1.8 }, { x: 1.55, z: -2.72 }, { x: 1.62, z: -3.5 }], 1);
      await arrive('lounge', [-7.45, 4.22], { time, label, enter: [{ x: -6.35, z: 4.22 }, { x: -5.55, z: 4.12 }], before: () => {
        l.entryDoor.rotation.y = l.entryDoor.userData.open(1.3); l.entryStorm.visible = true;
        v.door.rotation.y = 0; v.doorWarm.visible = false; onArrive?.();
      } });
      audio.effect('sfx_front_door_close', { gain: .4, pan: -.55 });
      life.swing(l.entryDoor, 0, .85).then(() => { l.entryStorm.visible = false; });
    },
    // Lounge to veranda.
    async frontOut({ label = 'Covered veranda', time = null, enter = [{ x: 1.55, z: -2.25 }, { x: 1.35, z: -1.2 }], onArrive } = {}) {
      const v = V(), l = L();
      l.entryStorm.visible = true;
      // Someone may already be holding it open (Mira, in her scene): then no second latch.
      if (Math.abs(l.entryDoor.rotation.y) < .5) audio.effect('sfx_front_door', { gain: .5, pan: -.55 });
      life.swing(l.entryDoor, l.entryDoor.userData.open(1.3), .85);
      world.look('aren', 'door');
      await wait(380);
      await exitThrough([{ x: -5.9, z: 4.22 }, { x: -6.95, z: 4.22 }, { x: -7.7, z: 4.22 }], 1);
      await arrive('veranda', [1.62, -3.45], { time, label, enter, before: () => {
        v.door.rotation.y = v.door.userData.open(1.35); v.doorWarm.visible = true;
        l.entryDoor.rotation.y = 0; l.entryStorm.visible = false; onArrive?.();
      } });
      audio.effect('sfx_front_door_close', { gain: .38, pan: .15 });
      life.swing(v.door, 0, .85).then(() => { v.doorWarm.visible = false; });
    },
    // Up the main stair: through the lounge's north wall, out of the corridor's stair well.
    async stairsUp({ label = 'Upper corridor', time = null, enter = [{ x: -4.95, z: .45 }], onArrive } = {}) {
      camera.shot({ x: 4.4, z: -2.6, zoom: .03, speed: 1.6 });
      await exitThrough([{ x: 5.05, z: -.35 }, { x: 5.05, z: -4.6, y: 3.0 }, { x: 5.05, z: -5.9, y: 3.95 }, { x: 5.05, z: -6.9, y: 4.5 }], 2, 1.9);
      await arrive('corridor', [-4.69, 3.35, -1.3], { time, label, enter: [{ x: -4.69, z: 1.9, y: 0 }, ...enter], speed: 1.7, before: onArrive });
    },
    // Down the main stair.
    async stairsDown({ label = 'Lounge', time = null, enter = [{ x: 4.3, z: .15 }] } = {}) {
      await exitThrough([{ x: -4.69, z: 1.45 }, { x: -4.69, z: 1.9, y: 0 }, { x: -4.69, z: 2.8, y: -.8 }, { x: -4.69, z: 3.5, y: -1.4 }], 2, 1.7);
      await arrive('lounge', [5.05, -6.6, 4.25], { time, label, enter: [{ x: 5.05, z: -4.6, y: 3.0 }, { x: 5.05, z: -.35, y: 0 }, ...enter], speed: 2.0 });
    },
    // Into and out of room 202 once its door stands open.
    async into202({ label = 'Victor’s room' } = {}) {
      world.look('aren', 'door', { back: true });
      await exitThrough([{ x: 1.55, z: -2.45 }, { x: 1.55, z: -3.35 }, { x: 1.3, z: -4.2 }], 1, 1.6);
      await arrive('victor', [-4.6, 5.3], { label, enter: [{ x: -4.6, z: 4.25 }, { x: -4.05, z: 3.3 }] });
    },
    async outOf202({ label = 'Upper corridor' } = {}) {
      await exitThrough([{ x: -4.6, z: 3.75 }, { x: -4.6, z: 4.62 }, { x: -4.6, z: 5.45 }], 1, 1.6);
      await arrive('corridor', [1.3, -4.2], { label, enter: [{ x: 1.55, z: -3.1 }, { x: 1.55, z: -1.65 }] });
    }
  };
  return passages;
}
