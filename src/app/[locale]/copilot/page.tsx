import NavV2 from "@/components/ui/NavV2";
import Copilot from "@/components/sections/Copilot";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import AmbientBg from "@/components/ui/AmbientBg";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "copilot" });
  const baseUrl = "https://gordon365.com";
  const slug = "copilot";
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${baseUrl}/${locale}/${slug}`,
      languages: {
        en: `${baseUrl}/en/${slug}`,
        de: `${baseUrl}/de/${slug}`,
        "x-default": `${baseUrl}/en/${slug}`,
      },
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: `${baseUrl}/${locale}/${slug}`,
      siteName: "Gordon365",
      locale: locale === "de" ? "de_DE" : "en_US",
      type: "website",
    },
  };
}

export default async function CopilotPage({
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
        <Copilot />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
