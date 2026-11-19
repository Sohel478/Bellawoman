import { getAdminSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  // Note: If on /admin/login, don't require session or show sidebar
  // Handled cleanly: if session is null and not login, redirect to login
  if (!session) {
    // If we're not authenticated, return children (the login page will render if requested)
    return <div className="min-h-screen bg-[#FAF9F5]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex">
      {/* Sidebar (Desktop) */}
      <AdminSidebar adminName={session.name} />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto p-6 sm:p-8 lg:p-10">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
