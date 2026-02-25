import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Edit, Users, School, Trophy, UserCheck, Plus } from "lucide-react";
import DeleteStatButton from "@/components/admin/DeleteStatButton"; // Import Baru

// Helper Icon Map
const iconMap: Record<string, any> = {
  "Users": Users,
  "School": School,
  "Trophy": Trophy,
  "UserCheck": UserCheck
};

export default async function AdminStatistikPage() {
  const stats = await prisma.stat.findMany({ orderBy: { id: 'asc' } });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800">Manajemen Statistik</h1>
          <p className="text-gray-500 text-sm">Angka statistik yang ditampilkan di halaman depan.</p>
        </div>
        <Link 
          href="/admin/statistik/tambah" 
          className="bg-maroon-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-maroon-dark transition-colors text-sm font-bold shadow-md"
        >
          <Plus size={18} /> Tambah Statistik
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 uppercase font-medium border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">Label</th>
              <th className="px-6 py-4">Ikon</th>
              <th className="px-6 py-4">Nilai</th>
              <th className="px-6 py-4">Suffix</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {stats.length === 0 ? (
                <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">
                        Belum ada data statistik.
                    </td>
                </tr>
            ) : (
                stats.map((item) => {
                    const IconComponent = iconMap[item.icon] || Users;
                    return (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">
                            {item.label}
                        </td>
                        <td className="px-6 py-4">
                            <div className="w-8 h-8 rounded-lg bg-maroon-primary/10 flex items-center justify-center text-maroon-primary">
                                <IconComponent size={18} />
                            </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-maroon-primary text-lg">
                            {item.value.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                            {item.suffix || "-"}
                        </td>
                        <td className="px-6 py-4 flex justify-center gap-2">
                            <Link 
                            href={`/admin/statistik/${item.id}`} 
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                            >
                            <Edit size={16} />
                            </Link>
                            
                            {/* TOMBOL DELETE BARU */}
                            <DeleteStatButton id={item.id} />
                        </td>
                        </tr>
                    );
                })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}