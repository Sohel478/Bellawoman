export interface ProductImageItem {
  id: string;
  imagePath: string;
  altText: string | null;
  sortOrder: number;
  isPrimary: boolean;
}

export interface MarketplaceLinkItem {
  id: string;
  marketplaceName: string;
  marketplaceUrl: string;
  isEnabled: boolean;
  sortOrder: number;
}

export interface ProductVariantItem {
  id: string;
  size: string | null;
  colour: string | null;
  material: string | null;
  attributes: string | null;
  sortOrder: number;
}

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  shortDescription: string | null;
  description: string | null;
  primaryCategoryId: string;
  displayPrice: number | null;
  originalPrice: number | null;
  currency: string;
  status: string;
  isFeatured: boolean;
  isNewArrival: boolean;
  isTrending: boolean;
  isBestSeller: boolean;
  badgeText: string | null;
  sortOrder: number;
  whatsappMessageOverride: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  category?: CategoryItem;
  images: ProductImageItem[];
  marketplaceLinks: MarketplaceLinkItem[];
  variants: ProductVariantItem[];
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  image: string | null;
  bannerImage: string | null;
  status: string;
  isFeatured: boolean;
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    products: number;
  };
}

export interface BannerItem {
  id: string;
  title: string;
  subtitle: string | null;
  desktopImage: string;
  mobileImage: string | null;
  altText: string | null;
  ctaLabel: string | null;
  ctaType: string | null;
  ctaTarget: string | null;
  status: string;
  startAt: Date | null;
  endAt: Date | null;
  sortOrder: number;
}

export interface SiteSettingsMap {
  brandName?: string;
  whatsappPhone?: string;
  defaultWhatsappMessage?: string;
  announcementText?: string;
  announcementEnabled?: string;
  contactEmail?: string;
  contactPhone?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  footerAbout?: string;
  seoTitle?: string;
  seoDescription?: string;
  [key: string]: string | undefined;
}
