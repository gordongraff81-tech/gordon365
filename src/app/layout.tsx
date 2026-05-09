import type { Metadata } from "next";
export const runtime = 'edge';
export const runtime = 'edge';
import "./globals.css";
export const runtime = 'edge';
export const runtime = 'edge';

// Erforderlich für das Deployment auf Cloudflare Pages, 
// da dieses Layout alle anderen Routen umschließt.
export const runtime = 'edge';

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
