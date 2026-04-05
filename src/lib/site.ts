export const siteConfig = {
  name: "Shibil S",
  title: "Best Digital Marketing Strategist in Kerala | SEO & PPC Expert",
  description: "Results-driven Digital Marketing Strategist based in Kerala, specializing in SEO, SEM, SMM, and E-commerce growth. I help businesses scale through data-driven performance marketing.",
  siteUrl: process.env.NODE_ENV === "production" ? "https://shibill.in" : "http://localhost:3000",
  linkedinLink: "https://linkedin.com/in/shibil-s-433000370",
  email: "sshibil14954@gmail.com",
};

export type SiteConfig = typeof siteConfig;
