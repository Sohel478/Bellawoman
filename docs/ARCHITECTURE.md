# BellaWoman — Technical Architecture & Implementation Documentation

**System:** Next.js 16 (App Router) + Prisma ORM + SQLite / PostgreSQL  
**Version:** 1.0.0 Production  
**Date:** 19 November 2026  

---

## 1. System Overview

BellaWoman is architected as an ultra-fast, mobile-first product discovery and social commerce platform for women's activewear and fashion. It eliminates cart and checkout friction by directing customers either to external marketplace listings (Meesho, Amazon) or directly to the brand's WhatsApp concierge with pre-filled variant details.

```
                          ┌────────────────────────┐
                          │   Visitor / Browser    │
                          └───────────┬────────────┘
                                      │
                      ┌───────────────┴───────────────┐
                      │                               │
                      ▼                               ▼
       ┌────────────────────────────┐   ┌───────────────────────────┐
       │   Public Storefront (SSR)  │   │     Admin CMS (/admin)    │
       │ • Home / Collections / Bio │   │ • Products, Banners, CRUD │
       │ • Product Detail Gallery   │   │ • Secure Cookie Session   │
       └──────────────┬─────────────┘   └─────────────┬─────────────┘
                      │                               │
                      │         ┌───────────┐         │
                      └────────►│ PrismaORM │◄────────┘
                                └─────┬─────┘
                                      │
                                      ▼
                        ┌───────────────────────────┐
                        │ SQLite / PostgreSQL DB    │
                        │ • 19 Seeded Activewear    │
                        │ • Categories & Banners    │
                        │ • Dynamic Site Settings   │
                        └───────────────────────────┘
```

---

## 2. Directory Structure

```
├── docs/
│   ├── PROJECT_AUDIT.md        # Initial audit and brand discovery findings
│   ├── ARCHITECTURE.md         # Comprehensive system architecture
│   ├── QA_REPORT.md            # Acceptance criteria validation report
│   └── DEPLOYMENT.md           # Deployment and hosting guide
├── prisma/
│   ├── schema.prisma           # Prisma 6 schema with 8 models
│   ├── seed.ts                 # Seeding script with 19 authentic SKUs
│   └── dev.db                  # Local SQLite database
├── public/
│   ├── brand/                  # Vector logos and favicons in SVG & PNG
│   ├── products/               # 80 authentic activewear catalog images
│   └── uploads/                # Dynamic admin media uploads
├── src/
│   ├── app/
│   │   ├── (store)/            # Public storefront pages
│   │   │   ├── page.tsx        # Homepage (Hero, Drops, Story, WhatsApp)
│   │   │   ├── categories/     # Collections directory
│   │   │   ├── category/[slug] # Dynamic Category catalog with filters
│   │   │   ├── product/[slug]  # Product Detail Page (Gallery, CTAs)
│   │   │   ├── about/          # Brand Manifesto
│   │   │   ├── contact/        # Contact and Concierge
│   │   │   ├── privacy-policy/ # Privacy Policy
│   │   │   └── terms/          # Terms and Conditions
│   │   ├── admin/              # Secure Admin CMS
│   │   │   ├── login/          # Protected Admin Login
│   │   │   ├── page.tsx        # Operational Dashboard
│   │   │   ├── categories/     # Category CRUD & Sort Order
│   │   │   ├── products/       # Product CRUD + Image Gallery Studio
│   │   │   ├── banners/        # Hero Campaign Manager
│   │   │   └── settings/       # WhatsApp & Announcement Settings
│   │   ├── api/
│   │   │   ├── admin/          # Auth, Upload, Category, Product APIs
│   │   │   └── search/         # Instant catalog search API
│   │   ├── layout.tsx          # Root Layout (Nav, Footer, Floating WhatsApp)
│   │   ├── not-found.tsx       # Custom 404
│   │   ├── sitemap.ts          # Dynamic XML Sitemap
│   │   └── robots.ts           # Robots.txt
│   ├── components/
│   │   ├── common/             # SearchModal, UI buttons
│   │   ├── layout/             # Navbar, Footer, AnnouncementBar, WhatsApp
│   │   ├── home/               # HeroBanner, CategorySection, ProductGrid
│   │   ├── products/           # ProductCard, ProductGallery, ProductActions
│   │   └── admin/              # CategoryForm, ProductForm, BannerManager
│   ├── lib/
│   │   ├── prisma.ts           # Prisma singleton
│   │   ├── db.ts               # Type-safe database queries
│   │   ├── auth.ts             # Cryptographic session cookie authentication
│   │   ├── whatsapp.ts         # wa.me link generation utility
│   │   └── marketplace.ts      # Marketplace styling and badges
│   └── types/
│       └── index.ts            # Core TypeScript interfaces
```

---

## 3. Database Schema Models

1. **Category:** `id, name, slug (unique), shortDescription, description, image, bannerImage, status, isFeatured, sortOrder, seoTitle, seoDescription, createdAt, updatedAt`
2. **Product:** `id, name, slug (unique), sku, shortDescription, description, primaryCategoryId, displayPrice, originalPrice, currency, status, isFeatured, isNewArrival, isTrending, isBestSeller, badgeText, sortOrder, whatsappMessageOverride, seoTitle, seoDescription, createdAt, updatedAt, publishedAt`
3. **ProductImage:** `id, productId, imagePath, altText, sortOrder, isPrimary, createdAt`
4. **ProductMarketplaceLink:** `id, productId, marketplaceName, marketplaceUrl, isEnabled, sortOrder, createdAt, updatedAt`
5. **ProductVariant:** `id, productId, size, colour, material, attributes, sortOrder`
6. **Banner:** `id, title, subtitle, desktopImage, mobileImage, altText, ctaLabel, ctaType, ctaTarget, status, startAt, endAt, sortOrder, createdAt, updatedAt`
7. **SiteSetting:** `id, settingKey (unique), settingValue, updatedAt`
8. **AdminUser:** `id, name, email (unique), passwordHash, role, status, lastLoginAt, createdAt, updatedAt`

---

## 4. Security & Performance Measures

- **No Public Registration:** Admin accounts can only be created via CLI or database seed.
- **Timing-Safe Crypto Sessions:** Admin authentication uses HMAC-SHA256 signatures with constant-time equality comparisons (`crypto.timingSafeEqual`) to prevent timing attacks.
- **Safe Outbound Links:** All external marketplace and WhatsApp actions use `rel="noopener noreferrer"`.
- **Upload Hardening:** MIME type checking (`image/jpeg`, `image/png`, `image/webp`), 5MB size limit, and randomized hex naming.
- **Core Web Vitals:** Preloaded critical hero images and SVGs, responsive `next/image` srcset generation, and zero runtime layout shifts.
