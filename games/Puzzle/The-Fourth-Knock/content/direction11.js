// Step 11 line direction. Text, IDs and voice files are untouched; this table only decides how
// each line is staged: its presentation mode, the speaker's pose, what the listeners do, where
// eyes go, how long the moment holds and which evidence is recalled.
//
// Modes: talk (lower-third, in the room) · aside (Aren's torn-notebook narration, sepia world)
// incidental (caption hung above the speaker) · interview (two figures, questioning)
// confront (two figures + evidence insert) · gravity (one figure, room withdrawn)
// plain (words alone) · accuse (room in view, evidence recalled above)
//
// pose: expressions for anyone · head: held head attitude (bow, grave, up, tilt, back, listen)
// gesture: one-off head beat (nod, take, turn) · look: facing targets ('stairs', 'door', 'body',
// or a character) · figure: who holds the gravity cut-in · hold / pre: seconds added after/before
// · evidence: insert shown above the exchange · vo:false marks text-only lines.
export const lineDirection = {
  // Arrival
  s8_a01: { mode: 'aside' },
  s8_a02: { mode: 'talk', pose: { ada: 'warm' }, gesture: { aren: 'nod' } },
  s8_a03: { mode: 'talk', pose: { aren: 'neutral' } },
  s8_a04: { mode: 'talk', pose: { ada: 'practical' } },
  s8_a05: { mode: 'talk', pose: { mira: 'curious' }, look: { elias: 'mira' } },
  s8_a06: { mode: 'talk', pose: { aren: 'amused' }, react: { mira: 'skeptical' } },
  s8_a07: { mode: 'talk', pose: { elias: 'helpful' }, look: { mira: 'elias' } },
  s8_a08: { mode: 'talk', pose: { mira: 'amused' }, react: { elias: 'calm' }, gesture: { elias: 'nod' } },
  // Victor, pressure, folklore, dinner
  s8_v01: { mode: 'talk', pose: { victor: 'polished' }, react: { ada: 'reserved' }, look: { mira: 'victor', elias: 'victor', ada: 'victor' } },
  s8_v02: { mode: 'talk', pose: { ada: 'guarded' } },
  s8_v03: { mode: 'talk', pose: { victor: 'polished' }, react: { ada: 'uneasy' }, head: { ada: 'grave' } },
  s8_p01: { mode: 'talk', pose: { aren: 'neutral' }, head: { ada: 'none' } },
  s8_p02: { mode: 'talk', pose: { victor: 'dismissive' }, react: { ada: 'guarded', mira: 'skeptical' } },
  s8_p03: { mode: 'talk', pose: { ada: 'irritated' }, head: { ada: 'back' } },
  s8_p04: { mode: 'talk', pose: { victor: 'annoyed' }, react: { ada: 'uneasy' }, head: { ada: 'bow' }, hold: .35 },
  s8_p07: { mode: 'talk', pose: { ada: 'practical' }, head: { ada: 'none' }, react: { mira: 'curious', elias: 'calm' }, look: { mira: 'ada', elias: 'ada', victor: 'ada' }, hold: .9 },
  s8_p08: { mode: 'talk', pose: { aren: 'amused' }, gesture: { ada: 'nod' } },
  s8_p05: { mode: 'talk', pose: { mira: 'curious' }, look: { victor: 'mira' } },
  s8_p06: { mode: 'talk', pose: { victor: 'dismissive' }, react: { mira: 'guarded' }, gesture: { mira: 'take' } },
  s9_road: { mode: 'incidental', pose: { ada: 'practical' } },
  // After the knocks
  s7_02: { mode: 'talk', pose: { mira: 'alert' }, look: { mira: 'stairs' }, head: { mira: 'up' } },
  s7_03: { mode: 'talk', pose: { elias: 'concerned' }, look: { elias: 'stairs' } },
  s7_04: { mode: 'talk', pose: { ada: 'uneasy' }, head: { mira: 'none', ada: 'none' } },
  s7_05: { mode: 'aside', pose: { aren: 'neutral' } },
  s7_06: { mode: 'incidental', pose: { ada: 'uneasy' }, look: { ada: 'door' } },
  s7_07: { mode: 'talk', pose: { ada: 'guarded' } },
  s7_08: { mode: 'talk', pose: { mira: 'concerned' } },
  s7_09: { mode: 'talk', pose: { elias: 'helpful' } },
  s7_10: { mode: 'incidental', pose: { ada: 'practical' }, look: { ada: 'door' } },
  // Discovery
  s7_11: { mode: 'plain', pose: { aren: 'grave' }, head: { aren: 'bow' }, react: { ada: 'shock' }, pre: .3, hold: .6 },
  s7_12: { mode: 'talk', pose: { elias: 'shock' }, hold: .2 },
  s7_14: { mode: 'talk', pose: { mira: 'skeptical' } },
  s7_16: { mode: 'talk', pose: { ada: 'guarded' }, head: { ada: 'grave' } },
  s81_clear: { mode: 'talk', pose: { ada: 'solemn' } },
  // Watch and first questions
  s7_18: { mode: 'aside' },
  s81_watch: { mode: 'aside', pose: { aren: 'thinking' } },
  s7_21: { mode: 'interview' }, s7_22: { mode: 'interview', pose: { mira: 'alert' } },
  s7_23: { mode: 'interview' }, s7_24: { mode: 'interview', pose: { mira: 'guarded' } },
  s7_25: { mode: 'interview' }, s7_26: { mode: 'interview', pose: { ada: 'guarded' } },
  s7_27: { mode: 'interview', pose: { aren: 'thinking' } }, s7_28: { mode: 'interview', pose: { ada: 'practical' } },
  s7_29: { mode: 'interview' }, s7_30: { mode: 'interview', pose: { elias: 'concerned' } },
  s7_31: { mode: 'aside' },
  // Mira
  s8_m01: { mode: 'interview', pose: { aren: 'serious' } },
  s8_m02: { mode: 'interview', pose: { mira: 'guarded' } },
  s8_m03: { mode: 'confront', pose: { aren: 'accuse' }, react: { mira: 'concerned' }, evidence: 'trace', hold: .4 },
  s81_private: { mode: 'talk', pose: { mira: 'guarded' }, head: { mira: 'grave' } },
  s8_m04: { mode: 'gravity', figure: 'mira', pose: { mira: 'defensive' } },
  s8_m05: { mode: 'gravity', figure: 'mira', pose: { mira: 'serious' } },
  s8_m06: { mode: 'gravity', figure: 'mira', pose: { aren: 'serious' } },
  s8_m07: { mode: 'gravity', figure: 'mira', pose: { mira: 'concerned' } },
  s8_m08: { mode: 'interview', pose: { mira: 'serious' } },
  // Ada
  s8_d01: { mode: 'interview' }, s8_d02: { mode: 'interview', pose: { ada: 'practical' } }, s8_d03: { mode: 'interview', pose: { ada: 'solemn' } },
  s8_d04: { mode: 'gravity', figure: 'ada' },
  s8_d05: { mode: 'gravity', figure: 'ada', pose: { ada: 'worried' }, head: { ada: 'bow' } },
  s8_d06: { mode: 'gravity', figure: 'ada', pose: { ada: 'solemn' }, head: { ada: 'none' } },
  s8_d07: { mode: 'gravity', figure: 'ada', pose: { ada: 'solemn' }, head: { ada: 'grave' }, hold: .5 },
  // Elias — Kaveri Heights. Plain, respectful, no flourish.
  s8_e01: { mode: 'confront', pose: { aren: 'serious' }, evidence: 'document' },
  s8_e02: { mode: 'gravity', figure: 'elias', pose: { elias: 'careful' }, head: { elias: 'grave' } },
  s8_e03: { mode: 'gravity', figure: 'elias', pose: { elias: 'careful' }, head: { elias: 'grave' } },
  s8_e04: { mode: 'gravity', figure: 'elias', pose: { elias: 'grief' }, head: { elias: 'bow' }, hold: 1.1 },
  s8_e05: { mode: 'gravity', figure: 'elias', pose: { aren: 'serious' } },
  s8_e06: { mode: 'gravity', figure: 'elias', pose: { elias: 'careful' }, head: { elias: 'none' } },
  s8_r01: { mode: 'confront', pose: { aren: 'serious' }, evidence: 'recorder' },
  s8_r02: { mode: 'confront', pose: { elias: 'careful' } },
  s8_r03: { mode: 'confront', pose: { aren: 'accuse' }, evidence: 'match', hold: .4 },
  s8_r04: { mode: 'confront', pose: { elias: 'pressured' } },
  s8_r05: { mode: 'aside', pose: { aren: 'thinking' } },
  // Latch, payoffs
  s9_latch: { mode: 'aside', pose: { aren: 'thinking' } },
  s81_mira_note: { mode: 'aside' },
  s81_brann_note: { mode: 'aside' },
  // Accusation and confession
  s81_gather: { mode: 'plain', pose: { aren: 'serious' } },
  s8_c01: { mode: 'accuse', pose: { aren: 'accuse', elias: 'careful' }, evidence: 'match', react: { mira: 'alert', ada: 'guarded' } },
  s8_c02: { mode: 'accuse', pose: { aren: 'accuse' }, evidence: 'bookend', head: { ada: 'grave' } },
  s8_c03: { mode: 'accuse', pose: { aren: 'serious' }, evidence: 'watch' },
  s8_c04: { mode: 'accuse', pose: { aren: 'serious', elias: 'pressured' }, evidence: 'latch', hold: .5 },
  s8_c05: { mode: 'gravity', figure: 'elias', pose: { elias: 'shaken' }, head: { elias: 'bow' }, pre: .4 },
  s8_c06: { mode: 'plain', pose: { aren: 'serious' }, head: { aren: 'none' } },
  s8_c07: { mode: 'gravity', figure: 'elias', pose: { elias: 'resigned' }, head: { elias: 'bow' } },
  s8_c08: { mode: 'gravity', figure: 'elias', pose: { elias: 'shaken' }, head: { elias: 'grave' } },
  s8_c09: { mode: 'gravity', figure: 'elias', pose: { elias: 'resigned' }, head: { elias: 'grave' } },
  s8_c10: { mode: 'plain', pose: { aren: 'serious' } },
  s8_c11: { mode: 'gravity', figure: 'elias', pose: { elias: 'resigned' }, head: { elias: 'none' }, react: { ada: 'guarded' }, hold: .3 },
  s8_c12: { mode: 'plain', pose: { aren: 'serious' }, look: { aren: 'stairs' }, head: { aren: 'up' }, hold: .9 },
  // Dawn
  s8_z01: { mode: 'talk', pose: { ada: 'solemn' }, head: { ada: 'grave' } },
  s8_z02: { mode: 'aside', pose: { aren: 'serious' } },
  // Step 11 text-only reading (never voiced): optional examines and Observe afterthoughts.
  s11_x01: { mode: 'aside', vo: false }, s11_x02: { mode: 'aside', vo: false },
  s11_x03: { mode: 'aside', vo: false }, s11_x04: { mode: 'aside', vo: false },
  s11_o01: { mode: 'aside', vo: false }, s11_o02: { mode: 'aside', vo: false },
  s11_x05: { mode: 'aside', vo: false }
};

// Old mode names used by the controllers map onto the Step 11 grammar.
export const legacyModes = { group: 'talk', conversation: 'interview', serious: 'gravity', internal: 'aside', incidental: 'incidental' };
