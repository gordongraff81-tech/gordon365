"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Precision-Stroke Service-Icons — currentColor-ready, 1.5px, 32×32 ─────
const IconScanDocument = ({ color }: { color: string }) => (
  <svg viewBox="0 0 32 32" fill="none" width="26" height="26" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="6" y="5" width="16" height="21" rx="2"/>
    <line x1="9" y1="10" x2="18" y2="10"/>
    <line x1="9" y1="14" x2="18" y2="14"/>
    <line x1="9" y1="18" x2="14" y2="18"/>
    <line x1="4" y1="16" x2="28" y2="16" strokeWidth="1" strokeDasharray="2 2"/>
    <circle cx="24" cy="23" r="4"/>
    <line x1="22" y1="23" x2="26" y2="23"/>
    <line x1="24" y1="21" x2="24" y2="25"/>
  </svg>
);

const IconStageDeploy = ({ color }: { color: string }) => (
  <svg viewBox="0 0 32 32" fill="none" width="26" height="26" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="12" y="4" width="8" height="5" rx="1.5"/>
    <rect x="9" y="11" width="14" height="5" rx="1.5"/>
    <rect x="6" y="18" width="20" height="5" rx="1.5"/>
    <path d="M16 9 L16 11"/>
    <path d="M16 23 L16 26"/>
    <path d="M13 26 L19 26"/>
  </svg>
);

const IconOrbitClock = ({ color }: { color: string }) => (
  <svg viewBox="0 0 32 32" fill="none" width="26" height="26" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="16" cy="16" r="9"/>
    <circle cx="16" cy="16" r="13.5" strokeDasharray="3 2.5"/>
    <line x1="16" y1="10" x2="16" y2="16"/>
    <line x1="16" y1="16" x2="20.5" y2="16"/>
    <circle cx="16" cy="16" r="1.5" fill={color} stroke="none"/>
  </svg>
);

// ── Daten ────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    tag: "Festpreis · 4–6 Wochen",
    name: "M365 Health Check",
    desc: "Eine forensische Prüfung Ihrer Microsoft 365-Umgebung. Wir identifizieren Verschwendung, kartieren Risiken und liefern eine priorisierte Roadmap.",
    outcomes: [
      "Lizenz-Audit mit Einsparmöglichkeiten",
      "Secure Score-Lückenanalyse",
      "Teams & SharePoint Governance",
      "Executive-Report mit ROI-Projektionen",
    ],
    price: "€1.500 – 3.000",
    period: "Festpreis · 10–250 Benutzer",
    cta: "Anfragen",
    size: "tall",
    accent: "#6366f1",
    glow: "rgba(99,102,241,0.25)",
    Icon: IconScanDocument,
  },
  {
    tag: "Am häufigsten gebucht",
    name: "Copilot Readiness Sprint",
    desc: "Technische und governance-seitige Bereitschaft für Microsoft 365 Copilot — Datenzugriff, Berechtigungen, Sensitivitätslabels.",
    outcomes: [
      "Copilot-Readiness-Score",
      "Daten-Governance Baseline",
      "Sensitivity Labels konfiguriert",
    ],
    price: "€2.500 – 5.000",
    period: "4–8 Wochen",
    cta: "Jetzt buchen",
    size: "featured",
    accent: "#22d3ee",
    glow: "rgba(34,211,238,0.22)",
    Icon: IconStageDeploy,
  },
  {
    tag: "Laufend · Monatlich",
    name: "Strategisches Beratungs-Retainer",
    desc: "Laufender strategischer M365-Berater — priorisieren, planen und umsetzen, ohne Vollzeitstellen zu besetzen.",
    outcomes: [
      "Monatliches Roadmap-Review",
      "Incident-Response Support",
      "Lizenz-Optimierung laufend",
    ],
    price: "Ab €1.200/Monat",
    period: "Monatlich kündbar",
    cta: "Details ansehen",
    size: "normal",
    accent: "#a855f7",
    glow: "rgba(168,85,247,0.2)",
    Icon: IconOrbitClock,
  },
];

const STATS = [
  { value: "120+",   label: "Gesicherte Umgebungen",  accent: "#6366f1" },
  { value: "€850K+", label: "Lizenz-Einsparungen",    accent: "#22d3ee" },
  { value: "98%",    label: "Kundenbindungsrate",      accent: "#a855f7" },
  { value: "12 J.",  label: "M365-Spezialisierung",    accent: "#ec4899" },
];

// ── BentoCard ────────────────────────────────────────────────────────────────
function BentoCard({
  service,
  delay = 0,
}: {
  service: (typeof SERVICES)[0];
  delay?: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const isFeatured = service.size === "featured";
  const isTall     = service.size === "tall";
  const { Icon } = service;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "group relative rounded-[28px] overflow-hidden transition-all duration-500",
        "hover:-translate-y-1.5",
        isTall ? "lg:row-span-2" : "",
      )}
      style={{
        background: isFeatured
          ? `linear-gradient(135deg, rgba(10,10,20,0.97) 0%, rgba(15,10,35,0.97) 50%, rgba(10,15,30,0.97) 100%)`
          : `linear-gradient(135deg, rgba(8,8,18,0.96) 0%, rgba(12,8,25,0.96) 100%)`,
        border: `1px solid ${service.accent}28`,
        boxShadow: isFeatured
          ? `0 0 0 1px ${service.accent}20, 0 0 60px ${service.glow}, 0 24px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)`
          : `0 0 0 1px ${service.accent}15, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Top gradient border line */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-px transition-opacity duration-500",
          isFeatured ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
        style={{ background: `linear-gradient(90deg, transparent 0%, ${service.accent}90 30%, ${service.accent} 50%, ${service.accent}90 70%, transparent 100%)` }}
      />

      {/* Radial glow inner light */}
      <div
        className="absolute inset-0 rounded-[28px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 45% at 50% 0%, ${service.accent}12 0%, transparent 65%)`,
          opacity: isFeatured ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />
      <div
        className="absolute inset-0 rounded-[28px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${service.accent}0E 0%, transparent 70%)` }}
      />

      {/* Corner glow accent */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${service.accent}18 0%, transparent 70%)`,
          filter: "blur(16px)",
        }}
      />

      <div className={cn("flex flex-col h-full relative z-10", isTall ? "p-8" : "p-7")}>
        {/* Icon + Tag */}
        <div className="flex items-start justify-between mb-6">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${service.accent}18 0%, ${service.accent}08 100%)`,
              border: `1px solid ${service.accent}30`,
              boxShadow: `0 0 16px ${service.accent}20, inset 0 1px 0 rgba(255,255,255,0.06)`,
            }}
          >
            <Icon color={service.accent} />
          </div>
          <span
            className={cn(
              "text-[0.625rem] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded",
              isFeatured ? "border" : ""
            )}
            style={
              isFeatured
                ? {
                    color: service.accent,
                    background: `${service.accent}12`,
                    borderColor: `${service.accent}35`,
                    textShadow: `0 0 8px ${service.accent}60`,
                  }
                : { color: "rgba(148,163,184,0.7)" }
            }
          >
            {service.tag}
          </span>
        </div>

        {/* Heading */}
        <h3
          className={cn(
            "font-display font-extrabold tracking-[-0.04em] leading-snug mb-3",
            isTall || isFeatured ? "text-[1.5rem]" : "text-[1.25rem]"
          )}
          style={{ color: "#f1f5f9" }}
        >
          {service.name}
        </h3>
        <p className="text-[0.875rem] leading-relaxed mb-5" style={{ color: "rgba(148,163,184,0.75)" }}>{service.desc}</p>

        {/* Outcomes */}
        <ul className="flex flex-col gap-2 mb-6 flex-1">
          {service.outcomes.map((o) => (
            <li key={o} className="flex items-start gap-2.5 text-[0.8125rem]" style={{ color: "rgba(148,163,184,0.7)" }}>
              <span className="flex-shrink-0 mt-0.5 font-bold text-[0.75rem]" style={{ color: service.accent, textShadow: `0 0 8px ${service.accent}80` }}>→</span>
              {o}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-auto pt-5 flex items-end justify-between" style={{ borderTop: `1px solid rgba(255,255,255,0.06)` }}>
          <div>
            <div
              className="font-display font-extrabold text-[1.25rem] tracking-[-0.04em] leading-none mb-1"
              style={{ color: service.accent, textShadow: `0 0 16px ${service.accent}60` }}
            >
              {service.price}
            </div>
            <div className="text-[0.75rem]" style={{ color: "rgba(100,116,139,0.8)" }}>{service.period}</div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-[0.8125rem] font-bold transition-colors"
            style={{ color: isFeatured ? service.accent : "rgba(148,163,184,0.6)" }}
          >
            {service.cta}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ── StatCard ─────────────────────────────────────────────────────────────────
function StatCard({ stat, delay = 0 }: { stat: (typeof STATS)[0]; delay?: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] }}
      className="group relative rounded-[20px] transition-all duration-300 p-6 flex flex-col justify-between overflow-hidden hover:-translate-y-1"
      style={{
        background: "linear-gradient(135deg, rgba(8,8,18,0.96) 0%, rgba(12,8,25,0.96) 100%)",
        border: `1px solid ${stat.accent}20`,
        boxShadow: `0 0 0 1px ${stat.accent}12, 0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[20px]"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${stat.accent}10 0%, transparent 70%)` }}
      />
      {/* Top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${stat.accent}80, transparent)` }}
      />
      <div
        className="relative z-10 text-[2.25rem] font-display font-extrabold tracking-[-0.05em] leading-none mb-2"
        style={{ color: stat.accent, textShadow: `0 0 20px ${stat.accent}60` }}
      >
        {stat.value}
      </div>
      <div className="relative z-10 text-[0.75rem] font-semibold uppercase tracking-[0.06em]" style={{ color: "rgba(148,163,184,0.6)" }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

// ── Haupt-Export ─────────────────────────────────────────────────────────────
export default function BentoServicesGrid() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section id="services" ref={ref} className="relative z-10 bg-bg-1 py-28 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(99,102,241,0.05) 0%, transparent 70%)" }}
      />

      <div className="max-w-[1100px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-14"
        >
          <div className="section-label justify-center mb-4">Beratungsangebote</div>
          <h2 className="display-md text-text-1 mb-4">
            Gezielte Maßnahmen.<br />
            <span className="text-gradient">Messbare Ergebnisse.</span>
          </h2>
          <p className="text-[1.0625rem] leading-relaxed text-text-2 max-w-[480px] mx-auto">
            Drei Engagement-Modelle. Festpreise. Senioren-Lieferung ab Tag eins — keine Junioren, keine Überraschungen.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 lg:grid-rows-[auto_auto] gap-4 mb-6">
          {SERVICES.map((s, i) => (
            <BentoCard key={s.name} service={s} delay={i * 0.1} />
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} delay={0.3 + i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}
