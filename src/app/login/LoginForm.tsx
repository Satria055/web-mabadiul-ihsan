"use client";

import { loginAction } from "@/actions/auth";
import { Loader2, LogIn } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";

export default function LoginForm() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    if (result.success) {
      showAlert("Login Berhasil! Mengalihkan...", "success");
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1000);
    } else {
      showAlert(result.message || "Gagal login", "error");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        {/* TAMBAHAN: htmlFor */}
        <label 
          htmlFor="username" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Username
        </label>
        <input 
          id="username"
          type="text" 
          name="username"
          autoComplete="username"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary focus:border-maroon-primary outline-none transition-all"
          placeholder="Masukkan username"
        />
      </div>
      
      <div>
        {/* TAMBAHAN: htmlFor */}
        <label 
          htmlFor="password" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input 
          id="password"
          type="password" 
          name="password"
          autoComplete="current-password"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maroon-primary focus:border-maroon-primary outline-none transition-all"
          placeholder="••••••••"
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-maroon-primary text-white font-bold py-3 rounded-lg hover:bg-maroon-dark transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 className="animate-spin" size={20} /> : <><LogIn size={20} /> Masuk Dashboard</>}
      </button>
    </form>
  );
}