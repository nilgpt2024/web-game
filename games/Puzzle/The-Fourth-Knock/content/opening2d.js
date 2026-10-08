// Post-Step-13 opening: a 2D illustrated animated intro (world/opening2d.js). Same four narration
// lines, captions and cue mapping as Steps 11–13. Each beat is a short sequence of illustrated shots.
//   seconds    the beat's authored length; each holds its line at the manifest's maxDuration
//   voiceAt    when the line starts (the letter is spoken as its top third opens)
//   captionAt  when the typed caption card begins
export const opening2D = [
  { id: 'message', line: 's81_o01', subtitle: false, caption: 'An unsigned message.', seconds: 10.4, voiceAt: 3.6, captionAt: .8 },
  { id: 'travel', line: 's81_o02', caption: 'Aren Vale · Travelling through', seconds: 8.2, voiceAt: .9, captionAt: .7 },
  { id: 'ghat', line: 's81_o03', caption: 'Western Ghats · Monsoon, 1999', seconds: 7.4, voiceAt: 1.2, captionAt: 1.0 },
  { id: 'house', line: 's81_o04', caption: 'Cedar House', seconds: 7.8, voiceAt: 1.0, captionAt: 1.7 }
];
// Arrival: the illustrated veranda at the game's own framing resolves into the playable scene.
export const opening2DHandoff = { id: 'arrival', caption: '6:32 PM', seconds: 5.6, captionAt: .8 };
