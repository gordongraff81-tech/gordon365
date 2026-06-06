import NavV2 from "@/components/ui/NavV2";
import M365SecuritySystem from "@/components/sections/M365SecuritySystem";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import AmbientBg from "@/components/ui/AmbientBg";

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
        <M365SecuritySystem />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
