import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditPartnerForm from "./EditPartnerForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMitraPage(props: PageProps) {
  const params = await props.params;
  const id = Number(params.id);

  const partner = await prisma.partner.findUnique({
    where: { id },
  });

  if (!partner) {
    notFound();
  }

  return <EditPartnerForm partner={partner} />;
}