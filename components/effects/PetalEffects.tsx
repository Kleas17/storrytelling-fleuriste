"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, isTouchDevice } from "@/hooks/useGsap";
import { PETALES_SAISON, getSaisonActuelle } from "@/lib/saison-actuelle";

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  color: string;
  life: number;
  decay: number;
  sway: number;
  phase: number;
}

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
];

const ASCII_BOUQUET = `
        @}->--   Maison Verdier   --<-{@

          .--.        .--.
         ( @@ )  .-.  ( @@ )
          '--' ( @@ )  '--'
           |    '--'    |
            \\    |     /
             \\   |    /
              \\__|__ /
                 |
              ~~~|~~~

   Psst… vous regardez sous les pétales ?
   On aime les curieux. atelier@maisonverdier.fr
   (Essayez aussi : ↑ ↑ ↓ ↓ ← → ← → B A)
`;

/**
 * Moteur de pétales 2D global (canvas plein écran) :
 * — traînée de pétales derrière le curseur (desktop) ;
 * — rafales via l'évènement window "petal-burst" (formulaire envoyé, Konami code) ;
 * — easter egg console + Konami code.
 */
export default function PetalEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Easter egg console — toujours actif, même reduced-motion.
    console.log(
      "%c" + ASCII_BOUQUET,
      "color:#3D4A3E;font-family:monospace;font-size:12px;"
    );
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = PETALES_SAISON[getSaisonActuelle()];
    const petals: Petal[] = [];
    const MAX = 600;
    let raf = 0;
    let running = false;
    let lastSpawn = 0;
    const touch = isTouchDevice();

    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();

    const spawn = (x: number, y: number, burst = false) => {
      if (petals.length >= MAX) return;
      const speed = burst ? 1.5 + Math.random() * 3 : 0.3 + Math.random() * 0.7;
      const angle = burst ? Math.random() * Math.PI * 2 : Math.PI / 2 + (Math.random() - 0.5);
      petals.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.abs(Math.sin(angle) * speed) + (burst ? 0.5 : 0.4),
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.12,
        size: burst ? 5 + Math.random() * 8 : 3 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: burst ? 0.003 + Math.random() * 0.004 : 0.008 + Math.random() * 0.008,
        sway: 0.4 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
      });
      ensureLoop();
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];
        p.phase += 0.03;
        p.x += p.vx + Math.sin(p.phase) * p.sway * 0.4;
        p.y += p.vy;
        p.vy = Math.min(p.vy + 0.012, 2.4);
        p.rot += p.vr;
        p.life -= p.decay;

        if (p.life <= 0 || p.y > h + 20) {
          petals.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.min(1, p.life * 1.4) * 0.85;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.55, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (petals.length > 0) {
        raf = requestAnimationFrame(draw);
      } else {
        running = false;
        ctx.clearRect(0, 0, w, h);
      }
    };

    const ensureLoop = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };

    // Traînée derrière le curseur (desktop uniquement, throttlée).
    const onMove = (e: MouseEvent) => {
      if (touch) return;
      const now = performance.now();
      if (now - lastSpawn < 70) return;
      lastSpawn = now;
      spawn(e.clientX + (Math.random() - 0.5) * 14, e.clientY + 6);
    };

    // Rafales (formulaire envoyé, Konami…).
    const onBurst = (e: Event) => {
      const count = (e as CustomEvent<{ count?: number }>).detail?.count ?? 120;
      const w = window.innerWidth;
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          spawn(Math.random() * w, -10 - Math.random() * 60, false);
        }, Math.random() * 1200);
      }
    };

    // Konami code → pluie de pétales.
    let konamiIndex = 0;
    const onKey = (e: KeyboardEvent) => {
      const attendu = KONAMI[konamiIndex];
      if (e.key === attendu || e.key.toLowerCase() === attendu) {
        konamiIndex++;
        if (konamiIndex === KONAMI.length) {
          konamiIndex = 0;
          window.dispatchEvent(
            new CustomEvent("petal-burst", { detail: { count: 450 } })
          );
          console.log("%c🌸 Que pleuvent les pétales !", "color:#B8814A;font-size:16px;");
        }
      } else {
        konamiIndex = e.key === KONAMI[0] ? 1 : 0;
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("petal-burst", onBurst);
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("petal-burst", onBurst);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[94]"
    />
  );
}
