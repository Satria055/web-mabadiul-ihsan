import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditBeritaForm from "./EditBeritaForm"; 

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditBeritaPage(props: Props) {
  const params = await props.params;
  const id = parseInt(params.id);

  if (isNaN(id)) return notFound(); // Validasi tambahan jika ID bukan angka

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) return notFound();

  // Serialisasi date object ke string agar aman dikirim ke Client Component
  // (Opsional tapi disarankan untuk mencegah warning)
  const serializedPost = {
    ...post,
    // eventDate perlu dihandle di client sebagai Date object nanti
  };

  return <EditBeritaForm post={serializedPost} />;
}