import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyDonationBar from '@/components/layout/StickyDonationBar';
import { siteConfig } from '@/data/siteConfig';

export const metadata = {
  metadataBase: new URL('https://association100000ames.org'),
  title: {
    default: "Association 100,000 Âmes (AMA) — Thomonde, Lac de Péligre, Haïti",
    template: "%s | Association 100,000 Âmes (AMA)",
  },
  description:
    "Site officiel de l'Association 100,000 Âmes (AMA), organisation chrétienne protestante engagée dans le Plateau Central haïtien (Thomonde, Delbourg, Péligre) pour l'évangélisation, le discipulat et l'entraide communautaire. Vision 2050.",
  keywords: [
    "Association 100000 Ames",
    "AMA Thomonde",
    "Église Thomonde",
    "Association chrétienne Haïti",
    "Lac de Péligre",
    "Église Évangélique Galilée de Delbourg",
    "Plateau Central Haïti",
    "Évangélisation Haïti",
    "Tournois chrétiens de football",
    "Julberson Toutoute",
    "Don MonCash",
    "Don Natcash",
  ],
  authors: [{ name: "Association 100,000 Âmes" }],
  creator: "Direction Technique (Bentzky Louis) — AMA",
  publisher: "Association 100,000 Âmes",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Association 100,000 Âmes (AMA) — Vision 2050",
    description:
      "Voir plus de 100 000 âmes se tourner vers Jésus-Christ, être restaurées, fortifiées dans la foi et formées au discipulat d'ici 2050.",
    url: "https://association100000ames.org",
    siteName: "Association 100,000 Âmes (AMA)",
    locale: "fr_HT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Association 100,000 Âmes (AMA)",
    description: "Évangélisation, Discipulat et Action Sociale dans le Plateau Central (Thomonde, Haïti).",
  },
  alternates: {
    canonical: "https://association100000ames.org",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#1E3A8A",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Association 100,000 Âmes",
  "alternateName": ["AMA", "Association 100 000 Ames", "AMA Péligre"],
  "url": "https://association100000ames.org",
  "logo": "https://association100000ames.org/favicon.svg",
  "foundingDate": "2025-08-07",
  "description": "Organisation chrétienne protestante, sans but lucratif et apolitique, basée à Thomonde (Centre, Haïti), dans la région du lac de Péligre.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "#1, Église Évangélique Galilée de Delbourg",
    "addressLocality": "Thomonde",
    "addressRegion": "Centre",
    "addressCountry": "HT"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+50932529060",
      "contactType": "customer service",
      "availableLanguage": ["French", "Haitian Creole", "English"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+50936512047",
      "contactType": "support",
      "availableLanguage": ["French", "Haitian Creole", "English"]
    }
  ],
  "sameAs": [
    "https://facebook.com/association100000ames",
    "https://youtube.com/@association100000ames"
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1E3A8A" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-900">
        <LanguageProvider>
          <Header />
          <main className="flex-1 pb-16 sm:pb-0">{children}</main>
          <Footer />
          <StickyDonationBar />
        </LanguageProvider>
      </body>
    </html>
  );
}
