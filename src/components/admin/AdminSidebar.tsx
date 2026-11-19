"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  FolderTree,
  Shirt,
  Image as ImageIcon,
  Settings,
  TicketPercent,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

interface AdminSidebarProps {
  adminName?: string;
}

export function AdminSidebar({ adminName = "Admin" }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Categories", href: "/admin/categories", icon: FolderTree },
    { label: "Products", href: "/admin/products", icon: Shirt },
    { label: "Campaign Banners", href: "/admin/banners", icon: ImageIcon },
    { label: "Discount Coupons", href: "/admin/coupons", icon: TicketPercent },
    { label: "Site Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#06262B] text-white min-h-screen flex flex-col justify-between p-4 border-r border-[#0B3B42]">
      {/* Brand & Navigation */}
      <div className="space-y-6">
        {/* Brand Logo */}
        <div className="p-3 border-b border-white/10">
          <Link href="/admin" className="block">
            <Image
              src="/brand/Bellawomen-Logo-Dark-BG.svg"
              alt="BellaWoman Admin"
              width={160}
              height={32}
              className="h-7 w-auto object-contain"
            />
          </Link>
          <div className="flex items-center gap-1.5 mt-3 text-[10px] font-mono text-[#FF312C] uppercase tracking-wider">
            <ShieldCheck className="w-3 h-3" />
            <span>Store CMS Control</span>
          </div>
        </div>

        {/* Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#FF312C] text-white shadow-sm"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Info & Actions */}
      <div className="pt-6 border-t border-white/10 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-[#FF312C]" />
            <span>View Live Store</span>
          </span>
          <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded">Tab</span>
        </Link>

        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <p className="text-xs font-bold text-white truncate">{adminName}</p>
            <p className="text-[10px] text-white/60">Administrator</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 text-white/60 hover:text-[#FF312C] hover:bg-white/10 rounded-lg transition"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
