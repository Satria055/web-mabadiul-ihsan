"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Phone, Facebook, Instagram, Youtube, MapPin, Search, Menu, X, ChevronDown, ArrowRight, Grid } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// --- DATA QUICK LINKS ---
const QUICK_LINKS = [
  { label: "E-Learning", href: "https://www.quipper.com/id/" },
  { label: "E-Perpus", href: "#" },
  { label: "E-Journal", href: "#" },
  { 
    label: "Siakad", 
    href: "#", 
    children: [
      { label: "Siakad SMP", href: "https://smp.ponpesmiha.online/" }, 
      { label: "Siakad MTs", href: "https://mts.ponpesmiha.online/" },
      { label: "Siakad SMA", href: "https://sma.ponpesmiha.online/" },
      { label: "Siakad MA", href: "https://ma.ponpesmiha.online/" },
      { label: "Siakad SMK", href: "https://smk.ponpesmiha.online/" },
    ]
  },
  { label: "Silabor", href: "https://silabor.my.id/" },
];

type MenuItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const MENU_ITEMS: MenuItem[] = [
  { label: "Beranda", href: "/" },
  { 
    label: "Profil", 
    children: [
      { label: "Profil Yayasan", href: "/profil/yayasan" },
      { label: "Struktur Organisasi", href: "/profil/struktur" },
      { label: "Fasilitas", href: "/profil/fasilitas" },
      { label: "Kemitraan", href: "/kemitraan" },
      { label: "Testimoni", href: "/testimoni" },
    ]
  },
  { 
    label: "Lembaga Pendidikan", 
    children: [
      { label: "Pendidikan Formal", href: "/pendidikan/formal" },
      { label: "Pendidikan Non Formal", href: "/pendidikan/non-formal" },
      { label: "Pesantren", href: "/pendidikan/pesantren" },
    ]
  },
  { label: "Prestasi", href: "/prestasi" },
  { label: "Berita & Informasi", href: "/berita" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kontak", href: "/kontak" },
];

type HeaderProps = {
  config: any;
  logoUrl: string;
};

export default function HeaderClient({ config, logoUrl }: HeaderProps) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State untuk Mobile Accordion
  const [activeMobileSubMenu, setActiveMobileSubMenu] = useState<number | null>(null);
  const [mobileQuickLinkDropdown, setMobileQuickLinkDropdown] = useState<string | null>(null); // State Baru
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  const toggleMobileSubMenu = (index: number) => {
    setActiveMobileSubMenu(activeMobileSubMenu === index ? null : index);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = new FormData(e.currentTarget).get("q");
    if (query) {
      setIsSearchOpen(false);
      router.push(`/pencarian?q=${query}`);
    }
  };

  return (
    <>
      {/* === 1. TOPBAR === */}
      <div className="bg-maroon-dark text-white text-[11px] md:text-xs py-2 relative z-50 transition-all duration-300 border-b border-white/10">
        <div className="container-custom flex flex-col lg:flex-row justify-between items-center gap-2">
          
          <div className="flex items-center gap-4 opacity-90">
            <div className="flex items-center gap-1">
              <MapPin size={12} className="text-gold-primary" />
              <span className="truncate max-w-[200px]">{config?.address?.split(',')[0] || "Banyuwangi"}</span>
            </div>
            <div className="hidden md:flex items-center gap-1">
              <Phone size={12} className="text-gold-primary" />
              <span>{config?.phone || "-"}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
             {/* Quick Links Desktop */}
             <div className="hidden lg:flex items-center gap-4 border-r border-white/20 pr-4">
                {QUICK_LINKS.map((link, idx) => (
                  link.children ? (
                    <div key={idx} className="relative group h-full flex items-center">
                       <button className="hover:text-gold-primary transition-colors font-medium flex items-center gap-1 cursor-pointer py-1">
                          {link.label} <ChevronDown size={10} className="group-hover:rotate-180 transition-transform"/>
                       </button>
                       <div className="absolute top-full right-0 w-36 bg-white shadow-xl rounded-md py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform translate-y-2 group-hover:translate-y-0 border-t-2 border-gold-primary">
                          {link.children.map((subLink, sIdx) => (
                             <Link key={sIdx} href={subLink.href} target="_blank" className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-maroon-primary text-left border-b border-gray-50 last:border-0 font-medium">
                               {subLink.label}
                             </Link>
                          ))}
                       </div>
                    </div>
                  ) : (
                    <Link key={idx} href={link.href} target="_blank" className="hover:text-gold-primary transition-colors font-medium">
                      {link.label}
                    </Link>
                  )
                ))}
             </div>

             <div className="flex items-center gap-3">
                {config?.facebook && <Link href={config.facebook} target="_blank" className="hover:text-gold-primary"><Facebook size={14} /></Link>}
                {config?.instagram && <Link href={config.instagram} target="_blank" className="hover:text-gold-primary"><Instagram size={14} /></Link>}
                {config?.youtube && <Link href={config.youtube} target="_blank" className="hover:text-gold-primary"><Youtube size={14} /></Link>}
             </div>
          </div>
        </div>
      </div>

      {/* === 2. NAVBAR === */}
      <nav className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 w-full transition-all duration-300 ease-in-out ${isScrolled ? "py-2 shadow-md" : "py-4 md:py-5 shadow-sm"}`}>
        <div className="container-custom flex justify-between items-center relative">
          
          <Link href="/" className="block group">
            <div className={`relative transition-all duration-300 ease-in-out ${isScrolled ? "h-10 md:h-12" : "h-12 md:h-16"}`}>
              <img src={logoUrl} alt="Logo" className="h-full w-auto object-contain object-left" />
            </div>
          </Link>

          {/* Menu Desktop */}
          <div className={`hidden xl:flex items-center gap-6 text-sm font-bold text-gray-600 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-300`}>
            {MENU_ITEMS.map((item, index) => (
              <div key={index} className="relative group h-full flex items-center">
                {item.children ? (
                  <>
                    <button className="flex items-center gap-1 hover:text-maroon-primary transition-colors py-4">
                      {item.label} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300"/>
                    </button>
                    <div className="absolute top-full left-0 w-56 bg-white shadow-xl border-t-4 border-gold-primary rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-50">
                      {item.children.map((subItem, subIndex) => (
                        <Link key={subIndex} href={subItem.href} className="block px-6 py-3 text-sm hover:bg-gray-50 hover:text-maroon-primary transition-colors border-b border-gray-50 last:border-0">
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link href={item.href!} className={`hover:text-maroon-primary transition-colors ${pathname === item.href ? "text-maroon-primary" : ""}`}>
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Search Overlay */}
          {isSearchOpen && (
            <div className="absolute inset-0 z-50 bg-white flex items-center px-4 animate-in fade-in slide-in-from-top-2 duration-300">
               <form onSubmit={handleSearch} className="w-full relative max-w-3xl mx-auto flex items-center gap-2">
                  <Search className="text-gray-400" size={20} />
                  <input ref={searchInputRef} type="text" name="q" placeholder="Cari berita, prestasi, atau halaman..." className="flex-1 text-lg font-medium text-gray-800 placeholder:text-gray-300 outline-none bg-transparent" autoComplete="off" />
                  <button type="button" onClick={() => setIsSearchOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <X size={18} className="text-gray-500" />
                  </button>
               </form>
            </div>
          )}

          <div className="flex items-center gap-3">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${isSearchOpen ? 'bg-gray-100 text-maroon-primary' : 'text-gray-500 hover:text-maroon-primary'}`}>
              <Search size={isScrolled ? 20 : 22} />
            </button>
            <Link href={config?.registrationUrl || "/pendaftaran"} className={`hidden md:inline-block bg-maroon-primary text-white rounded-full font-bold shadow-md hover:bg-maroon-dark transition-all ${isScrolled ? "px-5 py-2 text-xs" : "px-6 py-2.5 text-sm"}`}>
              Daftar Sekarang
            </Link>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="xl:hidden p-2 text-gray-700 hover:text-maroon-primary">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DRAWER (UPDATED) */}
        {isMobileMenuOpen && (
           <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl p-0 flex flex-col xl:hidden animate-in slide-in-from-top-2 max-h-[80vh] overflow-y-auto">
              
              <div className="p-4 border-b border-gray-100">
                 <form onSubmit={handleSearch} className="relative">
                    <input type="text" name="q" placeholder="Pencarian..." className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 pl-10 focus:ring-2 focus:ring-maroon-primary outline-none" />
                    <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                 </form>
              </div>

              {/* QUICK LINKS MOBILE (UPDATED LOGIC) */}
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                  {/* Grid Utama */}
                  <div className="grid grid-cols-3 gap-2">
                    {QUICK_LINKS.map((link, idx) => (
                      link.children ? (
                        // Jika punya anak (Siakad), jadi tombol toggle
                        <button 
                          key={idx}
                          onClick={() => setMobileQuickLinkDropdown(mobileQuickLinkDropdown === link.label ? null : link.label)}
                          className={`text-[10px] font-bold text-center p-2 border rounded transition-all ${mobileQuickLinkDropdown === link.label ? 'bg-maroon-primary text-white border-maroon-primary shadow-md' : 'bg-white text-gray-700 hover:border-maroon-primary'}`}
                        >
                          {link.label} {mobileQuickLinkDropdown === link.label ? '▲' : '▼'}
                        </button>
                      ) : (
                        // Link Biasa
                        <Link key={idx} href={link.href} className="text-[10px] font-bold text-center p-2 bg-white border rounded hover:text-maroon-primary hover:border-maroon-primary transition-colors text-gray-700">
                          {link.label}
                        </Link>
                      )
                    ))}
                  </div>

                  {/* Panel Sub-Menu (Muncul di bawah grid saat Siakad diklik) */}
                  {mobileQuickLinkDropdown && (
                    <div className="mt-3 bg-white border border-gray-200 rounded-lg p-3 animate-in fade-in zoom-in-95 duration-200 shadow-sm">
                       <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                            Pilih Unit {mobileQuickLinkDropdown}
                          </p>
                          <button onClick={() => setMobileQuickLinkDropdown(null)} className="text-gray-400 hover:text-red-500"><X size={12}/></button>
                       </div>
                       <div className="grid grid-cols-2 gap-2">
                          {QUICK_LINKS.find(l => l.label === mobileQuickLinkDropdown)?.children?.map((sub, sIdx) => (
                             <Link 
                               key={sIdx} 
                               href={sub.href}
                               target="_blank"
                               className="text-xs text-center p-2 bg-gray-50 hover:bg-gold-primary hover:text-maroon-dark rounded transition-colors font-medium border border-gray-100 flex items-center justify-center gap-1"
                             >
                               {sub.label}
                             </Link>
                          ))}
                       </div>
                    </div>
                  )}
              </div>

              {/* Main Menu Items */}
              {MENU_ITEMS.map((item, index) => (
                <div key={index} className="border-b border-gray-50 last:border-0">
                  {item.children ? (
                    <div>
                      <button onClick={() => toggleMobileSubMenu(index)} className="w-full flex justify-between items-center px-6 py-4 text-left font-bold text-gray-700 hover:bg-gray-50">
                        {item.label}
                        <ChevronDown size={16} className={`transition-transform duration-300 ${activeMobileSubMenu === index ? "rotate-180" : ""}`} />
                      </button>
                      <div className={`bg-gray-50 overflow-hidden transition-all duration-300 ${activeMobileSubMenu === index ? "max-h-96" : "max-h-0"}`}>
                        {item.children.map((subItem, subIndex) => (
                          <Link key={subIndex} href={subItem.href} onClick={() => setIsMobileMenuOpen(false)} className="block px-10 py-3 text-sm text-gray-600 hover:text-maroon-primary border-l-4 border-transparent hover:border-gold-primary">
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link href={item.href!} onClick={() => setIsMobileMenuOpen(false)} className={`block px-6 py-4 font-bold ${pathname === item.href ? "text-maroon-primary bg-gray-50" : "text-gray-700 hover:bg-gray-50"}`}>
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="p-6">
                 <Link href={config?.registrationUrl || "/pendaftaran"} className="block w-full text-center bg-maroon-primary text-white py-3 rounded-lg font-bold shadow-md">
                   Daftar Sekarang
                 </Link>
              </div>
           </div>
        )}
      </nav>
    </>
  );
}