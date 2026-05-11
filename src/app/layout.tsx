export const runtime = 'edge';

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "gordon365",
  description: "Microsoft Cloud Consulting & Modern Workplace Engineering",
  alternates: {
    canonical: "https://gordon365.com/de", // Deine primäre Sprache als Standard
    languages: {
      "de-DE": "https://gordon365.com/de",
      "en-US": "https://gordon365.com/en",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        {children}
      </body>
    </html>
  );
}