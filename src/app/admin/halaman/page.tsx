import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Edit, Plus, Layout, Image as ImageIcon, Globe } from "lucide-react";
import DeletePageButton from "@/components/admin/DeletePageButton"; 

export default async function AdminHalamanPage() {
  const pages = await prisma.pageMeta.findMany({ orderBy: { slug: "asc" } });

  return (
    <div className="pb-20"> 
      {/* ^^^ FIX: Hapus 'max-w-6xl mx-auto' agar Full Width */}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800 flex items-center gap-2">
            <Layout className="text-maroon-primary" size={28}/> Manajemen Halaman
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Atur banner (hero image), judul, dan deskripsi untuk setiap halaman publik.
          </p>
        </div>
        <Link 
          href="/admin/halaman/tambah" 
          className="bg-maroon-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-maroon-dark transition-colors shadow-md"
        >
          <Plus size={18} /> Tambah Halaman
        </Link>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider w-40">Banner</th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Info Halaman</th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Judul (Meta Title)</th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50 transition-colors group">
                  
                  {/* Kolom 1: Banner Preview */}
                  <td className="p-5">
                    <div className="h-16 w-28 bg-gray-100 rounded-lg overflow-hidden relative border border-gray-200 shadow-sm">
                      {page.image ? (
                        <img src={page.image} alt="Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 bg-gray-50">
                          <ImageIcon size={20}/>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Kolom 2: Slug & Link */}
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="font-mono text-sm font-bold text-maroon-primary bg-maroon-primary/5 px-2 py-1 rounded w-fit mb-1">
                        /{page.slug}
                      </span>
                      <a 
                        href={`/${page.slug === 'home' ? '' : page.slug}`} 
                        target="_blank" 
                        className="text-xs text-gray-400 hover:text-blue-600 flex items-center gap-1 transition-colors"
                      >
                        <Globe size={10} /> Lihat di Website
                      </a>
                    </div>
                  </td>

                  {/* Kolom 3: Judul */}
                  <td className="p-5">
                    <span className="font-bold text-gray-800 text-sm md:text-base">
                      {page.title}
                    </span>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                      {page.description || "Tidak ada deskripsi"}
                    </p>
                  </td>

                  {/* Kolom 4: Aksi */}
                  <td className="p-5">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/admin/halaman/${page.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                        title="Edit Halaman"
                      >
                        <Edit size={18} />
                      </Link>
                      
                      <DeletePageButton id={page.id} />
                    </div>
                  </td>
                </tr>
              ))}
              
              {pages.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-400">
                    Belum ada halaman yang dikonfigurasi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}