"use client";

import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useRef } from "react";

const FAQ_EN = [
  {
    q: "Do you work with companies outside Germany?",
    a: "Yes. Gordon365 works with companies across the D/A/CH region and broader Europe. Engagements are conducted remotely and structured to be efficient regardless of geography. Strategy calls work across all European time zones.",
  },
  {
    q: "What size of company do you typically work with?",
    a: "Most engagements involve businesses with 10 to 500 Microsoft 365 users — SMEs and mid-market companies with functional IT teams that aren't specialised in M365 architecture. The ideal client has already invested in the Microsoft stack and wants significantly more from it.",
  },
  {
    q: "How is Gordon365 different from our existing IT provider?",
    a: "Most IT providers manage your M365 environment reactively — handling tickets, ensuring uptime, renewing licences. Gordon365 operates strategically: auditing what you have, identifying waste, hardening security, and planning what comes next. These are different disciplines. We complement your existing IT team rather than replace them.",
  },
  {
    q: "What happens after the Health Check?",
    a: "You receive a written executive report with a prioritised roadmap, ROI projections for each recommendation, and a 30-minute leadership briefing. If you choose to implement recommendations, we can continue as your implementation partner or hand over a detailed brief for your internal team. There's no obligation to extend.",
  },
  {
    q: "Is the retainer a long-term commitment?",
    a: "The Strategic Advisory Retainer requires a minimum 3-month engagement to deliver meaningful continuity. After that, it runs on a rolling basis with 30 days' notice to end. Most retainer clients stay 12 months or longer because the ongoing value compounds — the environment gets progressively more secure and cost-efficient.",
  },
  {
    q: "What do you need to start a Health Check?",
    a: "We need Global Reader access to your Microsoft 365 tenant (read-only) and a brief about your business context and pain points. No sensitive business data is accessed — the audit focuses on configuration, licensing assignments, security settings, and governance. An NDA is provided before any access is granted.",
  },
];

const FAQ_DE = [
  {
    q: "Arbeiten Sie auch mit Unternehmen außerhalb Deutschlands?",
    a: "Ja. Gordon365 arbeitet mit Unternehmen in der gesamten D/A/CH-Region und im weiteren Europa. Engagements werden remote durchgeführt und sind unabhängig von der Geografie effizient strukturiert. Strategiegespräche finden über alle europäischen Zeitzonen statt.",
  },
  {
    q: "Mit welcher Unternehmensgröße arbeiten Sie typischerweise?",
    a: "Die meisten Projekte betreffen Unternehmen mit 10 bis 500 Microsoft 365-Benutzern — KMU und mittelständische Unternehmen mit funktionalen IT-Teams, die nicht auf M365-Architektur spezialisiert sind. Der ideale Kunde hat bereits in den Microsoft-Stack investiert und möchte deutlich mehr daraus herausholen.",
  },
  {
    q: "Wie unterscheidet sich Gordon365 von unserem bestehenden IT-Dienstleister?",
    a: "Die meisten IT-Dienstleister verwalten Ihre M365-Umgebung reaktiv — Tickets bearbeiten, Verfügbarkeit sicherstellen, Lizenzen erneuern. Gordon365 agiert strategisch: Prüfung des Bestehenden, Identifikation von Verschwendung, Sicherheitshärtung und Planung der nächsten Schritte. Das sind verschiedene Disziplinen. Wir ergänzen Ihr bestehendes IT-Team, ersetzen es nicht.",
  },
  {
    q: "Was passiert nach dem Health Check?",
    a: "Sie erhalten einen schriftlichen Executive-Report mit einer priorisierten Roadmap, ROI-Projektionen für jede Empfehlung und ein 30-minütiges Führungskräfte-Briefing. Wenn Sie Empfehlungen umsetzen möchten, können wir als Implementierungspartner fortfahren oder ein detailliertes Briefing für Ihr internes Team übergeben. Es gibt keine Verpflichtung zur Verlängerung.",
  },
  {
    q: "Ist das Retainer eine langfristige Verpflichtung?",
    a: "Das Strategische Beratungs-Retainer erfordert eine Mindestlaufzeit von 3 Monaten, um sinnvolle Kontinuität zu gewährleisten. Danach läuft es rollierend mit 30 Tagen Kündigungsfrist. Die meisten Retainer-Kunden bleiben 12 Monate oder länger, weil der laufende Mehrwert sich aufbaut — die Umgebung wird schrittweise sicherer und kosteneffizienter.",
  },
  {
    q: "Was benötigen Sie für den Start eines Health Checks?",
    a: "Wir benötigen Global Reader-Zugriff auf Ihren Microsoft 365-Mandanten (nur Lesezugriff) und ein kurzes Briefing zu Ihrem Unternehmenskontext und Herausforderungen. Es werden keine sensiblen Geschäftsdaten abgerufen — das Audit konzentriert sich auf Konfiguration, Lizenzzuweisungen, Sicherheitseinstellungen und Governance. Eine NDA wird vor jedem Zugriff bereitgestellt.",
  },
];

export default function FAQ() {
  const locale = useLocale();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const [open, setOpen] = useState<number | null>(null);

  const items = locale === "de" ? FAQ_DE : FAQ_EN;
  const label = locale === "de" ? "Häufige Fragen" : "Common Questions";
  const heading = locale === "de" ? "Was Sie wahrscheinlich\nwissen möchten" : "What you're probably\nwondering";

  return (
    <section ref={ref} className="relative z-10 bg-bg-0 py-28 px-6">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-14"
        >
          <div className="section-label mb-4 justify-center">{label}</div>
          <h2 className="display-md text-white whitespace-pre-line">{heading}</h2>
        </motion.div>

        <div className="max-w-[720px] mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.05 * i, ease: [0.4, 0, 0.2, 1] }}
              className="border-b border-border"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group"
                aria-expanded={open === i}
              >
                <span className="font-display font-bold text-[1rem] tracking-[-0.01em] text-white group-hover:text-accent-2 transition-colors pr-6">
                  {item.q}
                </span>
                <span
                  className={[
                    "w-6 h-6 rounded-full flex items-center justify-center text-lg font-light flex-shrink-0 transition-all duration-300",
                    open === i
                      ? "bg-accent text-white rotate-45"
                      : "bg-card border border-border text-text-3",
                  ].join(" ")}
                >
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-[0.9375rem] leading-relaxed text-text-2">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
