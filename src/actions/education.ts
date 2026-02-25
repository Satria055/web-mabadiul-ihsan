"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// --- HELPER UPLOAD ---
async function uploadFile(file: File, prefix: string = "edu"): Promise<string | null> {
  if (!file || file.size === 0) return null;
  
  const buffer = Buffer.from(await file.arrayBuffer());
  // Sanitize filename agar aman
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");
  const filename = `${prefix}-${Date.now()}-${safeName}`;
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

// 1. CREATE UNIT
export async function createEducationUnit(formData: FormData) {
  try {
    // Ambil Data Text
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const npsn = formData.get("npsn") as string;
    const status = formData.get("status") as string;
    const accreditation = formData.get("accreditation") as string;
    const address = formData.get("address") as string;
    const village = formData.get("village") as string;
    const district = formData.get("district") as string;
    const regency = formData.get("regency") as string;
    const province = formData.get("province") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const link = formData.get("link") as string;
    const facebookUrl = formData.get("facebookUrl") as string;
    const instagramUrl = formData.get("instagramUrl") as string;
    const tiktokUrl = formData.get("tiktokUrl") as string;
    const twitterUrl = formData.get("twitterUrl") as string;

    // Upload Thumbnail Utama
    const file = formData.get("image") as File;
    let image = null;
    const uploadedPath = await uploadFile(file, "thumb");
    if (uploadedPath) image = uploadedPath;

    // Simpan ke DB
    const newUnit = await prisma.educationUnit.create({
      data: {
        name, description, category, image,
        npsn, status, accreditation,
        address, village, district, regency, province,
        email, phone, link,
        facebookUrl, instagramUrl, tiktokUrl, twitterUrl
      },
    });

    // Handle GALLERY (Multiple Upload)
    const galleryFiles = formData.getAll("galleryImages") as File[];
    
    if (galleryFiles && galleryFiles.length > 0) {
      for (const gFile of galleryFiles) {
        if (gFile.size > 0) {
          const gPath = await uploadFile(gFile, "gallery");
          if (gPath) {
            await prisma.educationGallery.create({
              data: { image: gPath, unitId: newUnit.id }
            });
          }
        }
      }
    }

    revalidatePath("/admin/pendidikan");
    revalidatePath("/");
    return { success: true, message: "Unit Pendidikan berhasil dibuat!" };

  } catch (error) {
    console.error("Create Error:", error);
    return { success: false, message: "Gagal menyimpan data." };
  }
}

// 2. UPDATE UNIT
export async function updateEducationUnit(id: number, formData: FormData) {
  try {
    // Ambil Data Text (Sama seperti create)
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const npsn = formData.get("npsn") as string;
    const status = formData.get("status") as string;
    const accreditation = formData.get("accreditation") as string;
    const address = formData.get("address") as string;
    const village = formData.get("village") as string;
    const district = formData.get("district") as string;
    const regency = formData.get("regency") as string;
    const province = formData.get("province") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const link = formData.get("link") as string;
    const facebookUrl = formData.get("facebookUrl") as string;
    const instagramUrl = formData.get("instagramUrl") as string;
    const tiktokUrl = formData.get("tiktokUrl") as string;
    const twitterUrl = formData.get("twitterUrl") as string;

    const dataToUpdate: any = {
        name, description, category,
        npsn, status, accreditation,
        address, village, district, regency, province,
        email, phone, link,
        facebookUrl, instagramUrl, tiktokUrl, twitterUrl
    };

    // Update Thumbnail Logic
    const file = formData.get("image") as File;
    const isImageRemoved = formData.get("removeImage") === "true";
    
    if (file && file.size > 0) {
      const uploadedPath = await uploadFile(file, "thumb");
      if (uploadedPath) dataToUpdate.image = uploadedPath;
    } else if (isImageRemoved) {
      dataToUpdate.image = null;
    }

    await prisma.educationUnit.update({
      where: { id },
      data: dataToUpdate,
    });

    // Handle GALLERY ADDITION
    const galleryFiles = formData.getAll("galleryImages") as File[];
    
    if (galleryFiles && galleryFiles.length > 0) {
      for (const gFile of galleryFiles) {
        if (gFile.size > 0) {
          const gPath = await uploadFile(gFile, "gallery");
          if (gPath) {
            await prisma.educationGallery.create({
              data: { image: gPath, unitId: id }
            });
          }
        }
      }
    }

    revalidatePath("/admin/pendidikan");
    revalidatePath("/");
    
    return { success: true, message: "Unit Pendidikan berhasil diperbarui!" };
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false, message: "Gagal memperbarui data." };
  }
}

// 3. DELETE UNIT
export async function deleteEducationUnit(id: number) {
  try {
    await prisma.educationUnit.delete({ where: { id } });
    revalidatePath("/");
    return { success: true, message: "Unit Pendidikan berhasil dihapus!" };
  } catch (error) {
    return { success: false, message: "Gagal menghapus unit." };
  }
}

// 4. DELETE GALLERY ITEM
export async function deleteGalleryItem(galleryId: number) {
  try {
    await prisma.educationGallery.delete({ where: { id: galleryId } });
    revalidatePath("/admin/pendidikan");
    return { success: true, message: "Foto galeri dihapus!" };
  } catch (error) {
    return { success: false, message: "Gagal menghapus foto." };
  }
}