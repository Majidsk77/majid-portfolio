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

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Majid Kareem | Product Designer",
    template: "%s | Majid Kareem",
  },
  description:
    "Product designer based in Amsterdam creating strategic, spatial, and interactive digital experiences. Curious about emerging technology and the future of human-computer interaction.",
  keywords: [
    "product designer",
    "UX designer",
    "UI designer",
    "interaction design",
    "Amsterdam",
    "digital experiences",
    "Majid Kareem",
    "portfolio",
  ],
  authors: [{ name: "Majid Kareem", url: BASE_URL }],
  creator: "Majid Kareem",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Majid Kareem",
    title: "Majid Kareem | Product Designer",
    description:
      "Product designer based in Amsterdam creating strategic, spatial, and interactive digital experiences.",
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
    title: "Majid Kareem | Product Designer",
    description:
      "Product designer based in Amsterdam creating strategic, spatial, and interactive digital experiences.",
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
  description:
    "Product designer based in Amsterdam creating strategic, spatial, and interactive digital experiences.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Amsterdam",
    addressCountry: "NL",
  },
  sameAs: ["https://www.linkedin.com/in/majidkareem/"],
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
