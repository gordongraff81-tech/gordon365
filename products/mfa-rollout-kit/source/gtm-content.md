# GTM Content — MFA Rollout Kit (€79)

## Produktbeschreibung für /templates/mfa-rollout-kit

**Headline:** MFA-Rollout ohne Helpdesk-Chaos. 3 Wochen, vier Phasen,
fertige Kommunikationsvorlagen.

**Subheadline:** Der Unterschied zwischen einem erfolgreichen
MFA-Rollout und einem, der drei Wochen lang den Helpdesk lahmlegt, ist
nicht die Technik — es ist die Sequenzierung und Kommunikation. Dieses
Kit liefert beides fertig.

**Problem (kurz):**
MFA-Enforcement ist eine einzeilige Policy-Änderung. Aber 50, 100 oder
300 Nutzer durch die Registrierung zu bringen, ohne dass die Hälfte
ausgesperrt wird und der Helpdesk explodiert — das ist die eigentliche
Herausforderung. Und es ist (fast) immer ein Kommunikationsproblem,
kein technisches.

**Was enthalten ist:**
- Vollständiger 3-Wochen-Rollout-Plan (4 Phasen) mit Graph-API-Aktion
  pro Schritt
- 5 zweisprachige (DE/EN) E-Mail-Vorlagen, White-Label-fähig für MSPs
- Helpdesk-FAQ für die 6 häufigsten MFA-Tickets inkl.
  Eskalationsmatrix
- Pilotgruppen-Konzept mit konkreten Auswahlkriterien
- Dokumentierter Ausnahmeprozess (gültige vs. ungültige Gründe)
- 6 KPI-Definitionen mit Graph-API-Quelle und Zielwerten
- Microsoft365DSC-Mapping (Phase 2 ready)

**Für wen:**
IT-Admins und MSPs, die MFA-Enforcement (CA003) einführen wollen, ohne
dass es zur Krise wird. Funktioniert eigenständig — der letzte Schritt
(CA003 aktivieren) verweist auf das Conditional Access Hardening Pack,
falls noch nicht vorhanden.

**Aufwand:** ~5 Stunden Admin-Zeit verteilt über 3 Wochen (nicht
Vollzeit — die meisten Schritte sind Reviews und E-Mail-Versand)

---

## Reddit Post (r/sysadmin, r/msp)

**Titel:**
MFA-Rollout-Plan: 3 Wochen, 4 Phasen, mit fertigen
E-Mail-Vorlagen (kostenloser Auszug)

**Body:**

Der häufigste Grund, warum MFA-Rollouts schlecht laufen, ist nicht die
Technik — es ist dass alle Nutzer am selben Tag eine Aufforderung
bekommen, niemand vorbereitet ist, und der Helpdesk drei Tage lang nur
noch "ich bin ausgesperrt"-Tickets bearbeitet.

Ich habe einen 4-Phasen-Plan zusammengestellt (Vorbereitung → Pilot →
Wellen-Rollout → Enforcement), den ich für gerade veröffentliche.
Kostenloser Auszug mit Phase 0 (Vorbereitung) und dem
Pilotgruppen-Konzept als JSON:

[Link zur teaser.json]

Das Pilotgruppen-Konzept allein ist meiner Erfahrung nach der größte
Hebel — 5-10 sorgfältig ausgewählte Leute (Mix aus IT, Führungskräften,
verschiedenen Geräten, mindestens 1 weniger technikaffine Person)
surfacen 90% der Probleme, bevor sie 200 Leute betreffen.

Falls hilfreich: das Vollpaket (€79) hat den kompletten 3-Wochen-Plan,
5 fertige zweisprachige E-Mail-Vorlagen, eine Helpdesk-FAQ mit
Eskalationsmatrix, und einen dokumentierten Ausnahmeprozess
(inkl. der Unterscheidung Break-Glass vs. Ausnahme, die ich erstaunlich
oft falsch gemacht sehe): [Link]

---

## LinkedIn Post

**Text:**

"MFA aktivieren" ist eine einzeilige Policy-Änderung.

Das eigentliche Projekt ist: 100+ Nutzer durch die Registrierung
bringen, ohne dass am Montagmorgen die Hälfte ausgesperrt ist und der
Helpdesk in Flammen steht.

Der Unterschied zwischen einem reibungslosen Rollout und einem
Chaos-Tag ist fast immer Sequenzierung:

→ Phase 0: Vorbereitung (Break-Glass-Accounts, Pilotgruppe, Ankündigung)
→ Phase 1: Pilot mit 5-10% — Go/No-Go-Kriterien vor dem nächsten Schritt
→ Phase 2: Zwei Wellen statt "alle auf einmal"
→ Phase 3: Enforcement + eine Woche Monitoring

Kostenloser Auszug (Phase 0 + Pilotgruppen-Konzept) hier: [Link]

Das Vollpaket (€79) hat den kompletten Plan inkl. fertiger
E-Mail-Vorlagen (DE/EN), Helpdesk-FAQ und Ausnahmeprozess: [Link]

#Microsoft365 #EntraID #MFA #ITSecurity #MSP

---

## Cross-Sell Hinweis (für CA Hardening Pack Käufer)

Wenn ein Kunde bereits das CA Hardening Pack gekauft hat, ist CA003
(Require MFA for All Users) bereits in seinem Pack enthalten — aber im
Report-Only-Modus. Das MFA Rollout Kit ist der fehlende Teil, um diese
Policy sicher von Report-Only auf "On" zu bringen.

**Empfohlener Trigger:** E-Mail an CA-Hardening-Pack-Käufer nach 7
Tagen: "Bereit, CA003 zu aktivieren? Das MFA Rollout Kit zeigt dir den
sicheren Weg dahin — als Bundle-Käufer sparst du ohnehin bereits 29%."

---

## Platzierungshinweise

- Teaser als preview/teaser.json verlinken (siehe Storage-Struktur) —
  kein Login nötig.
- Das Pilotgruppen-Konzept ist der stärkste "Aha"-Moment im Teaser —
  in Posts hervorheben, nicht nur den Rollout-Plan.
- Bundle-CTA (€549) immer als zweite Option zeigen, nie als einzige —
  manche Kunden brauchen wirklich nur dieses eine Kit.
