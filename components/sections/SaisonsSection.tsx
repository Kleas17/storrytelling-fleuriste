"use client";

import { gsap } from "@/lib/gsap";
import { useGsapScope, prefersReducedMotion } from "@/hooks/useGsap";
import TransitionLink from "@/components/ui/TransitionLink";
import FloralArt from "@/components/ui/FloralArt";
import { saisons } from "@/lib/data/saisons";

/**
 * Section Saisons : horizontal scroll piloté par le scroll vertical (desktop, pinned),
 * carousel natif à snap sur mobile/tablette.
 */
export default function SaisonsSection() {
  const scope = useGsapScope<HTMLElement>(() => {
    if (prefersReducedMotion()) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const track = scope.current?.querySelector<HTMLElement>(".saisons-track");
      if (!track) return;

      // Distance réelle mesurée (et re-mesurée à chaque refresh) : évite tout
      // décalage dû à la scrollbar ou aux arrondis de 100vw.
      const amount = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -amount(),
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: () => "+=" + amount(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / 3,
            duration: { min: 0.2, max: 0.6 },
            ease: "power1.inOut",
          },
        },
      });

      // Profondeur dans l'axe horizontal : les visuels dérivent moins vite
      // que le track (parallaxe interne pilotée par containerAnimation).
      gsap.utils.toArray<HTMLElement>(".saison-visual").forEach((el) => {
        gsap.fromTo(
          el,
          { x: -70 },
          {
            x: 70,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    });
  });

  return (
    <section ref={scope} data-pinned className="overflow-hidden">
      <div className="saisons-track flex w-full flex-nowrap snap-x snap-mandatory overflow-x-auto lg:w-max lg:snap-none lg:overflow-visible">
        {saisons.map((s, i) => (
          <article
            key={s.id}
            className="saison-panel flex min-h-[100svh] w-[88vw] shrink-0 snap-center items-center lg:h-screen lg:w-screen"
            style={{ backgroundColor: s.palette.fond, color: s.palette.texte }}
          >
            <div className="saison-panel-inner mx-auto grid w-full max-w-site items-center gap-10 px-8 md:grid-cols-2 md:px-14">
              <div>
                <p
                  className="font-caps text-sm uppercase tracking-[0.3em]"
                  style={{ color: s.palette.accent }}
                >
                  {String(i + 1).padStart(2, "0")} — {s.sousTitre}
                </p>
                <h3 className="mt-4 font-display text-6xl font-semibold md:text-8xl">
                  {s.titre}
                </h3>
                <p className="mt-6 max-w-md font-display text-xl font-light italic leading-relaxed md:text-2xl">
                  {s.manifeste}
                </p>
                <TransitionLink
                  href={`/saisons/${s.slug}`}
                  data-cursor="Lire"
                  className="link-underline mt-10 inline-block font-caps text-sm uppercase tracking-[0.22em]"
                >
                  Lire la saison
                </TransitionLink>
              </div>
              <div className="hidden justify-center md:flex">
                <div className="saison-visual w-[320px] overflow-hidden rounded-t-full lg:w-[380px]">
                  <FloralArt seed={`saison-${s.id}`} saison={s.id} className="h-auto w-full" />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
