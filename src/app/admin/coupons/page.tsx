import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CouponsManager } from "@/components/admin/CouponsManager";

export const dynamic = "force-dynamic";

export default async function AdminCouponsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const [coupons, categories, products] = await Promise.all([
    prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      where: { status: "published" },
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true },
    }),
    prisma.product.findMany({
      where: { status: "published" },
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true, sku: true, displayPrice: true },
    }),
  ]);

  // Serialize dates to ISO strings for client component
  const serializedCoupons = coupons.map((c) => ({
    ...c,
    startDate: c.startDate ? c.startDate.toISOString() : null,
    endDate: c.endDate ? c.endDate.toISOString() : null,
    createdAt: c.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <CouponsManager
        initialCoupons={serializedCoupons}
        categories={categories}
        products={products}
      />
    </div>
  );
}
