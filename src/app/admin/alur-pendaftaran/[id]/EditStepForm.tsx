"use client";

import { updateStep } from "@/actions/registration";
import Link from "next/link";
import { ArrowLeft, ClipboardList, UserCheck, Megaphone, CheckCircle2, FileText, Banknote, Shirt, CalendarCheck, Save, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";

// Pilihan Icon
const icons = [
  { val: "ClipboardList", label: "Formulir", icon: ClipboardList },
  { val: "UserCheck", label: "Wawancara", icon: UserCheck },
  { val: "Megaphone", label: "Pengumuman", icon: Megaphone },
  { val: "CheckCircle2", label: "Selesai", icon: CheckCircle2 },
  { val: "FileText", label: "Dokumen", icon: FileText },
  { val: "Banknote", label: "Pembayaran", icon: Banknote },
  { val: "Shirt", label: "Seragam", icon: Shirt },
  { val: "CalendarCheck", label: "Jadwal", icon: CalendarCheck },
];

export default function EditStepForm({ step }: { step: any }) {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await updateStep(step.id, formData);

    if (result.success) {
      showAlert(result.message, "success");
      setTimeout(() => {
        router.push("/admin/alur-pendaftaran");
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
        <Link href="/admin/alur-pendaftaran" className="flex items-center gap-2 text-gray-500 hover:text-maroon-primary transition-colors">
          <ArrowLeft size={20} /> <span className="font-bold">Kembali</span>
        </Link>
        <h1 className="text-2xl font-serif font-bold text-gray-800">Edit Tahapan</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-4 gap-6">
             <div className="col-span-3">
                <label className="block text-sm font-bold text-gray-700 mb-2">Judul Tahapan</label>
                <input type="text" name="title" defaultValue={step.title} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none" />
             </div>
             <div className="col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-2">Urutan</label>
                <input type="number" name="order" defaultValue={step.order} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none text-center font-bold" />
             </div>
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi Singkat</label>
             <textarea name="description" defaultValue={step.description} required rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary outline-none"></textarea>
          </div>

          {/* Icon Picker */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Pilih Ikon</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {icons.map((item) => (
                    <label key={item.val} className="cursor-pointer">
                        <input type="radio" name="icon" value={item.val} defaultChecked={step.icon === item.val} className="peer sr-only" />
                        <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg peer-checked:border-maroon-primary peer-checked:bg-maroon-primary/5 peer-checked:text-maroon-primary hover:bg-gray-50 transition-all">
                            <item.icon size={24} className="mb-2" />
                            <span className="text-xs font-medium">{item.label}</span>
                        </div>
                    </label>
                ))}
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