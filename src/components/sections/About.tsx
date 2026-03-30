"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-24 bg-black border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">About Me</h2>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                I am a performance-driven Digital Marketing Specialist based in Kerala, India. My journey into digital marketing was built on a simple premise: helping local brands and e-commerce stores scale predictability through data-backed decisions.
              </p>
              <p>
                Currently serving as a Digital Marketing Executive at Airin Industrial Corporation, I handle everything from Meta Ads strategy to technical SEO and content creation. I don’t just run campaigns; I build holistic conversion systems.
              </p>
              <p>
                When you work with me, you aren't just getting an ad operator. You are getting a dedicated growth partner who understands business economics, profitability, and what it takes to dominate online markets.
              </p>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none aspect-[4/5] lg:h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <Image
              src="/shibil-profile.png"
              alt="Shibil S - Digital Marketing Specialist"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
