import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Ayarlar | Üye Paneli' };

export default function AyarlarPage() {
  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text)', marginBottom: '8px', letterSpacing: '-0.5px' }}>
        Ayarlar
      </h1>
      <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '28px' }}>
        Hesap tercihlerini ve bildirim ayarlarını yönet.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Notifications */}
        <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--border)', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)' }}>🔔 Bildirimler</h2>
          </div>
          <div style={{ padding: '8px' }}>
            {[
              { label: 'Etkinlik Bildirimleri', desc: 'Yeni etkinlikler ve hatırlatıcılar', defaultOn: true },
              { label: 'Duyurular', desc: 'Kulüp duyuruları ve haberler', defaultOn: true },
              { label: 'Proje Güncellemeleri', desc: 'Üye olduğunuz projelerde yeni aktivite', defaultOn: false },
              { label: 'Blog Bildirimleri', desc: 'Yeni teknik yazılar yayınlandığında', defaultOn: false },
            ].map(({ label, desc, defaultOn }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '14px', marginBottom: '2px' }}>{label}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{desc}</div>
                </div>
                <div
                  style={{
                    width: '44px', height: '24px', borderRadius: '999px',
                    background: defaultOn ? 'var(--orange)' : '#E5E7EB',
                    position: 'relative', cursor: 'pointer', transition: 'var(--transition)',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute', top: '2px', left: defaultOn ? '22px' : '2px',
                      width: '20px', height: '20px', borderRadius: '50%', background: '#fff',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.15)', transition: 'var(--transition)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--border)', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)' }}>🔒 Gizlilik</h2>
          </div>
          <div style={{ padding: '8px' }}>
            {[
              { label: 'Profili Herkese Açık Yap', desc: 'Profil sayfanız kulüp üyelerine görünür', defaultOn: true },
              { label: 'GitHub İstatistiklerini Göster', desc: 'Katkıda bulunduğunuz projeler listede görünür', defaultOn: true },
            ].map(({ label, desc, defaultOn }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '14px', marginBottom: '2px' }}>{label}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{desc}</div>
                </div>
                <div
                  style={{
                    width: '44px', height: '24px', borderRadius: '999px',
                    background: defaultOn ? 'var(--orange)' : '#E5E7EB',
                    position: 'relative', cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute', top: '2px', left: defaultOn ? '22px' : '2px',
                      width: '20px', height: '20px', borderRadius: '50%', background: '#fff',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div style={{ background: '#FFF5F5', borderRadius: 'var(--radius-lg)', border: '1.5px solid #FECACA', padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#DC2626', marginBottom: '6px' }}>⚠️ Tehlikeli Alan</h2>
          <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '16px', lineHeight: 1.6 }}>
            Hesabınızı silmek geri alınamaz. Tüm verileriniz kalıcı olarak silinir.
          </p>
          <button
            style={{
              padding: '10px 20px', borderRadius: 'var(--radius-md)',
              background: 'transparent', color: '#DC2626',
              border: '1.5px solid #DC2626', fontSize: '13px', fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Hesabı Sil
          </button>
        </div>
      </div>
    </div>
  );
}
