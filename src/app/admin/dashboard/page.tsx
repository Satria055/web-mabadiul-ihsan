import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { 
  FileText, Trophy, MessageSquare, Users, 
  ArrowRight, Plus, Activity, Mail, LayoutDashboard, 
  School
} from "lucide-react";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export default async function DashboardPage() {
  // 1. Ambil Session User & Role dari Token
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  
  // Default Value (jika token tidak terbaca)
  let user = {
    name: "User",
    role: "Administrator"
  };

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "rahasia-negara-mabadiul-ihsan-2026");
      const { payload } = await jwtVerify(token, secret);
      
      // Update data dari token
      if (payload.name) user.name = payload.name as string;
      if (payload.role) user.role = payload.role as string;
      
    } catch (err) {
      console.error("Token verification failed:", err);
    }
  }

  // 2. Ambil Data Statistik Database
  const [
    totalBerita,
    totalPrestasi,
    totalTestimoni,
    unreadMessages,
    recentMessages,
    statsManual
  ] = await Promise.all([
    prisma.post.count(),
    prisma.achievement.count(),
    prisma.testimonial.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.contactMessage.findMany({ 
      take: 5, 
      orderBy: { createdAt: 'desc' } 
    }),
    prisma.stat.findMany({ orderBy: { id: 'asc' } })
  ]);

  return (
    <div className="pb-20">
      {/* HEADER DINAMIS (UPDATED: Halo, Role, Nama) */}
      <div className="mb-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800 flex flex-wrap items-center gap-2">
            Halo, <span className="text-maroon-primary capitalize">{user.role}</span>, {user.name}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Berikut adalah ringkasan aktivitas website sekolah hari ini.
          </p>
        </div>
        <div className="text-right hidden md:block">
           <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Hari ini</p>
           <p className="text-sm font-bold text-gray-700">
             {new Date().toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
           </p>
        </div>
      </div>

      {/* 1. STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Card Pesan */}
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden">
           {unreadMessages > 0 && <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full m-3 animate-ping"></div>}
           <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${unreadMessages > 0 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'}`}>
                 <Mail size={24} />
              </div>
           </div>
           <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Pesan Masuk</p>
              <div className="flex items-end gap-2">
                 <h3 className="text-3xl font-bold text-gray-800">{unreadMessages}</h3>
                 <span className="text-xs text-gray-400 mb-1 font-medium">belum dibaca</span>
              </div>
           </div>
        </div>

        {/* Card Berita */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
           <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                 <FileText size={24} />
              </div>
           </div>
           <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Artikel</p>
              <h3 className="text-3xl font-bold text-gray-800">{totalBerita}</h3>
           </div>
        </div>

        {/* Card Prestasi */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
           <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
                 <Trophy size={24} />
              </div>
           </div>
           <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Prestasi</p>
              <h3 className="text-3xl font-bold text-gray-800">{totalPrestasi}</h3>
           </div>
        </div>

        {/* Card Testimoni */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
           <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                 <Users size={24} />
              </div>
           </div>
           <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Testimoni</p>
              <h3 className="text-3xl font-bold text-gray-800">{totalTestimoni}</h3>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. KOLOM KIRI */}
        <div className="lg:col-span-2 space-y-8">
           
           {/* Akses Cepat */}
           <div className="bg-maroon-dark rounded-2xl p-8 shadow-lg text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
              
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 relative z-10">
                <LayoutDashboard size={20} className="text-gold-primary" /> Shortcut Admin
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
                <Link href="/admin/berita/tambah" className="group bg-white/10 hover:bg-gold-primary hover:text-maroon-dark backdrop-blur-sm p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-sm font-bold transition-all border border-white/5 hover:border-transparent">
                   <div className="p-2 bg-white/10 rounded-full group-hover:bg-maroon-dark/10"><Plus size={18} /></div>
                   <span>Tulis Berita</span>
                </Link>
                <Link href="/admin/prestasi/tambah" className="group bg-white/10 hover:bg-gold-primary hover:text-maroon-dark backdrop-blur-sm p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-sm font-bold transition-all border border-white/5 hover:border-transparent">
                   <div className="p-2 bg-white/10 rounded-full group-hover:bg-maroon-dark/10"><Trophy size={18} /></div>
                   <span>Tambah Prestasi</span>
                </Link>
                <Link href="/admin/fasilitas/tambah" className="group bg-white/10 hover:bg-gold-primary hover:text-maroon-dark backdrop-blur-sm p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-sm font-bold transition-all border border-white/5 hover:border-transparent">
                   <div className="p-2 bg-white/10 rounded-full group-hover:bg-maroon-dark/10"><School size={18} /></div>
                   <span>Update Fasilitas</span>
                </Link>
              </div>
           </div>

           {/* Pesan Terbaru */}
           <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                 <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <MessageSquare size={18} className="text-maroon-primary"/> Inbox Terbaru
                 </h3>
                 <Link href="/admin/pesan" className="text-xs font-bold text-maroon-primary hover:underline flex items-center gap-1">
                    Lihat Semua <ArrowRight size={12}/>
                 </Link>
              </div>
              
              <div className="divide-y divide-gray-100">
                 {recentMessages.length === 0 ? (
                    <div className="p-12 text-center text-gray-400 text-sm flex flex-col items-center gap-2">
                       <Mail size={32} className="text-gray-200" />
                       Belum ada pesan masuk.
                    </div>
                 ) : (
                    recentMessages.map((msg) => (
                       <div key={msg.id} className={`p-4 hover:bg-gray-50 transition-colors flex items-start gap-4 group ${!msg.isRead ? 'bg-blue-50/40' : ''}`}>
                          <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${!msg.isRead ? 'bg-red-500' : 'bg-gray-200 group-hover:bg-gray-300'}`}></div>
                          <div className="flex-1 min-w-0">
                             <div className="flex justify-between items-center mb-1">
                                <h4 className={`text-sm truncate ${!msg.isRead ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>{msg.name}</h4>
                                <span className="text-[10px] text-gray-400 whitespace-nowrap bg-gray-100 px-2 py-0.5 rounded-full">
                                  {new Date(msg.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'short' })}
                                </span>
                             </div>
                             <p className="text-xs text-gray-500 truncate font-medium">{msg.subject || "Tanpa Subjek"}</p>
                             <p className="text-xs text-gray-400 line-clamp-1 mt-1">{msg.message}</p>
                          </div>
                       </div>
                    ))
                 )}
              </div>
           </div>
        </div>

        {/* 3. KOLOM KANAN: STATISTIK MANUAL */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm h-fit">
           <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Activity size={18} className="text-maroon-primary" /> Statistik Depan
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                 Data ini muncul di landing page pengunjung.
              </p>
           </div>
           <div className="p-2">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] text-gray-400 uppercase font-bold tracking-wider border-b border-gray-100 bg-gray-50/30">
                  <tr>
                    <th className="px-4 py-3">Label</th>
                    <th className="px-4 py-3 text-right">Nilai</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {statsManual.map((stat) => (
                    <tr key={stat.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-700 text-xs">{stat.label}</td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-maroon-primary text-sm">
                        {stat.value}{stat.suffix}
                      </td>
                    </tr>
                  ))}
                  {statsManual.length === 0 && (
                     <tr><td colSpan={2} className="p-8 text-center text-gray-400 text-xs">Data kosong.</td></tr>
                  )}
                </tbody>
              </table>
           </div>
           <div className="p-4 border-t border-gray-100">
              <Link href="/admin/statistik" className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                 <Activity size={14} /> Kelola Statistik
              </Link>
           </div>
        </div>

      </div>
    </div>
  );
}