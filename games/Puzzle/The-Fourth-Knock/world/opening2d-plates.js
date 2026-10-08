// Step 13B: the painted plates the illustrated opening is drawn from (assets/opening2d/). They were
// painted from layout renders of each shot (tools/opening2d/art/), so they keep the shot's composition
// and Cedar House's real architecture. Fetched and decoded off the main thread while the title screen
// waits. A missing plate leaves its shot on the code-drawn art it was painted from.
const BASE = './assets/opening2d/';
export const PLATE_FILES = {
  paper: 'paper.webp',                                   // laid writing paper, for the envelope and the note
  desk: 'desk.webp', deskSoft: 'desk-soft.webp',         // the message: the desk world (x 20..1700, y -45..1005)
  carriage: 'carriage.webp', carriageFront: 'carriage-front.webp',
  landFar: 'land-far.webp', landMid: 'land-mid.webp', landNear: 'land-near.webp',
  frame2b: 'window-frame.webp', tunnel: 'tunnel.webp',
  house: 'house.webp', houseDark: 'house-dark.webp', branch: 'branch.webp',
  houseDarkPatch: 'house-dark-patch.webp',                // the dark twin only where the lights fall (over the clip)
  upper: 'upper.webp', upperLit: 'upper-lit.webp',
  steps: 'steps.webp',
  arrival: 'arrival.webp'
};
// The painted arrival plate: the veranda at the game camera over 23.1 × 11.9 world units, and where
// two world anchors fall in it (tools/opening2d/art/capture-arrival.mjs). Pinned to the live camera
// by projecting the same anchors.
// Lettered boards the animated clips cannot keep (image-to-video smears small lettering): the opening
// lays each board from its still plate over the clip, inside these outlines (design space, from
// tools/opening2d/art/holds.py): the name board over the veranda and the board by the door. (The roadside
// sign's big lettering survives its clip, so the rain runs live over it.)
export const HOLDS = {
  house: [[872.0, 472.4], [1025.8, 466.8], [1025.4, 434.6], [871.9, 441.6]],
  steps: [[807.8, 344.3], [1091.7, 329.0], [1090.5, 271.1], [807.6, 288.9]]
};
// Its clip leaves out the plate's first `crop` columns (so the rest is the clip's exact shape); `board` is
// the game's own name board in it (plate px), laid from the still over the clip.
export const ARRIVAL = { size: [2400, 1236], world: [[-4, 0, -2], [3, 0, 2.5]], px: [[1020.822, 476.266], [1375.695, 905.688]],
  crop: 27, board: [[1431, 234], [1633, 304], [1633, 350], [1431, 282]] };

export async function loadPlates() {
  const out = {};
  await Promise.all(Object.entries(PLATE_FILES).map(async ([k, f]) => {
    try {
      const r = await fetch(BASE + f);
      if (r.ok) out[k] = await createImageBitmap(await r.blob());
    } catch { /* keeps the code-drawn shot */ }
  }));
  return out;
}
