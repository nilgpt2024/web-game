// Step 11 additions. Everything here is presentation or text-only reading material: optional
// examines before the murder, Observe details for Mira and Ada, the unified first Case Note,
// the timeline's ordering rules, the case-board layouts and the opening's shot list.
// No canonical fact is added or changed. Text-only lines carry `vo: false` in direction11.js
// and are never sent to the voice runtime.
const A = (id, text, expression = 'neutral') => ({ line_id: id, speaker: 'aren', text, expression, scene: 'examine', vo: false, auto_advance_allowed: true });

// A small number of optional looks around the lounge before the knocks (approved decision 4).
// Each is a single dry aside; the clock line reads the evening's real time.
export const examines = [
  { id: 'sign', x: -4.5, z: -3.95, range: 1.5, mark: [-4.8, 3.3, -5.35], label: 'The sign', detail: 'MAKE YOURSELF AT HOME', line: A('s11_x01', 'Make yourself at home, says the sign. Somebody here means it.') },
  { id: 'repairs', x: -1.9, z: 4.55, range: 1.4, mark: [-1.9, 1.3, 4.08], label: 'The sofa', detail: 'CAREFUL REPAIRS', line: A('s11_x02', 'Careful repairs, all in the same thread. Nothing in this house gets thrown away easily.', 'thinking') },
  { id: 'clock', x: .3, z: -3.45, range: 1.4, mark: [.17, 2.72, -4.78], label: 'The mantel clock', detail: 'OLD · LOUD · PUNCTUAL', line: A('s11_x03', 'The mantel clock says {time}. Old, loud and, as far as I can tell, exactly right.', 'thinking') },
  { id: 'phone', x: 4.55, z: .75, range: 1.3, mark: [5.5, 1.78, 2.2], label: 'The telephone', detail: 'THE ONLY LINE OUT', line: A('s11_x04', 'A black telephone, polished by years of worried calls about the road.') }
];
export const examineStories = ['arrivalWelcome', 'arrival', 'pressure', 'eveningBreath'];
// Before the first contradiction the desk gives only a nudge toward what matters first.
export const deskEarlyLine = A('s11_x05', 'Papers everywhere. The desk can wait. First: what stopped?', 'thinking');

// Observe (approved decision 5): visible details only, chosen on the full figure. Any kept
// observation satisfies the first Case Note. Spots are % positions over the full-figure crop.
export const observe11 = {
  elias: {
    title: 'Elias Brann', intro: 'Spectacles. A case. A steady stance.', pose: 'concerned',
    details: [
      { id: 'spectacles', label: 'Rectangular spectacles', x: 48, y: 14, text: 'Plain rectangular frames. His eyes keep returning to whoever is speaking.' },
      { id: 'case', label: 'Document case', x: 86, y: 76, text: 'A structured case held at his side. Nothing inside it is visible.' },
      { id: 'posture', label: 'Steady posture', x: 45, y: 93, text: 'He stands clear of the doorway, making space for the others.' }
    ],
    remember: 'Rectangular spectacles, a document case, and a steady stance. He listens carefully. These are observations, not a conclusion about him.',
    after: ['s7_31']
  },
  mira: {
    title: 'Mira Senn', intro: 'Quick eyes. A scarf. A camera.', pose: 'concerned',
    details: [
      { id: 'scarf', label: 'Rust-red scarf', x: 22, y: 22, text: 'Wool, worn twice around. One end has a fresh snag.' },
      { id: 'camera', label: 'A camera, kept ready', x: 27, y: 35, text: 'Held at chest height, the lens cap already off.' },
      { id: 'eyes', label: 'Where she looks', x: 35, y: 8, text: 'She watches the doorways more than the people in them.' }
    ],
    remember: 'Rust-red scarf with a fresh snag at one end; a camera kept ready; she watches the doorways. Observations, not conclusions.',
    after: [A('s11_o01', 'She keeps one eye on the door. Perhaps that is only a writer’s habit.', 'thinking')]
  },
  ada: {
    title: 'Ada Moss', intro: 'Keys. An apron. A long evening.', pose: 'guarded',
    details: [
      { id: 'keys', label: 'A ring of house keys', x: 29, y: 50, text: 'Old keys on a brass ring, held in both hands. She has not put them down all evening.' },
      { id: 'apron', label: 'A working apron', x: 42, y: 64, text: 'Tied over her dress. She has been on her feet since before anyone arrived.' },
      { id: 'eyes', label: 'Her eyes', x: 31, y: 9, text: 'Tired, and watchful. She notices every guest who stands up.' }
    ],
    remember: 'House keys held in both hands; a working apron; tired, watchful eyes. Observations, not conclusions.',
    after: [A('s11_o02', 'She has been working all evening. She is still working now.', 'thinking')]
  }
};

// Case Note 01 in the same grammar as Notes 02–04. The sentence and answers are the Step 7
// conclusion; the only distractors are the knock time (Mira's assumption) and the other kept item.
export const caseNote01 = {
  id: 'first', title: 'Six minutes apart.',
  sentence: ['Victor’s watch stopped at ', { key: 'time', answer: '9:08', choices: ['9:14', '9:08'] }, ', so the ', { key: 'sound', answer: 'Four Knocks', choices: ['stopped watch', 'Four Knocks'] }, ' cannot prove he was alive at 9:14.'],
  conclusion: 'The knocks prove nothing about whether Victor was alive.'
};

// Timeline entries sort by the first clock time in their label; "After 9:30" sorts after 9:30.
export function minutesOf(label) {
  const m = /(\d{1,2}):(\d{2})/.exec(label || '');
  if (!m) return /dawn/i.test(label) ? 24 * 60 : 23 * 60;
  let h = +m[1] % 12; if (!/AM/i.test(label)) h += 12;
  return h * 60 + +m[2] + (/after/i.test(label) ? .5 : 0) + (/onward/i.test(label) ? .1 : 0);
}

// Case boards. Time boards place bands and pins between `from` and `to` (evening clock times).
export const boards = {
  mira: {
    kicker: 'CASE NOTE 02 · AN EARLIER SEARCH', from: '8:15', to: '9:20', ticks: ['8:20', '8:30', '8:40', '8:50', '9:00', '9:10', '9:20'],
    items: [
      { kind: 'band', cls: 'rust', from: '8:29', to: '8:34', label: 'Mira searches Victor’s room' },
      { kind: 'band', cls: 'moss', from: '8:34', to: '9:14', label: 'Mira beside Ada, downstairs' },
      { kind: 'pin', at: '8:37', label: 'Victor goes upstairs', low: true },
      { kind: 'pin', cls: 'rust', at: '9:08', label: 'The watch stops' }
    ],
    conclusion: 'A lie is not a murder.', line: 's81_mira_note'
  },
  brann: {
    kicker: 'CASE NOTE 03 · AN ADMISSION ON TAPE', cards: [
      { art: 'recorder', title: 'An empty recorder', text: 'Brought to record an admission.' },
      { art: 'document', title: 'Dev Brann’s letter', text: 'Kaveri Heights. A signature under pressure.' }
    ],
    struck: 'A planned killing', conclusion: 'A confrontation was planned. The killing is another question.', line: 's81_brann_note'
  },
  whole: {
    kicker: 'THE WHOLE EVENING', from: '8:20', to: '9:20', ticks: ['8:30', '8:40', '8:50', '9:00', '9:10', '9:20'],
    items: [
      { kind: 'band', cls: 'moss', from: '8:29', to: '8:34', label: 'Mira’s search · earlier', low: true },
      { kind: 'band', cls: 'rust', from: '8:51', to: '9:13', label: 'Elias upstairs' },
      { kind: 'pin', at: '8:53', label: 'Victor lets him in', low: true },
      { kind: 'pin', cls: 'rust', at: '9:08', label: 'The watch stops · the first blow', t2: true },
      { kind: 'pin', at: '9:12', label: 'Latch pulled shut', low: true, t2: true },
      { kind: 'pin', cls: 'brass', at: '9:14', label: 'Four knocks · all four of us downstairs' }
    ],
    conclusion: 'Human hands. A latch pulled shut. The knocks have no established source.'
  }
};

// The opening, rebuilt from processed plates (assets/opening-v11). Shot 2 composites the game's
// own Aren over the carriage window; plate 6 is replaced by the live veranda door.
export const openingV11 = [
  { id: 'message', plate: '01', line: 's81_o01', subtitle: false, caption: 'An unsigned message.', seconds: 6.2, from: [1.0, 1, 0], to: [1.07, -1, -1], glows: [{ x: 90, y: 6, r: 22 }] },
  { id: 'carriage', composite: 'carriage', line: 's81_o02', caption: 'Aren Vale · Travelling through', seconds: 5.6, from: [1.0, 0, 0], to: [1.05, -1, 0] },
  { id: 'road', plate: '03', line: 's81_o03', caption: 'Western Ghats · Monsoon, 1999', seconds: 5.2, from: [1.08, 2, 0], to: [1.02, -2, 1] },
  { id: 'house', plate: '04', line: 's81_o04', caption: 'Cedar House', seconds: 5.8, from: [1.0, 0, 1], to: [1.1, 2, -1], glows: [{ x: 60, y: 47, r: 9 }, { x: 77, y: 46, r: 8 }, { x: 69, y: 70, r: 10 }, { x: 88, y: 83, r: 6 }] },
  { id: 'porch', plate: '05', caption: '6:32 PM', seconds: 4.2, from: [1.02, 0, 0], to: [1.08, 0, -1], glows: [{ x: 22, y: 42, r: 10 }] }
];
