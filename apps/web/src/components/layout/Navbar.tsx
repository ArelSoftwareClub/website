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

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header
        id="navbar"
        className={scrolled ? 'scrolled' : ''}
        aria-label="Ana Navigasyon"
      >
        <div className="container-site flex items-center gap-8">

          {/* ── Logo ── */}
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image
              src="/website/images/arel-logo-main.jpg"
              alt="Arel Yazılım Kulübü"
              width={42}
              height={42}
              style={{ objectFit: 'contain', borderRadius: '8px' }}
              priority
            />
            <div className="flex flex-col leading-none">
              <span className="text-[16px] font-black tracking-[-0.02em] text-slate-900">
                AREL YAZILIM
              </span>
              <span className="text-[10px] font-semibold tracking-[0.05em] text-slate-500">
                SOFTWARE CLUB
              </span>
            </div>
          </Link>

          {/* ── Desktop navigation ── */}
          <nav
            aria-label="Sayfa navigasyonu"
            className="hidden-mobile flex flex-1 items-center gap-0.5"
          >
            {NAV_LINKS.map((link) => {
              const active =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link"
                  style={
                    active
                      ? { background: 'var(--brand-soft)', color: 'var(--brand)' }
                      : {}
                  }
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Right actions ── */}
          <div className="ml-auto flex shrink-0 items-center gap-3">
            {/* CTA — desktop only */}
            <Link href="/uyelik" className="btn btn-primary btn-sm hidden-mobile">
              Üye Ol
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
              className="show-mobile flex flex-col gap-[5px] rounded-lg p-2 transition-colors hover:bg-slate-100"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-[2px] w-6 rounded-sm bg-slate-900 transition-all duration-250"
                  style={{
                    transform: open
                      ? i === 0
                        ? 'rotate(45deg) translate(5px, 5px)'
                        : i === 2
                          ? 'rotate(-45deg) translate(5px, -5px)'
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
