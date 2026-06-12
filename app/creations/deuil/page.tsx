import type { Metadata } from "next";
import CategoriePage from "@/components/sections/CategoriePage";

export const metadata: Metadata = {
  title: "Fleurs de deuil — Hommages floraux sobres et dignes",
  description:
    "Compositions de deuil réalisées avec retenue et justesse par Maison Verdier : couronnes, coussins, gerbes et couvertures florales.",
};

export default function DeuilPage() {
  return <CategoriePage categorie="deuil" />;
}
