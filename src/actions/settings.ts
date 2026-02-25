"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// Helper Upload File
async function uploadFile(file: File, prefix: string = "file"): Promise<string | null> {
  if (!file || file.size === 0) return null;
  
  // Sanitize nama file
  const buffer = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");
  const filename = `${prefix}-${Date.now()}-${safeName}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  try {
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);
    return `/uploads/${filename}`;
  } catch (error) {
    console.error("Gagal upload file:", error);
    return null;
  }
}

export async function updateSiteConfig(formData: FormData) {
  try {
    // 1. Ambil Data Text
    const siteName = formData.get("siteName") as string;
    const heroTitle = formData.get("heroTitle") as string;
    const heroSubtitle = formData.get("heroSubtitle") as string;
    const videoUrl = formData.get("videoUrl") as string;
    const brosurUrl = formData.get("brosurUrl") as string;
    const registrationUrl = formData.get("registrationUrl") as string;
    const address = formData.get("address") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const facebook = formData.get("facebook") as string;
    const instagram = formData.get("instagram") as string;
    const youtube = formData.get("youtube") as string;
    const history = formData.get("history") as string;
    const vision = formData.get("vision") as string;
    const mission = formData.get("mission") as string;
    const greeting = formData.get("greeting") as string;

    // 2. Siapkan Object Update
    const dataToUpdate: any = {
      siteName, heroTitle, heroSubtitle,
      videoUrl, brosurUrl, registrationUrl,
      address, phone, email,
      facebook, instagram, youtube,
      history, vision, mission, greeting
    };

    // 3. Handle Uploads
    
    // A. Logo
    const logoFile = formData.get("logoUrl") as File;
    if (logoFile && logoFile.size > 0) {
      const path = await uploadFile(logoFile, "logo");
      if (path) dataToUpdate.logoUrl = path;
    }

    // B. Foto Profil Lembaga (Gedung/Sejarah)
    const profileFile = formData.get("profileImage") as File;
    if (profileFile && profileFile.size > 0) {
      const path = await uploadFile(profileFile, "profile");
      if (path) dataToUpdate.profileImage = path;
    }

    // C. Foto Ketua Yayasan (BARU)
    const chairmanFile = formData.get("chairmanImage") as File;
    if (chairmanFile && chairmanFile.size > 0) {
      const path = await uploadFile(chairmanFile, "chairman");
      if (path) dataToUpdate.chairmanImage = path;
    }

    // 4. Eksekusi ke Database
    await prisma.siteConfig.upsert({
      where: { id: 1 },
      update: dataToUpdate,
      create: {
        ...dataToUpdate,
        logoUrl: dataToUpdate.logoUrl || "/logo-placeholder.png", 
      },
    });

    // 5. Revalidate
    revalidatePath("/"); 
    revalidatePath("/profil/yayasan"); 
    revalidatePath("/admin/pengaturan"); 
    
    return { success: true, message: "Konfigurasi & Profil berhasil disimpan!" };
  } catch (error) {
    console.error("Update Config Error:", error);
    return { success: false, message: "Gagal menyimpan konfigurasi." };
  }
}