import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/layout/PageHeader";
import { getPageMeta } from "@/lib/page-meta";
import { Quote, Star, User } from "lucide-react";

export default async function TestimoniPage() {
  // 1. Ambil Banner
  const meta = await getPageMeta("testimoni", "Kata Mereka");

  // 2. Ambil Data (Hanya yang isShow = true)
  const testimonials = await prisma.testimonial.findMany({
    where: { isShow: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <PageHeader
        title={meta.title}
        subtitle={meta.description || "Pengalaman nyata dari wali santri dan alumni kami."}
        image={meta.image} 
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Testimoni", href: "/testimoni" },
        ]}
      />

      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="container-custom">
          
          {/* Header Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-gray-800 mb-6">
              Suara Hati Keluarga Besar
            </h2>
            <div className="w-24 h-1 bg-maroon-primary mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 leading-relaxed text-lg">
              Kepercayaan adalah amanah terbesar kami. Berikut adalah apa yang mereka katakan tentang pendidikan dan pengasuhan di Mabadi'ul Ihsan.
            </p>
          </div>

          {testimonials.length === 0 ? (
             <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <Quote className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">Belum ada testimoni yang ditampilkan.</p>
             </div>
          ) : (
             /* Grid Testimoni */
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((item) => (
                   <div 
                     key={item.id} 
                     className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-shadow duration-300 flex flex-col relative overflow-hidden group"
                   >
                      {/* Dekorasi Quote Besar (Background) */}
                      <Quote className="absolute top-4 right-6 text-gray-100 w-24 h-24 rotate-180 -z-0 transition-transform duration-500 group-hover:scale-110" />

                      {/* RATING BINTANG (REACT ICON) */}
                      <div className="flex gap-1 mb-6 relative z-10">
                         {/* Kita buat array 5 item untuk me-render 5 bintang */}
                         {[...Array(5)].map((_, i) => (
                           <Star 
                             key={i} 
                             size={18} 
                             // Logika: Jika index (0-4) kurang dari rating, warnai kuning.
                             // 'fill-yellow-400' membuat bintangnya SOLID (berisi), bukan outline.
                             className={i < item.rating 
                                ? "text-yellow-400 fill-yellow-400" 
                                : "text-gray-200 fill-gray-50"
                             } 
                           />
                         ))}
                      </div>

                      {/* Isi Testimoni */}
                      <blockquote className="text-gray-600 leading-relaxed mb-8 flex-grow relative z-10 italic">
                         "{item.content}"
                      </blockquote>

                      {/* Profil Penulis */}
                      <div className="flex items-center gap-4 pt-6 border-t border-gray-50 relative z-10">
                         <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-white shadow-sm">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <User size={24} />
                              </div>
                            )}
                         </div>
                         <div>
                            <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                            <p className="text-xs text-maroon-primary font-bold uppercase tracking-wider mt-0.5">
                              {item.role}
                            </p>
                         </div>
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