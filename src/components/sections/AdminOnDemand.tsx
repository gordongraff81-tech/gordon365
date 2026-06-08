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
// Section 1 — Hero / Service Definition
// BACKGROUND: White
// ─────────────────────────────────────────────
function SectionHero() {
  const t = useTranslations("adminOnDemand");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      id="aod-hero"
      style={{ background: "#FFFFFF", paddingTop: "140px", paddingBottom: "140px" }}
      className="px-6"
      aria-labelledby="aod-hero-h1"
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
          {t("hero.eyebrow")}
        </motion.p>

        <motion.h1
          id="aod-hero-h1"
          {...fadeUp(inView, 0.08)}
          style={{
            fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)",
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
            color: "#1D1D1F",
            marginBottom: "2rem",
            fontFamily: "var(--font-plus-jakarta)",
          }}
        >
          {t("hero.h1a")}{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #0071E3 0%, #34AADC 100%)",
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

        <motion.p
          {...fadeUp(inView, 0.16)}
          style={{
            fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
            lineHeight: 1.7,
            color: "#6E6E73",
            maxWidth: "620px",
            margin: "0 auto 3rem",
            fontWeight: 400,
          }}
        >
          {t("hero.sub")}
        </motion.p>

        <motion.div
          {...fadeUp(inView, 0.24)}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <a
            href="#aod-contact"
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
            onMouseOver={(e) => (e.currentTarget.style.background = "#0077ED")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#0071E3")}
          >
            {t("hero.cta")}
          </a>
          <a
            href="#aod-services"
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
            {t("hero.ctaSecondary")}
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
          {(t.raw("hero.trust") as string[]).map((item: string) => (
            <span
              key={item}
              style={{
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "#6E6E73",
                letterSpacing: "0.01em",
              }}
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Section 2 — The Problem
// BACKGROUND: Black
// ─────────────────────────────────────────────
const PROBLEM_KEYS = ["noAdmin", "reactive", "compliance", "incidents", "growth"] as const;
const PROBLEM_SEVERITIES: Array<"critical" | "high"> = ["critical", "critical", "high", "high", "critical"];

function SectionProblem() {
  const t = useTranslations("adminOnDemand");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="aod-problem"
      style={{ background: "#1D1D1F", paddingTop: "140px", paddingBottom: "140px" }}
      className="px-6"
      aria-labelledby="aod-problem-h2"
    >
      <div className="max-w-[960px] mx-auto">
        <motion.div {...fadeUp(inView, 0)} style={{ marginBottom: "80px" }}>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#0071E3",
              marginBottom: "1.5rem",
            }}
          >
            {t("problem.label")}
          </p>
          <h2
            id="aod-problem-h2"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
              color: "#F5F5F7",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-plus-jakarta)",
            }}
          >
            {t("problem.h2")}
          </h2>
          <p
            style={{
              fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
              color: "#86868B",
              lineHeight: 1.7,
              maxWidth: "560px",
            }}
          >
            {t("problem.sub")}
          </p>
        </motion.div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1px",
            background: "#2D2D2F",
            borderRadius: "18px",
            overflow: "hidden",
          }}
        >
          {PROBLEM_KEYS.map((key, i) => (
            <motion.div
              key={key}
              {...fadeUp(inView, i * 0.07)}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                alignItems: "center",
                gap: "2rem",
                padding: "2rem 2.5rem",
                background: "#1D1D1F",
                borderBottom:
                  i < PROBLEM_KEYS.length - 1 ? "1px solid #2D2D2F" : "none",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
                    fontWeight: 600,
                    color: "#F5F5F7",
                    marginBottom: "0.4rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t(`problem.items.${key}.title`)}
                </p>
                <p style={{ fontSize: "0.9375rem", color: "#86868B", lineHeight: 1.6 }}>
                  {t(`problem.items.${key}.desc`)}
                </p>
              </div>
              <span
                style={{
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: PROBLEM_SEVERITIES[i] === "critical" ? "#FF453A" : "#FF9F0A",
                  background:
                    PROBLEM_SEVERITIES[i] === "critical"
                      ? "rgba(255,69,58,0.12)"
                      : "rgba(255,159,10,0.12)",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "4px",
                  whiteSpace: "nowrap",
                }}
              >
                {t(`problem.severity.${PROBLEM_SEVERITIES[i]}`)}
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
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              fontWeight: 600,
              color: "#fff",
              maxWidth: "480px",
              lineHeight: 1.5,
            }}
          >
            {t("problem.ctaCard.text")}
          </p>
          <a
            href="#aod-contact"
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
// Section 3 — Service Categories
// BACKGROUND: White
// ─────────────────────────────────────────────
const SERVICE_COLORS = [
  { color: "#0071E3", bg: "#F0F7FF" },
  { color: "#5E5CE6", bg: "#F2F2FF" },
  { color: "#34AADC", bg: "#EFF8FD" },
  { color: "#30B0C7", bg: "#EFFBFC" },
  { color: "#1D1D1F", bg: "#F5F5F7" },
  { color: "#0071E3", bg: "#F0F7FF" },
  { color: "#5E5CE6", bg: "#F2F2FF" },
  { color: "#FF3B30", bg: "#FFF2F1" },
];

const SERVICE_KEYS = [
  "identity",
  "entra",
  "exchange",
  "teams",
  "sharepoint",
  "intune",
  "security",
  "troubleshooting",
] as const;

function SectionServices() {
  const t = useTranslations("adminOnDemand");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section
      ref={ref}
      id="aod-services"
      style={{ background: "#FFFFFF", paddingTop: "140px", paddingBottom: "140px" }}
      className="px-6"
      aria-labelledby="aod-services-h2"
    >
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          {...fadeUp(inView, 0)}
          style={{ marginBottom: "80px", textAlign: "center" }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#0071E3",
              marginBottom: "1.5rem",
            }}
          >
            {t("services.label")}
          </p>
          <h2
            id="aod-services-h2"
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
            {t("services.h2")}
          </h2>
          <p
            style={{
              fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
              color: "#6E6E73",
              lineHeight: 1.7,
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            {t("services.sub")}
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {SERVICE_KEYS.map((key, i) => {
            const scheme = SERVICE_COLORS[i];
            return (
              <motion.div
                key={key}
                {...fadeUp(inView, i * 0.065)}
                style={{
                  background: scheme.bg,
                  borderRadius: "20px",
                  padding: "2.25rem 2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "1.375rem",
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      color: scheme.color,
                      lineHeight: 1,
                      fontFamily: "var(--font-plus-jakarta)",
                      display: "block",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      color: "#1D1D1F",
                      letterSpacing: "-0.02em",
                      marginBottom: "0.4rem",
                      lineHeight: 1.25,
                    }}
                  >
                    {t(`services.items.${key}.title`)}
                  </p>
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                  }}
                >
                  {(t.raw(`services.items.${key}.features`) as string[]).map(
                    (f: string) => (
                      <li
                        key={f}
                        style={{
                          fontSize: "0.8125rem",
                          color: "#6E6E73",
                          fontWeight: 500,
                          paddingLeft: "0.875rem",
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            color: scheme.color,
                            fontWeight: 700,
                          }}
                        >
                          ·
                        </span>
                        {f}
                      </li>
                    )
                  )}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Section 4 — Project Support
// BACKGROUND: Black
// ─────────────────────────────────────────────
const PROJECT_KEYS = [
  "migrations",
  "exchange",
  "teams",
  "sharepoint",
  "intune",
  "copilot",
  "governance",
  "security",
  "powerAutomate",
] as const;

function SectionProjectSupport() {
  const t = useTranslations("adminOnDemand");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="aod-projects"
      style={{ background: "#1D1D1F", paddingTop: "140px", paddingBottom: "140px" }}
      className="px-6"
      aria-labelledby="aod-projects-h2"
    >
      <div className="max-w-[960px] mx-auto">
        <motion.div {...fadeUp(inView, 0)} style={{ marginBottom: "80px" }}>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#0071E3",
              marginBottom: "1.5rem",
            }}
          >
            {t("projects.label")}
          </p>
          <h2
            id="aod-projects-h2"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
              color: "#F5F5F7",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-plus-jakarta)",
            }}
          >
            {t("projects.h2")}
          </h2>
          <p
            style={{
              fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
              color: "#86868B",
              lineHeight: 1.7,
              maxWidth: "560px",
            }}
          >
            {t("projects.sub")}
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            background: "#2D2D2F",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          {PROJECT_KEYS.map((key, i) => (
            <motion.div
              key={key}
              {...fadeUp(inView, i * 0.055)}
              style={{
                padding: "2rem 2.25rem",
                background: "#1D1D1F",
              }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#F5F5F7",
                  letterSpacing: "-0.015em",
                  marginBottom: "0.4rem",
                }}
              >
                {t(`projects.items.${key}.title`)}
              </p>
              <p style={{ fontSize: "0.875rem", color: "#86868B", lineHeight: 1.6 }}>
                {t(`projects.items.${key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Section 5 — Enterprise Trust
// BACKGROUND: White
// ─────────────────────────────────────────────
const TRUST_STAT_COLORS = ["#0071E3", "#5E5CE6", "#34AADC", "#30B0C7"];
const TRUST_STAT_VALUES = ["10+", "150+", "D/A/CH", "MS"];

function SectionTrust() {
  const t = useTranslations("adminOnDemand");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      id="aod-trust"
      style={{ background: "#FFFFFF", paddingTop: "140px", paddingBottom: "140px" }}
      className="px-6"
      aria-labelledby="aod-trust-h2"
    >
      <div className="max-w-[960px] mx-auto">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          <motion.div {...fadeUp(inView, 0)}>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#0071E3",
                marginBottom: "1.5rem",
              }}
            >
              {t("trust.label")}
            </p>
            <h2
              id="aod-trust-h2"
              style={{
                fontSize: "clamp(2.25rem, 4vw, 3.75rem)",
                fontWeight: 800,
                lineHeight: 1.06,
                letterSpacing: "-0.04em",
                color: "#1D1D1F",
                marginBottom: "1.5rem",
                fontFamily: "var(--font-plus-jakarta)",
              }}
            >
              {t("trust.h2")}
            </h2>
            <p
              style={{
                fontSize: "clamp(1.0625rem, 1.75vw, 1.25rem)",
                color: "#6E6E73",
                lineHeight: 1.75,
                marginBottom: "2.5rem",
              }}
            >
              {t("trust.body")}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {(t.raw("trust.points") as string[]).map((point: string, i: number) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <span
                    style={{
                      flexShrink: 0,
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "#0071E3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "0.125rem",
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5.5L4 7.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span style={{ fontSize: "0.9375rem", color: "#1D1D1F", fontWeight: 500, lineHeight: 1.5 }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(inView, 0.15)}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.25rem",
            }}
          >
            {TRUST_STAT_VALUES.map((value, i) => (
              <div
                key={value}
                style={{
                  background: "#F5F5F7",
                  borderRadius: "18px",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 800,
                    letterSpacing: "-0.05em",
                    color: TRUST_STAT_COLORS[i],
                    lineHeight: 1,
                    fontFamily: "var(--font-plus-jakarta)",
                  }}
                >
                  {value}
                </span>
                <span
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "#6E6E73",
                    letterSpacing: "0.01em",
                  }}
                >
                  {t(`trust.stats.${i}`)}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Section 6 — Service Packages
// BACKGROUND: Black
// ─────────────────────────────────────────────
const PACKAGE_SCHEMES = [
  { color: "#34AADC", bg: "rgba(52,170,220,0.06)", border: "rgba(52,170,220,0.2)" },
  { color: "#0071E3", bg: "rgba(0,113,227,0.08)", border: "rgba(0,113,227,0.25)" },
  { color: "#5E5CE6", bg: "rgba(94,92,230,0.06)", border: "rgba(94,92,230,0.2)" },
];

const PACKAGE_KEYS = ["starter", "business", "premium"] as const;

function SectionPackages() {
  const t = useTranslations("adminOnDemand");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="aod-packages"
      style={{ background: "#1D1D1F", paddingTop: "140px", paddingBottom: "140px" }}
      className="px-6"
      aria-labelledby="aod-packages-h2"
    >
      <div className="max-w-[960px] mx-auto">
        <motion.div
          {...fadeUp(inView, 0)}
          style={{ marginBottom: "80px", textAlign: "center" }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#0071E3",
              marginBottom: "1.5rem",
            }}
          >
            {t("packages.label")}
          </p>
          <h2
            id="aod-packages-h2"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
              color: "#F5F5F7",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-plus-jakarta)",
            }}
          >
            {t("packages.h2")}
          </h2>
          <p
            style={{
              fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
              color: "#86868B",
              lineHeight: 1.7,
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            {t("packages.sub")}
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {PACKAGE_KEYS.map((key, i) => {
            const scheme = PACKAGE_SCHEMES[i];
            const isFeatured = key === "business";
            return (
              <motion.div
                key={key}
                {...fadeUp(inView, i * 0.1)}
                style={{
                  borderRadius: "24px",
                  padding: "2.5rem",
                  background: scheme.bg,
                  border: `1.5px solid ${scheme.border}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  position: "relative",
                  boxShadow: isFeatured
                    ? `0 0 0 1px ${scheme.border}, 0 20px 60px rgba(0,113,227,0.12)`
                    : "none",
                }}
              >
                {isFeatured && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-1px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#0071E3",
                      color: "#fff",
                      fontSize: "0.625rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "0.3rem 1rem",
                      borderRadius: "0 0 8px 8px",
                    }}
                  >
                    {t("packages.popular")}
                  </div>
                )}

                <div>
                  <p
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      color: "#F5F5F7",
                      letterSpacing: "-0.03em",
                      fontFamily: "var(--font-plus-jakarta)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {t(`packages.items.${key}.name`)}
                  </p>
                  <p style={{ fontSize: "0.9375rem", color: "#86868B", lineHeight: 1.6 }}>
                    {t(`packages.items.${key}.desc`)}
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: "1.25rem",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: scheme.color,
                      display: "block",
                      marginBottom: "1rem",
                    }}
                  >
                    {t(`packages.items.${key}.hours`)}
                  </span>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.6rem",
                    }}
                  >
                    {(t.raw(`packages.items.${key}.features`) as string[]).map(
                      (f: string) => (
                        <li
                          key={f}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.6rem",
                            fontSize: "0.875rem",
                            color: "#F5F5F7",
                            fontWeight: 500,
                          }}
                        >
                          <span
                            style={{
                              color: scheme.color,
                              flexShrink: 0,
                              fontWeight: 700,
                              marginTop: "0.05rem",
                            }}
                          >
                            →
                          </span>
                          {f}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div style={{ marginTop: "auto", paddingTop: "1.5rem" }}>
                  <a
                    href="#aod-contact"
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "0.875rem",
                      borderRadius: "980px",
                      fontWeight: 700,
                      fontSize: "0.9375rem",
                      textDecoration: "none",
                      transition: "all 0.2s",
                      background: isFeatured ? "#0071E3" : "transparent",
                      color: isFeatured ? "#fff" : scheme.color,
                      border: isFeatured ? "none" : `1.5px solid ${scheme.color}`,
                    }}
                  >
                    {t("packages.cta")}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          {...fadeUp(inView, 0.4)}
          style={{
            textAlign: "center",
            marginTop: "2.5rem",
            fontSize: "0.875rem",
            color: "#86868B",
          }}
        >
          {t("packages.note")}
        </motion.p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Section 7 — Final CTA
// BACKGROUND: White
// ─────────────────────────────────────────────
function SectionCTA() {
  const t = useTranslations("adminOnDemand");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      id="aod-contact"
      style={{ background: "#FFFFFF", paddingTop: "140px", paddingBottom: "160px" }}
      className="px-6"
      aria-labelledby="aod-cta-h2"
    >
      <div className="max-w-[780px] mx-auto text-center">
        <motion.div {...fadeUp(inView, 0)}>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#0071E3",
              marginBottom: "1.5rem",
            }}
          >
            {t("cta.eyebrow")}
          </p>

          <h2
            id="aod-cta-h2"
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

          <p
            style={{
              fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
              color: "#6E6E73",
              lineHeight: 1.7,
              maxWidth: "580px",
              margin: "0 auto 3rem",
            }}
          >
            {t("cta.sub")}
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "2rem",
              marginBottom: "3rem",
            }}
          >
            {(t.raw("cta.props") as string[]).map((prop: string) => (
              <span
                key={prop}
                style={{ fontSize: "0.9375rem", color: "#1D1D1F", fontWeight: 500 }}
              >
                {prop}
              </span>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
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
              onMouseOver={(e) => (e.currentTarget.style.background = "#0077ED")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#0071E3")}
            >
              {t("cta.btnPrimary")}
            </a>
            <a
              href="#aod-packages"
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
export default function AdminOnDemand() {
  return (
    <>
      <SectionHero />
      <SectionProblem />
      <SectionServices />
      <SectionProjectSupport />
      <SectionTrust />
      <SectionPackages />
      <SectionCTA />
    </>
  );
}
