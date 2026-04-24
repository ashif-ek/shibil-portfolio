import { db } from "./db";
import { projects, services, experiences, blogPosts, certificates, skills, profile } from "./schema";

export async function seed() {
  // Check if already seeded with profile
  const existingProfile = await db.select().from(profile);
  if (existingProfile.length === 0) {
    console.log("Seeding profile...");
    await db.insert(profile).values({
      id: "me",
      name: "Shibil S",
      role: "Digital Marketing Specialist",
      headline: "I Help Businesses Turn Ads Into Predictable Revenue",
      subHeadline: "Best Digital Marketing Strategist in Kerala",
      bio: "As a Digital Marketing Executive with a background in SEO, SEM, and SMM, I specialize in creating data-driven campaigns that provide measurable results. My expertise lies in helping brands enhance their online visibility and ROI through research-backed strategies.\n\nFrom coordinating complex SEO strategies to executing targeted Meta and Google Ads, my focus is always on continuous improvement and staying updated with the latest digital trends. I build user-friendly websites that aren't just visually appealing but optimized for real-world conversions.\n\nCurrently, I leverage tools like Google Analytics and keyword analysis to help businesses in Kerala and beyond grow their digital footprint. When I'm not optimizing campaigns, I'm exploring new ways to bridge the gap between business goals and user needs.",
      location: "Malappuram, Kerala, India",
      education: "Diploma in Digital Marketing, Westberg International",
      email: "sshibil14954@gmail.com",
      phone: "+918590658417",
      linkedin: "https://linkedin.com/in/shibil-s-433000370",
      github: "",
      resumeUrl: "/SHIBIL resume.pdf",
      profileImageUrl: "/shibil-profile.png",
    });
  }

  // Check if already seeded with at least 6 services
  const existing = await db.select().from(services);
  if (existing.length >= 6) return;

  console.log("Seeding database...");

  await db.insert(services).values([
    {
      id: crypto.randomUUID(),
      title: "Meta Ads Management",
      icon: "target",
      problem: "Wasting spend on unqualified audiences.",
      solution: "Data-backed targeting models & creative testing.",
      outcome: "Lower CPA & higher ROAS predictability.",
      link: "https://business.facebook.com/",
    },
    {
      id: crypto.randomUUID(),
      title: "Google Ads Optimization",
      icon: "chart",
      problem: "Losing high-intent searchers to competitors.",
      solution: "Search intent mapping & precision keyword bidding.",
      outcome: "Dominate top-of-page visibility & click-through rates.",
      link: "https://ads.google.com/",
    },
    {
      id: crypto.randomUUID(),
      title: "SEO Growth Strategy",
      icon: "search",
      problem: "Invisible on Google for money-making keywords.",
      solution: "Technical audits, content strategy & backlink planning.",
      outcome: "Sustainable organic traffic & ongoing free leads.",
      link: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
    },
    {
      id: crypto.randomUUID(),
      title: "E-Commerce Marketing",
      icon: "shopping-cart",
      problem: "High cart abandonment & low customer lifetime value.",
      solution: "Retargeting funnels & optimized product feeds.",
      outcome: "Increased average order value & repeat purchases.",
      link: "https://www.shopify.com/blog/ecommerce-marketing",
    },
    {
      id: crypto.randomUUID(),
      title: "YouTube Advertising",
      icon: "zap",
      problem: "Low brand awareness and engagement with target audience.",
      solution: "Compelling video campaigns and precision audience targeting.",
      outcome: "High video completion rates and brand lift.",
      link: "https://www.youtube.com/ads/",
    },
    {
      id: crypto.randomUUID(),
      title: "LinkedIn Marketing",
      icon: "briefcase",
      problem: "Struggling to reach B2B decision-makers effectively.",
      solution: "Professional networking strategy and lead-gen forms.",
      outcome: "High-quality B2B leads and networking growth.",
      link: "https://business.linkedin.com/marketing-solutions",
    }
  ]);

  await db.insert(experiences).values([
    {
      id: crypto.randomUUID(),
      role: "Digital Marketing Executive",
      company: "Hogar Technologies and Innovations LLP (HTI)",
      period: "Oct 2025 - March 2026",
      location: "Kerala, India",
      description: "Coordinated with marketing teams and clients to develop SEO strategy based on Google Analytics, keyword rankings, and competitive analysis.\nIdentified keyword optimization opportunities and carried out thorough competitor research.\nAudited client websites for SEO and made suggestions for improving web pages and sitemaps, which significantly increased organic traffic.\nManaged and optimized performance marketing campaigns to drive measurable business growth.",
    },
    {
      id: crypto.randomUUID(),
      role: "Digital Marketing Executive",
      company: "Airin industrial corporation",
      period: "April 2025 - August 2025",
      location: "Nilambur, Kerala",
      description: "Gained hands-on experience in Search Engine Optimization (SEO) and technical website audits.\nAssisted in planning and executing Search Engine Marketing (SEM) via Meta and Google Ads.\nManaged and created engaging content for social media platforms including Facebook, Instagram, and LinkedIn.\nHandled E-commerce Product Management for Amazon, optimizing listings for better discoverability.",
    },
  ]);

  await db.insert(blogPosts).values([
    {
      id: crypto.randomUUID(),
      title: "How to Scale E-Commerce Revenue with Meta Ads in 2024",
      slug: "scaling-ecommerce-with-meta-ads",
      date: "Mar 30, 2024",
      category: "Paid Ads",
      excerpt: "A deep dive into modern Meta Ads strategies, focusing on creative testing and account consolidation.",
      content: "Full content coming soon...",
      author: "Shibil S",
      readingTime: "5 min read",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    },
  ]);

  await db.insert(certificates).values([
    {
      id: crypto.randomUUID(),
      title: "Diploma in Digital Marketing",
      issuer: "Westberg International Institute",
      date: "Aug - Oct 2025",
      link: "#",
      icon: "shield",
    },
    {
      id: crypto.randomUUID(),
      title: "Higher Secondary (Maths Commerce)",
      issuer: "GHSS Moothedam",
      date: "Completed",
      link: "#",
      icon: "graduation",
    },
    {
      id: crypto.randomUUID(),
      title: "Google Ads Search Certification",
      issuer: "Google Digital Academy",
      date: "Verified",
      link: "#",
      icon: "award",
    },
    {
      id: crypto.randomUUID(),
      title: "Meta Certified Associate",
      issuer: "Meta Blueprint",
      date: "Verified",
      link: "#",
      icon: "award",
    },
  ]);

  await db.insert(skills).values([
    {
      id: crypto.randomUUID(),
      category: "Paid Advertising",
      skillsList: "Meta Ads Manager, Google Ads (PPC), SEM, A/B Creative Testing, Conversion Tracking",
    },
    {
      id: crypto.randomUUID(),
      category: "SEO & Content",
      skillsList: "Technical SEO, On-page SEO, Off-page SEO, Keyword Research, SEO Audits, Sitemaps",
    },
    {
      id: crypto.randomUUID(),
      category: "Marketing & Growth",
      skillsList: "Social Media Marketing, Email Marketing, CRO, Affiliate Marketing, Influencer Marketing",
    },
    {
      id: crypto.randomUUID(),
      category: "E-Commerce & Tools",
      skillsList: "Amazon Management, Shopify, Online Selling, Google Analytics, Excel (Data Entry), Web Designing",
    },
  ]);

  await db.insert(projects).values([
    {
      id: crypto.randomUUID(),
      title: "E-Commerce Revenue Scaling",
      client: "Apparel Brand",
      tags: "Meta Ads, Retargeting",
      problem: "Stagnant growth and high customer acquisition costs preventing scale.",
      strategy: "Implemented a full-funnel Meta Ads strategy focusing on broad targeting for acquisition and dynamic product ads for retention.",
      execution: "Restructured the ad account with a consolidated CBO (Campaign Budget Optimization) approach and high-velocity creative testing.",
      result: "Achieved a significant increase in monthly revenue while maintaining a stable ROAS, allowing for a 3x spend increase.",
    },
    {
      id: crypto.randomUUID(),
      title: "Localized Lead Generation",
      client: "Real Estate Group",
      tags: "Google Ads, Local SEO",
      problem: "Low quality leads and high waste on broad search terms.",
      strategy: "Shifted focus to hyper-local search intent and long-tail keywords combined with optimized landing page funnels.",
      execution: "Audit and overhaul of Google Ads keywords, implementation of local schema markup, and conversion rate optimization (CRO) on landing pages.",
      result: "Lead quality improved drastically with a 40% reduction in cost-per-lead (CPL) within the first 60 days.",
    },
  ]);

  console.log("Seeding complete!");
}
