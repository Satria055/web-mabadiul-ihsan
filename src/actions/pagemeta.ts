"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
// Hapus import redirect

// Helper Upload Gambar
async function uploadFile(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;
  
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `banner-${Date.now()}-${file.name.replace(/\s/g, "-")}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "banners");

  try {
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);
    return `/uploads/banners/${filename}`;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
}

// 1. CREATE
export async function createPageMeta(formData: FormData) {
  try {
    const slug = formData.get("slug") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    
    // Validasi sederhana
    if (!slug || !title) {
        return { success: false, message: "Slug dan Judul wajib diisi." };
    }

    // Cek duplikasi slug
    const existing = await prisma.pageMeta.findUnique({ where: { slug } });
    if (existing) {
        return { success: false, message: "Slug sudah digunakan. Ganti yang lain." };
    }

    const file = formData.get("image") as File;
    let imagePath = "";
    
    const uploaded = await uploadFile(file);
    if (uploaded) imagePath = uploaded;

    await prisma.pageMeta.create({
      data: { slug, title, description, image: imagePath }
    });

    revalidatePath("/admin/halaman");
    return { success: true, message: "Halaman berhasil dibuat!" }; 

  } catch (error) {
    console.error("Create Page Error:", error);
    return { success: false, message: "Gagal membuat halaman (Server Error)." };
  }
}

// 2. UPDATE
export async function updatePageMeta(id: number, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const file = formData.get("image") as File;

    const oldData = await prisma.pageMeta.findUnique({ where: { id } });
    if (!oldData) return { success: false, message: "Data tidak ditemukan" };

    let imagePath = oldData.image; 

    const uploaded = await uploadFile(file);
    if (uploaded) imagePath = uploaded;

    await prisma.pageMeta.update({
      where: { id },
      data: { title, description, image: imagePath }
    });

    // Revalidate semua path terkait
    revalidatePath("/admin/halaman");
    revalidatePath(`/${oldData.slug}`);
    revalidatePath("/(public)", "layout"); 
    
    return { success: true, message: "Perubahan berhasil disimpan!" };

  } catch (error) {
    console.error("Update Page Error:", error);
    return { success: false, message: "Gagal mengupdate data." };
  }
}

// 3. DELETE
export async function deletePageMeta(id: number) {
  try {
    const page = await prisma.pageMeta.findUnique({ where: { id } });
    if (!page) return { success: false, message: "Data tidak ditemukan" };

    await prisma.pageMeta.delete({ where: { id } });

    revalidatePath("/admin/halaman");
    revalidatePath(`/${page.slug}`);

    return { success: true, message: "Halaman berhasil dihapus!" };
  } catch (error) {
    console.error("Delete Page Error:", error);
    return { success: false, message: "Gagal menghapus data." };
  }
}