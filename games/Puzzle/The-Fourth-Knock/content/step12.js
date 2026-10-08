// Step 12 opening shot list: the same four narration lines and captions as Step 11, now staged
// in-engine (world/opening12.js). A fifth, unvoiced beat carries the lens into the playable
// veranda at 6:32 PM. Cue mapping and line ids are unchanged (audio contract preserved).
export const openingV12 = [
  { id: 'message', line: 's81_o01', subtitle: false, caption: 'An unsigned message.', seconds: 6.4 },
  { id: 'train', line: 's81_o02', caption: 'Aren Vale · Travelling through', seconds: 5.8 },
  { id: 'road', line: 's81_o03', caption: 'Western Ghats · Monsoon, 1999', seconds: 5.6 },
  { id: 'house', line: 's81_o04', caption: 'Cedar House', seconds: 6.4 }
];
export const openingHandoff = { id: 'live-veranda', caption: '6:32 PM', seconds: 4.8 };
