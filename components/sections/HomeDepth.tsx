"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/hooks/useGsap";

/**
 * Transitions de profondeur entre les sections de la page d'accueil :
 * quand une section sort par le haut, elle recule dans la profondeur
 * (échelle, coins arrondis, assombrissement) pendant que la suivante
 * glisse par-dessus — effet « pile de cartes » des sites primés.
 *
 * Les sections épinglées ([data-pinned]) sont exclues : un transform
 * casserait leur pin ScrollTrigger.
 */
export default function HomeDepth() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(
        "main > section:not([data-pinned]):not([data-depth-exempt])"
      );

      sections.forEach((sec) => {
        // Nécessaire pour que le fond suive les coins arrondis.
        sec.style.overflow = "clip";

        gsap.fromTo(
          sec,
          { scale: 1, opacity: 1, borderRadius: 0 },
          {
            scale: 0.9,
            opacity: 0.35,
            borderRadius: 40,
            transformOrigin: "50% 18%",
            ease: "none",
            scrollTrigger: {
              trigger: sec,
              start: "bottom 92%",
              end: "bottom 18%",
              scrub: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
