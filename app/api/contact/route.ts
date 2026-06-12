import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { settings } from "@/lib/data/settings";

// Rate limiting simple en mémoire : 5 requêtes / 10 min par IP.
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Trop de requêtes." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides.", details: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  // Honeypot rempli → on répond OK sans rien faire (le bot ne le saura pas).
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const d = parsed.data;
  const lignes = [
    `Nouvelle demande — ${d.typeDemande.toUpperCase()}`,
    ``,
    `Nom : ${d.nom}`,
    `Email : ${d.email}`,
    d.telephone && `Téléphone : ${d.telephone}`,
    d.dateEvenement && `Date : ${d.dateEvenement}`,
    d.budget && `Budget : ${d.budget}`,
    d.lieu && `Lieu : ${d.lieu}`,
    d.entreprise && `Entreprise : ${d.entreprise}`,
    d.quantite && `Volume : ${d.quantite}`,
    d.typeFleurs && `Fleurs : ${d.typeFleurs}`,
    d.occasion && `Occasion : ${d.occasion}`,
    d.livraison && `Livraison : ${d.livraison}`,
    d.source && `Source : ${d.source}`,
    ``,
    `Message :`,
    d.message,
  ]
    .filter(Boolean)
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: process.env.CONTACT_FROM ?? "Site Maison Verdier <onboarding@resend.dev>",
        to: process.env.CONTACT_TO ?? settings.email,
        replyTo: d.email,
        subject: `[Site] Demande ${d.typeDemande} — ${d.nom}`,
        text: lignes,
      });
    } catch (err) {
      console.error("Erreur d'envoi Resend:", err);
      return NextResponse.json({ error: "Échec de l'envoi." }, { status: 502 });
    }
  } else {
    // Pas de clé configurée (dev / staging) : on journalise la demande.
    console.log("[contact] Demande reçue (RESEND_API_KEY absent) :\n" + lignes);
  }

  return NextResponse.json({ ok: true });
}
