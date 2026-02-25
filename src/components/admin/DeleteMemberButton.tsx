"use client";

import { deleteMember } from "@/actions/organization";
import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";

export default function DeleteMemberButton({ id }: { id: number }) {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirm("Yakin ingin menghapus pengurus ini?")) {
      setLoading(true);
      const result = await deleteMember(id);
      
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
      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      title="Hapus Pengurus"
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
}