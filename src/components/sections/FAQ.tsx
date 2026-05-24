"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";

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
  {
    q: "What does the Modern Workplace Platform Factory actually deploy?",
    a: "The platform runs 22 fully automated steps against a fresh or existing M365 tenant: a Break-Glass account with Global Admin role, six Entra ID security groups (including dynamic device and user groups), Autopilot User-Driven deployment profiles with Pre-Provisioning, BitLocker XTS-AES 256, Defender baselines with ASR rules, Windows LAPS, Windows Hello for Business Cloud Trust, a Firewall baseline, Compliance and Conditional Access policies (Report-only until tested), M365 Apps Enterprise, Teams, Edge and Company Portal via WinGet. Every step is idempotent — the script can be re-run without duplicating objects.",
  },
  {
    q: "What is Drift Detection and why does it matter?",
    a: "Drift Detection is a daily automated check — running at 06:00 UTC — that compares every Intune policy in the tenant against the templates defined in the platform configuration. If an admin has manually changed a policy in the portal, or an update has altered a setting, the system flags the deviation immediately. This prevents silent security regressions. Clients running the platform on the monthly retainer receive drift reports as part of proactive monitoring. Detected drift is remediated by re-running the bootstrap, which restores the desired state.",
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
  {
    q: "Was stellt die Modern Workplace Platform Factory konkret bereit?",
    a: "Die Plattform führt 22 vollautomatische Schritte gegen einen frischen oder bestehenden M365-Mandanten aus: ein Break-Glass-Konto mit Global Admin-Rolle, sechs Entra ID Sicherheitsgruppen (inklusive dynamischer Geräte- und Benutzergruppen), Autopilot User-Driven Deployment Profile mit Pre-Provisioning, BitLocker XTS-AES 256, Defender-Baselines mit ASR-Regeln, Windows LAPS, Windows Hello for Business Cloud Trust, eine Firewall-Baseline, Compliance- und Conditional Access-Richtlinien (Report-only bis zum Test), M365 Apps Enterprise, Teams, Edge und Company Portal via WinGet. Jeder Schritt ist idempotent — das Script kann beliebig oft ausgeführt werden, ohne Objekte zu duplizieren.",
  },
  {
    q: "Was ist Drift Detection und warum ist sie wichtig?",
    a: "Drift Detection ist ein täglich um 06:00 UTC laufender automatischer Check, der jede Intune-Richtlinie im Mandanten mit den in der Plattformkonfiguration definierten Templates vergleicht. Hat ein Administrator manuell eine Richtlinie im Portal geändert oder hat ein Update eine Einstellung verändert, meldet das System die Abweichung sofort. Das verhindert stille Sicherheitsregressionen. Kunden, die die Plattform im monatlichen Retainer betreiben, erhalten Drift-Berichte als Teil des proaktiven Monitorings. Erkannte Abweichungen werden durch erneutes Ausführen des Bootstraps behoben, was den gewünschten Soll-Zustand wiederherstellt.",
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
    <section ref={ref} id="faq" className="relative z-10 bg-bg-0 py-28 px-6">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-14"
        >
          <div className="section-label mb-4 justify-center">{label}</div>
          <h2 className="display-md text-text-1 whitespace-pre-line">{heading}</h2>
        </motion.div>

        <div className="max-w-[720px] mx-auto">
          {items.map((item, i) => {
            const isOpen = open === i;
            // Cycling accent colors per item
            const accents = ["#6366f1", "#22d3ee", "#a855f7", "#ec4899", "#6366f1", "#22d3ee"];
            const accent = accents[i % accents.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.05 * i, ease: [0.4, 0, 0.2, 1] }}
                className="border-b"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-display font-bold text-[1rem] tracking-[-0.01em] pr-6 transition-colors duration-200"
                    style={{ color: isOpen ? accent : "#f1f5f9" }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-lg font-light flex-shrink-0 transition-all duration-300"
                    style={
                      isOpen
                        ? {
                            background: `linear-gradient(135deg, ${accent}30 0%, ${accent}15 100%)`,
                            border: `1px solid ${accent}50`,
                            color: accent,
                            transform: "rotate(45deg)",
                            boxShadow: `0 0 12px ${accent}40`,
                          }
                        : {
                            background: "rgba(12,12,24,0.8)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "rgba(148,163,184,0.6)",
                          }
                    }
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-[0.9375rem] leading-relaxed" style={{ color: "rgba(148,163,184,0.72)" }}>
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
