"use client";

import { motion } from "framer-motion";
import { Building2, Calendar, MapPin } from "lucide-react";

interface ExperienceData {
  id: string;
  role: string;
  company: string;
  period: string | null;
  location: string | null;
  description: string | null;
}

export default function Experience({ data }: { data: ExperienceData[] }) {
  if (!data?.length) return null;

  return (
    <section id="experience" className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-16 md:text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Professional Experience
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A track record of delivering measurable digital marketing results across diverse
            industries.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {data.map((exp: ExperienceData, index: number) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:grid md:grid-cols-2 md:gap-12 md:pl-0"
            >
              {/* Timeline Dot/Line for mobile */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800 md:hidden" />
              <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-blue-500 md:hidden" />

              {/* Left Side: Meta Data */}
              <div className="mb-4 md:mb-0 md:text-right">
                <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                <div className="flex items-center md:justify-end gap-2 text-blue-400 font-medium mb-3">
                  <Building2 className="w-4 h-4" />
                  {exp.company}
                </div>
                <div className="flex flex-col md:items-end gap-1 text-sm text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {exp.location}
                  </span>
                </div>
              </div>

              {/* Right Side: Description */}
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
                <ul className="space-y-3 text-zinc-400 text-sm">
                  {exp.description?.split("\n").map((item: string, i: number) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-blue-500 mt-1">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
