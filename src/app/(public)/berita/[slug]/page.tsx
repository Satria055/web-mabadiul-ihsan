import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, ArrowRight, Calendar, User, Share2, Clock, MapPin, 
  Facebook, Twitter, CheckCircle, Tag 
} from "lucide-react";

// --- KOMPONEN SHARE BUTTON ---
const ShareButtons = ({ title, slug }: { title: string, slug: string }) => {
  const baseUrl = "https://mabadiul-ihsan.sch.id"; 
  const shareUrl = `${baseUrl}/berita/${slug}`;
  const text = `Baca berita: ${title}`;

  return (
    <div className="flex gap-3">
      <a 
        href={`https://wa.me/?text=${encodeURIComponent(text + " " + shareUrl)}`}
        target="_blank" rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#25D366] text-white hover:scale-110 transition-transform shadow-md"
        title="WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      </a>
      <a 
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank" rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:scale-110 transition-transform shadow-md"
        title="Facebook"
      >
        <Facebook size={18} />
      </a>
      <a 
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`}
        target="_blank" rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:scale-110 transition-transform shadow-md"
        title="Twitter / X"
      >
        <Twitter size={18} />
      </a>
    </div>
  );
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function NewsDetailPage(props: Props) {
  const params = await props.params;
  const slug = params.slug;

  const post = await prisma.post.findUnique({
    where: { slug: slug },
  });

  if (!post) return notFound();

  // Ambil Berita Terkait
  const relatedPosts = await prisma.post.findMany({
    where: {
      category: post.category,
      slug: { not: slug }
    },
    take: 3,
    orderBy: { createdAt: "desc" }
  });

  const eventDate = post.eventDate ? new Date(post.eventDate) : null;
  const today = new Date();
  const isPastEvent = eventDate ? eventDate < today : false;

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-24"> 
      
      {/* === HERO SECTION (FIX: overflow-hidden) === */}
      {/* Tambahkan overflow-hidden di sini agar zoom gambar tidak bocor */}
      <div className="relative h-[50vh] md:h-[60vh] w-full bg-gray-900 group overflow-hidden">
        <img 
          src={post.image || "https://placehold.co/1200x600?text=No+Image"} 
          alt={post.title}
          className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[3000ms]"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full pb-16 pt-32 px-4">
           <div className="container-custom">
              <Link href="/berita" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-bold mb-6 hover:-translate-x-1 duration-300">
                 <ArrowLeft size={18} /> Kembali ke Berita
              </Link>

              <div className="mb-4">
                <span className="bg-gold-primary text-maroon-dark px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex w-fit items-center gap-2">
                  <Tag size={12} /> {post.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.2] mb-6 drop-shadow-md max-w-5xl">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <User size={18} className="text-gold-primary" />
                  <span>{post.author || "Admin Redaksi"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-gold-primary" />
                  <span>
                    {new Date(post.createdAt).toLocaleDateString("id-ID", {
                       day: 'numeric', month: 'long', year: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* === KONTEN UTAMA & SIDEBAR === */}
      <div className="container-custom relative z-10 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* KOLOM KIRI */}
          <div className="lg:col-span-8 min-w-0">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 overflow-hidden">
              
              {post.eventDate && eventDate && (
                <div className={`border-l-4 p-6 rounded-r-xl mb-10 flex flex-col sm:flex-row sm:items-center gap-5 shadow-sm 
                  ${isPastEvent 
                    ? "bg-gray-50 border-gray-400" 
                    : "bg-gradient-to-r from-red-50 to-white border-maroon-primary"
                  }`}>
                  
                  <div className={`p-4 rounded-full shadow-sm shrink-0 border 
                    ${isPastEvent ? "bg-white text-gray-500 border-gray-200" : "bg-white text-maroon-primary border-red-100"}`}>
                    {isPastEvent ? <CheckCircle size={28} /> : <Calendar size={28} />}
                  </div>
                  
                  <div>
                    <h4 className={`font-bold text-lg ${isPastEvent ? "text-gray-700" : "text-gray-900"}`}>
                      {isPastEvent ? "Waktu Kegiatan" : "Simpan Tanggalnya!"}
                    </h4>
                    
                    <p className="text-gray-600 text-sm mt-1">
                      {isPastEvent ? "Kegiatan ini telah dilaksanakan pada:" : "Agenda ini akan dilaksanakan pada:"} <br/>
                      <span className={`font-serif font-bold text-xl block mt-1 ${isPastEvent ? "text-gray-700" : "text-maroon-primary"}`}>
                        {eventDate.toLocaleDateString("id-ID", {
                           weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                        })}
                      </span>
                    </p>
                  </div>
                </div>
              )}

              <article className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:text-gray-800 prose-p:text-gray-600 prose-img:rounded-xl prose-img:shadow-md prose-a:text-maroon-primary">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>

              <div className="mt-14 pt-8 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="font-bold text-gray-700 flex items-center gap-2 text-sm uppercase tracking-wide">
                    <Share2 size={18} className="text-gold-primary" /> Bagikan Kabar Ini:
                  </h3>
                  <ShareButtons title={post.title} slug={post.slug} />
                </div>
              </div>

            </div>
            
            {/* RELATED POSTS */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                 <h3 className="font-serif font-bold text-2xl text-gray-800 mb-6 flex items-center gap-3">
                    <span className="w-1 h-8 bg-maroon-primary rounded-full"></span>
                    Berita Terkait
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedPosts.map((item: any) => (
                      <Link href={`/berita/${item.slug}`} key={item.id} className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex gap-4 border border-gray-100">
                         <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                            <img src={item.image || "/images/placeholder-news.jpg"} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                         </div>
                         <div className="flex flex-col justify-center">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">{new Date(item.createdAt).toLocaleDateString("id-ID")}</span>
                            <h4 className="font-bold text-gray-800 leading-snug group-hover:text-maroon-primary transition-colors line-clamp-2">
                               {item.title}
                            </h4>
                         </div>
                      </Link>
                    ))}
                 </div>
              </div>
            )}
          </div>

          {/* KOLOM KANAN */}
          <aside className="lg:col-span-4 h-fit">
            <div className="sticky top-24 space-y-8">
              
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg text-center">
                <div className="w-16 h-16 bg-gold-primary/10 text-gold-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={32} />
                </div>
                <h3 className="font-serif font-bold text-xl text-maroon-primary mb-2">
                  Pendaftaran Santri Baru
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  Tahun Ajaran 2026/2027 telah dibuka. Mari bergabung menjadi bagian dari keluarga besar kami.
                </p>
                <Link 
                  href="/pendaftaran" 
                  className="block w-full bg-gold-primary text-maroon-dark font-bold py-3.5 rounded-xl hover:bg-yellow-500 hover:shadow-lg transition-all transform hover:-translate-y-1"
                >
                  Daftar Sekarang
                </Link>
              </div>

              <div className="bg-maroon-primary text-white p-8 rounded-3xl shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 relative z-10">
                  <MapPin size={20} className="text-gold-primary" /> Lokasi Kami
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6 relative z-10">
                  Jl. Pesantren No. 123, Wadungpal, Banyuwangi, Jawa Timur.
                </p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank"
                  className="inline-flex items-center gap-2 text-gold-primary text-sm font-bold hover:text-white transition-colors relative z-10"
                >
                  Buka Google Maps <ArrowRight size={14} />
                </a>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}