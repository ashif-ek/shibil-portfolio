import Link from "next/link";
import { UserCog } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link 
            href="/" 
            className="text-xl font-bold tracking-tighter text-foreground"
            aria-label="Return to Shibil S Portfolio Homepage"
          >
            Shibil <span className="text-blue-500">S</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="#services"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Services
          </Link>
          <Link
            href="#case-studies"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Case Studies
          </Link>
          <Link
            href="#certificates"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Certificates
          </Link>
          <Link
            href="#experience"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Experience
          </Link>
          <Link
            href="#blog"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/admin"
            className="p-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all duration-300"
            title="Access Admin Dashboard"
            aria-label="Access Admin Dashboard"
          >
            <UserCog className="w-5 h-5" />
          </Link>
          <Link
            href="#contact"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Book Strategy Call
          </Link>
        </div>
      </div>
    </header>
  );
}

