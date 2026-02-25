import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Star, ChevronLeft, ChevronRight, Quote, User } from "lucide-react";
import DeleteTestimonialButton from "@/components/admin/DeleteTestimonialButton"; // Import Baru

type SearchParams = Promise<{ 
  q?: string; rating?: string; page?: string; 
}>;

export default async function AdminTestimoniPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const query = searchParams.q || "";
  const ratingFilter = searchParams.rating ? parseInt(searchParams.rating) : undefined;
  const currentPage = Number(searchParams.page) || 1;
  const itemsPerPage = 9;

  // Build Filter
  const whereCondition: any = {
    OR: [
      { name: { contains: query } },
      { content: { contains: query } },
    ]
  };

  if (ratingFilter) {
    whereCondition.rating = ratingFilter;
  }

  // Fetch Data
  const [testimonials, totalItems] = await Promise.all([
    prisma.testimonial.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
    }),
    prisma.testimonial.count({ where: whereCondition }),
  ]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800">Manajemen Testimoni</h1>
          <p className="text-gray-500 text-sm">Total {totalItems} ulasan diterima</p>
        </div>
        <Link 
          href="/admin/testimoni/tambah" 
          className="bg-maroon-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-maroon-dark transition-colors text-sm font-bold shadow-md"
        >
          <Plus size={18} /> Tambah Testimoni
        </Link>
      </div>

      {/* Grid Card Testimoni */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {testimonials.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-400 italic bg-white rounded-xl border border-gray-200">
            Belum ada data testimoni yang sesuai filter.
          </div>
        ) : (
          testimonials.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col h-full hover:shadow-md transition-shadow relative group">
              
              {/* Toolbar Aksi (Edit & Delete) */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <Link href={`/admin/testimoni/${item.id}`} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition-colors border border-blue-100 bg-white shadow-sm">
                    <Edit size={16} />
                 </Link>
                 
                 {/* TOMBOL DELETE BARU */}
                 <div className="border border-red-100 rounded-md bg-white shadow-sm flex items-center justify-center">
                    <DeleteTestimonialButton id={item.id} />
                 </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < item.rating ? "currentColor" : "none"} className={i < item.rating ? "" : "text-gray-300"} />
                ))}
              </div>

              {/* Konten */}
              <div className="flex-1 mb-6 relative">
                 <Quote className="absolute -top-2 -left-2 text-maroon-primary/10 rotate-180" size={32} />
                 <p className="text-gray-600 text-sm italic relative z-10 leading-relaxed">"{item.content}"</p>
              </div>

              {/* Profil */}
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                   {item.image ? (
                     <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center bg-maroon-primary text-white text-xs font-bold">
                        {item.name.charAt(0)}
                     </div>
                   )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-gray-500 line-clamp-1">{item.role}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
            <span className="text-xs text-gray-400">Navigasi Halaman..</span>
        </div>
      )}
    </div>
  );
}