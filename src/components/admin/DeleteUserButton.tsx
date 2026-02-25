"use client";

import { deleteUser } from "@/actions/user";
import { Trash2, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";

export default function DeleteUserButton({ id }: { id: number }) {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  // Proteksi UI: Jika ID 1, tampilkan icon gembok (terkunci)
  if (id === 1) {
    return (
      <button disabled className="p-2 text-gray-300 cursor-not-allowed" title="Admin Utama tidak bisa dihapus">
        <Lock size={16} />
      </button>
    );
  }

  const handleDelete = async () => {
    if (confirm("Yakin ingin menghapus user ini? Akses login akan hilang.")) {
      setLoading(true);
      const result = await deleteUser(id);
      
      if (result.success) {
        showAlert(result.message, "success");
        router.refresh();
      } else {
        showAlert(result.message, "error");
        setLoading(false);
      }
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={loading} 
      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      title="Hapus User"
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
}