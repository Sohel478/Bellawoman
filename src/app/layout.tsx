import type { Metadata } from "next";
import "./globals.css";
import { getSiteSettings } from "@/lib/db";

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
    icons: {
      icon: "/favicon.png",
      apple: "/brand/Favicon-Orange-32x32.png",
    },
    openGraph: {
      title,
      description,
      url: "https://bellawoman.com",
      siteName: "BellaWoman",
      images: [
        {
          url: "/products/image-010.jpg",
          width: 1200,
          height: 630,
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
      images: ["/products/image-010.jpg"],
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
