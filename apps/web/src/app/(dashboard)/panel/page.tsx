import type { Metadata } from 'next';
import Link from 'next/link';
import { events } from '@/content/events';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Üye Paneli | Arel Yazılım Kulübü',
  description: 'Arel Yazılım Kulübü üye paneli — etkinlikler, projeler ve profil yönetimi.',
};

export default function DashboardPage() {
  const upcomingEvents = events.filter((e) => e.status === 'upcoming').slice(0, 3);
  const activeProjects = projects.filter((p) => p.status === 'active' || p.status === 'development').slice(0, 3);

  const stats = [
    { label: 'Katıldığım Etkinlik', value: '7', icon: '📅', color: 'var(--orange)' },
    { label: 'Aktif Proje', value: '2', icon: '🚀', color: '#7C3AED' },
    { label: 'Üyelik Süresi', value: '6 ay', icon: '🏅', color: '#15803D' },
    { label: 'Puan', value: '240', icon: '⭐', color: '#D97706' },
  ];

  return (
    <div>
      {/* Welcome */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.5px', marginBottom: '6px' }}>
          Merhaba, Örnek Üye 👋
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Bu hafta 1 etkinliğin var. Aktif projelerini takip et.
        </p>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {stats.map(({ label, value, icon, color }) => (
          <div
            key={label}
            style={{
              padding: '20px',
              background: '#fff',
              borderRadius: 'var(--radius-lg)',
              border: '1.5px solid var(--border)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '22px' }}>{icon}</span>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text)', lineHeight: 1, marginBottom: '4px' }}>{value}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Upcoming events */}
        <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--border)', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)' }}>📅 Yaklaşan Etkinlikler</h2>
            <Link href="/etkinlikler" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--orange)', textDecoration: 'none' }}>
              Tümü →
            </Link>
          </div>
          <div style={{ padding: '8px' }}>
            {upcomingEvents.map((event) => (
              <Link key={event.id} href={`/etkinlikler/${event.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    transition: 'var(--transition)',
                    cursor: 'pointer',
                  }}
                  className="card"
                >
                  <div
                    style={{
                      width: '38px', height: '38px', borderRadius: '10px',
                      background: 'var(--orange-soft)', color: 'var(--orange)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: '10px', fontWeight: 700, lineHeight: 1 }}>
                      {new Date(event.date).toLocaleDateString('tr-TR', { month: 'short' }).toUpperCase()}
                    </span>
                    <span style={{ fontSize: '16px', fontWeight: 900, lineHeight: 1 }}>
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {event.title}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {event.type} · {(event.location.split('·')[0] ?? event.location).trim()}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Active projects */}
        <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--border)', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)' }}>🚀 Aktif Projeler</h2>
            <Link href="/projeler" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--orange)', textDecoration: 'none' }}>
              Tümü →
            </Link>
          </div>
          <div style={{ padding: '8px' }}>
            {activeProjects.map((project) => (
              <Link key={project.id} href={`/projeler/${project.slug}`} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '2px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '13px' }}>{project.title}</div>
                    <span
                      style={{
                        padding: '2px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 700,
                        background: project.status === 'active' ? '#DCFCE7' : '#FEF3C7',
                        color: project.status === 'active' ? '#15803D' : '#D97706',
                      }}
                    >
                      {project.status === 'active' ? 'Aktif' : 'Geliştiriliyor'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {project.techStack.slice(0, 3).map((t) => (
                      <span key={t} style={{ padding: '2px 6px', borderRadius: '999px', background: '#F3F4F6', fontSize: '10px', fontWeight: 600, color: 'var(--text-2)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ marginTop: '24px', padding: '24px', background: 'var(--orange-soft)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(232,83,29,0.12)' }}>
        <div style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '14px', fontSize: '15px' }}>⚡ Hızlı İşlemler</div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link href="/etkinlikler" className="btn btn-primary btn-sm">Etkinliklere Göz At</Link>
          <Link href="/projeler" className="btn btn-ghost btn-sm">Projeleri İncele</Link>
          <Link href="/topluluk" className="btn btn-ghost btn-sm">Alt Topluluklara Katıl</Link>
          <Link href="/panel/profilim" className="btn btn-ghost btn-sm">Profili Düzenle</Link>
        </div>
      </div>
    </div>
  );
}
