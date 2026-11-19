import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { ProductForm } from "@/components/admin/ProductForm";
import { ProductItem, CategoryItem } from "@/types";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        marketplaceLinks: { orderBy: { sortOrder: "asc" } },
        variants: { orderBy: { sortOrder: "asc" } },
      },
    }),
    prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  if (!product) notFound();

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF312C]">
          Product Editor
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#06262B] mt-0.5">
          {product.name}
        </h1>
      </div>
      <ProductForm
        initialData={product as unknown as ProductItem}
        categories={categories as unknown as CategoryItem[]}
      />
    </div>
  );
}
