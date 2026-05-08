"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";

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
          <h2 className="display-md text-white mb-4 whitespace-pre-line">{t("h2")}</h2>
          <p className="text-[1.0625rem] leading-relaxed text-text-2 max-w-[540px]">{t("sub")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.headline}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="bg-card border border-border rounded-3xl p-7 hover:bg-card-hover hover:border-border-strong hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Industry */}
              <div className="flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-text-3 mb-4">
                <span className="w-4 h-px bg-border-strong" />
                {item.industry}
              </div>

              <h3 className="font-display font-bold text-[1.125rem] tracking-[-0.02em] text-white leading-snug mb-3">
                {item.headline}
              </h3>
              <p className="text-[0.875rem] text-text-2 leading-relaxed mb-6">{item.desc}</p>

              {/* KPIs */}
              <div className="flex gap-5 pt-5 border-t border-border">
                {item.kpis.map((kpi) => (
                  <div key={kpi.label}>
                    <div
                      className="font-display text-[1.625rem] font-extrabold tracking-[-0.03em] leading-none"
                      style={{ color: kpi.positive ? "#10D97C" : "#94A3B8" }}
                    >
                      {kpi.value}
                    </div>
                    <div className="text-[0.6875rem] text-text-3 font-semibold uppercase tracking-[0.05em] mt-1">
                      {kpi.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
