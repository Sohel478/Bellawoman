import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Heart, Zap, Award } from "lucide-react";
import { Metadata } from "next";
import { getSiteSettings } from "@/lib/db";
import { InstagramVideoSection } from "@/components/instagram/InstagramVideoSection";

export const metadata: Metadata = {
  title: "Our Story & Vision",
  description: "Learn about BellaWoman — where high-performance engineering meets contemporary Gen Z fashion and activewear.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const instagramUrl = settings.instagramUrl || "https://www.instagram.com/official_bellawoman?knvt=MTlud2ZpYmxhMTV0ZQ%3D%3D&utm_source=qr";
  const whatsappPhone = settings.whatsappPhone || "+919876543210";

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Intro */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF312C]">
          The BellaWoman Manifesto
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#06262B] tracking-tight uppercase">
          Empowerment in Every Stitch.
        </h1>
        <p className="text-base sm:text-lg text-[#71717A] font-light leading-relaxed">
          BellaWoman was born out of a simple observation: women shouldn&apos;t have to choose between athletic resilience, trend-forward aesthetics, and accessible pricing.
        </p>
      </div>

      {/* Editorial Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-[#EAE6DF] bg-[#FAF9F5]">
          <Image
            src="/hero/hero-f3bca67d.jpg"
            alt="BellaWoman activewear model"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#06262B] uppercase">
            Designed for Movement, Styled for Daily Life
          </h2>
          <p className="text-sm sm:text-base text-[#71717A] font-light leading-relaxed">
            Our activewear lineup is engineered using premium 4-way stretch micro-nylon blends that sculpt without suffocating. We field-test our silhouettes across high-intensity training, yoga, and everyday streetwear layering.
          </p>
          <p className="text-sm sm:text-base text-[#71717A] font-light leading-relaxed">
            Whether you discover us on Meesho, Amazon, or connect with our styling concierge over WhatsApp, we stand by transparent craftsmanship, inclusive sizing, and genuine customer care.
          </p>

          <div className="pt-2">
            <Link
              href="/category/activewear"
              className="inline-flex items-center gap-2 bg-[#06262B] hover:bg-[#FF312C] text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors group"
            >
              <span>Explore Activewear</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-[#EAE6DF]">
        <div className="p-6 bg-white rounded-2xl border border-[#EAE6DF] space-y-3">
          <Zap className="w-6 h-6 text-[#FF312C]" />
          <h3 className="text-base font-bold text-[#06262B]">Technical Fabrics</h3>
          <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">
            Moisture-wicking, breathable, anti-microbial fabrics that keep up with your sweatiest sessions.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#EAE6DF] space-y-3">
          <Sparkles className="w-6 h-6 text-[#FF312C]" />
          <h3 className="text-base font-bold text-[#06262B]">Gen Z Editorial Style</h3>
          <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">
            Bold cuts, playful palettes, and contoured stitching that look just as good outside the gym as inside.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#EAE6DF] space-y-3">
          <Heart className="w-6 h-6 text-[#FF312C]" />
          <h3 className="text-base font-bold text-[#06262B]">Friction-Free Commerce</h3>
          <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">
            Choose your preferred way to shop: trusted national marketplaces or personalized direct WhatsApp service.
          </p>
        </div>
      </div>

      {/* Instagram Videos & Reels Showcase */}
      <InstagramVideoSection
        instagramUrl={instagramUrl}
        whatsappPhone={whatsappPhone}
      />
    </div>
  );
}
