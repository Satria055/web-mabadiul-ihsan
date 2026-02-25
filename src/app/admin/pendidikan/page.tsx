import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
import AdminEducationList from "./AdminEducationList";
import EducationToolbar from "@/components/admin/EducationToolbar"; // Import Toolbar Baru

// Definisikan Tipe Params (Next.js 15)
type SearchParams = Promise<{ 
  q?: string; 
  category?: string; 
  page?: string; 
  status?: string; 
}>;

export default async function AdminPendidikanPage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams;

  // 1. Ambil Params
  const query = searchParams.q || "";
  const category = searchParams.category || "";
  const currentPage = Number(searchParams.page) || 1;
  const status = searchParams.status;
  const itemsPerPage = 8; // Grid biasanya butuh lebih sedikit per halaman agar rapi

  // 2. Build Query
  const whereCondition: any = {
    name: { contains: query }, // Cari berdasarkan Nama Unit
  };

  if (category) {
    whereCondition.category = category;
  }

  // 3. Fetch Data
  const [units, totalUnits] = await Promise.all([
    prisma.educationUnit.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
    }),
    prisma.educationUnit.count({ where: whereCondition }),
  ]);

  const totalPages = Math.ceil(totalUnits / itemsPerPage);

  return (
    <div>
      {/* ALERT NOTIFICATION */}
      {status && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 shadow-sm animate-in slide-in-from-top-2 duration-300
          ${status === 'deleted' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}
        >
          <div className={`w-2 h-2 rounded-full ${status === 'deleted' ? 'bg-red-500' : 'bg-green-500'}`} />
          <p className="text-sm font-medium">
            {status === 'created' && "Unit pendidikan berhasil ditambahkan!"}
            {status === 'updated' && "Data unit berhasil diperbarui."}
            {status === 'deleted' && "Unit pendidikan berhasil dihapus."}
          </p>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800 flex items-center gap-2">
            Manajemen Unit Pendidikan
          </h1>
          <p className="text-gray-500 text-sm">Total {totalUnits} lembaga terdaftar</p>
        </div>
        <Link 
          href="/admin/pendidikan/tambah" 
          className="bg-maroon-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-maroon-dark transition-colors text-sm font-bold shadow-md"
        >
          <Plus size={18} /> Tambah Unit
        </Link>
      </div>

      {/* TOOLBAR (Search & Filter) */}
      <EducationToolbar />

      {/* LIST CONTENT */}
      {/* Kita oper data 'units' yang sudah difilter dari server */}
      <AdminEducationList units={units} />

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Link
            href={`/admin/pendidikan?page=${currentPage - 1}&q=${query}&category=${category}`}
            className={`p-2 rounded-lg border ${currentPage <= 1 ? 'text-gray-300 border-gray-200 pointer-events-none' : 'text-gray-600 border-gray-300 hover:bg-gray-50'}`}
          >
            <ChevronLeft size={20} />
          </Link>
          
          <span className="text-sm font-medium text-gray-600 px-4">
            Halaman {currentPage} dari {totalPages}
          </span>

          <Link
            href={`/admin/pendidikan?page=${currentPage + 1}&q=${query}&category=${category}`}
            className={`p-2 rounded-lg border ${currentPage >= totalPages ? 'text-gray-300 border-gray-200 pointer-events-none' : 'text-gray-600 border-gray-300 hover:bg-gray-50'}`}
          >
            <ChevronRight size={20} />
          </Link>
        </div>
      )}
    </div>
  );
}