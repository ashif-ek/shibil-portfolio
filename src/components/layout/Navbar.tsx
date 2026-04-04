import Link from "next/link";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold tracking-tighter text-white">
            Shibil <span className="text-blue-500">S</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#about"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="#services"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Services
          </Link>
          <Link
            href="#case-studies"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Case Studies
          </Link>
          <Link
            href="#certificates"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Certificates
          </Link>
          <Link
            href="#experience"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Experience
          </Link>
          <Link
            href="#blog"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="p-2 text-zinc-500 hover:text-white transition-colors"
            title="Admin Access"
          >
            <Lock className="w-4 h-4" />
          </Link>
          <Link
            href="#contact"
            className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-black shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
          >
            Book Strategy Call
          </Link>
        </div>
      </div>
    </header>
  );
}
