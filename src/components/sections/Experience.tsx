"use client";

import { motion } from "framer-motion";
import { Building2, Calendar, MapPin } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-16 md:text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Professional Experience</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Practical, hands-on experience driving marketing execution for established industrial operations.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative pl-8 md:pl-0"
          >
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-zinc-800 -translate-x-1/2" />
            
            {/* Experience Item */}
            <div className="md:grid md:grid-cols-2 gap-8 md:items-center relative">
              
              {/* Timeline Dot */}
              <div className="absolute left-[-37px] md:left-[50%] top-6 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-black z-10" />

              {/* Left Side: Meta Data block (md:text-right) */}
              <div className="mb-4 md:mb-0 md:text-right md:pr-12 md:pb-0">
                <h3 className="text-2xl font-bold mb-2">Digital Marketing Executive</h3>
                <div className="flex items-center md:justify-end gap-2 text-blue-400 font-medium mb-3">
                  <Building2 className="w-4 h-4" />
                  Airin Industrial Corporation
                </div>
                <div className="flex md:justify-end items-center gap-4 text-sm text-zinc-500 mb-2">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Oct 2025 - Present</span>
                </div>
                <div className="flex md:justify-end items-center text-sm text-zinc-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Nilambur, Kerala</span>
                </div>
              </div>

              {/* Right Side: Description block */}
              <div className="md:pl-12">
                <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <ul className="space-y-3 text-zinc-400 text-sm">
                    <li className="flex gap-2">
                       <span className="text-blue-500 mt-1">▹</span> 
                       <span>Managed end-to-end digital marketing campaigns across Meta and Google Ads, optimizing for high-value industrial lead generation.</span>
                    </li>
                    <li className="flex gap-2">
                       <span className="text-blue-500 mt-1">▹</span> 
                       <span>Executed targeted SEO strategies to improve organic visibility for key industrial product search terms.</span>
                    </li>
                    <li className="flex gap-2">
                       <span className="text-blue-500 mt-1">▹</span> 
                       <span>Handled video editing and content production to create engaging organic media assets for B2B relationship building.</span>
                    </li>
                    <li className="flex gap-2">
                       <span className="text-blue-500 mt-1">▹</span> 
                       <span>Analyzed conversion data to continuously refine target audiences and reduce customer acquisition costs.</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
