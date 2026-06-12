import type { Saison } from "@/lib/data/creations";

/**
 * Le site vit au rythme des vraies saisons : palette des pétales 3D,
 * visuels génératifs et accroches s'accordent à la date du jour.
 */
export function getSaisonActuelle(date: Date = new Date()): Saison {
  const mois = date.getMonth(); // 0–11
  if (mois >= 2 && mois <= 4) return "printemps"; // mars–mai
  if (mois >= 5 && mois <= 7) return "ete"; // juin–août
  if (mois >= 8 && mois <= 10) return "automne"; // septembre–novembre
  return "hiver"; // décembre–février
}

export const ARTICLE_SAISON: Record<Saison, string> = {
  printemps: "du printemps",
  ete: "de l'été",
  automne: "de l'automne",
  hiver: "de l'hiver",
};

/** Couleurs des pétales 3D du hero, par saison réelle. */
export const PETALES_SAISON: Record<Saison, string[]> = {
  printemps: ["#F5F0EB", "#D8C9B8", "#C5CDB4", "#7C9473", "#EDE8E1"],
  ete: ["#F5F0EB", "#D9A05B", "#C97B3D", "#B8814A", "#F3E9DC"],
  automne: ["#EFE3D3", "#B8814A", "#9C5F33", "#C9A227", "#D8C9B8"],
  hiver: ["#E4E7E8", "#9FB0AD", "#7E8C8A", "#F5F0EB", "#B8814A"],
};

/** Couleur principale de la fleur 3D « Éclosion », par saison. */
export const FLEUR_SAISON: Record<
  Saison,
  { petale: string; coeur: string; nom: string }
> = {
  printemps: { petale: "#D9BFC7", coeur: "#B8814A", nom: "la pivoine" },
  ete: { petale: "#C97B3D", coeur: "#7A4A2B", nom: "le dahlia" },
  automne: { petale: "#C49A6C", coeur: "#6B4226", nom: "la rose Toffee" },
  hiver: { petale: "#E8E4DD", coeur: "#3D4A3E", nom: "l'anémone" },
};
