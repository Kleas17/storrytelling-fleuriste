import type { MetadataRoute } from "next";
import { settings } from "@/lib/data/settings";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${settings.nomFleuriste} — Artisan fleuriste`,
    short_name: settings.nomFleuriste,
    description: settings.metaDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#F5F0EB",
    theme_color: "#3D4A3E",
    lang: "fr",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
