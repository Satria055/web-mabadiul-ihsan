"use client";

import { updatePost } from "@/actions/posts";
import Link from "next/link";
import { ArrowLeft, X, Save, Calendar, Image as ImageIcon, Layers, FileText, Loader2 } from "lucide-react";
import RichEditor from "@/components/admin/RichEditor";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation"; // Penting untuk redirect manual
import Alert from "@/components/ui/Alert"; // Gunakan UI Alert

type PostData = {
  id: number;
  title: string;
  category: string;
  content: string;
  excerpt: string | null;
  image: string | null;
  eventDate: Date | null;
};

export default function EditBeritaForm({ post }: { post: PostData }) {
  const router = useRouter();
  const [content, setContent] = useState(post.content); 
  const [preview, setPreview] = useState<string | null>(post.image);
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const [loading, setLoading] = useState(false);

  // State Alert
  const [alert, setAlert] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false, type: "success", message: "",
  });

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

  // HANDLER SUBMIT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ ...alert, show: false });

    const formData = new FormData(e.currentTarget);
    
    try {
      // Panggil Server Action
      const result = await updatePost(post.id, formData);

      if (result.success) {
        // 1. Tampilkan Alert Sukses
        setAlert({ show: true, type: "success", message: result.message });
        
        // 2. Delay Redirect (agar alert terbaca)
        setTimeout(() => {
            router.push("/admin/berita"); // Redirect manual ke list berita
            router.refresh(); // Refresh data terbaru
        }, 1500); 
      } else {
        setAlert({ show: true, type: "error", message: result.message });
        setLoading(false);
      }
    } catch (error) {
      setAlert({ show: true, type: "error", message: "Terjadi kesalahan sistem." });
      setLoading(false);
    }
  };

  const formattedDate = post.eventDate ? new Date(post.eventDate).toISOString().split('T')[0] : "";

  return (
    <div className="max-w-7xl mx-auto pb-20">
      
      {/* GLOBAL ALERT */}
      <Alert 
        isVisible={alert.show} 
        type={alert.type} 
        message={alert.message} 
        onClose={() => setAlert({ ...alert, show: false })}
      />

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/admin/berita" className="flex items-center gap-2 text-gray-500 hover:text-maroon-primary transition-colors">
          <ArrowLeft size={20} /> <span className="font-bold">Kembali</span>
        </Link>
        <h1 className="text-2xl font-serif font-bold text-gray-800">Edit Berita</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <input type="hidden" name="removeImage" value={isImageRemoved.toString()} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* KOLOM KIRI */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <input type="text" name="title" defaultValue={post.title} required 
                className="w-full text-3xl font-serif font-bold text-gray-800 placeholder-gray-300 border-none focus:ring-0 p-0 outline-none" 
              />
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <FileText size={16} className="text-gray-400"/>
                <label className="text-xs font-bold text-gray-500">Ringkasan Singkat (SEO)</label>
              </div>
              <textarea name="excerpt" rows={2} defaultValue={post.excerpt || ""} 
                className="w-full text-sm text-gray-700 border-gray-300 rounded-lg focus:ring-maroon-primary focus:border-maroon-primary"
              />
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm min-h-[500px]">
              <RichEditor value={content} onChange={setContent} />
              <input type="hidden" name="content" value={content} />
            </div>
          </div>

          {/* KOLOM KANAN */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-6 z-10">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                <Save size={18} /> Simpan Perubahan
              </h3>
              <button type="submit" disabled={loading} className="w-full bg-maroon-primary text-white py-3 rounded-lg font-bold hover:bg-maroon-dark transition-all disabled:opacity-70 flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" size={20}/> : "Update Berita"}
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2 border-b pb-2">
                <Layers size={18} /> Pengaturan
              </h3>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Kategori</label>
                <select name="category" defaultValue={post.category} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-sm">
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
                  <input type="date" name="eventDate" defaultValue={formattedDate} className="w-full px-3 py-2 pl-9 rounded-lg border border-gray-300 bg-gray-50 text-sm" />
                  <Calendar className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2 border-b pb-2">
                <ImageIcon size={18} /> Thumbnail
              </h3>
              {preview ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-300 group">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={removeImage} className="absolute top-2 right-2 bg-white/90 text-red-500 p-1.5 rounded-full shadow-sm hover:bg-white transition-colors z-20">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-center relative h-40`}>
                  <ImageIcon className="text-gray-400 mb-2" size={24} />
                  <span className="text-xs font-medium text-gray-500">Upload Gambar</span>
                </div>
              )}
              {/* Input file disembunyikan tapi tetap ada di DOM agar form bisa membaca valuenya */}
              <input ref={fileInputRef} id="imageInput" type="file" name="image" accept="image/*" onChange={handleImageChange} className="absolute opacity-0 w-1 h-1 pointer-events-none" />
              {/* Klik area di atas mentrigger input file ini lewat label atau custom click handler jika perlu, 
                  tapi di contoh previous saya taruh input absolute overlay. 
                  Pastikan styling input file sesuai agar bisa diklik.
              */}
              {!preview && (
                  <input ref={fileInputRef} id="imageInput" type="file" name="image" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" style={{top:0, left:0, height:'100%', width:'100%', position:'absolute'}} />
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}