import Hero from "@/components/sections/Hero";
import Manifeste from "@/components/sections/Manifeste";
import EclosionSection from "@/components/sections/EclosionSection";
import MarqueeBand from "@/components/sections/MarqueeBand";
import HomeDepth from "@/components/sections/HomeDepth";
import SavoirFaireSection from "@/components/sections/SavoirFaireSection";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import SaisonsSection from "@/components/sections/SaisonsSection";
import Temoignages from "@/components/sections/Temoignages";
import CtaFinal from "@/components/sections/CtaFinal";
import TigeDivider from "@/components/ui/TigeDivider";

export default function HomePage() {
  return (
    <>
      <HomeDepth />
      <Hero />
      <Manifeste />
      <EclosionSection />
      <TigeDivider />
      <SavoirFaireSection />
      <PortfolioPreview />
      <MarqueeBand />
      <SaisonsSection />
      <Temoignages />
      <CtaFinal />
    </>
  );
}
