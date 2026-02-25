import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Edit, Plus, ClipboardList, UserCheck, Megaphone, CheckCircle2, FileText, Banknote, Shirt, CalendarCheck } from "lucide-react";
import DeleteStepButton from "@/components/admin/DeleteStepButton"; // Import Baru

// Mapping Icon agar dinamis
const iconMap: any = {
  ClipboardList, UserCheck, Megaphone, CheckCircle2, FileText, Banknote, Shirt, CalendarCheck
};

export default async function AdminAlurPage() {
  const steps = await prisma.registrationStep.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800">Alur Pendaftaran</h1>
          <p className="text-gray-500 text-sm">Kelola tahapan PPDB yang ditampilkan di halaman depan.</p>
        </div>
        <Link 
          href="/admin/alur-pendaftaran/tambah" 
          className="bg-maroon-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-maroon-dark transition-colors text-sm font-bold shadow-md"
        >
          <Plus size={18} /> Tambah Tahapan
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 uppercase font-medium border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 w-20 text-center">Urutan</th>
              <th className="px-6 py-4">Judul Tahapan</th>
              <th className="px-6 py-4">Deskripsi</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {steps.length === 0 ? (
                <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic">
                        Belum ada tahapan pendaftaran.
                    </td>
                </tr>
            ) : (
                steps.map((item) => {
                    const Icon = iconMap[item.icon] || ClipboardList;
                    return (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-center font-bold text-gray-400">
                            {item.order}
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">
                             <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-lg bg-maroon-primary/10 flex items-center justify-center text-maroon-primary">
                                    <Icon size={16}/>
                                 </div>
                                 {item.title}
                             </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 max-w-md truncate">
                            {item.description}
                        </td>
                        <td className="px-6 py-4 flex justify-center gap-2">
                            <Link 
                            href={`/admin/alur-pendaftaran/${item.id}`} 
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                            >
                            <Edit size={16} />
                            </Link>
                            
                            {/* TOMBOL DELETE BARU */}
                            <DeleteStepButton id={item.id} />
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