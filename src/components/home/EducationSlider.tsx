"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, GraduationCap } from "lucide-react";
import { EducationUnit } from "@prisma/client";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper'; 

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const customStyles = `
  .swiper-wrapper { align-items: stretch; }
  .swiper-slide { height: auto; display: flex; }
  .swiper-pagination-bullet { background: #cbd5e1; opacity: 1; }
  .swiper-pagination-bullet-active { background: #800000 !important; width: 24px; border-radius: 4px; transition: all 0.3s; }
  .swiper-button-next, .swiper-button-prev { color: #800000; background: white; width: 40px; height: 40px; border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
  .swiper-button-disabled { opacity: 0; pointer-events: none; }
`;

type Props = {
  units: EducationUnit[];
};

export default function EducationSlider({ units }: Props) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const categories = ["Semua", "Pendidikan Formal", "Pendidikan Non Formal", "Program Pesantren"];
  
  // STATE BARU: Untuk mendeteksi apakah JS sudah siap
  const [mounted, setMounted] = useState(false);
  
  const swiperRef = useRef<SwiperType | null>(null);

  const filteredUnits = activeCategory === "Semua" 
    ? units 
    : units.filter((u) => u.category === activeCategory);

  // EFFECT: Set mounted true setelah komponen di-render di browser
  useEffect(() => {
    setMounted(true);
  }, []);

  // EFFECT: Reset slide saat kategori berubah
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  }, [activeCategory]);

  // --- KOMPONEN KARTU (DIPISAH AGAR BISA DIPAKAI DI SKELETON & SWIPER) ---
  const UnitCard = ({ unit }: { unit: EducationUnit }) => (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col w-full h-full">
      {/* Image Header */}
      <div className="h-56 w-full relative bg-gray-100 overflow-hidden">
        <Image 
            src={unit.image || "https://placehold.co/600x400?text=No+Image"} 
            alt={unit.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
        
        {/* Badge Category */}
        <div className="absolute top-4 left-4 z-10">
            <span className="bg-white/95 backdrop-blur-sm text-maroon-primary text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
            <GraduationCap size={12} /> {unit.category.replace("Pendidikan ", "")}
            </span>
        </div>
      </div>

      {/* Content */}
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
                title="Kunjungi Website"
            >
                <ArrowUpRight size={18} />
            </a>
            )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full">
      <style>{customStyles}</style>

      {/* FILTER TABS */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border shadow-sm
              ${activeCategory === cat 
                ? "bg-maroon-primary text-white border-maroon-primary shadow-maroon-primary/20 scale-105" 
                : "bg-white text-gray-500 border-gray-200 hover:border-maroon-primary hover:text-maroon-primary"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* LOGIC RENDERING: STATIC GRID vs SWIPER */}
      {filteredUnits.length > 0 ? (
        <div className="px-4 md:px-8">
            {/* 1. TAMPILKAN STATIC GRID JIKA BELUM MOUNTED (Cegah Layout Shift) 
               Ini akan menampilkan 3 kartu pertama dalam grid biasa.
            */}
            {!mounted ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredUnits.slice(0, 3).map((unit) => (
                        <div key={unit.id} className="h-full">
                            <UnitCard unit={unit} />
                        </div>
                    ))}
                </div>
            ) : (
                /* 2. TAMPILKAN SWIPER JIKA SUDAH MOUNTED (JavaScript Ready) 
                */
                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={32}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true, dynamicBullets: true }}
                    autoplay={{ delay: 6000, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="!pb-16"
                >
                    {filteredUnits.map((unit) => (
                        <SwiperSlide key={unit.id}>
                            <UnitCard unit={unit} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 mx-4">
          <GraduationCap size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Belum ada unit pendidikan di kategori ini.</p>
        </div>
      )}
    </div>
  );
}