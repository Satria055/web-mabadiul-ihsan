"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, X } from "lucide-react";
import { useDebouncedCallback } from "use-debounce"; // Opsional: kalau mau install library, kalau tidak pakai timeout manual
// Jika tidak ingin install use-debounce, saya pakai cara manual di bawah ini:

export default function AdminToolbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Logic update URL
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1"); // Reset ke halaman 1 saat search
    
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
      
      {/* 1. Search Bar */}
      <div className="relative w-full md:w-1/3">
        <input
          type="text"
          placeholder="Cari judul berita..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-maroon-primary focus:border-maroon-primary text-sm"
          defaultValue={searchParams.get("q")?.toString()}
          onChange={(e) => {
            // Debounce manual sederhana agar tidak spam URL setiap ketik
            setTimeout(() => handleSearch(e.target.value), 500); 
          }}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      {/* 2. Filters Group */}
      <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
        
        {/* Kategori Dropdown */}
        <select
          className="px-4 py-2 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-maroon-primary focus:border-maroon-primary"
          onChange={(e) => handleFilter("category", e.target.value)}
          defaultValue={searchParams.get("category")?.toString()}
        >
          <option value="">Semua Kategori</option>
          <option value="Berita">Berita</option>
          <option value="Artikel">Artikel</option>
          <option value="Agenda">Agenda</option>
          <option value="Prestasi">Prestasi</option>
          <option value="Pengumuman">Pengumuman</option>
        </select>

        {/* Filter Tanggal (Bulan) */}
        <input 
            type="month"
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm bg-gray-50"
            onChange={(e) => handleFilter("date", e.target.value)}
            defaultValue={searchParams.get("date")?.toString()}
        />

        {/* Reset Filter Button (Muncul jika ada filter aktif) */}
        {(searchParams.has("q") || searchParams.has("category") || searchParams.has("date")) && (
             <button 
                onClick={() => replace(pathname)}
                className="px-3 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
             >
                <X size={16} /> Reset
             </button>
        )}
      </div>
    </div>
  );
}