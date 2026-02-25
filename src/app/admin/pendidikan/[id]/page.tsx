import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditUnitForm from "./EditUnitForm";

// Definisi Props untuk Next.js 15 (params adalah Promise)
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPendidikanPage(props: PageProps) {
  // 1. Await params terlebih dahulu (Aturan Next.js 15)
  const params = await props.params;
  const id = Number(params.id);

  // 2. Fetch Data Unit + Include Gallery
  const unit = await prisma.educationUnit.findUnique({
    where: { id },
    include: {
      gallery: true, // 'length of undefined'
    },
  });

  // 3. Handle 404
  if (!unit) {
    notFound();
  }

  // 4. Render Client Component
  return <EditUnitForm unit={unit} />;
}