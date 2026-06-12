export interface Temoignage {
  texte: string;
  auteur: string;
  contexte: string;
}

export const temoignages: Temoignage[] = [
  {
    texte:
      "Nous cherchions un fleuriste, nous avons trouvé un auteur. Chaque composition raconte quelque chose — nos invités en parlent encore, huit mois après.",
    auteur: "Camille & Théo",
    contexte: "Mariage, Dombes",
  },
  {
    texte:
      "Une fiabilité rare sur des événements complexes : 600 invités, contraintes patrimoniales, montage de nuit. Tout était impeccable, et spectaculaire.",
    auteur: "Hélène R.",
    contexte: "Direction événementielle",
  },
  {
    texte:
      "Depuis cinq ans, je ne commande plus un bouquet : je demande « ce que l'atelier a envie de dire cette semaine ». Je n'ai jamais été déçue.",
    auteur: "Marie D.",
    contexte: "Cliente fidèle",
  },
];
