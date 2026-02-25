import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/layout/PageHeader";
import { getPageMeta } from "@/lib/page-meta";
import { CheckCircle, History, Target, Heart, Quote } from "lucide-react";

export default async function ProfilYayasanPage() {
  // 1. Ambil Data Banner dari PageMeta
  const meta = await getPageMeta("profil-yayasan", "Profil Yayasan");

  // 2. Ambil Konten dari SiteConfig
  const config = await prisma.siteConfig.findFirst();

  // 3. Fallback Data
  const history = config?.history || "Sejarah belum diisi oleh admin.";
  const vision = config?.vision || "Visi belum diisi.";
  const missionList = config?.mission ? config.mission.split('\n') : ["Misi belum diisi."];
  const greeting = config?.greeting || "Sambutan belum diisi.";
  
  // Images
  const profileImage = config?.profileImage || "/images/placeholder-gedung.jpg";
  const chairmanImage = config?.chairmanImage || "/images/placeholder-user.jpg"; 
  const siteName = config?.siteName || "Mabadi'ul Ihsan";

  return (
    <>
      <PageHeader
        title={meta.title}
        subtitle={meta.description}
        image={meta.image} 
        breadcrumb={[
          { label: "Profil", href: "#" },
          { label: "Yayasan", href: "/profil/yayasan" },
        ]}
      />

      <section className="py-20 bg-gray-50/50">
        <div className="container-custom space-y-24">
          
          {/* SECTION 1: SEJARAH & LATAR BELAKANG */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Kolom Gambar */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl border-8 border-gray-50">
               <img 
                 src={profileImage} 
                 alt="Gedung Yayasan" 
                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
               />
            </div>
            
            {/* Kolom Teks */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-maroon-primary font-bold tracking-widest uppercase text-sm">
                <History size={18} />
                <span>Sejarah & Latar Belakang</span>
              </div>
              <h2 className="font-serif font-bold text-3xl md:text-4xl text-gray-800 leading-tight">
                {siteName}
              </h2>
              <div className="prose text-gray-600 leading-relaxed text-justify whitespace-pre-line">
                {history}
              </div>
            </div>
          </div>

          {/* SECTION 2: SAMBUTAN KETUA (COMPACT & PROPORTIONAL) */}
          <div className="max-w-5xl mx-auto">
             <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
                
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-maroon-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

                {/* Foto Wrapper - Fixed Size agar tidak raksasa */}
                <div className="relative shrink-0">
                   <div className="w-48 h-60 md:w-56 md:h-72 rounded-xl overflow-hidden shadow-lg border-[3px] border-white ring-1 ring-gray-200 transform -rotate-2 hover:rotate-0 transition-transform duration-500 relative z-10">
                      <img 
                        src={chairmanImage} 
                        alt="Ketua Yayasan" 
                        className="w-full h-full object-cover"
                      />
                   </div>
                   {/* Aksen kotak di belakang foto */}
                   <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-gold-primary rounded-xl -z-0 hidden md:block"></div>
                </div>

                {/* Text Content */}
                <div className="flex-1 text-center md:text-left relative z-10">
                   <Quote className="text-maroon-primary/20 w-12 h-12 mb-4 mx-auto md:mx-0" />
                   
                   <h3 className="text-maroon-primary font-bold tracking-widest uppercase text-xs mb-3">
                      Sambutan Pimpinan
                   </h3>
                   
                   <blockquote className="font-serif text-lg md:text-xl text-gray-800 leading-relaxed italic mb-6">
                      "{greeting}"
                   </blockquote>

                   <div className="border-t border-gray-100 pt-6 inline-block md:block w-full">
                      <h4 className="font-bold text-gray-900 text-lg">Ketua Yayasan</h4>
                      <p className="text-sm text-gray-500 font-medium">{siteName}</p>
                   </div>
                </div>

             </div>
          </div>

          {/* SECTION 3: VISI & MISI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visi Card */}
            <div className="group bg-white p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-maroon-primary transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
               
               <div className="w-14 h-14 bg-maroon-primary/5 text-maroon-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-maroon-primary group-hover:text-white transition-colors">
                 <Target size={28} />
               </div>
               <h3 className="font-serif font-bold text-2xl text-gray-900 mb-4">Visi Lembaga</h3>
               <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                 "{vision}"
               </p>
            </div>

            {/* Misi Card */}
            <div className="group bg-white p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-gold-primary transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>

               <div className="w-14 h-14 bg-gold-primary/10 text-gold-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold-primary group-hover:text-white transition-colors">
                 <Heart size={28} />
               </div>
               <h3 className="font-serif font-bold text-2xl text-gray-900 mb-4">Misi Lembaga</h3>
               <ul className="space-y-4">
                 {missionList.map((item, idx) => (
                   item.trim() !== "" && (
                    <li key={idx} className="flex items-start gap-4 text-gray-600">
                        <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full border border-green-500 flex items-center justify-center">
                            <CheckCircle size={12} className="text-green-500" />
                        </span>
                        <span className="leading-relaxed">{item}</span>
                    </li>
                   )
                 ))}
               </ul>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}