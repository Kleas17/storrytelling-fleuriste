"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/hooks/useGsap";
import { contactSchema, type ContactData, type TypeDemande } from "@/lib/contact-schema";

const LABEL_CLASS = "block font-caps text-xs uppercase tracking-[0.2em] text-encre/70";
const INPUT_CLASS =
  "mt-2 w-full border-b border-encre/20 bg-transparent py-3 text-encre placeholder:text-encre/30 focus:border-sienne focus:outline-none transition-colors";
const ERROR_CLASS = "mt-1.5 text-sm text-[#a04425]";

/** Formulaire intelligent : les champs s'adaptent au type de demande (CDC §6.6). */
export default function ContactForm() {
  const [envoye, setEnvoye] = useState(false);
  const [erreurServeur, setErreurServeur] = useState<string | null>(null);
  const confirmRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { typeDemande: undefined },
  });

  const typeDemande = watch("typeDemande") as TypeDemande | undefined;

  const onSubmit = async (data: ContactData) => {
    setErreurServeur(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("server");
      setEnvoye(true);
      // Pluie de pétales plein écran (moteur global PetalEffects).
      window.dispatchEvent(new CustomEvent("petal-burst", { detail: { count: 160 } }));
      requestAnimationFrame(() => {
        if (!confirmRef.current || prefersReducedMotion()) return;
        gsap.from(confirmRef.current, { opacity: 0, y: 24, duration: 0.8, ease: "power3.out" });
        // Animation pétale qui tombe
        gsap.fromTo(
          ".confirm-petale",
          { y: -60, x: 0, rotate: 0, opacity: 0 },
          {
            y: 40,
            x: 24,
            rotate: 140,
            opacity: 1,
            duration: 2.2,
            ease: "sine.inOut",
          }
        );
      });
    } catch {
      setErreurServeur(
        "L'envoi a échoué. Réessayez dans un instant, ou écrivez-nous directement par e-mail."
      );
    }
  };

  if (envoye) {
    return (
      <div ref={confirmRef} className="relative flex min-h-[400px] flex-col items-center justify-center text-center">
        <svg
          className="confirm-petale absolute left-1/2 top-10 h-8 w-8"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <ellipse cx="16" cy="16" rx="7" ry="13" fill="#B8814A" opacity="0.7" transform="rotate(20 16 16)" />
        </svg>
        <p className="font-display text-3xl font-semibold text-mousse md:text-4xl">
          Votre message est entre nos mains.
        </p>
        <p className="mt-4 max-w-md font-display text-lg italic text-encre/70">
          L&apos;atelier vous répond sous 48 heures ouvrées. Merci pour votre
          confiance.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      {/* Honeypot anti-spam — invisible pour les humains */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className={LABEL_CLASS}>
            Prénom &amp; nom *
          </label>
          <input id="nom" type="text" placeholder="Camille Dupont" className={INPUT_CLASS} {...register("nom")} />
          {errors.nom && <p role="alert" className={ERROR_CLASS}>{errors.nom.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className={LABEL_CLASS}>
            E-mail *
          </label>
          <input id="email" type="email" placeholder="camille@email.fr" className={INPUT_CLASS} {...register("email")} />
          {errors.email && <p role="alert" className={ERROR_CLASS}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="telephone" className={LABEL_CLASS}>
            Téléphone
          </label>
          <input id="telephone" type="tel" placeholder="06 12 34 56 78" className={INPUT_CLASS} {...register("telephone")} />
        </div>
        <div>
          <label htmlFor="typeDemande" className={LABEL_CLASS}>
            Type de demande *
          </label>
          <select id="typeDemande" className={INPUT_CLASS} defaultValue="" {...register("typeDemande")}>
            <option value="" disabled>
              Choisir…
            </option>
            <option value="mariage">Mariage</option>
            <option value="evenement">Événement professionnel</option>
            <option value="commande">Commande</option>
            <option value="autre">Autre</option>
          </select>
          {errors.typeDemande && <p role="alert" className={ERROR_CLASS}>{errors.typeDemande.message}</p>}
        </div>
      </div>

      {typeDemande === "mariage" && (
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <label htmlFor="dateEvenement" className={LABEL_CLASS}>
              Date du mariage
            </label>
            <input id="dateEvenement" type="date" className={INPUT_CLASS} {...register("dateEvenement")} />
          </div>
          <div>
            <label htmlFor="budget" className={LABEL_CLASS}>
              Budget indicatif
            </label>
            <select id="budget" className={INPUT_CLASS} defaultValue="" {...register("budget")}>
              <option value="" disabled>
                Choisir…
              </option>
              <option value="< 2 000 €">Moins de 2 000 €</option>
              <option value="2 000 – 5 000 €">2 000 – 5 000 €</option>
              <option value="5 000 – 10 000 €">5 000 – 10 000 €</option>
              <option value="> 10 000 €">Plus de 10 000 €</option>
            </select>
          </div>
          <div>
            <label htmlFor="lieu" className={LABEL_CLASS}>
              Lieu de réception
            </label>
            <input id="lieu" type="text" placeholder="Château, domaine…" className={INPUT_CLASS} {...register("lieu")} />
          </div>
        </div>
      )}

      {typeDemande === "evenement" && (
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <label htmlFor="entreprise" className={LABEL_CLASS}>
              Entreprise
            </label>
            <input id="entreprise" type="text" placeholder="Nom de la société" className={INPUT_CLASS} {...register("entreprise")} />
          </div>
          <div>
            <label htmlFor="quantite" className={LABEL_CLASS}>
              Volume estimé
            </label>
            <input id="quantite" type="text" placeholder="Ex. 40 centres de table" className={INPUT_CLASS} {...register("quantite")} />
          </div>
          <div>
            <label htmlFor="dateEvenement" className={LABEL_CLASS}>
              Date de l&apos;événement
            </label>
            <input id="dateEvenement" type="date" className={INPUT_CLASS} {...register("dateEvenement")} />
          </div>
        </div>
      )}

      {typeDemande === "commande" && (
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <label htmlFor="typeFleurs" className={LABEL_CLASS}>
              Type de fleurs
            </label>
            <input id="typeFleurs" type="text" placeholder="Au goût de l'atelier…" className={INPUT_CLASS} {...register("typeFleurs")} />
          </div>
          <div>
            <label htmlFor="occasion" className={LABEL_CLASS}>
              Occasion
            </label>
            <input id="occasion" type="text" placeholder="Anniversaire, merci…" className={INPUT_CLASS} {...register("occasion")} />
          </div>
          <div>
            <label htmlFor="livraison" className={LABEL_CLASS}>
              Livraison souhaitée
            </label>
            <input id="livraison" type="text" placeholder="Date et quartier" className={INPUT_CLASS} {...register("livraison")} />
          </div>
        </div>
      )}

      <div>
        <label htmlFor="message" className={LABEL_CLASS}>
          Votre message *
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Racontez-nous votre projet, vos envies, vos couleurs…"
          className={INPUT_CLASS}
          {...register("message")}
        />
        {errors.message && <p role="alert" className={ERROR_CLASS}>{errors.message.message}</p>}
      </div>

      <div>
        <label htmlFor="source" className={LABEL_CLASS}>
          Comment nous avez-vous trouvés ?
        </label>
        <select id="source" className={INPUT_CLASS} defaultValue="" {...register("source")}>
          <option value="">Optionnel</option>
          <option value="instagram">Instagram</option>
          <option value="google">Recherche Google</option>
          <option value="bouche-a-oreille">Bouche-à-oreille</option>
          <option value="presse">Presse / article</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <p className="text-xs leading-relaxed text-encre/50">
        Les informations recueillies servent uniquement à traiter votre demande.
        Elles sont transmises par e-mail à l&apos;atelier et ne sont conservées
        dans aucune base de données. Conformément au RGPD, vous disposez
        d&apos;un droit d&apos;accès, de rectification et de suppression à
        l&apos;adresse atelier@maisonverdier.fr.
      </p>

      {erreurServeur && (
        <p role="alert" className="border border-[#a04425]/30 bg-[#a04425]/5 p-4 text-sm text-[#a04425]">
          {erreurServeur}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        data-cursor="Envoyer"
        className="border border-mousse bg-mousse px-12 py-5 font-caps text-sm uppercase tracking-[0.25em] text-ivoire transition-colors duration-300 hover:bg-transparent hover:text-mousse disabled:opacity-50"
      >
        {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>
    </form>
  );
}
