"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/hooks/useGsap";

/**
 * Curseur personnalisé desktop : cercle fin avec lag magnétique.
 * Se dilate et affiche un libellé sur les éléments [data-cursor].
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer || prefersReducedMotion()) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (target) {
        setLabel(target.dataset.cursor || null);
        gsap.to(cursor, { scale: 2.6, duration: 0.3, ease: "power3.out" });
      } else if (
        (e.target as HTMLElement).closest("a, button, input, textarea, select, label")
      ) {
        setLabel(null);
        gsap.to(cursor, { scale: 1.6, duration: 0.3, ease: "power3.out" });
      } else {
        setLabel(null);
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power3.out" });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) {
    return <div ref={cursorRef} className="hidden" />;
  }

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[105] -ml-4 -mt-4 flex h-8 w-8 items-center justify-center rounded-full border border-sienne/80 bg-sienne/5"
    >
      {label && (
        <span className="font-caps text-[6px] uppercase tracking-widest text-mousse">
          {label}
        </span>
      )}
    </div>
  );
}
