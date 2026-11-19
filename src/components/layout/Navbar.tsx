"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X, MessageCircle, ArrowUpRight } from "lucide-react";
import { SearchModal } from "@/components/common/SearchModal";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { CategoryItem } from "@/types";

interface NavbarProps {
  categories?: CategoryItem[];
  whatsappPhone?: string;
}

export function Navbar({ categories = [], whatsappPhone = "+919876543210" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const whatsappUrl = buildWhatsAppLink({ phone: whatsappPhone });

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#EAE6DF] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -ml-2 text-[#06262B] hover:text-[#FF312C] transition-colors"
                aria-label="Open mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <Link href="/" className="block focus:outline-none">
                <Image
                  src="/brand/Bellawomen-default.svg"
                  alt="BellaWoman"
                  width={180}
                  height={36}
                  priority
                  className="h-7 md:h-9 w-auto object-contain object-left"
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/categories"
                className="text-sm font-semibold text-[#06262B] hover:text-[#FF312C] transition-colors tracking-wide"
              >
                Collections
              </Link>
              {categories.slice(0, 3).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="text-sm font-semibold text-[#06262B] hover:text-[#FF312C] transition-colors tracking-wide"
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/about"
                className="text-sm font-semibold text-[#06262B] hover:text-[#FF312C] transition-colors tracking-wide"
              >
                Our Story
              </Link>
              <Link
                href="/contact"
                className="text-sm font-semibold text-[#06262B] hover:text-[#FF312C] transition-colors tracking-wide"
              >
                Contact
              </Link>
            </nav>

            {/* Action Buttons: Search & WhatsApp */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-[#06262B] hover:text-[#FF312C] hover:bg-white rounded-full transition-all"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 bg-[#FF312C] hover:bg-[#E02621] text-white text-xs md:text-sm font-semibold px-4 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all group"
              >
                <MessageCircle className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>WhatsApp Order</span>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#EAE6DF] bg-[#FAF9F5] px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              <Link
                href="/categories"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-base font-semibold text-[#06262B] hover:bg-white rounded-xl transition"
              >
                All Collections
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 text-base font-medium text-[#06262B] hover:bg-white rounded-xl transition pl-6"
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-base font-semibold text-[#06262B] hover:bg-white rounded-xl transition"
              >
                Our Story
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-base font-semibold text-[#06262B] hover:bg-white rounded-xl transition"
              >
                Contact
              </Link>
            </div>

            <div className="pt-2 border-t border-[#EAE6DF]">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between w-full bg-[#FF312C] text-white font-semibold text-sm px-4 py-3 rounded-xl shadow-sm hover:bg-[#E02621] transition"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </div>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
