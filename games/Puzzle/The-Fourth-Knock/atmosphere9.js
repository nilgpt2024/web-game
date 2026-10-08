// One state table owns the emotional lighting, grade, negative space, environmental motion and
// audio mix. Light values multiply the existing room lights; `look` feeds the display-space grade
// pass; `actor` tints the illustrated cutouts so they belong to the same light as the room.
// Step 14: music IDs and gains are the final score's states (M01-M11; see AUDIO_MIX_MAP_FINAL.md). Final
// music files are mastered to -20 LUFS, so these gains place each state's music at its measured target.
const look = (o = {}) => ({
  exposure: 1, sat: 1, contrast: 1, split: 0, vignette: 0.28, grain: 0.028,
  lift: [0, 0, 0], gain: [1, 1, 1], shadowTint: [0, 0, 0], highTint: [0, 0, 0],
  vignetteColor: [0.16, 0.2, 0.26], voidTop: [0.085, 0.1, 0.13], voidBottom: [0.05, 0.06, 0.08], ...o
});
const profile = (sky, fill, practical, range, exposure, zoom, grade, music, musicGain, ambienceGain, motion = 1, rain = 1, extra = {}) =>
  ({ sky, fill, practical, range, exposure, zoom, grade, music, musicGain, ambienceGain, motion, rain,
     fire: 1, freeze: 0, actor: [1, 0.975, 0.93], look: look(), ...extra });

export const atmosphereStates = {
  arrival: profile(1, 1, 1, 1, 1, 0, 'warm', 'mus_lounge_loop', .40, .34, 1, 1, {
    actor: [1, 0.97, 0.9],
    look: look({ sat: 1.07, contrast: 1.03, split: .07, shadowTint: [0, .012, .035], highTint: [.035, .018, 0], gain: [1.02, 1, .97], vignette: .26, voidTop: [.11, .12, .15], voidBottom: [.06, .07, .09] }) }),
  victor_arrives: profile(.98, .94, .98, .98, 1, .01, 'warm', 'mus_social_unease', .355, .30, 1, 1, {
    actor: [.99, .965, .92],
    look: look({ sat: 1.02, contrast: 1.05, split: .08, shadowTint: [0, .014, .045], highTint: [.03, .015, 0], vignette: .3, voidTop: [.095, .105, .135], voidBottom: [.05, .06, .08] }) }),
  social_unease: profile(.95, .87, .98, .96, .99, .01, 'rupture', 'mus_evening', .316, .32, .85, 1.06, {
    fire: 1.08, actor: [.98, .95, .9],
    look: look({ sat: .99, contrast: 1.09, split: .11, shadowTint: [0, .016, .055], highTint: [.045, .02, 0], vignette: .36, voidTop: [.075, .085, .11], voidBottom: [.04, .045, .06] }) }),
  pre_knock: profile(.94, .84, .96, .95, .99, 0, 'rupture', 'mus_pre_knock', .224, .32, .65, 1.1, {
    fire: .72, actor: [.95, .93, .9],
    look: look({ sat: .92, contrast: 1.08, split: .1, shadowTint: [0, .014, .05], highTint: [.03, .016, 0], gain: [.98, .97, .97], vignette: .44, voidTop: [.06, .068, .088], voidBottom: [.03, .035, .05] }) }),
  four_knocks: profile(.94, .80, .94, .96, .98, .035, 'rupture', null, 0, .08, 0, 1, {
    fire: .55, freeze: .55, actor: [.9, .92, .98],
    look: look({ sat: .7, contrast: 1.12, split: .12, shadowTint: [0, .01, .05], highTint: [.012, .01, 0], gain: [.94, .95, .99], vignette: .64, grain: .04, voidTop: [.032, .038, .05], voidBottom: [.014, .018, .026] }) }),
  body_discovery: profile(.70, .53, .76, .78, .94, .07, 'still', null, 0, .15, 0, 1, {
    fire: .8, freeze: .3, actor: [.86, .9, .98],
    look: look({ sat: .6, contrast: 1.1, split: .1, shadowTint: [0, .012, .055], highTint: [0, .006, .012], gain: [.92, .95, 1], vignette: .58, grain: .036, voidTop: [.036, .046, .062], voidBottom: [.016, .02, .03] }) }),
  investigation: profile(.83, .70, .85, .86, .97, 0, 'quiet', 'mus_investigation_loop', .28, .22, .7, 1, {
    actor: [.95, .95, .97],
    look: look({ sat: .9, contrast: 1.04, split: .07, shadowTint: [0, .012, .035], highTint: [.022, .013, 0], gain: [.99, .99, 1], vignette: .32, voidTop: [.07, .085, .11], voidBottom: [.04, .05, .065] }) }),
  deduction: profile(.74, .65, .83, .85, .95, .035, 'recognition', null, 0, .055, .15, .8, {
    freeze: .5, actor: [.85, .87, .92],
    look: look({ sat: .68, contrast: 1.06, gain: [.8, .82, .87], vignette: .62, voidTop: [.04, .048, .062], voidBottom: [.02, .024, .034] }) }),
  accusation: profile(.76, .61, .90, .79, .96, .04, 'still', 'mus_accusation', .316, .15, .2, .9, {
    fire: 1.15, actor: [.96, .93, .9],
    look: look({ sat: .86, contrast: 1.15, split: .17, shadowTint: [0, .014, .06], highTint: [.055, .024, 0], vignette: .54, grain: .034, voidTop: [.045, .05, .064], voidBottom: [.02, .024, .032] }) }),
  dawn: profile(1.06, .73, .68, .85, 1.03, 0, 'dawn', 'mus_dawn', .224, .13, .35, .6, {
    fire: .6, actor: [.95, .96, 1],
    look: look({ sat: .8, contrast: .94, split: .12, lift: [.035, .035, .05], shadowTint: [.008, .016, .045], highTint: [.045, .022, .032], gain: [1.02, 1, 1.02], vignette: .22, vignetteColor: [.5, .52, .6], voidTop: [.36, .39, .45], voidBottom: [.2, .22, .27] }) }),
  final_knocks: profile(1.04, .70, .66, .84, 1.02, .025, 'dawn', null, 0, .018, 0, .55, {
    fire: .5, freeze: .6, actor: [.9, .92, .98],
    look: look({ sat: .6, contrast: 1, lift: [.02, .02, .03], shadowTint: [0, .012, .05], split: .1, vignette: .52, grain: .04, vignetteColor: [.14, .16, .2], voidTop: [.2, .22, .26], voidBottom: [.1, .11, .14] }) }),
  residual: profile(.75, .57, .81, .83, .95, .015, 'echo', null, 0, .055, .1, .75, {
    freeze: 1, actor: [.86, .9, .98],
    look: look({ sat: .55, contrast: 1.02, split: .12, shadowTint: [0, .02, .065], highTint: [.012, .02, .03], gain: [.9, .94, 1], vignette: .6, grain: .045, voidTop: [.04, .05, .066], voidBottom: [.018, .024, .034] }) }),
  confession_silence: profile(.76, .61, .90, .79, .96, .04, 'still', null, 0, .035, 0, .85, {
    fire: .85, freeze: .7, actor: [.88, .88, .92],
    look: look({ sat: .6, contrast: 1.12, split: .14, shadowTint: [0, .01, .055], highTint: [.045, .02, 0], gain: [.86, .87, .9], vignette: .72, grain: .045, voidTop: [.028, .032, .042], voidBottom: [.012, .015, .022] }) }),
  watch: profile(.79, .64, .82, .83, .97, .05, 'quiet', null, 0, .13, .35, 1, {
    freeze: .2, actor: [.92, .93, .97],
    look: look({ sat: .84, contrast: 1.05, vignette: .46, voidTop: [.05, .06, .08], voidBottom: [.025, .03, .045] }) })
};

export const atmosphereAliases = { lounge: 'arrival', rupture: 'four_knocks', discovery: 'body_discovery', aha: 'deduction', corridor: 'investigation' };

// Each room keeps its own light identity underneath the story state (master 2.10: warm lounge,
// cooler corridor, colder formal Victor room, storm-blue veranda).
export const roomKeys = {
  lounge: { actor: [1, .985, .95], look: {} },
  veranda: { actor: [.86, .92, 1.03], look: { shadowTint: [0, .02, .06], split: .1 } },
  corridor: { actor: [.94, .95, .99], look: { shadowTint: [0, .016, .05] } },
  victor: { actor: [.9, .93, 1], look: { shadowTint: [.008, .012, .055], highTint: [.01, .006, .006] } }
};

export function restingAtmosphere(state) {
  if (state.completed || state.phase === 'ending-knocks') return 'final_knocks';
  if (state.story === 'dawn' || state.story === 'dawnScene') return 'dawn';
  if (state.story === 'title') return 'arrival';
  if (state.story === 'accusation') return 'accusation';
  if (['followAda', 'checkingDoor', 'atDoor', 'discovery'].includes(state.story)) return 'body_discovery';
  if (state.story === 'pressure') return 'victor_arrives';
  // Before the first deduction the house is in shock: no thinking music yet, a quieter grade.
  if (state.story === 'investigate' && !state.noted) return 'watch';
  if (state.story === 'eveningBreath') return 'pre_knock';
  if (['orientation', 'arrival', 'arrivalWelcome', 'arrivalApproach', 'dinnerWait'].includes(state.story)) return state.victorArrived ? 'social_unease' : 'arrival';
  return 'investigation';
}
