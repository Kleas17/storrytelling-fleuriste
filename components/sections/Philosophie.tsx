"use client";

import { gsap } from "@/lib/gsap";
import { useGsapScope, prefersReducedMotion } from "@/hooks/useGsap";

const PILIERS = [
  {
    titre: "Le vivant d'abord",
    texte:
      "Fleurs de saison, circuits courts, zéro mousse florale. Nous travaillons avec la nature, jamais contre elle.",
    icon: (
      <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none" aria-hidden="true">
        <path className="ph-path" d="M40 70 C 38 50, 42 38, 40 18" stroke="#3D4A3E" strokeWidth="1.8" strokeLinecap="round" />
        <path className="ph-path" d="M40 42 C 28 36, 22 38, 14 28 C 26 26, 34 32, 40 40" stroke="#3D4A3E" strokeWidth="1.5" strokeLinecap="round" />
        <path className="ph-path" d="M40 30 C 52 24, 58 26, 66 16 C 54 14, 46 20, 40 28" stroke="#3D4A3E" strokeWidth="1.5" strokeLinecap="round" />
        <circle className="ph-path" cx="40" cy="14" r="5" stroke="#B8814A" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    titre: "La main avant la machine",
    texte:
      "Chaque composition est montée à la main, en spirale, sans gabarit. Le geste artisanal est notre seule signature.",
    icon: (
      <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none" aria-hidden="true">
        <path className="ph-path" d="M20 60 C 24 44, 30 36, 44 30 C 54 26, 62 28, 66 22" stroke="#3D4A3E" strokeWidth="1.8" strokeLinecap="round" />
        <path className="ph-path" d="M20 60 C 30 58, 40 52, 46 44" stroke="#3D4A3E" strokeWidth="1.5" strokeLinecap="round" />
        <path className="ph-path" d="M58 18 C 62 14, 68 14, 70 18 C 72 22, 68 28, 62 26" stroke="#B8814A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    titre: "L'émotion comme boussole",
    texte:
      "Un bouquet réussi se mesure à ce qu'il déclenche. Nous créons pour toucher, pas pour décorer.",
    icon: (
      <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none" aria-hidden="true">
        <path
          className="ph-path"
          d="M40 64 C 22 50, 12 38, 14 26 C 16 16, 28 12, 40 24 C 52 12, 64 16, 66 26 C 68 38, 58 50, 40 64 Z"
          stroke="#B8814A"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path className="ph-path" d="M40 24 C 40 36, 40 48, 40 60" stroke="#3D4A3E" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

/** Les 3 piliers de la philosophie, icônes SVG dessinées au scroll (DrawSVG). */
export default function Philosophie() {
  const scope = useGsapScope<HTMLElement>(() => {
    if (prefersReducedMotion()) return;
    gsap.utils.toArray<HTMLElement>(".ph-pilier").forEach((pilier, i) => {
      gsap.from(pilier.querySelectorAll(".ph-path"), {
        drawSVG: "0%",
        duration: 1.6,
        ease: "power2.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: pilier,
          start: "top 80%",
          once: true,
        },
        delay: i * 0.1,
      });
      gsap.from(pilier, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: {
          trigger: pilier,
          start: "top 85%",
          once: true,
        },
        delay: i * 0.1,
      });
    });
  });

  return (
    <section ref={scope} className="bg-craie py-24 md:py-32">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <p className="mb-14 text-center font-caps text-sm uppercase tracking-[0.25em] text-sienne">
          Philosophie
        </p>
        <div className="grid gap-14 md:grid-cols-3">
          {PILIERS.map((p) => (
            <div key={p.titre} className="ph-pilier text-center">
              <div className="flex justify-center">{p.icon}</div>
              <h3 className="mt-6 font-display text-2xl font-semibold text-mousse">
                {p.titre}
              </h3>
              <p className="mx-auto mt-4 max-w-xs leading-relaxed text-encre/70">{p.texte}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
