import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductItem } from "@/types";

interface ProductGridSectionProps {
  title: string;
  subtitle?: string;
  badge?: string;
  products: ProductItem[];
  viewAllHref?: string;
}

export function ProductGridSection({
  title,
  subtitle,
  badge,
  products,
  viewAllHref,
}: ProductGridSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-3">
        <div>
          {badge && (
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF312C]">
              {badge}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#06262B] tracking-tight mt-0.5">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#71717A] mt-1 max-w-xl font-light">
              {subtitle}
            </p>
          )}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#06262B] hover:text-[#FF312C] transition-colors"
          >
            <span>View All</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
