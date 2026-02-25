import { PrismaClient } from "@prisma/client";
import EducationSlider from "./EducationSlider";
import Link from "next/link"; // Jangan lupa import Link
import { ArrowRight } from "lucide-react"; // Import Icon

const prisma = new PrismaClient();

export default async function EducationUnits() {
  const units = await prisma.educationUnit.findMany({
    orderBy: { category: "asc" },
  });

  if (units.length === 0) return null;

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden" id="pendidikan">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white skew-x-12 opacity-40 -z-10"></div>

      <div className="container-custom">
        
        {/* HEADER SECTION (Update Disini) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          
          {/* Judul Kiri */}
          <div className="max-w-2xl">
            <span className="text-gold-primary font-bold tracking-widest uppercase text-sm mb-2 block">
              Lembaga Pendidikan
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-5xl text-maroon-primary mb-4">
              Pendidikan Berkualitas
            </h2>
            <p className="text-gray-500 leading-relaxed text-lg">
              Jelajahi berbagai unit pendidikan unggulan kami, mulai dari jenjang dasar hingga perguruan tinggi.
            </p>
          </div>

          {/* TOMBOL LIHAT SELENGKAPNYA (Baru) */}
          <Link 
            href="/pendidikan" 
            className="group flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 bg-white text-maroon-primary font-bold hover:bg-maroon-primary hover:text-white transition-all shadow-sm whitespace-nowrap"
          >
            Lihat Semua Unit <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
          </Link>
        </div>

        {/* Slider Tetap Ada */}
        <EducationSlider units={units} />

      </div>
    </section>
  );
}