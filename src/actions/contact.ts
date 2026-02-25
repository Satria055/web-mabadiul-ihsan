"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // Validasi sederhana
    if (!name || !email || !message) {
      return { success: false, message: "Nama, Email, dan Pesan wajib diisi." };
    }

    // Simpan ke Database
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject: subject || "Tanpa Subjek",
        message,
        isRead: false,
      },
    });

    // Revalidate halaman admin agar notifikasi masuk (jika ada counter)
    revalidatePath("/admin/pesan");
    
    return { success: true, message: "Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda." };
  } catch (error) {
    console.error("Contact Error:", error);
    return { success: false, message: "Gagal mengirim pesan. Silakan coba lagi." };
  }
}

// Action untuk menandai pesan sudah dibaca (dipakai di Admin)
export async function markAsRead(id: number) {
  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true }
    });
    revalidatePath("/admin/pesan");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// Action Hapus Pesan
export async function deleteMessage(id: number) {
  try {
    await prisma.contactMessage.delete({ where: { id } });
    revalidatePath("/admin/pesan");
    return { success: true, message: "Pesan dihapus." };
  } catch (error) {
    return { success: false, message: "Gagal menghapus pesan." };
  }
}