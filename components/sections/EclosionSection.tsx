"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/hooks/useGsap";
import { FLEUR_SAISON, getSaisonActuelle } from "@/lib/saison-actuelle";

const BloomScene = dynamic(() => import("@/components/three/BloomScene"), {
  ssr: false,
});

const CHAPITRES = (nomFleur: string) => [
  {
    titre: "Tout commence fermé.",
    texte: "Un poing de pétales qui attend son heure, serré autour de son secret.",
  },
  {
    titre: "Puis la lumière fait son œuvre.",
    texte: "Rien ne se force. Tout se déplie, couronne après couronne.",
  },
  {
    titre: "Et la fleur dit son nom.",
    texte: `En ce moment à l'atelier, c'est ${nomFleur} qui parle. C'est cet instant-là que nous mettons en bouquet.`,
  },
];

/**
 * Section « Éclosion » : fleur 3D procédurale qui s'ouvre au fil du scroll
 * (section épinglée, scrub). La fleur change selon la vraie saison.
 */
export default function EclosionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [show3D, setShow3D] = useState(false);

  const saison = getSaisonActuelle();
  const fleur = FLEUR_SAISON[saison];
  const chapitres = CHAPITRES(fleur.nom);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      if (canvas.getContext("webgl2") || canvas.getContext("webgl")) setShow3D(true);
    } catch {
      /* fallback texte seul */
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion()) {
      progressRef.current = 1;
      const chaps = section.querySelectorAll<HTMLElement>(".ec-chapitre");
      chaps.forEach((c, i) => {
        c.style.opacity = i === chaps.length - 1 ? "1" : "0";
      });
      return;
    }

    const chaps = Array.from(section.querySelectorAll<HTMLElement>(".ec-chapitre"));
    const setters = chaps.map((c) => gsap.quickSetter(c, "opacity"));
    const ySetters = chaps.map((c) => gsap.quickSetter(c, "y", "px"));

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=2200",
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        // Crossfade des 3 chapitres selon la progression.
        const n = chaps.length;
        chaps.forEach((_, i) => {
          const centre = (i + 0.5) / n;
          const dist = Math.abs(self.progress - centre) * n;
          const o = Math.max(0, 1 - dist * 1.6);
          setters[i](o);
          ySetters[i]((1 - o) * 24);
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100svh] items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 70% 40%, #2a352b 0%, #1c241d 60%, #131a14 100%)",
      }}
      aria-label="L'éclosion — la fleur de la saison s'ouvre en scrollant"
    >
      {show3D && (
        <div className="absolute inset-y-0 right-0 w-full md:w-3/5">
          <BloomScene progressRef={progressRef} petale={fleur.petale} coeur={fleur.coeur} />
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-site px-8 md:px-14">
        <p className="font-caps text-sm uppercase tracking-[0.3em] text-sienne">
          L&apos;éclosion
        </p>
        <div className="relative mt-6 h-64 max-w-lg md:h-56">
          {chapitres.map((c, i) => (
            <div key={i} className="ec-chapitre absolute inset-0" style={{ opacity: i === 0 ? 1 : 0 }}>
              <h2 className="text-balance font-display text-4xl font-semibold leading-tight text-ivoire md:text-5xl">
                {c.titre}
              </h2>
              <p className="mt-5 max-w-md font-display text-lg font-light italic leading-relaxed text-ivoire/70 md:text-xl">
                {c.texte}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 font-caps text-[10px] uppercase tracking-[0.3em] text-ivoire/40">
          Scrollez pour faire éclore
        </p>
      </div>
    </section>
  );
}
