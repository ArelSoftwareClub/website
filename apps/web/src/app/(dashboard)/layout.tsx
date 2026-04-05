'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/panel', label: 'Genel Bakış', icon: '🏠' },
  { href: '/panel/profilim', label: 'Profilim', icon: '👤' },
  { href: '/panel/etkinliklerim', label: 'Etkinliklerim', icon: '📅' },
  { href: '/panel/ayarlar', label: 'Ayarlar', icon: '⚙️' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Mock user — replace with real auth
  const mockUser = {
    name: 'Örnek Üye',
    initials: 'ÖÜ',
    role: 'Üye',
    faculty: 'Yazılım Müh.',
    year: '2. Sınıf',
    joinedAt: 'Ekim 2024',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-alt)', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <header
        style={{
          position: 'fixed', top: '72px', left: 0, right: 0, zIndex: 40,
          height: '56px',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          gap: '12px',
        }}
      >
        <Link href="/" style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
          ← Siteye Dön
        </Link>
        <span style={{ color: 'var(--border)' }}>|</span>
        <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text)' }}>Üye Paneli</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              padding: '4px 12px',
              borderRadius: '999px',
              background: 'var(--orange-soft)',
              color: 'var(--orange)',
              fontSize: '11px',
              fontWeight: 700,
            }}
          >
            {mockUser.role}
          </div>
          <div
            style={{
              width: '34px', height: '34px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--orange) 0%, var(--orange-v) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', fontWeight: 900, color: '#fff',
            }}
          >
            {mockUser.initials}
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', paddingTop: '128px', flex: 1 }}>
        {/* Sidebar */}
        <aside
          style={{
            width: '240px',
            flexShrink: 0,
            position: 'fixed',
            top: '128px',
            bottom: 0,
            left: 0,
            overflowY: 'auto',
            background: '#fff',
            borderRight: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px 16px',
          }}
        >
          {/* User card */}
          <div
            style={{
              padding: '20px',
              background: 'var(--orange-soft)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: '24px',
              border: '1px solid rgba(232,83,29,0.12)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--orange) 0%, var(--orange-v) 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: 900, color: '#fff', flexShrink: 0,
                }}
              >
                {mockUser.initials}
              </div>
              <div>
                <div style={{ fontWeight: 800, color: 'var(--text)', fontSize: '14px' }}>{mockUser.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{mockUser.faculty}</div>
              </div>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', background: '#fff', borderRadius: 'var(--radius-sm)', padding: '6px 10px' }}>
              {mockUser.year} · Üyelik: {mockUser.joinedAt}
            </div>
          </div>

          {/* Navigation */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
            {navItems.map(({ href, label, icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: isActive ? 'var(--orange)' : 'var(--text-2)',
                    background: isActive ? 'var(--orange-soft)' : 'transparent',
                    transition: 'var(--transition)',
                  }}
                >
                  <span>{icon}</span>
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom links */}
          <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Link href="/iletisim" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: 'var(--radius-md)', fontSize: '13px', fontWeight: 600, textDecoration: 'none', color: 'var(--text-muted)' }}>
              ❓ Yardım
            </Link>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: 'var(--radius-md)', fontSize: '13px', fontWeight: 600, textDecoration: 'none', color: 'var(--text-muted)' }}>
              🚪 Çıkış
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, marginLeft: '240px', padding: '32px', minHeight: 'calc(100vh - 128px)' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
