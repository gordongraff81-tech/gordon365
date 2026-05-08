"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ScoreRing from "@/components/ui/ScoreRing";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
});

function HeroDashboard({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <motion.div
      {...fadeUp(0.25)}
      className="hidden xl:block bg-bg-1/80 border border-border-strong rounded-4xl overflow-hidden shadow-card backdrop-blur-xl"
    >
      {/* Titlebar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-white/[0.02]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[0.6875rem] font-semibold text-text-3 tracking-[0.05em]">
          {t("hero.dashboard.title")}
        </span>
        <div className="w-12" />
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Score ring */}
        <div className="flex justify-center mb-5">
          <ScoreRing score={64} size={110} animate label={t("hero.dashboard.score")} />
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { val: "3", label: t("hero.dashboard.critical"), cls: "text-red" },
            { val: "5", label: t("hero.dashboard.warnings"), cls: "text-amber" },
            { val: "12", label: t("hero.dashboard.passing"), cls: "text-green" },
          ].map((m) => (
            <div
              key={m.label}
              className="bg-white/[0.04] border border-border rounded-xl p-3 text-center"
            >
              <div className={`font-display text-xl font-bold leading-none ${m.cls}`}>{m.val}</div>
              <div className="text-[0.625rem] text-text-3 font-semibold uppercase tracking-[0.06em] mt-1">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Risk rows */}
        <div className="space-y-2">
          {[
            { name: t("hero.dashboard.legacyAuth"), badge: "Critical", cls: "badge-critical" },
            { name: t("hero.dashboard.mfaCoverage"), badge: "Warning", cls: "badge-warning" },
            { name: t("hero.dashboard.conditionalAccess"), badge: "Passing", cls: "badge-ok" },
          ].map((r) => (
            <div
              key={r.name}
              className="flex items-center justify-between px-3.5 py-2.5 bg-white/[0.03] border border-border rounded-lg"
            >
              <span className="text-[0.8125rem] text-text-2 font-medium">{r.name}</span>
              <span className={r.cls}>{r.badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-5 py-3.5 border-t border-border bg-white/[0.01] flex items-center justify-between">
        <span className="text-[0.75rem] text-text-2">{t("hero.dashboard.runCheck")} →</span>
        <button
          className="text-[0.75rem] font-bold text-accent-2 hover:text-white transition-colors flex items-center gap-1"
          onClick={() =>
            document.getElementById("security-checker")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {t("hero.dashboard.startNow")}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const t = useTranslations();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-6 lg:px-8 overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1100px] w-full mx-auto grid xl:grid-cols-[1fr_440px] gap-16 items-center">
        {/* Left — copy */}
        <div>
          {/* Eyebrow */}
          <motion.div {...fadeUp(0)} className="mb-7">
            <span className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 text-[0.75rem] font-bold tracking-[0.08em] uppercase text-accent-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent-2"
                style={{ animation: "pulseDot 2s ease-in-out infinite" }}
              />
              {t("hero.eyebrow")}
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            {...fadeUp(0.1)}
            className="font-display font-extrabold leading-[1.05] tracking-[-0.04em] text-white mb-6"
            style={{ fontSize: "clamp(2.75rem, 5vw, 4rem)" }}
          >
            {t("hero.h1a")}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #2563FF 0%, #18D5FF 60%, #7dd3fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("hero.h1b")}
            </span>
            <br />
            {t("hero.h1c")}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            {...fadeUp(0.2)}
            className="text-[1.0625rem] leading-[1.75] text-text-2 max-w-[480px] mb-9"
          >
            {t("hero.sub")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.3)}
            className="flex flex-wrap items-center gap-3 mb-10"
          >
            <button
              className="btn-primary"
              onClick={() =>
                document
                  .getElementById("security-checker")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {t("hero.cta1")}
            </button>
            <a href="#contact" className="btn-outline">
              {t("hero.cta2")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            {...fadeUp(0.4)}
            className="flex flex-wrap items-center gap-4 pt-7 border-t border-border"
          >
            <span className="text-[0.75rem] font-bold tracking-[0.08em] uppercase text-text-3 whitespace-nowrap">
              {t("hero.trustLabel")}
            </span>
            {["Microsoft Partner", "D/A/CH Region", "DSGVO Compliant", "SME & Mid-Market"].map(
              (chip) => (
                <span
                  key={chip}
                  className="text-[0.75rem] font-semibold text-text-2 bg-card border border-border rounded-full px-3 py-1"
                >
                  {chip}
                </span>
              )
            )}
          </motion.div>
        </div>

        {/* Right — dashboard visual */}
        <HeroDashboard t={t} />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-5 h-8 rounded-full border border-border-strong flex items-start justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-text-3"
          />
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.75); }
        }
      `}</style>
    </section>
  );
}
