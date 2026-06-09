"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

interface FooterProps {
  locale: string;
}

const LogoMark = () => (
  <div className="w-7 h-7 rounded-[7px] bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center flex-shrink-0">
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L3 6V10C3 13.87 6.08 17.47 10 18.5C13.92 17.47 17 13.87 17 10V6L10 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M7.5 10.5L9.5 12.5L13 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations("footer");

  const serviceLinks = t.raw("serviceLinks") as string[];
  const companyLinks = t.raw("companyLinks") as string[];
  const legalLabels = t.raw("legal") as string[];

  const serviceHrefs = [
    `/${locale}/security-audit-microsoft-365`,
    `/${locale}/copilot`,
    `/${locale}/managed-services`,
    `/${locale}#security-checker`,
  ];
  const companyHrefs = [
    `/${locale}#modules`,
    `/${locale}#modules`,
    `#`,
    `mailto:info@gordon365.com`,
  ];
  const legalPaths = ["impressum", "datenschutz", "agb"];

  return (
    <footer className="bg-bg-0 border-t border-border pt-20 pb-10 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <LogoMark />
              <span className="text-[1.125rem] font-black text-text-1 tracking-tight">Gordon365</span>
            </div>
            <p className="text-[0.875rem] text-text-2 leading-relaxed max-w-[240px]">
              {t("description")}
            </p>
            <div className="flex gap-3">
              <a href="mailto:info@gordon365.com" className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-text-3 hover:text-accent hover:border-accent transition-colors">@</a>
            </div>
          </div>
          <div>
            <div className="text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-text-3 mb-6">{t("servicesTitle")}</div>
            <ul className="space-y-4">
              {serviceLinks.map((link, i) => (
                <li key={i}><Link href={serviceHrefs[i]} className="text-[0.875rem] text-text-2 hover:text-text-1 transition-colors">{link}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-text-3 mb-6">{t("companyTitle")}</div>
            <ul className="space-y-4">
              {companyLinks.map((link, i) => (
                <li key={i}>
                  {companyHrefs[i].startsWith("mailto:") ? (
                    <a href={companyHrefs[i]} className="text-[0.875rem] text-text-2 hover:text-text-1 transition-colors">{link}</a>
                  ) : companyHrefs[i] === "#" ? (
                    <span className="text-[0.875rem] text-text-2 opacity-40 cursor-default">{link}</span>
                  ) : (
                    <Link href={companyHrefs[i]} className="text-[0.875rem] text-text-2 hover:text-text-1 transition-colors">{link}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-text-3 mb-6">{t("newsletter")}</div>
            <p className="text-[0.8125rem] text-text-2 leading-relaxed mb-4">{t("newsletterDesc")}</p>
            <div className="flex gap-2">
              <input type="email" placeholder={t("newsletterPlaceholder")} className="flex-1 bg-card border border-border rounded-[6px] px-3 py-2 text-[0.875rem] text-text-1 outline-none" />
              <button className="bg-accent text-white text-[0.8125rem] font-bold px-3 py-2 rounded-[6px]">{t("subscribe")}</button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center gap-4 border-t border-border pt-8">
          <span className="text-[0.8125rem] text-text-3">{t("copyright")}</span>
          <div className="flex gap-5">
            {legalLabels.map((label, i) => (
              <Link key={i} href={`/${locale}/${legalPaths[i] || ""}`} className="text-[0.8125rem] text-text-3 hover:text-text-2 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}