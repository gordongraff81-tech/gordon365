import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google"; // <-- Neu hinzugefügt
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0a0f1e",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gordon365.com"),

  title: {
    default: "gordon365 | Microsoft 365 & Cloud Consulting",
    template: "%s | gordon365",
  },

  description:
    "Microsoft 365, Intune, Autopilot, Conditional Access und Zero Trust – Cloud Consulting von Gordon.",

  // Canonical is set per-locale in [locale]/layout.tsx.
  // Setting it here on the root layout would conflict with
  // the /en canonical and signal two canonicals for the same content.

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body>
        {children}
        <GoogleAnalytics gaId="G-6F24DD5C88" /> {/* <-- Neu hinzugefügt */}
      </body>
    </html>
  );
}