import Link from 'next/link';
import Image from 'next/image';
import { siteConfig, footerLinks } from '@/content/site';

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  );
}
function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

const socialIcons = {
  Instagram: InstagramIcon,
  LinkedIn: LinkedinIcon,
  GitHub: GithubIcon,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ background: '#020617', color: '#fff', borderTop: '1px solid rgba(255,255,255,0.05)' }}
      aria-label="Site altbilgisi"
    >
      <div className="container-site py-20 pb-10">
        {/* Main grid — responsive */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[280px_1fr_1fr_1fr_1fr] lg:gap-14 mb-16">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-5 flex items-center gap-3.5">
              <Image
                src="/website/images/arel-logo-main.jpg"
                alt="Arel Yazılım Kulübü"
                width={44}
                height={44}
                style={{ objectFit: 'contain', borderRadius: '8px', filter: 'brightness(0.9)' }}
              />
              <span className="text-lg font-black uppercase tracking-tight text-white">Arel Yazılım</span>
            </Link>
            <p className="mb-6 text-sm leading-[1.8] text-white/40">
              İstanbul Arel Üniversitesi resmî öğrenci yazılım kulübü.
              Yazılım, tasarım ve veri bilimi odaklı teknoloji üretimi.
            </p>
            {/* Social icons — real SVGs */}
            <div className="flex gap-3">
              {[
                { href: siteConfig.social.instagram, label: 'Instagram', Icon: socialIcons.Instagram },
                { href: siteConfig.social.linkedin,  label: 'LinkedIn',  Icon: socialIcons.LinkedIn },
                { href: siteConfig.social.github,    label: 'GitHub',    Icon: socialIcons.GitHub },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-all hover:border-brand-vibrant hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns — from footerLinks config */}
          {(
            [
              { heading: 'Hızlı Bağlantılar', links: footerLinks.hizli },
              { heading: 'Katılım', links: footerLinks.katilim },
              { heading: 'İletişim & Sosyal', links: footerLinks.iletisim },
              { heading: 'Politika & Yasal', links: footerLinks.yasal },
            ] as const
          ).map((col) => (
            <div key={col.heading}>
              <h3 className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-white/25">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-3" role="list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/50 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-white/50 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-8">
          <p className="text-[13px] font-medium text-white/30">
            © {year} Arel Yazılım Kulübü · Girişimcilik ve Liderlik Ofisi İş Birliğiyle
          </p>
          <div className="flex gap-6">
            {[
              { href: '/gizlilik', label: 'Gizlilik' },
              { href: '/yonetmelik', label: 'KVKK' },
              { href: '/belgeler', label: 'Kullanım Koşulları' },
            ].map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-[13px] text-white/30 transition-colors hover:text-white/70"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
