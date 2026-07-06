export const metadata = {
  title: "Impressum",
};

// Place at src/app/[locale]/impressum/page.tsx
// Rendered the same regardless of locale, the Impressum stays in German
// since that is the legally required language for this disclosure.

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 prose prose-neutral">
      <h1>Impressum</h1>
      <p>Angaben gemäß § 5 TMG, § 18 Abs. 2 MStV</p>

      <h2>Anbieter</h2>
      <p>
        Gordon Graff
        <br />
        Nordbahnstr. 25
        <br />
        13409 Berlin
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: <a href="tel:+493040791017">+49 30 40791017</a>
        <br />
        E Mail: <a href="mailto:info@gordon365.com">info@gordon365.com</a>
      </p>

      <h2>Umsatzsteuer ID</h2>
      <p>
        Umsatzsteuer Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
        <br />
        DE358541578
      </p>
      <p>
        Es gilt die Kleinunternehmerregelung gemäß § 19 UStG, auf Inlandsumsätze wird keine
        Umsatzsteuer ausgewiesen.
      </p>

      <h2>Berufsbezeichnung</h2>
      <p>
        IT Berater / Microsoft 365 Consultant (Berufsbezeichnung verliehen in der Bundesrepublik
        Deutschland)
      </p>

      <h2>Verantwortlich gemäß § 18 Abs. 2 MStV</h2>
      <p>
        Gordon Graff
        <br />
        Nordbahnstr. 25
        <br />
        13409 Berlin
      </p>

      <h2>Haftungsausschluss</h2>

      <h3>Haftung für Inhalte</h3>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach
        den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
        jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
        überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
      </p>
      <p>
        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
        allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst
        ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
        von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
      </p>

      <h3>Haftung für Links</h3>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
        Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
        Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
        Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
        mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
        Verlinkung nicht erkennbar.
      </p>

      <h3>Urheberrecht</h3>
      <p>
        Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
        dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
        Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung
        des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den
        privaten, nicht kommerziellen Gebrauch gestattet.
      </p>

      <h3>Streitschlichtung</h3>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online Streitbeilegung (OS) bereit:{" "}
        <a href="https://ec.europa.eu/consumers/odr/">https://ec.europa.eu/consumers/odr/</a>
      </p>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </main>
  );
}
