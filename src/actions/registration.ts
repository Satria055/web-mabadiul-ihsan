"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. TAMBAH TAHAPAN
export async function createStep(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;
    const order = parseInt(formData.get("order") as string) || 0;

    await prisma.registrationStep.create({
      data: { title, description, icon, order },
    });

    revalidatePath("/admin/alur-pendaftaran");
    revalidatePath("/");
    return { success: true, message: "Tahapan berhasil ditambahkan!" };
  } catch (error) {
    return { success: false, message: "Gagal menyimpan data." };
  }
}

// 2. UPDATE TAHAPAN
export async function updateStep(id: number, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;
    const order = parseInt(formData.get("order") as string) || 0;

    await prisma.registrationStep.update({
      where: { id },
      data: { title, description, icon, order },
    });

    revalidatePath("/admin/alur-pendaftaran");
    revalidatePath("/");
    return { success: true, message: "Tahapan berhasil diperbarui!" };
  } catch (error) {
    return { success: false, message: "Gagal memperbarui data." };
  }
}

// 3. HAPUS TAHAPAN
export async function deleteStep(id: number) {
  try {
    await prisma.registrationStep.delete({ where: { id } });
    
    // HANYA Revalidate halaman depan.
    revalidatePath("/");
    
    return { success: true, message: "Tahapan berhasil dihapus!" };
  } catch (error) {
    return { success: false, message: "Gagal menghapus data." };
  }
}