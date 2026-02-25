import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Trophy, Calendar, MapPin, User, Medal } from "lucide-react";

export default async function AchievementDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const item = await prisma.achievement.findUnique({ where: { id: Number(params.id) } });

  if (!item) notFound();

  // Helper warna badge
  const rankColor = item.rank === 1 ? 'bg-gold-primary text-white' : 
                    item.rank === 2 ? 'bg-gray-400 text-white' : 
                    item.rank === 3 ? 'bg-orange-700 text-white' : 'bg-blue-600 text-white';
  const rankText = item.rank === 1 ? 'Juara 1 (Emas)' : 
                   item.rank === 2 ? 'Juara 2 (Perak)' : 
                   item.rank === 3 ? 'Juara 3 (Perunggu)' : 'Harapan / Finalis';

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-10">
      <div className="container mx-auto px-4 lg:px-8">
        
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-maroon-primary mb-8 font-medium">
           <ArrowLeft size={20} /> Kembali ke Beranda
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
            
            {/* KOLOM KIRI: FOTO */}
            <div className="relative h-[400px] lg:h-auto bg-gray-100">
               {item.image ? (
                 <Image src={item.image} alt={item.title} fill className="object-cover" />
               ) : (
                 <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 bg-gray-800">
                    <Trophy size={80} className="mb-4 opacity-50" />
                    <p>Tidak ada dokumentasi foto</p>
                 </div>
               )}
            </div>

            {/* KOLOM KANAN: DETAIL */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
               <div className="flex items-center gap-3 mb-6">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${rankColor}`}>
                     {rankText}
                  </span>
                  <span className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider">
                     {item.category}
                  </span>
               </div>

               <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                 {item.title}
               </h1>

               <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-maroon-primary/10 flex items-center justify-center text-maroon-primary shrink-0">
                        <User size={20} />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Penerima Penghargaan</p>
                        <p className="text-lg font-medium text-gray-800">{item.student}</p>
                     </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary shrink-0">
                        <MapPin size={20} />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Tingkat Kompetisi</p>
                        <p className="text-lg font-medium text-gray-800">{item.level}</p>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        <Calendar size={20} />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Waktu Perolehan</p>
                        <p className="text-lg font-medium text-gray-800">{item.date}</p>
                     </div>
                  </div>
               </div>

               {item.description && (
                 <div className="border-t border-gray-100 pt-6">
                    <h3 className="font-bold text-gray-800 mb-2">Cerita di balik prestasi</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                       {item.description}
                    </p>
                 </div>
               )}
            </div>
        </div>
      </div>
    </div>
  );
}