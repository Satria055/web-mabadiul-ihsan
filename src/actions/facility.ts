"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// Helper Upload
async function uploadFile(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `facility-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-")}`;
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

// 1. CREATE
export async function createFacility(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const file = formData.get("image") as File;

    if (!file || file.size === 0) {
      return { success: false, message: "Wajib upload foto fasilitas." };
    }

    const imagePath = await uploadFile(file);
    if (!imagePath) return { success: false, message: "Gagal upload gambar." };

    await prisma.facility.create({
      data: { name, description, image: imagePath }
    });

    revalidatePath("/admin/fasilitas");
    revalidatePath("/profil/fasilitas");
    return { success: true, message: "Fasilitas berhasil ditambahkan!" };
  } catch (error) {
    return { success: false, message: "Gagal menyimpan data." };
  }
}

// 2. UPDATE
export async function updateFacility(id: number, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const file = formData.get("image") as File;

    const dataToUpdate: any = { name, description };

    // Cek jika ada ganti foto
    if (file && file.size > 0) {
      const path = await uploadFile(file);
      if (path) dataToUpdate.image = path;
    }

    await prisma.facility.update({
      where: { id },
      data: dataToUpdate
    });

    revalidatePath("/admin/fasilitas");
    revalidatePath("/profil/fasilitas");
    return { success: true, message: "Fasilitas diperbarui!" };
  } catch (error) {
    return { success: false, message: "Gagal update data." };
  }
}

// 3. DELETE
export async function deleteFacility(id: number) {
  try {
    await prisma.facility.delete({ where: { id } });
    revalidatePath("/admin/fasilitas");
    revalidatePath("/profil/fasilitas");
    return { success: true, message: "Fasilitas dihapus!" };
  } catch (error) {
    return { success: false, message: "Gagal menghapus data." };
  }
}