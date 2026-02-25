import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { 
  ClipboardList, UserCheck, Megaphone, CheckCircle2, ArrowRight, 
  FileText, Banknote, Shirt, CalendarCheck 
} from "lucide-react";

// Mapping Icon String -> Component
const iconMap: Record<string, any> = {
  "ClipboardList": ClipboardList,
  "UserCheck": UserCheck,
  "Megaphone": Megaphone,
  "CheckCircle2": CheckCircle2,
  "FileText": FileText,
  "Banknote": Banknote,
  "Shirt": Shirt,
  "CalendarCheck": CalendarCheck
};

export default async function RegistrationFlow() {
  // Ambil data urut berdasarkan 'order'
  const steps = await prisma.registrationStep.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-primary font-bold tracking-widest uppercase text-sm mb-2 block">
            Alur Pendaftaran
          </span>
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-maroon-primary mb-4">
            Tahapan Penerimaan Santri Baru
          </h2>
          <p className="text-gray-600">
            Ikuti langkah-langkah mudah berikut untuk bergabung dengan keluarga besar kami.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          
          {/* Garis Penghubung (Desktop Only) */}
          <div className="hidden md:block absolute top-10 left-0 w-full h-1 bg-gray-200 -z-0"></div>

          {/* Grid Dinamis */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step) => {
              const IconComponent = iconMap[step.icon] || ClipboardList;

              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center text-center group">
                  
                  {/* Step Circle */}
                  <div className="w-20 h-20 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:bg-maroon-primary group-hover:border-gold-primary transition-all duration-500 group-hover:scale-110">
                    <div className="text-gray-400 group-hover:text-white transition-colors duration-500">
                      <IconComponent size={28} />
                    </div>
                    
                    {/* Badge Nomor Urut */}
                    <div className="absolute top-0 right-0 md:right-10 bg-gold-primary text-maroon-dark w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm border-2 border-white shadow-md">
                      {step.order}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-serif font-bold text-xl text-gray-800 mb-3 group-hover:text-maroon-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed px-2">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Call To Action */}
        <div className="mt-16 text-center">
          <Link 
            href="https://ppdb.ponpesmiha.online" target="_blank"
            className="inline-flex items-center gap-2 bg-maroon-primary text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-maroon-dark hover:shadow-maroon-primary/40 hover:-translate-y-1 transition-all duration-300"
          >
            Daftar Sekarang <ArrowRight size={18} />
          </Link>
          <p className="mt-4 text-sm text-gray-400">
            Butuh bantuan? <Link href="https://wa.me/6282131703331" target="_blank" className="text-maroon-primary hover:underline">Hubungi Panitia PPDB</Link>
          </p>
        </div>

      </div>
    </section>
  );
}