"use client";

import { useState } from "react";
import { gsap } from "@/lib/gsap";
import { useGsapScope, prefersReducedMotion } from "@/hooks/useGsap";
import FloralArt from "@/components/ui/FloralArt";
import TiltCard from "@/components/ui/TiltCard";
import { especes } from "@/lib/data/herbier";
import { saisons } from "@/lib/data/saisons";
import type { Saison } from "@/lib/data/creations";

type Filtre = Saison | "toutes";

export default function HerbierGrid() {
  const [filtre, setFiltre] = useState<Filtre>("toutes");

  const scope = useGsapScope<HTMLDivElement>(() => {
    if (prefersReducedMotion()) return;
    gsap.from(".hb-card", {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.04,
      ease: "power4.out",
      scrollTrigger: { trigger: scope.current, start: "top 85%", once: true },
    });
  });

  const visibles = filtre === "toutes" ? especes : especes.filter((e) => e.saison === filtre);

  return (
    <div ref={scope}>
      <div role="group" aria-label="Filtrer par saison" className="mb-12 flex flex-wrap gap-x-8 gap-y-3">
        <button
          type="button"
          onClick={() => setFiltre("toutes")}
          aria-pressed={filtre === "toutes"}
          className={`font-caps text-sm uppercase tracking-[0.2em] transition-colors duration-300 ${
            filtre === "toutes" ? "text-sienne" : "text-encre/50 hover:text-encre"
          }`}
        >
          Toutes
        </button>
        {saisons.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setFiltre(s.id)}
            aria-pressed={filtre === s.id}
            className={`font-caps text-sm uppercase tracking-[0.2em] transition-colors duration-300 ${
              filtre === s.id ? "text-sienne" : "text-encre/50 hover:text-encre"
            }`}
          >
            {s.titre}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {visibles.map((e) => (
          <TiltCard key={e.latin} className="hb-card">
            <article className="group h-full border border-craie bg-white/40 transition-shadow duration-500 hover:shadow-[0_20px_50px_-20px_rgba(28,28,30,0.2)]">
              <div className="overflow-hidden">
                <FloralArt
                  seed={e.latin}
                  saison={e.saison}
                  ratio="carre"
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold text-mousse">{e.nom}</h3>
                <p className="font-display text-sm italic text-encre/50">{e.latin}</p>
                <p className="mt-3 text-sm leading-relaxed text-encre/70">{e.note}</p>
                <p className="mt-3 font-caps text-[10px] uppercase tracking-[0.2em] text-sienne">
                  {e.symbolique}
                </p>
              </div>
            </article>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
