"use client";

import { updatePartner } from "@/actions/partners";
import Link from "next/link";
import { ArrowLeft, Building2, Globe, Image as ImageIcon, ListOrdered, Loader2, Save } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";
import { Partner } from "@prisma/client"; // Pastikan import tipe ini ada, atau pakai 'any' sementara

export default function EditPartnerForm({ partner }: { partner: any }) {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(partner.logo);
  const [isImageRemoved, setIsImageRemoved] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setPreview(URL.createObjectURL(file));
        setIsImageRemoved(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await updatePartner(partner.id, formData);

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
        <h1 className="text-2xl font-serif font-bold text-gray-800">Edit Mitra</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="removeImage" value={isImageRemoved.toString()} />
          
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-3">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Building2 size={16} /> Nama Instansi
                </label>
                <input type="text" name="name" defaultValue={partner.name} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none" />
            </div>
            
            <div className="col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <ListOrdered size={16} /> Urutan
                </label>
                <input 
                  type="number" 
                  name="order" 
                  defaultValue={partner.order} 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none font-bold text-center" 
                />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Globe size={16} /> Website
            </label>
            <input type="url" name="website" defaultValue={partner.website || ""} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none" />
          </div>

          {/* Upload Logo */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <ImageIcon size={16} /> Logo Mitra
            </label>
            <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-center relative h-40`}>
                <input type="file" name="logo" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                {preview ? (
                    <img src={preview} alt="Preview" className="h-full object-contain" />
                ) : (
                    <div className="flex flex-col items-center text-gray-400">
                        <ImageIcon size={32} className="mb-2" />
                        <span className="text-sm font-bold">Ganti Logo</span>
                    </div>
                )}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
             <button type="submit" disabled={loading} className="w-full bg-maroon-primary text-white py-3 rounded-lg font-bold hover:bg-maroon-dark transition-all disabled:opacity-70 flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" size={20}/> : "Simpan Perubahan"}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}