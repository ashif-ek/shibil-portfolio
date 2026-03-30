import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
            Shibil<span className="text-blue-500">.</span>
          </Link>
          <p className="mt-2 text-sm text-zinc-500">
            Digital Marketing Specialist & Conversion Strategist.
          </p>
        </div>
        
        <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          <Link href="#services" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Services
          </Link>
          <Link href="#certificates" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Certificates
          </Link>
          <Link href="#experience" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Experience
          </Link>
          <Link href="#contact" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Contact
          </Link>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} Shibil S. All rights reserved.
        </p>
        <p className="text-xs text-zinc-600">
          Kerala, India
        </p>
      </div>
    </footer>
  );
}
