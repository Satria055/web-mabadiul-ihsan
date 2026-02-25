"use client";

import { Filter, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Unit {
  id: number;
  name: string;
}

export default function GalleryToolbar({ units }: { units: Unit[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilter = (unitId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1"); // Reset ke halaman 1
    
    if (unitId) {
      params.set("unit", unitId);
    } else {
      params.delete("unit");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const currentUnit = searchParams.get("unit") || "";

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm sticky top-24 z-30">
      
      <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
        <Filter size={18} />
        <span>Filter Kegiatan:</span>
      </div>

      {/* Scrollable Filter Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar mask-linear-fade">
        <button
          onClick={() => handleFilter("")}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border
            ${currentUnit === "" 
              ? "bg-maroon-primary text-white border-maroon-primary shadow-md" 
              : "bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100 hover:text-maroon-primary"
            }`}
        >
          Semua
        </button>

        {units.map((unit) => (
          <button
            key={unit.id}
            onClick={() => handleFilter(unit.id.toString())}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border
              ${currentUnit === unit.id.toString()
                ? "bg-maroon-primary text-white border-maroon-primary shadow-md" 
                : "bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100 hover:text-maroon-primary"
              }`}
          >
            {unit.name}
          </button>
        ))}
      </div>
    </div>
  );
}