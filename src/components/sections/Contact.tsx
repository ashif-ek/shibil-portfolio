"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, User, MapPin, Send, MessageCircle, CheckCircle2, AlertCircle, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Contact() {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  // Auto-hide the toast after 5 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formspree.io/f/mzdkgkpw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setPending(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden border-t border-border">
      {/* Subtle Background Glow - Only in dark mode for clarity */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none hidden dark:block" />

      {/* Modern Toast Popup */}
      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md"
          >
            <div className={`flex items-center gap-4 p-4 rounded-2xl border backdrop-blur-md shadow-2xl ${
              status === "success" 
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" 
                : "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400"
            }`}>
              <div className={`p-2 rounded-xl ${
                status === "success" ? "bg-emerald-500/20" : "bg-rose-500/20"
              }`}>
                {status === "success" ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">
                  {status === "success" ? "Message sent!" : "Submission failed"}
                </p>
                <p className="text-sm opacity-80">
                  {status === "success" 
                    ? "I'll get back to you within 24 hours." 
                    : "Something went wrong. Please try again or email me directly."}
                </p>
              </div>
              <button 
                onClick={() => setStatus(null)}
                className="p-1 hover:bg-foreground/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-foreground/80 to-foreground/50 bg-clip-text text-transparent">
                Let&apos;s build predictable revenue.
              </h2>
              <p className="text-muted-foreground text-lg mb-12 max-w-md leading-relaxed">
                Whether you need to scale your ad spend profitably or build a robust SEO foundation,
                I&apos;m ready to help. Reach out to schedule a strategy call.
              </p>

              <div className="space-y-6">
                <a
                  href="mailto:sshibil14954@gmail.com"
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group"
                  aria-label="Send an email to Shibil S"
                >
                  <div className="w-12 h-12 bg-muted border border-border rounded-xl flex items-center justify-center group-hover:border-blue-500/50 transition-colors shadow-sm">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors focus:outline-none">
                      sshibil14954@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/shibil-s-433000370"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group"
                  aria-label="Connect with Shibil S on LinkedIn"
                >
                  <div className="w-12 h-12 bg-muted border border-border rounded-xl flex items-center justify-center group-hover:border-blue-500/50 transition-colors shadow-sm">
                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">LinkedIn</p>
                    <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                      Connect professionally
                    </p>
                  </div>
                </a>

                <a
                  href="https://wa.me/918590658417"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group"
                  aria-label="Message Shibil S on WhatsApp"
                >
                  <div className="w-12 h-12 bg-muted border border-border rounded-xl flex items-center justify-center group-hover:border-blue-500/50 transition-colors shadow-sm">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">WhatsApp</p>
                    <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                      Chat with me
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-muted-foreground group">
                  <div className="w-12 h-12 bg-muted border border-border rounded-xl flex items-center justify-center shadow-sm">
                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Location</p>
                    <p className="text-sm text-muted-foreground">Nilambur, Malappuram, Kerala-679333</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 bg-card backdrop-blur-sm border border-border rounded-3xl relative overflow-hidden shadow-xl"
          >
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-muted-foreground">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-muted-foreground/50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-muted-foreground/50"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none transition-all placeholder:text-muted-foreground/50"
                    placeholder="Tell me about your business goals..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={pending}
                  className="w-full py-4 mt-4 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-md"
                >
                  {pending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

  );
}

