"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

const fadeUp = (inView: boolean, delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: inView ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.8, delay, ease: [0.25, 0, 0, 1] },
});

// ─────────────────────────────────────────────
// Scroll 1 — System Definition
// HINTERGRUND: Weiß
// ─────────────────────────────────────────────
function SectionSystemDefinition() {
  const t = useTranslations("system");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      id="system-definition"
      style={{ background: "#FFFFFF", paddingTop: "140px", paddingBottom: "140px" }}
      className="px-6"
      aria-labelledby="system-definition-h1"
    >
      <div className="max-w-[860px] mx-auto text-center">
        <motion.p
          {...fadeUp(inView, 0)}
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#0071E3",
            marginBottom: "2rem",
          }}
        >
          {t("def.eyebrow")}
        </motion.p>

        <motion.h1
          id="system-definition-h1"
          {...fadeUp(inView, 0.08)}
          style={{
            fontSize: "clamp(3rem, 7vw, 6rem)",
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
            color: "#1D1D1F",
            marginBottom: "2rem",
            fontFamily: "var(--font-plus-jakarta)",
          }}
        >
          {t("def.h1a")}{" "}
          <span style={{
            background: "linear-gradient(135deg, #0071E3 0%, #34AADC 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            {t("def.h1b")}
          </span>
          <br />
          {t("def.h1c")}
        </motion.h1>

        <motion.p
          {...fadeUp(inView, 0.16)}
          style={{
            fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
            lineHeight: 1.7,
            color: "#6E6E73",
            maxWidth: "600px",
            margin: "0 auto 3rem",
            fontWeight: 400,
          }}
        >
          {t("def.sub")}
        </motion.p>

        <motion.div
          {...fadeUp(inView, 0.24)}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <a
            href="#audit-cta"
            style={{
              background: "#0071E3",
              color: "#fff",
              padding: "1rem 2rem",
              borderRadius: "980px",
              fontWeight: 600,
              fontSize: "1rem",
              textDecoration: "none",
              transition: "background 0.2s",
              display: "inline-block",
            }}
            onMouseOver={e => (e.currentTarget.style.background = "#0077ED")}
            onMouseOut={e => (e.currentTarget.style.background = "#0071E3")}
          >
            {t("def.cta")}
          </a>
          <a
            href="#problem-reality"
            style={{
              color: "#0071E3",
              padding: "1rem 2rem",
              borderRadius: "980px",
              fontWeight: 600,
              fontSize: "1rem",
              textDecoration: "none",
              border: "1.5px solid #0071E3",
              display: "inline-block",
              transition: "background 0.2s",
            }}
          >
            {t("def.ctaSecondary")}
          </a>
        </motion.div>

        <motion.div
          {...fadeUp(inView, 0.36)}
          style={{
            display: "flex",
            gap: "2.5rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "5rem",
            paddingTop: "3rem",
            borderTop: "1px solid #E5E5EA",
          }}
        >
          {["Microsoft Partner", "D/A/CH Region", "DSGVO Konform", "10+ Jahre M365"].map((chip) => (
            <span
              key={chip}
              style={{
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "#6E6E73",
                letterSpacing: "0.01em",
              }}
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
// HINTERGRUND: Schwarz
// ─────────────────────────────────────────────
const PROBLEMS = [
  { key: "admin",      severity: "KRITISCH" },
  { key: "mfa",       severity: "KRITISCH" },
  { key: "sharing",   severity: "HOCH" },
  { key: "devices",   severity: "HOCH" },
  { key: "visibility",severity: "KRITISCH" },
];

function SectionProblemReality() {
  const t = useTranslations("system");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="problem-reality"
      style={{ background: "#000000", paddingTop: "140px", paddingBottom: "140px" }}
      className="px-6"
      aria-labelledby="problem-reality-h2"
    >
      <div className="max-w-[960px] mx-auto">
        <motion.div {...fadeUp(inView, 0)} style={{ marginBottom: "80px" }}>
          <p style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#0071E3",
            marginBottom: "1.5rem",
          }}>
            {t("problem.label")}
          </p>
          <h2
            id="problem-reality-h2"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
              color: "#FFFFFF",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-plus-jakarta)",
            }}
          >
            {t("problem.h2")}
          </h2>
          <p style={{
            fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.7,
            maxWidth: "560px",
          }}>
            {t("problem.sub")}
          </p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.06)", borderRadius: "18px", overflow: "hidden" }}>
          {PROBLEMS.map((p, i) => (
            <motion.div
              key={p.key}
              {...fadeUp(inView, i * 0.07)}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                alignItems: "center",
                gap: "2rem",
                padding: "2rem 2.5rem",
                background: "#000000",
                borderBottom: i < PROBLEMS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <div>
                <p style={{
                  fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  marginBottom: "0.4rem",
                  letterSpacing: "-0.02em",
                }}>
                  {t(`problem.items.${p.key}.title`)}
                </p>
                <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                  {t(`problem.items.${p.key}.desc`)}
                </p>
              </div>
              <span style={{
                fontSize: "0.625rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: p.severity === "KRITISCH" ? "#FF453A" : "#FF9F0A",
                background: p.severity === "KRITISCH" ? "rgba(255,69,58,0.12)" : "rgba(255,159,10,0.12)",
                padding: "0.35rem 0.75rem",
                borderRadius: "4px",
                whiteSpace: "nowrap",
              }}>
                {p.severity}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeUp(inView, 0.5)}
          style={{
            marginTop: "3rem",
            padding: "2.5rem",
            background: "#0071E3",
            borderRadius: "18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 600, color: "#fff", maxWidth: "480px", lineHeight: 1.5 }}>
            {t("problem.ctaCard.text")}
          </p>
          <a
            href="#audit-cta"
            style={{
              background: "#fff",
              color: "#0071E3",
              padding: "0.875rem 1.75rem",
              borderRadius: "980px",
              fontWeight: 700,
              fontSize: "0.9375rem",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            {t("problem.ctaCard.btn")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Scroll 3 — System Model
// HINTERGRUND: Weiß
// ─────────────────────────────────────────────
const LAYERS = [
  { key: "identity",      number: "01", color: "#0071E3", bg: "#F0F7FF" },
  { key: "device",        number: "02", color: "#5E5CE6", bg: "#F2F2FF" },
  { key: "collaboration", number: "03", color: "#1D1D1F", bg: "#F5F5F7" },
  { key: "security",      number: "04", color: "#FF3B30", bg: "#FFF2F1" },
];

function SectionSystemModel() {
  const t = useTranslations("system");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="system-model"
      style={{ background: "#FFFFFF", paddingTop: "140px", paddingBottom: "140px" }}
      className="px-6"
      aria-labelledby="system-model-h2"
    >
      <div className="max-w-[960px] mx-auto">
        <motion.div {...fadeUp(inView, 0)} style={{ marginBottom: "80px", textAlign: "center" }}>
          <p style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#0071E3",
            marginBottom: "1.5rem",
          }}>
            {t("model.label")}
          </p>
          <h2
            id="system-model-h2"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
              color: "#1D1D1F",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-plus-jakarta)",
            }}
          >
            {t("model.h2")}
          </h2>
          <p style={{
            fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
            color: "#6E6E73",
            lineHeight: 1.7,
            maxWidth: "520px",
            margin: "0 auto",
          }}>
            {t("model.sub")}
          </p>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "1.25rem",
        }}>
          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.key}
              {...fadeUp(inView, i * 0.1)}
              style={{
                background: layer.bg,
                borderRadius: "20px",
                padding: "2.5rem 2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{
                  fontSize: "2.25rem",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  color: layer.color,
                  lineHeight: 1,
                  fontFamily: "var(--font-plus-jakarta)",
                }}>
                  {layer.number}
                </span>
              </div>

              <div>
                <p style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#1D1D1F",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.5rem",
                  lineHeight: 1.2,
                }}>
                  {t(`model.layers.${layer.key}.title`)}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#6E6E73", lineHeight: 1.6 }}>
                  {t(`model.layers.${layer.key}.sub`)}
                </p>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {(t.raw(`model.layers.${layer.key}.features`) as string[]).map((f: string) => (
                  <li key={f} style={{ fontSize: "0.8125rem", color: "#1D1D1F", fontWeight: 500 }}>
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
// HINTERGRUND: Schwarz
// ─────────────────────────────────────────────
const MODULES = [
  { key: "managedServices", slug: "managed-services",            color: "#0071E3", label: "01" },
  { key: "aod",              slug: "administrator-on-demand",     color: "#0071E3", label: "02" },
  { key: "audit",            slug: "security-audit-microsoft-365",color: "#0071E3", label: "03" },
  { key: "copilot",          slug: "copilot",                     color: "#30B0C7", label: "04" },
  { key: "entra",            slug: "entra-id",                    color: "#34AADC", label: "05" },
  { key: "intune",           slug: "intune",                      color: "#5E5CE6", label: "06" },
  { key: "templates",        slug: "templates",                   color: "#FF9F0A", label: "07" },
];

function SectionModuleIntro() {
  const t = useTranslations("system");
  const params = useParams();
  const locale = (params?.locale as string) || "de";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="modules"
      style={{ background: "#000000", paddingTop: "140px", paddingBottom: "140px" }}
      className="px-6"
      aria-labelledby="modules-h2"
    >
      <div className="max-w-[960px] mx-auto">
        <motion.div {...fadeUp(inView, 0)} style={{ marginBottom: "80px" }}>
          <p style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#0071E3",
            marginBottom: "1.5rem",
          }}>
            {t("modules.label")}
          </p>
          <h2
            id="modules-h2"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
              color: "#FFFFFF",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-plus-jakarta)",
            }}
          >
            {t("modules.h2")}
          </h2>
          <p style={{
            fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.7,
            maxWidth: "520px",
          }}>
            {t("modules.sub")}
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)", borderRadius: "20px", overflow: "hidden" }}>
          {MODULES.map((mod, i) => (
            <motion.div key={mod.key} {...fadeUp(inView, i * 0.09)}>
              <Link
                href={`/${locale}/${mod.slug}`}
                style={{
                  display: "block",
                  padding: "2.5rem",
                  background: "#000000",
                  textDecoration: "none",
                  transition: "background 0.2s",
                  height: "100%",
                }}
                onMouseOver={e => (e.currentTarget.style.background = "#0a0a0a")}
                onMouseOut={e => (e.currentTarget.style.background = "#000000")}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                  <span style={{
                    fontSize: "2rem",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    color: mod.color,
                    lineHeight: 1,
                    fontFamily: "var(--font-plus-jakarta)",
                  }}>
                    {mod.label}
                  </span>
                  <span style={{ fontSize: "1.25rem", color: "rgba(255,255,255,0.15)" }}>↗</span>
                </div>

                <p style={{
                  fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.75rem",
                  lineHeight: 1.25,
                }}>
                  {t(`modules.items.${mod.key}.title`)}
                </p>
                <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, marginBottom: "1.5rem" }}>
                  {t(`modules.items.${mod.key}.sub`)}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {(t.raw(`modules.items.${mod.key}.tags`) as string[]).map((tag: string) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: mod.color,
                        background: `${mod.color}18`,
                        padding: "0.3rem 0.75rem",
                        borderRadius: "4px",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
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
// HINTERGRUND: Weiß
// ─────────────────────────────────────────────
function SectionEntryCTA() {
  const t = useTranslations("system");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      id="audit-cta"
      style={{ background: "#FFFFFF", paddingTop: "140px", paddingBottom: "160px" }}
      className="px-6"
      aria-labelledby="audit-cta-h2"
    >
      <div className="max-w-[780px] mx-auto text-center">
        <motion.div {...fadeUp(inView, 0)}>
          <p style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#0071E3",
            marginBottom: "1.5rem",
          }}>
            {t("cta.eyebrow")}
          </p>

          <h2
            id="audit-cta-h2"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
              color: "#1D1D1F",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-plus-jakarta)",
            }}
          >
            {t("cta.h2")}
          </h2>

          <p style={{
            fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
            color: "#6E6E73",
            lineHeight: 1.7,
            maxWidth: "560px",
            margin: "0 auto 3rem",
          }}>
            {t("cta.sub")}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem", marginBottom: "3rem" }}>
            {(t.raw("cta.props") as string[]).map((prop: string) => (
              <span key={prop} style={{ fontSize: "0.9375rem", color: "#1D1D1F", fontWeight: 500 }}>
                {prop}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="#contact"
              style={{
                background: "#0071E3",
                color: "#fff",
                padding: "1rem 2.25rem",
                borderRadius: "980px",
                fontWeight: 600,
                fontSize: "1rem",
                textDecoration: "none",
                display: "inline-block",
                transition: "background 0.2s",
              }}
              onMouseOver={e => (e.currentTarget.style.background = "#0077ED")}
              onMouseOut={e => (e.currentTarget.style.background = "#0071E3")}
            >
              {t("cta.btnPrimary")}
            </a>
            <a
              href="#modules"
              style={{
                color: "#0071E3",
                padding: "1rem 2.25rem",
                borderRadius: "980px",
                fontWeight: 600,
                fontSize: "1rem",
                textDecoration: "none",
                border: "1.5px solid #0071E3",
                display: "inline-block",
              }}
            >
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
