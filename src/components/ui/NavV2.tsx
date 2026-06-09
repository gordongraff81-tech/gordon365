"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface NavProps {
  locale: string;
}

export default function NavV2({ locale }: NavProps) {
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const isAssessmentPage = pathname.includes("/assessment");
  const isSubPage = /\/(security-audit-microsoft-365|administrator-on-demand|entra-id|intune|copilot|managed-services|impressum|datenschutz|agb)/.test(pathname);
  const isHomePage = !isAssessmentPage && !isSubPage;

  const navSections = useMemo(() => [
    { id: "problem-reality", label: t("problem") },
    { id: "system-model", label: t("model") },
    { id: "modules", label: t("modules") },
    { id: "audit-cta", label: t("audit") },
    { id: "contact", label: t("contact") }
  ], [t]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHomePage) return;
    const observers = navSections.map((section) => {
      const el = document.getElementById(section.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(section.id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [navSections, isHomePage]);

  const switchLang = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const scrolled = scrollY > 30;

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 lg:px-12 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(255,255,255,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "none",
        }}
      >
        {/* ── Logo ── */}
        <Link
          href={`/${locale}`}
          className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
          style={{ lineHeight: 0 }}
          aria-label="gordon365 – Zurück zur Startseite"
        >
          {/* Desktop: full horizontal logo */}
          <Image
            src="/logo.png"
            alt="gordon365 Logo"
            width={175}
            height={50}
            priority
            quality={95}
            className="hidden sm:block"
            style={{ height: "clamp(34px, 3.5vw, 48px)", width: "auto", display: "block" }}
          />
          {/* Mobile: icon-only — cube mark, no text fragment */}
          <Image
            src="/logo-icon.png"
            alt="gordon365 Logo"
            width={36}
            height={36}
            priority
            quality={95}
            className="block sm:hidden"
            style={{ height: "36px", width: "36px", display: "block", flexShrink: 0 }}
          />
        </Link>

        {/* ── Desktop Nav ── */}
        <div className="hidden lg:flex items-center gap-6">
          {navSections.map((section) => (
            <a
              key={section.id}
              href={isHomePage ? `#${section.id}` : `/${locale}#${section.id}`}
              aria-current={activeSection === section.id ? "page" : undefined}
              className={cn(
                "text-[13px] font-medium transition-colors hover:text-blue-600",
                activeSection === section.id ? "text-blue-600" : "text-slate-600"
              )}
            >
              {section.label}
            </a>
          ))}

          <Link
            href={`/${locale}/assessment`}
            className={cn(
              "text-[13px] font-bold px-3.5 py-1.5 rounded-full transition-all duration-200",
              isAssessmentPage
                ? "bg-blue-600 text-white"
                : "bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white"
            )}
          >
            {t("assessment")}
          </Link>

          {isSubPage && (
            <Link
              href={`/${locale}`}
              className="text-[13px] font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              ← {locale === "de" ? "Übersicht" : "Overview"}
            </Link>
          )}

          <div className="flex bg-slate-100 rounded-full p-1 border border-slate-200 ml-2">
            {["de", "en"].map((l) => (
              <button
                key={l}
                onClick={() => switchLang(l)}
                aria-label={`Sprache zu ${l === "de" ? "Deutsch" : "Englisch"} wechseln`}
                className={cn(
                  "px-3 py-1 text-[10px] font-bold uppercase rounded-full transition-all",
                  locale === l ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* ── Hamburger ── */}
        <button
          className="lg:hidden p-2 text-slate-900"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menü öffnen/schließen"
          aria-expanded={mobileOpen}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d={mobileOpen ? "M18 6L6 18M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </motion.nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-2xl z-40 border-b border-slate-100 flex flex-col p-6 gap-4 lg:hidden shadow-2xl"
          >
            {/* Mobile Drawer Logo */}
            <div className="flex items-center pb-4 border-b border-slate-100">
              <Image
                src="/logo.png"
                alt="gordon365 Logo"
                width={140}
                height={40}
                quality={95}
                className="w-auto"
                style={{ height: "40px", width: "auto" }}
              />
            </div>

            {navSections.map((section) => (
              <a
                key={section.id}
                href={isHomePage ? `#${section.id}` : `/${locale}#${section.id}`}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-lg font-semibold border-b border-slate-50 pb-2 transition-colors",
                  activeSection === section.id ? "text-blue-600" : "text-slate-900"
                )}
              >
                {section.label}
              </a>
            ))}

            <Link
              href={`/${locale}/assessment`}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "text-lg font-bold pb-2 border-b border-slate-50 transition-colors",
                isAssessmentPage ? "text-blue-600" : "text-slate-900"
              )}
            >
              {t("assessment")}
            </Link>

            <div className="flex gap-6 mt-2">
              {["de", "en"].map((l) => (
                <button
                  key={l}
                  onClick={() => { switchLang(l); setMobileOpen(false); }}
                  aria-label={`Sprache zu ${l === "de" ? "Deutsch" : "Englisch"} wechseln`}
                  className={cn("text-sm font-bold uppercase", locale === l ? "text-blue-600" : "text-slate-400")}
                >
                  {l === "de" ? "Deutsch" : "English"}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}