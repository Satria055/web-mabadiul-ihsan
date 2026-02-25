"use client";
import { markAsRead } from "@/actions/contact";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MarkReadButton({ id }: { id: number }) {
  const router = useRouter();
  const handleRead = async () => {
    await markAsRead(id);
    router.refresh();
  };
  
  return (
    <button onClick={handleRead} className="text-xs font-bold text-green-600 hover:bg-green-50 px-3 py-2 rounded-lg flex items-center gap-1 transition-colors">
      <CheckCircle size={14} /> Tandai Dibaca
    </button>
  );
}