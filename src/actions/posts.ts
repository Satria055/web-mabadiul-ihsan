"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// --- HELPER: Upload File ---
async function uploadFile(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;
  
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `news-${Date.now()}-${file.name.replace(/\s/g, "-")}`;
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

// --- 1. CREATE POST ---
export async function createPost(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    
    // Generate Excerpt
    const excerptInput = formData.get("excerpt") as string;
    const excerpt = excerptInput.trim() !== "" ? excerptInput : content.replace(/<[^>]+>/g, '').substring(0, 150) + "..."; 
    
    const eventDateString = formData.get("eventDate") as string;
    const eventDate = eventDateString ? new Date(eventDateString) : null;
    
    const file = formData.get("image") as File;
    let image = null;
    
    const uploadedPath = await uploadFile(file);
    if (uploadedPath) image = uploadedPath;

    // Generate Slug Unik
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") + "-" + Date.now();

    await prisma.post.create({
      data: {
        title, slug, content, excerpt, category, image, eventDate,
        author: "Admin", published: true
      },
    });

    revalidatePath("/admin/berita");
    revalidatePath("/");
    
    return { success: true, message: "Berita berhasil diterbitkan!" };

  } catch (error) {
    console.error("Create Post Error:", error);
    return { success: false, message: "Gagal, terjadi kesalahan server." };
  }
}

// --- 2. UPDATE POST ---
export async function updatePost(id: number, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    
    const excerptInput = formData.get("excerpt") as string;
    const excerpt = excerptInput.trim() !== "" ? excerptInput : content.replace(/<[^>]+>/g, '').substring(0, 150) + "...";

    const eventDateString = formData.get("eventDate") as string;
    const eventDate = eventDateString ? new Date(eventDateString) : null;

    const isImageRemoved = formData.get("removeImage") === "true";
    const file = formData.get("image") as File;

    const dataToUpdate: any = {
      title, content, excerpt, category, eventDate,
    };

    if (file && file.size > 0) {
      const uploadedPath = await uploadFile(file);
      if (uploadedPath) dataToUpdate.image = uploadedPath;
    } else if (isImageRemoved) {
      dataToUpdate.image = null;
    }

    await prisma.post.update({
      where: { id },
      data: dataToUpdate,
    });

    revalidatePath("/admin/berita");
    revalidatePath("/");
    
    return { success: true, message: "Berita berhasil diperbarui!" };

  } catch (error) {
    console.error("Update Post Error:", error);
    return { success: false, message: "Gagal memperbarui berita." };
  }
}

// --- 3. DELETE POST ---
export async function deletePost(id: number) {
  try {
    await prisma.post.delete({ where: { id } });
    revalidatePath("/");
    return { success: true, message: "Berita berhasil dihapus!" };
  } catch (error) {
    return { success: false, message: "Gagal menghapus berita." };
  }
}