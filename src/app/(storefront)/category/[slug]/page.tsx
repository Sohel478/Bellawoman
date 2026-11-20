import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Filter, SlidersHorizontal, Sparkles } from "lucide-react";
import { getCategoryBySlug, getPublishedProducts } from "@/lib/db";
import { ProductCard } from "@/components/products/ProductCard";
import { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    sort?: string;
    size?: string;
    colour?: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bellawoman.com";
  const image = category.bannerImage || category.image || "/hero/hero-br1083.jpg";
  const imageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

  return {
    title: category.seoTitle || `${category.name} Collection`,
    description:
      category.seoDescription ||
      category.shortDescription ||
      `Explore BellaWoman's ${category.name} collection. Buy on Meesho & Amazon, or order directly on WhatsApp.`,
    alternates: {
      canonical: `${baseUrl}/category/${slug}`,
    },
    openGraph: {
      title: `${category.name} Activewear Collection | BellaWoman`,
      description: category.shortDescription || `Shop ${category.name} activewear & fashion.`,
      url: `${baseUrl}/category/${slug}`,
      siteName: "BellaWoman",
      locale: "en_IN",
      type: "website",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: category.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} Collection | BellaWoman`,
      description: category.shortDescription || `Shop ${category.name} activewear & fashion.`,
      images: [imageUrl],
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const search = await searchParams;

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const sortValue = (search.sort as any) || "featured";
  const sizeFilter = search.size as string | undefined;
  const colourFilter = search.colour as string | undefined;

  const products = await getPublishedProducts({
    categorySlug: slug,
    sort: sortValue,
    size: sizeFilter,
    colour: colourFilter,
  });

  const availableSizes = ["XS", "S", "M", "L", "XL"];
  const availableColours = ["Poppy Red", "Mineral Teal", "Charcoal Black", "Blush Rose"];

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bellawoman.com";

  // Category Collection JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${category.name} Collection`,
        description: category.shortDescription || category.description,
        url: `${baseUrl}/category/${category.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Collections",
            item: `${baseUrl}/categories`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: category.name,
            item: `${baseUrl}/category/${category.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#71717A] mb-6">
        <Link href="/" className="hover:text-[#06262B] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/categories" className="hover:text-[#06262B] transition-colors">
          Collections
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#06262B] font-semibold">{category.name}</span>
      </nav>

      {/* Category Banner / Header */}
      <div className="relative rounded-3xl overflow-hidden bg-[#06262B] text-white p-8 sm:p-12 mb-10 border border-[#EAE6DF] shadow-md">
        {category.bannerImage && (
          <Image
            src={category.bannerImage}
            alt={category.name}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
        )}
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-white/90">
            <Sparkles className="w-3.5 h-3.5 text-[#FF312C]" />
            <span>Curated Collection</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
              {category.description}
            </p>
          )}
          <div className="pt-2 text-xs font-mono text-white/60">
            Showing {products.length} {products.length === 1 ? "style" : "styles"}
          </div>
        </div>
      </div>

      {/* Filter and Sorting Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#EAE6DF]">
        {/* Quick Size / Colour Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[#06262B] flex items-center gap-1.5 mr-1">
            <Filter className="w-3.5 h-3.5 text-[#FF312C]" />
            <span>Filter:</span>
          </span>

          {/* Size Filter Pills */}
          {availableSizes.map((size) => {
            const isActive = sizeFilter === size;
            const href = isActive
              ? `/category/${slug}?${new URLSearchParams({
                  ...(sortValue !== "featured" ? { sort: sortValue } : {}),
                  ...(colourFilter ? { colour: colourFilter } : {}),
                }).toString()}`
              : `/category/${slug}?${new URLSearchParams({
                  size,
                  ...(sortValue !== "featured" ? { sort: sortValue } : {}),
                  ...(colourFilter ? { colour: colourFilter } : {}),
                }).toString()}`;

            return (
              <Link
                key={size}
                href={href}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition border ${
                  isActive
                    ? "bg-[#06262B] text-white border-[#06262B]"
                    : "bg-white text-[#71717A] border-[#EAE6DF] hover:border-[#06262B]/30"
                }`}
              >
                {size}
              </Link>
            );
          })}

          {/* Clear Filters Button if active */}
          {(sizeFilter || colourFilter) && (
            <Link
              href={`/category/${slug}`}
              className="text-xs font-semibold text-[#FF312C] underline ml-2 hover:opacity-80 transition"
            >
              Reset
            </Link>
          )}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <span className="text-xs font-semibold text-[#06262B] flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#71717A]" />
            <span>Sort:</span>
          </span>
          <div className="flex items-center gap-1.5 text-xs">
            {[
              { label: "Featured", value: "featured" },
              { label: "Newest", value: "newest" },
              { label: "Price: Low to High", value: "price_asc" },
              { label: "Price: High to Low", value: "price_desc" },
            ].map((s) => {
              const isSelected = sortValue === s.value;
              const href = `/category/${slug}?${new URLSearchParams({
                sort: s.value,
                ...(sizeFilter ? { size: sizeFilter } : {}),
                ...(colourFilter ? { colour: colourFilter } : {}),
              }).toString()}`;

              return (
                <Link
                  key={s.value}
                  href={href}
                  className={`px-3 py-1.5 rounded-full font-medium transition border ${
                    isSelected
                      ? "bg-white text-[#06262B] font-bold border-[#06262B] shadow-xs"
                      : "text-[#71717A] border-transparent hover:text-[#06262B]"
                  }`}
                >
                  {s.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-[#EAE6DF] p-8">
          <p className="text-base font-semibold text-[#06262B]">No products match the selected filters.</p>
          <p className="text-xs text-[#71717A] mt-1">Try clearing filters or view all styles in this collection.</p>
          <div className="mt-4">
            <Link
              href={`/category/${slug}`}
              className="inline-block bg-[#06262B] text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-[#FF312C] transition-colors"
            >
              Clear All Filters
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
