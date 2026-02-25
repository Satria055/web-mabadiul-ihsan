// file: src/components/admin/SubmitButton.tsx
"use client";

import { useFormStatus } from "react-dom";
import { Save, Loader2 } from "lucide-react";

export default function SubmitButton({ label = "Simpan" }: { label?: string }) {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="bg-maroon-primary text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-maroon-dark transition-colors w-full justify-center shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 size={18} className="animate-spin" /> Menyimpan...
        </>
      ) : (
        <>
          <Save size={18} /> {label}
        </>
      )}
    </button>
  );
}