"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Flame, PlayCircle, MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface MobileBottomNavProps {
  whatsappPhone?: string;
}

export function MobileBottomNav({
  whatsappPhone = "+917249498924",
}: MobileBottomNavProps) {
  const pathname = usePathname();
  const whatsappUrl = buildWhatsAppLink({ phone: whatsappPhone });

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      label: "Collections",
      href: "/categories",
      icon: LayoutGrid,
      isActive: pathname === "/categories" || pathname.startsWith("/category/"),
    },
    {
      label: "Trending",
      href: "/category/activewear?sort=trending",
      icon: Flame,
      isActive: pathname.includes("sort=trending"),
      badge: "Hot",
    },
    {
      label: "Reels",
      href: "/about",
      icon: PlayCircle,
      isActive: pathname === "/about",
    },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-xl border-t border-[#EAE6DF] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-5 h-16 items-center max-w-lg mx-auto px-1">
        {/* Main 4 Nav Links */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`relative flex flex-col items-center justify-center h-full py-1 transition-all duration-200 select-none ${
                active ? "text-[#FF312C]" : "text-[#71717A] hover:text-[#06262B]"
              }`}
            >
              {/* Badge (e.g. Hot) */}
              {item.badge && (
                <span className="absolute top-1.5 right-3 text-[8px] font-black uppercase tracking-wider bg-[#FF312C] text-white px-1 py-0.2 rounded-full shadow-xs animate-pulse">
                  {item.badge}
                </span>
              )}

              {/* Icon */}
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    active ? "scale-110 stroke-[2.5]" : "stroke-[1.8]"
                  }`}
                />
                {active && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#FF312C] rounded-full" />
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] mt-1 transition-all ${
                  active ? "font-bold text-[#FF312C]" : "font-medium text-[#71717A]"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* 5th Action: Instant WhatsApp Concierge Order Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Order on WhatsApp"
          className="flex flex-col items-center justify-center h-full py-1 transition-transform active:scale-95 text-[#25D366]"
        >
          <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md shadow-[#25D366]/30">
            <MessageCircle className="w-5 h-5 fill-current" />
          </div>
          <span className="text-[10px] font-bold text-[#06262B] mt-0.5">Order</span>
        </a>
      </div>
    </nav>
  );
}
