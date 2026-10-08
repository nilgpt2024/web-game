// Every authored wait goes through this clock, so a localhost-only dev flag can
// accelerate iteration without touching story logic. Production always runs at 1x.
const params = new URLSearchParams(location.search);
const localHost = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);

export const devMode = localHost && params.has('dev');
export let timeScale = devMode ? Math.min(8, Math.max(1, Number(params.get('speed')) || 1)) : 1;
// Dev only: the harness can change pace between scenes (live binding; production stays at 1x).
export function setTimeScale(value) { if (devMode) timeScale = Math.min(8, Math.max(1, value)); }

export const wait = ms => new Promise(resolve => setTimeout(resolve, ms / timeScale));

export const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
export const smooth = t => { t = clamp(t); return t * t * (3 - 2 * t); };
export const lerp = (a, b, t) => a + (b - a) * t;

// Converts an authored clock label ("8:37 PM", "9:14", "NEAR DAWN") into minutes on a
// twelve-hour dial (0–719). Used for the mantel clock and timeline placement.
export function clockMinutes(label) {
  const match = String(label || '').match(/(\d{1,2}):(\d{2})/);
  if (!match) return /dawn/i.test(label || '') ? 5 * 60 + 40 : null;
  return (Number(match[1]) % 12) * 60 + Number(match[2]);
}
