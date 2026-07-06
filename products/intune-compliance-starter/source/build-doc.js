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
function numbered(text) {
  return new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { after: 80 }, children: [new TextRun({ text })] });
}

function headerCell(text, width) {
  return new TableCell({ borders, width: { size: width, type: WidthType.DXA }, shading: { fill: ACCENT, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text, bold: true, color: "FFFFFF", size: 20 })] })] });
}
function cell(text, width, i, opts = {}) {
  return new TableCell({ borders, width: { size: width, type: WidthType.DXA }, shading: { fill: i % 2 ? LIGHT : "FFFFFF", type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text, size: 20, ...opts })] })] });
}
function greyHeaderCell(text, width) {
  return new TableCell({ borders, width: { size: width, type: WidthType.DXA }, shading: { fill: "9CA3AF", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text, bold: true, color: "FFFFFF", size: 20 })] })] });
}
function monoCell(text, width, i) {
  return new TableCell({ borders, width: { size: width, type: WidthType.DXA }, shading: { fill: i % 2 ? LIGHT : "FFFFFF", type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text, font: "Courier New", size: 19 })] })] });
}

// ---- Cover ----
const cover = [
  new Paragraph({ spacing: { before: 2000 }, children: [] }),
  new Paragraph({ children: [new TextRun({ text: "GORDON365  ·  MICROSOFT 365 TEMPLATE", color: ACCENT, bold: true, size: 22 })] }),
  new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Intune Device", bold: true, size: 56, color: DARK })] }),
  new Paragraph({ children: [new TextRun({ text: "Compliance Starter", bold: true, size: 56, color: DARK })] }),
  new Paragraph({ spacing: { before: 300, after: 400 }, children: [
    new TextRun({ text: "Windows 11 device compliance policies for Microsoft Intune — BitLocker, Defender Antivirus, Defender Firewall, OS version baseline, and direct mapping to Conditional Access compliant-device policies.", size: 26, color: GREY })
  ]}),
  new Paragraph({ spacing: { before: 600 }, children: [
    new TextRun({ text: "Product Tier:  ", bold: true, size: 22 }),
    new TextRun({ text: "Professional Pack", size: 22, color: ACCENT, bold: true })
  ]}),
  new Paragraph({ children: [
    new TextRun({ text: "Price:  ", bold: true, size: 22 }),
    new TextRun({ text: "€199", size: 22, color: ACCENT, bold: true })
  ]}),
  new Paragraph({ children: [
    new TextRun({ text: "Category:  ", bold: true, size: 22 }),
    new TextRun({ text: "Intune", size: 22 })
  ]}),
  new Paragraph({ children: [
    new TextRun({ text: "Required Licenses:  ", bold: true, size: 22 }),
    new TextRun({ text: "Microsoft 365 Business Premium, Intune Plan 1 (or higher)", size: 22 })
  ]}),
  new Paragraph({ spacing: { before: 600 }, children: [
    new TextRun({ text: "Includes machine-readable policy file: intune-compliance-starter.json", italics: true, color: GREY, size: 20 })
  ]}),
  new Paragraph({ spacing: { before: 100 }, children: [
    new TextRun({ text: "Cross-sell: Has a hard dependency relationship with CA004 in the Conditional Access Hardening Pack, and shares rollout pattern with the MFA Rollout Kit.", italics: true, color: GREY, size: 20 })
  ]}),
  new Paragraph({ children: [new PageBreak()] }),
];

// ---- Problem + Target state ----
const overview = [
  h1("1. Problem"),
  p("Most tenants enable Microsoft Defender and call it 'device security' — without verifying it stays enabled, without enforcing disk encryption, and with no compliance signal that Conditional Access can actually act on."),
  p("This gap becomes critical the moment an organization deploys 'Require compliant device' Conditional Access policies (such as CA004 from the Conditional Access Hardening Pack): if no compliance policy exists to evaluate devices, EVERY device is 'Not Compliant' by default — and CA004 blocks every admin sign-in. The Conditional Access policy is not broken; the missing compliance layer underneath it is."),

  h1("2. Zielzustand (Target State)"),
  p("After implementing this pack, every Windows 11 device is continuously evaluated against five compliance policies and configured via four configuration profiles. Devices that meet the baseline are marked 'Compliant' in Intune — the signal that Conditional Access policies like CA004 depend on."),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [700, 4660, 4000],
    rows: [
      new TableRow({ tableHeader: true, children: [
        headerCell("#", 700),
        headerCell("Compliance Policy", 4660),
        headerCell("Primary Control", 4000),
      ]}),
      ...[
        ["ICP001", "Windows 11 OS Version Baseline", "Minimum build 22621 (22H2), 7-day grace period"],
        ["ICP002", "BitLocker Encryption Required", "Disk encryption verified, 72h grace period"],
        ["ICP003", "Defender Antivirus Active and Up to Date", "Real-time protection + current signatures"],
        ["ICP004", "Defender Firewall Enabled (All Profiles)", "Domain/Private/Public firewall active"],
        ["ICP005", "Password / PIN Required", "8-char alphanumeric, 15-min lock"],
      ].map(([n, name, ctrl], i) => new TableRow({ children: [
        cell(n, 700, i, { bold: true, color: ACCENT }),
        cell(name, 4660, i),
        cell(ctrl, 4000, i, { color: GREY }),
      ]})),
    ]
  }),
  p(""),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [700, 4660, 4000],
    rows: [
      new TableRow({ tableHeader: true, children: [
        headerCell("#", 700),
        headerCell("Configuration Profile", 4660),
        headerCell("Purpose", 4000),
      ]}),
      ...[
        ["ICC002", "BitLocker Configuration", "Triggers encryption, backs up recovery keys to Entra ID"],
        ["ICC003", "Defender Antivirus Configuration", "Cloud protection level, PUA blocking, scan schedule"],
        ["ICC004", "Defender Firewall Configuration", "Per-profile rules, stealth mode on Public"],
        ["ICC005", "Windows Update Ring", "7-day quality / 14-day feature update deferral"],
      ].map(([n, name, ctrl], i) => new TableRow({ children: [
        cell(n, 700, i, { bold: true, color: ACCENT }),
        cell(name, 4660, i),
        cell(ctrl, 4000, i, { color: GREY }),
      ]})),
    ]
  }),
  new Paragraph({ children: [new PageBreak()] }),
];

// ---- Implementation guide ----
const implementation = [
  h1("3. Implementation Guide"),
  p("Configuration profiles and compliance policies serve different purposes: configuration profiles SET the device state (e.g. 'encrypt the disk'), compliance policies CHECK the resulting state (e.g. 'is the disk encrypted'). Deploying compliance policies before the corresponding configuration profile has taken effect will mark devices non-compliant for a setting they have no way to fix automatically."),

  h2("3.1 Prerequisites"),
  bullet("Microsoft Intune Plan 1 license (included in Microsoft 365 Business Premium and E3/E5)"),
  bullet("Intune Administrator or Global Administrator role"),
  bullet("Devices enrolled in Intune (Azure AD joined or hybrid joined)"),
  bullet("A pilot group identified - reuse the pilot group from the MFA Rollout Kit if already established, for consistency"),
  bullet("If CA004 (from the CA Hardening Pack) is already enforced: read Section 4 (Compliance-to-CA Mapping) before proceeding - sequencing matters"),

  h2("3.2 Import Method — Microsoft Graph API"),
  p("Compliance policies and configuration profiles map to different Graph resources. A script can iterate through intune-compliance-starter.json and POST each object to the appropriate endpoint:"),
  new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: "POST https://graph.microsoft.com/v1.0/deviceManagement/deviceCompliancePolicies", font: "Courier New", size: 20, color: ACCENT })] }),
  new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: "POST https://graph.microsoft.com/v1.0/deviceManagement/configurationPolicies", font: "Courier New", size: 20, color: ACCENT })] }),
  new Paragraph({ spacing: { after: 160 }, children: [new TextRun({ text: "POST https://graph.microsoft.com/v1.0/deviceManagement/windowsUpdateForBusinessConfigurations", font: "Courier New", size: 20, color: ACCENT })] }),
  p("Required Graph permissions: DeviceManagementConfiguration.ReadWrite.All (Application or Delegated, admin consent required)."),

  h2("3.3 Recommended Rollout Order"),
  p("The order below is intentional: configuration profiles that establish state come first (steps 1-3), low-false-positive compliance checks come next (step 4), and the highest-impact checks come last (steps 5-6) — followed by tenant-wide expansion and finally the Conditional Access dependency this pack unlocks."),
  numbered("Deploy ICC005 (Windows Update Ring) - establishes patching cadence. No compliance impact yet."),
  numbered("Deploy ICC003 + ICC004 (Defender AV + Firewall configuration) - configures settings, compliance policies not yet active."),
  numbered("Deploy ICC002 (BitLocker configuration) - devices begin encrypting in background. Do not enable ICP002 yet; encryption takes hours depending on disk size."),
  numbered("Enable ICP003, ICP004, ICP005 (Defender AV, Firewall, Password) for the pilot group - lowest false-positive risk, most devices already meet these via Windows defaults."),
  numbered("Enable ICP002 (BitLocker compliance) for the pilot group, only after confirming 'Encrypted' status in Intune device details."),
  numbered("Enable ICP001 (OS Version Baseline) last - most likely to flag existing devices. Deploy only with a remediation plan for flagged devices."),
  numbered("Expand all policies from pilot group to full tenant in 1-2 waves - reuse the wave structure from the MFA Rollout Kit if both are being implemented."),
  numbered("Only after step 7 is stable for 48 hours: switch CA004 (from the CA Hardening Pack) from report-only to enforced."),

  h2("3.4 Validation"),
  bullet("Intune Admin Center → Devices → Monitor → Compliance status - review per-policy compliance percentage"),
  bullet("For BitLocker specifically: Devices → [device] → Hardware → check 'Encryption state'"),
  bullet("Confirm recovery keys are appearing in Entra ID: Devices → BitLocker keys"),
  bullet("Run validation for a minimum of 48 hours per step before proceeding to the next"),

  new Paragraph({ children: [new PageBreak()] }),
];

// ---- CA mapping (the critical cross-sell section) ----
const caMapping = [
  h1("4. Compliance-zu-Conditional-Access Mapping"),
  p("This section describes the single most important relationship in this pack: how the compliance policies defined here become the signal that Conditional Access uses to grant or deny access.", { bold: true }),

  h2("4.1 The Dependency"),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [3500, 2860, 3000],
    rows: [
      new TableRow({ tableHeader: true, children: [
        headerCell("Conditional Access Policy", 3500),
        headerCell("Source Product", 2860),
        headerCell("Depends On (this pack)", 3000),
      ]}),
      new TableRow({ children: [
        cell("CA004 - Require Compliant or Hybrid Joined Device for Admins", 3500, 0, { bold: true }),
        cell("Conditional Access Hardening Pack (€149)", 2860, 0, { color: ACCENT, bold: true }),
        cell("ICP001-ICP005 (all 5 compliance policies)", 3000, 0),
      ]}),
    ]
  }),
  p(""),
  p("CA004 uses the 'compliantDevice' grant control for users in privileged admin roles. The Conditional Access engine checks one thing: does Intune currently report this device as 'Compliant'? If no compliance policy has ever evaluated the device, the answer is 'Not Compliant' — not 'Unknown' or 'Skipped'. This is the source of the most common CA004 misconfiguration:", { spacing: { after: 160 } }),

  new Paragraph({ spacing: { after: 160 }, children: [
    new TextRun({ text: "Common failure mode: ", bold: true, color: ACCENT }),
    new TextRun({ text: "An admin enables CA004 (from the CA Hardening Pack) in enforced mode without ever deploying this pack. Every admin sign-in now fails the compliant-device check, because no device has ever been evaluated against any compliance policy. All admin accounts — including the person who just enabled the policy — are locked out of conditional-access-protected resources simultaneously.", color: GREY })
  ]}),

  h2("4.2 Correct Sequencing"),
  p("If you already own the Conditional Access Hardening Pack and CA004 is in report-only mode: this is the safe state. Report-only mode logs what WOULD have happened without blocking access. Deploy this pack, complete the rollout order in Section 3, and only then switch CA004 to enforced."),
  p("If CA004 is already enforced and admin sign-ins are failing: this pack resolves the issue, but expect a transition window. Deploy the configuration profiles first (steps 1-3 in Section 3.3) and allow 24-48 hours for devices to check in and be evaluated before the compliance policies (steps 4-6) are enabled. During this window, CA004 may need to be temporarily switched back to report-only to restore admin access — coordinate this with break-glass account procedures from the CA Hardening Pack, Section 6."),

  h2("4.3 If You Don't Have the CA Hardening Pack"),
  p("This pack is fully functional on its own — device compliance reporting, BitLocker enforcement, and Defender baselines provide value independent of Conditional Access. The compliance signal this pack produces simply has no consumer yet. CA004 (and the broader Conditional Access policy set) becomes available via the Conditional Access Hardening Pack (€149), or as part of the Security & Compliance Starter Bundle (€549)."),

  new Paragraph({ children: [new PageBreak()] }),
];

// ---- OS baseline + exception process ----
const baselineAndExceptions = [
  h1("5. Mindestanforderungen an Betriebssystemversionen"),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2200, 7160],
    rows: [
      new TableRow({ tableHeader: true, children: [
        headerCell("Platform", 2200),
        headerCell("Baseline", 7160),
      ]}),
      new TableRow({ children: [
        cell("Windows", 2200, 0, { bold: true }),
        cell("Minimum build 10.0.22621.0 (Windows 11 22H2). Windows 10 reaches end of support 2025-10-14.", 7160, 0),
      ]}),
      new TableRow({ children: [
        cell("macOS", 2200, 1, { bold: true }),
        cell("Minimum macOS 14 (Sonoma). Full macOS compliance policy definitions planned for v1.1.0 - not included in this release.", 7160, 1, { color: GREY }),
      ]}),
    ]
  }),
  new Paragraph({ spacing: { before: 160 }, children: [
    new TextRun({ text: "Important: ", bold: true, color: ACCENT }),
    new TextRun({ text: "Devices still running Windows 10 should be treated as a hardware refresh or upgrade PROJECT, scoped and planned separately from this compliance rollout - not as an ongoing compliance exception. Windows 10's approaching end-of-support date (2025-10-14) means any 'temporary' exception for Windows 10 devices has a hard deadline regardless of internal policy.", color: GREY })
  ]}),

  h1("6. Ausnahmeprozess"),
  p("Follows the same governance model as the MFA Rollout Kit's exception process: rare, time-boxed, documented. An exception is a statement that a specific device is an accepted risk - not that the policy itself is wrong."),

  h2("6.1 Valid Exception Reasons"),
  bullet("Legacy line-of-business hardware that cannot run Windows 11 (e.g. specialized manufacturing/lab equipment) - must have a hardware refresh plan with a target date"),
  bullet("Devices in active BitLocker encryption (in progress, not yet complete) - automatic, time-bound exception, not a manual one"),
  bullet("Newly enrolled devices within the first 24 hours - compliance evaluation has a natural delay; 'not yet evaluated' should not trigger alerts as if it were 'non-compliant'"),

  h2("6.2 Invalid Exception Reasons"),
  bullet("\"This user is senior management and the policy is inconvenient\" - the same standard applies to all devices; senior roles are higher-value targets, not lower-risk ones", true),
  bullet("\"The device passed compliance before and we don't want to re-check\" - compliance is evaluated continuously by design; a one-time exemption defeats the purpose", true),
  bullet("\"BitLocker slows down the device\" - on hardware from the last 6+ years the performance impact is negligible; address via communication, not a technical exception", true),

  h2("6.3 Process"),
  numbered("Exception request submitted identifying the specific device (Intune Device ID) and business justification"),
  numbered("IT Admin reviews against valid/invalid reason lists"),
  numbered("If approved: device added to a dedicated 'Intune-Compliance-Exception' Entra ID group with documented expiry date"),
  numbered("Exception group excluded only from the specific compliance policy needed - never from all policies"),

  new Paragraph({ spacing: { after: 160 }, children: [
    new TextRun({ text: "Critical: ", bold: true, color: ACCENT }),
    new TextRun({ text: "CA004 (compliant device requirement for admins) is NOT relaxed for exception devices. If a device cannot be made compliant, the admin should use a different, compliant device for privileged access. Exceptions apply to general compliance reporting - not to admin-tier access controls. This mirrors the Break-Glass vs. Exception distinction in the MFA Rollout Kit: an exception for a regular device is never a substitute for proper privileged access controls.", color: GREY })
  ]}),

  new Paragraph({ children: [new PageBreak()] }),
];

// ---- KPIs ----
const kpis = [
  h1("7. Reporting und KPI-Empfehlungen"),
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
        ["Overall Device Compliance Rate", "95%+ within 60 days of full rollout", "Weekly"],
        ["BitLocker Encryption Coverage", "100% of corporate-owned Windows devices", "Weekly during rollout, monthly after"],
        ["Defender Signature Currency", "98%+ updated within 48 hours", "Weekly"],
        ["CA004 Sign-In Success Rate (Admins)", "99%+ after enforcement", "Daily for 1 week, then weekly"],
        ["Windows Build Currency", "95%+ within 90 days, 100% before Win10 EOL (2025-10-14)", "Monthly"],
        ["Active Compliance Exceptions", "< 3% of managed devices, trending to 0", "Monthly"],
      ].map(([m, t, f], i) => new TableRow({ children: [
        cell(m, 2400, i, { bold: true }),
        cell(t, 4160, i),
        cell(f, 2800, i, { color: GREY }),
      ]})),
    ]
  }),
  p("CA004 Sign-In Success Rate is the cross-reference metric with the CA Hardening Pack — a drop in this metric after enforcement is the primary signal that compliance policies and Conditional Access have drifted out of sync.", { italics: true, color: GREY, size: 20 }),

  new Paragraph({ children: [new PageBreak()] }),
];

// ---- DSC + bundle + closing ----
const closing = [
  h1("8. Microsoft365DSC Mapping (Phase 2 — Ready, Not Yet Active)"),
  p("Compliance policies and configuration profiles in this pack are structured to map directly onto Microsoft365DSC resource blocks."),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [4680, 4680],
    rows: [
      new TableRow({ tableHeader: true, children: [
        greyHeaderCell("Component", 4680),
        greyHeaderCell("DSC Resource (Phase 2)", 4680),
      ]}),
      ...[
        ["ICP001-ICP005 (Compliance Policies)", "IntuneDeviceCompliancePolicyWindows10"],
        ["ICC002-ICC004 (Configuration Profiles)", "IntuneDeviceConfigurationPolicyWindows10"],
        ["ICC005 (Update Ring)", "IntuneWindowsUpdateForBusiness"],
      ].map(([a, b], i) => new TableRow({ children: [monoCell(a, 4680, i), monoCell(b, 4680, i)] })),
    ]
  }),
  new Paragraph({ spacing: { before: 200 }, children: [
    new TextRun({ text: "Status: ", bold: true }),
    new TextRun({ text: "Mapping defined, not yet executable. Phase 2 will provide a combined .ps1 configuration covering this pack alongside ca-hardening-pack (shared CA004 dependency) and mfa-rollout-kit (shared rollout wave structure).", color: GREY })
  ]}),

  h1("9. Bundle & Cross-Sell"),
  p("This pack completes the dependency chain for CA004 in the Conditional Access Hardening Pack, and shares its rollout-wave structure with the MFA Rollout Kit."),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [3120, 2700, 3540],
    rows: [
      new TableRow({ tableHeader: true, children: [
        headerCell("Related Product", 3120),
        headerCell("Relationship", 2700),
        headerCell("Why It Matters", 3540),
      ]}),
      new TableRow({ children: [
        cell("CA Hardening Pack (€149)", 3120, 0, { bold: true }),
        cell("Hard dependency for CA004", 2700, 0, { color: "C84C3A" }),
        cell("CA004 fails for all admins until this pack is deployed", 3540, 0),
      ]}),
      new TableRow({ children: [
        cell("MFA Rollout Kit (€79)", 3120, 1, { bold: true }),
        cell("Shared rollout pattern", 2700, 1),
        cell("Reuse pilot group and wave schedule across both rollouts", 3540, 1),
      ]}),
    ]
  }),
  new Paragraph({ spacing: { before: 100 }, children: [
    new TextRun({ text: "Recommended bundle: ", bold: true, color: ACCENT }),
    new TextRun({ text: "Security & Compliance Starter Bundle (€549) includes this pack plus the CA Hardening Pack and MFA Rollout Kit - see gordon365.com/templates/bundle.", color: GREY })
  ]}),
  new Paragraph({ spacing: { before: 100 }, children: [
    new TextRun({ text: "Upsell trigger: ", bold: true, color: ACCENT }),
    new TextRun({ text: "Customers who purchased the CA Hardening Pack and have had CA004 in report-only for 14+ days without this pack should be shown: 'CA004 is ready to enforce but requires device compliance policies - get the Intune Device Compliance Starter to complete this policy.'", color: GREY })
  ]}),

  h1("10. Support & Updates"),
  p("This product includes lifetime updates as Microsoft changes Intune compliance and configuration capabilities. macOS compliance policies are planned for v1.1.0. Questions about implementation: support@gordon365.com"),
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
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
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
            new TextRun({ text: "\tIntune Device Compliance Starter", color: GREY, size: 18 }),
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
            new TextRun({ text: "gordon365.com/templates/intune-compliance-starter", color: GREY, size: 16 }),
          ]
        })]
      })
    },
    children: [
      ...cover,
      ...overview,
      ...implementation,
      ...caMapping,
      ...baselineAndExceptions,
      ...kpis,
      ...closing,
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/claude/products/intune-compliance-starter/1.0.0/intune-compliance-starter-guide.docx", buffer);
  console.log("done");
});
