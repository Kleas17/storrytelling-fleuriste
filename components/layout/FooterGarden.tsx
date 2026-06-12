"use client";

import { useEffect, useState } from "react";

const COULEURS = ["#B8814A", "#D8C9B8", "#7C9473", "#C97B3D", "#9FB0AD"];
const MAX_FLEURS = 10;
const INTERVALLE_MS = 45_000;

/**
 * Jardin de visite : une fleur pousse dans le footer toutes les 45 secondes
 * passées sur le site. Plus on reste, plus le jardin s'étoffe.
 */
export default function FooterGarden() {
  const [nb, setNb] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setNb((n) => Math.min(n + 1, MAX_FLEURS));
    }, INTERVALLE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div aria-hidden="true" className="flex flex-col items-start gap-2">
      <div className="flex items-end gap-3">
        {Array.from({ length: nb }, (_, i) => {
          const couleur = COULEURS[i % COULEURS.length];
          const h = 22 + ((i * 7) % 14);
          return (
            <svg
              key={i}
              width="18"
              height={h + 14}
              viewBox={`0 0 18 ${h + 14}`}
              className="origin-bottom animate-[pousse_0.9s_cubic-bezier(0.16,1,0.3,1)]"
            >
              <path
                d={`M9 ${h + 14} C 8 ${h + 4}, 10 ${h - 2}, 9 12`}
                stroke="#EDE8E1"
                strokeWidth="1.2"
                fill="none"
                opacity="0.5"
              />
              <g transform="translate(9 9)">
                {Array.from({ length: 5 }, (_, p) => (
                  <ellipse
                    key={p}
                    cx="0"
                    cy="-4.5"
                    rx="2.6"
                    ry="4.8"
                    fill={couleur}
                    opacity="0.85"
                    transform={`rotate(${p * 72})`}
                  />
                ))}
                <circle r="2" fill="#F5F0EB" opacity="0.9" />
              </g>
            </svg>
          );
        })}
      </div>
      <p className="font-display text-xs italic text-ivoire/40">
        Votre visite fait pousser ce jardin.
      </p>
    </div>
  );
}
