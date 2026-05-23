"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";

// Accent-Farben für Results-Karten
const CARD_ACCENTS = [
  { accent: "#6366f1", glow: "rgba(99,102,241,0.18)"  },
  { accent: "#22d3ee", glow: "rgba(34,211,238,0.18)"  },
  { accent: "#a855f7", glow: "rgba(168,85,247,0.18)"  },
  { accent: "#ec4899", glow: "rgba(236,72,153,0.18)"  },
];

export default function Results() {
  const t = useTranslations("results");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  const items = t.raw("items") as Array<{
    industry: string;
    headline: string;
    desc: string;
    kpis: Array<{ value: string; label: string; positive: boolean }>;
  }>;

  return (
    <section id="results" ref={ref} className="relative z-10 bg-bg-1 py-28 px-6">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          className="mb-14"
        >
          <div className="section-label mb-4">{t("label")}</div>
          <h2 className="display-md text-text-1 mb-4 whitespace-pre-line">{t("h2")}</h2>
          <p className="text-[1.0625rem] leading-relaxed text-text-2 max-w-[540px]">{t("sub")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {items.map((item, i) => {
            const ca = CARD_ACCENTS[i % CARD_ACCENTS.length];
            return (
              <motion.div
                key={item.headline}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="group relative rounded-3xl p-7 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(8,8,18,0.97) 0%, rgba(12,8,25,0.97) 100%)",
                  border: `1px solid ${ca.accent}20`,
                  boxShadow: `0 0 0 1px ${ca.accent}10, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* Top border glow */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${ca.accent}80, transparent)` }}
                />
                {/* Inner radial glow */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse 70% 40% at 50% 0%, ${ca.accent}0C 0%, transparent 65%)` }}
                />
                {/* Corner accent */}
                <div
                  className="absolute -top-10 -right-10 w-28 h-28 rounded-full pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${ca.accent}14 0%, transparent 70%)`, filter: "blur(14px)" }}
                />

                {/* Industry */}
                <div className="relative z-10 flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.1em] mb-4" style={{ color: "rgba(100,116,139,0.7)" }}>
                  <span className="w-4 h-px" style={{ background: `${ca.accent}50` }} />
                  {item.industry}
                </div>

                <h3 className="relative z-10 font-display font-bold text-[1.125rem] tracking-[-0.02em] leading-snug mb-3" style={{ color: "#f1f5f9" }}>
                  {item.headline}
                </h3>
                <p className="relative z-10 text-[0.875rem] leading-relaxed mb-6" style={{ color: "rgba(148,163,184,0.72)" }}>{item.desc}</p>

                {/* KPIs */}
                <div
                  className="relative z-10 flex gap-5 pt-5"
                  style={{ borderTop: `1px solid rgba(255,255,255,0.06)` }}
                >
                  {item.kpis.map((kpi) => (
                    <div key={kpi.label}>
                      <div
                        className="font-display text-[1.625rem] font-extrabold tracking-[-0.03em] leading-none"
                        style={{
                          color: kpi.positive ? "#22d3ee" : "rgba(148,163,184,0.5)",
                          textShadow: kpi.positive ? "0 0 20px rgba(34,211,238,0.5)" : "none",
                        }}
                      >
                        {kpi.value}
                      </div>
                      <div className="text-[0.6875rem] font-semibold uppercase tracking-[0.05em] mt-1" style={{ color: "rgba(100,116,139,0.7)" }}>
                        {kpi.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
