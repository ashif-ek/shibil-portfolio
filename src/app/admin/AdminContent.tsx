"use client";

import { useState, useTransition } from "react";
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
  Pencil,
  X,
  List,
  User
} from "lucide-react";
import { 
  createProject, deleteProject, updateProject 
} from "@/actions/project";
import { 
  createService, deleteService, updateService 
} from "@/actions/service";
import { 
  createExperience, deleteExperience, updateExperience 
} from "@/actions/experience";
import { 
  createBlogPost, deleteBlogPost, updateBlogPost 
} from "@/actions/blog";
import { 
  createCertificate, deleteCertificate, updateCertificate 
} from "@/actions/certificate";
import { 
  createSkill, deleteSkill, updateSkill 
} from "@/actions/skill";
import { updateProfile } from "@/actions/profile";

type Section = "projects" | "services" | "experience" | "blog" | "certificates" | "skills" | "profile";

interface AdminContentProps {
  data: {
    projects: any[];
    services: any[];
    experiences: any[];
    blogPosts: any[];
    certificates: any[];
    skills: any[];
    profile: any;
  };
}

export default function AdminContent({ data }: AdminContentProps) {
  const [activeSegment, setActiveSegment] = useState<Section>("projects");
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isPending, startTransition] = useTransition();

  const segments = [
    { id: "projects", label: "Projects", icon: <Folder className="w-4 h-4" /> },
    { id: "services", label: "Services", icon: <Settings className="w-4 h-4" /> },
    { id: "experience", label: "Experience", icon: <Briefcase className="w-4 h-4" /> },
    { id: "blog", label: "Blog", icon: <FileText className="w-4 h-4" /> },
    { id: "certificates", label: "Certificates", icon: <Award className="w-4 h-4" /> },
    { id: "skills", label: "Skills", icon: <Zap className="w-4 h-4" /> },
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
  ];

  const handleEdit = (item: any) => {
    setEditingItem(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingItem(null);
  };

  const handleDelete = async (id: string, deleteFn: (id: string) => Promise<any>, type: string) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}? This action cannot be undone.`)) {
      return;
    }

    startTransition(async () => {
      const result = await deleteFn(id);
      if (result.success) {
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully.`);
      } else {
        alert(result.error || "Failed to delete item.");
      }
    });
  };

  const handleFormSubmit = async (formData: FormData, actionFn: (formData: FormData) => Promise<any>, type: string, isUpdate = false) => {
    startTransition(async () => {
      const result = await actionFn(formData);
      if (result.success) {
        alert(`${type} ${isUpdate ? "updated" : "created"} successfully.`);
        if (isUpdate) setEditingItem(null);
        // Clear form is handled by revalidation usually, but for client state we reset editing
      } else {
        alert(result.error || `Failed to ${isUpdate ? "update" : "create"} ${type}.`);
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="lg:w-64 shrink-0">
        <nav className="flex flex-col bg-white border border-zinc-200 rounded-lg sticky top-20 overflow-hidden shadow-sm">
          <div className="px-5 py-4 bg-[#f2f3f3] text-xs font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-200">
             Service Menu
          </div>
          <div className="p-2 space-y-0.5">
            {segments.map((segment) => (
              <button
                key={segment.id}
                onClick={() => {
                  setActiveSegment(segment.id as Section);
                  setEditingItem(null);
                }}
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
            key={`${activeSegment}-${editingItem?.id || 'new'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeSegment === "projects" && (
              <SectionLayout
                title="Project"
                count={data.projects.length}
                isEditing={!!editingItem}
                onCancelEdit={cancelEdit}
                form={<ProjectForm item={editingItem} onSubmit={(fd) => handleFormSubmit(fd, editingItem ? (formData) => updateProject(editingItem.id, formData) : createProject, "Project", !!editingItem)} isPending={isPending} />}
                list={<DataList data={data.projects} onDelete={(id) => handleDelete(id, deleteProject, "project")} onEdit={handleEdit} type="project" />}
              />
            )}
            {activeSegment === "services" && (
              <SectionLayout
                title="Service"
                count={data.services.length}
                isEditing={!!editingItem}
                onCancelEdit={cancelEdit}
                form={<ServiceForm item={editingItem} onSubmit={(fd) => handleFormSubmit(fd, editingItem ? (formData) => updateService(editingItem.id, formData) : createService, "Service", !!editingItem)} isPending={isPending} />}
                list={<DataList data={data.services} onDelete={(id) => handleDelete(id, deleteService, "service")} onEdit={handleEdit} type="service" />}
              />
            )}
            {activeSegment === "experience" && (
              <SectionLayout
                title="Experience"
                count={data.experiences.length}
                isEditing={!!editingItem}
                onCancelEdit={cancelEdit}
                form={<ExperienceForm item={editingItem} onSubmit={(fd) => handleFormSubmit(fd, editingItem ? (formData) => updateExperience(editingItem.id, formData) : createExperience, "Experience", !!editingItem)} isPending={isPending} />}
                list={<DataList data={data.experiences} onDelete={(id) => handleDelete(id, deleteExperience, "experience")} onEdit={handleEdit} type="experience" />}
              />
            )}
            {activeSegment === "blog" && (
              <SectionLayout
                title="Blog Post"
                count={data.blogPosts.length}
                isEditing={!!editingItem}
                onCancelEdit={cancelEdit}
                form={<BlogForm item={editingItem} onSubmit={(fd) => handleFormSubmit(fd, editingItem ? (formData) => updateBlogPost(editingItem.id, formData) : createBlogPost, "Blog Post", !!editingItem)} isPending={isPending} />}
                list={<DataList data={data.blogPosts} onDelete={(id) => handleDelete(id, deleteBlogPost, "blog post")} onEdit={handleEdit} type="blog" />}
              />
            )}
            {activeSegment === "certificates" && (
              <SectionLayout
                title="Certificate"
                count={data.certificates.length}
                isEditing={!!editingItem}
                onCancelEdit={cancelEdit}
                form={<CertificateForm item={editingItem} onSubmit={(fd) => handleFormSubmit(fd, editingItem ? (formData) => updateCertificate(editingItem.id, formData) : createCertificate, "Certificate", !!editingItem)} isPending={isPending} />}
                list={<DataList data={data.certificates} onDelete={(id) => handleDelete(id, deleteCertificate, "certificate")} onEdit={handleEdit} type="certificate" />}
              />
            )}
            {activeSegment === "skills" && (
              <SectionLayout
                title="Skill"
                count={data.skills.length}
                isEditing={!!editingItem}
                onCancelEdit={cancelEdit}
                form={<SkillForm item={editingItem} onSubmit={(fd) => handleFormSubmit(fd, editingItem ? (formData) => updateSkill(editingItem.id, formData) : createSkill, "Skill", !!editingItem)} isPending={isPending} />}
                list={<DataList data={data.skills} onDelete={(id) => handleDelete(id, deleteSkill, "skill")} onEdit={handleEdit} type="skill" />}
              />
            )}
            {activeSegment === "profile" && (
              <ProfileSection profile={data.profile} isPending={isPending} onUpdate={updateProfile} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function SectionLayout({ 
  title, 
  count, 
  form, 
  list, 
  isEditing, 
  onCancelEdit 
}: { 
  title: string; 
  count: number; 
  form: React.ReactNode; 
  list: React.ReactNode;
  isEditing?: boolean;
  onCancelEdit?: () => void;
}) {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:items-start">
      <div className="lg:col-span-12 xl:col-span-5 order-2 xl:order-1">
        <div className="bg-white border border-zinc-200 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
            <h2 className="text-base font-bold text-zinc-900">
              {isEditing ? `Edit ${title}` : `Add New ${title}`}
            </h2>
            {isEditing ? (
              <button onClick={onCancelEdit} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-4 h-4" />
              </button>
            ) : (
              <Plus className="w-4 h-4 text-zinc-400" />
            )}
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
               Active {title}s <span className="ml-2 font-normal text-zinc-400">({count})</span>
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

function DataList({ 
  data, 
  onDelete, 
  onEdit,
  type 
}: { 
  data: any[]; 
  onDelete: (id: string) => void; 
  onEdit: (item: any) => void;
  type: string 
}) {
  if (data.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-zinc-100">
           <List className="w-5 h-5 text-zinc-300" />
        </div>
        <p className="text-zinc-400 text-sm font-medium">No records found.</p>
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
              {item.description || item.excerpt || item.skillsList || item.issuer || item.problem || item.solution}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onEdit(item)}
              className="h-8 w-8 flex items-center justify-center text-zinc-300 hover:text-blue-600 hover:bg-blue-50 rounded transition-all"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onDelete(item.id)}
              className="h-8 w-8 flex items-center justify-center text-zinc-300 hover:text-red-600 hover:bg-red-50 rounded transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Form Components
function ProjectForm({ item, onSubmit, isPending }: { item: any; onSubmit: (fd: FormData) => void; isPending: boolean }) {
  return (
    <form action={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Project Title</label>
        <input name="title" defaultValue={item?.title} required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="E-Commerce Scaling" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Client</label>
          <input name="client" defaultValue={item?.client} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="Nike" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Tags</label>
          <input name="tags" defaultValue={item?.tags} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="SEO, Meta" />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Problem Statement</label>
        <textarea name="problem" defaultValue={item?.problem} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300 min-h-[60px]" placeholder="The challenge..." />
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Strategy & Solution</label>
        <textarea name="strategy" defaultValue={item?.strategy} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300 min-h-[60px]" placeholder="The approach..." />
      </div>
      <button disabled={isPending} className="w-full bg-[#0073BB] text-white font-bold py-2.5 rounded-md hover:bg-[#005c96] transition-all shadow-sm active:translate-y-[1px] disabled:opacity-50">
        {isPending ? "Processing..." : item ? "Update Project" : "Create Project"}
      </button>
    </form>
  );
}

function ServiceForm({ item, onSubmit, isPending }: { item: any; onSubmit: (fd: FormData) => void; isPending: boolean }) {
  return (
    <form action={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Service Name</label>
        <input name="title" defaultValue={item?.title} required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="Ads Management" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Icon ID</label>
          <input name="icon" defaultValue={item?.icon} required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="target" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Official Link</label>
          <input name="link" defaultValue={item?.link} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="https://..." />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Problem</label>
        <textarea name="problem" defaultValue={item?.problem} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300 min-h-[60px]" placeholder="Problem..." />
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Solution</label>
        <textarea name="solution" defaultValue={item?.solution} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300 min-h-[60px]" placeholder="Solution..." />
      </div>
      <button disabled={isPending} className="w-full bg-[#0073BB] text-white font-bold py-2.5 rounded-md hover:bg-[#005c96] transition-all shadow-sm active:translate-y-[1px] disabled:opacity-50">
        {isPending ? "Processing..." : item ? "Update Service" : "Register Service"}
      </button>
    </form>
  );
}

function ExperienceForm({ item, onSubmit, isPending }: { item: any; onSubmit: (fd: FormData) => void; isPending: boolean }) {
  return (
    <form action={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Professional Role</label>
        <input name="role" defaultValue={item?.role} required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="Marketing Lead" />
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Organization</label>
        <input name="company" defaultValue={item?.company} required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="Company Name" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Time Period</label>
          <input name="period" defaultValue={item?.period} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="2023 - Present" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Location</label>
          <input name="location" defaultValue={item?.location} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="Remote / Mumbai" />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Achievements</label>
        <textarea name="description" defaultValue={item?.description} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300 min-h-[100px]" placeholder="Key impact..." />
      </div>
      <button disabled={isPending} className="w-full bg-[#0073BB] text-white font-bold py-2.5 rounded-md hover:bg-[#005c96] transition-all shadow-sm active:translate-y-[1px] disabled:opacity-50">
        {isPending ? "Processing..." : item ? "Update Experience" : "Commit Experience"}
      </button>
    </form>
  );
}

function BlogForm({ item, onSubmit, isPending }: { item: any; onSubmit: (fd: FormData) => void; isPending: boolean }) {
  return (
    <form action={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Post Title</label>
        <input name="title" defaultValue={item?.title} required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="Scaling Performance" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Slug (Optional)</label>
          <input name="slug" defaultValue={item?.slug} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="auto-generated if empty" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Category</label>
          <input name="category" defaultValue={item?.category} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="Growth" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Author</label>
          <input name="author" defaultValue={item?.author || "Shibil S"} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Reading Time</label>
          <input name="readingTime" defaultValue={item?.readingTime} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="5 min read" />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Cover Image URL</label>
        <input name="imageUrl" defaultValue={item?.imageUrl} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="https://..." />
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Short Excerpt</label>
        <textarea name="excerpt" defaultValue={item?.excerpt} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300 min-h-[60px]" placeholder="Brief summary for list view..." />
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Markdown Content</label>
        <textarea name="content" defaultValue={item?.content} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300 min-h-[200px]" placeholder="Write content..." />
      </div>
      <button disabled={isPending} className="w-full bg-[#0073BB] text-white font-bold py-2.5 rounded-md hover:bg-[#005c96] transition-all shadow-sm active:translate-y-[1px] disabled:opacity-50">
        {isPending ? "Processing..." : item ? "Update Post" : "Deploy Article"}
      </button>
    </form>
  );
}

function CertificateForm({ item, onSubmit, isPending }: { item: any; onSubmit: (fd: FormData) => void; isPending: boolean }) {
  return (
    <form action={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Certificate Name</label>
        <input name="title" defaultValue={item?.title} required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="Google Ads Cert" />
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Issuing Entity</label>
        <input name="issuer" defaultValue={item?.issuer} required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="Meta / Google" />
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Icon Type</label>
        <input name="icon" defaultValue={item?.icon} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="award / shield" />
      </div>
      <button disabled={isPending} className="w-full bg-[#0073BB] text-white font-bold py-2.5 rounded-md hover:bg-[#005c96] transition-all shadow-sm active:translate-y-[1px] disabled:opacity-50">
        {isPending ? "Processing..." : item ? "Update Certificate" : "Validate Credential"}
      </button>
    </form>
  );
}

function SkillForm({ item, onSubmit, isPending }: { item: any; onSubmit: (fd: FormData) => void; isPending: boolean }) {
  return (
    <form action={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Skill Category</label>
        <input name="category" defaultValue={item?.category} required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300" placeholder="Paid Advertising" />
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Comma-Separated Skills</label>
        <textarea name="skillsList" defaultValue={item?.skillsList} required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300 min-h-[80px]" placeholder="SEO, PPC, Ads..." />
      </div>
      <button disabled={isPending} className="w-full bg-[#0073BB] text-white font-bold py-2.5 rounded-md hover:bg-[#005c96] transition-all shadow-sm active:translate-y-[1px] disabled:opacity-50">
        {isPending ? "Processing..." : item ? "Update Skill" : "Sync Skill Set"}
      </button>
    </form>
  );
}

function ProfileSection({ profile, isPending, onUpdate }: { profile: any; isPending: boolean; onUpdate: (fd: FormData) => Promise<any> }) {
  const handleProfileSubmit = async (formData: FormData) => {
    const result = await onUpdate(formData);
    if (result.success) {
      alert("Profile updated successfully.");
    } else {
      alert(result.error || "Failed to update profile.");
    }
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-zinc-200 bg-zinc-50">
        <h2 className="text-base font-bold text-zinc-900">Edit Portfolio Profile</h2>
      </div>
      <div className="p-6">
        <form action={handleProfileSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Full Name</label>
              <input name="name" defaultValue={profile?.name} required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Professional Role</label>
              <input name="role" defaultValue={profile?.role} required className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Main Headline</label>
              <input name="headline" defaultValue={profile?.headline} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Sub Headline</label>
              <input name="subHeadline" defaultValue={profile?.subHeadline} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">About / Bio</label>
              <textarea name="bio" defaultValue={profile?.bio} rows={6} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Location</label>
              <input name="location" defaultValue={profile?.location} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Education Summary</label>
              <input name="education" defaultValue={profile?.education} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Contact Email</label>
              <input name="email" defaultValue={profile?.email} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Contact Phone</label>
              <input name="phone" defaultValue={profile?.phone} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">LinkedIn URL</label>
              <input name="linkedin" defaultValue={profile?.linkedin} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">GitHub URL</label>
              <input name="github" defaultValue={profile?.github} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Resume File URL</label>
              <input name="resumeUrl" defaultValue={profile?.resumeUrl} className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">Profile Image</label>
              <div className="flex flex-col gap-3">
                <input type="file" name="profileImageFile" accept="image/*" className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all" />
                <div className="flex items-center gap-2">
                   <span className="text-xs text-zinc-400">Or use URL:</span>
                   <input name="profileImageUrl" defaultValue={profile?.profileImageUrl} className="flex-1 bg-white border border-zinc-300 rounded-md px-3 py-2 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all" placeholder="https://..." />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-zinc-100 flex justify-end">
            <button disabled={isPending} className="bg-[#0073BB] text-white font-bold px-8 py-2.5 rounded-md hover:bg-[#005c96] transition-all shadow-sm active:translate-y-[1px] disabled:opacity-50">
              {isPending ? "Saving Changes..." : "Save Profile Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
