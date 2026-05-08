"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";

const ICON_EMOJIS: Record<string, string> = {
  shield: "🔐",
  scale: "⚖",
  cpu: "💡",
  sparkles: "✦",
};
const ICON_BG: Record<string, string> = {
  shield: "bg-red/10",
  scale: "bg-accent/12",
  cpu: "bg-green/10",
  sparkles: "bg-accent-2/10",
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
          <h2 className="display-md text-white mb-4 whitespace-pre-line">{t("h2")}</h2>
          <p className="text-[1.0625rem] leading-relaxed text-text-2 max-w-[500px] mx-auto">
            {t("sub")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="bg-card border border-border rounded-3xl p-6 hover:bg-card-hover hover:border-border-strong hover:-translate-y-0.5 transition-all duration-300 cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl ${ICON_BG[item.icon]} flex items-center justify-center text-2xl mb-5`}>
                {ICON_EMOJIS[item.icon]}
              </div>
              <h3 className="font-display font-bold text-[1.0625rem] tracking-[-0.02em] text-white mb-2.5">
                {item.title}
              </h3>
              <p className="text-[0.875rem] text-text-2 leading-relaxed mb-4">{item.desc}</p>
              <ul className="space-y-1.5">
                {item.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[0.8125rem] text-text-3">
                    <span className="text-accent-2 font-bold text-base leading-none">·</span>
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
