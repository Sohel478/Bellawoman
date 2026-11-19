import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { CategoryItem } from "@/types";

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const category = (await prisma.category.findUnique({
    where: { id },
  })) as unknown as CategoryItem | null;

  if (!category) notFound();

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF312C]">
          Edit Collection
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#06262B] mt-0.5">
          {category.name}
        </h1>
      </div>
      <CategoryForm initialData={category} />
    </div>
  );
}
