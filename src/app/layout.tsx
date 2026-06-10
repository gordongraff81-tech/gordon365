import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import "./cookie-consent.css";

export const viewport: Viewport = {
  themeColor: "#0a0f1e",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gordon365.com"),

  title: {
    default: "gordon365 | Microsoft 365 & Cloud Consulting",
    template: "%s | gordon365",
  },

  description:
    "Microsoft 365, Intune, Autopilot, Conditional Access und Zero Trust – Cloud Consulting von Gordon.",

  // Canonical is set per-locale in [locale]/layout.tsx.
  // Setting it here on the root layout would conflict with
  // the /en canonical and signal two canonicals for the same content.

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body>
        {children}

        {/* ─── Cookie Consent Banner ─── */}
        <div
          id="cc-banner"
          role="dialog"
          aria-modal={true}
          aria-labelledby="cc-title"
          aria-describedby="cc-description"
          hidden
        >
          {/* Erste Ebene: Hauptbanner */}
          <div className="cc-main" id="cc-main-layer">
            <div className="cc-content">
              <div className="cc-text-group">
                <p className="cc-title" id="cc-title"></p>
                <p className="cc-description" id="cc-description"></p>
                <a id="cc-privacy-link" className="cc-privacy-link" href="#" target="_blank" rel="noopener noreferrer"></a>
              </div>
              <div className="cc-actions">
                <button id="cc-btn-reject"   className="cc-btn cc-btn--secondary" type="button"></button>
                <button id="cc-btn-settings" className="cc-btn cc-btn--ghost"     type="button"></button>
                <button id="cc-btn-accept"   className="cc-btn cc-btn--primary"   type="button"></button>
              </div>
            </div>
          </div>

          {/* Zweite Ebene: Detaileinstellungen */}
          <div className="cc-settings" id="cc-settings-layer" hidden>
            <div className="cc-settings-inner">
              <div className="cc-settings-header">
                <p className="cc-settings-title" id="cc-settings-title"></p>
                <button id="cc-btn-close-settings" className="cc-btn-icon" type="button" aria-label="Schließen">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              {/* Notwendig */}
              <div className="cc-category">
                <div className="cc-category-header">
                  <div className="cc-category-info">
                    <p className="cc-category-name" id="cc-cat-necessary-name"></p>
                    <p className="cc-category-desc" id="cc-cat-necessary-desc"></p>
                  </div>
                  <div className="cc-toggle-wrapper">
                    <span className="cc-badge-required" id="cc-badge-required"></span>
                  </div>
                </div>
              </div>
              {/* Analytics */}
              <div className="cc-category">
                <div className="cc-category-header">
                  <div className="cc-category-info">
                    <p className="cc-category-name" id="cc-cat-analytics-name"></p>
                    <p className="cc-category-desc" id="cc-cat-analytics-desc"></p>
                  </div>
                  <div className="cc-toggle-wrapper">
                    <input type="checkbox" id="cc-toggle-analytics" className="cc-toggle-input" role="switch" aria-checked={false} />
                    <label htmlFor="cc-toggle-analytics" className="cc-toggle-label">
                      <span className="cc-toggle-track"><span className="cc-toggle-thumb"></span></span>
                      <span className="cc-sr-only" id="cc-toggle-analytics-label"></span>
                    </label>
                  </div>
                </div>
              </div>
              {/* Marketing */}
              <div className="cc-category">
                <div className="cc-category-header">
                  <div className="cc-category-info">
                    <p className="cc-category-name" id="cc-cat-marketing-name"></p>
                    <p className="cc-category-desc" id="cc-cat-marketing-desc"></p>
                  </div>
                  <div className="cc-toggle-wrapper">
                    <input type="checkbox" id="cc-toggle-marketing" className="cc-toggle-input" role="switch" aria-checked={false} />
                    <label htmlFor="cc-toggle-marketing" className="cc-toggle-label">
                      <span className="cc-toggle-track"><span className="cc-toggle-thumb"></span></span>
                      <span className="cc-sr-only" id="cc-toggle-marketing-label"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="cc-settings-actions">
                <button id="cc-btn-save-settings" className="cc-btn cc-btn--primary cc-btn--full" type="button"></button>
              </div>
              <div id="cc-ccpa-section" className="cc-ccpa-section" hidden>
                <button id="cc-btn-do-not-sell" className="cc-ccpa-link" type="button"></button>
              </div>
            </div>
          </div>
        </div>
        {/* Ende Cookie Consent Banner */}

        {/* Cookie Consent Script */}
        <Script src="/cookie-consent.js" strategy="afterInteractive" />

        {/* ─── Google Analytics – blockiert bis Cookie-Consent erteilt ─── */}
        {/* Das type="text/plain" verhindert die Ausführung durch den Browser. */}
        {/* Der Cookie-Consent-Manager aktiviert diese Scripts nach Zustimmung. */}
        <Script
          id="ga-loader"
          type="text/plain"
          data-consent="analytics"
          data-src="https://www.googletagmanager.com/gtag/js?id=G-6F24DD5C88"
          strategy="afterInteractive"
        />
        <Script
          id="ga-init"
          type="text/plain"
          data-consent="analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6F24DD5C88', { anonymize_ip: true });
            `,
          }}
        />
      </body>
    </html>
  );
}