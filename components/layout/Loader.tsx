"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/hooks/useGsap";
import { useSiteStore } from "@/lib/store";

const LETTRES = "Maison Verdier".split("");

export default function Loader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const setIntroDone = useSiteStore((s) => s.setIntroDone);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const alreadySeen = sessionStorage.getItem("mv-intro") === "1";
    if (alreadySeen || prefersReducedMotion()) {
      root.style.display = "none";
      setIntroDone(true);
      return;
    }

    sessionStorage.setItem("mv-intro", "1");
    document.documentElement.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = "";
          root.style.display = "none";
          setIntroDone(true);
        },
      });

      tl.fromTo(
        ".loader-letter",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.035,
          ease: "power4.out",
        }
      )
        .fromTo(
          ".loader-bar",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, ease: "power2.inOut" },
          "-=0.4"
        )
        .to(".loader-tagline", { opacity: 1, duration: 0.5 }, "-=0.8")
        .to(root, {
          yPercent: -100,
          duration: 0.8,
          ease: "power3.inOut",
          delay: 0.15,
        });
    }, root);

    return () => {
      ctx.revert();
      document.documentElement.style.overflow = "";
    };
  }, [setIntroDone]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-ivoire"
    >
      <div className="overflow-hidden">
        <h2 className="font-display text-4xl font-semibold tracking-wide text-mousse md:text-6xl">
          {LETTRES.map((l, i) => (
            <span key={i} className="loader-letter inline-block" style={{ whiteSpace: "pre" }}>
              {l}
            </span>
          ))}
        </h2>
      </div>
      <p className="loader-tagline mt-3 font-display text-lg italic text-sienne opacity-0">
        Artisan fleuriste
      </p>
      <div className="mt-10 h-px w-48 overflow-hidden bg-craie">
        <div className="loader-bar h-full w-full origin-left bg-sienne" style={{ transform: "scaleX(0)" }} />
      </div>
    </div>
  );
}
