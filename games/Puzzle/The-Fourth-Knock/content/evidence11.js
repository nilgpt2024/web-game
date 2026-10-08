// Step 11 evidence art and "look closer" details. Illustrations share the cutouts' language:
// a firm ink line, flat fills, one shade, cream highlights. Details are what the player notices
// before the card says what it means. Text here is on-screen only (no voice lines).
const INK = '#1d242a', PAPER = '#efe4c8', SHADE = '#d9c79c', BRASS = '#c9a55e', BRASS_D = '#8b6c38', RUST = '#ad4f38', LEATHER = '#5b3a29';
const svg = (inside, label) => `<svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}" stroke-linejoin="round" stroke-linecap="round">${inside}</svg>`;
const ticks = () => Array.from({ length: 12 }, (_, i) => {
  const a = i * Math.PI / 6, r1 = i % 3 ? 84 : 78, r2 = 92;
  return `<line x1="${(Math.sin(a) * r1).toFixed(1)}" y1="${(-Math.cos(a) * r1).toFixed(1)}" x2="${(Math.sin(a) * r2).toFixed(1)}" y2="${(-Math.cos(a) * r2).toFixed(1)}" stroke="${INK}" stroke-width="${i % 3 ? 3 : 5}"/>`;
}).join('');
const hand = (deg, len, w) => { const a = deg * Math.PI / 180; return `<line x1="0" y1="0" x2="${(Math.sin(a) * len).toFixed(1)}" y2="${(-Math.cos(a) * len).toFixed(1)}" stroke="${INK}" stroke-width="${w}"/>`; };

export const watchArt = svg(`
<ellipse cx="300" cy="222" rx="250" ry="150" fill="#3a2732" opacity=".55"/>
<g transform="translate(300 210) rotate(-16)">
  <path d="M-58 -250 L58 -250 L64 -96 L-64 -96 Z" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/>
  <path d="M-64 96 L64 96 L58 250 L-58 250 Z" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/>
  <path d="M-40 -236 v120 M40 -236 v120 M-40 116 v120 M40 116 v120" stroke="#7a5238" stroke-width="3" stroke-dasharray="7 9"/>
  <circle r="122" fill="${BRASS_D}" stroke="${INK}" stroke-width="6"/>
  <circle r="112" fill="${BRASS}"/>
  <path d="M-96 -52 A112 112 0 0 1 52 -99" stroke="#ecd594" stroke-width="7" fill="none" opacity=".8"/>
  <rect x="116" y="-14" width="22" height="28" rx="4" fill="${BRASS}" stroke="${INK}" stroke-width="4"/>
  <circle r="98" fill="#efe7cf" stroke="${BRASS_D}" stroke-width="4"/>
  ${ticks()}
  <g font-family="Newsreader, Georgia, serif" font-size="24" fill="${INK}" text-anchor="middle"><text y="-54">12</text><text x="62" y="9">3</text><text y="72">6</text><text x="-62" y="9">9</text></g>
  <text y="40" font-family="Courier Prime, monospace" font-size="10" letter-spacing="3" text-anchor="middle" fill="#6d6452">MECHANICAL</text>
  ${hand(274, 52, 9)}${hand(48, 78, 6)}
  <circle r="8" fill="${INK}"/>
  <path d="M-86 -44 L-38 -20 L-58 12 L-8 34 M-38 -20 L6 -58 L48 -70 M-8 34 L22 80 M6 -58 L-18 -92" stroke="#fdfdf6" stroke-width="3" fill="none" opacity=".92"/>
  <path d="M-86 -44 L-38 -20 L-58 12 L-8 34" stroke="#8fb4c8" stroke-width="1.5" fill="none" transform="translate(2 2)" opacity=".7"/>
</g>`, 'A cracked mechanical wristwatch stopped at 9:08');

const art = {
  thread: svg(`
<rect x="30" y="120" width="540" height="200" rx="10" fill="#6e4a33" stroke="${INK}" stroke-width="6"/>
<rect x="30" y="120" width="540" height="40" fill="#845a3e" stroke="${INK}" stroke-width="6"/>
<path d="M60 190 C200 184 330 200 540 188 M60 232 C220 240 360 224 540 236 M60 274 C180 268 400 282 540 270" stroke="#56392a" stroke-width="3" fill="none"/>
<rect x="258" y="206" width="84" height="26" rx="12" fill="${BRASS}" stroke="${INK}" stroke-width="5"/>
<path d="M392 122 L408 96 L418 124 Z" fill="#9b6c4b" stroke="${INK}" stroke-width="4"/>
<path d="M408 104 C430 70 470 84 452 112 C438 134 402 126 414 150 C426 176 470 168 486 196 C498 218 476 236 462 226" stroke="${RUST}" stroke-width="7" fill="none"/>
<path d="M408 104 C430 70 470 84 452 112" stroke="#d6795b" stroke-width="2.5" fill="none"/>
<path d="M462 226 l-10 16 M466 228 l2 18 M470 224 l14 10" stroke="${RUST}" stroke-width="3"/>`, 'A rust thread snagged on the drawer'),

  document: svg(`
<g transform="rotate(-3 300 210)">
<path d="M120 26 H484 V300 L462 318 L446 300 L428 326 L404 304 L384 330 L360 308 L338 334 L316 312 L292 338 L270 316 L246 342 L222 318 L198 344 L176 320 L150 346 L132 326 L120 340 Z" fill="${PAPER}" stroke="${INK}" stroke-width="5"/>
<path d="M120 26 H484 V60 H120 Z" fill="#e6d8b4"/>
<g font-family="Courier Prime, Courier New, monospace" font-size="17" fill="#2b2a26">
<text x="146" y="92">V. Soren —</text><text x="146" y="118">Kaveri Heights.</text>
<text x="146" y="156">The revised material schedule</text><text x="146" y="180">was withheld. I signed under</text>
<text x="146" y="204">pressure. I cannot let my</text><text x="146" y="228">signature conceal the warnings.</text>
</g>
<path d="M300 262 C310 238 326 270 338 250 C348 234 356 268 372 248 C386 232 392 262 410 244 M300 270 C340 262 380 266 424 258" stroke="#27324a" stroke-width="3" fill="none"/>
<text x="302" y="292" font-family="Courier Prime, monospace" font-size="15" fill="#2b2a26">— Dev Brann</text>
<path d="M150 318 h18 m8 0 h10 m12 0 h22 m10 0 h6" stroke="#2b2a26" stroke-width="3" opacity=".55"/>
</g>`, 'A torn typed letter signed Dev Brann'),

  recorder: svg(`
<rect x="92" y="96" width="400" height="220" rx="18" fill="#4b5659" stroke="${INK}" stroke-width="6"/>
<rect x="116" y="126" width="190" height="126" rx="8" fill="#1b2326" stroke="${INK}" stroke-width="4"/>
<path d="M116 126 L96 60 L286 40 L306 126" fill="#6f7c80" stroke="${INK}" stroke-width="5"/>
<path d="M130 112 L116 70 L270 54 L284 112" fill="none" stroke="#90a0a4" stroke-width="3"/>
<circle cx="170" cy="190" r="16" fill="none" stroke="#3a4549" stroke-width="4"/><circle cx="252" cy="190" r="16" fill="none" stroke="#3a4549" stroke-width="4"/>
<text x="211" y="238" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-size="15" letter-spacing="3" fill="#8b979a">EMPTY</text>
<rect x="330" y="136" width="140" height="40" rx="4" fill="${PAPER}" stroke="${INK}" stroke-width="3"/>
<text x="400" y="154" text-anchor="middle" font-family="Courier Prime, monospace" font-size="12" fill="#2b2a26">D. BRANN —</text>
<text x="400" y="169" text-anchor="middle" font-family="Courier Prime, monospace" font-size="12" fill="#2b2a26">RECORDS</text>
<g fill="#c7c9bd" stroke="${INK}" stroke-width="3"><rect x="330" y="200" width="30" height="34" rx="3"/><rect x="366" y="200" width="30" height="34" rx="3"/><rect x="402" y="200" width="30" height="34" rx="3"/><rect x="438" y="200" width="30" height="34" rx="3" fill="${RUST}"/></g>
<path d="M150 336 L262 322 L276 368 L236 360 L214 382 L196 362 L160 376 Z" fill="${PAPER}" stroke="${INK}" stroke-width="4"/>
<path d="M172 348 h60 M176 360 h34" stroke="#9b8c66" stroke-width="3"/>`, 'An open cassette recorder, its tape missing, beside a torn sleeve'),

  bookend: svg(`
<g opacity=".78"><path d="M424 72 h78 v196 h-78 Z" fill="#8f8a78" stroke="${INK}" stroke-width="5"/><path d="M430 84 h66" stroke="#b3ad99" stroke-width="4"/><circle cx="450" cy="120" r="4" fill="#b7b1a0"/><circle cx="476" cy="160" r="3" fill="#b7b1a0"/><circle cx="458" cy="210" r="4" fill="#b7b1a0"/></g>
<path d="M120 300 H402 V334 H120 Z" fill="${BRASS_D}" stroke="${INK}" stroke-width="6"/>
<path d="M150 300 V92 L256 60 L300 96 V300 Z" fill="${BRASS}" stroke="${INK}" stroke-width="6"/>
<path d="M170 290 L278 110" stroke="#f4e3a8" stroke-width="22" opacity=".55"/>
<path d="M176 280 L270 124" stroke="#fff4c9" stroke-width="6" opacity=".7"/>
<path d="M258 272 C268 262 282 270 288 282 C280 290 262 290 258 272 Z" fill="#4a2a24" opacity=".85"/>
<path d="M300 318 L402 306 L412 346 L326 356 Z" fill="${PAPER}" stroke="${INK}" stroke-width="4"/>
<path d="M340 330 C356 324 372 338 390 328" stroke="#4a2a24" stroke-width="4" opacity=".75"/>`, 'A wiped brass bookend beside its dusty pair'),

  impacts: svg(`
<rect x="40" y="60" width="520" height="300" rx="8" fill="#3a2a31" stroke="${INK}" stroke-width="5"/>
<path d="M40 120 H560 M40 180 H560 M40 240 H560 M40 300 H560" stroke="#4c3740" stroke-width="3"/>
<circle cx="190" cy="200" r="46" fill="none" stroke="${PAPER}" stroke-width="5" stroke-dasharray="10 8"/>
<text x="190" y="214" text-anchor="middle" font-family="Newsreader, Georgia, serif" font-size="38" fill="${PAPER}">1</text>
<circle cx="236" cy="252" r="9" fill="${BRASS}" stroke="${INK}" stroke-width="3"/>
<path d="M244 188 C300 170 340 196 372 206" stroke="#c8b98f" stroke-width="5" fill="none" stroke-dasharray="4 10"/>
<path d="M360 196 l16 12 l-18 8" stroke="#c8b98f" stroke-width="5" fill="none"/>
<circle cx="424" cy="218" r="46" fill="none" stroke="${RUST}" stroke-width="5" stroke-dasharray="10 8"/>
<text x="424" y="232" text-anchor="middle" font-family="Newsreader, Georgia, serif" font-size="38" fill="#e7a58d">2</text>`, 'Two separate impact marks on the floor'),

  kaveri: svg(`
<path d="M130 24 H470 V380 H130 Z" fill="#e4e2da" stroke="${INK}" stroke-width="5"/>
<g fill="#b9b7ad"><circle cx="160" cy="60" r="2"/><circle cx="430" cy="90" r="1.6"/><circle cx="210" cy="330" r="2"/><circle cx="398" cy="352" r="1.8"/><circle cx="330" cy="46" r="1.4"/></g>
<text x="300" y="66" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-size="22" font-weight="700" letter-spacing="2" fill="#2a2d30">KAVERI HEIGHTS · BLOCK C</text>
<path d="M150 80 H450" stroke="#2a2d30" stroke-width="3"/>
<g font-family="Courier Prime, monospace" font-size="14" fill="#2a2d30">
<text x="152" y="112">Material schedule ....... REVISED</text>
<text x="152" y="138">Substitution ........... APPROVED</text>
<text x="152" y="164">Structural certificate . REVISED</text>
<text x="152" y="190">Signed ................. D. BRANN</text>
<text x="152" y="216">Site warnings .......... NOT FILED</text>
</g>
<path d="M150 236 H450" stroke="#2a2d30" stroke-width="2"/>
<text x="152" y="266" font-family="Newsreader, Georgia, serif" font-size="18" fill="#2a2d30">Part of Block C failed in severe rain.</text>
<text x="152" y="292" font-family="Newsreader, Georgia, serif" font-size="18" fill="#2a2d30">Six residents died.</text>
<text x="330" y="354" font-family="Newsreader, Georgia, serif" font-style="italic" font-size="17" fill="#7a3b2c" transform="rotate(-4 330 354)">same network → Cedar House?</text>`, 'A photocopied Kaveri Heights page'),

  door: svg(`<rect x="160" y="30" width="280" height="360" rx="6" fill="#5d6a45" stroke="${INK}" stroke-width="6"/><rect x="386" y="190" width="28" height="60" rx="4" fill="${BRASS}" stroke="${INK}" stroke-width="4"/>`, 'Victor\'s door')
};

export const clueArt = kind => art[kind] || art.door;

// The fragment from the floor meets the sheet from Elias's case; the wiping streak runs across.
export const matchArt = svg(`
<g class="match-left"><path d="M60 60 H300 L286 92 L304 124 L282 160 L302 196 L280 232 L300 268 L284 300 L298 336 H60 Z" fill="${PAPER}" stroke="${INK}" stroke-width="5"/>
<path d="M88 104 H258 M88 134 H244 M88 164 H262 M88 194 H236" stroke="#8d8064" stroke-width="4"/></g>
<g class="match-right"><path d="M306 60 H540 V336 H304 L290 300 L306 268 L286 232 L308 196 L288 160 L310 124 L292 92 Z" fill="#e6dcc0" stroke="${INK}" stroke-width="5"/>
<path d="M332 104 H508 M330 134 H496 M334 164 H512 M332 194 H488" stroke="#8d8064" stroke-width="4"/></g>
<path d="M150 262 C230 240 330 250 450 226" stroke="#4a2a24" stroke-width="10" opacity=".7" fill="none"/>
<path d="M150 262 C230 240 330 250 450 226" stroke="#6b4035" stroke-width="3" opacity=".8" fill="none"/>`, 'The torn fragment fits the sheet from the case; one wiping streak crosses both');

// "Look closer": spots are % positions over the art. The key spot reveals the case term.
export const lookCloser = {
  watch: { term: '9:08', spots: [
    { x: 36, y: 34, label: 'The glass', see: 'Cracked from a hard knock, not from wear.' },
    { x: 50, y: 52, label: 'The hands', see: 'Both hands still. Nine-oh-eight.', key: true },
    { x: 72, y: 56, label: 'The movement', see: 'Mechanical, and still. It stopped when it was damaged. That is not the same as a time of death.' }] },
  trace: { term: 'Scarf thread', spots: [
    { x: 76, y: 38, label: 'The thread', see: 'A rust thread, caught on a splinter of the drawer.', key: true },
    { x: 50, y: 52, label: 'The drawer', see: 'Pulled out, then pushed back in a hurry.' }] },
  document: { term: 'Torn Document', spots: [
    { x: 45, y: 24, label: 'The address', see: 'Addressed to Victor, about Kaveri Heights.' },
    { x: 58, y: 66, label: 'The signature', see: 'Signed Dev Brann.', key: true },
    { x: 34, y: 84, label: 'The tear', see: 'Torn across a sentence. The rest is missing.' }] },
  recorder: { term: 'Missing Tape', spots: [
    { x: 35, y: 45, label: 'The compartment', see: 'Open, and empty. Someone took the tape.', key: true },
    { x: 67, y: 37, label: 'The label', see: 'D. BRANN — RECORDS.' },
    { x: 36, y: 86, label: 'The sleeve', see: 'A cassette sleeve, torn open in a hurry.' }] },
  bookend: { term: 'Cleaned Bookend', spots: [
    { x: 38, y: 46, label: 'The face', see: 'The brass has been wiped, recently and fast.' },
    { x: 46, y: 66, label: 'The corner', see: 'A dark trace the cloth missed.', key: true },
    { x: 77, y: 40, label: 'Its pair', see: 'The matching bookend is still dusty.' }] },
  impacts: { term: 'Two impacts', spots: [
    { x: 32, y: 48, label: 'The first mark', see: 'Where he fell. His watch broke here.' },
    { x: 52, y: 46, label: 'The scuff', see: 'He moved after the fall.' },
    { x: 71, y: 52, label: 'The second mark', see: 'A second impact, after he was already down.', key: true }] },
  kaveri: { term: 'Kaveri Heights', spots: [
    { x: 48, y: 46, label: 'The signature', see: 'Revised certificates, signed D. Brann.' },
    { x: 44, y: 68, label: 'The failure', see: 'Six residents died when Block C failed.', key: true },
    { x: 66, y: 84, label: 'A pencil note', see: 'Mira\'s question: the same network, now at Cedar House.' }] }
};
