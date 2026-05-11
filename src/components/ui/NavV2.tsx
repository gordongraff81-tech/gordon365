"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ── Logo ─────────────────────────────────────────────────────────────────────
const LogoMark = () => (
  <div className="w-7 h-7 rounded-[8px] bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center flex-shrink-0 shadow-glow-sm">
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2L3 6V10C3 13.87 6.08 17.47 10 18.5C13.92 17.47 17 13.87 17 10V6L10 2Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M7.5 10.5L9.5 12.5L13 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

export default function NavV2() {
  const t          = useTranslations("nav");
  const locale     = useLocale();
  const router     = useRouter();
  const pathname   = usePathname();
  const [scrollY, setScrollY]         = useState(0);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll-Tracking
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-Section-Tracking per IntersectionObserver
  useEffect(() => {
    const sections = ["services", "security-checker", "results", "about", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const switchLang = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const scrolled = scrollY > 30;

  // Nav-Hintergrund: je nach Scroll-Tiefe wechselt die Intensität
  const navBg = scrolled
    ? "rgba(6,8,22,0.82)"
    : "rgba(6,8,22,0)";

  const navLinks = [
    { href: "#services",          label: t("services"),  id: "services"          },
    { href: "#security-checker",  label: t("checker"),   id: "security-checker"  },
    { href: "#results",           label: t("results"),   id: "results"           },
    { href: "#about",             label: t("about"),     id: "about"             },
    { href: "#contact",           label: t("contact"),   id: "contact"           },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-5 lg:px-8 transition-all duration-300"
        style={{
          background: navBg,
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        }}
      >
        {/* ── Logo ── */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 font-display font-extrabold text-[1.0625rem] tracking-[-0.025em] text-white"
        >
          <LogoMark />
          <span>
            Gordon<span className="text-accent-2">365</span>
          </span>
        </Link>

        {/* ── Desktop Nav-Links ── */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3.5 py-1.5 text-[0.8125rem] font-medium rounded-[6px] transition-all duration-200",
                  isActive
                    ? "text-white bg-white/[0.07]"
                    : "text-text-2 hover:text-white hover:bg-white/[0.04]"
                )}
              >
                {link.label}
                {/* Active-Indikator-Dot */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-2"
                    style={{ boxShadow: "0 0 6px rgba(24,213,255,0.8)" }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* ── Rechts: Lang + CTA ── */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Sprach-Umschalter */}
          <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-full overflow-hidden">
            {(["en", "de"] as const).map((l) => (
              <button
                key={l}
                onClick={() => switchLang(l)}
                className={cn(
                  "px-3 py-1 text-[0.6875rem] font-bold tracking-[0.06em] uppercase transition-all duration-200",
                  locale === l
                    ? "bg-accent text-white"
                    : "text-text-3 hover:text-text-1"
                )}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* CTA — ultra-kompakt */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-[6px] text-[0.8125rem] font-bold tracking-[-0.01em] transition-all duration-200 hover:shadow-glow-sm hover:-translate-y-px"
          >
            {t("cta")}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* ── Mobile-Toggle ── */}
        <button
          className="lg:hidden w-9 h-9 flex items-center justify-center text-text-1 rounded-[8px] hover:bg-white/[0.06] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menü umschalten"
        >
          <motion.div animate={{ rotate: mobileOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </motion.div>
        </button>
      </motion.nav>

      {/* ── Mobile-Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed top-14 left-0 right-0 z-40 px-5 py-5 flex flex-col gap-1"
            style={{
              background: "rgba(6,8,22,0.96)",
              backdropFilter: "blur(24px) saturate(180%)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="px-4 py-3 rounded-[8px] text-[0.9375rem] font-semibold text-text-2 hover:text-white hover:bg-white/[0.05] transition-all"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}

            <div className="mt-3 pt-4 border-t border-border flex items-center gap-2">
              {(["en", "de"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => { switchLang(l); setMobileOpen(false); }}
                  className={cn(
                    "px-4 py-2 rounded-[8px] text-sm font-bold border transition-all",
                    locale === l
                      ? "bg-accent text-white border-accent"
                      : "bg-card border-border text-text-2"
                  )}
                >
                  {l === "en" ? "English" : "Deutsch"}
                </button>
              ))}
              <a
                href="#contact"
                className="ml-auto btn-primary text-[0.875rem] py-2.5 px-5"
                onClick={() => setMobileOpen(false)}
              >
                {t("cta")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
