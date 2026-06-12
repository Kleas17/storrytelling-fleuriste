import type { Metadata } from "next";
import CategoriePage from "@/components/sections/CategoriePage";

export const metadata: Metadata = {
  title: "Fleuriste mariage à Lyon — Créations sur-mesure",
  description:
    "Arches de cérémonie, bouquets de mariée, décors de table : Maison Verdier compose des mariages floraux uniques, en fleurs de saison.",
};

export default function MariagesPage() {
  return <CategoriePage categorie="mariage" />;
}
