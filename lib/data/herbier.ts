import type { Saison } from "./creations";

export interface Espece {
  nom: string;
  latin: string;
  saison: Saison;
  note: string;
  symbolique: string;
}

export const especes: Espece[] = [
  // Printemps
  { nom: "Renoncule", latin: "Ranunculus asiaticus", saison: "printemps", note: "Pétales de papier crépon, par dizaines de couches.", symbolique: "Le charme discret" },
  { nom: "Tulipe perroquet", latin: "Tulipa gesneriana", saison: "printemps", note: "Continue de pousser en vase, se tord vers la lumière.", symbolique: "La déclaration" },
  { nom: "Pivoine herbacée", latin: "Paeonia lactiflora", saison: "printemps", note: "S'ouvre du poing fermé à la coupe pleine en trois jours.", symbolique: "La prospérité" },
  { nom: "Muguet", latin: "Convallaria majalis", saison: "printemps", note: "Clochettes parfumées, quinze jours par an, pas un de plus.", symbolique: "Le retour du bonheur" },
  { nom: "Fritillaire", latin: "Fritillaria persica", saison: "printemps", note: "Hampe sombre, presque noire — la mélancolie élégante.", symbolique: "La majesté" },
  { nom: "Lilas", latin: "Syringa vulgaris", saison: "printemps", note: "Le parfum d'une cour d'école au mois de mai.", symbolique: "Les premières émotions" },
  // Été
  { nom: "Dahlia", latin: "Dahlia pinnata", saison: "ete", note: "Géométrie parfaite, du pompon à l'assiette.", symbolique: "La gratitude" },
  { nom: "Zinnia", latin: "Zinnia elegans", saison: "ete", note: "Couleurs franches, tiges droites, gaieté sans détour.", symbolique: "La pensée fidèle" },
  { nom: "Cosmos", latin: "Cosmos bipinnatus", saison: "ete", note: "Danse au moindre souffle — le mouvement fait fleur.", symbolique: "L'harmonie" },
  { nom: "Scabieuse", latin: "Scabiosa atropurpurea", saison: "ete", note: "Coussin de dentelle au bout d'un fil de fer souple.", symbolique: "L'amour malheureux" },
  { nom: "Delphinium", latin: "Delphinium elatum", saison: "ete", note: "Le bleu le plus pur du règne végétal.", symbolique: "La légèreté" },
  { nom: "Capucine", latin: "Tropaeolum majus", saison: "ete", note: "Comestible, grimpante, indisciplinée — on l'aime pour ça.", symbolique: "La flamme" },
  // Automne
  { nom: "Rose Toffee", latin: "Rosa × hybrida", saison: "automne", note: "Couleur thé au lait, impossible à photographier juste.", symbolique: "La tendresse mûre" },
  { nom: "Chrysanthème", latin: "Chrysanthemum morifolium", saison: "automne", note: "Mal-aimé à tort : au Japon, c'est la fleur impériale.", symbolique: "La longévité" },
  { nom: "Amarante", latin: "Amaranthus caudatus", saison: "automne", note: "Cascades pourpres qui ne fanent presque jamais.", symbolique: "L'immortalité" },
  { nom: "Physalis", latin: "Physalis alkekengi", saison: "automne", note: "Lanternes orange — la lumière mise en cage.", symbolique: "La protection" },
  { nom: "Sedum", latin: "Sedum spectabile", saison: "automne", note: "Plateaux charnus qui virent du vert au cuivre.", symbolique: "La patience" },
  { nom: "Avoine sauvage", latin: "Avena fatua", saison: "automne", note: "L'or fatigué des graminées de septembre.", symbolique: "L'âme des champs" },
  // Hiver
  { nom: "Anémone", latin: "Anemone coronaria", saison: "hiver", note: "Cœur noir velours cerné de pétales de soie.", symbolique: "L'attente" },
  { nom: "Hellébore", latin: "Helleborus niger", saison: "hiver", note: "La rose de Noël — fleurit quand tout dort.", symbolique: "La sérénité" },
  { nom: "Amaryllis", latin: "Hippeastrum hybridum", saison: "hiver", note: "Trompettes immenses au sommet d'une hampe creuse.", symbolique: "La fierté" },
  { nom: "Ilex", latin: "Ilex verticillata", saison: "hiver", note: "Baies rouge laque sur bois nu — l'hiver en une branche.", symbolique: "La prévoyance" },
  { nom: "Saule tortueux", latin: "Salix matsudana", saison: "hiver", note: "Chaque branche est un dessin à l'encre.", symbolique: "La souplesse" },
  { nom: "Pin sylvestre", latin: "Pinus sylvestris", saison: "hiver", note: "Parfume une pièce entière — la forêt à domicile.", symbolique: "La constance" },
];
