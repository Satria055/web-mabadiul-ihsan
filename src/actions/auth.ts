"use server";

import { prisma } from "@/lib/prisma";
import { SignJWT } from "jose";
import { cookies } from "next/headers"; // Next.js 16: cookies is async
import bcrypt from "bcryptjs";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "rahasia-negara-mabadiul-ihsan-2026");

export async function loginAction(formData: FormData) {
  try {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    // 1. Cari User
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return { success: false, message: "Username tidak ditemukan." };
    }

    // 2. Cek Password (Self-Healing: Support Plain Text & Hash)
    let isPasswordValid = false;

    // Skenario A: Password di DB masih Plain Text (User lama/Seed manual)
    if (user.password === password) {
      isPasswordValid = true;
      
      // Auto-update ke hash supaya login berikutnya aman
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      });
    } 
    // Skenario B: Password di DB sudah Hash (Normal)
    else {
      // Pastikan password di DB bukan plain text sembarangan agar bcrypt tidak error
      // Jika password di DB pendek (plain), bcrypt.compare bisa error, kita tangkap.
      try {
        isPasswordValid = await bcrypt.compare(password, user.password);
      } catch (err) {
        isPasswordValid = false; // Anggap salah jika format hash rusak
      }
    }

    if (!isPasswordValid) {
      return { success: false, message: "Password salah." };
    }

    // 3. Buat Token JWT
    const token = await new SignJWT({ 
        id: user.id, 
        username: user.username, 
        role: user.role,
        name: user.name 
      })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(SECRET_KEY);

    // 4. Simpan Cookie (FIX UNTUK NEXT.JS 16)
    // cookies() sekarang mengembalikan Promise, jadi harus di-await
    const cookieStore = await cookies(); 
    
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 Hari
      path: "/",
      sameSite: "strict"
    });

    return { success: true, message: "Login berhasil!" };

  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, message: "Terjadi kesalahan sistem. Cek terminal VS Code." };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies(); // Next.js 16 fix
  cookieStore.delete("admin_session");
  return { success: true };
}