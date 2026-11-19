"use client";

import { useState } from "react";
import { MessageCircle, ExternalLink, Check, ShoppingBag, ShieldCheck, Truck, RefreshCw } from "lucide-react";
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
            <span className="tracking-wide">Order on WhatsApp</span>
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
