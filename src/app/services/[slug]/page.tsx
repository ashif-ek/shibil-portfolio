import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import { Service } from "schema-dts";

const targetCities = ["mumbai", "kerala", "dubai", "london", "bangalore"];
const targetServices = ["seo-expert", "meta-ads-consultant", "ecommerce-growth-partner"];

// Generate all combinations at build time
export async function generateStaticParams() {
  const paths: { slug: string }[] = [];
  
  targetServices.forEach((service) => {
    targetCities.forEach((city) => {
      paths.push({
        slug: `${service}-in-${city}`,
      });
    });
  });

  return paths;
}

function parseSlug(slug: string) {
  const parts = slug.split("-in-");
  if (parts.length !== 2) return null;
  
  const [serviceSlug, citySlug] = parts;
  const serviceName = serviceSlug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  const cityName = citySlug.charAt(0).toUpperCase() + citySlug.slice(1);
  
  return { serviceName, cityName };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  
  if (!parsed) return {};
  
  return {
    title: `Hire the Best ${parsed.serviceName} in ${parsed.cityName} | Shibil S`,
    description: `Looking for top-tier ${parsed.serviceName} services in ${parsed.cityName}? I build predictable revenue funnels for local and e-commerce businesses.`,
    alternates: {
      canonical: `https://shibill.in/services/${slug}`,
    }
  };
}

export default async function ProgrammaticServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    notFound();
  }

  const { serviceName, cityName } = parsed;

  const serviceSchema: Service = {
    "@type": "Service",
    name: `${serviceName} in ${cityName}`,
    provider: {
      "@type": "Person",
      name: "Shibil S",
    },
    areaServed: {
      "@type": "City",
      name: cityName,
    },
    description: `Professional ${serviceName} services to help businesses in ${cityName} scale predictably.`
  };

  return (
    <main className="min-h-screen bg-black pt-32 pb-24">
      <JsonLd schema={{ "@context": "https://schema.org", ...serviceSchema }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <span className="text-blue-400 font-mono tracking-wide px-4 py-2 bg-blue-500/10 rounded-full text-sm border border-blue-500/20 mb-8 inline-block">
          Serving {cityName}
        </span>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">#1 {serviceName}</span> <br/> 
          in {cityName}
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mb-12">
          Stop guessing with your marketing budget. I build high-converting 
          {serviceName.toLowerCase() === 'seo expert' ? ' organic growth engines' : ' paid acquisition systems'} 
          for businesses in {cityName} that scale revenue.
        </p>

        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl">
          <h2 className="text-2xl font-bold mb-4 text-white">Why partner with me in {cityName}?</h2>
          <ul className="space-y-4 text-zinc-400">
            <li className="flex gap-3 items-start">
              <span className="text-blue-500 mt-1">✓</span>
              Location-specific market research tailored to {cityName} consumer behaviors.
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-blue-500 mt-1">✓</span>
              Clear, data-driven reporting so you always know your exact ROI.
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-blue-500 mt-1">✓</span>
              Dedicated {serviceName.toLowerCase()} execution focused exclusively on bottom-line revenue.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
