import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function Partners() {
  const partners = await prisma.partner.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="container-custom text-center">
        
        {/* Header Kecil */}
        <p className="text-gray-400 font-bold tracking-widest uppercase text-xs mb-10">
          Dipercaya & Bekerjasama Dengan
        </p>

        {/* Grid Logo */}
        {partners.length === 0 ? (
           <div className="text-gray-300 italic">Belum ada data mitra kerjasama.</div>
        ) : (
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map((partner) => (
              <a 
                key={partner.id}
                href={partner.website || "#"}
                target={partner.website ? "_blank" : "_self"}
                rel="noreferrer"
                className="group relative w-32 h-16 md:w-40 md:h-20 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-110"
                title={partner.name}
              >
                {/* Image Fill Object Contain agar logo tidak gepeng */}
                <Image 
                  src={partner.logo} 
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100px, 160px"
                />
              </a>
            ))}
          </div>
        )}
        
        {/* Call to Action Kecil */}
        <div className="mt-16 pt-8 border-t border-gray-50">
           <p className="mt-4 text-sm text-gray-400">
            Ingin menjadi partner kami? <Link href="https://wa.me/628973266517" target="_blank" className="text-maroon-primary hover:underline">Hubungi Humas</Link>
          </p>
        </div>

      </div>
    </section>
  );
}