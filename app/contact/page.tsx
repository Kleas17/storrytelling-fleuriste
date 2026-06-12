import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/sections/ContactForm";
import DotGrid from "@/components/sections/DotGrid";
import { settings } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Contact — Écrire à l'atelier",
  description:
    "Mariage, événement, commande : contactez Maison Verdier, artisan fleuriste à Lyon. Réponse sous 48 heures ouvrées.",
};

export default function ContactPage() {
  return (
    <div className="relative bg-ivoire pb-24 pt-36 md:pb-36 md:pt-44">
      <DotGrid />
      <div className="relative mx-auto max-w-site px-6 md:px-10">
        <SectionHeading
          label="Contact"
          titre="Dites-nous tout, nous ferons fleurir le reste."
          className="max-w-3xl"
        />

        <div className="mt-16 grid gap-16 lg:grid-cols-[2fr_3fr]">
          <aside className="space-y-10">
            <div>
              <p className="font-caps text-xs uppercase tracking-[0.2em] text-sienne">
                L&apos;atelier
              </p>
              <address className="mt-3 not-italic leading-relaxed text-encre/80">
                {settings.adresse}
              </address>
            </div>
            <div>
              <p className="font-caps text-xs uppercase tracking-[0.2em] text-sienne">
                Horaires
              </p>
              <ul className="mt-3 space-y-1 text-encre/80">
                {settings.horaires.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-caps text-xs uppercase tracking-[0.2em] text-sienne">
                Nous joindre
              </p>
              <ul className="mt-3 space-y-1 text-encre/80">
                <li>
                  <a className="link-underline" href={`tel:${settings.telephone}`}>
                    {settings.telephoneAffiche}
                  </a>
                </li>
                <li>
                  <a className="link-underline" href={`mailto:${settings.email}`}>
                    {settings.email}
                  </a>
                </li>
                <li>
                  <a
                    className="link-underline"
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div className="overflow-hidden border border-craie">
              <iframe
                title="Plan d'accès à l'atelier Maison Verdier"
                src={`https://www.google.com/maps?q=${settings.geo.lat},${settings.geo.lng}&z=16&output=embed`}
                className="h-64 w-full grayscale-[0.85] contrast-[0.92] sepia-[0.15]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>

          <div className="relative">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
