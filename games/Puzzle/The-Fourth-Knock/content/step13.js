// Step 13 opening shot list. Narration lines, captions and the cue mapping are the Step 11/12 ones;
// the shots are re-timed for the authored title sequence (world/opening13.js).
//   seconds    the shot's authored length. Each is long enough for its line at maxDuration, so
//              final voice never has to stretch a shot.
//   voiceAt    when the line starts: once the image can carry it (the letter's first words are
//              spoken as its top third opens).
//   captionAt  when the typed caption card begins.
export const openingV13 = [
  { id: 'message', line: 's81_o01', subtitle: false, caption: 'An unsigned message.', seconds: 10.6, voiceAt: 3.9, captionAt: .9 },
  { id: 'train', line: 's81_o02', caption: 'Aren Vale · Travelling through', seconds: 8.6, voiceAt: .9, captionAt: .7 },
  { id: 'road', line: 's81_o03', caption: 'Western Ghats · Monsoon, 1999', seconds: 7.6, voiceAt: 1.3, captionAt: 1.0 },
  { id: 'house', line: 's81_o04', caption: 'Cedar House', seconds: 8.6, voiceAt: 1.4, captionAt: 2.2 }
];
// The unvoiced last beat: one move from the garden lens into the playable veranda.
export const openingHandoff13 = { id: 'live-veranda', caption: '6:32 PM', seconds: 5.4, captionAt: .9 };
