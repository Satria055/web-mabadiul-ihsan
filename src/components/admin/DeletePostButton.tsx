"use client";

import { deletePost } from "@/actions/posts";
import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext"; // Import Hook Global

export default function DeletePostButton({ id }: { id: number }) {
  const router = useRouter();
  const { showAlert } = useAlert(); // Panggil fungsi global
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (confirm("Yakin ingin menghapus berita ini secara permanen?")) {
      setIsDeleting(true);
      try {
        const result = await deletePost(id);

        if (result.success) {
          // 1. Panggil Alert Global (Dia tidak akan mati meski komponen ini mati)
          showAlert(result.message, "success");
          
          // 2. Refresh Halaman
          router.refresh(); 
          
          // Tidak perlu setTimeout lama-lama, karena Alert-nya hidup di Layout luar
        } else {
          showAlert(result.message, "error");
          setIsDeleting(false);
        }
      } catch (error) {
        showAlert("Gagal menghapus data.", "error");
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      title="Hapus"
    >
      {isDeleting ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Trash2 size={18} />
      )}
    </button>
  );
}