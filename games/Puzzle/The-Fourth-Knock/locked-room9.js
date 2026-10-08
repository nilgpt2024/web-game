import { lockMethod } from './content/step9.js';

// A labelled cutaway of the spring night latch, never a physics simulation.
export function lockDiagram(step = 0) { const released = step > 0, closed = step > 1; return `<svg viewBox="0 0 420 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Spring night latch, inside cutaway. ${released ? 'Hold-back released.' : 'Hold-back holds tongue in.'} ${closed ? 'Door closed; tongue caught in strike.' : 'Door open.'}" fill="none" stroke="#303b3d" stroke-width="3"><text x="25" y="19" stroke="none" fill="#303b3d" font-size="13" font-family="Barlow Condensed, sans-serif" letter-spacing="2">INSIDE CUTAWAY · ${closed ? 'PULLED SHUT' : 'DOOR OPEN'}</text><path d="M35 30h240v107H35z" fill="#a6ad8e"/><rect x="${closed ? 295 : 333}" y="55" width="28" height="61" fill="#b99b51"/><rect x="170" y="59" width="106" height="51" rx="6" fill="#b99b51"/><path d="M184 84l8-10 8 20 8-20 8 20 8-20 8 10"/><path d="M${released ? 245 : 224} 73h40l12 11-12 12h-40z" fill="#dfca8d"/><circle cx="194" cy="${released ? 101 : 68}" r="7" fill="#6d5c3e"/><path d="M102 94h25" stroke="#303b3d" stroke-width="8"/><text x="28" y="148" stroke="none" fill="#303b3d" font-size="12" font-family="Barlow Condensed, sans-serif" letter-spacing="1.5">HOLD-BACK → SPRING TONGUE → STRIKE</text></svg>`; }

// The closed-room reconstruction, staged at Victor's real doorway: a blueprint copy of the door
// leaf performs each step while the forced door stays open. It is Aren's demonstration of what
// was possible, never a replay of what happened, and it names no one.
export function createLockReconstruction({ state, audio, echoes, event, panel }) {
  let step = 0, busy = false;
  const intro = 'A separate spring night latch, beside the ordinary key lock. Its hold-back is released. Test how the room could secure itself after someone left.';

  function render(onKeep, onReturn) {
    const done = step >= 3;
    panel.open({
      kind: 'staging', layout: 'reconstruct',
      art: `<div class="latch-art">${lockDiagram(step)}</div><ol class="latch-steps">${lockMethod.steps.map((s, i) => `<li class="${i < step ? 'done' : i === step ? 'next' : ''}">${s.label}</li>`).join('')}</ol>`,
      place: 'VICTOR’S DOOR · RECONSTRUCTION', title: done ? 'The room secured itself.' : 'The closed room.',
      text: step ? lockMethod.steps[step - 1].text : intro,
      spots: [], requireKey: false, kept: !!state.evidence.staging,
      keepLabel: done ? 'Keep the observation' : `Step ${step + 1} of 3 · ${lockMethod.steps[step].label}`,
      onKeep, onReturn
    });
  }

  function open(onKeep, onReturn) {
    step = state.lockDemonstrated ? 3 : 0;
    render(onKeep, onReturn);
    echoes.latch.show();
  }

  // One step per press; the third commits the demonstration (the Step 9 commit point).
  async function advance(onKeep, onReturn) {
    if (busy || step >= 3) return false;
    busy = true;
    const s = lockMethod.steps[step];
    audio.effect(s.sfx, { gain: .5 });
    if (step === 1) echoes.latch.close();
    if (step === 2) echoes.latch.tryHandle();
    step++;
    event('lock-demo-step', { step, method: lockMethod.id });
    if (step === 3) { state.lockDemonstrated = true; event('lock-demonstrated', { method: lockMethod.id }); }
    render(onKeep, onReturn);
    busy = false;
    return true;
  }

  function close() { echoes.latch.hide(); }
  return { open, advance, close, get step() { return step; }, get complete() { return step >= 3; } };
}
