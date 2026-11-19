import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
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
  const desktopImage = banner?.desktopImage || "/products/image-010.jpg";
  const mobileImage = banner?.mobileImage || desktopImage;

  return (
    <section className="relative w-full overflow-hidden bg-[#06262B] text-white">
      {/* Background Media with Gradient Overlay */}
      <div className="relative h-[540px] sm:h-[620px] lg:h-[700px] w-full">
        {/* Desktop Image */}
        <div className="hidden sm:block absolute inset-0">
          <Image
            src={desktopImage}
            alt={banner?.altText || title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Mobile Image */}
        <div className="block sm:hidden absolute inset-0">
          <Image
            src={mobileImage}
            alt={banner?.altText || title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Sophisticated Editorial Vignette & Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06262B] via-[#06262B]/40 to-transparent opacity-90 sm:opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06262B]/80 via-[#06262B]/30 to-transparent" />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-24 lg:pb-28">
          <div className="max-w-2xl space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-[#FF312C]" />
              <span className="text-xs font-semibold tracking-widest uppercase text-white/90">
                BellaWoman Active Drop 01
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white uppercase drop-shadow-xs">
              {title}
            </h1>

            <p className="text-sm sm:text-lg text-white/85 max-w-xl font-light leading-relaxed drop-shadow-xs">
              {subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={ctaTarget}
                className="inline-flex items-center gap-3 bg-[#FF312C] hover:bg-[#E02621] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:gap-4 transition-all duration-300 group"
              >
                <span>{ctaLabel}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full border border-white/20 transition-all"
              >
                All Collections
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
