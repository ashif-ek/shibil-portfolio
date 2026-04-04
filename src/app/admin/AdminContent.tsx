"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  Settings, 
  FileText, 
  Award, 
  Zap, 
  Folder,
  Plus,
  Trash2,
  ChevronRight,
  LayoutGrid,
  List
} from "lucide-react";
import { logout } from "@/actions/auth";
import { createProject, deleteProject } from "@/actions/project";
import { createService, deleteService } from "@/actions/service";
import { createExperience, deleteExperience } from "@/actions/experience";
import { createBlogPost, deleteBlogPost } from "@/actions/blog";
import { createCertificate, deleteCertificate } from "@/actions/certificate";
import { createSkill, deleteSkill } from "@/actions/skill";

type Section = "projects" | "services" | "experience" | "blog" | "certificates" | "skills";

interface AdminContentProps {
  data: {
    projects: any[];
    services: any[];
    experiences: any[];
    blogPosts: any[];
    certificates: any[];
    skills: any[];
  };
}

export default function AdminContent({ data }: AdminContentProps) {
  const [activeSegment, setActiveSegment] = useState<Section>("projects");

  const segments = [
    { id: "projects", label: "Projects", icon: <Folder className="w-4 h-4" /> },
    { id: "services", label: "Services", icon: <Settings className="w-4 h-4" /> },
    { id: "experience", label: "Experience", icon: <Briefcase className="w-4 h-4" /> },
    { id: "blog", label: "Blog", icon: <FileText className="w-4 h-4" /> },
    { id: "certificates", label: "Certificates", icon: <Award className="w-4 h-4" /> },
    { id: "skills", label: "Skills", icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Navigation - Amazon Console Style */}
      <aside className="lg:w-64 shrink-0">
        <nav className="flex flex-col bg-white border border-zinc-200 rounded-lg sticky top-20 overflow-hidden shadow-sm">
          <div className="px-5 py-4 bg-[#f2f3f3] text-xs font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-200">
             Service Menu
          </div>
          <div className="p-2 space-y-0.5">
            {segments.map((segment) => (
              <button
                key={segment.id}
                onClick={() => setActiveSegment(segment.id as Section)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-all relative ${
                  activeSegment === segment.id
                    ? "bg-zinc-100 text-black font-bold"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-black"
                }`}
              >
                {activeSegment === segment.id && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-orange-500 rounded-full"
                  />
                )}
                <span className={`shrink-0 ${activeSegment === segment.id ? "text-orange-600" : "text-zinc-400 opacity-70"}`}>
                  {segment.icon}
                </span>
                <span className="truncate">{segment.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSegment}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeSegment === "projects" && (
              <SectionLayout
                title="Projects"
                count={data.projects.length}
                form={<ProjectForm />}
                list={<DataList data={data.projects} onDelete={deleteProject} type="project" />}
              />
            )}
            {activeSegment === "services" && (
              <SectionLayout
                title="Services"
                count={data.services.length}
                form={<ServiceForm />}
                list={<DataList data={data.services} onDelete={deleteService} type="service" />}
              />
            )}
            {activeSegment === "experience" && (
              <SectionLayout
                title="Experience"
                count={data.experiences.length}
                form={<ExperienceForm />}
                list={<DataList data={data.experiences} onDelete={deleteExperience} type="experience" />}
              />
            )}
            {activeSegment === "blog" && (
              <SectionLayout
                title="Blog Posts"
                count={data.blogPosts.length}
                form={<BlogForm />}
                list={<DataList data={data.blogPosts} onDelete={deleteBlogPost} type="blog" />}
              />
            )}
            {activeSegment === "certificates" && (
              <SectionLayout
                title="Certificates"
                count={data.certificates.length}
                form={<CertificateForm />}
                list={<DataList data={data.certificates} onDelete={deleteCertificate} type="certificate" />}
              />
            )}
            {activeSegment === "skills" && (
              <SectionLayout
                title="Skills"
                count={data.skills.length}
                form={<SkillForm />}
                list={<DataList data={data.skills} onDelete={deleteSkill} type="skill" />}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function SectionLayout({ title, count, form, list }: { title: string; count: number; form: React.ReactNode; list: React.ReactNode }) {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:items-start">
      <div className="lg:col-span-12 xl:col-span-5 order-2 xl:order-1">
        <div className="bg-white border border-zinc-200 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
            <h2 className="text-base font-bold text-zinc-900">Add New {title}</h2>
            <Plus className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="p-6">
            {form}
          </div>
        </div>
      </div>
      <div className="lg:col-span-12 xl:col-span-7 order-1 xl:order-2">
        <div className="bg-white border border-zinc-200 rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
             <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">
               Active {title} <span className="ml-2 font-normal text-zinc-400">({count})</span>
             </h2>
          </div>
          <div className="min-h-[200px]">
             {list}
          </div>
        </div>
      </div>
    </div>
  );
}

function DataList({ data, onDelete, type }: { data: any[]; onDelete: (id: string) => Promise<void>; type: string }) {
  if (data.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-zinc-100">
           <List className="w-5 h-5 text-zinc-300" />
        </div>
        <p className="text-zinc-400 text-sm font-medium">No records found. Fill out the form to add one.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-zinc-200">
      {data.map((item) => (
        <div
          key={item.id}
          className="group hover:bg-zinc-50 transition-colors p-5 flex justify-between items-center gap-6"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-sm font-bold text-zinc-900 truncate">
                {type === "experience" ? `${item.role} @ ${item.company}` : item.title || item.category}
              </h3>
              <div className="px-1.5 py-0.5 bg-zinc-100 border border-zinc-200 rounded text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">
                 {type}
              </div>
            </div>
            <p className="text-zinc-500 text-xs truncate max-w-md">
              {item.description || item.excerpt || item.skillsList || item.issuer || item.problem}
            </p>
          </div>
          <form action={async () => { if(confirm('Are you sure you want to delete this resource?')) await onDelete(item.id); }}>
            <button className="h-8 w-8 flex items-center justify-center text-zinc-300 hover:text-red-600 hover:bg-red-50 rounded transition-all">
              <Trash2 className="w-4 h-4" />
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}

// Form Components
function ProjectForm() {
  return (
    <form action={createProject} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Project Title</label>
        <input name="title" required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="E-Commerce Scaling" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Client</label>
          <input name="client" className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="Nike" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Tags</label>
          <input name="tags" className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="SEO, Meta" />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Problem Statement</label>
        <textarea name="problem" className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300 min-h-[60px]" placeholder="The challenge..." />
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Strategy & Solution</label>
        <textarea name="strategy" className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300 min-h-[60px]" placeholder="The approach..." />
      </div>
      <button className="w-full bg-[#0073BB] text-white font-bold py-2.5 rounded-md hover:bg-[#005c96] transition-all shadow-sm active:translate-y-[1px]">Create Case Study</button>
    </form>
  );
}

function ServiceForm() {
  return (
    <form action={createService} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Service Name</label>
        <input name="title" required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="Ads Management" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Icon ID</label>
          <input name="icon" required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="target" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Official Link</label>
          <input name="link" className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="https://..." />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Problem</label>
        <textarea name="problem" className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300 min-h-[60px]" placeholder="Problem..." />
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Solution</label>
        <textarea name="solution" className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300 min-h-[60px]" placeholder="Solution..." />
      </div>
      <button className="w-full bg-[#0073BB] text-white font-bold py-2.5 rounded-md hover:bg-[#005c96] transition-all shadow-sm active:translate-y-[1px]">Register Service</button>
    </form>
  );
}

function ExperienceForm() {
  return (
    <form action={createExperience} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Professional Role</label>
        <input name="role" required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="Marketing Lead" />
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Organization</label>
        <input name="company" required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="Company Name" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Time Period</label>
          <input name="period" className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="2023 - Present" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Location</label>
          <input name="location" className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="Remote / Mumbai" />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Achievements</label>
        <textarea name="description" className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300 min-h-[100px]" placeholder="Key impact..." />
      </div>
      <button className="w-full bg-[#0073BB] text-white font-bold py-2.5 rounded-md hover:bg-[#005c96] transition-all shadow-sm active:translate-y-[1px]">Commit Experience</button>
    </form>
  );
}

function BlogForm() {
  return (
    <form action={createBlogPost} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Post Title</label>
        <input name="title" required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="Scaling Performance" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Slug</label>
          <input name="slug" required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="url-slug" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Category</label>
          <input name="category" className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="Growth" />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Markdown Content</label>
        <textarea name="content" className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300 min-h-[120px]" placeholder="Write content..." />
      </div>
      <button className="w-full bg-[#0073BB] text-white font-bold py-2.5 rounded-md hover:bg-[#005c96] transition-all shadow-sm active:translate-y-[1px]">Deploy Article</button>
    </form>
  );
}

function CertificateForm() {
  return (
    <form action={createCertificate} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Certificate Name</label>
        <input name="title" required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="Google Ads Cert" />
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Issuing Entity</label>
        <input name="issuer" required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="Meta / Google" />
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Icon Type</label>
        <input name="icon" className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="award / shield" />
      </div>
      <button className="w-full bg-[#0073BB] text-white font-bold py-2.5 rounded-md hover:bg-[#005c96] transition-all shadow-sm active:translate-y-[1px]">Validate Credential</button>
    </form>
  );
}

function SkillForm() {
  return (
    <form action={createSkill} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Skill Category</label>
        <input name="category" required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="Paid Advertising" />
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Comma-Separated Skills</label>
        <textarea name="skillsList" required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300 min-h-[80px]" placeholder="SEO, PPC, Ads..." />
      </div>
      <button className="w-full bg-[#0073BB] text-white font-bold py-2.5 rounded-md hover:bg-[#005c96] transition-all shadow-sm active:translate-y-[1px]">Sync Skill Set</button>
    </form>
  );
}
