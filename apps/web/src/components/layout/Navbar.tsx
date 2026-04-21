'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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

  const shouldBeTransparent = false; // Forced solid for better visibility

  return (
    <>
      <header
        id="navbar"
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          shouldBeTransparent
            ? 'bg-transparent'
            : 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] backdrop-blur-md'
        }`}
        style={{ 
          height: 'var(--nav-h)',
          top: shouldBeTransparent ? 'var(--unibar-h)' : 0,
          borderBottom: shouldBeTransparent ? 'none' : '1px solid rgba(0,0,0,0.06)'
        }}
        aria-label="Ana Navigasyon"
      >
        <div className="container-site flex h-full items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Arel Yazılım Kulübü - Ana Sayfa">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
              <Image 
                src="/website/images/arel-logo-main.jpg" 
                alt="Logo" 
                width={40} 
                height={40} 
                className="object-cover"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className={`text-[15px] font-black tracking-[-0.02em] transition-colors ${!shouldBeTransparent ? 'text-slate-900' : 'text-white'}`}>
                AREL YAZILIM
              </span>
              <span className={`text-[9px] font-bold tracking-[0.08em] transition-colors ${!shouldBeTransparent ? 'text-slate-700' : 'text-white/80'}`}>
                SOFTWARE CLUB
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Sayfa navigasyonu"
            className="hidden-mobile flex flex-1 items-center justify-center gap-0.5"
          >
            {NAV_LINKS.map((link) => {
              const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link relative px-4 py-2 text-[13.5px] font-bold transition-all ${
                    active ? 'text-blue-600' : !shouldBeTransparent ? 'text-slate-950 hover:text-blue-600' : 'text-white hover:text-blue-300'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-brand-DEFAULT" aria-hidden="true" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="ml-auto flex shrink-0 items-center gap-3">
            <Link 
              href="/uyelik" 
              className={`hidden-mobile btn btn-sm font-semibold transition-all ${
                !shouldBeTransparent ? 'btn-primary' : 'bg-white text-brand-DEFAULT hover:bg-slate-50'
              }`}
            >
              Üye Ol
            </Link>

            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
              className={`show-mobile flex flex-col justify-center gap-[5px] rounded-lg p-2 transition-colors ${
                !shouldBeTransparent ? 'hover:bg-slate-100' : 'hover:bg-white/10'
              }`}
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <span
                className={`block h-0.5 rounded-sm transition-all duration-300 ${
                  scrolled ? 'bg-slate-700' : 'bg-white'
                } ${open ? 'w-5 -rotate-45 translate-y-1.5' : 'w-5'}`}
              />
              <span
                className={`block h-0.5 rounded-sm transition-all duration-300 ${
                  scrolled ? 'bg-slate-700' : 'bg-white'
                } ${open ? 'w-5 opacity-0' : 'w-4'}`}
              />
              <span
                className={`block h-0.5 rounded-sm transition-all duration-300 ${
                  !shouldBeTransparent ? 'bg-slate-700' : 'bg-white'
                } ${open ? 'w-5 rotate-45 -translate-y-1.5' : 'w-3'}`}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}