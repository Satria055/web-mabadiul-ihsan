"use client";

import { deletePageMeta } from "@/actions/pagemeta";
import { Trash2, Loader2, Check } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeletePageButton({ id }: { id: number }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleDelete = async () => {
    if (confirm("Yakin ingin menghapus halaman ini?")) {
      setStatus("loading");
      try {
        const result = await deletePageMeta(id);

        if (result.success) {
            setStatus("success");
            router.refresh();
            // Reset status setelah 2 detik (opsional, karena barisnya biasanya hilang/refresh)
            setTimeout(() => setStatus("idle"), 2000);
        } else {
            alert(result.message); // Kalau error tetap pakai alert biasa agar terbaca
            setStatus("idle");
        }
      } catch (error) {
        alert("Gagal menghapus data.");
        setStatus("idle");
      }
    }
  };

  if (status === "success") {
    return (
      <span className="text-green-600 text-xs font-bold flex items-center gap-1 px-2 py-1 bg-green-50 rounded">
        <Check size={14} /> Terhapus
      </span>
    );
  }

  return (
    <button
      onClick={handleDelete}
      disabled={status === "loading"}
      className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
      title="Hapus Halaman"
    >
      {status === "loading" ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Trash2 size={18} />
      )}
    </button>
  );
}