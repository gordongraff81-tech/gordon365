import type { Metadata } from "next";
import AssessmentClient from "./AssessmentClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://gordon365.com";
  const slug = "assessment";
  const isDE = locale === "de";

  return {
    alternates: {
      canonical: `${baseUrl}${isDE ? "" : "/en"}/${slug}`,
      languages: {
        "de-DE": `${baseUrl}/${slug}`,
        "en-US": `${baseUrl}/en/${slug}`,
        "x-default": `${baseUrl}/${slug}`,
      },
    },
  };
}

export default function AssessmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <AssessmentClient params={params} />;
}
