import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const categories = await prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        _count: { select: { products: true } },
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
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

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required." }, { status: 400 });
    }

    // Check slug collision
    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "A category with this slug already exists." }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug: slug.toLowerCase().trim(),
        shortDescription,
        description,
        image,
        bannerImage,
        status: status || "published",
        isFeatured: Boolean(isFeatured),
        sortOrder: Number(sortOrder) || 0,
        seoTitle,
        seoDescription,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Create category error:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
