"use client";

import { updateAchievement } from "@/actions/achievements";
import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon, Trophy, User, Calendar, MapPin, AlignLeft, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";
import { Achievement } from "@prisma/client";

export default function EditAchievementForm({ achievement }: { achievement: Achievement }) {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  
  const [preview, setPreview] = useState<string | null>(achievement.image);
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setIsImageRemoved(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setIsImageRemoved(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await updateAchievement(achievement.id, formData);

    if (result.success) {
      showAlert(result.message, "success");
      setTimeout(() => {
        router.push("/admin/prestasi");
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
        <Link href="/admin/prestasi" className="flex items-center gap-2 text-gray-500 hover:text-maroon-primary transition-colors">
          <ArrowLeft size={20} /> <span className="font-bold">Kembali</span>
        </Link>
        <h1 className="text-2xl font-serif font-bold text-gray-800">Edit Data Prestasi</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <input type="hidden" name="removeImage" value={isImageRemoved.toString()} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* KIRI */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Nama Kejuaraan / Lomba</label>
                <input type="text" name="title" defaultValue={achievement.title} required className="w-full text-2xl font-serif font-bold text-gray-800 placeholder-gray-300 border-none focus:ring-0 p-0 outline-none" />
              </div>
              
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <AlignLeft size={18} className="text-maroon-primary"/> Cerita / Deskripsi
                 </label>
                 <textarea name="description" defaultValue={achievement.description || ""} rows={8} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none leading-relaxed"></textarea>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                 <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <User size={18} className="text-gray-400" /> Nama Santri / Tim
                 </label>
                 <input type="text" name="student" defaultValue={achievement.student} required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none" />
              </div>
              <div>
                 <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar size={18} className="text-gray-400" /> Waktu Perolehan
                 </label>
                 <input type="text" name="date" defaultValue={achievement.date} required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none" />
              </div>
            </div>
          </div>

          {/* KANAN */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-6 z-10">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                <Save size={18} /> Simpan Perubahan
              </h3>
              <button type="submit" disabled={loading} className="w-full bg-maroon-primary text-white py-3 rounded-lg font-bold hover:bg-maroon-dark transition-all disabled:opacity-70 flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" size={20}/> : "Update Prestasi"}
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2 border-b pb-2">
                <Trophy size={18} /> Detail Kejuaraan
              </h3>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">PERINGKAT JUARA</label>
                <select name="rank" defaultValue={achievement.rank} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 outline-none">
                  <option value="1">Juara 1 (Emas)</option>
                  <option value="2">Juara 2 (Perak)</option>
                  <option value="3">Juara 3 (Perunggu)</option>
                  <option value="0">Harapan / Favorit</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">KATEGORI LOMBA</label>
                <select name="category" defaultValue={achievement.category} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 outline-none">
                  <option value="Akademik">Akademik</option>
                  <option value="Keagamaan">Keagamaan</option>
                  <option value="Olahraga">Olahraga</option>
                  <option value="Seni">Seni & Kreativitas</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">TINGKATAN</label>
                <div className="relative">
                  <input type="text" name="level" defaultValue={achievement.level} required className="w-full px-3 py-2 pl-9 rounded-lg border border-gray-300 outline-none" />
                  <MapPin size={16} className="absolute left-3 top-2.5 text-gray-400"/>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2 border-b pb-2">
                <ImageIcon size={18} /> Dokumentasi
              </h3>
              <div className="relative">
                {preview && (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 border border-gray-200">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-center relative h-40 ${preview ? 'hidden' : 'flex'}`}>
                  <input ref={fileInputRef} type="file" name="image" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <ImageIcon className="text-gray-400 mb-2" size={24} />
                  <span className="text-sm font-bold text-gray-600">
                     {preview ? "Ganti Foto" : "Upload Foto"}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}