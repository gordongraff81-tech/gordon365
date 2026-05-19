export const runtime = 'edge';

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "gordon365",
  description: "Microsoft Cloud Consulting & Modern Workplace Engineering",
  alternates: {
    canonical: "https://gordon365.com/de",
    languages: {
      "de-DE": "https://gordon365.com/de",
      "en-US": "https://gordon365.com/en",
    },
  },
  icons: {
    // SVG-Favicon: moderne Browser, scharf bei jeder Auflösung
    icon: [
      { url: "/favicon.svg",           type: "image/svg+xml"               },
      { url: "/icons/favicon-32.png",  sizes: "32x32",   type: "image/png" },
      { url: "/icons/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
