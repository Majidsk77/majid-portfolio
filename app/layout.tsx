import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import NavigationLoader from "@/components/NavigationLoader";
import { Analytics } from "@vercel/analytics/next";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const BASE_URL = "https://www.majidkareem.com";

const DESCRIPTION =
  "Product Designer based in Amsterdam, designing playful, thoughtful digital experiences across product, interaction design, AI experiments, and immersive systems.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Majid Kareem — Product Designer",
    template: "%s — Majid Kareem",
  },
  description: DESCRIPTION,
  keywords: [
    "Product Designer",
    "UX Designer",
    "Interaction Designer",
    "Amsterdam",
    "Portfolio",
    "AI Experiments",
    "Digital Products",
    "Majid Kareem",
  ],
  authors: [{ name: "Majid Kareem", url: BASE_URL }],
  creator: "Majid Kareem",
  icons: {
    icon: [
      { url: "/favicon.ico",  sizes: "any" },
      { url: "/icon.svg",     type: "image/svg+xml" },
      { url: "/icon.png",     type: "image/png", sizes: "512x512" },
    ],
    apple: { url: "/apple-icon.png", sizes: "180x180" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Majid Kareem",
    title: "Majid Kareem — Product Designer",
    description: DESCRIPTION,
    images: [
      {
        url: "/images/exact-hero.png",
        width: 2919,
        height: 824,
        alt: "Majid Kareem — Product Designer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Majid Kareem — Product Designer",
    description: DESCRIPTION,
    images: ["/images/exact-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Majid Kareem",
  url: BASE_URL,
  jobTitle: "Product Designer",
  description: DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Amsterdam",
    addressCountry: "NL",
  },
  sameAs: ["https://www.linkedin.com/in/majid-kareem/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${dmSerifDisplay.variable} ${dmSans.variable} font-sans`}>
        <NavigationLoader />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
