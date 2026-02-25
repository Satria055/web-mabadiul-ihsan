"use client";

import { logoutAction } from "@/actions/auth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton({ isMobile = false }: { isMobile?: boolean }) {
  const router = useRouter();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logoutAction(); // Server action hapus cookie
    router.push("/login"); // Client redirect
    router.refresh();
  };

  if (isMobile) {
    return (
      <button 
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 text-sm font-bold text-red-200 hover:text-white hover:bg-red-900/50 w-full px-4 py-3 rounded-lg transition-colors"
      >
        <LogOut size={16} /> Keluar Sistem
      </button>
    );
  }

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center justify-center gap-2 text-xs font-bold text-red-200 hover:text-white hover:bg-red-600/80 transition-all w-full px-4 py-2 rounded-lg bg-red-900/20"
    >
      <LogOut size={14} /> Keluar Sistem
    </button>
  );
}