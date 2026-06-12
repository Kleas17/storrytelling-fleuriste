import type { Metadata } from "next";
import { Cormorant_Garamond, Cormorant_SC, DM_Sans } from "next/font/google";
import "./globals.css";
import { settings } from "@/lib/data/settings";
import SmoothScroll from "@/components/providers/SmoothScroll";
import TransitionProvider from "@/components/providers/TransitionProvider";
import Loader from "@/components/layout/Loader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import ProgressStem from "@/components/layout/ProgressStem";
import PetalEffects from "@/components/effects/PetalEffects";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const cormorantSC = Cormorant_SC({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cormorant-sc",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(settings.url),
  title: {
    default: `${settings.nomFleuriste} — ${settings.tagline}`,
    template: `%s — ${settings.nomFleuriste}`,
  },
  description: settings.metaDescription,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: settings.nomFleuriste,
    title: `${settings.nomFleuriste} — ${settings.tagline}`,
    description: settings.metaDescription,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Florist",
  name: settings.nomFleuriste,
  description: settings.metaDescription,
  url: settings.url,
  telephone: settings.telephone,
  email: settings.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "12 rue des Tanneurs",
    addressLocality: "Lyon",
    postalCode: "69005",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: settings.geo.lat,
    longitude: settings.geo.lng,
  },
  openingHours: ["Tu-Fr 09:30-19:00", "Sa 09:00-19:30", "Su 09:00-13:00"],
  sameAs: [settings.instagram, settings.pinterest],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${cormorantSC.variable} ${dmSans.variable}`}>
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-mousse focus:px-4 focus:py-2 focus:text-ivoire"
        >
          Aller au contenu
        </a>
        <SmoothScroll>
          <TransitionProvider>
            <Loader />
            <CustomCursor />
            <PetalEffects />
            <ProgressStem />
            <Header />
            <main id="contenu">{children}</main>
            <Footer />
          </TransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
