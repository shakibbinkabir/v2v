import type { Metadata } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getSiteCopy } from "@/lib/content";
import { jsonLDScript, organizationLD } from "@/lib/structured-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bangla",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.v2vbridge.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "V2V Bridge — Voice to Venture",
    template: "%s | V2V Bridge",
  },
  description:
    "A youth-led storytelling project amplifying women entrepreneurs in Satkhira, under Plan International Bangladesh's Youth Equality Award 2026.",
  openGraph: {
    title: "V2V Bridge — Voice to Venture",
    description:
      "Voices, podcasts, and reels from women entrepreneurs in Satkhira.",
    url: "/",
    siteName: "V2V Bridge",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    locale: "en_GB",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const site = getSiteCopy();
  return (
    <html lang="en" className={`${inter.variable} ${hindSiliguri.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header site={site} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer site={site} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLDScript(organizationLD()) }}
        />
      </body>
    </html>
  );
}
