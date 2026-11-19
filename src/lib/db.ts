import { prisma } from "./prisma";
import { CategoryItem, ProductItem, BannerItem, SiteSettingsMap } from "@/types";

export async function getSiteSettings(): Promise<SiteSettingsMap> {
  try {
    const settings = await prisma.siteSetting.findMany();
    const map: SiteSettingsMap = {};
    for (const s of settings) {
      map[s.settingKey] = s.settingValue;
    }
    return map;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return {
      brandName: "BellaWoman",
      whatsappPhone: "+919876543210",
      announcementText: "✨ Elevate Your Daily Move — Explore the New Activewear Drop!",
      announcementEnabled: "true",
      contactEmail: "support@bellawoman.com",
    };
  }
}

export async function getPublishedCategories(): Promise<CategoryItem[]> {
  try {
    return (await prisma.category.findMany({
      where: { status: "published" },
      orderBy: { sortOrder: "asc" },
      include: {
        _count: {
          select: { products: { where: { status: "published" } } },
        },
      },
    })) as unknown as CategoryItem[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<CategoryItem | null> {
  try {
    return (await prisma.category.findFirst({
      where: { slug, status: "published" },
      include: {
        _count: {
          select: { products: { where: { status: "published" } } },
        },
      },
    })) as unknown as CategoryItem | null;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

export async function getBanners(): Promise<BannerItem[]> {
  try {
    return (await prisma.banner.findMany({
      where: { status: "published" },
      orderBy: { sortOrder: "asc" },
    })) as unknown as BannerItem[];
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
}

export async function getPublishedProducts(options?: {
  categoryId?: string;
  categorySlug?: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  search?: string;
  sort?: "featured" | "newest" | "price_asc" | "price_desc" | "name_asc";
  size?: string;
  colour?: string;
  limit?: number;
}): Promise<ProductItem[]> {
  try {
    const where: any = {
      status: "published",
      category: { status: "published" },
    };

    if (options?.categoryId) where.primaryCategoryId = options.categoryId;
    if (options?.categorySlug) where.category = { slug: options.categorySlug, status: "published" };
    if (options?.isFeatured) where.isFeatured = true;
    if (options?.isNewArrival) where.isNewArrival = true;
    if (options?.isTrending) where.isTrending = true;
    if (options?.isBestSeller) where.isBestSeller = true;

    if (options?.search) {
      where.OR = [
        { name: { contains: options.search } },
        { sku: { contains: options.search } },
        { shortDescription: { contains: options.search } },
        { description: { contains: options.search } },
      ];
    }

    if (options?.size || options?.colour) {
      where.variants = {
        some: {
          ...(options?.size ? { size: options.size } : {}),
          ...(options?.colour ? { colour: options.colour } : {}),
        },
      };
    }

    let orderBy: any = [{ sortOrder: "asc" }, { createdAt: "desc" }];
    if (options?.sort === "newest") {
      orderBy = { createdAt: "desc" };
    } else if (options?.sort === "price_asc") {
      orderBy = { displayPrice: "asc" };
    } else if (options?.sort === "price_desc") {
      orderBy = { displayPrice: "desc" };
    } else if (options?.sort === "name_asc") {
      orderBy = { name: "asc" };
    }

    return (await prisma.product.findMany({
      where,
      orderBy,
      take: options?.limit,
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        marketplaceLinks: { where: { isEnabled: true }, orderBy: { sortOrder: "asc" } },
        variants: { orderBy: { sortOrder: "asc" } },
        category: true,
      },
    })) as unknown as ProductItem[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<ProductItem | null> {
  try {
    return (await prisma.product.findFirst({
      where: { slug, status: "published", category: { status: "published" } },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        marketplaceLinks: { where: { isEnabled: true }, orderBy: { sortOrder: "asc" } },
        variants: { orderBy: { sortOrder: "asc" } },
        category: true,
      },
    })) as unknown as ProductItem | null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function getRelatedProducts(
  productId: string,
  categoryId: string,
  limit = 4
): Promise<ProductItem[]> {
  try {
    return (await prisma.product.findMany({
      where: {
        id: { not: productId },
        primaryCategoryId: categoryId,
        status: "published",
        category: { status: "published" },
      },
      take: limit,
      orderBy: { sortOrder: "asc" },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        marketplaceLinks: { where: { isEnabled: true }, orderBy: { sortOrder: "asc" } },
        variants: { orderBy: { sortOrder: "asc" } },
        category: true,
      },
    })) as unknown as ProductItem[];
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}
