import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0a0f1e",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "gordon365 | Microsoft 365 & Cloud Consulting",
    template: "%s | gordon365",
  },
  description:
    "Microsoft 365, Intune, Autopilot, Conditional Access und Zero Trust – Cloud Consulting von Gordon.",
  metadataBase: new URL("https://gordon365.com"),
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
  openGraph: {
    title: "gordon365 | Microsoft 365 & Cloud Consulting",
    description:
      "Microsoft 365, Intune, Autopilot, Conditional Access und Zero Trust – Cloud Consulting von Gordon.",
    url: "https://gordon365.com",
    siteName: "gordon365",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "gordon365 Logo",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "gordon365",
    description: "Microsoft 365 & Cloud Consulting",
    images: ["/android-chrome-512x512.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
