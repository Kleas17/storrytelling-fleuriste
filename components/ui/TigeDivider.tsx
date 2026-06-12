"use client";

import { useGsapScope } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";

/**
 * Séparateur de sections : tige florale SVG dessinée progressivement
 * au scroll (GSAP DrawSVG, scrub).
 */
export default function TigeDivider({ className = "" }: { className?: string }) {
  const scope = useGsapScope<HTMLDivElement>(() => {
    gsap.from(".tige-path", {
      drawSVG: "0%",
      ease: "power2.inOut",
      stagger: 0.15,
      scrollTrigger: {
        trigger: scope.current,
        start: "top 85%",
        end: "bottom 35%",
        scrub: 1,
      },
    });
  });

  return (
    <div ref={scope} aria-hidden="true" className={`flex justify-center py-16 md:py-24 ${className}`}>
      <svg width="120" height="220" viewBox="0 0 120 220" fill="none">
        <path
          className="tige-path"
          d="M60 215 C 58 170, 64 130, 60 90 C 57 60, 61 35, 60 8"
          stroke="#3D4A3E"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          className="tige-path"
          d="M60 160 C 45 150, 32 152, 20 138 C 36 136, 50 144, 60 156"
          stroke="#3D4A3E"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          className="tige-path"
          d="M60 120 C 75 110, 88 112, 100 98 C 84 96, 70 104, 60 116"
          stroke="#3D4A3E"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          className="tige-path"
          d="M60 12 C 50 4, 56 -2, 60 6 C 64 -2, 70 4, 60 12"
          stroke="#B8814A"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
