import NavV2 from "@/components/ui/NavV2";
import IntuneSection from "@/components/sections/IntuneSection";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import AmbientBg from "@/components/ui/AmbientBg";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://gordon365.com";
  const slug = "intune";
  const isDE = locale === "de";

  return {
    title: isDE
      ? "Microsoft Intune Consultant — Gordon365"
      : "Microsoft Intune Consultant — Gordon365",
    description: isDE
      ? "Vollautomatisches Intune-Deployment, Security Baselines, Autopilot und Drift Detection für Ihr Microsoft 365 Environment."
      : "Fully automated Intune deployment, security baselines, Autopilot and drift detection for your Microsoft 365 environment.",
    alternates: {
      canonical: `${baseUrl}${isDE ? "" : "/en"}/${slug}`,
      languages: {
        "de-DE": `${baseUrl}/${slug}`,
        "en-US": `${baseUrl}/en/${slug}`,
        "x-default": `${baseUrl}/${slug}`,
      },
    },
    openGraph: {
      title: "Microsoft Intune Consultant — Gordon365",
      url: `${baseUrl}${isDE ? "" : "/en"}/${slug}`,
      siteName: "Gordon365",
      locale: isDE ? "de_DE" : "en_US",
      type: "website",
    },
  };
}

export default async function IntunePage({
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
        <IntuneSection />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
