"use client";

import { updateUser } from "@/actions/user";
import Link from "next/link";
import { ArrowLeft, User, Shield, Key, Save, Loader2, AtSign } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";

export default function EditUserForm({ user }: { user: any }) {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await updateUser(user.id, formData);

    if (result.success) {
      showAlert(result.message, "success");
      setTimeout(() => {
        router.push("/admin/users");
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
        <Link href="/admin/users" className="flex items-center gap-2 text-gray-500 hover:text-maroon-primary transition-colors">
          <ArrowLeft size={20} /> <span className="font-bold">Kembali</span>
        </Link>
        <h1 className="text-2xl font-serif font-bold text-gray-800">Edit User</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
             <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <User size={16} /> Nama Lengkap
             </label>
             <input type="text" name="name" defaultValue={user.name || ""} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none" />
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <AtSign size={16} /> Username
             </label>
             <input type="text" name="username" defaultValue={user.username} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none" />
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
             <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Key size={16} /> Password Baru (Opsional)
             </label>
             <input type="password" name="password" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none bg-white" placeholder="Kosongkan jika tidak ingin mengganti password" />
             <p className="text-xs text-yellow-700 mt-2">Isi kolom ini hanya jika Anda ingin mereset password user ini.</p>
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Shield size={16} /> Role / Peran
             </label>
             <select name="role" defaultValue={user.role} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none bg-white">
                <option value="admin">Administrator</option>
                <option value="editor">Editor</option>
             </select>
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