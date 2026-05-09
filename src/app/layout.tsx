export const runtime = 'edge';

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gordon365",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}