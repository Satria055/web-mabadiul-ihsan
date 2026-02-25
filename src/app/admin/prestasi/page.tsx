import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trophy, ChevronLeft, ChevronRight, Medal } from "lucide-react";
import AchievementToolbar from "@/components/admin/AchievementToolbar";
import DeleteAchievementButton from "@/components/admin/DeleteAchievementButton"; // Import Baru

type SearchParams = Promise<{ 
  q?: string; 
  category?: string; 
  page?: string; 
}>;

export default async function AdminPrestasiPage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams;

  const query = searchParams.q || "";
  const category = searchParams.category || "";
  const currentPage = Number(searchParams.page) || 1;
  const itemsPerPage = 10;

  const whereCondition: any = {
    OR: [
      { title: { contains: query } },
      { student: { contains: query } },
    ]
  };

  if (category) {
    whereCondition.category = category;
  }

  const [achievements, totalItems] = await Promise.all([
    prisma.achievement.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
    }),
    prisma.achievement.count({ where: whereCondition }),
  ]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800">Manajemen Prestasi</h1>
          <p className="text-gray-500 text-sm">Total {totalItems} prestasi tercatat</p>
        </div>
        <Link 
          href="/admin/prestasi/tambah" 
          className="bg-maroon-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-maroon-dark transition-colors text-sm font-bold shadow-md"
        >
          <Plus size={18} /> Input Prestasi Baru
        </Link>
      </div>

      <AchievementToolbar />

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 uppercase font-medium border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">Prestasi / Kejuaraan</th>
              <th className="px-6 py-4 hidden md:table-cell">Siswa / Tim</th>
              <th className="px-6 py-4 hidden md:table-cell">Peringkat</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {achievements.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic">
                  Belum ada data prestasi.
                </td>
              </tr>
            ) : (
              achievements.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-600 shrink-0">
                         <Trophy size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{item.title}</div>
                        <div className="text-xs text-gray-500">{item.level} • {item.date}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell font-medium text-gray-700">
                    {item.student}
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold border ${
                      item.rank === 1 ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                      item.rank === 2 ? "bg-gray-100 text-gray-700 border-gray-200" :
                      item.rank === 3 ? "bg-orange-50 text-orange-700 border-orange-200" :
                      "bg-blue-50 text-blue-700 border-blue-200"
                    }`}>
                      <Medal size={12} />
                      {item.rank === 0 ? "Harapan" : `Juara ${item.rank}`}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <Link href={`/admin/prestasi/${item.id}`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                      <Edit size={18} />
                    </Link>
                    
                    {/* TOMBOL DELETE BARU */}
                    <DeleteAchievementButton id={item.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (Bisa gunakan komponen Pagination reusable jika ada) */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
           {/* Logic Pagination Sederhana */}
           <span className="text-xs text-gray-400">Navigasi Halaman..</span>
        </div>
      )}
    </div>
  );
}