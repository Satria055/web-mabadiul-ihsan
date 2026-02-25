"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
// JANGAN import redirect

async function uploadFile(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `achievement-${Date.now()}-${file.name.replace(/\s/g, "-")}`;
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
export async function createAchievement(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const level = formData.get("level") as string;
    const student = formData.get("student") as string;
    const date = formData.get("date") as string;
    const rank = parseInt(formData.get("rank") as string) || 1;
    const description = formData.get("description") as string;

    const file = formData.get("image") as File;
    let image = null;
    const uploadedPath = await uploadFile(file);
    if (uploadedPath) image = uploadedPath;

    await prisma.achievement.create({
      data: { title, category, level, student, date, rank, description, image },
    });

    revalidatePath("/admin/prestasi");
    revalidatePath("/");
    
    return { success: true, message: "Prestasi berhasil ditambahkan!" };
  } catch (error) {
    return { success: false, message: "Gagal menyimpan data." };
  }
}

// 2. UPDATE
export async function updateAchievement(id: number, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const level = formData.get("level") as string;
    const student = formData.get("student") as string;
    const date = formData.get("date") as string;
    const rank = parseInt(formData.get("rank") as string) || 1;
    const description = formData.get("description") as string;

    const isImageRemoved = formData.get("removeImage") === "true";
    const file = formData.get("image") as File;

    const dataToUpdate: any = { 
      title, category, level, student, date, rank, description 
    };

    if (file && file.size > 0) {
      const uploadedPath = await uploadFile(file);
      if (uploadedPath) dataToUpdate.image = uploadedPath;
    } else if (isImageRemoved) {
      dataToUpdate.image = null;
    }

    await prisma.achievement.update({
      where: { id },
      data: dataToUpdate,
    });

    revalidatePath("/admin/prestasi");
    revalidatePath("/");
    
    return { success: true, message: "Prestasi berhasil diperbarui!" };
  } catch (error) {
    return { success: false, message: "Gagal memperbarui data." };
  }
}

// 3. DELETE
export async function deleteAchievement(id: number) {
  try {
    await prisma.achievement.delete({ where: { id } });
    
    // HANYA Revalidate halaman depan. 
    // JANGAN revalidate "/admin/prestasi" agar alert sempat muncul sebelum baris hilang.
    revalidatePath("/");
    
    return { success: true, message: "Prestasi berhasil dihapus!" };
  } catch (error) {
    return { success: false, message: "Gagal menghapus data." };
  }
}