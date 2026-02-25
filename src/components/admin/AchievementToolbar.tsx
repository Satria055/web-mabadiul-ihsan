"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

export default function AchievementToolbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) params.set("q", term);
    else params.delete("q");
    replace(`${pathname}?${params.toString()}`);
  };

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (value) params.set(key, value);
    else params.delete(key);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Search Bar */}
      <div className="relative w-full md:w-1/3">
        <input
          type="text"
          placeholder="Cari prestasi atau siswa..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-maroon-primary outline-none text-sm"
          defaultValue={searchParams.get("q")?.toString()}
          onChange={(e) => setTimeout(() => handleSearch(e.target.value), 500)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      {/* Filters */}
      <div className="flex gap-2 w-full md:w-auto">
        <select
          className="px-4 py-2 rounded-lg border border-gray-300 text-sm bg-gray-50 outline-none cursor-pointer"
          onChange={(e) => handleFilter("category", e.target.value)}
          defaultValue={searchParams.get("category")?.toString()}
        >
          <option value="">Semua Kategori</option>
          <option value="Akademik">Akademik</option>
          <option value="Keagamaan">Keagamaan</option>
          <option value="Olahraga">Olahraga</option>
          <option value="Seni">Seni</option>
        </select>

        {(searchParams.has("q") || searchParams.has("category")) && (
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