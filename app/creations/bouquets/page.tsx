import type { Metadata } from "next";
import CategoriePage from "@/components/sections/CategoriePage";

export const metadata: Metadata = {
  title: "Bouquets de fleurs de saison à Lyon",
  description:
    "Bouquets composés main en fleurs de saison et circuit court, par Maison Verdier, artisan fleuriste à Lyon.",
};

export default function BouquetsPage() {
  return <CategoriePage categorie="bouquet" />;
}
