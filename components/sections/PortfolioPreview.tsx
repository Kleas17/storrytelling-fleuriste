"use client";

import { gsap } from "@/lib/gsap";
import { useGsapScope, prefersReducedMotion } from "@/hooks/useGsap";
import SectionHeading from "@/components/ui/SectionHeading";
import CreationCard from "@/components/ui/CreationCard";
import TransitionLink from "@/components/ui/TransitionLink";
import { creations } from "@/lib/data/creations";

export default function PortfolioPreview() {
  const featured = creations.filter((c) => c.featured).slice(0, 3);

  const scope = useGsapScope<HTMLElement>(() => {
    if (prefersReducedMotion()) return;
    gsap.from(".pp-card", {
      y: 60,
      scale: 0.92,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".pp-grid",
        start: "top 80%",
        once: true,
      },
    });
  });

  return (
    <section ref={scope} className="bg-craie py-24 md:py-36">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading label="Créations" titre="Quelques pages de notre journal floral." />
          <TransitionLink
            href="/creations"
            data-cursor="Voir"
            className="link-underline shrink-0 font-caps text-sm uppercase tracking-[0.22em] text-mousse"
          >
            Voir toutes les créations
          </TransitionLink>
        </div>

        <div className="pp-grid mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <div key={c.slug} className="pp-card">
              <CreationCard creation={c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
