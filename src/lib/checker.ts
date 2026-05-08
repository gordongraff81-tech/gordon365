export type AnswerValue = "yes" | "partial" | "no" | "unknown";
export type QuestionId = 1 | 2 | 3 | 4 | 5;
export type Answers = Partial<Record<QuestionId, AnswerValue>>;

export const TOTAL_QUESTIONS = 5;

export const SCORE_PENALTIES: Record<QuestionId, Record<AnswerValue, number>> = {
  1: { yes: 0,  partial: -15, no: -25, unknown: -15 }, // MFA
  2: { yes: 0,  partial: -10, no: -20, unknown: -10 }, // Conditional Access
  3: { yes: 0,  partial: -10, no: -20, unknown: -12 }, // Legacy Auth
  4: { yes: 0,  partial: -8,  no: -18, unknown: -10 }, // External Sharing
  5: { yes: 0,  partial: -7,  no: -15, unknown: -8  }, // Sensitivity Labels
};

export function calculateScore(answers: Answers): number {
  let score = 100;
  for (let q = 1 as QuestionId; q <= TOTAL_QUESTIONS; q++) {
    const answer = answers[q] ?? "unknown";
    score += SCORE_PENALTIES[q][answer];
  }
  return Math.max(0, Math.min(100, score));
}

export type FindingSeverity = "critical" | "warning" | "ok";

export interface Finding {
  severity: FindingSeverity;
  titleKey: string;
  descKey: string;
}

// Finding configurations per question per answer
export const FINDINGS: Record<QuestionId, Partial<Record<AnswerValue, Finding>>> = {
  1: {
    yes: undefined, // no finding for perfect answer
    partial: {
      severity: "warning",
      titleKey: "finding.mfa.partial.title",
      descKey: "finding.mfa.partial.desc",
    },
    no: {
      severity: "critical",
      titleKey: "finding.mfa.no.title",
      descKey: "finding.mfa.no.desc",
    },
    unknown: {
      severity: "warning",
      titleKey: "finding.mfa.unknown.title",
      descKey: "finding.mfa.unknown.desc",
    },
  },
  2: {
    yes: {
      severity: "ok",
      titleKey: "finding.ca.yes.title",
      descKey: "finding.ca.yes.desc",
    },
    partial: {
      severity: "warning",
      titleKey: "finding.ca.partial.title",
      descKey: "finding.ca.partial.desc",
    },
    no: {
      severity: "critical",
      titleKey: "finding.ca.no.title",
      descKey: "finding.ca.no.desc",
    },
    unknown: {
      severity: "warning",
      titleKey: "finding.ca.unknown.title",
      descKey: "finding.ca.unknown.desc",
    },
  },
  3: {
    yes: {
      severity: "ok",
      titleKey: "finding.la.yes.title",
      descKey: "finding.la.yes.desc",
    },
    partial: {
      severity: "warning",
      titleKey: "finding.la.partial.title",
      descKey: "finding.la.partial.desc",
    },
    no: {
      severity: "critical",
      titleKey: "finding.la.no.title",
      descKey: "finding.la.no.desc",
    },
    unknown: {
      severity: "warning",
      titleKey: "finding.la.unknown.title",
      descKey: "finding.la.unknown.desc",
    },
  },
  4: {
    yes: {
      severity: "ok",
      titleKey: "finding.es.yes.title",
      descKey: "finding.es.yes.desc",
    },
    partial: {
      severity: "warning",
      titleKey: "finding.es.partial.title",
      descKey: "finding.es.partial.desc",
    },
    no: {
      severity: "critical",
      titleKey: "finding.es.no.title",
      descKey: "finding.es.no.desc",
    },
    unknown: {
      severity: "warning",
      titleKey: "finding.es.unknown.title",
      descKey: "finding.es.unknown.desc",
    },
  },
  5: {
    yes: {
      severity: "ok",
      titleKey: "finding.sl.yes.title",
      descKey: "finding.sl.yes.desc",
    },
    partial: {
      severity: "warning",
      titleKey: "finding.sl.partial.title",
      descKey: "finding.sl.partial.desc",
    },
    no: {
      severity: "critical",
      titleKey: "finding.sl.no.title",
      descKey: "finding.sl.no.desc",
    },
    unknown: {
      severity: "warning",
      titleKey: "finding.sl.unknown.title",
      descKey: "finding.sl.unknown.desc",
    },
  },
};

// Hardcoded finding text (English + German handled by inline logic in component)
export const FINDING_TEXT: Record<
  string,
  { en: { title: string; desc: string }; de: { title: string; desc: string } }
> = {
  "finding.mfa.partial": {
    en: {
      title: "MFA partially deployed",
      desc: "Accounts without MFA are at high risk of compromise. Enforce MFA universally via Conditional Access — including shared mailboxes and service accounts.",
    },
    de: {
      title: "MFA teilweise eingesetzt",
      desc: "Konten ohne MFA sind einem hohen Kompromittierungsrisiko ausgesetzt. Erzwingen Sie MFA über Conditional Access — einschließlich freigegebener Postfächer und Dienstkonten.",
    },
  },
  "finding.mfa.no": {
    en: {
      title: "MFA not enforced — critical risk",
      desc: "Without MFA, a single compromised password grants full account access. Enable Security Defaults or Conditional Access MFA immediately across all user accounts.",
    },
    de: {
      title: "MFA nicht erzwungen — kritisches Risiko",
      desc: "Ohne MFA ermöglicht ein einziges kompromittiertes Passwort vollen Kontozugriff. Aktivieren Sie sofort Security Defaults oder Conditional Access MFA für alle Benutzerkonten.",
    },
  },
  "finding.mfa.unknown": {
    en: {
      title: "MFA status unverified",
      desc: "An unverified MFA posture is itself a risk signal. Review your Conditional Access policies in the Entra ID portal and confirm full coverage of all user accounts.",
    },
    de: {
      title: "MFA-Status nicht verifiziert",
      desc: "Ein nicht verifizierter MFA-Status ist selbst ein Risikoindikator. Überprüfen Sie Ihre Conditional Access-Richtlinien im Entra ID-Portal und bestätigen Sie die vollständige Abdeckung.",
    },
  },
  "finding.ca.yes": {
    en: {
      title: "Conditional Access configured",
      desc: "Well configured. Review and test policies quarterly as your user base and risk profile evolves. Consider adding sign-in risk and device compliance conditions.",
    },
    de: {
      title: "Conditional Access konfiguriert",
      desc: "Gut konfiguriert. Überprüfen und testen Sie Richtlinien vierteljährlich, wenn sich Ihre Benutzerbasis und Ihr Risikoprofil weiterentwickeln.",
    },
  },
  "finding.ca.partial": {
    en: {
      title: "Conditional Access partially configured",
      desc: "Basic policies leave significant gaps. Expand to cover device compliance, sign-in risk, location-based access, and session controls for sensitive applications.",
    },
    de: {
      title: "Conditional Access teilweise konfiguriert",
      desc: "Grundlegende Richtlinien lassen erhebliche Lücken. Erweitern Sie auf Geräte-Compliance, Anmelderisiko, standortbasiertem Zugriff und Sitzungskontrollen.",
    },
  },
  "finding.ca.no": {
    en: {
      title: "No Conditional Access in place",
      desc: "Without Conditional Access you have no Zero Trust access controls. Prioritise deploying core policies: MFA for all users, block legacy auth, require compliant devices.",
    },
    de: {
      title: "Kein Conditional Access vorhanden",
      desc: "Ohne Conditional Access haben Sie keine Zero-Trust-Zugriffskontrollen. Priorisieren Sie die Bereitstellung von Kernrichtlinien: MFA für alle Benutzer, Legacy-Auth blockieren, konforme Geräte erfordern.",
    },
  },
  "finding.ca.unknown": {
    en: {
      title: "Conditional Access status unclear",
      desc: "Check your Entra ID portal under Security > Conditional Access. Even a single misconfigured policy in report-only mode needs review before it can protect you.",
    },
    de: {
      title: "Conditional Access-Status unklar",
      desc: "Überprüfen Sie Ihr Entra ID-Portal unter Sicherheit > Conditional Access. Selbst eine einzige falsch konfigurierte Richtlinie im Nur-Bericht-Modus benötigt eine Überprüfung.",
    },
  },
  "finding.la.yes": {
    en: {
      title: "Legacy authentication blocked",
      desc: "Excellent. Regularly verify that no new legacy auth connections appear in your sign-in logs. Review the Entra ID sign-in workbook monthly.",
    },
    de: {
      title: "Legacy-Authentifizierung blockiert",
      desc: "Ausgezeichnet. Überprüfen Sie regelmäßig, dass keine neuen Legacy-Auth-Verbindungen in Ihren Anmeldeprotokollen erscheinen.",
    },
  },
  "finding.la.partial": {
    en: {
      title: "Legacy auth partially active",
      desc: "Any active legacy auth protocol creates an MFA bypass vector. Identify remaining protocols using the Sign-in diagnostic workbook in Entra ID and block them all.",
    },
    de: {
      title: "Legacy-Auth teilweise aktiv",
      desc: "Jedes aktive Legacy-Auth-Protokoll schafft einen MFA-Bypass-Vektor. Identifizieren Sie verbleibende Protokolle im Entra ID-Anmeldediagnose-Workbook und blockieren Sie alle.",
    },
  },
  "finding.la.no": {
    en: {
      title: "Legacy auth active — high exposure",
      desc: "Legacy authentication bypasses MFA entirely and is exploited in most password spray attacks. Block it via Conditional Access or Authentication Policy immediately.",
    },
    de: {
      title: "Legacy-Auth aktiv — hohes Risiko",
      desc: "Legacy-Authentifizierung umgeht MFA vollständig und wird bei den meisten Passwort-Spray-Angriffen ausgenutzt. Blockieren Sie es sofort über Conditional Access oder Authentifizierungsrichtlinie.",
    },
  },
  "finding.la.unknown": {
    en: {
      title: "Legacy auth status unknown",
      desc: "Review the Entra ID Sign-in logs filtered by legacy auth clients. Any results indicate active legacy protocols that create MFA bypass vulnerabilities.",
    },
    de: {
      title: "Legacy-Auth-Status unbekannt",
      desc: "Überprüfen Sie die Entra ID-Anmeldeprotokolle gefiltert nach Legacy-Auth-Clients. Jedes Ergebnis zeigt aktive Legacy-Protokolle an, die MFA-Bypass-Schwachstellen erzeugen.",
    },
  },
  "finding.es.yes": {
    en: {
      title: "External sharing appropriately restricted",
      desc: "Good posture. Review sharing policies annually to ensure they still match your business and compliance requirements. Audit existing shared links regularly.",
    },
    de: {
      title: "Externe Freigabe angemessen eingeschränkt",
      desc: "Gute Sicherheitslage. Überprüfen Sie Freigaberichtlinien jährlich, um sicherzustellen, dass sie Ihren Geschäfts- und Compliance-Anforderungen entsprechen.",
    },
  },
  "finding.es.partial": {
    en: {
      title: "Sharing restrictions could be tighter",
      desc: "Consider restricting external sharing to specific domains and requiring authentication for all external access. Review and audit existing 'Anyone' links across your tenant.",
    },
    de: {
      title: "Freigabebeschränkungen könnten strenger sein",
      desc: "Erwägen Sie, externe Freigaben auf bestimmte Domänen zu beschränken und für jeden externen Zugriff eine Authentifizierung zu verlangen.",
    },
  },
  "finding.es.no": {
    en: {
      title: "External sharing unrestricted — data exposure risk",
      desc: "Anyone with a link can access your files without authentication. This is a significant GDPR/DSGVO exposure. Tighten SharePoint and OneDrive sharing policies immediately.",
    },
    de: {
      title: "Externe Freigabe uneingeschränkt — Datenleck-Risiko",
      desc: "Jeder mit einem Link kann ohne Authentifizierung auf Ihre Dateien zugreifen. Dies ist ein erhebliches DSGVO-Risiko. Verschärfen Sie sofort die SharePoint- und OneDrive-Freigaberichtlinien.",
    },
  },
  "finding.es.unknown": {
    en: {
      title: "Sharing policy status unknown",
      desc: "Check SharePoint Admin Center > Policies > Sharing. Review the tenant-level external sharing setting and audit existing anonymous 'Anyone' links across the tenant.",
    },
    de: {
      title: "Freigaberichtlinien-Status unbekannt",
      desc: "Überprüfen Sie SharePoint Admin Center > Richtlinien > Freigabe. Überprüfen Sie die mandantenweite Einstellung für externe Freigaben und prüfen Sie vorhandene anonyme Links.",
    },
  },
  "finding.sl.yes": {
    en: {
      title: "Sensitivity labels deployed",
      desc: "Strong foundation for Copilot and data compliance. Ensure labels are enforced and that auto-labelling policies are progressively covering older content.",
    },
    de: {
      title: "Vertraulichkeitsbezeichnungen eingesetzt",
      desc: "Solides Fundament für Copilot und Daten-Compliance. Stellen Sie sicher, dass Bezeichnungen erzwungen werden und Auto-Beschriftungsrichtlinien schrittweise ältere Inhalte abdecken.",
    },
  },
  "finding.sl.partial": {
    en: {
      title: "Labels exist but adoption is low",
      desc: "Low label adoption means most data is unclassified — limiting both compliance value and Copilot safety. Drive adoption through auto-labelling policies and targeted user training.",
    },
    de: {
      title: "Bezeichnungen vorhanden, Nutzung gering",
      desc: "Geringe Bezeichnungsnutzung bedeutet, dass die meisten Daten unklassifiziert sind — was sowohl den Compliance-Wert als auch die Copilot-Sicherheit einschränkt.",
    },
  },
  "finding.sl.no": {
    en: {
      title: "No sensitivity labels — Copilot deployment blocked",
      desc: "Without sensitivity labels, deploying Copilot creates a serious oversharing risk. Labels are a hard prerequisite for safe AI adoption and GDPR/DSGVO data governance.",
    },
    de: {
      title: "Keine Vertraulichkeitsbezeichnungen — Copilot-Deployment blockiert",
      desc: "Ohne Vertraulichkeitsbezeichnungen schafft das Deployment von Copilot ein ernsthaftes Überteilungsrisiko. Bezeichnungen sind eine zwingende Voraussetzung für sichere KI-Adoption.",
    },
  },
  "finding.sl.unknown": {
    en: {
      title: "Label deployment status unknown",
      desc: "Check Microsoft Purview > Information Protection > Labels. If no labels exist, this is a significant governance and Copilot readiness gap that must be addressed before AI rollout.",
    },
    de: {
      title: "Bezeichnungsstatus unbekannt",
      desc: "Überprüfen Sie Microsoft Purview > Informationsschutz > Bezeichnungen. Fehlende Bezeichnungen sind eine erhebliche Governance- und Copilot-Bereitschaftslücke.",
    },
  },
};
