"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/hooks/useGsap";
import { temoignages } from "@/lib/data/temoignages";

/** Carousel de témoignages en fondu enchaîné. */
export default function Temoignages() {
  const [index, setIndex] = useState(0);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % temoignages.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || !quoteRef.current) return;
    gsap.fromTo(
      quoteRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
    );
  }, [index]);

  const t = temoignages[index];

  return (
    <section className="bg-ivoire py-24 md:py-36" aria-label="Témoignages clients">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <p className="mb-10 font-caps text-sm uppercase tracking-[0.25em] text-sienne">
          Ils nous ont confié leurs instants
        </p>
        <blockquote ref={quoteRef} className="min-h-[180px]">
          <p className="text-balance font-display text-2xl font-light italic leading-relaxed text-mousse md:text-3xl">
            «&nbsp;{t.texte}&nbsp;»
          </p>
          <footer className="mt-8">
            <p className="font-caps text-sm uppercase tracking-[0.2em] text-encre">
              {t.auteur}
            </p>
            <p className="mt-1 text-sm text-encre/50">{t.contexte}</p>
          </footer>
        </blockquote>
        <div className="mt-10 flex justify-center gap-3">
          {temoignages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Témoignage ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                i === index ? "w-8 bg-sienne" : "w-1.5 bg-encre/20 hover:bg-encre/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
