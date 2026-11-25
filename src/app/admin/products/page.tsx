import Link from "next/link";
import Image from "next/image";
import { Plus, ExternalLink, Filter } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const products = await prisma.product.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" }, take: 1 },
      marketplaceLinks: { where: { isEnabled: true } },
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF312C]">
            Product Catalogue
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#06262B] mt-0.5">
            Product Management
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] mt-1">
            Total of {products.length} {products.length === 1 ? "style" : "styles"} in the catalogue.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-[#FF312C] hover:bg-[#E02621] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-[#EAE6DF] shadow-xs overflow-hidden">
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
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE6DF]">
              {products.map((p) => {
                const img = p.images[0]?.imagePath || "/brand/Bellawomen-default.svg";
                return (
                  <tr key={p.id} className="hover:bg-[#FAF9F5] transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-[#FAF9F5] border border-[#EAE6DF] flex-shrink-0">
                          <Image
                            src={img}
                            alt={p.name}
                            fill
                            className="object-cover"
                            sizes="44px"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-[#06262B] line-clamp-1">{p.name}</p>
                          {p.badgeText && (
                            <span className="inline-block mt-0.5 text-[9px] font-bold text-[#FF312C] uppercase">
                              {p.badgeText}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 font-mono text-[#71717A]">{p.sku || "—"}</td>
                    <td className="py-3.5 px-6 font-medium text-[#18181B]">{p.category?.name || "—"}</td>
                    <td className="py-3.5 px-6 font-bold text-[#18181B]">
                      {p.displayPrice ? `₹${p.displayPrice.toLocaleString("en-IN")}` : "—"}
                    </td>
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-1.5 flex-wrap">
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
                            : p.status === "draft"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-zinc-100 text-zinc-600"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right space-x-3">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="font-semibold text-[#06262B] hover:text-[#FF312C] transition-colors"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/product/${p.slug}`}
                        target="_blank"
                        className="text-[#71717A] hover:text-[#06262B] transition-colors inline-block"
                        title="View Public Product"
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
