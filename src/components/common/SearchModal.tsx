"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight } from "lucide-react";
import { ProductItem } from "@/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-[#EAE6DF] flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#EAE6DF] gap-3">
          <Search className="w-5 h-5 text-[#06262B]/50 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by product name, SKU (e.g. BR-1013), or style..."
            autoFocus
            className="w-full text-base bg-transparent focus:outline-none text-[#18181B] placeholder-[#71717A]"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#71717A] hover:text-[#18181B] hover:bg-[#FAF9F5] transition"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto p-4 flex-1">
          {loading && (
            <div className="py-12 text-center text-sm text-[#71717A]">
              Searching BellaWoman catalogue...
            </div>
          )}

          {!loading && query.trim().length >= 2 && results.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-base font-medium text-[#18181B]">No matches found for &quot;{query}&quot;</p>
              <p className="text-xs text-[#71717A] mt-1">Try searching by SKU like BR-1013 or &quot;sports bra&quot;</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {results.map((product) => {
                const primaryImage = product.images?.[0]?.imagePath || "/brand/Bellawomen-default.svg";
                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-[#EAE6DF] hover:border-[#FF312C] hover:bg-[#FFF2F1]/30 transition group"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#FAF9F5] flex-shrink-0">
                      <Image
                        src={primaryImage}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#06262B] truncate group-hover:text-[#FF312C] transition-colors">
                        {product.name}
                      </p>
                      <p className="text-[11px] text-[#71717A] font-mono mt-0.5">{product.sku}</p>
                      {product.displayPrice && (
                        <p className="text-xs font-bold text-[#18181B] mt-1">
                          ₹{product.displayPrice.toLocaleString("en-IN")}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#71717A] group-hover:text-[#FF312C] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </Link>
                );
              })}
            </div>
          )}

          {query.trim().length < 2 && (
            <div className="py-8 text-center text-xs text-[#71717A]">
              Quick suggestions:{" "}
              <button
                onClick={() => setQuery("BR-1013")}
                className="underline hover:text-[#FF312C] mx-1"
              >
                BR-1013
              </button>
              •{" "}
              <button
                onClick={() => setQuery("Seamless")}
                className="underline hover:text-[#FF312C] mx-1"
              >
                Seamless
              </button>
              •{" "}
              <button
                onClick={() => setQuery("Racerback")}
                className="underline hover:text-[#FF312C] mx-1"
              >
                Racerback
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
