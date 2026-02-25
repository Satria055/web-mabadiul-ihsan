import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, Calendar, Tag, Clock } from "lucide-react";

// HELPER: Membersihkan HTML Tags & Decode Entities
const cleanContent = (html: string) => {
  if (!html) return "";
  
  let text = html.replace(/<[^>]+>/g, ''); // Hapus tag HTML

  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");

  return text.replace(/\s+/g, ' ').trim();
};

export default async function NewsSection() {
  const posts = await prisma.post.findMany({
    take: 3,
    where: { published: true }, // Pastikan hanya yang published
    orderBy: { createdAt: "desc" },
  });

  if (posts.length === 0) return null; // Jangan tampilkan section jika kosong

  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        
        {/* === HEADER SECTION === */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          
          {/* Judul & Label */}
          <div className="max-w-2xl w-full">
            <span className="text-gold-primary font-bold tracking-widest uppercase text-xs mb-2 block flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gold-primary"></span>
              Informasi Terkini
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-gray-800">
              Berita & Agenda Sekolah
            </h2>
          </div>

          {/* === TOMBOL LIHAT SEMUA (DESKTOP) === */}
          <Link 
            href="/berita" 
            className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 bg-white text-maroon-primary font-bold hover:bg-maroon-primary hover:text-white transition-all shadow-sm whitespace-nowrap group"
          >
            Lihat Semua Berita <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* === TOMBOL LIHAT SEMUA (MOBILE) === */}
          <Link 
            href="/berita" 
            className="md:hidden w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-200 bg-white text-maroon-primary font-bold hover:bg-maroon-primary hover:text-white transition-all shadow-sm group"
          >
            Lihat Semua Berita <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>

        {/* Grid Artikel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((item) => {
             // Logic Tanggal
             const isEvent = item.eventDate ? true : false;
             const displayDate = item.eventDate ? item.eventDate : item.createdAt;

             // Logic Ringkasan
             const cleanText = cleanContent(item.content);
             const summary = cleanText.length > 100 
               ? cleanText.substring(0, 100) + "..." 
               : cleanText;

             return (
              <div 
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="h-52 w-full relative overflow-hidden bg-gray-200">
                  <div className="absolute top-4 left-4 z-20">
                     <span className="bg-white/95 backdrop-blur text-gray-800 px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm flex items-center gap-1">
                        <Tag size={10} className="text-maroon-primary" /> {item.category}
                     </span>
                  </div>

                  {/* Fallback Image jika kosong */}
                  <img 
                    src={item.image || "/images/placeholder-news.jpg"} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay halus saat hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10"></div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow relative">
                  <div className={`flex items-center gap-2 text-[10px] font-bold mb-3 uppercase tracking-wide ${isEvent ? 'text-red-600' : 'text-gray-400'}`}>
                    {isEvent ? <Calendar size={12} /> : <Clock size={12} />}
                    <span>
                      {isEvent ? "AGENDA: " : ""}
                      {new Date(displayDate).toLocaleDateString("id-ID", {
                        day: "numeric", month: "long", year: "numeric"
                      })}
                    </span>
                  </div>

                  <Link href={`/berita/${item.slug}`} className="block mb-3">
                    <h3 className="font-serif font-bold text-lg text-gray-800 leading-snug group-hover:text-maroon-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {summary}
                  </p>

                  <div className="pt-4 border-t border-gray-50 mt-auto">
                    <Link 
                      href={`/berita/${item.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-maroon-primary hover:text-gold-primary transition-colors uppercase tracking-wide"
                    >
                      Baca Selengkapnya <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}