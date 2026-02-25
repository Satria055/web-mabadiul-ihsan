import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AlertProvider } from "@/context/AlertContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yayasan Pondok Pesantren Mabadi'ul Ihsan",
  description: "Website Resmi Yayasan Pondok Pesantren Mabadi'ul Ihsan Banyuwangi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {/* 2. WRAP APLIKASI DENGAN ALERT PROVIDER */}
        <AlertProvider>
           {children}
        </AlertProvider>
      </body>
    </html>
  );
}