"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const LogoMark = () => (
  <div className="w-7 h-7 rounded-[7px] bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center flex-shrink-0">
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L3 6V10C3 13.87 6.08 17.47 10 18.5C13.92 17.47 17 13.87 17 10V6L10 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M7.5 10.5L9.5 12.5L13 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  const serviceLinks = t.raw("serviceLinks") as string[];
  const companyLinks = t.raw("companyLinks") as string[];
  const legalLinks = t.raw("legal") as string[];

  const serviceHrefs = ["#services", "#services", "#services", "#security-checker"];
  const companyHrefs = ["#about", "#results", "#", "mailto:hello@gordon365.com"];

  return (
    <footer className="relative z-10 bg-bg-1 border-t border-border pt-14 pb-8 px-6">
      <div className="max-w-[1100px] mx-auto">
        {/* Top row */}
        <div className="grid lg:grid-cols-[260px_1fr] gap-14 pb-10 border-b border-border mb-7">
          {/* Brand */}
          <div>
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 font-display font-extrabold text-[1.125rem] tracking-[-0.02em] text-text-1 mb-3"
            >
              <LogoMark />
              Gordon<span className="text-accent-2">365</span>
            </Link>
            <p className="text-[0.875rem] text-text-2 leading-relaxed mb-5">{t("desc")}</p>

            {/* Social links */}
            <div className="flex gap-2">
              {[
                { label: "LinkedIn", symbol: "in" },
                { label: "Twitter/X", symbol: "𝕏" },
                { label: "Email", symbol: "@", href: "mailto:hello@gordon365.com" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href ?? "#"}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-[0.8125rem] text-text-2 hover:text-text-1 hover:border-border-strong hover:bg-card-hover transition-all"
                >
                  {s.symbol}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid sm:grid-cols-3 gap-8">
            {/* Services */}
            <div>
              <div className="text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-text-3 mb-4">
                {t("services")}
              </div>
              <ul className="space-y-2.5">
                {serviceLinks.map((link, i) => (
                  <li key={link}>
                    <a
                      href={serviceHrefs[i]}
                      className="text-[0.875rem] text-text-2 hover:text-text-1 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-text-3 mb-4">
                {t("company")}
              </div>
              <ul className="space-y-2.5">
                {companyLinks.map((link, i) => (
                  <li key={link}>
                    <a
                      href={companyHrefs[i]}
                      className="text-[0.875rem] text-text-2 hover:text-text-1 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <div className="text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-text-3 mb-4">
                {t("newsletter")}
              </div>
              <p className="text-[0.8125rem] text-text-2 leading-relaxed mb-3">
                {t("newsletterDesc")}
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={t("newsletterPlaceholder")}
                  className="flex-1 bg-card border border-border rounded-[6px] px-3 py-2 text-[0.875rem] text-text-1 placeholder:text-text-3 outline-none focus:border-accent/40 transition-colors"
                />
                <button className="bg-accent hover:bg-accent-hover text-white text-[0.8125rem] font-bold px-3 py-2 rounded-[6px] transition-colors whitespace-nowrap">
                  {t("subscribe")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <span className="text-[0.8125rem] text-text-3">{t("copyright")}</span>
          <div className="flex gap-5">
            {legalLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[0.8125rem] text-text-3 hover:text-text-2 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
