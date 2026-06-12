"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { isTouchDevice, prefersReducedMotion } from "@/hooks/useGsap";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

/**
 * Vélocité de scroll partagée (px/frame, signée) — le « vent » du site :
 * les pétales 3D et le marquee s'inclinent quand on scrolle fort.
 */
export const scrollVelocity = { current: 0 };

export default function SmoothScroll({ children }: { children: ReactNode }) {
  // Filet de sécurité : re-mesure tous les pins une fois la page
  // entièrement chargée (polices, scènes 3D en dynamic import…).
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      const t = setTimeout(refresh, 300);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

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
      scrollVelocity.current = lenis.velocity;
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
