import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditMemberForm from "./EditMemberForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMemberPage(props: PageProps) {
  const params = await props.params;
  const id = Number(params.id);

  const member = await prisma.organizationMember.findUnique({
    where: { id },
  });

  if (!member) {
    notFound();
  }

  return <EditMemberForm member={member} />;
}