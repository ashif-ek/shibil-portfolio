"use client";

import { motion } from "framer-motion";
import { Target, BarChart3, Search, ShoppingCart, ArrowUpRight } from "lucide-react";

const services = [
  {
    title: "Meta Ads Management",
    icon: <Target className="w-8 h-8 text-blue-500" />,
    problem: "Wasting spend on unqualified audiences.",
    solution: "Data-backed targeting models & creative testing.",
    outcome: "Lower CPA & higher ROAS predictability."
  },
  {
    title: "Google Ads Optimization",
    icon: <BarChart3 className="w-8 h-8 text-green-500" />,
    problem: "Losing high-intent searchers to competitors.",
    solution: "Search intent mapping & precision keyword bidding.",
    outcome: "Dominate top-of-page visibility & click-through rates."
  },
  {
    title: "SEO Growth Strategy",
    icon: <Search className="w-8 h-8 text-purple-500" />,
    problem: "Invisible on Google for money-making keywords.",
    solution: "Technical audits, content strategy & backlink planning.",
    outcome: "Sustainable organic traffic & ongoing free leads."
  },
  {
    title: "E-Commerce Marketing",
    icon: <ShoppingCart className="w-8 h-8 text-orange-500" />,
    problem: "High cart abandonment & low customer lifetime value.",
    solution: "Retargeting funnels & optimized product feeds.",
    outcome: "Increased average order value & repeat purchases."
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">How I Drive Growth</h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            I don't just run ads; I build performance marketing systems designed to generate measurable revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors group"
            >
              <div className="mb-6 flex justify-between items-start">
                <div className="p-3 bg-zinc-950 rounded-xl inline-flex border border-zinc-800">
                  {service.icon}
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
                  <span className="text-zinc-200 text-sm leading-relaxed font-medium">{service.outcome}</span>
                </li>
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
