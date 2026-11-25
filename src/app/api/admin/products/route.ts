import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const products = await prisma.product.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        category: true,
        images: { orderBy: { sortOrder: "asc" } },
        marketplaceLinks: { orderBy: { sortOrder: "asc" } },
        variants: { orderBy: { sortOrder: "asc" } },
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const {
      name,
      slug,
      sku,
      shortDescription,
      description,
      primaryCategoryId,
      displayPrice,
      originalPrice,
      currency,
      status,
      isFeatured,
      isNewArrival,
      isTrending,
      isBestSeller,
      badgeText,
      sortOrder,
      whatsappMessageOverride,
      seoTitle,
      seoDescription,
      images, // array of { imagePath, altText, sortOrder, isPrimary }
      marketplaceLinks, // array of { marketplaceName, marketplaceUrl, isEnabled, sortOrder }
      variants, // array of { size, colour, material, sortOrder }
    } = body;

    if (!name || !slug || !primaryCategoryId) {
      return NextResponse.json(
        { error: "Product name, slug, and category are required." },
        { status: 400 }
      );
    }

    // Check slug collision
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "A product with this slug already exists." },
        { status: 400 }
      );
    }

    // Create product in transaction
    const product = await prisma.$transaction(async (tx) => {
      const p = await tx.product.create({
        data: {
          name,
          slug: slug.toLowerCase().trim(),
          sku,
          shortDescription,
          description,
          primaryCategoryId,
          displayPrice: displayPrice ? parseFloat(displayPrice) : null,
          originalPrice: originalPrice ? parseFloat(originalPrice) : null,
          currency: currency || "INR",
          status: status || "draft",
          isFeatured: Boolean(isFeatured),
          isNewArrival: Boolean(isNewArrival),
          isTrending: Boolean(isTrending),
          isBestSeller: Boolean(isBestSeller),
          badgeText,
          sortOrder: Number(sortOrder) || 0,
          whatsappMessageOverride,
          seoTitle,
          seoDescription,
          publishedAt: status === "published" ? new Date() : null,
        },
      });

      // Images
      if (Array.isArray(images) && images.length > 0) {
        await tx.productImage.createMany({
          data: images.map((img: any, idx: number) => ({
            productId: p.id,
            imagePath: img.imagePath,
            altText: img.altText || `${name} view ${idx + 1}`,
            sortOrder: img.sortOrder ?? idx,
            isPrimary: Boolean(img.isPrimary || idx === 0),
          })),
        });
      }

      // Marketplace Links
      if (Array.isArray(marketplaceLinks) && marketplaceLinks.length > 0) {
        await tx.productMarketplaceLink.createMany({
          data: marketplaceLinks.map((link: any, idx: number) => ({
            productId: p.id,
            marketplaceName: link.marketplaceName,
            marketplaceUrl: link.marketplaceUrl,
            isEnabled: link.isEnabled !== false,
            sortOrder: link.sortOrder ?? idx,
          })),
        });
      }

      // Variants
      if (Array.isArray(variants) && variants.length > 0) {
        await tx.productVariant.createMany({
          data: variants.map((v: any, idx: number) => ({
            productId: p.id,
            size: v.size,
            colour: v.colour,
            material: v.material,
            sortOrder: v.sortOrder ?? idx,
          })),
        });
      }

      return p;
    });

    try {
      revalidatePath("/admin/products");
      revalidatePath(`/product/${product.slug}`);
      revalidatePath("/category/activewear");
      revalidatePath("/");
    } catch (e) {
      console.warn("revalidatePath error:", e);
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
