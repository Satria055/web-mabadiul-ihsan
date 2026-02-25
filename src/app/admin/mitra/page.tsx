import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Globe } from "lucide-react";
import DeletePartnerButton from "@/components/admin/DeletePartnerButton"; // Import Baru

export default async function AdminMitraPage() {
  // Urutkan berdasarkan 'order' asc (kecil ke besar)
  const partners = await prisma.partner.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800">Mitra Kerja Sama</h1>
          <p className="text-gray-500 text-sm">Kelola daftar partner dan instansi terkait.</p>
        </div>
        <Link 
          href="/admin/mitra/tambah" 
          className="bg-maroon-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-maroon-dark transition-colors text-sm font-bold shadow-md"
        >
          <Plus size={18} /> Tambah Mitra
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 uppercase font-medium border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 w-20 text-center">No.</th>
              <th className="px-6 py-4 w-32">Logo</th>
              <th className="px-6 py-4">Nama Instansi</th>
              <th className="px-6 py-4">Website</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {partners.length === 0 ? (
                <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">
                        Belum ada data mitra kerja sama.
                    </td>
                </tr>
            ) : (
                partners.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-center font-bold text-gray-400">
                        {item.order}
                    </td>
                    <td className="px-6 py-4">
                        <div className="relative w-24 h-12 bg-gray-50 rounded border border-gray-200 flex items-center justify-center overflow-hidden">
                            {item.logo ? (
                                <Image src={item.logo} alt={item.name} fill className="object-contain p-2" sizes="96px" />
                            ) : (
                                <span className="text-xs text-gray-400">No Logo</span>
                            )}
                        </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                        {item.name}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                        {item.website ? (
                            <a href={item.website} target="_blank" className="flex items-center gap-1 text-blue-600 hover:underline">
                                <Globe size={14} /> Link
                            </a>
                        ) : "-"}
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                        <Link 
                        href={`/admin/mitra/${item.id}`} 
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                        >
                        <Edit size={16} />
                        </Link>
                        
                        {/* TOMBOL DELETE BARU */}
                        <DeletePartnerButton id={item.id} />
                    </td>
                    </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}