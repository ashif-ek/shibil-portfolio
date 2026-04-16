"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, ShieldCheck, GraduationCap, LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  award: Award,
  shield: ShieldCheck,
  graduation: GraduationCap,
};

interface CertificateData {
  id: string;
  title: string;
  issuer: string;
  date: string | null;
  link: string | null;
  icon: string | null;
}

export default function Certificates({ data }: { data: CertificateData[] }) {
  if (!data?.length) return null;

  return (
    <section id="certificates" className="py-24 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-16 md:text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Credentials & Trust
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Verified expertise from industry leaders in search, social, and growth marketing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((cert: CertificateData, index: number) => {
            const Icon = ICON_MAP[cert.icon || "award"] || Award;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-blue-500/50 transition-all group flex flex-col shadow-sm"
              >
                <div className="mb-6 p-3 bg-muted rounded-xl inline-flex border border-border group-hover:border-blue-500/30 transition-colors">
                  <Icon className="w-8 h-8 text-blue-600 dark:text-blue-500" />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">{cert.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{cert.issuer}</p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                  <span className="text-xs font-mono text-muted-foreground/60">{cert.date}</span>
                  {cert.link && (
                    <a 
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors flex items-center gap-1"
                    >
                      Verify <span className="sr-only">{cert.title} Credential</span> <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

  );
}
