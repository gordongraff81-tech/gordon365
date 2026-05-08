import AmbientBg from "@/components/ui/AmbientBg";
import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import SecurityChecker from "@/components/sections/SecurityChecker";
import Services from "@/components/sections/Services";
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
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <SecurityChecker />
        <Services />
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