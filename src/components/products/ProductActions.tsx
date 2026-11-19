"use client";

import { useState } from "react";
import { MessageCircle, ExternalLink, Check, ShoppingBag } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { getMarketplaceMeta } from "@/lib/marketplace";
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

  const productUrl = `${baseUrl}/product/${product.slug}`;

  // Generate dynamic WhatsApp link including user's selected variant
  const whatsappUrl = buildWhatsAppLink({
    phone: whatsappPhone,
    productName: product.name,
    sku: product.sku,
    productUrl,
    selectedSize,
    selectedColour,
    price: product.displayPrice,
    customTemplate: product.whatsappMessageOverride,
  });

  const enabledLinks = product.marketplaceLinks?.filter((l) => l.isEnabled) || [];

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
              <span className="text-[#71717A] font-medium">Selected: <strong className="text-[#06262B]">{selectedSize}</strong></span>
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
                  className={`min-w-[48px] h-11 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center border ${
                    isSelected
                      ? "border-[#06262B] bg-[#06262B] text-white shadow-sm"
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
              <span className="text-[#71717A] font-medium">Selected: <strong className="text-[#06262B]">{selectedColour}</strong></span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {availableColours.map((colour) => {
              const isSelected = selectedColour === colour;
              return (
                <button
                  key={colour}
                  type="button"
                  onClick={() => setSelectedColour(colour)}
                  className={`h-9 px-3.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? "border-[#FF312C] bg-[#FFF2F1] text-[#FF312C] font-semibold ring-1 ring-[#FF312C]"
                      : "border-[#EAE6DF] bg-white text-[#71717A] hover:border-[#06262B]/30 hover:text-[#18181B]"
                  }`}
                  aria-pressed={isSelected}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#FF312C]" />}
                  <span>{colour}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Action Buttons Section */}
      <div className="space-y-3 pt-2">
        {/* Marketplace Buttons */}
        {enabledLinks.length > 0 && (
          <div className="space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
              Instant Checkout via Marketplace
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {enabledLinks.map((link) => {
                const meta = getMarketplaceMeta(link.marketplaceName);
                return (
                  <a
                    key={link.id}
                    href={link.marketplaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 h-12 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs hover:shadow-md ${meta.badgeBg}`}
                  >
                    <ShoppingBag className="w-4 h-4 flex-shrink-0" />
                    <span>{meta.badgeText}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80 flex-shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* WhatsApp Order Action */}
        <div className="pt-1">
          {enabledLinks.length > 0 && (
            <div className="text-center text-xs text-[#71717A] my-2 font-medium">
              — or talk directly with our stylists —
            </div>
          )}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full h-13 px-6 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all"
          >
            <MessageCircle className="w-5 h-5 flex-shrink-0" />
            <span>Order on WhatsApp</span>
          </a>
          <p className="text-[11px] text-center text-[#71717A] mt-2 leading-relaxed">
            ✨ Chat with BellaWoman concierge to confirm your custom fit, sizes, and instant dispatch.
          </p>
        </div>
      </div>
    </div>
  );
}
