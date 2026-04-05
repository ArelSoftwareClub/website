import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Profilim | Üye Paneli' };

export default function ProfilimPage() {
  const mockUser = {
    name: 'Örnek Üye',
    initials: 'ÖÜ',
    email: 'ornek.uye@istanbularel.edu.tr',
    role: 'Üye',
    faculty: 'Yazılım Mühendisliği',
    year: '2. Sınıf',
    joinedAt: 'Ekim 2024',
    github: 'github.com/ornek-uye',
    linkedin: 'linkedin.com/in/ornek-uye',
    bio: 'Full-stack geliştirme ve makine öğrenmesi ilgi alanlarım. Web Ekibi üyesi.',
    interests: ['Web Geliştirme', 'Yapay Zeka', 'Open Source'],
    skills: ['React', 'TypeScript', 'Python', 'Node.js'],
  };

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text)', marginBottom: '8px', letterSpacing: '-0.5px' }}>
        Profilim
      </h1>
      <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '28px' }}>
        Profil bilgilerini görüntüle ve düzenle.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px' }}>
        {/* Profile card */}
        <div>
          <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--border)', overflow: 'hidden', marginBottom: '16px' }}>
            <div style={{ height: '80px', background: 'linear-gradient(135deg, var(--orange) 0%, var(--orange-v) 100%)' }} />
            <div style={{ padding: '0 24px 24px', marginTop: '-28px' }}>
              <div
                style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--orange) 0%, var(--orange-v) 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', fontWeight: 900, color: '#fff',
                  border: '3px solid #fff', marginBottom: '12px',
                }}
              >
                {mockUser.initials}
              </div>
              <div style={{ fontWeight: 900, color: 'var(--text)', fontSize: '18px', marginBottom: '2px' }}>{mockUser.name}</div>
              <div style={{ fontSize: '13px', color: 'var(--orange)', fontWeight: 600, marginBottom: '12px' }}>{mockUser.role}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { icon: '🎓', label: mockUser.faculty },
                  { icon: '📚', label: mockUser.year },
                  { icon: '📅', label: `Üyelik: ${mockUser.joinedAt}` },
                ].map(({ icon, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-2)' }}>
                    <span>{icon}</span>{label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social links */}
          <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--border)', padding: '20px' }}>
            <div style={{ fontWeight: 800, color: 'var(--text)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
              Sosyal
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href={`https://${mockUser.github}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-2)', textDecoration: 'none', fontWeight: 600 }}>
                🐙 {mockUser.github}
              </a>
              <a href={`https://${mockUser.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-2)', textDecoration: 'none', fontWeight: 600 }}>
                💼 {mockUser.linkedin}
              </a>
            </div>
          </div>
        </div>

        {/* Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Bio */}
          <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--border)', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)' }}>Hakkımda</h2>
              <button className="btn btn-ghost btn-sm">Düzenle</button>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.7 }}>{mockUser.bio}</p>
          </div>

          {/* Interests */}
          <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--border)', padding: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)', marginBottom: '14px' }}>İlgi Alanları</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {mockUser.interests.map((interest) => (
                <span key={interest} style={{ padding: '6px 14px', borderRadius: '999px', background: 'var(--orange-soft)', color: 'var(--orange)', fontSize: '13px', fontWeight: 600, border: '1px solid rgba(232,83,29,0.15)' }}>
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--border)', padding: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)', marginBottom: '14px' }}>Beceriler</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {mockUser.skills.map((skill) => (
                <span key={skill} style={{ padding: '6px 14px', borderRadius: 'var(--radius-md)', background: '#F3F4F6', color: 'var(--text)', fontSize: '13px', fontWeight: 600 }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--border)', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)' }}>Hesap Bilgileri</h2>
              <button className="btn btn-ghost btn-sm">Düzenle</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-muted)' }}>E-posta</span>
                <span style={{ fontWeight: 600, color: 'var(--text)' }}>{mockUser.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Üyelik Tarihi</span>
                <span style={{ fontWeight: 600, color: 'var(--text)' }}>{mockUser.joinedAt}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
