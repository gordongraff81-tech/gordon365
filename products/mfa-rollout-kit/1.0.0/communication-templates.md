# MFA Rollout Kit — Kommunikationsvorlagen für Anwender

Alle Vorlagen sind auf Deutsch und Englisch verfügbar (Platzhalter:
{{firstName}}, {{companyName}}, {{deadlineDate}}, {{supportEmail}},
{{supportPhone}}). Tonfall: unterstützend, nicht alarmierend.
Ziel: Nutzer verstehen WARUM, WAS sie tun müssen, und WO sie Hilfe
bekommen.

Diese Vorlagen entsprechen den im rolloutPlan referenzierten
Templates: Announcement, PilotActionRequired, ActionRequired,
FinalReminder, RolloutComplete.

---

## 1. Announcement (T-5 Tage, an alle Mitarbeiter)

**Betreff (DE):** Wichtige Sicherheitsmaßnahme: Multi-Faktor-Authentifizierung kommt für alle Konten

**Betreff (EN):** Important security update: Multi-factor authentication is coming to your account

**Inhalt (DE):**

> Hallo {{firstName}},
>
> in den kommenden Wochen führen wir Multi-Faktor-Authentifizierung
> (MFA) für alle Microsoft 365 Konten ein. Das bedeutet: zusätzlich
> zu deinem Passwort wirst du beim Anmelden eine zweite Bestätigung
> über dein Smartphone vornehmen.
>
> **Warum machen wir das?**
> Passwörter allein bieten keinen ausreichenden Schutz mehr — gestohlene
> oder erratene Passwörter sind die häufigste Ursache für gehackte
> Konten. MFA reduziert dieses Risiko laut Microsoft um über 99%.
>
> **Was bedeutet das für dich?**
> In den nächsten Tagen wirst du aufgefordert, eine
> Authentifizierungsmethode einzurichten — meist die Microsoft
> Authenticator App auf deinem Smartphone. Das dauert etwa 5 Minuten.
>
> **Was du jetzt tun kannst:**
> Du kannst die Einrichtung schon heute freiwillig vornehmen unter
> https://aka.ms/mfasetup — dann hast du es hinter dir, bevor es
> verpflichtend wird.
>
> Fragen? Antworte einfach auf diese E-Mail oder kontaktiere
> {{supportEmail}} / {{supportPhone}}.
>
> Vielen Dank für deine Mithilfe, unsere gemeinsame Arbeitsumgebung
> sicherer zu machen.

**Content (EN):**

> Hi {{firstName}},
>
> Over the coming weeks, we're rolling out multi-factor authentication
> (MFA) for all Microsoft 365 accounts. This means that in addition to
> your password, you'll confirm your sign-in using a second step on
> your smartphone.
>
> **Why are we doing this?**
> Passwords alone are no longer sufficient protection — stolen or
> guessed passwords are the most common cause of compromised accounts.
> MFA reduces this risk by over 99% according to Microsoft.
>
> **What does this mean for you?**
> Over the next few days, you'll be prompted to set up an
> authentication method — usually the Microsoft Authenticator app on
> your phone. This takes about 5 minutes.
>
> **What you can do now:**
> You can set this up voluntarily today at https://aka.ms/mfasetup —
> then you're done before it becomes mandatory.
>
> Questions? Just reply to this email or contact {{supportEmail}} /
> {{supportPhone}}.
>
> Thank you for helping make our shared work environment more secure.

---

## 2. PilotActionRequired (an Pilotgruppe, Phase 1 Start)

**Betreff (DE):** Aktion erforderlich: Bitte richte heute deine Anmeldebestätigung ein

**Inhalt (DE):**

> Hallo {{firstName}},
>
> du wurdest als Teil unserer Pilotgruppe ausgewählt, um die neue
> Anmeldesicherheit (MFA) als Erste/r zu testen — vielen Dank für
> deine Mithilfe!
>
> **Was du jetzt tun musst:**
> Innerhalb der nächsten 24 Stunden wirst du beim nächsten Login
> aufgefordert, eine Authentifizierungsmethode einzurichten. Folge
> einfach den Anweisungen auf dem Bildschirm — das dauert etwa 5
> Minuten.
>
> **Empfehlung:** Nutze die Microsoft Authenticator App (kostenlos
> für iOS und Android). Falls du kein Smartphone für die Arbeit
> nutzen möchtest, melde dich bei {{supportEmail}} — es gibt
> Alternativen (z.B. Hardware-Token).
>
> **Dein Feedback ist wichtig:** Nach der Einrichtung melden wir uns
> kurz bei dir, um zu erfahren, wie der Prozess für dich war. Das
> hilft uns, die Einführung für alle anderen Kolleg:innen zu
> verbessern.
>
> Bei Problemen: {{supportEmail}} / {{supportPhone}} — wir helfen
> sofort.

---

## 3. ActionRequired (an Wave A / Wave B, T-1 Tag)

**Betreff (DE):** Morgen erforderlich: Anmeldebestätigung für dein Microsoft 365 Konto

**Inhalt (DE):**

> Hallo {{firstName}},
>
> wie angekündigt wird ab morgen ({{deadlineDate}}) für dein Konto
> eine zusätzliche Anmeldebestätigung (MFA) aktiv.
>
> **Was passiert, wenn du dich morgen anmeldest:**
> Du wirst aufgefordert, eine Authentifizierungsmethode einzurichten,
> bevor du fortfahren kannst. Das dauert etwa 5 Minuten.
>
> **So bereitest du dich vor (optional, aber empfohlen):**
> 1. Installiere die Microsoft Authenticator App auf deinem Smartphone
>    (App Store / Google Play)
> 2. Halte dein Smartphone bei der nächsten Anmeldung bereit
> 3. Folge den Anweisungen auf dem Bildschirm
>
> **Kein Smartphone verfügbar?** Kein Problem — kontaktiere
> {{supportEmail}}, wir richten eine Alternative (Hardware-Token oder
> Telefonanruf-Verifizierung) für dich ein, bevor die Frist greift.
>
> Bei Fragen oder Problemen: {{supportEmail}} / {{supportPhone}}

---

## 4. FinalReminder (an Nutzer ohne Registrierung, kurz vor Enforcement)

**Betreff (DE):** Letzte Erinnerung: Anmeldebestätigung jetzt einrichten — wird heute aktiv

**Inhalt (DE):**

> Hallo {{firstName}},
>
> unsere Aufzeichnungen zeigen, dass du die Einrichtung der
> Anmeldebestätigung (MFA) noch nicht abgeschlossen hast. Diese wird
> **heute** für dein Konto verpflichtend.
>
> **Was du jetzt sofort tun solltest:**
> Melde dich bei Microsoft 365 an (https://portal.office.com) und
> folge den Anweisungen zur Einrichtung. Das dauert etwa 5 Minuten und
> verhindert, dass du später ohne Zugriff auf deine E-Mails dastehst.
>
> **Brauchst du Hilfe?** Ruf uns direkt an: {{supportPhone}} — wir
> helfen dir in den nächsten Minuten bei der Einrichtung, damit du
> nicht ausgesperrt wirst.
>
> Wir wissen, dass Änderungen Aufwand bedeuten — danke für deine
> schnelle Reaktion, damit dein Konto sicher bleibt.

---

## 5. RolloutComplete (an alle, Phase 3 Abschluss)

**Betreff (DE):** Abgeschlossen: Multi-Faktor-Authentifizierung ist jetzt für alle aktiv

**Inhalt (DE):**

> Hallo {{firstName}},
>
> die Einführung der Multi-Faktor-Authentifizierung (MFA) für
> {{companyName}} ist abgeschlossen. Vielen Dank für deine Mithilfe —
> unsere Konten sind jetzt deutlich besser gegen unbefugten Zugriff
> geschützt.
>
> **Was sich für dich ändert:**
> Bei der Anmeldung wirst du gelegentlich (nicht bei jeder Anmeldung)
> aufgefordert, deine Identität über dein Smartphone zu bestätigen.
> Das ist normal und ein Zeichen dafür, dass der Schutz aktiv ist.
>
> **Tipp:** Richte eine zweite Authentifizierungsmethode ein (z.B.
> zusätzlich zur App auch eine Telefonnummer) — falls du dein
> Smartphone mal nicht zur Hand hast, bist du trotzdem nicht
> ausgesperrt. Einrichtung unter https://aka.ms/mfasetup
>
> **Support bleibt verfügbar:** Bei Problemen mit der Anmeldung
> wende dich weiterhin an {{supportEmail}} / {{supportPhone}}.
>
> Danke, dass du Teil dieser wichtigen Sicherheitsverbesserung warst.

---

## Hinweise zur Anpassung

- Alle Vorlagen sind bewusst kurz (< 200 Wörter) — lange
  Sicherheits-E-Mails werden überlesen.
- Jede Vorlage hat genau EINE geforderte Aktion, nie mehrere.
- Der Support-Kontakt erscheint in JEDER E-Mail — Angst vor
  Aussperrung ist der Hauptgrund für Widerstand gegen MFA-Rollouts.
- {{companyName}} und Branding (Logo, Farben) sollten vor Versand
  ergänzt werden — diese Vorlagen sind White-Label-fähig für
  MSP-Kunden.
