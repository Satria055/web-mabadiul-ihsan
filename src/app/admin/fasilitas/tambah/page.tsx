"use client";

import { createFacility } from "@/actions/facility";
import Link from "next/link";
import { ArrowLeft, School, FileText, Upload, Save, Loader2, ImageIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";

export default function TambahFasilitasPage() {
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
    const result = await createFacility(formData);

    if (result.success) {
      showAlert(result.message, "success");
      setTimeout(() => {
        router.push("/admin/fasilitas");
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
        <Link href="/admin/fasilitas" className="flex items-center gap-2 text-gray-500 hover:text-maroon-primary transition-colors">
          <ArrowLeft size={20} /> <span className="font-bold">Kembali</span>
        </Link>
        <h1 className="text-2xl font-serif font-bold text-gray-800">Tambah Fasilitas</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Upload Foto */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <ImageIcon size={18} /> Foto Fasilitas (Wajib)
            </label>
            <div className="w-full aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center relative overflow-hidden group hover:border-maroon-primary transition-colors">
               {preview ? (
                 <img src={preview} className="w-full h-full object-cover" alt="Preview" />
               ) : (
                 <div className="text-center text-gray-400">
                    <Upload size={32} className="mx-auto mb-2" />
                    <p className="text-sm">Klik untuk upload gambar</p>
                 </div>
               )}
               <input type="file" name="image" accept="image/*" required onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <School size={16} /> Nama Fasilitas
             </label>
             <input type="text" name="name" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none" placeholder="Contoh: Laboratorium Komputer" />
          </div>
          
          <div>
             <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <FileText size={16} /> Deskripsi
             </label>
             <textarea name="description" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none" placeholder="Deskripsi singkat fasilitas..."></textarea>
          </div>

          <div className="pt-6 border-t border-gray-100">
             <button type="submit" disabled={loading} className="w-full bg-maroon-primary text-white py-3 rounded-lg font-bold hover:bg-maroon-dark transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-md">
                {loading ? <Loader2 className="animate-spin" size={20}/> : <><Save size={18}/> Simpan Data</>}
             </button>
          </div>

        </form>
      </div>
    </div>
  );
}