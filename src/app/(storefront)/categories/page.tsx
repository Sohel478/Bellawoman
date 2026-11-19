import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronRight } from "lucide-react";
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

      {/* Grid */}
      {categories.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-[#EAE6DF] p-8">
          <p className="text-base font-semibold text-[#06262B]">No collections are currently published.</p>
          <p className="text-xs text-[#71717A] mt-1">Check back soon for new seasonal drops.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const bgImage = category.image || "/products/image-001.jpg";
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
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#FF312C] transition-colors flex items-center justify-between">
                      <span>{category.name}</span>
                      <ArrowUpRight className="w-6 h-6 text-white group-hover:text-[#FF312C] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
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
