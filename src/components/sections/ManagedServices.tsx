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
  const t = useTranslations("managedServices");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      id="ms-positioning"
      style={{ background: "#FFFFFF", paddingTop: "140px", paddingBottom: "140px" }}
      className="px-6"
      aria-labelledby="ms-h1"
    >
      <div className="max-w-[860px] mx-auto">
        <motion.p {...fadeUp(inView, 0)} style={{
          fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: "#0071E3", marginBottom: "2rem",
        }}>
          {t("positioning.eyebrow")}
        </motion.p>

        <motion.h1
          id="ms-h1"
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
          <a href="#ms-packages" style={{
            background: "#0071E3", color: "#fff", padding: "1rem 2rem",
            borderRadius: "980px", fontWeight: 600, fontSize: "1rem",
            textDecoration: "none", display: "inline-block",
          }}>
            {t("positioning.cta")}
          </a>
          <a href="#ms-services" style={{
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
// Scroll 2 — Included Services
// ─────────────────────────────────────────────
const SERVICE_AREAS = [
  { key: "identity",   number: "01", color: "#0071E3", bg: "#F0F7FF" },
  { key: "security",   number: "02", color: "#FF3B30", bg: "#FFF2F1" },
  { key: "devices",    number: "03", color: "#5E5CE6", bg: "#F2F2FF" },
  { key: "governance", number: "04", color: "#1D1D1F", bg: "#F5F5F7" },
];

function SectionServices() {
  const t = useTranslations("managedServices");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="ms-services"
      style={{ background: "#1D1D1F", paddingTop: "140px", paddingBottom: "140px" }}
      className="px-6"
      aria-labelledby="ms-services-h2"
    >
      <div className="max-w-[960px] mx-auto">
        <motion.div {...fadeUp(inView, 0)} style={{ marginBottom: "80px" }}>
          <p style={{
            fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "#0071E3", marginBottom: "1.5rem",
          }}>
            {t("services.label")}
          </p>
          <h2 id="ms-services-h2" style={{
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, lineHeight: 1.04,
            letterSpacing: "-0.04em", color: "#F5F5F7", marginBottom: "1.5rem",
            fontFamily: "var(--font-plus-jakarta)",
          }}>
            {t("services.h2")}
          </h2>
          <p style={{ fontSize: "clamp(1.125rem, 2vw, 1.25rem)", color: "#86868B", lineHeight: 1.7, maxWidth: "560px" }}>
            {t("services.sub")}
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "1.25rem" }}>
          {SERVICE_AREAS.map((area, i) => (
            <motion.div key={area.key} {...fadeUp(inView, i * 0.1)} style={{
              background: "#1D1D1F", borderRadius: "20px", padding: "2.5rem 2rem",
              display: "flex", flexDirection: "column", gap: "1.5rem",
              border: "1px solid #2D2D2F",
            }}>
              <span style={{
                fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.04em",
                color: area.color, lineHeight: 1, fontFamily: "var(--font-plus-jakarta)",
              }}>
                {area.number}
              </span>
              <div>
                <p style={{ fontSize: "1.25rem", fontWeight: 700, color: "#F5F5F7", letterSpacing: "-0.02em", marginBottom: "0.5rem", lineHeight: 1.2 }}>
                  {t(`services.areas.${area.key}.title`)}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#86868B", lineHeight: 1.6 }}>
                  {t(`services.areas.${area.key}.sub`)}
                </p>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {(t.raw(`services.areas.${area.key}.checks`) as string[]).map((c: string) => (
                  <li key={c} style={{ fontSize: "0.8125rem", color: "#86868B", fontWeight: 500 }}>{c}</li>
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
// Scroll 3 — Packages
// ─────────────────────────────────────────────
const PACKAGES = ["starter", "business", "premium"];

function SectionPackages() {
  const t = useTranslations("managedServices");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="ms-packages"
      style={{ background: "#FFFFFF", paddingTop: "140px", paddingBottom: "140px" }}
      className="px-6"
      aria-labelledby="ms-packages-h2"
    >
      <div className="max-w-[960px] mx-auto">
        <motion.div {...fadeUp(inView, 0)} style={{ marginBottom: "80px" }}>
          <p style={{
            fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "#0071E3", marginBottom: "1.5rem",
          }}>
            {t("packages.label")}
          </p>
          <h2 id="ms-packages-h2" style={{
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, lineHeight: 1.04,
            letterSpacing: "-0.04em", color: "#1D1D1F", marginBottom: "1.5rem",
            fontFamily: "var(--font-plus-jakarta)",
          }}>
            {t("packages.h2")}
          </h2>
          <p style={{ fontSize: "clamp(1.125rem, 2vw, 1.25rem)", color: "#6E6E73", lineHeight: 1.7, maxWidth: "520px" }}>
            {t("packages.sub")}
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {PACKAGES.map((key, i) => (
            <motion.div key={key} {...fadeUp(inView, i * 0.1)} style={{
              background: i === 1 ? "#0071E3" : "#F5F5F7",
              borderRadius: "20px", padding: "2.5rem 2rem",
              position: "relative",
            }}>
              {i === 1 && (
                <span style={{
                  position: "absolute", top: "1.5rem", right: "1.5rem",
                  fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "#0071E3",
                  background: "#FFFFFF", padding: "0.3rem 0.65rem", borderRadius: "4px",
                }}>
                  {t("packages.popular")}
                </span>
              )}
              <p style={{
                fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em",
                color: i === 1 ? "#FFFFFF" : "#1D1D1F", marginBottom: "0.5rem",
                fontFamily: "var(--font-plus-jakarta)",
              }}>
                {t(`packages.items.${key}.name`)}
              </p>
              <p style={{
                fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.04em",
                color: i === 1 ? "#FFFFFF" : "#0071E3", marginBottom: "0.25rem",
                fontFamily: "var(--font-plus-jakarta)", lineHeight: 1,
              }}>
                {t(`packages.items.${key}.price`)}
              </p>
              <p style={{ fontSize: "0.875rem", color: i === 1 ? "rgba(255,255,255,0.6)" : "#6E6E73", marginBottom: "1.5rem" }}>
                {t(`packages.items.${key}.period`)}
              </p>
              <p style={{ fontSize: "0.9375rem", color: i === 1 ? "rgba(255,255,255,0.8)" : "#6E6E73", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                {t(`packages.items.${key}.desc`)}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {(t.raw(`packages.items.${key}.features`) as string[]).map((f: string) => (
                  <li key={f} style={{ fontSize: "0.875rem", color: i === 1 ? "rgba(255,255,255,0.85)" : "#1D1D1F", fontWeight: 500 }}>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" style={{
                display: "inline-block", padding: "0.875rem 1.75rem",
                borderRadius: "980px", fontWeight: 600, fontSize: "0.9375rem",
                textDecoration: "none",
                background: i === 1 ? "#FFFFFF" : "#0071E3",
                color: i === 1 ? "#0071E3" : "#FFFFFF",
              }}>
                {t("packages.cta")}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Scroll 4 — Final CTA
// ─────────────────────────────────────────────
function SectionFinalCTA() {
  const t = useTranslations("managedServices");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      id="ms-cta"
      style={{ background: "#1D1D1F", paddingTop: "140px", paddingBottom: "160px" }}
      className="px-6"
      aria-labelledby="ms-cta-h2"
    >
      <div className="max-w-[780px] mx-auto text-center">
        <motion.div {...fadeUp(inView, 0)}>
          <p style={{
            fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "#0071E3", marginBottom: "1.5rem",
          }}>
            {t("finalcta.eyebrow")}
          </p>
          <h2 id="ms-cta-h2" style={{
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
export default function ManagedServices() {
  return (
    <>
      <SectionPositioning />
      <SectionServices />
      <SectionPackages />
      <SectionFinalCTA />
    </>
  );
}
