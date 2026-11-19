import { NextRequest, NextResponse } from "next/server";
import { validateCoupon } from "@/lib/coupons";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { code, productId, categoryId, price } = await request.json();

    const result = await validateCoupon(code, productId, categoryId, price);

    if (!result.valid) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { valid: false, message: error.message || "Failed to process coupon" },
      { status: 500 }
    );
  }
}
