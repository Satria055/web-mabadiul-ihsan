import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { FileText, Trophy, ArrowRight, SearchX } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hasil Pencarian | Mabadi'ul Ihsan",
  description: "Menampilkan hasil pencarian konten website.",
};

// Mengambil parameter query (q) dari URL
interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams; // Next.js 16: searchParams is a Promise
  const query = params.q || "";

  // Jika query kosong
  if (!query) {
    return (
      <>
        <PageHeader title="Pencarian" breadcrumb={[{ label: "Pencarian", href: "/pencarian" }]} />
        <div className="container-custom py-20 text-center">
            <SearchX size={64} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500">Silakan masukkan kata kunci untuk mencari.</p>
        </div>
      </>
    );
  }

  // Cari di DATABASE (Berita & Prestasi)
  const [berita, prestasi] = await Promise.all([
    prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: query } }, // Tidak case-insensitive di semua DB, tapi cukup untuk start
          { content: { contains: query } },
        ],
        published: true,
      },
      take: 10,
    }),
    prisma.achievement.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { student: { contains: query } },
        ],
      },
      take: 10,
    }),
  ]);

  const isEmpty = berita.length === 0 && prestasi.length === 0;

  return (
    <>
      <PageHeader 
        title={`Hasil Pencarian: "${query}"`} 
        breadcrumb={[{ label: "Pencarian", href: "/pencarian" }]} 
      />

      <section className="py-20 bg-gray-50 min-h-[50vh]">
        <div className="container-custom">
          
          {isEmpty ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <SearchX size={64} className="text-gray-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Tidak ditemukan hasil</h3>
                <p className="text-gray-500">Coba gunakan kata kunci lain yang lebih umum.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* HASIL BERITA */}
                <div>
                   <h3 className="font-serif font-bold text-xl mb-6 flex items-center gap-2 border-b pb-2 border-gray-200">
                      <FileText className="text-maroon-primary" /> Berita & Artikel ({berita.length})
                   </h3>
                   <div className="space-y-4">
                      {berita.length === 0 ? <p className="text-gray-400 italic text-sm">Tidak ada berita ditemukan.</p> : 
                        berita.map((item) => (
                           <Link key={item.id} href={`/berita/${item.slug}`} className="block bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-maroon-primary/30 transition-all group">
                              <h4 className="font-bold text-gray-800 group-hover:text-maroon-primary mb-2 line-clamp-2">{item.title}</h4>
                              <p className="text-sm text-gray-500 line-clamp-2 mb-3">{item.excerpt || "Klik untuk membaca selengkapnya..."}</p>
                              <span className="text-xs font-bold text-gold-primary flex items-center gap-1">Baca Selengkapnya <ArrowRight size={12}/></span>
                           </Link>
                        ))
                      }
                   </div>
                </div>

                {/* HASIL PRESTASI */}
                <div>
                   <h3 className="font-serif font-bold text-xl mb-6 flex items-center gap-2 border-b pb-2 border-gray-200">
                      <Trophy className="text-maroon-primary" /> Data Prestasi ({prestasi.length})
                   </h3>
                   <div className="space-y-4">
                      {prestasi.length === 0 ? <p className="text-gray-400 italic text-sm">Tidak ada prestasi ditemukan.</p> : 
                        prestasi.map((item) => (
                           <div key={item.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4">
                              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center text-yellow-600 shrink-0">
                                 <Trophy size={20} />
                              </div>
                              <div>
                                 <h4 className="font-bold text-gray-800 line-clamp-1">{item.title}</h4>
                                 <p className="text-sm text-gray-500 mb-1">{item.student} - {item.level}</p>
                                 <span className="inline-block px-2 py-1 bg-gray-100 text-xs font-bold rounded text-gray-600">{item.category}</span>
                              </div>
                           </div>
                        ))
                      }
                   </div>
                </div>

            </div>
          )}
        </div>
      </section>
    </>
  );
}