import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { BannerItem } from "@/types";

interface HeroBannerProps {
  banner?: BannerItem | null;
}

export function HeroBanner({ banner }: HeroBannerProps) {
  const title = banner?.title || "SCULPTED FOR MOVEMENT";
  const subtitle =
    banner?.subtitle ||
    "Discover high-performance sports bras and seamless active essentials tailored for effortless confidence.";
  const ctaLabel = banner?.ctaLabel || "Shop the Collection";
  const ctaTarget = banner?.ctaTarget || "/category/activewear";
  const desktopImage = banner?.desktopImage || "/hero/hero-br1083.jpg";
  const mobileImage = banner?.mobileImage || desktopImage;

  return (
    <section className="relative w-full bg-[#06262B] text-white overflow-hidden">
      {/* Subtle atmospheric glow behind elements */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#FF312C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-10 w-80 h-80 bg-[#0B3B42]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Statement & Actions (7 Columns on Desktop) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-2 lg:order-1">
            {/* Drop Indicator */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FF312C]" />
              <span className="text-xs font-semibold tracking-widest uppercase text-white/90">
                BellaWoman Active Drop 01
              </span>
            </div>

            {/* Typography */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.06] text-white">
                {title}
              </h1>
              <p className="text-sm sm:text-lg text-white/80 max-w-xl font-light leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={ctaTarget}
                className="inline-flex items-center gap-3 bg-[#FF312C] hover:bg-[#E02621] text-white font-bold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-full shadow-lg hover:shadow-xl hover:gap-4 transition-all duration-300 group"
              >
                <span>{ctaLabel}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-sm sm:text-base px-7 py-3.5 sm:py-4 rounded-full border border-white/20 transition-all"
              >
                <span>Explore Drops</span>
              </Link>
            </div>

            {/* Value Pillars */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF312C]" />
                  <span>4-Way Stretch</span>
                </div>
                <p className="text-[11px] text-white/60">Second-skin micro knit</p>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF312C]" />
                  <span>Zero Slip</span>
                </div>
                <p className="text-[11px] text-white/60">Contour band stability</p>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF312C]" />
                  <span>19 Styles</span>
                </div>
                <p className="text-[11px] text-white/60">Authentic drop in stock</p>
              </div>
            </div>
          </div>

          {/* Right Column: Razor-Sharp High-Definition Showcase (5 Columns on Desktop) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-[3/4] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#0B3B42]/40 group">
              {/* Desktop Sharp Image */}
              <div className="hidden sm:block absolute inset-0">
                <Image
                  src={desktopImage}
                  alt={banner?.altText || title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-102"
                />
              </div>

              {/* Mobile Sharp Image */}
              <div className="block sm:hidden absolute inset-0">
                <Image
                  src={mobileImage}
                  alt={banner?.altText || title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-top"
                />
              </div>

              {/* Subtle Bottom Scrim for Floating Pill (Does NOT obscure the model) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#06262B]/80 via-transparent to-transparent opacity-70 pointer-events-none" />

              {/* Floating Pill on Card */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-black/40 backdrop-blur-md rounded-2xl border border-white/15 flex items-center justify-between z-10">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF312C] font-semibold">
                    Signature Fit
                  </span>
                  <p className="text-xs font-bold text-white mt-0.5">Dual-Tone Sculpt Active Set</p>
                </div>
                <Link
                  href={ctaTarget}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-[#FF312C] text-white flex items-center justify-center transition-colors flex-shrink-0"
                  aria-label="Shop featured drop"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
