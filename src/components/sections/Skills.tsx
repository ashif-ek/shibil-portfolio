"use client";

import { motion } from "framer-motion";

const skillsGroup = [
  {
    category: "Paid Advertising",
    skills: ["Meta Ads Manager", "Google Ads", "A/B Creative Testing", "Conversion Tracking", "Retargeting Funnels"]
  },
  {
    category: "SEO & Content",
    skills: ["Technical SEO", "Keyword Research", "On-Page Optimization", "Video Editing", "Content Strategy"]
  },
  {
    category: "E-Commerce Growth",
    skills: ["Online Selling", "Shopify/WooCommerce", "Cart Abandonment", "ROAS Optimization", "Product Feed Management"]
  },
  {
    category: "Analytics & Tools",
    skills: ["Google Analytics 4", "Google Tag Manager", "Semrush/Ahrefs", "Looker Studio", "Excel/Sheets"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-zinc-950 border-y border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-16 md:text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Core Competencies</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive stack of tools and methodologies leveraged to scale businesses effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsGroup.map((group, groupIdx) => (
            <motion.div
              key={groupIdx}
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
                {group.skills.map((skill, skillIdx) => (
                  <span 
                    key={skillIdx} 
                    className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-lg hover:border-zinc-700 hover:text-white transition-colors cursor-default"
                  >
                    {skill}
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
