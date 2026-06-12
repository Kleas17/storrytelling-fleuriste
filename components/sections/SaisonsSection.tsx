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
      gsap.to(".saisons-track", {
        xPercent: -75,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          pin: true,
          scrub: 1,
          end: "+=2600",
          snap: {
            snapTo: 1 / 3,
            duration: { min: 0.2, max: 0.6 },
            ease: "power1.inOut",
          },
        },
      });

      gsap.utils.toArray<HTMLElement>(".saison-panel-inner").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 0.9,
          scrollTrigger: {
            trigger: el,
            containerAnimation: undefined,
            start: "top 90%",
            once: true,
          },
        });
      });
    });
  });

  return (
    <section ref={scope} className="overflow-hidden">
      <div className="saisons-track flex flex-nowrap overflow-x-auto snap-x snap-mandatory lg:w-[400%] lg:overflow-visible lg:snap-none">
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
                <div className="w-[320px] overflow-hidden rounded-t-full lg:w-[380px]">
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
