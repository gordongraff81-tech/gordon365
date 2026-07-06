# Go Live Notizen für Gordon365

## 1. Automatische Umsatzsteuer über Stripe Tax

Aktiviere Stripe Tax im Dashboard unter Settings, Tax, und hinterlege dort eure Geschäftsadresse als Ursprungsadresse. Anschließend lässt sich die automatische Steuerberechnung direkt bei der Erstellung der Checkout Session aktivieren:

```ts
const session = await stripe.checkout.sessions.create({
  // bestehende Felder ...
  automatic_tax: { enabled: true },
  billing_address_collection: "required",
  customer_update: { address: "auto" },
});
```

Damit berechnet Stripe für jeden Kauf automatisch den korrekten Steuersatz je nach Wohnsitzland des Käufers innerhalb der EU. Das löst die Berechnung des Satzes, ersetzt aber nicht die eigentliche Anmeldung beim Verfahren, über das die gesammelte Steuer an die jeweiligen Länder gemeldet und abgeführt wird (siehe Punkt 2).

## 2. OneStopShop Anmeldung

Sofern nicht ausschließlich an Unternehmen verkauft wird oder die Kleinunternehmerregelung nach §19 UStG greift, sollte vor dem Verkaufsstart eine Anmeldung über das Onlineportal des Bundeszentralamts für Steuern (BZSt) für das OneStopShop Verfahren erfolgen. Damit reicht eine vierteljährliche Sammelmeldung für alle EU Länder, statt sich einzeln in jedem einzelnen Land registrieren zu müssen.

## 3. Mail Zustellbarkeit (SPF, DKIM, DMARC)

Die genauen SPF Include Werte und DKIM Selektoren hängen vom verwendeten SMTP Anbieter für Nodemailer ab (zum Beispiel Resend, Postmark oder SendGrid) und finden sich im jeweiligen Anbieter Dashboard unter dem Punkt Domains. Ergänzend lohnt sich ein eigener DMARC Eintrag bei der Domain, etwa:

```
v=DMARC1; p=quarantine; rua=mailto:dmarc@gordon365.com
```

Ohne diese drei Einträge landen Bestätigungsmails mit Downloadlink bei vielen Empfängern direkt im Spamordner.

## 4. Was für Rechnung und Impressum noch fehlt

Für eine rechtssichere Rechnung mit allen Pflichtangaben nach §14 UStG und ein vollständiges Impressum lassen sich keine Platzhalter seriös raten. Benötigt werden: vollständiger Firmenname mit Rechtsform, Geschäftsadresse, ob Regelbesteuerung oder Kleinunternehmerregelung nach §19 UStG gilt, und falls vorhanden die USt IdNr oder Steuernummer.

Für die fortlaufende Rechnungsnummer lässt sich derselbe Key Value Store nutzen, der bereits für die Webhook Idempotenz vorgeschlagen wurde (siehe webhookIdempotency.ts), als einfacher Zähler ohne eigene relationale Datenbank.

## 5. Offene Punkte, die nur direkt erledigt werden können

- OneStopShop Anmeldung beim BZSt, falls relevant
- Stripe Tax im Dashboard aktivieren und Ursprungsadresse hinterlegen
- DNS Einträge für SPF, DKIM und DMARC beim Domainanbieter setzen
- Live Keys aus dem Stripe Dashboard in die Produktionsumgebung eintragen
- Webhook Endpoint im Stripe Dashboard registrieren und Signing Secret übernehmen
