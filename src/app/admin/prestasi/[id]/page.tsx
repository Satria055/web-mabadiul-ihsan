import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditAchievementForm from "./EditAchievementForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPrestasiPage(props: PageProps) {
  const params = await props.params;
  const id = Number(params.id);

  const achievement = await prisma.achievement.findUnique({
    where: { id },
  });

  if (!achievement) {
    notFound();
  }

  return <EditAchievementForm achievement={achievement} />;
}