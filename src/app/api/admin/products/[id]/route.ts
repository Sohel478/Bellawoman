import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
      marketplaceLinks: { orderBy: { sortOrder: "asc" } },
      variants: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
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
      images,
      marketplaceLinks,
      variants,
    } = body;

    // Check slug collision
    if (slug) {
      const existing = await prisma.product.findFirst({
        where: { slug, id: { not: id } },
      });
      if (existing) {
        return NextResponse.json(
          { error: "Slug is already used by another product." },
          { status: 400 }
        );
      }
    }

    const updated = await prisma.$transaction(async (tx) => {
      const p = await tx.product.update({
        where: { id },
        data: {
          name,
          slug: slug?.toLowerCase().trim(),
          sku,
          shortDescription,
          description,
          primaryCategoryId,
          displayPrice: displayPrice ? parseFloat(displayPrice) : null,
          originalPrice: originalPrice ? parseFloat(originalPrice) : null,
          currency: currency || "INR",
          status,
          isFeatured: Boolean(isFeatured),
          isNewArrival: Boolean(isNewArrival),
          isTrending: Boolean(isTrending),
          isBestSeller: Boolean(isBestSeller),
          badgeText,
          sortOrder: Number(sortOrder) || 0,
          whatsappMessageOverride,
          seoTitle,
          seoDescription,
          publishedAt: status === "published" ? new Date() : undefined,
        },
      });

      // Replace images
      if (Array.isArray(images)) {
        await tx.productImage.deleteMany({ where: { productId: id } });
        if (images.length > 0) {
          await tx.productImage.createMany({
            data: images.map((img: any, idx: number) => ({
              productId: id,
              imagePath: img.imagePath,
              altText: img.altText || `${name} view ${idx + 1}`,
              sortOrder: img.sortOrder ?? idx,
              isPrimary: Boolean(img.isPrimary || idx === 0),
            })),
          });
        }
      }

      // Replace marketplace links
      if (Array.isArray(marketplaceLinks)) {
        await tx.productMarketplaceLink.deleteMany({ where: { productId: id } });
        if (marketplaceLinks.length > 0) {
          await tx.productMarketplaceLink.createMany({
            data: marketplaceLinks.map((link: any, idx: number) => ({
              productId: id,
              marketplaceName: link.marketplaceName,
              marketplaceUrl: link.marketplaceUrl,
              isEnabled: link.isEnabled !== false,
              sortOrder: link.sortOrder ?? idx,
            })),
          });
        }
      }

      // Replace variants
      if (Array.isArray(variants)) {
        await tx.productVariant.deleteMany({ where: { productId: id } });
        if (variants.length > 0) {
          await tx.productVariant.createMany({
            data: variants.map((v: any, idx: number) => ({
              productId: id,
              size: v.size,
              colour: v.colour,
              material: v.material,
              sortOrder: v.sortOrder ?? idx,
            })),
          });
        }
      }

      return p;
    });

    try {
      revalidatePath("/admin/products");
      revalidatePath(`/admin/products/${id}`);
      revalidatePath(`/product/${updated.slug}`);
      revalidatePath("/category/activewear");
      revalidatePath("/");
    } catch (e) {
      console.warn("revalidatePath error:", e);
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.product.delete({ where: { id } });
    try {
      revalidatePath("/admin/products");
      revalidatePath("/category/activewear");
      revalidatePath("/");
    } catch (e) {
      console.warn("revalidatePath error:", e);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
