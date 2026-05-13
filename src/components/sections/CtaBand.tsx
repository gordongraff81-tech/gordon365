"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";

export default function CtaBand() {
  const t = useTranslations("cta");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative z-10 bg-bg-1 py-24 px-6 overflow-hidden">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(37,99,255,0.2), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[680px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="display-sm text-text-1 mb-4">{t("h2")}</h2>
          <p className="text-[1.0625rem] text-text-2 leading-relaxed mb-9">{t("sub")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              className="btn-primary"
              onClick={() =>
                document
                  .getElementById("security-checker")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {t("btn1")}
            </button>
            <a href="#contact" className="btn-outline">
              {t("btn2")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
