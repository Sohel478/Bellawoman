"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ProductItem } from "@/types";
import { getColourSwatch } from "@/lib/colours";

interface ProductCardProps {
  product: ProductItem;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const primaryImage = product.images?.[0]?.imagePath || "/brand/Bellawomen-default.svg";
  const secondaryImage = product.images?.[1]?.imagePath || primaryImage;

  // Derive badge
  const badge =
    product.badgeText ||
    (product.isNewArrival
      ? "New Drop"
      : product.isBestSeller
      ? "Best Seller"
      : product.isTrending
      ? "Trending"
      : null);

  // Distinct colours from variants
  const distinctColours = Array.from(
    new Set(product.variants?.map((v) => v.colour).filter(Boolean) as string[])
  ).slice(0, 4);

  return (
    <article className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#EAE6DF] hover:border-[#06262B]/20 hover:shadow-lg transition-all duration-300">
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF9F5] block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Primary Image */}
        <Image
          src={primaryImage}
          alt={product.images?.[0]?.altText || product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover object-top transition-all duration-500 ${
            secondaryImage !== primaryImage && isHovered
              ? "opacity-0 scale-105"
              : "opacity-100 scale-100 group-hover:scale-105"
          }`}
        />

        {/* Secondary Hover Image (Desktop) */}
        {secondaryImage !== primaryImage && (
          <Image
            src={secondaryImage}
            alt={product.images?.[1]?.altText || `${product.name} back view`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover object-top transition-all duration-500 absolute inset-0 ${
              isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
          />
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="inline-block bg-[#06262B] text-white text-[10px] md:text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              {badge}
            </span>
          </div>
        )}

        {/* Floating Quick View Pill */}
        <div className="absolute bottom-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
          <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-[#06262B] text-xs font-medium px-3 py-1.5 rounded-full shadow-md">
            <span>Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#FF312C]" />
          </span>
        </div>
      </Link>

      {/* Info Section */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-2">
        <div>
          {/* SKU / Category */}
          <div className="flex items-center justify-between text-[11px] text-[#71717A] mb-1">
            <span className="font-mono tracking-wider">{product.sku}</span>
            {product.category && <span className="truncate">{product.category.name}</span>}
          </div>

          {/* Product Title */}
          <h3 className="font-semibold text-xs sm:text-sm text-[#06262B] group-hover:text-[#FF312C] transition-colors line-clamp-1">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
        </div>

        {/* Price & Colour Indicators */}
        <div className="flex items-center justify-between pt-1 border-t border-[#FAF9F5]">
          <div className="flex items-baseline gap-2">
            {product.displayPrice ? (
              <>
                <span className="text-sm sm:text-base font-bold text-[#18181B]">
                  ₹{product.displayPrice.toLocaleString("en-IN")}
                </span>
                {product.originalPrice && product.originalPrice > product.displayPrice && (
                  <span className="text-xs text-[#71717A] line-through font-normal">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs text-[#71717A] font-medium">Price on request</span>
            )}
          </div>

          {/* Colour Swatch Dots */}
          {distinctColours.length > 0 && (
            <div className="flex items-center -space-x-1" title={distinctColours.join(", ")}>
              {distinctColours.map((c, i) => {
                const swatch = getColourSwatch(c);
                return swatch.isTwoTone ? (
                  <span
                    key={i}
                    className="inline-flex w-3 h-3 rounded-full border border-white shadow-xs overflow-hidden -rotate-45 shrink-0"
                    title={c}
                  >
                    <span className="w-1/2 h-full" style={{ backgroundColor: swatch.primaryColor }} />
                    <span className="w-1/2 h-full" style={{ backgroundColor: swatch.secondaryColor }} />
                  </span>
                ) : (
                  <span
                    key={i}
                    className="inline-block w-3 h-3 rounded-full border border-white shadow-xs shrink-0"
                    style={{ backgroundColor: swatch.primaryColor }}
                    title={c}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
