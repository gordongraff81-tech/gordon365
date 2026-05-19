"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";

// Precision-Stroke-Icons — currentColor, 1.5px, 32×32 viewBox
// Mapping: Index 0–3 entspricht den vier why.points-Einträgen
const WHY_ICONS = [
  // Senior Focus — Zielkreuz (kein generischer Person-Icon mehr)
  <svg key="senior" width="18" height="18" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="16" cy="16" r="4"/>
    <line x1="16" y1="4" x2="16" y2="8"/>
    <line x1="16" y1="24" x2="16" y2="28"/>
    <line x1="4" y1="16" x2="8" y2="16"/>
    <line x1="24" y1="16" x2="28" y2="16"/>
    <line x1="7.5" y1="7.5" x2="10.3" y2="10.3"/>
    <line x1="21.7" y1="21.7" x2="24.5" y2="24.5"/>
    <line x1="24.5" y1="7.5" x2="21.7" y2="10.3"/>
    <line x1="10.3" y1="21.7" x2="7.5" y2="24.5"/>
    <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none"/>
  </svg>,
  // M365 Depth — gestaffelte Schichten mit Indent-Ankern
  <svg key="depth" width="18" height="18" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="8" width="22" height="4" rx="1.5"/>
    <rect x="8" y="14" width="16" height="4" rx="1.5"/>
    <rect x="11" y="20" width="10" height="4" rx="1.5"/>
    <line x1="5" y1="10" x2="3" y2="10"/>
    <line x1="8" y1="16" x2="6" y2="16"/>
    <line x1="11" y1="22" x2="9" y2="22"/>
  </svg>,
  // Proven Shield — Shield mit Checkmark und Zertifizierungs-Kappe
  <svg key="shield" width="18" height="18" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 3 L27 7.5 L27 14 C27 20.5 22.3 26.5 16 28 C9.7 26.5 5 20.5 5 14 L5 7.5 Z"/>
    <path d="M11 15.5 L14.5 19 L21 12"/>
    <path d="M12 8.5 Q16 6 20 8.5" strokeWidth="1" strokeDasharray="1.5 1.5"/>
  </svg>,
  // No Hand-off — Dokument direkt übergeben, kein Gap
  <svg key="handoff" width="18" height="18" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="8" width="14" height="17" rx="2"/>
    <path d="M19 12 L27 12 L27 25 L19 25"/>
    <line x1="14" y1="16.5" x2="27" y2="16.5"/>
    <path d="M22 15 L25 12 L22 9" fill="none"/>
  </svg>,
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
              <h2 className="display-md text-text-1 mb-4 whitespace-pre-line">{t("h2")}</h2>
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
                    <h3 className="font-display font-bold text-base tracking-[-0.01em] text-text-1 mb-1.5">
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
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-white font-display font-extrabold text-2xl flex-shrink-0 shadow-glow-sm">
                    G
                  </div>
                  <div>
                    <div className="font-display font-extrabold text-base text-text-1 tracking-[-0.02em]">
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
                    <div className="font-display font-extrabold text-[1.5rem] tracking-[-0.03em] text-text-1 leading-none">
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
