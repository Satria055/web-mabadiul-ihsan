import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/layout/PageHeader";
import { getPageMeta } from "@/lib/page-meta";
import { Handshake, ExternalLink, Globe } from "lucide-react";
import Link from "next/link";

export default async function KemitraanPage() {
  // 1. Ambil Banner Dinamis
  const meta = await getPageMeta("kemitraan", "Mitra Kerjasama");

  // 2. Ambil Data Mitra (Urutkan sesuai prioritas 'order')
  const partners = await prisma.partner.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <>
      <PageHeader
        title={meta.title}
        subtitle={meta.description || "Membangun sinergi untuk kemajuan pendidikan."}
        image={meta.image} 
        breadcrumb={[
          { label: "Profil", href: "#" },
          { label: "Kemitraan", href: "/kemitraan" },
        ]}
      />

      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="container-custom">
          
          {/* Intro Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-maroon-primary/10 text-maroon-primary rounded-full text-xs font-bold tracking-widest uppercase mb-4">
               <Handshake size={16} /> Jaringan Kami
            </div>
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-gray-800 mb-6">
              Sinergi & Kolaborasi
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Kami bekerja sama dengan berbagai institusi pendidikan, perusahaan, dan organisasi 
              untuk meningkatkan kualitas pendidikan dan membuka peluang lebih luas bagi para santri.
            </p>
          </div>

          {/* Grid Mitra */}
          {partners.length === 0 ? (
             <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
                <Handshake className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">Belum ada data mitra kerjasama.</p>
             </div>
          ) : (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {partners.map((partner) => (
                   <div 
                     key={partner.id} 
                     className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center relative overflow-hidden"
                   >
                      {/* Hover Decoration */}
                      <div className="absolute inset-0 bg-maroon-primary/0 group-hover:bg-maroon-primary/5 transition-colors duration-300"></div>

                      {/* Logo Container */}
                      <div className="w-full h-32 flex items-center justify-center mb-6 relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500">
                         {partner.logo ? (
                           <img 
                             src={partner.logo} 
                             alt={partner.name} 
                             className="max-w-full max-h-full object-contain drop-shadow-sm transform group-hover:scale-110 transition-transform duration-500" 
                           />
                         ) : (
                           <Handshake size={48} className="text-gray-300" />
                         )}
                      </div>

                      {/* Info */}
                      <div className="relative z-10 w-full">
                         <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3rem] flex items-center justify-center">
                           {partner.name}
                         </h3>
                         
                         {partner.website && (
                           <a 
                             href={partner.website} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="inline-flex items-center gap-1 text-xs font-bold text-maroon-primary hover:text-maroon-dark transition-colors"
                           >
                             <Globe size={12} /> Kunjungi Website
                           </a>
                         )}
                      </div>
                   </div>
                ))}
             </div>
          )}

        </div>
      </section>
    </>
  );
}