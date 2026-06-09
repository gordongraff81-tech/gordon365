"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

const fadeUp = (inView: boolean, delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: inView ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.8, delay, ease: [0.25, 0, 0, 1] },
});

// ─────────────────────────────────────────────
// Scroll 1 — Positioning
// ─────────────────────────────────────────────
function SectionPositioning() {
  const t = useTranslations("copilot");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      id="copilot-positioning"
      style={{ background: "#FFFFFF", paddingTop: "140px", paddingBottom: "140px" }}
      className="px-6"
      aria-labelledby="copilot-h1"
    >
      <div className="max-w-[860px] mx-auto">
        <motion.p {...fadeUp(inView, 0)} style={{
          fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: "#0071E3", marginBottom: "2rem",
        }}>
          {t("positioning.eyebrow")}
        </motion.p>

        <motion.h1
          id="copilot-h1"
          {...fadeUp(inView, 0.08)}
          style={{
            fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 800, lineHeight: 1.02,
            letterSpacing: "-0.04em", color: "#1D1D1F", marginBottom: "2rem",
            fontFamily: "var(--font-plus-jakarta)",
          }}
        >
          {t("positioning.h1a")}{" "}
          <span style={{
            background: "linear-gradient(135deg, #0071E3 0%, #34AADC 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            {t("positioning.h1b")}
          </span>
        </motion.h1>

        <motion.p {...fadeUp(inView, 0.16)} style={{
          fontSize: "clamp(1.125rem, 2vw, 1.375rem)", lineHeight: 1.7,
          color: "#6E6E73", maxWidth: "620px", marginBottom: "3rem",
        }}>
          {t("positioning.sub")}
        </motion.p>

        <motion.div {...fadeUp(inView, 0.24)} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href="#copilot-cta" style={{
            background: "#0071E3", color: "#fff", padding: "1rem 2rem",
            borderRadius: "980px", fontWeight: 600, fontSize: "1rem",
            textDecoration: "none", display: "inline-block",
          }}>
            {t("positioning.cta")}
          </a>
          <a href="#copilot-readiness" style={{
            color: "#0071E3", padding: "1rem 2rem", borderRadius: "980px",
            fontWeight: 600, fontSize: "1rem", textDecoration: "none",
            border: "1.5px solid #0071E3", display: "inline-block",
          }}>
            {t("positioning.ctaSecondary")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Scroll 2 — Readiness Risks
// ─────────────────────────────────────────────
const RISK_ITEMS = [
  { key: "permissions", severity: "KRITISCH" },
  { key: "labels",      severity: "KRITISCH" },
  { key: "governance",  severity: "HOCH" },
  { key: "dlp",         severity: "HOCH" },
  { key: "identity",    severity: "KRITISCH" },
];

function SectionReadinessRisks() {
  const t = useTranslations("copilot");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="copilot-readiness"
      style={{ background: "#1D1D1F", paddingTop: "140px", paddingBottom: "140px" }}
      className="px-6"
      aria-labelledby="copilot-risks-h2"
    >
      <div className="max-w-[960px] mx-auto">
        <motion.div {...fadeUp(inView, 0)} style={{ marginBottom: "80px" }}>
          <p style={{
            fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "#0071E3", marginBottom: "1.5rem",
          }}>
            {t("risks.label")}
          </p>
          <h2 id="copilot-risks-h2" style={{
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, lineHeight: 1.04,
            letterSpacing: "-0.04em", color: "#F5F5F7", marginBottom: "1.5rem",
            fontFamily: "var(--font-plus-jakarta)",
          }}>
            {t("risks.h2")}
          </h2>
          <p style={{ fontSize: "clamp(1.125rem, 2vw, 1.25rem)", color: "#86868B", lineHeight: 1.7, maxWidth: "560px" }}>
            {t("risks.sub")}
          </p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#2D2D2F", borderRadius: "18px", overflow: "hidden" }}>
          {RISK_ITEMS.map((item, i) => (
            <motion.div key={item.key} {...fadeUp(inView, i * 0.07)} style={{
              display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center",
              gap: "2rem", padding: "2rem 2.5rem", background: "#1D1D1F",
              borderBottom: i < RISK_ITEMS.length - 1 ? "1px solid #2D2D2F" : "none",
            }}>
              <div>
                <p style={{ fontSize: "clamp(1.125rem, 2vw, 1.25rem)", fontWeight: 600, color: "#F5F5F7", marginBottom: "0.4rem", letterSpacing: "-0.02em" }}>
                  {t(`risks.items.${item.key}.title`)}
                </p>
                <p style={{ fontSize: "0.9375rem", color: "#86868B", lineHeight: 1.6 }}>
                  {t(`risks.items.${item.key}.desc`)}
                </p>
              </div>
              <span style={{
                fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: item.severity === "KRITISCH" ? "#FF453A" : "#FF9F0A",
                background: item.severity === "KRITISCH" ? "rgba(255,69,58,0.12)" : "rgba(255,159,10,0.12)",
                padding: "0.35rem 0.75rem", borderRadius: "4px", whiteSpace: "nowrap",
              }}>
                {item.severity}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Scroll 3 — What We Do
// ─────────────────────────────────────────────
const SPRINT_AREAS = [
  { key: "data",       number: "01", color: "#0071E3", bg: "#F0F7FF" },
  { key: "labels",     number: "02", color: "#5E5CE6", bg: "#F2F2FF" },
  { key: "governance", number: "03", color: "#1D1D1F", bg: "#F5F5F7" },
  { key: "adoption",   number: "04", color: "#30D158", bg: "#F0FFF4" },
];

function SectionSprint() {
  const t = useTranslations("copilot");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="copilot-sprint"
      style={{ background: "#FFFFFF", paddingTop: "140px", paddingBottom: "140px" }}
      className="px-6"
      aria-labelledby="copilot-sprint-h2"
    >
      <div className="max-w-[960px] mx-auto">
        <motion.div {...fadeUp(inView, 0)} style={{ marginBottom: "80px" }}>
          <p style={{
            fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "#0071E3", marginBottom: "1.5rem",
          }}>
            {t("sprint.label")}
          </p>
          <h2 id="copilot-sprint-h2" style={{
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, lineHeight: 1.04,
            letterSpacing: "-0.04em", color: "#1D1D1F", marginBottom: "1.5rem",
            fontFamily: "var(--font-plus-jakarta)",
          }}>
            {t("sprint.h2")}
          </h2>
          <p style={{ fontSize: "clamp(1.125rem, 2vw, 1.25rem)", color: "#6E6E73", lineHeight: 1.7, maxWidth: "560px" }}>
            {t("sprint.sub")}
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "1.25rem" }}>
          {SPRINT_AREAS.map((area, i) => (
            <motion.div key={area.key} {...fadeUp(inView, i * 0.1)} style={{
              background: area.bg, borderRadius: "20px", padding: "2.5rem 2rem",
              display: "flex", flexDirection: "column", gap: "1.5rem",
            }}>
              <span style={{
                fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.04em",
                color: area.color, lineHeight: 1, fontFamily: "var(--font-plus-jakarta)",
              }}>
                {area.number}
              </span>
              <div>
                <p style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1D1D1F", letterSpacing: "-0.02em", marginBottom: "0.5rem", lineHeight: 1.2 }}>
                  {t(`sprint.areas.${area.key}.title`)}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#6E6E73", lineHeight: 1.6 }}>
                  {t(`sprint.areas.${area.key}.sub`)}
                </p>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {(t.raw(`sprint.areas.${area.key}.checks`) as string[]).map((c: string) => (
                  <li key={c} style={{ fontSize: "0.8125rem", color: "#1D1D1F", fontWeight: 500 }}>{c}</li>
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
// Scroll 4 — Process
// ─────────────────────────────────────────────
const STEPS = ["assess", "clean", "configure", "pilot"];

function SectionProcess() {
  const t = useTranslations("copilot");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="copilot-process"
      style={{ background: "#1D1D1F", paddingTop: "140px", paddingBottom: "140px" }}
      className="px-6"
      aria-labelledby="copilot-process-h2"
    >
      <div className="max-w-[960px] mx-auto">
        <motion.div {...fadeUp(inView, 0)} style={{ marginBottom: "80px" }}>
          <p style={{
            fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "#0071E3", marginBottom: "1.5rem",
          }}>
            {t("process.label")}
          </p>
          <h2 id="copilot-process-h2" style={{
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, lineHeight: 1.04,
            letterSpacing: "-0.04em", color: "#F5F5F7", marginBottom: "1.5rem",
            fontFamily: "var(--font-plus-jakarta)",
          }}>
            {t("process.h2")}
          </h2>
          <p style={{ fontSize: "clamp(1.125rem, 2vw, 1.25rem)", color: "#86868B", lineHeight: 1.7, maxWidth: "520px" }}>
            {t("process.sub")}
          </p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#2D2D2F", borderRadius: "18px", overflow: "hidden" }}>
          {STEPS.map((step, i) => (
            <motion.div key={step} {...fadeUp(inView, i * 0.12)} style={{
              display: "grid", gridTemplateColumns: "80px 1fr", gap: "2rem",
              padding: "2.5rem", background: "#1D1D1F",
              borderBottom: i < STEPS.length - 1 ? "1px solid #2D2D2F" : "none",
              alignItems: "start",
            }}>
              <span style={{
                fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.04em",
                color: "#0071E3", lineHeight: 1, fontFamily: "var(--font-plus-jakarta)",
              }}>
                0{i + 1}
              </span>
              <div>
                <p style={{ fontSize: "clamp(1.125rem, 2vw, 1.375rem)", fontWeight: 700, color: "#F5F5F7", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
                  {t(`process.steps.${step}.title`)}
                </p>
                <p style={{ fontSize: "0.9375rem", color: "#86868B", lineHeight: 1.65 }}>
                  {t(`process.steps.${step}.desc`)}
                </p>
                <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#3D3D3F", marginTop: "0.75rem", letterSpacing: "0.02em" }}>
                  {t(`process.steps.${step}.duration`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Scroll 5 — Outcomes
// ─────────────────────────────────────────────
const OUTCOMES = ["foundation", "compliance", "roi"];

function SectionOutcomes() {
  const t = useTranslations("copilot");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="copilot-outcomes"
      style={{ background: "#FFFFFF", paddingTop: "140px", paddingBottom: "140px" }}
      className="px-6"
      aria-labelledby="copilot-outcomes-h2"
    >
      <div className="max-w-[960px] mx-auto">
        <motion.div {...fadeUp(inView, 0)} style={{ marginBottom: "80px" }}>
          <p style={{
            fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "#0071E3", marginBottom: "1.5rem",
          }}>
            {t("outcomes.label")}
          </p>
          <h2 id="copilot-outcomes-h2" style={{
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, lineHeight: 1.04,
            letterSpacing: "-0.04em", color: "#1D1D1F", marginBottom: "1.5rem",
            fontFamily: "var(--font-plus-jakarta)",
          }}>
            {t("outcomes.h2")}
          </h2>
          <p style={{ fontSize: "clamp(1.125rem, 2vw, 1.25rem)", color: "#6E6E73", lineHeight: 1.7, maxWidth: "520px" }}>
            {t("outcomes.sub")}
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {OUTCOMES.map((key, i) => (
            <motion.div key={key} {...fadeUp(inView, i * 0.1)} style={{
              background: i === 0 ? "#0071E3" : "#F5F5F7",
              borderRadius: "20px", padding: "2.5rem 2rem",
            }}>
              <span style={{
                fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.04em",
                color: i === 0 ? "rgba(255,255,255,0.4)" : "#0071E3",
                lineHeight: 1, display: "block", marginBottom: "1.5rem",
                fontFamily: "var(--font-plus-jakarta)",
              }}>
                0{i + 1}
              </span>
              <p style={{ fontSize: "1.375rem", fontWeight: 700, color: i === 0 ? "#FFFFFF" : "#1D1D1F", letterSpacing: "-0.02em", marginBottom: "0.75rem", lineHeight: 1.2 }}>
                {t(`outcomes.items.${key}.title`)}
              </p>
              <p style={{ fontSize: "0.9375rem", color: i === 0 ? "rgba(255,255,255,0.75)" : "#6E6E73", lineHeight: 1.65 }}>
                {t(`outcomes.items.${key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Scroll 6 — Final CTA
// ─────────────────────────────────────────────
function SectionFinalCTA() {
  const t = useTranslations("copilot");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      id="copilot-cta"
      style={{ background: "#1D1D1F", paddingTop: "140px", paddingBottom: "160px" }}
      className="px-6"
      aria-labelledby="copilot-cta-h2"
    >
      <div className="max-w-[780px] mx-auto text-center">
        <motion.div {...fadeUp(inView, 0)}>
          <p style={{
            fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "#0071E3", marginBottom: "1.5rem",
          }}>
            {t("finalcta.eyebrow")}
          </p>
          <h2 id="copilot-cta-h2" style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 800, lineHeight: 1.04,
            letterSpacing: "-0.04em", color: "#F5F5F7", marginBottom: "1.5rem",
            fontFamily: "var(--font-plus-jakarta)",
          }}>
            {t("finalcta.h2")}
          </h2>
          <p style={{
            fontSize: "clamp(1.125rem, 2vw, 1.375rem)", color: "#86868B", lineHeight: 1.7,
            maxWidth: "560px", margin: "0 auto 3rem",
          }}>
            {t("finalcta.sub")}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem", marginBottom: "3rem" }}>
            {(t.raw("finalcta.props") as string[]).map((prop: string) => (
              <span key={prop} style={{ fontSize: "0.9375rem", color: "#86868B", fontWeight: 500 }}>{prop}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#contact" style={{
              background: "#0071E3", color: "#fff", padding: "1rem 2.25rem",
              borderRadius: "980px", fontWeight: 600, fontSize: "1rem",
              textDecoration: "none", display: "inline-block",
            }}>
              {t("finalcta.btn")}
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
export default function Copilot() {
  return (
    <>
      <SectionPositioning />
      <SectionReadinessRisks />
      <SectionSprint />
      <SectionProcess />
      <SectionOutcomes />
      <SectionFinalCTA />
    </>
  );
}
