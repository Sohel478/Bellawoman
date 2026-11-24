import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "BellaWoman | Activewear & Lifestyle",
    short_name: "BellaWoman",
    description:
      "High-performance women's activewear, sports bras, and trend-forward fashion with instant WhatsApp concierge ordering.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#06262B",
    theme_color: "#06262B",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["shopping", "lifestyle", "fitness"],
  };
}
