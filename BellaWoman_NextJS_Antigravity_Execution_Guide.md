# BellaWoman --- Next.js Development Execution Guide

**For:** Google Antigravity\
**Project:** BellaWoman fashion product showcase and social commerce
website\
**Version:** 1.0\
**Date:** 18 November 2026

------------------------------------------------------------------------

## 1. Project Objective

Build a fresh, production-ready website for **BellaWoman**, a women's
fashion brand. The website is a brand-led product showcase and discovery
platform, not a conventional eCommerce checkout website.

Customers will: 1. Discover BellaWoman collections and products. 2.
Browse categories and product details. 3. Click **Buy Now** to visit the
product's configured Meesho, Amazon, or another marketplace listing. 4.
Or click **Order on WhatsApp** to contact BellaWoman with a pre-filled
product enquiry/order message.

The website must not collect payments or implement an on-site checkout.

The first launch category is **Activewear**. Categories must be fully
dynamic and manageable from the admin panel so the brand can add new
fashion categories later without code changes.

## 2. Source of Truth

Before implementation, read the complete project requirements document:

`BellaWoman_Website_Execution_Specification.md`

This document and this execution guide together define the project. If
there is a conflict, follow the more explicit requirement and document
the decision.

Do not assume that product names, product images, prices, marketplace
URLs, brand colours, policies, or contact details are known. Ask for
real production content when required. Use clearly labelled demo content
only in development.

## 3. Technology Stack

Use this preferred stack, subject to the repository audit:

  Layer                  Preferred technology
  ---------------------- ----------------------------------------------------------
  Framework              Next.js with App Router
  Language               TypeScript
  UI styling             Tailwind CSS
  UI primitives          shadcn/ui
  Database               PostgreSQL
  ORM                    Prisma
  Admin authentication   Auth.js
  Image storage          Cloudinary
  Hosting                Vercel
  Validation             Zod
  Forms                  React Hook Form where useful
  Testing                Vitest and Playwright, or suitable existing alternatives

Use stable, mutually compatible versions at implementation time. Do not
install unnecessary packages or introduce multiple libraries for the
same purpose.

### Architecture principles

-   Use one Next.js application for the public website and admin.
-   Render public pages with server components by default.
-   Use client components only for genuine interactivity.
-   Use server actions or route handlers for validated server-side
    mutations.
-   Keep business logic in service modules, not scattered through UI
    components.
-   Use Prisma migrations for all database changes.
-   Use environment variables for secrets and service configuration.
-   Keep public and admin code logically separated.
-   Do not expose database credentials, Cloudinary secrets, or auth
    secrets to client code.

## 4. Mandatory Initial Repository Audit

Before coding, inspect the repository and report:

1.  Existing folder and application structure.
2.  Current framework and versions.
3.  Existing database and ORM, if any.
4.  Existing authentication implementation.
5.  Existing deployment and hosting configuration.
6.  Available brand assets, logos, fonts, product photos, and icons.
7.  Existing reusable components and design tokens.
8.  Existing environment variable names (never print secret values).
9.  Existing code quality, build and test status.
10. Risks, missing information, and recommended changes.

Do not overwrite, delete, or replace existing work without explaining
why.

### Audit deliverable

Provide: - Repository audit summary. - Proposed architecture. - Proposed
route map. - Proposed data model. - Dependency list. - Environment
variables required. - Implementation plan and dependencies between
phases. - Questions that block production implementation.

Wait for approval before destructive changes or major architectural
decisions.

## 5. Application Route Structure

Use a structure similar to the following. Adapt it to repository
conventions where appropriate.

``` text
src/
  app/
    (store)/
      page.tsx
      categories/
        page.tsx
      category/
        [slug]/
          page.tsx
      product/
        [slug]/
          page.tsx
      about/
        page.tsx
      contact/
        page.tsx
      privacy-policy/
        page.tsx
      terms/
        page.tsx
    admin/
      login/
        page.tsx
      dashboard/
        page.tsx
      products/
        page.tsx
        new/
          page.tsx
        [id]/
          page.tsx
      categories/
        page.tsx
        new/
          page.tsx
        [id]/
          page.tsx
      banners/
        page.tsx
      settings/
        page.tsx
    api/
      auth/
        [...nextauth]/
          route.ts
  components/
    common/
    layout/
    home/
    products/
    categories/
    admin/
    forms/
  lib/
    auth.ts
    prisma.ts
    whatsapp.ts
    marketplace.ts
    validations/
  services/
  hooks/
  types/
prisma/
  schema.prisma
  migrations/
public/
.env.example
```

The route groups and folder names may vary, but the public/admin
separation and functionality must remain.

## 6. Design Direction

### Brand personality

The experience should be: - Gen Z and fashion-forward. - Energetic,
confident, expressive, and modern. - Premium but approachable. -
Feminine without relying on clichés. - Visual and product-led. - Simple
to browse and easy to act on.

### Visual principles

-   Use editorial typography and bold but readable headings.
-   Use real BellaWoman product photography as soon as supplied.
-   Use a neutral foundation with a distinctive, restrained accent
    palette.
-   Use generous spacing and strong image composition.
-   Use subtle transitions and motion only where they improve the
    experience.
-   Use clear badges such as New Drop, Trending, and Best Seller only
    when assigned by admin.
-   Avoid fake reviews, fake discounts, fake sales counts, and fake
    stock warnings.
-   Avoid generic marketplace layouts.
-   Do not use stock photography as if it were BellaWoman's actual
    catalogue.

Create centralised design tokens for: - Brand colours. - Typography. -
Spacing. - Border radius. - Shadows. - Buttons and links. - Product
cards. - Badges and chips. - Form fields. - Responsive breakpoints. -
Focus, hover, active, disabled, and loading states.

If exact brand assets are not available, create a polished temporary
direction and make it easy to replace. Do not invent a permanent logo.

## 7. Phase 1 --- Public Website UI

**Goal:** Complete and review the public-facing design before backend
implementation.

Build these screens using typed, local mock data initially.

### 7.1 Global header and navigation

Desktop: - BellaWoman logo. - Shop/categories navigation. - New Arrivals
link, shown only when relevant content exists. - About. - Contact. -
Search. - Optional WhatsApp CTA.

Mobile: - Compact brand header. - Accessible menu. - Search access. -
Easy-to-use category navigation. - Optional sticky navigation or CTA
only if it does not cover page content.

Do not include cart, checkout, or customer account icons.

### 7.2 Homepage

Build these sections as reusable components:

1.  Announcement strip.
2.  Large campaign hero with desktop/mobile image support.
3.  Shop by Category.
4.  New Arrivals.
5.  Featured/Trending products.
6.  Brand/lifestyle editorial section.
7.  Secondary campaign banner.
8.  Optional official social media section.
9.  WhatsApp CTA.
10. Footer.

The UI should support hiding sections when no content is available.
Section order and visibility should eventually be controlled through
admin.

### 7.3 Category listing page

Include: - Category title and description. - Optional category banner. -
Breadcrumbs. - Responsive product grid. - Sorting by Featured, Newest,
and optionally Name. - Filters for available attributes such as size,
colour, product type, and price when reliable. - Pagination or Load
More. - Clear empty state.

Do not display irrelevant filters with no available values.

### 7.4 Product detail page

Include: - Product image gallery. - Product title. - Optional price or
price range. - Short and full descriptions. - Sizes and colours, when
configured. - Material, fit, and care details, when provided. - Category
and tags. - Related products, when available. - Marketplace and WhatsApp
actions.

Product images must remain the visual priority. Ensure the gallery works
well on touch devices.

### 7.5 Supporting pages

Build: - About BellaWoman. - Contact. - Privacy Policy. - Terms and
Conditions. - 404 page.

Do not invent legal policies or business claims. Use clearly marked
draft content pending approval.

### 7.6 UI review checkpoint

Before backend work: - Run the application. - Check all public routes. -
Test mobile and desktop layouts. - Check image proportions and
typography. - Check menus, search UI, filters, and gallery
interactions. - Verify no horizontal overflow. - Present screenshots or
a running preview for approval.

**Stop at this checkpoint and request UI approval before moving to Phase
2.**

## 8. Phase 2 --- Database and Backend

After UI approval, implement PostgreSQL and Prisma.

### Suggested entities

#### Category

-   id
-   name
-   slug (unique)
-   shortDescription
-   description
-   imageUrl
-   bannerImageUrl
-   status (DRAFT / PUBLISHED)
-   isFeatured
-   sortOrder
-   seoTitle
-   seoDescription
-   createdAt
-   updatedAt

#### Product

-   id
-   name
-   slug (unique)
-   sku (optional)
-   shortDescription
-   description
-   primaryCategoryId
-   displayPrice (nullable)
-   originalPrice (nullable)
-   currency (default INR)
-   status (DRAFT / PUBLISHED / ARCHIVED)
-   isFeatured
-   isNewArrival
-   isTrending
-   isBestSeller
-   badgeText (optional)
-   sortOrder
-   whatsappMessageOverride (optional)
-   seoTitle
-   seoDescription
-   publishedAt (nullable)
-   createdAt
-   updatedAt

#### ProductCategory

Use a join table if products can belong to multiple categories.

-   productId
-   categoryId

#### ProductImage

-   id
-   productId
-   imageUrl
-   publicId or storage key
-   altText
-   sortOrder
-   isPrimary
-   createdAt

#### ProductMarketplaceLink

-   id
-   productId
-   marketplaceName
-   marketplaceUrl
-   isEnabled
-   sortOrder
-   createdAt
-   updatedAt

This must support multiple marketplace links per product. Do not
hardcode only two marketplace columns in the frontend.

#### ProductVariant

Implement if size/colour selection is required.

-   id
-   productId
-   size (nullable)
-   colour (nullable)
-   material (nullable)
-   attributes (optional JSON)
-   sortOrder

#### Banner

-   id
-   title
-   subtitle
-   desktopImageUrl
-   mobileImageUrl
-   altText
-   ctaLabel
-   ctaType
-   ctaTarget
-   status
-   startAt
-   endAt
-   sortOrder
-   createdAt
-   updatedAt

#### SiteSetting

-   id
-   key (unique)
-   value
-   updatedAt

#### AdminUser

Use Auth.js-compatible account/session structures as required.

-   id
-   name
-   email (unique)
-   passwordHash if using credentials
-   role
-   status
-   lastLoginAt
-   createdAt
-   updatedAt

Add appropriate relations, indexes, unique constraints, and database
migrations.

### Backend rules

-   Public queries must return published products and published
    categories only.
-   Draft and archived products must never appear publicly.
-   Unpublished categories must not appear in public navigation.
-   Validate all create/update operations on the server using Zod or an
    equivalent.
-   Generate unique slugs and handle collisions.
-   Use transactions where multiple related records must be updated
    together.
-   Avoid N+1 queries.
-   Paginate large product collections.
-   Never trust client-submitted admin IDs or permissions.

## 9. Phase 3 --- Admin CMS

Build a clean, practical admin interface under `/admin`.

### 9.1 Authentication

-   Secure login.
-   No public registration.
-   Create the first admin through a secure setup or seed procedure.
-   Protect all admin pages and server actions.
-   Verify permissions on the server, not just in the UI.
-   Use secure session handling and modern password hashing when
    credentials authentication is used.
-   Rate-limit login attempts.
-   Do not hardcode admin credentials.
-   Do not expose secrets in browser bundles.

Keep the architecture ready for Super Admin and Content Manager roles.

### 9.2 Dashboard

Show: - Total published products. - Draft products. - Active
categories. - Products missing marketplace links. - Recent content
activity, if audit logging is implemented.

Do not display invented revenue, sales, or order analytics.

### 9.3 Category management

Admin must be able to: - Create and edit categories. - Upload category
images and banners. - Edit descriptions and SEO fields. - Set slugs. -
Set display order. - Feature categories. - Publish/unpublish. - Preview
category pages. - Delete with a safe confirmation.

Prevent accidental deletion of categories with assigned products.
Require reassignment or a deliberate decision.

### 9.4 Product management

Admin must be able to: - Create and edit products. - Preview before
publishing. - Publish/unpublish. - Archive. - Duplicate a product if
practical. - Assign primary and optional additional categories. - Manage
descriptions and tags. - Set display prices where applicable. -
Configure sizes and colours. - Upload, replace, delete, and reorder
gallery images. - Choose a primary image. - Manage product badges and
merchandising flags. - Configure SEO fields. - Configure marketplace
links. - Configure WhatsApp message overrides.

Do not allow a product to publish without its required name, slug,
category, and primary image.

### 9.5 Marketplace link management

Admin must be able to add multiple external links per product.

Initial supported marketplaces: - Meesho. - Amazon.

Design the data model so additional marketplaces can be added without a
schema redesign.

Requirements: - Marketplace name. - URL. - Enabled/disabled. - Sort
order. - URL validation. - HTTPS required for production links. -
Preview/open link for admin verification.

Never publish placeholder URLs.

### 9.6 Banner management

Admin can: - Add, edit, delete, publish, and unpublish banners. - Upload
desktop and mobile images. - Configure heading and supporting copy. -
Configure CTA label and destination. - Set sort order. - Set optional
start/end dates. - Preview before publishing.

### 9.7 Site settings

Admin can configure: - Logo and favicon. - WhatsApp number including
country code. - Default WhatsApp message. - Contact email and phone. -
Social links. - Announcement strip and visibility. - Footer
description. - Default SEO information. - Analytics ID, if configured. -
Default social sharing image.

## 10. Phase 4 --- Marketplace and WhatsApp Actions

### 10.1 Buy Now

On a product detail page: - If one marketplace link is enabled, show a
clear CTA for that marketplace. - If multiple links are enabled, show
distinct options such as Buy on Meesho and Buy on Amazon. - If no
marketplace link is enabled, hide marketplace CTAs. - Open the external
destination safely in a new tab/window. - Track outbound click events
without sending personal information. - Never represent the external
purchase as a completed BellaWoman checkout.

### 10.2 WhatsApp ordering

Create a reusable server/client-safe utility for generating the WhatsApp
URL.

Message example:

`Hi BellaWoman, I am interested in [Product Name]. Please share details about availability, sizes, colours and ordering. Product: [Product URL]`

If size and colour are selected, include them in the message.

Use the configured WhatsApp business number. Generate a properly
URL-encoded message and a valid `wa.me` link.

Requirements: - Validate the configured phone number. - Include the
canonical product page URL. - Allow an admin-defined product-specific
message override. - Allow a general WhatsApp enquiry CTA. - Do not
include payment credentials or sensitive personal information. - Test on
desktop and mobile, including devices without the WhatsApp app
installed.

### 10.3 No on-site commerce

Explicitly do not implement: - Shopping cart. - Checkout. - Payment
gateway. - Payment collection. - Customer wallet. - On-site order
confirmation. - Shipping or order fulfilment management.

## 11. Phase 5 --- Image and Media Handling

Use Cloudinary or an equivalent approved storage provider.

Requirements: - Secure server-side upload authorisation. - Validate file
type and size. - Do not expose Cloudinary API secrets. - Generate
responsive image sizes. - Use modern formats where supported. -
Lazy-load below-the-fold images. - Set image dimensions or aspect
ratios. - Preserve product image proportions. - Support gallery ordering
and primary-image selection. - Store storage identifiers so assets can
be replaced or deleted safely. - Provide meaningful alt text.

If Cloudinary credentials are not yet available, implement the storage
abstraction and local development fallback without committing
credentials.

## 12. Phase 6 --- SEO and Analytics

### SEO

Implement: - Unique metadata for home, category, and product pages. -
Canonical URLs. - Dynamic sitemap. - robots.txt. - Open Graph
metadata. - Social sharing images. - Breadcrumb navigation and
structured data where accurate. - Product structured data based only on
genuine visible information. - Descriptive image alt text. - Proper 404
handling. - Redirects when published slugs change, where practical.

Do not invent ratings, reviews, offers, availability, or stock
information.

Do not represent BellaWoman as processing a marketplace transaction.

### Analytics

Prepare event tracking for: - `view_home` - `view_category` -
`view_product` - `search` - `click_marketplace` - `click_whatsapp` -
`select_product_variant` - `click_campaign`

Include product ID/slug and marketplace name where relevant. Never send
WhatsApp message content or personal information to analytics.

Analytics must be configurable and must not break the website when no
analytics ID is configured.

## 13. Phase 7 --- Performance, Accessibility, and Security

### Performance

-   Use server components by default.
-   Minimise client-side JavaScript.
-   Optimise image delivery.
-   Lazy-load non-critical images.
-   Avoid unnecessary animation dependencies.
-   Cache public content appropriately.
-   Paginate catalogue queries.
-   Avoid loading the entire catalogue on the homepage.
-   Prevent layout shifts.
-   Provide clear loading, error, and empty states.

### Accessibility

-   Use semantic HTML.
-   Make navigation keyboard-accessible.
-   Provide visible focus states.
-   Use accessible labels and form validation.
-   Maintain readable text contrast.
-   Add alt text to meaningful images.
-   Respect reduced-motion preferences.
-   Ensure controls have meaningful labels.

### Security

-   Validate and sanitise inputs.
-   Protect admin routes and mutations.
-   Verify role permissions server-side.
-   Use secure authentication and session practices.
-   Rate-limit authentication.
-   Restrict uploads by type and size.
-   Validate external URLs.
-   Keep secrets out of source control.
-   Use HTTPS in production.
-   Provide an accurate privacy policy.
-   Do not collect payment details.

## 14. Responsive Testing

Test at minimum: - 320 px. - 375 px. - 390 px. - 430 px. - 768 px. -
1024 px. - 1440 px. - 1600 px.

Verify: - No horizontal overflow. - Navigation works on touch devices. -
Product cards remain readable. - Gallery interactions work. - Filters
are usable. - CTA buttons are visible and accessible. - Sticky elements
do not obscure content. - Images load in appropriate sizes. - WhatsApp
and marketplace links work.

## 15. Execution Phases and Approval Gates

### Phase 0 --- Audit

Deliver repository audit, architecture, data model, route map,
dependency plan, and missing-information list.

**Approval gate:** Approve architecture and any major repository
changes.

### Phase 1 --- Public UI

Deliver all public screens with local mock data, responsive layouts, and
working UI interactions.

**Approval gate:** Obtain design approval before backend development.

### Phase 2 --- Database and backend

Deliver Prisma schema, migrations, validation, public queries, and
backend services.

**Approval gate:** Review schema and core data operations.

### Phase 3 --- Admin CMS

Deliver authentication, dashboard, category/product/banner/settings
management, and media upload.

**Approval gate:** Verify admin can manage the catalogue without code
changes.

### Phase 4 --- Integrations

Deliver marketplace redirects, WhatsApp message generation, and event
hooks.

**Approval gate:** Test using real approved test URLs and a test
WhatsApp number.

### Phase 5 --- Production readiness

Deliver SEO, performance, security, accessibility, QA, and deployment.

**Approval gate:** Complete acceptance checklist and production
sign-off.

Do not silently skip approval gates. If the user explicitly asks to
proceed through multiple phases without waiting, report the scope and
risks before doing so.

## 16. Acceptance Criteria

### Public website

-   [ ] All public routes work.
-   [ ] Design is consistent, modern, and fashion-focused.
-   [ ] Mobile layouts work without horizontal overflow.
-   [ ] Categories are dynamic.
-   [ ] Published products appear in the correct categories.
-   [ ] Product detail pages show correct content and images.
-   [ ] Search and implemented filters work.
-   [ ] Empty, error, and 404 states are handled.

### Admin

-   [ ] Admin authentication works.
-   [ ] Public registration is disabled.
-   [ ] Admin routes and mutations are protected.
-   [ ] Categories can be created, edited, ordered, published, and
    unpublished.
-   [ ] Products can be created, edited, ordered, published,
    unpublished, and archived.
-   [ ] Product images can be uploaded, reordered, replaced, and
    removed.
-   [ ] Multiple marketplace links can be configured per product.
-   [ ] Banners and site settings are editable.
-   [ ] Admin changes appear correctly on the public website.

### Customer actions

-   [ ] Meesho redirect works.
-   [ ] Amazon redirect works.
-   [ ] Additional marketplace links are supported.
-   [ ] WhatsApp opens with the correct product details.
-   [ ] Selected size/colour is included when available.
-   [ ] General WhatsApp CTA works.
-   [ ] No cart or payment flow exists.
-   [ ] No broken or placeholder CTA is visible.

### Quality

-   [ ] No critical build or runtime errors.
-   [ ] No critical console errors.
-   [ ] Responsive testing is complete.
-   [ ] Images are optimised.
-   [ ] Metadata and sitemap are correct.
-   [ ] Security checks are complete.
-   [ ] Setup and deployment instructions are documented.

## 17. Development Workflow and Reporting

After every phase, report:

1.  Work completed.
2.  Files and modules changed.
3.  Database changes.
4.  Commands executed.
5.  Tests run and results.
6.  Screenshots or preview URL when available.
7.  Outstanding issues.
8.  Required user decisions.
9.  Recommended next phase.

Do not report a feature as complete until it has been implemented and
tested.

Keep a project decision log and update the README throughout
development.

Suggested progress files: - `docs/PROJECT_AUDIT.md` -
`docs/ARCHITECTURE.md` - `docs/IMPLEMENTATION_LOG.md` -
`docs/QA_REPORT.md` - `docs/DEPLOYMENT.md`

## 18. Final Handover

Provide: - Complete source code. - Prisma schema and migrations. -
Secure first-admin setup instructions. - `.env.example` without
secrets. - Local development setup. - Production deployment guide. -
Database backup guidance. - Cloudinary setup instructions. - Admin user
guide. - Product and category content entry guide. - Marketplace and
WhatsApp configuration guide. - QA report. - List of external services
and associated costs, if applicable.

------------------------------------------------------------------------

## 19. Immediate Instruction to Antigravity

Start with **Phase 0 only**.

Read: - `BellaWoman_Website_Execution_Specification.md` - This file:
`BellaWoman_NextJS_Antigravity_Execution_Guide.md`

Inspect the repository and return the audit, architecture
recommendation, route map, data model, required dependencies, and
missing information.

Do not begin implementation until the audit is presented and approved.

**Core product principle:** BellaWoman is the brand's product discovery
and presentation layer. Customers discover products on BellaWoman and
complete their purchase on an external marketplace or contact the brand
through WhatsApp. Keep this journey visual, clear, trustworthy, and
friction-free.
