"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BarChart3, Target, Search, ShoppingCart } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,rgba(0,0,0,0)_100%)] z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium tracking-wide mb-4 border border-blue-500/20 uppercase tracking-widest">
            Shibil S
          </span>
          <h2 className="text-xl md:text-2xl font-medium text-gray-400 mb-6 font-mono">
            Digital Marketing Executive
          </h2>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          I Help Businesses Turn Ads <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
            Into Predictable Revenue
          </span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Results-driven Digital Marketing Executive specializing in SEO, SEM, and SMM. I create data-driven campaigns that improve online visibility, generate qualified leads, and increase ROI.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link 
            href="#contact" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            Book a Strategy Call
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="#services" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            View Services
          </Link>
        </motion.div>

        <motion.div 
          className="mt-20 pt-10 border-t border-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p className="text-sm text-gray-500 font-medium tracking-widest uppercase mb-8">Expertise In</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            <div className="flex items-center gap-2"><Target className="w-5 h-5" /> <span className="font-semibold text-lg">Search Engine Optimization</span></div>
            <div className="flex items-center gap-2"><BarChart3 className="w-5 h-5" /> <span className="font-semibold text-lg">Google Ads (PPC)</span></div>
            <div className="flex items-center gap-2"><Search className="w-5 h-5" /> <span className="font-semibold text-lg">Social Media Marketing</span></div>
            <div className="flex items-center gap-2"><ShoppingCart className="w-5 h-5" /> <span className="font-semibold text-lg">E-Commerce Management</span></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
