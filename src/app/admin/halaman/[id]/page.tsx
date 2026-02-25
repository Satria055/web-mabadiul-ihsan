import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PageMetaForm from "@/components/admin/PageMetaForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditHalamanPage(props: PageProps) {
  const params = await props.params;
  const id = Number(params.id);
  
  const pageMeta = await prisma.pageMeta.findUnique({ where: { id } });
  
  if (!pageMeta) return notFound();

  return (
    <div className="max-w-6xl mx-auto">
       <PageMetaForm data={pageMeta} /> {/* Dengan data = Mode Edit */}
    </div>
  );
}