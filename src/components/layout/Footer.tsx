import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Mail, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface FooterProps {
  whatsappPhone?: string;
  contactEmail?: string;
  instagramUrl?: string;
  footerAbout?: string;
}

export function Footer({
  whatsappPhone = "+919876543210",
  contactEmail = "support@bellawoman.com",
  instagramUrl = "https://instagram.com/bellawoman",
  footerAbout = "BellaWoman is an expressive, trend-forward fashion and activewear brand designed for effortless movement, confidence, and modern daily wear.",
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = buildWhatsAppLink({ phone: whatsappPhone });

  return (
    <footer className="bg-[#06262B] text-white pt-16 pb-12 border-t border-[#0B3B42]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="block">
              <Image
                src="/brand/Bellawomen-Logo-Dark-BG.svg"
                alt="BellaWoman"
                width={170}
                height={34}
                className="h-8 w-auto object-contain object-left"
              />
            </Link>
            <p className="text-sm text-white/70 leading-relaxed font-light">
              {footerAbout}
            </p>
            <div className="pt-2 flex items-center gap-4">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF312C] flex items-center justify-center transition-colors text-white"
                aria-label="Instagram profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-colors text-white"
                aria-label="WhatsApp chat"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FF312C]">Explore</h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/category/activewear" className="hover:text-white transition-colors">
                  Activewear Drops
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Commerce Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FF312C]">How to Shop</h4>
            <div className="space-y-3 text-xs text-white/70 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#FF312C] mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Marketplace Redirection:</strong> Click &quot;Buy Now&quot; to securely check out on trusted platforms like Meesho & Amazon.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] mt-0.5 flex-shrink-0" />
                <span>
                  <strong>WhatsApp Concierge:</strong> Chat directly with our stylists to confirm availability, size fit, and personal orders.
                </span>
              </div>
            </div>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FF312C]">Support</h4>
            <div className="space-y-2.5 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF312C] flex-shrink-0" />
                <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors truncate">
                  {contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF312C] flex-shrink-0" />
                <span>{whatsappPhone}</span>
              </div>
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 hover:bg-[#FF312C] text-white px-3.5 py-2 rounded-full transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {currentYear} BellaWoman. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/admin/login" className="hover:text-white/80 text-white/40 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
