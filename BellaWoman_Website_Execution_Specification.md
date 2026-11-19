# BellaWoman --- Website Execution Specification

**Project:** BellaWoman Product Showcase & Social Commerce Website\
**Prepared for:** Antigravity (AI development agent)\
**Document type:** Product requirements + implementation guide\
**Version:** 1.0\
**Date:** 18 November 2026

------------------------------------------------------------------------

## 1. Project Overview

Build a fresh, modern, mobile-first website for **BellaWoman**, a
women's fashion and clothing brand.

The website is primarily a **product discovery and showcase platform**.
Customers should be able to explore collections, view product details,
and choose how they want to place an order:

1.  **Buy Now:** Redirect the customer to the product's configured
    marketplace listing, such as Meesho or Amazon.
2.  **Order on WhatsApp:** Open WhatsApp with a pre-filled message
    containing the selected product details.

The website will **not process payments, collect payment information, or
manage checkout orders**. Marketplace transactions happen on the
external marketplace. WhatsApp enquiries and orders are handled by the
BellaWoman team.

The initial launch will focus on **Activewear**. The architecture and
admin panel must allow the business team to add, edit, reorder, publish,
unpublish, and remove categories in the future without developer
intervention.

## 2. Primary Goals

-   Establish a distinctive, Gen Z-friendly fashion brand experience.
-   Make product discovery visual, simple, and engaging.
-   Prioritise mobile UX, since much of the target audience is expected
    to browse on mobile.
-   Convert product interest into marketplace visits or WhatsApp
    conversations.
-   Give the admin team complete control over products, categories,
    banners, and marketplace links.
-   Keep the site fast, SEO-friendly, accessible, and easy to expand.

### Success measures

Track these events where analytics is configured:

-   Product card views and product detail views.
-   Clicks on Buy Now / marketplace links.
-   Clicks on Order on WhatsApp.
-   Category visits and search usage.
-   Banner and campaign clicks.

Do not define success by on-site purchases or checkout conversion
because checkout is outside this website.

## 3. Scope and Non-Goals

### In scope

-   Responsive public website.
-   Home page and category/collection browsing.
-   Product listing and product detail pages.
-   Product search and useful filters.
-   Marketplace redirect buttons.
-   WhatsApp order/enquiry flow.
-   Admin authentication and dashboard.
-   Category, product, banner, and basic content management.
-   SEO metadata, sitemap, analytics hooks, and performance
    optimisation.

### Explicitly out of scope

-   Shopping cart.
-   On-site checkout.
-   Payment gateway or payment collection.
-   Customer wallet, coupons, or payment refunds.
-   Inventory deduction or marketplace inventory synchronisation.
-   Shipping, delivery, and returns management.
-   Customer accounts, unless added in a later phase.
-   Automatic import or synchronisation of Meesho/Amazon listings.

**Important:** Do not create a fake cart or checkout experience. The
primary actions must always be marketplace redirect or WhatsApp.

## 4. Brand and Visual Direction

### Design personality

The website should feel:

-   Gen Z, energetic, expressive, and fashion-forward.
-   Trend-aware without looking like a generic marketplace template.
-   Clean and premium, with playful visual details.
-   Confident, youthful, feminine, and inclusive.
-   Product-first: photography should lead the experience.

### Visual direction

Use these as design guidance, not rigid restrictions:

-   Strong editorial typography with expressive headings.
-   A neutral base with one or two recognisable brand accent colours.
-   Large product photography and campaign imagery.
-   Rounded cards or image containers where appropriate.
-   Subtle motion, hover states, and transitions.
-   Clear labels such as "New Drop", "Trending", "Best Seller", and
    "Limited Edit" only when assigned by admin.
-   Generous spacing and clear visual hierarchy.
-   Mobile-first layouts with thumb-friendly controls.

Avoid:

-   Overly childish colours or excessive gradients.
-   Too many animations, popups, or distracting effects.
-   Dense product grids and tiny text.
-   Fake discounts, fake scarcity, or unverified ratings.
-   Generic stock imagery in place of actual BellaWoman products.

### Design system

Create reusable design tokens for:

-   Brand colours and semantic colours.
-   Typography scale and font weights.
-   Spacing scale.
-   Border radii and shadows.
-   Buttons, chips, badges, cards, inputs, and navigation.
-   Responsive breakpoints.
-   Focus, hover, active, disabled, and loading states.

Use licensed fonts and assets. If the brand's exact logo, colours, or
fonts are not available in the project files, create a polished
temporary direction and keep the values centralised so they can be
replaced easily.

## 5. Website Information Architecture

### Public pages

1.  **Home** --- `/`
2.  **All Categories** --- `/categories`
3.  **Category Listing** --- `/category/{slug}`
4.  **Product Detail** --- `/product/{slug}`
5.  **About BellaWoman** --- `/about`
6.  **Contact** --- `/contact`
7.  **Privacy Policy** --- `/privacy-policy`
8.  **Terms and Conditions** --- `/terms`
9.  **Shipping / Returns Information** --- optional informational page,
    only if the brand has a verified policy. Do not imply that
    BellaWoman fulfils marketplace orders if it does not.

### Global navigation

Desktop: - BellaWoman logo. - Shop / Categories. - New Arrivals (only if
there are published products assigned to the collection). - About. -
Contact. - Search icon or search field. - Optional prominent WhatsApp
CTA.

Mobile: - Compact header with logo and menu control. - Search access. -
Category navigation that is easy to use with one hand. - Optional sticky
bottom action/navigation area, ensuring it does not cover content or
product CTAs.

Do not add cart or account icons.

## 6. Home Page Requirements

The home page should tell the brand story quickly and guide visitors
into shopping.

### Suggested section order

1.  **Announcement strip**
    -   Admin-editable short message.
    -   Example: "Your next favourite fit is waiting."
    -   Can be switched off from admin.
2.  **Hero campaign**
    -   Large campaign image or responsive image set.
    -   Strong headline and short supporting copy.
    -   Primary CTA: "Explore the Collection".
    -   Destination configurable by admin: category, product, or
        internal page.
    -   Do not hardcode campaign text or images.
3.  **Shop by Category**
    -   Display active categories.
    -   Category image, name, and optional short description.
    -   Initially show Activewear.
    -   Automatically support additional categories added later.
4.  **New Arrivals**
    -   Products marked as New Arrival by admin.
    -   Hide the section if there are no eligible products.
5.  **Trending / Featured Products**
    -   Admin-selected products.
    -   Do not infer popularity from fake sales data.
6.  **Brand statement / lifestyle section**
    -   Short BellaWoman brand message.
    -   Use brand-approved copy and photography.
7.  **Campaign / editorial banner**
    -   Optional second promotional banner controlled by admin.
8.  **Social / Instagram section**
    -   Optional. Only show if an official profile or approved content
        source is configured.
    -   Do not scrape social content without permission.
9.  **WhatsApp CTA**
    -   Clear invitation to ask about a product or place an order
        through WhatsApp.
10. **Footer**
    -   Logo and short brand description.
    -   Navigation links.
    -   Contact details and social links.
    -   Privacy Policy and Terms.
    -   Copyright year generated dynamically.

Admin should be able to control section visibility and ordering where
practical. If full drag-and-drop section management is excessive for the
first release, implement simple visibility and sort-order fields.

## 7. Category Listing Page

Each category page should include:

-   Category name, description, and optional banner.
-   Breadcrumb navigation.
-   Product count, if reliable.
-   Responsive product grid.
-   Sorting:
    -   Featured (default)
    -   Newest
    -   Name A--Z (optional)
-   Filters, where relevant:
    -   Size
    -   Colour
    -   Product type
    -   Price range, only when BellaWoman has a reliable display price
    -   Tags / collection
-   Clear empty state if no products are available.
-   Pagination or "Load More" for larger catalogues.

Filters must be generated from available product attributes where
practical. Do not show filters that have no applicable values.

## 8. Product Card Requirements

Every product card should support:

-   Primary product image.
-   Optional hover/secondary image on desktop.
-   Product name.
-   Optional display price or price range.
-   Admin-controlled badges: New, Trending, Best Seller, etc.
-   Optional colour/variant indicators.
-   Click-through to product detail page.

The card should not show unverified ratings, reviews, stock counts, or
discounts.

On mobile, cards must remain readable and tappable. Use a responsive
grid that typically shows two columns on smaller phones, subject to
image and text legibility.

## 9. Product Detail Page

### Content

-   Product name.
-   Product image gallery.
-   Optional video, if supported and optimised.
-   Display price / price range, if provided.
-   Short description.
-   Full description.
-   Category and tags.
-   Available sizes and colours.
-   Product specifications / material / fit / care instructions, when
    provided.
-   Optional related products.
-   Optional "You may also like" section.

### Primary actions

**A. Buy Now**

-   Show only if at least one valid marketplace URL is configured.
-   If both Meesho and Amazon links exist, show a clear marketplace
    choice:
    -   "Buy on Meesho"
    -   "Buy on Amazon"
-   If only one link exists, show that marketplace CTA.
-   Open the marketplace listing in a new tab/window.
-   Use safe external-link handling (`rel="noopener noreferrer"` where
    applicable).
-   Track the click as an outbound marketplace event.
-   Never claim that the customer has purchased on BellaWoman.

**B. Order on WhatsApp**

-   Show if the global WhatsApp number is configured and the product is
    published.

-   Open WhatsApp with a pre-filled message, for example:

    `Hi BellaWoman, I am interested in [Product Name]. Please share details about availability, sizes, colours and ordering.`

-   Include product URL in the message where practical.

-   If the customer has selected a size or colour, include the selected
    option in the message.

-   Do not ask for payment credentials or sensitive personal information
    in the pre-filled message.

### CTA behaviour

-   Keep both actions visually clear.
-   Marketplace action should be prominent when a marketplace URL
    exists.
-   WhatsApp should remain easy to find.
-   If no marketplace link exists, WhatsApp becomes the primary CTA.
-   Never render a dead or placeholder Buy Now button.

## 10. WhatsApp Ordering Flow

### Configuration

Admin can set: - WhatsApp business phone number, including country
code. - Default message template. - Optional general enquiry message.

### Product-specific message

Generate a URL-encoded WhatsApp link using the configured number and
message. Example format:

`https://wa.me/{country_code_and_number}?text={encoded_message}`

Do not include spaces, `+`, brackets, or punctuation in the phone-number
path. Validate the configured number before publishing.

### Optional selection flow

If product variants exist: 1. Customer opens product page. 2. Customer
selects size and/or colour. 3. Customer clicks Order on WhatsApp. 4.
WhatsApp opens with product name, selected options, and product page
link.

If no variant is selected, allow the customer to continue and ask about
options in WhatsApp.

### General WhatsApp CTA

The home page, footer, and contact page may include a general WhatsApp
CTA without product details.

## 11. Admin Panel

Create a secure admin area under `/admin` or a separate protected admin
route.

### Admin dashboard

Display useful operational summaries: - Published products. - Draft
products. - Active categories. - Products missing marketplace links. -
Recent admin activity, if activity logging is implemented.

Do not display fake revenue, orders, or sales analytics. This website
does not own the transaction.

### 11.1 Category Management

Admin actions: - Create category. - Edit category. - Upload category
image. - Add short and long description. - Set category slug. - Set
display order. - Publish / unpublish. - Mark as featured. - Delete
category with a safe confirmation.

Fields: - Name (required). - Slug (required, unique). - Short
description. - Description. - Image. - Banner image (optional). -
Status: Draft / Published. - Sort order. - SEO title. - SEO description.

Rules: - A category with assigned products should not be hard-deleted
without confirmation and a reassignment/unpublish decision. -
Unpublished categories must not appear in public navigation or category
listings. - Category URLs should remain stable when names change unless
the slug is deliberately changed.

### 11.2 Product Management

Admin actions: - Create product. - Edit product. - Duplicate product
(optional but useful). - Preview product. - Publish / unpublish. -
Archive or delete with confirmation. - Assign one primary category and
optional additional categories if the data model supports it. - Mark as
featured, new arrival, trending, or best seller. - Reorder products.

Recommended fields:

**Basic details** - Product name (required). - Slug (required,
unique). - SKU / internal reference (optional). - Short description. -
Full description. - Primary category. - Additional categories
(optional). - Tags. - Product status: Draft / Published / Archived.

**Pricing** - Display price (optional). - Original price / MRP
(optional). - Price label (optional, e.g. "Starting at"). - Currency,
default INR. - Only show price information entered and approved by
admin. - Do not calculate or advertise discounts unless both values are
valid and the business intends to show them.

**Images and media** - Main image (required for publishing). -
Additional gallery images. - Optional product video. - Image alt text. -
Image ordering. - Provide image preview, replace, and remove controls. -
Optimise images on upload or delivery.

**Variants and attributes** - Sizes (e.g. XS, S, M, L, XL, XXL). -
Colours. - Material. - Fit. - Care instructions. - Other configurable
attributes as required.

**Marketplace links** - Meesho URL. - Amazon URL. - Optional other
marketplace URL fields designed so more channels can be added later. -
Link label / marketplace name. - Link enabled/disabled status. -
Validate URL format and allow only HTTPS external URLs for published
links. - Admin can update marketplace URLs at any time.

**WhatsApp** - Use global WhatsApp number by default. - Optional
product-specific message override.

**Merchandising** - Featured toggle. - New Arrival toggle. - Trending
toggle. - Best Seller toggle. - Badge text (optional, admin
controlled). - Sort order.

**SEO** - SEO title. - Meta description. - Open Graph image
(optional). - Canonical URL (system-generated by default; override only
when needed).

### 11.3 Banner / Campaign Management

Admin should be able to: - Add, edit, publish, unpublish, and reorder
banners. - Upload desktop and mobile images. - Set heading, subheading,
CTA label, and CTA destination. - Set campaign start/end dates
(optional). - Set alt text. - Preview before publishing.

Do not show expired or unpublished campaigns.

### 11.4 Site Settings

Admin-configurable settings: - Brand name and logo. - Favicon. -
WhatsApp phone number. - Default WhatsApp message. - Contact email and
phone. - Social profile URLs. - Announcement strip text and
visibility. - Footer description. - Default SEO metadata. - Analytics
measurement ID / integration configuration, if used. - Default share
image.

### 11.5 Admin users and security

For the first release, a single admin role may be sufficient. Keep the
architecture ready for roles such as Super Admin and Content Manager
later.

Requirements: - Secure login. - Password hashing using a modern
standard. - Protected admin routes and server-side authorisation. - Rate
limiting on login. - Secure session handling. - CSRF protection where
applicable. - Input validation and output escaping. - Safe image upload
validation. - Audit trail for important changes if practical. - No
public admin registration. - No hardcoded credentials or secrets in
source code.

## 12. Suggested Data Model

Use relational data structures. Adapt naming to the selected framework
and existing conventions.

### `categories`

-   id
-   name
-   slug (unique)
-   short_description
-   description
-   image
-   banner_image
-   status
-   is_featured
-   sort_order
-   seo_title
-   seo_description
-   created_at
-   updated_at

### `products`

-   id
-   name
-   slug (unique)
-   sku
-   short_description
-   description
-   primary_category_id
-   display_price (nullable)
-   original_price (nullable)
-   currency (default INR)
-   status
-   is_featured
-   is_new_arrival
-   is_trending
-   is_best_seller
-   badge_text
-   sort_order
-   whatsapp_message_override (nullable)
-   seo_title
-   seo_description
-   created_at
-   updated_at
-   published_at (nullable)

### `product_categories`

Use if products can belong to multiple categories: - product_id -
category_id

### `product_images`

-   id
-   product_id
-   image_path
-   alt_text
-   sort_order
-   is_primary
-   created_at

### `product_marketplace_links`

-   id
-   product_id
-   marketplace_name
-   marketplace_url
-   is_enabled
-   sort_order
-   created_at
-   updated_at

### `product_variants` (optional, implement if variant selection is required)

-   id
-   product_id
-   size
-   colour
-   material (optional)
-   attributes (JSON, if justified)
-   sort_order

### `banners`

-   id
-   title
-   subtitle
-   desktop_image
-   mobile_image
-   alt_text
-   cta_label
-   cta_type
-   cta_target
-   status
-   start_at
-   end_at
-   sort_order
-   created_at
-   updated_at

### `site_settings`

-   id
-   setting_key (unique)
-   setting_value
-   updated_at

### `admin_users`

-   id
-   name
-   email (unique)
-   password_hash
-   role
-   status
-   last_login_at
-   created_at
-   updated_at

Use migrations and indexes. Add indexes for product status, category
relations, slugs, sort order, and marketplace-link lookup as
appropriate. Store media in an appropriate object/file storage service
in production rather than storing binary files in the database.

## 13. Technical Implementation Guidance

Antigravity must first inspect the available repository and report: -
Existing framework and version. - Existing frontend/backend
architecture. - Database and ORM. - Authentication approach. - Current
deployment and environment setup. - Existing reusable components and
design assets.

Do not replace the existing stack without a clear technical reason. If
this is a new repository, recommend a maintainable, SEO-friendly stack
with server-rendered or statically generated public pages and a secure
admin backend.

### Architecture principles

-   Separate public storefront from admin functionality.
-   Keep product/category content data-driven.
-   Build reusable components.
-   Use server-side validation for all admin mutations.
-   Generate stable slugs and prevent duplicates.
-   Keep marketplace links as editable records, not hardcoded frontend
    constants.
-   Keep WhatsApp number and message templates in site settings.
-   Use environment variables for secrets and service credentials.
-   Use a clear development/staging/production configuration.
-   Add database migrations and seed data.
-   Provide a README with setup and deployment instructions.

### Image handling

-   Accept appropriate image formats such as JPEG, PNG, and WebP;
    optionally AVIF where supported.
-   Validate MIME type and file size on the server.
-   Generate responsive image sizes.
-   Use modern formats and lazy-load below-the-fold images.
-   Set image width/height or aspect ratio to reduce layout shift.
-   Use descriptive alt text.
-   Do not stretch or distort product images.
-   Preserve a consistent product-card image ratio while allowing a
    suitable gallery layout on detail pages.
-   Ensure the admin can reorder gallery images and choose a primary
    image.

### Performance

Target good Core Web Vitals and practical mobile performance: - Minimise
JavaScript shipped to public pages. - Optimise and compress images. -
Lazy-load non-critical images. - Avoid unnecessary animation
libraries. - Cache public category and product data appropriately. - Use
pagination for large catalogues. - Avoid loading every product image on
the home page. - Provide loading, empty, and error states.

## 14. SEO and Sharing

Implement: - Unique page title and meta description for each category
and product. - Clean, readable URLs. - Canonical URLs. - XML sitemap. -
Robots.txt. - Open Graph and social sharing metadata. - Product and
breadcrumb structured data where accurate and eligible. - Descriptive
image alt text. - Internal links between categories and products. - 404
page and correct redirects when slugs change.

Important: - Do not add fake aggregate ratings, reviews, stock, or offer
data to structured data. - Do not claim that BellaWoman directly sells
or fulfils an order if the transaction occurs on a marketplace. -
Product structured data must reflect genuine information displayed on
the page. Do not mark the site as having an on-site checkout if it does
not.

## 15. Analytics and Event Tracking

Prepare event hooks for: - `view_home` - `view_category` -
`view_product` - `search` - `click_marketplace` - `click_whatsapp` -
`select_product_variant` - `click_campaign`

For outbound clicks, include product ID/slug and marketplace name where
supported. Do not send personal information or WhatsApp message contents
to analytics.

Analytics should be configurable and consent-aware where legally
required. Do not block the site if analytics is not configured.

## 16. Accessibility and Usability

-   Semantic HTML.
-   Keyboard-accessible navigation and controls.
-   Visible focus states.
-   Accessible form labels and validation messages.
-   Sufficient text contrast.
-   Alt text for meaningful images.
-   Respect reduced-motion preferences.
-   Buttons and links must have clear labels.
-   Do not communicate status using colour alone.
-   Ensure sticky elements do not obscure content or controls.

## 17. Responsive Requirements

Design and test at minimum: - Small mobile: 320--375 px. - Standard
mobile: 390--430 px. - Tablet: 768 px. - Laptop: 1024--1440 px. - Large
desktop: 1600 px and above.

Mobile requirements: - Fast initial rendering. - Easy-to-tap category
navigation. - Product images take priority. - No horizontal overflow. -
Product CTA buttons remain easy to access. - WhatsApp links open
correctly on devices with and without the WhatsApp app. - Menus and
filters work well on touch screens.

## 18. Security and Privacy

-   Validate and sanitise all admin inputs.
-   Escape user-generated content on output.
-   Validate external URLs and restrict marketplace links to HTTPS.
-   Prevent unauthorised file uploads and executable file uploads.
-   Enforce file size and type limits.
-   Protect admin endpoints with server-side authentication and
    authorisation.
-   Keep credentials and API keys out of source control.
-   Use HTTPS in production.
-   Provide a privacy policy explaining the data actually collected.
-   Do not collect customer payment details.
-   Do not store WhatsApp conversations unless a separate, explicitly
    approved integration is introduced.

## 19. Execution Phases

### Phase 0 --- Repository Audit and Implementation Plan

Antigravity must: 1. Inspect the repository. 2. Identify the stack and
existing functionality. 3. Identify available logo, brand assets, fonts,
and product imagery. 4. Propose the final architecture and database
schema. 5. Identify risks and missing credentials. 6. Present a concise
implementation plan before major destructive changes.

**Deliverable:** Audit summary and approved implementation plan.

### Phase 1 --- Design System and Public UI

Build: - Global layout and navigation. - Footer. - Responsive design
system. - Home page. - Category listing and category detail pages. -
Product cards. - Product detail page. - About and Contact pages. -
Loading, empty, and 404 states.

Use realistic placeholder content only during development. Clearly label
it and make it easy to replace.

**Deliverable:** Responsive public website using temporary or seeded
content.

### Phase 2 --- Backend and Admin CMS

Build: - Database schema and migrations. - Admin authentication. -
Dashboard. - Category CRUD. - Product CRUD. - Product image gallery
management. - Marketplace URL management. - Banner management. - Site
settings. - Publish/unpublish workflows.

**Deliverable:** Admin can manage the entire public catalogue without
editing code.

### Phase 3 --- Commerce Redirection and WhatsApp

Build and verify: - Meesho redirect. - Amazon redirect. - Support for
additional marketplace links. - Product-specific WhatsApp message
generation. - Variant inclusion in WhatsApp message where applicable. -
General WhatsApp CTA. - External-link safety. - Outbound event tracking.

**Deliverable:** Every published product has working configured actions,
with unavailable actions hidden.

### Phase 4 --- SEO, Performance, QA, and Launch

Complete: - SEO metadata and sitemap. - Structured data where valid. -
Image optimisation. - Analytics configuration. - Accessibility checks. -
Responsive testing. - Security checks. - Broken-link checks. -
Production environment setup. - Backup and deployment documentation.

**Deliverable:** Production-ready website and launch checklist.

## 20. Acceptance Criteria

The project is accepted when all of the following are true:

### Public website

-   [ ] Home page works on mobile, tablet, and desktop.
-   [ ] The visual design feels modern, youthful, and fashion-focused.
-   [ ] Categories are loaded dynamically from the database.
-   [ ] Adding a new category in admin makes it available on the public
    site when published.
-   [ ] Product listings show only published products in published
    categories.
-   [ ] Product detail pages show the correct images and information.
-   [ ] Search and implemented filters work.
-   [ ] Empty and not-found states are handled.

### Marketplace and WhatsApp

-   [ ] Buy Now redirects to the correct configured marketplace URL.
-   [ ] Meesho and Amazon buttons appear only when valid enabled URLs
    exist.
-   [ ] External links open safely.
-   [ ] WhatsApp opens with the correct product name and product page
    URL.
-   [ ] Selected size/colour is included in the WhatsApp message when
    available.
-   [ ] No cart, checkout, or payment gateway is present.
-   [ ] No dead or placeholder CTA is visible.

### Admin

-   [ ] Admin login is secure and there is no public registration.
-   [ ] Admin can create, edit, publish, unpublish, and reorder
    categories.
-   [ ] Admin can create, edit, publish, unpublish, archive, and reorder
    products.
-   [ ] Admin can upload, replace, remove, and reorder product images.
-   [ ] Admin can configure Meesho and Amazon URLs independently for
    each product.
-   [ ] Admin can configure WhatsApp settings.
-   [ ] Admin can manage banners and site settings.
-   [ ] Validation and confirmation are provided for destructive
    actions.
-   [ ] Admin changes appear on the public website correctly.

### Quality

-   [ ] No horizontal overflow on supported mobile widths.
-   [ ] Images are optimised and do not cause major layout shifts.
-   [ ] No critical console errors.
-   [ ] No broken internal or external links in seeded content.
-   [ ] SEO metadata and sitemap are generated.
-   [ ] Admin routes and mutations are protected.
-   [ ] Setup, environment, migration, and deployment steps are
    documented.

## 21. Seed Content for Initial Launch

Create the initial category:

**Category:** Activewear

Do not invent BellaWoman product names, prices, materials, sizes, or
marketplace URLs. If actual catalogue data is not supplied: - Seed only
clearly labelled sample/demo records in development. - Keep production
catalogue empty until real product data is entered. - Do not publish
placeholder marketplace URLs. - Make the first admin workflow easy:
create category, add product, upload images, add marketplace URL,
preview, publish.

## 22. Antigravity Working Instructions

Follow these rules throughout implementation:

1.  Inspect before changing. Do not assume the repository is empty or
    use a different stack without reason.
2.  Build the complete working application, not just static mockups.
3.  Make all category and product content database-driven.
4.  Do not hardcode marketplace URLs, WhatsApp numbers, product data,
    banners, or navigation categories.
5.  Do not implement on-site payments, cart, or checkout.
6.  Do not expose admin functionality or credentials publicly.
7.  Use reusable components and consistent design tokens.
8.  Keep the public experience mobile-first and image-led.
9.  Test every primary CTA with real configured test URLs and a test
    WhatsApp number before launch.
10. Do not fabricate product details, testimonials, ratings, or business
    policies.
11. Keep a record of implementation decisions and any assumptions.
12. After each phase, report completed work, files/modules changed,
    tests run, and outstanding issues.
13. Do not mark a feature complete until it has been tested.
14. Ask for missing brand assets, real product data, marketplace URLs,
    and contact details when they are required for production. Continue
    building independent modules with clearly labelled development
    placeholders in the meantime.

## 23. Final Handover

Provide: - Working source code. - Database migrations and seed
instructions. - Admin access setup instructions (never commit
credentials). - Environment variable example file without secrets. -
Local development setup. - Production deployment guide. - Image
upload/storage configuration. - Admin user guide for categories,
products, marketplace links, banners, and settings. - QA report covering
the acceptance criteria. - List of any third-party services and costs,
if applicable.

------------------------------------------------------------------------

**Product principle:** BellaWoman's website is the brand's discovery and
presentation layer. The customer discovers a product on BellaWoman, then
completes the purchase through Meesho/Amazon or contacts the brand
through WhatsApp. Keep that journey obvious, trustworthy, and
friction-free.
