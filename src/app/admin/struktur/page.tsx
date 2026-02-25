import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, User, ChevronLeft, ChevronRight } from "lucide-react";
import DeleteMemberButton from "@/components/admin/DeleteMemberButton";
import OrganizationToolbar from "@/components/admin/OrganizationToolbar";

// Tipe untuk Next.js 15 SearchParams
type SearchParams = Promise<{
  q?: string;
  page?: string;
}>;

export default async function AdminStrukturPage(props: {
  searchParams: SearchParams;
}) {
  const params = await props.searchParams;
  const query = params.q || "";
  const currentPage = Number(params.page) || 1;
  const itemsPerPage = 10; // Menampilkan 10 item agar grid 5 kolom terlihat pas (2 baris)

  // 1. KONDISI PENCARIAN (WHERE)
  const whereCondition = query
    ? {
        OR: [
          { name: { contains: query } },
          { position: { contains: query } },
        ],
      }
    : {};

  // 2. FETCH DATA DENGAN PAGINATION
  const [members, totalItems] = await Promise.all([
    prisma.organizationMember.findMany({
      where: whereCondition,
      orderBy: { order: "asc" },
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
    }),
    prisma.organizationMember.count({ where: whereCondition }),
  ]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="pb-20"> 
      {/* ^^^ HAPUS 'max-w-6xl mx-auto' AGAR FULL WIDTH */}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800">
            Struktur Organisasi
          </h1>
          <p className="text-gray-500 text-sm">
            Kelola daftar pengurus yayasan.
          </p>
        </div>
        <Link
          href="/admin/struktur/tambah"
          className="bg-maroon-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-maroon-dark transition-colors text-sm font-bold shadow-md"
        >
          <Plus size={18} /> Tambah Pengurus
        </Link>
      </div>

      {/* TOOLBAR PENCARIAN */}
      <OrganizationToolbar />

      {/* EMPTY STATE */}
      {members.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <User className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Data tidak ditemukan.</p>
          {query && (
            <p className="text-xs text-gray-400 mt-1">
              Coba gunakan kata kunci lain.
            </p>
          )}
        </div>
      ) : (
        /* GRID DATA - LEBIH RESPONSIF & FILL AREA */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {members.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all"
            >
              {/* Foto */}
              <div className="h-56 w-full bg-gray-100 relative overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                    <User size={64} />
                  </div>
                )}
                {/* Badge Urutan */}
                <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">
                  Urut: {item.order}
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-grow">
                <h3
                  className="font-bold text-gray-800 text-base mb-1 line-clamp-1"
                  title={item.name}
                >
                  {item.name}
                </h3>
                <p className="text-xs text-maroon-primary font-bold uppercase tracking-wider mb-4 line-clamp-1">
                  {item.position}
                </p>

                <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
                  <span className="text-[10px] text-gray-400">
                    ID: {item.id}
                  </span>
                  <div className="flex gap-1">
                    <Link
                      href={`/admin/struktur/${item.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </Link>
                    <DeleteMemberButton id={item.id} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION UI */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Link
            href={`/admin/struktur?page=${currentPage - 1}&q=${query}`}
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
            href={`/admin/struktur?page=${currentPage + 1}&q=${query}`}
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