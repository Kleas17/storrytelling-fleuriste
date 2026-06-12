"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/hooks/useGsap";
import { useSiteStore } from "@/lib/store";
import { getLenis } from "./SmoothScroll";

interface TransitionContextValue {
  navigate: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export default function TransitionProvider({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);
  const pendingHref = useRef<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const setMenuOpen = useSiteStore((s) => s.setMenuOpen);

  const lockScroll = (lock: boolean) => {
    document.documentElement.style.overflow = lock ? "hidden" : "";
    const lenis = getLenis();
    if (lenis) (lock ? lenis.stop() : lenis.start());
  };

  // Entrée : à chaque changement de route, scroll remis à zéro, pins
  // re-mesurés rideau encore fermé, puis révélation + fondu du contenu.
  useEffect(() => {
    if (!pendingHref.current) return;
    pendingHref.current = null;

    const container = containerRef.current;
    window.scrollTo(0, 0);
    getLenis()?.scrollTo(0, { immediate: true, force: true });

    // Deux frames : on laisse la nouvelle page se peindre derrière le rideau.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();

        if (!container) {
          lockScroll(false);
          isTransitioning.current = false;
          return;
        }

        const mainEl = document.querySelector("main");
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(container, { visibility: "hidden" });
            lockScroll(false);
            isTransitioning.current = false;
            ScrollTrigger.refresh();
          },
        });

        tl.to(".curtain-main", {
          yPercent: -101,
          duration: 0.75,
          ease: "power3.inOut",
          delay: 0.08,
        })
          .to(
            ".curtain-accent",
            { yPercent: -101, duration: 0.75, ease: "power3.inOut" },
            "-=0.64"
          )
          .to(".curtain-label", { opacity: 0, duration: 0.25 }, 0);

        if (mainEl) {
          // Opacité uniquement : pas de transform sur <main> (les sections
          // épinglées en position:fixed seraient cassées par un ancêtre transformé).
          tl.fromTo(
            mainEl,
            { opacity: 0 },
            { opacity: 1, duration: 0.7, ease: "power2.out", clearProps: "opacity" },
            "-=0.55"
          );
        }
      });
    });
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      if (isTransitioning.current) return;
      if (href === pathname) {
        setMenuOpen(false);
        return;
      }
      const container = containerRef.current;
      setMenuOpen(false);

      if (!container || prefersReducedMotion()) {
        router.push(href);
        return;
      }

      isTransitioning.current = true;
      pendingHref.current = href;
      lockScroll(true);

      // Sortie : double rideau qui descend — lèvre sienne, puis mousse profonde.
      gsap.set(container, { visibility: "visible" });
      const tl = gsap.timeline({ onComplete: () => router.push(href) });
      tl.fromTo(
        ".curtain-accent",
        { yPercent: -101 },
        { yPercent: 0, duration: 0.55, ease: "power3.in" },
        0
      )
        .fromTo(
          ".curtain-main",
          { yPercent: -101 },
          { yPercent: 0, duration: 0.6, ease: "power3.inOut" },
          0.07
        )
        .fromTo(
          ".curtain-label",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
          0.32
        );
    },
    [pathname, router, setMenuOpen]
  );

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={containerRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[100]"
        style={{ visibility: "hidden" }}
      >
        <div
          className="curtain-accent absolute inset-0 bg-sienne"
          style={{ transform: "translateY(-101%)" }}
        />
        <div
          className="curtain-main absolute inset-0 bg-mousse"
          style={{ transform: "translateY(-101%)" }}
        >
          <div className="flex h-full items-center justify-center">
            <span className="curtain-label font-display text-2xl italic text-ivoire/60 opacity-0">
              Maison Verdier
            </span>
          </div>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
