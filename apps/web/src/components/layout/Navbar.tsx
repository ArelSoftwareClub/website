'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';

import { navLinks as NAV_LINKS } from '@/content/site';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header
        id="navbar"
        className={scrolled ? 'scrolled' : ''}
        aria-label="Ana Navigasyon"
      >
        <div className="container-site" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <Image
              src="/images/arel-logo-main.jpg"
              alt="Arel Yazılım Kulübü"
              width={42}
              height={42}
              style={{ objectFit: 'contain', borderRadius: '8px' }}
              priority
            />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{
                fontWeight: 900,
                fontSize: '16px',
                letterSpacing: '-0.02em',
                color: 'var(--text)',
              }}>
                AREL YAZILIM
              </span>
              <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                SOFTWARE CLUB
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Sayfa navigasyonu"
            style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1 }}
            className="hidden-mobile"
          >
            {NAV_LINKS.map((link) => {
              const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link"
                  style={active ? {
                    background: 'var(--brand-soft)',
                    color: 'var(--brand)',
                  } : {}}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <Link
              href="/uyelik"
              className="btn btn-primary btn-sm hidden-mobile"
            >
              Üye Ol
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                padding: '8px',
                borderRadius: '8px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              className="show-mobile"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: 'block',
                    width: '24px',
                    height: '2px',
                    background: 'var(--text)',
                    borderRadius: '2px',
                    transition: 'all 0.25s ease',
                    transformOrigin: 'center',
                    transform: open
                      ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                      : i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
                      : 'scaleX(0)'
                      : 'none',
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
