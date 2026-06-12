import Hero from "@/components/sections/Hero";
import Manifeste from "@/components/sections/Manifeste";
import SavoirFaireSection from "@/components/sections/SavoirFaireSection";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import SaisonsSection from "@/components/sections/SaisonsSection";
import Temoignages from "@/components/sections/Temoignages";
import CtaFinal from "@/components/sections/CtaFinal";
import TigeDivider from "@/components/ui/TigeDivider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifeste />
      <TigeDivider />
      <SavoirFaireSection />
      <PortfolioPreview />
      <SaisonsSection />
      <Temoignages />
      <CtaFinal />
    </>
  );
}
