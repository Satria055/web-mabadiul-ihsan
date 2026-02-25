"use client";

import { createUser } from "@/actions/user";
import Link from "next/link";
import { ArrowLeft, User, Shield, Key, Save, Loader2, AtSign } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";

export default function TambahUserPage() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await createUser(formData);

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
        <h1 className="text-2xl font-serif font-bold text-gray-800">Tambah User Baru</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
             <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <User size={16} /> Nama Lengkap
             </label>
             <input type="text" name="name" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none" placeholder="Contoh: Admin Yayasan" />
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <AtSign size={16} /> Username (Untuk Login)
             </label>
             <input type="text" name="username" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none" placeholder="Contoh: admin_mabadi" />
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Key size={16} /> Password
             </label>
             <input type="password" name="password" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none" placeholder="******" />
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Shield size={16} /> Role / Peran
             </label>
             <select name="role" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none bg-white">
                <option value="admin">Administrator (Akses Penuh)</option>
                <option value="editor">Editor (Terbatas)</option>
             </select>
          </div>

          <div className="pt-6 border-t border-gray-100">
             <button type="submit" disabled={loading} className="w-full bg-maroon-primary text-white py-3 rounded-lg font-bold hover:bg-maroon-dark transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-md">
                {loading ? <Loader2 className="animate-spin" size={20}/> : <><Save size={18}/> Simpan User</>}
             </button>
          </div>

        </form>
      </div>
    </div>
  );
}