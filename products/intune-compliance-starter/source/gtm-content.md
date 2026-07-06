# GTM Content — Intune Device Compliance Starter (€199)

## Produktbeschreibung für /templates/intune-compliance-starter

**Headline:** Die Policy, die deine Conditional-Access-Policy zum
Funktionieren bringt.

**Subheadline:** "Require compliant device" in Conditional Access ist
nur eine Anfrage — Intune muss die Antwort liefern. Ohne diese
Compliance-Policies ist jedes Gerät "Not Compliant", und CA004 sperrt
alle Admins gleichzeitig aus.

**Problem (kurz):**
Die meisten Tenants aktivieren Defender und nennen das
"Gerätesicherheit" — ohne zu prüfen, ob es aktiv bleibt, ohne
Festplattenverschlüsselung zu erzwingen, und ohne ein
Compliance-Signal, auf das Conditional Access reagieren kann. Das wird
kritisch, sobald "Require compliant device"-Policies wie CA004 aus dem
CA Hardening Pack aktiviert werden: ohne Compliance-Policy ist JEDES
Gerät "Not Compliant" — und CA004 blockiert jeden Admin-Login.

**Was enthalten ist:**
- 5 Compliance-Policies: Windows 11 Baseline, BitLocker, Defender AV,
  Defender Firewall, Passwort/PIN
- 4 Konfigurationsprofile, die diese Einstellungen tatsächlich
  durchsetzen (nicht nur prüfen)
- Vollständiges Compliance-zu-Conditional-Access-Mapping mit
  Sequenzierungs-Warnung
- 8-stufige Rollout-Reihenfolge mit Begründung pro Schritt
- Dokumentierter Ausnahmeprozess
- 6 KPI-Definitionen mit Graph-API-Quelle
- Microsoft365DSC-Mapping (Phase 2 ready)

**Für wen:**
IT-Admins und MSPs, die entweder (a) Geräte-Compliance als
eigenständiges Sicherheitsthema angehen, oder (b) CA004 aus dem CA
Hardening Pack zum Laufen bringen wollen, ohne sich aus dem eigenen
Tenant auszusperren.

**Aufwand:** ~4-6 Stunden verteilt über 1-2 Wochen (BitLocker-Rollout
braucht Zeit für die Verschlüsselung im Hintergrund)

---

## Reddit Post (r/sysadmin, r/Intune, r/msp)

**Titel:**
PSA: Wenn du CA "Require compliant device" aktivierst und keine
Compliance Policy hast, sperrst du dich selbst aus

**Body:**

Hab das schon ein paar Mal gesehen: jemand aktiviert eine Conditional
Access Policy mit "Require compliant device" für Admin-Rollen (sehr
sinnvoll!), aber es existiert keine Device Compliance Policy in Intune.

Ergebnis: JEDES Gerät ist per Definition "Not Compliant" (nicht
"Unknown", sondern "Not Compliant"), und die CA-Policy blockiert
sofort alle Admin-Logins — inklusive der Person, die die Policy gerade
aktiviert hat.

Die CA-Policy ist nicht kaputt. Die fehlende Compliance-Policy
darunter ist das Problem.

Kostenloser Auszug mit 2 von 5 Compliance-Policies (BitLocker,
Passwort/PIN) + dem vollständigen Mapping-Abschnitt, der das Problem
und den Fix erklärt: [Link]

Vollpaket (€199): alle 5 Compliance-Policies + 4 Konfigurationsprofile
(die tatsächlich BitLocker aktivieren, Defender konfigurieren, etc.) +
8-stufige Rollout-Reihenfolge, die genau dieses Lockout-Szenario
vermeidet: [Link]

Falls jemand bereits in dieser Situation steckt (CA004 enforced, keine
Compliance Policy, Admins ausgesperrt) — kurz: Break-Glass-Account
nutzen, CA004 zurück auf Report-Only, dann Compliance-Policies
deployen, 24-48h warten, dann CA004 wieder enforced.

---

## LinkedIn Post

**Text:**

Eine der häufigsten Conditional-Access-Fallen, die ich sehe:

Jemand aktiviert "Require compliant device" für Admin-Rollen — eine
gute Policy. Aber es gibt keine Device Compliance Policy in Intune.

Ergebnis: Jedes Gerät ist "Not Compliant" (nicht "Unknown" —
"Not Compliant"). Die CA-Policy blockiert sofort jeden Admin-Login.
Inklusive der Person, die die Policy gerade aktiviert hat.

Die Conditional-Access-Policy war nicht das Problem. Die fehlende
Schicht darunter war es.

Kostenloser Auszug (2 von 5 Compliance-Policies + das vollständige
Mapping, das Problem und Fix erklärt): [Link]

Vollpaket (€199): 5 Compliance-Policies, 4 Konfigurationsprofile,
8-stufige Rollout-Reihenfolge, die genau dieses Szenario vermeidet:
[Link]

#Microsoft365 #Intune #ConditionalAccess #EntraID #MSP #ITSecurity

---

## Cross-Sell Hinweise

### Für CA Hardening Pack Käufer (primärer Trigger)

**Bedingung:** Kunde hat ca-hardening-pack gekauft, CA004 ist seit
14+ Tagen im Report-Only-Modus, intune-compliance-starter nicht
gekauft.

**Trigger-E-Mail:**

> Betreff: CA004 ist bereit zur Aktivierung — aber es fehlt noch ein
> Baustein
>
> Du hast CA004 (Require Compliant or Hybrid Joined Device for Admins)
> seit zwei Wochen im Report-Only-Modus. Bevor du auf "Enforced"
> schaltest: CA004 braucht Device-Compliance-Policies in Intune, sonst
> wird jedes Gerät als "Not Compliant" gewertet — und CA004 blockiert
> alle Admin-Logins gleichzeitig.
>
> Das Intune Device Compliance Starter Pack (€199) liefert genau die
> Policies, die CA004 braucht, inkl. einer Rollout-Reihenfolge, die
> dieses Risiko vermeidet.

### Für MFA Rollout Kit Käufer (sekundärer Trigger)

**Bedingung:** Kunde hat mfa-rollout-kit gekauft (hat bereits eine
funktionierende Pilotgruppen-/Wellen-Struktur etabliert).

**Trigger-Hinweis (in /library oder E-Mail):**

> Du hast bereits eine Pilotgruppe und einen Wellenplan für den
> MFA-Rollout aufgebaut. Das Intune Device Compliance Starter Pack
> nutzt dieselbe Struktur für den Compliance-Rollout — du kannst
> dieselbe Pilotgruppe und denselben Zeitplan wiederverwenden, statt
> einen zweiten Rollout-Prozess aufzusetzen.

### Bundle-Positionierung

Dieses Pack ist das "fehlende Stück", das CA Hardening Pack und MFA
Rollout Kit zu einem vollständigen Sicherheits-Setup macht. In allen
drei Produktbeschreibungen sollte das Security & Compliance Starter
Bundle (€549, alle drei Produkte, 29% Rabatt gegenüber €427 — Hinweis:
Einzelsumme ist 149+79+199=427€, Bundle-Preis von €549 aus dem
ursprünglichen Revenue-Plan bezieht sich auf 5 Produkte inkl.
Copilot Readiness + Executive Report; Bundle-Zusammensetzung bei
Launch final festlegen) als Option erscheinen.

---

## Platzierungshinweise

- Der Teaser-Fokus ist NICHT "hier sind 2 Policies", sondern "hier ist
  das Mapping, das erklärt, warum deine CA-Policy nicht funktioniert".
  Das Mapping-Konzept ist der eigentliche Lead-Magnet.
- "PSA" / Warnungs-Framing funktioniert in r/sysadmin besonders gut
  für dieses Thema — es ist ein echtes, häufiges Problem, kein
  künstlich aufgebauschtes.
- Bei Support-Anfragen zu CA004-Lockouts (eigene oder fremde Posts in
  r/sysadmin) ist dieser Teaser eine direkte, hilfreiche Antwort —
  nicht nur Werbung.
