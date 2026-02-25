"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"; // HAPUS INI NANTI (Tidak dipakai)

// 1. TAMBAH STATISTIK
export async function createStat(formData: FormData) {
  try {
    const label = formData.get("label") as string;
    const value = parseInt(formData.get("value") as string) || 0;
    const suffix = formData.get("suffix") as string;
    const icon = formData.get("icon") as string || "Users";
    
    await prisma.stat.create({
      data: { label, value, suffix, icon },
    });

    revalidatePath("/admin/statistik");
    revalidatePath("/");
    
    return { success: true, message: "Statistik berhasil ditambahkan!" };
  } catch (error) {
    return { success: false, message: "Gagal menyimpan data." };
  }
}

// 2. UPDATE STATISTIK
export async function updateStat(id: number, formData: FormData) {
  try {
    const label = formData.get("label") as string;
    const value = parseInt(formData.get("value") as string);
    const suffix = formData.get("suffix") as string;
    const icon = formData.get("icon") as string;
    
    await prisma.stat.update({
      where: { id },
      data: { label, value, suffix, icon },
    });

    revalidatePath("/admin/statistik");
    revalidatePath("/");
    
    return { success: true, message: "Statistik berhasil diperbarui!" };
  } catch (error) {
    return { success: false, message: "Gagal memperbarui data." };
  }
}

// 3. HAPUS STATISTIK
export async function deleteStat(id: number) {
  try {
    await prisma.stat.delete({ where: { id } });
    
    // HANYA Revalidate halaman depan
    revalidatePath("/");
    
    return { success: true, message: "Statistik berhasil dihapus!" };
  } catch (error) {
    return { success: false, message: "Gagal menghapus data." };
  }
}