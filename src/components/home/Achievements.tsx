import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Trophy, Medal, ArrowRight, Calendar, MapPin, User } from "lucide-react";

export default async function Achievements() {
  const achievements = await prisma.achievement.findMany({
    take: 3, 
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        
        {/* === HEADER SECTION === */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 md:mb-16 border-b border-gray-100 pb-6 md:pb-8">
          
          {/* Teks Judul */}
          <div className="max-w-2xl w-full">
            <h2 className="font-serif font-bold text-2xl md:text-4xl text-maroon-primary mb-2 md:mb-3">
              Jejak Prestasi Santri
            </h2>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed">
              Bukti nyata komitmen Mabadi'ul Ihsan dalam mencetak generasi unggul.
            </p>
          </div>
          
          {/* === TOMBOL UTAMA (Satu tombol untuk semua layar) === */}
          {/* Styling mengadopsi dari EducationUnits + Responsive Width */}
          <Link 
            href="/prestasi" 
            className="group flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-200 bg-white text-maroon-primary font-bold hover:bg-maroon-primary hover:text-white transition-all shadow-sm whitespace-nowrap w-full md:w-auto"
          >
            Lihat Semua Prestasi <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>

        {/* === GRID CONTENT === */}
        {achievements.length === 0 ? (
           <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
             <p className="text-gray-400">Belum ada data prestasi.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {achievements.map((item) => (
              <Link href={`/prestasi/${item.id}`} key={item.id} className="group block h-full">
                <div className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 h-full flex flex-col">
                  
                  {/* Image / Fallback Section */}
                  <div className="relative h-48 md:h-56 w-full bg-gray-100 overflow-hidden">
                    {item.image ? (
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-maroon-primary to-black flex items-center justify-center relative">
                         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                         <Trophy className="text-white/20 w-12 h-12 md:w-16 md:h-16" />
                      </div>
                    )}

                    {/* Badge Juara */}
                    <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white
                        ${item.rank === 1 ? 'bg-gold-primary text-white' : 
                          item.rank === 2 ? 'bg-gray-300 text-gray-700' : 
                          item.rank === 3 ? 'bg-orange-700 text-white' : 'bg-blue-500 text-white'}`}>
                        {item.rank > 0 ? <span className="font-bold font-serif text-sm md:text-lg">{item.rank}</span> : <Medal size={16} />}
                      </div>
                    </div>

                    {/* Badge Kategori */}
                    <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10">
                       <span className="bg-white/90 backdrop-blur text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1 rounded-full uppercase tracking-wider shadow-sm">
                         {item.category}
                       </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-6 flex flex-col flex-grow">
                    <h3 className="font-serif font-bold text-lg md:text-xl text-gray-800 mb-2 md:mb-3 leading-snug group-hover:text-maroon-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="space-y-2 md:space-y-3 mt-auto text-xs md:text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <User className="text-maroon-primary shrink-0 w-4 h-4" />
                        <span className="truncate">{item.student}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 md:pt-3 border-t border-gray-50">
                        <div className="flex items-center gap-1.5">
                           <MapPin className="text-gray-400 w-3.5 h-3.5" /> {item.level}
                        </div>
                        <div className="flex items-center gap-1.5">
                           <Calendar className="text-gray-400 w-3.5 h-3.5" /> {item.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}