"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, isTouchDevice } from "@/hooks/useGsap";

/**
 * Fond interactif : grille de points qui se distordent au passage de la souris.
 * Amplitude max 30px, rayon d'influence 150px (CDC §7.2 — Page Contact).
 */
export default function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || isTouchDevice()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const mouse = { x: -9999, y: -9999 };
    const GAP = 36;
    const RADIUS = 150;
    const AMP = 30;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = () => {
      const w = canvas.width / devicePixelRatio;
      const h = canvas.height / devicePixelRatio;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(61, 74, 62, 0.25)";

      for (let x = GAP / 2; x < w; x += GAP) {
        for (let y = GAP / 2; y < h; y += GAP) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.hypot(dx, dy);
          let px = x;
          let py = y;
          if (dist < RADIUS && dist > 0) {
            const force = (1 - dist / RADIUS) * AMP;
            px += (dx / dist) * force;
            py += (dy / dist) * force;
          }
          ctx.beginPath();
          ctx.arc(px, py, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    />
  );
}
