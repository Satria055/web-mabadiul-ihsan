import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import Image from "next/image";
import { Trophy, Medal, Calendar, MapPin, User, Search } from "lucide-react"; // Ganti SearchX dengan Search
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prestasi Santri & Sekolah | Mabadi'ul Ihsan",
  description: "Daftar pencapaian dan prestasi santri Mabadi'ul Ihsan di berbagai tingkat kompetisi.",
};

export default async function PrestasiPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";

  // Query Database
  const achievements = await prisma.achievement.findMany({
    where: {
      OR: [
        { title: { contains: query } }, 
        { student: { contains: query } },
        { category: { contains: query } },
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <PageHeader 
        title="Prestasi Kami" 
        subtitle="Bukti dedikasi dan kerja keras santri dalam meraih keunggulan."
        breadcrumb={[{ label: "Prestasi", href: "/prestasi" }]}
      />

      <section className="py-20 bg-white">
        <div className="container-custom">
          
          {/* === SEARCH BAR === */}
          <div className="mb-10 flex justify-end">
            <form className="relative w-full md:w-1/3">
              <input 
                type="text" 
                name="q"
                defaultValue={query}
                placeholder="Cari prestasi atau nama siswa..." 
                className="w-full pl-5 pr-12 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-maroon-primary focus:ring-1 focus:ring-maroon-primary transition-all text-sm shadow-sm"
              />
              {/* PERBAIKAN: Menggunakan icon Search biasa */}
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-maroon-primary hover:text-white transition-colors">
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Kondisi Jika Data Kosong */}
          {achievements.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
               <Trophy size={64} className="mx-auto text-gray-300 mb-4" />
               <h3 className="text-xl font-bold text-gray-600">
                 {query ? `Tidak ditemukan prestasi untuk "${query}"` : "Belum ada data prestasi."}
               </h3>
               <p className="text-gray-400 mt-2">Silakan coba kata kunci lain.</p>
               {query && (
                 <Link href="/prestasi" className="inline-block mt-4 text-maroon-primary font-bold hover:underline">
                   Reset Pencarian
                 </Link>
               )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {achievements.map((item) => (
                <Link href={`/prestasi/${item.id}`} key={item.id} className="group block h-full">
                  <div className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                    
                    {/* Image Section */}
                    <div className="relative h-60 w-full bg-gray-100 overflow-hidden">
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
                           <Trophy className="text-white/20 w-16 h-16" />
                        </div>
                      )}

                      {/* Badge Juara */}
                      <div className="absolute top-4 right-4 z-10">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white
                          ${item.rank === 1 ? 'bg-gold-primary text-white' : 
                            item.rank === 2 ? 'bg-gray-300 text-gray-700' : 
                            item.rank === 3 ? 'bg-orange-700 text-white' : 'bg-blue-500 text-white'}`}>
                          {item.rank > 0 ? <span className="font-bold font-serif text-lg">{item.rank}</span> : <Medal size={18} />}
                        </div>
                      </div>

                      {/* Badge Kategori */}
                      <div className="absolute top-4 left-4 z-10">
                         <span className="bg-white/95 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm text-gray-800">
                           {item.category}
                         </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-serif font-bold text-xl text-gray-800 mb-3 leading-snug group-hover:text-maroon-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>

                      <div className="space-y-3 mt-auto text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <User className="text-maroon-primary shrink-0 w-4 h-4" />
                          <span className="font-medium truncate">{item.student}</span>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-1.5">
                             <MapPin className="text-gray-400 w-4 h-4" /> {item.level}
                          </div>
                          <div className="flex items-center gap-1.5">
                             <Calendar className="text-gray-400 w-4 h-4" /> {item.date}
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
    </>
  );
}