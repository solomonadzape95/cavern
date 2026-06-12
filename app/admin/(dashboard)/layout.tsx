import { AdminSidebar } from "@/components/admin/Sidebar";
import { requireAdmin, canAccess } from "@/lib/auth/dal";
import { RESOURCE_NAV } from "@/lib/admin/nav";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const admin = await requireAdmin();
  const links = RESOURCE_NAV.filter((item) => canAccess(admin, item.resource));

  return (
    <div className="font-body flex min-h-screen flex-col md:flex-row">
      <AdminSidebar
        links={links}
        showUsers={admin.role === "superadmin"}
        name={admin.name}
        email={admin.email}
        role={admin.role}
      />

      <main className="bg-paper text-canvas-deep flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
