import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditUserForm from "./EditUserForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditUserPage(props: PageProps) {
  const params = await props.params;
  const id = Number(params.id);

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) notFound();

  return <EditUserForm user={user} />;
}