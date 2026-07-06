import NavV2 from "@/components/ui/NavV2";
import Footer from "@/components/sections/Footer";
import AmbientBg from "@/components/ui/AmbientBg";
import Link from "next/link";

const COPY = {
  de: {
    badge:   "Zahlung abgebrochen",
    title:   "Kein Problem — du kannst jederzeit zurückkehren.",
    sub:     "Deine Zahlung wurde nicht abgeschlossen. Es wurde kein Betrag belastet.",
    back:    "Zurück zur Intune-Seite",
    support: "Fragen? Schreib uns an",
  },
  en: {
    badge:   "Payment cancelled",
    title:   "No worries — you can return any time.",
    sub:     "Your payment was not completed. You have not been charged.",
    back:    "Back to Intune page",
    support: "Questions? Contact us at",
  },
} as const;

export default async function CancelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = COPY[locale === "de" ? "de" : "en"];

  const A1 = "#f59e0b";
  const A2 = "#ef4444";

  return (
    <>
      <AmbientBg />
      <NavV2 locale={locale} />
      <main className="min-h-screen flex items-center justify-center px-4 py-24">
        <div className="max-w-md w-full text-center space-y-8">

          {/* Icon */}
          <div className="relative mx-auto w-20 h-20">
            <div
              className="absolute inset-0 rounded-full animate-pulse"
              style={{ background: `radial-gradient(circle, ${A1}20 0%, transparent 70%)` }}
            />
            <div
              className="relative w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${A1}18 0%, ${A2}10 100%)`,
                border: `1.5px solid ${A1}40`,
                boxShadow: `0 0 32px ${A1}25`,
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                stroke={A1} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </div>
          </div>

          {/* Badge */}
          <span
            className="inline-flex items-center gap-1.5 text-[0.75rem] font-bold px-3 py-1 rounded-full"
            style={{ background: `${A1}12`, border: `1px solid ${A1}28`, color: A1 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {t.badge}
          </span>

          {/* Headline */}
          <div className="space-y-3">
            <h1
              className="font-display font-bold text-[2rem] tracking-[-0.04em] leading-tight"
              style={{ color: "#f1f5f9" }}
            >
              {t.title}
            </h1>
            <p className="text-[1rem] leading-relaxed" style={{ color: "rgba(148,163,184,0.8)" }}>
              {t.sub}
            </p>
          </div>

          {/* Support */}
          <p className="text-[0.8125rem]" style={{ color: "rgba(100,116,139,0.6)" }}>
            {t.support}{" "}
            <a
              href="mailto:gordon@gordon365.com"
              className="underline underline-offset-2 transition-colors"
              style={{ color: A1 }}
            >
              gordon@gordon365.com
            </a>
          </p>

          {/* CTA */}
          <Link
            href={`/${locale}/intune`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-[0.9375rem] transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
            style={{
              background: `linear-gradient(135deg, ${A1} 0%, ${A2} 100%)`,
              color: "#fff",
              boxShadow: `0 0 24px ${A1}40`,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            {t.back}
          </Link>

        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
