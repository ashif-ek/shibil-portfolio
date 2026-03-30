import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import JsonLd from "@/components/seo/JsonLd";
import { Person, WithContext } from "schema-dts";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const baseUrl = process.env.NODE_ENV === "production" ? "https://shibill.in" : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Shibil S | Expert Digital Marketing & Meta Ads Strategist",
    template: "%s | Shibil S"
  },
  description: "I help businesses turn ads into predictable revenue through high-converting Meta Ads, Google Ads, and technical SEO strategies.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: baseUrl,
    title: "Shibil S - Digital Marketing Strategist",
    description: "Scale your revenue with predictable, data-driven performance marketing systems.",
    siteName: "Shibil S Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Shibil S - Digital Marketing Strategist",
    description: "Scale your revenue with predictable, data-driven performance marketing systems.",
  },
  alternates: {
    canonical: baseUrl,
  }
};

const personSchema: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shibil S",
  jobTitle: "Digital Marketing Specialist",
  url: baseUrl,
  sameAs: [
    "https://linkedin.com/in/shibil-s-433000370"
  ],
  knowsAbout: ["Search Engine Optimization", "Meta Ads", "Google Ads", "E-commerce Marketing", "Conversion Rate Optimization"]
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
        <Footer />
        <GoogleAnalytics gaId="G-XXXXXXX" />
      </body>
    </html>
  );
}
