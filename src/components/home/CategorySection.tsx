import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CategoryItem } from "@/types";

interface CategorySectionProps {
  categories: CategoryItem[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  if (categories.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const bgImage = category.image || "/products/image-001.jpg";
          const productCount = category._count?.products;

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group relative h-[360px] sm:h-[420px] rounded-3xl overflow-hidden bg-[#06262B] border border-[#EAE6DF] shadow-xs hover:shadow-xl transition-all duration-500"
            >
              {/* Background Image */}
              <Image
                src={bgImage}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#06262B]/90 via-[#06262B]/40 to-transparent" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                <div className="space-y-2">
                  {typeof productCount === "number" && (
                    <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-white/80 bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-full">
                      {productCount} Styles Available
                    </span>
                  )}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#FF312C] transition-colors flex items-center justify-between">
                    <span>{category.name}</span>
                    <ArrowUpRight className="w-6 h-6 text-white group-hover:text-[#FF312C] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
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
