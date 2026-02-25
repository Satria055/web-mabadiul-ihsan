"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
// HAPUS IMPORT redirect

// HELPER UPLOAD
async function uploadFile(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `testi-${Date.now()}-${file.name.replace(/\s/g, "-")}`;
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
export async function createTestimonial(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const content = formData.get("content") as string;
    const rating = parseInt(formData.get("rating") as string) || 5;

    const file = formData.get("image") as File;
    let image = null;
    const uploadedPath = await uploadFile(file);
    if (uploadedPath) image = uploadedPath;

    await prisma.testimonial.create({
      data: { name, role, content, rating, image, isShow: true },
    });

    revalidatePath("/admin/testimoni");
    revalidatePath("/");
    
    return { success: true, message: "Testimoni berhasil ditambahkan!" };
  } catch (error) {
    return { success: false, message: "Gagal menyimpan data." };
  }
}

// 2. UPDATE
export async function updateTestimonial(id: number, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const content = formData.get("content") as string;
    const rating = parseInt(formData.get("rating") as string) || 5;

    const isImageRemoved = formData.get("removeImage") === "true";
    const file = formData.get("image") as File;

    const dataToUpdate: any = { name, role, content, rating };

    if (file && file.size > 0) {
      const uploadedPath = await uploadFile(file);
      if (uploadedPath) dataToUpdate.image = uploadedPath;
    } else if (isImageRemoved) {
      dataToUpdate.image = null;
    }

    await prisma.testimonial.update({
      where: { id },
      data: dataToUpdate,
    });

    revalidatePath("/admin/testimoni");
    revalidatePath("/");
    
    return { success: true, message: "Testimoni berhasil diperbarui!" };
  } catch (error) {
    return { success: false, message: "Gagal memperbarui data." };
  }
}

// 3. DELETE
export async function deleteTestimonial(id: number) {
  try {
    await prisma.testimonial.delete({ where: { id } });
    
    // HANYA Revalidate halaman depan.
    // JANGAN revalidate "/admin/testimoni" agar alert sempat muncul sebelum baris hilang.
    revalidatePath("/");
    
    return { success: true, message: "Testimoni berhasil dihapus!" };
  } catch (error) {
    return { success: false, message: "Gagal menghapus data." };
  }
}