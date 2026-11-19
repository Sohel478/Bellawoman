import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Sparkles, Check } from "lucide-react";
import { CategoryItem } from "@/types";

interface CategorySectionProps {
  categories: CategoryItem[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  if (categories.length === 0) return null;

  // Case 1: When only 1 category exists (e.g. Initial Launch Activewear)
  // Render a wide, balanced, luxury capsule showcase instead of a lopsided 1/3-width skinny card.
  if (categories.length === 1) {
    const category = categories[0];
    const bgImage = category.image || "/hero/hero-br1091.jpg";
    const productCount = category._count?.products || 19;

    return (
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF312C]">
              Featured Collection
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#06262B] tracking-tight mt-1">
              Shop the Collection
            </h2>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#06262B] hover:text-[#FF312C] transition-colors"
          >
            <span>All Collections Directory</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cinematic Wide Capsule Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-[#06262B] text-white border border-[#EAE6DF] shadow-xl group">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 space-y-6 z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                <Sparkles className="w-3.5 h-3.5 text-[#FF312C]" />
                <span className="text-xs font-semibold tracking-widest uppercase text-white/90">
                  {productCount} Styles Available Now
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                  {category.name}
                </h3>
                <p className="text-sm sm:text-base text-white/80 font-light max-w-xl leading-relaxed">
                  {category.description ||
                    category.shortDescription ||
                    "Step up your routine with BellaWoman's premier activewear. From ultra-soft seamless bras to high-impact workout tops, every silhouette combines buttery 4-way stretch and trendsetting styling."}
                </p>
              </div>

              {/* Highlights Pill Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-white/70">
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                  <Check className="w-3.5 h-3.5 text-[#FF312C]" />
                  <span>Sports Bras</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                  <Check className="w-3.5 h-3.5 text-[#FF312C]" />
                  <span>Workout Sets</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                  <Check className="w-3.5 h-3.5 text-[#FF312C]" />
                  <span>Seamless Leggings</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={`/category/${category.slug}`}
                  className="inline-flex items-center gap-3 bg-[#FF312C] hover:bg-[#E02621] text-white font-bold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:gap-4"
                >
                  <span>Explore {category.name}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={`/category/${category.slug}?sort=newest`}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-sm px-6 py-3.5 sm:py-4 rounded-full border border-white/20 transition-all"
                >
                  <span>New Drops First</span>
                </Link>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-5 relative h-[360px] sm:h-[420px] lg:h-[480px] w-full overflow-hidden">
              <Image
                src={bgImage}
                alt={category.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle edge blend on left for desktop */}
              <div className="hidden lg:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#06262B] to-transparent pointer-events-none" />
              {/* Subtle bottom fade */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#06262B]/60 to-transparent pointer-events-none" />
            </div>

          </div>
        </div>
      </section>
    );
  }

  // Case 2: Multi-category layout (2, 3 or more categories)
  const gridColsClass =
    categories.length === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF312C]">
            Explore Collections
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#06262B] tracking-tight mt-1">
            Shop by Category
          </h2>
        </div>
        <Link
          href="/categories"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#06262B] hover:text-[#FF312C] transition-colors"
        >
          <span>View All Categories</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className={`grid ${gridColsClass} gap-6`}>
        {categories.map((category) => {
          const bgImage = category.image || "/hero/hero-br1091.jpg";
          const productCount = category._count?.products;

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group relative h-[380px] sm:h-[440px] rounded-3xl overflow-hidden bg-[#06262B] border border-[#EAE6DF] shadow-xs hover:shadow-xl transition-all duration-500"
            >
              <Image
                src={bgImage}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#06262B]/90 via-[#06262B]/40 to-transparent" />

              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                <div className="space-y-2">
                  {typeof productCount === "number" && (
                    <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-white/80 bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-full">
                      {productCount} Styles Available
                    </span>
                  )}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#FF312C] transition-colors flex items-center justify-between gap-3">
                    <span className="truncate">{category.name}</span>
                    <ArrowUpRight className="w-6 h-6 text-white group-hover:text-[#FF312C] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0" />
                  </h3>
                  {category.shortDescription && (
                    <p className="text-xs sm:text-sm text-white/80 font-light line-clamp-2">
                      {category.shortDescription}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
