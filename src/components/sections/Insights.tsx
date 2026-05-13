"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";

const THUMB_GRADIENTS = [
  "from-red/15 to-accent/10",
  "from-accent/15 to-accent-2/10",
  "from-green/12 to-accent/10",
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
          {items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
              className="bg-card border border-border rounded-3xl overflow-hidden hover:bg-card-hover hover:border-border-strong hover:-translate-y-0.5 transition-all duration-300 group"
            >
              {/* Thumbnail */}
              <div className={`h-36 bg-gradient-to-br ${THUMB_GRADIENTS[i]} flex items-center justify-center text-4xl relative overflow-hidden`}>
                <span className="relative z-10">{THUMB_ICONS[i]}</span>
                <div className="absolute inset-0 bg-gradient-to-br from-bg-0/20 to-transparent" />
              </div>

              {/* Body */}
              <div className="p-5">
                <span className="text-[0.6875rem] font-bold tracking-[0.08em] uppercase text-accent-2 block mb-2">
                  {item.tag}
                </span>
                <h3 className="font-display font-bold text-[1rem] tracking-[-0.02em] text-text-1 leading-snug mb-2.5 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-[0.8125rem] text-text-2 leading-relaxed mb-4 line-clamp-3">
                  {item.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[0.75rem] text-text-3">{item.readTime}</span>
                  <button className="text-[0.75rem] font-bold text-accent-2 hover:text-text-1 transition-colors flex items-center gap-1">
                    {t("readGuide")}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
