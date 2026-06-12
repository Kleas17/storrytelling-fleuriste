"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/hooks/useGsap";

/**
 * Tilt 3D + reflet (« glare ») : la carte se penche vers le curseur.
 * Sans effet au clavier, sur tactile ou en reduced-motion.
 */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 7,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    gsap.to(el, {
      rotateY: (px - 0.5) * maxTilt * 2,
      rotateX: (0.5 - py) * maxTilt * 2,
      transformPerspective: 900,
      duration: 0.5,
      ease: "power3.out",
    });
    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 1,
        background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(245,240,235,0.22), transparent 55%)`,
        duration: 0.3,
      });
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.9, ease: "elastic.out(1, 0.5)" });
    if (glareRef.current) gsap.to(glareRef.current, { opacity: 0, duration: 0.4 });
  };

  return (
    <div
      ref={ref}
      className={`relative will-change-transform ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
      <div
        ref={glareRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0"
      />
    </div>
  );
}
