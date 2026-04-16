"use client";

import { useState } from "react";
import { login } from "@/actions/auth";
import { Lock, User, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f2f3f3] selection:bg-orange-100 selection:text-orange-900 text-zinc-900">
      {/* Amazon Console Style Header */}
      <header className="h-14 bg-[#232f3e] text-white flex items-center justify-between px-6 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-4">
          <div className="font-black text-xl tracking-tight flex items-center gap-2">
            <span className="text-orange-400">Admin-Panel</span>
            <span className="text-white/30 font-normal">|</span>
            <span className="text-white text-sm font-medium">Authentication</span>
          </div>
        </div>
        <a 
          href="/" 
          className="text-white/70 hover:text-white text-xs font-bold transition-all flex items-center gap-1 opacity-80"
        >
          <ChevronLeft className="w-3 h-3" />
          Public Site
        </a>
      </header>

      <div className="flex items-center justify-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[400px]"
        >
          <div className="bg-white border border-zinc-200 rounded-lg shadow-md overflow-hidden">
            <div className="px-8 py-6 border-b border-zinc-200 bg-zinc-50">
              <h1 className="text-xl font-bold text-zinc-900">Sign In</h1>
              <p className="text-sm text-zinc-500 mt-1">Authorized access only</p>
            </div>

            <div className="p-8">
              <form action={handleSubmit} className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500 flex items-center gap-2">
                    <User className="w-3.5 h-3.5" /> Username
                  </label>
                  <input
                    name="username"
                    type="text"
                    required
                    className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2.5 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300"
                    placeholder="admin"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-tight text-zinc-500 flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5" /> Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2.5 text-sm text-black focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] outline-none transition-all placeholder:text-zinc-300"
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-red-50 border border-red-200 p-3 rounded text-red-600 text-xs font-medium text-center"
                  >
                    {error}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0073BB] text-white font-bold py-3 rounded-md hover:bg-[#005c96] transition-all shadow-sm active:translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Authenticating..." : "Sign In"}
                </button>
              </form>
            </div>
            
            <div className="px-8 py-4 bg-zinc-50 border-t border-zinc-100 flex justify-center">
              <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-[0.1em]">
                Secure Administrative Interface
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="h-px w-full bg-zinc-200" />
            <a 
              href="/" 
              className="text-zinc-500 hover:text-orange-600 text-xs font-medium transition-all decoration-dotted underline underline-offset-4"
            >
              Return to Public Site
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
