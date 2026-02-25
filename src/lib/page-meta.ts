import { prisma } from "@/lib/prisma";

export const getPageMeta = async (slug: string, defaultTitle: string) => {
  // 1. Cari data halaman di DB berdasarkan slug
  const meta = await prisma.pageMeta.findUnique({
    where: { slug },
  });

  // 2. Return data meta (atau default jika belum disetting admin)
  return {
    title: meta?.title || defaultTitle,
    description: meta?.description || "Yayasan Pondok Pesantren Mabadi'ul Ihsan",
    // Gambar banner default jika admin belum upload
    image: meta?.image || "/images/header-default.jpg", 
  };
};