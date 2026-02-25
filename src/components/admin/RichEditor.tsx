// file: src/components/admin/RichEditor.tsx
"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";
import "react-quill-new/dist/quill.snow.css";
import { uploadImage } from "@/actions/uploads"; // Import action baru

// Load Quill tanpa SSR
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function RichEditor({ value, onChange, label }: RichEditorProps) {
  const quillRef = useRef<any>(null);

  // Handler Upload Gambar
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const quill = quillRef.current.getEditor();
        const range = quill.getSelection(true);

        try {
          // Panggil Server Action
          const res = await uploadImage(formData);
          
          if (res.url) {
            quill.insertEmbed(range.index, "image", res.url);
            quill.setSelection(range.index + 1);
          } else {
            alert("Gagal mengupload gambar. Silakan coba lagi.");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Terjadi kesalahan sistem saat upload gambar.");
        }
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "image"], // Tombol Image aktif
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  }), []);

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-bold text-gray-700">{label}</label>}
      <div className="bg-white">
          <ReactQuill
            // @ts-expect-error: Mengabaikan error tipe ref pada ReactQuill
            ref={quillRef}
            theme="snow"
            value={value}
          onChange={onChange}
          modules={modules}
          className="h-96 mb-12"
        />
      </div>
    </div>
  );
}