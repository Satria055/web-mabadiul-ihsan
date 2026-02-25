"use client";

import { createPost } from "@/actions/posts"; 
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { ArrowLeft, X, Save, Calendar, Image as ImageIcon, Layers, FileText, Loader2 } from "lucide-react"; 
import RichEditor from "@/components/admin/RichEditor";
import { useState, useRef } from "react";
import Alert from "@/components/ui/Alert"; // Pastikan file ini ada (dari step sebelumnya)

export default function TambahBeritaPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [alert, setAlert] = useState<{ show: boolean; type: "success" | "error" | "warning"; message: string }>({
    show: false, type: "success", message: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = ""; 
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ ...alert, show: false }); 

    const formData = new FormData(e.currentTarget);
    
    if (!content) {
        setAlert({ show: true, type: "error", message: "Konten berita tidak boleh kosong." });
        setLoading(false);
        return;
    }

    try {
      const result = await createPost(formData); 

      if (result.success) {
        setAlert({ show: true, type: "success", message: result.message });
        setTimeout(() => {
            router.push("/admin/berita");
            router.refresh();
        }, 2000);
      } else {
        setAlert({ show: true, type: "error", message: result.message });
        setLoading(false);
      }
    } catch (error) {
      setAlert({ show: true, type: "error", message: "Terjadi kesalahan sistem." });
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      
      <Alert 
        isVisible={alert.show} 
        type={alert.type} 
        message={alert.message} 
        onClose={() => setAlert({ ...alert, show: false })}
      />

      <div className="flex items-center justify-between mb-6">
        <Link href="/admin/berita" className="flex items-center gap-2 text-gray-500 hover:text-maroon-primary transition-colors">
          <ArrowLeft size={20} /> <span className="font-bold">Kembali</span>
        </Link>
        <h1 className="text-2xl font-serif font-bold text-gray-800">Tulis Berita Baru</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <input 
                type="text" name="title" required 
                className="w-full text-3xl font-serif font-bold text-gray-800 placeholder-gray-300 border-none focus:ring-0 p-0 outline-none" 
                placeholder="Tulis Judul Berita Disini..." 
              />
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <FileText size={16} className="text-gray-400"/>
                <label className="text-xs font-bold text-gray-500">Ringkasan Singkat (SEO)</label>
              </div>
              <textarea 
                name="excerpt" rows={2}
                className="w-full text-sm text-gray-700 border-gray-300 rounded-lg focus:ring-maroon-primary focus:border-maroon-primary"
                placeholder="Otomatis diambil dari paragraf pertama jika kosong..."
              />
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm min-h-[500px]">
              <RichEditor value={content} onChange={setContent} />
              <input type="hidden" name="content" value={content} />
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-6 z-10">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                <Save size={18} /> Publikasi
              </h3>
              <button 
                type="submit" disabled={loading}
                className="w-full bg-maroon-primary text-white py-3 rounded-lg font-bold hover:bg-maroon-dark transition-all disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={20}/> : "Terbitkan Sekarang"}
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2 border-b pb-2">
                <Layers size={18} /> Pengaturan
              </h3>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Kategori</label>
                <select name="category" className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-sm">
                  <option value="Berita">Berita Sekolah</option>
                  <option value="Artikel">Artikel Islami</option>
                  <option value="Pengumuman">Pengumuman</option>
                  <option value="Prestasi">Info Prestasi</option>
                  <option value="Agenda">Agenda Kegiatan</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Tanggal Kegiatan</label>
                <div className="relative">
                  <input type="date" name="eventDate" className="w-full px-3 py-2 pl-9 rounded-lg border border-gray-300 bg-gray-50 text-sm" />
                  <Calendar className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2 border-b pb-2">
                <ImageIcon size={18} /> Thumbnail
              </h3>
              <div className="relative">
                {preview && (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 border border-gray-200">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={removeImage} className="absolute top-2 right-2 bg-white/90 text-red-500 p-1.5 rounded-full shadow-sm hover:bg-white transition-colors z-20">
                      <X size={16} />
                    </button>
                  </div>
                )}
                <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-center relative h-40 ${preview ? 'hidden' : 'flex'}`}>
                  <input ref={fileInputRef} id="imageInput" type="file" name="image" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                  <ImageIcon className="text-gray-400 mb-2" size={24} />
                  <span className="text-xs font-medium text-gray-500">Klik untuk Upload Gambar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}