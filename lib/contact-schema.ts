import { z } from "zod";

export const typesDemande = ["mariage", "evenement", "commande", "autre"] as const;
export type TypeDemande = (typeof typesDemande)[number];

export const contactSchema = z.object({
  nom: z.string().min(2, "Merci d'indiquer votre nom."),
  email: z.string().email("Cette adresse e-mail semble invalide."),
  telephone: z.string().optional(),
  typeDemande: z.enum(typesDemande, { message: "Choisissez un type de demande." }),
  // Champs conditionnels — Mariage
  dateEvenement: z.string().optional(),
  budget: z.string().optional(),
  lieu: z.string().optional(),
  // Champs conditionnels — Événement pro
  entreprise: z.string().optional(),
  quantite: z.string().optional(),
  // Champs conditionnels — Commande
  typeFleurs: z.string().optional(),
  occasion: z.string().optional(),
  livraison: z.string().optional(),
  message: z.string().min(10, "Quelques mots de plus nous aideraient à vous répondre."),
  source: z.string().optional(),
  // Honeypot anti-spam : doit rester vide.
  website: z.string().max(0, "").optional(),
});

export type ContactData = z.infer<typeof contactSchema>;
