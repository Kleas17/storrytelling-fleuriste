"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/hooks/useGsap";
import FloralArt from "@/components/ui/FloralArt";
import TransitionLink from "@/components/ui/TransitionLink";
import type { Saison } from "@/lib/data/creations";

interface Option {
  label: string;
  saison: Saison;
}

const QUESTIONS: { question: string; options: Option[] }[] = [
  {
    question: "Quelle heure du jour vous ressemble ?",
    options: [
      { label: "L'aube, quand tout est encore possible", saison: "printemps" },
      { label: "Le plein midi, sans ombre et sans détour", saison: "ete" },
      { label: "La fin d'après-midi dorée", saison: "automne" },
      { label: "La nuit claire et silencieuse", saison: "hiver" },
    ],
  },
  {
    question: "Votre geste le plus naturel ?",
    options: [
      { label: "Offrir, sans attendre de retour", saison: "printemps" },
      { label: "Rassembler tout le monde autour d'une table", saison: "ete" },
      { label: "Transmettre ce qu'on m'a appris", saison: "automne" },
      { label: "Contempler, longtemps, sans rien dire", saison: "hiver" },
    ],
  },
  {
    question: "Une matière entre vos mains :",
    options: [
      { label: "Du lin lavé, encore frais", saison: "printemps" },
      { label: "De la terre cuite chauffée au soleil", saison: "ete" },
      { label: "Du velours aux reflets cuivrés", saison: "automne" },
      { label: "Un lainage gris, épais et doux", saison: "hiver" },
    ],
  },
  {
    question: "Votre rapport au désordre ?",
    options: [
      { label: "Je laisse pousser, on verra bien", saison: "printemps" },
      { label: "Le désordre, c'est la fête qui commence", saison: "ete" },
      { label: "J'aime quand il raconte une histoire", saison: "automne" },
      { label: "Je range. Le vide me repose.", saison: "hiver" },
    ],
  },
  {
    question: "Ce que vos proches disent de vous :",
    options: [
      { label: "Une douceur qui n'a l'air de rien", saison: "printemps" },
      { label: "Une énergie qui emporte tout", saison: "ete" },
      { label: "Une profondeur qui surprend", saison: "automne" },
      { label: "Un calme qui apaise la pièce", saison: "hiver" },
    ],
  },
];

const PORTRAITS: Record<
  Saison,
  { fleur: string; titre: string; description: string }
> = {
  printemps: {
    fleur: "Renoncule",
    titre: "Vous êtes Renoncule",
    description:
      "Des dizaines de couches délicates, et pourtant une tige bien droite. Vous avancez sans bruit, mais tout le monde remarque quand vous entrez — c'est le paradoxe des charmes discrets.",
  },
  ete: {
    fleur: "Dahlia",
    titre: "Vous êtes Dahlia",
    description:
      "Géométrie solaire, générosité sans calcul. Vous êtes la fleur qu'on place au centre — pas par orgueil, mais parce que tout s'organise naturellement autour de vous.",
  },
  automne: {
    fleur: "Rose Toffee",
    titre: "Vous êtes Rose Toffee",
    description:
      "Couleur thé au lait, impossible à décrire en un mot — il faut vous rencontrer. Vous avez la beauté des choses qui ont mûri lentement et qui n'ont plus rien à prouver.",
  },
  hiver: {
    fleur: "Anémone",
    titre: "Vous êtes Anémone",
    description:
      "Un cœur sombre et profond, des pétales de soie claire. Vous fleurissez quand les autres dorment, et c'est précisément pour cela qu'on ne vous oublie pas.",
  },
};

const EPITHETES: Record<Saison, string> = {
  printemps: "à l'aube tendre",
  ete: "au cœur solaire",
  automne: "aux reflets cuivrés",
  hiver: "au calme de neige",
};

function computeResult(reponses: number[]) {
  const compte: Record<Saison, number> = { printemps: 0, ete: 0, automne: 0, hiver: 0 };
  reponses.forEach((r, i) => {
    compte[QUESTIONS[i].options[r].saison] += 1;
  });
  const tri = (Object.entries(compte) as [Saison, number][]).sort((a, b) => b[1] - a[1]);
  return { dominante: tri[0][0], secondaire: tri[1][1] > 0 ? tri[1][0] : tri[0][0] };
}

export default function QuizFleur() {
  const [etape, setEtape] = useState(0);
  const [reponses, setReponses] = useState<number[]>([]);
  const [resultat, setResultat] = useState<number[] | null>(null);
  const [copie, setCopie] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Résultat partagé via URL ?r=01230
  useEffect(() => {
    const r = new URLSearchParams(window.location.search).get("r");
    if (r && /^[0-3]{5}$/.test(r)) {
      setResultat(r.split("").map(Number));
    }
  }, []);

  const animateSwap = (next: () => void) => {
    if (prefersReducedMotion() || !cardRef.current) {
      next();
      return;
    }
    gsap.to(cardRef.current, {
      opacity: 0,
      y: -16,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        next();
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
        );
      },
    });
  };

  const repondre = (index: number) => {
    const nouvelles = [...reponses, index];
    if (nouvelles.length === QUESTIONS.length) {
      animateSwap(() => {
        setResultat(nouvelles);
        const code = nouvelles.join("");
        window.history.replaceState(null, "", `?r=${code}`);
        window.dispatchEvent(new CustomEvent("petal-burst", { detail: { count: 100 } }));
      });
    } else {
      animateSwap(() => {
        setReponses(nouvelles);
        setEtape(nouvelles.length);
      });
    }
  };

  const recommencer = () => {
    window.history.replaceState(null, "", window.location.pathname);
    animateSwap(() => {
      setResultat(null);
      setReponses([]);
      setEtape(0);
      setCopie(false);
    });
  };

  const copierLien = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopie(true);
      setTimeout(() => setCopie(false), 2500);
    } catch {
      /* clipboard indisponible */
    }
  };

  if (resultat) {
    const { dominante, secondaire } = computeResult(resultat);
    const portrait = PORTRAITS[dominante];
    const epithete = secondaire !== dominante ? ` ${EPITHETES[secondaire]}` : "";

    return (
      <div ref={cardRef} className="grid items-center gap-12 md:grid-cols-2">
        <div className="mx-auto w-full max-w-sm overflow-hidden rounded-t-full border border-craie">
          <FloralArt seed={`quiz-${resultat.join("")}`} saison={dominante} className="h-auto w-full" />
        </div>
        <div>
          <p className="font-caps text-sm uppercase tracking-[0.25em] text-sienne">
            Votre fleur-portrait
          </p>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold text-mousse md:text-5xl">
            {portrait.titre}
            <span className="block font-light italic text-sienne">{epithete}</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-encre/80">
            {portrait.description}
          </p>
          <p className="mt-4 text-sm text-encre/50">
            Ce portrait floral est unique : il est généré à partir de vos cinq réponses.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={copierLien}
              data-cursor="Copier"
              className="border border-mousse px-7 py-3.5 font-caps text-xs uppercase tracking-[0.22em] text-mousse transition-colors duration-300 hover:bg-mousse hover:text-ivoire"
            >
              {copie ? "Lien copié ✓" : "Partager mon portrait"}
            </button>
            <TransitionLink
              href="/contact"
              data-cursor="Contact"
              className="border border-sienne bg-sienne/10 px-7 py-3.5 font-caps text-xs uppercase tracking-[0.22em] text-mousse transition-colors duration-300 hover:bg-sienne hover:text-ivoire"
            >
              Recevoir ce bouquet
            </TransitionLink>
            <button
              type="button"
              onClick={recommencer}
              className="link-underline self-center font-caps text-xs uppercase tracking-[0.22em] text-encre/50"
            >
              Recommencer
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[etape];

  return (
    <div ref={cardRef} className="mx-auto max-w-2xl">
      <div className="mb-10 flex items-center gap-4" aria-hidden="true">
        {QUESTIONS.map((_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
              i < etape ? "bg-sienne" : i === etape ? "bg-mousse" : "bg-craie"
            }`}
          />
        ))}
      </div>
      <p className="font-caps text-xs uppercase tracking-[0.25em] text-encre/50">
        Question {etape + 1} / {QUESTIONS.length}
      </p>
      <h2 className="mt-4 text-balance font-display text-3xl font-semibold text-mousse md:text-4xl">
        {q.question}
      </h2>
      <div className="mt-10 grid gap-4">
        {q.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => repondre(i)}
            data-cursor="Choisir"
            className="group border border-craie bg-white/40 px-7 py-5 text-left transition-all duration-300 hover:border-sienne hover:bg-sienne/5"
          >
            <span className="font-display text-lg text-encre/80 transition-colors duration-300 group-hover:text-mousse md:text-xl">
              {opt.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
