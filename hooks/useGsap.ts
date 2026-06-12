"use client";

import { useEffect, useLayoutEffect, useRef, type DependencyList, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Monte un gsap.context scopé sur un élément, avec revert automatique au démontage.
 * Usage : const scope = useGsapScope<HTMLDivElement>((ctx) => { ...animations... }, [deps]);
 */
export function useGsapScope<T extends HTMLElement>(
  callback: (ctx: gsap.Context) => void,
  deps: DependencyList = []
): RefObject<T | null> {
  const scope = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context((self) => callback(self), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}

export function usePrefersReducedMotion(): boolean {
  const ref = useRef(false);
  if (typeof window !== "undefined") {
    ref.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return ref.current;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}
