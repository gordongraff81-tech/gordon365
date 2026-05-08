"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, string> = {
  0: "🔍",
  1: "✦",
  2: "↗",
};
const ICON_BG: Record<string, string> = {
  0: "bg-accent/15",
  1: "bg-accent-2/12",
  2: "bg-gold/12",
};

export default function Services() {
  const t = useTranslations("services");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const items = t.raw("items") as Array<{
    tag: string;
    name: string;
    desc: string;
    outcomes: string[];
    price: string;
    period: string;
    cta: string;
    featured?: boolean;
  }>;

  return (
    <section
      id="services"
      ref={ref}
      className="relative z-10 bg-bg-1 py-28 px-6"
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-14"
        >
          <div className="section-label mb-4 justify-center">{t("label")}</div>
          <h2 className="display-md text-white mb-4 whitespace-pre-line">{t("h2")}</h2>
          <p className="text-[1.0625rem] leading-relaxed text-text-2 max-w-[500px] mx-auto">
            {t("sub")}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
              className={cn(
                "relative flex flex-col rounded-3xl border p-7 overflow-hidden transition-all duration-300 group",
                item.featured
                  ? "bg-accent/8 border-accent/25"
                  : "bg-card border-border hover:bg-card-hover hover:border-border-strong",
                "hover:-translate-y-1 hover:shadow-card-hover"
              )}
            >
              {/* Top accent line */}
              <div
                className={cn(
                  "absolute top-0 left-0 right-0 h-px",
                  item.featured
                    ? "bg-gradient-to-r from-transparent via-accent to-transparent opacity-100"
                    : "bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100",
                  "transition-opacity duration-300"
                )}
              />

              {/* Top row */}
              <div className="flex items-start justify-between mb-5">
                <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center text-xl", ICON_BG[i])}>
                  {ICON_MAP[i]}
                </div>
                {item.featured && (
                  <span className="text-[0.625rem] font-bold tracking-[0.1em] uppercase text-accent-2 bg-accent-2/10 border border-accent-2/20 px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                )}
                {!item.featured && (
                  <span className="text-[0.6875rem] text-text-3 font-medium">{item.tag}</span>
                )}
              </div>

              {/* Name & desc */}
              <h3 className="font-display font-extrabold text-[1.25rem] tracking-[-0.03em] text-white leading-snug mb-3">
                {item.name}
              </h3>
              <p className="text-[0.875rem] text-text-2 leading-relaxed mb-5">{item.desc}</p>

              {/* Outcomes */}
              <ul className="flex flex-col gap-2 mb-6 flex-1">
                {item.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-[0.8125rem] text-text-2 leading-relaxed">
                    <span className={cn("font-bold text-[0.75rem] mt-0.5 flex-shrink-0", item.featured ? "text-accent-2" : "text-accent")}>
                      →
                    </span>
                    {o}
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="mt-auto pt-5 border-t border-border flex items-end justify-between">
                <div>
                  <div className="font-display font-extrabold text-[1.375rem] tracking-[-0.03em] text-white leading-none">
                    {item.price}
                  </div>
                  <div className="text-[0.75rem] text-text-3 mt-1">{item.period}</div>
                </div>
                <a
                  href="#contact"
                  className={cn(
                    "text-[0.8125rem] font-bold flex items-center gap-1 transition-colors",
                    item.featured ? "text-accent-2 hover:text-white" : "text-text-2 hover:text-white"
                  )}
                >
                  {item.cta}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
