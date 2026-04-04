"use client";

import { motion } from "framer-motion";

interface SkillData {
  id: string;
  category: string;
  skillsList: string;
}

export default function Skills({ data }: { data: SkillData[] }) {
  if (!data?.length) return null;

  return (
    <section id="skills" className="py-24 bg-zinc-950 border-y border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-16 md:text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Core Competencies</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive stack of tools and methodologies leveraged to scale businesses
            effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((group: SkillData, groupIdx: number) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: groupIdx * 0.1 }}
              className="p-6 bg-black border border-zinc-800 rounded-2xl"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                {group.category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {group.skillsList.split(",").map((skill: string, skillIdx: number) => (
                  <span
                    key={skillIdx}
                    className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-lg hover:border-zinc-700 hover:text-white transition-colors cursor-default"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
