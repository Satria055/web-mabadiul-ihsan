import { prisma } from "@/lib/prisma";
import SettingsForm from "./SettingsForm"; 

export default async function SettingsPage() {
  // Ambil data konfigurasi pertama (ID 1)
  const config = await prisma.siteConfig.findFirst(); 

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-gray-800">Pengaturan Website</h1>
        <p className="text-gray-500 text-sm">Kelola identitas utama, kontak, sosial media, dan aset sekolah.</p>
      </div>

      {/* Panggil Form Client */}
      <SettingsForm initialData={config} />
    </div>
  );
}