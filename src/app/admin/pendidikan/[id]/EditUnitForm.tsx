"use client";

import { updateEducationUnit, deleteGalleryItem } from "@/actions/education";
import Link from "next/link";
import { ArrowLeft, Save, Building2, MapPin, Share2, ImageIcon, Layers, Plus, X, Trash2, Loader2, CheckCircle2 } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";

type EducationGallery = { id: number; image: string; };
type EducationUnit = {
  id: number; name: string; description: string | null; image: string | null; link: string | null;
  category: string; npsn: string | null; status: string | null; accreditation: string | null;
  address: string | null; village: string | null; district: string | null; regency: string | null; province: string | null;
  email: string | null; phone: string | null;
  facebookUrl: string | null; instagramUrl: string | null; tiktokUrl: string | null; twitterUrl: string | null;
  gallery: EducationGallery[];
};

export default function EditUnitForm({ unit }: { unit: EducationUnit }) {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  
  // State Thumb
  const [preview, setPreview] = useState<string | null>(unit.image);
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State Gallery Input
  const [galleryCount, setGalleryCount] = useState(0);

  // --- Handlers ---
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

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGalleryCount(e.target.files.length);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Validasi Ukuran Client-Side
      const file = formData.get("image") as File;
      const galleryFiles = formData.getAll("galleryImages") as File[];
      let totalSize = file?.size || 0;
      galleryFiles.forEach(f => totalSize += f.size);

      if (totalSize > 10 * 1024 * 1024) { 
         showAlert("Ukuran file terlalu besar (Max 10MB).", "error");
         setLoading(false);
         return;
      }

      const result = await updateEducationUnit(unit.id, formData);

      if (result?.success) {
        showAlert(result.message, "success");
        setTimeout(() => {
          router.push("/admin/pendidikan");
          router.refresh();
        }, 1500);
      } else {
        showAlert(result?.message || "Gagal update data.", "error");
        setLoading(false);
      }
    } catch (error) {
      showAlert("Kesalahan jaringan.", "error");
      setLoading(false);
    }
  };

  const handleDeleteGallery = async (galleryId: number) => {
    if (confirm("Hapus foto ini dari galeri?")) {
      try {
        const result = await deleteGalleryItem(galleryId);
        if (result.success) {
          showAlert(result.message, "success");
          router.refresh(); 
        } else {
          showAlert(result.message, "error");
        }
      } catch (error) {
        showAlert("Gagal menghapus foto.", "error");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-6">
        <Link href="/admin/pendidikan" className="flex items-center gap-2 text-gray-500 hover:text-maroon-primary transition-colors">
          <ArrowLeft size={20} /> <span className="font-bold">Kembali</span>
        </Link>
        <h1 className="text-2xl font-serif font-bold text-gray-800">Edit Unit Pendidikan</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <input type="hidden" name="removeImage" value={isImageRemoved.toString()} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* KOLOM KIRI (DATA) */}
          <div className="lg:col-span-2 space-y-8">
             {/* 1. IDENTITAS */}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-2">
                  <Building2 size={20} className="text-maroon-primary" /> Identitas Sekolah
                </h3>
                <div className="space-y-4">
                  <div><label className="block text-xs font-bold text-gray-500 mb-1">NAMA UNIT</label><input type="text" name="name" defaultValue={unit.name} required className="w-full px-4 py-2 rounded-lg border border-gray-300 font-bold text-lg outline-none" /></div>
                   <div className="grid grid-cols-2 gap-4">
                      <div><label className="block text-xs font-bold text-gray-500 mb-1">NPSN</label><input type="text" name="npsn" defaultValue={unit.npsn || ""} className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none" /></div>
                      <div><label className="block text-xs font-bold text-gray-500 mb-1">AKREDITASI</label><select name="accreditation" defaultValue={unit.accreditation || ""} className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white outline-none"><option value="">- Pilih -</option><option value="A">A</option><option value="B">B</option><option value="C">C</option></select></div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div><label className="block text-xs font-bold text-gray-500 mb-1">STATUS</label><select name="status" defaultValue={unit.status || "SWASTA"} className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white outline-none"><option value="SWASTA">SWASTA</option><option value="NEGERI">NEGERI</option></select></div>
                      <div><label className="block text-xs font-bold text-gray-500 mb-1">KATEGORI</label><select name="category" defaultValue={unit.category} className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white outline-none"><option value="Pendidikan Formal">Pendidikan Formal</option><option value="Pendidikan Non Formal">Pendidikan Non Formal</option><option value="Program Pesantren">Program Pesantren</option></select></div>
                   </div>
                   <div><label className="block text-xs font-bold text-gray-500 mb-1">DESKRIPSI</label><textarea name="description" defaultValue={unit.description || ""} rows={6} className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none"></textarea></div>
                </div>
             </div>
             
             {/* 2. ALAMAT */}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-2"><MapPin size={20} className="text-maroon-primary" /> Alamat Lengkap</h3>
                <div className="space-y-4">
                    <input type="text" name="address" defaultValue={unit.address || ""} placeholder="Jalan / Dusun" className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       <input type="text" name="village" defaultValue={unit.village || ""} placeholder="Desa" className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none" />
                       <input type="text" name="district" defaultValue={unit.district || ""} placeholder="Kecamatan" className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none" />
                       <input type="text" name="regency" defaultValue={unit.regency || ""} placeholder="Kab/Kota" className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none" />
                       <input type="text" name="province" defaultValue={unit.province || ""} placeholder="Provinsi" className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none" />
                    </div>
                </div>
             </div>

             {/* 3. KONTAK */}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-2"><Share2 size={20} className="text-maroon-primary" /> Kontak & Sosmed</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-3">
                    <input type="email" name="email" defaultValue={unit.email || ""} placeholder="Email" className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm outline-none" />
                    <input type="text" name="phone" defaultValue={unit.phone || ""} placeholder="Telepon" className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm outline-none" />
                    <input type="url" name="link" defaultValue={unit.link || ""} placeholder="Website" className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm outline-none" />
                 </div>
                 <div className="space-y-3">
                    <input type="url" name="facebookUrl" defaultValue={unit.facebookUrl || ""} placeholder="Facebook" className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm outline-none" />
                    <input type="url" name="instagramUrl" defaultValue={unit.instagramUrl || ""} placeholder="Instagram" className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm outline-none" />
                    <input type="url" name="tiktokUrl" defaultValue={unit.tiktokUrl || ""} placeholder="TikTok" className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm outline-none" />
                    <input type="url" name="twitterUrl" defaultValue={unit.twitterUrl || ""} placeholder="Twitter" className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm outline-none" />
                 </div>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-6 z-10">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                <Save size={18} /> Simpan Perubahan
              </h3>
              <button type="submit" disabled={loading} className="w-full bg-maroon-primary text-white py-3 rounded-lg font-bold hover:bg-maroon-dark transition-all disabled:opacity-70 flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" size={20}/> : "Update Data"}
              </button>
            </div>

            {/* THUMBNAIL (PERBAIKAN: Input tetap ada di DOM, hanya hidden) */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2 border-b pb-2">
                <ImageIcon size={18} /> Thumbnail
              </h3>
              <div className="relative">
                {preview && (
                   <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200 group mb-4">
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      <button type="button" onClick={removeImage} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-md z-20"><X size={16} /></button>
                   </div>
                )}
                
                {/* Input Container: Hidden via CSS if preview exists */}
                <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 relative h-40 ${preview ? 'hidden' : 'flex'}`}>
                    <input 
                      ref={fileInputRef} 
                      type="file" 
                      name="image" 
                      accept="image/*" 
                      onChange={handleImageChange} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    />
                    <span className="text-sm font-bold text-gray-600">Ganti Thumbnail</span>
                </div>
              </div>
            </div>

            {/* GALERI */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2 border-b pb-2">
                <Layers size={18} /> Galeri Kegiatan
              </h3>
              
              {/* List Foto Lama */}
              {unit.gallery.length > 0 && (
                <div className="mb-6 space-y-3">
                  <p className="text-xs font-bold text-gray-400">FOTO SAAT INI:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {unit.gallery.map((item) => (
                      <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                        <img src={item.image} alt="Galeri" className="w-full h-full object-cover" />
                        <button 
                             type="button"
                             onClick={() => handleDeleteGallery(item.id)}
                             className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                             title="Hapus Foto Ini"
                           >
                             <Trash2 size={24} className="text-red-400" />
                           </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Foto Baru */}
              <div className={`border-2 border-dashed ${galleryCount > 0 ? 'border-green-400 bg-green-50' : 'border-blue-300 bg-blue-50'} rounded-lg p-6 relative transition-colors`}>
                  <input type="file" name="galleryImages" multiple accept="image/*" onChange={handleGalleryChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                  <div className="flex flex-col items-center justify-center text-center">
                      {galleryCount > 0 ? (
                        <>
                          <CheckCircle2 size={32} className="text-green-600 mb-2" />
                          <p className="text-sm font-bold text-green-800">{galleryCount} Foto Baru</p>
                        </>
                      ) : (
                        <>
                          <Plus size={32} className="text-blue-500 mb-2" />
                          <p className="text-xs font-bold text-blue-800">TAMBAH FOTO</p>
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