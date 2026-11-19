import { CategoryForm } from "@/components/admin/CategoryForm";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NewCategoryPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF312C]">
          New Collection
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#06262B] mt-0.5">
          Create Category
        </h1>
      </div>
      <CategoryForm />
    </div>
  );
}
