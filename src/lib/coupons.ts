import { prisma } from "./prisma";

export interface CouponValidationResult {
  valid: boolean;
  message: string;
  coupon?: {
    id: string;
    code: string;
    description: string | null;
    discountType: string;
    discountValue: number;
    discountAmount: number;
    finalPrice: number;
    originalPrice: number;
  };
}

export async function validateCoupon(
  rawCode: string,
  productId?: string,
  categoryId?: string,
  price?: number
): Promise<CouponValidationResult> {
  const code = (rawCode || "").trim().toUpperCase();
  if (!code) {
    return { valid: false, message: "Please enter a coupon code." };
  }

  const currentPrice = Number(price) || 0;
  if (currentPrice <= 0) {
    return { valid: false, message: "Item price is unavailable for discount." };
  }

  try {
    const coupon = await prisma.coupon.findUnique({
      where: { code },
    });

    if (!coupon) {
      return { valid: false, message: `Coupon "${code}" is invalid or does not exist.` };
    }

    if (!coupon.isActive) {
      return { valid: false, message: `Coupon "${code}" is no longer active.` };
    }

    const now = new Date();
    if (coupon.startDate && now < coupon.startDate) {
      return { valid: false, message: `Coupon "${code}" has not started yet.` };
    }
    if (coupon.endDate && now > coupon.endDate) {
      return { valid: false, message: `Coupon "${code}" has expired.` };
    }

    if (coupon.minOrderAmount && currentPrice < coupon.minOrderAmount) {
      return {
        valid: false,
        message: `Coupon "${code}" requires a minimum price of ₹${coupon.minOrderAmount.toLocaleString("en-IN")}.`,
      };
    }

    // Applicability checks
    if (coupon.appliesTo === "category") {
      let allowedCategoryIds: string[] = [];
      try {
        allowedCategoryIds = JSON.parse(coupon.targetIds || "[]");
      } catch {
        allowedCategoryIds = [];
      }

      if (!categoryId || !allowedCategoryIds.includes(categoryId)) {
        return {
          valid: false,
          message: `Coupon "${code}" is not applicable to this category.`,
        };
      }
    } else if (coupon.appliesTo === "product") {
      let allowedProductIds: string[] = [];
      try {
        allowedProductIds = JSON.parse(coupon.targetIds || "[]");
      } catch {
        allowedProductIds = [];
      }

      if (!productId || !allowedProductIds.includes(productId)) {
        return {
          valid: false,
          message: `Coupon "${code}" is not applicable to this particular piece.`,
        };
      }
    }

    // Calculate discount amount
    let discountAmount = 0;
    if (coupon.discountType === "percentage") {
      discountAmount = Math.round((currentPrice * coupon.discountValue) / 100);
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
    } else {
      // Fixed amount
      discountAmount = Math.min(coupon.discountValue, currentPrice);
    }

    const finalPrice = Math.max(0, currentPrice - discountAmount);

    return {
      valid: true,
      message: `🎉 Coupon "${coupon.code}" applied! You save ₹${discountAmount.toLocaleString("en-IN")}.`,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        description: coupon.description,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount,
        finalPrice,
        originalPrice: currentPrice,
      },
    };
  } catch (err: any) {
    console.error("Coupon validation error:", err);
    return { valid: false, message: "Error validating coupon. Please try again." };
  }
}
