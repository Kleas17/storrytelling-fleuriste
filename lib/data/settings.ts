export const settings = {
  nomFleuriste: "Maison Verdier",
  tagline: "Artisan fleuriste — créations florales d'exception",
  baseline: "Ce que les fleurs ont à dire.",
  adresse: "12 rue des Tanneurs, 69005 Lyon",
  telephone: "+33 4 78 00 00 00",
  telephoneAffiche: "04 78 00 00 00",
  email: "atelier@maisonverdier.fr",
  horaires: [
    "Mardi – Vendredi : 9h30 – 19h00",
    "Samedi : 9h00 – 19h30",
    "Dimanche : 9h00 – 13h00",
    "Fermé le lundi",
  ],
  instagram: "https://www.instagram.com/maisonverdier",
  pinterest: "https://www.pinterest.fr/maisonverdier",
  metaDescription:
    "Maison Verdier, artisan fleuriste à Lyon. Créations florales sur-mesure, art floral événementiel, mariages et bouquets de saison en circuit court.",
  url: "https://www.maisonverdier.fr",
  geo: { lat: 45.7589, lng: 4.8265 },
  chiffresCles: [
    { valeur: 18, suffixe: "ans", label: "d'art floral" },
    { valeur: 1200, suffixe: "+", label: "créations par an" },
    { valeur: 140, suffixe: "", label: "espèces travaillées" },
  ],
};

export type Settings = typeof settings;
