import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Admin Panel | Arel Yazılım Kulübü',
};

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
    return null;
  }

  // Fetch stats
  const [
    userCount,
    pendingApplications,
    upcomingEvents,
    totalAttendances,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.application.count({ where: { status: 'PENDING' } }),
    prisma.event.count({ where: { status: { in: ['PUBLISHED', 'REGISTRATION_OPEN'] } } }),
    prisma.attendance.count(),
  ]);

  const stats = [
    { label: 'Toplam Kullanıcı', value: userCount, icon: '👥', color: 'border-l-blue-500' },
    { label: 'Bekleyen Başvuru', value: pendingApplications, icon: '📝', color: 'border-l-yellow-500' },
    { label: 'Aktif Etkinlik', value: upcomingEvents, icon: '📅', color: 'border-l-green-500' },
    { label: 'Toplam Katılım', value: totalAttendances, icon: '✅', color: 'border-l-purple-500' },
  ];

  const recentApplications = await prisma.application.findMany({
    where: { status: 'PENDING' },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="mb-1.5 text-[28px] font-black tracking-tight text-white">Admin Dashboard</h1>
        <p className="text-sm text-slate-400">Kulüp yönetim paneline hoş geldiniz.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon, color }) => (
          <div key={label} className={`rounded-xl border border-slate-800 bg-slate-900 p-6 border-l-4 ${color}`}>
            <div className="mb-3 text-3xl">{icon}</div>
            <div className="text-3xl font-black text-white">{value}</div>
            <div className="mt-1 text-sm text-slate-400">{label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Applications */}
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
            <h2 className="text-base font-extrabold text-white">📝 Bekleyen Başvurular</h2>
            <span className="rounded-full bg-yellow-500/20 px-2.5 py-1 text-xs font-bold text-yellow-400">
              {pendingApplications}
            </span>
          </div>
          <div className="p-2">
            {recentApplications.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-sm text-slate-500">Bekleyen başvuru yok</p>
              </div>
            ) : (
              recentApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between rounded-lg p-4 border-b border-slate-800 last:border-0">
                  <div>
                    <div className="text-sm font-semibold text-white">{app.fullName}</div>
                    <div className="mt-1 text-xs text-slate-500">{app.email}</div>
                    <div className="mt-1 text-xs text-slate-600">{app.department} · {app.year}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-lg bg-green-500/20 px-3 py-1.5 text-xs font-bold text-green-400 hover:bg-green-500/30">
                      Onayla
                    </button>
                    <button className="rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-bold text-red-400 hover:bg-red-500/30">
                      Reddet
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
            <h2 className="text-base font-extrabold text-white">⚡ Hızlı İşlemler</h2>
          </div>
          <div className="p-6 space-y-3">
            <a href="/admin/basvurular" className="flex items-center gap-3 rounded-lg bg-slate-800 p-4 text-sm font-medium text-white transition-colors hover:bg-slate-700">
              <span>📋</span>
              Başvuruları Değerlendir
              <span className="ml-auto rounded-full bg-yellow-500/20 px-2 py-1 text-xs font-bold text-yellow-400">
                {pendingApplications}
              </span>
            </a>
            <a href="/admin/etkinlikler" className="flex items-center gap-3 rounded-lg bg-slate-800 p-4 text-sm font-medium text-white transition-colors hover:bg-slate-700">
              <span>📅</span>
              Etkinlik Ekle / Düzenle
            </a>
            <a href="/admin/duyurular" className="flex items-center gap-3 rounded-lg bg-slate-800 p-4 text-sm font-medium text-white transition-colors hover:bg-slate-700">
              <span>📢</span>
              Duyuru Yayınla
            </a>
            <a href="/admin/kullanicilar" className="flex items-center gap-3 rounded-lg bg-slate-800 p-4 text-sm font-medium text-white transition-colors hover:bg-slate-700">
              <span>👥</span>
              Kullanıcıları Yönet
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}