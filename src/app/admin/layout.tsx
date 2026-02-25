import Sidebar from "@/components/admin/Sidebar";
import AdminMobileMenu from "@/components/admin/AdminMobileMenu";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // 1. Ambil Config Website (untuk Logo Sidebar)
  const config = await prisma.siteConfig.findFirst();

  // 2. Ambil User Login (untuk Profil Sidebar)
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  
  let user = { name: "Administrator", role: "Admin" };

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "rahasia-negara-mabadiul-ihsan-2026");
      const { payload } = await jwtVerify(token, secret);
      user = {
        name: (payload.name as string) || "User",
        role: (payload.role as string) || "Admin",
      };
    } catch (e) {
      // Jika token invalid, biarkan default atau handle redirect di middleware
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
      
      {/* 1. Sidebar Desktop (Kirim Props User & Config) */}
      <Sidebar 
        user={user} 
        config={{
          logoUrl: config?.logoUrl || null,
          siteName: config?.siteName || "Mabadi'ul Ihsan"
        }} 
      />

      {/* 2. Mobile Menu (Hidden on Desktop) */}
      <AdminMobileMenu />
      
      {/* 3. Area Konten Utama */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
           {children}
        </main>
      </div>

    </div>
  );
}