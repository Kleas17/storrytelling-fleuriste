"use client";

import { gsap } from "@/lib/gsap";
import { useGsapScope, prefersReducedMotion } from "@/hooks/useGsap";

const MANIFESTE = [
  "Nous ne vendons pas des fleurs.",
  "Nous cultivons des instants.",
  "Chaque tige est choisie à la main, chaque saison dicte sa loi, chaque création part de l'atelier comme une lettre qu'on n'écrira qu'une fois.",
];

/** Texte révélé mot à mot au scroll (ScrollTrigger, scrub). */
export default function Manifeste() {
  const scope = useGsapScope<HTMLElement>(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      ".manifeste-word",
      { opacity: 0.18, y: 8 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.6,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%",
          end: "bottom 55%",
          scrub: true,
        },
      }
    );
  });

  let wordIndex = 0;

  return (
    <section id="manifeste" ref={scope} className="bg-ivoire py-28 md:py-44">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <p className="mb-8 font-caps text-sm uppercase tracking-[0.25em] text-sienne">
          Manifeste
        </p>
        {MANIFESTE.map((phrase, pi) => (
          <p
            key={pi}
            className={`text-balance font-display leading-snug text-mousse ${
              pi < 2
                ? "text-4xl font-semibold md:text-6xl"
                : "mt-10 text-2xl font-light italic md:text-4xl"
            }`}
          >
            {phrase.split(" ").map((mot) => (
              <span key={wordIndex++} className="manifeste-word">
                {mot}&nbsp;
              </span>
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}
