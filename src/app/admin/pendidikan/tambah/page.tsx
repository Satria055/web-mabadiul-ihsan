"use client";

import { createEducationUnit } from "@/actions/education";
import Link from "next/link";
import { ArrowLeft, Building2, MapPin, Share2, Save, ImageIcon, Layers, Plus, Loader2, X, CheckCircle2 } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";

export default function TambahUnitPage() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  
  // State Thumbnail
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State Galeri
  const [galleryCount, setGalleryCount] = useState(0);

  // --- Logic Thumbnail ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // --- Logic Gallery ---
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGalleryCount(e.target.files.length);
    }
  };

  // --- Submit ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Validasi Ukuran Client-Side (Opsional)
      const file = formData.get("image") as File;
      const galleryFiles = formData.getAll("galleryImages") as File[];
      
      let totalSize = file?.size || 0;
      galleryFiles.forEach(f => totalSize += f.size);

      if (totalSize > 10 * 1024 * 1024) { // 10MB
         showAlert("Ukuran total file terlalu besar (Max 10MB). Kurangi foto galeri.", "error");
         setLoading(false);
         return;
      }

      const result = await createEducationUnit(formData);

      if (result?.success) {
        showAlert(result.message, "success");
        setTimeout(() => {
          router.push("/admin/pendidikan");
          router.refresh();
        }, 1500);
      } else {
        showAlert(result?.message || "Gagal menyimpan data.", "error");
        setLoading(false);
      }
    } catch (error) {
      showAlert("Terjadi kesalahan jaringan atau file terlalu besar.", "error");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-6">
        <Link href="/admin/pendidikan" className="flex items-center gap-2 text-gray-500 hover:text-maroon-primary transition-colors">
          <ArrowLeft size={20} /> <span className="font-bold">Kembali</span>
        </Link>
        <h1 className="text-2xl font-serif font-bold text-gray-800">Tambah Unit Pendidikan</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* === KOLOM KIRI (DATA) === */}
          <div className="lg:col-span-2 space-y-8">
             {/* 1. IDENTITAS */}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-2">
                  <Building2 size={20} className="text-maroon-primary" /> Identitas Sekolah
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">NAMA UNIT</label>
                    <input type="text" name="name" required className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none font-bold text-lg" placeholder="Contoh: SMA Islam Terpadu..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div><label className="block text-xs font-bold text-gray-500 mb-1">NPSN</label><input type="text" name="npsn" className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none" /></div>
                     <div><label className="block text-xs font-bold text-gray-500 mb-1">AKREDITASI</label><select name="accreditation" className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white outline-none"><option value="">- Pilih -</option><option value="A">A (Unggul)</option><option value="B">B (Baik)</option><option value="C">C (Cukup)</option><option value="-">Belum Terakreditasi</option></select></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div><label className="block text-xs font-bold text-gray-500 mb-1">STATUS</label><select name="status" className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white outline-none"><option value="SWASTA">SWASTA</option><option value="NEGERI">NEGERI</option></select></div>
                     <div><label className="block text-xs font-bold text-gray-500 mb-1">KATEGORI</label><select name="category" className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white outline-none"><option value="Pendidikan Formal">Pendidikan Formal</option><option value="Pendidikan Non Formal">Pendidikan Non Formal</option><option value="Program Pesantren">Program Pesantren</option></select></div>
                  </div>
                  <div><label className="block text-xs font-bold text-gray-500 mb-1">DESKRIPSI</label><textarea name="description" rows={6} className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none leading-relaxed" placeholder="Deskripsi singkat..."></textarea></div>
                </div>
             </div>

             {/* 2. ALAMAT */}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-2"><MapPin size={20} className="text-maroon-primary" /> Alamat Lengkap</h3>
                <div className="space-y-4">
                   <input type="text" name="address" placeholder="Jalan / Dusun" className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none" />
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <input type="text" name="village" placeholder="Desa/Kel" className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none" />
                      <input type="text" name="district" placeholder="Kecamatan" className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none" />
                      <input type="text" name="regency" placeholder="Kab/Kota" className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none" />
                      <input type="text" name="province" placeholder="Provinsi" className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none" />
                   </div>
                </div>
             </div>

             {/* 3. KONTAK */}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-2"><Share2 size={20} className="text-maroon-primary" /> Kontak & Sosmed</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-3">
                    <input type="email" name="email" placeholder="Email" className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm outline-none" />
                    <input type="text" name="phone" placeholder="Telepon" className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm outline-none" />
                    <input type="url" name="link" placeholder="Website" className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm outline-none" />
                 </div>
                 <div className="space-y-3">
                    <input type="url" name="facebookUrl" placeholder="Facebook URL" className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm outline-none" />
                    <input type="url" name="instagramUrl" placeholder="Instagram URL" className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm outline-none" />
                    <input type="url" name="tiktokUrl" placeholder="TikTok URL" className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm outline-none" />
                    <input type="url" name="twitterUrl" placeholder="Twitter URL" className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm outline-none" />
                 </div>
               </div>
             </div>
          </div>

          {/* === KOLOM KANAN (MEDIA) === */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-6 z-10">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                <Save size={18} /> Simpan Data
              </h3>
              <button type="submit" disabled={loading} className="w-full bg-maroon-primary text-white py-3 rounded-lg font-bold hover:bg-maroon-dark transition-all disabled:opacity-70 flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" size={20}/> : "Terbitkan Unit"}
              </button>
            </div>

            {/* THUMBNAIL (PERBAIKAN: Input Tetap Render, Hanya Hidden) */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2 border-b pb-2">
                <ImageIcon size={18} /> Thumbnail
              </h3>
              
              <div className="relative">
                {/* Preview Image */}
                {preview && (
                   <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200 group mb-4">
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={removeImage} 
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-md hover:bg-red-600 transition-colors z-20"
                        title="Hapus"
                      >
                        <X size={16} />
                      </button>
                   </div>
                )}

                {/* Input Area: Gunakan CSS 'hidden' jika preview ada, JANGAN hapus elemen dari DOM */}
                <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-center relative h-40 group ${preview ? 'hidden' : 'flex'}`}>
                   <input 
                      ref={fileInputRef} 
                      type="file" 
                      name="image" 
                      accept="image/*" 
                      onChange={handleImageChange} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                   />
                   <div className="bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                     <ImageIcon className="text-maroon-primary" size={24} />
                   </div>
                   <span className="text-sm font-bold text-gray-600">Klik Upload Thumbnail</span>
                </div>
              </div>
            </div>

            {/* GALERI KEGIATAN */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2 border-b pb-2">
                  <Layers size={18} /> Galeri Kegiatan
               </h3>
               
               <div className={`border-2 border-dashed ${galleryCount > 0 ? 'border-green-400 bg-green-50' : 'border-blue-300 bg-blue-50'} rounded-lg p-6 relative transition-colors`}>
                  <input 
                    type="file" 
                    name="galleryImages" 
                    multiple 
                    accept="image/*" 
                    onChange={handleGalleryChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
                  />
                  <div className="flex flex-col items-center justify-center text-center">
                      {galleryCount > 0 ? (
                        <>
                          <CheckCircle2 size={32} className="text-green-600 mb-2" />
                          <p className="text-sm font-bold text-green-800">{galleryCount} Foto Dipilih</p>
                        </>
                      ) : (
                        <>
                          <Plus size={32} className="text-blue-500 mb-2" />
                          <p className="text-xs font-bold text-blue-800">UPLOAD BANYAK FOTO</p>
                        </>
                      )}
                  </div>
               </div>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}