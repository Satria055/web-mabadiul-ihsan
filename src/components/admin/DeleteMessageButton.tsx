"use client";
import { deleteMessage } from "@/actions/contact";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";

export default function DeleteMessageButton({ id }: { id: number }) {
  const router = useRouter();
  const { showAlert } = useAlert();

  const handleDelete = async () => {
    if(confirm("Hapus pesan ini selamanya?")) {
      await deleteMessage(id);
      showAlert("Pesan dihapus", "success");
      router.refresh();
    }
  };
  
  return (
    <button onClick={handleDelete} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors" title="Hapus Pesan">
      <Trash2 size={16} />
    </button>
  );
}