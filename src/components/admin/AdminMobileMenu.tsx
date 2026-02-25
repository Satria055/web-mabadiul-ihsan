"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  LayoutDashboard, FileText, Trophy, Users, Settings, LogOut, 
  Activity, GraduationCap, GitGraph, Handshake, Layout, Network, 
  School, Mail, UserCog, Menu, X 
} from "lucide-react";

export default function AdminMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
        // Galeri DIHAPUS
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
    <>
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-gold-primary rounded-md flex items-center justify-center text-maroon-dark font-bold font-serif">
              M
           </div>
           <span className="font-bold text-gray-800 text-sm">Admin Panel</span>
        </div>
        <button onClick={() => setIsOpen(true)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <Menu size={24} />
        </button>
      </div>

      {isOpen && <div className="fixed inset-0 bg-black/50 z-50 md:hidden backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />}

      <div className={`fixed top-0 left-0 h-full w-72 bg-maroon-dark text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-5 flex items-center justify-between border-b border-white/10">
           <h2 className="font-serif font-bold text-lg text-gold-primary">Menu Admin</h2>
           <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white"><X size={24} /></button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {menuGroups.map((group, index) => (
            <div key={index}>
              <div className="px-2 mb-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">{group.label}</div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link 
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-all ${
                        isActive ? "bg-gold-primary text-maroon-dark font-bold shadow-md" : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <item.icon size={18} className={isActive ? "text-maroon-dark" : "text-white/50"} /> {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 bg-black/20">
           <Link href="/api/auth/signout" className="flex items-center justify-center gap-2 text-sm font-bold text-red-200 hover:text-white hover:bg-red-900/50 w-full px-4 py-3 rounded-lg transition-colors">
             <LogOut size={16} /> Keluar Sistem
           </Link>
        </div>
      </div>
    </>
  );
}