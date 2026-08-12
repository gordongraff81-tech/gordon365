"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface ContactProps {
  locale: string;
}

export default function Contact({ locale }: ContactProps) {
  const t = useTranslations("contact");
  const tf = useTranslations("contact.form");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  // Fetch CSRF token on component mount
  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        const res = await fetch("/api/csrf");
        const data = await res.json();
        setCsrfToken(data.token);
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    }
    fetchCsrfToken();
  }, []);

  const features = t.raw("features") as string[];
  const sizeOptions = tf.raw("sizeOptions") as string[];
  const budgetOptions = tf.raw("budgetOptions") as string[];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      // Add CSRF token if available
      if (csrfToken) {
        headers["X-CSRF-Token"] = csrfToken;
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers,
        body: JSON.stringify({ ...data, locale }),
      });

      if (res.ok) {
        setSubmitted(true);
        toast.success(tf("success"), { duration: 6000 });
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.error || tf("error"));
      }
    } catch {
      toast.error(tf("error"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" ref={ref} className="relative z-10 bg-bg-1 py-28 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_500px] gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="section-label mb-4">{t("label")}</div>
            <h2 className="display-md text-text-1 mb-4 whitespace-pre-line">{t("h2")}</h2>
            <p className="text-[1.0625rem] leading-relaxed text-text-2 max-w-[440px] mb-8">
              {t("sub")}
            </p>
            <ul className="space-y-3.5">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-[0.9375rem] text-text-2">
                  <span className="text-accent-2 font-bold text-[0.875rem] flex-shrink-0">→</span>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="bg-bg-1 border border-border-strong rounded-4xl p-7 shadow-card"
          >
            <h3 className="font-display font-extrabold text-[1.25rem] tracking-[-0.03em] text-text-1 mb-6">
              {tf("title")}
            </h3>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green/10 border border-green/25 flex items-center justify-center text-2xl mx-auto mb-4">✓</div>
                <h4 className="font-display font-bold text-lg text-text-1 mb-2">{tf("submitted")}</h4>
                <p className="text-text-2 text-sm">{tf("success")}</p>
                <button onClick={() => setSubmitted(false)} className="mt-5 text-sm text-accent hover:text-accent-hover transition-colors">
                  {tf("sendAnother")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-name" className="block text-[0.6875rem] font-bold tracking-[0.08em] uppercase text-text-3 mb-1.5">{tf("name")}</label>
                    <input id="contact-name" name="name" type="text" required placeholder={tf("namePlaceholder")} className="input-field" />
                  </div>
                  <div>
                    <label htmlFor="contact-company" className="block text-[0.6875rem] font-bold tracking-[0.08em] uppercase text-text-3 mb-1.5">{tf("company")}</label>
                    <input id="contact-company" name="company" type="text" required placeholder={tf("companyPlaceholder")} className="input-field" />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-[0.6875rem] font-bold tracking-[0.08em] uppercase text-text-3 mb-1.5">{tf("email")}</label>
                  <input id="contact-email" name="email" type="email" required placeholder={tf("emailPlaceholder")} className="input-field" />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-size" className="block text-[0.6875rem] font-bold tracking-[0.08em] uppercase text-text-3 mb-1.5">{tf("size")}</label>
                    <select id="contact-size" name="size" className="input-field" aria-label={tf("size")}>
                      <option value="">{tf("sizePlaceholder")}</option>
                      {sizeOptions.map((o) => (<option key={o} value={o} style={{ background: "#FFFFFF" }}>{o}</option>))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-budget" className="block text-[0.6875rem] font-bold tracking-[0.08em] uppercase text-text-3 mb-1.5">{tf("budget")}</label>
                    <select id="contact-budget" name="budget" className="input-field" aria-label={tf("budget")}>
                      <option value="">{tf("budgetPlaceholder")}</option>
                      {budgetOptions.map((o) => (<option key={o} value={o} style={{ background: "#FFFFFF" }}>{o}</option>))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-challenge" className="block text-[0.6875rem] font-bold tracking-[0.08em] uppercase text-text-3 mb-1.5">{tf("challenge")}</label>
                  <textarea id="contact-challenge" name="challenge" rows={3} placeholder={tf("challengePlaceholder")} className="input-field resize-none" />
                </div>
                <button type="submit" disabled={submitting} className="w-full bg-accent hover:bg-accent-hover disabled:opacity-60 text-white py-4 rounded-[6px] font-bold text-[1rem] flex items-center justify-center gap-2 transition-all mt-2">
                  {submitting ? tf("submitting") : tf("submit")}
                  {!submitting && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}