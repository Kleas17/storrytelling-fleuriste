import type { Saison } from "./creations";

export interface SaisonData {
  id: Saison;
  slug: Saison;
  titre: string;
  sousTitre: string;
  manifeste: string;
  texte: string[];
  fleurs: string[];
  palette: { fond: string; texte: string; accent: string };
  compositions: string[];
}

export const saisons: SaisonData[] = [
  {
    id: "printemps",
    slug: "printemps",
    titre: "Printemps",
    sousTitre: "Le réveil",
    manifeste: "Tout recommence. Les bulbes percent, les branches se couvrent, l'atelier sent la sève.",
    texte: [
      "Le printemps est la saison des promesses tenues. Dès février, les renoncules de Nice arrivent à l'atelier ; en mars, les tulipes françaises ; en avril, les premières pivoines herbacées. C'est la saison où le métier redevient une fête.",
      "Nous travaillons les branches fleuries — cerisier, pommier, viburnum — forcées en chambre tiède pour devancer la nature de quelques jours. Un savoir-faire d'orfèvre, hérité des maîtres japonais de l'ikebana.",
    ],
    fleurs: ["Renoncule", "Tulipe française", "Pivoine herbacée", "Cerisier en fleurs", "Muguet", "Fritillaire"],
    palette: { fond: "#E8EDE4", texte: "#3D4A3E", accent: "#7C9473" },
    compositions: [
      "Bouquet de branches fleuries, vase haut",
      "Monochrome blanc « Méridien »",
      "Couronne de table pascale",
    ],
  },
  {
    id: "ete",
    slug: "ete",
    titre: "Été",
    sousTitre: "L'abondance",
    manifeste: "La pleine saison du circuit court : tout pousse à moins de cinquante kilomètres.",
    texte: [
      "L'été, notre carte est dictée par les producteurs des Monts du Lyonnais. Zinnias, dahlias précoces, cosmos, scabieuses : la cueillette du matin est en boutique à midi. C'est notre définition du luxe — la fraîcheur absolue, l'empreinte minuscule.",
      "C'est aussi la haute saison des mariages. L'atelier vit au rythme des vendredis de production : seaux par dizaines, mains dans l'eau fraîche, compositions qui partent à l'aube vers les domaines.",
    ],
    fleurs: ["Dahlia", "Zinnia", "Cosmos", "Scabieuse", "Delphinium", "Capucine"],
    palette: { fond: "#F3E9DC", texte: "#7A4A2B", accent: "#C97B3D" },
    compositions: [
      "Bouquet champêtre du marché",
      "Arche de cérémonie en fleurs locales",
      "Chemin de table déstructuré",
    ],
  },
  {
    id: "automne",
    slug: "automne",
    titre: "Automne",
    sousTitre: "L'or et la braise",
    manifeste: "Les dahlias culminent, les graminées dorent, la lumière devient miel.",
    texte: [
      "Septembre et octobre sont nos mois d'orfèvrerie. Le dahlia 'Café au Lait' atteint sa plénitude, les roses de jardin donnent leurs dernières et plus belles fleurs, les graminées prennent cette teinte d'or fatigué qui ne se cultive pas — elle se mérite.",
      "C'est la saison des matières : baies, branchages, feuillages cuivrés, physalis. L'atelier compose des paysages plus que des bouquets.",
    ],
    fleurs: ["Dahlia Café au Lait", "Rose Toffee", "Amarante", "Physalis", "Graminées", "Chrysanthème"],
    palette: { fond: "#EFE3D3", texte: "#6B4226", accent: "#B8814A" },
    compositions: [
      "Bouquet signature « L'aube de septembre »",
      "Suspension de graminées dorées",
      "Centre de table aux fruits et baies",
    ],
  },
  {
    id: "hiver",
    slug: "hiver",
    titre: "Hiver",
    sousTitre: "L'essentiel",
    manifeste: "La rareté comme luxe : branches nues, baies rouges, parfums de forêt.",
    texte: [
      "L'hiver révèle les fleuristes. Quand la profusion disparaît, reste le geste : une branche de saule tortueux bien placée, trois anémones au cœur noir, du pin qui parfume toute une pièce. Nous aimons cette saison d'économie et de précision.",
      "C'est aussi le temps des fêtes : couronnes piquées main, garnitures de cheminée, tables de réveillon. L'atelier sent l'orange séchée et la résine.",
    ],
    fleurs: ["Anémone", "Hellébore", "Amaryllis", "Saule tortueux", "Pin sylvestre", "Ilex"],
    palette: { fond: "#E4E7E8", texte: "#2F3B40", accent: "#5C7370" },
    compositions: [
      "Couronne de l'Avent piquée main",
      "Bouquet « Boréal »",
      "Garniture de table de réveillon",
    ],
  },
];

export function getSaison(slug: string): SaisonData | undefined {
  return saisons.find((s) => s.slug === slug);
}
