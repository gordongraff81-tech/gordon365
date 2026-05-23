"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import NavV2 from "@/components/ui/NavV2";
import Footer from "@/components/sections/Footer";
import AmbientBg from "@/components/ui/AmbientBg";
import ScoreRing from "@/components/ui/ScoreRing";

// ── Types ──────────────────────────────────────────────────────────────────────
type Lang = "de" | "en";

interface Question {
  domain: string;
  text: string;
  bsi: string;
  dsgvo?: string;
  severity: "critical" | "high" | "medium";
  options: string[];
  scores: number[];
  impact: string;
}

// ── Domain accent colors — Apple Silicon Palette ───────────────────────────────
const DOMAIN_ACCENTS: Record<string, { color: string; glow: string; bg: string }> = {
  identity:   { color: "#6366f1", glow: "rgba(99,102,241,0.25)",  bg: "rgba(99,102,241,0.10)"  },
  ca:         { color: "#22d3ee", glow: "rgba(34,211,238,0.25)",  bg: "rgba(34,211,238,0.10)"  },
  exchange:   { color: "#a855f7", glow: "rgba(168,85,247,0.25)",  bg: "rgba(168,85,247,0.10)"  },
  sharepoint: { color: "#ec4899", glow: "rgba(236,72,153,0.25)",  bg: "rgba(236,72,153,0.10)"  },
  defender:   { color: "#f87171", glow: "rgba(248,113,113,0.25)", bg: "rgba(248,113,113,0.10)" },
  purview:    { color: "#34d399", glow: "rgba(52,211,153,0.25)",  bg: "rgba(52,211,153,0.10)"  },
  dlp:        { color: "#fb923c", glow: "rgba(251,146,60,0.25)",  bg: "rgba(251,146,60,0.10)"  },
  devices:    { color: "#38bdf8", glow: "rgba(56,189,248,0.25)",  bg: "rgba(56,189,248,0.10)"  },
  copilot:    { color: "#c084fc", glow: "rgba(192,132,252,0.25)", bg: "rgba(192,132,252,0.10)" },
  governance: { color: "#fbbf24", glow: "rgba(251,191,36,0.25)",  bg: "rgba(251,191,36,0.10)"  },
};

// ── Domain Definitions ─────────────────────────────────────────────────────────
const DOMAINS: Record<Lang, { id: string; name: string; weight: number; bsi: string; icon: string }[]> = {
  de: [
    { id: "identity",   name: "Identität & Zugriff",    weight: 15, bsi: "ORP.4",     icon: "👤" },
    { id: "ca",         name: "Bedingter Zugriff",       weight: 12, bsi: "OPS.1.1.2", icon: "🛡" },
    { id: "exchange",   name: "Exchange-Sicherheit",     weight: 10, bsi: "APP.5.3",   icon: "📧" },
    { id: "sharepoint", name: "SharePoint & OneDrive",   weight: 10, bsi: "APP.5.3",   icon: "📁" },
    { id: "defender",   name: "Microsoft Defender",      weight: 12, bsi: "OPS.1.1.3", icon: "🔍" },
    { id: "purview",    name: "Microsoft Purview",       weight: 8,  bsi: "CON.2",     icon: "📋" },
    { id: "dlp",        name: "Datenverlustprävention",  weight: 8,  bsi: "CON.2",     icon: "🔒" },
    { id: "devices",    name: "Gerätecompliance",        weight: 10, bsi: "SYS.2.1",   icon: "💻" },
    { id: "copilot",    name: "Copilot-Bereitschaft",    weight: 8,  bsi: "CON.2",     icon: "🤖" },
    { id: "governance", name: "Governance & Compliance", weight: 7,  bsi: "ISMS.1",    icon: "📊" },
  ],
  en: [
    { id: "identity",   name: "Identity & Access",       weight: 15, bsi: "ORP.4",     icon: "👤" },
    { id: "ca",         name: "Conditional Access",      weight: 12, bsi: "OPS.1.1.2", icon: "🛡" },
    { id: "exchange",   name: "Exchange Security",       weight: 10, bsi: "APP.5.3",   icon: "📧" },
    { id: "sharepoint", name: "SharePoint & OneDrive",   weight: 10, bsi: "APP.5.3",   icon: "📁" },
    { id: "defender",   name: "Microsoft Defender",      weight: 12, bsi: "OPS.1.1.3", icon: "🔍" },
    { id: "purview",    name: "Microsoft Purview",       weight: 8,  bsi: "CON.2",     icon: "📋" },
    { id: "dlp",        name: "Data Loss Prevention",    weight: 8,  bsi: "CON.2",     icon: "🔒" },
    { id: "devices",    name: "Device Compliance",       weight: 10, bsi: "SYS.2.1",   icon: "💻" },
    { id: "copilot",    name: "Copilot Readiness",       weight: 8,  bsi: "CON.2",     icon: "🤖" },
    { id: "governance", name: "Governance & Compliance", weight: 7,  bsi: "ISMS.1",    icon: "📊" },
  ],
};

// ── Questions ──────────────────────────────────────────────────────────────────
const QUESTIONS: Record<Lang, Question[]> = {
  de: [
    {
      domain: "identity", bsi: "ORP.4.A7", dsgvo: "Art. 32", severity: "critical",
      text: "Ist die Multi-Faktor-Authentifizierung für alle Benutzer über Bedingten Zugriff erzwungen?",
      options: ["Alle Benutzer via Bedingter Zugriff", "Meisten Benutzer, einige Ausnahmen", "Aktiviert, aber nicht erzwungen", "Nicht implementiert"],
      scores: [100, 60, 25, 0],
      impact: "Ohne MFA gewährt ein einziges gestohlenes Passwort vollständigen Tenant-Zugriff. Dies ist der häufigste Angriffsvektor in M365-Umgebungen.",
    },
    {
      domain: "identity", bsi: "ORP.4.A8", dsgvo: "Art. 32", severity: "critical",
      text: "Werden privilegierte Konten mit Privileged Identity Management (PIM) und zeitgesteuertem Just-in-Time-Zugriff verwaltet?",
      options: ["PIM für alle privilegierten Rollen", "PIM nur für Globale Admins", "Stehende Admin-Konten ohne PIM", "Keine Kontrollen"],
      scores: [100, 60, 20, 0],
      impact: "Dauerhafter Adminzugriff schafft eine persistente Angriffsfläche. PIM reduziert das privilegierte Expositionsrisiko um bis zu 94 %.",
    },
    {
      domain: "ca", bsi: "OPS.1.1.2.A3", dsgvo: "Art. 32", severity: "critical",
      text: "Blockieren Richtlinien für Bedingten Zugriff Legacy-Authentifizierungsprotokolle mandantenweit?",
      options: ["Vollständig blockiert", "Für die meisten Benutzer blockiert", "Einige Einschränkungen vorhanden", "Legacy-Auth weiterhin erlaubt"],
      scores: [100, 70, 30, 0],
      impact: "Legacy-Authentifizierung umgeht MFA vollständig. Über 99 % der Passwort-Spray-Angriffe nutzen diesen Weg.",
    },
    {
      domain: "ca", bsi: "OPS.1.1.2.A5", dsgvo: "Art. 32", severity: "high",
      text: "Erzwingen CA-Richtlinien die Gerätekonformität vor der Gewährung von M365-Zugriff?",
      options: ["Alle Geräte müssen Intune-konform sein", "Konformität nur für sensible Apps", "Hybrid-AD-Verknüpfung erforderlich", "Keine Gerätekonformität"],
      scores: [100, 70, 40, 0],
      impact: "Nicht verwaltete Geräte sind für 67 % erfolgreicher Ransomware-Deployments in M365-Umgebungen verantwortlich.",
    },
    {
      domain: "exchange", bsi: "APP.5.3.A9", severity: "high",
      text: "Sind DKIM und DMARC mit Reject-Richtlinien für alle Sendingdomänen konfiguriert?",
      options: ["DKIM + DMARC Reject auf allen Domänen", "DMARC Quarantine konfiguriert", "Nur DKIM, kein DMARC", "Keines konfiguriert"],
      scores: [100, 70, 30, 0],
      impact: "Ohne DMARC kann Ihre Domain für Phishing-Angriffe auf Ihre Kunden und Partner gefälscht werden.",
    },
    {
      domain: "exchange", bsi: "APP.5.3.A10", dsgvo: "Art. 32", severity: "high",
      text: "Werden E-Mail-Transportregeln regelmäßig auf unberechtigte externe Weiterleitungen geprüft?",
      options: ["Automatisches Monitoring mit Alerts", "Vierteljährliche manuelle Prüfung", "Jährliche Prüfung", "Keine Prüfung"],
      scores: [100, 60, 25, 0],
      impact: "Automatische Weiterleitungsregeln werden bei 60 % der BEC-Angriffe zur stillen Datenexfiltration eingesetzt.",
    },
    {
      domain: "sharepoint", bsi: "APP.5.3.A12", dsgvo: "Art. 25", severity: "critical",
      text: "Ist die externe Freigabe auf Mandantenebene eingeschränkt und angemessen konfiguriert?",
      options: ["Deaktiviert oder nur bekannte Mandanten", "Auth. Gäste erlaubt, keine anonymen Links", "Mit Ablaufrichtlinien konfiguriert", "Jeder mit Link kann extern teilen"],
      scores: [100, 70, 40, 0],
      impact: "Uneingeschränkte Freigabe ist das primäre Copilot-Oversharing-Risiko. KI stellt alle freigegebenen Dateien für alle Nutzer bereit.",
    },
    {
      domain: "defender", bsi: "OPS.1.1.3.A1", severity: "critical",
      text: "Ist Microsoft Defender für Endpoint P2 auf allen verwalteten Endpunkten eingesetzt?",
      options: ["MDE P2 auf allen Endpunkten inkl. Server", "MDE P1 nur auf Arbeitsstationen", "Nur Defender Antivirus, kein EDR", "Drittanbieter-AV, kein MDE"],
      scores: [100, 70, 30, 0],
      impact: "MDE bietet EDR-Fähigkeiten, die fortgeschrittene Bedrohungen in Minuten statt Tagen erkennen und eindämmen.",
    },
    {
      domain: "purview", bsi: "CON.2.A3", dsgvo: "Art. 25", severity: "high",
      text: "Sind Vertraulichkeitsbezeichnungen mit automatischer Kennzeichnung und Pflicht-Kennzeichnungsrichtlinien eingerichtet?",
      options: ["Auto-Kennzeichnung + Pflicht-Kennzeichnung aktiv", "Bezeichnungen vorhanden, nur manuell", "Bezeichnungen erstellt, selten verwendet", "Keine Vertraulichkeitsbezeichnungen"],
      scores: [100, 60, 20, 0],
      impact: "Ohne Bezeichnungen kann Copilot bei der Generierung von Antworten vertrauliche Daten nicht von öffentlichen unterscheiden.",
    },
    {
      domain: "dlp", bsi: "CON.2.A5", dsgvo: "Art. 32", severity: "high",
      text: "Sind DLP-Richtlinien für personenbezogene Daten über alle M365-Workloads aktiv?",
      options: ["Vollständig über Exchange, Teams, SharePoint und Endpoint", "Nur Exchange und SharePoint", "Einfache Richtlinien, nicht vollständig", "Keine DLP-Richtlinien"],
      scores: [100, 60, 30, 0],
      impact: "DLP verhindert die versehentliche Exfiltration sensibler Daten und ist für die DSGVO-Compliance verpflichtend.",
    },
    {
      domain: "devices", bsi: "SYS.2.1.A1", severity: "high",
      text: "Verwaltet Microsoft Intune die Compliance für alle Unternehmensendpunkte?",
      options: ["Alle Geräte registriert, Compliance-Richtlinien durchgesetzt", "Meisten Geräte, BYOD ausgenommen", "Teilweise Intune-Bereitstellung", "Keine MDM-Lösung"],
      scores: [100, 65, 30, 0],
      impact: "Nicht verwaltete Geräte sind für 67 % erfolgreicher Ransomware-Deployments in M365-Umgebungen verantwortlich.",
    },
    {
      domain: "copilot", bsi: "CON.2.A7", dsgvo: "Art. 25", severity: "critical",
      text: "Wurde eine formelle Copilot-Bereitschaftsbewertung vor der Einführung abgeschlossen?",
      options: ["Vollständige Bewertung mit dokumentierter Freigabe", "Teilbewertung, bekannte Lücken akzeptiert", "Einfache Microsoft-Checkliste überprüft", "Keine Bewertung durchgeführt"],
      scores: [100, 60, 20, 0],
      impact: "Ohne Bereitschaftsbewertung verursacht die Bereitstellung von Copilot sofortiges Oversharing vertraulicher Daten über KI-Suche.",
    },
    {
      domain: "governance", bsi: "ISMS.1.A1", dsgvo: "Art. 32", severity: "medium",
      text: "Gibt es eine dokumentierte M365-Sicherheits-Baseline nach Microsoft- oder BSI-IT-Grundschutz-Standards?",
      options: ["Dokumentiert, durchgesetzt und vierteljährlich überprüft", "Dokumentiert, aber nicht durchgesetzt", "In Entwicklung", "Keine Sicherheits-Baseline"],
      scores: [100, 60, 20, 0],
      impact: "Mandanten mit dokumentierten und durchgesetzten Baselines haben 71 % weniger erfolgreiche Angriffe.",
    },
  ],
  en: [
    {
      domain: "identity", bsi: "ORP.4.A7", dsgvo: "Art. 32", severity: "critical",
      text: "Is Multi-Factor Authentication enforced for all users via Conditional Access?",
      options: ["All users via Conditional Access", "Most users, some exceptions", "Enabled but not enforced", "Not implemented"],
      scores: [100, 60, 25, 0],
      impact: "Without MFA a single stolen password grants full tenant access. Compromised credentials are the most common M365 attack vector.",
    },
    {
      domain: "identity", bsi: "ORP.4.A8", dsgvo: "Art. 32", severity: "critical",
      text: "Are privileged accounts managed with Privileged Identity Management (PIM) and just-in-time access?",
      options: ["PIM for all privileged roles", "PIM for Global Admins only", "Standing admin accounts without PIM", "No privileged access controls"],
      scores: [100, 60, 20, 0],
      impact: "Permanent admin access creates a persistent attack surface. PIM reduces privileged exposure risk by up to 94%.",
    },
    {
      domain: "ca", bsi: "OPS.1.1.2.A3", dsgvo: "Art. 32", severity: "critical",
      text: "Are Conditional Access policies blocking legacy authentication protocols tenant-wide?",
      options: ["Fully blocked tenant-wide", "Blocked for most users", "Some restrictions in place", "Legacy auth still allowed"],
      scores: [100, 70, 30, 0],
      impact: "Legacy authentication bypasses MFA completely. Over 99% of password spray attacks use legacy auth protocols.",
    },
    {
      domain: "ca", bsi: "OPS.1.1.2.A5", dsgvo: "Art. 32", severity: "high",
      text: "Do Conditional Access policies enforce device compliance before granting M365 access?",
      options: ["All devices must be Intune-compliant", "Compliance only for sensitive apps", "Hybrid AD join required", "No device compliance requirements"],
      scores: [100, 70, 40, 0],
      impact: "Unmanaged devices are responsible for 67% of successful ransomware deployments in M365 environments.",
    },
    {
      domain: "exchange", bsi: "APP.5.3.A9", severity: "high",
      text: "Are DKIM and DMARC configured with reject policies on all sending domains?",
      options: ["DKIM + DMARC reject on all domains", "DMARC quarantine configured", "DKIM only, no DMARC", "Neither configured"],
      scores: [100, 70, 30, 0],
      impact: "Without DMARC your domain can be spoofed in phishing attacks targeting your customers and partners.",
    },
    {
      domain: "exchange", bsi: "APP.5.3.A10", dsgvo: "Art. 32", severity: "high",
      text: "Are email transport rules regularly audited for unauthorised external forwarding?",
      options: ["Automated monitoring with alerts", "Quarterly manual review", "Annual review", "No review process"],
      scores: [100, 60, 25, 0],
      impact: "Auto-forwarding rules are used in 60% of BEC attacks for silent data exfiltration.",
    },
    {
      domain: "sharepoint", bsi: "APP.5.3.A12", dsgvo: "Art. 25", severity: "critical",
      text: "Is external sharing restricted at the tenant level and appropriately configured?",
      options: ["Disabled or known tenants only", "Authenticated guests, no anonymous links", "Configured with expiry policies", "Anyone with link can share externally"],
      scores: [100, 70, 40, 0],
      impact: "Unrestricted sharing is the primary Copilot oversharing risk. AI surfaces all shared files to all users regardless of intent.",
    },
    {
      domain: "defender", bsi: "OPS.1.1.3.A1", severity: "critical",
      text: "Is Microsoft Defender for Endpoint P2 deployed on all managed endpoints?",
      options: ["MDE P2 on all endpoints including servers", "MDE P1 on workstations only", "Defender Antivirus only, no EDR", "Third-party AV, no MDE"],
      scores: [100, 70, 30, 0],
      impact: "MDE provides EDR capabilities that detect and contain advanced threats in minutes rather than days.",
    },
    {
      domain: "purview", bsi: "CON.2.A3", dsgvo: "Art. 25", severity: "high",
      text: "Are sensitivity labels configured with auto-labelling and mandatory labelling policies?",
      options: ["Auto-labelling + mandatory labelling active", "Labels exist, manual application only", "Labels created, rarely used", "No sensitivity labels"],
      scores: [100, 60, 20, 0],
      impact: "Without labels Copilot cannot distinguish confidential data from public content when generating responses.",
    },
    {
      domain: "dlp", bsi: "CON.2.A5", dsgvo: "Art. 32", severity: "high",
      text: "Are DLP policies active for personal data types across all M365 workloads?",
      options: ["Full coverage across Exchange, Teams, SharePoint and Endpoint", "Exchange and SharePoint only", "Basic policies, not fully configured", "No DLP policies"],
      scores: [100, 60, 30, 0],
      impact: "DLP prevents accidental exfiltration of sensitive data and is mandatory for GDPR compliance.",
    },
    {
      domain: "devices", bsi: "SYS.2.1.A1", severity: "high",
      text: "Does Microsoft Intune manage compliance for all corporate endpoints?",
      options: ["All devices enrolled, compliance policies enforced", "Most devices, BYOD excluded", "Partial Intune deployment", "No MDM solution in place"],
      scores: [100, 65, 30, 0],
      impact: "Unmanaged devices are responsible for 67% of successful ransomware deployments in M365 environments.",
    },
    {
      domain: "copilot", bsi: "CON.2.A7", dsgvo: "Art. 25", severity: "critical",
      text: "Has a formal Copilot readiness assessment been completed before deployment?",
      options: ["Full assessment with documented sign-off", "Partial assessment, known gaps accepted", "Basic Microsoft checklist reviewed", "No assessment conducted"],
      scores: [100, 60, 20, 0],
      impact: "Without a readiness assessment Copilot deployment immediately causes oversharing of confidential data via AI-powered search.",
    },
    {
      domain: "governance", bsi: "ISMS.1.A1", dsgvo: "Art. 32", severity: "medium",
      text: "Is there a documented M365 security baseline following Microsoft or BSI IT-Grundschutz standards?",
      options: ["Documented, enforced and quarterly reviewed", "Documented but not enforced", "In development", "No security baseline"],
      scores: [100, 60, 20, 0],
      impact: "Tenants with documented and enforced security baselines experience 71% fewer successful attacks.",
    },
  ],
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function calcScore(answers: Record<number, number>, lang: Lang): number {
  const qs = QUESTIONS[lang];
  const answered = Object.entries(answers);
  if (!answered.length) return 0;
  const total = answered.reduce((sum, [idx, optIdx]) => {
    return sum + (qs[Number(idx)]?.scores[optIdx] ?? 0);
  }, 0);
  return Math.round(total / answered.length);
}

function getMaturity(score: number, lang: Lang) {
  const levels = {
    de: [
      { min: 85, label: "Optimiert",       color: "#34d399" },
      { min: 70, label: "Gesteuert",        color: "#22d3ee" },
      { min: 55, label: "In Entwicklung",   color: "#fbbf24" },
      { min: 40, label: "Grundlegend",      color: "#fb923c" },
      { min: 0,  label: "Hohes Risiko",     color: "#f87171" },
    ],
    en: [
      { min: 85, label: "Optimized",  color: "#34d399" },
      { min: 70, label: "Managed",    color: "#22d3ee" },
      { min: 55, label: "Developing", color: "#fbbf24" },
      { min: 40, label: "Basic",      color: "#fb923c" },
      { min: 0,  label: "High Risk",  color: "#f87171" },
    ],
  };
  return levels[lang].find((l) => score >= l.min) ?? levels[lang][4];
}

// ── Domain Sidebar ─────────────────────────────────────────────────────────────
function DomainSidebar({
  lang, answers, currentQ, onJump, score,
}: {
  lang: Lang;
  answers: Record<number, number>;
  currentQ: number;
  onJump: (idx: number) => void;
  score: number;
}) {
  const domains = DOMAINS[lang];
  const questions = QUESTIONS[lang];
  const maturity = getMaturity(score, lang);

  return (
    <aside className="hidden lg:flex flex-col gap-3">
      {/* Score card */}
      <div
        className="rounded-3xl p-5 flex items-center gap-4"
        style={{
          background: "linear-gradient(135deg, rgba(8,8,20,0.98) 0%, rgba(12,8,32,0.98) 100%)",
          border: "1px solid rgba(99,102,241,0.25)",
          boxShadow: "0 0 0 1px rgba(99,102,241,0.10), 0 0 40px rgba(99,102,241,0.12), 0 16px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
        }}
      >
        <ScoreRing score={score} size={72} strokeWidth={6} label="" />
        <div>
          <div className="text-[0.6875rem] font-bold tracking-[0.08em] uppercase mb-0.5" style={{ color: "rgba(100,116,139,0.7)" }}>
            {lang === "de" ? "Live-Score" : "Live Score"}
          </div>
          <div className="font-display font-extrabold text-[1.625rem] leading-none tracking-tight" style={{ color: "#f1f5f9" }}>
            {score}
            <span className="text-[1rem] font-semibold" style={{ color: "rgba(100,116,139,0.6)" }}> / 100</span>
          </div>
          <div
            className="text-[0.75rem] font-bold mt-1"
            style={{ color: maturity.color, textShadow: `0 0 10px ${maturity.color}60` }}
          >
            {maturity.label}
          </div>
        </div>
      </div>

      {/* Domain list */}
      <div
        className="rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(8,8,20,0.98) 0%, rgba(12,8,28,0.98) 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
          <span className="text-[0.6875rem] font-bold tracking-[0.08em] uppercase" style={{ color: "rgba(100,116,139,0.7)" }}>
            {lang === "de" ? "Sicherheitsdomänen" : "Security Domains"}
          </span>
        </div>
        {domains.map((domain) => {
          const da = DOMAIN_ACCENTS[domain.id] ?? DOMAIN_ACCENTS["governance"];
          const domainQs = questions.reduce<number[]>((acc, q, i) => {
            if (q.domain === domain.id) acc.push(i);
            return acc;
          }, []);
          const answeredCount = domainQs.filter((i) => answers[i] !== undefined).length;
          const isActive = domainQs.includes(currentQ);
          const allAnswered = answeredCount === domainQs.length && domainQs.length > 0;
          const domainScore = allAnswered
            ? Math.round(domainQs.reduce((s, i) => s + (QUESTIONS[lang][i].scores[answers[i]] ?? 0), 0) / domainQs.length)
            : null;

          return (
            <button
              key={domain.id}
              onClick={() => domainQs.length > 0 && onJump(domainQs[0])}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-150 last:border-b-0 relative"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                background: isActive ? da.bg : "transparent",
                borderLeft: isActive ? `2px solid ${da.color}` : "2px solid transparent",
                paddingLeft: isActive ? "14px" : "16px",
              }}
            >
              {/* Active glow */}
              {isActive && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 80% 60% at 0% 50%, ${da.color}08 0%, transparent 70%)` }}
                />
              )}
              <span className="text-base flex-shrink-0 relative z-10">{domain.icon}</span>
              <div className="flex-1 min-w-0 relative z-10">
                <div
                  className="text-[0.8125rem] font-semibold leading-snug truncate"
                  style={{ color: isActive ? da.color : "#f1f5f9", textShadow: isActive ? `0 0 10px ${da.color}50` : "none" }}
                >
                  {domain.name}
                </div>
                <div className="text-[0.625rem] font-mono mt-0.5" style={{ color: "rgba(100,116,139,0.6)" }}>{domain.bsi}</div>
              </div>
              <div className="flex-shrink-0 text-right relative z-10">
                {domainScore !== null ? (
                  <span
                    className="text-[0.6875rem] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: domainScore >= 70 ? "rgba(52,211,153,0.12)" : domainScore >= 50 ? "rgba(251,191,36,0.12)" : "rgba(248,113,113,0.12)",
                      color: domainScore >= 70 ? "#34d399" : domainScore >= 50 ? "#fbbf24" : "#f87171",
                      textShadow: `0 0 8px ${domainScore >= 70 ? "rgba(52,211,153,0.5)" : domainScore >= 50 ? "rgba(251,191,36,0.5)" : "rgba(248,113,113,0.5)"}`,
                    }}
                  >
                    {domainScore}
                  </span>
                ) : (
                  <span className="text-[0.625rem] font-semibold" style={{ color: "rgba(100,116,139,0.5)" }}>
                    {answeredCount}/{domainQs.length}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

// ── Question Card ──────────────────────────────────────────────────────────────
function QuestionCard({
  question, qIndex, total, answer, onAnswer, onNext, onBack, lang, liveScore,
}: {
  question: Question;
  qIndex: number;
  total: number;
  answer: number | undefined;
  onAnswer: (idx: number) => void;
  onNext: () => void;
  onBack: () => void;
  lang: Lang;
  liveScore: number;
}) {
  const da = DOMAIN_ACCENTS[question.domain] ?? DOMAIN_ACCENTS["governance"];

  const sevStyle: Record<string, { color: string; bg: string; border: string }> = {
    critical: { color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.25)" },
    high:     { color: "#fbbf24", bg: "rgba(251,191,36,0.08)",  border: "rgba(251,191,36,0.25)"  },
    medium:   { color: da.color,  bg: da.bg,                    border: `${da.color}40`           },
  };
  const sev = sevStyle[question.severity];
  const sevLabel: Record<Lang, Record<string, string>> = {
    de: { critical: "Kritisch", high: "Hoch", medium: "Mittel" },
    en: { critical: "Critical", high: "High", medium: "Medium" },
  };

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(8,8,20,0.98) 0%, rgba(12,8,30,0.98) 100%)",
        border: `1px solid ${da.color}28`,
        boxShadow: `0 0 0 1px ${da.color}12, 0 0 50px ${da.glow}, 0 24px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)`,
        backdropFilter: "blur(24px)",
      }}
    >
      {/* Progress bar */}
      <div className="h-1" style={{ background: "rgba(255,255,255,0.05)" }}>
        <motion.div
          className="h-full"
          style={{ background: `linear-gradient(90deg, ${da.color}, ${da.color}bb)`, boxShadow: `0 0 8px ${da.glow}` }}
          animate={{ width: `${((qIndex + 1) / total) * 100}%` }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* Top border glow line */}
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent 0%, ${da.color}60 30%, ${da.color} 50%, ${da.color}60 70%, transparent 100%)` }} />

      {/* Header */}
      <div
        className="px-7 py-4 border-b flex flex-wrap items-center justify-between gap-2"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: `linear-gradient(135deg, ${da.color}08 0%, transparent 60%)` }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[0.6875rem] font-bold tracking-[0.08em] uppercase" style={{ color: "rgba(100,116,139,0.7)" }}>
            {lang === "de" ? `Frage ${qIndex + 1} von ${total}` : `Question ${qIndex + 1} of ${total}`}
          </span>
          <span style={{ color: "rgba(100,116,139,0.4)" }}>·</span>
          <span className="text-[0.6875rem] font-mono" style={{ color: "rgba(100,116,139,0.6)" }}>{question.bsi}</span>
          {question.dsgvo && (
            <>
              <span style={{ color: "rgba(100,116,139,0.4)" }}>·</span>
              <span className="text-[0.6875rem] font-mono" style={{ color: "rgba(100,116,139,0.6)" }}>DSGVO {question.dsgvo}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase px-2.5 py-1 rounded-full border"
            style={{ color: sev.color, background: sev.bg, borderColor: sev.border, textShadow: `0 0 8px ${sev.color}60` }}
          >
            {sevLabel[lang][question.severity]}
          </span>
          <span
            className="text-[0.6875rem] font-bold px-2.5 py-1 rounded-full border font-mono"
            style={{ color: da.color, background: da.bg, borderColor: `${da.color}40`, textShadow: `0 0 8px ${da.color}60` }}
          >
            {liveScore} / 100
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-7 py-6">
        <h3 className="font-display font-bold text-[1.125rem] leading-snug mb-6 tracking-[-0.02em]" style={{ color: "#f1f5f9" }}>
          {question.text}
        </h3>

        <div className="space-y-3 mb-6">
          {question.options.map((opt, i) => {
            const selected = answer === i;
            const scoreVal = question.scores[i];
            return (
              <button
                key={i}
                onClick={() => onAnswer(i)}
                className="w-full text-left px-4 py-3.5 rounded-xl transition-all duration-200 flex items-center gap-3"
                style={{
                  background: selected ? da.bg : "rgba(255,255,255,0.025)",
                  border: `1px solid ${selected ? da.color + "50" : "rgba(255,255,255,0.07)"}`,
                  boxShadow: selected ? `0 0 16px ${da.glow}, inset 0 1px 0 rgba(255,255,255,0.05)` : "none",
                }}
              >
                <div
                  className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all"
                  style={{
                    borderColor: selected ? da.color : "rgba(255,255,255,0.15)",
                    background: selected ? da.color : "transparent",
                  }}
                >
                  {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className="text-[0.875rem] font-medium flex-1" style={{ color: selected ? "#f1f5f9" : "rgba(203,213,225,0.75)" }}>{opt}</span>
                {selected && (
                  <span
                    className="text-[0.6875rem] font-bold font-mono flex-shrink-0"
                    style={{
                      color: scoreVal >= 80 ? "#34d399" : scoreVal >= 50 ? "#fbbf24" : "#f87171",
                      textShadow: `0 0 8px ${scoreVal >= 80 ? "rgba(52,211,153,0.6)" : scoreVal >= 50 ? "rgba(251,191,36,0.6)" : "rgba(248,113,113,0.6)"}`,
                    }}
                  >
                    {scoreVal}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Impact box — tinted with domain accent */}
        <div
          className="flex items-start gap-3 px-4 py-3.5 rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${da.color}0A 0%, transparent 80%)`,
            border: `1px solid ${da.color}22`,
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={da.color} strokeWidth="2" className="flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span className="text-[0.8125rem] leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>
            <strong className="font-semibold" style={{ color: da.color }}>
              {lang === "de" ? "Warum das wichtig ist: " : "Why this matters: "}
            </strong>
            {question.impact}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div
        className="px-7 py-4 border-t flex items-center gap-2.5"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: `linear-gradient(135deg, ${da.color}06 0%, transparent 60%)` }}
      >
        {qIndex > 0 && (
          <button onClick={onBack} className="btn-outline text-[0.875rem] py-2.5 px-4">
            ← {lang === "de" ? "Zurück" : "Back"}
          </button>
        )}
        <button
          onClick={onNext}
          disabled={answer === undefined}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[8px] font-bold text-[0.9375rem] font-body tracking-[-0.01em] transition-all duration-200"
          style={
            answer !== undefined
              ? {
                  background: `linear-gradient(135deg, ${da.color} 0%, ${da.color}cc 100%)`,
                  color: "#fff",
                  boxShadow: `0 0 24px ${da.glow}, 0 0 48px ${da.color}20`,
                }
              : {
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(148,163,184,0.3)",
                  cursor: "not-allowed",
                }
          }
        >
          {qIndex === total - 1
            ? (lang === "de" ? "Ergebnisse anzeigen" : "View Results")
            : (lang === "de" ? "Weiter" : "Continue")}
          {answer !== undefined && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

// ── Results Screen ─────────────────────────────────────────────────────────────
function ResultsScreen({
  score, answers, lang, onRestart,
}: {
  score: number;
  answers: Record<number, number>;
  lang: Lang;
  onRestart: () => void;
}) {
  const maturity = getMaturity(score, lang);
  const questions = QUESTIONS[lang];

  const posture = score >= 80 ? "strong" : score >= 55 ? "attention" : "critical";

  const postureContent = {
    de: {
      strong:    { head: "Gute Sicherheitslage", sub: "Ihre M365-Umgebung ist gut gesichert. Fokussieren Sie sich auf die verbleibenden Lücken für den nächsten Reifegrad." },
      attention: { head: "Verbesserungspotenzial erkannt", sub: "Mehrere kritische Kontrollen fehlen. Ein strukturierter 90-Tage-Plan kann Ihren Score signifikant verbessern." },
      critical:  { head: "Sofortiger Handlungsbedarf", sub: "Kritische Sicherheitslücken gefährden Ihren Tenant. Drei Maßnahmen können das größte Risiko innerhalb von 24 Stunden reduzieren." },
    },
    en: {
      strong:    { head: "Good Security Posture", sub: "Your M365 environment is well-secured. Focus on remaining gaps to reach the next maturity level." },
      attention: { head: "Room for Improvement", sub: "Several critical controls are missing. A structured 90-day plan can significantly improve your score." },
      critical:  { head: "Immediate Action Required", sub: "Critical security gaps endanger your tenant. Three actions can reduce the biggest risk within 24 hours." },
    },
  };

  const content = postureContent[lang][posture];

  const criticals = Object.entries(answers)
    .filter(([i]) => questions[Number(i)]?.severity === "critical" && (answers[Number(i)] ?? 0) >= 2).length;
  const highs = Object.entries(answers)
    .filter(([i]) => questions[Number(i)]?.severity === "high" && (answers[Number(i)] ?? 0) >= 2).length;

  const topFindings = Object.entries(answers)
    .filter(([, optIdx]) => optIdx >= 2)
    .sort(([ai], [bi]) => {
      const order: Record<string, number> = { critical: 0, high: 1, medium: 2 };
      return (order[questions[Number(ai)]?.severity ?? "medium"] ?? 2)
           - (order[questions[Number(bi)]?.severity ?? "medium"] ?? 2);
    })
    .slice(0, 4);

  const findingColors: Record<string, { dot: string; bg: string; border: string }> = {
    critical: { dot: "#f87171", bg: "rgba(248,113,113,0.07)", border: "rgba(248,113,113,0.20)" },
    high:     { dot: "#fbbf24", bg: "rgba(251,191,36,0.07)",  border: "rgba(251,191,36,0.20)"  },
    medium:   { dot: "#22d3ee", bg: "rgba(34,211,238,0.07)",  border: "rgba(34,211,238,0.20)"  },
  };

  const postureAccent = posture === "strong" ? "#34d399" : posture === "attention" ? "#fbbf24" : "#f87171";
  const postureGlow   = posture === "strong" ? "rgba(52,211,153,0.2)" : posture === "attention" ? "rgba(251,191,36,0.2)" : "rgba(248,113,113,0.2)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div
        className="rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(8,8,20,0.99) 0%, rgba(12,8,30,0.99) 100%)",
          border: `1px solid ${postureAccent}25`,
          boxShadow: `0 0 0 1px ${postureAccent}10, 0 0 60px ${postureGlow}, 0 24px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)`,
          backdropFilter: "blur(24px)",
        }}
      >
        {/* Score header */}
        <div
          className="px-7 py-6 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${postureAccent}0C 0%, rgba(99,102,241,0.06) 50%, transparent 100%)` }}
        >
          {/* Top glow border */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${postureAccent}80, transparent)` }} />
          {/* Corner ambient */}
          <div
            className="absolute rounded-full pointer-events-none opacity-30"
            style={{
              top: 0, right: 0, width: 220, height: 220,
              background: `radial-gradient(circle, ${postureAccent}, transparent)`,
              transform: "translate(30%, -30%)",
              filter: "blur(20px)",
            }}
          />
          <div className="relative z-10 flex items-center gap-6 flex-wrap">
            <ScoreRing score={score} size={96} strokeWidth={7} label={lang === "de" ? "Score" : "Score"} />
            <div>
              <div
                className="inline-flex items-center gap-1.5 text-[0.6875rem] font-bold tracking-[0.08em] uppercase px-2.5 py-1 rounded-full border mb-2"
                style={{
                  color: maturity.color,
                  borderColor: maturity.color + "40",
                  background: maturity.color + "15",
                  textShadow: `0 0 8px ${maturity.color}60`,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {maturity.label}
              </div>
              <h3 className="font-display font-bold text-[1.0625rem] mb-1 tracking-[-0.02em]" style={{ color: "#f1f5f9" }}>
                {content.head}
              </h3>
              <p className="text-[0.8125rem] leading-relaxed max-w-[300px]" style={{ color: "rgba(148,163,184,0.65)" }}>
                {content.sub}
              </p>
            </div>
          </div>
          <div className="relative z-10 flex gap-2 mt-4 flex-wrap">
            {criticals > 0 && (
              <span className="text-[0.6875rem] font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(248,113,113,0.10)", border: "1px solid rgba(248,113,113,0.25)", color: "#f87171", textShadow: "0 0 8px rgba(248,113,113,0.5)" }}>
                {criticals} {lang === "de" ? "Kritisch" : "Critical"}
              </span>
            )}
            {highs > 0 && (
              <span className="text-[0.6875rem] font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(251,191,36,0.10)", border: "1px solid rgba(251,191,36,0.25)", color: "#fbbf24", textShadow: "0 0 8px rgba(251,191,36,0.5)" }}>
                {highs} {lang === "de" ? "Hoch" : "High"}
              </span>
            )}
          </div>
        </div>

        {/* Findings */}
        {topFindings.length > 0 && (
          <div className="px-7 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="text-[0.6875rem] font-bold tracking-[0.08em] uppercase mb-3" style={{ color: "rgba(100,116,139,0.7)" }}>
              {lang === "de" ? "Wichtigste Erkenntnisse" : "Key Findings"}
            </div>
            <div className="space-y-2.5">
              {topFindings.map(([qIdx]) => {
                const q = questions[Number(qIdx)];
                if (!q) return null;
                const da = DOMAIN_ACCENTS[q.domain] ?? DOMAIN_ACCENTS["governance"];
                const fc = findingColors[q.severity];
                return (
                  <div
                    key={qIdx}
                    className="flex items-start gap-3 p-3.5 rounded-xl"
                    style={{ background: fc.bg, border: `1px solid ${fc.border}` }}
                  >
                    {/* Domain color dot */}
                    <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: da.color, boxShadow: `0 0 6px ${da.color}80` }} />
                    <div>
                      <div className="text-[0.875rem] font-semibold mb-0.5 leading-snug" style={{ color: "#f1f5f9" }}>{q.text}</div>
                      <div className="text-[0.8125rem] leading-relaxed" style={{ color: "rgba(148,163,184,0.7)" }}>{q.impact}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="px-7 py-5">
          <div
            className="rounded-2xl p-5"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(34,211,238,0.04) 100%)",
              border: "1px solid rgba(99,102,241,0.22)",
              boxShadow: "0 0 24px rgba(99,102,241,0.10)",
            }}
          >
            <div className="font-display font-bold text-[1rem] mb-1.5" style={{ color: "#f1f5f9" }}>
              {lang === "de"
                ? "Kostenloser 60-Minuten-Strategieplan"
                : "Free 60-Minute Strategy Session"}
            </div>
            <p className="text-[0.8125rem] leading-relaxed mb-4" style={{ color: "rgba(148,163,184,0.72)" }}>
              {lang === "de"
                ? "Ich analysiere Ihre Ergebnisse und erstelle gemeinsam mit Ihnen einen konkreten 90-Tage-Aktionsplan — kein Verkaufsgespräch, reine Beratung."
                : "I will analyse your results and create a concrete 90-day action plan together with you. No sales pitch — pure advisory."}
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a href="#contact" className="btn-primary text-[0.875rem] py-2.5 px-5">
                {lang === "de" ? "Strategiegespräch buchen" : "Book Strategy Call"}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <button onClick={onRestart} className="btn-outline text-[0.875rem] py-2.5 px-5">
                {lang === "de" ? "Neu starten" : "Restart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function AssessmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = ((params as unknown as { locale: string }).locale ?? "en") as Lang;
  const lang: Lang = locale === "de" ? "de" : "en";
  const questions = QUESTIONS[lang];

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const score = calcScore(answers, lang);

  function handleAnswer(optIdx: number) {
    setAnswers((prev) => ({ ...prev, [currentQ]: optIdx }));
  }

  function handleNext() {
    if (answers[currentQ] === undefined) return;
    if (currentQ === questions.length - 1) {
      setShowResults(true);
    } else {
      setCurrentQ((q) => q + 1);
    }
  }

  function handleBack() {
    if (currentQ > 0) setCurrentQ((q) => q - 1);
  }

  function handleRestart() {
    setAnswers({});
    setCurrentQ(0);
    setShowResults(false);
  }

  return (
    <>
      <AmbientBg />
      <NavV2 locale={locale} />

      <main className="relative z-10 pt-28 pb-24 px-6">
        <div className="max-w-[1100px] mx-auto" ref={ref}>

          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-[640px] mb-12"
          >
            <div className="section-label mb-4">
              {lang === "de" ? "M365 Sicherheitsbewertung" : "M365 Security Assessment"}
            </div>
            <h1 className="display-md text-text-1 mb-4">
              {lang === "de"
                ? "Microsoft 365 Security Assessment"
                : "Microsoft 365 Security Assessment"}
            </h1>
            <p className="text-[1.0625rem] leading-relaxed text-text-2">
              {lang === "de"
                ? "BSI IT-Grundschutz & DSGVO-konforme Bewertung in 10 Sicherheitsdomänen. Erhalten Sie sofort einen personalisierten Score und konkrete Handlungsempfehlungen."
                : "BSI IT-Grundschutz & GDPR-compliant assessment across 10 security domains. Get an immediate personalised score and actionable recommendations."}
            </p>
          </motion.div>

          {/* Main layout */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="grid lg:grid-cols-[280px_1fr] gap-8 items-start"
          >
            <DomainSidebar
              lang={lang}
              answers={answers}
              currentQ={currentQ}
              onJump={setCurrentQ}
              score={score}
            />

            <AnimatePresence mode="wait">
              {showResults ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <ResultsScreen
                    score={score}
                    answers={answers}
                    lang={lang}
                    onRestart={handleRestart}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={currentQ}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                >
                  <QuestionCard
                    question={questions[currentQ]}
                    qIndex={currentQ}
                    total={questions.length}
                    answer={answers[currentQ]}
                    onAnswer={handleAnswer}
                    onNext={handleNext}
                    onBack={handleBack}
                    lang={lang}
                    liveScore={score}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
