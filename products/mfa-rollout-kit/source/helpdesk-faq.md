# MFA Rollout Kit — Helpdesk FAQ

Für das Support-Team. Ziel: 80% der MFA-bezogenen Tickets ohne
Eskalation lösen. Jede Antwort enthält die konkrete Aktion, nicht nur
eine Erklärung.

---

## Top-Tickets (erwartete Häufigkeit, absteigend)

### 1. "Ich habe kein Smartphone / mein Smartphone ist nicht erlaubt für die Arbeit"

**Häufigkeit:** Hoch während Phase 1-2

**Antwort:**
Alternative Methoden anbieten, in dieser Reihenfolge:
1. Telefonanruf-Verifizierung (Festnetz oder Privathandy) — funktioniert ohne App
2. Hardware-Sicherheitsschlüssel (FIDO2) — falls vom Unternehmen bereitgestellt
3. Microsoft Authenticator auf Firmengerät (Tablet/Laptop mit Kamera)

**Aktion:** Nutzer in Entra Admin Center → Benutzer → Authentifizierungsmethoden
→ "Telefon" als Methode hinzufügen, falls noch keine MFA-Methode
registriert ist. Bei Bedarf temporären Zugriffspass (Temporary Access
Pass) ausstellen für die Erstanmeldung.

**Nicht tun:** Den Nutzer dauerhaft von MFA ausschließen (siehe
Ausnahmeprozess — "kein Smartphone" ist KEIN gültiger
Ausnahmegrund, nur ein Grund für eine andere Methode).

---

### 2. "Ich bekomme keine Benachrichtigung / der Code kommt nicht an"

**Häufigkeit:** Hoch

**Antwort:**
Häufigste Ursachen in dieser Reihenfolge prüfen:
1. Internetverbindung des Smartphones (Authenticator-App braucht
   Internet für Push, nicht für Codes)
2. Datum/Uhrzeit auf dem Smartphone korrekt? (TOTP-Codes sind
   zeitbasiert — falsche Uhrzeit = ungültiger Code)
3. Authenticator-App aktuell? (Update über App Store/Play Store)
4. Push-Benachrichtigungen für die App in den Smartphone-Einstellungen
   erlaubt?

**Aktion:** Falls alles korrekt: Methode in Entra Admin Center
zurücksetzen lassen (Benutzer → Authentifizierungsmethoden →
Methode entfernen) und neu registrieren lassen.

---

### 3. "Ich bin ausgesperrt — ich kann mich gar nicht mehr anmelden"

**Häufigkeit:** Mittel, aber höchste Priorität (P1)

**Antwort:**
Sofort behandeln — Nutzer kann nicht arbeiten.

**Aktion:**
1. Identität des Nutzers über alternativen Kanal verifizieren
   (Telefonanruf an bekannte Nummer, persönlich, oder Vorgesetzten
   einbeziehen — NIEMALS nur per E-Mail, das ist ein klassischer
   Social-Engineering-Vektor)
2. Temporary Access Pass (TAP) über Entra Admin Center ausstellen:
   Benutzer → Authentifizierungsmethoden → Temporärer Zugriffspass
   hinzufügen, kurze Gültigkeit (1 Stunde) wählen
3. Nutzer meldet sich mit TAP an und registriert neue MFA-Methode
4. TAP läuft automatisch ab — kein manuelles Aufräumen nötig

**Eskalation:** Falls TAP nicht ausgestellt werden kann oder der
Nutzer eine privilegierte Admin-Rolle hat → Break-Glass-Prozess
prüfen (siehe unten), aber NUR wenn der gesperrte Nutzer selbst
einer der Break-Glass-Accounts ist. Für normale Nutzer ist TAP
immer der richtige Weg, nicht Break-Glass.

---

### 4. "Warum muss ich das überhaupt machen? Mein Passwort ist sicher."

**Häufigkeit:** Mittel

**Antwort:**
Empathisch, faktenbasiert, kein Vortrag:

> "Das Problem ist nicht dein Passwort selbst, sondern dass
> Passwörter durch Phishing, Datenlecks bei anderen Diensten
> (Wiederverwendung) oder einfaches Erraten kompromittiert werden
> können — unabhängig davon, wie gut du es wählst. MFA bedeutet:
> selbst wenn jemand dein Passwort hätte, bräuchte er zusätzlich dein
> Smartphone. Microsoft-Daten zeigen, dass das über 99% der
> Kontoübernahmen verhindert."

**Aktion:** Keine — Aufklärung reicht in den meisten Fällen. Bei
hartnäckigem Widerstand: an IT-Leitung verweisen, nicht selbst
Ausnahmen versprechen.

---

### 5. "Ich reise viel / bin oft offline — funktioniert MFA dann?"

**Häufigkeit:** Niedrig-Mittel (v.a. Vertrieb, Geschäftsführung)

**Antwort:**
Microsoft Authenticator generiert Codes auch offline (TOTP,
zeitbasiert) — funktioniert ohne Internetverbindung auf dem
Smartphone. Nur die "Push-Benachrichtigung" (Tippen auf "Genehmigen")
braucht Internet; der angezeigte 6-stellige Code funktioniert immer.

**Aktion:** In der Authenticator-App sicherstellen, dass für das
Konto sowohl Push als auch "Einmalkennwort verwenden" verfügbar ist
(Standard bei korrekter Einrichtung).

---

### 6. "Ich habe ein neues Smartphone — meine Authenticator-App ist weg"

**Häufigkeit:** Niedrig, aber wiederkehrend (laufender Betrieb)

**Antwort:**
Authenticator-Daten sind nicht automatisch über Geräte synchronisiert
(außer iCloud-Backup bei iOS, abhängig von Einstellungen).

**Aktion:**
1. Identität über alternativen Kanal verifizieren (wie bei Ticket #3)
2. Alte Methode in Entra Admin Center entfernen
3. Temporary Access Pass ausstellen
4. Nutzer registriert Authenticator auf neuem Gerät neu

---

## Eskalationsmatrix

| Situation | Helpdesk-Aktion | Eskalation an |
| --- | --- | --- |
| Standard-Setup-Probleme (#1, #2) | Direkt lösen | — |
| Aussperrung normaler Nutzer (#3) | TAP ausstellen | IT Admin falls TAP fehlschlägt |
| Aussperrung Break-Glass-Account | NICHT selbst lösen | Sofort an Senior IT Admin / Geschäftsführung (gemäß Break-Glass-Prozess) |
| Ausnahmeantrag | Nicht selbst genehmigen | An IT Admin gemäß exceptionProcess |
| Wiederholte Tickets derselben Person | Muster dokumentieren | An IT Admin — ggf. zusätzliche Schulung |

---

## Wichtigster Grundsatz für das Helpdesk-Team

**Niemals MFA "vorübergehend deaktivieren", um ein Ticket schnell zu
schließen.** Jede Deaktivierung — auch für 10 Minuten — ist ein
Sicherheitsvorfall und muss über den dokumentierten Ausnahmeprozess
laufen, nicht ad-hoc durch den Helpdesk. Der Temporary Access Pass
deckt praktisch jeden legitimen Aussperrungsfall ab, ohne die
Policy selbst zu berühren.
