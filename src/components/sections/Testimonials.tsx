"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";

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
          <h2 className="display-md text-white">{t("h2")}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.name + i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
              className="bg-card border border-border rounded-3xl p-6 hover:bg-card-hover hover:border-border-strong hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Stars */}
              <div className="text-amber text-sm tracking-widest mb-4">★★★★★</div>

              {/* Quote */}
              <blockquote className="text-[0.9375rem] leading-relaxed text-text-2 italic mb-6">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-bg-3 flex items-center justify-center font-display font-bold text-[0.875rem] text-text-2 flex-shrink-0">
                  {item.initials}
                </div>
                <div>
                  <div className="font-display font-bold text-[0.875rem] text-white">{item.name}</div>
                  <div className="text-[0.75rem] text-text-3 mt-0.5">{item.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
