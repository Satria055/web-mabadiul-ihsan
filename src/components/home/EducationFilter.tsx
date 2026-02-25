"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { EducationUnit } from "@prisma/client"; // Pastikan import ini sesuai

type Props = {
  units: EducationUnit[];
};

export default function EducationFilter({ units }: Props) {
  const [activeTab, setActiveTab] = useState("Semua");

  // Ambil list kategori unik dari data, tambah "Semua" di awal
  const categories = ["Semua", "Pendidikan Formal", "Pendidikan Non Formal", "Program Pesantren"];

  // Filter unit berdasarkan tab yang aktif
  const filteredUnits = activeTab === "Semua" 
    ? units 
    : units.filter((u) => u.category === activeTab);

  return (
    <div className="space-y-12">
      
      {/* --- TABS NAVIGATION (Pill Shape) --- */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border
              ${activeTab === cat 
                ? "bg-maroon-primary text-white border-maroon-primary shadow-lg scale-105" 
                : "bg-white text-gray-500 border-gray-200 hover:border-maroon-primary hover:text-maroon-primary"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- GRID CONTENT --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px] animate-fade-in">
        {filteredUnits.length > 0 ? (
          filteredUnits.map((unit, index) => {
            // Logic Layout: Item pertama selalu besar jika di tab "Semua", 
            // atau buat logika lain sesuai selera.
            const isLarge = (activeTab === "Semua" && index === 0) || (filteredUnits.length > 3 && index % 4 === 0);

            return (
              <div 
                key={unit.id}
                className={`group relative rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 
                  ${isLarge ? "md:col-span-2" : "md:col-span-1"}`}
              >
                {/* Background Image - Zoom Effect */}
                <div className="absolute inset-0 bg-gray-900">
                  <img 
                    src={unit.image || "https://placehold.co/800x600?text=Gedung+Sekolah"} 
                    alt={unit.name}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                  />
                  {/* Gradient: Hanya gelap di bawah agar teks terbaca, atas tetap bening */}
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/95 via-maroon-primary/50 to-transparent opacity-90"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  
                  {/* Kategori Badge */}
                  <div className="absolute top-6 left-6 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                     <span className="bg-white/20 backdrop-blur border border-white/30 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {unit.category}
                    </span>
                  </div>

                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className={`font-serif font-bold mb-2 leading-tight ${isLarge ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
                      {unit.name}
                    </h3>
                    
                    {/* Deskripsi: Hidden di mobile/small card, Show di Large/Hover */}
                    <p className={`text-gray-200 text-sm mb-6 line-clamp-2 ${isLarge ? 'block max-w-lg' : 'hidden group-hover:block'}`}>
                      {unit.description}
                    </p>

                    {/* Buttons */}
                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                      <Link 
                        href={`/unit/${unit.id}`} 
                        className="bg-gold-primary text-maroon-dark hover:bg-white hover:text-maroon-primary px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all shadow-lg"
                      >
                        Lihat Profil <ArrowRight size={14} />
                      </Link>

                      {unit.link && (
                        <a 
                          href={unit.link.startsWith("http") ? unit.link : `https://${unit.link}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-maroon-primary transition-all"
                          title="Website Resmi"
                        >
                          <ArrowUpRight size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12 text-gray-400 italic">
            Tidak ada unit pendidikan di kategori ini.
          </div>
        )}
      </div>
    </div>
  );
}