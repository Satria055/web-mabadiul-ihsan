import { prisma } from "@/lib/prisma";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  // 1. Ambil Config Website (Server Side)
  const config = await prisma.siteConfig.findFirst();
  
  const logoUrl = config?.logoUrl || null;
  const siteName = config?.siteName || "Admin Panel";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        
        {/* Header Logo (Dinamis) */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 overflow-hidden border border-gray-100 shadow-sm">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo Sekolah" className="w-full h-full object-contain p-2" />
            ) : (
              <div className="w-16 h-16 bg-maroon-primary text-white rounded-xl flex items-center justify-center shadow-lg">
                 <span className="font-bold text-2xl">M</span>
              </div>
            )}
          </div>
          <h1 className="font-serif font-bold text-2xl text-maroon-primary">{siteName}</h1>
          <p className="text-gray-500 text-sm">Masuk untuk mengelola website yayasan</p>
        </div>

        {/* Form Login (Client Component) */}
        <LoginForm />

        <div className="mt-8 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Tim IT Mabadi'ul Ihsan | Satria Yudha Pratama, S.Kom.
        </div>
      </div>
    </div>
  );
}