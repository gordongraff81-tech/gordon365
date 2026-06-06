"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

// ─────────────────────────────────────────────
// Scroll 1 — System Definition
// ─────────────────────────────────────────────
function SectionSystemDefinition() {
  const t = useTranslations("system");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
  });

  return (
    <section
      ref={ref}
      id="system-definition"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32 bg-bg-1 overflow-hidden"
      aria-labelledby="system-definition-h1"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(0,113,227,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 10%, transparent 80%)",
        }}
      />

      <div className="relative z-10 max-w-[800px] mx-auto text-center">
        <motion.div {...fadeUp(0)}>
          <span className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 text-[0.7rem] font-bold tracking-[0.1em] uppercase text-accent-2 mb-8">
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent-2 animate-pulse-dot"
              aria-hidden="true"
            />
            {t("def.eyebrow")}
          </span>
        </motion.div>

        <motion.h1
          id="system-definition-h1"
          {...fadeUp(0.1)}
          className="font-display font-extrabold leading-[1.04] tracking-[-0.04em] text-text-1 mb-6"
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
        >
          {t("def.h1a")}{" "}
          <span className="text-gradient">{t("def.h1b")}</span>
          <br />
          {t("def.h1c")}
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="text-[1.0625rem] leading-[1.85] text-text-2 max-w-[580px] mx-auto mb-12"
        >
          {t("def.sub")}
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="flex flex-wrap justify-center gap-3">
          <a href="#audit-cta" className="btn-primary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            {t("def.cta")}
          </a>
          <a href="#problem-reality" className="btn-outline">
            {t("def.ctaSecondary")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </motion.div>

        <motion.div
          {...fadeUp(0.45)}
          className="flex flex-wrap justify-center items-center gap-3 mt-16 pt-8 border-t border-border"
        >
          {["Microsoft Partner", "D/A/CH Region", "DSGVO Konform", "10+ Jahre M365"].map((chip) => (
            <span
              key={chip}
              className="text-[0.7rem] font-semibold text-text-2 bg-card border border-border rounded-full px-3 py-1"
            >
              {chip}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Scroll 2 — Problem Realität
// ─────────────────────────────────────────────
const PROBLEMS = [
  {
    key: "admin",
    color: "#FF3B30",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="22" height="22" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" />
        <path d="M17 13l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "mfa",
    color: "#FF9F0A",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="22" height="22" aria-hidden="true">
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 018 0v4" />
      </svg>
    ),
  },
  {
    key: "sharing",
    color: "#FF9F0A",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="22" height="22" aria-hidden="true">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    key: "devices",
    color: "#FF3B30",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="22" height="22" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12" y2="18" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "visibility",
    color: "#FF9F0A",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="22" height="22" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
        <line x1="3" y1="3" x2="21" y2="21" strokeLinecap="round" />
      </svg>
    ),
  },
];

function SectionProblemReality() {
  const t = useTranslations("system");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      id="problem-reality"
      className="relative py-32 px-6 bg-bg-1"
      aria-labelledby="problem-reality-h2"
    >
      <div className="max-w-[900px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <span className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-text-3 mb-4 block">
            {t("problem.label")}
          </span>
          <h2 id="problem-reality-h2" className="display-sm text-text-1 mb-4">
            {t("problem.h2")}
          </h2>
          <p className="text-[1.0625rem] text-text-2 max-w-[520px] mx-auto leading-relaxed">
            {t("problem.sub")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROBLEMS.map((p, i) => (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="bg-card border border-border rounded-2xl p-6 flex gap-4 items-start"
            >
              <div
                className="shrink-0 mt-0.5 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${p.color}14`, color: p.color }}
              >
                {p.icon}
              </div>
              <div>
                <div className="font-semibold text-text-1 text-[0.9375rem] mb-1">
                  {t(`problem.items.${p.key}.title`)}
                </div>
                <div className="text-[0.8125rem] text-text-2 leading-relaxed">
                  {t(`problem.items.${p.key}.desc`)}
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.45 }}
            className="md:col-span-2 lg:col-span-1 bg-accent/10 border border-accent/25 rounded-2xl p-6 flex flex-col justify-between"
          >
            <p className="text-[0.9375rem] font-semibold text-text-1 mb-4">
              {t("problem.ctaCard.text")}
            </p>
            <a href="#audit-cta" className="btn-primary self-start text-sm">
              {t("problem.ctaCard.btn")}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Scroll 3 — System Model
// ─────────────────────────────────────────────
const LAYERS = [
  {
    key: "identity",
    color: "#0071E3",
    number: "01",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.75" width="28" height="28" aria-hidden="true">
        <circle cx="16" cy="12" r="6" />
        <path d="M4 28c0-6.627 5.373-10 12-10s12 3.373 12 10" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "device",
    color: "#5E5CE6",
    number: "02",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.75" width="28" height="28" aria-hidden="true">
        <rect x="7" y="4" width="18" height="24" rx="3" />
        <circle cx="16" cy="24" r="1.25" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    key: "collaboration",
    color: "#34C759",
    number: "03",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.75" width="28" height="28" aria-hidden="true">
        <path d="M4 22V12l12-8 12 8v10H4z" />
        <rect x="11" y="18" width="10" height="8" />
      </svg>
    ),
  },
  {
    key: "security",
    color: "#FF3B30",
    number: "04",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.75" width="28" height="28" aria-hidden="true">
        <path d="M16 4L4 8v10c0 8 6.667 13.333 12 14 5.333-.667 12-6 12-14V8L16 4z" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function SectionSystemModel() {
  const t = useTranslations("system");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      id="system-model"
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "var(--color-bg-2, #F5F5F7)" }}
      aria-labelledby="system-model-h2"
    >
      <div className="max-w-[960px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <span className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-text-3 mb-4 block">
            {t("model.label")}
          </span>
          <h2 id="system-model-h2" className="display-sm text-text-1 mb-4">
            {t("model.h2")}
          </h2>
          <p className="text-[1.0625rem] text-text-2 max-w-[500px] mx-auto leading-relaxed">
            {t("model.sub")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.key}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${layer.color}14`, color: layer.color }}
                >
                  {layer.icon}
                </div>
                <span
                  className="text-[0.65rem] font-bold tracking-[0.15em] opacity-40"
                  style={{ color: layer.color }}
                >
                  {layer.number}
                </span>
              </div>
              <div>
                <div className="font-bold text-text-1 text-[1.0625rem] mb-1 tracking-[-0.02em]">
                  {t(`model.layers.${layer.key}.title`)}
                </div>
                <div className="text-[0.8125rem] text-text-2 leading-relaxed">
                  {t(`model.layers.${layer.key}.sub`)}
                </div>
              </div>
              <ul className="flex flex-col gap-1.5 mt-auto" role="list">
                {(t.raw(`model.layers.${layer.key}.features`) as string[]).map((f: string) => (
                  <li key={f} className="text-[0.75rem] text-text-2 flex items-center gap-1.5">
                    <span
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ background: layer.color }}
                      aria-hidden="true"
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Scroll 4 — Module Intro
// ─────────────────────────────────────────────
const MODULES = [
  {
    key: "audit",
    slug: "security-audit-microsoft-365",
    color: "#0071E3",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.75" width="24" height="24" aria-hidden="true">
        <path d="M14 3L3 7v8c0 6.5 5 10.5 11 11 6-.5 11-4.5 11-11V7L14 3z" strokeLinejoin="round" />
        <path d="M9 14l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "entra",
    slug: "entra-id",
    color: "#5E5CE6",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.75" width="24" height="24" aria-hidden="true">
        <circle cx="14" cy="10" r="5" />
        <path d="M3 25c0-5.523 4.925-9 11-9s11 3.477 11 9" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "intune",
    slug: "intune",
    color: "#34C759",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.75" width="24" height="24" aria-hidden="true">
        <rect x="7" y="3" width="14" height="22" rx="2.5" />
        <circle cx="14" cy="22" r="1.25" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    key: "copilot",
    slug: "copilot",
    color: "#FF9F0A",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.75" width="24" height="24" aria-hidden="true">
        <path d="M14 3l2.5 7.5H24l-6.5 4.5 2.5 7.5L14 18l-6 4.5 2.5-7.5L4 10.5h7.5L14 3z" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function SectionModuleIntro() {
  const t = useTranslations("system");
  const params = useParams();
  const locale = (params?.locale as string) || "de";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      id="modules"
      className="relative py-32 px-6 bg-bg-1"
      aria-labelledby="modules-h2"
    >
      <div className="max-w-[960px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <span className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-text-3 mb-4 block">
            {t("modules.label")}
          </span>
          <h2 id="modules-h2" className="display-sm text-text-1 mb-4">
            {t("modules.h2")}
          </h2>
          <p className="text-[1.0625rem] text-text-2 max-w-[520px] mx-auto leading-relaxed">
            {t("modules.sub")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {MODULES.map((mod, i) => (
            <motion.div
              key={mod.key}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              <Link
                href={`/${locale}/${mod.slug}`}
                className="group block bg-card border border-border rounded-2xl p-7 hover:border-accent/40 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-5 mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300"
                    style={{ background: `${mod.color}14`, color: mod.color }}
                  >
                    {mod.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-text-1 text-[1.0625rem] mb-1 tracking-[-0.02em]">
                      {t(`modules.items.${mod.key}.title`)}
                    </div>
                    <div className="text-[0.8125rem] text-text-2 leading-relaxed">
                      {t(`modules.items.${mod.key}.sub`)}
                    </div>
                  </div>
                  <svg
                    className="text-text-3 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 shrink-0 mt-1"
                    width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <ul className="flex flex-wrap gap-2" role="list">
                  {(t.raw(`modules.items.${mod.key}.tags`) as string[]).map((tag: string) => (
                    <li
                      key={tag}
                      className="text-[0.7rem] font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: `${mod.color}12`, color: mod.color }}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Scroll 5 — Final Entry CTA
// ─────────────────────────────────────────────
function SectionEntryCTA() {
  const t = useTranslations("system");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      id="audit-cta"
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "var(--color-bg-2, #F5F5F7)" }}
      aria-labelledby="audit-cta-h2"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse, rgba(0,113,227,0.12), transparent)" }}
      />
      <div className="relative z-10 max-w-[680px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 text-[0.7rem] font-bold tracking-[0.1em] uppercase text-accent-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
            {t("cta.eyebrow")}
          </span>
          <h2
            id="audit-cta-h2"
            className="display-md text-text-1 mb-5 tracking-[-0.04em]"
          >
            {t("cta.h2")}
          </h2>
          <p className="text-[1.0625rem] text-text-2 leading-relaxed mb-10 max-w-[520px] mx-auto">
            {t("cta.sub")}
          </p>

          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10" role="list">
            {(t.raw("cta.props") as string[]).map((prop: string) => (
              <li key={prop} className="flex items-center gap-2 text-[0.8125rem] text-text-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {prop}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap justify-center gap-3">
            <a href="#contact" className="btn-primary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {t("cta.btnPrimary")}
            </a>
            <a href="#modules" className="btn-outline">
              {t("cta.btnSecondary")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────
export default function M365SecuritySystem() {
  return (
    <>
      <SectionSystemDefinition />
      <SectionProblemReality />
      <SectionSystemModel />
      <SectionModuleIntro />
      <SectionEntryCTA />
    </>
  );
}
