"use client";

import { gsap } from "@/lib/gsap";
import { useGsapScope, prefersReducedMotion } from "@/hooks/useGsap";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import FloralArt from "@/components/ui/FloralArt";
import TransitionLink from "@/components/ui/TransitionLink";
import { settings } from "@/lib/data/settings";

export default function SavoirFaireSection() {
  const scope = useGsapScope<HTMLElement>(() => {
    if (prefersReducedMotion()) return;
    // Parallaxe : l'image avance à ~80 % de la vitesse du scroll.
    gsap.fromTo(
      ".sf-img-inner",
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: ".sf-img",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });

  return (
    <section ref={scope} className="bg-ivoire py-24 md:py-36">
      <div className="mx-auto grid max-w-site items-center gap-14 px-6 md:grid-cols-2 md:px-10">
        <div
          className="sf-img relative overflow-hidden"
          style={{ borderRadius: "58% 42% 55% 45% / 56% 48% 52% 44%" }}
        >
          <div className="sf-img-inner scale-[1.25]">
            <FloralArt seed="atelier-mains" saison="printemps" className="h-auto w-full" />
          </div>
        </div>

        <div>
          <SectionHeading
            label="Savoir-faire"
            titre="La main avant la machine, le vivant avant tout."
          />
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-encre/80">
            Depuis dix-huit ans, l&apos;atelier travaille en circuit court avec les
            producteurs des Monts du Lyonnais. Pas de fleurs hors-saison, pas de
            mousse florale, pas de gestes mécaniques : une écriture florale libre,
            précise, vivante.
          </p>
          <TransitionLink
            href="/savoir-faire"
            data-cursor="Découvrir"
            className="link-underline mt-8 inline-block font-caps text-sm uppercase tracking-[0.22em] text-mousse"
          >
            Découvrir notre histoire
          </TransitionLink>
        </div>
      </div>

      <div className="mx-auto mt-24 grid max-w-4xl grid-cols-1 gap-12 px-6 sm:grid-cols-3 md:mt-32">
        {settings.chiffresCles.map((c) => (
          <AnimatedCounter key={c.label} valeur={c.valeur} suffixe={c.suffixe} label={c.label} />
        ))}
      </div>
    </section>
  );
}
