/* Google Analytics 4 — AIGameHub (game.suipce.com)
 * Measurement ID: G-01QRSQTR81
 * Consent Mode v2: EEA/UK/CH 默认拒绝，其余地区默认同意；
 * 用户在本站 Cookie 横幅中修改偏好后会即时同步。
 */
(function () {
  var ID = 'G-01QRSQTR81';

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());

  var EEA = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE',
             'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT',
             'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'GB', 'CH'];

  var all = ['analytics_storage', 'ad_storage', 'ad_user_data', 'ad_personalization'];
  var granted = {};
  var denied = {};
  all.forEach(function (k) { granted[k] = 'granted'; denied[k] = 'denied'; });

  gtag('consent', 'default', Object.assign({}, denied, { region: EEA, wait_for_update: 500 }));
  gtag('consent', 'default', granted);

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
  document.head.appendChild(s);

  gtag('config', ID, { anonymize_ip: true, send_page_view: true });

  function syncConsent() {
    try {
      var raw = localStorage.getItem('AIGameHub-cookie-consent');
      if (!raw) return;
      var c = JSON.parse(raw);
      var p = (c && c.preferences) || {};
      gtag('consent', 'update', {
        analytics_storage: p.analytics ? 'granted' : 'denied',
        ad_storage: p.advertising ? 'granted' : 'denied',
        ad_user_data: p.advertising ? 'granted' : 'denied',
        ad_personalization: p.personalization ? 'granted' : 'denied'
      });
    } catch (e) { /* 存储不可用时保持默认 */ }
  }

  syncConsent();
  document.addEventListener('cookie:consentChanged', syncConsent);
})();
