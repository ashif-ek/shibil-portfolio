"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, ShieldCheck, GraduationCap } from "lucide-react";

const certificates = [
  {
    title: "Diploma in Digital Marketing",
    issuer: "Westberg International Institute",
    date: "Aug - Oct 2025",
    link: "#",
    icon: <ShieldCheck className="w-8 h-8 text-blue-500" />
  },
  {
    title: "Higher Secondary (Maths Commerce)",
    issuer: "GHSS Moothedam",
    date: "Completed",
    link: "#",
    icon: <GraduationCap className="w-8 h-8 text-purple-500" />
  },
  {
    title: "Google Ads Search Certification",
    issuer: "Google Digital Academy",
    date: "Verified",
    link: "#",
    icon: <Award className="w-8 h-8 text-yellow-500" />
  },
  {
    title: "Meta Certified Associate",
    issuer: "Meta Blueprint",
    date: "Verified",
    link: "#",
    icon: <Award className="w-8 h-8 text-indigo-500" />
  }
];

export default function Certificates() {
  return (
    <section id="certificates" className="py-24 bg-black border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-16 md:text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Credentials & Trust</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Verified expertise from industry leaders in search, social, and growth marketing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition group"
            >
              <div className="mb-6 p-3 bg-black rounded-xl inline-flex border border-zinc-800 group-hover:border-blue-500/30 transition-colors">
                {cert.icon}
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2 leading-tight">{cert.title}</h3>
              <p className="text-zinc-500 text-sm mb-4">{cert.issuer}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800/50">
                <span className="text-xs font-mono text-zinc-600">{cert.date}</span>
                <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                  Verify <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
