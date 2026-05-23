"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";

// Accent-Farben pro Karte im Apple-Silicon-Stil
const CARD_ACCENTS = [
  { accent: "#f87171", glow: "rgba(248,113,113,0.22)", thumbGrad: "linear-gradient(135deg, rgba(248,113,113,0.15) 0%, rgba(99,102,241,0.10) 100%)" },
  { accent: "#6366f1", glow: "rgba(99,102,241,0.22)",  thumbGrad: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(34,211,238,0.10) 100%)" },
  { accent: "#22d3ee", glow: "rgba(34,211,238,0.22)",  thumbGrad: "linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(99,102,241,0.08) 100%)" },
];
const THUMB_ICONS = ["🔐", "✦", "💡"];

export default function Insights() {
  const t = useTranslations("insights");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const items = t.raw("items") as Array<{
    tag: string;
    title: string;
    excerpt: string;
    readTime: string;
  }>;

  return (
    <section ref={ref} className="relative z-10 bg-bg-0 py-28 px-6">
      <div className="max-w-[1100px] mx-auto">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-end justify-between flex-wrap gap-4 mb-14"
        >
          <div>
            <div className="section-label mb-4">{t("label")}</div>
            <h2 className="display-md text-text-1">{t("h2")}</h2>
          </div>
          <a href="#" className="btn-outline text-sm py-2.5 px-4">
            {t("viewAll")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((item, i) => {
            const ca = CARD_ACCENTS[i % CARD_ACCENTS.length];
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
                className="group relative rounded-3xl overflow-hidden hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(8,8,18,0.97) 0%, rgba(12,8,25,0.97) 100%)",
                  border: `1px solid ${ca.accent}22`,
                  boxShadow: `0 0 0 1px ${ca.accent}10, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* Top border glow */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                  style={{ background: `linear-gradient(90deg, transparent, ${ca.accent}90, transparent)` }}
                />

                {/* Thumbnail */}
                <div
                  className="h-36 flex items-center justify-center text-4xl relative overflow-hidden"
                  style={{ background: ca.thumbGrad }}
                >
                  <span className="relative z-10">{THUMB_ICONS[i]}</span>
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(8,8,18,0.6) 100%)" }} />
                  {/* Subtle glow dot */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${ca.accent}30 0%, transparent 70%)`, filter: "blur(8px)" }}
                  />
                </div>

                {/* Hover inner glow */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse 80% 40% at 50% 0%, ${ca.accent}08 0%, transparent 60%)` }}
                />

                {/* Body */}
                <div className="relative z-10 p-5">
                  <span
                    className="text-[0.6875rem] font-bold tracking-[0.08em] uppercase block mb-2"
                    style={{ color: ca.accent, textShadow: `0 0 10px ${ca.accent}60` }}
                  >
                    {item.tag}
                  </span>
                  <h3 className="font-display font-bold text-[1rem] tracking-[-0.02em] leading-snug mb-2.5 line-clamp-2" style={{ color: "#f1f5f9" }}>
                    {item.title}
                  </h3>
                  <p className="text-[0.8125rem] leading-relaxed mb-4 line-clamp-3" style={{ color: "rgba(148,163,184,0.7)" }}>
                    {item.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[0.75rem]" style={{ color: "rgba(100,116,139,0.7)" }}>{item.readTime}</span>
                    <button
                      className="text-[0.75rem] font-bold transition-colors flex items-center gap-1"
                      style={{ color: ca.accent }}
                    >
                      {t("readGuide")}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
