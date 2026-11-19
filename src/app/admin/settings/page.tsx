import { getSiteSettings } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF312C]">
          System & Configuration
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#06262B] mt-0.5">
          Site Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#71717A] mt-1">
          Configure WhatsApp concierge integration, announcement banner, and contact information.
        </p>
      </div>
      <SettingsForm initialSettings={settings} />
    </div>
  );
}
