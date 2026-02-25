import { prisma } from "@/lib/prisma";
import { Mail, Trash2, CheckCircle, Clock } from "lucide-react";
import DeleteMessageButton from "@/components/admin/DeleteMessageButton"; // Kita buat sebentar lagi
import MarkReadButton from "@/components/admin/MarkReadButton"; // Kita buat sebentar lagi

export default async function AdminPesanPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-gray-800">Kotak Masuk (Inbox)</h1>
        <p className="text-gray-500 text-sm">Daftar pesan dari formulir kontak website.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {messages.length === 0 ? (
           <div className="text-center py-20">
              <Mail className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500">Belum ada pesan masuk.</p>
           </div>
        ) : (
           <div className="divide-y divide-gray-100">
              {messages.map((msg) => (
                 <div key={msg.id} className={`p-6 hover:bg-gray-50 transition-colors ${!msg.isRead ? 'bg-blue-50/50' : ''}`}>
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-3">
                       <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${!msg.isRead ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                          <h3 className="font-bold text-gray-800">{msg.name}</h3>
                          <span className="text-xs text-gray-400">&bull;</span>
                          <span className="text-sm text-gray-500">{msg.email}</span>
                       </div>
                       <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Clock size={14} />
                          {new Date(msg.createdAt).toLocaleDateString("id-ID", { 
                             day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' 
                          })}
                       </div>
                    </div>
                    
                    <h4 className="font-bold text-maroon-primary text-sm mb-2">{msg.subject}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line mb-4">
                       {msg.message}
                    </p>

                    <div className="flex items-center gap-3 justify-end">
                       {!msg.isRead && <MarkReadButton id={msg.id} />}
                       <a href={`mailto:${msg.email}`} className="text-xs font-bold text-blue-600 hover:underline px-3 py-2 bg-blue-50 rounded-lg">
                          Balas Email
                       </a>
                       <DeleteMessageButton id={msg.id} />
                    </div>
                 </div>
              ))}
           </div>
        )}
      </div>
    </div>
  );
}