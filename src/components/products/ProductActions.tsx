"use client";

import { useState } from "react";
import { MessageCircle, ExternalLink, Check, ShoppingBag, ShieldCheck, Truck, RefreshCw, Tag, X, Sparkles, AlertCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { getMarketplaceMeta } from "@/lib/marketplace";
import { getColourSwatch } from "@/lib/colours";
import { ProductItem } from "@/types";

interface ProductActionsProps {
  product: ProductItem;
  whatsappPhone?: string;
  baseUrl?: string;
}

export function ProductActions({
  product,
  whatsappPhone = "+919876543210",
  baseUrl = "https://bellawoman.com",
}: ProductActionsProps) {
  // Extract unique sizes and colours from variants
  const availableSizes = Array.from(
    new Set(product.variants?.map((v) => v.size).filter(Boolean) as string[])
  );
  const availableColours = Array.from(
    new Set(product.variants?.map((v) => v.colour).filter(Boolean) as string[])
  );

  const [selectedSize, setSelectedSize] = useState<string | null>(
    availableSizes[0] || null
  );
  const [selectedColour, setSelectedColour] = useState<string | null>(
    availableColours[0] || null
  );

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    description: string | null;
    discountType: string;
    discountValue: number;
    discountAmount: number;
    finalPrice: number;
    originalPrice: number;
  } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [isCouponOpen, setIsCouponOpen] = useState(false);

  const originalPrice = product.displayPrice || 0;
  const effectivePrice = appliedCoupon ? appliedCoupon.finalPrice : originalPrice;
  const productUrl = `${baseUrl}/product/${product.slug}`;

  const handleApplyCoupon = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (!cleanCode) {
      setCouponError("Please enter a coupon code.");
      return;
    }

    setValidatingCoupon(true);
    setCouponError("");

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: cleanCode,
          productId: product.id,
          categoryId: product.primaryCategoryId,
          price: originalPrice,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.valid) {
        setCouponError(data.message || "Invalid or ineligible coupon code.");
        setAppliedCoupon(null);
      } else {
        setAppliedCoupon(data.coupon);
        setCouponError("");
      }
    } catch (err: any) {
      setCouponError(err.message || "Failed to validate coupon.");
    } finally {
      setValidatingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  // Construct dynamic WhatsApp deep-link including variant and applied coupon
  let dynamicTemplate = product.whatsappMessageOverride;
  if (appliedCoupon) {
    const discountLabel =
      appliedCoupon.discountType === "percentage"
        ? `${appliedCoupon.discountValue}% OFF`
        : `₹${appliedCoupon.discountValue} FLAT OFF`;

    dynamicTemplate =
      `Hello BellaWoman! I would like to order the *{product}* (SKU: {sku}).\n` +
      (selectedSize ? `• Size: *${selectedSize}*\n` : "") +
      (selectedColour ? `• Colour: *${selectedColour}*\n` : "") +
      `• Original Price: *₹${originalPrice.toLocaleString("en-IN")}*\n` +
      `• Applied Coupon: *${appliedCoupon.code}* (${discountLabel} — Saved ₹${appliedCoupon.discountAmount.toLocaleString("en-IN")})\n` +
      `• Final Discounted Price: *₹${effectivePrice.toLocaleString("en-IN")}*\n` +
      `• Product Link: {url}`;
  }

  // Generate dynamic WhatsApp link
  const whatsappUrl = buildWhatsAppLink({
    phone: whatsappPhone,
    productName: product.name,
    sku: product.sku,
    productUrl,
    selectedSize,
    selectedColour,
    price: effectivePrice,
    customTemplate: dynamicTemplate,
  });

  // Only display Meesho / Amazon / Flipkart links if an actual, valid, non-placeholder URL is present
  const enabledLinks =
    product.marketplaceLinks?.filter(
      (l) =>
        l.isEnabled &&
        typeof l.marketplaceUrl === "string" &&
        l.marketplaceUrl.trim().length > 0 &&
        l.marketplaceUrl.startsWith("http") &&
        !l.marketplaceUrl.includes("example")
    ) || [];

  return (
    <div className="space-y-6 pt-2">
      {/* 1. Size Selection */}
      {availableSizes.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#06262B] uppercase tracking-wider">
              Select Size
            </span>
            {selectedSize && (
              <span className="text-[#71717A] font-medium">
                Selected: <strong className="text-[#06262B]">{selectedSize}</strong>
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {availableSizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[52px] h-11 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center border ${
                    isSelected
                      ? "border-[#06262B] bg-[#06262B] text-white shadow-xs"
                      : "border-[#EAE6DF] bg-white text-[#18181B] hover:border-[#06262B]/40"
                  }`}
                  aria-pressed={isSelected}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Colour Selection */}
      {availableColours.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#06262B] uppercase tracking-wider">
              Select Colour
            </span>
            {selectedColour && (
              <span className="text-[#71717A] font-medium">
                Selected: <strong className="text-[#06262B]">{selectedColour}</strong>
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {availableColours.map((colour) => {
              const isSelected = selectedColour === colour;
              const swatch = getColourSwatch(colour);
              return (
                <button
                  key={colour}
                  type="button"
                  onClick={() => setSelectedColour(colour)}
                  className={`h-10 px-4 rounded-full text-xs font-semibold transition-all flex items-center gap-2 border ${
                    isSelected
                      ? "border-[#FF312C] bg-[#FFF2F1] text-[#FF312C] shadow-xs ring-1 ring-[#FF312C]"
                      : "border-[#EAE6DF] bg-white text-[#18181B] hover:border-[#06262B]/40 hover:bg-[#FAF9F5]"
                  }`}
                  aria-pressed={isSelected}
                >
                  {/* Two-tone or solid color swatch */}
                  {swatch.isTwoTone ? (
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-xs flex overflow-hidden flex-shrink-0 -rotate-45"
                      title={colour}
                    >
                      <span className="w-1/2 h-full" style={{ backgroundColor: swatch.primaryColor }} />
                      <span className="w-1/2 h-full" style={{ backgroundColor: swatch.secondaryColor }} />
                    </span>
                  ) : (
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-xs flex-shrink-0"
                      style={{ backgroundColor: swatch.primaryColor }}
                      title={colour}
                    />
                  )}

                  <span>{colour}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#FF312C] ml-0.5" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2.5 Discount Coupon Widget */}
      <div className="pt-1">
        {appliedCoupon ? (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3 animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <Tag className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-mono font-black text-xs text-emerald-950 uppercase tracking-wider">
                    {appliedCoupon.code}
                  </span>
                  <span className="text-[10px] font-bold bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full">
                    {appliedCoupon.discountType === "percentage"
                      ? `${appliedCoupon.discountValue}% OFF`
                      : `₹${appliedCoupon.discountValue} FLAT OFF`}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-800 font-medium truncate mt-0.5">
                  Saved ₹{appliedCoupon.discountAmount.toLocaleString("en-IN")} • Final:{" "}
                  <strong className="text-emerald-950 font-bold">
                    ₹{appliedCoupon.finalPrice.toLocaleString("en-IN")}
                  </strong>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRemoveCoupon}
              className="text-[11px] font-bold text-emerald-800 hover:text-red-600 px-2.5 py-1 rounded-lg hover:bg-emerald-100 transition flex items-center gap-1 flex-shrink-0"
              title="Remove coupon"
            >
              <X className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {!isCouponOpen ? (
              <button
                type="button"
                onClick={() => setIsCouponOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#06262B] hover:text-[#FF312C] transition-colors py-1 group"
              >
                <Tag className="w-3.5 h-3.5 text-[#FF312C] group-hover:rotate-12 transition-transform" />
                <span>Have a discount coupon?</span>
              </button>
            ) : (
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value.toUpperCase());
                        if (couponError) setCouponError("");
                      }}
                      placeholder="Enter promo code (e.g. WELCOME10)"
                      className="w-full h-10 pl-9 pr-3 rounded-xl border border-[#EAE6DF] text-xs font-mono font-bold uppercase placeholder:font-normal placeholder:normal-case focus:outline-none focus:border-[#06262B]"
                      autoFocus
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={validatingCoupon || !couponCode.trim()}
                    className="h-10 px-4 rounded-xl bg-[#06262B] hover:bg-[#FF312C] text-white font-bold text-xs transition disabled:opacity-40 flex-shrink-0"
                  >
                    {validatingCoupon ? "Checking..." : "Apply"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCouponOpen(false);
                      setCouponError("");
                    }}
                    className="h-10 w-10 flex items-center justify-center rounded-xl border border-[#EAE6DF] hover:bg-[#FAF9F5] text-[#71717A] flex-shrink-0"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {couponError && (
                  <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-[11px] rounded-xl flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{couponError}</span>
                  </div>
                )}
              </form>
            )}
          </div>
        )}
      </div>

      {/* 3. Streamlined, Unified Purchase Actions */}
      <div className="space-y-4 pt-2">
        {/* Primary Action: Direct WhatsApp Concierge */}
        <div className="space-y-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full h-15 sm:h-16 px-8 rounded-2xl bg-[#06262B] hover:bg-[#0B3B42] text-white font-extrabold text-base sm:text-lg shadow-md hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all group"
          >
            <MessageCircle className="w-6 h-6 text-[#25D366] group-hover:scale-110 transition-transform flex-shrink-0" />
            <span className="tracking-wide">
              {appliedCoupon ? (
                <span>
                  Order on WhatsApp{" "}
                  <span className="opacity-90 font-medium text-sm sm:text-base">
                    (₹{effectivePrice.toLocaleString("en-IN")})
                  </span>
                </span>
              ) : (
                "Order on WhatsApp"
              )}
            </span>
          </a>
          <p className="text-[11px] sm:text-xs text-center text-[#71717A] font-light">
            Instant size guidance, live stock check & direct concierge ordering
          </p>
        </div>

        {/* Secondary Marketplace Retail Options */}
        {enabledLinks.length > 0 && (
          <div className="space-y-3 pt-1">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#EAE6DF]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#FAF9F5] px-3 text-[10px] font-bold text-[#71717A] tracking-wider">
                  Or buy on marketplace
                </span>
              </div>
            </div>

            <div className={`grid ${enabledLinks.length === 1 ? "grid-cols-1" : "grid-cols-2"} gap-2.5`}>
              {enabledLinks.map((link) => {
                const meta = getMarketplaceMeta(link.marketplaceName);
                return (
                  <a
                    key={link.id}
                    href={link.marketplaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 h-11 px-4 rounded-xl text-xs font-semibold transition-all ${meta.badgeBg}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${meta.brandAccent} flex-shrink-0`} />
                    <span className="truncate">{meta.badgeText}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#71717A] opacity-80 flex-shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Subtle Trust Bar */}
        <div className="pt-3 border-t border-[#EAE6DF] grid grid-cols-3 gap-2 text-[11px] text-[#71717A] text-center">
          <div className="flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF312C] flex-shrink-0" />
            <span>100% Authentic</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <Truck className="w-3.5 h-3.5 text-[#FF312C] flex-shrink-0" />
            <span>Fast Dispatch</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <RefreshCw className="w-3.5 h-3.5 text-[#FF312C] flex-shrink-0" />
            <span>Easy Exchange</span>
          </div>
        </div>
      </div>
    </div>
  );
}
