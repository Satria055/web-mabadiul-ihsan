// file: src/actions/uploads.ts
"use server";

import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File;
  
  if (!file || file.size === 0) {
    console.error("No file found in upload request");
    return { url: null };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  // Nama file unik: editor-timestamp-namafile
  const filename = `editor-${Date.now()}-${file.name.replace(/\s/g, "-")}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "content");

  try {
    // Pastikan folder ada
    await mkdir(uploadDir, { recursive: true });
    // Tulis file
    await writeFile(path.join(uploadDir, filename), buffer);
    
    // Return URL public
    return { url: `/uploads/content/${filename}` };
  } catch (error) {
    console.error("Upload error:", error);
    return { url: null };
  }
}