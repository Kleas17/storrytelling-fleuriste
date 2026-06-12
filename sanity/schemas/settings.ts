/** Schéma Sanity — Paramètres globaux du site. Voir creation.ts pour le mode d'emploi. */
export const settings = {
  name: "settings",
  title: "Paramètres du site",
  type: "document",
  fields: [
    { name: "nomFleuriste", title: "Nom de l'enseigne", type: "string" },
    { name: "tagline", title: "Tagline", type: "string" },
    { name: "logo", title: "Logo", type: "image" },
    { name: "adresse", title: "Adresse", type: "text" },
    { name: "telephone", title: "Téléphone", type: "string" },
    { name: "email", title: "E-mail", type: "string" },
    { name: "horaires", title: "Horaires", type: "array", of: [{ type: "string" }] },
    { name: "instagram", title: "Instagram", type: "url" },
    { name: "pinterest", title: "Pinterest", type: "url" },
    { name: "metaDescription", title: "Méta-description", type: "text" },
    { name: "ogImage", title: "Image Open Graph", type: "image" },
  ],
};
