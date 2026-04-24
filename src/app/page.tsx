import { Suspense } from "react";
import dynamic from "next/dynamic";
import { db } from "@/lib/db";
import { projects, services, experiences, blogPosts, certificates, skills, profile } from "@/lib/schema";
import { seed } from "@/lib/seed";
import { desc, eq } from "drizzle-orm";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import InViewSection from "@/components/common/InViewSection";
import { 
  ServiceSkeleton, 
  ProjectSkeleton, 
  BlogSkeleton, 
  ExperienceSkeleton, 
  CertificateSkeleton, 
  SkillsSkeleton 
} from "@/components/sections/SectionSkeletons";

const Services = dynamic(() => import("@/components/sections/Services"));
const CaseStudies = dynamic(() => import("@/components/sections/CaseStudies"));
const Experience = dynamic(() => import("@/components/sections/Experience"));
const Certificates = dynamic(() => import("@/components/sections/Certificates"));
const RecentBlogPosts = dynamic(() => import("@/components/sections/RecentBlogPosts"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

async function ServicesSection() {
  const data = await db.select().from(services).orderBy(desc(services.createdAt));
  return <Services data={data} />;
}

async function CaseStudiesSection() {
  const data = await db.select().from(projects).orderBy(desc(projects.createdAt));
  return <CaseStudies data={data} />;
}

async function CertificatesSection() {
  const data = await db.select().from(certificates).orderBy(desc(certificates.createdAt));
  return <Certificates data={data} />;
}

async function ExperienceSection() {
  const data = await db.select().from(experiences).orderBy(desc(experiences.createdAt));
  return <Experience data={data} />;
}

async function BlogSection() {
  const data = await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt)).limit(3);
  return <RecentBlogPosts data={data} />;
}

async function SkillsSection() {
  const data = await db.select().from(skills).orderBy(desc(skills.createdAt));
  return <Skills data={data} />;
}

export default async function Home() {
  // Seed initial data if DB is empty - this happens on server once
  await seed();

  const profileData = await db.select().from(profile).where(eq(profile.id, "me")).limit(1);
  const profileInfo = profileData[0] || null;

  return (
    <main className="min-h-screen bg-background">
      <Hero profile={profileInfo} />
      <About profile={profileInfo} />
      
      <InViewSection fallback={<ServiceSkeleton />}>
        <Suspense fallback={<ServiceSkeleton />}>
          <ServicesSection />
        </Suspense>
      </InViewSection>

      <InViewSection fallback={<ProjectSkeleton />}>
        <Suspense fallback={<ProjectSkeleton />}>
          <CaseStudiesSection />
        </Suspense>
      </InViewSection>

      <InViewSection fallback={<CertificateSkeleton />}>
        <Suspense fallback={<CertificateSkeleton />}>
          <CertificatesSection />
        </Suspense>
      </InViewSection>

      <InViewSection fallback={<ExperienceSkeleton />}>
        <Suspense fallback={<ExperienceSkeleton />}>
          <ExperienceSection />
        </Suspense>
      </InViewSection>

      <InViewSection fallback={<BlogSkeleton />}>
        <Suspense fallback={<BlogSkeleton />}>
          <BlogSection />
        </Suspense>
      </InViewSection>

      <InViewSection fallback={<SkillsSkeleton />}>
        <Suspense fallback={<SkillsSkeleton />}>
          <SkillsSection />
        </Suspense>
      </InViewSection>

      <InViewSection fallback={<div className="h-96" />}>
        <Contact />
      </InViewSection>
    </main>
  );
}
