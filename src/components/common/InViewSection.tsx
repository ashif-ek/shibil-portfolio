"use client";

import React, { useState, useEffect, useRef } from "react";

interface InViewSectionProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
  rootMargin?: string;
}

export default function InViewSection({
  children,
  fallback,
  rootMargin = "200px",
}: InViewSectionProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref}>
      {isInView ? children : fallback}
    </div>
  );
}
