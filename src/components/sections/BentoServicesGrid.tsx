"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Daten (aus bestehenden DE-Texten übernommen, kein Wort geändert) ────────
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
    size: "tall", // nimmt 2 Zeilen ein
    accent: "#2563FF",
    glow: "rgba(37,99,255,0.2)",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="28" height="28">
        <circle cx="20" cy="20" r="14" stroke="#2563FF" strokeWidth="2" />
        <path d="M14 22l4 4 8-10" stroke="#2563FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
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
    size: "featured", // Highlight-Card
    accent: "#18D5FF",
    glow: "rgba(24,213,255,0.2)",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="28" height="28">
        <path d="M20 8C13.373 8 8 13.373 8 20s5.373 12 12 12 12-5.373 12-12S26.627 8 20 8Z" stroke="#18D5FF" strokeWidth="2" />
        <path d="M16 20h8M20 16v8" stroke="#18D5FF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
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
    accent: "#C8A96B",
    glow: "rgba(200,169,107,0.2)",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="28" height="28">
        <rect x="8" y="10" width="24" height="20" rx="3" stroke="#C8A96B" strokeWidth="2" />
        <path d="M14 20h12M14 25h8" stroke="#C8A96B" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

// Stat-Kacheln (für das Bento-Grid)
const STATS = [
  { value: "120+", label: "Gesicherte Umgebungen", accent: "#2563FF" },
  { value: "€850K+", label: "Lizenz-Einsparungen", accent: "#10D97C" },
  { value: "98%", label: "Kundenbindungsrate", accent: "#18D5FF" },
  { value: "12 J.", label: "M365-Spezialisierung", accent: "#C8A96B" },
];

// ── Einzelne Bento-Kachel ────────────────────────────────────────────────────
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "group relative rounded-[28px] border overflow-hidden transition-all duration-500",
        "hover:-translate-y-1.5",
        isTall ? "lg:row-span-2" : "",
        isFeatured
          ? "bg-gradient-to-br from-accent/12 via-bg-2 to-accent-2/8 border-accent/30"
          : "bg-card border-border hover:bg-card-hover hover:border-border-strong"
      )}
      style={{
        boxShadow: isFeatured
          ? `0 0 60px ${service.glow}, 0 24px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)`
          : "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Gradient-Border (animierter Top-Stroke) */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-px transition-opacity duration-500",
          isFeatured ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
        style={{
          background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`,
        }}
      />

      {/* Glasmorphismus-Innenreflex */}
      <div
        className="absolute inset-0 rounded-[28px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${service.accent}0A 0%, transparent 70%)`,
        }}
      />

      <div className={cn("flex flex-col h-full", isTall ? "p-8" : "p-7")}>
        {/* Tag */}
        <div className="flex items-start justify-between mb-6">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: `${service.accent}15`,
              border: `1px solid ${service.accent}25`,
            }}
          >
            {service.icon}
          </div>
          <span
            className={cn(
              "text-[0.625rem] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded",
              isFeatured ? "border" : "text-text-3"
            )}
            style={
              isFeatured
                ? {
                    color: service.accent,
                    background: `${service.accent}15`,
                    borderColor: `${service.accent}35`,
                  }
                : {}
            }
          >
            {service.tag}
          </span>
        </div>

        {/* Heading */}
        <h3
          className={cn(
            "font-display font-extrabold text-white tracking-[-0.04em] leading-snug mb-3",
            isTall || isFeatured ? "text-[1.5rem]" : "text-[1.25rem]"
          )}
        >
          {service.name}
        </h3>
        <p className="text-[0.875rem] text-text-2 leading-relaxed mb-5">{service.desc}</p>

        {/* Outcomes */}
        <ul className="flex flex-col gap-2 mb-6 flex-1">
          {service.outcomes.map((o) => (
            <li key={o} className="flex items-start gap-2.5 text-[0.8125rem] text-text-2">
              <span
                className="flex-shrink-0 mt-0.5 font-bold text-[0.75rem]"
                style={{ color: service.accent }}
              >
                →
              </span>
              {o}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-auto pt-5 border-t border-border flex items-end justify-between">
          <div>
            <div
              className="font-display font-extrabold text-[1.25rem] tracking-[-0.04em] leading-none mb-1"
              style={{ color: service.accent }}
            >
              {service.price}
            </div>
            <div className="text-[0.75rem] text-text-3">{service.period}</div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-[0.8125rem] font-bold transition-colors hover:text-white"
            style={{ color: isFeatured ? service.accent : "#94A3B8" }}
          >
            {service.cta}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ── Stat-Kachel ─────────────────────────────────────────────────────────────
function StatCard({ stat, delay = 0 }: { stat: (typeof STATS)[0]; delay?: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] }}
      className="group relative rounded-[20px] border border-border bg-card hover:bg-card-hover hover:border-border-strong transition-all duration-300 p-6 flex flex-col justify-between overflow-hidden hover:-translate-y-1"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[20px]"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${stat.accent}0C 0%, transparent 70%)`,
        }}
      />
      <div
        className="text-[2.25rem] font-display font-extrabold tracking-[-0.05em] leading-none mb-2"
        style={{ color: stat.accent }}
      >
        {stat.value}
      </div>
      <div className="text-[0.75rem] font-semibold text-text-2 leading-snug uppercase tracking-[0.06em]">
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
      {/* Hintergrundglow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(37,99,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-14"
        >
          <div className="section-label justify-center mb-4">Beratungsangebote</div>
          <h2 className="display-md text-white mb-4">
            Gezielte Maßnahmen.<br />
            <span className="text-gradient">Messbare Ergebnisse.</span>
          </h2>
          <p className="text-[1.0625rem] leading-relaxed text-text-2 max-w-[480px] mx-auto">
            Drei Engagement-Modelle. Festpreise. Senioren-Lieferung ab Tag eins — keine Junioren, keine Überraschungen.
          </p>
        </motion.div>

        {/* Bento-Grid */}
        <div className="grid lg:grid-cols-3 lg:grid-rows-[auto_auto] gap-4 mb-6">
          {SERVICES.map((s, i) => (
            <BentoCard key={s.name} service={s} delay={i * 0.1} />
          ))}
        </div>

        {/* Stats-Reihe */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} delay={0.3 + i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}
