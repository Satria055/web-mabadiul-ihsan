"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation"; // Import wajib
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  baseUrl: string;
}

export default function Pagination({ totalPages, currentPage, baseUrl }: PaginationProps) {
  const searchParams = useSearchParams(); // 1. Ambil params saat ini

  const createPageUrl = (page: number) => {
    // 2. Clone params yang ada agar filter (search/kategori/unit) tidak hilang
    const params = new URLSearchParams(searchParams.toString());
    
    // 3. Update halaman
    params.set("page", page.toString());
    
    return `${baseUrl}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {/* Previous Button */}
      <Link
        href={createPageUrl(currentPage - 1)}
        className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 transition-colors ${
          currentPage <= 1 
            ? "text-gray-300 pointer-events-none bg-gray-50" 
            : "text-gray-600 hover:bg-maroon-primary hover:text-white hover:border-maroon-primary bg-white"
        }`}
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeft size={20} />
      </Link>

      {/* Page Numbers (Desktop) */}
      <div className="hidden md:flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={createPageUrl(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm transition-all ${
              page === currentPage
                ? "bg-maroon-primary text-white shadow-md scale-110 border border-maroon-primary"
                : "bg-white text-gray-600 border border-gray-200 hover:border-maroon-primary hover:text-maroon-primary"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>
      
      {/* Mobile Indicator (Teks saja agar hemat tempat) */}
      <span className="md:hidden text-sm font-bold text-gray-500 mx-2">
        {currentPage} / {totalPages}
      </span>

      {/* Next Button */}
      <Link
        href={createPageUrl(currentPage + 1)}
        className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 transition-colors ${
          currentPage >= totalPages 
            ? "text-gray-300 pointer-events-none bg-gray-50" 
            : "text-gray-600 hover:bg-maroon-primary hover:text-white hover:border-maroon-primary bg-white"
        }`}
        aria-disabled={currentPage >= totalPages}
      >
        <ChevronRight size={20} />
      </Link>
    </div>
  );
}