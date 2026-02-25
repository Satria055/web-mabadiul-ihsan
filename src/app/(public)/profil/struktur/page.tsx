import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/layout/PageHeader";
import { getPageMeta } from "@/lib/page-meta";
import { User } from "lucide-react";

export default async function StrukturOrganisasiPage() {
  // 1. Ambil Banner Header
  const meta = await getPageMeta("profil-struktur", "Struktur Organisasi");

  // 2. Ambil Data Pengurus (Urutkan berdasarkan 'order' ASC)
  const members = await prisma.organizationMember.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <>
      <PageHeader
        title={meta.title}
        subtitle={meta.description}
        image={meta.image}
        breadcrumb={[
          { label: "Profil", href: "#" },
          { label: "Struktur Organisasi", href: "/profil/struktur" },
        ]}
      />

      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          
          {members.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
               <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
               <h3 className="text-lg font-bold text-gray-500">Belum ada data struktur organisasi.</h3>
               <p className="text-sm text-gray-400">Admin dapat menambahkan data melalui panel admin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {members.map((member) => (
                <div key={member.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center">
                   
                   {/* Foto Frame */}
                   <div className="w-full aspect-[4/5] overflow-hidden bg-gray-100 relative">
                      {member.image ? (
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                           <User size={64} />
                        </div>
                      )}
                      
                      {/* Overlay Gradient (Optional aesthetic) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                   </div>

                   {/* Info */}
                   <div className="p-6 w-full relative">
                      {/* Garis Aksen */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-maroon-primary rounded-full"></div>
                      
                      <h3 className="text-lg font-bold text-gray-800 line-clamp-1" title={member.name}>
                        {member.name}
                      </h3>
                      <p className="text-sm text-maroon-primary font-medium mt-1 uppercase tracking-wide text-[10px]">
                        {member.position}
                      </p>
                   </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}