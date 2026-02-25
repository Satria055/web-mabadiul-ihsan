import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-24 bg-maroon-primary relative overflow-hidden">
      {/* Ornamen Background (Lingkaran Halus) */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-primary opacity-10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="container-custom relative z-10 text-center">
        
        <h2 className="font-serif font-bold text-4xl md:text-5xl text-white mb-6 leading-tight">
          Mari Bergabung Menjadi Bagian <br /> 
          <span className="text-gold-primary">Keluarga Besar Mabadi'ul Ihsan</span>
        </h2>
        
        <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10 font-light">
          Siapkan masa depan gemilang dengan pendidikan yang menyeimbangkan kecerdasan intelektual, spiritual, dan emosional.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link 
            href="https://ppdb.ponpesmiha.online/" target="_blank"
            className="w-full sm:w-auto bg-gold-primary text-maroon-dark px-8 py-4 rounded-full font-bold shadow-lg hover:bg-white hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Daftar Sekarang <ArrowRight size={20} />
          </Link>
          
          <Link 
            href="https://panitia.ponpesmiha.online/upload_junk/967afa0031831e3afd7edcbe55bd17da.jpg" target="_blank"
            className="w-full sm:w-auto bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-maroon-primary transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FileText size={20} /> Lihat Brosur
          </Link>
        </div>

      </div>
    </section>
  );
}