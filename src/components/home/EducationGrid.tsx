"use client"; // Wajib ada

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, GraduationCap } from "lucide-react";
import { EducationUnit } from "@prisma/client";

type Props = {
  units: EducationUnit[];
};

export default function EducationGrid({ units }: Props) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const categories = ["Semua", "Pendidikan Formal", "Pendidikan Non Formal", "Program Pesantren"];

  const filteredUnits = activeCategory === "Semua"
    ? units
    : units.filter((u) => {
        if (activeCategory === "Pendidikan Formal") return u.category.toLowerCase().includes("formal") && !u.category.toLowerCase().includes("non");
        if (activeCategory === "Pendidikan Non Formal") return u.category.toLowerCase().includes("non");
        if (activeCategory === "Program Pesantren") return u.category.toLowerCase().includes("pesantren");
        return u.category === activeCategory;
      });

  return (
    <div className="container-custom">
      {/* FILTER BUTTONS */}
      <div className="mb-10 pb-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="font-serif font-bold text-2xl text-gray-800">
          Unit Tersedia ({filteredUnits.length})
        </h2>
        
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-all duration-300
                ${activeCategory === cat 
                  ? "bg-maroon-primary text-white border-maroon-primary shadow-md" 
                  : "bg-white text-gray-500 border-gray-200 hover:border-maroon-primary hover:text-maroon-primary"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GRID LIST */}
      {filteredUnits.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {filteredUnits.map((unit) => (
            <article 
              key={unit.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* IMAGE HEADER */}
              <div className="h-56 w-full relative bg-gray-100 overflow-hidden">
                <img 
                    src={unit.image || "https://placehold.co/600x400?text=No+Image"} 
                    alt={unit.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/95 backdrop-blur-sm text-maroon-primary text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <GraduationCap size={12} /> {unit.category.replace("Pendidikan ", "")}
                    </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col flex-grow relative bg-white">
                <h3 className="font-serif font-bold text-xl text-gray-900 mb-3 group-hover:text-maroon-primary transition-colors line-clamp-2 leading-tight">
                    {unit.name}
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-3 flex-grow border-b border-gray-50 pb-4">
                    {unit.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                    <Link 
                      href={`/pendidikan/${unit.id}`} 
                      className="inline-flex items-center gap-2 text-sm font-bold text-maroon-primary hover:text-maroon-dark transition-colors group/btn"
                    >
                    Lihat Profil 
                    <span className="bg-maroon-primary/10 p-1 rounded-full group-hover/btn:bg-maroon-primary group-hover/btn:text-white transition-all">
                        <ArrowRight size={14} />
                    </span>
                    </Link>
                    {unit.link && (
                    <a 
                        href={unit.link.startsWith("http") ? unit.link : `https://${unit.link}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-gray-400 hover:text-maroon-primary transition-colors p-2 hover:bg-gray-50 rounded-full"
                    >
                        <ArrowUpRight size={18} />
                    </a>
                    )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
           <GraduationCap size={48} className="text-gray-300 mx-auto mb-4" />
           <p className="text-gray-500">Tidak ada unit pendidikan di kategori ini.</p>
        </div>
      )}
    </div>
  );
}