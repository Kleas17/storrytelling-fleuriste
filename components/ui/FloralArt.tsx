import { hashString, mulberry32 } from "@/lib/utils";
import type { Saison } from "@/lib/data/creations";

const PALETTES: Record<Saison, { fond: string[]; fleurs: string[]; tiges: string }> = {
  printemps: {
    fond: ["#E8EDE4", "#DDE6D5"],
    fleurs: ["#A9B89A", "#7C9473", "#D8C9B8", "#C5CDB4", "#B8814A"],
    tiges: "#5C6E58",
  },
  ete: {
    fond: ["#F3E9DC", "#EEDFC9"],
    fleurs: ["#C97B3D", "#B8814A", "#A0522D", "#D9A05B", "#8A6E4B"],
    tiges: "#6B5B3E",
  },
  automne: {
    fond: ["#EFE3D3", "#E7D6BF"],
    fleurs: ["#B8814A", "#9C5F33", "#7A4A2B", "#C9A227", "#8B5E3C"],
    tiges: "#6B4226",
  },
  hiver: {
    fond: ["#E4E7E8", "#D8DEDF"],
    fleurs: ["#5C7370", "#7E8C8A", "#3D4A3E", "#9FB0AD", "#B8814A"],
    tiges: "#46555A",
  },
};

interface FloralArtProps {
  seed: string;
  saison: Saison;
  className?: string;
  /** Ratio : "portrait" 3:4 (défaut) ou "carre" 1:1. */
  ratio?: "portrait" | "carre";
}

/**
 * Composition botanique générative et déterministe (SVG).
 * Sert de visuel d'attente premium avant le shooting photo du client (CDC §5.5).
 */
export default function FloralArt({ seed, saison, className, ratio = "portrait" }: FloralArtProps) {
  const rand = mulberry32(hashString(seed));
  const palette = PALETTES[saison];
  const W = 600;
  const H = ratio === "portrait" ? 800 : 600;
  const uid = `fa-${hashString(seed).toString(36)}`;

  const nbTiges = 4 + Math.floor(rand() * 3);
  const tiges: { d: string; fx: number; fy: number; r: number; color: string; petales: number; rot: number }[] = [];

  for (let i = 0; i < nbTiges; i++) {
    const x0 = W * (0.25 + rand() * 0.5);
    const fx = W * (0.18 + rand() * 0.64);
    const fy = H * (0.14 + rand() * 0.38);
    const cx1 = x0 + (rand() - 0.5) * 160;
    const cy1 = H * 0.75;
    const cx2 = fx + (rand() - 0.5) * 120;
    const cy2 = fy + H * 0.18;
    tiges.push({
      d: `M ${x0.toFixed(1)} ${H + 10} C ${cx1.toFixed(1)} ${cy1.toFixed(1)}, ${cx2.toFixed(1)} ${cy2.toFixed(1)}, ${fx.toFixed(1)} ${fy.toFixed(1)}`,
      fx,
      fy,
      r: 26 + rand() * 38,
      color: palette.fleurs[Math.floor(rand() * palette.fleurs.length)],
      petales: 5 + Math.floor(rand() * 3),
      rot: rand() * 360,
    });
  }

  const blobs = Array.from({ length: 3 }, () => ({
    cx: W * rand(),
    cy: H * rand(),
    r: 120 + rand() * 180,
    color: palette.fleurs[Math.floor(rand() * palette.fleurs.length)],
    o: 0.07 + rand() * 0.08,
  }));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label={`Composition florale — ${saison}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={palette.fond[0]} />
          <stop offset="100%" stopColor={palette.fond[1]} />
        </linearGradient>
      </defs>

      <rect width={W} height={H} fill={`url(#${uid}-bg)`} />

      {blobs.map((b, i) => (
        <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill={b.color} opacity={b.o} />
      ))}

      {tiges.map((t, i) => (
        <g key={i}>
          <path d={t.d} fill="none" stroke={palette.tiges} strokeWidth={2.2} opacity={0.65} />
          <g transform={`translate(${t.fx} ${t.fy}) rotate(${t.rot})`}>
            {Array.from({ length: t.petales }, (_, p) => (
              <ellipse
                key={p}
                cx={0}
                cy={-t.r * 0.55}
                rx={t.r * 0.34}
                ry={t.r * 0.62}
                fill={t.color}
                opacity={0.82}
                transform={`rotate(${(360 / t.petales) * p})`}
              />
            ))}
            <circle r={t.r * 0.2} fill={palette.tiges} opacity={0.8} />
          </g>
        </g>
      ))}
    </svg>
  );
}
