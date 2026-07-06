const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Header, Footer,
        AlignmentType, LevelFormat, TabStopType, TabStopPosition,
        HeadingLevel, BorderStyle, WidthType, ShadingType, PageBreak } = require('docx');
const fs = require('fs');

const ACCENT = "2E75B6";
const LIGHT = "EAF1F8";
const DARK = "1F2937";
const GREY = "6B7280";

const border = { style: BorderStyle.SINGLE, size: 1, color: "D7DEE6" };
const borders = { top: border, bottom: border, left: border, right: border };

function h1(text) { return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(text)] }); }
function h2(text) { return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(text)] }); }
function h3(text) { return new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(text)] }); }
function p(text, opts = {}) {
  return new Paragraph({ spacing: { after: 160 }, children: [new TextRun({ text, ...opts })] });
}
function bullet(text, bold = false) {
  return new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 60 }, children: [new TextRun({ text, bold })] });
}
function bullet2(text) {
  return new Paragraph({ numbering: { reference: "bullets", level: 1 }, spacing: { after: 40 }, children: [new TextRun({ text, size: 20, color: GREY })] });
}
function numbered(text) {
  return new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { after: 80 }, children: [new TextRun({ text })] });
}

function headerCell(text, width) {
  return new TableCell({ borders, width: { size: width, type: WidthType.DXA }, shading: { fill: ACCENT, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text, bold: true, color: "FFFFFF", size: 20 })] })] });
}
function cell(text, width, i, opts = {}) {
  return new TableCell({ borders, width: { size: width, type: WidthType.DXA }, shading: { fill: i % 2 ? LIGHT : "FFFFFF", type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text, size: 20, ...opts })] })] });
}

// ---- Cover ----
const cover = [
  new Paragraph({ spacing: { before: 2000 }, children: [] }),
  new Paragraph({ children: [new TextRun({ text: "GORDON365  ·  MICROSOFT 365 TEMPLATE", color: ACCENT, bold: true, size: 22 })] }),
  new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "MFA Rollout Kit", bold: true, size: 56, color: DARK })] }),
  new Paragraph({ spacing: { before: 300, after: 400 }, children: [
    new TextRun({ text: "Phased 3-week multi-factor authentication rollout — communication templates, pilot strategy, helpdesk FAQ, exception process, and KPI tracking for Microsoft Entra ID.", size: 26, color: GREY })
  ]}),
  new Paragraph({ spacing: { before: 600 }, children: [
    new TextRun({ text: "Product Tier:  ", bold: true, size: 22 }),
    new TextRun({ text: "Basic Template", size: 22, color: ACCENT, bold: true })
  ]}),
  new Paragraph({ children: [
    new TextRun({ text: "Price:  ", bold: true, size: 22 }),
    new TextRun({ text: "€79", size: 22, color: ACCENT, bold: true })
  ]}),
  new Paragraph({ children: [
    new TextRun({ text: "Category:  ", bold: true, size: 22 }),
    new TextRun({ text: "Security", size: 22 })
  ]}),
  new Paragraph({ children: [
    new TextRun({ text: "Required Licenses:  ", bold: true, size: 22 }),
    new TextRun({ text: "Microsoft 365 Business Basic or higher, Entra ID Free/P1/P2", size: 22 })
  ]}),
  new Paragraph({ spacing: { before: 600 }, children: [
    new TextRun({ text: "Includes: mfa-rollout-kit.json, communication-templates.md, helpdesk-faq.md", italics: true, color: GREY, size: 20 })
  ]}),
  new Paragraph({ spacing: { before: 100 }, children: [
    new TextRun({ text: "Cross-sell: Pairs with the Conditional Access Hardening Pack (CA003 enforcement step).", italics: true, color: GREY, size: 20 })
  ]}),
  new Paragraph({ children: [new PageBreak()] }),
];

// ---- Problem + Target state ----
const overview = [
  h1("1. Problem"),
  p("MFA rollouts fail for predictable, avoidable reasons: users are surprised by a sudden requirement, helpdesks are flooded with lockout tickets on day one, no pilot group exists to surface issues early, and \"temporary exceptions\" granted under pressure become permanent security holes."),
  p("Enabling MFA enforcement is a one-line policy change. Getting an entire user population through registration without chaos is the actual challenge — and it is almost always a communication and sequencing problem, not a technical one."),

  h1("2. Zielzustand (Target State)"),
  p("After completing this rollout, the tenant has 98%+ MFA registration coverage, CA003 (Require MFA for All Users) enforced, a documented and time-boxed exception process, and a helpdesk team prepared for the predictable ticket types — with KPIs in place to monitor ongoing health."),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [1400, 5460, 2500],
    rows: [
      new TableRow({ tableHeader: true, children: [
        headerCell("Phase", 1400),
        headerCell("Goal", 5460),
        headerCell("Duration", 2500),
      ]}),
      ...[
        ["0 — Preparation", "Break-glass accounts, registration campaign in report-only, pilot group defined, helpdesk briefed", "5 days"],
        ["1 — Pilot Rollout", "Enforce registration for 5–10% pilot group, validate go/no-go criteria", "5 days"],
        ["2 — Phased Full Rollout", "Wave A (40%) then Wave B (60%) registration enforcement", "8 days"],
        ["3 — Enforcement & Stabilization", "Enable CA003, monitor sign-in logs for one week", "3 days"],
      ].map(([phase, goal, dur], i) => new TableRow({ children: [
        cell(phase, 1400, i, { bold: true, color: ACCENT }),
        cell(goal, 5460, i),
        cell(dur, 2500, i),
      ]})),
    ]
  }),
  p("Total duration: 21 days (3 weeks). Tenants above 300 users should extend Phase 2 with an additional wave.", { italics: true, color: GREY, size: 20 }),
  new Paragraph({ children: [new PageBreak()] }),
];

// ---- Implementation guide ----
const implementation = [
  h1("3. Implementation Guide"),
  p("Every phase below references concrete Graph API actions from mfa-rollout-kit.json. Each task has an owner and time estimate — use this to staff the rollout realistically."),

  h2("3.1 Prerequisites"),
  bullet("Microsoft Entra ID (Free, P1, or P2 — registration campaigns work on all tiers)"),
  bullet("Global Administrator or Authentication Policy Administrator role"),
  bullet("At least 2 break-glass emergency access accounts (see CA Hardening Pack, Section 6, if not already created)"),
  bullet("Helpdesk team briefed using helpdesk-faq.md before Phase 1 begins"),
  bullet("Pilot group of 5-10% of users identified per pilotGroupConcept (see Section 5)"),

  h2("3.2 Phase 0 — Preparation (5 days)"),
  p("Configure the registration campaign in report-only mode and prepare all communications before any user is affected."),
  numbered("Create break-glass emergency access accounts — 2 cloud-only accounts, Global Administrator role, excluded from all policies (1h)"),
  numbered("Enable Authentication Methods Registration Campaign in report-only mode via PATCH /policies/authenticationMethodsPolicy (0.5h)"),
  numbered("Create the 'MFA-Pilot-Group' security group and add members per the pilot group concept (1h)"),
  numbered("Send the Announcement email template to all users — 5 days before pilot starts (0.5h)"),
  numbered("Brief the helpdesk team using helpdesk-faq.md, walk through the top 5 expected ticket types (1h)"),

  h2("3.3 Phase 1 — Pilot Rollout (5 days)"),
  p("Enforce registration for the pilot group only. This is the most important phase — issues found here are cheap to fix; issues found during Phase 2 are expensive."),
  numbered("Apply registration campaign enforcement scoped to 'MFA-Pilot-Group', snoozeDurationInDays = 1 (0.5h)"),
  numbered("Send PilotActionRequired email to the pilot group (0.25h)"),
  numbered("Check registration rate daily via GET /reports/authenticationMethods/userRegistrationDetails — target 90%+ by day 4 (0.25h/day)"),
  numbered("Collect pilot feedback directly — short survey or follow-up conversations (1h)"),

  h3("Go/No-Go Criteria before proceeding to Phase 2"),
  bullet("Pilot group registration rate ≥ 90%"),
  bullet("No critical break-glass account lockouts"),
  bullet("Helpdesk ticket volume manageable — fewer than 1 ticket per 5 pilot users"),
  bullet("No legacy line-of-business application broken by the MFA requirement"),
  p("If any criterion fails: pause, address the root cause, extend the pilot by a few days. Do not proceed to Phase 2 under pressure — issues at pilot scale (10 users) are manageable; the same issues at full scale (200+ users) are not.", { italics: true, color: GREY, size: 20 }),

  h2("3.4 Phase 2 — Phased Full Rollout (8 days)"),
  p("Roll out to the remaining users in two waves: Wave A (next 40%) and Wave B (remaining 60%, including resolved exceptions from Wave A)."),
  numbered("Wave A — apply registration campaign to the next 40% of users (0.5h)"),
  numbered("Send ActionRequired email to Wave A with T-1 day notice (0.25h)"),
  numbered("Monitor Wave A for 3 days, apply exception process for flagged accounts (0.5h/day)"),
  numbered("Wave B — apply registration campaign to all remaining users (0.5h)"),
  numbered("Send ActionRequired email to Wave B with T-1 day notice (0.25h)"),
  numbered("Send FinalReminder to any users still below registration threshold, snoozeDurationInDays = 0 (0.25h)"),

  h2("3.5 Phase 3 — Enforcement & Stabilization (3 days)"),
  p("Switch from registration enforcement to actual MFA requirement at sign-in via Conditional Access."),
  numbered("Verify tenant-wide registration ≥ 98% (excluding approved exceptions) before proceeding (0.5h)"),
  numbered("Enable CA003 (Require MFA for All Users) — switch from report-only to On. This is the same policy defined in the Conditional Access Hardening Pack (0.25h)", { }),
  numbered("Send RolloutComplete email to all users (0.25h)"),
  numbered("Monitor sign-in logs daily for one week for MFA-related failures (0.5h/day)"),

  new Paragraph({ spacing: { before: 100 }, children: [
    new TextRun({ text: "Cross-product note: ", bold: true, color: ACCENT }),
    new TextRun({ text: "Step 3.5.2 (enabling CA003) requires the policy definition from the Conditional Access Hardening Pack (€149). If you don't own that pack yet, you can create CA003 manually using the JSON structure documented there, or purchase the pack for the full 10-policy set plus this enforcement step pre-defined.", color: GREY })
  ]}),

  new Paragraph({ children: [new PageBreak()] }),
];

// ---- Pilot group + exceptions ----
const pilotAndExceptions = [
  h1("4. Pilotgruppen-Konzept"),
  p("The pilot group is the single highest-leverage decision in this rollout. A well-chosen group of 5-10 people surfaces 90% of the issues the full population would otherwise hit."),

  h2("4.1 Size Recommendation"),
  p("5–10% of total user count, minimum 5 users, maximum 25 for tenants up to 300 users."),

  h2("4.2 Selection Criteria"),
  bullet("Include at least 2 IT/helpdesk staff — early feedback, technical fluency to diagnose issues"),
  bullet("Include 1-2 executives or department heads — visible champions smooth the broader rollout"),
  bullet("Include a mix of device types — Windows, Mac, and mobile-only users"),
  bullet("Include at least 1 less tech-comfortable user — surfaces UX issues that would otherwise affect everyone else during full rollout"),
  bullet("Avoid anyone on critical deadline work during the pilot week (e.g. finance during month-end close)"),

  h2("4.3 Group Setup"),
  p("Create a dedicated Entra ID security group (e.g. 'MFA-Pilot-Group') via the /groups endpoint, add selected members via /groups/{id}/members/$ref. A dedicated group allows the registration campaign to be scoped precisely, and makes rollback trivial if the pilot surfaces blocking issues."),

  h1("5. Ausnahme- und Break-Glass-Prozess"),
  h2("5.1 Grundprinzip"),
  p("Exceptions should be rare, time-boxed, and documented. An exception is never permanent without a documented compensating control."),

  h2("5.2 Valid Exception Reasons"),
  bullet("Service accounts that cannot perform interactive MFA — handled via Conditional Access app/service principal exclusions, never user exclusions"),
  bullet("Shared/kiosk devices with a single shared account — recommend migrating to dedicated accounts + Temporary Access Pass instead of exclusion"),
  bullet("Temporary technical limitation (e.g. legacy line-of-business app pending vendor update) — must have a remediation deadline"),

  h2("5.3 Invalid Exception Reasons"),
  bullet("\"User doesn't want to install an app on their personal phone\" — offer hardware token or phone call/SMS instead, do not exempt", true),
  bullet("\"It's inconvenient\" — not a valid exception under any circumstance", true),
  bullet("Executive requesting blanket exemption — escalate to documented risk acceptance signed by leadership, time-boxed to 30 days maximum", true),

  h2("5.4 Process"),
  numbered("Exception request submitted with business justification and proposed expiry date"),
  numbered("IT Admin reviews against valid/invalid reason lists"),
  numbered("If approved: account added to dedicated 'MFA-Exception-Approved' group with documented expiry date in audit log"),
  numbered("Exception group excluded only from the specific policy needed — never from all security policies"),
  numbered("Exception reviewed at expiry — renewed only with updated justification, or remediated"),

  h2("5.5 Break-Glass vs. Exceptions — Critical Distinction"),
  p("Break-glass emergency access accounts (see Conditional Access Hardening Pack, Section 6) are NOT MFA exceptions. Break-glass accounts exist for emergency admin access only, are never used for daily work, and are excluded from ALL conditional access and registration policies permanently. Treating a regular user's MFA exception as a \"break-glass situation\" is a common and serious misconfiguration.", { italics: true }),

  new Paragraph({ children: [new PageBreak()] }),
];

// ---- KPIs ----
const kpis = [
  h1("6. Erfolgsmetriken und KPI-Definitionen"),
  p("Track these six metrics throughout the rollout and for ongoing operations afterward. Each has a defined Graph API source where applicable."),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2400, 4160, 2800],
    rows: [
      new TableRow({ tableHeader: true, children: [
        headerCell("Metric", 2400),
        headerCell("Target", 4160),
        headerCell("Tracking Frequency", 2800),
      ]}),
      ...[
        ["MFA Registration Rate", "98%+ before enforcement (Phase 3)", "Daily during rollout, weekly after"],
        ["Helpdesk Ticket Volume (MFA)", "< 1 per 5 users (pilot), < 1 per 10 users (full rollout)", "Daily during rollout"],
        ["Authentication Method Diversity", "70%+ of users with 2+ methods within 60 days", "Monthly post-rollout"],
        ["MFA Sign-In Success Rate", "95%+", "Weekly"],
        ["Active Exceptions Count", "< 2% of total users, trending to 0", "Monthly"],
        ["Time to Enforcement", "21 days per this plan (longer for >300 users)", "Once per rollout"],
      ].map(([m, t, f], i) => new TableRow({ children: [
        cell(m, 2400, i, { bold: true }),
        cell(t, 4160, i),
        cell(f, 2800, i, { color: GREY }),
      ]})),
    ]
  }),
  p("Graph API source for registration rate and method diversity: GET /reports/authenticationMethods/userRegistrationDetails. Sign-in success rate: Entra sign-in logs filtered by 'Authentication requirement = Multifactor authentication'.", { italics: true, color: GREY, size: 20 }),

  new Paragraph({ children: [new PageBreak()] }),
];

// ---- DSC + closing ----
const closing = [
  h1("7. Microsoft365DSC Mapping (Phase 2 — Ready, Not Yet Active)"),
  p("This kit's registration campaign configuration maps to the AADAuthenticationMethodPolicyAuthenticator resource in Microsoft365DSC. The final enforcement step (enabling CA003) maps to the AADConditionalAccessPolicy resource already defined in the Conditional Access Hardening Pack."),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [4680, 4680],
    rows: [
      new TableRow({ tableHeader: true, children: [
        new TableCell({ borders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: "9CA3AF", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "Component", bold: true, color: "FFFFFF" })] })] }),
        new TableCell({ borders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: "9CA3AF", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "DSC Resource (Phase 2)", bold: true, color: "FFFFFF" })] })] }),
      ]}),
      ...[
        ["authenticationMethodsRegistrationCampaign", "AADAuthenticationMethodPolicyAuthenticator"],
        ["CA003 enforcement (enf002)", "AADConditionalAccessPolicy — shared with CA Hardening Pack"],
      ].map(([a, b], i) => new TableRow({ children: [
        new TableCell({ borders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: i % 2 ? LIGHT : "FFFFFF", type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: a, font: "Courier New", size: 19 })] })] }),
        new TableCell({ borders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: i % 2 ? LIGHT : "FFFFFF", type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: b, font: "Courier New", size: 19 })] })] }),
      ]})),
    ]
  }),
  new Paragraph({ spacing: { before: 200 }, children: [
    new TextRun({ text: "Status: ", bold: true }),
    new TextRun({ text: "Mapping defined, not yet executable. Phase 2 will provide a combined .ps1 DSC configuration covering both this kit and the Conditional Access Hardening Pack, since the enforcement step (enf002) is shared between the two products.", color: GREY })
  ]}),

  h1("8. Bundle & Cross-Sell"),
  p("This kit is designed to work standalone, but reaches a hard dependency at Phase 3 (enf002): enabling CA003 requires the policy definition from the Conditional Access Hardening Pack. Customers without that pack can create CA003 manually using the documented JSON structure, but most will prefer purchasing both together."),
  new Paragraph({ spacing: { before: 100 }, children: [
    new TextRun({ text: "Recommended bundle: ", bold: true, color: ACCENT }),
    new TextRun({ text: "Security & Compliance Starter Bundle (€549) includes both this kit and the CA Hardening Pack — see gordon365.com/templates/bundle for the full bundle contents.", color: GREY })
  ]}),

  h1("9. Support & Updates"),
  p("This product includes lifetime updates as Microsoft changes authentication method policies and registration campaign capabilities. Questions about implementation: support@gordon365.com"),
];

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22, color: DARK } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: DARK },
        paragraph: { spacing: { before: 320, after: 200 }, outlineLevel: 0,
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 4 } } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: ACCENT },
        paragraph: { spacing: { before: 220, after: 120 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 23, bold: true, font: "Arial", color: DARK },
        paragraph: { spacing: { before: 160, after: 100 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets",
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
          { level: 1, format: LevelFormat.BULLET, text: "–", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 1080, hanging: 360 } } } },
        ] },
      { reference: "numbers",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [{
    properties: {
      page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 } }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "D7DEE6", space: 1 } },
          children: [
            new TextRun({ text: "Gordon365", bold: true, color: ACCENT, size: 18 }),
            new TextRun({ text: "\tMFA Rollout Kit", color: GREY, size: 18 }),
          ]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          children: [
            new TextRun({ text: "© Gordon365 — All rights reserved", color: GREY, size: 16 }),
            new TextRun({ text: "gordon365.com/templates/mfa-rollout-kit", color: GREY, size: 16 }),
          ]
        })]
      })
    },
    children: [
      ...cover,
      ...overview,
      ...implementation,
      ...pilotAndExceptions,
      ...kpis,
      ...closing,
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/claude/products/mfa-rollout-kit/1.0.0/mfa-rollout-kit-guide.docx", buffer);
  console.log("done");
});
