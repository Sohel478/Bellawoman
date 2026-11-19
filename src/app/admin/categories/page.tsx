import Link from "next/link";
import Image from "next/image";
import { Plus, ExternalLink, ArrowRight, FolderTree } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminCategoriesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      _count: { select: { products: true } },
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF312C]">
            Catalogue Structure
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#06262B] mt-0.5">
            Category Management
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] mt-1">
            Create, reorder, and publish fashion collections for the storefront.
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center gap-2 bg-[#FF312C] hover:bg-[#E02621] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </Link>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-3xl border border-[#EAE6DF] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F5] text-[#71717A] uppercase text-[10px] tracking-wider border-b border-[#EAE6DF]">
              <tr>
                <th className="py-3 px-6">Image</th>
                <th className="py-3 px-6">Category Name</th>
                <th className="py-3 px-6">Slug</th>
                <th className="py-3 px-6">Products</th>
                <th className="py-3 px-6">Sort Order</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE6DF]">
              {categories.map((c) => {
                const img = c.image || "/products/image-001.jpg";
                return (
                  <tr key={c.id} className="hover:bg-[#FAF9F5] transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#FAF9F5] border border-[#EAE6DF]">
                        <Image
                          src={img}
                          alt={c.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-6 font-bold text-[#06262B]">{c.name}</td>
                    <td className="py-3.5 px-6 font-mono text-[#71717A]">/{c.slug}</td>
                    <td className="py-3.5 px-6 font-semibold text-[#18181B]">
                      {c._count.products} {c._count.products === 1 ? "style" : "styles"}
                    </td>
                    <td className="py-3.5 px-6 font-mono text-[#71717A]">{c.sortOrder}</td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          c.status === "published"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right space-x-3">
                      <Link
                        href={`/admin/categories/${c.id}`}
                        className="font-semibold text-[#06262B] hover:text-[#FF312C] transition-colors"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/category/${c.slug}`}
                        target="_blank"
                        className="text-[#71717A] hover:text-[#06262B] transition-colors inline-block"
                        title="View Public Category"
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
