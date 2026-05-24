"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

// ── i18n strings (inline, kein useTranslations-Overhead für statische Section) ──

const COPY = {
  de: {
    sectionLabel:  "Modern Workplace Platform",
    h2a:           "Vollautomatisches",
    h2b:           "Intune-Deployment",
    sub:           "22 Schritte. Eine Konfigurationsdatei. Keine Handarbeit. Die Platform Factory richtet einen produktionsreifen M365-Tenant vollautomatisch ein — inklusive Security Baselines, Autopilot, App-Deployment und CI/CD-gestützter Drift Detection.",
    badge1:        "Idempotent — beliebig oft ausführbar",
    badge2:        "Drift Detection täglich 06:00 UTC",
    badge3:        "GitHub Actions + Azure DevOps ready",
    kpis: [
      { value: "22",   label: "Automatische Schritte" },
      { value: "100%", label: "Idempotent"             },
      { value: "6",    label: "Module"                 },
      { value: "<30m", label: "Full Deploy"            },
    ],
    pillarsLabel: "Plattform-Fähigkeiten",
    pillars: [
      { label: "Autopilot Deployment",  desc: "Zero-Touch-Enrollments per Windows Autopilot — Gerät auspacken, anmelden, fertig." },
      { label: "Security Baselines",    desc: "BitLocker XTS-AES 256, Defender + ASR Rules, Firewall-Baseline und Windows LAPS ab Deployment." },
      { label: "Drift Detection",       desc: "Tägliche Prüfung aller Intune-Konfigurationen gegen Templates — Abweichungen werden sofort gemeldet." },
      { label: "Update Management",     desc: "Quality +7 Tage, Feature +60 Tage. Keine Endgeräte außerhalb des genehmigten Versions-Fensters." },
      { label: "Compliance Policies",   desc: "Automatische Blockade nicht-konformer Geräte. Conditional Access greift — kein Umgehen möglich." },
      { label: "WHfB Cloud Trust",      desc: "Windows Hello for Business ohne PKI. Passwortloser Zugriff für alle verwalteten Endgeräte." },
    ],
    archTitle: "Architektur: Bootstrap orchestriert — Module liefern",
    archBody:  "ist ein reiner Orchestrator. Alle Konfigurationswerte stammen aus",
    archBody2: "— kein Hardcoding in Modulen. Policy-Templates nutzen",
    archBody3: "Substitution zur Laufzeit.",
    pipelineLabel: "Deployment-Pipeline · 22 Steps",
    phases: [
      { num: "01", title: "Tenant Foundation",    items: ["Break-Glass-Konto + Global Admin Rolle", "6 Entra ID Gruppen (dynamisch + assigned)", "MDM-Scope Validation"] },
      { num: "02", title: "Security Stack",        items: ["BitLocker XTS-AES 256, Defender Baseline, ASR Rules", "Firewall-Baseline (alle Profile), Credential Guard", "LAPS — lokale Admin-Passwort-Rotation"] },
      { num: "03", title: "Autopilot & Enrollment",items: ["User-Driven Deployment Profile (AP-%RAND:6%)", "Pre-Provisioning (White Glove) aktiviert", "Enrollment Status Page — 90 Min Timeout"] },
      { num: "04", title: "App Deployment",        items: ["M365 Apps Enterprise — 64-bit, Monthly Channel", "Teams + Edge via WinGet (kein Store for Business)", "Company Portal — Self-Service Katalog"] },
      { num: "05", title: "Identity & Access",     items: ["3 Conditional Access Policies (Report-only bis Test OK)", "Windows Hello for Business Cloud Trust", "Compliance Policy — Block bei Verstoss"] },
      { num: "06", title: "CI/CD & Drift Detection",items: ["GitHub Actions + Azure DevOps Pipelines enthalten", "Täglicher Drift-Check um 06:00 UTC", "Alle Ausgaben als Artefakte archiviert (90 Tage)"] },
    ],
    cta:      "Deployment anfragen",
    ctaSub:   "Festpreis · Vollautomatisch · Rollback-fähig",
    refLabel: "Referenzprojekt",
    refHeadline: "320 Geräte. 5 Standorte. Einheitlich verwaltet.",
    refDesc:  "Logistikunternehmen mit unkontrolliertem Teams-Wildwuchs und unverwalteten Geräten — Modern Workplace Transformation via Intune standardisierte das Gerätemanagement und migrierte 28 Dateifreigaben.",
    refLink:  "Zur Fallstudie",
  },
  en: {
    sectionLabel:  "Modern Workplace Platform",
    h2a:           "Fully Automated",
    h2b:           "Intune Deployment",
    sub:           "22 steps. One config file. Zero manual work. The Platform Factory provisions a production-ready M365 tenant automatically — including security baselines, Autopilot, app deployment and CI/CD-powered drift detection.",
    badge1:        "Idempotent — safe to run repeatedly",
    badge2:        "Drift detection daily at 06:00 UTC",
    badge3:        "GitHub Actions + Azure DevOps ready",
    kpis: [
      { value: "22",   label: "Automated Steps"  },
      { value: "100%", label: "Idempotent"        },
      { value: "6",    label: "Modules"           },
      { value: "<30m", label: "Full Deploy"       },
    ],
    pillarsLabel: "Platform Capabilities",
    pillars: [
      { label: "Autopilot Deployment",  desc: "Zero-touch enrolment via Windows Autopilot — unbox, sign in, done." },
      { label: "Security Baselines",    desc: "BitLocker XTS-AES 256, Defender + ASR rules, firewall baseline and Windows LAPS from day one." },
      { label: "Drift Detection",       desc: "Daily comparison of all Intune policies against templates — deviations reported immediately." },
      { label: "Update Management",     desc: "Quality +7 days, feature +60 days. No device outside the approved version window." },
      { label: "Compliance Policies",   desc: "Automatic blocking of non-compliant devices. Conditional Access enforces it — no bypass." },
      { label: "WHfB Cloud Trust",      desc: "Windows Hello for Business without PKI. Passwordless access for all managed endpoints." },
    ],
    archTitle: "Architecture: bootstrap orchestrates — modules deliver",
    archBody:  "is a pure orchestrator. All configuration values come from",
    archBody2: "— no hardcoded values in modules. Policy templates use",
    archBody3: "substitution at runtime.",
    pipelineLabel: "Deployment Pipeline · 22 Steps",
    phases: [
      { num: "01", title: "Tenant Foundation",    items: ["Break-glass account + Global Admin role", "6 Entra ID groups (dynamic + assigned)", "MDM scope validation"] },
      { num: "02", title: "Security Stack",        items: ["BitLocker XTS-AES 256, Defender baseline, ASR rules", "Firewall baseline (all profiles), Credential Guard", "LAPS — local admin password rotation"] },
      { num: "03", title: "Autopilot & Enrolment", items: ["User-driven deployment profile (AP-%RAND:6%)", "Pre-provisioning (White Glove) enabled", "Enrolment Status Page — 90 min timeout"] },
      { num: "04", title: "App Deployment",        items: ["M365 Apps Enterprise — 64-bit, Monthly Channel", "Teams + Edge via WinGet (no Store for Business)", "Company Portal — self-service catalogue"] },
      { num: "05", title: "Identity & Access",     items: ["3 Conditional Access policies (report-only until test OK)", "Windows Hello for Business Cloud Trust", "Compliance policy — block on violation"] },
      { num: "06", title: "CI/CD & Drift Detection",items: ["GitHub Actions + Azure DevOps pipelines included", "Daily drift check at 06:00 UTC", "All outputs archived as artefacts (90 days)"] },
    ],
    cta:      "Request Deployment",
    ctaSub:   "Fixed price · Fully automated · Rollback-capable",
    refLabel: "Reference Project",
    refHeadline: "320 devices. 5 sites. Unified management.",
    refDesc:  "Logistics company with uncontrolled Teams sprawl and unmanaged endpoints — Modern Workplace transformation via Intune standardised device management and migrated 28 file shares.",
    refLink:  "View case study",
  },
} as const;

// ── Icons ─────────────────────────────────────────────────────────────────────

const PILLAR_ICONS = [
  (c: string) => (
    <svg viewBox="0 0 32 32" fill="none" width="20" height="20" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="20" width="26" height="8" rx="2"/><rect x="9" y="12" width="14" height="8" rx="1.5"/>
      <rect x="13" y="4" width="6" height="8" rx="1.5"/>
    </svg>
  ),
  (c: string) => (
    <svg viewBox="0 0 32 32" fill="none" width="20" height="20" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4L6 8v8c0 7 10 12 10 12s10-5 10-12V8z"/><path d="M11 16l3.5 3.5L21 13"/>
    </svg>
  ),
  (c: string) => (
    <svg viewBox="0 0 32 32" fill="none" width="20" height="20" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="5" width="24" height="16" rx="2"/><path d="M12 27h8M16 21v6"/>
      <path d="M10 13l2.5 2.5L16 12l3 3 3-4"/>
    </svg>
  ),
  (c: string) => (
    <svg viewBox="0 0 32 32" fill="none" width="20" height="20" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 16a10 10 0 0117.1-7.1L26 6"/><path d="M26 16a10 10 0 01-17.1 7.1L6 26"/>
      <path d="M23 3v5h5"/><path d="M9 24v5H4"/>
    </svg>
  ),
  (c: string) => (
    <svg viewBox="0 0 32 32" fill="none" width="20" height="20" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="14" width="16" height="12" rx="2.5"/><path d="M11 14v-3a5 5 0 0110 0v3"/>
      <circle cx="16" cy="20" r="1.5" fill={c} stroke="none"/>
    </svg>
  ),
  (c: string) => (
    <svg viewBox="0 0 32 32" fill="none" width="20" height="20" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="4"/><path d="M3 26c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
      <circle cx="22" cy="10" r="3"/><path d="M26 24c0-3.3-1.8-6.1-4.5-7.5"/>
    </svg>
  ),
];

const PILLAR_ACCENTS = ["#5E5CE6","#22d3ee","#a855f7","#f59e0b","#22d3ee","#ec4899"];

// ── Sub-components ────────────────────────────────────────────────────────────

function DriftBadge({ text, accent }: { text: string; accent: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[0.75rem] font-bold px-2.5 py-1 rounded-full"
      style={{ background: `${accent}12`, border: `1px solid ${accent}28`, color: accent }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {text}
    </span>
  );
}

function KpiPill({ value, label, accent }: { value: string; label: string; accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center px-6 py-4 rounded-2xl"
      style={{
        background: "linear-gradient(135deg, rgba(8,8,20,0.97) 0%, rgba(12,8,28,0.97) 100%)",
        border: `1px solid ${accent}22`,
        boxShadow: `0 0 0 1px ${accent}0C, inset 0 1px 0 rgba(255,255,255,0.04)`,
      }}
    >
      <div
        className="font-display font-extrabold text-[1.75rem] tracking-[-0.04em] leading-none"
        style={{ color: accent, textShadow: `0 0 20px ${accent}60` }}
      >
        {value}
      </div>
      <div className="text-[0.6875rem] font-semibold uppercase tracking-[0.07em] mt-1" style={{ color: "rgba(100,116,139,0.7)" }}>
        {label}
      </div>
    </motion.div>
  );
}

function PillarCard({ icon, label, desc, accent, delay }: {
  icon: (c: string) => React.ReactNode; label: string; desc: string; accent: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] }}
      className="group relative rounded-2xl p-5 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(8,8,20,0.97) 0%, rgba(12,8,28,0.97) 100%)",
        border: `1px solid ${accent}20`,
        boxShadow: `0 0 0 1px ${accent}0C, 0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)`,
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}90, transparent)` }} />
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${accent}0E 0%, transparent 70%)` }} />
      <div
        className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{
          background: `linear-gradient(135deg, ${accent}18 0%, ${accent}08 100%)`,
          border: `1px solid ${accent}28`,
          boxShadow: `0 0 12px ${accent}18`,
        }}
      >
        {icon(accent)}
      </div>
      <h4 className="relative z-10 font-display font-bold text-[0.9375rem] tracking-[-0.02em] mb-1.5" style={{ color: "#f1f5f9" }}>
        {label}
      </h4>
      <p className="relative z-10 text-[0.8125rem] leading-relaxed" style={{ color: "rgba(148,163,184,0.7)" }}>
        {desc}
      </p>
    </motion.div>
  );
}

function PhaseStep({ num, title, items, accent, delay }: {
  num: string; title: string; items: string[]; accent: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] }}
      className="relative pl-8"
    >
      <div className="absolute left-[11px] top-10 bottom-0 w-px"
        style={{ background: `linear-gradient(to bottom, ${accent}30, transparent)` }} />
      <div
        className="absolute left-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${accent}25 0%, ${accent}10 100%)`,
          border: `1.5px solid ${accent}50`,
          boxShadow: `0 0 10px ${accent}30`,
        }}
      >
        <span className="font-mono text-[0.5625rem] font-bold" style={{ color: accent }}>{num}</span>
      </div>
      <h4 className="font-display font-bold text-[0.9375rem] tracking-[-0.02em] mb-2.5" style={{ color: "#f1f5f9" }}>
        {title}
      </h4>
      <ul className="space-y-1.5 mb-6">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-[0.8125rem]" style={{ color: "rgba(148,163,184,0.68)" }}>
            <span className="mt-0.5 font-bold text-[0.625rem] flex-shrink-0" style={{ color: accent }}>→</span>
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

export default function IntuneSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.05 });
  const locale     = useLocale();
  const t          = COPY[locale === "de" ? "de" : "en"];

  const A1 = "#5E5CE6";
  const A2 = "#22d3ee";
  const A3 = "#a855f7";

  return (
    <section
      id="intune-platform"
      ref={sectionRef}
      className="relative z-10 bg-bg-1 py-28 px-6 overflow-hidden"
    >
      {/* ambient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 40% at 80% 100%, rgba(94,92,230,0.06) 0%, transparent 65%)" }} />

      <div className="max-w-[1100px] mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-14"
        >
          <div>
            {/* section-label uses the ::before pseudo via CSS class — no manual span needed */}
            <div className="section-label mb-4" style={{ "--tw-text-opacity": "1", color: A1 } as React.CSSProperties}>
              {t.sectionLabel}
            </div>
            <h2 className="display-md text-text-1 mb-4">
              {t.h2a}<br />
              <span style={{
                background: `linear-gradient(135deg, ${A1} 0%, ${A2} 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                {t.h2b}
              </span>
            </h2>
            <p className="text-[1.0625rem] leading-relaxed text-text-2 max-w-[540px]">{t.sub}</p>
          </div>
          <div className="flex flex-col gap-2 flex-shrink-0">
            <DriftBadge text={t.badge1} accent={A1} />
            <DriftBadge text={t.badge2} accent={A3} />
            <DriftBadge text={t.badge3} accent={A2} />
          </div>
        </motion.div>

        {/* ── KPIs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16"
        >
          {t.kpis.map((k, i) => (
            <KpiPill key={k.label} value={k.value} label={k.label}
              accent={[A1, A2, A3, "#f59e0b"][i]} />
          ))}
        </motion.div>

        {/* ── Body: pillars left, timeline right ── */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-12 items-start">

          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[0.6875rem] font-bold tracking-[0.1em] uppercase mb-5"
              style={{ color: "rgba(100,116,139,0.6)" }}
            >
              {t.pillarsLabel}
            </motion.p>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {t.pillars.map((p, i) => (
                <PillarCard
                  key={p.label}
                  icon={PILLAR_ICONS[i]}
                  label={p.label}
                  desc={p.desc}
                  accent={PILLAR_ACCENTS[i]}
                  delay={i * 0.07}
                />
              ))}
            </div>

            {/* Architecture note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-6 rounded-2xl p-5"
              style={{
                background: "linear-gradient(135deg, rgba(94,92,230,0.07) 0%, rgba(34,211,238,0.04) 100%)",
                border: "1px solid rgba(94,92,230,0.18)",
                boxShadow: "0 0 24px rgba(94,92,230,0.07)",
              }}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(94,92,230,0.15)", border: "1px solid rgba(94,92,230,0.28)" }}>
                  <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="#5E5CE6" strokeWidth="2" strokeLinecap="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-display font-bold text-[0.9375rem] mb-1" style={{ color: "#f1f5f9" }}>{t.archTitle}</p>
                  <p className="text-[0.8125rem] leading-relaxed" style={{ color: "rgba(148,163,184,0.7)" }}>
                    <code className="font-mono text-[0.75rem] px-1.5 py-0.5 rounded" style={{ background: "rgba(94,92,230,0.12)", color: "#a78bfa" }}>bootstrap.ps1</code>
                    {" "}{t.archBody}{" "}
                    <code className="font-mono text-[0.75rem] px-1.5 py-0.5 rounded" style={{ background: "rgba(34,211,238,0.10)", color: "#22d3ee" }}>tenant.json</code>
                    {" "}{t.archBody2}{" "}
                    <code className="font-mono text-[0.75rem] px-1.5 py-0.5 rounded" style={{ background: "rgba(168,85,247,0.10)", color: "#c084fc" }}>{"{{Placeholder}}"}</code>
                    {" "}{t.archBody3}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Cross-link to Results case study (Logistik) */}
            <motion.a
              href="#results"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-4 flex items-center gap-4 rounded-2xl p-4 group transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, rgba(8,8,20,0.97) 0%, rgba(12,8,28,0.97) 100%)",
                border: "1px solid rgba(34,211,238,0.14)",
                boxShadow: "0 0 0 1px rgba(34,211,238,0.06), inset 0 1px 0 rgba(255,255,255,0.03)",
              }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(34,211,238,0.10)", border: "1px solid rgba(34,211,238,0.22)" }}>
                <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.08em] mb-0.5" style={{ color: "rgba(100,116,139,0.6)" }}>
                  {t.refLabel}
                </p>
                <p className="font-display font-bold text-[0.875rem] tracking-[-0.01em]" style={{ color: "#f1f5f9" }}>
                  {t.refHeadline}
                </p>
                <p className="text-[0.75rem] leading-snug mt-0.5 line-clamp-2" style={{ color: "rgba(148,163,184,0.6)" }}>
                  {t.refDesc}
                </p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round"
                className="flex-shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.a>
          </div>

          {/* Right: timeline panel */}
          <div
            className="rounded-3xl p-7 lg:sticky lg:top-24"
            style={{
              background: "linear-gradient(135deg, rgba(8,8,20,0.98) 0%, rgba(12,8,28,0.98) 100%)",
              border: "1px solid rgba(94,92,230,0.18)",
              boxShadow: "0 0 0 1px rgba(94,92,230,0.08), 0 24px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
              backdropFilter: "blur(24px)",
            }}
          >
            <p className="text-[0.6875rem] font-bold tracking-[0.1em] uppercase mb-6"
              style={{ color: "rgba(100,116,139,0.6)" }}>
              {t.pipelineLabel}
            </p>

            {t.phases.map((phase, i) => (
              <PhaseStep
                key={phase.num}
                num={phase.num}
                title={phase.title}
                items={phase.items}
                accent={[A1, A2, A3, "#f59e0b", "#ec4899", A2][i]}
                delay={0.1 + i * 0.07}
              />
            ))}

            <div className="mt-2 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <a
                href="#contact"
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl",
                  "font-bold text-[0.9375rem] font-body tracking-[-0.01em]",
                  "transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5",
                )}
                style={{
                  background: `linear-gradient(135deg, ${A1} 0%, ${A2} 100%)`,
                  color: "#fff",
                  boxShadow: `0 0 24px rgba(94,92,230,0.4), 0 0 48px rgba(34,211,238,0.1)`,
                }}
              >
                {t.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <p className="text-[0.6875rem] text-center mt-3" style={{ color: "rgba(100,116,139,0.55)" }}>
                {t.ctaSub}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
