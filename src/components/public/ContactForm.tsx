"use client";

import { submitContactForm } from "@/actions/contact";
import { Send, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { useAlert } from "@/context/AlertContext"; // Pastikan Anda punya context ini

export default function ContactForm() {
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);

    if (result.success) {
      showAlert(result.message, "success");
      formRef.current?.reset(); // Reset form jika sukses
    } else {
      showAlert(result.message, "error");
    }
    setLoading(false);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Nama Lengkap *</label>
            <input type="text" name="name" required placeholder="Nama Anda" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-maroon-primary focus:ring-1 focus:ring-maroon-primary outline-none transition-colors bg-gray-50 focus:bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Email *</label>
            <input type="email" name="email" required placeholder="email@contoh.com" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-maroon-primary focus:ring-1 focus:ring-maroon-primary outline-none transition-colors bg-gray-50 focus:bg-white" />
          </div>
       </div>

       <div>
          <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Subjek Pesan</label>
          <input type="text" name="subject" placeholder="Contoh: Informasi Pendaftaran" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-maroon-primary focus:ring-1 focus:ring-maroon-primary outline-none transition-colors bg-gray-50 focus:bg-white" />
       </div>

       <div>
          <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Isi Pesan *</label>
          <textarea name="message" rows={5} required placeholder="Tulis pesan Anda di sini..." className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-maroon-primary focus:ring-1 focus:ring-maroon-primary outline-none transition-colors bg-gray-50 focus:bg-white"></textarea>
       </div>

       <button type="submit" disabled={loading} className="w-full md:w-auto px-8 py-4 bg-maroon-primary text-white font-bold rounded-lg shadow-lg hover:bg-maroon-dark transition-all disabled:opacity-70 flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" size={20}/> : <><Send size={18} /> Kirim Pesan</>}
       </button>
    </form>
  );
}