"use client";

import { useRef, useState } from "react";
import { gsap, Flip } from "@/lib/gsap";
import { prefersReducedMotion, useGsapScope } from "@/hooks/useGsap";
import CreationCard from "@/components/ui/CreationCard";
import { categories, creations, type Categorie } from "@/lib/data/creations";

type Filtre = Categorie | "tous";

interface CreationsGalleryProps {
  /** Si fourni, la galerie est verrouillée sur cette catégorie (pages /creations/mariages…). */
  categorieFixe?: Categorie;
}

/** Galerie masonry avec filtres animés par GSAP Flip. */
export default function CreationsGallery({ categorieFixe }: CreationsGalleryProps) {
  const [filtre, setFiltre] = useState<Filtre>(categorieFixe ?? "tous");
  const gridRef = useRef<HTMLDivElement>(null);

  const scope = useGsapScope<HTMLDivElement>(() => {
    if (prefersReducedMotion()) return;
    gsap.from(".cg-card", {
      y: 50,
      scale: 0.94,
      opacity: 0,
      duration: 0.9,
      stagger: 0.06,
      ease: "power4.out",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 85%",
        once: true,
      },
    });
  });

  const applyFiltre = (next: Filtre) => {
    if (next === filtre) return;
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion()) {
      setFiltre(next);
      return;
    }

    const cards = gsap.utils.toArray<HTMLElement>(".cg-card", grid);
    const state = Flip.getState(cards);

    cards.forEach((card) => {
      const cat = card.dataset.cat as Categorie;
      card.style.display = next === "tous" || cat === next ? "" : "none";
    });

    Flip.from(state, {
      duration: 0.7,
      ease: "power3.inOut",
      stagger: 0.02,
      absolute: true,
      onEnter: (els) =>
        gsap.fromTo(els, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.5 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.92, duration: 0.35 }),
    });
    setFiltre(next);
  };

  const visibles = categorieFixe
    ? creations.filter((c) => c.categorie === categorieFixe)
    : creations;

  return (
    <div ref={scope}>
      {!categorieFixe && (
        <div
          role="group"
          aria-label="Filtrer les créations"
          className="mb-12 flex flex-wrap gap-x-8 gap-y-3"
        >
          {([{ id: "tous" as Filtre, label: "Tous" }, ...categories].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => applyFiltre(c.id as Filtre)}
              aria-pressed={filtre === c.id}
              className={`font-caps text-sm uppercase tracking-[0.2em] transition-colors duration-300 ${
                filtre === c.id ? "text-sienne" : "text-encre/50 hover:text-encre"
              }`}
            >
              {c.label}
            </button>
          )))}
        </div>
      )}

      <div ref={gridRef} className="masonry">
        {visibles.map((c) => (
          <div key={c.slug} className="cg-card" data-cat={c.categorie}>
            <CreationCard creation={c} />
          </div>
        ))}
      </div>
    </div>
  );
}
