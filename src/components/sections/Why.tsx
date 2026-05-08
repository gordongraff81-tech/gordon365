"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";

const WHY_ICONS = [
  // person
  <svg key="p" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  // layers
  <svg key="l" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  // shield-check
  <svg key="s" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
  // arrow-right-on-rectangle
  <svg key="a" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>,
];

export default function Why() {
  const t = useTranslations("why");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  const points = t.raw("points") as Array<{ title: string; desc: string }>;
  const founder = t.raw("founder") as {
    name: string; role: string; quote: string;
    stats: Array<{ value: string; label: string }>;
    certs: string[];
  };

  return (
    <section id="about" ref={ref} className="relative z-10 bg-bg-1 py-28 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-start">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="section-label mb-4">{t("label")}</div>
              <h2 className="display-md text-white mb-4 whitespace-pre-line">{t("h2")}</h2>
              <p className="text-[1.0625rem] leading-relaxed text-text-2 max-w-[500px]">{t("sub")}</p>
            </motion.div>

            <div className="mt-10 divide-y divide-border">
              {points.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                  className="flex gap-4 py-5"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/12 flex items-center justify-center text-accent-2 flex-shrink-0 mt-0.5">
                    {WHY_ICONS[i]}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base tracking-[-0.01em] text-white mb-1.5">
                      {p.title}
                    </h3>
                    <p className="text-[0.875rem] text-text-2 leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — founder card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="lg:sticky lg:top-24"
          >
            <div className="bg-card border border-border-strong rounded-4xl overflow-hidden shadow-card">
              {/* Header */}
              <div className="p-6 bg-gradient-to-br from-accent/10 to-accent-2/5 border-b border-border">
                <div className="flex items-center gap-3 mb-5">
                  {/* Avatar placeholder */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1a3a6b] to-[#2a5298] flex items-center justify-center text-white font-display font-extrabold text-2xl flex-shrink-0 shadow-glow-sm">
                    G
                  </div>
                  <div>
                    <div className="font-display font-extrabold text-base text-white tracking-[-0.02em]">
                      {founder.name}
                    </div>
                    <div className="text-[0.8125rem] text-text-2 mt-0.5">{founder.role}</div>
                  </div>
                </div>
                <blockquote className="text-[0.9375rem] leading-relaxed text-text-2 italic border-l-2 border-accent/40 pl-4">
                  {founder.quote}
                </blockquote>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 divide-x divide-y divide-border">
                {founder.stats.map((s) => (
                  <div key={s.label} className="p-4 text-center bg-bg-1">
                    <div className="font-display font-extrabold text-[1.5rem] tracking-[-0.03em] text-white leading-none">
                      {s.value}
                    </div>
                    <div className="text-[0.6875rem] text-text-3 font-semibold uppercase tracking-[0.06em] mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Certs */}
              <div className="p-5 border-t border-border space-y-2">
                {founder.certs.map((c) => (
                  <div key={c} className="flex items-start gap-2 text-[0.8125rem] text-text-2">
                    <span className="text-green font-bold mt-0.5 flex-shrink-0">✓</span>
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
