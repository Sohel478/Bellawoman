import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌸 Starting BellaWoman database seed...");

  // 1. Site Settings
  const settings = [
    { key: "brandName", value: "BellaWoman" },
    { key: "whatsappPhone", value: "+919876543210" },
    {
      key: "announcementText",
      value: "✨ New Drop: The Activewear Edit is Live! Tap any piece to order on WhatsApp or Meesho.",
    },
    { key: "announcementEnabled", value: "true" },
    { key: "contactEmail", value: "support@bellawoman.com" },
    { key: "contactPhone", value: "+91 98765 43210" },
    { key: "instagramUrl", value: "https://instagram.com/bellawoman" },
    {
      key: "footerAbout",
      value:
        "BellaWoman is an expressive, trend-forward fashion and activewear brand designed for effortless movement, confidence, and modern daily wear.",
    },
    { key: "seoTitle", value: "BellaWoman | Trend-Forward Women's Activewear & Fashion" },
    {
      key: "seoDescription",
      value:
        "Explore BellaWoman's latest activewear collection, sports bras, and lifestyle apparel. Buy on Meesho & Amazon, or order directly via WhatsApp.",
    },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { settingKey: s.key },
      update: { settingValue: s.value },
      create: { settingKey: s.key, settingValue: s.value },
    });
  }
  console.log("✅ Site settings seeded.");

  // 2. Admin User
  const passwordHash = await bcrypt.hash("admin123", 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@bellawoman.com" },
    update: { passwordHash },
    create: {
      name: "BellaWoman Admin",
      email: "admin@bellawoman.com",
      passwordHash,
      role: "admin",
      status: "active",
    },
  });
  console.log("✅ Admin user created: admin@bellawoman.com / admin123");

  // 3. Category: Activewear
  const activewear = await prisma.category.upsert({
    where: { slug: "activewear" },
    update: {},
    create: {
      name: "Activewear",
      slug: "activewear",
      shortDescription: "Engineered for movement, sculpted for life.",
      description:
        "Step up your routine with BellaWoman's premier Activewear collection. From ultra-soft seamless bras to high-impact workout tops, every silhouette combines buttery 4-way stretch, sweat-wicking technology, and trendsetting editorial styling.",
      image: "/products/image-001.jpg",
      bannerImage: "/products/image-002.jpg",
      status: "published",
      isFeatured: true,
      sortOrder: 1,
      seoTitle: "Activewear & Sports Bras | BellaWoman Collection",
      seoDescription:
        "Discover premium activewear, workout tops, and high-impact sports bras designed for women on the move.",
    },
  });
  console.log("✅ Category seeded: Activewear");

  // 4. Hero Banner
  await prisma.banner.deleteMany({});
  await prisma.banner.create({
    data: {
      title: "SCULPTED FOR MOVEMENT",
      subtitle:
        "Discover high-performance sports bras and seamless active essentials tailored for effortless confidence.",
      desktopImage: "/products/image-010.jpg",
      mobileImage: "/products/image-011.jpg",
      altText: "BellaWoman Activewear Hero Campaign",
      ctaLabel: "Shop the Collection",
      ctaType: "category",
      ctaTarget: "/category/activewear",
      status: "published",
      sortOrder: 1,
    },
  });
  console.log("✅ Hero Banner seeded.");

  // 5. Products catalog data for the 19 SKUs
  const rawProducts = [
    {
      sku: "BR-1012",
      name: "Contour Racerback Sports Bra",
      slug: "contour-racerback-sports-bra-br1012",
      price: 699,
      origPrice: 1299,
      badge: "New Drop",
      isNew: true,
      isFeatured: false,
      isTrending: false,
      isBest: false,
      images: ["/products/BR-1012-2.jpg"],
    },
    {
      sku: "BR-1013",
      name: "Seamless Ribbed Sculpt Bra",
      slug: "seamless-ribbed-sculpt-bra-br1013",
      price: 799,
      origPrice: 1399,
      badge: "Best Seller",
      isNew: false,
      isFeatured: true,
      isTrending: false,
      isBest: true,
      images: [
        "/products/BR-1013.jpg",
        "/products/BR-1013-1.jpg",
        "/products/BR-1013-2.jpg",
        "/products/BR-1013-3.jpg",
      ],
    },
    {
      sku: "BR-1023",
      name: "V-Neck Strappy Performance Bra",
      slug: "v-neck-strappy-performance-bra-br1023",
      price: 749,
      origPrice: 1349,
      badge: "Trending",
      isNew: false,
      isFeatured: true,
      isTrending: true,
      isBest: false,
      images: [
        "/products/BR-1023.jpg",
        "/products/BR-1023-1.jpg",
        "/products/BR-1023-2.jpg",
        "/products/BR-1023-3.jpg",
      ],
    },
    {
      sku: "BR-1032",
      name: "Impact High-Support Sports Bra",
      slug: "impact-high-support-sports-bra-br1032",
      price: 899,
      origPrice: 1599,
      badge: "High Impact",
      isNew: false,
      isFeatured: false,
      isTrending: false,
      isBest: false,
      images: [
        "/products/BR-1032.jpg",
        "/products/BR-1032-1.jpg",
        "/products/BR-1032-2.jpg",
      ],
    },
    {
      sku: "BR-1034",
      name: "Crisscross Back Studio Crop Bra",
      slug: "crisscross-back-studio-crop-bra-br1034",
      price: 799,
      origPrice: 1449,
      badge: "Trending",
      isNew: false,
      isFeatured: false,
      isTrending: true,
      isBest: false,
      images: [
        "/products/BR-1034.jpg",
        "/products/BR-1034-1.jpg",
        "/products/BR-1034-2.jpg",
      ],
    },
    {
      sku: "BR-1041",
      name: "AirFlex Breathable Mesh Bra",
      slug: "airflex-breathable-mesh-bra-br1041",
      price: 849,
      origPrice: 1499,
      badge: "New Drop",
      isNew: true,
      isFeatured: true,
      isTrending: false,
      isBest: false,
      images: [
        "/products/BR-1041.jpg",
        "/products/BR-1041-1.jpg",
        "/products/BR-1041-2.jpg",
        "/products/BR-1041-3.jpg",
      ],
    },
    {
      sku: "BR-1043",
      name: "Double-Strap Minimalist Sports Bra",
      slug: "double-strap-minimalist-sports-bra-br1043",
      price: 699,
      origPrice: 1199,
      badge: null,
      isNew: false,
      isFeatured: false,
      isTrending: false,
      isBest: false,
      images: [
        "/products/BR-1043.jpg",
        "/products/BR-1043-1.jpg",
        "/products/BR-1043-2.jpg",
        "/products/BR-1043-3.jpg",
      ],
    },
    {
      sku: "BR-1052",
      name: "Zenith Longline Workout Bra",
      slug: "zenith-longline-workout-bra-br1052",
      price: 899,
      origPrice: 1599,
      badge: "Best Seller",
      isNew: false,
      isFeatured: true,
      isTrending: false,
      isBest: true,
      images: [
        "/products/BR-1052.jpg",
        "/products/BR-1052-1.jpg",
        "/products/BR-1052-2.jpg",
        "/products/BR-1052-3.jpg",
      ],
    },
    {
      sku: "BR-1053",
      name: "Sculpt & Stretch Training Bra",
      slug: "sculpt-and-stretch-training-bra-br1053",
      price: 799,
      origPrice: 1399,
      badge: null,
      isNew: false,
      isFeatured: false,
      isTrending: false,
      isBest: false,
      images: [
        "/products/BR-1053.jpg",
        "/products/BR-1053-1.jpg",
        "/products/BR-1053-2.jpg",
        "/products/BR-1053-3.jpg",
      ],
    },
    {
      sku: "BR-1055",
      name: "Aura Padded Cross-Back Bra",
      slug: "aura-padded-cross-back-bra-br1055",
      price: 749,
      origPrice: 1299,
      badge: null,
      isNew: false,
      isFeatured: false,
      isTrending: false,
      isBest: false,
      images: [
        "/products/BR-1055.jpg",
        "/products/BR-1055-1.jpg",
        "/products/BR-1055-2.jpg",
        "/products/BR-1055-3.jpg",
      ],
    },
    {
      sku: "BR-1059",
      name: "Pulse Seamless Workout Top",
      slug: "pulse-seamless-workout-top-br1059",
      price: 849,
      origPrice: 1499,
      badge: "New Arrival",
      isNew: true,
      isFeatured: true,
      isTrending: true,
      isBest: false,
      images: [
        "/products/BR-1059.jpg",
        "/products/BR-1059-1.jpg",
        "/products/BR-1059-2.jpg",
        "/products/BR-1059-3.jpg",
      ],
    },
    {
      sku: "BR-1060",
      name: "Core Hold Compression Bra",
      slug: "core-hold-compression-bra-br1060",
      price: 799,
      origPrice: 1399,
      badge: null,
      isNew: false,
      isFeatured: false,
      isTrending: false,
      isBest: false,
      images: [
        "/products/BR-1060.jpg",
        "/products/BR-1060-1.jpg",
        "/products/BR-1060-2.jpg",
        "/products/BR-1060-3.jpg",
      ],
    },
    {
      sku: "BR-1063",
      name: "FlexMotion Cutout Athletic Bra",
      slug: "flexmotion-cutout-athletic-bra-br1063",
      price: 899,
      origPrice: 1599,
      badge: "Trending",
      isNew: false,
      isFeatured: true,
      isTrending: true,
      isBest: false,
      images: [
        "/products/BR-1063.jpg",
        "/products/BR-1063-1.jpg",
        "/products/BR-1063-2.jpg",
        "/products/BR-1063-3.jpg",
      ],
    },
    {
      sku: "BR-1081",
      name: "HyperLite Seamless Bralette",
      slug: "hyperlite-seamless-bralette-br1081",
      price: 699,
      origPrice: 1199,
      badge: null,
      isNew: false,
      isFeatured: false,
      isTrending: false,
      isBest: false,
      images: [
        "/products/BR-1081.jpg",
        "/products/BR-1081-1.jpg",
        "/products/BR-1081-2.jpg",
        "/products/BR-1081-3.jpg",
      ],
    },
    {
      sku: "BR-1083",
      name: "Active Sculpt Keyhole Bra",
      slug: "active-sculpt-keyhole-bra-br1083",
      price: 799,
      origPrice: 1399,
      badge: "Editor's Pick",
      isNew: false,
      isFeatured: true,
      isTrending: false,
      isBest: false,
      images: [
        "/products/BR-1083.jpg",
        "/products/BR-1083-1.jpg",
        "/products/BR-1083-2.jpg",
        "/products/BR-1083-3.jpg",
      ],
    },
    {
      sku: "BR-1084",
      name: "AeroFit Seamless Strappy Bra",
      slug: "aerofit-seamless-strappy-bra-br1084",
      price: 749,
      origPrice: 1349,
      badge: null,
      isNew: false,
      isFeatured: false,
      isTrending: false,
      isBest: false,
      images: [
        "/products/BR-1084.jpg",
        "/products/BR-1084-1.jpg",
        "/products/BR-1084-2.jpg",
        "/products/BR-1084-3.jpg",
      ],
    },
    {
      sku: "BR-1085",
      name: "PowerForm High-Impact Sports Bra",
      slug: "powerform-high-impact-sports-bra-br1085",
      price: 949,
      origPrice: 1699,
      badge: "Best Seller",
      isNew: false,
      isFeatured: true,
      isTrending: false,
      isBest: true,
      images: [
        "/products/BR-1085.jpg",
        "/products/BR-1085-1.jpg",
        "/products/BR-1085-2.jpg",
        "/products/BR-1085-3.jpg",
      ],
    },
    {
      sku: "BR-1086",
      name: "PureComfort Lounge & Studio Bra",
      slug: "purecomfort-lounge-studio-bra-br1086",
      price: 699,
      origPrice: 1199,
      badge: null,
      isNew: false,
      isFeatured: false,
      isTrending: false,
      isBest: false,
      images: [
        "/products/BR-1086.jpg",
        "/products/BR-1086-1.jpg",
        "/products/BR-1086-2.jpg",
        "/products/BR-1086-3.jpg",
      ],
    },
    {
      sku: "BR-1091",
      name: "Velocity Zip-Front Training Bra",
      slug: "velocity-zip-front-training-bra-br1091",
      price: 999,
      origPrice: 1799,
      badge: "New Drop",
      isNew: true,
      isFeatured: true,
      isTrending: true,
      isBest: false,
      images: [
        "/products/BR-1091.jpg",
        "/products/BR-1091-1.jpg",
        "/products/BR-1091-2.jpg",
        "/products/BR-1091-3.jpg",
      ],
    },
  ];

  const standardSizes = ["XS", "S", "M", "L", "XL"];
  const standardColours = ["Poppy Red", "Mineral Teal", "Charcoal Black", "Blush Rose"];

  let sortIndex = 1;
  for (const item of rawProducts) {
    const product = await prisma.product.upsert({
      where: { slug: item.slug },
      update: {
        name: item.name,
        sku: item.sku,
        displayPrice: item.price,
        originalPrice: item.origPrice,
        status: "published",
        isFeatured: item.isFeatured,
        isNewArrival: item.isNew,
        isTrending: item.isTrending,
        isBestSeller: item.isBest,
        badgeText: item.badge,
        sortOrder: sortIndex,
        publishedAt: new Date(),
      },
      create: {
        name: item.name,
        slug: item.slug,
        sku: item.sku,
        shortDescription: `High-performance ${item.name.toLowerCase()} featuring 4-way stretch compression and breathable comfort.`,
        description: `Crafted from our signature ultra-resilient performance fabric, the ${item.name} offers second-skin support that moves seamlessly with your body. Whether powering through cardio or flowing through yoga, enjoy breathable moisture-wicking technology, anti-chafing seams, and a flattering silhouette that stays put.\n\n• Medium-to-high support profile\n• Removable breathable cups\n• 4-way stretch compression\n• Quick-dry and anti-microbial finish`,
        primaryCategoryId: activewear.id,
        displayPrice: item.price,
        originalPrice: item.origPrice,
        currency: "INR",
        status: "published",
        isFeatured: item.isFeatured,
        isNewArrival: item.isNew,
        isTrending: item.isTrending,
        isBestSeller: item.isBest,
        badgeText: item.badge,
        sortOrder: sortIndex++,
        seoTitle: `${item.name} (${item.sku}) | BellaWoman Activewear`,
        seoDescription: `Shop ${item.name} by BellaWoman. Premium women's workout bra with ultra-soft stretch and contoured support. Order on WhatsApp or buy on Meesho & Amazon.`,
        publishedAt: new Date(),
      },
    });

    // Images
    await prisma.productImage.deleteMany({ where: { productId: product.id } });
    for (let i = 0; i < item.images.length; i++) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          imagePath: item.images[i],
          altText: `${item.name} - View ${i + 1}`,
          sortOrder: i,
          isPrimary: i === 0,
        },
      });
    }

    // Variants (Sizes & Colours)
    await prisma.productVariant.deleteMany({ where: { productId: product.id } });
    let vOrder = 0;
    for (const size of standardSizes) {
      for (const colour of standardColours) {
        await prisma.productVariant.create({
          data: {
            productId: product.id,
            size,
            colour,
            material: "78% Nylon, 22% Spandex",
            sortOrder: vOrder++,
          },
        });
      }
    }

    // Marketplace Links (Meesho & Amazon test links)
    await prisma.productMarketplaceLink.deleteMany({ where: { productId: product.id } });
    await prisma.productMarketplaceLink.createMany({
      data: [
        {
          productId: product.id,
          marketplaceName: "Meesho",
          marketplaceUrl: `https://www.meesho.com/s/p/${item.sku.toLowerCase()}`,
          isEnabled: true,
          sortOrder: 1,
        },
        {
          productId: product.id,
          marketplaceName: "Amazon",
          marketplaceUrl: `https://www.amazon.in/dp/example-${item.sku.toLowerCase()}`,
          isEnabled: true,
          sortOrder: 2,
        },
      ],
    });
  }

  console.log(`✅ Seeded ${rawProducts.length} authentic BellaWoman Activewear products!`);
  console.log("🌸 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
