import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/layout/PageHeader";
import { getPageMeta } from "@/lib/page-meta";
import PublicSearch from "@/components/public/PublicSearch";
import Link from "next/link";
import { ChevronLeft, ChevronRight, School } from "lucide-react";

// Tipe SearchParams
type SearchParams = Promise<{
  q?: string;
  page?: string;
}>;

export default async function FasilitasPage(props: {
  searchParams: SearchParams;
}) {
  const params = await props.searchParams;
  const query = params.q || "";
  const currentPage = Number(params.page) || 1;
  const itemsPerPage = 9; // 9 item agar grid 3x3 rapi

  // 1. Ambil Banner
  const meta = await getPageMeta("profil-fasilitas", "Fasilitas & Sarana");

  // 2. Filter & Pagination Logic
  const whereCondition = query
    ? {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
        ],
      }
    : {};

  const [facilities, totalItems] = await Promise.all([
    prisma.facility.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
    }),
    prisma.facility.count({ where: whereCondition }),
  ]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      <PageHeader
        title={meta.title}
        subtitle={meta.description}
        image={meta.image}
        breadcrumb={[
          { label: "Profil", href: "#" },
          { label: "Fasilitas", href: "/profil/fasilitas" },
        ]}
      />

      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="container-custom">
          
          {/* SEARCH BAR (Client Component) */}
          <PublicSearch placeholder="Cari nama fasilitas..." />

          {/* EMPTY STATE */}
          {facilities.length === 0 ? (
            <div className="text-center py-20">
               <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <School size={32} />
               </div>
               <h3 className="text-lg font-bold text-gray-600">Tidak ditemukan</h3>
               <p className="text-gray-500">
                 Coba cari dengan kata kunci lain.
               </p>
            </div>
          ) : (
            /* GRID FACILITIES */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
                >
                  {/* Gambar dengan Efek Zoom */}
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300"></div>
                  </div>

                  {/* Konten */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-serif font-bold text-gray-800 mb-3 group-hover:text-maroon-primary transition-colors">
                      {item.name}
                    </h3>
                    <div className="w-12 h-1 bg-gold-primary mb-4 rounded-full"></div>
                    <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PAGINATION UI */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-16">
              <Link
                href={`/profil/fasilitas?page=${currentPage - 1}&q=${query}`}
                className={`w-10 h-10 flex items-center justify-center rounded-full border ${
                  currentPage <= 1
                    ? "text-gray-300 border-gray-200 pointer-events-none"
                    : "text-gray-600 border-gray-300 hover:bg-white hover:shadow-md hover:text-maroon-primary transition-all"
                }`}
              >
                <ChevronLeft size={20} />
              </Link>

              <span className="text-sm font-medium text-gray-500">
                Halaman {currentPage} dari {totalPages}
              </span>

              <Link
                href={`/profil/fasilitas?page=${currentPage + 1}&q=${query}`}
                className={`w-10 h-10 flex items-center justify-center rounded-full border ${
                  currentPage >= totalPages
                    ? "text-gray-300 border-gray-200 pointer-events-none"
                    : "text-gray-600 border-gray-300 hover:bg-white hover:shadow-md hover:text-maroon-primary transition-all"
                }`}
              >
                <ChevronRight size={20} />
              </Link>
            </div>
          )}

        </div>
      </section>
    </>
  );
}