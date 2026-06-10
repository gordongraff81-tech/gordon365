/**
 * ============================================================
 * GORDON365 – COOKIE CONSENT MANAGER
 * cookie-consent.js
 *
 * Version: 2.0.0
 * Kompatibel mit: gordon365.com & app.gordon365.com
 *
 * Architektur:
 * - Vollständig in sich geschlossen (keine Abhängigkeiten)
 * - Multi-Repository-fähig: Domain wird dynamisch ausgelesen
 * - Subdomain-übergreifend: .gordon365.com als Cookie-Domain
 * - DSGVO / TDDDG / CCPA konform
 * - Kopierfertig für jedes weitere Repository unter gordon365.com
 * ============================================================
 */

;(function () {
  "use strict";

  var CONFIG = {
    cookieName: "g365_consent",
    cookieExpiryDays: 365,
    consentVersion: "1.0",
    privacyUrl: {
      de: "/de/datenschutz",
      en: "/en/privacy"
    },
    enableCCPA: false,
    language: "auto"
  };

  var TRANSLATIONS = {
    de: {
      bannerTitle:       "Wir respektieren deine Privatsphäre",
      bannerDesc:        "Wir verwenden Cookies, um unsere Website zu verbessern, den Datenverkehr zu analysieren und dir relevante Inhalte anzuzeigen. Du entscheidest, welche Kategorien du erlaubst.",
      privacyLinkText:   "Datenschutzerklärung →",
      btnAccept:         "Alle akzeptieren",
      btnReject:         "Alle ablehnen",
      btnSettings:       "Einstellungen",
      settingsTitle:     "Cookie-Einstellungen",
      btnSaveSettings:   "Auswahl speichern",
      badgeRequired:     "Immer aktiv",
      catNecessaryName:  "Notwendige Cookies",
      catNecessaryDesc:  "Diese Cookies sind für den Betrieb der Website erforderlich und können nicht deaktiviert werden. Sie speichern keine personenbezogenen Daten.",
      catAnalyticsName:  "Analyse-Cookies",
      catAnalyticsDesc:  "Helfen uns zu verstehen, wie Besucher mit der Website interagieren. Alle Daten werden anonymisiert erhoben. Wir verwenden Google Analytics.",
      catMarketingName:  "Marketing-Cookies",
      catMarketingDesc:  "Ermöglichen es uns, dir relevante Werbung anzuzeigen und die Wirksamkeit von Kampagnen zu messen (z. B. LinkedIn Insight Tag).",
      toggleAnalyticsLabel: "Analyse-Cookies aktivieren",
      toggleMarketingLabel: "Marketing-Cookies aktivieren",
      ccpaLinkText:      "Meine Daten nicht verkaufen oder weitergeben"
    },
    en: {
      bannerTitle:       "We respect your privacy",
      bannerDesc:        "We use cookies to improve our website, analyse traffic and show you relevant content. You decide which categories to allow.",
      privacyLinkText:   "Privacy Policy →",
      btnAccept:         "Accept all",
      btnReject:         "Reject all",
      btnSettings:       "Manage preferences",
      settingsTitle:     "Cookie Preferences",
      btnSaveSettings:   "Save preferences",
      badgeRequired:     "Always active",
      catNecessaryName:  "Necessary cookies",
      catNecessaryDesc:  "These cookies are required for the website to function and cannot be disabled. They do not store any personally identifiable information.",
      catAnalyticsName:  "Analytics cookies",
      catAnalyticsDesc:  "Help us understand how visitors interact with the website. All data is collected anonymously. We use Google Analytics.",
      catMarketingName:  "Marketing cookies",
      catMarketingDesc:  "Allow us to show you relevant ads and measure the effectiveness of campaigns (e.g. LinkedIn Insight Tag).",
      toggleAnalyticsLabel: "Enable analytics cookies",
      toggleMarketingLabel: "Enable marketing cookies",
      ccpaLinkText:      "Do Not Sell or Share My Personal Information"
    }
  };

  var banner        = null;
  var mainLayer     = null;
  var settingsLayer = null;
  var currentLang   = "de";
  var t             = {};

  function getRootDomain() {
    var hostname = window.location.hostname;
    if (hostname === "localhost" || /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
      return hostname;
    }
    var parts = hostname.split(".");
    if (parts.length >= 2) {
      return "." + parts.slice(-2).join(".");
    }
    return "." + hostname;
  }

  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    var domain    = getRootDomain();
    var domainStr = domain !== "localhost" ? "; domain=" + domain : "";
    document.cookie = name + "=" + encodeURIComponent(value) + expires + domainStr + "; path=/; SameSite=Lax; Secure";
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var c = cookies[i].trim();
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length));
      }
    }
    return null;
  }

  function saveToLocalStorage(consentData) {
    try {
      localStorage.setItem(CONFIG.cookieName, JSON.stringify(consentData));
    } catch (e) {}
  }

  function getFromLocalStorage() {
    try {
      var data = localStorage.getItem(CONFIG.cookieName);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function detectLanguage() {
    if (CONFIG.language !== "auto") {
      return TRANSLATIONS[CONFIG.language] ? CONFIG.language : "de";
    }
    var path = window.location.pathname;
    if (path.startsWith("/en")) return "en";
    if (path.startsWith("/de")) return "de";
    var htmlLang = document.documentElement.lang;
    if (htmlLang) {
      var short = htmlLang.substring(0, 2).toLowerCase();
      if (TRANSLATIONS[short]) return short;
    }
    var browserLang = (navigator.language || navigator.userLanguage || "de").substring(0, 2).toLowerCase();
    return TRANSLATIONS[browserLang] ? browserLang : "de";
  }

  function getStoredConsent() {
    var cookieRaw = getCookie(CONFIG.cookieName);
    if (cookieRaw) {
      try {
        var data = JSON.parse(cookieRaw);
        if (data.version === CONFIG.consentVersion) {
          return data;
        }
      } catch (e) {}
    }
    var lsData = getFromLocalStorage();
    if (lsData && lsData.version === CONFIG.consentVersion) {
      return lsData;
    }
    return null;
  }

  function saveConsent(analytics, marketing) {
    var consentData = {
      version:   CONFIG.consentVersion,
      timestamp: new Date().toISOString(),
      necessary: true,
      analytics: analytics,
      marketing: marketing
    };
    setCookie(CONFIG.cookieName, JSON.stringify(consentData), CONFIG.cookieExpiryDays);
    saveToLocalStorage(consentData);
    return consentData;
  }

  function enableScripts(category) {
    var scripts = document.querySelectorAll('script[type="text/plain"][data-consent="' + category + '"]');
    scripts.forEach(function (originalScript) {
      var newScript = document.createElement("script");
      Array.from(originalScript.attributes).forEach(function (attr) {
        if (attr.name !== "type" && attr.name !== "data-consent") {
          if (attr.name === "data-src") {
            newScript.setAttribute("src", attr.value);
          } else {
            newScript.setAttribute(attr.name, attr.value);
          }
        }
      });
      newScript.type = "text/javascript";
      if (originalScript.innerHTML) {
        newScript.innerHTML = originalScript.innerHTML;
      }
      originalScript.parentNode.replaceChild(newScript, originalScript);
    });
  }

  function applyConsent(consentData) {
    if (consentData.analytics) enableScripts("analytics");
    if (consentData.marketing) enableScripts("marketing");
    window.dispatchEvent(new CustomEvent("g365ConsentApplied", { detail: consentData }));
  }

  function handleDoNotSell() {
    console.log("[G365 Consent] CCPA: Do Not Sell/Share ausgeloest");
    // TODO: US-Markt Implementierung hier einfügen
  }

  function populateTexts() {
    var lang = currentLang;
    var privacyPath = CONFIG.privacyUrl[lang] || CONFIG.privacyUrl["de"];
    setElementText("cc-title",               t.bannerTitle);
    setElementText("cc-description",         t.bannerDesc);
    setElementText("cc-btn-accept",          t.btnAccept);
    setElementText("cc-btn-reject",          t.btnReject);
    setElementText("cc-btn-settings",        t.btnSettings);
    setElementText("cc-settings-title",      t.settingsTitle);
    setElementText("cc-btn-save-settings",   t.btnSaveSettings);
    setElementText("cc-badge-required",      t.badgeRequired);
    setElementText("cc-cat-necessary-name",  t.catNecessaryName);
    setElementText("cc-cat-necessary-desc",  t.catNecessaryDesc);
    setElementText("cc-cat-analytics-name",  t.catAnalyticsName);
    setElementText("cc-cat-analytics-desc",  t.catAnalyticsDesc);
    setElementText("cc-cat-marketing-name",  t.catMarketingName);
    setElementText("cc-cat-marketing-desc",  t.catMarketingDesc);
    setElementText("cc-toggle-analytics-label", t.toggleAnalyticsLabel);
    setElementText("cc-toggle-marketing-label", t.toggleMarketingLabel);
    setElementText("cc-btn-do-not-sell",     t.ccpaLinkText);
    var privacyLink = document.getElementById("cc-privacy-link");
    if (privacyLink) {
      privacyLink.textContent = t.privacyLinkText;
      privacyLink.href = privacyPath;
    }
    var ccpaSection = document.getElementById("cc-ccpa-section");
    if (ccpaSection) ccpaSection.hidden = !CONFIG.enableCCPA;
  }

  function setElementText(id, text) {
    var el = document.getElementById(id);
    if (el && text !== undefined) el.textContent = text;
  }

  function showBanner() {
    if (banner) {
      banner.hidden = false;
      showMainLayer();
      setTimeout(function () {
        var firstBtn = document.getElementById("cc-btn-reject");
        if (firstBtn) firstBtn.focus();
      }, 350);
    }
  }

  function hideBanner() {
    if (banner) {
      setTimeout(function () { banner.hidden = true; }, 150);
    }
  }

  function showMainLayer() {
    if (mainLayer)     mainLayer.hidden     = false;
    if (settingsLayer) settingsLayer.hidden = true;
  }

  function showSettingsLayer() {
    if (mainLayer)     mainLayer.hidden     = true;
    if (settingsLayer) settingsLayer.hidden = false;
    setTimeout(function () {
      var closeBtn = document.getElementById("cc-btn-close-settings");
      if (closeBtn) closeBtn.focus();
    }, 100);
  }

  function handleAcceptAll() {
    var consentData = saveConsent(true, true);
    applyConsent(consentData);
    hideBanner();
    setCheckboxes(true, true);
  }

  function handleRejectAll() {
    var consentData = saveConsent(false, false);
    applyConsent(consentData);
    hideBanner();
    setCheckboxes(false, false);
  }

  function handleSaveSettings() {
    var analyticsToggle = document.getElementById("cc-toggle-analytics");
    var marketingToggle = document.getElementById("cc-toggle-marketing");
    var analytics = analyticsToggle ? analyticsToggle.checked : false;
    var marketing = marketingToggle ? marketingToggle.checked : false;
    var consentData = saveConsent(analytics, marketing);
    applyConsent(consentData);
    hideBanner();
  }

  function setCheckboxes(analytics, marketing) {
    var analyticsToggle = document.getElementById("cc-toggle-analytics");
    var marketingToggle = document.getElementById("cc-toggle-marketing");
    if (analyticsToggle) {
      analyticsToggle.checked = analytics;
      analyticsToggle.setAttribute("aria-checked", String(analytics));
    }
    if (marketingToggle) {
      marketingToggle.checked = marketing;
      marketingToggle.setAttribute("aria-checked", String(marketing));
    }
  }

  function prefillSettingsFromStorage() {
    var stored = getStoredConsent();
    if (stored) {
      setCheckboxes(stored.analytics === true, stored.marketing === true);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Escape" && settingsLayer && !settingsLayer.hidden) {
      showMainLayer();
      var settingsBtn = document.getElementById("cc-btn-settings");
      if (settingsBtn) settingsBtn.focus();
    }
  }

  function bindEvents() {
    var btnAccept    = document.getElementById("cc-btn-accept");
    var btnReject    = document.getElementById("cc-btn-reject");
    var btnSettings  = document.getElementById("cc-btn-settings");
    var btnClose     = document.getElementById("cc-btn-close-settings");
    var btnSave      = document.getElementById("cc-btn-save-settings");
    var btnDoNotSell = document.getElementById("cc-btn-do-not-sell");

    if (btnAccept)    btnAccept.addEventListener("click",    handleAcceptAll);
    if (btnReject)    btnReject.addEventListener("click",    handleRejectAll);
    if (btnSettings)  btnSettings.addEventListener("click", function () {
      prefillSettingsFromStorage();
      showSettingsLayer();
    });
    if (btnClose)     btnClose.addEventListener("click",     showMainLayer);
    if (btnSave)      btnSave.addEventListener("click",      handleSaveSettings);
    if (btnDoNotSell) btnDoNotSell.addEventListener("click", handleDoNotSell);

    document.addEventListener("keydown", handleKeyDown);

    ["cc-toggle-analytics", "cc-toggle-marketing"].forEach(function (id) {
      var toggle = document.getElementById(id);
      if (toggle) {
        toggle.addEventListener("change", function () {
          this.setAttribute("aria-checked", String(this.checked));
        });
      }
    });
  }

  function init() {
    banner        = document.getElementById("cc-banner");
    mainLayer     = document.getElementById("cc-main-layer");
    settingsLayer = document.getElementById("cc-settings-layer");

    if (!banner) {
      console.warn("[G365 Consent] Banner-Element #cc-banner nicht gefunden.");
      return;
    }

    currentLang = detectLanguage();
    t = TRANSLATIONS[currentLang] || TRANSLATIONS["de"];
    populateTexts();
    bindEvents();

    var storedConsent = getStoredConsent();
    if (storedConsent) {
      applyConsent(storedConsent);
    } else {
      showBanner();
    }
  }

  window.g365Consent = {
    getStatus:    function () { return getStoredConsent(); },
    openSettings: function () {
      if (banner) {
        banner.hidden = false;
        prefillSettingsFromStorage();
        showSettingsLayer();
        setTimeout(function () {
          var closeBtn = document.getElementById("cc-btn-close-settings");
          if (closeBtn) closeBtn.focus();
        }, 100);
      }
    },
    reset: function () {
      setCookie(CONFIG.cookieName, "", -1);
      try { localStorage.removeItem(CONFIG.cookieName); } catch (e) {}
      location.reload();
    },
    hasConsent: function (category) {
      var status = getStoredConsent();
      return status ? (status[category] === true) : false;
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
