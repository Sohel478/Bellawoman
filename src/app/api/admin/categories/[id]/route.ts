import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const category = await prisma.category.findUnique({
    where: { id },
    include: { _count: { select: { products: true } } },
  });

  if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(category);
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
      shortDescription,
      description,
      image,
      bannerImage,
      status,
      isFeatured,
      sortOrder,
      seoTitle,
      seoDescription,
    } = body;

    // Slug check if changed
    if (slug) {
      const existing = await prisma.category.findFirst({
        where: { slug, id: { not: id } },
      });
      if (existing) {
        return NextResponse.json({ error: "Slug is already used by another category." }, { status: 400 });
      }
    }

    const updated = await prisma.category.update({
      where: { id },
      data: {
        ...(name ? { name } : {}),
        ...(slug ? { slug: slug.toLowerCase().trim() } : {}),
        shortDescription,
        description,
        image,
        bannerImage,
        status,
        isFeatured: Boolean(isFeatured),
        sortOrder: Number(sortOrder) || 0,
        seoTitle,
        seoDescription,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update category error:", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
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
    // Check if category has products
    const productCount = await prisma.product.count({
      where: { primaryCategoryId: id },
    });

    if (productCount > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete category. It currently has ${productCount} assigned products. Reassign or delete those products first.`,
        },
        { status: 400 }
      );
    }

    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete category error:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
