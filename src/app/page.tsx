import {
  getBanners,
  getPublishedCategories,
  getPublishedProducts,
  getSiteSettings,
} from "@/lib/db";
import { HeroBanner } from "@/components/home/HeroBanner";
import { CategorySection } from "@/components/home/CategorySection";
import { ProductGridSection } from "@/components/home/ProductGridSection";
import { BrandStorySection } from "@/components/home/BrandStorySection";
import { WhatsAppCtaBanner } from "@/components/home/WhatsAppCtaBanner";

export default async function HomePage() {
  const [banners, categories, newArrivals, trending, featured, settings] =
    await Promise.all([
      getBanners(),
      getPublishedCategories(),
      getPublishedProducts({ isNewArrival: true, limit: 4 }),
      getPublishedProducts({ isTrending: true, limit: 4 }),
      getPublishedProducts({ isFeatured: true, limit: 8 }),
      getSiteSettings(),
    ]);

  const heroBanner = banners[0] || null;
  const whatsappPhone = settings.whatsappPhone || "+919876543210";

  return (
    <div className="flex flex-col">
      {/* 1. Hero Campaign Banner */}
      <HeroBanner banner={heroBanner} />

      {/* 2. Shop by Category */}
      <CategorySection categories={categories} />

      {/* 3. New Arrivals */}
      {newArrivals.length > 0 && (
        <ProductGridSection
          title="New Arrivals"
          subtitle="The latest silhouettes drop here first. Fresh palettes, upgraded fit."
          badge="Fresh Drop"
          products={newArrivals}
          viewAllHref="/category/activewear?sort=newest"
        />
      )}

      {/* 4. Trending & Best Sellers */}
      {trending.length > 0 && (
        <ProductGridSection
          title="Trending Fits"
          subtitle="Most wanted sports bras and activewear sets, loved by the community."
          badge="Trending Now"
          products={trending}
          viewAllHref="/category/activewear"
        />
      )}

      {/* 5. Brand Story / Lifestyle Editorial */}
      <BrandStorySection />

      {/* 6. Featured Products Grid */}
      {featured.length > 0 && (
        <ProductGridSection
          title="Curated Essentials"
          subtitle="Explore the cornerstone pieces designed for high performance and daily styling."
          badge="BellaWoman Signature"
          products={featured}
          viewAllHref="/category/activewear"
        />
      )}

      {/* 7. WhatsApp Order CTA */}
      <WhatsAppCtaBanner whatsappPhone={whatsappPhone} />
    </div>
  );
}
