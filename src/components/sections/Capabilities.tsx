"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import Image from "next/image";

// Custom-Icon-Map: Emoji-Platzhalter vollständig ersetzt durch Precision-Stroke-SVGs
const CAPABILITY_ICONS: Record<string, { src: string; bg: string; accent: string; glow: string }> = {
  shield:    { src: "/icons/shield-pulse.svg",    bg: "bg-red/10",      accent: "#f87171", glow: "rgba(248,113,113,0.2)"   },
  scale:     { src: "/icons/governance-core.svg", bg: "bg-accent/12",   accent: "#6366f1", glow: "rgba(99,102,241,0.2)"    },
  cpu:       { src: "/icons/audit-prism.svg",     bg: "bg-green/10",    accent: "#22d3ee", glow: "rgba(34,211,238,0.2)"    },
  sparkles:  { src: "/icons/spark-grid.svg",      bg: "bg-accent-2/10", accent: "#a855f7", glow: "rgba(168,85,247,0.2)"   },
};

export default function Capabilities() {
  const t = useTranslations("capabilities");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const items = t.raw("items") as Array<{
    icon: string;
    title: string;
    desc: string;
    features: string[];
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
          <h2 className="display-md text-text-1 mb-4 whitespace-pre-line">{t("h2")}</h2>
          <p className="text-[1.0625rem] leading-relaxed text-text-2 max-w-[500px] mx-auto">
            {t("sub")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => {
            const iconDef = CAPABILITY_ICONS[item.icon] ?? CAPABILITY_ICONS["shield"];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="group relative rounded-3xl p-6 hover:-translate-y-0.5 transition-all duration-300 cursor-default overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(8,8,18,0.96) 0%, rgba(12,8,25,0.95) 100%)",
                  border: `1px solid ${iconDef.accent}22`,
                  boxShadow: `0 0 0 1px ${iconDef.accent}10, 0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)`,
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* Top border glow */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${iconDef.accent}90, transparent)` }}
                />
                {/* Radial inner glow on hover */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${iconDef.accent}10 0%, transparent 70%)` }}
                />
                {/* Corner accent */}
                <div
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${iconDef.accent}14 0%, transparent 70%)`, filter: "blur(12px)" }}
                />

                <div
                  className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: `linear-gradient(135deg, ${iconDef.accent}18 0%, ${iconDef.accent}08 100%)`,
                    border: `1px solid ${iconDef.accent}30`,
                    boxShadow: `0 0 14px ${iconDef.accent}20, inset 0 1px 0 rgba(255,255,255,0.06)`,
                  }}
                >
                  <Image
                    src={iconDef.src}
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden="true"
                    className="text-current opacity-90"
                    style={{ filter: "var(--icon-tint, none)" }}
                  />
                </div>
                <h3 className="relative z-10 font-display font-bold text-[1.0625rem] tracking-[-0.02em] mb-2.5" style={{ color: "#f1f5f9" }}>
                  {item.title}
                </h3>
                <p className="relative z-10 text-[0.875rem] leading-relaxed mb-4" style={{ color: "rgba(148,163,184,0.72)" }}>{item.desc}</p>
                <ul className="relative z-10 space-y-1.5">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[0.8125rem]" style={{ color: "rgba(148,163,184,0.6)" }}>
                      <span className="font-bold text-base leading-none" style={{ color: iconDef.accent, textShadow: `0 0 8px ${iconDef.accent}70` }}>·</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
