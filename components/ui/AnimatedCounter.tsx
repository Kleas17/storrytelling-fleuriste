"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsapScope } from "@/hooks/useGsap";

interface AnimatedCounterProps {
  valeur: number;
  suffixe?: string;
  label: string;
}

/** Compteur animé au scroll (déclenché une seule fois, easing Expo.out). */
export default function AnimatedCounter({ valeur, suffixe = "", label }: AnimatedCounterProps) {
  const numRef = useRef<HTMLSpanElement>(null);

  const scope = useGsapScope<HTMLDivElement>(() => {
    const obj = { v: 0 };
    gsap.to(obj, {
      v: valeur,
      duration: 2,
      ease: "expo.out",
      snap: { v: 1 },
      scrollTrigger: {
        trigger: scope.current,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        if (numRef.current) {
          numRef.current.textContent = Math.round(obj.v).toLocaleString("fr-FR");
        }
      },
    });
  });

  return (
    <div ref={scope} className="text-center">
      <p className="font-display text-5xl font-semibold text-mousse md:text-7xl">
        <span ref={numRef}>0</span>
        <span className="text-sienne">{suffixe && ` ${suffixe}`}</span>
      </p>
      <p className="mt-2 font-caps text-sm uppercase tracking-[0.2em] text-encre/60">
        {label}
      </p>
    </div>
  );
}
