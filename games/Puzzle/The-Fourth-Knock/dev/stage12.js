// Development-only art-review stages (Step 12). Loaded on localhost with ?dev&stage=NAME, it
// shows one room with the cast on authored marks, so a room can be judged without playing the
// route. It never runs in production (core/timing.js devMode), never advances the story and is
// not part of the shipped experience. tools/step12/shot.mjs captures these frames headless.
const CAST = ['aren', 'mira', 'ada', 'elias', 'victor'];
export const STAGES = {
  veranda: { room: 'veranda', atmosphere: 'arrival', cast: { aren: [-2.6, 1.25] }, look: { aren: 'door' } },
  lounge: { room: 'lounge', atmosphere: 'arrival', cast: { aren: [-5.45, 4.15], mira: [-3.0, -1.85], ada: [4.27, 2.95], elias: [.5, -2.7] } },
  social: { room: 'lounge', atmosphere: 'victor_arrives', cast: { aren: [-1.2, -2.0], mira: [-2.9, -2.5], ada: [3.5, 3.4], elias: [2.05, -2.7], victor: [.7, -2.45] } },
  knocks: { room: 'lounge', atmosphere: 'four_knocks', cast: { aren: [.4, -1.3], mira: [-3.0, -1.85], ada: [3.9, 2.4], elias: [1.25, -2.45] }, shot: { x: 1.6, z: -.9, zoom: .035 } },
  accusation: { room: 'lounge', atmosphere: 'accusation', cast: { aren: [1.9, 2.8], mira: [-2.65, -1.35], ada: [3.5, -.6], elias: [.4, -1.3] }, shot: { x: .7, z: .5, zoom: .07 } },
  corridor: { room: 'corridor', atmosphere: 'body_discovery', cast: { aren: [-4.95, .45], ada: [.2, -1.95] } },
  door: { room: 'corridor', atmosphere: 'body_discovery', cast: { aren: [-.4, -.9], ada: [.2, -1.95], mira: [-1.3, -.45], elias: [1.95, -1.55] }, door: true, shot: { x: 1.2, z: -1.4, zoom: .09 } },
  victor: { room: 'victor', atmosphere: 'body_discovery', cast: { aren: [-3.55, 3.3], ada: [-2.95, 2.7], mira: [-4.45, 3.65], elias: [-2.35, 3.6] }, door: true },
  investigate: { room: 'victor', atmosphere: 'investigation', cast: { aren: [-2.55, 2.35] }, door: true },
  dawn: { room: 'corridor', atmosphere: 'dawn', cast: { aren: [-4.95, .45] }, dawn: true },
  entrance: { room: 'lounge', atmosphere: 'victor_arrives', cast: { victor: [-7.2, 4.22], aren: [-1.2, 1.6], mira: [-3.0, -1.85], ada: [4.27, 2.95], elias: [.5, -2.7] }, front: true },
  empty: { room: 'lounge', atmosphere: 'arrival', cast: {} }
};

export async function startStage({ state, world, actors, presentation, camera, stage, rooms }) {
  if (stage === 'opening') return openingStage({ state, world, camera });
  const s = STAGES[stage];
  if (!s) { console.warn('Unknown stage', stage, Object.keys(STAGES)); return; }
  const until = async fn => { while (!fn()) await new Promise(r => setTimeout(r, 50)); };
  await until(() => document.getElementById('chapter-intro'));
  document.getElementById('chapter-intro').hidden = true;
  document.body.dataset.directed = 'false';
  world.switchRoom(s.room);
  for (const n of CAST) {
    const p = s.cast[n];
    if (p) world.place(n, p[0], p[1], s.room, p[2] || 0); else world.place(n, 0, 0, 'offstage');
  }
  for (const n of CAST) if (s.cast[n] && n !== 'aren') world.face(n, 'aren');
  if (s.cast.aren) { const other = CAST.find(n => n !== 'aren' && s.cast[n]); if (other) world.face('aren', other); }
  for (const [n, t] of Object.entries(s.look || {})) world.look(n, t);
  if (s.door) await world.door(true);
  if (s.dawn) { world.door(false); world.sealDoor(); }
  if (s.front) { const d = rooms.lounge.entryDoor; d.rotation.y = d.userData.open(1.2); rooms.lounge.entryStorm.visible = true; world.face('victor', 'aren'); }
  presentation.atmosphere(s.atmosphere, { sound: false, speed: 40 });
  camera.shot({ ...(s.shot || {}), instant: true });
  state.devStage = stage;
  await new Promise(r => setTimeout(r, 1800));
  window.__stageReady = true;
}

// Step 13: freeze the opening at ?dev&stage=opening&shot=N&t=SECONDS (shot 5 is the handoff).
// window.__opening.scrub(i, t) moves the frozen frame afterwards without a reload.
async function openingStage({ state, world, camera }) {
  const q = new URLSearchParams(location.search), shot = Math.max(1, Number(q.get('shot')) || 1), t = Number(q.get('t')) || 0;
  const until = async fn => { while (!fn()) await new Promise(r => setTimeout(r, 50)); };
  await until(() => document.getElementById('chapter-intro'));
  document.getElementById('chapter-intro').hidden = true;
  Object.assign(document.body.dataset, { quietHud: 'true', letterbox: 'true', directed: 'true', phase: 'opening' });
  const panel = document.getElementById('opening-stage'); panel.hidden = false; panel.classList.add('live');
  world.switchRoom('veranda', { aren: [1.5, 2.1] });
  camera.shot({ instant: true });
  await world.opening.scrub(shot - 1, t);
  state.devStage = 'opening';
  await new Promise(r => setTimeout(r, 1500));
  window.__stageReady = true;
}
