import NavV2 from "@/components/ui/NavV2";
import HeroV2 from "@/components/sections/HeroV2";
import SecurityScrollytelling from "@/components/sections/SecurityScrollytelling";
import SecurityChecker from "@/components/sections/SecurityChecker";
import BentoServicesGrid from "@/components/sections/BentoServicesGrid";
import IntuneSection from "@/components/sections/IntuneSection";
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

  return (
    <>
      <AmbientBg />
      <NavV2 locale={locale} />
      <main>
        <HeroV2 />
        <StatsBar />
        <SecurityScrollytelling />
        <SecurityChecker />
        <BentoServicesGrid />
        <IntuneSection />
        <Capabilities />
        <Results />
        <Insights />
        <Why />
        <Testimonials />
        <FAQ />
        <CtaBand />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}