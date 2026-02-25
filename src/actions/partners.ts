"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
// HAPUS IMPORT redirect

// Helper Upload
async function uploadFile(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `partner-${Date.now()}-${file.name.replace(/\s/g, "-")}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  try {
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);
    return `/uploads/${filename}`;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
}

// 1. TAMBAH MITRA
export async function createPartner(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const website = formData.get("website") as string;
    const order = parseInt(formData.get("order") as string) || 0;

    const file = formData.get("logo") as File;
    let logo = ""; 
    const uploadedPath = await uploadFile(file);
    if (uploadedPath) logo = uploadedPath;

    await prisma.partner.create({
      data: { name, website, logo, order },
    });

    revalidatePath("/admin/mitra");
    revalidatePath("/");
    
    return { success: true, message: "Mitra berhasil ditambahkan!" };
  } catch (error) {
    return { success: false, message: "Gagal menyimpan data." };
  }
}

// 2. UPDATE MITRA
export async function updatePartner(id: number, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const website = formData.get("website") as string;
    const order = parseInt(formData.get("order") as string) || 0;
    
    const isImageRemoved = formData.get("removeImage") === "true";
    const file = formData.get("logo") as File;

    const dataToUpdate: any = { name, website, order };

    if (file && file.size > 0) {
      const uploadedPath = await uploadFile(file);
      if (uploadedPath) dataToUpdate.logo = uploadedPath;
    } else if (isImageRemoved) {
      dataToUpdate.logo = null; // Menghapus logo jika diminta
    }

    await prisma.partner.update({
      where: { id },
      data: dataToUpdate,
    });

    revalidatePath("/admin/mitra");
    revalidatePath("/");
    
    return { success: true, message: "Data mitra diperbarui!" };
  } catch (error) {
    return { success: false, message: "Gagal memperbarui data." };
  }
}

// 3. HAPUS MITRA
export async function deletePartner(id: number) {
  try {
    await prisma.partner.delete({ where: { id } });
    
    // HANYA Revalidate halaman depan.
    // JANGAN revalidate "/admin/mitra" agar alert sempat muncul sebelum baris hilang.
    revalidatePath("/");
    
    return { success: true, message: "Mitra berhasil dihapus!" };
  } catch (error) {
    return { success: false, message: "Gagal menghapus data." };
  }
}