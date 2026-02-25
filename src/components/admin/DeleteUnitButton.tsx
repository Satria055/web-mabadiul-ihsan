"use client";

import { deleteEducationUnit } from "@/actions/education";
import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";

export default function DeleteUnitButton({ id }: { id: number }) {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm("Yakin ingin menghapus unit pendidikan ini beserta seluruh galerinya?")) {
      setIsDeleting(true);
      try {
        const result = await deleteEducationUnit(id);
        if (result.success) {
          showAlert(result.message, "success");
          setTimeout(() => { router.refresh(); }, 2000);
        } else {
          showAlert(result.message, "error");
          setIsDeleting(false);
        }
      } catch (error) {
        showAlert("Terjadi kesalahan.", "error");
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all p-2 rounded-lg"
      title="Hapus Unit"
    >
      {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
}