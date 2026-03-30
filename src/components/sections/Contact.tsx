"use client";

import { motion } from "framer-motion";
import { Mail, User, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    // Simulate API call for now; since we just scaffolded
    setTimeout(() => {
      setPending(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left: Info */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Let's build predictable revenue.</h2>
            <p className="text-gray-400 text-lg mb-12 max-w-md">
              Whether you need to scale your ad spend profitably or build a robust SEO foundation, I'm ready to help. Reach out to schedule a strategy call.
            </p>

            <div className="space-y-6">
              <a href="mailto:sshibil14984@gmail.com" className="flex items-center gap-4 text-zinc-300 hover:text-white transition-colors group">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center group-hover:border-zinc-700 transition-colors">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">sshibil14984@gmail.com</p>
                </div>
              </a>

              <a href="https://linkedin.com/in/shibil-s-433000370" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-zinc-300 hover:text-white transition-colors group">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center group-hover:border-zinc-700 transition-colors">
                  <User className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">LinkedIn</p>
                  <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">Connect professionally</p>
                </div>
              </a>

              <div className="flex items-center gap-4 text-zinc-300 group">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-zinc-500">Nilambur, Kerala, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 bg-zinc-900 border border-zinc-800 rounded-3xl"
          >
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            
            {success ? (
              <div className="h-[300px] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                  <Send className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold">Message sent!</h4>
                <p className="text-zinc-400">I'll get back to you within 24 hours.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-4 px-6 py-2 text-sm text-white bg-zinc-800 rounded-full hover:bg-zinc-700 transition"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-zinc-400">Name</label>
                    <input 
                      id="name" name="name" type="text" required
                      className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-zinc-400">Email</label>
                    <input 
                      id="email" name="email" type="email" required
                      className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-zinc-400">Message</label>
                  <textarea 
                    id="message" name="message" required rows={4}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                    placeholder="Tell me about your business goals..."
                  ></textarea>
                </div>

                <button 
                  type="submit" disabled={pending}
                  className="w-full py-4 mt-4 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {pending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
