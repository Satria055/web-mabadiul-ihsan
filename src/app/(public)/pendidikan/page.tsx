import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/layout/PageHeader";
// IMPORT DARI FOLDER HOME:
import EducationGrid from "@/components/home/EducationGrid"; 

export default async function PendidikanIndexPage() {
  const units = await prisma.educationUnit.findMany({
    orderBy: { category: "asc" },
  });

  return (
    <>
      <PageHeader 
        title="Lembaga Pendidikan"
        subtitle="Daftar lengkap seluruh unit pendidikan di bawah naungan Yayasan Mabadi'ul Ihsan."
        image="/images/header-pendidikan.jpg" 
        breadcrumb={[
          { label: "Pendidikan", href: "/pendidikan" }
        ]}
      />

      <section className="py-20 bg-gray-50 min-h-[60vh]">
         {/* Panggil komponen dari folder home tadi */}
         <EducationGrid units={units} />
      </section>
    </>
  );
}