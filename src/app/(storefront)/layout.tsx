import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/layout/WhatsAppFloatingButton";
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
  const whatsappPhone = settings.whatsappPhone || "+919876543210";

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <AnnouncementBar
        text={settings.announcementText}
        enabled={announcementEnabled}
      />
      <Navbar categories={categories} whatsappPhone={whatsappPhone} />
      <main className="flex-1">{children}</main>
      <Footer
        whatsappPhone={whatsappPhone}
        contactEmail={settings.contactEmail}
        instagramUrl={settings.instagramUrl}
        footerAbout={settings.footerAbout}
      />
      <WhatsAppFloatingButton whatsappPhone={whatsappPhone} />
    </div>
  );
}
