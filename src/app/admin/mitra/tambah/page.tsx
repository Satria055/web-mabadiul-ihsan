"use client";

import { createPartner } from "@/actions/partners";
import Link from "next/link";
import { ArrowLeft, Building2, Globe, ListOrdered, Image as ImageIcon, Loader2 } from "lucide-react";
import SubmitButton from "@/components/admin/SubmitButton"; // Opsional, bisa pakai button biasa jika mau custom loading state
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";

export default function TambahMitraPage() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await createPartner(formData);

    if (result.success) {
      showAlert(result.message, "success");
      setTimeout(() => {
        router.push("/admin/mitra");
        router.refresh();
      }, 1500);
    } else {
      showAlert(result.message, "error");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-6">
        <Link href="/admin/mitra" className="flex items-center gap-2 text-gray-500 hover:text-maroon-primary transition-colors">
          <ArrowLeft size={20} /> <span className="font-bold">Kembali</span>
        </Link>
        <h1 className="text-2xl font-serif font-bold text-gray-800">Tambah Mitra Baru</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Building2 size={16} /> Nama Instansi
            </label>
            <input type="text" name="name" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none" placeholder="Contoh: PT. Telkom Indonesia" />
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Globe size={16} /> Website
                </label>
                <input type="url" name="website" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none" placeholder="https://..." />
             </div>
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <ListOrdered size={16} /> Urutan Tampil
                </label>
                <input type="number" name="order" defaultValue="0" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none" />
             </div>
          </div>

          {/* Upload Logo */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <ImageIcon size={16} /> Logo Mitra
            </label>
            <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-center relative h-40`}>
                <input type="file" name="logo" required accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                {preview ? (
                    <img src={preview} alt="Preview" className="h-full object-contain" />
                ) : (
                    <div className="flex flex-col items-center text-gray-400">
                        <ImageIcon size={32} className="mb-2" />
                        <span className="text-sm font-bold">Klik untuk Upload Logo</span>
                        <span className="text-xs">Format: PNG (Transparan) disarankan</span>
                    </div>
                )}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
             <button type="submit" disabled={loading} className="w-full bg-maroon-primary text-white py-3 rounded-lg font-bold hover:bg-maroon-dark transition-all disabled:opacity-70 flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" size={20}/> : "Simpan Mitra"}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}