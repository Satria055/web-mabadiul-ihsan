import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, Download, Play } from "lucide-react";

function getYoutubeId(url: string | null) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default async function Hero() {
  const config = await prisma.siteConfig.findFirst();

  // Data Default
  const heroTitle = config?.heroTitle || "Selamat Datang di Mabadi'ul Ihsan";
  const heroSubtitle = config?.heroSubtitle || "Pondok Pesantren Modern Berbasis Karakter";
  
  // Logic Video Background
  const videoUrl = config?.videoUrl || "/profil-sekolah.mp4"; 
  const youtubeId = getYoutubeId(videoUrl);

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center bg-gray-900">
      
      {/* BACKGROUND VIDEO */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {youtubeId ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] pointer-events-none">
             <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&showinfo=0&rel=0&iv_load_policy=3&disablekb=1`}
              allow="autoplay; encrypted-media"
              style={{ pointerEvents: 'none' }} 
            ></iframe>
          </div>
        ) : (
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-black/50 z-10"></div> 
      </div>

      {/* KONTEN UTAMA */}
      <div className="container-custom relative z-20 text-center text-white mt-16 px-4">
        
        {/* Badge PSB */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6 animate-fade-in-down">
          <span className="w-2 h-2 rounded-full bg-gold-primary animate-pulse"></span>
          <span className="text-xs md:text-sm font-medium tracking-wide uppercase text-gold-primary">
            Penerimaan Santri Baru Dibuka
          </span>
        </div>

        <h1 className="font-serif font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 drop-shadow-2xl">
          <span dangerouslySetInnerHTML={{ __html: heroTitle }} />
        </h1>

        <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10 font-light leading-relaxed">
          {heroSubtitle}
        </p>

        {/* TOMBOL DINAMIS (UPDATED) */}
        {/* Menggunakan flex-wrap dan center agar rapi di mobile & desktop */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          
          {/* 1. Tombol Daftar */}
          <Link 
            href={config?.registrationUrl || "/pendaftaran"} target="_blank"
            className="group relative px-6 py-3 md:px-8 md:py-4 bg-gold-primary text-maroon-dark font-bold text-sm md:text-base rounded-full overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.8)] flex justify-center items-center"
          >
            <span className="relative z-10 flex items-center gap-2">
              Daftar Sekarang <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          {/* 2. Tombol Brosur */}
          {config?.brosurUrl && (
            <Link 
              href={config.brosurUrl}
              target="_blank" 
              className="px-6 py-3 md:px-8 md:py-4 bg-transparent border-2 border-white text-white font-bold text-sm md:text-base rounded-full hover:bg-white hover:text-maroon-primary transition-all flex items-center justify-center gap-2"
            >
              <Download size={18} /> Unduh Brosur
            </Link>
          )}

          {/* 3. Tombol Official Youtube Channel */}
          {config?.youtube && (
            <Link 
              href={config.youtube}
              target="_blank"
              className="px-6 py-3 md:px-8 md:py-4 bg-red-600 text-white font-bold text-sm md:text-base rounded-full hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:-translate-y-1"
            >
              <Play size={18} className="fill-white text-white" />
              <span>Official Youtube</span>
            </Link>
          )}

        </div>
      </div>
    </section>
  );
}