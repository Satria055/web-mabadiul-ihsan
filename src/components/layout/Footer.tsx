import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Globe } from "lucide-react";

export default async function Footer() {
  const config = await prisma.siteConfig.findFirst();
  const logoUrl = config?.logoUrl || "/logo-placeholder.png";

  return (
    <footer className="bg-maroon-dark text-white pt-16">
      
      {/* Container Konten Utama */}
      <div className="container-custom mb-16">
        {/* Menggunakan gap yang cukup (gap-12) agar tetap rapi tanpa garis pembatas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* === KOLOM 1: Identitas === */}
          <div>
            <div className="flex flex-col items-start mb-6">
              <div className="relative w-48 md:w-56 h-auto mb-4">
                 <img 
                    src={logoUrl} 
                    alt="Logo Footer" 
                    className="w-full h-full object-contain drop-shadow-sm"
                 />
              </div>
              <div>
                <h3 className="font-serif font-bold text-2xl md:text-3xl text-white tracking-wide leading-none mb-2">
                  {config?.siteName || "MABADI'UL IHSAN"}
                </h3>
                <p className="text-sm text-gold-primary font-bold uppercase tracking-[0.15em]">
                  Yayasan Pondok Pesantren
                </p>
              </div>
            </div>

            <p className="text-white/70 text-sm leading-relaxed mb-8 border-l-2 border-gold-primary pl-4 italic">
               "Mewujudkan generasi santri yang berakhlakul karimah, cerdas secara intelektual, dan mandiri berlandaskan Ahlussunnah wal Jama'ah."
            </p>
            
            <div className="flex gap-3">
              {config?.facebook && <a href={config.facebook} target="_blank" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold-primary hover:border-gold-primary hover:text-maroon-dark transition-all group"><Facebook size={18} className="group-hover:scale-110 transition-transform"/></a>}
              {config?.instagram && <a href={config.instagram} target="_blank" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold-primary hover:border-gold-primary hover:text-maroon-dark transition-all group"><Instagram size={18} className="group-hover:scale-110 transition-transform"/></a>}
              {config?.youtube && <a href={config.youtube} target="_blank" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold-primary hover:border-gold-primary hover:text-maroon-dark transition-all group"><Youtube size={18} className="group-hover:scale-110 transition-transform"/></a>}
            </div>
          </div>

          {/* === KOLOM 2: Unit Pendidikan === */}
          {/* HAPUS: lg:pl-8 lg:border-l border-white/10 */}
          <div>
            {/* HAPUS: flex items-center gap-2 after:content... */}
            <h4 className="font-serif font-bold text-xl mb-6 text-white">
                Unit Pendidikan
            </h4>
            <ul className="space-y-4">
              {['SD Mabadi\'ul Ihsan', 'SMP Plus Cordova', 'MTs Mabadi\'ul Ihsan', 'SMA Plus Cordova', 'MA Mabadi\'ul Ihsan'].map((item, idx) => (
                  <li key={idx}>
                    <Link href="#" className="flex items-center gap-3 group hover:text-gold-primary transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-primary/50 group-hover:bg-gold-primary transition-colors"></span>
                        <span className="text-sm md:text-base">{item}</span>
                    </Link>
                  </li>
              ))}
            </ul>
          </div>

          {/* === KOLOM 3: Aplikasi Digital === */}
          {/* HAPUS: lg:pl-8 lg:border-l border-white/10 */}
          <div>
             <h4 className="font-serif font-bold text-xl mb-6 text-white">
                Aplikasi Digital
            </h4>
             <ul className="space-y-4">
                <li><Link href="#" className="flex items-center gap-3 hover:text-gold-primary transition-colors group"><div className="p-2 bg-white/10 rounded-lg group-hover:bg-gold-primary group-hover:text-maroon-dark transition-colors"><Globe size={16}/></div> E-Learning System</Link></li>
                <li><Link href="#" className="flex items-center gap-3 hover:text-gold-primary transition-colors group"><div className="p-2 bg-white/10 rounded-lg group-hover:bg-gold-primary group-hover:text-maroon-dark transition-colors"><Globe size={16}/></div> SIM Aset & Sarpras</Link></li>
                <li><Link href="#" className="flex items-center gap-3 hover:text-gold-primary transition-colors group"><div className="p-2 bg-white/10 rounded-lg group-hover:bg-gold-primary group-hover:text-maroon-dark transition-colors"><Globe size={16}/></div> Digital Library</Link></li>
             </ul>
          </div>

          {/* === KOLOM 4: Kontak === */}
          {/* HAPUS: lg:pl-8 lg:border-l border-white/10 */}
          <div>
            <h4 className="font-serif font-bold text-xl mb-6 text-white">
                Hubungi Kami
            </h4>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-4">
                <MapPin size={24} className="text-gold-primary shrink-0" />
                <span className="text-white/80 leading-relaxed">{config?.address || "Alamat belum diatur"}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={24} className="text-gold-primary shrink-0" />
                <span className="font-bold text-lg tracking-wider">{config?.phone || "-"}</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={24} className="text-gold-primary shrink-0" />
                <a href={`mailto:${config?.email}`} className="hover:text-gold-primary transition-colors">{config?.email || "-"}</a>
              </li>
            </ul>
          </div>

        </div>
      </div>
      
      {/* Copyright */}
      <div className="w-full bg-black/30 py-6">
         <div className="container-custom text-center text-sm text-white/60 flex flex-col md:flex-row justify-between items-center gap-4">
           <p>© {new Date().getFullYear()} <strong className="text-white">{config?.siteName}</strong>. All rights reserved.</p>
           <div className="flex gap-6 text-xs font-bold uppercase tracking-wider">
                <Link href="https://satrify.my.id/" className="hover:text-gold-primary">SATRIFY</Link>
                <Link href="https://itmiha.my.id/" className="hover:text-gold-primary">IT Miha</Link>
           </div>
         </div>
      </div>
    </footer>
  );
}