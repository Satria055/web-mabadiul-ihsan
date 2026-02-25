import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, Globe, GraduationCap, CheckCircle, MapPin, 
  CalendarDays, Phone, Mail, Instagram, Facebook, Twitter,
  ArrowUpRight // <--- INI YANG KURANG TADI
} from "lucide-react";

export default async function UnitDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  // Fetch Unit BESERTA Galerinya
  const unit = await prisma.educationUnit.findUnique({
    where: { id: Number(params.id) },
    include: { gallery: true } // Include Gallery
  });

  if (!unit) notFound();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* === HERO BANNER (Menggunakan Thumbnail) === */}
      <div className="relative w-full h-[500px] flex items-end">
        <Image
          src={unit.image || "https://placehold.co/1200x800?text=No+Image"}
          alt={unit.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 pb-12">
           <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm font-medium">
              <ArrowLeft size={18} /> Kembali
           </Link>
           <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30 uppercase tracking-wider">
                <GraduationCap size={14} /> {unit.status} - {unit.category}
              </span>
           </div>
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 leading-tight shadow-sm">
             {unit.name}
           </h1>
           <p className="text-white/80 max-w-2xl text-lg line-clamp-2">{unit.address} {unit.village && `, ${unit.village}`}</p>
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* SIDEBAR: DETAIL & KONTAK */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 -mt-20 relative z-20">
               
               {/* Data Identitas Table */}
               <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Identitas Sekolah</h3>
               <ul className="space-y-3 text-sm">
                  <li className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-gray-500">NPSN</span>
                    <span className="font-bold text-gray-800">{unit.npsn || "-"}</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-gray-500">Status</span>
                    <span className="font-bold text-gray-800">{unit.status || "-"}</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-gray-500">Akreditasi</span>
                    <span className="font-bold text-maroon-primary bg-maroon-primary/5 px-2 rounded">{unit.accreditation || "-"}</span>
                  </li>
               </ul>

               {/* Kontak */}
               <h3 className="font-bold text-gray-800 mt-6 mb-4 border-b pb-2">Kontak Resmi</h3>
               <ul className="space-y-3 text-sm">
                  {unit.phone && (
                    <li className="flex items-center gap-3 text-gray-600">
                      <Phone size={16} className="text-maroon-primary" /> {unit.phone}
                    </li>
                  )}
                  {unit.email && (
                    <li className="flex items-center gap-3 text-gray-600">
                      <Mail size={16} className="text-maroon-primary" /> {unit.email}
                    </li>
                  )}
                  
                  {/* === WEBSITE CARD (NEW DESIGN) === */}
                  {unit.link && (
                    <li className="mt-6 pt-4 border-t border-gray-100">
                      <a 
                        href={unit.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="group relative block w-full overflow-hidden rounded-xl bg-gradient-to-br from-maroon-primary to-[#600000] p-1 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-maroon-primary/30"
                      >
                        {/* Background Decorative Glow */}
                        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all"></div>
                        
                        <div className="relative flex items-center justify-between rounded-lg bg-black/10 px-4 py-3 backdrop-blur-[2px] transition-colors group-hover:bg-transparent">
                          
                          {/* Kiri: Icon & Label */}
                          <div className="flex flex-col">
                            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gold-primary">
                              <Globe size={12} /> Official Website
                            </span>
                            <span className="font-serif text-lg font-bold text-white truncate max-w-[180px]">
                              {/* Menghapus https:// agar terlihat bersih */}
                              {unit.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                            </span>
                          </div>

                          {/* Kanan: Action Icon */}
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all group-hover:bg-white group-hover:text-maroon-primary group-hover:rotate-45">
                            <ArrowUpRight size={20} />
                          </div>
                        </div>
                      </a>
                    </li>
                  )}
               </ul>

               {/* Social Media Icons */}
               <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100 justify-center">
                  {unit.facebookUrl && <a href={unit.facebookUrl} className="p-2 bg-blue-600 text-white rounded-full hover:scale-110 transition"><Facebook size={16}/></a>}
                  {unit.instagramUrl && <a href={unit.instagramUrl} className="p-2 bg-pink-600 text-white rounded-full hover:scale-110 transition"><Instagram size={16}/></a>}
                  {unit.twitterUrl && <a href={unit.twitterUrl} className="p-2 bg-sky-500 text-white rounded-full hover:scale-110 transition"><Twitter size={16}/></a>}
               </div>
            </div>
          </div>

          {/* KONTEN UTAMA */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Profil Deskripsi */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                 <span className="w-1.5 h-8 bg-maroon-primary rounded-full"></span>
                 Profil Lengkap
              </h2>
              <div className="prose prose-lg prose-gray max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                {unit.description}
              </div>
            </div>

            {/* Galeri Kegiatan (Grid) */}
            <div>
               <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 pl-4 border-l-4 border-gold-primary">
                 Galeri Kegiatan
               </h2>
               {unit.gallery.length > 0 ? (
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {unit.gallery.map((item) => (
                      <div key={item.id} className="relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer group">
                        <Image 
                          src={item.image} 
                          alt="Dokumentasi" 
                          fill 
                          className="object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                      </div>
                    ))}
                 </div>
               ) : (
                 <div className="text-center py-10 bg-gray-100 rounded-xl border border-dashed border-gray-300 text-gray-400 italic">
                    Belum ada galeri foto yang diunggah.
                 </div>
               )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}