import Link from 'next/link';
import Image from 'next/image';
import { siteConfig, footerLinks } from '@/content/site';

/* ── Icons ────────────────────────────────────────────────────── */
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}
function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
function MailIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function ArrowUpRightIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

/* ── Footer columns config ────────────────────────────────────── */
const columns = [
  { heading: 'Hızlı Bağlantılar', key: 'hizli' as const },
  { heading: 'Katılım',           key: 'katilim' as const },
  { heading: 'İletişim & Sosyal', key: 'iletisim' as const },
  { heading: 'Politika & Yasal',  key: 'yasal' as const },
];

/* ── Component ────────────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer aria-label="Site altbilgisi" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* ── Gradient top border */}
      <div style={{
        height: '2px',
        background: 'linear-gradient(90deg, transparent 0%, #2563eb 30%, #3b82f6 60%, transparent 100%)',
      }} aria-hidden="true" />

      {/* ── Main footer body */}
      <div style={{
        background: 'linear-gradient(180deg, #080f1e 0%, #020617 100%)',
        position: 'relative',
      }}>

        {/* Ambient glow blobs */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-120px', left: '-80px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 65%)',
          filter: 'blur(50px)', pointerEvents: 'none',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: '-60px', right: '-40px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 65%)',
          filter: 'blur(50px)', pointerEvents: 'none',
        }} />

        <div className="container-site" style={{ position: 'relative', zIndex: 1, paddingTop: '64px', paddingBottom: '40px' }}>

          {/* ── Top section: Brand + Links ──────────────────── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '48px',
          }}
            className="footer-main-grid"
          >
            {/* Brand column */}
            <div style={{ maxWidth: '300px' }}>
              <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '20px', textDecoration: 'none' }}>
                <div style={{
                  width: '44px', height: '44px',
                  borderRadius: '12px',
                  border: '1px solid rgba(37,99,235,0.4)',
                  background: 'rgba(37,99,235,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
                  boxShadow: '0 0 20px rgba(37,99,235,0.2)',
                }}>
                  <Image
                    src="/website/images/arel-logo-main.jpg"
                    alt="Arel Yazılım Kulübü"
                    width={44}
                    height={44}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    Arel Yazılım
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#3b82f6', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Kulübü
                  </div>
                </div>
              </Link>

              <p style={{ fontSize: '14px', lineHeight: '1.75', color: 'rgba(255,255,255,0.45)', marginBottom: '28px' }}>
                İstanbul Arel Üniversitesi resmî öğrenci yazılım kulübü.
                Yapay zekâ, yazılım ve veri bilimi odaklı üretim topluluğu.
              </p>

              {/* Social row */}
              <div style={{ display: 'flex', gap: '10px' }}>
                {[
                  { href: siteConfig.social.instagram, label: 'Instagram', Icon: InstagramIcon },
                  { href: siteConfig.social.linkedin,  label: 'LinkedIn',  Icon: LinkedinIcon },
                  { href: siteConfig.social.github,    label: 'GitHub',    Icon: GithubIcon },
                  { href: `mailto:${siteConfig.email}`, label: 'E-posta', Icon: MailIcon },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      width: '40px', height: '40px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      background: 'rgba(255,255,255,0.04)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(255,255,255,0.5)',
                      transition: 'all 0.2s ease',
                    }}
                    className="footer-social-btn"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '36px',
            }} className="footer-links-grid">
              {columns.map((col) => {
                const links = footerLinks[col.key];
                return (
                  <div key={col.heading}>
                    <h3 style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      color: 'rgba(255,255,255,0.22)',
                      marginBottom: '18px',
                    }}>
                      {col.heading}
                    </h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} role="list">
                      {links.map((link) => (
                        <li key={link.label}>
                          {'external' in link && link.external ? (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                fontSize: '13.5px',
                                fontWeight: 500,
                                color: 'rgba(255,255,255,0.8)',
                                transition: 'color 0.2s ease',
                              }}
                              className="footer-nav-link"
                            >
                              {link.label}
                              <ArrowUpRightIcon size={11} />
                            </a>
                          ) : (
                            <Link
                              href={link.href}
                              style={{
                                display: 'inline-block',
                                fontSize: '13.5px',
                                fontWeight: 500,
                                color: 'rgba(255,255,255,0.8)',
                                transition: 'color 0.2s ease',
                              }}
                              className="footer-nav-link"
                            >
                              {link.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Divider ─────────────────────────────────────── */}
          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent 100%)',
            margin: '48px 0 28px',
          }} aria-hidden="true" />

          {/* ── Bottom bar ──────────────────────────────────── */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 8px rgba(34,197,94,0.6)',
              }} aria-hidden="true" />
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.28)', fontWeight: 500 }}>
                © {year} Arel Yazılım Kulübü · GLO Onaylı Kulüp
              </p>
            </div>
            <div style={{ display: 'flex', gap: '28px' }}>
              {[
                { href: '/gizlilik',      label: 'Gizlilik' },
                { href: '/gizlilik#kvkk', label: 'KVKK' },
                { href: '/belgeler',      label: 'Tüzük & Yönetmelik' },
              ].map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.28)', fontWeight: 500, transition: 'color 0.2s' }}
                  className="footer-bottom-link"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Inline responsive styles */}
      <style>{`
        .footer-main-grid {
          grid-template-columns: 280px 1fr !important;
        }
        @media (max-width: 900px) {
          .footer-main-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-links-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .footer-links-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 24px !important;
          }
        }
        .footer-social-btn:hover {
          border-color: rgba(37,99,235,0.6) !important;
          background: rgba(37,99,235,0.15) !important;
          color: #60a5fa !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(37,99,235,0.25);
        }
        .footer-nav-link:hover {
          color: #93c5fd !important;
        }
        .footer-bottom-link:hover {
          color: rgba(255,255,255,0.6) !important;
        }
      `}</style>
    </footer>
  );
}
