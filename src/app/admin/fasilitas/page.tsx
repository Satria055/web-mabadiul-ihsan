import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, School, ChevronLeft, ChevronRight } from "lucide-react";
import DeleteFacilityButton from "@/components/admin/DeleteFacilityButton";
import FacilityToolbar from "@/components/admin/FacilityToolbar";

// Tipe SearchParams Next.js 15
type SearchParams = Promise<{
  q?: string;
  page?: string;
}>;

export default async function AdminFasilitasPage(props: {
  searchParams: SearchParams;
}) {
  const params = await props.searchParams;
  const query = params.q || "";
  const currentPage = Number(params.page) || 1;
  const itemsPerPage = 8; // Tampilkan 8 fasilitas per halaman

  // 1. Filter Pencarian
  const whereCondition = query
    ? {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
        ],
      }
    : {};

  // 2. Fetch Data & Hitung Total
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
    <div className="pb-20">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800">
            Manajemen Fasilitas
          </h1>
          <p className="text-gray-500 text-sm">
            Kelola sarana dan prasarana sekolah.
          </p>
        </div>
        <Link
          href="/admin/fasilitas/tambah"
          className="bg-maroon-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-maroon-dark transition-colors text-sm font-bold shadow-md"
        >
          <Plus size={18} /> Tambah Fasilitas
        </Link>
      </div>

      {/* SEARCH TOOLBAR */}
      <FacilityToolbar />

      {/* CONTENT */}
      {facilities.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <School className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Data fasilitas tidak ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {facilities.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all"
            >
              {/* Foto */}
              <div className="h-48 w-full bg-gray-100 relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-1" title={item.name}>
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                  {item.description || "Tidak ada deskripsi."}
                </p>

                <div className="mt-auto flex items-center justify-end gap-2 pt-3 border-t border-gray-50">
                  <Link
                    href={`/admin/fasilitas/${item.id}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </Link>
                  <DeleteFacilityButton id={item.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Link
            href={`/admin/fasilitas?page=${currentPage - 1}&q=${query}`}
            className={`p-2 rounded-lg border ${
              currentPage <= 1
                ? "text-gray-300 border-gray-200 pointer-events-none"
                : "text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            <ChevronLeft size={20} />
          </Link>

          <span className="text-sm font-medium text-gray-600">
            Halaman {currentPage} dari {totalPages}
          </span>

          <Link
            href={`/admin/fasilitas?page=${currentPage + 1}&q=${query}`}
            className={`p-2 rounded-lg border ${
              currentPage >= totalPages
                ? "text-gray-300 border-gray-200 pointer-events-none"
                : "text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            <ChevronRight size={20} />
          </Link>
        </div>
      )}
    </div>
  );
}