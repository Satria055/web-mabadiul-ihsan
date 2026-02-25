import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Users, Plus, Shield, Edit, User } from "lucide-react";
import DeleteUserButton from "@/components/admin/DeleteUserButton";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'asc' }, // Admin utama (yang pertama dibuat) biasanya paling atas
  });

  return (
    <div className="pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800 flex items-center gap-2">
            <Users className="text-maroon-primary" size={28}/> Manajemen User
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Kelola akun administrator dan editor yang memiliki akses ke panel ini.
          </p>
        </div>
        <Link 
          href="/admin/users/tambah" 
          className="bg-maroon-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-maroon-dark transition-colors shadow-md"
        >
          <Plus size={18} /> Tambah User
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider w-16">#</th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">User Info</th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Dibuat Pada</th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-5 text-gray-400 font-mono text-xs">{index + 1}</td>
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                          <User size={20} />
                       </div>
                       <div>
                          <p className="font-bold text-gray-800">{user.name || "Tanpa Nama"}</p>
                          <p className="text-xs text-gray-500">@{user.username}</p>
                       </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                      ${user.role === 'admin' ? 'bg-maroon-primary/10 text-maroon-primary' : 'bg-blue-100 text-blue-600'}
                    `}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-5 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="p-5">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/admin/users/${user.id}`} 
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit User"
                      >
                        <Edit size={16} />
                      </Link>
                      <DeleteUserButton id={user.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}