import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/layout/PageHeader";
import { getPageMeta } from "@/lib/page-meta";
import Pagination from "@/components/ui/Pagination";
import GalleryToolbar from "@/components/public/GalleryToolbar";
import { ImageIcon, ZoomIn } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ page?: string; unit?: string }>;
}

export default async function GaleriPage(props: PageProps) {
  const searchParams = await props.searchParams;
  
  // 1. Konfigurasi
  const ITEMS_PER_PAGE = 12; // Lebih banyak foto dalam satu halaman
  const currentPage = Number(searchParams.page) || 1;
  const unitFilter = searchParams.unit ? Number(searchParams.unit) : undefined;
  
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  // 2. Data Meta
  const meta = await getPageMeta("galeri", "Galeri Kegiatan");

  // 3. Ambil Daftar Unit untuk Filter Toolbar
  const units = await prisma.educationUnit.findMany({
    select: { id: true, name: true }
  });

  // 4. Kondisi Filter (Where)
  const whereCondition = unitFilter ? { unitId: unitFilter } : {};

  // 5. Query Data Galeri & Total
  const [galleries, totalItems] = await Promise.all([
    prisma.educationGallery.findMany({
      where: whereCondition,
      take: ITEMS_PER_PAGE,
      skip: skip,
      include: {
        unit: { select: { name: true, category: true } }
      },
      orderBy: { id: "desc" },
    }),
    prisma.educationGallery.count({ where: whereCondition }),
  ]);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <>
      <PageHeader
        title={meta.title}
        subtitle={meta.description}
        image={meta.image} 
        breadcrumb={[ { label: "Galeri", href: "/galeri" } ]}
      />

      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="container-custom">
          
          {/* TOOLBAR FILTER */}
          <GalleryToolbar units={units} />

          {/* Info Hasil */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
             <span className="w-1.5 h-6 bg-maroon-primary rounded-full"></span>
             <span>Menampilkan <strong>{galleries.length}</strong> dari <strong>{totalItems}</strong> dokumentasi</span>
          </div>

          {galleries.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <ImageIcon size={32} />
               </div>
               <h3 className="text-lg font-bold text-gray-600">Tidak Ditemukan</h3>
               <p className="text-gray-400 italic">Belum ada foto untuk kategori ini.</p>
            </div>
          ) : (
            <>
              {/* MASONRY GRID LAYOUT */}
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {galleries.map((item) => (
                  <div 
                    key={item.id} 
                    className="group relative break-inside-avoid rounded-2xl overflow-hidden bg-gray-200 shadow-md hover:shadow-2xl transition-all duration-500 cursor-zoom-in"
                  >
                    <img 
                      src={item.image} 
                      alt={item.caption || "Dokumentasi Kegiatan"}
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    
                    {/* Overlay Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="inline-block w-fit bg-gold-primary text-maroon-dark text-[10px] font-bold px-2 py-1 rounded mb-2 uppercase tracking-wider shadow-sm">
                        {item.unit.name}
                      </span>
                      <p className="text-white font-medium text-sm line-clamp-2 leading-relaxed">
                        {item.caption || "Dokumentasi Kegiatan"}
                      </p>
                      <div className="absolute top-4 right-4 text-white/70 group-hover:text-white transition-colors bg-white/10 p-2 rounded-full backdrop-blur-sm">
                         <ZoomIn size={18} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* PAGINATION */}
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                baseUrl="/galeri" 
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}