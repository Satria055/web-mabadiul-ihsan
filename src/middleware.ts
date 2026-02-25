import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "rahasia-negara-mabadiul-ihsan-2026");

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Ambil Cookie
  const sessionCookie = request.cookies.get("admin_session");

  // 2. Proteksi Halaman Admin
  if (pathname.startsWith("/admin")) {
    // Jika tidak ada cookie, tendang ke login
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Verifikasi Token JWT
      await jwtVerify(sessionCookie.value, SECRET_KEY);
      // Jika valid, lanjut
      return NextResponse.next();
    } catch (error) {
      // Jika token invalid/expired, tendang ke login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 3. Redirect User Login jika sudah punya session aktif
  if (pathname === "/login") {
    if (sessionCookie) {
      try {
        await jwtVerify(sessionCookie.value, SECRET_KEY);
        // Jika sudah login, jangan boleh buka halaman login lagi, lempar ke dashboard
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      } catch (error) {
        // Token invalid, biarkan buka halaman login
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

// Tentukan route mana saja yang kena middleware
export const config = {
  matcher: ["/admin/:path*", "/login"],
};