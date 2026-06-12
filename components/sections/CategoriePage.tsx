import SectionHeading from "@/components/ui/SectionHeading";
import CreationsGallery from "@/components/sections/CreationsGallery";
import TransitionLink from "@/components/ui/TransitionLink";
import { categories, type Categorie } from "@/lib/data/creations";

/** Gabarit commun des pages catégorie (/creations/mariages, /evenements…). */
export default function CategoriePage({ categorie }: { categorie: Categorie }) {
  const cat = categories.find((c) => c.id === categorie)!;

  return (
    <div className="bg-ivoire pb-24 pt-36 md:pb-36 md:pt-44">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <nav aria-label="Fil d'Ariane" className="mb-8 font-caps text-xs uppercase tracking-[0.2em] text-encre/50">
          <TransitionLink href="/creations" className="link-underline">
            Créations
          </TransitionLink>
          <span className="mx-2" aria-hidden="true">/</span>
          <span aria-current="page" className="text-sienne">{cat.label}</span>
        </nav>
        <SectionHeading label={cat.label} titre={cat.intro.split(".")[0] + "."} className="max-w-3xl" />
        <p className="mb-16 mt-6 max-w-xl text-lg leading-relaxed text-encre/70">
          {cat.intro.split(".").slice(1).join(".").trim()}
        </p>
        <CreationsGallery categorieFixe={categorie} />
      </div>
    </div>
  );
}
