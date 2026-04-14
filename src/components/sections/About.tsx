"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-24 bg-background border-t border-border relative overflow-hidden">
      {/* Background Glow - Only in dark mode for clarity */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/2 pointer-events-none hidden dark:block" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">About Me</h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                As a Digital Marketing Executive with a background in SEO, SEM, and SMM, I
                specialize in creating data-driven campaigns that provide measurable results. My
                expertise lies in helping brands enhance their online visibility and ROI through
                research-backed strategies.
              </p>
              <p>
                From coordinating complex SEO strategies to executing targeted Meta and Google Ads,
                my focus is always on continuous improvement and staying updated with the latest
                digital trends. I build user-friendly websites that aren't just visually appealing
                but optimized for real-world conversions.
              </p>
              <p>
                Currently, I leverage tools like Google Analytics and keyword analysis to help
                businesses in Kerala and beyond grow their digital footprint. When I'm not
                optimizing campaigns, I'm exploring new ways to bridge the gap between business
                goals and user needs.
              </p>
              <div className="pt-4 flex flex-col gap-3 font-mono text-sm uppercase tracking-wider text-blue-600 dark:text-blue-400">
                <p>📍 Malappuram, Kerala, India</p>
                <p>🎓 Diploma in Digital Marketing, Westberg International</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none aspect-[4/5] lg:h-[600px] rounded-3xl overflow-hidden border border-border shadow-2xl"
          >
            {/* No gradient overlay for high clarity */}
            <Image
              src="/image.png"
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
