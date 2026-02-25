import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditStatForm from "./EditStatForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditStatistikPage(props: PageProps) {
  const params = await props.params;
  const id = Number(params.id);

  const stat = await prisma.stat.findUnique({
    where: { id },
  });

  if (!stat) {
    notFound();
  }

  return <EditStatForm stat={stat} />;
}