(() => {
  // Document-local state only. There are no cookies, storage keys or generated identifiers.
  let visited = false;
  let trialActive = false;
  const bucket = (ms) => ms < 60000 ? 'under_60s' : ms < 120000 ? '60_to_119s'
    : ms < 180000 ? '120_to_179s' : ms < 300000 ? '180_to_299s'
    : ms < 600000 ? '300_to_599s' : '600s_plus';
  const post = (event, range = 'all') => {
    try {
      void fetch('/_metrics', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, bucket: range }), credentials: 'omit',
        mode: 'same-origin', referrerPolicy: 'no-referrer', keepalive: true,
      }).catch(() => {});
    } catch { /* Metrics must never interrupt play. No retry means no duplicate replay. */ }
  };
  const visit = () => {
    if (!visited && document.visibilityState === 'visible') { visited = true; post('visit'); }
  };
  document.addEventListener('visibilitychange', visit);
  visit();
  window.addEventListener('minimum-rage:analytics', ({ detail }) => {
    if (detail?.event === 'trial_start') {
      visit();
      trialActive = true;
      post('trial_start');
    } else if (detail?.event === 'trial_complete' && trialActive &&
      Number.isFinite(detail.durationMs) && detail.durationMs > 0) {
      trialActive = false;
      post('trial_complete', bucket(detail.durationMs));
    }
  });
})();
