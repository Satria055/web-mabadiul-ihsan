"use client";

import { updateStat } from "@/actions/stats";
import Link from "next/link";
import { ArrowLeft, Save, Users, School, Trophy, UserCheck, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";

// Tipe data sesuaikan dengan prisma/client jika mau strict, atau any
type Stat = {
  id: number;
  label: string;
  value: number;
  icon: string;
  suffix: string | null;
};

export default function EditStatForm({ stat }: { stat: Stat }) {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await updateStat(stat.id, formData);

    if (result.success) {
      showAlert(result.message, "success");
      setTimeout(() => {
        router.push("/admin/statistik");
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
        <Link href="/admin/statistik" className="flex items-center gap-2 text-gray-500 hover:text-maroon-primary transition-colors">
          <ArrowLeft size={20} /> <span className="font-bold">Kembali</span>
        </Link>
        <h1 className="text-2xl font-serif font-bold text-gray-800">Edit Statistik</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Label Statistik</label>
            <input 
                type="text" 
                name="label" 
                defaultValue={stat.label} 
                required 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none" 
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nilai (Angka)</label>
                <input 
                    type="number" 
                    name="value" 
                    defaultValue={stat.value} 
                    required 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none font-mono font-bold" 
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Suffix (Simbol)</label>
                <input 
                    type="text" 
                    name="suffix" 
                    defaultValue={stat.suffix || ""} 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none" 
                    placeholder="Contoh: + atau %"
                />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Pilih Ikon</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Opsi Icon: Users */}
                <label className="cursor-pointer">
                    <input type="radio" name="icon" value="Users" defaultChecked={stat.icon === "Users"} className="peer sr-only" />
                    <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg peer-checked:border-maroon-primary peer-checked:bg-maroon-primary/5 peer-checked:text-maroon-primary hover:bg-gray-50 transition-all">
                        <Users size={24} className="mb-2" />
                        <span className="text-xs font-medium">Santri/Orang</span>
                    </div>
                </label>

                {/* Opsi Icon: School */}
                <label className="cursor-pointer">
                    <input type="radio" name="icon" value="School" defaultChecked={stat.icon === "School"} className="peer sr-only" />
                    <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg peer-checked:border-maroon-primary peer-checked:bg-maroon-primary/5 peer-checked:text-maroon-primary hover:bg-gray-50 transition-all">
                        <School size={24} className="mb-2" />
                        <span className="text-xs font-medium">Lembaga</span>
                    </div>
                </label>

                {/* Opsi Icon: Trophy */}
                <label className="cursor-pointer">
                    <input type="radio" name="icon" value="Trophy" defaultChecked={stat.icon === "Trophy"} className="peer sr-only" />
                    <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg peer-checked:border-maroon-primary peer-checked:bg-maroon-primary/5 peer-checked:text-maroon-primary hover:bg-gray-50 transition-all">
                        <Trophy size={24} className="mb-2" />
                        <span className="text-xs font-medium">Prestasi</span>
                    </div>
                </label>

                {/* Opsi Icon: UserCheck */}
                <label className="cursor-pointer">
                    <input type="radio" name="icon" value="UserCheck" defaultChecked={stat.icon === "UserCheck"} className="peer sr-only" />
                    <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg peer-checked:border-maroon-primary peer-checked:bg-maroon-primary/5 peer-checked:text-maroon-primary hover:bg-gray-50 transition-all">
                        <UserCheck size={24} className="mb-2" />
                        <span className="text-xs font-medium">Guru/Staff</span>
                    </div>
                </label>
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