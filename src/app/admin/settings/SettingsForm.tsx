"use client";

import { updateSiteConfig } from "@/actions/settings";
import { Layout, Phone, Globe, Save, Loader2, Upload, BookOpen, ImageIcon, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";

export default function SettingsForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  
  // Previews
  const [logoPreview, setLogoPreview] = useState(initialData?.logoUrl);
  const [profilePreview, setProfilePreview] = useState(initialData?.profileImage);
  const [chairmanPreview, setChairmanPreview] = useState(initialData?.chairmanImage);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setPreview: any) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await updateSiteConfig(formData);

    if (result.success) {
      showAlert(result.message, "success");
      router.refresh(); 
    } else {
      showAlert(result.message, "error");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* TABS HEADER */}
      <div className="flex border-b border-gray-100 bg-gray-50 overflow-x-auto">
          <button type="button" onClick={() => setActiveTab("general")} className={`px-6 py-4 text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'general' ? 'bg-white text-maroon-primary border-t-2 border-t-maroon-primary' : 'text-gray-500 hover:text-gray-700'}`}><Layout size={18} /> Hero & Identitas</button>
          <button type="button" onClick={() => setActiveTab("profile")} className={`px-6 py-4 text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'profile' ? 'bg-white text-maroon-primary border-t-2 border-t-maroon-primary' : 'text-gray-500 hover:text-gray-700'}`}><BookOpen size={18} /> Profil Lembaga</button>
          <button type="button" onClick={() => setActiveTab("contact")} className={`px-6 py-4 text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'contact' ? 'bg-white text-maroon-primary border-t-2 border-t-maroon-primary' : 'text-gray-500 hover:text-gray-700'}`}><Phone size={18} /> Kontak & Footer</button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        
        {/* === TAB 1: HERO & IDENTITAS === */}
        <div className={activeTab === 'general' ? 'block' : 'hidden'}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Nama Website</label>
                      <input type="text" name="siteName" defaultValue={initialData?.siteName} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" />
                  </div>
                  <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Upload Logo</label>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 border rounded-lg p-2 flex items-center justify-center bg-gray-50 overflow-hidden relative">
                           {logoPreview ? <img src={logoPreview} className="object-contain w-full h-full" alt="Logo" /> : <span className="text-xs text-gray-400">No Logo</span>}
                        </div>
                        <label className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm">
                           <Upload size={16} /> Ganti Logo
                           <input type="file" name="logoUrl" accept="image/*" onChange={(e) => handleFileChange(e, setLogoPreview)} className="hidden" />
                        </label>
                      </div>
                  </div>
              </div>
              <hr className="border-gray-100" />
              <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Judul Utama (Hero)</label>
                  <textarea name="heroTitle" rows={2} defaultValue={initialData?.heroTitle} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none font-bold"></textarea>
              </div>
              <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Sub-Judul (Hero)</label>
                  <textarea name="heroSubtitle" rows={3} defaultValue={initialData?.heroSubtitle} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"></textarea>
              </div>
              {/* Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div><label className="block text-xs font-bold text-gray-500 mb-1">Link Pendaftaran</label><input type="text" name="registrationUrl" defaultValue={initialData?.registrationUrl} className="w-full px-3 py-2 rounded border border-gray-300 text-sm focus:outline-none" /></div>
                  <div><label className="block text-xs font-bold text-gray-500 mb-1">Link Video</label><input type="text" name="videoUrl" defaultValue={initialData?.videoUrl} className="w-full px-3 py-2 rounded border border-gray-300 text-sm focus:outline-none" /></div>
                  <div><label className="block text-xs font-bold text-gray-500 mb-1">Link Brosur</label><input type="text" name="brosurUrl" defaultValue={initialData?.brosurUrl} className="w-full px-3 py-2 rounded border border-gray-300 text-sm focus:outline-none" /></div>
              </div>
            </div>
        </div>

        {/* === TAB 2: PROFIL LEMBAGA (UPDATE) === */}
        <div className={activeTab === 'profile' ? 'block' : 'hidden'}>
            <div className="space-y-8">
                
                {/* 1. SEJARAH & GAMBAR GEDUNG */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                   <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-200 pb-2">
                      <BookOpen size={18} /> Sejarah & Identitas
                   </h3>
                   <div className="flex flex-col md:flex-row gap-6 items-start mb-4">
                      <div className="w-full md:w-40 aspect-video md:aspect-square bg-white rounded-lg border border-gray-300 overflow-hidden relative shadow-sm shrink-0">
                         {profilePreview ? <img src={profilePreview} className="w-full h-full object-cover" alt="Gedung" /> : <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Foto Gedung</div>}
                      </div>
                      <div className="flex-1 w-full">
                         <label className="block text-xs font-bold text-gray-500 mb-1">FOTO PROFIL / GEDUNG (Tampil di sebelah sejarah)</label>
                         <label className="cursor-pointer bg-white border border-gray-300 px-3 py-2 rounded text-xs font-bold inline-flex items-center gap-2 mb-3">
                            <Upload size={14} /> Upload Foto
                            <input type="file" name="profileImage" accept="image/*" onChange={(e) => handleFileChange(e, setProfilePreview)} className="hidden" />
                         </label>
                         <textarea name="history" rows={6} defaultValue={initialData?.history} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none text-sm leading-relaxed" placeholder="Tuliskan sejarah singkat..."></textarea>
                      </div>
                   </div>
                </div>

                {/* 2. SAMBUTAN KETUA (BARU) */}
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                   <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2 border-b border-blue-200 pb-2">
                      <User size={18} /> Sambutan Ketua Yayasan
                   </h3>
                   <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="w-32 h-40 bg-white rounded-lg border border-blue-200 overflow-hidden relative shadow-sm shrink-0 mx-auto md:mx-0">
                         {chairmanPreview ? <img src={chairmanPreview} className="w-full h-full object-cover" alt="Ketua" /> : <div className="w-full h-full flex items-center justify-center text-blue-300 text-xs text-center p-2">Foto Ketua</div>}
                      </div>
                      <div className="flex-1 w-full">
                         <label className="block text-xs font-bold text-blue-700 mb-1">FOTO KETUA (Tampil di bawah sejarah)</label>
                         <label className="cursor-pointer bg-white border border-blue-300 text-blue-700 px-3 py-2 rounded text-xs font-bold inline-flex items-center gap-2 mb-3">
                            <Upload size={14} /> Upload Foto
                            <input type="file" name="chairmanImage" accept="image/*" onChange={(e) => handleFileChange(e, setChairmanPreview)} className="hidden" />
                         </label>
                         <textarea name="greeting" rows={6} defaultValue={initialData?.greeting} className="w-full px-4 py-3 rounded-lg border border-blue-200 outline-none text-sm leading-relaxed" placeholder="Kata sambutan ketua yayasan..."></textarea>
                      </div>
                   </div>
                </div>

                {/* 3. VISI MISI */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div><label className="block text-sm font-bold text-gray-700 mb-2">Visi</label><textarea name="vision" rows={6} defaultValue={initialData?.vision} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" placeholder="Visi..."></textarea></div>
                   <div><label className="block text-sm font-bold text-gray-700 mb-2">Misi</label><textarea name="mission" rows={6} defaultValue={initialData?.mission} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" placeholder="Misi..."></textarea></div>
                </div>
            </div>
        </div>

        {/* === TAB 3: KONTAK === */}
        <div className={activeTab === 'contact' ? 'block' : 'hidden'}>
            <div className="space-y-6">
               <textarea name="address" rows={3} defaultValue={initialData?.address} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" placeholder="Alamat lengkap"></textarea>
               <div className="grid grid-cols-2 gap-6">
                  <input type="text" name="phone" defaultValue={initialData?.phone} placeholder="Telepon" className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" />
                  <input type="email" name="email" defaultValue={initialData?.email} placeholder="Email" className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" />
               </div>
               <div className="space-y-3">
                    <input type="text" name="facebook" defaultValue={initialData?.facebook} placeholder="URL Facebook" className="w-full px-3 py-2 rounded border border-gray-300" />
                    <input type="text" name="instagram" defaultValue={initialData?.instagram} placeholder="URL Instagram" className="w-full px-3 py-2 rounded border border-gray-300" />
                    <input type="text" name="youtube" defaultValue={initialData?.youtube} placeholder="URL Youtube" className="w-full px-3 py-2 rounded border border-gray-300" />
               </div>
            </div>
        </div>

        <div className="pt-6 border-t border-gray-100">
            <button type="submit" disabled={loading} className="w-full bg-maroon-primary text-white py-3 rounded-lg font-bold hover:bg-maroon-dark transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-md">
                {loading ? <Loader2 className="animate-spin" size={20}/> : <><Save size={18}/> Simpan Konfigurasi</>}
            </button>
        </div>

      </form>
    </div>
  );
}