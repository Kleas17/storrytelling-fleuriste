"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { prefersReducedMotion } from "@/hooks/useGsap";

const FloatingFlora = dynamic(() => import("@/components/three/FloatingFlora"), {
  ssr: false,
});

/**
 * Monte la flore flottante 3D (desktop, WebGL, mouvement autorisé uniquement).
 * Couche fixe, translucide, au-dessus du contenu mais sous la navigation.
 */
export default function FloraOverlay() {
  const [actif, setActif] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) return;
    try {
      const canvas = document.createElement("canvas");
      if (canvas.getContext("webgl2") || canvas.getContext("webgl")) setActif(true);
    } catch {
      /* pas de WebGL : pas de flore */
    }
  }, []);

  if (!actif) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[56]">
      <FloatingFlora />
    </div>
  );
}
