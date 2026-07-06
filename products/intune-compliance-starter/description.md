# Intune Device Compliance Starter

Windows 11 Geräte-Compliance-Policies für Microsoft Intune —
BitLocker, Defender Antivirus, Defender Firewall, OS-Versions-Baseline
und direkte Verknüpfung mit Conditional-Access-Compliance-Anforderungen.

## Problem

Die meisten Tenants aktivieren Defender und nennen das
"Gerätesicherheit" — ohne zu prüfen, ob es aktiv bleibt, ohne
Festplattenverschlüsselung zu erzwingen, und ohne ein
Compliance-Signal, auf das Conditional Access reagieren kann. Das wird
kritisch, sobald "Require compliant device"-Policies wie CA004 aus dem
CA Hardening Pack aktiviert werden: ohne Compliance-Policy ist JEDES
Gerät "Not Compliant" — und CA004 blockiert jeden Admin-Login.

## Was enthalten ist

- 5 Compliance-Policies: Windows 11 Baseline, BitLocker, Defender AV,
  Defender Firewall, Passwort/PIN
- 4 Konfigurationsprofile, die diese Einstellungen tatsächlich
  durchsetzen
- Vollständiges Compliance-zu-Conditional-Access-Mapping mit
  Sequenzierungs-Warnung
- 8-stufige Rollout-Reihenfolge mit Begründung pro Schritt
- Dokumentierter Ausnahmeprozess
- 6 KPI-Definitionen mit Graph-API-Quelle
- Microsoft365DSC-Mapping (Phase 2 vorbereitet)

## Für wen

IT-Admins und MSPs, die Geräte-Compliance als eigenständiges
Sicherheitsthema angehen — oder CA004 aus dem CA Hardening Pack zum
Laufen bringen wollen, ohne sich selbst auszusperren.

## Voraussetzungen

Microsoft 365 Business Premium, Intune Plan 1 (oder höher).
