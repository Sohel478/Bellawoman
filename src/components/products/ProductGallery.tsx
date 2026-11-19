"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductImageItem } from "@/types";

interface ProductGalleryProps {
  images: ProductImageItem[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const validImages = images.length > 0 ? images : [{ id: "placeholder", imagePath: "/brand/Bellawomen-default.svg", altText: productName, sortOrder: 0, isPrimary: true }];
  const currentImage = validImages[selectedIndex] || validImages[0];

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6">
      {/* Thumbnails Column / Row */}
      {validImages.length > 1 && (
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[560px] pb-2 lg:pb-0 no-scrollbar">
          {validImages.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-16 h-20 sm:w-20 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                selectedIndex === idx
                  ? "border-[#FF312C] shadow-sm scale-102"
                  : "border-[#EAE6DF] hover:border-[#06262B]/30 opacity-75 hover:opacity-100"
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <Image
                src={img.imagePath}
                alt={img.altText || `${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover object-top"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Feature View */}
      <div className="relative flex-1 aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-[#EAE6DF] shadow-xs">
        <Image
          src={currentImage.imagePath}
          alt={currentImage.altText || productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-top transition-all duration-300"
        />

        {/* Counter indicator */}
        {validImages.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-mono font-medium px-2.5 py-1 rounded-full">
            {selectedIndex + 1} / {validImages.length}
          </div>
        )}
      </div>
    </div>
  );
}
