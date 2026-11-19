import { ProductForm } from "@/components/admin/ProductForm";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CategoryItem } from "@/types";

export default async function NewProductPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const categories = (await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  })) as unknown as CategoryItem[];

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF312C]">
          New Drop
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#06262B] mt-0.5">
          Add New Product
        </h1>
      </div>
      <ProductForm categories={categories} />
    </div>
  );
}
