import type { Metadata } from "next";
import { settings } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Mentions légales & politique de confidentialité",
  description:
    "Mentions légales, politique de confidentialité et gestion des données personnelles du site Maison Verdier.",
  robots: { index: false },
};

const H2 = "mt-14 font-display text-2xl font-semibold text-mousse md:text-3xl";
const P = "mt-4 leading-relaxed text-encre/80";

export default function MentionsLegalesPage() {
  return (
    <div className="bg-ivoire pb-24 pt-36 md:pb-36 md:pt-44">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <h1 className="font-display text-4xl font-semibold text-mousse md:text-5xl">
          Mentions légales
        </h1>

        <h2 className={H2}>Éditeur du site</h2>
        <p className={P}>
          {settings.nomFleuriste} — entreprise artisanale
          <br />
          {settings.adresse}
          <br />
          Téléphone : {settings.telephoneAffiche} · E-mail : {settings.email}
          <br />
          Directrice de la publication : Anne Verdier
        </p>

        <h2 className={H2}>Hébergement</h2>
        <p className={P}>
          Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina,
          CA 91723, États-Unis — vercel.com. Les contenus sont distribués via un
          réseau de diffusion mondial (CDN).
        </p>

        <h2 className={H2}>Propriété intellectuelle</h2>
        <p className={P}>
          L&apos;ensemble des contenus du site (textes, visuels, identité
          graphique, code) est protégé par le droit d&apos;auteur. Toute
          reproduction, même partielle, est soumise à l&apos;autorisation
          préalable écrite de {settings.nomFleuriste}.
        </p>

        <h2 className={H2}>Politique de confidentialité</h2>
        <p className={P}>
          Les données saisies dans le formulaire de contact (identité,
          coordonnées, contenu du message) sont utilisées exclusivement pour
          répondre à votre demande. Elles sont transmises par e-mail à
          l&apos;atelier et ne sont enregistrées dans aucune base de données.
          Elles sont conservées au maximum 12 mois après le dernier échange,
          puis supprimées.
        </p>
        <p className={P}>
          Conformément au Règlement général sur la protection des données
          (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification,
          d&apos;opposition et de suppression de vos données. Pour l&apos;exercer,
          écrivez à {settings.email}.
        </p>

        <h2 className={H2}>Cookies & mesure d&apos;audience</h2>
        <p className={P}>
          Ce site n&apos;utilise aucun cookie publicitaire ni traceur
          inter-sites. La mesure d&apos;audience éventuelle repose sur une
          solution respectueuse de la vie privée (sans identifiant individuel),
          exemptée de bandeau de consentement selon les recommandations de la
          CNIL.
        </p>

        <h2 className={H2}>Crédits</h2>
        <p className={P}>
          Conception, direction artistique et développement : Axora Studio.
          Typographies : Cormorant Garamond &amp; DM Sans (Google Fonts,
          auto-hébergées).
        </p>
      </div>
    </div>
  );
}
