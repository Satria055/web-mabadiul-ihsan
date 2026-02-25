"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// Helper Upload
async function uploadFile(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `org-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-")}`;
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
export async function createMember(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const order = parseInt(formData.get("order") as string) || 0;
    
    // Handle Upload Foto
    const file = formData.get("image") as File;
    let image = null;
    if (file && file.size > 0) {
      image = await uploadFile(file);
    }

    await prisma.organizationMember.create({
      data: { name, position, order, image }
    });

    revalidatePath("/admin/struktur");
    revalidatePath("/profil/struktur"); // Update halaman publik juga
    return { success: true, message: "Pengurus berhasil ditambahkan!" };
  } catch (error) {
    return { success: false, message: "Gagal menyimpan data." };
  }
}

// 2. UPDATE
export async function updateMember(id: number, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const order = parseInt(formData.get("order") as string) || 0;
    
    const dataToUpdate: any = { name, position, order };

    // Cek ganti foto
    const file = formData.get("image") as File;
    if (file && file.size > 0) {
      const path = await uploadFile(file);
      if (path) dataToUpdate.image = path;
    }

    await prisma.organizationMember.update({
      where: { id },
      data: dataToUpdate
    });

    revalidatePath("/admin/struktur");
    revalidatePath("/profil/struktur");
    return { success: true, message: "Data pengurus diperbarui!" };
  } catch (error) {
    return { success: false, message: "Gagal update data." };
  }
}

// 3. DELETE
export async function deleteMember(id: number) {
  try {
    await prisma.organizationMember.delete({ where: { id } });
    
    revalidatePath("/admin/struktur");
    revalidatePath("/profil/struktur");
    
    return { success: true, message: "Pengurus dihapus!" };
  } catch (error) {
    return { success: false, message: "Gagal menghapus data." };
  }
}