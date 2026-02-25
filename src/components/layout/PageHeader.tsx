import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image?: string; // URL gambar background
  breadcrumb?: { label: string; href: string }[];
}

export default function PageHeader({ 
  title, 
  subtitle, 
  image = "/images/header-bg-default.jpg", // Pastikan Anda punya gambar default di public/images
  breadcrumb 
}: PageHeaderProps) {
  return (
    <section className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-maroon-dark/80 z-10"></div>
        {/* Menggunakan img tag biasa agar mudah, bisa diganti Next Image */}
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-20 text-center text-white pt-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-white/60 mb-4 font-medium uppercase tracking-wider">
          <Link href="/" className="hover:text-gold-primary transition-colors flex items-center gap-1">
            <Home size={14} /> Beranda
          </Link>
          {breadcrumb && breadcrumb.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
               <ChevronRight size={14} />
               <Link href={item.href} className="hover:text-gold-primary transition-colors">
                 {item.label}
               </Link>
            </div>
          ))}
          <ChevronRight size={14} />
          <span className="text-gold-primary">{title}</span>
        </div>

        {/* Title */}
        <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-lg text-white/80 max-w-2xl mx-auto font-light">
            {subtitle}
          </p>
        )}

      </div>
    </section>
  );
}