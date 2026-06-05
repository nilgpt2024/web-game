/**
 * Cookie Consent Manager - GDPR/CCPA Compliant
 * WebGameHub Project - Google AdSense Ready
 */

class CookieConsent {
    constructor(options = {}) {
        this.options = {
            consentKey: 'WebGameHub-cookie-consent',
            consentVersion: '1.0',
            expiryDays: 365,
            ...options
        };
        
        this.consent = null;
        this.banner = null;
        this.preferences = {
            necessary: true,  // Always required
            analytics: false,
            advertising: false,
            personalization: false
        };
    }

    init() {
        // Check if user has already given consent
        const storedConsent = localStorage.getItem(this.options.consentKey);
        
        if (storedConsent) {
            try {
                this.consent = JSON.parse(storedConsent);
                
                // Check if consent version matches
                if (this.consent.version !== this.options.consentVersion) {
                    this.showBanner();
                    return;
                }
                
                // Apply stored preferences
                if (this.consent.preferences) {
                    this.preferences = { ...this.preferences, ...this.consent.preferences };
                }
                
                this.applyConsent();
            } catch (e) {
                console.warn('Cookie consent parse error:', e);
                this.showBanner();
            }
        } else {
            // No consent found, show banner
            this.showBanner();
        }
    }

    createBanner() {
        // Create banner element
        this.banner = document.createElement('div');
        this.banner.className = 'cookie-banner';
        this.banner.setAttribute('role', 'dialog');
        this.banner.setAttribute('aria-label', 'Cookie Consent');
        this.banner.innerHTML = `
            <div class="cookie-content">
                <div class="cookie-icon">🍪</div>
                <div class="cookie-text">
                    <h3 data-i18n="cookie.title">我们使用 Cookie</h3>
                    <p data-i18n="cookie.description">
                        本网站使用 Cookie 来改善您的浏览体验、分析网站流量并展示个性化广告。
                        继续使用本网站即表示您同意我们的 Cookie 政策。
                    </p>
                    <a href="privacy-policy.html#cookies" class="cookie-link" target="_blank" rel="noopener noreferrer" data-i18n="cookie.learn_more">了解更多</a>
                </div>
            </div>
            <div class="cookie-actions">
                <button class="cookie-btn cookie-btn-secondary" id="cookieCustomize" data-i18n="cookie.customize">自定义</button>
                <button class="cookie-btn cookie-btn-primary" id="cookieAcceptAll" data-i18n="cookie.accept_all">全部接受</button>
                <button class="cookie-btn cookie-btn-text" id="cookieRejectAll" data-i18n="cookie.reject_all">拒绝非必需</button>
            </div>
            <div class="cookie-preferences" id="cookiePreferences" style="display: none;">
                <h4 data-i18n="cookie.preferences_title">Cookie 偏好设置</h4>
                <div class="preference-item">
                    <label class="preference-label">
                        <input type="checkbox" id="prefNecessary" checked disabled>
                        <span class="preference-name" data-i18n="cookie.necessary">必要 Cookie</span>
                        <span class="preference-desc" data-i18n="cookie.necessary_desc">网站正常运行所必需</span>
                    </label>
                </div>
                <div class="preference-item">
                    <label class="preference-label">
                        <input type="checkbox" id="prefAnalytics">
                        <span class="preference-name" data-i18n="cookie.analytics">分析 Cookie</span>
                        <span class="preference-desc" data-i18n="cookie.analytics_desc">帮助我们了解访客行为</span>
                    </label>
                </div>
                <div class="preference-item">
                    <label class="preference-label">
                        <input type="checkbox" id="prefAdvertising">
                        <span class="preference-name" data-i18n="cookie.advertising">广告 Cookie</span>
                        <span class="preference-desc" data-i18n="cookie.advertising_desc">用于展示个性化广告</span>
                    </label>
                </div>
                <div class="preference-actions">
                    <button class="cookie-btn cookie-btn-primary" id="cookieSavePrefs" data-i18n="cookie.save_preferences">保存设置</button>
                </div>
            </div>
        `;

        document.body.appendChild(this.banner);
        this.bindEvents();
        
        // Show with animation
        requestAnimationFrame(() => {
            this.banner.classList.add('visible');
        });
    }

    showBanner() {
        if (!this.banner) {
            this.createBanner();
        }
    }

    hideBanner() {
        if (this.banner) {
            this.banner.classList.remove('visible');
            setTimeout(() => {
                if (this.banner && this.banner.parentNode) {
                    this.banner.parentNode.removeChild(this.banner);
                }
                this.banner = null;
            }, 300);
        }
    }

    bindEvents() {
        // Accept All
        document.getElementById('cookieAcceptAll').addEventListener('click', () => {
            this.preferences = {
                necessary: true,
                analytics: true,
                advertising: true,
                personalization: true
            };
            this.saveConsent();
            this.applyConsent();
            this.hideBanner();
        });

        // Reject Non-Essential
        document.getElementById('cookieRejectAll').addEventListener('click', () => {
            this.preferences = {
                necessary: true,
                analytics: false,
                advertising: false,
                personalization: false
            };
            this.saveConsent();
            this.applyConsent();
            this.hideBanner();
        });

        // Customize / Toggle Preferences Panel
        document.getElementById('cookieCustomize').addEventListener('click', () => {
            const prefsPanel = document.getElementById('cookiePreferences');
            const isHidden = prefsPanel.style.display === 'none';
            prefsPanel.style.display = isHidden ? 'block' : 'none';
            
            // Update button text
            const btn = document.getElementById('cookieCustomize');
            btn.textContent = isHidden 
                ? (window.i18n?.t('cookie.hide_settings') || '收起')
                : (window.i18n?.t('cookie.customize') || '自定义');
        });

        // Save Preferences
        document.getElementById('cookieSavePrefs').addEventListener('click', () => {
            this.preferences.analytics = document.getElementById('prefAnalytics').checked;
            this.preferences.advertising = document.getElementById('prefAdvertising').checked;
            this.saveConsent();
            this.applyConsent();
            this.hideBanner();
        });
    }

    saveConsent() {
        this.consent = {
            version: this.options.consentVersion,
            timestamp: new Date().toISOString(),
            preferences: { ...this.preferences }
        };
        
        localStorage.setItem(this.options.consentKey, JSON.stringify(this.consent));
        
        // Dispatch custom event for other scripts to react
        document.dispatchEvent(new CustomEvent('cookie:consentChanged', {
            detail: { preferences: this.preferences }
        }));
    }

    applyConsent() {
        // Apply consent to various tracking/advertising scripts
        // This is where you would initialize:
        // - Google Analytics (if analytics accepted)
        // - Google AdSense (if advertising accepted)
        // - Personalization features
        
        if (this.preferences.analytics) {
            this.enableAnalytics();
        }
        
        if (this.preferences.advertising) {
            this.enableAdvertising();
        }
        
        // Add body class for styling purposes
        document.body.classList.toggle('cookies-accepted', true);
        document.body.classList.toggle('analytics-enabled', this.preferences.analytics);
        document.body.classList.toggle('advertising-enabled', this.preferences.advertising);
    }

    enableAnalytics() {
        // Initialize Google Analytics or other analytics
        // This would typically load gtag.js or similar
        console.log('[Cookie] Analytics enabled');
        
        // Example: Load Google Analytics
        // const script = document.createElement('script');
        // script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
        // script.async = true;
        // document.head.appendChild(script);
    }

    enableAdvertising() {
        // Initialize Google AdSense or other advertising
        console.log('[Cookie] Advertising enabled');
        
        // Example: Load AdSense script
        // const script = document.createElement('script');
        // script.async = true;
        // script.crossOrigin = 'anonymous';
        // script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXX';
        // document.head.appendChild(script);
    }

    // Public API: Allow users to change preferences later
    showPreferences() {
        this.showBanner();
        document.getElementById('cookiePreferences').style.display = 'block';
        document.getElementById('cookieCustomize').textContent = 
            window.i18n?.t('cookie.hide_settings') || '收起';
        
        // Set current preference states
        document.getElementById('prefAnalytics').checked = this.preferences.analytics;
        document.getElementById('prefAdvertising').checked = this.preferences.advertising;
    }

    // Check if specific consent type is granted
    hasConsent(type) {
        return this.preferences[type] || false;
    }

    // Reset consent (for testing or user request)
    resetConsent() {
        localStorage.removeItem(this.options.consentKey);
        this.consent = null;
        this.preferences = {
            necessary: true,
            analytics: false,
            advertising: false,
            personalization: false
        };
        this.showBanner();
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.cookieConsent = new CookieConsent();
    window.cookieConsent.init();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CookieConsent;
}
