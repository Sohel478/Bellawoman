import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ShieldCheck, Truck, RefreshCw, Sparkles } from "lucide-react";
import { getProductBySlug, getRelatedProducts, getSiteSettings } from "@/lib/db";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductActions } from "@/components/products/ProductActions";
import { ProductCard } from "@/components/products/ProductCard";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bellawoman.com";
  const primaryImage = product.images?.[0]?.imagePath || "/products/image-010.jpg";
  const imageUrl = primaryImage.startsWith("http") ? primaryImage : `${baseUrl}${primaryImage}`;

  return {
    title: product.seoTitle || `${product.name} | BellaWoman`,
    description:
      product.seoDescription ||
      product.shortDescription ||
      `Shop ${product.name} (${product.sku}) by BellaWoman. Buy on Meesho & Amazon, or order directly on WhatsApp.`,
    alternates: {
      canonical: `${baseUrl}/product/${slug}`,
    },
    openGraph: {
      title: product.name,
      description: product.shortDescription || "",
      url: `${baseUrl}/product/${slug}`,
      siteName: "BellaWoman",
      locale: "en_IN",
      type: "website",
      images: [{ url: imageUrl, width: 800, height: 1000, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.shortDescription || "",
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [settings, relatedProducts] = await Promise.all([
    getSiteSettings(),
    getRelatedProducts(product.id, product.primaryCategoryId, 4),
  ]);

  const whatsappPhone = settings.whatsappPhone || "+919876543210";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bellawoman.com";

  // Structured Data (JSON-LD) for Google Rich Results (Product + Breadcrumbs)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.name,
        image: product.images?.map((img) =>
          img.imagePath.startsWith("http") ? img.imagePath : `${baseUrl}${img.imagePath}`
        ) || [],
        description: product.shortDescription || product.description,
        sku: product.sku || product.slug,
        brand: {
          "@type": "Brand",
          name: "BellaWoman",
        },
        offers: product.displayPrice
          ? {
              "@type": "Offer",
              priceCurrency: product.currency || "INR",
              price: product.displayPrice,
              availability: "https://schema.org/InStock",
              url: `${baseUrl}/product/${product.slug}`,
              seller: {
                "@type": "Organization",
                name: "BellaWoman",
              },
            }
          : undefined,
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
            name: product.category?.name || "Collections",
            item: `${baseUrl}/category/${product.category?.slug || "activewear"}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: `${baseUrl}/product/${product.slug}`,
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

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#71717A] mb-6 sm:mb-8">
        <Link href="/" className="hover:text-[#06262B] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/categories" className="hover:text-[#06262B] transition-colors">
          Collections
        </Link>
        {product.category && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href={`/category/${product.category.slug}`}
              className="hover:text-[#06262B] transition-colors"
            >
              {product.category.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#06262B] font-semibold truncate max-w-[180px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Gallery (7 Cols on desktop) */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right Column: Details & Actions (5 Cols on desktop) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          {/* Header & Badges */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.badgeText && (
                <span className="bg-[#06262B] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  {product.badgeText}
                </span>
              )}
              {product.sku && (
                <span className="text-xs font-mono font-medium text-[#71717A] tracking-wider">
                  SKU: {product.sku}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#06262B] tracking-tight">
              {product.name}
            </h1>

            {/* Price block */}
            <div className="flex items-baseline gap-3 mt-3">
              {product.displayPrice ? (
                <>
                  <span className="text-2xl sm:text-3xl font-black text-[#18181B]">
                    ₹{product.displayPrice.toLocaleString("en-IN")}
                  </span>
                  {product.originalPrice && product.originalPrice > product.displayPrice && (
                    <>
                      <span className="text-sm sm:text-base text-[#71717A] line-through">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs font-bold text-[#FF312C] bg-[#FFF2F1] px-2 py-0.5 rounded-md">
                        {Math.round(
                          ((product.originalPrice - product.displayPrice) /
                            product.originalPrice) *
                            100
                        )}
                        % OFF MRP
                      </span>
                    </>
                  )}
                </>
              ) : (
                <span className="text-base text-[#71717A] font-medium">
                  Price on request via WhatsApp
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#71717A] mt-1">Inclusive of all taxes</p>
          </div>

          {/* Short Description */}
          {product.shortDescription && (
            <p className="text-sm text-[#71717A] font-light leading-relaxed border-t border-[#EAE6DF] pt-4">
              {product.shortDescription}
            </p>
          )}

          {/* Interactive Variant Selectors & CTAs */}
          <ProductActions
            product={product}
            whatsappPhone={whatsappPhone}
            baseUrl={baseUrl}
          />

          {/* Product Highlights / Specifications */}
          <div className="border-t border-[#EAE6DF] pt-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#06262B]">
              Product Features & Care
            </h3>
            <div className="grid grid-cols-1 gap-2.5 text-xs text-[#71717A]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF312C] flex-shrink-0" />
                <span>4-Way Ultra Stretch (78% Nylon, 22% Spandex)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FF312C] flex-shrink-0" />
                <span>Anti-chafing flatlock seams with contoured support</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#FF312C] flex-shrink-0" />
                <span>Fast marketplace shipping & pan-India delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#FF312C] flex-shrink-0" />
                <span>Hassle-free size replacement support via WhatsApp</span>
              </div>
            </div>

            {/* Detailed Description */}
            {product.description && (
              <div className="pt-3 text-xs sm:text-sm text-[#18181B]/80 font-light leading-relaxed whitespace-pre-line border-t border-[#FAF9F5]">
                {product.description}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 pt-12 border-t border-[#EAE6DF]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF312C]">
                Complete The Look
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#06262B] tracking-tight mt-0.5">
                You May Also Like
              </h2>
            </div>
            {product.category && (
              <Link
                href={`/category/${product.category.slug}`}
                className="text-xs sm:text-sm font-semibold text-[#06262B] hover:text-[#FF312C] transition-colors"
              >
                View More
              </Link>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
