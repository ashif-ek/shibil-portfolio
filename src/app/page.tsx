import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import CaseStudies from "@/components/sections/CaseStudies";
import Experience from "@/components/sections/Experience";
import Certificates from "@/components/sections/Certificates";
import RecentBlogPosts from "@/components/sections/RecentBlogPosts";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <About />
      <Services />
      <CaseStudies />
      <Certificates />
      <Experience />
      <RecentBlogPosts />
      <Skills />
      <Contact />
    </main>
  );
}
