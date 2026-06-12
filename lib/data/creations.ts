export type Categorie = "mariage" | "evenement" | "bouquet" | "deuil";
export type Saison = "printemps" | "ete" | "automne" | "hiver";

export interface Creation {
  slug: string;
  titre: string;
  categorie: Categorie;
  saison: Saison;
  accroche: string;
  description: string[];
  fleurs: string[];
  lieu?: string;
  temoignage?: { texte: string; auteur: string };
  featured: boolean;
  annee: number;
}

export const categories: { id: Categorie; label: string; slug: string; intro: string }[] = [
  {
    id: "mariage",
    label: "Mariages",
    slug: "mariages",
    intro:
      "Le jour où tout commence mérite des fleurs qui racontent votre histoire. Arches, bouquets de mariée, décors de table : chaque mariage est une œuvre unique, pensée avec vous.",
  },
  {
    id: "evenement",
    label: "Événements",
    slug: "evenements",
    intro:
      "Galas, inaugurations, séminaires : nous mettons en scène le végétal à grande échelle, avec la rigueur logistique qu'exigent les événements d'entreprise.",
  },
  {
    id: "bouquet",
    label: "Bouquets",
    slug: "bouquets",
    intro:
      "Le bouquet est notre écriture quotidienne. Fleurs de saison, circuit court, geste libre : chaque composition sort de l'atelier comme une phrase que l'on offre.",
  },
  {
    id: "deuil",
    label: "Deuil",
    slug: "deuil",
    intro:
      "Accompagner un adieu demande des fleurs justes, sobres et dignes. Nous composons avec retenue ce que les mots ne savent plus dire.",
  },
];

export const creations: Creation[] = [
  {
    slug: "mariage-champetre-dombes",
    titre: "Un matin dans la Dombes",
    categorie: "mariage",
    saison: "ete",
    accroche: "Mariage champêtre pour 140 convives, entre étangs et lumière d'été.",
    description: [
      "Camille et Théo rêvaient d'un mariage qui ressemble aux étés de leur enfance : herbes hautes, lumière rasante, fleurs qui semblent cueillies le matin même. Nous avons composé une arche libre en gypsophile, delphiniums et graminées, comme une lisière de prairie suspendue.",
      "Les tables ont reçu des chemins de fleurs déstructurés — achillées, scabieuses, menthe fraîche — pour que le parfum accompagne le repas jusqu'à la nuit.",
    ],
    fleurs: ["Delphinium", "Gypsophile", "Scabieuse", "Achillée", "Graminées sauvages"],
    lieu: "Domaine des Étangs, Dombes",
    temoignage: {
      texte:
        "Les invités parlent encore des fleurs. C'était exactement nous : libre, vivant, sans une once d'artifice.",
      auteur: "Camille & Théo",
    },
    featured: true,
    annee: 2025,
  },
  {
    slug: "mariage-hiver-chartreuse",
    titre: "Noces de givre",
    categorie: "mariage",
    saison: "hiver",
    accroche: "Cérémonie d'hiver en Chartreuse : blanc cassé, eucalyptus givré, bougies.",
    description: [
      "Se marier en décembre, c'est accepter la rareté — et en faire un luxe. Pour Élise et Marc, nous avons travaillé l'hellébore, la renoncule blanche et l'eucalyptus cinerea, rehaussés de branches givrées récoltées la veille.",
      "Le bouquet de mariée, monté sur fil, semblait pris dans le gel : une dentelle végétale que la chaleur des mains réveillait lentement.",
    ],
    fleurs: ["Hellébore", "Renoncule", "Eucalyptus cinerea", "Branches givrées", "Lierre"],
    lieu: "Monastère de Chalais, Chartreuse",
    temoignage: {
      texte: "Un bouquet que je garderai en mémoire toute ma vie. On aurait dit de la neige cousue.",
      auteur: "Élise",
    },
    featured: true,
    annee: 2024,
  },
  {
    slug: "mariage-jardin-italien",
    titre: "Giardino",
    categorie: "mariage",
    saison: "printemps",
    accroche: "Inspiration toscane : oliviers, citrons, roses de jardin et pivoines coral.",
    description: [
      "Un hommage aux jardins italiens pour un couple franco-milanais. Oliviers en pots centenaires, guirlandes de feuillage sur les longues tables, pivoines 'Coral Charm' et roses de jardin parfumées.",
      "La scénographie jouait sur les hauteurs : candélabres végétalisés, fruits posés à même la nappe de lin, désordre savamment orchestré.",
    ],
    fleurs: ["Pivoine Coral Charm", "Rose de jardin", "Olivier", "Citron", "Jasmin"],
    lieu: "Château de Bagnols, Beaujolais",
    featured: false,
    annee: 2025,
  },
  {
    slug: "gala-musee-confluence",
    titre: "Gala des Lumières",
    categorie: "evenement",
    saison: "automne",
    accroche: "Scénographie florale monumentale pour 600 invités au musée des Confluences.",
    description: [
      "Pour ce gala de bienfaisance, le brief tenait en trois mots : monumental, organique, mémorable. Nous avons suspendu un nuage végétal de 9 mètres au-dessus du cocktail — amarantes retombantes, dahlias pourpres, feuillages cuivrés.",
      "Quatre jours de production en atelier, une nuit de montage, douze mains. L'éphémère à l'échelle de l'architecture.",
    ],
    fleurs: ["Amarante", "Dahlia", "Chrysanthème", "Fougère cuivrée", "Physalis"],
    lieu: "Musée des Confluences, Lyon",
    temoignage: {
      texte:
        "Une exécution impeccable malgré des contraintes techniques fortes. Le nuage floral a fait le tour des réseaux sociaux.",
      auteur: "Direction événementielle, Fondation L.",
    },
    featured: true,
    annee: 2025,
  },
  {
    slug: "inauguration-maison-couture",
    titre: "Première collection",
    categorie: "evenement",
    saison: "printemps",
    accroche: "Inauguration d'une maison de couture : 80 mètres linéaires de vitrines fleuries.",
    description: [
      "Pour l'ouverture de la boutique lyonnaise d'une maison de couture parisienne, nous avons habillé vitrines et escalier d'honneur de branches de cerisier forcées en atelier, afin qu'elles fleurissent le jour J.",
      "Un pari sur le vivant : trois semaines de forçage, une floraison synchronisée à 48 heures près.",
    ],
    fleurs: ["Cerisier en fleurs", "Tulipe perroquet", "Muguet", "Viburnum"],
    lieu: "Presqu'île, Lyon",
    featured: false,
    annee: 2024,
  },
  {
    slug: "seminaire-domaine-beaujolais",
    titre: "Vert silence",
    categorie: "evenement",
    saison: "ete",
    accroche: "Séminaire de direction : ambiance végétale apaisante, 100 % feuillages.",
    description: [
      "Un séminaire stratégique de trois jours demandait une atmosphère propice à la concentration. Réponse : le végétal sans la fleur. Compositions de feuillages — asparagus, pittosporum, fougères — et mousses stabilisées.",
      "La salle plénière respirait. Les participants aussi.",
    ],
    fleurs: ["Asparagus", "Pittosporum", "Fougère", "Mousse stabilisée", "Eucalyptus"],
    lieu: "Domaine de la Chaize, Beaujolais",
    featured: false,
    annee: 2025,
  },
  {
    slug: "bouquet-aube-septembre",
    titre: "L'aube de septembre",
    categorie: "bouquet",
    saison: "automne",
    accroche: "Bouquet signature d'automne : dahlias café, roses toffee, graminées dorées.",
    description: [
      "Septembre est notre mois préféré à l'atelier : les dahlias sont à leur apogée, les graminées prennent l'or. Ce bouquet signature marie le dahlia 'Café au Lait', la rose 'Toffee' et l'avoine sauvage.",
      "Monté en spirale, libre et précis à la fois, il se vit comme un paysage de fin d'été qu'on tiendrait dans la main.",
    ],
    fleurs: ["Dahlia Café au Lait", "Rose Toffee", "Avoine sauvage", "Sedum", "Cosmos chocolat"],
    featured: true,
    annee: 2025,
  },
  {
    slug: "bouquet-blanc-meridien",
    titre: "Méridien blanc",
    categorie: "bouquet",
    saison: "printemps",
    accroche: "Monochrome blanc : tulipes françaises, renoncules, fritillaires.",
    description: [
      "Le blanc n'est jamais blanc : il est crème, ivoire, vert d'eau, presque gris. Ce bouquet explore toutes les nuances du printemps clair — tulipes françaises aux longues tiges souples, renoncules de Nice, fritillaires persanes.",
      "Une composition pour les amoureux du silence.",
    ],
    fleurs: ["Tulipe française", "Renoncule de Nice", "Fritillaire", "Narcisse", "Viburnum"],
    featured: false,
    annee: 2025,
  },
  {
    slug: "bouquet-feu-juillet",
    titre: "Feu de juillet",
    categorie: "bouquet",
    saison: "ete",
    accroche: "Éclat estival : capucines, zinnias, dahlias orange sanguine.",
    description: [
      "Quand juillet brûle, l'atelier répond par le feu : zinnias éclatants, capucines grimpantes, dahlias orange sanguine et œillets de poète. Un bouquet qui ne s'excuse pas d'exister.",
      "Cueillette du matin chez nos producteurs des Monts du Lyonnais, en vase l'après-midi même.",
    ],
    fleurs: ["Zinnia", "Capucine", "Dahlia", "Œillet de poète", "Fenouil bronze"],
    featured: false,
    annee: 2025,
  },
  {
    slug: "hommage-jardin-blanc",
    titre: "Le jardin blanc",
    categorie: "deuil",
    saison: "printemps",
    accroche: "Hommage tout en retenue : blancs purs, verts tendres, gestes simples.",
    description: [
      "Pour accompagner le départ d'une passionnée de jardins, la famille souhaitait « son jardin, en plus calme ». Nous avons composé une couverture florale de roses blanches, lisianthus et feuillages d'ornement, posée comme un drap de printemps.",
      "Dans ces moments, notre métier consiste surtout à écouter — puis à faire peu, mais juste.",
    ],
    fleurs: ["Rose blanche", "Lisianthus", "Hortensia", "Feuillage d'ornement"],
    featured: false,
    annee: 2024,
  },
  {
    slug: "hommage-automne-roux",
    titre: "Lumière d'octobre",
    categorie: "deuil",
    saison: "automne",
    accroche: "Adieu dans les tons roux : la chaleur d'une vie, en fleurs.",
    description: [
      "La famille voulait éviter le blanc convenu : il aimait l'automne, la chasse aux champignons, les feux de cheminée. Chrysanthèmes cuivrés, roses ambrées, feuillages de chêne — un hommage chaleureux, à son image.",
      "Le deuil n'interdit pas la couleur. Il demande seulement la justesse.",
    ],
    fleurs: ["Chrysanthème", "Rose ambrée", "Feuillage de chêne", "Amarante", "Hypericum"],
    featured: false,
    annee: 2025,
  },
  {
    slug: "bouquet-hiver-boreal",
    titre: "Boréal",
    categorie: "bouquet",
    saison: "hiver",
    accroche: "Bouquet d'hiver : anémones noires, branches de saule, pin parfumé.",
    description: [
      "L'hiver impose son économie de moyens — et c'est une chance. Anémones au cœur noir, branches de saule tortueux, pin sylvestre parfumé et baies d'ilex : quatre matières, un paysage.",
      "Le bouquet qui sent la forêt après la pluie froide.",
    ],
    fleurs: ["Anémone", "Saule tortueux", "Pin sylvestre", "Ilex", "Amaryllis"],
    featured: true,
    annee: 2024,
  },
];

export function getCreation(slug: string): Creation | undefined {
  return creations.find((c) => c.slug === slug);
}

export function getCreationsByCategorie(categorie: Categorie): Creation[] {
  return creations.filter((c) => c.categorie === categorie);
}

export function getCategorieBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
