"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import dynamic from "next/dynamic";

const WhatsAppButton = dynamic(() => import("@/components/common/WhatsAppButton"), { ssr: false });
const BackToTop = dynamic(() => import("@/components/common/BackToTop"), { ssr: false });

export function FramerLazyProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict={false}>
      {children}
      <WhatsAppButton />
      <BackToTop />
    </LazyMotion>
  );
}
