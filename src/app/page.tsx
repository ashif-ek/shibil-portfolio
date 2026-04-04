import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import CaseStudies from "@/components/sections/CaseStudies";
import Experience from "@/components/sections/Experience";
import Certificates from "@/components/sections/Certificates";
import RecentBlogPosts from "@/components/sections/RecentBlogPosts";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import { db } from "@/lib/db";
import { projects, services, experiences, blogPosts, certificates, skills } from "@/lib/schema";
import { seed } from "@/lib/seed";
import { desc } from "drizzle-orm";

export default async function Home() {
  // Seed initial data if DB is empty
  await seed();

  // Fetch all data
  const [
    projectsData,
    servicesData,
    experiencesData,
    blogPostsData,
    certificatesData,
    skillsData,
  ] = await Promise.all([
    db.select().from(projects).orderBy(desc(projects.createdAt)),
    db.select().from(services).orderBy(desc(services.createdAt)),
    db.select().from(experiences).orderBy(desc(experiences.createdAt)),
    db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt)).limit(3),
    db.select().from(certificates).orderBy(desc(certificates.createdAt)),
    db.select().from(skills).orderBy(desc(skills.createdAt)),
  ]);

  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <About />
      <Services data={servicesData} />
      <CaseStudies data={projectsData} />
      <Certificates data={certificatesData} />
      <Experience data={experiencesData} />
      <RecentBlogPosts data={blogPostsData} />
      <Skills data={skillsData} />
      <Contact />
    </main>
  );
}
