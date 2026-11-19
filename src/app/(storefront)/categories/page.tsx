import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, ChevronRight, Sparkles, Check } from "lucide-react";
import { getPublishedCategories } from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections & Categories",
  description: "Browse all active collections by BellaWoman. From premier activewear to trending daily essentials.",
};

export default async function CategoriesPage() {
  const categories = await getPublishedCategories();

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#71717A] mb-6">
        <Link href="/" className="hover:text-[#06262B] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#06262B] font-semibold">Collections</span>
      </nav>

      {/* Header */}
      <div className="mb-10 max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF312C]">
          BellaWoman Directory
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#06262B] tracking-tight uppercase mt-1">
          All Collections
        </h1>
        <p className="text-sm sm:text-base text-[#71717A] font-light mt-2 leading-relaxed">
          Explore curated fashion and high-performance pieces designed to celebrate movement and style.
        </p>
      </div>

      {/* Content */}
      {categories.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-[#EAE6DF] p-8">
          <p className="text-base font-semibold text-[#06262B]">No collections are currently published.</p>
          <p className="text-xs text-[#71717A] mt-1">Check back soon for new seasonal drops.</p>
        </div>
      ) : categories.length === 1 ? (
        // Balanced Full-Width Showcase for single category
        (() => {
          const category = categories[0];
          const bgImage = category.image || "/hero/hero-br1091.jpg";
          const count = category._count?.products || 19;

          return (
            <div className="relative rounded-3xl overflow-hidden bg-[#06262B] text-white border border-[#EAE6DF] shadow-xl group">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 space-y-6 z-10">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF312C]" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-white/90">
                      {count} Styles In Catalogue
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                      {category.name}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 font-light max-w-xl leading-relaxed">
                      {category.description ||
                        category.shortDescription ||
                        "Explore our complete range of high-performance sports bras, seamless gym sets, and activewear essentials."}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-white/70">
                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                      <Check className="w-3.5 h-3.5 text-[#FF312C]" />
                      <span>Sports Bras</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                      <Check className="w-3.5 h-3.5 text-[#FF312C]" />
                      <span>Workout Tops</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                      <Check className="w-3.5 h-3.5 text-[#FF312C]" />
                      <span>Compression Leggings</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/category/${category.slug}`}
                      className="inline-flex items-center gap-3 bg-[#FF312C] hover:bg-[#E02621] text-white font-bold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:gap-4"
                    >
                      <span>Browse All {category.name}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 relative h-[360px] sm:h-[420px] lg:h-[480px] w-full overflow-hidden">
                  <Image
                    src={bgImage}
                    alt={category.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="hidden lg:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#06262B] to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#06262B]/60 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          );
        })()
      ) : (
        <div
          className={`grid ${
            categories.length === 2
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          } gap-6`}
        >
          {categories.map((category) => {
            const bgImage = category.image || "/hero/hero-br1091.jpg";
            const count = category._count?.products || 0;

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
                    <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-white/80 bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-full">
                      {count} {count === 1 ? "Product" : "Products"}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#FF312C] transition-colors flex items-center justify-between gap-3">
                      <span className="truncate">{category.name}</span>
                      <ArrowUpRight className="w-6 h-6 text-white group-hover:text-[#FF312C] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0" />
                    </h2>
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
      )}
    </div>
  );
}
