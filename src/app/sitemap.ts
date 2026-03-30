import { MetadataRoute } from "next";

// This would ideally come from a CMS or database, but for a portfolio we can track known routes.
// We will generate the programmatic edge paths dynamically here as well.
const baseUrl = "https://shibill.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const defaultPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // Example: Programmatic SEO pages generated for target locations
  const targetCities = ["mumbai", "kerala", "dubai", "london", "bangalore"];
  const targetServices = ["seo-expert", "meta-ads-consultant", "ecommerce-growth-partner"];
  
  const programmaticPages = targetServices.flatMap((service) =>
    targetCities.map((city) => ({
      url: `${baseUrl}/services/${service}-in-${city}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...defaultPages, ...programmaticPages];
}
