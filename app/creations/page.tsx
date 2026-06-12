import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import CreationsGallery from "@/components/sections/CreationsGallery";

export const metadata: Metadata = {
  title: "Créations — Portfolio d'art floral",
  description:
    "Mariages, événements, bouquets, deuil : découvrez les créations florales sur-mesure de Maison Verdier, artisan fleuriste à Lyon.",
};

export default function CreationsPage() {
  return (
    <div className="bg-ivoire pb-24 pt-36 md:pb-36 md:pt-44">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <SectionHeading
          label="Portfolio"
          titre="Chaque création est une page qu'on n'écrira qu'une fois."
          className="max-w-3xl"
        />
        <p className="mb-16 mt-6 max-w-xl text-lg leading-relaxed text-encre/70">
          Un florilège de nos travaux récents — mariages, scénographies
          d&apos;événements, bouquets de saison et hommages. Toutes les fleurs
          sont de saison, la plupart cultivées à moins de cinquante kilomètres
          de l&apos;atelier.
        </p>
        <CreationsGallery />
      </div>
    </div>
  );
}
