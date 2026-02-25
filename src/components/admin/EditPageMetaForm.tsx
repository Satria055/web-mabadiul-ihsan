"use client";

import { updatePageMeta } from "@/actions/pagemeta";
import { useState } from "react";
import { Save, Loader2, Image as ImageIcon } from "lucide-react";
import { PageMeta } from "@prisma/client";

export default function EditPageMetaForm({ data }: { data: PageMeta }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(data.image);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await updatePageMeta(data.id, formData);
    setLoading(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Readonly Slug */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Slug (ID Halaman)</label>
        <input 
          type="text" 
          value={data.slug} 
          disabled 
          className="w-full bg-gray-100 text-gray-500 px-4 py-2 rounded border border-gray-200 cursor-not-allowed font-mono text-sm"
        />
        <p className="text-[10px] text-gray-400 mt-1">Slug tidak dapat diubah untuk menjaga integritas sistem.</p>
      </div>

      {/* Judul & Deskripsi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Judul Halaman (Header)</label>
          <input 
            type="text" 
            name="title" 
            defaultValue={data.title}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-maroon-primary focus:border-maroon-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Sub-Judul / Deskripsi</label>
          <input 
            type="text" 
            name="description" 
            defaultValue={data.description || ""}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-maroon-primary focus:border-maroon-primary outline-none"
          />
        </div>
      </div>

      {/* Upload Gambar */}
      <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
        <label className="block text-xs font-bold text-gray-700 uppercase mb-3">Gambar Banner</label>
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Preview Area */}
            <div className="w-full md:w-1/2 h-40 bg-gray-200 rounded-lg overflow-hidden relative border border-gray-300 shadow-sm">
                {preview ? (
                   <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                   <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <ImageIcon size={32} />
                      <span className="text-xs mt-2">Tidak ada gambar</span>
                   </div>
                )}
            </div>

            {/* Input Area */}
            <div className="flex-1">
                <input 
                  type="file" 
                  name="image" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-xs file:font-semibold
                    file:bg-maroon-primary file:text-white
                    hover:file:bg-maroon-dark
                    cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Format: JPG, PNG, WebP. Disarankan ukuran 1920x600px agar tampilan header maksimal.
                </p>
            </div>
        </div>
      </div>

      {/* Tombol Simpan */}
      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button 
          type="submit" 
          disabled={loading}
          className="bg-maroon-primary text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-maroon-dark transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          Simpan Perubahan
        </button>
      </div>

    </form>
  );
}