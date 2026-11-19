import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(coupons);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch coupons" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const code = (body.code || "").trim().toUpperCase();

    if (!code) {
      return NextResponse.json({ error: "Coupon code is required." }, { status: 400 });
    }

    const existing = await prisma.coupon.findUnique({ where: { code } });
    if (existing) {
      return NextResponse.json({ error: `Coupon code "${code}" already exists.` }, { status: 400 });
    }

    const discountValue = Number(body.discountValue);
    if (isNaN(discountValue) || discountValue <= 0) {
      return NextResponse.json({ error: "Discount value must be greater than zero." }, { status: 400 });
    }

    const coupon = await prisma.coupon.create({
      data: {
        code,
        description: body.description?.trim() || null,
        discountType: body.discountType === "fixed" ? "fixed" : "percentage",
        discountValue,
        minOrderAmount: body.minOrderAmount ? Number(body.minOrderAmount) : null,
        maxDiscount: body.maxDiscount ? Number(body.maxDiscount) : null,
        appliesTo: ["category", "product"].includes(body.appliesTo) ? body.appliesTo : "all",
        targetIds: body.targetIds ? JSON.stringify(body.targetIds) : null,
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
        isActive: body.isActive !== false,
      },
    });

    return NextResponse.json(coupon, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create coupon" }, { status: 500 });
  }
}
