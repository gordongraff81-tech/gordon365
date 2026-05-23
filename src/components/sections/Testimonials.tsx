"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";

// Accent pro Testimonial-Karte
const CARD_ACCENTS = [
  { accent: "#6366f1", glow: "rgba(99,102,241,0.20)"  },
  { accent: "#22d3ee", glow: "rgba(34,211,238,0.20)"  },
  { accent: "#a855f7", glow: "rgba(168,85,247,0.20)"  },
];

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const items = t.raw("items") as Array<{
    quote: string;
    name: string;
    role: string;
    initials: string;
  }>;

  return (
    <section ref={ref} className="relative z-10 bg-bg-0 py-28 px-6">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-14"
        >
          <div className="section-label mb-4 justify-center">{t("label")}</div>
          <h2 className="display-md text-text-1">{t("h2")}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((item, i) => {
            const ca = CARD_ACCENTS[i % CARD_ACCENTS.length];
            return (
              <motion.div
                key={item.name + i}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
                className="group relative rounded-3xl p-6 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
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
                  style={{ background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${ca.accent}0C 0%, transparent 65%)` }}
                />
                {/* Corner glow */}
                <div
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${ca.accent}16 0%, transparent 70%)`, filter: "blur(12px)" }}
                />

                {/* Stars */}
                <div className="relative z-10 text-sm tracking-widest mb-4" style={{ color: "#f59e0b", textShadow: "0 0 12px rgba(245,158,11,0.5)" }}>
                  ★★★★★
                </div>

                {/* Quote */}
                <blockquote className="relative z-10 text-[0.9375rem] leading-relaxed italic mb-6" style={{ color: "rgba(148,163,184,0.75)" }}>
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="relative z-10 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-[0.875rem] flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${ca.accent}25 0%, ${ca.accent}10 100%)`,
                      border: `1px solid ${ca.accent}35`,
                      color: ca.accent,
                      boxShadow: `0 0 12px ${ca.accent}20`,
                    }}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <div className="font-display font-bold text-[0.875rem]" style={{ color: "#f1f5f9" }}>{item.name}</div>
                    <div className="text-[0.75rem] mt-0.5" style={{ color: "rgba(100,116,139,0.7)" }}>{item.role}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
