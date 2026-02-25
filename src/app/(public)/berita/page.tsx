import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/layout/PageHeader";
import { getPageMeta } from "@/lib/page-meta";
import NewsToolbar from "@/components/public/NewsToolbar";
import Link from "next/link";
import { Calendar, ChevronLeft, ChevronRight, Clock, User, ArrowRight, Tag } from "lucide-react";

// Helper Format Tanggal Indonesia
const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric"
  });
};

type SearchParams = Promise<{
  q?: string;
  category?: string;
  page?: string;
}>;

export default async function BeritaPage(props: { searchParams: SearchParams }) {
  const params = await props.searchParams;
  const query = params.q || "";
  const category = params.category || "";
  const currentPage = Number(params.page) || 1;
  const itemsPerPage = 9;

  // 1. Ambil Banner
  const meta = await getPageMeta("berita", "Berita & Informasi");

  // 2. Buat Filter Query
  const whereCondition: any = {
    published: true, 
    ...(query && {
      OR: [
        { title: { contains: query } },
        { content: { contains: query } },
      ],
    }),
    ...(category && { category: category }),
  };

  // 3. Fetch Data
  const [posts, totalItems] = await Promise.all([
    prisma.post.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
    }),
    prisma.post.count({ where: whereCondition }),
  ]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Pisahkan Hero Post (Hanya tampil di halaman 1 jika tidak sedang search)
  const showHero = currentPage === 1 && !query && !category && posts.length > 0;
  const heroPost = showHero ? posts[0] : null;
  const listPosts = showHero ? posts.slice(1) : posts;

  return (
    <>
      <PageHeader
        title={meta.title}
        subtitle={meta.description || "Kabar terbaru seputar kegiatan dan prestasi yayasan."}
        image={meta.image}
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Berita", href: "/berita" },
        ]}
      />

      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="container-custom">
          
          {/* TOOLBAR (Search & Filter) */}
          <NewsToolbar />

          {/* EMPTY STATE */}
          {posts.length === 0 && (
             <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                   <Tag size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-700">Tidak ada berita ditemukan.</h3>
                <p className="text-sm text-gray-500">Coba gunakan kata kunci atau kategori lain.</p>
             </div>
          )}

          {/* HERO POST (Berita Utama) */}
          {heroPost && (
            <div className="mb-12 group relative rounded-3xl overflow-hidden shadow-xl bg-white border border-gray-100 grid grid-cols-1 lg:grid-cols-2 h-auto lg:h-[450px]">
               <div className="relative h-64 lg:h-full overflow-hidden">
                  <img 
                    src={heroPost.image || "/images/placeholder-news.jpg"} 
                    alt={heroPost.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-maroon-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Tag size={10} /> {heroPost.category}
                  </div>
               </div>
               
               <div className="p-8 lg:p-12 flex flex-col justify-center relative">
                  {/* Dekorasi Background */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-maroon-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-0"></div>

                  <div className="relative z-10">
                     <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-bold uppercase tracking-wide">
                        <span className="flex items-center gap-1"><Calendar size={14} className="text-maroon-primary" /> {formatDate(heroPost.createdAt)}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="flex items-center gap-1"><User size={14} className="text-maroon-primary" /> {heroPost.author || "Admin"}</span>
                     </div>
                     
                     <Link href={`/berita/${heroPost.slug}`}>
                        <h2 className="text-2xl lg:text-4xl font-serif font-bold text-gray-900 mb-4 group-hover:text-maroon-primary transition-colors leading-tight">
                           {heroPost.title}
                        </h2>
                     </Link>
                     
                     <p className="text-gray-600 mb-8 line-clamp-3 leading-relaxed text-lg">
                        {heroPost.excerpt || "Baca selengkapnya untuk mengetahui detail berita ini..."}
                     </p>
                     
                     <Link 
                       href={`/berita/${heroPost.slug}`} 
                       className="inline-flex items-center gap-2 text-white bg-maroon-primary px-6 py-3 rounded-xl font-bold hover:bg-maroon-dark hover:gap-3 transition-all shadow-md hover:shadow-lg"
                     >
                       Baca Selengkapnya <ArrowRight size={18} />
                     </Link>
                  </div>
               </div>
            </div>
          )}

          {/* GRID BERITA LAINNYA */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group hover:-translate-y-1">
                 {/* Image */}
                 <div className="h-56 overflow-hidden relative bg-gray-100">
                    <img 
                      src={post.image || "/images/placeholder-news.jpg"} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                       <Tag size={10} className="text-maroon-primary" /> {post.category}
                    </div>
                 </div>

                 {/* Content */}
                 <div className="p-6 flex flex-col flex-grow relative">
                    <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-3 uppercase font-bold tracking-wider">
                       <span className="flex items-center gap-1"><Clock size={12} /> {formatDate(post.createdAt)}</span>
                    </div>
                    
                    <Link href={`/berita/${post.slug}`} className="block mb-3">
                       <h3 className="font-serif font-bold text-xl text-gray-800 line-clamp-2 group-hover:text-maroon-primary transition-colors leading-snug">
                          {post.title}
                       </h3>
                    </Link>
                    
                    <p className="text-sm text-gray-500 line-clamp-3 mb-6 leading-relaxed flex-grow">
                       {post.excerpt}
                    </p>

                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                       <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                          <User size={12} /> {post.author || "Admin"}
                       </span>
                       <Link href={`/berita/${post.slug}`} className="text-xs font-bold text-maroon-primary hover:text-gold-primary flex items-center gap-1 transition-colors">
                          Selengkapnya <ArrowRight size={12} />
                       </Link>
                    </div>
                 </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-16">
              <Link
                href={`/berita?page=${currentPage - 1}&q=${query}&category=${category}`}
                className={`w-10 h-10 flex items-center justify-center rounded-full border ${
                  currentPage <= 1
                    ? "text-gray-300 border-gray-200 pointer-events-none"
                    : "text-gray-600 border-gray-300 hover:bg-white hover:shadow-md hover:text-maroon-primary transition-all"
                }`}
              >
                <ChevronLeft size={20} />
              </Link>

              <span className="text-sm font-medium text-gray-500">
                Halaman {currentPage} dari {totalPages}
              </span>

              <Link
                href={`/berita?page=${currentPage + 1}&q=${query}&category=${category}`}
                className={`w-10 h-10 flex items-center justify-center rounded-full border ${
                  currentPage >= totalPages
                    ? "text-gray-300 border-gray-200 pointer-events-none"
                    : "text-gray-600 border-gray-300 hover:bg-white hover:shadow-md hover:text-maroon-primary transition-all"
                }`}
              >
                <ChevronRight size={20} />
              </Link>
            </div>
          )}

        </div>
      </section>
    </>
  );
}