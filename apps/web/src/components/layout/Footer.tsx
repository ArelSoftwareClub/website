import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/content/site';

export default function Footer() {
  const year = new Date().getFullYear();

  const cols = [
    {
      heading: 'Hızlı Bağlantılar',
      links: [
        { href: '/', label: 'Ana Sayfa' },
        { href: '/hakkimizda', label: 'Kurumsal' },
        { href: '/etkinlikler', label: 'Etkinlikler' },
        { href: '/projeler', label: 'Projeler' },
        { href: '/kariyer', label: 'Kariyer' },
        { href: '/ekip', label: 'Yönetim Ekibi' },
      ],
    },
    {
      heading: 'Katılım',
      links: [
        { href: '/uyelik', label: 'Üyelik Başvurusu' },
        { href: '/ari-lab', label: 'ARI Lab' },
        { href: '/belgeler', label: 'Tüzük / Yönetmelik' },
        { href: '/belgeler', label: 'SSS / Belgeler' },
        { href: '/kurumsal', label: 'Kurumsal Ortaklık' },
      ],
    },
    {
      heading: 'İletişim & Sosyal',
      links: [
        { href: `mailto:${siteConfig.email}`, label: 'E-posta Gönder', external: true },
        { href: '/iletisim', label: 'İletişim Formu' },
        { href: siteConfig.social.instagram, label: 'Instagram', external: true },
        { href: siteConfig.social.linkedin, label: 'LinkedIn', external: true },
        { href: siteConfig.social.github, label: 'GitHub', external: true },
      ],
    },
    {
      heading: 'Politika & Yasal',
      links: [
        { href: '/gizlilik', label: 'Gizlilik Politikası' },
        { href: '/yonetmelik', label: 'KVKK İşleme' },
        { href: '/belgeler', label: 'Kullanım Koşulları' },
        { href: '/iletisim', label: 'Bize Ulaşın' },
        { href: 'https://www.istanbularel.edu.tr', label: 'Arel Üniversitesi', external: true },
      ],
    },
  ];

  return (
    <footer style={{ background: '#020617', color: '#fff', borderTop: '1px solid rgba(255,255,255,0.05)' }} aria-label="Site altbilgisi">
      <div className="container-site" style={{ padding: '80px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr 1fr 1fr 1fr', gap: '60px', marginBottom: '64px' }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <Image
                src="/images/arel-logo-main.jpg"
                alt="Arel Yazılım Kulübü"
                width={44}
                height={44}
                style={{ objectFit: 'contain', borderRadius: '8px', filter: 'brightness(0.9)' }}
              />
              <span style={{ fontWeight: 900, fontSize: '18px', color: '#fff', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>Arel Yazılım</span>
            </Link>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, marginBottom: '24px' }}>
              İstanbul Arel Üniversitesi resmî öğrenci yazılım kulübü.
              Yazılım, tasarım ve veri bilimi odaklı teknoloji üretimi.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { href: siteConfig.social.instagram, label: 'Instagram', icon: '📸' },
                { href: siteConfig.social.linkedin, label: 'LinkedIn', icon: '💼' },
                { href: siteConfig.social.github, label: 'GitHub', icon: '💻' },
              ].map(({ href, label, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{
                    width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px',
                    transition: 'all 0.2s',
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              <h3 style={{
                fontSize: '12px', fontWeight: 800, textTransform: 'uppercase',
                letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)',
                marginBottom: '20px',
              }}>
                {col.heading}
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} role="list">
                {col.links.map(({ href, label, external }) => (
                  <li key={label}>
                    {external ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}>
                        {label}
                      </a>
                    ) : (
                      <Link href={href} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}>
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: '32px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
            © {year} Arel Yazılım Kulübü · Girişimcilik ve Liderlik Ofisi İş Birliğiyle
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[
              { href: '/gizlilik', label: 'Gizlilik' },
              { href: '/yonetmelik', label: 'KVKK' },
              { href: '/belgeler', label: 'Kullanım Koşulları' },
            ].map(({ href, label }) => (
              <Link key={label} href={href} style={{
                fontSize: '13px', color: 'rgba(255,255,255,0.3)',
                textDecoration: 'none', transition: 'color 0.2s',
              }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
