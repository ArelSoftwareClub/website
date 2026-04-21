import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { AnnouncementBadge } from '@/components/ui/Badge';
import { siteConfig } from '@/content/site';
import { announcements } from '@/content/announcements';
import { events } from '@/content/events';
import { projects } from '@/content/projects';
import { managementTeam } from '@/content/team';
import { formatDate, formatEventDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Arel Yazılım Kulübü | İstanbul Arel Üniversitesi',
  description: siteConfig.description,
  alternates: { canonical: '/website' },
};

const quickAccessItems = [
  { href: '/uyelik',      Icon: UserPlusIcon,  label: 'Üyelik Başvurusu' },
  { href: '/etkinlikler', Icon: CalendarIcon,  label: 'Etkinlik Takvimi' },
  { href: '/duyurular',   Icon: BellIcon,      label: 'Duyurular' },
  { href: '/projeler',    Icon: CodeIcon,      label: 'Projeler' },
  { href: 'https://github.com/ArelSoftwareClub', Icon: GithubIcon, label: 'GitHub', external: true },
  { href: 'https://linkedin.com/company/arel-yazilim', Icon: LinkedinIcon, label: 'LinkedIn', external: true },
  { href: '/ekip',        Icon: UsersIcon,     label: 'Yönetim Ekibi' },
  { href: '/belgeler',    Icon: FileTextIcon,  label: 'Belgeler / SSS' },
  { href: 'https://www.istanbularel.edu.tr', Icon: UniversityIcon, label: 'Arel Üniversitesi', external: true },
  { href: '/iletisim',    Icon: MailIcon,      label: 'İletişim' },
];

export default function HomePage() {
  const upcomingEvents = events.filter((e) => e.status === 'upcoming').slice(0, 3);
  const featuredAnnouncements = announcements.slice(0, 3);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const heroTeam = managementTeam.filter((m) => m.featured).slice(0, 4);

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="hero-section" aria-label="Ana Hero Bölümü" id="home">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="hero-glow-1" aria-hidden="true" />
        <div className="hero-glow-2" aria-hidden="true" />

        <div className="container-site relative z-10 w-full">
          <div className="grid grid-cols-1 items-center gap-12 py-20 lg:grid-cols-[1fr_auto]">
            {/* Content */}
            <div>
              {/* Academic year pill */}
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-brand-DEFAULT/30 bg-brand-DEFAULT/10 px-5 py-2 text-[12px] font-extrabold uppercase tracking-[1.2px] text-brand-DEFAULT backdrop-blur-sm">
                <span
                  className="blink-dot block h-2 w-2 shrink-0 rounded-full bg-brand-DEFAULT"
                  aria-hidden="true"
                />
                {siteConfig.academicYear} Akademik Yılı Aktif
              </div>

              {/* Heading */}
              <h1 className="mb-6 text-[clamp(40px,6.5vw,84px)] font-black leading-[1.04] tracking-[-3px] text-white">
                Yazılım, Üretim
                <br />ve{' '}
                <span className="gradient-text">Topluluk</span>
                <br />Bir Arada
              </h1>

              <p className="mb-10 max-w-[480px] text-lg leading-[1.75] text-white/65">
                İstanbul Arel Üniversitesi Yazılım Kulübü; yapay zekâ, yazılım ve veri bilimi
                alanlarında proje üreten, etkinlikler düzenleyen kariyer odaklı öğrenci topluluğudur.
              </p>

              {/* CTA buttons */}
              <div className="mb-14 flex flex-wrap gap-3.5">
                <Link href="/uyelik" className="btn btn-primary btn-lg">
                  Üye Ol Hemen
                </Link>
                <Link href="/etkinlikler" className="btn btn-outline-white btn-lg">
                  Etkinlikler
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-10 border-t border-white/10 pt-8">
                {[
                  { num: `${siteConfig.stats.members}+`, label: 'Aktif Üye' },
                  { num: `${siteConfig.stats.projects}+`, label: 'Açık Kaynak Proje' },
                  { num: `${siteConfig.stats.events}+`, label: 'Yıllık Etkinlik' },
                ].map(({ num, label }) => (
                  <div key={label}>
                    <div className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-4xl font-black leading-none text-transparent">
                      {num}
                    </div>
                    <div className="mt-1.5 text-[13px] text-white/45">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logo ring — hidden on mobile to save space */}
            <div className="hidden items-center justify-center lg:flex">
              <div className="logo-ring">
                <Image
                  src="/website/images/arel-logo-main.jpg"
                  alt="Arel Yazılım Kulübü logosu"
                  width={220}
                  height={220}
                  priority
                  className="float-anim"
                  style={{ objectFit: 'contain', borderRadius: '24px', boxShadow: '0 0 60px rgba(37,99,235,0.2)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE STRIP ─────────────────────────────────────── */}
      <div className="border-y border-slate-200 bg-white py-7">
        <div className="container-site">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { Icon: UsersIcon,    strong: `${siteConfig.stats.members}+ Üye`,    span: 'Aktif Topluluk' },
              { Icon: CodeIcon,     strong: `${siteConfig.stats.projects}+ Proje`,  span: 'Açık Kaynak' },
              { Icon: CalendarIcon, strong: `${siteConfig.stats.events}+ Etkinlik`, span: 'Yıllık Takvim' },
              { Icon: ShieldIcon,   strong: siteConfig.stats.status,                span: 'GLO Onaylı Kulüp' },
            ].map(({ Icon, strong, span }) => (
              <div key={strong} className="flex items-center gap-4 rounded-xl border-[1.5px] border-transparent bg-[var(--bg-premium)] p-4 transition-all hover:-translate-y-0.5 hover:border-brand-DEFAULT hover:bg-white hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand-DEFAULT">
                  <Icon size={20} />
                </div>
                <div>
                  <strong className="block text-[15px] font-extrabold text-slate-900">{strong}</strong>
                  <span className="text-xs text-slate-500">{span}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── QUICK ACCESS ──────────────────────────────────────── */}
      <section className="bg-[var(--bg-alt)] py-20" aria-labelledby="qa-heading">
        <div className="container-site">
          <div className="mb-10 text-center">
            <span className="label-tag">Portal</span>
            <h2 className="section-title" id="qa-heading">
              Hızlı <span className="gradient-text">Erişim</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[480px] text-slate-600">
              Kulübün tüm alanlarına tek tıkla ulaşın.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {quickAccessItems.map(({ href, Icon, label, external }) => {
              const Tag = external ? 'a' : Link;
              const extraProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
              return (
                <Tag
                  key={label}
                  href={href}
                  {...(extraProps as Record<string, string>)}
                  className="flex flex-col items-center gap-3 rounded-xl border-[1.5px] border-slate-200 bg-white px-4 py-6 text-center text-slate-800 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-DEFAULT hover:text-brand-DEFAULT hover:shadow-lg"
                >
                  <div className="flex h-13 w-13 items-center justify-center rounded-[14px] bg-brand-soft text-brand-DEFAULT transition-all">
                    <Icon size={24} />
                  </div>
                  <span className="text-[13px] font-bold">{label}</span>
                </Tag>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ANNOUNCEMENTS ─────────────────────────────────────── */}
      <section className="bg-[var(--bg-premium)] py-20" aria-labelledby="ann-heading">
        <div className="container-site">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="label-tag">Güncel</span>
              <h2 className="section-title" id="ann-heading">
                Son <span className="gradient-text">Duyurular</span>
              </h2>
            </div>
            <Link href="/duyurular" className="btn btn-ghost btn-sm">Tümünü Gör →</Link>
          </div>

          <div className="flex flex-col gap-3">
            {featuredAnnouncements.map((ann, i) => (
              <Link
                key={ann.id}
                href={ann.url ?? '/duyurular'}
                className={`ann-card ${i === 0 ? 'featured' : ''}`}
              >
                <div className="ann-icon">
                  <BellIcon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex flex-wrap items-center gap-2">
                    <AnnouncementBadge category={ann.category as 'Üyelik' | 'Yarışma' | 'Workshop' | 'Etkinlik' | 'Genel'} />
                    <span className="text-xs text-slate-400">{formatDate(ann.date)}</span>
                    {ann.deadline && (
                      <span className="text-xs font-bold text-brand-DEFAULT">
                        Son Başvuru: {formatDate(ann.deadline)}
                      </span>
                    )}
                  </div>
                  <div className="mb-1 font-bold text-slate-900">{ann.title}</div>
                  <div className="text-sm leading-relaxed text-slate-600">{ann.summary}</div>
                </div>
                <span className="shrink-0 text-[13px] font-bold text-brand-DEFAULT">Detay →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS ────────────────────────────────────────────── */}
      <section className="bg-[var(--bg-alt)] py-20" aria-labelledby="events-heading">
        <div className="container-site">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="label-tag">Takvim</span>
              <h2 className="section-title" id="events-heading">
                Yaklaşan <span className="gradient-text">Etkinlikler</span>
              </h2>
            </div>
            <Link href="/etkinlikler" className="btn btn-ghost btn-sm">Tümünü Gör →</Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => {
              const accent = event.type === 'Workshop' ? '#2563eb'
                : event.type === 'Hackathon' ? '#7C3AED' : '#15803D';
              return (
                <article
                  key={event.id}
                  className="event-card"
                  style={{ borderTop: `3px solid ${accent}` }}
                >
                  <div className="event-header">
                    <span className="text-[11px] font-extrabold uppercase tracking-[1px] text-slate-500">
                      {formatEventDate(event.date)}
                    </span>
                    <span className={`badge ${event.type === 'Workshop' ? 'badge-brand' : event.type === 'Hackathon' ? 'badge-purple' : 'badge-green'}`}>
                      {event.type}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 text-[17px] font-extrabold text-slate-900">{event.title}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-slate-600">{event.description}</p>
                    <div className="mb-5 flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPinIcon size={12} aria-hidden="true" />
                      {event.location} {event.capacity ? `· ${event.capacity} Kontenjan` : ''}
                    </div>
                    {event.registrationUrl ? (
                      <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                        Kayıt Ol
                      </a>
                    ) : (
                      <Link href="/iletisim" className="btn btn-ghost btn-sm">
                        Bilgi Al
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────────── */}
      <section className="bg-[var(--bg-premium)] py-20" aria-labelledby="proj-heading">
        <div className="container-site">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="label-tag">Teknik Üretim</span>
              <h2 className="section-title" id="proj-heading">
                Projeler &amp; <span className="gradient-text">Açık Kaynak</span>
              </h2>
            </div>
            <Link href="/projeler" className="btn btn-ghost btn-sm">Tüm Projeler →</Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article key={project.id} className="proj-card">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand-DEFAULT">
                    <CodeIcon size={22} />
                  </div>
                  <span className={`badge ${project.status === 'active' ? 'badge-green' : project.status === 'development' ? 'badge-yellow' : 'badge-gray'}`}>
                    {project.status === 'active' ? 'Aktif' : project.status === 'development' ? 'Geliştiriliyor' : 'Tamamlandı'}
                  </span>
                </div>
                <h3 className="mb-2 text-[17px] font-extrabold text-slate-900">{project.title}</h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600">{project.description}</p>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.techStack.map((t) => (
                    <span key={t} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3.5">
                  <span className="text-xs text-slate-400">👥 {project.team}</span>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                      GitHub ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────── */}
      <section className="bg-[var(--bg-alt)] py-20" aria-labelledby="team-heading">
        <div className="container-site">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="label-tag">Ekip</span>
              <h2 className="section-title" id="team-heading">
                Yönetim <span className="gradient-text">Kadrosu</span>
              </h2>
            </div>
            <Link href="/ekip" className="btn btn-ghost btn-sm">Tüm Ekibi Gör →</Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {heroTeam.map((member) => (
              <div key={member.id} className="team-card">
                <div className="avatar">{member.initials}</div>
                <div className="text-[15px] font-extrabold text-slate-900">{member.name}</div>
                <div className="mb-0.5 mt-1 text-[13px] font-semibold text-brand-DEFAULT">{member.role}</div>
                <div className="mb-4 text-xs text-slate-400">{member.faculty} · {member.year}</div>
                <div className="flex gap-2">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                      aria-label={`${member.name} LinkedIn`} className="social-btn">
                      <LinkedinSmIcon size={12} />
                    </a>
                  )}
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer"
                      aria-label={`${member.name} GitHub`} className="social-btn">
                      <GithubSmIcon size={12} />
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`} aria-label={`${member.name} e-posta`}
                      className="social-btn">
                      <MailSmIcon size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="cta-section" aria-labelledby="cta-heading">
        <div className="cta-glow" style={{ top: '-100px', left: '-100px' }} aria-hidden="true" />
        <div className="cta-glow" style={{ bottom: '-100px', right: '-100px' }} aria-hidden="true" />
        <div className="container-site relative z-10 text-center">
          <h2 id="cta-heading" className="mb-4 text-[clamp(30px,4.5vw,52px)] font-black tracking-[-2px] text-white">
            Topluluğumuza Katıl
          </h2>
          <p className="mx-auto mb-10 max-w-[500px] text-lg leading-[1.7] text-white/82">
            Sınıftaki bilgileri gerçek projelere dönüştür. Etkinliklere katıl, ekip kur,
            kariyer yolculuğuna bugün başla.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link href="/uyelik" className="btn btn-lg btn-outline-white" style={{
              background: '#fff', color: 'var(--brand)',
              borderColor: '#fff', boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            }}>
              Üyelik Başvurusu
            </Link>
            <Link href="/hakkimizda" className="btn btn-lg btn-outline-white">
              Daha Fazla Öğren
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Announcement card style helper ─────────────────────────── */
// .ann-card CSS class handles full layout; see globals.css

/* ── Icon components ──────────────────────────────────────────
   Inline icons remain for tree-shaking without adding a dependency.
   These are used only on the homepage hero section.           */
type IconProps = { size?: number };

function UserPlusIcon({ size = 24 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>;
}
function CalendarIcon({ size = 24 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}
function BellIcon({ size = 24 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
}
function CodeIcon({ size = 24 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
}
function UsersIcon({ size = 24 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
function FileTextIcon({ size = 24 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
}
function ShieldIcon({ size = 24 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
}
function UniversityIcon({ size = 24 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
}
function MailIcon({ size = 24 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
}
function MapPinIcon({ size = 24 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function GithubIcon({ size = 24 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;
}
function LinkedinIcon({ size = 24 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
}
// Small icon variants for team social buttons
function LinkedinSmIcon({ size = 12 }: IconProps) { return <LinkedinIcon size={size} />; }
function GithubSmIcon({ size = 12 }: IconProps) { return <GithubIcon size={size} />; }
function MailSmIcon({ size = 12 }: IconProps) { return <MailIcon size={size} />; }
