import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/layout/PageHeader";
import { getPageMeta } from "@/lib/page-meta"; // Pastikan helper ini sudah dibuat
import Link from "next/link";
import { ArrowRight, Globe, GraduationCap } from "lucide-react";

export default async function PendidikanFormalPage() {
  // 1. Ambil Data Banner Dinamis (Slug: 'pendidikan-formal')
  // Jika belum ada di DB, dia akan pakai default title "Pendidikan Formal"
  const meta = await getPageMeta("pendidikan-formal", "Pendidikan Formal");

  // 2. Ambil Data Unit Pendidikan Formal
  const units = await prisma.educationUnit.findMany({
    where: { 
      category: {
        contains: "Formal" 
      },
      NOT: {
        category: {
          contains: "Non" 
        }
      }
    },
    orderBy: { createdAt: "asc" },
  });

  return (
    <>
      {/* 1. Header Menggunakan Data Meta (Database) */}
      <PageHeader
        title={meta.title}
        subtitle={meta.description}
        image={meta.image} 
        breadcrumb={[
          { label: "Pendidikan", href: "/pendidikan" },
          { label: "Formal", href: "#" },
        ]}
      />

      <section className="py-20 bg-gray-50 min-h-[60vh]">
        <div className="container-custom">
          
          {/* INFO BAR KECIL */}
          <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
             <span className="w-1.5 h-6 bg-maroon-primary rounded-full"></span>
             <span>Menampilkan <strong>{units.length}</strong> unit pendidikan formal</span>
          </div>

          {/* GRID LAYOUT */}
          {units.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
               <GraduationCap size={48} className="text-gray-300 mx-auto mb-4"/>
               <h3 className="text-lg font-bold text-gray-600">Data Belum Tersedia</h3>
               <p className="text-gray-400 italic">Admin belum menginput data pendidikan formal.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
              {units.map((unit) => (
                <article
                  key={unit.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col h-full"
                >
                  {/* Image Header */}
                  <div className="h-60 w-full relative bg-gray-100 overflow-hidden">
                    <img
                      src={unit.image || "https://placehold.co/600x400?text=No+Image"}
                      alt={unit.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    {/* Badge Category (Konsisten dengan Halaman Lain) */}
                    <div className="absolute top-4 left-4 z-10">
                        <span className="bg-white/95 backdrop-blur-sm text-maroon-primary text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                          <GraduationCap size={12} /> FORMAL
                        </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7 flex flex-col flex-grow relative">
                    <h3 className="font-serif font-bold text-xl text-gray-900 mb-3 group-hover:text-maroon-primary transition-colors line-clamp-2 leading-tight">
                      {unit.name}
                    </h3>
                    
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow border-b border-gray-50 pb-4">
                      {unit.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      {/* Website Link */}
                      {unit.link ? (
                        <a
                          href={unit.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Globe size={14} /> Website
                        </a>
                      ) : (
                        <span className="text-xs text-gray-300 italic">Web Internal</span>
                      )}

                      {/* Detail Link */}
                      <Link
                        href={`/pendidikan/${unit.id}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-maroon-primary hover:text-maroon-dark transition-colors group/btn"
                      >
                        Profil
                        <span className="bg-maroon-primary/10 p-1 rounded-full group-hover/btn:bg-maroon-primary group-hover/btn:text-white transition-all">
                           <ArrowRight size={14} />
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}