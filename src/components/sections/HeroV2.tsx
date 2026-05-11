"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";

// ── Cloud 3D-Asset (SVG-Platzhalter — ersetzbar durch ein echtes .glb via Three.js) ──
function CloudOrb() {
  return (
    <svg
      viewBox="0 0 480 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        {/* Zentraler Glow */}
        <radialGradient id="orb-core" cx="50%" cy="42%" r="38%">
          <stop offset="0%" stopColor="#18D5FF" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#2563FF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#060816" stopOpacity="0" />
        </radialGradient>
        {/* Äußerer Ring */}
        <radialGradient id="orb-outer" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#060816" stopOpacity="0" />
          <stop offset="85%" stopColor="#2563FF" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#18D5FF" stopOpacity="0.04" />
        </radialGradient>
        {/* Shield-Gradient */}
        <linearGradient id="shield-fill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563FF" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#18D5FF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="shield-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#18D5FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#2563FF" stopOpacity="0.3" />
        </linearGradient>
        {/* Orbit-Ring */}
        <linearGradient id="orbit-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#18D5FF" stopOpacity="0" />
          <stop offset="40%" stopColor="#18D5FF" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#2563FF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#2563FF" stopOpacity="0" />
        </linearGradient>
        <filter id="blur-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="blur-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Äußeres Ambient-Glow-Halo */}
      <ellipse cx="240" cy="240" rx="200" ry="200" fill="url(#orb-outer)" />

      {/* Orbit-Ringe (3D-perspektivisch) */}
      <g transform="translate(240,240)">
        {/* Ring 1 — äußerster */}
        <ellipse rx="180" ry="52" fill="none" stroke="url(#orbit-grad)" strokeWidth="1" opacity="0.4" transform="rotate(-15)" />
        {/* Ring 2 */}
        <ellipse rx="140" ry="40" fill="none" stroke="url(#orbit-grad)" strokeWidth="0.75" opacity="0.35" transform="rotate(25)" />
        {/* Ring 3 — innerster */}
        <ellipse rx="100" ry="28" fill="none" stroke="url(#orbit-grad)" strokeWidth="0.5" opacity="0.5" transform="rotate(-5)" />

        {/* Orbit-Punkte auf Ring 1 */}
        <circle cx="168" cy="-22" r="4" fill="#18D5FF" opacity="0.9" filter="url(#blur-glow)" />
        <circle cx="-158" cy="18" r="3" fill="#2563FF" opacity="0.7" filter="url(#blur-glow)" />
        {/* Orbit-Punkte auf Ring 2 */}
        <circle cx="110" cy="30" r="3.5" fill="#7dd3fc" opacity="0.8" filter="url(#blur-glow)" />
        <circle cx="-95" cy="-28" r="2.5" fill="#18D5FF" opacity="0.6" filter="url(#blur-glow)" />
      </g>

      {/* Zentrales Glow-Halo */}
      <circle cx="240" cy="220" r="90" fill="url(#orb-core)" filter="url(#blur-soft)" />

      {/* Shield-Icon — Kern */}
      <g transform="translate(240,220)" filter="url(#blur-glow)">
        {/* Shield-Füllung */}
        <path
          d="M0 -72 L60 -44 L60 -4 C60 32 0 60 0 60 C0 60 -60 32 -60 -4 L-60 -44 Z"
          fill="url(#shield-fill)"
          stroke="url(#shield-stroke)"
          strokeWidth="1.5"
        />
        {/* Checkmark */}
        <path
          d="M-22 4 L-8 20 L24 -16"
          stroke="#18D5FF"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.95"
        />
        {/* Innere Glow-Linie */}
        <path
          d="M0 -72 L60 -44 L60 -4 C60 32 0 60 0 60 C0 60 -60 32 -60 -4 L-60 -44 Z"
          fill="none"
          stroke="rgba(24,213,255,0.15)"
          strokeWidth="8"
        />
      </g>

      {/* Schwebende Status-Chips */}
      {/* Chip: Entra ID */}
      <g transform="translate(62, 148)">
        <rect rx="10" width="110" height="34" fill="rgba(11,17,32,0.85)" stroke="rgba(37,99,255,0.4)" strokeWidth="1" />
        <circle cx="16" cy="17" r="5" fill="#10D97C" opacity="0.9" />
        <text x="28" y="13" fill="#94A3B8" fontSize="8" fontFamily="system-ui" fontWeight="600" letterSpacing="0.06em" textAnchor="start">ENTRA ID</text>
        <text x="28" y="25" fill="#F0F4FF" fontSize="9.5" fontFamily="system-ui" fontWeight="700" textAnchor="start">Gesichert</text>
      </g>
      {/* Chip: Intune */}
      <g transform="translate(310, 108)">
        <rect rx="10" width="108" height="34" fill="rgba(11,17,32,0.85)" stroke="rgba(37,99,255,0.4)" strokeWidth="1" />
        <circle cx="16" cy="17" r="5" fill="#18D5FF" opacity="0.9" />
        <text x="28" y="13" fill="#94A3B8" fontSize="8" fontFamily="system-ui" fontWeight="600" letterSpacing="0.06em" textAnchor="start">INTUNE</text>
        <text x="28" y="25" fill="#F0F4FF" fontSize="9.5" fontFamily="system-ui" fontWeight="700" textAnchor="start">Konform</text>
      </g>
      {/* Chip: Defender */}
      <g transform="translate(318, 318)">
        <rect rx="10" width="120" height="34" fill="rgba(11,17,32,0.85)" stroke="rgba(200,169,107,0.35)" strokeWidth="1" />
        <circle cx="16" cy="17" r="5" fill="#C8A96B" opacity="0.9" />
        <text x="28" y="13" fill="#94A3B8" fontSize="8" fontFamily="system-ui" fontWeight="600" letterSpacing="0.06em" textAnchor="start">DEFENDER</text>
        <text x="28" y="25" fill="#F0F4FF" fontSize="9.5" fontFamily="system-ui" fontWeight="700" textAnchor="start">Aktiv · Plan 2</text>
      </g>
      {/* Chip: Secure Score */}
      <g transform="translate(52, 308)">
        <rect rx="10" width="118" height="34" fill="rgba(11,17,32,0.85)" stroke="rgba(24,213,255,0.3)" strokeWidth="1" />
        <text x="12" y="14" fill="#94A3B8" fontSize="8" fontFamily="system-ui" fontWeight="600" letterSpacing="0.06em" textAnchor="start">SECURE SCORE</text>
        <text x="12" y="27" fill="#18D5FF" fontSize="13" fontFamily="system-ui" fontWeight="800" textAnchor="start">87 / 100</text>
      </g>

      {/* Animated Scan-Linie */}
      <line x1="60" y1="0" x2="420" y2="480" stroke="url(#orbit-grad)" strokeWidth="0.5" opacity="0.15" />
    </svg>
  );
}

// ── Scroll-animierter Hintergrund-Gradient ──
function ScrollGradient({ progress }: { progress: ReturnType<typeof useSpring> }) {
  const opacity = useTransform(progress, [0, 0.6], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black 20%, transparent 80%)",
        }}
      />
      {/* Ambient Orbs */}
      <div
        className="absolute left-1/4 top-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(37,99,255,0.12) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute right-1/4 top-1/3 w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(24,213,255,0.08) 0%, transparent 70%)",
          transform: "translate(50%, -50%)",
          filter: "blur(60px)",
        }}
      />
    </motion.div>
  );
}

// ── Haupt-Hero ──
export default function HeroV2() {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-Progress relativ zur Hero-Section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Text-Gruppe: nach oben wegfaden
  const textY      = useTransform(smoothProgress, [0, 0.5], ["0%", "-12%"]);
  const textOpacity = useTransform(smoothProgress, [0, 0.38], [1, 0]);

  // 3D-Asset: heranzoomen & einblenden
  const orbScale   = useTransform(smoothProgress, [0, 0.6], [1, 1.55]);
  const orbOpacity = useTransform(smoothProgress, [0, 0.08, 0.7, 1], [0, 1, 1, 0.3]);
  const orbY       = useTransform(smoothProgress, [0, 0.6], ["0%", "8%"]);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: [0.4, 0, 0.2, 1] },
  });

  return (
    // Sticky-Wrapper — scroll-Trigger benötigt container-Höhe
    <div ref={containerRef} className="relative" style={{ height: "200vh" }}>
      {/* Sticky-Viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center px-6 lg:px-8">
        <ScrollGradient progress={smoothProgress} />

        {/* ── Layout ── */}
        <div className="relative z-10 w-full max-w-[1100px] mx-auto grid xl:grid-cols-[1fr_480px] gap-12 lg:gap-20 items-center">

          {/* Links: Copy */}
          <motion.div style={{ y: textY, opacity: textOpacity }}>
            {/* Eyebrow */}
            <motion.div {...fadeUp(0)} className="mb-7">
              <span className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 text-[0.75rem] font-bold tracking-[0.08em] uppercase text-accent-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-2 animate-pulse-dot" />
                {t("hero.eyebrow")}
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              {...fadeUp(0.1)}
              className="font-display font-extrabold leading-[1.03] tracking-[-0.045em] text-white mb-6"
              style={{ fontSize: "clamp(2.75rem, 5.5vw, 4.25rem)" }}
            >
              {t("hero.h1a")}{" "}
              <span className="text-gradient">{t("hero.h1b")}</span>
              <br />
              {t("hero.h1c")}
            </motion.h1>

            {/* Sub */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-[1.0625rem] leading-[1.8] text-text-2 max-w-[480px] mb-9"
            >
              {t("hero.sub")}
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.3)} className="flex flex-wrap items-center gap-3 mb-10">
              <button
                className="btn-primary"
                onClick={() =>
                  document.getElementById("security-checker")?.scrollIntoView({ behavior: "smooth" })
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

            {/* Trust-Chips */}
            <motion.div
              {...fadeUp(0.4)}
              className="flex flex-wrap items-center gap-3 pt-7 border-t border-border"
            >
              <span className="text-[0.75rem] font-bold tracking-[0.08em] uppercase text-text-3 whitespace-nowrap">
                {t("hero.trustLabel")}
              </span>
              {["Microsoft Partner", "D/A/CH Region", "DSGVO Compliant", "SME & Mid-Market"].map((chip) => (
                <span
                  key={chip}
                  className="text-[0.75rem] font-semibold text-text-2 bg-card border border-border rounded-full px-3 py-1"
                >
                  {chip}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Rechts: 3D-Cloud-Orb */}
          <motion.div
            style={{ scale: orbScale, opacity: orbOpacity, y: orbY }}
            className="hidden xl:flex items-center justify-center relative"
          >
            {/* Äußerer Glow-Ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(37,99,255,0.18) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />
            <div className="relative w-[460px] h-[460px]">
              <CloudOrb />
            </div>
          </motion.div>
        </div>

        {/* Scroll-Indikator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          style={{ opacity: useTransform(smoothProgress, [0, 0.15], [1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-5 h-8 rounded-full border border-border-strong flex items-start justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-text-3"
            />
          </div>
          <span className="text-[0.625rem] font-bold tracking-[0.1em] uppercase text-text-3">Scroll</span>
        </motion.div>
      </div>
    </div>
  );
}
