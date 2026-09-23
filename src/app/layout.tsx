import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/providers/ThemeProvider";
import { SkipLink } from "@/components/ui/SkipLink";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { TechnicalBackground } from "@/components/ui/TechnicalBackground";
import { site } from "@/content/site";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// TODO — replace with the real production URL before deploying.
const SITE_URL = "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: site.name ? `${site.name} — ${site.role}` : "Portfolio",
    template: `%s — ${site.name || "Portfolio"}`,
  },
  description:
    site.tagline || "Software engineer, data analyst, and AI/ML practitioner portfolio.",
  keywords: ["software engineer", "data analyst", "machine learning", "AI", "portfolio"],
  authors: site.name ? [{ name: site.name }] : undefined,
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: site.name ? `${site.name} — ${site.role}` : "Portfolio",
    description: site.tagline,
    siteName: site.name || "Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name ? `${site.name} — ${site.role}` : "Portfolio",
    description: site.tagline,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0C10" },
    { media: "(prefers-color-scheme: light)", color: "#F6F5F1" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name || undefined,
    jobTitle: site.role || undefined,
    email: site.email || undefined,
    url: SITE_URL,
    sameAs: site.socials.map((s) => s.href),
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Blocking theme script — prevents flash of wrong theme on load */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} font-body antialiased`}
      >
        <ThemeProvider>
        <SkipLink />

        <TechnicalBackground />
        <AmbientBackground />

        <div className="relative z-10">
          {children}
        </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
