import { prisma } from "@/lib/prisma";
import { Users, School, Trophy, UserCheck } from "lucide-react";
import StatCounter from "./StatCounter"; 

// Helper Mapping Icon
const iconMap: Record<string, any> = {
  "Users": Users,
  "School": School,
  "Trophy": Trophy,
  "UserCheck": UserCheck
};

export default async function Stats() {
  const stats = await prisma.stat.findMany({
    orderBy: { id: 'asc' }
  });

  return (
    <section className="py-20 bg-maroon-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-gold-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        
        {/*
            Menggunakan 'flex' + 'justify-center' agar item berjejer rapi di tengah.
            Jika ada 4 item, mereka akan berbagi ruang secara merata.
        */}
        <div className="flex flex-wrap justify-center items-start gap-8 md:gap-12 lg:gap-16 text-center">
          
          {stats.map((stat) => {
            const IconComponent = iconMap[stat.icon] || Users;

            return (
              <div 
                key={stat.id} 
                className="p-4 group hover:-translate-y-2 transition-transform duration-300 w-full sm:w-auto min-w-[180px]"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-white/10 rounded-2xl text-gold-primary backdrop-blur-sm shadow-inner border border-white/20 group-hover:bg-white/20 transition-colors">
                  <IconComponent size={32} />
                </div>
                
                {/* Panggil Counter dengan Animasi */}
                <StatCounter value={stat.value} suffix={stat.suffix || ""} />

                <p className="text-white/80 font-medium tracking-wide uppercase text-sm group-hover:text-white transition-colors">
                  {stat.label}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}