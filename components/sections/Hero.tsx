"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { gsap, SplitText } from "@/lib/gsap";
import { useGsapScope, prefersReducedMotion, isTouchDevice } from "@/hooks/useGsap";
import { useSiteStore } from "@/lib/store";
import { getLenis } from "@/components/providers/SmoothScroll";
import { ARTICLE_SAISON, PETALES_SAISON, getSaisonActuelle } from "@/lib/saison-actuelle";

const PetalsScene = dynamic(() => import("@/components/three/PetalsScene"), {
  ssr: false,
});

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function Hero() {
  const introDone = useSiteStore((s) => s.introDone);
  const [show3D, setShow3D] = useState(false);
  const [petalCount, setPetalCount] = useState(320);

  useEffect(() => {
    if (webglAvailable() && !prefersReducedMotion()) {
      setPetalCount(isTouchDevice() ? 140 : 320);
      setShow3D(true);
    }
  }, []);

  const scope = useGsapScope<HTMLElement>(
    () => {
      if (!introDone) return;
      if (prefersReducedMotion()) {
        gsap.set([".hero-title", ".hero-sub", ".hero-cta", ".hero-scroll"], {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
        });
        return;
      }

      const title = scope.current?.querySelector(".hero-title");
      if (!title) return;

      gsap.set(".hero-title", { opacity: 1 });
      const split = new SplitText(title, { type: "words", wordsClass: "hero-word" });
      split.words.forEach((w) => {
        const mask = document.createElement("span");
        mask.style.display = "inline-block";
        mask.style.overflow = "hidden";
        mask.style.verticalAlign = "bottom";
        w.parentNode?.insertBefore(mask, w);
        mask.appendChild(w);
        (w as HTMLElement).style.display = "inline-block";
      });

      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(split.words, {
        yPercent: 115,
        duration: 0.9,
        stagger: 0.08,
        ease: "power4.out",
      })
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.8 }, "+=0.1")
        .to(
          ".hero-cta",
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 0.6,
            ease: "power3.inOut",
          },
          "-=0.5"
        )
        .to(".hero-scroll", { opacity: 1, duration: 0.8 }, "-=0.2");
    },
    [introDone]
  );

  const scrollToManifeste = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo("#manifeste", { duration: 1.4 });
    else document.getElementById("manifeste")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={scope}
      className="relative flex h-[100svh] items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 35%, #1d2620 0%, #11160f 70%, #0b0e0a 100%)",
      }}
    >
      {show3D && <PetalsScene count={petalCount} colors={PETALES_SAISON[getSaisonActuelle()]} />}

      <div className="relative z-10 px-6 text-center">
        <h1 className="hero-title text-balance font-display text-5xl font-bold leading-[1.05] text-ivoire opacity-0 md:text-7xl lg:text-8xl">
          Ce que les fleurs
          <br />
          ont à dire.
        </h1>
        <p
          className="hero-sub mx-auto mt-6 max-w-md font-display text-xl font-light italic text-ivoire/70 md:text-2xl"
          style={{ opacity: 0, transform: "translateY(16px)" }}
        >
          Atelier d&apos;art floral — créations sur-mesure, vivantes et éphémères.
          <span className="mt-3 block font-caps text-xs not-italic uppercase tracking-[0.3em] text-sienne">
            L&apos;atelier vit au rythme {ARTICLE_SAISON[getSaisonActuelle()]}
          </span>
        </p>
        <button
          type="button"
          onClick={scrollToManifeste}
          data-cursor="Entrer"
          className="hero-cta mt-12 inline-block border border-ivoire/40 px-10 py-4 font-caps text-sm uppercase tracking-[0.25em] text-ivoire transition-colors duration-300 hover:border-sienne hover:bg-sienne/10"
          style={{ clipPath: "inset(0% 100% 0% 0%)", opacity: 0 }}
        >
          Entrer dans l&apos;atelier
        </button>
      </div>

      <div
        className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 text-ivoire/50"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-caps text-[10px] uppercase tracking-[0.3em]">Défiler</span>
          <span className="block h-10 w-px animate-pulse bg-ivoire/40" />
        </div>
      </div>
    </section>
  );
}
