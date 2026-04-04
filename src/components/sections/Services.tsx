"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Target, 
  BarChart3, 
  Search, 
  ShoppingCart, 
  ArrowUpRight, 
  LucideIcon, 
  Award, 
  ShieldCheck, 
  GraduationCap, 
  Zap, 
  Briefcase, 
  FileText,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  target: Target,
  chart: BarChart3,
  search: Search,
  "shopping-cart": ShoppingCart,
  award: Award,
  shield: ShieldCheck,
  graduation: GraduationCap,
  zap: Zap,
  briefcase: Briefcase,
  file: FileText,
};

interface Service {
  id: string;
  title: string;
  icon: string;
  problem: string | null;
  solution: string | null;
  outcome: string | null;
  link: string | null;
}

export default function Services({ data }: { data: Service[] }) {
  const [showAll, setShowAll] = useState(false);
  
  if (!data?.length) return null;

  const displayData = showAll ? data : data.slice(0, 4);

  return (
    <section id="services" className="py-24 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">How I Drive Growth</h2>
            <p className="text-gray-400 text-lg">
              I don't just run ads; I build performance marketing systems designed to generate
              measurable revenue.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {displayData.map((service, index) => {
              const Icon = ICON_MAP[service.icon] || Target;
              const CardContent = (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors group cursor-pointer h-full"
                >
                  <div className="mb-6 flex justify-between items-start">
                    <div className="p-3 bg-zinc-950 rounded-xl inline-flex border border-zinc-800 text-blue-500">
                      <Icon className="w-8 h-8" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>

                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-red-400/80 font-mono text-sm shrink-0">Problem:</span>
                      <span className="text-zinc-400 text-sm leading-relaxed">{service.problem}</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400/80 font-mono text-sm shrink-0">Solution:</span>
                      <span className="text-zinc-400 text-sm leading-relaxed">{service.solution}</span>
                    </li>
                    <li className="flex gap-3 pt-2 border-t border-zinc-800/50 mt-2">
                      <span className="text-green-400 font-mono text-sm shrink-0">Outcome:</span>
                      <span className="text-zinc-200 text-sm leading-relaxed font-medium">
                        {service.outcome}
                      </span>
                    </li>
                  </ul>
                </motion.div>
              );

              return service.link ? (
                <a 
                  key={service.id} 
                  href={service.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {CardContent}
                </a>
              ) : (
                <div key={service.id}>{CardContent}</div>
              );
            })}
          </AnimatePresence>
        </div>

        {data.length > 4 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 border border-zinc-800 text-white rounded-full hover:bg-zinc-800 transition-all font-bold group"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                </>
              ) : (
                <>
                  View All Services <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
