import type { Metadata } from "next";
import CategoriePage from "@/components/sections/CategoriePage";

export const metadata: Metadata = {
  title: "Fleuriste événementiel — Galas, inaugurations, séminaires",
  description:
    "Scénographies florales monumentales pour événements d'entreprise et galas : Maison Verdier met le végétal en scène à grande échelle.",
};

export default function EvenementsPage() {
  return <CategoriePage categorie="evenement" />;
}
