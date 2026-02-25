"use client";

import { updateMember } from "@/actions/organization";
import Link from "next/link";
import { ArrowLeft, User, Briefcase, Upload, Save, Loader2, ListOrdered } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";

export default function EditMemberForm({ member }: { member: any }) {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(member.image);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await updateMember(member.id, formData);

    if (result.success) {
      showAlert(result.message, "success");
      setTimeout(() => {
        router.push("/admin/struktur");
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
        <Link href="/admin/struktur" className="flex items-center gap-2 text-gray-500 hover:text-maroon-primary transition-colors">
          <ArrowLeft size={20} /> <span className="font-bold">Kembali</span>
        </Link>
        <h1 className="text-2xl font-serif font-bold text-gray-800">Edit Pengurus</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="flex justify-center mb-6">
             <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full overflow-hidden border-4 border-white shadow-md relative mb-3 group">
                   {preview ? (
                     <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-gray-400"><User size={48} /></div>
                   )}
                   <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Upload className="text-white" size={24} />
                      <input type="file" name="image" accept="image/*" onChange={handleImageChange} className="hidden" />
                   </label>
                </div>
                <p className="text-xs text-gray-500">Klik untuk ganti foto</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><User size={16} /> Nama Lengkap</label>
                <input type="text" name="name" defaultValue={member.name} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none" />
             </div>
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Briefcase size={16} /> Jabatan</label>
                <input type="text" name="position" defaultValue={member.position} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none" />
             </div>
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><ListOrdered size={16} /> Urutan Tampil</label>
             <input type="number" name="order" defaultValue={member.order} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none" />
          </div>

          <div className="pt-6 border-t border-gray-100">
             <button type="submit" disabled={loading} className="w-full bg-maroon-primary text-white py-3 rounded-lg font-bold hover:bg-maroon-dark transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-md">
                {loading ? <Loader2 className="animate-spin" size={20}/> : <><Save size={18}/> Simpan Perubahan</>}
             </button>
          </div>

        </form>
      </div>
    </div>
  );
}