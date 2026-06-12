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
  const curtainRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);
  const pendingHref = useRef<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const setMenuOpen = useSiteStore((s) => s.setMenuOpen);

  // Entrée : à chaque changement de route, le rideau remonte.
  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;

    window.scrollTo(0, 0);
    getLenis()?.scrollTo(0, { immediate: true });

    if (pendingHref.current) {
      pendingHref.current = null;
      gsap.to(curtain, {
        yPercent: -100,
        duration: 0.65,
        ease: "power3.inOut",
        delay: 0.1,
        onComplete: () => {
          gsap.set(curtain, { yPercent: 100 });
          isTransitioning.current = false;
          ScrollTrigger.refresh();
        },
      });
    }
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      if (isTransitioning.current) return;
      if (href === pathname) {
        setMenuOpen(false);
        return;
      }
      const curtain = curtainRef.current;
      setMenuOpen(false);

      if (!curtain || prefersReducedMotion()) {
        router.push(href);
        return;
      }

      isTransitioning.current = true;
      pendingHref.current = href;
      // Sortie : rideau mousse profonde qui descend depuis le haut.
      gsap.fromTo(
        curtain,
        { yPercent: -100 },
        {
          yPercent: 0,
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => router.push(href),
        }
      );
    },
    [pathname, router, setMenuOpen]
  );

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[100] bg-mousse"
        style={{ transform: "translateY(100%)" }}
      >
        <div className="flex h-full items-center justify-center">
          <span className="font-display text-2xl italic text-ivoire/60">
            Maison Verdier
          </span>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
