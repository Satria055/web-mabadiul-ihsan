"use client";

import { deletePartner } from "@/actions/partners";
import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";

export default function DeletePartnerButton({ id }: { id: number }) {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (confirm("Yakin ingin menghapus mitra ini?")) {
      setIsDeleting(true);
      try {
        const result = await deletePartner(id);

        if (result.success) {
          showAlert(result.message, "success");
          
          // Tunggu 2 detik baru refresh tabel
          setTimeout(() => {
            router.refresh(); 
          }, 2000); 

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