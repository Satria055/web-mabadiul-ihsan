import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import AdminToolbar from "@/components/admin/AdminToolbar";
import DeletePostButton from "@/components/admin/DeletePostButton"; // Tombol Delete Baru

type SearchParams = Promise<{ 
  q?: string; category?: string; date?: string; page?: string; 
}>;

export default async function AdminBeritaPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const query = searchParams.q || "";
  const category = searchParams.category || "";
  const dateFilter = searchParams.date || ""; 
  const currentPage = Number(searchParams.page) || 1;
  const itemsPerPage = 10; 

  // BANGUN FILTER
  const whereCondition: any = {
    title: { contains: query },
  };

  if (category) whereCondition.category = category;

  if (dateFilter) {
    const parts = dateFilter.split("-");
    if (parts.length === 2) {
      const year = parseInt(parts[0]);
      const month = parseInt(parts[1]);
      if (!isNaN(year) && !isNaN(month)) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        whereCondition.createdAt = { gte: startDate, lte: endDate };
      }
    }
  }

  // FETCH DATA
  const [posts, totalPosts] = await Promise.all([
    prisma.post.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
    }),
    prisma.post.count({ where: whereCondition }),
  ]);

  const totalPages = Math.ceil(totalPosts / itemsPerPage);

  return (
    <div>
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800">Manajemen Berita</h1>
          <p className="text-gray-500 text-sm">Total {totalPosts} artikel ditemukan</p>
        </div>
        <Link 
          href="/admin/berita/tambah" 
          className="bg-maroon-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-maroon-dark transition-colors text-sm font-bold shadow-md"
        >
          <Plus size={18} /> Tulis Berita Baru
        </Link>
      </div>

      <AdminToolbar />

      {/* Tabel Data */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 uppercase font-medium border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">Berita & Artikel</th>
              <th className="px-6 py-4 hidden md:table-cell">Kategori</th>
              <th className="px-6 py-4 hidden md:table-cell">Tanggal</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic">
                  Tidak ada berita yang cocok dengan filter Anda.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                        {post.image ? (
                           <Image src={post.image} alt={post.title} fill sizes="48px" className="object-cover" unoptimized />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ImageIcon size={20} />
                          </div>
                        )}
                      </div>
                      <span className="line-clamp-2 max-w-xs leading-snug">{post.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold uppercase border border-blue-100">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 hidden md:table-cell">
                    {new Date(post.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <Link href={`/admin/berita/${post.id}`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                      <Edit size={18} />
                    </Link>
                    
                    {/* Tombol Delete Baru dengan Delay Alert */}
                    <DeletePostButton id={post.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Link href={`/admin/berita?page=${currentPage - 1}&q=${query}&category=${category}&date=${dateFilter}`} className={`p-2 rounded-lg border ${currentPage <= 1 ? 'text-gray-300 border-gray-200 pointer-events-none' : 'text-gray-600 border-gray-300 hover:bg-gray-50'}`}>
            <ChevronLeft size={20} />
          </Link>
          <span className="text-sm font-medium text-gray-600 px-4">Halaman {currentPage} dari {totalPages}</span>
          <Link href={`/admin/berita?page=${currentPage + 1}&q=${query}&category=${category}&date=${dateFilter}`} className={`p-2 rounded-lg border ${currentPage >= totalPages ? 'text-gray-300 border-gray-200 pointer-events-none' : 'text-gray-600 border-gray-300 hover:bg-gray-50'}`}>
            <ChevronRight size={20} />
          </Link>
        </div>
      )}
    </div>
  );
}