# BellaWoman — Product Showcase & Social Commerce Platform

A fresh, modern, mobile-first product discovery and social commerce platform for **BellaWoman**, an expressive women's fashion and activewear brand.

---

## 🌟 Key Features

- **Product Discovery & Presentation:** High-definition photography galleries, multi-angle views, and editorial styling.
- **Zero-Friction Social Commerce:**
  - **Buy on Meesho & Amazon:** Configured outbound marketplace buttons with safe external linking (`rel="noopener noreferrer"`).
  - **Order on WhatsApp:** Instant pre-filled inquiry builder (`wa.me`) capturing product title, SKU, price, selected size, and colour variant.
  - **Strictly No Cart or Checkout:** Eliminates checkout drop-off, customer account friction, and payment compliance overhead.
- **Dynamic Activewear Collection:** 19 seeded authentic BellaWoman SKUs (`BR-1012` to `BR-1091`) with 80 high-resolution photos, multi-size (XS to XL), and multi-colour options.
- **Full Admin CMS Portal (`/admin`):**
  - **Dashboard:** Operational metrics on live products, drafts, collections, and marketplace links.
  - **Categories:** Create, edit, reorder, and toggle publish status.
  - **Products:** Complete catalog studio with multi-image gallery management, primary photo selection, pricing, variants, and SEO.
  - **Campaign Banners:** Desktop and mobile responsive hero banners with custom CTA destinations.
  - **Site Settings:** One-click management of WhatsApp concierge phone number, announcement bar, contact info, and SEO defaults.
- **High-Performance Architecture:**
  - Next.js 16 (App Router) + TypeScript.
  - Tailwind CSS 4 with custom brand tokens (`#FF312C` Electric Poppy & `#06262B` Mineral Deep Teal).
  - Prisma ORM 6 with SQLite (easily upgradable to PostgreSQL).
  - Fully dynamic XML sitemap (`/sitemap.xml`) and robots file (`/robots.txt`).
  - Schema.org JSON-LD structured data for discovery SEO.

---

## 🚀 Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

### 3. Initialize Database & Seed Catalogue
```bash
npx prisma db push
npm run seed
```

### 4. Start Development Server
```bash
npm run dev
```

- **Storefront:** [http://localhost:3000](http://localhost:3000)
- **Admin Portal:** [http://localhost:3000/admin](http://localhost:3000/admin)
  - **Default Email:** `admin@bellawoman.com`
  - **Default Password:** `admin123`

---

## 📚 Documentation Index

- [Project Audit & Asset Findings](docs/PROJECT_AUDIT.md)
- [Technical Architecture & Data Model](docs/ARCHITECTURE.md)
- [QA Verification & Acceptance Checklist](docs/QA_REPORT.md)
- [Production Deployment Guide](docs/DEPLOYMENT.md)
