import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
import { projects, services, experiences, blogPosts, certificates, skills } from "@/lib/schema";
import { logout } from "@/actions/auth";
import { LogOut } from "lucide-react";
import AdminContent from "./AdminContent";
import { desc } from "drizzle-orm";

export default async function AdminPage() {
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
    db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt)),
    db.select().from(certificates).orderBy(desc(certificates.createdAt)),
    db.select().from(skills).orderBy(desc(skills.createdAt)),
  ]);

  const allData = {
    projects: projectsData,
    services: servicesData,
    experiences: experiencesData,
    blogPosts: blogPostsData,
    certificates: certificatesData,
    skills: skillsData,
  };

  return (
    <div className="p-0 text-zinc-900 min-h-screen bg-[#f2f3f3] selection:bg-orange-100 selection:text-orange-900">
      {/* Amazon Console Style Top Header */}
      <header className="h-14 bg-[#232f3e] text-white flex items-center justify-between px-6 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-4">
          <div className="font-black text-xl tracking-tight flex items-center gap-2">
            <span className="text-orange-400">Admin-Panel</span>
          </div>
          <div className="hidden md:flex items-center gap-6 ml-8 text-sm font-medium text-white/70">
            <span className="text-white border-b-2 border-orange-500 pb-4 mt-4">Dashboard</span>
          </div>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white/90 text-xs font-bold transition-all border border-white/10"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </form>
      </header>

      <div className="max-w-[1600px] mx-auto p-6 lg:p-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
            Portfolio <span className="font-normal text-zinc-400">/</span> Management
          </h1>
          <div className="h-1 w-12 bg-orange-500 mt-2 rounded-full" />
        </div>
        
        <AdminContent data={allData} />
      </div>
    </div>
  );
}
