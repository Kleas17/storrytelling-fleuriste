/**
 * Schéma Sanity — Création (projet portfolio).
 * Prêt à brancher dans un Sanity Studio v3 (CDC §10.2).
 * Le frontend consomme actuellement lib/data/creations.ts ; pour basculer sur
 * Sanity, créer le projet (sanity init), déployer ces schémas et remplacer les
 * imports de données par des requêtes GROQ (voir README, section CMS).
 */
export const creation = {
  name: "creation",
  title: "Création",
  type: "document",
  fields: [
    { name: "titre", title: "Titre", type: "string", validation: (r: { required: () => unknown }) => r.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "titre" } },
    {
      name: "categorie",
      title: "Catégorie",
      type: "string",
      options: { list: ["mariage", "evenement", "bouquet", "deuil"] },
    },
    {
      name: "saison",
      title: "Saison",
      type: "string",
      options: { list: ["printemps", "ete", "automne", "hiver"] },
    },
    { name: "accroche", title: "Accroche", type: "string" },
    { name: "imageHero", title: "Image principale", type: "image", options: { hotspot: true } },
    { name: "galerie", title: "Galerie", type: "array", of: [{ type: "image", options: { hotspot: true } }] },
    { name: "description", title: "Description", type: "array", of: [{ type: "block" }] },
    { name: "fleurs", title: "Fleurs & matières", type: "array", of: [{ type: "string" }] },
    { name: "lieu", title: "Lieu", type: "string" },
    {
      name: "temoignage",
      title: "Témoignage client",
      type: "object",
      fields: [
        { name: "texte", title: "Texte", type: "text" },
        { name: "auteur", title: "Auteur", type: "string" },
      ],
    },
    { name: "dateCreation", title: "Date", type: "date" },
    { name: "ordre", title: "Ordre d'affichage", type: "number" },
    { name: "featured", title: "Mise en avant (accueil)", type: "boolean" },
  ],
};
