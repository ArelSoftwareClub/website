import { siteConfig } from '@/content/site';

/** Top announcement bar showing university affiliation and contact shortcuts. */
export default function UniversityBar() {
  return (
    <div
      id="university-bar"
      className="border-b border-slate-200 bg-white py-2"
      role="banner"
      aria-label="Üniversite Bilgi Bandı"
    >
      <div className="container-site flex items-center justify-between text-[11px] font-black text-slate-900 uppercase tracking-tight">

        {/* ── Left: affiliation badge ── */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded px-2 py-0.5 font-extrabold"
            style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>
            {/* Graduation cap icon */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              strokeLinejoin="round" aria-hidden="true">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            Resmî Kulüp
          </span>
          <span className="text-slate-200" aria-hidden="true">|</span>
          <span className="hidden-mobile">
            {siteConfig.university} · {siteConfig.office}
          </span>
        </div>

        {/* ── Right: quick links ── */}
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.universityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-brand-DEFAULT"
            aria-label="Üniversite Ana Sayfa (yeni sekmede açılır)"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </svg>
            <span>Üniversite</span>
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="hidden-mobile flex items-center gap-1.5 transition-colors hover:text-brand-DEFAULT"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>{siteConfig.email}</span>
          </a>
        </div>

      </div>
    </div>
  );
}
