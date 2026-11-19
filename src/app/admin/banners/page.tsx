import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BannerManager } from "@/components/admin/BannerManager";
import { BannerItem } from "@/types";

export default async function AdminBannersPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const banners = (await prisma.banner.findMany({
    orderBy: { sortOrder: "asc" },
  })) as unknown as BannerItem[];

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF312C]">
          Campaigns & Editorial
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#06262B] mt-0.5">
          Banner Management
        </h1>
        <p className="text-xs sm:text-sm text-[#71717A] mt-1">
          Manage hero banners and promotional campaign graphics across desktop and mobile.
        </p>
      </div>
      <BannerManager initialBanners={banners} />
    </div>
  );
}
