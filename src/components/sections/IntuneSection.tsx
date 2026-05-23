"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Precision-Stroke Icons ────────────────────────────────────────────────────

const IconShieldCheck = ({ color }: { color: string }) => (
  <svg viewBox="0 0 32 32" fill="none" width="22" height="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 4L6 8v8c0 7 10 12 10 12s10-5 10-12V8z"/>
    <path d="M11 16l3.5 3.5L21 13"/>
  </svg>
);

const IconLock = ({ color }: { color: string }) => (
  <svg viewBox="0 0 32 32" fill="none" width="22" height="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="8" y="14" width="16" height="12" rx="2.5"/>
    <path d="M11 14v-3a5 5 0 0110 0v3"/>
    <circle cx="16" cy="20" r="1.5" fill={color} stroke="none"/>
  </svg>
);

const IconRefresh = ({ color }: { color: string }) => (
  <svg viewBox="0 0 32 32" fill="none" width="22" height="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 16a10 10 0 0117.1-7.1L26 6"/>
    <path d="M26 16a10 10 0 01-17.1 7.1L6 26"/>
    <path d="M23 3v5h5"/>
    <path d="M9 24v5H4"/>
  </svg>
);

const IconMonitor = ({ color }: { color: string }) => (
  <svg viewBox="0 0 32 32" fill="none" width="22" height="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="5" width="24" height="16" rx="2"/>
    <path d="M12 27h8M16 21v6"/>
    <path d="M10 13l2.5 2.5L16 12l3 3 3-4"/>
  </svg>
);

const IconUsers = ({ color }: { color: string }) => (
  <svg viewBox="0 0 32 32" fill="none" width="22" height="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="4"/>
    <path d="M3 26c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
    <circle cx="22" cy="10" r="3"/>
    <path d="M26 24c0-3.3-1.8-6.1-4.5-7.5"/>
  </svg>
);

const IconDeploy = ({ color }: { color: string }) => (
  <svg viewBox="0 0 32 32" fill="none" width="22" height="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="20" width="26" height="8" rx="2"/>
    <rect x="9" y="12" width="14" height="8" rx="1.5"/>
    <rect x="13" y="4" width="6" height="8" rx="1.5"/>
    <line x1="16" y1="4" x2="16" y2="3"/>
  </svg>
);

// ── Types ─────────────────────────────────────────────────────────────────────

type PillarItem = {
  icon: React.ReactNode;
  label: string;
  desc: string;
  accent: string;
};

type PhaseItem = {
  num: string;
  title: string;
  items: string[];
  accent: string;
};

// ── Sub-components ────────────────────────────────────────────────────────────

function PillarCard({ item, delay }: { item: PillarItem; delay: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
      className="group relative rounded-2xl p-5 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(8,8,20,0.97) 0%, rgba(12,8,28,0.97) 100%)",
        border: `1px solid ${item.accent}20`,
        boxShadow: `0 0 0 1px ${item.accent}0C, 0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)`,
        backdropFilter: "blur(20px)",
      }}
    >
      {/* hover top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${item.accent}90, transparent)` }}
      />
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${item.accent}0E 0%, transparent 70%)` }}
      />

      <div
        className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{
          background: `linear-gradient(135deg, ${item.accent}18 0%, ${item.accent}08 100%)`,
          border: `1px solid ${item.accent}28`,
          boxShadow: `0 0 12px ${item.accent}18`,
        }}
      >
        {item.icon}
      </div>
      <h4 className="relative z-10 font-display font-bold text-[0.9375rem] tracking-[-0.02em] mb-1.5" style={{ color: "#f1f5f9" }}>
        {item.label}
      </h4>
      <p className="relative z-10 text-[0.8125rem] leading-relaxed" style={{ color: "rgba(148,163,184,0.7)" }}>
        {item.desc}
      </p>
    </motion.div>
  );
}

function PhaseStep({ phase, delay }: { phase: PhaseItem; delay: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
      className="relative pl-8"
    >
      {/* vertical connector line */}
      <div
        className="absolute left-[11px] top-10 bottom-0 w-px"
        style={{ background: `linear-gradient(to bottom, ${phase.accent}30, transparent)` }}
      />
      {/* circle node */}
      <div
        className="absolute left-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${phase.accent}25 0%, ${phase.accent}10 100%)`,
          border: `1.5px solid ${phase.accent}50`,
          boxShadow: `0 0 10px ${phase.accent}30`,
        }}
      >
        <span className="font-mono text-[0.625rem] font-bold" style={{ color: phase.accent }}>{phase.num}</span>
      </div>

      <h4 className="font-display font-bold text-[0.9375rem] tracking-[-0.02em] mb-3" style={{ color: "#f1f5f9" }}>
        {phase.title}
      </h4>
      <ul className="space-y-1.5 mb-6">
        {phase.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-[0.8125rem]" style={{ color: "rgba(148,163,184,0.68)" }}>
            <span className="mt-0.5 font-bold text-[0.6875rem] flex-shrink-0" style={{ color: phase.accent, textShadow: `0 0 8px ${phase.accent}60` }}>→</span>
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ── Animated counter for hero KPI ─────────────────────────────────────────────

function KpiPill({ value, label, accent }: { value: string; label: string; accent: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
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

// ── Drift-Detection badge ─────────────────────────────────────────────────────

function DriftBadge({ text, accent }: { text: string; accent: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[0.75rem] font-bold px-2.5 py-1 rounded-full"
      style={{
        background: `${accent}12`,
        border: `1px solid ${accent}28`,
        color: accent,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {text}
    </span>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────

export default function IntuneSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.05 });

  const ACCENT_PRIMARY   = "#5E5CE6";  // Intune-Lila — konsistent mit SecurityScrollytelling
  const ACCENT_SECONDARY = "#22d3ee";
  const ACCENT_DRIFT     = "#a855f7";

  const PILLARS: PillarItem[] = [
    {
      icon: <IconDeploy color="#5E5CE6" />,
      label: "Autopilot Deployment",
      desc: "Zero-Touch-Enrollments per Windows Autopilot — Gerät auspacken, anmelden, fertig.",
      accent: "#5E5CE6",
    },
    {
      icon: <IconShieldCheck color="#22d3ee" />,
      label: "Security Baselines",
      desc: "BitLocker XTS-AES 256, Defender + ASR Rules, Firewall-Baseline und Windows LAPS ab Deployment.",
      accent: "#22d3ee",
    },
    {
      icon: <IconMonitor color="#a855f7" />,
      label: "Drift Detection",
      desc: "Tägliche Prüfung aller Intune-Konfigurationen gegen Templates — Abweichungen werden sofort gemeldet.",
      accent: "#a855f7",
    },
    {
      icon: <IconRefresh color="#f59e0b" />,
      label: "Update Management",
      desc: "Quality +7 Tage, Feature +60 Tage. Keine Endgeräte außerhalb des genehmigten Versions-Fensters.",
      accent: "#f59e0b",
    },
    {
      icon: <IconLock color="#22d3ee" />,
      label: "Compliance Policies",
      desc: "Automatische Blockade nicht-konformer Geräte. Conditional Access greift — kein Umgehen möglich.",
      accent: "#22d3ee",
    },
    {
      icon: <IconUsers color="#ec4899" />,
      label: "WHfB Cloud Trust",
      desc: "Windows Hello for Business ohne PKI. Passwortloser Zugriff für alle verwalteten Endgeräte.",
      accent: "#ec4899",
    },
  ];

  const PHASES: PhaseItem[] = [
    {
      num: "01",
      title: "Tenant Foundation",
      accent: "#5E5CE6",
      items: [
        "Break-Glass-Konto + Global Admin Rolle",
        "6 Entra ID Gruppen (dynamisch + assigned)",
        "MDM-Scope Validation",
      ],
    },
    {
      num: "02",
      title: "Security Stack",
      accent: "#22d3ee",
      items: [
        "BitLocker XTS-AES 256, Defender Baseline, ASR Rules",
        "Firewall-Baseline (alle Profile), Credential Guard",
        "LAPS — lokale Admin-Passwort-Rotation",
      ],
    },
    {
      num: "03",
      title: "Autopilot & Enrollment",
      accent: "#a855f7",
      items: [
        "User-Driven Deployment Profile (AP-%RAND:6%)",
        "Pre-Provisioning (White Glove) aktiviert",
        "Enrollment Status Page — 90 Min Timeout",
      ],
    },
    {
      num: "04",
      title: "App Deployment",
      accent: "#f59e0b",
      items: [
        "M365 Apps Enterprise — 64-bit, Monthly Channel",
        "Teams + Edge via WinGet (kein Store for Business)",
        "Company Portal — Self-Service Katalog",
      ],
    },
    {
      num: "05",
      title: "Identity & Access",
      accent: "#ec4899",
      items: [
        "3 Conditional Access Policies (Report-only bis Test OK)",
        "Windows Hello for Business Cloud Trust",
        "Compliance Policy — Block bei Verstoss",
      ],
    },
    {
      num: "06",
      title: "CI/CD & Drift Detection",
      accent: "#22d3ee",
      items: [
        "GitHub Actions + Azure DevOps Pipelines enthalten",
        "Täglicher Drift-Check um 06:00 UTC",
        "Alle Ausgaben als Artefakte archiviert (90 Tage)",
      ],
    },
  ];

  const KPIS = [
    { value: "22",   label: "Automatische Schritte", accent: ACCENT_PRIMARY   },
    { value: "100%", label: "Idempotent",             accent: ACCENT_SECONDARY },
    { value: "6",    label: "Module",                 accent: ACCENT_DRIFT     },
    { value: "<30m", label: "Full Deploy",            accent: "#f59e0b"        },
  ];

  return (
    <section
      id="intune-platform"
      ref={sectionRef}
      className="relative z-10 bg-bg-1 py-28 px-6 overflow-hidden"
    >
      {/* Background ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 40% at 80% 100%, rgba(94,92,230,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-[1100px] mx-auto relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-14"
        >
          <div>
            <div className="section-label mb-4" style={{ color: ACCENT_PRIMARY }}>
              <span className="block w-4 h-[1.5px] rounded-full" style={{ background: ACCENT_PRIMARY }} />
              Modern Workplace Platform
            </div>
            <h2 className="display-md text-text-1 mb-4">
              Vollautomatisches<br />
              <span
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_PRIMARY} 0%, ${ACCENT_SECONDARY} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Intune-Deployment
              </span>
            </h2>
            <p className="text-[1.0625rem] leading-relaxed text-text-2 max-w-[540px]">
              22 Schritte. Eine Konfigurationsdatei. Keine Handarbeit.
              Die Platform Factory richtet einen produktionsreifen M365-Tenant vollautomatisch ein —
              inklusive Security Baselines, Autopilot, App-Deployment und CI/CD-gestützter Drift Detection.
            </p>
          </div>

          {/* Status badges */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            <DriftBadge text="Idempotent — beliebig oft ausführbar" accent={ACCENT_PRIMARY} />
            <DriftBadge text="Drift Detection täglich 06:00 UTC" accent={ACCENT_DRIFT} />
            <DriftBadge text="GitHub Actions + Azure DevOps ready" accent={ACCENT_SECONDARY} />
          </div>
        </motion.div>

        {/* ── KPI Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16"
        >
          {KPIS.map((k) => (
            <KpiPill key={k.label} value={k.value} label={k.label} accent={k.accent} />
          ))}
        </motion.div>

        {/* ── Main Body: 2-col ── */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-12 items-start">

          {/* Left: Pillar Cards Grid */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              className="text-[0.6875rem] font-bold tracking-[0.1em] uppercase mb-5"
              style={{ color: "rgba(100,116,139,0.6)" }}
            >
              Plattform-Fähigkeiten
            </motion.div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {PILLARS.map((p, i) => (
                <PillarCard key={p.label} item={p} delay={i * 0.07} />
              ))}
            </div>

            {/* Deployment Architecture note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 rounded-2xl p-5"
              style={{
                background: "linear-gradient(135deg, rgba(94,92,230,0.07) 0%, rgba(34,211,238,0.04) 100%)",
                border: "1px solid rgba(94,92,230,0.18)",
                boxShadow: "0 0 24px rgba(94,92,230,0.08)",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(94,92,230,0.15)", border: "1px solid rgba(94,92,230,0.28)" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="#5E5CE6" strokeWidth="2" strokeLinecap="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-display font-bold text-[0.9375rem] mb-1" style={{ color: "#f1f5f9" }}>
                    Architektur: Bootstrap orchestriert — Module liefern
                  </div>
                  <p className="text-[0.8125rem] leading-relaxed" style={{ color: "rgba(148,163,184,0.7)" }}>
                    <code className="font-mono text-[0.75rem] px-1.5 py-0.5 rounded" style={{ background: "rgba(94,92,230,0.12)", color: "#a78bfa" }}>bootstrap.ps1</code>
                    {" "}ist ein reiner Orchestrator. Alle Konfigurationswerte stammen aus{" "}
                    <code className="font-mono text-[0.75rem] px-1.5 py-0.5 rounded" style={{ background: "rgba(34,211,238,0.10)", color: "#22d3ee" }}>tenant.json</code>
                    {" "}— kein Hardcoding in Modulen. Policy-Templates nutzen{" "}
                    <code className="font-mono text-[0.75rem] px-1.5 py-0.5 rounded" style={{ background: "rgba(168,85,247,0.10)", color: "#c084fc" }}>{"{{Placeholder}}"}</code>
                    {" "}Substitution zur Laufzeit.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Phase Timeline */}
          <div
            className="rounded-3xl p-7"
            style={{
              background: "linear-gradient(135deg, rgba(8,8,20,0.98) 0%, rgba(12,8,28,0.98) 100%)",
              border: "1px solid rgba(94,92,230,0.18)",
              boxShadow: "0 0 0 1px rgba(94,92,230,0.08), 0 24px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div className="text-[0.6875rem] font-bold tracking-[0.1em] uppercase mb-6" style={{ color: "rgba(100,116,139,0.6)" }}>
              Deployment-Pipeline · 22 Steps
            </div>
            <div>
              {PHASES.map((phase, i) => (
                <PhaseStep key={phase.num} phase={phase} delay={0.1 + i * 0.08} />
              ))}
            </div>

            {/* CTA */}
            <div
              className="mt-2 pt-6"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <a
                href="#contact"
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl",
                  "font-bold text-[0.9375rem] font-body tracking-[-0.01em] transition-all duration-200",
                )}
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_PRIMARY} 0%, ${ACCENT_SECONDARY} 100%)`,
                  color: "#fff",
                  boxShadow: `0 0 24px rgba(94,92,230,0.4), 0 0 48px rgba(34,211,238,0.1)`,
                }}
              >
                Deployment anfragen
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <p className="text-[0.6875rem] text-center mt-3" style={{ color: "rgba(100,116,139,0.55)" }}>
                Festpreis · Vollautomatisch · Rollback-fähig
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
