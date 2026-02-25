import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditStepForm from "./EditStepForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAlurPage(props: PageProps) {
  const params = await props.params;
  const id = Number(params.id);

  const step = await prisma.registrationStep.findUnique({
    where: { id },
  });

  if (!step) {
    notFound();
  }

  return <EditStepForm step={step} />;
}