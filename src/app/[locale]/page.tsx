// 1. Der Import von unstable_setRequestLocale wurde entfernt

// Neue V2-Komponenten
import NavV2 from "@/components/ui/NavV2";
import HeroV2 from "@/components/sections/HeroV2";
import SecurityScrollytelling from "@/components/sections/SecurityScrollytelling";
import SecurityChecker from "@/components/sections/SecurityChecker";
import BentoServicesGrid from "@/components/sections/BentoServicesGrid";

// Bestehende Komponenten (unverändert)
import AmbientBg from "@/components/ui/AmbientBg";
import StatsBar from "@/components/sections/StatsBar";
import Capabilities from "@/components/sections/Capabilities";
import Results from "@/components/sections/Results";
import Insights from "@/components/sections/Insights";
import Why from "@/components/sections/Why";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CtaBand from "@/components/sections/CtaBand";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // 2. Der Aufruf von unstable_setRequestLocale(locale) wurde entfernt.
  // Next.js 15 + next-intl regeln das jetzt automatisch über die Server-Konfiguration.

  return (
    <>
      <AmbientBg />
      {/* NavV2 ersetzt Nav — ultra-flat, adaptive backdrop-blur */}
      <NavV2 />
      <main>
        {/* HeroV2 — Scroll-getriggerter Zoom + Cloud-Orb */}
        <HeroV2 />

        <StatsBar />

        {/* 
          SecurityScrollytelling ersetzt SecurityChecker: 
          Apple-style "Explosionszeichnung" mit sticky positioning.
        */}
        <SecurityScrollytelling />

        {/* SecurityChecker — interaktives 5-Fragen Tool mit Score + Findings */}
        <SecurityChecker />

        {/* 
          BentoServicesGrid ersetzt Services: 
          Apple Bento-Grid mit Glasmorphismus.
        */}
        <BentoServicesGrid />

        <Capabilities />
        <Results />
        <Insights />
        <Why />
        <Testimonials />
        <FAQ />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
    </>
  );
}