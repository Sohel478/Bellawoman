import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const banners = await prisma.banner.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(banners);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch banners" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const {
      title,
      subtitle,
      desktopImage,
      mobileImage,
      altText,
      ctaLabel,
      ctaType,
      ctaTarget,
      status,
      sortOrder,
    } = body;

    if (!title || !desktopImage) {
      return NextResponse.json(
        { error: "Title and desktop image are required." },
        { status: 400 }
      );
    }

    const banner = await prisma.banner.create({
      data: {
        title,
        subtitle,
        desktopImage,
        mobileImage: mobileImage || desktopImage,
        altText,
        ctaLabel: ctaLabel || "Shop Now",
        ctaType: ctaType || "category",
        ctaTarget: ctaTarget || "/category/activewear",
        status: status || "published",
        sortOrder: Number(sortOrder) || 0,
      },
    });

    return NextResponse.json(banner);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create banner" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) return NextResponse.json({ error: "Banner ID required" }, { status: 400 });

    const updated = await prisma.banner.update({
      where: { id },
      data: {
        ...data,
        sortOrder: data.sortOrder ? Number(data.sortOrder) : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update banner" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Banner ID required" }, { status: 400 });

  try {
    await prisma.banner.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete banner" }, { status: 500 });
  }
}
