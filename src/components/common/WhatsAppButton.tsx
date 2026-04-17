"use client";

import { MessageCircleMore } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/918590658417";

  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      {/* Ripple Animation - GPU Promoted */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 transform-gpu will-change-transform" />
      
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:bg-[#20bd5a] transition-all duration-300 group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Contact on WhatsApp"
      >
        <MessageCircleMore className="h-7 w-7 transition-transform group-hover:rotate-12" />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-4 px-3 py-1 bg-zinc-900 border border-zinc-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with Shibil
        </span>
      </motion.a>
    </div>
  );
}
