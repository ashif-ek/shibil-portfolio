import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { GoogleAnalytics } from "@next/third-parties/google";
import JsonLd from "@/components/seo/JsonLd";
import { Person, WithContext } from "schema-dts";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const baseUrl =
  process.env.NODE_ENV === "production" ? "https://shibill.in" : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Shibil S | Best Digital Marketing Strategist in Kerala",
    template: "%s | Shibil S",
  },
  description:
    "Results-driven Digital Marketing Strategist in Kerala specializing in SEO, SEM, SMM, and E-commerce growth. I help businesses scale through data-driven campaigns and ROI-focused marketing.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: baseUrl,
    title: "Shibil S - Digital Marketing Strategist",
    description: "Scale your revenue with predictable, data-driven performance marketing systems.",
    siteName: "Shibil S Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shibil S - Digital Marketing Strategist",
    description: "Scale your revenue with predictable, data-driven performance marketing systems.",
  },
  alternates: {
    canonical: baseUrl,
  },
};

const personSchema: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shibil S",
  jobTitle: "Digital Marketing Strategist",
  url: baseUrl,
  sameAs: ["https://linkedin.com/in/shibil-s-433000370"],
  knowsAbout: [
    "Search Engine Optimization (SEO)",
    "Search Engine Marketing (SEM)",
    "Social Media Marketing (SMM)",
    "Email Marketing",
    "Web Designing",
    "Meta Ads",
    "E-commerce Product Management",
    "Conversion Rate Optimization (CRO)",
    "Affiliate & Influencer Marketing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <JsonLd schema={personSchema} />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-black text-white`}>
        <Navbar />
        {children}
        <WhatsAppButton />
        <Footer />
        <GoogleAnalytics gaId="G-XXXXXXX" />
      </body>
    </html>
  );
}
