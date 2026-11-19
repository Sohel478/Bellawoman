import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  Shirt,
  FolderTree,
  AlertCircle,
  Plus,
  ExternalLink,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [
    publishedCount,
    draftCount,
    categoryCount,
    productsMissingLinks,
    recentProducts,
  ] = await Promise.all([
    prisma.product.count({ where: { status: "published" } }),
    prisma.product.count({ where: { status: "draft" } }),
    prisma.category.count({ where: { status: "published" } }),
    prisma.product.count({
      where: {
        status: "published",
        marketplaceLinks: { none: { isEnabled: true } },
      },
    }),
    prisma.product.findMany({
      take: 6,
      orderBy: { updatedAt: "desc" },
      include: {
        images: { orderBy: { sortOrder: "asc" }, take: 1 },
        category: true,
        marketplaceLinks: { where: { isEnabled: true } },
      },
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE6DF] shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF312C]">
            Operational Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#06262B] mt-0.5">
            Welcome back, {session.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] mt-1">
            BellaWoman Catalogue Management & Marketplace Dispatch Center.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 bg-[#FF312C] hover:bg-[#E02621] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
          <Link
            href="/admin/categories/new"
            className="inline-flex items-center gap-2 bg-[#06262B] hover:bg-[#0B3B42] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </Link>
        </div>
      </div>

      {/* Operational Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Published Products */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE6DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#71717A]">
            <span className="text-xs font-semibold uppercase tracking-wider">Published</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-[#06262B]">{publishedCount}</p>
          <p className="text-[11px] text-[#71717A]">Active in storefront</p>
        </div>

        {/* Draft Products */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE6DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#71717A]">
            <span className="text-xs font-semibold uppercase tracking-wider">Drafts</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-[#06262B]">{draftCount}</p>
          <p className="text-[11px] text-[#71717A]">Pending review/assets</p>
        </div>

        {/* Active Categories */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE6DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#71717A]">
            <span className="text-xs font-semibold uppercase tracking-wider">Categories</span>
            <FolderTree className="w-4 h-4 text-[#FF312C]" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-[#06262B]">{categoryCount}</p>
          <p className="text-[11px] text-[#71717A]">Live collections</p>
        </div>

        {/* Missing Marketplace Links */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE6DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#71717A]">
            <span className="text-xs font-semibold uppercase tracking-wider">Missing Links</span>
            <AlertCircle className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-rose-600">
            {productsMissingLinks}
          </p>
          <p className="text-[11px] text-[#71717A]">WhatsApp-only fallback</p>
        </div>
      </div>

      {/* Recent Catalog Activity */}
      <div className="bg-white rounded-3xl border border-[#EAE6DF] shadow-xs overflow-hidden">
        <div className="p-6 border-b border-[#EAE6DF] flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#06262B]">Recent Products</h2>
            <p className="text-xs text-[#71717A]">Latest catalogue additions and updates</p>
          </div>
          <Link
            href="/admin/products"
            className="text-xs font-semibold text-[#FF312C] hover:underline flex items-center gap-1"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F5] text-[#71717A] uppercase text-[10px] tracking-wider border-b border-[#EAE6DF]">
              <tr>
                <th className="py-3 px-6">Product</th>
                <th className="py-3 px-6">SKU</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Marketplace Links</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE6DF]">
              {recentProducts.map((p) => {
                const img = p.images[0]?.imagePath || "/brand/Bellawomen-default.svg";
                return (
                  <tr key={p.id} className="hover:bg-[#FAF9F5] transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#FAF9F5] flex-shrink-0 border border-[#EAE6DF]">
                          <Image
                            src={img}
                            alt={p.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <span className="font-semibold text-[#06262B] line-clamp-1">
                          {p.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 font-mono text-[#71717A]">{p.sku || "—"}</td>
                    <td className="py-3.5 px-6 text-[#71717A]">{p.category?.name || "—"}</td>
                    <td className="py-3.5 px-6 font-bold text-[#18181B]">
                      {p.displayPrice ? `₹${p.displayPrice.toLocaleString("en-IN")}` : "—"}
                    </td>
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-1.5">
                        {p.marketplaceLinks.map((l) => (
                          <span
                            key={l.id}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#06262B]/5 text-[#06262B]"
                          >
                            {l.marketplaceName}
                          </span>
                        ))}
                        {p.marketplaceLinks.length === 0 && (
                          <span className="text-[10px] text-rose-500 font-medium">None</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          p.status === "published"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="font-semibold text-[#06262B] hover:text-[#FF312C] transition-colors mr-3"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/product/${p.slug}`}
                        target="_blank"
                        className="text-[#71717A] hover:text-[#06262B] transition-colors inline-block"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5 inline" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
