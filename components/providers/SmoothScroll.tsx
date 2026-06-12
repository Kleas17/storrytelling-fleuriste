"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { isTouchDevice, prefersReducedMotion } from "@/hooks/useGsap";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Scroll natif sur mobile (plus performant) et si reduced-motion.
    if (isTouchDevice() || prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
