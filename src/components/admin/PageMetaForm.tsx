"use client";

import { createPageMeta, updatePageMeta } from "@/actions/pagemeta";
import { useState } from "react";
import { Save, Loader2, Image as ImageIcon, ArrowLeft, AlertCircle } from "lucide-react";
import { PageMeta } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Alert from "@/components/ui/Alert"; // Import Alert Baru

export default function PageMetaForm({ data }: { data?: PageMeta }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(data?.image || null);
  
  // State untuk Alert
  const [alertState, setAlertState] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      let result;
      if (data) {
        result = await updatePageMeta(data.id, formData);
      } else {
        result = await createPageMeta(formData);
      }

      if (result.success) {
        // Tampilkan Alert Sukses
        setAlertState({ show: true, type: "success", message: result.message });
        
        // Redirect setelah 1.5 detik agar user sempat baca alert
        setTimeout(() => {
            router.push("/admin/halaman");
            router.refresh();
        }, 1500);
      } else {
        setAlertState({ show: true, type: "error", message: result.message });
      }

    } catch (error) {
      console.error(error);
      setAlertState({ show: true, type: "error", message: "Terjadi kesalahan sistem." });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {/* Panggil Komponen Alert Disini */}
      <Alert 
        isVisible={alertState.show} 
        type={alertState.type} 
        message={alertState.message} 
        onClose={() => setAlertState({ ...alertState, show: false })}
      />

      <form onSubmit={handleSubmit} className="pb-20">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
             <Link href="/admin/halaman" className="text-gray-500 hover:text-maroon-primary text-sm font-bold flex items-center gap-1 mb-2">
                <ArrowLeft size={16}/> Kembali
             </Link>
             <h1 className="text-2xl font-serif font-bold text-gray-800">
               {data ? `Edit Halaman: /${data.slug}` : "Buat Halaman Baru"}
             </h1>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-maroon-primary text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-maroon-dark transition-all disabled:opacity-70 shadow-lg shadow-maroon-primary/20"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {data ? "Simpan Perubahan" : "Publikasikan Halaman"}
          </button>
        </div>

        {/* ... (SISA KODE FORM SAMA SEPERTI SEBELUMNYA, TIDAK PERLU DIUBAH) ... */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Informasi Halaman</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Slug (URL)</label>
                        <div className="flex items-center">
                        <span className="bg-gray-100 text-gray-500 px-3 py-2.5 border border-r-0 border-gray-300 rounded-l-lg text-sm font-mono">domain.com/</span>
                        <input 
                            type="text" 
                            name="slug"
                            defaultValue={data?.slug || ""}
                            readOnly={!!data}
                            placeholder="contoh: kontak" 
                            className={`w-full px-4 py-2.5 border border-gray-300 rounded-r-lg outline-none font-mono text-sm ${data ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'focus:ring-2 focus:ring-maroon-primary'}`} 
                        />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Judul Utama (Header) <span className="text-red-500">*</span></label>
                        <input type="text" name="title" defaultValue={data?.title || ""} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary focus:border-maroon-primary outline-none transition-all"/>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Deskripsi Singkat / Sub-Judul</label>
                        <textarea name="description" rows={3} defaultValue={data?.description || ""} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary focus:border-maroon-primary outline-none transition-all"/>
                    </div>
                </div>
            </div>
            </div>
            <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Gambar Banner</h3>
                <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-300 relative mb-4 group">
                    {preview ? (
                        <>
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-xs font-bold">Ganti Gambar</span>
                        </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <ImageIcon size={32} />
                        <span className="text-xs mt-2">Belum ada gambar</span>
                        </div>
                    )}
                </div>
                <label className="block">
                    <input type="file" name="image" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-maroon-primary/10 file:text-maroon-primary hover:file:bg-maroon-primary/20 cursor-pointer"/>
                </label>
            </div>
            </div>
        </div>
      </form>
    </>
  );
}