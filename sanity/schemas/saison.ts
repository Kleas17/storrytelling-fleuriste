/** Schéma Sanity — Saison (contenu éditorial). Voir creation.ts pour le mode d'emploi. */
export const saison = {
  name: "saison",
  title: "Saison",
  type: "document",
  fields: [
    {
      name: "identifiant",
      title: "Saison",
      type: "string",
      options: { list: ["printemps", "ete", "automne", "hiver"] },
    },
    { name: "sousTitre", title: "Sous-titre", type: "string" },
    { name: "manifeste", title: "Manifeste (une phrase)", type: "text" },
    { name: "texte", title: "Texte éditorial", type: "array", of: [{ type: "block" }] },
    { name: "fleurs", title: "Fleurs emblématiques", type: "array", of: [{ type: "string" }] },
    { name: "compositions", title: "Compositions suggérées", type: "array", of: [{ type: "string" }] },
    { name: "image", title: "Image inspirationnelle", type: "image", options: { hotspot: true } },
  ],
};
