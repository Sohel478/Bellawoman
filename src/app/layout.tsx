import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getSiteSettings } from "@/lib/db";

export const viewport: Viewport = {
  themeColor: "#06262B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.seoTitle || "BellaWoman | Trend-Forward Women's Activewear & Fashion";
  const description =
    settings.seoDescription ||
    "Discover BellaWoman's latest collection of high-performance activewear, sports bras, and trendsetting apparel. Shop via Meesho, Amazon, or order directly on WhatsApp.";

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bellawoman.com";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: "%s | BellaWoman",
    },
    description,
    manifest: "/manifest.webmanifest",
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: "BellaWoman",
    },
    alternates: {
      canonical: baseUrl,
    },
    icons: {
      icon: [
        { url: "/favicon.png" },
        { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [
        { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    openGraph: {
      title,
      description,
      url: "https://bellawoman.com",
      siteName: "BellaWoman",
      images: [
        {
          url: "/hero/hero-br1083.jpg",
          width: 1080,
          height: 1440,
          alt: "BellaWoman Activewear",
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/hero/hero-br1083.jpg"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans selection:bg-[#FF312C] selection:text-white">
        {children}
      </body>
    </html>
  );
}
