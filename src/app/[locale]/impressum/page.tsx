export const runtime = 'edge';

import type { Metadata } from "next";
import Link from "next/link";
import { localeHref } from "@/lib/localePath";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `https://gordon365.com${locale === "de" ? "" : "/en"}/impressum`;

  return {
    title: { absolute: "Impressum – Gordon365" },
    description: "Angaben gemäß § 5 TMG / § 18 Abs. 2 MStV",
    alternates: {
      canonical,
    },
    robots: { index: false, follow: true },
  };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-bg-0 text-text-1">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/8 bg-bg-0/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href={localeHref(locale)} className="flex items-center">
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
            href={localeHref(locale)}
            className="text-sm text-text-2 hover:text-text-1 transition-colors"
          >
            ← Zurück zur Startseite
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-text-1 mb-2">
          Impressum
        </h1>
        <p className="text-text-3 text-sm mb-12">
          Angaben gemäß § 5 TMG / § 18 Abs. 2 MStV
        </p>

        <Section title="Anbieter">
          <p>Gordon Graff</p>
          <p>Nordbahnstr. 25</p>
          <p>13409 Berlin</p>
        </Section>

        <Section title="Kontakt">
          <p>
            Telefon:{" "}
            <a href="tel:+493040791017" className="text-accent hover:underline">
              +49 30 40791017
            </a>
          </p>
          <p>
            E-Mail:{" "}
            <a
              href="mailto:info@gordon365.com"
              className="text-accent hover:underline"
            >
              info@gordon365.com
            </a>
          </p>
        </Section>

        <Section title="Umsatzsteuer-ID">
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
          </p>
          <p className="font-mono mt-1">DE358541578</p>
        </Section>

        <Section title="Berufsbezeichnung">
          <p>IT-Berater / Microsoft 365 Consultant</p>
          <p className="text-text-3 text-sm mt-1">
            (Berufsbezeichnung verliehen in der Bundesrepublik Deutschland)
          </p>
        </Section>

        <Section title="Verantwortlich gemäß § 18 Abs. 2 MStV">
          <p>Gordon Graff</p>
          <p>Nordbahnstr. 25</p>
          <p>13409 Berlin</p>
        </Section>

        <Section title="Haftungsausschluss">
          <Subsection title="Haftung für Inhalte">
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
              jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die
              auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p className="mt-3">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
              Informationen nach den allgemeinen Gesetzen bleiben hiervon
              unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
              Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
              Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir
              diese Inhalte umgehend entfernen.
            </p>
          </Subsection>
          <Subsection title="Haftung für Links">
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen. Für die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
              wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
              überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
              Verlinkung nicht erkennbar.
            </p>
          </Subsection>
          <Subsection title="Urheberrecht">
            <p>
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht
              kommerziellen Gebrauch gestattet.
            </p>
          </Subsection>
        </Section>

        <Section title="Streitschlichtung">
          <p>
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p className="mt-3">
            Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>
        </Section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/8 py-8 text-center text-sm text-text-3">
        <div className="mx-auto max-w-7xl px-6 flex flex-wrap justify-center gap-6">
          <Link href={localeHref(locale, "impressum")} className="hover:text-text-1 transition-colors">
            Impressum
          </Link>
          <Link href={localeHref(locale, "datenschutz")} className="hover:text-text-1 transition-colors">
            Datenschutz
          </Link>
          <Link href={localeHref(locale, "agb")} className="hover:text-text-1 transition-colors">
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
