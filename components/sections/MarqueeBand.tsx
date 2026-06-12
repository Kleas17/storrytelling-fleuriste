"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapScope, prefersReducedMotion } from "@/hooks/useGsap";

const MOTS = "Éphémère — Vivant — Fait main — De saison — ";

/**
 * Bande de mots géants en outline, déplacée par le scroll et
 * « skewée » par la vélocité (effet vent, façon Obys).
 */
export default function MarqueeBand({ dark = false }: { dark?: boolean }) {
  const scope = useGsapScope<HTMLDivElement>(() => {
    if (prefersReducedMotion()) return;

    gsap.fromTo(
      ".marquee-track",
      { xPercent: 4 },
      {
        xPercent: -24,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      }
    );

    const skewSetter = gsap.quickTo(".marquee-track", "skewX", {
      duration: 0.4,
      ease: "power2.out",
    });
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = gsap.utils.clamp(-8, 8, self.getVelocity() / 320);
        skewSetter(v);
      },
    });
    return () => st.kill();
  });

  const stroke = dark ? "rgba(245,240,235,0.55)" : "rgba(61,74,62,0.5)";

  return (
    <div
      ref={scope}
      aria-hidden="true"
      className={`overflow-hidden py-10 md:py-16 ${dark ? "bg-mousse" : "bg-ivoire"}`}
    >
      <div className="marquee-track whitespace-nowrap will-change-transform">
        <span
          className="font-display text-[16vw] font-bold uppercase leading-none tracking-tight md:text-[9vw]"
          style={{ WebkitTextStroke: `1.5px ${stroke}`, color: "transparent" }}
        >
          {MOTS}
          {MOTS}
          {MOTS}
        </span>
      </div>
    </div>
  );
}
