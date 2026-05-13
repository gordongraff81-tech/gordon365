export const runtime = 'edge';

import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "AGB – Gordon365",
  description: "Allgemeine Geschäftsbedingungen für IT-Beratungsleistungen",
  robots: { index: false, follow: false },
};

export default function AGBPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale ?? "de";

  return (
    <div className="min-h-screen bg-bg-0 text-text-1">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/8 bg-bg-0/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href={`/${locale}`} className="flex items-center">
            <Image
              src="/logo-nav.png"
              alt="Gordon365"
              width={112}
              height={56}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
          <Link
            href={`/${locale}`}
            className="text-sm text-text-2 hover:text-text-1 transition-colors"
          >
            ← Zurück zur Startseite
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-text-1 mb-2">
          Allgemeine Geschäftsbedingungen
        </h1>
        <p className="text-text-3 text-sm mb-12">
          für IT-Beratungs- und Dienstleistungen · Gordon Graff, Berlin
        </p>

        <Section title="§ 1 Geltungsbereich">
          <p>
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle
            Verträge, die zwischen Gordon Graff, Nordbahnstr. 25, 13409 Berlin
            (nachfolgend „Auftragnehmer") und seinen Auftraggebern (nachfolgend
            „Auftraggeber") über IT-Beratung, Microsoft 365 Consulting,
            Modern-Workplace-Engineering und verwandte Dienstleistungen
            geschlossen werden.
          </p>
          <p className="mt-3">
            Abweichende Bedingungen des Auftraggebers finden keine Anwendung,
            es sei denn, der Auftragnehmer stimmt deren Geltung ausdrücklich
            schriftlich zu.
          </p>
        </Section>

        <Section title="§ 2 Vertragsschluss">
          <p>
            Angebote des Auftragnehmers sind freibleibend und unverbindlich.
            Ein Vertrag kommt erst durch schriftliche Auftragsbestätigung des
            Auftragnehmers oder durch Aufnahme der Leistungserbringung zustande.
          </p>
          <p className="mt-3">
            Anfragen über das Kontaktformular oder per E-Mail stellen noch
            keinen verbindlichen Vertragsschluss dar.
          </p>
        </Section>

        <Section title="§ 3 Leistungsumfang">
          <p>
            Der genaue Leistungsumfang ergibt sich aus dem jeweiligen Angebot
            bzw. dem individuellen Projektvertrag. Dazu können insbesondere
            gehören:
          </p>
          <ul className="mt-3 ml-5 list-disc space-y-1 text-text-2">
            <li>Microsoft 365 Tenant-Konfiguration und Administration</li>
            <li>Entra ID / Azure AD – Identity- und Access-Management</li>
            <li>Microsoft Intune – Endpoint- und Mobile-Device-Management</li>
            <li>Exchange Online, Teams, SharePoint Beratung und Implementierung</li>
            <li>Security & Compliance (Defender, Purview, Conditional Access)</li>
            <li>Microsoft Copilot Readiness und Rollout</li>
            <li>Schulungen und Workshops für Endanwender und IT-Abteilungen</li>
            <li>Dokumentation und technische Konzepte</li>
          </ul>
          <p className="mt-4">
            Änderungen des Leistungsumfangs bedürfen der schriftlichen
            Vereinbarung (Change Request). Mehraufwand durch Änderungswünsche
            des Auftraggebers wird gesondert vergütet.
          </p>
        </Section>

        <Section title="§ 4 Mitwirkungspflichten des Auftraggebers">
          <p>
            Der Auftraggeber ist verpflichtet, alle für die Leistungserbringung
            erforderlichen Informationen, Zugänge und Unterlagen rechtzeitig
            bereitzustellen. Insbesondere hat der Auftraggeber:
          </p>
          <ul className="mt-3 ml-5 list-disc space-y-1 text-text-2">
            <li>
              Administrative Zugänge (Global Admin, oder delegierte
              Administratorrollen) rechtzeitig einzurichten
            </li>
            <li>
              Einen internen Ansprechpartner für fachliche Rückfragen zu
              benennen
            </li>
            <li>
              Testumgebungen und Testgeräte bei Bedarf bereitzustellen
            </li>
            <li>
              Erforderliche interne Genehmigungen (Change-Management,
              Compliance) eigenverantwortlich einzuholen
            </li>
          </ul>
          <p className="mt-4">
            Verzögerungen, die auf nicht rechtzeitig erbrachten Mitwirkungen
            des Auftraggebers beruhen, gehen nicht zu Lasten des
            Auftragnehmers. Etwaige Mehraufwände werden dem Auftraggeber in
            Rechnung gestellt.
          </p>
        </Section>

        <Section title="§ 5 Vergütung und Zahlungsbedingungen">
          <p>
            Die Vergütung richtet sich nach dem individuell vereinbarten
            Tagessatz oder Festpreis gemäß Angebot. Alle Preise verstehen sich
            zzgl. der gesetzlichen Umsatzsteuer.
          </p>
          <p className="mt-3">
            Rechnungen sind innerhalb von 14 Tagen nach Rechnungsdatum ohne
            Abzug zu begleichen. Bei Zahlungsverzug werden Verzugszinsen in
            Höhe von 9 Prozentpunkten über dem Basiszinssatz gemäß § 288 Abs.
            2 BGB berechnet.
          </p>
          <p className="mt-3">
            Bei Projekten mit einer Laufzeit von mehr als einem Monat ist der
            Auftragnehmer berechtigt, monatliche Abschlagsrechnungen auf Basis
            des geleisteten Aufwands zu stellen.
          </p>
        </Section>

        <Section title="§ 6 Geheimhaltung">
          <p>
            Beide Parteien verpflichten sich, alle im Rahmen der
            Zusammenarbeit erlangten vertraulichen Informationen der jeweils
            anderen Partei vertraulich zu behandeln und nicht an Dritte
            weiterzugeben. Diese Verpflichtung gilt auch nach Beendigung des
            Vertragsverhältnisses fort.
          </p>
          <p className="mt-3">
            Als vertraulich gelten insbesondere: Geschäftsgeheimnisse,
            Kundendaten, Konfigurationsdetails, Zugangsdaten sowie sonstige als
            vertraulich gekennzeichnete Informationen.
          </p>
          <p className="mt-3">
            Der Auftragnehmer ist berechtigt, den Auftraggeber als
            Referenzkunden zu nennen, sofern der Auftraggeber dem nicht
            ausdrücklich widerspricht.
          </p>
        </Section>

        <Section title="§ 7 Datenschutz">
          <p>
            Der Auftragnehmer verarbeitet personenbezogene Daten des
            Auftraggebers ausschließlich zur Vertragserfüllung und gemäß den
            gesetzlichen Bestimmungen (DSGVO, BDSG). Soweit der Auftragnehmer
            im Rahmen der Leistungserbringung Zugriff auf personenbezogene
            Daten des Auftraggebers erhält, ist ein gesonderter
            Auftragsverarbeitungsvertrag (AVV) gemäß Art. 28 DSGVO
            abzuschließen.
          </p>
        </Section>

        <Section title="§ 8 Haftung">
          <p>
            Der Auftragnehmer haftet uneingeschränkt für Schäden aus der
            Verletzung des Lebens, des Körpers oder der Gesundheit, für Schäden
            bei grobem Verschulden sowie für Schäden, für die eine
            verschuldensunabhängige Haftung gesetzlich vorgesehen ist.
          </p>
          <p className="mt-3">
            Im Übrigen ist die Haftung auf den vertragstypischen,
            vorhersehbaren Schaden begrenzt. Die Haftung für mittelbare Schäden
            und Folgeschäden, insbesondere entgangenen Gewinn, ist
            ausgeschlossen, soweit nicht grobes Verschulden oder Vorsatz
            vorliegt.
          </p>
          <p className="mt-3">
            Die Haftung für Datenverlust ist auf den typischen
            Wiederherstellungsaufwand beschränkt, der bei ordnungsgemäßer und
            regelmäßiger Datensicherung durch den Auftraggeber entstanden wäre.
          </p>
        </Section>

        <Section title="§ 9 Laufzeit und Kündigung">
          <p>
            Die Laufzeit richtet sich nach der individuellen Projektvereinbarung.
            Dauerschuldverhältnisse (Retainer, Managed Services) können von
            beiden Parteien mit einer Frist von 4 Wochen zum Monatsende
            ordentlich gekündigt werden, soweit nicht abweichend vereinbart.
          </p>
          <p className="mt-3">
            Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt
            unberührt. Ein wichtiger Grund liegt insbesondere vor, wenn der
            Auftraggeber mit Zahlungen in Verzug ist oder wesentliche
            Vertragspflichten verletzt.
          </p>
        </Section>

        <Section title="§ 10 Schlussbestimmungen">
          <p>
            Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss
            des UN-Kaufrechts (CISG).
          </p>
          <p className="mt-3">
            Gerichtsstand für alle Streitigkeiten aus und im Zusammenhang mit
            diesem Vertrag ist Berlin, sofern der Auftraggeber Kaufmann,
            juristische Person des öffentlichen Rechts oder öffentlich-rechtliches
            Sondervermögen ist.
          </p>
          <p className="mt-3">
            Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden,
            bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
            Anstelle der unwirksamen Bestimmung gilt diejenige wirksame
            Regelung, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung
            am nächsten kommt.
          </p>
          <p className="mt-4 text-text-3 text-sm">
            Stand: {new Date().toLocaleDateString("de-DE", { month: "long", year: "numeric" })} · Gordon Graff, Berlin
          </p>
        </Section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/8 py-8 text-center text-sm text-text-3">
        <div className="mx-auto max-w-7xl px-6 flex flex-wrap justify-center gap-6">
          <Link href={`/${locale}/impressum`} className="hover:text-text-1 transition-colors">
            Impressum
          </Link>
          <Link href={`/${locale}/datenschutz`} className="hover:text-text-1 transition-colors">
            Datenschutz
          </Link>
          <Link href={`/${locale}/agb`} className="hover:text-text-1 transition-colors">
            AGB
          </Link>
        </div>
        <p className="mt-4">© {new Date().getFullYear()} Gordon Graff · gordon365.com</p>
      </footer>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <h2 className="font-display text-lg font-bold text-text-1 mb-3 pb-2 border-b border-white/10">
        {title}
      </h2>
      <div className="text-text-2 leading-relaxed space-y-1">{children}</div>
    </div>
  );
}
