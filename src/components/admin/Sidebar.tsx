"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, FileText, Trophy, Users, Settings, 
  Activity, GraduationCap, GitGraph, Handshake, Layout, 
  Network, School, Mail, UserCog
} from "lucide-react";
import LogoutButton from "./LogoutButton";

// Tipe Data Props
interface SidebarProps {
  user?: { name: string; role: string };
  config?: { logoUrl: string | null; siteName: string };
}

export default function Sidebar({ user, config }: SidebarProps) {
  const pathname = usePathname();

  // Default Value jika props kosong
  const userName = user?.name || "Administrator";
  const userRole = user?.role || "Admin";

  const menuGroups = [
    { 
      label: "Utama",
      items: [
        { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { title: "Pesan Masuk", href: "/admin/pesan", icon: Mail },
      ]
    },
    { 
      label: "Konten Website",
      items: [
        { title: "Kelola Halaman", href: "/admin/halaman", icon: Layout },
        { title: "Berita & Artikel", href: "/admin/berita", icon: FileText },
        { title: "Prestasi", href: "/admin/prestasi", icon: Trophy },
        { title: "Fasilitas", href: "/admin/fasilitas", icon: School },
        { title: "Testimoni", href: "/admin/testimoni", icon: Users },
        { title: "Mitra Kerjasama", href: "/admin/mitra", icon: Handshake },
      ]
    },
    { 
      label: "Akademik",
      items: [
        { title: "Unit Pendidikan", href: "/admin/pendidikan", icon: GraduationCap },
        { title: "Struktur Organisasi", href: "/admin/struktur", icon: Network },
        { title: "Alur Pendaftaran", href: "/admin/alur-pendaftaran", icon: GitGraph },
      ]
    },
    {
      label: "Sistem",
      items: [
        { title: "Statistik Angka", href: "/admin/statistik", icon: Activity },
        { title: "Manajemen User", href: "/admin/users", icon: UserCog },
        { title: "Website Config", href: "/admin/settings", icon: Settings },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-maroon-dark text-white flex-shrink-0 hidden md:flex flex-col font-sans h-screen sticky top-0 shadow-xl z-50">
      
      {/* Header Sidebar (DINAMIS LOGO) */}
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden shrink-0">
           {config?.logoUrl ? (
             <img src={config.logoUrl} alt="Logo" className="w-full h-full object-contain p-1" />
           ) : (
             <span className="text-maroon-dark font-bold font-serif text-xl">M</span>
           )}
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-bold font-serif text-white leading-tight">
            Admin Panel
          </h2>
          <p className="text-[10px] text-white/50 uppercase tracking-wider truncate">
            {config?.siteName || "Mabadi'ul Ihsan"}
          </p>
        </div>
      </div>

      {/* Navigasi Scrollable */}
      <nav className="flex-1 px-3 py-6 space-y-8 overflow-y-auto no-scrollbar">
        {menuGroups.map((group, index) => (
          <div key={index}>
            <div className="px-3 mb-3 text-[10px] font-bold text-white/40 uppercase tracking-widest">
              {group.label}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group
                      ${isActive 
                        ? "bg-gold-primary text-maroon-dark shadow-md font-bold" 
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    <item.icon size={18} className={isActive ? "text-maroon-dark" : "text-white/50 group-hover:text-white"} /> 
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Profile & Logout (DINAMIS USER) */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex items-center gap-3 mb-3 px-2">
           <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-gold-primary shrink-0">
              {userName.substring(0, 2).toUpperCase()}
           </div>
           <div className="overflow-hidden min-w-0">
              <p className="text-sm font-bold text-white truncate">{userName}</p>
              <p className="text-[10px] text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> {userRole}
              </p>
           </div>
        </div>
        <LogoutButton />
      </div>
    </aside>
  );
}