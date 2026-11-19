import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Sparkles, Zap } from "lucide-react";

export function BrandStorySection() {
  return (
    <section className="py-16 sm:py-24 bg-white border-y border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase */}
          <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-[#EAE6DF] bg-[#FAF9F5]">
            <Image
              src="/products/image-002.jpg"
              alt="BellaWoman Lifestyle Movement"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06262B]/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/15">
              <p className="text-xs font-mono uppercase tracking-widest text-[#FF312C]">Design Philosophy</p>
              <p className="text-sm font-semibold mt-1">&quot;Confidence is not a size. It&apos;s a state of movement.&quot;</p>
            </div>
          </div>

          {/* Copy and Pillars */}
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF312C]">
              About BellaWoman
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#06262B] tracking-tight uppercase leading-[1.1]">
              Engineered For Power. Styled For You.
            </h2>
            <p className="text-sm sm:text-base text-[#71717A] font-light leading-relaxed">
              BellaWoman is created for women who demand both aesthetic perfection and relentless functionality. From high-octane gym circuits to everyday athleisure, our pieces are sculpted to move like a second skin — without pinch, slip, or compromise.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EAE6DF] space-y-1.5">
                <Zap className="w-5 h-5 text-[#FF312C]" />
                <h4 className="text-xs font-bold text-[#06262B] uppercase">4-Way Compression</h4>
                <p className="text-[11px] text-[#71717A]">Buttery-soft nylon-spandex engineered to hold and flatter.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EAE6DF] space-y-1.5">
                <Sparkles className="w-5 h-5 text-[#FF312C]" />
                <h4 className="text-xs font-bold text-[#06262B] uppercase">Zero Chafing</h4>
                <p className="text-[11px] text-[#71717A]">Flatlock seams & breathable knit that keep you fresh all day.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EAE6DF] space-y-1.5">
                <Heart className="w-5 h-5 text-[#FF312C]" />
                <h4 className="text-xs font-bold text-[#06262B] uppercase">Direct Concierge</h4>
                <p className="text-[11px] text-[#71717A]">Shop via Meesho/Amazon or order directly on WhatsApp.</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#06262B] hover:text-[#FF312C] group transition-colors"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
