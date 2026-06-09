import NavV2 from "@/components/ui/NavV2";
import EntraId from "@/components/sections/EntraId";
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
  const isDE = locale === "de";
  const baseUrl = "https://gordon365.com";
  const slug = "entra-id";

  return {
    title: isDE
      ? "Microsoft Entra ID Consultant — Gordon365"
      : "Microsoft Entra ID Consultant — Gordon365",
    description: isDE
      ? "Conditional Access, MFA, Identity Protection und Privileged Identity Management für Ihr Microsoft 365 Environment."
      : "Conditional Access, MFA, Identity Protection and Privileged Identity Management for your Microsoft 365 environment.",
    alternates: {
      canonical: `${baseUrl}/${locale}/${slug}`,
      languages: {
        en: `${baseUrl}/en/${slug}`,
        de: `${baseUrl}/de/${slug}`,
        "x-default": `${baseUrl}/en/${slug}`,
      },
    },
    openGraph: {
      title: "Microsoft Entra ID Consultant — Gordon365",
      url: `${baseUrl}/${locale}/${slug}`,
      siteName: "Gordon365",
      locale: isDE ? "de_DE" : "en_US",
      type: "website",
    },
  };
}

export default async function EntraIdPage({
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
        <EntraId />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
