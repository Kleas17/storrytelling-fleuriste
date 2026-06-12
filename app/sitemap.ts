import type { MetadataRoute } from "next";
import { settings } from "@/lib/data/settings";
import { creations, categories } from "@/lib/data/creations";
import { saisons } from "@/lib/data/saisons";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = settings.url;
  const now = new Date();

  const statiques = ["", "/savoir-faire", "/creations", "/saisons", "/contact"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const cats = categories.map((c) => ({
    url: `${base}/creations/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projets = creations.map((c) => ({
    url: `${base}/creations/${c.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const pagesSaisons = saisons.map((s) => ({
    url: `${base}/saisons/${s.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...statiques, ...cats, ...projets, ...pagesSaisons];
}
