"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/hooks/useGsap";

/**
 * Barre de progression de lecture « tige » : une tige fine pousse le long
 * du bord gauche au fil du scroll, une feuille à son extrémité.
 */
export default function ProgressStem() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const ligne = root.querySelector<HTMLElement>(".stem-line");
    const feuille = root.querySelector<HTMLElement>(".stem-leaf");
    if (!ligne || !feuille) return;

    const setScale = gsap.quickSetter(ligne, "scaleY");
    const setLeafY = gsap.quickSetter(feuille, "y", "px");

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      setScale(p);
      setLeafY(p * (window.innerHeight - 48));
      root.style.opacity = p > 0.01 ? "1" : "0";
    };

    update();
    const st = ScrollTrigger.create({ onUpdate: update });
    return () => st.kill();
  }, [pathname]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-5 top-0 z-[60] hidden h-full transition-opacity duration-500 lg:block"
      style={{ opacity: 0 }}
    >
      <div
        className="stem-line h-full w-px origin-top bg-mousse/40"
        style={{ transform: "scaleY(0)" }}
      />
      <svg
        className="stem-leaf absolute -left-[7px] top-6 h-4 w-4"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M8 14 C 8 9, 9 5, 14 2 C 9 3, 5 6, 8 14 Z"
          fill="#B8814A"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}
