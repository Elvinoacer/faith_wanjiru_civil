import type { Metadata, Viewport } from "next";
import { Archivo, Inter, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { SiteProviders } from "@/components/site/SiteProviders";

/* ── Typography — MONUMENT system ──────────────────────────────────
   Display: Archivo (variable, width axis 62–125) → monumental at 118%
   Body:    Inter (neutral, invisible workhorse)
   Mono:    IBM Plex Mono (technical / drawing annotations)          */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

/* ── SEO per spec §56/§57 ───────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://faith-wanjiru.engineer"),
  title: {
    default: "Faith Wanjiru | Civil & Structural Engineer",
    template: "%s | Faith Wanjiru",
  },
  description:
    "Faith Wanjiru is a Moi University Civil & Structural Engineering graduate focused on structural design, construction and sustainable infrastructure. Explore her engineering projects, site experience and technical work.",
  keywords: [
    "Faith Wanjiru Civil Engineer",
    "Moi University Civil Engineering Graduate",
    "Graduate Structural Engineer Kenya",
    "Civil Engineer Kenya",
    "Structural Engineering Graduate Kenya",
  ],
  authors: [{ name: "Faith Wanjiru" }],
  openGraph: {
    title: "Faith Wanjiru | Civil & Structural Engineer",
    description:
      "Moi University Civil & Structural Engineering graduate focused on structural design, construction and sustainable infrastructure.",
    siteName: "Faith Wanjiru — Engineering Portfolio",
    type: "profile",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Faith Wanjiru | Civil & Structural Engineer",
    description:
      "Civil & Structural Engineering graduate — structural design, construction and sustainable infrastructure.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2EFE7" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0D10" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${archivo.variable} ${inter.variable} ${plexMono.variable} antialiased bg-paper text-ink`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SiteProviders>{children}</SiteProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
