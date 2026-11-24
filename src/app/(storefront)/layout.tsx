import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/layout/WhatsAppFloatingButton";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { PwaProvider } from "@/components/pwa/PwaProvider";
import { getSiteSettings, getPublishedCategories } from "@/lib/db";

export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, categories] = await Promise.all([
    getSiteSettings(),
    getPublishedCategories(),
  ]);

  const announcementEnabled = settings.announcementEnabled === "true";
  const whatsappPhone = settings.whatsappPhone || "+917249498924";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bellawoman.com";

  // Google Knowledge Graph: Organization & WebSite Structured Data
  const brandLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: settings.brandName || "BellaWoman",
        url: baseUrl,
        logo: `${baseUrl}/brand/Bellawomen-Logo-Dark-BG.svg`,
        sameAs: [
          settings.instagramUrl || "https://www.instagram.com/official_bellawoman",
        ].filter(Boolean),
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: settings.contactPhone || "+91 7249498924",
            contactType: "customer service",
            areaServed: "IN",
            availableLanguage: ["en", "hi"],
          },
        ],
      },
      {
        "@type": "WebSite",
        name: settings.brandName || "BellaWoman",
        url: baseUrl,
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/api/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Brand Knowledge Graph JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandLd) }}
      />
      <PwaProvider />
      <AnnouncementBar
        text={settings.announcementText}
        enabled={announcementEnabled}
      />
      <Navbar categories={categories} whatsappPhone={whatsappPhone} />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer
        whatsappPhone={whatsappPhone}
        contactEmail={settings.contactEmail}
        instagramUrl={settings.instagramUrl}
        footerAbout={settings.footerAbout}
      />
      <WhatsAppFloatingButton whatsappPhone={whatsappPhone} />
      <MobileBottomNav whatsappPhone={whatsappPhone} />
    </div>
  );
}
