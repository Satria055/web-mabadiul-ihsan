import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/layout/PageHeader";
import { getPageMeta } from "@/lib/page-meta";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Clock } from "lucide-react";
import ContactForm from "@/components/public/ContactForm"; // Import Client Component Form

export default async function KontakPage() {
  // 1. Ambil Data Banner (Slug: 'kontak')
  const meta = await getPageMeta("kontak", "Hubungi Kami");

  // 2. Ambil Info Kontak dari SiteConfig (agar sinkron dengan Footer/Database)
  const config = await prisma.siteConfig.findFirst();

  return (
    <>
      {/* 1. Header Banner Dinamis */}
      <PageHeader
        title={meta.title}
        subtitle={meta.description}
        image={meta.image} 
        breadcrumb={[
          { label: "Kontak", href: "/kontak" },
        ]}
      />

      {/* 2. Content Section */}
      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="container-custom">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            
            {/* === KOLOM KIRI: INFO KONTAK & SOSMED === */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Card Info Utama */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-serif font-bold text-2xl text-maroon-primary mb-6">
                  Informasi Kontak
                </h3>
                
                <ul className="space-y-6">
                  {/* Alamat */}
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gold-primary/10 rounded-full flex items-center justify-center text-maroon-primary shrink-0 transition-transform hover:scale-110">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Alamat</span>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {config?.address || "Alamat belum diatur di database."}
                      </p>
                    </div>
                  </li>

                  {/* Telepon */}
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gold-primary/10 rounded-full flex items-center justify-center text-maroon-primary shrink-0 transition-transform hover:scale-110">
                      <Phone size={20} />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Telepon / WA</span>
                      <p className="text-gray-700 text-sm font-bold">
                        {config?.phone || "-"}
                      </p>
                    </div>
                  </li>

                  {/* Email */}
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gold-primary/10 rounded-full flex items-center justify-center text-maroon-primary shrink-0 transition-transform hover:scale-110">
                      <Mail size={20} />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email</span>
                      <p className="text-gray-700 text-sm">
                        {config?.email || "-"}
                      </p>
                    </div>
                  </li>
                  
                  {/* Jam Operasional (Statis) */}
                  <li className="flex items-start gap-4 pt-6 border-t border-gray-100">
                    <div className="w-10 h-10 bg-gold-primary/10 rounded-full flex items-center justify-center text-maroon-primary shrink-0 transition-transform hover:scale-110">
                      <Clock size={20} />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Jam Operasional</span>
                      <p className="text-gray-700 text-sm">
                        Senin - Sabtu: 07.00 - 16.00 WIB
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Card Social Media */}
              <div className="bg-maroon-primary p-8 rounded-2xl shadow-lg text-white relative overflow-hidden group">
                 {/* Dekorasi Background */}
                 <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-700"></div>
                 
                 <h4 className="font-bold text-lg mb-4 relative z-10">Ikuti Kami</h4>
                 <div className="flex gap-4 relative z-10">
                    {config?.facebook && (
                      <a href={config.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-primary hover:text-maroon-dark transition-all transform hover:-translate-y-1">
                        <Facebook size={18}/>
                      </a>
                    )}
                    {config?.instagram && (
                      <a href={config.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-primary hover:text-maroon-dark transition-all transform hover:-translate-y-1">
                        <Instagram size={18}/>
                      </a>
                    )}
                    {config?.youtube && (
                      <a href={config.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-primary hover:text-maroon-dark transition-all transform hover:-translate-y-1">
                        <Youtube size={18}/>
                      </a>
                    )}
                 </div>
              </div>
            </div>

            {/* === KOLOM KANAN: FORMULIR & MAPS === */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Form Kirim Pesan */}
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-serif font-bold text-2xl text-gray-800 mb-2">
                  Kirim Pesan
                </h3>
                <p className="text-gray-500 text-sm mb-8">
                  Ada pertanyaan? Silakan isi formulir di bawah ini. Tim kami akan segera merespons pesan Anda.
                </p>

                {/* Client Component Form */}
                <ContactForm />
                
              </div>

              {/* Maps Embed */}
              <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 h-[400px] overflow-hidden relative group">
                 <div className="w-full h-full rounded-xl overflow-hidden bg-gray-100 relative">
                    {/* Ganti src iframe di bawah dengan URL Embed Map sekolah Anda dari Google Maps */}
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.883394863336!2d114.3546733745671!3d-8.214488991817816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd151a6c4296623%3A0x6b80327771765c79!2sPondok%20Pesantren%20Mabadi&#39;ul%20Ihsan!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="grayscale group-hover:grayscale-0 transition-all duration-700"
                    ></iframe>
                    
                    {/* Overlay Text jika Maps gagal load */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[-1]">
                       <span className="text-gray-400 text-sm">Memuat Peta...</span>
                    </div>
                 </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}