"use client";

import { Search, Filter, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

// Daftar Kategori (Sesuaikan jika perlu)
const categories = ["Semua", "Berita", "Pengumuman", "Artikel", "Prestasi", "Kegiatan"];

export default function NewsToolbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Handle Search Text
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  // Handle Category Select
  const handleCategory = (category: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (category && category !== "Semua") {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const currentCategory = searchParams.get("category") || "Semua";
  const currentSearch = searchParams.get("q") || "";

  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between bg-white p-2 rounded-2xl border border-gray-100 shadow-sm sticky top-24 z-30">
      
      {/* Kategori Filter (Scrollable) */}
      <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 px-2 no-scrollbar mask-linear-fade">
        <Filter size={16} className="text-gray-400 shrink-0 ml-2" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border
              ${currentCategory === cat 
                ? "bg-maroon-primary text-white border-maroon-primary shadow-md transform scale-105" 
                : "bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100 hover:text-maroon-primary"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative w-full lg:w-80 px-2 lg:px-0">
        <div className="absolute inset-y-0 left-2 lg:left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Cari berita..."
          className="block w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-maroon-primary focus:ring-2 focus:ring-maroon-primary/10 transition-all bg-gray-50 focus:bg-white"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={currentSearch}
        />
        {currentSearch && (
           <button onClick={() => handleSearch("")} className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-red-500">
              <X size={14} />
           </button>
        )}
      </div>

    </div>
  );
}