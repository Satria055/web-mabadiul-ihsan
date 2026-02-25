"use client";

import Link from "next/link";
import { Edit, ExternalLink } from "lucide-react";
import { EducationUnit } from "@prisma/client";
import DeleteUnitButton from "@/components/admin/DeleteUnitButton"; // IMPORT BARU

type Props = {
  units: EducationUnit[];
};

export default function AdminEducationList({ units }: Props) {
  return (
    <div>
      {units.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> 
          {units.map((unit) => (
            <div key={unit.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 group">
              
              <div className="h-40 w-full bg-gray-100 relative border-b border-gray-100 overflow-hidden">
                <img 
                  src={unit.image || "https://placehold.co/600x400?text=No+Image"} 
                  alt={unit.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-2 left-2">
                   <span className="bg-white/95 backdrop-blur text-maroon-primary text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-gray-100 uppercase tracking-wide">
                      {unit.category}
                   </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-maroon-primary transition-colors" title={unit.name}>
                    {unit.name}
                </h3>
                <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed flex-grow">
                  {unit.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                  {unit.link ? (
                    <a href={unit.link} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded-md">
                      <ExternalLink size={12} /> Website
                    </a>
                  ) : (
                    <span className="text-[11px] text-gray-400 cursor-not-allowed flex items-center gap-1 px-2 py-1">
                      <ExternalLink size={12} /> -
                    </span>
                  )}

                  <div className="flex items-center gap-1">
                    <Link href={`/admin/pendidikan/${unit.id}`} className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all p-2 rounded-lg" title="Edit">
                      <Edit size={16} />
                    </Link>
                    
                    {/* TOMBOL DELETE BARU */}
                    <DeleteUnitButton id={unit.id} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 font-medium">Tidak ada unit pendidikan yang ditemukan.</p>
        </div>
      )}
    </div>
  );
}