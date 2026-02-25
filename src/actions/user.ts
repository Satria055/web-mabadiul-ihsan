"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

// Pastikan Secret Key sama dengan yang ada di auth.ts
const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "rahasia-negara-mabadiul-ihsan-2026");

// 1. CREATE USER
export async function createUser(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    if (!username || !password || !name) {
      return { success: false, message: "Nama, Username, dan Password wajib diisi." };
    }

    // Cek apakah username sudah ada
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return { success: false, message: "Username sudah digunakan!" };
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        username,
        password: hashedPassword,
        role: role || "admin",
      },
    });

    revalidatePath("/admin/users");
    return { success: true, message: "User berhasil ditambahkan!" };
  } catch (error) {
    console.error("Create User Error:", error);
    return { success: false, message: "Terjadi kesalahan saat membuat user." };
  }
}

// 2. UPDATE USER (DENGAN AUTO REFRESH SESSION)
export async function updateUser(id: number, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string; // Optional
    const role = formData.get("role") as string;

    // A. Siapkan data update
    const dataToUpdate: any = { name, username, role };

    // Hanya update password jika diisi
    if (password && password.trim() !== "") {
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    // B. Update ke Database
    const updatedUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });

    // C. LOGIKA BARU: Cek & Refresh Token jika user mengedit dirinya sendiri
    const cookieStore = await cookies();
    const currentToken = cookieStore.get("admin_session")?.value;

    if (currentToken) {
      try {
        // 1. Dekode token saat ini untuk melihat siapa yang sedang login
        const { payload } = await jwtVerify(currentToken, SECRET_KEY);
        
        // 2. Jika ID user yang login SAMA DENGAN ID user yang diedit
        if (payload.id === id) {
          
          // 3. Buat Token Baru dengan data TERBARU (Nama/Role baru)
          const newToken = await new SignJWT({ 
              id: updatedUser.id, 
              username: updatedUser.username, 
              role: updatedUser.role,
              name: updatedUser.name // <--- Nama Baru tersimpan di sini
            })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("24h")
            .sign(SECRET_KEY);

          // 4. Timpa Cookie Lama
          cookieStore.set("admin_session", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 Hari
            path: "/",
            sameSite: "strict"
          });
        }
      } catch (e) {
        // Abaikan error verifikasi (misal token expired), jangan gagalkan update database
        console.warn("Gagal refresh token otomatis:", e);
      }
    }

    // D. Revalidate Cache
    revalidatePath("/admin/users");
    revalidatePath("/admin/dashboard"); // Supaya dashboard langsung berubah namanya
    
    return { success: true, message: "Data user berhasil diperbarui!" };

  } catch (error) {
    console.error("Update User Error:", error);
    return { success: false, message: "Gagal update user. Username mungkin duplikat." };
  }
}

// 3. DELETE USER
export async function deleteUser(id: number) {
  try {
    // PROTEKSI: Admin Utama (Misal ID 1) tidak boleh dihapus
    if (id === 1) {
      return { success: false, message: "Admin Utama tidak bisa dihapus!" };
    }

    await prisma.user.delete({ where: { id } });
    revalidatePath("/admin/users");
    return { success: true, message: "User berhasil dihapus." };
  } catch (error) {
    console.error("Delete User Error:", error);
    return { success: false, message: "Gagal menghapus user." };
  }
}