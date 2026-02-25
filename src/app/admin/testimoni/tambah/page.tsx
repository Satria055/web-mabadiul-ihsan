"use client";

import { createTestimonial } from "@/actions/testimonials";
import Link from "next/link";
import { ArrowLeft, Save, User, Star, MessageSquare, Image as ImageIcon, Briefcase, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";

export default function TambahTestimoniPage() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await createTestimonial(formData);

    if (result.success) {
      showAlert(result.message, "success");
      setTimeout(() => {
        router.push("/admin/testimoni");
        router.refresh();
      }, 1500);
    } else {
      showAlert(result.message, "error");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-6">
        <Link href="/admin/testimoni" className="flex items-center gap-2 text-gray-500 hover:text-maroon-primary transition-colors">
          <ArrowLeft size={20} /> <span className="font-bold">Kembali</span>
        </Link>
        <h1 className="text-2xl font-serif font-bold text-gray-800">Tambah Testimoni Baru</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* KIRI */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <User size={18} className="text-maroon-primary"/> Nama Lengkap
                  </label>
                  <input type="text" name="name" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Briefcase size={18} className="text-maroon-primary"/> Status / Profesi
                  </label>
                  <input type="text" name="role" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <MessageSquare size={18} className="text-maroon-primary"/> Pendapat Mereka
               </label>
               <textarea name="content" required rows={6} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none leading-relaxed italic text-gray-600" placeholder="Tulis testimoni disini..."></textarea>
            </div>
          </div>

          {/* KANAN */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-6 z-10">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                <Save size={18} /> Simpan Data
              </h3>
              <button type="submit" disabled={loading} className="w-full bg-maroon-primary text-white py-3 rounded-lg font-bold hover:bg-maroon-dark transition-all disabled:opacity-70 flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" size={20}/> : "Terbitkan Testimoni"}
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2 border-b pb-2">
                <Star size={18} /> Rating Kepuasan
              </h3>
              <select name="rating" className="w-full px-3 py-3 rounded-lg border border-gray-300 bg-gray-50 outline-none cursor-pointer">
                <option value="5">⭐⭐⭐⭐⭐ (Sempurna)</option>
                <option value="4">⭐⭐⭐⭐ (Sangat Baik)</option>
                <option value="3">⭐⭐⭐ (Cukup)</option>
              </select>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2 border-b pb-2">
                <ImageIcon size={18} /> Foto Profil (Opsional)
              </h3>
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-md mb-4 group">
                   {preview ? (
                     <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                        <User size={48} />
                     </div>
                   )}
                </div>
                <div className="relative overflow-hidden inline-block">
                  <button type="button" className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-50 transition-colors">
                    Pilih Foto
                  </button>
                  <input ref={fileInputRef} type="file" name="image" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}