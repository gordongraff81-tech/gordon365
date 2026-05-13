export const runtime = 'edge';

import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Datenschutzerklärung – Gordon365",
  description: "Informationen zum Datenschutz gemäß DSGVO",
  robots: { index: false, follow: false },
};

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
Danach das gleiche für ImpressumPage zeigen.

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
          Datenschutzerklärung
        </h1>
        <p className="text-text-3 text-sm mb-12">
          Stand: {new Date().toLocaleDateString("de-DE", { month: "long", year: "numeric" })}
        </p>

        <Section title="1. Verantwortlicher">
          <p>
            Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO)
            und anderer nationaler Datenschutzgesetze sowie sonstiger
            datenschutzrechtlicher Bestimmungen ist:
          </p>
          <div className="mt-3 p-4 rounded-lg bg-white/4 border border-white/8 font-mono text-sm">
            <p>Gordon Graff</p>
            <p>Nordbahnstr. 25</p>
            <p>13409 Berlin</p>
            <p className="mt-2">
              E-Mail:{" "}
              <a href="mailto:info@gordon365.com" className="text-accent hover:underline">
                info@gordon365.com
              </a>
            </p>
            <p>
              Tel.:{" "}
              <a href="tel:+493040791017" className="text-accent hover:underline">
                +49 30 40791017
              </a>
            </p>
          </div>
        </Section>

        <Section title="2. Allgemeines zur Datenverarbeitung">
          <Subsection title="Umfang der Verarbeitung personenbezogener Daten">
            <p>
              Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich
              nur, soweit dies zur Bereitstellung einer funktionsfähigen Website
              sowie unserer Inhalte und Leistungen erforderlich ist. Die
              Verarbeitung personenbezogener Daten unserer Nutzer erfolgt
              regelmäßig nur nach Einwilligung des Nutzers. Eine Ausnahme gilt in
              solchen Fällen, in denen eine vorherige Einholung einer Einwilligung
              aus tatsächlichen Gründen nicht möglich ist und die Verarbeitung der
              Daten durch gesetzliche Vorschriften gestattet ist.
            </p>
          </Subsection>
          <Subsection title="Rechtsgrundlage für die Verarbeitung personenbezogener Daten">
            <p>
              Soweit wir für Verarbeitungsvorgänge personenbezogener Daten eine
              Einwilligung der betroffenen Person einholen, dient Art. 6 Abs. 1
              lit. a EU-DSGVO als Rechtsgrundlage. Bei der Verarbeitung von
              personenbezogenen Daten, die zur Erfüllung eines Vertrages
              erforderlich ist, dient Art. 6 Abs. 1 lit. b DSGVO als
              Rechtsgrundlage. Dies gilt auch für Verarbeitungsvorgänge, die zur
              Durchführung vorvertraglicher Maßnahmen erforderlich sind.
            </p>
          </Subsection>
          <Subsection title="Datenlöschung und Speicherdauer">
            <p>
              Die personenbezogenen Daten der betroffenen Person werden gelöscht
              oder gesperrt, sobald der Zweck der Speicherung entfällt. Eine
              Speicherung kann darüber hinaus erfolgen, wenn dies durch den
              europäischen oder nationalen Gesetzgeber in unionsrechtlichen
              Verordnungen, Gesetzen oder sonstigen Vorschriften, denen der
              Verantwortliche unterliegt, vorgesehen wurde. Eine Sperrung oder
              Löschung der Daten erfolgt auch dann, wenn eine durch die genannten
              Normen vorgeschriebene Speicherfrist abläuft, es sei denn, dass eine
              Erforderlichkeit zur weiteren Speicherung der Daten für einen
              Vertragsabschluss oder eine Vertragserfüllung besteht.
            </p>
          </Subsection>
        </Section>

        <Section title="3. Bereitstellung der Website und Erstellung von Logfiles">
          <p>
            Bei jedem Aufruf unserer Internetseite erfasst unser System
            automatisiert Daten und Informationen vom Computersystem des
            aufrufenden Rechners. Folgende Daten werden hierbei erhoben:
          </p>
          <ul className="mt-3 ml-5 list-disc space-y-1 text-text-2">
            <li>Informationen über den Browsertyp und die verwendete Version</li>
            <li>Das Betriebssystem des Nutzers</li>
            <li>Den Internet-Service-Provider des Nutzers</li>
            <li>Die IP-Adresse des Nutzers</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>Websites, von denen das System des Nutzers auf unsere Internetseite gelangt</li>
            <li>Websites, die vom System des Nutzers über unsere Website aufgerufen werden</li>
          </ul>
          <p className="mt-4">
            Die Daten werden ebenfalls in den Logfiles unseres Systems
            gespeichert. Eine Speicherung dieser Daten zusammen mit anderen
            personenbezogenen Daten des Nutzers findet nicht statt. Die
            Rechtsgrundlage für die vorübergehende Speicherung der Daten und der
            Logfiles ist Art. 6 Abs. 1 lit. f DSGVO.
          </p>
          <p className="mt-3">
            Die vorübergehende Speicherung der IP-Adresse durch das System ist
            notwendig, um eine Auslieferung der Website an den Rechner des Nutzers
            zu ermöglichen. Hierfür muss die IP-Adresse des Nutzers für die Dauer
            der Sitzung gespeichert bleiben. Die Logfiles werden nach spätestens
            7 Tagen gelöscht.
          </p>
        </Section>

        <Section title="4. Kontaktformular und E-Mail-Kontakt">
          <p>
            Auf unserer Internetseite ist ein Kontaktformular vorhanden, welches
            für die elektronische Kontaktaufnahme genutzt werden kann. Nimmt ein
            Nutzer diese Möglichkeit wahr, so werden die in der Eingabemaske
            eingegeben Daten an uns übermittelt und gespeichert. Diese Daten sind:
          </p>
          <ul className="mt-3 ml-5 list-disc space-y-1 text-text-2">
            <li>Name</li>
            <li>E-Mail-Adresse</li>
            <li>Nachrichteninhalt</li>
            <li>optional: Telefonnummer, Unternehmen</li>
          </ul>
          <p className="mt-4">
            Für die Verarbeitung der Daten wird im Rahmen des Absendevorgangs
            Ihre Einwilligung eingeholt und auf diese Datenschutzerklärung
            verwiesen. Rechtsgrundlage für die Verarbeitung der Daten ist bei
            Vorliegen einer Einwilligung des Nutzers Art. 6 Abs. 1 lit. a DSGVO.
            Rechtsgrundlage für die Verarbeitung der Daten, die im Zuge einer
            Übersendung einer E-Mail übermittelt werden, ist Art. 6 Abs. 1 lit. f
            DSGVO.
          </p>
          <p className="mt-3">
            Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes
            ihrer Erhebung nicht mehr erforderlich sind. Für die personenbezogenen
            Daten aus der Eingabemaske des Kontaktformulars und diejenigen, die per
            E-Mail übersandt wurden, ist dies dann der Fall, wenn die jeweilige
            Konversation mit dem Nutzer beendet ist. Die Konversation ist beendet,
            wenn sich aus den Umständen entnehmen lässt, dass der betroffene
            Sachverhalt abschließend geklärt ist. Gesetzliche Aufbewahrungsfristen
            bleiben unberührt.
          </p>
        </Section>

        <Section title="5. Hosting (Cloudflare Pages)">
          <p>
            Diese Website wird auf Cloudflare Pages gehostet. Anbieter ist
            Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA.
          </p>
          <p className="mt-3">
            Cloudflare verarbeitet dabei u. a. IP-Adressen der Seitenbesucher.
            Einzelheiten entnehmen Sie der Datenschutzerklärung von Cloudflare:{" "}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              https://www.cloudflare.com/privacypolicy/
            </a>
          </p>
          <p className="mt-3">
            Cloudflare hat Compliance-Zertifizierungen nach EU-US Data Privacy
            Framework. Der Einsatz von Cloudflare Pages erfolgt auf Grundlage von
            Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an
            einer möglichst zuverlässigen Darstellung unserer Website.
          </p>
        </Section>

        <Section title="6. Rechte der betroffenen Person">
          <p>
            Werden personenbezogene Daten von Ihnen verarbeitet, sind Sie
            Betroffener i.S.d. DSGVO und es stehen Ihnen folgende Rechte gegenüber
            dem Verantwortlichen zu:
          </p>
          <div className="mt-4 space-y-4">
            {[
              {
                title: "Auskunftsrecht (Art. 15 DSGVO)",
                text: "Sie können von dem Verantwortlichen eine Bestätigung darüber verlangen, ob personenbezogene Daten, die Sie betreffen, von uns verarbeitet werden.",
              },
              {
                title: "Recht auf Berichtigung (Art. 16 DSGVO)",
                text: "Sie haben ein Recht auf Berichtigung und/oder Vervollständigung gegenüber dem Verantwortlichen, sofern die verarbeiteten personenbezogenen Daten, die Sie betreffen, unrichtig oder unvollständig sind.",
              },
              {
                title: "Recht auf Löschung (Art. 17 DSGVO)",
                text: "Sie können von dem Verantwortlichen verlangen, dass die Sie betreffenden personenbezogenen Daten unverzüglich gelöscht werden.",
              },
              {
                title: "Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)",
                text: "Unter bestimmten Voraussetzungen können Sie die Einschränkung der Verarbeitung der Sie betreffenden personenbezogenen Daten verlangen.",
              },
              {
                title: "Recht auf Datenübertragbarkeit (Art. 20 DSGVO)",
                text: "Sie haben das Recht, die Sie betreffenden personenbezogenen Daten, die Sie dem Verantwortlichen bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.",
              },
              {
                title: "Widerspruchsrecht (Art. 21 DSGVO)",
                text: "Sie haben das Recht, aus Gründen, die sich aus ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten Widerspruch einzulegen.",
              },
            ].map(({ title, text }) => (
              <div key={title} className="pl-4 border-l-2 border-accent/30">
                <p className="font-semibold text-text-1 mb-1">{title}</p>
                <p className="text-text-2 text-sm">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-lg bg-white/4 border border-white/8">
            <p className="text-sm text-text-2">
              <strong className="text-text-1">Beschwerderecht bei einer Aufsichtsbehörde:</strong>{" "}
              Unbeschadet eines anderweitigen verwaltungsrechtlichen oder
              gerichtlichen Rechtsbehelfs steht Ihnen das Recht auf Beschwerde bei
              einer Aufsichtsbehörde zu. Die zuständige Aufsichtsbehörde in Berlin
              ist: Berliner Beauftragte für Datenschutz und Informationsfreiheit,
              Friedrichstr. 219, 10969 Berlin.
            </p>
          </div>
        </Section>

        <Section title="7. Cookies">
          <p>
            Unsere Website verwendet keine Tracking-Cookies oder
            Drittanbieter-Cookies. Es werden ausschließlich technisch notwendige
            Session-Cookies eingesetzt, die für den Betrieb der Website
            erforderlich sind und nach dem Schließen des Browsers automatisch
            gelöscht werden. Einer Einwilligung bedarf es hierfür gemäß § 25 Abs.
            2 TTDSG nicht.
          </p>
        </Section>

        <Section title="8. Änderungen dieser Datenschutzerklärung">
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie
            stets den aktuellen rechtlichen Anforderungen entspricht oder um
            Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen,
            z. B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt
            dann die neue Datenschutzerklärung.
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

function Subsection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <h3 className="font-semibold text-text-1 mb-2">{title}</h3>
      <div className="text-text-2 leading-relaxed">{children}</div>
    </div>
  );
}
