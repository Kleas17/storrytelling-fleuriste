"use client";

import { useEffect, useState } from "react";
import FloralArt from "@/components/ui/FloralArt";
import type { Saison } from "@/lib/data/creations";

const PHOTOS: { seed: string; saison: Saison; legende: string }[] = [
  { seed: "atelier-etabli", saison: "printemps", legende: "L'établi, un matin de mars" },
  { seed: "atelier-seaux", saison: "ete", legende: "Arrivage du jour, Monts du Lyonnais" },
  { seed: "atelier-spirale", saison: "automne", legende: "Montage en spirale, geste libre" },
  { seed: "atelier-outils", saison: "hiver", legende: "Les outils, transmis et affûtés" },
  { seed: "atelier-papier", saison: "printemps", legende: "Papier de soie et lin brut" },
  { seed: "atelier-soir", saison: "automne", legende: "L'atelier au soir, dernier bouquet" },
];

/** Galerie de l'atelier avec lightbox accessible (Escape, clic hors zone). */
export default function AtelierGallery() {
  const [ouvert, setOuvert] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOuvert(null);
      if (ouvert !== null) {
        if (e.key === "ArrowRight") setOuvert((ouvert + 1) % PHOTOS.length);
        if (e.key === "ArrowLeft") setOuvert((ouvert - 1 + PHOTOS.length) % PHOTOS.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ouvert]);

  return (
    <section className="bg-ivoire py-24 md:py-32">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <p className="mb-12 font-caps text-sm uppercase tracking-[0.25em] text-sienne">
          L&apos;atelier en images
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {PHOTOS.map((photo, i) => (
            <button
              key={photo.seed}
              type="button"
              onClick={() => setOuvert(i)}
              data-cursor="Voir"
              className="creation-card group relative block overflow-hidden"
              aria-label={`Agrandir : ${photo.legende}`}
            >
              <FloralArt seed={photo.seed} saison={photo.saison} ratio="carre" className="h-auto w-full" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-encre/50 to-transparent p-4 text-left font-display text-sm italic text-ivoire opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {photo.legende}
              </span>
            </button>
          ))}
        </div>
      </div>

      {ouvert !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={PHOTOS[ouvert].legende}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-encre/90 p-6"
          onClick={() => setOuvert(null)}
        >
          <div className="max-h-[85vh] w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <FloralArt
              seed={PHOTOS[ouvert].seed}
              saison={PHOTOS[ouvert].saison}
              ratio="carre"
              className="h-auto max-h-[75vh] w-full"
            />
            <div className="mt-4 flex items-center justify-between">
              <p className="font-display italic text-ivoire">{PHOTOS[ouvert].legende}</p>
              <button
                type="button"
                onClick={() => setOuvert(null)}
                className="font-caps text-sm uppercase tracking-[0.2em] text-ivoire/70 hover:text-ivoire"
              >
                Fermer ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
